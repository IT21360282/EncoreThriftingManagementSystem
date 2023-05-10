import axios from 'axios';
import React, { Component } from 'react';
import '../stock.css'

class ReleasedItem extends Component {


  constructor(props){
    super(props)
    this.state = {
      releasedItemDetails:[]
    }
  }

  componentDidMount(){
    this.retrieveReleasedDetails();
  }


  retrieveReleasedDetails(){
    axios.get("http://localhost:8000/releaseditem/get").then(res=>{
      if(res.data.success){
        this.setState({
          releasedItemDetails:res.data.existingDetails
        })
      }
    })
  }

  onDelete = (id) =>{
    axios.delete(`http://localhost:8000/released/delete/${id}`).then((res)=>{
      alert("Deleted Succesfully!");
      this.retrieveReleasedDetails()


    })
  }


    render() {
        const totalProduct = 23
        

        return (
            <div className='stock'>
                <div>

            <div className='btn-inline' style={{marginTop:"70px"}} >
                <div className='semi-preview-container'>Total Released Item<br/>{totalProduct}</div>
                <button className='btn-back'><i class="fa-solid fa-arrow-left"></i> Back</button>
                


              </div>

            

              <div>
                <a href={`/stock/add-released-item`}><button className='btn btn-warning' style={{marginTop:"15px"}}><i class="fa-solid fa-pen-to-square"></i> Add Released Item</button></a>
                <table className='content-table'>
                  <thead className='tData'>
                    <tr>
                      <th scope="col"  style={{borderTopLeftRadius:"10px"}}>C/No</th>
                      <th scope="col" >Disposed Item Name</th>
                      <th scope="col" >Item Category</th>
                      <th scope="col" >Item Quantity</th>
                      
                      
                      <th scope="col"  style={{border:"none",borderTopRightRadius:"10px"}}>Option</th>
                    </tr>

                  </thead>
                  <tbody scope="raw">
                  {this.state.releasedItemDetails.map((results,index)=>(
                    <tr>
                      <td >{results.pId}</td>
                      <td >{results.pName}</td>
                      <td >{results.pCategory}</td>
                      <td >{results.pQuantity}</td>
                      

                      <div >
                      <td ><a href={`../stock/stock-components/SubCategory.js`}><button className="btn btn-warning">Edit</button></a></td>
                      <td ><button className="btn btn-danger"  onClick={()=>this.onDelete(results._id)} >Delete</button></td>
                      <td ><a href={`/stock/view-released-item/${results._id}`}><button className="btn btn-primary">View</button></a></td>
                      </div>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
                
                
                
                
            </div>
                
            </div>
        );
    }
}

export default ReleasedItem ;