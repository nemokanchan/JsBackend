import mongoose, {Schema} from "mongoose";

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        }, 
        author: {
            type: String,
            required: true,
        },
        publishedYear: {
            type: Number,
            required: true,
        },
    }
);

export const Book = mongoose.model("Book", bookSchema);