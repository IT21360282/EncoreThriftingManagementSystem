import React, { Component } from 'react'
import ReactModal from 'react-modal'
import axios from 'axios'

export default class ChangeStockOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            stockItemsInput:[],
            isOpen: false,
            isOpenFinal: false,
            ID: props.ID,
            orderStatus: "",
            purDigitID: "",
            title: "",
            supplier: "",
            paymentStatus: "",
            expectedDate: "",
            totalQty: 0,
            isConfirmBtnDisabled: false,
            popUpMsg:"Order is Changed Successfully and Sent an Email to Supplier Informing It",
            redAlert:"",
            stockItems:[],
            stockItemsQty:[],
            stockItemsUnitPrice:[],
            x:0,
            note:"",
        }

        this.handlePopUp = this.handlePopUp.bind(this)
        this.handleFinalPopUp = this.handleFinalPopUp.bind(this)
        this.handleClosePopUp = this.handleClosePopUp.bind(this)
        
    }

    componentDidMount(){
        const id = this.state.ID
        axios.get(`http://localhost:8000/purchasingGet/stockOrder/get/${id}`).then(res =>{
            this.setState({
                orderStatus:res.data.existingDetails.orderStatus,
                purDigitID:res.data.existingDetails.purDigitID,
                title:res.data.existingDetails.title,
                supplier:res.data.existingDetails.supplier,
                paymentStatus:res.data.existingDetails.paymentStatus,
                expectedDate:res.data.existingDetails.expectedDate,
                stockItems:res.data.existingDetails.stockItems,
                stockItemsQty:res.data.existingDetails.stockItemsQty,
                x:res.data.existingDetails.stockItems.length
            }, () => {
                this.checkIsConfirmed()
            })
            
        }).catch(err => {
            console.error(err)
        })
    }

    checkIsConfirmed(){
        const orderStatus = this.state.orderStatus
        let isConfirmBtnDisabled = this.state.isConfirmBtnDisabled
        if(orderStatus == "Pending"){
            isConfirmBtnDisabled = true
        }
        if(orderStatus == "Received"){
            isConfirmBtnDisabled = true
        }
        if(orderStatus == "Canceled"){
            isConfirmBtnDisabled = true
        }
        
        this.setState({isConfirmBtnDisabled})
    }

    handlePopUp(){
        this.setState({isOpen:true})
        this.setState({isOpenFinal:false})
    }

    handleFinalPopUp(){
        this.setState({isOpen:false})
        this.setState({isOpenFinal:true})
    }
    
    handleClosePopUp(){
        this.setState({isOpen:false})
        this.setState({isOpenFinal:false})
    }

    handleInputChange = (e) => {
        const {name,value} = e.target
        this.setState({
          ...this.state, [name]:value
        })
      }
    
      handleTitleInputChange = (e) => {
        const title = e.target.value
        if(title == ""){
          this.setState({
            title:title,
            titleErr:"Title is Required"
          })
        }
        else{
          this.setState({
            title:title,
            titleErr:""
          })
        }
      }
    
      handleSupplierInputChange = (e) => {
          const supplier = e.target.value
          if(supplier == ""){
            this.setState({
              supplier:supplier,
              supplierErr:"Supplier Name is Required"
            })
          }
          else if(supplier == "Select One"){
            this.setState({
              supplier:"",
              supplierErr:"Supplier Name is Required"
            })
          }
          else{
            this.setState({
              supplier:supplier,
              supplierErr:""
            })
          }
        }
    
      handleDateInputChange = (e) => {
        const selectedDate = e.target.value
        const today = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0,10)
        if(selectedDate < today){
          this.setState({
            expectedDate:'',
            errMsg:"You Cannot Select Past Date as Expected Date"
          })
        }
        else if(selectedDate == today){
          this.setState({
            expectedDate:'',
            errMsg:"You Cannot Select Today as Expected Date"
          })
        }
        else{
          this.setState({
            expectedDate:selectedDate,
            errMsg:""
          })
        }
      }
    
      handleItemInputChange = (e, index) => {
        const {name,value} =e.target
        const stockItems = [...this.state.stockItems]
        stockItems[index] = value
        this.setState({stockItems})
      }
      
      handleQtyInputChange = (e, index) => {
        const {name,value} =e.target
        const stockItemsQty = [...this.state.stockItemsQty]
        stockItemsQty[index] = value
        this.setState({stockItemsQty})
      }
      
      handleUnitPriceInputChange = (e, index) => {
        const {name,value} =e.target
        const stockItemsUnitPrice = [...this.state.stockItemsUnitPrice]
        stockItemsUnitPrice[index] = value
        this.setState({stockItemsUnitPrice})
      }
    
      handleAddStockItem = () => {
        const stockItemsInput = [...this.state.stockItemsInput]
        stockItemsInput.push('')
        this.setState({ stockItemsInput })
      }
    
      handleRemoveStockItem = (index, i) => {
        const stockItemsInput = [...this.state.stockItemsInput]
        const stockItems = [...this.state.stockItems]
        const stockItemsQty = [...this.state.stockItemsQty]
        const stockItemsUnitPrice = [...this.state.stockItemsUnitPrice]
        stockItemsInput.splice((index), 1)
        stockItems.splice((i),1)
        stockItemsQty.splice((i),1)
        stockItemsUnitPrice.splice((i),1)
        this.setState({ stockItemsInput })
        this.setState({ stockItems })
        this.setState({ stockItemsQty })
        this.setState({ stockItemsUnitPrice })
      }
      
      handleRemoveExistingStockItem = (index) => {
        const x = this.state.x
        const stockItems = [...this.state.stockItems]
        const stockItemsQty = [...this.state.stockItemsQty]
        const stockItemsUnitPrice = [...this.state.stockItemsUnitPrice]
        
        stockItems.splice((index),1)
        stockItemsQty.splice((index),1)
        stockItemsUnitPrice.splice((index),1)
        this.setState({ x:x-1 })
        this.setState({ stockItems })
        this.setState({ stockItemsQty })
        this.setState({ stockItemsUnitPrice })
      }

    onSubmit = (e) =>{
        e.preventDefault()

        const id = this.state.ID
        const {title, paymentStatus, expectedDate, stockItems, stockItemsQty} = this.state
        const data = {  
            title: title,
            paymentStatus: paymentStatus,
            expectedDate: expectedDate,
            stockItems: stockItems,
            stockItemsQty: stockItemsQty,
        }

        axios.put(`http://localhost:8000/purchasingPut/stockOrder/put/${id}`,data).then((res)=>{
            console.log("successfully updated")
            this.sendChangingEmail()
        }).catch(error=>{
            console.error("error occurred")
            let popUpMsg = this.state.popUpMsg
            let redAlert = this.state.redAlert
            popUpMsg = "Order Status is not Updated."
            redAlert = "Something Wrong! "
            this.setState({popUpMsg})
            this.setState({redAlert})
        })
    }
    sendChangingEmail(){
      const stocksItems = []
      for(let i = 0; i < this.state.stockItems.length; i++){
        stocksItems.push(
          `   • ${this.state.stockItems[i]} - ${this.state.stockItemsQty[i]}`
          ) 
      }
  
      const mailOptions = {
          name:`Order Manager of ${this.state.supplier}`,
          email:"nilankasanjana803@gmail.com",
          subject:`Change a Existing Order Under Title ${this.state.title}`,
          msg:`I hope this email finds you well. As the purchasing manager of our inventory, I would like to change existing ordered items as following items:\n${stocksItems}\nPlease provide me with the unit prices and any applicable discounts for these items. Also, please confirm the availability of the items and the estimated time of delivery.\n\nWe are expecting to receive the order by ${this.state.expectedDate}. Please let me know if this timeline is feasible and if there are any issues that may delay the delivery.\n\nIf everything is in order, please send me an invoice with the total cost of the items, including any taxes or shipping fees.\n\n${this.state.note}\n\nThank you for your prompt attention to this matter and sorry for the inconvinience. I look forward to hearing from you soon.\n\nBest regards,\nSanjana Nilanka\nPurchasing Manager,\nEncore Thrift Store\n`
      }
  
      axios.post('http://localhost:8000/purchasingPost/sendEmail',mailOptions).then((res) => {
          console.log(res)
          this.setState({isSuccess:true})
          
      }).catch((err) => {
          console.log(err)
          this.setState({isSuccess:false})
      })
    }

    render() {
        const { stockItemsInput } = this.state

        const itemTypeQty = this.state.stockItems.length

        let totalQty = this.state.totalQty
        for(let i = 0; i < this.state.stockItemsQty.length; i++){
            totalQty = totalQty + parseInt(this.state.stockItemsQty[i])
        }

        const x=this.state.x
        const existingItems = []
        for(let i = 1; i < (x);i++){
            existingItems.push(
              <div key={i} style={{marginTop:"10px"}}>
                <input type="text" className='add-stock-input' onFocus={this.titleSupplierValidation} value={this.state.stockItems[i]} onChange={(event) => this.handleItemInputChange(event, (i))} />
                <input type="text" className='add-stock-qty-input' onFocus={this.titleSupplierValidation} value={this.state.stockItemsQty[i]} onChange={(event) => this.handleQtyInputChange(event, (i))} />
                <button type="button" className='remove-stock-input' onClick={() => this.handleRemoveExistingStockItem(i)}><i class="fa-solid fa-minus"></i></button>
              </div>
            )
        }
        return (
        <div>
            <a onClick={this.handlePopUp}><button className="btn btn-warning"  disabled={this.state.isConfirmBtnDisabled}><i class="fa-solid fa-arrows-rotate"></i>&nbsp;&nbsp;Change</button></a>
            <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handleClosePopUp} className="popUp90 zoom-in">
               
                <h2 >Change Stock Order Under PurID <span style={{color:"#ff5520"}}>PS{this.state.purDigitID}</span></h2>

                <div>
                    <label>Title of Order:</label>
                    <input type='text' className='form-input-purchasing' style={{marginBottom:"0px", color:"#808080"}} name='title' placeholder='Title' value={this.state.title} onChange={this.handleTitleInputChange} readOnly/><br/>
                    <div style={{marginBottom:"15px", textAlign:"justify"}}>
                    <   span style={{color:"red",fontWeight:"bolder", fontSize:"20px"}}>* </span>You Cannot Change Title. Because it will be helped to identify which order is changed to supplier
                    </div>
                    <label>Select Supplier:</label>
                    <input className='form-input-purchasing' style={{marginBottom:"0px", color:"#808080"}} name='supplier' value={this.state.supplier} onFocus={this.titleValidation} onChange={this.handleSupplierInputChange} title='You Cannot Change Supplier' readOnly/>
                    <div style={{marginBottom:"15px"}}>
                    <   span style={{color:"red",fontWeight:"bolder", fontSize:"20px"}}>* </span>You Cannot Change Supplier. If You Placed Order to Wrong Supplier, Please Cancel this Order & Place Again the Order to Right Supplier
                    </div>
                    <label>Order Expected Day:</label>
                    <input type='date' className='form-input-purchasing' style={{marginBottom:"0px"}} name='expectedDate' placeholder='' value={this.state.expectedDate} onFocus={this.titleSupplierValidation} onChange={this.handleDateInputChange}/>
                    <div style={{color:"red",marginBottom:"15px"}}>{this.state.errMsg}</div>
                    <label>Payment:</label>
                    <select className='form-select-purchasing' name='paymentStatus' value={this.state.paymentStatus} onFocus={this.titleSupplierValidation} onChange={this.handleInputChange}>
                        <option>Select One</option>
                        <option>Paid</option>
                        <option>Payment Pending</option>
                        <option>Send to Financial Manager</option>
                    </select><br/>
                    <label>Note for Supplier:</label>
                    <textarea className='form-textarea-purchasing' name='note' value={this.state.note} onChange={this.handleInputChange} cols={30} rows={6} onFocus={this.titleSupplierValidation} placeholder='Special Note for Supplier'></textarea>
                    
                </div>

                <div >
                    <label>Add Stock Items:</label><br/>
                    <div className='div-frame add-stock-input' >
                    
                    <div className='btn-inline'>
                    <div className='add-item-input' style={{width:"86%"}}>Item Name</div>
                        <div className='add-item-price-input'style={{width:"12%"}}>Qty</div>
                    </div>

                    <div key="0" style={{marginTop:"10px"}}>
                        <input type="text" className='add-stock-input' onFocus={this.titleSupplierValidation} value={this.state.stockItems[0]} onChange={(event) => this.handleItemInputChange(event, 0)} />
                        <input type="text" className='add-stock-qty-input' onFocus={this.titleSupplierValidation} style={{width:"12%",borderTopRightRadius:"8px",borderBottomRightRadius:"8px"}} value={this.state.stockItemsQty[0]} onChange={(event) => this.handleQtyInputChange(event, 0)} />
                    </div>   
                    {existingItems}
                    {stockItemsInput.map((input, index) => (
                        <div key={x+index} style={{marginTop:"10px"}}>
                        <input type="text" className='add-stock-input' onFocus={this.titleSupplierValidation} value={this.state.stockItems[index+x]} onChange={(event) => this.handleItemInputChange(event, (index+x))} />
                        <input type="text" className='add-stock-qty-input' onFocus={this.titleSupplierValidation} value={this.state.stockItemsQty[index+x]} onChange={(event) => this.handleQtyInputChange(event, (index+x))} />
                        <button type="button" className='remove-stock-input' onClick={() => this.handleRemoveStockItem(index, x+index)}><i class="fa-solid fa-minus"></i></button>
                        </div>
                    ))}
                    <button className="btn btn-success" style={{right:"0",marginTop:"10px"}} type="button" onClick={this.handleAddStockItem}><i class="fa-solid fa-plus"></i>&nbsp;&nbsp;Add Another Item</button>
                    <div className='btn-inline' style={{marginBottom:'5px', marginTop:'15px'}}>
                        <div className='form-preview-container'>Item Type quantity<br/><span style={{color:"red",fontSize:"20px"}}>{itemTypeQty}</span></div> 
                        <div className='form-preview-container'>Total Item Quantity<br/><span style={{color:"red",fontSize:"20px"}}>{totalQty}</span></div>
                    </div>
                    <div style={{textAlign:"justify"}}>
                        <p><span style={{color:"red"}}>*</span>When order will be placed, Unit prices of each item set as 'null'. You can update that unit prices after confirming the order according to given prices by supplier.</p>               
                    </div>
                    </div>
                </div>


                <div>
                    <div style={{textAlign:"justify"}}>
                    <p style={{width:"100%"}}><span style={{color:"red"}}>*</span>When place the order, An email informing about order will be sent to the relevent supplier. You can able to change or cancel order untill order will be confirmed.</p>
                    </div>
                    <div className='spec-btn-inline' style={{marginTop:"20px", width:"60%"}}>
                        <div className='btn-inline' >
                            <br/>
                            <br/>
                            <a ><button onClick={this.handleClosePopUp} className="btn btn-primary" >Doesn't Change</button></a>&nbsp;&nbsp;&nbsp;
                            <button className="btn btn-warning" type='reset' >Reset</button>&nbsp;&nbsp;&nbsp;
                            <a onClick={this.handleFinalPopUp} ><button onClick={this.onSubmit} className="btn btn-success" >Change Stock Order</button></a>
                        </div>
                    </div>
                    <br/>

                </div>
 
            </ReactModal>
            <ReactModal isOpen={this.state.isOpenFinal} onRequestClose={this.handleClosePopUp} className=" zoom-in" style={{content:{height:"25%"}}}>
                    <div >
                    <h2><span style={{color:"red"}}>{this.state.redAlert}</span>{this.state.popUpMsg}</h2>
                    <a href={`/purchasing/${this.state.ID}`}><button className="btn btn-primary" >OK</button></a>&nbsp;&nbsp;&nbsp;
                    <a href={`/purchasing/display-orders`}><button className="btn btn-primary" >View All Orders</button></a>&nbsp;&nbsp;&nbsp;
                    <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;Home</button></a>
                </div>
            </ReactModal>
        </div>
        )
    }
}
