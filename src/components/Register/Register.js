import React from 'react';


const Register = ({ onRouteChange }) => {
	return (
		<main className="pa4 black-80">
      <form className="center">
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f2 fw6 ph0 mh0 center">Register</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="text" name="name"  id="name" />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="email" name="email-address"  id="email-address" />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" type="password" name="password"  id="password" />
          </div>
        </fieldset>
        <div className="">
          <input 
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
            type="submit" 
            value="Register" 
          />
        </div>
      </form>
    </main>
	)
}

export default Register;