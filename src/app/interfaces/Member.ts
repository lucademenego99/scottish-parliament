import { Gender } from "../enums/Gender";
import { Party } from "./Party";
import { Website } from "./Website";

export interface Member {
    PersonID: number;
    PhotoURL: string;
    Notes: string;
    BirthDate: string;
    BirthDateIsProtected: boolean;
    ParliamentaryName: string;
    PreferredName: string;
    Gender: Gender;
    isCurrent: boolean;
    party: Party | undefined;
    websites: Website[] | undefined;
}