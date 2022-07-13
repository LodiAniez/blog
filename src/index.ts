import express from "express"
import cors from "cors"
import { PORT } from "./secrets/secrets"
import { route } from "./middlewares/route"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
route(app)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`))