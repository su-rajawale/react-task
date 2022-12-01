export type Item = {
    key?: any,
    value?: any
}

export type PostmanForm = {
    method: string;
    query: string;
    queryParams: {}[];
    requestHeaders: {}[];
}

export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}