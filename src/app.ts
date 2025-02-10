import express from "express";
import contactRoutes from "./routes/contact.routes";
import { loggingMiddleware } from "./middlewares/logging.middleware";
import { errorHandler } from "./middlewares/error.middleware";
const app = express();

app.use(express.json());
app.use(loggingMiddleware);

app.use("/", contactRoutes);

app.use(errorHandler);

export default app;
