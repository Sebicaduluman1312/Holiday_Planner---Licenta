import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPageContent from './pages/main/main';
import SignUp from './pages/sign-up/SignUp';
import SignIn from './pages/sign-in/SignIn';
import PrivateRoute from './utils/PrivateRoutes';
import HomeComponent from './pages/home/home';

function App() {

  return (
    <div className="App">

      <Router>
        <Switch>

          <Route exact path="/" component={MainPageContent} />
          <Route exact path="/sign-up" component={SignUp}/>
          <Route exact path="/sign-in" component={SignIn}/>

          <PrivateRoute exact path="/home" component={HomeComponent} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
