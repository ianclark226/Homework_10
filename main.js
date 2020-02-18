var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "yourRootPassword",
  database: "Employee_db"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });

function runSearch() {
    inquirer
    .prompt({
        message: "What would you like to do?",
        choices: [
            "View all Employees",
            "View all Employees by department",
            "View all Employees by Manager",
            "Add employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",

        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "View all Employees":
                employeeSearch();
                break;

                case  "View all Employees by department":
                    departmentSearch();
                    break;

                    case "View all Employees by Manager":
                        managerSearch();
                        break;

                        case "Add employee":
                            addSearch();
                            break;

                            case "Remove Employee":
                                removeSearch();
                                break;

                                case "Update Employee Role":
                                    updateroleSearch();
                                    break;

                                    case "Update Employee Manager":
                                        updatemanagerSearch();
                                        break;





        }
    })
}

function addSearch() {
    inquirer
    .prompt({
        message: "What is the Employees first name?"
    })
}



function afterConnection() {
    connection.query("SELECT * FROM people", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }