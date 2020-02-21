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

  let user = {
      first_name : ['ian', 'jon', 'jen', 'eric','alex',],
      last_name : ['clark', 'lattin', 'nelson', 'dillion', 'malatesta',],
      role : ['junior developer', 'gamer', 'cook', 'matinance', 'designer',],
      location : ['front-end', 'bum', 'cafeteria', 'auto', 'media', ],
      salary : [ '100,000', '20,000', '30,000', '40,000', '50,000',],
      manager : ['null', 'ian clark', 'jon lattin', 'charizard', 'null',],

      
  }

  console.table(user);

function runSearch() {
    inquirer
    .prompt({
        name: "options",
        type: "rawlist",
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
        
        switch (answer.options) {
            case "View all Employees":
                employeeSearch();
                break

                case  "View all Employees by department":
                    departmentSearch();
                    break

                    case "View all Employees by Manager":
                        managerSearch();
                        break

                        case "Add employee":
                             addSearch();
                            break

                            case "Remove Employee":
                                removeSearch();
                                break;

                                case "Update Employee Role":
                                    updateroleSearch();
                                    break

                                    case "Update Employee Manager":
                                        updatemanagerSearch();
                                        break





        }
    });
}

 function addSearch() {
    inquirer
   .prompt([
       {
        type: 'input',
        name: 'name',
        message: "What is the Employees first name?",
    },
    {
        name: "add search",
        type: "input",
        message: "What is the Employees last name?",
    },
    {
        name: "add search",
        type: "rawlist",
        message: "What is the Employees role?",
        choices: [
            "junior developer",
            "gamer",
            "cook",
            "matinance",
            "designer",
        ]
    },
    {
        name: "add search",
        type: "rawlist",
        message: "Who is the Employees manager?",
        choices: [
            "Ian",
            "Jon",
            "Jen",
            "Eric",
            "Alex",
            "None",


        ]
    }
])
.then(answer => {
    connection.query(
        `INSERT INTO employee (first_name, last_name, role, location, salary, manager) VALUES ("${answer.first_name}", "${answer.last_name}", "${answer.role}", "${answer.manager}")`,
        function(err, rows) {
            addSearch();
        }
    )
})
}

function removeSearch() {
    inquirer
    .prompt ([
        {
        name: "rmvname",
        type: "rawlist",
        message: "Who would you like to remove?",
        choices: [
            "Ian",
            "Jon",
            "Jen",
            "Eric",
            "Alex",
        ]
    }
])
.then(function(answer) {
    connection.query(
        "DELETE FROM employee WHERE ?",
        {
            first_name: answer.rmvname
        },
        function(err) {
            if (err) throw err;
            removeSearch();
        }
    )
})
    
    }

function updatemanagerSearch(){
    inquirer
    .prompt({
        name: "add search",
        type: "rawlist",
        message: "Who would you like to update?",
        choices: [
            "Ian",
            "Jon",
            "Jen",
            "Eric",
            "Alex",
        ],

        name: "add search",
        type: "rawlist",
        message: "Who is the manager for this person?",
        choices: [
            "Ian",
            "Jon",
            "Jen",
            "Eric",
            "Alex",
        ],

    })

    .then (function(answer) {
        var query = ("SELECT * FROM manager", function(err, row) {
            console.table(row);
            updatemanagerSearch();
        })
    })
}

function updateroleSearch() {
    inquirer
    .prompt({
        name: "add search",
        type: "rawlist",
        message: "Whos role would you like to update?",
        choices: [
            "Ian",
            "Jon",
            "Jen",
            "Eric",
            "Alex",
        ],
        name: "add search",
        type: "rawlist",
        message: "What is the new role for the person?",
        choices: [
            "junior developer",
            "gamer",
            "cook",
            "matinance",
            "designer",
        ]
        
    })
    .then(function(answer) {
        var query = ("SELECT * FROM role", function(err, row) {
            console.table(row);
            updateroleSearch();
        })
    })
}



function afterConnection() {
    connection.query("SELECT * FROM people", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }