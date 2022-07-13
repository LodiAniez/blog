import mongoose from "mongoose"

mongoose.Promise = global.Promise;

export const connection = () => {
	mongoose.connect("mongodb://localhost:27017/blog").then(() => console.log("I have connected to mongo db locally."))
}