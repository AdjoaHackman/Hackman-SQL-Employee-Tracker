const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require("./config/connection")
function init() {


    inquirer
        .prompt([
            {
                type: 'list',
                name: 'options',
                message: 'What would you like to do?',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
            },
            {
                type: 'list',
                name: 'department',
                message: 'What is the name of the department',
                choices: ['Engineering', 'Sales', 'Marketing', 'Finance', 'Legal', 'Human Resources'],
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the name of the role?',
                choices: ['Engineering Manager', 'Sales Lead', 'Marketing Manager', 'Account Manager', 'Lawyer', 'Human Resources Business Partner'],
            },
            {
                type: 'input',
                name: 'first',
                message: 'What is the first name of the employee?',
            },
            {
                type: 'input',
                name: 'last',
                message: 'What is the last name of the employee?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for the role?',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: ['Engineering', 'Sales', 'Marketing', 'Finance', 'Legal', 'Human Resources'],
            },
        ])

        .then((answers) => {
            if (answers.options === 'View all employees') {
                connection.query('SELECT * FROM employee', function (err, results) {
                    console.table(results);
                }
                )
            };
            if (answers.options === 'View all roles') {
                connection.query('SELECT * FROM role', function (err, results) {
                    console.table(results);
                }
                )
            };
            if (answers.options === 'View all departments') {
                connection.query('SELECT * FROM department', function (err, results) {
                    console.table(results);
                }
                )
            };    
            if (answers.options === 'Add a role') {
                connection.query('SELECT * FROM role', function (err, results) {
                    console.table(results);
                }
                )
            }; 
            if (answers.options === 'Add an employee') {
                connection.query('SELECT * FROM employee', function (err, results) {
                    console.table(results);
                }
                )
            }; 
            if (answers.options === 'Add a department') {
                connection.query('INSERT INTO * department', function (err, results) {
                    console.table(results);
                }
                )
            }; 
            if (answers.options === 'Update an employee role') {
                connection.query('UPDATE role FROM employee', function (err, results) {
                    console.table(results);
                }
                )
            };




        })
}
init()
//THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database
