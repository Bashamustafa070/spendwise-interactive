// Application State Data
let monthlyBudget = 0;
let expenses = [];

// DOM Element References
const budgetInput = document.getElementById("monthly-budget");
const setBudgetBtn = document.getElementById("set-budget-btn");
const displayBudget = document.getElementById("display-budget");
const displayTotalExpenses = document.getElementById("display-total-expenses");
const displayBalance = document.getElementById("display-balance");
const budgetAlert = document.getElementById("budget-alert");

const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");

// Event Listener: Set or Update Budget
setBudgetBtn.addEventListener("click", () => {
    const parsedBudget = parseFloat(budgetInput.value);
    if (isNaN(parsedBudget) || parsedBudget < 0) {
        alert("Please enter a valid positive number for your budget.");
        return;
    }
    monthlyBudget = parsedBudget;
    updateDashboard();
});

// Event Listener: Add Expense Form Submission
expenseForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please provide a valid expense name and amount.");
        return;
    }

    // Store new expense record in the array
    expenses.push({ name: name, amount: amount });

    // Reset form fields
    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    // Refresh display
    updateDashboard();
});

// Function to calculate total expenses using loops
function calculateTotalExpenses() {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }
    return total;
}

// Function to update the DOM dashboard dynamically
function updateDashboard() {
    const totalExpenses = calculateTotalExpenses();
    const remainingBalance = monthlyBudget - totalExpenses;

    // Update Summary Card Texts
    displayBudget.textContent = `$${monthlyBudget.toFixed(2)}`;
    displayTotalExpenses.textContent = `$${totalExpenses.toFixed(2)}`;
    displayBalance.textContent = `$${remainingBalance.toFixed(2)}`;

    // Render Expense List using loops and DOM manipulation
    expenseList.innerHTML = "";
    if (expenses.length === 0) {
        expenseList.innerHTML = "<li>No expenses recorded yet.</li>";
    } else {
        expenses.forEach((expense, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${expense.name} - <strong>$${expense.amount.toFixed(2)}</strong></span>
                <button onclick="deleteExpense(${index})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    }

    // Decision Making (Conditional statements for financial feedback)
    evaluateBudgetStatus(totalExpenses, remainingBalance);
}

// Function handling conditional decision-making logic
function evaluateBudgetStatus(totalExpenses, remainingBalance) {
    budgetAlert.classList.remove("hidden", "success", "warning", "danger");

    if (monthlyBudget === 0) {
        budgetAlert.textContent = "Please set your monthly budget to begin tracking.";
        budgetAlert.classList.add("warning");
    } else if (totalExpenses > monthlyBudget) {
        budgetAlert.textContent = "⚠️ Alert: You have exceeded your monthly budget!";
        budgetAlert.classList.add("danger");
    } else if (remainingBalance <= monthlyBudget * 0.2) {
        budgetAlert.textContent = "⚠️ Warning: You are close to reaching your budget limit!";
        budgetAlert.classList.add("warning");
    } else {
        budgetAlert.textContent = "✅ Great job! Your spending is well within budget limits.";
        budgetAlert.classList.add("success");
    }
}

// Global scope function for deleting specific expense items from the array
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateDashboard();
}
