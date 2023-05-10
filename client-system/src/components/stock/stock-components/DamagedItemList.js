import axios from "axios";
import React, { Component } from "react";
import "../stock.css";
import Popup from "reactjs-popup";
import { toast, ToastContainer } from "react-toastify";

class DamagedItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pName: "",
      pCategory: "",
      pQuantity: "",
      pPrice: "",
      pImageURL: "",
      pReason: "",
      pPlacedDate: "",
      damagedItemDetails: [],
    };
  }

  // for delete
  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      pName,
      pCategory,
      pSubCategory,
      pQuantity,
      pPrice,
      pPlacedDate,
      pImageURL,
      pReason,
    } = this.state;

    const data = {
      pName: pName,
      pCategory: pCategory,
      pSubCategory: pSubCategory,
      pQuantity: pQuantity,
      pPrice: pPrice,
      pPlacedDate: pPlacedDate,
      pImageURL: pImageURL,
      pReason: pReason,
    };

    // Delete add item Validation

    const errors = {};
    if (pName.trim() === "") {
      errors.pName = "Please enter a product name.";
    }
    if (pQuantity.trim() === "") {
      errors.pQuantity = "Please enter a product quantity.";
    } else if (isNaN(pQuantity) || pQuantity < 0) {
      errors.pQuantity = "Please enter a valid quantity.";
    }

    if (pPrice.trim() === "") {
      errors.pPrice = "Please enter a product Price.";
    } else if (isNaN(pPrice) || pPrice < 0) {
      errors.pPrice = "Please enter a valid Price.";
    }

    if (pPlacedDate.trim() === "") {
      errors.pPlacedDate = "Please enter a date.";
    }

    if (pImageURL.trim() === "") {
      errors.pImageURL = "Please Enter Image URL.";
    }
    if (pSubCategory.trim() === "") {
      errors.pSubCategory = "Please select a product category.";
    }
    if (pCategory.trim() === "") {
      errors.pCategory = "Please select a product category.";
    }
    if (pReason.trim() === "") {
      errors.pReason = "Please Enter Product Damaged Reason.";
    }

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      // Perform form submission logic here
      console.log("Product Name: ", pName);
      console.log("Product Quantity: ", pQuantity);
      console.log("Product Reorder Level: ", pPrice);
      console.log("Product Category: ", pCategory);
      console.log("Product Sub Category: ", pSubCategory);
      console.log("Product Placed Date: ", pPlacedDate);
      console.log("Product ImageURL: ", pImageURL);
      console.log("Product Damaged Reason: ", pReason);

      // Reset form fields
      this.setState({
        pName: "",
        pQuantity: "",
        pPrice: "",
        pCategory: "",
        pSubCategory: "",
        pPlacedDate: "",
        pImageURL: "",
        pReason: "",

        errors: {},
      });
    }

    // ********

    console.log(data);

    axios.post("http://localhost:8000/damageditem/post", data).then((res) => {
      if (res.data.success) {
        this.setState({
          pName: "",
          pCategory: "",
          pSubCategory: "",
          pQuantity: "",
          pPrice: "",
          pPlacedDate: "",
          pImageURL: "",
          pReason: "",
        });
      }
    });

    window.location.reload();
  };

  // **********

  componentDidMount() {
    this.retrieveDamagedDetails();
  }

  retrieveDamagedDetails() {
    axios.get("http://localhost:8000/damageditem/get").then((res) => {
      if (res.data.success) {
        this.setState({
          damagedItemDetails: res.data.existingDetails,
        });
      }
    });
  }

  onDelete = (id) => {
    axios
      .delete(`http://localhost:8000/damageditem/delete/${id}`)
      .then((res) => {
        this.retrieveDamagedDetails();
      });
  };

  render() {
    const totalProduct = 23;
    const displayLoginNotification = () => {
      toast.success("Deleted Succesfully");
    };

    return (
      <div className="stock">
        <div className="App">
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
        <div>
          <div className="btn-inline" style={{ marginTop: "80px" }}>
            <div className="semi-preview-container">
              Total Damaged Item
              <br />
              {totalProduct}
            </div>
          </div>

          <div>
            {/* Add Damaged Item */}
            <Popup
              trigger={
                <button
                  className="btn btn-warning"
                  style={{ marginTop: "15px" }}
                >
                  <i class="fa-solid fa-pen-to-square"></i>Add Damaged Item
                </button>
              }
              modal
              nested
            >
              {(close) => (
                <div className="modal">
                  <div className="stock">
                    <div>
                      <div className="my-delete">
                        <h5 className="popup-head-add-item">Add Delete Item</h5>
                        <button className="close-btn" onClick={() => close()}>
                          <i class="fa-solid fa-xmark"></i>
                        </button>
                      </div>

                      <form className="add-form">
                        <div className="popUp-form">
                          <div style={{ width: "100%" }}>
                            <div className="label-3">
                              <label>Damaged Product Name:</label>
                              <input
                                type="text"
                                className="form-inputg"
                                name="pName"
                                placeholder="Enter Name"
                                value={this.state.pName}
                                onChange={this.handleInputChange}
                              />
                              <br />
                            </div>

                            <div className="label-3">
                              <label>Product Category:</label>
                              <select
                                className="form-inputg"
                                name="pCategory"
                                value={this.state.pCategory}
                                onChange={this.handleInputChange}
                              >
                                <option>--Select a category--</option>
                                <option>Electronics</option>
                                <option>Books</option>
                                <option>Clothes</option>
                              </select>
                              <br />
                            </div>

                            <div className="label-3">
                              <label>Subcategory:</label>
                              <br />
                              <select
                                className="form-inputg"
                                name="pSubCategory"
                                value={this.state.pSubCategory}
                                onChange={this.handleInputChange}
                              >
                                <option value="">
                                  --Select a subcategory--
                                </option>
                                {this.state.pCategory === "Books" ? (
                                  <>
                                    <option value="novel">Novel</option>
                                    <option value="story">Story</option>
                                  </>
                                ) : this.state.pCategory === "Electronics" ? (
                                  <>
                                    <option value="phone">mobile-Phone</option>
                                    <option value="tv">TV</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="radio">Radio</option>
                                    <option value="hometheater">
                                      HomeTheater
                                    </option>
                                  </>
                                ) : this.state.pCategory === "Clothes" ? (
                                  <>
                                    <option value="short">Short</option>
                                    <option value="t-shirt">T-shirt</option>
                                    <option value="trouser">Trouser</option>
                                    <option value="frock">Frock</option>
                                    <option value="skirt">Skirt</option>
                                    <option value="blouse">Blouse</option>
                                  </>
                                ) : null}
                              </select>
                            </div>

                            <div className="label-3">
                              <label>Damaged Product Quantity:</label>
                              <input
                                type="number"
                                className="form-inputg"
                                name="pQuantity"
                                placeholder="0"
                                value={this.state.pQuantity}
                                onChange={this.handleInputChange}
                              />
                              <br />
                            </div>

                            <div className="label-3">
                              <label>Unit Price(LKR):</label>
                              <br></br>
                              <input
                                type="number"
                                className="form-inputg"
                                name="pPrice"
                                placeholder="RS:1000"
                                value={this.state.pPrice}
                                onChange={this.handleInputChange}
                              />
                              <br />
                            </div>

                            <div className="label-3">
                              <label>Date:</label>
                              <br />
                              <input
                                type="date"
                                className="form-inputg"
                                name="pPlacedDate"
                                placeholder=""
                                value={this.state.pPlacedDate}
                                onChange={this.handleInputChange}
                              />
                              <br />
                            </div>

                            <div className="label-3">
                              <label>Product Image URL:</label>
                              <input
                                type="text"
                                className="form-inputg"
                                name="pImageURL"
                                placeholder="https://www.abcd.com"
                                value={this.state.pImageURL}
                                onChange={this.handleInputChange}
                              />
                              <br />
                            </div>

                            <div className="label-4">
                              <label>Damaged Reason:</label>
                              <textarea
                                className="form-inputg"
                                rows={8}
                                cols={34}
                                type="text"
                                name="pReason"
                                placeholder="Enter Reason"
                                value={this.state.pReason}
                                onChange={this.handleInputChange}
                              ></textarea>
                            </div>

                            <div className="buttn-success-1">
                              <button
                                className="btn btn-success"
                                type="submit"
                                style={{ marginTop: "15px" }}
                                onClick={this.onSubmit}
                              >
                                <i
                                  class="fa-regular fa-square-check"
                                  style={{ marginRight: "10px" }}
                                ></i>
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </Popup>



                            <table className='content-table'>
                              <thead className='tData'>
                                <tr>
                                  <th scope="col"  style={{borderTopLeftRadius:"10px"}}>C/No</th>
                                  <th scope="col" >Damaged Item Name</th>
                                  <th scope="col" >Item Category</th>
                                  <th scope="col" >Item Quantity</th>
                                  
                                  
                                  <th scope="col"  style={{border:"none",borderTopRightRadius:"10px"}}>Option</th>
                                </tr>

                              </thead>
                              <tbody scope="raw">
                              {this.state.damagedItemDetails.map((results,index)=>(
                                <tr>
                                  <td >DI{String(index+1).padStart(4,"0")}</td>
                                  <td >{results.pName}</td>
                                  <td >{results.pCategory}</td>
                                  <td >{results.pQuantity}</td>
                                  

                                  <div >
                                  <td ><a href={`/stock/edit-sub-item/${results._id}`}><button className="btn btn-warning">Edit</button></a></td>
                                  <td ><button className="btn btn-danger"  onClick={()=>{this.onDelete(results._id);displayLoginNotification()}} >Delete</button></td>
                                  <td ><a href={`/stock/view-damaged-item/${results._id}`}><button className="btn btn-primary">View</button></a></td>
                                  </div>
                                </tr>
                              ))}
                              </tbody>
                            </table>
                          </div>
                            
                            
                            
                            
                        </div>
                
            </div>
        );
    }
}

export default DamagedItemList;
