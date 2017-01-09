import {Agents, ServiceRequest, CodeTable, UserProfile} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'matchmaker.storeUsersRequestIntoDB'(serviceRequest, agent) {
      check(serviceRequest, Object);
      check(agent, Object);
      var Service_Request = {};
      Service_Request["Service_Type_Code"] = serviceRequest.serviceType;
      Service_Request["Service_State_Code"] = serviceRequest.serviceLocation;
      Service_Request["Service_Start_Time"] = serviceRequest.startDatetime;
      Service_Request["Service_Duration_Value"] = serviceRequest.serviceDuration;
      Service_Request["Service_Country_Code"] = serviceRequest.serviceCountry;
      Service_Request["Service_Per_Hour_Price"] = serviceRequest.servicePerHourPrice;
      Service_Request["Service_Total_Price"] = serviceRequest.serviceTotalPrice;
      const serviceRequestId = ServiceRequest.insert({
        User_ID: this.userId,
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
    },
    //Find Agents -> Where CanProvideRequestedServiceType, IsInSameLocation, IsAvailableToWork
    'matchmaker.searchForMatchingAgents'(serviceRequest) {
      check(serviceRequest, Object);

      //add queries
      var selector = {};
      if (serviceRequest.serviceType === SERVICETYPE_CODE_ARMED_SECURITY_FORCE) {
        selector['Skills'] = {$elemMatch: {SkillID:SKILLID_FIREARM, Proficiency: "Yes"}};
      }

      //return list of agents
      const agents = Agents.find(selector).fetch();
      return agents;

    },
    'matchmaker.requestForAgent'(serviceRequest, agent, userId) {
      check(userId, String);
      check(serviceRequest, Object);
      check(agent, Object);

      //count total price at service side to prevent user manipulating data
      const servicePriceList = CodeTable.findOne({Category: "ServiceType"},{"ValueList.Code": 1, "ValueList.Price": 1});
      const servicePricePerHour = servicePriceList.ValueList.find(function (service) {
        return service.Code === serviceRequest.serviceType;
      }).Price;
      serviceRequest["servicePerHourPrice"] = servicePricePerHour;

      const totalPrice = serviceRequest.serviceDuration * servicePricePerHour;
      serviceRequest["serviceTotalPrice"] = totalPrice;

      //insert request document with agentId
      const serviceRequestId = Meteor.call("matchmaker.storeUsersRequestIntoDB", serviceRequest, agent);

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
  });
}
