import React from 'react';
var Menu = require('react-burger-menu').slide;


const sideMenuStyle = {
  cursor: 'pointer'
};

const profileLineStyle = {
  'padding-top': '15px'
};

class SideMenu extends React.Component {
	constructor(props, context) {
		super(props, context);
  }

	render() {

		return (
				<Menu isOpen={ this.props.isOpen } pageWrapId={ "page-wrap"} outerContainerId={ "outer-container" } customBurgerIcon={ false } customCrossIcon={ false }>
						<div className="portrait-container">
							<img className="menu-portrait" src="http://lorempixel.com/200/200" />
							<span>{this.props.userprofile.Full_Name}</span>
						</div>
						<a id="payment-info" className="menu-item" href="/"><i className="fa fa-fw fa-credit-card-alt" /><span>Payment Info</span></a>
						<a id="requests" className="menu-item" href="/requests"><i className="fa fa-fw fa-clock-o" /><span>Requests</span></a>
						<a id="favourite" className="menu-item" href="/"><i className="fa fa-fw fa-star" /><span>Favorite</span></a>
						<a id="scheduled" className="menu-item" href="/"><i className="fa fa-fw fa-calendar" /><span>Scheduled</span></a>
						<a id="notification" className="menu-item" href="/"><i className="fa fa-fw fa-bell" /><span>Notication</span></a>
						<a id="signout" className="menu-item" href="/logout"><i className="fa fa-fw fa-sign-out" /><span>Sign Out</span></a>
				</Menu>
		)
	}
}




export default SideMenu;
