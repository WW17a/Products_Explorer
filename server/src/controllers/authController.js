import * as authService from "../services/authService.js";

export const signup = async (req, res, next) => {
    try {

        const user = await authService.signup(req.body);

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    try {
        const user = await authService.signin(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (error) {
        next(error);
    }
};