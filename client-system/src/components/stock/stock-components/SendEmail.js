import React, { Component } from 'react';

class SendEmail extends Component {
    render() {
        return (
            <div className='stock'>
                <div style={{marginTop:"80px"}}> 
                <div className='head-add-item'>
                  <h2>Send Email</h2>
                  <div className='back-buttn-item-view'>
                  <a href={`/stock/stock-home`}><button className='btn-back'><i class="fa-solid fa-arrow-left"></i> Back</button></a>
                  </div>

                  </div>
                  <form className='form-in'> 
                  <div className='inline-form' >
                    <div style={{width:"100%"}}> 
                      <label>To:</label><br/>
                      <input type='text' className='form-input' name='pName' placeholder="Enter reciver's email" /><br/>
                      <label>From:</label><br/>
                      <input type='text' className='form-input' name='pQuantity' placeholder="Enter sender's email" /><br/>
                      <label>Subject:</label><br/>
                      <input type='text' className='form-input' name='pName' placeholder='Subject' /><br/>
                      <label>Compose email:</label><br></br>
                      <textarea className='form-input' rows={15} cols={34} type="text" name='pDescription' placeholder='Enter email Details' ></textarea><br/>
                     <div className='buttn-success-1'>
                      <button className="btn btn-success" type='submit' style={{marginTop:"15px"}} ><i class="fa-regular fa-square-check" style={{marginRight:"10px"}}></i>Save</button>
                      </div>
                    </div>
                    
                  </div>
                  
                  </form>
                </div>
      </div>
        );
    }
}

export default SendEmail;