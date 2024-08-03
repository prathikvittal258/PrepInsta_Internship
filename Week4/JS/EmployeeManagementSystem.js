class Employee {
    constructor(name, age, department, salary) {
        this.name = name;
        this.age = age;
        this.department = department;
        this.salary = salary;
    }
}

let employees = [
    new Employee('Alice Johnson', 28, 'Engineering', 60000),
    new Employee('Bob Smith', 35, 'Marketing', 55000),
    new Employee('Carol Davis', 40, 'HR', 70000),
];

function renderTable(filteredEmployees, hideActions = false) {
    const tableBody = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    filteredEmployees.forEach((emp, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${emp.name}</td>
            <td>${emp.age}</td>
            <td>${emp.department}</td>
            <td>${emp.salary}</td>
            <td>${hideActions ? '-' : `
                <button class="update" onclick="showUpdateEmployeeForm(${index})">Update</button>
                <button class="delete" onclick="deleteEmployee(${index})">Delete</button>
            `}</td>
        `;
        tableBody.appendChild(row);
    });
}

function showUpdateEmployeeForm(index) {
    document.getElementById('updateIndex').value = index;
    document.getElementById('updateName').value = employees[index].name;
    document.getElementById('updateAge').value = employees[index].age;
    document.getElementById('updateDepartment').value = employees[index].department;
    document.getElementById('updateSalary').value = employees[index].salary;
    document.getElementById('updateEmployeeForm').style.display = 'block';
}

function toggleUpdateEmployeeForm() {
    const form = document.getElementById('updateEmployeeForm');
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
}

function toggleAddEmployeeForm() {
    const form = document.getElementById('addEmployeeForm');
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
}

function updateEmployee() {
    const index = document.getElementById('updateIndex').value;
    const name = document.getElementById('updateName').value;
    const age = document.getElementById('updateAge').value;
    const department = document.getElementById('updateDepartment').value;
    const salary = document.getElementById('updateSalary').value;
    employees[index] = new Employee(name, parseInt(age), department, parseInt(salary));
    renderTable(employees);
    toggleUpdateEmployeeForm();
}

function addEmployee() {
    const name = document.getElementById('newName').value;
    const age = document.getElementById('newAge').value;
    const department = document.getElementById('newDepartment').value;
    const salary = document.getElementById('newSalary').value;
    employees.push(new Employee(name, parseInt(age), department, parseInt(salary)));
    renderTable(employees);
    toggleAddEmployeeForm();
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    renderTable(employees);
}

function searchEmployees() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchInput)
    );
    renderTable(filteredEmployees);
}

function calculateAverageSalary() {
    const totalSalary = employees.reduce((acc, emp) => acc + emp.salary, 0);
    const averageSalary = totalSalary / employees.length;
    renderTable([new Employee('Average Salary', '-', '-', averageSalary)], true);
}

function findEmployeesByDepartment(department) {
    const filteredEmployees = employees.filter(emp => emp.department === department);
    renderTable(filteredEmployees);
}

function increaseSalary(percentage) {
    employees.forEach(emp => {
        emp.salary = Math.round(emp.salary * (1 + percentage / 100));
    });
    renderTable(employees);
}

function sortEmployeesByAge() {
    employees.sort((a, b) => a.age - b.age);
    renderTable(employees);
}

document.addEventListener('DOMContentLoaded', () => {
    renderTable(employees);
});