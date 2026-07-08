import React from 'react';
import PropTypes from 'prop-types';
import { basePageWrap } from '../BasePage';
import WhoamiCard from '../../components/WhoamiCard';
import s from './HomePage.module.css';

const HomePage = ({ siteSetting }) => {
    return (
        <div className={s.Container}>
            <WhoamiCard
                name={siteSetting?.name}
                role={siteSetting?.role}
                openTo={siteSetting?.openTo}
            />
        </div>
    );
};

HomePage.defaultProps = {
    siteSetting: {},
};

HomePage.propTypes = {
    siteSetting: PropTypes.shape({
        name: PropTypes.string,
        role: PropTypes.string,
        openTo: PropTypes.string,
    }),
};

export default basePageWrap(HomePage);
