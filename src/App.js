import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

/* This container component manages all of the state 
for this application, delegating rendering logic to 
presentational components. */

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };

  addNote = () => {
    //create a new note
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };

    // add the new note to existing notes array in State
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };

  // onType Method needs to update state, return exact copy of all notes except the one to be changed
  // Find out which note was changed, what part was changed (title or description)
  // Get value of title or description
  // Update note accordinging with new value
  onType = (editMeId, updatedKey, updatedValue) => {
    // editMeId == id of the note that is edited
    // updatedKey == title or description field
    // updatedValue == value of title or description
    const updatedNotes = this.state.notes.map((note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        // note.id = editMeId so check if title or description to be edited
        if (updatedKey === "title") {
          // If title is edited then update value and return updated note
          note.title = updatedValue;
          return note;
        } else {
          // Else description is edited then update value and return updated note
          note.description = updatedValue;
          return note;
        }
      }
    });
    this.setState({ notes: updatedNotes }); // updatedNotes overwrites the current array of notes in state.
  };

  // onSearch Method to allow user to search thru notes
  onSearch = (text) => {
    /* toggle the doesMatchSearch boolean value of each sticky
    note when the user types in the search field.
    Set the doesMatchSearch value to true for a sticky note if
    it's title or description matches the search string. */
    const newSearchText = text.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!newSearchText) {
        /* If the search field is empty, then
        we set the doesMatchSearch value for every note to true. */
        note.doesMatchSearch = true;
        return note;
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLowerCase();
        const titleMatch = title.includes(newSearchText);
        const descriptionMatch = description.includes(newSearchText);
        // Checking for matching text in title or description
        if (titleMatch) {
          note.doesMatchSearch = true;
        } else if (descriptionMatch) {
          note.doesMatchSearch = true;
        } else {
          note.doesMatchSearch = false;
        }
        // Line 82 thru 88 can also be written as...
        // const hasMatch = titleMatch || descriptionMatch;
        // note.doesMatchSearch = hasMatch;
        return note;
      }
    });
    this.setState({
      notes: updatedNotes,
      searchText: newSearchText
    });
  };

  // removeNote method --> remove note by id of note that user clicked on
  removeNote = (noteId) => {
    // filter notes and only return notes that don't match noteId
    const updatedNotes = this.state.notes.filter((note) => note.id !== noteId);
    this.setState({ notes: updatedNotes });
  };

  componentDidUpdate() {
    /* after each render, save notes data to local storage */
    const savedNotesString = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", savedNotesString);
  }

  componentDidMount() {
    /* after rendering for the first time, read saved
    notes data from local storage and pass that data
    to component state if it exists */
    const savedNotesString = localStorage.getItem("savedNotes");
    if (savedNotesString) {
      const savedNotes = JSON.parse(savedNotesString);
      this.setState({ notes: savedNotes });
      // console.log(savedNotes); // Checking what's stored in savedNotes
    }
  }

  render() {
    return (
      <div>
        <Header
          onSearch={this.onSearch}
          searchText={this.state.searchText}
          addNote={this.addNote}
        />
        <NotesList
          removeNote={this.removeNote}
          onType={this.onType}
          notes={this.state.notes}
        />
      </div>
    );
  }
}

export default App;
