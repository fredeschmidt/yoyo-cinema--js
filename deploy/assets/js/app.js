/*
 Copyright (C) Federico Zivolo 2019
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */
(function(e, t) {
    'object' == typeof exports && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t()
})(this, function() {
    'use strict';

    function e(e) {
        return e && '[object Function]' === {}.toString.call(e)
    }

    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = e.ownerDocument.defaultView,
            n = o.getComputedStyle(e, null);
        return t ? n[t] : n
    }

    function o(e) {
        return 'HTML' === e.nodeName ? e : e.parentNode || e.host
    }

    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case 'HTML':
            case 'BODY':
                return e.ownerDocument.body;
            case '#document':
                return e.body;
        }
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e))
    }

    function r(e) {
        return 11 === e ? pe : 10 === e ? se : pe || se
    }

    function p(e) {
        if (!e) return document.documentElement;
        for (var o = r(10) ? document.body : null, n = e.offsetParent || null; n === o && e.nextElementSibling;) n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TH', 'TD', 'TABLE'].indexOf(n.nodeName) && 'static' === t(n, 'position') ? p(n) : n : e ? e.ownerDocument.documentElement : document.documentElement
    }

    function s(e) {
        var t = e.nodeName;
        return 'BODY' !== t && ('HTML' === t || p(e.firstElementChild) === e)
    }

    function d(e) {
        return null === e.parentNode ? e : d(e.parentNode)
    }

    function a(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = o ? e : t,
            i = o ? t : e,
            r = document.createRange();
        r.setStart(n, 0), r.setEnd(i, 0);
        var l = r.commonAncestorContainer;
        if (e !== l && t !== l || n.contains(i)) return s(l) ? l : p(l);
        var f = d(e);
        return f.host ? a(f.host, t) : a(e, d(t).host)
    }

    function l(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
            o = 'top' === t ? 'scrollTop' : 'scrollLeft',
            n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) {
            var i = e.ownerDocument.documentElement,
                r = e.ownerDocument.scrollingElement || i;
            return r[o]
        }
        return e[o]
    }

    function f(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            n = l(t, 'top'),
            i = l(t, 'left'),
            r = o ? -1 : 1;
        return e.top += n * r, e.bottom += n * r, e.left += i * r, e.right += i * r, e
    }

    function m(e, t) {
        var o = 'x' === t ? 'Left' : 'Top',
            n = 'Left' == o ? 'Right' : 'Bottom';
        return parseFloat(e['border' + o + 'Width'], 10) + parseFloat(e['border' + n + 'Width'], 10)
    }

    function h(e, t, o, n) {
        return ee(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], r(10) ? parseInt(o['offset' + e]) + parseInt(n['margin' + ('Height' === e ? 'Top' : 'Left')]) + parseInt(n['margin' + ('Height' === e ? 'Bottom' : 'Right')]) : 0)
    }

    function c(e) {
        var t = e.body,
            o = e.documentElement,
            n = r(10) && getComputedStyle(o);
        return {
            height: h('Height', t, o, n),
            width: h('Width', t, o, n)
        }
    }

    function g(e) {
        return fe({}, e, {
            right: e.left + e.width,
            bottom: e.top + e.height
        })
    }

    function u(e) {
        var o = {};
        try {
            if (r(10)) {
                o = e.getBoundingClientRect();
                var n = l(e, 'top'),
                    i = l(e, 'left');
                o.top += n, o.left += i, o.bottom += n, o.right += i
            } else o = e.getBoundingClientRect()
        } catch (t) {}
        var p = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top
            },
            s = 'HTML' === e.nodeName ? c(e.ownerDocument) : {},
            d = s.width || e.clientWidth || p.right - p.left,
            a = s.height || e.clientHeight || p.bottom - p.top,
            f = e.offsetWidth - d,
            h = e.offsetHeight - a;
        if (f || h) {
            var u = t(e);
            f -= m(u, 'x'), h -= m(u, 'y'), p.width -= f, p.height -= h
        }
        return g(p)
    }

    function b(e, o) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            p = r(10),
            s = 'HTML' === o.nodeName,
            d = u(e),
            a = u(o),
            l = n(e),
            m = t(o),
            h = parseFloat(m.borderTopWidth, 10),
            c = parseFloat(m.borderLeftWidth, 10);
        i && s && (a.top = ee(a.top, 0), a.left = ee(a.left, 0));
        var b = g({
            top: d.top - a.top - h,
            left: d.left - a.left - c,
            width: d.width,
            height: d.height
        });
        if (b.marginTop = 0, b.marginLeft = 0, !p && s) {
            var w = parseFloat(m.marginTop, 10),
                y = parseFloat(m.marginLeft, 10);
            b.top -= h - w, b.bottom -= h - w, b.left -= c - y, b.right -= c - y, b.marginTop = w, b.marginLeft = y
        }
        return (p && !i ? o.contains(l) : o === l && 'BODY' !== l.nodeName) && (b = f(b, o)), b
    }

    function w(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = e.ownerDocument.documentElement,
            n = b(e, o),
            i = ee(o.clientWidth, window.innerWidth || 0),
            r = ee(o.clientHeight, window.innerHeight || 0),
            p = t ? 0 : l(o),
            s = t ? 0 : l(o, 'left'),
            d = {
                top: p - n.top + n.marginTop,
                left: s - n.left + n.marginLeft,
                width: i,
                height: r
            };
        return g(d)
    }

    function y(e) {
        var n = e.nodeName;
        if ('BODY' === n || 'HTML' === n) return !1;
        if ('fixed' === t(e, 'position')) return !0;
        var i = o(e);
        return !!i && y(i)
    }

    function E(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var o = e.parentElement; o && 'none' === t(o, 'transform');) o = o.parentElement;
        return o || document.documentElement
    }

    function v(e, t, i, r) {
        var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            s = {
                top: 0,
                left: 0
            },
            d = p ? E(e) : a(e, t);
        if ('viewport' === r) s = w(d, p);
        else {
            var l;
            'scrollParent' === r ? (l = n(o(t)), 'BODY' === l.nodeName && (l = e.ownerDocument.documentElement)) : 'window' === r ? l = e.ownerDocument.documentElement : l = r;
            var f = b(l, d, p);
            if ('HTML' === l.nodeName && !y(d)) {
                var m = c(e.ownerDocument),
                    h = m.height,
                    g = m.width;
                s.top += f.top - f.marginTop, s.bottom = h + f.top, s.left += f.left - f.marginLeft, s.right = g + f.left
            } else s = f
        }
        i = i || 0;
        var u = 'number' == typeof i;
        return s.left += u ? i : i.left || 0, s.top += u ? i : i.top || 0, s.right -= u ? i : i.right || 0, s.bottom -= u ? i : i.bottom || 0, s
    }

    function x(e) {
        var t = e.width,
            o = e.height;
        return t * o
    }

    function O(e, t, o, n, i) {
        var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf('auto')) return e;
        var p = v(o, n, r, i),
            s = {
                top: {
                    width: p.width,
                    height: t.top - p.top
                },
                right: {
                    width: p.right - t.right,
                    height: p.height
                },
                bottom: {
                    width: p.width,
                    height: p.bottom - t.bottom
                },
                left: {
                    width: t.left - p.left,
                    height: p.height
                }
            },
            d = Object.keys(s).map(function(e) {
                return fe({
                    key: e
                }, s[e], {
                    area: x(s[e])
                })
            }).sort(function(e, t) {
                return t.area - e.area
            }),
            a = d.filter(function(e) {
                var t = e.width,
                    n = e.height;
                return t >= o.clientWidth && n >= o.clientHeight
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split('-')[1];
        return l + (f ? '-' + f : '')
    }

    function L(e, t, o) {
        var n = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null,
            i = n ? E(t) : a(t, o);
        return b(o, i, n)
    }

    function S(e) {
        var t = e.ownerDocument.defaultView,
            o = t.getComputedStyle(e),
            n = parseFloat(o.marginTop || 0) + parseFloat(o.marginBottom || 0),
            i = parseFloat(o.marginLeft || 0) + parseFloat(o.marginRight || 0),
            r = {
                width: e.offsetWidth + i,
                height: e.offsetHeight + n
            };
        return r
    }

    function T(e) {
        var t = {
            left: 'right',
            right: 'left',
            bottom: 'top',
            top: 'bottom'
        };
        return e.replace(/left|right|bottom|top/g, function(e) {
            return t[e]
        })
    }

    function D(e, t, o) {
        o = o.split('-')[0];
        var n = S(e),
            i = {
                width: n.width,
                height: n.height
            },
            r = -1 !== ['right', 'left'].indexOf(o),
            p = r ? 'top' : 'left',
            s = r ? 'left' : 'top',
            d = r ? 'height' : 'width',
            a = r ? 'width' : 'height';
        return i[p] = t[p] + t[d] / 2 - n[d] / 2, i[s] = o === s ? t[s] - n[a] : t[T(s)], i
    }

    function C(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0]
    }

    function N(e, t, o) {
        if (Array.prototype.findIndex) return e.findIndex(function(e) {
            return e[t] === o
        });
        var n = C(e, function(e) {
            return e[t] === o
        });
        return e.indexOf(n)
    }

    function P(t, o, n) {
        var i = void 0 === n ? t : t.slice(0, N(t, 'name', n));
        return i.forEach(function(t) {
            t['function'] && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            var n = t['function'] || t.fn;
            t.enabled && e(n) && (o.offsets.popper = g(o.offsets.popper), o.offsets.reference = g(o.offsets.reference), o = n(o, t))
        }), o
    }

    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {}
            };
            e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = O(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = D(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute', e = P(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
        }
    }

    function W(e, t) {
        return e.some(function(e) {
            var o = e.name,
                n = e.enabled;
            return n && o === t
        })
    }

    function H(e) {
        for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length; n++) {
            var i = t[n],
                r = i ? '' + i + o : e;
            if ('undefined' != typeof document.body.style[r]) return r
        }
        return null
    }

    function B() {
        return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.position = '', this.popper.style.top = '', this.popper.style.left = '', this.popper.style.right = '', this.popper.style.bottom = '', this.popper.style.willChange = '', this.popper.style[H('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
    }

    function A(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window
    }

    function M(e, t, o, i) {
        var r = 'BODY' === e.nodeName,
            p = r ? e.ownerDocument.defaultView : e;
        p.addEventListener(t, o, {
            passive: !0
        }), r || M(n(p.parentNode), t, o, i), i.push(p)
    }

    function F(e, t, o, i) {
        o.updateBound = i, A(e).addEventListener('resize', o.updateBound, {
            passive: !0
        });
        var r = n(e);
        return M(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o
    }

    function I() {
        this.state.eventsEnabled || (this.state = F(this.reference, this.options, this.state, this.scheduleUpdate))
    }

    function R(e, t) {
        return A(e).removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function(e) {
            e.removeEventListener('scroll', t.updateBound)
        }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
    }

    function U() {
        this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = R(this.reference, this.state))
    }

    function Y(e) {
        return '' !== e && !isNaN(parseFloat(e)) && isFinite(e)
    }

    function j(e, t) {
        Object.keys(t).forEach(function(o) {
            var n = ''; - 1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && Y(t[o]) && (n = 'px'), e.style[o] = t[o] + n
        })
    }

    function V(e, t) {
        Object.keys(t).forEach(function(o) {
            var n = t[o];
            !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o])
        })
    }

    function q(e, t) {
        var o = e.offsets,
            n = o.popper,
            i = o.reference,
            r = $,
            p = function(e) {
                return e
            },
            s = r(i.width),
            d = r(n.width),
            a = -1 !== ['left', 'right'].indexOf(e.placement),
            l = -1 !== e.placement.indexOf('-'),
            f = t ? a || l || s % 2 == d % 2 ? r : Z : p,
            m = t ? r : p;
        return {
            left: f(1 == s % 2 && 1 == d % 2 && !l && t ? n.left - 1 : n.left),
            top: m(n.top),
            bottom: m(n.bottom),
            right: f(n.right)
        }
    }

    function K(e, t, o) {
        var n = C(e, function(e) {
                var o = e.name;
                return o === t
            }),
            i = !!n && e.some(function(e) {
                return e.name === o && e.enabled && e.order < n.order
            });
        if (!i) {
            var r = '`' + t + '`';
            console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!')
        }
        return i
    }

    function z(e) {
        return 'end' === e ? 'start' : 'start' === e ? 'end' : e
    }

    function G(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = ce.indexOf(e),
            n = ce.slice(o + 1).concat(ce.slice(0, o));
        return t ? n.reverse() : n
    }

    function _(e, t, o, n) {
        var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +i[1],
            p = i[2];
        if (!r) return e;
        if (0 === p.indexOf('%')) {
            var s;
            switch (p) {
                case '%p':
                    s = o;
                    break;
                case '%':
                case '%r':
                default:
                    s = n;
            }
            var d = g(s);
            return d[t] / 100 * r
        }
        if ('vh' === p || 'vw' === p) {
            var a;
            return a = 'vh' === p ? ee(document.documentElement.clientHeight, window.innerHeight || 0) : ee(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r
        }
        return r
    }

    function X(e, t, o, n) {
        var i = [0, 0],
            r = -1 !== ['right', 'left'].indexOf(n),
            p = e.split(/(\+|\-)/).map(function(e) {
                return e.trim()
            }),
            s = p.indexOf(C(p, function(e) {
                return -1 !== e.search(/,|\s/)
            }));
        p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        var d = /\s*,\s*|\s+/,
            a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];
        return a = a.map(function(e, n) {
            var i = (1 === n ? !r : r) ? 'height' : 'width',
                p = !1;
            return e.reduce(function(e, t) {
                return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t)
            }, []).map(function(e) {
                return _(e, i, t, o)
            })
        }), a.forEach(function(e, t) {
            e.forEach(function(o, n) {
                Y(o) && (i[t] += o * ('-' === e[n - 1] ? -1 : 1))
            })
        }), i
    }

    function J(e, t) {
        var o, n = t.offset,
            i = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = i.split('-')[0];
        return o = Y(+n) ? [+n, 0] : X(n, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e
    }
    for (var Q = Math.min, Z = Math.floor, $ = Math.round, ee = Math.max, te = 'undefined' != typeof window && 'undefined' != typeof document, oe = ['Edge', 'Trident', 'Firefox'], ne = 0, ie = 0; ie < oe.length; ie += 1)
        if (te && 0 <= navigator.userAgent.indexOf(oe[ie])) {
            ne = 1;
            break
        }
    var i = te && window.Promise,
        re = i ? function(e) {
            var t = !1;
            return function() {
                t || (t = !0, window.Promise.resolve().then(function() {
                    t = !1, e()
                }))
            }
        } : function(e) {
            var t = !1;
            return function() {
                t || (t = !0, setTimeout(function() {
                    t = !1, e()
                }, ne))
            }
        },
        pe = te && !!(window.MSInputMethodContext && document.documentMode),
        se = te && /MSIE 10/.test(navigator.userAgent),
        de = function(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function')
        },
        ae = function() {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++) o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
            }
            return function(t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t
            }
        }(),
        le = function(e, t, o) {
            return t in e ? Object.defineProperty(e, t, {
                value: o,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = o, e
        },
        fe = Object.assign || function(e) {
            for (var t, o = 1; o < arguments.length; o++)
                for (var n in t = arguments[o], t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            return e
        },
        me = te && /Firefox/i.test(navigator.userAgent),
        he = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
        ce = he.slice(3),
        ge = {
            FLIP: 'flip',
            CLOCKWISE: 'clockwise',
            COUNTERCLOCKWISE: 'counterclockwise'
        },
        ue = function() {
            function t(o, n) {
                var i = this,
                    r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                de(this, t), this.scheduleUpdate = function() {
                    return requestAnimationFrame(i.update)
                }, this.update = re(this.update.bind(this)), this.options = fe({}, t.Defaults, r), this.state = {
                    isDestroyed: !1,
                    isCreated: !1,
                    scrollParents: []
                }, this.reference = o && o.jquery ? o[0] : o, this.popper = n && n.jquery ? n[0] : n, this.options.modifiers = {}, Object.keys(fe({}, t.Defaults.modifiers, r.modifiers)).forEach(function(e) {
                    i.options.modifiers[e] = fe({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {})
                }), this.modifiers = Object.keys(this.options.modifiers).map(function(e) {
                    return fe({
                        name: e
                    }, i.options.modifiers[e])
                }).sort(function(e, t) {
                    return e.order - t.order
                }), this.modifiers.forEach(function(t) {
                    t.enabled && e(t.onLoad) && t.onLoad(i.reference, i.popper, i.options, t, i.state)
                }), this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(), this.state.eventsEnabled = p
            }
            return ae(t, [{
                key: 'update',
                value: function() {
                    return k.call(this)
                }
            }, {
                key: 'destroy',
                value: function() {
                    return B.call(this)
                }
            }, {
                key: 'enableEventListeners',
                value: function() {
                    return I.call(this)
                }
            }, {
                key: 'disableEventListeners',
                value: function() {
                    return U.call(this)
                }
            }]), t
        }();
    return ue.Utils = ('undefined' == typeof window ? global : window).PopperUtils, ue.placements = he, ue.Defaults = {
        placement: 'bottom',
        positionFixed: !1,
        eventsEnabled: !0,
        removeOnDestroy: !1,
        onCreate: function() {},
        onUpdate: function() {},
        modifiers: {
            shift: {
                order: 100,
                enabled: !0,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = t.split('-')[1];
                    if (n) {
                        var i = e.offsets,
                            r = i.reference,
                            p = i.popper,
                            s = -1 !== ['bottom', 'top'].indexOf(o),
                            d = s ? 'left' : 'top',
                            a = s ? 'width' : 'height',
                            l = {
                                start: le({}, d, r[d]),
                                end: le({}, d, r[d] + r[a] - p[a])
                            };
                        e.offsets.popper = fe({}, p, l[n])
                    }
                    return e
                }
            },
            offset: {
                order: 200,
                enabled: !0,
                fn: J,
                offset: 0
            },
            preventOverflow: {
                order: 300,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.boundariesElement || p(e.instance.popper);
                    e.instance.reference === o && (o = p(o));
                    var n = H('transform'),
                        i = e.instance.popper.style,
                        r = i.top,
                        s = i.left,
                        d = i[n];
                    i.top = '', i.left = '', i[n] = '';
                    var a = v(e.instance.popper, e.instance.reference, t.padding, o, e.positionFixed);
                    i.top = r, i.left = s, i[n] = d, t.boundaries = a;
                    var l = t.priority,
                        f = e.offsets.popper,
                        m = {
                            primary: function(e) {
                                var o = f[e];
                                return f[e] < a[e] && !t.escapeWithReference && (o = ee(f[e], a[e])), le({}, e, o)
                            },
                            secondary: function(e) {
                                var o = 'right' === e ? 'left' : 'top',
                                    n = f[o];
                                return f[e] > a[e] && !t.escapeWithReference && (n = Q(f[o], a[e] - ('right' === e ? f.width : f.height))), le({}, o, n)
                            }
                        };
                    return l.forEach(function(e) {
                        var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';
                        f = fe({}, f, m[t](e))
                    }), e.offsets.popper = f, e
                },
                priority: ['left', 'right', 'top', 'bottom'],
                padding: 5,
                boundariesElement: 'scrollParent'
            },
            keepTogether: {
                order: 400,
                enabled: !0,
                fn: function(e) {
                    var t = e.offsets,
                        o = t.popper,
                        n = t.reference,
                        i = e.placement.split('-')[0],
                        r = Z,
                        p = -1 !== ['top', 'bottom'].indexOf(i),
                        s = p ? 'right' : 'bottom',
                        d = p ? 'left' : 'top',
                        a = p ? 'width' : 'height';
                    return o[s] < r(n[d]) && (e.offsets.popper[d] = r(n[d]) - o[a]), o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])), e
                }
            },
            arrow: {
                order: 500,
                enabled: !0,
                fn: function(e, o) {
                    var n;
                    if (!K(e.instance.modifiers, 'arrow', 'keepTogether')) return e;
                    var i = o.element;
                    if ('string' == typeof i) {
                        if (i = e.instance.popper.querySelector(i), !i) return e;
                    } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;
                    var r = e.placement.split('-')[0],
                        p = e.offsets,
                        s = p.popper,
                        d = p.reference,
                        a = -1 !== ['left', 'right'].indexOf(r),
                        l = a ? 'height' : 'width',
                        f = a ? 'Top' : 'Left',
                        m = f.toLowerCase(),
                        h = a ? 'left' : 'top',
                        c = a ? 'bottom' : 'right',
                        u = S(i)[l];
                    d[c] - u < s[m] && (e.offsets.popper[m] -= s[m] - (d[c] - u)), d[m] + u > s[c] && (e.offsets.popper[m] += d[m] + u - s[c]), e.offsets.popper = g(e.offsets.popper);
                    var b = d[m] + d[l] / 2 - u / 2,
                        w = t(e.instance.popper),
                        y = parseFloat(w['margin' + f], 10),
                        E = parseFloat(w['border' + f + 'Width'], 10),
                        v = b - e.offsets.popper[m] - y - E;
                    return v = ee(Q(s[l] - u, v), 0), e.arrowElement = i, e.offsets.arrow = (n = {}, le(n, m, $(v)), le(n, h, ''), n), e
                },
                element: '[x-arrow]'
            },
            flip: {
                order: 600,
                enabled: !0,
                fn: function(e, t) {
                    if (W(e.instance.modifiers, 'inner')) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var o = v(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        n = e.placement.split('-')[0],
                        i = T(n),
                        r = e.placement.split('-')[1] || '',
                        p = [];
                    switch (t.behavior) {
                        case ge.FLIP:
                            p = [n, i];
                            break;
                        case ge.CLOCKWISE:
                            p = G(n);
                            break;
                        case ge.COUNTERCLOCKWISE:
                            p = G(n, !0);
                            break;
                        default:
                            p = t.behavior;
                    }
                    return p.forEach(function(s, d) {
                        if (n !== s || p.length === d + 1) return e;
                        n = e.placement.split('-')[0], i = T(n);
                        var a = e.offsets.popper,
                            l = e.offsets.reference,
                            f = Z,
                            m = 'left' === n && f(a.right) > f(l.left) || 'right' === n && f(a.left) < f(l.right) || 'top' === n && f(a.bottom) > f(l.top) || 'bottom' === n && f(a.top) < f(l.bottom),
                            h = f(a.left) < f(o.left),
                            c = f(a.right) > f(o.right),
                            g = f(a.top) < f(o.top),
                            u = f(a.bottom) > f(o.bottom),
                            b = 'left' === n && h || 'right' === n && c || 'top' === n && g || 'bottom' === n && u,
                            w = -1 !== ['top', 'bottom'].indexOf(n),
                            y = !!t.flipVariations && (w && 'start' === r && h || w && 'end' === r && c || !w && 'start' === r && g || !w && 'end' === r && u);
                        (m || b || y) && (e.flipped = !0, (m || b) && (n = p[d + 1]), y && (r = z(r)), e.placement = n + (r ? '-' + r : ''), e.offsets.popper = fe({}, e.offsets.popper, D(e.instance.popper, e.offsets.reference, e.placement)), e = P(e.instance.modifiers, e, 'flip'))
                    }), e
                },
                behavior: 'flip',
                padding: 5,
                boundariesElement: 'viewport'
            },
            inner: {
                order: 700,
                enabled: !1,
                fn: function(e) {
                    var t = e.placement,
                        o = t.split('-')[0],
                        n = e.offsets,
                        i = n.popper,
                        r = n.reference,
                        p = -1 !== ['left', 'right'].indexOf(o),
                        s = -1 === ['top', 'left'].indexOf(o);
                    return i[p ? 'left' : 'top'] = r[o] - (s ? i[p ? 'width' : 'height'] : 0), e.placement = T(t), e.offsets.popper = g(i), e
                }
            },
            hide: {
                order: 800,
                enabled: !0,
                fn: function(e) {
                    if (!K(e.instance.modifiers, 'hide', 'preventOverflow')) return e;
                    var t = e.offsets.reference,
                        o = C(e.instance.modifiers, function(e) {
                            return 'preventOverflow' === e.name
                        }).boundaries;
                    if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes['x-out-of-boundaries'] = ''
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes['x-out-of-boundaries'] = !1
                    }
                    return e
                }
            },
            computeStyle: {
                order: 850,
                enabled: !0,
                fn: function(e, t) {
                    var o = t.x,
                        n = t.y,
                        i = e.offsets.popper,
                        r = C(e.instance.modifiers, function(e) {
                            return 'applyStyle' === e.name
                        }).gpuAcceleration;
                    void 0 !== r && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
                    var s, d, a = void 0 === r ? t.gpuAcceleration : r,
                        l = p(e.instance.popper),
                        f = u(l),
                        m = {
                            position: i.position
                        },
                        h = q(e, 2 > window.devicePixelRatio || !me),
                        c = 'bottom' === o ? 'top' : 'bottom',
                        g = 'right' === n ? 'left' : 'right',
                        b = H('transform');
                    if (d = 'bottom' == c ? 'HTML' === l.nodeName ? -l.clientHeight + h.bottom : -f.height + h.bottom : h.top, s = 'right' == g ? 'HTML' === l.nodeName ? -l.clientWidth + h.right : -f.width + h.right : h.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[c] = 0, m[g] = 0, m.willChange = 'transform';
                    else {
                        var w = 'bottom' == c ? -1 : 1,
                            y = 'right' == g ? -1 : 1;
                        m[c] = d * w, m[g] = s * y, m.willChange = c + ', ' + g
                    }
                    var E = {
                        "x-placement": e.placement
                    };
                    return e.attributes = fe({}, E, e.attributes), e.styles = fe({}, m, e.styles), e.arrowStyles = fe({}, e.offsets.arrow, e.arrowStyles), e
                },
                gpuAcceleration: !0,
                x: 'bottom',
                y: 'right'
            },
            applyStyle: {
                order: 900,
                enabled: !0,
                fn: function(e) {
                    return j(e.instance.popper, e.styles), V(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && j(e.arrowElement, e.arrowStyles), e
                },
                onLoad: function(e, t, o, n, i) {
                    var r = L(i, t, e, o.positionFixed),
                        p = O(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);
                    return t.setAttribute('x-placement', p), j(t, {
                        position: o.positionFixed ? 'fixed' : 'absolute'
                    }), o
                },
                gpuAcceleration: void 0
            }
        }
    }, ue
});
//# sourceMappingURL=popper.min.js.map

/*!
 * Bootstrap v4.0.0 (https://getbootstrap.com)
 * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
        typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
        (factory((global.bootstrap = {}), global.jQuery, global.Popper));
}(this, (function(exports, $, Popper) {
    'use strict';

    $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
    Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _extends() {
        _extends = Object.assign || function(target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }

            return target;
        };

        return _extends.apply(this, arguments);
    }

    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
    }

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): util.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Util = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Private TransitionEnd Helpers
         * ------------------------------------------------------------------------
         */
        var transition = false;
        var MAX_UID = 1000000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

        function toType(obj) {
            return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }

        function getSpecialTransitionEndEvent() {
            return {
                bindType: transition.end,
                delegateType: transition.end,
                handle: function handle(event) {
                    if ($$$1(event.target).is(this)) {
                        return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
                    }

                    return undefined; // eslint-disable-line no-undefined
                }
            };
        }

        function transitionEndTest() {
            if (typeof window !== 'undefined' && window.QUnit) {
                return false;
            }

            return {
                end: 'transitionend'
            };
        }

        function transitionEndEmulator(duration) {
            var _this = this;

            var called = false;
            $$$1(this).one(Util.TRANSITION_END, function() {
                called = true;
            });
            setTimeout(function() {
                if (!called) {
                    Util.triggerTransitionEnd(_this);
                }
            }, duration);
            return this;
        }

        function setTransitionEndSupport() {
            transition = transitionEndTest();
            $$$1.fn.emulateTransitionEnd = transitionEndEmulator;

            if (Util.supportsTransitionEnd()) {
                $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
            }
        }

        function escapeId(selector) {
            // We escape IDs in case of special selectors (selector = '#myId:something')
            // $.escapeSelector does not exist in jQuery < 3
            selector = typeof $$$1.escapeSelector === 'function' ? $$$1.escapeSelector(selector).substr(1) : selector.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1');
            return selector;
        }
        /**
         * --------------------------------------------------------------------------
         * Public Util Api
         * --------------------------------------------------------------------------
         */


        var Util = {
            TRANSITION_END: 'bsTransitionEnd',
            getUID: function getUID(prefix) {
                do {
                    // eslint-disable-next-line no-bitwise
                    prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
                } while (document.getElementById(prefix));

                return prefix;
            },
            getSelectorFromElement: function getSelectorFromElement(element) {
                var selector = element.getAttribute('data-target');

                if (!selector || selector === '#') {
                    selector = element.getAttribute('href') || '';
                } // If it's an ID


                if (selector.charAt(0) === '#') {
                    selector = escapeId(selector);
                }

                try {
                    var $selector = $$$1(document).find(selector);
                    return $selector.length > 0 ? selector : null;
                } catch (err) {
                    return null;
                }
            },
            reflow: function reflow(element) {
                return element.offsetHeight;
            },
            triggerTransitionEnd: function triggerTransitionEnd(element) {
                $$$1(element).trigger(transition.end);
            },
            supportsTransitionEnd: function supportsTransitionEnd() {
                return Boolean(transition);
            },
            isElement: function isElement(obj) {
                return (obj[0] || obj).nodeType;
            },
            typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
                for (var property in configTypes) {
                    if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                        var expectedTypes = configTypes[property];
                        var value = config[property];
                        var valueType = value && Util.isElement(value) ? 'element' : toType(value);

                        if (!new RegExp(expectedTypes).test(valueType)) {
                            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
                        }
                    }
                }
            }
        };
        setTransitionEndSupport();
        return Util;
    }($);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): alert.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Alert = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'alert';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.alert';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var TRANSITION_DURATION = 150;
        var Selector = {
            DISMISS: '[data-dismiss="alert"]'
        };
        var Event = {
            CLOSE: "close" + EVENT_KEY,
            CLOSED: "closed" + EVENT_KEY,
            CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
            ALERT: 'alert',
            FADE: 'fade',
            SHOW: 'show'
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var Alert =
            /*#__PURE__*/
            function() {
                function Alert(element) {
                    this._element = element;
                } // Getters


                var _proto = Alert.prototype;

                // Public
                _proto.close = function close(element) {
                    element = element || this._element;

                    var rootElement = this._getRootElement(element);

                    var customEvent = this._triggerCloseEvent(rootElement);

                    if (customEvent.isDefaultPrevented()) {
                        return;
                    }

                    this._removeElement(rootElement);
                };

                _proto.dispose = function dispose() {
                    $$$1.removeData(this._element, DATA_KEY);
                    this._element = null;
                }; // Private


                _proto._getRootElement = function _getRootElement(element) {
                    var selector = Util.getSelectorFromElement(element);
                    var parent = false;

                    if (selector) {
                        parent = $$$1(selector)[0];
                    }

                    if (!parent) {
                        parent = $$$1(element).closest("." + ClassName.ALERT)[0];
                    }

                    return parent;
                };

                _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
                    var closeEvent = $$$1.Event(Event.CLOSE);
                    $$$1(element).trigger(closeEvent);
                    return closeEvent;
                };

                _proto._removeElement = function _removeElement(element) {
                    var _this = this;

                    $$$1(element).removeClass(ClassName.SHOW);

                    if (!Util.supportsTransitionEnd() || !$$$1(element).hasClass(ClassName.FADE)) {
                        this._destroyElement(element);

                        return;
                    }

                    $$$1(element).one(Util.TRANSITION_END, function(event) {
                        return _this._destroyElement(element, event);
                    }).emulateTransitionEnd(TRANSITION_DURATION);
                };

                _proto._destroyElement = function _destroyElement(element) {
                    $$$1(element).detach().trigger(Event.CLOSED).remove();
                }; // Static


                Alert._jQueryInterface = function _jQueryInterface(config) {
                    return this.each(function() {
                        var $element = $$$1(this);
                        var data = $element.data(DATA_KEY);

                        if (!data) {
                            data = new Alert(this);
                            $element.data(DATA_KEY, data);
                        }

                        if (config === 'close') {
                            data[config](this);
                        }
                    });
                };

                Alert._handleDismiss = function _handleDismiss(alertInstance) {
                    return function(event) {
                        if (event) {
                            event.preventDefault();
                        }

                        alertInstance.close(this);
                    };
                };

                _createClass(Alert, null, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }]);
                return Alert;
            }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $$$1.fn[NAME] = Alert._jQueryInterface;
        $$$1.fn[NAME].Constructor = Alert;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return Alert._jQueryInterface;
        };

        return Alert;
    }($);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): button.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Button = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'button';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.button';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var ClassName = {
            ACTIVE: 'active',
            BUTTON: 'btn',
            FOCUS: 'focus'
        };
        var Selector = {
            DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
            DATA_TOGGLE: '[data-toggle="buttons"]',
            INPUT: 'input',
            ACTIVE: '.active',
            BUTTON: '.btn'
        };
        var Event = {
            CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
            FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var Button =
            /*#__PURE__*/
            function() {
                function Button(element) {
                    this._element = element;
                } // Getters


                var _proto = Button.prototype;

                // Public
                _proto.toggle = function toggle() {
                    var triggerChangeEvent = true;
                    var addAriaPressed = true;
                    var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

                    if (rootElement) {
                        var input = $$$1(this._element).find(Selector.INPUT)[0];

                        if (input) {
                            if (input.type === 'radio') {
                                if (input.checked && $$$1(this._element).hasClass(ClassName.ACTIVE)) {
                                    triggerChangeEvent = false;
                                } else {
                                    var activeElement = $$$1(rootElement).find(Selector.ACTIVE)[0];

                                    if (activeElement) {
                                        $$$1(activeElement).removeClass(ClassName.ACTIVE);
                                    }
                                }
                            }

                            if (triggerChangeEvent) {
                                if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                                    return;
                                }

                                input.checked = !$$$1(this._element).hasClass(ClassName.ACTIVE);
                                $$$1(input).trigger('change');
                            }

                            input.focus();
                            addAriaPressed = false;
                        }
                    }

                    if (addAriaPressed) {
                        this._element.setAttribute('aria-pressed', !$$$1(this._element).hasClass(ClassName.ACTIVE));
                    }

                    if (triggerChangeEvent) {
                        $$$1(this._element).toggleClass(ClassName.ACTIVE);
                    }
                };

                _proto.dispose = function dispose() {
                    $$$1.removeData(this._element, DATA_KEY);
                    this._element = null;
                }; // Static


                Button._jQueryInterface = function _jQueryInterface(config) {
                    return this.each(function() {
                        var data = $$$1(this).data(DATA_KEY);

                        if (!data) {
                            data = new Button(this);
                            $$$1(this).data(DATA_KEY, data);
                        }

                        if (config === 'toggle') {
                            data[config]();
                        }
                    });
                };

                _createClass(Button, null, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }]);
                return Button;
            }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function(event) {
            event.preventDefault();
            var button = event.target;

            if (!$$$1(button).hasClass(ClassName.BUTTON)) {
                button = $$$1(button).closest(Selector.BUTTON);
            }

            Button._jQueryInterface.call($$$1(button), 'toggle');
        }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function(event) {
            var button = $$$1(event.target).closest(Selector.BUTTON)[0];
            $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $$$1.fn[NAME] = Button._jQueryInterface;
        $$$1.fn[NAME].Constructor = Button;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return Button._jQueryInterface;
        };

        return Button;
    }($);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): carousel.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Carousel = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'carousel';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.carousel';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var TRANSITION_DURATION = 600;
        var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

        var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

        var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

        var Default = {
            interval: 5000,
            keyboard: true,
            slide: false,
            pause: 'hover',
            wrap: true
        };
        var DefaultType = {
            interval: '(number|boolean)',
            keyboard: 'boolean',
            slide: '(boolean|string)',
            pause: '(string|boolean)',
            wrap: 'boolean'
        };
        var Direction = {
            NEXT: 'next',
            PREV: 'prev',
            LEFT: 'left',
            RIGHT: 'right'
        };
        var Event = {
            SLIDE: "slide" + EVENT_KEY,
            SLID: "slid" + EVENT_KEY,
            KEYDOWN: "keydown" + EVENT_KEY,
            MOUSEENTER: "mouseenter" + EVENT_KEY,
            MOUSELEAVE: "mouseleave" + EVENT_KEY,
            TOUCHEND: "touchend" + EVENT_KEY,
            LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
            CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
            CAROUSEL: 'carousel',
            ACTIVE: 'active',
            SLIDE: 'slide',
            RIGHT: 'carousel-item-right',
            LEFT: 'carousel-item-left',
            NEXT: 'carousel-item-next',
            PREV: 'carousel-item-prev',
            ITEM: 'carousel-item'
        };
        var Selector = {
            ACTIVE: '.active',
            ACTIVE_ITEM: '.active.carousel-item',
            ITEM: '.carousel-item',
            NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
            INDICATORS: '.carousel-indicators',
            DATA_SLIDE: '[data-slide], [data-slide-to]',
            DATA_RIDE: '[data-ride="carousel"]'
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var Carousel =
            /*#__PURE__*/
            function() {
                function Carousel(element, config) {
                    this._items = null;
                    this._interval = null;
                    this._activeElement = null;
                    this._isPaused = false;
                    this._isSliding = false;
                    this.touchTimeout = null;
                    this._config = this._getConfig(config);
                    this._element = $$$1(element)[0];
                    this._indicatorsElement = $$$1(this._element).find(Selector.INDICATORS)[0];

                    this._addEventListeners();
                } // Getters


                var _proto = Carousel.prototype;

                // Public
                _proto.next = function next() {
                    if (!this._isSliding) {
                        this._slide(Direction.NEXT);
                    }
                };

                _proto.nextWhenVisible = function nextWhenVisible() {
                    // Don't call next when the page isn't visible
                    // or the carousel or its parent isn't visible
                    if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
                        this.next();
                    }
                };

                _proto.prev = function prev() {
                    if (!this._isSliding) {
                        this._slide(Direction.PREV);
                    }
                };

                _proto.pause = function pause(event) {
                    if (!event) {
                        this._isPaused = true;
                    }

                    if ($$$1(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
                        Util.triggerTransitionEnd(this._element);
                        this.cycle(true);
                    }

                    clearInterval(this._interval);
                    this._interval = null;
                };

                _proto.cycle = function cycle(event) {
                    if (!event) {
                        this._isPaused = false;
                    }

                    if (this._interval) {
                        clearInterval(this._interval);
                        this._interval = null;
                    }

                    if (this._config.interval && !this._isPaused) {
                        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
                    }
                };

                _proto.to = function to(index) {
                    var _this = this;

                    this._activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];

                    var activeIndex = this._getItemIndex(this._activeElement);

                    if (index > this._items.length - 1 || index < 0) {
                        return;
                    }

                    if (this._isSliding) {
                        $$$1(this._element).one(Event.SLID, function() {
                            return _this.to(index);
                        });
                        return;
                    }

                    if (activeIndex === index) {
                        this.pause();
                        this.cycle();
                        return;
                    }

                    var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

                    this._slide(direction, this._items[index]);
                };

                _proto.dispose = function dispose() {
                    $$$1(this._element).off(EVENT_KEY);
                    $$$1.removeData(this._element, DATA_KEY);
                    this._items = null;
                    this._config = null;
                    this._element = null;
                    this._interval = null;
                    this._isPaused = null;
                    this._isSliding = null;
                    this._activeElement = null;
                    this._indicatorsElement = null;
                }; // Private


                _proto._getConfig = function _getConfig(config) {
                    config = _extends({}, Default, config);
                    Util.typeCheckConfig(NAME, config, DefaultType);
                    return config;
                };

                _proto._addEventListeners = function _addEventListeners() {
                    var _this2 = this;

                    if (this._config.keyboard) {
                        $$$1(this._element).on(Event.KEYDOWN, function(event) {
                            return _this2._keydown(event);
                        });
                    }

                    if (this._config.pause === 'hover') {
                        $$$1(this._element).on(Event.MOUSEENTER, function(event) {
                            return _this2.pause(event);
                        }).on(Event.MOUSELEAVE, function(event) {
                            return _this2.cycle(event);
                        });

                        if ('ontouchstart' in document.documentElement) {
                            // If it's a touch-enabled device, mouseenter/leave are fired as
                            // part of the mouse compatibility events on first tap - the carousel
                            // would stop cycling until user tapped out of it;
                            // here, we listen for touchend, explicitly pause the carousel
                            // (as if it's the second time we tap on it, mouseenter compat event
                            // is NOT fired) and after a timeout (to allow for mouse compatibility
                            // events to fire) we explicitly restart cycling
                            $$$1(this._element).on(Event.TOUCHEND, function() {
                                _this2.pause();

                                if (_this2.touchTimeout) {
                                    clearTimeout(_this2.touchTimeout);
                                }

                                _this2.touchTimeout = setTimeout(function(event) {
                                    return _this2.cycle(event);
                                }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
                            });
                        }
                    }
                };

                _proto._keydown = function _keydown(event) {
                    if (/input|textarea/i.test(event.target.tagName)) {
                        return;
                    }

                    switch (event.which) {
                        case ARROW_LEFT_KEYCODE:
                            event.preventDefault();
                            this.prev();
                            break;

                        case ARROW_RIGHT_KEYCODE:
                            event.preventDefault();
                            this.next();
                            break;

                        default:
                    }
                };

                _proto._getItemIndex = function _getItemIndex(element) {
                    this._items = $$$1.makeArray($$$1(element).parent().find(Selector.ITEM));
                    return this._items.indexOf(element);
                };

                _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
                    var isNextDirection = direction === Direction.NEXT;
                    var isPrevDirection = direction === Direction.PREV;

                    var activeIndex = this._getItemIndex(activeElement);

                    var lastItemIndex = this._items.length - 1;
                    var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

                    if (isGoingToWrap && !this._config.wrap) {
                        return activeElement;
                    }

                    var delta = direction === Direction.PREV ? -1 : 1;
                    var itemIndex = (activeIndex + delta) % this._items.length;
                    return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
                };

                _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
                    var targetIndex = this._getItemIndex(relatedTarget);

                    var fromIndex = this._getItemIndex($$$1(this._element).find(Selector.ACTIVE_ITEM)[0]);

                    var slideEvent = $$$1.Event(Event.SLIDE, {
                        relatedTarget: relatedTarget,
                        direction: eventDirectionName,
                        from: fromIndex,
                        to: targetIndex
                    });
                    $$$1(this._element).trigger(slideEvent);
                    return slideEvent;
                };

                _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
                    if (this._indicatorsElement) {
                        $$$1(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

                        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

                        if (nextIndicator) {
                            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
                        }
                    }
                };

                _proto._slide = function _slide(direction, element) {
                    var _this3 = this;

                    var activeElement = $$$1(this._element).find(Selector.ACTIVE_ITEM)[0];

                    var activeElementIndex = this._getItemIndex(activeElement);

                    var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

                    var nextElementIndex = this._getItemIndex(nextElement);

                    var isCycling = Boolean(this._interval);
                    var directionalClassName;
                    var orderClassName;
                    var eventDirectionName;

                    if (direction === Direction.NEXT) {
                        directionalClassName = ClassName.LEFT;
                        orderClassName = ClassName.NEXT;
                        eventDirectionName = Direction.LEFT;
                    } else {
                        directionalClassName = ClassName.RIGHT;
                        orderClassName = ClassName.PREV;
                        eventDirectionName = Direction.RIGHT;
                    }

                    if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
                        this._isSliding = false;
                        return;
                    }

                    var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

                    if (slideEvent.isDefaultPrevented()) {
                        return;
                    }

                    if (!activeElement || !nextElement) {
                        // Some weirdness is happening, so we bail
                        return;
                    }

                    this._isSliding = true;

                    if (isCycling) {
                        this.pause();
                    }

                    this._setActiveIndicatorElement(nextElement);

                    var slidEvent = $$$1.Event(Event.SLID, {
                        relatedTarget: nextElement,
                        direction: eventDirectionName,
                        from: activeElementIndex,
                        to: nextElementIndex
                    });

                    if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.SLIDE)) {
                        $$$1(nextElement).addClass(orderClassName);
                        Util.reflow(nextElement);
                        $$$1(activeElement).addClass(directionalClassName);
                        $$$1(nextElement).addClass(directionalClassName);
                        $$$1(activeElement).one(Util.TRANSITION_END, function() {
                            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
                            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
                            _this3._isSliding = false;
                            setTimeout(function() {
                                return $$$1(_this3._element).trigger(slidEvent);
                            }, 0);
                        }).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        $$$1(activeElement).removeClass(ClassName.ACTIVE);
                        $$$1(nextElement).addClass(ClassName.ACTIVE);
                        this._isSliding = false;
                        $$$1(this._element).trigger(slidEvent);
                    }

                    if (isCycling) {
                        this.cycle();
                    }
                }; // Static


                Carousel._jQueryInterface = function _jQueryInterface(config) {
                    return this.each(function() {
                        var data = $$$1(this).data(DATA_KEY);

                        var _config = _extends({}, Default, $$$1(this).data());

                        if (typeof config === 'object') {
                            _config = _extends({}, _config, config);
                        }

                        var action = typeof config === 'string' ? config : _config.slide;

                        if (!data) {
                            data = new Carousel(this, _config);
                            $$$1(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'number') {
                            data.to(config);
                        } else if (typeof action === 'string') {
                            if (typeof data[action] === 'undefined') {
                                throw new TypeError("No method named \"" + action + "\"");
                            }

                            data[action]();
                        } else if (_config.interval) {
                            data.pause();
                            data.cycle();
                        }
                    });
                };

                Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
                    var selector = Util.getSelectorFromElement(this);

                    if (!selector) {
                        return;
                    }

                    var target = $$$1(selector)[0];

                    if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
                        return;
                    }

                    var config = _extends({}, $$$1(target).data(), $$$1(this).data());
                    var slideIndex = this.getAttribute('data-slide-to');

                    if (slideIndex) {
                        config.interval = false;
                    }

                    Carousel._jQueryInterface.call($$$1(target), config);

                    if (slideIndex) {
                        $$$1(target).data(DATA_KEY).to(slideIndex);
                    }

                    event.preventDefault();
                };

                _createClass(Carousel, null, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }, {
                    key: "Default",
                    get: function get() {
                        return Default;
                    }
                }]);
                return Carousel;
            }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
        $$$1(window).on(Event.LOAD_DATA_API, function() {
            $$$1(Selector.DATA_RIDE).each(function() {
                var $carousel = $$$1(this);

                Carousel._jQueryInterface.call($carousel, $carousel.data());
            });
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $$$1.fn[NAME] = Carousel._jQueryInterface;
        $$$1.fn[NAME].Constructor = Carousel;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return Carousel._jQueryInterface;
        };

        return Carousel;
    }($);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): collapse.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Collapse = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'collapse';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.collapse';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var TRANSITION_DURATION = 600;
        var Default = {
            toggle: true,
            parent: ''
        };
        var DefaultType = {
            toggle: 'boolean',
            parent: '(string|element)'
        };
        var Event = {
            SHOW: "show" + EVENT_KEY,
            SHOWN: "shown" + EVENT_KEY,
            HIDE: "hide" + EVENT_KEY,
            HIDDEN: "hidden" + EVENT_KEY,
            CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
            SHOW: 'show',
            COLLAPSE: 'collapse',
            COLLAPSING: 'collapsing',
            COLLAPSED: 'collapsed'
        };
        var Dimension = {
            WIDTH: 'width',
            HEIGHT: 'height'
        };
        var Selector = {
            ACTIVES: '.show, .collapsing',
            DATA_TOGGLE: '[data-toggle="collapse"]'
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var Collapse =
            /*#__PURE__*/
            function() {
                function Collapse(element, config) {
                    this._isTransitioning = false;
                    this._element = element;
                    this._config = this._getConfig(config);
                    this._triggerArray = $$$1.makeArray($$$1("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
                    var tabToggles = $$$1(Selector.DATA_TOGGLE);

                    for (var i = 0; i < tabToggles.length; i++) {
                        var elem = tabToggles[i];
                        var selector = Util.getSelectorFromElement(elem);

                        if (selector !== null && $$$1(selector).filter(element).length > 0) {
                            this._selector = selector;

                            this._triggerArray.push(elem);
                        }
                    }

                    this._parent = this._config.parent ? this._getParent() : null;

                    if (!this._config.parent) {
                        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
                    }

                    if (this._config.toggle) {
                        this.toggle();
                    }
                } // Getters


                var _proto = Collapse.prototype;

                // Public
                _proto.toggle = function toggle() {
                    if ($$$1(this._element).hasClass(ClassName.SHOW)) {
                        this.hide();
                    } else {
                        this.show();
                    }
                };

                _proto.show = function show() {
                    var _this = this;

                    if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
                        return;
                    }

                    var actives;
                    var activesData;

                    if (this._parent) {
                        actives = $$$1.makeArray($$$1(this._parent).find(Selector.ACTIVES).filter("[data-parent=\"" + this._config.parent + "\"]"));

                        if (actives.length === 0) {
                            actives = null;
                        }
                    }

                    if (actives) {
                        activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

                        if (activesData && activesData._isTransitioning) {
                            return;
                        }
                    }

                    var startEvent = $$$1.Event(Event.SHOW);
                    $$$1(this._element).trigger(startEvent);

                    if (startEvent.isDefaultPrevented()) {
                        return;
                    }

                    if (actives) {
                        Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

                        if (!activesData) {
                            $$$1(actives).data(DATA_KEY, null);
                        }
                    }

                    var dimension = this._getDimension();

                    $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
                    this._element.style[dimension] = 0;

                    if (this._triggerArray.length > 0) {
                        $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
                    }

                    this.setTransitioning(true);

                    var complete = function complete() {
                        $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
                        _this._element.style[dimension] = '';

                        _this.setTransitioning(false);

                        $$$1(_this._element).trigger(Event.SHOWN);
                    };

                    if (!Util.supportsTransitionEnd()) {
                        complete();
                        return;
                    }

                    var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
                    var scrollSize = "scroll" + capitalizedDimension;
                    $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                    this._element.style[dimension] = this._element[scrollSize] + "px";
                };

                _proto.hide = function hide() {
                    var _this2 = this;

                    if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
                        return;
                    }

                    var startEvent = $$$1.Event(Event.HIDE);
                    $$$1(this._element).trigger(startEvent);

                    if (startEvent.isDefaultPrevented()) {
                        return;
                    }

                    var dimension = this._getDimension();

                    this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
                    Util.reflow(this._element);
                    $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

                    if (this._triggerArray.length > 0) {
                        for (var i = 0; i < this._triggerArray.length; i++) {
                            var trigger = this._triggerArray[i];
                            var selector = Util.getSelectorFromElement(trigger);

                            if (selector !== null) {
                                var $elem = $$$1(selector);

                                if (!$elem.hasClass(ClassName.SHOW)) {
                                    $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
                                }
                            }
                        }
                    }

                    this.setTransitioning(true);

                    var complete = function complete() {
                        _this2.setTransitioning(false);

                        $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
                    };

                    this._element.style[dimension] = '';

                    if (!Util.supportsTransitionEnd()) {
                        complete();
                        return;
                    }

                    $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                };

                _proto.setTransitioning = function setTransitioning(isTransitioning) {
                    this._isTransitioning = isTransitioning;
                };

                _proto.dispose = function dispose() {
                    $$$1.removeData(this._element, DATA_KEY);
                    this._config = null;
                    this._parent = null;
                    this._element = null;
                    this._triggerArray = null;
                    this._isTransitioning = null;
                }; // Private


                _proto._getConfig = function _getConfig(config) {
                    config = _extends({}, Default, config);
                    config.toggle = Boolean(config.toggle); // Coerce string values

                    Util.typeCheckConfig(NAME, config, DefaultType);
                    return config;
                };

                _proto._getDimension = function _getDimension() {
                    var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
                    return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
                };

                _proto._getParent = function _getParent() {
                    var _this3 = this;

                    var parent = null;

                    if (Util.isElement(this._config.parent)) {
                        parent = this._config.parent; // It's a jQuery object

                        if (typeof this._config.parent.jquery !== 'undefined') {
                            parent = this._config.parent[0];
                        }
                    } else {
                        parent = $$$1(this._config.parent)[0];
                    }

                    var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
                    $$$1(parent).find(selector).each(function(i, element) {
                        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
                    });
                    return parent;
                };

                _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
                    if (element) {
                        var isOpen = $$$1(element).hasClass(ClassName.SHOW);

                        if (triggerArray.length > 0) {
                            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
                        }
                    }
                }; // Static


                Collapse._getTargetFromElement = function _getTargetFromElement(element) {
                    var selector = Util.getSelectorFromElement(element);
                    return selector ? $$$1(selector)[0] : null;
                };

                Collapse._jQueryInterface = function _jQueryInterface(config) {
                    return this.each(function() {
                        var $this = $$$1(this);
                        var data = $this.data(DATA_KEY);

                        var _config = _extends({}, Default, $this.data(), typeof config === 'object' && config);

                        if (!data && _config.toggle && /show|hide/.test(config)) {
                            _config.toggle = false;
                        }

                        if (!data) {
                            data = new Collapse(this, _config);
                            $this.data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (typeof data[config] === 'undefined') {
                                throw new TypeError("No method named \"" + config + "\"");
                            }

                            data[config]();
                        }
                    });
                };

                _createClass(Collapse, null, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }, {
                    key: "Default",
                    get: function get() {
                        return Default;
                    }
                }]);
                return Collapse;
            }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
            // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
            if (event.currentTarget.tagName === 'A') {
                event.preventDefault();
            }

            var $trigger = $$$1(this);
            var selector = Util.getSelectorFromElement(this);
            $$$1(selector).each(function() {
                var $target = $$$1(this);
                var data = $target.data(DATA_KEY);
                var config = data ? 'toggle' : $trigger.data();

                Collapse._jQueryInterface.call($target, config);
            });
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $$$1.fn[NAME] = Collapse._jQueryInterface;
        $$$1.fn[NAME].Constructor = Collapse;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return Collapse._jQueryInterface;
        };

        return Collapse;
    }($);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): dropdown.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Dropdown = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'dropdown';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.dropdown';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

        var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

        var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

        var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

        var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

        var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

        var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
        var Event = {
            HIDE: "hide" + EVENT_KEY,
            HIDDEN: "hidden" + EVENT_KEY,
            SHOW: "show" + EVENT_KEY,
            SHOWN: "shown" + EVENT_KEY,
            CLICK: "click" + EVENT_KEY,
            CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
            KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
            KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
            DISABLED: 'disabled',
            SHOW: 'show',
            DROPUP: 'dropup',
            DROPRIGHT: 'dropright',
            DROPLEFT: 'dropleft',
            MENURIGHT: 'dropdown-menu-right',
            MENULEFT: 'dropdown-menu-left',
            POSITION_STATIC: 'position-static'
        };
        var Selector = {
            DATA_TOGGLE: '[data-toggle="dropdown"]',
            FORM_CHILD: '.dropdown form',
            MENU: '.dropdown-menu',
            NAVBAR_NAV: '.navbar-nav',
            VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
        };
        var AttachmentMap = {
            TOP: 'top-start',
            TOPEND: 'top-end',
            BOTTOM: 'bottom-start',
            BOTTOMEND: 'bottom-end',
            RIGHT: 'right-start',
            RIGHTEND: 'right-end',
            LEFT: 'left-start',
            LEFTEND: 'left-end'
        };
        var Default = {
            offset: 0,
            flip: true,
            boundary: 'scrollParent'
        };
        var DefaultType = {
            offset: '(number|string|function)',
            flip: 'boolean',
            boundary: '(string|element)'
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var Dropdown =
            /*#__PURE__*/
            function() {
                function Dropdown(element, config) {
                    this._element = element;
                    this._popper = null;
                    this._config = this._getConfig(config);
                    this._menu = this._getMenuElement();
                    this._inNavbar = this._detectNavbar();

                    this._addEventListeners();
                } // Getters


                var _proto = Dropdown.prototype;

                // Public
                _proto.toggle = function toggle() {
                    if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
                        return;
                    }

                    var parent = Dropdown._getParentFromElement(this._element);

                    var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

                    Dropdown._clearMenus();

                    if (isActive) {
                        return;
                    }

                    var relatedTarget = {
                        relatedTarget: this._element
                    };
                    var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
                    $$$1(parent).trigger(showEvent);

                    if (showEvent.isDefaultPrevented()) {
                        return;
                    } // Disable totally Popper.js for Dropdown in Navbar


                    if (!this._inNavbar) {
                        /**
                         * Check for Popper dependency
                         * Popper - https://popper.js.org
                         */
                        if (typeof Popper === 'undefined') {
                            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
                        }

                        var element = this._element; // For dropup with alignment we use the parent as popper container

                        if ($$$1(parent).hasClass(ClassName.DROPUP)) {
                            if ($$$1(this._menu).hasClass(ClassName.MENULEFT) || $$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
                                element = parent;
                            }
                        } // If boundary is not `scrollParent`, then set position to `static`
                        // to allow the menu to "escape" the scroll parent's boundaries
                        // https://github.com/twbs/bootstrap/issues/24251


                        if (this._config.boundary !== 'scrollParent') {
                            $$$1(parent).addClass(ClassName.POSITION_STATIC);
                        }

                        this._popper = new Popper(element, this._menu, this._getPopperConfig());
                    } // If this is a touch-enabled device we add extra
                    // empty mouseover listeners to the body's immediate children;
                    // only needed because of broken event delegation on iOS
                    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


                    if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
                        $$$1('body').children().on('mouseover', null, $$$1.noop);
                    }

                    this._element.focus();

                    this._element.setAttribute('aria-expanded', true);

                    $$$1(this._menu).toggleClass(ClassName.SHOW);
                    $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
                };

                _proto.dispose = function dispose() {
                    $$$1.removeData(this._element, DATA_KEY);
                    $$$1(this._element).off(EVENT_KEY);
                    this._element = null;
                    this._menu = null;

                    if (this._popper !== null) {
                        this._popper.destroy();

                        this._popper = null;
                    }
                };

                _proto.update = function update() {
                    this._inNavbar = this._detectNavbar();

                    if (this._popper !== null) {
                        this._popper.scheduleUpdate();
                    }
                }; // Private


                _proto._addEventListeners = function _addEventListeners() {
                    var _this = this;

                    $$$1(this._element).on(Event.CLICK, function(event) {
                        event.preventDefault();
                        event.stopPropagation();

                        _this.toggle();
                    });
                };

                _proto._getConfig = function _getConfig(config) {
                    config = _extends({}, this.constructor.Default, $$$1(this._element).data(), config);
                    Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
                    return config;
                };

                _proto._getMenuElement = function _getMenuElement() {
                    if (!this._menu) {
                        var parent = Dropdown._getParentFromElement(this._element);

                        this._menu = $$$1(parent).find(Selector.MENU)[0];
                    }

                    return this._menu;
                };

                _proto._getPlacement = function _getPlacement() {
                    var $parentDropdown = $$$1(this._element).parent();
                    var placement = AttachmentMap.BOTTOM; // Handle dropup

                    if ($parentDropdown.hasClass(ClassName.DROPUP)) {
                        placement = AttachmentMap.TOP;

                        if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
                            placement = AttachmentMap.TOPEND;
                        }
                    } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
                        placement = AttachmentMap.RIGHT;
                    } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
                        placement = AttachmentMap.LEFT;
                    } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
                        placement = AttachmentMap.BOTTOMEND;
                    }

                    return placement;
                };

                _proto._detectNavbar = function _detectNavbar() {
                    return $$$1(this._element).closest('.navbar').length > 0;
                };

                _proto._getPopperConfig = function _getPopperConfig() {
                    var _this2 = this;

                    var offsetConf = {};

                    if (typeof this._config.offset === 'function') {
                        offsetConf.fn = function(data) {
                            data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets) || {});
                            return data;
                        };
                    } else {
                        offsetConf.offset = this._config.offset;
                    }

                    var popperConfig = {
                        placement: this._getPlacement(),
                        modifiers: {
                            offset: offsetConf,
                            flip: {
                                enabled: this._config.flip
                            },
                            preventOverflow: {
                                boundariesElement: this._config.boundary
                            }
                        }
                    };
                    return popperConfig;
                }; // Static


                Dropdown._jQueryInterface = function _jQueryInterface(config) {
                    return this.each(function() {
                        var data = $$$1(this).data(DATA_KEY);

                        var _config = typeof config === 'object' ? config : null;

                        if (!data) {
                            data = new Dropdown(this, _config);
                            $$$1(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (typeof data[config] === 'undefined') {
                                throw new TypeError("No method named \"" + config + "\"");
                            }

                            data[config]();
                        }
                    });
                };

                Dropdown._clearMenus = function _clearMenus(event) {
                    if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
                        return;
                    }

                    var toggles = $$$1.makeArray($$$1(Selector.DATA_TOGGLE));

                    for (var i = 0; i < toggles.length; i++) {
                        var parent = Dropdown._getParentFromElement(toggles[i]);

                        var context = $$$1(toggles[i]).data(DATA_KEY);
                        var relatedTarget = {
                            relatedTarget: toggles[i]
                        };

                        if (!context) {
                            continue;
                        }

                        var dropdownMenu = context._menu;

                        if (!$$$1(parent).hasClass(ClassName.SHOW)) {
                            continue;
                        }

                        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
                            continue;
                        }

                        var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
                        $$$1(parent).trigger(hideEvent);

                        if (hideEvent.isDefaultPrevented()) {
                            continue;
                        } // If this is a touch-enabled device we remove the extra
                        // empty mouseover listeners we added for iOS support


                        if ('ontouchstart' in document.documentElement) {
                            $$$1('body').children().off('mouseover', null, $$$1.noop);
                        }

                        toggles[i].setAttribute('aria-expanded', 'false');
                        $$$1(dropdownMenu).removeClass(ClassName.SHOW);
                        $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
                    }
                };

                Dropdown._getParentFromElement = function _getParentFromElement(element) {
                    var parent;
                    var selector = Util.getSelectorFromElement(element);

                    if (selector) {
                        parent = $$$1(selector)[0];
                    }

                    return parent || element.parentNode;
                }; // eslint-disable-next-line complexity


                Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
                    // If not input/textarea:
                    //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
                    // If input/textarea:
                    //  - If space key => not a dropdown command
                    //  - If key is other than escape
                    //    - If key is not up or down => not a dropdown command
                    //    - If trigger inside the menu => not a dropdown command
                    if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
                        return;
                    }

                    event.preventDefault();
                    event.stopPropagation();

                    if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
                        return;
                    }

                    var parent = Dropdown._getParentFromElement(this);

                    var isActive = $$$1(parent).hasClass(ClassName.SHOW);

                    if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
                        if (event.which === ESCAPE_KEYCODE) {
                            var toggle = $$$1(parent).find(Selector.DATA_TOGGLE)[0];
                            $$$1(toggle).trigger('focus');
                        }

                        $$$1(this).trigger('click');
                        return;
                    }

                    var items = $$$1(parent).find(Selector.VISIBLE_ITEMS).get();

                    if (items.length === 0) {
                        return;
                    }

                    var index = items.indexOf(event.target);

                    if (event.which === ARROW_UP_KEYCODE && index > 0) {
                        // Up
                        index--;
                    }

                    if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
                        // Down
                        index++;
                    }

                    if (index < 0) {
                        index = 0;
                    }

                    items[index].focus();
                };

                _createClass(Dropdown, null, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }, {
                    key: "Default",
                    get: function get() {
                        return Default;
                    }
                }, {
                    key: "DefaultType",
                    get: function get() {
                        return DefaultType;
                    }
                }]);
                return Dropdown;
            }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
            event.preventDefault();
            event.stopPropagation();

            Dropdown._jQueryInterface.call($$$1(this), 'toggle');
        }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function(e) {
            e.stopPropagation();
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $$$1.fn[NAME] = Dropdown._jQueryInterface;
        $$$1.fn[NAME].Constructor = Dropdown;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return Dropdown._jQueryInterface;
        };

        return Dropdown;
    }($, Popper);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): modal.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Modal = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'modal';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.modal';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var TRANSITION_DURATION = 300;
        var BACKDROP_TRANSITION_DURATION = 150;
        var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

        var Default = {
            backdrop: true,
            keyboard: true,
            focus: true,
            show: true
        };
        var DefaultType = {
            backdrop: '(boolean|string)',
            keyboard: 'boolean',
            focus: 'boolean',
            show: 'boolean'
        };
        var Event = {
            HIDE: "hide" + EVENT_KEY,
            HIDDEN: "hidden" + EVENT_KEY,
            SHOW: "show" + EVENT_KEY,
            SHOWN: "shown" + EVENT_KEY,
            FOCUSIN: "focusin" + EVENT_KEY,
            RESIZE: "resize" + EVENT_KEY,
            CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
            KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
            MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
            MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
            CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
            SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
            BACKDROP: 'modal-backdrop',
            OPEN: 'modal-open',
            FADE: 'fade',
            SHOW: 'show'
        };
        var Selector = {
            DIALOG: '.modal-dialog',
            DATA_TOGGLE: '[data-toggle="modal"]',
            DATA_DISMISS: '[data-dismiss="modal"]',
            FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
            STICKY_CONTENT: '.sticky-top',
            NAVBAR_TOGGLER: '.navbar-toggler'
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var Modal =
            /*#__PURE__*/
            function() {
                function Modal(element, config) {
                    this._config = this._getConfig(config);
                    this._element = element;
                    this._dialog = $$$1(element).find(Selector.DIALOG)[0];
                    this._backdrop = null;
                    this._isShown = false;
                    this._isBodyOverflowing = false;
                    this._ignoreBackdropClick = false;
                    this._originalBodyPadding = 0;
                    this._scrollbarWidth = 0;
                } // Getters


                var _proto = Modal.prototype;

                // Public
                _proto.toggle = function toggle(relatedTarget) {
                    return this._isShown ? this.hide() : this.show(relatedTarget);
                };

                _proto.show = function show(relatedTarget) {
                    var _this = this;

                    if (this._isTransitioning || this._isShown) {
                        return;
                    }

                    if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE)) {
                        this._isTransitioning = true;
                    }

                    var showEvent = $$$1.Event(Event.SHOW, {
                        relatedTarget: relatedTarget
                    });
                    $$$1(this._element).trigger(showEvent);

                    if (this._isShown || showEvent.isDefaultPrevented()) {
                        return;
                    }

                    this._isShown = true;

                    this._checkScrollbar();

                    this._setScrollbar();

                    this._adjustDialog();

                    $$$1(document.body).addClass(ClassName.OPEN);

                    this._setEscapeEvent();

                    this._setResizeEvent();

                    $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function(event) {
                        return _this.hide(event);
                    });
                    $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function() {
                        $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function(event) {
                            if ($$$1(event.target).is(_this._element)) {
                                _this._ignoreBackdropClick = true;
                            }
                        });
                    });

                    this._showBackdrop(function() {
                        return _this._showElement(relatedTarget);
                    });
                };

                _proto.hide = function hide(event) {
                    var _this2 = this;

                    if (event) {
                        event.preventDefault();
                    }

                    if (this._isTransitioning || !this._isShown) {
                        return;
                    }

                    var hideEvent = $$$1.Event(Event.HIDE);
                    $$$1(this._element).trigger(hideEvent);

                    if (!this._isShown || hideEvent.isDefaultPrevented()) {
                        return;
                    }

                    this._isShown = false;
                    var transition = Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE);

                    if (transition) {
                        this._isTransitioning = true;
                    }

                    this._setEscapeEvent();

                    this._setResizeEvent();

                    $$$1(document).off(Event.FOCUSIN);
                    $$$1(this._element).removeClass(ClassName.SHOW);
                    $$$1(this._element).off(Event.CLICK_DISMISS);
                    $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

                    if (transition) {
                        $$$1(this._element).one(Util.TRANSITION_END, function(event) {
                            return _this2._hideModal(event);
                        }).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        this._hideModal();
                    }
                };

                _proto.dispose = function dispose() {
                    $$$1.removeData(this._element, DATA_KEY);
                    $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
                    this._config = null;
                    this._element = null;
                    this._dialog = null;
                    this._backdrop = null;
                    this._isShown = null;
                    this._isBodyOverflowing = null;
                    this._ignoreBackdropClick = null;
                    this._scrollbarWidth = null;
                };

                _proto.handleUpdate = function handleUpdate() {
                    this._adjustDialog();
                }; // Private


                _proto._getConfig = function _getConfig(config) {
                    config = _extends({}, Default, config);
                    Util.typeCheckConfig(NAME, config, DefaultType);
                    return config;
                };

                _proto._showElement = function _showElement(relatedTarget) {
                    var _this3 = this;

                    var transition = Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE);

                    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                        // Don't move modal's DOM position
                        document.body.appendChild(this._element);
                    }

                    this._element.style.display = 'block';

                    this._element.removeAttribute('aria-hidden');

                    this._element.scrollTop = 0;

                    if (transition) {
                        Util.reflow(this._element);
                    }

                    $$$1(this._element).addClass(ClassName.SHOW);

                    if (this._config.focus) {
                        this._enforceFocus();
                    }

                    var shownEvent = $$$1.Event(Event.SHOWN, {
                        relatedTarget: relatedTarget
                    });

                    var transitionComplete = function transitionComplete() {
                        if (_this3._config.focus) {
                            _this3._element.focus();
                        }

                        _this3._isTransitioning = false;
                        $$$1(_this3._element).trigger(shownEvent);
                    };

                    if (transition) {
                        $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        transitionComplete();
                    }
                };

                _proto._enforceFocus = function _enforceFocus() {
                    var _this4 = this;

                    $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
                        .on(Event.FOCUSIN, function(event) {
                            if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
                                _this4._element.focus();
                            }
                        });
                };

                _proto._setEscapeEvent = function _setEscapeEvent() {
                    var _this5 = this;

                    if (this._isShown && this._config.keyboard) {
                        $$$1(this._element).on(Event.KEYDOWN_DISMISS, function(event) {
                            if (event.which === ESCAPE_KEYCODE) {
                                event.preventDefault();

                                _this5.hide();
                            }
                        });
                    } else if (!this._isShown) {
                        $$$1(this._element).off(Event.KEYDOWN_DISMISS);
                    }
                };

                _proto._setResizeEvent = function _setResizeEvent() {
                    var _this6 = this;

                    if (this._isShown) {
                        $$$1(window).on(Event.RESIZE, function(event) {
                            return _this6.handleUpdate(event);
                        });
                    } else {
                        $$$1(window).off(Event.RESIZE);
                    }
                };

                _proto._hideModal = function _hideModal() {
                    var _this7 = this;

                    this._element.style.display = 'none';

                    this._element.setAttribute('aria-hidden', true);

                    this._isTransitioning = false;

                    this._showBackdrop(function() {
                        $$$1(document.body).removeClass(ClassName.OPEN);

                        _this7._resetAdjustments();

                        _this7._resetScrollbar();

                        $$$1(_this7._element).trigger(Event.HIDDEN);
                    });
                };

                _proto._removeBackdrop = function _removeBackdrop() {
                    if (this._backdrop) {
                        $$$1(this._backdrop).remove();
                        this._backdrop = null;
                    }
                };

                _proto._showBackdrop = function _showBackdrop(callback) {
                    var _this8 = this;

                    var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

                    if (this._isShown && this._config.backdrop) {
                        var doAnimate = Util.supportsTransitionEnd() && animate;
                        this._backdrop = document.createElement('div');
                        this._backdrop.className = ClassName.BACKDROP;

                        if (animate) {
                            $$$1(this._backdrop).addClass(animate);
                        }

                        $$$1(this._backdrop).appendTo(document.body);
                        $$$1(this._element).on(Event.CLICK_DISMISS, function(event) {
                            if (_this8._ignoreBackdropClick) {
                                _this8._ignoreBackdropClick = false;
                                return;
                            }

                            if (event.target !== event.currentTarget) {
                                return;
                            }

                            if (_this8._config.backdrop === 'static') {
                                _this8._element.focus();
                            } else {
                                _this8.hide();
                            }
                        });

                        if (doAnimate) {
                            Util.reflow(this._backdrop);
                        }

                        $$$1(this._backdrop).addClass(ClassName.SHOW);

                        if (!callback) {
                            return;
                        }

                        if (!doAnimate) {
                            callback();
                            return;
                        }

                        $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                    } else if (!this._isShown && this._backdrop) {
                        $$$1(this._backdrop).removeClass(ClassName.SHOW);

                        var callbackRemove = function callbackRemove() {
                            _this8._removeBackdrop();

                            if (callback) {
                                callback();
                            }
                        };

                        if (Util.supportsTransitionEnd() && $$$1(this._element).hasClass(ClassName.FADE)) {
                            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                        } else {
                            callbackRemove();
                        }
                    } else if (callback) {
                        callback();
                    }
                }; // ----------------------------------------------------------------------
                // the following methods are used to handle overflowing modals
                // todo (fat): these should probably be refactored out of modal.js
                // ----------------------------------------------------------------------


                _proto._adjustDialog = function _adjustDialog() {
                    var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

                    if (!this._isBodyOverflowing && isModalOverflowing) {
                        this._element.style.paddingLeft = this._scrollbarWidth + "px";
                    }

                    if (this._isBodyOverflowing && !isModalOverflowing) {
                        this._element.style.paddingRight = this._scrollbarWidth + "px";
                    }
                };

                _proto._resetAdjustments = function _resetAdjustments() {
                    this._element.style.paddingLeft = '';
                    this._element.style.paddingRight = '';
                };

                _proto._checkScrollbar = function _checkScrollbar() {
                    var rect = document.body.getBoundingClientRect();
                    this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
                    this._scrollbarWidth = this._getScrollbarWidth();
                };

                _proto._setScrollbar = function _setScrollbar() {
                    var _this9 = this;

                    if (this._isBodyOverflowing) {
                        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
                        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
                        // Adjust fixed content padding
                        $$$1(Selector.FIXED_CONTENT).each(function(index, element) {
                            var actualPadding = $$$1(element)[0].style.paddingRight;
                            var calculatedPadding = $$$1(element).css('padding-right');
                            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
                        }); // Adjust sticky content margin

                        $$$1(Selector.STICKY_CONTENT).each(function(index, element) {
                            var actualMargin = $$$1(element)[0].style.marginRight;
                            var calculatedMargin = $$$1(element).css('margin-right');
                            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
                        }); // Adjust navbar-toggler margin

                        $$$1(Selector.NAVBAR_TOGGLER).each(function(index, element) {
                            var actualMargin = $$$1(element)[0].style.marginRight;
                            var calculatedMargin = $$$1(element).css('margin-right');
                            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
                        }); // Adjust body padding

                        var actualPadding = document.body.style.paddingRight;
                        var calculatedPadding = $$$1('body').css('padding-right');
                        $$$1('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
                    }
                };

                _proto._resetScrollbar = function _resetScrollbar() {
                    // Restore fixed content padding
                    $$$1(Selector.FIXED_CONTENT).each(function(index, element) {
                        var padding = $$$1(element).data('padding-right');

                        if (typeof padding !== 'undefined') {
                            $$$1(element).css('padding-right', padding).removeData('padding-right');
                        }
                    }); // Restore sticky content and navbar-toggler margin

                    $$$1(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function(index, element) {
                        var margin = $$$1(element).data('margin-right');

                        if (typeof margin !== 'undefined') {
                            $$$1(element).css('margin-right', margin).removeData('margin-right');
                        }
                    }); // Restore body padding

                    var padding = $$$1('body').data('padding-right');

                    if (typeof padding !== 'undefined') {
                        $$$1('body').css('padding-right', padding).removeData('padding-right');
                    }
                };

                _proto._getScrollbarWidth = function _getScrollbarWidth() {
                    // thx d.walsh
                    var scrollDiv = document.createElement('div');
                    scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
                    document.body.appendChild(scrollDiv);
                    var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
                    document.body.removeChild(scrollDiv);
                    return scrollbarWidth;
                }; // Static


                Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
                    return this.each(function() {
                        var data = $$$1(this).data(DATA_KEY);

                        var _config = _extends({}, Modal.Default, $$$1(this).data(), typeof config === 'object' && config);

                        if (!data) {
                            data = new Modal(this, _config);
                            $$$1(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (typeof data[config] === 'undefined') {
                                throw new TypeError("No method named \"" + config + "\"");
                            }

                            data[config](relatedTarget);
                        } else if (_config.show) {
                            data.show(relatedTarget);
                        }
                    });
                };

                _createClass(Modal, null, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }, {
                    key: "Default",
                    get: function get() {
                        return Default;
                    }
                }]);
                return Modal;
            }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
            var _this10 = this;

            var target;
            var selector = Util.getSelectorFromElement(this);

            if (selector) {
                target = $$$1(selector)[0];
            }

            var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _extends({}, $$$1(target).data(), $$$1(this).data());

            if (this.tagName === 'A' || this.tagName === 'AREA') {
                event.preventDefault();
            }

            var $target = $$$1(target).one(Event.SHOW, function(showEvent) {
                if (showEvent.isDefaultPrevented()) {
                    // Only register focus restorer if modal will actually get shown
                    return;
                }

                $target.one(Event.HIDDEN, function() {
                    if ($$$1(_this10).is(':visible')) {
                        _this10.focus();
                    }
                });
            });

            Modal._jQueryInterface.call($$$1(target), config, this);
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $$$1.fn[NAME] = Modal._jQueryInterface;
        $$$1.fn[NAME].Constructor = Modal;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return Modal._jQueryInterface;
        };

        return Modal;
    }($);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): tooltip.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Tooltip = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'tooltip';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.tooltip';
        var EVENT_KEY = "." + DATA_KEY;
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var TRANSITION_DURATION = 150;
        var CLASS_PREFIX = 'bs-tooltip';
        var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
        var DefaultType = {
            animation: 'boolean',
            template: 'string',
            title: '(string|element|function)',
            trigger: 'string',
            delay: '(number|object)',
            html: 'boolean',
            selector: '(string|boolean)',
            placement: '(string|function)',
            offset: '(number|string)',
            container: '(string|element|boolean)',
            fallbackPlacement: '(string|array)',
            boundary: '(string|element)'
        };
        var AttachmentMap = {
            AUTO: 'auto',
            TOP: 'top',
            RIGHT: 'right',
            BOTTOM: 'bottom',
            LEFT: 'left'
        };
        var Default = {
            animation: true,
            template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
            trigger: 'hover focus',
            title: '',
            delay: 0,
            html: false,
            selector: false,
            placement: 'top',
            offset: 0,
            container: false,
            fallbackPlacement: 'flip',
            boundary: 'scrollParent'
        };
        var HoverState = {
            SHOW: 'show',
            OUT: 'out'
        };
        var Event = {
            HIDE: "hide" + EVENT_KEY,
            HIDDEN: "hidden" + EVENT_KEY,
            SHOW: "show" + EVENT_KEY,
            SHOWN: "shown" + EVENT_KEY,
            INSERTED: "inserted" + EVENT_KEY,
            CLICK: "click" + EVENT_KEY,
            FOCUSIN: "focusin" + EVENT_KEY,
            FOCUSOUT: "focusout" + EVENT_KEY,
            MOUSEENTER: "mouseenter" + EVENT_KEY,
            MOUSELEAVE: "mouseleave" + EVENT_KEY
        };
        var ClassName = {
            FADE: 'fade',
            SHOW: 'show'
        };
        var Selector = {
            TOOLTIP: '.tooltip',
            TOOLTIP_INNER: '.tooltip-inner',
            ARROW: '.arrow'
        };
        var Trigger = {
            HOVER: 'hover',
            FOCUS: 'focus',
            CLICK: 'click',
            MANUAL: 'manual'
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var Tooltip =
            /*#__PURE__*/
            function() {
                function Tooltip(element, config) {
                    /**
                     * Check for Popper dependency
                     * Popper - https://popper.js.org
                     */
                    if (typeof Popper === 'undefined') {
                        throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
                    } // private


                    this._isEnabled = true;
                    this._timeout = 0;
                    this._hoverState = '';
                    this._activeTrigger = {};
                    this._popper = null; // Protected

                    this.element = element;
                    this.config = this._getConfig(config);
                    this.tip = null;

                    this._setListeners();
                } // Getters


                var _proto = Tooltip.prototype;

                // Public
                _proto.enable = function enable() {
                    this._isEnabled = true;
                };

                _proto.disable = function disable() {
                    this._isEnabled = false;
                };

                _proto.toggleEnabled = function toggleEnabled() {
                    this._isEnabled = !this._isEnabled;
                };

                _proto.toggle = function toggle(event) {
                    if (!this._isEnabled) {
                        return;
                    }

                    if (event) {
                        var dataKey = this.constructor.DATA_KEY;
                        var context = $$$1(event.currentTarget).data(dataKey);

                        if (!context) {
                            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                            $$$1(event.currentTarget).data(dataKey, context);
                        }

                        context._activeTrigger.click = !context._activeTrigger.click;

                        if (context._isWithActiveTrigger()) {
                            context._enter(null, context);
                        } else {
                            context._leave(null, context);
                        }
                    } else {
                        if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
                            this._leave(null, this);

                            return;
                        }

                        this._enter(null, this);
                    }
                };

                _proto.dispose = function dispose() {
                    clearTimeout(this._timeout);
                    $$$1.removeData(this.element, this.constructor.DATA_KEY);
                    $$$1(this.element).off(this.constructor.EVENT_KEY);
                    $$$1(this.element).closest('.modal').off('hide.bs.modal');

                    if (this.tip) {
                        $$$1(this.tip).remove();
                    }

                    this._isEnabled = null;
                    this._timeout = null;
                    this._hoverState = null;
                    this._activeTrigger = null;

                    if (this._popper !== null) {
                        this._popper.destroy();
                    }

                    this._popper = null;
                    this.element = null;
                    this.config = null;
                    this.tip = null;
                };

                _proto.show = function show() {
                    var _this = this;

                    if ($$$1(this.element).css('display') === 'none') {
                        throw new Error('Please use show on visible elements');
                    }

                    var showEvent = $$$1.Event(this.constructor.Event.SHOW);

                    if (this.isWithContent() && this._isEnabled) {
                        $$$1(this.element).trigger(showEvent);
                        var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

                        if (showEvent.isDefaultPrevented() || !isInTheDom) {
                            return;
                        }

                        var tip = this.getTipElement();
                        var tipId = Util.getUID(this.constructor.NAME);
                        tip.setAttribute('id', tipId);
                        this.element.setAttribute('aria-describedby', tipId);
                        this.setContent();

                        if (this.config.animation) {
                            $$$1(tip).addClass(ClassName.FADE);
                        }

                        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

                        var attachment = this._getAttachment(placement);

                        this.addAttachmentClass(attachment);
                        var container = this.config.container === false ? document.body : $$$1(this.config.container);
                        $$$1(tip).data(this.constructor.DATA_KEY, this);

                        if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
                            $$$1(tip).appendTo(container);
                        }

                        $$$1(this.element).trigger(this.constructor.Event.INSERTED);
                        this._popper = new Popper(this.element, tip, {
                            placement: attachment,
                            modifiers: {
                                offset: {
                                    offset: this.config.offset
                                },
                                flip: {
                                    behavior: this.config.fallbackPlacement
                                },
                                arrow: {
                                    element: Selector.ARROW
                                },
                                preventOverflow: {
                                    boundariesElement: this.config.boundary
                                }
                            },
                            onCreate: function onCreate(data) {
                                if (data.originalPlacement !== data.placement) {
                                    _this._handlePopperPlacementChange(data);
                                }
                            },
                            onUpdate: function onUpdate(data) {
                                _this._handlePopperPlacementChange(data);
                            }
                        });
                        $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
                        // empty mouseover listeners to the body's immediate children;
                        // only needed because of broken event delegation on iOS
                        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

                        if ('ontouchstart' in document.documentElement) {
                            $$$1('body').children().on('mouseover', null, $$$1.noop);
                        }

                        var complete = function complete() {
                            if (_this.config.animation) {
                                _this._fixTransition();
                            }

                            var prevHoverState = _this._hoverState;
                            _this._hoverState = null;
                            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

                            if (prevHoverState === HoverState.OUT) {
                                _this._leave(null, _this);
                            }
                        };

                        if (Util.supportsTransitionEnd() && $$$1(this.tip).hasClass(ClassName.FADE)) {
                            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
                        } else {
                            complete();
                        }
                    }
                };

                _proto.hide = function hide(callback) {
                    var _this2 = this;

                    var tip = this.getTipElement();
                    var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

                    var complete = function complete() {
                        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
                            tip.parentNode.removeChild(tip);
                        }

                        _this2._cleanTipClass();

                        _this2.element.removeAttribute('aria-describedby');

                        $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

                        if (_this2._popper !== null) {
                            _this2._popper.destroy();
                        }

                        if (callback) {
                            callback();
                        }
                    };

                    $$$1(this.element).trigger(hideEvent);

                    if (hideEvent.isDefaultPrevented()) {
                        return;
                    }

                    $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
                    // empty mouseover listeners we added for iOS support

                    if ('ontouchstart' in document.documentElement) {
                        $$$1('body').children().off('mouseover', null, $$$1.noop);
                    }

                    this._activeTrigger[Trigger.CLICK] = false;
                    this._activeTrigger[Trigger.FOCUS] = false;
                    this._activeTrigger[Trigger.HOVER] = false;

                    if (Util.supportsTransitionEnd() && $$$1(this.tip).hasClass(ClassName.FADE)) {
                        $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        complete();
                    }

                    this._hoverState = '';
                };

                _proto.update = function update() {
                    if (this._popper !== null) {
                        this._popper.scheduleUpdate();
                    }
                }; // Protected


                _proto.isWithContent = function isWithContent() {
                    return Boolean(this.getTitle());
                };

                _proto.addAttachmentClass = function addAttachmentClass(attachment) {
                    $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
                };

                _proto.getTipElement = function getTipElement() {
                    this.tip = this.tip || $$$1(this.config.template)[0];
                    return this.tip;
                };

                _proto.setContent = function setContent() {
                    var $tip = $$$1(this.getTipElement());
                    this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
                    $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
                };

                _proto.setElementContent = function setElementContent($element, content) {
                    var html = this.config.html;

                    if (typeof content === 'object' && (content.nodeType || content.jquery)) {
                        // Content is a DOM node or a jQuery
                        if (html) {
                            if (!$$$1(content).parent().is($element)) {
                                $element.empty().append(content);
                            }
                        } else {
                            $element.text($$$1(content).text());
                        }
                    } else {
                        $element[html ? 'html' : 'text'](content);
                    }
                };

                _proto.getTitle = function getTitle() {
                    var title = this.element.getAttribute('data-original-title');

                    if (!title) {
                        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
                    }

                    return title;
                }; // Private


                _proto._getAttachment = function _getAttachment(placement) {
                    return AttachmentMap[placement.toUpperCase()];
                };

                _proto._setListeners = function _setListeners() {
                    var _this3 = this;

                    var triggers = this.config.trigger.split(' ');
                    triggers.forEach(function(trigger) {
                        if (trigger === 'click') {
                            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function(event) {
                                return _this3.toggle(event);
                            });
                        } else if (trigger !== Trigger.MANUAL) {
                            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
                            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
                            $$$1(_this3.element).on(eventIn, _this3.config.selector, function(event) {
                                return _this3._enter(event);
                            }).on(eventOut, _this3.config.selector, function(event) {
                                return _this3._leave(event);
                            });
                        }

                        $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function() {
                            return _this3.hide();
                        });
                    });

                    if (this.config.selector) {
                        this.config = _extends({}, this.config, {
                            trigger: 'manual',
                            selector: ''
                        });
                    } else {
                        this._fixTitle();
                    }
                };

                _proto._fixTitle = function _fixTitle() {
                    var titleType = typeof this.element.getAttribute('data-original-title');

                    if (this.element.getAttribute('title') || titleType !== 'string') {
                        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
                        this.element.setAttribute('title', '');
                    }
                };

                _proto._enter = function _enter(event, context) {
                    var dataKey = this.constructor.DATA_KEY;
                    context = context || $$$1(event.currentTarget).data(dataKey);

                    if (!context) {
                        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                        $$$1(event.currentTarget).data(dataKey, context);
                    }

                    if (event) {
                        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
                    }

                    if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
                        context._hoverState = HoverState.SHOW;
                        return;
                    }

                    clearTimeout(context._timeout);
                    context._hoverState = HoverState.SHOW;

                    if (!context.config.delay || !context.config.delay.show) {
                        context.show();
                        return;
                    }

                    context._timeout = setTimeout(function() {
                        if (context._hoverState === HoverState.SHOW) {
                            context.show();
                        }
                    }, context.config.delay.show);
                };

                _proto._leave = function _leave(event, context) {
                    var dataKey = this.constructor.DATA_KEY;
                    context = context || $$$1(event.currentTarget).data(dataKey);

                    if (!context) {
                        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                        $$$1(event.currentTarget).data(dataKey, context);
                    }

                    if (event) {
                        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
                    }

                    if (context._isWithActiveTrigger()) {
                        return;
                    }

                    clearTimeout(context._timeout);
                    context._hoverState = HoverState.OUT;

                    if (!context.config.delay || !context.config.delay.hide) {
                        context.hide();
                        return;
                    }

                    context._timeout = setTimeout(function() {
                        if (context._hoverState === HoverState.OUT) {
                            context.hide();
                        }
                    }, context.config.delay.hide);
                };

                _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
                    for (var trigger in this._activeTrigger) {
                        if (this._activeTrigger[trigger]) {
                            return true;
                        }
                    }

                    return false;
                };

                _proto._getConfig = function _getConfig(config) {
                    config = _extends({}, this.constructor.Default, $$$1(this.element).data(), config);

                    if (typeof config.delay === 'number') {
                        config.delay = {
                            show: config.delay,
                            hide: config.delay
                        };
                    }

                    if (typeof config.title === 'number') {
                        config.title = config.title.toString();
                    }

                    if (typeof config.content === 'number') {
                        config.content = config.content.toString();
                    }

                    Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
                    return config;
                };

                _proto._getDelegateConfig = function _getDelegateConfig() {
                    var config = {};

                    if (this.config) {
                        for (var key in this.config) {
                            if (this.constructor.Default[key] !== this.config[key]) {
                                config[key] = this.config[key];
                            }
                        }
                    }

                    return config;
                };

                _proto._cleanTipClass = function _cleanTipClass() {
                    var $tip = $$$1(this.getTipElement());
                    var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

                    if (tabClass !== null && tabClass.length > 0) {
                        $tip.removeClass(tabClass.join(''));
                    }
                };

                _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(data) {
                    this._cleanTipClass();

                    this.addAttachmentClass(this._getAttachment(data.placement));
                };

                _proto._fixTransition = function _fixTransition() {
                    var tip = this.getTipElement();
                    var initConfigAnimation = this.config.animation;

                    if (tip.getAttribute('x-placement') !== null) {
                        return;
                    }

                    $$$1(tip).removeClass(ClassName.FADE);
                    this.config.animation = false;
                    this.hide();
                    this.show();
                    this.config.animation = initConfigAnimation;
                }; // Static


                Tooltip._jQueryInterface = function _jQueryInterface(config) {
                    return this.each(function() {
                        var data = $$$1(this).data(DATA_KEY);

                        var _config = typeof config === 'object' && config;

                        if (!data && /dispose|hide/.test(config)) {
                            return;
                        }

                        if (!data) {
                            data = new Tooltip(this, _config);
                            $$$1(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (typeof data[config] === 'undefined') {
                                throw new TypeError("No method named \"" + config + "\"");
                            }

                            data[config]();
                        }
                    });
                };

                _createClass(Tooltip, null, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }, {
                    key: "Default",
                    get: function get() {
                        return Default;
                    }
                }, {
                    key: "NAME",
                    get: function get() {
                        return NAME;
                    }
                }, {
                    key: "DATA_KEY",
                    get: function get() {
                        return DATA_KEY;
                    }
                }, {
                    key: "Event",
                    get: function get() {
                        return Event;
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function get() {
                        return EVENT_KEY;
                    }
                }, {
                    key: "DefaultType",
                    get: function get() {
                        return DefaultType;
                    }
                }]);
                return Tooltip;
            }();
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */


        $$$1.fn[NAME] = Tooltip._jQueryInterface;
        $$$1.fn[NAME].Constructor = Tooltip;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return Tooltip._jQueryInterface;
        };

        return Tooltip;
    }($, Popper);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): popover.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Popover = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'popover';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.popover';
        var EVENT_KEY = "." + DATA_KEY;
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var CLASS_PREFIX = 'bs-popover';
        var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
        var Default = _extends({}, Tooltip.Default, {
            placement: 'right',
            trigger: 'click',
            content: '',
            template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
        });
        var DefaultType = _extends({}, Tooltip.DefaultType, {
            content: '(string|element|function)'
        });
        var ClassName = {
            FADE: 'fade',
            SHOW: 'show'
        };
        var Selector = {
            TITLE: '.popover-header',
            CONTENT: '.popover-body'
        };
        var Event = {
            HIDE: "hide" + EVENT_KEY,
            HIDDEN: "hidden" + EVENT_KEY,
            SHOW: "show" + EVENT_KEY,
            SHOWN: "shown" + EVENT_KEY,
            INSERTED: "inserted" + EVENT_KEY,
            CLICK: "click" + EVENT_KEY,
            FOCUSIN: "focusin" + EVENT_KEY,
            FOCUSOUT: "focusout" + EVENT_KEY,
            MOUSEENTER: "mouseenter" + EVENT_KEY,
            MOUSELEAVE: "mouseleave" + EVENT_KEY
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var Popover =
            /*#__PURE__*/
            function(_Tooltip) {
                _inheritsLoose(Popover, _Tooltip);

                function Popover() {
                    return _Tooltip.apply(this, arguments) || this;
                }

                var _proto = Popover.prototype;

                // Overrides
                _proto.isWithContent = function isWithContent() {
                    return this.getTitle() || this._getContent();
                };

                _proto.addAttachmentClass = function addAttachmentClass(attachment) {
                    $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
                };

                _proto.getTipElement = function getTipElement() {
                    this.tip = this.tip || $$$1(this.config.template)[0];
                    return this.tip;
                };

                _proto.setContent = function setContent() {
                    var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

                    this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

                    var content = this._getContent();

                    if (typeof content === 'function') {
                        content = content.call(this.element);
                    }

                    this.setElementContent($tip.find(Selector.CONTENT), content);
                    $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
                }; // Private


                _proto._getContent = function _getContent() {
                    return this.element.getAttribute('data-content') || this.config.content;
                };

                _proto._cleanTipClass = function _cleanTipClass() {
                    var $tip = $$$1(this.getTipElement());
                    var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

                    if (tabClass !== null && tabClass.length > 0) {
                        $tip.removeClass(tabClass.join(''));
                    }
                }; // Static


                Popover._jQueryInterface = function _jQueryInterface(config) {
                    return this.each(function() {
                        var data = $$$1(this).data(DATA_KEY);

                        var _config = typeof config === 'object' ? config : null;

                        if (!data && /destroy|hide/.test(config)) {
                            return;
                        }

                        if (!data) {
                            data = new Popover(this, _config);
                            $$$1(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (typeof data[config] === 'undefined') {
                                throw new TypeError("No method named \"" + config + "\"");
                            }

                            data[config]();
                        }
                    });
                };

                _createClass(Popover, null, [{
                    key: "VERSION",
                    // Getters
                    get: function get() {
                        return VERSION;
                    }
                }, {
                    key: "Default",
                    get: function get() {
                        return Default;
                    }
                }, {
                    key: "NAME",
                    get: function get() {
                        return NAME;
                    }
                }, {
                    key: "DATA_KEY",
                    get: function get() {
                        return DATA_KEY;
                    }
                }, {
                    key: "Event",
                    get: function get() {
                        return Event;
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function get() {
                        return EVENT_KEY;
                    }
                }, {
                    key: "DefaultType",
                    get: function get() {
                        return DefaultType;
                    }
                }]);
                return Popover;
            }(Tooltip);
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */


        $$$1.fn[NAME] = Popover._jQueryInterface;
        $$$1.fn[NAME].Constructor = Popover;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return Popover._jQueryInterface;
        };

        return Popover;
    }($);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): scrollspy.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var ScrollSpy = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'scrollspy';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.scrollspy';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var Default = {
            offset: 10,
            method: 'auto',
            target: ''
        };
        var DefaultType = {
            offset: 'number',
            method: 'string',
            target: '(string|element)'
        };
        var Event = {
            ACTIVATE: "activate" + EVENT_KEY,
            SCROLL: "scroll" + EVENT_KEY,
            LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
            DROPDOWN_ITEM: 'dropdown-item',
            DROPDOWN_MENU: 'dropdown-menu',
            ACTIVE: 'active'
        };
        var Selector = {
            DATA_SPY: '[data-spy="scroll"]',
            ACTIVE: '.active',
            NAV_LIST_GROUP: '.nav, .list-group',
            NAV_LINKS: '.nav-link',
            NAV_ITEMS: '.nav-item',
            LIST_ITEMS: '.list-group-item',
            DROPDOWN: '.dropdown',
            DROPDOWN_ITEMS: '.dropdown-item',
            DROPDOWN_TOGGLE: '.dropdown-toggle'
        };
        var OffsetMethod = {
            OFFSET: 'offset',
            POSITION: 'position'
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var ScrollSpy =
            /*#__PURE__*/
            function() {
                function ScrollSpy(element, config) {
                    var _this = this;

                    this._element = element;
                    this._scrollElement = element.tagName === 'BODY' ? window : element;
                    this._config = this._getConfig(config);
                    this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
                    this._offsets = [];
                    this._targets = [];
                    this._activeTarget = null;
                    this._scrollHeight = 0;
                    $$$1(this._scrollElement).on(Event.SCROLL, function(event) {
                        return _this._process(event);
                    });
                    this.refresh();

                    this._process();
                } // Getters


                var _proto = ScrollSpy.prototype;

                // Public
                _proto.refresh = function refresh() {
                    var _this2 = this;

                    var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
                    var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
                    var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
                    this._offsets = [];
                    this._targets = [];
                    this._scrollHeight = this._getScrollHeight();
                    var targets = $$$1.makeArray($$$1(this._selector));
                    targets.map(function(element) {
                        var target;
                        var targetSelector = Util.getSelectorFromElement(element);

                        if (targetSelector) {
                            target = $$$1(targetSelector)[0];
                        }

                        if (target) {
                            var targetBCR = target.getBoundingClientRect();

                            if (targetBCR.width || targetBCR.height) {
                                // TODO (fat): remove sketch reliance on jQuery position/offset
                                return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
                            }
                        }

                        return null;
                    }).filter(function(item) {
                        return item;
                    }).sort(function(a, b) {
                        return a[0] - b[0];
                    }).forEach(function(item) {
                        _this2._offsets.push(item[0]);

                        _this2._targets.push(item[1]);
                    });
                };

                _proto.dispose = function dispose() {
                    $$$1.removeData(this._element, DATA_KEY);
                    $$$1(this._scrollElement).off(EVENT_KEY);
                    this._element = null;
                    this._scrollElement = null;
                    this._config = null;
                    this._selector = null;
                    this._offsets = null;
                    this._targets = null;
                    this._activeTarget = null;
                    this._scrollHeight = null;
                }; // Private


                _proto._getConfig = function _getConfig(config) {
                    config = _extends({}, Default, config);

                    if (typeof config.target !== 'string') {
                        var id = $$$1(config.target).attr('id');

                        if (!id) {
                            id = Util.getUID(NAME);
                            $$$1(config.target).attr('id', id);
                        }

                        config.target = "#" + id;
                    }

                    Util.typeCheckConfig(NAME, config, DefaultType);
                    return config;
                };

                _proto._getScrollTop = function _getScrollTop() {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
                };

                _proto._getScrollHeight = function _getScrollHeight() {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
                };

                _proto._getOffsetHeight = function _getOffsetHeight() {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
                };

                _proto._process = function _process() {
                    var scrollTop = this._getScrollTop() + this._config.offset;

                    var scrollHeight = this._getScrollHeight();

                    var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

                    if (this._scrollHeight !== scrollHeight) {
                        this.refresh();
                    }

                    if (scrollTop >= maxScroll) {
                        var target = this._targets[this._targets.length - 1];

                        if (this._activeTarget !== target) {
                            this._activate(target);
                        }

                        return;
                    }

                    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
                        this._activeTarget = null;

                        this._clear();

                        return;
                    }

                    for (var i = this._offsets.length; i--;) {
                        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

                        if (isActiveTarget) {
                            this._activate(this._targets[i]);
                        }
                    }
                };

                _proto._activate = function _activate(target) {
                    this._activeTarget = target;

                    this._clear();

                    var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


                    queries = queries.map(function(selector) {
                        return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
                    });
                    var $link = $$$1(queries.join(','));

                    if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
                        $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                        $link.addClass(ClassName.ACTIVE);
                    } else {
                        // Set triggered link as active
                        $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
                        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

                        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

                        $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
                    }

                    $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
                        relatedTarget: target
                    });
                };

                _proto._clear = function _clear() {
                    $$$1(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
                }; // Static


                ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
                    return this.each(function() {
                        var data = $$$1(this).data(DATA_KEY);

                        var _config = typeof config === 'object' && config;

                        if (!data) {
                            data = new ScrollSpy(this, _config);
                            $$$1(this).data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (typeof data[config] === 'undefined') {
                                throw new TypeError("No method named \"" + config + "\"");
                            }

                            data[config]();
                        }
                    });
                };

                _createClass(ScrollSpy, null, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }, {
                    key: "Default",
                    get: function get() {
                        return Default;
                    }
                }]);
                return ScrollSpy;
            }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $$$1(window).on(Event.LOAD_DATA_API, function() {
            var scrollSpys = $$$1.makeArray($$$1(Selector.DATA_SPY));

            for (var i = scrollSpys.length; i--;) {
                var $spy = $$$1(scrollSpys[i]);

                ScrollSpy._jQueryInterface.call($spy, $spy.data());
            }
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
        $$$1.fn[NAME].Constructor = ScrollSpy;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return ScrollSpy._jQueryInterface;
        };

        return ScrollSpy;
    }($);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0): tab.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    var Tab = function($$$1) {
        /**
         * ------------------------------------------------------------------------
         * Constants
         * ------------------------------------------------------------------------
         */
        var NAME = 'tab';
        var VERSION = '4.0.0';
        var DATA_KEY = 'bs.tab';
        var EVENT_KEY = "." + DATA_KEY;
        var DATA_API_KEY = '.data-api';
        var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
        var TRANSITION_DURATION = 150;
        var Event = {
            HIDE: "hide" + EVENT_KEY,
            HIDDEN: "hidden" + EVENT_KEY,
            SHOW: "show" + EVENT_KEY,
            SHOWN: "shown" + EVENT_KEY,
            CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
        };
        var ClassName = {
            DROPDOWN_MENU: 'dropdown-menu',
            ACTIVE: 'active',
            DISABLED: 'disabled',
            FADE: 'fade',
            SHOW: 'show'
        };
        var Selector = {
            DROPDOWN: '.dropdown',
            NAV_LIST_GROUP: '.nav, .list-group',
            ACTIVE: '.active',
            ACTIVE_UL: '> li > .active',
            DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
            DROPDOWN_TOGGLE: '.dropdown-toggle',
            DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
            /**
             * ------------------------------------------------------------------------
             * Class Definition
             * ------------------------------------------------------------------------
             */

        };

        var Tab =
            /*#__PURE__*/
            function() {
                function Tab(element) {
                    this._element = element;
                } // Getters


                var _proto = Tab.prototype;

                // Public
                _proto.show = function show() {
                    var _this = this;

                    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
                        return;
                    }

                    var target;
                    var previous;
                    var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
                    var selector = Util.getSelectorFromElement(this._element);

                    if (listElement) {
                        var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
                        previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
                        previous = previous[previous.length - 1];
                    }

                    var hideEvent = $$$1.Event(Event.HIDE, {
                        relatedTarget: this._element
                    });
                    var showEvent = $$$1.Event(Event.SHOW, {
                        relatedTarget: previous
                    });

                    if (previous) {
                        $$$1(previous).trigger(hideEvent);
                    }

                    $$$1(this._element).trigger(showEvent);

                    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                        return;
                    }

                    if (selector) {
                        target = $$$1(selector)[0];
                    }

                    this._activate(this._element, listElement);

                    var complete = function complete() {
                        var hiddenEvent = $$$1.Event(Event.HIDDEN, {
                            relatedTarget: _this._element
                        });
                        var shownEvent = $$$1.Event(Event.SHOWN, {
                            relatedTarget: previous
                        });
                        $$$1(previous).trigger(hiddenEvent);
                        $$$1(_this._element).trigger(shownEvent);
                    };

                    if (target) {
                        this._activate(target, target.parentNode, complete);
                    } else {
                        complete();
                    }
                };

                _proto.dispose = function dispose() {
                    $$$1.removeData(this._element, DATA_KEY);
                    this._element = null;
                }; // Private


                _proto._activate = function _activate(element, container, callback) {
                    var _this2 = this;

                    var activeElements;

                    if (container.nodeName === 'UL') {
                        activeElements = $$$1(container).find(Selector.ACTIVE_UL);
                    } else {
                        activeElements = $$$1(container).children(Selector.ACTIVE);
                    }

                    var active = activeElements[0];
                    var isTransitioning = callback && Util.supportsTransitionEnd() && active && $$$1(active).hasClass(ClassName.FADE);

                    var complete = function complete() {
                        return _this2._transitionComplete(element, active, callback);
                    };

                    if (active && isTransitioning) {
                        $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                    } else {
                        complete();
                    }
                };

                _proto._transitionComplete = function _transitionComplete(element, active, callback) {
                    if (active) {
                        $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
                        var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

                        if (dropdownChild) {
                            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
                        }

                        if (active.getAttribute('role') === 'tab') {
                            active.setAttribute('aria-selected', false);
                        }
                    }

                    $$$1(element).addClass(ClassName.ACTIVE);

                    if (element.getAttribute('role') === 'tab') {
                        element.setAttribute('aria-selected', true);
                    }

                    Util.reflow(element);
                    $$$1(element).addClass(ClassName.SHOW);

                    if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
                        var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

                        if (dropdownElement) {
                            $$$1(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                        }

                        element.setAttribute('aria-expanded', true);
                    }

                    if (callback) {
                        callback();
                    }
                }; // Static


                Tab._jQueryInterface = function _jQueryInterface(config) {
                    return this.each(function() {
                        var $this = $$$1(this);
                        var data = $this.data(DATA_KEY);

                        if (!data) {
                            data = new Tab(this);
                            $this.data(DATA_KEY, data);
                        }

                        if (typeof config === 'string') {
                            if (typeof data[config] === 'undefined') {
                                throw new TypeError("No method named \"" + config + "\"");
                            }

                            data[config]();
                        }
                    });
                };

                _createClass(Tab, null, [{
                    key: "VERSION",
                    get: function get() {
                        return VERSION;
                    }
                }]);
                return Tab;
            }();
        /**
         * ------------------------------------------------------------------------
         * Data Api implementation
         * ------------------------------------------------------------------------
         */


        $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
            event.preventDefault();

            Tab._jQueryInterface.call($$$1(this), 'show');
        });
        /**
         * ------------------------------------------------------------------------
         * jQuery
         * ------------------------------------------------------------------------
         */

        $$$1.fn[NAME] = Tab._jQueryInterface;
        $$$1.fn[NAME].Constructor = Tab;

        $$$1.fn[NAME].noConflict = function() {
            $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
            return Tab._jQueryInterface;
        };

        return Tab;
    }($);

    /**
     * --------------------------------------------------------------------------
     * Bootstrap (v4.0.0-alpha.6): index.js
     * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */

    (function($$$1) {
        if (typeof $$$1 === 'undefined') {
            throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
        }

        var version = $$$1.fn.jquery.split(' ')[0].split('.');
        var minMajor = 1;
        var ltMajor = 2;
        var minMinor = 9;
        var minPatch = 1;
        var maxMajor = 4;

        if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
            throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
        }
    })($);

    exports.Util = Util;
    exports.Alert = Alert;
    exports.Button = Button;
    exports.Carousel = Carousel;
    exports.Collapse = Collapse;
    exports.Dropdown = Dropdown;
    exports.Modal = Modal;
    exports.Popover = Popover;
    exports.Scrollspy = ScrollSpy;
    exports.Tab = Tab;
    exports.Tooltip = Tooltip;

    Object.defineProperty(exports, '__esModule', {
        value: true
    });

})));
//# sourceMappingURL=bootstrap.js.map

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Alert = function($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;
    var Selector = {
        DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
        CLOSE: "close" + EVENT_KEY,
        CLOSED: "closed" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        ALERT: 'alert',
        FADE: 'fade',
        SHOW: 'show'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Alert =
        /*#__PURE__*/
        function() {
            function Alert(element) {
                this._element = element;
            } // Getters


            var _proto = Alert.prototype;

            // Public
            _proto.close = function close(element) {
                element = element || this._element;

                var rootElement = this._getRootElement(element);

                var customEvent = this._triggerCloseEvent(rootElement);

                if (customEvent.isDefaultPrevented()) {
                    return;
                }

                this._removeElement(rootElement);
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                this._element = null;
            }; // Private


            _proto._getRootElement = function _getRootElement(element) {
                var selector = Util.getSelectorFromElement(element);
                var parent = false;

                if (selector) {
                    parent = $(selector)[0];
                }

                if (!parent) {
                    parent = $(element).closest("." + ClassName.ALERT)[0];
                }

                return parent;
            };

            _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
                var closeEvent = $.Event(Event.CLOSE);
                $(element).trigger(closeEvent);
                return closeEvent;
            };

            _proto._removeElement = function _removeElement(element) {
                var _this = this;

                $(element).removeClass(ClassName.SHOW);

                if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
                    this._destroyElement(element);

                    return;
                }

                $(element).one(Util.TRANSITION_END, function(event) {
                    return _this._destroyElement(element, event);
                }).emulateTransitionEnd(TRANSITION_DURATION);
            };

            _proto._destroyElement = function _destroyElement(element) {
                $(element).detach().trigger(Event.CLOSED).remove();
            }; // Static


            Alert._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var $element = $(this);
                    var data = $element.data(DATA_KEY);

                    if (!data) {
                        data = new Alert(this);
                        $element.data(DATA_KEY, data);
                    }

                    if (config === 'close') {
                        data[config](this);
                    }
                });
            };

            Alert._handleDismiss = function _handleDismiss(alertInstance) {
                return function(event) {
                    if (event) {
                        event.preventDefault();
                    }

                    alertInstance.close(this);
                };
            };

            _createClass(Alert, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }]);

            return Alert;
        }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Alert._jQueryInterface;
    $.fn[NAME].Constructor = Alert;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Alert._jQueryInterface;
    };

    return Alert;
}($);
//# sourceMappingURL=alert.js.map
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Button = function($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ClassName = {
        ACTIVE: 'active',
        BUTTON: 'btn',
        FOCUS: 'focus'
    };
    var Selector = {
        DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
        DATA_TOGGLE: '[data-toggle="buttons"]',
        INPUT: 'input',
        ACTIVE: '.active',
        BUTTON: '.btn'
    };
    var Event = {
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
        FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Button =
        /*#__PURE__*/
        function() {
            function Button(element) {
                this._element = element;
            } // Getters


            var _proto = Button.prototype;

            // Public
            _proto.toggle = function toggle() {
                var triggerChangeEvent = true;
                var addAriaPressed = true;
                var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

                if (rootElement) {
                    var input = $(this._element).find(Selector.INPUT)[0];

                    if (input) {
                        if (input.type === 'radio') {
                            if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                                triggerChangeEvent = false;
                            } else {
                                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                                if (activeElement) {
                                    $(activeElement).removeClass(ClassName.ACTIVE);
                                }
                            }
                        }

                        if (triggerChangeEvent) {
                            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                                return;
                            }

                            input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
                            $(input).trigger('change');
                        }

                        input.focus();
                        addAriaPressed = false;
                    }
                }

                if (addAriaPressed) {
                    this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
                }

                if (triggerChangeEvent) {
                    $(this._element).toggleClass(ClassName.ACTIVE);
                }
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                this._element = null;
            }; // Static


            Button._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY);

                    if (!data) {
                        data = new Button(this);
                        $(this).data(DATA_KEY, data);
                    }

                    if (config === 'toggle') {
                        data[config]();
                    }
                });
            };

            _createClass(Button, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }]);

            return Button;
        }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function(event) {
        event.preventDefault();
        var button = event.target;

        if (!$(button).hasClass(ClassName.BUTTON)) {
            button = $(button).closest(Selector.BUTTON);
        }

        Button._jQueryInterface.call($(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function(event) {
        var button = $(event.target).closest(Selector.BUTTON)[0];
        $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Button._jQueryInterface;
    $.fn[NAME].Constructor = Button;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Button._jQueryInterface;
    };

    return Button;
}($);
//# sourceMappingURL=button.js.map
function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Carousel = function($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
        interval: 5000,
        keyboard: true,
        slide: false,
        pause: 'hover',
        wrap: true
    };
    var DefaultType = {
        interval: '(number|boolean)',
        keyboard: 'boolean',
        slide: '(boolean|string)',
        pause: '(string|boolean)',
        wrap: 'boolean'
    };
    var Direction = {
        NEXT: 'next',
        PREV: 'prev',
        LEFT: 'left',
        RIGHT: 'right'
    };
    var Event = {
        SLIDE: "slide" + EVENT_KEY,
        SLID: "slid" + EVENT_KEY,
        KEYDOWN: "keydown" + EVENT_KEY,
        MOUSEENTER: "mouseenter" + EVENT_KEY,
        MOUSELEAVE: "mouseleave" + EVENT_KEY,
        TOUCHEND: "touchend" + EVENT_KEY,
        LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        CAROUSEL: 'carousel',
        ACTIVE: 'active',
        SLIDE: 'slide',
        RIGHT: 'carousel-item-right',
        LEFT: 'carousel-item-left',
        NEXT: 'carousel-item-next',
        PREV: 'carousel-item-prev',
        ITEM: 'carousel-item'
    };
    var Selector = {
        ACTIVE: '.active',
        ACTIVE_ITEM: '.active.carousel-item',
        ITEM: '.carousel-item',
        NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
        INDICATORS: '.carousel-indicators',
        DATA_SLIDE: '[data-slide], [data-slide-to]',
        DATA_RIDE: '[data-ride="carousel"]'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Carousel =
        /*#__PURE__*/
        function() {
            function Carousel(element, config) {
                this._items = null;
                this._interval = null;
                this._activeElement = null;
                this._isPaused = false;
                this._isSliding = false;
                this.touchTimeout = null;
                this._config = this._getConfig(config);
                this._element = $(element)[0];
                this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

                this._addEventListeners();
            } // Getters


            var _proto = Carousel.prototype;

            // Public
            _proto.next = function next() {
                if (!this._isSliding) {
                    this._slide(Direction.NEXT);
                }
            };

            _proto.nextWhenVisible = function nextWhenVisible() {
                // Don't call next when the page isn't visible
                // or the carousel or its parent isn't visible
                if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
                    this.next();
                }
            };

            _proto.prev = function prev() {
                if (!this._isSliding) {
                    this._slide(Direction.PREV);
                }
            };

            _proto.pause = function pause(event) {
                if (!event) {
                    this._isPaused = true;
                }

                if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
                    Util.triggerTransitionEnd(this._element);
                    this.cycle(true);
                }

                clearInterval(this._interval);
                this._interval = null;
            };

            _proto.cycle = function cycle(event) {
                if (!event) {
                    this._isPaused = false;
                }

                if (this._interval) {
                    clearInterval(this._interval);
                    this._interval = null;
                }

                if (this._config.interval && !this._isPaused) {
                    this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
                }
            };

            _proto.to = function to(index) {
                var _this = this;

                this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

                var activeIndex = this._getItemIndex(this._activeElement);

                if (index > this._items.length - 1 || index < 0) {
                    return;
                }

                if (this._isSliding) {
                    $(this._element).one(Event.SLID, function() {
                        return _this.to(index);
                    });
                    return;
                }

                if (activeIndex === index) {
                    this.pause();
                    this.cycle();
                    return;
                }

                var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

                this._slide(direction, this._items[index]);
            };

            _proto.dispose = function dispose() {
                $(this._element).off(EVENT_KEY);
                $.removeData(this._element, DATA_KEY);
                this._items = null;
                this._config = null;
                this._element = null;
                this._interval = null;
                this._isPaused = null;
                this._isSliding = null;
                this._activeElement = null;
                this._indicatorsElement = null;
            }; // Private


            _proto._getConfig = function _getConfig(config) {
                config = _extends({}, Default, config);
                Util.typeCheckConfig(NAME, config, DefaultType);
                return config;
            };

            _proto._addEventListeners = function _addEventListeners() {
                var _this2 = this;

                if (this._config.keyboard) {
                    $(this._element).on(Event.KEYDOWN, function(event) {
                        return _this2._keydown(event);
                    });
                }

                if (this._config.pause === 'hover') {
                    $(this._element).on(Event.MOUSEENTER, function(event) {
                        return _this2.pause(event);
                    }).on(Event.MOUSELEAVE, function(event) {
                        return _this2.cycle(event);
                    });

                    if ('ontouchstart' in document.documentElement) {
                        // If it's a touch-enabled device, mouseenter/leave are fired as
                        // part of the mouse compatibility events on first tap - the carousel
                        // would stop cycling until user tapped out of it;
                        // here, we listen for touchend, explicitly pause the carousel
                        // (as if it's the second time we tap on it, mouseenter compat event
                        // is NOT fired) and after a timeout (to allow for mouse compatibility
                        // events to fire) we explicitly restart cycling
                        $(this._element).on(Event.TOUCHEND, function() {
                            _this2.pause();

                            if (_this2.touchTimeout) {
                                clearTimeout(_this2.touchTimeout);
                            }

                            _this2.touchTimeout = setTimeout(function(event) {
                                return _this2.cycle(event);
                            }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
                        });
                    }
                }
            };

            _proto._keydown = function _keydown(event) {
                if (/input|textarea/i.test(event.target.tagName)) {
                    return;
                }

                switch (event.which) {
                    case ARROW_LEFT_KEYCODE:
                        event.preventDefault();
                        this.prev();
                        break;

                    case ARROW_RIGHT_KEYCODE:
                        event.preventDefault();
                        this.next();
                        break;

                    default:
                }
            };

            _proto._getItemIndex = function _getItemIndex(element) {
                this._items = $.makeArray($(element).parent().find(Selector.ITEM));
                return this._items.indexOf(element);
            };

            _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
                var isNextDirection = direction === Direction.NEXT;
                var isPrevDirection = direction === Direction.PREV;

                var activeIndex = this._getItemIndex(activeElement);

                var lastItemIndex = this._items.length - 1;
                var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

                if (isGoingToWrap && !this._config.wrap) {
                    return activeElement;
                }

                var delta = direction === Direction.PREV ? -1 : 1;
                var itemIndex = (activeIndex + delta) % this._items.length;
                return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
            };

            _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
                var targetIndex = this._getItemIndex(relatedTarget);

                var fromIndex = this._getItemIndex($(this._element).find(Selector.ACTIVE_ITEM)[0]);

                var slideEvent = $.Event(Event.SLIDE, {
                    relatedTarget: relatedTarget,
                    direction: eventDirectionName,
                    from: fromIndex,
                    to: targetIndex
                });
                $(this._element).trigger(slideEvent);
                return slideEvent;
            };

            _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
                if (this._indicatorsElement) {
                    $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

                    var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

                    if (nextIndicator) {
                        $(nextIndicator).addClass(ClassName.ACTIVE);
                    }
                }
            };

            _proto._slide = function _slide(direction, element) {
                var _this3 = this;

                var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

                var activeElementIndex = this._getItemIndex(activeElement);

                var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

                var nextElementIndex = this._getItemIndex(nextElement);

                var isCycling = Boolean(this._interval);
                var directionalClassName;
                var orderClassName;
                var eventDirectionName;

                if (direction === Direction.NEXT) {
                    directionalClassName = ClassName.LEFT;
                    orderClassName = ClassName.NEXT;
                    eventDirectionName = Direction.LEFT;
                } else {
                    directionalClassName = ClassName.RIGHT;
                    orderClassName = ClassName.PREV;
                    eventDirectionName = Direction.RIGHT;
                }

                if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
                    this._isSliding = false;
                    return;
                }

                var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

                if (slideEvent.isDefaultPrevented()) {
                    return;
                }

                if (!activeElement || !nextElement) {
                    // Some weirdness is happening, so we bail
                    return;
                }

                this._isSliding = true;

                if (isCycling) {
                    this.pause();
                }

                this._setActiveIndicatorElement(nextElement);

                var slidEvent = $.Event(Event.SLID, {
                    relatedTarget: nextElement,
                    direction: eventDirectionName,
                    from: activeElementIndex,
                    to: nextElementIndex
                });

                if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {
                    $(nextElement).addClass(orderClassName);
                    Util.reflow(nextElement);
                    $(activeElement).addClass(directionalClassName);
                    $(nextElement).addClass(directionalClassName);
                    $(activeElement).one(Util.TRANSITION_END, function() {
                        $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
                        $(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
                        _this3._isSliding = false;
                        setTimeout(function() {
                            return $(_this3._element).trigger(slidEvent);
                        }, 0);
                    }).emulateTransitionEnd(TRANSITION_DURATION);
                } else {
                    $(activeElement).removeClass(ClassName.ACTIVE);
                    $(nextElement).addClass(ClassName.ACTIVE);
                    this._isSliding = false;
                    $(this._element).trigger(slidEvent);
                }

                if (isCycling) {
                    this.cycle();
                }
            }; // Static


            Carousel._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY);

                    var _config = _extends({}, Default, $(this).data());

                    if (typeof config === 'object') {
                        _config = _extends({}, _config, config);
                    }

                    var action = typeof config === 'string' ? config : _config.slide;

                    if (!data) {
                        data = new Carousel(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'number') {
                        data.to(config);
                    } else if (typeof action === 'string') {
                        if (typeof data[action] === 'undefined') {
                            throw new TypeError("No method named \"" + action + "\"");
                        }

                        data[action]();
                    } else if (_config.interval) {
                        data.pause();
                        data.cycle();
                    }
                });
            };

            Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
                var selector = Util.getSelectorFromElement(this);

                if (!selector) {
                    return;
                }

                var target = $(selector)[0];

                if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
                    return;
                }

                var config = _extends({}, $(target).data(), $(this).data());

                var slideIndex = this.getAttribute('data-slide-to');

                if (slideIndex) {
                    config.interval = false;
                }

                Carousel._jQueryInterface.call($(target), config);

                if (slideIndex) {
                    $(target).data(DATA_KEY).to(slideIndex);
                }

                event.preventDefault();
            };

            _createClass(Carousel, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default;
                }
            }]);

            return Carousel;
        }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $(window).on(Event.LOAD_DATA_API, function() {
        $(Selector.DATA_RIDE).each(function() {
            var $carousel = $(this);

            Carousel._jQueryInterface.call($carousel, $carousel.data());
        });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Carousel._jQueryInterface;
    $.fn[NAME].Constructor = Carousel;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Carousel._jQueryInterface;
    };

    return Carousel;
}($);
//# sourceMappingURL=carousel.js.map
function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Collapse = function($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 600;
    var Default = {
        toggle: true,
        parent: ''
    };
    var DefaultType = {
        toggle: 'boolean',
        parent: '(string|element)'
    };
    var Event = {
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        SHOW: 'show',
        COLLAPSE: 'collapse',
        COLLAPSING: 'collapsing',
        COLLAPSED: 'collapsed'
    };
    var Dimension = {
        WIDTH: 'width',
        HEIGHT: 'height'
    };
    var Selector = {
        ACTIVES: '.show, .collapsing',
        DATA_TOGGLE: '[data-toggle="collapse"]'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Collapse =
        /*#__PURE__*/
        function() {
            function Collapse(element, config) {
                this._isTransitioning = false;
                this._element = element;
                this._config = this._getConfig(config);
                this._triggerArray = $.makeArray($("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
                var tabToggles = $(Selector.DATA_TOGGLE);

                for (var i = 0; i < tabToggles.length; i++) {
                    var elem = tabToggles[i];
                    var selector = Util.getSelectorFromElement(elem);

                    if (selector !== null && $(selector).filter(element).length > 0) {
                        this._selector = selector;

                        this._triggerArray.push(elem);
                    }
                }

                this._parent = this._config.parent ? this._getParent() : null;

                if (!this._config.parent) {
                    this._addAriaAndCollapsedClass(this._element, this._triggerArray);
                }

                if (this._config.toggle) {
                    this.toggle();
                }
            } // Getters


            var _proto = Collapse.prototype;

            // Public
            _proto.toggle = function toggle() {
                if ($(this._element).hasClass(ClassName.SHOW)) {
                    this.hide();
                } else {
                    this.show();
                }
            };

            _proto.show = function show() {
                var _this = this;

                if (this._isTransitioning || $(this._element).hasClass(ClassName.SHOW)) {
                    return;
                }

                var actives;
                var activesData;

                if (this._parent) {
                    actives = $.makeArray($(this._parent).find(Selector.ACTIVES).filter("[data-parent=\"" + this._config.parent + "\"]"));

                    if (actives.length === 0) {
                        actives = null;
                    }
                }

                if (actives) {
                    activesData = $(actives).not(this._selector).data(DATA_KEY);

                    if (activesData && activesData._isTransitioning) {
                        return;
                    }
                }

                var startEvent = $.Event(Event.SHOW);
                $(this._element).trigger(startEvent);

                if (startEvent.isDefaultPrevented()) {
                    return;
                }

                if (actives) {
                    Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

                    if (!activesData) {
                        $(actives).data(DATA_KEY, null);
                    }
                }

                var dimension = this._getDimension();

                $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
                this._element.style[dimension] = 0;

                if (this._triggerArray.length > 0) {
                    $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
                }

                this.setTransitioning(true);

                var complete = function complete() {
                    $(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
                    _this._element.style[dimension] = '';

                    _this.setTransitioning(false);

                    $(_this._element).trigger(Event.SHOWN);
                };

                if (!Util.supportsTransitionEnd()) {
                    complete();
                    return;
                }

                var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
                var scrollSize = "scroll" + capitalizedDimension;
                $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                this._element.style[dimension] = this._element[scrollSize] + "px";
            };

            _proto.hide = function hide() {
                var _this2 = this;

                if (this._isTransitioning || !$(this._element).hasClass(ClassName.SHOW)) {
                    return;
                }

                var startEvent = $.Event(Event.HIDE);
                $(this._element).trigger(startEvent);

                if (startEvent.isDefaultPrevented()) {
                    return;
                }

                var dimension = this._getDimension();

                this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
                Util.reflow(this._element);
                $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);

                if (this._triggerArray.length > 0) {
                    for (var i = 0; i < this._triggerArray.length; i++) {
                        var trigger = this._triggerArray[i];
                        var selector = Util.getSelectorFromElement(trigger);

                        if (selector !== null) {
                            var $elem = $(selector);

                            if (!$elem.hasClass(ClassName.SHOW)) {
                                $(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
                            }
                        }
                    }
                }

                this.setTransitioning(true);

                var complete = function complete() {
                    _this2.setTransitioning(false);

                    $(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
                };

                this._element.style[dimension] = '';

                if (!Util.supportsTransitionEnd()) {
                    complete();
                    return;
                }

                $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
            };

            _proto.setTransitioning = function setTransitioning(isTransitioning) {
                this._isTransitioning = isTransitioning;
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                this._config = null;
                this._parent = null;
                this._element = null;
                this._triggerArray = null;
                this._isTransitioning = null;
            }; // Private


            _proto._getConfig = function _getConfig(config) {
                config = _extends({}, Default, config);
                config.toggle = Boolean(config.toggle); // Coerce string values

                Util.typeCheckConfig(NAME, config, DefaultType);
                return config;
            };

            _proto._getDimension = function _getDimension() {
                var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
                return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
            };

            _proto._getParent = function _getParent() {
                var _this3 = this;

                var parent = null;

                if (Util.isElement(this._config.parent)) {
                    parent = this._config.parent; // It's a jQuery object

                    if (typeof this._config.parent.jquery !== 'undefined') {
                        parent = this._config.parent[0];
                    }
                } else {
                    parent = $(this._config.parent)[0];
                }

                var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
                $(parent).find(selector).each(function(i, element) {
                    _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
                });
                return parent;
            };

            _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
                if (element) {
                    var isOpen = $(element).hasClass(ClassName.SHOW);

                    if (triggerArray.length > 0) {
                        $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
                    }
                }
            }; // Static


            Collapse._getTargetFromElement = function _getTargetFromElement(element) {
                var selector = Util.getSelectorFromElement(element);
                return selector ? $(selector)[0] : null;
            };

            Collapse._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var $this = $(this);
                    var data = $this.data(DATA_KEY);

                    var _config = _extends({}, Default, $this.data(), typeof config === 'object' && config);

                    if (!data && _config.toggle && /show|hide/.test(config)) {
                        _config.toggle = false;
                    }

                    if (!data) {
                        data = new Collapse(this, _config);
                        $this.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            _createClass(Collapse, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default;
                }
            }]);

            return Collapse;
        }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
        // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
        if (event.currentTarget.tagName === 'A') {
            event.preventDefault();
        }

        var $trigger = $(this);
        var selector = Util.getSelectorFromElement(this);
        $(selector).each(function() {
            var $target = $(this);
            var data = $target.data(DATA_KEY);
            var config = data ? 'toggle' : $trigger.data();

            Collapse._jQueryInterface.call($target, config);
        });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Collapse._jQueryInterface;
    $.fn[NAME].Constructor = Collapse;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Collapse._jQueryInterface;
    };

    return Collapse;
}($);
//# sourceMappingURL=collapse.js.map
function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Dropdown = function($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        CLICK: "click" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
        KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
        KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        DISABLED: 'disabled',
        SHOW: 'show',
        DROPUP: 'dropup',
        DROPRIGHT: 'dropright',
        DROPLEFT: 'dropleft',
        MENURIGHT: 'dropdown-menu-right',
        MENULEFT: 'dropdown-menu-left',
        POSITION_STATIC: 'position-static'
    };
    var Selector = {
        DATA_TOGGLE: '[data-toggle="dropdown"]',
        FORM_CHILD: '.dropdown form',
        MENU: '.dropdown-menu',
        NAVBAR_NAV: '.navbar-nav',
        VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled)'
    };
    var AttachmentMap = {
        TOP: 'top-start',
        TOPEND: 'top-end',
        BOTTOM: 'bottom-start',
        BOTTOMEND: 'bottom-end',
        RIGHT: 'right-start',
        RIGHTEND: 'right-end',
        LEFT: 'left-start',
        LEFTEND: 'left-end'
    };
    var Default = {
        offset: 0,
        flip: true,
        boundary: 'scrollParent'
    };
    var DefaultType = {
        offset: '(number|string|function)',
        flip: 'boolean',
        boundary: '(string|element)'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Dropdown =
        /*#__PURE__*/
        function() {
            function Dropdown(element, config) {
                this._element = element;
                this._popper = null;
                this._config = this._getConfig(config);
                this._menu = this._getMenuElement();
                this._inNavbar = this._detectNavbar();

                this._addEventListeners();
            } // Getters


            var _proto = Dropdown.prototype;

            // Public
            _proto.toggle = function toggle() {
                if (this._element.disabled || $(this._element).hasClass(ClassName.DISABLED)) {
                    return;
                }

                var parent = Dropdown._getParentFromElement(this._element);

                var isActive = $(this._menu).hasClass(ClassName.SHOW);

                Dropdown._clearMenus();

                if (isActive) {
                    return;
                }

                var relatedTarget = {
                    relatedTarget: this._element
                };
                var showEvent = $.Event(Event.SHOW, relatedTarget);
                $(parent).trigger(showEvent);

                if (showEvent.isDefaultPrevented()) {
                    return;
                } // Disable totally Popper.js for Dropdown in Navbar


                if (!this._inNavbar) {
                    /**
                     * Check for Popper dependency
                     * Popper - https://popper.js.org
                     */
                    if (typeof Popper === 'undefined') {
                        throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
                    }

                    var element = this._element; // For dropup with alignment we use the parent as popper container

                    if ($(parent).hasClass(ClassName.DROPUP)) {
                        if ($(this._menu).hasClass(ClassName.MENULEFT) || $(this._menu).hasClass(ClassName.MENURIGHT)) {
                            element = parent;
                        }
                    } // If boundary is not `scrollParent`, then set position to `static`
                    // to allow the menu to "escape" the scroll parent's boundaries
                    // https://github.com/twbs/bootstrap/issues/24251


                    if (this._config.boundary !== 'scrollParent') {
                        $(parent).addClass(ClassName.POSITION_STATIC);
                    }

                    this._popper = new Popper(element, this._menu, this._getPopperConfig());
                } // If this is a touch-enabled device we add extra
                // empty mouseover listeners to the body's immediate children;
                // only needed because of broken event delegation on iOS
                // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


                if ('ontouchstart' in document.documentElement && $(parent).closest(Selector.NAVBAR_NAV).length === 0) {
                    $('body').children().on('mouseover', null, $.noop);
                }

                this._element.focus();

                this._element.setAttribute('aria-expanded', true);

                $(this._menu).toggleClass(ClassName.SHOW);
                $(parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                $(this._element).off(EVENT_KEY);
                this._element = null;
                this._menu = null;

                if (this._popper !== null) {
                    this._popper.destroy();

                    this._popper = null;
                }
            };

            _proto.update = function update() {
                this._inNavbar = this._detectNavbar();

                if (this._popper !== null) {
                    this._popper.scheduleUpdate();
                }
            }; // Private


            _proto._addEventListeners = function _addEventListeners() {
                var _this = this;

                $(this._element).on(Event.CLICK, function(event) {
                    event.preventDefault();
                    event.stopPropagation();

                    _this.toggle();
                });
            };

            _proto._getConfig = function _getConfig(config) {
                config = _extends({}, this.constructor.Default, $(this._element).data(), config);
                Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
                return config;
            };

            _proto._getMenuElement = function _getMenuElement() {
                if (!this._menu) {
                    var parent = Dropdown._getParentFromElement(this._element);

                    this._menu = $(parent).find(Selector.MENU)[0];
                }

                return this._menu;
            };

            _proto._getPlacement = function _getPlacement() {
                var $parentDropdown = $(this._element).parent();
                var placement = AttachmentMap.BOTTOM; // Handle dropup

                if ($parentDropdown.hasClass(ClassName.DROPUP)) {
                    placement = AttachmentMap.TOP;

                    if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
                        placement = AttachmentMap.TOPEND;
                    }
                } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
                    placement = AttachmentMap.RIGHT;
                } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
                    placement = AttachmentMap.LEFT;
                } else if ($(this._menu).hasClass(ClassName.MENURIGHT)) {
                    placement = AttachmentMap.BOTTOMEND;
                }

                return placement;
            };

            _proto._detectNavbar = function _detectNavbar() {
                return $(this._element).closest('.navbar').length > 0;
            };

            _proto._getPopperConfig = function _getPopperConfig() {
                var _this2 = this;

                var offsetConf = {};

                if (typeof this._config.offset === 'function') {
                    offsetConf.fn = function(data) {
                        data.offsets = _extends({}, data.offsets, _this2._config.offset(data.offsets) || {});
                        return data;
                    };
                } else {
                    offsetConf.offset = this._config.offset;
                }

                var popperConfig = {
                    placement: this._getPlacement(),
                    modifiers: {
                        offset: offsetConf,
                        flip: {
                            enabled: this._config.flip
                        },
                        preventOverflow: {
                            boundariesElement: this._config.boundary
                        }
                    }
                };
                return popperConfig;
            }; // Static


            Dropdown._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY);

                    var _config = typeof config === 'object' ? config : null;

                    if (!data) {
                        data = new Dropdown(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            Dropdown._clearMenus = function _clearMenus(event) {
                if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
                    return;
                }

                var toggles = $.makeArray($(Selector.DATA_TOGGLE));

                for (var i = 0; i < toggles.length; i++) {
                    var parent = Dropdown._getParentFromElement(toggles[i]);

                    var context = $(toggles[i]).data(DATA_KEY);
                    var relatedTarget = {
                        relatedTarget: toggles[i]
                    };

                    if (!context) {
                        continue;
                    }

                    var dropdownMenu = context._menu;

                    if (!$(parent).hasClass(ClassName.SHOW)) {
                        continue;
                    }

                    if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
                        continue;
                    }

                    var hideEvent = $.Event(Event.HIDE, relatedTarget);
                    $(parent).trigger(hideEvent);

                    if (hideEvent.isDefaultPrevented()) {
                        continue;
                    } // If this is a touch-enabled device we remove the extra
                    // empty mouseover listeners we added for iOS support


                    if ('ontouchstart' in document.documentElement) {
                        $('body').children().off('mouseover', null, $.noop);
                    }

                    toggles[i].setAttribute('aria-expanded', 'false');
                    $(dropdownMenu).removeClass(ClassName.SHOW);
                    $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
                }
            };

            Dropdown._getParentFromElement = function _getParentFromElement(element) {
                var parent;
                var selector = Util.getSelectorFromElement(element);

                if (selector) {
                    parent = $(selector)[0];
                }

                return parent || element.parentNode;
            }; // eslint-disable-next-line complexity


            Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
                // If not input/textarea:
                //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
                // If input/textarea:
                //  - If space key => not a dropdown command
                //  - If key is other than escape
                //    - If key is not up or down => not a dropdown command
                //    - If trigger inside the menu => not a dropdown command
                if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();

                if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
                    return;
                }

                var parent = Dropdown._getParentFromElement(this);

                var isActive = $(parent).hasClass(ClassName.SHOW);

                if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
                    if (event.which === ESCAPE_KEYCODE) {
                        var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
                        $(toggle).trigger('focus');
                    }

                    $(this).trigger('click');
                    return;
                }

                var items = $(parent).find(Selector.VISIBLE_ITEMS).get();

                if (items.length === 0) {
                    return;
                }

                var index = items.indexOf(event.target);

                if (event.which === ARROW_UP_KEYCODE && index > 0) {
                    // Up
                    index--;
                }

                if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
                    // Down
                    index++;
                }

                if (index < 0) {
                    index = 0;
                }

                items[index].focus();
            };

            _createClass(Dropdown, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType;
                }
            }]);

            return Dropdown;
        }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
        event.preventDefault();
        event.stopPropagation();

        Dropdown._jQueryInterface.call($(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function(e) {
        e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Dropdown._jQueryInterface;
    $.fn[NAME].Constructor = Dropdown;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Dropdown._jQueryInterface;
    };

    return Dropdown;
}($, Popper);
//# sourceMappingURL=dropdown.js.map
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.6): index.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
(function($) {
    if (typeof $ === 'undefined') {
        throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
        throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
})($);
//# sourceMappingURL=index.js.map
function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Modal = function($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 300;
    var BACKDROP_TRANSITION_DURATION = 150;
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: true
    };
    var DefaultType = {
        backdrop: '(boolean|string)',
        keyboard: 'boolean',
        focus: 'boolean',
        show: 'boolean'
    };
    var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        FOCUSIN: "focusin" + EVENT_KEY,
        RESIZE: "resize" + EVENT_KEY,
        CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
        KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
        MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
        MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
        BACKDROP: 'modal-backdrop',
        OPEN: 'modal-open',
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector = {
        DIALOG: '.modal-dialog',
        DATA_TOGGLE: '[data-toggle="modal"]',
        DATA_DISMISS: '[data-dismiss="modal"]',
        FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
        STICKY_CONTENT: '.sticky-top',
        NAVBAR_TOGGLER: '.navbar-toggler'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Modal =
        /*#__PURE__*/
        function() {
            function Modal(element, config) {
                this._config = this._getConfig(config);
                this._element = element;
                this._dialog = $(element).find(Selector.DIALOG)[0];
                this._backdrop = null;
                this._isShown = false;
                this._isBodyOverflowing = false;
                this._ignoreBackdropClick = false;
                this._originalBodyPadding = 0;
                this._scrollbarWidth = 0;
            } // Getters


            var _proto = Modal.prototype;

            // Public
            _proto.toggle = function toggle(relatedTarget) {
                return this._isShown ? this.hide() : this.show(relatedTarget);
            };

            _proto.show = function show(relatedTarget) {
                var _this = this;

                if (this._isTransitioning || this._isShown) {
                    return;
                }

                if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
                    this._isTransitioning = true;
                }

                var showEvent = $.Event(Event.SHOW, {
                    relatedTarget: relatedTarget
                });
                $(this._element).trigger(showEvent);

                if (this._isShown || showEvent.isDefaultPrevented()) {
                    return;
                }

                this._isShown = true;

                this._checkScrollbar();

                this._setScrollbar();

                this._adjustDialog();

                $(document.body).addClass(ClassName.OPEN);

                this._setEscapeEvent();

                this._setResizeEvent();

                $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function(event) {
                    return _this.hide(event);
                });
                $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function() {
                    $(_this._element).one(Event.MOUSEUP_DISMISS, function(event) {
                        if ($(event.target).is(_this._element)) {
                            _this._ignoreBackdropClick = true;
                        }
                    });
                });

                this._showBackdrop(function() {
                    return _this._showElement(relatedTarget);
                });
            };

            _proto.hide = function hide(event) {
                var _this2 = this;

                if (event) {
                    event.preventDefault();
                }

                if (this._isTransitioning || !this._isShown) {
                    return;
                }

                var hideEvent = $.Event(Event.HIDE);
                $(this._element).trigger(hideEvent);

                if (!this._isShown || hideEvent.isDefaultPrevented()) {
                    return;
                }

                this._isShown = false;
                var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

                if (transition) {
                    this._isTransitioning = true;
                }

                this._setEscapeEvent();

                this._setResizeEvent();

                $(document).off(Event.FOCUSIN);
                $(this._element).removeClass(ClassName.SHOW);
                $(this._element).off(Event.CLICK_DISMISS);
                $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

                if (transition) {
                    $(this._element).one(Util.TRANSITION_END, function(event) {
                        return _this2._hideModal(event);
                    }).emulateTransitionEnd(TRANSITION_DURATION);
                } else {
                    this._hideModal();
                }
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                $(window, document, this._element, this._backdrop).off(EVENT_KEY);
                this._config = null;
                this._element = null;
                this._dialog = null;
                this._backdrop = null;
                this._isShown = null;
                this._isBodyOverflowing = null;
                this._ignoreBackdropClick = null;
                this._scrollbarWidth = null;
            };

            _proto.handleUpdate = function handleUpdate() {
                this._adjustDialog();
            }; // Private


            _proto._getConfig = function _getConfig(config) {
                config = _extends({}, Default, config);
                Util.typeCheckConfig(NAME, config, DefaultType);
                return config;
            };

            _proto._showElement = function _showElement(relatedTarget) {
                var _this3 = this;

                var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

                if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
                    // Don't move modal's DOM position
                    document.body.appendChild(this._element);
                }

                this._element.style.display = 'block';

                this._element.removeAttribute('aria-hidden');

                this._element.scrollTop = 0;

                if (transition) {
                    Util.reflow(this._element);
                }

                $(this._element).addClass(ClassName.SHOW);

                if (this._config.focus) {
                    this._enforceFocus();
                }

                var shownEvent = $.Event(Event.SHOWN, {
                    relatedTarget: relatedTarget
                });

                var transitionComplete = function transitionComplete() {
                    if (_this3._config.focus) {
                        _this3._element.focus();
                    }

                    _this3._isTransitioning = false;
                    $(_this3._element).trigger(shownEvent);
                };

                if (transition) {
                    $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
                } else {
                    transitionComplete();
                }
            };

            _proto._enforceFocus = function _enforceFocus() {
                var _this4 = this;

                $(document).off(Event.FOCUSIN) // Guard against infinite focus loop
                    .on(Event.FOCUSIN, function(event) {
                        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
                            _this4._element.focus();
                        }
                    });
            };

            _proto._setEscapeEvent = function _setEscapeEvent() {
                var _this5 = this;

                if (this._isShown && this._config.keyboard) {
                    $(this._element).on(Event.KEYDOWN_DISMISS, function(event) {
                        if (event.which === ESCAPE_KEYCODE) {
                            event.preventDefault();

                            _this5.hide();
                        }
                    });
                } else if (!this._isShown) {
                    $(this._element).off(Event.KEYDOWN_DISMISS);
                }
            };

            _proto._setResizeEvent = function _setResizeEvent() {
                var _this6 = this;

                if (this._isShown) {
                    $(window).on(Event.RESIZE, function(event) {
                        return _this6.handleUpdate(event);
                    });
                } else {
                    $(window).off(Event.RESIZE);
                }
            };

            _proto._hideModal = function _hideModal() {
                var _this7 = this;

                this._element.style.display = 'none';

                this._element.setAttribute('aria-hidden', true);

                this._isTransitioning = false;

                this._showBackdrop(function() {
                    $(document.body).removeClass(ClassName.OPEN);

                    _this7._resetAdjustments();

                    _this7._resetScrollbar();

                    $(_this7._element).trigger(Event.HIDDEN);
                });
            };

            _proto._removeBackdrop = function _removeBackdrop() {
                if (this._backdrop) {
                    $(this._backdrop).remove();
                    this._backdrop = null;
                }
            };

            _proto._showBackdrop = function _showBackdrop(callback) {
                var _this8 = this;

                var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

                if (this._isShown && this._config.backdrop) {
                    var doAnimate = Util.supportsTransitionEnd() && animate;
                    this._backdrop = document.createElement('div');
                    this._backdrop.className = ClassName.BACKDROP;

                    if (animate) {
                        $(this._backdrop).addClass(animate);
                    }

                    $(this._backdrop).appendTo(document.body);
                    $(this._element).on(Event.CLICK_DISMISS, function(event) {
                        if (_this8._ignoreBackdropClick) {
                            _this8._ignoreBackdropClick = false;
                            return;
                        }

                        if (event.target !== event.currentTarget) {
                            return;
                        }

                        if (_this8._config.backdrop === 'static') {
                            _this8._element.focus();
                        } else {
                            _this8.hide();
                        }
                    });

                    if (doAnimate) {
                        Util.reflow(this._backdrop);
                    }

                    $(this._backdrop).addClass(ClassName.SHOW);

                    if (!callback) {
                        return;
                    }

                    if (!doAnimate) {
                        callback();
                        return;
                    }

                    $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                } else if (!this._isShown && this._backdrop) {
                    $(this._backdrop).removeClass(ClassName.SHOW);

                    var callbackRemove = function callbackRemove() {
                        _this8._removeBackdrop();

                        if (callback) {
                            callback();
                        }
                    };

                    if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
                        $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
                    } else {
                        callbackRemove();
                    }
                } else if (callback) {
                    callback();
                }
            }; // ----------------------------------------------------------------------
            // the following methods are used to handle overflowing modals
            // todo (fat): these should probably be refactored out of modal.js
            // ----------------------------------------------------------------------


            _proto._adjustDialog = function _adjustDialog() {
                var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

                if (!this._isBodyOverflowing && isModalOverflowing) {
                    this._element.style.paddingLeft = this._scrollbarWidth + "px";
                }

                if (this._isBodyOverflowing && !isModalOverflowing) {
                    this._element.style.paddingRight = this._scrollbarWidth + "px";
                }
            };

            _proto._resetAdjustments = function _resetAdjustments() {
                this._element.style.paddingLeft = '';
                this._element.style.paddingRight = '';
            };

            _proto._checkScrollbar = function _checkScrollbar() {
                var rect = document.body.getBoundingClientRect();
                this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
                this._scrollbarWidth = this._getScrollbarWidth();
            };

            _proto._setScrollbar = function _setScrollbar() {
                var _this9 = this;

                if (this._isBodyOverflowing) {
                    // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
                    //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
                    // Adjust fixed content padding
                    $(Selector.FIXED_CONTENT).each(function(index, element) {
                        var actualPadding = $(element)[0].style.paddingRight;
                        var calculatedPadding = $(element).css('padding-right');
                        $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
                    }); // Adjust sticky content margin

                    $(Selector.STICKY_CONTENT).each(function(index, element) {
                        var actualMargin = $(element)[0].style.marginRight;
                        var calculatedMargin = $(element).css('margin-right');
                        $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
                    }); // Adjust navbar-toggler margin

                    $(Selector.NAVBAR_TOGGLER).each(function(index, element) {
                        var actualMargin = $(element)[0].style.marginRight;
                        var calculatedMargin = $(element).css('margin-right');
                        $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) + _this9._scrollbarWidth + "px");
                    }); // Adjust body padding

                    var actualPadding = document.body.style.paddingRight;
                    var calculatedPadding = $('body').css('padding-right');
                    $('body').data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
                }
            };

            _proto._resetScrollbar = function _resetScrollbar() {
                // Restore fixed content padding
                $(Selector.FIXED_CONTENT).each(function(index, element) {
                    var padding = $(element).data('padding-right');

                    if (typeof padding !== 'undefined') {
                        $(element).css('padding-right', padding).removeData('padding-right');
                    }
                }); // Restore sticky content and navbar-toggler margin

                $(Selector.STICKY_CONTENT + ", " + Selector.NAVBAR_TOGGLER).each(function(index, element) {
                    var margin = $(element).data('margin-right');

                    if (typeof margin !== 'undefined') {
                        $(element).css('margin-right', margin).removeData('margin-right');
                    }
                }); // Restore body padding

                var padding = $('body').data('padding-right');

                if (typeof padding !== 'undefined') {
                    $('body').css('padding-right', padding).removeData('padding-right');
                }
            };

            _proto._getScrollbarWidth = function _getScrollbarWidth() {
                // thx d.walsh
                var scrollDiv = document.createElement('div');
                scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            }; // Static


            Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY);

                    var _config = _extends({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

                    if (!data) {
                        data = new Modal(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config](relatedTarget);
                    } else if (_config.show) {
                        data.show(relatedTarget);
                    }
                });
            };

            _createClass(Modal, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default;
                }
            }]);

            return Modal;
        }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
        var _this10 = this;

        var target;
        var selector = Util.getSelectorFromElement(this);

        if (selector) {
            target = $(selector)[0];
        }

        var config = $(target).data(DATA_KEY) ? 'toggle' : _extends({}, $(target).data(), $(this).data());

        if (this.tagName === 'A' || this.tagName === 'AREA') {
            event.preventDefault();
        }

        var $target = $(target).one(Event.SHOW, function(showEvent) {
            if (showEvent.isDefaultPrevented()) {
                // Only register focus restorer if modal will actually get shown
                return;
            }

            $target.one(Event.HIDDEN, function() {
                if ($(_this10).is(':visible')) {
                    _this10.focus();
                }
            });
        });

        Modal._jQueryInterface.call($(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Modal._jQueryInterface;
    $.fn[NAME].Constructor = Modal;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Modal._jQueryInterface;
    };

    return Modal;
}($);
//# sourceMappingURL=modal.js.map
function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var ScrollSpy = function($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Default = {
        offset: 10,
        method: 'auto',
        target: ''
    };
    var DefaultType = {
        offset: 'number',
        method: 'string',
        target: '(string|element)'
    };
    var Event = {
        ACTIVATE: "activate" + EVENT_KEY,
        SCROLL: "scroll" + EVENT_KEY,
        LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        DROPDOWN_ITEM: 'dropdown-item',
        DROPDOWN_MENU: 'dropdown-menu',
        ACTIVE: 'active'
    };
    var Selector = {
        DATA_SPY: '[data-spy="scroll"]',
        ACTIVE: '.active',
        NAV_LIST_GROUP: '.nav, .list-group',
        NAV_LINKS: '.nav-link',
        NAV_ITEMS: '.nav-item',
        LIST_ITEMS: '.list-group-item',
        DROPDOWN: '.dropdown',
        DROPDOWN_ITEMS: '.dropdown-item',
        DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
        OFFSET: 'offset',
        POSITION: 'position'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var ScrollSpy =
        /*#__PURE__*/
        function() {
            function ScrollSpy(element, config) {
                var _this = this;

                this._element = element;
                this._scrollElement = element.tagName === 'BODY' ? window : element;
                this._config = this._getConfig(config);
                this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
                this._offsets = [];
                this._targets = [];
                this._activeTarget = null;
                this._scrollHeight = 0;
                $(this._scrollElement).on(Event.SCROLL, function(event) {
                    return _this._process(event);
                });
                this.refresh();

                this._process();
            } // Getters


            var _proto = ScrollSpy.prototype;

            // Public
            _proto.refresh = function refresh() {
                var _this2 = this;

                var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
                var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
                var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
                this._offsets = [];
                this._targets = [];
                this._scrollHeight = this._getScrollHeight();
                var targets = $.makeArray($(this._selector));
                targets.map(function(element) {
                    var target;
                    var targetSelector = Util.getSelectorFromElement(element);

                    if (targetSelector) {
                        target = $(targetSelector)[0];
                    }

                    if (target) {
                        var targetBCR = target.getBoundingClientRect();

                        if (targetBCR.width || targetBCR.height) {
                            // TODO (fat): remove sketch reliance on jQuery position/offset
                            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
                        }
                    }

                    return null;
                }).filter(function(item) {
                    return item;
                }).sort(function(a, b) {
                    return a[0] - b[0];
                }).forEach(function(item) {
                    _this2._offsets.push(item[0]);

                    _this2._targets.push(item[1]);
                });
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                $(this._scrollElement).off(EVENT_KEY);
                this._element = null;
                this._scrollElement = null;
                this._config = null;
                this._selector = null;
                this._offsets = null;
                this._targets = null;
                this._activeTarget = null;
                this._scrollHeight = null;
            }; // Private


            _proto._getConfig = function _getConfig(config) {
                config = _extends({}, Default, config);

                if (typeof config.target !== 'string') {
                    var id = $(config.target).attr('id');

                    if (!id) {
                        id = Util.getUID(NAME);
                        $(config.target).attr('id', id);
                    }

                    config.target = "#" + id;
                }

                Util.typeCheckConfig(NAME, config, DefaultType);
                return config;
            };

            _proto._getScrollTop = function _getScrollTop() {
                return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
            };

            _proto._getScrollHeight = function _getScrollHeight() {
                return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
            };

            _proto._getOffsetHeight = function _getOffsetHeight() {
                return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
            };

            _proto._process = function _process() {
                var scrollTop = this._getScrollTop() + this._config.offset;

                var scrollHeight = this._getScrollHeight();

                var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

                if (this._scrollHeight !== scrollHeight) {
                    this.refresh();
                }

                if (scrollTop >= maxScroll) {
                    var target = this._targets[this._targets.length - 1];

                    if (this._activeTarget !== target) {
                        this._activate(target);
                    }

                    return;
                }

                if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
                    this._activeTarget = null;

                    this._clear();

                    return;
                }

                for (var i = this._offsets.length; i--;) {
                    var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

                    if (isActiveTarget) {
                        this._activate(this._targets[i]);
                    }
                }
            };

            _proto._activate = function _activate(target) {
                this._activeTarget = target;

                this._clear();

                var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


                queries = queries.map(function(selector) {
                    return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
                });
                var $link = $(queries.join(','));

                if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
                    $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                    $link.addClass(ClassName.ACTIVE);
                } else {
                    // Set triggered link as active
                    $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
                    // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

                    $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

                    $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
                }

                $(this._scrollElement).trigger(Event.ACTIVATE, {
                    relatedTarget: target
                });
            };

            _proto._clear = function _clear() {
                $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
            }; // Static


            ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY);

                    var _config = typeof config === 'object' && config;

                    if (!data) {
                        data = new ScrollSpy(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            _createClass(ScrollSpy, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default;
                }
            }]);

            return ScrollSpy;
        }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function() {
        var scrollSpys = $.makeArray($(Selector.DATA_SPY));

        for (var i = scrollSpys.length; i--;) {
            var $spy = $(scrollSpys[i]);

            ScrollSpy._jQueryInterface.call($spy, $spy.data());
        }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = ScrollSpy._jQueryInterface;
    $.fn[NAME].Constructor = ScrollSpy;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
}($);
//# sourceMappingURL=scrollspy.js.map
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Tab = function($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;
    var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
        DROPDOWN_MENU: 'dropdown-menu',
        ACTIVE: 'active',
        DISABLED: 'disabled',
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector = {
        DROPDOWN: '.dropdown',
        NAV_LIST_GROUP: '.nav, .list-group',
        ACTIVE: '.active',
        ACTIVE_UL: '> li > .active',
        DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
        DROPDOWN_TOGGLE: '.dropdown-toggle',
        DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Tab =
        /*#__PURE__*/
        function() {
            function Tab(element) {
                this._element = element;
            } // Getters


            var _proto = Tab.prototype;

            // Public
            _proto.show = function show() {
                var _this = this;

                if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE) || $(this._element).hasClass(ClassName.DISABLED)) {
                    return;
                }

                var target;
                var previous;
                var listElement = $(this._element).closest(Selector.NAV_LIST_GROUP)[0];
                var selector = Util.getSelectorFromElement(this._element);

                if (listElement) {
                    var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
                    previous = $.makeArray($(listElement).find(itemSelector));
                    previous = previous[previous.length - 1];
                }

                var hideEvent = $.Event(Event.HIDE, {
                    relatedTarget: this._element
                });
                var showEvent = $.Event(Event.SHOW, {
                    relatedTarget: previous
                });

                if (previous) {
                    $(previous).trigger(hideEvent);
                }

                $(this._element).trigger(showEvent);

                if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
                    return;
                }

                if (selector) {
                    target = $(selector)[0];
                }

                this._activate(this._element, listElement);

                var complete = function complete() {
                    var hiddenEvent = $.Event(Event.HIDDEN, {
                        relatedTarget: _this._element
                    });
                    var shownEvent = $.Event(Event.SHOWN, {
                        relatedTarget: previous
                    });
                    $(previous).trigger(hiddenEvent);
                    $(_this._element).trigger(shownEvent);
                };

                if (target) {
                    this._activate(target, target.parentNode, complete);
                } else {
                    complete();
                }
            };

            _proto.dispose = function dispose() {
                $.removeData(this._element, DATA_KEY);
                this._element = null;
            }; // Private


            _proto._activate = function _activate(element, container, callback) {
                var _this2 = this;

                var activeElements;

                if (container.nodeName === 'UL') {
                    activeElements = $(container).find(Selector.ACTIVE_UL);
                } else {
                    activeElements = $(container).children(Selector.ACTIVE);
                }

                var active = activeElements[0];
                var isTransitioning = callback && Util.supportsTransitionEnd() && active && $(active).hasClass(ClassName.FADE);

                var complete = function complete() {
                    return _this2._transitionComplete(element, active, callback);
                };

                if (active && isTransitioning) {
                    $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                } else {
                    complete();
                }
            };

            _proto._transitionComplete = function _transitionComplete(element, active, callback) {
                if (active) {
                    $(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
                    var dropdownChild = $(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

                    if (dropdownChild) {
                        $(dropdownChild).removeClass(ClassName.ACTIVE);
                    }

                    if (active.getAttribute('role') === 'tab') {
                        active.setAttribute('aria-selected', false);
                    }
                }

                $(element).addClass(ClassName.ACTIVE);

                if (element.getAttribute('role') === 'tab') {
                    element.setAttribute('aria-selected', true);
                }

                Util.reflow(element);
                $(element).addClass(ClassName.SHOW);

                if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
                    var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];

                    if (dropdownElement) {
                        $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
                    }

                    element.setAttribute('aria-expanded', true);
                }

                if (callback) {
                    callback();
                }
            }; // Static


            Tab._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var $this = $(this);
                    var data = $this.data(DATA_KEY);

                    if (!data) {
                        data = new Tab(this);
                        $this.data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            _createClass(Tab, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }]);

            return Tab;
        }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function(event) {
        event.preventDefault();

        Tab._jQueryInterface.call($(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $.fn[NAME] = Tab._jQueryInterface;
    $.fn[NAME].Constructor = Tab;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Tab._jQueryInterface;
    };

    return Tab;
}($);
//# sourceMappingURL=tab.js.map
function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    return _extends.apply(this, arguments);
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Tooltip = function($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.0.0';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var TRANSITION_DURATION = 150;
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
        animation: 'boolean',
        template: 'string',
        title: '(string|element|function)',
        trigger: 'string',
        delay: '(number|object)',
        html: 'boolean',
        selector: '(string|boolean)',
        placement: '(string|function)',
        offset: '(number|string)',
        container: '(string|element|boolean)',
        fallbackPlacement: '(string|array)',
        boundary: '(string|element)'
    };
    var AttachmentMap = {
        AUTO: 'auto',
        TOP: 'top',
        RIGHT: 'right',
        BOTTOM: 'bottom',
        LEFT: 'left'
    };
    var Default = {
        animation: true,
        template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
        trigger: 'hover focus',
        title: '',
        delay: 0,
        html: false,
        selector: false,
        placement: 'top',
        offset: 0,
        container: false,
        fallbackPlacement: 'flip',
        boundary: 'scrollParent'
    };
    var HoverState = {
        SHOW: 'show',
        OUT: 'out'
    };
    var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        INSERTED: "inserted" + EVENT_KEY,
        CLICK: "click" + EVENT_KEY,
        FOCUSIN: "focusin" + EVENT_KEY,
        FOCUSOUT: "focusout" + EVENT_KEY,
        MOUSEENTER: "mouseenter" + EVENT_KEY,
        MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
        FADE: 'fade',
        SHOW: 'show'
    };
    var Selector = {
        TOOLTIP: '.tooltip',
        TOOLTIP_INNER: '.tooltip-inner',
        ARROW: '.arrow'
    };
    var Trigger = {
        HOVER: 'hover',
        FOCUS: 'focus',
        CLICK: 'click',
        MANUAL: 'manual'
        /**
         * ------------------------------------------------------------------------
         * Class Definition
         * ------------------------------------------------------------------------
         */

    };

    var Tooltip =
        /*#__PURE__*/
        function() {
            function Tooltip(element, config) {
                /**
                 * Check for Popper dependency
                 * Popper - https://popper.js.org
                 */
                if (typeof Popper === 'undefined') {
                    throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
                } // private


                this._isEnabled = true;
                this._timeout = 0;
                this._hoverState = '';
                this._activeTrigger = {};
                this._popper = null; // Protected

                this.element = element;
                this.config = this._getConfig(config);
                this.tip = null;

                this._setListeners();
            } // Getters


            var _proto = Tooltip.prototype;

            // Public
            _proto.enable = function enable() {
                this._isEnabled = true;
            };

            _proto.disable = function disable() {
                this._isEnabled = false;
            };

            _proto.toggleEnabled = function toggleEnabled() {
                this._isEnabled = !this._isEnabled;
            };

            _proto.toggle = function toggle(event) {
                if (!this._isEnabled) {
                    return;
                }

                if (event) {
                    var dataKey = this.constructor.DATA_KEY;
                    var context = $(event.currentTarget).data(dataKey);

                    if (!context) {
                        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                        $(event.currentTarget).data(dataKey, context);
                    }

                    context._activeTrigger.click = !context._activeTrigger.click;

                    if (context._isWithActiveTrigger()) {
                        context._enter(null, context);
                    } else {
                        context._leave(null, context);
                    }
                } else {
                    if ($(this.getTipElement()).hasClass(ClassName.SHOW)) {
                        this._leave(null, this);

                        return;
                    }

                    this._enter(null, this);
                }
            };

            _proto.dispose = function dispose() {
                clearTimeout(this._timeout);
                $.removeData(this.element, this.constructor.DATA_KEY);
                $(this.element).off(this.constructor.EVENT_KEY);
                $(this.element).closest('.modal').off('hide.bs.modal');

                if (this.tip) {
                    $(this.tip).remove();
                }

                this._isEnabled = null;
                this._timeout = null;
                this._hoverState = null;
                this._activeTrigger = null;

                if (this._popper !== null) {
                    this._popper.destroy();
                }

                this._popper = null;
                this.element = null;
                this.config = null;
                this.tip = null;
            };

            _proto.show = function show() {
                var _this = this;

                if ($(this.element).css('display') === 'none') {
                    throw new Error('Please use show on visible elements');
                }

                var showEvent = $.Event(this.constructor.Event.SHOW);

                if (this.isWithContent() && this._isEnabled) {
                    $(this.element).trigger(showEvent);
                    var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

                    if (showEvent.isDefaultPrevented() || !isInTheDom) {
                        return;
                    }

                    var tip = this.getTipElement();
                    var tipId = Util.getUID(this.constructor.NAME);
                    tip.setAttribute('id', tipId);
                    this.element.setAttribute('aria-describedby', tipId);
                    this.setContent();

                    if (this.config.animation) {
                        $(tip).addClass(ClassName.FADE);
                    }

                    var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

                    var attachment = this._getAttachment(placement);

                    this.addAttachmentClass(attachment);
                    var container = this.config.container === false ? document.body : $(this.config.container);
                    $(tip).data(this.constructor.DATA_KEY, this);

                    if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
                        $(tip).appendTo(container);
                    }

                    $(this.element).trigger(this.constructor.Event.INSERTED);
                    this._popper = new Popper(this.element, tip, {
                        placement: attachment,
                        modifiers: {
                            offset: {
                                offset: this.config.offset
                            },
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: Selector.ARROW
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function onCreate(data) {
                            if (data.originalPlacement !== data.placement) {
                                _this._handlePopperPlacementChange(data);
                            }
                        },
                        onUpdate: function onUpdate(data) {
                            _this._handlePopperPlacementChange(data);
                        }
                    });
                    $(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
                    // empty mouseover listeners to the body's immediate children;
                    // only needed because of broken event delegation on iOS
                    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

                    if ('ontouchstart' in document.documentElement) {
                        $('body').children().on('mouseover', null, $.noop);
                    }

                    var complete = function complete() {
                        if (_this.config.animation) {
                            _this._fixTransition();
                        }

                        var prevHoverState = _this._hoverState;
                        _this._hoverState = null;
                        $(_this.element).trigger(_this.constructor.Event.SHOWN);

                        if (prevHoverState === HoverState.OUT) {
                            _this._leave(null, _this);
                        }
                    };

                    if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
                        $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
                    } else {
                        complete();
                    }
                }
            };

            _proto.hide = function hide(callback) {
                var _this2 = this;

                var tip = this.getTipElement();
                var hideEvent = $.Event(this.constructor.Event.HIDE);

                var complete = function complete() {
                    if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
                        tip.parentNode.removeChild(tip);
                    }

                    _this2._cleanTipClass();

                    _this2.element.removeAttribute('aria-describedby');

                    $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

                    if (_this2._popper !== null) {
                        _this2._popper.destroy();
                    }

                    if (callback) {
                        callback();
                    }
                };

                $(this.element).trigger(hideEvent);

                if (hideEvent.isDefaultPrevented()) {
                    return;
                }

                $(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
                // empty mouseover listeners we added for iOS support

                if ('ontouchstart' in document.documentElement) {
                    $('body').children().off('mouseover', null, $.noop);
                }

                this._activeTrigger[Trigger.CLICK] = false;
                this._activeTrigger[Trigger.FOCUS] = false;
                this._activeTrigger[Trigger.HOVER] = false;

                if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
                    $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
                } else {
                    complete();
                }

                this._hoverState = '';
            };

            _proto.update = function update() {
                if (this._popper !== null) {
                    this._popper.scheduleUpdate();
                }
            }; // Protected


            _proto.isWithContent = function isWithContent() {
                return Boolean(this.getTitle());
            };

            _proto.addAttachmentClass = function addAttachmentClass(attachment) {
                $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
            };

            _proto.getTipElement = function getTipElement() {
                this.tip = this.tip || $(this.config.template)[0];
                return this.tip;
            };

            _proto.setContent = function setContent() {
                var $tip = $(this.getTipElement());
                this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());
                $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
            };

            _proto.setElementContent = function setElementContent($element, content) {
                var html = this.config.html;

                if (typeof content === 'object' && (content.nodeType || content.jquery)) {
                    // Content is a DOM node or a jQuery
                    if (html) {
                        if (!$(content).parent().is($element)) {
                            $element.empty().append(content);
                        }
                    } else {
                        $element.text($(content).text());
                    }
                } else {
                    $element[html ? 'html' : 'text'](content);
                }
            };

            _proto.getTitle = function getTitle() {
                var title = this.element.getAttribute('data-original-title');

                if (!title) {
                    title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
                }

                return title;
            }; // Private


            _proto._getAttachment = function _getAttachment(placement) {
                return AttachmentMap[placement.toUpperCase()];
            };

            _proto._setListeners = function _setListeners() {
                var _this3 = this;

                var triggers = this.config.trigger.split(' ');
                triggers.forEach(function(trigger) {
                    if (trigger === 'click') {
                        $(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function(event) {
                            return _this3.toggle(event);
                        });
                    } else if (trigger !== Trigger.MANUAL) {
                        var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
                        var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
                        $(_this3.element).on(eventIn, _this3.config.selector, function(event) {
                            return _this3._enter(event);
                        }).on(eventOut, _this3.config.selector, function(event) {
                            return _this3._leave(event);
                        });
                    }

                    $(_this3.element).closest('.modal').on('hide.bs.modal', function() {
                        return _this3.hide();
                    });
                });

                if (this.config.selector) {
                    this.config = _extends({}, this.config, {
                        trigger: 'manual',
                        selector: ''
                    });
                } else {
                    this._fixTitle();
                }
            };

            _proto._fixTitle = function _fixTitle() {
                var titleType = typeof this.element.getAttribute('data-original-title');

                if (this.element.getAttribute('title') || titleType !== 'string') {
                    this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
                    this.element.setAttribute('title', '');
                }
            };

            _proto._enter = function _enter(event, context) {
                var dataKey = this.constructor.DATA_KEY;
                context = context || $(event.currentTarget).data(dataKey);

                if (!context) {
                    context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                    $(event.currentTarget).data(dataKey, context);
                }

                if (event) {
                    context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
                }

                if ($(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
                    context._hoverState = HoverState.SHOW;
                    return;
                }

                clearTimeout(context._timeout);
                context._hoverState = HoverState.SHOW;

                if (!context.config.delay || !context.config.delay.show) {
                    context.show();
                    return;
                }

                context._timeout = setTimeout(function() {
                    if (context._hoverState === HoverState.SHOW) {
                        context.show();
                    }
                }, context.config.delay.show);
            };

            _proto._leave = function _leave(event, context) {
                var dataKey = this.constructor.DATA_KEY;
                context = context || $(event.currentTarget).data(dataKey);

                if (!context) {
                    context = new this.constructor(event.currentTarget, this._getDelegateConfig());
                    $(event.currentTarget).data(dataKey, context);
                }

                if (event) {
                    context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
                }

                if (context._isWithActiveTrigger()) {
                    return;
                }

                clearTimeout(context._timeout);
                context._hoverState = HoverState.OUT;

                if (!context.config.delay || !context.config.delay.hide) {
                    context.hide();
                    return;
                }

                context._timeout = setTimeout(function() {
                    if (context._hoverState === HoverState.OUT) {
                        context.hide();
                    }
                }, context.config.delay.hide);
            };

            _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
                for (var trigger in this._activeTrigger) {
                    if (this._activeTrigger[trigger]) {
                        return true;
                    }
                }

                return false;
            };

            _proto._getConfig = function _getConfig(config) {
                config = _extends({}, this.constructor.Default, $(this.element).data(), config);

                if (typeof config.delay === 'number') {
                    config.delay = {
                        show: config.delay,
                        hide: config.delay
                    };
                }

                if (typeof config.title === 'number') {
                    config.title = config.title.toString();
                }

                if (typeof config.content === 'number') {
                    config.content = config.content.toString();
                }

                Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
                return config;
            };

            _proto._getDelegateConfig = function _getDelegateConfig() {
                var config = {};

                if (this.config) {
                    for (var key in this.config) {
                        if (this.constructor.Default[key] !== this.config[key]) {
                            config[key] = this.config[key];
                        }
                    }
                }

                return config;
            };

            _proto._cleanTipClass = function _cleanTipClass() {
                var $tip = $(this.getTipElement());
                var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

                if (tabClass !== null && tabClass.length > 0) {
                    $tip.removeClass(tabClass.join(''));
                }
            };

            _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(data) {
                this._cleanTipClass();

                this.addAttachmentClass(this._getAttachment(data.placement));
            };

            _proto._fixTransition = function _fixTransition() {
                var tip = this.getTipElement();
                var initConfigAnimation = this.config.animation;

                if (tip.getAttribute('x-placement') !== null) {
                    return;
                }

                $(tip).removeClass(ClassName.FADE);
                this.config.animation = false;
                this.hide();
                this.show();
                this.config.animation = initConfigAnimation;
            }; // Static


            Tooltip._jQueryInterface = function _jQueryInterface(config) {
                return this.each(function() {
                    var data = $(this).data(DATA_KEY);

                    var _config = typeof config === 'object' && config;

                    if (!data && /dispose|hide/.test(config)) {
                        return;
                    }

                    if (!data) {
                        data = new Tooltip(this, _config);
                        $(this).data(DATA_KEY, data);
                    }

                    if (typeof config === 'string') {
                        if (typeof data[config] === 'undefined') {
                            throw new TypeError("No method named \"" + config + "\"");
                        }

                        data[config]();
                    }
                });
            };

            _createClass(Tooltip, null, [{
                key: "VERSION",
                get: function get() {
                    return VERSION;
                }
            }, {
                key: "Default",
                get: function get() {
                    return Default;
                }
            }, {
                key: "NAME",
                get: function get() {
                    return NAME;
                }
            }, {
                key: "DATA_KEY",
                get: function get() {
                    return DATA_KEY;
                }
            }, {
                key: "Event",
                get: function get() {
                    return Event;
                }
            }, {
                key: "EVENT_KEY",
                get: function get() {
                    return EVENT_KEY;
                }
            }, {
                key: "DefaultType",
                get: function get() {
                    return DefaultType;
                }
            }]);

            return Tooltip;
        }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $.fn[NAME] = Tooltip._jQueryInterface;
    $.fn[NAME].Constructor = Tooltip;

    $.fn[NAME].noConflict = function() {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return Tooltip._jQueryInterface;
    };

    return Tooltip;
}($, Popper);
//# sourceMappingURL=tooltip.js.map
/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
var Util = function($) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var transition = false;
    var MAX_UID = 1000000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
        return {}.toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
        return {
            bindType: transition.end,
            delegateType: transition.end,
            handle: function handle(event) {
                if ($(event.target).is(this)) {
                    return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
                }

                return undefined; // eslint-disable-line no-undefined
            }
        };
    }

    function transitionEndTest() {
        if (typeof window !== 'undefined' && window.QUnit) {
            return false;
        }

        return {
            end: 'transitionend'
        };
    }

    function transitionEndEmulator(duration) {
        var _this = this;

        var called = false;
        $(this).one(Util.TRANSITION_END, function() {
            called = true;
        });
        setTimeout(function() {
            if (!called) {
                Util.triggerTransitionEnd(_this);
            }
        }, duration);
        return this;
    }

    function setTransitionEndSupport() {
        transition = transitionEndTest();
        $.fn.emulateTransitionEnd = transitionEndEmulator;

        if (Util.supportsTransitionEnd()) {
            $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
        }
    }

    function escapeId(selector) {
        // We escape IDs in case of special selectors (selector = '#myId:something')
        // $.escapeSelector does not exist in jQuery < 3
        selector = typeof $.escapeSelector === 'function' ? $.escapeSelector(selector).substr(1) : selector.replace(/(:|\.|\[|\]|,|=|@)/g, '\\$1');
        return selector;
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
        TRANSITION_END: 'bsTransitionEnd',
        getUID: function getUID(prefix) {
            do {
                // eslint-disable-next-line no-bitwise
                prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
            } while (document.getElementById(prefix));

            return prefix;
        },
        getSelectorFromElement: function getSelectorFromElement(element) {
            var selector = element.getAttribute('data-target');

            if (!selector || selector === '#') {
                selector = element.getAttribute('href') || '';
            } // If it's an ID


            if (selector.charAt(0) === '#') {
                selector = escapeId(selector);
            }

            try {
                var $selector = $(document).find(selector);
                return $selector.length > 0 ? selector : null;
            } catch (err) {
                return null;
            }
        },
        reflow: function reflow(element) {
            return element.offsetHeight;
        },
        triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(transition.end);
        },
        supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(transition);
        },
        isElement: function isElement(obj) {
            return (obj[0] || obj).nodeType;
        },
        typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
            for (var property in configTypes) {
                if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
                    var expectedTypes = configTypes[property];
                    var value = config[property];
                    var valueType = value && Util.isElement(value) ? 'element' : toType(value);

                    if (!new RegExp(expectedTypes).test(valueType)) {
                        throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
                    }
                }
            }
        }
    };
    setTransitionEndSupport();
    return Util;
}($);
//# sourceMappingURL=util.js.map

// components

$(function() {

    if (!$('.search').length) {
        return;
    }

    // search results output wrapper
    var outputSearchResults = $('.results--search ul');

    // on search
    var input = $('.search').find('input');
    $(input).keyup(function(event) {

        // search val
        var inputVal = $(this).val();
        $.ajax({
                method: 'GET',
                url: 'https://api.themoviedb.org/3/search/movie?api_key=4cb1eeab94f45affe2536f2c684a5c9e&query=' + inputVal,
                dataType: 'json'
            })

            .done(function(response) {

                // empty search results output wrapper
                $(outputSearchResults).empty();

                // api results 
                var results = response.results;

                for (var i = 0; i < results.length; ++i) {
                    var resultTitle = results[i].title.toUpperCase();
                    var inputValMatch = inputVal.toUpperCase();

                    // if api results match search val
                    if (resultTitle.indexOf(inputValMatch) > -1) {

                        // from 2 chars matches
                        if (inputVal.length >= 2) {
                            var resultId = results[i].id;
                            var resultTitle = results[i].title;

                            var resultItems =
                                '<li>' +
                                '<div class="results_item">' +
                                resultTitle +
                                '<div class="results_item_choices">' +
                                '<button class="btn btn--rounded btn--details" data-detail="' + resultId + '">Show details</button>' +
                                '<label class="checkbox"><input type="checkbox" id="favorite-' + resultId + '" name="favorite" value="' + resultId + '"><i class="far fa-heart i--favorite"></i></label>' +
                                '</div>' +
                                '</div>' +
                                '<div class="results_detail"></div>' +
                                '</li>';

                            // append results to output wrapper
                            $(resultItems).each(function(i, item) {
                                $(outputSearchResults).append(item);
                            });

                            // check saved favorites from localstorage
                            checkStorage();
                        }
                    }
                }
            })

            .fail(function() {
                console.log("Failed");
            });
    });


    function checkStorage() {
        Object.keys(localStorage)
            .forEach(function(key) {
                if (/^favorite-/.test(key)) {
                    var keyTrue = JSON.parse(localStorage.getItem(key));
                    if (keyTrue) {
                        // check saved favorites
                        $(outputSearchResults).find('input#' + key + '').attr('checked', true);
                    }
                }
            });
    }

});


$(function() {

    // on detail click
    $(document).on('click', '.results .btn--details', function(event) {
        event.preventDefault();

        // details output wrapper
        var output = $(this).parents('li').find('.results_detail');
        $(output).empty();

        // detail btn
        var txt = $(output).is(':visible') ? 'Show details' : 'Hide details';
        $(this).text(txt);
        $(this).toggleClass('active');

        // detail id
        var detailId = $(this).attr('data-detail');
        $.ajax({
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/' + detailId + '?api_key=4cb1eeab94f45affe2536f2c684a5c9e',
                dataType: 'json'
            })

            .done(function(response) {

                $(output).append('<div class="results_detail_img"></div><div class="results_detail_info"></div>');
                var outputImg = $(output).find('.results_detail_img');
                var outputInfo = $(output).find('.results_detail_info');

                // api details append to output wrapper
                var title = response.title;
                var img = response.poster_path;
                if (!img == "") {
                    var title = response.title;
                    $(outputImg).append('<img src="http://image.tmdb.org/t/p/w92' + img + '" alt="' + title + '">');
                }

                var resume = response.overview;
                if (!resume == "") {
                    $(outputInfo).append('<small>Resumé:</small><p>' + resume + '</p>');
                }

                var genres = response.genres;
                if (!genres.length == 0) {
                    var arrGenres = Array();
                    for (var i = 0; i < genres.length; ++i) {
                        var genre = genres[i].name;
                        arrGenres.push(genre);
                    }
                    $(outputInfo).append('<small>Genre:</small><p>' + arrGenres.join(', ') + '</p>');
                }

                var votes = response.vote_average;
                if (!votes == 0) {
                    $(outputInfo).append('<small>Vote average:</small><span>' + votes + '</span>');
                }

                // show / hide details
                $(output).slideToggle();
            })

            .fail(function() {
                console.log("Failed");
            });

    });
});


$(function() {

    // favorites output wrapper
    var outputFavorites = $('.results--favorites ul');

    //get items from local storage
    if (localStorage.getItem('favorites-li')) {
        $(outputFavorites).html(localStorage.getItem('favorites-li'));
        $(outputFavorites).find('input[type="checkbox"]').attr('checked', true);
    }

    // // on unfavorite click in favorite list
    // $(document).on('click','.results--favorites input[type="checkbox"]',function() {

    //     // check / uncheck favorites and save favorites to localstorage
    //     var checkbox = $(this);
    //     var favId = $(checkbox).attr('id');

    //     if($(checkbox).attr('checked')) {
    //         $(checkbox).attr('checked', false);
    //         localStorage.setItem(favId, false);
    //         // remove li from favorite list
    //         $(outputFavorites).find('#'+favId+'').parents('li').remove();
    //         // remove from localstorage
    //         localStorage.setItem('favorites-li', $(outputFavorites).html());
    //     }
    // });


    // search results output wrapper
    var outputSearchResults = $('.results--search ul');

    // on favorite click in result list
    $(document).on('click', '.results--search input[type="checkbox"]', function() {

        // check / uncheck favorites and save favorites to localstorage
        var checkbox = $(this);
        var favId = $(checkbox).attr('id');
        var clonedLi = $('#' + favId).parents('li').clone();

        if ($(checkbox).attr('checked')) {
            $(checkbox).attr('checked', false);
            localStorage.setItem(favId, false);
            // remove li from favorite list
            $(outputFavorites).find('#' + favId + '').parents('li').remove();
            // remove from localstorage
            localStorage.setItem('favorites-li', $(outputFavorites).html());
        } else {
            $(checkbox).attr('checked', true);
            localStorage.setItem(favId, true);
            //add new item
            $(outputFavorites).append(clonedLi);
            //save changes to localstorage
            localStorage.setItem('favorites-li', $(outputFavorites).html());
        }

    });
});