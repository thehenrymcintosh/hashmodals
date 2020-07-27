export declare function hasClass(element: HTMLElement, class_name: string): boolean;
export declare function addClass(element: HTMLElement, class_name: string): void;
export declare function removeClass(element: HTMLElement, class_name: string): void;
export declare function toggleClass(element: HTMLElement, class_name: string, override?: boolean): void;
interface inline_styles {
    [k: string]: string;
}
export declare function css(element: HTMLElement, props: inline_styles): void;
export declare function html(element: HTMLElement, set_to: string): void;
export declare function parseHTML(html: string): Node;
export declare function onTransitionEnd(element: HTMLElement, callback: () => void): void;
export {};
