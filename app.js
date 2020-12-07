// Invoice Class: Represents an Invoice
class Invoice {
    constructor(invoiceNumber, companyName, tin, invoiceDate, dueDate) {
        this.invoiceNumber = invoiceNumber;
        this.companyName = companyName;
        this.tin = tin;
        this.invoiceDate = invoiceDate;
        this.dueDate = dueDate;
    }
}

// UI Class: Handle UI tasks
class UI {
    static displayInvoices() {
        const StoredInvoices = [
            {
                invoiceNumber: "2342342",
                companyName: "Polmax",
                tin: "439573478",
                invoiceDate: "2020-12-09",
                dueDate: "2007-05-11"
            },
            {
                invoiceNumber: "3425432",
                companyName: "Januszex",
                tin: "54356346",
                invoiceDate: "2018-10-23",
                dueDate: "2005-01-15"
            }
        ];

        const invoices = StoredInvoices;

        invoices.forEach(invoice => UI.addInvoiceToList(invoice));
    }

    static addInvoiceToList(invoice) {
        const list = document.querySelector('#invoice-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${invoice.invoiceNumber}</td>
            <td>${invoice.companyName}</td>
            <td>${invoice.tin}</td>
            <td>${invoice.invoiceDate}</td>
            <td>${invoice.dueDate}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a><td>
        `;

        list.appendChild(row);
    }

    static deleteInvoice(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#invoice-number').value = "";
        document.querySelector('#company-name').value = "";
        document.querySelector('#tin').value = "";
        document.querySelector('#invoice-date').value = "";
        document.querySelector('#due-date').value = "";
    }
}

// Store Class: Handles Storage

// Event: Display Invoices
document.addEventListener('DOMContentLoaded', UI.displayInvoices);

// Event: Add an Invoice
document.querySelector('#invoice-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const invoiceNumber = document.querySelector('#invoice-number').value;
    const companyName = document.querySelector('#company-name').value;
    const tin = document.querySelector('#tin').value;
    const invoiceDate = document.querySelector('#invoice-date').value;
    const dueDate = document.querySelector('#due-date').value;

    const invoice = new Invoice(invoiceNumber, companyName, tin, invoiceDate, dueDate);

    // Add Invoice to UI
    UI.addInvoiceToList(invoice);

    // Clear fields
    UI.clearFields();
});

// Event: Remove an Invoice
document.querySelector("#invoice-list").addEventListener('click', (e) => {
    UI.deleteInvoice(e.target);
});