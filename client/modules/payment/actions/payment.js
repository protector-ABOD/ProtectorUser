export default {
  paymentRequest({Meteor, LocalState}, paymentId, refNo, amount, currency, prodDesc, userName, userEmail, userContact, remark, lang) {
    if (!paymentId || !refNo || !amount || !currency || !prodDesc || !userName || !userEmail || !userContact || !remark || !lang) {
      return LocalState.set('PAYMENT_ERROR', 'Please ensure all fields filled correctly!');
    }
    LocalState.set('PAYMENT_ERROR', null);

    Meteor.call('payment.request', paymentId, refNo, amount, currency, prodDesc, userName, userEmail, userContact, remark, lang, (err) => {
      if (err) {
        return LocalState.set('PAYMENT_ERROR', err.message);
      }
    });
  }
};
