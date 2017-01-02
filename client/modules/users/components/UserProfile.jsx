import React from 'react';
import ReactDOM from 'react-dom';
import {Template} from 'meteor/templating';
import {Blaze} from 'meteor/blaze';

class UserProfile extends React.Component {
	render() {
		const {banks, userprofile} = this.props;
		// Just render a placeholder container that will be filled in
		return (
			<div id="user-profile-container">
				<div className="content-container agent-application">
					<form onSubmit={this.updateProfile.bind(this)}>
						<label>Personal Information</label>
						<br />
						<br />
						<div className="form-group">
							<label htmlFor="fullName">Full Name</label>
							<input type="text" className="form-control" id="fullName" ref="fullName" defaultValue={userprofile.Full_Name} />
						</div>
						<div className="form-group">
							<label htmlFor="NRIC">IC Number</label>
							<input type="text" className="form-control" id="NRIC" ref="NRIC" defaultValue={userprofile.NRIC}/>
						</div>
						<div className="form-group">
							<label htmlFor="contactNumber">Contact Number</label>
							<input type="text" className="form-control" id="contactNumber" ref="contactNumber" defaultValue={userprofile.Contact_Number}/>
						</div>
						<div className="col-xs-12 no-pad">
							<label htmlFor="gender">Gender</label>
						</div>
						<div className="col-xs-12 no-pad">
							<select ref="gender" defaultValue={userprofile.Gender} className="protector-select">
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>
						<hr />
						<label>Credit Card Information</label>
						<br />
						<br />
						<div className="form-group">
							<label htmlFor="CreditCardIssuedBank">Credit Card Issued Bank</label>
							<select ref="banks" className="protector-select" defaultValue={userprofile.Credit_Card[0].Bank}>
								{banks.map(bank => (
									<option key={bank.Code} value={bank.Description}>{bank.Description}</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="creditCardNumber">Credit Card Number</label>
							<input type="text" className="form-control" id="creditCardNumber" ref="creditCardNumber" maxLength={16} defaultValue={userprofile.Credit_Card[0].Card_Number}/>
						</div>
						<div className="form-group">
							<label htmlFor="CreditCardExpiryDate">Credit Card Expiry Date</label>
							<div className="row">
								<div className="col-xs-3 align-middle">
									<input type="text" className="form-control" id="expiryMonth" maxLength={2}  ref="expiryMonth" placeholder="Month" defaultValue={userprofile.Credit_Card[0].Expiry_Month}/>
								</div>
								<div className="col-xs-3 align-middle">
									<input type="text" className="form-control" id="expiryYear" maxLength={2} ref="expiryYear" placeholder="Year" defaultValue={userprofile.Credit_Card[0].Expiry_Year}/>
								</div>
							</div>
						</div>
						<br />
						<div className="form-group align-middle">
							<button type="submit" className="btn btn-success btn-100">Save</button>
						</div>
					    <br />
					</form>
				</div>
			</div>
		)
	}
	updateProfile(event){
		if(event && event.preventDefault){
			event.preventDefault();
		}

		//get action
		//const {updateProfile, OriginalCreditCardInfo} = this.props;
		const {updateProfile, userprofile} =  this.props;
		const OriginalCreditCardInfo = userprofile.Credit_Card[0];

		//get all data
		const {fullName, NRIC, gender, contactNumber, banks, creditCardNumber, expiryMonth, expiryYear} = this.refs;

		//input validation
		let isError = false;

		//full name
		const fullNameClassName = fullName.className;
		if(fullName.value.trim() === "") {
			if(!fullNameClassName.includes("input-errorr")){
				fullName.className = fullNameClassName + " input-error";
			}
			isError = true;
		}
		else{
			if(fullNameClassName.includes("input-error")){
				fullName.className = fullNameClassName.replace(" input-error", "");
			}
		}

		//NRIC
		const NRICClassName = NRIC.className;
		if(NRIC.value.trim() === "") {
			if(!NRICClassName.includes("input-errorr")){
				NRIC.className = NRICClassName + " input-error";
			}
			isError = true;
		}
		else{
			if(NRICClassName.includes("input-error")){
				NRIC.className = NRICClassName.replace(" input-error", "");
			}
		}

		//Contact Number
		const contactNumberClassName = contactNumber.className;
		if(contactNumber.value.trim() === "") {
			if(!contactNumberClassName.includes("input-errorr")){
				contactNumber.className = contactNumberClassName + " input-error";
			}
			isError = true;
		}
		else{
			if(contactNumberClassName.includes("input-error")){
				contactNumber.className = contactNumberClassName.replace(" input-error", "");
			}
		}

		//Credit Card Number
		const creditCardNumberClassName = creditCardNumber.className;
		if(creditCardNumber.value.trim() === "") {
			if(!creditCardNumberClassName.includes("input-errorr")){
				creditCardNumber.className = creditCardNumberClassName + " input-error";
			}
			isError = true;
		}
		else{
			if(creditCardNumberClassName.includes("input-error")){
				creditCardNumber.className = creditCardNumberClassName.replace(" input-error", "");
			}
		}

		//Credit Card Expiry Date
		const expiryMonthClassName = expiryMonth.className;
		const expiryYearClassName = expiryYear.className;
		//Expiry Date is Empty
		if(expiryMonth.value.trim() === "" || expiryYear.value.trim() === ""){
			if(expiryMonth.value.trim() === "") {
				if(!expiryMonthClassName.includes("input-errorr")){
					expiryMonth.className = expiryMonthClassName + " input-error";
				}
				isError = true;
			}
			else{
				if(expiryMonthClassName.includes("input-error")){
					expiryMonth.className = expiryMonthClassName.replace(" input-error", "");
				}
			}		
			if(expiryYear.value.trim() === "") {
				if(!expiryYearClassName.includes("input-errorr")){
					expiryYear.className = expiryYearClassName + " input-error";
				}
				isError = true;
			}
			else{
				if(expiryYearClassName.includes("input-error")){
					expiryYear.className = expiryYearClassName.replace(" input-error", "");
				}
			}
		}

		//Expiry Date not Empty
		else{
			if(expiryMonth.value < 1 || expiryMonth.value > 12){
				if(!expiryMonthClassName.includes("input-errorr")){
					expiryMonth.className = expiryMonthClassName + " input-error";
				}
				isError = true;
			}
			else{
				if(expiryMonthClassName.includes("input-error")){
					expiryMonth.className = expiryMonthClassName.replace(" input-error", "");
				}
			}
			if(expiryYearClassName.includes("input-error")){
				expiryYear.className = expiryYearClassName.replace(" input-error", "");
			}
		}

		if (isError) {
			return;
		}

		var proceedSave = true;
		if(	OriginalCreditCardInfo.Bank != banks.value ||
			OriginalCreditCardInfo.Card_Number != creditCardNumber.value ||
			OriginalCreditCardInfo.Expiry_Month != expiryMonth.value ||
			OriginalCreditCardInfo.Expiry_Year != expiryYear.value
		){
			//Do Credit Card Verification
			console.log("Do Credit Card Checking");
			var a = prompt("Give a reason");
			console.log(a);
			proceedSave = true;
		}
		
		if(proceedSave){
			//save data
			var userProfile = {};
			userProfile["fullName"] = fullName.value;
			userProfile["NRIC"] = NRIC.value;
			userProfile["gender"] = gender.value;
			userProfile["contactNumber"] = contactNumber.value;
			userProfile["creditCardIssuedBank"] = banks.value;
			userProfile["creditCardNumber"] = creditCardNumber.value;
			userProfile["expiryMonth"] = expiryMonth.value;
			userProfile["expiryYear"] = expiryYear.value;

			updateProfile(userProfile);
		}
	}
}

export default UserProfile;
