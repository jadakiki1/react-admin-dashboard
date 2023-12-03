import HourChart from "../../components/HourChart";
import DailyChart from "../../components/DailyChart";

import React, { useEffect, useState } from 'react';


import { Box, Button, Dialog, DialogContent } from '@mui/material';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


import HourTable from "../../components/HourTable";
import DailyTable from "../../components/DailyTable";

const CalendarPopup = (props) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const togglePopup = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const changeDate = (data) => {
    setSelectedDateRange([
      {
        startDate: data[0].startDate,
        endDate: data[0].endDate,
        key: 'selection',
      },
    ]);
  };

  useEffect(() => {
    props.onDateChange(selectedDateRange[0]);
  }, [selectedDateRange, props.onDateChange]);


  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={togglePopup}>
        Open Calendar
      </Button>

      <Dialog open={isCalendarOpen} onClose={togglePopup}>

        <DialogContent>

          <DateRangePicker
            onChange={item => changeDate([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={selectedDateRange}
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

  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleDateChange = (dateRange) => {
    setSelectedDateRange(dateRange);
  };


  return (
    <Box>
    {/* Box for Header */}
    <Box marginLeft="40px" marginTop="20px">
      <CalendarPopup onDateChange={handleDateChange} />
    </Box>
      
      {/* Box for Buttons */}
      <Box display="flex" justifyContent="space-between" padding="20px">
        {/* Time Option Buttons */}
        <Box>
          {/* Daily Button */}
          <Button
            variant={timeOption === 'daily' ? 'contained' : 'outlined'} 
            color="secondary"
            onClick={() => setTimeOption('daily')}
          >
            Daily
          </Button>

          {/* Hourly Button */}
          <Button 
            variant={timeOption === 'hourly' ? 'contained' : 'outlined'} 
            color="secondary"
            onClick={() => setTimeOption('hourly')}
          >
            Hourly
          </Button>
        </Box>

        {/* NE Option Buttons */}
        <Box>
          {/* NeAlias Button */}
          <Button 
            variant={neOption === 'neAlias' ? 'contained' : 'outlined'} 
            color="secondary"
            onClick={() => setNeOption('neAlias')}
          >
            NeAlias
          </Button>

          {/* NeType Button */}
          <Button 
            variant={neOption === 'neType' ? 'contained' : 'outlined'} 
            color="secondary"
            onClick={() => setNeOption('neType')}
          >
            NeType
          </Button>
        </Box>
      </Box>

      {/* Box for Chart */}
      <Box margin="20px">
        {timeOption === 'hourly' ? <HourChart aggType={neOption} dateRange={selectedDateRange}/> : <DailyChart aggType={neOption} dateRange={selectedDateRange}/>}
      </Box>


     
 {/* Box for Grid */}
 <Box sx={{ height: 400, width: '90%', margin: '60px' }}>
        {timeOption === 'hourly' ? (
          <HourTable aggType={neOption} timeType={timeOption} dateRange={selectedDateRange} />
        ) : (
          <DailyTable aggType={neOption} timeType={timeOption} dateRange={selectedDateRange} />
        )}
      </Box>
    </Box>
  );
};



export default Dashboard;