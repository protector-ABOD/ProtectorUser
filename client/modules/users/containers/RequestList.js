import RequestList from '../components/RequestList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context();
  Meteor.call('users.getServiceRequests', (err, serviceRequestList) => {
    console.log(serviceRequestList);
    onData(null, {serviceRequestList});
  });
};

export const depsMapper = (context, actions) => ({
  // selectAgent: actions.matchmaker.selectAgent,
  // searchForMatchingAgents: actions.matchmaker.searchForMatchingAgents,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RequestList);
