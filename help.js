module.exports = class help {
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
	   
		console.log("1");
		do_message(client, message, recip, 'Hi ' + message.sender.pushname + ',\n\nHow can i help?\n\n1 ) Reset password \n2 ) Unlock account');
		console.log("2");
    }

    do_sub_action(client, message, commands, do_message){
		var fs = require('fs');
		var https = require('https');

		console.log("help: " + message);
		
        if (message.body === '1') {
			do_message(client, message, message.from, 'Standby, resetting your password...');

			var token = fs.readFileSync('../github-token', 'utf8');

			console.log("token: " + token);
			console.log("requester:" + message.sender.id);
			var phone = message.sender.id.split('@');

			var options = {
				host: 'ashtangayoga.ie',
				port: 443,
				path: '/json/?a=whatsapp&sa=r&n=' + phone[0] + '&t=' + token
			};

			console.log(options.host + options.path);

			var req = https.request(options, function(res) {
				console.log('STATUS: ' + res.statusCode);
				console.log('HEADERS: ' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				var body = '';
			
				res.on('data', function (chunk) {
					body = body + chunk;
				});
			
				res.on('end',function(){
					console.log("Body :" + body);
					var resp = JSON.parse(body);
					var stop = new Date().getTime();
					
					while(new Date().getTime() < stop + 1000) {;;}
					
					if(resp.result != "") {
						do_message(client, message, message.from, "Your new password is: ");
						do_message(client, message, message.from, resp.result[1]);
					} else {
						do_message(client, message, message.from, resp.error);
					}
				});
			});

			req.on('error', function(e) {
				console.log('problem with request: ' + e.message);
			});

			req.write('\n');
			req.end();
		}

		if (message.body === '2') {
			do_message(client, message, message.from, 'Standby, unlocking your account...');

			var token = fs.readFileSync('../github-token', 'utf8');

			console.log("token: " + token);
			console.log("requester:" + message.sender.id);
			var phone = message.sender.id.split('@');

			var options = {
				host: 'ashtangayoga.ie',
				port: 443,
				path: '/json/?a=whatsapp&sa=u&n=' + phone[0] + '&t=' + token
			};

			console.log(options.host + options.path);

			var req = https.request(options, function(res) {
				console.log('STATUS: ' + res.statusCode);
				console.log('HEADERS: ' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				var body = '';
			
				res.on('data', function (chunk) {
					body = body + chunk;
				});
			
				res.on('end',function(){
					console.log("Body :" + body);
					var resp = JSON.parse(body);
					var stop = new Date().getTime();
					
					while(new Date().getTime() < stop + 1000) {
        				;
					}
					
					if(resp.result != "") {
						do_message(client, message, message.from, resp.result[1]);
					} else {
						do_message(client, message, message.from, resp.error);
					}
				});
			});

			req.on('error', function(e) {
				console.log('problem with request: ' + e.message);
			});

			req.write('\n');
			req.end();
		}
    }

    do_message(client, message, commands, do_message) {
		
	}
	
	do_new_participant(client, who, do_message) {

    }
};