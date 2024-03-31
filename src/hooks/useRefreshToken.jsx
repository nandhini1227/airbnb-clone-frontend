import { axiosNormal } from '../Axios/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosNormal.get(`/auth/refresh`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });

        await setAuth(() => {
            return { ...response.data };
        });
        return response.data.data.token;
    }
    return refresh;
};

export default useRefreshToken;
