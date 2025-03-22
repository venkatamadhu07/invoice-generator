document.addEventListener("DOMContentLoaded", () => {
    const itemSelect = document.getElementById("itemSelect");
    const quantityInput = document.getElementById("quantity");
    const addItemButton = document.getElementById("addItem");
    const invoiceTableBody = document.querySelector("#invoiceTable tbody");
    const grandTotalSpan = document.getElementById("grandTotal");
    const generateInvoiceButton = document.getElementById("generateInvoice");
    const displayCustomer = document.getElementById("displayCustomer");
    const finalInvoiceTableBody = document.querySelector("#finalInvoiceTable tbody");
    const finalTotalSpan = document.getElementById("finalTotal");
    const downloadInvoiceButton = document.getElementById("downloadInvoice");
    const invoiceDate = document.getElementById("invoiceDate");

    let itemsData = {}; // Object to store item details
    let invoiceItems = []; // Stores selected items

    // Set current date automatically
    invoiceDate.value = new Date().toLocaleDateString();

    // Fetch dataset (External JSON file containing bakery items)
    fetch("./bakery-items.json")
        .then(response => response.json())
        .then(data => {
            itemsData = data;
            populateItemDropdown();
        })
        .catch(error => console.error("Error loading dataset:", error));

    // Populate dropdown with bakery items
    function populateItemDropdown() {
        itemSelect.innerHTML = '<option value="">Select an item</option>'; // Reset dropdown
        Object.keys(itemsData).forEach(itemName => {
            const option = document.createElement("option");
            option.value = itemName;
            option.textContent = `${itemName} - ₹${itemsData[itemName].price}`;
            itemSelect.appendChild(option);
        });
    }

    // Add item to the invoice table
    addItemButton.addEventListener("click", () => {
        const selectedItem = itemSelect.value;
        const quantity = parseInt(quantityInput.value);

        if (!selectedItem || quantity < 1) {
            alert("Please select an item and enter a valid quantity.");
            return;
        }

        // Check if item is already in the list
        const existingItem = invoiceItems.find(item => item.name === selectedItem);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.total = (existingItem.price * existingItem.quantity).toFixed(2);
        } else {
            const itemPrice = itemsData[selectedItem].price;
            const total = (itemPrice * quantity).toFixed(2);
            invoiceItems.push({ name: selectedItem, quantity, price: itemPrice, total });
        }

        updateInvoiceTable();

        // Reset input fields
        itemSelect.value = "";
        quantityInput.value = "1";
    });

    // Update invoice table and calculate grand total
    function updateInvoiceTable() {
        invoiceTableBody.innerHTML = "";
        let grandTotal = 0;

        invoiceItems.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.total}</td>
                <td><button class="removeItem" data-index="${index}">X</button></td>
            `;
            invoiceTableBody.appendChild(row);
            grandTotal += parseFloat(item.total);
        });

        grandTotalSpan.textContent = grandTotal.toFixed(2);
        attachRemoveEvent();
    }

    // Remove item from invoice
    function attachRemoveEvent() {
        document.querySelectorAll(".removeItem").forEach(button => {
            button.addEventListener("click", event => {
                const index = event.target.dataset.index;
                invoiceItems.splice(index, 1);
                updateInvoiceTable();
            });
        });
    }

    // Generate and display invoice
    generateInvoiceButton.addEventListener("click", () => {
        const customerName = document.getElementById("customerName").value;
        if (!customerName) {
            alert("Please enter customer name.");
            return;
        }

        displayCustomer.textContent = customerName;
        finalInvoiceTableBody.innerHTML = "";
        let totalAmount = 0;

        invoiceItems.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.total}</td>
            `;
            finalInvoiceTableBody.appendChild(row);
            totalAmount += parseFloat(item.total);
        });

        finalTotalSpan.textContent = totalAmount.toFixed(2);
    });

    // Download Invoice as PDF
    downloadInvoiceButton.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const currentDate = new Date().toLocaleString();

        doc.setFontSize(18);
        doc.text("Nani Enterprises - Invoice", 10, 10);
        doc.setFontSize(12);
        doc.text(`Customer Name: ${displayCustomer.textContent}`, 10, 20);
        doc.text(`Date: ${currentDate}`, 10, 30);

        let y = 40;
        doc.setFontSize(10);
        doc.text("Item", 10, y);
        doc.text("Quantity", 70, y);
        doc.text("Price", 110, y);
        doc.text("Total", 150, y);
        y += 10;

        invoiceItems.forEach(item => {
            doc.text(item.name, 10, y);
            doc.text(item.quantity.toString(), 70, y);
            doc.text(`₹${item.price}`, 110, y);
            doc.text(`₹${item.total}`, 150, y);
            y += 10;
        });

        doc.setFontSize(14);
        doc.text(`Grand Total: ₹${finalTotalSpan.textContent}`, 10, y + 10);
        doc.save(`invoice_${displayCustomer.textContent.replace(/\s/g, "_")}.pdf`);
    });
});
