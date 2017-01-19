import React from 'react';
import SideMenu from '../containers/SideMenu.js' ;

var Menu = require('react-burger-menu').push;


const sideMenuStyle = {
  cursor: 'pointer'
};

const profileLineStyle = {
  'padding-top': '15px'
};

class Layout extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = { isSideMenuOpen: false }

  }


	handleClickSideMenu(state){
		// console.log(this.state.isSideMenuOpen);
		if (!this.state.isSideMenuOpen) {
			this.setState({isSideMenuOpen: true});
		} else {
			this.setState({isSideMenuOpen: false});
		}
	}

  componentWillReceiveProps(nextProps) {
    //close side menu when page changes.
    JSON.stringify(this.props.content()) !== JSON.stringify(nextProps.content())
    {
      this.setState({isSideMenuOpen: false});
    }
  }

	render() {
		return (
			<div id="outer-container">
				<img src="/images/profile_line.jpg" id="profile-line" alt=""/>
				<div id="page-wrap">

					<div id="profile-nav">


						<img id="profile_nav_img2" src="/images/profile_logo.png" />


					</div>


				  <div className="main-container">

					{this.props.content()}
				  </div>
				</div>
		  </div>
		)
	}
}




export default Layout;
