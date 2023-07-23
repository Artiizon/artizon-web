import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StandardLayout from "../components/layout/StandardLayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

function StockUpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);
  const [formData, setFormData] = useState({
    items: [],
  });

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/stock/${id}`);
        const stockDetails = response.data;
        if (stockDetails) {
          setStock(stockDetails);
          setFormData(stockDetails);
        }
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
    };

    fetchStockDetails();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/stock/${id}`, formData);
      console.log("Stock updated successfully!");
      navigate("/stock");
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleQuantityChange = (index, value) => {
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData.items];
      updatedItems[index] = {
        ...updatedItems[index],
        quantity: value,
      };
      return {
        ...prevFormData,
        items: updatedItems,
      };
    });
  };

  if (!stock) {
    return <div>Loading...</div>;
  }

  return (
    <StandardLayout>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Update Stock
        </Typography>
        <form onSubmit={handleUpdate}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Code</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Color</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name={`items[${index}].item_id`}
                        value={item.item_id}
                        readOnly
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name={`items[${index}].type`}
                        value={item.type}
                        readOnly
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name={`items[${index}].quantity`}
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name={`items[${index}].item_name`}
                        value={item.item_name}
                        readOnly
                   
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        fullWidth
                        variant="outlined"
                        name={`items[${index}].color`}
                        value={item.color}
                        readOnly
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            halfWidth
            style={{ marginTop: 16, marginBottom: 20 }}
          >
            Update
          </Button>
          <Button
            color="primary"
            halfWidth
            onClick={() => navigate("/stock")}
            style={{ marginTop: 16, marginLeft: 16, marginBottom: 20 }}
          >
            Cancel
          </Button>
        </form>
      </Container>
    </StandardLayout>
  );
}

export default StockUpdatePage;
