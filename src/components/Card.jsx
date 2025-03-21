import style from '../styles/card.module.css';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';


const Card = ({image_url, name, title, email, animate, updateAnimate}) => {


    return (
        <Wrapper>
        <div className={`${style["profile-card"]} 
        ${animate ? style["is-entering"] : ""}`}
        onAnimationEnd={updateAnimate}>
            <div className={style["profile-card-image"]}>
                <br />
                <img src={image_url} alt={name} />
            </div>
            <div className={style["profile-card-content"]}>
                <p>{name}</p>
                <p>{title}</p>
                <p> <a href={`mailto:${email}`}>{email}</a></p>
            </div>
        </div>
        </Wrapper>
    );
}

Card.propTypes = {
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    email: PropTypes.string.isRequired,
};

export default Card;
