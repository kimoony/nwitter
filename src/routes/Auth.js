import React from 'react';
import { authService, firebaseInstance } from 'fBase';
import AuthForm from 'components/AuthForm';
import 'styles/Auth.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fab)

function Auth() {

  const onSocialClicik = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  }

  return (
    <div className="social_login-container">
      <AuthForm />
      <hr />
      <div className='social_login-box'>
        <button className='btn google-btn' name="google" onClick={onSocialClicik}>
          <FontAwesomeIcon icon={["fab", "google"]} /> Google 로그인
        </button>
        <button className='btn github-btn' name="github" onClick={onSocialClicik}>
          <FontAwesomeIcon icon={["fab", "github"]} /> GitHub 로그인
        </button>
      </div>
    </div>
  )
}

export default Auth
