import classnames from 'classnames';
import Counter from '../Badge/Counter';
import CustomPropTypes from '../utils/CustomPropTypes/CustomPropTypes';
import Icon from '../Icon/Icon';
import Identifier from '../Identifier/Identifier';
import Menu from '../Menu/Menu';
import Popover from '../Popover/Popover';
import PropTypes from 'prop-types';
import SearchInput from '../SearchInput/SearchInput';
import React, { Component } from 'react';

class Shellbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsedActions: this.getCollapsedActions(),
            totalNotifications: this.getNotificationsSum(),
            showCollapsedProductSwitcherMenu: false
        };
    }

    backBtnHandler = () => {
        this.setState({
            showCollapsedProductSwitcherMenu: false
        });
    };

    getCollapsedActions = () => {
        let collapsedList = [];

        //put all the Additional Actions in the list
        if (this.props.actions) {
            collapsedList = [...this.props.actions];
        }

        //Add the notification icon to the notifications object and add it to the list
        //The notifications are placed after the additional actions

        if (this.props.notifications) {
            let collapsedNotifications = this.props.notifications;
            collapsedNotifications.glyph = 'bell';
            collapsedList.push(collapsedNotifications);
        }

        //Add the grid icon to the product switcher object and add it to the list
        //The product switcher is placed after the notifications

        if (this.props.productSwitcher) {
            let collapsedProductSwitcher = this.props.productSwitcher;

            collapsedProductSwitcher.glyph = 'grid';
            collapsedProductSwitcher.callback = () => {
                this.setState(prevState => ({
                    showCollapsedProductSwitcherMenu: !prevState.showCollapsedProductSwitcherMenu
                }));
            };

            collapsedList.push(collapsedProductSwitcher);
        }

        //Add the search icon to the search input object and add it to the list
        //The search input is placed at the beginning of the list
        if (this.props.searchInput) {
            let collapsedSearchInput = this.props.searchInput;
            collapsedSearchInput.glyph = 'search';
            collapsedList.unshift(collapsedSearchInput);
        }
        return collapsedList;
    };

    getNotificationsSum = () => {
        let additionalActionsSum = 0;
        if (this.props.actions) {
            additionalActionsSum = this.props.actions.reduce((r, d) => r + d.notificationCount, 0);
        }
        if (this.props.notifications) {
            if (this.props.notifications.notificationCount) {
                let totalSum = additionalActionsSum + this.props.notifications.notificationCount;
                return totalSum;
            } else {
                return additionalActionsSum;
            }
        } else {
            return additionalActionsSum;
        }
    };

    render() {
        const {
            localizedText,
            logo,
            logoSAP,
            productTitle,
            productMenu,
            subtitle,
            copilot,
            searchInput,
            actions,
            notifications,
            productSwitcher,
            productSwitcherList,
            profile,
            profileMenu,
            className
        } = this.props;

        const shellbarClasses = classnames(
            'fd-shellbar',
            className
        );

        return (
            <div className={shellbarClasses}>
                <div className='fd-shellbar__group fd-shellbar__group--start'>
                    {logo && <a className='fd-shellbar__logo'>{logo}</a>}
                    {logoSAP && (
                        <a className='fd-shellbar__logo'>
                            <img alt='SAP' src='//unpkg.com/fiori-fundamentals/dist/images/sap-logo.png' />
                        </a>
                    )}
                    <div className='fd-shellbar__product'>
                        {productTitle && !productMenu && <span className='fd-shellbar__title'>{productTitle}</span>}
                        {productMenu && (
                            <div className='fd-product-menu'>
                                <Popover
                                    body={
                                        productMenu && (
                                            <Menu>
                                                <Menu.List>
                                                    {productMenu.map((item, index) => {
                                                        return (
                                                            <Menu.Item
                                                                key={index}
                                                                link={item.link}
                                                                onClick={item.callback}
                                                                url={item.url} >
                                                                {item.glyph && (
                                                                    <React.Fragment>
                                                                        <Icon glyph={item.glyph} size={item.size} />
                                                                        &nbsp;&nbsp;&nbsp;
                                                                    </React.Fragment>
                                                                )}
                                                                {item.name}
                                                            </Menu.Item>
                                                        );
                                                    })}
                                                </Menu.List>
                                            </Menu>
                                        )
                                    }
                                    control={
                                        <button className='fd-product-menu__control'>
                                            <span className='fd-shellbar__title fd-product-menu__title'>
                                                {productTitle}
                                            </span>
                                        </button>
                                    }
                                    noArrow />
                            </div>
                        )}
                    </div>
                    {subtitle && <div className='fd-shellbar__subtitle'>{subtitle}</div>}
                </div>
                {copilot ? (
                    <div className='fd-shellbar__group fd-shellbar__group--middle'>
                        <img
                            alt='CoPilot'
                            height='30'
                            src='//unpkg.com/fiori-fundamentals/dist/images/copilot.png'
                            width='30' />
                    </div>
                ) : null}
                <div className='fd-shellbar__group fd-shellbar__group--end'>
                    <div className='fd-shellbar__actions'>
                        {searchInput && (
                            <div className='fd-shellbar__action fd-shellbar__action--collapsible'>
                                <SearchInput
                                    inShellbar
                                    onEnter={searchInput.onSearch}
                                    placeholder={searchInput.placeholder}
                                    searchList={searchInput.searchList} />
                            </div>
                        )}
                        {actions &&
                            actions.map((action, index) => {
                                return (
                                    <div className='fd-shellbar__action fd-shellbar__action--collapsible' key={index}>
                                        {action.menu ? (
                                            <Popover
                                                body={action.menu}
                                                control={
                                                    <button
                                                        aria-label={action.label}
                                                        className={` fd-button--shell sap-icon--${action.glyph}`} >
                                                        {action.notificationCount > 0 && (
                                                            <span
                                                                aria-label={localizedText.counterLabel}
                                                                className='fd-counter fd-counter--notification' >
                                                                {action.notificationCount}
                                                            </span>
                                                        )}
                                                    </button>
                                                }
                                                placement='bottom-end' />
                                        ) : (
                                            <button
                                                aria-label={action.label}
                                                className={` fd-button--shell sap-icon--${action.glyph}`}
                                                key={index}
                                                onClick={action.callback} >
                                                {action.notificationCount > 0 && (
                                                    <span
                                                        aria-label={localizedText.counterLabel}
                                                        className='fd-counter fd-counter--notification' >
                                                        {action.notificationCount}
                                                    </span>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        {notifications && (
                            (notifications.notificationsBody || notifications.noNotificationsBody) ? (
                                <Popover
                                    body={
                                        ((notifications.notificationCount > 0) && notifications.notificationsBody) ||
                                        ((notifications.notificationCount <= 0) && notifications.noNotificationsBody)
                                    }
                                    control={
                                        <div className='fd-shellbar__action fd-shellbar__action--collapsible'>
                                            <button aria-label={localizedText.notificationsButton} className=' fd-button--shell sap-icon--bell'>
                                                {(notifications.notificationCount > 0) && <span aria-label={localizedText.counterLabel} className='fd-counter fd-counter--notification'>
                                                    {notifications.notificationCount}
                                                </span>}
                                            </button>
                                        </div>
                                    }
                                    placement='bottom-end' />
                            ) : (
                                <div className='fd-shellbar__action fd-shellbar__action--collapsible'>
                                    <button aria-label={localizedText.notificationsButton} className=' fd-button--shell sap-icon--bell'
                                        onClick={notifications.callback}>
                                        {(notifications.notificationCount > 0) && <span aria-label={localizedText.counterLabel} className='fd-counter fd-counter--notification'>
                                            {notifications.notificationCount}
                                        </span>}
                                    </button>
                                </div>
                            )
                        )}
                        {
                            (actions || searchInput || notifications) && <div className='fd-shellbar__action fd-shellbar__action--collapse'>
                                <div className='fd-shellbar-collapse'>
                                    <Popover
                                        body={
                                            <Menu>
                                                {!this.state.showCollapsedProductSwitcherMenu ? (
                                                    <Menu.List>
                                                        {this.state.collapsedActions.map((item, index) => {
                                                            return (
                                                                <Menu.Item
                                                                    key={index}
                                                                    link={item.link}
                                                                    onClick={item.callback}
                                                                    url={item.url} >
                                                                    <Icon glyph={item.glyph}>
                                                                        {item.notificationCount > 0 && <Counter notification>{item.notificationCount}</Counter>}
                                                                    </Icon> {item.label}
                                                                </Menu.Item>
                                                            );
                                                        })}
                                                    </Menu.List>
                                                ) : (
                                                    <Menu.List>
                                                        <Menu.Item>
                                                            <span
                                                                className='fd-menu sap-icon--nav-back'
                                                                onClick={this.backBtnHandler} />
                                                        </Menu.Item>
                                                        {productSwitcherList.map((item, index) => {
                                                            return (
                                                                <Menu.Item
                                                                    key={index}
                                                                    link={item.link}
                                                                    onClick={item.callback}
                                                                    url={item.url} >
                                                                    <Icon glyph={item.glyph} /> {item.title}
                                                                </Menu.Item>
                                                            );
                                                        })}
                                                    </Menu.List>
                                                )}
                                            </Menu>
                                        }
                                        control={
                                            <div className='fd-shellbar-collapse--control' role='button'>
                                                <button className=' fd-button--shell sap-icon--overflow'>
                                                    <span
                                                        aria-label={localizedText.counterLabel}
                                                        className='fd-counter fd-counter--notification'> {this.state.totalNotifications > 0 && this.state.totalNotifications} </span>
                                                </button>
                                            </div>
                                        }
                                        placement='bottom-end' />
                                </div>
                            </div>
                        }
                        {profile && (
                            <div className='fd-shellbar__action fd-shellbar__action--show-always'>
                                <div className='fd-user-menu'>
                                    <Popover
                                        body={
                                            profileMenu && (
                                                <Menu>
                                                    <Menu.List>
                                                        <Menu.Item>{profile.userName}</Menu.Item>
                                                        {profileMenu.map((item, index) => {
                                                            return (
                                                                <Menu.Item
                                                                    key={index}
                                                                    link={item.link}
                                                                    onClick={item.callback}
                                                                    url={item.url} >
                                                                    {item.glyph && (
                                                                        <React.Fragment>
                                                                            <Icon glyph={item.glyph} size={item.size} />
                                                                            &nbsp;&nbsp;&nbsp;
                                                                        </React.Fragment>
                                                                    )}
                                                                    {item.name}
                                                                </Menu.Item>
                                                            );
                                                        })}
                                                    </Menu.List>
                                                </Menu>
                                            )
                                        }
                                        control={
                                            profile.image ? (
                                                <Identifier
                                                    backgroundImageUrl={profile.image}
                                                    modifier='circle'
                                                    size='xs' />
                                            ) : (
                                                <Identifier color={profile.colorAccent}
                                                    modifier='circle'
                                                    size='xs'>
                                                    {profile.initials}
                                                </Identifier>
                                            )
                                        }
                                        placement='bottom-end' />
                                </div>
                            </div>
                        )}
                        {productSwitcher && (
                            <div className='fd-shellbar__action fd-shellbar__action--collapsible'>
                                <div className='fd-product-switcher'>
                                    <Popover
                                        body={
                                            <div className='fd-product-switcher__body'>
                                                <nav>
                                                    <ul>
                                                        {productSwitcherList.map((item, index) => {
                                                            return (
                                                                <li key={index} onClick={item.callback}>
                                                                    <span className='fd-product-switcher__product-icon'>
                                                                        <img alt={item.title} src={item.image} />
                                                                    </span>
                                                                    <span className='fd-product-switcher__product-title'>
                                                                        {item.title}
                                                                    </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </nav>
                                            </div>
                                        }
                                        control={<button className=' fd-button--shell sap-icon--grid' />}
                                        placement='bottom-end' />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

Shellbar.displayName = 'Shellbar';

Shellbar.propTypes = {
    actions: PropTypes.array,
    className: PropTypes.string,
    copilot: PropTypes.bool,
    localizedText: CustomPropTypes.i18n({
        counterLabel: PropTypes.string,
        notificationsButton: PropTypes.string
    }),
    logo: PropTypes.object,
    logoSAP: PropTypes.bool,
    notifications: PropTypes.object,
    productMenu: PropTypes.array,
    productSwitcher: PropTypes.object,
    productSwitcherList: PropTypes.array,
    productTitle: PropTypes.string,
    profile: PropTypes.object,
    profileMenu: PropTypes.array,
    searchInput: PropTypes.object,
    subtitle: PropTypes.string
};

Shellbar.defaultProps = {
    localizedText: {
        counterLabel: 'Unread count',
        notificationsButton: 'Notifications'
    }
};

Shellbar.propDescriptions = {
    actions: 'Holds all product actions and links.',
    copilot: 'For use with applications that utilize CoPilot.',
    logo: 'Provide an img tag for a logo other than the SAP logo. One of the two props (`logo` or `logoSAP`) should be set.',
    logoSAP: 'Renders the SAP logo in the Shellbar. One of the two props (`logo` or `logoSAP`) should be set.',
    localizedTextShape: {
        counterLabel: 'Aria-label for <span> element within the <button> element.',
        notificationsButton: 'Aria-label for <button> element.'
    },
    notifications: 'Information about pending notifications.',
    productMenu: 'Holds product titles and navigation.',
    productSwitcher: 'For navigating between products.',
    productSwitcherList: 'List of the products.',
    productTitle: 'Displays the current application when no product menu is used.',
    profile: 'User information (_e.g._ name, initials, etc.)',
    profileMenu: 'List of items for the profile menu.',
    searchInput: 'Holds `searchInput` properties.',
    subtitle: 'Displays an application context. Should be used rarely.'
};

export default Shellbar;
