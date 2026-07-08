const thumb = (alt) => ({
    renditions: {
        thumb: { src: '/img/logo.svg', width: 96, height: 96, alt },
    },
});

const ProjectsListData = {
    projects: [
        {
            title: 'project_alpha',
            description: 'En sak jag byggde för skojs skull',
            url: 'https://example.com/alpha',
            image: thumb('project_alpha'),
        },
        {
            title: 'side_hustle.io',
            description: 'Litet SaaS-experiment på fritiden',
            url: 'https://example.com/side-hustle',
            image: thumb('side_hustle.io'),
        },
        {
            title: 'open_source_thing',
            description: 'Bibliotek jag underhåller på GitHub',
            url: 'https://github.com/example/open-source-thing',
            image: thumb('open_source_thing'),
        },
    ],
};

export default ProjectsListData;
