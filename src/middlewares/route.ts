import { Express } from "express"
import blogRoute from "./../routes/blog"

export const route = (app: Express) => {
	app.use("/blog", blogRoute)
}