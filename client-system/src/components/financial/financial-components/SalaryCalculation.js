import React, {Component} from 'react'
import '../financial.css'
import ReactModel from 'react-modal'
import ReactModal from 'react-modal'

export default class extends Component{

  constructor(props){
    super(props)
    this.state={
        Basic:"",
        Allowance:"",
        IncomeTax:"",
        ProvidentFund:"",
        WorkingDays:"",
        salary:"",
        isOpen:false,
    }
    this.onSubmit=this.onSubmit.bind(this)
    this.hadlePopUp=this.hadlePopUp.bind(this)
}

handleinput = (event) => {
     const {name,value}=event.target
     this.setState({
        ...this.state,[name]:value
     })
}

hadlePopUp(){
  this.setState({isOpen:!this.state.isOpen})
}

onSubmit(){
    const Basic=parseFloat(this.state.Basic)
    const Allowance=parseFloat(this.state.Allowance)
    const IncomeTax=parseFloat(this.state.IncomeTax)
    const ProvidentFund=parseFloat(this.state.ProvidentFund)
    const WorkingDays=parseInt(this.state.WorkingDays)

    const salary = ((Basic + Allowance) * WorkingDays) - (IncomeTax + ProvidentFund)
    this.setState({salary})

    this.setState({
      Basic:"",
      Allowance:"",
      IncomeTax:"",
      ProvidentFund:"",
      WorkingDays:"",
    })
}
 
    render(){
       const sal = parseFloat(this.state.salary).toFixed(2)
        return (
            <div>
                <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Salary Calculation</h2>
                <br></br>
                
                    
        <div id="salrectangle">
        <div className='sal-form'>
            
            <br></br><br></br>
            <table>
            <tr>
              <td><label>Employee ID:</label></td>
              <select className='form-select' style={{width:"240%"}}>
                <option>Emp001</option>
                <option>Emp002</option>
                <option>Emp003</option>
                <option>Emp004</option>
                <option>Emp005</option>
                <option>Emp006</option>
              </select></tr><br/>

            <tr>
            <td><label>Basic:</label></td>
            <td><input type='text' className='form-input' name='Basic' value={this.state.Basic} onChange={this.handleinput} placeholder='basic'/></td><br></br>
            </tr>

            <tr>
             <td> <label>Allowances :</label></td>
            <td><input type='text' className='form-input' name='Allowance' value={this.state.Allowance} onChange={this.handleinput} placeholder='allowance'/></td><br></br>
            </tr>

            <tr>
             <td> <label>Income Tax :</label></td>
            <td><input type='text' className='form-input' name='IncomeTax' value={this.state.IncomeTax} onChange={this.handleinput} placeholder='Income tax'/></td><br></br>
            </tr>

            <tr>
             <td> <label>Provident Fund :</label></td>
            <td><input type='text' className='form-input' name='ProvidentFund' value={this.state.ProvidentFund} onChange={this.handleinput} placeholder='Provident_fund'/></td><br></br>
            </tr>

            <tr>
             <td> <label>Working days per month:</label></td>
            <td><input type='text' className='form-input' name='WorkingDays' value={this.state.WorkingDays} onChange={this.handleinput} placeholder='working_hours'/></td><br></br>
            </tr>
            <br></br><br></br>

            
              
            </table>
            <div>
              <a onClick={this.hadlePopUp}><button onClick={this.onSubmit} className='btn btn-primary'>CALCULATE</button></a>
              <ReactModal isOpen={this.state.isOpen} conRequestClose={this.hadlePopUp} style={{overlay:{},content:{border:"3px solid #ff5520",width:"20%",height:"30%"}}}>
               The salary is : Rs {sal}<br></br> Thank you!
                <br></br><br></br><button className='btn btn-primary' onClick={this.hadlePopUp}>Close</button>
              </ReactModal>
            </div>
            </div>
            
            <br></br>
        </div>
      </div>
     )
   }
}