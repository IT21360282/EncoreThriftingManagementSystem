import React, { Component } from 'react';
import axios from 'axios';
import '../stock.css'
import {useParams} from 'react-router-dom'

export default function EditDamagedItem() {
    const {id} = useParams()
  return (
    <div>
        {id}
      <EditdamagedItemBody id = {id}/>
    </div>
  )
}

class EditdamagedItemBody extends Component {

    constructor(props){
        super(props);
        this.state={
            
            pName:"",
            pCategory:"",
            pSubCategory:"",
            pQuantity:"",
            pPrice:"",
            pImageURL:"",
            pReason:"",
            pPlacedDate:"",
            id:props.id,
        }
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

            const{pName,pCategory,pSubCategory,pQuantity,pPrice,pImageURL,pReason,pPlacedDate}=this.state;

        
        const data ={
            
            pName:pName,
            pCategory:pCategory,
            pSubCategory:pSubCategory,
            pQuantity:pQuantity,
            pPrice:pPrice,
            pImageURL:pImageURL,
            pReason:pReason,
            pPlacedDate:pPlacedDate,
        }

        console.log(data)
        

        axios.put(`http://localhost:8000/damageditem/update/${this.state.id}`,data).then((res)=>{
        
                alert("Post Updated")
                this.setState(
                    {
                        
                      pName:"",
                      pCategory:"",
                      pSubCategory:"",
                      pQuantity:"",
                      pPrice:"",
                      pImageURL:"",
                      pReason:"",
                      pPlacedDate:"",
                      
                    }
                )
            
        })

    }

    componentDidMount(){
        
        axios.get(`http://localhost:8000/damageditem/get/${this.state.id}`).then(res=>{
            if(res.data.success){
                this.setState({

                    
                    pName:res.data.existingDetails.pName,
                    pCategory:res.data.existingDetails.pCategory,
                    pSubCategory:res.data.existingDetails.pSubCategory,
                    pQuantity:res.data.existingDetails.pQuantity,
                    pPrice:res.data.existingDetails.pPrice,
                    pPlacedDate:res.data.existingDetails.pPlacedDate,
                    pImageURL:res.data.existingDetails.pImageURL,
                    pReason:res.data.existingDetails.pReason,
                    
                });
                console.log(this.state.specificItemView)
            }
        });
    }
    render() {
        
        return (
            <div className='stock'>
                <div style={{marginTop:"45px"}}>
                <div className='head-add-item-edit'> 
                <div className='back-buttn-edit-page'>
                  <a href={`/stock/damaged-item`}><button className='btn-back'><i class="fa-solid fa-arrow-left"></i> Back</button></a>
                  
                  </div>
                  <h2 className='sub-head-edit'>Update__<div className='edit-sub-heading'> {this.state.pName}</div>__Details</h2>
                  

                </div>
                  <form className='form-in'>
                  <div className='inline-form' >
                    <div style={{width:"100%"}}> 
                      <label>Edit Product Name:</label>
                      <input type='text' className='form-input' name='pName' placeholder='Enter Name' value={this.state.pName} onChange={this.handleInputChange}/><br/>
                      <label>Product Category:</label><br/>
                      <select className='form-input' name='pCategory' value={this.state.pCategory} onChange={this.handleInputChange}>
                        <option>--Select a category--</option>
                        <option>Electronics</option>
                        <option>Books</option>
                        <option>Clothes</option>
                      </select><br/>
                      <label>Sub Category:</label><br/>
                        <select className='form-input' name='pSubCategory' value={this.state.pSubCategory} onChange={this.handleInputChange}>
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
                        </select><br/>

                      
                        <label>Product Quantity:</label><br/>
                        <input type='number' className='form-input' name='pQuantity' placeholder='10' value={this.state.pQuantity} onChange={this.handleInputChange}/><br/>
                        
                        <label>Unit Price(LKR):</label><br/>
                        <input type='number' className='form-input' name='pPrice' placeholder='Rs:1000' value={this.state.pPrice} onChange={this.handleInputChange}/><br/>
                        <label>Date:</label><br/>
                        <input type='date' className='form-input' name='pPlacedDate' placeholder='' value={this.state.pPlacedDate} onChange={this.handleInputChange}/><br/>
                        <label>Product Image URL:</label><br/>
                        <input type='text' className='form-input' name='pImageURL' placeholder='https://www.abcd.com' value={this.state.pImageURL} onChange={this.handleInputChange}/><br/>
                        <label>Product Description:</label><br/>
                        <textarea className='form-textarea-edit' rows={8} cols={34} type="text" name='pReason' placeholder='Enter Item Details' value={this.state.pReason} onChange={this.handleInputChange}></textarea><br/>


                      <div className='buttn-success-1'>
                      <button className="btn btn-success" type='submit' style={{marginTop:"15px"}} onClick={this.onSubmit}><i class="fa-regular fa-square-check" style={{marginRight:"10px"}}></i>Save</button>





                      
                      
										
								
                      
                      </div>
                      
                    </div>
                    
                  </div>
                  
                  </form>
                </div>
      </div>
        );
    }
}

