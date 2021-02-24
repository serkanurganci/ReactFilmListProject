import React from "react";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  const truncateOverview = (string, maxLength) => {
    if (!string) return null;
    if (string.length <= maxLength) return string;
    return `${string.substring(0, maxLength)} ...`;
  };
  return (
    <div className="row">
      {props.movies.map((movie, i) => (
        <div className="col-lg-4" key={i}>
          <div className="card shadow-sm mb-4">
            <img src={movie.imageURL} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{movie.name}</h5>
              <p className="card-text">
                {truncateOverview(movie.overview, 100)}
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  onClick={(event) => props.deleteMovieProps(movie)}
                  className="btn btn-md btn-outline-danger"
                >
                  Sil
                </button>
                <Link
                  className="btn btn-outline-success"
                  to={`edit/${movie.id}`}
                >
                  Güncelle
                </Link>
                <h2>
                  <span className="badge badge-info">{movie.rating}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
