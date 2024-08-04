import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

export const storeChat = async (data) => {
  try {
    const room = await chatModel.findOne({ room: data.room });
    if (!room) throw new Error({ message: "room not found" });
    room.chats.push({
      message: data.message,
      sender: data.sender,
      time: data.time,
    });
    await room.save();
  } catch (error) {
    console.log(error.message);
  }
};

export const joinRoom = async (room) => {
  try {
    const roomAlreadyExist = await chatModel.findOne({ room });
    if (roomAlreadyExist) {
      return;
    }
    await chatModel.create({ room });
  } catch (error) {
    console.log(error.message);
  }
};

// async function updateUserStatus(userId, status) {
//   try {
//     await userModel.updateOne({ _id: userId }, { online: status });
//     io.emit("update-user-status", { userId, status });
//   } catch (error) {
//     console.error(error.message);
//   }
// }
// const userSchema = new Schema({
//   firstName: { type: String, required: true },
//   // Other fields...
//   online: { type: Boolean, default: false },
// });

// export const userModel = mongoose.models.user || model("user", userSchema);
app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log("a user connected:", socket.id);

    socket.on("group-message", async (data) => {
      io.emit("receive-msg", data);
      await storeChat(data);
    });

    socket.on("private-message", async (data) => {
      io.to(data.room).emit("receive-msg", data);
      await storeChat(data);
    });

    socket.on("join-room", ({ room }) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
      joinRoom(room);
    });

    // socket.on("disconnect", () => {
    //   console.log("user disconnected");
    // const userId = Object.keys(users).find(key => users[key] === socket.id);
    // if (userId) {
    //   delete users[userId];
    //   updateUserStatus(userId, false);
    // }
    // });

    // socket.on("typing", ({ room, user }) => {
    //   socket.to(room).emit("user-typing", { user });
    // });
  
    // socket.on("stop-typing", ({ room, user }) => {
    //   socket.to(room).emit("user-stop-typing", { user });
    // });

  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

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

export const chatModel = mongoose.models.chat || model("chat", chatSchema);

