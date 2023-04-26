import axios from 'axios'
import React, { Component } from 'react'
import DeleteOtherPurchase from './DeleteOtherPurchase'
import { useLocation } from 'react-router-dom'
import FilterOtherPurchases from './FilterOtherPurchases'

export default function SearchOtherPurchases() {
    const searchQuery = new URLSearchParams(useLocation().search)
    const purchaseQuery = searchQuery.get('searchQuery')
  return (
    <SearchOtherPurchasesBody purchaseQuery={purchaseQuery} />
  )
}


class SearchOtherPurchasesBody extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchedOtherPurchaseDetails: [],
            isErrorGetDetails: false,
            purchaseQuery: props.purchaseQuery,
            searchQuery: "",
        }
    }

    search(){
        this.setState({searchQuery:this.props.purchaseQuery})
        axios.get(`http://localhost:8000/purchasingGet/otherPurchase/search?q=${this.state.purchaseQuery}`).then(res => {
            if(res.data.success){
                this.setState({
                    searchedOtherPurchaseDetails: res.data.searchedDetails
                })
            }
            
        })
    }

    handleSearchInput = (e) => {
        const searchQuery = e.target.value
        this.setState({ searchQuery }, () => {
            this.search()
        })
    }

    render() {
        return (
            <div className='Purchasing-others'>
                <h2 style={{marginTop:"70px"}}>Display Details of Other Purchases Related to <span style={{color:"#ff5520"}}>"{this.state.searchQuery}"</span> </h2>
                <div className='btn-inline'>
                    <div><a href={`/purchasing/search-purchase/search?searchQuery=${this.state.searchQuery}`}><button type='submit' className='search'><i class="fa-solid fa-magnifying-glass"></i></button></a>
                    <input className='search' style={{width:"500px"}} name='searchQuery' placeholder='Search Details By PurchaseID or Title or Shop Name' value={this.state.searchQuery} onChange={this.handleSearchInput} ></input></div>
                    <FilterOtherPurchases/>
                    <a href='/purchasing/display-purchases'><button className='btn-inline'>Clear Filter</button></a>
                </div>
                <br/>
                <br/>
        
                <div className='div-frame'>
                    <table className='content-table' >
                        <thead>
                            <tr>
                                <th scope="col" style={{borderTopLeftRadius:"7px",borderBottom:"2px solid #ff5520"}}>PurID</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520"}}>Title</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520"}}>Purchased Date</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520"}}>Purchased For</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520"}}>Total Cost</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520"}}>Total Qty</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520"}}>Shop</th>
                                <th scope="col" style={{border:"none",borderTopRightRadius:"7px",borderBottom:"2px solid #ff5520",width:"230px"}}>Options</th>
                            </tr>
                        </thead>
                        <tbody scope="raw" >      
                            {this.state.searchedOtherPurchaseDetails.map((results,index)=>(
                            <tr>
                                <td >{results.purID}{results.purDigitID}</td>
                                <td title={results.title}>{results.title}</td>
                                <td >{results.purchasedDate}</td>
                                <td >{results.purchasedSection}</td>
                                <td >{results.totalCost}</td>
                                <td >{results.totalQty}</td>
                                <td >{results.shop}</td>
                                <td style={{padding:"5px",border:"none"}}>
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
                        <a href={`/purchasing/search-purchase/search?searchQuery=${this.state.searchQuery}`}><button className="btn btn-primary" ><i class="fa-solid fa-rotate-right"></i>&nbsp;&nbsp;Refresh</button></a> 
                        <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;&nbsp;Home</button></a> 
                    </div> 
                </div>
            </div>
        )
    }
}
