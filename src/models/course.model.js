import { model, Schema } from "mongoose";

export const courseSchema = new Schema({
    title: String,
    description: String
});

const Course = model('Course', courseSchema);
export default Course;