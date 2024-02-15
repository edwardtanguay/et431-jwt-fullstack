import express from 'express';

interface CustomRequest extends Request {
	token: string;
}

export const decodeJwt = (token: string) => {
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace("-", "+").replace("_", "/");
	const decodedData = JSON.parse(
		Buffer.from(base64, "base64").toString("binary")
	);
	return decodedData;
};

export const verifyToken = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const bearerHeader = req.headers["authorization"];
	if (typeof bearerHeader !== "undefined") {
		const bearer = bearerHeader.split(" ");
		const bearerToken = bearer[1];
		(req as unknown as CustomRequest).token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
};
