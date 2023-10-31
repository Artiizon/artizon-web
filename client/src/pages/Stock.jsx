// StockManagementPage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios library
import { useSnapshot } from "valtio";
import state from "../store";
import jsPDF from "jspdf";
import "jspdf-autotable";

function StockManagementPage() {
  const snap = useSnapshot(state);
  state.page = "no-canvas";

  // Rename the stocks variable used by Axios to avoid conflicts
  const [stockData, setStockData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDateError, setFromDateError] = useState("");
  const [toDateError, setToDateError] = useState("");
  const [stockDataReport, setStockDataReport] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseStock = await axios.get(
          "http://localhost:8080/api/stocks"
        );
        setStockData(responseStock.data); // Update one state variable with the fetched data from the first Axios request

        // const GfromDate = fromDate; // Replace with your desired date
        // const GtoDate = toDate; // Replace with your desired date

        // const responseReport = await axios.get(`http://localhost:8080/api/stockReport?fromDate=${GfromDate}&toDate=${GtoDate}`);
        // setStockDataReport(responseReport.data); // Update the other state variable with the fetched data from the second Axios request
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleReport = async () => {
    try {
      const GfromDate = fromDate; // Replace with your desired date
      const GtoDate = toDate; // Replace with your desired date

      const responseReport = await axios.get(
        `http://localhost:8080/api/stockReport?fromDate=${GfromDate}&toDate=${GtoDate}`
      );
      setStockDataReport(responseReport.data); // Update the other state variable with the fetched data from the second Axios request
    } catch (error) {
      console.error("Error searching stocks:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/stocks?search=${searchTerm}`
      );
      setStockData(response.data);
    } catch (error) {
      console.error("Error searching stocks:", error);
    }
  };

  const handleGenerateReport = () => {
    // Validate the input fields
    if (!fromDate) {
      setFromDateError("Please select a From date.");
    } else {
      setFromDateError("");
    }

    if (!toDate) {
      setToDateError("Please select a To date.");
    } else {
      setToDateError("");
    }

    if (fromDate > toDate) {
      setFromDateError("From date should be earlier than To date.");
      return;
    }

    // If both dates are selected, proceed with report generation
    if (fromDate && toDate) {
      handleReport();
      generatePDFReport();
    }
  };

  const generatePDFReport = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
    });

    // Sample data representing multiple stocks and items
    const stocksData = stockDataReport;

    // Set initial y-coordinate for the table
    let y = 20;
    let currentPage = 1;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const addPageHeader = (fromDate, toDate, totalStocks, pageNumber) => {
      if (pageNumber === 1) {
        doc.setFontSize(16);
        doc.setFont("bold");
        doc.setTextColor(0, 0, 0);
        const headerText = `Stock Report From ${fromDate} To ${toDate}`;
        const totalStocksText = `Total Stocks: ${totalStocks}`;
        const headerX = pageWidth / 2;

         // Add horizontal line below "Total Stocks"
      const lineY = 30; // Adjust the Y-coordinate as needed
      const lineWidth = pageWidth / 2; // Half of the page width
      doc.setDrawColor(0); // Black color
      doc.setLineWidth(1); // Line width

      doc.text(headerText, headerX, 15, "center");
      doc.text(totalStocksText, headerX, 25, "center");
      doc.line(pageWidth / 4, lineY, (pageWidth / 4) * 3, lineY); // Draw the line

      y += 20;
      }

      const pageNumberText = `Page ${pageNumber}`;
      doc.text(pageNumberText, pageWidth / 2, pageHeight - 10, "center");
    };

    // Loop through each stock and create a table for it
    stocksData.forEach((stock, index) => {
      doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

      const originalDate = new Date(stock.date);
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true, // Use 12-hour format
      };

      const formattedDate = originalDate.toLocaleDateString("en-US", options);

      addPageHeader(fromDate, toDate, stocksData.length, currentPage);

      // Check if there's enough space for the stock's details, if not, create a new page
      const spaceNeeded = 10 + 10 * 4 + stock.items.length * 20;
      if (y + spaceNeeded > pageHeight - 10) {
        doc.addPage();
        currentPage++;
        y = 20; // Reset y-coordinate for the new page
        addPageHeader(fromDate, toDate, stocksData.length, currentPage);
      }

      // Create a table header
      doc.text(`Stock ID: ${stock.stockId}`, 10, y);
      doc.text(`Date and Time: ${formattedDate}`, 70, y);
      y += 10; // Move down a bit

      doc.text(`Total Cost: Rs. ${stock.totalCost}`, 10, y);
      y += 10; // Move down a bit

      doc.text(`Supplier Name: ${stock.suppliername}`, 10, y);
      y += 10; // Move down a bit

      doc.text(`Description: ${stock.description}`, 10, y);
      y += 10; // Move down a bit

      // Create a table for items
      const tableData = stock.items.map((item) => [
        item.itemName,
        item.itemType,
        item.itemColor,
        item.quantity.toString(),
      ]);

      // Define the table columns and their widths
      const tableHeaders = ["Item Name", "Item Type", "Item Color", "Quantity"];
      const tableWidths = [50, 40, 60, 30];

      // Create the table
      doc.autoTable({
        startY: y,
        head: [tableHeaders],
        body: tableData,
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 40 },
          2: { cellWidth: 60 },
          3: { cellWidth: 30 },
        },
        margin: { left: 10, right: 10 },
      });

      // y += doc.previousAutoTable.finalY + 1; // Move down after the table
      y += 45; // Move down for the next stock
    });

    // Draw a border on the last page
  doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

  // Reset font to desired style
  doc.setFontSize(12); // Change to your desired font size
  doc.setFont("normal"); // Change to your desired font style
  doc.setTextColor(0, 0, 0); // Change to your desired text color

    // Generate the PDF data URL
    const dataURL = doc.output("datauristring");

    // Define the desired file name for the downloaded PDF
    const fileName = "Stock_Report.pdf";

    // Create a new tab and display the PDF with a download attribute
    const newTab = window.open();
    newTab.document.open();
    newTab.document.title = "Stock Report"; // Set a custom tab title
    newTab.document.write(`
      <iframe width="100%" height="100%" src="${dataURL}"></iframe>
      <a href="${dataURL}" download="${fileName}">${fileName}</a>
    `);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="px-10 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-1 mt-5 font-sans">
        <h1 className="text-[45px] ml-[50px] font-bold text-gray-800 mb-[5px]">
          Stock Management
        </h1>

        {/* Add New Stock Button */}
        <div className="mt-40px]">
          <Link
            to="/stock/new" // Replace this with the path to the page where you create a new stock
            className="text-white bg-black font-semibold px-4 pb-[10px] pt-[7px] rounded-md"
          >
            Add New Stock
          </Link>

          <button
            onClick={() => setShowPopup(true)} // Show the popup on button click
            className="text-white bg-black font-semibold px-4 pb-[10px] pt-[7px] ml-5 rounded-md"
          >
            Generate Report
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md text-center">
            <h2 className="text-center mb-5 text-lg">Generate Report</h2>
            <label className="mt-4">
              From:
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border rounded-md p-2 ml-2 mb-1 focus:outline-none focus:ring focus:border-blue-500"
              />
              <p className="text-red-500 text-sm">{fromDateError}</p>
            </label>
            <label className="mt-4">
              To:
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border rounded-md p-2 ml-2 focus:outline-none focus:ring focus:border-blue-500"
              />
              <p className="text-red-500 text-sm">{toDateError}</p>
            </label>

            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={handleGenerateReport}
              >
                Generate Report
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center items-center mb-4">
        <input
          type="text"
          placeholder="Search Stock by Supplier Name , Date and Time, Stock ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="px-4 w-[500px] py-2 border border-gray-300 rounded-lg mr-2"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      <div className="ml-[50px] w-[1200px] overflow-hidden max-h-[428px] font-sans font-[700] rounded-[10px]">
        <div className="table-header bg-black text-white">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-4 py-3  text-left"  style={{ width: "100px" }}>Stock ID</th>
                <th className="px-4 py-3  text-left" style={{ width: "300px" }}>Date and Time</th>
                <th className="px-4 py-3  text-left" style={{ width: "200px" }}>Supplier Name</th>
                <th className="px-4 py-3  text-left" style={{ width: "200px" }}>Item Names</th>
                <th className="px-4 py-3  text-left" style={{ width: "200px" }}>Total Cost (Rs.)</th>
                <th className="px-4 py-3  text-left" style={{ width: "200px" }}></th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="table-body overflow-y-auto max-h-[350px]">
          <table className="w-full">
            <tbody>
              {stockData.map((value, index) => (
                
                
                <tr
                  key={value.id}
                  className={index % 2 === 0 ? "bg-[#F1F1F1]" : "bg-[#D9D9D9]"}
                >
                  <td className="px-4 py-3 font-sans" style={{ width: "100px" }}>
                    {value.stock_id}
                  </td>
                  <td className="px-4 py-3 font-sans" style={{ width: "300px" }}>
                    {new Date(value.date_and_time).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3" style={{ width: "200px" }}>
                    {value.supplier_name}
                  </td>
                  <td className="px-4 py-3" style={{ width: "200px" }}>
                    {value.item_names}
                  </td>
               
                  <td className="px-4 py-3" style={{ width: "200px" }}>{value.total_cost}</td>
                  <td className="px-4 py-3 text-right" style={{ width: "200px" }}>
                    <div className="flex justify-end gap-2 font-sans">
                      <Link
                        to={`/stock/${value.stock_id}`}
                        className="bg-black font-sans text-white py-2 px-4 rounded-md"
                      >
                        <p className="font-sans">View Details</p>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StockManagementPage;
