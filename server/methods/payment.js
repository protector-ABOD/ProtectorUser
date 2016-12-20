import {Agents} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { HTTP } from 'meteor/http';

export default function () {
  Meteor.methods({
    'payment.request'(paymentId, refNo, amount, currency, prodDesc, userName, userEmail, userContact, remark, lang) {
      check(paymentId, String);
      check(refNo, String);
      check(amount, String);
      check(currency, String);
      check(prodDesc, String);
      check(userName, String);
      check(userEmail, String);
      check(userContact, String);
      check(remark, String);
      check(lang, String);

      const MERCHANT_KEY = Meteor.settings.ipay88.merchant_key;
      const MERCHANT_CODE = Meteor.settings.ipay88.merchant_code;
      const RESPONSE_URL = Meteor.settings.ipay88.response_url;
      const BACKEND_URL = Meteor.settings.ipay88.backend_url;

      var signature = Meteor.call("payment.generateSignature", MERCHANT_KEY, MERCHANT_CODE, refNo, amount, currency);

      const PAYMENT_POSTING_URL = Meteor.settings.ipay88.payment_posting_url;


      HTTP.call("POST", PAYMENT_POSTING_URL, {
                  params: {
                    "MerchantCode": MERCHANT_CODE,
                    "PaymentId": paymentId,
                    "RefNo": refNo,
                    "Amount": amount,
                    "Currency": currency,
                    "ProdDesc": prodDesc,
                    "UserName": userName,
                    "UserEmail": userEmail,
                    "UserContact": userContact,
                    "Remark": remark,
                    "Lang": lang,
                    "Signature": signature,
                    "ResponseURL": RESPONSE_URL,
                    "BackendURL": BACKEND_URL,
                   }
                 }, function (error, result){
                   if (!error) {

                     console.log(result);
                   } else {
                     console.log(error);
                   }
                 });
    },
    'payment.generateSignature'(MERCHANT_KEY, MERCHANT_CODE, refNo, amount, currency) {
      check(MERCHANT_KEY, String);
      check(MERCHANT_CODE, String);
      check(refNo, String);
      check(amount, String);
      check(currency, String);
      
      const strippedAmount = amount.replace(/\D/g,'');
      const signature = MERCHANT_KEY+MERCHANT_CODE+refNo+strippedAmount+currency;
      console.log(signature);
      console.log("SHA1:" + CryptoJS.SHA1(signature).toString());
      return CryptoJS.SHA1(signature).toString();
    }
  });
}
