import express from 'express';
import * as config from '../config';
import cors from 'cors';
import mongoose from 'mongoose';
import * as tools from '../tools';
import { bookRouter } from './routers/bookRouter';
import { userRouter } from './routers/userRouter';
// import session from "express-session";
// import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cors());
// app.use(
// 	session({
// 		resave: true,
// 		saveUninitialized: true,
// 		secret: config.sessionSecret()
// 	})
// )
// app.use(cookieParser());

app.get('/', (_req, res) => {
	res.send('<h1>Book Site API</h1>');
});

app.use('/books', bookRouter);
app.use('/users', userRouter);

(async () => {
	try {
		// const connectionOptions = {
		//	dbName: 'booksite'
		// }
		mongoose.set("strictQuery", false);
		// await mongoose.connect(config.dbUrl(), connectionOptions);
		await mongoose.connect(config.dbUrl());
		app.listen(config.backendPort(), () => {
			tools.clearConsole();
			console.log(`---`);
			console.log(`FRONTEND SITE is running at: http://localhost:${config.frontendPort()}`)
			console.log(`BACKEND API is running at: http://localhost:${config.backendPort()}`)
		});
	}
	catch (error) {
		console.log(`SERVER IS NOT RUNNING BECAUSE: ${error.message}`);
	}
})();
