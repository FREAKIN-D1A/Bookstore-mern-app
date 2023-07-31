import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for  cors
app.use(cors());
// app.use(
// 	cors({
// 		// origin: "http://localhost:${PORT}",
// 		origin: process.env.PUBLIC_URL,
// 		methods: ["GET", "POST", "PUT", "DELETE"],
// 		allowedHeaders: ["Content-Type"],
// 	})
// );

const connectToDatabase = async () => {
	try {
		await mongoose.connect(mongoDBURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("App connected to database");
		app.listen(PORT, () => {
			console.log(
				`App is listening to port: ${PORT}\n go to http://localhost:${PORT}`
			);
		});
	} catch (error) {
		console.log(error);
	}
};

connectToDatabase();

app.get("/", (request, response) => {
	console.log(request);
	return response.status(234).send("Welcome To MERN Stack Tutorial");
});

app.use("/books", booksRoute);
