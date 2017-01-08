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
			<div className="content-container align-middle">
				<div className="row">
					<header className="title"> Result </header>
				</div>
				<div className="row">
					<div className="col-xs-12 pad-all-20">
						<div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-4 col-md-4">
							{this.renderAgents()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default AgentList;
