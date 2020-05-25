module.exports = class welcome {
    constructor(group) {
        this.group = group
    }

    async make_admin(client, who, do_message) {
        var users = await client.getGroupMembers(this.group);
        await client.promoteParticipant(groupId, '353861938787@c.us');
        await client.promoteParticipant(groupId, '353852563233@c.us');
        await client.promoteParticipant(groupId, '353852619862@c.us');
    }
  
    do_action(client, message, commands, do_message) {
       
    }

    do_sub_action(client, message, commands, do_message) {
		
    }

    do_message(client, message, commands, do_message) {
       
    }

    do_new_participant(client, who, do_message) {

    }
};