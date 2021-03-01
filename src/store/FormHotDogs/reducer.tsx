const reducer = (state: { [i: string]: any } = {}, action: any) => {
    switch (action.type) {
        case "LOAD":
            return {
                ...state,
                ['form' + action.data.id]: action.data,
            };
        case "EMPTY":
            return {
                ...state,
                ['form' + action.data.id]: {
                    name: '', price: '', description: '', imageFile: '', imageLink: ''

                },
            };
        case"SET PROPERTY":

            return {
                ...state,
                ['form' + action.data.id]: Object.assign(state['form' + action.data.id], action.data.property)
            };
        default:
            return state;
    }
};


export default reducer;
