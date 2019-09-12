import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NoteDetailedView extends Component {
    render() {
        const { id, name, modified, content } = this.props.note;
        return (
            <div className="main__note-detailed-view" key={id}>
            <span>{name}</span>
            <span>{modified}</span>
            <Link to='/'>
                    <button type="button">Delete note</button>
            </Link>
            <p>{content}</p>
        </div>
        )
    }
}