import React, { Component } from 'react'
import axios from 'axios'

export default class PurchasingCalculating extends Component {
    constructor(props){
        super(props)
        this.state = {
            allStockOrderDetails: [],
            allOtherPurchasesDetails: [],
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8000/purchasingGet/otherPurchase/getSorted").then(res => {
            if(res.data.success){
                this.setState({
                    allOtherPurchasesDetails: res.data.existingDetails
                })
            }
            
        })
        axios.get("http://localhost:8000/purchasingGet/stockOrder/getSorted").then(res =>{
          if(res.data.success){
            this.setState({
              allStockOrderDetails:res.data.existingDetails
            })
          }
        })
    }

  render() {
    const allOtherPurchases = this.state.allOtherPurchasesDetails.length
    const allStockOrder = this.state.allStockOrderDetails.length
    const allPurchases = allOtherPurchases + allStockOrder
    return (
      <div className='Purchasing-others'>
        <h2 style={{marginTop:"70px"}}>Analizing & Calculating</h2>
        <div className='btn-inline' style={{marginTop:"20px"}}>
            <div className='semi-preview-container'>All Stock Orders<br/>{allStockOrder}</div>
            <div className='semi-preview-container'>All Other Purchases<br/>{allOtherPurchases}</div>
            <div className='semi-preview-container'>All Purchases Done by Store<br/>{allPurchases}</div>
        </div>
        <div className='btn-inline'>
            <div className='div-frame' style={{width:"49%"}}>
                <h3>Calculator</h3>
            </div>
            <div className='div-frame' style={{width:"49%", textAlign:"justify"}}>
                <h3>Bar Chart - Between All Stock Order Count and All Other Purchases Count</h3>
            </div>
        </div>
      </div>
    )
  }
}
