import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Measure from './measure';
import MeasureDetail from './measure-detail';
import MeasureUpdate from './measure-update';
import MeasureDeleteDialog from './measure-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MeasureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MeasureUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MeasureDetail} />
      <ErrorBoundaryRoute path={match.url} component={Measure} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MeasureDeleteDialog} />
  </>
);

export default Routes;
