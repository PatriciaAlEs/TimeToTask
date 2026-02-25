/**
 * Página: Dashboard
 * Vista general con estadísticas y resumen
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useLanguage } from '../i18n/LanguageContext';
import { useTheme } from '../theme/ThemeContext';
import { ProjectList } from '../components/Projects/ProjectList';
import { AddTaskModal } from '../components/Modals/AddTaskModal';
import { ProjectModal } from '../components/Modals/ProjectModal';
import { useTasks } from '../hooks/useTasks.jsx';
import { useProjects } from '../hooks/useProjects.jsx';
import { TASK_TYPES, TASK_TYPE_SOFT_THEME } from '../config/taskTypes';

function PieChart({ segments, total, size = 88, showSliceValues = false }) {
    const radius = size / 2;
    const center = radius;

    const polarToCartesian = (cx, cy, chartRadius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);

        return {
            x: cx + chartRadius * Math.cos(angleInRadians),
            y: cy + chartRadius * Math.sin(angleInRadians),
        };
    };

    const describeSlice = (cx, cy, chartRadius, startAngle, endAngle) => {
        const start = polarToCartesian(cx, cy, chartRadius, endAngle);
        const end = polarToCartesian(cx, cy, chartRadius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        return [
            `M ${cx} ${cy}`,
            `L ${start.x} ${start.y}`,
            `A ${chartRadius} ${chartRadius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
            'Z',
        ].join(' ');
    };

    let accumulatedValue = 0;
    const activeSegments = segments.filter((segment) => segment.value > 0);
    const computedSegments =
        total > 0
            ? activeSegments.map((segment) => {
                const startAngle = (accumulatedValue / total) * 360;
                accumulatedValue += segment.value;
                const endAngle = (accumulatedValue / total) * 360;
                const midAngle = (startAngle + endAngle) / 2;

                return {
                    ...segment,
                    startAngle,
                    endAngle,
                    midAngle,
                };
            })
            : [];

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size}>
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="currentColor"
                    className="text-white/15"
                />
                {computedSegments.map((segment) => (
                    <path
                        key={segment.id}
                        d={describeSlice(center, center, radius, segment.startAngle, segment.endAngle)}
                        fill={segment.strokeColor}
                        stroke="rgba(255,255,255,0.24)"
                        strokeWidth="1"
                    />
                ))}

                {showSliceValues &&
                    computedSegments.map((segment) => {
                        const labelPosition = polarToCartesian(center, center, radius * 0.62, segment.midAngle);

                        return (
                            <text
                                key={`value-${segment.id}`}
                                x={labelPosition.x}
                                y={labelPosition.y}
                                fill="#111111"
                                fontSize={Math.max(11, Math.round(size * 0.06))}
                                fontWeight="700"
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                {segment.value}
                            </text>
                        );
                    })}
            </svg>
        </div>
    );
}

export default function DashboardPage() {
    const { projects, loading, createProject, updateProjectData, deleteProject } = useProjects();
    const { tasks, addTask } = useTasks();
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
    const [showAddProjectModal, setShowAddProjectModal] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const [projectToEdit, setProjectToEdit] = useState(null);
    const [expandedSection, setExpandedSection] = useState(null);
    const [showDashboardInfo, setShowDashboardInfo] = useState(false);
    const [nowTimestamp, setNowTimestamp] = useState(Date.now());
    const lastTomorrowAlertRef = useRef('');
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${now.getFullYear()}-${month}`;
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNowTimestamp(Date.now());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const showSuccessToast = (message) => {
        toast.success(message, {
            className: 'timetotask-toast timetotask-toast-success',
            icon: '✅',
        });
    };

    const showErrorToast = (message) => {
        toast.error(message, {
            className: 'timetotask-toast timetotask-toast-error',
            icon: '⚠️',
        });
    };

    const [rawYear, rawMonth] = selectedMonth.split('-');
    const selectedYear = Number(rawYear) || new Date().getFullYear();
    const selectedMonthIndex = Number(rawMonth) || new Date().getMonth() + 1;
    const firstDayOfMonth = new Date(selectedYear, selectedMonthIndex - 1, 1);
    const daysInSelectedMonth = new Date(selectedYear, selectedMonthIndex, 0).getDate();
    const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7;
    const weekdayLabels = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const tasksByDay = useMemo(() => {
        const grouped = {};

        tasks.forEach((task) => {
            const dueDateRaw = task.dueDate || task.deadline || task.due_date;
            const dueDate = dueDateRaw ? new Date(dueDateRaw) : null;

            if (!dueDate || Number.isNaN(dueDate.getTime())) {
                return;
            }

            if (dueDate.getFullYear() !== selectedYear || dueDate.getMonth() + 1 !== selectedMonthIndex) {
                return;
            }

            const day = dueDate.getDate();
            if (!grouped[day]) {
                grouped[day] = [];
            }

            grouped[day].push(task);
        });

        Object.keys(grouped).forEach((dayKey) => {
            grouped[dayKey].sort((a, b) => {
                const aDate = new Date(a.dueDate || a.deadline || a.due_date || 0);
                const bDate = new Date(b.dueDate || b.deadline || b.due_date || 0);
                return aDate - bDate;
            });
        });

        return grouped;
    }, [tasks, selectedYear, selectedMonthIndex]);

    const calendarCells = useMemo(() => {
        const cells = [];

        for (let index = 0; index < firstWeekday; index += 1) {
            cells.push({ key: `empty-start-${index}`, isEmpty: true });
        }

        for (let day = 1; day <= daysInSelectedMonth; day += 1) {
            cells.push({ key: `day-${day}`, day, isEmpty: false });
        }

        while (cells.length % 7 !== 0) {
            cells.push({ key: `empty-end-${cells.length}`, isEmpty: true });
        }

        return cells;
    }, [firstWeekday, daysInSelectedMonth]);

    const isTaskCompleted = (task) => task.completed === true || task.status === 'done' || task.status === 'completed';

    const pendingTasksDueTomorrow = useMemo(() => {
        const now = new Date();
        const tomorrowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        const tomorrowEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);

        return tasks.filter((task) => {
            if (isTaskCompleted(task)) {
                return false;
            }

            const dueDateRaw = task.dueDate || task.deadline || task.due_date;
            const dueDate = parseTaskTimestamp(dueDateRaw);

            if (!dueDate) {
                return false;
            }

            return dueDate >= tomorrowStart && dueDate < tomorrowEnd;
        });
    }, [tasks]);

    useEffect(() => {
        if (pendingTasksDueTomorrow.length === 0) {
            lastTomorrowAlertRef.current = '';
            return;
        }

        const todayKey = new Date().toISOString().slice(0, 10);
        const tasksKey = pendingTasksDueTomorrow
            .map((task) => String(task.id))
            .sort()
            .join(',');
        const alertKey = `${todayKey}:${tasksKey}`;

        if (lastTomorrowAlertRef.current === alertKey) {
            return;
        }

        lastTomorrowAlertRef.current = alertKey;

        toast.warning(
            pendingTasksDueTomorrow.length === 1
                ? t('tomorrowDueOne')
                : t('tomorrowDueMany').replace('{{count}}', String(pendingTasksDueTomorrow.length)),
            {
                className: 'timetotask-toast',
                icon: '⏰',
            }
        );
    }, [pendingTasksDueTomorrow]);

    const statusColorMap = {
        backlog: 'rgba(255, 255, 255, 0.9)',
        selected: 'rgba(244, 226, 133, 0.95)',
        inProgress: TASK_TYPE_SOFT_THEME.feature.headerFrom,
        inReview: TASK_TYPE_SOFT_THEME.documentation.headerFrom,
        completed: 'rgba(182, 209, 199, 0.98)',
    };

    const testingLightColor = 'rgba(182, 209, 199, 0.98)';

    const priorityColorMap = {
        high: TASK_TYPE_SOFT_THEME.bug.headerFrom,
        medium: TASK_TYPE_SOFT_THEME.improvement.headerFrom,
        low: TASK_TYPE_SOFT_THEME.default.headerFrom,
    };

    const statusSegments = [
        {
            id: 'backlog',
            label: 'Backlog',
            strokeColor: statusColorMap.backlog,
            textColor: statusColorMap.backlog,
            value: tasks.filter((task) => task.status === 'backlog').length,
        },
        {
            id: 'selected',
            label: 'Seleccionadas',
            strokeColor: statusColorMap.selected,
            textColor: statusColorMap.selected,
            value: tasks.filter((task) => task.status === 'selected').length,
        },
        {
            id: 'inProgress',
            label: 'En progreso',
            strokeColor: statusColorMap.inProgress,
            textColor: statusColorMap.inProgress,
            value: tasks.filter((task) => task.status === 'inProgress').length,
        },
        {
            id: 'inReview',
            label: 'En revisión',
            strokeColor: statusColorMap.inReview,
            textColor: statusColorMap.inReview,
            value: tasks.filter((task) => task.status === 'inReview').length,
        },
        {
            id: 'completed',
            label: 'Completadas',
            strokeColor: statusColorMap.completed,
            textColor: statusColorMap.completed,
            value: tasks.filter((task) => isTaskCompleted(task)).length,
        },
    ];

    const typeSegments = Object.entries(TASK_TYPES).map(([typeKey, typeConfig]) => ({
        id: typeKey,
        label: typeConfig.name,
        strokeColor: typeKey === 'testing'
            ? testingLightColor
            : (TASK_TYPE_SOFT_THEME[typeKey] || TASK_TYPE_SOFT_THEME.default).headerFrom,
        textColor: typeKey === 'testing'
            ? testingLightColor
            : (TASK_TYPE_SOFT_THEME[typeKey] || TASK_TYPE_SOFT_THEME.default).headerFrom,
        value: tasks.filter((task) => (task.type || 'feature') === typeKey).length,
    }));

    const prioritySegments = [
        {
            id: 'high',
            label: 'Alta',
            strokeColor: priorityColorMap.high,
            textColor: priorityColorMap.high,
            value: tasks.filter((task) => task.priority === 'high').length,
        },
        {
            id: 'medium',
            label: 'Media',
            strokeColor: priorityColorMap.medium,
            textColor: priorityColorMap.medium,
            value: tasks.filter((task) => task.priority === 'medium').length,
        },
        {
            id: 'low',
            label: 'Baja',
            strokeColor: priorityColorMap.low,
            textColor: priorityColorMap.low,
            value: tasks.filter((task) => task.priority === 'low').length,
        },
    ];

    const summarySections = [
        {
            id: 'estado',
            title: 'Estado',
            icon: 'fa-layer-group',
            segments: statusSegments,
            total: tasks.length,
        },
        {
            id: 'tipo',
            title: 'Tipo',
            icon: 'fa-tags',
            segments: typeSegments,
            total: tasks.length,
        },
        {
            id: 'prioridad',
            title: 'Prioridad',
            icon: 'fa-flag',
            segments: prioritySegments,
            total: tasks.length,
        },
    ];

    function parseTaskTimestamp(rawValue) {
        if (!rawValue) {
            return null;
        }

        if (rawValue instanceof Date) {
            return Number.isNaN(rawValue.getTime()) ? null : rawValue;
        }

        if (typeof rawValue === 'number') {
            const parsedFromNumber = new Date(rawValue);
            return Number.isNaN(parsedFromNumber.getTime()) ? null : parsedFromNumber;
        }

        if (typeof rawValue === 'string') {
            const normalizedValue = rawValue.includes(' ') ? rawValue.replace(' ', 'T') : rawValue;
            const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/.test(normalizedValue);
            const utcCandidate = hasTimezone ? normalizedValue : `${normalizedValue}Z`;
            const parsedFromString = new Date(utcCandidate);

            if (!Number.isNaN(parsedFromString.getTime())) {
                return parsedFromString;
            }

            const fallbackParsed = new Date(rawValue);
            return Number.isNaN(fallbackParsed.getTime()) ? null : fallbackParsed;
        }

        return null;
    }

    const recentUpdates = [...tasks]
        .filter((task) => task.updated_at || task.updatedAt || task.created_at || task.createdAt)
        .sort((firstTask, secondTask) => {
            const firstDate = parseTaskTimestamp(firstTask.updated_at || firstTask.updatedAt || firstTask.created_at || firstTask.createdAt) || new Date(0);
            const secondDate = parseTaskTimestamp(secondTask.updated_at || secondTask.updatedAt || secondTask.created_at || secondTask.createdAt) || new Date(0);
            return secondDate - firstDate;
        })
        .slice(0, 8);

    const getTimeAgoLabel = (dateValue) => {
        const date = dateValue instanceof Date ? dateValue : new Date(dateValue);
        const timestamp = date.getTime();

        if (Number.isNaN(timestamp)) {
            return t('noDate');
        }

        const diffMs = Math.max(0, nowTimestamp - timestamp);
        const second = 1000;
        const minute = 60 * 1000;
        const hour = 60 * minute;
        const day = 24 * hour;

        if (diffMs < minute) {
            const seconds = Math.floor(diffMs / second);
            return `Hace ${seconds} segundo${seconds === 1 ? '' : 's'}`;
        }

        if (diffMs < hour) {
            const minutes = Math.floor(diffMs / minute);
            return `Hace ${minutes} minuto${minutes === 1 ? '' : 's'}`;
        }

        if (diffMs < day) {
            const hours = Math.floor(diffMs / hour);
            return `Hace ${hours} hora${hours === 1 ? '' : 's'}`;
        }

        const days = Math.floor(diffMs / day);
        return `Hace ${days} día${days === 1 ? '' : 's'}`;
    };

    const latestUpdateDate = recentUpdates.length > 0
        ? parseTaskTimestamp(
            recentUpdates[0].updated_at ||
            recentUpdates[0].updatedAt ||
            recentUpdates[0].created_at ||
            recentUpdates[0].createdAt
        )
        : null;

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-[#1E1E1E] via-[#2B2B2B] to-[#000000]' : 'light-theme-page'}`}>
            <div className="relative min-h-screen px-4 py-8">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-[#BC4B51] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob top-0 -left-4"></div>
                    <div className="absolute w-96 h-96 bg-[#F4E285] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 top-0 -right-4"></div>
                    <div className="absolute w-96 h-96 bg-[#F4A259] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-20"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="mb-3 flex items-center gap-3">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#8CB369]/45 bg-[#8CB369]/12 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#B6D1C7]">
                                <i className="fas fa-chart-pie"></i>
                                {t('mainPanel')}
                            </span>
                            <button
                                type="button"
                                onClick={() => setShowDashboardInfo((prev) => !prev)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 bg-[#F4E285]/15 text-[#FFF6D0] transition hover:bg-[#F4E285]/25 shadow-sm"
                                style={{ borderColor: theme === 'dark' ? 'rgba(244, 226, 133, 0.62)' : 'rgba(151, 114, 31, 0.80)' }}
                                aria-label={t('mainPanel')}
                                title={t('mainPanel')}
                            >
                                <i className="fas fa-info text-xs"></i>
                            </button>
                        </div>
                        <div
                            className="inline-block rounded-2xl border-2 bg-black/15 px-6 py-4 shadow-[0_12px_30px_rgba(0,0,0,0.38)]"
                            style={{ borderColor: theme === 'dark' ? 'rgba(182, 209, 199, 0.55)' : 'rgba(151, 114, 31, 0.78)' }}
                        >
                            <h1 className="font-display-title text-6xl md:text-7xl font-bold mb-0 drop-shadow-lg tracking-wide bg-gradient-to-r from-[#B6D1C7] via-white to-[#F4E285] bg-clip-text text-transparent">
                                Dashboard
                            </h1>
                        </div>
                        {showDashboardInfo && (
                            <div className="mt-3 rounded-xl border border-[#F4E285]/35 bg-[#1E1E1E]/70 light-theme-card p-3 text-sm text-[#E6E6E6] shadow-lg backdrop-blur">
                                {t('startWithProjectHelp')}
                            </div>
                        )}
                    </div>

                    {/* Proyectos */}
                    <div className="mb-8">
                        <div
                            className="rounded-2xl border p-5 backdrop-blur-lg"
                            style={{
                                borderColor: 'rgba(140, 179, 105, 0.45)',
                                background: 'linear-gradient(145deg, rgba(140, 179, 105, 0.20), rgba(91, 142, 125, 0.12))',
                            }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-semibold text-[#D8E7E0]">
                                    <i className="fas fa-folder-open mr-2 text-[#8CB369]"></i>
                                    {t('myProjects')}
                                </h2>
                                <button
                                    onClick={() => setShowAddProjectModal(true)}
                                    className="px-6 py-3 text-white rounded-xl font-bold shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                                    style={{ backgroundImage: 'linear-gradient(135deg, rgba(140, 179, 105, 0.9), rgba(91, 142, 125, 0.9))' }}
                                >
                                    <i className="fas fa-plus"></i>
                                    {t('newProject')}
                                </button>
                            </div>

                            <p className="text-[#EAF4E2] font-medium mb-4">
                                {t('startWithProjectHelp')}
                            </p>

                            <ProjectList
                                projects={projects}
                                loading={loading}
                                onEditProject={(project) => {
                                    setProjectToEdit(project);
                                    setShowAddProjectModal(true);
                                }}
                                onDeleteProject={async (projectId) => {
                                    await deleteProject(projectId);
                                }}
                            />
                        </div>
                    </div>

                    {/* Calendario de tareas agregadas */}
                    <div className="mb-8">
                        <div
                            className="backdrop-blur-lg rounded-2xl border-2 p-6"
                            style={{
                                borderColor: theme === 'dark' ? 'rgba(244, 226, 133, 0.55)' : 'rgba(151, 114, 31, 0.75)',
                                background: theme === 'dark'
                                    ? 'linear-gradient(145deg, rgba(244, 226, 133, 0.34), rgba(244, 162, 89, 0.20))'
                                    : 'linear-gradient(145deg, rgba(221, 181, 84, 0.42), rgba(186, 141, 40, 0.30))',
                            }}
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold text-[#FFF6D0] mb-2">
                                        <i className="fas fa-calendar-alt mr-2 text-[#F4E285]"></i>
                                        {t('calendarTasks')}
                                    </h2>
                                    <p className="text-sm text-gray-100">{t('calendarByDueDate')}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="text-sm text-white/80">{t('month')}</label>
                                    <input
                                        type="month"
                                        value={selectedMonth}
                                        onChange={(event) => setSelectedMonth(event.target.value)}
                                        className="bg-gray-900/50 text-white border border-white/20 rounded-lg px-3 py-2 text-sm"
                                    />
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-7 gap-3">
                                {weekdayLabels.map((label) => (
                                    <div key={label} className="text-center text-xs font-semibold uppercase tracking-wide text-[#FFF6D0] light-theme-text">
                                        {label}
                                    </div>
                                ))}

                                {calendarCells.map((cell) => {
                                    if (cell.isEmpty) {
                                        return (
                                            <div
                                                key={cell.key}
                                                className="h-[140px] rounded-xl border"
                                                style={{
                                                    borderColor: theme === 'dark' ? 'rgba(244, 226, 133, 0.35)' : 'rgba(151, 114, 31, 0.55)',
                                                    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.10)' : 'rgba(255, 246, 214, 0.42)',
                                                }}
                                            ></div>
                                        );
                                    }

                                    const dayTasks = tasksByDay[cell.day] || [];

                                    return (
                                        <div
                                            key={cell.key}
                                            className="h-[140px] rounded-xl border p-2 backdrop-blur-sm flex flex-col"
                                            style={{
                                                borderColor: theme === 'dark' ? 'rgba(244, 226, 133, 0.45)' : 'rgba(151, 114, 31, 0.70)',
                                                backgroundColor: theme === 'dark' ? 'rgba(36, 29, 9, 0.24)' : 'rgba(253, 243, 201, 0.58)',
                                            }}
                                        >
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="text-sm font-bold text-[#FFF6D0]">{cell.day}</span>
                                                <span className="text-[11px] text-[#F4E285]">{dayTasks.length}</span>
                                            </div>

                                            <div className="space-y-2 min-h-0 overflow-y-auto pr-1">
                                                {dayTasks.slice(0, 4).map((task) => {
                                                    const typeTheme = TASK_TYPE_SOFT_THEME[task.type] || TASK_TYPE_SOFT_THEME.default;

                                                    return (
                                                        <div
                                                            key={`calendar-task-${task.id}`}
                                                            className="rounded-md border px-2 py-1 shadow-sm"
                                                            style={{
                                                                backgroundColor: typeTheme.cardSurface,
                                                                borderColor: typeTheme.cardBorder,
                                                            }}
                                                            title={task.title || task.name}
                                                        >
                                                            <p className="text-[11px] font-semibold leading-tight line-clamp-2 text-white/90">
                                                                {task.title || task.name}
                                                            </p>
                                                        </div>
                                                    );
                                                })}

                                                {dayTasks.length > 4 && (
                                                    <p className="text-[11px] font-semibold text-[#FFEFB2]">
                                                        +{dayTasks.length - 4} {t('more')}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Resumen + actualizaciones */}
                    <div className="mb-8">
                        <h2 className="mb-6 text-2xl font-semibold text-[#EAF4E2]">
                            <i className="fas fa-chart-bar mr-2 text-[#8CB369]"></i>
                            {t('summary')}
                        </h2>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {summarySections.map((section) => (
                                <div
                                    key={section.id}
                                    className="rounded-2xl border-2 p-5 backdrop-blur-lg"
                                    style={{
                                        borderColor: theme === 'dark' ? 'rgba(244, 226, 133, 0.35)' : 'rgba(151, 114, 31, 0.70)',
                                        background: theme === 'dark'
                                            ? 'linear-gradient(145deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))'
                                            : 'linear-gradient(145deg, rgba(221, 181, 84, 0.30), rgba(186, 141, 40, 0.22))',
                                    }}
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-black text-white">
                                            <i className={`fas ${section.icon} mr-2`}></i>
                                            {section.title}
                                        </h3>
                                        <span className="text-2xl font-black text-[#F4E285]">{section.total}</span>
                                    </div>

                                    <div className="mb-4 flex items-center justify-center">
                                        <button
                                            type="button"
                                            onClick={() => setExpandedSection(section)}
                                            className="rounded-xl p-2 transition hover:bg-white/10"
                                            title="Ver gráfico ampliado"
                                        >
                                            <PieChart segments={section.segments} total={section.total} />
                                        </button>
                                    </div>

                                    <div className="space-y-1">
                                        {section.segments.map((segment) => (
                                            <div key={`${section.id}-${segment.id}`} className="flex items-center justify-between text-sm">
                                                <span className="font-semibold" style={{ color: segment.textColor }}>{segment.label}</span>
                                                <span className="font-bold" style={{ color: segment.textColor }}>{segment.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div
                            className="mt-4 rounded-2xl border p-5 backdrop-blur-lg"
                            style={{
                                borderColor: 'rgba(140, 179, 105, 0.45)',
                                background: 'linear-gradient(145deg, rgba(140, 179, 105, 0.26), rgba(91, 142, 125, 0.16))',
                            }}
                        >
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-[#EAF4E2]">
                                    <i className="fas fa-history mr-2"></i>
                                    {t('latestUpdates')}
                                </h3>
                                <span className="text-sm font-semibold text-white/80">
                                    {latestUpdateDate && !Number.isNaN(latestUpdateDate.getTime())
                                        ? `${t('lastUpdate')}: ${getTimeAgoLabel(latestUpdateDate)}`
                                        : t('noUpdatesYet')}
                                </span>
                            </div>

                            {recentUpdates.length > 0 ? (
                                <div className="space-y-2">
                                    {recentUpdates.map((task) => {
                                        const typeConfig = TASK_TYPES[task.type] || TASK_TYPES.feature;
                                        const typeTheme = TASK_TYPE_SOFT_THEME[task.type] || TASK_TYPE_SOFT_THEME.default;
                                        const updatedDate = parseTaskTimestamp(task.updated_at || task.updatedAt || task.created_at || task.createdAt);
                                        const wasCompleted = isTaskCompleted(task);

                                        return (
                                            <div
                                                key={`update-${task.id}`}
                                                className="flex items-center justify-between rounded-xl border px-3 py-2"
                                                style={{
                                                    borderColor: 'rgba(140, 179, 105, 0.35)',
                                                    backgroundColor: 'rgba(9, 28, 22, 0.26)',
                                                }}
                                            >
                                                <div className="min-w-0">
                                                    <p className="line-clamp-1 text-sm font-semibold text-white">{task.title || task.name}</p>
                                                    <p className="text-xs font-semibold" style={{ color: typeTheme.headerFrom }}>{typeConfig.name}</p>
                                                </div>
                                                <div className="ml-3 text-right">
                                                    <p className="text-[11px] text-white/70">{getTimeAgoLabel(updatedDate)}</p>
                                                    <p className={`text-xs font-bold ${wasCompleted ? 'text-[#8CB369]' : 'text-[#F4E285]'}`}>
                                                        {wasCompleted ? t('completed') : t('updated')}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-sm text-white/70">{t('noUpdatesYet')}</p>
                            )}
                        </div>
                    </div>

                    {/* Modales */}
                    <AddTaskModal
                        isOpen={showAddTaskModal}
                        onClose={() => {
                            setShowAddTaskModal(false);
                            setErrorForm(null);
                        }}
                        onSubmit={async (data) => {
                            try {
                                setIsLoadingForm(true);
                                setErrorForm(null);
                                if (addTask) {
                                    await addTask(data);
                                }
                                setShowAddTaskModal(false);
                            } catch (err) {
                                setErrorForm(err.message);
                                console.error('Error al crear tarea:', err);
                            } finally {
                                setIsLoadingForm(false);
                            }
                        }}
                    />

                    <ProjectModal
                        isOpen={showAddProjectModal}
                        mode={projectToEdit ? 'edit' : 'create'}
                        initialData={projectToEdit}
                        onClose={() => {
                            setShowAddProjectModal(false);
                            setProjectToEdit(null);
                            setErrorForm(null);
                        }}
                        onSubmit={async (data) => {
                            try {
                                setIsLoadingForm(true);
                                setErrorForm(null);
                                if (projectToEdit) {
                                    await updateProjectData(projectToEdit.id, data);
                                } else {
                                    await createProject(data);
                                    showSuccessToast(t('projectCreated'));
                                }
                                setShowAddProjectModal(false);
                                setProjectToEdit(null);
                            } catch (err) {
                                setErrorForm(err.message);
                                if (!projectToEdit) {
                                    showErrorToast(t('error'));
                                }
                                console.error('Error al guardar proyecto:', err);
                            } finally {
                                setIsLoadingForm(false);
                            }
                        }}
                    />

                    {expandedSection && (
                        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
                            <div className="w-full max-w-2xl rounded-2xl border border-white/25 bg-[#1E1E1E]/95 p-6 backdrop-blur-lg">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-2xl font-semibold text-white">{expandedSection.title} · {t('detailByArea')}</h3>
                                    <button
                                        type="button"
                                        onClick={() => setExpandedSection(null)}
                                        className="rounded-lg px-3 py-1 text-white/80 hover:bg-white/10 hover:text-white"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-center">
                                    <div className="flex justify-center">
                                        <PieChart
                                            segments={expandedSection.segments}
                                            total={expandedSection.total}
                                            size={260}
                                            showSliceValues
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        {expandedSection.segments.map((segment) => (
                                            <div
                                                key={`expanded-${expandedSection.id}-${segment.id}`}
                                                className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.strokeColor }}></span>
                                                    <span className="font-semibold text-white">{segment.label}</span>
                                                </div>
                                                <span className="font-bold text-white">{segment.value} tareas</span>
                                            </div>
                                        ))}
                                        <div className="pt-2 text-right text-sm text-white/80">
                                            Total: <span className="font-bold text-white">{expandedSection.total} tareas</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}