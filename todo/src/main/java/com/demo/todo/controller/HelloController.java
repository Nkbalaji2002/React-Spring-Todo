package com.demo.todo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class HelloController {
    @GetMapping("/index")
    public String sayHello() {
        return "Hello World";
    }
    
}
