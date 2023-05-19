import { useParams, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './pay01.css';
import axios from 'axios';
import jsPDF from 'jspdf';

export default function Pay01() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams(); 
  const [item, setItem] = useState(id);
  const location = useLocation();
  const itemQuantity = new URLSearchParams(location.search).get('quantity');
  const itemPrice = new URLSearchParams(location.search).get('price');
  const itemName = new URLSearchParams(location.search).get('name');
  
  //calculate total
  const itemsTotalCart = itemPrice? parseFloat(itemPrice) : 0;
  const itemsTotal = item.pPrice ? parseFloat(item.pPrice) : 0;
  const deliveryFee = 270;
  const total = itemsTotal + deliveryFee;
  const cartTotal = itemsTotalCart * itemQuantity + deliveryFee;




  useEffect(() => {
    // Fetch user details from the server
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
        const response = await axios.post('http://localhost:8000/user/MyProfile', { token });
        const { status, data } = response.data;
        if (status === 'ok') {
          setUserData(data);
          setLoading(false);
        } else if (status === 'error') {
          console.error(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

    const getCartItems = () => {
    axios.get('http://localhost:8000/cart/getCart')
      .then((res) => {
        console.log(res.data);
        setCartItems(res.data.reverse());
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCartItems();
  }, []);
  

  useEffect(() => {
    axios.get(`http://localhost:8000/display/getItemById/${id}`)
    .then((res) => {
      setItem(res.data);
    });
  }, [id]);

  if (loading) {
    return <div className="displayBox">Loading...</div>;
  }
  
  if(!item) {
    return <div>Loading...</div>
  }


  const handleDelAddressChange = (e) => {
    setUserData({ ...userData, delAddress: e.target.value });
  };

// Concatenate the first name and last name
const fullName = `${userData.fname} ${userData.lname}`;

//transfer data to the payment collection
async function Payment() {
  try {
    // const unitPrice = itemPrice > 270 ? itemPrice : item.pPrice;
    const ItemName = item.pName ? item.pName : itemName;
    const quantity = itemQuantity || 1;
    const unitPrice = item.pPrice > 270 ? item.pPrice : itemPrice;
    const paymentData = {
      userId: userData._id,
      fullName: fullName,
      email: userData.email,
      address: userData.address,
      delAddress: userData.delAddress,
      mobile: userData.mobile,
      ItemName: ItemName,
      unitPrice: unitPrice,
      units: quantity,
      delFee: deliveryFee,
      total: total,
      cartTotal: cartTotal,
    };
    const res = await axios.post('http://localhost:8000/pay/savePayment', paymentData);
    console.log(res.data);
    alert("Payment Succeed");

  } catch (error) {
    console.log(error);
  }
}

const handleButtonClick = () => {
  //calling for payment
  Payment();

  //calling for generate pdf
  generatePDF();

}

//generate pdf function
const generatePDF = () => {
  const confirmDownload = window.confirm('Do you need to download a PDF?');

  if(confirmDownload){
    const doc = new jsPDF();

    // Load the logo image
    const logoImage = new Image();
    logoImage.src = '/images/Encore.png';

  
    logoImage.onload = () => {
      // Set the position and size of the logo image
      const logoWidth = 50;
      const logoHeight = (logoImage.height * logoWidth) / logoImage.width;
      const logoX = 10;
      const logoY = 10;
  
      // Add the logo image to the PDF
      doc.addImage(logoImage, 'PNG', logoX, logoY, logoWidth, logoHeight);
  
      // Set the font size and style for the title
      doc.setFontSize(20);
      doc.setFont('bold');
  
      // Add the title
      doc.text('Invoice', 10, logoY + logoHeight + 10);
  
      // Set the font size and style for the content
      doc.setFontSize(12);
      doc.setFont('normal');

      

  
      // Add the user information
      doc.text(`Full Name: ${fullName}`, 10, logoY + logoHeight + 30);
      doc.text(`Email: ${userData.email}`, 10, logoY + logoHeight + 40);
      doc.text(`Address: ${userData.address}`, 10, logoY + logoHeight + 50);
      doc.text(`Delivery Address: ${userData.delAddress}`, 10, logoY + logoHeight + 60);
  
      // Add the item details
      // Add the item details
      const ItemName = item.pName ? item.pName : itemName;
      doc.text(`Item Name: ${ItemName}`, 10, logoY + logoHeight + 80);
      // Set the unit price based on the conditions
      const unitPrice = item.pPrice > 270 ? item.pPrice : itemPrice;
      doc.text(`Unit Price: Rs.${unitPrice}.00`, 10, logoY + logoHeight + 90);
      
      const quantity = itemQuantity || 1;
      doc.text(`Quantity: ${quantity}`, 10, logoY + logoHeight + 100);
      doc.text(`Delivery Fee: ${deliveryFee}`, 10, logoY + logoHeight + 110);
  
      // Add the total
      const finalTotal = total > 270 ? total : cartTotal;
      doc.text(`Total: Rs.${finalTotal}.00`, 10, logoY + logoHeight + 130);
      
  
      // Save the PDF
      doc.save('invoice.pdf');
    };
  }
  
};




  


  return (
    <div className="displayBox">
      <div className="payBox">
        <form >
        <div className="paymentBox">

          <div className="addressBox">
          <lable>User Information</lable><br/><br/>

            <div className='identity'>
                <div className="paydata">
                  <label>Email</label><br/>
                  <input placeholder="example@gmail.com" value={userData.email} readOnly/>
                </div>
                <div className="paydata">
                  <label>Mobile</label><br/>
                  <input placeholder="+94********" value={userData.mobile} readOnly/>
                </div>
            </div>
           
            <div className='userName'>
                <div className="paydata">
                  <label>Full Name</label><br/>
                  <input placeholder='First Name + Last name' value={fullName} readOnly/>
                </div>
            </div>
             
             <div className='address'>
                <div className="paydata">
                  <label>Address</label><br/>
                  <input placeholder="Enter Your Address Here" value={userData.address} readOnly/>
                </div>
             </div>

            
            <div className='deliveryAddress'>
                <div className="paydata">
                  <label>Delivery Address</label><br/>
                  <input placeholder={`${userData.delAddress}`} value={userData.delAddress} onChange={handleDelAddressChange}/>
                </div>
            </div>
            <br/>
          <lable>Required</lable><br/><br/>
            <div className='cardDetails'>
              <div className='userCard'>
                  <div className="paydata">
                      <label>First Name</label><br/>
                      <input placeholder={`${userData.fname}`} required/>
                    </div>
                    <div className="paydata">
                      <label>Last Name</label><br/>
                      <input placeholder={`${userData.lname}`} required/>
                    </div>
              </div>
              <div className='userCard'>
                  <div className="paydata">
                      <label>Credit Card Number</label><br/>
                      <input placeholder="Credit Card Number" type='password' required/>
                    </div>
                    <div className="paydata">
                      <label>CVC</label><br/>
                      <input placeholder="CVC" type='password' required/>
                    </div>
                    <div className="paydata">
                      <label>Exp</label><br/>
                      <input placeholder="CVC" type='date' required/>
                    </div>
              </div>

            </div>
            





          </div>

          <div className="totalBox">
            {/* <h4 className="orderTitle">Order Summary</h4> */}
            <lable>Order Summary</lable>
            <br /><br/>
            <div className='summary'>
                  <div className='summaryAtr1'>
                    <p><b>Unit Price</b></p>
                  </div>
                  <div className='summaryAtr'>
                    {itemsTotal > 0 && <p>Rs.{itemsTotal}.00</p>}
                    {itemsTotalCart > 0 && <p>Rs.{itemsTotalCart}.00</p>}
                  </div>
            </div>
            <div className='summary'>
              <div className='summaryAtr1'>
                <p><b>Units</b></p>
              </div>
              <div className='summaryAtr'>
              {itemQuantity > 0 ? <p>{itemQuantity}</p> : <p>1</p>}

              </div>
            </div>
            <div className='summary'>
              <div className='summaryAtr1'>
                <p><b>Delivery Fee</b></p>
              </div>
              <div className='summaryAtr'>
                <p>Rs.{deliveryFee}.00</p>
              </div>
            </div>
            <div className='summary' style={{ border: '1px solid #ff6600', borderRadius: '5px' }}>
              <div className='summaryAtr1'>
                <p><b>Total</b></p>
              </div>
              <div className='summaryAtr'>
                {total > 270 && <p>Rs.{total}.00</p>}
                {cartTotal > 270 && <p>Rs.{cartTotal}.00</p>}
              </div>
            </div>
            

            {/* {itemsTotalCart > 0 && <p><b>Unit Price : </b>Rs.{itemsTotalCart}.00</p>}
            {itemQuantity > 0 && <p><b>Number Of Items : </b>{itemQuantity}</p>}
             */}
            {/* <label>Delivery Fee</label> */}
            {/* <p><b>Delivery Fee : </b>Rs.{deliveryFee}.00</p> */}
            
            {/* <label>Total</label> */}
{/*             
            {total > 270 && <p><b>Total  : </b>Rs.{total}.00</p>}
            {cartTotal > 270 && <p><b>Total  : </b>Rs.{cartTotal}.00</p>} */}
            <br />
            <div className="buttonPay">
              
                <button onClick={handleButtonClick}>Proceed To Pay </button>
              
            </div>
          </div>
        </div>
    
        </form>
      </div>
    </div>
  );
}
