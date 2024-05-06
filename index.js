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
        ])

        .then((answers) => {
            if (answers.options === 'View all departments') {
                connection.query('SELECT * FROM department', function (err, results) {
                    console.table(results),
                        init()
                }
                )
            };
            if (answers.options === 'View all roles') {
                connection.query('SELECT * FROM role', function (err, results) {
                    console.table(results),
                        init()
                }
                )
            };
            if (answers.options === 'View all employees') {
                connection.query('select employee.first_name, employee.last_name, role.title, department.name as department, role.salary, manager.first_name as manager_first_name, manager.last_name as manager_last_name from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id left join employee manager on employee.manager_id = manager.id', function (err, results) {
                    console.table(results),
                        init()
                }
                )
            };
            if (answers.options === 'Add a department') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'What is the name of the department',
                    },
                ])
                    .then((data) => {
                        connection.query(`INSERT INTO department (name) VALUES (?)`, data.department, function (err, results) {
                            connection.query(`SELECT * from department`, function (err, results) {
                                console.table(results)
                                init()
                            })
                        }
                        )
                    })

            };
            if (answers.options === 'Add a role') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role',
                        message: 'What is the name of the role?',
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary for the role?',
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'What is the ID for the department?',
                    },
                ])
                    .then((data) => {
                        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [data.role, data.salary, data.department_id], function (err, results) {
                            connection.query(`SELECT * from role`, function (err, results) {
                                console.table(results)
                                init()
                            }
                            )
                        })
                    });
            };
            if (answers.options === 'Add an employee') {
                inquirer.prompt([
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
                        name: 'role',
                        message: 'What is the name of the role?',
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'What is the manager id for the employee',
                    },
                ])
                    .then((data) => {
                        connection.query('INSERT INTO employee,(first name, last name, role_id, manager_id) VALUES (?, ?, ?, ?)', [data.role, data.salary, data.department_id], function (err, results) {
                            connection.query(`SELECT * from employee`, function (err, results) {
                                console.table(results)
                                init()
                            }
                            )
                        });
                    })
            };
            if (answers.options === 'Update an employee role') {
                updateEmployee()
            };
        })
}

async function updateEmployee() {
    try {
        let [employees] = await connection.promise().query('select employee.first_name, employee.last_name, employee.id from employee')

        let [roles] = await connection.promise().query("select * from role")

        let data = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Select an employee',
                choices: employees.map((employee) => {
                    return {
                        name: employee.first_name + " " + employee.last_name,
                        value: employee.id,
                    };
                })
            },
            {
                type: 'list',
                name: 'role',
                message: 'Select a role',
                choices: roles.map((role) => {
                    return {
                        name: role.title,
                        value: role.id,
                    };
                }),
            },
        ])

        const {employee, role} = data;
        const query = "UPDATE employee SET role_id = ? WHERE employee.id = ?";
        let res = connection.query(query, [role, employee], (err, res) => {
            console.log("Employee role Updated!")
            init()
        });

    } catch (error) {
        console.log(error)
    }
}
init()
