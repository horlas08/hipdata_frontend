import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store';
// import { setToken } from '@/store/auth/authSlice';

const GoogleCallback = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const error = params.get('error');

        if (token) {
            // dispatch(setSession(token));
            navigate('/home');
        } else if (error) {
            navigate('/sign-in', { state: { error } });
        }
    }, [dispatch, navigate]);

    return null;
};

export default GoogleCallback;