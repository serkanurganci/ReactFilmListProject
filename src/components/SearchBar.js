import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class SearchBar extends React.Component {
  state = {
    searchQuery: "",
  };

  render() {
    return (
      <form onSubmit={(e) => e.preventDefault()} className="mb-4 mt-4">
        <div className="row">
          <div className="col-10">
            <input
              onChange={this.props.searcMovieProp}
              className="form-control"
              placeholder="Film Ara"
            ></input>
          </div>
          <div className="col-2 ">
            <Link to="/add" className="btn btn-md btn-outline-danger" style={{float:"right"}}>Film Ekle</Link>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
