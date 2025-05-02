import mongoose, {model, Schema} from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ['superadmin', 'admin', 'teacher', 'student'], default: 'student' },
    enrolledCourses: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'}
}, {timestamps: true});

const User = model('User', userSchema);
export default User;