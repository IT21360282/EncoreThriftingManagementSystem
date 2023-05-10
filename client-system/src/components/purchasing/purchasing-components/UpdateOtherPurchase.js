import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactModal from 'react-modal'

export default function UpdateOtherPurchase() {
    const {id} = useParams()
    return (
        <div>
            <UpdateOtherPurchaseBody id = {id}/>
        </div>
    )
}

class UpdateOtherPurchaseBody extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            purID: "",
            purDigitID: "",
            purchasedItemsInput: [],
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
            otherPurchaseDetails: [],
            isOpen: false,
            popUpMsg: "",
            redAlert: "",
            x: null,
        }
        this.handleInputValueChange = this.handleInputValueChange.bind(this)
        this.onSubmitUpdate = this.onSubmitUpdate.bind(this)
        this.handlePopUpOpen = this.handlePopUpOpen.bind(this)
        this.handlePopUpClose = this.handlePopUpClose.bind(this)
    }

    componentDidMount(){
        axios.get(`http://localhost:8000/purchasingGet/otherPurchase/get/${this.state.id}`).then(res => {
            if(res.data.success){
                this.setState({
                    otherPurchaseDetails: res.data.existingDetails,
                    purID: res.data.existingDetails.purID,
                    purDigitID: res.data.existingDetails.purDigitID,
                    title: res.data.existingDetails.title,
                    shop: res.data.existingDetails.shop,
                    purchasedDate: res.data.existingDetails.purchasedDate,
                    purchasedSection: res.data.existingDetails.purchasedSection,
                    paymentStatus: res.data.existingDetails.paymentStatus,
                    purchasedItems: res.data.existingDetails.purchasedItems,
                    purchasedItemQuantities: res.data.existingDetails.purchasedItemQuantities,
                    purchasedItemUnitPrices: res.data.existingDetails.purchasedItemUnitPrices,
                    x:res.data.existingDetails.purchasedItems.length
                })
            }
        }).catch((err) => {
            console.error("error: ",err)
        })
    }

    handleInputValueChange = (e) => {
        const {value,name} = e.target
        this.setState({
            ...this.state, [name]:value
        })
    }

    handlePopUpOpen(){
        this.setState({isOpen:true})
    }
    
    handlePopUpClose(){
        this.setState({isOpen:false})
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
        purchasedItemsInput.splice((i), 1)
        purchasedItems.splice((i+1),1)
        purchasedItemQuantities.splice((i+1),1)
        purchasedItemUnitPrices.splice((i+1),1)
        this.setState({ purchasedItemsInput })
        this.setState({ purchasedItems })
        this.setState({ purchasedItemQuantities })
        this.setState({ purchasedItemUnitPrices })
    }

    handleRemoveExistingOtherPurchases = (index) => {
        const x = this.state.x
        const purchasedItems = [...this.state.purchasedItems]
        const purchasedItemQuantities = [...this.state.purchasedItemQuantities]
        const purchasedItemUnitPrices = [...this.state.purchasedItemUnitPrices]
        
        purchasedItems.splice((index),1)
        purchasedItemQuantities.splice((index),1)
        purchasedItemUnitPrices.splice((index),1)
        this.setState({ x:x-1 })
        this.setState({ purchasedItems })
        this.setState({ purchasedItemQuantities })
        this.setState({ purchasedItemUnitPrices })
      }

    onSubmitUpdate(){
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
        const {title, purchasedDate, purchasedSection, paymentStatus, shop, purchasedItems, purchasedItemQuantities, purchasedItemUnitPrices} = this.state
        const data = {
            title:title,
            purchasedDate:purchasedDate,
            purchasedSection:purchasedSection,
            paymentStatus:paymentStatus,
            shop:shop,
            totalCost:totalCost,
            totalQty:totalQty,
            purchasedItems:purchasedItems,
            purchasedItemQuantities:purchasedItemQuantities,
            purchasedItemUnitPrices:purchasedItemUnitPrices,
        }

        axios.put(`http://localhost:8000/purchasingPut/otherPurchase/put/${this.state.id}`, data).then(res => {
            console.log("Update Successfully!")
            this.setState({popUpMsg:"Updated Successfully!"})
        }).catch((err) => {
            this.setState({popUpMsg:"Error Occurred"})
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
        const x = this.state.x
        const existingItems = []
        for(let i = 1; i < (x);i++){
            existingItems.push(
                <div key={i} style={{marginTop:"10px"}}>
                    <input type="text" className='add-item-input add-input' value={this.state.purchasedItems[i]} onChange={(event) => this.handleItemInputChange(event, (i))} />
                    <input type="text" className='add-item-qty-input add-input' value={this.state.purchasedItemQuantities[i]} onChange={(event) => this.handleQtyInputChange(event, (i))} />
                    <input type="text" className='add-item-price-input add-input' value={this.state.purchasedItemUnitPrices[i]} onChange={(event) => this.handleUnitPriceInputChange(event, (i))} />
                    <button type="button" className='remove-item-input' onClick={() => this.handleRemoveExistingOtherPurchases(i)}><i class="fa-solid fa-minus"></i></button>
                </div>
            )
        }

        

        return (
            <div className='Purchasing-others'>
                <h2 style={{marginTop:"70px"}}>Update Purchase's Details of Purchase Under PurID <span style={{color:"#ff5520"}}>{this.state.purID}{this.state.purDigitID}</span></h2>
                <div className='gray-box' style={{overflowY:"scroll",height:"64vh"}}> 
                <div className='form-main'>
                <div>
                    <br/>
                    <label>Title of Purchase:</label>
                    <input type='text' className='form-input-purchasing' name='title' placeholder='Title' value={this.state.title} onChange={this.handleInputValueChange}/><br/>
                    <label>Shop Name:</label>
                    <input type='text' className='form-input-purchasing' name='shop' placeholder='Purchased From' value={this.state.shop} onChange={this.handleInputValueChange}/><br/>
                    
                    <label>Purchased Date:</label>
                    <input type='date' className='form-input-purchasing' name='purchasedDate' placeholder='' value={this.state.purchasedDate} onChange={this.handleInputValueChange}/>
                    <label>For Which Section:</label>
                    <select className='form-select-purchasing' name='purchasedSection' value={this.state.purchasedSection} onChange={this.handleInputValueChange}>
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
                    <select className='form-select-purchasing' name='paymentStatus' value={this.state.paymentStatus} onChange={this.handleInputValueChange}>
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

                        {existingItems}

                        {purchasedItemsInput.map((input,index) => (
                            <div key={index+x} style={{marginTop:"10px"}}>
                            <input type="text" className='add-item-input add-input' value={this.state.purchasedItems[index+x]} onChange={(event) => this.handleItemInputChange(event, (index+x))} />
                            <input type="text" className='add-item-qty-input add-input' value={this.state.purchasedItemQuantities[index+x]} onChange={(event) => this.handleQtyInputChange(event, (index+x))} />
                            <input type="text" className='add-item-price-input add-input' value={this.state.purchasedItemUnitPrices[index+x]} onChange={(event) => this.handleUnitPriceInputChange(event, (index+x))} />
                            <button type="button" className='remove-item-input' onClick={() => this.handleRemovePurchasedItem(index)}><i class="fa-solid fa-minus"></i></button>
                            </div>
                        ))}
                   
                        <button className="btn btn-success" style={{right:"0",marginTop:"10px"}} type="button" onClick={this.handleAddPurchasedItem}><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Another Item</button>
                        <div className='btn-inline' style={{marginBottom:'5px', marginTop:'15px'}}>
                            <div className='form-preview-container'>Item Type quantity<br/><span style={{color:"red",fontSize:"20px"}}>{itemTypeQty}</span></div> 
                            <div className='form-preview-container'>Total Item Quantity<br/><span style={{color:"red",fontSize:"20px"}}>{totalQty}</span></div>
                            <div  className='form-preview-container'>Total Cost<br/>LKR <span style={{color:"red",fontSize:"20px"}}>{totalCost}</span></div>
                        </div>        
                    </div>
                </div>

                {this.state.popUpMsg}
                </div>
                    <div style={{marginLeft:"auto", marginRight:"auto", width:"5%", marginTop:"10px", marginBottom:"20px"}}>
                        <a onClick={this.handlePopUpOpen}><button className='btn btn-success' onClick={this.onSubmitUpdate}>Update</button></a>
                        <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handlePopUpClose} className="popUp20 zoom-in">
                        <div>
                            <h2><span style={{color:"red"}}>{this.state.redAlert}</span>{this.state.popUpMsg}</h2>
                            <a href={`/purchasing/spec-purchase/${this.state.id}`}><button className="btn btn-primary" >OK</button></a>&nbsp;&nbsp;&nbsp;
                            <a href={`/purchasing/display-purchases`}><button className="btn btn-primary" >View All Other Purchases</button></a>&nbsp;&nbsp;&nbsp;
                            <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;Home</button></a>
                        </div>
                        </ReactModal>
                    </div>
                </div>
                
            </div>
        )
    }
}
