import React, { Component } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import jsPDF from 'jspdf'
import 'jspdf-autotable';



import { toast, ToastContainer } from "react-toastify";

class SubCategory extends Component {

 

    constructor(props){
        super(props)
        this.state ={

            
            pName:"",
            pCategory:"",
            pQuantity:"",
            pSubCategory:"",
            pPrice:"",
            pImageURL:"",
            pPlacedDate:"",
            pDescription:"",
            pLevel:"",
            subCategoryDetails: [],
            errors: {},
               
        }
        
      }

      

      generatePDF() {
        
        const itemTable = document.getElementById("itemDetailsTable")
        const {height, width} = itemTable.getBoundingClientRect()
        const pdf = new jsPDF()

        pdf.setFontSize("28")
        pdf.setTextColor("#ff5520")
        pdf.text("Encore Stock Management",50,25)
        
        
        

        const columns = [];
        for (let i = 0; i < 7; i++) {
          columns.push({ header: `Column ${i + 1}`, dataKey: `col${i}` });
        }

        const scaleFactor = pdf.internal.pageSize.width / width
        pdf.autoTable({
            html: '#itemDetailsTable',
            startY: 42,
            theme: 'grid',
            margin: { left:22,top: 20, bottom: 20,  },
            tableWidth: 950 * scaleFactor,
            columnStyles: {
              0: { fontStyle: 'bold' },
            },
            scaleFactor: scaleFactor,
            columns
        })


        pdf.setFontSize("16")
        pdf.setTextColor("#00baa1")
        pdf.text("Item Table Details",82,35)
        pdf.save("item.pdf")
      
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
          postSearch.pName.toLowerCase().includes(searchKey) ||
          postSearch.pSubCategory.toLowerCase().includes(searchKey)||
          postSearch.pQuantity.includes(searchKey)||
          postSearch.pPlacedDate.includes(searchKey)||
          postSearch.pPrice.includes(searchKey)||
          postSearch.pName.includes(searchKey) ||
          postSearch.pSubCategory.includes(searchKey)||
          postSearch.pLevel.includes(searchKey)
        
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

        const errors = { ...this.state.errors };
        if (errors[name]) {
          delete errors[name];
        }
        this.setState({ [name]: value, errors });

        this.setState({
            ...this.state,
            [name]:value
        })
    }


    // validation for

    onSubmit=(e)=>{


        e.preventDefault();


        

        


        const{pName,pCategory,pSubCategory,pQuantity,pPrice,pPlacedDate,pImageURL,pDescription,pLevel}=this.state;

        


        
        const data ={
            
            
            pName:pName,
            pCategory:pCategory,
            pSubCategory:pSubCategory,
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
                        pSubCategory:"",
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

        window.location.reload()

    }


    






    render() {

      const{pName,pCategory,pSubCategory,pQuantity,errors}=this.state;


      let outOfStock=0
      this.state.subCategoryDetails.map((results,index)=>{
        if(results.pQuantity<=results.pLevel){
          outOfStock=outOfStock+1

        }
      })

      let totalProduct=0
      this.state.subCategoryDetails.map((results,index)=>{
        if(results.pSubCategory.length>0){
          totalProduct=totalProduct+1
        }
      })

      let allItem=0
      
        
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

            <div className='btn-inline' style={{marginTop:"65px"}} >
                <div className='semi-preview-container'>Total Product<br/>{totalProduct}</div>
                <div className='semi-preview-container'>All Item Count <br/>{allItem}</div>
                <div className='semi-preview-container'>Out Of Stock<br/><div className='redNumb'>{outOfStock}</div></div>
                <a href={`/stock/sub-category`}><button className='btn-back'><i class="fa-sharp fa-solid fa-rotate-right"></i> Refresh</button></a>
                <a href='/stock/sub-category'><button className='btn-back'><i class="fa-solid fa-arrow-left"></i> Back</button></a>



              </div>

            <div className='btn-inline' style={{marginTop:"8px"}} >
            <div>



			<Popup  trigger=
				{<button className='btn-inline'> Add Item </button>}
				modal nested>
				{
					close => (
						<div className='modal' >
							<div className='stock'>
                <div > 
                <div className='my-add' >
                  <h3 className='popup-head-add-item'>Add Item</h3>
                  <button className='close-btn' onClick={() => close()}><i class="fa-solid fa-xmark"></i></button>
                  </div>
                  <form className='add-form'  > 
                  <div className='popUp-form' >
                    <div style={{width:"100%"}}> 
                      <div className='label-1'>
                      <label >Product Name:</label><br/>
                      <input type='text' id="username" className='form-enter' name='pName' placeholder='Enter Name'  value={this.state.pName} onChange={this.handleInputChange} aria-errormessage='username-error' required />
                      
                      {errors.pName && (
                      <div class="error-msg" style={{ color: "red" }}>{errors.pName}</div>
                    )}
                      </div>

                      <div className='label-1'>
                      <label>Product Category:</label><br/>
                      <select className='form-enter' name='pCategory' value={this.state.pCategory} onChange={this.handleInputChange}>
                        <option>--Select a category--</option>
                        <option>Electronics</option>
                        <option>Books</option>
                        <option>Clothes</option>
                      </select><br/>
                      {errors.pCategory && (
                      <div style={{ color: "red" }}>{errors.pQuantity}</div>
                    )}
                      <div className='label-2'>
                      <label>Subcategory:</label><br/>
                        <select className='form-enter' name='pSubCategory' value={this.state.pSubCategory} onChange={this.handleInputChange}>
                          <option value="">--Select a subcategory--</option>
                          {
                            this.state.pCategory=== 'Books' ?
                            <>
                              <option value="novel">Novel</option>
                              <option value="story">Story</option>
                            </> :
                            this.state.pCategory === 'Electronics' ?
                            <>
                              <option value="phone">mobile-Phone</option>
                              <option value="tv">TV</option>
                              <option value="laptop">Laptop</option>
                              <option value="radio">Radio</option>
                              <option value="hometheater">HomeTheater</option>
                              
                            </> :
                            this.state.pCategory=== 'Clothes' ?
                            <>
                              <option value="short">Short</option>
                              <option value="t-shirt">T-shirt</option>
                              <option value="trouser">Trouser</option>
                              <option value="frock">Frock</option>
                              <option value="skirt">Skirt</option>
                              <option value="blouse">Blouse</option>
                            </> :
                            null
                          }
                        </select>
                        </div>
                      
                      
                      {errors.pSubCategory && (
                      <div style={{ color: "red" }}>{errors.pSubCategory}</div>
                    )}

                      
                      <label>Product Quantity:</label><br/>
                      <input type='number' min={0} className='form-enter' name='pQuantity' placeholder='10' value={this.state.pQuantity} onChange={this.handleInputChange}/><br/>
                      
                      {errors.pQuantity && (
                        <div style={{ color: "red" }}>{errors.pQuantity}</div>
                      )}

                      
                      <label>Product Reorder Level:</label><br/>
                      <input type='number' className='form-enter' name='pLevel' placeholder='10' value={this.state.pLevel} onChange={this.handleInputChange}/><br/>
                      
                      {errors.pLevel && (
                        <div style={{ color: "red" }}>{errors.pLevel}</div>
                      )}
                      
                      
                      <label>Unit Price(LKR):</label><br/>
                      <input type='number' className='form-enter' name='pPrice' placeholder='Rs:1000' value={this.state.pPrice} onChange={this.handleInputChange}/><br/>
                      
                      {errors.pPrice && (
                        <div style={{ color: "red" }}>{errors.pPrice}</div>
                      )}

                      
                      <label>Date:</label><br/>
                      <input type='date' className='form-enter' name='pPlacedDate' placeholder='' value={this.state.pPlacedDate} onChange={this.handleInputChange}/><br/>
                      
                      {errors.pPlacedDate && (
                      <div style={{ color: "red" }}>{errors.pPlacedDate}</div>
                    )}


                      
                      <label>Product Image URL:</label><br/>
                      <input type='text' className='form-enter' name='pImageURL' placeholder='https://www.abcd.com' value={this.state.pImageURL} onChange={this.handleInputChange}/><br/>
                      
                      {errors.pImageURL && (
                      <div style={{ color: "red" }}>{errors.pImageURL}</div>
                    )}

                      
                      <label>Product Description:</label><br/>
                      <textarea className='form-textarea' rows={2} cols={20} type="text" name='pDescription' placeholder='Enter Item Details' value={this.state.pDescription} onChange={this.handleInputChange} required/><br/>
                      
                      {errors.pDescription && (
                      <div style={{ color: "red" }}>{errors.pDescription}</div>
                    )}
                     <div className='buttn-success-1'>
                      <button className="btn btn-success" type='submit' style={{marginTop:"15px"}} ><i class="fa-regular fa-square-check" style={{marginRight:"10px"}} onClick={this.onSubmit}></i>Save</button>
                      
										
                      </div>
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
                <a href={`/stock/send-email`}><button className='btn-inline'>Send Email</button></a>
                <a href={`/stock/view-lowstock-item`}><button className='btn-inline'>Low Stock Item</button></a>
                <button className='btn btn-primary' onClick={this.generatePDF} type="primary">Download Table(PDF)</button>
                <div><button className='search-1'><i class="fa-solid fa-magnifying-glass"></i></button><input className='search-1' name="searchQuery" placeholder='Search Details Here' onChange={this.handleSearchArea}></input></div>
              </div>

             
              <div className='table-div'>
                
                <table className='content-table' id='itemDetailsTable'>
                  <thead className='tData'>
                    <tr>
                      <th scope="col"  style={{borderTopLeftRadius:"10px"}}>I/No</th>
                      <th scope="col" >Item Name</th>
                      <th scope="col" >SubCategory Name</th>
                      <th scope="col" >Item Quantity</th>
                      <th scope="col" >Item Price</th>
                      <th scope="col" >Item PreOrder Level</th>
                      <th scope="col" >Item Placed Date</th>
                      <th scope="col"  style={{border:"none",borderTopRightRadius:"10px"}}>Option</th>
                    </tr>

                  </thead>
                  <tbody scope="raw">
                  {this.state.subCategoryDetails.map((results,index)=>(
                    <tr>
                      
                      <td >IT{String(index+1).padStart(4,"0")}</td>
                      <td >{results.pName}</td>
                      <td >{results.pSubCategory}</td>
                      <td >{results.pQuantity}</td>
                      <td >{results.pPrice}</td>
                      <td >{results.pLevel}</td>
                      <td >{results.pPlacedDate}</td>

                      <div className='table-btn-div'>
                      <td ><a href={`/stock/edit-sub-item/${results._id}`}><button className="btn btn-warning">Edit</button></a></td>
                      <td >
                        
                        
                      <Popup className='pop-delete'  trigger=

                      
                            {<button className="btn btn-danger" >Delete</button>}
                            
                            modal nested>
                            
                            {
                              close => (
                                <div className='delete-model' >
                                <div className=''>
                                  <div> 
                                  <div className='' >
                                    <div className='delete-head'>
                                    <h2 className=''>Delete Item!!!</h2>
                                    <button className='close-btn-delete' onClick={() => close()}><i class="fa-solid fa-xmark"></i></button>
                                    </div>
                                    <div className='delete-msg'>
                                    If you want to delete 
                                    <div className='delete-id'>
                                      "{results.pName}"</div>Click the Delete button to delete this item
                                    </div>
                                    <div className='delete-button'>
                                    <button className='btn btn-danger' onClick={()=>{this.onDelete(results._id);displayLoginNotification();close()}}>Delete</button>
                                    </div>

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



