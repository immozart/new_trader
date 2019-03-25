import React, { Component } from 'react';
import { PAGES } from '../../routes/pages';

export default class Trades extends Component {

  state = {
    userInfo: ''
  };

  fetchUser = async () => {
    try {
      const user = await fetch(PAGES.API.fetchUser.path);
      this.state.userInfo = await user.json();
      console.log('userInfo', this.state.userInfo);
    } catch (e) {
      console.error(e);
    }
  };

  componentWillMount() {
    this.fetchUser()
  }

  render() {    
    let usertext = this.state.userInfo;
    return (
      <div className='СДЕЛКИ'>
        <h2>СДЕЛКИ</h2>
        {/* <div> {this.renderSayButtons()}</div> */}
        {usertext.name}
        <br></br>      
      </div>
    );
  }
}
