import multer, { Multer, StorageEngine } from "multer"
import fs from "fs"

const fileStorageEngine: StorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./src/uploads")
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`)
	}
})

export const upload: Multer = multer({
	storage: fileStorageEngine,
	fileFilter(req, file, callback) {
		const filePath: string = `./src/uploads/${file.originalname}`

		if (fs.existsSync(filePath)) {
			callback(null, false)
		} else {
			callback(null, true)
		}
	}
})