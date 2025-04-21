module.exports.typeOfError = (error) => {
  if (error.name == "NotFoundError") {
    error.statusCode = 404;
  } else if (error.name == "ValidationError") {
    error.statusCode = 400;
  } else {
    error.statusCode = 500;
    error.message = error.message || "Error desconocido.";
  }

  return error;
};
