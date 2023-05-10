import React, { Component } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'

export default class GenerateGraph extends Component {
  constructor(props){
    super(props)
    this.state = {
      confirmationPendingOrders:[],
      pendingOrders:[],
      receivedOrders:[],
      canceledOrders:[],
    }
  }

  componentDidMount(){
    axios.get("http://localhost:8000/purchasingGet/stockOrder/pendingAll").then(res =>{
      if(res.data.success){
        this.setState({
          pendingOrders:res.data.pendingOrders
        })
      }
    })
    
    axios.get("http://localhost:8000/purchasingGet/stockOrder/receivedAll").then(res =>{
      if(res.data.success){
        this.setState({
          receivedOrders:res.data.receivedOrders
        })
      }
    })
    
    axios.get("http://localhost:8000/purchasingGet/stockOrder/confirmation-pendingAll").then(res =>{
      if(res.data.success){
        this.setState({
          confirmationPendingOrders:res.data.confirmationPendingOrders
        })
      }
    })
  
  }

  render() {
    const conLen = this.state.confirmationPendingOrders.length
    const penLen = this.state.pendingOrders.length
    const resLen = this.state.receivedOrders.length

    const orderTypeData = [
      {name: 'Confirmation Pending', value: conLen},
      {name: 'Pending', value: penLen},
      {name: 'Received', value: resLen},
    ]

    const data = [
        {name: 'A', value: 10},
        {name: 'B', value: 5},
        {name: 'C', value: 15},
        {name: 'D', value: 20},
        {name: 'E', value: 8},
    ];

    const colorsForOrderType = ['#D11E00', '#FF2400', '#FF4B2E']

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0090'];
    return (
      <div className='Purchasing-others'npm install react-vis>
        <h2 style={{marginTop:"70px"}}>Generate Graph</h2>

        <div>
        </div>
        <div className='gray-box' style={{overflowY:"scroll",height:"64vh"}}> 
          <div className='chartCenter'>
            <h4 style={{textAlign:"center"}}>Current Stock Order Counts Categorized by Order Status</h4>
            <PieChart width={500} height={300} >
                <Pie
                    data={orderTypeData}
                    cx={250}
                    cy={150}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#ff5520"
                    dataKey="value"
                >
                    {orderTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colorsForOrderType[index]} />
                    ))}
                </Pie>
                <Tooltip />
              
            </PieChart>
            <span ><p style={{textAlign:"center"}}>All Stock Orders: {conLen+resLen+penLen}</p></span>
          </div>
        </div>
        
      </div>
    )
  }
}
