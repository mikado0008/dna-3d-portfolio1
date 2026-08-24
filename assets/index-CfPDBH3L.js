var Sm=Object.defineProperty;var Em=(r,t,e)=>t in r?Sm(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var Ct=(r,t,e)=>Em(r,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();var Mu="1.3.26";function md(r,t,e){return Math.max(r,Math.min(t,e))}function bm(r,t,e){return(1-e)*r+e*t}function Tm(r,t,e,n){return bm(r,t,1-Math.exp(-e*n))}function wm(r,t){return(r%t+t)%t}var Am=class{constructor(){Ct(this,"isRunning",!1);Ct(this,"value",0);Ct(this,"from",0);Ct(this,"to",0);Ct(this,"currentTime",0);Ct(this,"lerp");Ct(this,"duration");Ct(this,"easing");Ct(this,"onUpdate")}advance(r){var e;if(!this.isRunning)return;let t=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=md(0,this.currentTime/this.duration,1);t=n>=1;const i=t?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Tm(this.value,this.to,this.lerp*60,r),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,t=!0)):(this.value=this.to,t=!0);t&&this.stop(),(e=this.onUpdate)==null||e.call(this,this.value,t)}stop(){this.isRunning=!1}fromTo(r,t,{lerp:e,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=t,this.lerp=e,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function Cm(r,t){let e;return function(...n){clearTimeout(e),e=setTimeout(()=>{e=void 0,r.apply(this,n)},t)}}var Rm=class{constructor(r,t,{autoResize:e=!0,debounce:n=250}={}){Ct(this,"width",0);Ct(this,"height",0);Ct(this,"scrollHeight",0);Ct(this,"scrollWidth",0);Ct(this,"debouncedResize");Ct(this,"wrapperResizeObserver");Ct(this,"contentResizeObserver");Ct(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ct(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ct(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=t,e&&(this.debouncedResize=Cm(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,t;(r=this.wrapperResizeObserver)==null||r.disconnect(),(t=this.contentResizeObserver)==null||t.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},gd=class{constructor(){Ct(this,"events",{})}emit(r,...t){var n;const e=this.events[r]||[];for(let i=0,s=e.length;i<s;i++)(n=e[i])==null||n.call(e,...t)}on(r,t){return this.events[r]?this.events[r].push(t):this.events[r]=[t],()=>{var e;this.events[r]=(e=this.events[r])==null?void 0:e.filter(n=>t!==n)}}off(r,t){var e;this.events[r]=(e=this.events[r])==null?void 0:e.filter(n=>t!==n)}destroy(){this.events={}}};const Pm=100/6,Gi={passive:!1};function Su(r,t){return r===1?Pm:r===2?t:1}var Dm=class{constructor(r,t={wheelMultiplier:1,touchMultiplier:1}){Ct(this,"touchStart",{x:0,y:0});Ct(this,"lastDelta",{x:0,y:0});Ct(this,"window",{width:0,height:0});Ct(this,"emitter",new gd);Ct(this,"onTouchStart",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Ct(this,"onTouchMove",r=>{const{clientX:t,clientY:e}=r.targetTouches?r.targetTouches[0]:r,n=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(e-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=e,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Ct(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Ct(this,"onWheel",r=>{let{deltaX:t,deltaY:e,deltaMode:n}=r;const i=Su(n,this.window.width),s=Su(n,this.window.height);t*=i,e*=s,t*=this.options.wheelMultiplier,e*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:t,deltaY:e,event:r})});Ct(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=t,window.addEventListener("resize",this.onWindowResize),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Gi),this.element.addEventListener("touchstart",this.onTouchStart,Gi),this.element.addEventListener("touchmove",this.onTouchMove,Gi),this.element.addEventListener("touchend",this.onTouchEnd,Gi)}on(r,t){return this.emitter.on(r,t)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize),this.element.removeEventListener("wheel",this.onWheel,Gi),this.element.removeEventListener("touchstart",this.onTouchStart,Gi),this.element.removeEventListener("touchmove",this.onTouchMove,Gi),this.element.removeEventListener("touchend",this.onTouchEnd,Gi)}};const Eu=r=>Math.min(1,1.001-2**(-10*r));var Lm=class{constructor({wrapper:r=window,content:t=document.documentElement,eventsTarget:e=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:h=!1,orientation:u="vertical",gestureOrientation:f=u==="horizontal"?"both":"vertical",touchMultiplier:d=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:m,virtualScroll:p,overscroll:S=!0,autoRaf:M=!1,anchors:v=!1,autoToggle:C=!1,allowNestedScroll:w=!1,__experimental__naiveDimensions:b=!1,naiveDimensions:R=b,stopInertiaOnNavigate:y=!1,respectReducedMotion:x=!0}={}){Ct(this,"_isScrolling",!1);Ct(this,"_isStopped",!1);Ct(this,"_isLocked",!1);Ct(this,"_preventNextNativeScrollEvent",!1);Ct(this,"_resetVelocityTimeout",null);Ct(this,"_rafId",null);Ct(this,"_isDraggingSelection",!1);Ct(this,"reducedMotionMediaQuery",window.matchMedia("(prefers-reduced-motion: reduce)"));Ct(this,"isTouching");Ct(this,"isIos");Ct(this,"time",0);Ct(this,"userData",{});Ct(this,"lastVelocity",0);Ct(this,"velocity",0);Ct(this,"direction",0);Ct(this,"options");Ct(this,"targetScroll");Ct(this,"animatedScroll");Ct(this,"animate",new Am);Ct(this,"emitter",new gd);Ct(this,"dimensions");Ct(this,"virtualScroll");Ct(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Ct(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ct(this,"onTransitionEnd",r=>{var t;(t=r.propertyName)!=null&&t.includes("overflow")&&r.target===this.rootElement&&this.checkOverflow()});Ct(this,"onClick",r=>{const t=r.composedPath().filter(n=>n instanceof HTMLAnchorElement&&n.href).map(n=>new URL(n.href)),e=new URL(window.location.href);if(this.options.anchors){const n=t.find(i=>e.host===i.host&&e.pathname===i.pathname&&i.hash);if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=decodeURIComponent(n.hash);this.scrollTo(s,i);return}}if(this.options.stopInertiaOnNavigate&&t.some(n=>e.host===n.host&&e.pathname!==n.pathname)){this.reset();return}});Ct(this,"onPointerDown",r=>{r.button===1&&this.reset()});Ct(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:t,deltaY:e,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:t,deltaY:e,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");if(i&&this.isIos&&(n.type==="touchstart"&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(n)),this._isDraggingSelection)){n.type==="touchend"&&(this._isDraggingSelection=!1);return}this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=t===0&&e===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const a=this.options.gestureOrientation==="vertical"&&e===0||this.options.gestureOrientation==="horizontal"&&t===0;if(o||a)return;let l=n.composedPath();l=l.slice(0,l.indexOf(this.rootElement));const c=this.options.prevent,h=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";if(l.find(g=>{var _,m,p,S,M;return g instanceof HTMLElement&&(typeof c=="function"&&(c==null?void 0:c(g))||((_=g.hasAttribute)==null?void 0:_.call(g,"data-lenis-prevent"))||h==="vertical"&&((m=g.hasAttribute)==null?void 0:m.call(g,"data-lenis-prevent-vertical"))||h==="horizontal"&&((p=g.hasAttribute)==null?void 0:p.call(g,"data-lenis-prevent-horizontal"))||i&&((S=g.hasAttribute)==null?void 0:S.call(g,"data-lenis-prevent-touch"))||s&&((M=g.hasAttribute)==null?void 0:M.call(g,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.hasNestedScroll(g,{deltaX:t,deltaY:e}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let u=e;this.options.gestureOrientation==="both"?u=Math.abs(e)>Math.abs(t)?e:t:this.options.gestureOrientation==="horizontal"&&(u=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&e>0||this.animatedScroll===this.limit&&e<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const f=i&&this.options.syncTouch,d=i&&n.type==="touchend";d&&(u=Math.sign(u)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+u,{programmatic:!1,...f?{lerp:d?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ct(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ct(this,"raf",r=>{const t=r-(this.time||r);this.time=r,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))});window.lenisVersion=Mu,window.lenis||(window.lenis={}),window.lenis.version=Mu,u==="horizontal"&&(window.lenis.horizontal=!0),i===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Eu:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:t,eventsTarget:e,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:h,gestureOrientation:f,orientation:u,touchMultiplier:d,wheelMultiplier:g,autoResize:_,prevent:m,virtualScroll:p,overscroll:S,autoRaf:M,anchors:v,autoToggle:C,allowNestedScroll:w,naiveDimensions:R,stopInertiaOnNavigate:y,respectReducedMotion:x},this.dimensions=new Rm(r,t,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener("click",this.onClick),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown),this.virtualScroll=new Dm(e,{touchMultiplier:d,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener("transitionend",this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener("click",this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(r,t){return this.emitter.on(r,t)}off(r,t){return this.emitter.off(r,t)}get overflow(){const r=this.isHorizontal?"overflow-x":"overflow-y";return getComputedStyle(this.rootElement)[r]}checkOverflow(){["hidden","clip"].includes(this.overflow)?this.internalStop():this.internalStart()}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}isTouchOnSelectionHandle(r){const t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;const e=r.targetTouches[0]??r.changedTouches[0];if(!e)return!1;const n=t.getRangeAt(0).getClientRects();if(n.length===0)return!1;const i=n[0],s=n[n.length-1],o=40,a=Math.hypot(e.clientX-i.left,e.clientY-i.top)<=o,l=Math.hypot(e.clientX-s.right,e.clientY-s.bottom)<=o;return a||l}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:t=0,immediate:e=!1,lock:n=!1,programmatic:i=!0,lerp:s=i?this.options.lerp:void 0,duration:o=i?this.options.duration:void 0,easing:a=i?this.options.easing:void 0,onStart:l,onComplete:c,force:h=!1,userData:u}={}){if(this.prefersReducedMotion&&(i?e=!0:(s=1,o=void 0,a=void 0)),(this.isStopped||this.isLocked)&&!h)return;let f=r,d=t;if(typeof f=="string"&&["top","left","start","#"].includes(f))f=0;else if(typeof f=="string"&&["bottom","right","end"].includes(f))f=this.limit;else{let g=null;if(typeof f=="string"?(g=f.startsWith("#")?document.getElementById(f.slice(1)):document.querySelector(f),g||(f==="#top"?f=0:console.warn("Lenis: Target not found",f))):f instanceof HTMLElement&&(f!=null&&f.nodeType)&&(g=f),g){if(this.options.wrapper!==window){const v=this.rootElement.getBoundingClientRect();d-=this.isHorizontal?v.left:v.top}const _=g.getBoundingClientRect(),m=getComputedStyle(g),p=this.isHorizontal?Number.parseFloat(m.scrollMarginLeft):Number.parseFloat(m.scrollMarginTop),S=getComputedStyle(this.rootElement),M=this.isHorizontal?Number.parseFloat(S.scrollPaddingLeft):Number.parseFloat(S.scrollPaddingTop);f=(this.isHorizontal?_.left:_.top)+this.animatedScroll-(Number.isNaN(p)?0:p)-(Number.isNaN(M)?0:M)}}if(typeof f=="number"){if(f+=d,this.options.infinite){if(i){this.targetScroll=this.animatedScroll=this.scroll;const g=f-this.animatedScroll;g>this.limit/2?f-=this.limit:g<-this.limit/2&&(f+=this.limit)}}else f=md(0,f,this.limit);if(f===this.targetScroll){l==null||l(this),c==null||c(this);return}if(this.userData=u??{},e){this.animatedScroll=this.targetScroll=f,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}i||(this.targetScroll=f),typeof o=="number"&&typeof a!="function"?a=Eu:typeof a=="function"&&typeof o!="number"&&(o=1),this.animate.fromTo(this.animatedScroll,f,{duration:o,easing:a,lerp:s,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",l==null||l(this)},onUpdate:(g,_)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=g-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=g,this.setScroll(this.scroll),i&&(this.targetScroll=g),_||this.emit(),_&&(this.reset(),this.emit(),c==null||c(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(r,{deltaX:t,deltaY:e}){const n=Date.now();r._lenis||(r._lenis={});const i=r._lenis;let s,o,a,l,c,h,u,f,d,g;if(n-(i.time??0)>2e3){i.time=Date.now();const w=window.getComputedStyle(r);if(i.computedStyle=w,s=["auto","overlay","scroll"].includes(w.overflowX),o=["auto","overlay","scroll"].includes(w.overflowY),c=["auto"].includes(w.overscrollBehaviorX),h=["auto"].includes(w.overscrollBehaviorY),i.hasOverflowX=s,i.hasOverflowY=o,!(s||o))return!1;u=r.scrollWidth,f=r.scrollHeight,d=r.clientWidth,g=r.clientHeight,a=u>d,l=f>g,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=u,i.scrollHeight=f,i.clientWidth=d,i.clientHeight=g,i.hasOverscrollBehaviorX=c,i.hasOverscrollBehaviorY=h}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,u=i.scrollWidth,f=i.scrollHeight,d=i.clientWidth,g=i.clientHeight,c=i.hasOverscrollBehaviorX,h=i.hasOverscrollBehaviorY;if(!(s&&a||o&&l))return!1;const _=Math.abs(t)>=Math.abs(e)?"horizontal":"vertical";let m,p,S,M,v,C;if(_==="horizontal")m=Math.round(r.scrollLeft),p=u-d,S=t,M=s,v=a,C=c;else if(_==="vertical")m=Math.round(r.scrollTop),p=f-g,S=e,M=o,v=l,C=h;else return!1;return!C&&(m>=p||m<=0)?!0:(S>0?m<p:m>0)&&M&&v}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?wm(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.className.split(" ").forEach(r=>{this.rootElement.classList.add(r)})}cleanUpClassName(){for(const r of Array.from(this.rootElement.classList))(r==="lenis"||r.startsWith("lenis-"))&&this.rootElement.classList.remove(r)}};function Ci(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function _d(r,t){r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Wn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Oo={duration:.5,overwrite:!1,delay:0},Dh,en,Ce,Qn=1e8,be=1/Qn,xc=Math.PI*2,Im=xc/4,Um=0,vd=Math.sqrt,Nm=Math.cos,Om=Math.sin,Qe=function(t){return typeof t=="string"},Ue=function(t){return typeof t=="function"},Fi=function(t){return typeof t=="number"},Lh=function(t){return typeof t>"u"},xi=function(t){return typeof t=="object"},Sn=function(t){return t!==!1},Ih=function(){return typeof window<"u"},jo=function(t){return Ue(t)||Qe(t)},xd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},cn=Array.isArray,Fm=/random\([^)]+\)/g,Bm=/,\s*/g,bu=/(?:-?\.?\d|\.)+/gi,yd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,xs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,El=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Md=/[+-]=-?[.\d]+/,zm=/[^,'"\[\]\s]+/gi,km=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,De,hi,yc,Uh,Yn={},ja={},Sd,Ed=function(t){return(ja=Is(t,Yn))&&Cn},Nh=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Fo=function(t,e){return!e&&console.warn(t)},bd=function(t,e){return t&&(Yn[t]=e)&&ja&&(ja[t]=e)||Yn},Bo=function(){return 0},Hm={suppressEvents:!0,isStart:!0,kill:!1},Fa={suppressEvents:!0,kill:!1},Vm={suppressEvents:!0},Oh={},rr=[],Mc={},Td,On={},bl={},Tu=30,Ba=[],Fh="",Bh=function(t){var e=t[0],n,i;if(xi(e)||Ue(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=Ba.length;i--&&!Ba[i].targetTest(e););n=Ba[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new qd(t[i],n)))||t.splice(i,1);return t},Nr=function(t){return t._gsap||Bh(ti(t))[0]._gsap},wd=function(t,e,n){return(n=t[e])&&Ue(n)?t[e]():Lh(n)&&t.getAttribute&&t.getAttribute(e)||n},En=function(t,e){return(t=t.split(",")).forEach(e)||t},Fe=function(t){return Math.round(t*1e5)/1e5||0},Pe=function(t){return Math.round(t*1e7)/1e7||0},Es=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},Gm=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},Qa=function(){var t=rr.length,e=rr.slice(0),n,i;for(Mc={},rr.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},zh=function(t){return!!(t._initted||t._startAt||t.add)},Ad=function(t,e,n,i){rr.length&&!en&&Qa(),t.render(e,n,!!(en&&e<0&&zh(t))),rr.length&&!en&&Qa()},Cd=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(zm).length<2?e:Qe(t)?t.trim():t},Rd=function(t){return t},qn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Wm=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},Is=function(t,e){for(var n in e)t[n]=e[n];return t},wu=function r(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=xi(e[n])?r(t[n]||(t[n]={}),e[n]):e[n]);return t},tl=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},xo=function(t){var e=t.parent||De,n=t.keyframes?Wm(cn(t.keyframes)):qn;if(Sn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},Xm=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},Pd=function(t,e,n,i,s){var o=t[i],a;if(s)for(a=e[s];o&&o[s]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},pl=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=e._prev,o=e._next;s?s._next=o:t[n]===e&&(t[n]=o),o?o._prev=s:t[i]===e&&(t[i]=s),e._next=e._prev=e.parent=null},cr=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},Or=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},Ym=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Sc=function(t,e,n,i){return t._startAt&&(en?t._startAt.revert(Fa):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},qm=function r(t){return!t||t._ts&&r(t.parent)},Au=function(t){return t._repeat?Us(t._tTime,t=t.duration()+t._rDelay)*t:0},Us=function(t,e){var n=Math.floor(t=Pe(t/e));return t&&n===t?n-1:n},el=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},ml=function(t){return t._end=Pe(t._start+(t._tDur/Math.abs(t._ts||t._rts||be)||0))},gl=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Pe(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),ml(t),n._dirty||Or(n,t)),t},Dd=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=el(t.rawTime(),e),(!e._dur||$o(0,e.totalDuration(),n)-e._tTime>be)&&e.render(n,!0)),Or(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-be}},di=function(t,e,n,i){return e.parent&&cr(e),e._start=Pe((Fi(n)?n:n||t!==De?Kn(t,n,e):t._time)+e._delay),e._end=Pe(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),Pd(t,e,"_first","_last",t._sort?"_start":0),Ec(e)||(t._recent=e),i||Dd(t,e),t._ts<0&&gl(t,t._tTime),t},Ld=function(t,e){return(Yn.ScrollTrigger||Nh("scrollTrigger",e))&&Yn.ScrollTrigger.create(e,t)},Id=function(t,e,n,i,s){if(Hh(t,e,s),!t._initted)return 1;if(!n&&t._pt&&!en&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Td!==kn.frame)return rr.push(t),t._lazy=[s,i],1},$m=function r(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||r(e))},Ec=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},Zm=function(t,e,n,i){var s=t.ratio,o=e<0||!e&&(!t._start&&$m(t)&&!(!t._initted&&Ec(t))||(t._ts<0||t._dp._ts<0)&&!Ec(t))?0:1,a=t._rDelay,l=0,c,h,u;if(a&&t._repeat&&(l=$o(0,t._tDur,e),h=Us(l,a),t._yoyo&&h&1&&(o=1-o),h!==Us(t._tTime,a)&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==s||en||i||t._zTime===be||!e&&t._zTime){if(!t._initted&&Id(t,e,i,n,l))return;for(u=t._zTime,t._zTime=e||(n?be:0),n||(n=e&&!u),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Sc(t,e,n,!0),t._onUpdate&&!n&&Vn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&Vn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&cr(t,1),!n&&!en&&(Vn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},Km=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},Ns=function(t,e,n,i){var s=t._repeat,o=Pe(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=s?s<0?1e10:Pe(o*(s+1)+t._rDelay*s):o,a>0&&!i&&gl(t,t._tTime=t._tDur*a),t.parent&&ml(t),n||Or(t.parent,t),t},Cu=function(t){return t instanceof Mn?Or(t):Ns(t,t._dur)},Jm={_start:0,endTime:Bo,totalDuration:Bo},Kn=function r(t,e,n){var i=t.labels,s=t._recent||Jm,o=t.duration()>=Qn?s.endTime(!1):t._dur,a,l,c;return Qe(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(cn(n)?n[0]:n).totalDuration()),a>1?r(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},yo=function(t,e,n){var i=Fi(e[1]),s=(i?2:1)+(t<2?0:1),o=e[s],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Sn(l.vars.inherit)&&l.parent;o.immediateRender=Sn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[s-1]}return new He(e[0],o,e[s+1])},mr=function(t,e){return t||t===0?e(t):e},$o=function(t,e,n){return n<t?t:n>e?e:n},an=function(t,e){return!Qe(t)||!(e=km.exec(t))?"":e[1]},jm=function(t,e,n){return mr(n,function(i){return $o(t,e,i)})},bc=[].slice,Ud=function(t,e){return t&&xi(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&xi(t[0]))&&!t.nodeType&&t!==hi},Qm=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var s;return Qe(i)&&!e||Ud(i,1)?(s=n).push.apply(s,ti(i)):n.push(i)})||n},ti=function(t,e,n){return Ce&&!e&&Ce.selector?Ce.selector(t):Qe(t)&&!n&&(yc||!Os())?bc.call((e||Uh).querySelectorAll(t),0):cn(t)?Qm(t,n):Ud(t)?bc.call(t,0):t?[t]:[]},Tc=function(t){return t=ti(t)[0]||Fo("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return ti(e,n.querySelectorAll?n:n===t?Fo("Invalid scope")||Uh.createElement("div"):t)}},Nd=function(t){return t.sort(function(){return .5-Math.random()})},Od=function(t){if(Ue(t))return t;var e=xi(t)?t:{each:t},n=Fr(e.ease),i=e.from||0,s=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,h=i,u=i;return Qe(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],u=i[1]),function(f,d,g){var _=(g||e).length,m=o[_],p,S,M,v,C,w,b,R,y;if(!m){if(y=e.grid==="auto"?0:(e.grid||[1,Qn])[1],!y){for(b=-Qn;b<(b=g[y++].getBoundingClientRect().left)&&y<_;);y<_&&y--}for(m=o[_]=[],p=l?Math.min(y,_)*h-.5:i%y,S=y===Qn?0:l?_*u/y-.5:i/y|0,b=0,R=Qn,w=0;w<_;w++)M=w%y-p,v=S-(w/y|0),m[w]=C=c?Math.abs(c==="y"?v:M):vd(M*M+v*v),C>b&&(b=C),C<R&&(R=C);i==="random"&&Nd(m),m.max=b-R,m.min=R,m.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(y>_?_-1:c?c==="y"?_/y:y:Math.max(y,_/y))||0)*(i==="edges"?-1:1),m.b=_<0?s-_:s,m.u=an(e.amount||e.each)||0,n=n&&_<0?fg(n):n}return _=(m[f]-m.min)/m.max||0,Pe(m.b+(n?n(_):_)*m.v)+m.u}},wc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Pe(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(Fi(n)?0:an(n))}},Fd=function(t,e){var n=cn(t),i,s;return!n&&xi(t)&&(i=n=t.radius||Qn,t.values?(t=ti(t.values),(s=!Fi(t[0]))&&(i*=i)):t=wc(t.increment)),mr(e,n?Ue(t)?function(o){return s=t(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Qn,h=0,u=t.length,f,d;u--;)s?(f=t[u].x-a,d=t[u].y-l,f=f*f+d*d):f=Math.abs(t[u]-a),f<c&&(c=f,h=u);return h=!i||c<=i?t[h]:o,s||h===o||Fi(o)?h:h+an(o)}:wc(t))},Bd=function(t,e,n,i){return mr(cn(t)?!e:n===!0?!!(n=0):!i,function(){return cn(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},tg=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(s,o){return o(s)},i)}},eg=function(t,e){return function(n){return t(parseFloat(n))+(e||an(n))}},ng=function(t,e,n){return kd(t,e,0,1,n)},zd=function(t,e,n){return mr(n,function(i){return t[~~e(i)]})},ig=function r(t,e,n){var i=e-t;return cn(t)?zd(t,r(0,t.length),e):mr(n,function(s){return(i+(s-t)%i)%i+t})},rg=function r(t,e,n){var i=e-t,s=i*2;return cn(t)?zd(t,r(0,t.length-1),e):mr(n,function(o){return o=(s+(o-t)%s)%s||0,t+(o>i?s-o:o)})},zo=function(t){return t.replace(Fm,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(Bm);return Bd(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},kd=function(t,e,n,i,s){var o=e-t,a=i-n;return mr(s,function(l){return n+((l-t)/o*a||0)})},sg=function r(t,e,n,i){var s=isNaN(t+e)?0:function(d){return(1-d)*t+d*e};if(!s){var o=Qe(t),a={},l,c,h,u,f;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(cn(t)&&!cn(e)){for(h=[],u=t.length,f=u-2,c=1;c<u;c++)h.push(r(t[c-1],t[c]));u--,s=function(g){g*=u;var _=Math.min(f,~~g);return h[_](g-_)},n=e}else i||(t=Is(cn(t)?[]:{},t));if(!h){for(l in e)kh.call(a,t,l,"get",e[l]);s=function(g){return Wh(g,a)||(o?t.p:t)}}}return mr(n,s)},Ru=function(t,e,n){var i=t.labels,s=Qn,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Vn=function(t,e,n){var i=t.vars,s=i[e],o=Ce,a=t._ctx,l,c,h;if(s)return l=i[e+"Params"],c=i.callbackScope||t,n&&rr.length&&Qa(),a&&(Ce=a),h=l?s.apply(c,l):s.call(c),Ce=o,h},lo=function(t){return cr(t),t.scrollTrigger&&t.scrollTrigger.kill(!!en),t.progress()<1&&Vn(t,"onInterrupt"),t},ys,Hd=[],Vd=function(t){if(t)if(t=!t.name&&t.default||t,Ih()||t.headless){var e=t.name,n=Ue(t),i=e&&!n&&t.init?function(){this._props=[]}:t,s={init:Bo,render:Wh,add:kh,kill:Sg,modifier:Mg,rawVars:0},o={targetTest:0,get:0,getSetter:Gh,aliases:{},register:0};if(Os(),t!==i){if(On[e])return;qn(i,qn(tl(t,s),o)),Is(i.prototype,Is(s,tl(t,o))),On[i.prop=e]=i,t.targetTest&&(Ba.push(i),Oh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}bd(e,i),t.register&&t.register(Cn,i,bn)}else Hd.push(t)},Ee=255,co={aqua:[0,Ee,Ee],lime:[0,Ee,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Ee],navy:[0,0,128],white:[Ee,Ee,Ee],olive:[128,128,0],yellow:[Ee,Ee,0],orange:[Ee,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Ee,0,0],pink:[Ee,192,203],cyan:[0,Ee,Ee],transparent:[Ee,Ee,Ee,0]},Tl=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*Ee+.5|0},Gd=function(t,e,n){var i=t?Fi(t)?[t>>16,t>>8&Ee,t&Ee]:0:co.black,s,o,a,l,c,h,u,f,d,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),co[t])i=co[t];else if(t.charAt(0)==="#"){if(t.length<6&&(s=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+s+s+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&Ee,i&Ee,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&Ee,t&Ee]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(bu),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(c+1):h+c-h*c,s=h*2-o,i.length>3&&(i[3]*=1),i[0]=Tl(l+1/3,s,o),i[1]=Tl(l,s,o),i[2]=Tl(l-1/3,s,o);else if(~t.indexOf("="))return i=t.match(yd),n&&i.length<4&&(i[3]=1),i}else i=t.match(bu)||co.transparent;i=i.map(Number)}return e&&!g&&(s=i[0]/Ee,o=i[1]/Ee,a=i[2]/Ee,u=Math.max(s,o,a),f=Math.min(s,o,a),h=(u+f)/2,u===f?l=c=0:(d=u-f,c=h>.5?d/(2-u-f):d/(u+f),l=u===s?(o-a)/d+(o<a?6:0):u===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},Wd=function(t){var e=[],n=[],i=-1;return t.split(sr).forEach(function(s){var o=s.match(xs)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},Pu=function(t,e,n){var i="",s=(t+i).match(sr),o=e?"hsla(":"rgba(",a=0,l,c,h,u;if(!s)return t;if(s=s.map(function(f){return(f=Gd(f,e,1))&&o+(e?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(h=Wd(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(sr,"1").split(xs),u=c.length-1;a<u;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(h.length?h:s.length?s:n).shift());if(!c)for(c=t.split(sr),u=c.length-1;a<u;a++)i+=c[a]+s[a];return i+c[u]},sr=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in co)r+="|"+t+"\\b";return new RegExp(r+")","gi")})(),og=/hsl[a]?\(/,Xd=function(t){var e=t.join(" "),n;if(sr.lastIndex=0,sr.test(e))return n=og.test(e),t[1]=Pu(t[1],n),t[0]=Pu(t[0],n,Wd(t[1])),!0},ko,kn=(function(){var r=Date.now,t=500,e=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,h,u,f,d,g=function _(m){var p=r()-i,S=m===!0,M,v,C,w;if((p>t||p<0)&&(n+=p-e),i+=p,C=i-n,M=C-o,(M>0||S)&&(w=++u.frame,f=C-u.time*1e3,u.time=C=C/1e3,o+=M+(M>=s?4:s-M),v=1),S||(l=c(_)),v)for(d=0;d<a.length;d++)a[d](C,f,w,m)};return u={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){Sd&&(!yc&&Ih()&&(hi=yc=window,Uh=hi.document||{},Yn.gsap=Cn,(hi.gsapVersions||(hi.gsapVersions=[])).push(Cn.version),Ed(ja||hi.GreenSockGlobals||!hi.gsap&&hi||{}),Hd.forEach(Vd)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=h||function(m){return setTimeout(m,o-u.time*1e3+1|0)},ko=1,g(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),ko=0,c=Bo},lagSmoothing:function(m,p){t=m||1/0,e=Math.min(p||33,t)},fps:function(m){s=1e3/(m||240),o=u.time*1e3+s},add:function(m,p,S){var M=p?function(v,C,w,b){m(v,C,w,b),u.remove(M)}:m;return u.remove(m),a[S?"unshift":"push"](M),Os(),M},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},u})(),Os=function(){return!ko&&kn.wake()},oe={},ag=/^[\d.\-M][\d.\-,\s]/,lg=/["']/g,cg=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(lg,"").trim():+c,i=l.substr(a+1).trim();return e},hg=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},ug=function(t){var e=(t+"").split("("),n=oe[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[cg(e[1])]:hg(t).split(",").map(Cd)):oe._CE&&ag.test(t)?oe._CE("",t):n},fg=function(t){return function(e){return 1-t(1-e)}},Fr=function(t,e){return t&&(Ue(t)?t:oe[t]||ug(t))||e},qr=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var s={easeIn:e,easeOut:n,easeInOut:i},o;return En(t,function(a){oe[a]=Yn[a]=s,oe[o=a.toLowerCase()]=n;for(var l in s)oe[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=oe[a+"."+l]=s[l]}),s},Yd=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},wl=function r(t,e,n){var i=e>=1?e:1,s=(n||(t?.3:.45))/(e<1?e:1),o=s/xc*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*Om((h-o)*s)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:Yd(a);return s=xc/s,l.config=function(c,h){return r(t,c,h)},l},Al=function r(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(s){return 1-n(1-s)}:Yd(n);return i.config=function(s){return r(t,s)},i};En("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,t){var e=t<5?t+1:t;qr(r+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});oe.Linear.easeNone=oe.none=oe.Linear.easeIn;qr("Elastic",wl("in"),wl("out"),wl());(function(r,t){var e=1/t,n=2*e,i=2.5*e,s=function(a){return a<e?r*a*a:a<n?r*Math.pow(a-1.5/t,2)+.75:a<i?r*(a-=2.25/t)*a+.9375:r*Math.pow(a-2.625/t,2)+.984375};qr("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);qr("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});qr("Circ",function(r){return-(vd(1-r*r)-1)});qr("Sine",function(r){return r===1?1:-Nm(r*Im)+1});qr("Back",Al("in"),Al("out"),Al());oe.SteppedEase=oe.steps=Yn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),s=e?1:0,o=1-be;return function(a){return((i*$o(0,o,a)|0)+s)*n}}};Oo.ease=oe["quad.out"];En("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Fh+=r+","+r+"Params,"});var qd=function(t,e){this.id=Um++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:wd,this.set=e?e.getSetter:Gh},Ho=(function(){function r(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,Ns(this,+e.duration,1,1),this.data=e.data,Ce&&(this._ctx=Ce,Ce.data.push(this)),ko||kn.wake()}var t=r.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,Ns(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(Os(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(gl(this,n),!s._dp||s.parent||Dd(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&di(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===be||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Ad(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Au(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Au(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?Us(this._tTime,s)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-be?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?el(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-be?0:this._rts,this.totalTime($o(-Math.abs(this._delay),this.totalDuration(),s),i!==!1),ml(this),Ym(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Os(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==be&&(this._tTime-=be)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=Pe(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&di(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(Sn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?el(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=Vm);var i=en;return en=n,zh(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),en=i,this},t.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,Cu(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,Cu(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Kn(this,n),Sn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Sn(i)),this._dur||(this._zTime=-be),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-be:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-be,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-be)},t.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,s=i._prom;return new Promise(function(o){var a=Ue(n)?n:Rd,l=function(){var h=i.then;i.then=null,s&&s(),Ue(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=h),o(a),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){lo(this)},r})();qn(Ho.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-be,_prom:0,_ps:!1,_rts:1});var Mn=(function(r){_d(t,r);function t(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Sn(n.sortChildren),De&&di(n.parent||De,Ci(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&Ld(Ci(s),n.scrollTrigger),s}var e=t.prototype;return e.to=function(i,s,o){return yo(0,arguments,this),this},e.from=function(i,s,o){return yo(1,arguments,this),this},e.fromTo=function(i,s,o,a){return yo(2,arguments,this),this},e.set=function(i,s,o){return s.duration=0,s.parent=this,xo(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new He(i,s,Kn(this,o),1),this},e.call=function(i,s,o){return di(this,He.delayedCall(0,i,s),o)},e.staggerTo=function(i,s,o,a,l,c,h){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new He(i,o,Kn(this,l)),this},e.staggerFrom=function(i,s,o,a,l,c,h){return o.runBackwards=1,xo(o).immediateRender=Sn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,h)},e.staggerFromTo=function(i,s,o,a,l,c,h,u){return a.startAt=o,xo(a).immediateRender=Sn(a.immediateRender),this.staggerTo(i,s,a,l,c,h,u)},e.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Pe(i),u=this._zTime<0!=i<0&&(this._initted||!c),f,d,g,_,m,p,S,M,v,C,w,b;if(this!==De&&h>l&&i>=0&&(h=l),h!==this._tTime||o||u){if(a!==this._time&&c&&(h+=this._time-a,i+=this._time-a),f=h,v=this._start,M=this._ts,p=!M,u&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(w=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=Pe(h%m),h===l?(_=this._repeat,f=c):(C=Pe(h/m),_=~~C,_&&_===C&&(f=c,_--),f>c&&(f=c)),C=Us(this._tTime,m),!a&&this._tTime&&C!==_&&this._tTime-C*m-this._dur<=0&&(C=_),w&&_&1&&(f=c-f,b=1),_!==C&&!this._lock){var R=w&&C&1,y=R===(w&&_&1);if(_<C&&(R=!R),a=R?0:h%c?c:h,this._lock=1,this.render(a||(b?0:Pe(_*m)),s,!c)._lock=0,this._tTime=h,!s&&this.parent&&Vn(this,"onRepeat"),this.vars.repeatRefresh&&!b&&(this.invalidate()._lock=1,C=_),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,a=R?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!b&&this.invalidate()),this._lock=0,!this._ts&&!p)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=Km(this,Pe(a),Pe(f)),S&&(h-=f-(f=S._start))),this._tTime=h,this._time=f,this._act=!!M,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&h&&c&&!s&&!C&&(Vn(this,"onStart"),this._tTime!==h))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&S!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!p){S=0,g&&(h+=this._zTime=-be);break}}d=g}else{d=this._last;for(var x=i<0?i:f;d;){if(g=d._prev,(d._act||x<=d._end)&&d._ts&&S!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(x-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(x-d._start)*d._ts,s,o||en&&zh(d)),f!==this._time||!this._ts&&!p){S=0,g&&(h+=this._zTime=x?-be:be);break}}d=g}}if(S&&!s&&(this.pause(),S.render(f>=a?0:-be)._zTime=f>=a?1:-1,this._ts))return this._start=v,ml(this),this.render(i,s,o);this._onUpdate&&!s&&Vn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(v===this._start||Math.abs(M)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&cr(this,1),!s&&!(i<0&&!a)&&(h||a||!l)&&(Vn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,s){var o=this;if(Fi(s)||(s=Kn(this,s,i)),!(i instanceof Ho)){if(cn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Qe(i))return this.addLabel(i,s);if(Ue(i))i=He.delayedCall(0,i);else return this}return this!==i?di(this,i,s):this},e.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Qn);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof He?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},e.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},e.remove=function(i){return Qe(i)?this.removeLabel(i):Ue(i)?this.killTweensOf(i):(i.parent===this&&pl(this,i),i===this._recent&&(this._recent=this._last),Or(this))},e.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Pe(kn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},e.addLabel=function(i,s){return this.labels[i]=Kn(this,s),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,s,o){var a=He.delayedCall(0,s||Bo,o);return a.data="isPause",this._hasPause=1,di(this,a,Kn(this,i))},e.removePause=function(i){var s=this._first;for(i=Kn(this,i);s;)s._start===i&&s.data==="isPause"&&cr(s),s=s._next},e.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Qi!==a[l]&&a[l].kill(i,s);return this},e.getTweensOf=function(i,s){for(var o=[],a=ti(i),l=this._first,c=Fi(s),h;l;)l instanceof He?Gm(l._targets,a)&&(c?(!Qi||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(h=l.getTweensOf(a,s)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(i,s){s=s||{};var o=this,a=Kn(o,i),l=s,c=l.startAt,h=l.onStart,u=l.onStartParams,f=l.immediateRender,d,g=He.to(o,qn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||be,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&Ns(g,m,0,1).render(g._time,!0,!0),d=1}h&&h.apply(g,u||[])}},s));return f?g.render(0):g},e.tweenFromTo=function(i,s,o){return this.tweenTo(s,qn({startAt:{time:Kn(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),Ru(this,Kn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),Ru(this,Kn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+be)},e.shiftChildren=function(i,s,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=Pe(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Or(this)},e.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Or(this)},e.totalDuration=function(i){var s=0,o=this,a=o._last,l=Qn,c,h,u;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(u=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,di(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(s-=h,(!u&&!o._dp||u&&u.smoothChildTiming)&&(o._start+=Pe(h/o._ts),o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Ns(o,o===De&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(De._ts&&(Ad(De,el(i,De)),Td=kn.frame),kn.frame>=Tu){Tu+=Wn.autoSleep||120;var s=De._first;if((!s||!s._ts)&&Wn.autoSleep&&kn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||kn.sleep()}}},t})(Ho);qn(Mn.prototype,{_lock:0,_hasPause:0,_forcing:0});var dg=function(t,e,n,i,s,o,a){var l=new bn(this._pt,t,e,0,1,Qd,null,s),c=0,h=0,u,f,d,g,_,m,p,S;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=zo(i)),o&&(S=[n,i],o(S,t,e),n=S[0],i=S[1]),f=n.match(El)||[];u=El.exec(i);)g=u[0],_=i.substring(c,u.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==f[h++]&&(m=parseFloat(f[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:m,c:g.charAt(1)==="="?Es(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=El.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Md.test(i)||p)&&(l.e=0),this._pt=l,l},kh=function(t,e,n,i,s,o,a,l,c,h){Ue(i)&&(i=i(s||0,t,o));var u=t[e],f=n!=="get"?n:Ue(u)?c?t[e.indexOf("set")||!Ue(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():u,d=Ue(u)?c?vg:Jd:Vh,g;if(Qe(i)&&(~i.indexOf("random(")&&(i=zo(i)),i.charAt(1)==="="&&(g=Es(f,i)+(an(f)||0),(g||g===0)&&(i=g))),!h||f!==i||Ac)return!isNaN(f*i)&&i!==""?(g=new bn(this._pt,t,e,+f||0,i-(f||0),typeof u=="boolean"?yg:jd,0,d),c&&(g.fp=c),a&&g.modifier(a,this,t),this._pt=g):(!u&&!(e in t)&&Nh(e,i),dg.call(this,t,e,f,i,d,l||Wn.stringFilter,c))},pg=function(t,e,n,i,s){if(Ue(t)&&(t=Mo(t,s,e,n,i)),!xi(t)||t.style&&t.nodeType||cn(t)||xd(t))return Qe(t)?Mo(t,s,e,n,i):t;var o={},a;for(a in t)o[a]=Mo(t[a],s,e,n,i);return o},$d=function(t,e,n,i,s,o){var a,l,c,h;if(On[t]&&(a=new On[t]).init(s,a.rawVars?e[t]:pg(e[t],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new bn(n._pt,s,t,0,1,a.render,a,0,a.priority),n!==ys))for(c=n._ptLookup[n._targets.indexOf(s)],h=a._props.length;h--;)c[a._props[h]]=l;return a},Qi,Ac,Hh=function r(t,e,n){var i=t.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=t._dur,_=t._startAt,m=t._targets,p=t.parent,S=p&&p.data==="nested"?p.vars.targets:m,M=t._overwrite==="auto"&&!Dh,v=t.timeline,C=i.easeReverse||u,w,b,R,y,x,P,U,B,V,q,X,Y,k;if(v&&(!f||!s)&&(s="none"),t._ease=Fr(s,Oo.ease),t._rEase=C&&(Fr(C)||t._ease),t._from=!v&&!!i.runBackwards,t._from&&(t.ratio=1),!v||f&&!i.stagger){if(B=m[0]?Nr(m[0]).harness:0,Y=B&&i[B.prop],w=tl(i,Oh),_&&(_._zTime<0&&_.progress(1),e<0&&h&&a&&!d?_.render(-1,!0):_.revert(h&&g?Fa:Hm),_._lazy=0),o){if(cr(t._startAt=He.set(m,qn({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Sn(l),startAt:null,delay:0,onUpdate:c&&function(){return Vn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(en||!a&&!d)&&t._startAt.revert(Fa),a&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&g&&!_){if(e&&(a=!1),R=qn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Sn(l),immediateRender:a,stagger:0,parent:p},w),Y&&(R[B.prop]=Y),cr(t._startAt=He.set(m,R)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(en?t._startAt.revert(Fa):t._startAt.render(-1,!0)),t._zTime=e,!a)r(t._startAt,be,be);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&Sn(l)||l&&!g,b=0;b<m.length;b++){if(x=m[b],U=x._gsap||Bh(m)[b]._gsap,t._ptLookup[b]=q={},Mc[U.id]&&rr.length&&Qa(),X=S===m?b:S.indexOf(x),B&&(V=new B).init(x,Y||w,t,X,S)!==!1&&(t._pt=y=new bn(t._pt,x,V.name,0,1,V.render,V,0,V.priority),V._props.forEach(function(et){q[et]=y}),V.priority&&(P=1)),!B||Y)for(R in w)On[R]&&(V=$d(R,w,t,X,x,S))?V.priority&&(P=1):q[R]=y=kh.call(t,x,R,"get",w[R],X,S,0,i.stringFilter);t._op&&t._op[b]&&t.kill(x,t._op[b]),M&&t._pt&&(Qi=t,De.killTweensOf(x,q,t.globalTime(e)),k=!t.parent,Qi=0),t._pt&&l&&(Mc[U.id]=1)}P&&tp(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!k,f&&e<=0&&v.render(Qn,!0,!0)},mg=function(t,e,n,i,s,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,f,d;if(!c)for(c=t._ptCache[e]=[],f=t._ptLookup,d=t._targets.length;d--;){if(h=f[d][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Ac=1,t.vars[e]="+=0",Hh(t,a),Ac=0,l?Fo(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(d=c.length;d--;)u=c[d],h=u._pt||u,h.s=(i||i===0)&&!s?i:h.s+(i||0)+o*h.c,h.c=n-h.s,u.e&&(u.e=Fe(n)+an(u.e)),u.b&&(u.b=h.s+an(u.b))},gg=function(t,e){var n=t[0]?Nr(t[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return e;s=Is({},e);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},_g=function(t,e,n,i){var s=e.ease||i||"power1.inOut",o,a;if(cn(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:s})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:s})},Mo=function(t,e,n,i,s){return Ue(t)?t.call(e,n,i,s):Qe(t)&&~t.indexOf("random(")?zo(t):t},Zd=Fh+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",Kd={};En(Zd+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Kd[r]=1});var He=(function(r){_d(t,r);function t(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:xo(i))||this;var l=a.vars,c=l.duration,h=l.delay,u=l.immediateRender,f=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=i.parent||De,S=(cn(n)||xd(n)?Fi(n[0]):"length"in i)?[n]:ti(n),M,v,C,w,b,R,y,x;if(a._targets=S.length?Bh(S):Fo("GSAP target "+n+" not found. https://gsap.com",!Wn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||f||jo(c)||jo(h)){i=a.vars;var P=i.easeReverse||i.yoyoEase;if(M=a.timeline=new Mn({data:"nested",defaults:_||{},targets:p&&p.data==="nested"?p.vars.targets:S}),M.kill(),M.parent=M._dp=Ci(a),M._start=0,f||jo(c)||jo(h)){if(w=S.length,y=f&&Od(f),xi(f))for(b in f)~Zd.indexOf(b)&&(x||(x={}),x[b]=f[b]);for(v=0;v<w;v++)C=tl(i,Kd),C.stagger=0,P&&(C.easeReverse=P),x&&Is(C,x),R=S[v],C.duration=+Mo(c,Ci(a),v,R,S),C.delay=(+Mo(h,Ci(a),v,R,S)||0)-a._delay,!f&&w===1&&C.delay&&(a._delay=h=C.delay,a._start+=h,C.delay=0),M.to(R,C,y?y(v,R,S):0),M._ease=oe.none;M.duration()?c=h=0:a.timeline=0}else if(g){xo(qn(M.vars.defaults,{ease:"none"})),M._ease=Fr(g.ease||i.ease||"none");var U=0,B,V,q;if(cn(g))g.forEach(function(X){return M.to(S,X,">")}),M.duration();else{C={};for(b in g)b==="ease"||b==="easeEach"||_g(b,g[b],C,g.easeEach);for(b in C)for(B=C[b].sort(function(X,Y){return X.t-Y.t}),U=0,v=0;v<B.length;v++)V=B[v],q={ease:V.e,duration:(V.t-(v?B[v-1].t:0))/100*c},q[b]=V.v,M.to(S,q,U),U+=q.duration;M.duration()<c&&M.to({},{duration:c-M.duration()})}}c||a.duration(c=M.duration())}else a.timeline=0;return d===!0&&!Dh&&(Qi=Ci(a),De.killTweensOf(S),Qi=0),di(p,Ci(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(u||!c&&!g&&a._start===Pe(p._time)&&Sn(u)&&qm(Ci(a))&&p.data!=="nested")&&(a._tTime=-be,a.render(Math.max(0,-h)||0)),m&&Ld(Ci(a),m),a}var e=t.prototype;return e.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,h=i<0,u=i>l-be&&!h?l:i<be?0:i,f,d,g,_,m,p,S,M;if(!c)Zm(this,i,s,o);else if(u!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(f=u,M=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,s,o);if(f=Pe(u%_),u===l?(g=this._repeat,f=c):(m=Pe(u/_),g=~~m,g&&g===m?(f=c,g--):f>c&&(f=c)),p=this._yoyo&&g&1,p&&(f=c-f),m=Us(this._tTime,_),f===a&&!o&&this._initted&&g===m)return this._tTime=u,this;g!==m&&this.vars.repeatRefresh&&!p&&!this._lock&&f!==_&&this._initted&&(this._lock=o=1,this.render(Pe(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(Id(this,h?i:f,o,s,u))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._rEase){var v=f<a;if(v!==this._inv){var C=v?a:c-a;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=C?(v?-1:1)/C:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=S=this._invRatio+this._invScale*this._invEase((f-this._invTime)*this._invRecip)}else this.ratio=S=this._ease(f/c);if(this._from&&(this.ratio=S=1-S),this._tTime=u,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&u&&!s&&!m&&(Vn(this,"onStart"),this._tTime!==u))return this;for(d=this._pt;d;)d.r(S,d.d),d=d._next;M&&M.render(i<0?i:M._dur*M._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(h&&Sc(this,i,s,o),Vn(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&Vn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&Sc(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&cr(this,1),!s&&!(h&&!a)&&(u||a||p)&&(Vn(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},e.resetTo=function(i,s,o,a,l){ko||kn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Hh(this,c),h=this._ease(c/this._dur),mg(this,i,s,o,a,h,c,l)?this.resetTo(i,s,o,a,1):(gl(this,0),this.parent||Pd(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?lo(this):this.scrollTrigger&&this.scrollTrigger.kill(!!en),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,Qi&&Qi.vars.overwrite!==!0)._first||lo(this),this.parent&&o!==this.timeline.totalDuration()&&Ns(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?ti(i):a,c=this._ptLookup,h=this._pt,u,f,d,g,_,m,p;if((!s||s==="all")&&Xm(a,l))return s==="all"&&(this._pt=0),lo(this);for(u=this._op=this._op||[],s!=="all"&&(Qe(s)&&(_={},En(s,function(S){return _[S]=1}),s=_),s=gg(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(u[p]=s,g=f,d={}):(d=u[p]=u[p]||{},g=s);for(_ in g)m=f&&f[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&pl(this,m,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&h&&lo(this),this},t.to=function(i,s){return new t(i,s,arguments[2])},t.from=function(i,s){return yo(1,arguments)},t.delayedCall=function(i,s,o,a){return new t(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,s,o){return yo(2,arguments)},t.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new t(i,s)},t.killTweensOf=function(i,s,o){return De.killTweensOf(i,s,o)},t})(Ho);qn(He.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});En("staggerTo,staggerFrom,staggerFromTo",function(r){He[r]=function(){var t=new Mn,e=bc.call(arguments,0);return e.splice(r==="staggerFromTo"?5:4,0,0),t[r].apply(t,e)}});var Vh=function(t,e,n){return t[e]=n},Jd=function(t,e,n){return t[e](n)},vg=function(t,e,n,i){return t[e](i.fp,n)},xg=function(t,e,n){return t.setAttribute(e,n)},Gh=function(t,e){return Ue(t[e])?Jd:Lh(t[e])&&t.setAttribute?xg:Vh},jd=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},yg=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Qd=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Wh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Mg=function(t,e,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(t,e,n),s=o},Sg=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?pl(this,e,"_pt"):e.dep||(n=1),e=i;return!n},Eg=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},tp=function(t){for(var e=t._pt,n,i,s,o;e;){for(n=e._next,i=s;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:s=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=s},bn=(function(){function r(e,n,i,s,o,a,l,c,h){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||jd,this.d=l||this,this.set=c||Vh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=r.prototype;return t.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=Eg,this.m=n,this.mt=s,this.tween=i},r})();En(Fh+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(r){return Oh[r]=1});Yn.TweenMax=Yn.TweenLite=He;Yn.TimelineLite=Yn.TimelineMax=Mn;De=new Mn({sortChildren:!1,defaults:Oo,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Wn.stringFilter=Xd;var Br=[],za={},bg=[],Du=0,Tg=0,Cl=function(t){return(za[t]||bg).map(function(e){return e()})},Cc=function(){var t=Date.now(),e=[];t-Du>2&&(Cl("matchMediaInit"),Br.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=hi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),Cl("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Du=t,Cl("matchMedia"))},ep=(function(){function r(e,n){this.selector=n&&Tc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=Tg++,e&&this.add(e)}var t=r.prototype;return t.add=function(n,i,s){Ue(n)&&(s=i,i=n,n=Ue);var o=this,a=function(){var c=Ce,h=o.selector,u;return c&&c!==o&&c.data.push(o),s&&(o.selector=Tc(s)),Ce=o,u=i.apply(o,arguments),Ue(u)&&o._r.push(u),Ce=c,o.selector=h,o.isReverted=!1,u};return o.last=a,n===Ue?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=Ce;Ce=null,n(this),Ce=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof He&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Mn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof He)&&c.revert&&c.revert(n);s._r.forEach(function(h){return h(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=Br.length;o--;)Br[o].id===this.id&&Br.splice(o,1)},t.revert=function(n){this.kill(n||{})},r})(),wg=(function(){function r(e){this.contexts=[],this.scope=e,Ce&&Ce.data.push(this)}var t=r.prototype;return t.add=function(n,i,s){xi(n)||(n={matches:n});var o=new ep(0,s||this.scope),a=o.conditions={},l,c,h;Ce&&!o.selector&&(o.selector=Ce.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?h=1:(l=hi.matchMedia(n[c]),l&&(Br.indexOf(o)<0&&Br.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(Cc):l.addEventListener("change",Cc)));return h&&i(o,function(u){return o.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),nl={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return Vd(i)})},timeline:function(t){return new Mn(t)},getTweensOf:function(t,e){return De.getTweensOf(t,e)},getProperty:function(t,e,n,i){Qe(t)&&(t=ti(t)[0]);var s=Nr(t||{}).get,o=n?Rd:Cd;return n==="native"&&(n=""),t&&(e?o((On[e]&&On[e].get||s)(t,e,n,i)):function(a,l,c){return o((On[a]&&On[a].get||s)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=ti(t),t.length>1){var i=t.map(function(h){return Cn.quickSetter(h,e,n)}),s=i.length;return function(h){for(var u=s;u--;)i[u](h)}}t=t[0]||{};var o=On[e],a=Nr(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var u=new o;ys._pt=0,u.init(t,n?h+n:h,ys,0,[t]),u.render(1,u),ys._pt&&Wh(1,ys)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var i,s=Cn.to(t,qn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,h){return s.resetTo(e,l,c,h)};return o.tween=s,o},isTweening:function(t){return De.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=Fr(t.ease,Oo.ease)),wu(Oo,t||{})},config:function(t){return wu(Wn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,s=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!On[a]&&!Yn[a]&&Fo(e+" effect requires "+a+" plugin.")}),bl[e]=function(a,l,c){return n(ti(a),qn(l||{},s),c)},o&&(Mn.prototype[e]=function(a,l,c){return this.add(bl[e](a,xi(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){oe[t]=Fr(e)},parseEase:function(t,e){return arguments.length?Fr(t,e):oe},getById:function(t){return De.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new Mn(t),i,s;for(n.smoothChildTiming=Sn(t.smoothChildTiming),De.remove(n),n._dp=0,n._time=n._tTime=De._time,i=De._first;i;)s=i._next,(e||!(!i._dur&&i instanceof He&&i.vars.onComplete===i._targets[0]))&&di(n,i,i._start-i._delay),i=s;return di(De,n,0),n},context:function(t,e){return t?new ep(t,e):Ce},matchMedia:function(t){return new wg(t)},matchMediaRefresh:function(){return Br.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Cc()},addEventListener:function(t,e){var n=za[t]||(za[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=za[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:ig,wrapYoyo:rg,distribute:Od,random:Bd,snap:Fd,normalize:ng,getUnit:an,clamp:jm,splitColor:Gd,toArray:ti,selector:Tc,mapRange:kd,pipe:tg,unitize:eg,interpolate:sg,shuffle:Nd},install:Ed,effects:bl,ticker:kn,updateRoot:Mn.updateRoot,plugins:On,globalTimeline:De,core:{PropTween:bn,globals:bd,Tween:He,Timeline:Mn,Animation:Ho,getCache:Nr,_removeLinkedListItem:pl,reverting:function(){return en},context:function(t){return t&&Ce&&(Ce.data.push(t),t._ctx=Ce),Ce},suppressOverwrites:function(t){return Dh=t}}};En("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return nl[r]=He[r]});kn.add(Mn.updateRoot);ys=nl.to({},{duration:0});var Ag=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},Cg=function(t,e){var n=t._targets,i,s,o;for(i in e)for(s=n.length;s--;)o=t._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=Ag(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[s],i))},Rl=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(Qe(s)&&(l={},En(s,function(h){return l[h]=1}),s=l),e){l={};for(c in s)l[c]=e(s[c]);s=l}Cg(a,s)}}}},Cn=nl.registerPlugin({name:"attr",init:function(t,e,n,i,s){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)en?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Rl("roundProps",wc),Rl("modifiers"),Rl("snap",Fd))||nl;He.version=Mn.version=Cn.version="3.15.0";Sd=1;Ih()&&Os();oe.Power0;oe.Power1;oe.Power2;oe.Power3;oe.Power4;oe.Linear;oe.Quad;oe.Cubic;oe.Quart;oe.Quint;oe.Strong;oe.Elastic;oe.Back;oe.SteppedEase;oe.Bounce;oe.Sine;oe.Expo;oe.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Lu,tr,bs,Xh,Dr,Iu,Yh,Rg=function(){return typeof window<"u"},Bi={},br=180/Math.PI,Ts=Math.PI/180,Jr=Math.atan2,Uu=1e8,qh=/([A-Z])/g,Pg=/(left|right|width|margin|padding|x)/i,Dg=/[\s,\(]\S/,pi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Rc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Lg=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},Ig=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Ug=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},Ng=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},np=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},ip=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},Og=function(t,e,n){return t.style[e]=n},Fg=function(t,e,n){return t.style.setProperty(e,n)},Bg=function(t,e,n){return t._gsap[e]=n},zg=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},kg=function(t,e,n,i,s){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},Hg=function(t,e,n,i,s){var o=t._gsap;o[e]=n,o.renderTransform(s,o)},Le="transform",Tn=Le+"Origin",Vg=function r(t,e){var n=this,i=this.target,s=i.style,o=i._gsap;if(t in Bi&&s){if(this.tfm=this.tfm||{},t!=="transform")t=pi[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=Ri(i,a)}):this.tfm[t]=o.x?o[t]:Ri(i,t),t===Tn&&(this.tfm.zOrigin=o.zOrigin);else return pi.transform.split(",").forEach(function(a){return r.call(n,a,e)});if(this.props.indexOf(Le)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Tn,e,"")),t=Le}(s||e)&&this.props.push(t,e,s[t])},rp=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},Gg=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,s,o;for(s=0;s<t.length;s+=3)t[s+1]?t[s+1]===2?e[t[s]](t[s+2]):e[t[s]]=t[s+2]:t[s+2]?n[t[s]]=t[s+2]:n.removeProperty(t[s].substr(0,2)==="--"?t[s]:t[s].replace(qh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),s=Yh(),(!s||!s.isStart)&&!n[Le]&&(rp(n),i.zOrigin&&n[Tn]&&(n[Tn]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},sp=function(t,e){var n={target:t,props:[],revert:Gg,save:Vg};return t._gsap||Cn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},op,Pc=function(t,e){var n=tr.createElementNS?tr.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):tr.createElement(t);return n&&n.style?n:tr.createElement(t)},Gn=function r(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(qh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&r(t,Fs(e)||e,1)||""},Nu="O,Moz,ms,Ms,Webkit".split(","),Fs=function(t,e,n){var i=e||Dr,s=i.style,o=5;if(t in s&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(Nu[o]+t in s););return o<0?null:(o===3?"ms":o>=0?Nu[o]:"")+t},Dc=function(){Rg()&&window.document&&(Lu=window,tr=Lu.document,bs=tr.documentElement,Dr=Pc("div")||{style:{}},Pc("div"),Le=Fs(Le),Tn=Le+"Origin",Dr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",op=!!Fs("perspective"),Yh=Cn.core.reverting,Xh=1)},Ou=function(t){var e=t.ownerSVGElement,n=Pc("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),s;i.style.display="block",n.appendChild(i),bs.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),bs.removeChild(n),s},Fu=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},ap=function(t){var e,n;try{e=t.getBBox()}catch{e=Ou(t),n=1}return e&&(e.width||e.height)||n||(e=Ou(t)),e&&!e.width&&!e.x&&!e.y?{x:+Fu(t,["x","cx","x1"])||0,y:+Fu(t,["y","cy","y1"])||0,width:0,height:0}:e},lp=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&ap(t))},hr=function(t,e){if(e){var n=t.style,i;e in Bi&&e!==Tn&&(e=Le),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(qh,"-$1").toLowerCase())):n.removeAttribute(e)}},er=function(t,e,n,i,s,o){var a=new bn(t._pt,e,n,0,1,o?ip:np);return t._pt=a,a.b=i,a.e=s,t._props.push(n),a},Bu={deg:1,rad:1,turn:1},Wg={grid:1,flex:1},ur=function r(t,e,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=Dr.style,l=Pg.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,f=i==="px",d=i==="%",g,_,m,p;if(i===o||!s||Bu[i]||Bu[o])return s;if(o!=="px"&&!f&&(s=r(t,e,n,"px")),p=t.getCTM&&lp(t),(d||o==="%")&&(Bi[e]||~e.indexOf("adius")))return g=p?t.getBBox()[l?"width":"height"]:t[h],Fe(d?s/g*u:s/100*g);if(a[l?"width":"height"]=u+(f?o:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,p&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===tr||!_.appendChild)&&(_=tr.body),m=_._gsap,m&&d&&m.width&&l&&m.time===kn.time&&!m.uncache)return Fe(s/m.width*u);if(d&&(e==="height"||e==="width")){var S=t.style[e];t.style[e]=u+i,g=t[h],S?t.style[e]=S:hr(t,e)}else(d||o==="%")&&!Wg[Gn(_,"display")]&&(a.position=Gn(t,"position")),_===t&&(a.position="static"),_.appendChild(Dr),g=Dr[h],_.removeChild(Dr),a.position="absolute";return l&&d&&(m=Nr(_),m.time=kn.time,m.width=_[h]),Fe(f?g*s/u:g&&s?u/g*s:0)},Ri=function(t,e,n,i){var s;return Xh||Dc(),e in pi&&e!=="transform"&&(e=pi[e],~e.indexOf(",")&&(e=e.split(",")[0])),Bi[e]&&e!=="transform"?(s=Go(t,i),s=e!=="transformOrigin"?s[e]:s.svg?s.origin:rl(Gn(t,Tn))+" "+s.zOrigin+"px"):(s=t.style[e],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=il[e]&&il[e](t,e,n)||Gn(t,e)||wd(t,e)||(e==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?ur(t,e,s,n)+n:s},Xg=function(t,e,n,i){if(!n||n==="none"){var s=Fs(e,t,1),o=s&&Gn(t,s,1);o&&o!==n?(e=s,n=o):e==="borderColor"&&(n=Gn(t,"borderTopColor"))}var a=new bn(this._pt,t.style,e,0,1,Qd),l=0,c=0,h,u,f,d,g,_,m,p,S,M,v,C;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=Gn(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=Gn(t,e)||i,_?t.style[e]=_:hr(t,e)),h=[n,i],Xd(h),n=h[0],i=h[1],f=n.match(xs)||[],C=i.match(xs)||[],C.length){for(;u=xs.exec(i);)m=u[0],S=i.substring(l,u.index),g?g=(g+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(g=1),m!==(_=f[c++]||"")&&(d=parseFloat(_)||0,v=_.substr((d+"").length),m.charAt(1)==="="&&(m=Es(d,m)+v),p=parseFloat(m),M=m.substr((p+"").length),l=xs.lastIndex-M.length,M||(M=M||Wn.units[e]||v,l===i.length&&(i+=M,a.e+=M)),v!==M&&(d=ur(t,e,_,M)||0),a._pt={_next:a._pt,p:S||c===1?S:",",s:d,c:p-d,m:g&&g<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?ip:np;return Md.test(i)&&(a.e=0),this._pt=a,a},zu={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Yg=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=zu[n]||n,e[1]=zu[i]||i,e.join(" ")},qg=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,s=e.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Bi[a]&&(l=1,a=a==="transformOrigin"?Tn:Le),hr(n,a);l&&(hr(n,Le),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",Go(n,1),o.uncache=1,rp(i)))}},il={clearProps:function(t,e,n,i,s){if(s.data!=="isFromStart"){var o=t._pt=new bn(t._pt,e,n,0,0,qg);return o.u=i,o.pr=-10,o.tween=s,t._props.push(n),1}}},Vo=[1,0,0,1,0,0],cp={},hp=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},ku=function(t){var e=Gn(t,Le);return hp(e)?Vo:e.substr(7).match(yd).map(Fe)},$h=function(t,e){var n=t._gsap||Nr(t),i=t.style,s=ku(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Vo:s):(s===Vo&&!t.offsetParent&&t!==bs&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,bs.appendChild(t)),s=ku(t),l?i.display=l:hr(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):bs.removeChild(t))),e&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Lc=function(t,e,n,i,s,o){var a=t._gsap,l=s||$h(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,u=a.xOffset||0,f=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],S=l[5],M=e.split(" "),v=parseFloat(M[0])||0,C=parseFloat(M[1])||0,w,b,R,y;n?l!==Vo&&(b=d*m-g*_)&&(R=v*(m/b)+C*(-_/b)+(_*S-m*p)/b,y=v*(-g/b)+C*(d/b)-(d*S-g*p)/b,v=R,C=y):(w=ap(t),v=w.x+(~M[0].indexOf("%")?v/100*w.width:v),C=w.y+(~(M[1]||M[0]).indexOf("%")?C/100*w.height:C)),i||i!==!1&&a.smooth?(p=v-c,S=C-h,a.xOffset=u+(p*d+S*_)-p,a.yOffset=f+(p*g+S*m)-S):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=C,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[Tn]="0px 0px",o&&(er(o,a,"xOrigin",c,v),er(o,a,"yOrigin",h,C),er(o,a,"xOffset",u,a.xOffset),er(o,a,"yOffset",f,a.yOffset)),t.setAttribute("data-svg-origin",v+" "+C)},Go=function(t,e){var n=t._gsap||new qd(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=Gn(t,Tn)||"0",h,u,f,d,g,_,m,p,S,M,v,C,w,b,R,y,x,P,U,B,V,q,X,Y,k,et,D,st,Dt,jt,$,tt;return h=u=f=_=m=p=S=M=v=0,d=g=1,n.svg=!!(t.getCTM&&lp(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Le]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Le]!=="none"?l[Le]:"")),i.scale=i.rotate=i.translate="none"),b=$h(t,n.svg),n.svg&&(n.uncache?(k=t.getBBox(),c=n.xOrigin-k.x+"px "+(n.yOrigin-k.y)+"px",Y=""):Y=!e&&t.getAttribute("data-svg-origin"),Lc(t,Y||c,!!Y||n.originIsAbsolute,n.smooth!==!1,b)),C=n.xOrigin||0,w=n.yOrigin||0,b!==Vo&&(P=b[0],U=b[1],B=b[2],V=b[3],h=q=b[4],u=X=b[5],b.length===6?(d=Math.sqrt(P*P+U*U),g=Math.sqrt(V*V+B*B),_=P||U?Jr(U,P)*br:0,S=B||V?Jr(B,V)*br+_:0,S&&(g*=Math.abs(Math.cos(S*Ts))),n.svg&&(h-=C-(C*P+w*B),u-=w-(C*U+w*V))):(tt=b[6],jt=b[7],D=b[8],st=b[9],Dt=b[10],$=b[11],h=b[12],u=b[13],f=b[14],R=Jr(tt,Dt),m=R*br,R&&(y=Math.cos(-R),x=Math.sin(-R),Y=q*y+D*x,k=X*y+st*x,et=tt*y+Dt*x,D=q*-x+D*y,st=X*-x+st*y,Dt=tt*-x+Dt*y,$=jt*-x+$*y,q=Y,X=k,tt=et),R=Jr(-B,Dt),p=R*br,R&&(y=Math.cos(-R),x=Math.sin(-R),Y=P*y-D*x,k=U*y-st*x,et=B*y-Dt*x,$=V*x+$*y,P=Y,U=k,B=et),R=Jr(U,P),_=R*br,R&&(y=Math.cos(R),x=Math.sin(R),Y=P*y+U*x,k=q*y+X*x,U=U*y-P*x,X=X*y-q*x,P=Y,q=k),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=Fe(Math.sqrt(P*P+U*U+B*B)),g=Fe(Math.sqrt(X*X+tt*tt)),R=Jr(q,X),S=Math.abs(R)>2e-4?R*br:0,v=$?1/($<0?-$:$):0),n.svg&&(Y=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!hp(Gn(t,Le)),Y&&t.setAttribute("transform",Y))),Math.abs(S)>90&&Math.abs(S)<270&&(s?(d*=-1,S+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,S+=S<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Fe(d),n.scaleY=Fe(g),n.rotation=Fe(_)+a,n.rotationX=Fe(m)+a,n.rotationY=Fe(p)+a,n.skewX=S+a,n.skewY=M+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[Tn]=rl(c)),n.xOffset=n.yOffset=0,n.force3D=Wn.force3D,n.renderTransform=n.svg?Zg:op?up:$g,n.uncache=0,n},rl=function(t){return(t=t.split(" "))[0]+" "+t[1]},Pl=function(t,e,n){var i=an(e);return Fe(parseFloat(e)+parseFloat(ur(t,"x",n+"px",i)))+i},$g=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,up(t,e)},gr="0deg",js="0px",_r=") ",up=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,f=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,S=n.target,M=n.zOrigin,v="",C=p==="auto"&&t&&t!==1||p===!0;if(M&&(u!==gr||h!==gr)){var w=parseFloat(h)*Ts,b=Math.sin(w),R=Math.cos(w),y;w=parseFloat(u)*Ts,y=Math.cos(w),o=Pl(S,o,b*y*-M),a=Pl(S,a,-Math.sin(w)*-M),l=Pl(S,l,R*y*-M+M)}m!==js&&(v+="perspective("+m+_r),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(C||o!==js||a!==js||l!==js)&&(v+=l!==js||C?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+_r),c!==gr&&(v+="rotate("+c+_r),h!==gr&&(v+="rotateY("+h+_r),u!==gr&&(v+="rotateX("+u+_r),(f!==gr||d!==gr)&&(v+="skew("+f+", "+d+_r),(g!==1||_!==1)&&(v+="scale("+g+", "+_+_r),S.style[Le]=v||"translate(0, 0)"},Zg=function(t,e){var n=e||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,f=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,S=n.forceCSS,M=parseFloat(o),v=parseFloat(a),C,w,b,R,y;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Ts,c*=Ts,C=Math.cos(l)*u,w=Math.sin(l)*u,b=Math.sin(l-c)*-f,R=Math.cos(l-c)*f,c&&(h*=Ts,y=Math.tan(c-h),y=Math.sqrt(1+y*y),b*=y,R*=y,h&&(y=Math.tan(h),y=Math.sqrt(1+y*y),C*=y,w*=y)),C=Fe(C),w=Fe(w),b=Fe(b),R=Fe(R)):(C=u,R=f,w=b=0),(M&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(M=ur(d,"x",o,"px"),v=ur(d,"y",a,"px")),(g||_||m||p)&&(M=Fe(M+g-(g*C+_*b)+m),v=Fe(v+_-(g*w+_*R)+p)),(i||s)&&(y=d.getBBox(),M=Fe(M+i/100*y.width),v=Fe(v+s/100*y.height)),y="matrix("+C+","+w+","+b+","+R+","+M+","+v+")",d.setAttribute("transform",y),S&&(d.style[Le]=y)},Kg=function(t,e,n,i,s){var o=360,a=Qe(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?br:1),c=l-i,h=i+c+"deg",u,f;return a&&(u=s.split("_")[1],u==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),u==="cw"&&c<0?c=(c+o*Uu)%o-~~(c/o)*o:u==="ccw"&&c>0&&(c=(c-o*Uu)%o-~~(c/o)*o)),t._pt=f=new bn(t._pt,e,n,i,c,Lg),f.e=h,f.u="deg",t._props.push(n),f},Hu=function(t,e){for(var n in e)t[n]=e[n];return t},Jg=function(t,e,n){var i=Hu({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,u,f,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Le]=e,a=Go(n,1),hr(n,Le),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Le],o[Le]=e,a=Go(n,1),o[Le]=c);for(l in Bi)c=i[l],h=a[l],c!==h&&s.indexOf(l)<0&&(d=an(c),g=an(h),u=d!==g?ur(n,l,c,g):parseFloat(c),f=parseFloat(h),t._pt=new bn(t._pt,a,l,u,f-u,Rc),t._pt.u=g||0,t._props.push(l));Hu(a,i)};En("padding,margin,Width,Radius",function(r,t){var e="Top",n="Right",i="Bottom",s="Left",o=(t<3?[e,n,i,s]:[e+s,e+n,i+n,i+s]).map(function(a){return t<2?r+a:"border"+a+r});il[t>1?"border"+r:r]=function(a,l,c,h,u){var f,d;if(arguments.length<4)return f=o.map(function(g){return Ri(a,g,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(h+"").split(" "),d={},o.forEach(function(g,_){return d[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(l,d,u)}});var fp={name:"css",register:Dc,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,s){var o=this._props,a=t.style,l=n.vars.startAt,c,h,u,f,d,g,_,m,p,S,M,v,C,w,b,R,y;Xh||Dc(),this.styles=this.styles||sp(t),R=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(On[_]&&$d(_,e,n,i,t,s)))){if(d=typeof h,g=il[_],d==="function"&&(h=h.call(n,i,t,s),d=typeof h),d==="string"&&~h.indexOf("random(")&&(h=zo(h)),g)g(this,t,_,h,n)&&(b=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",sr.lastIndex=0,sr.test(c)||(m=an(c),p=an(h),p?m!==p&&(c=ur(t,_,c,p)+p):m&&(h+=m)),this.add(a,"setProperty",c,h,i,s,0,0,_),o.push(_),R.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,s):l[_],Qe(c)&&~c.indexOf("random(")&&(c=zo(c)),an(c+"")||c==="auto"||(c+=Wn.units[_]||an(Ri(t,_))||""),(c+"").charAt(1)==="="&&(c=Ri(t,_))):c=Ri(t,_),f=parseFloat(c),S=d==="string"&&h.charAt(1)==="="&&h.substr(0,2),S&&(h=h.substr(2)),u=parseFloat(h),_ in pi&&(_==="autoAlpha"&&(f===1&&Ri(t,"visibility")==="hidden"&&u&&(f=0),R.push("visibility",0,a.visibility),er(this,a,"visibility",f?"inherit":"hidden",u?"inherit":"hidden",!u)),_!=="scale"&&_!=="transform"&&(_=pi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),M=_ in Bi,M){if(this.styles.save(_),y=h,d==="string"&&h.substring(0,6)==="var(--"){if(h=Gn(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var x=t.style.perspective;t.style.perspective=h,h=Gn(t,"perspective"),x?t.style.perspective=x:hr(t,"perspective")}u=parseFloat(h)}if(v||(C=t._gsap,C.renderTransform&&!e.parseTransform||Go(t,e.parseTransform),w=e.smoothOrigin!==!1&&C.smooth,v=this._pt=new bn(this._pt,a,Le,0,1,C.renderTransform,C,0,-1),v.dep=1),_==="scale")this._pt=new bn(this._pt,C,"scaleY",C.scaleY,(S?Es(C.scaleY,S+u):u)-C.scaleY||0,Rc),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){R.push(Tn,0,a[Tn]),h=Yg(h),C.svg?Lc(t,h,0,w,0,this):(p=parseFloat(h.split(" ")[2])||0,p!==C.zOrigin&&er(this,C,"zOrigin",C.zOrigin,p),er(this,a,_,rl(c),rl(h)));continue}else if(_==="svgOrigin"){Lc(t,h,1,w,0,this);continue}else if(_ in cp){Kg(this,C,_,f,S?Es(f,S+h):h);continue}else if(_==="smoothOrigin"){er(this,C,"smooth",C.smooth,h);continue}else if(_==="force3D"){C[_]=h;continue}else if(_==="transform"){Jg(this,h,t);continue}}else _ in a||(_=Fs(_)||_);if(M||(u||u===0)&&(f||f===0)&&!Dg.test(h)&&_ in a)m=(c+"").substr((f+"").length),u||(u=0),p=an(h)||(_ in Wn.units?Wn.units[_]:m),m!==p&&(f=ur(t,_,c,p)),this._pt=new bn(this._pt,M?C:a,_,f,(S?Es(f,S+u):u)-f,!M&&(p==="px"||_==="zIndex")&&e.autoRound!==!1?Ng:Rc),this._pt.u=p||0,M&&y!==h?(this._pt.b=c,this._pt.e=y,this._pt.r=Ug):m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=Ig);else if(_ in a)Xg.call(this,t,_,c,S?S+h:h);else if(_ in t)this.add(t,_,c||t[_],S?S+h:h,i,s);else if(_!=="parseTransform"){Nh(_,h);continue}M||(_ in a?R.push(_,0,a[_]):typeof t[_]=="function"?R.push(_,2,t[_]()):R.push(_,1,c||t[_])),o.push(_)}}b&&tp(this)},render:function(t,e){if(e.tween._time||!Yh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:Ri,aliases:pi,getSetter:function(t,e,n){var i=pi[e];return i&&i.indexOf(",")<0&&(e=i),e in Bi&&e!==Tn&&(t._gsap.x||Ri(t,"x"))?n&&Iu===n?e==="scale"?zg:Bg:(Iu=n||{})&&(e==="scale"?kg:Hg):t.style&&!Lh(t.style[e])?Og:~e.indexOf("-")?Fg:Gh(t,e)},core:{_removeProperty:hr,_getMatrix:$h}};Cn.utils.checkPrefix=Fs;Cn.core.getStyleSaver=sp;(function(r,t,e,n){var i=En(r+","+t+","+e,function(s){Bi[s]=1});En(t,function(s){Wn.units[s]="deg",cp[s]=1}),pi[i[13]]=r+","+t,En(n,function(s){var o=s.split(":");pi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");En("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Wn.units[r]="px"});Cn.registerPlugin(fp);var So=Cn.registerPlugin(fp)||Cn;So.core.Tween;function jg(r,t){for(var e=0;e<t.length;e++){var n=t[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Qg(r,t,e){return t&&jg(r.prototype,t),r}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var tn,ka,Hn,nr,ir,ws,dp,Tr,As,pp,Li,oi,mp,gp=function(){return tn||typeof window<"u"&&(tn=window.gsap)&&tn.registerPlugin&&tn},_p=1,Ms=[],ie=[],vi=[],Eo=Date.now,Ic=function(t,e){return e},t_=function(){var t=As.core,e=t.bridge||{},n=t._scrollers,i=t._proxies;n.push.apply(n,ie),i.push.apply(i,vi),ie=n,vi=i,Ic=function(o,a){return e[o](a)}},or=function(t,e){return~vi.indexOf(t)&&vi[vi.indexOf(t)+1][e]},bo=function(t){return!!~pp.indexOf(t)},dn=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:i!==!1,capture:!!s})},fn=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},Qo="scrollLeft",ta="scrollTop",Uc=function(){return Li&&Li.isPressed||ie.cache++},sl=function(t,e){var n=function i(s){if(s||s===0){_p&&(Hn.history.scrollRestoration="manual");var o=Li&&Li.isPressed;s=i.v=Math.round(s)||(Li&&Li.iOS?1:0),t(s),i.cacheID=ie.cache,o&&Ic("ss",s)}else(e||ie.cache!==i.cacheID||Ic("ref"))&&(i.cacheID=ie.cache,i.v=t());return i.v+i.offset};return n.offset=0,t&&n},xn={s:Qo,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:sl(function(r){return arguments.length?Hn.scrollTo(r,Xe.sc()):Hn.pageXOffset||nr[Qo]||ir[Qo]||ws[Qo]||0})},Xe={s:ta,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:xn,sc:sl(function(r){return arguments.length?Hn.scrollTo(xn.sc(),r):Hn.pageYOffset||nr[ta]||ir[ta]||ws[ta]||0})},yn=function(t,e){return(e&&e._ctx&&e._ctx.selector||tn.utils.toArray)(t)[0]||(typeof t=="string"&&tn.config().nullTargetWarn!==!1?console.warn("Element not found:",t):null)},e_=function(t,e){for(var n=e.length;n--;)if(e[n]===t||e[n].contains(t))return!0;return!1},fr=function(t,e){var n=e.s,i=e.sc;bo(t)&&(t=nr.scrollingElement||ir);var s=ie.indexOf(t),o=i===Xe.sc?1:2;!~s&&(s=ie.push(t)-1),ie[s+o]||dn(t,"scroll",Uc);var a=ie[s+o],l=a||(ie[s+o]=sl(or(t,n),!0)||(bo(t)?i:sl(function(c){return arguments.length?t[n]=c:t[n]})));return l.target=t,a||(l.smooth=tn.getProperty(t,"scrollBehavior")==="smooth"),l},Nc=function(t,e,n){var i=t,s=t,o=Eo(),a=o,l=e||50,c=Math.max(500,l*3),h=function(g,_){var m=Eo();_||m-o>l?(s=i,i=g,a=o,o=m):n?i+=g:i=s+(g-s)/(m-a)*(o-a)},u=function(){s=i=n?0:i,a=o=0},f=function(g){var _=a,m=s,p=Eo();return(g||g===0)&&g!==i&&h(g),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-_)*1e3};return{update:h,reset:u,getVelocity:f}},Qs=function(t,e){return e&&!t._gsapAllow&&t.cancelable!==!1&&t.preventDefault(),t.changedTouches?t.changedTouches[0]:t},Vu=function(t){var e=Math.max.apply(Math,t),n=Math.min.apply(Math,t);return Math.abs(e)>=Math.abs(n)?e:n},vp=function(){As=tn.core.globals().ScrollTrigger,As&&As.core&&t_()},xp=function(t){return tn=t||gp(),!ka&&tn&&typeof document<"u"&&document.body&&(Hn=window,nr=document,ir=nr.documentElement,ws=nr.body,pp=[Hn,nr,ir,ws],tn.utils.clamp,mp=tn.core.context||function(){},Tr="onpointerenter"in ws?"pointer":"mouse",dp=Be.isTouch=Hn.matchMedia&&Hn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Hn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,oi=Be.eventTypes=("ontouchstart"in ir?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ir?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return _p=0},500),ka=1),As||vp(),ka};xn.op=Xe;ie.cache=0;var Be=(function(){function r(e){this.init(e)}var t=r.prototype;return t.init=function(n){ka||xp(tn)||console.warn("Please gsap.registerPlugin(Observer)"),As||vp();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,h=n.preventDefault,u=n.onStop,f=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,S=n.onDrag,M=n.onPress,v=n.onRelease,C=n.onRight,w=n.onLeft,b=n.onUp,R=n.onDown,y=n.onChangeX,x=n.onChangeY,P=n.onChange,U=n.onToggleX,B=n.onToggleY,V=n.onHover,q=n.onHoverEnd,X=n.onMove,Y=n.ignoreCheck,k=n.isNormalizer,et=n.onGestureStart,D=n.onGestureEnd,st=n.onWheel,Dt=n.onEnable,jt=n.onDisable,$=n.onClick,tt=n.scrollSpeed,ut=n.capture,nt=n.allowClicks,xt=n.lockAxis,Et=n.onLockAxis;this.target=a=yn(a)||ir,this.vars=n,d&&(d=tn.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,tt=tt||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Hn.getComputedStyle(ws).lineHeight)||22);var zt,$t,Ut,Rt,N,ye,kt,z=this,Tt=0,se=0,Pt=n.passive||!h&&n.passive!==!1,A=fr(a,xn),E=fr(a,Xe),G=A(),Q=E(),j=~o.indexOf("touch")&&!~o.indexOf("pointer")&&oi[0]==="pointerdown",K=bo(a),ft=a.ownerDocument||nr,lt=[0,0,0],mt=[0,0,0],Yt=0,it=function(){return Yt=Eo()},at=function(wt,Kt){return(z.event=wt)&&d&&e_(wt.target,d)||Kt&&j&&wt.pointerType!=="touch"||Y&&Y(wt,Kt)},Nt=function(){z._vx.reset(),z._vy.reset(),$t.pause(),u&&u(z)},It=function(){var wt=z.deltaX=Vu(lt),Kt=z.deltaY=Vu(mt),gt=Math.abs(wt)>=i,Wt=Math.abs(Kt)>=i;P&&(gt||Wt)&&P(z,wt,Kt,lt,mt),gt&&(C&&z.deltaX>0&&C(z),w&&z.deltaX<0&&w(z),y&&y(z),U&&z.deltaX<0!=Tt<0&&U(z),Tt=z.deltaX,lt[0]=lt[1]=lt[2]=0),Wt&&(R&&z.deltaY>0&&R(z),b&&z.deltaY<0&&b(z),x&&x(z),B&&z.deltaY<0!=se<0&&B(z),se=z.deltaY,mt[0]=mt[1]=mt[2]=0),(Rt||Ut)&&(X&&X(z),Ut&&(m&&Ut===1&&m(z),S&&S(z),Ut=0),Rt=!1),ye&&!(ye=!1)&&Et&&Et(z),N&&(st(z),N=!1),zt=0},yt=function(wt,Kt,gt){lt[gt]+=wt,mt[gt]+=Kt,z._vx.update(wt),z._vy.update(Kt),c?zt||(zt=requestAnimationFrame(It)):It()},Zt=function(wt,Kt){xt&&!kt&&(z.axis=kt=Math.abs(wt)>Math.abs(Kt)?"x":"y",ye=!0),kt!=="y"&&(lt[2]+=wt,z._vx.update(wt,!0)),kt!=="x"&&(mt[2]+=Kt,z._vy.update(Kt,!0)),c?zt||(zt=requestAnimationFrame(It)):It()},Bt=function(wt){if(!at(wt,1)){wt=Qs(wt,h);var Kt=wt.clientX,gt=wt.clientY,Wt=Kt-z.x,At=gt-z.y,Gt=z.isDragging;z.x=Kt,z.y=gt,(Gt||(Wt||At)&&(Math.abs(z.startX-Kt)>=s||Math.abs(z.startY-gt)>=s))&&(Ut||(Ut=Gt?2:1),Gt||(z.isDragging=!0),Zt(Wt,At))}},ae=z.onPress=function(vt){at(vt,1)||vt&&vt.button||(z.axis=kt=null,$t.pause(),z.isPressed=!0,vt=Qs(vt),Tt=se=0,z.startX=z.x=vt.clientX,z.startY=z.y=vt.clientY,z._vx.reset(),z._vy.reset(),dn(k?a:ft,oi[1],Bt,Pt,!0),z.deltaX=z.deltaY=0,M&&M(z))},L=z.onRelease=function(vt){if(!at(vt,1)){fn(k?a:ft,oi[1],Bt,!0);var wt=!isNaN(z.y-z.startY),Kt=z.isDragging,gt=Kt&&(Math.abs(z.x-z.startX)>3||Math.abs(z.y-z.startY)>3),Wt=Qs(vt);!gt&&wt&&(z._vx.reset(),z._vy.reset(),h&&nt&&tn.delayedCall(.08,function(){if(Eo()-Yt>300&&!vt.defaultPrevented){if(vt.target.click)vt.target.click();else if(ft.createEvent){var At=ft.createEvent("MouseEvents");At.initMouseEvent("click",!0,!0,Hn,1,Wt.screenX,Wt.screenY,Wt.clientX,Wt.clientY,!1,!1,!1,!1,0,null),vt.target.dispatchEvent(At)}}})),z.isDragging=z.isGesturing=z.isPressed=!1,u&&Kt&&!k&&$t.restart(!0),Ut&&It(),p&&Kt&&p(z),v&&v(z,gt)}},ht=function(wt){return wt.touches&&wt.touches.length>1&&(z.isGesturing=!0)&&et(wt,z.isDragging)},Z=function(){return(z.isGesturing=!1)||D(z)},J=function(wt){if(!at(wt)){var Kt=A(),gt=E();yt((Kt-G)*tt,(gt-Q)*tt,1),G=Kt,Q=gt,u&&$t.restart(!0)}},ct=function(wt){if(!at(wt)){wt=Qs(wt,h),st&&(N=!0);var Kt=(wt.deltaMode===1?l:wt.deltaMode===2?Hn.innerHeight:1)*g;yt(wt.deltaX*Kt,wt.deltaY*Kt,0),u&&!k&&$t.restart(!0)}},dt=function(wt){if(!at(wt)){var Kt=wt.clientX,gt=wt.clientY,Wt=Kt-z.x,At=gt-z.y;z.x=Kt,z.y=gt,Rt=!0,u&&$t.restart(!0),(Wt||At)&&Zt(Wt,At)}},Ht=function(wt){z.event=wt,V(z)},ce=function(wt){z.event=wt,q(z)},Ie=function(wt){return at(wt)||Qs(wt,h)&&$(z)};$t=z._dc=tn.delayedCall(f||.25,Nt).pause(),z.deltaX=z.deltaY=0,z._vx=Nc(0,50,!0),z._vy=Nc(0,50,!0),z.scrollX=A,z.scrollY=E,z.isDragging=z.isGesturing=z.isPressed=!1,mp(this),z.enable=function(vt){return z.isEnabled||(dn(K?ft:a,"scroll",Uc),o.indexOf("scroll")>=0&&dn(K?ft:a,"scroll",J,Pt,ut),o.indexOf("wheel")>=0&&dn(a,"wheel",ct,Pt,ut),(o.indexOf("touch")>=0&&dp||o.indexOf("pointer")>=0)&&(dn(a,oi[0],ae,Pt,ut),dn(ft,oi[2],L),dn(ft,oi[3],L),nt&&dn(a,"click",it,!0,!0),$&&dn(a,"click",Ie),et&&dn(ft,"gesturestart",ht),D&&dn(ft,"gestureend",Z),V&&dn(a,Tr+"enter",Ht),q&&dn(a,Tr+"leave",ce),X&&dn(a,Tr+"move",dt)),z.isEnabled=!0,z.isDragging=z.isGesturing=z.isPressed=Rt=Ut=!1,z._vx.reset(),z._vy.reset(),G=A(),Q=E(),vt&&vt.type&&ae(vt),Dt&&Dt(z)),z},z.disable=function(){z.isEnabled&&(Ms.filter(function(vt){return vt!==z&&bo(vt.target)}).length||fn(K?ft:a,"scroll",Uc),z.isPressed&&(z._vx.reset(),z._vy.reset(),fn(k?a:ft,oi[1],Bt,!0)),fn(K?ft:a,"scroll",J,ut),fn(a,"wheel",ct,ut),fn(a,oi[0],ae,ut),fn(ft,oi[2],L),fn(ft,oi[3],L),fn(a,"click",it,!0),fn(a,"click",Ie),fn(ft,"gesturestart",ht),fn(ft,"gestureend",Z),fn(a,Tr+"enter",Ht),fn(a,Tr+"leave",ce),fn(a,Tr+"move",dt),z.isEnabled=z.isPressed=z.isDragging=!1,jt&&jt(z))},z.kill=z.revert=function(){z.disable();var vt=Ms.indexOf(z);vt>=0&&Ms.splice(vt,1),Li===z&&(Li=0)},Ms.push(z),k&&bo(a)&&(Li=z),z.enable(_)},Qg(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();Be.version="3.15.0";Be.create=function(r){return new Be(r)};Be.register=xp;Be.getAll=function(){return Ms.slice()};Be.getById=function(r){return Ms.filter(function(t){return t.vars.id===r})[0]};gp()&&tn.registerPlugin(Be);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var St,gs,ne,ge,Bn,me,Zh,ol,Wo,To,ho,ea,sn,_l,Oc,_n,Gu,Wu,_s,yp,Dl,Mp,gn,Fc,Sp,Ep,Ki,Bc,Kh,Cs,Jh,wo,zc,Ll,na=1,on=Date.now,Il=on(),ei=0,uo=0,Xu=function(t,e,n){var i=Nn(t)&&(t.substr(0,6)==="clamp("||t.indexOf("max")>-1);return n["_"+e+"Clamp"]=i,i?t.substr(6,t.length-7):t},Yu=function(t,e){return e&&(!Nn(t)||t.substr(0,6)!=="clamp(")?"clamp("+t+")":t},n_=function r(){return uo&&requestAnimationFrame(r)},qu=function(){return _l=1},$u=function(){return _l=0},ui=function(t){return t},fo=function(t){return Math.round(t*1e5)/1e5||0},bp=function(){return typeof window<"u"},Tp=function(){return St||bp()&&(St=window.gsap)&&St.registerPlugin&&St},Vr=function(t){return!!~Zh.indexOf(t)},wp=function(t){return(t==="Height"?Jh:ne["inner"+t])||Bn["client"+t]||me["client"+t]},Ap=function(t){return or(t,"getBoundingClientRect")||(Vr(t)?function(){return Xa.width=ne.innerWidth,Xa.height=Jh,Xa}:function(){return Pi(t)})},i_=function(t,e,n){var i=n.d,s=n.d2,o=n.a;return(o=or(t,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(e?wp(s):t["client"+s])||0}},r_=function(t,e){return!e||~vi.indexOf(t)?Ap(t):function(){return Xa}},mi=function(t,e){var n=e.s,i=e.d2,s=e.d,o=e.a;return Math.max(0,(n="scroll"+i)&&(o=or(t,n))?o()-Ap(t)()[s]:Vr(t)?(Bn[n]||me[n])-wp(i):t[n]-t["offset"+i])},ia=function(t,e){for(var n=0;n<_s.length;n+=3)(!e||~e.indexOf(_s[n+1]))&&t(_s[n],_s[n+1],_s[n+2])},Nn=function(t){return typeof t=="string"},ln=function(t){return typeof t=="function"},po=function(t){return typeof t=="number"},wr=function(t){return typeof t=="object"},to=function(t,e,n){return t&&t.progress(e?0:1)&&n&&t.pause()},jr=function(t,e,n){if(t.enabled){var i=t._ctx?t._ctx.add(function(){return e(t,n)}):e(t,n);i&&i.totalTime&&(t.callbackAnimation=i)}},Qr=Math.abs,Cp="left",Rp="top",jh="right",Qh="bottom",zr="width",kr="height",Ao="Right",Co="Left",Ro="Top",Po="Bottom",ke="padding",Jn="margin",Bs="Width",tu="Height",We="px",jn=function(t){return ne.getComputedStyle(t.nodeType===Node.DOCUMENT_NODE?t.scrollingElement:t)},s_=function(t){var e=jn(t).position;t.style.position=e==="absolute"||e==="fixed"?e:"relative"},Zu=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},Pi=function(t,e){var n=e&&jn(t)[Oc]!=="matrix(1, 0, 0, 1, 0, 0)"&&St.to(t,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=t.getBoundingClientRect?t.getBoundingClientRect():t.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),i},al=function(t,e){var n=e.d2;return t["offset"+n]||t["client"+n]||0},Pp=function(t){var e=[],n=t.labels,i=t.duration(),s;for(s in n)e.push(n[s]/i);return e},o_=function(t){return function(e){return St.utils.snap(Pp(t),e)}},eu=function(t){var e=St.utils.snap(t),n=Array.isArray(t)&&t.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return e(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=e(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:e(s<0?i-t:i+t)}},a_=function(t){return function(e,n){return eu(Pp(t))(e,n.direction)}},ra=function(t,e,n,i){return n.split(",").forEach(function(s){return t(e,s,i)})},Je=function(t,e,n,i,s){return t.addEventListener(e,n,{passive:!i,capture:!!s})},Ke=function(t,e,n,i){return t.removeEventListener(e,n,!!i)},sa=function(t,e,n){n=n&&n.wheelHandler,n&&(t(e,"wheel",n),t(e,"touchmove",n))},Ku={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},oa={toggleActions:"play",anticipatePin:0},ll={top:0,left:0,center:.5,bottom:1,right:1},Ha=function(t,e){if(Nn(t)){var n=t.indexOf("="),i=~n?+(t.charAt(n-1)+1)*parseFloat(t.substr(n+1)):0;~n&&(t.indexOf("%")>n&&(i*=e/100),t=t.substr(0,n-1)),t=i+(t in ll?ll[t]*e:~t.indexOf("%")?parseFloat(t)*e/100:parseFloat(t)||0)}return t},aa=function(t,e,n,i,s,o,a,l){var c=s.startColor,h=s.endColor,u=s.fontSize,f=s.indent,d=s.fontWeight,g=ge.createElement("div"),_=Vr(n)||or(n,"pinType")==="fixed",m=t.indexOf("scroller")!==-1,p=_?me:n.tagName==="IFRAME"?n.contentDocument.body:n,S=t.indexOf("start")!==-1,M=S?c:h,v="border-color:"+M+";font-size:"+u+";color:"+M+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(i===Xe?jh:Qh)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=S,g.setAttribute("class","gsap-marker-"+t+(e?" marker-"+e:"")),g.style.cssText=v,g.innerText=e||e===0?t+"-"+e:t,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+i.op.d2],Va(g,0,i,S),g},Va=function(t,e,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];t._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Bs]=1,s["border"+a+Bs]=0,s[n.p]=e+"px",St.set(t,s)},te=[],kc={},Xo,Ju=function(){return on()-ei>34&&(Xo||(Xo=requestAnimationFrame(Ni)))},ts=function(){(!gn||!gn.isPressed||gn.startX>me.clientWidth)&&(ie.cache++,gn?Xo||(Xo=requestAnimationFrame(Ni)):Ni(),ei||Wr("scrollStart"),ei=on())},Ul=function(){Ep=ne.innerWidth,Sp=ne.innerHeight},mo=function(t){ie.cache++,(t===!0||!sn&&!Mp&&!ge.fullscreenElement&&!ge.webkitFullscreenElement&&(!Fc||Ep!==ne.innerWidth||Math.abs(ne.innerHeight-Sp)>ne.innerHeight*.25))&&ol.restart(!0)},Gr={},l_=[],Dp=function r(){return Ke(re,"scrollEnd",r)||Lr(!0)},Wr=function(t){return Gr[t]&&Gr[t].map(function(e){return e()})||l_},Un=[],Lp=function(t){for(var e=0;e<Un.length;e+=5)(!t||Un[e+4]&&Un[e+4].query===t)&&(Un[e].style.cssText=Un[e+1],Un[e].getBBox&&Un[e].setAttribute("transform",Un[e+2]||""),Un[e+3].uncache=1)},Ip=function(){return ie.forEach(function(t){return ln(t)&&++t.cacheID&&(t.rec=t())})},nu=function(t,e){var n;for(_n=0;_n<te.length;_n++)n=te[_n],n&&(!e||n._ctx===e)&&(t?n.kill(1):n.revert(!0,!0));wo=!0,e&&Lp(e),e||Wr("revert")},Up=function(t,e){ie.cache++,(e||!vn)&&ie.forEach(function(n){return ln(n)&&n.cacheID++&&(n.rec=0)}),Nn(t)&&(ne.history.scrollRestoration=Kh=t)},vn,Hr=0,ju,c_=function(){if(ju!==Hr){var t=ju=Hr;requestAnimationFrame(function(){return t===Hr&&Lr(!0)})}},Np=function(){me.appendChild(Cs),Jh=!gn&&Cs.offsetHeight||ne.innerHeight,me.removeChild(Cs)},Qu=function(t){return Wo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(e){return e.style.display=t?"none":"block"})},Lr=function(t,e){if(Bn=ge.documentElement,me=ge.body,Zh=[ne,ge,Bn,me],ei&&!t&&!wo){Je(re,"scrollEnd",Dp);return}Np(),vn=re.isRefreshing=!0,wo||Ip();var n=Wr("refreshInit");yp&&re.sort(),e||nu(),ie.forEach(function(i){ln(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),te.slice(0).forEach(function(i){return i.refresh()}),wo=!1,te.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),zc=1,Qu(!0),te.forEach(function(i){var s=mi(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Qu(!1),zc=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),ie.forEach(function(i){ln(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Up(Kh,1),ol.pause(),Hr++,vn=2,Ni(2),te.forEach(function(i){return ln(i.vars.onRefresh)&&i.vars.onRefresh(i)}),vn=re.isRefreshing=!1,Wr("refresh")},Hc=0,Ga=1,Do,Ni=function(t){if(t===2||!vn&&!wo){re.isUpdating=!0,Do&&Do.update(0);var e=te.length,n=on(),i=n-Il>=50,s=e&&te[0].scroll();if(Ga=Hc>s?-1:1,vn||(Hc=s),i&&(ei&&!_l&&n-ei>200&&(ei=0,Wr("scrollEnd")),ho=Il,Il=n),Ga<0){for(_n=e;_n-- >0;)te[_n]&&te[_n].update(0,i);Ga=1}else for(_n=0;_n<e;_n++)te[_n]&&te[_n].update(0,i);re.isUpdating=!1}Xo=0},Vc=[Cp,Rp,Qh,jh,Jn+Po,Jn+Ao,Jn+Ro,Jn+Co,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Wa=Vc.concat([zr,kr,"boxSizing","max"+Bs,"max"+tu,"position",Jn,ke,ke+Ro,ke+Ao,ke+Po,ke+Co]),h_=function(t,e,n){Rs(n);var i=t._gsap;if(i.spacerIsNative)Rs(i.spacerState);else if(t._gsap.swappedIn){var s=e.parentNode;s&&(s.insertBefore(t,e),s.removeChild(e))}t._gsap.swappedIn=!1},Nl=function(t,e,n,i){if(!t._gsap.swappedIn){for(var s=Vc.length,o=e.style,a=t.style,l;s--;)l=Vc[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Qh]=a[jh]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[zr]=al(t,xn)+We,o[kr]=al(t,Xe)+We,o[ke]=a[Jn]=a[Rp]=a[Cp]="0",Rs(i),a[zr]=a["max"+Bs]=n[zr],a[kr]=a["max"+tu]=n[kr],a[ke]=n[ke],t.parentNode!==e&&(t.parentNode.insertBefore(e,t),e.appendChild(t)),t._gsap.swappedIn=!0}},u_=/([A-Z])/g,Rs=function(t){if(t){var e=t.t.style,n=t.length,i=0,s,o;for((t.t._gsap||St.core.getCache(t.t)).uncache=1;i<n;i+=2)o=t[i+1],s=t[i],o?e[s]=o:e[s]&&e.removeProperty(s.replace(u_,"-$1").toLowerCase())}},la=function(t){for(var e=Wa.length,n=t.style,i=[],s=0;s<e;s++)i.push(Wa[s],n[Wa[s]]);return i.t=t,i},f_=function(t,e,n){for(var i=[],s=t.length,o=n?8:0,a;o<s;o+=2)a=t[o],i.push(a,a in e?e[a]:t[o+1]);return i.t=t.t,i},Xa={left:0,top:0},tf=function(t,e,n,i,s,o,a,l,c,h,u,f,d,g){ln(t)&&(t=t(l)),Nn(t)&&t.substr(0,3)==="max"&&(t=f+(t.charAt(4)==="="?Ha("0"+t.substr(3),n):0));var _=d?d.time():0,m,p,S;if(d&&d.seek(0),isNaN(t)||(t=+t),po(t))d&&(t=St.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,t)),a&&Va(a,n,i,!0);else{ln(e)&&(e=e(l));var M=(t||"0").split(" "),v,C,w,b;S=yn(e,l)||me,v=Pi(S)||{},(!v||!v.left&&!v.top)&&jn(S).display==="none"&&(b=S.style.display,S.style.display="block",v=Pi(S),b?S.style.display=b:S.style.removeProperty("display")),C=Ha(M[0],v[i.d]),w=Ha(M[1]||"0",n),t=v[i.p]-c[i.p]-h+C+s-w,a&&Va(a,w,i,n-w<20||a._isStart&&w>20),n-=n-w}if(g&&(l[g]=t||-.001,t<0&&(t=0)),o){var R=t+n,y=o._isStart;m="scroll"+i.d2,Va(o,R,i,y&&R>20||!y&&(u?Math.max(me[m],Bn[m]):o.parentNode[m])<=R+1),u&&(c=Pi(a),u&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+We))}return d&&S&&(m=Pi(S),d.seek(f),p=Pi(S),d._caScrollDist=m[i.p]-p[i.p],t=t/d._caScrollDist*f),d&&d.seek(_),d?t:Math.round(t)},d_=/(webkit|moz|length|cssText|inset)/i,ef=function(t,e,n,i){if(t.parentNode!==e){var s=t.style,o,a;if(e===me){t._stOrig=s.cssText,a=jn(t);for(o in a)!+o&&!d_.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=t._stOrig;St.core.getCache(t).uncache=1,e.appendChild(t)}},Op=function(t,e,n){var i=e,s=i;return function(o){var a=Math.round(t());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},ca=function(t,e,n){var i={};i[e.p]="+="+n,St.set(t,i)},nf=function(t,e){var n=fr(t,e),i="_scroll"+e.p2,s=function o(a,l,c,h,u){var f=o.tween,d=l.onComplete,g={};c=c||n();var _=Op(n,c,function(){f.kill(),o.tween=0});return u=h&&u||0,h=h||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+h*f.ratio+u*f.ratio*f.ratio)},l.onUpdate=function(){ie.cache++,o.tween&&Ni()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=St.to(t,l),f};return t[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Je(t,"wheel",n.wheelHandler),re.isTouch&&Je(t,"touchmove",n.wheelHandler),s},re=(function(){function r(e,n){gs||r.register(St)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Bc(this),this.init(e,n)}var t=r.prototype;return t.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!uo){this.update=this.refresh=this.kill=ui;return}n=Zu(Nn(n)||po(n)||n.nodeType?{trigger:n}:n,oa);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,h=s.onRefresh,u=s.scrub,f=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,S=s.onSnapComplete,M=s.once,v=s.snap,C=s.pinReparent,w=s.pinSpacer,b=s.containerAnimation,R=s.fastScrollEnd,y=s.preventOverlaps,x=n.horizontal||n.containerAnimation&&n.horizontal!==!1?xn:Xe,P=!u&&u!==0,U=yn(n.scroller||ne),B=St.core.getCache(U),V=Vr(U),q=("pinType"in n?n.pinType:or(U,"pinType")||V&&"fixed")==="fixed",X=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],Y=P&&n.toggleActions.split(" "),k="markers"in n?n.markers:oa.markers,et=V?0:parseFloat(jn(U)["border"+x.p2+Bs])||0,D=this,st=n.onRefreshInit&&function(){return n.onRefreshInit(D)},Dt=i_(U,V,x),jt=r_(U,V),$=0,tt=0,ut=0,nt=fr(U,x),xt,Et,zt,$t,Ut,Rt,N,ye,kt,z,Tt,se,Pt,A,E,G,Q,j,K,ft,lt,mt,Yt,it,at,Nt,It,yt,Zt,Bt,ae,L,ht,Z,J,ct,dt,Ht,ce;if(D._startClamp=D._endClamp=!1,D._dir=x,m*=45,D.scroller=U,D.scroll=b?b.time.bind(b):nt,$t=nt(),D.vars=n,i=i||n.animation,"refreshPriority"in n&&(yp=1,n.refreshPriority===-9999&&(Do=D)),B.tweenScroll=B.tweenScroll||{top:nf(U,Xe),left:nf(U,xn)},D.tweenTo=xt=B.tweenScroll[x.p],D.scrubDuration=function(gt){ht=po(gt)&&gt,ht?L?L.duration(gt):L=St.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ht,paused:!0,onComplete:function(){return p&&p(D)}}):(L&&L.progress(1).kill(),L=0)},i&&(i.vars.lazy=!1,i._initted&&!D.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),D.animation=i.pause(),i.scrollTrigger=D,D.scrubDuration(u),Bt=0,l||(l=i.vars.id)),v&&((!wr(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in me.style&&St.set(V?[me,Bn]:U,{scrollBehavior:"auto"}),ie.forEach(function(gt){return ln(gt)&&gt.target===(V?ge.scrollingElement||Bn:U)&&(gt.smooth=!1)}),zt=ln(v.snapTo)?v.snapTo:v.snapTo==="labels"?o_(i):v.snapTo==="labelsDirectional"?a_(i):v.directional!==!1?function(gt,Wt){return eu(v.snapTo)(gt,on()-tt<500?0:Wt.direction)}:St.utils.snap(v.snapTo),Z=v.duration||{min:.1,max:2},Z=wr(Z)?To(Z.min,Z.max):To(Z,Z),J=St.delayedCall(v.delay||ht/2||.1,function(){var gt=nt(),Wt=on()-tt<500,At=xt.tween;if((Wt||Math.abs(D.getVelocity())<10)&&!At&&!_l&&$!==gt){var Gt=(gt-Rt)/A,Oe=i&&!P?i.totalProgress():Gt,ee=Wt?0:(Oe-ae)/(on()-ho)*1e3||0,Te=St.utils.clamp(-Gt,1-Gt,Qr(ee/2)*ee/.185),Ge=Gt+(v.inertia===!1?0:Te),Me,Se,ue=v,Pn=ue.onStart,we=ue.onInterrupt,un=ue.onComplete;if(Me=zt(Ge,D),po(Me)||(Me=Ge),Se=Math.max(0,Math.round(Rt+Me*A)),gt<=N&&gt>=Rt&&Se!==gt){if(At&&!At._initted&&At.data<=Qr(Se-gt))return;v.inertia===!1&&(Te=Me-Gt),xt(Se,{duration:Z(Qr(Math.max(Qr(Ge-Oe),Qr(Me-Oe))*.185/ee/.05||0)),ease:v.ease||"power3",data:Qr(Se-gt),onInterrupt:function(){return J.restart(!0)&&we&&jr(D,we)},onComplete:function(){D.update(),$=nt(),i&&!P&&(L?L.resetTo("totalProgress",Me,i._tTime/i._tDur):i.progress(Me)),Bt=ae=i&&!P?i.totalProgress():D.progress,S&&S(D),un&&jr(D,un)}},gt,Te*A,Se-gt-Te*A),Pn&&jr(D,Pn,xt.tween)}}else D.isActive&&$!==gt&&J.restart(!0)}).pause()),l&&(kc[l]=D),f=D.trigger=yn(f||d!==!0&&d),ce=f&&f._gsap&&f._gsap.stRevert,ce&&(ce=ce(D)),d=d===!0?f:yn(d),Nn(a)&&(a={targets:f,className:a}),d&&(g===!1||g===Jn||(g=!g&&d.parentNode&&d.parentNode.style&&jn(d.parentNode).display==="flex"?!1:ke),D.pin=d,Et=St.core.getCache(d),Et.spacer?E=Et.pinState:(w&&(w=yn(w),w&&!w.nodeType&&(w=w.current||w.nativeElement),Et.spacerIsNative=!!w,w&&(Et.spacerState=la(w))),Et.spacer=j=w||ge.createElement("div"),j.classList.add("pin-spacer"),l&&j.classList.add("pin-spacer-"+l),Et.pinState=E=la(d)),n.force3D!==!1&&St.set(d,{force3D:!0}),D.spacer=j=Et.spacer,Zt=jn(d),it=Zt[g+x.os2],ft=St.getProperty(d),lt=St.quickSetter(d,x.a,We),Nl(d,j,Zt),Q=la(d)),k){se=wr(k)?Zu(k,Ku):Ku,z=aa("scroller-start",l,U,x,se,0),Tt=aa("scroller-end",l,U,x,se,0,z),K=z["offset"+x.op.d2];var Ie=yn(or(U,"content")||U);ye=this.markerStart=aa("start",l,Ie,x,se,K,0,b),kt=this.markerEnd=aa("end",l,Ie,x,se,K,0,b),b&&(Ht=St.quickSetter([ye,kt],x.a,We)),!q&&!(vi.length&&or(U,"fixedMarkers")===!0)&&(s_(V?me:U),St.set([z,Tt],{force3D:!0}),Nt=St.quickSetter(z,x.a,We),yt=St.quickSetter(Tt,x.a,We))}if(b){var vt=b.vars.onUpdate,wt=b.vars.onUpdateParams;b.eventCallback("onUpdate",function(){D.update(0,0,1),vt&&vt.apply(b,wt||[])})}if(D.previous=function(){return te[te.indexOf(D)-1]},D.next=function(){return te[te.indexOf(D)+1]},D.revert=function(gt,Wt){if(!Wt)return D.kill(!0);var At=gt!==!1||!D.enabled,Gt=sn;At!==D.isReverted&&(At&&(ct=Math.max(nt(),D.scroll.rec||0),ut=D.progress,dt=i&&i.progress()),ye&&[ye,kt,z,Tt].forEach(function(Oe){return Oe.style.display=At?"none":"block"}),At&&(sn=D,D.update(At)),d&&(!C||!D.isActive)&&(At?h_(d,j,E):Nl(d,j,jn(d),at)),At||D.update(At),sn=Gt,D.isReverted=At)},D.refresh=function(gt,Wt,At,Gt){if(!((sn||!D.enabled)&&!Wt)){if(d&&gt&&ei){Je(r,"scrollEnd",Dp);return}!vn&&st&&st(D),sn=D,xt.tween&&!At&&(xt.tween.kill(),xt.tween=0),L&&L.pause(),_&&i&&(i.revert({kill:!1}).invalidate(),i.getChildren?i.getChildren(!0,!0,!1).forEach(function(Re){return Re.vars.immediateRender&&Re.render(0,!0,!0)}):i.vars.immediateRender&&i.render(0,!0,!0)),D.isReverted||D.revert(!0,!0),D._subPinOffset=!1;var Oe=Dt(),ee=jt(),Te=b?b.duration():mi(U,x),Ge=A<=.01||!A,Me=0,Se=Gt||0,ue=wr(At)?At.end:n.end,Pn=n.endTrigger||f,we=wr(At)?At.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),un=D.pinnedContainer=n.pinnedContainer&&yn(n.pinnedContainer,D),T=f&&Math.max(0,te.indexOf(D))||0,O=T,H,W,F,rt,ot,pt,Mt,Vt,Xt,bt,qt,he,fe;for(k&&wr(At)&&(he=St.getProperty(z,x.p),fe=St.getProperty(Tt,x.p));O-- >0;)pt=te[O],pt.end||pt.refresh(0,1)||(sn=D),Mt=pt.pin,Mt&&(Mt===f||Mt===d||Mt===un)&&!pt.isReverted&&(bt||(bt=[]),bt.unshift(pt),pt.revert(!0,!0)),pt!==te[O]&&(T--,O--);for(ln(we)&&(we=we(D)),we=Xu(we,"start",D),Rt=tf(we,f,Oe,x,nt(),ye,z,D,ee,et,q,Te,b,D._startClamp&&"_startClamp")||(d?-.001:0),ln(ue)&&(ue=ue(D)),Nn(ue)&&!ue.indexOf("+=")&&(~ue.indexOf(" ")?ue=(Nn(we)?we.split(" ")[0]:"")+ue:(Me=Ha(ue.substr(2),Oe),ue=Nn(we)?we:(b?St.utils.mapRange(0,b.duration(),b.scrollTrigger.start,b.scrollTrigger.end,Rt):Rt)+Me,Pn=f)),ue=Xu(ue,"end",D),N=Math.max(Rt,tf(ue||(Pn?"100% 0":Te),Pn,Oe,x,nt()+Me,kt,Tt,D,ee,et,q,Te,b,D._endClamp&&"_endClamp"))||-.001,Me=0,O=T;O--;)pt=te[O]||{},Mt=pt.pin,Mt&&pt.start-pt._pinPush<=Rt&&!b&&pt.end>0&&(H=pt.end-(D._startClamp?Math.max(0,pt.start):pt.start),(Mt===f&&pt.start-pt._pinPush<Rt||Mt===un)&&isNaN(we)&&(Me+=H*(1-pt.progress)),Mt===d&&(Se+=H));if(Rt+=Me,N+=Me,D._startClamp&&(D._startClamp+=Me),D._endClamp&&!vn&&(D._endClamp=N||-.001,N=Math.min(N,mi(U,x))),A=N-Rt||(Rt-=.01)&&.001,Ge&&(ut=St.utils.clamp(0,1,St.utils.normalize(Rt,N,ct))),D._pinPush=Se,ye&&Me&&(H={},H[x.a]="+="+Me,un&&(H[x.p]="-="+nt()),St.set([ye,kt],H)),d&&!(zc&&D.end>=mi(U,x)))H=jn(d),rt=x===Xe,F=nt(),mt=parseFloat(ft(x.a))+Se,!Te&&N>1&&(qt=(V?ge.scrollingElement||Bn:U).style,qt={style:qt,value:qt["overflow"+x.a.toUpperCase()]},V&&jn(me)["overflow"+x.a.toUpperCase()]!=="scroll"&&(qt.style["overflow"+x.a.toUpperCase()]="scroll")),Nl(d,j,H),Q=la(d),W=Pi(d,!0),Vt=q&&fr(U,rt?xn:Xe)(),g?(at=[g+x.os2,A+Se+We],at.t=j,O=g===ke?al(d,x)+A+Se:0,O&&(at.push(x.d,O+We),j.style.flexBasis!=="auto"&&(j.style.flexBasis=O+We)),Rs(at),un&&te.forEach(function(Re){Re.pin===un&&Re.vars.pinSpacing!==!1&&(Re._subPinOffset=!0)}),q&&nt(ct)):(O=al(d,x),O&&j.style.flexBasis!=="auto"&&(j.style.flexBasis=O+We)),q&&(ot={top:W.top+(rt?F-Rt:Vt)+We,left:W.left+(rt?Vt:F-Rt)+We,boxSizing:"border-box",position:"fixed"},ot[zr]=ot["max"+Bs]=Math.ceil(W.width)+We,ot[kr]=ot["max"+tu]=Math.ceil(W.height)+We,ot[Jn]=ot[Jn+Ro]=ot[Jn+Ao]=ot[Jn+Po]=ot[Jn+Co]="0",ot[ke]=H[ke],ot[ke+Ro]=H[ke+Ro],ot[ke+Ao]=H[ke+Ao],ot[ke+Po]=H[ke+Po],ot[ke+Co]=H[ke+Co],G=f_(E,ot,C),vn&&nt(0)),i?(Xt=i._initted,Dl(1),i.render(i.duration(),!0,!0),Yt=ft(x.a)-mt+A+Se,It=Math.abs(A-Yt)>1,q&&It&&G.splice(G.length-2,2),i.render(0,!0,!0),Xt||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Dl(0)):Yt=A,qt&&(qt.value?qt.style["overflow"+x.a.toUpperCase()]=qt.value:qt.style.removeProperty("overflow-"+x.a));else if(f&&nt()&&!b)for(W=f.parentNode;W&&W!==me;)W._pinOffset&&(Rt-=W._pinOffset,N-=W._pinOffset),W=W.parentNode;bt&&bt.forEach(function(Re){return Re.revert(!1,!0)}),D.start=Rt,D.end=N,$t=Ut=vn?ct:nt(),!b&&!vn&&($t<ct&&nt(ct),D.scroll.rec=0),D.revert(!1,!0),tt=on(),J&&($=-1,J.restart(!0)),sn=0,i&&P&&(i._initted||dt)&&i.progress()!==dt&&i.progress(dt||0,!0).render(i.time(),!0,!0),(Ge||ut!==D.progress||b||_||i&&!i._initted)&&(i&&!P&&(i._initted||ut||i.vars.immediateRender!==!1)&&i.totalProgress(b&&Rt<-.001&&!ut?St.utils.normalize(Rt,N,0):ut,!0),D.progress=Ge||($t-Rt)/A===ut?0:ut),d&&g&&(j._pinOffset=Math.round(D.progress*Yt)),L&&L.invalidate(),isNaN(he)||(he-=St.getProperty(z,x.p),fe-=St.getProperty(Tt,x.p),ca(z,x,he),ca(ye,x,he-(Gt||0)),ca(Tt,x,fe),ca(kt,x,fe-(Gt||0))),Ge&&!vn&&D.update(),h&&!vn&&!Pt&&(Pt=!0,h(D),Pt=!1)}},D.getVelocity=function(){return(nt()-Ut)/(on()-ho)*1e3||0},D.endAnimation=function(){to(D.callbackAnimation),i&&(L?L.progress(1):i.paused()?P||to(i,D.direction<0,1):to(i,i.reversed()))},D.labelToScroll=function(gt){return i&&i.labels&&(Rt||D.refresh()||Rt)+i.labels[gt]/i.duration()*A||0},D.getTrailing=function(gt){var Wt=te.indexOf(D),At=D.direction>0?te.slice(0,Wt).reverse():te.slice(Wt+1);return(Nn(gt)?At.filter(function(Gt){return Gt.vars.preventOverlaps===gt}):At).filter(function(Gt){return D.direction>0?Gt.end<=Rt:Gt.start>=N})},D.update=function(gt,Wt,At){if(!(b&&!At&&!gt)){var Gt=vn===!0?ct:D.scroll(),Oe=gt?0:(Gt-Rt)/A,ee=Oe<0?0:Oe>1?1:Oe||0,Te=D.progress,Ge,Me,Se,ue,Pn,we,un,T;if(Wt&&(Ut=$t,$t=b?nt():Gt,v&&(ae=Bt,Bt=i&&!P?i.totalProgress():ee)),m&&d&&!sn&&!na&&ei&&(!ee&&Rt<Gt+(Gt-Ut)/(on()-ho)*m?ee=1e-4:ee===1&&N>Gt+(Gt-Ut)/(on()-ho)*m&&(ee=.9999)),ee!==Te&&D.enabled){if(Ge=D.isActive=!!ee&&ee<1,Me=!!Te&&Te<1,we=Ge!==Me,Pn=we||!!ee!=!!Te,D.direction=ee>Te?1:-1,D.progress=ee,Pn&&!sn&&(Se=ee&&!Te?0:ee===1?1:Te===1?2:3,P&&(ue=!we&&Y[Se+1]!=="none"&&Y[Se+1]||Y[Se],T=i&&(ue==="complete"||ue==="reset"||ue in i))),y&&(we||T)&&(T||u||!i)&&(ln(y)?y(D):D.getTrailing(y).forEach(function(F){return F.endAnimation()})),P||(L&&!sn&&!na?(L._dp._time-L._start!==L._time&&L.render(L._dp._time-L._start),L.resetTo?L.resetTo("totalProgress",ee,i._tTime/i._tDur):(L.vars.totalProgress=ee,L.invalidate().restart())):i&&i.totalProgress(ee,!!(sn&&(tt||gt)))),d){if(gt&&g&&(j.style[g+x.os2]=it),!q)lt(fo(mt+Yt*ee));else if(Pn){if(un=!gt&&ee>Te&&N+1>Gt&&Gt+1>=mi(U,x),C)if(!gt&&(Ge||un)){var O=Pi(d,!0),H=Gt-Rt;ef(d,me,O.top+(x===Xe?H:0)+We,O.left+(x===Xe?0:H)+We)}else ef(d,j);Rs(Ge||un?G:Q),It&&ee<1&&Ge||lt(mt+(ee===1&&!un?Yt:0))}}v&&!xt.tween&&!sn&&!na&&J.restart(!0),a&&(we||M&&ee&&(ee<1||!Ll))&&Wo(a.targets).forEach(function(F){return F.classList[Ge||M?"add":"remove"](a.className)}),o&&!P&&!gt&&o(D),Pn&&!sn?(P&&(T&&(ue==="complete"?i.pause().totalProgress(1):ue==="reset"?i.restart(!0).pause():ue==="restart"?i.restart(!0):i[ue]()),o&&o(D)),(we||!Ll)&&(c&&we&&jr(D,c),X[Se]&&jr(D,X[Se]),M&&(ee===1?D.kill(!1,1):X[Se]=0),we||(Se=ee===1?1:3,X[Se]&&jr(D,X[Se]))),R&&!Ge&&Math.abs(D.getVelocity())>(po(R)?R:2500)&&(to(D.callbackAnimation),L?L.progress(1):to(i,ue==="reverse"?1:!ee,1))):P&&o&&!sn&&o(D)}if(yt){var W=b?Gt/b.duration()*(b._caScrollDist||0):Gt;Nt(W+(z._isFlipped?1:0)),yt(W)}Ht&&Ht(-Gt/b.duration()*(b._caScrollDist||0))}},D.enable=function(gt,Wt){D.enabled||(D.enabled=!0,Je(U,"resize",mo),V||Je(U,"scroll",ts),st&&Je(r,"refreshInit",st),gt!==!1&&(D.progress=ut=0,$t=Ut=$=nt()),Wt!==!1&&D.refresh())},D.getTween=function(gt){return gt&&xt?xt.tween:L},D.setPositions=function(gt,Wt,At,Gt){if(b){var Oe=b.scrollTrigger,ee=b.duration(),Te=Oe.end-Oe.start;gt=Oe.start+Te*gt/ee,Wt=Oe.start+Te*Wt/ee}D.refresh(!1,!1,{start:Yu(gt,At&&!!D._startClamp),end:Yu(Wt,At&&!!D._endClamp)},Gt),D.update()},D.adjustPinSpacing=function(gt){if(at&&gt){var Wt=at.indexOf(x.d)+1;at[Wt]=parseFloat(at[Wt])+gt+We,at[1]=parseFloat(at[1])+gt+We,Rs(at)}},D.disable=function(gt,Wt){if(gt!==!1&&D.revert(!0,!0),D.enabled&&(D.enabled=D.isActive=!1,Wt||L&&L.pause(),ct=0,Et&&(Et.uncache=1),st&&Ke(r,"refreshInit",st),J&&(J.pause(),xt.tween&&xt.tween.kill()&&(xt.tween=0)),!V)){for(var At=te.length;At--;)if(te[At].scroller===U&&te[At]!==D)return;Ke(U,"resize",mo),V||Ke(U,"scroll",ts)}},D.kill=function(gt,Wt){D.disable(gt,Wt),L&&!Wt&&L.kill(),l&&delete kc[l];var At=te.indexOf(D);At>=0&&te.splice(At,1),At===_n&&Ga>0&&_n--,At=0,te.forEach(function(Gt){return Gt.scroller===D.scroller&&(At=1)}),At||vn||(D.scroll.rec=0),i&&(i.scrollTrigger=null,gt&&i.revert({kill:!1}),Wt||i.kill()),ye&&[ye,kt,z,Tt].forEach(function(Gt){return Gt.parentNode&&Gt.parentNode.removeChild(Gt)}),Do===D&&(Do=0),d&&(Et&&(Et.uncache=1),At=0,te.forEach(function(Gt){return Gt.pin===d&&At++}),At||(Et.spacer=0)),n.onKill&&n.onKill(D)},te.push(D),D.enable(!1,!1),ce&&ce(D),i&&i.add&&!A){var Kt=D.update;D.update=function(){D.update=Kt,ie.cache++,Rt||N||D.refresh()},St.delayedCall(.01,D.update),A=.01,Rt=N=0}else D.refresh();d&&c_()},r.register=function(n){return gs||(St=n||Tp(),bp()&&window.document&&r.enable(),gs=uo),gs},r.defaults=function(n){if(n)for(var i in n)oa[i]=n[i];return oa},r.disable=function(n,i){uo=0,te.forEach(function(o){return o[i?"kill":"disable"](n)}),Ke(ne,"wheel",ts),Ke(ge,"scroll",ts),clearInterval(ea),Ke(ge,"touchcancel",ui),Ke(me,"touchstart",ui),ra(Ke,ge,"pointerdown,touchstart,mousedown",qu),ra(Ke,ge,"pointerup,touchend,mouseup",$u),ol.kill(),ia(Ke);for(var s=0;s<ie.length;s+=3)sa(Ke,ie[s],ie[s+1]),sa(Ke,ie[s],ie[s+2])},r.enable=function(){if(ne=window,ge=document,Bn=ge.documentElement,me=ge.body,St){if(Wo=St.utils.toArray,To=St.utils.clamp,Bc=St.core.context||ui,Dl=St.core.suppressOverwrites||ui,Kh=ne.history.scrollRestoration||"auto",Hc=ne.pageYOffset||0,St.core.globals("ScrollTrigger",r),me){uo=1,Cs=document.createElement("div"),Cs.style.height="100vh",Cs.style.position="absolute",Np(),n_(),Be.register(St),r.isTouch=Be.isTouch,Ki=Be.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Fc=Be.isTouch===1,Je(ne,"wheel",ts),Zh=[ne,ge,Bn,me],St.matchMedia?(r.matchMedia=function(h){var u=St.matchMedia(),f;for(f in h)u.add(f,h[f]);return u},St.addEventListener("matchMediaInit",function(){Ip(),nu()}),St.addEventListener("matchMediaRevert",function(){return Lp()}),St.addEventListener("matchMedia",function(){Lr(0,1),Wr("matchMedia")}),St.matchMedia().add("(orientation: portrait)",function(){return Ul(),Ul})):console.warn("Requires GSAP 3.11.0 or later"),Ul(),Je(ge,"scroll",ts);var n=me.hasAttribute("style"),i=me.style,s=i.borderTopStyle,o=St.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Pi(me),Xe.m=Math.round(a.top+Xe.sc())||0,xn.m=Math.round(a.left+xn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(me.setAttribute("style",""),me.removeAttribute("style")),ea=setInterval(Ju,250),St.delayedCall(.5,function(){return na=0}),Je(ge,"touchcancel",ui),Je(me,"touchstart",ui),ra(Je,ge,"pointerdown,touchstart,mousedown",qu),ra(Je,ge,"pointerup,touchend,mouseup",$u),Oc=St.utils.checkPrefix("transform"),Wa.push(Oc),gs=on(),ol=St.delayedCall(.2,Lr).pause(),_s=[ge,"visibilitychange",function(){var h=ne.innerWidth,u=ne.innerHeight;ge.hidden?(Gu=h,Wu=u):(Gu!==h||Wu!==u)&&mo()},ge,"DOMContentLoaded",Lr,ne,"load",Lr,ne,"resize",mo],ia(Je),te.forEach(function(h){return h.enable(0,1)}),l=0;l<ie.length;l+=3)sa(Ke,ie[l],ie[l+1]),sa(Ke,ie[l],ie[l+2])}else if(ge){var c=function h(){r.enable(),ge.removeEventListener("DOMContentLoaded",h)};ge.addEventListener("DOMContentLoaded",c)}}},r.config=function(n){"limitCallbacks"in n&&(Ll=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(ea)||(ea=i)&&setInterval(Ju,i),"ignoreMobileResize"in n&&(Fc=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(ia(Ke)||ia(Je,n.autoRefreshEvents||"none"),Mp=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=yn(n),o=ie.indexOf(s),a=Vr(s);~o&&ie.splice(o,a?6:2),i&&(a?vi.unshift(ne,i,me,i,Bn,i):vi.unshift(s,i))},r.clearMatchMedia=function(n){te.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Nn(n)?yn(n):n).getBoundingClientRect(),a=o[s?zr:kr]*i||0;return s?o.right-a>0&&o.left+a<ne.innerWidth:o.bottom-a>0&&o.top+a<ne.innerHeight},r.positionInViewport=function(n,i,s){Nn(n)&&(n=yn(n));var o=n.getBoundingClientRect(),a=o[s?zr:kr],l=i==null?a/2:i in ll?ll[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/ne.innerWidth:(o.top+l)/ne.innerHeight},r.killAll=function(n){if(te.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Gr.killAll||[];Gr={},i.forEach(function(s){return s()})}},r})();re.version="3.15.0";re.saveStyles=function(r){return r?Wo(r).forEach(function(t){if(t&&t.style){var e=Un.indexOf(t);e>=0&&Un.splice(e,5),Un.push(t,t.style.cssText,t.getBBox&&t.getAttribute("transform"),St.core.getCache(t),Bc())}}):Un};re.revert=function(r,t){return nu(!r,t)};re.create=function(r,t){return new re(r,t)};re.refresh=function(r){return r?mo(!0):(gs||re.register())&&Lr(!0)};re.update=function(r){return++ie.cache&&Ni(r===!0?2:0)};re.clearScrollMemory=Up;re.maxScroll=function(r,t){return mi(r,t?xn:Xe)};re.getScrollFunc=function(r,t){return fr(yn(r),t?xn:Xe)};re.getById=function(r){return kc[r]};re.getAll=function(){return te.filter(function(r){return r.vars.id!=="ScrollSmoother"})};re.isScrolling=function(){return!!ei};re.snapDirectional=eu;re.addEventListener=function(r,t){var e=Gr[r]||(Gr[r]=[]);~e.indexOf(t)||e.push(t)};re.removeEventListener=function(r,t){var e=Gr[r],n=e&&e.indexOf(t);n>=0&&e.splice(n,1)};re.batch=function(r,t){var e=[],n={},i=t.interval||.016,s=t.batchMax||1e9,o=function(c,h){var u=[],f=[],d=St.delayedCall(i,function(){h(u,f),u=[],f=[]}).pause();return function(g){u.length||d.restart(!0),u.push(g.trigger),f.push(g),s<=u.length&&d.progress(1)}},a;for(a in t)n[a]=a.substr(0,2)==="on"&&ln(t[a])&&a!=="onRefreshInit"?o(a,t[a]):t[a];return ln(s)&&(s=s(),Je(re,"refresh",function(){return s=t.batchMax()})),Wo(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,e.push(re.create(c))}),e};var rf=function(t,e,n,i){return e>i?t(i):e<0&&t(0),n>i?(i-e)/(n-e):n<0?e/(e-n):1},Ol=function r(t,e){e===!0?t.style.removeProperty("touch-action"):t.style.touchAction=e===!0?"auto":e?"pan-"+e+(Be.isTouch?" pinch-zoom":""):"none",t===Bn&&r(me,e)},ha={auto:1,scroll:1},p_=function(t){var e=t.event,n=t.target,i=t.axis,s=(e.changedTouches?e.changedTouches[0]:e).target,o=s._gsap||St.core.getCache(s),a=on(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==me&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(ha[(l=jn(s)).overflowY]||ha[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!Vr(s)&&(ha[(l=jn(s)).overflowY]||ha[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(e.stopPropagation(),e._gsapAllow=!0)},Fp=function(t,e,n,i){return Be.create({target:t,capture:!0,debounce:!1,lockAxis:!0,type:e,onWheel:i=i&&p_,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Je(ge,Be.eventTypes[0],of,!1,!0)},onDisable:function(){return Ke(ge,Be.eventTypes[0],of,!0)}})},m_=/(input|label|select|textarea)/i,sf,of=function(t){var e=m_.test(t.target.tagName);(e||sf)&&(t._gsapAllow=!0,sf=e)},g_=function(t){wr(t)||(t={}),t.preventDefault=t.isNormalizer=t.allowClicks=!0,t.type||(t.type="wheel,touch"),t.debounce=!!t.debounce,t.id=t.id||"normalizer";var e=t,n=e.normalizeScrollX,i=e.momentum,s=e.allowNestedScroll,o=e.onRelease,a,l,c=yn(t.target)||Bn,h=St.core.globals().ScrollSmoother,u=h&&h.get(),f=Ki&&(t.content&&yn(t.content)||u&&t.content!==!1&&!u.smooth()&&u.content()),d=fr(c,Xe),g=fr(c,xn),_=1,m=(Be.isTouch&&ne.visualViewport?ne.visualViewport.scale*ne.visualViewport.width:ne.outerWidth)/ne.innerWidth,p=0,S=ln(i)?function(){return i(a)}:function(){return i||2.8},M,v,C=Fp(c,t.type,!0,s),w=function(){return v=!1},b=ui,R=ui,y=function(){l=mi(c,Xe),R=To(Ki?1:0,l),n&&(b=To(0,mi(c,xn))),M=Hr},x=function(){f._gsap.y=fo(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},P=function(){if(v){requestAnimationFrame(w);var k=fo(a.deltaY/2),et=R(d.v-k);if(f&&et!==d.v+d.offset){d.offset=et-d.v;var D=fo((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+D+", 0, 1)",f._gsap.y=D+"px",d.cacheID=ie.cache,Ni()}return!0}d.offset&&x(),v=!0},U,B,V,q,X=function(){y(),U.isActive()&&U.vars.scrollY>l&&(d()>l?U.progress(1)&&d(l):U.resetTo("scrollY",l))};return f&&St.set(f,{y:"+=0"}),t.ignoreCheck=function(Y){return Ki&&Y.type==="touchmove"&&P()||_>1.05&&Y.type!=="touchstart"||a.isGesturing||Y.touches&&Y.touches.length>1},t.onPress=function(){v=!1;var Y=_;_=fo((ne.visualViewport&&ne.visualViewport.scale||1)/m),U.pause(),Y!==_&&Ol(c,_>1.01?!0:n?!1:"x"),B=g(),V=d(),y(),M=Hr},t.onRelease=t.onGestureStart=function(Y,k){if(d.offset&&x(),!k)q.restart(!0);else{ie.cache++;var et=S(),D,st;n&&(D=g(),st=D+et*.05*-Y.velocityX/.227,et*=rf(g,D,st,mi(c,xn)),U.vars.scrollX=b(st)),D=d(),st=D+et*.05*-Y.velocityY/.227,et*=rf(d,D,st,mi(c,Xe)),U.vars.scrollY=R(st),U.invalidate().duration(et).play(.01),(Ki&&U.vars.scrollY>=l||D>=l-1)&&St.to({},{onUpdate:X,duration:et})}o&&o(Y)},t.onWheel=function(){U._ts&&U.pause(),on()-p>1e3&&(M=0,p=on())},t.onChange=function(Y,k,et,D,st){if(Hr!==M&&y(),k&&n&&g(b(D[2]===k?B+(Y.startX-Y.x):g()+k-D[1])),et){d.offset&&x();var Dt=st[2]===et,jt=Dt?V+Y.startY-Y.y:d()+et-st[1],$=R(jt);Dt&&jt!==$&&(V+=$-jt),d($)}(et||k)&&Ni()},t.onEnable=function(){Ol(c,n?!1:"x"),re.addEventListener("refresh",X),Je(ne,"resize",X),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),C.enable()},t.onDisable=function(){Ol(c,!0),Ke(ne,"resize",X),re.removeEventListener("refresh",X),C.kill()},t.lockAxis=t.lockAxis!==!1,a=new Be(t),a.iOS=Ki,Ki&&!d()&&d(1),Ki&&St.ticker.add(ui),q=a._dc,U=St.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Op(d,d(),function(){return U.pause()})},onUpdate:Ni,onComplete:q.vars.onComplete}),a};re.sort=function(r){if(ln(r))return te.sort(r);var t=ne.pageYOffset||0;return re.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+ne.innerHeight}),te.sort(r||function(e,n){return(e.vars.refreshPriority||0)*-1e6+(e.vars.containerAnimation?1e6:e._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};re.observe=function(r){return new Be(r)};re.normalizeScroll=function(r){if(typeof r>"u")return gn;if(r===!0&&gn)return gn.enable();if(r===!1){gn&&gn.kill(),gn=r;return}var t=r instanceof Be?r:g_(r);return gn&&gn.target===t.target&&gn.kill(),Vr(t.target)&&(gn=t),t};re.core={_getVelocityProp:Nc,_inputObserver:Fp,_scrollers:ie,_proxies:vi,bridge:{ss:function(){ei||Wr("scrollStart"),ei=on()},ref:function(){return sn}}};Tp()&&St.registerPlugin(re);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const iu="170",__=0,af=1,v_=2,Bp=1,x_=2,Ai=3,dr=0,wn=1,Di=2,ar=0,Ps=1,cl=2,lf=3,cf=4,y_=5,Rr=100,M_=101,S_=102,E_=103,b_=104,T_=200,w_=201,A_=202,C_=203,Gc=204,Wc=205,R_=206,P_=207,D_=208,L_=209,I_=210,U_=211,N_=212,O_=213,F_=214,Xc=0,Yc=1,qc=2,zs=3,$c=4,Zc=5,Kc=6,Jc=7,zp=0,B_=1,z_=2,lr=0,k_=1,H_=2,V_=3,kp=4,G_=5,W_=6,X_=7,Hp=300,ks=301,Hs=302,jc=303,Qc=304,vl=306,th=1e3,Ir=1001,eh=1002,Xn=1003,Y_=1004,ua=1005,gi=1006,Fl=1007,Ur=1008,zi=1009,Vp=1010,Gp=1011,Yo=1012,ru=1013,Xr=1014,_i=1015,Zo=1016,su=1017,ou=1018,Vs=1020,Wp=35902,Xp=1021,Yp=1022,li=1023,qp=1024,$p=1025,Ds=1026,Gs=1027,au=1028,lu=1029,Zp=1030,cu=1031,hu=1033,Ya=33776,qa=33777,$a=33778,Za=33779,nh=35840,ih=35841,rh=35842,sh=35843,oh=36196,ah=37492,lh=37496,ch=37808,hh=37809,uh=37810,fh=37811,dh=37812,ph=37813,mh=37814,gh=37815,_h=37816,vh=37817,xh=37818,yh=37819,Mh=37820,Sh=37821,Ka=36492,Eh=36494,bh=36495,Kp=36283,Th=36284,wh=36285,Ah=36286,q_=3200,$_=3201,Jp=0,Z_=1,Ji="",Fn="srgb",Xs="srgb-linear",xl="linear",_e="srgb",es=7680,hf=519,K_=512,J_=513,j_=514,jp=515,Q_=516,t0=517,e0=518,n0=519,uf=35044,i0=35048,ff="300 es",Ii=2e3,hl=2001;class Ys{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let df=1234567;const Lo=Math.PI/180,qo=180/Math.PI;function qs(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(nn[r&255]+nn[r>>8&255]+nn[r>>16&255]+nn[r>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[e&63|128]+nn[e>>8&255]+"-"+nn[e>>16&255]+nn[e>>24&255]+nn[n&255]+nn[n>>8&255]+nn[n>>16&255]+nn[n>>24&255]).toLowerCase()}function je(r,t,e){return Math.max(t,Math.min(e,r))}function uu(r,t){return(r%t+t)%t}function r0(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function s0(r,t,e){return r!==t?(e-r)/(t-r):0}function Io(r,t,e){return(1-e)*r+e*t}function o0(r,t,e,n){return Io(r,t,1-Math.exp(-e*n))}function a0(r,t=1){return t-Math.abs(uu(r,t*2)-t)}function l0(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function c0(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function h0(r,t){return r+Math.floor(Math.random()*(t-r+1))}function u0(r,t){return r+Math.random()*(t-r)}function f0(r){return r*(.5-Math.random())}function d0(r){r!==void 0&&(df=r);let t=df+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function p0(r){return r*Lo}function m0(r){return r*qo}function g0(r){return(r&r-1)===0&&r!==0}function _0(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function v0(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function x0(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),l=o(e/2),c=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),f=o((t-n)/2),d=s((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":r.set(a*h,l*u,l*f,a*c);break;case"YZY":r.set(l*f,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*f,a*h,a*c);break;case"XZX":r.set(a*h,l*g,l*d,a*c);break;case"YXY":r.set(l*d,a*h,l*g,a*c);break;case"ZYZ":r.set(l*g,l*d,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function vs(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function pn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const go={DEG2RAD:Lo,RAD2DEG:qo,generateUUID:qs,clamp:je,euclideanModulo:uu,mapLinear:r0,inverseLerp:s0,lerp:Io,damp:o0,pingpong:a0,smoothstep:l0,smootherstep:c0,randInt:h0,randFloat:u0,randFloatSpread:f0,seededRandom:d0,degToRad:p0,radToDeg:m0,isPowerOfTwo:g0,ceilPowerOfTwo:_0,floorPowerOfTwo:v0,setQuaternionFromProperEuler:x0,normalize:pn,denormalize:vs};class Ot{constructor(t=0,e=0){Ot.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jt{constructor(t,e,n,i,s,o,a,l,c){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c)}set(t,e,n,i,s,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],S=i[1],M=i[4],v=i[7],C=i[2],w=i[5],b=i[8];return s[0]=o*_+a*S+l*C,s[3]=o*m+a*M+l*w,s[6]=o*p+a*v+l*b,s[1]=c*_+h*S+u*C,s[4]=c*m+h*M+u*w,s[7]=c*p+h*v+u*b,s[2]=f*_+d*S+g*C,s[5]=f*m+d*M+g*w,s[8]=f*p+d*v+g*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,f=a*l-h*s,d=c*s-o*l,g=e*u+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=f*_,t[4]=(h*e-i*l)*_,t[5]=(i*s-a*e)*_,t[6]=d*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Bl.makeScale(t,e)),this}rotate(t){return this.premultiply(Bl.makeRotation(-t)),this}translate(t,e){return this.premultiply(Bl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Bl=new Jt;function Qp(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ul(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function y0(){const r=ul("canvas");return r.style.display="block",r}const pf={};function _o(r){r in pf||(pf[r]=!0,console.warn(r))}function M0(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function S0(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function E0(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const le={enabled:!0,workingColorSpace:Xs,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===_e&&(r.r=Oi(r.r),r.g=Oi(r.g),r.b=Oi(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===_e&&(r.r=Ls(r.r),r.g=Ls(r.g),r.b=Ls(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ji?xl:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Oi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ls(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const mf=[.64,.33,.3,.6,.15,.06],gf=[.2126,.7152,.0722],_f=[.3127,.329],vf=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xf=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);le.define({[Xs]:{primaries:mf,whitePoint:_f,transfer:xl,toXYZ:vf,fromXYZ:xf,luminanceCoefficients:gf,workingColorSpaceConfig:{unpackColorSpace:Fn},outputColorSpaceConfig:{drawingBufferColorSpace:Fn}},[Fn]:{primaries:mf,whitePoint:_f,transfer:_e,toXYZ:vf,fromXYZ:xf,luminanceCoefficients:gf,outputColorSpaceConfig:{drawingBufferColorSpace:Fn}}});let ns;class b0{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ns===void 0&&(ns=ul("canvas")),ns.width=t.width,ns.height=t.height;const n=ns.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ns}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ul("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Oi(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Oi(e[n]/255)*255):e[n]=Oi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let T0=0;class tm{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:T0++}),this.uuid=qs(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(zl(i[o].image)):s.push(zl(i[o]))}else s=zl(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function zl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?b0.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let w0=0;class hn extends Ys{constructor(t=hn.DEFAULT_IMAGE,e=hn.DEFAULT_MAPPING,n=Ir,i=Ir,s=gi,o=Ur,a=li,l=zi,c=hn.DEFAULT_ANISOTROPY,h=Ji){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:w0++}),this.uuid=qs(),this.name="",this.source=new tm(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ot(0,0),this.repeat=new Ot(1,1),this.center=new Ot(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case th:t.x=t.x-Math.floor(t.x);break;case Ir:t.x=t.x<0?0:1;break;case eh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case th:t.y=t.y-Math.floor(t.y);break;case Ir:t.y=t.y<0?0:1;break;case eh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=Hp;hn.DEFAULT_ANISOTROPY=1;class ve{constructor(t=0,e=0,n=0,i=1){ve.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const l=t.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,v=(d+1)/2,C=(p+1)/2,w=(h+f)/4,b=(u+_)/4,R=(g+m)/4;return M>v&&M>C?M<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(M),i=w/n,s=b/n):v>C?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=w/i,s=R/i):C<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(C),n=b/s,i=R/s),this.set(n,i,s,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(f-h)/S,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class A0 extends Ys{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:gi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new hn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new tm(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yr extends A0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class em extends hn{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class C0 extends hn{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xn,this.minFilter=Xn,this.wrapR=Ir,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ko{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==f||c!==d||h!==g){let m=1-a;const p=l*f+c*d+h*g+u*_,S=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const C=Math.sqrt(M),w=Math.atan2(C,p*S);m=Math.sin(m*w)/C,a=Math.sin(a*w)/C}const v=a*S;if(l=l*m+f*v,c=c*m+d*v,h=h*m+g*v,u=u*m+_*v,m===1-a){const C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return t[e]=a*g+h*u+l*d-c*f,t[e+1]=l*g+h*f+c*u-a*d,t[e+2]=c*g+h*d+a*f-l*u,t[e+3]=h*g-a*u-l*f-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),f=l(n/2),d=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(je(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*i+e*this._y,this._z=d*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,f=Math.sin(e*h)/c;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=i*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return kl.copy(this).projectOnVector(t),this.sub(kl)}reflect(t){return this.sub(kl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const kl=new I,yf=new Ko;class $r{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ii.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ii.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ii.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ii):ii.fromBufferAttribute(s,o),ii.applyMatrix4(t.matrixWorld),this.expandByPoint(ii);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),fa.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),fa.copy(n.boundingBox)),fa.applyMatrix4(t.matrixWorld),this.union(fa)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ii),ii.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(eo),da.subVectors(this.max,eo),is.subVectors(t.a,eo),rs.subVectors(t.b,eo),ss.subVectors(t.c,eo),Wi.subVectors(rs,is),Xi.subVectors(ss,rs),vr.subVectors(is,ss);let e=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-vr.z,vr.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,vr.z,0,-vr.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-vr.y,vr.x,0];return!Hl(e,is,rs,ss,da)||(e=[1,0,0,0,1,0,0,0,1],!Hl(e,is,rs,ss,da))?!1:(pa.crossVectors(Wi,Xi),e=[pa.x,pa.y,pa.z],Hl(e,is,rs,ss,da))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ii).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ii).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Si[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Si[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Si[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Si[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Si[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Si[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Si[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Si[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Si),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Si=[new I,new I,new I,new I,new I,new I,new I,new I],ii=new I,fa=new $r,is=new I,rs=new I,ss=new I,Wi=new I,Xi=new I,vr=new I,eo=new I,da=new I,pa=new I,xr=new I;function Hl(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){xr.fromArray(r,s);const a=i.x*Math.abs(xr.x)+i.y*Math.abs(xr.y)+i.z*Math.abs(xr.z),l=t.dot(xr),c=e.dot(xr),h=n.dot(xr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const R0=new $r,no=new I,Vl=new I;class $s{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):R0.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;no.subVectors(t,this.center);const e=no.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(no,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Vl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(no.copy(t.center).add(Vl)),this.expandByPoint(no.copy(t.center).sub(Vl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ei=new I,Gl=new I,ma=new I,Yi=new I,Wl=new I,ga=new I,Xl=new I;class nm{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ei)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ei.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ei.copy(this.origin).addScaledVector(this.direction,e),Ei.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Gl.copy(t).add(e).multiplyScalar(.5),ma.copy(e).sub(t).normalize(),Yi.copy(this.origin).sub(Gl);const s=t.distanceTo(e)*.5,o=-this.direction.dot(ma),a=Yi.dot(this.direction),l=-Yi.dot(ma),c=Yi.lengthSq(),h=Math.abs(1-o*o);let u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=s*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-l),s),d=-u*u+f*(f+2*l)+c);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Gl).addScaledVector(ma,f),d}intersectSphere(t,e){Ei.subVectors(t.center,this.origin);const n=Ei.dot(this.direction),i=Ei.dot(Ei)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,i=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,i=(t.min.x-f.x)*c),h>=0?(s=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(s=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-f.z)*u,l=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,l=(t.min.z-f.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Ei)!==null}intersectTriangle(t,e,n,i,s){Wl.subVectors(e,t),ga.subVectors(n,t),Xl.crossVectors(Wl,ga);let o=this.direction.dot(Xl),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Yi.subVectors(this.origin,t);const l=a*this.direction.dot(ga.crossVectors(Yi,ga));if(l<0)return null;const c=a*this.direction.dot(Wl.cross(Yi));if(c<0||l+c>o)return null;const h=-a*Yi.dot(Xl);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xe{constructor(t,e,n,i,s,o,a,l,c,h,u,f,d,g,_,m){xe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,l,c,h,u,f,d,g,_,m)}set(t,e,n,i,s,o,a,l,c,h,u,f,d,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/os.setFromMatrixColumn(t,0).length(),s=1/os.setFromMatrixColumn(t,1).length(),o=1/os.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=d+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+d*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f+_*a,e[4]=g*a-d,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*h,d=l*u,g=c*h,_=c*u;e[0]=f-_*a,e[4]=-o*u,e[8]=g+d*a,e[1]=d+g*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*h,d=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-d,e[8]=f*c+_,e[1]=l*u,e[5]=_*c+f,e[9]=d*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-f*u,e[8]=g*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=d*u+g,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-g,e[2]=g*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(P0,t,D0)}lookAt(t,e,n){const i=this.elements;return Ln.subVectors(t,e),Ln.lengthSq()===0&&(Ln.z=1),Ln.normalize(),qi.crossVectors(n,Ln),qi.lengthSq()===0&&(Math.abs(n.z)===1?Ln.x+=1e-4:Ln.z+=1e-4,Ln.normalize(),qi.crossVectors(n,Ln)),qi.normalize(),_a.crossVectors(Ln,qi),i[0]=qi.x,i[4]=_a.x,i[8]=Ln.x,i[1]=qi.y,i[5]=_a.y,i[9]=Ln.y,i[2]=qi.z,i[6]=_a.z,i[10]=Ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],M=n[7],v=n[11],C=n[15],w=i[0],b=i[4],R=i[8],y=i[12],x=i[1],P=i[5],U=i[9],B=i[13],V=i[2],q=i[6],X=i[10],Y=i[14],k=i[3],et=i[7],D=i[11],st=i[15];return s[0]=o*w+a*x+l*V+c*k,s[4]=o*b+a*P+l*q+c*et,s[8]=o*R+a*U+l*X+c*D,s[12]=o*y+a*B+l*Y+c*st,s[1]=h*w+u*x+f*V+d*k,s[5]=h*b+u*P+f*q+d*et,s[9]=h*R+u*U+f*X+d*D,s[13]=h*y+u*B+f*Y+d*st,s[2]=g*w+_*x+m*V+p*k,s[6]=g*b+_*P+m*q+p*et,s[10]=g*R+_*U+m*X+p*D,s[14]=g*y+_*B+m*Y+p*st,s[3]=S*w+M*x+v*V+C*k,s[7]=S*b+M*P+v*q+C*et,s[11]=S*R+M*U+v*X+C*D,s[15]=S*y+M*B+v*Y+C*st,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],f=t[10],d=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+s*l*u-i*c*u-s*a*f+n*c*f+i*a*d-n*l*d)+_*(+e*l*d-e*c*f+s*o*f-i*o*d+i*c*h-s*l*h)+m*(+e*c*u-e*a*d-s*o*u+n*o*d+s*a*h-n*c*h)+p*(-i*a*h-e*l*u+e*a*f+i*o*u-n*o*f+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],f=t[10],d=t[11],g=t[12],_=t[13],m=t[14],p=t[15],S=u*m*c-_*f*c+_*l*d-a*m*d-u*l*p+a*f*p,M=g*f*c-h*m*c-g*l*d+o*m*d+h*l*p-o*f*p,v=h*_*c-g*u*c+g*a*d-o*_*d-h*a*p+o*u*p,C=g*u*l-h*_*l-g*a*f+o*_*f+h*a*m-o*u*m,w=e*S+n*M+i*v+s*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return t[0]=S*b,t[1]=(_*f*s-u*m*s-_*i*d+n*m*d+u*i*p-n*f*p)*b,t[2]=(a*m*s-_*l*s+_*i*c-n*m*c-a*i*p+n*l*p)*b,t[3]=(u*l*s-a*f*s-u*i*c+n*f*c+a*i*d-n*l*d)*b,t[4]=M*b,t[5]=(h*m*s-g*f*s+g*i*d-e*m*d-h*i*p+e*f*p)*b,t[6]=(g*l*s-o*m*s-g*i*c+e*m*c+o*i*p-e*l*p)*b,t[7]=(o*f*s-h*l*s+h*i*c-e*f*c-o*i*d+e*l*d)*b,t[8]=v*b,t[9]=(g*u*s-h*_*s-g*n*d+e*_*d+h*n*p-e*u*p)*b,t[10]=(o*_*s-g*a*s+g*n*c-e*_*c-o*n*p+e*a*p)*b,t[11]=(h*a*s-o*u*s-h*n*c+e*u*c+o*n*d-e*a*d)*b,t[12]=C*b,t[13]=(h*_*i-g*u*i+g*n*f-e*_*f-h*n*m+e*u*m)*b,t[14]=(g*a*i-o*_*i-g*n*l+e*_*l+o*n*m-e*a*m)*b,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*f+e*a*f)*b,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,l=t.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,l=e._w,c=s+s,h=o+o,u=a+a,f=s*c,d=s*h,g=s*u,_=o*h,m=o*u,p=a*u,S=l*c,M=l*h,v=l*u,C=n.x,w=n.y,b=n.z;return i[0]=(1-(_+p))*C,i[1]=(d+v)*C,i[2]=(g-M)*C,i[3]=0,i[4]=(d-v)*w,i[5]=(1-(f+p))*w,i[6]=(m+S)*w,i[7]=0,i[8]=(g+M)*b,i[9]=(m-S)*b,i[10]=(1-(f+_))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=os.set(i[0],i[1],i[2]).length();const o=os.set(i[4],i[5],i[6]).length(),a=os.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],ri.copy(this);const c=1/s,h=1/o,u=1/a;return ri.elements[0]*=c,ri.elements[1]*=c,ri.elements[2]*=c,ri.elements[4]*=h,ri.elements[5]*=h,ri.elements[6]*=h,ri.elements[8]*=u,ri.elements[9]*=u,ri.elements[10]*=u,e.setFromRotationMatrix(ri),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=Ii){const l=this.elements,c=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),f=(n+i)/(n-i);let d,g;if(a===Ii)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===hl)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=Ii){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-s),f=(e+t)*c,d=(n+i)*h;let g,_;if(a===Ii)g=(o+s)*u,_=-2*u;else if(a===hl)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const os=new I,ri=new xe,P0=new I(0,0,0),D0=new I(1,1,1),qi=new I,_a=new I,Ln=new I,Mf=new xe,Sf=new Ko;class yi{constructor(t=0,e=0,n=0,i=yi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],f=i[6],d=i[10];switch(e){case"XYZ":this._y=Math.asin(je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(je(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Mf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Sf.setFromEuler(this),this.setFromQuaternion(Sf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yi.DEFAULT_ORDER="XYZ";class im{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let L0=0;const Ef=new I,as=new Ko,bi=new xe,va=new I,io=new I,I0=new I,U0=new Ko,bf=new I(1,0,0),Tf=new I(0,1,0),wf=new I(0,0,1),Af={type:"added"},N0={type:"removed"},ls={type:"childadded",child:null},Yl={type:"childremoved",child:null};class Ye extends Ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=qs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ye.DEFAULT_UP.clone();const t=new I,e=new yi,n=new Ko,i=new I(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new xe},normalMatrix:{value:new Jt}}),this.matrix=new xe,this.matrixWorld=new xe,this.matrixAutoUpdate=Ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new im,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return as.setFromAxisAngle(t,e),this.quaternion.multiply(as),this}rotateOnWorldAxis(t,e){return as.setFromAxisAngle(t,e),this.quaternion.premultiply(as),this}rotateX(t){return this.rotateOnAxis(bf,t)}rotateY(t){return this.rotateOnAxis(Tf,t)}rotateZ(t){return this.rotateOnAxis(wf,t)}translateOnAxis(t,e){return Ef.copy(t).applyQuaternion(this.quaternion),this.position.add(Ef.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bf,t)}translateY(t){return this.translateOnAxis(Tf,t)}translateZ(t){return this.translateOnAxis(wf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?va.copy(t):va.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(io,va,this.up):bi.lookAt(va,io,this.up),this.quaternion.setFromRotationMatrix(bi),i&&(bi.extractRotation(i.matrixWorld),as.setFromRotationMatrix(bi),this.quaternion.premultiply(as.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Af),ls.child=t,this.dispatchEvent(ls),ls.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(N0),Yl.child=t,this.dispatchEvent(Yl),Yl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Af),ls.child=t,this.dispatchEvent(ls),ls.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,t,I0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,U0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(t.materials,this.material[l]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ye.DEFAULT_UP=new I(0,1,0);Ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const si=new I,Ti=new I,ql=new I,wi=new I,cs=new I,hs=new I,Cf=new I,$l=new I,Zl=new I,Kl=new I,Jl=new ve,jl=new ve,Ql=new ve;class ai{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),si.subVectors(t,e),i.cross(si);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){si.subVectors(i,e),Ti.subVectors(n,e),ql.subVectors(t,e);const o=si.dot(si),a=si.dot(Ti),l=si.dot(ql),c=Ti.dot(Ti),h=Ti.dot(ql),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(t,e,n,i,s,o,a,l){return this.getBarycoord(t,e,n,i,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,wi.x),l.addScaledVector(o,wi.y),l.addScaledVector(a,wi.z),l)}static getInterpolatedAttribute(t,e,n,i,s,o){return Jl.setScalar(0),jl.setScalar(0),Ql.setScalar(0),Jl.fromBufferAttribute(t,e),jl.fromBufferAttribute(t,n),Ql.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(Jl,s.x),o.addScaledVector(jl,s.y),o.addScaledVector(Ql,s.z),o}static isFrontFacing(t,e,n,i){return si.subVectors(n,e),Ti.subVectors(t,e),si.cross(Ti).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return si.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),si.cross(Ti).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ai.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return ai.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return ai.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return ai.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ai.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;cs.subVectors(i,n),hs.subVectors(s,n),$l.subVectors(t,n);const l=cs.dot($l),c=hs.dot($l);if(l<=0&&c<=0)return e.copy(n);Zl.subVectors(t,i);const h=cs.dot(Zl),u=hs.dot(Zl);if(h>=0&&u<=h)return e.copy(i);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(cs,o);Kl.subVectors(t,s);const d=cs.dot(Kl),g=hs.dot(Kl);if(g>=0&&d<=g)return e.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(hs,a);const m=h*g-d*u;if(m<=0&&u-h>=0&&d-g>=0)return Cf.subVectors(s,i),a=(u-h)/(u-h+(d-g)),e.copy(i).addScaledVector(Cf,a);const p=1/(m+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(cs,o).addScaledVector(hs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const rm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},xa={h:0,s:0,l:0};function tc(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class Ft{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=le.workingColorSpace){if(t=uu(t,1),e=je(e,0,1),n=je(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=tc(o,s,t+1/3),this.g=tc(o,s,t),this.b=tc(o,s,t-1/3)}return le.toWorkingColorSpace(this,i),this}setStyle(t,e=Fn){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fn){const n=rm[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Oi(t.r),this.g=Oi(t.g),this.b=Oi(t.b),this}copyLinearToSRGB(t){return this.r=Ls(t.r),this.g=Ls(t.g),this.b=Ls(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fn){return le.fromWorkingColorSpace(rn.copy(this),t),Math.round(je(rn.r*255,0,255))*65536+Math.round(je(rn.g*255,0,255))*256+Math.round(je(rn.b*255,0,255))}getHexString(t=Fn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(rn.copy(this),e);const n=rn.r,i=rn.g,s=rn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(rn.copy(this),e),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=Fn){le.fromWorkingColorSpace(rn.copy(this),t);const e=rn.r,n=rn.g,i=rn.b;return t!==Fn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL($i),this.setHSL($i.h+t,$i.s+e,$i.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($i),t.getHSL(xa);const n=Io($i.h,xa.h,e),i=Io($i.s,xa.s,e),s=Io($i.l,xa.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new Ft;Ft.NAMES=rm;let O0=0;class Zr extends Ys{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:O0++}),this.uuid=qs(),this.name="",this.blending=Ps,this.side=dr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gc,this.blendDst=Wc,this.blendEquation=Rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ps&&(n.blending=this.blending),this.side!==dr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Gc&&(n.blendSrc=this.blendSrc),this.blendDst!==Wc&&(n.blendDst=this.blendDst),this.blendEquation!==Rr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==zs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(n.stencilFail=this.stencilFail),this.stencilZFail!==es&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class fu extends Zr{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.combine=zp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ze=new I,ya=new Ot;class An{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=uf,this.updateRanges=[],this.gpuType=_i,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ya.fromBufferAttribute(this,e),ya.applyMatrix3(t),this.setXY(e,ya.x,ya.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=vs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=pn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=vs(e,this.array)),e}setX(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=vs(e,this.array)),e}setY(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=vs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=vs(e,this.array)),e}setW(t,e){return this.normalized&&(e=pn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),i=pn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=pn(e,this.array),n=pn(n,this.array),i=pn(i,this.array),s=pn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==uf&&(t.usage=this.usage),t}}class sm extends An{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class om extends An{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ne extends An{constructor(t,e,n){super(new Float32Array(t),e,n)}}let F0=0;const Zn=new xe,ec=new Ye,us=new I,In=new $r,ro=new $r,Ze=new I;class Rn extends Ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=qs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Qp(t)?om:sm)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Jt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Zn.makeRotationFromQuaternion(t),this.applyMatrix4(Zn),this}rotateX(t){return Zn.makeRotationX(t),this.applyMatrix4(Zn),this}rotateY(t){return Zn.makeRotationY(t),this.applyMatrix4(Zn),this}rotateZ(t){return Zn.makeRotationZ(t),this.applyMatrix4(Zn),this}translate(t,e,n){return Zn.makeTranslation(t,e,n),this.applyMatrix4(Zn),this}scale(t,e,n){return Zn.makeScale(t,e,n),this.applyMatrix4(Zn),this}lookAt(t){return ec.lookAt(t),ec.updateMatrix(),this.applyMatrix4(ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ne(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $r);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];In.setFromBufferAttribute(s),this.morphTargetsRelative?(Ze.addVectors(this.boundingBox.min,In.min),this.boundingBox.expandByPoint(Ze),Ze.addVectors(this.boundingBox.max,In.max),this.boundingBox.expandByPoint(Ze)):(this.boundingBox.expandByPoint(In.min),this.boundingBox.expandByPoint(In.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new $s);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(In.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];ro.setFromBufferAttribute(a),this.morphTargetsRelative?(Ze.addVectors(In.min,ro.min),In.expandByPoint(Ze),Ze.addVectors(In.max,ro.max),In.expandByPoint(Ze)):(In.expandByPoint(ro.min),In.expandByPoint(ro.max))}In.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Ze.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Ze));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ze.fromBufferAttribute(a,c),l&&(us.fromBufferAttribute(t,c),Ze.add(us)),i=Math.max(i,n.distanceToSquared(Ze))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new I,l[R]=new I;const c=new I,h=new I,u=new I,f=new Ot,d=new Ot,g=new Ot,_=new I,m=new I;function p(R,y,x){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,y),u.fromBufferAttribute(n,x),f.fromBufferAttribute(s,R),d.fromBufferAttribute(s,y),g.fromBufferAttribute(s,x),h.sub(c),u.sub(c),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-d.y).multiplyScalar(P),m.copy(u).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(P),a[R].add(_),a[y].add(_),a[x].add(_),l[R].add(m),l[y].add(m),l[x].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let R=0,y=S.length;R<y;++R){const x=S[R],P=x.start,U=x.count;for(let B=P,V=P+U;B<V;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const M=new I,v=new I,C=new I,w=new I;function b(R){C.fromBufferAttribute(i,R),w.copy(C);const y=a[R];M.copy(y),M.sub(C.multiplyScalar(C.dot(y))).normalize(),v.crossVectors(w,y);const P=v.dot(l[R])<0?-1:1;o.setXYZW(R,M.x,M.y,M.z,P)}for(let R=0,y=S.length;R<y;++R){const x=S[R],P=x.start,U=x.count;for(let B=P,V=P+U;B<V;B+=3)b(t.getX(B+0)),b(t.getX(B+1)),b(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new An(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new I,s=new I,o=new I,a=new I,l=new I,c=new I,h=new I,u=new I;if(t)for(let f=0,d=t.count;f<d;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),s.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=e.count;f<d;f+=3)i.fromBufferAttribute(e,f+0),s.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ze.fromBufferAttribute(t,e),Ze.normalize(),t.setXYZ(e,Ze.x,Ze.y,Ze.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*h;for(let p=0;p<h;p++)f[g++]=c[d++]}return new An(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Rn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const f=c[h],d=t(f,n);l.push(d)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const d=c[u];h.push(d.toJSON(t.data))}h.length>0&&(i[l]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rf=new xe,yr=new nm,Ma=new $s,Pf=new I,Sa=new I,Ea=new I,ba=new I,nc=new I,Ta=new I,Df=new I,wa=new I;class Ve extends Ye{constructor(t=new Rn,e=new fu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Ta.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(nc.fromBufferAttribute(u,t),o?Ta.addScaledVector(nc,h):Ta.addScaledVector(nc.sub(e),h))}e.add(Ta)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ma.copy(n.boundingSphere),Ma.applyMatrix4(s),yr.copy(t.ray).recast(t.near),!(Ma.containsPoint(yr.origin)===!1&&(yr.intersectSphere(Ma,Pf)===null||yr.origin.distanceToSquared(Pf)>(t.far-t.near)**2))&&(Rf.copy(s).invert(),yr.copy(t.ray).applyMatrix4(Rf),!(n.boundingBox!==null&&yr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,yr)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),M=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=S,C=M;v<C;v+=3){const w=a.getX(v),b=a.getX(v+1),R=a.getX(v+2);i=Aa(this,p,t,n,c,h,u,w,b,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const S=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);i=Aa(this,o,t,n,c,h,u,S,M,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],S=Math.max(m.start,d.start),M=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=S,C=M;v<C;v+=3){const w=v,b=v+1,R=v+2;i=Aa(this,p,t,n,c,h,u,w,b,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const S=m,M=m+1,v=m+2;i=Aa(this,o,t,n,c,h,u,S,M,v),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function B0(r,t,e,n,i,s,o,a){let l;if(t.side===wn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,t.side===dr,a),l===null)return null;wa.copy(a),wa.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(wa);return c<e.near||c>e.far?null:{distance:c,point:wa.clone(),object:r}}function Aa(r,t,e,n,i,s,o,a,l,c){r.getVertexPosition(a,Sa),r.getVertexPosition(l,Ea),r.getVertexPosition(c,ba);const h=B0(r,t,e,n,Sa,Ea,ba,Df);if(h){const u=new I;ai.getBarycoord(Df,Sa,Ea,ba,u),i&&(h.uv=ai.getInterpolatedAttribute(i,a,l,c,u,new Ot)),s&&(h.uv1=ai.getInterpolatedAttribute(s,a,l,c,u,new Ot)),o&&(h.normal=ai.getInterpolatedAttribute(o,a,l,c,u,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new I,materialIndex:0};ai.getNormal(Sa,Ea,ba,f.normal),h.face=f,h.barycoord=u}return h}class Jo extends Rn{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let f=0,d=0;g("z","y","x",-1,-1,n,e,t,o,s,0),g("z","y","x",1,-1,n,e,-t,o,s,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,s,4),g("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Ne(c,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(u,2));function g(_,m,p,S,M,v,C,w,b,R,y){const x=v/b,P=C/R,U=v/2,B=C/2,V=w/2,q=b+1,X=R+1;let Y=0,k=0;const et=new I;for(let D=0;D<X;D++){const st=D*P-B;for(let Dt=0;Dt<q;Dt++){const jt=Dt*x-U;et[_]=jt*S,et[m]=st*M,et[p]=V,c.push(et.x,et.y,et.z),et[_]=0,et[m]=0,et[p]=w>0?1:-1,h.push(et.x,et.y,et.z),u.push(Dt/b),u.push(1-D/R),Y+=1}}for(let D=0;D<R;D++)for(let st=0;st<b;st++){const Dt=f+st+q*D,jt=f+st+q*(D+1),$=f+(st+1)+q*(D+1),tt=f+(st+1)+q*D;l.push(Dt,jt,tt),l.push(jt,$,tt),k+=6}a.addGroup(d,k,y),d+=k,f+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ws(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function mn(r){const t={};for(let e=0;e<r.length;e++){const n=Ws(r[e]);for(const i in n)t[i]=n[i]}return t}function z0(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function am(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}const k0={clone:Ws,merge:mn};var H0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,V0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class pr extends Zr{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=H0,this.fragmentShader=V0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ws(t.uniforms),this.uniformsGroups=z0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class lm extends Ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xe,this.projectionMatrix=new xe,this.projectionMatrixInverse=new xe,this.coordinateSystem=Ii}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Zi=new I,Lf=new Ot,If=new Ot;class zn extends lm{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=qo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Lo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return qo*2*Math.atan(Math.tan(Lo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z),Zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Zi.x,Zi.y).multiplyScalar(-t/Zi.z)}getViewSize(t,e){return this.getViewBounds(t,Lf,If),e.subVectors(If,Lf)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Lo*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const fs=-90,ds=1;class G0 extends Ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new zn(fs,ds,t,e);i.layers=this.layers,this.add(i);const s=new zn(fs,ds,t,e);s.layers=this.layers,this.add(s);const o=new zn(fs,ds,t,e);o.layers=this.layers,this.add(o);const a=new zn(fs,ds,t,e);a.layers=this.layers,this.add(a);const l=new zn(fs,ds,t,e);l.layers=this.layers,this.add(l);const c=new zn(fs,ds,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,l]=e;for(const c of e)this.remove(c);if(t===Ii)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===hl)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class cm extends hn{constructor(t,e,n,i,s,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ks,super(t,e,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class W0 extends Yr{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new cm(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:gi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Jo(5,5,5),s=new pr({name:"CubemapFromEquirect",uniforms:Ws(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:wn,blending:ar});s.uniforms.tEquirect.value=e;const o=new Ve(i,s),a=e.minFilter;return e.minFilter===Ur&&(e.minFilter=gi),new G0(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const ic=new I,X0=new I,Y0=new Jt;class Ar{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=ic.subVectors(n,e).cross(X0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ic),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Y0.getNormalMatrix(t),i=this.coplanarPoint(ic).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mr=new $s,Ca=new I;class du{constructor(t=new Ar,e=new Ar,n=new Ar,i=new Ar,s=new Ar,o=new Ar){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ii){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],f=i[7],d=i[8],g=i[9],_=i[10],m=i[11],p=i[12],S=i[13],M=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-d,v-p).normalize(),n[1].setComponents(l+s,f+c,m+d,v+p).normalize(),n[2].setComponents(l+o,f+h,m+g,v+S).normalize(),n[3].setComponents(l-o,f-h,m-g,v-S).normalize(),n[4].setComponents(l-a,f-u,m-_,v-M).normalize(),e===Ii)n[5].setComponents(l+a,f+u,m+_,v+M).normalize();else if(e===hl)n[5].setComponents(a,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Mr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Mr.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Mr)}intersectsSprite(t){return Mr.center.set(0,0,0),Mr.radius=.7071067811865476,Mr.applyMatrix4(t.matrixWorld),this.intersectsSphere(Mr)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Ca.x=i.normal.x>0?t.max.x:t.min.x,Ca.y=i.normal.y>0?t.max.y:t.min.y,Ca.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Ca)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hm(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function q0(r){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,a),u.length===0)r.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){const g=u[f],_=u[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){const _=u[d];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(r.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}class yl extends Rn{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,f=e/l,d=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const S=p*f-o;for(let M=0;M<c;M++){const v=M*u-s;g.push(v,-S,0),_.push(0,0,1),m.push(M/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const M=S+c*p,v=S+c*(p+1),C=S+1+c*(p+1),w=S+1+c*p;d.push(M,v,w),d.push(v,C,w)}this.setIndex(d),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yl(t.width,t.height,t.widthSegments,t.heightSegments)}}var $0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Z0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,K0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,J0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,j0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Q0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ev=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,iv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ov=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,av=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,lv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,cv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_v=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,yv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ev=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Tv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Av=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Rv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Iv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Uv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ov=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Fv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Hv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$v=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Zv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Kv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qv=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ex=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,nx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ix=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ox=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ax=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,hx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ux=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,dx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,px=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_x=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ex=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ax=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Px=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Dx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Lx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ix=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ux=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Nx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ox=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Fx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Vx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Yx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$x=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Qx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ty=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ey=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ny=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ry=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,oy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ay=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,ly=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,py=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,my=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_y=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,My=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ey=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,by=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ty=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Qt={alphahash_fragment:$0,alphahash_pars_fragment:Z0,alphamap_fragment:K0,alphamap_pars_fragment:J0,alphatest_fragment:j0,alphatest_pars_fragment:Q0,aomap_fragment:tv,aomap_pars_fragment:ev,batching_pars_vertex:nv,batching_vertex:iv,begin_vertex:rv,beginnormal_vertex:sv,bsdfs:ov,iridescence_fragment:av,bumpmap_pars_fragment:lv,clipping_planes_fragment:cv,clipping_planes_pars_fragment:hv,clipping_planes_pars_vertex:uv,clipping_planes_vertex:fv,color_fragment:dv,color_pars_fragment:pv,color_pars_vertex:mv,color_vertex:gv,common:_v,cube_uv_reflection_fragment:vv,defaultnormal_vertex:xv,displacementmap_pars_vertex:yv,displacementmap_vertex:Mv,emissivemap_fragment:Sv,emissivemap_pars_fragment:Ev,colorspace_fragment:bv,colorspace_pars_fragment:Tv,envmap_fragment:wv,envmap_common_pars_fragment:Av,envmap_pars_fragment:Cv,envmap_pars_vertex:Rv,envmap_physical_pars_fragment:kv,envmap_vertex:Pv,fog_vertex:Dv,fog_pars_vertex:Lv,fog_fragment:Iv,fog_pars_fragment:Uv,gradientmap_pars_fragment:Nv,lightmap_pars_fragment:Ov,lights_lambert_fragment:Fv,lights_lambert_pars_fragment:Bv,lights_pars_begin:zv,lights_toon_fragment:Hv,lights_toon_pars_fragment:Vv,lights_phong_fragment:Gv,lights_phong_pars_fragment:Wv,lights_physical_fragment:Xv,lights_physical_pars_fragment:Yv,lights_fragment_begin:qv,lights_fragment_maps:$v,lights_fragment_end:Zv,logdepthbuf_fragment:Kv,logdepthbuf_pars_fragment:Jv,logdepthbuf_pars_vertex:jv,logdepthbuf_vertex:Qv,map_fragment:tx,map_pars_fragment:ex,map_particle_fragment:nx,map_particle_pars_fragment:ix,metalnessmap_fragment:rx,metalnessmap_pars_fragment:sx,morphinstance_vertex:ox,morphcolor_vertex:ax,morphnormal_vertex:lx,morphtarget_pars_vertex:cx,morphtarget_vertex:hx,normal_fragment_begin:ux,normal_fragment_maps:fx,normal_pars_fragment:dx,normal_pars_vertex:px,normal_vertex:mx,normalmap_pars_fragment:gx,clearcoat_normal_fragment_begin:_x,clearcoat_normal_fragment_maps:vx,clearcoat_pars_fragment:xx,iridescence_pars_fragment:yx,opaque_fragment:Mx,packing:Sx,premultiplied_alpha_fragment:Ex,project_vertex:bx,dithering_fragment:Tx,dithering_pars_fragment:wx,roughnessmap_fragment:Ax,roughnessmap_pars_fragment:Cx,shadowmap_pars_fragment:Rx,shadowmap_pars_vertex:Px,shadowmap_vertex:Dx,shadowmask_pars_fragment:Lx,skinbase_vertex:Ix,skinning_pars_vertex:Ux,skinning_vertex:Nx,skinnormal_vertex:Ox,specularmap_fragment:Fx,specularmap_pars_fragment:Bx,tonemapping_fragment:zx,tonemapping_pars_fragment:kx,transmission_fragment:Hx,transmission_pars_fragment:Vx,uv_pars_fragment:Gx,uv_pars_vertex:Wx,uv_vertex:Xx,worldpos_vertex:Yx,background_vert:qx,background_frag:$x,backgroundCube_vert:Zx,backgroundCube_frag:Kx,cube_vert:Jx,cube_frag:jx,depth_vert:Qx,depth_frag:ty,distanceRGBA_vert:ey,distanceRGBA_frag:ny,equirect_vert:iy,equirect_frag:ry,linedashed_vert:sy,linedashed_frag:oy,meshbasic_vert:ay,meshbasic_frag:ly,meshlambert_vert:cy,meshlambert_frag:hy,meshmatcap_vert:uy,meshmatcap_frag:fy,meshnormal_vert:dy,meshnormal_frag:py,meshphong_vert:my,meshphong_frag:gy,meshphysical_vert:_y,meshphysical_frag:vy,meshtoon_vert:xy,meshtoon_frag:yy,points_vert:My,points_frag:Sy,shadow_vert:Ey,shadow_frag:by,sprite_vert:Ty,sprite_frag:wy},_t={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new Ot(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new Ot(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},fi={basic:{uniforms:mn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.fog]),vertexShader:Qt.meshbasic_vert,fragmentShader:Qt.meshbasic_frag},lambert:{uniforms:mn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Qt.meshlambert_vert,fragmentShader:Qt.meshlambert_frag},phong:{uniforms:mn([_t.common,_t.specularmap,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,_t.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30}}]),vertexShader:Qt.meshphong_vert,fragmentShader:Qt.meshphong_frag},standard:{uniforms:mn([_t.common,_t.envmap,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.roughnessmap,_t.metalnessmap,_t.fog,_t.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag},toon:{uniforms:mn([_t.common,_t.aomap,_t.lightmap,_t.emissivemap,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.gradientmap,_t.fog,_t.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Qt.meshtoon_vert,fragmentShader:Qt.meshtoon_frag},matcap:{uniforms:mn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,_t.fog,{matcap:{value:null}}]),vertexShader:Qt.meshmatcap_vert,fragmentShader:Qt.meshmatcap_frag},points:{uniforms:mn([_t.points,_t.fog]),vertexShader:Qt.points_vert,fragmentShader:Qt.points_frag},dashed:{uniforms:mn([_t.common,_t.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qt.linedashed_vert,fragmentShader:Qt.linedashed_frag},depth:{uniforms:mn([_t.common,_t.displacementmap]),vertexShader:Qt.depth_vert,fragmentShader:Qt.depth_frag},normal:{uniforms:mn([_t.common,_t.bumpmap,_t.normalmap,_t.displacementmap,{opacity:{value:1}}]),vertexShader:Qt.meshnormal_vert,fragmentShader:Qt.meshnormal_frag},sprite:{uniforms:mn([_t.sprite,_t.fog]),vertexShader:Qt.sprite_vert,fragmentShader:Qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qt.background_vert,fragmentShader:Qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:Qt.backgroundCube_vert,fragmentShader:Qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qt.cube_vert,fragmentShader:Qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qt.equirect_vert,fragmentShader:Qt.equirect_frag},distanceRGBA:{uniforms:mn([_t.common,_t.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qt.distanceRGBA_vert,fragmentShader:Qt.distanceRGBA_frag},shadow:{uniforms:mn([_t.lights,_t.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:Qt.shadow_vert,fragmentShader:Qt.shadow_frag}};fi.physical={uniforms:mn([fi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new Ot(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new Ot},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new Ot},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:Qt.meshphysical_vert,fragmentShader:Qt.meshphysical_frag};const Ra={r:0,b:0,g:0},Sr=new yi,Ay=new xe;function Cy(r,t,e,n,i,s,o){const a=new Ft(0);let l=s===!0?0:1,c,h,u=null,f=0,d=null;function g(S){let M=S.isScene===!0?S.background:null;return M&&M.isTexture&&(M=(S.backgroundBlurriness>0?e:t).get(M)),M}function _(S){let M=!1;const v=g(S);v===null?p(a,l):v&&v.isColor&&(p(v,1),M=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(S,M){const v=g(M);v&&(v.isCubeTexture||v.mapping===vl)?(h===void 0&&(h=new Ve(new Jo(1,1,1),new pr({name:"BackgroundCubeMaterial",uniforms:Ws(fi.backgroundCube.uniforms),vertexShader:fi.backgroundCube.vertexShader,fragmentShader:fi.backgroundCube.fragmentShader,side:wn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Sr.copy(M.backgroundRotation),Sr.x*=-1,Sr.y*=-1,Sr.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Sr.y*=-1,Sr.z*=-1),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ay.makeRotationFromEuler(Sr)),h.material.toneMapped=le.getTransfer(v.colorSpace)!==_e,(u!==v||f!==v.version||d!==r.toneMapping)&&(h.material.needsUpdate=!0,u=v,f=v.version,d=r.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Ve(new yl(2,2),new pr({name:"BackgroundMaterial",uniforms:Ws(fi.background.uniforms),vertexShader:fi.background.vertexShader,fragmentShader:fi.background.fragmentShader,side:dr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=le.getTransfer(v.colorSpace)!==_e,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||f!==v.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,u=v,f=v.version,d=r.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,M){S.getRGB(Ra,am(r)),n.buffers.color.setClear(Ra.r,Ra.g,Ra.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(S,M=1){a.set(S),l=M,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:_,addToRenderList:m}}function Ry(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(x,P,U,B,V){let q=!1;const X=u(B,U,P);s!==X&&(s=X,c(s.object)),q=d(x,B,U,V),q&&g(x,B,U,V),V!==null&&t.update(V,r.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,v(x,P,U,B),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return r.createVertexArray()}function c(x){return r.bindVertexArray(x)}function h(x){return r.deleteVertexArray(x)}function u(x,P,U){const B=U.wireframe===!0;let V=n[x.id];V===void 0&&(V={},n[x.id]=V);let q=V[P.id];q===void 0&&(q={},V[P.id]=q);let X=q[B];return X===void 0&&(X=f(l()),q[B]=X),X}function f(x){const P=[],U=[],B=[];for(let V=0;V<e;V++)P[V]=0,U[V]=0,B[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:B,object:x,attributes:{},index:null}}function d(x,P,U,B){const V=s.attributes,q=P.attributes;let X=0;const Y=U.getAttributes();for(const k in Y)if(Y[k].location>=0){const D=V[k];let st=q[k];if(st===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(st=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(st=x.instanceColor)),D===void 0||D.attribute!==st||st&&D.data!==st.data)return!0;X++}return s.attributesNum!==X||s.index!==B}function g(x,P,U,B){const V={},q=P.attributes;let X=0;const Y=U.getAttributes();for(const k in Y)if(Y[k].location>=0){let D=q[k];D===void 0&&(k==="instanceMatrix"&&x.instanceMatrix&&(D=x.instanceMatrix),k==="instanceColor"&&x.instanceColor&&(D=x.instanceColor));const st={};st.attribute=D,D&&D.data&&(st.data=D.data),V[k]=st,X++}s.attributes=V,s.attributesNum=X,s.index=B}function _(){const x=s.newAttributes;for(let P=0,U=x.length;P<U;P++)x[P]=0}function m(x){p(x,0)}function p(x,P){const U=s.newAttributes,B=s.enabledAttributes,V=s.attributeDivisors;U[x]=1,B[x]===0&&(r.enableVertexAttribArray(x),B[x]=1),V[x]!==P&&(r.vertexAttribDivisor(x,P),V[x]=P)}function S(){const x=s.newAttributes,P=s.enabledAttributes;for(let U=0,B=P.length;U<B;U++)P[U]!==x[U]&&(r.disableVertexAttribArray(U),P[U]=0)}function M(x,P,U,B,V,q,X){X===!0?r.vertexAttribIPointer(x,P,U,V,q):r.vertexAttribPointer(x,P,U,B,V,q)}function v(x,P,U,B){_();const V=B.attributes,q=U.getAttributes(),X=P.defaultAttributeValues;for(const Y in q){const k=q[Y];if(k.location>=0){let et=V[Y];if(et===void 0&&(Y==="instanceMatrix"&&x.instanceMatrix&&(et=x.instanceMatrix),Y==="instanceColor"&&x.instanceColor&&(et=x.instanceColor)),et!==void 0){const D=et.normalized,st=et.itemSize,Dt=t.get(et);if(Dt===void 0)continue;const jt=Dt.buffer,$=Dt.type,tt=Dt.bytesPerElement,ut=$===r.INT||$===r.UNSIGNED_INT||et.gpuType===ru;if(et.isInterleavedBufferAttribute){const nt=et.data,xt=nt.stride,Et=et.offset;if(nt.isInstancedInterleavedBuffer){for(let zt=0;zt<k.locationSize;zt++)p(k.location+zt,nt.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let zt=0;zt<k.locationSize;zt++)m(k.location+zt);r.bindBuffer(r.ARRAY_BUFFER,jt);for(let zt=0;zt<k.locationSize;zt++)M(k.location+zt,st/k.locationSize,$,D,xt*tt,(Et+st/k.locationSize*zt)*tt,ut)}else{if(et.isInstancedBufferAttribute){for(let nt=0;nt<k.locationSize;nt++)p(k.location+nt,et.meshPerAttribute);x.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let nt=0;nt<k.locationSize;nt++)m(k.location+nt);r.bindBuffer(r.ARRAY_BUFFER,jt);for(let nt=0;nt<k.locationSize;nt++)M(k.location+nt,st/k.locationSize,$,D,st*tt,st/k.locationSize*nt*tt,ut)}}else if(X!==void 0){const D=X[Y];if(D!==void 0)switch(D.length){case 2:r.vertexAttrib2fv(k.location,D);break;case 3:r.vertexAttrib3fv(k.location,D);break;case 4:r.vertexAttrib4fv(k.location,D);break;default:r.vertexAttrib1fv(k.location,D)}}}}S()}function C(){R();for(const x in n){const P=n[x];for(const U in P){const B=P[U];for(const V in B)h(B[V].object),delete B[V];delete P[U]}delete n[x]}}function w(x){if(n[x.id]===void 0)return;const P=n[x.id];for(const U in P){const B=P[U];for(const V in B)h(B[V].object),delete B[V];delete P[U]}delete n[x.id]}function b(x){for(const P in n){const U=n[P];if(U[x.id]===void 0)continue;const B=U[x.id];for(const V in B)h(B[V].object),delete B[V];delete U[x.id]}}function R(){y(),o=!0,s!==i&&(s=i,c(s.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Py(r,t,e){let n;function i(c){n=c}function s(c,h){r.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(r.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let d=0;for(let g=0;g<u;g++)d+=h[g];e.update(d,n,1)}function l(c,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],h[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];e.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Dy(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(b){return!(b!==li&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const R=b===Zo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==zi&&n.convert(b)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==_i&&!R)}function l(b){if(b==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),S=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),M=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,w=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:C,maxSamples:w}}function Ly(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new Ar,a=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||i;return i=f,n=u.length,d},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const S=s?0:n,M=S*4;let v=p.clippingState||null;l.value=v,v=h(g,f,M,d);for(let C=0;C!==M;++C)v[C]=e[C];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,v=d;M!==_;++M,v+=4)o.copy(u[M]).applyMatrix4(S,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Iy(r){let t=new WeakMap;function e(o,a){return a===jc?o.mapping=ks:a===Qc&&(o.mapping=Hs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===jc||a===Qc)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new W0(l.height);return c.fromEquirectangularTexture(r,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class um extends lm{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ss=4,Uf=[.125,.215,.35,.446,.526,.582],Pr=20,rc=new um,Nf=new Ft;let sc=null,oc=0,ac=0,lc=!1;const Cr=(1+Math.sqrt(5))/2,ps=1/Cr,Of=[new I(-Cr,ps,0),new I(Cr,ps,0),new I(-ps,0,Cr),new I(ps,0,Cr),new I(0,Cr,-ps),new I(0,Cr,ps),new I(-1,1,-1),new I(1,1,-1),new I(-1,1,1),new I(1,1,1)];class Ff{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){sc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=zf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(sc,oc,ac),this._renderer.xr.enabled=lc,t.scissorTest=!1,Pa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ks||t.mapping===Hs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),sc=this._renderer.getRenderTarget(),oc=this._renderer.getActiveCubeFace(),ac=this._renderer.getActiveMipmapLevel(),lc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:gi,minFilter:gi,generateMipmaps:!1,type:Zo,format:li,colorSpace:Xs,depthBuffer:!1},i=Bf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Bf(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Uy(s)),this._blurMaterial=Ny(s,t,e)}return i}_compileMaterial(t){const e=new Ve(this._lodPlanes[0],t);this._renderer.compile(e,rc)}_sceneToCubeUV(t,e,n,i){const a=new zn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Nf),h.toneMapping=lr,h.autoClear=!1;const d=new fu({name:"PMREM.Background",side:wn,depthWrite:!1,depthTest:!1}),g=new Ve(new Jo,d);let _=!1;const m=t.background;m?m.isColor&&(d.color.copy(m),t.background=null,_=!0):(d.color.copy(Nf),_=!0);for(let p=0;p<6;p++){const S=p%3;S===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):S===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const M=this._cubeSize;Pa(i,S*M,p>2?M:0,M,M),h.setRenderTarget(i),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ks||t.mapping===Hs;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=kf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=zf());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Ve(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const l=this._cubeSize;Pa(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,rc)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Of[(i-s-1)%Of.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Ve(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Pr-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):Pr;m>Pr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Pr}`);const p=[];let S=0;for(let b=0;b<Pr;++b){const R=b/_,y=Math.exp(-R*R/2);p.push(y),b===0?S+=y:b<m&&(S+=2*y)}for(let b=0;b<p.length;b++)p[b]=p[b]/S;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=g,f.mipInt.value=M-n;const v=this._sizeLods[i],C=3*v*(i>M-Ss?i-M+Ss:0),w=4*(this._cubeSize-v);Pa(e,C,w,3*v,2*v),l.setRenderTarget(e),l.render(u,rc)}}function Uy(r){const t=[],e=[],n=[];let i=r;const s=r-Ss+1+Uf.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-Ss?l=Uf[o-r+Ss-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*d),M=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let w=0;w<d;w++){const b=w%3*2/3-1,R=w>2?0:-1,y=[b,R,0,b+2/3,R,0,b+2/3,R+1,0,b,R,0,b+2/3,R+1,0,b,R+1,0];S.set(y,_*g*w),M.set(f,m*g*w);const x=[w,w,w,w,w,w];v.set(x,p*g*w)}const C=new Rn;C.setAttribute("position",new An(S,_)),C.setAttribute("uv",new An(M,m)),C.setAttribute("faceIndex",new An(v,p)),t.push(C),i>Ss&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Bf(r,t,e){const n=new Yr(r,t,e);return n.texture.mapping=vl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Pa(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function Ny(r,t,e){const n=new Float32Array(Pr),i=new I(0,1,0);return new pr({name:"SphericalGaussianBlur",defines:{n:Pr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function zf(){return new pr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function kf(){return new pr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ar,depthTest:!1,depthWrite:!1})}function pu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Oy(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===jc||l===Qc,h=l===ks||l===Hs;if(c||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Ff(r)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return c&&d&&d.height>0||h&&d&&i(d)?(e===null&&(e=new Ff(r)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Fy(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&_o("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function By(r,t,e,n){const i={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(t.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,e.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)t.update(f[g],r.ARRAY_BUFFER);const d=u.morphAttributes;for(const g in d){const _=d[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],r.ARRAY_BUFFER)}}function c(u){const f=[],d=u.index,g=u.attributes.position;let _=0;if(d!==null){const S=d.array;_=d.version;for(let M=0,v=S.length;M<v;M+=3){const C=S[M+0],w=S[M+1],b=S[M+2];f.push(C,w,w,b,b,C)}}else if(g!==void 0){const S=g.array;_=g.version;for(let M=0,v=S.length/3-1;M<v;M+=3){const C=M+0,w=M+1,b=M+2;f.push(C,w,w,b,b,C)}}else return;const m=new(Qp(f)?om:sm)(f,1);m.version=_;const p=s.get(u);p&&t.remove(p),s.set(u,m)}function h(u){const f=s.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function zy(r,t,e){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){r.drawElements(n,d,s,f*o),e.update(d,n,1)}function c(f,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,f*o,g),e.update(d,n,g))}function h(f,d,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];e.update(m,n,1)}function u(f,d,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=d[S]*_[S];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ky(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Hy(r,t,e){const n=new WeakMap,i=new ve;function s(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let x=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",x)};var d=x;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let C=a.attributes.position.count*v,w=1;C>t.maxTextureSize&&(w=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const b=new Float32Array(C*w*4*u),R=new em(b,C,w,u);R.type=_i,R.needsUpdate=!0;const y=v*4;for(let P=0;P<u;P++){const U=p[P],B=S[P],V=M[P],q=C*w*4*P;for(let X=0;X<U.count;X++){const Y=X*y;g===!0&&(i.fromBufferAttribute(U,X),b[q+Y+0]=i.x,b[q+Y+1]=i.y,b[q+Y+2]=i.z,b[q+Y+3]=0),_===!0&&(i.fromBufferAttribute(B,X),b[q+Y+4]=i.x,b[q+Y+5]=i.y,b[q+Y+6]=i.z,b[q+Y+7]=0),m===!0&&(i.fromBufferAttribute(V,X),b[q+Y+8]=i.x,b[q+Y+9]=i.y,b[q+Y+10]=i.z,b[q+Y+11]=V.itemSize===4?i.w:1)}}f={count:u,texture:R,size:new Ot(C,w)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Vy(r,t,e,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:o}}class fm extends hn{constructor(t,e,n,i,s,o,a,l,c,h=Ds){if(h!==Ds&&h!==Gs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ds&&(n=Xr),n===void 0&&h===Gs&&(n=Vs),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Xn,this.minFilter=l!==void 0?l:Xn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const dm=new hn,Hf=new fm(1,1),pm=new em,mm=new C0,gm=new cm,Vf=[],Gf=[],Wf=new Float32Array(16),Xf=new Float32Array(9),Yf=new Float32Array(4);function Zs(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=Vf[i];if(s===void 0&&(s=new Float32Array(i),Vf[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function qe(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function $e(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Ml(r,t){let e=Gf[t];e===void 0&&(e=new Int32Array(t),Gf[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function Gy(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Wy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;r.uniform2fv(this.addr,t),$e(e,t)}}function Xy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(qe(e,t))return;r.uniform3fv(this.addr,t),$e(e,t)}}function Yy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;r.uniform4fv(this.addr,t),$e(e,t)}}function qy(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),$e(e,t)}else{if(qe(e,n))return;Yf.set(n),r.uniformMatrix2fv(this.addr,!1,Yf),$e(e,n)}}function $y(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),$e(e,t)}else{if(qe(e,n))return;Xf.set(n),r.uniformMatrix3fv(this.addr,!1,Xf),$e(e,n)}}function Zy(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(qe(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),$e(e,t)}else{if(qe(e,n))return;Wf.set(n),r.uniformMatrix4fv(this.addr,!1,Wf),$e(e,n)}}function Ky(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Jy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;r.uniform2iv(this.addr,t),$e(e,t)}}function jy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;r.uniform3iv(this.addr,t),$e(e,t)}}function Qy(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;r.uniform4iv(this.addr,t),$e(e,t)}}function tM(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function eM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(qe(e,t))return;r.uniform2uiv(this.addr,t),$e(e,t)}}function nM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(qe(e,t))return;r.uniform3uiv(this.addr,t),$e(e,t)}}function iM(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(qe(e,t))return;r.uniform4uiv(this.addr,t),$e(e,t)}}function rM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Hf.compareFunction=jp,s=Hf):s=dm,e.setTexture2D(t||s,i)}function sM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||mm,i)}function oM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||gm,i)}function aM(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||pm,i)}function lM(r){switch(r){case 5126:return Gy;case 35664:return Wy;case 35665:return Xy;case 35666:return Yy;case 35674:return qy;case 35675:return $y;case 35676:return Zy;case 5124:case 35670:return Ky;case 35667:case 35671:return Jy;case 35668:case 35672:return jy;case 35669:case 35673:return Qy;case 5125:return tM;case 36294:return eM;case 36295:return nM;case 36296:return iM;case 35678:case 36198:case 36298:case 36306:case 35682:return rM;case 35679:case 36299:case 36307:return sM;case 35680:case 36300:case 36308:case 36293:return oM;case 36289:case 36303:case 36311:case 36292:return aM}}function cM(r,t){r.uniform1fv(this.addr,t)}function hM(r,t){const e=Zs(t,this.size,2);r.uniform2fv(this.addr,e)}function uM(r,t){const e=Zs(t,this.size,3);r.uniform3fv(this.addr,e)}function fM(r,t){const e=Zs(t,this.size,4);r.uniform4fv(this.addr,e)}function dM(r,t){const e=Zs(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function pM(r,t){const e=Zs(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function mM(r,t){const e=Zs(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function gM(r,t){r.uniform1iv(this.addr,t)}function _M(r,t){r.uniform2iv(this.addr,t)}function vM(r,t){r.uniform3iv(this.addr,t)}function xM(r,t){r.uniform4iv(this.addr,t)}function yM(r,t){r.uniform1uiv(this.addr,t)}function MM(r,t){r.uniform2uiv(this.addr,t)}function SM(r,t){r.uniform3uiv(this.addr,t)}function EM(r,t){r.uniform4uiv(this.addr,t)}function bM(r,t,e){const n=this.cache,i=t.length,s=Ml(e,i);qe(n,s)||(r.uniform1iv(this.addr,s),$e(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||dm,s[o])}function TM(r,t,e){const n=this.cache,i=t.length,s=Ml(e,i);qe(n,s)||(r.uniform1iv(this.addr,s),$e(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||mm,s[o])}function wM(r,t,e){const n=this.cache,i=t.length,s=Ml(e,i);qe(n,s)||(r.uniform1iv(this.addr,s),$e(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||gm,s[o])}function AM(r,t,e){const n=this.cache,i=t.length,s=Ml(e,i);qe(n,s)||(r.uniform1iv(this.addr,s),$e(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||pm,s[o])}function CM(r){switch(r){case 5126:return cM;case 35664:return hM;case 35665:return uM;case 35666:return fM;case 35674:return dM;case 35675:return pM;case 35676:return mM;case 5124:case 35670:return gM;case 35667:case 35671:return _M;case 35668:case 35672:return vM;case 35669:case 35673:return xM;case 5125:return yM;case 36294:return MM;case 36295:return SM;case 36296:return EM;case 35678:case 36198:case 36298:case 36306:case 35682:return bM;case 35679:case 36299:case 36307:return TM;case 35680:case 36300:case 36308:case 36293:return wM;case 36289:case 36303:case 36311:case 36292:return AM}}class RM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=lM(e.type)}}class PM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=CM(e.type)}}class DM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const cc=/(\w+)(\])?(\[|\.)?/g;function qf(r,t){r.seq.push(t),r.map[t.id]=t}function LM(r,t,e){const n=r.name,i=n.length;for(cc.lastIndex=0;;){const s=cc.exec(n),o=cc.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){qf(e,c===void 0?new RM(a,r,t):new PM(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new DM(a),qf(e,u)),e=u}}}class Ja{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);LM(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function $f(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const IM=37297;let UM=0;function NM(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Zf=new Jt;function OM(r){le._getMatrix(Zf,le.workingColorSpace,r);const t=`mat3( ${Zf.elements.map(e=>e.toFixed(4))} )`;switch(le.getTransfer(r)){case xl:return[t,"LinearTransferOETF"];case _e:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Kf(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+NM(r.getShaderSource(t),o)}else return i}function FM(r,t){const e=OM(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function BM(r,t){let e;switch(t){case k_:e="Linear";break;case H_:e="Reinhard";break;case V_:e="Cineon";break;case kp:e="ACESFilmic";break;case W_:e="AgX";break;case X_:e="Neutral";break;case G_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Da=new I;function zM(){le.getLuminanceCoefficients(Da);const r=Da.x.toFixed(4),t=Da.y.toFixed(4),e=Da.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function kM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vo).join(`
`)}function HM(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function VM(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function vo(r){return r!==""}function Jf(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jf(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const GM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ch(r){return r.replace(GM,XM)}const WM=new Map;function XM(r,t){let e=Qt[t];if(e===void 0){const n=WM.get(t);if(n!==void 0)e=Qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ch(e)}const YM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Qf(r){return r.replace(YM,qM)}function qM(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function td(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $M(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Bp?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===x_?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Ai&&(t="SHADOWMAP_TYPE_VSM"),t}function ZM(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ks:case Hs:t="ENVMAP_TYPE_CUBE";break;case vl:t="ENVMAP_TYPE_CUBE_UV";break}return t}function KM(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Hs:t="ENVMAP_MODE_REFRACTION";break}return t}function JM(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case zp:t="ENVMAP_BLENDING_MULTIPLY";break;case B_:t="ENVMAP_BLENDING_MIX";break;case z_:t="ENVMAP_BLENDING_ADD";break}return t}function jM(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function QM(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=$M(e),c=ZM(e),h=KM(e),u=JM(e),f=jM(e),d=kM(e),g=HM(s),_=i.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(vo).join(`
`),p.length>0&&(p+=`
`)):(m=[td(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vo).join(`
`),p=[td(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==lr?"#define TONE_MAPPING":"",e.toneMapping!==lr?Qt.tonemapping_pars_fragment:"",e.toneMapping!==lr?BM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Qt.colorspace_pars_fragment,FM("linearToOutputTexel",e.outputColorSpace),zM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vo).join(`
`)),o=Ch(o),o=Jf(o,e),o=jf(o,e),a=Ch(a),a=Jf(a,e),a=jf(a,e),o=Qf(o),a=Qf(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===ff?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ff?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=S+m+o,v=S+p+a,C=$f(i,i.VERTEX_SHADER,M),w=$f(i,i.FRAGMENT_SHADER,v);i.attachShader(_,C),i.attachShader(_,w),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function b(P){if(r.debug.checkShaderErrors){const U=i.getProgramInfoLog(_).trim(),B=i.getShaderInfoLog(C).trim(),V=i.getShaderInfoLog(w).trim();let q=!0,X=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,C,w);else{const Y=Kf(i,C,"vertex"),k=Kf(i,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+U+`
`+Y+`
`+k)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(B===""||V==="")&&(X=!1);X&&(P.diagnostics={runnable:q,programLog:U,vertexShader:{log:B,prefix:m},fragmentShader:{log:V,prefix:p}})}i.deleteShader(C),i.deleteShader(w),R=new Ja(i,_),y=VM(i,_)}let R;this.getUniforms=function(){return R===void 0&&b(this),R};let y;this.getAttributes=function(){return y===void 0&&b(this),y};let x=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=i.getProgramParameter(_,IM)),x},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=UM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=C,this.fragmentShader=w,this}let tS=0;class eS{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new nS(t),e.set(t,n)),n}}class nS{constructor(t){this.id=tS++,this.code=t,this.usedTimes=0}}function iS(r,t,e,n,i,s,o){const a=new im,l=new eS,c=new Set,h=[],u=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,x,P,U,B){const V=U.fog,q=B.geometry,X=y.isMeshStandardMaterial?U.environment:null,Y=(y.isMeshStandardMaterial?e:t).get(y.envMap||X),k=Y&&Y.mapping===vl?Y.image.height:null,et=g[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));const D=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,st=D!==void 0?D.length:0;let Dt=0;q.morphAttributes.position!==void 0&&(Dt=1),q.morphAttributes.normal!==void 0&&(Dt=2),q.morphAttributes.color!==void 0&&(Dt=3);let jt,$,tt,ut;if(et){const vt=fi[et];jt=vt.vertexShader,$=vt.fragmentShader}else jt=y.vertexShader,$=y.fragmentShader,l.update(y),tt=l.getVertexShaderID(y),ut=l.getFragmentShaderID(y);const nt=r.getRenderTarget(),xt=r.state.buffers.depth.getReversed(),Et=B.isInstancedMesh===!0,zt=B.isBatchedMesh===!0,$t=!!y.map,Ut=!!y.matcap,Rt=!!Y,N=!!y.aoMap,ye=!!y.lightMap,kt=!!y.bumpMap,z=!!y.normalMap,Tt=!!y.displacementMap,se=!!y.emissiveMap,Pt=!!y.metalnessMap,A=!!y.roughnessMap,E=y.anisotropy>0,G=y.clearcoat>0,Q=y.dispersion>0,j=y.iridescence>0,K=y.sheen>0,ft=y.transmission>0,lt=E&&!!y.anisotropyMap,mt=G&&!!y.clearcoatMap,Yt=G&&!!y.clearcoatNormalMap,it=G&&!!y.clearcoatRoughnessMap,at=j&&!!y.iridescenceMap,Nt=j&&!!y.iridescenceThicknessMap,It=K&&!!y.sheenColorMap,yt=K&&!!y.sheenRoughnessMap,Zt=!!y.specularMap,Bt=!!y.specularColorMap,ae=!!y.specularIntensityMap,L=ft&&!!y.transmissionMap,ht=ft&&!!y.thicknessMap,Z=!!y.gradientMap,J=!!y.alphaMap,ct=y.alphaTest>0,dt=!!y.alphaHash,Ht=!!y.extensions;let ce=lr;y.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(ce=r.toneMapping);const Ie={shaderID:et,shaderType:y.type,shaderName:y.name,vertexShader:jt,fragmentShader:$,defines:y.defines,customVertexShaderID:tt,customFragmentShaderID:ut,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:zt,batchingColor:zt&&B._colorsTexture!==null,instancing:Et,instancingColor:Et&&B.instanceColor!==null,instancingMorph:Et&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:nt===null?r.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Xs,alphaToCoverage:!!y.alphaToCoverage,map:$t,matcap:Ut,envMap:Rt,envMapMode:Rt&&Y.mapping,envMapCubeUVHeight:k,aoMap:N,lightMap:ye,bumpMap:kt,normalMap:z,displacementMap:f&&Tt,emissiveMap:se,normalMapObjectSpace:z&&y.normalMapType===Z_,normalMapTangentSpace:z&&y.normalMapType===Jp,metalnessMap:Pt,roughnessMap:A,anisotropy:E,anisotropyMap:lt,clearcoat:G,clearcoatMap:mt,clearcoatNormalMap:Yt,clearcoatRoughnessMap:it,dispersion:Q,iridescence:j,iridescenceMap:at,iridescenceThicknessMap:Nt,sheen:K,sheenColorMap:It,sheenRoughnessMap:yt,specularMap:Zt,specularColorMap:Bt,specularIntensityMap:ae,transmission:ft,transmissionMap:L,thicknessMap:ht,gradientMap:Z,opaque:y.transparent===!1&&y.blending===Ps&&y.alphaToCoverage===!1,alphaMap:J,alphaTest:ct,alphaHash:dt,combine:y.combine,mapUv:$t&&_(y.map.channel),aoMapUv:N&&_(y.aoMap.channel),lightMapUv:ye&&_(y.lightMap.channel),bumpMapUv:kt&&_(y.bumpMap.channel),normalMapUv:z&&_(y.normalMap.channel),displacementMapUv:Tt&&_(y.displacementMap.channel),emissiveMapUv:se&&_(y.emissiveMap.channel),metalnessMapUv:Pt&&_(y.metalnessMap.channel),roughnessMapUv:A&&_(y.roughnessMap.channel),anisotropyMapUv:lt&&_(y.anisotropyMap.channel),clearcoatMapUv:mt&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:at&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Nt&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:It&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:yt&&_(y.sheenRoughnessMap.channel),specularMapUv:Zt&&_(y.specularMap.channel),specularColorMapUv:Bt&&_(y.specularColorMap.channel),specularIntensityMapUv:ae&&_(y.specularIntensityMap.channel),transmissionMapUv:L&&_(y.transmissionMap.channel),thicknessMapUv:ht&&_(y.thicknessMap.channel),alphaMapUv:J&&_(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(z||E),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!q.attributes.uv&&($t||J),fog:!!V,useFog:y.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:xt,skinning:B.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:st,morphTextureStride:Dt,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:ce,decodeVideoTexture:$t&&y.map.isVideoTexture===!0&&le.getTransfer(y.map.colorSpace)===_e,decodeVideoTextureEmissive:se&&y.emissiveMap.isVideoTexture===!0&&le.getTransfer(y.emissiveMap.colorSpace)===_e,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Di,flipSided:y.side===wn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Ht&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&y.extensions.multiDraw===!0||zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function p(y){const x=[];if(y.shaderID?x.push(y.shaderID):(x.push(y.customVertexShaderID),x.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)x.push(P),x.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(S(x,y),M(x,y),x.push(r.outputColorSpace)),x.push(y.customProgramCacheKey),x.join()}function S(y,x){y.push(x.precision),y.push(x.outputColorSpace),y.push(x.envMapMode),y.push(x.envMapCubeUVHeight),y.push(x.mapUv),y.push(x.alphaMapUv),y.push(x.lightMapUv),y.push(x.aoMapUv),y.push(x.bumpMapUv),y.push(x.normalMapUv),y.push(x.displacementMapUv),y.push(x.emissiveMapUv),y.push(x.metalnessMapUv),y.push(x.roughnessMapUv),y.push(x.anisotropyMapUv),y.push(x.clearcoatMapUv),y.push(x.clearcoatNormalMapUv),y.push(x.clearcoatRoughnessMapUv),y.push(x.iridescenceMapUv),y.push(x.iridescenceThicknessMapUv),y.push(x.sheenColorMapUv),y.push(x.sheenRoughnessMapUv),y.push(x.specularMapUv),y.push(x.specularColorMapUv),y.push(x.specularIntensityMapUv),y.push(x.transmissionMapUv),y.push(x.thicknessMapUv),y.push(x.combine),y.push(x.fogExp2),y.push(x.sizeAttenuation),y.push(x.morphTargetsCount),y.push(x.morphAttributeCount),y.push(x.numDirLights),y.push(x.numPointLights),y.push(x.numSpotLights),y.push(x.numSpotLightMaps),y.push(x.numHemiLights),y.push(x.numRectAreaLights),y.push(x.numDirLightShadows),y.push(x.numPointLightShadows),y.push(x.numSpotLightShadows),y.push(x.numSpotLightShadowsWithMaps),y.push(x.numLightProbes),y.push(x.shadowMapType),y.push(x.toneMapping),y.push(x.numClippingPlanes),y.push(x.numClipIntersection),y.push(x.depthPacking)}function M(y,x){a.disableAll(),x.supportsVertexTextures&&a.enable(0),x.instancing&&a.enable(1),x.instancingColor&&a.enable(2),x.instancingMorph&&a.enable(3),x.matcap&&a.enable(4),x.envMap&&a.enable(5),x.normalMapObjectSpace&&a.enable(6),x.normalMapTangentSpace&&a.enable(7),x.clearcoat&&a.enable(8),x.iridescence&&a.enable(9),x.alphaTest&&a.enable(10),x.vertexColors&&a.enable(11),x.vertexAlphas&&a.enable(12),x.vertexUv1s&&a.enable(13),x.vertexUv2s&&a.enable(14),x.vertexUv3s&&a.enable(15),x.vertexTangents&&a.enable(16),x.anisotropy&&a.enable(17),x.alphaHash&&a.enable(18),x.batching&&a.enable(19),x.dispersion&&a.enable(20),x.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),x.fog&&a.enable(0),x.useFog&&a.enable(1),x.flatShading&&a.enable(2),x.logarithmicDepthBuffer&&a.enable(3),x.reverseDepthBuffer&&a.enable(4),x.skinning&&a.enable(5),x.morphTargets&&a.enable(6),x.morphNormals&&a.enable(7),x.morphColors&&a.enable(8),x.premultipliedAlpha&&a.enable(9),x.shadowMapEnabled&&a.enable(10),x.doubleSided&&a.enable(11),x.flipSided&&a.enable(12),x.useDepthPacking&&a.enable(13),x.dithering&&a.enable(14),x.transmission&&a.enable(15),x.sheen&&a.enable(16),x.opaque&&a.enable(17),x.pointsUvs&&a.enable(18),x.decodeVideoTexture&&a.enable(19),x.decodeVideoTextureEmissive&&a.enable(20),x.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const x=g[y.type];let P;if(x){const U=fi[x];P=k0.clone(U.uniforms)}else P=y.uniforms;return P}function C(y,x){let P;for(let U=0,B=h.length;U<B;U++){const V=h[U];if(V.cacheKey===x){P=V,++P.usedTimes;break}}return P===void 0&&(P=new QM(r,x,y,s),h.push(P)),P}function w(y){if(--y.usedTimes===0){const x=h.indexOf(y);h[x]=h[h.length-1],h.pop(),y.destroy()}}function b(y){l.remove(y)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:C,releaseProgram:w,releaseShaderCache:b,programs:h,dispose:R}}function rS(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function sS(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function ed(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function nd(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,f,d,g,_,m){let p=r[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},r[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):e.push(p)}function l(u,f,d,g,_,m){const p=o(u,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):e.unshift(p)}function c(u,f){e.length>1&&e.sort(u||sS),n.length>1&&n.sort(f||ed),i.length>1&&i.sort(f||ed)}function h(){for(let u=t,f=r.length;u<f;u++){const d=r[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function oS(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new nd,r.set(n,[o])):i>=s.length?(o=new nd,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function aS(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Ft};break;case"SpotLight":e={position:new I,direction:new I,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new I,halfWidth:new I,halfHeight:new I};break}return r[t.id]=e,e}}}function lS(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ot,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let cS=0;function hS(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function uS(r){const t=new aS,e=lS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new I);const i=new I,s=new xe,o=new xe;function a(c){let h=0,u=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,S=0,M=0,v=0,C=0,w=0,b=0;c.sort(hS);for(let y=0,x=c.length;y<x;y++){const P=c[y],U=P.color,B=P.intensity,V=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=U.r*B,u+=U.g*B,f+=U.b*B;else if(P.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(P.sh.coefficients[X],B);b++}else if(P.isDirectionalLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const Y=P.shadow,k=e.get(P);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,n.directionalShadow[d]=k,n.directionalShadowMap[d]=q,n.directionalShadowMatrix[d]=P.shadow.matrix,S++}n.directional[d]=X,d++}else if(P.isSpotLight){const X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(U).multiplyScalar(B),X.distance=V,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,n.spot[_]=X;const Y=P.shadow;if(P.map&&(n.spotLightMap[C]=P.map,C++,Y.updateMatrices(P),P.castShadow&&w++),n.spotLightMatrix[_]=Y.matrix,P.castShadow){const k=e.get(P);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=q,v++}_++}else if(P.isRectAreaLight){const X=t.get(P);X.color.copy(U).multiplyScalar(B),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=X,m++}else if(P.isPointLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity),X.distance=P.distance,X.decay=P.decay,P.castShadow){const Y=P.shadow,k=e.get(P);k.shadowIntensity=Y.intensity,k.shadowBias=Y.bias,k.shadowNormalBias=Y.normalBias,k.shadowRadius=Y.radius,k.shadowMapSize=Y.mapSize,k.shadowCameraNear=Y.camera.near,k.shadowCameraFar=Y.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=P.shadow.matrix,M++}n.point[g]=X,g++}else if(P.isHemisphereLight){const X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(B),X.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=X,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_t.LTC_FLOAT_1,n.rectAreaLTC2=_t.LTC_FLOAT_2):(n.rectAreaLTC1=_t.LTC_HALF_1,n.rectAreaLTC2=_t.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==d||R.pointLength!==g||R.spotLength!==_||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==S||R.numPointShadows!==M||R.numSpotShadows!==v||R.numSpotMaps!==C||R.numLightProbes!==b)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+C-w,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=b,R.directionalLength=d,R.pointLength=g,R.spotLength=_,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=S,R.numPointShadows=M,R.numSpotShadows=v,R.numSpotMaps=C,R.numLightProbes=b,n.version=cS++)}function l(c,h){let u=0,f=0,d=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const M=c[p];if(M.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),u++}else if(M.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),i.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(M.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(M.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function id(r){const t=new uS(r),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function fS(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new id(r),t.set(i,[a])):s>=o.length?(a=new id(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class dS extends Zr{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=q_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class pS extends Zr{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const mS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,gS=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function _S(r,t,e){let n=new du;const i=new Ot,s=new Ot,o=new ve,a=new dS({depthPacking:$_}),l=new pS,c={},h=e.maxTextureSize,u={[dr]:wn,[wn]:dr,[Di]:Di},f=new pr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ot},radius:{value:4}},vertexShader:mS,fragmentShader:gS}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new Rn;g.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ve(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bp;let p=this.type;this.render=function(w,b,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const y=r.getRenderTarget(),x=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),U=r.state;U.setBlending(ar),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const B=p!==Ai&&this.type===Ai,V=p===Ai&&this.type!==Ai;for(let q=0,X=w.length;q<X;q++){const Y=w[q],k=Y.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const et=k.getFrameExtents();if(i.multiply(et),s.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/et.x),i.x=s.x*et.x,k.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/et.y),i.y=s.y*et.y,k.mapSize.y=s.y)),k.map===null||B===!0||V===!0){const st=this.type!==Ai?{minFilter:Xn,magFilter:Xn}:{};k.map!==null&&k.map.dispose(),k.map=new Yr(i.x,i.y,st),k.map.texture.name=Y.name+".shadowMap",k.camera.updateProjectionMatrix()}r.setRenderTarget(k.map),r.clear();const D=k.getViewportCount();for(let st=0;st<D;st++){const Dt=k.getViewport(st);o.set(s.x*Dt.x,s.y*Dt.y,s.x*Dt.z,s.y*Dt.w),U.viewport(o),k.updateMatrices(Y,st),n=k.getFrustum(),v(b,R,k.camera,Y,this.type)}k.isPointLightShadow!==!0&&this.type===Ai&&S(k,R),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(y,x,P)};function S(w,b){const R=t.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Yr(i.x,i.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(b,null,R,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(b,null,R,d,_,null)}function M(w,b,R,y){let x=null;const P=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)x=P;else if(x=R.isPointLight===!0?l:a,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const U=x.uuid,B=b.uuid;let V=c[U];V===void 0&&(V={},c[U]=V);let q=V[B];q===void 0&&(q=x.clone(),V[B]=q,b.addEventListener("dispose",C)),x=q}if(x.visible=b.visible,x.wireframe=b.wireframe,y===Ai?x.side=b.shadowSide!==null?b.shadowSide:b.side:x.side=b.shadowSide!==null?b.shadowSide:u[b.side],x.alphaMap=b.alphaMap,x.alphaTest=b.alphaTest,x.map=b.map,x.clipShadows=b.clipShadows,x.clippingPlanes=b.clippingPlanes,x.clipIntersection=b.clipIntersection,x.displacementMap=b.displacementMap,x.displacementScale=b.displacementScale,x.displacementBias=b.displacementBias,x.wireframeLinewidth=b.wireframeLinewidth,x.linewidth=b.linewidth,R.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const U=r.properties.get(x);U.light=R}return x}function v(w,b,R,y,x){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&x===Ai)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);const B=t.update(w),V=w.material;if(Array.isArray(V)){const q=B.groups;for(let X=0,Y=q.length;X<Y;X++){const k=q[X],et=V[k.materialIndex];if(et&&et.visible){const D=M(w,et,y,x);w.onBeforeShadow(r,w,b,R,B,D,k),r.renderBufferDirect(R,null,B,D,w,k),w.onAfterShadow(r,w,b,R,B,D,k)}}}else if(V.visible){const q=M(w,V,y,x);w.onBeforeShadow(r,w,b,R,B,q,null),r.renderBufferDirect(R,null,B,q,w,null),w.onAfterShadow(r,w,b,R,B,q,null)}}const U=w.children;for(let B=0,V=U.length;B<V;B++)v(U[B],b,R,y,x)}function C(w){w.target.removeEventListener("dispose",C);for(const R in c){const y=c[R],x=w.target.uuid;x in y&&(y[x].dispose(),delete y[x])}}}const vS={[Xc]:Yc,[qc]:Kc,[$c]:Jc,[zs]:Zc,[Yc]:Xc,[Kc]:qc,[Jc]:$c,[Zc]:zs};function xS(r,t){function e(){let L=!1;const ht=new ve;let Z=null;const J=new ve(0,0,0,0);return{setMask:function(ct){Z!==ct&&!L&&(r.colorMask(ct,ct,ct,ct),Z=ct)},setLocked:function(ct){L=ct},setClear:function(ct,dt,Ht,ce,Ie){Ie===!0&&(ct*=ce,dt*=ce,Ht*=ce),ht.set(ct,dt,Ht,ce),J.equals(ht)===!1&&(r.clearColor(ct,dt,Ht,ce),J.copy(ht))},reset:function(){L=!1,Z=null,J.set(-1,0,0,0)}}}function n(){let L=!1,ht=!1,Z=null,J=null,ct=null;return{setReversed:function(dt){if(ht!==dt){const Ht=t.get("EXT_clip_control");ht?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);const ce=ct;ct=null,this.setClear(ce)}ht=dt},getReversed:function(){return ht},setTest:function(dt){dt?nt(r.DEPTH_TEST):xt(r.DEPTH_TEST)},setMask:function(dt){Z!==dt&&!L&&(r.depthMask(dt),Z=dt)},setFunc:function(dt){if(ht&&(dt=vS[dt]),J!==dt){switch(dt){case Xc:r.depthFunc(r.NEVER);break;case Yc:r.depthFunc(r.ALWAYS);break;case qc:r.depthFunc(r.LESS);break;case zs:r.depthFunc(r.LEQUAL);break;case $c:r.depthFunc(r.EQUAL);break;case Zc:r.depthFunc(r.GEQUAL);break;case Kc:r.depthFunc(r.GREATER);break;case Jc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=dt}},setLocked:function(dt){L=dt},setClear:function(dt){ct!==dt&&(ht&&(dt=1-dt),r.clearDepth(dt),ct=dt)},reset:function(){L=!1,Z=null,J=null,ct=null,ht=!1}}}function i(){let L=!1,ht=null,Z=null,J=null,ct=null,dt=null,Ht=null,ce=null,Ie=null;return{setTest:function(vt){L||(vt?nt(r.STENCIL_TEST):xt(r.STENCIL_TEST))},setMask:function(vt){ht!==vt&&!L&&(r.stencilMask(vt),ht=vt)},setFunc:function(vt,wt,Kt){(Z!==vt||J!==wt||ct!==Kt)&&(r.stencilFunc(vt,wt,Kt),Z=vt,J=wt,ct=Kt)},setOp:function(vt,wt,Kt){(dt!==vt||Ht!==wt||ce!==Kt)&&(r.stencilOp(vt,wt,Kt),dt=vt,Ht=wt,ce=Kt)},setLocked:function(vt){L=vt},setClear:function(vt){Ie!==vt&&(r.clearStencil(vt),Ie=vt)},reset:function(){L=!1,ht=null,Z=null,J=null,ct=null,dt=null,Ht=null,ce=null,Ie=null}}}const s=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,S=null,M=null,v=null,C=null,w=null,b=new Ft(0,0,0),R=0,y=!1,x=null,P=null,U=null,B=null,V=null;const q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,Y=0;const k=r.getParameter(r.VERSION);k.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(k)[1]),X=Y>=1):k.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),X=Y>=2);let et=null,D={};const st=r.getParameter(r.SCISSOR_BOX),Dt=r.getParameter(r.VIEWPORT),jt=new ve().fromArray(st),$=new ve().fromArray(Dt);function tt(L,ht,Z,J){const ct=new Uint8Array(4),dt=r.createTexture();r.bindTexture(L,dt),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ht=0;Ht<Z;Ht++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(ht,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,ct):r.texImage2D(ht+Ht,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ct);return dt}const ut={};ut[r.TEXTURE_2D]=tt(r.TEXTURE_2D,r.TEXTURE_2D,1),ut[r.TEXTURE_CUBE_MAP]=tt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ut[r.TEXTURE_2D_ARRAY]=tt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ut[r.TEXTURE_3D]=tt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(r.DEPTH_TEST),o.setFunc(zs),kt(!1),z(af),nt(r.CULL_FACE),N(ar);function nt(L){h[L]!==!0&&(r.enable(L),h[L]=!0)}function xt(L){h[L]!==!1&&(r.disable(L),h[L]=!1)}function Et(L,ht){return u[L]!==ht?(r.bindFramebuffer(L,ht),u[L]=ht,L===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ht),L===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ht),!0):!1}function zt(L,ht){let Z=d,J=!1;if(L){Z=f.get(ht),Z===void 0&&(Z=[],f.set(ht,Z));const ct=L.textures;if(Z.length!==ct.length||Z[0]!==r.COLOR_ATTACHMENT0){for(let dt=0,Ht=ct.length;dt<Ht;dt++)Z[dt]=r.COLOR_ATTACHMENT0+dt;Z.length=ct.length,J=!0}}else Z[0]!==r.BACK&&(Z[0]=r.BACK,J=!0);J&&r.drawBuffers(Z)}function $t(L){return g!==L?(r.useProgram(L),g=L,!0):!1}const Ut={[Rr]:r.FUNC_ADD,[M_]:r.FUNC_SUBTRACT,[S_]:r.FUNC_REVERSE_SUBTRACT};Ut[E_]=r.MIN,Ut[b_]=r.MAX;const Rt={[T_]:r.ZERO,[w_]:r.ONE,[A_]:r.SRC_COLOR,[Gc]:r.SRC_ALPHA,[I_]:r.SRC_ALPHA_SATURATE,[D_]:r.DST_COLOR,[R_]:r.DST_ALPHA,[C_]:r.ONE_MINUS_SRC_COLOR,[Wc]:r.ONE_MINUS_SRC_ALPHA,[L_]:r.ONE_MINUS_DST_COLOR,[P_]:r.ONE_MINUS_DST_ALPHA,[U_]:r.CONSTANT_COLOR,[N_]:r.ONE_MINUS_CONSTANT_COLOR,[O_]:r.CONSTANT_ALPHA,[F_]:r.ONE_MINUS_CONSTANT_ALPHA};function N(L,ht,Z,J,ct,dt,Ht,ce,Ie,vt){if(L===ar){_===!0&&(xt(r.BLEND),_=!1);return}if(_===!1&&(nt(r.BLEND),_=!0),L!==y_){if(L!==m||vt!==y){if((p!==Rr||v!==Rr)&&(r.blendEquation(r.FUNC_ADD),p=Rr,v=Rr),vt)switch(L){case Ps:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case cl:r.blendFunc(r.ONE,r.ONE);break;case lf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case cf:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Ps:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case cl:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case lf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case cf:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}S=null,M=null,C=null,w=null,b.set(0,0,0),R=0,m=L,y=vt}return}ct=ct||ht,dt=dt||Z,Ht=Ht||J,(ht!==p||ct!==v)&&(r.blendEquationSeparate(Ut[ht],Ut[ct]),p=ht,v=ct),(Z!==S||J!==M||dt!==C||Ht!==w)&&(r.blendFuncSeparate(Rt[Z],Rt[J],Rt[dt],Rt[Ht]),S=Z,M=J,C=dt,w=Ht),(ce.equals(b)===!1||Ie!==R)&&(r.blendColor(ce.r,ce.g,ce.b,Ie),b.copy(ce),R=Ie),m=L,y=!1}function ye(L,ht){L.side===Di?xt(r.CULL_FACE):nt(r.CULL_FACE);let Z=L.side===wn;ht&&(Z=!Z),kt(Z),L.blending===Ps&&L.transparent===!1?N(ar):N(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const J=L.stencilWrite;a.setTest(J),J&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),se(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?nt(r.SAMPLE_ALPHA_TO_COVERAGE):xt(r.SAMPLE_ALPHA_TO_COVERAGE)}function kt(L){x!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),x=L)}function z(L){L!==__?(nt(r.CULL_FACE),L!==P&&(L===af?r.cullFace(r.BACK):L===v_?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):xt(r.CULL_FACE),P=L}function Tt(L){L!==U&&(X&&r.lineWidth(L),U=L)}function se(L,ht,Z){L?(nt(r.POLYGON_OFFSET_FILL),(B!==ht||V!==Z)&&(r.polygonOffset(ht,Z),B=ht,V=Z)):xt(r.POLYGON_OFFSET_FILL)}function Pt(L){L?nt(r.SCISSOR_TEST):xt(r.SCISSOR_TEST)}function A(L){L===void 0&&(L=r.TEXTURE0+q-1),et!==L&&(r.activeTexture(L),et=L)}function E(L,ht,Z){Z===void 0&&(et===null?Z=r.TEXTURE0+q-1:Z=et);let J=D[Z];J===void 0&&(J={type:void 0,texture:void 0},D[Z]=J),(J.type!==L||J.texture!==ht)&&(et!==Z&&(r.activeTexture(Z),et=Z),r.bindTexture(L,ht||ut[L]),J.type=L,J.texture=ht)}function G(){const L=D[et];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Q(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function j(){try{r.compressedTexImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{r.texSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ft(){try{r.texSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function lt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function mt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Yt(){try{r.texStorage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function it(){try{r.texStorage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function at(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Nt(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function It(L){jt.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),jt.copy(L))}function yt(L){$.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),$.copy(L))}function Zt(L,ht){let Z=c.get(ht);Z===void 0&&(Z=new WeakMap,c.set(ht,Z));let J=Z.get(L);J===void 0&&(J=r.getUniformBlockIndex(ht,L.name),Z.set(L,J))}function Bt(L,ht){const J=c.get(ht).get(L);l.get(ht)!==J&&(r.uniformBlockBinding(ht,J,L.__bindingPointIndex),l.set(ht,J))}function ae(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},et=null,D={},u={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,S=null,M=null,v=null,C=null,w=null,b=new Ft(0,0,0),R=0,y=!1,x=null,P=null,U=null,B=null,V=null,jt.set(0,0,r.canvas.width,r.canvas.height),$.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:nt,disable:xt,bindFramebuffer:Et,drawBuffers:zt,useProgram:$t,setBlending:N,setMaterial:ye,setFlipSided:kt,setCullFace:z,setLineWidth:Tt,setPolygonOffset:se,setScissorTest:Pt,activeTexture:A,bindTexture:E,unbindTexture:G,compressedTexImage2D:Q,compressedTexImage3D:j,texImage2D:at,texImage3D:Nt,updateUBOMapping:Zt,uniformBlockBinding:Bt,texStorage2D:Yt,texStorage3D:it,texSubImage2D:K,texSubImage3D:ft,compressedTexSubImage2D:lt,compressedTexSubImage3D:mt,scissor:It,viewport:yt,reset:ae}}function rd(r,t,e,n){const i=yS(n);switch(e){case Xp:return r*t;case qp:return r*t;case $p:return r*t*2;case au:return r*t/i.components*i.byteLength;case lu:return r*t/i.components*i.byteLength;case Zp:return r*t*2/i.components*i.byteLength;case cu:return r*t*2/i.components*i.byteLength;case Yp:return r*t*3/i.components*i.byteLength;case li:return r*t*4/i.components*i.byteLength;case hu:return r*t*4/i.components*i.byteLength;case Ya:case qa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case $a:case Za:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ih:case sh:return Math.max(r,16)*Math.max(t,8)/4;case nh:case rh:return Math.max(r,8)*Math.max(t,8)/2;case oh:case ah:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case lh:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ch:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case hh:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case uh:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case fh:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case dh:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ph:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case mh:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case gh:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case _h:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case vh:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case xh:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case yh:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Mh:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case Sh:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Ka:case Eh:case bh:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Kp:case Th:return Math.ceil(r/4)*Math.ceil(t/4)*8;case wh:case Ah:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function yS(r){switch(r){case zi:case Vp:return{byteLength:1,components:1};case Yo:case Gp:case Zo:return{byteLength:2,components:1};case su:case ou:return{byteLength:2,components:4};case Xr:case ru:case _i:return{byteLength:4,components:1};case Wp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function MS(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ot,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,E){return d?new OffscreenCanvas(A,E):ul("canvas")}function _(A,E,G){let Q=1;const j=Pt(A);if((j.width>G||j.height>G)&&(Q=G/Math.max(j.width,j.height)),Q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const K=Math.floor(Q*j.width),ft=Math.floor(Q*j.height);u===void 0&&(u=g(K,ft));const lt=E?g(K,ft):u;return lt.width=K,lt.height=ft,lt.getContext("2d").drawImage(A,0,0,K,ft),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+K+"x"+ft+")."),lt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),A;return A}function m(A){return A.generateMipmaps}function p(A){r.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?r.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function M(A,E,G,Q,j=!1){if(A!==null){if(r[A]!==void 0)return r[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let K=E;if(E===r.RED&&(G===r.FLOAT&&(K=r.R32F),G===r.HALF_FLOAT&&(K=r.R16F),G===r.UNSIGNED_BYTE&&(K=r.R8)),E===r.RED_INTEGER&&(G===r.UNSIGNED_BYTE&&(K=r.R8UI),G===r.UNSIGNED_SHORT&&(K=r.R16UI),G===r.UNSIGNED_INT&&(K=r.R32UI),G===r.BYTE&&(K=r.R8I),G===r.SHORT&&(K=r.R16I),G===r.INT&&(K=r.R32I)),E===r.RG&&(G===r.FLOAT&&(K=r.RG32F),G===r.HALF_FLOAT&&(K=r.RG16F),G===r.UNSIGNED_BYTE&&(K=r.RG8)),E===r.RG_INTEGER&&(G===r.UNSIGNED_BYTE&&(K=r.RG8UI),G===r.UNSIGNED_SHORT&&(K=r.RG16UI),G===r.UNSIGNED_INT&&(K=r.RG32UI),G===r.BYTE&&(K=r.RG8I),G===r.SHORT&&(K=r.RG16I),G===r.INT&&(K=r.RG32I)),E===r.RGB_INTEGER&&(G===r.UNSIGNED_BYTE&&(K=r.RGB8UI),G===r.UNSIGNED_SHORT&&(K=r.RGB16UI),G===r.UNSIGNED_INT&&(K=r.RGB32UI),G===r.BYTE&&(K=r.RGB8I),G===r.SHORT&&(K=r.RGB16I),G===r.INT&&(K=r.RGB32I)),E===r.RGBA_INTEGER&&(G===r.UNSIGNED_BYTE&&(K=r.RGBA8UI),G===r.UNSIGNED_SHORT&&(K=r.RGBA16UI),G===r.UNSIGNED_INT&&(K=r.RGBA32UI),G===r.BYTE&&(K=r.RGBA8I),G===r.SHORT&&(K=r.RGBA16I),G===r.INT&&(K=r.RGBA32I)),E===r.RGB&&G===r.UNSIGNED_INT_5_9_9_9_REV&&(K=r.RGB9_E5),E===r.RGBA){const ft=j?xl:le.getTransfer(Q);G===r.FLOAT&&(K=r.RGBA32F),G===r.HALF_FLOAT&&(K=r.RGBA16F),G===r.UNSIGNED_BYTE&&(K=ft===_e?r.SRGB8_ALPHA8:r.RGBA8),G===r.UNSIGNED_SHORT_4_4_4_4&&(K=r.RGBA4),G===r.UNSIGNED_SHORT_5_5_5_1&&(K=r.RGB5_A1)}return(K===r.R16F||K===r.R32F||K===r.RG16F||K===r.RG32F||K===r.RGBA16F||K===r.RGBA32F)&&t.get("EXT_color_buffer_float"),K}function v(A,E){let G;return A?E===null||E===Xr||E===Vs?G=r.DEPTH24_STENCIL8:E===_i?G=r.DEPTH32F_STENCIL8:E===Yo&&(G=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===Xr||E===Vs?G=r.DEPTH_COMPONENT24:E===_i?G=r.DEPTH_COMPONENT32F:E===Yo&&(G=r.DEPTH_COMPONENT16),G}function C(A,E){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Xn&&A.minFilter!==gi?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function w(A){const E=A.target;E.removeEventListener("dispose",w),R(E),E.isVideoTexture&&h.delete(E)}function b(A){const E=A.target;E.removeEventListener("dispose",b),x(E)}function R(A){const E=n.get(A);if(E.__webglInit===void 0)return;const G=A.source,Q=f.get(G);if(Q){const j=Q[E.__cacheKey];j.usedTimes--,j.usedTimes===0&&y(A),Object.keys(Q).length===0&&f.delete(G)}n.remove(A)}function y(A){const E=n.get(A);r.deleteTexture(E.__webglTexture);const G=A.source,Q=f.get(G);delete Q[E.__cacheKey],o.memory.textures--}function x(A){const E=n.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),n.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(E.__webglFramebuffer[Q]))for(let j=0;j<E.__webglFramebuffer[Q].length;j++)r.deleteFramebuffer(E.__webglFramebuffer[Q][j]);else r.deleteFramebuffer(E.__webglFramebuffer[Q]);E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer[Q])}else{if(Array.isArray(E.__webglFramebuffer))for(let Q=0;Q<E.__webglFramebuffer.length;Q++)r.deleteFramebuffer(E.__webglFramebuffer[Q]);else r.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&r.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&r.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let Q=0;Q<E.__webglColorRenderbuffer.length;Q++)E.__webglColorRenderbuffer[Q]&&r.deleteRenderbuffer(E.__webglColorRenderbuffer[Q]);E.__webglDepthRenderbuffer&&r.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const G=A.textures;for(let Q=0,j=G.length;Q<j;Q++){const K=n.get(G[Q]);K.__webglTexture&&(r.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(G[Q])}n.remove(A)}let P=0;function U(){P=0}function B(){const A=P;return A>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+i.maxTextures),P+=1,A}function V(A){const E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function q(A,E){const G=n.get(A);if(A.isVideoTexture&&Tt(A),A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){const Q=A.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(G,A,E);return}}e.bindTexture(r.TEXTURE_2D,G.__webglTexture,r.TEXTURE0+E)}function X(A,E){const G=n.get(A);if(A.version>0&&G.__version!==A.version){$(G,A,E);return}e.bindTexture(r.TEXTURE_2D_ARRAY,G.__webglTexture,r.TEXTURE0+E)}function Y(A,E){const G=n.get(A);if(A.version>0&&G.__version!==A.version){$(G,A,E);return}e.bindTexture(r.TEXTURE_3D,G.__webglTexture,r.TEXTURE0+E)}function k(A,E){const G=n.get(A);if(A.version>0&&G.__version!==A.version){tt(G,A,E);return}e.bindTexture(r.TEXTURE_CUBE_MAP,G.__webglTexture,r.TEXTURE0+E)}const et={[th]:r.REPEAT,[Ir]:r.CLAMP_TO_EDGE,[eh]:r.MIRRORED_REPEAT},D={[Xn]:r.NEAREST,[Y_]:r.NEAREST_MIPMAP_NEAREST,[ua]:r.NEAREST_MIPMAP_LINEAR,[gi]:r.LINEAR,[Fl]:r.LINEAR_MIPMAP_NEAREST,[Ur]:r.LINEAR_MIPMAP_LINEAR},st={[K_]:r.NEVER,[n0]:r.ALWAYS,[J_]:r.LESS,[jp]:r.LEQUAL,[j_]:r.EQUAL,[e0]:r.GEQUAL,[Q_]:r.GREATER,[t0]:r.NOTEQUAL};function Dt(A,E){if(E.type===_i&&t.has("OES_texture_float_linear")===!1&&(E.magFilter===gi||E.magFilter===Fl||E.magFilter===ua||E.magFilter===Ur||E.minFilter===gi||E.minFilter===Fl||E.minFilter===ua||E.minFilter===Ur)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(A,r.TEXTURE_WRAP_S,et[E.wrapS]),r.texParameteri(A,r.TEXTURE_WRAP_T,et[E.wrapT]),(A===r.TEXTURE_3D||A===r.TEXTURE_2D_ARRAY)&&r.texParameteri(A,r.TEXTURE_WRAP_R,et[E.wrapR]),r.texParameteri(A,r.TEXTURE_MAG_FILTER,D[E.magFilter]),r.texParameteri(A,r.TEXTURE_MIN_FILTER,D[E.minFilter]),E.compareFunction&&(r.texParameteri(A,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(A,r.TEXTURE_COMPARE_FUNC,st[E.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Xn||E.minFilter!==ua&&E.minFilter!==Ur||E.type===_i&&t.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");r.texParameterf(A,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,i.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function jt(A,E){let G=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",w));const Q=E.source;let j=f.get(Q);j===void 0&&(j={},f.set(Q,j));const K=V(E);if(K!==A.__cacheKey){j[K]===void 0&&(j[K]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,G=!0),j[K].usedTimes++;const ft=j[A.__cacheKey];ft!==void 0&&(j[A.__cacheKey].usedTimes--,ft.usedTimes===0&&y(E)),A.__cacheKey=K,A.__webglTexture=j[K].texture}return G}function $(A,E,G){let Q=r.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(Q=r.TEXTURE_2D_ARRAY),E.isData3DTexture&&(Q=r.TEXTURE_3D);const j=jt(A,E),K=E.source;e.bindTexture(Q,A.__webglTexture,r.TEXTURE0+G);const ft=n.get(K);if(K.version!==ft.__version||j===!0){e.activeTexture(r.TEXTURE0+G);const lt=le.getPrimaries(le.workingColorSpace),mt=E.colorSpace===Ji?null:le.getPrimaries(E.colorSpace),Yt=E.colorSpace===Ji||lt===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let it=_(E.image,!1,i.maxTextureSize);it=se(E,it);const at=s.convert(E.format,E.colorSpace),Nt=s.convert(E.type);let It=M(E.internalFormat,at,Nt,E.colorSpace,E.isVideoTexture);Dt(Q,E);let yt;const Zt=E.mipmaps,Bt=E.isVideoTexture!==!0,ae=ft.__version===void 0||j===!0,L=K.dataReady,ht=C(E,it);if(E.isDepthTexture)It=v(E.format===Gs,E.type),ae&&(Bt?e.texStorage2D(r.TEXTURE_2D,1,It,it.width,it.height):e.texImage2D(r.TEXTURE_2D,0,It,it.width,it.height,0,at,Nt,null));else if(E.isDataTexture)if(Zt.length>0){Bt&&ae&&e.texStorage2D(r.TEXTURE_2D,ht,It,Zt[0].width,Zt[0].height);for(let Z=0,J=Zt.length;Z<J;Z++)yt=Zt[Z],Bt?L&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,yt.width,yt.height,at,Nt,yt.data):e.texImage2D(r.TEXTURE_2D,Z,It,yt.width,yt.height,0,at,Nt,yt.data);E.generateMipmaps=!1}else Bt?(ae&&e.texStorage2D(r.TEXTURE_2D,ht,It,it.width,it.height),L&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,it.width,it.height,at,Nt,it.data)):e.texImage2D(r.TEXTURE_2D,0,It,it.width,it.height,0,at,Nt,it.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Bt&&ae&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ht,It,Zt[0].width,Zt[0].height,it.depth);for(let Z=0,J=Zt.length;Z<J;Z++)if(yt=Zt[Z],E.format!==li)if(at!==null)if(Bt){if(L)if(E.layerUpdates.size>0){const ct=rd(yt.width,yt.height,E.format,E.type);for(const dt of E.layerUpdates){const Ht=yt.data.subarray(dt*ct/yt.data.BYTES_PER_ELEMENT,(dt+1)*ct/yt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,dt,yt.width,yt.height,1,at,Ht)}E.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,yt.width,yt.height,it.depth,at,yt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Z,It,yt.width,yt.height,it.depth,0,yt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Bt?L&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Z,0,0,0,yt.width,yt.height,it.depth,at,Nt,yt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Z,It,yt.width,yt.height,it.depth,0,at,Nt,yt.data)}else{Bt&&ae&&e.texStorage2D(r.TEXTURE_2D,ht,It,Zt[0].width,Zt[0].height);for(let Z=0,J=Zt.length;Z<J;Z++)yt=Zt[Z],E.format!==li?at!==null?Bt?L&&e.compressedTexSubImage2D(r.TEXTURE_2D,Z,0,0,yt.width,yt.height,at,yt.data):e.compressedTexImage2D(r.TEXTURE_2D,Z,It,yt.width,yt.height,0,yt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Bt?L&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,yt.width,yt.height,at,Nt,yt.data):e.texImage2D(r.TEXTURE_2D,Z,It,yt.width,yt.height,0,at,Nt,yt.data)}else if(E.isDataArrayTexture)if(Bt){if(ae&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ht,It,it.width,it.height,it.depth),L)if(E.layerUpdates.size>0){const Z=rd(it.width,it.height,E.format,E.type);for(const J of E.layerUpdates){const ct=it.data.subarray(J*Z/it.data.BYTES_PER_ELEMENT,(J+1)*Z/it.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,it.width,it.height,1,at,Nt,ct)}E.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,at,Nt,it.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,It,it.width,it.height,it.depth,0,at,Nt,it.data);else if(E.isData3DTexture)Bt?(ae&&e.texStorage3D(r.TEXTURE_3D,ht,It,it.width,it.height,it.depth),L&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,at,Nt,it.data)):e.texImage3D(r.TEXTURE_3D,0,It,it.width,it.height,it.depth,0,at,Nt,it.data);else if(E.isFramebufferTexture){if(ae)if(Bt)e.texStorage2D(r.TEXTURE_2D,ht,It,it.width,it.height);else{let Z=it.width,J=it.height;for(let ct=0;ct<ht;ct++)e.texImage2D(r.TEXTURE_2D,ct,It,Z,J,0,at,Nt,null),Z>>=1,J>>=1}}else if(Zt.length>0){if(Bt&&ae){const Z=Pt(Zt[0]);e.texStorage2D(r.TEXTURE_2D,ht,It,Z.width,Z.height)}for(let Z=0,J=Zt.length;Z<J;Z++)yt=Zt[Z],Bt?L&&e.texSubImage2D(r.TEXTURE_2D,Z,0,0,at,Nt,yt):e.texImage2D(r.TEXTURE_2D,Z,It,at,Nt,yt);E.generateMipmaps=!1}else if(Bt){if(ae){const Z=Pt(it);e.texStorage2D(r.TEXTURE_2D,ht,It,Z.width,Z.height)}L&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,at,Nt,it)}else e.texImage2D(r.TEXTURE_2D,0,It,at,Nt,it);m(E)&&p(Q),ft.__version=K.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function tt(A,E,G){if(E.image.length!==6)return;const Q=jt(A,E),j=E.source;e.bindTexture(r.TEXTURE_CUBE_MAP,A.__webglTexture,r.TEXTURE0+G);const K=n.get(j);if(j.version!==K.__version||Q===!0){e.activeTexture(r.TEXTURE0+G);const ft=le.getPrimaries(le.workingColorSpace),lt=E.colorSpace===Ji?null:le.getPrimaries(E.colorSpace),mt=E.colorSpace===Ji||ft===lt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,E.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,E.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const Yt=E.isCompressedTexture||E.image[0].isCompressedTexture,it=E.image[0]&&E.image[0].isDataTexture,at=[];for(let J=0;J<6;J++)!Yt&&!it?at[J]=_(E.image[J],!0,i.maxCubemapSize):at[J]=it?E.image[J].image:E.image[J],at[J]=se(E,at[J]);const Nt=at[0],It=s.convert(E.format,E.colorSpace),yt=s.convert(E.type),Zt=M(E.internalFormat,It,yt,E.colorSpace),Bt=E.isVideoTexture!==!0,ae=K.__version===void 0||Q===!0,L=j.dataReady;let ht=C(E,Nt);Dt(r.TEXTURE_CUBE_MAP,E);let Z;if(Yt){Bt&&ae&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ht,Zt,Nt.width,Nt.height);for(let J=0;J<6;J++){Z=at[J].mipmaps;for(let ct=0;ct<Z.length;ct++){const dt=Z[ct];E.format!==li?It!==null?Bt?L&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct,0,0,dt.width,dt.height,It,dt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct,Zt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Bt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct,0,0,dt.width,dt.height,It,yt,dt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct,Zt,dt.width,dt.height,0,It,yt,dt.data)}}}else{if(Z=E.mipmaps,Bt&&ae){Z.length>0&&ht++;const J=Pt(at[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ht,Zt,J.width,J.height)}for(let J=0;J<6;J++)if(it){Bt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,at[J].width,at[J].height,It,yt,at[J].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Zt,at[J].width,at[J].height,0,It,yt,at[J].data);for(let ct=0;ct<Z.length;ct++){const Ht=Z[ct].image[J].image;Bt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct+1,0,0,Ht.width,Ht.height,It,yt,Ht.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct+1,Zt,Ht.width,Ht.height,0,It,yt,Ht.data)}}else{Bt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,It,yt,at[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,Zt,It,yt,at[J]);for(let ct=0;ct<Z.length;ct++){const dt=Z[ct];Bt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct+1,0,0,It,yt,dt.image[J]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ct+1,Zt,It,yt,dt.image[J])}}}m(E)&&p(r.TEXTURE_CUBE_MAP),K.__version=j.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function ut(A,E,G,Q,j,K){const ft=s.convert(G.format,G.colorSpace),lt=s.convert(G.type),mt=M(G.internalFormat,ft,lt,G.colorSpace),Yt=n.get(E),it=n.get(G);if(it.__renderTarget=E,!Yt.__hasExternalTextures){const at=Math.max(1,E.width>>K),Nt=Math.max(1,E.height>>K);j===r.TEXTURE_3D||j===r.TEXTURE_2D_ARRAY?e.texImage3D(j,K,mt,at,Nt,E.depth,0,ft,lt,null):e.texImage2D(j,K,mt,at,Nt,0,ft,lt,null)}e.bindFramebuffer(r.FRAMEBUFFER,A),z(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Q,j,it.__webglTexture,0,kt(E)):(j===r.TEXTURE_2D||j>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Q,j,it.__webglTexture,K),e.bindFramebuffer(r.FRAMEBUFFER,null)}function nt(A,E,G){if(r.bindRenderbuffer(r.RENDERBUFFER,A),E.depthBuffer){const Q=E.depthTexture,j=Q&&Q.isDepthTexture?Q.type:null,K=v(E.stencilBuffer,j),ft=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,lt=kt(E);z(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,lt,K,E.width,E.height):G?r.renderbufferStorageMultisample(r.RENDERBUFFER,lt,K,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,K,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ft,r.RENDERBUFFER,A)}else{const Q=E.textures;for(let j=0;j<Q.length;j++){const K=Q[j],ft=s.convert(K.format,K.colorSpace),lt=s.convert(K.type),mt=M(K.internalFormat,ft,lt,K.colorSpace),Yt=kt(E);G&&z(E)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Yt,mt,E.width,E.height):z(E)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Yt,mt,E.width,E.height):r.renderbufferStorage(r.RENDERBUFFER,mt,E.width,E.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function xt(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(E.depthTexture);Q.__renderTarget=E,(!Q.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),q(E.depthTexture,0);const j=Q.__webglTexture,K=kt(E);if(E.depthTexture.format===Ds)z(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,j,0);else if(E.depthTexture.format===Gs)z(E)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0,K):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Et(A){const E=n.get(A),G=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){const Q=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),Q){const j=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,Q.removeEventListener("dispose",j)};Q.addEventListener("dispose",j),E.__depthDisposeCallback=j}E.__boundDepthTexture=Q}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");xt(E.__webglFramebuffer,A)}else if(G){E.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer[Q]),E.__webglDepthbuffer[Q]===void 0)E.__webglDepthbuffer[Q]=r.createRenderbuffer(),nt(E.__webglDepthbuffer[Q],A,!1);else{const j=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,K=E.__webglDepthbuffer[Q];r.bindRenderbuffer(r.RENDERBUFFER,K),r.framebufferRenderbuffer(r.FRAMEBUFFER,j,r.RENDERBUFFER,K)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=r.createRenderbuffer(),nt(E.__webglDepthbuffer,A,!1);else{const Q=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=E.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,j)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function zt(A,E,G){const Q=n.get(A);E!==void 0&&ut(Q.__webglFramebuffer,A,A.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),G!==void 0&&Et(A)}function $t(A){const E=A.texture,G=n.get(A),Q=n.get(E);A.addEventListener("dispose",b);const j=A.textures,K=A.isWebGLCubeRenderTarget===!0,ft=j.length>1;if(ft||(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=E.version,o.memory.textures++),K){G.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer[lt]=[];for(let mt=0;mt<E.mipmaps.length;mt++)G.__webglFramebuffer[lt][mt]=r.createFramebuffer()}else G.__webglFramebuffer[lt]=r.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){G.__webglFramebuffer=[];for(let lt=0;lt<E.mipmaps.length;lt++)G.__webglFramebuffer[lt]=r.createFramebuffer()}else G.__webglFramebuffer=r.createFramebuffer();if(ft)for(let lt=0,mt=j.length;lt<mt;lt++){const Yt=n.get(j[lt]);Yt.__webglTexture===void 0&&(Yt.__webglTexture=r.createTexture(),o.memory.textures++)}if(A.samples>0&&z(A)===!1){G.__webglMultisampledFramebuffer=r.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let lt=0;lt<j.length;lt++){const mt=j[lt];G.__webglColorRenderbuffer[lt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,G.__webglColorRenderbuffer[lt]);const Yt=s.convert(mt.format,mt.colorSpace),it=s.convert(mt.type),at=M(mt.internalFormat,Yt,it,mt.colorSpace,A.isXRRenderTarget===!0),Nt=kt(A);r.renderbufferStorageMultisample(r.RENDERBUFFER,Nt,at,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+lt,r.RENDERBUFFER,G.__webglColorRenderbuffer[lt])}r.bindRenderbuffer(r.RENDERBUFFER,null),A.depthBuffer&&(G.__webglDepthRenderbuffer=r.createRenderbuffer(),nt(G.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(K){e.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),Dt(r.TEXTURE_CUBE_MAP,E);for(let lt=0;lt<6;lt++)if(E.mipmaps&&E.mipmaps.length>0)for(let mt=0;mt<E.mipmaps.length;mt++)ut(G.__webglFramebuffer[lt][mt],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,mt);else ut(G.__webglFramebuffer[lt],A,E,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(E)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ft){for(let lt=0,mt=j.length;lt<mt;lt++){const Yt=j[lt],it=n.get(Yt);e.bindTexture(r.TEXTURE_2D,it.__webglTexture),Dt(r.TEXTURE_2D,Yt),ut(G.__webglFramebuffer,A,Yt,r.COLOR_ATTACHMENT0+lt,r.TEXTURE_2D,0),m(Yt)&&p(r.TEXTURE_2D)}e.unbindTexture()}else{let lt=r.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(lt,Q.__webglTexture),Dt(lt,E),E.mipmaps&&E.mipmaps.length>0)for(let mt=0;mt<E.mipmaps.length;mt++)ut(G.__webglFramebuffer[mt],A,E,r.COLOR_ATTACHMENT0,lt,mt);else ut(G.__webglFramebuffer,A,E,r.COLOR_ATTACHMENT0,lt,0);m(E)&&p(lt),e.unbindTexture()}A.depthBuffer&&Et(A)}function Ut(A){const E=A.textures;for(let G=0,Q=E.length;G<Q;G++){const j=E[G];if(m(j)){const K=S(A),ft=n.get(j).__webglTexture;e.bindTexture(K,ft),p(K),e.unbindTexture()}}}const Rt=[],N=[];function ye(A){if(A.samples>0){if(z(A)===!1){const E=A.textures,G=A.width,Q=A.height;let j=r.COLOR_BUFFER_BIT;const K=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ft=n.get(A),lt=E.length>1;if(lt)for(let mt=0;mt<E.length;mt++)e.bindFramebuffer(r.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,ft.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,ft.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ft.__webglFramebuffer);for(let mt=0;mt<E.length;mt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(j|=r.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(j|=r.STENCIL_BUFFER_BIT)),lt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ft.__webglColorRenderbuffer[mt]);const Yt=n.get(E[mt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Yt,0)}r.blitFramebuffer(0,0,G,Q,0,0,G,Q,j,r.NEAREST),l===!0&&(Rt.length=0,N.length=0,Rt.push(r.COLOR_ATTACHMENT0+mt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Rt.push(K),N.push(K),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,N)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Rt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),lt)for(let mt=0;mt<E.length;mt++){e.bindFramebuffer(r.FRAMEBUFFER,ft.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,ft.__webglColorRenderbuffer[mt]);const Yt=n.get(E[mt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,ft.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,Yt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,ft.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const E=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[E])}}}function kt(A){return Math.min(i.maxSamples,A.samples)}function z(A){const E=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Tt(A){const E=o.render.frame;h.get(A)!==E&&(h.set(A,E),A.update())}function se(A,E){const G=A.colorSpace,Q=A.format,j=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||G!==Xs&&G!==Ji&&(le.getTransfer(G)===_e?(Q!==li||j!==zi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),E}function Pt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=U,this.setTexture2D=q,this.setTexture2DArray=X,this.setTexture3D=Y,this.setTextureCube=k,this.rebindTextures=zt,this.setupRenderTarget=$t,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Et,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=z}function SS(r,t){function e(n,i=Ji){let s;const o=le.getTransfer(i);if(n===zi)return r.UNSIGNED_BYTE;if(n===su)return r.UNSIGNED_SHORT_4_4_4_4;if(n===ou)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Wp)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Vp)return r.BYTE;if(n===Gp)return r.SHORT;if(n===Yo)return r.UNSIGNED_SHORT;if(n===ru)return r.INT;if(n===Xr)return r.UNSIGNED_INT;if(n===_i)return r.FLOAT;if(n===Zo)return r.HALF_FLOAT;if(n===Xp)return r.ALPHA;if(n===Yp)return r.RGB;if(n===li)return r.RGBA;if(n===qp)return r.LUMINANCE;if(n===$p)return r.LUMINANCE_ALPHA;if(n===Ds)return r.DEPTH_COMPONENT;if(n===Gs)return r.DEPTH_STENCIL;if(n===au)return r.RED;if(n===lu)return r.RED_INTEGER;if(n===Zp)return r.RG;if(n===cu)return r.RG_INTEGER;if(n===hu)return r.RGBA_INTEGER;if(n===Ya||n===qa||n===$a||n===Za)if(o===_e)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Ya)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===qa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===$a)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Za)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Ya)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===qa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===$a)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Za)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===nh||n===ih||n===rh||n===sh)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===nh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ih)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===sh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===oh||n===ah||n===lh)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===oh||n===ah)return o===_e?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===lh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ch||n===hh||n===uh||n===fh||n===dh||n===ph||n===mh||n===gh||n===_h||n===vh||n===xh||n===yh||n===Mh||n===Sh)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ch)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===hh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===uh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===dh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ph)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===gh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===_h)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===yh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Sh)return o===_e?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ka||n===Eh||n===bh)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Ka)return o===_e?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Eh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kp||n===Th||n===wh||n===Ah)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Ka)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Th)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ah)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class ES extends zn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ui extends Ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const bS={type:"move"};class hc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ui,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ui,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ui,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bS)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ui;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const TS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class AS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new hn,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new pr({vertexShader:TS,fragmentShader:wS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Ve(new yl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class CS extends Ys{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null;const _=new AS,m=e.getContextAttributes();let p=null,S=null;const M=[],v=[],C=new Ot;let w=null;const b=new zn;b.viewport=new ve;const R=new zn;R.viewport=new ve;const y=[b,R],x=new ES;let P=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let tt=M[$];return tt===void 0&&(tt=new hc,M[$]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function($){let tt=M[$];return tt===void 0&&(tt=new hc,M[$]=tt),tt.getGripSpace()},this.getHand=function($){let tt=M[$];return tt===void 0&&(tt=new hc,M[$]=tt),tt.getHandSpace()};function B($){const tt=v.indexOf($.inputSource);if(tt===-1)return;const ut=M[tt];ut!==void 0&&(ut.update($.inputSource,$.frame,c||o),ut.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){i.removeEventListener("select",B),i.removeEventListener("selectstart",B),i.removeEventListener("selectend",B),i.removeEventListener("squeeze",B),i.removeEventListener("squeezestart",B),i.removeEventListener("squeezeend",B),i.removeEventListener("end",V),i.removeEventListener("inputsourceschange",q);for(let $=0;$<M.length;$++){const tt=v[$];tt!==null&&(v[$]=null,M[$].disconnect(tt))}P=null,U=null,_.reset(),t.setRenderTarget(p),d=null,f=null,u=null,i=null,S=null,jt.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",B),i.addEventListener("selectstart",B),i.addEventListener("selectend",B),i.addEventListener("squeeze",B),i.addEventListener("squeezestart",B),i.addEventListener("squeezeend",B),i.addEventListener("end",V),i.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(C),i.renderState.layers===void 0){const tt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),S=new Yr(d.framebufferWidth,d.framebufferHeight,{format:li,type:zi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let tt=null,ut=null,nt=null;m.depth&&(nt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=m.stencil?Gs:Ds,ut=m.stencil?Vs:Xr);const xt={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:s};u=new XRWebGLBinding(i,e),f=u.createProjectionLayer(xt),i.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),S=new Yr(f.textureWidth,f.textureHeight,{format:li,type:zi,depthTexture:new fm(f.textureWidth,f.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),jt.setContext(i),jt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q($){for(let tt=0;tt<$.removed.length;tt++){const ut=$.removed[tt],nt=v.indexOf(ut);nt>=0&&(v[nt]=null,M[nt].disconnect(ut))}for(let tt=0;tt<$.added.length;tt++){const ut=$.added[tt];let nt=v.indexOf(ut);if(nt===-1){for(let Et=0;Et<M.length;Et++)if(Et>=v.length){v.push(ut),nt=Et;break}else if(v[Et]===null){v[Et]=ut,nt=Et;break}if(nt===-1)break}const xt=M[nt];xt&&xt.connect(ut)}}const X=new I,Y=new I;function k($,tt,ut){X.setFromMatrixPosition(tt.matrixWorld),Y.setFromMatrixPosition(ut.matrixWorld);const nt=X.distanceTo(Y),xt=tt.projectionMatrix.elements,Et=ut.projectionMatrix.elements,zt=xt[14]/(xt[10]-1),$t=xt[14]/(xt[10]+1),Ut=(xt[9]+1)/xt[5],Rt=(xt[9]-1)/xt[5],N=(xt[8]-1)/xt[0],ye=(Et[8]+1)/Et[0],kt=zt*N,z=zt*ye,Tt=nt/(-N+ye),se=Tt*-N;if(tt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(se),$.translateZ(Tt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),xt[10]===-1)$.projectionMatrix.copy(tt.projectionMatrix),$.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const Pt=zt+Tt,A=$t+Tt,E=kt-se,G=z+(nt-se),Q=Ut*$t/A*Pt,j=Rt*$t/A*Pt;$.projectionMatrix.makePerspective(E,G,Q,j,Pt,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function et($,tt){tt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(tt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let tt=$.near,ut=$.far;_.texture!==null&&(_.depthNear>0&&(tt=_.depthNear),_.depthFar>0&&(ut=_.depthFar)),x.near=R.near=b.near=tt,x.far=R.far=b.far=ut,(P!==x.near||U!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),P=x.near,U=x.far),b.layers.mask=$.layers.mask|2,R.layers.mask=$.layers.mask|4,x.layers.mask=b.layers.mask|R.layers.mask;const nt=$.parent,xt=x.cameras;et(x,nt);for(let Et=0;Et<xt.length;Et++)et(xt[Et],nt);xt.length===2?k(x,b,R):x.projectionMatrix.copy(b.projectionMatrix),D($,x,nt)};function D($,tt,ut){ut===null?$.matrix.copy(tt.matrixWorld):($.matrix.copy(ut.matrixWorld),$.matrix.invert(),$.matrix.multiply(tt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(tt.projectionMatrix),$.projectionMatrixInverse.copy(tt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=qo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let st=null;function Dt($,tt){if(h=tt.getViewerPose(c||o),g=tt,h!==null){const ut=h.views;d!==null&&(t.setRenderTargetFramebuffer(S,d.framebuffer),t.setRenderTarget(S));let nt=!1;ut.length!==x.cameras.length&&(x.cameras.length=0,nt=!0);for(let Et=0;Et<ut.length;Et++){const zt=ut[Et];let $t=null;if(d!==null)$t=d.getViewport(zt);else{const Rt=u.getViewSubImage(f,zt);$t=Rt.viewport,Et===0&&(t.setRenderTargetTextures(S,Rt.colorTexture,f.ignoreDepthValues?void 0:Rt.depthStencilTexture),t.setRenderTarget(S))}let Ut=y[Et];Ut===void 0&&(Ut=new zn,Ut.layers.enable(Et),Ut.viewport=new ve,y[Et]=Ut),Ut.matrix.fromArray(zt.transform.matrix),Ut.matrix.decompose(Ut.position,Ut.quaternion,Ut.scale),Ut.projectionMatrix.fromArray(zt.projectionMatrix),Ut.projectionMatrixInverse.copy(Ut.projectionMatrix).invert(),Ut.viewport.set($t.x,$t.y,$t.width,$t.height),Et===0&&(x.matrix.copy(Ut.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),nt===!0&&x.cameras.push(Ut)}const xt=i.enabledFeatures;if(xt&&xt.includes("depth-sensing")){const Et=u.getDepthInformation(ut[0]);Et&&Et.isValid&&Et.texture&&_.init(t,Et,i.renderState)}}for(let ut=0;ut<M.length;ut++){const nt=v[ut],xt=M[ut];nt!==null&&xt!==void 0&&xt.update(nt,tt,c||o)}st&&st($,tt),tt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:tt}),g=null}const jt=new hm;jt.setAnimationLoop(Dt),this.setAnimationLoop=function($){st=$},this.dispose=function(){}}}const Er=new yi,RS=new xe;function PS(r,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,am(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,S,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===wn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===wn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),M=S.envMap,v=S.envMapRotation;M&&(m.envMap.value=M,Er.copy(v),Er.x*=-1,Er.y*=-1,Er.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Er.y*=-1,Er.z*=-1),m.envMapRotation.value.setFromMatrix4(RS.makeRotationFromEuler(Er)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=M*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===wn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function DS(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const v=M.program;n.uniformBlockBinding(S,v)}function c(S,M){let v=i[S.id];v===void 0&&(g(S),v=h(S),i[S.id]=v,S.addEventListener("dispose",m));const C=M.program;n.updateUBOMapping(S,C);const w=t.render.frame;s[S.id]!==w&&(f(S),s[S.id]=w)}function h(S){const M=u();S.__bindingPointIndex=M;const v=r.createBuffer(),C=S.__size,w=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,C,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,M,v),v}function u(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const M=i[S.id],v=S.uniforms,C=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,M);for(let w=0,b=v.length;w<b;w++){const R=Array.isArray(v[w])?v[w]:[v[w]];for(let y=0,x=R.length;y<x;y++){const P=R[y];if(d(P,w,y,C)===!0){const U=P.__offset,B=Array.isArray(P.value)?P.value:[P.value];let V=0;for(let q=0;q<B.length;q++){const X=B[q],Y=_(X);typeof X=="number"||typeof X=="boolean"?(P.__data[0]=X,r.bufferSubData(r.UNIFORM_BUFFER,U+V,P.__data)):X.isMatrix3?(P.__data[0]=X.elements[0],P.__data[1]=X.elements[1],P.__data[2]=X.elements[2],P.__data[3]=0,P.__data[4]=X.elements[3],P.__data[5]=X.elements[4],P.__data[6]=X.elements[5],P.__data[7]=0,P.__data[8]=X.elements[6],P.__data[9]=X.elements[7],P.__data[10]=X.elements[8],P.__data[11]=0):(X.toArray(P.__data,V),V+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(S,M,v,C){const w=S.value,b=M+"_"+v;if(C[b]===void 0)return typeof w=="number"||typeof w=="boolean"?C[b]=w:C[b]=w.clone(),!0;{const R=C[b];if(typeof w=="number"||typeof w=="boolean"){if(R!==w)return C[b]=w,!0}else if(R.equals(w)===!1)return R.copy(w),!0}return!1}function g(S){const M=S.uniforms;let v=0;const C=16;for(let b=0,R=M.length;b<R;b++){const y=Array.isArray(M[b])?M[b]:[M[b]];for(let x=0,P=y.length;x<P;x++){const U=y[x],B=Array.isArray(U.value)?U.value:[U.value];for(let V=0,q=B.length;V<q;V++){const X=B[V],Y=_(X),k=v%C,et=k%Y.boundary,D=k+et;v+=et,D!==0&&C-D<Y.storage&&(v+=C-D),U.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=v,v+=Y.storage}}}const w=v%C;return w>0&&(v+=C-w),S.__size=v,S.__cache={},this}function _(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function m(S){const M=S.target;M.removeEventListener("dispose",m);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[M.id]),delete i[M.id],delete s[M.id]}function p(){for(const S in i)r.deleteBuffer(i[S]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class LS{constructor(t={}){const{canvas:e=y0(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const S=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fn,this.toneMapping=lr,this.toneMappingExposure=1;const v=this;let C=!1,w=0,b=0,R=null,y=-1,x=null;const P=new ve,U=new ve;let B=null;const V=new Ft(0);let q=0,X=e.width,Y=e.height,k=1,et=null,D=null;const st=new ve(0,0,X,Y),Dt=new ve(0,0,X,Y);let jt=!1;const $=new du;let tt=!1,ut=!1;const nt=new xe,xt=new xe,Et=new I,zt=new ve,$t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ut=!1;function Rt(){return R===null?k:1}let N=n;function ye(T,O){return e.getContext(T,O)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${iu}`),e.addEventListener("webglcontextlost",J,!1),e.addEventListener("webglcontextrestored",ct,!1),e.addEventListener("webglcontextcreationerror",dt,!1),N===null){const O="webgl2";if(N=ye(O,T),N===null)throw ye(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let kt,z,Tt,se,Pt,A,E,G,Q,j,K,ft,lt,mt,Yt,it,at,Nt,It,yt,Zt,Bt,ae,L;function ht(){kt=new Fy(N),kt.init(),Bt=new SS(N,kt),z=new Dy(N,kt,t,Bt),Tt=new xS(N,kt),z.reverseDepthBuffer&&f&&Tt.buffers.depth.setReversed(!0),se=new ky(N),Pt=new rS,A=new MS(N,kt,Tt,Pt,z,Bt,se),E=new Iy(v),G=new Oy(v),Q=new q0(N),ae=new Ry(N,Q),j=new By(N,Q,se,ae),K=new Vy(N,j,Q,se),It=new Hy(N,z,A),it=new Ly(Pt),ft=new iS(v,E,G,kt,z,ae,it),lt=new PS(v,Pt),mt=new oS,Yt=new fS(kt),Nt=new Cy(v,E,G,Tt,K,d,l),at=new _S(v,K,z),L=new DS(N,se,z,Tt),yt=new Py(N,kt,se),Zt=new zy(N,kt,se),se.programs=ft.programs,v.capabilities=z,v.extensions=kt,v.properties=Pt,v.renderLists=mt,v.shadowMap=at,v.state=Tt,v.info=se}ht();const Z=new CS(v,N);this.xr=Z,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const T=kt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=kt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(T){T!==void 0&&(k=T,this.setSize(X,Y,!1))},this.getSize=function(T){return T.set(X,Y)},this.setSize=function(T,O,H=!0){if(Z.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=T,Y=O,e.width=Math.floor(T*k),e.height=Math.floor(O*k),H===!0&&(e.style.width=T+"px",e.style.height=O+"px"),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(X*k,Y*k).floor()},this.setDrawingBufferSize=function(T,O,H){X=T,Y=O,k=H,e.width=Math.floor(T*H),e.height=Math.floor(O*H),this.setViewport(0,0,T,O)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(st)},this.setViewport=function(T,O,H,W){T.isVector4?st.set(T.x,T.y,T.z,T.w):st.set(T,O,H,W),Tt.viewport(P.copy(st).multiplyScalar(k).round())},this.getScissor=function(T){return T.copy(Dt)},this.setScissor=function(T,O,H,W){T.isVector4?Dt.set(T.x,T.y,T.z,T.w):Dt.set(T,O,H,W),Tt.scissor(U.copy(Dt).multiplyScalar(k).round())},this.getScissorTest=function(){return jt},this.setScissorTest=function(T){Tt.setScissorTest(jt=T)},this.setOpaqueSort=function(T){et=T},this.setTransparentSort=function(T){D=T},this.getClearColor=function(T){return T.copy(Nt.getClearColor())},this.setClearColor=function(){Nt.setClearColor.apply(Nt,arguments)},this.getClearAlpha=function(){return Nt.getClearAlpha()},this.setClearAlpha=function(){Nt.setClearAlpha.apply(Nt,arguments)},this.clear=function(T=!0,O=!0,H=!0){let W=0;if(T){let F=!1;if(R!==null){const rt=R.texture.format;F=rt===hu||rt===cu||rt===lu}if(F){const rt=R.texture.type,ot=rt===zi||rt===Xr||rt===Yo||rt===Vs||rt===su||rt===ou,pt=Nt.getClearColor(),Mt=Nt.getClearAlpha(),Vt=pt.r,Xt=pt.g,bt=pt.b;ot?(g[0]=Vt,g[1]=Xt,g[2]=bt,g[3]=Mt,N.clearBufferuiv(N.COLOR,0,g)):(_[0]=Vt,_[1]=Xt,_[2]=bt,_[3]=Mt,N.clearBufferiv(N.COLOR,0,_))}else W|=N.COLOR_BUFFER_BIT}O&&(W|=N.DEPTH_BUFFER_BIT),H&&(W|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",J,!1),e.removeEventListener("webglcontextrestored",ct,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),mt.dispose(),Yt.dispose(),Pt.dispose(),E.dispose(),G.dispose(),K.dispose(),ae.dispose(),L.dispose(),ft.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",gt),Z.removeEventListener("sessionend",Wt),At.stop()};function J(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=se.autoReset,O=at.enabled,H=at.autoUpdate,W=at.needsUpdate,F=at.type;ht(),se.autoReset=T,at.enabled=O,at.autoUpdate=H,at.needsUpdate=W,at.type=F}function dt(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ht(T){const O=T.target;O.removeEventListener("dispose",Ht),ce(O)}function ce(T){Ie(T),Pt.remove(T)}function Ie(T){const O=Pt.get(T).programs;O!==void 0&&(O.forEach(function(H){ft.releaseProgram(H)}),T.isShaderMaterial&&ft.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,H,W,F,rt){O===null&&(O=$t);const ot=F.isMesh&&F.matrixWorld.determinant()<0,pt=Pn(T,O,H,W,F);Tt.setMaterial(W,ot);let Mt=H.index,Vt=1;if(W.wireframe===!0){if(Mt=j.getWireframeAttribute(H),Mt===void 0)return;Vt=2}const Xt=H.drawRange,bt=H.attributes.position;let qt=Xt.start*Vt,he=(Xt.start+Xt.count)*Vt;rt!==null&&(qt=Math.max(qt,rt.start*Vt),he=Math.min(he,(rt.start+rt.count)*Vt)),Mt!==null?(qt=Math.max(qt,0),he=Math.min(he,Mt.count)):bt!=null&&(qt=Math.max(qt,0),he=Math.min(he,bt.count));const fe=he-qt;if(fe<0||fe===1/0)return;ae.setup(F,W,pt,H,Mt);let Re,de=yt;if(Mt!==null&&(Re=Q.get(Mt),de=Zt,de.setIndex(Re)),F.isMesh)W.wireframe===!0?(Tt.setLineWidth(W.wireframeLinewidth*Rt()),de.setMode(N.LINES)):de.setMode(N.TRIANGLES);else if(F.isLine){let Lt=W.linewidth;Lt===void 0&&(Lt=1),Tt.setLineWidth(Lt*Rt()),F.isLineSegments?de.setMode(N.LINES):F.isLineLoop?de.setMode(N.LINE_LOOP):de.setMode(N.LINE_STRIP)}else F.isPoints?de.setMode(N.POINTS):F.isSprite&&de.setMode(N.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)de.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(kt.get("WEBGL_multi_draw"))de.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Lt=F._multiDrawStarts,Mi=F._multiDrawCounts,pe=F._multiDrawCount,ni=Mt?Q.get(Mt).bytesPerElement:1,Kr=Pt.get(W).currentProgram.getUniforms();for(let Dn=0;Dn<pe;Dn++)Kr.setValue(N,"_gl_DrawID",Dn),de.render(Lt[Dn]/ni,Mi[Dn])}else if(F.isInstancedMesh)de.renderInstances(qt,fe,F.count);else if(H.isInstancedBufferGeometry){const Lt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Mi=Math.min(H.instanceCount,Lt);de.renderInstances(qt,fe,Mi)}else de.render(qt,fe)};function vt(T,O,H){T.transparent===!0&&T.side===Di&&T.forceSinglePass===!1?(T.side=wn,T.needsUpdate=!0,Me(T,O,H),T.side=dr,T.needsUpdate=!0,Me(T,O,H),T.side=Di):Me(T,O,H)}this.compile=function(T,O,H=null){H===null&&(H=T),p=Yt.get(H),p.init(O),M.push(p),H.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),T!==H&&T.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const W=new Set;return T.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const rt=F.material;if(rt)if(Array.isArray(rt))for(let ot=0;ot<rt.length;ot++){const pt=rt[ot];vt(pt,H,F),W.add(pt)}else vt(rt,H,F),W.add(rt)}),M.pop(),p=null,W},this.compileAsync=function(T,O,H=null){const W=this.compile(T,O,H);return new Promise(F=>{function rt(){if(W.forEach(function(ot){Pt.get(ot).currentProgram.isReady()&&W.delete(ot)}),W.size===0){F(T);return}setTimeout(rt,10)}kt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let wt=null;function Kt(T){wt&&wt(T)}function gt(){At.stop()}function Wt(){At.start()}const At=new hm;At.setAnimationLoop(Kt),typeof self<"u"&&At.setContext(self),this.setAnimationLoop=function(T){wt=T,Z.setAnimationLoop(T),T===null?At.stop():At.start()},Z.addEventListener("sessionstart",gt),Z.addEventListener("sessionend",Wt),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(O),O=Z.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,O,R),p=Yt.get(T,M.length),p.init(O),M.push(p),xt.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),$.setFromProjectionMatrix(xt),ut=this.localClippingEnabled,tt=it.init(this.clippingPlanes,ut),m=mt.get(T,S.length),m.init(),S.push(m),Z.enabled===!0&&Z.isPresenting===!0){const rt=v.xr.getDepthSensingMesh();rt!==null&&Gt(rt,O,-1/0,v.sortObjects)}Gt(T,O,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(et,D),Ut=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,Ut&&Nt.addToRenderList(m,T),this.info.render.frame++,tt===!0&&it.beginShadows();const H=p.state.shadowsArray;at.render(H,T,O),tt===!0&&it.endShadows(),this.info.autoReset===!0&&this.info.reset();const W=m.opaque,F=m.transmissive;if(p.setupLights(),O.isArrayCamera){const rt=O.cameras;if(F.length>0)for(let ot=0,pt=rt.length;ot<pt;ot++){const Mt=rt[ot];ee(W,F,T,Mt)}Ut&&Nt.render(T);for(let ot=0,pt=rt.length;ot<pt;ot++){const Mt=rt[ot];Oe(m,T,Mt,Mt.viewport)}}else F.length>0&&ee(W,F,T,O),Ut&&Nt.render(T),Oe(m,T,O);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(v,T,O),ae.resetDefaultState(),y=-1,x=null,M.pop(),M.length>0?(p=M[M.length-1],tt===!0&&it.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Gt(T,O,H,W){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)H=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||$.intersectsSprite(T)){W&&zt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(xt);const ot=K.update(T),pt=T.material;pt.visible&&m.push(T,ot,pt,H,zt.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||$.intersectsObject(T))){const ot=K.update(T),pt=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),zt.copy(T.boundingSphere.center)):(ot.boundingSphere===null&&ot.computeBoundingSphere(),zt.copy(ot.boundingSphere.center)),zt.applyMatrix4(T.matrixWorld).applyMatrix4(xt)),Array.isArray(pt)){const Mt=ot.groups;for(let Vt=0,Xt=Mt.length;Vt<Xt;Vt++){const bt=Mt[Vt],qt=pt[bt.materialIndex];qt&&qt.visible&&m.push(T,ot,qt,H,zt.z,bt)}}else pt.visible&&m.push(T,ot,pt,H,zt.z,null)}}const rt=T.children;for(let ot=0,pt=rt.length;ot<pt;ot++)Gt(rt[ot],O,H,W)}function Oe(T,O,H,W){const F=T.opaque,rt=T.transmissive,ot=T.transparent;p.setupLightsView(H),tt===!0&&it.setGlobalState(v.clippingPlanes,H),W&&Tt.viewport(P.copy(W)),F.length>0&&Te(F,O,H),rt.length>0&&Te(rt,O,H),ot.length>0&&Te(ot,O,H),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function ee(T,O,H,W){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[W.id]===void 0&&(p.state.transmissionRenderTarget[W.id]=new Yr(1,1,{generateMipmaps:!0,type:kt.has("EXT_color_buffer_half_float")||kt.has("EXT_color_buffer_float")?Zo:zi,minFilter:Ur,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:le.workingColorSpace}));const rt=p.state.transmissionRenderTarget[W.id],ot=W.viewport||P;rt.setSize(ot.z,ot.w);const pt=v.getRenderTarget();v.setRenderTarget(rt),v.getClearColor(V),q=v.getClearAlpha(),q<1&&v.setClearColor(16777215,.5),v.clear(),Ut&&Nt.render(H);const Mt=v.toneMapping;v.toneMapping=lr;const Vt=W.viewport;if(W.viewport!==void 0&&(W.viewport=void 0),p.setupLightsView(W),tt===!0&&it.setGlobalState(v.clippingPlanes,W),Te(T,H,W),A.updateMultisampleRenderTarget(rt),A.updateRenderTargetMipmap(rt),kt.has("WEBGL_multisampled_render_to_texture")===!1){let Xt=!1;for(let bt=0,qt=O.length;bt<qt;bt++){const he=O[bt],fe=he.object,Re=he.geometry,de=he.material,Lt=he.group;if(de.side===Di&&fe.layers.test(W.layers)){const Mi=de.side;de.side=wn,de.needsUpdate=!0,Ge(fe,H,W,Re,de,Lt),de.side=Mi,de.needsUpdate=!0,Xt=!0}}Xt===!0&&(A.updateMultisampleRenderTarget(rt),A.updateRenderTargetMipmap(rt))}v.setRenderTarget(pt),v.setClearColor(V,q),Vt!==void 0&&(W.viewport=Vt),v.toneMapping=Mt}function Te(T,O,H){const W=O.isScene===!0?O.overrideMaterial:null;for(let F=0,rt=T.length;F<rt;F++){const ot=T[F],pt=ot.object,Mt=ot.geometry,Vt=W===null?ot.material:W,Xt=ot.group;pt.layers.test(H.layers)&&Ge(pt,O,H,Mt,Vt,Xt)}}function Ge(T,O,H,W,F,rt){T.onBeforeRender(v,O,H,W,F,rt),T.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),F.onBeforeRender(v,O,H,W,T,rt),F.transparent===!0&&F.side===Di&&F.forceSinglePass===!1?(F.side=wn,F.needsUpdate=!0,v.renderBufferDirect(H,O,W,F,T,rt),F.side=dr,F.needsUpdate=!0,v.renderBufferDirect(H,O,W,F,T,rt),F.side=Di):v.renderBufferDirect(H,O,W,F,T,rt),T.onAfterRender(v,O,H,W,F,rt)}function Me(T,O,H){O.isScene!==!0&&(O=$t);const W=Pt.get(T),F=p.state.lights,rt=p.state.shadowsArray,ot=F.state.version,pt=ft.getParameters(T,F.state,rt,O,H),Mt=ft.getProgramCacheKey(pt);let Vt=W.programs;W.environment=T.isMeshStandardMaterial?O.environment:null,W.fog=O.fog,W.envMap=(T.isMeshStandardMaterial?G:E).get(T.envMap||W.environment),W.envMapRotation=W.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Vt===void 0&&(T.addEventListener("dispose",Ht),Vt=new Map,W.programs=Vt);let Xt=Vt.get(Mt);if(Xt!==void 0){if(W.currentProgram===Xt&&W.lightsStateVersion===ot)return ue(T,pt),Xt}else pt.uniforms=ft.getUniforms(T),T.onBeforeCompile(pt,v),Xt=ft.acquireProgram(pt,Mt),Vt.set(Mt,Xt),W.uniforms=pt.uniforms;const bt=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(bt.clippingPlanes=it.uniform),ue(T,pt),W.needsLights=un(T),W.lightsStateVersion=ot,W.needsLights&&(bt.ambientLightColor.value=F.state.ambient,bt.lightProbe.value=F.state.probe,bt.directionalLights.value=F.state.directional,bt.directionalLightShadows.value=F.state.directionalShadow,bt.spotLights.value=F.state.spot,bt.spotLightShadows.value=F.state.spotShadow,bt.rectAreaLights.value=F.state.rectArea,bt.ltc_1.value=F.state.rectAreaLTC1,bt.ltc_2.value=F.state.rectAreaLTC2,bt.pointLights.value=F.state.point,bt.pointLightShadows.value=F.state.pointShadow,bt.hemisphereLights.value=F.state.hemi,bt.directionalShadowMap.value=F.state.directionalShadowMap,bt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,bt.spotShadowMap.value=F.state.spotShadowMap,bt.spotLightMatrix.value=F.state.spotLightMatrix,bt.spotLightMap.value=F.state.spotLightMap,bt.pointShadowMap.value=F.state.pointShadowMap,bt.pointShadowMatrix.value=F.state.pointShadowMatrix),W.currentProgram=Xt,W.uniformsList=null,Xt}function Se(T){if(T.uniformsList===null){const O=T.currentProgram.getUniforms();T.uniformsList=Ja.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function ue(T,O){const H=Pt.get(T);H.outputColorSpace=O.outputColorSpace,H.batching=O.batching,H.batchingColor=O.batchingColor,H.instancing=O.instancing,H.instancingColor=O.instancingColor,H.instancingMorph=O.instancingMorph,H.skinning=O.skinning,H.morphTargets=O.morphTargets,H.morphNormals=O.morphNormals,H.morphColors=O.morphColors,H.morphTargetsCount=O.morphTargetsCount,H.numClippingPlanes=O.numClippingPlanes,H.numIntersection=O.numClipIntersection,H.vertexAlphas=O.vertexAlphas,H.vertexTangents=O.vertexTangents,H.toneMapping=O.toneMapping}function Pn(T,O,H,W,F){O.isScene!==!0&&(O=$t),A.resetTextureUnits();const rt=O.fog,ot=W.isMeshStandardMaterial?O.environment:null,pt=R===null?v.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Xs,Mt=(W.isMeshStandardMaterial?G:E).get(W.envMap||ot),Vt=W.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Xt=!!H.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),bt=!!H.morphAttributes.position,qt=!!H.morphAttributes.normal,he=!!H.morphAttributes.color;let fe=lr;W.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(fe=v.toneMapping);const Re=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,de=Re!==void 0?Re.length:0,Lt=Pt.get(W),Mi=p.state.lights;if(tt===!0&&(ut===!0||T!==x)){const $n=T===x&&W.id===y;it.setState(W,T,$n)}let pe=!1;W.version===Lt.__version?(Lt.needsLights&&Lt.lightsStateVersion!==Mi.state.version||Lt.outputColorSpace!==pt||F.isBatchedMesh&&Lt.batching===!1||!F.isBatchedMesh&&Lt.batching===!0||F.isBatchedMesh&&Lt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Lt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Lt.instancing===!1||!F.isInstancedMesh&&Lt.instancing===!0||F.isSkinnedMesh&&Lt.skinning===!1||!F.isSkinnedMesh&&Lt.skinning===!0||F.isInstancedMesh&&Lt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Lt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Lt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Lt.instancingMorph===!1&&F.morphTexture!==null||Lt.envMap!==Mt||W.fog===!0&&Lt.fog!==rt||Lt.numClippingPlanes!==void 0&&(Lt.numClippingPlanes!==it.numPlanes||Lt.numIntersection!==it.numIntersection)||Lt.vertexAlphas!==Vt||Lt.vertexTangents!==Xt||Lt.morphTargets!==bt||Lt.morphNormals!==qt||Lt.morphColors!==he||Lt.toneMapping!==fe||Lt.morphTargetsCount!==de)&&(pe=!0):(pe=!0,Lt.__version=W.version);let ni=Lt.currentProgram;pe===!0&&(ni=Me(W,O,F));let Kr=!1,Dn=!1,Ks=!1;const Ae=ni.getUniforms(),ci=Lt.uniforms;if(Tt.useProgram(ni.program)&&(Kr=!0,Dn=!0,Ks=!0),W.id!==y&&(y=W.id,Dn=!0),Kr||x!==T){Tt.buffers.depth.getReversed()?(nt.copy(T.projectionMatrix),S0(nt),E0(nt),Ae.setValue(N,"projectionMatrix",nt)):Ae.setValue(N,"projectionMatrix",T.projectionMatrix),Ae.setValue(N,"viewMatrix",T.matrixWorldInverse);const Hi=Ae.map.cameraPosition;Hi!==void 0&&Hi.setValue(N,Et.setFromMatrixPosition(T.matrixWorld)),z.logarithmicDepthBuffer&&Ae.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&Ae.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),x!==T&&(x=T,Dn=!0,Ks=!0)}if(F.isSkinnedMesh){Ae.setOptional(N,F,"bindMatrix"),Ae.setOptional(N,F,"bindMatrixInverse");const $n=F.skeleton;$n&&($n.boneTexture===null&&$n.computeBoneTexture(),Ae.setValue(N,"boneTexture",$n.boneTexture,A))}F.isBatchedMesh&&(Ae.setOptional(N,F,"batchingTexture"),Ae.setValue(N,"batchingTexture",F._matricesTexture,A),Ae.setOptional(N,F,"batchingIdTexture"),Ae.setValue(N,"batchingIdTexture",F._indirectTexture,A),Ae.setOptional(N,F,"batchingColorTexture"),F._colorsTexture!==null&&Ae.setValue(N,"batchingColorTexture",F._colorsTexture,A));const Js=H.morphAttributes;if((Js.position!==void 0||Js.normal!==void 0||Js.color!==void 0)&&It.update(F,H,ni),(Dn||Lt.receiveShadow!==F.receiveShadow)&&(Lt.receiveShadow=F.receiveShadow,Ae.setValue(N,"receiveShadow",F.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(ci.envMap.value=Mt,ci.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),W.isMeshStandardMaterial&&W.envMap===null&&O.environment!==null&&(ci.envMapIntensity.value=O.environmentIntensity),Dn&&(Ae.setValue(N,"toneMappingExposure",v.toneMappingExposure),Lt.needsLights&&we(ci,Ks),rt&&W.fog===!0&&lt.refreshFogUniforms(ci,rt),lt.refreshMaterialUniforms(ci,W,k,Y,p.state.transmissionRenderTarget[T.id]),Ja.upload(N,Se(Lt),ci,A)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Ja.upload(N,Se(Lt),ci,A),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&Ae.setValue(N,"center",F.center),Ae.setValue(N,"modelViewMatrix",F.modelViewMatrix),Ae.setValue(N,"normalMatrix",F.normalMatrix),Ae.setValue(N,"modelMatrix",F.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const $n=W.uniformsGroups;for(let Hi=0,Vi=$n.length;Hi<Vi;Hi++){const yu=$n[Hi];L.update(yu,ni),L.bind(yu,ni)}}return ni}function we(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function un(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,O,H){Pt.get(T.texture).__webglTexture=O,Pt.get(T.depthTexture).__webglTexture=H;const W=Pt.get(T);W.__hasExternalTextures=!0,W.__autoAllocateDepthBuffer=H===void 0,W.__autoAllocateDepthBuffer||kt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,O){const H=Pt.get(T);H.__webglFramebuffer=O,H.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,H=0){R=T,w=O,b=H;let W=!0,F=null,rt=!1,ot=!1;if(T){const Mt=Pt.get(T);if(Mt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(N.FRAMEBUFFER,null),W=!1;else if(Mt.__webglFramebuffer===void 0)A.setupRenderTarget(T);else if(Mt.__hasExternalTextures)A.rebindTextures(T,Pt.get(T.texture).__webglTexture,Pt.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const bt=T.depthTexture;if(Mt.__boundDepthTexture!==bt){if(bt!==null&&Pt.has(bt)&&(T.width!==bt.image.width||T.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(T)}}const Vt=T.texture;(Vt.isData3DTexture||Vt.isDataArrayTexture||Vt.isCompressedArrayTexture)&&(ot=!0);const Xt=Pt.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Xt[O])?F=Xt[O][H]:F=Xt[O],rt=!0):T.samples>0&&A.useMultisampledRTT(T)===!1?F=Pt.get(T).__webglMultisampledFramebuffer:Array.isArray(Xt)?F=Xt[H]:F=Xt,P.copy(T.viewport),U.copy(T.scissor),B=T.scissorTest}else P.copy(st).multiplyScalar(k).floor(),U.copy(Dt).multiplyScalar(k).floor(),B=jt;if(Tt.bindFramebuffer(N.FRAMEBUFFER,F)&&W&&Tt.drawBuffers(T,F),Tt.viewport(P),Tt.scissor(U),Tt.setScissorTest(B),rt){const Mt=Pt.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+O,Mt.__webglTexture,H)}else if(ot){const Mt=Pt.get(T.texture),Vt=O||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Mt.__webglTexture,H||0,Vt)}y=-1},this.readRenderTargetPixels=function(T,O,H,W,F,rt,ot){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=Pt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ot!==void 0&&(pt=pt[ot]),pt){Tt.bindFramebuffer(N.FRAMEBUFFER,pt);try{const Mt=T.texture,Vt=Mt.format,Xt=Mt.type;if(!z.textureFormatReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!z.textureTypeReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-W&&H>=0&&H<=T.height-F&&N.readPixels(O,H,W,F,Bt.convert(Vt),Bt.convert(Xt),rt)}finally{const Mt=R!==null?Pt.get(R).__webglFramebuffer:null;Tt.bindFramebuffer(N.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(T,O,H,W,F,rt,ot){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=Pt.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ot!==void 0&&(pt=pt[ot]),pt){const Mt=T.texture,Vt=Mt.format,Xt=Mt.type;if(!z.textureFormatReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!z.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=T.width-W&&H>=0&&H<=T.height-F){Tt.bindFramebuffer(N.FRAMEBUFFER,pt);const bt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,bt),N.bufferData(N.PIXEL_PACK_BUFFER,rt.byteLength,N.STREAM_READ),N.readPixels(O,H,W,F,Bt.convert(Vt),Bt.convert(Xt),0);const qt=R!==null?Pt.get(R).__webglFramebuffer:null;Tt.bindFramebuffer(N.FRAMEBUFFER,qt);const he=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await M0(N,he,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,bt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,rt),N.deleteBuffer(bt),N.deleteSync(he),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,O=null,H=0){T.isTexture!==!0&&(_o("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,T=arguments[1]);const W=Math.pow(2,-H),F=Math.floor(T.image.width*W),rt=Math.floor(T.image.height*W),ot=O!==null?O.x:0,pt=O!==null?O.y:0;A.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,H,0,0,ot,pt,F,rt),Tt.unbindTexture()},this.copyTextureToTexture=function(T,O,H=null,W=null,F=0){T.isTexture!==!0&&(_o("WebGLRenderer: copyTextureToTexture function signature has changed."),W=arguments[0]||null,T=arguments[1],O=arguments[2],F=arguments[3]||0,H=null);let rt,ot,pt,Mt,Vt,Xt,bt,qt,he;const fe=T.isCompressedTexture?T.mipmaps[F]:T.image;H!==null?(rt=H.max.x-H.min.x,ot=H.max.y-H.min.y,pt=H.isBox3?H.max.z-H.min.z:1,Mt=H.min.x,Vt=H.min.y,Xt=H.isBox3?H.min.z:0):(rt=fe.width,ot=fe.height,pt=fe.depth||1,Mt=0,Vt=0,Xt=0),W!==null?(bt=W.x,qt=W.y,he=W.z):(bt=0,qt=0,he=0);const Re=Bt.convert(O.format),de=Bt.convert(O.type);let Lt;O.isData3DTexture?(A.setTexture3D(O,0),Lt=N.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(A.setTexture2DArray(O,0),Lt=N.TEXTURE_2D_ARRAY):(A.setTexture2D(O,0),Lt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,O.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,O.unpackAlignment);const Mi=N.getParameter(N.UNPACK_ROW_LENGTH),pe=N.getParameter(N.UNPACK_IMAGE_HEIGHT),ni=N.getParameter(N.UNPACK_SKIP_PIXELS),Kr=N.getParameter(N.UNPACK_SKIP_ROWS),Dn=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,fe.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,fe.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Mt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Vt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Xt);const Ks=T.isDataArrayTexture||T.isData3DTexture,Ae=O.isDataArrayTexture||O.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const ci=Pt.get(T),Js=Pt.get(O),$n=Pt.get(ci.__renderTarget),Hi=Pt.get(Js.__renderTarget);Tt.bindFramebuffer(N.READ_FRAMEBUFFER,$n.__webglFramebuffer),Tt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Hi.__webglFramebuffer);for(let Vi=0;Vi<pt;Vi++)Ks&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pt.get(T).__webglTexture,F,Xt+Vi),T.isDepthTexture?(Ae&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Pt.get(O).__webglTexture,F,he+Vi),N.blitFramebuffer(Mt,Vt,rt,ot,bt,qt,rt,ot,N.DEPTH_BUFFER_BIT,N.NEAREST)):Ae?N.copyTexSubImage3D(Lt,F,bt,qt,he+Vi,Mt,Vt,rt,ot):N.copyTexSubImage2D(Lt,F,bt,qt,he+Vi,Mt,Vt,rt,ot);Tt.bindFramebuffer(N.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else Ae?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(Lt,F,bt,qt,he,rt,ot,pt,Re,de,fe.data):O.isCompressedArrayTexture?N.compressedTexSubImage3D(Lt,F,bt,qt,he,rt,ot,pt,Re,fe.data):N.texSubImage3D(Lt,F,bt,qt,he,rt,ot,pt,Re,de,fe):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,F,bt,qt,rt,ot,Re,de,fe.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,F,bt,qt,fe.width,fe.height,Re,fe.data):N.texSubImage2D(N.TEXTURE_2D,F,bt,qt,rt,ot,Re,de,fe);N.pixelStorei(N.UNPACK_ROW_LENGTH,Mi),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,pe),N.pixelStorei(N.UNPACK_SKIP_PIXELS,ni),N.pixelStorei(N.UNPACK_SKIP_ROWS,Kr),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Dn),F===0&&O.generateMipmaps&&N.generateMipmap(Lt),Tt.unbindTexture()},this.copyTextureToTexture3D=function(T,O,H=null,W=null,F=0){return T.isTexture!==!0&&(_o("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,W=arguments[1]||null,T=arguments[2],O=arguments[3],F=arguments[4]||0),_o('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,O,H,W,F)},this.initRenderTarget=function(T){Pt.get(T).__webglFramebuffer===void 0&&A.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?A.setTextureCube(T,0):T.isData3DTexture?A.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?A.setTexture2DArray(T,0):A.setTexture2D(T,0),Tt.unbindTexture()},this.resetState=function(){w=0,b=0,R=null,Tt.reset(),ae.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ii}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=le._getDrawingBufferColorSpace(t),e.unpackColorSpace=le._getUnpackColorSpace()}}class mu{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ft(t),this.density=e}clone(){return new mu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class IS extends Ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yi,this.environmentIntensity=1,this.environmentRotation=new yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class US extends hn{constructor(t=null,e=1,n=1,i,s,o,a,l,c=Xn,h=Xn,u,f){super(null,o,a,l,c,h,i,s,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sd extends An{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ms=new xe,od=new xe,La=[],ad=new $r,NS=new xe,so=new Ve,oo=new $s;class OS extends Ve{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new sd(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,NS)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new $r),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),ad.copy(t.boundingBox).applyMatrix4(ms),this.boundingBox.union(ad)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new $s),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ms),oo.copy(t.boundingSphere).applyMatrix4(ms),this.boundingSphere.union(oo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(so.geometry=this.geometry,so.material=this.material,so.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oo.copy(this.boundingSphere),oo.applyMatrix4(n),t.ray.intersectsSphere(oo)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,ms),od.multiplyMatrices(n,ms),so.matrixWorld=od,so.raycast(t,La);for(let o=0,a=La.length;o<a;o++){const l=La[o];l.instanceId=s,l.object=this,e.push(l)}La.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new sd(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new US(new Float32Array(i*this.count),i,this.count,au,_i));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*t;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class FS extends Zr{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new Ft(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}class _m extends Zr{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ld=new xe,Rh=new nm,Ia=new $s,Ua=new I;class BS extends Ye{constructor(t=new Rn,e=new _m){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ia.copy(n.boundingSphere),Ia.applyMatrix4(i),Ia.radius+=s,t.ray.intersectsSphere(Ia)===!1)return;ld.copy(i).invert(),Rh.copy(t.ray).applyMatrix4(ld);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,_=d;g<_;g++){const m=c.getX(g);Ua.fromBufferAttribute(u,m),cd(Ua,m,l,i,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,_=d;g<_;g++)Ua.fromBufferAttribute(u,g),cd(Ua,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function cd(r,t,e,n,i,s,o){const a=Rh.distanceSqToPoint(r);if(a<e){const l=new I;Rh.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class zS extends hn{constructor(t,e,n,i,s,o,a,l,c){super(t,e,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ki{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,l=s-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(s-1);const h=n[i],f=n[i+1]-h,d=(o-h)/f;return(i+d)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),l=e||(o.isVector2?new Ot:new I);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,i=[],s=[],o=[],a=new I,l=new xe;for(let d=0;d<=t;d++){const g=d/t;i[d]=this.getTangentAt(g,new I)}s[0]=new I,o[0]=new I;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),f=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),f<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let d=1;d<=t;d++){if(s[d]=s[d-1].clone(),o[d]=o[d-1].clone(),a.crossVectors(i[d-1],i[d]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(je(i[d-1].dot(i[d]),-1,1));s[d].applyMatrix4(l.makeRotationAxis(a,g))}o[d].crossVectors(i[d],s[d])}if(e===!0){let d=Math.acos(je(s[0].dot(s[t]),-1,1));d/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(d=-d);for(let g=1;g<=t;g++)s[g].applyMatrix4(l.makeRotationAxis(i[g],d*g)),o[g].crossVectors(i[g],s[g])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class vm extends ki{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Ot){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=l-this.aX,d=c-this.aY;l=f*h-d*u+this.aX,c=f*u+d*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class kS extends vm{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function gu(){let r=0,t=0,e=0,n=0;function i(s,o,a,l){r=s,t=a,e=-3*s+3*o-2*a-l,n=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){i(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let f=(o-s)/c-(a-s)/(c+h)+(a-o)/h,d=(a-o)/h-(l-o)/(h+u)+(l-a)/u;f*=h,d*=h,i(o,a,f,d)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const Na=new I,uc=new gu,fc=new gu,dc=new gu;class Ph extends ki{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new I){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%s]:(Na.subVectors(i[0],i[1]).add(i[0]),c=Na);const u=i[a%s],f=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Na.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Na),this.curveType==="centripetal"||this.curveType==="chordal"){const d=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(f),d),m=Math.pow(f.distanceToSquared(h),d);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),uc.initNonuniformCatmullRom(c.x,u.x,f.x,h.x,g,_,m),fc.initNonuniformCatmullRom(c.y,u.y,f.y,h.y,g,_,m),dc.initNonuniformCatmullRom(c.z,u.z,f.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(uc.initCatmullRom(c.x,u.x,f.x,h.x,this.tension),fc.initCatmullRom(c.y,u.y,f.y,h.y,this.tension),dc.initCatmullRom(c.z,u.z,f.z,h.z,this.tension));return n.set(uc.calc(l),fc.calc(l),dc.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new I().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function hd(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,l=r*a;return(2*e-2*n+s+o)*l+(-3*e+3*n-2*s-o)*a+s*r+e}function HS(r,t){const e=1-r;return e*e*t}function VS(r,t){return 2*(1-r)*r*t}function GS(r,t){return r*r*t}function Uo(r,t,e,n){return HS(r,t)+VS(r,e)+GS(r,n)}function WS(r,t){const e=1-r;return e*e*e*t}function XS(r,t){const e=1-r;return 3*e*e*r*t}function YS(r,t){return 3*(1-r)*r*r*t}function qS(r,t){return r*r*r*t}function No(r,t,e,n,i){return WS(r,t)+XS(r,e)+YS(r,n)+qS(r,i)}class $S extends ki{constructor(t=new Ot,e=new Ot,n=new Ot,i=new Ot){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new Ot){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(No(t,i.x,s.x,o.x,a.x),No(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ZS extends ki{constructor(t=new I,e=new I,n=new I,i=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new I){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(No(t,i.x,s.x,o.x,a.x),No(t,i.y,s.y,o.y,a.y),No(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class KS extends ki{constructor(t=new Ot,e=new Ot){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Ot){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Ot){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class JS extends ki{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jS extends ki{constructor(t=new Ot,e=new Ot,n=new Ot){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Ot){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Uo(t,i.x,s.x,o.x),Uo(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class xm extends ki{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Uo(t,i.x,s.x,o.x),Uo(t,i.y,s.y,o.y),Uo(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class QS extends ki{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Ot){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(hd(a,l.x,c.x,h.x,u.x),hd(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new Ot().fromArray(i))}return this}}var tE=Object.freeze({__proto__:null,ArcCurve:kS,CatmullRomCurve3:Ph,CubicBezierCurve:$S,CubicBezierCurve3:ZS,EllipseCurve:vm,LineCurve:KS,LineCurve3:JS,QuadraticBezierCurve:jS,QuadraticBezierCurve3:xm,SplineCurve:QS});class fl extends Rn{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],f=[],d=[];let g=0;const _=[],m=n/2;let p=0;S(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Ne(u,3)),this.setAttribute("normal",new Ne(f,3)),this.setAttribute("uv",new Ne(d,2));function S(){const v=new I,C=new I;let w=0;const b=(e-t)/n;for(let R=0;R<=s;R++){const y=[],x=R/s,P=x*(e-t)+t;for(let U=0;U<=i;U++){const B=U/i,V=B*l+a,q=Math.sin(V),X=Math.cos(V);C.x=P*q,C.y=-x*n+m,C.z=P*X,u.push(C.x,C.y,C.z),v.set(q,b,X).normalize(),f.push(v.x,v.y,v.z),d.push(B,1-x),y.push(g++)}_.push(y)}for(let R=0;R<i;R++)for(let y=0;y<s;y++){const x=_[y][R],P=_[y+1][R],U=_[y+1][R+1],B=_[y][R+1];(t>0||y!==0)&&(h.push(x,P,B),w+=3),(e>0||y!==s-1)&&(h.push(P,U,B),w+=3)}c.addGroup(p,w,0),p+=w}function M(v){const C=g,w=new Ot,b=new I;let R=0;const y=v===!0?t:e,x=v===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,m*x,0),f.push(0,x,0),d.push(.5,.5),g++;const P=g;for(let U=0;U<=i;U++){const V=U/i*l+a,q=Math.cos(V),X=Math.sin(V);b.x=y*X,b.y=m*x,b.z=y*q,u.push(b.x,b.y,b.z),f.push(0,x,0),w.x=q*.5+.5,w.y=X*.5*x+.5,d.push(w.x,w.y),g++}for(let U=0;U<i;U++){const B=C+U,V=P+U;v===!0?h.push(V,V+1,B):h.push(V+1,V,B),R+=3}c.addGroup(p,R,v===!0?1:2),p+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fl(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _u extends Rn{constructor(t=.5,e=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const f=(e-t)/i,d=new I,g=new Ot;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=s+m/n*o;d.x=u*Math.cos(p),d.y=u*Math.sin(p),l.push(d.x,d.y,d.z),c.push(0,0,1),g.x=(d.x/e+1)/2,g.y=(d.y/e+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const S=p+m,M=S,v=S+n+1,C=S+n+2,w=S+1;a.push(M,v,w),a.push(v,C,w)}}this.setIndex(a),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(c,3)),this.setAttribute("uv",new Ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _u(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class vu extends Rn{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new I,f=new I,d=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const S=[],M=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&l===Math.PI&&(v=-.5/e);for(let C=0;C<=e;C++){const w=C/e;u.x=-t*Math.cos(i+w*s)*Math.sin(o+M*a),u.y=t*Math.cos(o+M*a),u.z=t*Math.sin(i+w*s)*Math.sin(o+M*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),m.push(w+v,1-M),S.push(c++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){const M=h[p][S+1],v=h[p][S],C=h[p+1][S],w=h[p+1][S+1];(p!==0||o>0)&&d.push(M,v,w),(p!==n-1||l<Math.PI)&&d.push(v,C,w)}this.setIndex(d),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(_,3)),this.setAttribute("uv",new Ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vu(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class xu extends Rn{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new I,u=new I,f=new I;for(let d=0;d<=n;d++)for(let g=0;g<=i;g++){const _=g/i*s,m=d/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/i),c.push(d/n)}for(let d=1;d<=n;d++)for(let g=1;g<=i;g++){const _=(i+1)*d+g-1,m=(i+1)*(d-1)+g-1,p=(i+1)*(d-1)+g,S=(i+1)*d+g;o.push(_,m,S),o.push(m,p,S)}this.setIndex(o),this.setAttribute("position",new Ne(a,3)),this.setAttribute("normal",new Ne(l,3)),this.setAttribute("uv",new Ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class dl extends Rn{constructor(t=new xm(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:s};const o=t.computeFrenetFrames(e,s);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new I,l=new I,c=new Ot;let h=new I;const u=[],f=[],d=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new Ne(u,3)),this.setAttribute("normal",new Ne(f,3)),this.setAttribute("uv",new Ne(d,2));function _(){for(let M=0;M<e;M++)m(M);m(s===!1?e:0),S(),p()}function m(M){h=t.getPointAt(M/e,h);const v=o.normals[M],C=o.binormals[M];for(let w=0;w<=i;w++){const b=w/i*Math.PI*2,R=Math.sin(b),y=-Math.cos(b);l.x=y*v.x+R*C.x,l.y=y*v.y+R*C.y,l.z=y*v.z+R*C.z,l.normalize(),f.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function p(){for(let M=1;M<=e;M++)for(let v=1;v<=i;v++){const C=(i+1)*(M-1)+(v-1),w=(i+1)*M+(v-1),b=(i+1)*M+v,R=(i+1)*(M-1)+v;g.push(C,w,R),g.push(w,b,R)}}function S(){for(let M=0;M<=e;M++)for(let v=0;v<=i;v++)c.x=M/e,c.y=v/i,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new dl(new tE[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class ym extends Zr{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jp,this.normalScale=new Ot(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Oa extends ym{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ot(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return je(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ft(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ft(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ft(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Sl extends Ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class eE extends Sl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const pc=new xe,ud=new I,fd=new I;class Mm{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ot(512,512),this.map=null,this.mapPass=null,this.matrix=new xe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new du,this._frameExtents=new Ot(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ud.setFromMatrixPosition(t.matrixWorld),e.position.copy(ud),fd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(fd),e.updateMatrixWorld(),pc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(pc)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const dd=new xe,ao=new I,mc=new I;class nE extends Mm{constructor(){super(new zn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ot(4,2),this._viewportCount=6,this._viewports=[new ve(2,1,1,1),new ve(0,1,1,1),new ve(3,1,1,1),new ve(1,1,1,1),new ve(3,0,1,1),new ve(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ao.setFromMatrixPosition(t.matrixWorld),n.position.copy(ao),mc.copy(n.position),mc.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(mc),n.updateMatrixWorld(),i.makeTranslation(-ao.x,-ao.y,-ao.z),dd.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dd)}}class gc extends Sl{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new nE}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class iE extends Mm{constructor(){super(new um(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _c extends Sl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ye.DEFAULT_UP),this.updateMatrix(),this.target=new Ye,this.shadow=new iE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class rE extends Sl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class sE{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=pd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=pd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function pd(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:iu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=iu);class oE{constructor(t={}){this.group=new Ui,this.options={length:t.length||240,radius:t.radius||4.2,turns:t.turns||14,numBasePairs:t.numBasePairs||160,strandRadius:.28,nodeRadius:.45,...t},this.colors={strandA:new Ft(61695),strandB:new Ft(11032055),adenine:new Ft(61695),thymine:new Ft(1096065),guanine:new Ft(10309341),cytosine:new Ft(26367),hBond:new Ft(16777215),backbone:new Ft(3718648)},this.pulseProgress=0,this.targetRotationSpeed=.35,this.currentRotationSpeed=.35,this.basePairsData=[],this.glowingMeshes=[],this.buildHelix()}buildHelix(){const{length:t,radius:e,turns:n,numBasePairs:i,nodeRadius:s}=this.options,o=t/2,a=[],l=[],c=[{name1:"A",name2:"T",col1:this.colors.adenine,col2:this.colors.thymine},{name1:"G",name2:"C",col1:this.colors.guanine,col2:this.colors.cytosine},{name1:"T",name2:"A",col1:this.colors.thymine,col2:this.colors.adenine},{name1:"C",name2:"G",col1:this.colors.cytosine,col2:this.colors.guanine}],h=new vu(s,24,24),u=new fl(.12,.12,1,12);u.rotateZ(Math.PI/2);const f=new fl(.06,.06,1,8);f.rotateZ(Math.PI/2);const d=i*2,g=new Oa({color:16777215,emissive:61695,emissiveIntensity:.6,roughness:.15,metalness:.8,clearcoat:1,clearcoatRoughness:.1});this.backboneInstancedMesh=new OS(h,g,d),this.backboneInstancedMesh.instanceMatrix.setUsage(i0);const _=new Oa({roughness:.2,metalness:.5,clearcoat:.8,emissiveIntensity:.8});this.rungsGroup=new Ui;const m=new Ye;let p=0;for(let R=0;R<i;R++){const y=R/(i-1),x=(1-y)*t-o,P=y*n*Math.PI*2,U=P,B=P+Math.PI,V=Math.cos(U)*e,q=Math.sin(U)*e,X=Math.cos(B)*e,Y=Math.sin(B)*e,k=new I(V,x,q),et=new I(X,x,Y);a.push(k),l.push(et),m.position.copy(k),m.scale.setScalar(1),m.updateMatrix(),this.backboneInstancedMesh.setMatrixAt(p,m.matrix),this.backboneInstancedMesh.setColorAt(p,this.colors.strandA),p++,m.position.copy(et),m.scale.setScalar(1),m.updateMatrix(),this.backboneInstancedMesh.setMatrixAt(p,m.matrix),this.backboneInstancedMesh.setColorAt(p,this.colors.strandB),p++;const D=c[R%c.length],st=new Ui;st.position.set(0,x,0);const Dt=new I().subVectors(et,k).normalize(),$=k.distanceTo(et)/2,tt=_.clone();tt.color=D.col1,tt.emissive=D.col1,tt.emissiveIntensity=.5;const ut=new Ve(u,tt),nt=$*.85;ut.scale.set(nt,1,1),ut.position.set((V+0)/2,0,(q+0)/2),ut.quaternion.setFromUnitVectors(new I(1,0,0),Dt.clone().negate());const xt=_.clone();xt.color=D.col2,xt.emissive=D.col2,xt.emissiveIntensity=.5;const Et=new Ve(u,xt),zt=$*.85;Et.scale.set(zt,1,1),Et.position.set((X+0)/2,0,(Y+0)/2),Et.quaternion.setFromUnitVectors(new I(1,0,0),Dt);const $t=new ym({color:16777215,emissive:16777215,emissiveIntensity:.9,roughness:.1,transparent:!0,opacity:.9}),Ut=new Ve(f,$t);Ut.scale.set($*.35,1,1),Ut.position.set(0,0,0),Ut.quaternion.setFromUnitVectors(new I(1,0,0),Dt);const Rt=new Ve(h,tt);Rt.scale.setScalar(.7),Rt.position.set(V*.5,0,q*.5);const N=new Ve(h,xt);N.scale.setScalar(.7),N.position.set(X*.5,0,Y*.5),st.add(ut),st.add(Et),st.add(Ut),st.add(Rt),st.add(N),this.rungsGroup.add(st),this.basePairsData.push({y:x,group:st,leftMat:tt,rightMat:xt,hBondMat:$t,baseA:D.name1,baseB:D.name2,initialY:x})}this.backboneInstancedMesh.instanceMatrix.needsUpdate=!0,this.backboneInstancedMesh.instanceColor&&(this.backboneInstancedMesh.instanceColor.needsUpdate=!0);const S=new Ph(a),M=new Ph(l),v=new dl(S,i*4,this.options.strandRadius,12,!1),C=new dl(M,i*4,this.options.strandRadius,12,!1),w=new Oa({color:43775,emissive:61695,emissiveIntensity:.7,roughness:.2,metalness:.8,clearcoat:1,transparent:!0,opacity:.85}),b=new Oa({color:9647082,emissive:11032055,emissiveIntensity:.7,roughness:.2,metalness:.8,clearcoat:1,transparent:!0,opacity:.85});this.tubeA=new Ve(v,w),this.tubeB=new Ve(C,b),this.group.add(this.backboneInstancedMesh),this.group.add(this.tubeA),this.group.add(this.tubeB),this.group.add(this.rungsGroup),this.addInternalLighting()}addInternalLighting(){this.light1=new gc(61695,3,25),this.light1.position.set(0,30,0),this.group.add(this.light1),this.light2=new gc(11032055,3,25),this.light2.position.set(0,-30,0),this.group.add(this.light2),this.light3=new gc(65450,2.5,25),this.light3.position.set(0,-90,0),this.group.add(this.light3)}update(t,e,n=0){this.currentRotationSpeed=go.lerp(this.currentRotationSpeed,this.targetRotationSpeed,t*3),this.group.rotation.y+=t*this.currentRotationSpeed,this.group.position.x=Math.sin(e*.6)*.4,this.group.position.z=Math.cos(e*.5)*.4;const s=e*1.8%1,o=this.basePairsData.length,a=Math.floor(s*o);for(let c=0;c<o;c++){const h=Math.abs(c-a),u=Math.max(0,1-h/8),f=.5,d=u*1.5;this.basePairsData[c].leftMat.emissiveIntensity=f+d,this.basePairsData[c].rightMat.emissiveIntensity=f+d,this.basePairsData[c].hBondMat.opacity=.8+u*.2}const l=(.5-n)*this.options.length;this.light1&&(this.light1.position.y=l+15),this.light2&&(this.light2.position.y=l-15)}setEnergyState(t){const e=t?1.6:.7,n=t?.8:.35;this.tubeA.material.emissiveIntensity=e,this.tubeB.material.emissiveIntensity=e,this.targetRotationSpeed=n}}class aE{constructor(t=1200,e=260){this.group=new Ui,this.count=t,this.depth=e,this.createBioDust(),this.createCyberGrid(),this.createEnergyRings()}createBioDust(){const t=new Rn,e=new Float32Array(this.count*3),n=new Float32Array(this.count*3),i=new Float32Array(this.count),s=new Float32Array(this.count),o=[new Ft(61695),new Ft(10309341),new Ft(26367),new Ft(1096065),new Ft(16777215)],a=28,l=this.depth/2;for(let u=0;u<this.count;u++){const f=Math.random()*Math.PI*2,d=Math.random()*a+4,g=Math.cos(f)*d,_=Math.sin(f)*d,m=Math.random()*this.depth-l;e[u*3]=g,e[u*3+1]=m,e[u*3+2]=_;const p=o[Math.floor(Math.random()*o.length)];n[u*3]=p.r,n[u*3+1]=p.g,n[u*3+2]=p.b,i[u]=Math.random()*3.5+1,s[u]=Math.random()*.4+.2}t.setAttribute("position",new An(e,3)),t.setAttribute("color",new An(n,3)),t.setAttribute("size",new An(i,1));const c=this.createParticleTexture(),h=new _m({size:1.8,vertexColors:!0,map:c,transparent:!0,opacity:.8,blending:cl,depthWrite:!1,sizeAttenuation:!0});this.points=new BS(t,h),this.speeds=s,this.group.add(this.points)}createParticleTexture(){const t=document.createElement("canvas");t.width=64,t.height=64;const e=t.getContext("2d"),n=e.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,"rgba(255, 255, 255, 1)"),n.addColorStop(.2,"rgba(0, 240, 255, 0.8)"),n.addColorStop(.6,"rgba(168, 85, 247, 0.3)"),n.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=n,e.fillRect(0,0,64,64),new zS(t)}createCyberGrid(){const t=new Ui,e=new FS({color:61695,transparent:!0,opacity:.08}),n=14,i=this.depth/n,s=this.depth/2;for(let o=0;o<=n;o++){const a=o*i-s,l=new _u(22,22.2,32);l.rotateX(Math.PI/2);const c=new Ve(l,e);c.position.y=a,t.add(c)}this.group.add(t)}createEnergyRings(){this.energyRings=[];const t=new xu(8.5,.08,16,64),e=new fu({color:61695,transparent:!0,opacity:.35,blending:cl});for(let n=0;n<4;n++){const i=new Ve(t,e);i.position.y=40-n*50,i.rotation.x=Math.PI/2,this.energyRings.push(i),this.group.add(i)}}update(t,e,n=0){if(this.group.rotation.y=e*.05,this.points){const i=this.points.geometry.attributes.position.array,s=this.depth/2;for(let o=0;o<this.count;o++)i[o*3+1]+=this.speeds[o]*t*4,i[o*3+1]>s&&(i[o*3+1]=-s),i[o*3]+=Math.sin(e+o)*.01,i[o*3+2]+=Math.cos(e+o)*.01;this.points.geometry.attributes.position.needsUpdate=!0}this.energyRings&&this.energyRings.forEach((i,s)=>{i.rotation.z=e*(.2+s*.1),i.scale.setScalar(1+Math.sin(e*2+s)*.05)})}}class lE{constructor(t){this.camera=t,this.waypoints=[{progress:0,pos:new I(0,32,22),target:new I(0,32,0)},{progress:.14,pos:new I(-6,12,18),target:new I(2,12,0)},{progress:.28,pos:new I(7,-15,18),target:new I(-2,-15,0)},{progress:.42,pos:new I(-5,-45,14),target:new I(1,-45,0)},{progress:.58,pos:new I(6,-75,19),target:new I(-2,-75,0)},{progress:.72,pos:new I(-6,-105,17),target:new I(2,-105,0)},{progress:.86,pos:new I(0,-135,15),target:new I(0,-131,0)},{progress:1,pos:new I(0,-162,21),target:new I(0,-162,0)}],this.currentPos=new I().copy(this.waypoints[0].pos),this.currentTarget=new I().copy(this.waypoints[0].target),this.targetPos=new I().copy(this.waypoints[0].pos),this.lookAtTarget=new I().copy(this.waypoints[0].target),this.mouse={x:0,y:0,targetX:0,targetY:0},this.initMouseListener()}initMouseListener(){window.addEventListener("mousemove",t=>{this.mouse.targetX=(t.clientX/window.innerWidth-.5)*2,this.mouse.targetY=-(t.clientY/window.innerHeight-.5)*2}),window.addEventListener("touchmove",t=>{t.touches.length>0&&(this.mouse.targetX=(t.touches[0].clientX/window.innerWidth-.5)*1.5,this.mouse.targetY=-(t.touches[0].clientY/window.innerHeight-.5)*1.5)},{passive:!0})}sampleWaypoints(t){const e=go.clamp(t,0,1);let n=0;for(let u=0;u<this.waypoints.length-1;u++)if(e>=this.waypoints[u].progress&&e<=this.waypoints[u+1].progress){n=u;break}const i=this.waypoints[n],s=this.waypoints[Math.min(n+1,this.waypoints.length-1)],o=s.progress-i.progress||1,a=(e-i.progress)/o,l=go.smoothstep(a,0,1),c=new I().lerpVectors(i.pos,s.pos,l),h=new I().lerpVectors(i.target,s.target,l);return{pos:c,target:h}}update(t,e=0){this.mouse.x=go.lerp(this.mouse.x,this.mouse.targetX,t*3.5),this.mouse.y=go.lerp(this.mouse.y,this.mouse.targetY,t*3.5);const n=this.sampleWaypoints(e),i=this.mouse.x*2.2,s=this.mouse.y*1.8;this.targetPos.set(n.pos.x+i,n.pos.y+s,n.pos.z),this.lookAtTarget.set(n.target.x+i*.4,n.target.y+s*.4,n.target.z),this.currentPos.lerp(this.targetPos,t*4),this.currentTarget.lerp(this.lookAtTarget,t*4),this.camera.position.copy(this.currentPos),this.camera.lookAt(this.currentTarget)}}class cE{constructor(t){this.container=t,this.scrollProgress=0,this.clock=new sE,this.initScene(),this.initLighting(),this.initObjects(),this.initEventListeners(),this.animate=this.animate.bind(this),requestAnimationFrame(this.animate)}initScene(){this.scene=new IS,this.scene.fog=new mu(198418,.012);const t=window.innerWidth/window.innerHeight;this.camera=new zn(52,t,.1,800),this.camera.position.set(0,32,22),this.renderer=new LS({antialias:!0,powerPreference:"high-performance",alpha:!0,stencil:!1,depth:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=kp,this.renderer.toneMappingExposure=1.35,this.renderer.outputColorSpace=Fn,this.container.appendChild(this.renderer.domElement)}initLighting(){const t=new rE(531251,2.5);this.scene.add(t);const e=new eE(61695,5774471,1.8);e.position.set(0,50,0),this.scene.add(e),this.keyLight=new _c(61695,3.5),this.keyLight.position.set(20,40,25),this.scene.add(this.keyLight),this.fillLight=new _c(11032055,3),this.fillLight.position.set(-20,-20,20),this.scene.add(this.fillLight);const n=new _c(26367,2.2);n.position.set(0,20,-30),this.scene.add(n)}initObjects(){this.dna=new oE({length:260,radius:4.2,turns:15,numBasePairs:160}),this.scene.add(this.dna.group),this.particles=new aE(1400,280),this.scene.add(this.particles.group),this.cameraController=new lE(this.camera)}initEventListeners(){window.addEventListener("resize",()=>{const t=window.innerWidth,e=window.innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))})}setScrollProgress(t){this.scrollProgress=t,t>.82&&t<.96?this.dna.setEnergyState(!0):this.dna.setEnergyState(!1)}animate(){requestAnimationFrame(this.animate);const t=Math.min(this.clock.getDelta(),.1),e=this.clock.getElapsedTime();this.dna&&this.dna.update(t,e,this.scrollProgress),this.particles&&this.particles.update(t,e,this.scrollProgress),this.cameraController&&this.cameraController.update(t,this.scrollProgress),this.renderer.render(this.scene,this.camera)}}class hE{constructor(){this.ctx=null,this.isMuted=!0,this.initialized=!1}initContext(){if(!this.initialized){const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t,this.initialized=!0)}this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume()}toggleMute(){return this.initContext(),this.isMuted=!this.isMuted,this.isMuted||this.playActivate(),!this.isMuted}playClick(){if(!(this.isMuted||!this.ctx))try{const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(1200,t),e.frequency.exponentialRampToValueAtTime(400,t+.05),n.gain.setValueAtTime(.08,t),n.gain.exponentialRampToValueAtTime(.001,t+.05),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.05)}catch{}}playHover(){if(!(this.isMuted||!this.ctx))try{const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="triangle",e.frequency.setValueAtTime(880,t),e.frequency.exponentialRampToValueAtTime(1760,t+.04),n.gain.setValueAtTime(.03,t),n.gain.exponentialRampToValueAtTime(.001,t+.04),e.connect(n),n.connect(this.ctx.destination),e.start(t),e.stop(t+.04)}catch{}}playActivate(){if(!(this.isMuted||!this.ctx))try{const t=this.ctx.currentTime;[440,660,880,1320].forEach((e,n)=>{const i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(e,t+n*.06),s.gain.setValueAtTime(.06,t+n*.06),s.gain.exponentialRampToValueAtTime(.001,t+n*.06+.15),i.connect(s),s.connect(this.ctx.destination),i.start(t+n*.06),i.stop(t+n*.06+.15)})}catch{}}}const ji=new hE;class uE{constructor(t){this.lenis=t,this.initSequenceTicker(),this.initAudioToggle(),this.initSectionWaypoints()}initSequenceTicker(){const t=document.getElementById("hud-sequence-ticker");if(!t)return;const e=["A","T","G","C"];let n="ATCG-GTAC-CCGA-TAAG-CGTT-AACC-GCTA-TTCG";setInterval(()=>{const i=Array.from({length:4},()=>e[Math.floor(Math.random()*e.length)]).join(""),s=n.split("-");s.shift(),s.push(i),n=s.join("-"),t.textContent=n},450)}initAudioToggle(){const t=document.getElementById("audio-toggle-btn"),e=document.getElementById("audio-toggle-label");document.getElementById("audio-icon"),t&&t.addEventListener("click",()=>{ji.toggleMute()?(e&&(e.textContent="AUDIO ON"),t.classList.add("border-cyber-cyan","text-cyber-cyan","shadow-glow-cyan"),t.classList.remove("text-cyber-muted")):(e&&(e.textContent="AUDIO OFF"),t.classList.remove("border-cyber-cyan","text-cyber-cyan","shadow-glow-cyan"),t.classList.add("text-cyber-muted"))})}initSectionWaypoints(){document.querySelectorAll(".hud-waypoint-btn").forEach(e=>{e.addEventListener("click",n=>{ji.playClick();const i=e.getAttribute("data-target"),s=document.getElementById(i);s&&this.lenis&&this.lenis.scrollTo(s,{offset:0,duration:1.8})}),e.addEventListener("mouseenter",()=>{ji.playHover()})})}updateScrollTelemetry(t,e){const n=document.getElementById("hud-depth-readout");if(n){const o=(t*260).toFixed(1);n.textContent=`DEPTH: -${o} nm`}const i=document.getElementById("hud-progress-bar");i&&(i.style.width=`${(t*100).toFixed(1)}%`),document.querySelectorAll(".hud-waypoint-btn").forEach(o=>{o.getAttribute("data-target")===e?(o.classList.add("active","scale-125","bg-cyber-cyan","border-cyber-cyan","shadow-glow-cyan"),o.classList.remove("bg-white/20","border-white/10")):(o.classList.remove("active","scale-125","bg-cyber-cyan","border-cyber-cyan","shadow-glow-cyan"),o.classList.add("bg-white/20","border-white/10"))})}}const vc={hero:{name:"ARPUTHARAJ B",title:"BSc Chemistry Student | Learning Python | Vibe Coder & Web Developer",photoUrl:"/profile.jpg",introText:"I am a BSc Chemistry student exploring the world of technology. I am currently learning Python, building web projects through vibe coding, and continuously developing my skills in programming and modern web development.",statusBadge:"Learning, Building & Growing 🚀"},about:{heading:"About Me",subheading:"Where Chemical Sciences Meet Modern Web & Software Development",bioParagraphs:["I am a BSc Chemistry student with a deep fascination for the intersection of natural sciences and modern computing. Driven by curiosity, I stepped into the world of programming to explore how digital technology and software can solve real-world problems.","Currently mastering Python and modern web development architectures, I love vibe coding and transforming creative ideas into interactive, high-performance web applications and digital tools.","My goal is to bridge molecular science, computational algorithms, and full-stack software development to build intuitive products and contribute to innovative global tech initiatives."],highlights:[{label:"Focus Areas",value:"Chemistry, Python Programming, Web Dev"},{label:"Methodology",value:"Vibe Coding, Rapid Prototyping, Clean Code"},{label:"Core Passion",value:"Bridging Science & Software Innovation"},{label:"Work Ethic",value:"Curious, Self-Driven, Continuous Learner"}],stats:[{number:"100+",label:"Hours of Python & Code Practice"},{number:"5+",label:"Web & Interactive Apps Built"},{number:"100%",label:"Curiosity & Passion for Tech"},{number:"24/7",label:"Creative Vibe Coding Mindset"}]},studies:{heading:"Current Studies",subheading:"Academic Foundation at Bishop Heber College & Tech Exploration",degree:"Bachelor of Science in Chemistry",institution:"Bishop Heber College (Autonomous), Tiruchirappalli",period:"2025 — 2028",specialization:"Web Development, Intersection of Chemistry & Bioinformatics",gpa:"Undergraduate Batch (2025 — 2028)",overview:"Pursuing Chemistry while actively expanding into web development, Python programming, and computational bioinformatics interfaces.",coreModules:[{title:"Web Development & 3D Interactive UI",desc:"Building modern responsive websites, Three.js 3D graphics, JavaScript, and Tailwind CSS interfaces.",icon:"globe"},{title:"Python Programming & Scripting",desc:"Algorithmic logic, data manipulation, automated scripting, and computer science fundamentals.",icon:"code"},{title:"Chemical Sciences & Molecular Bonding",desc:"Organic, Inorganic & Physical chemistry principles, chemical reactions, and molecular structures.",icon:"atom"},{title:"Chemistry & Bioinformatics Convergence",desc:"Cheminformatics, molecular visualization, biological data concepts, and digital scientific workflows.",icon:"dna"}]},skills:{heading:"Encoded Capabilities",subheading:"Technical Skills & Development Tools Encoded in the Double Helix",categories:[{name:"Technical & Programming (Learning Track)",color:"#00f0ff",items:[{name:"Python Programming",level:80,tag:"Learning"},{name:"Web Development (HTML5 / CSS3 / JS)",level:85,tag:"Learning"},{name:"Vibe Coding & AI Prompt Engineering",level:90,tag:"Learning"},{name:"Tailwind CSS & Responsive UI",level:82,tag:"Learning"},{name:"Chemistry Informatics & Data Basics",level:75,tag:"Learning"},{name:"Git & Version Control Fundamentals",level:78,tag:"Learning"},{name:"Frontend 3D & Interactive Graphics",level:80,tag:"Learning"},{name:"Algorithms & Problem Solving",level:76,tag:"Learning"}]},{name:"Tools, Software & AI Frameworks",color:"#a855f7",items:[{name:"VS Code Studio",level:92,tag:"Active"},{name:"Jupyter Notebook",level:85,tag:"Active"},{name:"GitHub & Version Control",level:86,tag:"Active"},{name:"Cursor / AI Coding IDEs",level:90,tag:"Active"},{name:"Terminal & Command Line",level:82,tag:"Active"},{name:"ChemDraw / Molecular Visualization Tools",level:84,tag:"Active"},{name:"Chrome DevTools & Web Inspector",level:88,tag:"Active"},{name:"Vite & Modern Build Tools",level:85,tag:"Active"}]}]},projects:[{id:"dna-3d-portfolio",title:"3D DNA Helix Personal Portfolio Experience",category:"Web 3D & Graphics",image:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",description:"Designed and built an interactive 3D WebGL website featuring a procedural DNA double helix with smooth scroll-driven camera choreography, holographic glassmorphism UI, and particle effects.",technologies:["Three.js","JavaScript","GSAP","Tailwind CSS","Vite"],metrics:"60 FPS Real-Time WebGL",demoUrl:"https://github.com/Arputharaj-B",githubUrl:"https://github.com/Arputharaj-B",featured:!0},{id:"python-scripting-lab",title:"Python Science & Automation Scripts",category:"Python / Programming",image:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",description:"A growing collection of Python scripts exploring algorithmic problem solving, basic scientific calculations, file parsing, and chemistry data exploration.",technologies:["Python 3","Algorithms","VS Code","Data Logic"],metrics:"Core Logic Building",demoUrl:"https://github.com/Arputharaj-B",githubUrl:"https://github.com/Arputharaj-B",featured:!0},{id:"vibe-coding-ui",title:"VibeLab: Interactive Web UI Prototypes",category:"Frontend / Vibe Coding",image:"https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",description:"Experimental modern web interfaces crafted through vibe coding, featuring futuristic dark modes, glassmorphic HUD elements, and responsive designs.",technologies:["HTML5","CSS3 / Tailwind","JavaScript","AI Prompting"],metrics:"Modern Responsive UI",demoUrl:"https://github.com/Arputharaj-B",githubUrl:"https://github.com/Arputharaj-B",featured:!0},{id:"chembio-visualizer",title:"ChemBio Molecular 3D Viewer (Upcoming)",category:"Chemistry & Bio Tech",image:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",description:"An in-development interactive web project aimed at visualizing chemical bonding, 3D molecular structures, and biological compounds directly in the web browser.",technologies:["Three.js","Python","Cheminformatics","Web Dev"],metrics:"In Active Research & Dev",demoUrl:"https://github.com/Arputharaj-B",githubUrl:"https://github.com/Arputharaj-B",featured:!1}],certifications:[{title:"Python Essential Training & Programming Foundations",issuer:"LinkedIn Learning",date:"2024 — 2025",skills:"Python Syntax, Data Structures, Functions, Object-Oriented Logic",credentialUrl:"https://www.linkedin.com/learning",badgeIcon:"award",status:"Verified on LinkedIn Learning"},{title:"Programming Foundations: Fundamentals & Algorithms",issuer:"LinkedIn Learning",date:"2024 — 2025",skills:"Algorithmic Thinking, Control Flow, Problem Solving, Clean Code",credentialUrl:"https://www.linkedin.com/learning",badgeIcon:"shield-check",status:"Verified on LinkedIn Learning"},{title:"Web Development Foundations & Modern Web UI",issuer:"LinkedIn Learning",date:"2024 — 2025",skills:"HTML5, CSS3, JavaScript Fundamentals, Responsive Design",credentialUrl:"https://www.linkedin.com/learning",badgeIcon:"cpu",status:"Verified on LinkedIn Learning"},{title:"Exploring Technology & Data in Science",issuer:"LinkedIn Learning",date:"2024 — 2025",skills:"Data Exploration, Scientific Mindset, Digital Tools",credentialUrl:"https://www.linkedin.com/learning",badgeIcon:"atom",status:"Verified on LinkedIn Learning"}],achievements:[{title:"BSc Chemistry Scholar — Bishop Heber College",desc:"Actively pursuing undergraduate chemistry education at Bishop Heber College (Autonomous), Tiruchirappalli (2025–2028 batch).",year:"2025 — Present"},{title:"Self-Driven Tech & Vibe Coding Journey",desc:"Independently learning Python programming, 3D web development, and modern development workflows through continuous practice.",year:"2024 — Present"},{title:"Continuous Professional Upskilling",desc:"Actively completing verified professional learning paths and certifications on LinkedIn Learning.",year:"2024 — Present"}],contact:{heading:"Let's Connect",subheading:"Open for Collaborations, Learning Opportunities & Tech Inquiries",email:"raj.mikado.08@gmail.com",linkedin:"https://www.linkedin.com/in/arputharaj-b-5831783ba",github:"https://github.com/Arputharaj-B",twitter:"https://github.com/Arputharaj-B",portfolioUrl:"http://localhost:5173",location:"Thiruvarur / Tiruchirappalli, Tamil Nadu, India",closingMessage:"Building the future through science, programming and modern web technology."}};So.registerPlugin(re);class fE{constructor(){this.initSmoothScroll(),this.init3DScene(),this.initHUD(),this.renderData(),this.initSectionAnimations(),this.initInteractions()}initSmoothScroll(){this.lenis=new Lm({duration:1.4,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),orientation:"vertical",gestureOrientation:"vertical",smoothWheel:!0,wheelMultiplier:1,touchMultiplier:2,infinite:!1}),this.lenis.on("scroll",t=>{re.update(),this.handleScroll(t)}),So.ticker.add(t=>{this.lenis.raf(t*1e3)}),So.ticker.lagSmoothing(0)}init3DScene(){const t=document.getElementById("webgl-container");this.sceneManager=new cE(t)}initHUD(){this.hud=new uE(this.lenis)}handleScroll(t){const e=document.documentElement.scrollHeight-window.innerHeight,n=e>0?Math.min(Math.max(t.scroll/e,0),1):0;this.sceneManager&&this.sceneManager.setScrollProgress(n);const i=["section-hero","section-about","section-studies","section-skills","section-projects","section-certifications","section-vision","section-contact"];let s=i[0];i.forEach(o=>{const a=document.getElementById(o);if(a){const l=a.getBoundingClientRect();l.top<=window.innerHeight*.5&&l.bottom>=window.innerHeight*.2&&(s=o)}}),this.hud&&this.hud.updateScrollTelemetry(n,s)}renderData(){const t=vc,e=document.getElementById("hero-name");e&&(e.innerHTML=`<span class="gradient-title">${t.hero.name}</span>`);const n=document.getElementById("hero-title");n&&(n.textContent=t.hero.title);const i=document.getElementById("hero-intro");i&&(i.textContent=t.hero.introText);const s=document.getElementById("hero-photo");s&&t.hero.photoUrl&&(s.src=t.hero.photoUrl);const o=document.getElementById("hero-status");o&&(o.textContent=t.hero.statusBadge);const a=document.getElementById("studies-degree");a&&(a.textContent=t.studies.degree);const l=document.getElementById("studies-institution");l&&(l.textContent=`${t.studies.institution} | ${t.studies.period}`);const c=document.getElementById("studies-specialization");c&&(c.textContent=t.studies.specialization),this.renderStudies(t.studies),this.renderAbout(t.about),this.renderSkills(t.skills),this.renderProjects(t.projects),this.renderCertifications(t.certifications,t.achievements),this.renderContact(t.contact)}renderStudies(t){const e=document.getElementById("studies-modules-grid");if(e&&t.coreModules){const n=["border-l-cyber-cyan","border-l-cyber-purple","border-l-cyber-emerald","border-l-cyber-blue"],i=["bg-cyber-cyan/10 text-cyber-cyan","bg-cyber-purple/10 text-cyber-purple","bg-cyber-emerald/10 text-cyber-emerald","bg-cyber-blue/10 text-cyber-blue"],s=["🌐","💻","⚛️","🧬"];e.innerHTML=t.coreModules.map((o,a)=>`
        <div class="glass-card p-6 border-l-4 ${n[a%n.length]}">
          <div class="flex items-center gap-3 mb-3">
            <span class="p-2 rounded ${i[a%i.length]} text-lg">${s[a%s.length]}</span>
            <h4 class="text-lg font-bold font-display text-white">${o.title}</h4>
          </div>
          <p class="text-slate-300 text-sm leading-relaxed">
            ${o.desc}
          </p>
        </div>
      `).join("")}}renderAbout(t){const e=document.getElementById("about-paragraphs");e&&t.bioParagraphs&&(e.innerHTML=t.bioParagraphs.map(s=>`<p>${s}</p>`).join(""));const n=document.getElementById("about-highlights-grid");if(n&&t.highlights){const s=["text-cyber-cyan","text-cyber-purple","text-cyber-emerald","text-cyber-blue"];n.innerHTML=t.highlights.map((o,a)=>`
          <div class="glass-card p-4">
            <span class="text-xs ${s[a%s.length]} font-mono block mb-1 uppercase">${o.label}</span>
            <span class="text-sm font-semibold text-white">${o.value}</span>
          </div>
        `).join("")}const i=document.getElementById("about-stats-container");if(i&&t.stats){const s=["text-cyber-cyan","text-cyber-purple","text-cyber-emerald","text-white"];i.innerHTML=t.stats.map((o,a)=>`
          <div class="${a<t.stats.length-1?"border-b border-white/10 pb-3":""}">
            <div class="text-3xl font-extrabold font-display ${s[a%s.length]}">${o.number}</div>
            <div class="text-xs text-slate-400 font-mono mt-1">${o.label}</div>
          </div>
        `).join("")}}renderSkills(t){const e=document.getElementById("skills-list-technical"),n=document.getElementById("skills-list-tools");e&&t.categories[0]&&(e.innerHTML=t.categories[0].items.map(i=>`
        <div class="skill-item group">
          <div class="flex justify-between items-center text-xs sm:text-sm font-mono mb-1.5">
            <span class="text-slate-200 group-hover:text-cyber-cyan transition-colors flex items-center gap-2">
              <span>${i.name}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan">${i.tag}</span>
            </span>
            <span class="text-cyber-cyan font-bold">${i.level}%</span>
          </div>
          <div class="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div class="h-full bg-gradient-to-r from-cyber-blue to-cyber-cyan rounded-full transition-all duration-1000" style="width: ${i.level}%"></div>
          </div>
        </div>
      `).join("")),n&&t.categories[1]&&(n.innerHTML=t.categories[1].items.map(i=>`
        <div class="skill-item group">
          <div class="flex justify-between items-center text-xs sm:text-sm font-mono mb-1.5">
            <span class="text-slate-200 group-hover:text-cyber-purple transition-colors flex items-center gap-2">
              <span>${i.name}</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple">${i.tag}</span>
            </span>
            <span class="text-cyber-purple font-bold">${i.level}%</span>
          </div>
          <div class="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div class="h-full bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full transition-all duration-1000" style="width: ${i.level}%"></div>
          </div>
        </div>
      `).join(""))}renderProjects(t){const e=document.getElementById("projects-grid");e&&(e.innerHTML=t.map(n=>`
      <div class="glass-card overflow-hidden group hover:border-cyber-cyan/50 transition-all duration-500 project-3d-card" data-project-id="${n.id}">
        <div class="relative h-48 sm:h-56 overflow-hidden scanline-box">
          <img src="${n.image}" alt="${n.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent"></div>
          <span class="absolute top-3 left-3 text-[10px] font-mono px-2.5 py-1 rounded bg-black/70 border border-cyber-cyan/40 text-cyber-cyan backdrop-blur-md">
            ${n.category}
          </span>
          <span class="absolute top-3 right-3 text-[10px] font-mono px-2.5 py-1 rounded bg-black/70 border border-cyber-purple/40 text-cyber-purple backdrop-blur-md">
            ${n.metrics}
          </span>
        </div>

        <div class="p-6">
          <h3 class="text-xl font-bold font-display text-white group-hover:text-cyber-cyan transition-colors mb-2">
            ${n.title}
          </h3>
          <p class="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
            ${n.description}
          </p>

          <div class="flex flex-wrap gap-1.5 mb-6">
            ${n.technologies.map(i=>`
              <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                ${i}
              </span>
            `).join("")}
          </div>

          <div class="flex items-center gap-3 pt-4 border-t border-white/10">
            <button class="view-project-details-btn text-xs font-mono px-3.5 py-2 rounded bg-cyber-cyan/15 hover:bg-cyber-cyan hover:text-black text-cyber-cyan transition-all flex items-center gap-1.5" data-id="${n.id}">
              <span>View Details</span>
              <span>→</span>
            </button>
            <a href="${n.githubUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono px-3 py-2 rounded bg-white/5 hover:bg-white/15 text-slate-300 transition-all flex items-center gap-1">
              <span>GitHub Repo</span>
            </a>
          </div>
        </div>
      </div>
    `).join(""))}renderCertifications(t,e){const n=document.getElementById("certifications-list");n&&(n.innerHTML=t.map(s=>`
        <div class="glass-card p-5 border-l-4 border-l-cyber-cyan flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-cyber-cyan text-sm">📜</span>
              <h4 class="text-base font-bold font-display text-white">${s.title}</h4>
            </div>
            <p class="text-xs font-mono text-cyber-muted">${s.issuer} • ${s.date}</p>
            <p class="text-xs text-slate-300 mt-1">${s.skills}</p>
          </div>
          <a href="${s.credentialUrl}" target="_blank" rel="noopener noreferrer" class="text-xs font-mono px-3 py-1.5 rounded bg-cyber-cyan/10 hover:bg-cyber-cyan hover:text-black text-cyber-cyan border border-cyber-cyan/30 transition-all whitespace-nowrap self-start sm:self-center">
            ${s.status} ↗
          </a>
        </div>
      `).join(""));const i=document.getElementById("achievements-list");i&&(i.innerHTML=e.map(s=>`
        <div class="border-b border-white/10 pb-3 last:border-0 last:pb-0">
          <div class="flex items-center justify-between gap-2 mb-1">
            <h5 class="text-sm font-bold font-display text-white">${s.title}</h5>
            <span class="text-[11px] font-mono text-cyber-emerald px-1.5 py-0.5 rounded bg-cyber-emerald/10 border border-cyber-emerald/30">${s.year}</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">${s.desc}</p>
        </div>
      `).join(""))}renderContact(t){const e=document.getElementById("contact-email-text");e&&(e.textContent=t.email);const n=document.getElementById("contact-linkedin-link");n&&(n.href=t.linkedin);const i=document.getElementById("contact-github-link");i&&(i.href=t.github);const s=document.getElementById("contact-closing");s&&(s.textContent=`"${t.closingMessage}"`)}initSectionAnimations(){document.querySelectorAll(".journey-section").forEach(e=>{So.fromTo(e.children,{opacity:0,y:40},{opacity:1,y:0,duration:1.2,ease:"power3.out",stagger:.15,scrollTrigger:{trigger:e,start:"top 75%",toggleActions:"play none none reverse"}})})}initInteractions(){const t=document.getElementById("hero-cta-btn");t&&t.addEventListener("click",()=>{ji.playClick();const s=document.getElementById("section-about");s&&this.lenis&&this.lenis.scrollTo(s,{duration:1.8})});const e=document.getElementById("copy-email-btn");e&&e.addEventListener("click",()=>{ji.playClick();const s=vc.contact.email;navigator.clipboard.writeText(s).then(()=>{this.showToast("✓ Email address copied to clipboard!"),e.textContent="Copied!",setTimeout(()=>{e.textContent="Copy Email"},2500)})}),document.addEventListener("click",s=>{const o=s.target.closest(".view-project-details-btn");if(o){ji.playClick();const a=o.getAttribute("data-id"),l=vc.projects.find(c=>c.id===a);l&&this.openProjectModal(l)}});const n=document.getElementById("close-modal-btn"),i=document.getElementById("project-modal");n&&i&&(n.addEventListener("click",()=>{ji.playClick(),i.classList.add("hidden")}),i.addEventListener("click",s=>{s.target===i&&i.classList.add("hidden")})),document.querySelectorAll("a, button").forEach(s=>{s.addEventListener("mouseenter",()=>ji.playHover())})}openProjectModal(t){const e=document.getElementById("project-modal"),n=document.getElementById("modal-content");!e||!n||(n.innerHTML=`
      <div class="space-y-4">
        <span class="cyber-badge text-xs">${t.category}</span>
        <h3 class="text-2xl font-bold font-display text-white">${t.title}</h3>
        <div class="rounded-xl overflow-hidden max-h-60 mb-4 border border-cyber-cyan/30">
          <img src="${t.image}" alt="${t.title}" class="w-full h-full object-cover" />
        </div>
        <p class="text-slate-300 text-sm leading-relaxed">${t.description}</p>
        <div class="bg-black/40 p-3 rounded-lg border border-cyber-cyan/20">
          <span class="text-xs font-mono text-cyber-cyan block mb-1">KEY PERFORMANCE METRIC</span>
          <span class="text-base font-bold text-white">${t.metrics}</span>
        </div>
        <div class="flex flex-wrap gap-2 pt-2">
          ${t.technologies.map(i=>`<span class="text-xs font-mono px-2 py-1 rounded bg-white/10 text-cyber-cyan">${i}</span>`).join("")}
        </div>
        <div class="flex gap-4 pt-4 border-t border-white/10">
          <a href="${t.githubUrl}" target="_blank" rel="noopener noreferrer" class="cyber-btn-primary text-xs flex-1 text-center">
            View Source on GitHub
          </a>
        </div>
      </div>
    `,e.classList.remove("hidden"))}showToast(t){const e=document.getElementById("toast-container");if(!e)return;const n=document.createElement("div");n.className="glass-card px-4 py-2.5 text-xs font-mono text-cyber-cyan border-cyber-cyan/60 shadow-glow-cyan mb-2 animate-bounce",n.textContent=t,e.appendChild(n),setTimeout(()=>{n.remove()},3e3)}}window.addEventListener("DOMContentLoaded",()=>{new fE});
