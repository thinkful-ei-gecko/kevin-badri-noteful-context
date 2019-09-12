import React, { Component } from "react";
import NoteItem from "./NoteItem";
import NotefulContext from "../NotefulContext";

export default class NoteList extends Component {
  static contextType = NotefulContext;
  render() {
    let { notes } = this.context;

    notes = notes.filter(note => note.folderId === this.props.routeProps.match.params.folderId);

    const noteItems = notes.map(note => <NoteItem note={note} />);

    return <li className="main__note-list">{noteItems}</li>;
  }
}
