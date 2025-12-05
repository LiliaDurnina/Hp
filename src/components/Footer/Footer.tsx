import logo from '../../assets/images/logo.svg';

const developers = [
  "Durnina Lilia",
  "Gromova Daria",
  "Chuprova Natalia",
  "Mayorova Maria"
];

const contacts = [
  "lsdurnina@edu.hse.ru",
  "dsgromova@edu.hse.ru",
  "npchuprova@edu.hse.ru",
  "mvmaiorova@edu.hse.ru"
];

const Footer = () => {
  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer" id="contacts">
      <div className="footer__main">
        <div className="container">
          <div className="footer__columns">

            {/* Логотип + описание */}
            <div className="footer__column">
              <img src={logo} alt="Harry Potter logo" className="footer__logo" />
              <p className="footer__text">
                The website was created by students of educational groups 23CST-4 and 23CST-5.
                We put our whole soul and even a few tears into it, working with our favorite childhood characters.
              </p>
            </div>

            <div className="footer__column" />

            {/* Developers */}
            <FooterColumn title="DEVELOPERS" items={developers} />

            {/* Contacts */}
            <FooterColumn title="CONTACT US" items={contacts} />

          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <button
            className="footer__top-button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            Go to top
          </button>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({
  title,
  items
}: {
  title: string;
  items: string[];
}) => (
  <div className="footer__column">
    <h3 className="footer__title">{title}</h3>
    <ul className="footer__list">
      {items.map((item) => (
        <li key={item} className="footer__list-item">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
