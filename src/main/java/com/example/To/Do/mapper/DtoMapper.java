package com.example.To.Do.mapper;

import com.example.To.Do.dto.TodoDTO;
import com.example.To.Do.dto.TodoUpdateDTO;
import com.example.To.Do.dto.UserRequestDTO;
import com.example.To.Do.dto.UserResponseDTO;
import com.example.To.Do.dto.UserUpdateDTO;
import com.example.To.Do.entity.Todo;
import com.example.To.Do.entity.User;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DtoMapper {

    public TodoDTO toTodoDTO(Todo todo) {
        if (todo == null) {
            return null;
        }

        Long userId = todo.getUser() != null ? todo.getUser().getId() : null;

        return new TodoDTO(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.isCompleted(),
                todo.getCreatedAt(),
                userId
        );
    }

    public Todo toTodoEntity(TodoDTO dto) {
        if (dto == null) {
            return null;
        }

        Todo todo = new Todo();
        todo.setId(dto.getId());
        todo.setTitle(dto.getTitle());
        todo.setDescription(dto.getDescription());
        todo.setCompleted(dto.getCompleted());
        todo.setCreatedAt(dto.getCreatedAt());
        return todo;
    }

    public void updateTodoFromDto(TodoUpdateDTO dto, Todo todo) {
        if (dto == null || todo == null) {
            return;
        }

        if (dto.getTitle() != null) {
            todo.setTitle(dto.getTitle());
        }
        if (dto.getDescription() != null) {
            todo.setDescription(dto.getDescription());
        }
        if (dto.getCompleted() != null) {
            todo.setCompleted(dto.getCompleted());
        }
    }

    public List<TodoDTO> toTodoDTOList(List<Todo> todos) {
        if (todos == null) {
            return Collections.emptyList();
        }
        return todos.stream().map(this::toTodoDTO).collect(Collectors.toList());
    }

    public UserResponseDTO toUserResponseDTO(User user) {
        if (user == null) {
            return null;
        }

        List<TodoDTO> todoDTOs = user.getTodos() == null
                ? Collections.emptyList()
                : user.getTodos().stream().map(this::toTodoDTO).collect(Collectors.toList());

        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt(),
                todoDTOs
        );
    }

    public UserResponseDTO toUserResponseDTOWithoutTodos(User user) {
        if (user == null) {
            return null;
        }

        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getCreatedAt()
        );
    }

    public List<UserResponseDTO> toUserResponseDTOList(List<User> users) {
        if (users == null) {
            return Collections.emptyList();
        }
        return users.stream()
                .map(this::toUserResponseDTOWithoutTodos)
                .collect(Collectors.toList());
    }

    public User toUserEntity(UserRequestDTO dto) {
        if (dto == null) {
            return null;
        }

        User user = new User();
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        return user;
    }

    public void updateUserFromDto(UserUpdateDTO dto, User user) {
        if (dto == null || user == null) {
            return;
        }

        if (dto.getUsername() != null) {
            user.setUsername(dto.getUsername());
        }
        if (dto.getEmail() != null) {
            user.setEmail(dto.getEmail());
        }
        if (dto.getPassword() != null) {
            user.setPassword(dto.getPassword());
        }
    }
}
