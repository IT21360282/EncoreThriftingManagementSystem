import React, { Component } from 'react'
import './supplier.css'

export default class supplierHome extends Component {

  render() {
    return (
      <div className='supplier'>
      <div>
      <div className='btn-inlinesupplier' style={{marginTop:"140px", marginLeft:"200px"}} >
        <a href='/supplier/AddNewSupplier'><button className='btn-inline'>Add New Supplier</button></a>
        <a href='/supplier/DisplayAllSuppliers'><button className='btn-inlinesupplier'>Remove Supplier</button></a>
        <a href='/supplier/DisplayAllSuppliers'><button className='btn-inlinesupplier'>Update Supplier</button></a>
      </div>
      <div className='btn-inlinesupplier' style={{marginTop:"40px", marginLeft:"200px"}}>
        <a href='/supplier/DisplayAllSuppliers'><button className='btn-inlinesupplier'>Display All Suppliers</button></a>
        <a href='/supplier/BestSupplier'><button className='btn-inlinesupplier'>Find Best Supplier</button></a>
        <a href='/supplier/BestSupplier'><button className='btn-inlinesupplier'>Contact Supplier</button></a>
      </div>
      </div>
      
      <br></br>
      <br></br>
      <div id="rectanglesupplierhome">
      <br></br>
      <center>
      <p>As Supply Manager of Thrifting Management System, I want to manage all details about suppliers. Insert new suppliers' details such as supplier name, types of items and contact information (mobile number and email) to the System. Also, Supplier Management System allow to update, delete and display all suppliers' details in the database.</p>
      <br></br>
      <p>As Supply Manager of Thrifting Management System, I want to manage all details about suppliers who deliver the stocks on time.</p>
      </center>
      </div>
      <br/>
      <center>
      <div className='btn-inlinesupplier' style={{ width:"50%" ,marginTop:"auto" , marginLeft:"auto", fontSize:"20px"}}>
            <div className='semi-preview-container1'>Available Suppliers<br/>08</div>
            <div className='semi-preview-container1'>Best Suppliers<br/>04</div>
          </div>
          </center>

      </div>
    )
  }

}
