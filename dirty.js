module.exports = class dirty {
    constructor(group) {
        this.group = group
    }
  
	async sendImage(client, recip, opts) {
		try {
			await client.sendImage(
				recip,
				opts[0],
				opts[1],
				opts[2]
			);
		} catch(err){
			console.log(err.message);
		}
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

    do_sub_action(client, message, commands, do_message){
		var recip = null;
        
        if('author' in Object.keys(message)) {
            recip = message.author;
        } else {
            recip = message.sender.id; 
		}
		
		do_message(client, message, recip, 'none');
	}	

    do_message(client, message, commands, do_message) {
		var recip = null;
        
        if(message.hasOwnProperty('from')) {
			recip = message.from;
			console.log("from: " + message.from);
        } else if (message.hasOwnProperty('author')) {
			recip = message.sender.author; 
			console.log("author: " + message.sender.author);
		} else {
			recip = message.sender.id; 
			console.log("id: " + message.sender.id);
		}

        if (message.body.toLowerCase().indexOf("dickhead") > -1) {
			console.log("dickhead");
			this.sendImage(client, recip, ['./dickhead.jpg', 'dickhead.jpg', '']);
		}

		if (message.body.toLowerCase().indexOf("buzzing") > -1) {
			console.log("buzzing");
			this.sendImage(client, recip, ['./buzzing.jpg', 'buzzing.jpg', '']);
		}
	}

	do_new_participant(client, who, do_message) {
		
    }
};
