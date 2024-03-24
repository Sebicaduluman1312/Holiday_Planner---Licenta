import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/header/header';


function App() {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/">
              
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
