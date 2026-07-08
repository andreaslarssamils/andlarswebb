import React from 'react';
import PropTypes from 'prop-types';
import { basePageWrap } from '../BasePage';
import WhoamiCard from '../../components/WhoamiCard';
import AboutMe from '../../components/AboutMe';
import s from './HomePage.module.css';

const HomePage = ({ siteSetting, aboutMe }) => {
    return (
        <div className={s.Container}>
            <WhoamiCard
                name={siteSetting?.name}
                role={siteSetting?.role}
                openTo={siteSetting?.openTo}
            />

            <AboutMe html={aboutMe} />
        </div>
    );
};

HomePage.defaultProps = {
    siteSetting: {},
    aboutMe: '',
};

HomePage.propTypes = {
    siteSetting: PropTypes.shape({
        name: PropTypes.string,
        role: PropTypes.string,
        openTo: PropTypes.string,
    }),
    aboutMe: PropTypes.string,
};

export default basePageWrap(HomePage);
