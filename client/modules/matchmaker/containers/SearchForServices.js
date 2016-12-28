import SearchForServices from '../components/SearchForServices.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('matchmaker.codetable').ready()) {
    const services = Collections.CodeTable.findOne({Category: "ServiceType"}).ValueList;
    const serviceDurations = Collections.CodeTable.findOne({Category: "ServiceDuration"}).ValueList;
    const country = Collections.CodeTable.findOne({Category: "Country"}).ValueList;
    const states = country[0].States;
    console.log(services);
    console.log(serviceDurations);
    console.log(country);
    console.log(states);
    onData(null, {services, serviceDurations, states});
  } else {
    onData();
  }
};

export const depsMapper = (context, actions) => ({
  searchForServices: actions.matchmaker.searchForServices,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(SearchForServices);
