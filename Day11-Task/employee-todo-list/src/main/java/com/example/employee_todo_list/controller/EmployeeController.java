package com.example.employee_todo_list.controller;

import model.Employee;
import model.Todo;
import org.springframework.web.bind.annotation.*;
import service.EmployeeService;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @RequestBody Employee emp) {
        return service.updateEmployee(id, emp);
    }

    @GetMapping("/role/{role}")
    public List<Employee> findByRole(@PathVariable String role) {
        return service.getByRole(role);
    }

    @GetMapping("/{id}/todos")
    public List<Todo> getTodos(@PathVariable Long id) {
        return service.getTodosByEmployeeId(id);
    }

    @PostMapping("/{id}/todos")
    public Todo addTodo(@PathVariable Long id, @RequestBody Todo todo) {
        return service.addTodoToEmployee(id, todo);
    }
}
