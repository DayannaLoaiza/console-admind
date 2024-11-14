import mongoose, { mongo } from "mongoose";

const schema = new mongoose.Schema({
    amount: Number,
    currentState: { type: String, default: "Pending" },
    creationDate: { type: Date, default: Date.now },
    customer: {
        name: String,
        email: String
    },
    productDetails: [
        {
        productName: String,
        quantity: Number,
        unitPrice: Number
        }
    ],
    notes: String      
    },
    { collection: 'orders' }
)

export default mongoose.models.orders || mongoose.model('orders', schema)