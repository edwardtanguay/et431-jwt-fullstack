import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Book } from "../components/Book";

export const PageBooks = () => {
	const { books } = useContext(AppContext);
	return (
		<>
			<p className="mb-4">There are {books.length} books:</p>
			<section className="flex gap-2 flex-wrap">
				{books.map((book) => {
					return <Book book={book} key={book._id} />;
				})}
			</section>
		</>
	);
};
