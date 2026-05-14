let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const listEl = document.getElementById("list");

const text = document.getElementById("text");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("addBtn");

// ADD TRANSACTION
addBtn.addEventListener("click", () => {

    if (text.value === "" || amount.value === "") {
        alert("Please enter values");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);

    save();
    render();

    text.value = "";
    amount.value = "";
});

// DELETE
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    save();
    render();
}

// CALCULATE
function updateValues() {

    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);

    const income = amounts
        .filter(a => a > 0)
        .reduce((acc, val) => acc + val, 0)
        .toFixed(2);

    const expense = (
        amounts
        .filter(a => a < 0)
        .reduce((acc, val) => acc + val, 0) * -1
    ).toFixed(2);

    balanceEl.innerText = total;
    incomeEl.innerText = income;
    expenseEl.innerText = expense;
}

// RENDER LIST
function render() {
    listEl.innerHTML = "";

    transactions.forEach(t => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${t.text} <span>${t.amount}</span>
            <button class="delete" onclick="deleteTransaction(${t.id})">X</button>
        `;

        listEl.appendChild(li);
    });

    updateValues();
}

// SAVE
function save() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// INIT
render();