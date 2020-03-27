import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './measure.reducer';
import { IMeasure } from 'app/shared/model/measure.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMeasureUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMeasureUpdateState {
  isNew: boolean;
  userId: string;
}

export class MeasureUpdate extends React.Component<IMeasureUpdateProps, IMeasureUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);

    if (errors.length === 0) {
      const { measureEntity } = this.props;
      const entity = {
        ...measureEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/measure');
  };

  render() {
    const { measureEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="hotelcovid19App.measure.home.createOrEditLabel">
              <Translate contentKey="hotelcovid19App.measure.home.createOrEditLabel">Create or edit a Measure</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : measureEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="measure-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="measure-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="measure-date">
                    <Translate contentKey="hotelcovid19App.measure.date">Date</Translate>
                  </Label>
                  <AvInput
                    id="measure-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.measureEntity.date)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="temperatureAt8Label" for="measure-temperatureAt8">
                    <Translate contentKey="hotelcovid19App.measure.temperatureAt8">Temperature At 8</Translate>
                  </Label>
                  <AvField id="measure-temperatureAt8" type="string" className="form-control" name="temperatureAt8" />
                </AvGroup>
                <AvGroup>
                  <Label id="temperatureAt20Label" for="measure-temperatureAt20">
                    <Translate contentKey="hotelcovid19App.measure.temperatureAt20">Temperature At 20</Translate>
                  </Label>
                  <AvField id="measure-temperatureAt20" type="string" className="form-control" name="temperatureAt20" />
                </AvGroup>
                <AvGroup>
                  <Label id="coughtLabel" check>
                    <AvInput id="measure-cought" type="checkbox" className="form-control" name="cought" />
                    <Translate contentKey="hotelcovid19App.measure.cought">Cought</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="troubleToBreatheLabel" check>
                    <AvInput id="measure-troubleToBreathe" type="checkbox" className="form-control" name="troubleToBreathe" />
                    <Translate contentKey="hotelcovid19App.measure.troubleToBreathe">Trouble To Breathe</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="sputumLabel" check>
                    <AvInput id="measure-sputum" type="checkbox" className="form-control" name="sputum" />
                    <Translate contentKey="hotelcovid19App.measure.sputum">Sputum</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="soreThroatLabel" check>
                    <AvInput id="measure-soreThroat" type="checkbox" className="form-control" name="soreThroat" />
                    <Translate contentKey="hotelcovid19App.measure.soreThroat">Sore Throat</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="ostTasteLabel" check>
                    <AvInput id="measure-ostTaste" type="checkbox" className="form-control" name="ostTaste" />
                    <Translate contentKey="hotelcovid19App.measure.ostTaste">Ost Taste</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="flutterLabel" check>
                    <AvInput id="measure-flutter" type="checkbox" className="form-control" name="flutter" />
                    <Translate contentKey="hotelcovid19App.measure.flutter">Flutter</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="diarrheaLabel" check>
                    <AvInput id="measure-diarrhea" type="checkbox" className="form-control" name="diarrhea" />
                    <Translate contentKey="hotelcovid19App.measure.diarrhea">Diarrhea</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="headacheLabel" check>
                    <AvInput id="measure-headache" type="checkbox" className="form-control" name="headache" />
                    <Translate contentKey="hotelcovid19App.measure.headache">Headache</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="musclePainLabel" check>
                    <AvInput id="measure-musclePain" type="checkbox" className="form-control" name="musclePain" />
                    <Translate contentKey="hotelcovid19App.measure.musclePain">Muscle Pain</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="notesLabel" for="measure-notes">
                    <Translate contentKey="hotelcovid19App.measure.notes">Notes</Translate>
                  </Label>
                  <AvField id="measure-notes" type="text" name="notes" />
                </AvGroup>
                <AvGroup>
                  <Label for="measure-user">
                    <Translate contentKey="hotelcovid19App.measure.user">User</Translate>
                  </Label>
                  <AvInput id="measure-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/measure" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  measureEntity: storeState.measure.entity,
  loading: storeState.measure.loading,
  updating: storeState.measure.updating,
  updateSuccess: storeState.measure.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeasureUpdate);
