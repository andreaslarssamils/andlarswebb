import { render, screen } from '@testing-library/react';
import ProjectsList from './';
import data from './ProjectsList.data';

describe('<ProjectsList />', () => {
    it('Renders nothing when empty', () => {
        const { container } = render(<ProjectsList />);
        expect(container.firstChild).toBeNull();
    });

    it('Renders the prompt and each project with data', () => {
        render(<ProjectsList {...data} />);
        expect(screen.getByText(/ls \.\/projects/)).toBeTruthy();
        data.projects.forEach((project) => {
            expect(screen.getByText(project.title)).toBeTruthy();
            expect(screen.getByText(project.description)).toBeTruthy();
        });
    });

    it('Links each project card to its url', () => {
        render(<ProjectsList {...data} />);
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(data.projects.length);
        expect(links[0].getAttribute('href')).toBe(data.projects[0].url);
    });
});
