module.exports = exports = {};

exports.isLoading = acceptBaseStateSelector( function isLoading ( state ) {
    return state.loading;
});

exports.getData = acceptBaseStateSelector( function getData ( state ) {
    return state.data;
});

exports.getError = acceptBaseStateSelector( function getError ( state ) {
    return state.error;
});

function acceptBaseStateSelector ( selector ) {
    return function ( stateOrSelector ) {
        if ( typeof stateOrSelector !== "function" ) {
            return selector( stateOrSelector );
        }

        return function ( state ) {
            return selector( stateOrSelector( state ) );
        };
    };
}