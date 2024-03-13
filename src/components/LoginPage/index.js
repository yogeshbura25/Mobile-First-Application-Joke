import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickCheckBox = () => {
    const passwordElement = document.getElementById('pass');
    if (passwordElement.type === 'password') {
      passwordElement.type = 'text';
    } else {
      passwordElement.type = 'password';
    }
  };

  const checkFields = () => {
    if (username === '' || password === '') {
      setIsError(true);
      setErrMsg('Please enter all credentials');
    } else {
      setIsError(false);
      loginProcess();
    }
  };

  const loginProcess = () => {
    const details = JSON.parse(localStorage.getItem('user_details'));
    if (details) {
      let exists = false;
      details.forEach((eachItem) => {
        if (eachItem.username === username) {
          exists = true;
        }
      });
      if (exists) {
        const particularUser = details.filter(
          (eachItem) => eachItem.username === username
        );
        if (particularUser[0].password === password) {
          const currentUser = details.filter(
            (eachElement) => eachElement.username === username
          );
          localStorage.setItem('current_user', JSON.stringify(currentUser[0]));
          navigate('/home');
        } else {
          setIsError(true);
          setErrMsg("Username and Password didn't match");
        }
      } else {
        setIsError(true);
        setErrMsg('The user seems to be new! Please sign up');
      }
    } else {
      setIsError(true);
      setErrMsg('The user seems to be new! Please sign up');
    }
  };
  

  const onClickLogin = (e) => {
    e.preventDefault();
    checkFields();
  };

  return (
    <div className="login-cont">
      <div className="login-form-cont">
        <h1>Login</h1>
        <form className="login-form" onSubmit={onClickLogin}>
          <label htmlFor="user">USERNAME</label>
          <input
            id="user"
            type="text"
            placeholder="Enter Username"
            className="inputs"
            value={username}
            onChange={onChangeUsername}
          />
          <label htmlFor="pass">PASSWORD</label>
          <input
            id="pass"
            type="password"
            placeholder="Enter Password"
            className="inputs"
            value={password}
            onChange={onChangePassword}
          />
          <div>
            <input
              id="show"
              type="checkbox"
              className="check-box"
              onClick={onClickCheckBox}
            />
            <label htmlFor="show">Show Password</label>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {isError && <p className="err">{errMsg}</p>}
        </form>
        <p>
          New Here? <Link to="/SignUp">SIGN UP</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;