import crypto from "crypto"
import { Request, Response } from "express";
import { hashPassword } from "../utils/bcrypt";

import User from "../mongoose/schemas/user";
import { transporter } from "../utils/mail";
import { IUser } from "../types/user";


const login = (req: Request, res: Response) => {

    res.json({
        message: "Login successful",
        user: req.user
    })
}


const register = async (req: Request, res: Response) => {
    const user = req.matchedData;
    user.password = hashPassword(user.password);

    const userExist = await User.findOne({
        email: user.email,
    });

    if (userExist) {
        res.status(400).json({
            message: "User already exists with this email",
        });
        return;
    }

    const newUser = new User(user);
    await newUser.save();

    const userObj: IUser = newUser.toObject();
    delete userObj.password;
    res.json({
        message: "Register successful",
        user: userObj,
    });
};

const logout = (req: Request, res: Response) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({
                message: "Something went wrong",
            })
        }
        res.json({
            message: "Logout successful"
        })
    })
}

const currentUser = (req: Request, res: Response) => {
    res.json({
        message: "Current user",
        user: req.user
    })
}

const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                message: "User not found with this email",
            });
            return
        }
        const token = crypto.randomBytes(32).toString("hex");

        user.resetPasswordToken = token;
        user.resetPasswordTokenExpires = new Date(Date.now() + 3600000);
        await user.save();
        transporter.sendMail({
            from: '"Authentication 👻" <mmmdovasbnm47@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Reset Your Password", // Subject line
            html: `
        <h1>Reset Your Password</h1>
        <p>Click <a href="http://localhost:5173/reset-password/${token}">here</a> to reset your password</p>
        <p>If you didn't request this, please ignore this email</p>
        <p>Your token will expire in 1 hour</p>
        <p>Your token is: ${token}</p>
      `,
        });
        res.json({
            message: "Email sent",
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


const resetPassword = async (req: Request, res: Response) => {
    const { token, password } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400).json({ message: "Invalid or expired token" });
        return;
    }

    user.password = hashPassword(password);
    user.resetPasswordToken = "";
    user.resetPasswordTokenExpires = new Date(0);
    await user.save();

    res.json({
        message: "Password reset successful",
    });
};



const authController = {
    login,
    register,
    logout,
    currentUser,
    forgotPassword,
    resetPassword
}

export default authController