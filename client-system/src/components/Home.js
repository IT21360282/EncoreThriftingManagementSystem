import React, { Component } from 'react'

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className='home-img'>
            <img src='encore-logo.png' className='home-img' />
            <div className='login-home'>
                <h1>Login Here</h1>
            </div>
        </div>
        
      </div>
    )
  }
}
