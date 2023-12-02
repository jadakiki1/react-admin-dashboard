import axios from "axios";

const hourURL = "http://localhost:5179/api/Data/hourly"

const dayURL = "http://localhost:5179/api/Data/daily"

// Getting Hourly Daata

async function hourlyData(data) {

    const url = hourURL;
    return await axios.get(url, data)
    .then((response) => response.data)
}


async function dailyData(data) {
    
    const url = dayURL;
    return await axios.get(url, data)
    .then((response) => response.data)
}

export {
    hourlyData,
    dailyData
}