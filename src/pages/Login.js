import React, { useEffect, useContext, useState, useRef } from 'react'
import AuthContext from '../context/context';
import "../index.css"
/* import axios from "../api/axios" */
import { Link } from "react-router-dom"
/* import { toast } from 'react-toastify'; */
/* const LOGUN_URL = '/auth' */




const Login = () => {

    const {show, setShow } = useContext(AuthContext)

    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
   

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd])



    let getLoc = JSON.parse(localStorage.getItem("loginParol"))

    useEffect(() => {
        const SignUpLocal = JSON.parse(localStorage.getItem("loginParol"));
        if (!getLoc) {
            localStorage.setItem("loginParol", JSON.stringify([]));
        } else {
            localStorage.setItem("loginParol", JSON.stringify(SignUpLocal));
        }
    }, [])




    const handleSubmit = (e) => {
        e.preventDefault()
        getLoc.some((item) => {

            if (item.login === user && item.password === pwd) {
             
                    setUser("");
                    setPwd("");
                    setSuccess(true)
             


            } else if (item.login !== user) {
                setShow(true)
            } else if(item.password !== pwd){setShow(true)}
          
        })


        /*   try {
              const response = await axios.post(LOGUN_URL, JSON.stringify({ user, pwd }),
  
                  {
                      headers: { 'Content-type': 'application/json' },
                      withCredentials: true
                  });
                  console.log(JSON.parse(response?.data));
                  const accessToken = response?.data?.accessToken;
                  const roles = response?.data?.roles;
                  setAuth({user,pwd,roles,accessToken})
              setUser('');
              setPwd('');
              setSuccess(true)
          } catch (err) { 
              if(!err?.response){
                  setErrMsg("No Server Response")
              }else if(err.response?.status === 400){
                  setErrMsg("Missing Username or Password")
              }
              else if(err.response?.status === 401){
                      setErrMsg("Unauthorized")
              }else{
                  setErrMsg("Login Failed")
              }
              errRef.current.focus();
          } */




    }


    return (
        <div className='mainform'>
            {success ? (<section>
                <h1 className='turesuch'>You are logged in!</h1>
                <br />
                <Link to="/home" onClick={()=>{setShow(false)}} className='truesu'>Go to Home</Link>

            </section>)
                : (<section className='secform'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1 className='forum-h'>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label><br />
                        <input type="text"
                            placeholder='Username'
                            id={!show ? 'usename' : "redid"}
                            ref={userRef}
                            value={user}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            required /> <br />
                        <label htmlFor="password">Password:</label> <br />
                        <input type="password"
                            placeholder='Password'
                            id={!show ? 'password' : "redid"}
                            ref={userRef}
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            required /> <br />

                        <button className='btnform' type='submit'>Sign In</button>
                    </form>
                    <p className='needAcount'>
                        Need an Account ? <br />
                        <span className='line'>
                            <Link to="register" className='btna'>Sign Up</Link>
                        </span>
                    </p>
                </section>)}
        </div>
    )
}

export default Login
