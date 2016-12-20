import React from 'react';
import ReactDOM from 'react-dom';

class RequestAgent extends React.Component {

	constructor(props, context) {
		super(props, context);
  }
	render() {
		const {error} = this.props;

		return (
			<div className="content-container login-body-container align-middle">
				<div className="row pad-top-percent-5">
					<div className="col-xs-12">
						<img id="login-logo" src="/images/Protect_Logo.png" alt="" />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 pad-all-20">
						<div className="col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2">
							{error ? <span className="text-error">{error}</span> : <span>&nbsp;</span>}
						</div>
						<div className='col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2 active-form'>
							<form>
								<div className="row pad-top-fixed-15">
                  Service Type:
									<input type="text" className="form-control" id="serviceType" ref="serviceType"/>
								</div>
								<div className="row pad-top-fixed-15">
                  State (Location):
									<input type="text" className="form-control" id="location" ref="location"/>
								</div>
                <div className="row pad-top-fixed-15">
                  Start DateTime:
									<input type="datetime-local" className="form-control" id="startDatetime" ref="startDatetime"/>
								</div>
                <div className="row pad-top-fixed-15">
                  Duration:
									<input type="number" className="form-control" id="duration" ref="duration"/>
								</div>
								<div className="row pad-top-fixed-15">
									<button type="submit" className="btn btn-success btn-100">Request For Agent</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default RequestAgent;
