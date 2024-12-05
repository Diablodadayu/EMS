import mongoose from "mongoose";
const uri =
  "mongodb+srv://hsia1993:0jpRzTDaC0MVuexA@cluster0.ko6dutu.mongodb.net/?retryWrites=true&w=majority";
export default async function run() {
  return await mongoose.connect(uri);
}
