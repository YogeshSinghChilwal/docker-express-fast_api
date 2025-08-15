// models/Todo.js
import { Schema, model } from "mongoose";

const TodoSchema = new Schema({
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String },
  completed: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now }
});
export default model("Todo", TodoSchema);
