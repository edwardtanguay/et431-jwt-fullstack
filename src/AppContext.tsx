/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useEffect, useState } from "react";
import {
	IBook,
	ICurrentUser,
	ILoginFormData,
	IUser,
	initialCurrentUser,
	initialLoginformData,
} from "./interfaces";
import axios from "axios";

const backendUrl = "http://localhost:4211";

interface IAppContext {
	books: IBook[];
	users: IUser[];
	loginFormData: ILoginFormData;
	handleLoginFormFieldChange: (
		fieldIdCode: string,
		fieldValue: string
	) => void;
	handleLoginFormSubmit: (
		e: React.FormEvent<HTMLFormElement>,
		callback: () => void
	) => void;
	currentUser: ICurrentUser;
	handleLogout: (callback: () => void) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [books, setBooks] = useState<IBook[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [loginFormData, setLoginFormData] = useState<ILoginFormData>(
		structuredClone(initialLoginformData)
	);
	const [currentUser, setCurrentUser] = useState<ICurrentUser>(
		structuredClone(initialCurrentUser)
	);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/books`);
			const _books: IBook[] = response.data;
			setBooks(_books);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/users`);
			const _users: IUser[] = response.data;
			setUsers(_users);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const headers = {
					"Content-Type": "application/json",
					authorization: "Bearer " + localStorage.getItem("token"),
				};
				const response = await axios.get(
					`${backendUrl}/users/current`,
					{
						headers,
					}
				);
				if (response.status === 200) {
					setCurrentUser(response.data.user);
				} else {
					setCurrentUser(initialCurrentUser);
				}
			} catch (e) {
				setCurrentUser(initialCurrentUser);
			}
		})();
	}, []);

	const handleLoginFormFieldChange = (
		fieldIdCode: string,
		fieldValue: string
	) => {
		switch (fieldIdCode) {
			case "login":
				loginFormData.login = fieldValue;
				break;
			case "password":
				loginFormData.password = fieldValue;
				break;
		}
		setLoginFormData(structuredClone(loginFormData));
	};

	const handleLogout = (callback: () => void) => {
		localStorage.setItem('token', '');
		setCurrentUser(structuredClone(initialCurrentUser));
		callback();
	};

	const handleLoginFormSubmit = (
		e: React.FormEvent<HTMLFormElement>,
		callback: () => void
	) => {
		e.preventDefault();
		(async () => {
			const headers = {
				"Access-Control-Allow-Origin": "*",
				"Content-Type": "application/json",
			};
			try {
				const response = await axios.post(
					`${backendUrl}/users/login`,
					loginFormData,
					{ headers }
				);

				if (response.status === 200) {
					localStorage.setItem("token", response.data.token);
					setCurrentUser(response.data.user);
					setLoginFormData(structuredClone(initialLoginformData));
					callback();
				} else {
					console.log("ERROR: bad login");
					setCurrentUser(initialCurrentUser);
					loginFormData.message = "Bad login, try again.";
					setLoginFormData(structuredClone(loginFormData));
				}
			} catch (e: any) {
				console.log("ERROR: bad login");
				setCurrentUser(initialCurrentUser);
				loginFormData.message = "Bad login, try again.";
				setLoginFormData(structuredClone(loginFormData));
			}
		})();
	};

	return (
		<AppContext.Provider
			value={{
				books,
				users,
				loginFormData,
				handleLoginFormFieldChange,
				handleLoginFormSubmit,
				currentUser,
				handleLogout,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
