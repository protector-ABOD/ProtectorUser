import RequestAgent from '../components/RequestAgent.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('matchmaker.servicetypes').ready() &&
  Meteor.subscribe('matchmaker.servicedurations').ready() &&
  Meteor.subscribe('matchmaker.state').ready()) {
    const services = Collections.ServiceType.find().fetch();
    const serviceDurations = Collections.ServiceDuration.find().fetch();
    const states = Collections.State.find().fetch();
    onData(null, {services, serviceDurations, states});
  } else {
    onData();
  }
};

export const depsMapper = (context, actions) => ({
  searchForServices: actions.matchmaker.searchForServices,
  selectAgent: actions.matchmaker.selectAgent,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RequestAgent);
