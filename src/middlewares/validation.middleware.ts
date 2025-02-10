import { Request, Response, NextFunction } from "express";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { AppError } from "../utils/AppError";

export const validateRequest = (
	DtoClass: any,
	validateTarget: "body" | "params" = "body"
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const target = validateTarget === "body" ? req.body : req.params;
		const dtoInstance = plainToInstance(DtoClass, target);
		const errors: ValidationError[] = await validate(dtoInstance);

		if (errors.length > 0) {
			const errorMessages = errors.flatMap((error) =>
				Object.values(error.constraints || {})
			);
			return next(new AppError("Validation failed", 400, errorMessages));
		}

		if (validateTarget === "body") {
			req.body = dtoInstance;
		} else {
			req.params = dtoInstance as unknown as Record<string, any>;
		}

		next();
	};
};
