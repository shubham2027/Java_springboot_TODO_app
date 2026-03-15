package com.example.To.Do.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.NonFinal;

import java.time.LocalDateTime;

@Entity // it creates a table
@Table(name = "todos")

//to avoid writing getter and setter explicitly

// @Data // by using this lombok will create getters and setters for all the fields
// @AllArgsConstructor // by using this lombok will create an all argument constructor
// @NoArgsConstructor // by using this lombok will create a no argument constructor

public class Todo {
    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto incrementing id
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be 3-100 characters")
    private String title;

    @Size(max = 500, message = "Description max 500 characters")
    private String description;

    private Boolean completed;
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id" , nullable = false)
    private User user;



    public Todo(){

    }
    public Todo(String title, String description, Boolean completed){
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId(){
        return id;
    }
    public void setId(Long id){
        this.id = id;
    }

    public String getTitle(){
        return title;
    }
    public void setTitle(String title){
        this.title = title;
    }

    public String getDescription(){
        return description;
    }
    public void setDescription(String description){
        this.description = description;
    }

    public Boolean isCompleted(){
        return completed;
    }
    public void setCompleted(Boolean completed){
        this.completed = completed;
    }

    public LocalDateTime getCreatedAt(){
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime time){
        this.createdAt = time;
    }

    public User getUser(){
        return user;
    }

    public void setUser(User user){
        this.user = user;
    }



}
