import React from 'react';
import {observer} from "mobx-react-lite";
import store from "../../services/AuthService";

const HomePage = () => {
    return (
        <div>
            asfasfffsaf
            <button onClick={() => store.logout()}>Выйти</button>
        </div>
    );
};

export default observer(HomePage);