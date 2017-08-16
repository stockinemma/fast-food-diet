import React from "react";
import { Router, Route, browserHistory, Link } from 'react-router';

export default class User extends React.Component{
	constructor(){
		super();
		this.state = {
			userMeals:[]
		}
	}
	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
			if(user){

				const userId = firebase.auth().currentUser.uid

				const dbRef = firebase.database().ref(userId)
				dbRef.on("value", (firebaseData) => {
					console.log("firebasedataval", firebaseData.val());
					const mealsArray =[];
					const mealsData= firebaseData.val();

					for(let mealKey in mealsData) {
						mealsData[mealKey].key = mealKey
					console.log("mealkey", mealsData[mealKey].key);
						mealsArray.push(mealsData[mealKey])
					}
					console.log("mealsarray", mealsArray)
					this.setState({
						userMeals: mealsArray
					})
				})
			}
		})
	}
	removeMeal(mealToRemove){
		console.log("meal to remove", mealToRemove);
		const dbRef = firebase.database().ref(firebase.auth().currentUser.uid + "/" + mealToRemove);
		dbRef.remove();
	}
	render(){
		return (
			<div className="userPage">
				<div className="sideBar">
					<p><Link to="/resources"><i className="fa fa-book" aria-hidden="true"></i></Link></p>
					<p><a href="https://twitter.com/intent/tweet?text=Plan%20your%20fast%20food%20meals%20with%20health%20in%20mind!%20http://codedbyjessica.com/fastfooddiet%20developed%20by%20@codedbyjessica" target="_blank"><i className="fa fa-twitter" aria-hidden="true"></i></a></p>
				</div>
				<aside className="mealsContent">
					<h1>My Saved Meals</h1>
					<div className="userMeals">
					{this.state.userMeals.map((userMeal) => { 
						console.log("usermeal",userMeal.key);
						console.log("usermeal 1", userMeal.userMeal)
						return(
							<div className="eachMeal" key={userMeal.key}> 
								<h2>My Meal</h2>
								<button onClick={() => this.removeMeal(userMeal.key)}>Remove Meal</button>
								{userMeal.userMeal.map((userMealItem, i) =>{
									return(
									<div className="myDietItem" key={i}>
										<h4>{`${userMealItem[1]} from ${userMealItem[0]}`}</h4>
										<p>{`Calories: ${userMealItem[2]}kcal`} | {`protein: ${userMealItem[5]}g`}</p>
										<p>{`carbs: ${userMealItem[6]}mg`} | {`fat: ${userMealItem[7]}g`}</p>
										<p>{`sodium: ${userMealItem[4]}mg`} | {`Sugars: ${userMealItem[3]}g`}</p>
									</div>
									)
								})}
							</div>
						)
					})}
					</div>
				</aside>
			</div> 
		)
	}
}