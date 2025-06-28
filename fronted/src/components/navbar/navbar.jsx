import React, { Profiler, useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/storecontext';

const Navbar = ({ setShowLogin }) => {

  const [menu, setmenu] = useState("Home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext)

  const navigate =useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")

  }
  return (
    <div className="Navbar">
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

      <ul className="navbar-menu">
        <Link to='/' onClick={() => setmenu("Home")} className={menu === "Home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={() => setmenu("Menu")} className={menu === "Menu" ? "active" : ""}>Menu</a>
        <a href='#appdownload' onClick={() => setmenu("Mobile-App")} className={menu === "Mobile-App" ? "active" : ""}>Mobile App</a>
        <a href='#footer' onClick={() => setmenu("Contact-us")} className={menu === "Contact-Us" ? "active" : ""}>Contact Us</a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to='/Cart'> <img src={assets.basket_icon} alt="Basket" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? <button onClick={() => setShowLogin(true)} >Sign In</button>
          : <div className='navbar-profile'>

            <img src={assets.profile_icon} alt="" />
            <ul className='navbar-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')} ><img src={assets.bag_icon} alt="" /><p>orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>log out</p></li>
            </ul>
          </div>

        }

      </div>
    </div>
  );
};

export default Navbar;
