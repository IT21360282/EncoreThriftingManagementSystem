import React, { Component } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import CancelStockOrder from './CancelStockOrder'
import UpReceiveStockOrder from './UpReceiveStockOrder'
import UpConfirmStockOrder from './UpConfirmStockOrder'
import UpdateStockOrder from './UpdateStockOrder'
import ChangeStockOrder from './ChangeStockOrder'
import DeleteStockOrder from './DeleteStockOrder'

export default function DisplaySpecificStockOrders(){
    const { id } = useParams()
    return (
        <div>
            <DisplaySpecificStockOrdersBody id = {id}/>
            <div className='spec-btn-inline' style={{marginTop:"20px", width:"70%"}}>
                <div className='btn-inline' >
                    <UpReceiveStockOrder ID = {id}/>
                    <UpConfirmStockOrder ID = {id}/>
                    <ChangeStockOrder ID = {id}/>
                    <UpdateStockOrder ID = {id}/>
                    <CancelStockOrder ID = {id}/>
                    <DeleteStockOrder ID = {id} />
                    <a href={`/purchasing/display-orders`}><button className="btn btn-primary" ><i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back</button></a> 
                    <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;&nbsp;Home</button></a> 
                </div>
            </div>
        </div>
    )
}

class DisplaySpecificStockOrdersBody extends Component {
    constructor(props){
        super(props)
        this.state ={
            specificStockOrderDetails: [],
            stockItems: [],
            stockItemsQty: [],
            id: "",
            orderStatus: "",
        }
    }
    
    componentDidMount(){
        const id = this.props.id
        this.setState({id})
        axios.get(`http://localhost:8000/purchasingGet/stockOrder/get/${id}`).then(res =>{
          if(res.data.success){
            this.setState({
                specificStockOrderDetails:res.data.existingDetails,
                stockItems:res.data.existingDetails.stockItems,
                stockItemsQty:res.data.existingDetails.stockItemsQty,             
                orderStatus:res.data.existingDetails.orderStatus,             
            })
          }
        })
    }
    
    render() {
        return (
        <div className='Purchasing-others'>
            <h2 style={{marginTop:"70px"}}>Details of Stock Order Under PurID <span style={{color:"#ff5520"}}>{this.state.specificStockOrderDetails.purID}{this.state.specificStockOrderDetails.purDigitID}</span></h2>
    
            <div className='gray-box' style={{padding:"20px",marginBottom:"20px",overflowY:"scroll",height:"50vh"}}> 
                {this.state.specificStockOrderDetails ? (
                    <div style={{marginLeft:"auto", marginRight:"auto",width:"80%"}}>
                        <div className='btn-inline'>
                            <div>
                                <table style={{borderCollapse:"collapse"}}>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}><span style={{fontWeight:"bold"}}>PurID</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.purID}{this.state.specificStockOrderDetails.purDigitID}<br/></td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}><span style={{fontWeight:"bold"}}>Title</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.title}<br/></td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}><span style={{fontWeight:"bold"}}>Purchased Date</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.placedDate}<br/></td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}><span style={{fontWeight:"bold"}}>Expected Date</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.expectedDate}<br/></td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}><span style={{fontWeight:"bold"}}>Order Status</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.orderStatus}<br/></td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px"}}><span style={{fontWeight:"bold"}}>Payment Status</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.paymentStatus}<br/></td>
                                    </tr>
                                </table>
                            </div>
                            <div>
                                <table style={{borderCollapse:"collapse"}}>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}><span style={{fontWeight:"bold"}}>Confirmed Date</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.confirmedDate}<br/></td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}><span style={{fontWeight:"bold"}}>Recieved Date</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.receivedDate}<br/></td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}><span style={{fontWeight:"bold"}}>Total Qty</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.totalQty}<br/></td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}><span style={{fontWeight:"bold"}}>Total Cost</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px",borderBottom:"1px solid #ff5520"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.totalCost}<br/></td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px"}}><span style={{fontWeight:"bold"}}>Supplier</span></td>
                                        <td style={{paddingBottom:"10px",paddingTop:"10px"}}>&nbsp;&nbsp;:&nbsp;&nbsp;{this.state.specificStockOrderDetails.supplier}<br/></td>
                                    </tr>
                                </table> 
                            </div>     
                        </div>
                        
                        <div style={{marginTop:"20px",marginLeft:"auto", marginRight:"auto", width:"50%"}}>
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
                                            {this.state.stockItems.map((item, index) => (
                                                <span>{item}<br/></span>
                                            ))}
                                        </table>
                                    </td>
                                    <td style={{borderRight:"2px solid #ff5520",borderLeft:"2px solid #ff5520"}}>
                                        <table>
                                            {this.state.stockItemsQty.map((item, index) => (
                                                <span>{item}<br/></span>
                                            ))}
                                        </table>
                                    </td>
                                    <td style={{borderRight:"2px solid #ff5520"}}>
                                        <table>
                                            
                                        </table>
                                    </td>
                                    <td>
                                        <table>
                                            
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
