import React, { useContext } from 'react'
import './Fooddisplay.css'
import { StoreContext } from '../../context/storecontext'
import Fooditem from '../Foodlitem/Fooditem'

const Fooddisplay = ({category}) => {

  const {food_list}=useContext(StoreContext)
  return (
    <div className='food_diaplay' id='food_display' >
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
        if (category==="All"||category===item.category) {
          
          return<Fooditem key={index} id={item._id}  name={item.name} price={item.price} description={item.description} image={item.image} /> 
        }
        })}
      </div>
    </div>
  )
}

export default Fooddisplay
