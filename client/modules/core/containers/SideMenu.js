import React from 'react';
import SideMenu from '../components/SideMenu.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (!Meteor.userId()) {
    FlowRouter.go('/login');
  }

  if (Meteor.subscribe('userprofile.existingUser').ready()) {
    const userprofile = Collections.UserProfile.findOne({User_ID: Meteor.userId()});

    if(!userprofile){
      FlowRouter.go("/user/profile");
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
)(SideMenu);
