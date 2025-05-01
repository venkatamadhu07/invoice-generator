import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const InvoiceApp = () => {
  const [customerName, setCustomerName] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    setInvoiceDate(new Date().toLocaleString());
    // Simulate item fetching
    setItems([
      { name: 'Cake', price: 250 },
      { name: 'Bread', price: 50 },
      { name: 'Cookies', price: 150 }
    ]);
  }, []);

  const handleAddItem = () => {
    const item = items.find(i => i.name === selectedItem);
    if (!item) return;

    setInvoiceItems(prev => [...prev, {
      name: item.name,
      quantity: Number(quantity),
      price: item.price,
      total: item.price * quantity
    }]);
  };

  const handleRemoveItem = index => {
    setInvoiceItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleGenerateInvoice = () => {
    setShowInvoice(true);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Nani Enterprises Invoice", 20, 20);
    doc.text(`Customer: ${customerName}`, 20, 30);
    doc.text(`Date: ${invoiceDate}`, 20, 40);
    let y = 50;
    invoiceItems.forEach((item, i) => {
      doc.text(`${i + 1}. ${item.name} - ${item.quantity} x ₹${item.price} = ₹${item.total}`, 20, y);
      y += 10;
    });
    doc.text(`Total: ₹${grandTotal}`, 20, y + 10);
    doc.save('invoice.pdf');
  };

  const grandTotal = invoiceItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="container">
      <header className="company-header">
        <img src="/images/logo.png" alt="Company Logo" className="logo" />
        <div className="company-info">
          <h1>Nani Enterprises</h1>
          <p>Bakery & Confectionery Experts</p>
          <p><strong>Est. 2010 | Reg No: 123456789</strong></p>
          <p>Email: support@nani.com | Phone: +91 98765 43210</p>
          <p>Address: 123, MG Road, Hyderabad, India</p>
        </div>
      </header>

      <h2>Invoice Generator</h2>

      <div className="customer-section">
        <label>Customer Name:</label>
        <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Enter customer name" />

        <label>Invoice Date:</label>
        <input type="text" value={invoiceDate} readOnly />
      </div>

      <div className="item-selection">
        <label>Select Item:</label>
        <select value={selectedItem} onChange={e => setSelectedItem(e.target.value)}>
          <option value="">Select item</option>
          {items.map(item => (
            <option key={item.name} value={item.name}>{item.name}</option>
          ))}
        </select>

        <label>Quantity:</label>
        <input type="number" min="1" value={quantity} onChange={e => setQuantity(e.target.value)} />

        <button onClick={handleAddItem}>Add Item</button>
      </div>

      <table id="invoiceTable">
        <thead>
          <tr>
            <th>Item</th><th>Quantity</th><th>Price</th><th>Total</th><th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
              <td>₹{item.total}</td>
              <td><button onClick={() => handleRemoveItem(i)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Grand Total: ₹{grandTotal.toFixed(2)}</h2>
      <button onClick={handleGenerateInvoice}>Generate Invoice</button>

      {showInvoice && (
        <div id="invoiceDisplay" className="final-invoice">
          <h2>Nani Enterprises - Invoice</h2>
          <img src="/images/logo.png" alt="Company Logo" className="logo" />
          <p><strong>Customer Name:</strong> {customerName}</p>
          <p><strong>Date & Time:</strong> {invoiceDate}</p>

          <table id="finalInvoiceTable">
            <thead>
              <tr>
                <th>Item</th><th>Quantity</th><th>Price</th><th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price}</td>
                  <td>₹{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Total Amount: ₹{grandTotal.toFixed(2)}</h2>
          <button onClick={handleDownloadPDF}>Download as PDF</button>
        </div>
      )}
    </div>
  );
};

export default InvoiceApp;
