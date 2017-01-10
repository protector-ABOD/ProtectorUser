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
    this.state = { modalIsOpen: false }
		this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }



	handleClickCompletedRequest(event){
		if (!this.state.modalIsOpen) {
			this.openModal();
		}
	}

	openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
		this.setState({modalIsOpen: false});
  }


  dateToString(date) {
    return date.toString();
  }

	modalComponent() {
		return (
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
					<span> Comment </span>
					<input type="text" style={{height: '100%'}} className="form-control" id="serviceType" ref="serviceType"/>
				</div>
				<div className="row">
					<p><button className="btn btn-primary btn-100">Rate</button></p>
				</div>
			</Modal>
		)
	}

	requestComponent() {
		let statusTextClass = null;
		let modalComponent = null;
		let clickHandler = null;
		if (this.props.request.Service_Request_Status == SERVICE_REQUEST_PENDING) {
			statusTextClass = "request-pending";
		} else if (this.props.request.Service_Request_Status == SERVICE_REQUEST_REJECTED) {
			statusTextClass = "request-rejected";
		} else if (this.props.request.Service_Request_Status == SERVICE_REQUEST_COMPLETED){
			statusTextClass = "request-completed";
			modalComponent = this.modalComponent();
			clickHandler = this.handleClickCompletedRequest.bind(this);
		}

		return (
			<div className={"row agent-summary " + (statusTextClass)} onClick={clickHandler} >
				<div className="agent-image col-xs-3">
					<img src="/images/agent-placeholder.png"/>
				</div>
				<div className ="agent-details col-xs-9">
          <span>{this.props.request.Agent[0].FullName}</span>
          <span>{this.dateToString(this.props.request.Service_Request.Service_Start_Time)}</span>
          <span>{this.props.request.Service_Request_Status}</span>
				</div>
				{modalComponent}
			</div>
		);
	}


	render() {
		// Just render a placeholder container that will be filled in
		let navigateToPage = null;
		if (this.props.request.Service_Request_Status == SERVICE_REQUEST_REJECTED) {
			navigateToPage = "/services/search";
		}

		if (navigateToPage)
		{
			return (
				<a href={navigateToPage}>
					{this.requestComponent()}
				</a>
			)
		} else {
			return (
				<div>
					{this.requestComponent()}
				</div>
		 )
		}

	}
}

RequestSummary.propTypes = {
  // This component gets the agent to display through a React prop.
  // We can use propTypes to indicate it is required
  request: PropTypes.object.isRequired,
};
