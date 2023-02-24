import {db} from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

import {useState, useEffect} from 'react';

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    const checkIfIsCancelled = () => {
        if(cancelled){
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError('');

        try {
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;


        } catch (error) {

            let systemErrorMessage;

            if(error.message.includes('password')){
                systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.'
            } else if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado.';
            } else if (error.message.includes('wrong-password')) {
                systemErrorMessage = 'Senha incorreta.';
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            setLoading(false);
            setError(systemErrorMessage);

        }
    };

    const logout = async () => {
        checkIfIsCancelled();

        await signOut(auth);
    }

    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado.';
            } else if (error.message.includes('wrong-password')) {
                systemErrorMessage = 'Senha incorreta.';
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {auth, createUser, error, loading, logout, login};
}
