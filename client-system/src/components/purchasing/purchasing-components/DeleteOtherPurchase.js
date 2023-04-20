import React, { Component } from 'react'
import axios from 'axios'
import ReactModal from 'react-modal'

export default class DeleteOtherPurchase extends Component {
    constructor(props){
        super(props)
        this.state = {
            purID: props.purID,
            purDigitID: props.purDigitID,
            ID: props.ID,
            title: props.title,
            section: props.section,
            shop: props.shop,
            isOpenConfirm: false,
            isOpenIsSuccess: false,
            isSuccessMsg: "",
            redAlert: "",
        }
        this.handleConfirmPopUpOpen = this.handleConfirmPopUpOpen.bind(this)
        this.handleIsSuccessPopUpOpen = this.handleIsSuccessPopUpOpen.bind(this)
        this.onSubmitDelete = this.onSubmitDelete.bind(this)
        this.handlePopUpsClose = this.handlePopUpsClose.bind(this)
    }

    onSubmitDelete(){
        axios.delete(`http://localhost:8000/purchasingDelete/otherPurchase/delete/${this.state.ID}`).then(res => {
            this.setState({isSuccessMsg: "Purchase's Details are Deleted Successfully!"})
        }).catch(err => {
            console.error("Error Occured: ",err)
            this.setState({isSuccessMsg: "Deletion was not Occurred!"})
            this.setState({redAlert: "Something is Wrong! "})
        })
    }

    handleConfirmPopUpOpen(){
        this.setState({isOpenConfirm: true})
        this.setState({isOpenIsSuccess: false})
    }

    handleIsSuccessPopUpOpen(){
        this.setState({isOpenConfirm: false})
        this.setState({isOpenIsSuccess: true})
    }

    handlePopUpsClose(){
        this.setState({isOpenConfirm: false})
        this.setState({isOpenIsSuccess: false})
    }

    render() {
        return (
            <div>
                <button onClick={this.handleConfirmPopUpOpen} className='btn btn-danger'><i class="fa-regular fa-trash-can"></i>&nbsp;&nbsp;Delete</button>
                <ReactModal isOpen={this.state.isOpenConfirm}  className="popUp40 zoom-in">
                    <h2 style={{textAlign:'justify'}}>Do You Want to Delete the Purchase Containing Following Details?</h2>
                    <h5>
                        <table>
                            <tr>
                                <td>PurID</td>
                                <td>:</td>
                                <td style={{fontWeight:'normal'}}>&nbsp;&nbsp;&nbsp;{this.state.purID}{this.state.purDigitID}</td>
                            </tr>
                            <tr>
                                <td>Purchase's Title</td>
                                <td>:</td>
                                <td style={{fontWeight:'normal'}}>&nbsp;&nbsp;&nbsp;{this.state.title}</td>
                            </tr>
                            <tr>
                                <td>Purchased For</td>
                                <td>:</td>
                                <td style={{fontWeight:'normal'}}>&nbsp;&nbsp;&nbsp;{this.state.section}</td>
                            </tr>
                            <tr>
                                <td>Purchased From</td>
                                <td>:</td>
                                <td style={{fontWeight:'normal'}}>&nbsp;&nbsp;&nbsp;{this.state.shop}</td>
                            </tr>
                        </table>
                    </h5>
                    <button onClick={this.handlePopUpsClose} className='btn btn-primary' title='Cancel Deletion'>No</button>&nbsp;&nbsp;&nbsp;
                    <a onClick={this.handleIsSuccessPopUpOpen}><button onClick={this.onSubmitDelete} className='btn btn-danger' title='Delete Purchase'>Yes</button></a>   
                </ReactModal>
                <ReactModal isOpen={this.state.isOpenIsSuccess} className="popUp20 zoom-in">
                        <h2><span style={{color:"red"}}>{this.state.redAlert}</span>{this.state.isSuccessMsg}</h2>
                        <a href={`/purchasing/display-purchases`}><button className="btn btn-primary" >OK</button></a>&nbsp;&nbsp;&nbsp;
                        <a href={`/purchasing/purchasing-home`}><button className="btn btn-primary" ><i class="fa-solid fa-house"></i>&nbsp;Home</button></a> 
                </ReactModal>
            </div>
        )
    }
}
