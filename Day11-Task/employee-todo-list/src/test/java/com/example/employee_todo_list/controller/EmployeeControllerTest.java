package com.example.employee_todo_list.controller;

import model.Employee;
import model.Todo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.ContextConfiguration;
import com.example.employee_todo_list.EmployeeTodoApplication;
import service.EmployeeService;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(com.example.employee_todo_list.controller.EmployeeController.class)
@ContextConfiguration(classes = EmployeeTodoApplication.class)
public class EmployeeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private EmployeeService service;

    @Test
    void getByRoleReturnsEmployee() throws Exception {
        Employee emp = new Employee();
        emp.setId(1L);
        emp.setName("Alice");
        emp.setRole("Manager");

        when(service.getByRole("Manager")).thenReturn(List.of(emp));

        mockMvc.perform(get("/api/employees/role/Manager"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Alice"))
                .andExpect(jsonPath("$[0].role").value("Manager"));
    }

    @Test
    void getTodosReturnsList() throws Exception {
        Todo todo = new Todo();
        todo.setId(10L);
        todo.setDescription("Finish report");
        todo.setCompleted(false);

        when(service.getTodosByEmployeeId(1L)).thenReturn(List.of(todo));

        mockMvc.perform(get("/api/employees/1/todos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].description").value("Finish report"))
                .andExpect(jsonPath("$[0].completed").value(false));
    }
}
