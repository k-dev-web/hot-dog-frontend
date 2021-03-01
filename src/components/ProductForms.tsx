import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import store from "../store";
import {HotDogProvider} from "../providers/HotDogProvider";
import './Card.css'


const number = (value: any) => value && isNaN(Number(value)) ? 'Must be a number' : ''
const uniqueName = (value: any, id: any) =>
    store.getState().hotDogsList.list.find((data: any) => data.name === value && data.id !== id) ? 'name must be unique' : ''


export let HotDogForm: any = (props: any) => {
    const {convertImgToBase64, convertUrl, getHotDogs, sendHotDog} = HotDogProvider();
    const [url] = useState("http://hot-dog-backend.herokuapp.com/uploads/" + props.product.id + ".jpg?date:" + new Date,);
    const [isEdit, setIsEdit] = useState(false);
    const [error, setError] = useState({name: '', price: '', description: ''});
    const [action, setAction] = useState(false);

    props.autofill('file', '')

    const changeImage = async (event: any) => {
        if (event.target && event.target.files && event.target.files.length > 0) {
            let tmp = await convertImgToBase64(event.target.files[0]);
            props.autofill('file', tmp)
        }
    }

    props.load({
        id: props.product?.id ? props.product?.id : null,
        name: props.product?.name ? props.product.name : '',
        price: props.product?.price ? props.product.price : '',
        description: props.product?.description ? props.product.description : '',

    })

    const clickChangeCard = async () => {
        store.getState().editCard.edit()
        setIsEdit(true)
        store.dispatch({type: 'SET PROPERTY', data: {id: props.product?.id, property: {isEdit: true}}});
        store.dispatch({type: 'EDIT', data: {changeTypeIn: changeCard, id: props.product?.id}});

    }
    const changeCard = async () => {
        setIsEdit(false)
        await store.dispatch({type: 'SET PROPERTY', data: {id: props.product?.id, property: {isEdit: false}}});
    }

    const deleteHotDog = async () => {
        if (action) {
            return;
        }
        setAction(true);
        let answer = await sendHotDog('DELETE', 'deleteProducts', {id: props.product.id});
        if (answer.message === 'ok') {
            store.dispatch({type: 'TOAST', data: {type: 'Success', message: "delete success"}});
        } else {
            store.dispatch({type: 'TOAST', data: {type: 'Error', message: "delete fail" + answer.message}});
            console.log(answer)

        }
        await getHotDogs();
        await changeCard();
        setAction(false);
    }


    const upgradeHotDog = async () => {
        if (action) {
            return;
        }
        setAction(true);
        if (store.getState().form?.['form' + props.product.id]?.values?.imageLink?.length) {
            let tmp = await convertUrl(store.getState().form?.['form' + props.product.id]?.values?.imageLink);
            props.autofill('file', tmp);
        }
        let form = store.getState().form?.['form' + props.product.id]?.values;
        let tmpError = {name: '', price: '', description: ''};
        setError(tmpError);


        let sendData: { [i: string]: any } = {id: props.product.id};

        for (let i in form) {
            if (form[i] && form[i] !== props.product[i]) {
                sendData[i] = form[i]
            }
        }
        tmpError.name = uniqueName(sendData?.name, props.product.id);
        tmpError.price = number(sendData?.price);
        if (tmpError.name || tmpError.price || tmpError.description) {
            setError(tmpError)
            setAction(false);
            store.dispatch({type: 'TOAST', data: {type: 'Error', message: "fix error in form"}});
            return;
        }
        if (Object.keys(sendData).length < 2) {
            store.dispatch({type: 'TOAST', data: {type: 'Error', message: "nothing update"}});
            return;
        }
        let answer = await sendHotDog('put', 'upProduct', sendData);
        if (answer.message === 'Ok') {
            await getHotDogs();
            changeCard();
            setAction(false);
            store.dispatch({type: 'TOAST', data: {type: 'Success', message: "hot dog update"}});

        } else {
            store.dispatch({type: 'TOAST', data: {type: 'Error', message: "error in update" + answer.message}});

            console.log(answer)
            setAction(false);
        }
    }

    return (
        !isEdit ?
            <div className="card  ">
                <div className="card-image">
                    <img id={'imgEditCard'} src={url}/>

                </div>
                <div className="card-content scrolling">
                    <span className="card-title">{props.product.name}</span>
                    <p>{props.product.price}$</p>
                    <p>{props.product.description}</p>
                </div>
                <div className="card-action bottom-sheet">
                    <a className="btn-large btn-card" onClick={clickChangeCard}>Edit</a>
                </div>
            </div> :
            <form className="card  ">
                <div className="card-image">
                    <img id={'imgEditCard'} src={url}/>

                </div>
                <div className="card-content">

                    <Field
                        className='div-form'
                        component="input"
                        placeholder="   Name"
                        id="name"
                        name="name"
                        key='name'
                        type="text"
                    />
                    {error.name && <span className={'span-form  red-text'}>{error.name}</span>}

                    <Field
                        className='div-form'
                        component="input"
                        placeholder="   Price"
                        id="price"
                        name="price"
                        type="text"
                    />
                    {error.price && <span className={'span-form  red-text'}>{error.price}</span>}


                    <Field
                        className='div-form'
                        component="textarea"
                        placeholder="   Description"
                        id="description"
                        name="description"
                        type="text"
                    />
                    {error.description && <span className={'span-form  red-text'}>{error.description}</span>}


                    <div className="row file-field input-field inline form-input">
                        <div className="col s2">
                            <div className="btn">
                                <span>+</span>
                                <input
                                    type="file"
                                    id="imageFile"
                                    name="imageFile"
                                    className='file'
                                    onChange={changeImage}
                                    accept="image/*,.png,.jpeg,.jpg"/>
                            </div>
                        </div>
                        <div className="col s10">
                            <Field
                                placeholder="   Image"

                                id="imageLink"
                                name="imageLink"
                                type="text"
                                component="input"
                            />
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <a className="btn-large btn-edit"
                       onClick={upgradeHotDog}
                    >upgrade</a>
                    <a className="btn-large btn-edit"
                       onClick={deleteHotDog}
                    >delete</a>
                </div>
            </form>
    );
};


export default HotDogForm = reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    form: 'HotDogForm',
})(HotDogForm);

HotDogForm = connect(
    (state: any, props?: any) => {
        return ({
            initialValues: state.hotDogs[props.form],
        })
    },
    {load: (data: any) => ({type: 'LOAD', data})},
)(HotDogForm);


