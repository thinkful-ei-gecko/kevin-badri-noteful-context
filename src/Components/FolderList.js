import React from "react";
import FolderItem from "./FolderItem";
import NotefulContext from "../NotefulContext";

export default function FolderList(props) {
  //static contextType = NotefulContext;
  //const { folders } = this.context;

  return (
    <NotefulContext.Consumer>
      {({ folders }) => (
        <li className="sidebar__folder-list">
          {folders.map(folder => (
            <FolderItem folder={folder} routeProps={props.routeProps} key={folder.id} />
          ))}
        </li>
      )}
    </NotefulContext.Consumer>
  );
}
