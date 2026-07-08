import PropTypes from 'prop-types';
import s from './WhoamiCard.module.css';

const WhoamiCard = ({ name, role, openTo }) => {
    return (
        <div className={s.Root}>
            <p className={s.Prompt}>
                <span className={s.Symbol}>&gt;</span> whoami
            </p>

            <div className={s.Card}>
                <div className={s.Brace}>{'{'}</div>
                <div className={s.Row}>
                    <span className={s.Key}>name</span>:{' '}
                    <span className={s.Str}>{`"${name}"`}</span>,
                </div>
                <div className={s.Row}>
                    <span className={s.Key}>role</span>:{' '}
                    <span className={s.Str}>{`"${role}"`}</span>,
                </div>
                <div className={s.Row}>
                    <span className={s.Key}>open_to</span>:{' '}
                    <span className={s.Str}>{`"${openTo}"`}</span>
                </div>
                <div className={s.Brace}>{'}'}</div>
            </div>

            <p className={s.Prompt}>
                <span className={s.Symbol}>&gt;</span> _
                <span className={s.Cursor} aria-hidden="true" />
            </p>
        </div>
    );
};

WhoamiCard.propTypes = {
    name: PropTypes.string,
    role: PropTypes.string,
    openTo: PropTypes.string,
};

WhoamiCard.defaultProps = {
    name: '',
    role: '',
    openTo: '',
};

export default WhoamiCard;
