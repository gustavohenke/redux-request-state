module.exports = exports = {};
exports.createRequestReducer = function ( actions ) {
    return function ( state, action ) {
        switch ( action.type ) {
            case actions.begin:
                return Object.assign( {}, state, {
                    loading: true
                });

            case actions.success:
                return Object.assign( {}, state, {
                    loading: false,
                    data: action.payload
                });

            case actions.failure:
                return Object.assign( {}, state, {
                    loading: false,
                    error: action.payload
                });

            default:
                return state || {};
        }
    };
};

exports.createRequestSelectors = function ( baseStateSelector, selectorNames ) {
    const selectors = {};
    selectors[ selectorNames.isLoading ] = function ( state ) {
        return baseStateSelector( state ).loading;
    };

    selectors[ selectorNames.getData ] = function ( state ) {
        return baseStateSelector( state ).data;
    };

    selectors[ selectorNames.getError ] = function ( state ) {
        return baseStateSelector( state ).error;
    };
    
    return selectors;
};