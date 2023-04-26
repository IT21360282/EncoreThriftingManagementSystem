import React, { Component } from 'react';

export default class OutStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ''
    };
  }

  convertToBase64 = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      this.setState({
        image: reader.result
      });
    };
    reader.onerror = (error) => {
      console.log('Error:', error);
    };
  };

  uploadImage = () => {
    fetch('http://localhost:8000/upload-image', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        base64: this.state.image
      })
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  render() {
    const { image } = this.state;

    return (
      <div style={{ marginTop: '140px' }}>
        <input accept="image/*" type="file" onChange={this.convertToBase64} />
        {image && <img width={150} height={100} src={image} alt="Uploaded" />}
        <button onClick={this.uploadImage}>Upload</button>
      </div>
    );
  }
}
