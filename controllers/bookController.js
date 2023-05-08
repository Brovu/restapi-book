const { Author, Book } = require("../model/model");

const bookController = {
  addBook: async (req, res) => {
    try {
      const book = new Book(req.body);
      const savedBook = await book.save();
      if (req.body.author) {
        const author = await Author.findById(req.body.author);
        await author.updateOne({ $push: { books: savedBook._id } });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const allBook = await Book.find();
      res.status(200).json(allBook);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getABook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate("author").exec();
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  updateBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      await book.updateOne({ $set: req.body });
      res.status(200).json("Update success!!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteBook: async (req, res) => {
    try {
      await Author.updateMany(
        { books: req.params.id },
        { $pull: { books: req.params.id } }
      );
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete Success!!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = bookController;
