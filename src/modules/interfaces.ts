export interface modalComponents {
  wrapper: HTMLElement,
  inner: HTMLElement,
}
export type ModalContentFunction = ()=>string;
export type ModalContents = (string | ModalContentFunction | Element | [Element] | [string]);

export interface ModalOptions {
  clearOnClose?: boolean,
}

export interface ModalDefinition {
  contents: ModalContents,
  options: ModalOptions,
}

export interface AllModalDefinitions {
  [hash:string]: ModalDefinition,
}

export type AddModalFunction = (hashTrigger:string, contents:ModalContents, options?:ModalOptions)=>void