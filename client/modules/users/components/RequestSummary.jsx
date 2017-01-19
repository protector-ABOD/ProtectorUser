import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
// import AgentDetailsPopup from '/client/modules/core/components/PopupModal.jsx';
import Modal from 'react-modal';
import Rating from 'react-rating';
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

	handleClickRejectedRequest(event){
		const {searchForServices} = this.props;
		serviceRequest = {};
		serviceRequest["_id"] = this.props.request._id;
		searchForServices(serviceRequest);
	}

	handleClickRateButton(event){
		const {rateAgent} = this.props;
		const {rating, comment} = this.refs;
    var result = rateAgent(this.props.request._id, +rating.value, comment.value);
		this.closeModal();

	}

	openModal() {
    this.setState({modalIsOpen: true});
  }


  closeModal() {
		this.setState({modalIsOpen: false});
  }

  dateToString(date) {
		function pad(s) { return (s < 10) ? '0' + s : s; }
	  var d = new Date(date);
	  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }

	modalComponent() {
		var optionRating = [];
		for (var i = 1; i <= 5; i++) {
			optionRating.push(<option key={i} value={i}>{i}</option>);
		}

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
						<p>{this.props.request.Agent.FullName}</p>
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
				<div className="row" style={{minHeight: '150px'}}>
					<span> Comment </span>
					<textarea ref="comment" type="text" style={{height: '100px', resize: 'none'}} className="form-control" id="serviceType"></textarea>
					<span> Rating </span>
					{/*<Rating
						initialRate='3'
						empty= 'fa fa-star-o fa-lg'
						full= 'fa fa-star fa-lg'
					/>*/}
					<select className="form-control" ref="rating" defaultValue="3">
						{optionRating}
					</select>
				</div>
				<div className="row">
					<p><button className="btn btn-primary btn-100" onClick={this.handleClickRateButton.bind(this)}>Rate</button></p>
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
			clickHandler = this.handleClickRejectedRequest.bind(this);
		} else if (this.props.request.Service_Request_Status == SERVICE_REQUEST_COMPLETED){
			statusTextClass = "request-completed";
			if (!this.props.request.Rating_By_User) {
				modalComponent = this.modalComponent();
				clickHandler = this.handleClickCompletedRequest.bind(this);
			}
		}

		return (
			<div className={"row agent-summary " + (statusTextClass)} onClick={clickHandler} >
				<div className="agent-image col-xs-3">
					<img src="/images/agent-placeholder.png"/>
				</div>
				<div className ="agent-details col-xs-5">
					<p>{this.props.request.Agent.FullName}</p>
					<p>{this.dateToString(this.props.request.Service_Request.Service_Start_Time)}</p>
					<p>{this.props.request.Service_Request.Service_State_Code}</p>
				</div>
				<div className ="agent-details col-xs-4">
					<p className="status">{this.props.request.Service_Request_Status}</p>
          <p>{this.props.request.Service_Request.Service_Type_Code}</p>
				</div>
				{modalComponent}
			</div>
		);
	}


	render() {

		return (
			<div>
				{this.requestComponent()}
			</div>
	 )
		// Just render a placeholder container that will be filled in
		// let navigateToPage = null;
		// if (this.props.request.Service_Request_Status == SERVICE_REQUEST_REJECTED) {
		// 	navigateToPage = "/services/search";
		// }
		//
		// if (navigateToPage)
		// {
		// 	return (
		// 		<a href={navigateToPage}>
		// 			{this.requestComponent()}
		// 		</a>
		// 	)
		// } else {
		// 	return (
		// 		<div>
		// 			{this.requestComponent()}
		// 		</div>
		//  )
		// }
	}
}

RequestSummary.propTypes = {
  // This component gets the agent to display through a React prop.
  // We can use propTypes to indicate it is required
  request: PropTypes.object.isRequired,
};
