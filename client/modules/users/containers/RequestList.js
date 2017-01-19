import RequestList from '../components/RequestList.jsx';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('user.requests').ready()
    && Meteor.subscribe('user.requestListAgents').ready()
    && Meteor.subscribe('codeTables.country').ready()
		&& Meteor.subscribe('codeTables.serviceType').ready()) {
      console.log(Collections.Agents.find());
    const serviceRequestList = Collections.ServiceRequest.find({},{
      transform: function (doc) {
        if (doc.Agent_ID ) {
          const agent = Collections.Agents.findOne({ _id: doc.Agent_ID });
          if (agent) {
  					doc.Agent = agent;
  				}
        }

        const serviceTypeCodeTable = Collections.CodeTable.findOne({Category : "ServiceType"});
				const serviceType = _.find(serviceTypeCodeTable.ValueList, function (item) {return item.Code == doc.Service_Request.Service_Type_Code});

				if (serviceType) {
					doc.Service_Request.Service_Type_Description = serviceType.Description;
				}
				else {
					doc.Service_Request.Service_Type_Description = "";
				}

        const countryCodeTable = Collections.CodeTable.findOne({Category : "Country"});
				const country = _.find(countryCodeTable.ValueList, function (item) {return item.Code == doc.Service_Request.Service_Country_Code});

				if (country) {
					const state = _.find(country.States, function (item) {return item.Code == doc.Service_Request.Service_State_Code});

					if (state) {
						doc.Service_Request.Service_State_Description = state.Description;
					}
					else {
						doc.Service_Request.Service_State_Description = "";
					}
				}
				else {
					doc.Service_Request.Service_State_Description = "";
				}
        return doc;
      }
    }).fetch();
    // var clientServiceRequest = new Mongo.Collection('clientServiceRequest');
    // const serviceRequestList = clientServiceRequest.find().fetch();
    // console.log(serviceRequestList);

    onData(null, {serviceRequestList});
  } else {
    onData();
  }
};

export const depsMapper = (context, actions) => ({
  // selectAgent: actions.matchmaker.selectAgent,
  // searchForMatchingAgents: actions.matchmaker.searchForMatchingAgents,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(RequestList);
