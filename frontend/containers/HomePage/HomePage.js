import React from 'react';
import PropTypes from 'prop-types';
import { basePageWrap } from '../BasePage';
import WhoamiCard from '../../components/WhoamiCard';
import AboutMe from '../../components/AboutMe';
import ProjectsList from '../../components/ProjectsList';
import s from './HomePage.module.css';

const HomePage = ({ siteSetting, aboutMe, projects }) => {
    return (
        <div className={s.Container}>
            <WhoamiCard
                name={siteSetting?.name}
                role={siteSetting?.role}
                openTo={siteSetting?.openTo}
            />

            <AboutMe html={aboutMe} />

            <ProjectsList projects={projects} />
        </div>
    );
};

HomePage.defaultProps = {
    siteSetting: {},
    aboutMe: '',
    projects: [],
};

HomePage.propTypes = {
    siteSetting: PropTypes.shape({
        name: PropTypes.string,
        role: PropTypes.string,
        openTo: PropTypes.string,
    }),
    aboutMe: PropTypes.string,
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            url: PropTypes.string,
            image: PropTypes.object,
        })
    ),
};

export default basePageWrap(HomePage);
