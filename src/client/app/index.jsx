import React from 'react';
import openSocket from 'socket.io-client';
import { render } from 'react-dom';

const socket = openSocket('http://localhost:8000');

const subscribe = (interval, cb) => {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
};

class App extends React.Component {
  constructor(props) {
    super(props);
    subscribe(1000, (err, timestamp) => this.setState({
      timestamp
    }));

    this.state = {
      timestamp: ''
    };
  }

  render() {
    return (<p>
      timer value: {this.state.timestamp}
    </p>);
  }
}

render(<App />, document.getElementById('app'));
