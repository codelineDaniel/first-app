import {Request, Response ,NextFunction} from "express";

export class ValidationError extends Error {}
export class isExistedError extends Error {}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
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


