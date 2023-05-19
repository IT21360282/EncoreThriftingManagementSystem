import axios from 'axios'
import React, { Component } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import html2canvas from 'html2canvas'
import ReactModal from 'react-modal'
import DeleteOtherPurchase from './DeleteOtherPurchase'
import FilterOtherPurchases from './FilterOtherPurchases'

export default class DisplayOtherPurchases extends Component {
    constructor(props){
        super(props)
        this.state = {
            otherPurchaseDetails: [],
            isErrorGetDetails: false,
            searchQuery: "",
            title: "",
            isOpen:false
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handlePopUp = this.handlePopUp.bind(this)
    }

    componentDidMount(){
        axios.get("http://localhost:8000/purchasingGet/otherPurchase/getSorted").then(res => {
            if(res.data.success){
                this.setState({
                    otherPurchaseDetails: res.data.existingDetails
                })
            }
            
        })
        this.setState({title:"Display All Details of Other Purchases"})
    }

    search(){
        axios.get(`http://localhost:8000/purchasingGet/otherPurchase/search?q=${this.state.searchQuery}`).then(res => {
            if(res.data.success){
                this.setState({
                    otherPurchaseDetails: res.data.searchedDetails
                })
            }
            
        })
        this.setState({title:`Display Other Purchases' Details Related to`})
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
        const purchasesTable = document.getElementById('purchasesTable')
        const {height, width} = purchasesTable.getBoundingClientRect()
        
        const pdf = new jsPDF()

        const columns = [];
        for (let i = 0; i < 7; i++) {
          columns.push({ header: `Column ${i + 1}`, dataKey: `col${i}` });
        }

        

        const scaleFactor = pdf.internal.pageSize.width / width
        pdf.autoTable({
            html: '#purchasesTable',
            startY: 42,
            theme: 'grid',
            margin: { top: 20, bottom: 20,  },
            tableWidth: 550 * scaleFactor,
            columnStyles: {
              0: { fontStyle: 'bold' },
            },
            scaleFactor: scaleFactor,
            columns,

          })
        pdf.setFontSize("28")
        pdf.setTextColor("#ff5520")
        pdf.text("Encore Thirfting Store",58,25)
        pdf.setFontSize("16")
        pdf.setTextColor("Black")
        pdf.text("Details of All Other Purchases",69,38)
        pdf.save("All Other Purchases.pdf")
    }

    handlePopUp(){
        this.setState({isOpen:!this.state.isOpen})
    }

    render() {
        return (
            <div className='Purchasing-others'>
                <h2 style={{marginTop:"70px"}}>{this.state.title}&nbsp;&nbsp;<span style={{color:"#ff5520"}}>{this.state.searchQuery}</span></h2>
                <div style={{width:"100%"}} >
                    <div><span className='search' ><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input className='search' style={{width:"93%"}} name='searchQuery' placeholder='Search Details By PurchaseID or Title or Shop Name' value={this.state.searchQuery} onChange={this.handleSearchInput} ></input></div>
                    {/*<FilterOtherPurchases/>
                    <a href='/purchasing/display-purchases'><button className='btn-inline' style={{width:"200px"}}>Clear Filter</button></a>*/}
                </div>
                <br/>
        
                <div className='div-frame'>
                    <table className='details-table'>
                        <thead>
                            <tr>
                                <th scope="col" style={{borderTopLeftRadius:"7px",borderBottom:"2px solid #ff5520",width:"8%"}}>PurID</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"8%"}}>Title</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"12%"}}>Purchased Date</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"11%"}}>Purchased For</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"9%"}}>Total Cost</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"8%"}}>Total Qty</th>
                                <th scope="col" style={{borderBottom:"2px solid #ff5520",width:"18%"}}>Shop</th>
                                <th scope="col" style={{border:"none",borderTopRightRadius:"7px",borderBottom:"2px solid #ff5520",width:"25%"}}>Options</th>
                            </tr>
                        </thead>
                    </table>
                    <div  style={{overflowY:"scroll",height:"40vh"}} >  
                            <table className='details-table'  >
                            <tbody scope="raw" >      
                                {this.state.otherPurchaseDetails.map((results,index)=>(
                                <tr>
                                    <td style={{width:"8%"}}>{results.purID}{results.purDigitID}</td>
                                    <td style={{width:"8%"}} title={results.title}>{results.title}</td>
                                    <td style={{width:"12%"}}>{results.purchasedDate}</td>
                                    <td style={{paddingLeft:"none", paddingRight:"none",width:"11%"}}>{results.purchasedSection}</td>
                                    <td style={{width:"9%"}}>{results.totalCost}</td>
                                    <td style={{width:"8%"}}>{results.totalQty}</td>
                                    <td style={{width:"18%"}}>{results.shop}</td>
                                    <td style={{padding:"5px",border:"none",width:"25%"}}>
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
                <div className='spec-btn-inline' style={{marginTop:"20px", width:"35%"}}>
                    <div className='btn-inline'>
                        <a href={`/purchasing/display-purchases`}><button className="btn btn-primary" ><i class="fa-solid fa-rotate-right"></i>&nbsp;&nbsp;Refresh</button></a> 
                        <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;&nbsp;Home</button></a> 
                        <a><button className="btn btn-primary" onClick={this.handlePopUp} title='Download Details of Other Purchases in PDF Format'><i class="fa-solid fa-download"></i>&nbsp;&nbsp;Generate PDF</button></a> 
                    </div> 
                </div>
                <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handlePopUp} className="popUp90 zoom-in">
                    <div>
                        <h2>PDF Including All Other Purchases Details is Generated</h2>
                        <h4>A preview of the PDF is below & You can download it by 'Download' button</h4>
                        <div className='PDFpreview'>
                            <h1 style={{color:"#ff5520"}}>Encore Thrifting Store</h1>
                            <h3>Details of All Stock Orders</h3>
                            <table className='pdfTable'  id='purchasesTable'>
                                <thead>
                                    <tr>
                                        <th scope="col">PurID</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Purchased Date</th>
                                        <th scope="col">Purchased For</th>
                                        <th scope="col">Total Cost</th>
                                        <th scope="col">Total Qty</th>
                                        <th scope="col">Shop</th>
                                    </tr>
                                </thead>
                                <tbody scope="raw" >    
                                    {this.state.otherPurchaseDetails.map((results,index)=>(
                                    <tr>
                                        <td>{results.purID}{results.purDigitID}</td>
                                        <td title={results.title}>{results.title}</td>
                                        <td>{results.purchasedDate}</td>
                                        <td>{results.purchasedSection}</td>
                                        <td>{results.totalCost}</td>
                                        <td>{results.totalQty}</td>
                                        <td>{results.shop}</td>
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
