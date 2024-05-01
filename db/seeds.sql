INSERT INTO department (name)
VALUES ('Engineering'), ('Sales'),('Marketing'), ('Finance'), ('Legal'),('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Engineering Manager', 275000, 1), ('Sales Lead', 185000, 2), ('Marketing Manager', 190000, 3), ('Account Manager', 215000, 4), ('Lawyer', 285000, 5), ('Human Resources Business Partner', 250000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Adjoa', 'Hackman', 1, 1),
        ('Robbert','Wijtman', 2, 2),
        ('Lauren', 'Elisiario', 3, 3), 
        ('Alfred', 'Wallace', 4, 4),
        ('Nicole', 'Kim', 5, 5);

