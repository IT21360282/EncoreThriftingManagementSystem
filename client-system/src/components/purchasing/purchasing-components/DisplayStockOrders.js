import React, { Component } from 'react'
import axios from 'axios'
import CancelStockOrder from './CancelStockOrder'

export default class DisplayStockOrders extends Component {
    constructor(props){
        super(props)
        this.state ={
          stockOrderDetails: []
        }
    }
    
    componentDidMount(){
        axios.get("http://localhost:8000/purchasingGet/stockOrder/getSorted").then(res =>{
          if(res.data.success){
            this.setState({
              stockOrderDetails:res.data.existingDetails
            })
          }
        })
    }

    render() {
        return (
        <div className='Purchasing-others'>
            <h2 style={{marginTop:"70px"}}>Display Details of All Stock Orders</h2>
            <div className='btn-inline'>
                <div><button type='submit' className='search'><i class="fa-solid fa-magnifying-glass"></i></button><input className='search' style={{width:"500px"}} placeholder='Search Details Here'></input></div>
                <a><button className='btn-inline'>Add Filter</button></a>
                <a><button className='btn-inline'>Clear Filter</button></a>
            </div>
            <br/>
            <br/>
    
            <div className='div-frame'>
                <table className='table-home' >
                    <thead>
                        <tr>
                            <th scope="col" className='table-home' style={{borderTopLeftRadius:"10px",borderBottom:"2px solid #ff5520"}}>PurID</th>
                            <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Title</th>
                            <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Placed Date</th>
                            <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Recieved Date</th>
                            <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Total Cost</th>
                            <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Total Qty</th>
                            <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Supplier</th>
                            <th scope="col" className='table-home' style={{border:"none",borderTopRightRadius:"10px",borderBottom:"2px solid #ff5520",width:"240px"}}>Options</th>
                        </tr>
                    </thead>
                    <tbody scope="raw" >      
                        {this.state.stockOrderDetails.map((results,index)=>(
                        <tr>
                            <td className='table-home'>{results.purID}{results.purDigitID}</td>
                            <td className='table-home' title={results.title}>{results.title}</td>
                            <td className='table-home'>{results.placedDate}</td>
                            <td className='table-home'>{results.receivedDate}</td>
                            <td className='table-home'>{results.totalCost}</td>
                            <td className='table-home'>{results.totalQty}</td>
                            <td className='table-home'>{results.supplier}</td>
                            <td className='table-home' style={{padding:"5px",border:"none"}}>
                                <div className='btn-inline-table'>
                                    <button type="button" className="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button>
                                    <CancelStockOrder digitID={results.purDigitID} PID={results.purID} orderTitel={results.title} supplier={results.supplier} payment={results.paymentStatus} ID={results._id} />
                                    <a href={`/purchasing/${results._id}`}><button type="button" className="btn btn-primary"><i class="fa fa-circle-ellipsis"></i> More</button></a>
                                     
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>        
        )
    }
}
