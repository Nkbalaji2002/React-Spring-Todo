package com.demo.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.todo.dto.TodoDto;
import com.demo.todo.service.TodoService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/todos")
@AllArgsConstructor
public class TodoController {
    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        List<TodoDto> todos = todoService.getAllTodos();
        return ResponseEntity.ok(todos);
    }

    @PostMapping
    public ResponseEntity<TodoDto> createTodo(@RequestBody TodoDto todoDto) {
        TodoDto savedTodo = todoService.addTodo(todoDto);
        return new ResponseEntity<>(savedTodo, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable("id") Long id) {
        TodoDto todoDto = todoService.getTodo(id);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable("id") Long id, @RequestBody TodoDto todoDto) {
        TodoDto updatedTodo = todoService.updateTodo(todoDto, id);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodo(@PathVariable("id") Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok("Todo deleted Successfully!!!");
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long id) {
        TodoDto updatedTodo = todoService.completeTodo(id);
        return ResponseEntity.ok(updatedTodo);
    }

    @PatchMapping("/{id}/in-complete")
    public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") Long id) {
        TodoDto updatedTodo = todoService.incompleteTodo(id);
        return ResponseEntity.ok(updatedTodo);
    }
}
