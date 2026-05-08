package com.example.To.Do.controller;

import com.example.To.Do.dto.TodoDTO;
import com.example.To.Do.dto.TodoUpdateDTO;
import com.example.To.Do.entity.Todo;
import com.example.To.Do.service.TodoService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users/{userId}/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public ResponseEntity<TodoDTO> createTodo(@PathVariable Long userId, @Valid @RequestBody TodoDTO todoDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(todoService.createTodo(userId, todoDTO));
    }



    @GetMapping
    public ResponseEntity<List<TodoDTO>> getAllTodos(@PathVariable Long userId) {
        return ResponseEntity.ok(todoService.getAllTodos(userId));
    }

    @GetMapping("/{todoId}")
    public ResponseEntity<TodoDTO> getTodoById(@PathVariable Long userId, @PathVariable Long todoId) {
        return ResponseEntity.ok(todoService.getTodoById(userId, todoId));
    }

    @GetMapping("/hello")
    public ResponseEntity<String> getHello(@RequestParam(value = "name", defaultValue = "default_eeename") String name) {
        return ResponseEntity.ok("Hello, "+ name + "!");
    }

    @PutMapping("/{todoId}")
    public ResponseEntity<TodoDTO> updateTodo(
            @PathVariable Long userId,
            @PathVariable Long todoId,
            @Valid @RequestBody TodoUpdateDTO updateDTO) {
        return ResponseEntity.ok(todoService.updateTodo(userId, todoId, updateDTO));
    }

    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long userId, @PathVariable Long todoId) {
        todoService.deleteTodo(userId, todoId);
        return ResponseEntity.noContent().build();
    }
}
