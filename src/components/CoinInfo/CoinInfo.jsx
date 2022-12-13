import axios from "axios";
import React from "react";
import { useState } from "react";
import { CryptoState } from "../../context/cryptoContext";
import { HistoricalChart } from "../../config/api";
import { useEffect } from "react";
import classes from "./CoinInfo.module.css";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const CoinInfo = ({ coin }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency, symbol } = CryptoState();

  const fetchHistoricalData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [coin.id, days, currency]);

  return (
    <div className={classes.container}>
      {!historicalData ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <>
          <Line
            height={400}
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  backgroundColor: "#EEBC1d",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
              legend: {
                labels: {
                  fontSize: 26,
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default CoinInfo;
