import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
require('./datepicker.css');

class SearchForServices extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {price: 0, startDate: Moment()};

		this.handleTotalPriceChange = this.handleTotalPriceChange.bind(this);
		this.handleDatePickerChange = this.handleDatePickerChange.bind(this);
  }

	handleDatePickerChange(date) {
		console.log(date);
    this.setState({
      startDate: date
    });
  }

	handleTotalPriceChange(event) {
		const selectedServiceTypeCode = ReactDOM.findDOMNode(this.refs.serviceType).value;
		const selectedDurationValue = ReactDOM.findDOMNode(this.refs.serviceDuration).value;
		if (selectedServiceTypeCode && selectedDurationValue)
		{
			const service = this.props.services.find(function (service) {
	      return service.Code === selectedServiceTypeCode;
	    });
			const totalPrice =  selectedDurationValue * service.Price;
			this.setState({price: totalPrice});
		} else {
			this.setState({price: 0});
		}
	}

	render() {
		const {error} = this.props;
		var optionHours = [];
		for (var i = 1; i <= 12; i++) {
			if (i == 12) {
				optionHours.push(<option key={i} value="0">{i}</option>);
			} else {
				optionHours.push(<option key={i} value={i}>{i}</option>);
			}
		}
		var optionMinutes = [];
		optionMinutes.push(<option key="0" value="0">00</option>);
	  optionMinutes.push(<option key="30" value="30">30</option>);
		var optionAmPm = [];
		optionAmPm.push(<option key="AM" value="AM">AM</option>);
	  optionAmPm.push(<option key="PM" value="PM">PM</option>);

		return (
			<div className="content-container align-middle">
				<div className="row">
					<header className="title"> Search For Services </header>
				</div>
				<div className="row">
					<div className="col-xs-12">
						<div className="col-xs-offset-2 col-sm-offset-3 col-sm-6 col-xs-8 col-md-offset-4 col-md-4">
							{error ? <span className="text-error">{error}</span> : <span>&nbsp;</span>}
						</div>
						<div className='col-xs-offset-2 col-xs-8 col-sm-offset-3 col-sm-6 col-md-offset-4 col-md-4 active-form'>
							<form onSubmit={this.searchForServices.bind(this)}>
								<div className="row pad-top-fixed-15">
									<select required className="form-control form-control-icon" ref="serviceType" onChange={this.handleTotalPriceChange.bind(this)}>
										<option selected="selected" disabled value="">Select a Service</option>
							      {
							        this.props.services.map(function(service) {
							            //return <option key={service.Description} price={service.Price} value={service.Code}>{service.Description}</option>
							            return <option key={service.Description} value={service.Code}>{service.Description}</option>
							        })
							      }
						      </select>
									<span className="form-control-icon fa fa-briefcase"></span>

									{/*<input type="text" className="form-control" id="serviceType" ref="serviceType"/>*/}
								</div>
								<div className="row pad-top-fixed-15">
									<select required className="form-control form-control-icon" ref="serviceLocation">
										<option selected="selected" disabled value="">Location</option>
							      {
							        this.props.states.map(function(state) {
							            return <option key={state.Description} value={state.Code}>{state.Description}</option>
							        })
							      }
						      </select>
									<span className="form-control-icon fa fa-map-marker fa-lg"></span>
								</div>
                <div className="row pad-top-fixed-15">
									<DatePicker selected={this.state.startDate} minDate={Moment()} onChange={this.handleDatePickerChange.bind(this)} className="form-control form-control-icon" ref="startDate" />
									<span className="form-control-icon fa fa-calendar"></span>
								</div>
								<div className="row pad-top-fixed-15">
									<div className="timepicker">
										<select className="form-control col-xs-4" ref="startHour" defaultValue={Moment().format("h")}>
											{optionHours}
							      </select>
										<select className="form-control col-xs-4" ref="startMinutes" defaultValue="30">
							      	{optionMinutes}
							      </select>
										<select className="form-control col-xs-4" ref="startAmPm" defaultValue={Moment().format("A")}>
							      	{optionAmPm}
							      </select>
									</div>
								</div>
                <div className="row pad-top-fixed-15">
									<select required className="form-control form-control-icon" ref="serviceDuration" onChange={this.handleTotalPriceChange.bind(this)}>
										<option selected="selected" disabled value="">Duration</option>
							      {
							        this.props.serviceDurations.map(function(serviceDuration) {
							            return <option key={serviceDuration.Description} value={serviceDuration.Value}>{serviceDuration.Description}</option>
							        })
							      }
						      </select>
									<span className="form-control-icon fa fa-clock-o fa-lg"></span>
								</div>
								<div className="row pad-top-fixed-15">
									<span className="pull-left">Estimated Charges:</span> <br />
                  <span className="pull-left currency">{CURRENT_CURRENCY}</span>
									<p className="pull-right price">{this.state.price}</p>
								</div>
								<div className="row pad-top-fixed-15">
									<button type="submit" className="btn btn-success btn-100">Search</button>
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
    const {serviceType, serviceLocation, startDate, startHour, startMinutes, startAmPm, serviceDuration} = this.refs;

		var serviceRequest = {};
		serviceRequest["serviceType"] = serviceType.value;
		serviceRequest["serviceLocation"] = serviceLocation.value;

		const computedHour = startAmPm.value == "AM" ? startHour.value : +startHour.value + 12;
		serviceRequest["startDateTime"] = this.state.startDate.startOf('day').add(computedHour, 'h').add(startMinutes.value, 'm').toDate();

		serviceRequest["serviceDuration"] = serviceDuration.value;
		serviceRequest["serviceCountry"] = this.props.country.Code;

    searchForServices(serviceRequest);
  }




}

export default SearchForServices;
