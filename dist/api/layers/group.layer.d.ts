import { Page } from 'puppeteer';
import { Contact, GroupCreation, Id } from '../model';
import { RetrieverLayer } from './retriever.layer';
export declare class GroupLayer extends RetrieverLayer {
    constructor(page: Page);
    /**
     * Removes the host device from the group
     * @param groupId group id
     */
    leaveGroup(groupId: string): Promise<any>;
    /**
     * Retrieves group members as [Id] objects
     * @param groupId group id
     */
    getGroupMembersIds(groupId: string): Promise<Id[]>;
    /**
     * Returns group members [Contact] objects
     * @param groupId
     */
    getGroupMembers(groupId: string): Promise<Contact[]>;
    /**
     * Generates group-invite link
     * @param chatId
     * @returns Invitation link
     */
    getGroupInviteLink(chatId: string): Promise<string>;
    /**
     * Creates a new chat group
     * @param groupName Group name
     * @param contacts Contacts that should be added.
     */
    createGroup(groupName: string, contacts: string | string[]): Promise<GroupCreation>;
    /**
     * Removes participant from group
     * @param groupId Chat id ('0000000000-00000000@g.us')
     * @param participantId Participant id'000000000000@c.us'
     */
    removeParticipant(groupId: string, participantId: string): Promise<void>;
    /**
     * Adds participant to Group
     * @param groupId Chat id ('0000000000-00000000@g.us')
     * @param participantId Participant id'000000000000@c.us'
     */
    addParticipant(groupId: string, participantId: string): Promise<void>;
    /**
     * Promotes participant as Admin in given group
     * @param groupId Chat id ('0000000000-00000000@g.us')
     * @param participantId Participant id'000000000000@c.us'
     */
    promoteParticipant(groupId: string, participantId: string): Promise<void>;
    /**
     * Demotes admin privileges of participant
     * @param groupId Chat id ('0000000000-00000000@g.us')
     * @param participantId Participant id'000000000000@c.us'
     */
    demoteParticipant(groupId: string, participantId: string): Promise<void>;
    /**
     * Retrieves group admins
     * @param chatId Group/Chat id ('0000000000-00000000@g.us')
     */
    getGroupAdmins(chatId: string): Promise<Contact[]>;
}
