import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleRegister = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        const terms = event.target.terms.checked;
        console.log(email, password, terms);

        // clear error message
        setErrorMessage('')
        setSuccess(false)

        if(!terms){
            setErrorMessage('Please Accept Our Terms & Condition')
            return
        }

        if (password.length < 6) {
            setErrorMessage('Password should be Six Character or longer')
            return
        }
        // create user with email & password
        createUserWithEmailAndPassword(auth, email, password)
            .then(credential => {
                console.log(credential.user);
                setSuccess(true)

                // send verification email
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                    console.log('Verification Email Sent');
                })
            })
            .catch(error => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message)
                setSuccess(false)
            })
    }

    return (
        <div className='max-w-xl mx-auto relative'>
            <h2 className="text-4xl my-8">Register</h2>
            <form onSubmit={handleRegister}>
                <label className="input input-bordered flex items-center gap-2 my-8">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input type="email" name='email' className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input type={showPassword ? 'text' : 'password'}
                        name='password'
                        className="grow"
                        placeholder='Password' />

                </label>
                {/* check box */}
                <div className="form-control ">
                    <label className="label cursor-pointer justify-start gap-4">
                    <input type="checkbox" name='terms' className="checkbox checkbox-primary" />
                        <span className="label-text text-2xl">Accept Terms & Condition</span>
                        
                    </label>
                </div>

                {
                    errorMessage && <p className='text-red-600'>{errorMessage}</p>
                }
                {
                    success && <p className='text-green-700'>Sign Up Successful.</p>
                }
                <button className='btn btn-accent btn-wide my-8'>Create Account</button></form>
            <button onClick={() => setShowPassword(!showPassword)}
                className='absolute right-6 top-40'>
                {
                    showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                }
            </button>
                <p> Already have an Account Please <Link to="/login">Login</Link></p>
        </div>
    );
};

export default Register;