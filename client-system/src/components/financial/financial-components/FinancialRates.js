import React, {Component} from 'react'
import '../financial.css'

export default class extends Component{
    constructor(props){
        super(props)
        this.state={
            principle:"",
            InterestPeriod:"",
            Duration:"",
            rate:""
        }
        this.onSubmit=this.onSubmit.bind(this)
    }

    handleinput = (event) => {
         const {name,value}=event.target
         this.setState({
            ...this.state,[name]:value
         })
    }

    onSubmit(){
        const principle=parseFloat(this.state.principle)
        const interestpaid=parseFloat(this.state.InterestPeriod)
        const Duration=parseFloat(this.state.Duration)

        const rate = (interestpaid / (principle * Duration))
        this.setState({rate})
    }

    render(){
        const rate = parseFloat(this.state.rate)
        return (
            <div>
                <h2 style={{marginLeft:"20px",marginTop:"65px"}}>Calculate the Interest Rate</h2>
                <br></br>
                
                    
        <div id="ratrectangle">
        <div className='rat-form'><br></br>
            <center>
            <div class="r-box"></div>
            <dic class="r-box-cont">
                
                <strong style={{color:'#ff5520'}}>Principle - 50%</strong>
                <strong style={{color:'#1F45FC'}}>Interest paid - 30%</strong>
                <strong style={{color:'#299617'}}>Duration - 20%</strong>
                 <br></br>
                <h3>Enter the data and find financial rate of interests</h3>
                <h4 style={{color:"#299617"}}>Rate = I/PT </h4>

            </dic>
            </center>
            
            <br></br>
            <table>
            <tr>
            <td><label>Principle:</label></td>
            <td><input type='text' className='form-input' name='principle' value={this.state.principle} onChange={this.handleinput} placeholder='principle'/></td><br></br>
            </tr>

            <tr>
             <td> <label>Interest paid:</label></td>
            <td><input type='text' className='form-input' name='InterestPeriod' value={this.state.InterestPeriod} onChange={this.handleinput} placeholder='Interest'/></td><br></br>
            </tr>

             <tr>
             <td> <label>Duration(years): </label></td>
            <td><input type='text' className='form-input' name='Duration' value={this.state.Duration} onChange={this.handleinput} placeholder='time'/></td><br></br>
            </tr>
            <br></br>
              
            </table>
            <button onClick={this.onSubmit} className='btn btn-primary'>Calculate</button>
            </div>
            <div style={{width:"20%",marginLeft:"auto",marginRight:"auto"}} className='rateshow'>
                <label>The Financial Rate :</label>
                {rate}%
            </div>
            
            <br></br>
        </div>
      </div>
     )
   }
}