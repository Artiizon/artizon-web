

import { useState, useEffect } from "react";
import StandardLayout from "../components/layout/StandardLayout";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";

function Dashboard() {
  const [totalStocks, setTotalStocks] = useState(0);
  const [totalMaterials, setTotalMaterials] = useState(0);
  const [totalButtons, setTotalButtons] = useState(0);
  const [totalInks, setTotalInks] = useState(0);
  const [totalThreads, setTotalThreads] = useState(0);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/stocks");
        const stocks = response.data;
        setTotalStocks(stocks.length);

        let totalMaterials = 0;
        let totalButtons = 0;
        let totalInks = 0;
        let totalThreads = 0;

        stocks.forEach((stock) => {
          stock.items.forEach((item) => {
            switch (item.type) {
              case "Material":
                totalMaterials++;
                break;
              case "Button":
                totalButtons++;
                break;
              case "Ink":
                totalInks++;
                break;
              case "Thread":
                totalThreads++;
                break;
              default:
                break;
            }
          });
        });

        setTotalMaterials(totalMaterials);
        setTotalButtons(totalButtons);
        setTotalInks(totalInks);
        setTotalThreads(totalThreads);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <StandardLayout>
      <div className="px-10 py-6 grid grid-cols-2 gap-8 min-h-screen">
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Total Stocks
            </Typography>
            <Typography variant="h4">{totalStocks}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Total Materials
            </Typography>
            <Typography variant="h4">{totalMaterials}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Total Buttons
            </Typography>
            <Typography variant="h4">{totalButtons}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Total Inks
            </Typography>
            <Typography variant="h4">{totalInks}</Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" component="h2">
              Total Threads
            </Typography>
            <Typography variant="h4">{totalThreads}</Typography>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
}

export default Dashboard;
