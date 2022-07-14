import { Response } from "express"
import { PORT, SERVER_ENVIRONMENT } from "./../secrets/secrets"

export class ErrorException extends Error {
	statusCode: number | null
	message: string
	data: any

	constructor(msg: string, code?: number, data?: any) {
		super(msg)

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ErrorException)
		}

		this.statusCode = code || null
		this.message = msg
		this.data = data
	}
}

export const respondError = (res: Response, err: unknown): void => {
	const error: ErrorException = err as ErrorException

	res.status(error.statusCode || 500).send({
		message: error.message || "Internal Server Error.",
		status: false
	})
}

export const generateImagePath = (filename: string): string => {
	return `${SERVER_ENVIRONMENT}:${PORT}/static/${filename}`
}