export default {
    seo: {},
    siteSetting: {
        name: 'andreas larssamils',
        role: 'fullstack-dev',
        openTo: 'cool things',
    },
    aboutMe:
        '<p>Hej! Jag är en fullstack-utvecklare som gillar att bygga ' +
        'snabba, välgjorda produkter från databas till pixel.</p>' +
        '<p>På fritiden pillar jag med <code>side-projects</code>, ' +
        'läser om systemdesign och dricker för mycket kaffe.</p>',
    projects: [
        {
            title: 'project_alpha',
            description: 'En sak jag byggde för skojs skull',
            url: 'https://example.com/alpha',
            image: {
                renditions: {
                    thumb: { src: '/img/logo.svg', alt: 'project_alpha' },
                },
            },
        },
        {
            title: 'side_hustle.io',
            description: 'Litet SaaS-experiment på fritiden',
            url: 'https://example.com/side-hustle',
            image: {
                renditions: {
                    thumb: { src: '/img/logo.svg', alt: 'side_hustle.io' },
                },
            },
        },
        {
            title: 'open_source_thing',
            description: 'Bibliotek jag underhåller på GitHub',
            url: 'https://github.com/example/open-source-thing',
            image: {
                renditions: {
                    thumb: { src: '/img/logo.svg', alt: 'open_source_thing' },
                },
            },
        },
    ],
};
