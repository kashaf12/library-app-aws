import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { listBooks } from "../graphql/queries";
import { Link } from "react-router-dom";

function List() {
  const [books, setBooks] = useState([]);
  const [fetching, setFetching] = useState(false);

  async function fetchBooks() {
    setFetching(true);
    try {
      const bookData = await API.graphql(graphqlOperation(listBooks));
      const books = bookData.data.listBooks.items;
      setBooks(books);
      setFetching(false);
    } catch (err) {
      console.error("error fetching books!", err);
    }
    setFetching(false);
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      {fetching ? (
        <p>Fetching books...</p>
      ) : (
        <div>
          <h2>Our books:</h2>
          {books.length > 0 ? (
            <ul>
              {books.map((book, index) => (
                <li key={index}>
                  <Link to={`/book/${book.id}`}>
                    {book.name} - {book.author}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              We don't have any books right now <span role="img">😢</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default List;