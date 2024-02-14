import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
	{
		login: String,
		hash: String,
		firstName: String,
		lastName: String,
		mobile: Number,
		email: String,
		address: {
			street: String,
			zipCode: String,
			city: String,
		},
	},
	{
		collection: 'users',
		timestamps: true,
		versionKey: false,
	}
);

export const User = mongoose.model('User', userSchema);
