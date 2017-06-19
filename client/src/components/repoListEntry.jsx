import React from 'react';

const RepoListEntry = (props) => {

console.log("user name ",props.repo.name);
return (
	<div>
	 	<li>
	 	{props.repo.repos.map (( el) => {
	 		//props.repo.repos[0].url
	 		return el.name
	 	})}
	    
	  </li>
	</div>
)
}
export default RepoListEntry;