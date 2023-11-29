//Components
import LineChart from "../../components/LineChart";

import React, { useEffect, useState } from 'react';


import { DataGrid } from '@mui/x-data-grid';

import { Box, Button, Dialog, DialogContent } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


// Redux
import { connect } from 'react-redux';
import actions from "../../redux/actions/hourData";

const CalendarPopup = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);


  const togglePopup = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);



  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={togglePopup}>
        Open Calendar
      </Button>

      <Dialog open={isCalendarOpen} onClose={togglePopup}>

        <DialogContent>

          <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
            preventSnapRefocus={true}
            calendarFocus="forward"
          />

        </DialogContent>

      </Dialog>

    </div>
  );
};


const Dashboard = (props) => {
  




  const [timeOption, setTimeOption] = useState('daily');
  const [neOption, setNeOption] = useState('neAlias');

  const [gridData, setGridData] = useState([]);
  const [chartData, setChartData] = useState([]);
   
 

  const columns = [
    { field: 'time', headerName: 'Time', },
    {
      field: 'neAlias',
      headerName: 'NeAlias',
    },
    {
      field: 'neType',
      headerName: 'NeType',
    },
    {
      field: 'rfInputPower',
      headerName: 'rfInputPower',
    },
    {
      field: 'maxRxLevel',
      headerName: 'MaxRxLevel',
    },
    {
      field: 'rsL_Deviation',
      headerName: 'RSL_Deviation',
    },
  ]; 

  const fetchData = async () => {
    
      const hourlyResponse = await fetch('http://localhost:5179/api/Data/hourly');
      const dailyResponse = await fetch('http://localhost:5179/api/Data/daily');

      if (!hourlyResponse.ok || !dailyResponse.ok) {
        throw new Error('API response not ok');
      }
      const hourlyData = props.hourlyTable;
      const dailyData = await dailyResponse.json();
       
      setGridData(hourlyData);
      setChartData(formatChartData(hourlyData));
    
      
  };


  useEffect((props) => {
    fetchData();
  }, []);



  const formatChartData = (data) => {
    console.log(data)

    return data?.map(item => ({
      x: item.Time,
      y: item.RFInputPower,
    }));
  };

  



  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '100px',
    marginRight: '20px'
  };

  const boxStyle = {
    margin: '0 20px',
  };

  const radioStyle = {
    appearance: 'none',
    width: '10px',
    height: '10px',
    backgroundColor: '#f0f0f0',
    border: '2px solid #dcdcdc',
    cursor: 'pointer',
  };

  const radioCheckedStyle = {
    ...radioStyle,
    backgroundColor: '#4cceac',
    borderColor: '#4cceac',
  };

  return (
    <Box marginLeft="40px" marginTop="20px">
      {/* HEADER */}
    
      <CalendarPopup />
      <div style={containerStyle}>
        {/* Box 1 */}
        <div style={boxStyle}>
          <label>
            <input
              type="radio"
              value="daily"
              checked={timeOption === 'daily'}
              onChange={() => setTimeOption('daily')}
              style={timeOption === 'daily' ? radioCheckedStyle : radioStyle}
            />
            Daily
          </label>
          <label>
            <input
              type="radio"
              value="hourly"
              checked={timeOption === 'hourly'}
              onChange={() => setTimeOption('hourly')}
              style={timeOption === 'hourly' ? radioCheckedStyle : radioStyle}
            />
            Hourly
          </label>
        </div>

        {/* Box 2 */}
        <div style={boxStyle}>
          <label>
            <input
              type="radio"
              value="neAlias"
              checked={neOption === 'neAlias'}
              onChange={() => setNeOption('neAlias')}
              style={neOption === 'neAlias' ? radioCheckedStyle : radioStyle}

            />
            NeAlias
          </label>
          <label>
            <input
              type="radio"
              value="neType"
              checked={neOption === 'neType'}
              onChange={() => setNeOption('neType')}
              style={neOption === 'neType' ? radioCheckedStyle : radioStyle}
            />
            NeType
          </label>
        </div>
      </div>

      {/* Adding Chart  */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >


        <Box gridColumn="span 10" gridRow="span 3">
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >


          </Box>

          <Box height="250px" m="20px 20px 20px 20px ">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
      {/* Chart Ended */}







      {/* Adding Grid */}

      <Box sx={{ height: 400, width: '90%' }}>
        <DataGrid
          rows={gridData ? gridData : ""}
          getRowId={(GridRowIdGetter) => ''}
          columns={columns}
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
      {/* Grid Ended */}

    </Box>
  );
};

const mapStateToProps = (state) => ({
  hourlyTable: state.hourDataReducer.hourlyTable,
  dailyTable: state.dailyDataReducer.dailyTable
})

const mapDispatchToProps = dispatch => ({
  fetchHourData: () => dispatch(actions.fetchHourData()),
  fetchDailyData: () => dispatch(actions.fetchDailyData())
})


export default connect(mapStateToProps, mapDispatchToProps)((Dashboard));
