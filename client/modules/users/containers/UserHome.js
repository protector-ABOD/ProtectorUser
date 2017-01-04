import React from 'react';
import UserHome from '../components/UserHome.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('userprofile.existingUser', Meteor.userId()).ready()) {
    const userprofile = Collections.UserProfile.findOne({User_ID: Meteor.userId()});

    if(!userprofile || userprofile.Full_Name.trim() === ""){
      Meteor.call('users.createProfile', Meteor.userId());
      FlowRouter.go("/user/profile");
    }
    else{
      FlowRouter.go("/services/search");
    }
    onData(null, {userprofile});
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);
  
export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserHome);
