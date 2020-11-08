export interface Property {
    type: string;
    name: string;
    value?: any;
    autoUpdate: boolean | null;
    link: boolean | null;
    own: boolean;
}

export interface Properties {
    name: Property;
    [key: string]: Property;
}

export interface PropertyUpdate {
    id: string;
    name: string;
    update: Property;
}
