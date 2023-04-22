import React, { Component } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { toast, ToastContainer } from "react-toastify";

class SubCategory extends Component {


    constructor(props){
        super(props)
        this.state ={

          
            pName:"",
            pCategory:"",
            pQuantity:"",
            pPrice:"",
            pImageURL:"",
            pDescription:"",
            pLevel:"",
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
          
          this.retrieveCategoryDetails()


        })
      }

      filterData(results,searchKey){
        const output = results.filter((postSearch)=>
        postSearch.pName.includes(searchKey),
        
        
        
        )

        this.setState({subCategoryDetails:output})
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

      

    

    handleInputChange=(e)=>{
        const {name,value} = e.target;

        this.setState({
            ...this.state,
            [name]:value
        })
    }

    onSubmit=(e)=>{


        e.preventDefault();


        const{pName,pCategory,pQuantity,pPrice,pPlacedDate,pImageURL,pDescription,pLevel}=this.state;

        
        const data ={
            
            
            pName:pName,
            pCategory:pCategory,
            pQuantity:pQuantity,
            pPrice:pPrice,
            pPlacedDate:pPlacedDate,
            pImageURL:pImageURL,
            pDescription:pDescription,
            pLevel:pLevel
        }

        console.log(data)

        axios.post("http://localhost:8000/subcategory/post",data).then((res)=>{
            if(res.data.success){
                this.setState(
                    {
                        
                        pName:"",
                        pCategory:"",
                        pQuantity:"",
                        pPrice:"",
                        pPlacedDate:"",
                        pImageURL:"",
                        pDescription:"",
                        pLevel:""
                    }
                )
            }
        })

    }






    render() {

        const totalProduct = 23
        const allCategory = 3
        const outOfStock = 3
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

            <div className='btn-inline' style={{marginTop:"140px"}} >
                <div className='semi-preview-container'>Total Product<br/>{totalProduct}</div>
                <div className='semi-preview-container'>All Category <br/>{allCategory}</div>
                <div className='semi-preview-container'>Out Of Stock<br/><div className='redNumb'>{outOfStock}</div></div>
                <a href={`/stock/sub-category`}><button className='btn-back'><i class="fa-sharp fa-solid fa-rotate-right"></i> Refresh</button></a>
                <a href='/stock/sub-category'><button className='btn-back'><i class="fa-solid fa-arrow-left"></i> Back</button></a>



              </div>

            <div className='btn-inline' style={{marginTop:"20px"}} >
            <div>









			<Popup  trigger=
				{<button className='btn-inline'> Add Item </button>}
				modal nested>
				{
					close => (
						<div className='modal' >
							<div className='stock'>
                <div> 
                <div className='my-add' >
                  <h2 className='popup-head'>Add Item</h2>
                  <button className='close-btn' onClick={() => close()}><i class="fa-solid fa-xmark"></i></button>

                  </div>
                  <form className='' > 
                  <div className='popUp-form' >
                    <div style={{width:"100%"}}> 
                      <div className='label-1'>
                      <label >Product Name:</label><br/>
                      <input type='text' className='form-enter' name='pName' placeholder='Enter Name'  value={this.state.pName} onChange={this.handleInputChange} /><br/>
                      </div>

                      <div className='label-1'>
                      <label>Product Category:</label><br/>
                      <select className='form-enter' name='pCategory' value={this.state.pCategory} onChange={this.handleInputChange}>
                        <option>Select One</option>
                        <option>Electronics</option>
                        <option>Books</option>
                        <option>Clothes</option>
                      </select><br/>
                      </div>

                      <div className='label-1'>
                      <label>Product Quantity:</label><br/>
                      <input type='number' className='form-enter' name='pQuantity' placeholder='10' value={this.state.pQuantity} onChange={this.handleInputChange}/><br/>
                      </div>

                      <div className='label-1'>
                      <label>Product Reorder Level:</label><br/>
                      <input type='number' className='form-enter' name='pLevel' placeholder='10' value={this.state.pLevel} onChange={this.handleInputChange}/><br/>
                      </div>
                      
                      <div className='label-1'>
                      <label>Unit Price(LKR):</label><br/>
                      <input type='number' className='form-enter' name='pPrice' placeholder='Rs:1000' value={this.state.pPrice} onChange={this.handleInputChange}/><br/>
                      </div>

                      <div className='label-1'>
                      <label>Date:</label><br/>
                      <input type='date' className='form-enter' name='pPlacedDate' placeholder='' value={this.state.pPlacedDate} onChange={this.handleInputChange}/><br/>
                      </div>


                      <div className='label-1'>
                      <label>Product Image URL:</label><br/>
                      <input type='text' className='form-enter' name='pImageURL' placeholder='https://www.abcd.com' value={this.state.pImageURL} onChange={this.handleInputChange}/><br/>
                      </div>

                      <div className='label-1'>
                      <label>Product Description:</label><br/>
                      <textarea className='form-textarea' rows={2} cols={20} type="text" name='pDescription' placeholder='Enter Item Details' value={this.state.pDescription} onChange={this.handleInputChange}></textarea><br/>
                      </div>
                     <div className='buttn-success-1'>
                      <button className="btn btn-success" type='submit' style={{marginTop:"15px"}} onClick={this.onSubmit}><i class="fa-regular fa-square-check" style={{marginRight:"10px"}}></i>Save</button>
                      
										
								
                      </div>
                    </div>
                    
                  </div>
                  
                  </form>
                  
                </div>
      </div>
							<div>
								
							</div>
						</div>
					)
				}
			</Popup>

      







		</div>
                <a href={`/stock/add-item`}><button className='btn-inline'>Add Item</button></a>
                <a href={`/stock/view-lowstock-item`}><button className='btn-inline'>Low Stock Item</button></a>
                <a href={`/stock/send-email`}><button className='btn-inline'>Send Email</button></a>
                <div><button className='search-1'><i class="fa-solid fa-magnifying-glass"></i></button><input className='search-1' name="searchQuery" placeholder='Search Details Here' onChange={this.handleSearchArea}></input></div>
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
                      
                      <td >IT{String(index+1).padStart(5,"0")}</td>
                      <td >{results.pName}</td>
                      <td >{results.pQuantity}</td>
                      <td >{results.pPrice}</td>
                      <td >{results.pPlacedDate}</td>

                      <div >
                      <td ><a href={`/stock/edit-sub-item/${results._id}`}><button className="btn btn-warning">Edit</button></a></td>
                      <td >
                      <Popup className='popup' trigger=
                            {<button className="btn btn-danger" >Delete</button>}
                            modal nested>
                            
                            {
                              close => (
                                <div className='modal' >
                                <div className='stock'>
                                  <div> 
                                  <div className='my-add' >
                                    <h2 className='popup-head'>Delete Item!!!</h2>
                                    <div style={{marginTop:"100px"}}>
                                    {results.pName}
                                    
                                    </div>
                                    <button className='btn btn-danger' onClick={()=>{this.onDelete(results._id);displayLoginNotification();close()}}>Delete</button>
                                    <button className='close-btn' onClick={() => close()}><i class="fa-solid fa-xmark"></i></button>

                                    </div>
                                    </div>
                                  </div>
                                  </div>
                              )}</Popup>
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        
                        </td>
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



