package com.demo.todo.service;

import java.util.List;

import com.demo.todo.dto.TodoDto;

public interface TodoService {
    public TodoDto addTodo(TodoDto todoDto);

    public TodoDto getTodo(Long id);

    public List<TodoDto> getAllTodos();

    public TodoDto updateTodo(TodoDto todoDto, Long id);
    
    public void deleteTodo(Long id);

    public TodoDto completeTodo(Long id);
    
    public TodoDto incompleteTodo(Long id);
}
