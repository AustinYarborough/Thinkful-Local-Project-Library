const { findAuthorById } = require("./books");

// this function's purpose is to find an account based on a given ID
function findAccountById(accounts, id) {
    // using arrow function and find()
    return accounts.find((accounts) => id === accounts.id);
    // then it returns
}


// this function's purpose is to sort array of accounts alphabetically
function sortAccountsByLastName(accounts) {
    // will take in an array and sort using sort()
    return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
    // then returns
}


// this function is my helper function to assist the function below
function borrowsById(books, book, account) {
  return book.borrows.filter(borrow => borrow.id === account.id);
}
// this function's purpose is to count how many times a user has borrowed a book
function getTotalNumberOfBorrows(account, books) {
    // start counter at 0
    let counter = 0;
    // go through each book and look for matching ID, use forEach()
    books.forEach(book => {
        const borrowedByID = borrowsById(books, book, account);
        // add that to counter
        counter += borrowedByID.length;
    });
    // then return
    return counter;
}


// this function's purpose is to get all books that are being borrowed by a given account
function getBooksPossessedByAccount(account, books, authors) {
    // check if that book is being kept, use of filter() and some()
    const borrowedBooks = books.filter(book => book.borrows.some(borrow => (!borrow.returned && borrow.id === account.id)));
    // put the results in new array
    const result = [];
    // check if the given author is a match
    borrowedBooks.forEach(book => {
        const bookAuthor = findAuthorById(authors, book.authorId);
        // push those results into new array
        result.push({
            id: book.id,
            title: book.title,
            genre: book.genre,
            authorId: book.authorId.account,
            author: bookAuthor,
            borrows: book.borrows,
        });
    });
    // once done return array
    return result;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
