import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/jwtUtils.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token; //for flutter
  if (!token) throw new UnauthenticatedError("unable to access");
  try {
    const { userId, username, role } = verifyJWT(token);
    req.user = { userId, username, role };
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("invalid authorization");
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const { userId, username, role } = req.user;
    if (role === "superAdmin" || role === "admin" || role === "repairAdmin") {
      next();
    } else {
      throw new UnauthenticatedError("invalid authorization");
    }
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("invalid authorization");
  }
};

export const isSuperAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "superAdmin") {
      next();
    } else {
      throw new UnauthenticatedError("Not Authorised for this operation");
    }
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Not Authorised for this operation");
  }
};

export const isEditor = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "admin") {
      next();
    } else {
      throw new UnauthenticatedError("Not Authorised for this operation");
    }
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Not Authorised for this operation");
  }
};

export const isRepairAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "repairAdmin") {
      next();
    } else {
      throw new UnauthenticatedError("Not Authorised for this operation");
    }
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("Not Authorised for this operation");
  }
};

export const isIntermine = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) throw new UnauthenticatedError("Missing API Key");
  if (apiKey !== process.env.INTERMINE_ALLOW_API_KEY)
    throw new BadRequestError("Invalid API Key");
  next();
};
