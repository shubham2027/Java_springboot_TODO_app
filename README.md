# To-Do Backend

This repository contains only the backend for a To-Do application.

There is no frontend or client UI in this project. It provides a REST API built with Spring Boot for managing users and their todos.

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

- This project is intended as a backend service only.
- Any web or mobile frontend should be developed in a separate repository or client application.
