/* global module */

import React from 'react';
import AboutMe from './AboutMe';
import data from './AboutMe.data';

const AboutMeStory = {
    title: 'Components/AboutMe',
    component: AboutMe,
    decorators: [
        (Story) => (
            <div
                style={{
                    background: 'var(--term-bg)',
                    padding: '24px',
                    minHeight: '100vh',
                }}>
                <Story />
            </div>
        ),
    ],
};

export default AboutMeStory;

export const AboutMeWithData = () => <AboutMe {...data} />;
export const AboutMeWithoutData = () => <AboutMe />;
