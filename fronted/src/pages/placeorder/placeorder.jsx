import React, { useContext, useEffect, useState } from 'react';
import './placeorder.css';
import { StoreContext } from '../../context/storecontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    Zipcode: "",
    country: "",
    phone: ""
  });

  const onchangeHander = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    // Create order items from cart
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    // Final order data
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    // Debug logs
    console.log("Order payload:", orderData);
    console.log("Token:", token);

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      console.log("Order response:", response.data);

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert(response.data.message || "Error placing order");
      }
    } catch (err) {
      console.error("Order error:", err);
      alert("Server error while placing order");
    }
  };

   const navigate = useNavigate();

useEffect(()=>{
    if (!token) {
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0) 
    {
      navigate('/cart ')
    }
},[token])
  return (
    <div>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input required name='firstName' value={data.firstName} onChange={onchangeHander} type="text" placeholder="First name" />
            <input name='lastname' value={data.lastname} onChange={onchangeHander} type="text" placeholder="Last name" />
          </div>
          <input required name='email' value={data.email} onChange={onchangeHander} type="email" placeholder="Email address" />
          <input required name='street' value={data.street} onChange={onchangeHander} type="text" placeholder="Street" />
          <div className="multi-fields">
            <input required name='city' value={data.city} onChange={onchangeHander} type="text" placeholder="City" />
            <input required name='state' value={data.state} onChange={onchangeHander} type="text" placeholder="State" />
          </div>
          <div className="multi-fields">
            <input required name='Zipcode' value={data.Zipcode} onChange={onchangeHander} type="text" placeholder="Zip code" />
            <input required name='country' value={data.country} onChange={onchangeHander} type="text" placeholder="Country" />
          </div>
          <input required name='phone' value={data.phone} onChange={onchangeHander} type="text" placeholder="Phone" />
        </div>

        <div className="place-order-right"></div>

        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO CHECKOUT</button>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
