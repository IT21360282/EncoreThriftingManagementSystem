
import React, { Component, useState } from 'react'

import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from 'axios';

import { toast } from 'react-toastify';
import { API_URL } from '../../constant/api-config';
Chart.register(CategoryScale);
const Graph=()=>
{

    //Variable to store Manager count
 const [EmpCount, setEmpCount] = useState(0);
 const [StockCount, setStockCount] = useState(0);
 const [SupplierCount, setSupplierCount] = useState(0);
 const [PurchasingCount, setPurchasingCount] = useState(0);
 const [FinanceCount, setFinanceCount] = useState(0);
 const [DeliveryCount, setDeliveryCount] = useState(0);
 const [TableData, setTableData] = useState("");
  //Get Count of Each Manager
  const getCount=(data)=>{
    const st=data.filter((item=>item.Designation=="Stock Manager"))
    setStockCount(st.length)
    const emp=data.filter((item=>item.Designation=="Employee Manager"))
    setEmpCount(emp.length)
    const sup=data.filter((item=>item.Designation=="Supplier Manager"))
    setSupplierCount(sup.length)
    const pu=data.filter((item=>item.Designation=="Purchasing Manager"))
    setPurchasingCount(pu.length)
    const fi=data.filter((item=>item.Designation=="Finance Manager"))
    setFinanceCount(fi.length)
    const del=data.filter((item=>item.Designation=="Delivery Manager"))
    setDeliveryCount(del.length)
  
  
  }
    //Get All Data from Backend
    const getData = () => {
      axios
        .get(API_URL + "/")
        .then((response) => {
          console.log(response);
          setTableData(response.data);
          getCount(response.data)
          
        })
        .catch((error) => {
          toast.error("Error While Fetching Data !!.");
        });
        
    };
  const data = {
    labels: ['Employee Manager', 'Stock Manager', 'Supplier Manager','Purchasing Manager','Finance Manager','Delivery Manager'],
   
    datasets: [
        {
          label: 'Popularity of Managers',
          data: [EmpCount, StockCount, SupplierCount,PurchasingCount,FinanceCount,DeliveryCount],
         
          backgroundColor: [
          "rgba(75,192,192,1)",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
          ],
          borderWidth: 1,
        }
    ]
}
useState(()=>{
  if (TableData == "") {
    getData();
  }
  if (TableData != "") {
  }
})
  return(<div>
    <div style={{marginTop:"70px"}}>
 <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Manager Summery"
            },
            legend: {
              display: false
            }
          }
        }}
      />
</div>
  </div>)
}
export default Graph;