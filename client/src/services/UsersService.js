import $api from "../http";

export default class UsersService{
    static async getUsers() {
        return $api.get('/users/getUsers')
    }

    static async addUsers(full_name, email, password, role) {
        return $api.post('/users/addUsers', {full_name, email, password, role})
    }

    static async deleteUsers(selectedRows) {
        return $api.post('/users/deleteUsers', {selectedRows})
    }
}

