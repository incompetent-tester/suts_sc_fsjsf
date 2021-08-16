import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './src/AppRouter';
import { AppStore } from './src/states/AppStore';

const App = () => {
    return <>
        <Provider store={AppStore}>
            <AppRouter />
        </Provider>
    </>
};

export default App;
