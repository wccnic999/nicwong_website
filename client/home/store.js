import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import appReducers from 'app/reducers';
import categoryReducers from 'category/reducers';
import workReducers from 'work/reducers';

const reducers = combineReducers({
    app: appReducers,
    category: categoryReducers,
    work: workReducers
});

// Create the store
const store = createStore(
    reducers,
    compose(
        applyMiddleware(
            // Support thunked actions and react-router-redux
            thunk
        ),
        // Support the Chrome DevTools extension
        window.devToolsExtension && process.env.NODE_ENV !== 'production'
            ? window.devToolsExtension()
            : f => f
    )
);

store.subscribe(() => {});

export default store;
