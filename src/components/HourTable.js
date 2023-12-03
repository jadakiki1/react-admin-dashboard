import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';


function HourTable({ aggType, timeType, dateRange}) {
 
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {

        let apiUrl;

        if (aggType === "neAlias" && timeType === "hourly") {
            apiUrl = 'http://localhost:5179/api/Data/hourly/NeAlias';
        } else if (aggType === "neType" && timeType === "hourly") {
            apiUrl = 'http://localhost:5179/api/Data/hourly/NeType';
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
            
        const filteredData = Array.isArray(json)
        ? json.filter((item) => {
            const itemDate = new Date(item.dateTime_Key); 
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

  }, [aggType, timeType, dateRange]); 



  const allColumns = [
    { field: 'dateTime_Key', headerName: 'DateTime_Key', width: 150},
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
    if (aggType === 'neAlias' && column.field === 'neType') {
      return false;
    }
    if (aggType === 'neType' && column.field === 'neAlias') {
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
