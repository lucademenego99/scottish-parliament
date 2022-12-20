import { MemberParty } from "./MemberParty";

export interface Party {
    ID: number;
    Abbreviation: string;
    ActualName: string;
    PreferredName: string;
    Notes: string;
    ValidFromDate: string;
    ValidUntilDate: string;
    MemberParties: MemberParty[];
}