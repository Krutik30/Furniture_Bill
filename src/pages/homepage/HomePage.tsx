import { Card, CardHeader, Box } from "@mui/material";
import React from 'react';
import ReactApexChart from "react-apexcharts";
import ApexCharts from 'react-apexcharts';


// ----------------------------------------------------------------------
export const loader = () => null;
export function HomePage() {

  const AllchartData = [
    {
      name: "order",
      type: "column",
      fill: "solid",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
    },
  ];

  const chartLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartOptions = {
    // ...BaseOptionChart(),
    plotOptions: { bar: { columnWidth: "16%" } },
    fill: { type: AllchartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: "month" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y:any) => {
          if (typeof y !== "undefined") {
            return `₹ ${y.toFixed(0)}L`;
          }
          return y;
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader title='Summary Graph' subheader="Yearly Report" />

      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <ReactApexChart
              type="line"
              series={AllchartData}
              // @ts-ignore
              options={chartOptions}
              height={364}
            />              
        
      </Box>
    </Card>
  );
}