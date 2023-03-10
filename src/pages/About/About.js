import styles from './About.module.css';
import {Link} from 'react-router-dom';

const About = () => {
    return(
        <div className={styles.about}>
            <h2>Sobre o Mini <span>blog</span></h2>
            <p>Esse projeto consiste em um blog feito com React no front-end e firebase no back-end.</p>
            <Link to="/posts/create" className="btn">Criar Postagem</Link>
        </div>
    )
}

export default About;
