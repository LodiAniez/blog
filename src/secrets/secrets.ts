import { config } from "dotenv"
import { Environment } from "./../enums/index"
config()

export const PORT: string | number = process.env.PORT || 8000
export const NODE_ENV: string | undefined = process.env.NODE_ENV || undefined
export const SERVER_ENVIRONMENT: string = NODE_ENV === "development" || !NODE_ENV
	? Environment.LOCAL
	: Environment.PRODUCTION