import {useCallback} from 'react'
import {useHttp} from "../hooks/http.hook";
import store from "../store";


export const HotDogProvider = () => {
    const {request} = useHttp();


    const getHotDogs = useCallback(async () => {
        try {
            const prods = await request('/api/getProducts', 'GET',)
            if (prods.products && prods.products.length) {
                store.dispatch({type: 'LOAD LIST', data: prods.products});
            } else {
                store.dispatch({type: 'LOAD LIST', data: []});
            }
            return prods
        } catch (e) {
            return e
        }
    }, [request])
    const sendHotDog = useCallback(async (method: string, api: string, sendData: any) => {
        try {
            const answer = await request('/api/' + api, method, sendData);
            return answer;
        } catch (e) {
            return e;
        }
    }, [request])

    const convertUrl = async (value: any) => {
        try {
            const imgBase64 = await new Promise(resolve => {
                let img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = value;
                img.onload = function () {
                    let canvas = document.createElement('canvas'),
                        ctx = canvas.getContext('2d'), dataURL;
                    canvas.height = img.height;
                    canvas.width = img.width;
                    ctx?.drawImage(img, 0, 0);
                    dataURL = canvas.toDataURL('base64Img');
                    resolve(dataURL);
                };
            })
            return imgBase64
        } catch (e) {
            console.log('error', e);
        }
    }

    const convertImgToBase64 = (img: any) => {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onloadend = function () {
                return resolve(reader.result);
            }
        })
    }


    return {convertImgToBase64, convertUrl, getHotDogs, sendHotDog}
}

