import axios from 'axios';
import React, { Component } from 'react';
import '../stock.css';
import { toast, ToastContainer } from "react-toastify";



class DamagedItemList extends Component {


  

  constructor(props){
    super(props)
    this.state = {
      damagedItemDetails:[]
    }
  }

  componentDidMount(){
    this.retrieveDamagedDetails();
  }

  


  retrieveDamagedDetails(){
    axios.get("http://localhost:8000/damageditem/get").then(res=>{
      if(res.data.success){
        this.setState({
          damagedItemDetails:res.data.existingDetails
        })
      }
    })
  }

  onDelete = (id) =>{
    axios.delete(`http://localhost:8000/damageditem/delete/${id}`).then((res)=>{
      
      this.retrieveDamagedDetails()


    })
  }

  

    render() {
        const totalProduct = 23
        const displayLoginNotification = () => {
          toast.success("Deleted Succesfully");
        };

        

        
        

        return (

          
            <div className='stock'>
              <div className='App'>
                  <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='dark'
                    
                    
                   />
                </div>
                <div>

            <div className='btn-inline' style={{marginTop:"80px"}} >
                <div className='semi-preview-container'>Total Damaged Item<br/>{totalProduct}</div>
                
                


              </div>

            

              <div>
                <a href={`/stock/add-damaged-item`}><button className='btn btn-warning' style={{marginTop:"15px"}}><i class="fa-solid fa-pen-to-square"></i> Add Damaged Item</button></a>
                <table className='content-table'>
                  <thead className='tData'>
                    <tr>
                      <th scope="col"  style={{borderTopLeftRadius:"10px"}}>C/No</th>
                      <th scope="col" >Damaged Item Name</th>
                      <th scope="col" >Item Category</th>
                      <th scope="col" >Item Quantity</th>
                      
                      
                      <th scope="col"  style={{border:"none",borderTopRightRadius:"10px"}}>Option</th>
                    </tr>

                  </thead>
                  <tbody scope="raw">
                  {this.state.damagedItemDetails.map((results,index)=>(
                    <tr>
                      <td >{results.pId}</td>
                      <td >{results.pName}</td>
                      <td >{results.pCategory}</td>
                      <td >{results.pQuantity}</td>
                      

                      <div >
                      <td ><a href={`/stock/edit-sub-item/${results._id}`}><button className="btn btn-warning">Edit</button></a></td>
                      <td ><button className="btn btn-danger"  onClick={()=>{this.onDelete(results._id);displayLoginNotification()}} >Delete</button></td>
                      <td ><a href={`/stock/view-damaged-item/${results._id}`}><button className="btn btn-primary">View</button></a></td>
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

export default DamagedItemList;