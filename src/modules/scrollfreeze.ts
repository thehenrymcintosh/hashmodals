let scrollPosition = 0;

import { hasClass, css, toggleClass } from "./util";

interface options {
  YOffset?: number
}


export function toggleFrozen(force?:boolean, options:options = {}) {
  const body = document.body;
  const html = document.documentElement;
  if ( !body || !html ) return;
  let freeze : boolean;
  if (typeof force !== 'boolean') {
    const currentState = hasClass(body, 'noscroll');
    freeze = !currentState;
  } else {
    freeze = force;
  }

  if (freeze) {
    if (typeof options.YOffset === 'number') {
      scrollPosition = options.YOffset;
    } else {
      scrollPosition = window.pageYOffset;
    }
    css(body, { top: `-${scrollPosition}px` });
    toggleClass(body,'noscroll', true);
  } else {
    toggleClass(body,'noscroll', false);
    css(body,{ top: 'auto' });
    css(html,{ 'scroll-behavior': 'auto' });
    window.scrollTo({
      left: 0,
      top: scrollPosition,
      behavior: 'auto',
    });
    css(html, { 'scroll-behavior': '' });
  }
}

export default {
  toggleFrozen,
};
