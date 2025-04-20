const jwt = require("jsonwebtoken");

// == Obtención y Verificación de token ===================
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer "))
    return res.status(403).send({ message: "Se requiere autorización" });

  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).send({ message: "Se requiere autorización" });
  }

  req.user = payload;
  next();
};
