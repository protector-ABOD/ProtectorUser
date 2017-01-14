import {Agents, ServiceRequest, CodeTable, UserProfile} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'matchmaker.storeUsersRequestIntoDB'(serviceRequest, agent) {
      check(serviceRequest, Object);
      check(agent, Object);

      //count total price at service side to prevent user manipulating data
      const servicePriceList = CodeTable.findOne({Category: "ServiceType"},{"ValueList.Code": 1, "ValueList.Price": 1});
      const servicePricePerHour = servicePriceList.ValueList.find(function (service) {
        return service.Code === serviceRequest.serviceType;
      }).Price;
      const totalPrice = serviceRequest.serviceDuration * servicePricePerHour;

      var Service_Request = {};
      Service_Request["Service_Type_Code"] = serviceRequest.serviceType;
      Service_Request["Service_State_Code"] = serviceRequest.serviceLocation;
      Service_Request["Service_Start_Time"] = serviceRequest.startDatetime;
      Service_Request["Service_Duration_Value"] = serviceRequest.serviceDuration;
      Service_Request["Service_Country_Code"] = serviceRequest.serviceCountry;
      Service_Request["Service_Per_Hour_Price"] = servicePricePerHour;
      Service_Request["Service_Total_Price"] = totalPrice;
      const serviceRequestId = ServiceRequest.insert({
        User_ID: this.userId,
        Agent_ID: agent._id,
        Service_Request: Service_Request,
        Service_Request_Status: "Pending",
        Service_Comment: "",
        Service_Rating: 0,
        Active_Status:1,
        Created_By: this.userId,
        Created_DateTime: new Date(),
        Last_Edited_By: this.userId,
        Last_Edited_DateTime:new Date()
      });

      return { serviceRequestId };
    },
    //Find Agents -> Where CanProvideRequestedServiceType, IsInSameLocation, IsAvailableToWork
    'matchmaker.searchForMatchingAgents'(serviceRequest) {
      check(serviceRequest, Object);

      console.log(serviceRequest);


      //populate variables
      var request = new Object();
      var rejectList;
      if ( serviceRequest._id ) {
        const result = ServiceRequest.findOne({ _id: serviceRequest._id });
        request = result.Service_Request;
        rejectList = result.Agents_Rejected.map(function(agent) {
          return agent.Agent_ID;
        });
      } else {
        request.Service_Type_Code = serviceRequest.serviceType;
        request.Service_State_Code = serviceRequest.serviceLocation;
        request.Service_Start_Time = serviceRequest.startDatetime;
        request.Service_Duration_Value = serviceRequest.serviceDuration;
      }

      //filter only with specific skills
      var selector = {};
      if (request.Service_Type_Code === SERVICETYPE_CODE_ARMED_SECURITY_FORCE) {
        selector['Skills'] = {$elemMatch: {SkillID:SKILLID_FIREARM, Proficiency: "Yes"}};
      }

      //filter out rejected agents
      if (rejectList) {
        selector['_id'] = {$nin: rejectList};
      }

      //return list of agents
      const agents = Agents.find(selector).fetch();
      return agents;

    },
    'matchmaker.requestForAgent'(serviceRequest, agent, userId) {
      check(userId, String);
      check(serviceRequest, Object);
      check(agent, Object);

      //insert or update request document with agentId
      if (serviceRequest._id) {
        const serviceRequestId = Meteor.call("matchmaker.updateUsersRequest", serviceRequest, agent);
      } else {
        const serviceRequestId = Meteor.call("matchmaker.storeUsersRequestIntoDB", serviceRequest, agent);
      }

  	  //find user profile to get the name
  	  const userProfile = UserProfile.findOne({ User_ID : userId});

  	  //if user profile is found, push notification to agent
  	  if (userProfile) {
    		Push.send({
    			from: 'push',
    			title: 'New Request',
    			text: userProfile.Full_Name + ' has requested for your service.',
    			badge: 1,
    			query: {userId : serviceRequest.Agent_ID},
    			payload: {
    				title: 'New Request'
    			}
    		});
  	  }
    },
    'matchmaker.updateUsersRequest'(serviceRequest, agent) {
      check(serviceRequest, Object);
      check(agent, Object);
      ServiceRequest.update(serviceRequest._id, {
        $set: {
          Service_Request_Status : "Pending",
          Agent_ID : agent._id,
          Last_Edited_By: this.userId,
          Last_Edited_DateTime: new Date(),
        }
      });
    },

  });
}
