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
            isSupplierOpen:false,
            confirmPend:false,
            pending:false,
            received:false,
            canceled:false,
            confirmationPendingOrders:[],
            pendingOrders:[],
            receivedOrders:[],
            canceledOrders:[],
            searchQuery:"",
            stockOrderDetailsBySupplier:[],
            supplier: "",
            fromStockOrder: "",
            toStockOrder: "",
            errMsg: "",
            errMsgFrom: "",
        }
  
        this.handlePopUp = this.handlePopUp.bind(this)
        this.handleSupplierPopUp = this.handleSupplierPopUp.bind(this)
        this.getData = this.getData.bind(this)
        this.generateStockOrderStatusPDF = this.generateStockOrderStatusPDF.bind(this)
        this.generateStockOrderSupplierPDF = this.generateStockOrderSupplierPDF.bind(this)
        this.getDetasilsSupplier = this.getDetasilsSupplier.bind(this)
        this.inputHandleChange = this.inputHandleChange.bind(this)
        this.handleInputFromDateStockChange = this.handleInputFromDateStockChange.bind(this)
        this.handleInputToDateStockChange = this.handleInputToDateStockChange.bind(this)
    }

    inputHandleChange = (e) => {
        const { value, name} = e.target
        this.setState({
            ...this.state, [name]:value
        })
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
            axios.get("http://localhost:8000/purchasingGet/stockOrder/canceledAll").then(res =>{
                if(res.data.success){
                  this.setState({
                    canceledOrders:res.data.canceledOrders
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

    handleInputFromDateStockChange = (e) => {
        const value = e.target.value
        
        if(value==""){
            this.setState({
                errMsgFrom: "This Field is Required"
            }) 
        }
        else{
            this.setState({
                errMsgFrom: "",
                errMsg: "",
                fromStockOrder:value
            }) 
            if(new Date(value) < new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)){
                this.setState({
                    errMsgFrom: "",
                    fromStockOrder:value
                }) 
            }
            else{
                this.setState({
                    errMsgFrom: "You Cannot Select Future Date",
                    fromStockOrder:""
                }) 
            }
        }
    }

     handleInputToDateStockChange = (e) => {
        const value = e.target.value

        if(this.state.fromStockOrder==""){
            this.setState({
                toStockOrder:"",
                errMsg:`First, Select Date for 'From' Field`,
                errMsgFrom: "This Field is Required"
            }) 
        }
        else{
            if(new Date(value) < new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000)){
                if(new Date(this.state.fromStockOrder) <= new Date(value)){
                    this.setState({
                        toStockOrder:value,
                        errMsg:"",
                    }) 
                }
                else{
                    this.setState({
                        toStockOrder:"",
                        errMsg:`Select a Date After ' ${this.state.fromStockOrder} '`,
                    }) 
                }
            }
            else{
                this.setState({
                    toStockOrder:"",
                    errMsg:`You Cannot Select Future Date`,
                }) 
            }
        }
        
        
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
    
    handleSupplierPopUp(){
        this.getDetasilsSupplier()
    
        this.setState({isSupplierOpen:!this.state.isSupplierOpen})
    }

    generateStockOrderStatusPDF(){
        
        const pdf = new jsPDF()
        const columns = [];
        for (let i = 0; i < 7; i++) {
          columns.push({ header: `Column ${i + 1}`, dataKey: `col${i}` });
        }
        
        let headerY = 15
        let titleY = headerY + 8
        let confirmationY = 0
        let pendindY = 0
        let receivedY = 0
        let canceledY = 0

        pdf.setFontSize("28")
        pdf.setTextColor("#ff5520")
        pdf.text("Encore Thirfting Store",58,headerY)
        pdf.setFontSize("16")
        pdf.setTextColor("Black")
        pdf.text("Details of Specific Stock Orders Categorized by Order Status",32,titleY)
        
        const conOrderTable = () =>{ 
            pdf.setFontSize("14")
            pdf.setTextColor("black")
            pdf.text("Confirmation Pending Stock Orders",66,confirmationY)
            const conPenTable = document.getElementById('conPenTable')
            const {height, width} = conPenTable.getBoundingClientRect()
            const scaleFactor1 = pdf.internal.pageSize.width / width
            pdf.autoTable({
                html: '#conPenTable',
                startY: confirmationY+5,
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

        const pendingOrderTable = () => {
            pdf.setFontSize("14")
            pdf.setTextColor("black")
            pdf.text("Pending Stock Orders",78,pendindY)
            const penTable = document.getElementById('penTable')
            const {height, width} = penTable.getBoundingClientRect()
            const scaleFactor2 = pdf.internal.pageSize.width / width
            pdf.autoTable({
                html: '#penTable',
                startY: pendindY+5,
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
        
        const receivedOrderTable = () => {
            pdf.setFontSize("14")
            pdf.setTextColor("black")
            pdf.text("Received Stock Orders",78,receivedY)
            const resTable = document.getElementById('resTable')
            const {height, width} = resTable.getBoundingClientRect()
            const scaleFactor3 = pdf.internal.pageSize.width / width
            pdf.autoTable({
                html: '#resTable',
                startY: receivedY+5,
                theme: 'grid',
                margin: { top: 20, bottom: 20,  },
                tableWidth: 560 * scaleFactor3,
                columnStyles: {
                0: { fontStyle: 'bold' },
                },
                scaleFactor: scaleFactor3,
                columns
            })
        }

        const canceledOrderTable = () => {
            pdf.setFontSize("14")
            pdf.setTextColor("black")
            pdf.text("Canceled Stock Orders",78,canceledY)
            const cancelTable = document.getElementById('cancelTable')
            const {height, width} = cancelTable.getBoundingClientRect()
            const scaleFactor3 = pdf.internal.pageSize.width / width
            pdf.autoTable({
                html: '#cancelTable',
                startY: canceledY+5,
                theme: 'grid',
                margin: { top: 20, bottom: 20,  },
                tableWidth: 560 * scaleFactor3,
                columnStyles: {
                0: { fontStyle: 'bold' },
                },
                scaleFactor: scaleFactor3,
                columns
            })
        }

        if(this.state.confirmPend || this.state.pending || this.state.received || this.state.canceled){
            if(this.state.confirmPend && this.state.pending && this.state.received){
                confirmationY = titleY + 12
                conOrderTable()
                pendindY = pdf.lastAutoTable.finalY + 10
                pendingOrderTable()
                receivedY = pdf.lastAutoTable.finalY + 10 
                receivedOrderTable()
                if(this.state.canceled){
                    canceledY = pdf.lastAutoTable.finalY + 10
                    canceledOrderTable()
                }
            }
            else if(this.state.confirmPend == false && this.state.pending){
                pendindY = titleY + 12
                pendingOrderTable()
                if(this.state.received){
                    receivedY = pdf.lastAutoTable.finalY + 10
                    receivedOrderTable()
                }
                if(this.state.canceled){
                    canceledY = pdf.lastAutoTable.finalY + 10
                    canceledOrderTable()
                }
            }
            else if(this.state.received && this.state.pending == false && this.state.confirmPend == false){
                receivedY = titleY + 12
                receivedOrderTable()
                if(this.state.canceled){
                    canceledY = pdf.lastAutoTable.finalY + 10
                    canceledOrderTable()
                }
            }
            else if(this.state.canceled && this.state.received == false && this.state.pending == false && this.state.confirmPend == false){
                caches = titleY + 12
                canceledOrderTable()
            }
            else if(this.state.pending == false && this.state.confirmPend){
                confirmationY = titleY + 12
                conOrderTable()
                if(this.state.received){
                    receivedY = pdf.lastAutoTable.finalY + 10
                    receivedOrderTable()
                }
                if(this.state.canceled){
                    canceledY = pdf.lastAutoTable.finalY + 10
                    canceledOrderTable()
                }
            }
            else if(this.state.received == false && this.state.confirmPend ){
                confirmationY = titleY + 12
                conOrderTable()
                if(this.state.pending){
                    pendindY = pdf.lastAutoTable.finalY + 10
                    pendingOrderTable()
                }
                if(this.state.canceled){
                    canceledY = pdf.lastAutoTable.finalY + 10
                    canceledOrderTable()
                }
            }
        }
        /*else{
            pdf.setFontSize("28")
            pdf.setTextColor("#ff5520")
            pdf.text("This Report is Empty",60,titleY+10)
        }*/
        
        pdf.save("All Stock Orders.pdf")
        
    }

    getDetasilsSupplier(){
        axios.get(`http://localhost:8000/purchasingGet/stockOrder/searchSupplier?q=${this.state.supplier}`).then(res => {
       
                this.setState({
                    stockOrderDetailsBySupplier: res.data.searchedDetails,
                    
                })
                
            
            
        })
        
    }

    generateStockOrderSupplierPDF(){
        const pdf = new jsPDF()
        const columns = [];
        for (let i = 0; i < 7; i++) {
          columns.push({ header: `Column ${i + 1}`, dataKey: `col${i}` });
        }

        let headerY = 15
        let titleY = headerY + 8

        pdf.setFontSize("28")
        pdf.setTextColor("#ff5520")
        pdf.text("Encore Thirfting Store",58,headerY)
        pdf.setFontSize("16")
        pdf.setTextColor("Black")
        pdf.text(`Details of Stock Orders that Ordered from '${this.state.supplier}'`,32,titleY)
        pdf.setFontSize("14")
        
        const supplierTable = document.getElementById('supplierTable')
        const {height, width} = supplierTable.getBoundingClientRect()
        const scaleFactor1 = pdf.internal.pageSize.width / width
        pdf.autoTable({
            html: '#supplierTable',
            startY: titleY+5,
            theme: 'grid',
            margin: { top: 20, bottom: 20,  },
            tableWidth: 560 * scaleFactor1,
            columnStyles: {
            0: { fontStyle: 'bold' },
            },
            scaleFactor: scaleFactor1,
            columns
        })

        pdf.save(`All Stock Orders from ${this.state.supplier}.pdf`)

    }

    render() {
        let test = "not"
        if(this.state.canceled){
            test="tested"
        }

        const today = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0,10)
        return (
        <div className='Purchasing-others'>
            <h2 style={{marginTop:"70px"}}>Generate Report</h2>
            <div style={{overflowX:"scroll",height:"64vh"}}>
                <h3>Generate Report Related to Stock Orders:</h3>
                <div className='btn-inline report-main'>
                    
                    <div className='gray-box' style={{padding:"20px", width:'45%'}}>
                        <label>Select Order Status to Generate Report of Stock Orders Categorized by Order Status</label><br/>
                        <input type='checkbox' checked={this.state.confirmPend} name='confirmPend' onChange={this.handleCheckBoxChange}/>&nbsp;Confirmation Pending Stock Orders<br/>
                        <input type='checkbox' checked={this.state.pending} name='pending' onChange={this.handleCheckBoxChange}/>&nbsp;Pending Stock Orders<br/>
                        <input type='checkbox' checked={this.state.received} name='received' onChange={this.handleCheckBoxChange}/>&nbsp;Received Stock Orders<br/>
                        <input type='checkbox' checked={this.state.canceled} name='canceled' onChange={this.handleCheckBoxChange}/>&nbsp;Canceled Stock Orders<br/><br/>
                        <button className='btn btn-success' onClick={this.handlePopUp}>Generate PDF</button>
                    </div>
                   
                    <div className='gray-box' style={{padding:"20px", width:'45%'}}>
                        <label>Select Supplier to Generate Report of Stock Orders Categorized by Suppliers</label><br/>
                        <select className='form-select' style={{marginBottom:"60px"}} name='supplier' value={this.state.supplier}  onChange={this.inputHandleChange}>
                            <option >Any</option>
                            <option value={"Leaf Knowledge"}>Leaf Knowledge (PVT Ltd.)</option>
                            <option>ZOHO International</option>
                            <option>Alpha Wholesale Thirifting Ltd.</option>
                        </select>
                        <button className='btn btn-success' onClick={this.handleSupplierPopUp}>Generate PDF</button>
                    </div>
                </div>

                <div className='btn-inline report-main'>
                    <div className='gray-box' style={{padding:"20px", width:'100%'}}>
                        <label>Select Time Period to Generate Report of Stock Orders Which are Ordered in that Time Period</label><br/>
                        <div className='btn-inline' style={{marginTop:"20px"}}>
                            <div style={{width:'48%'}}>
                                <label style={{fontWeight:"unset"}}>From</label>
                                <input type='date' className='form-input' style={{marginBottom:"0px"}} name='fromStockOrder' max={today} value={this.state.fromStockOrder} onChange={this.handleInputFromDateStockChange}/>
                            </div>

                            <div style={{width:'48%'}}>
                                <label style={{fontWeight:"unset"}}>To</label>
                                <input type='date' className='form-input' style={{marginBottom:"0px"}} name='toStockOrder' max={today} min={this.state.fromStockOrder} value={this.state.toStockOrder} onChange={this.handleInputToDateStockChange}/>
                            </div>
                        </div>

                        <div className='btn-inline' style={{marginBottom:"20px"}}>
                            <div style={{color:"red", width:'48%'}}>{this.state.errMsgFrom}</div>
                            <div style={{color:"red", width:'48%'}}>{this.state.errMsg}</div>
                        </div>

                        <button className='btn btn-success' >Generate PDF</button>
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
                            <h4>Confirmation Pending Stock Orders</h4>
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
                            <h4>Pending Stock Orders</h4>
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

                    {this.state.received && 
                        <div style={{marginBottom:"20px"}}>
                            <h4>Received Stock Orders</h4>
                            <table className='pdfTable'  id='resTable'>
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
                                    {this.state.receivedOrders.map((results,index)=>(
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

                    {this.state.canceled && 
                        <div>
                            <h4>Canceled Stock Orders</h4>
                            <table className='pdfTable'  id='cancelTable'>
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
                                    {this.state.canceledOrders.map((results,index)=>(
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

                </div>
                <div className='spec-btn-inline' style={{marginTop:"20px",marginBottom:"20px", width:"35%"}}>
                    <div className='btn-inline'>
                        <a><button className="btn btn-primary" onClick={this.handlePopUp}> <i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back</button></a> 
                        <a><button className="btn btn-primary" onClick={this.generateStockOrderStatusPDF} title="Download This in PDF Format"><i class="fa-solid fa-download"></i>&nbsp;&nbsp;Download PDF</button></a> 
                    </div> 
                </div>
            </ReactModal>
            <ReactModal isOpen={this.state.isSupplierOpen} onRequestClose={this.handleSupplierPopUp} className="popUp90 zoom-in">
                <div style={{marginBottom:"20px"}}>
                    <h2>PDF Including Data You Selected is Generated</h2>
                    <h4>A preview of the PDF is below & You can download it by 'Download' button</h4>
                    <div className='PDFpreview'>
                        <h1 style={{color:"#ff5520"}}>Encore Thrifting Store</h1>
                        <h3>Details of Stock Orders that Ordered from '{this.state.supplier}'</h3>
                        <table className='pdfTable' id='supplierTable' >
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
                                {this.state.stockOrderDetailsBySupplier.map((results,index)=>(
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
                        <button className="btn btn-primary" onClick={this.handleSupplierPopUp} ><i class="fa-solid fa-arrow-left"></i>&nbsp;&nbsp;Back</button>
                        <a><button className="btn btn-primary" onClick={this.generateStockOrderSupplierPDF} title="Download This in PDF Format"><i class="fa-solid fa-download"></i>&nbsp;&nbsp;Download PDF</button></a> 
                    </div> 
                </div>
                </div>
            </ReactModal>
        </div>
        )
    }
}
