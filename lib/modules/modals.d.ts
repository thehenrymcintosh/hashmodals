import { ModalContents, ModalOptions } from "./interfaces";
declare function addModal(hashTrigger: string, contents: ModalContents, options?: ModalOptions): true | undefined;
declare function init(): void;
declare const _default: {
    init: typeof init;
    addModal: typeof addModal;
};
export default _default;
