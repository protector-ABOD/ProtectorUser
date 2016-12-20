import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import usersModule from './modules/users';
import paymentModule from './modules/payment';

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(usersModule);
app.loadModule(paymentModule);
app.init();

Tracker.autorun(function(){
  if(Meteor.user()){
    // login handler
	var path = FlowRouter.current().path;
	// we only do it if the user is in the login page
	if(path === "/login"){
	  //FlowRouter.go("/agent/home");
	}
  }
  else{
    // logout handler
	//console.log('b');
  }
});
