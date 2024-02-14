/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import express from 'express';

export const readJsonFile = (filePath: string) => {
	const jsonData = fs.readFileSync(filePath, "utf8");
	const jsonObject = JSON.parse(jsonData);
	return jsonObject;
};

export const extractPortNumber = (text: string) => {
	const regex = /(\d+)/;
	const match = text.match(regex);
	return match ? parseInt(match[0], 10) : 0;
}

export const clearConsole = (): void => {
	process.stdout.write('\x1Bc');
}

export const handleError = (res: express.Response, error: any) => {
	return res.status(500).json(error);
};