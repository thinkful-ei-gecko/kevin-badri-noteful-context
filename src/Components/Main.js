import React, { Component } from 'react';
import NoteList from './NoteList';
import NoteItem from './NoteItem';

export default class Main extends Component {
    render() {
        return (
            <ul className="main">
                <NoteList />
                <NoteItem />
            </ul>
        )
    }
}