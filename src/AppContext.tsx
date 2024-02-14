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

	return (
		<AppContext.Provider
			value={{
				books,
				users,
				loginFormData,
				handleLoginFormFieldChange
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
