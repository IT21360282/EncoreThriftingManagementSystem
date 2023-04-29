import React, { Component } from 'react'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import ReactModal from 'react-modal'


export default class GenerateReport extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen:false,
            confirmPend:false,
            pending:false,
            received:false,
            canceled:false,
            confirmationPendingOrders:[],
            pendingOrders:[],
            receivedOrders:[],
            canceledOrders:[],
        }
  
        this.handlePopUp = this.handlePopUp.bind(this)
        this.getData = this.getData.bind(this)
    }

    getData(){
        if(this.state.confirmPend){
            axios.get("http://localhost:8000/purchasingGet/stockOrder/confirmation-pendingAll").then(res =>{
                if(res.data.success){
                  this.setState({
                    confirmationPendingOrders:res.data.confirmationPendingOrders
                  })
                }
            })
        }
        if(this.state.pending){
            axios.get("http://localhost:8000/purchasingGet/stockOrder/pendingAll").then(res =>{
                if(res.data.success){
                  this.setState({
                    pendingOrders:res.data.pendingOrders
                  })
                }
            })
        }
        if(this.state.received){
            axios.get("http://localhost:8000/purchasingGet/stockOrder/receivedAll").then(res =>{
                if(res.data.success){
                  this.setState({
                    receivedOrders:res.data.receivedOrders
                  })
                }
            })
        }
        if(this.state.canceled){
            axios.get("http://localhost:8000/purchasingGet/stockOrder/confirmation-pendingAll").then(res =>{
                if(res.data.success){
                  this.setState({
                    canceledOrders:res.data.confirmationPendingOrders
                  })
                }
            })
        }
        if(this.state.confirmPend == false){
            this.setState({confirmationPendingOrders:[]})
        }
        if(this.state.pending == false){
            this.setState({pendingOrders:[]})
        }
        if(this.state.received == false){
            this.setState({receivedOrders:[]})
        }
        if(this.state.canceled == false){
            this.setState({canceledOrders:[]})
        }
        
        
    }

    handleInputChange = (e) => {
        const {name,value} = e.target
        this.setState({[name]:value})
    }

    
    handleCheckBoxChange = (e) => {
        const {name,checked} = e.target
        this.setState({[name]:checked},()=>{
            this.getData()
        })
       
    }

    handlePopUp(){
        this.setState({isOpen:!this.state.isOpen})
    }

    generatePDF(){
        
        const pdf = new jsPDF()
        const columns = [];
        for (let i = 0; i < 7; i++) {
          columns.push({ header: `Column ${i + 1}`, dataKey: `col${i}` });
        }

        const test1 = true
        const test2 = false
       
        if(test1 == true){
            const conPenTable = document.getElementById('conPenTable')
            const {height1, width1} = conPenTable.getBoundingClientRect()
            const scaleFactor1 = pdf.internal.pageSize.width / width1
            pdf.autoTable({
                html: '#conPenTable',
                startY: 42,
                theme: 'grid',
                margin: { top: 20, bottom: 20,  },
                tableWidth: 560 * scaleFactor1,
                columnStyles: {
                0: { fontStyle: 'bold' },
                },
                scaleFactor: scaleFactor1,
                columns
            })
        }

        
        if(test2==true) {
        const position = {x:10, y:pdf.lastAutoTable.finalY + 10}
        const penTable = document.getElementById('penTable')
        const {height2, width2} = penTable.getBoundingClientRect()
        const scaleFactor2 = pdf.internal.pageSize.width / width2
            pdf.autoTable({
                html: '#penTable',
                startY: position.y,
                theme: 'grid',
                margin: { top: 20, bottom: 20,  },
                tableWidth: 560 * scaleFactor2,
                columnStyles: {
                0: { fontStyle: 'bold' },
                },
                scaleFactor: scaleFactor2,
                columns
            })
        }
        
        pdf.setFontSize("28")
        pdf.setTextColor("#ff5520")
        pdf.text("Encore Thirfting Store",58,25)
        pdf.setFontSize("16")
        pdf.setTextColor("Black")
        pdf.text("Details of All Stock Orders",69,38)
        pdf.save("All Stock Orders.pdf")
    }

    render() {
        let test = "not"
        if(this.state.canceled){
            test="tested"
        }
        return (
        <div className='Purchasing-others'>
            <h2 style={{marginTop:"70px"}}>Generate Report</h2>
            <div style={{overflowX:"scroll",height:"64vh"}}>
                <h3>Generate Report Related to Stock Orders:</h3>
                <div className='btn-inline gray-box report-main'>
                    
                    <div className={this.state.stockOrderCat} style={{padding:"20px"}}>
                        <label>Select Order Status</label><br/>
                        <input type='checkbox' checked={this.state.confirmPend} name='confirmPend' onChange={this.handleCheckBoxChange}/>&nbsp;Confirmation Pending Stock Orders<br/>
                        <input type='checkbox' checked={this.state.pending} name='pending' onChange={this.handleCheckBoxChange}/>&nbsp;Pending Stock Orders<br/>
                        <input type='checkbox' checked={this.state.received} name='received' onChange={this.handleCheckBoxChange}/>&nbsp;Received Stock Orders<br/>
                        <input type='checkbox' checked={this.state.canceled} name='canceled' onChange={this.handleCheckBoxChange}/>&nbsp;Canceled Stock Orders<br/><br/>
                        <button className='btn btn-success' onClick={this.handlePopUp}>Generate PDF</button>
                    </div>
                    {/*<div className={this.state.stockOrderCat} style={{padding:"20px"}}>
                        <label>Select Weekly or Monthly</label><br/>
                        <span><input type='radio' value='all' name='otherPurchaseSelect' onChange={this.handleRadioMonthWeekChange}/>&nbsp;All</span><br/>
                        <span><input type='radio' value='month' name='otherPurchaseSelect' onChange={this.handleRadioMonthWeekChange}/>&nbsp;Monthly</span><br/>
                        <span><input type='radio' value='week' name='otherPurchaseSelect' onChange={this.handleRadioMonthWeekChange}/>&nbsp;Weekly</span><br/>
                        <br/>{test}
                        <div className={this.state.month}>
                            <label>Select Month</label><br/>
                            <input type='month' name='whichMonth' value={this.state.whichMonth} onChange={this.handleInputChange}/>
                            <input type='submit' value='Generate Report'/>
                            {this.state.whichMonth}
                        </div>
                        <div className={this.state.week}>
                            <label>Select Week</label><br/>
                            <input type='week' name='whichWeek' value={this.state.whichWeek} onChange={this.handleInputChange}/>
                            <input type='submit' value='Generate Report'/>
                            {this.state.whichWeek}
                        </div>
                        <div className={this.state.all}>
                            <input type='submit' onClick={this.handlePopUp} value='Generate Report'/>
                        </div>
                    </div>*/}
                </div>
                <h3>Generate Report Related to Other Purchases:</h3>
                <div className='btn-inline gray-box report-main'>
                    
                    <div className={this.state.stockOrderCat} style={{padding:"20px"}}>
                        <label>Select Order Status</label><br/>
                        <input type='checkbox' checked={this.state.confirmPend} name='confirmPend' onChange={this.handleCheckBoxChange}/>&nbsp;Confirmation Pending Stock Orders<br/>
                        <input type='checkbox' checked={this.state.pending} name='pendind' onChange={this.handleCheckBoxChange}/>&nbsp;Pending Stock Orders<br/>
                        <input type='checkbox' checked={this.state.received} name='received' onChange={this.handleCheckBoxChange}/>&nbsp;Received Stock Orders<br/>
                        <input type='checkbox' checked={this.state.canceled} name='canceled' onChange={this.handleCheckBoxChange}/>&nbsp;Canceled Stock Orders<br/><br/>
                    
                    </div>
                </div>
                
                <h3>Generate Report Related to Both Stock Orders & Other Purchases:</h3>
                <div className='btn-inline gray-box report-main'>
                    
                    <div className={this.state.stockOrderCat} style={{padding:"20px"}}>
                        <label>Select Order Status</label><br/>
                        <input type='checkbox' checked={this.state.confirmPend} name='confirmPend' onChange={this.handleCheckBoxChange}/>&nbsp;Confirmation Pending Stock Orders<br/>
                        <input type='checkbox' checked={this.state.pending} name='pendind' onChange={this.handleCheckBoxChange}/>&nbsp;Pending Stock Orders<br/>
                        <input type='checkbox' checked={this.state.received} name='received' onChange={this.handleCheckBoxChange}/>&nbsp;Received Stock Orders<br/>
                        <input type='checkbox' checked={this.state.canceled} name='canceled' onChange={this.handleCheckBoxChange}/>&nbsp;Canceled Stock Orders<br/><br/>
                    
                    </div>
                </div>

            </div>
            <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handlePopUp} className="popUp90 zoom-in">
                <h2>PDF Including Data You Selected is Generated</h2>
                <h4>A preview of the PDF is below & You can download it by 'Download' button</h4>
                <div className='PDFpreview'>
                    <h1 style={{color:"#ff5520"}}>Encore Thrifting Store</h1>
                    <h3>Details of Stock Orders that Categorized by Order Status</h3>
                    {this.state.confirmPend && 
                        <div style={{marginBottom:"20px"}}>
                            <h4>Confirmation Pending</h4>
                            <table className='pdfTable'  id='conPenTable'>
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
                                    {this.state.confirmationPendingOrders.map((results,index)=>(
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
                    }

                    {this.state.pending && 
                        <div style={{marginBottom:"20px"}}>
                            <h4>Pending</h4>
                            <table className='pdfTable'  id='penTable'>
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
                                    {this.state.pendingOrders.map((results,index)=>(
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
                    }

                    {this.state.received && <div>This is the div received.</div>}

                    {this.state.canceled && <div>This is the div canceled.</div>}

                </div>
                <div className='spec-btn-inline' style={{marginTop:"20px",marginBottom:"20px", width:"35%"}}>
                    <div className='btn-inline'>
                        <a href={`/purchasing/display-orders`}><button className="btn btn-primary" ><i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back</button></a> 
                        <a><button className="btn btn-primary" onClick={this.generatePDF} title="Download This in PDF Format"><i class="fa-solid fa-download"></i>&nbsp;&nbsp;Download PDF</button></a> 
                    </div> 
                </div>
            </ReactModal>
        </div>
        )
    }
}
