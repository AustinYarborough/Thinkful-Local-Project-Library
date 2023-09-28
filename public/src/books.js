// behold the books functions


// this function's purpose find an author based on their id number
function findAuthorById(authors, id) {
  // check if the id match, using find()
  return authors.find(author => id === author.id);
  //then return
}


// this function's purpose is to look for book based on given id number
function findBookById(books, id) {
  // check for matching book id number
  return books.find(book => book.id === id);
}


// this functions purpose is to seperate the borrowed books and unborrowed books into dif arrays
function partitionBooksByBorrowedStatus(books) {
  // make empty array
  const result = [];
  // if the book is returned put them in this new array, if not put them in dif one
  const borrowedBooks = books.filter(book => !book.borrows[0].returned);
  const unborrowedBooks = books.filter(book => book.borrows[0].returned);
  // once the books are found push them in array
  result.push(borrowedBooks);
  result.push(unborrowedBooks);
  // once done return the array
  return result;
}


// this function will find users who have borrowed a book
function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  // make empty array
  const result = [];
  // loop through the array
  borrows.forEach(borrow => {
      if (result.length >= 10) return;
// check if the Ids are a match
  const borrower = accounts.find(account => account.id === borrow.id);
  const formattedBorrow = {
    ...borrow,
    ...borrower,
  };
  // push thy results into new array
  result.push(formattedBorrow);
});
console.log(result);
return result;
}
// this function was doo doo


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
