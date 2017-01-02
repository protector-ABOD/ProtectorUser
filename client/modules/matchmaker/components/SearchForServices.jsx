import React from 'react';
import ReactDOM from 'react-dom';

class SearchForServices extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {price: 0};

		this.handleServiceTypeChange = this.handleServiceTypeChange.bind(this);
		this.handleTotalPriceChange = this.handleTotalPriceChange.bind(this);
  }

	handleServiceTypeChange(event) {
		console.log(event.target);
		console.log(this.props.services);
		const price = this.props.services.find(function (service) {
      return service.Code === event.target.value;
    }).Price;
		const totalPrice = ReactDOM.findDOMNode(this.refs.serviceDuration).value * price;
		console.log(totalPrice);


		this.setState({price: totalPrice});

	    //this.setState({[e.target.name] : e.target.value});
	}

	handleTotalPriceChange(event) {
		console.log(this.props.services);
		const selectedServiceTypeCode = ReactDOM.findDOMNode(this.refs.serviceType).value;
		const price = this.props.services.find(function (service) {
      return service.Code === selectedServiceTypeCode;
    }).Price;
		const totalPrice = ReactDOM.findDOMNode(this.refs.serviceDuration).value * price;
		console.log(totalPrice);


		this.setState({price: totalPrice});

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

									<select className="form-control" ref="serviceType" onChange={this.handleTotalPriceChange.bind(this)}>
										<option value=''>Select...</option>
						      {
						        this.props.services.map(function(service) {
						            return <option key={service.Description} price={service.Price} value={service.Code}>{service.Description}</option>
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
									<select className="form-control" ref="serviceDuration" onChange={this.handleTotalPriceChange.bind(this)}>
						      {
						        this.props.serviceDurations.map(function(serviceDuration) {
						            return <option key={serviceDuration.Description} value={serviceDuration.Value}>{serviceDuration.Description}</option>
						        })
						      }
						      </select>
									{/*<input type="number" className="form-control" id="duration" ref="duration"/>*/}
								</div>
								<div className="row pad-top-fixed-15">
                  Price: <p>{CURRENT_CURRENCY + " " + this.state.price}</p>
									{/*<input type="number" className="form-control" id="duration" ref="duration"/>*/}
								</div>
								<div className="row pad-top-fixed-15">
									<button type="submit" className="btn btn-success btn-100">Search For Services</button>
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
		console.log(this.props.country.Code);
		serviceRequest["serviceCountry"] = this.props.country.Code;

    searchForServices(serviceRequest);
  }




}

export default SearchForServices;
