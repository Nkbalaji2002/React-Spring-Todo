package com.demo.todo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.demo.todo.dto.TodoDto;
import com.demo.todo.exception.ResourceNotFoundException;
import com.demo.todo.model.Todo;
import com.demo.todo.repo.TodoRepository;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Service
@NoArgsConstructor
@AllArgsConstructor
public class TodoServiceImplement implements TodoService {

    @Autowired
    private TodoRepository todoRepository;
    
    @Override
    public TodoDto addTodo(TodoDto todoDto) {
        Todo todo = new Todo();
        
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        Todo savedTodo = todoRepository.save(todo); 
        return new TodoDto(savedTodo);
    }

    @Override
    public TodoDto getTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));

        return new TodoDto(todo);
    }

    @Override
    public List<TodoDto> getAllTodos() {
       List<Todo> todos = todoRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
       return todos.stream().map(TodoDto::new).collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));

        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        Todo updatedTodo = todoRepository.save(todo);
        return new TodoDto(updatedTodo);
    }

    @Override
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Todos not found with id : " + id);
        }
        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));
        todo.setCompleted(true);

        Todo updatedTodo = todoRepository.save(todo);
        return new TodoDto(updatedTodo);
    }

    @Override
    public TodoDto incompleteTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));
        todo.setCompleted(false);

        Todo updatedTodo = todoRepository.save(todo);
        return new TodoDto(updatedTodo);
    }

}
