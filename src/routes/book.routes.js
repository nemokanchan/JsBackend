import Router from "express";
import {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/book").get(getAllBooks);

router.route("/book").post(createBook);
router.route("/book/:id").put(updateBook);

router.route("/book/:id").delete(verifyJWT, deleteBook);

export default router;
