import React, { Component } from 'react'
import axios from 'axios'
import ReactModal from 'react-modal'
import  './Purchasing.css'
import DeleteOtherPurchase from './purchasing-components/DeleteOtherPurchase'

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
      confirmationPendingOrderDetailsAll: [],
      stockOrderDetailsInTimePeriod: [],
      isOpenConPend:false,
      isOpenPending:false,
      searchQuery: "",
    }
    this.handlePopUpConPend = this.handlePopUpConPend.bind(this)
    this.handlePopUpPending = this.handlePopUpPending.bind(this)
  }

  componentDidMount(){
    const nowTime = new Date()
    const month = (nowTime.getMonth()+1)

    const y = nowTime.getFullYear()
    const m = (nowTime.getMonth()+1).toString().padStart(2,"0")

    const startDate = `${y}-${m}-01`
    const endDate = `${y}-${m}-31`

    if(month == 1){
      this.setState({currentMonth:"January"})
    }
    else if(month == 2){
      this.setState({currentMonth:"February"})
    }
    else if(month == 3){
      this.setState({currentMonth:"March"})
    }
    else if(month == 4){
      this.setState({currentMonth:"April"})
    }
    else if(month == 5){
      this.setState({currentMonth:"May"})
    }
    else if(month == 6){
      this.setState({currentMonth:"June"})
    }
    else if(month == 7){
      this.setState({currentMonth:"July"})
    }
    else if(month == 8){
      this.setState({currentMonth:"August"})
    }
    else if(month == 9){
      this.setState({currentMonth:"Saptember"})
    }
    else if(month == 10){
      this.setState({currentMonth:"October"})
    }
    else if(month == 11){
      this.setState({currentMonth:"November"})
    }
    else if(month == 12){
      this.setState({currentMonth:"December"})
    }

    
      axios.get(`http://localhost:8000/purchasingGet/stockOrder/searchPlacedDate?qStart=${startDate}&qEnd=${endDate}`).then(res => {
          this.setState({
              stockOrderDetailsInTimePeriod: res.data.searchedDetails,
                  
          })
      })
    
    

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

    
      axios.get("http://localhost:8000/purchasingGet/stockOrder/confirmation-pendingAll").then(res =>{
          if(res.data.success){
            this.setState({
              confirmationPendingOrderDetailsAll:res.data.confirmationPendingOrders
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

  handlePopUpConPend(){
    this.setState({isOpenConPend:!this.state.isOpenConPend})
  }

  handlePopUpPending(){
    this.setState({isOpenPending:!this.state.isOpenPending})
  }

  render() {

    let un = "Sanjana"
    const {currentMonth} = this.state
    const pendingOrder = this.state.pendingOrderDetailsAll.length
    const confirmationPendingOrder = this.state.confirmationPendingOrderDetailsAll.length
    const totalOrderMonth = this.state.stockOrderDetailsInTimePeriod.length

    

    return (
      <div className='Purchasing'>
        <div >
          <div className='btn-inline' style={{marginTop:"140px"}} >
            <a href={`/purchasing/place-order`}><button className='btn-inline-purchasing'>Place Stock Order</button></a>
            <a><button className='btn-inline-purchasing'>Add Other Purchase</button></a>
            <a href={`/purchasing/display-orders`}><button className='btn-inline-purchasing'>View All Stock Orders</button></a>
            <a href={`/purchasing/display-purchases`}><button className='btn-inline-purchasing'>View All Other Purchases</button></a>
          </div>

          <div className='btn-inline' style={{marginTop:"30px",marginBottom:"30px"}}>
            <button className='btn-inline-purchasing'>Generate Reports</button>
            <button className='btn-inline-purchasing'>Send Emails</button>
            <button className='btn-inline-purchasing'>Graph Generator</button>
            <button className='btn-inline-purchasing'>Data Analyzing and Calculating</button>
          </div>

          <div className='btn-inline' style={{marginTop:"20px"}}>
            <div className='semi-preview-container-purchasing'>Confirmation Pending Orders<br/><span className='semi-preview-container-purchasing'>{confirmationPendingOrder}</span></div>
            <div className='semi-preview-container-purchasing'>Pending Stock Orders<br/><span className='semi-preview-container-purchasing'>{pendingOrder}</span></div>
            <div className='semi-preview-container-purchasing'>Total Stock Orders in {currentMonth}<br/><span className='semi-preview-container-purchasing'>{totalOrderMonth}</span></div>
          </div>

          <div className='btn-inline'>
          <div style={{width:"49%"}}>
            <div className='btn-inline' style={{marginTop:"20px"}}>
              <h3>Pending Stock Orders</h3>
              <button onClick={this.handlePopUpPending} className="btn btn-primary">View All</button>
            </div>
          <div className='div-frame'>
          <table className='details-table' >
            <thead>
              <tr>
                <th scope="col"  style={{borderTopLeftRadius:"7px"}}>PurID</th>
                <th scope="col" >Title</th>
                <th scope="col" >Placed Date</th>
                <th scope="col" >Supplier</th>
                <th scope="col" style={{border:"none",borderTopRightRadius:"7px",width:"153px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.pendingOrderDetails.map((results,index)=>(
              <tr>
                <td >{results.purID}{results.purDigitID}</td>
                <td title={results.title}>{results.title.slice(0, 7)+"..."}</td>
                <td >{results.placedDate}</td>
                <td title={results.supplier}>{results.supplier.slice(0, 4)+"..."}</td> 
                <td style={{padding:"5px",border:"none"}}>
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
              <a  href={`/purchasing/display-purchases`}><button className="btn btn-primary">View All Other Purchases</button></a>
            </div>
          <div className='div-frame'>
          <table className='details-table' >
            <thead className='tData'>
              <tr>
                <th scope="col" style={{borderTopLeftRadius:"7px"}}>PurID</th>
                <th scope="col" >Title</th>
                <th scope="col" >Purchased Date</th>
                <th scope="col"  style={{border:"none",borderTopRightRadius:"7px", width:"220px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.otherPurchaseDetails.map((results,index)=>(
              <tr>
                <td >{results.purID}{results.purDigitID}</td>
                <td  title={results.title}>{results.title.slice(0, 7)+"..."}</td>
                <td >{results.purchasedDate}</td>
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
          </div>
          </div>
          <div className='btn-inline'>
          <div style={{width:"49%"}}>
            <div className='btn-inline' style={{marginTop:"20px"}}>
              <h3>Confirmation Pending Stock Orders</h3>
              <button onClick={this.handlePopUpConPend} className="btn btn-primary">View All</button>
            </div>
          <div className='div-frame'>
          <table className='details-table' >
            <thead>
              <tr>
                <th scope="col" style={{borderTopLeftRadius:"7px"}}>PurID</th>
                <th scope="col" >Title</th>
                <th scope="col" >Placed Date</th>
                <th scope="col" >Supplier</th>
                <th scope="col" style={{border:"none",borderTopRightRadius:"7px",width:"145px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.confirmationPendingOrderDetails.map((results,index)=>(
              <tr>
                <td >{results.purID}{results.purDigitID}</td>
                <td title={results.title}>{results.title.slice(0, 7)+"..."}</td>
                <td >{results.placedDate}</td>
                <td title={results.supplier}>{results.supplier.slice(0, 4)+"..."}</td> 
                <td style={{padding:"5px",border:"none"}}>
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
              <a href={`/purchasing/display-orders`}><button className="btn btn-primary">View All Stock Orders</button></a>
            </div>
          <div className='div-frame'>
          <table className='details-table' >
            <thead>
              <tr>
                <th scope="col" style={{borderTopLeftRadius:"7px"}}>PurID</th>
                <th scope="col" >Title</th>
                <th scope="col" >Ordered Date</th>
                <th scope="col" style={{width:"80px"}}>Status</th>
                <th scope="col" style={{border:"none",borderTopRightRadius:"7px",width:"130px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.stockOrderDetails.map((results,index)=>(
              <tr>
                <td >{results.purID}{results.purDigitID}</td>
                <td title={results.title}>{results.title.slice(0, 5)+"..."}</td>
                <td >{results.placedDate}</td>
                <td title={results.orderStatus}>{results.orderStatus.slice(0, 10)+"..."}</td>
                <td style={{padding:"5px",border:"none"}}>
                  <div className='btn-inline-table'>
                    <button type="button" className="btn btn-warning"><i class="fa-solid fa-arrows-rotate"></i> </button>
                    <button type="button" className="btn btn-danger"><i class="fa-solid fa-ban"></i> </button>
                    <button type="button" className="btn btn-primary">More</button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          </div>
          </div>
          </div>
        </div>
        <ReactModal isOpen={this.state.isOpenConPend} onRequestClose={this.handlePopUpConPend} className="popUp90 zoom-in">
          <div style={{marginTop:"10px", marginBottom:"10px", textAlign:"center"}}>
            <h2>All Confirmation Pending Orders</h2>
          </div>
          <div className='div-frame'>
          <table className='details-table' >
            <thead>
              <tr>
                <th scope="col" style={{borderTopLeftRadius:"7px"}}>PurID</th>
                <th scope="col" >Title</th>
                <th scope="col" >Placed Date</th>
                <th scope="col" >Supplier</th>
                <th scope="col" style={{border:"none",borderTopRightRadius:"7px",width:"145px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.confirmationPendingOrderDetailsAll.map((results,index)=>(
              <tr>
                <td >{results.purID}{results.purDigitID}</td>
                <td title={results.title}>{results.title.slice(0, 7)+"..."}</td>
                <td >{results.placedDate}</td>
                <td title={results.supplier}>{results.supplier.slice(0, 4)+"..."}</td> 
                <td style={{padding:"5px",border:"none"}}>
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
          
            <div className='spec-btn-inline' style={{marginTop:"20px",marginBottom:"20px", width:"8%"}}>
              <div className='btn-inline'>
                <button className='btn btn-primary' onClick={this.handlePopUpConPend}>Close</button>
              </div> 
            </div>
        </ReactModal>
        <ReactModal isOpen={this.state.isOpenPending} onRequestClose={this.handlePopUpPending} className="popUp90 zoom-in">
          <div style={{marginTop:"10px", marginBottom:"10px", textAlign:"center"}}>
            <h2>All Pending Orders</h2>
          </div>
          <div className='div-frame'>
          <table className='details-table' >
            <thead>
              <tr>
                <th scope="col"  style={{borderTopLeftRadius:"7px"}}>PurID</th>
                <th scope="col" >Title</th>
                <th scope="col" >Placed Date</th>
                <th scope="col" >Supplier</th>
                <th scope="col" style={{border:"none",borderTopRightRadius:"7px",width:"153px"}}>Options</th>
              </tr>
            </thead>
            <tbody scope="raw" >      
            {this.state.pendingOrderDetailsAll.map((results,index)=>(
              <tr>
                <td >{results.purID}{results.purDigitID}</td>
                <td title={results.title}>{results.title.slice(0, 7)+"..."}</td>
                <td >{results.placedDate}</td>
                <td title={results.supplier}>{results.supplier.slice(0, 4)+"..."}</td> 
                <td style={{padding:"5px",border:"none"}}>
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
          
            <div className='spec-btn-inline' style={{marginTop:"20px",marginBottom:"20px", width:"8%"}}>
              <div className='btn-inline'>
                <button className='btn btn-primary' onClick={this.handlePopUpPending}>Close</button>
              </div> 
            </div>
        </ReactModal>
      </div>
    )
  }
}
