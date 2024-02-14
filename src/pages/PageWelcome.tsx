import { useContext } from "react";
import { AppContext } from "../AppContext";

export const PageWelcome = () => {
	const { books, users } = useContext(AppContext);

	return (
		<>
			<p>There are {books.length} books.</p>
			<p>There are {users.length} users.</p>
		</>
	);
};
