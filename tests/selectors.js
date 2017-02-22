const test = require( "tape" );
const { getData, getError, isLoading } = require( "../selectors" );

test( "selectors/isLoading", t => {
    t.equal( isLoading({ loading: true }), true, "returns loading key when arg is object" );
    
    const selector = isLoading( state => state.foo );
    t.equal(
        typeof selector,
        "function",
        "returns selector bound to a base state when arg is function"
    );

    const result = selector({ foo: { loading: true } });
    t.equal( result, true, "finds loading key when using bound selector" );

    t.end();
});

test( "selectors/getData", t => {
    t.equal( getData({ data: "foo" }), "foo", "returns data key when arg is object" );
    
    const selector = getData( state => state.foo );
    t.equal(
        typeof selector,
        "function",
        "returns selector bound to a base state when arg is function"
    );

    const result = selector({ foo: { data: "bar" } });
    t.equal( result, "bar", "finds data key when using bound selector" );

    t.end();
});

test( "selectors/getError", t => {
    t.equal( getError({ error: "doh!" }), "doh!", "returns error key when arg is object" );
    
    const selector = getError( state => state.heyho );
    t.equal(
        typeof selector,
        "function",
        "returns selector bound to a base state when arg is function"
    );

    const result = selector({ heyho: { error: "let's go" } });
    t.equal( result, "let's go", "finds error key when using bound selector" );

    t.end();
});