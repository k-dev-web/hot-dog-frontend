import React from 'react'
import logo from "../hot-dog.png";
import './nav-bar.css';
import {ShowModal} from "./Modal";


export const NavBar = (data: any) => {
    const clickCrud = () => {

    }
    return (
        <nav className="nav-center" role="navigation">
            <div className="nav-wrapper container white">
                <ul>
                    <li><img className="left" src={logo}/></li>
                    <li><a className="waves-effect waves-light btn black" onClick={clickCrud}>CRUD</a></li>
                    <ShowModal {...{type: 'link', editCard: data.editCard}}></ShowModal>
                </ul>
            </div>
        </nav>
    )

}



