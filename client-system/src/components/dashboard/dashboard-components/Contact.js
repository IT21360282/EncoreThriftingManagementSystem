import React, { Component } from "react";
import "./contact.css";
import axios from "axios";



//import emailjs from "@emailjs/browser";
import styled from "styled-components";
import ".././dashboard.css";

export default class extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      sender: "encorethriftinglk@gmail.com",
      reciever: "",
      topic: "",
      txt: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleinput = (event) => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit() {
    const { sender, reciever, topic, txt } = this.state;
    const mail = {
      email: reciever,
      subject: topic,
      msg: txt,
    };
    axios
      .post("http://localhost:8000/dashboardPost/sendMail", mail)
      .then((response) => {
        console.log("success");
        this.state({ success: true });
      })
      .catch((error) => {
        console.error("Error Occured:", error);
      });
  }
`;
*/

  render() {
    return (
      <div>
        <h2 style={{ marginLeft: "20px", marginTop: "65px" }}>Send an Email</h2>
        <br></br>

        <div id="fmailrectangle">
          <div className="fmail-form">
            <br></br>
            <br></br>
            <table>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-inputmail"
                    name="sender"
                    value={this.state.sender}
                    onChange={this.handleinput}
                    readOnly
                    placeholder="From"
                  />
                </td>
                <br></br>
              </tr>

              <tr>
                <td>
                  <input
                    type="text"
                    className="form-inputmail"
                    name="reciever"
                    value={this.state.reciever}
                    onChange={this.handleinput}
                    placeholder="To"
                  />
                </td>
                <br></br>
              </tr>

              <tr>
                <td>
                  <input
                    type="text"
                    className="form-inputmail"
                    name="topic"
                    value={this.state.topic}
                    onChange={this.handleinput}
                    placeholder="Subject"
                  />
                </td>
                <br></br>
              </tr>

              <tr>
                <td>
                  <textarea
                    id="message"
                    placeholder="Message"
                    name="txt"
                    value={this.state.txt}
                    onChange={this.handleinput}
                    cols="40"
                    rows="15"
                  ></textarea>
                </td>
                <br></br>
              </tr>

              <br></br>
              <button onClick={this.onSubmit} className="btn btn-success">
                Send
              </button>
            </table>
          </div>

          <br></br>
        </div>
      </div>
    );
  }
}
