import React from "react";
import serialize from "form-serialize";

class AddMovie extends React.Component {
  handleFormSubmit = (e) => {
    e.preventDefault();
    const newMovie = serialize(e.target, { hash: true });
    this.props.onAddMovie(newMovie);
  };

  render() {
    return (
      <div className="container">
        <form
          onSubmit={this.handleFormSubmit}
          id="movieForm"
          className="mt-5"
          onSubmit={this.handleFormSubmit}
        >
          <input
            className="form-control"
            id="disabledInput"
            type="text"
            placeholder="Filmi eklemek için lütfen formu doldurun."
            disabled
          />
          <div className="form-row">
            <div className="form-group col-md-10">
              <label htmlFor="inputName">Film Adı</label>
              <input type="text" className="form-control" name="name" />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputRating">Derece</label>
              <input type="text" className="form-control" name="rating" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputImage">Film Afiş Link</label>
              <input type="text" className="form-control" name="imageURL" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="overviewTextarea">Film Konusu</label>
              <textarea
                className="form-control"
                name="overview"
                rows="5"
              ></textarea>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-danger btn-block"
            value="Add Movie"
          />
        </form>
      </div>
    );
  }
}

export default AddMovie;
