import React, { Component } from 'react'
import ReactModal from 'react-modal'

export default class FilterOtherPurchases extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpenConfirm: false,
            isOpenIsSuccess: false,
            purchasedSection: "",
            paymentStatus: "",
            fromDate: "",
            toDate: "",
            fromQty: "",
            toQty: "",
            fromCost: "",
            toCost: "",
        }
        this.handleConfirmPopUpOpen = this.handleConfirmPopUpOpen.bind(this)
        this.handleIsSuccessPopUpOpen = this.handleIsSuccessPopUpOpen.bind(this)
        this.handlePopUpsClose = this.handlePopUpsClose.bind(this)
    }

    handleFilterInputChange = (e) => {
        const {name,value} = e.target
        this.setState({
          ...this.state, [name]:value
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
            <a><button className='btn-inline' onClick={this.handleConfirmPopUpOpen}>Add Filter</button></a>
                <ReactModal isOpen={this.state.isOpenConfirm}  className="popUp90 zoom-in" style={{content:{paddingLeft:"30px",paddingRight:"30px"}}}>
                    <h2 style={{textAlign:"center"}}>Add Filters for Other Purchases' Details</h2>
                    <div className='btn-inline'>
                        <div style={{width:"48%"}}>
                            <label>Section Which The Purchase is Done:</label><br/>
                            <select className='form-select' name='purchasedSection' value={this.state.purchasedSection} onChange={this.handleFilterInputChange}>
                                <option>Select One</option>
                                <option>Order Section</option>
                                <option>Financial Section</option>
                                <option>Purchasing Section</option>
                                <option>HR Section</option>
                                <option>Delivery Section</option>
                                <option>Packaging Section</option>
                                <option>Supplier Managing Section</option>
                                <option>Inventory</option>
                                <option>Thrift Store </option>
                                <option>Other</option>
                            </select><br/>
                            <label>Payment Status:</label><br/>
                            <select className='form-select' name='paymentStatus' value={this.state.paymentStatus} onChange={this.handleFilterInputChange}>
                                <option>Select One</option>
                                <option>Paid</option>
                                <option>Purchase on credit</option>
                                <option>Payment Status Details Pending</option>
                            </select>
                        </div>
                        <div style={{width:"48%"}}>
                            <label>Purchased Time Period:</label><br/>
                            <div className='div-frame' style={{padding:"10px"}}>
                                from:
                                <input type='date' className='form-input' name='fromDate' placeholder='' value={this.state.fromDate} onChange={this.handleFilterInputChange}/>
                                to:
                                <input type='date' className='form-input' name='toDate' placeholder='' value={this.state.toDate} onChange={this.handleFilterInputChange}/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className='btn-inline'>
                        <div style={{width:"48%"}}>
                        <label>Purchased Total Item Quantity:</label><br/>
                            <div className='div-frame' style={{padding:"10px"}}>
                                from:
                                <input type='number' min={0} className='form-input' name='fromQty' placeholder='' value={this.state.fromQty} onChange={this.handleFilterInputChange}/>
                                to:
                                <input type='number' min={0} className='form-input' name='toQty' placeholder='' value={this.state.toQty} onChange={this.handleFilterInputChange}/>
                            </div>
                        </div>
                        <div style={{width:"48%"}}>
                            <label>Total Cost of Purchase:</label><br/>
                            <div className='div-frame' style={{padding:"10px"}}>
                                from:
                                <input type='number' min={0} className='form-input' name='fromCost' placeholder='' value={this.state.fromCost} onChange={this.handleFilterInputChange}/>
                                to:
                                <input type='number' min={0} className='form-input' name='toCost' placeholder='' value={this.state.toCost} onChange={this.handleFilterInputChange}/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <br/>
                    <div className='spec-btn-inline' style={{marginTop:"10px", width:"33%"}}>
                        <div className='btn-inline'>
                            <button onClick={this.handlePopUpsClose} className='btn btn-primary' title='Cancel Deletion'>View All Details</button>&nbsp;&nbsp;&nbsp;
                            <a onClick={this.handleIsSuccessPopUpOpen}><button className='btn btn-success' title='Delete Purchase'>Add Filters</button></a>   
                        </div>
                    </div>
                </ReactModal>
        </div>
        )
    }
}
