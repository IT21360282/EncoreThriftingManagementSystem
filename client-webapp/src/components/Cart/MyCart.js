import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './cart.css';
import {Link} from 'react-router-dom'

export default function MyCart() {
  const [cartItems, setCartItems] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

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

  const userId = userData && userData._id;

  

  const getCartItems = useCallback(() => {
    axios.get('http://localhost:8000/cart/getCart')
      .then((res) => {
        console.log(res.data);
        const filteredItems = res.data.filter((cartItems) => cartItems.userId === userId);
        setCartItems(filteredItems.reverse());
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getCartItems();
  }, [getCartItems]);

  if (loading) {
    return <div className='displayBox'>Loading...</div>;
  }

  const handleDelete = (itemId) => {
    console.log('Deleting item with id:', itemId);
      const item = cartItems.find((item) => item._id === itemId);
      if(!item){
        console.error("Item not found")
        return;
      }

    axios.delete(`http://localhost:8000/cart/deleteItem/${itemId}`)
      .then(() => {
        console.log('Item deleted from cart');
        getCartItems();
      })
      .catch((err) => console.log(err));
  };


//update item quantity
  const handleQuantityChange = (itemId, quantity) => {
    console.log('Updating item quantity:', itemId, quantity);
    const item = cartItems.find((item) => item._id === itemId);
    if (!item) {
      console.error('Item not found');
      return;
    }

      // Check if the new quantity is less than the current quantity minus 1
  if (quantity < item.quantity ) {
    quantity = 1;
  }

    axios.put(`http://localhost:8000/cart/updateQuantity/${itemId}`, { quantity })
      .then(() => {
        console.log('Item quantity updated');
        item.quantity = quantity;
        setCartItems([...cartItems]);
      })
      .catch((err) => console.log(err));
  };







  return (
    <div className='displayBox'>
      <h3 className='pageTitle'>My Cart</h3>
      <div className='cartBox'>
        <div className='cardGrid'>
          {cartItems.map((item) => (
            <li key={item._id}>
            <div className='card' key={item._id}>
              <div className='imgSection'><img src={item.pImageURL} alt={item.pName} /></div>
              <div className='dataSection'>
              <h4>{item.pName}</h4>
              <h5>{item.pDescription}</h5>
              <p>Price: Rs.{item.pPrice}.00</p>
              <label>Quantity:</label>
              <input type="number" value={item.quantity} onChange={(e) => { handleQuantityChange(item._id, parseInt(e.target.value)); }} />
              <div className='cardActions'>
                {/* <a href={`/item/${item.itemId}`}>View</a> */}
                <Link to={`/PaymentPhase01/${item._id}?price=${item.pPrice}&quantity=${item.quantity}&name=${item.pName}`}>
                  <button id='viewbtn'>Checkout</button>
                </Link>
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
              </div>
              <br/>
            </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
