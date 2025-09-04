import React from 'react';

function Error({ statusCode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">
          {statusCode ? statusCode : 'Error'}
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'
          }
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
