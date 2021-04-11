import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Detail from './components/Detail'
import DetailMovie from './components/DetailMovie';
import Menu from './components/Menu'

const App = (props) => (
  
    <Router {...props}>
      <Switch>
        <Route render={Detail} exact path="/">
          {/* <Detail /> */}
        </Route>
        {/* <Route path="/menu"><Menu /></Route> */}
        <Route render={DetailMovie} path="/detail/:imdbID">
          {/* <DetailMovie /> */}
        </Route>
      </Switch>
    </Router>
  
);

export default App;
