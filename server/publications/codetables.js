import {CodeTable} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('CodeTable.Bank', function () {
    return CodeTable.find({Category: "Bank"});
  });

  Meteor.publish('matchmaker.codetable', function () {
    const selector = {};
    return CodeTable.find(selector);
  });

  Meteor.publish('codeTables.all', function () {
  	const selector = {};
  	return CodeTable.find(selector);
  });
  //get all codetable - country
  Meteor.publish('codeTables.country', function () {
    const selector = {Category : "Country"};
    return CodeTable.find(selector);
  });
  //get all codetable - serviceType
  Meteor.publish('codeTables.serviceType', function () {
    const selector = {Category : "ServiceType"};
    return CodeTable.find(selector);
  });
}
