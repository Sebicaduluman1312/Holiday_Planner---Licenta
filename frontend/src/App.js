import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/header/header';
import MainPageContent from './pages/main/main';


function App() {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/">
              <MainPageContent />
            </Route>
            <Route path="/sign-up">
              <div className="abc">Asdsad</div>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
