import dotenv from "dotenv";
import * as tools from "./tools";
import * as config from "./config";

dotenv.config();

export const backendPort = (): number => {
	return 4211;
};

export const frontendPort = (): number => {
	const packageJsonObj = tools.readJsonFile("./package.json");
	const devCommand = packageJsonObj.scripts.frontend;
	const port = tools.extractPortNumber(devCommand);
	return port;
};

export const dbUrl = (): string => {
	const dbUrl = process.env.DB_URL;
	if (typeof dbUrl === "string") {
		return dbUrl;
	} else {
		return "";
	}
};

export const backendUrl = (): string => {
	return `http://localhost:${config.backendPort()}`;
};

export const sessionSecret = (): string => {
	return String(process.env.SESSION_SECRET);
};
