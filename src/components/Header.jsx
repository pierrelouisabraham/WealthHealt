import React from "react";
import "../styles/header.scss"
import { library, icon } from '@fortawesome/fontawesome-svg-core'
import { faAddressBook} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";

const Header = () => {
  
    library.add(faAddressBook);
   
    return (
        <div className="header">
            <Link id='title' to={'/'}>HRnet</Link>
            <Link className="icones" to={'Employee-List'}>
                <FontAwesomeIcon icon="fa-solid fa-address-book" size="2x" />
            </Link>
        </div>
    );
}

export default Header;