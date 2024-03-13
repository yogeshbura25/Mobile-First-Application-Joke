import { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './index.css';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    localStorage.removeItem('current_user');
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeRePassword = (e) => {
    const passwordInput = document.getElementById('Repass');
    if (e.target.value !== password) {
      passwordInput.classList.remove('match');
      passwordInput.classList.add('un-match');
    } else {
      passwordInput.classList.remove('un-match');
      passwordInput.classList.add('match');
    }
  };

  const checkFields = (details) => {
    const passwordInput = document.getElementById('Repass');
    if (username === '' || password === '' || passwordInput.value === '') {
      setIsError(true);
      setErrMsg('Please enter all credentials');
    } else {
      const userDetails = [
        ...details,
        { username, password },
      ];
      localStorage.setItem('user_details', JSON.stringify(userDetails));
      setUsername('');
      setPassword('');
      setIsError(false);
      passwordInput.value = '';
      navigate('/');;
    }
  };

  const onSignUp = (e) => {
    e.preventDefault();
    const details = JSON.parse(localStorage.getItem('user_details')) || [];
    if (details.length === 0) {
      checkFields(details);
    } else {
      let isExisted = false;
      details.forEach((eachItem) => {
        if (eachItem.username === username) {
          isExisted = true;
          setIsError(true);
          setErrMsg('User already exists');
        }
      });
      if (!isExisted) {
        checkFields(details);
      }
    }
  };
  
  

  return (
    <div className="form-cont">
     
      <form onSubmit={onSignUp}>
        <h1>Sign UP</h1>
        <label htmlFor="name">USERNAME</label>
        <input
          type="text"
          id="name"
          placeholder="Enter Username"
          title="Enter Username"
          value={username}
          onChange={onChangeUsername}
        />
        <label htmlFor="pass">PASSWORD</label>
        <input
          type="password"
          id="pass"
          placeholder="Enter Password"
          title="Enter Password"
          value={password}
          onChange={onChangePassword}
        />
        <label htmlFor="Repass">RE-ENTER PASSWORD</label>
        <input
          type="password"
          id="Repass"
          placeholder="Re-Enter Password"
          title="Re-Enter Password"
          className="re-pass-inp"
          onChange={onChangeRePassword}
        />
        <button type="submit" className="sign-up-btn">
          SIGN UP
        </button>
        {isError && <p className="err">{errMsg}</p>}
        <p>
          Already a User? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;