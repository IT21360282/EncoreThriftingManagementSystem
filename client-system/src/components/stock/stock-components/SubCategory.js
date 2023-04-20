import React, { Component } from 'react';
import axios from 'axios';

class SubCategory extends Component {


    constructor(props){
        super(props)
        this.state ={
          
          subCategoryDetails: []
        }
      }
    
      componentDidMount(){
        this.retrieveCategoryDetails();
      }
        
      retrieveCategoryDetails(){
        axios.get("http://localhost:8000/subcategory/get").then(res =>{
          if(res.data.success){
            this.setState({
              subCategoryDetails:res.data.existingDetails
            })
          }
        });
      
      }
    


      onDelete = (id) =>{
        axios.delete(`http://localhost:8000/subcategory/delete/${id}`).then((res)=>{
          alert("Deleted Succesfully!");
          this.retrieveCategoryDetails()


        })
      }

      filterData(results,searchKey){
        const output = results.filter((postSearch)=>
        postSearch.pName.includes(searchKey)
        
        )

        this.setState({results:output})
      }

      handleSearchArea=(e)=>{

        console.log(e.currentTarget.value);
        const searchKey=e.currentTarget.value;

        axios.get("http://localhost:8000/subcategory/get").then(res =>{
          if(res.data.success){
            this.filterData(res.data.existingDetails,searchKey)
          }
        });



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
                <a href={`/stock/stock-home`}><button className='btn-back'><i class="fa-solid fa-arrow-left"></i> Back</button></a>



              </div>

            <div className='btn-inline' style={{marginTop:"20px"}} >
                <a href={`/stock/add-item`}><button className='btn-inline'>Add Item</button></a>
                <a href={`/stock/view-lowstock-item`}><button className='btn-inline'>Low Stock Item</button></a>
                <a href={`/stock/send-email`}><button className='btn-inline'>Send Email</button></a>
                <div><button className='search'><i class="fa-solid fa-magnifying-glass"></i></button><input className='search' name="searchQuery" placeholder='Search Details Here' onChange={this.handleSearchArea}></input></div>
              </div>

              <div>
                <table className='content-table'>
                  <thead className='tData'>
                    <tr>
                      <th scope="col"  style={{borderTopLeftRadius:"10px"}}>I/No</th>
                      <th scope="col" >Category Name</th>
                      <th scope="col" >Item Quantity</th>
                      <th scope="col" >Item Price</th>
                      <th scope="col" >Item Placed Date</th>
                      <th scope="col"  style={{border:"none",borderTopRightRadius:"10px"}}>Option</th>
                    </tr>

                  </thead>
                  <tbody scope="raw">
                  {this.state.subCategoryDetails.map((results,index)=>(
                    <tr>
                      
                      <td >{results.pId}</td>
                      <td >{results.pName}</td>
                      <td >{results.pQuantity}</td>
                      <td >{results.pPrice}</td>
                      <td >{results.pPlacedDate}</td>

                      <div >
                      <td ><a href={`/stock/edit-sub-item/${results._id}`}><button className="btn btn-warning">Edit</button></a></td>
                      <td ><button className="btn btn-danger" onClick={()=>this.onDelete(results._id)}>Delete</button></td>
                      <td ><a href={`/stock/item-view/${results._id}`}><button className="btn btn-primary">View</button></a></td>
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

export default SubCategory;



