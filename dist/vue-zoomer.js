// vue-zoomer v0.3.10 - Jarvis Niu
// https://github.com/jarvisniu/vue-zoomer

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueZoomer = factory());
}(this, (function () { 'use strict';

  /* esm.sh - esbuild bundle(lodash@4.17.20/debounce) esnext production */
  if (typeof global === "undefined") var global = window;var ce=Object.create,S=Object.defineProperty,se=Object.getPrototypeOf,ue=Object.prototype.hasOwnProperty,be=Object.getOwnPropertyNames,le=Object.getOwnPropertyDescriptor,ge=e=>S(e,"__esModule",{value:!0}),a=(e,r)=>()=>(r||(r={exports:{}},e(r.exports,r)),r.exports),de=(e,r,n)=>{if(ge(e),r&&typeof r=="object"||typeof r=="function")for(let i of be(r))!ue.call(e,i)&&i!=="default"&&S(e,i,{get:()=>r[i],enumerable:!(n=le(r,i))||n.enumerable});return e},me=e=>e&&e.__esModule?e:de(S(e!=null?ce(se(e)):{},"default",{value:e,enumerable:!0}),e),x=a((rr,E)=>{function pe(e){var r=typeof e;return e!=null&&(r=="object"||r=="function")}E.exports=pe;}),N=a((tr,L)=>{var ye=typeof global=="object"&&global&&global.Object===Object&&global;L.exports=ye;}),O=a((nr,G)=>{var Te=N(),je=typeof self=="object"&&self&&self.Object===Object&&self,Se=Te||je||Function("return this")();G.exports=Se;}),w=a((ir,R)=>{var xe=O(),Oe=function(){return xe.Date.now()};R.exports=Oe;}),v=a((or,P)=>{var ve=O(),qe=ve.Symbol;P.exports=qe;}),$=a((ar,W)=>{var C=v(),M=Object.prototype,he=M.hasOwnProperty,Ie=M.toString,m=C?C.toStringTag:void 0;function _e(e){var r=he.call(e,m),n=e[m];try{e[m]=void 0;var i=!0;}catch(b){}var c=Ie.call(e);return i&&(r?e[m]=n:delete e[m]),c}W.exports=_e;}),B=a((fr,A)=>{var ke=Object.prototype,Ee=ke.toString;function Le(e){return Ee.call(e)}A.exports=Le;}),H=a((cr,F)=>{var U=v(),Ne=$(),Ge=B(),Re="[object Null]",we="[object Undefined]",D=U?U.toStringTag:void 0;function Pe(e){return e==null?e===void 0?we:Re:D&&D in Object(e)?Ne(e):Ge(e)}F.exports=Pe;}),z=a((sr,X)=>{function We(e){return e!=null&&typeof e=="object"}X.exports=We;}),K=a((ur,J)=>{var Ce=H(),Me=z(),$e="[object Symbol]";function Ae(e){return typeof e=="symbol"||Me(e)&&Ce(e)==$e}J.exports=Ae;}),Z=a((br,Q)=>{var V=x(),Be=K(),Y=0/0,Fe=/^\s+|\s+$/g,Ue=/^[-+]0x[0-9a-f]+$/i,De=/^0b[01]+$/i,He=/^0o[0-7]+$/i,Xe=parseInt;function ze(e){if(typeof e=="number")return e;if(Be(e))return Y;if(V(e)){var r=typeof e.valueOf=="function"?e.valueOf():e;e=V(r)?r+"":r;}if(typeof e!="string")return e===0?e:+e;e=e.replace(Fe,"");var n=De.test(e);return n||He.test(e)?Xe(e.slice(2),n?2:8):Ue.test(e)?Y:+e}Q.exports=ze;}),te=a((lr,ee)=>{var Je=x(),q=w(),re=Z(),Ke="Expected a function",Qe=Math.max,Ve=Math.min;function Ye(e,r,n){var i,c,b,u,o,s,l=0,h=!1,g=!1,y=!0;if(typeof e!="function")throw new TypeError(Ke);r=re(r)||0,Je(n)&&(h=!!n.leading,g="maxWait"in n,b=g?Qe(re(n.maxWait)||0,r):b,y="trailing"in n?!!n.trailing:y);function T(t){var f=i,d=c;return i=c=void 0,l=t,u=e.apply(d,f),u}function ie(t){return l=t,o=setTimeout(p,r),h?T(t):u}function oe(t){var f=t-s,d=t-l,k=r-f;return g?Ve(k,b-d):k}function I(t){var f=t-s,d=t-l;return s===void 0||f>=r||f<0||g&&d>=b}function p(){var t=q();if(I(t))return _(t);o=setTimeout(p,oe(t));}function _(t){return o=void 0,y&&i?T(t):(i=c=void 0,u)}function ae(){o!==void 0&&clearTimeout(o),l=0,i=s=c=o=void 0;}function fe(){return o===void 0?u:_(q())}function j(){var t=q(),f=I(t);if(i=arguments,c=this,s=t,f){if(o===void 0)return ie(s);if(g)return clearTimeout(o),o=setTimeout(p,r),T(s)}return o===void 0&&(o=setTimeout(p,r)),u}return j.cancel=ae,j.flush=fe,j}ee.exports=Ye;}),ne=me(te()),Ze=ne.default;

  /**
   * Detect double tap events
   * # Deals with:
   * - Time intervals between taps
   * - Swipe will stop the taps
   * # Usage:
   * let tapDetector = new TapDetector()
   * tapDetector.attach(this.$el) // in mounted
   * tapDetector.detach(this.$el) // in destroy
   * tapDetector.onSingle(callback)
   * tapDetector.onDouble(callback)
   */

  function TapDetector () {

    // Callbacks -----------------------------------------------------------------

    let singleTapCallbacks = [];
    let doubleTapCallbacks = [];

    function triggerCallbacks (cbList, arg) {
      cbList.forEach(cbItem => {
        cbItem.call(null, arg);
      });
    }

    this.onSingleTap = function (cb) {
      if (typeof cb === 'function' && !singleTapCallbacks.includes(cb)) {
        singleTapCallbacks.push(cb);
      }
    };
    this.onDoubleTap = function (cb) {
      if (typeof cb === 'function' && !doubleTapCallbacks.includes(cb)) {
        doubleTapCallbacks.push(cb);
      }
    };

    this.attach = function (dom) {
      if (!(dom instanceof Element)) {
        console.error('TapDetector.attach: arg must be an Element');
        return
      }
      dom.addEventListener('touchstart', onTouchStart);
      dom.addEventListener('touchmove', onTouchMove);
      dom.addEventListener('touchend', onTouchEnd);
      dom.addEventListener('mousedown', onMouseDown);
      dom.addEventListener('mouseup', onMouseUp);
      dom.addEventListener('mousemove', onMouseMove);
    };

    this.detach = function (dom) {
      dom.removeEventListener('touchstart', onTouchStart);
      dom.removeEventListener('touchmove', onTouchMove);
      dom.removeEventListener('touchend', onTouchEnd);
      dom.removeEventListener('mousedown', onMouseDown);
      dom.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('mousemove', onMouseMove);
    };

    // Main logic ----------------------------------------------------------------

    // in touch mode mouse events will be disabled. Otherwise touches will
    // trigger both touchend end mouseup, i.e. one touch triggers two onPointerUp.
    let isTouchMode = false;
    let lastTapTimestamp = 0;
    let tappedCount = 0;
    let touchMovedLength = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;

    function onTouchStart (ev) {
      isTouchMode = true;
      // console.log('onTouchStart')
      if (ev.touches.length === 1) {
        onPointerDown(ev.touches[0].clientX, ev.touches[0].clientY);
      }
    }
    function onTouchEnd (ev) {
      // console.log('onTouchEnd')
      if (ev.touches.length === 0) {
        onPointerUp();
      }
    }
    function onTouchMove (ev) {
      // console.log('onTouchMove', ev)
      if (ev.touches.length === 1) {
        onPointerMove(ev.touches[0].clientX, ev.touches[0].clientY);
      }
    }

    function onMouseDown (ev) {
      if (isTouchMode) return

      // console.log('onMouseDown')
      onPointerDown(ev.clientX, ev.clientY);
    }
    function onMouseUp (ev) {
      if (isTouchMode) return

      // console.log('onMouseUp')
      onPointerUp();
    }
    function onMouseMove (ev) {
      if (isTouchMode) return

      // console.log('onMouseMove', ev)
      if (ev.button === 0) {
        onPointerMove(ev.clientX, ev.clientY);
      }
    }

    function onPointerDown (x, y) {
      lastPointerX = x;
      lastPointerY = y;
      touchMovedLength = 0;
    }
    function onPointerUp () {
      let currTimeStamp = Date.now();
      // console.log('touchMovedLength', touchMovedLength)
      if (touchMovedLength < 10) {
        // Only when no sliding two far is considered as a valid tap
        if (currTimeStamp - lastTapTimestamp < 300) {
          tappedCount += 1;
        } else {
          tappedCount = 1;
        }
        lastTapTimestamp = Date.now();
        // console.log('tappedCount', tappedCount)
        triggerCallbacks(singleTapCallbacks, {
          clientX: lastPointerX,
          clientY: lastPointerY,
        });
        if (tappedCount === 2) {
          triggerCallbacks(doubleTapCallbacks, {
            clientX: lastPointerX,
            clientY: lastPointerY,
          });
          tappedCount = 0; // clear count on maximum tap count
        }
      }
      touchMovedLength = 0;
    }
    function onPointerMove (x, y) {
      let deltaX = lastPointerX - x;
      let deltaY = lastPointerY - y;
      let length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      // console.log('onTouchMove length', length)
      touchMovedLength += length;
      lastPointerX = x;
      lastPointerY = y;
    }
  }

  //

  var script = {
    props: {
      minScale: { type: Number, default: 1 },
      maxScale: { type: Number, default: 5 },
      zoomed: { type: Boolean, default: false },
      resetTrigger: { type: Number, default: 1e5 },
      aspectRatio: { type: Number, default: 1 },
      backgroundColor: { type: String, default: 'transparent' },
      pivot: { type: String, default: 'cursor' }, // other options: image-center
      zoomingElastic: { type: Boolean, default: true },
      limitTranslation: { type: Boolean, default: true },
      doubleClickToZoom: { type: Boolean, default: true },
      mouseWheelToZoom: { type: Boolean, default: true },
    },
    data () {
      return {
        // Container sizes, used to determin the initial zoomer size.
        // Need to reactive to window resizing.
        containerWidth: 1,
        containerHeight: 1,
        containerLeft: 0,
        containerTop: 0,
        // Store values: Interactions will at last change these values.
        // After rotation or resize, these values will keep still.
        // These three values are all relative to the container size.
        translateX: 0,
        animTranslateX: 0,
        translateY: 0,
        animTranslateY: 0,
        scale: 1,
        animScale: 1,
        // Mouse states
        lastFullWheelTime: 0,
        lastWheelTime: 0,
        lastWheelDirection: 'y',
        isPointerDown: false,
        pointerPosX: -1,
        pointerPosY: -1,
        twoFingerInitDist: 0,
        panLocked: true,
        // Others
        raf: null,
        tapDetector: null,
      }
    },
    computed: {
      wrapperStyle () {
        let translateX = this.containerWidth * this.animTranslateX;
        let translateY = this.containerHeight * this.animTranslateY;
        return {
          transform: [
            `translate(${ translateX }px, ${ translateY }px)`,
            `scale(${ this.animScale })`,
          ].join(' ')
        }
      },
    },
    watch: {
      scale (val) {
        if (val !== 1) {
          this.$emit('update:zoomed', true);
          this.panLocked = false;
        }
      },
      resetTrigger: 'reset',
    },
    mounted () {
      this.tapDetector = new TapDetector();
      this.tapDetector.attach(this.$el);
      if (this.doubleClickToZoom) {
        this.tapDetector.onDoubleTap(this.onDoubleTap);
      }
      // console.log('container size: ', this.containerWidth, this.containerHeight)
      window.addEventListener('resize', this.onWindowResize);
      this.onWindowResize();
      this.refreshContainerPos();
      this.loop();
    },
    destroyed () {
      this.tapDetector.detach(this.$el);
      window.removeEventListener('resize', this.onWindowResize);
      window.cancelAnimationFrame(this.raf);
      // console.log('destroy')
    },
    methods: {
      // API ---------------------------------------------------------------------
      reset () {
        this.scale = 1;
        this.panLocked = true;
        this.translateX = 0;
        this.translateY = 0;
      },
      zoomIn(scale = 2) {
        this.tryToScale(scale);
        this.onInteractionEnd();
      },
      zoomOut(scale = 0.5) {
        this.tryToScale(scale);
        this.onInteractionEnd();
      },
      zoomToPosition( scale = 2, x, y) {
        this.translateX = x / this.containerWidth;
        this.translateY = y / this.containerHeight;
        this.scale = scale;
      },
      // Main Logic --------------------------------------------------------------
      // scale
      // Zoom the image with the point at the pointer(mouse or pinch center) pinned.
      // Simplify: This can be regard as vector pointer to old-image-center scaling.
      tryToScale (scaleDelta) {
        let newScale = this.scale * scaleDelta;
        if (this.zoomingElastic) {
          // damping
          if (newScale < this.minScale || newScale > this.maxScale) {
            let log = Math.log2(scaleDelta);
            log *= 0.2;
            scaleDelta = Math.pow(2, log);
            newScale = this.scale * scaleDelta;
          }
        } else {
          if (newScale < this.minScale) newScale = this.minScale;
          else if (newScale > this.maxScale) newScale = this.maxScale;
        }
        scaleDelta = newScale / this.scale;
        this.scale = newScale;
        if (this.pivot !== 'image-center') {
          let normMousePosX = (this.pointerPosX - this.containerLeft) / this.containerWidth;
          let normMousePosY = (this.pointerPosY - this.containerTop) / this.containerHeight;
          this.translateX = (0.5 + this.translateX - normMousePosX) * scaleDelta + normMousePosX - 0.5;
          this.translateY = (0.5 + this.translateY - normMousePosY) * scaleDelta + normMousePosY - 0.5;
        }
      },
      setPointerPosCenter () {
        this.pointerPosX = this.containerLeft + this.containerWidth / 2;
        this.pointerPosY = this.containerTop + this.containerHeight / 2;
      },
      // pan
      onPointerMove (newMousePosX, newMousePosY) {
        if (this.isPointerDown) {
          let pixelDeltaX = newMousePosX - this.pointerPosX;
          let pixelDeltaY = newMousePosY - this.pointerPosY;
          // console.log('pixelDeltaX, pixelDeltaY', pixelDeltaX, pixelDeltaY)
          if (!this.panLocked) {
            this.translateX += pixelDeltaX / this.containerWidth;
            this.translateY += pixelDeltaY / this.containerHeight;
          }
        }
        this.pointerPosX = newMousePosX;
        this.pointerPosY = newMousePosY;
      },
      onInteractionEnd: Ze(function ()  {
        this.limit();
        this.panLocked = this.scale === 1;
        this.$emit('update:zoomed', !this.panLocked);
      }, 100),
      // limit the scale between max and min and the translate within the viewport
      limit () {
        // scale
        if (this.scale < this.minScale) {
          this.scale = this.minScale;
          // FIXME this sometimes will not reset when pinching in
          // this.tryToScale(this.minScale / this.scale)
        } else if (this.scale > this.maxScale) {
          this.tryToScale(this.maxScale / this.scale);
        }
        // translate
        if (this.limitTranslation) {
          let translateLimit = this.calcTranslateLimit();
          if (Math.abs(this.translateX) > translateLimit.x) {
            this.translateX *= translateLimit.x / Math.abs(this.translateX);
          }
          if (Math.abs(this.translateY) > translateLimit.y) {
            this.translateY *= translateLimit.y / Math.abs(this.translateY);
          }
        }
      },
      calcTranslateLimit () {
        if (this.getMarginDirection() === 'y') {
          let imageToContainerRatio = this.containerWidth / this.aspectRatio / this.containerHeight;
          let translateLimitY = (this.scale * imageToContainerRatio - 1) / 2;
          if (translateLimitY < 0) translateLimitY = 0;
          return {
            x: (this.scale - 1) / 2,
            y: translateLimitY,
          }
        } else {
          let imageToContainerRatio = this.containerHeight * this.aspectRatio / this.containerWidth;
          let translateLimitX = (this.scale * imageToContainerRatio - 1) / 2;
          if (translateLimitX < 0) translateLimitX = 0;
          return {
            x: translateLimitX,
            y: (this.scale - 1) / 2,
          }
        }
      },
      getMarginDirection () {
        let containerRatio = this.containerWidth / this.containerHeight;
        return containerRatio > this.aspectRatio ? 'x' : 'y'
      },
      onDoubleTap (ev) {
        if (this.scale === 1) {
          if (ev.clientX > 0) {
            this.pointerPosX = ev.clientX;
            this.pointerPosY = ev.clientY;
          }
          this.tryToScale(Math.min(3, this.maxScale));
        } else {
          this.reset();
        }
        this.onInteractionEnd();
      },
      // reactive
      onWindowResize () {
        let styles = window.getComputedStyle(this.$el);
        this.containerWidth = parseFloat(styles.width);
        this.containerHeight = parseFloat(styles.height);
        this.setPointerPosCenter();
        this.limit();
      },
      refreshContainerPos () {
        let rect = this.$el.getBoundingClientRect();
        this.containerLeft = rect.left;
        this.containerTop = rect.top;
      },
      loop () {
        this.animScale = this.gainOn(this.animScale, this.scale);
        this.animTranslateX = this.gainOn(this.animTranslateX, this.translateX);
        this.animTranslateY = this.gainOn(this.animTranslateY, this.translateY);
        this.raf = window.requestAnimationFrame(this.loop);
        // console.log('loop', this.raf)
      },
      gainOn (from, to) {
        let delta = (to - from) * 0.3;
        // console.log('gainOn', from, to, from + delta)
        if (Math.abs(delta) > 1e-5) {
          return from + delta
        } else {
          return to
        }
      },
      // Mouse Events ------------------------------------------------------------
      // Mouse wheel scroll,  TrackPad pinch or TrackPad scroll
      onMouseWheel (ev) {
        if (!this.mouseWheelToZoom) return
        // prevent is used to stop the page scroll elastic effects
        ev.preventDefault();
        if (ev.detail) ev.wheelDelta = ev.detail * -10;
        let currTime = Date.now();
        if (Math.abs(ev.wheelDelta) === 120) {
          // Throttle the TouchPad pinch on Mac, or it will be too sensitive
          if (currTime - this.lastFullWheelTime > 50) {
            this.onMouseWheelDo(ev.wheelDelta);
            this.lastFullWheelTime = currTime;
          }
        } else {
          if (currTime - this.lastWheelTime > 50 && typeof ev.deltaX === 'number') {
            this.lastWheelDirection = (ev.detail == 0 && Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) ? 'x' : 'y';
            if (this.lastWheelDirection === 'x') {
              this.$emit('swipe', ev.deltaX > 0 ? 'left' : 'right');
            }
          }
          if (this.lastWheelDirection === 'y') {
            this.onMouseWheelDo(ev.wheelDelta);
          }
        }
        this.lastWheelTime = currTime;
      },
      onMouseWheelDo (wheelDelta) {
        // Value basis: One mouse wheel (wheelDelta=+-120) means 1.25/0.8 scale.
        let scaleDelta = Math.pow(1.25, wheelDelta / 120);
        this.tryToScale(scaleDelta);
        this.onInteractionEnd();
      },
      onMouseDown (ev) {
        this.refreshContainerPos();
        this.isPointerDown = true;
        // Open the context menu then click other place will skip the mousemove events.
        // This will cause the pointerPosX/Y NOT sync, then we will need to fix it on mousedown event.
        this.pointerPosX = ev.clientX;
        this.pointerPosY = ev.clientY;
        // console.log('onMouseDown', ev)
      },
      onMouseUp (ev) {
        this.isPointerDown = false;
        this.onInteractionEnd();
      },
      onMouseMove (ev) {
        this.onPointerMove(ev.clientX, ev.clientY);
        // console.log('onMouseMove client, offset', ev.clientX, ev.clientY)
      },
      // Touch Events ------------------------------------------------------------
      onTouchStart (ev) {
        if (ev.touches.length === 1) {
          this.refreshContainerPos();
          this.pointerPosX = ev.touches[0].clientX;
          this.pointerPosY = ev.touches[0].clientY;
          this.isPointerDown = true;
        } else if (ev.touches.length === 2) {
          this.isPointerDown = true;
          // pos
          this.pointerPosX = (ev.touches[0].clientX + ev.touches[1].clientX) / 2;
          this.pointerPosY = (ev.touches[0].clientY + ev.touches[1].clientY) / 2;
          // dist
          let distX = ev.touches[0].clientX - ev.touches[1].clientX;
          let distY = ev.touches[0].clientY - ev.touches[1].clientY;
          this.twoFingerInitDist = Math.sqrt(distX * distX + distY * distY);
        }
        // console.log('onTouchStart', ev.touches)
      },
      onTouchEnd (ev) {
        if (ev.touches.length === 0) {
          this.isPointerDown = false;
          // Near 1 to set 1
          if (Math.abs(this.scale - 1) < 0.1) this.scale = 1;
          this.onInteractionEnd();
        } else if (ev.touches.length === 1) {
          this.pointerPosX = ev.touches[0].clientX;
          this.pointerPosY = ev.touches[0].clientY;
        }
        // console.log('onTouchEnd', ev.touches.length)
      },
      onTouchMove (ev) {
        if (ev.touches.length === 1) {
          this.onPointerMove(ev.touches[0].clientX, ev.touches[0].clientY);
        } else if (ev.touches.length === 2) {
          // pos
          let newMousePosX = (ev.touches[0].clientX + ev.touches[1].clientX) / 2;
          let newMousePosY = (ev.touches[0].clientY + ev.touches[1].clientY) / 2;
          this.onPointerMove(newMousePosX, newMousePosY);
          this.pointerPosX = newMousePosX;
          this.pointerPosY = newMousePosY;
          // dist
          let distX = ev.touches[0].clientX - ev.touches[1].clientX;
          let distY = ev.touches[0].clientY - ev.touches[1].clientY;
          let newTwoFingerDist = Math.sqrt(distX * distX + distY * distY);
          this.tryToScale(newTwoFingerDist / this.twoFingerInitDist);
          this.twoFingerInitDist = newTwoFingerDist;
        }
        // console.log('onTouchMove', this.pointerPosX, this.pointerPosY)
      },
    },
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      const options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      let hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              const originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              const existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  const isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return (id, style) => addStyle(id, style);
  }
  let HEAD;
  const styles = {};
  function addStyle(id, css) {
      const group = isOldIE ? css.media || 'default' : id;
      const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          let code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  style.element.setAttribute('media', css.media);
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              const index = style.ids.size - 1;
              const textNode = document.createTextNode(code);
              const nodes = style.element.childNodes;
              if (nodes[index])
                  style.element.removeChild(nodes[index]);
              if (nodes.length)
                  style.element.insertBefore(textNode, nodes[index]);
              else
                  style.element.appendChild(textNode);
          }
      }
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "vue-zoomer",
        style: { backgroundColor: _vm.backgroundColor },
        on: {
          mousewheel: _vm.onMouseWheel,
          DOMMouseScroll: _vm.onMouseWheel,
          mousedown: _vm.onMouseDown,
          mouseup: _vm.onMouseUp,
          mousemove: _vm.onMouseMove,
          mouseout: _vm.setPointerPosCenter,
          touchstart: _vm.onTouchStart,
          touchend: _vm.onTouchEnd,
          touchmove: _vm.onTouchMove,
        },
      },
      [
        _c(
          "div",
          { staticClass: "zoomer", style: _vm.wrapperStyle },
          [_vm._t("default")],
          2
        ),
      ]
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-64ebbfd3_0", { source: "\n.vue-zoomer[data-v-64ebbfd3] {\n  overflow: hidden;\n}\n.zoomer[data-v-64ebbfd3] {\n  transform-origin: 50% 50%;\n  width: 100%;\n  height: 100%;\n}\n.zoomer > img[data-v-64ebbfd3] {\n  /* remove the 4px gap below the image */\n  vertical-align: top;\n  user-drag: none;\n  -webkit-user-drag: none;\n  -moz-user-drag: none;\n}\n", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-64ebbfd3";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //


  const SLIDE_WIDTH_THRESH = 50; // in px

  var script$1 = {
    props: {
      value: { type: Number, required: true },
      list: { type: Array, required: true },
      backgroundColor: { type: String, default: '#333' },
      pivot: { type: String, default: 'cursor' },
      zoomingElastic: { type: Boolean, default: true },
      limitTranslation: { type: Boolean, default: true },
      doubleClickToZoom: { type: Boolean, default: true },
      mouseWheelToZoom: { type: Boolean, default: true },
    },
    data () {
      return {
        // env states
        containerWidth: 1,
        containerHeight: 1,
        // main states
        selIndex: this.value,
        animSelIndex: this.value,
        currentZoomed: false,
        autoSliding: false,
        imageAspectRatios: [], // aspect ratio (width / height) of images
        // interaction states
        isPointerDown: false,
        lastPointerX: 0,
        slideOffsetX: 0,
      }
    },
    computed: {
      middleStyle () {
        return {
          left: `${ 0 + this.slideOffsetX }px`,
        }
      },
      leftStyle () {
        return {
          left: `${ -this.containerWidth + this.slideOffsetX }px`,
        }
      },
      rightStyle () {
        return {
          left: `${ this.containerWidth + this.slideOffsetX }px`,
        }
      },
      slideThresh () {
        return Math.max(SLIDE_WIDTH_THRESH, this.containerWidth * 0.1)
      },
    },
    watch: {
      value (val) {
        if (val !== this.animSelIndex) {
          this.selIndex = val;
          this.animSelIndex = val;
        }
      },
      selIndex() {
        this.$nextTick(() => {
          this.$refs.zoomers.forEach(zoomer => {
            zoomer.refreshContainerPos();
          });
        });
      },
    },
    mounted () {
      window.addEventListener('resize', this.onWindowResize);
      this.onWindowResize();
    },
    destroyed () {
      window.removeEventListener('resize', this.onWindowResize);
    },
    methods: {
      // api ---------------------------------------------------------------------
      reset () {
        this.$refs.zoomers.forEach(zoomer => {
          zoomer.reset();
        });
      },
      zoomIn (scale) {
        if (this.$refs.zoomers[1]) this.$refs.zoomers[1].zoomIn(scale);
      },
      zoomOut (scale) {
        if (this.$refs.zoomers[1]) this.$refs.zoomers[1].zoomOut(scale);
      },
      // events ------------------------------------------------------------------
      onWindowResize () {
        let styles = window.getComputedStyle(this.$el);
        this.containerWidth = parseFloat(styles.width);
        this.containerHeight = parseFloat(styles.height);
      },
      onPointerMove (deltaX) {
        if (this.isPointerDown && !this.currentZoomed) {
          let factor = (
            (this.selIndex === 0 && deltaX > 0 && this.slideOffsetX + deltaX > 0) ||
            (this.selIndex === this.list.length - 1 && deltaX < 0 && this.slideOffsetX + deltaX < 0)
          ) ? 0.3 : 1;
          this.slideOffsetX += deltaX * factor;
        }
      },
      onPointerUp () {
        if (this.slideOffsetX < -this.slideThresh) {
          // next page
          this.paginate(1);
        } else if (this.slideOffsetX > this.slideThresh) {
          // prev page
          this.paginate(-1);
        } else {
          // only apply the animation
          this.paginate(0);
        }
      },
      // Stop Firefox dragging the image
      onImageDragStart(ev) {
        ev.preventDefault();
        return false
      },
      paginate (deltaIndex) {
        let targetIndex = this.selIndex + deltaIndex;
        if (targetIndex < 0 || targetIndex >= this.list.length) {
          this.slideOffsetX = 0;
          return
        }

        this.slideOffsetX = this.containerWidth * -deltaIndex;
        this.autoSliding = true;
        // update the selIndex before the animation to remove the delay feeling
        this.$emit('input', targetIndex);
        this.animSelIndex = targetIndex;
        setTimeout(() => {
          this.selIndex = targetIndex;
          this.slideOffsetX = 0;
          this.autoSliding = false;
        }, 400);
      },
      onMouseDown (ev) {
        this.isPointerDown = true;
        this.lastPointerX = ev.clientX;
      },
      onMouseUp (ev) {
        this.isPointerDown = false;
        this.onPointerUp();
      },
      onMouseMove (ev) {
        if (this.isPointerDown) {
          this.onPointerMove(ev.clientX - this.lastPointerX);
          this.lastPointerX = ev.clientX;
        }
      },
      onTouchStart (ev) {
        if (ev.touches.length === 1) {
          this.isPointerDown = true;
          this.lastPointerX = ev.touches[0].clientX;
        }
      },
      onTouchEnd (ev) {
        if (ev.touches.length === 0) {
          this.isPointerDown = false;
          this.onPointerUp();
        }
      },
      onTouchMove (ev) {
        if (ev.touches.length === 1) {
          this.onPointerMove(ev.touches[0].clientX - this.lastPointerX);
          this.lastPointerX = ev.touches[0].clientX;
        }
      },
      onImageLoad (index, ev) {
        let aspectRatio = ev.target.naturalWidth / ev.target.naturalHeight;
        this.$set(this.imageAspectRatios, index, aspectRatio);
      },
      onImageSwipe (direction) {
        this.paginate(direction == 'right' ? -1 : 1);
      },
    },
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "div",
      {
        staticClass: "vue-zoomer-gallery",
        class: {
          anim: _vm.autoSliding && !_vm.isPointerDown,
        },
        style: {
          "background-color": _vm.backgroundColor,
        },
        on: {
          mousemove: _vm.onMouseMove,
          mousedown: _vm.onMouseDown,
          mouseout: _vm.onMouseUp,
          mouseup: _vm.onMouseUp,
          touchstart: _vm.onTouchStart,
          touchend: _vm.onTouchEnd,
          touchmove: function ($event) {
            $event.preventDefault();
            return _vm.onTouchMove.apply(null, arguments)
          },
        },
      },
      _vm._l(3, function (n, i) {
        return _c(
          "v-zoomer",
          {
            key: i + "-" + _vm.selIndex,
            ref: "zoomers",
            refInFor: true,
            staticClass: "slide",
            class: ["left", "middle", "right"][i],
            style: [_vm.leftStyle, _vm.middleStyle, _vm.rightStyle][i],
            attrs: {
              "max-scale": 10,
              zoomed: _vm.currentZoomed,
              "reset-trigger": i,
              "aspect-ratio": _vm.imageAspectRatios[_vm.selIndex + i - 1] || 1,
              pivot: _vm.pivot,
              "zooming-elastic": _vm.zoomingElastic,
              "limit-translation": _vm.limitTranslation,
              "double-click-to-zoom": _vm.doubleClickToZoom,
              "mouse-wheel-to-zoom": _vm.mouseWheelToZoom,
            },
            on: {
              "update:zoomed": function ($event) {
                _vm.currentZoomed = $event;
              },
              swipe: _vm.onImageSwipe,
            },
          },
          [
            _vm.selIndex + i - 1 > -1 && _vm.selIndex + i - 1 < _vm.list.length
              ? _c("img", {
                  staticStyle: {
                    "object-fit": "contain",
                    width: "100%",
                    height: "100%",
                  },
                  attrs: {
                    src: _vm.list[_vm.selIndex + i - 1],
                    draggable: "false",
                  },
                  on: {
                    load: function ($event) {
                      return _vm.onImageLoad(_vm.selIndex + i - 1, $event)
                    },
                    dragstart: _vm.onImageDragStart,
                  },
                })
              : _vm._e(),
          ]
        )
      }),
      1
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-604aaaba_0", { source: "\n.vue-zoomer-gallery[data-v-604aaaba] {\n  position: relative;\n  overflow: hidden;\n  user-select: none;\n  min-width: 100px;\n  min-height: 100px;\n}\n.vue-zoomer-gallery > *[data-v-604aaaba] {\n  display: inline-block;\n}\n.vue-zoomer-gallery.anim .slide[data-v-604aaaba] {\n  transition: left 0.4s;\n}\n.slide[data-v-604aaaba] {\n  position: absolute;\n  top: 0;\n  object-fit: contain;\n  width: 100%;\n  height: 100%;\n  -webkit-user-drag: none;\n}\n", map: undefined, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-604aaaba";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      false,
      createInjector,
      undefined,
      undefined
    );

  var index = {
    install (Vue) {
      Vue.component('VZoomer', __vue_component__);
      Vue.component('VZoomerGallery', __vue_component__$1);
    },
    // for locally register
    Zoomer: __vue_component__,
    Gallery: __vue_component__$1,
  };

  return index;

})));
