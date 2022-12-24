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
            // Sort members such that active ones are first
            this.members.sort((a: Member, b: Member) => {
                if (a.IsCurrent && !b.IsCurrent) {
                    return -1;
                } else if (!a.IsCurrent && b.IsCurrent) {
                    return 1;
                } else {
                    return 0;
                }
            });
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

    async getMemberPartiesOfMember(id: number): Promise<MemberParty[] | undefined> {
        if (this.memberParties.length <= 0) {
            this.memberParties = await lastValueFrom(this.http.get<MemberParty[]>('https://data.parliament.scot/api/memberparties'));
        }
        // Get all memberparties with PersonID === id
        const memberParties = this.memberParties.filter(memberParty => memberParty.PersonID === id);
        const parties = await this.getParties();
        // For each memberParties object, add the corresponding party object
        memberParties.forEach(memberParty => {
            memberParty.party = parties.find(party => party.ID === memberParty.PartyID);
        });
        return memberParties;
    }

    async getMemberDetails(id: number): Promise<Member | undefined> {
        const members = await this.getMembers();
        const member = members.find(member => member.PersonID === id);
        if (member === undefined) {
            return undefined;
        }

        const parties = await this.getMemberPartiesOfMember(id);
        member.parties = parties;

        const websites = await this.getMemberWebsites(id);
        member.websites = websites;

        return member;
    }
}