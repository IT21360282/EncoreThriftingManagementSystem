import React, {Component} from 'react'
import '../financial.css'

export default class extends Component{
    render(){
        return (
            <div>
                <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Send an Email</h2>
                <br></br>
                
                    
        <div id="fmailrectangle">
        <div className='fmail-form'>
            
            <br></br><br></br>
            <table>
            <tr>
            <td><input type='text' className='form-inputmail' name='sender' placeholder='From'/></td><br></br>
            </tr>

            <tr>
            <td><input type='text' className='form-inputmail' name='reciever' placeholder='To'/></td><br></br>
            </tr>

            <tr>
            <td><input type='text' className='form-inputmail' name='topic' placeholder='Subject'/></td><br></br>
            </tr>

            <tr>
            <td><textarea id="message" placeholder='Message' cols="40" rows="15"></textarea></td><br></br>
            </tr>
            
             <br></br>
            <button className='btn btn-success'>Send</button>
              
            </table>
            </div>
            
            <br></br>
        </div>
      </div>
     )
   }
}