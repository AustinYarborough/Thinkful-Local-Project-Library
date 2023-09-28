// behold the home functions

const { sortAccountsByLastName } = require("./accounts");
const { partitionBooksByBorrowedStatus } = require("./books");

// thy first functions purpose is to simply count up the books
function getTotalBooksCount(books) {
    return books.length;
}


// this function is to count how many accounts there are
function getTotalAccountsCount(accounts) {
    return accounts.length;
}


// this function is to count how many books are being borrowed at the momment
function getBooksBorrowedCount(books) {
    const partitioned = partitionBooksByBorrowedStatus(books);
    // count them by using length
    return partitioned[0].length;
}

// helper function for function below
function genrecount(genreArray, currentgenre) {
  return {
    name: currentgenre,
    count: genreArray.filter((genre) => genre === currentgenre).length,
  };
}
// for this function i want to make a list of the top 5 most popular genres
function getMostCommonGenres(books) {
  const result=[];
  const genreArray=books.map((book) => book.genre);
  const genreObject=books.map((book) => genrecount(genreArray, book.genre));
  for (let i = 0; i < genreObject.length; i++) {
    if (result.includes(genreObject[i]) === false && result.length < 5) {
      result.push(genreObject[i]);
    }
  }
  result.sort((objA, objB) => objB.count - objA.count);
  return result;
}

// this function will make a list of top 5 popluar books
function getMostPopularBooks(books) {
    // make 3 new arrays
    const bookList = [];
    const countList = [];
    const bookIdList = [];

    books.forEach(book => {
        // test to see if the books are being listed multiple times
        if(!bookIdList.includes(book.id)){
          bookIdList.push(book.id);
          // make another lists of titles and matching number of borrows
          bookList.push(book.title);
          countList.push(book.borrows.length);
        };
      });
      // once done return the function
      return makeSortedTopFiveNameCountArray(bookList, countList);

}


// this function will get the most pop authors
function getMostPopularAuthors(books, authors) {
    // make new empty arrays
    const authorList = [];
    const countList = [];
    const authorIdList = [];

    authors.forEach(author => {
        // loof for the authors that have been listed multiple times
        if (!authorIdList.includes(author.id)) {
        authorIdList.push(author.id);
        // make a list of all those author names
        authorList.push(`${author.name.first} ${author.name.last}`);
        // make another list of the author books but also count the borrows for each of the books
        const authorBooks = books.filter(book => book.authorId === author.id);
        const authorBooksBorrows = authorBooks.map(book => book.borrows.length);
        // add a countList that also matches with the authorList
        countList.push(authorBooksBorrows.reduce((acc, count) => acc + count));
        }
      });
      // once done return that function
      return makeSortedTopFiveNameCountArray(authorList, countList);
}


// a helper function
// i want to make a array that will shorten a list to 7 items or less
function topFive (list) {
    // count of to 7 max items
    while (list.length > 5) {
      list.pop();
    }
    // once done return that list
    return list;
  }
function makeNameAndCountArray (nameList, countList) {
  const result = nameList.reduce((acc, desc, index) => {
    acc.push({name: desc, count: countList[index]});
    return acc;
  }, []);
  return result;
}

function makeSortedTopFiveNameCountArray (nameList, countList)
{
  const result = makeNameAndCountArray(nameList, countList);
  orderByCount(result);
  return topFive(result);
}

function orderByCount (nameCount) {
  return nameCount.sort((placeA, placeB) => (placeB.count - placeA.count));
}



// export thingamajig
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
