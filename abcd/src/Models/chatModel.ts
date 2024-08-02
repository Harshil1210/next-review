import mongoose, { Schema, model } from "mongoose";

const chatSchema = new Schema({
  room: { type: String, required: true },
  chats: [
    {
      message: { type: String, required: true },
      sender: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
});

export const chatModel = mongoose.models?.chat || model("chat", chatSchema);
