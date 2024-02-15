import express from 'express';
import * as jwttools from '../jwttools';

import {
	getSingleUser,
	getAllUsers,
	addSingleUser,
	updateSingleUser,
	deleteSingleUser,
	deleteAllUsers,
	loginUser,
	getCurrentUser,
	// logoutUser,
} from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter
	.route('/')
	.post(addSingleUser)
	.get(getAllUsers)
	.delete(deleteAllUsers);
userRouter
	.route('/current')
	.get(jwttools.verifyToken, getCurrentUser);
// userRouter
	// .route('/logout')
	// .get(logoutUser);
userRouter
	.route('/:id')
	.get(getSingleUser)
	.patch(updateSingleUser)
	.delete(deleteSingleUser);
userRouter
	.route('/login')
	.post(loginUser);