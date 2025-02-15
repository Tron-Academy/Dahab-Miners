import { UnauthenticatedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/jwtUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("unable to access");
  try {
    const { userId, username } = verifyJWT(token);
    req.user = { userId, username };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("invalid authorization");
  }
};

export const superAdmin = async (req, res, next) => {
  try {
    const { userId, username } = req.user;
    if (username === "Admin") {
      next();
    } else {
      throw new UnauthenticatedError("invalid authorization");
    }
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("invalid authorization");
  }
};
