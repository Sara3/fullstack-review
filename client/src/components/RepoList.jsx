import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => {
	

return (
	<div>
	    <h4> Repo List Component </h4>
	    {console.log(props.repos)}
	    There are {props.repos.length} repos.

  	
  	{props.repos.map((repo) => {
		//console.log(repo);
		return <RepoListEntry repo={repo} />
		
		
	})}
	</div>
	)
}
  


export default RepoList;