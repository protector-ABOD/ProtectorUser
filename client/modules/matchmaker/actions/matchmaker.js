export default {
  clearErrors({LocalState}) {
    return LocalState.set('ERROR', null);
  },
  searchForServices({Meteor, LocalState}, serviceRequest) {
    Session.set("ServiceRequest", serviceRequest);
    FlowRouter.go('/services/agent-listing');
  },
  searchForMatchingAgents({Meteor, LocalState}, _id) {
    //
    Meteor.call('matchmaker.searchForMatchingAgents', _id, (err, response) => {
      console.log(response);
      if (err) {
        return LocalState.set('ERROR', err.message);
      }
      return response;
    })
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
    //
    console.log("redirected to services/requests");
    //temporarily redirect to search, services/requests not ready
    FlowRouter.go('/services/search');
  }
};
