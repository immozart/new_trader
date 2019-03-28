// import React, { Component } from 'react';

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


// import React from 'react';
import React, { Component } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

export default class Page404 extends Component {
  render() {
    return (
      <div>
        <ButtonGroup aria-label="Basic example">
          <Button variant="secondary">Left</Button>
          <Button variant="secondary">Middle</Button>
          <Button variant="secondary">Right</Button>
        </ButtonGroup>;
        {/* <ButtonToolbar>
          <Button variant="outline-primary">Primary</Button>
          <Button variant="outline-secondary">Secondary</Button>
          <Button variant="outline-success">Success</Button>
          <Button variant="outline-warning">Warning</Button>
          <Button variant="outline-danger">Danger</Button>
          <Button variant="outline-info">Info</Button>
          <Button variant="outline-light">Light</Button>
          <Button variant="outline-dark">Dark</Button>
        </ButtonToolbar> */}
      </div>
    );
  }
}
