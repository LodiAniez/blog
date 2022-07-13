import express from "express"
import cors from "cors"
import { PORT } from "./secrets/secrets"
import { route } from "./middlewares/route"
import { connection } from "./configs/db"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
route(app)

connection()

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`))