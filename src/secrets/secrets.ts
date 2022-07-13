import { config } from "dotenv"
config()

export const PORT: string | number = process.env.PORT || 8000