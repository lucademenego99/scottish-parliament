import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Member } from '../interfaces/Member';
import { MemberParty } from '../interfaces/MemberParty';
import { lastValueFrom } from 'rxjs';
import { Party } from '../interfaces/Party';
import { Website } from '../interfaces/Website';
import { MembersServiceInt } from '../interfaces/MembersServiceInt';
import { map } from 'rxjs/operators';

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
            this.members = await lastValueFrom(this.http.get<Member[]>('https://data.parliament.scot/api/members').pipe(
                // Convert date strings to the appropriate format for display
                map((response: Member[]) => {
                    response.forEach((member: Member) => {
                        member.BirthDate = member.BirthDate ? new Date(member.BirthDate).toLocaleString('en-US', {month: 'long', year: 'numeric', day:'numeric'}) : "";
                    });
                    return response;
                })
            ));
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
        // If the member parties have not been cached, get them from the API
        if (this.memberParties.length <= 0) {
            this.memberParties = await lastValueFrom(this.http.get<MemberParty[]>('https://data.parliament.scot/api/memberparties').pipe(
                // Convert date strings to the appropriate format for display
                map((response: MemberParty[]) => {
                    response.forEach((memberParty: MemberParty) => {
                        memberParty.ValidFromDate = new Date(memberParty.ValidFromDate).toLocaleString('en-US', {month: 'long', year: 'numeric', day:'numeric'});
                        memberParty.ValidUntilDate = new Date(memberParty.ValidUntilDate).toLocaleString('en-US', {month: 'long', year: 'numeric', day:'numeric'});
                    });
                    return response;
                })
            ));
        }
        return this.memberParties;
    }

    async getWebsites() {
        // If the websites have not been cached, get them from the API
        if (this.websites.length <= 0) {
            this.websites = await lastValueFrom(this.http.get<Website[]>('https://data.parliament.scot/api/websites'));
        }
        return this.websites;
    }

    async getParties(): Promise<Party[]> {
        // If the parties have not been cached, get them from the API
        if (this.parties.length <= 0) {
            this.parties = await lastValueFrom(this.http.get<Party[]>('https://data.parliament.scot/api/parties').pipe(
                // Convert date strings to the appropriate format for display
                map((response: Party[]) => {
                    response.forEach((party: Party) => {
                        party.ValidFromDate = new Date(party.ValidFromDate).toLocaleString('en-US', {month: 'long', year: 'numeric', day:'numeric'});
                        party.ValidUntilDate = new Date(party.ValidUntilDate).toLocaleString('en-US', {month: 'long', year: 'numeric', day:'numeric'});
                    });
                    return response;
                })
            ));
        }
        return this.parties;
    }

    async getMemberWebsites(id: number): Promise<Website[]> {
        // Get all websites with PersonID === id
        const websites = await this.getWebsites();
        return websites.filter(website => website.PersonID === id);
    }

    async getMemberPartiesOfMember(id: number): Promise<MemberParty[] | undefined> {
        // Get all memberparties with PersonID === id
        const memberParties = (await this.getMemberParties()).filter(memberParty => memberParty.PersonID === id);

        // Get all parties
        const parties = await this.getParties();

        // For each memberParties object, add the corresponding party object
        memberParties.forEach(memberParty => {
            memberParty.party = parties.find(party => party.ID === memberParty.PartyID);
        });
        return memberParties;
    }

    async getMemberDetails(id: number): Promise<Member | undefined> {
        // Get the member with the given id
        const member = (await this.getMembers()).find(member => member.PersonID === id);;
        if (member === undefined) {
            return undefined;
        }

        // Get the member's parties
        const parties = await this.getMemberPartiesOfMember(id);
        member.parties = parties;

        // Get the member's websites
        const websites = await this.getMemberWebsites(id);
        member.websites = websites;

        return member;
    }
}