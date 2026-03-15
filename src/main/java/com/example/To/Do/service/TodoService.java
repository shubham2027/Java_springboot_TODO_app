package com.example.To.Do.service;

import com.example.To.Do.dto.TodoDTO;
import com.example.To.Do.dto.TodoUpdateDTO;
import com.example.To.Do.entity.Todo;
import com.example.To.Do.entity.User;
import com.example.To.Do.exceptions.EmptyDb;
import com.example.To.Do.exceptions.GlobalExceptionHandler;
import com.example.To.Do.exceptions.ResourceNotFoundException;
import com.example.To.Do.mapper.DtoMapper;
import com.example.To.Do.repository.TodoRepository;
import com.example.To.Do.repository.UserRepository;

import lombok.Data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service

public class TodoService {
    
    private final TodoRepository todoRepository;
    private final UserRepository userRepository;
    private final DtoMapper dtoMapper;


    // constructor injection
    public TodoService(TodoRepository todoRepository, UserRepository userRepository, DtoMapper dtoMapper){
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;
        this.dtoMapper = dtoMapper;
    }

    public TodoDTO createTodo(Long userId, TodoDTO todoDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        Todo todo = dtoMapper.toTodoEntity(todoDTO);
        todo.setUser(user);
        todo.setCreatedAt(LocalDateTime.now());
        todo.setCompleted(false);

        return dtoMapper.toTodoDTO(todoRepository.save(todo));
    }


    public List<TodoDTO> getAllTodos(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<Todo> todos = todoRepository.findByUserId(userId);
        if (todos.isEmpty()) {
            throw new EmptyDb("Nothing to show here");
        }
        return dtoMapper.toTodoDTOList(todos);
    }


    public TodoDTO getTodoById(Long userId, Long todoId) {
        Todo todo = todoRepository.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Todo not found with id: " + todoId + " for user id: " + userId));

        return dtoMapper.toTodoDTO(todo);
    }
    

    public TodoDTO updateTodo(Long userId, Long todoId, TodoUpdateDTO updateDTO) {
        Todo existingTodo = todoRepository.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Todo not found with id: " + todoId + " for user id: " + userId));

        dtoMapper.updateTodoFromDto(updateDTO, existingTodo);
        return dtoMapper.toTodoDTO(todoRepository.save(existingTodo));
    }

    public void deleteTodo(Long userId, Long todoId) {
        Todo existingTodo = todoRepository.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Todo not found with id: " + todoId + " for user id: " + userId));

        todoRepository.delete(existingTodo);
    }
}
