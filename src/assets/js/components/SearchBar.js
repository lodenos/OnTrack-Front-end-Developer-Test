import React from "react";
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import AppContext from '../context/AppContext.js';

class SearchBar extends React.Component {
  updateTextInput(event) {
    this.context.textInput = event.target.value;
    if (event.key === 'Enter')
      return this.context.searchFilters();
  }

  render() {
    return (
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Search ..."
          onChange={this.updateTextInput.bind(this)}
          onKeyDown={this.updateTextInput.bind(this)}
        />
        <InputGroup.Append>
          <Button onClick={this.context.searchFilters.bind(this)}>
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}
SearchBar.contextType = AppContext;

export default SearchBar;
