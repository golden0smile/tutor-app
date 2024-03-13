"use strict";(self.webpackChunksea_tutor_react=self.webpackChunksea_tutor_react||[]).push([[905],{40106:function(e,t,n){var o=n(47313),r=n(75192),i=n.n(r),s=n(46123),a=n.n(s),c=n(58946),l=n(30986),u=["tag","baseClass","baseClassActive","className","cssModule","children","innerRef"];function p(){return p=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},p.apply(this,arguments)}function d(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function f(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?f(Object(n),!0).forEach((function(t){b(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):f(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=h(h({},c.ZP.propTypes),{},{children:i().oneOfType([i().arrayOf(i().node),i().node]),tag:l.iC,baseClass:i().string,baseClassActive:i().string,className:i().string,cssModule:i().object,innerRef:i().oneOfType([i().object,i().string,i().func])}),m=h(h({},c.ZP.defaultProps),{},{timeout:l.wF.Fade,appear:!0,enter:!0,exit:!0,in:!0});function g(e){var t=(0,o.useRef)(null),n=e.tag,r=void 0===n?"div":n,i=e.baseClass,s=void 0===i?"fade":i,f=e.baseClassActive,b=void 0===f?"show":f,y=e.className,g=e.cssModule,v=e.children,O=e.innerRef,w=void 0===O?t:O,k=d(e,u),C=(0,l.ei)(h({defaultProps:m},k),l.rb),j=(0,l.CE)(k,l.rb);return o.createElement(c.ZP,p({nodeRef:w},C),(function(e){var t="entered"===e,n=(0,l.mx)(a()(y,s,t&&b),g);return o.createElement(r,p({className:n},j,{ref:w}),v)}))}g.propTypes=y,g.defaultProps=m,t.Z=g},16707:function(e,t,n){n.d(t,{Z:function(){return D}});var o=n(47313),r=n(75192),i=n.n(r),s=n(46123),a=n.n(s),c=n(1168),l=n(30986);function u(e){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(e)}function p(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function d(e,t){return d=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},d(e,t)}function f(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=h(e);if(t){var r=h(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return function(e,t){if(t&&("object"===u(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,n)}}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}var b={children:i().node.isRequired,node:i().any},y=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(i,e);var t,n,o,r=f(i);function i(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),r.apply(this,arguments)}return t=i,(n=[{key:"componentWillUnmount",value:function(){this.defaultNode&&document.body.removeChild(this.defaultNode),this.defaultNode=null}},{key:"render",value:function(){return l.Nq?(this.props.node||this.defaultNode||(this.defaultNode=document.createElement("div"),document.body.appendChild(this.defaultNode)),c.createPortal(this.props.children,this.props.node||this.defaultNode)):null}}])&&p(t.prototype,n),o&&p(t,o),Object.defineProperty(t,"prototype",{writable:!1}),i}(o.Component);y.propTypes=b;var m=y,g=n(40106);function v(e){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},v(e)}function O(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?O(Object(n),!0).forEach((function(t){C(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):O(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function k(){return k=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},k.apply(this,arguments)}function C(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function j(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function E(e,t){return E=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},E(e,t)}function _(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=P(e);if(t){var r=P(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return function(e,t){if(t&&("object"===v(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return x(e)}(this,n)}}function x(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function P(e){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},P(e)}function T(){}var N=i().shape(g.Z.propTypes),S={autoFocus:i().bool,backdrop:i().oneOfType([i().bool,i().oneOf(["static"])]),backdropClassName:i().string,backdropTransition:N,centered:i().bool,children:i().node,contentClassName:i().string,className:i().string,container:l.qW,cssModule:i().object,external:i().node,fade:i().bool,fullscreen:i().oneOfType([i().bool,i().oneOf(["sm","md","lg","xl"])]),innerRef:i().oneOfType([i().object,i().string,i().func]),isOpen:i().bool,keyboard:i().bool,labelledBy:i().string,modalClassName:i().string,modalTransition:N,onClosed:i().func,onEnter:i().func,onExit:i().func,onOpened:i().func,returnFocusAfterClose:i().bool,role:i().string,scrollable:i().bool,size:i().string,toggle:i().func,trapFocus:i().bool,unmountOnClose:i().bool,wrapClassName:i().string,zIndex:i().oneOfType([i().number,i().string])},F=Object.keys(S),A={isOpen:!1,autoFocus:!0,centered:!1,scrollable:!1,role:"dialog",backdrop:!0,keyboard:!0,zIndex:1050,fade:!0,onOpened:T,onClosed:T,modalTransition:{timeout:l.wF.Modal},backdropTransition:{mountOnEnter:!0,timeout:l.wF.Fade},unmountOnClose:!0,returnFocusAfterClose:!0,container:"body",trapFocus:!1},B=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&E(e,t)}(s,e);var t,n,r,i=_(s);function s(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,s),(t=i.call(this,e))._element=null,t._originalBodyPadding=null,t.getFocusableChildren=t.getFocusableChildren.bind(x(t)),t.handleBackdropClick=t.handleBackdropClick.bind(x(t)),t.handleBackdropMouseDown=t.handleBackdropMouseDown.bind(x(t)),t.handleEscape=t.handleEscape.bind(x(t)),t.handleStaticBackdropAnimation=t.handleStaticBackdropAnimation.bind(x(t)),t.handleTab=t.handleTab.bind(x(t)),t.onOpened=t.onOpened.bind(x(t)),t.onClosed=t.onClosed.bind(x(t)),t.manageFocusAfterClose=t.manageFocusAfterClose.bind(x(t)),t.clearBackdropAnimationTimeout=t.clearBackdropAnimationTimeout.bind(x(t)),t.trapFocus=t.trapFocus.bind(x(t)),t.state={isOpen:!1,showStaticBackdropAnimation:!1},t}return t=s,(n=[{key:"componentDidMount",value:function(){var e=this.props,t=e.isOpen,n=e.autoFocus,o=e.onEnter;t&&(this.init(),this.setState({isOpen:!0}),n&&this.setFocus()),o&&o(),document.addEventListener("focus",this.trapFocus,!0),this._isMounted=!0}},{key:"componentDidUpdate",value:function(e,t){if(this.props.isOpen&&!e.isOpen)return this.init(),void this.setState({isOpen:!0});this.props.autoFocus&&this.state.isOpen&&!t.isOpen&&this.setFocus(),this._element&&e.zIndex!==this.props.zIndex&&(this._element.style.zIndex=this.props.zIndex)}},{key:"componentWillUnmount",value:function(){this.clearBackdropAnimationTimeout(),this.props.onExit&&this.props.onExit(),this._element&&(this.destroy(),(this.props.isOpen||this.state.isOpen)&&this.close()),document.removeEventListener("focus",this.trapFocus,!0),this._isMounted=!1}},{key:"handleBackdropClick",value:function(e){if(e.target===this._mouseDownElement){e.stopPropagation();var t=this._dialog?this._dialog.parentNode:null;if(t&&e.target===t&&"static"===this.props.backdrop&&this.handleStaticBackdropAnimation(),!this.props.isOpen||!0!==this.props.backdrop)return;t&&e.target===t&&this.props.toggle&&this.props.toggle(e)}}},{key:"handleTab",value:function(e){if(9===e.which&&!(this.modalIndex<s.openCount-1)){var t=this.getFocusableChildren(),n=t.length;if(0!==n){for(var o=this.getFocusedChild(),r=0,i=0;i<n;i+=1)if(t[i]===o){r=i;break}e.shiftKey&&0===r?(e.preventDefault(),t[n-1].focus()):e.shiftKey||r!==n-1||(e.preventDefault(),t[0].focus())}}}},{key:"handleBackdropMouseDown",value:function(e){this._mouseDownElement=e.target}},{key:"handleEscape",value:function(e){this.props.isOpen&&e.keyCode===l.Do.esc&&this.props.toggle&&(this.props.keyboard?(e.preventDefault(),e.stopPropagation(),this.props.toggle(e)):"static"===this.props.backdrop&&(e.preventDefault(),e.stopPropagation(),this.handleStaticBackdropAnimation()))}},{key:"handleStaticBackdropAnimation",value:function(){var e=this;this.clearBackdropAnimationTimeout(),this.setState({showStaticBackdropAnimation:!0}),this._backdropAnimationTimeout=setTimeout((function(){e.setState({showStaticBackdropAnimation:!1})}),100)}},{key:"onOpened",value:function(e,t){this.props.onOpened(),(this.props.modalTransition.onEntered||T)(e,t)}},{key:"onClosed",value:function(e){var t=this.props.unmountOnClose;this.props.onClosed(),(this.props.modalTransition.onExited||T)(e),t&&this.destroy(),this.close(),this._isMounted&&this.setState({isOpen:!1})}},{key:"setFocus",value:function(){this._dialog&&this._dialog.parentNode&&"function"===typeof this._dialog.parentNode.focus&&this._dialog.parentNode.focus()}},{key:"getFocusableChildren",value:function(){return this._element.querySelectorAll(l.ku.join(", "))}},{key:"getFocusedChild",value:function(){var e,t=this.getFocusableChildren();try{e=document.activeElement}catch(n){e=t[0]}return e}},{key:"trapFocus",value:function(e){if(this.props.trapFocus&&this._element&&(!this._dialog||this._dialog.parentNode!==e.target)&&!(this.modalIndex<s.openCount-1)){for(var t=this.getFocusableChildren(),n=0;n<t.length;n+=1)if(t[n]===e.target)return;t.length>0&&(e.preventDefault(),e.stopPropagation(),t[0].focus())}}},{key:"init",value:function(){try{this._triggeringElement=document.activeElement}catch(e){this._triggeringElement=null}this._element||(this._element=document.createElement("div"),this._element.setAttribute("tabindex","-1"),this._element.style.position="relative",this._element.style.zIndex=this.props.zIndex,this._mountContainer=(0,l.U9)(this.props.container),this._mountContainer.appendChild(this._element)),this._originalBodyPadding=(0,l.X9)(),s.openCount<1&&(s.originalBodyOverflow=window.getComputedStyle(document.body).overflow),(0,l.Rf)(),0===s.openCount&&(document.body.className=a()(document.body.className,(0,l.mx)("modal-open",this.props.cssModule)),document.body.style.overflow="hidden"),this.modalIndex=s.openCount,s.openCount+=1}},{key:"destroy",value:function(){this._element&&(this._mountContainer.removeChild(this._element),this._element=null),this.manageFocusAfterClose()}},{key:"manageFocusAfterClose",value:function(){if(this._triggeringElement){var e=this.props.returnFocusAfterClose;this._triggeringElement.focus&&e&&this._triggeringElement.focus(),this._triggeringElement=null}}},{key:"close",value:function(){if(s.openCount<=1){var e=(0,l.mx)("modal-open",this.props.cssModule),t=new RegExp("(^| )".concat(e,"( |$)"));document.body.className=document.body.className.replace(t," ").trim(),document.body.style.overflow=s.originalBodyOverflow}this.manageFocusAfterClose(),s.openCount=Math.max(0,s.openCount-1),(0,l.pp)(this._originalBodyPadding)}},{key:"clearBackdropAnimationTimeout",value:function(){this._backdropAnimationTimeout&&(clearTimeout(this._backdropAnimationTimeout),this._backdropAnimationTimeout=void 0)}},{key:"renderModalDialog",value:function(){var e,t=this,n=(0,l.CE)(this.props,F),r="modal-dialog";return o.createElement("div",k({},n,{className:(0,l.mx)(a()(r,this.props.className,(e={},C(e,"modal-".concat(this.props.size),this.props.size),C(e,"".concat(r,"-centered"),this.props.centered),C(e,"".concat(r,"-scrollable"),this.props.scrollable),C(e,"modal-fullscreen",!0===this.props.fullscreen),C(e,"modal-fullscreen-".concat(this.props.fullscreen,"-down"),"string"===typeof this.props.fullscreen),e)),this.props.cssModule),role:"document",ref:function(e){t._dialog=e}}),o.createElement("div",{className:(0,l.mx)(a()("modal-content",this.props.contentClassName),this.props.cssModule)},this.props.children))}},{key:"render",value:function(){var e=this.props.unmountOnClose;if(this._element&&(this.state.isOpen||!e)){var t=!!this._element&&!this.state.isOpen&&!e;this._element.style.display=t?"none":"block";var n=this.props,r=n.wrapClassName,i=n.modalClassName,s=n.backdropClassName,c=n.cssModule,u=n.isOpen,p=n.backdrop,d=n.role,f=n.labelledBy,h=n.external,b=n.innerRef,y={onClick:this.handleBackdropClick,onMouseDown:this.handleBackdropMouseDown,onKeyUp:this.handleEscape,onKeyDown:this.handleTab,style:{display:"block"},"aria-labelledby":f,"aria-modal":!0,role:d,tabIndex:"-1"},v=this.props.fade,O=w(w(w({},g.Z.defaultProps),this.props.modalTransition),{},{baseClass:v?this.props.modalTransition.baseClass:"",timeout:v?this.props.modalTransition.timeout:0}),C=w(w(w({},g.Z.defaultProps),this.props.backdropTransition),{},{baseClass:v?this.props.backdropTransition.baseClass:"",timeout:v?this.props.backdropTransition.timeout:0}),j=p&&(v?o.createElement(g.Z,k({},C,{in:u&&!!p,cssModule:c,className:(0,l.mx)(a()("modal-backdrop",s),c)})):o.createElement("div",{className:(0,l.mx)(a()("modal-backdrop","show",s),c)}));return o.createElement(m,{node:this._element},o.createElement("div",{className:(0,l.mx)(r)},o.createElement(g.Z,k({},y,O,{in:u,onEntered:this.onOpened,onExited:this.onClosed,cssModule:c,className:(0,l.mx)(a()("modal",i,this.state.showStaticBackdropAnimation&&"modal-static"),c),innerRef:b}),h,this.renderModalDialog()),j))}return null}}])&&j(t.prototype,n),r&&j(t,r),Object.defineProperty(t,"prototype",{writable:!1}),s}(o.Component);B.propTypes=S,B.defaultProps=A,B.openCount=0,B.originalBodyOverflow=null;var D=B},68642:function(e,t,n){var o=n(47313),r=n(75192),i=n.n(r),s=n(46123),a=n.n(s),c=n(30986),l=["className","cssModule","tag"];function u(){return u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},u.apply(this,arguments)}function p(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d={className:i().string,cssModule:i().object,tag:c.iC};function f(e){var t=e.className,n=e.cssModule,r=e.tag,i=void 0===r?"div":r,s=p(e,l),d=(0,c.mx)(a()(t,"modal-body"),n);return o.createElement(i,u({},s,{className:d}))}f.propTypes=d,t.Z=f},30986:function(e,t,n){n.d(t,{CE:function(){return p},Do:function(){return k},E5:function(){return w},JL:function(){return C},Nq:function(){return j},Rf:function(){return l},U9:function(){return T},X9:function(){return c},ei:function(){return d},iC:function(){return g},ku:function(){return N},mx:function(){return u},n5:function(){return y},pp:function(){return a},qW:function(){return m},rb:function(){return O},wF:function(){return v},x9:function(){return h}});var o,r=n(75192),i=n.n(r);function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function a(e){document.body.style.paddingRight=e>0?"".concat(e,"px"):null}function c(){var e=window.getComputedStyle(document.body,null);return parseInt(e&&e.getPropertyValue("padding-right")||0,10)}function l(){var e=function(){var e=document.createElement("div");e.style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}(),t=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],n=t?parseInt(t.style.paddingRight||0,10):0;document.body.clientWidth<window.innerWidth&&a(n+e)}function u(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o;return t?e.split(" ").map((function(e){return t[e]||e})).join(" "):e}function p(e,t){var n={};return Object.keys(e).forEach((function(o){-1===t.indexOf(o)&&(n[o]=e[o])})),n}function d(e,t){for(var n,o=Array.isArray(t)?t:[t],r=o.length,i={};r>0;)i[n=o[r-=1]]=e[n];return i}var f={};function h(e,t){return function(n,o,r){var i;null!==n[o]&&"undefined"!==typeof n[o]&&(i='"'.concat(o,'" property of "').concat(r,'" has been deprecated.\n').concat(t),f[i]||("undefined"!==typeof console&&console.error(i),f[i]=!0));for(var s=arguments.length,a=new Array(s>3?s-3:0),c=3;c<s;c++)a[c-3]=arguments[c];return e.apply(void 0,[n,o,r].concat(a))}}var b="object"===("undefined"===typeof window?"undefined":s(window))&&window.Element||function(){};function y(e,t,n){if(!(e[t]instanceof b))return new Error("Invalid prop `"+t+"` supplied to `"+n+"`. Expected prop to be an instance of Element. Validation failed.")}var m=i().oneOfType([i().string,i().func,y,i().shape({current:i().any})]),g=i().oneOfType([i().func,i().string,i().shape({$$typeof:i().symbol,render:i().func}),i().arrayOf(i().oneOfType([i().func,i().string,i().shape({$$typeof:i().symbol,render:i().func})]))]),v={Fade:150,Collapse:350,Modal:300,Carousel:600,Offcanvas:300},O=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],w={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},k={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},C=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],j=!("undefined"===typeof window||!window.document||!window.document.createElement);function E(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}function _(e){var t=s(e);return null!=e&&("object"===t||"function"===t)}function x(e){if(function(e){return!(!e||"object"!==s(e))&&"current"in e}(e))return e.current;if(function(e){if(!_(e))return!1;var t=E(e);return"[object Function]"===t||"[object AsyncFunction]"===t||"[object GeneratorFunction]"===t||"[object Proxy]"===t}(e))return e();if("string"===typeof e&&j){var t=document.querySelectorAll(e);if(t.length||(t=document.querySelectorAll("#".concat(e))),!t.length)throw new Error("The target '".concat(e,"' could not be identified in the dom, tip: check spelling"));return t}return e}function P(e){return null!==e&&(Array.isArray(e)||j&&"number"===typeof e.length)}function T(e,t){var n=x(e);return t?P(n)?n:null===n?[]:[n]:P(n)?n[0]:n}var N=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal):not(.offcanvas)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']}}]);