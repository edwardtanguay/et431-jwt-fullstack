import { handleError } from "../../tools";
import { Book } from "../schemas/bookSchema";
import express from 'express';

export const addSingleBook = async (req: express.Request, res: express.Response) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (e) {
    res.status(500).json(e);
  }
};

export const getSingleBook = async (req: express.Request, res: express.Response) => {
	try {
		const book = await Book.create(req.body);
		res.status(200).json(book);
	}
	catch (error) {
		handleError(res, error);
	}
}

export const getAllBooks = async (_req: express.Request, res: express.Response) => {
	try {
		const books = await Book.find();
		res.json(books);
	}
	catch (error) {
		handleError(res, error);
	}
}

export const updateSingleBook = async (req: express.Request, res: express.Response) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    book
      ? res.status(200).json(book)
      : res.status(404).json({ msg: `book not found ${req.params.id}` });
  } catch (e) {
    handleError(res, e);
  }
};

export const deleteSingleBook = async (req: express.Request, res: express.Response) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    book
      ? res.status(200).json(book)
      : res.status(404).json({ msg: `book not found ${req.params.id}` });
  } catch (e) {
    handleError(res, e);
  }
};

export const deleteAllBooks = async (req: express.Request, res: express.Response) => {
  try {
    const books = await Book.deleteMany();
    res.status(200).json(books);
  } catch (e) {
    handleError(res, e);
  }
};
