import {ServiceRequest, Agents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('user.requests', function () {
    // var pipeline = [
    //   {
    //     $lookup:
    //       {
    //         from: "Agent",
    //         localField: "Agent_ID",
    //         foreignField: "_id",
    //         as: "Agent"
    //       }
    //   },
    //   {
    //     $match:
    //       {
    //         User_ID: this.userId
    //       }
    //   },
    //   {
    //     $project: { _id: "$"+Random.id() }
    //   }
    // ];
    // ReactiveAggregate(this, ServiceRequest, pipeline, {clientCollection: "clientServiceRequest"});

    var selector = {User_ID: this.userId};
    //return list of service requests under user
    return ServiceRequest.find(selector);
  });

  Meteor.publish('user.requestListAgents', function () {
      //want to get all distinct agents. doesnt seem to work.
      var userAgents = _.uniq(ServiceRequest
                        .find({User_ID: this.userId}, {fields: {Agent_ID: true}})
                        .map(function(x) { return x.Agent_ID }), true);

      const selector = { _id: { $in: userAgents } };
      const projection = {fields: {FullName: true}};
      var userRequestListAgents = Agents.find(selector, projection);
      //return list of agents under user
      return userRequestListAgents;
  });

}
