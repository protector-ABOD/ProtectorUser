import RequestAgent from '../components/RequestAgent.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('ERROR');
  onData(null, {error});

  // clearErrors when unmounting the component
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  storeUsersRequestIntoDB: actions.matchmaker.storeUsersRequestIntoDB,
  searchForMatchingAgents: actions.matchmaker.searchForMatchingAgents,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RequestAgent);
