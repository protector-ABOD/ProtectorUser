export default {
  clearErrors({LocalState}) {
    return LocalState.set('ERROR', null);
  },
  storeUsersRequestIntoDB({Meteor, LocalState}, emailVar, passwordVar) {
    //
  },
  searchForMatchingAgents({Accounts, LocalState}, emailVar, passwordVar) {
    //
  },
  selectAnAgent({Meteor, LocalState}) {
    //
  }
};
