import React, { useState, useEffect } from 'react';

import { getBook } from "../graphql/queries";
import { API, graphqlOperation } from 'aws-amplify';

function Detail(props) {
    const [book, setBook] = useState();

    useEffect(() => {
        let { id } = props.match.params;
        console.log(id);
        API.graphql(graphqlOperation(getBook, {id})).then(b => {
            setBook(b.data.getBook);
        })
    }, []);

    return <div>
        {book ? <>
            <h1>{book.name}</h1>
            <p>{book.author}</p>
        </> : null}
    </div>
}

export default Detail;
