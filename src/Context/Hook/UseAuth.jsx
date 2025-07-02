import React, { use } from 'react';
import { AuthContext } from '../AuthContext';

const UseAuth = () => {

    const authData = use(AuthContext)

    return authData
};

export default UseAuth;