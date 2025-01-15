import React from 'react';
import BookListPage from './BookListPage';

const BooksPage: React.FunctionComponent = () => {

  return (
    <div className="flex flex-col justify-center">
      <BookListPage />
    </div>
  );
}

export default BooksPage;
