var mysql = require('mysql');
var inquirer = require('inquirer');
var cTable = require('console.table');

var connection = mysql.createConnection({
    port: 3307,
    database: 'bamazondb',
    host: 'localhost',
    user: 'root',
    password: 'root'
})



function displayItems() {
    connection.query('SELECT item_id, product_name, price FROM products', function (err, data) {
        if (err) throw err;
        
        data.forEach(function (item) {
            item.price = `$` + item.price.toFixed(2);
        });

        console.table(data);

        promptItem();
    });

}

function promptItem() {
    connection.query('SELECT item_id, product_name, price FROM products', function (err, data) {
        if (err) throw err;
        inquirer.prompt([{
            type: 'input',
            message: "Which item would you like to buy? Please enter the item ID",
            name: 'whichId'
        }]).then(function (answers) {
            var price;
            var id = answers.whichId;

            var isValid = false; // verify id entered is valid
            for (var i = 0; i < data.length; i++) {
                if (id == data[i].item_id) {
                    isValid = true;
                    price = data[i].price;
                };
            };

            if (isValid) {
                verifyQuant(price, id);
            } else {
                console.log(`Please enter a valid item_id`);
                promptItem(data);
            }
        });
    });
}

function verifyQuant(price, id) {

    connection.query('SELECT * FROM products', function (err, data) {
        inquirer.prompt([{
            type: 'input',
            message: "How many would you like to buy?",
            name: 'quantPurchasing'
        }]).then(function (answers) {
            connection.query('SELECT * FROM products WHERE item_id=?',
                [id],
                function (err, data) {
                    // verifies quantity asked for is less than or equal to quantity in database
                    var quantPurch = parseInt(answers.quantPurchasing);
                    var stockquant = data[0].stock_quantity;
                    if (parseInt(quantPurch) <= stockquant) {
                        connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?;',
                            [quantPurch, id],
                            function (err) {
                                if (err) throw err;
                            });

                        var totalPrice = '$' + (price * answers.quantPurchasing).toFixed(2);
                        console.log(`\n Your total due is ${totalPrice}\n`)
                        displayItems();
                    } else {
                        console.log(`\nI'm sorry, we have insufficient stock.\n`)
                        displayItems();
                    }
                });
        });

    });
};

console.log("Welcome to Bamazon!\n");
displayItems();