import React, { useState } from 'react'
import { authService } from 'fBase';
import 'styles/AuthForm.css';

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newAccount, setNewAccount] = useState(true);

  const toggleAccount = () => setNewAccount(prev => !prev);

  const onChange = (e) => {
    const {
      target: { name, value }
    } = e;
    // console.log(name, value);
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
      }
      console.log(data);
    } catch (error) {
      console.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="auth_form-container">
      <form id="auth_form-form" onSubmit={onSubmit}>
        <input
          className="auth_form-input"
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          className="auth_form-input"
          name="password"
          type="password"
          placeholder="Password"
          minLength={8}
          required
          value={password}
          onChange={onChange}
        />
        <input className='auth_form-btn' type="submit" value={newAccount ? "회원가입" : "로그인"} />
        <h5 className="err-message">{error}</h5>
      </form>
      <span className="toggle-btn" onClick={toggleAccount}>{newAccount ? "가입했다면? ☛☛ 로그인하기" : "가입전이면? ☛☛  회원가입하기"}</span>
    </div>
  )
}

export default AuthForm