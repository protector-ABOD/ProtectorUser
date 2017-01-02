import React from 'react';
import ReactDOM from 'react-dom';

class UserHome extends React.Component {
	render() {
		const {userprofile} = this.props;
		// Just render a placeholder container that will be filled in
		return (
			<div id="user-profile-container">
				<div className="content-container agent-application">
					<label>Hi {userprofile.Full_Name}</label>
				</div>
			</div>
		)
	}
}

export default UserHome;
