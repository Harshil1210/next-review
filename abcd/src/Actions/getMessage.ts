"use server"
import { chatModel } from "@/Models/chatModel";

export const getRoomMessages = async (room: string) => {
  try {
    console.log("room :",room)
    const response = await chatModel.findOne({ room });
    return JSON.stringify(response)
  } catch (error: any) {
    return JSON.stringify(error.message);
  }
};
