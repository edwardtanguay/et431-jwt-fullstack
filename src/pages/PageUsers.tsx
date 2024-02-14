import { useContext } from "react";
import { AppContext } from "../AppContext";
import { User } from "../components/User";

export const PageUsers = () => {
	const { users } = useContext(AppContext);
	return (
		<>
			<p className="mb-4">There are {users.length} users:</p>
			<section className="flex gap-2 flex-wrap">
				{users.map((user) => {
					return <User user={user} key={user._id} />;
				})}
			</section>
		</>
	);
};
