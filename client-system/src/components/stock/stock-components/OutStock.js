import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      nameError: '',
      emailError: '',
      passwordError: '',
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/submit-form', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  validateName = () => {
    if (!this.state.name) {
      this.setState({ nameError: 'Name is required' });
    } else if (this.state.name.length < 3) {
      this.setState({ nameError: 'Name must be at least 3 characters long' });
    } else {
      this.setState({ nameError: '' });
    }
  };

  validateEmail = () => {
    if (!this.state.email) {
      this.setState({ emailError: 'Email is required' });
    } else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
      this.setState({ emailError: 'Invalid email format' });
    } else {
      this.setState({ emailError: '' });
    }
  };

  validatePassword = () => {
    if (!this.state.password) {
      this.setState({ passwordError: 'Password is required' });
    } else if (this.state.password.length < 8) {
      this.setState({ passwordError: 'Password must be at least 8 characters long' });
    } else {
      this.setState({ passwordError: '' });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div style={{margin:"140px"}}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange}
            onBlur={this.validateName}
            required
          />
          {this.state.nameError && <span className="error-msg">{this.state.nameError}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            onBlur={this.validateEmail}
            required
          />
          {this.state.emailError && <span className="error-msg">{this.state.emailError}</span>}
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
            onBlur={this.validatePassword}
            required
          />
          {this.state.passwordError && <span className="error-msg">{this.state.passwordError}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;
