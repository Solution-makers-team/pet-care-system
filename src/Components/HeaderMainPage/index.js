import React, { useEffect, useState } from 'react';

import Logo from "../../Assets/PetCareLogo";

import { useDispatch } from 'react-redux';
import { setUser, setIsLoading } from '../../Store/Actions/User';

import api from '../../Services/api';
import { isAuthenticated, logout } from '../../Services/auth';

import "./styles.css";

export default function HeaderMainPage({ props, validate }) {
    // REDUX TO USER
    // const state = useSelector(state => state.User);
    const dispatch = useDispatch();

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            setIsAuth(true);
            async function loadUserLogged() {
                await api.get('/users/profile-user').then(res => {
                    dispatch(setUser(res.data));
                    dispatch(setIsLoading(false));
                }).catch(err => {
                    if (err.message === "Network Error") {
                        props.history.push('/erro-no-carregamento');
                    }

                    if (err.message === "Request failed with status code 401" && isAuthenticated()) {
                        logout();
                        props.history.push('/entrar');
                    }
                });
            }
            loadUserLogged();
        }
    }, [dispatch, props.history, validate]);

    async function handleLogOut() {
        localStorage.removeItem('jwtToken');
        await api.post('/auth/logout');
    }

    return (
        <header className="header-main-container">
            <div className="content-header">
                <div className="image-logo">
                    <Logo />
                </div>
                <nav className="nav-header-main">
                    {isAuth ? (
                        <>
                            <div className="actions-header">
                                <a href="/favoritos"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="square" strokeLinejoin="arcs"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></a>
                                <a href="/pedidos"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="square" strokeLinejoin="arcs"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" /><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" /></svg></a>
                                <a href="/sacola"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="square" strokeLinejoin="arcs"><path d="M6 2L3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3.8 6h16.4M16 10a4 4 0 1 1-8 0" /></svg></a>
                                <a href="/perfil"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="square" strokeLinejoin="arcs"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></a>
                                <a href="/entrar" onClick={handleLogOut} ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="square" strokeLinejoin="arcs"><path d="M15 3h6v18h-6M10 17l5-5-5-5M13.8 12H3" /></svg></a>
                            </div>
                        </>
                    ) : (
                            <>
                                <a href="/entrar" className="entrar-a">
                                    <div className="btn-entrar">
                                        <span>Entrar</span>
                                    </div>
                                </a>
                                <a href="/cadastrar" className="cadastrar-btn">Cadastre-se</a>
                            </>
                        )}
                </nav>
            </div>
        </header>
    );
}