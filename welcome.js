module.exports = class welcome {
    constructor(group) {
        this.group = group
    }

    async send_welcome(client, who, do_message) {
        var users = await client.getGroupMembers(this.group);
       
        for(var g = 0; g < users.length; g++) {
            console.log("check: " + users[g].id._serialized + " = " + who);
            if(users[g].id._serialized == who){
                var msg = 'Hi ' + users[g].pushname + ', welcome to Ashtanga Yoga Cork!\n\nIf you need any help just type !help\nand i will private message you.      👋';
                do_message(client, null, this.group, msg);
            }
        }
    }
  
    do_action(client, message, commands, do_message){
       
    }

    do_sub_action(client, message, commands, do_message){
		
    }

    do_message(client, message, commands, do_message) {
        if (message.body.toLowerCase() === "hi" || message.body.toLowerCase().startsWith("hi ")) {
            var msg = 'Hi ' + message.sender.pushname + ', welcome to Ashtanga Yoga Cork!\n\nIf you need any help just type !help\nand i will private message you.      👋';
            do_message(client, message, message.from, msg);
		}
    }

    do_new_participant(client, who, do_message) {
        console.log("new participant");
        this.send_welcome(client, who, do_message);
    }
};