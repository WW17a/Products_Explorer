import bcrypt from "bcryptjs";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import { generateToken } from "../utils/jwt.js";

export const signup = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new AppError("Email is already registered", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    return {
        id: user._id,
        name: user.username,
    };
};

export const signin = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    }

    const token = generateToken(user._id.toString());

    return {
        id: user._id,
        name: user.username,
        token,
    };
};