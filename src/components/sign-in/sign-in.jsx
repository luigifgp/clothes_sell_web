import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {auth, singInWithGoogle} from '../../firebase/firebase.utils.js';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({ email: "", password:""});
        }catch (error){
         console.log(error);
        }

    };

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({ [name]: value});
    };

    render(){
        return (<div className="sign-in">
        <h2>I already have an account</h2>
        <span>sign in with your email and password</span>

            <form onSubmit= {this.handleSubmit}> 
                <FormInput 
                name="email" 
                type="email" 
                handleChange={this.handleChange} 
                value={this.state.email}
                label="Email"  
                required />
                
                <FormInput 
                name="password" 
                type="password" 
                handleChange={this.handleChange} 
                value={this.state.password} 
                label="password"
                required />
                
                <div className="buttons">
                <CustomButton type="button">Sign in </CustomButton>
                <CustomButton onClick={singInWithGoogle} isGoogleSignIn>Sign in with Google </CustomButton>
            </div>
            </form>
        </div>
        
        );
    }

}

export default SignIn;
