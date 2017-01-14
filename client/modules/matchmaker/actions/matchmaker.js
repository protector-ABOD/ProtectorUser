export default {
  clearErrors({LocalState}) {
    return LocalState.set('ERROR', null);
  },
  searchForServices({Meteor, LocalState}, serviceRequest) {
    Session.set("ServiceRequest", serviceRequest);
    FlowRouter.go('/services/agent-listing');
  },
  searchForMatchingAgentsByRequestID({Meteor, LocalState}, _id) {
    //
    Session.set("ServiceRequest", _id);
    FlowRouter.go('/services/agent-listing');
  },
  requestForAgent({Meteor, LocalState}, serviceRequest, agent) {
    //
    Meteor.call('matchmaker.requestForAgent', serviceRequest, agent, Meteor.userId(), (err, response) => {
      console.log(response);
      if (err) {
        return LocalState.set('ERROR', err.message);
      }
    })
  },
  navigationAfterConfirm({Meteor, LocalState}) {

    //temporarily redirect to search, services/requests not ready
    FlowRouter.go('/requests');
  }
};
