import React from 'react';
import '../Styles/Devices.css';

function Devices(props) {
  const { devices } = props;
  let devicesHTML = devices.map(device => {
    return (
      <div className='device-container' key={device.id}>
        <ul>
          <li id='name'>Name: {device.name}</li>
          <li id='type'>Type: {device.type}</li>
          <li id='id'>ID: {device.id}</li>
        </ul>
      </div>
    );
  });
  return (
    <div className='device'>
      <h3>Devices:</h3>
      {devicesHTML ? devicesHTML : <p>No active devices found</p>}
    </div>
  );
}

export default Devices;
