const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");

/**
 * @desc get all authors
 * @route api/authors
 * @method GET
 * @access public
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const authorList = await Author.find();
    // .sort({firstName:1}).select("firstName lastName -_id");
    res.status(200).json(authorList);
  })
);

/**
 * @desc get authors by id
 * @route api/authors/:id
 * @method GET
 * @access public
 */
router.get( "/:id",
  asyncHandler(async (req, res) => {
    const author = await Author.findById(req.params.id);
    author
      ? res.status(200).json(author)
      : res.status(400).json({ message: "author not found" });
  })
);
/**
 * @desc Post New Author
 * @route api/authors
 * @method POST
 * @access public
 */

router.post("/", asyncHandler( async (req, res) => {
  const { error } = validateCreateAuthor(req.body);
  if (error) {
   return res.status(400).json({ message: error.details[0].message });
  }
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      password: req.body.password,
    });
    const resulte = await author.save();
    res.status(201).json(resulte);
}));

/**
 * @desc Update Author
 * @route api/authors/:id
 * @method PUT
 * @access public
 */
router.put("/:id",  asyncHandler( async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);
  if (error) {
   return res.status(400).json({ message: error.details[0].message });
  }
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          nationality: req.body.nationality,
          password: req.body.password,
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(author);
 
}));

/**
 * @desc Delete Author
 * @route api/authors/:id
 * @method DELETE
 * @access public
 */

router.delete("/:id", asyncHandler( async (req, res) => {
    const author = await Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The author is Deleted" });
    } else {
      res.status(404).json({ message: "The author is Not found" });
    }
}));

module.exports = router;
