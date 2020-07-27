import scrollfreeze from "./modules/scrollfreeze";
import modals from "./modules/modals";
function ready(callbackFunc: ()=>void) {
  if (document.readyState !== 'loading') {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener('DOMContentLoaded', callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState === 'complete') {
        callbackFunc();
      }
    });
  }
}

ready( () => {
  modals.addModal("test",()=>{
    return "<button>test</button>"
  });
  modals.init();
})