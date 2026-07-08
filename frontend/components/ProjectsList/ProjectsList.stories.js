/* global module */

import React from 'react';
import ProjectsList from './ProjectsList';
import data from './ProjectsList.data';

const ProjectsListStory = {
    title: 'Components/ProjectsList',
    component: ProjectsList,
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

export default ProjectsListStory;

export const ProjectsListWithData = () => <ProjectsList {...data} />;
export const ProjectsListWithoutData = () => <ProjectsList />;
