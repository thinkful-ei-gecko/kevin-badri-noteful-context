import React, { Component } from "react";
import NoteItem from "./NoteItem";
import NotefulContext from "../NotefulContext";

export default class NoteList extends Component {
  static contextType = NotefulContext;
  render() {
    let { notes } = this.context;
    notes = this.props.routeProps.location.pathname.length !== 1 ? 
    notes.filter(note => note.folderId === this.props.routeProps.match.params.folderId) : 
    notes;


    const noteItems = notes.map(note => <NoteItem note={note} key={note.id}/>);

    return <li className="main__note-list">{noteItems}</li>;
  }
}

