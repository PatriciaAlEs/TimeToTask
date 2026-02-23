# My Fullstack App

This project is a fullstack application built with a React frontend and a Flask backend. It features JWT authentication, user registration, and a simple dashboard for authenticated users.

## Project Structure

```
my-fullstack-app
├── frontend
│   ├── src
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── components
│   │   │   ├── Auth
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   ├── Layout
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Footer.jsx
│   │   │   └── common
│   │   │       └── Button.jsx
│   │   ├── pages
│   │   │   ├── Home.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   ├── hooks
│   │   │   └── useAuth.js
│   │   ├── utils
│   │   │   └── helpers.js
│   │   └── styles
│   │       └── index.css
│   ├── public
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend
│   ├── app
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── models
│   │   │   ├── __init__.py
│   │   │   └── user.py
│   │   ├── routes
│   │   │   ├── __init__.py
│   │   │   ├── auth.py
│   │   │   └── api.py
│   │   ├── services
│   │   │   ├── __init__.py
│   │   │   └── auth_service.py
│   │   ├── utils
│   │   │   ├── __init__.py
│   │   │   └── jwt_handler.py
│   │   └── extensions.py
│   ├── migrations
│   ├── tests
│   │   └── __init__.py
│   ├── requirements.txt
│   └── run.py
└── README.md
```

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Install dependencies using npm:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Backend Setup

1. Navigate to the `backend` directory.
2. Create a virtual environment and activate it:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Run the Flask application:
   ```
   python run.py
   ```

## Features

- User authentication with JWT
- User registration and login
- Responsive design using Tailwind CSS
- Modular architecture for easy maintenance and scalability

## License

This project is licensed under the MIT License.