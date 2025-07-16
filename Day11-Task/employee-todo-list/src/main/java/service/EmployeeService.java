package service;

import model.Employee;
import model.Todo;
import repository.EmployeeRepository;
import repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepo;

    @Autowired
    private TodoRepository todoRepo;

    public Employee updateEmployee(Long id, Employee newEmpData) {
        return employeeRepo.findById(id).map(emp -> {
            emp.setName(newEmpData.getName());
            emp.setRole(newEmpData.getRole());
            return employeeRepo.save(emp);
        }).orElse(null);
    }

    public List<Employee> getByRole(String role) {
        return employeeRepo.findByRole(role);
    }

    public List<Todo> getTodosByEmployeeId(Long empId) {
        return todoRepo.findByEmployeeId(empId);
    }

    public Todo addTodoToEmployee(Long empId, Todo todo) {
        Optional<Employee> empOpt = employeeRepo.findById(empId);
        if (empOpt.isPresent()) {
            todo.setEmployee(empOpt.get());
            return todoRepo.save(todo);
        }
        return null;
    }
}
