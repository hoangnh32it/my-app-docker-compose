package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class CalculatorController {
    @GetMapping("/caculator")
    public String calculate(@RequestParam int a, @RequestParam int b) {
        System.out.println("Getting caculator result");
        return String.valueOf(a + b);
    }
}