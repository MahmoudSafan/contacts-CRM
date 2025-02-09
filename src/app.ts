import express, { Request, Response, NextFunction } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
	res.send("hello world");
});

const PORT = 3000;

app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
