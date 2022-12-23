import { Gender } from "../enums/Gender";
import { MemberParty } from "./MemberParty";
import { Website } from "./Website";

export interface Member {
    PersonID: number;
    PhotoURL: string;
    Notes: string;
    BirthDate: string;
    BirthDateIsProtected: boolean;
    ParliamentaryName: string;
    PreferredName: string;
    GenderTypeID: Gender;
    IsCurrent: boolean;
    parties: MemberParty[] | undefined;
    websites: Website[] | undefined;
}