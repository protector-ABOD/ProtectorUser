import React from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';

class SearchForServices extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {value: ''};

		this.handleServiceTypeChange = this.handleServiceTypeChange.bind(this);
  }

	handleServiceTypeChange(event) {
		console.log(event.target);
		this.setState({value: event.target.value});
	    //this.setState({[e.target.name] : e.target.value});
	}

	getISOStringWithoutSecsAndMillisecs1(date) {
	  const dateAndTime = date.toISOString().split('T')
	  const time = dateAndTime[1].split(':')

	  return dateAndTime[0]+'T'+time[0]+':'+time[1]
	}

	render() {
		const {error} = this.props;

		return (
			<div className="content-container align-middle">
				<div className="row">
					<div className="col-xs-12 pad-all-20">
						<div className="col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2">
							{error ? <span className="text-error">{error}</span> : <span>&nbsp;</span>}
						</div>
						<div className='col-xs-offset-2 col-xs-8 col-md-offset-5 col-md-2 active-form'>
							<form onSubmit={this.searchForServices.bind(this)}>
								<div className="row pad-top-fixed-15">
                  Service Type:

									<select className="form-control" ref="serviceType" onChange={this.handleServiceTypeChange.bind(this)}>
						      {
						        this.props.services.map(function(service) {
						            //return <option key={service.Description} price={service.Price} value={service.Code}>{service.Description}</option>
						            return <option key={service.Description} value={service.Code}>{service.Description}</option>
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
						            return <option key={state.Description} value={state.Code}>{state.Description}</option>
						        })
						      }
						      </select>
									{/*<input type="text" className="form-control" id="location" ref="location"/>*/}
								</div>
                <div className="row pad-top-fixed-15">
                  Start DateTime:
									<input type="datetime-local" className="form-control" id="startDatetime" min={this.getISOStringWithoutSecsAndMillisecs1(new Date())} ref="startDatetime"/>
								</div>
                <div className="row pad-top-fixed-15">
                  Duration:
									<select className="form-control" ref="serviceDuration">
						      {
						        this.props.serviceDurations.map(function(serviceDuration) {
						            return <option key={serviceDuration.Description} value={serviceDuration.Value}>{serviceDuration.Description}</option>
						        })
						      }
						      </select>
									{/*<input type="number" className="form-control" id="duration" ref="duration"/>*/}
								</div>
								<div className="row pad-top-fixed-15">
                  Price: <p>{this.state.value}</p>
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

		var serviceRequest = {};
		serviceRequest["serviceType"] = serviceType.value;
		serviceRequest["serviceLocation"] = serviceLocation.value;
		serviceRequest["startDatetime"] = startDatetime.value;
		serviceRequest["serviceDuration"] = serviceDuration.value;

    searchForServices(serviceRequest);
  }




}

export default SearchForServices;
