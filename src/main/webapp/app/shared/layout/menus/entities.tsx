import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {Translate, translate} from 'react-jhipster';
import {NavDropdown} from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name={translate('global.menu.entities.main')} id="entity-menu">
    {props.isAdmin &&
    <MenuItem icon="asterisk" to="/entity/room">
      <Translate contentKey="global.menu.entities.room" />
    </MenuItem>
    }
    <MenuItem icon="asterisk" to="/entity/measure">
      <Translate contentKey="global.menu.entities.measure" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
