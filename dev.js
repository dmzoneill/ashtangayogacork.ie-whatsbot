module.exports = class dev {
    constructor(group) {
        this.group = group
    }
  
    do_action(client, message, commands, do_message){
		var recip = null;
        
        if('author' in Object.keys(message)) {
            recip = message.author;
        } else {
            recip = message.sender.id; 
		}
		
        do_message(client, message, recip, 'activated');
    }

    do_sub_action(client, message, commands, do_message) {
        
    }

    do_message(client, message, commands, do_message) {
		
    }

    do_new_participant(client, who, do_message) {
		
    }
};