import { Schema, model, Model } from "mongoose"
import { IBlog } from "./interface"
const sluggish = require("sluggish")

const blogSchema: Schema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String
	},
	createdAt: {
		type: Date,
		default: new Date()
	},
	images: {
		type: Array<string>,
		default: null
	},
	slug: {
		type: String,
		unique: true
	}
})

blogSchema.pre("save", function (next) {
	if (this.title) {
		this.slug = sluggish(this.title)
	}

	next()
})

blogSchema.pre("findOneAndUpdate", function (next) {
	const data: IBlog = this.getUpdate() as IBlog

	if (data && data.title) {
		this.update({}, { slug: sluggish(data.title) })
	}

	next()
})

export const blog: Model<any> = model("blog", blogSchema)