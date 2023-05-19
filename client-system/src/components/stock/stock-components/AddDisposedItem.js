import React, { Component } from 'react';
import '../stock.css'
import axios from 'axios';


class AddDisposedItem extends Component {
    constructor(props){
        super(props);
        this.state={
            pId:"IT1002",
            pName:"",
            pCategory:"",
            pSubCategory:"",
            pQuantity:"",
            pPrice:"",
            pImageURL:"",
            pReason:"",
            pPlacedDate:""
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

        const{pId,pName,pCategory,pSubCategory,pQuantity,pPrice,pPlacedDate,pImageURL,pReason}=this.state;

        
        const data ={
            pId: pId,
            pName:pName,
            pCategory:pCategory,
            pSubCategory:pSubCategory,
            pQuantity:pQuantity,
            pPrice:pPrice,
            pPlacedDate:pPlacedDate,
            pImageURL:pImageURL,
            pReason:pReason
            
        }

        console.log(data)

        axios.post("http://localhost:8000/disposeditem/post",data).then((res)=>{
            if(res.data.success){
                this.setState(
                    {
                        pId:"",
                        pName:"",
                        pCategory:"",
                        pSubCategory:"",
                        pQuantity:"",
                        pPrice:"",
                        pPlacedDate:"",
                        pImageURL:"",
                        pReason:"",
                        
                    }
                )
            }
        })

    }

    render() {
        
        return (
            <div className='stock'>
                <div style={{marginTop:"80px"}}> 
                <div className='head-add-item'>
                  <h2>Add Disposed Item</h2>
                  <div className='back-buttn-damaged-view'>
                  <a href={`/stock/disposed-item`}><button className='btn-back'><i class="fa-solid fa-arrow-left"></i> Back</button></a>
                  </div>
                  </div>

                  <form className='form-in'>
                  <div className='inline-form' >
                    <div style={{width:"100%"}}> 
                      <label>Disposed Product Name:</label>
                      <input type='text' className='form-select' name='pName' placeholder='Enter Name' value={this.state.pName} onChange={this.handleInputChange}/><br/>
                      <label>Product Category:</label>
                      <select className='form-select' name='pCategory' value={this.state.pCategory} onChange={this.handleInputChange}>
                        <option>Select One</option>
                        <option>Electronics</option>
                        <option>Books</option>
                        <option>Clothes</option>
                      </select>
                      
                              <label>Subcategory:</label>
                              <br />
                              <select
                                className="form-select"
                                name="pSubCategory"
                                value={this.state.pSubCategory}
                                onChange={this.handleInputChange}
                              >
                                <option value="">
                                  --Select a subcategory--
                                </option>
                                {this.state.pCategory === "Books" ? (
                                  <>
                                    <option value="novel">Novel</option>
                                    <option value="story">Story</option>
                                  </>
                                ) : this.state.pCategory === "Electronics" ? (
                                  <>
                                    <option value="phone">mobile-Phone</option>
                                    <option value="tv">TV</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="radio">Radio</option>
                                    <option value="hometheater">
                                      HomeTheater
                                    </option>
                                  </>
                                ) : this.state.pCategory === "Clothes" ? (
                                  <>
                                    <option value="short">Short</option>
                                    <option value="t-shirt">T-shirt</option>
                                    <option value="trouser">Trouser</option>
                                    <option value="frock">Frock</option>
                                    <option value="skirt">Skirt</option>
                                    <option value="blouse">Blouse</option>
                                  </>
                                ) : null}
                              </select>
                          
                      <label>Disposed Product Quantity:</label>
                      <input type='number' min={0} className='form-select' name='pQuantity' placeholder='0' value={this.state.pQuantity} onChange={this.handleInputChange}/><br/>
                      <label>Unit Price(LKR):</label>
                      <input type='number' min={0} className='form-select' name='pPrice' placeholder='RS:1000' value={this.state.pPrice} onChange={this.handleInputChange}/><br/>
                      <label>Date:</label><br/>
                      <input type='date' className='form-select' name='pPlacedDate' placeholder='' value={this.state.pPlacedDate} onChange={this.handleInputChange}/><br/>
                      <label>Product Image URL:</label>
                      <input type='text' className='form-select' name='pImageURL' placeholder='https://www.abcd.com' value={this.state.pImageURL} onChange={this.handleInputChange}/><br/>
                      <label>Disposed Reason:</label><br></br>
                      <textarea className='form-select' rows={8} cols={34} type="text" name='pReason' placeholder='Add Reason' value={this.state.pReason} onChange={this.handleInputChange}></textarea>
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

export default AddDisposedItem;