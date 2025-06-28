    import mongoose from "mongoose";

    export const connectDB =async()=>{
            await mongoose.connect('mongodb+srv://project:shivam2005@cluster0.ge3hs7u.mongodb.net/food-del').then (()=>console.log("DB Connected"));
    }