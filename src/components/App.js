import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
require("dotenv").config();

class App extends React.Component {
  state = { movies: [], searchQuery: "" };

  componentDidMount() {
    this.getMovies();
  }
  //Get Movie
  async getMovies() {
    await axios
      .get(`http://localhost:3001/movies`)

      .then((response) => {
        this.setState({ movies: response.data });
        // console.log(response.data)
      });
  }

  //Add Movie
  addMovie = async (movie) => {
    await axios.post("http://localhost:3001/movies", movie);
    this.setState((state) => ({
      movies: state.movies.concat([movie]),
    }));
    this.getMovies();
  };

  //Updated Movie
  updatedMovie = async (id, movie) => {
    await axios.put(`http://localhost:3001/movies/${id}`, movie);
    this.getMovies();
  };
  //Delete Movie
  deleteMovie = (movie) => {
    const axios = require("axios");
    axios.delete(`http://localhost:3001/movies/${movie.id}`);

    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);

    this.setState((state) => ({ movies: newMovieList }));
  };

  searchMovie = (e) => {
    this.setState({ searchQuery: e.target.value.toLowerCase() });
  };

  render() {
    let filteredMovies = this.state.movies
      .filter((movie) => {
        return (
          movie.name.toLocaleLowerCase().indexOf(this.state.searchQuery) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row">
                    <div className="col-md-12">
                      <SearchBar searcMovieProp={this.searchMovie} />
                    </div>
                  </div>

                  <MovieList
                    movies={filteredMovies}
                    deleteMovieProps={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>

            <Route
              path="/add"
              render={({ history }) => (
                <AddMovie
                  onAddMovie={(movie) => {
                    this.addMovie(movie);
                    history.push("/");
                  }}
                />
              )}
            ></Route>
            <Route
              path="/edit/:id"
              render={(props) => (
                <EditMovie
                  {...props}
                  onUpdatedMovie={(id, movie) => {
                    this.updatedMovie(id, movie);
                    // history.push("/")
                  }}
                />
              )}
            ></Route>
            <Route path="/edit/:id" component={EditMovie}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
