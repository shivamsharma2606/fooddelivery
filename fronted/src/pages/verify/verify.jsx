import React, { useContext, useEffect } from 'react';
import './verify.css';
import { useSearchParams, useNavigate } from 'react-router-dom'; // ✅ useNavigate added
import { StoreContext } from '../../context/storecontext';
import axios from 'axios';

const Verify = () => {   

    const [searchParms] = useSearchParams();
    const success = searchParms.get("success");
    const orderId = searchParms.get("orderId");
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();  
    const verifyPayment = async () => {
        try {
            const response = await axios.post(url + "/api/order/verify", { success, orderId });
            if (response.data.success) {
                navigate("/myorders");
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error("Verification Error:", error);
            navigate("/");
        }
    }

    useEffect(() => {
        verifyPayment();
    }, []);

    console.log(success, orderId);

    return (
        <div className='verify'>
            <div className='spinner'></div>
        </div>
    );
}

export default Verify;  