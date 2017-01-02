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
}
