// src/App.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { refreshUser } from './redux/auth/operations';
import { fetchContacts } from './redux/contacts/operations';
import { selectIsLoggedIn, selectIsRefreshing } from './redux/auth/selectors';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Routes/PrivateRoute';
import RestrictedRoute from './components/Routes/RestrictedRoute';
import HomePage from './pages/HomePage/HomePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import ContactsPage from './pages/ContactsPage/ContactsPage';

const App = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const isRefreshing = useSelector(selectIsRefreshing);

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchContacts());
        }
    }, [dispatch, isLoggedIn]);

    return isRefreshing ? (
        <p>Загрузка...</p>
    ) : (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                    path="register"
                    element={
                        <RestrictedRoute redirectTo="/contacts">
                            <RegistrationPage />
                        </RestrictedRoute>
                    }
                />
                <Route
                    path="login"
                    element={
                        <RestrictedRoute redirectTo="/contacts">
                            <LoginPage />
                        </RestrictedRoute>
                    }
                />
                <Route
                    path="contacts"
                    element={
                        <PrivateRoute redirectTo="/login">
                            <ContactsPage />
                        </PrivateRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default App;
