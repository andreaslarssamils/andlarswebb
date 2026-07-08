import { render, screen } from '@testing-library/react';
import WhoamiCard from './';
import data from './WhoamiCard.data';

describe('<WhoamiCard />', () => {
    it('Renders an empty WhoamiCard', () => {
        render(<WhoamiCard />);
        expect(screen.getByText('whoami')).toBeTruthy();
    });

    it('Renders WhoamiCard with data', () => {
        render(<WhoamiCard {...data} />);
        expect(screen.getByText(`"${data.name}"`)).toBeTruthy();
        expect(screen.getByText(`"${data.role}"`)).toBeTruthy();
        expect(screen.getByText(`"${data.openTo}"`)).toBeTruthy();
    });
});
