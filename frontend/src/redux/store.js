import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
    reducer: {
        app: (state = {}, action) => state
    }
});

export default store;

