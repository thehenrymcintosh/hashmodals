export function hasClass( element: HTMLElement, class_name: string ) : boolean {
  return element.classList.contains( class_name );
}

export function addClass(element: HTMLElement, class_name: string ) {
  element.classList.add(class_name);
}

export function removeClass(element: HTMLElement, class_name: string ) {
  element.classList.remove(class_name);
}

export function toggleClass(element:HTMLElement, class_name: string, override?:boolean ) {
  // override = true -> add class 
  // override = false -> remove class
  // override = undefined -> just toggle
  let canAdd = true;
  let canRemove = true;
  if ( typeof override === "boolean" ) {
    if ( override ) {
      canRemove = false;
    } else {
      canAdd = false;
    }
  } 
  if ( hasClass( element, class_name )  ) {
    canRemove && removeClass( element, class_name );
  } else  {
    canAdd && addClass( element, class_name );
  }
}

interface inline_styles {
  [k:string] : string,
}

function style_str_to_obj( str:string ) : inline_styles {
  let new_styles:inline_styles = {};
  let style_strings = str.split(";");
  style_strings.forEach( style_string => {
    let [k,v] = style_string.split("=");
    new_styles[k] = v;
  })
  return new_styles;
}
function style_obj_to_str( obj:inline_styles ) : string {
  let new_styles:[string?] = [];
  Object.keys( obj ).forEach( key => {
    new_styles.push(`${key}=${obj[key]}`);
  })
  return new_styles.join(";");
}

export function css( element: HTMLElement, props:inline_styles ) {
  const current_styles = element.getAttribute("style");
  if ( current_styles ) {
    let current_style_obj = {
      ...style_str_to_obj( current_styles ),
      ...props,
    }
    element.setAttribute("style",style_obj_to_str(current_style_obj));
  } 
}

export function html( element: HTMLElement, set_to: string ) {
  element.innerHTML = set_to;
}

export function parseHTML(html:string) : Node {
  var t = document.createElement('template');
  t.innerHTML = html;
  return t.content.cloneNode(true);
}

export function onTransitionEnd(element: HTMLElement, callback:()=>void) {
  function whichTransitionEvent() : string | void {
    var t;
    var el = document.createElement('fakeelement');
    var transitions : { [k:string]:string }= {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
  }
  let listener;
  let transitionEnd = whichTransitionEvent();
  if ( transitionEnd ){
    listener = element.addEventListener(transitionEnd, callback, {
      passive: true,
      once: true,
    });
  }
}