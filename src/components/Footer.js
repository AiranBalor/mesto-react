import footerImage from "../images/footer__copyright-image.svg";

function Footer() {
  return (
    <footer className="footer">
      <img
        className="footer__copyright-image"
        src={footerImage}
        alt="Изображение логотипа сайта"
      />
    </footer>
  );
}

export default Footer;
