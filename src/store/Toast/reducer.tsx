const reducer = (state = {seen: false, type: '', message: ''}, action: any) => {
    switch (action.type) {
        case "TOAST":
            return {
                seen: true, type: action.data?.type, message: action.data?.message
            };
        case "SEEN TOAST":
            return {
                seen: false, type: '', message: ''
            };
        default:
            return state;
    }
};


export default reducer;
