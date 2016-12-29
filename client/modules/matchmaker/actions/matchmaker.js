export default {
  clearErrors({LocalState}) {
    return LocalState.set('ERROR', null);
  },
  searchForServices({Meteor, LocalState}, serviceRequest) {
    Session.set("ServiceRequest", serviceRequest);
    FlowRouter.go('/test/matchmaker/selection');
    //
    // Meteor.call('matchmaker.searchForServices', serviceRequest, (err, response) => {
    //   console.log(response);
    //
    //   if (err) {
    //     return LocalState.set('ERROR', err.message);
    //   }
    //   if(response.serviceRequestId){
    //     FlowRouter.go('/test/matchmaker/' + response.serviceRequestId._str);
    //   }
    // })
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
  selectAgent({Meteor, LocalState}) {
    //
    Meteor.call('matchmaker.selectAgent', agentId, requestId, (err, response) => {
      console.log(response);
      if (err) {
        return LocalState.set('ERROR', err.message);
      }
      if(response._idNew){
        FlowRouter.go('/test/' + response._idNew);
      }
    })
  }
};
