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
							<form onSubmit={this.searchForServices.bind(this)}>
								<div className="row pad-top-fixed-15">
                  Service Type:

									<select className="form-control" ref="serviceType">
						      {
						        this.props.services.map(function(service) {
						            return <option key={service.Name} value={service._id}>{service.Name}</option>
						        })
						      }
						      </select>

									{/*<input type="text" className="form-control" id="serviceType" ref="serviceType"/>*/}
								</div>
								<div className="row pad-top-fixed-15">
                  State (Location):
									<select className="form-control" ref="serviceLocation">
						      {
						        this.props.states.map(function(state) {
						            return <option key={state.Name} value={state._id}>{state.Name}</option>
						        })
						      }
						      </select>
									{/*<input type="text" className="form-control" id="location" ref="location"/>*/}
								</div>
                <div className="row pad-top-fixed-15">
                  Start DateTime:
									<input type="datetime-local" className="form-control" id="startDatetime" ref="startDatetime"/>
								</div>
                <div className="row pad-top-fixed-15">
                  Duration:
									<select className="form-control" ref="serviceDuration">
						      {
						        this.props.serviceDurations.map(function(serviceDuration) {
						            return <option key={serviceDuration.Name} value={serviceDuration.Value}>{serviceDuration.Name}</option>
						        })
						      }
						      </select>
									{/*<input type="number" className="form-control" id="duration" ref="duration"/>*/}
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

	searchForServices(event) {
    // Becaus the test cannot get event argument
    // so call preventDefault() on undefined cause an error
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const {searchForServices} = this.props;
    const {serviceType, serviceLocation, startDatetime, serviceDuration} = this.refs;

    searchForServices(serviceType.value, serviceLocation.value, startDatetime.value, serviceDuration.value);
  }


}

export default RequestAgent;
