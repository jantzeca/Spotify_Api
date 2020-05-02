import React, { Component } from 'react';
// import querystring from 'query-string';
// import axios from 'axios';

import Devices from './Devices';

export class Dashboard extends Component {
  state = {
    devices: []
  };

  componentDidMount() {
    // const parsed = querystring.parse(window.location.search);
    // const accessToken = parsed.access_token;

    // console.log(accessToken);
    // const header = `Bearer ${accessToken}`;
    // axios
    //   .get('https://api.spotify.com/v1/me/player/devices', {
    //     headers: { Authorization: header }
    //   })
    //   .then(res => {
    //     this.setState({
    //       devices: res.data.devices
    //     });
    //   })
    //   .catch(err => console.error(err));

    // So I don't call the spotify API too much while styling
    const fakeDevices = [
      {
        name: 'Chris-Macbook',
        type: 'Computer',
        id: 'aoeusnaisntaeucaiplrcbpairch09g4y0g9'
      },
      {
        name: 'WorkComputer',
        type: 'Computer',
        id: 'aoeusnaisntaeucaaou29u89u92839pairch09g4y0g9'
      }
    ];
    this.setState({
      devices: fakeDevices
    });
  }

  render() {
    return (
      <div>
        <h2>Available devices</h2>
        <Devices devices={this.state.devices} />
      </div>
    );
  }
}

export default Dashboard;
