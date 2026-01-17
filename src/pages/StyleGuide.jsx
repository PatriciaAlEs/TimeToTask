/**
 * Página de referencia - Sistema de estilos base del Dashboard
 * Muestra todos los componentes reutilizables en acción
 */

import {
    DashboardLayout,
    DashboardHeader,
    Section,
    DashboardGrid,
    Row,
    Column,
    Divider,
    PageContainer,
    ContentWrapper,
} from '../common/Layout';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardFooter,
    SimpleCard,
    StatsCard,
    ErrorCard,
    SuccessCard,
} from '../common/Cards';
import {
    Button,
    ButtonPrimary,
    ButtonSecondary,
    ButtonDanger,
    ButtonSuccess,
    ButtonOutline,
} from '../common/Buttons';
import {
    Input,
    Textarea,
    Select,
    Checkbox,
    Radio,
    Form,
    FormGroup,
} from '../common/Inputs';

export default function StyleGuide() {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
    };

    return (
        <PageContainer
            title="Sistema de Estilos Base"
            subtitle="Referencia completa de componentes reutilizables"
        >
            {/* ===== BOTONES ===== */}
            <Section title="Sistema de Botones" className="mb-12">
                <Card>
                    <CardBody>
                        <div className="space-y-6">
                            {/* Variantes */}
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-gray-900">Variantes</h4>
                                <Row gap={2} className="flex-wrap">
                                    <ButtonPrimary>Primario</ButtonPrimary>
                                    <ButtonSecondary>Secundario</ButtonSecondary>
                                    <ButtonDanger>Peligro</ButtonDanger>
                                    <ButtonSuccess>Éxito</ButtonSuccess>
                                    <ButtonOutline variant="primary">Outline Primario</ButtonOutline>
                                    <ButtonOutline variant="secondary">Outline Secundario</ButtonOutline>
                                </Row>
                            </div>

                            <Divider />

                            {/* Tamaños */}
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-gray-900">Tamaños</h4>
                                <Row gap={2} className="flex-wrap items-center">
                                    <ButtonPrimary size="sm">Pequeño</ButtonPrimary>
                                    <ButtonPrimary size="md">Mediano</ButtonPrimary>
                                    <ButtonPrimary size="lg">Grande</ButtonPrimary>
                                </Row>
                            </div>

                            <Divider />

                            {/* Estados */}
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-gray-900">Estados</h4>
                                <Row gap={2} className="flex-wrap">
                                    <ButtonPrimary>Activo</ButtonPrimary>
                                    <ButtonPrimary disabled>Deshabilitado</ButtonPrimary>
                                </Row>
                            </div>

                            <Divider />

                            {/* Ancho completo */}
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-gray-900">Ancho Completo</h4>
                                <ButtonPrimary fullWidth>Botón a ancho completo</ButtonPrimary>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Section>

            {/* ===== INPUTS Y FORMULARIOS ===== */}
            <Section title="Inputs y Formularios" className="mb-12">
                <Card>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Input básico */}
                                <Input
                                    id="username"
                                    label="Usuario"
                                    placeholder="Ingresa tu usuario"
                                    required
                                />

                                {/* Input con error */}
                                <Input
                                    id="email"
                                    label="Email"
                                    type="email"
                                    placeholder="tu@email.com"
                                    error
                                    helpText="Email inválido"
                                    required
                                />

                                {/* Input con éxito */}
                                <Input
                                    id="password"
                                    label="Contraseña"
                                    type="password"
                                    placeholder="••••••••"
                                    success
                                    helpText="Contraseña válida"
                                    required
                                />

                                {/* Input deshabilitado */}
                                <Input
                                    id="readonly"
                                    label="Campo deshabilitado"
                                    value="No editable"
                                    disabled
                                />
                            </div>

                            <Divider />

                            {/* Textarea */}
                            <Textarea
                                id="description"
                                label="Descripción"
                                placeholder="Escribe una descripción..."
                                helpText="Máximo 500 caracteres"
                            />

                            <Divider />

                            {/* Select */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Select
                                    id="category"
                                    label="Categoría"
                                    options={[
                                        { value: 'cat1', label: 'Categoría 1' },
                                        { value: 'cat2', label: 'Categoría 2' },
                                        { value: 'cat3', label: 'Categoría 3' },
                                    ]}
                                    required
                                />
                            </div>

                            <Divider />

                            {/* Checkboxes */}
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">Opciones</p>
                                <Column gap={2}>
                                    <Checkbox id="opt1" label="Opción 1" defaultChecked />
                                    <Checkbox id="opt2" label="Opción 2" />
                                    <Checkbox id="opt3" label="Opción 3" />
                                </Column>
                            </div>

                            <Divider />

                            {/* Radios */}
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-3">Selecciona una opción</p>
                                <Column gap={2}>
                                    <Radio id="rad1" label="Opción A" name="radio-group" defaultChecked />
                                    <Radio id="rad2" label="Opción B" name="radio-group" />
                                    <Radio id="rad3" label="Opción C" name="radio-group" />
                                </Column>
                            </div>

                            <Divider />

                            {/* Botones de formulario */}
                            <Row gap={3}>
                                <ButtonPrimary type="submit">Enviar</ButtonPrimary>
                                <ButtonSecondary type="button">Cancelar</ButtonSecondary>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Section>

            {/* ===== CARDS ===== */}
            <Section title="Sistema de Cards" className="mb-12">
                <DashboardGrid columns={3}>
                    {/* Card básica */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Card Básica</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <p className="text-gray-600">Contenido de una tarjeta básica con estructura completa.</p>
                        </CardBody>
                        <CardFooter justify="end">
                            <ButtonPrimary size="sm">Acción</ButtonPrimary>
                        </CardFooter>
                    </Card>

                    {/* Card simple */}
                    <SimpleCard
                        title="Card Simple"
                        footer={<ButtonPrimary size="sm">Aceptar</ButtonPrimary>}
                    >
                        <p className="text-gray-600">Composición rápida sin estructura detallada.</p>
                    </SimpleCard>

                    {/* Card variante */}
                    <Card variant="primary">
                        <CardBody>
                            <h4 className="font-bold mb-2">Card Primaria</h4>
                            <p className="text-primary-900">Tarjeta con variante de color.</p>
                        </CardBody>
                    </Card>
                </DashboardGrid>

                <Divider size="md" />

                {/* Stats Cards */}
                <div>
                    <h4 className="text-lg font-semibold mb-3 text-gray-900">Stats Cards</h4>
                    <DashboardGrid columns={4}>
                        <StatsCard title="Total Usuarios" value="1,234" trend="12%" icon="👥" />
                        <StatsCard title="Ingresos" value="$12,450" trend="8%" icon="💰" />
                        <StatsCard title="Tareas" value="156" trend="5%" trendUp={false} icon="✅" />
                        <StatsCard title="Visitantes" value="8,920" trend="23%" icon="👀" />
                    </DashboardGrid>
                </div>

                <Divider size="md" />

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SuccessCard
                        title="¡Éxito!"
                        message="La operación se completó correctamente."
                        action={<ButtonSuccess size="sm">Continuar</ButtonSuccess>}
                    />
                    <ErrorCard
                        title="Error"
                        message="Ocurrió un error al procesar tu solicitud."
                        action={<ButtonDanger size="sm">Reintentar</ButtonDanger>}
                    />
                </div>
            </Section>

            {/* ===== LAYOUT Y GRILLAS ===== */}
            <Section title="Layout y Grillas" className="mb-12">
                <div className="space-y-6">
                    {/* Grid 3 columnas */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3 text-gray-900">Grid 3 Columnas</h4>
                        <DashboardGrid columns={3}>
                            {[1, 2, 3].map((i) => (
                                <Card key={i}>
                                    <CardBody>
                                        <p className="text-center text-gray-600">Columna {i}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </DashboardGrid>
                    </div>

                    {/* Grid 2 columnas */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3 text-gray-900">Grid 2 Columnas</h4>
                        <DashboardGrid columns={2}>
                            {[1, 2].map((i) => (
                                <Card key={i}>
                                    <CardBody>
                                        <p className="text-center text-gray-600">Columna {i}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </DashboardGrid>
                    </div>

                    {/* Grid 4 columnas */}
                    <div>
                        <h4 className="text-lg font-semibold mb-3 text-gray-900">Grid 4 Columnas</h4>
                        <DashboardGrid columns={4}>
                            {[1, 2, 3, 4].map((i) => (
                                <Card key={i}>
                                    <CardBody>
                                        <p className="text-center text-gray-600">Col {i}</p>
                                    </CardBody>
                                </Card>
                            ))}
                        </DashboardGrid>
                    </div>
                </div>
            </Section>

            {/* ===== UTILIDADES ===== */}
            <Section title="Utilidades" className="mb-12">
                <Card>
                    <CardBody>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold mb-3 text-gray-900">Colores y Fondos</h4>
                                <Row gap={2} className="flex-wrap">
                                    <div className="bg-primary-50 px-4 py-2 rounded text-xs">Primary 50</div>
                                    <div className="bg-primary-600 text-white px-4 py-2 rounded text-xs">Primary 600</div>
                                    <div className="bg-green-600 text-white px-4 py-2 rounded text-xs">Success</div>
                                    <div className="bg-red-600 text-white px-4 py-2 rounded text-xs">Danger</div>
                                </Row>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Section>
        </PageContainer>
    );
}
