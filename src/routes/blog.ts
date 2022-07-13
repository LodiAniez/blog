import { Router, Request, Response } from "express";
import { ErrorException, respondError } from "./../utils";
import { blog } from "./../models/schema"
import { IBlog, IMulterFile } from "./../models/interface"
import { upload } from "../middlewares/upload";

const app: Router = Router()

app.post("/new", upload.array("images"), async (req: Request, res: Response) => {
	try {
		const { title, description }: IBlog = req.body
		const files: IMulterFile[] = req.files as IMulterFile[]

		if (!title || !description) throw new ErrorException("Blog title and description is required.", 406)

		const blogData: IBlog = {
			title, description,
			images: files.map((file: IMulterFile) => ({ filename: file.filename, path: file.path }))
		}

		const newblog = new blog(blogData)

		const processedBlog: IBlog = await newblog.save()

		res.status(200).send({
			message: "Blog is successfully created!",
			data: { slug: processedBlog.slug || null }
		})
	} catch (err: unknown) {
		respondError(res, err)
	}
})

app.put("/update/:slug", upload.array("images"), async (req: Request, res: Response) => {
	try {
		const { slug } = req.params
		const { title, description }: IBlog = req.body
		const files: IMulterFile[] = req.files?.length
			? (req.files as IMulterFile[])
			: []

		if (!slug) throw new ErrorException("Slug data is missing!", 406)

		const data: IBlog = {
			title, description,
			images: files.map((file: IMulterFile) => ({ filename: file.filename, path: file.path }))
		}

		const updatedData = await blog.findOneAndUpdate({ slug }, { ...data })

		if (!updatedData) throw new ErrorException("Blog does not exist.", 404)

		res.status(200).send({
			message: "Success!"
		})
	} catch (err) {
		respondError(res, err)
	}
})

export default app