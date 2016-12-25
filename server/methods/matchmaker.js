import {Agents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'matchmaker.searchForServices'(service_type, location, datetime, duration) {
      check(service_type, String);
      check(location, String);
      check(datetime, String);
      check(duration, String);
      console.log(service_type, location, datetime, duration);
      var serviceRequestId = Meteor.call("matchmaker.storeUsersRequestIntoDB", service_type, location, datetime, duration);
      var agents = Meteor.call("matchmaker.searchForMatchingAgents", serviceRequestId);
      console.log(agents);
      return 123;
      //insert user request into db
      //return requestId
    },
    'matchmaker.storeUsersRequestIntoDB'(service_type, location, datetime, duration) {
      console.log("storeUsersRequestIntoDB");
      check(service_type, String);
      check(location, String);
      check(datetime, String);
      check(duration, String);

      console.log(service_type, location, datetime, duration);
      return 123;
      //insert user request into db
      //return requestId
    },
    'matchmaker.searchForMatchingAgents'(serviceRequestId) {
      check(serviceRequestId, Number);
      const agents = Agents.find().fetch();
      return agents;
      //Find Agents -> Where CanProvideRequestedServiceType, IsInSameLocation, IsAvailableToWork
      //return list of agents
    },
    'matchmaker.selectAnAgent'(agentId, requestId) {
      //update request document with agentId
      //trigger notification to agent
    },
  });
}
