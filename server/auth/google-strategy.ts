import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import { IUser } from "../types/user";
import User from "../mongoose/schemas/user";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
            callbackURL: "http://localhost:3000/auth",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = new User({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails?.[0].value,
                        profileImage: profile.photos?.[0].value,
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
