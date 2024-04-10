import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from '../utils/auth';
import { useState, useEffect } from "react";

const PrivateRoute = ({ component: Component, ...rest}) => {

    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const checkAuthentication = async () => {
            try 
            {
                const isAuthenticatedResult = await isAuthenticated();
                setAuth(isAuthenticatedResult);
            }
            catch (error) {
                console.log('Problem fetching authentication: ', error);
                setAuth(false);
            }
        };

        checkAuthentication();
    }, []);

    if (auth === null) {
        return <div>Loading...</div>; // TO DO: componenta loading
    }

    return (  
        <Route {...rest} render={(props) => (
            auth ? <Component {...props} /> : 
            <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
        )} />
    );
}
 
export default PrivateRoute;