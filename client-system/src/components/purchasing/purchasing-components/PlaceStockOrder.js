import React, { Component, useState } from 'react'
import axios from 'axios'
import '../Purchasing.css'

export default class PlaceStockOrder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inputs: []
    };
  }

  addInput = () => {
    const inputs = this.state.inputs;
    const count = inputs.length + 4
    const name = `stockItem${count}`
    const qty = `itemQty${count}`
    

    this.setState({
      inputs: inputs.concat(
        <div key={count} style={{marginBottom:"10px"}}>
          <input className='add-stock-input' type="text" name={name} />
          <input className='add-stock-qty-input' type="text" name={qty} />
        </div>
      )
    });
  };

  render() {
    const { newStockItem } = this.state;
    return (
      <div className='Purchasing-others'> 
        <h2 style={{marginTop:"70px"}}>Place Stock Order</h2>
        <div className='gray-box'> 
          <div className='form-main'>
          <div>
            <br/>
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
              <label>Payment:</label>
              <select className='form-select'>
                <option>Select One</option>
                <option>#01</option>
                <option>#01</option>
              </select><br/>
              <label>Note for Supplier:</label>
              <textarea className='form-textarea' name='' cols={30} rows={6} placeholder='Special Note for Supplier'></textarea>
            
          </div>
          <div >
            <label>Add Stock Items:</label><br/>
            <div className='div-frame add-stock-input' >
              <table><tr><td style={{width:"330px"}}>Item Name</td><td>Qty</td></tr></table>
              <div key='1' style={{marginBottom:"10px"}}>
                <input className='add-stock-input' type="text" name='stockItem1' />
                <input className='add-stock-qty-input' type="text" name='itemQty1' />
              </div>
              <div key='1' style={{marginBottom:"10px"}}>
                <input className='add-stock-input' type="text" name='stockItem2' />
                <input className='add-stock-qty-input' type="text" name='itemQty2' />
              </div>
              <div key='1' style={{marginBottom:"10px"}}>
                <input className='add-stock-input' type="text" name='stockItem3' />
                <input className='add-stock-qty-input' type="text" name='itemQty3' />
              </div>
            
              {this.state.inputs}
              <button className="btn btn-submit" onClick={this.addInput}><i class="fa-solid fa-circle-plus"></i> Add</button>
            </div>
          </div>

          </div>

          <div className='form-main'>
            <div style={{textAlign:"justify"}}>
              <p style={{width:"100%"}}><span style={{color:"red"}}>*</span>When place the order, An email informing about order will be sent to the relevent supplier. After place the order you can change ordered stock within 24 hours and can cancel with in 36 hours</p>
            </div>
            <div style={{marginBottom:"30px"}}>
              <button className="btn btn-submit" >Place</button>
              <button className="btn btn-warning" >Reset</button>
              <button className="btn btn-primary" >View All Orders</button>
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
