import PropTypes from 'prop-types';
import RawHtml from '../RawHtml';
import s from './AboutMe.module.css';

const AboutMe = ({ html }) => {
    if (!html) {
        return null;
    }

    return (
        <div className={s.Root}>
            <p className={s.Prompt}>
                <span className={s.Symbol}>&gt;</span> cat about.md
            </p>

            <div className={s.Card}>
                <div className={s.Prose}>
                    <RawHtml html={html} />
                </div>
            </div>
        </div>
    );
};

AboutMe.propTypes = {
    html: PropTypes.string,
};

AboutMe.defaultProps = {
    html: '',
};

export default AboutMe;
