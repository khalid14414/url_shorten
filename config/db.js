import mongoose from "mongoose"

export const dbConnection = ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI
        )
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
}