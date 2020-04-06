import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Table} from 'reactstrap';
import {getSortState, IPaginationBaseState, TextFormat, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities, reset} from './measure.reducer';
import {APP_DATE_FORMAT} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';

export interface IMeasureProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IMeasureState = IPaginationBaseState;

export class Measure extends React.Component<IMeasureProps, IMeasureState> {
  state: IMeasureState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => {
      this.getEntities();
    });
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { measureList, match, account } = this.props;
    return (
      <div>
        <h2 id="measure-heading">
          <Translate contentKey="hotelcovid19App.measure.home.title" interpolate={{ login: account.login }}>Measures from {account.login}</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="hotelcovid19App.measure.home.createLabel">Create a new Measure</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            {measureList && measureList.length > 0 ? (
              <Table responsive aria-describedby="measure-heading">
                <thead>
                  <tr>
                    <th className="hand" onClick={this.sort('id')}>
                      <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('date')}>
                      <Translate contentKey="hotelcovid19App.measure.date">Date</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('temperatureAt8')}>
                      <Translate contentKey="hotelcovid19App.measure.temperatureAt8">Temperature At 8</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('temperatureAt20')}>
                      <Translate contentKey="hotelcovid19App.measure.temperatureAt20">Temperature At 20</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('cought')}>
                      <Translate contentKey="hotelcovid19App.measure.cought">Cought</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('troubleToBreathe')}>
                      <Translate contentKey="hotelcovid19App.measure.troubleToBreathe">Trouble To Breathe</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('sputum')}>
                      <Translate contentKey="hotelcovid19App.measure.sputum">Sputum</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('soreThroat')}>
                      <Translate contentKey="hotelcovid19App.measure.soreThroat">Sore Throat</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('ostTaste')}>
                      <Translate contentKey="hotelcovid19App.measure.ostTaste">Ost Taste</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('flutter')}>
                      <Translate contentKey="hotelcovid19App.measure.flutter">Flutter</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('diarrhea')}>
                      <Translate contentKey="hotelcovid19App.measure.diarrhea">Diarrhea</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('headache')}>
                      <Translate contentKey="hotelcovid19App.measure.headache">Headache</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('musclePain')}>
                      <Translate contentKey="hotelcovid19App.measure.musclePain">Muscle Pain</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th className="hand" onClick={this.sort('notes')}>
                      <Translate contentKey="hotelcovid19App.measure.notes">Notes</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th>
                      <Translate contentKey="hotelcovid19App.measure.user">User</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {measureList.map((measure, i) => (
                    <tr key={`entity-${i}`}>
                      <td>
                        <Button tag={Link} to={`${match.url}/${measure.id}`} color="link" size="sm">
                          {measure.id}
                        </Button>
                      </td>
                      <td>
                        <TextFormat type="date" value={measure.date} format={APP_DATE_FORMAT} />
                      </td>
                      <td>{measure.temperatureAt8}</td>
                      <td>{measure.temperatureAt20}</td>
                      <td>{measure.cought ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.yes">No</Translate>}</td>
                      <td>{measure.troubleToBreathe ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.yes">No</Translate>}</td>
                      <td>{measure.sputum ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.yes">No</Translate>}</td>
                      <td>{measure.soreThroat ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.yes">No</Translate>}</td>
                      <td>{measure.ostTaste ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.yes">No</Translate>}</td>
                      <td>{measure.flutter ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.yes">No</Translate>}</td>
                      <td>{measure.diarrhea ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.yes">No</Translate>}</td>
                      <td>{measure.headache ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.yes">No</Translate>}</td>
                      <td>{measure.musclePain ? <Translate contentKey="hotelcovid19App.general.yes">Sí</Translate> : <Translate contentKey="hotelcovid19App.general.yes">No</Translate>}</td>
                      <td>{measure.notes}</td>
                      <td>{measure.user ? measure.user.login : ''}</td>
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${measure.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${measure.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${measure.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="alert alert-warning">
                <Translate contentKey="hotelcovid19App.measure.home.notFound">No Measures found</Translate>
              </div>
            )}
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ measure, authentication }: IRootState) => ({
  account: authentication.account,
  measureList: measure.entities,
  totalItems: measure.totalItems,
  links: measure.links,
  entity: measure.entity,
  updateSuccess: measure.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Measure);
