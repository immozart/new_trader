import React, {Component} from 'react';
import './search-panel.css';

class SearchPanel extends Component {

  state = {
    term: ''
  };

  onChangePanel = (e) => {
    this.setState({term: e.target.value});
    this.props.onSearchPanel(e.target.value)
  };

  render() {
    return <input
      placeholder="search"
      onChange={this.onChangePanel}
      value={this.state.label}
    />
  }
}


export default SearchPanel;