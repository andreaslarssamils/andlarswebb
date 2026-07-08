import { render, screen } from '@testing-library/react';
import AboutMe from './';
import data from './AboutMe.data';

describe('<AboutMe />', () => {
    it('Renders nothing when empty', () => {
        const { container } = render(<AboutMe />);
        expect(container.firstChild).toBeNull();
    });

    it('Renders AboutMe with data', () => {
        render(<AboutMe {...data} />);
        expect(screen.getByText(/cat about\.md/)).toBeTruthy();
        expect(screen.getByText(/fullstack-utvecklare/)).toBeTruthy();
    });
});
