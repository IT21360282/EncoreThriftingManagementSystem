import React, { Component } from 'react'
import ReactModal from 'react-modal'
import axios from 'axios'

export default class UpdateStockOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            isOpenFinal: false,
            ID: props.ID,
            orderStatus: "",
            purDigitID: "",
            title: "",
            supplier: "",
            paymentStatus: "",
            shippingFee: "",
            totalCost: "",
            totalQty: "",
            isUpdateBtnDisabled: false,
            popUpMsg:"Order Status is Updated as 'Pending' Successfully!",
            redAlert:"",
            shippingFeeErr:"",
            stockItems: [],
            stockItemsQty: [],
            stockItemsUnitPrice: [],
            x: null,
        }

        this.handlePopUp = this.handlePopUp.bind(this)
        this.handleFinalPopUp = this.handleFinalPopUp.bind(this)
        this.handleClosePopUp = this.handleClosePopUp.bind(this)
        this.handleShippingFeeInputChange = this.handleShippingFeeInputChange.bind(this)
        this.handleRemovePurchasedItem = this.handleRemovePurchasedItem.bind(this)
        
    }

    componentDidMount(){
        const id = this.state.ID
        axios.get(`http://localhost:8000/purchasingGet/stockOrder/get/${id}`).then(res =>{
            this.setState({
                orderStatus:res.data.existingDetails.orderStatus,
                purDigitID:res.data.existingDetails.purDigitID,
                title:res.data.existingDetails.title,
                supplier:res.data.existingDetails.supplier,
                paymentStatus:res.data.existingDetails.paymentStatus,
                totalCost:res.data.existingDetails.totalCost,
                shippingFee:res.data.existingDetails.shippingFee,
                totalQty:res.data.existingDetails.totalQty,
                stockItems:res.data.existingDetails.stockItems,
                stockItemsQty:res.data.existingDetails.stockItemsQty,
                stockItemsUnitPrice:res.data.existingDetails.stockItemsUnitPrice,
                x:res.data.existingDetails.stockItems.length,
                
            }, () => {
                this.checkIsConfirmed()
            })
            
        }).catch(err => {
            console.error(err)
        })
    }

    checkIsConfirmed(){
        const orderStatus = this.state.orderStatus
        let isUpdateBtnDisabled = this.state.isUpdateBtnDisabled
        if(orderStatus == "Confirmation Pending"){
            isUpdateBtnDisabled = true
        }
        if(orderStatus == "Received"){
            isUpdateBtnDisabled = true
        }
        if(orderStatus == "Canceled"){
            isUpdateBtnDisabled = true
        }
        
        this.setState({isUpdateBtnDisabled})
    }

    handlePopUp(){
        this.setState({isOpen:true})
    }

    handleFinalPopUp(){
        this.setState({isOpenFinal:true})
        this.setState({isOpen:false})
    }

    handleClosePopUp(){
        this.setState({isOpenFinal:false})
        this.setState({isOpen:false})
    }

    handleInputChange = (e) => {
        const {name,value} = e.target
        this.setState({
          ...this.state, [name]:value
        })
    }

    handleShippingFeeInputChange = (e) => {
        const value = e.target.value
        
        if (this.state.shippingFee==""){
            this.setState({shippingFeeErr:"Shipping Fee is Required"})
            this.setState({shippingFee:value})
        }
        else{
            this.setState({shippingFeeErr:""})
            this.setState({shippingFee:value})
        }
    }

    handleItemInputChange = (e, i) => {
        const {name,value} =e.target
        const stockItems = [...this.state.stockItems]
        stockItems[i] = value
        this.setState({stockItems})
    }
      
    handleQtyInputChange = (e, i) => {
        const {name,value} =e.target
        const stockItemsQty = [...this.state.stockItemsQty]
        stockItemsQty[i] = value
        this.setState({stockItemsQty})
    }
    
    handleUnitPriceInputChange = (e, i) => {
        const {name,value} =e.target
        const stockItemsUnitPrice = [...this.state.stockItemsUnitPrice]
        stockItemsUnitPrice[i] = value
        this.setState({stockItemsUnitPrice})
    }

    handleRemovePurchasedItem = (i) => {
        const stockItems = [...this.state.stockItems]
        const stockItemsQty = [...this.state.stockItemsQty]
        const stockItemsUnitPrice = [...this.state.stockItemsUnitPrice]
        const x = this.state.x
        this.setState({x:x-1})
        stockItems.splice((i),1)
        stockItemsQty.splice((i),1)
        stockItemsUnitPrice.splice((i),1)
        this.setState({ stockItems })
        this.setState({ stockItemsQty })
        this.setState({ stockItemsUnitPrice })
    }

    onSubmit = (e) =>{
        e.preventDefault()

        const id = this.state.ID
        const { shippingFee, paymentStatus, stockItems, stockItemsQty, stockItemsUnitPrice } = this.state
        let totalQty = 0
        for(let i = 0; i < this.state.stockItemsQty.length; i++){
            totalQty = totalQty + parseInt(this.state.stockItemsQty[i])
        }

        let totalCost = 0
        for(let i = 0; i < this.state.stockItemsUnitPrice.length; i++){
            let qty = parseInt(this.state.stockItemsQty[i])
            totalCost = totalCost + (parseFloat(this.state.stockItemsUnitPrice[i]))*qty
        }
        const data = {  
            shippingFee:shippingFee,
            paymentStatus:paymentStatus,
            stockItems:stockItems,
            stockItemsQty:stockItemsQty,
            stockItemsUnitPrice:stockItemsUnitPrice,
            totalQty:totalQty,
            totalCost:totalCost
        }

        axios.put(`http://localhost:8000/purchasingPut/stockOrder/put/${id}`,data).then((res)=>{
            console.log("successfully updated")
        }).catch(error=>{
            console.error("error occurred")
            let popUpMsg = this.state.popUpMsg
            let redAlert = this.state.redAlert
            popUpMsg = "Order Status is not Updated."
            redAlert = "Something Wrong! "
            this.setState({popUpMsg})
            this.setState({redAlert})
        })
    }

    render() {
        const itemTypeQty =this.state.x
        let totalQty = 0
        for(let i = 0; i < this.state.stockItemsQty.length; i++){
            totalQty = totalQty + parseInt(this.state.stockItemsQty[i])
        }

        let totalCost = 0
        for(let i = 0; i < this.state.stockItemsUnitPrice.length; i++){
            let qty = parseInt(this.state.stockItemsQty[i])
            totalCost = totalCost + (parseFloat(this.state.stockItemsUnitPrice[i]))*qty
        }

        const x=this.state.x
        const existingItems = []
        for(let i = 1; i < (x);i++){
            existingItems.push(
                <div key={i} style={{marginTop:"10px"}}>
                    <input type="text" className='add-item-input add-input' value={this.state.stockItems[i]} onChange={(event) => this.handleItemInputChange(event, (i))} />
                    <input type="text" className='add-item-qty-input add-input' value={this.state.stockItemsQty[i]} onChange={(event) => this.handleQtyInputChange(event, (i))} />
                    <input type="text" className='add-item-price-input add-input' value={this.state.stockItemsUnitPrice[i]} onChange={(event) => this.handleUnitPriceInputChange(event, (i))} />
                    <button type="button" className='remove-item-input' onClick={() => this.handleRemovePurchasedItem(i)}><i class="fa-solid fa-minus"></i></button>
                </div>
            )
        }
        return (
        <div>
            <a onClick={this.handlePopUp}><button className="btn btn-warning"  disabled={this.state.isUpdateBtnDisabled}><i class="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;Update</button></a>
            <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handleClosePopUp} className="popUp90 zoom-in">
                <h2 >Update Stock Order After Confirming Under PurID <span style={{color:"#ff5520"}}>PS{this.state.purDigitID}</span></h2>

                <label>Title of Order:</label>
                <input type='text' className='form-input-purchasing' style={{marginBottom:"0px", color:"#808080"}} name='title' placeholder='Title' value={this.state.title} readOnly/><br/>
                <div style={{marginBottom:"15px"}}>
                    <span style={{color:"red",fontWeight:"bolder", fontSize:"20px"}}>* </span>You Cannot Update Title of Stock Order After Confirming It.
                </div>
                <label>Payment:</label>
                <select className='form-select-purchasing' name='paymentStatus' value={this.state.paymentStatus} onChange={this.handleInputChange}>
                    <option>Select One</option>
                    <option>Paid</option>
                    <option>Payment Pending</option>
                    <option>Send to Financial Manager</option>
                </select><br/>
                <label>Shipping Fee:</label>
                <input type='text' className='form-input-purchasing' style={{marginBottom:"0px"}} name='shippingFee' placeholder='Shipping Fee (LKR)' value={this.state.shippingFee} onChange={this.handleShippingFeeInputChange}/><br/>
                <div style={{marginBottom:"15px"}}>
                    <div style={{color:"red"}}>{this.state.shippingFeeErr}</div>
                    <span style={{color:"red",fontWeight:"bolder", fontSize:"20px"}}>* </span>If This Order have No Shipping Fee Input '0'.
                </div>

                <div >
                    <label>Ordered Stock Items:</label><br/>
                    <div className='div-frame add-stock-input' >
                    
                        <div className='btn-inline'>
                            <div className='add-item-input'>Item Name</div>
                            <div className='add-item-qty-input'>Qty</div>
                            <div className='add-item-price-input'>Unit Price</div>
                            </div>
                        <div key="0" style={{marginTop:"10px"}}>
                            <input type="text" className='add-item-input add-input' value={this.state.stockItems[0]} onChange={(event) => this.handleItemInputChange(event, 0)} />
                            <input type="text" className='add-item-qty-input add-input' value={this.state.stockItemsQty[0]} onChange={(event) => this.handleQtyInputChange(event, 0)} />
                            <input type="text" className='add-item-price-input add-input' style={{width:"16.8%",borderTopRightRadius:"8px",borderBottomRightRadius:"8px"}} value={this.state.stockItemsUnitPrice[0]} onChange={(event) => this.handleUnitPriceInputChange(event, 0)} />
                        </div>   

                        {existingItems}

                        
                        
                        <button className="btn btn-success" style={{right:"0",marginTop:"10px"}} type="button" disabled><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Another Item</button>
                        <div className='btn-inline' style={{marginBottom:'5px', marginTop:'15px'}}>
                            <div className='form-preview-container'>Item Type quantity<br/><span style={{color:"red",fontSize:"20px"}}>{itemTypeQty}</span></div> 
                            <div className='form-preview-container'>Total Item Quantity<br/><span style={{color:"red",fontSize:"20px"}}>{totalQty}</span></div>
                            <div  className='form-preview-container'>Total Cost<br/>LKR <span style={{color:"red",fontSize:"20px"}}>{totalCost}</span></div>
                        </div>
                    </div>
                </div>                


                <div className='spec-btn-inline' style={{marginTop:"20px",marginBottom:"20px", width:"30%"}}>
                    <div className='btn-inline' >  
                        <button onClick={this.handleClosePopUp} className="btn btn-primary" >Cancel Updation</button>&nbsp;&nbsp;&nbsp;
                        <a onClick={this.handleFinalPopUp}><button onClick={this.onSubmit}  className="btn btn-warning" >Update</button></a>
                    </div>
                </div>
                
            </ReactModal>
            <ReactModal isOpen={this.state.isOpenFinal} onRequestClose={this.handleFinalPopUp} className="popUp20 zoom-in">
                <div>
                    <h2><span style={{color:"red"}}>{this.state.redAlert}</span>{this.state.popUpMsg}</h2>
                   
                    <a href={`/purchasing/${this.state.ID}`}><button className="btn btn-primary" >OK</button></a>&nbsp;&nbsp;&nbsp;
                    <a href={`/purchasing/display-orders`}><button className="btn btn-primary" >View All Orders</button></a>&nbsp;&nbsp;&nbsp;
                    <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;Home</button></a>
                </div>
            </ReactModal>
        </div>
        )
    }
}
