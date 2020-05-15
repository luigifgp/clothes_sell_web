import React from 'react';
import './App.css';
import  HomePage from './pages/homepage/homepage';
import {Switch, Route} from 'react-router-dom';
import ShopPage from './pages/shop-page/shop.component';
import Header from './components/header/header.component';
import SingInAndSignUpPage from './pages/sing-in-sing-up/sign-in sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';


class App extends React.Component{
  constructor(){
    super();

    this.state = {
      currentUser: null
    };
  }

  unsusbscribeFromAuth = null;

    componentDidMount(){
      this.unsusbscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
        if (userAuth){
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            })
          });
          
        }
       this.setState({currentUser:userAuth});
      });
    }

    componentWillUnmount(){
      this.unsusbscribeFromAuth();
    }

  render(){
  return <div>
  <Header currentUser={this.state.currentUser}/>
  <Switch>  
  <Route exact path="/" component={HomePage} />
  <Route path="/shop" component={ShopPage} />
  <Route path="/signin" component={ SingInAndSignUpPage} />
  </Switch>

    </div>
    
  }

}
export default App;
