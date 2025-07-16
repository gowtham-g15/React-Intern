package service;

import model.Employee;
import repository.EmployeeRepository;
import repository.TodoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
                                                   //23EC036 GOWTHAM G
import java.util.Optional;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private TodoRepository todoRepository;

    @InjectMocks
    private EmployeeService employeeService;

    private Employee sampleEmployee;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        sampleEmployee = new Employee(1L, "Alice", "Developer", null);
    }

    @Test
    void testUpdateEmployee() {
        Employee newData = new Employee(1L, "Alice Updated", "Architect", null);
        when(employeeRepository.findById(1L)).thenReturn(Optional.of(sampleEmployee));
        when(employeeRepository.save(any(Employee.class))).thenReturn(newData);

        Employee updated = employeeService.updateEmployee(1L, newData);

        assertNotNull(updated);
        assertEquals("Alice Updated", updated.getName());
        assertEquals("Architect", updated.getRole());
    }

    @Test
    void testGetByRole() {
        when(employeeRepository.findByRole("Manager"))
            .thenReturn(List.of(new Employee(2L, "Bob", "Manager", null)));

        List<Employee> result = employeeService.getByRole("Manager");

        assertEquals(1, result.size());
        assertEquals("Manager", result.get(0).getRole());
    }
}
