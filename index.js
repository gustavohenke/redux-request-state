const selectors = require( "./selectors" );

module.exports = exports = {};
exports.selectors = selectors;
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
    var selectors = {};
    selectors[ selectorNames.isLoading ] = exports.selectors.isLoading( baseStateSelector );
    selectors[ selectorNames.getData ] = exports.selectors.getData( baseStateSelector );
    selectors[ selectorNames.getError ] = exports.selectors.getError( baseStateSelector );
    
    return selectors;
};