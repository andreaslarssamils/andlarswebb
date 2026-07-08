/* global module */

import React from 'react';
import WhoamiCard from './WhoamiCard';
import data from './WhoamiCard.data';

const WhoamiCardStory = {
    title: 'Components/WhoamiCard',
    component: WhoamiCard,
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

export default WhoamiCardStory;

export const WhoamiCardWithData = () => <WhoamiCard {...data} />;
export const WhoamiCardWithoutData = () => <WhoamiCard />;
