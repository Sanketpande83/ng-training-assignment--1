package com.example.todo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "tasks")
public class Task {
    @Id
    private String id;

    private String assignedTo;
    private String status;
    private String dueDate;
    private String priority;
    private String comments;

   
}

