import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './measure.reducer';
import { IMeasure } from 'app/shared/model/measure.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMeasureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MeasureDetail extends React.Component<IMeasureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { measureEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="hotelcovid19App.measure.detail.title">Measure</Translate> [<b>{measureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">
                <Translate contentKey="hotelcovid19App.measure.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={measureEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="temperatureAt8">
                <Translate contentKey="hotelcovid19App.measure.temperatureAt8">Temperature At 8</Translate>
              </span>
            </dt>
            <dd>{measureEntity.temperatureAt8}</dd>
            <dt>
              <span id="temperatureAt20">
                <Translate contentKey="hotelcovid19App.measure.temperatureAt20">Temperature At 20</Translate>
              </span>
            </dt>
            <dd>{measureEntity.temperatureAt20}</dd>
            <dt>
              <span id="cought">
                <Translate contentKey="hotelcovid19App.measure.cought">Cought</Translate>
              </span>
            </dt>
            <dd>{measureEntity.cought ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.no">No</Translate>}</dd>
            <dt>
              <span id="troubleToBreathe">
                <Translate contentKey="hotelcovid19App.measure.troubleToBreathe">Trouble To Breathe</Translate>
              </span>
            </dt>
            <dd>{measureEntity.troubleToBreathe ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.no">No</Translate>}</dd>
            <dt>
              <span id="sputum">
                <Translate contentKey="hotelcovid19App.measure.sputum">Sputum</Translate>
              </span>
            </dt>
            <dd>{measureEntity.sputum ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.no">No</Translate>}</dd>
            <dt>
              <span id="soreThroat">
                <Translate contentKey="hotelcovid19App.measure.soreThroat">Sore Throat</Translate>
              </span>
            </dt>
            <dd>{measureEntity.soreThroat ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.no">No</Translate>}</dd>
            <dt>
              <span id="ostTaste">
                <Translate contentKey="hotelcovid19App.measure.ostTaste">Ost Taste</Translate>
              </span>
            </dt>
            <dd>{measureEntity.ostTaste ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.no">No</Translate>}</dd>
            <dt>
              <span id="flutter">
                <Translate contentKey="hotelcovid19App.measure.flutter">Flutter</Translate>
              </span>
            </dt>
            <dd>{measureEntity.flutter ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.no">No</Translate>}</dd>
            <dt>
              <span id="diarrhea">
                <Translate contentKey="hotelcovid19App.measure.diarrhea">Diarrhea</Translate>
              </span>
            </dt>
            <dd>{measureEntity.diarrhea ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.no">No</Translate>}</dd>
            <dt>
              <span id="headache">
                <Translate contentKey="hotelcovid19App.measure.headache">Headache</Translate>
              </span>
            </dt>
            <dd>{measureEntity.headache ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.no">No</Translate>}</dd>
            <dt>
              <span id="musclePain">
                <Translate contentKey="hotelcovid19App.measure.musclePain">Muscle Pain</Translate>
              </span>
            </dt>
            <dd>{measureEntity.musclePain ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.no">No</Translate>}</dd>
            <dt>
              <span id="notes">
                <Translate contentKey="hotelcovid19App.measure.notes">Notes</Translate>
              </span>
            </dt>
            <dd>{measureEntity.notes}</dd>
          </dl>
          <Button tag={Link} to="/entity/measure" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/measure/${measureEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ measure }: IRootState) => ({
  measureEntity: measure.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MeasureDetail);
