import React, { Component } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import CancelStockOrder from './CancelStockOrder'
import ChangeStockOrder from './ChangeStockOrder'
import ReactModal from 'react-modal'

export default class DisplayStockOrders extends Component {
    constructor(props){
        super(props)
        this.state ={
          stockOrderDetails: [],
          searchQuery:"",
          title:"",
          isOpen:false,
          visibleClz:""
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.search = this.search.bind(this)
        this.handlePopUp = this.handlePopUp.bind(this)
    }
    
    componentDidMount(){
        axios.get("http://localhost:8000/purchasingGet/stockOrder/getSorted").then(res =>{
          if(res.data.success){
            this.setState({
              stockOrderDetails:res.data.existingDetails
            })
          }
        })
        this.setState({
            title:`Display Details of All Stock Orders`,
            visibleClz:"nonVisible"
        })
        
    }

    search(){
        axios.get(`http://localhost:8000/purchasingGet/stockOrder/search?q=${this.state.searchQuery}`).then(res => {
            if(res.data.success){
                this.setState({
                    stockOrderDetails: res.data.searchedDetails,
                    
                })
            }
            
        })
        this.setState({title:`Display Stock Orders Details Related to`,visibleClz:"visible"})
        if(this.state.searchQuery==""){
            this.componentDidMount()
        }
    }

    handleSearchInput = (e) => {
        const searchQuery = e.target.value
        this.setState({ searchQuery }, () => {
            this.search()
        })
    }

    generatePDF(){
        const orderTableHead = document.getElementById('orderTable')
        const {height, width} = orderTableHead.getBoundingClientRect()
        
        const pdf = new jsPDF()
        const columns = [];
        for (let i = 0; i < 7; i++) {
          columns.push({ header: `Column ${i + 1}`, dataKey: `col${i}` });
        }

        const scaleFactor = pdf.internal.pageSize.width / width
        pdf.autoTable({
            html: '#orderTable',
            startY: 42,
            theme: 'grid',
            margin: { top: 20, bottom: 20,  },
            tableWidth: 560 * scaleFactor,
            columnStyles: {
              0: { fontStyle: 'bold' },
            },
            scaleFactor: scaleFactor,
            columns
        })
        
        pdf.setFontSize("28")
        pdf.setTextColor("#ff5520")
        pdf.text("Encore Thirfting Store",58,25)
        pdf.setFontSize("16")
        pdf.setTextColor("Black")
        pdf.text("Details of All Stock Orders",69,38)
        pdf.save("All Stock Orders.pdf")
    }

    handlePopUp(){
        this.setState({isOpen:!this.state.isOpen})
    }

    render() {
        return (
        <div className='Purchasing-others'>
            <h2 style={{marginTop:"70px"}}>{this.state.title}</h2>
            <div className='btn-inline'>
                <div>
                    <span className='search' ><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input className='search' style={{width:"500px"}} name='searchQuery' placeholder='Search Details By PurchaseID or Title or Shop Name' value={this.state.searchQuery} onChange={this.handleSearchInput} ></input>
                </div>
                <a><button className='btn-inline' style={{width:"200px"}}>Add Filter</button></a>
                <a><button className='btn-inline' style={{width:"200px"}}>Clear Filter</button></a>
            </div>
            <br/>
            <br/>
            <div>
                <div className='div-frame'>
                    <table className='details-table'>
                        <thead>
                            <tr>
                                <th scope="col" style={{borderTopLeftRadius:"7px",borderBottom:"2px solid #ff5520",width:"8%"}}>PurID</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"8%"}}>Title</th>
                                <th style={{borderBottom:"2px solid #ff5520",width:"11%"}} scope="col">Placed Date</th>
                                <th style={{borderBottom:"2px solid #ff5520",width:"11%"}} scope="col">Order Status</th>
                                <th style={{borderBottom:"2px solid #ff5520",width:"9%"}} scope="col">Total Cost</th>
                                <th style={{borderBottom:"2px solid #ff5520",width:"8%"}} scope="col">Total Qty</th>
                                <th style={{borderBottom:"2px solid #ff5520",width:"18%"}} scope="col">Supplier</th>
                                <th scope="col" style={{border:"none",borderTopRightRadius:"7px",borderBottom:"2px solid #ff5520",width:"25%"}}>Options</th>
                            </tr>
                        </thead>
                    </table>
                    <div  style={{overflowY:"scroll",height:"36vh"}} >  
                        <table className='details-table'  >
                            <tbody scope="raw" >    
                                
                                {this.state.stockOrderDetails.map((results,index)=>(
                                
                                <tr>
                                    <td style={{width:"8%"}}>{results.purID}{results.purDigitID}</td>
                                    <td style={{width:"8%"}} title={results.title}>{results.title}</td>
                                    <td style={{width:"11%"}}>{results.placedDate}</td>
                                    <td style={{width:"11%"}}>{results.orderStatus}</td>
                                    <td style={{width:"9%"}}>{results.totalCost}</td>
                                    <td style={{width:"8%"}}>{results.totalQty}</td>
                                    <td style={{width:"18%"}}>{results.supplier}</td>
                                    <td style={{padding:"5px",border:"none",width:"25%"}}>
                                        <div className='btn-inline-table'>
                                            <ChangeStockOrder ID={results._id}/>
                                            <CancelStockOrder digitID={results.purDigitID} PID={results.purID} orderTitel={results.title} supplier={results.supplier} payment={results.paymentStatus} ID={results._id} />
                                            <a href={`/purchasing/${results._id}`}><button type="button" className="btn btn-primary"><i class="fa fa-circle-ellipsis"></i> More</button></a>
                                            
                                        </div>
                                    </td>
                                </tr>
                                
                                ))}
                            
                            </tbody>
                        </table>
                        <table className={this.state.visibleClz} style={{color:"#808080",borderTop:"2px solid #ff5520"}}> 
                            <tr>
                                <td style={{fontSize:"40px",textAlign:"center"}}>End of Searched Results</td>
                            </tr>
                        </table>
                    </div>
                    
                    <table style={{width:"100%",borderTop:"2px solid #ff5520"}}> 
                        <tr>
                            <td style={{fontSize:"10px",textAlign:"center"}}>Scroll to View All Stock Orders</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div className='spec-btn-inline' style={{marginTop:"20px", width:"35%"}}>
                <div className='btn-inline'>
                    <a href={`/purchasing/display-orders`}><button className="btn btn-primary" ><i class="fa-solid fa-rotate-right"></i>&nbsp;&nbsp;Refresh</button></a> 
                    <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;&nbsp;Home</button></a> 
                    <a><button className="btn btn-primary" onClick={this.handlePopUp} title="Generate A PDF Including Above Stock Orders's Details"><i class="fa-solid fa-download"></i>&nbsp;&nbsp;Generate PDF</button></a> 
                </div> 
            </div>
            <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handlePopUp} className="popUp90 zoom-in">
                <div>
                    <h2>PDF Including All Stock Order Details is Generated</h2>
                    <h4>A preview of the PDF is below & You can download it by 'Download' button</h4>
                    <div className='PDFpreview'>
                        <h1 style={{color:"#ff5520"}}>Encore Thrifting Store</h1>
                        <h3>Details of All Stock Orders</h3>
                        <table className='pdfTable'  id='orderTable'>
                            <thead>
                                <tr>
                                    <th scope="col">PurID</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Placed Date</th>
                                    <th scope="col">Order Status</th>
                                    <th scope="col">Total Cost</th>
                                    <th scope="col">Total Qty</th>
                                    <th scope="col">Supplier</th>
                                </tr>
                            </thead>
                            <tbody scope="raw" >    
                                {this.state.stockOrderDetails.map((results,index)=>(
                                <tr>
                                    <td>{results.purID}{results.purDigitID}</td>
                                    <td title={results.title}>{results.title}</td>
                                    <td>{results.placedDate}</td>
                                    <td>{results.orderStatus}</td>
                                    <td>{results.totalCost}</td>
                                    <td>{results.totalQty}</td>
                                    <td>{results.supplier}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='spec-btn-inline' style={{marginTop:"20px",marginBottom:"20px", width:"35%"}}>
                        <div className='btn-inline'>
                            <a href={`/purchasing/display-orders`}><button className="btn btn-primary" ><i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back</button></a> 
                            <a><button className="btn btn-primary" onClick={this.generatePDF} title="Download This in PDF Format"><i class="fa-solid fa-download"></i>&nbsp;&nbsp;Download PDF</button></a> 
                        </div> 
                    </div>
                </div>
            </ReactModal>
        </div>        
        )
    }
}
