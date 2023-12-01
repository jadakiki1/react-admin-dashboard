import { useState, useEffect } from 'react'
import axios from 'axios';
import { LineChart } from '@mui/x-charts/LineChart';

const HourChart = ({ dateRange }) => {
  const [chartData, setChartData] = useState([]);

  const seriesColors = {
    "RfInputPower": "#02b2af", 
    "MaxRxLevel": "#2e96ff",
    "Rsl_Deviation": "#da00ff"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5179/api/Data/hourly');
        const rawData = response.data || [];

          const filteredData = rawData.filter(item => {
          const itemDate = new Date(item.time);
          return itemDate >= dateRange.startDate && itemDate <= dateRange.endDate;
        });

        if (filteredData.length === 0) {
          setChartData(null);
        } else {
          setChartData({
            options: {
              chart: { id: "time" },
              xaxis: { categories: filteredData.map(item => item?.time) }
            },
            series: [
              {
                name: "RfInputPower",
                data: filteredData.map(item => item?.rfInputPower)
              },
              {
                name: "MaxRxLevel",
                data: filteredData.map(item => item?.maxRxLevel)
              },
              {
                name: "Rsl_Deviation",
                data: filteredData.map(item => item?.rsL_Deviation)
              }
            ]
          });
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, [dateRange]); 

  const renderLegend = () => {
    
    if (!chartData || !chartData.series) {
      return null;
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {chartData.series.map(series => (
          <div key={series.name} style={{ marginRight: 20, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 20, height: 20, backgroundColor: seriesColors[series.name], marginRight: 5 }}></div>
            <span>{series.name}</span>
          </div>
        ))}
      </div>
    );
  };

  const isChartDataValid = chartData && chartData.options && chartData.series;

  console.log("Chart Data: ", chartData);

return (
  <div>
    {renderLegend()}
    {isChartDataValid ? (
      <LineChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        width="1200"
        height="400"
      />
    ) : (
      <div>No data available for the selected date range.</div>
    )}
  </div>
);
};

export default HourChart;
