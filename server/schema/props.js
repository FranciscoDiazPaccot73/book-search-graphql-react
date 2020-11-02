const books = [
  { name: "test book 1", id: '1', genre: "terror", authorId: '1' },
  { name: "test book 2", id: '2', genre: "drama", authorId: '2' },
  { name: "test book 3", id: '3', genre: "action", authorId: '3' },
  { name: "test book 4", id: '4', genre: "action", authorId: '3' },
  { name: "test book 5", id: '5', genre: "terror", authorId: '2' },
  { name: "test book 6", id: '6', genre: "action", authorId: '3' },
];

const authors = [
  { name: "Mike", id: '1', age: 40 },
  { name: "Andres", id: '2', age: 32 },
  { name: "Mario", id: '3', age: 51 },
];

module.exports = { books, authors };
