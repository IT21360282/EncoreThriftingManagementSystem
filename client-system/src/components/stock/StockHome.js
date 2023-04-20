import React, { Component } from 'react'
import './stock.css'
import axios from 'axios'

export default class StockHome extends Component {

  constructor(props){
    super(props)
    this.state ={
      
      CategoryDetails: []
    }
  }

  componentDidMount(){
    
    

    axios.get("http://localhost:8000/maincategory/get").then(res =>{
      if(res.data.success){
        this.setState({
          CategoryDetails:res.data.existingDetails
        })
      }
    })
  }

  render() {

    const totalProduct = 23
    const allCategory = 3
    const outOfStock = 3
    
    
    return (
      
      
      <div className='stock'>
        <div>

        <div className='btn-inline' style={{marginTop:"140px"}} >
            <div className='semi-preview-container'>Total Product<br/>{totalProduct}</div>
            <div className='semi-preview-container'>All Category <br/>{allCategory}</div>
            <div className='semi-preview-container'>Out Of Stock<br/><div className='redNumb'>{outOfStock}</div></div>
            
            
          </div>

        <div className='btn-inline' style={{marginTop:"20px"}} >
            <a href={`/stock/add-item`}><button className='btn-inline'>Add Item</button></a>
            <button className='btn-inline'>Add Other Purchase</button>
            <button className='btn-inline'>View All Purchases</button>
            <div><button className='search'><i class="fa-solid fa-magnifying-glass"></i></button><input className='search' placeholder='Search Details Here'></input></div>
          </div>

          <div>
            <table className='content-table'>
              <thead className='tData'>
                <tr>
                  <th scope="col"  style={{borderTopLeftRadius:"10px"}}>C/No</th>
                  <th scope="col" >Category Name</th>
                  <th scope="col"  style={{border:"none",borderTopRightRadius:"10px"}}>Option</th>
                </tr>
                
              </thead>
              <tbody scope="raw">
              {this.state.CategoryDetails.map((results,index)=>(
                <tr>
                  <td >{results.cID}</td>
                  <td >{results.cName}</td>
                  <div className='btn-inline-table'>
                  <td ><a href={`/stock/sub-category`}><button className="btn btn-primary">View</button></a></td>
                  </div>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          

          
        </div>
      </div>
      
      
    )
  }
}
