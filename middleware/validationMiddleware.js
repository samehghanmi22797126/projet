// middleware/validationMiddleware.js
const validationMiddleware = (schema) => (req, res, next) => {
  const options = { abortEarly: false, allowUnknown: true, stripUnknown: true };
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    return res.status(400).json({
      message: "Erreur de validation",
      details: error.details.map((d) => d.message),
    });
  }

  req.body = value;
  next();
};

module.exports = validationMiddleware;
