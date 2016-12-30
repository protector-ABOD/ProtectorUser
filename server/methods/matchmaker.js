import {Agents, ServiceRequest} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'matchmaker.searchForServices'(serviceRequest) {
      check(serviceRequest, Object);

      console.log(serviceRequest);
      const serviceRequestId = Meteor.call("matchmaker.storeUsersRequestIntoDB", serviceRequest);
      console.log(serviceRequestId);

      //var agents = Meteor.call("matchmaker.searchForMatchingAgents", serviceRequestId);
      //console.log(agents);
      return serviceRequestId;
      //insert user request into db
      //return requestId
    },
    'matchmaker.storeUsersRequestIntoDB'(serviceRequest, agent) {
      console.log("storeUsersRequestIntoDB");
      console.log(serviceRequest);
      check(serviceRequest, Object);
      check(agent, Object);
      var Service_Request = {};
      Service_Request["Service_Type_Code"] = serviceRequest.serviceType;
      Service_Request["Service_State_Code"] = serviceRequest.serviceLocation;
      Service_Request["Service_Start_Time"] = serviceRequest.startDatetime;
      Service_Request["Service_Duration_Value"] = serviceRequest.serviceDuration;
      console.log(Service_Request);
      console.log(agent);

      const serviceRequestId = ServiceRequest.insert({
        User_ID: "2TSMogoapzapHYMx8", //todo: change to use meteor logged in user
        Agent_ID: agent._id,
        Service_Request: Service_Request,
        Service_Request_Status: "Pending",
        Service_Comment: "",
        Service_Rating: 0,
        Active_Status:1,
        Created_By:2,
        Created_DateTime: new Date(),
        Last_Edited_By:2,
        Last_Edited_DateTime:new Date()
      });

      return { serviceRequestId };
      //insert user request into db
      //return requestId
    },
    'matchmaker.searchForMatchingAgents'(serviceRequest) {
      check(serviceRequest, Object);
      const agents = Agents.find().fetch();
      return agents;
      //Find Agents -> Where CanProvideRequestedServiceType, IsInSameLocation, IsAvailableToWork
      //return list of agents
    },
    'matchmaker.requestForAgent'(serviceRequest, agent) {
      check(serviceRequest, Object);
      check(agent, Object);
      //insert request document with agentId
      const serviceRequestId = Meteor.call("matchmaker.storeUsersRequestIntoDB", serviceRequest, agent);

      //trigger notification to agent
    },
  });
}
