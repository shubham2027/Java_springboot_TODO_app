# To-Do Application (Spring Boot + React)

This repository contains a full-stack To-Do application:

- Backend: Spring Boot REST API
- Frontend: React + Vite app in `FRONTEND/`

The app supports account creation, login, and user-scoped todo management.

## Tech Stack

### Backend

- Java 25
- Spring Boot 4.0.2
- Spring Web MVC
- Spring Data JPA (Hibernate)
- Jakarta Validation
- Spring Security Crypto (BCrypt password hashing)
- H2 in-memory database
- Maven Wrapper (`mvnw`, `mvnw.cmd`)

### Frontend

- React 19
- Vite 8
- Native Fetch API (custom HTTP client)
- ESLint 10

## Current Features

- User registration and login
- User CRUD APIs
- Todo CRUD APIs scoped by user (`/api/users/{userId}/todos`)
- DTO-based request/response mapping
- Backend validation on DTOs/entities
- Global exception handling with consistent error payloads
- BCrypt password hashing and password match on login
- CORS configured for `http://localhost:5173`
- H2 console enabled for local development

## Project Structure

```text
To-Do/
	src/main/java/com/example/To/Do/
		controller/   (UserController, TodoController)
		service/      (UserService, TodoService)
		repository/   (UserRepository, TodoRepository)
		entity/       (User, Todo)
		dto/          (request/update/response DTOs)
		mapper/       (DtoMapper)
		exceptions/   (GlobalExceptionHandler, custom exceptions)
		utils/        (PasswordEncoder)
	src/main/resources/application.yaml
	FRONTEND/
		src/api/      (httpClient, usersApi, todosApi)
		src/pages/
		src/components/
		src/hooks/
		src/styles/
```

## Run Locally

### 1) Start Backend (Spring Boot)

From the repository root:

```powershell
./mvnw.cmd spring-boot:run
```

Backend runs at:

- `http://localhost:8080`

H2 Console:

- `http://localhost:8080/h2-console`

H2 connection settings:

- JDBC URL: `jdbc:h2:mem:tododb;MODE=MySQL;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE`
- Username: `sa`
- Password: (empty)

### 2) Start Frontend (React + Vite)

From the `FRONTEND/` directory:

```powershell
npm install
npm run dev
```

Frontend runs at:

- `http://localhost:5173`

Important:

- Frontend API base URL is currently hardcoded to `http://localhost:8080` in `FRONTEND/src/api/httpClient.js`.

## API Overview

Base URL: `http://localhost:8080`

### User Endpoints

- `POST /api/users` - create user
- `POST /api/users/login` - login with username/password
- `GET /api/users` - get all users
- `GET /api/users/{userId}` - get user by id
- `PUT /api/users/{userId}` - update user
- `DELETE /api/users/{userId}` - delete user

### Todo Endpoints

- `POST /api/users/{userId}/todos` - create todo
- `GET /api/users/{userId}/todos` - list todos for user
- `GET /api/users/{userId}/todos/{todoId}` - get one todo
- `PUT /api/users/{userId}/todos/{todoId}` - update todo
- `DELETE /api/users/{userId}/todos/{todoId}` - delete todo
- `GET /api/users/{userId}/todos/hello` - utility/test endpoint

## Validation Highlights

- User create: username, email, password constraints
- Login: username and password required
- Todo create/update: title/description/completed constraints
- Frontend also validates username/email/password in `FRONTEND/src/utils/validation.js`

## Authentication Model (Current)

- Login verifies credentials against stored BCrypt password hashes.
- No JWT/session tokens yet.
- Frontend keeps active user state in memory and calls user-scoped todo APIs.

## Error Handling

The backend uses a centralized `GlobalExceptionHandler` and returns an `ErrorResponse` payload for common error cases (404, 400, 500).

## Notes

- `ddl-auto` is set to `create-drop` in `application.yaml`, so data resets when the backend restarts.
- This project is currently configured for local development.
