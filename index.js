

// Declaring global Items
class transaction {
    constructor(date, name, amount, sign, ID, runningTotal) {
        this.date = date,
        this.name = name,
        this.amount = amount,
        this.sign = sign,
        this.ID = ID,
        this.runningTotal = runningTotal,
        this.visible = true
    }
};

const transactions = [];
let generatedRandomNumbers = [];
let dltBtnNodeList;

// Submit Button Function ===================================================================
document.getElementById("submit-btn").addEventListener("click", submitFunction);
function submitFunction() {

    // Remove all previous rows and re-write them from the Transactions Array every time the submit button is pressed.
    document.querySelectorAll(".transaction-row").forEach(e => e.remove());
    
    let rawDate = document.getElementById("date").value;
    let rawName = document.getElementById("name").value;
    let rawAmount = document.getElementById("amount").value;
    const amountTypeNumber = +rawAmount;
    let amountRounded = amountTypeNumber.toFixed(0);
    let signAssign = (amountTypeNumber > 0 ? "positive" : "negative");

    let newObject = new transaction(rawDate, rawName, amountRounded, signAssign);

    
    // ID Generation
    function uniqueID() {

        // generate random letter to go with random number, excluding i, l, o, and s.
        let randomlyGeneratedletter;
        function randomLetter() {
            let letterIndex = Math.floor(Math.random() * 22);
            const alphabetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "j", "k", "m", "n", "p", "q", "r", "t", "u", "v", "w", "x", "y", "z"];
            randomlyGeneratedletter = alphabetArray[letterIndex];
        }
        randomLetter();

        // random number
        let randomID = (randomlyGeneratedletter + Math.floor(Math.random()* 10000));
        
        if (generatedRandomNumbers.includes(randomID) === false){
            generatedRandomNumbers.push(randomID)
            newObject.ID = randomID;
        }
    }
    uniqueID();

    // Pushing newObject into the Transactions array without runningTotal
    transactions.push(newObject);
    console.log("transactions", transactions);

    // Calling Sum & Row Functions
    generateSumAndRunningTotal();
    createRow();
}

// Sum & runningTotal =======================================================================
function generateSumAndRunningTotal() {
    // create mathArray & empty it before adding transactions to it.
    let mathArray = [];
    sum = 0;

    // create an array of 'true' objects
    transactions.map((transactionObject) => {
        if (transactionObject.visible === true) {
            mathArray.push(transactionObject);
        }
    });

    // If no objects in the Array (delete all rows)
    (mathArray[0] == undefined ? document.getElementById("total").innerText = "$0" : sum = 0);

    // define index[0] for 'true' objects (objects in mathArray)
    mathArray[0].runningTotal = +mathArray[0].amount;
    sum = +mathArray[0].amount
      

    // define index[1.....infinity] for 'true' objects (objects in mathArray)
    if (mathArray.length > 1) {
        for (i = 1; i < mathArray.length; i++) {
            mathArray[i].runningTotal = +mathArray[i - 1].runningTotal + +mathArray[i].amount;
            sum = +mathArray[i - 1].runningTotal + +mathArray[i].amount;
        }
    }

    // Display sum in the browser
    document.getElementById("total").innerText = "Total: $" + sum;
}

// Table, Rows. Displaying transaction data in the browser ==================================
function createRow() {
    transactions.forEach(transactionObject => {
        if (transactionObject.visible === true) {
        // Create a bunch of data cells with transaction information in them & delete button 
            let tdD = document.createElement("td");
                tdD.append(transactionObject.date);
                tdD.classList.add("date-cell");
            let tdN = document.createElement("td");
                tdN.append(transactionObject.name);
            let tdA = document.createElement("td");
                tdA.append("$" + transactionObject.amount);
                tdA.classList.add("amount");
            let tdRt = document.createElement("td");
                tdRt.append("$" + transactionObject.runningTotal);
                tdRt.classList.add("running-total");
            let tdID = document.createElement("td");
                tdID.append(transactionObject.ID);
                // give class to ID's for finding transaction in transactions array
                tdID.classList.add("row-ID");
            let spanDelete = document.createElement("div");
                // give class to Delete cells for CSS editing
                spanDelete.classList.add("dlt-btn-div");
            let createButton = document.createElement("button");
                createButton.innerText = "X";
                // give class to delete buttons for event listeners
                createButton.classList.add("dlt-btn");
                spanDelete.append(createButton);

        // Append all of those data cells to a row 
            let tr = document.createElement("tr");
                tr.append(tdD, tdN, tdA, tdRt, tdID, spanDelete);
                // give a class to the rows for event listeners and deleting rows
                tr.classList.add("transaction-row");

        // Append that row to the table
            let tbl = document.getElementById("doc-tbl");

            tbl.append(tr);
        }
    });


    // Updating the node list for newly created delete buttons
    dltBtnNodeList = document.querySelectorAll(".transaction-row");
    deleteEventListener();
}

// Delete Button Functions ==================================================================
// Event listener(s)
function deleteEventListener() {
    for (rows of dltBtnNodeList)
        rows.querySelector(".dlt-btn").addEventListener("click", deleteRow);
}

// Delete Function
function deleteRow() {

    let row = this.parentNode.parentNode;
    let tbl = document.getElementById("doc-tbl");

    transactions.map((transactionObject) => {
        (row.querySelector(".row-ID").innerText === transactionObject.ID 
            ? transactionObject.visible = false 
            : transactionObject.visible = transactionObject.visible
            )
    });

    // Remove all previous rows so that they can be re-written them from the Transactions Array
    document.querySelectorAll(".transaction-row").forEach(e => e.remove());

    // Call Sum & Row functions to re-write rows and adjust running totals within the table
    // document.getElementById("total").innerText = "$0";
    generateSumAndRunningTotal();
    createRow();
}




// Things that this application will be able to do.
    // 1. Show transactions in a table (date, name, amount, running total) and total spending displayed above the table - DONE -    -   -   -   -
    // 3. Delete rows in the table and have totals adjust accordingly - DONE - - - - - - - - - -  - - - - - - - - - - - - -  - - - -  - - - - - - - - -
    // 5. Enter a name and have the transaction data associated with that name autopopulate on the screen (Profile)