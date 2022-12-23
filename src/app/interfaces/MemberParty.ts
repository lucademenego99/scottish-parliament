import { Party } from "./Party";

export interface MemberParty {
    ID: number;
    PersonID: number;
    PartyID: number;
    ValidFromDate: string;
    ValidUntilDate: string;
    party: Party | undefined;
}