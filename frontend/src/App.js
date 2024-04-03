import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/header/header';
import MainPageContent from './pages/main/main';
import SignUp from './pages/sign-up/SignUp';
import SignIn from './pages/sign-in/SignIn';
import HomeComponent from './pages/home/home';

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <div className="content">
            <Switch>
              <Route exact path="/">
                <NavBar />
                <MainPageContent />
              </Route>
              <Route exact path="/sign-up">
                <SignUp />
              </Route>
              <Route exact path="/sign-in">
                <SignIn />
              </Route>
              <Route exact path="/home">
                <HomeComponent />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
