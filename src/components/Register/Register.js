import React from 'react';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }
  
  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  
  onSubmitRegister = () => {
    fetch('https://agile-plains-81939.herokuapp.com/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){
        this.props.loadUser(user);
        this.props.onRouteChange('home');
      }
    })
  }

  render() {
    return (
      <main className="pa4 black-80">
        <div className="center">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0 center">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                type="text" 
                name="name" 
                id="name"
                onChange={this.onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
              <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                type="email" 
                name="email-address" 
                id="email-address" 
                onChange={this.onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white" 
                type="password" 
                name="password" 
                id="password" 
                onChange={this.onPasswordChange}
              />
            </div>
          </fieldset>
          <div className="">
            <input 
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
              type="submit" 
              value="Register" 
              onClick={this.onSubmitRegister}
            />
          </div>
        </div>
      </main>
    )
  }
}

export default Register;