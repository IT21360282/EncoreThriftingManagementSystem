import React from "react";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productQuantity: "",
      productCategory: "",
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { productName, productQuantity, productCategory } = this.state;
    const errors = {};
    if (productName.trim() === "") {
      errors.productName = "Please enter a product name.";
    }
    if (productQuantity.trim() === "") {
      errors.productQuantity = "Please enter a product quantity.";
    } else if (isNaN(productQuantity)) {
      errors.productQuantity = "Please enter a valid quantity.";
    }
    if (productCategory.trim() === "") {
      errors.productCategory = "Please select a product category.";
    }
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      // Perform form submission logic here
      console.log("Product Name: ", productName);
      console.log("Product Quantity: ", productQuantity);
      console.log("Product Category: ", productCategory);
      // Reset form fields
      this.setState({
        productName: "",
        productQuantity: "",
        productCategory: "",
        errors: {},
      });
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    const errors = { ...this.state.errors };
    if (errors[name]) {
      delete errors[name];
    }
    this.setState({ [name]: value, errors });
  };

  render() {
    const { productName, productQuantity, productCategory, errors } = this.state;
    return (
      <div style={{marginTop:"140px"}}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Product Name:
            <input
              type="text"
              name="productName"
              value={productName}
              onChange={this.handleInputChange}
            />
          </label>
          {errors.productName && (
            <div style={{ color: "red" }}>{errors.productName}</div>
          )}
          <label>
            Product Quantity:
            <input
              type="text"
              name="productQuantity"
              value={productQuantity}
              onChange={this.handleInputChange}
            />
          </label>
          {errors.productQuantity && (
            <div style={{ color: "red" }}>{errors.productQuantity}</div>
          )}
          <label>
            Product Category:
            <select
              name="productCategory"
              value={productCategory}
              onChange={this.handleInputChange}
            >
              <option value="">--Select--</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="books">Books</option>
            </select>
          </label>
          {errors.productCategory && (
            <div style={{ color: "red" }}>{errors.productCategory}</div>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default ProductForm;
