import { Router, Request, Response } from "express";
import { ErrorException, respondError, generateImagePath } from "./../utils";
import { blog } from "./../models/schema"
import { IBlog, IImage, IMulterFile } from "./../models/interface"
import { upload } from "./../middlewares/upload";

const app: Router = Router()

app.post("/new", upload.array("images"), async (req: Request, res: Response) => {
	try {
		const { title, description }: IBlog = req.body
		const files: IMulterFile[] = req.files as IMulterFile[]

		if (!title || !description) throw new ErrorException("Blog title and description is required.", 406)

		const blogData: IBlog = {
			title, description,
			images: files.map((file: IMulterFile) => ({ filename: file.filename, path: generateImagePath(file.filename) }))
		}

		const newblog = new blog(blogData)

		const processedBlog: IBlog = await newblog.save()

		res.status(200).send({
			message: "Blog is successfully created!",
			data: { slug: processedBlog.slug || null }
		})
	} catch (err) {
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
			images: files.map((file: IMulterFile) => ({ filename: file.filename, path: generateImagePath(file.filename) })),
			updatedAt: new Date()
		}

		const updatedData = await blog.findOneAndUpdate({ slug }, { ...data })

		if (!updatedData) throw new ErrorException("Blog does not exist.", 404)

		res.status(200).send({
			message: "Blog is updated successfully!"
		})
	} catch (err) {
		respondError(res, err)
	}
})

app.post("/fileupload", upload.array("images"), async (req: Request, res: Response) => {
	try {
		const { slug }: { slug: string } = req.body
		const files: IMulterFile[] = req.files as IMulterFile[]

		if (!slug) throw new ErrorException("Invalid blog.", 406)

		if (files.length) {
			const mappedFiles: IImage[] = files.map((file: IMulterFile) => ({ filename: file.filename, path: generateImagePath(file.filename) }))

			if (mappedFiles.length) {
				const foundBlog: IBlog | null = await blog.findOne({ slug })

				if (!foundBlog) throw new ErrorException("Blog not found.", 404)

				const images: IImage[] = foundBlog && foundBlog.images && foundBlog.images.length
					? [...foundBlog.images, ...mappedFiles]
					: mappedFiles as IImage[]

				await blog.updateOne({ slug }, { images })
			}
		}

		res.status(200).send({
			message: "Files are successfully uploaded."
		})
	} catch (err) {
		respondError(res, err)
	}
})

app.delete("/delete", async (req: Request, res: Response) => {
	try {
		const { id }: { id: string } = req.body

		if (!id) throw new ErrorException("Blog id is required.", 406)

		await blog.findOneAndDelete({ _id: id })

		res.status(200).send({
			message: "Blog is successfully deleted."
		})
	} catch (err) {
		respondError(res, err)
	}
})

app.get("/view/:slug", async (req: Request, res: Response) => {
	try {
		const { slug } = req.params

		if (!slug) throw new ErrorException("Blog not found.", 404)

		const blogData: IBlog | null = await blog.findOne({ slug })

		if (!blogData) throw new ErrorException("Blog not found.", 404)

		res.status(200).send({
			message: "Data is fetched successfully.",
			data: blogData
		})
	} catch (err) {
		respondError(res, err)
	}
})

export default app