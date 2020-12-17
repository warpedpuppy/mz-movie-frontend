import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';

import './index.scss';
import {Container, Row, Col} from 'react-bootstrap/Container'



// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render () {
    return <MainView/>;
  }
}

// Finds the app root
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

