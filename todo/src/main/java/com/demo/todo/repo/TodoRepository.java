package com.demo.todo.repo;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import com.demo.todo.model.Todo;

public interface TodoRepository extends JpaRepository<Todo, Long> {
   List<Todo> findAll(Sort sort);
}
