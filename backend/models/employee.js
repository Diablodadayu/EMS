import mongoose from "mongoose";
const { Schema } = mongoose;
const employeeSchema = new Schema({
  firstName: String,
  lastName: String,
  dateOfJoining: Date,
  dateOfBirth: Date,
  title: String,
  department: String,
  status: Number,
  type: String,
});

const model = mongoose.model("Employee", employeeSchema);
export default model;
