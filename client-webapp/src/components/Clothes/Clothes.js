import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'


export default function Books() {
    const [items, setItems] = useState([]);
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    // const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

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

    const onViewDetails = (itemId) => {
        navigate(`/ItemView/${itemId}`);
      };


//display items in display view page
    const getItems = () => {
         axios.get('http://localhost:8000/display/getItems') 
          .then((res) => {
            console.log(res.data);
            setItems(res.data);
          })
          .catch((err) => console.log(err));
      };
    
      useEffect(() => {
        getItems();
      }, []);
 
      if (loading) {
        return <div className="displayBox">Loading...</div>;
      }
    

      const userId = userData && userData._id;

    async function addToCart(item, userId) {
      try {

        const cartItem = {
            userId: userId, // Pass the userId attribute
            item: item,
            pImageURL: item.pImageURL,
            pName: item.pName,
            pDescription: item.pDescription,
            pPrice: item.pPrice,
            quantity: item.quantity,
          };

        const response = await axios.post('http://localhost:8000/cart/addToCart', cartItem);
        console.log(response.data);
        alert("Item added to Cart");
      } catch (error) {
        console.log(error);
      }
    }



  return (
    <div className='displayBox'>
      <div className='Category'>
      <h1 id='categoryTitle'>Clothes</h1>
      <div className="container">
        {items
        .filter((item) => item.pCategory === "Clothes")
        .slice(0,5)
        .map((item) => (
          <li key={item._id}>
               <div className="categoryItem">
               <img src={item.pImageURL} alt={item.pImageURL} style={{width:"200px"}} className="categoryImg" />
                <div className="itemName" style={{fontSize:"18px", fontFamily:"Verdana, Geneva, Tahoma, sans-serif"}}><p>{item.pName.slice(0, 13)}...</p></div>
                <div className="description"><p>{item.pDescription.slice(0, 15)}...</p></div>
                <div className="price"><p>Rs.{item.pPrice}.00</p></div>
                <div className="button">
                    <button className='btn' onClick={() => onViewDetails(item._id)} >View</button>
                    <button className='btn' onClick={() => addToCart(item, userId)}>Add</button>
                </div>                
            </div>
            
            
          </li>
        ))}
      
    </div>
    <br/>
    <div className="container">
        {items
        .filter((item) => item.pCategory === "Clothes")
        .slice(5,10)
        .map((item) => (
          <li key={item._id}>
               <div className="categoryItem">
               <img src={item.pImageURL} alt={item.pImageURL} style={{width:"200px"}} className="categoryImg" />
                <div className="itemName" style={{fontSize:"18px", fontFamily:"Verdana, Geneva, Tahoma, sans-serif"}}><p>{item.pName.slice(0, 13)}...</p></div>
                <div className="description"><p>{item.pDescription.slice(0, 15)}...</p></div>
                <div className="price"><p>Rs.{item.pPrice}.00</p></div>
                <div className="button">
                    <button className='btn' onClick={() => onViewDetails(item._id)} >View</button>
                    <button className='btn' onClick={() => addToCart(item, userId)}>Add</button>
                </div>                
            </div>
            
            
          </li>
        ))}
      
    </div>
    
      </div>
      <Footer/>
    </div>
  )
}
