import axios from 'axios';
import React, { Component } from 'react';
import '../stock.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class DisposedItemList extends Component {


  constructor(props){
    super(props)
    this.state = {
      disposedItemDetails:[]
    }
  }

  componentDidMount(){
    this.retrieveDisposedDetails();
  }


  retrieveDisposedDetails(){
    axios.get("http://localhost:8000/disposeditem/get").then(res=>{
      if(res.data.success){
        this.setState({
          disposedItemDetails:res.data.existingDetails
        })
      }
    })
  }

  onDelete = (id) =>{
    axios.delete(`http://localhost:8000/disposeditem/delete/${id}`).then((res)=>{
     
      this.retrieveDisposedDetails()


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
                    theme='light'
                   />
                </div>
                <div>

            <div className='btn-inline' style={{marginTop:"80px"}} >
                <div className='semi-preview-container'>Total Disposed Item<br/>{totalProduct}</div>
                
                


              </div>

            

              <div>
                <a href={`/stock/add-disposed-item`}><button className='btn btn-warning' style={{marginTop:"15px"}}><i class="fa-solid fa-pen-to-square"></i> Add Disposed Item</button></a>
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
                  {this.state.disposedItemDetails.map((results,index)=>(
                    <tr>
                      <td >{results.pId}</td>
                      <td >{results.pName}</td>
                      <td >{results.pCategory}</td>
                      <td >{results.pQuantity}</td>
                      

                      <div >
                      <td ><a href={`/stock/edit-damaged-item/${results._id}`}><button className="btn btn-warning">Edit</button></a></td>
                      <td ><button className="btn btn-danger"  onClick={()=>{this.onDelete(results._id);displayLoginNotification()}} >Delete</button></td>
                      <td ><a href={`/stock/view-disposed-item/${results._id}`}><button className="btn btn-primary">View</button></a></td>
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

export default DisposedItemList ;