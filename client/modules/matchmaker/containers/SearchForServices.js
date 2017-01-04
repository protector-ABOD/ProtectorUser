import React from 'react';
import SearchForServices from '../components/SearchForServices.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('matchmaker.codetable').ready()) {
    const services = Collections.CodeTable.findOne({Category: "ServiceType"}).ValueList;
    const serviceDurations = Collections.CodeTable.findOne({Category: "ServiceDuration"}).ValueList;
    const countries = Collections.CodeTable.findOne({Category: "Country"}).ValueList;
    const states = countries.find(function (country) {
      return country.Code === COUNTRY_CODE_MALAYSIA;
    }).States;

    onData(null, {services, serviceDurations, states});
  } else {
    onData();
  }
};

export const depsMapper = (context, actions) => ({
  searchForServices: actions.matchmaker.searchForServices,
  context: () => context
});

const loadingScreen = () => (<div className="loading-panel">Loading...</div>);
  
export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SearchForServices);
