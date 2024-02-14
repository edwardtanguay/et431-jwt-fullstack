/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError } from "../../tools";
import { User } from "../schemas/userSchema";
import express from "express";

declare module "express-session" {
	interface SessionData {
		user: object;
	}
}

export const addSingleUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = await User.create(req.body);
		res.status(201).json(user);
	} catch (e) {
		handleError(res, e);
	}
};

export const getSingleUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = await User.findById(req.params.id);
		user
			? res.status(200).json(user)
			: res.status(404).json({ msg: `user ${req.params.id} not found` });
	} catch (e) {
		handleError(res, e);
	}
};

export const getAllUsers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (e) {
		handleError(res, e);
	}
};

export const updateSingleUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		user
			? res.status(200).json(user)
			: res.status(404).json({ msg: `user ${req.params.id} not found` });
	} catch (e) {
		handleError(res, e);
	}
};

export const deleteSingleUser = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		res.status(200).json(user);
	} catch (e) {
		handleError(res, e);
	}
};

export const deleteAllUsers = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const users = await User.deleteMany();
		res.status(200).json(users);
	} catch (e) {
		handleError(res, e);
	}
};

export const loginUser = async (
	req: any,
	res: express.Response
) => {
	try {
		const { login } = req.body;
		const user = await User.findOne({ login });
		if (user !== null) {
			const seconds = 10;
			req.session.user = user;
			req.session.cookie.expires = new Date(Date.now() + seconds * 1000);
			req.session.save();
			res.json(user);
		} else {
			res.status(401).json("bad login");
		}
	} catch (e) {
		handleError(res, e);
	}
};

export const getCurrentUser = async (req: any, res: express.Response) => {
	try {
		if (req.session.user) {
			res.send(req.session.user);
		} else {
			res.status(401).send('no user logged in');
		}
	}
	catch (e) {
		handleError(res, e)
	}
}

export const logoutUser = async (req: any, res: express.Response) => {
	try {
		req.session.user = null;
		res.send('user logged out');
	}
	catch (e) {
		handleError(res, e);
	}
}