import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

// Agent Summary component - represents a single Agent list item
export default class AgentSummary extends Component {
	render() {
		// Just render a placeholder container that will be filled in
		return (
			<div class="row">
				{this.props.agent.FullName}

			</div>
			// <div id="login-body-container">
			// 	<ul>
			// 		<li>FullName: {this.props.agent.fullName}</li>
			// 		<li>Rating: {this.props.agent.rating}</li>
			// 		<li>{this.props.agent.yearsOfExperience} years of experience on the field</li>
			//  	</ul>
			// </div>
		)
	}
}

AgentSummary.propTypes = {
  // This component gets the agent to display through a React prop.
  // We can use propTypes to indicate it is required
  agent: PropTypes.object.isRequired,
};
