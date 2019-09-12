import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

function deleteNoteRequest(noteId, callback) {
    fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
    })
    .then(res => {
        if (!res.ok) {
            return res.json().then(error => {
                throw error
            })
        }
        return res.json()
    })
    .then(data => {
        callback(noteId)
    })
    .catch(error => {
        console.error(error)
    })
}

export default class NoteDetailedView extends Component {
    
    static contextType = NotefulContext;

    render() {
        const { id, name, modified, content } = this.props.note;
        return (
            <div className="main__note-detailed-view" key={id}>
            <span>{name}</span>
            <span>{modified}</span>
            <Link to='/'>
                    <button type="button"
                    onClick={() => deleteNoteRequest(
                        id,
                        this.context.deleteNote,
                    )}>Delete note</button>
            </Link>
            <p>{content}</p>
        </div>
        )
    }
}