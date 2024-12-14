import React from 'react';
import { FaGoogle, FaGithub, FaFacebook, FaTwitter ,FaOpencart,FaRegUser} from 'react-icons/fa'; // Example with react-icons
import { IoCloseSharp } from "react-icons/io5";
interface IconProps {
  name: 'google' | 'github' | 'facebook' | 'twitter'| 'cart'|'close'|'user';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  switch (name) {
    case 'google':
      return <FaGoogle className={className} />;
    case 'github':
      return <FaGithub className={className} />;
    case 'facebook':
      return <FaFacebook className={className} />;
    case 'twitter':
      return <FaTwitter className={className} />;
    case 'cart':
      return <FaOpencart className={className} />;
    case 'close':
      return <IoCloseSharp className={className} />;
    case 'user':
      return <FaRegUser className={className} />;
    default:
      return <span className={className}>Icon</span>;
  }
};

export { Icon };
