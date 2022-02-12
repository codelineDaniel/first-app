class ValidationError extends Error {}
class isExistedError extends Error {}

const handleError = (err, req, res, next) => {
  // console.error(err);
  if (err instanceof ValidationError) {
    res.status(err instanceof ValidationError ? 400 : 500).send({
      message:
        err instanceof ValidationError
          ? err.message
          : "Przepraszamy, spróbuj ponownie za kilka minut.",
    });
  } else if (err instanceof isExistedError) {
    res.status(409).send({
      message:
        err instanceof isExistedError
          ? err.message
          : "Przepraszamy, spróbuj ponownie za kilka minut.",
    });
  }
};

module.exports = {
  handleError,
  ValidationError,
  isExistedError,
};
