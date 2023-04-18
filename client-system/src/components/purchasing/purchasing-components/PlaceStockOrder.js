import React, { Component,useState } from 'react'
import axios from 'axios'
import ReactModal from 'react-modal'

import '../Purchasing.css'

export default class PlaceStockOrder extends Component {

  constructor(props) {
    super(props)

    this.state = {
      stockItemsInput: [],
      purID: "",
      purDigitID: "",
      title: "",
      placedDate: "",
      confirmedDate: "",
      orderStatus: "",
      expectedDate: "",
      receivedDate: "",
      totalCost: "",
      totalQty: 0,
      paymentStatus: "",
      supplier: "",
      purFullID:"",
      stockItems: [],
      stockItemsQty: [],
      stockItemsUnitPrice: [],
      stockOrderDetails: [],
      isOpen:false,
      popUpMsg:"Stock Order is Placed and Details are Saved Successfully.",
      redAlert:"",
    }
    this.handlePopUp = this.handlePopUp.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount(){
    axios.get("http://localhost:8000/purchasingGet/stockOrder/get").then(res =>{
      if(res.data.success){
        this.setState({
          stockOrderDetails:res.data.existingDetails
        })
      }
    })
  }

  handlePopUp(){
    this.setState({isOpen:true})
  }

  handleInputChange = (e) => {
    const {name,value} = e.target
    this.setState({
      ...this.state, [name]:value
    })
  }

  handleItemInputChange = (e, index) => {
    const {name,value} =e.target
    const stockItems = [...this.state.stockItems]
    stockItems[index] = value
    this.setState({stockItems})
  }
  
  handleQtyInputChange = (e, index) => {
    const {name,value} =e.target
    const stockItemsQty = [...this.state.stockItemsQty]
    stockItemsQty[index] = value
    this.setState({stockItemsQty})
  }
  
  handleUnitPriceInputChange = (e, index) => {
    const {name,value} =e.target
    const stockItemsUnitPrice = [...this.state.stockItemsUnitPrice]
    stockItemsUnitPrice[index] = value
    this.setState({stockItemsUnitPrice})
  }

  handleAddStockItem = () => {
    const stockItemsInput = [...this.state.stockItemsInput]
    stockItemsInput.push('')
    this.setState({ stockItemsInput })
  }

  handleRemoveStockItem = (index) => {
    const stockItemsInput = [...this.state.stockItemsInput]
    const stockItems = [...this.state.stockItems]
    const stockItemsQty = [...this.state.stockItemsQty]
    const stockItemsUnitPrice = [...this.state.stockItemsUnitPrice]
    stockItemsInput.splice((index-1), 1)
    stockItems[index] = ''
    stockItemsQty[index] = ''
    stockItemsUnitPrice[index] = ''
    this.setState({ stockItemsInput })
    this.setState({ stockItems })
    this.setState({ stockItemsQty })
    this.setState({ stockItemsUnitPrice })
  }

  onSubmit = (e) =>{
    e.preventDefault()

    const lastOrderDetail = this.state.stockOrderDetails.pop()
    let lastPurID = lastOrderDetail.purDigitID
    lastPurID = String(Number(lastPurID)+1).padStart(lastPurID.length,"0")

    const today = new Date()
    const y = today.getFullYear()
    const m = (today.getMonth()+1).toString().padStart(2,"0")
    const d = today.getDate().toString().padStart(2,"0")
    
    const {purID,purDigitID,title,placedDate,confirmedDate,orderStatus,expectedDate,receivedDate,totalCost,totalQty,paymentStatus,supplier,stockItems,stockItemsQty,stockItemsUnitPrice} = this.state
    const data = {
      purID:"PS",
      purDigitID:lastPurID,
      title:title,
      placedDate:`${d}-${m}-${y}`,
      confirmedDate:"not yet",
      orderStatus:"Confirmation Pending",
      expectedDate:expectedDate,
      receivedDate:"not yet",
      totalCost:totalCost,
      totalQty:totalQty,
      paymentStatus:paymentStatus,
      supplier:supplier,
      stockItems:stockItems,
      stockItemsQty:stockItemsQty,
      stockItemsUnitPrice:stockItemsUnitPrice,
    }
    
    console.log(lastPurID)

    axios.post("http://localhost:8000/purchasingPost/stockOrder/post",data).then((res)=>{
      if(res.data.success){
        this.setState(
          {
            purID: "",
            purDigitID: "",
            title: "",
            placedDate: "",
            confirmedDate: "",
            orderStatus: "",
            expectedDate: "",
            receivedDate: "",
            totalCost: "",
            totalQty: "",
            paymentStatus: "",
            supplier: "",
            stockItems:[],
            stockItemsQty:[],
            stockItemsUnitPrice:[],
            stockItemsInput: [],
          }
        )
      }
    }).catch(error=>{
      console.error("error orccured")
      let popUpMsg = this.state.popUpMsg
      let redAlert = this.state.redAlert
      popUpMsg = "Stock Order is not placed."
      redAlert = "Something Wrong! "
      this.setState({popUpMsg})
      this.setState({redAlert})
    })

  }

  render() {
    const { stockItemsInput } = this.state

    const itemTypeQty = this.state.stockItems.length

    let totalQty = this.state.totalQty
      for(let i = 0; i < this.state.stockItemsQty.length; i++){
        totalQty = totalQty + parseInt(this.state.stockItemsQty[i])
    }

    return (
      <div className='Purchasing-others'> 
        <h2 style={{marginTop:"70px"}}>Place Stock Order</h2>
        <div className='gray-box' style={{overflowY:"scroll",height:"64vh"}}> 
          <div className='form-main'>
          <div>
            <br/>
          <label>Title of Order:</label>
              <input type='text' className='form-input' name='title' placeholder='Title' value={this.state.title} onChange={this.handleInputChange}/><br/>
              <label>Select Supplier:</label>
              <select className='form-select' name='supplier' value={this.state.supplier} onChange={this.handleInputChange}>
                <option>Select One</option>
                <option>Leaf Knowledge (PVT Ltd.)</option>
                <option>ZOHO International</option>
                <option>Alpha Wholesale Thirifting Ltd.</option>
              </select><br/>
              <label>Order Expected Day:</label>
              <input type='date' className='form-input' name='expectedDate' placeholder='' value={this.state.expectedDate} onChange={this.handleInputChange}/>
              <label>Payment:</label>
              <select className='form-select' name='paymentStatus' value={this.state.paymentStatus} onChange={this.handleInputChange}>
                <option>Select One</option>
                <option>Paid</option>
                <option>Send to Financial Manager</option>
              </select><br/>
              <label>Note for Supplier:</label>
              <textarea className='form-textarea' name='' cols={30} rows={6} placeholder='Special Note for Supplier'></textarea>
            
          </div>

          <div >
            <label>Add Stock Items:</label><br/>
            <div className='div-frame add-stock-input' >
              
            <div className='btn-inline'>
                <div className='add-item-input'>Item Name</div>
                <div className='add-item-price-input'>Qty</div>
            </div>

              <div key="0" style={{marginTop:"10px"}}>
                <input type="text" className='add-stock-input' value={this.state.stockItems[0]} onChange={(event) => this.handleItemInputChange(event, 0)} />
                <input type="text" className='add-stock-qty-input' style={{width:"12%",borderTopRightRadius:"8px",borderBottomRightRadius:"8px"}} value={this.state.stockItemsQty[0]} onChange={(event) => this.handleQtyInputChange(event, 0)} />
              </div>   

              {stockItemsInput.map((input, index) => (
                <div key={index+1} style={{marginTop:"10px"}}>
                  <input type="text" className='add-stock-input' value={this.state.stockItems[index+1]} onChange={(event) => this.handleItemInputChange(event, (index+1))} />
                  <input type="text" className='add-stock-qty-input' value={this.state.stockItemsQty[index+1]} onChange={(event) => this.handleQtyInputChange(event, (index+1))} />
                  <button type="button" className='remove-stock-input' onClick={() => this.handleRemoveStockItem(index+1)}><i class="fa-solid fa-minus"></i></button>
                </div>
              ))}
              <button className="btn btn-success" style={{right:"0",marginTop:"10px"}} type="button" onClick={this.handleAddStockItem}><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Another Item</button>
              <div className='btn-inline' style={{marginBottom:'5px', marginTop:'15px'}}>
                <div className='form-preview-container'>Item Type quantity<br/><span style={{color:"red",fontSize:"20px"}}>{itemTypeQty}</span></div> 
                <div className='form-preview-container'>Total Item Quantity<br/><span style={{color:"red",fontSize:"20px"}}>{totalQty}</span></div>
              </div>
              <div style={{textAlign:"justify"}}>
                <p><span style={{color:"red"}}>*</span>When order will be placed, Unit prices of each item set as 'null'. You can update that unit prices after confirming the order according to given prices by supplier.</p>               
              </div>
            </div>
          </div>

          </div>

          <div className='form-main'>
            <div style={{textAlign:"justify"}}>
              <p style={{width:"100%"}}><span style={{color:"red"}}>*</span>When place the order, An email informing about order will be sent to the relevent supplier. You can able to change or cancel order untill order will be confirmed.</p>
            </div>
            <div className='form-btn'>
              <br/>
              <a href={`/purchasing/display-orders`}><button className="btn btn-primary" >View All Orders</button></a>&nbsp;&nbsp;&nbsp;
              <button className="btn btn-warning" type='reset' >Reset</button>&nbsp;&nbsp;&nbsp;
              <a onClick={this.handlePopUp} ><button className="btn btn-success"  onClick={this.onSubmit}>Place</button></a>
              <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handlePopUp} className="popUp20 zoom-in">
                <h2 ><span style={{color:'red'}}>{this.state.redAlert}</span>{this.state.popUpMsg}</h2>
                <a href={`/purchasing/place-order`}><button onClick={this.handlePopUp} className="btn btn-primary" >Place Another Order</button></a>&nbsp;&nbsp;&nbsp;
                <a href={`/purchasing/display-orders`}><button onClick={this.handlePopUp} className="btn btn-primary" >View All Orders</button></a>&nbsp;&nbsp;&nbsp;
                <a href={`/purchasing/purchasing-home`}><button onClick={this.handlePopUp} className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;Home</button></a>
              </ReactModal>
              <br/>
              <br/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
