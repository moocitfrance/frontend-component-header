import React, { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import PropTypes from 'prop-types';

import { Menu, MenuTrigger, MenuContent } from '../Menu';
import Avatar from '../Avatar';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { getConfig } from '@edx/frontend-platform';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Dropdown } from '@openedx/paragon';

import DesktopUserMenuSlot from '../plugin-slots/DesktopUserMenuSlot';
import LearningUserMenuSlot from '../plugin-slots/LearningUserMenuSlot';

import messages from '../Header.messages';

// Assets
import { CaretIcon } from '../Icons';

const AuthenticatedUserDropdown = ({ intl, username, avatar }) => {

  const { authenticatedUser, config } = useContext(AppContext);

  const userMenu = [
    {
      type: 'item',
      content: intl.formatMessage(messages.dashboard),
      href: `${getConfig().LMS_BASE_URL}/dashboard`,
    },
    {
      type: 'item',
      content: intl.formatMessage(messages.profile),
      href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${username}`,
    },
    {
      type: 'item',
      content: intl.formatMessage(messages.account),
      href: getConfig().ACCOUNT_SETTINGS_URL,
    },
    ...(getConfig().ORDER_HISTORY_URL ? [{
      type: 'item',
      content: intl.formatMessage(messages.orderHistory),
      href: getConfig().ORDER_HISTORY_URL,
    }] : []),
    {
      type: 'item',
      content: intl.formatMessage(messages.signOut),
      href: getConfig().LOGOUT_URL,
    },
  ];

  const defaultUserMenu = authenticatedUser === null ? [] : [{
    heading: '',
    items: [
      {
        type: 'item',
        href: `${config.LMS_BASE_URL}/dashboard`,
        content: intl.formatMessage(messages['header.user.menu.dashboard']),
      },
      {
        type: 'item',
        href: `${config.ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`,
        content: intl.formatMessage(messages['header.user.menu.profile']),
      },
      {
        type: 'item',
        href: config.ACCOUNT_SETTINGS_URL,
        content: intl.formatMessage(messages['header.user.menu.account.settings']),
      },
      // Users should only see Order History if have a ORDER_HISTORY_URL define in the environment.
      ...(config.ORDER_HISTORY_URL ? [{
        type: 'item',
        href: config.ORDER_HISTORY_URL,
        content: intl.formatMessage(messages['header.user.menu.order.history']),
      }] : []),
      {
        type: 'item',
        href: config.LOGOUT_URL,
        content: intl.formatMessage(messages['header.user.menu.logout']),
      },
    ],
  }];

  return (
    // <Dropdown className="user-dropdown ml-3">
    //   <Dropdown.Toggle variant="outline-primary" aria-label={intl.formatMessage(messages.userOptionsDropdownLabel)}>
    //     <FontAwesomeIcon icon={faUserCircle} className="d-md-none" size="lg" />
    //     <span data-hj-suppress className="d-none d-md-inline">
    //       {username}
    //     </span>
    //   </Dropdown.Toggle>
    //   <Dropdown.Menu className="dropdown-menu-right">
    //     <LearningUserMenuSlot items={dropdownItems} />
    //   </Dropdown.Menu>
    // </Dropdown>
    <Menu transitionClassName="menu-dropdown" transitionTimeout={250}>
    <MenuTrigger
      tag="button"
      aria-label={intl.formatMessage(messages['header.label.account.menu.for'], { username })}
      className="btn btn-outline-primary d-inline-flex align-items-center pl-2 pr-3"
    >
      <Avatar size="1.5em" src={avatar} alt="" className="mr-2" />
      {username} <CaretIcon role="img" aria-hidden focusable="false" />
    </MenuTrigger>
    <MenuContent className="mb-0 dropdown-menu show dropdown-menu-right pin-right shadow py-2">
      <DesktopUserMenuSlot menu={defaultUserMenu} />
    </MenuContent>
  </Menu>
  );
};

AuthenticatedUserDropdown.propTypes = {
  intl: intlShape.isRequired,
  username: PropTypes.string.isRequired,
};

export default injectIntl(AuthenticatedUserDropdown);
