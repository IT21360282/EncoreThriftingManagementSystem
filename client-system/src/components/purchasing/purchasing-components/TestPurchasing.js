import React, { Component } from 'react'

export default class TestPurchasing extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isButtonDisabled: false // Initially the button is disabled
      };
      this.handleClick = this.handleClick.bind(this);
    }
  
    handleClick() {
      // Some logic that changes the state of the button
      this.setState({ isButtonDisabled: true });
    }
  
    render() {
      return (
        <div >
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          <button style={{marginTop:"30px"}} onClick={this.handleClick} disabled={this.state.isButtonDisabled}>
            Click me
          </button>
          hello
        </div>
      );
    }
  }