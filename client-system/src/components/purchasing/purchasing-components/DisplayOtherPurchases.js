import axios from 'axios'
import React, { Component } from 'react'
import DeleteOtherPurchase from './DeleteOtherPurchase'
import FilterOtherPurchases from './FilterOtherPurchases'

export default class DisplayOtherPurchases extends Component {
    constructor(props){
        super(props)
        this.state = {
            otherPurchaseDetails: [],
            isErrorGetDetails: false,
            searchQuery: "",
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8000/purchasingGet/otherPurchase/getSorted").then(res => {
            if(res.data.success){
                this.setState({
                    otherPurchaseDetails: res.data.existingDetails
                })
            }
            
        })
    }

    handleSearchInput = (e) => {
        const {name, value} = e.target
        this.setState({
            ...this.state, [name]:value
        })
    }

    render() {
        return (
            <div className='Purchasing-others'>
                <h2 style={{marginTop:"70px"}}>Display Details of All Other Purchases</h2>
                <div className='btn-inline'>
                    <div><a href={`/purchasing/search-purchase/search?searchQuery=${this.state.searchQuery}`}><button type='submit' className='search'><i class="fa-solid fa-magnifying-glass"></i></button></a>
                    <input className='search' style={{width:"500px"}} name='searchQuery' placeholder='Search Details By PurchaseID or Title or Shop Name' value={this.state.searchQuery} onChange={this.handleSearchInput} ></input></div>
                    <FilterOtherPurchases/>
                    <a href='/purchasing/display-purchases'><button className='btn-inline'>Clear Filter</button></a>
                </div>
                <br/>
                <br/>
        
                <div className='div-frame'>
                    <table className='table-home' >
                        <thead>
                            <tr>
                                <th scope="col" className='table-home' style={{borderTopLeftRadius:"10px",borderBottom:"2px solid #ff5520"}}>PurID</th>
                                <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Title</th>
                                <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Purchased Date</th>
                                <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Purchased For</th>
                                <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Total Cost</th>
                                <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Total Qty</th>
                                <th scope="col" className='table-home' style={{borderBottom:"2px solid #ff5520"}}>Shop</th>
                                <th scope="col" className='table-home' style={{border:"none",borderTopRightRadius:"10px",borderBottom:"2px solid #ff5520",width:"230px"}}>Options</th>
                            </tr>
                        </thead>
                        <tbody scope="raw" >      
                            {this.state.otherPurchaseDetails.map((results,index)=>(
                            <tr>
                                <td className='table-home'>{results.purID}{results.purDigitID}</td>
                                <td className='table-home' title={results.title}>{results.title}</td>
                                <td className='table-home'>{results.purchasedDate}</td>
                                <td className='table-home'>{results.purchasedSection}</td>
                                <td className='table-home'>{results.totalCost}</td>
                                <td className='table-home'>{results.totalQty}</td>
                                <td className='table-home'>{results.shop}</td>
                                <td className='table-home' style={{padding:"5px",border:"none"}}>
                                    <div className='btn-inline-table'>
                                        <a href={`/purchasing/update-purchase/${results._id}`}><button type="button" className="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button></a>
                                        <DeleteOtherPurchase purID = {results.purID} purDigitID = {results.purDigitID} title = {results.title} section = {results.purchasedSection} shop = {results.shop} ID = {results._id} />
                                        <a href={`/purchasing/spec-purchase/${results._id}`}><button type="button" className="btn btn-primary"><i class="fa fa-circle-ellipsis"></i> More</button></a>     
                                    </div>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='spec-btn-inline' style={{marginTop:"20px", width:"18%"}}>
                    <div className='btn-inline'>
                        <a href={`/purchasing/display-purchases`}><button className="btn btn-primary" ><i class="fa-solid fa-rotate-right"></i>&nbsp;&nbsp;Refresh</button></a> 
                        <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;&nbsp;Home</button></a> 
                    </div> 
                </div>
            </div>
        )
    }
}
