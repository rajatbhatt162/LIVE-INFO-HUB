import React from 'react';

const NewsItem = (props) => {
  const { title, description, imageUrl, newsUrl, author, date, source } = props;

  // Set a default image URL in case no image URL is provided
  const defaultImageUrl = 'https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg';

  // Format the date to a more readable format
  const formattedDate = date ? new Date(date).toLocaleDateString() : 'Date not available';

  return (
    <div className="my-3">
      <div className="card position-relative">
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0',
            top: '0',
            margin: '10px',
          }}
        >
          <span className="badge rounded-pill bg-danger"> {source || 'Unknown'} </span>
        </div>
        <img
          src={imageUrl || defaultImageUrl}
          className="card-img-top"
          alt={title || 'News Image'}
        />
        <div className="card-body">
          <h5 className="card-title">{title || 'Title Not Available'}</h5>
          <p className="card-text">
            {description || 'Description Not Available'}
          </p>
          <p className="card-text">
            <small className="text-muted">
              By {author || 'Unknown'} on {formattedDate}
            </small>
          </p>
          <a
            rel="noreferrer"
            href={newsUrl}
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
