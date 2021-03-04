import React from 'react';
import "./Modal.css"
import {AddHotDogForm} from "./AddHotDogForm";
import store from "../store";


export class ShowModal extends React.Component {
    data: any;
    typeInput: any;

    constructor(props: any) {
        super(props);
        this.data = props;
        this.setInput();
    }

    state = {show: false}

    showModal = () => {
        store.getState().editCard.edit();
        store.dispatch({type: 'NEW'})
        this.setState({show: true});
    }
    hideModal = () => {
        this.setState({show: false});
    }
    setInput = () => {
        if (this.data.type && this.data.type === 'link') {
            this.typeInput = <a href='#' className="right" onClick={this.showModal}>add hot-dog</a>
        } else {
            this.typeInput =
                <a href='#' className="waves-effect waves-light btn modal-trigger" onClick={this.showModal}>Modal</a>
        }
    }

    render() {
        return (
            <li>
                {this.typeInput}
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <p>Modal</p>
                    <p>Data</p>
                </Modal>
            </li>

        )
    }
}

const Modal = (data: any) => {
    const showHideClassName = data.show ? 'modal display-block' : 'modal display-none';
    return (
        <div className={showHideClassName}>
            <AddHotDogForm {...{'handleClose': data.handleClose}}/>
        </div>
    );
};
