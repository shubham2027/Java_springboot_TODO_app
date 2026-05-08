# To-Do Backend

This repository contains the Spring Boot backend for a To-Do application, with a separate React frontend available in the `FRONTEND/` folder.

It provides a REST API for managing users and their todos.

## Tech Stack

- Java 25
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA
- H2 in-memory database
- Maven

## Features

- User CRUD operations
- Todo CRUD operations scoped to a user
- Request validation with DTOs
- Centralized exception handling
- Passwords stored in the database are hashed with BCrypt
- H2 console for local development

## API Base Paths

- `/api/users`
- `/api/users/{userId}/todos`

## Run Locally

Use the Maven wrapper included in the project:

```powershell
./mvnw.cmd spring-boot:run
```

The application runs on:

- `http://localhost:8080`

H2 console:

- `http://localhost:8080/h2-console`

Default H2 settings from the current configuration:

- JDBC URL: `jdbc:h2:mem:tododb`
- Username: `sa`
- Password: empty

## Notes

- Passwords are hashed before being saved, and login compares the raw input against the stored hash.
- The password hashing logic is kept modular in `src/main/java/com/example/To/Do/utils/PasswordEncoder.java`.
- Any web or mobile frontend can live in a separate client application or use the included `FRONTEND/` app.
