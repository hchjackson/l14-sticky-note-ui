import React from "react";
import Note from "./Note.js";

const NotesList = (props) => {
  const keepSearchMatches = (note) => note.doesMatchSearch;
  const searchMatches = props.notes.filter(keepSearchMatches);
  // Line 5 and 6 can be combined into the following line of code:
  // const searchMatches = props.notes.filter(note => note.doesMatchSearch);
  // We still need to pass a callback function to the filter method, so we need to write it like this.
  const renderNote = (note) => (
    <Note
      removeNote={props.removeNote}
      onType={props.onType}
      note={note}
      key={note.id}
    />
  );

  const noteElements = searchMatches.map(renderNote);
  return <ul className="notes-list">{noteElements}</ul>;
};

export default NotesList;
