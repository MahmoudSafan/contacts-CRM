import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { AppError } from "../utils/AppError";

export const validateRequest = (dtoClass: any) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const dtoInstance = plainToInstance(dtoClass, req.body);
		const errors: ValidationError[] = await validate(dtoInstance);

		if (errors.length > 0) {
			const errorMessages = errors.flatMap((error) =>
				Object.values(error.constraints || {})
			);
			return next(new AppError("Validation failed", 400, errorMessages));
		}

		req.body = dtoInstance;
		next();
	};
};
