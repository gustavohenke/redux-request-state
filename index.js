module.exports = exports = {};
exports.createRequestReducer = ({ begin, success, failure }) => {
    return ( state = {}, action ) => {
        switch ( action.type ) {
            case begin:
                return Object.assign( {}, state, {
                    loading: true
                });

            case success:
                return Object.assign( {}, state, {
                    loading: false,
                    data: action.payload
                });

            case failure:
                return Object.assign( {}, state, {
                    loading: false,
                    error: action.payload
                });

            default:
                return state;
        }
    };
};

exports.createRequestSelectors = ( baseStateSelector, { isLoading, getData, getError }) => ({
    [ isLoading ]: state => baseStateSelector( state ).loading,
    [ getData ]: state => baseStateSelector( state ).data,
    [ getError ]: state => baseStateSelector( state ).error
});