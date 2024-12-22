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

                let user = await User.findOne({ googleID: profile.id });
                // console.log(user);

                if (!user) {
                    user = new User({
                        googleID: profile.id,
                        name: profile.name?.givenName,
                        surname: profile.name?.familyName ?? profile.name?.givenName,
                        email: profile.emails?.[0].value,
                        password: "Salam123!"
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
