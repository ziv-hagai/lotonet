import { Link } from "react-router-dom";

const GrayIcon = ({ img, i, url, link }) => {
  let className = "grayIconLink";
  // if (url === '/' && i === 2) {
  // 	className = 'grayIconLink grayIconLinkActive'
  // } else if (url === '/notifications' && i === 1) {
  // 	className = 'grayIconLink grayIconLinkActive'
  // } else if (url === '/marketplace' && i === 0) {
  // 	className = 'grayIconLink grayIconLinkActive'
  // }

  return (
    <Link to={link} className={className}>
      {img}
    </Link>
  );
};

export default GrayIcon;
