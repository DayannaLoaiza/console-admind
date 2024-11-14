"use server";

import orders from "@/models/order";
import { connecDB } from "./mongodb";
import { OrderInfo, OrderState, ProductDetail, TransitionLogs } from "./definitions";
import transitionLogs from "@/models/transitionLogs";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function getOrders() {
    try {
        await connecDB();
        const ordersres = await orders.find().lean();
        const orderData = ordersres.map((order: any) => ({
            ...order,
            _id: order._id.toString(),
            productDetails: order.productDetails.map((product: any) => ({
              ...product,
              _id: product._id ? product._id.toString() : undefined,
            })),
            creationDate: order.creationDate ? order.creationDate.toISOString() : undefined,
          }));
          
        return {
            statusCode: 200,
            success: true,
            data: orderData
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        const isClientError = error instanceof Error && (error.name === 'ValidationError' || error.name === 'CastError');
        
        return {
            statusCode: isClientError ? 400 : 500,
            success: false,
            message: isClientError ? "Invalid request data" : "Internal server error",
            error: errorMessage
        };
    }
}

export async function createOrder(orderInfo: OrderInfo) {
    try {
        await connecDB()
        const newOrder  = await orders.create(orderInfo);

        const orderData = newOrder.toObject();

        orderData._id = orderData._id.toString();
        orderData.productDetails = orderData.productDetails.map((detail:ProductDetail) => ({
            ...detail,
            _id: detail._id ? detail._id.toString() : undefined,
        }));
        revalidatePath(`/management`, 'page');
        return {
            statusCode: 200,
            success: true,
            data: orderData
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        const isClientError = error instanceof Error && (error.name === 'ValidationError' || error.name === 'CastError');
        
        return {
            statusCode: isClientError ? 400 : 500,
            success: false,
            message: isClientError ? "Invalid request data" : "Internal server error",
            error: errorMessage
        };
    }
}

export async function updateOrderState(orderId: string, prevStatus: OrderState, newStatus: OrderState, action: string) {
    try {
        await connecDB()
        const updatedOrder = await orders.findByIdAndUpdate(
            orderId,
            { currentState: newStatus },
            { new: true }
          );

        const transitionLog: TransitionLogs = {
            orderId: new mongoose.Types.ObjectId(orderId),
            previousState: prevStatus,
            newState: newStatus,
            actionTaken: action
        };

        await transitionLogs.create(transitionLog);

        const orderData = updatedOrder.toObject();

        orderData._id = orderData._id.toString();
        orderData.productDetails = orderData.productDetails.map((detail:ProductDetail) => ({
            ...detail,
            _id: detail._id ? detail._id.toString() : undefined,
        }));
        revalidatePath(`/management`, 'page');
        return {
            statusCode: 200,
            success: true,
            data: []
        };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        const isClientError = error instanceof Error && (error.name === 'ValidationError' || error.name === 'CastError');
        
        return {
            statusCode: isClientError ? 400 : 500,
            success: false,
            message: isClientError ? "Invalid request data" : "Internal server error",
            error: errorMessage
        };
    }
}

export async function getTransitionLogs() {
    try {
        await connecDB();
        const logs = await transitionLogs.find().lean();

        const logsData = logs.map((log: any) => ({
            ...log,
            _id: log._id.toString(),
            orderId: log.orderId.toString(),
            transitionDate: log.transitionDate ? log.transitionDate.toISOString() : undefined,
          }));
          
        return {
            statusCode: 200,
            success: true,
            data: logsData
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        const isClientError = error instanceof Error && (error.name === 'ValidationError' || error.name === 'CastError');
        
        return {
            statusCode: isClientError ? 400 : 500,
            success: false,
            message: isClientError ? "Invalid request data" : "Internal server error",
            error: errorMessage
        };
    }
}