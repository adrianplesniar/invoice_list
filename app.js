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
        const invoices = Store.getInvoices();

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

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#invoice-form');
        container.insertBefore(div, form);
        // Vanish in 5 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 5000);
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
class Store {
    static getInvoices() {
        let invoices;
        if(localStorage.getItem('invoices') === null) {
            invoices = [];
        } else {
            invoices = JSON.parse(localStorage.getItem('invoices'));
        }

        return invoices;
    }
    static addInvoice(invoice) {
        const invoices = Store.getInvoices();

        invoices.push(invoice);

        localStorage.setItem('invoices', JSON.stringify(invoices));
    }
    static removeInvoice(invoiceNumber) {
        const invoices = Store.getInvoices();

        invoices.forEach((invoice, index) => {
            if(invoice.invoiceNumber === invoiceNumber) {
                invoices.splice(index, 1);
            }
        });

        localStorage.setItem('invoices', JSON.stringify(invoices));
    }
}

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

    // Validate
    if(invoiceNumber === '' || companyName === '' || tin === '' || invoiceDate === '' || dueDate === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else if(Date.parse(dueDate) < Date.parse(invoiceDate)) {
        UI.showAlert("Invoice date can't be greater than due date", 'danger');
    } else {
        // Instatiate Invoice
        const invoice = new Invoice(invoiceNumber, companyName, tin, invoiceDate, dueDate);
    
        // Add Invoice to UI
        UI.addInvoiceToList(invoice);

        // Add invoice to store
        Store.addInvoice(invoice);

        // Show success message
        UI.showAlert('Invoice successfuly added', 'success');
    
        // Clear fields
        UI.clearFields();
    }
});

// Event: Remove an Invoice
document.querySelector("#invoice-list").addEventListener('click', (e) => {
    // Delete invoice from UI
    UI.deleteInvoice(e.target);

    // Delete invoice from Store
    Store.removeInvoice(e.target.parentElement.parentElement.children[0].textContent);

    // Show success message
    UI.showAlert('Invoice removed', 'success');
});