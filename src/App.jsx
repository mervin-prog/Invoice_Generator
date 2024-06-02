import React , { useState } from 'react'
import './App.css'
import Details from './components/Details'
import "bootstrap/dist/css/bootstrap.min.css";
import ItemList from './components/ItemList';
import Total from './components/Total';
import {jsPDF} from "jspdf";

function App() {

  const [items , setItems] = useState([]);

  function handleAddItem(newItem){
    setItems([...items, newItem]);
  }

  function handleDeleteItem(index){
    const Items =[...items];
    Items.splice(index,1);
    setItems(Items);
  }

  function calculateTotal(){
    return (
      items.reduce(
        (total , item) => total+(item.quantity*item.price)
      ,0)
    );
  }

  function handleDownload() {
    const pdf = new jsPDF();

    // Add title with larger font size and bold
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Invoice', 20, 20);

    // Add a line below the title
    pdf.setLineWidth(0.5);
    pdf.line(20, 25, 190, 25); 

    // Reset font style for content
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    // Set headers for the table
    pdf.text('Username', 20, 30);
    pdf.text('Item', 70, 30);
    pdf.text('Quantity', 110, 30);
    pdf.text('Price', 150, 30);

    // Add items to PDF with proper alignment
    items.forEach((item, index) => {
        const yPos = 40 + index * 10;
        pdf.text(item.user, 20, yPos);
        pdf.text(item.item, 70, yPos);
        pdf.text(String(item.quantity), 120, yPos, { align: 'right' });
        pdf.text(Number(item.price).toFixed(2), 160, yPos, { align: 'right' });
    });

    // Add a line before the total amount
    pdf.line(20, 180, 190, 180); 

    // Add total amount with bold font
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Total Amount: ${calculateTotal().toFixed(2)}`, 20, 190);

    // Save the PDF
    pdf.save('invoice.pdf');

  }

  return (
    <div className="App">
    <h1>Invoice Generator</h1>

    <Details onAddItem={handleAddItem}/>

    <ItemList items={items} onDeleteItem={handleDeleteItem}/>

    <Total total={calculateTotal()}/>

    <button className="btn btn-primary" onClick={handleDownload}>Download PDF</button>
    </div>
  )
}

export default App
