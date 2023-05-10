import React, {Component} from 'react'
import '../financial.css'

export default class extends Component{
    render(){
        return (
            <div>
                <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Financial Report Generate</h2>
                <br></br>
                
                    
        <div id="freprectangle">
      
            <div className='frep-form'><br></br>
            <h3 style={{marginLeft:"20px",marginTop:"10px",color:"#ff5520",textAlign:'center'}}>Tick the relevant detail to be include in the month-end report</h3>
            <br></br>

            <table>
            <tr>
            <td><label>Include All the Bank Details:</label></td>
            <td></td>
            <td></td>
            <td><input type='Checkbox' id="checkbox1" name='checkbox1'/></td><br></br>
            </tr>
            <br></br>
            

            <tr>
             <td> <label>Include All the Payment Details:</label></td>
             <td></td>
             <td></td>
            <td><input type='checkbox' id="checkbox2" name='checkbox2'/></td><br></br>
            </tr><br></br>

            <tr>
            <td><label>Include Updated Bank Details:</label></td>
            <td></td>
            <td></td>
            <td><input type='Checkbox' id="checkbox3" name='checkbox3'/></td><br></br>
            </tr>
            <br></br>

            <tr>
            <td><label>Include Updated Payment Details:</label></td>
            <td></td>
            <td></td>
            <td><input type='Checkbox' id="checkbox4" name='checkbox4'/></td><br></br>
            </tr>
            <br></br>

            <tr>
            <td><label>Include Employees Salary Details:</label></td>
            <td></td>
            <td></td>
            <td><input type='Checkbox' id="checkbox5" name='checkbox5'/></td><br></br>
            </tr>
            <br></br>

            <tr>
            <td><label>Include Financial rates of the store:</label></td>
            <td></td>
            <td></td>
            <td><input type='Checkbox'id="checkbox6" name='checkbox6' /></td><br></br>
            </tr>
            <br></br>

            <tr>
            <td><label>Include Email Conversations:</label></td>
            <td></td>
            <td></td>
            <td><input type='Checkbox' id="checkbox7" name='checkbox7'/></td><br></br>
            </tr>
            <br></br>
            
            </table> <br></br>
            
        <button className='btn btn-success'>Generate</button>
        <button style={{marginLeft:"12px"}}className='btn btn-primary'>Convert to PDF</button>
              </div>
             <br></br>
        </div>
      </div>
     )
   }
}