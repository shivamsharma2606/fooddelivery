import React, { useEffect, useState } from 'react'
import './orders.css'
import { toast } from "react-toastify"
import axios from "axios"
import { assets } from '../../assets/assets'

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("Server Error");
      console.error(error);
    }
  };

  const statusHandler =   async (event,orderId)=>{
    const respose = await  axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    if (respose.data.success) {
        await fetchAllOrders();
    }
    
   }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Ordar Page</h3>
      <div className='Order List'>
        {orders.map((order, index) => (
          <div key={index} className='order-item' >
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + "X" + item.quantity
                  }
                  else {
                    return item.name + "X" + item.quantity

                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName + " " + order.address.lastname}</p>
              <p className="order-item-address">
                <p>{order.address.streeyt + ","}</p>
                <p>{order.address.city + "," + order.address.state + "," + order.address.country + "," + order.address.Zipcode + ","}</p>
              </p>
              <p className='order-item-phone'>{order.address.phone}</p>
              <p>Items : {order.items.length}</p>
              <p>${order.amount}</p>
              <select onChange={(event)=>statusHandler(event,order._id)}value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default Orders;
