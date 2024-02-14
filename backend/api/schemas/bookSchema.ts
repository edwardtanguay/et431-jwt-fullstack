import mongoose from 'mongoose';

export const bookSchema = new mongoose.Schema(
	{
		title: String,
		authors: [String],
		pages: Number,
		available: Boolean
	},
	{
		collection: 'books',
		timestamps: true
	}
);

export const Book = mongoose.model('Book', bookSchema);