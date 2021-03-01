const reducer = (state = {
    load: false, list: [], dispatch: () => {
    }
}, action: any) => {
    switch (action.type) {
        case "LOAD LIST":
            return {load: true, list: action.data, dispatch: state.dispatch};
        case "NEW LIST":

            return {load: true, list: [], dispatch: state.dispatch};
        case "LOAD PROD":

            return {load: false, list: state.list, dispatch: state.dispatch};
        case "ADD LIST DISPATCH":

            return {load: false, list: state.list, dispatch: action.data.dispatch};

        default:
            return state;
    }
};


export default reducer;
