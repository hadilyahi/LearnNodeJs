const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");

// HTTP Methods / verbes :

/**
 * @desc Get all books
 * @route api/books
 * @method GET
 * @access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate("author",["_id","firstName","lastName"]);
    res.status(200).json(books);
  })
);
/**
 * @desc get  book by id
 * @route api/books/:id
 * @method GET/:id
 * @access public
 */

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    book
      ? res.status(200).json(book)
      : res.status(404).json({ message: "book not found" });
  })
);

/**
 * @desc create  book
 * @route api/books
 * @method POST
 * @access public
 */

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { error } = validateCreateBook(req.body);
    if (error) {
      return res.status(400).json({ messege: error.details[0].message });
    }

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover,
    });
    const result = await book.save();
    res.status(201).json(result);
  })
);
/**
 * @desc Update A book
 * @route api/books/:id
 * @method PUT
 * @access public
 */
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { error } = validateUpdateBook(req.body);
    if (error) {
      return res.status(400).json({ messege: error.details[0].message });
    }

    const Updatebook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(Updatebook);
  })
);
/**
 * @desc Delete A book
 * @route api/books/:id
 * @method DELETE
 * @access public
 */
router.delete("/:id",asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "book has been Deleted" });
  } else {
    res.status(404).json({ message: "book not found" });
  }
}));

module.exports = router;
