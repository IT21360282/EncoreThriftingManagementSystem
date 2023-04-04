import React, { Component } from 'react'
import axios from 'axios'
import '../Purchasing.css'

export default class PlaceStockOrder extends Component {
  render() {
    return (
      <div className='Purchasing'>
        <div style={{marginTop:"70px"}}> 
          <h2>Place Stock Order</h2>
          <div className='inline-form' >
            <div style={{width:"50%"}}> 
              <label>Title of Order:</label>
              <input type='text' className='form-input' name='' placeholder=''/><br/>
              <label>Select Supplier:</label>
              <select className='form-select'>
                <option>Select One</option>
                <option>#01</option>
                <option>#01</option>
              </select><br/>
              <label>Order Expected Day:</label>
              <input type='date' className='form-input' name='' placeholder=''/>
              <input className='form-input' name='' placeholder=''/>
              <input className='form-input' name='' placeholder=''/>
            </div>
            <div style={{width:"50%"}}>
              <input className='form-input' style={{float:"right"}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
