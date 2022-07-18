import express, { Express } from "express"
import cors from "cors"
import { PORT, SERVER_ENVIRONMENT } from "./secrets/secrets"
import { route } from "./middlewares/route"
import { connection } from "./configs/db"
import path from "path"

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route(app)
app.use("/static", express.static(path.join(__dirname, '/uploads')))

connection()

app.listen(PORT, () => console.log(`Server is running on ${SERVER_ENVIRONMENT}:${PORT}.`))