import React , { Component } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function UpdateOtherPurchase() {
    const { id } = useParams()
     return (
        <div className='Purchasing-others'>
            <UpdateOtherPurchaseBody id = {id}/>
        </div>
    )
}

class UpdateOtherPurchaseBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            purchasedItemsInput: [],
            id: props.id,
            specificPurchaseDetails: [],
            title: "",
            shop: "",
            purchasedDate: "",
            purchasedSection: "",
            paymentStatus: "",
            purchasedItems: "",
            purchasedItemQuantities: "",
            purchasedItemUnitPrices: "",
            
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:8000/purchasingGet/otherPurchase/get/${this.state.id}`).then(res => {
            this.setState({
                specificPurchaseDetails: res.data.existingDetails,
                title: res.data.existingDetails.title,
                shop: res.data.existingDetails.shop,
                purchasedDate: res.data.existingDetails.purchasedDate,
                purchasedSection: res.data.existingDetails.purchasedSection,
                paymentStatus: res.data.existingDetails.paymentStatus,
                purchasedItems: res.data.existingDetails.purchasedItems,
                purchasedItemQuantities: res.data.existingDetails.purchasedItemQuantities,
                purchasedItemUnitPrices: res.data.existingDetails.purchasedItemUnitPrices,

            })
        })
    }

    handleOtherInputChange = (e) => {
        const {name,value} = e.target
        this.setState({
          ...this.state, [name]:value
        })
    }
    
    onSubmit = (e) =>{
        e.preventDefault()
       
        const id = this.state.id
        
        const {title,purchasedDate,purchasedSection,totalCost,totalQty,paymentStatus,shop,purchasedItems,purchasedItemQuantities,purchasedItemUnitPrices} = this.state
        const data = {
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
    
        axios.post(`http://localhost:8000/purchasingPut/otherPurchase/put/${id}`,data).then((res)=>{
          console.log("Successfully Updated")
        }).catch(error=>{
          console.error("error orccured")
        })
    }

    render() {
        


        return (
            <div>
                <h2 style={{marginTop:"70px"}}>Update Purchase's Details Under PurID <span style={{color:"#ff5520"}}>{this.state.specificPurchaseDetails.purID}{this.state.specificPurchaseDetails.purDigitID}</span></h2>
                <div className='gray-box'> 
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
                                <option>Send to Financial Manager</option>
                            </select><br/>
                            
                        </div>
                        
                        <a onClick={`/purchasing/update-purchase/${this.state.id}`}><button className="btn btn-success"  onClick={this.onSubmit}>Update</button></a>
                    </div>
                </div>
            </div>
        )
    }
}

