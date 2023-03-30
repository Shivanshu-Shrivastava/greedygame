import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import DatePicker from './components/DatePicker';
import Table from './components/Table'

function App() {
  const [fromdate, setFromdate] = useState('')
  const [todate, setTodate] = useState('')
  const [data, setData] = useState([])
  const [keysData, setKeysData] = useState([])
  console.log(fromdate, todate)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${fromdate}&endDate=${todate}`)
        const appres = await axios.get(`http://go-dev.greedygame.com/v3/dummy/apps`)

        // Merage two objects so that 'res' object has property name APP
        const composedArray = res.data.data.map(ele=>{
          return{
            ...ele,app:appres.data.data.find(id=>ele.app_id == id.app_id).app_name
          }
        })
        setData(composedArray)
        setKeysData(Object.keys(composedArray[0]))
      } catch (e) {
        console.log(e)
      }
    }
    fetchdata()
  }, [fromdate, todate])

  return (
      <div className="container mt-3">
        <h3>Analytics</h3>

        {/* Selecting dates for table data */}
        <DatePicker setFromdate={setFromdate} setTodate={setTodate} />

        {/* Dimensions and Metrics section */}
        <div className='my-4'>
        <h5 className='fs-6'>Dimensions and Metrics (Click on any block to hide and You can also Drag & Drop.)</h5>
        </div>


        {/* Table section */}
        <Table data={data} setData={setData} keysData={keysData} setKeysData={setKeysData} />


      </div>
  );
}

export default App;
