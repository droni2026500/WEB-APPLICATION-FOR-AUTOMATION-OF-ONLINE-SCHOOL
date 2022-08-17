import $api from "../http";
import $api_refresh from "../http";

export default class AuthService{
    static async login(email, password){
        return $api.post('/users/login', {email, password})
    };

    static async logout(){
        return $api.post('/users/logout')
    };

    static async refresh(access_token){
        return $api_refresh.post('/users/refresh', {access_token})
    };
}

