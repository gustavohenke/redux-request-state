# redux-request-state
[![Build status](https://travis-ci.org/gustavohenke/redux-request-state.svg?branch=master)](https://travis-ci.org/gustavohenke/redux-request-state)

Redux utilities to deal with HTTP request states (loading, succeeded, failed).

- [Installation](#installation)
- [Motivation](#motivation)
- [API](#api)
- [License](#license)

## Installation
Install with npm:

```
npm install redux-request-state
```

## Motivation
In a big application, you may end up writing lots of reducers to deal with the three states of a
HTTP request - loading, succeeded and failed.  
They will probably all look similar with the following:

```js
import { createStore, combineReducers } from "redux";

// reducer, probably repeated quite a lot in a big application
export function accounts ( state = {}, action ) {
    switch ( action.type ) {
        case BEGIN_ACCOUNTS_REQUEST:
            return Object.assign( {}, state, {
                loading: true
            });

        case ACCOUNTS_REQUEST_SUCCESS:
            return Object.assign( {}, state, {
                loading: false,
                data: action.payload
            });

        case ACCOUNTS_REQUEST_FAILURE:
            return Object.assign( {}, state, {
                loading: false,
                error: action.payload
            });

        default:
            return state;
    }
}

const store = createStore( combineReducers({ accounts }) );
```

The intention of redux-request-state is to help you get rid of such common reducer, so the above
becomes as simple as invoking a factory function:

```js
import { createStore, combineReducers } from "redux";
import { createRequestReducer, createRequestSelectors } from "redux-request-state";

const store = createStore( combineReducers({
    accounts: createRequestReducer({
        begin: BEGIN_ACCOUNTS_REQUEST,
        success: ACCOUNTS_REQUEST_SUCCESS,
        failure: ACCOUNTS_REQUEST_FAILURE
    })
}));
```

## API
### `createRequestReducer( actions )`
Creates a reducer based on the action names given. Returns the reducer function.

Parameters:
- `actions`: `object`
  - `begin`: Action type that begins the request. Sets the request state to loading.
  - `success`: Action type that signals a request as succeeded. Sets the request state to not loading,
    and saves the payload as the `data` key of the state.
  - `failure`: Action type that signals a request as failed. Sets the request state to not loading,
    and saves the payload as the `error` key of the state.

### `createRequestSelectors( baseStateSelector, selectorNames )`
Creates selector functions to query the state as stored by a reducer created with `createRequestReducer`.
The returned object contains functions named after `selectorNames`, and they will query the
corresponding piece of state.

Parameters:
- `baseStateSelector`: `function`  
  Function to return the base location of the state.
- `selectorNames`: `object`
  - `isLoading`: name of the selector to query the loading state
  - `getData`: name of the selector to query the request result
  - `getError`: name of the selector to query the request error

### `selectors`
It's an object which contains the following selector functions:

- `isLoading`: queries the loading state
- `getData`: queries the request result
- `getError`: queries the request error

They all work by returning the corresponding key in the given state object.  
If given a function, it will be used to select the base state where the reducer data lies.

These selectors are available also from `redux-request-state/selectors`.

```js
import { getData } from "redux-request-state/selectors";

const data = getData( state.accounts );

// Same as above
const data = getData( state => state.accounts )( state );

// Function composition!
const accountsNumber = compose( state => state.accounts, getData, accounts => accounts.length );

// Perhaps you like reselect? https://github.com/reactjs/reselect
const baseAccountsSelector = state => state.accounts;
const listAccounts = createSelector( baseAccountsSelector, getData );
const accountsNumber = createSelector( listAccounts, accounts => accounts.length );
```

## License
MIT
