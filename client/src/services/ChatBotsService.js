import $api from "../http";

export default class ChatBotsService{
    static async addChannel(channelName){
        return $api.post('/chatbots/channel/addChannel', {channelName})
    }

    static async getChannels(){
        return $api.get('/chatbots/channel/getChannels')
    }
}