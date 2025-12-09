// middlewares/error.middleware.js

import { ApiError } from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  // If it's our custom ApiError, use its values
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [],
      data: err.data || null,
    });
  }

  // If it's an unknown error, still return JSON
  return res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: [],
    data: null,
  });
};

export default errorHandler;
