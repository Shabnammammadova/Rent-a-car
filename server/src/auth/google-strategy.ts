import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { IUser } from "../types/user";
import User from "../mongoose/schemas/user";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/auth",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleID: profile.id });

                if (!user) {
                    const randomPassword = crypto.randomBytes(16).toString("hex");
                    const hashedPassword = await bcrypt.hash(randomPassword, 10);
                    const defaultEmail = profile.emails?.[0]?.value
                    user = new User({
                        googleID: profile.id,
                        name: profile.name?.givenName,
                        surname: profile.name?.familyName ?? profile.name?.givenName,
                        email: defaultEmail,
                        password: hashedPassword,
                        avatar: profile.photos?.[0]?.value,
                    });

                    await user.save();
                }
                const userObj: IUser = user.toObject();
                delete userObj.password;

                done(null, userObj);
            } catch (error) {
                done(error);
            }
        }
    )
);
