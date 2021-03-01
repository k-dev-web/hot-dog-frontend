import React, {useEffect, useReducer} from 'react';
import {NavBar} from '../components/nav-bar'
import M from 'materialize-css'
import './HotDogList.css';
import {HotDogProvider} from "../providers/HotDogProvider";
import {HotDogForm} from "../components/ProductForms";
import store from "../store";


const dataFetchReducer = (state: any, action: any) => {
    switch (action.type) {

        case 'PROD LOAD':
            return action.data

        default:
            throw state;
    }
};


export const HotDogList = () => {
    const [state, dispatch] = useReducer(dataFetchReducer, []);
    const {getHotDogs} = HotDogProvider();

    useEffect(() => {
        store.dispatch({type: "ADD LIST DISPATCH", data: {dispatch: dispatch}})
        getHotDogs();
    }, [])


    store.subscribe(() => {
        if (store.getState().hotDogsList.load) {
            store.dispatch({type: 'LOAD PROD'});
            store.getState().hotDogsList.dispatch({type: "PROD LOAD", data: store.getState().hotDogsList.list})
        }
        if (store.getState().toast.seen) {
            let toast = store.getState().toast;
            M.toast({
                html: toast.type + ' : ' + toast.message,
                classes: `${toast.type === 'Success' ? 'green' : 'red'}`
            })
            store.dispatch({type: 'SEEN TOAST'})
        }
    })
    return (
        <div>
            <div className="container">
                <NavBar/>
            </div>
            <div className="body">
                <h4>
                    All Hot-Dogs
                </h4>

                <section>
                    {
                        state.length ?
                            state.map((product: any) => {
                                return <HotDogForm
                                    key={'form' + product['id']}
                                    formKey={'form' + product['id']}
                                    form={'form' + product['id']}
                                    {...{
                                        product: product,
                                    }}/>
                            }) : <h4> Nothing to show </h4>
                    }
                </section>
            </div>
        </div>
    )
}

