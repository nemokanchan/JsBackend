import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { Book } from "../models/book.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllBooks = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find();

    res
      .status(200)
      .json(new ApiResponse(200, books, "Books retrieved successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while retrieving books");
  }
});

const createBook = asyncHandler(async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;

    if (!(title || author || publishedYear)) {
      throw new ApiError(400, "ALL fields are required");
    }

    //insert book in db
    const book = await Book.create({
      title: title,
      author: author,
      publishedYear: publishedYear,
    });

    if (!book) {
      throw new ApiError(500, "Internal Server Error");
    }

    res
      .status(201)
      .json(new ApiResponse(201, book, "Book created successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

const updateBook = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { author, title, publishedYear } = req.body;

    const book = await Book.findById(id);

    const update = {};
    if (title !== undefined) {
      update.title = title;
    }
    if (author !== undefined) {
      update.author = author;
    }
    if (publishedYear !== undefined) {
      update.publishedYear = publishedYear;
    }

    if (!book) {
      throw new ApiError(500, "Book not found");
    }

    const updatedBook = await Book.findByIdAndUpdate(id, update, { new: true });

    res
      .status(201)
      .json(new ApiResponse(201, updatedBook, "Book updated successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});


const deleteBook = asyncHandler( async (req, res) => {
    const { id } = req.params;

    await Book.findByIdAndDelete(id);

    res
        .status(200)
        .json( new ApiResponse(200, "Deleted "))
})

export { getAllBooks, createBook, updateBook, deleteBook };
