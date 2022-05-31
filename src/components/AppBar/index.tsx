import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { useTranslation } from 'react-i18next';
import { Button, notification } from 'antd';
import { useGetUserProfileQuery } from 'store/apis/jobs';
import { useGetOffersQuery } from 'store/apis/chat';
import avatar from 'assets/avatar.png';
import {
    Header,
    NavigationContainer,
    Logo,
    NotificationIcon,
    MessageIcon,
    NotificationFlex,
    Counter,
    BarAvatarImg,
    LoggedName,
    LogoutButton,
} from './styles';

const AppBar: React.FC = () => {
    const { t } = useTranslation();

    const navigate = useNavigate();

    const isAuth = useAppSelector((state) => state.auth.isLoggedIn);

    const user = useAppSelector((state) => state.auth.user);

    const { data: userProfile } = useGetUserProfileQuery(user?.id);

    const { data: offers } = useGetOffersQuery();

    const close = (): void => {
        /* eslint-disable no-console */
        console.log('Close');
    };

    const logOut = (): void => {
        localStorage.clear();
        window.location.replace('/');
    };

    const openNotification = (type: string): void => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button
                type="primary"
                size="small"
                onClick={() => notification.close(key)}
            >
                Confirm
            </Button>
        );
        notification.open({
            message: 'You have new notification',
            description: type,
            btn,
            key,
            onClose: close,
        });
    };

    const handleNotification = (): void => {
        offers?.map((offer) => {
            return openNotification(offer.messageType);
        });
    };
    return (
        <Header>
            <NavigationContainer>
                <Logo>
                    <NavLink to="/" className="logoLink">
                        <>
                            {t('AppBar.get')}
                            <span>{t('AppBar.job')}</span>
                        </>
                    </NavLink>
                </Logo>
                <div>
                    <NavLink to="/" className="navLink">
                        {t('AppBar.home')}
                    </NavLink>
                    {isAuth && (
                        <>
                            <NavLink to="/profile" className="navLink">
                                {t('AppBar.profile')}
                            </NavLink>
                            <NavLink to="/jobs" className="navLink">
                                {t('AppBar.jobs')}
                            </NavLink>
                            <NavLink to="/offers" className="navLink">
                                {t('AppBar.myOffers')}
                            </NavLink>
                            <NavLink to="/test" className="navLink">
                                {t('AppBar.test')}
                            </NavLink>
                        </>
                    )}
                </div>

                {isAuth && (
                    <NotificationFlex>
                        <LoggedName>
                            {t('AppBar.welcome')}
                            <span>
                                {user?.firstName} {user?.lastName}
                            </span>
                        </LoggedName>
                        <BarAvatarImg>
                            {userProfile ? (
                                <img src={userProfile.profileImage} alt="" />
                            ) : (
                                <img src={avatar} alt="" />
                            )}
                        </BarAvatarImg>
                        {offers?.length && <Counter>{offers?.length}</Counter>}
                        <NotificationIcon onClick={handleNotification} />
                        <MessageIcon onClick={() => navigate('/chat')} />
                        <LogoutButton
                            type="primary"
                            size="small"
                            onClick={logOut}
                        >
                            {t('AppBar.logout')}
                        </LogoutButton>
                    </NotificationFlex>
                )}
            </NavigationContainer>
        </Header>
    );
};

export default AppBar;
