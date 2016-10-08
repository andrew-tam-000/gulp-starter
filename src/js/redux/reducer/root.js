const initialState = {
    test: true
};

export default function(state = initialState, action) {
    switch ( action.type ) {
        case 'TEST':
            return Object.assign({}, state, { test: !state.test });
        default:
            return state;
    }
}
