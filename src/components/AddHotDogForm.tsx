import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import './Card.css'
import {HotDogProvider} from "../providers/HotDogProvider";
import store from "../store";

const required = (value: any) => (value || typeof value === 'number' ? undefined : 'Required')
const number = (value: any) => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const uniqueName = (value: any) =>
    store.getState().hotDogsList.list.find((data: any) => data.name === value) ? 'name must be unique' : undefined


// @ts-ignore
const renderInput = ({input, placeholder, type, meta: {touched, error, warning}}) => (
    <div className={'renderField'}>
        <input {...input} placeholder={placeholder} type={type}/>
        {touched && ((error && <span className={'span-input  red-text'}>{error}</span>) || (warning &&
            <span className={'span-input red-text'}>{warning}</span>))}
    </div>
)
// @ts-ignore
const renderText = ({input, placeholder, type, meta: {touched, error, warning}}) => (
    <div className={'renderField'}>
        <textarea {...input} placeholder={placeholder} type={type} className={'renderText'}/>
        {touched && ((error && <span className={'span-text  red-text'}>{error}</span>) || (warning &&
            <span className={'span-text  red-text'}>{warning}</span>))}
    </div>
)


export let AddHotDogForm: any = (props: any) => {
        const {convertImgToBase64, convertUrl, getHotDogs, sendHotDog} = HotDogProvider();
        const [action, setAction] = useState(false);

        const {handleClose} = props
        props.autofill('imageFile', '')
        const changeImage = async (event: any) => {
            if (event.target && event.target.files && event.target.files.length > 0) {
                let tmp = await convertImgToBase64(event.target.files[0]);
                props.autofill('imageFile', tmp)
            }
        }
        const submit = async (event: any) => {
            if (action) {
                return;
            }
            setAction(true)
            if (props.invalid) {
                store.dispatch({type: 'TOAST', data: {type: 'Error', message: "incorrect data"}});
                setAction(false)
                return;
            }
            if (store.getState().form?.AddHotDogForm?.values?.imageLink?.length) {
                let tmp = await convertUrl(store.getState().form?.AddHotDogForm?.values?.imageLink);
                props.autofill('imageFile', tmp);

            }
            let tmpValues = store.getState().form?.AddHotDogForm?.values;
            let sendData = {
                name: tmpValues?.name ? tmpValues.name : '',
                file: tmpValues?.imageFile ? tmpValues?.imageFile : '',
                price: tmpValues?.price ? tmpValues.price : 0,
                description: tmpValues?.description ? tmpValues.description : ''
            }
            if (!sendData.name.length || !sendData.file.length || !sendData.description.length || !Number(sendData.price) || sendData.price === 0) {
                store.dispatch({type: 'TOAST', data: {type: 'Error', message: "not full data"}});
                setAction(false)
                return;
            }
            let answer = await sendHotDog('POST', 'createProduct', sendData);
            if (answer.message === 'Ok') {
                store.dispatch({type: 'TOAST', data: {type: 'Success', message: "add new hot dog"}});
                setAction(false)
                await getHotDogs();
                handleClose();
            } else {
                store.dispatch({type: 'TOAST', data: {type: 'Error', message: "incorrect data : " + answer.message}});
                setAction(false)
                console.log(answer)
            }
        }


        return (
            <form
                className=" card white darken-1 flow-text  "
                id='card-form'
            >

                <div className="card-content black-text" id={'card-content-form'}>
                    <h3 className="card-title">Add new hot-dog</h3>


                    <Field
                        component={renderInput}
                        type={'input'}
                        placeholder="   Name"
                        id="name"
                        name="name"
                        key='name'
                        validate={[required, uniqueName]}
                    />

                    <Field
                        component={renderInput}
                        type={'input'}
                        validate={[required, number]}
                        placeholder="   Price"
                        id="price"
                        name="price"
                    />


                    <Field
                        component={renderText}
                        type='text'
                        placeholder="   Description"
                        id="description"
                        name="description"
                        validate={[required]}

                    />

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

                    <div className="card-action ">
                        <a
                            className="button-card add-button black white-text btn-large "
                            href='#'
                            onClick={handleClose}
                        >No Thanks</a>
                        <a
                            href='#'
                            aria-disabled={props.valid}
                            type="submit"
                            className={"button-card add-button black white-text btn-large submit"}
                            onClick={submit}
                        >Add</a>
                    </div>
                </div>

            </form>
        );
    }
;

AddHotDogForm = reduxForm({
    destroyOnUnmount: false,
    enableReinitialize: true,
    forceUnregisterOnUnmount: true,
    form: 'AddHotDogForm',
})(AddHotDogForm);


export default AddHotDogForm;

