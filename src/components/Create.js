import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";

import { createBook } from "../graphql/mutations";

function Create() {
  const [bookForm, setBookForm] = useState({
    name: "",
    author: "",
    description: "",
    available: true,
    score: 0,
  });

  const handleChange = (key) => {
    return (e) => {
      setBookForm({
        ...bookForm,
        [key]: e.target.value,
      });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.graphql(graphqlOperation(createBook, { input: bookForm }))
    .then((e) => {
      setBookForm({
        name: "",
        author: "",
        description: "",
        available: true,
        score: 0,
      });
      window.location.href= "/";
    })
    .catch((err) => {
      console.error(err);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Book</h2>
      <input
        placeholder="Book Name"
        type="text"
        onChange={handleChange("name")}
      />
      <input
        placeholder="Author"
        type="text"
        onChange={handleChange("author")}
      />
      <input
        placeholder="Description"
        type="text"
        onChange={handleChange("description")}
      />
      <input
        placeholder="Score"
        type="number"
        onChange={handleChange("score")}
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default Create;