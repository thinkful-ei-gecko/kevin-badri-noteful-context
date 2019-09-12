import React, { Component } from 'react';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

class FolderItem extends Component {
  render() {
    const { location } = this.props;

    return (
      <div className="folder-item" >
        <Link to={`/folder/${this.props.folder.id}`}>
          {(location.pathname.slice(8) === this.props.folder.id) && <button type="button" className="folder__button--active">{this.props.folder.name}</button>}
          {(location.pathname.slice(8) !== this.props.folder.id) && <button type="button" >{this.props.folder.name}</button>}
        </Link>
      </div>
    )
  }
}

export default withRouter(FolderItem);