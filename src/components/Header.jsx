import React from "react";
import "../styles/header.scss"
import { Link } from "react-router-dom";
import AdressIcon from '../ressources/address-book-regular.svg'

const Header = () => {
    return (
        <div className="header">
            <Link id='title' to={'/'}>HRnet</Link>
            <Link className="icones" to={'/Employee-List'}>
          
                <img src={AdressIcon} alt="EmployeeList"></img>
                <span>Liste des employées</span>
            </Link>
        </div>
    );
}

export default Header;