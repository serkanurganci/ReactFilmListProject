import React from "react";
import axios from "axios";
// 24 18:00
class EditMovie extends React.Component {
  state = {
    name: "",
    rating: "",
    imageURL: "",
    overview: "",
  };

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`http://localhost:3001/movies/${id}`).then((response) => {
      const movie = response.data;
      this.setState({
        name: movie.name,
        rating: movie.rating,
        imageURL: movie.imageURL,
        overview: movie.overview,
      });
    });
  }

  onInputChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, rating, imageURL, overview } = this.state;

    const id = this.props.match.params.id;

    const updatedMovies = {
      name,
      rating,
      imageURL,
      overview,
    };
    this.props.onUpdatedMovie(id, updatedMovies);
    this.props.history.push("/");
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
            placeholder="Filmi güncellemek için lütfen formu düzenleyin."
            disabled
          />
          <div className="form-row">
            <div className="form-group col-md-10">
              <label htmlFor="inputName">Film Adı</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={this.state.name}
                onChange={this.onInputChange}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputRating">Derece</label>
              <input
                type="text"
                className="form-control"
                name="rating"
                value={this.state.rating}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputImage">Film Afiş Link</label>
              <input
                type="text"
                className="form-control"
                name="imageURL"
                value={this.state.imageURL}
                onChange={this.onInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="overviewTextarea">Film Konusu</label>
              <textarea
                className="form-control"
                name="overview"
                rows="5"
                value={this.state.overview}
                onChange={this.onInputChange}
              ></textarea>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-danger btn-block"
            value="Update Movie"
          />
        </form>
      </div>
    );
  }
}

export default EditMovie;
