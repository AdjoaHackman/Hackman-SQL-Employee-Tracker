

             async function getEmployees(cb) {
                cb(
                    connection.query('select employee.first_name, employee.last_name, role.title, department.name as department, role.salary, manager.first_name as manager_first_name, manager.last_name as manager_last_name from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id left join employee manager on employee.manager_id = manager.id', function (err, results) {
                        console.table(results),
                            init()
                    }
                    )
                );
            }
            async function getRoles(cb) {
                cb([
                    {
                        name: 'Director',
                        id: 1,
                    },
                    {
                        name: 'Employee',
                        id: 2,
                    },
                ]);
            }

            getEmployees((employees) => {
                getRoles((roles) => {
                    if (answers.options === 'Update an employee role') {
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'employee',
                                message: 'Select an employee?',
                                choices: employees.map((employee) => {
                                    return {
                                        name: employee.name,
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
                                        name: role.name,
                                        value: role.id,
                                    };
                                }),
                            },
                        ]).then((data) => {
                            const { employee, role } = data;
                            console.table(employee, role);
                            const query = "UPDATE employee SET role_id = ? WHERE id = ?";
                            db.query(query, [role, employee], (err, res) => {

                            });
                        });
                    }
                })
            })


async function updateEmployee(){
    try {
        let employees = await connection.promise().query('select employee.first_name, employee.last_name, role.title, department.name as department, role.salary, manager.first_name as manager_first_name, manager.last_name as manager_last_name from employee left join role on employee.role_id = role.id left join department on role.department_id = department.id left join employee manager on employee.manager_id = manager.id')
        
        let roles = await connection.promise().query("select * from role")

        let data = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Select an employee?',
                choices: employees.map((employee) => {
                    return {
                        name: employee.name,
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
                        name: role.name,
                        value: role.id,
                    };
                }),
            },
        ])

        const { employee, role } = data;
        console.table(employee, role);
        const query = "UPDATE employee SET role_id = ? WHERE id = ?";
        let res = db.promise().query(query, [role, employee]);

    } catch (error) {
        console.log(error)
    }
}