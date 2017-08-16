import React from "react";

export default function DietItem(props) {
	return(
			<button onClick={() => props.remove(props.dietIndex)}>Remove</button>
	)
}
