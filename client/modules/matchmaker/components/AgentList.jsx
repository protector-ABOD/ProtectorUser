import React from 'react';
import ReactDOM from 'react-dom';
import AgentSummary from '../containers/AgentSummary.js' ;

class AgentList extends React.Component {

	constructor(props, context) {
		super(props, context);
  }

	renderAgents() {
		return this.props.agentList.map((agent) => (
      <AgentSummary key={agent._id} agent={agent} />
    ));
	}

	render() {
		// Just render a placeholder container that will be filled in
		return (

			<div id="login-body-container">
				List of agents will be displayed here
				<ul>
					{this.renderAgents()}
			 </ul>
			</div>
		)
	}
}

export default AgentList;
