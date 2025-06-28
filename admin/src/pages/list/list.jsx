import React, { useEffect, useState } from 'react'
import './list.css'
import { toast } from 'react-toastify'
import axios from 'axios'
const list = () => {


  const url = "http://localhost:4000"
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
     if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error("error")
    }
  } 
  
  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();  
      fetchList();
      if (response.data.success) {
        toast.success(response.data.message)
      } else {
        toast.error("Error")
      }
    }
  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list and flex-col'>

      <p>All Product List</p> 
      <div className="list-table">
        <div className="list-table-format-title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor' >X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default list
