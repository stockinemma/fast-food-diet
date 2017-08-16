import React from "react";

export default class Auth extends React.Component {
	constructor() {
		super();
		this.state = {
			formToShow: '',
			email: '',
			password: '',
			confirm: '',
			user: ""
		};
		this.formToShow = this.formToShow.bind(this);
		this.closeForm = this.closeForm.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.signup = this.signup.bind(this);
		this.login = this.login.bind(this);
		firebase.auth().onAuthStateChanged((user) =>{
			if(user){
				this.setState({
					user:"userHere",
				})
			}
		})
	}
	componentDidMount(){
		 document.addEventListener('keydown', (e) => {
			if(e.keyCode == 27){
				this.setState({
				formToShow: ""
				});
				document.getElementById("maskDiv").classList.remove("mask");;
			}
		});
	}
	formToShow(e) {
		e.preventDefault();
		this.setState({
			formToShow: e.target.className
		});
		document.getElementById("maskDiv").classList.add("mask");
	}
	closeForm(e){
		e.preventDefault();
		// console.log("closing!")
		this.setState({
			formToShow: ""
		});
		document.getElementById("maskDiv").classList.remove("mask");
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	signup(e) {
		e.preventDefault();
		// console.log("signing...");
		// console.log(this.state.email,this.state.password,this.state.confirm);
		if(this.state.password=this.state.confirm){
			firebase.auth()
				.createUserWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
					var errorCode = error.code;
						var errorMessage = error.message;
						alert(errorMessage);
						console.log(error);
				})
		setTimeout(location.reload.bind(location), 1000);
		}
	}
	login(e) {
		e.preventDefault();
		firebase.auth()
			.signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => {
					var errorCode = error.code;
						var errorMessage = error.message;
						alert(errorMessage);
						// console.log(error);
				})
		setTimeout(location.reload.bind(location), 1200);
	}
	signout(e){
		e.preventDefault();
		firebase.auth()
			.signOut()
			.then(() => {
		});
	window.location.assign("/fastfooddiet/");
	}
	render() {
		let loginForm = '';
		if(this.state.formToShow === 'signup') {
			loginForm = (
				<div className="loginForms">
					<div className="loginCloseDiv">
						<button className="loginClose" onClick={this.closeForm}>x</button>
					</div>
					<form onSubmit={this.signup} className="user-form">
						<div>
							<label htmlFor="email">Email: </label>
							<input type="email" name="email" onChange={this.handleChange} />
						</div>
						<div>
							<label htmlFor="password">Password: </label>
							<input type="password" name="password" onChange={this.handleChange} />
						</div>
						<div>
							<label htmlFor="confirm">Confirm: </label>
							<input type="password" name="confirm" onChange={this.handleChange} />
						</div>
						<button>Sign In</button>
					</form>
				</div>
			);
		}
		else if(this.state.formToShow === "login") {
			loginForm = (
				<div className="loginForms">
					<div className="loginCloseDiv">
						<button className="loginClose" onClick={this.closeForm}>x</button>
					</div>
					<form onSubmit={this.login} className="user-form">
						<div>
							<label htmlFor="email">Email: </label>
							<input type="email" name="email" onChange={this.handleChange}/>
						</div>
						<div>
							<label htmlFor="password">Password: </label>
							<input type="password" name="password" onChange={this.handleChange}/>
						</div>
						<button>Log In</button>
					</form>
				</div>
			);
		}

		//hide login/logout buttons depending on user
		let login = ""
		let logout = ""
		// console.log(this.state.user)

		if(this.state.user){
			login = "displayNone"
		} else {
			login = "displayBlock"
		};

		if(this.state.user){
			logout = "displayBlock"
		} else {
			logout = "displayNone"
		};

		//make buttons dead/become the headings
		let signupid=""
		let loginid=""
		if(this.state.formToShow === 'signup'){
			signupid += "buttonOn"
		} else {
			signupid += ""
		};
		if(this.state.formToShow === 'login'){
			loginid += "buttonOn"
		} else {
			loginid += ""
		};
		return (
			<div className="loginOptions">
				<div className={login}>
					<button className="signup" id={signupid} onClick={this.formToShow}>Sign Up</button>
					<button className="login" id={loginid} onClick={this.formToShow}>Log In</button>
				</div>
				<div className={logout}>
					Welcome {this.state.email}! <button className="signout" onClick={this.signout}>Log Out</button>
				</div>
				<div>
				{loginForm}
				</div>
			</div>
		)
	}
}