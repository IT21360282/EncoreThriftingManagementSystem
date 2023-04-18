import React, { Component } from 'react'
import axios from 'axios'
import ReactModal from 'react-modal'

export default class AddOtherPurchase extends Component {
    constructor(props) {
        super(props)

        this.state = {
            purchasedItemsInput: [],
            purID: "PO",
            purDigitID: "",
            title: "",
            purchasedDate: "",
            purchasedSection: "",
            totalCost: 0,
            totalQty: 0,
            itemTypeQty: null,
            paymentStatus: "",
            shop: "",
            purchasedItems: [],
            purchasedItemQuantities: [],
            purchasedItemUnitPrices: [],
            purFullID: "",
            otherPurchaseDetails: [],
            isOpen: false,
            popUpMsg: "Purchase Details are Added Successfully.",
            redAlert: "",
        }
        this.handlePopUp = this.handlePopUp.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        axios.get("http://localhost:8000/purchasingGet/otherPurchase/get").then(res => {
            if (res.data.success) {
                this.setState({
                    otherPurchaseDetails: res.data.existingDetails
                })
            }
        })
    }

    handlePopUp(){
        this.setState({isOpen:true})
      }
    
    handleOtherInputChange = (e) => {
        const {name,value} = e.target
        this.setState({
          ...this.state, [name]:value
        })
    }
    
    handleItemInputChange = (e, i) => {
        const {name,value} =e.target
        const purchasedItems = [...this.state.purchasedItems]
        purchasedItems[i] = value
        this.setState({purchasedItems})
    }
      
    handleQtyInputChange = (e, i) => {
        const {name,value} =e.target
        const purchasedItemQuantities = [...this.state.purchasedItemQuantities]
        purchasedItemQuantities[i] = value
        this.setState({purchasedItemQuantities})
    }
    
    handleUnitPriceInputChange = (e, i) => {
        const {name,value} =e.target
        const purchasedItemUnitPrices = [...this.state.purchasedItemUnitPrices]
        purchasedItemUnitPrices[i] = value
        this.setState({purchasedItemUnitPrices})
    }
    
    handleAddPurchasedItem = () => {
        const purchasedItemsInput = [...this.state.purchasedItemsInput]
        purchasedItemsInput.push('')
        this.setState({ purchasedItemsInput })
    }
    
    handleRemovePurchasedItem = (i) => {
        const purchasedItemsInput = [...this.state.purchasedItemsInput]
        const purchasedItems = [...this.state.purchasedItems]
        const purchasedItemQuantities = [...this.state.purchasedItemQuantities]
        const purchasedItemUnitPrices = [...this.state.purchasedItemUnitPrices]
        purchasedItemsInput.splice((i-1), 1)
        purchasedItems.splice((i),1)
        purchasedItemQuantities.splice((i),1)
        purchasedItemUnitPrices.splice((i),1)
        this.setState({ purchasedItemsInput })
        this.setState({ purchasedItems })
        this.setState({ purchasedItemQuantities })
        this.setState({ purchasedItemUnitPrices })
    }

    onSubmit = (e) =>{
        e.preventDefault()
       

        const lastPurchaseDetail = this.state.otherPurchaseDetails.pop()
        let purDigitID = this.state.purDigitID
        purDigitID = lastPurchaseDetail.purDigitID
        purDigitID = String(Number(purDigitID)+1).padStart(purDigitID.length,"0")
        this.setState({purDigitID})
        
        let purFullID = this.state.purFullID
        purFullID = this.state.purID.concat(this.state.purDigitID)
        this.setState({purFullID})

        let totalQty = this.state.totalQty
        for(let i = 0; i < this.state.purchasedItemQuantities.length; i++){
            totalQty = totalQty + parseInt(this.state.purchasedItemQuantities[i])
        }
        this.setState({totalQty})

        let totalCost = this.state.totalCost
        for(let i = 0; i < this.state.purchasedItemUnitPrices.length; i++){
            let qty = parseInt(this.state.purchasedItemQuantities[i])
            totalCost = totalCost + (parseFloat(this.state.purchasedItemUnitPrices[i]))*qty
        }
        this.setState({totalCost})
        
        const {purID,title,purchasedDate,purchasedSection,paymentStatus,shop,purchasedItems,purchasedItemQuantities,purchasedItemUnitPrices} = this.state
        const data = {
          purID:purID,
          purDigitID:purDigitID,
          title:title,
          purchasedDate:purchasedDate,
          purchasedSection:purchasedSection,
          totalCost:totalCost,
          totalQty:totalQty,
          paymentStatus:paymentStatus,
          shop:shop,
          purchasedItems:purchasedItems,
          purchasedItemQuantities:purchasedItemQuantities,
          purchasedItemUnitPrices:purchasedItemUnitPrices,
        }
    
        axios.post("http://localhost:8000/purchasingPost/otherPurchase/post",data).then((res)=>{
          if(res.data.success){
            this.setState(
              {
                purID: "PO",
                purDigitID: "",
                title: "",
                purchasedDate: "",
                purchasedSection: "",
                totalCost: 0,
                totalQty: 0,
                paymentStatus: "",
                shop: "",
                purchasedItems:[],
                purchasedItemQuantities:[],
                purchasedItemUnitPrices:[],
                purchasedItemsInput: [],
              }
            )
          }
        }).catch(error=>{
          console.error("error orccured")
          let popUpMsg = this.state.popUpMsg
          let redAlert = this.state.redAlert
          popUpMsg = "Purchase Details are not Added."
          redAlert = "Something Wrong! "
          this.setState({popUpMsg})
          this.setState({redAlert})
        })
    }

    render() {
        const purchasedItemsInput = this.state.purchasedItemsInput

        const itemTypeQty = this.state.purchasedItems.length

        let totalQty = this.state.totalQty
        for(let i = 0; i < this.state.purchasedItemQuantities.length; i++){
            totalQty = totalQty + parseInt(this.state.purchasedItemQuantities[i])
        }

        let totalCost = this.state.totalCost
        for(let i = 0; i < this.state.purchasedItemUnitPrices.length; i++){
            let qty = parseInt(this.state.purchasedItemQuantities[i])
            totalCost = totalCost + (parseFloat(this.state.purchasedItemUnitPrices[i]))*qty
        }
        let total = totalCost.toFixed(2)

        return ( 
            <div className='Purchasing-others'> 
                <h2 style={{marginTop:"70px"}}>Add Purchase's Details</h2>
                <div className='gray-box' style={{overflowY:"scroll",height:"64vh"}}> 
                <div className='form-main'>
                <div>
                    <br/>
                    <label>Title of Purchase:</label>
                    <input type='text' className='form-input' name='title' placeholder='Title' value={this.state.title} onChange={this.handleOtherInputChange}/><br/>
                    <label>Shop Name:</label>
                    <input type='text' className='form-input' name='shop' placeholder='Purchased From' value={this.state.shop} onChange={this.handleOtherInputChange}/><br/>
                    
                    <label>Purchased Date:</label>
                    <input type='date' className='form-input' name='purchasedDate' placeholder='' value={this.state.purchasedDate} onChange={this.handleOtherInputChange}/>
                    <label>For Which Section:</label>
                    <select className='form-select' name='purchasedSection' value={this.state.purchasedSection} onChange={this.handleOtherInputChange}>
                    <option>Select One</option>
                        <option>Order Section</option>
                        <option>Financial Section</option>
                        <option>Purchasing Section</option>
                        <option>HR Section</option>
                        <option>Delivery Section</option>
                        <option>Packaging Section</option>
                        <option>Supplier Managing Section</option>
                        <option>Inventory</option>
                        <option>Thrift Store </option>
                        <option>Other</option>
                    </select><br/>
                    <label>Payment:</label>
                    <select className='form-select' name='paymentStatus' value={this.state.paymentStatus} onChange={this.handleOtherInputChange}>
                        <option>Select One</option>
                        <option>Paid</option>
                        <option>Purchase on credit</option>
                        <option>Payment Status Details Pending</option>
                    </select><br/>
                    
                </div>

                <div >
                    <label>Add Purchased Items:</label><br/>
                    <div className='div-frame add-stock-input' >
                    
                        <div className='btn-inline'>
                            <div className='add-item-input'>Item Name</div>
                            <div className='add-item-qty-input'>Qty</div>
                            <div className='add-item-price-input'>Unit Price</div>
                        </div>

                        <div key="0" style={{marginTop:"10px"}}>
                            <input type="text" className='add-item-input add-input' value={this.state.purchasedItems[0]} onChange={(event) => this.handleItemInputChange(event, 0)} />
                            <input type="text" className='add-item-qty-input add-input' value={this.state.purchasedItemQuantities[0]} onChange={(event) => this.handleQtyInputChange(event, 0)} />
                            <input type="text" className='add-item-price-input add-input' style={{width:"16.8%",borderTopRightRadius:"8px",borderBottomRightRadius:"8px"}} value={this.state.purchasedItemUnitPrices[0]} onChange={(event) => this.handleUnitPriceInputChange(event, 0)} />
                        </div>   

                        {purchasedItemsInput.map((input, index) => (
                            <div key={index+1} style={{marginTop:"10px"}}>
                              
                            <input type="text" className='add-item-input add-input' value={this.state.purchasedItems[index+1]} onChange={(event) => this.handleItemInputChange(event, (index+1))} />
                            <input type="text" className='add-item-qty-input add-input' value={this.state.purchasedItemQuantities[index+1]} onChange={(event) => this.handleQtyInputChange(event, (index+1))} />
                            <input type="text" className='add-item-price-input add-input' value={this.state.purchasedItemUnitPrices[index+1]} onChange={(event) => this.handleUnitPriceInputChange(event, (index+1))} />
                            <button type="button" className='remove-item-input' onClick={() => this.handleRemovePurchasedItem(index+1)}><i class="fa-solid fa-minus"></i></button>
                            </div>
                        ))}
                        <button className="btn btn-success" style={{right:"0",marginTop:"10px"}} type="button" onClick={this.handleAddPurchasedItem}><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Another Item</button>
                        <div className='btn-inline' style={{marginBottom:'5px', marginTop:'15px'}}>
                            <div className='form-preview-container'>Item Type quantity<br/><span style={{color:"red",fontSize:"20px"}}>{itemTypeQty}</span></div> 
                            <div className='form-preview-container'>Total Item Quantity<br/><span style={{color:"red",fontSize:"20px"}}>{totalQty}</span></div>
                            <div  className='form-preview-container'>Total Cost<br/>LKR <span style={{color:"red",fontSize:"20px"}}>{total}</span></div>
                        </div>        
                    </div>
                </div>

                </div>

                <div className='form-main'>
                    <div style={{textAlign:"justify"}}>
                    <p style={{width:"100%"}}>Details that you entered are saved when 'Add' button is clicked. You can make changes &#40;update or delete&#41; after adding data.</p>
                    </div>
                    <div className='form-btn'>
                    <br/>
                    <a href={`/purchasing/display-purchases`}><button className="btn btn-primary" >View All Orders</button></a>&nbsp;&nbsp;&nbsp;
                    <button className="btn btn-warning" type='reset' >Reset</button>&nbsp;&nbsp;&nbsp;
                    <a onClick={this.handlePopUp} ><button className="btn btn-success"  onClick={this.onSubmit}>Add</button></a>
                    <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handlePopUp} className="popUp20 zoom-in">
                        <h2><span style={{color:'red'}}>{this.state.redAlert}</span>{this.state.popUpMsg}{this.state.itemTypeQty}</h2>
                        <a href={`/purchasing/add-purchase`}><button onClick={this.handlePopUp} className="btn btn-primary" >Add Another Purchase</button></a>&nbsp;&nbsp;&nbsp;
                        <a href={`/purchasing/display-purchases`}><button onClick={this.handlePopUp} className="btn btn-primary" >View All Other Purchases</button></a>&nbsp;&nbsp;&nbsp;
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