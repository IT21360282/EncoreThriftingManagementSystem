import React, { Component } from 'react'
import './financial.css'

export default class  extends Component {
  render() {
    return (
      <div className='financial'>
        
        <div >
          <div className='btn-111' style={{marginTop:"140px"}} >
            <a href={`/financial/AddPaymentDetails`}><button className='btn-111'>Add Payment Details</button></a>
            <a href={`/financial/AddBankDetails`}><button className='btn-111'>Add Bank Details</button></a>
            <a href={`/financial/ViewPaymentDetails`}><button className='btn-111'>View Payment Details</button></a>
            <a href={`/financial/ViewBankDetails`}><button className='btn-111'>View Bank Details</button></a>
            <a href={`/financial/UpdatePaymentDetails`}><button className='btn-111'>Update Payment Details</button></a>
             
          </div>
          </div>
          <div >
          <div className='btn-111' style={{marginTop:"40px"}} >
            <a href={`/financial/UpdateBankDetails`}><button className='btn-111'>Update Bank Details</button></a>
            <a href={`/financial/SalaryCalculation`}><button className='btn-111'>Salary Calculation</button></a>
            <a href={`/financial/Rates`}><button className='btn-111'>Rates</button></a>
            <a href={`/financial/SendMail`}><button className='btn-111'>Send an Email</button></a>
            <a href={`/financial/Report_Generating`}><button className='btn-111'>Report Generating</button></a>
            
          </div>
          </div>
          <br></br>
          <br></br>
          <div id="rectangle1">
            <center>
          <p1>As the financial manager I'm responsible in organizing , planning and calculating all the financial resourcers</p1>
          </center>
          </div>

        <br></br>
        <br></br>
        <p1><center>Financial Ratios</center></p1> <br></br>
        
        <div className='all'>
       <table>
        
        
       
      
        <td>
        <div id="containernew">
        <div><center>Debt Ratio</center> <div class="fhome-box " style={{width:"85%",height:"85%"}}></div>
        <div class="fhome-box-cont">
        
           </div></div>
          <div><center>Debt Ratio</center><br></br><br></br> Debt ratio measures the amount of leverage used by a organozation in terms
          of total debt to total assets.This ratio varies widely across industries, such  that capital-intensive businesses tend to have
          much higher ratio than others. Debt can be calculated by dividing total debt by total assets. </div>
          <div><center>Liquidity Ratio</center><br></br><br></br>In finance liquidity ratio consists two compartments such as current ratio
          and quick ratio.This is a measurement which is used to indicate whether a debtor will be able to pay their short-term debt off with
          the cash they havereadily available or whether they need additional capital to cover the amount.</div>
          <div><center>Return of Equity</center><br></br><br></br>The return of equity ratio essentially measures the rate of return that the
          owners of common stock of a company recieve on their shareholdings.Return of equity signifies how good the company is Generating
          returns on the investment it recieved from</div>
          
          </div>
        </td>
        </table>
        </div>

        
        
        <center>
            <p>Three main financial objectives</p>
          </center>
        <div id="container">
          <div><center>Financial Stability</center><br></br><br></br>This financial objective is not as common and is onlyused when necessary for the
          business to survive.Rather than increasing revenue or making a business more successfull,this objective helps preserve
          a business throughout a challenging time. </div>
          <div><center>Increase profit margings</center><br></br><br></br>Another common objective of finance is to increase profit
          margins from sales.Profit margins relate how much is made on each sale after considering the expenses,while revenue is the
          general amount of profit that a designated web-system makes.</div>
          <div><center>Return on investments</center><br></br><br></br>The objective is typically the most long term out of any financial
          objevtive.Investments can take time to see a return ,sometimes several years,so this can be a good objective to set in a addition
          to short-term goals.The two main types of investments are physical property and equipment.</div>
          </div>
          </div>

          
    )
  }
}
