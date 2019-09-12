import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Sidebar from "./Components/Sidebar";
import FolderList from "./Components/FolderList";
import FolderDetailedView from "./Components/FolderDetailedView";
import NoteList from "./Components/NoteList";
import NoteDetailedView from "./Components/NoteDetailedView";
import NotFound from "./Components/NotFound";
import NotefulContext from "./NotefulContext";

export default class App extends Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: []
    };
  }

  handleDeleteNote = noteId => {
    const newNotes = this.state.notes.filter(note => 
      note.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }

  getFolders() {
    fetch(`http://localhost:9090/folders`, {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      this.setState({
        folders: data
      })
    })
    .catch(error => alert(error))
  }

  getNotes() {
    fetch(`http://localhost:9090/notes`, {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      this.setState({
        notes: data
      })
    })
    .catch(error => alert(error))
  }

  componentDidMount() {
    this.getNotes();
    this.getFolders();
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
    };

    return (
      <div className="app">
        <Header />
        <NotefulContext.Provider value={contextValue}>
          <Sidebar>
            <Switch>
              <Route
                exact
                path="/"
                render={routeProps => (
                  <FolderList routeProps={routeProps} />
                )}
              />
              <Route
                path="/folder/:folderId"
                render={routeProps => (
                  <FolderList routeProps={routeProps} />
                )}
              />
              <Route
                path="/note/:noteId"
                render={routeProps => (
                  <FolderDetailedView
                    folder={contextValue.folders.find(
                      folder =>
                        folder.id ===
                        contextValue.notes.find(
                          note => note.id === routeProps.match.params.noteId
                        ).folderId
                    )}
                    routeProps={routeProps}
                    onClickCancel={() => routeProps.history.goBack()}
                  />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </Sidebar>
          <Main>
            <Switch>
              <Route
                exact
                path="/"
                render={routeProps => (
                  <NoteList routeProps={routeProps} />
                )}
              />
              <Route
                path="/note/:noteId"
                render={routeProps => (
                  <NoteDetailedView
                    note={contextValue.notes.find(
                      note => note.id === routeProps.match.params.noteId
                    )}
                    routeProps={routeProps}
                  />
                )}
              />
              <Route
                path="/folder/:folderId"
                render={routeProps => (
                  <NoteList routeProps={routeProps} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </Main>
        </NotefulContext.Provider>
      </div>
    );
  }
}
