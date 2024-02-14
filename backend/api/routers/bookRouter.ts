import express from 'express';
import { addSingleBook, deleteAllBooks, deleteSingleBook, getAllBooks, getSingleBook, updateSingleBook } from '../controllers/bookController';

export const bookRouter = express.Router();

bookRouter
	.route('/')
	.post(addSingleBook)
	.get(getAllBooks)
	.delete(deleteAllBooks);
bookRouter
	.route('/:id')
	.get(getSingleBook)
	.delete(deleteSingleBook)
	.patch(updateSingleBook);