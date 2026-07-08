import PropTypes from 'prop-types';
import s from './ProjectsList.module.css';

const imageShape = PropTypes.shape({
    renditions: PropTypes.shape({
        thumb: PropTypes.shape({
            src: PropTypes.string,
            alt: PropTypes.string,
        }),
    }),
});

const ProjectCard = ({ title, description, url, image }) => {
    const thumb = image?.renditions?.thumb;

    const inner = (
        <>
            {thumb && (
                <img
                    className={s.Thumb}
                    src={thumb.src}
                    alt={thumb.alt || title}
                />
            )}
            <div className={s.Body}>
                <span className={s.Title}>{title}</span>
                {description && <span className={s.Desc}>{description}</span>}
            </div>
            <span className={s.Arrow} aria-hidden="true">
                &rarr;
            </span>
        </>
    );

    if (url) {
        return (
            <a
                className={s.Card}
                href={url}
                target="_blank"
                rel="noreferrer noopener">
                {inner}
            </a>
        );
    }

    return <div className={s.Card}>{inner}</div>;
};

ProjectCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    image: imageShape,
};

const ProjectsList = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return null;
    }

    return (
        <div className={s.Root}>
            <p className={s.Prompt}>
                <span className={s.Symbol}>$</span> ls ./projects
            </p>

            <div className={s.List}>
                {projects.map((project, i) => (
                    <ProjectCard
                        key={project.url || project.title || i}
                        {...project}
                    />
                ))}
            </div>
        </div>
    );
};

ProjectsList.propTypes = {
    projects: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            url: PropTypes.string,
            image: imageShape,
        })
    ),
};

ProjectsList.defaultProps = {
    projects: [],
};

export default ProjectsList;
