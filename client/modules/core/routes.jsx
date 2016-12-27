import React from 'react';
import {mount} from 'react-mounter';

import Layout from './components/MainLayout.jsx';
import LoginLayout from './components/LoginLayout.jsx';
import Home from './components/Home.jsx';
import Login from '../users/containers/Login.js';
import SearchForServices from '../matchmaker/containers/SearchForServices.js';
import UserHome from '../users/containers/UserHome.js';

function redirectIfLoggedIn (ctx, redirect) {
  if (Meteor.userId()) {
    redirect('/user/home');
  }
}

function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId() && !Meteor.loggingIn()) {
    redirect('/login');
  }
}

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(Layout);
  const LoginLayoutCtx = injectDeps(LoginLayout);

  var privateRoutes = FlowRouter.group({
    name: 'private',
    triggersEnter: [
	  checkLoggedIn
    ]
  })

  var publicRoutes = FlowRouter.group({
    name: 'public',
    triggersEnter: [
      redirectIfLoggedIn
    ]
  })

  privateRoutes.route('/logout', {
    name: 'users.logout',
    action() {
      Meteor.logout();
      FlowRouter.go('/');
    }
  });

  privateRoutes.route('/home', {
    name: 'home',
    action() {
	  mount(MainLayoutCtx, {
	  });
    }
  });

  privateRoutes.route('/user/home', {
    name: 'user.home',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<UserHome />)
      });
    }
  });

  privateRoutes.route('/', {
    name: 'landing',
    action() {
      FlowRouter.go('/user/home');
    }
  });

  publicRoutes.route('/login', {
    name: 'users.login',
    action() {
      mount(LoginLayoutCtx, {
        content: () => (<Login />)
      });
    }
  });

  publicRoutes.route('/test/matchmaker', {
    name: 'test.matchmaker',
    action() {
      mount(LoginLayoutCtx, {
        content: () => (<SearchForServices />)
      });
    }
  });
}
