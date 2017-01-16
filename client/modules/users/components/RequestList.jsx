import React from 'react';
import ReactDOM from 'react-dom';
import RequestSummary from '../containers/RequestSummary.js' ;

class RequestList extends React.Component {

	constructor(props, context) {
		super(props, context);
  }

	renderRequests() {
		return this.props.serviceRequestList.map((request) => (
      <RequestSummary key={request._id.id} request={request} />
    ));
	}

	render() {
		// Just render a placeholder container that will be filled in
		return (
			<div className="content-container align-middle">
				<div className="row">
					<header className="title"> Requests </header>
				</div>
				<div className="row">
					<div className="col-xs-12 pad-all-20">
						<div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-4 col-md-4">
            {this.renderRequests()}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RequestList;
