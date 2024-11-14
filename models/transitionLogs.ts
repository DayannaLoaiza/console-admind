import mongoose, { Types } from "mongoose";

const schema = new mongoose.Schema({
    orderId: { type: Types.ObjectId, required: true }, 
    previousState: { type: String, required: true },
    newState: { type: String, required: true },
    transitionDate: { type: Date, default: Date.now },
    actionTaken: { type: String, required: true }      
    },
    { collection: 'transitionLogs' }
)

export default mongoose.models.transitionLogs || mongoose.model('transitionLogs', schema)