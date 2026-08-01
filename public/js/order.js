// ==============================
// Order JS
// ==============================

const productTable = document.getElementById("productTable");
const grandTotal = document.getElementById("grandTotal");
const paidAmount = document.getElementById("paidAmount");
const pendingAmount = document.getElementById("pendingAmount");

// Product Change
productTable.addEventListener("change", function (e) {

    if (e.target.classList.contains("product")) {

        const row = e.target.closest("tr");

        const selectedOption = e.target.options[e.target.selectedIndex];

        const price = selectedOption.dataset.price || 0;

        row.querySelector(".price").value = price;

        calculateRow(row);

    }

});

// Quantity Change
productTable.addEventListener("input", function (e) {

    if (e.target.classList.contains("qty")) {

        const row = e.target.closest("tr");

        calculateRow(row);

    }

});

// ==============================
// Calculate Row
// ==============================

function calculateRow(row) {

    const qty = Number(row.querySelector(".qty").value);

    const price = Number(row.querySelector(".price").value);

    const subtotal = qty * price;

    row.querySelector(".subtotal").value = subtotal;

    calculateGrandTotal();

}
// ==============================
// Grand Total
// ==============================

function calculateGrandTotal() {

    let total = 0;

    document.querySelectorAll(".subtotal").forEach((item) => {

        total += Number(item.value);

    });

    grandTotal.value = total;

    calculatePending();

}

// ==============================
// Pending Amount
// ==============================

function calculatePending() {

    const total = Number(grandTotal.value);

    const paid = Number(paidAmount.value);

    pendingAmount.value = total - paid;

}
// Paid Amount Change
paidAmount.addEventListener("input", function () {

    calculatePending();

});
// ==============================
// Add New Product Row
// ==============================

const addRowBtn = document.getElementById("addRow");

addRowBtn.addEventListener("click", function () {

    const tbody = document.querySelector("#productTable tbody");

    const firstRow = tbody.querySelector("tr");

    const newRow = firstRow.cloneNode(true);

    // Reset Values
    newRow.querySelector(".product").selectedIndex = 0;
    newRow.querySelector(".qty").value = 1;
    newRow.querySelector(".price").value = "";
    newRow.querySelector(".subtotal").value = "";

    tbody.appendChild(newRow);

});
// ==============================
// Delete Product Row
// ==============================

productTable.addEventListener("click", function (e) {

    if (e.target.classList.contains("removeRow")) {

        const rows = document.querySelectorAll("#productTable tbody tr");

        if (rows.length > 1) {

            e.target.closest("tr").remove();

            calculateGrandTotal();

        } else {

            alert("At least one product is required.");

        }

    }

});