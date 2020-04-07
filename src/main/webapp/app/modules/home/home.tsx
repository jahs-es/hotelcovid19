import './home.scss';

import React from 'react';
import {Link} from 'react-router-dom';
import {Translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {Alert, Col, Row} from 'reactstrap';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;

  const isAdmin = () => (!!(account.authorities.indexOf('ROLE_ADMIN') > -1 ));

  return (
    <Row>
      <Col md="9">
        {account && account.login ? (
          <div>
            <Alert color="success">
              <Translate contentKey="home.logged.message" interpolate={{ login: account.login }}>
                You are logged in as user {account.login}.
              </Translate>
            </Alert>
            {account.roomName && !isAdmin() &&
            <Alert color="info">
              <Translate contentKey="home.logged.room" interpolate={{ roomName: account.roomName }}>
                Your room is {account.roomName}.
              </Translate>
            </Alert>
            }
            {account.roomName === null && !isAdmin() &&
            <Alert color="warning">
              <Translate contentKey="home.logged.noRoom">
                No room asigned to you. Please contact a controller.
              </Translate>
            </Alert>
            }
          </div>
        ) : (
          <div>
            <Alert color="warning">
              <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
              <Link to="/account/register" className="alert-link">
                <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
              </Link>
            </Alert>
            <Alert color="info">
              <Translate contentKey="global.messages.info.login.doLogin">Please do login to access:</Translate>&nbsp;
              <Link to="/account/login" className="alert-link">
                <Translate contentKey="global.messages.info.login.link">Do login</Translate>
              </Link>
            </Alert>
          </div>
        )}
      </Col>
      <Col md="3" className="pad">
        <span className="hipster rounded" />
      </Col>
    </Row>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
