import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
  // 1. Read the token
  const token = req.headers["authorization"];
  // 2. if no token, return the error
  if (!token) {
    return res.status(401).send("Unauthorized Token");
  }
  // 3. Check if the token is valid
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = payload.userID;
    console.log(payload);
  } catch (error) {
    // 4. Return the error
    return res.status(401).send("Unauthorized");
  }
  // 5. call the next middleware
  next();
}
