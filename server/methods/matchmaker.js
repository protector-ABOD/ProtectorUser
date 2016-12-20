import {Agents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'matchmaker.storeUsersRequestIntoDB'(userId, service_type, location, datetime, duration) {
      //insert user request into db
      //return requestId
    },
    'matchmaker.searchForMatchingAgents'(requestId) {
      //Find Agents -> Where CanProvideRequestedServiceType, IsInSameLocation, IsAvailableToWork
      //return list of agents
    },
    'matchmaker.selectAnAgent'(agentId, requestId) {
      //update request document with agentId
      //trigger notification to agent
    },
  });
}
