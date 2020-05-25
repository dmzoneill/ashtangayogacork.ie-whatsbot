// Supports ES6
// import { create, Whatsapp } from 'sulla';
const sulla = require('sulla');

sulla.create().then((client) => start(client));


async function fun(client) {
	console.log(await client.getAllGroups());

	await client.setProfileName('Ashtanga Yoga Cork');

	await client.setProfileStatus('Adjusting yogis 24hrs/day!');

	//await client.sendText('353861938787-1589922796@g.us', 'I\'m back');
	//await client.sendText('353861938787-1470937957@g.us', 'I\'m back');

	// Retrieves
	console.log(await client.getAllContacts());

	console.log("==========================");

	// Retrieve all unread message
	console.log(await client.getAllUnreadMessages());

	console.log("==========================");

	// Retrieve all chats
	console.log(await client.getAllChats());

	console.log("==========================");

	// Retrieve all groups
	console.log(await client.getAllGroups());

	console.log("==========================");
}


async function fun2(client, message) {

	console.log("==========================");

	// Retrieve all messages in chat
	console.log(await client.loadAndGetAllMessagesInChat(message.from));

	console.log("==========================");

	// Retrieve contact status
	console.log(await client.getStatus("353861938787@g.us"));

	console.log("==========================");

	// Retrieve user profile
	console.log(await client.getNumberProfile("353861938787@g.us"));

	console.log("==========================");

	// Retrieve profile fic (as url)
	console.log(await client.getProfilePicFromServer(message.from));

	console.log("==========================");

	// Retrieve chat/conversation
	console.log(await client.getChat(message.from));

	console.log("==========================");

	// Retrieve all chats
	const chats = await client.getAllChats();

	console.log("==========================");

	// Retrieve all groups
	const chats = await client.getAllGroups();
}

function start(client) {
	var default_libs = ['help', 'dirty', 'dev', 'welcome', 'admin'];
	var aycgroup = "353852563233-1584372440@g.us";
	var lastmsg = {};
	var users_last_command = {};
	var handlers = {};

	var is_spam = function(message) {
		console.log("is_spam: " + message.body);
		if(!(message.author in Object.keys(users_last_command))) {
			users_last_command[message.author] = "";
		}

		console.log(Object.keys(lastmsg));
		if(Object.keys(lastmsg).indexOf(message.from) == -1) {
			lastmsg[message.from] = [];
		}

		if(lastmsg[message.from].indexOf(message.body) > -1 && message.body.startsWith('!') == false) {
			lastmsg[message.from].shift();
			lastmsg[message.from].push(message.body);
			console.log("is_spam: true");
			return true;
		}

		if(lastmsg[message.from].length > 2) {
			lastmsg[message.from].shift();
		}

		lastmsg[message.from].push(message.body);

		console.log("is_spam: false");
		return false;
	};

	var reload = function(client, message, remaining) {
		console.log("Existing handlers: ");
		console.log(Object.keys(handlers));

		if(remaining === "reload" || Object.keys(handlers).length == 0) {
			default_libs.forEach(element => {
				var module_file = './' + element + '.js';

				if(Object.keys(handlers).indexOf(element) > -1) {
					delete handlers[element];
					var name = require.resolve(module_file);
					delete require.cache[name];
					console.log("unloaded default plugin: " + element);
				}			

				const Handler = require(module_file);
				const obj = new Handler(aycgroup);
				handlers[element] = obj; 

				console.log("loaded default plugin: " + element);
				if(remaining === "reload") { 
					client.clearChat(message.from);
					client.stopTyping(message.from);
					return true;
				};
			});
		} else {
			console.log("no reload");
		}
		return false;
	};

	var get_parts = function(first, remaining, message) {
		if(first==="!") {
			if(remaining.indexOf(' ') > -1) {
				return remaining.split(' ');
			} else {
				return [remaining];
			}
		} else {
			if(message.body.toLowerCase().indexOf(' ') > -1) {
				return remaining.split(' ');
			} else {
				return [message.body.toLowerCase()];
			}
		}
	};

	var do_handlers = function(client, message, first, command_key, parts) {
		console.log(Object.keys(handlers));
		console.log('len(handlers): ' + Object.keys(handlers).length);

		for (var key in handlers) {
			console.log("iterating handler: " + key);
			if(first === "!" && key === command_key) {
				handlers[key].do_action(client, message, parts, do_message);
				users_last_command[message.sender.id] = command_key;
				break;
			} else {
				console.log("key: " + key);

				if(key === users_last_command[message.sender.id]) {
					console.log("Subcommand: " + command_key);
					handlers[users_last_command[message.sender.id]].do_sub_action(client, message, parts, do_message);
					users_last_command[message.sender.id] = "";
					break;
				} 
				
				console.log("Message: " + parts.join(' '));
				handlers[key].do_message(client, message, parts, do_message);
				users_last_command[message.sender.id] = ""
			}
		}
	}

	var do_message = function(client, message, to, msg) {
		var stop = new Date().getTime();

		if(message!=null) client.startTyping(message.from);	
		while(new Date().getTime() < stop + 1000) {;}
		client.sendText(to, msg);
		while(new Date().getTime() < stop + 500) {;}
		if(message!=null) client.stopTyping(message.from);
	}

	client.onParticipantsChanged(aycgroup, (event) => {
		console.log(event);
		var al_ev = ["add", "invite"];
		if(al_ev.indexOf(event.action) == -1) {
			return;
		}

		for (var key in handlers) {
			handlers[key].do_new_participant(client, event.who[0], do_message);
		}
	});

	client.onMessage((message) => {
		client.sendSeen(message.from);	

		var first = message.body.toLowerCase().charAt(0);
		var remaining = message.body.substring(1);
		var parts = get_parts(first, remaining, message);
		var command_key = parts[0].toLowerCase();
		
		if(is_spam(message)) return;
		if(reload(client, message, remaining)) return;

		do_handlers(client, message, first, command_key, parts);
		client.clearChat(message.from);
	});
	
	client.onStateChange((state) => {
		console.log(state);
		const conflits = [
			sulla.SocketState.CONFLICT,
			sulla.SocketState.UNPAIRED,
			sulla.SocketState.UNLAUNCHED,
		];
		if (conflits.includes(state)) {
			client.useHere();
		}
	});

	process.on('SIGINT', function() {
		client.close();
	});
}