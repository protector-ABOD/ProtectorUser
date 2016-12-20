import React from 'react';
import { mount } from 'react-mounter';
import MainLayout from '../core/components/MainLayout.jsx';
import TestPayment from './containers/testpayment';


export default function (injectDeps) {
  const MainLayoutCtx = injectDeps(MainLayout);

  // Move these as a module and call this from a main file
  FlowRouter.route('/testpayment', {
    name: 'payment.index',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<TestPayment />)
      });
    }
  });

  // FlowRouter.route('/backendUrl', {
  //   name: 'payment.backendUrl',
  //   action() {
  //     console.log("inside backendUrl");
  //     return "RECEIVEOK";
  //   }
  // });

  // FlowRouter.route('/paymentlanding', {
  //   name: 'payment.paymentlanding',
  //   action() {
  //     console.log("inside backendUrl");
  //     return "RECEIVEOK";
  //   }
  // });
}
