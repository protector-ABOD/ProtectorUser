export default {
  clearErrors({LocalState}) {
    return LocalState.set('ERROR', null);
  },
  searchForServices({Meteor, LocalState}, service_type, location, datetime, duration) {
    //
    Meteor.call('matchmaker.searchForServices', service_type, location, datetime, duration, (err, response) => {
      if (err) {
        return LocalState.set('ERROR', err.message);
      }
      if(response._idNew){
        FlowRouter.go('/test/' + response._idNew);
      }
    })
  },
  selectAgent({Meteor, LocalState}) {
    //
    Meteor.call('matchmaker.selectAgent', agentId, requestId, (err, response) => {
      if (err) {
        return LocalState.set('ERROR', err.message);
      }
      if(response._idNew){
        FlowRouter.go('/test/' + response._idNew);
      }
    })
  }
};
