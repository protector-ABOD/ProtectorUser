import {UserProfile} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'users.updateProfile'(userProfile, userId) {
        check(userProfile, Object);
        check(userId, String);
        const createdAt = new Date();
      	
	  	UserProfile.upsert({User_ID: userId}, {
	  		User_ID : userId,
	        Full_Name : userProfile.fullName,
	        Contact_Number : userProfile.contactNumber,
			NRIC : userProfile.NRIC,
			Gender : userProfile.gender,
			Credit_Card: [{
				Bank: userProfile.creditCardIssuedBank,
				Card_Number: userProfile.creditCardNumber,
				Expiry_Month: userProfile.expiryMonth,
				Expiry_Year: userProfile.expiryYear
			}],
			StatusID : 1,
			Last_Edited_DateTime: createdAt,
			Last_Edited_By: userId
	  	});
    },
    'users.createProfile'(userId) {
    	check(userId, String);
        const createdAt = new Date();
    	UserProfile.insert({
    		User_ID : userId,
	        Full_Name : "",
	        Contact_Number : "",
			NRIC : "",
			Gender : "",
			Credit_Card: [{
				Bank: "",
				Card_Number: "",
				Expiry_Month: "",
				Expiry_Year: ""
			}],
			StatusID : 1,
			Created_DateTime: createdAt,
			Created_By: userId,
			Last_Edited_DateTime: createdAt,
			Last_Edited_By: userId
    	})
    }

  });
}