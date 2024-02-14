import { IBook } from "../interfaces";

interface IProps {
	book: IBook;
}

export const Book = ({ book }: IProps) => {
	return (
		<div className="bg-slate-300 p-3 w-[15rem] rounded">
			<p className="font-semibold">{book.title}</p>
			{book.authors.map((author, index) => {
				return <p key={index}>Author: {author}</p>
			})}
			{book.available ? (
				<p>Book is available.</p>
			) : (
				<p>Currently not available.</p>
			)}
		</div>
	);
};
