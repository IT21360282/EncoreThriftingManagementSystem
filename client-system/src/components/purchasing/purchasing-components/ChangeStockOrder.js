import React, { Component } from 'react'
import ReactModal from 'react-modal'
import axios from 'axios'

export default class ChangeStockOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            isOpenFinal: false,
            ID: props.ID,
            orderStatus: "",
            purDigitID: "",
            title: "",
            supplier: "",
            isConfirmBtnDisabled: false,
            popUpMsg:"Order Status is Updated as 'Pending' Successfully!",
            redAlert:"",
        }

        this.handlePopUp = this.handlePopUp.bind(this)
        this.handleFinalPopUp = this.handleFinalPopUp.bind(this)
        
    }

    componentDidMount(){
        const id = this.state.ID
        axios.get(`http://localhost:8000/purchasingGet/stockOrder/get/${id}`).then(res =>{
            this.setState({
                orderStatus:res.data.existingDetails.orderStatus,
                purDigitID:res.data.existingDetails.purDigitID,
                title:res.data.existingDetails.title,
                supplier:res.data.existingDetails.supplier,
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
        this.setState({isOpen:!this.state.isOpen})
    }

    handleFinalPopUp(){
        this.setState({isOpenFinal:true})
    }

    onSubmit = (e) =>{
        e.preventDefault()

        const id = this.state.ID

        const data = {  
            orderStatus:"Pending",
        }

        axios.put(`http://localhost:8000/purchasingPut/stockOrder/putOrderStatus/${id}`,data).then((res)=>{
            console.log("successfully updated")
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

    render() {
        return (
        <div>
            <a onClick={this.handlePopUp}><button className="btn btn-warning"  disabled={this.state.isConfirmBtnDisabled}><i class="fa-solid fa-arrows-rotate"></i>&nbsp;&nbsp;Change</button></a>
            <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handlePopUp} style={{content: {width: '50%',height: '42%',margin:"auto",border:"2px solid #ff5520",borderRadius:"20px"}}}>
                <h2>Is Following Stock Order Confirmed?</h2>
                <h5>
                    <table>
                        <tr>
                            <td>PurID</td>
                            <td>:&nbsp;PO{this.state.purDigitID}</td>
                        </tr>
                        <tr>
                            <td>Order Title</td>
                            <td>:&nbsp;{this.state.title}</td>
                        </tr>
                        <tr>
                            <td>Supplier Name</td>
                            <td>:&nbsp;{this.state.supplier}</td>
                        </tr>
                    </table>
                </h5>
                <h5><span style={{color:"red",fontSize:"20px"}}>*</span>After click 'Yes', 'Order Status' will be updated in database and you cannot able to undo this.</h5>
                <button onClick={this.handlePopUp} className="btn btn-primary" >No</button>&nbsp;&nbsp;&nbsp;
                <a onClick={this.handleFinalPopUp}><button onClick={this.onSubmit} className="btn btn-warning" >Yes</button></a>
                <ReactModal isOpen={this.state.isOpenFinal} onRequestClose={this.handleFinalPopUp} style={{overlay:{backgroundColor:"transparent"}, content: {width: '50%',height: '42%',margin:"auto",border:"2px solid #ff5520",borderRadius:"20px"}}}>
                    <div style={{marginTop:"70px"}}>
                        <h2><span style={{color:"red"}}>{this.state.redAlert}</span>{this.state.popUpMsg}</h2>
                        <br/>
                        <a href={`/purchasing/${this.state.ID}`}><button className="btn btn-primary" >OK</button></a>&nbsp;&nbsp;&nbsp;
                        <a href={`/purchasing/display-orders`}><button className="btn btn-primary" >View All Orders</button></a>&nbsp;&nbsp;&nbsp;
                        <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;Home</button></a>
                    </div>
                </ReactModal>
            </ReactModal>
        </div>
        )
    }
}
