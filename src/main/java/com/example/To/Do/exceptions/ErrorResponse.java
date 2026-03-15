package com.example.To.Do.exceptions;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class ErrorResponse {

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    
    public ErrorResponse(int status, String error, String message, String path) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
    }

    //Getters and Setters
    public void setTimestamp(LocalDateTime timStamp) { this.timestamp = timStamp; }
    public LocalDateTime getTimestamp() { return timestamp; }

    public void setStatus(int status) { this.status = status; }
    public int getStatus() { return status; }

    public void setError(String error) { this.error = error; }
    public String getError() { return error; }

    public void setMessage(String message) { this.message = message; }
    public String getMessage() { return message; }

    public void setPath(String path) { this.path = path; }
    public String getPath() { return path; }


}
