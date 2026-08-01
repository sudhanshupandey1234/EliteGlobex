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