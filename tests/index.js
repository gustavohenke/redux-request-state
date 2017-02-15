const test = require( "tape" );
const { createRequestReducer, createRequestSelectors } = require( ".." );

test( "createRequestReducer", t => {
    const reducer = createRequestReducer({
        begin: "foo",
        success: "bar",
        failure: "baz"
    });

    t.equal( typeof reducer, "function", "returns a function" );

    let state = reducer( {}, { type: "foo" });
    t.equal( state.loading, true, "sets loading to true when 'begin' action is received" );

    state = reducer({ loading: true }, { 
        type: "bar",
        payload: "success"
    });
    t.equal( state.loading, false, "sets loading to false when 'success' action is received" );
    t.equal( state.data, "success", "sets data to the payload when 'success' action is received" );

    state = reducer({ loading: true }, { 
        type: "baz",
        payload: "failure"
    });
    t.equal( state.loading, false, "sets loading to false when 'failure' action is received" );
    t.equal( state.error, "failure", "sets error to the payload when 'failure' action is received" );

    t.end();
});

test( "createRequestSelectors", t => {
    const selectors = createRequestSelectors( state => state, {
        isLoading: "isLoading",
        getData: "getData",
        getError: "getError"
    });

    t.equal( typeof selectors, "object", "returns an object" );

    t.equal( selectors.isLoading({ loading: true }), true );
    t.equal( selectors.getData({ data: "success" }), "success" );
    t.equal( selectors.getError({ error: "failure" }), "failure" );

    t.end();
});