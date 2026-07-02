import {useState,useEffect} from 'react';
import { useAuth } from '../context/auth';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from './spinner';

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth] = useAuth();
    useEffect(() => {
        const authCheck = async () => {
          try {
            const res = await axios.get('/api/v1/auth/user-auth', {
              headers: {
                Authorization: `Bearer ${auth?.token}`,
            },
            });
            if (res.data.ok) setOk(true);
            else setOk(false);
          } catch (err) {
            setOk(false);
          }
        };
        authCheck();
      }, [auth?.token]);
       
   
   
    return ok?<Outlet/>:<Spinner/>
}