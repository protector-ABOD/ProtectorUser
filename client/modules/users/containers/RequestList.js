import RequestList from '../components/RequestList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('user.requests').ready()
    && Meteor.subscribe('user.requestListAgents').ready()) {
      console.log(Collections.Agents.find());
    const serviceRequestList = Collections.ServiceRequest.find({},{
      transform: function (doc) {
        if (doc.Agent_ID ) {
          const agent = Collections.Agents.findOne({ _id: doc.Agent_ID });
          if (agent) {
  					doc.Agent = agent;
  				}
        }
        return doc;
      }
    }).fetch();
    // var clientServiceRequest = new Mongo.Collection('clientServiceRequest');
    // const serviceRequestList = clientServiceRequest.find().fetch();
    // console.log(serviceRequestList);

    onData(null, {serviceRequestList});
  } else {
    onData();
  }
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
