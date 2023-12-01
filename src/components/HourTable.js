import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';


function HourTable({ groupBy, dateRange}) {
  
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        
        const response = await fetch('http://localhost:5179/api/Data/hourly');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        
        const filteredData = Array.isArray(json)
        ? json.filter((item) => {
            const itemDate = new Date(item.time); 
            return itemDate >= dateRange.startDate && itemDate <= dateRange.endDate;
          })
        : [json];

        setData(filteredData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    console.log(data)

  }, [dateRange]); 


  const allColumns = [
    { field: 'time', headerName: 'Time', width: 150},
    {
      field: 'neAlias',
      headerName: 'NeAlias',
      width: 150
    },
    {
      field: 'neType',
      headerName: 'NeType',
      width: 150
    },
    {
      field: 'rfInputPower',
      headerName: 'RfInputPower',
      width: 150
    },
    {
      field: 'maxRxLevel',
      headerName: 'MaxRxLevel',
      width: 150
    },
    {
      field: 'rsL_Deviation',
      headerName: 'RSL_Deviation',
      width: 150
    },
  ]; 


  const filteredColumns = allColumns.filter(column => {
    if (groupBy === 'neAlias' && column.field === 'neType') {
      return false;
    }
    if (groupBy === 'neType' && column.field === 'neAlias') {
      return false;
    }
    return true;
  });
  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;


    const dataWithIds = data?.map((item, index) => ({
      id: index + 1, 
      ...item
    }));

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={dataWithIds}
          columns={filteredColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    
  );
  
}

export default HourTable;
