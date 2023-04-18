import React, { Component } from 'react'
import axios from 'axios'
import ReactModal from 'react-modal'
import  './Purchasing.css'

export default class PurchasingHome extends Component {
  constructor(props){
    super(props)
    this.state ={
      currentMonth: null,
      stockOrderDetails: [],
      otherPurchaseDetails: [],
      pendingOrderDetails: [],
      pendingOrderDetailsAll: [],
      confirmationPendingOrderDetails: [],
      isOpen:true,
      searchQuery: "",
    }
    this.handlePopUp = this.handlePopUp.bind(this)
  }

  componentDidMount(){
    const nowTime = new Date()
    const month = nowTime.toLocaleString('default',{month:'short'})
    this.setState({currentMonth:month})

    axios.get("http://localhost:8000/purchasingGet/stockOrder/getLastFourOrder").then(res =>{
      if(res.data.success){
        this.setState({
          stockOrderDetails:res.data.existingDetails
        })
      }
    })
    
    axios.get("http://localhost:8000/purchasingGet/stockOrder/pending").then(res =>{
      if(res.data.success){
        this.setState({
          pendingOrderDetails:res.data.pendingOrders
        })
      }
    })
    
    axios.get("http://localhost:8000/purchasingGet/stockOrder/pendingAll").then(res =>{
      if(res.data.success){
        this.setState({
          pendingOrderDetailsAll:res.data.pendingOrders
        })
      }
    })
    
    axios.get("http://localhost:8000/purchasingGet/stockOrder/confirmation-pending").then(res =>{
      if(res.data.success){
        this.setState({
          confirmationPendingOrderDetails:res.data.confirmationPendingOrders
        })
      }
    })
    
    axios.get("http://localhost:8000/purchasingGet/otherPurchase/getLastFourOrder").then(res =>{
      if(res.data.success){
        this.setState({
          otherPurchaseDetails:res.data.existingDetails
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

  handlePopUp(){
    this.setState({isOpen:false})
  }

  render() {

    let un = "Sanjana"
    let thisMonth = "March"
    const {currentMonth} = this.state
    const pendingOrder = this.state.pendingOrderDetailsAll.length
    const pendingPayment = 3
    const totalOrderMonth = 54

    

    return (
      <div className='Purchasing'>
        <div >
          <div className='btn-inline' style={{marginTop:"140px"}} >
            <a href={`/purchasing/place-order`}><button className='btn-inline'>Place Stock Order</button></a>
            <a><button className='btn-inline'>Add Other Purchase</button></a>
            <a href={`/purchasing/display-orders`}><button className='btn-inline'>View All Purchases</button></a>
            <div><a href={`/purchasing/search-purchase/search?searchQuery=${this.state.searchQuery}`}><button className='search'><i class="fa-solid fa-magnifying-glass"></i></button></a>
            <input className='search' name='searchQuery' placeholder='Search Details By PurchaseID or Title or Shop Name' value={this.state.searchQuery} onChange={this.handleSearchInput}></input></div>
          </div>

          <div className='btn-inline' style={{marginTop:"20px"}}>
            <div className='semi-preview-container'>Pending Stock Orders<br/>{pendingOrder}</div>
            <div className='semi-preview-container'>Pending Payments<br/>{pendingPayment}</div>
            <div className='semi-preview-container'>Total Stock Orders in {currentMonth}<br/>{totalOrderMonth}</div>
          </div>

          <div className='btn-inline'>
          <div style={{width:"49%"}}>
            <div className='btn-inline' style={{marginTop:"20px"}}>
              <h3>Pending Stock Orders</h3>
              <button className="btn btn-primary">View All</button>
            </div>
          <div className='div-frame'>
          <table className='table-home' >
            <thead>
              <tr>
                <th scope="col" className='table-home' style={{borderTopLeftRadius:"10px"}}>PurID</th>
                <th scope="col" className='table-home'>Title</th>
                <th scope="col" className='table-home'>Placed Date</th>
                <th scope="col" className='table-home'>Supplier</th>
                <th scope="col" className='table-home' style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.pendingOrderDetails.map((results,index)=>(
              <tr>
                <td className='table-home'>{results.purID}{results.purDigitID}</td>
                <td className='table-home'title={results.title}>{results.title.slice(0, 7)+"..."}</td>
                <td className='table-home'>{results.placedDate}</td>
                <td className='table-home' title={results.supplier}>{results.supplier.slice(0, 4)+"..."}</td> 
                <td className='table-home' style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                    <button type="button" className="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i> Received</button>
                    <button type="button" className="btn btn-primary">More</button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
          </div>
          <div style={{width:"49%"}}>
            <div className='btn-inline' style={{marginTop:"20px"}}>
              <h3>Recently Purchased</h3>
              <button className="btn btn-primary">View All</button>
            </div>
          <div className='div-frame'>
          <table className='table-home' >
            <thead>
              <tr>
                <th scope="col" className='table-home' style={{borderTopLeftRadius:"10px"}}>PurID</th>
                <th scope="col" className='table-home'>Title</th>
                <th scope="col" className='table-home'>Purchased Date</th>
                <th scope="col" className='table-home' style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.otherPurchaseDetails.map((results,index)=>(
              <tr>
                <td className='table-home'>{results.purID}{results.purDigitID}</td>
                <td className='table-home' title={results.title}>{results.title.slice(0, 7)+"..."}</td>
                <td className='table-home'>{results.purchasedDate}</td>
                <td className='table-home' style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                    <button type="button" className="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i> Update</button>
                    <button type="button" className="btn btn-danger"><i class="fa-regular fa-trash-can"></i> Delete</button>
                    <button type="button" className="btn btn-primary"><i class="fa fa-circle-ellipsis"></i> More</button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
          </div>
          </div>
          <div className='btn-inline'>
          <div style={{width:"49%"}}>
            <div className='btn-inline' style={{marginTop:"20px"}}>
              <h3>Confirmation Pending Stock Orders</h3>
              <button className="btn btn-primary">View All</button>
            </div>
          <div className='div-frame'>
          <table className='table-home' >
            <thead>
              <tr>
                <th scope="col" className='table-home' style={{borderTopLeftRadius:"10px"}}>PurID</th>
                <th scope="col" className='table-home'>Title</th>
                <th scope="col" className='table-home'>Placed Date</th>
                <th scope="col" className='table-home'>Supplier</th>
                <th scope="col" className='table-home' style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.confirmationPendingOrderDetails.map((results,index)=>(
              <tr>
                <td className='table-home'>{results.purID}{results.purDigitID}</td>
                <td className='table-home' title={results.title}>{results.title.slice(0, 7)+"..."}</td>
                <td className='table-home'>{results.placedDate}</td>
                <td className='table-home' title={results.supplier}>{results.supplier.slice(0, 4)+"..."}</td> 
                <td className='table-home' style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                    <button type="button" className="btn btn-warning"><i class="fa-regular fa-circle-check"></i> Confirm</button>
                    <button type="button" className="btn btn-primary">More</button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
          </div>
          <div style={{width:"49%"}}>
            <div className='btn-inline' style={{marginTop:"20px"}}>
              <h3>Recently Ordered Stocks</h3>
              <button className="btn btn-primary">View All</button>
            </div>
          <div className='div-frame'>
          <table className='table-home' >
            <thead>
              <tr>
                <th scope="col" className='table-home' style={{borderTopLeftRadius:"10px"}}>PurID</th>
                <th scope="col" className='table-home'>Title</th>
                <th scope="col" className='table-home'>Ordered</th>
                <th scope="col" className='table-home'>Status</th>
                <th scope="col" className='table-home' style={{border:"none",borderTopRightRadius:"10px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.stockOrderDetails.map((results,index)=>(
              <tr>
                <td className='table-home'>{results.purID}{results.purDigitID}</td>
                <td className='table-home' title={results.title}>{results.title.slice(0, 5)+"..."}</td>
                <td className='table-home'>{results.placedDate}</td>
                <td className='table-home' title={results.orderStatus}>{results.orderStatus.slice(0, 5)+"..."}</td>
                <td className='table-home' style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                    <button type="button" className="btn btn-warning"><i class="fa-solid fa-arrows-rotate"></i> Change</button>
                    <button type="button" className="btn btn-danger"><i class="fa-solid fa-ban"></i> Cancel</button>
                    <button type="button" className="btn btn-primary"><i class="fa fa-circle-ellipsis"></i> More</button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
          </div>
          </div>
          <div className='btn-inline' style={{marginTop:"30px",marginBottom:"30px"}}>
            <button className='btn-inline'>Generate Reports</button>
            <button className='btn-inline'>Send Emails</button>
            <button className='btn-inline'>Graph Generator</button>
            <button className='btn-inline' style={{width:"360px"}}>Data Analyzing and Calculating</button>
          </div>
        </div>
        <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handlePopUp} style={{content: {width: '50%',height: '34%',margin:"auto",border:"2px solid #ff5520",borderRadius:"20px"}}}>
                <h1 style={{color:"#ff5520",textAlign:"center"}}>Purchasing Management System</h1>
                <h3 style={{textAlign:"justify"}}>You logged in as purchasing manager. So, You have only access for Purchasing Management System.</h3>
                <div style={{marginLeft:"auto",marginRight:"auto",width:"10%"}}><button onClick={this.handlePopUp} className="btn btn-primary" >Continue</button></div>
        </ReactModal>
      </div>
    )
  }
}
