import multer, { Multer, StorageEngine } from "multer"

const fileStorageEngine: StorageEngine = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./src/uploads")
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`)
	}
})

export const upload: Multer = multer({ storage: fileStorageEngine })