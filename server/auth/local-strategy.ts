import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../mongoose/schemas/user";
import { comparePasswords } from "../utils/bcrypt";
import { IUser } from "../types/user";

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  if (!user) {
    return done(new Error("User not found"));
  }
  const userObj: IUser = user.toObject();
  delete userObj.password;
  done(null, userObj);
});

export default passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({
          email,
        });
        if (!user || !comparePasswords(password, user.password)) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }
        if (user.isBlocked) {
          return done(null, false, {
            message: "User is blocked",
          });
        }

        const userObj: IUser = user.toObject();
        delete userObj.password;

        done(null, userObj);
      } catch (error) {
        done(null, false, {
          message: (error as Error).message,
        });
      }
    }
  )
);
