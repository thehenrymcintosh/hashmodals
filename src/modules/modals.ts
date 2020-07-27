import scrollfreeze from "./scrollfreeze";
import { 
  modalComponents,
  ModalContents,
  AllModalDefinitions,
  ModalOptions,
  AddModalFunction,
} from "./interfaces";
import { hasClass, css, toggleClass, html, parseHTML, onTransitionEnd } from "./util";

function kickWindowEvent(name:string, data = {}) {
  const event = new Event(`modal::${name}`, data);
  window.dispatchEvent(event);
}

function isElement(element:ModalContents) {
  return element instanceof Element || element instanceof HTMLDocument;
}
function isFunction(functionToCheck:ModalContents) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function getModalFrame() : modalComponents {
  let modalWrapper = document.getElementById('modal__wrapper');
  let modalInner = document.getElementById('modal__inner');
  if ( !modalWrapper || !modalInner ) {
    document.body.append(parseHTML(
      `<div id="modal__wrapper" class="hashmodal__wrapper">
        <a id="modal__background" href="#closemodal" class="hashmodal__background"></a>
        <div id="modal" class="hashmodal">
          <a href="#closemodal" class="hashmodal__close" id="modal__close"></a>
          <div class="hashmodal__inner" id="modal__inner"></div>
        </div>
      </div>`));
      modalWrapper = document.getElementById('modal__wrapper');
      modalInner = document.getElementById('modal__inner');
      if ( !modalWrapper || !modalInner ) {
        throw new Error("Can't create modals!");
      }
  }
  return {
    wrapper: modalWrapper,
    inner: modalInner,
  }
}

const hashes:AllModalDefinitions = {};
let initialised = false;

function addModal(hashTrigger:string, contents:ModalContents, options:ModalOptions = { clearOnClose: false }) {
  if (typeof hashTrigger !== 'string') throw new Error('Hash trigger must be a string');
  if (typeof contents !== 'string' && !isElement(contents) && !isFunction(contents)) throw new Error('Contents must be an html string or dom node, or a function which returns an html string or dom node when passed the hash!');
  if (typeof hashes[hashTrigger] !== 'undefined') throw new Error(`Hashtrigger "${hashTrigger}" already used!`);
  if (typeof options !== 'undefined') {
    if (typeof options !== 'object') throw new Error('Options must be an object');
    if (typeof options.clearOnClose !== 'undefined' && typeof options.clearOnClose !== 'boolean') throw new Error('clearOnClose Option must be a boolean');
  }
  hashes[hashTrigger] = {
    contents,
    options,
  };
  if ( !(modalWrapper && modalInner && initialised) ) return;
  if (getCurrentHash() === hashTrigger) {
    hashHandler();
  }
  return true;
};

let modalWrapper: HTMLElement | undefined;
let modalInner: HTMLElement | undefined;
function init() {
  const modal_components = getModalFrame();
  modalWrapper = modal_components.wrapper;
  modalInner = modal_components.inner;
  initialised = true;
  window.addEventListener("hashchange", hashHandler)
  hashHandler();
  kickWindowEvent('ready');
}


let open = false;
let lastOpened : (undefined | string );

function toggleModal(opening:boolean) {
  if ( !(modalWrapper && modalInner && initialised) ) return;
  if (typeof opening === 'undefined') {
    opening = !open; // if it's closed should be opening
  } else if (opening === open) {
    return; // if open should not be opening
  }
  if (opening) {
    toggleClass(modalWrapper,'block', true);
    setTimeout(()=>{
      if ( !(modalWrapper && modalInner && initialised) ) return;
      toggleClass(modalWrapper,'hide', !opening);
      toggleClass(modalWrapper,'show', opening);
    },0);
    open = true;
  } else { // closing
    onTransitionEnd(modalWrapper,()=>{
      if ( !(modalWrapper && modalInner && initialised) ) return;
      toggleClass(modalWrapper,'block', opening);
    })
    toggleClass(modalWrapper,'hide', !opening)
    toggleClass(modalWrapper,'show', opening);
    open = false;
  }
  scrollfreeze.toggleFrozen(open);
}


function getCurrentHash() {
  const {
    hash,
  } = window.location;
  if (hash.indexOf('#') >= 0) {
    const [theHash, hashString] = hash.split('#');
    if (hashString && typeof hashString === 'string') {
      const hashTrigger = hashString.trim();
      return hashTrigger;
    }
  }
  return false;
}

function setModalContents(contents?:ModalContents) {
  if ( !(modalWrapper && modalInner && initialised) ) return;
  html(modalInner,'');
  if (typeof contents === "function" ) {
    contents = contents();
  }
  if (typeof contents === 'string') {
    const html = parseHTML(contents);
    if (html) {
      modalInner.append(html);
    }
  } else if (Array.isArray(contents)) {
    contents.forEach((item:(Element|string)) => {
      if (typeof item === 'string') {
        const itemHtml = parseHTML(item);
        if (itemHtml) {
          modalInner.append(itemHtml);
        }
      } else if (isElement(item)) {
        modalInner.append(item);
      } 
    });
  } else if (!!contents && isElement(contents)) {
    modalInner.append(contents);
  }
}

function hashHandler() {
  const hash = getCurrentHash();
  if (hash) {
    if (hash === 'closemodal') {
      toggleModal(false);
      if (lastOpened) {
        const prevModal = hashes[lastOpened];
        if (prevModal && prevModal.options && prevModal.options.clearOnClose) {
          setModalContents();
        }
      }
      kickWindowEvent('close');
    } else if (hash.length > 0 && typeof hashes[hash] !== 'undefined') {
      if (lastOpened === hash ) {
        const prevModal = hashes[lastOpened];
        if ( prevModal.options && prevModal.options.clearOnClose ) {
          setModalContents(hashes[hash].contents);
        }
      } else {
        setModalContents(hashes[hash].contents);
      }
      lastOpened = hash;
      toggleModal(true);
      kickWindowEvent('open');
    }
  }
}

export default {
  init,
  addModal,
};