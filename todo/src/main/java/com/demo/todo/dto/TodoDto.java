package com.demo.todo.dto;

import com.demo.todo.model.Todo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class TodoDto {
    private Long id;
    private String title;
    private String description;
    private boolean completed;

    public TodoDto(Todo todo) {
        this.id = todo.getId();
        this.title = todo.getTitle();
        this.description = todo.getDescription();
        this.completed = todo.isCompleted();
    }
}
