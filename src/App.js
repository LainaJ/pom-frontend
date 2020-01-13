import React from 'react';
import Navbar from './Navbar'
import './index.css';
import Main from './Main'


class App extends React.Component {

  render () {
    return (
      <div>
        <Navbar/>
        <Main />

      </div>
    )
  }
}

export default App;
