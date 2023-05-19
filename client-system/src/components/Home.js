import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className='home-img'>
            <img src='encore-logo.png' className='home-img' />
            <div className='login-home'>
                <h1>Login Here</h1>
                <div className="container">
                  <br></br>
                  <br></br>
                <div className="form-group">
                <input type="text" placeholder="Username" className="form-control"/>
                   </div>
                   <div className="form-group">
                <input type="password" placeholder="Password" className="form-control"/>
                   </div>
                   <br></br>
                   <button style={{textAlign:"center"}} className='system'> Login</button>
                </div>
              
                
            </div>
        </div>
        
      </div>
    )
  }
}
