(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["commons"],{

/***/ "../node_modules/hyperhtml/cjs/classes/Component.js":
/*!**********************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/classes/Component.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const { Map, WeakMap } = __webpack_require__(/*! ../shared/poorlyfills.js */ "../node_modules/hyperhtml/cjs/shared/poorlyfills.js");

// hyperHTML.Component is a very basic class
// able to create Custom Elements like components
// including the ability to listen to connect/disconnect
// events via onconnect/ondisconnect attributes
// Components can be created imperatively or declaratively.
// The main difference is that declared components
// will not automatically render on setState(...)
// to simplify state handling on render.
function Component() {
  return this; // this is needed in Edge !!!
}
Object.defineProperty(exports, '__esModule', {value: true}).default = Component

// Component is lazily setup because it needs
// wire mechanism as lazy content
function setup(content) {
  // there are various weakly referenced variables in here
  // and mostly are to use Component.for(...) static method.
  const children = new WeakMap;
  const create = Object.create;
  const createEntry = (wm, id, component) => {
    wm.set(id, component);
    return component;
  };
  const get = (Class, info, context, id) => {
    const relation = info.get(Class) || relate(Class, info);
    switch (typeof id) {
      case 'object':
      case 'function':
        const wm = relation.w || (relation.w = new WeakMap);
        return wm.get(id) || createEntry(wm, id, new Class(context));
      default:
        const sm = relation.p || (relation.p = create(null));
        return sm[id] || (sm[id] = new Class(context));
    }
  };
  const relate = (Class, info) => {
    const relation = {w: null, p: null};
    info.set(Class, relation);
    return relation;
  };
  const set = context => {
    const info = new Map;
    children.set(context, info);
    return info;
  };
  // The Component Class
  Object.defineProperties(
    Component,
    {
      // Component.for(context[, id]) is a convenient way
      // to automatically relate data/context to children components
      // If not created yet, the new Component(context) is weakly stored
      // and after that same instance would always be returned.
      for: {
        configurable: true,
        value(context, id) {
          return get(
            this,
            children.get(context) || set(context),
            context,
            id == null ?
              'default' : id
          );
        }
      }
    }
  );
  Object.defineProperties(
    Component.prototype,
    {
      // all events are handled with the component as context
      handleEvent: {value(e) {
        const ct = e.currentTarget;
        this[
          ('getAttribute' in ct && ct.getAttribute('data-call')) ||
          ('on' + e.type)
        ](e);
      }},
      // components will lazily define html or svg properties
      // as soon as these are invoked within the .render() method
      // Such render() method is not provided by the base class
      // but it must be available through the Component extend.
      // Declared components could implement a
      // render(props) method too and use props as needed.
      html: lazyGetter('html', content),
      svg: lazyGetter('svg', content),
      // the state is a very basic/simple mechanism inspired by Preact
      state: lazyGetter('state', function () { return this.defaultState; }),
      // it is possible to define a default state that'd be always an object otherwise
      defaultState: {get() { return {}; }},
      // setting some property state through a new object
      // or a callback, triggers also automatically a render
      // unless explicitly specified to not do so (render === false)
      setState: {value(state, render) {
        const target = this.state;
        const source = typeof state === 'function' ? state.call(this, target) : state;
        for (const key in source) target[key] = source[key];
        if (render !== false) this.render();
        return this;
      }}
    }
  );
}
exports.setup = setup

// instead of a secret key I could've used a WeakMap
// However, attaching a property directly will result
// into better performance with thousands of components
// hanging around, and less memory pressure caused by the WeakMap
const lazyGetter = (type, fn) => {
  const secret = '_' + type + '$';
  return {
    get() {
      return this[secret] || (this[type] = fn.call(this, type));
    },
    set(value) {
      Object.defineProperty(this, secret, {configurable: true, value});
    }
  };
};


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/classes/Wire.js":
/*!*****************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/classes/Wire.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const { append } = __webpack_require__(/*! ../shared/utils.js */ "../node_modules/hyperhtml/cjs/shared/utils.js");
const { doc, fragment } = __webpack_require__(/*! ../shared/easy-dom.js */ "../node_modules/hyperhtml/cjs/shared/easy-dom.js");

function Wire(childNodes) {
  this.childNodes = childNodes;
  this.length = childNodes.length;
  this.first = childNodes[0];
  this.last = childNodes[this.length - 1];
}
Object.defineProperty(exports, '__esModule', {value: true}).default = Wire

// when a wire is inserted, all its nodes will follow
Wire.prototype.insert = function insert() {
  const df = fragment(this.first);
  append(df, this.childNodes);
  return df;
};

// when a wire is removed, all its nodes must be removed as well
Wire.prototype.remove = function remove() {
  const first = this.first;
  const last = this.last;
  if (this.length === 2) {
    last.parentNode.removeChild(last);
  } else {
    const range = doc(first).createRange();
    range.setStartBefore(this.childNodes[1]);
    range.setEndAfter(last);
    range.deleteContents();
  }
  return first;
};


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/hyper/render.js":
/*!*****************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/hyper/render.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {Map, WeakMap} = __webpack_require__(/*! ../shared/poorlyfills.js */ "../node_modules/hyperhtml/cjs/shared/poorlyfills.js");
const {G, UIDC, VOID_ELEMENTS} = __webpack_require__(/*! ../shared/constants.js */ "../node_modules/hyperhtml/cjs/shared/constants.js");
const Updates = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ../objects/Updates.js */ "../node_modules/hyperhtml/cjs/objects/Updates.js"));
const {
  createFragment,
  importNode,
  unique,
  TemplateMap
} = __webpack_require__(/*! ../shared/utils.js */ "../node_modules/hyperhtml/cjs/shared/utils.js");

const {selfClosing} = __webpack_require__(/*! ../shared/re.js */ "../node_modules/hyperhtml/cjs/shared/re.js");

// a weak collection of contexts that
// are already known to hyperHTML
const bewitched = new WeakMap;

// all unique template literals
const templates = TemplateMap();

// better known as hyper.bind(node), the render is
// the main tag function in charge of fully upgrading
// or simply updating, contexts used as hyperHTML targets.
// The `this` context is either a regular DOM node or a fragment.
function render(template) {
  const wicked = bewitched.get(this);
  if (wicked && wicked.template === unique(template)) {
    update.apply(wicked.updates, arguments);
  } else {
    upgrade.apply(this, arguments);
  }
  return this;
}

// an upgrade is in charge of collecting template info,
// parse it once, if unknown, to map all interpolations
// as single DOM callbacks, relate such template
// to the current context, and render it after cleaning the context up
function upgrade(template) {
  template = unique(template);
  const info =  templates.get(template) ||
                createTemplate.call(this, template);
  const fragment = importNode(this.ownerDocument, info.fragment);
  const updates = Updates.create(fragment, info.paths);
  bewitched.set(this, {template, updates});
  update.apply(updates, arguments);
  this.textContent = '';
  this.appendChild(fragment);
}

// an update simply loops over all mapped DOM operations
function update() {
  const length = arguments.length;
  for (let i = 1; i < length; i++) {
    this[i - 1](arguments[i]);
  }
}

// a template can be used to create a document fragment
// aware of all interpolations and with a list
// of paths used to find once those nodes that need updates,
// no matter if these are attributes, text nodes, or regular one
function createTemplate(template) {
  const paths = [];
  const html = template.join(UIDC).replace(SC_RE, SC_PLACE);
  const fragment = createFragment(this, html);
  Updates.find(fragment, paths, template.slice());
  const info = {fragment, paths};
  templates.set(template, info);
  return info;
}

// some node could be special though, like a custom element
// with a self closing tag, which should work through these changes.
const SC_RE = selfClosing;
const SC_PLACE = ($0, $1, $2) => {
  return VOID_ELEMENTS.test($1) ? $0 : ('<' + $1 + $2 + '></' + $1 + '>');
};

Object.defineProperty(exports, '__esModule', {value: true}).default = render;


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/hyper/wire.js":
/*!***************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/hyper/wire.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {ELEMENT_NODE, SVG_NAMESPACE} = __webpack_require__(/*! ../shared/constants.js */ "../node_modules/hyperhtml/cjs/shared/constants.js");
const {WeakMap, trim} = __webpack_require__(/*! ../shared/poorlyfills.js */ "../node_modules/hyperhtml/cjs/shared/poorlyfills.js");
const {fragment} = __webpack_require__(/*! ../shared/easy-dom.js */ "../node_modules/hyperhtml/cjs/shared/easy-dom.js");
const {append, slice, unique} = __webpack_require__(/*! ../shared/utils.js */ "../node_modules/hyperhtml/cjs/shared/utils.js");
const Wire = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ../classes/Wire.js */ "../node_modules/hyperhtml/cjs/classes/Wire.js"));
const render = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ./render.js */ "../node_modules/hyperhtml/cjs/hyper/render.js"));

// all wires used per each context
const wires = new WeakMap;

// A wire is a callback used as tag function
// to lazily relate a generic object to a template literal.
// hyper.wire(user)`<div id=user>${user.name}</div>`; => the div#user
// This provides the ability to have a unique DOM structure
// related to a unique JS object through a reusable template literal.
// A wire can specify a type, as svg or html, and also an id
// via html:id or :id convention. Such :id allows same JS objects
// to be associated to different DOM structures accordingly with
// the used template literal without losing previously rendered parts.
const wire = (obj, type) => obj == null ?
  content(type || 'html') :
  weakly(obj, type || 'html');

// A wire content is a virtual reference to one or more nodes.
// It's represented by either a DOM node, or an Array.
// In both cases, the wire content role is to simply update
// all nodes through the list of related callbacks.
// In few words, a wire content is like an invisible parent node
// in charge of updating its content like a bound element would do.
const content = type => {
  let wire, container, content, template, updates;
  return function (statics) {
    statics = unique(statics);
    let setup = template !== statics;
    if (setup) {
      template = statics;
      content = fragment(document);
      container = type === 'svg' ?
        document.createElementNS(SVG_NAMESPACE, 'svg') :
        content;
      updates = render.bind(container);
    }
    updates.apply(null, arguments);
    if (setup) {
      if (type === 'svg') {
        append(content, slice.call(container.childNodes));
      }
      wire = wireContent(content);
    }
    return wire;
  };
};

// wires are weakly created through objects.
// Each object can have multiple wires associated
// and this is thanks to the type + :id feature.
const weakly = (obj, type) => {
  const i = type.indexOf(':');
  let wire = wires.get(obj);
  let id = type;
  if (-1 < i) {
    id = type.slice(i + 1);
    type = type.slice(0, i) || 'html';
  }
  if (!wire) wires.set(obj, wire = {});
  return wire[id] || (wire[id] = content(type));
};

// a document fragment loses its nodes as soon
// as it's appended into another node.
// This would easily lose wired content
// so that on a second render call, the parent
// node wouldn't know which node was there
// associated to the interpolation.
// To prevent hyperHTML to forget about wired nodes,
// these are either returned as Array or, if there's ony one entry,
// as single referenced node that won't disappear from the fragment.
// The initial fragment, at this point, would be used as unique reference.
const wireContent = node => {
  const childNodes = node.childNodes;
  const length = childNodes.length;
  const wireNodes = [];
  for (let i = 0; i < length; i++) {
    let child = childNodes[i];
    if (
      child.nodeType === ELEMENT_NODE ||
      trim.call(child.textContent).length !== 0
    ) {
      wireNodes.push(child);
    }
  }
  return wireNodes.length === 1 ? wireNodes[0] : new Wire(wireNodes);
};

exports.content = content;
exports.weakly = weakly;
Object.defineProperty(exports, '__esModule', {value: true}).default = wire;


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/index.js":
/*!**********************************************!*\
  !*** ../node_modules/hyperhtml/cjs/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*! (c) Andrea Giammarchi (ISC) */

const Component = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ./classes/Component.js */ "../node_modules/hyperhtml/cjs/classes/Component.js"));
const {setup} = __webpack_require__(/*! ./classes/Component.js */ "../node_modules/hyperhtml/cjs/classes/Component.js");
const Intent = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ./objects/Intent.js */ "../node_modules/hyperhtml/cjs/objects/Intent.js"));
const wire = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ./hyper/wire.js */ "../node_modules/hyperhtml/cjs/hyper/wire.js"));
const {content, weakly} = __webpack_require__(/*! ./hyper/wire.js */ "../node_modules/hyperhtml/cjs/hyper/wire.js");
const render = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ./hyper/render.js */ "../node_modules/hyperhtml/cjs/hyper/render.js"));
const diff = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ./shared/domdiff.js */ "../node_modules/hyperhtml/cjs/shared/domdiff.js"));

// all functions are self bound to the right context
// you can do the following
// const {bind, wire} = hyperHTML;
// and use them right away: bind(node)`hello!`;
const bind = context => render.bind(context);
const define = Intent.define;

hyper.Component = Component;
hyper.bind = bind;
hyper.define = define;
hyper.diff = diff;
hyper.hyper = hyper;
hyper.wire = wire;

// the wire content is the lazy defined
// html or svg property of each hyper.Component
setup(content);

// everything is exported directly or through the
// hyperHTML callback, when used as top level script
exports.Component = Component;
exports.bind = bind;
exports.define = define;
exports.diff = diff;
exports.hyper = hyper;
exports.wire = wire;

// by default, hyperHTML is a smart function
// that "magically" understands what's the best
// thing to do with passed arguments
function hyper(HTML) {
  return arguments.length < 2 ?
    (HTML == null ?
      content('html') :
      (typeof HTML === 'string' ?
        hyper.wire(null, HTML) :
        ('raw' in HTML ?
          content('html')(HTML) :
          ('nodeType' in HTML ?
            hyper.bind(HTML) :
            weakly(HTML, 'html')
          )
        )
      )) :
    ('raw' in HTML ?
      content('html') : hyper.wire
    ).apply(null, arguments);
}
Object.defineProperty(exports, '__esModule', {value: true}).default = hyper


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/objects/Intent.js":
/*!*******************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/objects/Intent.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const intents = {};
const keys = [];
const hasOwnProperty = intents.hasOwnProperty;

let length = 0;

Object.defineProperty(exports, '__esModule', {value: true}).default = {

  // hyperHTML.define('intent', (object, update) => {...})
  // can be used to define a third parts update mechanism
  // when every other known mechanism failed.
  // hyper.define('user', info => info.name);
  // hyper(node)`<p>${{user}}</p>`;
  define: (intent, callback) => {
    if (!(intent in intents)) {
      length = keys.push(intent);
    }
    intents[intent] = callback;
  },

  // this method is used internally as last resort
  // to retrieve a value out of an object
  invoke: (object, callback) => {
    for (let i = 0; i < length; i++) {
      let key = keys[i];
      if (hasOwnProperty.call(object, key)) {
        return intents[key](object[key], callback);
      }
    }
  }
};


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/objects/Path.js":
/*!*****************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/objects/Path.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {
  COMMENT_NODE,
  DOCUMENT_FRAGMENT_NODE,
  ELEMENT_NODE
} = __webpack_require__(/*! ../shared/constants.js */ "../node_modules/hyperhtml/cjs/shared/constants.js");

// every template literal interpolation indicates
// a precise target in the DOM the template is representing.
// `<p id=${'attribute'}>some ${'content'}</p>`
// hyperHTML finds only once per template literal,
// hence once per entire application life-cycle,
// all nodes that are related to interpolations.
// These nodes are stored as indexes used to retrieve,
// once per upgrade, nodes that will change on each future update.
// A path example is [2, 0, 1] representing the operation:
// node.childNodes[2].childNodes[0].childNodes[1]
// Attributes are addressed via their owner node and their name.
const createPath = node => {
  const path = [];
  let parentNode;
  switch (node.nodeType) {
    case ELEMENT_NODE:
    case DOCUMENT_FRAGMENT_NODE:
      parentNode = node;
      break;
    case COMMENT_NODE:
      parentNode = node.parentNode;
      prepend(path, parentNode, node);
      break;
    default:
      parentNode = node.ownerElement;
      break;
  }
  for (
    node = parentNode;
    (parentNode = parentNode.parentNode);
    node = parentNode
  ) {
    prepend(path, parentNode, node);
  }
  return path;
};

const prepend = (path, parent, node) => {
  path.unshift(path.indexOf.call(parent.childNodes, node));
};

Object.defineProperty(exports, '__esModule', {value: true}).default = {
  create: (type, node, name) => ({type, name, node, path: createPath(node)}),
  find: (node, path) => {
    const length = path.length;
    for (let i = 0; i < length; i++) {
      node = node.childNodes[path[i]];
    }
    return node;
  }
}


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/objects/Style.js":
/*!******************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/objects/Style.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// from https://github.com/developit/preact/blob/33fc697ac11762a1cb6e71e9847670d047af7ce5/src/constants.js
const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

// style is handled as both string and object
// even if the target is an SVG element (consistency)
Object.defineProperty(exports, '__esModule', {value: true}).default = (node, original, isSVG) => {
  if (isSVG) {
    const style = original.cloneNode(true);
    style.value = '';
    node.setAttributeNode(style);
    return update(style, isSVG);
  }
  return update(node.style, isSVG);
};

// the update takes care or changing/replacing
// only properties that are different or
// in case of string, the whole node
const update = (style, isSVG) => {
  let oldType, oldValue;
  return newValue => {
    switch (typeof newValue) {
      case 'object':
        if (newValue) {
          if (oldType === 'object') {
            if (!isSVG) {
              if (oldValue !== newValue) {
                for (const key in oldValue) {
                  if (!(key in newValue)) {
                    style[key] = '';
                  }
                }
              }
            }
          } else {
            if (isSVG) style.value = '';
            else style.cssText = '';
          }
          const info = isSVG ? {} : style;
          for (const key in newValue) {
            const value = newValue[key];
            info[key] = typeof value === 'number' &&
                        !IS_NON_DIMENSIONAL.test(key) ?
                          (value + 'px') : value;
          }
          oldType = 'object';
          if (isSVG) style.value = toStyle((oldValue = info));
          else oldValue = newValue;
          break;
        }
      default:
        if (oldValue != newValue) {
          oldType = 'string';
          oldValue = newValue;
          if (isSVG) style.value = newValue || '';
          else style.cssText = newValue || '';
        }
        break;
    }
  };
};

const hyphen = /([^A-Z])([A-Z]+)/g;
const ized = ($0, $1, $2) => $1 + '-' + $2.toLowerCase();
const toStyle = object => {
  const css = [];
  for (const key in object) {
    css.push(key.replace(hyphen, ized), ':', object[key], ';');
  }
  return css.join('');
};

/***/ }),

/***/ "../node_modules/hyperhtml/cjs/objects/Updates.js":
/*!********************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/objects/Updates.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {
  CONNECTED, DISCONNECTED, COMMENT_NODE, DOCUMENT_FRAGMENT_NODE, ELEMENT_NODE, TEXT_NODE, OWNER_SVG_ELEMENT, SHOULD_USE_TEXT_CONTENT, UID, UIDC
} = __webpack_require__(/*! ../shared/constants.js */ "../node_modules/hyperhtml/cjs/shared/constants.js");

const Component = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ../classes/Component.js */ "../node_modules/hyperhtml/cjs/classes/Component.js"));
const Wire = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ../classes/Wire.js */ "../node_modules/hyperhtml/cjs/classes/Wire.js"));
const Path = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ./Path.js */ "../node_modules/hyperhtml/cjs/objects/Path.js"));
const Style = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ./Style.js */ "../node_modules/hyperhtml/cjs/objects/Style.js"));
const Intent = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ./Intent.js */ "../node_modules/hyperhtml/cjs/objects/Intent.js"));
const domdiff = (m => m.__esModule ? m.default : m)(__webpack_require__(/*! ../shared/domdiff.js */ "../node_modules/hyperhtml/cjs/shared/domdiff.js"));
// see /^script$/i.test(nodeName) bit down here
// import { create as createElement, text } from '../shared/easy-dom.js';
const { text } = __webpack_require__(/*! ../shared/easy-dom.js */ "../node_modules/hyperhtml/cjs/shared/easy-dom.js");
const { Event, WeakSet, isArray, trim } = __webpack_require__(/*! ../shared/poorlyfills.js */ "../node_modules/hyperhtml/cjs/shared/poorlyfills.js");
const { createFragment, slice } = __webpack_require__(/*! ../shared/utils.js */ "../node_modules/hyperhtml/cjs/shared/utils.js");

// hyper.Component have a connected/disconnected
// mechanism provided by MutationObserver
// This weak set is used to recognize components
// as DOM node that needs to trigger connected/disconnected events
const components = new WeakSet;

// a basic dictionary used to filter already cached attributes
// while looking for special hyperHTML values.
function Cache() {}
Cache.prototype = Object.create(null);

// returns an intent to explicitly inject content as html
const asHTML = html => ({html});

// returns nodes from wires and components
const asNode = (item, i) => {
  return 'ELEMENT_NODE' in item ?
    item :
    (item.constructor === Wire ?
      // in the Wire case, the content can be
      // removed, post-pended, inserted, or pre-pended and
      // all these cases are handled by domdiff already
      /* istanbul ignore next */
      ((1 / i) < 0 ?
        (i ? item.remove() : item.last) :
        (i ? item.insert() : item.first)) :
      asNode(item.render(), i));
}

// returns true if domdiff can handle the value
const canDiff = value =>  'ELEMENT_NODE' in value ||
value instanceof Wire ||
value instanceof Component;

// updates are created once per context upgrade
// within the main render function (../hyper/render.js)
// These are an Array of callbacks to invoke passing
// each interpolation value.
// Updates can be related to any kind of content,
// attributes, or special text-only cases such <style>
// elements or <textarea>
const create = (root, paths) => {
  const updates = [];
  const length = paths.length;
  for (let i = 0; i < length; i++) {
    const info = paths[i];
    const node = Path.find(root, info.path);
    switch (info.type) {
      case 'any':
        updates.push(setAnyContent(node, []));
        break;
      case 'attr':
        updates.push(setAttribute(node, info.name, info.node));
        break;
      case 'text':
        updates.push(setTextContent(node));
        node.textContent = '';
        break;
    }
  }
  return updates;
};

// finding all paths is a one-off operation performed
// when a new template literal is used.
// The goal is to map all target nodes that will be
// used to update content/attributes every time
// the same template literal is used to create content.
// The result is a list of paths related to the template
// with all the necessary info to create updates as
// list of callbacks that target directly affected nodes.
const find = (node, paths, parts) => {
  const childNodes = node.childNodes;
  const length = childNodes.length;
  for (let i = 0; i < length; i++) {
    let child = childNodes[i];
    switch (child.nodeType) {
      case ELEMENT_NODE:
        findAttributes(child, paths, parts);
        find(child, paths, parts);
        break;
      case COMMENT_NODE:
        if (child.textContent === UID) {
          parts.shift();
          paths.push(
            // basicHTML or other non standard engines
            // might end up having comments in nodes
            // where they shouldn't, hence this check.
            SHOULD_USE_TEXT_CONTENT.test(node.nodeName) ?
              Path.create('text', node) :
              Path.create('any', child)
          );
        }
        break;
      case TEXT_NODE:
        // the following ignore is actually covered by browsers
        // only basicHTML ends up on previous COMMENT_NODE case
        // instead of TEXT_NODE because it knows nothing about
        // special style or textarea behavior
        /* istanbul ignore if */
        if (
          SHOULD_USE_TEXT_CONTENT.test(node.nodeName) &&
          trim.call(child.textContent) === UIDC
        ) {
          parts.shift();
          paths.push(Path.create('text', node));
        }
        break;
    }
  }
};

// attributes are searched via unique hyperHTML id value.
// Despite HTML being case insensitive, hyperHTML is able
// to recognize attributes by name in a caseSensitive way.
// This plays well with Custom Elements definitions
// and also with XML-like environments, without trusting
// the resulting DOM but the template literal as the source of truth.
// IE/Edge has a funny bug with attributes and these might be duplicated.
// This is why there is a cache in charge of being sure no duplicated
// attributes are ever considered in future updates.
const findAttributes = (node, paths, parts) => {
  const cache = new Cache;
  const attributes = node.attributes;
  const array = slice.call(attributes);
  const remove = [];
  const length = array.length;
  for (let i = 0; i < length; i++) {
    const attribute = array[i];
    if (attribute.value === UID) {
      const name = attribute.name;
      // the following ignore is covered by IE
      // and the IE9 double viewBox test
      /* istanbul ignore else */
      if (!(name in cache)) {
        const realName = parts.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/, '$1');
        cache[name] = attributes[realName] ||
                      // the following ignore is covered by browsers
                      // while basicHTML is already case-sensitive
                      /* istanbul ignore next */
                      attributes[realName.toLowerCase()];
        paths.push(Path.create('attr', cache[name], realName));
      }
      remove.push(attribute);
    }
  }
  const len = remove.length;
  for (let i = 0; i < len; i++) {
    // Edge HTML bug #16878726
    const attribute = remove[i];
    if (/^id$/i.test(attribute.name))
      node.removeAttribute(attribute.name);
    // standard browsers would work just fine here
    else
      node.removeAttributeNode(remove[i]);
  }

  // This is a very specific Firefox/Safari issue
  // but since it should be a not so common pattern,
  // it's probably worth patching regardless.
  // Basically, scripts created through strings are death.
  // You need to create fresh new scripts instead.
  // TODO: is there any other node that needs such nonsense?
  const nodeName = node.nodeName;
  if (/^script$/i.test(nodeName)) {
    // this used to be like that
    // const script = createElement(node, nodeName);
    // then Edge arrived and decided that scripts created
    // through template documents aren't worth executing
    // so it became this ... hopefully it won't hurt in the wild
    const script = document.createElement(nodeName);
    for (let i = 0; i < attributes.length; i++) {
      script.setAttributeNode(attributes[i].cloneNode(true));
    }
    script.textContent = node.textContent;
    node.parentNode.replaceChild(script, node);
  }
};

// when a Promise is used as interpolation value
// its result must be parsed once resolved.
// This callback is in charge of understanding what to do
// with a returned value once the promise is resolved.
const invokeAtDistance = (value, callback) => {
  callback(value.placeholder);
  if ('text' in value) {
    Promise.resolve(value.text).then(String).then(callback);
  } else if ('any' in value) {
    Promise.resolve(value.any).then(callback);
  } else if ('html' in value) {
    Promise.resolve(value.html).then(asHTML).then(callback);
  } else {
    Promise.resolve(Intent.invoke(value, callback)).then(callback);
  }
};

// quick and dirty way to check for Promise/ish values
const isPromise_ish = value => value != null && 'then' in value;

// in a hyper(node)`<div>${content}</div>` case
// everything could happen:
//  * it's a JS primitive, stored as text
//  * it's null or undefined, the node should be cleaned
//  * it's a component, update the content by rendering it
//  * it's a promise, update the content once resolved
//  * it's an explicit intent, perform the desired operation
//  * it's an Array, resolve all values if Promises and/or
//    update the node with the resulting list of content
const setAnyContent = (node, childNodes) => {
  let fastPath = false;
  let oldValue;
  const anyContent = value => {
    switch (typeof value) {
      case 'string':
      case 'number':
      case 'boolean':
        if (fastPath) {
          if (oldValue !== value) {
            oldValue = value;
            childNodes[0].textContent = value;
          }
        } else {
          fastPath = true;
          oldValue = value;
          childNodes = domdiff(
            node.parentNode,
            childNodes,
            [text(node, value)],
            asNode,
            node
          );
        }
        break;
      case 'object':
      case 'undefined':
        if (value == null) {
          fastPath = false;
          childNodes = domdiff(
            node.parentNode,
            childNodes,
            [],
            asNode,
            node
          );
          break;
        }
      default:
        fastPath = false;
        oldValue = value;
        if (isArray(value)) {
          if (value.length === 0) {
            if (childNodes.length) {
              childNodes = domdiff(
                node.parentNode,
                childNodes,
                [],
                asNode,
                node
              );
            }
          } else {
            switch (typeof value[0]) {
              case 'string':
              case 'number':
              case 'boolean':
                anyContent({html: value});
                break;
              case 'object':
                if (isArray(value[0])) {
                  value = value.concat.apply([], value);
                }
                if (isPromise_ish(value[0])) {
                  Promise.all(value).then(anyContent);
                  break;
                }
              default:
                childNodes = domdiff(
                  node.parentNode,
                  childNodes,
                  value,
                  asNode,
                  node
                );
                break;
            }
          }
        } else if (canDiff(value)) {
          childNodes = domdiff(
            node.parentNode,
            childNodes,
            value.nodeType === DOCUMENT_FRAGMENT_NODE ?
              slice.call(value.childNodes) :
              [value],
            asNode,
            node
          );
        } else if (isPromise_ish(value)) {
          value.then(anyContent);
        } else if ('placeholder' in value) {
          invokeAtDistance(value, anyContent);
        } else if ('text' in value) {
          anyContent(String(value.text));
        } else if ('any' in value) {
          anyContent(value.any);
        } else if ('html' in value) {
          childNodes = domdiff(
            node.parentNode,
            childNodes,
            slice.call(
              createFragment(
                node,
                [].concat(value.html).join('')
              ).childNodes
            ),
            asNode,
            node
          );
        } else if ('length' in value) {
          anyContent(slice.call(value));
        } else {
          anyContent(Intent.invoke(value, anyContent));
        }
        break;
    }
  };
  return anyContent;
};

// there are four kind of attributes, and related behavior:
//  * events, with a name starting with `on`, to add/remove event listeners
//  * special, with a name present in their inherited prototype, accessed directly
//  * regular, accessed through get/setAttribute standard DOM methods
//  * style, the only regular attribute that also accepts an object as value
//    so that you can style=${{width: 120}}. In this case, the behavior has been
//    fully inspired by Preact library and its simplicity.
const setAttribute = (node, name, original) => {
  const isSVG = OWNER_SVG_ELEMENT in node;
  let oldValue;
  // if the attribute is the style one
  // handle it differently from others
  if (name === 'style') {
    return Style(node, original, isSVG);
  }
  // the name is an event one,
  // add/remove event listeners accordingly
  else if (/^on/.test(name)) {
    let type = name.slice(2);
    if (type === CONNECTED || type === DISCONNECTED) {
      if (notObserving) {
        notObserving = false;
        observe();
      }
      components.add(node);
    }
    else if (name.toLowerCase() in node) {
      type = type.toLowerCase();
    }
    return newValue => {
      if (oldValue !== newValue) {
        if (oldValue) node.removeEventListener(type, oldValue, false);
        oldValue = newValue;
        if (newValue) node.addEventListener(type, newValue, false);
      }
    };
  }
  // the attribute is special ('value' in input)
  // and it's not SVG *or* the name is exactly data,
  // in this case assign the value directly
  else if (name === 'data' || (!isSVG && name in node)) {
    return newValue => {
      if (oldValue !== newValue) {
        oldValue = newValue;
        if (node[name] !== newValue) {
          node[name] = newValue;
          if (newValue == null) {
            node.removeAttribute(name);
          }
        }
      }
    };
  }
  // in every other case, use the attribute node as it is
  // update only the value, set it as node only when/if needed
  else {
    let owner = false;
    const attribute = original.cloneNode(true);
    return newValue => {
      if (oldValue !== newValue) {
        oldValue = newValue;
        if (attribute.value !== newValue) {
          if (newValue == null) {
            if (owner) {
              owner = false;
              node.removeAttributeNode(attribute);
            }
            attribute.value = newValue;
          } else {
            attribute.value = newValue;
            if (!owner) {
              owner = true;
              node.setAttributeNode(attribute);
            }
          }
        }
      }
    };
  }
};

// style or textareas don't accept HTML as content
// it's pointless to transform or analyze anything
// different from text there but it's worth checking
// for possible defined intents.
const setTextContent = node => {
  let oldValue;
  const textContent = value => {
    if (oldValue !== value) {
      oldValue = value;
      if (typeof value === 'object' && value) {
        if (isPromise_ish(value)) {
          value.then(textContent);
        } else if ('placeholder' in value) {
          invokeAtDistance(value, textContent);
        } else if ('text' in value) {
          textContent(String(value.text));
        } else if ('any' in value) {
          textContent(value.any);
        } else if ('html' in value) {
          textContent([].concat(value.html).join(''));
        } else if ('length' in value) {
          textContent(slice.call(value).join(''));
        } else {
          textContent(Intent.invoke(value, textContent));
        }
      } else {
        node.textContent = value == null ? '' : value;
      }
    }
  };
  return textContent;
};

Object.defineProperty(exports, '__esModule', {value: true}).default = {create, find};

// hyper.Components might need connected/disconnected notifications
// used by components and their onconnect/ondisconnect callbacks.
// When one of these callbacks is encountered,
// the document starts being observed.
let notObserving = true;
function observe() {

  // when hyper.Component related DOM nodes
  // are appended or removed from the live tree
  // these might listen to connected/disconnected events
  // This utility is in charge of finding all components
  // involved in the DOM update/change and dispatch
  // related information to them
  const dispatchAll = (nodes, type) => {
    const event = new Event(type);
    const length = nodes.length;
    for (let i = 0; i < length; i++) {
      let node = nodes[i];
      if (node.nodeType === ELEMENT_NODE) {
        dispatchTarget(node, event);
      }
    }
  };

  // the way it's done is via the components weak set
  // and recursively looking for nested components too
  const dispatchTarget = (node, event) => {
    if (components.has(node)) {
      node.dispatchEvent(event);
    }

    const children = node.children;
    const length = children.length;
    for (let i = 0; i < length; i++) {
      dispatchTarget(children[i], event);
    }
  }

  // The MutationObserver is the best way to implement that
  // but there is a fallback to deprecated DOMNodeInserted/Removed
  // so that even older browsers/engines can help components life-cycle
  try {
    (new MutationObserver(records => {
      const length = records.length;
      for (let i = 0; i < length; i++) {
        let record = records[i];
        dispatchAll(record.removedNodes, DISCONNECTED);
        dispatchAll(record.addedNodes, CONNECTED);
      }
    })).observe(document, {subtree: true, childList: true});
  } catch(o_O) {
    document.addEventListener('DOMNodeRemoved', event => {
      dispatchAll([event.target], DISCONNECTED);
    }, false);
    document.addEventListener('DOMNodeInserted', event => {
      dispatchAll([event.target], CONNECTED);
    }, false);
  }
}


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/shared/constants.js":
/*!*********************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/shared/constants.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const G = document.defaultView;
exports.G = G;

// Node.CONSTANTS
// 'cause some engine has no global Node defined
// (i.e. Node, NativeScript, basicHTML ... )
const ELEMENT_NODE = 1;
exports.ELEMENT_NODE = ELEMENT_NODE;
const ATTRIBUTE_NODE = 2;
exports.ATTRIBUTE_NODE = ATTRIBUTE_NODE;
const TEXT_NODE = 3;
exports.TEXT_NODE = TEXT_NODE;
const COMMENT_NODE = 8;
exports.COMMENT_NODE = COMMENT_NODE;
const DOCUMENT_FRAGMENT_NODE = 11;
exports.DOCUMENT_FRAGMENT_NODE = DOCUMENT_FRAGMENT_NODE;

// HTML related constants
const VOID_ELEMENTS = /^area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr$/i;
exports.VOID_ELEMENTS = VOID_ELEMENTS;

// SVG related constants
const OWNER_SVG_ELEMENT = 'ownerSVGElement';
exports.OWNER_SVG_ELEMENT = OWNER_SVG_ELEMENT;
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
exports.SVG_NAMESPACE = SVG_NAMESPACE;

// Custom Elements / MutationObserver constants
const CONNECTED = 'connected';
exports.CONNECTED = CONNECTED;
const DISCONNECTED = 'dis' + CONNECTED;
exports.DISCONNECTED = DISCONNECTED;

// hyperHTML related constants
const EXPANDO = '_hyper: ';
exports.EXPANDO = EXPANDO;
const SHOULD_USE_TEXT_CONTENT = /^style|textarea$/i;
exports.SHOULD_USE_TEXT_CONTENT = SHOULD_USE_TEXT_CONTENT;
const UID = EXPANDO + ((Math.random() * new Date) | 0) + ';';
exports.UID = UID;
const UIDC = '<!--' + UID + '-->';
exports.UIDC = UIDC;


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/shared/domdiff.js":
/*!*******************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/shared/domdiff.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* AUTOMATICALLY IMPORTED, DO NOT MODIFY */
/*! (c) 2017 Andrea Giammarchi (ISC) */

/**
 * This code is a revisited port of the snabbdom vDOM diffing logic,
 * the same that fuels as fork Vue.js or other libraries.
 * @credits https://github.com/snabbdom/snabbdom
 */

const identity = O => O;

const remove = (parentNode, before, after) => {
  const range = parentNode.ownerDocument.createRange();
  range.setStartBefore(before);
  range.setEndAfter(after);
  range.deleteContents();
};

const domdiff = (
  parentNode,     // where changes happen
  currentNodes,   // Array of current items/nodes
  futureNodes,    // Array of future items/nodes
  getNode,        // optional way to retrieve a node from an item
  beforeNode      // optional item/node to use as insertBefore delimiter
) => {
  const get = getNode || identity;
  const before = beforeNode == null ? null : get(beforeNode, 0);
  let currentStart = 0, futureStart = 0;
  let currentEnd = currentNodes.length - 1;
  let currentStartNode = currentNodes[0];
  let currentEndNode = currentNodes[currentEnd];
  let futureEnd = futureNodes.length - 1;
  let futureStartNode = futureNodes[0];
  let futureEndNode = futureNodes[futureEnd];
  while (currentStart <= currentEnd && futureStart <= futureEnd) {
    if (currentStartNode == null) {
      currentStartNode = currentNodes[++currentStart];
    }
    else if (currentEndNode == null) {
      currentEndNode = currentNodes[--currentEnd];
    }
    else if (futureStartNode == null) {
      futureStartNode = futureNodes[++futureStart];
    }
    else if (futureEndNode == null) {
      futureEndNode = futureNodes[--futureEnd];
    }
    else if (currentStartNode == futureStartNode) {
      currentStartNode = currentNodes[++currentStart];
      futureStartNode = futureNodes[++futureStart];
    }
    else if (currentEndNode == futureEndNode) {
      currentEndNode = currentNodes[--currentEnd];
      futureEndNode = futureNodes[--futureEnd];
    }
    else if (currentStartNode == futureEndNode) {
      parentNode.insertBefore(
        get(currentStartNode, 1),
        get(currentEndNode, -0).nextSibling
      );
      currentStartNode = currentNodes[++currentStart];
      futureEndNode = futureNodes[--futureEnd];
    }
    else if (currentEndNode == futureStartNode) {
      parentNode.insertBefore(
        get(currentEndNode, 1),
        get(currentStartNode, 0)
      );
      currentEndNode = currentNodes[--currentEnd];
      futureStartNode = futureNodes[++futureStart];
    }
    else {
      let index = currentNodes.indexOf(futureStartNode);
      if (index < 0) {
        parentNode.insertBefore(
          get(futureStartNode, 1),
          get(currentStartNode, 0)
        );
        futureStartNode = futureNodes[++futureStart];
      }
      else {
        let i = index;
        let f = futureStart;
        while (
          i <= currentEnd &&
          f <= futureEnd &&
          currentNodes[i] === futureNodes[f]
        ) {
          i++;
          f++;
        }
        if (1 < (i - index)) {
          if (--index === currentStart) {
            parentNode.removeChild(get(currentStartNode, -1));
          } else {
            remove(
              parentNode,
              get(currentStartNode, -1),
              get(currentNodes[index], -1)
            );
          }
          currentStart = i;
          futureStart = f;
          currentStartNode = currentNodes[i];
          futureStartNode = futureNodes[f];
        } else {
          const el = currentNodes[index];
          currentNodes[index] = null;
          parentNode.insertBefore(get(el, 1), get(currentStartNode, 0));
          futureStartNode = futureNodes[++futureStart];
        }
      }
    }
  }
  if (currentStart <= currentEnd || futureStart <= futureEnd) {
    if (currentStart > currentEnd) {
      const pin = futureNodes[futureEnd + 1];
      const place = pin == null ? before : get(pin, 0);
      if (futureStart === futureEnd) {
        parentNode.insertBefore(get(futureNodes[futureStart], 1), place);
      }
      else {
        const fragment = parentNode.ownerDocument.createDocumentFragment();
        while (futureStart <= futureEnd) {
          fragment.appendChild(get(futureNodes[futureStart++], 1));
        }
        parentNode.insertBefore(fragment, place);
      }
    }
    else {
      if (currentNodes[currentStart] == null) currentStart++;
      if (currentStart === currentEnd) {
        parentNode.removeChild(get(currentNodes[currentStart], -1));
      }
      else {
        remove(
          parentNode,
          get(currentNodes[currentStart], -1),
          get(currentNodes[currentEnd], -1)
        );
      }
    }
  }
  return futureNodes;
};

Object.defineProperty(exports, '__esModule', {value: true}).default = domdiff;


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/shared/easy-dom.js":
/*!********************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/shared/easy-dom.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// these are tiny helpers to simplify most common operations needed here
const create = (node, type) => doc(node).createElement(type);
exports.create = create;
const doc = node => node.ownerDocument || node;
exports.doc = doc;
const fragment = node => doc(node).createDocumentFragment();
exports.fragment = fragment;
const text = (node, text) => doc(node).createTextNode(text);
exports.text = text;


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/shared/features-detection.js":
/*!******************************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/shared/features-detection.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {create, fragment, text} = __webpack_require__(/*! ./easy-dom.js */ "../node_modules/hyperhtml/cjs/shared/easy-dom.js");

const testFragment = fragment(document);

// DOM4 node.append(...many)
const hasAppend = 'append' in testFragment;
exports.hasAppend = hasAppend;

// detect old browsers without HTMLTemplateElement content support
const hasContent = 'content' in create(document, 'template');
exports.hasContent = hasContent;

// IE 11 has problems with cloning templates: it "forgets" empty childNodes
testFragment.appendChild(text(testFragment, 'g'));
testFragment.appendChild(text(testFragment, ''));
const hasDoomedCloneNode = testFragment.cloneNode(true).childNodes.length === 1;
exports.hasDoomedCloneNode = hasDoomedCloneNode;

// old browsers need to fallback to cloneNode
// Custom Elements V0 and V1 will work polyfilled
// but native implementations need importNode instead
// (specially Chromium and its old V0 implementation)
const hasImportNode = 'importNode' in document;
exports.hasImportNode = hasImportNode;


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/shared/poorlyfills.js":
/*!***********************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/shared/poorlyfills.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {G, UID} = __webpack_require__(/*! ./constants.js */ "../node_modules/hyperhtml/cjs/shared/constants.js");

// you know that kind of basics you need to cover
// your use case only but you don't want to bloat the library?
// There's even a package in here:
// https://www.npmjs.com/package/poorlyfills

// used to dispatch simple events
let Event = G.Event;
try {
  new Event('Event');
} catch(o_O) {
  Event = function (type) {
    const e = document.createEvent('Event');
    e.initEvent(type, false, false);
    return e;
  };
}
exports.Event = Event;

// used to store template literals
/* istanbul ignore next */
const Map = G.Map || function Map() {
  const keys = [], values = [];
  return {
    get(obj) {
      return values[keys.indexOf(obj)];
    },
    set(obj, value) {
      values[keys.push(obj) - 1] = value;
    }
  };
};
exports.Map = Map;

// used to store wired content
let ID = 0;
const WeakMap = G.WeakMap || function WeakMap() {
  const key = UID + ID++;
  return {
    get(obj) { return obj[key]; },
    set(obj, value) {
      Object.defineProperty(obj, key, {
        configurable: true,
        value
      });
    }
  };
};
exports.WeakMap = WeakMap;

// used to store hyper.Components
const WeakSet = G.WeakSet || function WeakSet() {
  const wm = new WeakMap;
  return {
    add(obj) { wm.set(obj, true); },
    has(obj) { return wm.get(obj) === true; }
  };
};
exports.WeakSet = WeakSet;

// used to be sure IE9 or older Androids work as expected
const isArray = Array.isArray || (toString =>
  arr => toString.call(arr) === '[object Array]'
)({}.toString);
exports.isArray = isArray;

const trim = UID.trim || function () {
  return this.replace(/^\s+|\s+$/g, '');
};
exports.trim = trim;


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/shared/re.js":
/*!**************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/shared/re.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO:  I'd love to code-cover RegExp too here
//        these are fundamental for this library

const spaces = ' \\f\\n\\r\\t';
const almostEverything = '[^ ' + spaces + '\\/>"\'=]+';
const attrName = '[ ' + spaces + ']+' + almostEverything;
const tagName = '<([A-Za-z]+[A-Za-z0-9:_-]*)((?:';
const attrPartials = '(?:=(?:\'[^\']*?\'|"[^"]*?"|<[^>]*?>|' + almostEverything + '))?)';

const attrSeeker = new RegExp(
  tagName + attrName + attrPartials + '+)([ ' + spaces + ']*/?>)',
  'g'
);

const selfClosing = new RegExp(
  tagName + attrName + attrPartials + '*)([ ' + spaces + ']*/>)',
  'g'
);

exports.attrName = attrName;
exports.attrSeeker = attrSeeker;
exports.selfClosing = selfClosing;


/***/ }),

/***/ "../node_modules/hyperhtml/cjs/shared/utils.js":
/*!*****************************************************!*\
  !*** ../node_modules/hyperhtml/cjs/shared/utils.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {attrName, attrSeeker} = __webpack_require__(/*! ./re.js */ "../node_modules/hyperhtml/cjs/shared/re.js");

const {
  G,
  OWNER_SVG_ELEMENT,
  SVG_NAMESPACE,
  UID,
  UIDC
} = __webpack_require__(/*! ./constants.js */ "../node_modules/hyperhtml/cjs/shared/constants.js");

const {
  hasAppend,
  hasContent,
  hasDoomedCloneNode,
  hasImportNode
} = __webpack_require__(/*! ./features-detection.js */ "../node_modules/hyperhtml/cjs/shared/features-detection.js");

const {create, doc, fragment} = __webpack_require__(/*! ./easy-dom.js */ "../node_modules/hyperhtml/cjs/shared/easy-dom.js");

const {Map, WeakMap} = __webpack_require__(/*! ./poorlyfills.js */ "../node_modules/hyperhtml/cjs/shared/poorlyfills.js");

// appends an array of nodes
// to a generic node/fragment
// When available, uses append passing all arguments at once
// hoping that's somehow faster, even if append has more checks on type
const append = hasAppend ?
  (node, childNodes) => {
    node.append.apply(node, childNodes);
  } :
  (node, childNodes) => {
    const length = childNodes.length;
    for (let i = 0; i < length; i++) {
      node.appendChild(childNodes[i]);
    }
  };
exports.append = append;

const findAttributes = new RegExp('(' + attrName + '=)([\'"]?)' + UIDC + '\\2', 'gi');
const comments = ($0, $1, $2, $3) =>
  '<' + $1 + $2.replace(findAttributes, replaceAttributes) + $3;
const replaceAttributes = ($0, $1, $2) => $1 + ($2 || '"') + UID + ($2 || '"');

// given a node and a generic HTML content,
// create either an SVG or an HTML fragment
// where such content will be injected
const createFragment = (node, html) =>
  (OWNER_SVG_ELEMENT in node ?
    SVGFragment :
    HTMLFragment
  )(node, html.replace(attrSeeker, comments));
exports.createFragment = createFragment;

// IE/Edge shenanigans proof cloneNode
// it goes through all nodes manually
// instead of relying the engine to suddenly
// merge nodes together
const cloneNode = hasDoomedCloneNode ?
  node => {
    const clone = node.cloneNode();
    const childNodes = node.childNodes ||
                      // this is an excess of caution
                      // but some node, in IE, might not
                      // have childNodes property.
                      // The following fallback ensure working code
                      // in older IE without compromising performance
                      // or any other browser/engine involved.
                      /* istanbul ignore next */
                      [];
    const length = childNodes.length;
    for (let i = 0; i < length; i++) {
      clone.appendChild(cloneNode(childNodes[i]));
    }
    return clone;
  } :
  // the following ignore is due code-coverage
  // combination of not having document.importNode
  // but having a working node.cloneNode.
  // This shenario is common on older Android/WebKit browsers
  // but basicHTML here tests just two major cases:
  // with document.importNode or with broken cloneNode.
  /* istanbul ignore next */
  node => node.cloneNode(true);

// used to import html into fragments
const importNode = hasImportNode ?
  (doc, node) => doc.importNode(node, true) :
  (doc, node) => cloneNode(node)
exports.importNode = importNode

// just recycling a one-off array to use slice
// in every needed place
const slice = [].slice;
exports.slice = slice;

// lazy evaluated, returns the unique identity
// of a template literal, as tempalte literal itself.
// By default, ES2015 template literals are unique
// tag`a${1}z` === tag`a${2}z`
// even if interpolated values are different
// the template chunks are in a frozen Array
// that is identical each time you use the same
// literal to represent same static content
// around its own interpolations.
const unique = template => TL(template);
exports.unique = unique;

// TL returns a unique version of the template
// it needs lazy feature detection
// (cannot trust literals with transpiled code)
let TL = t => {
  if (
    // TypeScript template literals are not standard
    t.propertyIsEnumerable('raw') ||
    (
        // Firefox < 55 has not standard implementation neither
        /Firefox\/(\d+)/.test((G.navigator || {}).userAgent) &&
          parseFloat(RegExp.$1) < 55
        )
  ) {
    const T = {};
    TL = t => {
      const k = '^' + t.join('^');
      return T[k] || (T[k] = t);
    };
  } else {
    // make TL an identity like function
    TL = t => t;
  }
  return TL(t);
};

// used to store templates objects
// since neither Map nor WeakMap are safe
const TemplateMap = () => {
  try {
    const wm = new WeakMap;
    const o_O = Object.freeze([]);
    wm.set(o_O, true);
    if (!wm.get(o_O)) throw o_O;
    return wm;
  } catch(o_O) {
    // inevitable legacy code leaks due
    // https://github.com/tc39/ecma262/pull/890
    return new Map;
  }
};
exports.TemplateMap = TemplateMap;

// create document fragments via native template
// with a fallback for browsers that won't be able
// to deal with some injected element such <td> or others
const HTMLFragment = hasContent ?
  (node, html) => {
    const container = create(node, 'template');
    container.innerHTML = html;
    return container.content;
  } :
  (node, html) => {
    const container = create(node, 'template');
    const content = fragment(node);
    if (/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)) {
      const selector = RegExp.$1;
      container.innerHTML = '<table>' + html + '</table>';
      append(content, slice.call(container.querySelectorAll(selector)));
    } else {
      container.innerHTML = html;
      append(content, slice.call(container.childNodes));
    }
    return content;
  };

// creates SVG fragment with a fallback for IE that needs SVG
// within the HTML content
const SVGFragment = hasContent ?
  (node, html) => {
    const content = fragment(node);
    const container = doc(node).createElementNS(SVG_NAMESPACE, 'svg');
    container.innerHTML = html;
    append(content, slice.call(container.childNodes));
    return content;
  } :
  (node, html) => {
    const content = fragment(node);
    const container = create(node, 'div');
    container.innerHTML = '<svg xmlns="' + SVG_NAMESPACE + '">' + html + '</svg>';
    append(content, slice.call(container.firstChild.childNodes));
    return content;
  };


/***/ }),

/***/ "./components/navbar.js":
/*!******************************!*\
  !*** ./components/navbar.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n                                    <li class='", "'>\n                                        <a class='", "' href='", "'>", "</a>\n                                    </li>\n                            "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            <div class=\"navbar\">\n                <div class=\"container\">\n                    <div class=\"navbar-header\">\n                        <button type=\"button\" data-toggle=\"collapse\" data-target=\"#navigation\" class=\"navbar-toggle\">\n                            <span class=\"sr-only\">Toggle navigation</span>\n                            <span class=\"icon-bar\"></span><span class=\"icon-bar\"></span>\n                            <span class=\"icon-bar\"></span>\n                        </button>\n                        <a href=\"/\" class=\"navbar-brand\"><img alt=\"\u041A\u041A\u0420\u042F\" src=\"/images/logo.png\"/></a>\n                    </div>\n                    <div id='#navigation' class='collepse navbar-collapse'>\n                        <ul class='nav navbar-nav navbar-left'>\n                            ", "\n                        </ul>\n                        <ul class='nav navbar-nav navbar-right'>\n                            <li><a>access??settings??</a></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var hyperHTML = __webpack_require__(/*! hyperhtml/cjs */ "../node_modules/hyperhtml/cjs/index.js").default;

module.exports =
/*#__PURE__*/
function (_hyperHTML$Component) {
  _inherits(NavBar, _hyperHTML$Component);

  function NavBar() {
    var _this;

    _classCallCheck(this, NavBar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NavBar).call(this));
    _this.activeSection = '';
    if (_LOCALS) _this.activeSection = _LOCALS.section;
    return _this;
  }

  _createClass(NavBar, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return this.html(_templateObject(), _LOCALS.navLinks.map(function (l) {
        return hyperHTML.wire()(_templateObject2(), l.key == _this2.activeSection ? 'active' : '', l.style ? l.style : 'btn-simple', l.href, l.label);
      }));
    }
  }]);

  return NavBar;
}(hyperHTML.Component); // .navbar(role='navigation-demo')
//     .container
//         .navbar-header
//             button.navbar-toggle(type='button', data-toggle='collapse', data-target='#navigation')
//                 span.sr-only Toggle navigation
//                 span.icon-bar
//                 span.icon-bar
//                 span.icon-bar
//             a.navbar-brand(href='/')
//                 img(alt='ККРЯ' src='/images/logo.png')
//         #navigation.collapse.navbar-collapse
//             ul.nav.navbar-nav.navbar-left
//                 each link in navLinks
//                     li(class=(section == link.key ? 'active' : null)): a.btn(href=link.href class=(link.style ? link.style : 'btn-simple'))= link.label
//             ul.nav.navbar-nav.navbar-right
//                     if user
//                         if user.canAccessKeystone
//                             li: a(href='/keystone') Open Keystone
//                         li: a(href='/keystone/signout') Sign Out
//                     else
//                         li: a(href='/keystone/signin') Sign In

/***/ }),

/***/ "./components/postEditor.js":
/*!**********************************!*\
  !*** ./components/postEditor.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n                            <div class='image-preview'>\n                                \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E 1 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435:\n                                <br>\n                                <div class='thumbnail'>\n                                    <img src='", "'>\n                                    <a>X</a>\n                                </div>\n                            </div>\n                            "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n                        <button class='", "' onclick=", ">", "</button>\n                    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            <div class='", "' onconnected=", " >\n                <textarea class='form-control' id='", "' value=", "></textarea>\n                ", "\n                <hr>\n                <div>\n                    <button class='btn btn-link' id='UppyModalOpenerBtn'>\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435</button>\n                    <div class=\"DashboardContainer\"></div>\n                    ", "\n                </div>\n                \n            </div>\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var hyperHTML = __webpack_require__(/*! hyperhtml/cjs */ "../node_modules/hyperhtml/cjs/index.js").default;

var editorInstanceCounter = 0;

module.exports =
/*#__PURE__*/
function (_hyperHTML$Component) {
  _inherits(PostEditor, _hyperHTML$Component);

  /**
   * @param  {} params
   * @param.that {} 
   * @param.autoFocus bool focus on textarea after render
   * @param.content string
   * @param.class string
   * @param.buttons [] 
   * @param.buttons[i] {}
   * @param.buttons[i].title string
   * @param.buttons[i].class string
   * @param.buttons[i].onClick function
   */
  function PostEditor(params) {
    var _this;

    _classCallCheck(this, PostEditor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PostEditor).call(this));
    console.log(params);
    editorInstanceCounter++;
    var that = params.that;
    _this.autoFocus = params.autoFocus || false;
    _this.textAreaId = "editor-".concat(editorInstanceCounter);
    _this.post = params.post;
    _this.class = "editor ".concat(params.class || '');
    _this.buttons = params.buttons;

    _this.buttons.forEach(function (b) {
      b.onClick = b.onClick.bind(that, _assertThisInitialized(_assertThisInitialized(_this)));
      b.class = b.class || 'btn';
    });

    _this.state.images = _this.post.image;
    _this.state.uploadedFiles = [{
      preview: '/uploads/jam.png'
    }];
    return _this;
  }

  _createClass(PostEditor, [{
    key: "onconnected",
    value: function onconnected() {
      if (this.autoFocus) document.getElementById(this.textAreaId).focus();
    }
  }, {
    key: "render",
    value: function render() {
      return this.html(_templateObject(), this.class, this, this.textAreaId, this.post.content, this.buttons.map(function (b) {
        return hyperHTML.wire()(_templateObject2(), b.class, b.onClick, b.title);
      }), this.state.uploadedFiles.length ? hyperHTML.wire()(_templateObject3(), this.post.image.filename) : '');
    }
  }]);

  return PostEditor;
}(hyperHTML.Component);

/***/ }),

/***/ "./components/posts.js":
/*!*****************************!*\
  !*** ./components/posts.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject22() {
  var data = _taggedTemplateLiteral(["\n                        <button class='", "' onclick=", ">", "</button>\n                    "]);

  _templateObject22 = function _templateObject22() {
    return data;
  };

  return data;
}

function _templateObject21() {
  var data = _taggedTemplateLiteral(["\n            <div class='", "' onconnected=", " >\n                <textarea class='form-control' id='", "' value=", "></textarea>\n                ", "\n            </div>\n        "]);

  _templateObject21 = function _templateObject21() {
    return data;
  };

  return data;
}

function _templateObject20() {
  var data = _taggedTemplateLiteral(["\n            <li><a onclick='", "'>", "</a></li>\n        "]);

  _templateObject20 = function _templateObject20() {
    return data;
  };

  return data;
}

function _templateObject19() {
  var data = _taggedTemplateLiteral(["\n            <div class='post-tool-bar dropdown'>\n                <button class='btn btn-default dropdown-toggle' type='button' data-toggle='dropdown' aria-haspopup='true', aria-expanded='false'>...</button>\n                <span class='caret'></span>\n                <ul class='dropdown-menu'>\n                    ", "\n                </ul>\n            </div>\n        "]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = _taggedTemplateLiteral(["\n            <div class='row'>\n                    <div class='col-xs-3 col-sm-2'>\n                        <!--author's photo -->\n                        <a href='", "'>\n                            <img class='img-circle img-user' src='", "' alt='", "'>\n                        </a>\n                        <!--author's name -->\n                    </div>\n                    <div class='col-xs-9 col-sm-10 info-user'>\n                        <div>\n                            <a href='", "'>", "</a>\n                        </div>\n                        <p>\n                            <i>", "</i>\n                        </p>\n                    </div>\n                </div>\n        "]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = _taggedTemplateLiteral(["\n                        <div class='add-new-comment'>\n                            ", "\n                        </div>\n                    "]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = _taggedTemplateLiteral(["\n            <div class='comments'>\n                ", "\n                ", "\n            </div>\n        "]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n                        <li>\n                            ", "\n                            <div class='comment-content col-xs-offset-3 col-sm-offset-2'>\n                                ", "\n                            </div>\n                        </li>\n                    "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n                <ul>\n                    ", "\n                </ul>\n            "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["<div></div>"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n                                <li>\n                                    ", "\n                                    <div class='comment-content col-xs-offset-3 col-sm-offset-2'>\n                                        ", "\n                                    </div>\n                                </li>\n                            "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n                <ul>\n                    ", "\n                </ul>\n                <div>\n                    <button type=\"button\" class=\"btn btn-link\" data-call=showMore onclick=", ">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438</button>\n                </div>\n            "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["<div></div>"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n            <a onclick='", "' class='", "'>\n                <img draggable='false' class='emoji' alt=", " src=", "><span class='emoji-count'>", "</span>\n            </a>\n        "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n            <div class='card-post-content'>", "</div>\n            <div class='reaction'>\n                ", "\n            </div>\n        "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n                        <img draggable='false' class='img-post' alt='\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435' src='", "'>\n                    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n                ", "\n                ", "\n                ", "\n            "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["<div class='card-post-text'>", "</div>"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n                    <div class='card-post-text content-extendable' data-call=showMore onclick=", ">\n                        ", "...\n                        <br>\n                        <a>\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E</a>\n                    </div>\n                "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n                ", "\n            "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            <div class='card-post'>\n                ", "\n                <div class='row'>\n                    <div class='col-sm-8 col-sm-offset-2'>\n                        ", "\n                        ", "\n                    </div>\n                </div>\n            </div>\n            "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            <div class='container-fluid container-posts'>\n                ", "\n            </div>\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var hyperHTML = __webpack_require__(/*! hyperhtml/cjs */ "../node_modules/hyperhtml/cjs/index.js").default;

var PostEditor = __webpack_require__(/*! ./postEditor */ "./components/postEditor.js"); // let lazyLoad = new LazyLoad();


module.exports =
/*#__PURE__*/
function (_hyperHTML$Component) {
  _inherits(Posts, _hyperHTML$Component);

  function Posts(state) {
    var _this;

    _classCallCheck(this, Posts);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Posts).call(this));
    _this.state = state;
    return _this;
  }

  _createClass(Posts, [{
    key: "render",
    value: function render() {
      return this.html(_templateObject(), this.state.posts.results.map(function (post) {
        return new Post(post);
      }));
    }
  }]);

  return Posts;
}(hyperHTML.Component);

var Post =
/*#__PURE__*/
function (_hyperHTML$Component2) {
  _inherits(Post, _hyperHTML$Component2);

  function Post(state) {
    var _this2;

    _classCallCheck(this, Post);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Post).call(this));
    _this2.state = state;
    return _this2;
  }

  _createClass(Post, [{
    key: "render",
    value: function render() {
      var post = this.state;
      var author = this.state.author;
      var comments = this.state.comments;
      return this.html(_templateObject2(), new ContentHeader(author, post.publishedDate), new PostContent(post), new CommentBlock(comments, post.id));
    }
  }]);

  return Post;
}(hyperHTML.Component);

var PostContent =
/*#__PURE__*/
function (_hyperHTML$Component3) {
  _inherits(PostContent, _hyperHTML$Component3);

  function PostContent(post) {
    var _this3;

    _classCallCheck(this, PostContent);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(PostContent).call(this));
    _this3.post = post;
    _this3.showAll = false;
    _this3.isEdited = false;
    _this3.visible = true;
    return _this3;
  }

  _createClass(PostContent, [{
    key: "deletePost",
    value: function deletePost() {
      var postId = this.post.id;
      var that = this;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/post/' + postId + '/remove', true);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          location.reload();
        }
      };
    }
  }, {
    key: "editContent",
    value: function editContent() {
      this.isEdited = true;
      this.render();
    }
  }, {
    key: "cancelEdition",
    value: function cancelEdition() {
      this.isEdited = false;
      this.render();
    }
  }, {
    key: "saveEdition",
    value: function saveEdition(content) {
      content = content.render().querySelector('textarea').value;
      var postId = this.post.id;
      var that = this;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/post/' + postId + '/update?content=' + content, true);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          that.post.content = content;
          that.showAll = true;
          that.isEdited = false;
          that.render();
        }
      };
    }
  }, {
    key: "showMore",
    value: function showMore() {
      this.showAll = true;
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var content;

      if (this.isEdited) {
        content = hyperHTML.wire()(_templateObject3(), new PostEditor({
          that: this,
          autoFocus: true,
          post: this.post,
          class: '',
          buttons: [{
            title: 'Сохранить',
            class: 'btn btn-primary',
            onClick: this.saveEdition
          }, {
            title: 'Отменить',
            class: 'btn',
            onClick: this.cancelEdition
          }]
        }));
      } else {
        var text;

        if (this.post.content.length > 100 && !this.showAll) {
          text = hyperHTML.wire()(_templateObject4(), this, this.post.content.substr(0, 100));
        } else {
          text = hyperHTML.wire()(_templateObject5(), this.post.content);
        }

        content = hyperHTML.wire()(_templateObject6(), text, this.post.image.filename ? hyperHTML.wire()(_templateObject7(), '/' + this.post.image.filename) : '', _LOCALS.registered && this.post.author._id == _LOCALS.user._id ? new Dropdown([{
          text: 'редактировать',
          clickHandler: this.editContent,
          that: this
        }, {
          text: 'удалить',
          clickHandler: this.deletePost,
          that: this
        }]) : '');
      }

      return this.html(_templateObject8(), content, new Like(this.post));
    }
  }]);

  return PostContent;
}(hyperHTML.Component);

var Like =
/*#__PURE__*/
function (_hyperHTML$Component4) {
  _inherits(Like, _hyperHTML$Component4);

  function Like(post) {
    var _this4;

    _classCallCheck(this, Like);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Like).call(this));
    _this4.state.postId = post.id;
    _this4.state.postAuthor = post.author._id;
    _this4.state.likesCount = post.likes ? post.likes.length : 0;
    _this4.clickHandler = _this4.clickHandler.bind(_assertThisInitialized(_assertThisInitialized(_this4)));
    return _this4;
  }

  _createClass(Like, [{
    key: "clickHandler",
    value: function clickHandler(e) {
      e.preventDefault();
      if (!_LOCALS.registered) return;
      if (_LOCALS.user._id == this.state.postAuthor) return;
      var q = "/api/like/post/".concat(this.state.postId);
      var xhr = new XMLHttpRequest();
      var that = this;
      xhr.open('GET', q, true);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          var res = JSON.parse(this.responseText);
          if (res.error) return;
          that.state.likesCount = res.likesCount;
          that.render();
        }
      };
    }
  }, {
    key: "render",
    value: function render() {
      var image = this.state.likesCount == 0 ? 'https://twemoji.maxcdn.com/2/72x72/1f49b.png' : 'https://twemoji.maxcdn.com/16x16/2764.png';
      var imageAlt = this.state.likesCount == 0 ? '♡' : '❤';
      var clName = 'disabled';

      if (_LOCALS.registered) {
        if (_LOCALS.user._id != this.state.postAuthor) clName = 'enabled';
      }

      return this.html(_templateObject9(), this.clickHandler, clName, imageAlt, image, this.state.likesCount);
    }
  }]);

  return Like;
}(hyperHTML.Component);

var CommentBlock =
/*#__PURE__*/
function (_hyperHTML$Component5) {
  _inherits(CommentBlock, _hyperHTML$Component5);

  function CommentBlock(comments, postId) {
    var _this5;

    _classCallCheck(this, CommentBlock);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(CommentBlock).call(this));
    _this5.commentsMaxLength = 3;
    _this5.showAll = false;
    _this5.comments = comments || [];
    _this5.postId = postId;
    _this5.addComment = _this5.addComment.bind(_assertThisInitialized(_assertThisInitialized(_this5)));
    return _this5;
  }

  _createClass(CommentBlock, [{
    key: "addComment",
    value: function addComment(content) {
      content = content.render().querySelector('textarea').value;
      var q = '/api/comment/create?';
      q += 'content=' + content;
      q += '&post=' + this.postId;
      var xhr = new XMLHttpRequest();
      var that = this;
      xhr.open('GET', q, true);
      xhr.send();

      xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE) {
          var newComment = JSON.parse(this.responseText);
          that.comments.unshift(newComment.comment);
          that.render();
        }
      };
    }
  }, {
    key: "showMore",
    value: function showMore() {
      this.showAll = true;
      this.render();
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      if (!this.comments.length && !_LOCALS.registered) return this.html(_templateObject10());
      var content;
      var comments;

      if (this.comments.length >= this.commentsMaxLength && !this.showAll) {
        comments = hyperHTML.wire()(_templateObject11(), this.comments.map(function (comment, i) {
          if (i < _this6.commentsMaxLength) {
            return hyperHTML.wire()(_templateObject12(), new ContentHeader(comment.author, comment.publishedDate), comment.content);
          } else return hyperHTML.wire()(_templateObject13());
        }), this);
      } else {
        comments = hyperHTML.wire()(_templateObject14(), this.comments.map(function (comment) {
          return hyperHTML.wire(comment)(_templateObject15(), new ContentHeader(comment.author, comment.publishedDate), comment.content);
        }));
      }

      return this.html(_templateObject16(), _LOCALS.registered ? hyperHTML.wire()(_templateObject17(), new CommentEditor({
        that: this,
        autoFocus: false,
        content: '',
        class: '',
        buttons: [{
          title: 'Комментировать',
          class: 'btn btn-link',
          onClick: this.addComment
        }]
      })) : '', comments);
    }
  }]);

  return CommentBlock;
}(hyperHTML.Component);

var PUB_DATE_OPTS = {
  // era: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric' // second: 'numeric'

};

var ContentHeader =
/*#__PURE__*/
function (_hyperHTML$Component6) {
  _inherits(ContentHeader, _hyperHTML$Component6);

  function ContentHeader(author, pubDate) {
    var _this7;

    _classCallCheck(this, ContentHeader);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(ContentHeader).call(this));
    _this7.author = author;
    _this7.pubDate = '';

    if (pubDate != undefined) {
      _this7.pubDate = new Date(pubDate);
      _this7.pubDate = _this7.pubDate.toLocaleString('ru', PUB_DATE_OPTS);
    }

    return _this7;
  }

  _createClass(ContentHeader, [{
    key: "render",
    value: function render() {
      var authorsPage = '/author/' + this.author.slug;
      var authorPhoto = this.author.authorPhoto;
      var name = "".concat(this.author.authorName.last, " ").concat(this.author.authorName.first);
      return this.html(_templateObject18(), authorsPage, authorPhoto ? "/".concat(authorPhoto.filename) : '/images/avatar-default.png', name, authorsPage, name, this.pubDate);
    }
  }]);

  return ContentHeader;
}(hyperHTML.Component);

var Dropdown =
/*#__PURE__*/
function (_hyperHTML$Component7) {
  _inherits(Dropdown, _hyperHTML$Component7);

  function Dropdown(params) {
    var _this8;

    _classCallCheck(this, Dropdown);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this));
    _this8.params = params;
    return _this8;
  }

  _createClass(Dropdown, [{
    key: "render",
    value: function render() {
      return this.html(_templateObject19(), this.params.map(function (p) {
        return new DropdownButton(p.text, p.clickHandler, p.that);
      }));
    }
  }]);

  return Dropdown;
}(hyperHTML.Component);

var DropdownButton =
/*#__PURE__*/
function (_hyperHTML$Component8) {
  _inherits(DropdownButton, _hyperHTML$Component8);

  function DropdownButton(text, clickHandler, that) {
    var _this9;

    _classCallCheck(this, DropdownButton);

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(DropdownButton).call(this));
    _this9.text = text;
    _this9.clickHandler = clickHandler.bind(that);
    return _this9;
  }

  _createClass(DropdownButton, [{
    key: "render",
    value: function render() {
      return this.html(_templateObject20(), this.clickHandler, this.text);
    }
  }]);

  return DropdownButton;
}(hyperHTML.Component);

var editorInstanceCounter = 0;

var CommentEditor =
/*#__PURE__*/
function (_hyperHTML$Component9) {
  _inherits(CommentEditor, _hyperHTML$Component9);

  /**
   * @param  {} params
   * @param.that {} 
   * @param.autoFocus bool focus on textarea after render
   * @param.content string
   * @param.class string
   * @param.buttons [] 
   * @param.buttons[i] {}
   * @param.buttons[i].title string
   * @param.buttons[i].class string
   * @param.buttons[i].onClick function
   */
  function CommentEditor(params) {
    var _this10;

    _classCallCheck(this, CommentEditor);

    _this10 = _possibleConstructorReturn(this, _getPrototypeOf(CommentEditor).call(this));
    editorInstanceCounter++;
    var that = params.that;
    _this10.autoFocus = params.autoFocus || false;
    _this10.textAreaId = "editor-".concat(editorInstanceCounter);
    _this10.content = params.content || '';
    _this10.class = "editor ".concat(params.class || '');
    _this10.buttons = params.buttons;

    _this10.buttons.forEach(function (b) {
      b.onClick = b.onClick.bind(that, _assertThisInitialized(_assertThisInitialized(_this10)));
      b.class = b.class || 'btn';
    });

    return _this10;
  }

  _createClass(CommentEditor, [{
    key: "onconnected",
    value: function onconnected() {
      if (this.autoFocus) document.getElementById(this.textAreaId).focus();
    }
  }, {
    key: "render",
    value: function render() {
      return this.html(_templateObject21(), this.class, this, this.textAreaId, this.content, this.buttons.map(function (b) {
        return hyperHTML.wire()(_templateObject22(), b.class, b.onClick, b.title);
      }));
    }
  }]);

  return CommentEditor;
}(hyperHTML.Component);

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9ucy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS8uLi9ub2RlX21vZHVsZXMvaHlwZXJodG1sL2Nqcy9jbGFzc2VzL0NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi4vbm9kZV9tb2R1bGVzL2h5cGVyaHRtbC9janMvY2xhc3Nlcy9XaXJlLmpzIiwid2VicGFjazovL1tuYW1lXS8uLi9ub2RlX21vZHVsZXMvaHlwZXJodG1sL2Nqcy9oeXBlci9yZW5kZXIuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4uL25vZGVfbW9kdWxlcy9oeXBlcmh0bWwvY2pzL2h5cGVyL3dpcmUuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4uL25vZGVfbW9kdWxlcy9oeXBlcmh0bWwvY2pzL2luZGV4LmpzIiwid2VicGFjazovL1tuYW1lXS8uLi9ub2RlX21vZHVsZXMvaHlwZXJodG1sL2Nqcy9vYmplY3RzL0ludGVudC5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi4vbm9kZV9tb2R1bGVzL2h5cGVyaHRtbC9janMvb2JqZWN0cy9QYXRoLmpzIiwid2VicGFjazovL1tuYW1lXS8uLi9ub2RlX21vZHVsZXMvaHlwZXJodG1sL2Nqcy9vYmplY3RzL1N0eWxlLmpzIiwid2VicGFjazovL1tuYW1lXS8uLi9ub2RlX21vZHVsZXMvaHlwZXJodG1sL2Nqcy9vYmplY3RzL1VwZGF0ZXMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4uL25vZGVfbW9kdWxlcy9oeXBlcmh0bWwvY2pzL3NoYXJlZC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4uL25vZGVfbW9kdWxlcy9oeXBlcmh0bWwvY2pzL3NoYXJlZC9kb21kaWZmLmpzIiwid2VicGFjazovL1tuYW1lXS8uLi9ub2RlX21vZHVsZXMvaHlwZXJodG1sL2Nqcy9zaGFyZWQvZWFzeS1kb20uanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4uL25vZGVfbW9kdWxlcy9oeXBlcmh0bWwvY2pzL3NoYXJlZC9mZWF0dXJlcy1kZXRlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vW25hbWVdLy4uL25vZGVfbW9kdWxlcy9oeXBlcmh0bWwvY2pzL3NoYXJlZC9wb29ybHlmaWxscy5qcyIsIndlYnBhY2s6Ly9bbmFtZV0vLi4vbm9kZV9tb2R1bGVzL2h5cGVyaHRtbC9janMvc2hhcmVkL3JlLmpzIiwid2VicGFjazovL1tuYW1lXS8uLi9ub2RlX21vZHVsZXMvaHlwZXJodG1sL2Nqcy9zaGFyZWQvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vW25hbWVdL2Zyb250ZW5kL2NvbXBvbmVudHMvbmF2YmFyLmpzIiwid2VicGFjazovL1tuYW1lXS9mcm9udGVuZC9jb21wb25lbnRzL3Bvc3RFZGl0b3IuanMiLCJ3ZWJwYWNrOi8vW25hbWVdL2Zyb250ZW5kL2NvbXBvbmVudHMvcG9zdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuY29uc3QgeyBNYXAsIFdlYWtNYXAgfSA9IHJlcXVpcmUoJy4uL3NoYXJlZC9wb29ybHlmaWxscy5qcycpO1xuXG4vLyBoeXBlckhUTUwuQ29tcG9uZW50IGlzIGEgdmVyeSBiYXNpYyBjbGFzc1xuLy8gYWJsZSB0byBjcmVhdGUgQ3VzdG9tIEVsZW1lbnRzIGxpa2UgY29tcG9uZW50c1xuLy8gaW5jbHVkaW5nIHRoZSBhYmlsaXR5IHRvIGxpc3RlbiB0byBjb25uZWN0L2Rpc2Nvbm5lY3Rcbi8vIGV2ZW50cyB2aWEgb25jb25uZWN0L29uZGlzY29ubmVjdCBhdHRyaWJ1dGVzXG4vLyBDb21wb25lbnRzIGNhbiBiZSBjcmVhdGVkIGltcGVyYXRpdmVseSBvciBkZWNsYXJhdGl2ZWx5LlxuLy8gVGhlIG1haW4gZGlmZmVyZW5jZSBpcyB0aGF0IGRlY2xhcmVkIGNvbXBvbmVudHNcbi8vIHdpbGwgbm90IGF1dG9tYXRpY2FsbHkgcmVuZGVyIG9uIHNldFN0YXRlKC4uLilcbi8vIHRvIHNpbXBsaWZ5IHN0YXRlIGhhbmRsaW5nIG9uIHJlbmRlci5cbmZ1bmN0aW9uIENvbXBvbmVudCgpIHtcbiAgcmV0dXJuIHRoaXM7IC8vIHRoaXMgaXMgbmVlZGVkIGluIEVkZ2UgISEhXG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KS5kZWZhdWx0ID0gQ29tcG9uZW50XG5cbi8vIENvbXBvbmVudCBpcyBsYXppbHkgc2V0dXAgYmVjYXVzZSBpdCBuZWVkc1xuLy8gd2lyZSBtZWNoYW5pc20gYXMgbGF6eSBjb250ZW50XG5mdW5jdGlvbiBzZXR1cChjb250ZW50KSB7XG4gIC8vIHRoZXJlIGFyZSB2YXJpb3VzIHdlYWtseSByZWZlcmVuY2VkIHZhcmlhYmxlcyBpbiBoZXJlXG4gIC8vIGFuZCBtb3N0bHkgYXJlIHRvIHVzZSBDb21wb25lbnQuZm9yKC4uLikgc3RhdGljIG1ldGhvZC5cbiAgY29uc3QgY2hpbGRyZW4gPSBuZXcgV2Vha01hcDtcbiAgY29uc3QgY3JlYXRlID0gT2JqZWN0LmNyZWF0ZTtcbiAgY29uc3QgY3JlYXRlRW50cnkgPSAod20sIGlkLCBjb21wb25lbnQpID0+IHtcbiAgICB3bS5zZXQoaWQsIGNvbXBvbmVudCk7XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbiAgfTtcbiAgY29uc3QgZ2V0ID0gKENsYXNzLCBpbmZvLCBjb250ZXh0LCBpZCkgPT4ge1xuICAgIGNvbnN0IHJlbGF0aW9uID0gaW5mby5nZXQoQ2xhc3MpIHx8IHJlbGF0ZShDbGFzcywgaW5mbyk7XG4gICAgc3dpdGNoICh0eXBlb2YgaWQpIHtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIGNvbnN0IHdtID0gcmVsYXRpb24udyB8fCAocmVsYXRpb24udyA9IG5ldyBXZWFrTWFwKTtcbiAgICAgICAgcmV0dXJuIHdtLmdldChpZCkgfHwgY3JlYXRlRW50cnkod20sIGlkLCBuZXcgQ2xhc3MoY29udGV4dCkpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3Qgc20gPSByZWxhdGlvbi5wIHx8IChyZWxhdGlvbi5wID0gY3JlYXRlKG51bGwpKTtcbiAgICAgICAgcmV0dXJuIHNtW2lkXSB8fCAoc21baWRdID0gbmV3IENsYXNzKGNvbnRleHQpKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHJlbGF0ZSA9IChDbGFzcywgaW5mbykgPT4ge1xuICAgIGNvbnN0IHJlbGF0aW9uID0ge3c6IG51bGwsIHA6IG51bGx9O1xuICAgIGluZm8uc2V0KENsYXNzLCByZWxhdGlvbik7XG4gICAgcmV0dXJuIHJlbGF0aW9uO1xuICB9O1xuICBjb25zdCBzZXQgPSBjb250ZXh0ID0+IHtcbiAgICBjb25zdCBpbmZvID0gbmV3IE1hcDtcbiAgICBjaGlsZHJlbi5zZXQoY29udGV4dCwgaW5mbyk7XG4gICAgcmV0dXJuIGluZm87XG4gIH07XG4gIC8vIFRoZSBDb21wb25lbnQgQ2xhc3NcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG4gICAgQ29tcG9uZW50LFxuICAgIHtcbiAgICAgIC8vIENvbXBvbmVudC5mb3IoY29udGV4dFssIGlkXSkgaXMgYSBjb252ZW5pZW50IHdheVxuICAgICAgLy8gdG8gYXV0b21hdGljYWxseSByZWxhdGUgZGF0YS9jb250ZXh0IHRvIGNoaWxkcmVuIGNvbXBvbmVudHNcbiAgICAgIC8vIElmIG5vdCBjcmVhdGVkIHlldCwgdGhlIG5ldyBDb21wb25lbnQoY29udGV4dCkgaXMgd2Vha2x5IHN0b3JlZFxuICAgICAgLy8gYW5kIGFmdGVyIHRoYXQgc2FtZSBpbnN0YW5jZSB3b3VsZCBhbHdheXMgYmUgcmV0dXJuZWQuXG4gICAgICBmb3I6IHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZShjb250ZXh0LCBpZCkge1xuICAgICAgICAgIHJldHVybiBnZXQoXG4gICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgY2hpbGRyZW4uZ2V0KGNvbnRleHQpIHx8IHNldChjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICBpZCA9PSBudWxsID9cbiAgICAgICAgICAgICAgJ2RlZmF1bHQnIDogaWRcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICApO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhcbiAgICBDb21wb25lbnQucHJvdG90eXBlLFxuICAgIHtcbiAgICAgIC8vIGFsbCBldmVudHMgYXJlIGhhbmRsZWQgd2l0aCB0aGUgY29tcG9uZW50IGFzIGNvbnRleHRcbiAgICAgIGhhbmRsZUV2ZW50OiB7dmFsdWUoZSkge1xuICAgICAgICBjb25zdCBjdCA9IGUuY3VycmVudFRhcmdldDtcbiAgICAgICAgdGhpc1tcbiAgICAgICAgICAoJ2dldEF0dHJpYnV0ZScgaW4gY3QgJiYgY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWNhbGwnKSkgfHxcbiAgICAgICAgICAoJ29uJyArIGUudHlwZSlcbiAgICAgICAgXShlKTtcbiAgICAgIH19LFxuICAgICAgLy8gY29tcG9uZW50cyB3aWxsIGxhemlseSBkZWZpbmUgaHRtbCBvciBzdmcgcHJvcGVydGllc1xuICAgICAgLy8gYXMgc29vbiBhcyB0aGVzZSBhcmUgaW52b2tlZCB3aXRoaW4gdGhlIC5yZW5kZXIoKSBtZXRob2RcbiAgICAgIC8vIFN1Y2ggcmVuZGVyKCkgbWV0aG9kIGlzIG5vdCBwcm92aWRlZCBieSB0aGUgYmFzZSBjbGFzc1xuICAgICAgLy8gYnV0IGl0IG11c3QgYmUgYXZhaWxhYmxlIHRocm91Z2ggdGhlIENvbXBvbmVudCBleHRlbmQuXG4gICAgICAvLyBEZWNsYXJlZCBjb21wb25lbnRzIGNvdWxkIGltcGxlbWVudCBhXG4gICAgICAvLyByZW5kZXIocHJvcHMpIG1ldGhvZCB0b28gYW5kIHVzZSBwcm9wcyBhcyBuZWVkZWQuXG4gICAgICBodG1sOiBsYXp5R2V0dGVyKCdodG1sJywgY29udGVudCksXG4gICAgICBzdmc6IGxhenlHZXR0ZXIoJ3N2ZycsIGNvbnRlbnQpLFxuICAgICAgLy8gdGhlIHN0YXRlIGlzIGEgdmVyeSBiYXNpYy9zaW1wbGUgbWVjaGFuaXNtIGluc3BpcmVkIGJ5IFByZWFjdFxuICAgICAgc3RhdGU6IGxhenlHZXR0ZXIoJ3N0YXRlJywgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kZWZhdWx0U3RhdGU7IH0pLFxuICAgICAgLy8gaXQgaXMgcG9zc2libGUgdG8gZGVmaW5lIGEgZGVmYXVsdCBzdGF0ZSB0aGF0J2QgYmUgYWx3YXlzIGFuIG9iamVjdCBvdGhlcndpc2VcbiAgICAgIGRlZmF1bHRTdGF0ZToge2dldCgpIHsgcmV0dXJuIHt9OyB9fSxcbiAgICAgIC8vIHNldHRpbmcgc29tZSBwcm9wZXJ0eSBzdGF0ZSB0aHJvdWdoIGEgbmV3IG9iamVjdFxuICAgICAgLy8gb3IgYSBjYWxsYmFjaywgdHJpZ2dlcnMgYWxzbyBhdXRvbWF0aWNhbGx5IGEgcmVuZGVyXG4gICAgICAvLyB1bmxlc3MgZXhwbGljaXRseSBzcGVjaWZpZWQgdG8gbm90IGRvIHNvIChyZW5kZXIgPT09IGZhbHNlKVxuICAgICAgc2V0U3RhdGU6IHt2YWx1ZShzdGF0ZSwgcmVuZGVyKSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHNvdXJjZSA9IHR5cGVvZiBzdGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IHN0YXRlLmNhbGwodGhpcywgdGFyZ2V0KSA6IHN0YXRlO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBzb3VyY2UpIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIGlmIChyZW5kZXIgIT09IGZhbHNlKSB0aGlzLnJlbmRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH19XG4gICAgfVxuICApO1xufVxuZXhwb3J0cy5zZXR1cCA9IHNldHVwXG5cbi8vIGluc3RlYWQgb2YgYSBzZWNyZXQga2V5IEkgY291bGQndmUgdXNlZCBhIFdlYWtNYXBcbi8vIEhvd2V2ZXIsIGF0dGFjaGluZyBhIHByb3BlcnR5IGRpcmVjdGx5IHdpbGwgcmVzdWx0XG4vLyBpbnRvIGJldHRlciBwZXJmb3JtYW5jZSB3aXRoIHRob3VzYW5kcyBvZiBjb21wb25lbnRzXG4vLyBoYW5naW5nIGFyb3VuZCwgYW5kIGxlc3MgbWVtb3J5IHByZXNzdXJlIGNhdXNlZCBieSB0aGUgV2Vha01hcFxuY29uc3QgbGF6eUdldHRlciA9ICh0eXBlLCBmbikgPT4ge1xuICBjb25zdCBzZWNyZXQgPSAnXycgKyB0eXBlICsgJyQnO1xuICByZXR1cm4ge1xuICAgIGdldCgpIHtcbiAgICAgIHJldHVybiB0aGlzW3NlY3JldF0gfHwgKHRoaXNbdHlwZV0gPSBmbi5jYWxsKHRoaXMsIHR5cGUpKTtcbiAgICB9LFxuICAgIHNldCh2YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHNlY3JldCwge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWV9KTtcbiAgICB9XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgeyBhcHBlbmQgfSA9IHJlcXVpcmUoJy4uL3NoYXJlZC91dGlscy5qcycpO1xuY29uc3QgeyBkb2MsIGZyYWdtZW50IH0gPSByZXF1aXJlKCcuLi9zaGFyZWQvZWFzeS1kb20uanMnKTtcblxuZnVuY3Rpb24gV2lyZShjaGlsZE5vZGVzKSB7XG4gIHRoaXMuY2hpbGROb2RlcyA9IGNoaWxkTm9kZXM7XG4gIHRoaXMubGVuZ3RoID0gY2hpbGROb2Rlcy5sZW5ndGg7XG4gIHRoaXMuZmlyc3QgPSBjaGlsZE5vZGVzWzBdO1xuICB0aGlzLmxhc3QgPSBjaGlsZE5vZGVzW3RoaXMubGVuZ3RoIC0gMV07XG59XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KS5kZWZhdWx0ID0gV2lyZVxuXG4vLyB3aGVuIGEgd2lyZSBpcyBpbnNlcnRlZCwgYWxsIGl0cyBub2RlcyB3aWxsIGZvbGxvd1xuV2lyZS5wcm90b3R5cGUuaW5zZXJ0ID0gZnVuY3Rpb24gaW5zZXJ0KCkge1xuICBjb25zdCBkZiA9IGZyYWdtZW50KHRoaXMuZmlyc3QpO1xuICBhcHBlbmQoZGYsIHRoaXMuY2hpbGROb2Rlcyk7XG4gIHJldHVybiBkZjtcbn07XG5cbi8vIHdoZW4gYSB3aXJlIGlzIHJlbW92ZWQsIGFsbCBpdHMgbm9kZXMgbXVzdCBiZSByZW1vdmVkIGFzIHdlbGxcbldpcmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgY29uc3QgZmlyc3QgPSB0aGlzLmZpcnN0O1xuICBjb25zdCBsYXN0ID0gdGhpcy5sYXN0O1xuICBpZiAodGhpcy5sZW5ndGggPT09IDIpIHtcbiAgICBsYXN0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGFzdCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgcmFuZ2UgPSBkb2MoZmlyc3QpLmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2V0U3RhcnRCZWZvcmUodGhpcy5jaGlsZE5vZGVzWzFdKTtcbiAgICByYW5nZS5zZXRFbmRBZnRlcihsYXN0KTtcbiAgICByYW5nZS5kZWxldGVDb250ZW50cygpO1xuICB9XG4gIHJldHVybiBmaXJzdDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCB7TWFwLCBXZWFrTWFwfSA9IHJlcXVpcmUoJy4uL3NoYXJlZC9wb29ybHlmaWxscy5qcycpO1xuY29uc3Qge0csIFVJREMsIFZPSURfRUxFTUVOVFN9ID0gcmVxdWlyZSgnLi4vc2hhcmVkL2NvbnN0YW50cy5qcycpO1xuY29uc3QgVXBkYXRlcyA9IChtID0+IG0uX19lc01vZHVsZSA/IG0uZGVmYXVsdCA6IG0pKHJlcXVpcmUoJy4uL29iamVjdHMvVXBkYXRlcy5qcycpKTtcbmNvbnN0IHtcbiAgY3JlYXRlRnJhZ21lbnQsXG4gIGltcG9ydE5vZGUsXG4gIHVuaXF1ZSxcbiAgVGVtcGxhdGVNYXBcbn0gPSByZXF1aXJlKCcuLi9zaGFyZWQvdXRpbHMuanMnKTtcblxuY29uc3Qge3NlbGZDbG9zaW5nfSA9IHJlcXVpcmUoJy4uL3NoYXJlZC9yZS5qcycpO1xuXG4vLyBhIHdlYWsgY29sbGVjdGlvbiBvZiBjb250ZXh0cyB0aGF0XG4vLyBhcmUgYWxyZWFkeSBrbm93biB0byBoeXBlckhUTUxcbmNvbnN0IGJld2l0Y2hlZCA9IG5ldyBXZWFrTWFwO1xuXG4vLyBhbGwgdW5pcXVlIHRlbXBsYXRlIGxpdGVyYWxzXG5jb25zdCB0ZW1wbGF0ZXMgPSBUZW1wbGF0ZU1hcCgpO1xuXG4vLyBiZXR0ZXIga25vd24gYXMgaHlwZXIuYmluZChub2RlKSwgdGhlIHJlbmRlciBpc1xuLy8gdGhlIG1haW4gdGFnIGZ1bmN0aW9uIGluIGNoYXJnZSBvZiBmdWxseSB1cGdyYWRpbmdcbi8vIG9yIHNpbXBseSB1cGRhdGluZywgY29udGV4dHMgdXNlZCBhcyBoeXBlckhUTUwgdGFyZ2V0cy5cbi8vIFRoZSBgdGhpc2AgY29udGV4dCBpcyBlaXRoZXIgYSByZWd1bGFyIERPTSBub2RlIG9yIGEgZnJhZ21lbnQuXG5mdW5jdGlvbiByZW5kZXIodGVtcGxhdGUpIHtcbiAgY29uc3Qgd2lja2VkID0gYmV3aXRjaGVkLmdldCh0aGlzKTtcbiAgaWYgKHdpY2tlZCAmJiB3aWNrZWQudGVtcGxhdGUgPT09IHVuaXF1ZSh0ZW1wbGF0ZSkpIHtcbiAgICB1cGRhdGUuYXBwbHkod2lja2VkLnVwZGF0ZXMsIGFyZ3VtZW50cyk7XG4gIH0gZWxzZSB7XG4gICAgdXBncmFkZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBhbiB1cGdyYWRlIGlzIGluIGNoYXJnZSBvZiBjb2xsZWN0aW5nIHRlbXBsYXRlIGluZm8sXG4vLyBwYXJzZSBpdCBvbmNlLCBpZiB1bmtub3duLCB0byBtYXAgYWxsIGludGVycG9sYXRpb25zXG4vLyBhcyBzaW5nbGUgRE9NIGNhbGxiYWNrcywgcmVsYXRlIHN1Y2ggdGVtcGxhdGVcbi8vIHRvIHRoZSBjdXJyZW50IGNvbnRleHQsIGFuZCByZW5kZXIgaXQgYWZ0ZXIgY2xlYW5pbmcgdGhlIGNvbnRleHQgdXBcbmZ1bmN0aW9uIHVwZ3JhZGUodGVtcGxhdGUpIHtcbiAgdGVtcGxhdGUgPSB1bmlxdWUodGVtcGxhdGUpO1xuICBjb25zdCBpbmZvID0gIHRlbXBsYXRlcy5nZXQodGVtcGxhdGUpIHx8XG4gICAgICAgICAgICAgICAgY3JlYXRlVGVtcGxhdGUuY2FsbCh0aGlzLCB0ZW1wbGF0ZSk7XG4gIGNvbnN0IGZyYWdtZW50ID0gaW1wb3J0Tm9kZSh0aGlzLm93bmVyRG9jdW1lbnQsIGluZm8uZnJhZ21lbnQpO1xuICBjb25zdCB1cGRhdGVzID0gVXBkYXRlcy5jcmVhdGUoZnJhZ21lbnQsIGluZm8ucGF0aHMpO1xuICBiZXdpdGNoZWQuc2V0KHRoaXMsIHt0ZW1wbGF0ZSwgdXBkYXRlc30pO1xuICB1cGRhdGUuYXBwbHkodXBkYXRlcywgYXJndW1lbnRzKTtcbiAgdGhpcy50ZXh0Q29udGVudCA9ICcnO1xuICB0aGlzLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcbn1cblxuLy8gYW4gdXBkYXRlIHNpbXBseSBsb29wcyBvdmVyIGFsbCBtYXBwZWQgRE9NIG9wZXJhdGlvbnNcbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgY29uc3QgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHRoaXNbaSAtIDFdKGFyZ3VtZW50c1tpXSk7XG4gIH1cbn1cblxuLy8gYSB0ZW1wbGF0ZSBjYW4gYmUgdXNlZCB0byBjcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudFxuLy8gYXdhcmUgb2YgYWxsIGludGVycG9sYXRpb25zIGFuZCB3aXRoIGEgbGlzdFxuLy8gb2YgcGF0aHMgdXNlZCB0byBmaW5kIG9uY2UgdGhvc2Ugbm9kZXMgdGhhdCBuZWVkIHVwZGF0ZXMsXG4vLyBubyBtYXR0ZXIgaWYgdGhlc2UgYXJlIGF0dHJpYnV0ZXMsIHRleHQgbm9kZXMsIG9yIHJlZ3VsYXIgb25lXG5mdW5jdGlvbiBjcmVhdGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICBjb25zdCBwYXRocyA9IFtdO1xuICBjb25zdCBodG1sID0gdGVtcGxhdGUuam9pbihVSURDKS5yZXBsYWNlKFNDX1JFLCBTQ19QTEFDRSk7XG4gIGNvbnN0IGZyYWdtZW50ID0gY3JlYXRlRnJhZ21lbnQodGhpcywgaHRtbCk7XG4gIFVwZGF0ZXMuZmluZChmcmFnbWVudCwgcGF0aHMsIHRlbXBsYXRlLnNsaWNlKCkpO1xuICBjb25zdCBpbmZvID0ge2ZyYWdtZW50LCBwYXRoc307XG4gIHRlbXBsYXRlcy5zZXQodGVtcGxhdGUsIGluZm8pO1xuICByZXR1cm4gaW5mbztcbn1cblxuLy8gc29tZSBub2RlIGNvdWxkIGJlIHNwZWNpYWwgdGhvdWdoLCBsaWtlIGEgY3VzdG9tIGVsZW1lbnRcbi8vIHdpdGggYSBzZWxmIGNsb3NpbmcgdGFnLCB3aGljaCBzaG91bGQgd29yayB0aHJvdWdoIHRoZXNlIGNoYW5nZXMuXG5jb25zdCBTQ19SRSA9IHNlbGZDbG9zaW5nO1xuY29uc3QgU0NfUExBQ0UgPSAoJDAsICQxLCAkMikgPT4ge1xuICByZXR1cm4gVk9JRF9FTEVNRU5UUy50ZXN0KCQxKSA/ICQwIDogKCc8JyArICQxICsgJDIgKyAnPjwvJyArICQxICsgJz4nKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pLmRlZmF1bHQgPSByZW5kZXI7XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCB7RUxFTUVOVF9OT0RFLCBTVkdfTkFNRVNQQUNFfSA9IHJlcXVpcmUoJy4uL3NoYXJlZC9jb25zdGFudHMuanMnKTtcbmNvbnN0IHtXZWFrTWFwLCB0cmltfSA9IHJlcXVpcmUoJy4uL3NoYXJlZC9wb29ybHlmaWxscy5qcycpO1xuY29uc3Qge2ZyYWdtZW50fSA9IHJlcXVpcmUoJy4uL3NoYXJlZC9lYXN5LWRvbS5qcycpO1xuY29uc3Qge2FwcGVuZCwgc2xpY2UsIHVuaXF1ZX0gPSByZXF1aXJlKCcuLi9zaGFyZWQvdXRpbHMuanMnKTtcbmNvbnN0IFdpcmUgPSAobSA9PiBtLl9fZXNNb2R1bGUgPyBtLmRlZmF1bHQgOiBtKShyZXF1aXJlKCcuLi9jbGFzc2VzL1dpcmUuanMnKSk7XG5jb25zdCByZW5kZXIgPSAobSA9PiBtLl9fZXNNb2R1bGUgPyBtLmRlZmF1bHQgOiBtKShyZXF1aXJlKCcuL3JlbmRlci5qcycpKTtcblxuLy8gYWxsIHdpcmVzIHVzZWQgcGVyIGVhY2ggY29udGV4dFxuY29uc3Qgd2lyZXMgPSBuZXcgV2Vha01hcDtcblxuLy8gQSB3aXJlIGlzIGEgY2FsbGJhY2sgdXNlZCBhcyB0YWcgZnVuY3Rpb25cbi8vIHRvIGxhemlseSByZWxhdGUgYSBnZW5lcmljIG9iamVjdCB0byBhIHRlbXBsYXRlIGxpdGVyYWwuXG4vLyBoeXBlci53aXJlKHVzZXIpYDxkaXYgaWQ9dXNlcj4ke3VzZXIubmFtZX08L2Rpdj5gOyA9PiB0aGUgZGl2I3VzZXJcbi8vIFRoaXMgcHJvdmlkZXMgdGhlIGFiaWxpdHkgdG8gaGF2ZSBhIHVuaXF1ZSBET00gc3RydWN0dXJlXG4vLyByZWxhdGVkIHRvIGEgdW5pcXVlIEpTIG9iamVjdCB0aHJvdWdoIGEgcmV1c2FibGUgdGVtcGxhdGUgbGl0ZXJhbC5cbi8vIEEgd2lyZSBjYW4gc3BlY2lmeSBhIHR5cGUsIGFzIHN2ZyBvciBodG1sLCBhbmQgYWxzbyBhbiBpZFxuLy8gdmlhIGh0bWw6aWQgb3IgOmlkIGNvbnZlbnRpb24uIFN1Y2ggOmlkIGFsbG93cyBzYW1lIEpTIG9iamVjdHNcbi8vIHRvIGJlIGFzc29jaWF0ZWQgdG8gZGlmZmVyZW50IERPTSBzdHJ1Y3R1cmVzIGFjY29yZGluZ2x5IHdpdGhcbi8vIHRoZSB1c2VkIHRlbXBsYXRlIGxpdGVyYWwgd2l0aG91dCBsb3NpbmcgcHJldmlvdXNseSByZW5kZXJlZCBwYXJ0cy5cbmNvbnN0IHdpcmUgPSAob2JqLCB0eXBlKSA9PiBvYmogPT0gbnVsbCA/XG4gIGNvbnRlbnQodHlwZSB8fCAnaHRtbCcpIDpcbiAgd2Vha2x5KG9iaiwgdHlwZSB8fCAnaHRtbCcpO1xuXG4vLyBBIHdpcmUgY29udGVudCBpcyBhIHZpcnR1YWwgcmVmZXJlbmNlIHRvIG9uZSBvciBtb3JlIG5vZGVzLlxuLy8gSXQncyByZXByZXNlbnRlZCBieSBlaXRoZXIgYSBET00gbm9kZSwgb3IgYW4gQXJyYXkuXG4vLyBJbiBib3RoIGNhc2VzLCB0aGUgd2lyZSBjb250ZW50IHJvbGUgaXMgdG8gc2ltcGx5IHVwZGF0ZVxuLy8gYWxsIG5vZGVzIHRocm91Z2ggdGhlIGxpc3Qgb2YgcmVsYXRlZCBjYWxsYmFja3MuXG4vLyBJbiBmZXcgd29yZHMsIGEgd2lyZSBjb250ZW50IGlzIGxpa2UgYW4gaW52aXNpYmxlIHBhcmVudCBub2RlXG4vLyBpbiBjaGFyZ2Ugb2YgdXBkYXRpbmcgaXRzIGNvbnRlbnQgbGlrZSBhIGJvdW5kIGVsZW1lbnQgd291bGQgZG8uXG5jb25zdCBjb250ZW50ID0gdHlwZSA9PiB7XG4gIGxldCB3aXJlLCBjb250YWluZXIsIGNvbnRlbnQsIHRlbXBsYXRlLCB1cGRhdGVzO1xuICByZXR1cm4gZnVuY3Rpb24gKHN0YXRpY3MpIHtcbiAgICBzdGF0aWNzID0gdW5pcXVlKHN0YXRpY3MpO1xuICAgIGxldCBzZXR1cCA9IHRlbXBsYXRlICE9PSBzdGF0aWNzO1xuICAgIGlmIChzZXR1cCkge1xuICAgICAgdGVtcGxhdGUgPSBzdGF0aWNzO1xuICAgICAgY29udGVudCA9IGZyYWdtZW50KGRvY3VtZW50KTtcbiAgICAgIGNvbnRhaW5lciA9IHR5cGUgPT09ICdzdmcnID9cbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFNWR19OQU1FU1BBQ0UsICdzdmcnKSA6XG4gICAgICAgIGNvbnRlbnQ7XG4gICAgICB1cGRhdGVzID0gcmVuZGVyLmJpbmQoY29udGFpbmVyKTtcbiAgICB9XG4gICAgdXBkYXRlcy5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIGlmIChzZXR1cCkge1xuICAgICAgaWYgKHR5cGUgPT09ICdzdmcnKSB7XG4gICAgICAgIGFwcGVuZChjb250ZW50LCBzbGljZS5jYWxsKGNvbnRhaW5lci5jaGlsZE5vZGVzKSk7XG4gICAgICB9XG4gICAgICB3aXJlID0gd2lyZUNvbnRlbnQoY29udGVudCk7XG4gICAgfVxuICAgIHJldHVybiB3aXJlO1xuICB9O1xufTtcblxuLy8gd2lyZXMgYXJlIHdlYWtseSBjcmVhdGVkIHRocm91Z2ggb2JqZWN0cy5cbi8vIEVhY2ggb2JqZWN0IGNhbiBoYXZlIG11bHRpcGxlIHdpcmVzIGFzc29jaWF0ZWRcbi8vIGFuZCB0aGlzIGlzIHRoYW5rcyB0byB0aGUgdHlwZSArIDppZCBmZWF0dXJlLlxuY29uc3Qgd2Vha2x5ID0gKG9iaiwgdHlwZSkgPT4ge1xuICBjb25zdCBpID0gdHlwZS5pbmRleE9mKCc6Jyk7XG4gIGxldCB3aXJlID0gd2lyZXMuZ2V0KG9iaik7XG4gIGxldCBpZCA9IHR5cGU7XG4gIGlmICgtMSA8IGkpIHtcbiAgICBpZCA9IHR5cGUuc2xpY2UoaSArIDEpO1xuICAgIHR5cGUgPSB0eXBlLnNsaWNlKDAsIGkpIHx8ICdodG1sJztcbiAgfVxuICBpZiAoIXdpcmUpIHdpcmVzLnNldChvYmosIHdpcmUgPSB7fSk7XG4gIHJldHVybiB3aXJlW2lkXSB8fCAod2lyZVtpZF0gPSBjb250ZW50KHR5cGUpKTtcbn07XG5cbi8vIGEgZG9jdW1lbnQgZnJhZ21lbnQgbG9zZXMgaXRzIG5vZGVzIGFzIHNvb25cbi8vIGFzIGl0J3MgYXBwZW5kZWQgaW50byBhbm90aGVyIG5vZGUuXG4vLyBUaGlzIHdvdWxkIGVhc2lseSBsb3NlIHdpcmVkIGNvbnRlbnRcbi8vIHNvIHRoYXQgb24gYSBzZWNvbmQgcmVuZGVyIGNhbGwsIHRoZSBwYXJlbnRcbi8vIG5vZGUgd291bGRuJ3Qga25vdyB3aGljaCBub2RlIHdhcyB0aGVyZVxuLy8gYXNzb2NpYXRlZCB0byB0aGUgaW50ZXJwb2xhdGlvbi5cbi8vIFRvIHByZXZlbnQgaHlwZXJIVE1MIHRvIGZvcmdldCBhYm91dCB3aXJlZCBub2Rlcyxcbi8vIHRoZXNlIGFyZSBlaXRoZXIgcmV0dXJuZWQgYXMgQXJyYXkgb3IsIGlmIHRoZXJlJ3Mgb255IG9uZSBlbnRyeSxcbi8vIGFzIHNpbmdsZSByZWZlcmVuY2VkIG5vZGUgdGhhdCB3b24ndCBkaXNhcHBlYXIgZnJvbSB0aGUgZnJhZ21lbnQuXG4vLyBUaGUgaW5pdGlhbCBmcmFnbWVudCwgYXQgdGhpcyBwb2ludCwgd291bGQgYmUgdXNlZCBhcyB1bmlxdWUgcmVmZXJlbmNlLlxuY29uc3Qgd2lyZUNvbnRlbnQgPSBub2RlID0+IHtcbiAgY29uc3QgY2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2RlcztcbiAgY29uc3QgbGVuZ3RoID0gY2hpbGROb2Rlcy5sZW5ndGg7XG4gIGNvbnN0IHdpcmVOb2RlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNoaWxkID0gY2hpbGROb2Rlc1tpXTtcbiAgICBpZiAoXG4gICAgICBjaGlsZC5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFIHx8XG4gICAgICB0cmltLmNhbGwoY2hpbGQudGV4dENvbnRlbnQpLmxlbmd0aCAhPT0gMFxuICAgICkge1xuICAgICAgd2lyZU5vZGVzLnB1c2goY2hpbGQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gd2lyZU5vZGVzLmxlbmd0aCA9PT0gMSA/IHdpcmVOb2Rlc1swXSA6IG5ldyBXaXJlKHdpcmVOb2Rlcyk7XG59O1xuXG5leHBvcnRzLmNvbnRlbnQgPSBjb250ZW50O1xuZXhwb3J0cy53ZWFrbHkgPSB3ZWFrbHk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KS5kZWZhdWx0ID0gd2lyZTtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qISAoYykgQW5kcmVhIEdpYW1tYXJjaGkgKElTQykgKi9cblxuY29uc3QgQ29tcG9uZW50ID0gKG0gPT4gbS5fX2VzTW9kdWxlID8gbS5kZWZhdWx0IDogbSkocmVxdWlyZSgnLi9jbGFzc2VzL0NvbXBvbmVudC5qcycpKTtcbmNvbnN0IHtzZXR1cH0gPSByZXF1aXJlKCcuL2NsYXNzZXMvQ29tcG9uZW50LmpzJyk7XG5jb25zdCBJbnRlbnQgPSAobSA9PiBtLl9fZXNNb2R1bGUgPyBtLmRlZmF1bHQgOiBtKShyZXF1aXJlKCcuL29iamVjdHMvSW50ZW50LmpzJykpO1xuY29uc3Qgd2lyZSA9IChtID0+IG0uX19lc01vZHVsZSA/IG0uZGVmYXVsdCA6IG0pKHJlcXVpcmUoJy4vaHlwZXIvd2lyZS5qcycpKTtcbmNvbnN0IHtjb250ZW50LCB3ZWFrbHl9ID0gcmVxdWlyZSgnLi9oeXBlci93aXJlLmpzJyk7XG5jb25zdCByZW5kZXIgPSAobSA9PiBtLl9fZXNNb2R1bGUgPyBtLmRlZmF1bHQgOiBtKShyZXF1aXJlKCcuL2h5cGVyL3JlbmRlci5qcycpKTtcbmNvbnN0IGRpZmYgPSAobSA9PiBtLl9fZXNNb2R1bGUgPyBtLmRlZmF1bHQgOiBtKShyZXF1aXJlKCcuL3NoYXJlZC9kb21kaWZmLmpzJykpO1xuXG4vLyBhbGwgZnVuY3Rpb25zIGFyZSBzZWxmIGJvdW5kIHRvIHRoZSByaWdodCBjb250ZXh0XG4vLyB5b3UgY2FuIGRvIHRoZSBmb2xsb3dpbmdcbi8vIGNvbnN0IHtiaW5kLCB3aXJlfSA9IGh5cGVySFRNTDtcbi8vIGFuZCB1c2UgdGhlbSByaWdodCBhd2F5OiBiaW5kKG5vZGUpYGhlbGxvIWA7XG5jb25zdCBiaW5kID0gY29udGV4dCA9PiByZW5kZXIuYmluZChjb250ZXh0KTtcbmNvbnN0IGRlZmluZSA9IEludGVudC5kZWZpbmU7XG5cbmh5cGVyLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbmh5cGVyLmJpbmQgPSBiaW5kO1xuaHlwZXIuZGVmaW5lID0gZGVmaW5lO1xuaHlwZXIuZGlmZiA9IGRpZmY7XG5oeXBlci5oeXBlciA9IGh5cGVyO1xuaHlwZXIud2lyZSA9IHdpcmU7XG5cbi8vIHRoZSB3aXJlIGNvbnRlbnQgaXMgdGhlIGxhenkgZGVmaW5lZFxuLy8gaHRtbCBvciBzdmcgcHJvcGVydHkgb2YgZWFjaCBoeXBlci5Db21wb25lbnRcbnNldHVwKGNvbnRlbnQpO1xuXG4vLyBldmVyeXRoaW5nIGlzIGV4cG9ydGVkIGRpcmVjdGx5IG9yIHRocm91Z2ggdGhlXG4vLyBoeXBlckhUTUwgY2FsbGJhY2ssIHdoZW4gdXNlZCBhcyB0b3AgbGV2ZWwgc2NyaXB0XG5leHBvcnRzLkNvbXBvbmVudCA9IENvbXBvbmVudDtcbmV4cG9ydHMuYmluZCA9IGJpbmQ7XG5leHBvcnRzLmRlZmluZSA9IGRlZmluZTtcbmV4cG9ydHMuZGlmZiA9IGRpZmY7XG5leHBvcnRzLmh5cGVyID0gaHlwZXI7XG5leHBvcnRzLndpcmUgPSB3aXJlO1xuXG4vLyBieSBkZWZhdWx0LCBoeXBlckhUTUwgaXMgYSBzbWFydCBmdW5jdGlvblxuLy8gdGhhdCBcIm1hZ2ljYWxseVwiIHVuZGVyc3RhbmRzIHdoYXQncyB0aGUgYmVzdFxuLy8gdGhpbmcgdG8gZG8gd2l0aCBwYXNzZWQgYXJndW1lbnRzXG5mdW5jdGlvbiBoeXBlcihIVE1MKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/XG4gICAgKEhUTUwgPT0gbnVsbCA/XG4gICAgICBjb250ZW50KCdodG1sJykgOlxuICAgICAgKHR5cGVvZiBIVE1MID09PSAnc3RyaW5nJyA/XG4gICAgICAgIGh5cGVyLndpcmUobnVsbCwgSFRNTCkgOlxuICAgICAgICAoJ3JhdycgaW4gSFRNTCA/XG4gICAgICAgICAgY29udGVudCgnaHRtbCcpKEhUTUwpIDpcbiAgICAgICAgICAoJ25vZGVUeXBlJyBpbiBIVE1MID9cbiAgICAgICAgICAgIGh5cGVyLmJpbmQoSFRNTCkgOlxuICAgICAgICAgICAgd2Vha2x5KEhUTUwsICdodG1sJylcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICkpIDpcbiAgICAoJ3JhdycgaW4gSFRNTCA/XG4gICAgICBjb250ZW50KCdodG1sJykgOiBoeXBlci53aXJlXG4gICAgKS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xufVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSkuZGVmYXVsdCA9IGh5cGVyXG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBpbnRlbnRzID0ge307XG5jb25zdCBrZXlzID0gW107XG5jb25zdCBoYXNPd25Qcm9wZXJ0eSA9IGludGVudHMuaGFzT3duUHJvcGVydHk7XG5cbmxldCBsZW5ndGggPSAwO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KS5kZWZhdWx0ID0ge1xuXG4gIC8vIGh5cGVySFRNTC5kZWZpbmUoJ2ludGVudCcsIChvYmplY3QsIHVwZGF0ZSkgPT4gey4uLn0pXG4gIC8vIGNhbiBiZSB1c2VkIHRvIGRlZmluZSBhIHRoaXJkIHBhcnRzIHVwZGF0ZSBtZWNoYW5pc21cbiAgLy8gd2hlbiBldmVyeSBvdGhlciBrbm93biBtZWNoYW5pc20gZmFpbGVkLlxuICAvLyBoeXBlci5kZWZpbmUoJ3VzZXInLCBpbmZvID0+IGluZm8ubmFtZSk7XG4gIC8vIGh5cGVyKG5vZGUpYDxwPiR7e3VzZXJ9fTwvcD5gO1xuICBkZWZpbmU6IChpbnRlbnQsIGNhbGxiYWNrKSA9PiB7XG4gICAgaWYgKCEoaW50ZW50IGluIGludGVudHMpKSB7XG4gICAgICBsZW5ndGggPSBrZXlzLnB1c2goaW50ZW50KTtcbiAgICB9XG4gICAgaW50ZW50c1tpbnRlbnRdID0gY2FsbGJhY2s7XG4gIH0sXG5cbiAgLy8gdGhpcyBtZXRob2QgaXMgdXNlZCBpbnRlcm5hbGx5IGFzIGxhc3QgcmVzb3J0XG4gIC8vIHRvIHJldHJpZXZlIGEgdmFsdWUgb3V0IG9mIGFuIG9iamVjdFxuICBpbnZva2U6IChvYmplY3QsIGNhbGxiYWNrKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGtleSA9IGtleXNbaV07XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpIHtcbiAgICAgICAgcmV0dXJuIGludGVudHNba2V5XShvYmplY3Rba2V5XSwgY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHtcbiAgQ09NTUVOVF9OT0RFLFxuICBET0NVTUVOVF9GUkFHTUVOVF9OT0RFLFxuICBFTEVNRU5UX05PREVcbn0gPSByZXF1aXJlKCcuLi9zaGFyZWQvY29uc3RhbnRzLmpzJyk7XG5cbi8vIGV2ZXJ5IHRlbXBsYXRlIGxpdGVyYWwgaW50ZXJwb2xhdGlvbiBpbmRpY2F0ZXNcbi8vIGEgcHJlY2lzZSB0YXJnZXQgaW4gdGhlIERPTSB0aGUgdGVtcGxhdGUgaXMgcmVwcmVzZW50aW5nLlxuLy8gYDxwIGlkPSR7J2F0dHJpYnV0ZSd9PnNvbWUgJHsnY29udGVudCd9PC9wPmBcbi8vIGh5cGVySFRNTCBmaW5kcyBvbmx5IG9uY2UgcGVyIHRlbXBsYXRlIGxpdGVyYWwsXG4vLyBoZW5jZSBvbmNlIHBlciBlbnRpcmUgYXBwbGljYXRpb24gbGlmZS1jeWNsZSxcbi8vIGFsbCBub2RlcyB0aGF0IGFyZSByZWxhdGVkIHRvIGludGVycG9sYXRpb25zLlxuLy8gVGhlc2Ugbm9kZXMgYXJlIHN0b3JlZCBhcyBpbmRleGVzIHVzZWQgdG8gcmV0cmlldmUsXG4vLyBvbmNlIHBlciB1cGdyYWRlLCBub2RlcyB0aGF0IHdpbGwgY2hhbmdlIG9uIGVhY2ggZnV0dXJlIHVwZGF0ZS5cbi8vIEEgcGF0aCBleGFtcGxlIGlzIFsyLCAwLCAxXSByZXByZXNlbnRpbmcgdGhlIG9wZXJhdGlvbjpcbi8vIG5vZGUuY2hpbGROb2Rlc1syXS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMV1cbi8vIEF0dHJpYnV0ZXMgYXJlIGFkZHJlc3NlZCB2aWEgdGhlaXIgb3duZXIgbm9kZSBhbmQgdGhlaXIgbmFtZS5cbmNvbnN0IGNyZWF0ZVBhdGggPSBub2RlID0+IHtcbiAgY29uc3QgcGF0aCA9IFtdO1xuICBsZXQgcGFyZW50Tm9kZTtcbiAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XG4gICAgY2FzZSBFTEVNRU5UX05PREU6XG4gICAgY2FzZSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFOlxuICAgICAgcGFyZW50Tm9kZSA9IG5vZGU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIENPTU1FTlRfTk9ERTpcbiAgICAgIHBhcmVudE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICBwcmVwZW5kKHBhdGgsIHBhcmVudE5vZGUsIG5vZGUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHBhcmVudE5vZGUgPSBub2RlLm93bmVyRWxlbWVudDtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGZvciAoXG4gICAgbm9kZSA9IHBhcmVudE5vZGU7XG4gICAgKHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGUpO1xuICAgIG5vZGUgPSBwYXJlbnROb2RlXG4gICkge1xuICAgIHByZXBlbmQocGF0aCwgcGFyZW50Tm9kZSwgbm9kZSk7XG4gIH1cbiAgcmV0dXJuIHBhdGg7XG59O1xuXG5jb25zdCBwcmVwZW5kID0gKHBhdGgsIHBhcmVudCwgbm9kZSkgPT4ge1xuICBwYXRoLnVuc2hpZnQocGF0aC5pbmRleE9mLmNhbGwocGFyZW50LmNoaWxkTm9kZXMsIG5vZGUpKTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHt2YWx1ZTogdHJ1ZX0pLmRlZmF1bHQgPSB7XG4gIGNyZWF0ZTogKHR5cGUsIG5vZGUsIG5hbWUpID0+ICh7dHlwZSwgbmFtZSwgbm9kZSwgcGF0aDogY3JlYXRlUGF0aChub2RlKX0pLFxuICBmaW5kOiAobm9kZSwgcGF0aCkgPT4ge1xuICAgIGNvbnN0IGxlbmd0aCA9IHBhdGgubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIG5vZGUgPSBub2RlLmNoaWxkTm9kZXNbcGF0aFtpXV07XG4gICAgfVxuICAgIHJldHVybiBub2RlO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG4vLyBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9kZXZlbG9waXQvcHJlYWN0L2Jsb2IvMzNmYzY5N2FjMTE3NjJhMWNiNmU3MWU5ODQ3NjcwZDA0N2FmN2NlNS9zcmMvY29uc3RhbnRzLmpzXG5jb25zdCBJU19OT05fRElNRU5TSU9OQUwgPSAvYWNpdHxleCg/OnN8Z3xufHB8JCl8cnBofG93c3xtbmN8bnR3fGluZVtjaF18em9vfF5vcmQvaTtcblxuLy8gc3R5bGUgaXMgaGFuZGxlZCBhcyBib3RoIHN0cmluZyBhbmQgb2JqZWN0XG4vLyBldmVuIGlmIHRoZSB0YXJnZXQgaXMgYW4gU1ZHIGVsZW1lbnQgKGNvbnNpc3RlbmN5KVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSkuZGVmYXVsdCA9IChub2RlLCBvcmlnaW5hbCwgaXNTVkcpID0+IHtcbiAgaWYgKGlzU1ZHKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBvcmlnaW5hbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgc3R5bGUudmFsdWUgPSAnJztcbiAgICBub2RlLnNldEF0dHJpYnV0ZU5vZGUoc3R5bGUpO1xuICAgIHJldHVybiB1cGRhdGUoc3R5bGUsIGlzU1ZHKTtcbiAgfVxuICByZXR1cm4gdXBkYXRlKG5vZGUuc3R5bGUsIGlzU1ZHKTtcbn07XG5cbi8vIHRoZSB1cGRhdGUgdGFrZXMgY2FyZSBvciBjaGFuZ2luZy9yZXBsYWNpbmdcbi8vIG9ubHkgcHJvcGVydGllcyB0aGF0IGFyZSBkaWZmZXJlbnQgb3Jcbi8vIGluIGNhc2Ugb2Ygc3RyaW5nLCB0aGUgd2hvbGUgbm9kZVxuY29uc3QgdXBkYXRlID0gKHN0eWxlLCBpc1NWRykgPT4ge1xuICBsZXQgb2xkVHlwZSwgb2xkVmFsdWU7XG4gIHJldHVybiBuZXdWYWx1ZSA9PiB7XG4gICAgc3dpdGNoICh0eXBlb2YgbmV3VmFsdWUpIHtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xuICAgICAgICAgIGlmIChvbGRUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKCFpc1NWRykge1xuICAgICAgICAgICAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2xkVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiBuZXdWYWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVba2V5XSA9ICcnO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaXNTVkcpIHN0eWxlLnZhbHVlID0gJyc7XG4gICAgICAgICAgICBlbHNlIHN0eWxlLmNzc1RleHQgPSAnJztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaW5mbyA9IGlzU1ZHID8ge30gOiBzdHlsZTtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBuZXdWYWx1ZVtrZXldO1xuICAgICAgICAgICAgaW5mb1trZXldID0gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIUlTX05PTl9ESU1FTlNJT05BTC50ZXN0KGtleSkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgKyAncHgnKSA6IHZhbHVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvbGRUeXBlID0gJ29iamVjdCc7XG4gICAgICAgICAgaWYgKGlzU1ZHKSBzdHlsZS52YWx1ZSA9IHRvU3R5bGUoKG9sZFZhbHVlID0gaW5mbykpO1xuICAgICAgICAgIGVsc2Ugb2xkVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKG9sZFZhbHVlICE9IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgb2xkVHlwZSA9ICdzdHJpbmcnO1xuICAgICAgICAgIG9sZFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgICAgaWYgKGlzU1ZHKSBzdHlsZS52YWx1ZSA9IG5ld1ZhbHVlIHx8ICcnO1xuICAgICAgICAgIGVsc2Ugc3R5bGUuY3NzVGV4dCA9IG5ld1ZhbHVlIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcbn07XG5cbmNvbnN0IGh5cGhlbiA9IC8oW15BLVpdKShbQS1aXSspL2c7XG5jb25zdCBpemVkID0gKCQwLCAkMSwgJDIpID0+ICQxICsgJy0nICsgJDIudG9Mb3dlckNhc2UoKTtcbmNvbnN0IHRvU3R5bGUgPSBvYmplY3QgPT4ge1xuICBjb25zdCBjc3MgPSBbXTtcbiAgZm9yIChjb25zdCBrZXkgaW4gb2JqZWN0KSB7XG4gICAgY3NzLnB1c2goa2V5LnJlcGxhY2UoaHlwaGVuLCBpemVkKSwgJzonLCBvYmplY3Rba2V5XSwgJzsnKTtcbiAgfVxuICByZXR1cm4gY3NzLmpvaW4oJycpO1xufTsiLCIndXNlIHN0cmljdCc7XG5jb25zdCB7XG4gIENPTk5FQ1RFRCwgRElTQ09OTkVDVEVELCBDT01NRU5UX05PREUsIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUsIEVMRU1FTlRfTk9ERSwgVEVYVF9OT0RFLCBPV05FUl9TVkdfRUxFTUVOVCwgU0hPVUxEX1VTRV9URVhUX0NPTlRFTlQsIFVJRCwgVUlEQ1xufSA9IHJlcXVpcmUoJy4uL3NoYXJlZC9jb25zdGFudHMuanMnKTtcblxuY29uc3QgQ29tcG9uZW50ID0gKG0gPT4gbS5fX2VzTW9kdWxlID8gbS5kZWZhdWx0IDogbSkocmVxdWlyZSgnLi4vY2xhc3Nlcy9Db21wb25lbnQuanMnKSk7XG5jb25zdCBXaXJlID0gKG0gPT4gbS5fX2VzTW9kdWxlID8gbS5kZWZhdWx0IDogbSkocmVxdWlyZSgnLi4vY2xhc3Nlcy9XaXJlLmpzJykpO1xuY29uc3QgUGF0aCA9IChtID0+IG0uX19lc01vZHVsZSA/IG0uZGVmYXVsdCA6IG0pKHJlcXVpcmUoJy4vUGF0aC5qcycpKTtcbmNvbnN0IFN0eWxlID0gKG0gPT4gbS5fX2VzTW9kdWxlID8gbS5kZWZhdWx0IDogbSkocmVxdWlyZSgnLi9TdHlsZS5qcycpKTtcbmNvbnN0IEludGVudCA9IChtID0+IG0uX19lc01vZHVsZSA/IG0uZGVmYXVsdCA6IG0pKHJlcXVpcmUoJy4vSW50ZW50LmpzJykpO1xuY29uc3QgZG9tZGlmZiA9IChtID0+IG0uX19lc01vZHVsZSA/IG0uZGVmYXVsdCA6IG0pKHJlcXVpcmUoJy4uL3NoYXJlZC9kb21kaWZmLmpzJykpO1xuLy8gc2VlIC9ec2NyaXB0JC9pLnRlc3Qobm9kZU5hbWUpIGJpdCBkb3duIGhlcmVcbi8vIGltcG9ydCB7IGNyZWF0ZSBhcyBjcmVhdGVFbGVtZW50LCB0ZXh0IH0gZnJvbSAnLi4vc2hhcmVkL2Vhc3ktZG9tLmpzJztcbmNvbnN0IHsgdGV4dCB9ID0gcmVxdWlyZSgnLi4vc2hhcmVkL2Vhc3ktZG9tLmpzJyk7XG5jb25zdCB7IEV2ZW50LCBXZWFrU2V0LCBpc0FycmF5LCB0cmltIH0gPSByZXF1aXJlKCcuLi9zaGFyZWQvcG9vcmx5ZmlsbHMuanMnKTtcbmNvbnN0IHsgY3JlYXRlRnJhZ21lbnQsIHNsaWNlIH0gPSByZXF1aXJlKCcuLi9zaGFyZWQvdXRpbHMuanMnKTtcblxuLy8gaHlwZXIuQ29tcG9uZW50IGhhdmUgYSBjb25uZWN0ZWQvZGlzY29ubmVjdGVkXG4vLyBtZWNoYW5pc20gcHJvdmlkZWQgYnkgTXV0YXRpb25PYnNlcnZlclxuLy8gVGhpcyB3ZWFrIHNldCBpcyB1c2VkIHRvIHJlY29nbml6ZSBjb21wb25lbnRzXG4vLyBhcyBET00gbm9kZSB0aGF0IG5lZWRzIHRvIHRyaWdnZXIgY29ubmVjdGVkL2Rpc2Nvbm5lY3RlZCBldmVudHNcbmNvbnN0IGNvbXBvbmVudHMgPSBuZXcgV2Vha1NldDtcblxuLy8gYSBiYXNpYyBkaWN0aW9uYXJ5IHVzZWQgdG8gZmlsdGVyIGFscmVhZHkgY2FjaGVkIGF0dHJpYnV0ZXNcbi8vIHdoaWxlIGxvb2tpbmcgZm9yIHNwZWNpYWwgaHlwZXJIVE1MIHZhbHVlcy5cbmZ1bmN0aW9uIENhY2hlKCkge31cbkNhY2hlLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbi8vIHJldHVybnMgYW4gaW50ZW50IHRvIGV4cGxpY2l0bHkgaW5qZWN0IGNvbnRlbnQgYXMgaHRtbFxuY29uc3QgYXNIVE1MID0gaHRtbCA9PiAoe2h0bWx9KTtcblxuLy8gcmV0dXJucyBub2RlcyBmcm9tIHdpcmVzIGFuZCBjb21wb25lbnRzXG5jb25zdCBhc05vZGUgPSAoaXRlbSwgaSkgPT4ge1xuICByZXR1cm4gJ0VMRU1FTlRfTk9ERScgaW4gaXRlbSA/XG4gICAgaXRlbSA6XG4gICAgKGl0ZW0uY29uc3RydWN0b3IgPT09IFdpcmUgP1xuICAgICAgLy8gaW4gdGhlIFdpcmUgY2FzZSwgdGhlIGNvbnRlbnQgY2FuIGJlXG4gICAgICAvLyByZW1vdmVkLCBwb3N0LXBlbmRlZCwgaW5zZXJ0ZWQsIG9yIHByZS1wZW5kZWQgYW5kXG4gICAgICAvLyBhbGwgdGhlc2UgY2FzZXMgYXJlIGhhbmRsZWQgYnkgZG9tZGlmZiBhbHJlYWR5XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgKCgxIC8gaSkgPCAwID9cbiAgICAgICAgKGkgPyBpdGVtLnJlbW92ZSgpIDogaXRlbS5sYXN0KSA6XG4gICAgICAgIChpID8gaXRlbS5pbnNlcnQoKSA6IGl0ZW0uZmlyc3QpKSA6XG4gICAgICBhc05vZGUoaXRlbS5yZW5kZXIoKSwgaSkpO1xufVxuXG4vLyByZXR1cm5zIHRydWUgaWYgZG9tZGlmZiBjYW4gaGFuZGxlIHRoZSB2YWx1ZVxuY29uc3QgY2FuRGlmZiA9IHZhbHVlID0+ICAnRUxFTUVOVF9OT0RFJyBpbiB2YWx1ZSB8fFxudmFsdWUgaW5zdGFuY2VvZiBXaXJlIHx8XG52YWx1ZSBpbnN0YW5jZW9mIENvbXBvbmVudDtcblxuLy8gdXBkYXRlcyBhcmUgY3JlYXRlZCBvbmNlIHBlciBjb250ZXh0IHVwZ3JhZGVcbi8vIHdpdGhpbiB0aGUgbWFpbiByZW5kZXIgZnVuY3Rpb24gKC4uL2h5cGVyL3JlbmRlci5qcylcbi8vIFRoZXNlIGFyZSBhbiBBcnJheSBvZiBjYWxsYmFja3MgdG8gaW52b2tlIHBhc3Npbmdcbi8vIGVhY2ggaW50ZXJwb2xhdGlvbiB2YWx1ZS5cbi8vIFVwZGF0ZXMgY2FuIGJlIHJlbGF0ZWQgdG8gYW55IGtpbmQgb2YgY29udGVudCxcbi8vIGF0dHJpYnV0ZXMsIG9yIHNwZWNpYWwgdGV4dC1vbmx5IGNhc2VzIHN1Y2ggPHN0eWxlPlxuLy8gZWxlbWVudHMgb3IgPHRleHRhcmVhPlxuY29uc3QgY3JlYXRlID0gKHJvb3QsIHBhdGhzKSA9PiB7XG4gIGNvbnN0IHVwZGF0ZXMgPSBbXTtcbiAgY29uc3QgbGVuZ3RoID0gcGF0aHMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgaW5mbyA9IHBhdGhzW2ldO1xuICAgIGNvbnN0IG5vZGUgPSBQYXRoLmZpbmQocm9vdCwgaW5mby5wYXRoKTtcbiAgICBzd2l0Y2ggKGluZm8udHlwZSkge1xuICAgICAgY2FzZSAnYW55JzpcbiAgICAgICAgdXBkYXRlcy5wdXNoKHNldEFueUNvbnRlbnQobm9kZSwgW10pKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhdHRyJzpcbiAgICAgICAgdXBkYXRlcy5wdXNoKHNldEF0dHJpYnV0ZShub2RlLCBpbmZvLm5hbWUsIGluZm8ubm9kZSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICB1cGRhdGVzLnB1c2goc2V0VGV4dENvbnRlbnQobm9kZSkpO1xuICAgICAgICBub2RlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdXBkYXRlcztcbn07XG5cbi8vIGZpbmRpbmcgYWxsIHBhdGhzIGlzIGEgb25lLW9mZiBvcGVyYXRpb24gcGVyZm9ybWVkXG4vLyB3aGVuIGEgbmV3IHRlbXBsYXRlIGxpdGVyYWwgaXMgdXNlZC5cbi8vIFRoZSBnb2FsIGlzIHRvIG1hcCBhbGwgdGFyZ2V0IG5vZGVzIHRoYXQgd2lsbCBiZVxuLy8gdXNlZCB0byB1cGRhdGUgY29udGVudC9hdHRyaWJ1dGVzIGV2ZXJ5IHRpbWVcbi8vIHRoZSBzYW1lIHRlbXBsYXRlIGxpdGVyYWwgaXMgdXNlZCB0byBjcmVhdGUgY29udGVudC5cbi8vIFRoZSByZXN1bHQgaXMgYSBsaXN0IG9mIHBhdGhzIHJlbGF0ZWQgdG8gdGhlIHRlbXBsYXRlXG4vLyB3aXRoIGFsbCB0aGUgbmVjZXNzYXJ5IGluZm8gdG8gY3JlYXRlIHVwZGF0ZXMgYXNcbi8vIGxpc3Qgb2YgY2FsbGJhY2tzIHRoYXQgdGFyZ2V0IGRpcmVjdGx5IGFmZmVjdGVkIG5vZGVzLlxuY29uc3QgZmluZCA9IChub2RlLCBwYXRocywgcGFydHMpID0+IHtcbiAgY29uc3QgY2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2RlcztcbiAgY29uc3QgbGVuZ3RoID0gY2hpbGROb2Rlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgY2hpbGQgPSBjaGlsZE5vZGVzW2ldO1xuICAgIHN3aXRjaCAoY2hpbGQubm9kZVR5cGUpIHtcbiAgICAgIGNhc2UgRUxFTUVOVF9OT0RFOlxuICAgICAgICBmaW5kQXR0cmlidXRlcyhjaGlsZCwgcGF0aHMsIHBhcnRzKTtcbiAgICAgICAgZmluZChjaGlsZCwgcGF0aHMsIHBhcnRzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENPTU1FTlRfTk9ERTpcbiAgICAgICAgaWYgKGNoaWxkLnRleHRDb250ZW50ID09PSBVSUQpIHtcbiAgICAgICAgICBwYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgIHBhdGhzLnB1c2goXG4gICAgICAgICAgICAvLyBiYXNpY0hUTUwgb3Igb3RoZXIgbm9uIHN0YW5kYXJkIGVuZ2luZXNcbiAgICAgICAgICAgIC8vIG1pZ2h0IGVuZCB1cCBoYXZpbmcgY29tbWVudHMgaW4gbm9kZXNcbiAgICAgICAgICAgIC8vIHdoZXJlIHRoZXkgc2hvdWxkbid0LCBoZW5jZSB0aGlzIGNoZWNrLlxuICAgICAgICAgICAgU0hPVUxEX1VTRV9URVhUX0NPTlRFTlQudGVzdChub2RlLm5vZGVOYW1lKSA/XG4gICAgICAgICAgICAgIFBhdGguY3JlYXRlKCd0ZXh0Jywgbm9kZSkgOlxuICAgICAgICAgICAgICBQYXRoLmNyZWF0ZSgnYW55JywgY2hpbGQpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgVEVYVF9OT0RFOlxuICAgICAgICAvLyB0aGUgZm9sbG93aW5nIGlnbm9yZSBpcyBhY3R1YWxseSBjb3ZlcmVkIGJ5IGJyb3dzZXJzXG4gICAgICAgIC8vIG9ubHkgYmFzaWNIVE1MIGVuZHMgdXAgb24gcHJldmlvdXMgQ09NTUVOVF9OT0RFIGNhc2VcbiAgICAgICAgLy8gaW5zdGVhZCBvZiBURVhUX05PREUgYmVjYXVzZSBpdCBrbm93cyBub3RoaW5nIGFib3V0XG4gICAgICAgIC8vIHNwZWNpYWwgc3R5bGUgb3IgdGV4dGFyZWEgYmVoYXZpb3JcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gICAgICAgIGlmIChcbiAgICAgICAgICBTSE9VTERfVVNFX1RFWFRfQ09OVEVOVC50ZXN0KG5vZGUubm9kZU5hbWUpICYmXG4gICAgICAgICAgdHJpbS5jYWxsKGNoaWxkLnRleHRDb250ZW50KSA9PT0gVUlEQ1xuICAgICAgICApIHtcbiAgICAgICAgICBwYXJ0cy5zaGlmdCgpO1xuICAgICAgICAgIHBhdGhzLnB1c2goUGF0aC5jcmVhdGUoJ3RleHQnLCBub2RlKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59O1xuXG4vLyBhdHRyaWJ1dGVzIGFyZSBzZWFyY2hlZCB2aWEgdW5pcXVlIGh5cGVySFRNTCBpZCB2YWx1ZS5cbi8vIERlc3BpdGUgSFRNTCBiZWluZyBjYXNlIGluc2Vuc2l0aXZlLCBoeXBlckhUTUwgaXMgYWJsZVxuLy8gdG8gcmVjb2duaXplIGF0dHJpYnV0ZXMgYnkgbmFtZSBpbiBhIGNhc2VTZW5zaXRpdmUgd2F5LlxuLy8gVGhpcyBwbGF5cyB3ZWxsIHdpdGggQ3VzdG9tIEVsZW1lbnRzIGRlZmluaXRpb25zXG4vLyBhbmQgYWxzbyB3aXRoIFhNTC1saWtlIGVudmlyb25tZW50cywgd2l0aG91dCB0cnVzdGluZ1xuLy8gdGhlIHJlc3VsdGluZyBET00gYnV0IHRoZSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIHRoZSBzb3VyY2Ugb2YgdHJ1dGguXG4vLyBJRS9FZGdlIGhhcyBhIGZ1bm55IGJ1ZyB3aXRoIGF0dHJpYnV0ZXMgYW5kIHRoZXNlIG1pZ2h0IGJlIGR1cGxpY2F0ZWQuXG4vLyBUaGlzIGlzIHdoeSB0aGVyZSBpcyBhIGNhY2hlIGluIGNoYXJnZSBvZiBiZWluZyBzdXJlIG5vIGR1cGxpY2F0ZWRcbi8vIGF0dHJpYnV0ZXMgYXJlIGV2ZXIgY29uc2lkZXJlZCBpbiBmdXR1cmUgdXBkYXRlcy5cbmNvbnN0IGZpbmRBdHRyaWJ1dGVzID0gKG5vZGUsIHBhdGhzLCBwYXJ0cykgPT4ge1xuICBjb25zdCBjYWNoZSA9IG5ldyBDYWNoZTtcbiAgY29uc3QgYXR0cmlidXRlcyA9IG5vZGUuYXR0cmlidXRlcztcbiAgY29uc3QgYXJyYXkgPSBzbGljZS5jYWxsKGF0dHJpYnV0ZXMpO1xuICBjb25zdCByZW1vdmUgPSBbXTtcbiAgY29uc3QgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYXR0cmlidXRlID0gYXJyYXlbaV07XG4gICAgaWYgKGF0dHJpYnV0ZS52YWx1ZSA9PT0gVUlEKSB7XG4gICAgICBjb25zdCBuYW1lID0gYXR0cmlidXRlLm5hbWU7XG4gICAgICAvLyB0aGUgZm9sbG93aW5nIGlnbm9yZSBpcyBjb3ZlcmVkIGJ5IElFXG4gICAgICAvLyBhbmQgdGhlIElFOSBkb3VibGUgdmlld0JveCB0ZXN0XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAqL1xuICAgICAgaWYgKCEobmFtZSBpbiBjYWNoZSkpIHtcbiAgICAgICAgY29uc3QgcmVhbE5hbWUgPSBwYXJ0cy5zaGlmdCgpLnJlcGxhY2UoL14oPzp8W1xcU1xcc10qP1xccykoXFxTKz8pPVsnXCJdPyQvLCAnJDEnKTtcbiAgICAgICAgY2FjaGVbbmFtZV0gPSBhdHRyaWJ1dGVzW3JlYWxOYW1lXSB8fFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgaWdub3JlIGlzIGNvdmVyZWQgYnkgYnJvd3NlcnNcbiAgICAgICAgICAgICAgICAgICAgICAvLyB3aGlsZSBiYXNpY0hUTUwgaXMgYWxyZWFkeSBjYXNlLXNlbnNpdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgICAgYXR0cmlidXRlc1tyZWFsTmFtZS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgcGF0aHMucHVzaChQYXRoLmNyZWF0ZSgnYXR0cicsIGNhY2hlW25hbWVdLCByZWFsTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmVtb3ZlLnB1c2goYXR0cmlidXRlKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgbGVuID0gcmVtb3ZlLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIC8vIEVkZ2UgSFRNTCBidWcgIzE2ODc4NzI2XG4gICAgY29uc3QgYXR0cmlidXRlID0gcmVtb3ZlW2ldO1xuICAgIGlmICgvXmlkJC9pLnRlc3QoYXR0cmlidXRlLm5hbWUpKVxuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlLm5hbWUpO1xuICAgIC8vIHN0YW5kYXJkIGJyb3dzZXJzIHdvdWxkIHdvcmsganVzdCBmaW5lIGhlcmVcbiAgICBlbHNlXG4gICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZU5vZGUocmVtb3ZlW2ldKTtcbiAgfVxuXG4gIC8vIFRoaXMgaXMgYSB2ZXJ5IHNwZWNpZmljIEZpcmVmb3gvU2FmYXJpIGlzc3VlXG4gIC8vIGJ1dCBzaW5jZSBpdCBzaG91bGQgYmUgYSBub3Qgc28gY29tbW9uIHBhdHRlcm4sXG4gIC8vIGl0J3MgcHJvYmFibHkgd29ydGggcGF0Y2hpbmcgcmVnYXJkbGVzcy5cbiAgLy8gQmFzaWNhbGx5LCBzY3JpcHRzIGNyZWF0ZWQgdGhyb3VnaCBzdHJpbmdzIGFyZSBkZWF0aC5cbiAgLy8gWW91IG5lZWQgdG8gY3JlYXRlIGZyZXNoIG5ldyBzY3JpcHRzIGluc3RlYWQuXG4gIC8vIFRPRE86IGlzIHRoZXJlIGFueSBvdGhlciBub2RlIHRoYXQgbmVlZHMgc3VjaCBub25zZW5zZT9cbiAgY29uc3Qgbm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lO1xuICBpZiAoL15zY3JpcHQkL2kudGVzdChub2RlTmFtZSkpIHtcbiAgICAvLyB0aGlzIHVzZWQgdG8gYmUgbGlrZSB0aGF0XG4gICAgLy8gY29uc3Qgc2NyaXB0ID0gY3JlYXRlRWxlbWVudChub2RlLCBub2RlTmFtZSk7XG4gICAgLy8gdGhlbiBFZGdlIGFycml2ZWQgYW5kIGRlY2lkZWQgdGhhdCBzY3JpcHRzIGNyZWF0ZWRcbiAgICAvLyB0aHJvdWdoIHRlbXBsYXRlIGRvY3VtZW50cyBhcmVuJ3Qgd29ydGggZXhlY3V0aW5nXG4gICAgLy8gc28gaXQgYmVjYW1lIHRoaXMgLi4uIGhvcGVmdWxseSBpdCB3b24ndCBodXJ0IGluIHRoZSB3aWxkXG4gICAgY29uc3Qgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChub2RlTmFtZSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBzY3JpcHQuc2V0QXR0cmlidXRlTm9kZShhdHRyaWJ1dGVzW2ldLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgfVxuICAgIHNjcmlwdC50ZXh0Q29udGVudCA9IG5vZGUudGV4dENvbnRlbnQ7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChzY3JpcHQsIG5vZGUpO1xuICB9XG59O1xuXG4vLyB3aGVuIGEgUHJvbWlzZSBpcyB1c2VkIGFzIGludGVycG9sYXRpb24gdmFsdWVcbi8vIGl0cyByZXN1bHQgbXVzdCBiZSBwYXJzZWQgb25jZSByZXNvbHZlZC5cbi8vIFRoaXMgY2FsbGJhY2sgaXMgaW4gY2hhcmdlIG9mIHVuZGVyc3RhbmRpbmcgd2hhdCB0byBkb1xuLy8gd2l0aCBhIHJldHVybmVkIHZhbHVlIG9uY2UgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQuXG5jb25zdCBpbnZva2VBdERpc3RhbmNlID0gKHZhbHVlLCBjYWxsYmFjaykgPT4ge1xuICBjYWxsYmFjayh2YWx1ZS5wbGFjZWhvbGRlcik7XG4gIGlmICgndGV4dCcgaW4gdmFsdWUpIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUudGV4dCkudGhlbihTdHJpbmcpLnRoZW4oY2FsbGJhY2spO1xuICB9IGVsc2UgaWYgKCdhbnknIGluIHZhbHVlKSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlLmFueSkudGhlbihjYWxsYmFjayk7XG4gIH0gZWxzZSBpZiAoJ2h0bWwnIGluIHZhbHVlKSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlLmh0bWwpLnRoZW4oYXNIVE1MKS50aGVuKGNhbGxiYWNrKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUoSW50ZW50Lmludm9rZSh2YWx1ZSwgY2FsbGJhY2spKS50aGVuKGNhbGxiYWNrKTtcbiAgfVxufTtcblxuLy8gcXVpY2sgYW5kIGRpcnR5IHdheSB0byBjaGVjayBmb3IgUHJvbWlzZS9pc2ggdmFsdWVzXG5jb25zdCBpc1Byb21pc2VfaXNoID0gdmFsdWUgPT4gdmFsdWUgIT0gbnVsbCAmJiAndGhlbicgaW4gdmFsdWU7XG5cbi8vIGluIGEgaHlwZXIobm9kZSlgPGRpdj4ke2NvbnRlbnR9PC9kaXY+YCBjYXNlXG4vLyBldmVyeXRoaW5nIGNvdWxkIGhhcHBlbjpcbi8vICAqIGl0J3MgYSBKUyBwcmltaXRpdmUsIHN0b3JlZCBhcyB0ZXh0XG4vLyAgKiBpdCdzIG51bGwgb3IgdW5kZWZpbmVkLCB0aGUgbm9kZSBzaG91bGQgYmUgY2xlYW5lZFxuLy8gICogaXQncyBhIGNvbXBvbmVudCwgdXBkYXRlIHRoZSBjb250ZW50IGJ5IHJlbmRlcmluZyBpdFxuLy8gICogaXQncyBhIHByb21pc2UsIHVwZGF0ZSB0aGUgY29udGVudCBvbmNlIHJlc29sdmVkXG4vLyAgKiBpdCdzIGFuIGV4cGxpY2l0IGludGVudCwgcGVyZm9ybSB0aGUgZGVzaXJlZCBvcGVyYXRpb25cbi8vICAqIGl0J3MgYW4gQXJyYXksIHJlc29sdmUgYWxsIHZhbHVlcyBpZiBQcm9taXNlcyBhbmQvb3Jcbi8vICAgIHVwZGF0ZSB0aGUgbm9kZSB3aXRoIHRoZSByZXN1bHRpbmcgbGlzdCBvZiBjb250ZW50XG5jb25zdCBzZXRBbnlDb250ZW50ID0gKG5vZGUsIGNoaWxkTm9kZXMpID0+IHtcbiAgbGV0IGZhc3RQYXRoID0gZmFsc2U7XG4gIGxldCBvbGRWYWx1ZTtcbiAgY29uc3QgYW55Q29udGVudCA9IHZhbHVlID0+IHtcbiAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgaWYgKGZhc3RQYXRoKSB7XG4gICAgICAgICAgaWYgKG9sZFZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgICAgICAgb2xkVmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGNoaWxkTm9kZXNbMF0udGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFzdFBhdGggPSB0cnVlO1xuICAgICAgICAgIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgY2hpbGROb2RlcyA9IGRvbWRpZmYoXG4gICAgICAgICAgICBub2RlLnBhcmVudE5vZGUsXG4gICAgICAgICAgICBjaGlsZE5vZGVzLFxuICAgICAgICAgICAgW3RleHQobm9kZSwgdmFsdWUpXSxcbiAgICAgICAgICAgIGFzTm9kZSxcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgZmFzdFBhdGggPSBmYWxzZTtcbiAgICAgICAgICBjaGlsZE5vZGVzID0gZG9tZGlmZihcbiAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZSxcbiAgICAgICAgICAgIGNoaWxkTm9kZXMsXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIGFzTm9kZSxcbiAgICAgICAgICAgIG5vZGVcbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBmYXN0UGF0aCA9IGZhbHNlO1xuICAgICAgICBvbGRWYWx1ZSA9IHZhbHVlO1xuICAgICAgICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2hpbGROb2RlcyA9IGRvbWRpZmYoXG4gICAgICAgICAgICAgICAgbm9kZS5wYXJlbnROb2RlLFxuICAgICAgICAgICAgICAgIGNoaWxkTm9kZXMsXG4gICAgICAgICAgICAgICAgW10sXG4gICAgICAgICAgICAgICAgYXNOb2RlLFxuICAgICAgICAgICAgICAgIG5vZGVcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWVbMF0pIHtcbiAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICAgICAgICAgICAgYW55Q29udGVudCh7aHRtbDogdmFsdWV9KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheSh2YWx1ZVswXSkpIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuY29uY2F0LmFwcGx5KFtdLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc1Byb21pc2VfaXNoKHZhbHVlWzBdKSkge1xuICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwodmFsdWUpLnRoZW4oYW55Q29udGVudCk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgY2hpbGROb2RlcyA9IGRvbWRpZmYoXG4gICAgICAgICAgICAgICAgICBub2RlLnBhcmVudE5vZGUsXG4gICAgICAgICAgICAgICAgICBjaGlsZE5vZGVzLFxuICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICBhc05vZGUsXG4gICAgICAgICAgICAgICAgICBub2RlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2FuRGlmZih2YWx1ZSkpIHtcbiAgICAgICAgICBjaGlsZE5vZGVzID0gZG9tZGlmZihcbiAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZSxcbiAgICAgICAgICAgIGNoaWxkTm9kZXMsXG4gICAgICAgICAgICB2YWx1ZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA/XG4gICAgICAgICAgICAgIHNsaWNlLmNhbGwodmFsdWUuY2hpbGROb2RlcykgOlxuICAgICAgICAgICAgICBbdmFsdWVdLFxuICAgICAgICAgICAgYXNOb2RlLFxuICAgICAgICAgICAgbm9kZVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQcm9taXNlX2lzaCh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZS50aGVuKGFueUNvbnRlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKCdwbGFjZWhvbGRlcicgaW4gdmFsdWUpIHtcbiAgICAgICAgICBpbnZva2VBdERpc3RhbmNlKHZhbHVlLCBhbnlDb250ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmICgndGV4dCcgaW4gdmFsdWUpIHtcbiAgICAgICAgICBhbnlDb250ZW50KFN0cmluZyh2YWx1ZS50ZXh0KSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2FueScgaW4gdmFsdWUpIHtcbiAgICAgICAgICBhbnlDb250ZW50KHZhbHVlLmFueSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2h0bWwnIGluIHZhbHVlKSB7XG4gICAgICAgICAgY2hpbGROb2RlcyA9IGRvbWRpZmYoXG4gICAgICAgICAgICBub2RlLnBhcmVudE5vZGUsXG4gICAgICAgICAgICBjaGlsZE5vZGVzLFxuICAgICAgICAgICAgc2xpY2UuY2FsbChcbiAgICAgICAgICAgICAgY3JlYXRlRnJhZ21lbnQoXG4gICAgICAgICAgICAgICAgbm9kZSxcbiAgICAgICAgICAgICAgICBbXS5jb25jYXQodmFsdWUuaHRtbCkuam9pbignJylcbiAgICAgICAgICAgICAgKS5jaGlsZE5vZGVzXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgYXNOb2RlLFxuICAgICAgICAgICAgbm9kZVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2xlbmd0aCcgaW4gdmFsdWUpIHtcbiAgICAgICAgICBhbnlDb250ZW50KHNsaWNlLmNhbGwodmFsdWUpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbnlDb250ZW50KEludGVudC5pbnZva2UodmFsdWUsIGFueUNvbnRlbnQpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG4gIHJldHVybiBhbnlDb250ZW50O1xufTtcblxuLy8gdGhlcmUgYXJlIGZvdXIga2luZCBvZiBhdHRyaWJ1dGVzLCBhbmQgcmVsYXRlZCBiZWhhdmlvcjpcbi8vICAqIGV2ZW50cywgd2l0aCBhIG5hbWUgc3RhcnRpbmcgd2l0aCBgb25gLCB0byBhZGQvcmVtb3ZlIGV2ZW50IGxpc3RlbmVyc1xuLy8gICogc3BlY2lhbCwgd2l0aCBhIG5hbWUgcHJlc2VudCBpbiB0aGVpciBpbmhlcml0ZWQgcHJvdG90eXBlLCBhY2Nlc3NlZCBkaXJlY3RseVxuLy8gICogcmVndWxhciwgYWNjZXNzZWQgdGhyb3VnaCBnZXQvc2V0QXR0cmlidXRlIHN0YW5kYXJkIERPTSBtZXRob2RzXG4vLyAgKiBzdHlsZSwgdGhlIG9ubHkgcmVndWxhciBhdHRyaWJ1dGUgdGhhdCBhbHNvIGFjY2VwdHMgYW4gb2JqZWN0IGFzIHZhbHVlXG4vLyAgICBzbyB0aGF0IHlvdSBjYW4gc3R5bGU9JHt7d2lkdGg6IDEyMH19LiBJbiB0aGlzIGNhc2UsIHRoZSBiZWhhdmlvciBoYXMgYmVlblxuLy8gICAgZnVsbHkgaW5zcGlyZWQgYnkgUHJlYWN0IGxpYnJhcnkgYW5kIGl0cyBzaW1wbGljaXR5LlxuY29uc3Qgc2V0QXR0cmlidXRlID0gKG5vZGUsIG5hbWUsIG9yaWdpbmFsKSA9PiB7XG4gIGNvbnN0IGlzU1ZHID0gT1dORVJfU1ZHX0VMRU1FTlQgaW4gbm9kZTtcbiAgbGV0IG9sZFZhbHVlO1xuICAvLyBpZiB0aGUgYXR0cmlidXRlIGlzIHRoZSBzdHlsZSBvbmVcbiAgLy8gaGFuZGxlIGl0IGRpZmZlcmVudGx5IGZyb20gb3RoZXJzXG4gIGlmIChuYW1lID09PSAnc3R5bGUnKSB7XG4gICAgcmV0dXJuIFN0eWxlKG5vZGUsIG9yaWdpbmFsLCBpc1NWRyk7XG4gIH1cbiAgLy8gdGhlIG5hbWUgaXMgYW4gZXZlbnQgb25lLFxuICAvLyBhZGQvcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBhY2NvcmRpbmdseVxuICBlbHNlIGlmICgvXm9uLy50ZXN0KG5hbWUpKSB7XG4gICAgbGV0IHR5cGUgPSBuYW1lLnNsaWNlKDIpO1xuICAgIGlmICh0eXBlID09PSBDT05ORUNURUQgfHwgdHlwZSA9PT0gRElTQ09OTkVDVEVEKSB7XG4gICAgICBpZiAobm90T2JzZXJ2aW5nKSB7XG4gICAgICAgIG5vdE9ic2VydmluZyA9IGZhbHNlO1xuICAgICAgICBvYnNlcnZlKCk7XG4gICAgICB9XG4gICAgICBjb21wb25lbnRzLmFkZChub2RlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAobmFtZS50b0xvd2VyQ2FzZSgpIGluIG5vZGUpIHtcbiAgICAgIHR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuICAgIHJldHVybiBuZXdWYWx1ZSA9PiB7XG4gICAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSkgbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIG9sZFZhbHVlLCBmYWxzZSk7XG4gICAgICAgIG9sZFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIGlmIChuZXdWYWx1ZSkgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIG5ld1ZhbHVlLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuICAvLyB0aGUgYXR0cmlidXRlIGlzIHNwZWNpYWwgKCd2YWx1ZScgaW4gaW5wdXQpXG4gIC8vIGFuZCBpdCdzIG5vdCBTVkcgKm9yKiB0aGUgbmFtZSBpcyBleGFjdGx5IGRhdGEsXG4gIC8vIGluIHRoaXMgY2FzZSBhc3NpZ24gdGhlIHZhbHVlIGRpcmVjdGx5XG4gIGVsc2UgaWYgKG5hbWUgPT09ICdkYXRhJyB8fCAoIWlzU1ZHICYmIG5hbWUgaW4gbm9kZSkpIHtcbiAgICByZXR1cm4gbmV3VmFsdWUgPT4ge1xuICAgICAgaWYgKG9sZFZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICBvbGRWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICBpZiAobm9kZVtuYW1lXSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICBub2RlW25hbWVdID0gbmV3VmFsdWU7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgLy8gaW4gZXZlcnkgb3RoZXIgY2FzZSwgdXNlIHRoZSBhdHRyaWJ1dGUgbm9kZSBhcyBpdCBpc1xuICAvLyB1cGRhdGUgb25seSB0aGUgdmFsdWUsIHNldCBpdCBhcyBub2RlIG9ubHkgd2hlbi9pZiBuZWVkZWRcbiAgZWxzZSB7XG4gICAgbGV0IG93bmVyID0gZmFsc2U7XG4gICAgY29uc3QgYXR0cmlidXRlID0gb3JpZ2luYWwuY2xvbmVOb2RlKHRydWUpO1xuICAgIHJldHVybiBuZXdWYWx1ZSA9PiB7XG4gICAgICBpZiAob2xkVmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgIG9sZFZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIGlmIChhdHRyaWJ1dGUudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgaWYgKG5ld1ZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChvd25lcikge1xuICAgICAgICAgICAgICBvd25lciA9IGZhbHNlO1xuICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZU5vZGUoYXR0cmlidXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF0dHJpYnV0ZS52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGUudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgIGlmICghb3duZXIpIHtcbiAgICAgICAgICAgICAgb3duZXIgPSB0cnVlO1xuICAgICAgICAgICAgICBub2RlLnNldEF0dHJpYnV0ZU5vZGUoYXR0cmlidXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG4vLyBzdHlsZSBvciB0ZXh0YXJlYXMgZG9uJ3QgYWNjZXB0IEhUTUwgYXMgY29udGVudFxuLy8gaXQncyBwb2ludGxlc3MgdG8gdHJhbnNmb3JtIG9yIGFuYWx5emUgYW55dGhpbmdcbi8vIGRpZmZlcmVudCBmcm9tIHRleHQgdGhlcmUgYnV0IGl0J3Mgd29ydGggY2hlY2tpbmdcbi8vIGZvciBwb3NzaWJsZSBkZWZpbmVkIGludGVudHMuXG5jb25zdCBzZXRUZXh0Q29udGVudCA9IG5vZGUgPT4ge1xuICBsZXQgb2xkVmFsdWU7XG4gIGNvbnN0IHRleHRDb250ZW50ID0gdmFsdWUgPT4ge1xuICAgIGlmIChvbGRWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIG9sZFZhbHVlID0gdmFsdWU7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSkge1xuICAgICAgICBpZiAoaXNQcm9taXNlX2lzaCh2YWx1ZSkpIHtcbiAgICAgICAgICB2YWx1ZS50aGVuKHRleHRDb250ZW50KTtcbiAgICAgICAgfSBlbHNlIGlmICgncGxhY2Vob2xkZXInIGluIHZhbHVlKSB7XG4gICAgICAgICAgaW52b2tlQXREaXN0YW5jZSh2YWx1ZSwgdGV4dENvbnRlbnQpO1xuICAgICAgICB9IGVsc2UgaWYgKCd0ZXh0JyBpbiB2YWx1ZSkge1xuICAgICAgICAgIHRleHRDb250ZW50KFN0cmluZyh2YWx1ZS50ZXh0KSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2FueScgaW4gdmFsdWUpIHtcbiAgICAgICAgICB0ZXh0Q29udGVudCh2YWx1ZS5hbnkpO1xuICAgICAgICB9IGVsc2UgaWYgKCdodG1sJyBpbiB2YWx1ZSkge1xuICAgICAgICAgIHRleHRDb250ZW50KFtdLmNvbmNhdCh2YWx1ZS5odG1sKS5qb2luKCcnKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJ2xlbmd0aCcgaW4gdmFsdWUpIHtcbiAgICAgICAgICB0ZXh0Q29udGVudChzbGljZS5jYWxsKHZhbHVlKS5qb2luKCcnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGV4dENvbnRlbnQoSW50ZW50Lmludm9rZSh2YWx1ZSwgdGV4dENvbnRlbnQpKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHRleHRDb250ZW50O1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge3ZhbHVlOiB0cnVlfSkuZGVmYXVsdCA9IHtjcmVhdGUsIGZpbmR9O1xuXG4vLyBoeXBlci5Db21wb25lbnRzIG1pZ2h0IG5lZWQgY29ubmVjdGVkL2Rpc2Nvbm5lY3RlZCBub3RpZmljYXRpb25zXG4vLyB1c2VkIGJ5IGNvbXBvbmVudHMgYW5kIHRoZWlyIG9uY29ubmVjdC9vbmRpc2Nvbm5lY3QgY2FsbGJhY2tzLlxuLy8gV2hlbiBvbmUgb2YgdGhlc2UgY2FsbGJhY2tzIGlzIGVuY291bnRlcmVkLFxuLy8gdGhlIGRvY3VtZW50IHN0YXJ0cyBiZWluZyBvYnNlcnZlZC5cbmxldCBub3RPYnNlcnZpbmcgPSB0cnVlO1xuZnVuY3Rpb24gb2JzZXJ2ZSgpIHtcblxuICAvLyB3aGVuIGh5cGVyLkNvbXBvbmVudCByZWxhdGVkIERPTSBub2Rlc1xuICAvLyBhcmUgYXBwZW5kZWQgb3IgcmVtb3ZlZCBmcm9tIHRoZSBsaXZlIHRyZWVcbiAgLy8gdGhlc2UgbWlnaHQgbGlzdGVuIHRvIGNvbm5lY3RlZC9kaXNjb25uZWN0ZWQgZXZlbnRzXG4gIC8vIFRoaXMgdXRpbGl0eSBpcyBpbiBjaGFyZ2Ugb2YgZmluZGluZyBhbGwgY29tcG9uZW50c1xuICAvLyBpbnZvbHZlZCBpbiB0aGUgRE9NIHVwZGF0ZS9jaGFuZ2UgYW5kIGRpc3BhdGNoXG4gIC8vIHJlbGF0ZWQgaW5mb3JtYXRpb24gdG8gdGhlbVxuICBjb25zdCBkaXNwYXRjaEFsbCA9IChub2RlcywgdHlwZSkgPT4ge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IEV2ZW50KHR5cGUpO1xuICAgIGNvbnN0IGxlbmd0aCA9IG5vZGVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICBkaXNwYXRjaFRhcmdldChub2RlLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIHRoZSB3YXkgaXQncyBkb25lIGlzIHZpYSB0aGUgY29tcG9uZW50cyB3ZWFrIHNldFxuICAvLyBhbmQgcmVjdXJzaXZlbHkgbG9va2luZyBmb3IgbmVzdGVkIGNvbXBvbmVudHMgdG9vXG4gIGNvbnN0IGRpc3BhdGNoVGFyZ2V0ID0gKG5vZGUsIGV2ZW50KSA9PiB7XG4gICAgaWYgKGNvbXBvbmVudHMuaGFzKG5vZGUpKSB7XG4gICAgICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgIH1cblxuICAgIGNvbnN0IGNoaWxkcmVuID0gbm9kZS5jaGlsZHJlbjtcbiAgICBjb25zdCBsZW5ndGggPSBjaGlsZHJlbi5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgZGlzcGF0Y2hUYXJnZXQoY2hpbGRyZW5baV0sIGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvLyBUaGUgTXV0YXRpb25PYnNlcnZlciBpcyB0aGUgYmVzdCB3YXkgdG8gaW1wbGVtZW50IHRoYXRcbiAgLy8gYnV0IHRoZXJlIGlzIGEgZmFsbGJhY2sgdG8gZGVwcmVjYXRlZCBET01Ob2RlSW5zZXJ0ZWQvUmVtb3ZlZFxuICAvLyBzbyB0aGF0IGV2ZW4gb2xkZXIgYnJvd3NlcnMvZW5naW5lcyBjYW4gaGVscCBjb21wb25lbnRzIGxpZmUtY3ljbGVcbiAgdHJ5IHtcbiAgICAobmV3IE11dGF0aW9uT2JzZXJ2ZXIocmVjb3JkcyA9PiB7XG4gICAgICBjb25zdCBsZW5ndGggPSByZWNvcmRzLmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IHJlY29yZCA9IHJlY29yZHNbaV07XG4gICAgICAgIGRpc3BhdGNoQWxsKHJlY29yZC5yZW1vdmVkTm9kZXMsIERJU0NPTk5FQ1RFRCk7XG4gICAgICAgIGRpc3BhdGNoQWxsKHJlY29yZC5hZGRlZE5vZGVzLCBDT05ORUNURUQpO1xuICAgICAgfVxuICAgIH0pKS5vYnNlcnZlKGRvY3VtZW50LCB7c3VidHJlZTogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlfSk7XG4gIH0gY2F0Y2gob19PKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NTm9kZVJlbW92ZWQnLCBldmVudCA9PiB7XG4gICAgICBkaXNwYXRjaEFsbChbZXZlbnQudGFyZ2V0XSwgRElTQ09OTkVDVEVEKTtcbiAgICB9LCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NTm9kZUluc2VydGVkJywgZXZlbnQgPT4ge1xuICAgICAgZGlzcGF0Y2hBbGwoW2V2ZW50LnRhcmdldF0sIENPTk5FQ1RFRCk7XG4gICAgfSwgZmFsc2UpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5jb25zdCBHID0gZG9jdW1lbnQuZGVmYXVsdFZpZXc7XG5leHBvcnRzLkcgPSBHO1xuXG4vLyBOb2RlLkNPTlNUQU5UU1xuLy8gJ2NhdXNlIHNvbWUgZW5naW5lIGhhcyBubyBnbG9iYWwgTm9kZSBkZWZpbmVkXG4vLyAoaS5lLiBOb2RlLCBOYXRpdmVTY3JpcHQsIGJhc2ljSFRNTCAuLi4gKVxuY29uc3QgRUxFTUVOVF9OT0RFID0gMTtcbmV4cG9ydHMuRUxFTUVOVF9OT0RFID0gRUxFTUVOVF9OT0RFO1xuY29uc3QgQVRUUklCVVRFX05PREUgPSAyO1xuZXhwb3J0cy5BVFRSSUJVVEVfTk9ERSA9IEFUVFJJQlVURV9OT0RFO1xuY29uc3QgVEVYVF9OT0RFID0gMztcbmV4cG9ydHMuVEVYVF9OT0RFID0gVEVYVF9OT0RFO1xuY29uc3QgQ09NTUVOVF9OT0RFID0gODtcbmV4cG9ydHMuQ09NTUVOVF9OT0RFID0gQ09NTUVOVF9OT0RFO1xuY29uc3QgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xuZXhwb3J0cy5ET0NVTUVOVF9GUkFHTUVOVF9OT0RFID0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERTtcblxuLy8gSFRNTCByZWxhdGVkIGNvbnN0YW50c1xuY29uc3QgVk9JRF9FTEVNRU5UUyA9IC9eYXJlYXxiYXNlfGJyfGNvbHxlbWJlZHxocnxpbWd8aW5wdXR8a2V5Z2VufGxpbmt8bWVudWl0ZW18bWV0YXxwYXJhbXxzb3VyY2V8dHJhY2t8d2JyJC9pO1xuZXhwb3J0cy5WT0lEX0VMRU1FTlRTID0gVk9JRF9FTEVNRU5UUztcblxuLy8gU1ZHIHJlbGF0ZWQgY29uc3RhbnRzXG5jb25zdCBPV05FUl9TVkdfRUxFTUVOVCA9ICdvd25lclNWR0VsZW1lbnQnO1xuZXhwb3J0cy5PV05FUl9TVkdfRUxFTUVOVCA9IE9XTkVSX1NWR19FTEVNRU5UO1xuY29uc3QgU1ZHX05BTUVTUEFDRSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5leHBvcnRzLlNWR19OQU1FU1BBQ0UgPSBTVkdfTkFNRVNQQUNFO1xuXG4vLyBDdXN0b20gRWxlbWVudHMgLyBNdXRhdGlvbk9ic2VydmVyIGNvbnN0YW50c1xuY29uc3QgQ09OTkVDVEVEID0gJ2Nvbm5lY3RlZCc7XG5leHBvcnRzLkNPTk5FQ1RFRCA9IENPTk5FQ1RFRDtcbmNvbnN0IERJU0NPTk5FQ1RFRCA9ICdkaXMnICsgQ09OTkVDVEVEO1xuZXhwb3J0cy5ESVNDT05ORUNURUQgPSBESVNDT05ORUNURUQ7XG5cbi8vIGh5cGVySFRNTCByZWxhdGVkIGNvbnN0YW50c1xuY29uc3QgRVhQQU5ETyA9ICdfaHlwZXI6ICc7XG5leHBvcnRzLkVYUEFORE8gPSBFWFBBTkRPO1xuY29uc3QgU0hPVUxEX1VTRV9URVhUX0NPTlRFTlQgPSAvXnN0eWxlfHRleHRhcmVhJC9pO1xuZXhwb3J0cy5TSE9VTERfVVNFX1RFWFRfQ09OVEVOVCA9IFNIT1VMRF9VU0VfVEVYVF9DT05URU5UO1xuY29uc3QgVUlEID0gRVhQQU5ETyArICgoTWF0aC5yYW5kb20oKSAqIG5ldyBEYXRlKSB8IDApICsgJzsnO1xuZXhwb3J0cy5VSUQgPSBVSUQ7XG5jb25zdCBVSURDID0gJzwhLS0nICsgVUlEICsgJy0tPic7XG5leHBvcnRzLlVJREMgPSBVSURDO1xuIiwiJ3VzZSBzdHJpY3QnO1xuLyogQVVUT01BVElDQUxMWSBJTVBPUlRFRCwgRE8gTk9UIE1PRElGWSAqL1xuLyohIChjKSAyMDE3IEFuZHJlYSBHaWFtbWFyY2hpIChJU0MpICovXG5cbi8qKlxuICogVGhpcyBjb2RlIGlzIGEgcmV2aXNpdGVkIHBvcnQgb2YgdGhlIHNuYWJiZG9tIHZET00gZGlmZmluZyBsb2dpYyxcbiAqIHRoZSBzYW1lIHRoYXQgZnVlbHMgYXMgZm9yayBWdWUuanMgb3Igb3RoZXIgbGlicmFyaWVzLlxuICogQGNyZWRpdHMgaHR0cHM6Ly9naXRodWIuY29tL3NuYWJiZG9tL3NuYWJiZG9tXG4gKi9cblxuY29uc3QgaWRlbnRpdHkgPSBPID0+IE87XG5cbmNvbnN0IHJlbW92ZSA9IChwYXJlbnROb2RlLCBiZWZvcmUsIGFmdGVyKSA9PiB7XG4gIGNvbnN0IHJhbmdlID0gcGFyZW50Tm9kZS5vd25lckRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHJhbmdlLnNldFN0YXJ0QmVmb3JlKGJlZm9yZSk7XG4gIHJhbmdlLnNldEVuZEFmdGVyKGFmdGVyKTtcbiAgcmFuZ2UuZGVsZXRlQ29udGVudHMoKTtcbn07XG5cbmNvbnN0IGRvbWRpZmYgPSAoXG4gIHBhcmVudE5vZGUsICAgICAvLyB3aGVyZSBjaGFuZ2VzIGhhcHBlblxuICBjdXJyZW50Tm9kZXMsICAgLy8gQXJyYXkgb2YgY3VycmVudCBpdGVtcy9ub2Rlc1xuICBmdXR1cmVOb2RlcywgICAgLy8gQXJyYXkgb2YgZnV0dXJlIGl0ZW1zL25vZGVzXG4gIGdldE5vZGUsICAgICAgICAvLyBvcHRpb25hbCB3YXkgdG8gcmV0cmlldmUgYSBub2RlIGZyb20gYW4gaXRlbVxuICBiZWZvcmVOb2RlICAgICAgLy8gb3B0aW9uYWwgaXRlbS9ub2RlIHRvIHVzZSBhcyBpbnNlcnRCZWZvcmUgZGVsaW1pdGVyXG4pID0+IHtcbiAgY29uc3QgZ2V0ID0gZ2V0Tm9kZSB8fCBpZGVudGl0eTtcbiAgY29uc3QgYmVmb3JlID0gYmVmb3JlTm9kZSA9PSBudWxsID8gbnVsbCA6IGdldChiZWZvcmVOb2RlLCAwKTtcbiAgbGV0IGN1cnJlbnRTdGFydCA9IDAsIGZ1dHVyZVN0YXJ0ID0gMDtcbiAgbGV0IGN1cnJlbnRFbmQgPSBjdXJyZW50Tm9kZXMubGVuZ3RoIC0gMTtcbiAgbGV0IGN1cnJlbnRTdGFydE5vZGUgPSBjdXJyZW50Tm9kZXNbMF07XG4gIGxldCBjdXJyZW50RW5kTm9kZSA9IGN1cnJlbnROb2Rlc1tjdXJyZW50RW5kXTtcbiAgbGV0IGZ1dHVyZUVuZCA9IGZ1dHVyZU5vZGVzLmxlbmd0aCAtIDE7XG4gIGxldCBmdXR1cmVTdGFydE5vZGUgPSBmdXR1cmVOb2Rlc1swXTtcbiAgbGV0IGZ1dHVyZUVuZE5vZGUgPSBmdXR1cmVOb2Rlc1tmdXR1cmVFbmRdO1xuICB3aGlsZSAoY3VycmVudFN0YXJ0IDw9IGN1cnJlbnRFbmQgJiYgZnV0dXJlU3RhcnQgPD0gZnV0dXJlRW5kKSB7XG4gICAgaWYgKGN1cnJlbnRTdGFydE5vZGUgPT0gbnVsbCkge1xuICAgICAgY3VycmVudFN0YXJ0Tm9kZSA9IGN1cnJlbnROb2Rlc1srK2N1cnJlbnRTdGFydF07XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRFbmROb2RlID09IG51bGwpIHtcbiAgICAgIGN1cnJlbnRFbmROb2RlID0gY3VycmVudE5vZGVzWy0tY3VycmVudEVuZF07XG4gICAgfVxuICAgIGVsc2UgaWYgKGZ1dHVyZVN0YXJ0Tm9kZSA9PSBudWxsKSB7XG4gICAgICBmdXR1cmVTdGFydE5vZGUgPSBmdXR1cmVOb2Rlc1srK2Z1dHVyZVN0YXJ0XTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZnV0dXJlRW5kTm9kZSA9PSBudWxsKSB7XG4gICAgICBmdXR1cmVFbmROb2RlID0gZnV0dXJlTm9kZXNbLS1mdXR1cmVFbmRdO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJyZW50U3RhcnROb2RlID09IGZ1dHVyZVN0YXJ0Tm9kZSkge1xuICAgICAgY3VycmVudFN0YXJ0Tm9kZSA9IGN1cnJlbnROb2Rlc1srK2N1cnJlbnRTdGFydF07XG4gICAgICBmdXR1cmVTdGFydE5vZGUgPSBmdXR1cmVOb2Rlc1srK2Z1dHVyZVN0YXJ0XTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VycmVudEVuZE5vZGUgPT0gZnV0dXJlRW5kTm9kZSkge1xuICAgICAgY3VycmVudEVuZE5vZGUgPSBjdXJyZW50Tm9kZXNbLS1jdXJyZW50RW5kXTtcbiAgICAgIGZ1dHVyZUVuZE5vZGUgPSBmdXR1cmVOb2Rlc1stLWZ1dHVyZUVuZF07XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRTdGFydE5vZGUgPT0gZnV0dXJlRW5kTm9kZSkge1xuICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXG4gICAgICAgIGdldChjdXJyZW50U3RhcnROb2RlLCAxKSxcbiAgICAgICAgZ2V0KGN1cnJlbnRFbmROb2RlLCAtMCkubmV4dFNpYmxpbmdcbiAgICAgICk7XG4gICAgICBjdXJyZW50U3RhcnROb2RlID0gY3VycmVudE5vZGVzWysrY3VycmVudFN0YXJ0XTtcbiAgICAgIGZ1dHVyZUVuZE5vZGUgPSBmdXR1cmVOb2Rlc1stLWZ1dHVyZUVuZF07XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRFbmROb2RlID09IGZ1dHVyZVN0YXJ0Tm9kZSkge1xuICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXG4gICAgICAgIGdldChjdXJyZW50RW5kTm9kZSwgMSksXG4gICAgICAgIGdldChjdXJyZW50U3RhcnROb2RlLCAwKVxuICAgICAgKTtcbiAgICAgIGN1cnJlbnRFbmROb2RlID0gY3VycmVudE5vZGVzWy0tY3VycmVudEVuZF07XG4gICAgICBmdXR1cmVTdGFydE5vZGUgPSBmdXR1cmVOb2Rlc1srK2Z1dHVyZVN0YXJ0XTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBsZXQgaW5kZXggPSBjdXJyZW50Tm9kZXMuaW5kZXhPZihmdXR1cmVTdGFydE5vZGUpO1xuICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShcbiAgICAgICAgICBnZXQoZnV0dXJlU3RhcnROb2RlLCAxKSxcbiAgICAgICAgICBnZXQoY3VycmVudFN0YXJ0Tm9kZSwgMClcbiAgICAgICAgKTtcbiAgICAgICAgZnV0dXJlU3RhcnROb2RlID0gZnV0dXJlTm9kZXNbKytmdXR1cmVTdGFydF07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbGV0IGkgPSBpbmRleDtcbiAgICAgICAgbGV0IGYgPSBmdXR1cmVTdGFydDtcbiAgICAgICAgd2hpbGUgKFxuICAgICAgICAgIGkgPD0gY3VycmVudEVuZCAmJlxuICAgICAgICAgIGYgPD0gZnV0dXJlRW5kICYmXG4gICAgICAgICAgY3VycmVudE5vZGVzW2ldID09PSBmdXR1cmVOb2Rlc1tmXVxuICAgICAgICApIHtcbiAgICAgICAgICBpKys7XG4gICAgICAgICAgZisrO1xuICAgICAgICB9XG4gICAgICAgIGlmICgxIDwgKGkgLSBpbmRleCkpIHtcbiAgICAgICAgICBpZiAoLS1pbmRleCA9PT0gY3VycmVudFN0YXJ0KSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKGdldChjdXJyZW50U3RhcnROb2RlLCAtMSkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW1vdmUoXG4gICAgICAgICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgICAgICAgIGdldChjdXJyZW50U3RhcnROb2RlLCAtMSksXG4gICAgICAgICAgICAgIGdldChjdXJyZW50Tm9kZXNbaW5kZXhdLCAtMSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1cnJlbnRTdGFydCA9IGk7XG4gICAgICAgICAgZnV0dXJlU3RhcnQgPSBmO1xuICAgICAgICAgIGN1cnJlbnRTdGFydE5vZGUgPSBjdXJyZW50Tm9kZXNbaV07XG4gICAgICAgICAgZnV0dXJlU3RhcnROb2RlID0gZnV0dXJlTm9kZXNbZl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgZWwgPSBjdXJyZW50Tm9kZXNbaW5kZXhdO1xuICAgICAgICAgIGN1cnJlbnROb2Rlc1tpbmRleF0gPSBudWxsO1xuICAgICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGdldChlbCwgMSksIGdldChjdXJyZW50U3RhcnROb2RlLCAwKSk7XG4gICAgICAgICAgZnV0dXJlU3RhcnROb2RlID0gZnV0dXJlTm9kZXNbKytmdXR1cmVTdGFydF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGN1cnJlbnRTdGFydCA8PSBjdXJyZW50RW5kIHx8IGZ1dHVyZVN0YXJ0IDw9IGZ1dHVyZUVuZCkge1xuICAgIGlmIChjdXJyZW50U3RhcnQgPiBjdXJyZW50RW5kKSB7XG4gICAgICBjb25zdCBwaW4gPSBmdXR1cmVOb2Rlc1tmdXR1cmVFbmQgKyAxXTtcbiAgICAgIGNvbnN0IHBsYWNlID0gcGluID09IG51bGwgPyBiZWZvcmUgOiBnZXQocGluLCAwKTtcbiAgICAgIGlmIChmdXR1cmVTdGFydCA9PT0gZnV0dXJlRW5kKSB7XG4gICAgICAgIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGdldChmdXR1cmVOb2Rlc1tmdXR1cmVTdGFydF0sIDEpLCBwbGFjZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBwYXJlbnROb2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICB3aGlsZSAoZnV0dXJlU3RhcnQgPD0gZnV0dXJlRW5kKSB7XG4gICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoZ2V0KGZ1dHVyZU5vZGVzW2Z1dHVyZVN0YXJ0KytdLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZnJhZ21lbnQsIHBsYWNlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpZiAoY3VycmVudE5vZGVzW2N1cnJlbnRTdGFydF0gPT0gbnVsbCkgY3VycmVudFN0YXJ0Kys7XG4gICAgICBpZiAoY3VycmVudFN0YXJ0ID09PSBjdXJyZW50RW5kKSB7XG4gICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZ2V0KGN1cnJlbnROb2Rlc1tjdXJyZW50U3RhcnRdLCAtMSkpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlbW92ZShcbiAgICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICAgIGdldChjdXJyZW50Tm9kZXNbY3VycmVudFN0YXJ0XSwgLTEpLFxuICAgICAgICAgIGdldChjdXJyZW50Tm9kZXNbY3VycmVudEVuZF0sIC0xKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZnV0dXJlTm9kZXM7XG59O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7dmFsdWU6IHRydWV9KS5kZWZhdWx0ID0gZG9tZGlmZjtcbiIsIid1c2Ugc3RyaWN0Jztcbi8vIHRoZXNlIGFyZSB0aW55IGhlbHBlcnMgdG8gc2ltcGxpZnkgbW9zdCBjb21tb24gb3BlcmF0aW9ucyBuZWVkZWQgaGVyZVxuY29uc3QgY3JlYXRlID0gKG5vZGUsIHR5cGUpID0+IGRvYyhub2RlKS5jcmVhdGVFbGVtZW50KHR5cGUpO1xuZXhwb3J0cy5jcmVhdGUgPSBjcmVhdGU7XG5jb25zdCBkb2MgPSBub2RlID0+IG5vZGUub3duZXJEb2N1bWVudCB8fCBub2RlO1xuZXhwb3J0cy5kb2MgPSBkb2M7XG5jb25zdCBmcmFnbWVudCA9IG5vZGUgPT4gZG9jKG5vZGUpLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbmV4cG9ydHMuZnJhZ21lbnQgPSBmcmFnbWVudDtcbmNvbnN0IHRleHQgPSAobm9kZSwgdGV4dCkgPT4gZG9jKG5vZGUpLmNyZWF0ZVRleHROb2RlKHRleHQpO1xuZXhwb3J0cy50ZXh0ID0gdGV4dDtcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHtjcmVhdGUsIGZyYWdtZW50LCB0ZXh0fSA9IHJlcXVpcmUoJy4vZWFzeS1kb20uanMnKTtcblxuY29uc3QgdGVzdEZyYWdtZW50ID0gZnJhZ21lbnQoZG9jdW1lbnQpO1xuXG4vLyBET000IG5vZGUuYXBwZW5kKC4uLm1hbnkpXG5jb25zdCBoYXNBcHBlbmQgPSAnYXBwZW5kJyBpbiB0ZXN0RnJhZ21lbnQ7XG5leHBvcnRzLmhhc0FwcGVuZCA9IGhhc0FwcGVuZDtcblxuLy8gZGV0ZWN0IG9sZCBicm93c2VycyB3aXRob3V0IEhUTUxUZW1wbGF0ZUVsZW1lbnQgY29udGVudCBzdXBwb3J0XG5jb25zdCBoYXNDb250ZW50ID0gJ2NvbnRlbnQnIGluIGNyZWF0ZShkb2N1bWVudCwgJ3RlbXBsYXRlJyk7XG5leHBvcnRzLmhhc0NvbnRlbnQgPSBoYXNDb250ZW50O1xuXG4vLyBJRSAxMSBoYXMgcHJvYmxlbXMgd2l0aCBjbG9uaW5nIHRlbXBsYXRlczogaXQgXCJmb3JnZXRzXCIgZW1wdHkgY2hpbGROb2Rlc1xudGVzdEZyYWdtZW50LmFwcGVuZENoaWxkKHRleHQodGVzdEZyYWdtZW50LCAnZycpKTtcbnRlc3RGcmFnbWVudC5hcHBlbmRDaGlsZCh0ZXh0KHRlc3RGcmFnbWVudCwgJycpKTtcbmNvbnN0IGhhc0Rvb21lZENsb25lTm9kZSA9IHRlc3RGcmFnbWVudC5jbG9uZU5vZGUodHJ1ZSkuY2hpbGROb2Rlcy5sZW5ndGggPT09IDE7XG5leHBvcnRzLmhhc0Rvb21lZENsb25lTm9kZSA9IGhhc0Rvb21lZENsb25lTm9kZTtcblxuLy8gb2xkIGJyb3dzZXJzIG5lZWQgdG8gZmFsbGJhY2sgdG8gY2xvbmVOb2RlXG4vLyBDdXN0b20gRWxlbWVudHMgVjAgYW5kIFYxIHdpbGwgd29yayBwb2x5ZmlsbGVkXG4vLyBidXQgbmF0aXZlIGltcGxlbWVudGF0aW9ucyBuZWVkIGltcG9ydE5vZGUgaW5zdGVhZFxuLy8gKHNwZWNpYWxseSBDaHJvbWl1bSBhbmQgaXRzIG9sZCBWMCBpbXBsZW1lbnRhdGlvbilcbmNvbnN0IGhhc0ltcG9ydE5vZGUgPSAnaW1wb3J0Tm9kZScgaW4gZG9jdW1lbnQ7XG5leHBvcnRzLmhhc0ltcG9ydE5vZGUgPSBoYXNJbXBvcnROb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qge0csIFVJRH0gPSByZXF1aXJlKCcuL2NvbnN0YW50cy5qcycpO1xuXG4vLyB5b3Uga25vdyB0aGF0IGtpbmQgb2YgYmFzaWNzIHlvdSBuZWVkIHRvIGNvdmVyXG4vLyB5b3VyIHVzZSBjYXNlIG9ubHkgYnV0IHlvdSBkb24ndCB3YW50IHRvIGJsb2F0IHRoZSBsaWJyYXJ5P1xuLy8gVGhlcmUncyBldmVuIGEgcGFja2FnZSBpbiBoZXJlOlxuLy8gaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvcG9vcmx5ZmlsbHNcblxuLy8gdXNlZCB0byBkaXNwYXRjaCBzaW1wbGUgZXZlbnRzXG5sZXQgRXZlbnQgPSBHLkV2ZW50O1xudHJ5IHtcbiAgbmV3IEV2ZW50KCdFdmVudCcpO1xufSBjYXRjaChvX08pIHtcbiAgRXZlbnQgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgIGNvbnN0IGUgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICBlLmluaXRFdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UpO1xuICAgIHJldHVybiBlO1xuICB9O1xufVxuZXhwb3J0cy5FdmVudCA9IEV2ZW50O1xuXG4vLyB1c2VkIHRvIHN0b3JlIHRlbXBsYXRlIGxpdGVyYWxzXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuY29uc3QgTWFwID0gRy5NYXAgfHwgZnVuY3Rpb24gTWFwKCkge1xuICBjb25zdCBrZXlzID0gW10sIHZhbHVlcyA9IFtdO1xuICByZXR1cm4ge1xuICAgIGdldChvYmopIHtcbiAgICAgIHJldHVybiB2YWx1ZXNba2V5cy5pbmRleE9mKG9iaildO1xuICAgIH0sXG4gICAgc2V0KG9iaiwgdmFsdWUpIHtcbiAgICAgIHZhbHVlc1trZXlzLnB1c2gob2JqKSAtIDFdID0gdmFsdWU7XG4gICAgfVxuICB9O1xufTtcbmV4cG9ydHMuTWFwID0gTWFwO1xuXG4vLyB1c2VkIHRvIHN0b3JlIHdpcmVkIGNvbnRlbnRcbmxldCBJRCA9IDA7XG5jb25zdCBXZWFrTWFwID0gRy5XZWFrTWFwIHx8IGZ1bmN0aW9uIFdlYWtNYXAoKSB7XG4gIGNvbnN0IGtleSA9IFVJRCArIElEKys7XG4gIHJldHVybiB7XG4gICAgZ2V0KG9iaikgeyByZXR1cm4gb2JqW2tleV07IH0sXG4gICAgc2V0KG9iaiwgdmFsdWUpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59O1xuZXhwb3J0cy5XZWFrTWFwID0gV2Vha01hcDtcblxuLy8gdXNlZCB0byBzdG9yZSBoeXBlci5Db21wb25lbnRzXG5jb25zdCBXZWFrU2V0ID0gRy5XZWFrU2V0IHx8IGZ1bmN0aW9uIFdlYWtTZXQoKSB7XG4gIGNvbnN0IHdtID0gbmV3IFdlYWtNYXA7XG4gIHJldHVybiB7XG4gICAgYWRkKG9iaikgeyB3bS5zZXQob2JqLCB0cnVlKTsgfSxcbiAgICBoYXMob2JqKSB7IHJldHVybiB3bS5nZXQob2JqKSA9PT0gdHJ1ZTsgfVxuICB9O1xufTtcbmV4cG9ydHMuV2Vha1NldCA9IFdlYWtTZXQ7XG5cbi8vIHVzZWQgdG8gYmUgc3VyZSBJRTkgb3Igb2xkZXIgQW5kcm9pZHMgd29yayBhcyBleHBlY3RlZFxuY29uc3QgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgKHRvU3RyaW5nID0+XG4gIGFyciA9PiB0b1N0cmluZy5jYWxsKGFycikgPT09ICdbb2JqZWN0IEFycmF5XSdcbikoe30udG9TdHJpbmcpO1xuZXhwb3J0cy5pc0FycmF5ID0gaXNBcnJheTtcblxuY29uc3QgdHJpbSA9IFVJRC50cmltIHx8IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xufTtcbmV4cG9ydHMudHJpbSA9IHRyaW07XG4iLCIndXNlIHN0cmljdCc7XG4vLyBUT0RPOiAgSSdkIGxvdmUgdG8gY29kZS1jb3ZlciBSZWdFeHAgdG9vIGhlcmVcbi8vICAgICAgICB0aGVzZSBhcmUgZnVuZGFtZW50YWwgZm9yIHRoaXMgbGlicmFyeVxuXG5jb25zdCBzcGFjZXMgPSAnIFxcXFxmXFxcXG5cXFxcclxcXFx0JztcbmNvbnN0IGFsbW9zdEV2ZXJ5dGhpbmcgPSAnW14gJyArIHNwYWNlcyArICdcXFxcLz5cIlxcJz1dKyc7XG5jb25zdCBhdHRyTmFtZSA9ICdbICcgKyBzcGFjZXMgKyAnXSsnICsgYWxtb3N0RXZlcnl0aGluZztcbmNvbnN0IHRhZ05hbWUgPSAnPChbQS1aYS16XStbQS1aYS16MC05Ol8tXSopKCg/Oic7XG5jb25zdCBhdHRyUGFydGlhbHMgPSAnKD86PSg/OlxcJ1teXFwnXSo/XFwnfFwiW15cIl0qP1wifDxbXj5dKj8+fCcgKyBhbG1vc3RFdmVyeXRoaW5nICsgJykpPyknO1xuXG5jb25zdCBhdHRyU2Vla2VyID0gbmV3IFJlZ0V4cChcbiAgdGFnTmFtZSArIGF0dHJOYW1lICsgYXR0clBhcnRpYWxzICsgJyspKFsgJyArIHNwYWNlcyArICddKi8/PiknLFxuICAnZydcbik7XG5cbmNvbnN0IHNlbGZDbG9zaW5nID0gbmV3IFJlZ0V4cChcbiAgdGFnTmFtZSArIGF0dHJOYW1lICsgYXR0clBhcnRpYWxzICsgJyopKFsgJyArIHNwYWNlcyArICddKi8+KScsXG4gICdnJ1xuKTtcblxuZXhwb3J0cy5hdHRyTmFtZSA9IGF0dHJOYW1lO1xuZXhwb3J0cy5hdHRyU2Vla2VyID0gYXR0clNlZWtlcjtcbmV4cG9ydHMuc2VsZkNsb3NpbmcgPSBzZWxmQ2xvc2luZztcbiIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IHthdHRyTmFtZSwgYXR0clNlZWtlcn0gPSByZXF1aXJlKCcuL3JlLmpzJyk7XG5cbmNvbnN0IHtcbiAgRyxcbiAgT1dORVJfU1ZHX0VMRU1FTlQsXG4gIFNWR19OQU1FU1BBQ0UsXG4gIFVJRCxcbiAgVUlEQ1xufSA9IHJlcXVpcmUoJy4vY29uc3RhbnRzLmpzJyk7XG5cbmNvbnN0IHtcbiAgaGFzQXBwZW5kLFxuICBoYXNDb250ZW50LFxuICBoYXNEb29tZWRDbG9uZU5vZGUsXG4gIGhhc0ltcG9ydE5vZGVcbn0gPSByZXF1aXJlKCcuL2ZlYXR1cmVzLWRldGVjdGlvbi5qcycpO1xuXG5jb25zdCB7Y3JlYXRlLCBkb2MsIGZyYWdtZW50fSA9IHJlcXVpcmUoJy4vZWFzeS1kb20uanMnKTtcblxuY29uc3Qge01hcCwgV2Vha01hcH0gPSByZXF1aXJlKCcuL3Bvb3JseWZpbGxzLmpzJyk7XG5cbi8vIGFwcGVuZHMgYW4gYXJyYXkgb2Ygbm9kZXNcbi8vIHRvIGEgZ2VuZXJpYyBub2RlL2ZyYWdtZW50XG4vLyBXaGVuIGF2YWlsYWJsZSwgdXNlcyBhcHBlbmQgcGFzc2luZyBhbGwgYXJndW1lbnRzIGF0IG9uY2Vcbi8vIGhvcGluZyB0aGF0J3Mgc29tZWhvdyBmYXN0ZXIsIGV2ZW4gaWYgYXBwZW5kIGhhcyBtb3JlIGNoZWNrcyBvbiB0eXBlXG5jb25zdCBhcHBlbmQgPSBoYXNBcHBlbmQgP1xuICAobm9kZSwgY2hpbGROb2RlcykgPT4ge1xuICAgIG5vZGUuYXBwZW5kLmFwcGx5KG5vZGUsIGNoaWxkTm9kZXMpO1xuICB9IDpcbiAgKG5vZGUsIGNoaWxkTm9kZXMpID0+IHtcbiAgICBjb25zdCBsZW5ndGggPSBjaGlsZE5vZGVzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBub2RlLmFwcGVuZENoaWxkKGNoaWxkTm9kZXNbaV0pO1xuICAgIH1cbiAgfTtcbmV4cG9ydHMuYXBwZW5kID0gYXBwZW5kO1xuXG5jb25zdCBmaW5kQXR0cmlidXRlcyA9IG5ldyBSZWdFeHAoJygnICsgYXR0ck5hbWUgKyAnPSkoW1xcJ1wiXT8pJyArIFVJREMgKyAnXFxcXDInLCAnZ2knKTtcbmNvbnN0IGNvbW1lbnRzID0gKCQwLCAkMSwgJDIsICQzKSA9PlxuICAnPCcgKyAkMSArICQyLnJlcGxhY2UoZmluZEF0dHJpYnV0ZXMsIHJlcGxhY2VBdHRyaWJ1dGVzKSArICQzO1xuY29uc3QgcmVwbGFjZUF0dHJpYnV0ZXMgPSAoJDAsICQxLCAkMikgPT4gJDEgKyAoJDIgfHwgJ1wiJykgKyBVSUQgKyAoJDIgfHwgJ1wiJyk7XG5cbi8vIGdpdmVuIGEgbm9kZSBhbmQgYSBnZW5lcmljIEhUTUwgY29udGVudCxcbi8vIGNyZWF0ZSBlaXRoZXIgYW4gU1ZHIG9yIGFuIEhUTUwgZnJhZ21lbnRcbi8vIHdoZXJlIHN1Y2ggY29udGVudCB3aWxsIGJlIGluamVjdGVkXG5jb25zdCBjcmVhdGVGcmFnbWVudCA9IChub2RlLCBodG1sKSA9PlxuICAoT1dORVJfU1ZHX0VMRU1FTlQgaW4gbm9kZSA/XG4gICAgU1ZHRnJhZ21lbnQgOlxuICAgIEhUTUxGcmFnbWVudFxuICApKG5vZGUsIGh0bWwucmVwbGFjZShhdHRyU2Vla2VyLCBjb21tZW50cykpO1xuZXhwb3J0cy5jcmVhdGVGcmFnbWVudCA9IGNyZWF0ZUZyYWdtZW50O1xuXG4vLyBJRS9FZGdlIHNoZW5hbmlnYW5zIHByb29mIGNsb25lTm9kZVxuLy8gaXQgZ29lcyB0aHJvdWdoIGFsbCBub2RlcyBtYW51YWxseVxuLy8gaW5zdGVhZCBvZiByZWx5aW5nIHRoZSBlbmdpbmUgdG8gc3VkZGVubHlcbi8vIG1lcmdlIG5vZGVzIHRvZ2V0aGVyXG5jb25zdCBjbG9uZU5vZGUgPSBoYXNEb29tZWRDbG9uZU5vZGUgP1xuICBub2RlID0+IHtcbiAgICBjb25zdCBjbG9uZSA9IG5vZGUuY2xvbmVOb2RlKCk7XG4gICAgY29uc3QgY2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2RlcyB8fFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgaXMgYW4gZXhjZXNzIG9mIGNhdXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgc29tZSBub2RlLCBpbiBJRSwgbWlnaHQgbm90XG4gICAgICAgICAgICAgICAgICAgICAgLy8gaGF2ZSBjaGlsZE5vZGVzIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgZmFsbGJhY2sgZW5zdXJlIHdvcmtpbmcgY29kZVxuICAgICAgICAgICAgICAgICAgICAgIC8vIGluIG9sZGVyIElFIHdpdGhvdXQgY29tcHJvbWlzaW5nIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAgICAgICAgICAgLy8gb3IgYW55IG90aGVyIGJyb3dzZXIvZW5naW5lIGludm9sdmVkLlxuICAgICAgICAgICAgICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgICAgICAgICAgICAgICAgICAgW107XG4gICAgY29uc3QgbGVuZ3RoID0gY2hpbGROb2Rlcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgY2xvbmUuYXBwZW5kQ2hpbGQoY2xvbmVOb2RlKGNoaWxkTm9kZXNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsb25lO1xuICB9IDpcbiAgLy8gdGhlIGZvbGxvd2luZyBpZ25vcmUgaXMgZHVlIGNvZGUtY292ZXJhZ2VcbiAgLy8gY29tYmluYXRpb24gb2Ygbm90IGhhdmluZyBkb2N1bWVudC5pbXBvcnROb2RlXG4gIC8vIGJ1dCBoYXZpbmcgYSB3b3JraW5nIG5vZGUuY2xvbmVOb2RlLlxuICAvLyBUaGlzIHNoZW5hcmlvIGlzIGNvbW1vbiBvbiBvbGRlciBBbmRyb2lkL1dlYktpdCBicm93c2Vyc1xuICAvLyBidXQgYmFzaWNIVE1MIGhlcmUgdGVzdHMganVzdCB0d28gbWFqb3IgY2FzZXM6XG4gIC8vIHdpdGggZG9jdW1lbnQuaW1wb3J0Tm9kZSBvciB3aXRoIGJyb2tlbiBjbG9uZU5vZGUuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIG5vZGUgPT4gbm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbi8vIHVzZWQgdG8gaW1wb3J0IGh0bWwgaW50byBmcmFnbWVudHNcbmNvbnN0IGltcG9ydE5vZGUgPSBoYXNJbXBvcnROb2RlID9cbiAgKGRvYywgbm9kZSkgPT4gZG9jLmltcG9ydE5vZGUobm9kZSwgdHJ1ZSkgOlxuICAoZG9jLCBub2RlKSA9PiBjbG9uZU5vZGUobm9kZSlcbmV4cG9ydHMuaW1wb3J0Tm9kZSA9IGltcG9ydE5vZGVcblxuLy8ganVzdCByZWN5Y2xpbmcgYSBvbmUtb2ZmIGFycmF5IHRvIHVzZSBzbGljZVxuLy8gaW4gZXZlcnkgbmVlZGVkIHBsYWNlXG5jb25zdCBzbGljZSA9IFtdLnNsaWNlO1xuZXhwb3J0cy5zbGljZSA9IHNsaWNlO1xuXG4vLyBsYXp5IGV2YWx1YXRlZCwgcmV0dXJucyB0aGUgdW5pcXVlIGlkZW50aXR5XG4vLyBvZiBhIHRlbXBsYXRlIGxpdGVyYWwsIGFzIHRlbXBhbHRlIGxpdGVyYWwgaXRzZWxmLlxuLy8gQnkgZGVmYXVsdCwgRVMyMDE1IHRlbXBsYXRlIGxpdGVyYWxzIGFyZSB1bmlxdWVcbi8vIHRhZ2BhJHsxfXpgID09PSB0YWdgYSR7Mn16YFxuLy8gZXZlbiBpZiBpbnRlcnBvbGF0ZWQgdmFsdWVzIGFyZSBkaWZmZXJlbnRcbi8vIHRoZSB0ZW1wbGF0ZSBjaHVua3MgYXJlIGluIGEgZnJvemVuIEFycmF5XG4vLyB0aGF0IGlzIGlkZW50aWNhbCBlYWNoIHRpbWUgeW91IHVzZSB0aGUgc2FtZVxuLy8gbGl0ZXJhbCB0byByZXByZXNlbnQgc2FtZSBzdGF0aWMgY29udGVudFxuLy8gYXJvdW5kIGl0cyBvd24gaW50ZXJwb2xhdGlvbnMuXG5jb25zdCB1bmlxdWUgPSB0ZW1wbGF0ZSA9PiBUTCh0ZW1wbGF0ZSk7XG5leHBvcnRzLnVuaXF1ZSA9IHVuaXF1ZTtcblxuLy8gVEwgcmV0dXJucyBhIHVuaXF1ZSB2ZXJzaW9uIG9mIHRoZSB0ZW1wbGF0ZVxuLy8gaXQgbmVlZHMgbGF6eSBmZWF0dXJlIGRldGVjdGlvblxuLy8gKGNhbm5vdCB0cnVzdCBsaXRlcmFscyB3aXRoIHRyYW5zcGlsZWQgY29kZSlcbmxldCBUTCA9IHQgPT4ge1xuICBpZiAoXG4gICAgLy8gVHlwZVNjcmlwdCB0ZW1wbGF0ZSBsaXRlcmFscyBhcmUgbm90IHN0YW5kYXJkXG4gICAgdC5wcm9wZXJ0eUlzRW51bWVyYWJsZSgncmF3JykgfHxcbiAgICAoXG4gICAgICAgIC8vIEZpcmVmb3ggPCA1NSBoYXMgbm90IHN0YW5kYXJkIGltcGxlbWVudGF0aW9uIG5laXRoZXJcbiAgICAgICAgL0ZpcmVmb3hcXC8oXFxkKykvLnRlc3QoKEcubmF2aWdhdG9yIHx8IHt9KS51c2VyQWdlbnQpICYmXG4gICAgICAgICAgcGFyc2VGbG9hdChSZWdFeHAuJDEpIDwgNTVcbiAgICAgICAgKVxuICApIHtcbiAgICBjb25zdCBUID0ge307XG4gICAgVEwgPSB0ID0+IHtcbiAgICAgIGNvbnN0IGsgPSAnXicgKyB0LmpvaW4oJ14nKTtcbiAgICAgIHJldHVybiBUW2tdIHx8IChUW2tdID0gdCk7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtYWtlIFRMIGFuIGlkZW50aXR5IGxpa2UgZnVuY3Rpb25cbiAgICBUTCA9IHQgPT4gdDtcbiAgfVxuICByZXR1cm4gVEwodCk7XG59O1xuXG4vLyB1c2VkIHRvIHN0b3JlIHRlbXBsYXRlcyBvYmplY3RzXG4vLyBzaW5jZSBuZWl0aGVyIE1hcCBub3IgV2Vha01hcCBhcmUgc2FmZVxuY29uc3QgVGVtcGxhdGVNYXAgPSAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgd20gPSBuZXcgV2Vha01hcDtcbiAgICBjb25zdCBvX08gPSBPYmplY3QuZnJlZXplKFtdKTtcbiAgICB3bS5zZXQob19PLCB0cnVlKTtcbiAgICBpZiAoIXdtLmdldChvX08pKSB0aHJvdyBvX087XG4gICAgcmV0dXJuIHdtO1xuICB9IGNhdGNoKG9fTykge1xuICAgIC8vIGluZXZpdGFibGUgbGVnYWN5IGNvZGUgbGVha3MgZHVlXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvZWNtYTI2Mi9wdWxsLzg5MFxuICAgIHJldHVybiBuZXcgTWFwO1xuICB9XG59O1xuZXhwb3J0cy5UZW1wbGF0ZU1hcCA9IFRlbXBsYXRlTWFwO1xuXG4vLyBjcmVhdGUgZG9jdW1lbnQgZnJhZ21lbnRzIHZpYSBuYXRpdmUgdGVtcGxhdGVcbi8vIHdpdGggYSBmYWxsYmFjayBmb3IgYnJvd3NlcnMgdGhhdCB3b24ndCBiZSBhYmxlXG4vLyB0byBkZWFsIHdpdGggc29tZSBpbmplY3RlZCBlbGVtZW50IHN1Y2ggPHRkPiBvciBvdGhlcnNcbmNvbnN0IEhUTUxGcmFnbWVudCA9IGhhc0NvbnRlbnQgP1xuICAobm9kZSwgaHRtbCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZShub2RlLCAndGVtcGxhdGUnKTtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gY29udGFpbmVyLmNvbnRlbnQ7XG4gIH0gOlxuICAobm9kZSwgaHRtbCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZShub2RlLCAndGVtcGxhdGUnKTtcbiAgICBjb25zdCBjb250ZW50ID0gZnJhZ21lbnQobm9kZSk7XG4gICAgaWYgKC9eW15cXFNdKj88KGNvbCg/Omdyb3VwKT98dCg/OmhlYWR8Ym9keXxmb290fHJ8ZHxoKSkvaS50ZXN0KGh0bWwpKSB7XG4gICAgICBjb25zdCBzZWxlY3RvciA9IFJlZ0V4cC4kMTtcbiAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHRhYmxlPicgKyBodG1sICsgJzwvdGFibGU+JztcbiAgICAgIGFwcGVuZChjb250ZW50LCBzbGljZS5jYWxsKGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgIGFwcGVuZChjb250ZW50LCBzbGljZS5jYWxsKGNvbnRhaW5lci5jaGlsZE5vZGVzKSk7XG4gICAgfVxuICAgIHJldHVybiBjb250ZW50O1xuICB9O1xuXG4vLyBjcmVhdGVzIFNWRyBmcmFnbWVudCB3aXRoIGEgZmFsbGJhY2sgZm9yIElFIHRoYXQgbmVlZHMgU1ZHXG4vLyB3aXRoaW4gdGhlIEhUTUwgY29udGVudFxuY29uc3QgU1ZHRnJhZ21lbnQgPSBoYXNDb250ZW50ID9cbiAgKG5vZGUsIGh0bWwpID0+IHtcbiAgICBjb25zdCBjb250ZW50ID0gZnJhZ21lbnQobm9kZSk7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jKG5vZGUpLmNyZWF0ZUVsZW1lbnROUyhTVkdfTkFNRVNQQUNFLCAnc3ZnJyk7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7XG4gICAgYXBwZW5kKGNvbnRlbnQsIHNsaWNlLmNhbGwoY29udGFpbmVyLmNoaWxkTm9kZXMpKTtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfSA6XG4gIChub2RlLCBodG1sKSA9PiB7XG4gICAgY29uc3QgY29udGVudCA9IGZyYWdtZW50KG5vZGUpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNyZWF0ZShub2RlLCAnZGl2Jyk7XG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8c3ZnIHhtbG5zPVwiJyArIFNWR19OQU1FU1BBQ0UgKyAnXCI+JyArIGh0bWwgKyAnPC9zdmc+JztcbiAgICBhcHBlbmQoY29udGVudCwgc2xpY2UuY2FsbChjb250YWluZXIuZmlyc3RDaGlsZC5jaGlsZE5vZGVzKSk7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH07XG4iLCJjb25zdCBoeXBlckhUTUwgPSByZXF1aXJlKCdoeXBlcmh0bWwvY2pzJykuZGVmYXVsdDtcblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBOYXZCYXIgZXh0ZW5kcyBoeXBlckhUTUwuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5hY3RpdmVTZWN0aW9uID0gJyc7XG4gICAgICAgIGlmIChfTE9DQUxTKSB0aGlzLmFjdGl2ZVNlY3Rpb24gPSBfTE9DQUxTLnNlY3Rpb247XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm5hdmJhci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNuYXZpZ2F0aW9uXCIgY2xhc3M9XCJuYXZiYXItdG9nZ2xlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5XCI+VG9nZ2xlIG5hdmlnYXRpb248L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uLWJhclwiPjwvc3Bhbj48c3BhbiBjbGFzcz1cImljb24tYmFyXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1iYXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvXCIgY2xhc3M9XCJuYXZiYXItYnJhbmRcIj48aW1nIGFsdD1cItCa0JrQoNCvXCIgc3JjPVwiL2ltYWdlcy9sb2dvLnBuZ1wiLz48L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPScjbmF2aWdhdGlvbicgY2xhc3M9J2NvbGxlcHNlIG5hdmJhci1jb2xsYXBzZSc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9J25hdiBuYXZiYXItbmF2IG5hdmJhci1sZWZ0Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke19MT0NBTFMubmF2TGlua3MubWFwKGwgPT4gaHlwZXJIVE1MLndpcmUoKWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz0nJHsobC5rZXkgPT0gdGhpcy5hY3RpdmVTZWN0aW9uKSA/ICdhY3RpdmUnIDogJyd9Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz0nJHsobC5zdHlsZSkgPyBsLnN0eWxlIDogJ2J0bi1zaW1wbGUnfScgaHJlZj0nJHtsLmhyZWZ9Jz4ke2wubGFiZWx9PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9J25hdiBuYXZiYXItbmF2IG5hdmJhci1yaWdodCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxpPjxhPmFjY2Vzcz8/c2V0dGluZ3M/PzwvYT48L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG59XG5cblxuXG4vLyAubmF2YmFyKHJvbGU9J25hdmlnYXRpb24tZGVtbycpXG4vLyAgICAgLmNvbnRhaW5lclxuLy8gICAgICAgICAubmF2YmFyLWhlYWRlclxuLy8gICAgICAgICAgICAgYnV0dG9uLm5hdmJhci10b2dnbGUodHlwZT0nYnV0dG9uJywgZGF0YS10b2dnbGU9J2NvbGxhcHNlJywgZGF0YS10YXJnZXQ9JyNuYXZpZ2F0aW9uJylcbi8vICAgICAgICAgICAgICAgICBzcGFuLnNyLW9ubHkgVG9nZ2xlIG5hdmlnYXRpb25cbi8vICAgICAgICAgICAgICAgICBzcGFuLmljb24tYmFyXG4vLyAgICAgICAgICAgICAgICAgc3Bhbi5pY29uLWJhclxuLy8gICAgICAgICAgICAgICAgIHNwYW4uaWNvbi1iYXJcbi8vICAgICAgICAgICAgIGEubmF2YmFyLWJyYW5kKGhyZWY9Jy8nKVxuLy8gICAgICAgICAgICAgICAgIGltZyhhbHQ9J9Ca0JrQoNCvJyBzcmM9Jy9pbWFnZXMvbG9nby5wbmcnKVxuICAgICAgICBcbi8vICAgICAgICAgI25hdmlnYXRpb24uY29sbGFwc2UubmF2YmFyLWNvbGxhcHNlXG4vLyAgICAgICAgICAgICB1bC5uYXYubmF2YmFyLW5hdi5uYXZiYXItbGVmdFxuLy8gICAgICAgICAgICAgICAgIGVhY2ggbGluayBpbiBuYXZMaW5rc1xuLy8gICAgICAgICAgICAgICAgICAgICBsaShjbGFzcz0oc2VjdGlvbiA9PSBsaW5rLmtleSA/ICdhY3RpdmUnIDogbnVsbCkpOiBhLmJ0bihocmVmPWxpbmsuaHJlZiBjbGFzcz0obGluay5zdHlsZSA/IGxpbmsuc3R5bGUgOiAnYnRuLXNpbXBsZScpKT0gbGluay5sYWJlbFxuLy8gICAgICAgICAgICAgdWwubmF2Lm5hdmJhci1uYXYubmF2YmFyLXJpZ2h0XG4vLyAgICAgICAgICAgICAgICAgICAgIGlmIHVzZXJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHVzZXIuY2FuQWNjZXNzS2V5c3RvbmVcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaTogYShocmVmPScva2V5c3RvbmUnKSBPcGVuIEtleXN0b25lXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsaTogYShocmVmPScva2V5c3RvbmUvc2lnbm91dCcpIFNpZ24gT3V0XG4vLyAgICAgICAgICAgICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxpOiBhKGhyZWY9Jy9rZXlzdG9uZS9zaWduaW4nKSBTaWduIEluXG4gICAgICAgICAgICAgICAgICAgICIsImNvbnN0IGh5cGVySFRNTCA9IHJlcXVpcmUoJ2h5cGVyaHRtbC9janMnKS5kZWZhdWx0O1xuXG5sZXQgZWRpdG9ySW5zdGFuY2VDb3VudGVyID0gMDtcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgUG9zdEVkaXRvciBleHRlbmRzIGh5cGVySFRNTC5Db21wb25lbnQge1xuICAgIFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSAge30gcGFyYW1zXG4gICAgICogQHBhcmFtLnRoYXQge30gXG4gICAgICogQHBhcmFtLmF1dG9Gb2N1cyBib29sIGZvY3VzIG9uIHRleHRhcmVhIGFmdGVyIHJlbmRlclxuICAgICAqIEBwYXJhbS5jb250ZW50IHN0cmluZ1xuICAgICAqIEBwYXJhbS5jbGFzcyBzdHJpbmdcbiAgICAgKiBAcGFyYW0uYnV0dG9ucyBbXSBcbiAgICAgKiBAcGFyYW0uYnV0dG9uc1tpXSB7fVxuICAgICAqIEBwYXJhbS5idXR0b25zW2ldLnRpdGxlIHN0cmluZ1xuICAgICAqIEBwYXJhbS5idXR0b25zW2ldLmNsYXNzIHN0cmluZ1xuICAgICAqIEBwYXJhbS5idXR0b25zW2ldLm9uQ2xpY2sgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgY29uc29sZS5sb2cocGFyYW1zKTtcblxuICAgICAgICBlZGl0b3JJbnN0YW5jZUNvdW50ZXIrKztcbiAgICAgICAgbGV0IHRoYXQgPSBwYXJhbXMudGhhdDtcbiAgICAgICAgdGhpcy5hdXRvRm9jdXMgPSBwYXJhbXMuYXV0b0ZvY3VzIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnRleHRBcmVhSWQgPSBgZWRpdG9yLSR7ZWRpdG9ySW5zdGFuY2VDb3VudGVyfWA7XG4gICAgICAgIHRoaXMucG9zdCA9IHBhcmFtcy5wb3N0O1xuICAgICAgICB0aGlzLmNsYXNzID0gYGVkaXRvciAke3BhcmFtcy5jbGFzcyB8fCAnJ31gO1xuICAgICAgICB0aGlzLmJ1dHRvbnMgPSBwYXJhbXMuYnV0dG9ucztcbiAgICAgICAgdGhpcy5idXR0b25zLmZvckVhY2goKGIpID0+IHtcbiAgICAgICAgICAgIGIub25DbGljayA9IGIub25DbGljay5iaW5kKHRoYXQsIHRoaXMpO1xuICAgICAgICAgICAgYi5jbGFzcyA9IGIuY2xhc3MgfHwgJ2J0bic7XG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMuc3RhdGUuaW1hZ2VzID0gdGhpcy5wb3N0LmltYWdlO1xuICAgICAgICB0aGlzLnN0YXRlLnVwbG9hZGVkRmlsZXMgPSBbe3ByZXZpZXc6ICcvdXBsb2Fkcy9qYW0ucG5nJ31dO1xuICAgIH1cblxuICAgIG9uY29ubmVjdGVkKCkge1xuICAgICAgICBpZiAodGhpcy5hdXRvRm9jdXMpIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudGV4dEFyZWFJZCkuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPScke3RoaXMuY2xhc3N9JyBvbmNvbm5lY3RlZD0ke3RoaXN9ID5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9J2Zvcm0tY29udHJvbCcgaWQ9JyR7dGhpcy50ZXh0QXJlYUlkfScgdmFsdWU9JHt0aGlzLnBvc3QuY29udGVudH0+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAke3RoaXMuYnV0dG9ucy5tYXAoKGIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGh5cGVySFRNTC53aXJlKClgXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPScke2IuY2xhc3N9JyBvbmNsaWNrPSR7Yi5vbkNsaWNrfT4ke2IudGl0bGV9PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8aHI+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nYnRuIGJ0bi1saW5rJyBpZD0nVXBweU1vZGFsT3BlbmVyQnRuJz7QlNC+0LHQsNCy0LjRgtGMINC40LfQvtCx0YDQsNC20LXQvdC40LU8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIkRhc2hib2FyZENvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAkeyh0aGlzLnN0YXRlLnVwbG9hZGVkRmlsZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBoeXBlckhUTUwud2lyZSgpYFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2ltYWdlLXByZXZpZXcnPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICDQlNC+0LHQsNCy0LvQtdC90L4gMSDQuNC30L7QsdGA0LDQttC10L3QuNC1OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3RodW1ibmFpbCc+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0nJHt0aGlzLnBvc3QuaW1hZ2UuZmlsZW5hbWV9Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhPlg8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICB9XG59IiwiY29uc3QgaHlwZXJIVE1MID0gcmVxdWlyZSgnaHlwZXJodG1sL2NqcycpLmRlZmF1bHQ7XG5jb25zdCBQb3N0RWRpdG9yID0gcmVxdWlyZSgnLi9wb3N0RWRpdG9yJyk7XG5cbi8vIGxldCBsYXp5TG9hZCA9IG5ldyBMYXp5TG9hZCgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFBvc3RzIGV4dGVuZHMgaHlwZXJIVE1MLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHRtbGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NvbnRhaW5lci1mbHVpZCBjb250YWluZXItcG9zdHMnPlxuICAgICAgICAgICAgICAgICR7IHRoaXMuc3RhdGUucG9zdHMucmVzdWx0cy5tYXAoIHBvc3QgPT4gbmV3IFBvc3QocG9zdCkgKSB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgICB9XG59XG5cbmNsYXNzIFBvc3QgZXh0ZW5kcyBoeXBlckhUTUwuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcG9zdCA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGxldCBhdXRob3IgPSB0aGlzLnN0YXRlLmF1dGhvcjtcbiAgICAgICAgbGV0IGNvbW1lbnRzID0gdGhpcy5zdGF0ZS5jb21tZW50cztcblxuICAgICAgICByZXR1cm4gdGhpcy5odG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nY2FyZC1wb3N0Jz5cbiAgICAgICAgICAgICAgICAke25ldyBDb250ZW50SGVhZGVyKGF1dGhvciwgcG9zdC5wdWJsaXNoZWREYXRlKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdyb3cnPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb2wtc20tOCBjb2wtc20tb2Zmc2V0LTInPlxuICAgICAgICAgICAgICAgICAgICAgICAgJHtuZXcgUG9zdENvbnRlbnQocG9zdCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAke25ldyBDb21tZW50QmxvY2soY29tbWVudHMsIHBvc3QuaWQpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYFxuICAgIH1cbn1cblxuY2xhc3MgUG9zdENvbnRlbnQgZXh0ZW5kcyBoeXBlckhUTUwuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcihwb3N0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucG9zdCA9IHBvc3Q7XG4gICAgICAgIHRoaXMuc2hvd0FsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzRWRpdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIGRlbGV0ZVBvc3QoKSB7XG4gICAgICAgIGxldCBwb3N0SWQgPSB0aGlzLnBvc3QuaWQ7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnL2FwaS9wb3N0LycgKyBwb3N0SWQgKyAnL3JlbW92ZScsIHRydWUpO1xuICAgICAgICB4aHIuc2VuZCgpO1xuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IFhNTEh0dHBSZXF1ZXN0LkRPTkUpIHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVkaXRDb250ZW50KCkge1xuICAgICAgICB0aGlzLmlzRWRpdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBjYW5jZWxFZGl0aW9uKCkge1xuICAgICAgICB0aGlzLmlzRWRpdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgc2F2ZUVkaXRpb24oY29udGVudCkge1xuICAgICAgICBjb250ZW50ID0gY29udGVudC5yZW5kZXIoKS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLnZhbHVlO1xuICAgICAgICBsZXQgcG9zdElkID0gdGhpcy5wb3N0LmlkO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB4aHIub3BlbignR0VUJywgJy9hcGkvcG9zdC8nICsgcG9zdElkICsgJy91cGRhdGU/Y29udGVudD0nICsgY29udGVudCwgdHJ1ZSk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgIHRoYXQucG9zdC5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgICAgICAgICB0aGF0LnNob3dBbGwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoYXQuaXNFZGl0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGF0LnJlbmRlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2hvd01vcmUoKSB7XG4gICAgICAgIHRoaXMuc2hvd0FsbCA9IHRydWU7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCl7XG4gICAgICAgIGxldCBjb250ZW50O1xuICAgICAgICBpZiAodGhpcy5pc0VkaXRlZCkge1xuICAgICAgICAgICAgY29udGVudCA9IGh5cGVySFRNTC53aXJlKClgXG4gICAgICAgICAgICAgICAgJHtuZXcgUG9zdEVkaXRvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3Q6IHRoaXMucG9zdCwgXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogJycsIFxuICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aXRsZTogJ9Ch0L7RhdGA0LDQvdC40YLRjCcsIGNsYXNzOiAnYnRuIGJ0bi1wcmltYXJ5Jywgb25DbGljazogdGhpcy5zYXZlRWRpdGlvbn0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aXRsZTogJ9Ce0YLQvNC10L3QuNGC0YwnLCBjbGFzczogJ2J0bicsIG9uQ2xpY2s6IHRoaXMuY2FuY2VsRWRpdGlvbn0sXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCB0ZXh0O1xuICAgICAgICAgICAgaWYgKHRoaXMucG9zdC5jb250ZW50Lmxlbmd0aCA+IDEwMCAmJiAhdGhpcy5zaG93QWxsKSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IGh5cGVySFRNTC53aXJlKClgXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J2NhcmQtcG9zdC10ZXh0IGNvbnRlbnQtZXh0ZW5kYWJsZScgZGF0YS1jYWxsPXNob3dNb3JlIG9uY2xpY2s9JHt0aGlzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICR7dGhpcy5wb3N0LmNvbnRlbnQuc3Vic3RyKDAsIDEwMCl9Li4uXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YT7Qn9C+0LrQsNC30LDRgtGMINC/0L7Qu9C90L7RgdGC0YzRjjwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGV4dCA9IGh5cGVySFRNTC53aXJlKClgPGRpdiBjbGFzcz0nY2FyZC1wb3N0LXRleHQnPiR7dGhpcy5wb3N0LmNvbnRlbnR9PC9kaXY+YFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGVudCA9IGh5cGVySFRNTC53aXJlKClgXG4gICAgICAgICAgICAgICAgJHt0ZXh0fVxuICAgICAgICAgICAgICAgICR7KHRoaXMucG9zdC5pbWFnZS5maWxlbmFtZSlcbiAgICAgICAgICAgICAgICAgICAgPyBoeXBlckhUTUwud2lyZSgpYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBkcmFnZ2FibGU9J2ZhbHNlJyBjbGFzcz0naW1nLXBvc3QnIGFsdD0n0JjQt9C+0LHRgNCw0LbQtdC90LjQtScgc3JjPSckeycvJyArIHRoaXMucG9zdC5pbWFnZS5maWxlbmFtZX0nPlxuICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgIDogJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHsoX0xPQ0FMUy5yZWdpc3RlcmVkICYmIHRoaXMucG9zdC5hdXRob3IuX2lkID09IF9MT0NBTFMudXNlci5faWQpXG4gICAgICAgICAgICAgICAgICAgID8gbmV3IERyb3Bkb3duKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAn0YDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YwnLCBjbGlja0hhbmRsZXI6IHRoaXMuZWRpdENvbnRlbnQsIHRoYXQ6IHRoaXN9LCBcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAn0YPQtNCw0LvQuNGC0YwnLCBjbGlja0hhbmRsZXI6IHRoaXMuZGVsZXRlUG9zdCwgdGhhdDogdGhpc31cbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nY2FyZC1wb3N0LWNvbnRlbnQnPiR7Y29udGVudH08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9J3JlYWN0aW9uJz5cbiAgICAgICAgICAgICAgICAke25ldyBMaWtlKHRoaXMucG9zdCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH1cbn1cblxuY2xhc3MgTGlrZSBleHRlbmRzIGh5cGVySFRNTC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHBvc3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0ZS5wb3N0SWQgPSBwb3N0LmlkO1xuICAgICAgICB0aGlzLnN0YXRlLnBvc3RBdXRob3IgPSBwb3N0LmF1dGhvci5faWQ7XG4gICAgICAgIHRoaXMuc3RhdGUubGlrZXNDb3VudCA9IChwb3N0Lmxpa2VzKSA/IHBvc3QubGlrZXMubGVuZ3RoIDogMDtcbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIgPSB0aGlzLmNsaWNrSGFuZGxlci5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGNsaWNrSGFuZGxlcihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKCFfTE9DQUxTLnJlZ2lzdGVyZWQpIHJldHVybjtcbiAgICAgICAgaWYgKF9MT0NBTFMudXNlci5faWQgPT0gdGhpcy5zdGF0ZS5wb3N0QXV0aG9yKSByZXR1cm47XG4gICAgICAgIGxldCBxID0gYC9hcGkvbGlrZS9wb3N0LyR7dGhpcy5zdGF0ZS5wb3N0SWR9YDtcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIFxuICAgICAgICB4aHIub3BlbignR0VUJywgcSwgdHJ1ZSk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgIGxldCByZXMgPSBKU09OLnBhcnNlKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAocmVzLmVycm9yKSByZXR1cm47XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdGhhdC5zdGF0ZS5saWtlc0NvdW50ID0gcmVzLmxpa2VzQ291bnQ7XG4gICAgICAgICAgICAgICAgdGhhdC5yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGltYWdlID0gKHRoaXMuc3RhdGUubGlrZXNDb3VudCA9PSAwKSA/ICdodHRwczovL3R3ZW1vamkubWF4Y2RuLmNvbS8yLzcyeDcyLzFmNDliLnBuZycgOiAnaHR0cHM6Ly90d2Vtb2ppLm1heGNkbi5jb20vMTZ4MTYvMjc2NC5wbmcnO1xuICAgICAgICBsZXQgaW1hZ2VBbHQgPSAodGhpcy5zdGF0ZS5saWtlc0NvdW50ID09IDApID8gJ+KZoScgOiAn4p2kJztcbiAgICAgICAgbGV0IGNsTmFtZSA9ICdkaXNhYmxlZCc7XG4gICAgICAgIGlmIChfTE9DQUxTLnJlZ2lzdGVyZWQpIHtcbiAgICAgICAgICAgIGlmIChfTE9DQUxTLnVzZXIuX2lkICE9IHRoaXMuc3RhdGUucG9zdEF1dGhvcikgY2xOYW1lID0gJ2VuYWJsZWQnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxgXG4gICAgICAgICAgICA8YSBvbmNsaWNrPScke3RoaXMuY2xpY2tIYW5kbGVyfScgY2xhc3M9JyR7Y2xOYW1lfSc+XG4gICAgICAgICAgICAgICAgPGltZyBkcmFnZ2FibGU9J2ZhbHNlJyBjbGFzcz0nZW1vamknIGFsdD0ke2ltYWdlQWx0fSBzcmM9JHtpbWFnZX0+PHNwYW4gY2xhc3M9J2Vtb2ppLWNvdW50Jz4ke3RoaXMuc3RhdGUubGlrZXNDb3VudH08L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgIGBcbiAgICB9XG59XG5cbmNsYXNzIENvbW1lbnRCbG9jayBleHRlbmRzIGh5cGVySFRNTC5Db21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKGNvbW1lbnRzLCBwb3N0SWQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jb21tZW50c01heExlbmd0aCA9IDM7XG4gICAgICAgIHRoaXMuc2hvd0FsbCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbW1lbnRzID0gY29tbWVudHMgfHwgW107XG4gICAgICAgIHRoaXMucG9zdElkID0gcG9zdElkO1xuICAgICAgICB0aGlzLmFkZENvbW1lbnQgPSB0aGlzLmFkZENvbW1lbnQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBhZGRDb21tZW50KGNvbnRlbnQpIHtcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQucmVuZGVyKCkucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKS52YWx1ZTtcbiAgICAgICAgbGV0IHEgPSAnL2FwaS9jb21tZW50L2NyZWF0ZT8nO1xuICAgICAgICAgICAgcSArPSAnY29udGVudD0nICsgY29udGVudDtcbiAgICAgICAgICAgIHEgKz0gJyZwb3N0PScgKyB0aGlzLnBvc3RJZDtcbiAgICAgICAgXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB4aHIub3BlbignR0VUJywgcSwgdHJ1ZSk7XG4gICAgICAgIHhoci5zZW5kKCk7XG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gWE1MSHR0cFJlcXVlc3QuRE9ORSkge1xuICAgICAgICAgICAgICAgIGxldCBuZXdDb21tZW50ID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgdGhhdC5jb21tZW50cy51bnNoaWZ0KG5ld0NvbW1lbnQuY29tbWVudCk7XG4gICAgICAgICAgICAgICAgdGhhdC5yZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3dNb3JlKCkge1xuICAgICAgICB0aGlzLnNob3dBbGwgPSB0cnVlO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbW1lbnRzLmxlbmd0aCAmJiAhX0xPQ0FMUy5yZWdpc3RlcmVkKSByZXR1cm4gdGhpcy5odG1sYDxkaXY+PC9kaXY+YDtcbiAgICAgICAgbGV0IGNvbnRlbnQ7XG4gICAgICAgIGxldCBjb21tZW50cztcbiAgICAgICAgaWYgKHRoaXMuY29tbWVudHMubGVuZ3RoID49IHRoaXMuY29tbWVudHNNYXhMZW5ndGggJiYgIXRoaXMuc2hvd0FsbCkge1xuICAgICAgICAgICAgY29tbWVudHMgPSBoeXBlckhUTUwud2lyZSgpYFxuICAgICAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmNvbW1lbnRzLm1hcCgoY29tbWVudCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCB0aGlzLmNvbW1lbnRzTWF4TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGh5cGVySFRNTC53aXJlKClgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7bmV3IENvbnRlbnRIZWFkZXIoY29tbWVudC5hdXRob3IsIGNvbW1lbnQucHVibGlzaGVkRGF0ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb21tZW50LWNvbnRlbnQgY29sLXhzLW9mZnNldC0zIGNvbC1zbS1vZmZzZXQtMic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtjb21tZW50LmNvbnRlbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBoeXBlckhUTUwud2lyZSgpYDxkaXY+PC9kaXY+YFxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgZGF0YS1jYWxsPXNob3dNb3JlIG9uY2xpY2s9JHt0aGlzfT7Qn9C+0LrQsNC30LDRgtGMINCy0YHQtSDQutC+0LzQvNC10L3RgtCw0YDQuNC4PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb21tZW50cyA9IGh5cGVySFRNTC53aXJlKClgXG4gICAgICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgICAgICAke3RoaXMuY29tbWVudHMubWFwKGNvbW1lbnQgPT4gaHlwZXJIVE1MLndpcmUoY29tbWVudClgXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtuZXcgQ29udGVudEhlYWRlcihjb21tZW50LmF1dGhvciwgY29tbWVudC5wdWJsaXNoZWREYXRlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjb21tZW50LWNvbnRlbnQgY29sLXhzLW9mZnNldC0zIGNvbC1zbS1vZmZzZXQtMic+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Y29tbWVudC5jb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgYCl9XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIGBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5odG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29tbWVudHMnPlxuICAgICAgICAgICAgICAgICR7KF9MT0NBTFMucmVnaXN0ZXJlZClcbiAgICAgICAgICAgICAgICAgICAgPyBoeXBlckhUTUwud2lyZSgpYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYWRkLW5ldy1jb21tZW50Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke25ldyBDb21tZW50RWRpdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQ6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvRm9jdXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudDogJycsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dG9uczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aXRsZTogJ9Ca0L7QvNC80LXQvdGC0LjRgNC+0LLQsNGC0YwnLCBjbGFzczogJ2J0biBidG4tbGluaycsIG9uQ2xpY2s6IHRoaXMuYWRkQ29tbWVudH0sIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICR7Y29tbWVudHN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH1cbn1cblxuY29uc3QgUFVCX0RBVEVfT1BUUyA9IHtcbiAgICAvLyBlcmE6ICdsb25nJyxcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgbW9udGg6ICdsb25nJyxcbiAgICBkYXk6ICdudW1lcmljJyxcbiAgICB3ZWVrZGF5OiAnbG9uZycsXG4gICAgdGltZXpvbmU6ICdVVEMnLFxuICAgIGhvdXI6ICdudW1lcmljJyxcbiAgICBtaW51dGU6ICdudW1lcmljJyxcbiAgICAvLyBzZWNvbmQ6ICdudW1lcmljJ1xufVxuXG5jbGFzcyBDb250ZW50SGVhZGVyIGV4dGVuZHMgaHlwZXJIVE1MLkNvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IoYXV0aG9yLCBwdWJEYXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYXV0aG9yID0gYXV0aG9yO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5wdWJEYXRlID0gJyc7XG4gICAgICAgIGlmIChwdWJEYXRlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5wdWJEYXRlID0gbmV3IERhdGUocHViRGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnB1YkRhdGUgPSB0aGlzLnB1YkRhdGUudG9Mb2NhbGVTdHJpbmcoJ3J1JywgUFVCX0RBVEVfT1BUUyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhdXRob3JzUGFnZSA9ICcvYXV0aG9yLycgKyB0aGlzLmF1dGhvci5zbHVnO1xuICAgICAgICBsZXQgYXV0aG9yUGhvdG8gPSB0aGlzLmF1dGhvci5hdXRob3JQaG90bztcbiAgICAgICAgbGV0IG5hbWUgPSBgJHt0aGlzLmF1dGhvci5hdXRob3JOYW1lLmxhc3R9ICR7dGhpcy5hdXRob3IuYXV0aG9yTmFtZS5maXJzdH1gO1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz0ncm93Jz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLXhzLTMgY29sLXNtLTInPlxuICAgICAgICAgICAgICAgICAgICAgICAgPCEtLWF1dGhvcidzIHBob3RvIC0tPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj0nJHthdXRob3JzUGFnZX0nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9J2ltZy1jaXJjbGUgaW1nLXVzZXInIHNyYz0nJHsoYXV0aG9yUGhvdG8pID8gYC8ke2F1dGhvclBob3RvLmZpbGVuYW1lfWAgOiAnL2ltYWdlcy9hdmF0YXItZGVmYXVsdC5wbmcnfScgYWx0PScke25hbWV9Jz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS1hdXRob3IncyBuYW1lIC0tPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY29sLXhzLTkgY29sLXNtLTEwIGluZm8tdXNlcic+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9JyR7YXV0aG9yc1BhZ2V9Jz4ke25hbWV9PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aT4ke3RoaXMucHViRGF0ZX08L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgXG4gICAgfVxufVxuY2xhc3MgRHJvcGRvd24gZXh0ZW5kcyBoeXBlckhUTUwuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz0ncG9zdC10b29sLWJhciBkcm9wZG93bic+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0nYnRuIGJ0bi1kZWZhdWx0IGRyb3Bkb3duLXRvZ2dsZScgdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nZHJvcGRvd24nIGFyaWEtaGFzcG9wdXA9J3RydWUnLCBhcmlhLWV4cGFuZGVkPSdmYWxzZSc+Li4uPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9J2NhcmV0Jz48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHVsIGNsYXNzPSdkcm9wZG93bi1tZW51Jz5cbiAgICAgICAgICAgICAgICAgICAgJHsgdGhpcy5wYXJhbXMubWFwKCBwID0+IG5ldyBEcm9wZG93bkJ1dHRvbihwLnRleHQsIHAuY2xpY2tIYW5kbGVyLCBwLnRoYXQpICkgfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYFxuICAgIH1cbn1cblxuY2xhc3MgRHJvcGRvd25CdXR0b24gZXh0ZW5kcyBoeXBlckhUTUwuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBjbGlja0hhbmRsZXIsIHRoYXQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICAgICAgdGhpcy5jbGlja0hhbmRsZXIgPSBjbGlja0hhbmRsZXIuYmluZCh0aGF0KTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0bWxgXG4gICAgICAgICAgICA8bGk+PGEgb25jbGljaz0nJHt0aGlzLmNsaWNrSGFuZGxlcn0nPiR7dGhpcy50ZXh0fTwvYT48L2xpPlxuICAgICAgICBgXG4gICAgfVxufVxuXG5sZXQgZWRpdG9ySW5zdGFuY2VDb3VudGVyID0gMDtcbmNsYXNzIENvbW1lbnRFZGl0b3IgZXh0ZW5kcyBoeXBlckhUTUwuQ29tcG9uZW50IHtcbiAgICBcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gIHt9IHBhcmFtc1xuICAgICAqIEBwYXJhbS50aGF0IHt9IFxuICAgICAqIEBwYXJhbS5hdXRvRm9jdXMgYm9vbCBmb2N1cyBvbiB0ZXh0YXJlYSBhZnRlciByZW5kZXJcbiAgICAgKiBAcGFyYW0uY29udGVudCBzdHJpbmdcbiAgICAgKiBAcGFyYW0uY2xhc3Mgc3RyaW5nXG4gICAgICogQHBhcmFtLmJ1dHRvbnMgW10gXG4gICAgICogQHBhcmFtLmJ1dHRvbnNbaV0ge31cbiAgICAgKiBAcGFyYW0uYnV0dG9uc1tpXS50aXRsZSBzdHJpbmdcbiAgICAgKiBAcGFyYW0uYnV0dG9uc1tpXS5jbGFzcyBzdHJpbmdcbiAgICAgKiBAcGFyYW0uYnV0dG9uc1tpXS5vbkNsaWNrIGZ1bmN0aW9uXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGVkaXRvckluc3RhbmNlQ291bnRlcisrO1xuICAgICAgICBsZXQgdGhhdCA9IHBhcmFtcy50aGF0O1xuICAgICAgICB0aGlzLmF1dG9Gb2N1cyA9IHBhcmFtcy5hdXRvRm9jdXMgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMudGV4dEFyZWFJZCA9IGBlZGl0b3ItJHtlZGl0b3JJbnN0YW5jZUNvdW50ZXJ9YDtcbiAgICAgICAgdGhpcy5jb250ZW50ID0gcGFyYW1zLmNvbnRlbnQgfHwgJyc7XG4gICAgICAgIHRoaXMuY2xhc3MgPSBgZWRpdG9yICR7cGFyYW1zLmNsYXNzIHx8ICcnfWA7XG4gICAgICAgIHRoaXMuYnV0dG9ucyA9IHBhcmFtcy5idXR0b25zO1xuICAgICAgICB0aGlzLmJ1dHRvbnMuZm9yRWFjaCgoYikgPT4ge1xuICAgICAgICAgICAgYi5vbkNsaWNrID0gYi5vbkNsaWNrLmJpbmQodGhhdCwgdGhpcyk7XG4gICAgICAgICAgICBiLmNsYXNzID0gYi5jbGFzcyB8fCAnYnRuJztcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbmNvbm5lY3RlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b0ZvY3VzKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLnRleHRBcmVhSWQpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odG1sYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz0nJHt0aGlzLmNsYXNzfScgb25jb25uZWN0ZWQ9JHt0aGlzfSA+XG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPSdmb3JtLWNvbnRyb2wnIGlkPScke3RoaXMudGV4dEFyZWFJZH0nIHZhbHVlPSR7dGhpcy5jb250ZW50fT48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICR7dGhpcy5idXR0b25zLm1hcCgoYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaHlwZXJIVE1MLndpcmUoKWBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9JyR7Yi5jbGFzc30nIG9uY2xpY2s9JHtiLm9uQ2xpY2t9PiR7Yi50aXRsZX08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgYFxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGBcbiAgICB9XG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1TEE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBSEE7QUFJQTtBQUNBO0FBTkE7QUFBQTtBQUFBO0FBT0E7QUFDQTtBQUFBO0FBYUE7QUFBQTtBQWFBO0FBbENBO0FBQ0E7QUFEQTtBQUFBO0FBd0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQVlBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQWhCQTtBQWlCQTtBQUNBO0FBaENBO0FBQUE7QUFBQTtBQWtDQTtBQUNBO0FBbkNBO0FBQUE7QUFBQTtBQXNDQTtBQUlBO0FBR0E7QUFzQkE7QUFuRUE7QUFDQTtBQURBO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSEE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUZBO0FBR0E7QUFDQTtBQUxBO0FBQUE7QUFBQTtBQU9BO0FBRUE7QUFBQTtBQUdBO0FBWkE7QUFDQTtBQURBO0FBQUE7QUFDQTtBQWNBOzs7OztBQUNBO0FBQUE7QUFDQTtBQURBO0FBQ0E7QUFBQTtBQUNBO0FBRkE7QUFHQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBV0E7Ozs7QUF0QkE7QUFDQTtBQXdCQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQVBBO0FBWUE7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQU9BO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFVQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBS0E7QUFDQTtBQUFBO0FBTUE7Ozs7QUE1R0E7QUFDQTtBQThHQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBTUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBS0E7Ozs7QUExQ0E7QUFDQTtBQTRDQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTkE7QUFPQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBUUE7QUFFQTtBQU1BO0FBRUE7QUFFQTtBQUFBO0FBVUE7QUFDQTtBQUFBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBTkE7QUFpQkE7Ozs7QUFoR0E7QUFDQTtBQWtHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVRBO0FBQ0E7QUFXQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFTQTtBQUNBOzs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBbUJBOzs7O0FBbkNBO0FBQ0E7QUFvQ0E7Ozs7O0FBQ0E7QUFBQTtBQUNBO0FBREE7QUFDQTtBQUFBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7OztBQUNBO0FBQ0E7QUFLQTtBQUFBO0FBSUE7Ozs7QUFoQkE7QUFDQTtBQWtCQTs7Ozs7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBSEE7QUFJQTtBQUNBOzs7QUFDQTtBQUNBO0FBR0E7Ozs7QUFYQTtBQUNBO0FBYUE7QUFDQTtBQUFBOzs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUFBO0FBQ0E7QUFEQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQWJBO0FBYUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTtBQUNBO0FBSUE7QUFHQTtBQUdBOzs7O0FBNUNBOzs7O0EiLCJzb3VyY2VSb290IjoiIn0=