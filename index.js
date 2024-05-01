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
            if (answers.options === 'View all employees') {
                connection.query('SELECT * FROM employee', function (err, results) {
                    console.table(results),
                        init()
                }
                )
            }

            if (answers.options === 'View all roles') {
                connection.query('SELECT * FROM role', function (err, results) {
                    console.table(results),
                        init()
                }
                )
            };
            if (answers.options === 'View all departments') {
                connection.query('SELECT * FROM department', function (err, results) {
                    console.table(results),
                        init()
                }
                )
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
                        name: 'department',
                        message: 'What is the name of the department',
                    },
                ])
                    .then((data) => {
                        connection.query('INSERT INTO role (title, salary) VALUES (?, ?, ?)', [data.role, data.salary, data.department_id], function (err, results) {
                            connection.query(`SELECT * from role`, function (err, results) {
                                console.table(results)
                                init()
                            }
                            )
                        })
                    });
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
                            message: 'Who is the manager for the employee?',
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
                    if (answers.options === 'Update an employee role') {
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
                        ])
                        connection.query('UPDATE (role) FROM employee VALUES (?,?,?)', function (err, results) {
                            connection.query(`SELECT * from role`, function (err, results) {
                                console.table(results)
                                init()
                            }
                            )
                        });

                    }
                }
            }
        })
}
init()