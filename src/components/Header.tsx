import { useContext } from "react";
import { Nav } from "./Nav";
import { AppContext } from "../AppContext";

export const Header = () => {
	const { currentUser } = useContext(AppContext);

	return (
		<>
			<h1 className="text-3xl mb-3 text-slate-800">
				Library Site
				{currentUser.fullName !== "" && (
					<span className="text-red-600 bg-yellow-300 text-2xl py-1 px-2 rounded ml-3">{currentUser.fullName}</span>
				)}
			</h1>
			<Nav />
		</>
	);
};
