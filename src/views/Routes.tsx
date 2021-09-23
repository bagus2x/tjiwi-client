import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import AuthRoute from '../component/AuthRoute';
import MustBeStorageMember from '../component/AuthRoute/MustBeStorageMember';
import MustBeSupervisor from '../component/AuthRoute/MustBeSupervisor';
import LayoutStorage from '../component/LayoutStorage/LayoutStorage';
import history from '../services/history';
import BufferArea from '../views/BufferArea';
import Delivery from '../views/Delivery';
import History from '../views/History/History';
import MemberManagement from '../views/MemberManagement/MemberManagement';
import Overview from '../views/Overview/Overview';
import Penerimaan from '../views/Penerimaan/Penerimaan';
import Playground from '../views/Playground/Playground';
import Login from '../views/SignIn';
import SignUp from '../views/SignUp';
import User from '../views/User';
import ListBasePaper from './ListBasePaper';
import path from './path';
import UserSettings from './UserSettings/UserSettings';

function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path={path.signIn} exact component={Login} />
        <Route path={path.signUp} exact component={SignUp} />
        <Route path="/play" component={Playground} />
        <AuthRoute path={path.user} component={User} exact />
        <AuthRoute path={path.userSettings} component={UserSettings} />
        <AuthRoute path={path.storage}>
          <LayoutStorage>
            <Switch>
              <MustBeStorageMember path={path.storage} component={Overview} exact />
              <MustBeSupervisor path={path.memberManagement} component={MemberManagement} />
              <MustBeStorageMember path={path.history} component={History} />
              <MustBeStorageMember path={path.penerimaan} component={Penerimaan} />
              <MustBeStorageMember path={path.bufferArea} component={BufferArea} />
              <MustBeStorageMember admin path={path.list} component={ListBasePaper} />
              <MustBeStorageMember path={path.delivery} component={Delivery} />
            </Switch>
          </LayoutStorage>
        </AuthRoute>
      </Switch>
    </Router>
  );
}

export default Routes;
