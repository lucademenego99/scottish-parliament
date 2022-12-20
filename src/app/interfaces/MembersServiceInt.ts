import { Member } from '../interfaces/Member';
import { MemberParty } from '../interfaces/MemberParty';
import { Party } from '../interfaces/Party';
import { Website } from '../interfaces/Website';


export interface MembersServiceInt {
    /**
     * Get all members
     * 
     * @returns {Promise<Member[]>}
     */
    getMembers(): Promise<Member[]>;

    /**
     * Get all member parties
     * 
     * @returns {Promise<MemberParty[]>}
     */
    getMemberParties(): Promise<MemberParty[]>;

    /**
     * Get all websites
     * 
     * @returns {Promise<Website[]>}
     */
    getWebsites(): Promise<Website[]>;

    /**
     * Get all parties
     * 
     * @returns {Promise<Party[]>}
     */
    getParties(): Promise<Party[]>;

    /**
     * Get all websites of a member
     * 
     * @param {number} id member's ID
     * @returns {Promise<Website[]>}
     */
     getMemberWebsites(id: number): Promise<Website[]>;

    /**
     * Get the party of a member
     * 
     * @param {number} id member's ID
     * @returns {Promise<Party | undefined>}
     */
    getMemberParty(id: number): Promise<Party | undefined>;

    /**
     * Get all details of a member
     * 
     * @param {number} id member's ID
     * @returns {Promise<Member | undefined>}
     */
    getMemberDetails(id: number): Promise<Member | undefined>;
}