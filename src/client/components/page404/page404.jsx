import React, { Component } from 'react';

// export default class Page404 extends Component {
//   render() {
//     return (
//       <div className='page404'>
//         <h2>Page 404</h2>
//         <div>Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. Page 404. </div>
//       </div>
//     );
//   }
// }


const API = 'http://www.json-generator.com/api/json/get/ceRHciXcVu?indent=2';

export default class Page404 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hits: []
    };
  }

  componentWillMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ hits: data }));
  }

  render() {
    const { hits } = this.state;
    console.log(this.state.hits);
    return (
      <div>
        {hits.map(hit =>
          <div key={hit._id}>
            <span>{hit.company}</span>
          </div>
        )}
      </div>
    );
  }
}