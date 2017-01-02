import {Agents, ServiceType, ServiceDuration, State, CodeTable} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  /*Meteor.publish('agents.list', function () {
    const selector = {};
    const options = {
      fields: {_id: 1, title: 1},
      sort: {createdAt: -1},
      limit: 10
    };

    return Posts.find(selector, options);
  });*/

  Meteor.publish('agents.single', function (userID) {
    check(userID, String);
    const selector = {UserID: userID};
    return Agents.find(selector);
  });

  // Meteor.publish('matchmaker.codetable', function () {
  //   const selector = {};
  //   return CodeTable.find(selector);
  // });

  // Meteor.publish('matchmaker.servicetypes', function () {
  //   const selector = {Category: "ServiceType"};
  //   return CodeTable.find(selector);
  // });
  //
  // Meteor.publish('matchmaker.servicedurations', function () {
  //   const selector = {Category: "ServiceDuration"};
  //   return CodeTable.find(selector);
  // });
  //
  // Meteor.publish('matchmaker.state', function () {
  //   const selector = {Category: "Country"};
  //   return CodeTable.find(selector);
  // });

}
