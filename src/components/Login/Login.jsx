import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef } from 'react';
import { auth } from '../../firebase.init';
import { Link } from 'react-router-dom';

const Login = () => {

    const emailRef = useRef()

    const handleLogin= e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
        // login user
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            console.log(result.user);
            if(!result.user.emailVerified){
                alert("Please verified your Email Address")
                return
            }
            else{
                alert("Login Successful")
            }
        })
        .catch(error=>{
            console.log('ERROR', error.message);
        })
    }

    const handleForgetPassword= ()=>{
        console.log('get me forget password', emailRef.current.value);
        const email = emailRef.current.value;
        if(!email){
            console.log('Please provide valid email address');
        }
        else{
            sendPasswordResetEmail(auth, email)
            .then(()=>{
                alert('Reset Email sent, please check your email');
            })
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label onClick={handleForgetPassword} className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <p className='p-4'>New to this website Please Sign Up <Link to="/register">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;