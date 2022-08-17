import $api from "../http";

export default class CuratorsService{
    static async getCuratorTable(flow, curator) {
        return $api.post('/support-department/findTable',{flow, curator})
    }

    static async getCuratorTableFlows() {
        return $api.get('/support-department/findFlows')
    }

    static async getCuratorTableCurators(flow) {
        return $api.post('/support-department/findCurators', {flow})
    }

    static async createCuratorTable(tableName, flow, curator, lessons) {
        return $api.post('/support-department/createTable', {tableName, flow, curator, lessons})
    }
}

