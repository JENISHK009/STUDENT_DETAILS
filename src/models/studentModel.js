import { Schema, model } from "mongoose";
import feedbackSchema from "./schema/feedbackSchema";

const studentSchema = new Schema(
  {
    name: { type: String },
    admissionNumber: { type: Number },
    class: { type: String },
    marks: [{ type: String }],
    feedback: [feedbackSchema],
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const Student = new model("student", studentSchema);
export default Student;
