export interface IImage {
	filename: string;
	path: string;
}

export interface IBlog {
	id?: string;
	title: string;
	description: string;
	images?: IImage[];
	slug?: string;
	updatedAt?: Date
}

export interface IMulterFile {
	fieldname: string;
	originalname: string;
	encoding: string;
	mimetype: string;
	size: number;
	destination: string;
	filename: string;
	path: string;
	buffer: Buffer;
}