export interface modalComponents {
    wrapper: HTMLElement;
    inner: HTMLElement;
}
export declare type ModalContentFunction = () => string;
export declare type ModalContents = (string | ModalContentFunction | Element | [Element] | [string]);
export interface ModalOptions {
    clearOnClose?: boolean;
}
export interface ModalDefinition {
    contents: ModalContents;
    options: ModalOptions;
}
export interface AllModalDefinitions {
    [hash: string]: ModalDefinition;
}
export declare type AddModalFunction = (hashTrigger: string, contents: ModalContents, options?: ModalOptions) => void;
