class Message{
    constructor(from, to, room, message, timestamp){
        this.from = from;
        this.to = to;
        this.room = room;
        this.message = message;
        this.timestamp = timestamp
    }
}

export default new Message