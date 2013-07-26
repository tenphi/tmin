// tmin.js - easy DOM content generator
'use strict';

(function(w, $) {

  // properly-cased attribute names for IE setAttribute support
  var attributeMap = {
    'acceptcharset'     : 'acceptCharset',
    'accesskey'         : 'accessKey',
    'allowtransparency' : 'allowTransparency',
    'bgcolor'           : 'bgColor',
    'cellpadding'       : 'cellPadding',
    'cellspacing'       : 'cellSpacing',
    'class'             : 'className',
    'classname'         : 'className',
    'colspan'           : 'colSpan',
    'csstext'           : 'style',
    'defaultchecked'    : 'defaultChecked',
    'defaultselected'   : 'defaultSelected',
    'defaultvalue'      : 'defaultValue',
    'for'               : 'htmlFor',
    'frameborder'       : 'frameBorder',
    'hspace'            : 'hSpace',
    'htmlfor'           : 'htmlFor',
    'longdesc'          : 'longDesc',
    'maxlength'         : 'maxLength',
    'marginwidth'       : 'marginWidth',
    'marginheight'      : 'marginHeight',
    'noresize'          : 'noResize',
    'noshade'           : 'noShade',
    'readonly'          : 'readOnly',
    'rowspan'           : 'rowSpan',
    'tabindex'          : 'tabIndex',
    'valign'            : 'vAlign',
    'vspace'            : 'vSpace'
  };

  // html 4 tags
  var deprecatedTags = ['acronym', 'applet', 'basefont', 'big', 'center', 'dir',
    'font', 'frame', 'frameset', 'noframes', 'strike', 'tt', 'u', 'xmp'];

  // html 5 tags
  var tags = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b',
    'base', 'bdo', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption',
    'cite', 'code', 'col', 'colgroup', 'command', 'datalist', 'dd', 'del',
    'details', 'dfn', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset',
    'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5',
    'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img',
    'input', 'ins', 'keygen', 'kbd', 'label', 'legend', 'li', 'link', 'map',
    'mark', 'menu', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol',
    'optgroup', 'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp',
    'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small',
    'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table',
    'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr',
    'ul', 'var', 'video', 'wbr'].concat(deprecatedTags);

  // map for string escaping
  var escapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;'
  };

  // templating whole fragment. returns DocumentFragment Object.
  var t = w.t = function templateFragment () {
    var args = [].slice.call(arguments, 0);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < args.length; i++) {
      templateArg(fragment, templateArg(fragment, args[i]));
    }
    return fragment;
  };

  // method for string escaping
  t._ = function escape (text) {
    return String(text).replace(/[&<>"'\/]/g, function (s) {
      return escapeMap[s];
    });
  };

  // jQuery wrappers
  if ($) {
    var $t = w.$t = function jqueryCollection () {
      var args = [].slice.call(arguments, 0);
      var container = $(document.createElement('div'));
      for (var i = 0; i < args.length; i++) {
        templateArg(container.get(0), args[i]);
      }
      return container.children().detach();
    };

    $t._ = t._;
    $t.t = t;
    t.$t = $t;
  }

  function templateArg (node, arg) {
    var ret = '', attr;

    // if arg is undefined or null
    if (arg == null) {
      return '';
    }

    // if arg is DocumentFragment
    else if (arg instanceof DocumentFragment || arg.nodeType === 1) {
      ret = arg;
    }

    // if arg is function
    else if (typeof(arg) === 'function') {
      ret = arg();
    }

    // if arg is instance of jQuery
    else if ($ && arg instanceof $) {
      ret = arg.get(0);
    }

    // if arg is array
    else if (Array.isArray(arg)) {
      ret = t.apply(null, arg);
    }

    // if arg is string or number
    else if (typeof(arg) === 'string' || typeof(arg) === 'number') {
      if (node.lastChild && node.lastChild.nodeType == Node.TEXT_NODE) {
        node.lastChild.nodeValue += String(arg);
      } else {
        node.appendChild(document.createTextNode(arg));
      }
      return document.createTextNode(arg);
    }

    // if arg is instance of View with jQuery $el
    else if (arg.$el) {
      return arg.$el.appendTo(node);
    }

    // if arg is instance of some View
    else if (arg.el) {
      ret = arg.el;
    }

    // if attribute object
    else if (node && typeof(arg) === 'object') {

      for (attr in arg) {
        var value = arg[attr];
        if (!attr || value == null || !arg.hasOwnProperty(attr)) {
          continue;
        }

        attr = attr.toLowerCase();
        attr = attributeMap[attr] || attr;

        if (attr === 'className' && Array.isArray(value)) {
          value = value.join(' ');
        }

        if (attr === 'data' && typeof value === 'object') {
          for (var name in value) {
            node.setAttribute('data-' + name.replace(/[A-Z]/g, function(s) {
              return '-' + s.toLowerCase();
            }), value[name]);
          }
          continue;
        }

        if (attr === 'style') {
          for (var name in value) {
            var style = value[name];
            if (style != null) {
              node.style[name] = style;
            }
          }
        }

        else if (attr === 'className' || attr === 'htmlFor') {
          node[attr] = value;
        }

        else {
          node.setAttribute(attr, value);
        }
      }

    }

    // complete appending
    if (node && ret) {
      if (ret.parentNode) {
        ret.parentNode.removeChild(ret);
      }
      node.appendChild(ret);
    }

    return ret;
  }

  // method for adding new tags
  t.addTag = function addTag (tag) {
    t[tag] = function () {
      var node = document.createElement(tag);
      [].slice.call(arguments, 0).forEach(function (arg) {
        templateArg(node, arg);
      });
      return node;
    };
    if ($) {
      $t[tag] = function () {
        return $(t[tag].apply(null, arguments));
      };
    }
  };

  // create tag handlers
  tags.forEach(function(tag) {
    t.addTag(tag);
  });

})(window, window.jQuery);
