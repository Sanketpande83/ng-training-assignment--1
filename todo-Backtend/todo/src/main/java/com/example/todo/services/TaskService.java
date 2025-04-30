package com.example.todo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todo.models.Task;
import com.example.todo.repositories.TaskRepository;

import java.util.List;

@Service
public class TaskService {
 @Autowired
 private TaskRepository taskrepo;

 public List<Task> getAll() {
     return taskrepo.findAll();
 }

 public Task create(Task task) {
     return taskrepo.save(task);
 }

 public Task update(String id, Task task) {
     task.setId(id);
     return taskrepo.save(task);
 }

 public void delete(String id) {
	 taskrepo.deleteById(id);
 }
}
