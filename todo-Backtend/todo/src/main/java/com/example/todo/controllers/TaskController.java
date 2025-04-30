package com.example.todo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.todo.models.Task;
import com.example.todo.services.TaskService;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TaskController {

 @Autowired
 private TaskService service;

 @GetMapping("/tasks")
 public List<Task> getTasks() {
     return service.getAll();
 }

 @PostMapping("/task")
 public Task addTask(@RequestBody Task task) {
     return service.create(task);
 }

 @PutMapping("/task/{id}")
 public Task updateTask(@PathVariable String id, @RequestBody Task task) {
     return service.update(id, task);
 }

 @DeleteMapping("/task/{id}")
 public void deleteTask(@PathVariable String id) {
     service.delete(id);
 }
}
