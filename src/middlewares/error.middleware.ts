import { Request, Response, NextFunction } from "express";
import { AppError, ValidationError } from "../utils/AppError";

export const errorHandler: (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => void = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error("Error:", err.message);

	if (err instanceof ValidationError) {
		return res.status(400).json({
			message: "Validation failed",
			errors: err,
		});
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
			details: err.details,
		});
	}

	res.status(500).json({ message: "Internal Server Error", details: err });
};
