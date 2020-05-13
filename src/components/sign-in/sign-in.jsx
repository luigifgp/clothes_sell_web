import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {singInWithGoogle} from '../../firebase/firebase.utils.js';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ email: "", password:""});
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
                

                <CustomButton type="submit">Sign in </CustomButton>
                <CustomButton onClick={singInWithGoogle}>Sign in with Google </CustomButton>
            </form>
        </div>
        
        );
    }

}

export default SignIn;