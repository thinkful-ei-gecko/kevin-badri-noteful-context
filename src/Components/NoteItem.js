import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NoteItem extends Component {
    render() {
      const { id, name, modified } = this.props.note;
        return (
            <div className="main__note-item" key={id}>
                <Link to={`/note/${id}`}>
                    <p>{name}</p>
                </Link>
                <p>{modified}</p>
                <button type="button">Delete note</button>
            </div>
        )
    }
}