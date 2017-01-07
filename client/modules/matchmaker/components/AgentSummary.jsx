import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import AgentDetailsPopup from '/client/modules/core/components/PopupModal.jsx';


// Agent Summary component - represents a single Agent list item
export default class AgentSummary extends Component {
	constructor(props) {
    super(props)
    this.state = { isModalOpen: false }
  }

	handleClickAgentSummary(event){
		if (!this.state.isModalOpen) {
			this.openModal();
		}
	}

	openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

	requestForAgent(event){
		// Becaus the test cannot get event argument
    // so call preventDefault() on undefined cause an error
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const {requestForAgent} = this.props;

    requestForAgent(Session.get("ServiceRequest"), this.props.agent);
	}

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

	render() {
		// Just render a placeholder container that will be filled in
		return (
			<div className="row agent-summary" onClick={this.handleClickAgentSummary.bind(this)}>
				<div className="agent-image col-xs-3">
					<img src="/images/agent-placeholder.png"/>
				</div>
				<div className ="agent-details col-xs-9">
					{this.props.agent.FullName}
					<div class="rating">
						<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
					</div>
					<span className="agent-description">
						20 years on the field experience.
					</span>
				</div>


					<AgentDetailsPopup isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
						<h3>Agent Details</h3>
						<p>{this.props.agent.FullName}</p>
						<p>Rating: 5 Stars</p>
						<p>Protected:  number of customers</p>
						<p>Last Active:  last active datetime</p>
						<p>{this.props.agent._id.toString()}</p>
						<p><button onClick={this.requestForAgent.bind(this)}>Request</button><button onClick={() => this.closeModal()}>Close</button></p>
					</AgentDetailsPopup>
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
