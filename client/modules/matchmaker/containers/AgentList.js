import AgentList from '../components/AgentList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context();

  //checking
  if (!Session.get("ServiceRequest")) {
    FlowRouter.go('/services/search');
  }
  //search agents
  if (Session.get("ServiceRequest")){
    Meteor.call('matchmaker.searchForMatchingAgents', Session.get("ServiceRequest"), (err, agentList) => {
      onData(null, {agentList});
    });
  }

};

export const depsMapper = (context, actions) => ({
  selectAgent: actions.matchmaker.selectAgent,
  searchForMatchingAgents: actions.matchmaker.searchForMatchingAgents,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(AgentList);
