import React from 'react';
import './App.css';
import  HomePage from './pages/homepage/homepage';
import {Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import ShopPage from './pages/shop-page/shop.component';
import Header from './components/header/header.component';
import SingInAndSignUpPage from './pages/sing-in-sing-up/sign-in sign-up.component';
import {auth, createUserProfileDocument, singInWithGoogle} from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user.actions';

class App extends React.Component{

  unsusbscribeFromAuth = null;

    componentDidMount(){

      const {setCurrentUser} =  this.props;

      this.unsusbscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
        if (userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            setCurrentUser ({
                id: snapShot.id,
                ...snapShot.data()
              });
            });
        }
       setCurrentUser(userAuth);
      });
    }

    componentWillUnmount(){
      this.unsusbscribeFromAuth();
    }

  render(){
    
  return <div>
    <Header/>
  <Switch>  
  <Route exact path="/" component={HomePage} />
  <Route path="/shop" component={ShopPage} />
  <Route exact path="/signin" render={() => this.props.currentUser ? 
  (<Redirect to= '/'/>): (<SingInAndSignUpPage/>)} />
  </Switch>

    </div>
    
  }

}

const mapStateToProps = ({user}) => ({
  currentUser : user.currentUser
});

const mapDispatchToprops = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps, 
  mapDispatchToprops )
  (App);
