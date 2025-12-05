import { Link } from 'react-router-dom';
import friendsImg from '../assets/images/friends.svg';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

const HomePage = () => {
    return (
        <div className="wrapper">
            <Header />

            <header className="header header-main">
                <div className="header__body">
                    <div className="container">
                        <div className="header-body-inner">
                            <div className="header__main">
                                <div className="header__content">
                                    <h1 className="header__title">The Harry Potter Universe</h1>
                                    <h2 className="header__subtitle">J. K. Rowling</h2>
                                    <div className="header__content-buttons">
                                        <Link className="header__content-btn button button-empty" to="/characters">
                                                Characters
                                        </Link>
                                        <Link className="header__content-btn button button-empty" to="/filmography">
                                                Filmography
                                        </Link>
                                        
                                    </div>
                                </div>

                                <img src={friendsImg} alt="friends" />
                            </div>

                            <ul className="header__row">
                                <li className="header__row-item">
                                    <span>2001</span>
                                    Release Year
                                </li>
                                <span></span>
                                <li className="header__row-item">
                                    <span>8</span>
                                    Movies
                                </li>
                                <span></span>
                                <li className="header__row-item">
                                    <span>7</span>
                                    Books
                                </li>
                                <span></span>
                                <li className="header__row-item">
                                    <span>3</span>
                                    Main Wizards
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <Footer />
        </div>
    );
};


export default HomePage;
