define("events/1.0.1/events", [], function (e, t, s) {
    function n() {
        this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
    }

    function r(e) {
        return "function" == typeof e
    }

    function i(e) {
        return "number" == typeof e
    }

    function o(e) {
        return "object" == typeof e && null !== e
    }

    function h(e) {
        return void 0 === e
    }

    s.exports = n, n.EventEmitter = n, n.prototype._events = void 0, n.prototype._maxListeners = void 0, n.defaultMaxListeners = 10, n.prototype.setMaxListeners = function (e) {
        if (!i(e) || 0 > e || isNaN(e))throw TypeError("n must be a positive number");
        return this._maxListeners = e, this
    }, n.prototype.emit = function (e) {
        var t, s, n, i, v, a;
        if (this._events || (this._events = {}), "error" === e && (!this._events.error || o(this._events.error) && !this._events.error.length))throw t = arguments[1], t instanceof Error ? t : TypeError('Uncaught, unspecified "error" event.');
        if (s = this._events[e], h(s))return !1;
        if (r(s))switch (arguments.length) {
            case 1:
                s.call(this);
                break;
            case 2:
                s.call(this, arguments[1]);
                break;
            case 3:
                s.call(this, arguments[1], arguments[2]);
                break;
            default:
                for (n = arguments.length, i = new Array(n - 1), v = 1; n > v; v++)i[v - 1] = arguments[v];
                s.apply(this, i)
        } else if (o(s)) {
            for (n = arguments.length, i = new Array(n - 1), v = 1; n > v; v++)i[v - 1] = arguments[v];
            for (a = s.slice(), n = a.length, v = 0; n > v; v++)a[v].apply(this, i)
        }
        return !0
    }, n.prototype.addListener = function (e, t) {
        var s;
        if (!r(t))throw TypeError("listener must be a function");
        if (this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, r(t.listener) ? t.listener : t), this._events[e] ? o(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, o(this._events[e]) && !this._events[e].warned) {
            var s;
            s = h(this._maxListeners) ? n.defaultMaxListeners : this._maxListeners, s && s > 0 && this._events[e].length > s && (this._events[e].warned = !0, console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.", this._events[e].length), "function" == typeof console.trace && console.trace())
        }
        return this
    }, n.prototype.on = n.prototype.addListener, n.prototype.once = function (e, t) {
        function s() {
            this.removeListener(e, s), n || (n = !0, t.apply(this, arguments))
        }

        if (!r(t))throw TypeError("listener must be a function");
        var n = !1;
        return s.listener = t, this.on(e, s), this
    }, n.prototype.removeListener = function (e, t) {
        var s, n, i, h;
        if (!r(t))throw TypeError("listener must be a function");
        if (!this._events || !this._events[e])return this;
        if (s = this._events[e], i = s.length, n = -1, s === t || r(s.listener) && s.listener === t)delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t); else if (o(s)) {
            for (h = i; h-- > 0;)if (s[h] === t || s[h].listener && s[h].listener === t) {
                n = h;
                break
            }
            if (0 > n)return this;
            1 === s.length ? (s.length = 0, delete this._events[e]) : s.splice(n, 1), this._events.removeListener && this.emit("removeListener", e, t)
        }
        return this
    }, n.prototype.removeAllListeners = function (e) {
        var t, s;
        if (!this._events)return this;
        if (!this._events.removeListener)return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
        if (0 === arguments.length) {
            for (t in this._events)"removeListener" !== t && this.removeAllListeners(t);
            return this.removeAllListeners("removeListener"), this._events = {}, this
        }
        if (s = this._events[e], r(s))this.removeListener(e, s); else for (; s.length;)this.removeListener(e, s[s.length - 1]);
        return delete this._events[e], this
    }, n.prototype.listeners = function (e) {
        var t;
        return t = this._events && this._events[e] ? r(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
    }, n.listenerCount = function (e, t) {
        var s;
        return s = e._events && e._events[t] ? r(e._events[t]) ? 1 : e._events[t].length : 0
    }
});