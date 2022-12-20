import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../interfaces/Member';
import { MemberParty } from '../interfaces/MemberParty';
import { lastValueFrom } from 'rxjs';
import { Party } from '../interfaces/Party';
import { Website } from '../interfaces/Website';
import { MembersServiceInt } from '../interfaces/MembersServiceInt';

@Injectable({
    providedIn: 'root'
})
export class MembersService implements MembersServiceInt {
    constructor(private http: HttpClient) { }

    /**
     * Cached members
     */
    members: Member[] = [];

    /**
     * Cached parties
     */
    parties: Party[] = [];

    /**
     * Cached member parties
     */
    memberParties: MemberParty[] = [];

    /**
     * Cached websites
     */
    websites: Website[] = [];

    async getMembers(): Promise<Member[]> {
        if (this.members.length <= 0) {
            this.members = await lastValueFrom(this.http.get<Member[]>('https://data.parliament.scot/api/members'));
        }
        return this.members;
    }

    async getMemberParties(): Promise<MemberParty[]> {
        if (this.memberParties.length <= 0) {
            this.memberParties = await lastValueFrom(this.http.get<MemberParty[]>('https://data.parliament.scot/api/memberparties'));
        }
        return this.memberParties;
    }

    async getWebsites() {
        if (this.websites.length <= 0) {
            this.websites = await lastValueFrom(this.http.get<Website[]>('https://data.parliament.scot/api/websites'));
        }
        return this.websites;
    }

    async getParties(): Promise<Party[]> {
        if (this.parties.length <= 0) {
            this.parties = await lastValueFrom(this.http.get<Party[]>('https://data.parliament.scot/api/parties'));
        }
        return this.parties;
    }

    async getMemberWebsites(id: number): Promise<Website[]> {
        const websites = await this.getWebsites();
        return websites.filter(website => website.PersonID === id);
    }

    async getMemberParty(id: number): Promise<Party | undefined> {
        const memberParties = await this.getMemberParties();
        const partyID = memberParties.find(memberParty => memberParty.PersonID === id)?.PartyID;
        const parties = await this.getParties();
        return parties.find(party => party.ID === partyID);
    }

    async getMemberDetails(id: number): Promise<Member | undefined> {
        const members = await this.getMembers();
        const member = members.find(member => member.PersonID === id);

        if (member === undefined) {
            return undefined;
        }

        const party = await this.getMemberParty(id);
        member.party = party;

        const websites = await this.getMemberWebsites(id);
        member.websites = websites;

        return member;
    }
}