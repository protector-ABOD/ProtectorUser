// import AgentSummary from '../components/AgentSummary.jsx';
// import {useDeps, composeWithTracker, composeAll} from 'mantra-core';
//
// export const composer = ({context, clearErrors}, onData) => {
//   const {Meteor, Collections} = context();
//   if (Session.get("ServiceRequest")){
//     Meteor.call('matchmaker.searchForMatchingAgents', Session.get("ServiceRequest"), (err, agentList) => {
//       const singleAgent = agentList[0];
//       console.log(singleAgent);
//
//       onData(null, {singleAgent});
//
//     });
//   } else {
//     FlowRouter.go('/test/matchmaker/');
//   }
// };
//
// export const depsMapper = (context, actions) => ({
//   selectAgent: actions.matchmaker.selectAgent,
//   searchForMatchingAgents: actions.matchmaker.searchForMatchingAgents,
//   context: () => context
// });
//
// export default composeAll(
//   composeWithTracker(composer),
//   useDeps(depsMapper)
// )(AgentSummary);
