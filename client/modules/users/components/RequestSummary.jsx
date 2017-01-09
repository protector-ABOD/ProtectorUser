import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
// import AgentDetailsPopup from '/client/modules/core/components/PopupModal.jsx';
import Modal from 'react-modal';
require('/client/modules/core/components/popupmodal.css');


const customStyles = {
	overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.298039)'
  }
};

// Agent Summary component - represents a single Agent list item
export default class RequestSummary extends Component {
	constructor(props) {
    super(props)
    this.state = { modalIsOpen: false, confirmationModalIsOpen: false }
		this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



	handleClickAgentSummary(event){
		if (!this.state.modalIsOpen) {
			this.openModal();
		}
	}


	openModal() {
    this.setState({modalIsOpen: true});
  }

	openConfirmationModal() {
		this.closeModal();
    this.setState({confirmationModalIsOpen: true});
  }

  closeModal() {
		this.setState({modalIsOpen: false});
  }

	closeConfirmationModal() {
    this.setState({confirmationModalIsOpen: false});
  }

	handleClickConfirmButton(event){
		this.closeConfirmationModal();

    const {navigationAfterConfirm} = this.props;
    navigationAfterConfirm();
	}

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }

  getStartDateTime() {
    var date = this.props.request.Service_Request.Service_Start_Time;
    return date.toString();
  }

	render() {
		// Just render a placeholder container that will be filled in
		return (
			<div className="row agent-summary">
				<div className="agent-image col-xs-3">
					<img src="/images/agent-placeholder.png"/>
				</div>
				<div className ="agent-details col-xs-9">
          <span>{this.props.request.Agent[0].FullName}</span>
          <span>{this.getStartDateTime()}</span>
          <span>{this.props.request.Service_Request_Status}</span>
				</div>

				{/* Modal For Agent Details Popup*/}
				<Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Agent Details"
					className="ReactModal__Content"
        >
					<div className="row">
						<div className="agent-image col-xs-3">
							<img src="/images/agent-placeholder.png"/>
						</div>
						<div className ="agent-details col-xs-9">
							<div class="rating">
								<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
							</div>
						</div>
					</div>
					<div className="row">
						<span className="pull-left"> Protected: </span>
						<span className="pull-right"> 250 people </span>
						<div style={{clear: 'both'}}></div>
					</div>
					<div className="row">
						<span className="pull-left"> Last Active: </span>
						<span className="pull-right"> Yesterday </span>
						<div style={{clear: 'both'}}></div>
					</div>
					<div className="row" style={{height: '150px'}}>

					</div>
					<div className="row">
						<p><button className="btn btn-primary btn-100">Request</button></p>
					</div>
        </Modal>
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

RequestSummary.propTypes = {
  // This component gets the agent to display through a React prop.
  // We can use propTypes to indicate it is required
  request: PropTypes.object.isRequired,
};
