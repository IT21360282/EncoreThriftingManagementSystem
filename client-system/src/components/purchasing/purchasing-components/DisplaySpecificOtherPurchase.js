import React, { Component } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import DeleteOtherPurchase from './DeleteOtherPurchase'


export default function DisplaySpecificOtherPurchase(){
    const { id } = useParams()
    const purID = ""
    const purDigitID = ""
    const title = ""
    const section = ""
    const shop = ""
    return (
        <div>
            <DisplaySpecificOtherPurchaseBody id = {id}/>
            <div className='spec-btn-inline'>
                <div className='btn-inline'>
                    <a href={`/purchasing/update-purchase/${id}`}><button type="button" className="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i>&nbsp;&nbsp;Update</button></a>
                    <DeleteOtherPurchase purID = {purID} purDigitID = {purDigitID} title = {title} section = {section} shop = {shop} ID = {id} />
                    <a href={`/purchasing/display-purchases`}><button className="btn btn-primary" ><i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back</button></a> 
                    <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;&nbsp;Home</button></a> 
                </div> 
            </div>
            
        </div>
    )
}

class DisplaySpecificOtherPurchaseBody extends Component {
    constructor(props){
        super(props)
        this.state ={
            specificOtherPurchaseDetails: [],
            purchasedItems: [],
            purchasedItemQuantities: [],
            purchasedItemUnitPrices: [],
            id: "",
        }
    }
    
    componentDidMount(){
        const id = this.props.id
        this.setState({id})
        axios.get(`http://localhost:8000/purchasingGet/otherPurchase/get/${id}`).then(res =>{
          if(res.data.success){
            this.setState({
                specificOtherPurchaseDetails:res.data.existingDetails,
                purchasedItems:res.data.existingDetails.purchasedItems,
                purchasedItemQuantities:res.data.existingDetails.purchasedItemQuantities,                        
                purchasedItemUnitPrices:res.data.existingDetails.purchasedItemUnitPrices,                        
            })
          }
        })
    }
    
    render() {
        const cost = []
        for(let i = 0; i<this.state.purchasedItemQuantities.length; i++){
            cost.push(
            <tr>
                <td style={{textAlign:"center",padding:"10px"}}>{(parseInt(this.state.purchasedItemQuantities[i])*parseFloat(this.state.purchasedItemUnitPrices[i])).toFixed(2)}</td>
            </tr>
            ) 
        }

        const name = []
        for(let i = 0; i<this.state.purchasedItems.length; i++){
            let a = this.state.purchasedItems[i]
            if(a.length>13){
                a = this.state.purchasedItems[i].slice(0, 13)+"..."
            }
            name.push(
                <tr>
                    <td style={{padding:"10px"}} title={this.state.purchasedItems[i]}>{a}</td>
                </tr>
            )
        }
        return (
        <div className='Purchasing-others'>
            <h2 style={{marginTop:"70px"}}>Details of Purchase Under PurID <span style={{color:"#ff5520"}}>{this.state.specificOtherPurchaseDetails.purID}{this.state.specificOtherPurchaseDetails.purDigitID}</span></h2>
    
            <div className='gray-box' style={{padding:"20px",marginBottom:"10px"}}> 
                {this.state.specificOtherPurchaseDetails ? (
                    <div className='btn-inline' style={{paddingLeft:"10px",paddingRight:"10px"}}>
                        <div>
                            <table style={{borderCollapse:"collapse"}}>
                                <tr>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}><span style={{fontWeight:"bold"}}>PurID</span></td>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}>:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.specificOtherPurchaseDetails.purID}{this.state.specificOtherPurchaseDetails.purDigitID}</td>
                                </tr>
                                <tr>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}><span style={{fontWeight:"bold"}}>Title</span></td>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}>:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.specificOtherPurchaseDetails.title}</td>
                                </tr>
                                <tr>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}><span style={{fontWeight:"bold"}}>Purchased Date</span></td>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}>:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.specificOtherPurchaseDetails.purchasedDate}</td>
                                </tr>
                                <tr>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}><span style={{fontWeight:"bold"}}>Purchased For</span></td>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}>:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.specificOtherPurchaseDetails.purchasedSection}</td>
                                </tr>
                                <tr>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}><span style={{fontWeight:"bold"}}>Purchased From &#40;Shop&#41;</span></td>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}>:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.specificOtherPurchaseDetails.shop}</td>
                                </tr>
                                <tr>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}><span style={{fontWeight:"bold"}}>Payment Status</span></td>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}>:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.specificOtherPurchaseDetails.paymentStatus}</td>
                                </tr>
                                <tr>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}><span style={{fontWeight:"bold"}}>Total Qty</span></td>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520",textAlign:"left"}}>:&nbsp;&nbsp;&nbsp;&nbsp;{this.state.specificOtherPurchaseDetails.totalQty}</td>
                                </tr>
                                <tr>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px",textAlign:"left"}}><span style={{fontWeight:"bold"}}>Total Cost</span></td>
                                    <td style={{paddingBottom:"10px",paddingTop:"10px"}}>:&nbsp;&nbsp;&nbsp;&nbsp;LKR&nbsp;{parseFloat(this.state.specificOtherPurchaseDetails.totalCost).toFixed(2)}</td>
                                </tr>
                            </table> 
                        </div>
                        <div style={{width:"40%",marginRight:"20px"}}>
                            <table style={{borderCollapse:"collapse"}}>
                                <tr>
                                    <th style={{textAlign:"left",padding:"10px",borderBottom:"2px solid #ff5520",width:"55%"}}>Stock Items</th>
                                    <th style={{borderRight:"2px solid #ff5520",borderLeft:"2px solid #ff5520",borderBottom:"2px solid #ff5520", padding:"5px", width:"15%"}}>Quantity</th>
                                    <th style={{borderRight:"2px solid #ff5520",padding:"5px",borderBottom:"2px solid #ff5520", width:"15%"}}>Unit Price</th>
                                    <th style={{padding:"5px",borderBottom:"2px solid #ff5520", width:"15%"}}>Cost</th>
                                </tr>
                                
                                <tr>
                                    <td>  
                                        <table>
                                            {name}
                                        </table>
                                    </td>
                                    <td style={{borderRight:"2px solid #ff5520",borderLeft:"2px solid #ff5520"}}>
                                        <table>
                                            {this.state.purchasedItemQuantities.map((item, index) => (
                                                <tr>
                                                    <td style={{textAlign:"center",padding:"10px"}}>{item}</td>
                                                </tr>
                                            ))}
                                        </table>
                                    </td>
                                    <td style={{borderRight:"2px solid #ff5520"}}>
                                        <table>
                                            {this.state.purchasedItemUnitPrices.map((item, index) => (
                                                <tr>
                                                    <td style={{textAlign:"center",padding:"10px"}}>{parseFloat(item).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </table>
                                    </td>
                                    <td>
                                        <table>
                                            {cost}
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                ): (
                    <p>Loading...</p>
                )}

            </div>
        </div>        
        )
    }
}
