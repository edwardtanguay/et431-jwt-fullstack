/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { createContext, useEffect, useState } from "react";
import { IBook, ILoginFormData, IUser, initialLoginformData } from "./interfaces";
import axios from "axios";

const backendUrl = 'http://localhost:4211';

interface IAppContext {
	books: IBook[];
	users: IUser[];
	loginFormData: ILoginFormData;
	handleLoginFormFieldChange: (fieldIdCode: string, fieldValue: string) => void;
	handleLoginFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [books, setBooks] = useState<IBook[]>([]);
	const [users, setUsers] = useState<IUser[]>([]);
	const [loginFormData, setLoginFormData] = useState<ILoginFormData>(initialLoginformData)

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/books`);
			const _books:IBook[] = response.data;
			setBooks(_books);
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const response = await axios.get(`${backendUrl}/users`);
			const _users:IUser[] = response.data;
			setUsers(_users);
		})();
	}, []);

	const handleLoginFormFieldChange = (fieldIdCode: string, fieldValue: string) => {
		switch (fieldIdCode) {
			case 'login':
				loginFormData.login = fieldValue;
				break;
			case 'password':
				loginFormData.password = fieldValue;
				break;
		}
		setLoginFormData(structuredClone(loginFormData));
	}

	const handleLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
					console.log(response.data);
				} else {
					console.log("ERROR: bad login");
				}
			} catch (e: any) {
				console.log("ERROR: bad login");
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
				handleLoginFormSubmit
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
