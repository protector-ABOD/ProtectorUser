import React from 'react';
import {mount} from 'react-mounter';

import Layout from './components/MainLayout.jsx';
import LayoutWithoutSideMenu from './components/MainLayoutWithoutSideMenu.jsx';
import LoginLayout from './components/LoginLayout.jsx';
import Home from './components/Home.jsx';
import Login from '../users/containers/Login.js';
import SearchForServices from '../matchmaker/containers/SearchForServices.js';
import AgentList from '../matchmaker/containers/AgentList.js';
import RequestList from '../users/containers/RequestList.js';
import UserHome from '../users/containers/UserHome.js';
import UserProfile from '../users/containers/UserProfile.js'

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
  const MainLayoutWithoutSideMenuCtx = injectDeps(LayoutWithoutSideMenu);
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
      FlowRouter.go('/login');
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

  privateRoutes.route('/user/profile', {
    name: 'user.profile',
    action(){
      mount(MainLayoutWithoutSideMenuCtx, {
        content: () => (<UserProfile />)
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

  privateRoutes.route('/services/search', {
    name: 'services.search',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<SearchForServices />)
      });
    }
  });

  privateRoutes.route('/services/agent-listing', {
    name: 'services.agent-listing',
    action({_id}) {
      mount(MainLayoutCtx, {
        content: () => (<AgentList />)
      });
    }
  });

  privateRoutes.route('/requests', {
    name: 'requests',
    action({_id}) {
      mount(MainLayoutCtx, {
        content: () => (<RequestList />)
      });
    }
  });
}
