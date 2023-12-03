import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';
import { Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const HourChart = ({ aggType, dateRange }) => {
  const [rawData, setRawData] = useState([]);
  const [selectedKPI, setSelectedKPI] = useState('RfInputPower');

  useEffect(() => {
    const fetchData = async () => {
      try {

        let apiUrl; 

        if (aggType === "neAlias") {
          apiUrl = 'http://localhost:5179/api/Data/hourly/NeAlias';
        } else if (aggType === "neType") {
            apiUrl = 'http://localhost:5179/api/Data/hourly/NeType';
        }

        const response = await axios.get(apiUrl);
        setRawData(response.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [aggType]);

  const handleKPIChange = (event) => {
    setSelectedKPI(event.target.value);
  };

  const renderKPISelector = () => (
    <FormControl color='secondary' margin="normal">
      <InputLabel id="kpi-selector-label">Select KPI</InputLabel>
      <Select
        labelId="kpi-selector-label"
        id="kpi-selector"
        value={selectedKPI}
        label="Select KPI"
        onChange={handleKPIChange}
      >
        <MenuItem value="RfInputPower">Rf Input Power</MenuItem>
        <MenuItem value="MaxRxLevel">Max Rx Level</MenuItem>
        <MenuItem value="Rsl_Deviation">RSL Deviation</MenuItem>
       
      </Select>
    </FormControl>
  );

  if (rawData.length === 0) {
    return <Box textAlign="center">No data available for the selected date range.</Box>;
  }

  const filteredData = rawData.filter(item => {
    const itemDate = new Date(item.dateTime_Key);
    return itemDate >= dateRange.startDate && itemDate <= dateRange.endDate;
  });

  let selectedData;
  switch (selectedKPI) {
    case 'RfInputPower':
      selectedData = filteredData.map(item => item.rfInputPower);
      break;
    case 'MaxRxLevel':
      selectedData = filteredData.map(item => item.maxRxLevel);
      break;
    case 'Rsl_Deviation':
      selectedData = filteredData.map(item => item.rsL_Deviation);
      break;
    default:
      selectedData = [];
  }

  selectedData = selectedData.filter(value => value !== null && value !== undefined);

  const chartData = {
    xAxis: [
      {
        id: 'DateTime',
        data: filteredData.map(item => new Date(item.dateTime_Key)),
        label: 'DateTime',
        valueFormatter: date => {
          const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' };
          return new Intl.DateTimeFormat('en-US', options).format(date);
        },
      },
    ],
    yAxis: [
      {
        label: 'KPI',
      },
    ],
    series: [
      {
        id: selectedKPI,
        data: selectedData,
      },
    ],
    width: 1500,
    height: 600,
    margin: { left: 70 },
  };

  if (filteredData.length === 0) {
    return <Box textAlign="center">No data available for the selected date range.</Box>;
  }

  return (
    <Box>
      {renderKPISelector()}
    
      <LineChart
        {...chartData}
      />
    </Box>
  );
};

export default HourChart;
