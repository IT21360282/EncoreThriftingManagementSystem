import './myOrders.css';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function MyOrders() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [paymentCount, setPaymentCount] = useState(0);

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

  // Get user ID
  const userId = userData && userData._id;


  const getPayments = useCallback(() => {
    axios
      .get('http://localhost:8000/pay/getPayments')
      .then((res) => {
        console.log(res.data);
        const filteredItems = res.data.filter((payment) => payment.userId === userId);
        setPayments(filteredItems.reverse());
        setPaymentCount(filteredItems.length);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  if (loading) {
    return <div className="displayBox">Loading...</div>;
  }

  const paymentDelete = (paymentId) => {
    console.log('Deleting payment with id:', paymentId);

    axios
      .delete(`http://localhost:8000/pay/deletePayment/${paymentId}`)
      .then(() => {
        console.log('Payment deleted');
        setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== paymentId));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="displayBox">
      <h3 className="pageTitle">My Orders</h3>
      <div className="orderBox">
        <div>
          <div>
            <table id="orderTable">
              <thead>
                <tr>
                  <th>Order.no</th>
                  <th>Item Name</th>
                  <th>Units</th>
                  <th>Order Date</th>
                  <th>Total</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{paymentCount - index}</td>
                    <td>{payment.ItemName}</td>
                    <td>{payment.units}</td>
                    <td>{new Date(payment.createdAt).toLocaleDateString()}</td>
                    <td>{payment.total}</td>
                    <td>
                      <button onClick={() => paymentDelete(payment._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
