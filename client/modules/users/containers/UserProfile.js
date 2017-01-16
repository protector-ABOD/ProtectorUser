import React from 'react';
import UserProfile from '../components/UserProfile.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('userprofile.existingUser').ready()) {
    const userprofile = Collections.UserProfile.findOne({User_ID: Meteor.userId()});
      if (Meteor.subscribe('CodeTable.Bank').ready()) {
      const banks = Collections.CodeTable.findOne({Category: "Bank"}).ValueList;
      onData(null, {banks, userprofile});
    }
  }
};

export const depsMapper = (context, actions) => ({
  updateProfile: actions.users.updateProfile,
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(UserProfile);
