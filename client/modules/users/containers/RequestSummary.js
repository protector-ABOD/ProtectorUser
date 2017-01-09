import RequestSummary from '../components/RequestSummary.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context();

  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  // requestForAgent: actions.matchmaker.requestForAgent,
  // navigationAfterConfirm: actions.matchmaker.navigationAfterConfirm,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RequestSummary);
