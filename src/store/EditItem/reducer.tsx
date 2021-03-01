const reducer = (state = {
    edit: () => {
    }, id: undefined
}, action: any) => {
    switch (action.type) {
        case "EDIT":
            if (state.id === action.data.id) {
                return state;
            }

            return {
                edit: action.data.changeTypeIn, id: action.data.id
            };
        case "NEW":

            return {
                id: undefined, edit: () => {
                }
            };


        default:
            return state;
    }
};


export default reducer;
