import React, { useRef, useState, useEffect, useContext } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../App.css"
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';
import AuthContext from '../context/context';
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWDREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const SignObj = {
  login:"",
  password:""
}




const Register = () => {
  const { setShow } = useContext(AuthContext)


  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState("")
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState("")
  const [validePwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState("")
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState("")
  const [success, setSuccess] = useState(false)

  SignObj.login = user;
  SignObj.password = pwd

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWDREGEX.test(pwd);
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg("")
  }, [user, pwd, matchPwd])


  


  const handleSubmit = async(e)=>{
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWDREGEX.test(pwd);
    if(!v1 || !v2){
      setErrMsg("Invalid Entry");
      return
    }
    setShow(false)
    setSuccess(true)
    toast.success("Register Success!");
    let locGET = JSON.parse(localStorage.getItem("loginParol"))
    locGET.push(SignObj);
    localStorage.setItem("loginParol",JSON.stringify(locGET))
  }
  
  return (

    <div className='body'>
    {success ? (<section className='sec'>
      <h1>Success!</h1>
      <p>
      <Link className='btnSucReq' to="/">Sign In</Link>
      </p>
    </section>):( <section className='secregistr'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" >{errMsg}</p>

      <h1>Register</h1>

      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor="username"> Username
        <span className={validName ? "valid" : "hide"} >
          <FontAwesomeIcon icon={faCheck}/>
        </span>
        <span className={validName || !user ? "hide" : "invalid" }>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        </label>
        <input 
        ref={userRef}
        type="text"
          id="username"
          autoComplete='off'
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
         /*  aria-describedy="uidnote" */
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)} />
        <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a latter <br />
          Letters, numbers, underscores, hypens allowed.
        </p>

        <label htmlFor="password"> Password:
        <span className={validePwd ? "valid" : "hide"} >
          <FontAwesomeIcon icon={faCheck}/>
        </span>
        <span className={validePwd || !pwd ? "hide" : "invalid" }>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        </label>
        <input 
        ref={userRef}
        type="password"
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validePwd ? "false" : "true"}
          /* aria-describedy="uidnote" */
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)} />
        <p id='pwdnote' className={pwdFocus && !validePwd ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters. <br />
          Must include uppercase and lowercase latters, a number and a special character <br />
          Allowed special charaters: <span aria-label="exclamation mark">!</span>
          <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>
          <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
        </p>


        <label htmlFor="cofirm_pwd">Confirm Password:
        <span className={validMatch && matchPwd ? "valid" : "hide"} >
          <FontAwesomeIcon icon={faCheck}/>
        </span>
        <span className={validMatch || !matchPwd ? "hide" : "invalid" }>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        </label>
        <input 
        ref={userRef}
        type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          aria-invalid={validMatch ? "false" : "true"}
         /*  aria-describedy="confirmnote" */
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)} />
        <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
         Must match the first password input field.
        </p>
        <button type='submit' className={!validName || !validePwd || !validMatch ? "red" :"green" } disabled={!validName || !validePwd || !validMatch ? true : false}>Sign Up</button>
      </form>
      <p>
        Already registered ? <br />
        <span className='line'>
          <Link className='gotoLog' onClick={()=>{setShow(false)}} to="/">Sign In</Link>
        </span>
      </p>
    </section>)}
    </div>
   
  )
}

export default Register
