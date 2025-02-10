import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler: (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => void = (err: Error, req: Request, res: Response, next: NextFunction) => {
	console.error("Error:", err.message);

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			message: err.message,
			details: err.details,
		});
	}

	res.status(500).json({ message: "Internal Server Error" });
};
