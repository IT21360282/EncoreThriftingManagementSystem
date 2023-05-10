import React, { Component } from 'react'
import ReactModal from 'react-modal'
import axios from 'axios'

export default class CancelStockOrder extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            isOpenFinal: false,
            ID: props.ID,
            orderStatus: "",
            purID: "",
            purDigitID: "",
            title: "",
            supplier: "",
            isReceiveBtnDisabled: false,
            popUpMsg:"Order Status is Updated as 'Canceled' Successfully and Cancelation Email is Sent to the Supplier.",
            redAlert:"",
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
                purID:res.data.existingDetails.purID,
                title:res.data.existingDetails.title,
                supplier:res.data.existingDetails.supplier,
            }, () => {
                this.checkIsReceived()
            })
            
        }).catch(err => {
            console.error(err)
        })
    }

    checkIsReceived(){
        const orderStatus = this.state.orderStatus
        let isReceiveBtnDisabled = this.state.isReceiveBtnDisabled
        if(orderStatus == "Pending"){
            isReceiveBtnDisabled = true
        }
        if(orderStatus == "Received"){
            isReceiveBtnDisabled = true
        }
        if(orderStatus == "Canceled"){
            isReceiveBtnDisabled = true
        }
        
        this.setState({isReceiveBtnDisabled})
    }

    handlePopUp(){
        this.setState({isOpen:true})
        this.setState({isOpenFinal:false})
    }

    handleFinalPopUp(){
        this.setState({isOpenFinal:true})
        this.setState({isOpen:false})
    }

    handleClosePopUp(){
        this.setState({isOpen:false})
        this.setState({isOpenFinal:false})
    }

    onSubmit = (e) =>{
        e.preventDefault()

        const id = this.state.ID

        const data = {  
            orderStatus:"Canceled",
        }

        axios.put(`http://localhost:8000/purchasingPut/stockOrder/putOrderStatus/${id}`,data).then((res)=>{
            console.log("successfully updated")
        }).catch(error=>{
            console.error("error occurred")
            let popUpMsg = this.state.popUpMsg
            let redAlert = this.state.redAlert
            popUpMsg = "Order Cancelation is not occured, Please Try Again."
            redAlert = "Something Wrong! "
            this.setState({popUpMsg})
            this.setState({redAlert})
        })
    }

    render() {
        return (
        <div>
            <a onClick={this.handlePopUp}><button className="btn btn-danger"  disabled={this.state.isReceiveBtnDisabled}><i class="fa-solid fa-ban"></i>&nbsp;&nbsp;Cancel</button></a>
            <ReactModal isOpen={this.state.isOpen} onRequestClose={this.handleClosePopUp} className=" zoom-in" style={{content:{height:"45%"}}}>
                <h2>Do You Want to Cancel Following Stock Order?</h2>
                <h5>
                    <table>
                        <tr>
                            <td>PurID</td>
                            <td>:&nbsp;{this.state.purID}{this.state.purDigitID}</td>
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
                <h5><span style={{color:"red",fontSize:"20px"}}>*</span>After click 'Yes', 'Order Status' will be updated in database and sent a Cancelation email to the supplier. And also, you cannot able to undo this task.</h5>
                <button onClick={this.handleClosePopUp} className="btn btn-primary" >No</button>&nbsp;&nbsp;&nbsp;
                <a onClick={this.handleFinalPopUp}><button onClick={this.onSubmit} className="btn btn-warning" >Yes</button></a>
                
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
