package com.example.To.Do.exceptions;

public class EmptyDb extends RuntimeException {
    public EmptyDb(String message) {
        super(message);
    }
}
