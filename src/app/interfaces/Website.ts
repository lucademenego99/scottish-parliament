import { WebsiteType } from "../enums/WebsiteType";

export interface Website {
    ID: number;
    PersonID: number;
    WebsiteType: WebsiteType;
    WebURL: string;
    IsDefault: boolean;
}