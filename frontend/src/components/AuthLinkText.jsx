import { Link } from "react-router-dom";

const AuthLinkText = ({ to, text, className }) => {
    return (
      <Link to={to} className={`text-blue-600 hover:underline font-semibold ${className}`}>
        {text}
      </Link>
    );
  };

export default AuthLinkText;