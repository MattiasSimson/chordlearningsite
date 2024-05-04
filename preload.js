var X3 = Object.defineProperty
  , H3 = Object.defineProperties;
var W3 = Object.getOwnPropertyDescriptors;
var Y2 = Object.getOwnPropertySymbols;
var U3 = Object.prototype.hasOwnProperty
  , V3 = Object.prototype.propertyIsEnumerable;
var G2 = (a,t,e)=>t in a ? X3(a, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: e
}) : a[t] = e
  , R = (a,t)=>{
    for (var e in t || (t = {}))
        U3.call(t, e) && G2(a, e, t[e]);
    if (Y2)
        for (var e of Y2(t))
            V3.call(t, e) && G2(a, e, t[e]);
    return a
}
  , c1 = (a,t)=>H3(a, W3(t));
const f = ()=>{}
;
f.L = (a,t)=>{
    if (!t)
        return;
    const e = Array.prototype.slice.call(t).join(" ");
    window.console.log(a + ": " + e)
}
;
f.MakeException = a=>class extends Error {
    constructor(e, i) {
        super(e);
        this.name = a,
        this.message = e,
        this.data = i
    }
}
;
class $3 {
    constructor(t, e) {
        this.code = t,
        this.message = e
    }
    toString() {
        return "[RuntimeError] " + this.code + ":" + this.message
    }
}
f.RuntimeError = $3;
f.RERR = f.RuntimeError;
f.Merge = (a,t)=>{
    for (const e in t)
        a[e] = t[e];
    return a
}
;
f.Min = Math.min;
f.Max = Math.max;
f.forEach = (a,t)=>{
    for (let e = 0; e < a.length; e++)
        t(a[e], e)
}
;
f.RoundN = (a,t)=>a % t >= t / 2 ? parseInt(a / t, 10) * t + t : parseInt(a / t, 10) * t;
f.MidLine = (a,t)=>{
    let e = t + (a - t) / 2;
    return e % 2 > 0 && (e = f.RoundN(e * 10, 5) / 10),
    e
}
;
f.SortAndUnique = (a,t,e)=>{
    if (a.length > 1) {
        const i = [];
        let s;
        a.sort(t);
        for (let n = 0; n < a.length; ++n)
            (n === 0 || !e(a[n], s)) && i.push(a[n]),
            s = a[n];
        return i
    } else
        return a
}
;
f.Contains = (a,t)=>{
    let e = a.length;
    for (; e--; )
        if (a[e] === t)
            return !0;
    return !1
}
;
f.getCanvasContext = a=>{
    if (!a)
        throw new f.RERR("BadArgument","Invalid canvas selector: " + a);
    const t = document.getElementById(a);
    if (!(t && t.getContext))
        throw new f.RERR("UnsupportedBrowserError","This browser does not support HTML5 Canvas");
    return t.getContext("2d")
}
;
f.drawDot = (a,t,e,i="#55")=>{
    a.save(),
    a.setFillStyle(i),
    a.beginPath(),
    a.arc(t, e, 3, 0, Math.PI * 2, !0),
    a.closePath(),
    a.fill(),
    a.restore()
}
;
f.BM = (a,t)=>{
    const e = new Date().getTime();
    t();
    const i = new Date().getTime() - e;
    f.L(a + i + "ms")
}
;
f.StackTrace = ()=>new Error().stack;
f.W = (...a)=>{
    const t = a.join(" ");
    window.console.log("Warning: ", t, f.StackTrace())
}
;
f.Prefix = a=>f.Prefix.prefix + a;
f.Prefix.prefix = "vf-";
class k {
    static GCD(t, e) {
        if (typeof t != "number" || typeof e != "number")
            throw new f.RERR("BadArgument",`Invalid numbers: ${t}, ${e}`);
        let i;
        for (; e !== 0; )
            i = e,
            e = t % e,
            t = i;
        return t
    }
    static LCM(t, e) {
        return t * e / k.GCD(t, e)
    }
    static LCMM(t) {
        if (t.length === 0)
            return 0;
        if (t.length === 1)
            return t[0];
        if (t.length === 2)
            return k.LCM(t[0], t[1]);
        {
            const e = t[0];
            return t.shift(),
            k.LCM(e, k.LCMM(t))
        }
    }
    constructor(t, e) {
        this.set(t, e)
    }
    set(t, e) {
        return this.numerator = t === void 0 ? 1 : t,
        this.denominator = e === void 0 ? 1 : e,
        this
    }
    value() {
        return this.numerator / this.denominator
    }
    simplify() {
        let t = this.numerator
          , e = this.denominator;
        const i = k.GCD(t, e);
        return t /= i,
        e /= i,
        e < 0 && (e = -e,
        t = -t),
        this.set(t, e)
    }
    add(t, e) {
        let i, s;
        t instanceof k ? (i = t.numerator,
        s = t.denominator) : (t !== void 0 ? i = t : i = 0,
        e !== void 0 ? s = e : s = 1);
        const n = k.LCM(this.denominator, s)
          , o = n / this.denominator
          , l = n / s
          , c = this.numerator * o + i * l;
        return this.set(c, n)
    }
    subtract(t, e) {
        let i, s;
        t instanceof k ? (i = t.numerator,
        s = t.denominator) : (t !== void 0 ? i = t : i = 0,
        e !== void 0 ? s = e : s = 1);
        const n = k.LCM(this.denominator, s)
          , o = n / this.denominator
          , l = n / s
          , c = this.numerator * o - i * l;
        return this.set(c, n)
    }
    multiply(t, e) {
        let i, s;
        return t instanceof k ? (i = t.numerator,
        s = t.denominator) : (t !== void 0 ? i = t : i = 1,
        e !== void 0 ? s = e : s = 1),
        this.set(this.numerator * i, this.denominator * s)
    }
    divide(t, e) {
        let i, s;
        return t instanceof k ? (i = t.numerator,
        s = t.denominator) : (t !== void 0 ? i = t : i = 1,
        e !== void 0 ? s = e : s = 1),
        this.set(this.numerator * s, this.denominator * i)
    }
    equals(t) {
        const e = k.__compareA.copy(t).simplify()
          , i = k.__compareB.copy(this).simplify();
        return e.numerator === i.numerator && e.denominator === i.denominator
    }
    greaterThan(t) {
        const e = k.__compareB.copy(this);
        return e.subtract(t),
        e.numerator > 0
    }
    greaterThanEquals(t) {
        const e = k.__compareB.copy(this);
        return e.subtract(t),
        e.numerator >= 0
    }
    lessThan(t) {
        return !this.greaterThanEquals(t)
    }
    lessThanEquals(t) {
        return !this.greaterThan(t)
    }
    clone() {
        return new k(this.numerator,this.denominator)
    }
    copy(t) {
        return typeof t == "number" ? this.set(t || 0, 1) : this.set(t.numerator, t.denominator)
    }
    quotient() {
        return Math.floor(this.numerator / this.denominator)
    }
    fraction() {
        return this.numerator % this.denominator
    }
    abs() {
        return this.denominator = Math.abs(this.denominator),
        this.numerator = Math.abs(this.numerator),
        this
    }
    toString() {
        return this.numerator + "/" + this.denominator
    }
    toSimplifiedString() {
        return k.__tmp.copy(this).simplify().toString()
    }
    toMixedString() {
        let t = "";
        const e = this.quotient()
          , i = k.__tmp.copy(this);
        return e < 0 ? i.abs().fraction() : i.fraction(),
        e !== 0 ? (t += e,
        i.numerator !== 0 && (t += " " + i.toSimplifiedString())) : i.numerator === 0 ? t = "0" : t = i.toSimplifiedString(),
        t
    }
    parse(t) {
        const e = t.split("/")
          , i = parseInt(e[0], 10)
          , s = e[1] ? parseInt(e[1], 10) : 1;
        return this.set(i, s)
    }
}
k.__compareA = new k;
k.__compareB = new k;
k.__tmp = new k;
const j3 = f.MakeException("RegistryError");
function X2(a, t, e, i, s) {
    a[t][e] || (a[t][e] = {}),
    a[t][e][i] = s
}
class r1 {
    static get INDEXES() {
        return ["type"]
    }
    constructor() {
        this.clear()
    }
    static enableDefaultRegistry(t) {
        r1.defaultRegistry = t
    }
    static getDefaultRegistry() {
        return r1.defaultRegistry
    }
    static disableDefaultRegistry() {
        r1.defaultRegistry = null
    }
    clear() {
        return this.index = {
            id: {},
            type: {},
            class: {}
        },
        this
    }
    updateIndex({id: t, name: e, value: i, oldValue: s}) {
        const n = this.getElementById(t);
        s !== null && this.index[e][s] && delete this.index[e][s][t],
        i !== null && X2(this.index, e, i, n.getAttribute("id"), n)
    }
    register(t, e) {
        if (e = e || t.getAttribute("id"),
        !e)
            throw new j3("Can't add element without `id` attribute to registry",t);
        return t.setAttribute("id", e),
        X2(this.index, "id", e, e, t),
        r1.INDEXES.forEach(i=>{
            this.updateIndex({
                id: e,
                name: i,
                value: t.getAttribute(i),
                oldValue: null
            })
        }
        ),
        t.onRegister(this),
        this
    }
    getElementById(t) {
        return this.index.id[t] ? this.index.id[t][t] : null
    }
    getElementsByAttribute(t, e) {
        const i = this.index[t];
        return i && i[e] ? Object.keys(i[e]).map(s=>i[e][s]) : []
    }
    getElementsByType(t) {
        return this.getElementsByAttribute("type", t)
    }
    getElementsByClass(t) {
        return this.getElementsByAttribute("class", t)
    }
    onUpdate({id: t, name: e, value: i, oldValue: s}) {
        function n(o, l) {
            return o.filter(c=>c === l).length > 0
        }
        return n(r1.INDEXES.concat(["id", "class"]), e) ? (this.updateIndex({
            id: t,
            name: e,
            value: i,
            oldValue: s
        }),
        this) : this
    }
}
r1.defaultRegistry = null;
class X {
    static newID() {
        return "auto" + X.ID++
    }
    constructor({type: t}={}) {
        this.attrs = {
            id: X.newID(),
            el: null,
            type: t || "Base",
            classes: {}
        },
        this.boundingBox = null,
        this.context = null,
        this.rendered = !1,
        this.fontStack = y.DEFAULT_FONT_STACK,
        this.musicFont = y.DEFAULT_FONT_STACK[0],
        r1.getDefaultRegistry() && r1.getDefaultRegistry().register(this)
    }
    setFontStack(t) {
        return this.fontStack = t,
        this.musicFont = t[0],
        this
    }
    getFontStack() {
        return this.fontStack
    }
    setStyle(t) {
        return this.style = t,
        this
    }
    getStyle() {
        return this.style
    }
    applyStyle(t=this.context, e=this.getStyle()) {
        return e ? (t.save(),
        e.shadowColor && t.setShadowColor(e.shadowColor),
        e.shadowBlur && t.setShadowBlur(e.shadowBlur),
        e.fillStyle && t.setFillStyle(e.fillStyle),
        e.strokeStyle && t.setStrokeStyle(e.strokeStyle),
        e.lineWidth && t.setLineWidth(e.lineWidth),
        this) : this
    }
    restoreStyle(t=this.context, e=this.getStyle()) {
        return e ? (t.restore(),
        this) : this
    }
    drawWithStyle() {
        this.checkContext(),
        this.applyStyle(),
        this.draw(),
        this.restoreStyle()
    }
    hasClass(t) {
        return this.attrs.classes[t] === !0
    }
    addClass(t) {
        return this.attrs.classes[t] = !0,
        this.registry && this.registry.onUpdate({
            id: this.getAttribute("id"),
            name: "class",
            value: t,
            oldValue: null
        }),
        this
    }
    removeClass(t) {
        return delete this.attrs.classes[t],
        this.registry && this.registry.onUpdate({
            id: this.getAttribute("id"),
            name: "class",
            value: null,
            oldValue: t
        }),
        this
    }
    onRegister(t) {
        return this.registry = t,
        this
    }
    isRendered() {
        return this.rendered
    }
    setRendered(t=!0) {
        return this.rendered = t,
        this
    }
    getAttributes() {
        return this.attrs
    }
    getAttribute(t) {
        return this.attrs[t]
    }
    setAttribute(t, e) {
        const i = this.attrs.id
          , s = this.attrs[t];
        return this.attrs[t] = e,
        this.registry && this.registry.onUpdate({
            id: i,
            name: t,
            value: e,
            oldValue: s
        }),
        this
    }
    getContext() {
        return this.context
    }
    setContext(t) {
        return this.context = t,
        this
    }
    getBoundingBox() {
        return this.boundingBox
    }
    checkContext() {
        if (!this.context)
            throw new f.RERR("NoContext","No rendering context attached to instance");
        return this.context
    }
}
X.ID = 1e3;
class K3 {
    constructor(t, e, i, s) {
        this.x1 = Number.NaN,
        this.y1 = Number.NaN,
        this.x2 = Number.NaN,
        this.y2 = Number.NaN,
        this.addPoint(t, e),
        this.addPoint(i, s)
    }
    width() {
        return this.x2 - this.x1
    }
    height() {
        return this.y2 - this.y1
    }
    noOp() {}
    addPoint(t, e) {
        t != null && ((isNaN(this.x1) || isNaN(this.x2)) && (this.x1 = t,
        this.x2 = t),
        t < this.x1 && (this.x1 = t),
        t > this.x2 && (this.x2 = t)),
        e != null && ((isNaN(this.y1) || isNaN(this.y2)) && (this.y1 = e,
        this.y2 = e),
        e < this.y1 && (this.y1 = e),
        e > this.y2 && (this.y2 = e))
    }
    addX(t) {
        this.addPoint(t, null)
    }
    addY(t) {
        this.addPoint(null, t)
    }
    addQuadraticCurve(t, e, i, s, n, o) {
        const l = t + 2 / 3 * (i - t)
          , c = e + 2 / 3 * (s - e)
          , d = l + 1 / 3 * (n - t)
          , u = c + 1 / 3 * (o - e);
        this.addBezierCurve(t, e, l, c, d, u, n, o)
    }
    addBezierCurve(t, e, i, s, n, o, l, c) {
        const d = [t, e]
          , u = [i, s]
          , b = [n, o]
          , r = [l, c];
        let h;
        this.addPoint(d[0], d[1]),
        this.addPoint(r[0], r[1]);
        const m = (_,x)=>Math.pow(1 - _, 3) * d[x] + 3 * Math.pow(1 - _, 2) * _ * u[x] + 3 * (1 - _) * Math.pow(_, 2) * b[x] + Math.pow(_, 3) * r[x];
        for (h = 0; h <= 1; h++) {
            const _ = 6 * d[h] - 12 * u[h] + 6 * b[h]
              , x = -3 * d[h] + 9 * u[h] - 9 * b[h] + 3 * r[h]
              , p = 3 * u[h] - 3 * d[h];
            if (x === 0) {
                if (_ === 0)
                    continue;
                const S = -p / _;
                0 < S && S < 1 && (h === 0 && this.addX(m(S, h)),
                h === 1 && this.addY(m(S, h)));
                continue
            }
            const g = Math.pow(_, 2) - 4 * p * x;
            if (g < 0)
                continue;
            const T = (-_ + Math.sqrt(g)) / (2 * x);
            0 < T && T < 1 && (h === 0 && this.addX(m(T, h)),
            h === 1 && this.addY(m(T, h)));
            const w = (-_ - Math.sqrt(g)) / (2 * x);
            0 < w && w < 1 && (h === 0 && this.addX(m(w, h)),
            h === 1 && this.addY(m(w, h)))
        }
    }
}
class y1 {
    static copy(t) {
        return new y1(t.x,t.y,t.w,t.h)
    }
    constructor(t, e, i, s) {
        this.x = t,
        this.y = e,
        this.w = i,
        this.h = s
    }
    getX() {
        return this.x
    }
    getY() {
        return this.y
    }
    getW() {
        return this.w
    }
    getH() {
        return this.h
    }
    setX(t) {
        return this.x = t,
        this
    }
    setY(t) {
        return this.y = t,
        this
    }
    setW(t) {
        return this.w = t,
        this
    }
    setH(t) {
        return this.h = t,
        this
    }
    move(t, e) {
        this.x += t,
        this.y += e
    }
    clone() {
        return y1.copy(this)
    }
    mergeWith(t, e) {
        const i = t
          , s = this.x < i.x ? this.x : i.x
          , n = this.y < i.y ? this.y : i.y
          , o = Math.max(this.x + this.w, i.x + i.w) - s
          , l = Math.max(this.y + this.h, i.y + i.h) - n;
        return this.x = s,
        this.y = n,
        this.w = o,
        this.h = l,
        e && this.draw(e),
        this
    }
    draw(t, e, i) {
        e || (e = 0),
        i || (i = 0),
        t.rect(this.x + e, this.y + i, this.w, this.h),
        t.stroke()
    }
}
function H2(a, t, e, i, s, n) {
    let o, l, c, d = 0;
    function u() {
        return t + a[d++] * i
    }
    function b() {
        return e + a[d++] * s
    }
    function r(h, ...m) {
        n[h](...m)
    }
    for (; d < a.length; )
        switch (o = a[d++],
        o) {
        case "m":
        case "l":
            r(o, u(), b());
            break;
        case "q":
            l = u(),
            c = b(),
            r(o, u(), b(), l, c);
            break;
        case "b":
            l = u(),
            c = b(),
            r(o, u(), b(), u(), b(), l, c);
            break
        }
}
class E extends X {
    static lookupFontMetric({font: t, category: e, code: i, key: s, defaultValue: n}) {
        let o = t.lookupMetric(`glyphs.${e}.${i}.${s}`, null);
        return o === null && (o = t.lookupMetric(`glyphs.${e}.${s}`, n)),
        o
    }
    static lookupGlyph(t, e) {
        if (!t)
            throw f.RERR("BAD_FONTSTACK", "Font stack is misconfigured");
        let i, s;
        for (let n = 0; n < t.length && (s = t[n],
        i = s.getGlyphs()[e],
        !i); n++)
            ;
        if (!i)
            throw new f.RERR("BadGlyph",`Glyph ${e} does not exist in font.`);
        return {
            glyph: i,
            font: s
        }
    }
    static loadMetrics(t, e, i=null) {
        const {glyph: s, font: n} = E.lookupGlyph(t, e)
          , o = i ? E.lookupFontMetric({
            font: n,
            category: i,
            code: e,
            key: "shiftX",
            defaultValue: 0
        }) : 0
          , l = i ? E.lookupFontMetric({
            font: n,
            category: i,
            code: e,
            key: "shiftY",
            defaultValue: 0
        }) : 0
          , c = i ? E.lookupFontMetric({
            font: n,
            category: i,
            code: e,
            key: "scale",
            defaultValue: 1
        }) : 1
          , d = s.x_min
          , u = s.x_max
          , b = s.ha;
        let r;
        if (s.o)
            return s.cached_outline ? r = s.cached_outline : (r = s.o.split(" "),
            s.cached_outline = r),
            {
                x_min: d,
                x_max: u,
                x_shift: o,
                y_shift: l,
                scale: c,
                ha: b,
                outline: r,
                font: n
            };
        throw new f.RERR("BadGlyph",`Glyph ${e} has no outline defined.`)
    }
    static renderGlyph(t, e, i, s, n, o) {
        const l = R({
            fontStack: y.DEFAULT_FONT_STACK,
            category: null
        }, o)
          , c = E.loadMetrics(l.fontStack, n, l.category);
        s = l.category ? E.lookupFontMetric({
            font: c.font,
            category: l.category,
            code: n,
            key: "point",
            defaultValue: s
        }) : s;
        const d = s * 72 / (c.font.getResolution() * 100);
        return E.renderOutline(t, c.outline, d * c.scale, e + c.x_shift, i + c.y_shift, o),
        c
    }
    static renderOutline(t, e, i, s, n, o) {
        t.beginPath(),
        t.moveTo(s, n),
        H2(e, s, n, i, -i, {
            m: t.moveTo.bind(t),
            l: t.lineTo.bind(t),
            q: t.quadraticCurveTo.bind(t),
            b: t.bezierCurveTo.bind(t)
        }),
        t.fill()
    }
    static getOutlineBoundingBox(t, e, i, s) {
        const n = new K3;
        return H2(t, i, s, e, -e, {
            m: n.addPoint.bind(n),
            l: n.addPoint.bind(n),
            q: n.addQuadraticCurve.bind(n),
            b: n.addBezierCurve.bind(n),
            z: n.noOp.bind(n)
        }),
        new y1(n.x1,n.y1,n.width(),n.height())
    }
    constructor(t, e, i) {
        super();
        this.setAttribute("type", "Glyph"),
        this.code = t,
        this.point = e,
        this.options = {
            fontStack: this.getFontStack(),
            category: null
        },
        this.metrics = null,
        this.x_shift = 0,
        this.y_shift = 0,
        this.originShift = {
            x: 0,
            y: 0
        },
        i ? this.setOptions(i) : this.reset()
    }
    getCode() {
        return this.code
    }
    setOptions(t) {
        this.options = R(R({}, this.options), t),
        this.reset()
    }
    setPoint(t) {
        return this.point = t,
        this
    }
    setStave(t) {
        return this.stave = t,
        this
    }
    setXShift(t) {
        return this.x_shift = t,
        this
    }
    setYShift(t) {
        return this.y_shift = t,
        this
    }
    reset() {
        this.metrics = E.loadMetrics(this.options.fontStack, this.code, this.options.category),
        this.point = this.options.category ? E.lookupFontMetric({
            category: this.options.category,
            font: this.metrics.font,
            code: this.code,
            key: "point",
            defaultValue: this.point
        }) : this.point,
        this.scale = this.point * 72 / (this.metrics.font.getResolution() * 100),
        this.bbox = E.getOutlineBoundingBox(this.metrics.outline, this.scale * this.metrics.scale, this.metrics.x_shift, this.metrics.y_shift)
    }
    getMetrics() {
        if (!this.metrics)
            throw new f.RuntimeError("BadGlyph",`Glyph ${this.code} is not initialized.`);
        return {
            x_min: this.metrics.x_min * this.scale * this.metrics.scale,
            x_max: this.metrics.x_max * this.scale * this.metrics.scale,
            width: this.bbox.getW(),
            height: this.bbox.getH()
        }
    }
    setOriginX(t) {
        const {bbox: e} = this
          , i = Math.abs(e.getX() / e.getW())
          , s = (t - i) * e.getW();
        this.originShift.x = -s
    }
    setOriginY(t) {
        const {bbox: e} = this
          , i = Math.abs(e.getY() / e.getH())
          , s = (t - i) * e.getH();
        this.originShift.y = -s
    }
    setOrigin(t, e) {
        this.setOriginX(t),
        this.setOriginY(e)
    }
    render(t, e, i) {
        if (!this.metrics)
            throw new f.RuntimeError("BadGlyph",`Glyph ${this.code} is not initialized.`);
        const s = this.metrics.outline
          , n = this.scale * this.metrics.scale;
        this.setRendered(),
        this.applyStyle(t),
        E.renderOutline(t, s, n, e + this.originShift.x + this.metrics.x_shift, i + this.originShift.y + this.metrics.y_shift),
        this.restoreStyle(t)
    }
    renderToStave(t) {
        if (this.checkContext(),
        !this.metrics)
            throw new f.RuntimeError("BadGlyph",`Glyph ${this.code} is not initialized.`);
        if (!this.stave)
            throw new f.RuntimeError("GlyphError","No valid stave");
        const e = this.metrics.outline
          , i = this.scale * this.metrics.scale;
        this.setRendered(),
        this.applyStyle(),
        E.renderOutline(this.context, e, i, t + this.x_shift + this.metrics.x_shift, this.stave.getYForGlyphs() + this.y_shift + this.metrics.y_shift),
        this.restoreStyle()
    }
}
const q3 = {
    glyphs: {
        bracketTop: {
            x_min: 0,
            x_max: 469,
            y_min: 0,
            y_max: 295,
            ha: 295,
            o: "m 0 168 l 0 0 l 180 0 b 674 390 410 43 616 150 b 675 405 675 396 675 400 b 664 425 675 416 671 422 b 628 405 651 425 635 415 b 157 179 613 389 432 199 l 12 179 b 0 168 3 179 0 177 z"
        },
        bracketBottom: {
            x_min: 0,
            x_max: 469,
            y_min: -295,
            y_max: 0,
            ha: 295,
            o: "m 0 0 l 0 -168 b 12 -179 0 -177 3 -179 l 157 -179 b 628 -405 432 -199 613 -389 b 664 -425 635 -415 651 -425 b 675 -405 671 -422 675 -416 b 674 -390 675 -400 675 -396 b 180 0 616 -150 410 -43 z"
        },
        barlineTick: {
            x_min: 0,
            x_max: 36,
            y_min: 868,
            y_max: 1120,
            ha: 252,
            o: "m 52 1250 l 52 1613 l 0 1613 l 0 1250 z"
        },
        breathMarkTick: {
            x_min: 0,
            x_max: 500,
            y_min: 0,
            y_max: 502,
            ha: 502,
            o: "m 0 374 b 9 334 0 367 0 343 b 179 19 40 312 164 121 b 192 0 179 3 186 0 b 210 19 197 0 207 6 b 698 701 245 197 507 658 b 720 714 714 704 720 711 b 698 723 720 720 711 723 b 197 186 455 714 210 202 b 186 176 194 179 189 176 b 176 186 179 176 176 186 b 9 367 143 266 27 359 b 0 374 6 372 3 374 z"
        },
        segno: {
            x_min: 4,
            x_max: 550,
            y_min: -27,
            y_max: 759,
            ha: 786,
            o: "m 29 687 b 295 449 75 582 284 454 b 304 438 301 446 304 444 b 295 415 304 432 301 425 b 78 22 285 395 78 22 b 73 3 75 16 73 9 b 114 -39 73 -20 91 -39 b 150 -17 128 -39 143 -30 b 377 395 150 -17 373 386 b 395 402 377 393 389 402 b 704 176 416 397 704 312 b 624 75 704 120 670 82 b 613 73 621 75 616 73 b 562 138 586 73 562 94 l 562 154 b 485 249 562 209 526 249 b 468 246 480 249 474 248 b 366 153 415 233 366 210 b 540 -12 366 65 455 -12 b 600 -1 559 -12 579 -9 b 792 251 716 37 792 131 b 789 292 792 264 791 278 b 523 588 768 451 540 579 b 498 611 505 598 498 603 b 501 619 498 613 500 616 b 732 1032 508 631 732 1032 b 737 1053 736 1040 737 1045 b 697 1093 737 1076 719 1093 b 661 1073 683 1093 668 1086 b 423 647 661 1073 432 660 b 410 635 419 639 416 635 b 396 639 406 635 402 636 b 128 792 383 644 166 727 b 108 868 120 808 108 838 b 186 958 108 907 125 948 l 194 958 b 217 939 203 958 213 955 l 220 929 b 325 805 230 890 252 805 b 425 901 384 805 425 840 b 413 969 425 923 420 946 b 220 1060 390 1035 294 1060 b 6 793 120 1060 6 936 b 29 687 6 759 13 723 z m 680 589 b 762 671 726 589 762 626 b 680 753 762 717 726 753 b 598 671 635 753 598 717 b 680 589 598 626 635 589 z m 120 298 b 202 380 166 298 202 334 b 120 462 202 425 166 462 b 37 380 75 462 37 425 b 120 298 37 334 75 298 z"
        },
        coda: {
            x_min: -4,
            x_max: 955,
            y_min: -158,
            y_max: 898,
            ha: 1056,
            o: "m -6 541 b 20 507 -6 523 0 507 l 210 507 b 660 0 226 238 426 19 l 660 -202 b 694 -228 660 -222 675 -228 b 729 -202 713 -228 729 -222 l 729 0 b 1178 507 962 19 1164 238 l 1349 507 b 1375 541 1369 507 1375 523 b 1349 576 1375 560 1369 576 l 1178 576 b 729 1083 1164 847 962 1064 l 729 1269 b 694 1293 729 1287 713 1293 b 660 1269 675 1293 660 1287 l 660 1083 b 210 576 426 1064 226 848 l 20 576 b -6 541 0 576 -6 560 z m 940 576 l 729 576 l 729 1002 b 940 576 930 985 940 809 z m 729 507 l 940 507 b 729 69 936 287 909 91 z m 455 576 b 660 1002 455 809 455 985 l 660 576 z m 660 507 l 660 69 b 455 507 474 91 456 285 z"
        },
        gClef: {
            x_min: 0,
            x_max: 671,
            y_min: -658,
            y_max: 1098,
            ha: 1756,
            o: "m 524 -363 b 624 -354 557 -363 595 -360 b 645 -367 639 -351 642 -350 b 684 -657 662 -464 684 -589 b 455 -896 684 -870 540 -896 b 340 -854 377 -896 340 -873 b 386 -829 340 -844 353 -840 b 482 -694 431 -816 482 -778 b 344 -547 482 -615 432 -547 b 190 -713 248 -547 190 -624 b 464 -948 190 -806 246 -948 b 747 -660 560 -948 747 -904 b 706 -351 747 -577 721 -441 b 724 -327 703 -334 704 -336 b 966 16 870 -269 966 -147 b 619 363 966 200 831 363 b 577 389 582 363 582 363 l 541 598 b 550 625 539 615 541 616 b 824 1174 706 770 824 953 b 730 1509 824 1299 789 1423 b 655 1581 708 1541 671 1581 b 562 1512 635 1581 590 1544 b 420 1064 455 1394 420 1214 b 441 828 420 981 431 887 b 428 793 444 811 445 808 b 0 125 220 622 0 416 b 524 -363 0 -125 171 -363 z m 115 29 b 249 363 115 114 130 228 b 469 567 336 459 402 513 b 490 562 484 579 487 577 l 520 377 b 498 343 524 350 524 351 b 289 63 372 300 289 186 b 455 -192 289 -66 357 -158 b 494 -200 467 -196 484 -200 b 511 -184 505 -200 511 -193 b 490 -166 511 -174 500 -170 b 386 -12 429 -140 386 -78 b 530 157 386 71 442 132 b 559 145 553 163 556 161 l 631 -284 b 611 -304 634 -300 632 -300 b 530 -311 588 -308 559 -311 b 115 29 278 -311 115 -171 z m 677 1358 b 763 1240 724 1358 763 1319 b 513 851 763 1080 626 950 b 494 863 503 842 497 844 b 485 995 488 900 485 949 b 677 1358 485 1220 589 1358 z m 635 168 b 848 -66 752 158 848 60 b 713 -271 848 -157 793 -230 b 690 -262 696 -279 693 -279 l 619 148 b 635 168 616 166 618 170 z"
        },
        cClef: {
            x_min: 0,
            x_max: 699,
            y_min: -506,
            y_max: 506,
            ha: 1012,
            o: "m 269 -694 b 300 -724 269 -714 279 -724 l 301 -724 b 331 -694 321 -724 331 -714 l 331 -63 b 344 -55 331 -52 338 -53 b 472 -265 382 -65 442 -102 b 500 -301 477 -288 485 -301 b 530 -262 516 -301 523 -287 b 684 -128 549 -199 582 -128 b 804 -409 778 -128 804 -220 b 651 -683 804 -598 770 -683 b 528 -644 631 -683 528 -674 b 567 -622 528 -636 552 -628 b 625 -528 596 -612 625 -583 b 527 -429 625 -465 583 -429 b 416 -547 465 -429 416 -471 b 667 -729 416 -638 495 -729 b 1007 -413 903 -729 1007 -563 b 706 -76 1007 -215 897 -76 b 618 -89 664 -76 636 -84 b 576 -88 603 -94 589 -96 b 524 0 556 -75 524 -29 b 576 88 524 29 556 75 b 618 89 589 96 603 94 b 706 76 636 84 664 76 b 1007 413 897 76 1007 215 b 667 729 1007 563 903 729 b 416 547 495 729 416 638 b 527 429 416 471 465 429 b 625 528 583 429 625 465 b 567 622 625 583 596 612 b 528 644 552 628 528 636 b 651 683 528 674 631 683 b 804 409 770 683 804 598 b 684 128 804 220 778 128 b 530 262 582 128 549 199 b 500 301 523 287 516 301 b 472 265 485 301 477 288 b 344 55 442 102 382 65 b 331 63 338 53 331 52 l 331 694 b 301 724 331 714 321 724 l 300 724 b 269 694 279 724 269 714 z m 30 -724 l 154 -724 b 184 -694 174 -724 184 -714 l 184 694 b 154 724 184 714 174 724 l 30 724 b 0 694 10 724 0 714 l 0 -694 b 30 -724 0 -714 10 -724 z"
        },
        fClef: {
            x_min: -5,
            x_max: 684,
            y_min: -635,
            y_max: 262,
            ha: 897,
            o: "m 12 -914 b 36 -907 19 -914 27 -912 b 765 -40 390 -734 765 -478 b 363 377 765 210 612 377 b 0 56 112 377 0 194 b 177 -158 0 -59 60 -158 b 330 -6 268 -158 330 -95 b 192 144 330 86 262 144 b 120 134 153 144 138 134 b 96 160 101 134 96 145 b 330 323 96 217 183 323 b 549 -53 482 323 549 173 b 14 -871 549 -455 350 -680 b -7 -897 1 -878 -7 -886 b 12 -914 -7 -906 -1 -914 z m 906 101 b 985 180 950 101 985 135 b 906 259 985 225 950 259 b 827 180 861 259 827 225 b 906 101 827 135 861 101 z m 907 -258 b 985 -180 952 -258 985 -225 b 907 -102 985 -135 952 -102 b 829 -180 863 -102 829 -135 b 907 -258 829 -225 863 -258 z"
        },
        unpitchedPercussionClef1: {
            x_min: 0,
            x_max: 382,
            y_min: -250,
            y_max: 250,
            ha: 500,
            o: "m 320 338 l 320 -338 b 340 -360 320 -350 328 -360 l 530 -360 b 550 -338 541 -360 550 -350 l 550 338 b 530 360 550 350 541 360 l 340 360 b 320 338 328 360 320 350 z m 20 -360 l 210 -360 b 230 -338 222 -360 230 -350 l 230 338 b 210 360 230 350 222 360 l 20 360 b 0 338 9 360 0 350 l 0 -338 b 20 -360 0 -350 9 -360 z"
        },
        "6stringTabClef": {
            x_min: -3,
            x_max: 408,
            y_min: -748,
            y_max: 764,
            ha: 1512,
            o: "m 39 -399 l 39 -1077 l 344 -1077 b 544 -883 467 -1077 544 -995 b 420 -719 544 -802 507 -752 b 514 -572 482 -690 514 -639 b 314 -399 514 -472 442 -399 z m 88 -328 l 160 -125 l 420 -125 l 491 -328 l 588 -328 l 350 348 l 238 348 l -4 -328 z m 26 1100 l 26 1024 l 249 1024 l 249 422 l 336 422 l 336 1024 l 557 1024 l 557 1100 z m 125 -768 l 337 -768 b 458 -884 418 -768 458 -818 b 337 -1001 458 -949 418 -1001 l 125 -1001 z m 292 -475 b 428 -583 389 -475 428 -514 b 292 -691 428 -652 389 -691 l 125 -691 l 125 -475 z m 292 256 l 397 -52 l 181 -52 z"
        },
        timeSig0: {
            x_min: 20,
            x_max: 450,
            y_min: -250,
            y_max: 251,
            ha: 501,
            o: "m 338 -360 b 648 0 510 -360 648 -199 b 338 361 648 200 510 361 b 29 0 167 361 29 200 b 338 -360 29 -199 167 -360 z m 230 10 b 338 317 230 180 278 317 b 446 10 397 317 446 180 b 338 -295 446 -158 397 -295 b 230 10 278 -295 230 -158 z"
        },
        timeSig1: {
            x_min: 20,
            x_max: 314,
            y_min: -250,
            y_max: 251,
            ha: 501,
            o: "m 29 0 b 45 -20 29 -7 33 -16 b 58 -23 50 -22 56 -23 b 78 -10 72 -23 78 -10 b 156 117 78 -10 140 89 b 170 131 161 127 167 131 b 179 111 176 131 179 120 l 179 -261 b 115 -315 179 -294 145 -315 b 91 -337 105 -315 91 -320 b 122 -360 91 -353 104 -360 l 429 -360 b 452 -337 452 -360 452 -337 b 431 -315 452 -337 452 -315 b 384 -265 410 -315 384 -289 l 384 328 b 356 361 384 351 376 360 b 281 356 336 361 300 356 b 206 360 253 356 228 357 b 199 361 203 360 200 361 b 173 334 184 361 179 347 l 35 19 b 29 0 35 19 29 10 z"
        },
        timeSig2: {
            x_min: 20,
            x_max: 426,
            y_min: -257,
            y_max: 254,
            ha: 511,
            o: "m 29 170 b 42 108 29 150 33 130 b 160 29 63 63 108 29 b 261 156 248 29 261 120 b 161 275 261 242 161 246 b 275 330 164 295 190 330 b 405 192 403 330 405 233 b 193 -102 405 60 297 -39 b 33 -314 114 -153 58 -223 b 69 -370 33 -336 40 -370 b 203 -282 101 -370 118 -282 b 410 -360 261 -282 282 -360 b 606 -131 472 -360 583 -354 b 589 -111 606 -114 599 -111 b 570 -125 577 -111 573 -117 b 569 -130 570 -127 569 -128 b 513 -192 554 -164 543 -192 b 488 -187 505 -192 498 -190 b 445 -171 469 -180 459 -179 b 289 -137 416 -160 348 -137 b 236 -145 271 -137 252 -140 b 422 -42 268 -94 390 -50 b 613 147 523 -14 613 27 b 330 366 613 300 464 366 b 69 275 229 366 140 357 b 29 170 45 245 29 209 z"
        },
        timeSig3: {
            x_min: 20,
            x_max: 401,
            y_min: -251,
            y_max: 249,
            ha: 500,
            o: "m 29 -203 b 275 -361 32 -315 134 -359 l 288 -361 b 577 -161 431 -361 577 -288 l 577 -151 b 537 -50 575 -109 564 -82 b 503 -20 528 -39 517 -29 l 472 -3 l 425 10 b 410 17 418 12 413 12 b 409 24 409 20 409 22 b 415 37 409 30 410 36 b 459 50 431 42 446 43 b 547 181 517 78 547 115 b 307 357 547 314 367 353 b 285 359 300 357 292 359 b 37 200 161 359 37 276 b 154 84 37 153 65 89 l 161 84 b 256 177 225 84 256 130 l 256 189 b 209 248 252 242 216 245 b 180 268 202 251 180 248 l 180 274 b 240 310 183 298 228 310 b 374 199 363 310 374 233 l 374 189 b 199 36 374 82 289 40 b 164 12 184 35 164 27 b 200 -6 164 -6 189 -6 b 379 -137 366 -6 379 -118 b 269 -307 379 -289 301 -307 b 256 -305 264 -307 258 -305 b 216 -282 245 -304 217 -304 l 216 -275 b 249 -180 216 -243 248 -222 b 145 -76 249 -120 207 -76 b 130 -78 140 -76 135 -76 b 60 -115 105 -82 78 -96 b 29 -203 36 -137 29 -171 z"
        },
        timeSig4: {
            x_min: 20,
            x_max: 450,
            y_min: -250,
            y_max: 251,
            ha: 501,
            o: "m 58 -161 l 325 -161 l 325 -252 b 268 -302 325 -291 294 -302 b 235 -330 245 -302 235 -315 b 262 -360 235 -344 240 -360 l 569 -360 b 598 -330 583 -360 598 -350 b 566 -301 598 -310 580 -301 b 521 -246 552 -301 521 -292 l 521 -161 l 626 -161 b 648 -134 641 -161 648 -151 b 626 -107 648 -117 642 -107 l 521 -107 l 521 202 b 504 226 521 213 520 226 b 475 213 491 226 484 223 l 338 48 b 325 14 333 40 325 32 l 325 -107 l 131 -107 b 481 334 246 -9 477 318 b 482 341 481 337 482 338 b 461 361 482 353 472 361 b 363 359 448 361 389 359 b 261 361 337 359 272 361 b 228 334 248 361 228 357 b 43 -105 228 156 86 -45 l 35 -117 b 33 -121 35 -118 33 -120 b 29 -137 30 -127 29 -132 b 58 -161 29 -151 40 -161 z"
        },
        timeSig5: {
            x_min: 20,
            x_max: 383,
            y_min: -251,
            y_max: 246,
            ha: 497,
            o: "m 29 -183 b 284 -361 29 -302 107 -361 b 552 -125 456 -361 552 -255 b 314 112 552 6 445 112 b 122 71 230 112 168 98 b 115 69 120 69 117 69 b 109 79 109 69 109 75 l 109 85 b 117 179 109 85 115 166 b 138 197 118 190 125 197 l 144 197 b 285 184 158 194 226 184 b 492 323 485 184 492 300 b 472 353 492 341 488 353 b 295 340 454 353 341 340 b 101 354 249 340 125 351 b 66 330 75 354 68 341 l 50 10 l 50 7 b 79 -14 50 -12 65 -14 b 111 14 94 -14 95 -1 b 209 62 125 29 160 62 b 357 -125 258 62 357 35 b 235 -304 357 -284 272 -304 b 202 -300 223 -304 212 -304 b 184 -279 194 -295 186 -289 b 202 -259 184 -269 194 -264 b 256 -163 235 -239 256 -203 b 144 -50 256 -99 206 -50 b 30 -157 66 -50 35 -107 b 29 -183 29 -166 29 -174 z"
        },
        timeSig6: {
            x_min: 20,
            x_max: 414,
            y_min: -249,
            y_max: 251,
            ha: 500,
            o: "m 29 4 l 29 -1 b 73 -200 30 -68 42 -143 b 324 -359 132 -307 203 -359 b 513 -307 389 -359 461 -348 b 596 -137 563 -266 596 -202 b 379 72 596 -24 490 72 b 248 22 333 72 285 55 b 239 19 245 19 242 19 b 226 53 230 19 226 30 b 346 327 230 320 315 327 b 393 305 374 327 393 320 b 357 251 393 285 366 268 b 347 209 350 238 347 223 b 369 150 347 187 354 166 b 439 120 379 131 420 120 b 554 229 500 120 554 167 b 553 245 554 235 554 239 b 348 361 539 337 426 361 b 85 209 239 360 137 307 b 29 4 53 148 29 72 z m 320 3 b 405 -158 366 3 405 -69 b 320 -320 405 -248 366 -320 b 236 -158 274 -320 236 -248 b 320 3 236 -69 274 3 z"
        },
        timeSig7: {
            x_min: 20,
            x_max: 421,
            y_min: -250,
            y_max: 249,
            ha: 499,
            o: "m 29 71 b 45 48 29 71 30 48 b 66 76 56 48 60 60 b 164 196 81 112 99 196 b 374 88 222 196 291 88 b 446 118 415 88 435 109 b 459 124 451 121 456 124 b 469 111 465 124 468 120 b 272 -112 469 71 359 -10 b 173 -315 217 -176 173 -259 b 200 -360 173 -346 173 -360 b 294 -347 226 -360 258 -347 b 412 -360 330 -347 397 -360 b 435 -307 426 -360 435 -348 b 606 288 435 -66 606 140 l 606 294 b 582 351 606 333 606 351 b 552 336 580 351 557 346 b 485 236 541 318 521 236 b 262 359 449 236 382 359 b 137 307 179 359 157 325 b 98 281 117 288 108 282 b 60 315 86 281 68 301 b 43 325 58 321 50 325 b 29 308 36 325 29 321 z"
        },
        timeSig8: {
            x_min: 20,
            x_max: 416,
            y_min: -259,
            y_max: 259,
            ha: 518,
            o: "m 29 -190 b 301 -373 29 -315 158 -373 b 599 -117 445 -373 599 -311 b 481 52 599 -30 549 17 b 567 204 533 85 567 132 b 317 373 567 351 356 373 b 36 176 150 373 36 297 b 161 -16 36 76 92 23 b 29 -190 86 -52 29 -99 z m 111 -183 b 225 -48 111 -125 161 -72 b 436 -219 330 -94 436 -124 b 295 -325 436 -276 392 -325 b 111 -183 199 -325 111 -276 z m 314 331 b 482 207 360 331 482 308 b 406 85 482 150 454 112 b 168 240 291 125 168 150 b 314 331 168 301 251 331 z"
        },
        timeSig9: {
            x_min: 20,
            x_max: 414,
            y_min: -249,
            y_max: 251,
            ha: 500,
            o: "m 246 -69 b 377 -19 292 -69 340 -52 b 386 -16 380 -16 383 -16 b 399 -50 395 -16 399 -27 b 279 -324 395 -317 310 -324 b 232 -302 251 -324 232 -317 b 268 -248 232 -282 259 -265 b 278 -206 275 -235 278 -220 b 256 -147 278 -184 271 -163 b 186 -117 246 -128 204 -117 b 71 -226 125 -117 71 -164 b 72 -242 71 -232 71 -236 b 276 -359 86 -334 199 -359 b 540 -206 386 -357 488 -304 b 596 -1 572 -145 596 -69 l 596 4 b 552 203 595 71 583 145 b 301 361 492 310 422 361 b 112 310 236 361 164 351 b 29 140 62 269 29 204 b 246 -69 29 27 135 -69 z m 220 161 b 305 323 220 251 259 323 b 389 161 351 323 389 251 b 305 0 389 72 351 0 b 220 161 259 0 220 72 z"
        },
        timeSigCommon: {
            x_min: 5,
            x_max: 424,
            y_min: -249,
            y_max: 251,
            ha: 500,
            o: "m 101 -262 b 321 -359 156 -328 235 -359 b 611 -88 573 -359 611 -130 b 589 -56 611 -56 595 -56 b 567 -82 577 -56 567 -58 b 363 -311 567 -268 409 -311 b 184 40 246 -311 184 -197 b 372 327 184 278 294 327 b 477 278 446 327 477 292 b 451 246 477 265 472 246 b 360 140 393 246 360 184 b 471 32 360 58 431 32 b 580 156 471 32 580 36 b 336 361 580 344 363 361 b 7 -14 131 361 7 180 b 101 -262 7 -108 42 -190 z"
        },
        timeSigCutCommon: {
            x_min: 0,
            x_max: 418,
            y_min: -359,
            y_max: 361,
            ha: 720,
            o: "m 225 -346 b 252 -382 235 -350 252 -369 l 252 -492 b 276 -517 252 -505 265 -517 b 302 -492 292 -517 302 -505 l 302 -379 b 318 -359 302 -370 308 -363 b 602 -85 563 -354 602 -130 b 579 -58 600 -58 586 -58 l 573 -58 b 559 -82 567 -58 559 -60 b 354 -310 559 -266 400 -310 b 317 -305 340 -310 328 -308 b 302 -284 311 -304 302 -295 l 302 287 b 338 323 302 297 328 321 b 363 324 347 324 356 324 b 468 275 436 324 468 289 b 442 243 468 264 464 243 b 351 137 384 243 351 181 b 462 30 351 56 422 30 b 572 154 462 30 572 35 b 318 357 572 295 441 357 b 302 390 310 359 302 383 l 302 495 b 276 520 302 507 292 520 b 252 495 265 520 252 507 l 252 369 b 235 346 252 359 238 346 l 196 331 b 0 -14 66 275 0 122 b 225 -346 0 -150 86 -310 z m 232 259 b 236 262 233 262 235 262 b 252 239 243 262 252 251 l 252 -235 b 243 -252 252 -248 248 -252 b 236 -248 240 -252 238 -251 b 177 37 197 -193 177 -96 b 232 259 177 147 200 215 z"
        },
        noteheadDoubleWhole: {
            x_min: 0,
            x_max: 599,
            y_min: -155,
            y_max: 155,
            ha: 310,
            o: "m 423 -180 b 733 1 657 -180 733 -98 l 733 -213 b 747 -223 733 -219 740 -223 l 766 -223 b 780 -213 773 -223 780 -219 l 780 212 b 766 223 780 217 773 223 l 747 223 b 733 212 740 223 733 217 l 733 1 b 438 180 733 104 572 180 b 130 1 248 180 130 101 b 423 -180 130 -92 210 -180 z m 284 58 b 400 147 284 131 333 147 b 577 -45 498 147 577 42 b 469 -145 577 -115 533 -145 b 331 -71 409 -145 369 -112 b 284 58 305 -37 284 12 z m 815 -213 b 829 -223 815 -219 824 -223 l 848 -223 b 863 -213 857 -223 863 -219 l 863 212 b 848 223 863 217 857 223 l 829 223 b 815 212 824 223 815 217 z m 82 212 l 82 -213 b 96 -223 82 -219 88 -223 l 114 -223 b 128 -213 121 -223 128 -219 l 128 212 b 114 223 128 217 121 223 l 96 223 b 82 212 88 223 82 217 z m 13 -223 l 32 -223 b 45 -213 39 -223 45 -219 l 45 212 b 32 223 45 217 39 223 l 13 223 b 0 212 4 223 0 217 l 0 -213 b 13 -223 0 -219 4 -223 z"
        },
        noteheadWhole: {
            x_min: 0,
            x_max: 422,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 0 3 b 297 -180 0 -94 82 -180 b 608 3 533 -180 608 -98 b 311 180 608 105 445 180 b 0 3 120 180 0 101 z m 156 56 b 160 91 156 68 157 79 b 274 148 176 141 229 148 b 452 -45 373 148 452 42 b 386 -141 452 -89 433 -130 b 341 -147 372 -145 356 -147 b 206 -72 289 -147 236 -112 b 156 56 177 -39 156 10 z"
        },
        noteheadHalf: {
            x_min: 0,
            x_max: 295,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 140 -180 b 425 60 377 -180 425 13 b 282 180 425 134 366 180 b 0 -60 68 180 0 14 b 140 -180 0 -137 60 -180 z m 42 -63 b 318 121 42 7 251 121 b 372 91 346 121 361 108 b 380 63 376 82 380 73 b 108 -125 380 1 177 -125 b 50 -92 78 -125 60 -109 b 42 -63 46 -84 42 -73 z"
        },
        noteheadBlack: {
            x_min: 0,
            x_max: 295,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 0 -60 b 140 -180 0 -135 62 -180 b 425 60 268 -180 425 -62 b 285 180 425 134 367 180 b 0 -60 127 180 0 63 z"
        },
        noteheadXWhole: {
            x_min: 0,
            x_max: 377,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 0 148 b 12 124 0 140 4 131 l 132 0 l 12 -124 b 1 -148 4 -131 1 -140 b 32 -180 1 -164 14 -180 l 158 -180 b 179 -171 166 -180 173 -177 l 272 -95 l 364 -171 b 384 -180 370 -177 377 -180 l 511 -180 b 543 -148 528 -180 543 -164 b 531 -124 543 -140 539 -131 l 412 0 l 531 124 b 541 148 539 131 541 140 b 513 180 541 164 528 180 l 384 180 b 364 171 377 180 370 177 l 272 94 l 179 171 b 158 180 173 177 166 180 l 30 180 b 0 148 16 180 0 164 z m 245 0 l 88 141 l 157 141 l 272 45 l 386 141 l 456 141 l 300 0 l 456 -141 l 386 -141 l 272 -45 l 157 -141 l 88 -141 z"
        },
        noteheadXHalf: {
            x_min: 0,
            x_max: 334,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 32 -180 l 184 -180 b 209 -170 193 -180 203 -177 l 271 -99 l 363 -171 b 384 -180 370 -176 377 -180 l 445 -180 b 478 -147 461 -180 478 -163 b 465 -125 478 -138 474 -131 l 341 -22 l 474 127 b 481 148 480 131 481 138 b 448 180 481 166 468 180 l 295 180 b 271 170 287 180 278 177 l 209 98 l 115 171 b 95 180 109 177 104 180 l 36 180 b 4 148 19 180 4 164 b 14 124 4 140 7 132 l 140 22 l 7 -127 b 0 -148 3 -131 0 -138 b 32 -180 0 -166 14 -180 z m 95 148 l 233 33 l 334 148 l 410 148 l 274 -6 l 445 -148 l 384 -148 l 248 -35 l 147 -148 l 71 -148 l 206 4 l 36 148 z"
        },
        noteheadXBlack: {
            x_min: 0,
            x_max: 290,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 0 -158 b 19 -180 0 -170 7 -180 b 29 -176 23 -180 26 -179 l 207 -24 l 389 -176 b 399 -180 392 -179 396 -180 b 418 -160 410 -180 418 -168 b 410 -143 418 -153 415 -147 l 239 0 l 410 144 b 418 160 415 147 418 154 b 399 180 418 171 408 180 b 389 177 396 180 392 179 l 207 26 l 29 177 b 17 180 26 179 22 180 b 0 161 7 180 0 170 b 7 144 0 156 3 148 l 179 0 l 7 -143 b 0 -158 1 -147 0 -153 z"
        },
        noteheadCircleX: {
            x_min: 0,
            x_max: 249,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 0 0 b 179 -180 0 -99 81 -180 b 359 0 278 -180 359 -99 b 179 180 359 99 278 180 b 0 0 81 180 0 99 z m 69 84 l 151 1 l 68 -84 b 40 0 49 -60 40 -30 b 69 84 40 32 50 60 z m 180 -27 l 262 -111 b 179 -138 239 -128 210 -138 b 95 -111 148 -138 120 -128 z m 209 1 l 291 84 b 317 0 307 60 317 30 b 292 -82 317 -30 308 -59 z m 179 138 b 261 112 210 138 238 128 l 180 30 l 98 112 b 179 138 121 128 148 138 z"
        },
        noteheadTriangleUpWhole: {
            x_min: 0,
            x_max: 319,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 0 -166 b 14 -180 0 -173 6 -180 l 445 -180 b 459 -166 454 -180 459 -173 b 458 -158 459 -163 458 -160 l 239 173 b 228 180 238 177 233 180 b 216 173 225 180 219 177 l 1 -158 b 0 -166 1 -160 0 -163 z m 145 -96 b 228 108 145 -17 197 56 b 310 -98 259 55 310 -17 b 288 -137 310 -111 301 -137 l 170 -137 b 145 -96 157 -137 145 -109 z"
        },
        noteheadTriangleUpHalf: {
            x_min: 0,
            x_max: 285,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 14 -180 l 396 -180 b 410 -166 406 -180 410 -173 b 409 -158 410 -163 410 -161 l 228 173 b 215 180 226 174 220 180 b 202 173 210 180 204 177 l 3 -157 b 0 -166 1 -160 0 -163 b 14 -180 0 -173 7 -180 z m 115 -138 l 232 76 l 297 -37 l 246 -138 z"
        },
        noteheadTriangleUpBlack: {
            x_min: 0,
            x_max: 293,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 422 -180 l 207 180 l 0 -180 z"
        },
        noteheadDiamondWhole: {
            x_min: 0,
            x_max: 270,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 4 7 l 258 -179 b 264 -180 261 -179 262 -180 b 272 -176 268 -180 271 -179 l 386 -23 b 389 -16 387 -20 389 -19 b 383 -7 389 -13 386 -9 l 130 179 b 122 180 128 180 125 180 b 115 177 120 180 117 180 l 3 23 b 0 17 1 20 0 19 b 4 7 0 16 3 10 z m 109 111 b 112 112 109 112 111 112 b 118 111 115 112 117 111 l 320 -37 b 324 -46 323 -39 324 -42 b 275 -111 278 -111 276 -111 b 268 -108 272 -111 271 -109 l 66 40 b 62 48 65 42 62 45 z"
        },
        noteheadDiamondHalf: {
            x_min: 0,
            x_max: 251,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 4 -7 l 174 -177 b 180 -180 176 -180 179 -180 b 189 -177 183 -180 186 -180 l 359 -7 b 361 0 360 -6 361 -3 b 359 7 361 3 360 4 l 189 177 b 180 180 186 179 183 180 b 174 177 179 180 176 179 l 4 7 b 0 0 1 4 0 3 b 4 -7 0 -3 1 -6 z m 215 73 b 266 26 238 73 266 50 b 138 -71 266 -12 176 -71 b 96 -50 121 -71 108 -63 b 88 -24 89 -43 88 -32 b 215 73 88 13 177 73 z"
        },
        noteheadDiamondBlack: {
            x_min: 0,
            x_max: 250,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 4 -7 l 173 -177 b 180 -180 176 -180 177 -180 b 187 -177 181 -180 184 -180 l 357 -6 b 360 1 359 -4 360 -1 b 357 9 360 4 359 7 l 189 177 b 180 180 187 179 184 180 b 171 177 177 180 173 179 l 3 9 b 0 1 0 6 0 4 b 4 -7 0 -1 1 -4 z"
        },
        noteheadSquareWhite: {
            x_min: 0,
            x_max: 313,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 451 -180 l 451 180 l 0 180 l 0 -180 z m 40 -138 l 40 140 l 410 140 l 410 -138 z"
        },
        noteheadSquareBlack: {
            x_min: 0,
            x_max: 313,
            y_min: -125,
            y_max: 125,
            ha: 250,
            o: "m 451 -180 l 451 180 l 0 180 l 0 -180 z"
        },
        augmentationDot: {
            x_min: 0,
            x_max: 100,
            y_min: -50,
            y_max: 50,
            ha: 100,
            o: "m 72 -72 b 144 0 112 -72 144 -40 b 72 72 144 40 112 72 b 0 0 32 72 0 40 b 72 -72 0 -40 32 -72 z"
        },
        tremolo1: {
            x_min: -150,
            x_max: 150,
            y_min: -93,
            y_max: 94,
            ha: 187,
            o: "m 216 -45 l 216 135 l -216 46 l -216 -134 z"
        },
        flag8thUp: {
            x_min: 0,
            x_max: 264,
            y_min: -810.1921176545985,
            y_max: 9,
            ha: 819.1921176545985,
            o: "m 284 -688 b 318 -904 305 -737 318 -819 b 284 -1102 318 -969 308 -1037 b 279 -1123 281 -1110 279 -1117 b 302 -1165 279 -1146 294 -1159 b 343 -1138 311 -1171 336 -1162 b 380 -888 343 -1138 380 -1001 b 215 -395 380 -708 305 -539 b 58 -19 141 -281 81 -157 b 14 13 53 4 42 13 b 0 -9 6 13 0 9 l 0 -353 b 284 -688 95 -370 232 -566 z"
        },
        flag8thDown: {
            x_min: 0,
            x_max: 306,
            y_min: -14,
            y_max: 808,
            ha: 822,
            o: "m 16 -20 b 58 12 43 -20 55 -12 b 262 387 82 148 189 274 b 441 881 353 530 441 701 b 400 1142 441 994 412 1096 b 377 1164 396 1158 387 1164 b 346 1094 356 1164 331 1136 b 376 897 366 1034 376 962 b 318 642 376 812 340 691 b 0 340 265 521 193 405 l 0 1 b 16 -20 0 -16 7 -20 z"
        },
        flag16thUp: {
            x_min: 0,
            x_max: 279,
            y_min: -813,
            y_max: 2,
            ha: 815,
            o: "m 7 -570 b 298 -778 96 -573 199 -576 b 344 -992 331 -847 344 -917 b 333 -1120 344 -1034 340 -1077 b 331 -1133 331 -1126 331 -1129 b 363 -1171 331 -1152 343 -1171 b 392 -1146 373 -1171 383 -1165 b 402 -988 397 -1139 402 -1057 l 402 -956 b 360 -783 402 -896 386 -837 b 359 -770 360 -779 359 -776 b 360 -760 359 -768 359 -765 b 396 -577 364 -752 396 -665 b 392 -526 396 -559 395 -543 b 236 -275 377 -428 340 -387 b 53 -16 158 -192 78 -168 b 24 3 50 0 33 3 b 0 1 16 3 0 1 l 0 -570 z m 78 -312 l 89 -312 b 302 -464 177 -312 255 -393 b 341 -592 328 -501 341 -546 b 340 -621 341 -602 341 -611 b 330 -658 337 -632 337 -647 b 311 -667 328 -662 318 -667 b 301 -661 307 -667 304 -665 b 223 -562 278 -625 253 -596 b 59 -331 156 -484 89 -449 b 58 -327 58 -330 58 -328 b 78 -312 58 -321 66 -312 z"
        },
        flag16thDown: {
            x_min: 0,
            x_max: 290.8951581511223,
            y_min: -9,
            y_max: 812.0064,
            ha: 821.0064,
            o: "m 0 -12 b 24 -13 0 -12 16 -13 b 53 6 33 -13 50 -10 b 406 516 88 228 372 289 b 410 567 409 531 410 549 b 374 750 410 655 379 742 b 373 760 373 753 373 756 b 374 773 373 766 374 769 b 405 1138 426 881 428 1022 b 370 1169 397 1171 387 1169 b 346 1132 353 1168 341 1156 b 312 768 367 1011 367 880 b 7 559 213 566 96 562 l 0 559 z m 58 317 b 59 321 58 318 58 320 b 238 552 89 439 170 472 b 315 651 268 585 292 613 b 325 657 318 655 321 657 b 344 647 333 657 343 652 b 354 611 351 636 351 622 b 356 582 356 600 356 590 b 317 454 356 534 343 491 b 89 302 269 383 177 302 l 78 302 b 58 317 66 302 58 310 z"
        },
        flag32ndUp: {
            x_min: 0,
            x_max: 261,
            y_min: -812,
            y_max: 149,
            ha: 961,
            o: "m 7 -609 b 278 -802 91 -612 186 -615 b 323 -999 310 -865 323 -930 b 311 -1122 323 -1040 318 -1080 b 310 -1132 311 -1126 310 -1129 b 328 -1166 310 -1149 318 -1162 b 337 -1169 331 -1168 334 -1169 b 366 -1146 346 -1169 356 -1162 b 376 -1009 370 -1138 376 -1071 b 374 -969 376 -995 374 -982 b 337 -806 372 -913 359 -858 b 336 -796 336 -804 336 -801 b 337 -788 336 -793 336 -791 b 370 -616 340 -778 370 -698 b 340 -482 370 -570 360 -524 b 369 -330 353 -445 369 -386 b 366 -289 369 -315 369 -302 b 220 -58 350 -202 317 -163 b 46 187 148 20 71 43 b 17 215 45 200 26 215 b 0 197 9 215 0 197 l 0 -609 z m 300 -261 b 321 -330 315 -289 321 -311 b 317 -360 321 -341 318 -350 b 300 -423 314 -374 307 -399 b 220 -334 279 -397 253 -370 b 56 -92 150 -256 79 -232 b 300 -261 135 -92 220 -127 z m 55 -386 b 73 -367 55 -384 65 -369 b 318 -622 189 -367 318 -505 b 315 -657 318 -634 317 -645 b 308 -690 312 -668 312 -680 b 292 -698 307 -694 300 -698 b 282 -693 288 -698 284 -697 b 216 -608 261 -661 240 -636 l 209 -600 b 55 -386 147 -527 84 -497 z"
        },
        flag32ndDown: {
            x_min: 0,
            x_max: 273,
            y_min: -172,
            y_max: 812,
            ha: 984,
            o: "m 17 -248 b 48 -219 27 -248 46 -232 b 229 36 72 -69 154 -46 b 380 278 330 145 364 186 b 383 320 383 291 383 305 b 351 484 383 382 364 445 b 384 629 374 526 384 580 b 356 780 384 704 361 766 b 351 793 356 785 351 789 b 356 804 351 796 353 799 l 361 814 b 393 958 380 850 387 865 l 393 973 b 333 1169 393 1002 383 1169 b 324 1168 330 1169 327 1169 b 304 1130 314 1164 304 1149 b 305 1120 304 1128 305 1125 b 334 962 317 1056 334 1011 b 289 821 334 922 323 880 b 0 619 180 625 88 622 l 0 -229 b 17 -248 0 -229 9 -248 z m 56 76 b 229 331 81 226 154 249 b 310 423 264 369 289 397 b 330 350 318 396 325 366 b 334 320 331 340 334 331 b 311 248 334 301 328 278 b 59 72 229 109 141 72 b 56 76 56 73 56 75 z m 56 386 b 217 609 86 501 153 533 b 292 706 246 642 269 670 b 304 711 295 710 300 711 b 321 703 311 711 320 707 b 328 670 325 693 325 681 b 331 634 330 658 331 645 b 82 367 331 516 199 367 l 75 367 b 56 386 62 367 56 379 z"
        },
        flag64thUp: {
            x_min: 0,
            x_max: 261,
            y_min: -812,
            y_max: 347,
            ha: 1159,
            o: "m 0 -609 l 7 -609 b 278 -802 91 -612 186 -615 b 323 -999 310 -865 323 -930 b 311 -1122 323 -1040 318 -1080 b 310 -1132 311 -1126 310 -1129 b 328 -1166 310 -1149 318 -1162 b 337 -1169 331 -1168 334 -1169 b 366 -1146 346 -1169 356 -1162 b 376 -1009 370 -1138 376 -1071 b 374 -969 376 -995 374 -982 b 337 -806 372 -913 359 -858 b 336 -796 336 -804 336 -801 b 337 -788 336 -793 336 -791 b 370 -616 340 -778 370 -698 b 340 -482 370 -570 360 -524 b 369 -330 353 -445 369 -386 b 337 -203 369 -287 359 -242 b 369 -43 350 -167 369 -104 b 366 -4 369 -30 367 -17 b 220 228 350 84 317 122 b 46 472 148 305 71 328 b 17 500 45 485 26 500 b 0 482 9 500 0 482 z m 56 193 b 300 24 138 193 220 157 b 321 -45 315 -4 321 -26 b 317 -75 321 -56 318 -65 l 298 -145 b 220 -58 278 -121 253 -94 b 58 187 148 20 82 43 b 56 193 58 189 58 192 z m 300 -261 b 321 -330 315 -289 321 -311 b 317 -360 321 -341 318 -350 b 300 -423 314 -374 307 -399 b 220 -334 279 -397 253 -370 b 56 -92 150 -256 79 -232 b 300 -261 135 -92 220 -127 z m 55 -386 b 73 -367 55 -384 65 -369 b 318 -622 189 -367 318 -505 b 315 -657 318 -634 317 -645 b 308 -690 312 -668 312 -680 b 292 -698 307 -694 300 -698 b 282 -693 288 -698 284 -697 b 216 -608 261 -661 240 -636 l 209 -600 b 55 -386 147 -527 84 -497 z"
        },
        flag64thDown: {
            x_min: 0,
            x_max: 273,
            y_min: -376,
            y_max: 812,
            ha: 1188,
            o: "m 17 -541 b 48 -513 27 -541 46 -526 b 229 -258 72 -363 154 -340 b 380 -16 330 -148 364 -108 b 384 27 383 -1 384 13 b 351 189 384 88 366 151 b 380 278 366 216 374 243 b 383 320 383 291 383 305 b 351 484 383 382 364 445 b 384 629 374 526 384 580 b 356 780 384 704 361 766 b 351 793 356 785 351 789 b 356 804 351 796 353 799 l 361 814 b 393 958 380 850 387 865 l 393 973 b 333 1169 393 1002 383 1169 b 324 1168 330 1169 327 1169 b 304 1130 314 1164 304 1149 b 305 1120 304 1128 305 1125 b 334 962 317 1056 334 1011 b 289 821 334 922 323 880 b 0 619 180 625 88 622 l 0 -523 b 17 -541 0 -523 9 -541 z m 56 76 b 229 331 81 226 154 249 b 310 423 264 369 289 397 b 330 350 318 396 325 366 b 334 320 331 340 334 331 b 311 248 334 301 328 278 b 59 72 229 109 141 72 b 56 76 56 73 56 75 z m 229 36 b 311 128 264 73 289 102 l 330 56 b 334 26 331 46 334 37 b 311 -46 334 7 328 -16 b 56 -222 229 -184 137 -222 b 229 36 75 -86 145 -55 z m 217 609 b 292 706 246 642 269 670 b 304 711 295 710 300 711 b 321 703 311 711 320 707 b 328 670 325 693 325 681 b 331 634 330 658 331 645 b 82 367 331 516 199 367 l 75 367 b 56 386 62 367 56 379 b 217 609 86 501 153 533 z"
        },
        flag128thUp: {
            x_min: 0,
            x_max: 261,
            y_min: -812,
            y_max: 533,
            ha: 1345,
            o: "m 7 -609 b 278 -802 91 -612 186 -615 b 323 -999 310 -865 323 -930 b 311 -1122 323 -1040 318 -1080 b 310 -1132 311 -1126 310 -1129 b 328 -1166 310 -1149 318 -1162 b 337 -1169 331 -1168 334 -1169 b 366 -1146 346 -1169 356 -1162 b 376 -1009 370 -1138 376 -1071 b 374 -969 376 -995 374 -982 b 337 -806 372 -913 359 -858 b 336 -796 336 -804 336 -801 b 337 -788 336 -793 336 -791 b 370 -616 340 -778 370 -698 b 340 -482 370 -570 360 -524 b 369 -330 353 -445 369 -386 b 337 -203 369 -287 359 -242 b 369 -43 350 -167 369 -104 b 366 -4 369 -30 367 -17 b 341 75 360 26 353 50 b 369 222 354 111 369 167 b 366 264 369 236 369 251 b 220 495 350 351 317 390 b 46 740 148 573 71 596 b 17 768 45 753 26 768 b 0 750 9 768 0 750 l 0 -609 z m 300 24 b 321 -45 315 -4 321 -26 b 317 -75 321 -56 318 -65 l 298 -145 b 220 -58 278 -121 253 -94 b 56 187 148 20 81 43 b 55 193 56 189 56 192 b 300 24 137 193 220 157 z m 300 -261 b 321 -330 315 -289 321 -311 b 317 -360 321 -341 318 -350 b 300 -423 314 -374 307 -399 b 220 -334 279 -397 253 -370 b 56 -92 150 -256 79 -232 b 300 -261 135 -92 220 -127 z m 55 -386 b 73 -367 55 -384 65 -369 b 318 -622 189 -367 318 -505 b 315 -657 318 -634 317 -645 b 308 -690 312 -668 312 -680 b 292 -698 307 -694 300 -698 b 282 -693 288 -698 284 -697 b 216 -608 261 -661 240 -636 l 209 -600 b 55 -386 147 -527 84 -497 z m 300 292 b 321 223 315 264 321 242 b 317 193 321 212 318 203 b 301 135 314 180 308 158 b 220 228 281 161 255 190 b 55 461 151 304 79 327 b 300 292 134 461 220 426 z"
        },
        flag128thDown: {
            x_min: 0,
            x_max: 273,
            y_min: -580,
            y_max: 812,
            ha: 1392,
            o: "m 17 -835 b 48 -806 27 -835 46 -819 b 229 -552 72 -657 154 -634 b 380 -310 330 -442 364 -402 b 384 -266 383 -295 384 -281 b 351 -105 384 -206 366 -143 b 384 27 372 -66 384 -16 b 351 189 384 88 366 151 b 380 278 366 216 374 243 b 383 320 383 291 383 305 b 351 484 383 382 364 445 b 384 629 374 526 384 580 b 356 780 384 704 361 766 b 351 793 356 785 351 789 b 356 804 351 796 353 799 l 361 814 b 393 958 380 850 387 865 l 393 973 b 333 1169 393 1002 383 1169 b 324 1168 330 1169 327 1169 b 304 1130 314 1164 304 1149 b 305 1120 304 1128 305 1125 b 334 962 317 1056 334 1011 b 289 821 334 922 323 880 b 0 619 180 625 88 622 l 0 -816 b 17 -835 0 -816 9 -835 z m 229 331 b 310 423 264 369 289 397 b 330 350 318 396 325 366 b 334 320 331 340 334 331 b 311 248 334 301 328 278 b 59 72 229 109 141 72 b 56 76 56 73 56 75 b 229 331 81 226 154 249 z m 56 -516 b 229 -258 75 -380 145 -348 b 311 -166 264 -220 289 -192 l 330 -238 b 334 -268 331 -248 334 -256 b 311 -340 334 -287 328 -310 b 56 -516 229 -478 137 -516 z m 56 -222 b 229 36 75 -86 145 -55 b 311 128 264 73 289 102 l 330 56 b 334 26 331 46 334 37 b 311 -46 334 7 328 -16 b 56 -222 229 -184 137 -222 z m 217 609 b 292 706 246 642 269 670 b 304 711 295 710 300 711 b 321 703 311 711 320 707 b 328 670 325 693 325 681 b 331 634 330 658 331 645 b 82 367 331 516 199 367 l 75 367 b 56 386 62 367 56 379 b 217 609 86 501 153 533 z"
        },
        accidentalFlat: {
            x_min: 0,
            x_max: 226,
            y_min: -175,
            y_max: 439,
            ha: 614,
            o: "m 17 -245 b 30 -252 22 -251 26 -252 b 39 -249 35 -252 39 -249 b 153 -161 82 -225 117 -186 b 325 82 281 -72 325 16 b 196 220 325 164 262 216 b 117 196 171 220 137 209 b 85 176 108 189 92 176 b 78 177 82 176 81 176 b 62 202 68 181 62 192 b 72 608 63 233 72 579 b 45 632 72 624 59 632 b 0 592 24 632 1 618 b 17 -245 0 592 6 -230 z m 66 73 b 167 144 76 102 134 144 b 226 60 209 144 226 96 b 98 -134 226 -17 160 -95 b 84 -138 92 -137 88 -138 b 68 -117 71 -138 68 -124 b 63 27 68 -117 63 -30 b 66 73 63 50 65 68 z"
        },
        accidentalNatural: {
            x_min: 0,
            x_max: 168,
            y_min: -335,
            y_max: 341,
            ha: 676,
            o: "m 0 -268 b 12 -281 0 -276 4 -281 b 22 -278 13 -281 20 -279 b 164 -235 42 -269 122 -235 b 189 -251 179 -235 189 -239 l 189 -465 b 206 -482 189 -475 196 -482 l 225 -482 b 242 -465 233 -482 242 -475 l 242 258 b 230 269 242 265 236 269 b 225 268 229 269 226 269 l 203 261 b 197 259 200 261 199 259 b 68 226 197 259 105 226 b 53 233 59 226 53 228 l 53 474 b 36 491 53 484 45 491 l 17 491 b 0 474 7 491 0 484 z m 176 114 b 189 107 184 114 189 112 l 189 -42 b 71 -101 189 -68 107 -101 b 53 -92 60 -101 53 -98 l 53 56 b 176 114 53 76 141 114 z"
        },
        accidentalSharp: {
            x_min: 0,
            x_max: 249,
            y_min: -348,
            y_max: 350,
            ha: 698,
            o: "m 12 37 b 49 53 17 37 45 50 b 53 55 50 53 52 55 b 72 29 63 55 72 40 l 72 -114 b 56 -147 72 -130 65 -143 b 17 -163 48 -150 17 -163 b 0 -186 7 -166 0 -177 l 0 -288 b 12 -301 0 -297 4 -301 b 17 -300 13 -301 16 -300 b 50 -287 17 -300 37 -291 b 55 -285 52 -285 53 -285 b 72 -308 65 -285 72 -301 l 72 -485 b 91 -501 72 -494 81 -501 b 115 -485 105 -501 115 -494 l 115 -285 b 130 -253 115 -266 122 -256 l 217 -217 b 223 -216 219 -217 222 -216 b 242 -242 235 -216 242 -233 l 242 -422 b 261 -438 242 -431 251 -438 b 285 -422 276 -438 285 -431 l 285 -217 b 301 -184 285 -206 291 -189 b 341 -168 311 -180 341 -168 b 359 -144 351 -164 359 -153 l 359 -42 b 348 -30 359 -35 354 -30 b 341 -32 346 -30 344 -30 l 304 -46 b 285 -20 295 -46 285 -37 l 285 114 b 304 156 285 124 292 151 l 341 170 b 359 194 351 174 359 186 l 359 297 b 348 308 359 304 354 308 b 341 307 346 308 344 308 b 305 294 341 307 312 295 b 285 312 295 294 285 301 l 285 488 b 265 504 285 497 276 504 b 242 488 251 504 242 497 l 242 301 b 223 259 240 287 236 268 b 132 223 206 249 157 229 b 115 252 120 223 115 240 l 115 425 b 95 441 115 433 105 441 b 72 425 81 441 72 433 l 72 230 b 55 192 72 210 63 196 b 17 176 46 187 17 176 b 0 153 7 173 0 161 l 0 50 b 12 37 0 42 4 37 z m 111 -43 b 115 63 111 1 112 52 b 220 118 118 88 184 118 b 242 109 230 118 239 115 b 248 27 245 102 248 66 b 242 -65 248 -12 245 -52 b 132 -122 233 -94 166 -122 b 115 -115 124 -122 117 -120 b 111 -43 112 -109 111 -78 z"
        },
        accidentalDoubleSharp: {
            x_min: 0,
            x_max: 247,
            y_min: -125,
            y_max: 127,
            ha: 252,
            o: "m 0 -111 b 7 -166 0 -137 3 -163 b 65 -180 17 -174 40 -180 b 118 -166 86 -180 109 -176 b 130 -111 127 -158 130 -134 b 132 -105 130 -109 131 -107 b 177 -45 141 -85 158 -45 b 226 -111 196 -45 220 -91 b 233 -166 226 -137 228 -161 b 291 -180 243 -174 266 -180 b 356 -114 346 -180 356 -166 b 346 -56 356 -89 351 -63 b 288 -46 338 -49 312 -46 l 274 -46 b 206 1 258 -37 206 -9 b 274 50 206 22 253 43 b 291 49 279 50 285 49 b 346 63 314 49 336 55 b 356 115 353 71 356 92 b 292 183 356 174 351 183 b 233 173 266 183 240 180 b 226 117 228 168 226 143 b 179 49 219 101 196 49 b 130 117 158 49 135 96 b 118 173 130 141 125 167 b 66 183 112 180 89 183 b 7 173 42 183 16 180 b 0 120 3 170 0 145 b 7 63 0 94 3 68 b 68 49 17 55 43 49 b 82 50 73 49 78 50 b 150 3 98 42 150 13 b 84 -46 150 -16 104 -39 l 69 -46 b 7 -56 43 -46 16 -49 b 0 -111 3 -60 0 -85 z"
        },
        accidentalDoubleFlat: {
            x_min: 0,
            x_max: 411,
            y_min: -175,
            y_max: 437,
            ha: 612,
            o: "m 17 -245 b 30 -252 22 -251 26 -252 b 39 -249 35 -252 39 -249 b 153 -161 84 -226 120 -186 b 274 -50 206 -124 246 -85 b 284 -245 276 -158 279 -240 b 295 -252 288 -251 292 -252 b 304 -249 300 -252 304 -249 b 416 -163 348 -226 383 -186 b 592 82 546 -72 592 16 b 461 217 592 163 528 216 l 452 217 b 384 194 426 217 408 207 b 350 176 374 189 363 176 b 343 177 347 176 344 176 b 328 202 333 180 328 190 b 337 606 328 232 337 579 b 310 629 337 622 324 629 b 265 592 291 629 268 616 b 269 194 265 592 266 395 b 196 217 248 209 223 217 l 187 217 b 120 194 160 217 143 207 b 85 176 108 189 98 176 b 78 177 82 176 81 176 b 62 202 68 180 62 190 b 72 606 62 232 72 579 b 45 629 72 622 59 629 b 0 592 24 629 1 616 b 17 -245 0 592 7 -232 z m 66 72 b 168 144 75 101 134 144 b 226 59 212 144 226 95 b 96 -134 226 -22 161 -94 b 84 -138 92 -137 86 -138 b 68 -115 72 -138 68 -124 b 63 26 68 -115 63 -30 b 66 72 63 49 65 66 z m 328 39 b 330 72 328 55 328 68 b 433 144 338 101 399 144 b 468 130 448 144 459 140 b 490 59 481 112 490 88 b 361 -134 490 -22 426 -94 b 348 -138 356 -137 351 -138 b 333 -115 337 -138 333 -124 b 328 39 333 -115 328 -16 z"
        },
        accidentalParensLeft: {
            x_min: 0,
            x_max: 141,
            y_min: -248,
            y_max: 247,
            ha: 495,
            o: "m 199 -357 b 203 -354 200 -357 203 -356 l 203 -333 b 200 -327 203 -330 202 -328 b 86 0 118 -253 86 -160 b 200 324 86 158 120 251 b 203 331 202 325 203 327 l 203 351 b 202 356 203 354 203 356 b 0 0 60 281 0 140 b 199 -357 0 -144 60 -269 z"
        },
        accidentalParensRight: {
            x_min: 0,
            x_max: 141,
            y_min: -248,
            y_max: 247,
            ha: 495,
            o: "m 0 331 b 3 324 0 327 1 325 b 117 0 84 251 117 158 b 3 -327 117 -160 85 -253 b 0 -333 1 -328 0 -330 l 0 -354 b 4 -357 0 -356 3 -357 b 203 0 143 -269 203 -144 b 1 356 203 140 143 281 b 0 351 0 356 0 354 z"
        },
        accidentalQuarterToneFlatStein: {
            x_min: 1,
            x_max: 227,
            y_min: -175,
            y_max: 439,
            ha: 614,
            o: "m 174 -161 b 288 -249 210 -186 245 -225 b 297 -252 288 -249 292 -252 b 310 -245 301 -252 305 -251 b 327 592 321 -230 327 592 b 282 632 325 618 302 632 b 255 608 268 632 255 624 b 265 202 255 579 264 233 b 249 177 265 192 259 181 b 242 176 246 176 245 176 b 210 196 235 176 219 189 b 131 220 190 209 156 220 b 1 85 65 216 1 164 b 174 -161 1 16 46 -72 z m 101 60 b 160 144 101 96 118 144 b 261 73 193 144 251 102 b 264 27 262 68 264 50 b 259 -117 264 -30 259 -117 b 243 -138 259 -124 256 -138 b 229 -134 239 -138 235 -137 b 101 60 167 -95 101 -17 z"
        },
        accidentalThreeQuarterTonesFlatZimmermann: {
            x_min: 1,
            x_max: 466,
            y_min: -175,
            y_max: 439,
            ha: 614,
            o: "m 363 -245 b 376 -252 367 -251 372 -252 b 384 -249 380 -252 384 -249 b 497 -161 428 -226 464 -186 b 671 84 625 -72 671 16 b 541 220 671 164 606 217 b 513 217 531 220 523 219 b 464 196 495 212 480 206 b 431 176 452 189 442 176 b 423 177 428 176 426 176 b 408 202 413 180 408 190 l 419 608 b 392 632 419 625 406 632 b 346 592 372 632 347 618 b 363 -245 346 592 351 -230 z m 177 -163 b 289 -249 210 -186 245 -226 b 297 -252 289 -249 292 -252 b 310 -245 300 -252 305 -251 b 328 592 321 -230 328 592 b 282 631 327 618 302 631 b 255 608 268 631 255 624 l 266 202 b 251 177 266 190 261 180 b 243 176 248 176 246 176 b 210 196 232 176 222 189 b 166 216 196 204 180 210 b 161 217 164 216 163 217 b 132 220 151 219 143 220 b 1 84 65 217 1 163 b 177 -163 1 16 48 -72 z m 102 60 b 124 128 102 88 111 112 b 161 144 134 138 147 144 b 199 134 173 144 184 141 b 262 72 219 122 256 92 b 265 26 264 66 265 49 b 261 -115 265 -30 261 -115 b 245 -138 261 -124 258 -138 b 230 -134 240 -138 236 -137 b 102 60 166 -92 102 -20 z m 409 26 b 412 72 409 49 410 66 b 514 144 420 102 480 144 b 570 60 557 144 570 96 b 442 -134 570 -23 508 -91 b 429 -138 436 -137 433 -138 b 413 -115 418 -138 413 -124 b 409 26 413 -115 409 -30 z"
        },
        accidentalQuarterToneSharpStein: {
            x_min: 0,
            x_max: 179,
            y_min: -353,
            y_max: 307,
            ha: 660,
            o: "m 12 -315 b 85 -285 17 -315 76 -289 b 105 -312 92 -282 105 -301 l 105 -492 b 125 -508 105 -501 114 -508 b 150 -484 147 -508 150 -498 l 150 -285 b 151 -274 150 -281 150 -278 b 164 -253 153 -265 158 -256 b 240 -225 176 -251 240 -225 b 258 -202 249 -222 258 -210 l 258 -99 b 246 -86 258 -91 253 -86 b 240 -88 245 -86 242 -88 l 240 -86 b 168 -115 240 -86 174 -114 b 148 -91 158 -115 148 -107 l 148 43 b 167 85 148 55 156 81 b 240 114 180 91 240 114 b 258 138 249 118 258 128 l 258 240 b 246 252 258 248 252 252 b 240 251 245 252 242 252 b 168 225 240 251 171 225 b 150 253 156 225 150 240 l 150 426 b 130 442 150 435 141 442 b 105 418 108 442 105 429 l 105 230 b 91 193 105 219 101 202 b 17 161 65 183 42 171 b 0 138 9 158 0 147 l 0 36 b 12 23 0 27 4 23 b 17 24 13 23 16 24 b 85 53 17 24 73 49 b 89 55 86 53 88 55 b 107 30 98 55 107 42 l 107 -114 b 92 -145 107 -130 101 -143 l 17 -177 b 0 -200 9 -180 0 -192 l 0 -302 b 12 -315 0 -311 4 -315 z"
        },
        accidentalThreeQuarterTonesSharpStein: {
            x_min: 3,
            x_max: 317,
            y_min: -347,
            y_max: 369,
            ha: 716,
            o: "m 14 -301 b 53 -287 16 -301 40 -291 b 62 -285 56 -285 59 -285 b 72 -298 69 -285 72 -289 l 72 -477 b 95 -500 72 -495 76 -500 b 118 -477 114 -500 118 -495 l 118 -278 b 127 -259 118 -269 121 -261 l 196 -232 b 207 -243 204 -232 207 -235 l 207 -432 b 230 -455 207 -452 212 -455 b 253 -432 249 -455 253 -451 l 253 -228 b 268 -204 253 -216 259 -207 l 320 -186 b 328 -183 323 -184 325 -183 b 337 -194 334 -183 337 -187 l 337 -387 b 360 -410 337 -408 341 -410 b 383 -387 379 -410 383 -406 l 383 -174 b 395 -157 383 -166 390 -158 l 445 -138 b 456 -127 452 -135 456 -132 l 456 -14 b 448 -3 456 -10 454 -3 b 399 -22 445 -3 408 -17 b 383 -6 387 -22 383 -22 l 383 163 b 392 181 383 173 384 179 b 445 202 397 183 445 202 b 456 213 452 203 456 207 l 456 324 b 448 336 456 330 454 336 b 393 317 445 336 400 320 b 389 315 392 315 390 315 b 383 325 386 315 383 318 l 383 508 b 360 531 383 528 379 531 b 337 508 341 531 337 527 l 337 318 b 325 291 337 300 334 294 b 268 268 320 288 287 276 b 253 281 256 268 253 274 l 253 464 b 230 487 253 484 249 487 b 207 464 212 487 207 482 l 207 264 b 194 240 207 253 204 245 l 132 217 b 128 216 131 217 130 216 b 118 229 122 216 118 220 l 118 420 b 95 444 118 439 114 444 b 72 420 76 444 72 439 l 72 212 b 60 190 72 197 68 193 l 16 173 b 4 161 9 170 4 167 l 4 50 b 13 39 4 45 9 39 b 58 55 16 39 46 49 b 63 56 60 56 62 56 b 72 42 71 56 72 50 l 72 -125 b 58 -150 72 -137 65 -147 l 16 -166 b 4 -177 9 -168 4 -171 l 4 -289 b 14 -301 4 -295 9 -301 z m 114 -48 b 118 78 114 6 115 68 b 200 114 122 91 180 114 b 207 111 204 114 206 112 b 212 22 210 107 212 66 b 207 -94 212 -29 210 -85 b 127 -130 203 -108 148 -130 b 118 -127 122 -130 120 -128 b 114 -48 114 -121 114 -86 z m 253 19 b 258 130 253 69 255 122 b 333 163 264 141 315 163 b 337 161 334 163 337 161 b 341 78 340 157 341 120 b 337 -45 341 24 340 -37 b 266 -78 333 -56 287 -78 b 258 -75 262 -78 259 -76 b 253 19 255 -71 253 -27 z"
        },
        accidentalBuyukMucennebFlat: {
            x_min: 1,
            x_max: 287,
            y_min: -174,
            y_max: 438,
            ha: 612,
            o: "m 1 480 l 1 406 b 12 395 1 400 4 395 b 79 419 14 395 76 418 b 89 412 86 419 89 415 b 91 376 89 399 89 386 b 82 359 91 364 89 361 b 16 331 76 356 16 331 b 1 321 6 331 1 328 l 1 248 b 13 236 1 242 4 236 b 79 262 16 236 71 258 b 92 251 89 262 92 256 b 107 -242 95 23 101 -236 b 120 -251 111 -249 115 -251 b 128 -248 124 -251 128 -248 b 240 -160 171 -225 207 -184 b 413 84 367 -71 413 16 b 284 220 413 166 350 216 b 207 196 259 220 229 209 b 171 176 196 190 184 176 b 167 177 170 176 168 177 b 151 203 157 181 151 192 b 153 269 151 210 151 236 b 163 292 153 275 153 289 b 366 367 173 297 366 367 b 379 383 374 370 379 376 l 379 452 b 370 464 379 458 377 464 b 164 389 366 464 170 392 b 156 396 163 389 156 393 b 157 436 157 409 157 428 b 167 452 157 445 161 449 b 366 526 173 455 366 526 b 379 540 374 528 379 534 l 379 611 b 370 622 379 616 377 622 b 170 550 366 622 174 552 b 160 557 163 550 160 554 b 161 608 160 585 161 602 b 134 631 161 624 148 631 b 89 590 114 631 91 616 l 89 528 b 81 517 89 526 88 518 b 16 491 76 514 16 491 b 1 480 6 490 1 485 z m 154 73 b 219 135 160 92 197 124 b 255 144 232 141 243 144 b 292 130 269 144 282 140 b 314 62 305 114 314 91 b 186 -132 314 -17 251 -94 b 173 -137 180 -135 176 -137 b 157 -114 161 -137 157 -122 b 153 35 157 -114 153 -22 b 154 73 153 53 153 68 z"
        },
        accidentalBakiyeFlat: {
            x_min: -1,
            x_max: 286,
            y_min: -175,
            y_max: 439,
            ha: 614,
            o: "m -1 248 b 9 236 -1 242 1 236 b 81 264 12 236 78 261 b 89 258 86 264 89 261 b 104 -245 92 30 96 -236 b 115 -252 108 -251 112 -252 b 124 -249 120 -252 124 -249 b 239 -161 167 -226 203 -186 b 412 84 367 -72 412 17 b 282 220 412 166 348 216 b 255 216 274 220 264 219 b 203 196 238 212 222 206 b 171 177 193 189 177 177 b 163 179 168 177 166 177 b 147 202 153 181 147 192 b 150 276 147 210 150 268 b 158 291 150 287 154 289 b 363 370 163 292 363 370 b 377 384 373 373 377 379 l 377 454 b 369 467 377 458 376 467 b 363 465 367 467 364 467 b 161 390 363 465 167 393 b 153 399 154 390 153 395 b 157 608 154 494 157 593 b 130 632 157 624 144 632 b 86 592 111 632 88 618 b 88 377 86 592 86 501 b 76 356 88 373 88 360 l 12 331 b -1 320 3 330 -1 327 z m 148 27 b 151 73 148 50 150 68 b 255 144 161 105 219 144 b 312 62 298 144 312 99 b 181 -134 312 -19 249 -96 b 167 -138 176 -137 171 -138 b 153 -117 156 -138 153 -125 b 148 27 153 -117 148 -30 z"
        },
        accidentalKomaSharp: {
            x_min: 0,
            x_max: 229,
            y_min: -337,
            y_max: 322,
            ha: 659,
            o: "m 10 39 b 17 40 13 39 14 39 l 128 81 b 138 52 138 81 138 63 l 138 -91 b 124 -124 138 -107 132 -120 b 17 -167 115 -127 17 -167 b 0 -192 7 -171 0 -181 l 0 -294 b 10 -305 0 -301 4 -305 b 17 -304 13 -305 14 -305 b 127 -261 17 -304 117 -264 b 138 -276 138 -261 138 -262 l 138 -469 b 157 -485 138 -478 147 -485 b 181 -462 179 -485 181 -475 l 181 -262 b 183 -252 181 -258 181 -255 b 197 -232 186 -243 190 -235 b 312 -187 207 -228 312 -187 b 330 -163 323 -183 330 -173 l 330 -60 b 320 -49 330 -53 327 -49 b 312 -50 318 -49 315 -49 l 200 -94 b 193 -95 197 -95 194 -95 b 181 -68 183 -95 181 -85 l 181 66 b 200 108 181 92 189 104 l 312 151 b 330 176 323 156 330 166 l 330 278 b 320 289 330 285 327 289 b 312 288 318 289 315 289 b 200 246 312 288 203 248 b 181 275 187 246 181 264 l 181 448 b 163 464 181 456 173 464 b 138 441 140 464 138 452 l 138 253 b 122 215 137 240 132 225 b 17 177 92 203 45 177 b 0 153 7 173 0 163 l 0 50 b 10 39 0 43 4 39 z"
        },
        accidentalKucukMucennebSharp: {
            x_min: -1,
            x_max: 339,
            y_min: -338,
            y_max: 321,
            ha: 659,
            o: "m -1 -45 l -1 -138 b 12 -154 -1 -145 3 -154 l 215 -79 b 220 -84 219 -79 220 -81 l 220 -105 b 210 -122 220 -115 219 -120 b 99 -168 202 -127 99 -168 b 82 -193 89 -173 82 -183 l 82 -295 b 92 -307 82 -302 86 -307 b 99 -305 95 -307 96 -307 b 209 -262 99 -305 199 -265 b 220 -278 220 -262 220 -264 l 220 -471 b 239 -487 220 -480 229 -487 b 264 -464 261 -487 264 -477 l 264 -264 b 265 -253 264 -259 264 -256 b 279 -233 268 -245 272 -236 b 395 -189 289 -229 395 -189 b 412 -164 405 -184 412 -174 l 412 -62 b 402 -50 412 -55 409 -50 b 395 -52 400 -50 397 -50 l 278 -96 b 264 -86 268 -96 264 -94 l 264 -68 b 269 -59 264 -62 265 -60 b 471 17 274 -58 471 17 b 488 36 484 22 488 27 l 488 127 b 477 144 488 134 487 144 b 471 141 475 144 472 141 l 471 143 b 274 68 471 143 282 71 b 268 66 272 68 269 66 b 264 71 264 66 264 69 l 264 92 b 271 102 264 98 265 99 l 395 150 b 412 174 405 154 412 164 l 412 276 b 402 288 412 284 409 288 b 395 287 400 288 397 288 b 282 245 395 287 285 246 b 264 274 269 245 264 262 l 264 446 b 245 462 264 455 255 462 b 220 439 222 462 220 451 l 220 252 b 204 213 219 239 215 223 b 99 176 174 202 127 176 b 82 151 89 171 82 161 l 82 49 b 92 37 82 42 86 37 b 99 39 95 37 96 37 l 210 79 b 216 81 212 81 215 81 b 220 78 219 81 220 79 l 220 56 b 216 46 220 52 220 48 b 16 -29 210 45 16 -29 b -1 -45 4 -32 -1 -36 z"
        },
        accidentalKoron: {
            x_min: 0,
            x_max: 300,
            y_min: -472,
            y_max: 157,
            ha: 629,
            o: "m 0 -672 b 7 -680 0 -677 3 -680 l 45 -680 b 52 -672 49 -680 52 -677 l 52 -193 l 415 -22 b 432 -4 418 -20 432 -13 b 415 10 432 1 418 9 l 4 226 b 0 223 1 226 0 225 z m 327 -7 l 52 -137 l 52 144 z"
        },
        accidentalSori: {
            x_min: 0,
            x_max: 421,
            y_min: -318,
            y_max: 328,
            ha: 646,
            o: "m 0 265 l 0 223 b 3 213 0 216 0 215 l 131 160 l 131 -150 l 3 -203 b 0 -212 0 -204 0 -206 l 0 -255 b 3 -259 0 -258 1 -259 l 131 -204 l 131 -451 b 138 -458 131 -455 134 -458 l 176 -458 b 183 -451 180 -458 183 -455 l 183 -183 l 330 -120 l 330 -410 b 337 -418 330 -415 333 -418 l 374 -418 b 382 -410 379 -418 382 -415 l 382 -98 l 589 -9 b 606 10 592 -9 606 0 b 589 23 606 16 592 22 l 382 109 l 382 465 b 374 472 382 469 379 472 l 337 472 b 330 465 333 472 330 469 l 330 132 l 183 194 l 183 425 b 176 432 183 429 180 432 l 138 432 b 131 425 134 432 131 429 l 131 216 l 3 269 b 0 265 0 269 0 266 z m 183 138 l 330 76 l 330 -66 l 183 -128 z m 501 6 l 382 -45 l 382 55 z"
        },
        articAccentAbove: {
            x_min: 0,
            x_max: 339,
            y_min: 1,
            y_max: 245,
            ha: 244,
            o: "m 0 318 b 20 298 0 311 4 304 b 346 187 20 298 331 193 b 356 177 353 186 356 181 b 344 167 356 173 353 170 b 20 58 328 163 20 58 b 0 36 4 50 0 43 b 3 23 0 32 1 27 b 23 1 7 13 13 1 b 29 3 24 1 27 1 l 469 151 b 488 177 488 156 488 166 b 469 203 488 189 488 197 l 37 350 b 24 353 32 351 26 353 b 3 333 12 353 7 344 b 0 318 1 327 0 323 z"
        },
        articAccentBelow: {
            x_min: 0,
            x_max: 339,
            y_min: -244,
            y_max: 0,
            ha: 244,
            o: "m 0 -35 b 20 -55 0 -42 4 -49 b 346 -166 20 -55 331 -160 b 356 -176 353 -167 356 -171 b 344 -186 356 -180 353 -183 b 20 -295 328 -190 20 -295 b 0 -317 4 -302 0 -310 b 3 -330 0 -321 1 -325 b 23 -351 7 -340 13 -351 b 29 -350 24 -351 27 -351 l 469 -202 b 488 -176 488 -197 488 -187 b 469 -150 488 -164 488 -156 l 37 -3 b 24 0 32 -1 26 0 b 3 -20 12 0 7 -9 b 0 -35 1 -26 0 -30 z"
        },
        articTenutoAbove: {
            x_min: -1,
            x_max: 338,
            y_min: 0,
            y_max: 48,
            ha: 48,
            o: "m 33 0 l 452 0 b 487 35 485 0 487 16 b 452 69 487 53 487 69 l 33 69 b -1 35 -1 69 -1 53 b 33 0 -1 16 -1 0 z"
        },
        articTenutoBelow: {
            x_min: -1,
            x_max: 338,
            y_min: -48,
            y_max: 0,
            ha: 48,
            o: "m 33 -69 l 452 -69 b 487 -35 485 -69 487 -53 b 452 0 487 -16 487 0 l 33 0 b -1 -35 -1 0 -1 -16 b 33 -69 -1 -53 -1 -69 z"
        },
        articStaccatoAbove: {
            x_min: 0,
            x_max: 84,
            y_min: 0,
            y_max: 84,
            ha: 84,
            o: "m 60 0 b 121 60 94 0 121 27 b 60 121 121 94 94 121 b 0 60 27 121 0 94 b 60 0 0 27 27 0 z"
        },
        articStaccatoBelow: {
            x_min: 0,
            x_max: 84,
            y_min: -84,
            y_max: 0,
            ha: 84,
            o: "m 60 -121 b 121 -60 94 -121 121 -94 b 60 0 121 -27 94 0 b 0 -60 27 0 0 -27 b 60 -121 0 -94 27 -121 z"
        },
        articStaccatissimoAbove: {
            x_min: 1,
            x_max: 100,
            y_min: -2,
            y_max: 293,
            ha: 295,
            o: "m 1 390 b 72 -3 1 369 39 -3 b 144 389 108 -3 144 356 b 72 422 144 410 111 422 b 1 390 35 422 3 409 z"
        },
        articStaccatissimoBelow: {
            x_min: 1,
            x_max: 100,
            y_min: -295,
            y_max: 0,
            ha: 295,
            o: "m 1 -393 b 72 -425 3 -412 35 -425 b 144 -392 111 -425 144 -413 b 72 0 144 -359 108 0 b 1 -393 39 0 1 -372 z"
        },
        articMarcatoAbove: {
            x_min: -1,
            x_max: 235,
            y_min: -1,
            y_max: 253,
            ha: 254,
            o: "m -1 16 b 9 0 -1 9 1 1 b 16 -1 10 -1 14 -1 b 32 9 22 -1 29 1 b 112 186 32 9 109 180 b 118 190 114 189 115 190 b 127 186 121 190 124 189 b 209 9 128 180 209 9 b 225 0 213 3 219 0 l 323 0 b 338 16 333 1 338 7 b 337 23 338 19 338 22 l 181 356 b 167 364 177 361 173 364 b 153 356 157 364 153 356 l 0 23 b -1 16 -1 20 -1 19 z"
        },
        articMarcatoBelow: {
            x_min: -1,
            x_max: 235,
            y_min: -254,
            y_max: 0,
            ha: 254,
            o: "m -1 -17 b 0 -24 -1 -20 -1 -23 l 156 -357 b 170 -366 160 -363 164 -366 b 184 -357 180 -366 184 -357 l 337 -24 b 338 -17 338 -22 338 -20 b 328 -1 338 -10 336 -3 b 321 0 327 0 323 0 b 305 -10 315 0 308 -3 b 225 -187 305 -10 228 -181 b 219 -192 223 -190 222 -192 b 210 -187 216 -192 213 -190 b 128 -10 209 -181 128 -10 b 112 -1 124 -4 118 -1 l 14 -1 b -1 -17 4 -3 -1 -9 z"
        },
        fermataAbove: {
            x_min: 3,
            x_max: 605,
            y_min: -3,
            y_max: 329,
            ha: 332,
            o: "m 4 14 b 23 -4 4 0 12 -4 b 52 26 36 -4 43 6 b 56 39 53 27 55 33 b 435 318 73 98 138 318 b 818 36 742 318 804 91 b 821 26 819 32 819 27 b 851 -4 831 6 837 -4 b 871 16 864 -4 871 1 b 870 30 871 20 871 24 b 438 474 780 471 480 474 b 6 30 392 474 94 471 b 4 14 4 24 4 19 z m 359 75 b 436 -4 359 32 395 -4 b 516 75 480 -4 516 32 b 436 153 516 117 480 153 b 359 75 395 153 359 117 z"
        },
        fermataBelow: {
            x_min: 3,
            x_max: 605,
            y_min: -332,
            y_max: 0,
            ha: 332,
            o: "m 6 -35 b 438 -478 94 -475 392 -478 b 870 -35 480 -478 780 -475 b 871 -20 871 -29 871 -24 b 851 0 871 -6 864 0 b 821 -30 837 0 831 -10 b 818 -40 819 -32 819 -36 b 435 -323 804 -95 742 -323 b 56 -43 138 -323 73 -102 b 52 -30 55 -37 53 -32 b 23 0 43 -10 36 0 b 4 -19 12 0 4 -4 b 6 -35 4 -23 4 -29 z m 436 -157 b 516 -79 480 -157 516 -121 b 436 0 516 -36 480 0 b 359 -79 395 0 359 -36 b 436 -157 359 -121 395 -157 z"
        },
        breathMarkComma: {
            x_min: 1,
            x_max: 152,
            y_min: 2,
            y_max: 251,
            ha: 249,
            o: "m 1 271 b 82 190 1 222 35 190 b 122 160 118 190 122 160 b 125 144 124 154 125 150 b 102 88 125 124 115 105 b 37 32 78 56 40 35 b 26 19 32 29 26 26 b 27 14 26 17 27 16 b 37 3 29 6 33 3 b 181 102 85 3 158 66 b 219 239 210 147 219 197 l 219 249 b 104 361 219 317 170 361 b 1 271 42 361 1 321 z"
        },
        breathMarkUpbow: {
            x_min: 1,
            x_max: 249,
            y_min: 1,
            y_max: 495,
            ha: 494,
            o: "m 1 690 b 3 683 1 687 1 685 l 154 22 b 181 1 157 10 167 1 b 206 22 193 1 203 10 l 359 683 l 359 688 b 338 713 359 700 351 710 l 333 713 b 308 694 321 713 311 706 l 180 140 l 53 694 b 27 713 49 706 39 713 l 22 713 b 1 690 10 710 1 700 z"
        },
        caesura: {
            x_min: 0,
            x_max: 384,
            y_min: -1,
            y_max: 532,
            ha: 533,
            o: "m 258 1 b 271 -1 262 -1 266 -1 b 308 26 287 -1 302 9 l 552 713 b 553 726 553 717 553 721 b 513 766 553 747 534 766 b 475 739 495 766 481 756 l 232 52 b 230 39 230 48 230 43 b 258 1 230 23 240 7 z m 27 1 b 40 -1 32 -1 36 -1 b 78 26 58 -1 72 9 l 321 713 b 323 726 323 717 323 721 b 282 766 323 747 304 766 b 245 739 265 766 251 756 l 3 52 b 0 37 1 48 0 42 b 27 1 0 22 10 7 z"
        },
        caesuraCurved: {
            x_min: 0,
            x_max: 373,
            y_min: 0,
            y_max: 530,
            ha: 530,
            o: "m 0 29 b 29 0 0 14 12 0 b 53 16 39 0 48 6 l 82 69 b 314 716 187 264 314 498 b 268 763 314 742 295 763 b 222 719 245 763 223 744 b 29 98 209 507 117 295 l 3 39 b 0 29 1 36 0 33 z m 223 27 b 252 0 223 13 233 0 b 276 16 262 0 272 6 b 537 716 386 230 537 478 b 491 763 537 742 518 763 b 445 719 468 763 446 744 b 252 98 432 507 340 295 l 226 39 b 223 27 225 35 223 32 z"
        },
        restMaxima: {
            x_min: 0,
            x_max: 381,
            y_min: -249,
            y_max: 250,
            ha: 499,
            o: "m 369 331 l 369 -330 b 392 -359 369 -354 379 -359 l 524 -359 b 549 -330 539 -359 549 -354 l 549 331 b 524 360 549 356 539 360 l 392 360 b 369 331 379 360 369 356 z m 23 -359 l 156 -359 b 180 -330 170 -359 180 -354 l 180 331 b 156 360 180 356 170 360 l 23 360 b 0 331 10 360 0 356 l 0 -330 b 23 -359 0 -354 10 -359 z"
        },
        restDoubleWhole: {
            x_min: 0,
            x_max: 125,
            y_min: 0,
            y_max: 250,
            ha: 250,
            o: "m 23 0 l 156 0 b 180 22 170 0 180 10 l 180 338 b 156 360 180 350 170 360 l 23 360 b 0 338 10 360 0 350 l 0 22 b 23 0 0 10 10 0 z"
        },
        restWhole: {
            x_min: 0,
            x_max: 282,
            y_min: -135,
            y_max: 9,
            ha: 144,
            o: "m 37 -194 l 369 -194 b 406 -157 389 -194 406 -177 l 406 -24 b 369 13 406 -3 389 13 l 37 13 b 0 -24 16 13 0 -3 l 0 -157 b 37 -194 0 -177 16 -194 z"
        },
        restHalf: {
            x_min: 0,
            x_max: 282,
            y_min: -2,
            y_max: 142,
            ha: 144,
            o: "m 37 -3 l 369 -3 b 406 35 389 -3 406 14 l 406 167 b 369 204 406 189 389 204 l 37 204 b 0 167 16 204 0 189 l 0 35 b 37 -3 0 14 16 -3 z"
        },
        restQuarter: {
            x_min: 1,
            x_max: 270,
            y_min: -375,
            y_max: 373,
            ha: 748,
            o: "m 168 -527 b 206 -540 180 -536 194 -540 b 228 -531 216 -540 226 -537 b 230 -521 229 -527 230 -524 b 207 -487 230 -508 219 -497 b 170 -435 189 -487 173 -448 b 164 -397 166 -423 164 -410 b 255 -292 164 -338 194 -292 b 367 -317 297 -292 344 -308 b 372 -318 369 -317 370 -318 b 382 -320 376 -320 379 -320 b 389 -314 386 -320 389 -318 b 336 -232 389 -297 351 -249 b 236 -32 281 -166 236 -112 b 238 -13 236 -26 238 -19 b 333 199 243 71 295 140 b 338 220 337 206 338 213 b 333 248 338 235 333 248 b 95 526 333 248 120 501 b 69 537 88 533 78 537 b 40 507 55 537 40 527 b 46 484 40 500 42 492 b 134 291 52 468 134 395 b 48 108 134 238 112 176 b 27 66 33 94 27 78 b 42 32 27 46 42 32 l 112 -55 b 174 -141 135 -84 156 -111 b 183 -161 177 -147 183 -158 b 181 -167 183 -163 183 -166 b 166 -174 179 -173 173 -174 b 143 -170 160 -174 148 -171 b 120 -166 135 -170 127 -166 b 1 -304 58 -166 1 -228 b 168 -527 1 -376 63 -446 z"
        },
        rest8th: {
            x_min: 0,
            x_max: 247,
            y_min: -251,
            y_max: 174,
            ha: 425,
            o: "m 39 81 b 117 56 62 65 89 56 b 173 66 137 56 157 60 b 225 88 193 72 206 78 b 232 89 228 89 230 89 b 239 76 238 89 239 84 b 238 60 239 72 239 66 b 104 -343 233 39 130 -248 b 145 -361 104 -360 137 -361 b 196 -347 161 -361 181 -359 b 341 161 200 -344 341 161 b 356 217 347 187 354 210 b 338 240 356 232 341 239 b 323 235 336 240 331 240 b 193 140 312 226 240 140 l 193 154 b 96 251 193 207 150 251 b 0 154 43 251 0 207 b 39 81 0 124 17 98 z"
        },
        rest16th: {
            x_min: 0,
            x_max: 320,
            y_min: -500,
            y_max: 179,
            ha: 679,
            o: "m 115 -301 b 223 -271 153 -301 190 -288 b 229 -278 226 -271 229 -274 b 228 -282 229 -279 228 -281 l 91 -690 b 89 -694 91 -691 89 -693 b 134 -720 89 -706 102 -720 b 189 -687 176 -720 183 -703 l 356 -138 b 420 81 393 -16 420 81 b 459 226 420 81 456 207 b 461 232 459 229 461 230 b 446 248 461 240 449 246 b 431 242 439 248 435 245 b 300 145 420 233 348 147 l 300 160 b 202 258 300 215 256 258 b 104 160 148 258 104 215 b 219 62 104 101 164 62 b 331 94 258 62 298 75 b 341 96 336 95 338 96 b 348 86 346 96 348 94 b 265 -173 348 63 275 -151 b 194 -217 253 -200 215 -217 b 196 -203 196 -212 196 -207 b 98 -105 196 -148 151 -105 b 0 -203 43 -105 0 -148 b 115 -301 0 -262 60 -301 z"
        },
        rest32nd: {
            x_min: 0,
            x_max: 363,
            y_min: -500,
            y_max: 426,
            ha: 926,
            o: "m 0 -203 b 115 -301 0 -262 60 -301 b 228 -269 154 -301 194 -288 b 232 -268 229 -268 230 -268 b 240 -276 236 -268 240 -272 b 138 -688 240 -282 141 -678 b 137 -697 137 -691 137 -694 b 176 -720 137 -708 145 -720 b 232 -690 222 -720 226 -706 b 484 436 236 -672 484 436 b 521 582 484 436 518 564 b 523 588 521 585 523 586 b 508 603 523 600 511 603 b 492 598 501 603 497 600 b 361 503 482 590 410 503 l 361 516 b 264 613 361 570 318 613 b 166 516 210 613 166 570 b 206 444 166 487 183 461 b 246 423 217 433 232 428 b 284 418 258 420 269 418 b 393 449 321 418 360 432 b 399 451 395 451 397 451 b 415 428 409 451 415 436 b 413 422 415 426 413 423 l 357 192 b 279 140 350 168 302 140 b 281 153 281 144 281 148 b 183 251 281 207 236 251 b 85 153 128 251 85 207 b 125 81 85 124 102 98 b 164 60 137 71 150 65 b 203 55 176 58 189 55 b 311 86 240 55 278 69 b 315 88 312 88 314 88 b 325 69 323 88 325 76 l 268 -167 b 194 -217 261 -197 216 -216 b 196 -203 196 -212 196 -207 b 98 -105 196 -148 153 -105 b 0 -203 45 -105 0 -148 z"
        },
        rest64th: {
            x_min: 0,
            x_max: 423,
            y_min: -753,
            y_max: 430,
            ha: 1183,
            o: "m 0 -554 b 40 -626 0 -583 17 -609 b 118 -652 60 -644 92 -652 b 210 -629 145 -652 186 -642 b 216 -628 213 -628 215 -628 b 228 -644 223 -628 228 -635 b 226 -652 228 -647 226 -649 l 122 -1054 b 121 -1064 121 -1058 121 -1061 b 167 -1084 121 -1077 134 -1084 b 215 -1060 202 -1084 209 -1076 b 402 -278 217 -1047 229 -1021 b 436 -135 403 -278 431 -161 l 570 441 b 609 588 570 441 605 569 b 596 609 609 603 602 608 b 580 603 589 609 585 606 b 448 507 569 595 497 507 b 449 521 449 511 449 516 b 351 619 449 575 405 619 b 253 521 297 619 253 575 b 372 422 253 461 317 422 b 481 454 410 422 446 438 b 491 456 484 455 488 456 b 504 441 498 456 504 451 b 501 426 504 436 503 432 b 445 202 500 422 451 217 b 359 144 435 174 383 144 l 359 158 b 261 256 359 212 315 256 b 163 158 207 256 163 212 b 243 65 163 112 202 78 b 279 60 255 62 266 60 b 397 91 320 60 360 73 b 403 92 400 92 402 92 b 412 79 409 92 412 86 b 410 72 412 76 412 75 b 351 -161 408 59 356 -150 b 281 -212 340 -199 301 -212 l 281 -197 b 183 -99 281 -144 238 -99 b 85 -197 130 -99 85 -144 b 125 -271 85 -228 102 -253 b 166 -291 138 -279 151 -287 b 204 -297 177 -294 192 -297 b 262 -287 225 -297 245 -292 b 305 -265 282 -279 287 -274 b 310 -264 307 -264 308 -264 b 318 -284 317 -264 318 -275 b 317 -295 318 -288 317 -294 b 259 -524 315 -302 265 -508 b 194 -567 251 -554 213 -567 b 196 -554 196 -563 196 -559 b 98 -456 196 -500 153 -456 b 0 -554 45 -456 0 -500 z"
        },
        rest128th: {
            x_min: 0,
            x_max: 485,
            y_min: -750,
            y_max: 689,
            ha: 1439,
            o: "m 118 -652 b 176 -642 138 -652 160 -648 b 180 -641 177 -642 179 -641 b 228 -621 197 -635 210 -629 b 232 -619 229 -621 230 -619 b 239 -626 236 -619 239 -622 b 238 -632 239 -628 239 -631 b 131 -1057 235 -642 134 -1050 b 173 -1080 131 -1071 140 -1080 b 230 -1057 219 -1080 225 -1074 l 658 815 b 697 960 658 815 694 942 b 698 966 697 963 698 965 b 684 982 698 975 687 981 b 668 976 677 982 672 979 b 537 880 658 969 586 881 l 537 894 b 439 992 537 949 494 992 b 341 894 386 992 341 949 b 382 822 341 865 359 840 b 459 796 402 805 433 796 b 517 806 480 796 501 801 b 521 808 518 806 520 808 b 569 828 539 814 552 819 b 580 831 572 829 577 831 b 598 812 589 831 598 825 b 596 801 598 809 598 805 b 540 575 590 773 546 595 b 448 510 534 553 475 510 l 448 524 b 350 622 448 577 405 622 b 252 524 297 622 252 577 b 292 451 252 494 269 468 b 369 426 318 433 337 426 b 429 435 389 426 412 429 b 494 464 449 442 475 455 b 498 465 495 465 497 465 b 505 446 504 465 505 456 b 503 426 505 439 504 432 l 446 202 b 366 144 439 173 389 144 l 366 158 b 268 256 366 212 323 256 b 170 158 215 256 170 212 b 289 59 170 98 235 59 b 347 69 310 59 330 63 b 397 91 367 76 379 82 b 406 94 400 92 403 94 b 415 79 412 94 415 88 b 412 63 415 75 413 69 b 357 -157 408 42 364 -134 b 281 -212 346 -196 302 -212 b 282 -197 281 -207 282 -203 b 184 -99 282 -144 238 -99 b 86 -197 130 -99 86 -144 b 204 -297 86 -258 150 -297 b 262 -287 225 -297 245 -292 b 312 -265 282 -279 294 -274 b 318 -264 314 -264 317 -264 b 327 -275 324 -264 327 -269 b 266 -517 324 -287 278 -490 b 200 -569 248 -566 220 -567 l 196 -554 b 98 -456 196 -500 153 -456 b 0 -554 45 -456 0 -500 b 118 -652 0 -615 63 -652 z"
        },
        dynamicPiano: {
            x_min: -89,
            x_max: 366,
            y_min: -142,
            y_max: 274,
            ha: 416,
            o: "m -128 -187 b -111 -204 -128 -199 -122 -204 l 167 -204 b 186 -186 180 -204 186 -199 b 168 -168 186 -174 180 -168 l 111 -168 b 98 -164 102 -168 98 -168 b 101 -154 98 -163 99 -158 l 166 7 b 179 24 168 14 171 24 b 213 -1 186 24 190 10 b 276 -14 233 -12 252 -14 b 527 266 415 -14 527 130 b 395 395 527 350 475 395 b 292 357 350 395 318 380 b 262 328 272 340 268 328 b 246 363 255 328 259 338 b 177 393 236 380 215 393 b 1 251 92 393 46 333 b -9 223 -6 238 -9 230 b 7 207 -9 213 -1 207 b 30 229 17 207 23 216 b 127 338 72 301 101 338 b 143 321 138 338 143 331 b 134 285 143 310 138 295 l -43 -154 b -65 -168 -48 -166 -50 -168 l -109 -168 b -128 -187 -122 -168 -128 -174 z m 207 81 b 235 180 207 111 219 140 l 264 251 b 356 341 284 300 321 341 b 389 288 380 341 389 320 b 243 35 389 217 312 35 b 207 81 219 35 207 50 z"
        },
        dynamicMezzo: {
            x_min: -20,
            x_max: 446,
            y_min: -10,
            y_max: 274,
            ha: 284,
            o: "m -29 223 b -13 207 -29 213 -22 207 b 9 226 -3 207 1 215 b 107 338 52 300 81 338 b 122 321 118 338 122 331 b 114 285 122 310 118 295 l 9 24 b 4 9 6 17 4 13 b 20 0 4 3 9 0 l 91 0 b 114 17 104 0 108 3 l 207 251 b 287 323 225 292 255 323 b 308 302 304 323 308 314 b 294 249 308 285 302 269 b 203 24 294 248 292 248 b 199 9 200 17 199 13 b 215 0 199 3 203 0 l 285 0 b 308 17 298 0 302 3 l 402 251 b 481 323 419 292 449 323 b 503 302 498 323 503 314 b 413 43 503 252 413 104 b 478 -14 413 6 436 -14 b 629 102 533 -14 583 26 b 642 132 638 117 642 125 b 629 145 642 141 636 145 b 608 127 619 145 615 138 b 534 49 580 84 553 49 b 523 62 526 49 523 53 b 606 317 523 112 606 238 b 528 395 606 353 588 395 b 431 350 487 395 454 374 b 409 330 416 336 415 330 b 397 360 402 330 406 341 b 334 395 389 379 370 395 b 236 350 292 395 259 374 b 215 330 222 336 220 330 b 203 360 207 330 212 340 b 147 393 194 379 174 393 b -19 251 71 393 26 331 b -29 223 -26 238 -29 230 z"
        },
        dynamicForte: {
            x_min: -141,
            x_max: 364,
            y_min: -152,
            y_max: 444,
            ha: 596,
            o: "m -203 -122 b -95 -219 -203 -186 -156 -219 b 161 17 14 -219 82 -145 b 269 315 203 105 235 194 b 289 336 269 323 284 336 l 383 336 b 406 359 399 336 406 343 b 384 380 406 373 399 380 l 298 380 b 284 387 288 380 284 380 b 287 405 284 392 285 396 b 419 606 315 530 347 606 b 442 595 431 606 442 603 b 419 580 442 586 435 588 b 389 526 400 572 389 552 b 454 465 389 485 418 465 b 524 543 491 465 524 490 b 400 639 524 596 491 639 b 135 402 261 639 183 540 b 107 380 128 380 127 380 l 23 380 b 0 357 7 380 0 373 b 22 336 0 343 7 336 l 105 336 b 117 330 114 336 117 336 b 114 315 117 327 115 323 l 23 0 b -101 -187 -17 -141 -43 -187 b -127 -174 -120 -187 -127 -181 b -92 -156 -127 -163 -114 -170 b -63 -102 -75 -144 -63 -125 b -128 -43 -63 -65 -89 -43 b -203 -122 -171 -43 -203 -78 z"
        },
        dynamicRinforzando: {
            x_min: -20,
            x_max: 277,
            y_min: 0,
            y_max: 274,
            ha: 274,
            o: "m -13 207 b 9 226 -3 207 3 215 b 107 338 52 301 81 338 b 122 321 118 338 122 331 b 114 285 122 310 118 295 l 9 24 b 4 9 6 17 4 13 b 20 0 4 3 9 0 l 91 0 b 114 17 104 0 108 3 l 207 251 b 304 351 226 298 272 351 b 318 343 312 351 318 348 b 287 285 318 330 287 325 b 338 239 287 256 308 239 b 399 318 373 239 399 268 b 324 395 399 360 377 395 b 235 350 287 395 256 374 b 215 330 222 336 220 330 b 203 360 207 330 213 337 b 145 393 194 379 174 393 b -19 251 75 393 27 337 b -29 223 -26 238 -29 230 b -13 207 -29 213 -22 207 z"
        },
        dynamicSforzando: {
            x_min: 0,
            x_max: 229,
            y_min: -10,
            y_max: 273,
            ha: 283,
            o: "m 125 -14 b 291 120 219 -14 291 36 b 220 232 291 160 276 190 b 151 314 168 271 151 287 b 213 361 151 337 168 361 b 258 346 238 361 258 356 b 240 333 258 340 251 340 b 226 298 232 325 226 314 b 276 252 226 269 248 252 b 330 307 311 252 330 279 b 212 393 330 360 285 393 b 68 274 127 393 68 350 b 145 161 68 223 95 196 b 200 85 187 132 200 114 b 127 20 200 53 173 20 b 66 42 91 20 66 32 b 91 56 66 49 75 46 b 111 98 104 65 111 79 b 59 145 111 127 86 145 b 0 78 24 145 0 117 b 125 -14 0 30 49 -14 z"
        },
        dynamicZ: {
            x_min: -30,
            x_max: 244,
            y_min: -10,
            y_max: 268,
            ha: 278,
            o: "m -24 -1 b 4 16 -12 -1 -3 10 b 39 30 16 24 27 30 b 179 -14 79 30 108 -14 b 297 102 259 -14 297 43 b 245 166 297 147 271 166 b 197 115 219 166 197 145 b 236 72 197 88 216 72 b 259 79 251 72 255 79 b 264 75 262 79 264 78 b 258 60 264 72 261 66 b 229 45 252 50 242 45 b 117 95 186 45 173 95 b 85 86 98 95 89 86 b 102 111 85 86 95 104 l 333 338 b 351 370 344 350 351 359 b 333 386 351 380 343 386 b 298 377 321 386 314 382 b 239 370 282 373 259 370 b 94 383 153 370 111 383 b 68 364 79 383 72 377 l 33 264 b 29 242 30 255 29 248 b 45 228 29 232 36 228 b 66 249 55 228 60 236 l 81 279 b 96 297 85 288 88 297 b 168 292 102 297 127 292 b 223 302 194 292 215 302 b 196 269 229 302 197 271 l -26 45 b -43 16 -37 33 -43 27 b -24 -1 -43 6 -36 -1 z"
        },
        ornamentTrill: {
            x_min: 0,
            x_max: 521,
            y_min: -10,
            y_max: 390,
            ha: 400,
            o: "m 95 210 b 140 213 112 210 131 213 b 144 209 143 213 144 212 b 140 194 144 206 143 202 l 124 156 b 96 58 108 117 96 88 b 179 -14 96 17 124 -14 b 325 153 253 -14 325 46 b 307 251 325 187 320 219 b 302 265 304 258 302 261 b 334 294 302 274 311 281 l 343 298 b 455 348 393 328 428 348 b 474 327 468 348 474 344 b 465 285 474 312 469 295 l 360 24 b 356 9 357 17 356 13 b 372 0 356 3 360 0 l 442 0 b 465 17 455 0 459 3 l 559 251 b 655 351 577 298 624 351 b 670 343 664 351 670 348 b 638 285 670 330 638 325 b 690 239 638 256 660 239 b 750 318 724 239 750 268 b 675 395 750 360 729 395 b 586 350 638 395 608 374 b 566 330 573 336 572 330 b 553 361 559 330 564 340 b 490 393 543 380 521 393 b 347 348 432 393 377 364 b 312 333 328 338 320 333 b 308 337 310 333 308 334 b 315 359 308 343 312 351 l 387 537 b 392 553 390 544 392 549 b 383 562 392 559 389 562 b 364 557 377 562 369 559 l 294 534 b 269 511 281 530 275 526 l 217 384 b 206 367 212 370 210 367 b 179 380 200 367 192 374 b 118 393 158 389 140 393 b 0 292 50 393 0 353 b 95 210 0 248 30 210 z m 118 360 b 192 325 134 360 192 347 b 186 307 192 321 189 314 l 180 292 b 148 265 173 274 167 269 b 98 258 130 261 112 258 b 39 301 50 258 39 281 b 118 360 39 327 60 360 z m 196 48 b 207 92 196 59 202 78 b 264 230 207 94 209 94 b 272 240 266 238 268 240 b 279 229 276 240 276 236 b 292 151 279 204 292 177 b 212 30 292 88 253 30 b 196 48 200 30 196 37 z"
        },
        ornamentTurn: {
            x_min: 0,
            x_max: 460,
            y_min: 0,
            y_max: 218,
            ha: 218,
            o: "m 0 148 b 128 0 0 45 66 0 b 209 63 173 0 209 20 b 157 115 209 95 187 115 b 84 82 115 115 114 82 b 36 150 59 82 36 112 b 130 242 36 212 79 242 b 285 134 176 242 223 203 b 513 1 356 56 419 1 b 662 166 608 1 662 73 b 534 314 662 269 596 314 b 454 251 490 314 454 294 b 505 199 454 219 475 199 b 579 232 547 199 549 232 b 626 164 603 232 626 202 b 533 72 626 102 583 72 b 377 180 487 72 439 111 b 150 312 307 258 243 312 b 0 148 55 312 0 240 z"
        },
        ornamentTurnSlash: {
            x_min: 0,
            x_max: 460,
            y_min: -90,
            y_max: 306,
            ha: 396,
            o: "m 0 147 b 128 -1 0 43 66 -1 b 209 62 173 -1 209 19 b 157 114 209 94 187 114 b 84 81 115 114 114 81 b 36 148 59 81 36 111 b 130 240 36 210 79 240 b 285 128 176 240 222 197 b 307 79 304 108 307 105 l 307 -107 b 330 -130 307 -122 312 -130 b 353 -107 347 -130 353 -122 l 353 37 b 360 59 353 53 353 59 b 402 33 369 59 376 49 b 513 0 435 13 471 0 b 662 164 608 0 662 72 b 534 312 662 268 596 312 b 454 249 490 312 454 292 b 505 197 454 217 475 197 b 579 230 547 197 549 230 b 626 163 603 230 626 200 b 533 71 626 101 583 71 b 377 183 487 71 441 114 b 356 232 359 203 356 206 l 356 418 b 333 441 356 433 350 441 b 310 418 315 441 310 433 l 310 274 b 302 252 310 258 308 252 b 261 278 294 252 287 262 b 150 311 228 298 192 311 b 0 147 55 311 0 239 z"
        },
        ornamentMordent: {
            x_min: 1,
            x_max: 729,
            y_min: -73,
            y_max: 319,
            ha: 392,
            o: "m 30 59 b 88 94 53 59 73 79 b 144 143 107 109 124 127 b 176 161 158 154 168 161 b 197 144 183 161 189 156 l 323 10 b 351 0 328 3 340 0 b 377 9 361 0 372 3 b 498 114 392 17 475 94 l 498 -105 l 544 -105 l 544 153 b 562 160 550 157 556 160 b 585 144 569 160 576 156 b 710 10 590 135 697 24 b 737 0 716 3 727 0 b 765 9 749 0 759 3 b 1030 295 776 17 1011 274 l 1032 300 b 1050 328 1041 308 1050 318 b 1012 353 1050 343 1024 353 b 986 343 1002 353 994 348 b 854 190 971 330 871 206 b 828 176 842 180 835 176 b 802 190 818 176 809 183 b 681 333 791 202 696 320 b 645 353 668 344 657 353 b 613 340 634 353 626 350 b 580 304 600 330 590 315 l 546 265 l 546 459 l 501 459 l 501 216 l 459 167 b 449 156 455 164 452 160 b 302 327 397 216 310 317 b 258 353 291 338 282 351 b 226 340 245 353 238 348 b 193 304 213 330 203 317 l 187 298 b 72 167 148 255 109 212 l 20 107 b 1 73 12 98 1 84 b 30 59 1 65 9 59 z"
        },
        ornamentShortTrill: {
            x_min: 0,
            x_max: 725,
            y_min: 0,
            y_max: 245,
            ha: 245,
            o: "m 0 72 b 29 58 0 63 7 58 b 88 92 50 58 72 78 b 143 141 105 109 124 125 b 147 144 144 143 145 144 b 174 160 158 153 168 160 b 197 143 181 160 187 154 b 321 10 203 135 310 24 b 350 0 327 3 338 0 b 377 7 361 0 372 3 l 436 65 b 469 92 449 72 459 84 b 524 141 487 109 505 125 l 528 145 b 533 148 531 147 531 148 b 554 160 541 154 550 160 b 577 143 562 160 569 154 b 703 10 585 135 691 24 b 732 0 708 3 720 0 b 759 7 743 0 753 3 b 1024 294 769 16 1005 272 b 1044 327 1032 305 1044 321 b 1005 353 1044 341 1018 353 b 979 343 996 353 988 348 b 848 189 963 330 864 204 b 821 174 837 179 828 174 b 796 189 811 174 804 181 b 674 331 783 202 688 318 b 641 351 662 343 651 351 b 606 340 628 351 619 350 b 573 304 593 328 583 315 b 452 167 533 258 491 213 l 445 158 l 301 325 b 256 353 291 338 282 350 b 225 340 246 353 238 350 b 192 304 212 328 203 315 l 17 107 b 0 72 12 96 0 76 z"
        },
        ornamentTremblement: {
            x_min: 1,
            x_max: 985,
            y_min: 0,
            y_max: 244,
            ha: 244,
            o: "m 1 72 b 30 58 1 63 9 58 b 89 92 52 58 73 78 l 144 141 b 148 144 147 143 147 144 b 176 160 160 153 170 160 b 199 143 183 160 189 154 b 324 10 204 134 311 23 b 351 0 330 3 340 0 b 379 7 363 0 373 3 b 488 111 386 13 446 72 b 520 141 498 122 508 132 b 524 144 521 143 523 144 b 552 160 536 153 546 160 b 575 143 559 160 564 154 b 698 10 580 134 687 23 b 727 0 704 3 716 0 b 755 7 739 0 749 3 l 899 141 b 930 160 913 153 923 160 b 952 143 937 160 943 154 l 1077 10 b 1107 0 1084 3 1096 0 b 1133 7 1117 0 1128 3 b 1398 294 1143 16 1380 272 b 1418 327 1407 305 1418 321 b 1381 351 1418 343 1394 351 b 1354 341 1371 351 1362 348 b 1223 189 1338 328 1238 204 b 1195 174 1211 179 1202 174 b 1171 189 1185 174 1178 181 b 1048 331 1158 200 1063 318 b 1012 351 1035 343 1024 351 b 981 338 1002 351 994 350 b 948 304 968 328 958 315 b 827 166 907 258 865 212 b 821 160 825 164 822 163 l 678 325 b 634 351 667 338 657 350 b 602 338 621 351 613 348 b 569 304 590 328 580 315 l 444 161 b 302 325 392 222 311 317 b 258 351 291 338 281 350 b 228 338 245 351 238 348 b 193 304 215 328 204 315 l 19 107 b 1 72 13 96 1 76 z"
        },
        ornamentPrecompAppoggTrill: {
            x_min: 0,
            x_max: 1119,
            y_min: 0,
            y_max: 481,
            ha: 481,
            o: "m 121 0 b 249 68 168 0 232 53 b 279 94 262 75 271 86 b 336 144 298 111 315 128 b 367 163 350 156 360 163 b 389 145 374 163 380 157 b 514 12 395 137 501 26 b 543 1 520 4 531 1 b 569 9 553 1 563 4 b 636 73 576 14 605 43 l 658 94 b 714 144 677 111 694 128 b 746 163 729 156 739 163 b 768 145 753 163 759 157 b 893 12 773 137 880 26 b 922 1 899 4 910 1 b 948 9 932 1 942 4 l 1012 71 b 1037 94 1022 78 1030 86 b 1092 144 1054 111 1073 128 b 1123 161 1106 156 1115 161 b 1146 145 1130 161 1136 157 b 1270 12 1152 137 1259 26 b 1299 1 1276 4 1287 1 b 1326 9 1310 1 1320 4 b 1591 297 1336 19 1572 275 b 1611 328 1600 307 1611 320 b 1574 354 1611 343 1585 354 b 1548 344 1565 354 1555 350 b 1416 192 1532 331 1431 206 b 1388 177 1404 181 1395 177 b 1365 190 1380 177 1371 184 b 1243 333 1352 203 1256 321 b 1205 354 1228 346 1217 354 b 1174 341 1195 354 1187 351 b 1140 305 1161 330 1152 317 l 1015 163 b 873 328 963 223 880 318 b 828 354 860 344 847 353 b 796 341 816 354 809 351 b 763 305 783 331 773 317 b 642 168 721 261 681 215 b 636 163 641 167 639 164 b 494 328 585 223 501 318 b 449 354 481 344 468 353 b 418 341 438 354 431 351 b 384 305 405 331 395 317 b 264 168 343 261 302 215 l 242 144 b 144 88 232 124 171 88 b 79 197 81 88 79 189 l 79 648 b 60 693 79 683 71 693 b 52 691 58 693 55 693 b 0 616 3 672 0 625 l 0 207 b 121 0 0 40 68 0 z"
        },
        ornamentPrecompSlideTrillDAnglebert: {
            x_min: 2,
            x_max: 1150,
            y_min: -367,
            y_max: 245,
            ha: 612,
            o: "m 3 -144 b 4 -168 3 -153 3 -160 b 246 -482 24 -315 99 -422 b 458 -528 340 -521 410 -528 b 514 -526 485 -528 504 -526 b 552 -508 531 -526 552 -517 b 514 -497 552 -503 541 -498 l 503 -497 b 194 -390 432 -494 298 -488 b 69 -151 194 -390 69 -279 b 184 96 69 -60 128 27 b 328 183 202 118 258 183 b 477 96 413 183 454 118 b 559 10 510 62 552 19 b 588 0 566 3 576 0 b 613 7 598 0 609 3 b 723 112 622 14 681 73 b 789 161 733 122 776 161 b 811 144 796 161 802 156 b 936 10 816 135 923 24 b 965 0 942 3 953 0 b 991 7 975 0 985 3 b 1051 66 996 12 1022 37 b 1081 92 1063 73 1073 84 b 1136 143 1099 109 1117 127 b 1168 160 1151 154 1159 160 b 1191 144 1175 160 1181 156 b 1315 10 1197 135 1303 24 b 1344 0 1320 3 1332 0 b 1371 7 1355 0 1365 3 b 1636 295 1381 17 1617 274 b 1656 327 1644 305 1656 318 b 1619 353 1656 341 1630 353 b 1593 343 1610 353 1600 348 b 1460 190 1577 330 1476 204 b 1433 176 1449 180 1440 176 b 1410 189 1424 176 1416 183 b 1287 331 1397 202 1300 320 b 1250 353 1273 344 1261 353 b 1218 340 1240 353 1231 350 b 1185 304 1205 328 1197 315 l 1058 160 b 916 327 1007 220 923 317 b 871 353 903 343 890 351 b 840 340 860 353 852 350 b 806 304 827 330 816 315 b 685 167 765 259 724 213 l 680 160 l 615 235 b 419 344 582 275 523 344 b 3 -144 258 344 3 26 z"
        },
        ornamentPrecompSlideTrillBach: {
            x_min: 0,
            x_max: 1048,
            y_min: -367,
            y_max: 331,
            ha: 698,
            o: "m 0 -144 b 1 -168 0 -153 0 -160 b 243 -482 22 -315 96 -422 b 455 -528 337 -521 408 -528 b 511 -526 482 -528 501 -526 b 549 -508 528 -526 549 -517 b 511 -497 549 -503 539 -498 l 500 -497 b 192 -390 429 -494 295 -488 b 66 -151 127 -336 66 -238 b 189 105 66 -58 127 35 b 232 143 203 118 216 131 b 264 161 246 154 256 161 b 285 144 271 161 276 156 b 410 10 291 135 397 24 b 439 0 416 3 428 0 b 465 7 449 0 459 3 l 531 72 b 554 92 540 78 547 86 b 611 143 573 109 590 127 b 642 161 625 154 635 161 b 664 144 649 161 655 156 b 789 10 670 135 776 24 b 818 0 795 3 806 0 b 844 7 828 0 838 3 b 904 66 850 12 876 37 b 935 92 916 73 924 84 b 979 134 949 107 963 121 l 979 -88 l 1037 -88 l 1037 151 l 1044 144 b 1168 10 1050 135 1156 24 b 1197 0 1174 3 1185 0 b 1224 7 1208 0 1218 3 b 1489 295 1234 17 1470 274 b 1509 327 1498 305 1509 318 b 1472 353 1509 341 1483 353 b 1446 343 1463 353 1453 348 b 1313 190 1430 330 1329 204 b 1286 176 1302 180 1293 176 b 1263 189 1277 176 1269 183 b 1140 331 1250 202 1153 320 b 1103 353 1126 344 1115 353 b 1071 340 1093 353 1084 350 b 1038 304 1058 328 1050 315 l 1038 477 l 979 477 l 979 238 l 912 160 b 769 327 858 220 775 317 b 724 353 756 343 743 351 b 693 340 713 353 706 350 b 660 304 680 330 670 315 b 539 167 618 259 577 213 b 533 161 536 166 534 163 b 390 327 480 220 396 317 b 346 353 377 343 364 351 l 340 353 b 308 340 330 353 321 350 b 275 304 295 330 285 315 b 117 122 220 243 168 186 b 0 -144 68 62 0 -48 z"
        },
        ornamentPrecompTrillSuffixDandrieu: {
            x_min: 0,
            x_max: 949,
            y_min: 0,
            y_max: 381,
            ha: 381,
            o: "m 0 73 b 29 58 0 65 7 58 b 86 92 56 59 72 79 b 143 143 105 109 122 127 b 174 161 157 154 167 161 b 196 144 181 161 187 156 b 321 10 202 135 308 24 b 350 0 327 3 338 0 b 376 7 360 0 370 3 b 485 112 384 14 444 73 b 552 161 495 122 539 161 b 573 144 559 161 564 156 b 698 10 579 135 685 24 b 727 0 704 3 716 0 b 753 7 737 0 747 3 b 863 112 762 14 821 73 b 929 161 873 122 916 161 b 950 144 936 161 942 156 b 1076 10 956 135 1063 24 b 1104 0 1081 3 1093 0 b 1130 7 1115 0 1125 3 b 1236 108 1139 14 1195 69 b 1367 314 1297 160 1367 233 b 1250 521 1367 419 1318 482 b 1107 549 1211 537 1145 549 b 1083 546 1096 549 1087 549 b 1066 528 1071 540 1066 534 b 1079 520 1066 524 1070 520 b 1323 351 1187 517 1323 487 b 1201 171 1323 269 1260 219 b 1194 166 1201 171 1198 168 b 1056 327 1142 226 1063 317 b 1011 353 1043 343 1030 351 b 979 340 999 353 992 350 b 946 304 966 330 956 315 b 825 167 904 259 864 213 l 821 161 b 678 327 768 222 685 317 b 634 353 665 343 652 351 b 602 340 622 353 615 350 b 569 304 589 330 579 315 b 448 167 527 259 487 213 l 444 161 b 301 327 390 222 308 317 b 256 353 288 343 275 351 b 225 340 245 353 238 350 b 192 304 212 330 202 315 b 71 167 150 259 109 213 b 17 105 52 147 36 127 b 0 73 10 98 0 84 z"
        },
        ornamentPrecompDoubleCadenceUpperPrefix: {
            x_min: 0,
            x_max: 1278,
            y_min: 0,
            y_max: 247,
            ha: 247,
            o: "m 1 285 b 308 0 42 190 157 0 b 530 120 415 1 482 63 b 559 144 539 128 549 137 b 590 163 573 156 583 163 b 612 145 598 163 603 157 b 739 10 618 137 724 24 b 768 0 744 3 756 0 b 793 7 778 0 788 3 b 903 114 802 14 861 75 l 939 144 b 971 163 953 156 963 163 b 992 145 978 163 984 157 b 1119 10 998 137 1106 24 b 1148 0 1125 3 1136 0 b 1174 7 1158 0 1168 3 b 1284 114 1182 14 1241 75 b 1316 144 1282 115 1312 141 b 1348 161 1331 156 1339 161 b 1371 145 1355 161 1361 157 b 1496 10 1377 137 1485 24 b 1525 0 1502 3 1513 0 b 1552 7 1536 0 1547 3 b 1819 298 1562 17 1800 276 b 1840 330 1829 308 1840 320 b 1832 344 1840 334 1837 340 b 1801 356 1820 351 1810 356 b 1776 346 1793 356 1783 351 b 1642 192 1760 333 1659 206 b 1614 177 1630 181 1621 177 b 1591 190 1606 177 1597 184 b 1469 334 1578 203 1482 323 b 1430 356 1453 347 1441 356 b 1398 343 1420 356 1411 353 b 1365 307 1385 331 1377 318 l 1240 164 b 1097 330 1187 226 1104 320 b 1053 356 1084 346 1071 354 b 1021 343 1041 356 1034 353 b 988 307 1008 333 998 318 b 865 168 946 262 904 216 l 861 163 b 717 330 808 223 724 320 b 672 356 704 346 691 354 b 641 343 661 356 654 353 b 608 307 628 333 618 318 b 485 168 566 262 524 216 l 455 134 b 284 46 409 88 351 46 b 16 285 148 46 32 265 b 3 295 9 292 4 295 b 0 291 1 295 0 292 b 1 285 0 288 1 285 z"
        },
        ornamentPrecompDoubleCadenceUpperPrefixTurn: {
            x_min: 0,
            x_max: 1277,
            y_min: -62,
            y_max: 333,
            ha: 395,
            o: "m 0 289 b 1 284 0 287 1 284 b 308 -1 42 189 157 -1 b 530 118 415 0 481 62 b 557 143 539 127 547 135 b 590 161 572 154 582 161 b 612 144 598 161 603 156 b 737 9 618 135 724 24 b 768 -1 743 1 755 -1 b 793 6 778 -1 788 1 b 903 112 802 13 861 73 l 937 143 b 971 161 953 154 963 161 b 992 144 978 161 984 156 b 1117 9 998 135 1104 24 b 1148 -1 1123 1 1136 -1 b 1174 6 1158 -1 1168 1 l 1230 60 l 1230 -89 l 1273 -89 l 1273 102 l 1283 112 b 1348 160 1295 125 1332 160 b 1371 144 1355 160 1361 156 b 1496 9 1377 135 1483 24 b 1525 -1 1502 1 1513 -1 b 1552 6 1536 -1 1547 1 b 1819 297 1562 16 1800 275 b 1839 328 1827 307 1839 320 b 1801 354 1839 343 1813 354 b 1776 344 1793 354 1783 350 b 1642 190 1760 331 1657 206 b 1614 176 1630 180 1621 176 b 1591 189 1606 176 1597 183 b 1467 333 1578 203 1480 321 b 1430 354 1453 346 1441 354 b 1398 341 1420 354 1411 351 b 1365 305 1385 330 1377 317 l 1273 202 l 1273 480 l 1230 480 l 1230 174 l 1097 328 b 1053 354 1084 344 1071 353 b 1021 341 1041 354 1034 351 b 988 305 1008 331 998 317 b 865 167 945 261 904 215 l 861 161 b 717 328 808 222 724 318 b 672 354 704 344 691 353 b 641 341 661 354 654 351 b 608 305 628 331 618 317 b 485 167 564 261 524 215 b 455 132 474 156 465 144 b 284 45 410 88 350 45 b 14 284 148 45 30 264 b 3 294 9 291 4 294 b 0 289 1 294 0 291 z"
        },
        ornamentPrecompTrillLowerSuffix: {
            x_min: 0,
            x_max: 859,
            y_min: -222,
            y_max: 246,
            ha: 468,
            o: "m 0 73 b 29 58 0 65 7 58 b 86 92 56 59 72 79 b 143 143 105 109 122 127 b 176 161 157 154 168 161 b 197 144 183 161 189 156 b 323 9 203 135 310 23 b 353 -1 328 1 340 -1 b 379 6 363 -1 373 1 b 488 112 387 13 446 73 l 523 143 b 556 161 539 154 549 161 b 577 144 563 161 569 156 b 703 9 583 135 690 23 b 733 -1 708 1 721 -1 b 759 6 743 -1 753 1 b 868 112 768 13 827 73 b 955 183 878 122 943 183 b 1081 107 965 183 1031 153 b 1156 -89 1128 63 1156 6 l 1156 -102 b 948 -297 1156 -204 1048 -297 b 806 -271 904 -297 850 -282 l 792 -266 b 801 -288 792 -268 795 -282 b 948 -320 809 -297 880 -320 b 1237 -50 1092 -320 1237 -199 b 1164 217 1237 75 1218 122 b 1031 351 1138 259 1063 351 b 1011 337 1020 351 1024 347 b 828 167 952 291 886 217 l 824 164 b 683 328 772 225 690 318 b 638 354 670 344 657 353 b 606 341 626 354 619 351 b 573 305 593 331 583 317 b 451 167 530 261 490 215 l 446 161 b 302 328 393 222 310 318 b 258 354 289 344 276 353 b 226 341 246 354 239 351 b 193 305 213 331 203 317 b 71 167 150 261 109 215 b 17 105 52 147 36 127 b 0 73 10 98 0 84 z"
        },
        stringsDownBow: {
            x_min: 0,
            x_max: 312,
            y_min: 0,
            y_max: 318,
            ha: 318,
            o: "m 17 0 l 37 0 b 55 17 46 0 55 7 l 55 253 b 225 278 55 269 140 278 b 395 253 310 278 395 269 l 395 17 b 413 0 395 7 403 0 l 432 0 b 449 17 441 0 449 7 l 449 420 b 412 458 449 441 432 458 l 37 458 b 0 420 17 458 0 441 l 0 17 b 17 0 0 7 9 0 z"
        },
        stringsUpBow: {
            x_min: 1,
            x_max: 249,
            y_min: 1,
            y_max: 495,
            ha: 494,
            o: "m 1 690 b 3 683 1 687 1 685 l 154 22 b 181 1 157 10 167 1 b 206 22 193 1 203 10 l 359 683 l 359 688 b 338 713 359 700 351 710 l 333 713 b 308 694 321 713 311 706 l 180 140 l 53 694 b 27 713 49 706 39 713 l 22 713 b 1 690 10 710 1 700 z"
        },
        stringsHarmonic: {
            x_min: 0,
            x_max: 200,
            y_min: 0,
            y_max: 200,
            ha: 200,
            o: "m 144 0 b 288 144 223 0 288 65 b 144 288 288 225 223 288 b 0 144 65 288 0 225 b 144 0 0 65 65 0 z m 39 144 b 144 249 39 203 86 249 b 249 144 203 249 249 203 b 144 39 249 86 203 39 b 39 144 86 39 39 86 z"
        },
        pluckedSnapPizzicatoAbove: {
            x_min: 0,
            x_max: 200,
            y_min: 0,
            y_max: 300,
            ha: 300,
            o: "m 144 0 b 288 144 223 0 288 63 b 167 285 288 215 235 275 l 167 432 l 121 432 l 121 285 b 0 144 52 275 0 215 b 144 0 0 63 65 0 z m 39 144 b 121 246 39 193 73 236 l 121 144 l 167 144 l 167 246 b 249 144 213 236 249 193 b 144 39 249 85 202 39 b 39 144 85 39 39 85 z"
        },
        pluckedSnapPizzicatoBelow: {
            x_min: 0,
            x_max: 200,
            y_min: 0,
            y_max: 300,
            ha: 300,
            o: "m 121 145 l 121 0 l 167 0 l 167 145 b 288 288 235 157 288 216 b 144 432 288 369 223 432 b 0 288 65 432 0 369 b 121 145 0 216 52 157 z m 39 288 b 144 393 39 347 86 393 b 249 288 203 393 249 347 b 167 186 249 238 215 196 l 167 288 l 121 288 l 121 186 b 39 288 75 196 39 238 z"
        },
        pluckedLeftHandPizzicato: {
            x_min: 0,
            x_max: 272,
            y_min: 0,
            y_max: 272,
            ha: 272,
            o: "m 0 219 l 0 173 l 173 173 l 173 0 l 219 0 l 219 173 l 392 173 l 392 219 l 219 219 l 219 392 l 173 392 l 173 219 z"
        },
        keyboardPedalPed: {
            x_min: 0,
            x_max: 1019,
            y_min: -8,
            y_max: 555,
            ha: 563,
            o: "m 122 376 b 240 540 189 376 240 452 b 225 586 240 579 233 586 b 204 549 213 586 212 573 b 138 480 199 527 181 480 b 85 549 96 480 85 517 l 85 554 b 353 762 89 690 230 762 b 373 752 364 762 373 760 b 351 708 373 740 360 723 b 274 546 330 675 274 585 b 353 416 274 508 333 444 b 412 304 372 390 412 351 b 382 228 412 275 403 256 b 334 190 363 202 361 200 b 147 29 271 167 147 88 b 196 -12 147 4 171 -12 b 343 108 239 -12 279 33 l 363 132 b 387 150 370 141 376 150 b 543 -4 445 150 467 -4 b 631 42 567 -4 586 0 l 668 78 b 685 89 674 84 680 89 b 696 75 688 89 690 86 b 809 -9 717 29 753 -9 b 946 66 854 -9 894 13 b 988 107 971 92 981 107 b 1002 89 994 107 996 99 b 1152 -4 1030 36 1077 -4 b 1329 248 1238 -4 1329 82 b 792 717 1329 556 1047 665 b 766 720 785 719 775 720 b 747 703 752 720 747 711 b 780 680 747 693 756 685 b 1223 222 1028 621 1223 504 b 1152 39 1223 122 1205 39 b 1073 229 1104 39 1073 132 b 1132 423 1073 314 1086 377 b 1142 442 1140 432 1142 436 b 1126 458 1142 451 1136 458 b 1093 446 1119 458 1109 455 b 975 216 1022 408 975 337 l 975 190 b 943 121 975 160 972 150 b 852 69 899 76 877 69 b 776 148 816 69 786 117 b 773 163 775 154 773 158 b 786 177 773 167 776 170 l 801 187 b 937 366 867 235 937 284 b 844 454 937 422 900 454 b 665 217 711 454 665 331 b 671 153 665 197 667 176 l 671 147 b 662 134 671 143 670 140 b 605 111 639 118 625 111 b 521 160 572 111 546 135 b 451 203 497 184 474 197 b 426 212 435 207 426 206 b 436 230 426 216 429 220 b 510 389 464 269 510 340 b 429 521 510 435 480 462 b 369 629 387 570 369 599 b 402 720 369 648 384 691 b 462 763 425 759 446 763 b 611 624 540 763 611 704 b 564 575 611 592 590 575 b 501 602 540 575 520 582 b 474 622 492 611 487 622 b 459 603 465 622 459 615 b 603 471 459 570 510 471 b 711 588 670 471 711 524 b 422 799 711 742 554 799 l 413 799 b 179 749 327 798 261 789 b 0 517 107 713 0 632 b 122 376 0 454 37 376 z m 1405 0 b 1467 62 1441 0 1467 26 b 1405 124 1467 98 1441 124 b 1344 62 1369 124 1344 98 b 1405 0 1344 26 1369 0 z m 756 282 b 815 403 756 346 772 403 b 848 343 838 403 848 383 b 780 226 848 295 824 261 b 765 217 773 220 768 217 b 759 228 762 217 759 220 b 756 282 757 245 756 262 z"
        },
        keyboardPedalUp: {
            x_min: 0,
            x_max: 450,
            y_min: 0,
            y_max: 450,
            ha: 450,
            o: "m 66 252 b 132 281 94 252 115 264 b 183 308 153 301 161 308 l 190 308 b 236 271 216 308 236 300 b 216 239 236 261 229 252 l 210 233 b 158 219 197 220 184 219 b 73 147 114 219 73 196 b 147 73 73 107 107 73 b 219 158 196 73 219 114 b 233 210 219 184 220 197 l 239 216 b 271 236 252 229 261 236 b 308 190 300 236 308 216 l 308 183 b 281 132 308 161 301 153 b 252 66 264 115 252 94 b 324 0 252 23 285 0 b 396 66 363 0 396 23 b 367 132 396 94 384 115 b 340 183 347 153 340 161 l 340 190 b 377 236 340 216 348 236 b 409 216 387 236 396 229 l 415 210 b 429 158 428 197 429 184 b 501 73 429 114 452 73 b 575 147 541 73 575 107 b 490 219 575 196 534 219 b 438 233 464 219 451 220 l 432 239 b 412 271 419 252 412 261 b 458 308 412 300 432 308 l 465 308 b 516 281 487 308 495 301 b 582 252 533 264 554 252 b 648 324 625 252 648 285 b 582 396 648 363 625 396 b 516 367 554 396 533 384 b 465 340 495 347 487 340 l 458 340 b 412 377 432 340 412 348 b 432 409 412 387 419 396 l 438 415 b 490 429 451 428 464 429 b 575 501 534 429 575 452 b 501 575 575 541 541 575 b 429 490 452 575 429 534 b 415 438 429 464 428 451 l 409 432 b 377 412 396 419 387 412 b 340 458 348 412 340 432 l 340 465 b 367 516 340 487 347 495 b 396 582 384 533 396 554 b 324 648 396 625 363 648 b 252 582 285 648 252 625 b 281 516 252 554 264 533 b 308 465 301 495 308 487 l 308 458 b 271 412 308 432 300 412 b 239 432 261 412 252 419 l 233 438 b 219 490 220 451 219 464 b 147 575 219 534 196 575 b 73 501 107 575 73 541 b 158 429 73 452 114 429 b 210 415 184 429 197 428 l 216 409 b 236 377 229 396 236 387 b 190 340 236 348 216 340 l 183 340 b 132 367 161 340 153 347 b 66 396 115 384 94 396 b 0 324 23 396 0 363 b 66 252 0 285 23 252 z m 271 324 b 324 377 271 357 291 377 b 377 324 357 377 377 357 b 324 271 377 291 357 271 b 271 324 291 271 271 291 z"
        },
        pictChokeCymbal: {
            x_min: 1,
            x_max: 152,
            y_min: 2,
            y_max: 251,
            ha: 249,
            o: "m 1 271 b 82 190 1 222 35 190 b 122 160 118 190 122 160 b 125 144 124 154 125 150 b 102 88 125 124 115 105 b 37 32 78 56 40 35 b 26 19 32 29 26 26 b 27 14 26 17 27 16 b 37 3 29 6 33 3 b 181 102 85 3 158 66 b 219 239 210 147 219 197 l 219 249 b 104 361 219 317 170 361 b 1 271 42 361 1 321 z"
        },
        wiggleArpeggiatoUp: {
            x_min: -33,
            x_max: 292,
            y_min: 0,
            y_max: 119,
            ha: 119,
            o: "m -29 42 b -10 46 -23 42 -16 43 b 56 63 12 56 29 63 b 248 0 121 63 135 0 b 419 127 361 0 410 104 b 420 132 420 130 420 131 b 412 140 420 137 416 140 b 386 130 403 140 392 134 b 334 107 367 117 353 107 b 318 108 330 107 324 107 b 240 138 289 112 265 128 b 130 171 209 153 168 171 b -39 68 16 171 -14 91 b -48 53 -45 62 -48 58 b -29 42 -48 46 -39 42 z"
        },
        arrowheadBlackUp: {
            x_min: 0,
            x_max: 228,
            y_min: 0,
            y_max: 299,
            ha: 299,
            o: "m 0 20 b 19 1 0 4 7 1 b 166 50 43 16 160 50 b 308 1 171 50 289 13 b 312 0 310 1 311 0 b 328 20 321 0 328 12 b 166 431 328 30 220 274 b 0 20 111 274 0 30 z"
        },
        arrowheadBlackDown: {
            x_min: 0,
            x_max: 228,
            y_min: 0,
            y_max: 299,
            ha: 299,
            o: "m 166 0 b 328 410 220 157 328 400 b 312 431 328 419 321 431 b 308 429 311 431 310 429 b 166 380 289 418 171 380 b 19 429 160 380 43 415 b 0 410 7 429 0 426 b 166 0 0 400 111 157 z"
        },
        arpeggiatoUp: {
            x_min: 1,
            x_max: 229,
            y_min: 7,
            y_max: 1511,
            ha: 1504,
            o: "m 121 1848 b 92 1778 115 1822 101 1800 l 89 1773 b 59 1668 75 1741 59 1702 b 96 1555 59 1614 76 1580 b 99 1551 98 1554 99 1551 l 102 1547 b 124 1496 115 1531 124 1515 b 122 1482 124 1492 124 1488 b 92 1404 118 1453 102 1428 b 59 1293 78 1372 59 1332 b 105 1172 59 1234 81 1198 b 124 1123 115 1158 124 1145 b 122 1110 124 1119 122 1115 b 92 1032 118 1081 102 1057 b 59 922 78 1001 59 960 b 115 792 59 855 86 816 b 124 760 121 782 124 773 b 122 744 124 756 124 750 b 92 667 118 716 102 693 b 59 556 78 635 59 595 b 108 433 59 495 82 458 b 124 389 117 420 124 408 b 122 374 124 384 124 379 b 92 298 118 346 102 323 l 89 292 b 59 186 75 261 59 222 b 163 19 59 73 140 42 b 177 10 168 13 173 10 b 189 29 184 10 189 19 b 184 48 189 35 187 42 b 167 114 174 69 167 85 b 230 305 167 179 229 193 b 181 423 230 357 209 396 b 167 484 173 442 167 458 b 230 675 167 547 229 563 b 179 796 230 729 206 769 b 167 850 171 812 167 827 b 230 1040 167 913 229 929 b 183 1158 230 1092 209 1130 b 167 1220 173 1178 167 1194 b 230 1411 167 1284 229 1300 b 186 1526 230 1462 210 1499 b 167 1594 176 1529 167 1584 b 230 1786 167 1659 229 1673 b 219 1848 230 1809 226 1829 l 330 1848 l 164 2176 l 1 1848 z"
        },
        arpeggiatoDown: {
            x_min: 1,
            x_max: 229,
            y_min: -4,
            y_max: 1500,
            ha: 1504,
            o: "m 1 323 l 164 -6 l 330 323 l 219 323 b 230 384 226 341 230 361 b 167 576 229 497 167 511 b 186 644 167 586 176 641 b 230 759 210 671 230 708 b 167 950 229 870 167 886 b 183 1012 167 976 173 992 b 230 1130 209 1040 230 1079 b 167 1320 229 1241 167 1257 b 179 1374 167 1344 171 1358 b 230 1495 206 1401 230 1441 b 167 1686 229 1607 167 1623 b 181 1747 167 1712 173 1728 b 230 1865 209 1774 230 1813 b 167 2056 229 1977 167 1992 b 184 2123 167 2085 174 2101 b 189 2141 187 2128 189 2136 b 177 2160 189 2151 184 2160 b 163 2151 173 2160 168 2157 b 59 1984 140 2128 59 2097 b 89 1878 59 1948 75 1909 l 92 1872 b 122 1796 102 1848 118 1824 b 124 1781 124 1791 124 1786 b 108 1737 124 1763 117 1750 b 59 1614 82 1712 59 1675 b 92 1503 59 1575 78 1535 b 122 1426 102 1477 118 1454 b 124 1410 124 1420 124 1414 b 115 1378 124 1397 121 1388 b 59 1248 86 1354 59 1315 b 92 1138 59 1210 78 1169 b 122 1060 102 1113 118 1089 b 124 1047 122 1056 124 1051 b 105 998 124 1025 115 1012 b 59 877 81 972 59 936 b 92 766 59 838 78 798 b 122 688 102 742 118 717 b 124 674 124 683 124 678 b 102 624 124 655 115 639 l 99 619 b 96 615 99 619 98 616 b 59 503 76 590 59 556 b 89 397 59 468 75 429 l 92 392 b 121 323 101 370 115 348 z"
        },
        repeat1Bar: {
            x_min: 0,
            x_max: 532,
            y_min: -250,
            y_max: 279,
            ha: 529,
            o: "m 0 -350 b 12 -360 0 -356 4 -360 l 154 -360 b 184 -340 167 -360 177 -348 l 759 380 b 766 395 763 386 766 390 b 757 402 766 399 763 402 l 605 402 b 579 380 596 402 589 393 l 4 -340 b 0 -350 1 -343 0 -347 z m 586 -161 b 675 -251 586 -210 626 -251 b 766 -161 726 -251 766 -210 b 675 -71 766 -111 726 -71 b 586 -161 626 -71 586 -111 z m 0 197 b 89 108 0 148 40 108 b 180 197 140 108 180 148 b 89 288 180 248 140 288 b 0 197 40 288 0 248 z"
        },
        repeat2Bars: {
            x_min: 0,
            x_max: 762,
            y_min: -250,
            y_max: 279,
            ha: 529,
            o: "m 0 -350 b 12 -360 0 -356 4 -360 l 154 -360 b 184 -340 167 -360 177 -348 l 759 380 b 766 395 763 386 766 390 b 757 402 766 399 763 402 l 605 402 b 579 380 596 402 589 393 l 4 -340 b 0 -350 1 -343 0 -347 z m 343 -360 l 485 -360 b 516 -340 498 -360 508 -348 l 1090 380 b 1097 395 1094 386 1097 390 b 1089 402 1097 399 1094 402 l 936 402 b 910 380 927 402 920 393 l 336 -340 b 331 -350 333 -343 331 -347 b 343 -360 331 -356 336 -360 z m 917 -161 b 1007 -251 917 -210 958 -251 b 1097 -161 1057 -251 1097 -210 b 1007 -71 1097 -111 1057 -71 b 917 -161 958 -71 917 -111 z m 89 108 b 180 197 140 108 180 148 b 89 288 180 248 140 288 b 0 197 40 288 0 248 b 89 108 0 148 40 108 z"
        },
        repeat4Bars: {
            x_min: 0,
            x_max: 1232,
            y_min: -250,
            y_max: 279,
            ha: 529,
            o: "m 331 -350 b 343 -360 331 -356 336 -360 l 485 -360 b 516 -340 498 -360 508 -348 l 1090 380 b 1097 395 1094 386 1097 390 b 1089 402 1097 399 1094 402 l 936 402 b 910 380 927 402 920 393 l 336 -340 b 331 -350 333 -343 331 -347 z m 1008 -350 b 1020 -360 1008 -356 1012 -360 l 1162 -360 b 1192 -340 1175 -360 1185 -348 l 1767 380 b 1774 395 1771 386 1774 390 b 1765 402 1774 399 1771 402 l 1613 402 b 1587 380 1604 402 1597 393 l 1012 -340 b 1008 -350 1009 -343 1008 -347 z m 688 -360 l 831 -360 b 861 -340 844 -360 854 -348 l 1436 380 b 1443 395 1440 386 1443 390 b 1434 402 1443 399 1440 402 l 1282 402 b 1256 380 1273 402 1266 393 l 681 -340 b 677 -350 678 -343 677 -347 b 688 -360 677 -356 681 -360 z m 0 -350 b 12 -360 0 -356 4 -360 l 154 -360 b 184 -340 167 -360 177 -348 l 759 380 b 766 395 763 386 766 390 b 757 402 766 399 763 402 l 605 402 b 579 380 596 402 589 393 l 4 -340 b 0 -350 1 -343 0 -347 z m 1683 -251 b 1774 -161 1734 -251 1774 -210 b 1683 -71 1774 -111 1734 -71 b 1594 -161 1634 -71 1594 -111 b 1683 -251 1594 -210 1634 -251 z m 0 197 b 89 108 0 148 40 108 b 180 197 140 108 180 148 b 89 288 180 248 140 288 b 0 197 40 288 0 248 z"
        },
        repeatBarSlash: {
            x_min: 0,
            x_max: 532,
            y_min: -250,
            y_max: 279,
            ha: 529,
            o: "m 12 -360 l 154 -360 b 184 -340 167 -360 177 -348 l 759 380 b 766 395 763 386 766 390 b 757 402 766 399 763 402 l 605 402 b 579 380 596 402 589 393 l 4 -340 b 0 -350 1 -343 0 -347 b 12 -360 0 -356 4 -360 z"
        }
    },
    fontFamily: "Bravura",
    resolution: 1e3,
    generatedOn: "2020-04-13T11:57:57.152Z"
}
  , Q3 = {
    name: "Bravura",
    smufl: !0,
    stave: {
        padding: 12
    },
    clef: {
        default: {
            point: 32,
            width: 26
        },
        small: {
            point: 26,
            width: 20
        },
        annotations: {
            "8va": {
                smuflCode: "timeSig8",
                default: {
                    point: 18,
                    treble: {
                        line: -1.4,
                        shiftX: 12
                    }
                },
                small: {
                    point: 16,
                    treble: {
                        line: -.2,
                        shiftX: 8
                    }
                }
            },
            "8vb": {
                smuflCode: "timeSig8",
                default: {
                    point: 18,
                    treble: {
                        line: 6,
                        shiftX: 10
                    },
                    bass: {
                        line: 3.5,
                        shiftX: 1
                    }
                },
                small: {
                    point: 16,
                    treble: {
                        line: 5.3,
                        shiftX: 6
                    },
                    bass: {
                        line: 3.1,
                        shiftX: .5
                    }
                }
            }
        },
        lineCount: {
            "8": {
                point: 55,
                shiftY: 14
            },
            "7": {
                point: 47,
                shiftY: 8
            },
            "6": {
                point: 32,
                shiftY: 1
            },
            "5": {
                point: 30,
                shiftY: -6
            },
            "4": {
                point: 23,
                shiftY: -12
            }
        }
    },
    pedalMarking: {
        up: {
            point: 40
        },
        down: {
            point: 34
        }
    },
    digits: {
        shiftLine: -1,
        point: 34,
        tupletPoint: 22,
        shiftY: -6
    },
    articulation: {
        articStaccatissimoAbove: {
            padding: 2
        },
        articStaccatissimoBelow: {
            padding: 2
        }
    },
    tremolo: {
        default: {
            point: 25,
            spacing: 5,
            offsetYStemUp: -5,
            offsetYStemDown: 5,
            offsetXStemUp: 11,
            offsetXStemDown: 1
        },
        grace: {
            point: 18,
            spacing: 4,
            offsetYStemUp: -5,
            offsetYStemDown: 5,
            offsetXStemUp: 7,
            offsetXStemDown: 1
        }
    },
    stem: {
        noteHead: {
            noteheadTriangleUpHalf: {
                offsetYBaseStemUp: 5,
                offsetYBaseStemDown: 4
            },
            noteheadTriangleUpBlack: {
                offsetYBaseStemUp: 5,
                offsetYBaseStemDown: 4
            },
            noteheadTriangleUpWhole: {
                offsetYBaseStemUp: 5,
                offsetYBaseStemDown: 4
            },
            noteheadXHalf: {
                offsetYBaseStemUp: -4,
                offsetYBaseStemDown: 4
            },
            noteheadXBlack: {
                offsetYBaseStemUp: -4,
                offsetYBaseStemDown: 4
            },
            noteheadXWhole: {
                offsetYBaseStemUp: -4,
                offsetYBaseStemDown: 4
            },
            noteheadBlack: {
                offsetYBaseStemDown: 2
            },
            noteheadSquareWhite: {
                offsetYBaseStemDown: -5,
                offsetYBaseStemUp: 5
            }
        }
    },
    glyphs: {
        coda: {
            point: 20,
            shiftX: -7,
            shiftY: 8
        },
        segno: {
            shiftX: -7
        },
        flag: {
            shiftX: -.75,
            tabStem: {
                shiftX: -1.75
            },
            staveTempo: {
                shiftX: -1
            }
        },
        clef: {
            gClef: {
                default: {
                    scale: 1.1,
                    shiftY: 1
                },
                small: {
                    shiftY: 1.5
                }
            },
            fClef: {
                default: {
                    shiftY: -.5
                }
            }
        },
        ornament: {
            ornamentTurn: {
                scale: 1.2
            },
            ornamentTurnSlash: {
                scale: 1.2
            }
        },
        stroke: {
            arrowheadBlackDown: {
                straight: {
                    shiftX: -4.5
                },
                wiggly: {
                    shiftX: -1,
                    shiftY: 1
                }
            },
            arrowheadBlackUp: {
                straight: {
                    shiftX: -.85
                },
                wiggly: {
                    shiftX: -1,
                    shiftY: 1
                }
            }
        },
        textNote: {
            point: 34,
            breathMarkTick: {
                point: 36,
                shiftY: 9
            },
            breathMarkComma: {
                point: 36
            },
            segno: {
                point: 30,
                shiftX: -7,
                shiftY: 8
            },
            coda: {
                point: 20,
                shiftX: -7,
                shiftY: 8
            },
            ornamentTrill: {
                shiftX: -8,
                shiftY: 8
            },
            ornamentTurn: {
                point: 42
            },
            ornamentTurnSlash: {
                point: 42
            },
            ornamentMordent: {
                shiftX: -8
            },
            ornamentShortTrill: {
                shiftX: -8
            }
        },
        noteHead: {
            standard: {
                restQuarterStemUp: {
                    point: 35
                },
                restQuarterStemDown: {
                    point: 35
                }
            },
            custom: {
                noteheadCircleXStemUp: {
                    shiftX: 1.5
                },
                noteheadCircleXStemDown: {
                    shiftX: .25
                },
                noteheadDiamondHalfStemUp: {
                    shiftX: 1.5
                },
                noteheadDiamondBlackStemUp: {
                    shiftX: 1.5
                },
                noteheadDiamondWholeStemUp: {
                    shiftX: 1
                },
                noteheadXHalfStemUp: {
                    shiftX: -2
                },
                noteheadXHalfStemDown: {
                    shiftX: 1
                },
                noteheadXWholeStemUp: {
                    shiftX: -4
                },
                noteheadXWholeStemDown: {
                    shiftX: 1
                },
                noteheadSquareWhiteStemDown: {
                    shiftX: .25
                },
                noteheadSquareWhiteStemUp: {
                    shiftX: -.75
                },
                noteheadSquareBlackStemUp: {
                    shiftX: -.75
                },
                noteheadTriangleUpWholeStemUp: {
                    shiftX: -.75
                }
            }
        }
    }
}
  , J3 = {
    glyphs: {
        bracketTop: {
            x_min: 0,
            x_max: 559.421875,
            ha: 571,
            o: "m 544 204 b 548 204 545 204 547 204 b 559 194 555 204 559 199 b 559 190 559 192 559 191 b 530 156 559 188 556 184 b 462 86 510 134 481 104 b 453 76 458 81 454 77 l 446 70 l 441 65 b 434 59 439 63 436 61 l 427 54 b 409 37 426 51 416 44 b 392 23 398 29 394 26 b 387 19 389 22 387 20 b 379 13 386 19 383 16 l 371 8 l 367 5 l 359 -1 l 337 -16 b 285 -48 319 -29 298 -41 l 279 -52 b 186 -95 255 -66 210 -87 l 175 -99 b 23 -129 127 -117 68 -129 b 17 -129 20 -129 19 -129 b 1 -123 2 -129 2 -129 b 0 -49 0 -122 0 -83 b 0 4 0 -22 0 1 b 27 11 2 9 4 9 b 185 31 78 12 145 20 b 198 34 186 31 193 33 b 314 73 234 44 277 58 b 349 88 328 79 340 84 b 353 90 352 90 353 90 b 363 94 353 90 357 93 b 371 98 367 97 371 98 b 428 129 372 98 413 120 b 461 148 441 136 454 144 b 468 151 464 149 466 151 b 472 154 469 152 470 154 b 481 161 473 155 477 158 b 525 190 490 166 518 186 l 534 197 b 540 201 536 198 539 199 b 544 204 541 202 544 204 "
        },
        bracketBottom: {
            x_min: 0,
            x_max: 559.421875,
            ha: 571,
            o: "m 5 127 b 14 127 6 127 9 127 b 51 126 25 127 43 127 b 175 98 93 122 138 112 l 186 94 b 279 51 210 86 255 65 b 285 47 280 51 283 48 b 319 27 291 44 311 31 l 326 22 b 359 0 332 19 352 4 l 367 -6 b 371 -9 368 -6 370 -8 l 379 -15 b 387 -22 383 -18 386 -20 l 398 -30 l 411 -40 l 417 -47 l 427 -55 l 434 -61 b 441 -66 436 -62 439 -65 l 446 -72 l 453 -77 l 462 -87 b 558 -188 490 -113 549 -176 b 559 -195 559 -191 559 -194 b 548 -205 559 -201 555 -205 b 541 -204 547 -205 544 -205 b 534 -198 539 -201 536 -199 l 525 -191 b 481 -162 518 -187 490 -167 b 472 -155 477 -159 472 -156 b 468 -152 470 -155 469 -154 b 461 -149 466 -152 464 -151 b 428 -130 454 -145 441 -137 b 371 -99 413 -122 372 -99 b 363 -95 371 -99 367 -98 b 353 -91 357 -94 353 -91 b 348 -90 353 -91 352 -91 b 332 -81 343 -87 341 -86 b 27 -12 230 -37 127 -13 b 0 -5 4 -11 2 -11 b 0 58 0 -2 0 27 b 0 122 0 88 0 120 b 5 127 1 124 4 126 "
        },
        barlineTick: {
            x_min: -80.3125,
            x_max: 78.9375,
            ha: 81,
            o: "m 63 191 b 69 192 65 192 66 192 b 77 188 72 192 76 191 b 78 183 78 187 78 186 b 74 158 78 179 77 172 l 66 115 b 9 -161 49 30 10 -158 b -10 -187 6 -172 -1 -181 b -34 -194 -17 -191 -25 -194 b -80 -147 -58 -194 -80 -174 b -80 -141 -80 -144 -80 -142 b 9 70 -80 -134 -73 -117 l 49 163 b 63 191 59 188 61 190 "
        },
        breathMarkTick: {
            x_min: -80.3125,
            x_max: 78.9375,
            ha: 81,
            o: "m 63 191 b 69 192 65 192 66 192 b 77 188 72 192 76 191 b 78 183 78 187 78 186 b 74 158 78 179 77 172 l 66 115 b 9 -161 49 30 10 -158 b -10 -187 6 -172 -1 -181 b -34 -194 -17 -191 -25 -194 b -80 -147 -58 -194 -80 -174 b -80 -141 -80 -144 -80 -142 b 9 70 -80 -134 -73 -117 l 49 163 b 63 191 59 188 61 190 "
        },
        segno: {
            x_min: -330.75,
            x_max: 329.390625,
            ha: 336,
            o: "m -133 483 b -117 484 -127 484 -122 484 b 31 373 -51 484 9 440 b 35 348 34 365 35 356 b -25 285 35 313 10 285 b -87 331 -55 285 -76 302 b -167 402 -100 376 -133 402 b -191 398 -175 402 -183 401 b -227 341 -215 388 -227 369 b -225 320 -227 334 -227 327 b -13 74 -209 230 -125 133 b 6 65 -4 70 5 66 l 9 63 l 10 65 b 117 231 12 68 40 112 l 189 341 l 242 424 b 268 460 262 456 264 458 b 283 464 273 463 277 464 b 308 438 296 464 308 453 l 308 437 b 287 396 308 430 308 428 l 95 98 l 59 43 l 58 41 l 65 37 b 253 -156 151 -8 217 -77 b 281 -285 272 -199 281 -244 b 148 -481 281 -381 231 -463 b 115 -485 137 -484 126 -485 b -32 -376 51 -485 -9 -442 b -36 -349 -35 -366 -36 -358 b 25 -287 -36 -315 -12 -287 b 85 -333 54 -287 74 -302 b 166 -403 99 -377 133 -403 b 190 -399 174 -403 182 -402 b 225 -342 215 -390 225 -370 b 224 -322 225 -335 225 -328 b 12 -76 208 -231 125 -134 b -8 -66 2 -72 -6 -68 l -10 -65 l -12 -66 b -118 -231 -13 -68 -42 -113 l -190 -342 l -243 -426 b -269 -462 -264 -458 -265 -458 b -284 -466 -274 -464 -279 -466 b -310 -440 -298 -466 -310 -455 l -310 -438 b -288 -398 -310 -430 -308 -430 l -96 -99 l -59 -44 l -59 -43 l -66 -38 b -281 284 -198 33 -281 158 l -281 284 b -133 483 -281 392 -220 474 m 254 177 b 266 179 258 177 262 179 b 319 149 287 179 307 167 b 329 115 326 140 329 127 b 319 79 329 102 326 90 b 268 51 307 61 287 51 b 221 72 250 51 234 58 b 205 115 210 84 205 99 b 254 177 205 142 223 170 m -281 -54 b -269 -52 -277 -52 -273 -52 b -223 -73 -253 -52 -235 -59 b -206 -116 -212 -84 -206 -101 b -216 -151 -206 -129 -209 -141 b -269 -179 -228 -170 -249 -179 b -314 -159 -285 -179 -302 -173 b -330 -116 -325 -147 -330 -131 b -281 -54 -330 -88 -313 -61 "
        },
        coda: {
            x_min: -311.6875,
            x_max: 310.328125,
            ha: 317,
            o: "m -9 388 b -2 390 -8 390 -5 390 b 5 388 1 390 4 390 b 19 378 10 387 16 383 b 23 333 23 371 23 371 b 24 298 23 299 24 298 b 81 276 34 298 65 285 b 213 91 145 240 190 177 b 224 24 217 76 224 36 b 257 24 224 24 235 24 b 299 19 292 24 292 24 b 310 -1 306 15 310 6 b 299 -23 310 -11 306 -19 b 257 -27 292 -27 292 -27 b 224 -29 235 -27 224 -29 b 213 -95 224 -40 217 -80 b 81 -280 190 -181 145 -244 b 24 -301 65 -290 34 -301 b 23 -335 24 -301 23 -303 l 23 -340 b 17 -381 23 -374 23 -374 b -1 -391 13 -388 5 -391 b -21 -381 -9 -391 -17 -388 b -27 -340 -27 -374 -27 -374 l -27 -335 b -28 -301 -27 -303 -27 -301 b -85 -280 -38 -301 -69 -290 b -217 -95 -149 -244 -194 -181 b -228 -29 -221 -80 -228 -40 b -259 -27 -228 -29 -238 -27 b -300 -23 -294 -27 -294 -27 b -311 -2 -307 -19 -311 -11 b -294 23 -311 8 -304 19 b -259 24 -291 23 -284 24 b -228 24 -239 24 -228 24 b -217 91 -228 36 -221 76 b -85 276 -194 177 -149 240 b -28 298 -69 285 -38 298 b -27 333 -27 298 -27 299 b -27 371 -27 362 -27 369 b -9 388 -24 378 -17 385 m -27 136 b -28 247 -27 197 -28 247 b -61 216 -31 247 -53 226 b -123 33 -95 172 -121 98 l -125 24 l -76 24 l -27 24 l -27 136 m 29 242 b 24 247 27 245 24 247 b 23 136 24 247 23 197 l 23 24 l 72 24 l 121 24 l 119 33 b 29 242 115 116 77 206 m -27 -140 l -27 -27 l -76 -27 l -125 -27 l -123 -36 b -61 -220 -121 -102 -95 -176 b -28 -251 -53 -230 -31 -251 b -27 -140 -28 -251 -27 -201 m 119 -36 l 121 -27 l 72 -27 l 23 -27 l 23 -140 b 24 -251 23 -201 24 -251 b 57 -220 27 -251 49 -230 b 119 -36 91 -176 117 -102 "
        },
        gClef: {
            x_min: -1.359375,
            x_max: 847.96875,
            ha: 865,
            o: "m 488 1499 b 495 1500 490 1500 492 1500 b 541 1465 507 1500 521 1490 b 679 1078 622 1372 679 1210 b 677 1050 679 1068 677 1060 b 477 642 668 893 604 764 l 443 609 l 431 596 l 431 592 l 438 562 l 449 508 l 460 458 b 481 355 475 390 481 355 b 481 355 481 355 481 355 b 490 356 481 355 485 355 b 528 358 495 356 511 358 b 558 356 540 358 552 356 b 839 95 699 338 808 237 b 847 22 845 72 847 47 b 631 -303 847 -113 766 -242 b 620 -309 623 -308 620 -309 l 620 -310 b 631 -359 620 -310 626 -333 l 646 -435 l 660 -496 b 672 -588 668 -535 672 -563 b 664 -653 672 -610 669 -630 b 383 -875 630 -792 509 -875 b 201 -810 321 -875 257 -855 b 129 -680 151 -768 129 -730 b 274 -530 129 -592 200 -530 b 351 -553 300 -530 326 -538 b 412 -669 393 -582 412 -626 b 287 -805 412 -735 366 -800 l 279 -805 l 285 -809 b 383 -830 318 -823 351 -830 b 586 -718 464 -830 540 -789 b 626 -584 612 -678 626 -631 b 619 -528 626 -566 623 -548 b 612 -495 619 -526 616 -510 b 577 -324 590 -387 577 -324 b 577 -324 577 -324 577 -324 b 568 -326 575 -324 571 -324 b 528 -334 558 -328 537 -333 b 465 -338 506 -337 485 -338 b 24 -11 269 -338 87 -206 b -1 145 8 41 -1 93 b 96 442 -1 249 32 351 b 322 714 166 541 236 626 l 352 745 l 345 782 l 332 843 l 315 921 b 303 984 310 950 304 978 b 295 1082 298 1017 295 1049 b 413 1426 295 1208 336 1329 b 488 1499 436 1456 477 1496 m 549 1301 b 541 1301 547 1301 544 1301 b 411 1207 500 1301 447 1263 b 355 1004 374 1152 355 1079 b 359 942 355 984 356 963 b 371 881 362 927 363 917 l 385 818 b 392 782 389 799 392 784 l 392 782 b 434 828 393 782 424 816 b 607 1165 534 941 594 1060 b 608 1193 608 1175 608 1183 b 597 1270 608 1224 604 1254 b 549 1301 589 1286 571 1299 m 398 528 b 393 555 396 542 393 553 b 392 555 393 555 393 555 b 317 470 390 555 347 505 b 190 298 266 408 212 334 b 127 70 148 227 127 148 b 155 -77 127 19 137 -30 b 468 -303 209 -216 333 -303 b 519 -299 484 -303 502 -302 b 568 -284 541 -295 568 -287 l 568 -284 b 563 -263 568 -284 566 -274 l 534 -120 l 511 -13 l 496 61 l 480 133 b 469 187 472 176 469 187 b 468 188 469 187 469 188 b 416 162 462 188 430 172 b 337 13 364 126 337 69 b 413 -124 337 -40 363 -93 b 428 -144 424 -131 428 -137 b 428 -149 428 -145 428 -148 b 409 -166 426 -161 419 -166 b 394 -162 405 -166 400 -165 b 240 77 302 -122 240 -27 l 240 77 b 430 342 240 197 315 301 l 436 344 l 426 394 l 398 528 m 548 194 b 526 195 540 195 532 195 b 519 195 524 195 521 195 l 514 195 l 518 177 l 539 79 l 552 15 l 566 -48 l 594 -187 l 605 -240 b 612 -266 609 -254 611 -266 b 612 -266 612 -266 612 -266 b 641 -248 613 -266 630 -256 b 744 -98 692 -212 730 -156 b 751 -40 749 -79 751 -59 b 548 194 751 76 665 181 "
        },
        cClef: {
            x_min: 0,
            x_max: 873.828125,
            ha: 892,
            o: "m 0 0 l 0 703 l 81 703 l 164 703 l 164 0 l 164 -705 l 81 -705 l 0 -705 l 0 0 m 225 0 l 225 703 l 246 703 l 268 703 l 268 366 l 268 30 l 274 36 b 314 79 284 44 302 63 b 413 302 357 137 392 213 b 432 327 419 324 421 327 b 449 306 443 327 447 322 b 611 115 457 195 529 115 b 651 122 624 115 638 117 b 728 316 705 140 724 188 b 729 388 728 342 729 366 b 671 635 729 533 711 602 b 581 662 649 652 616 662 b 477 637 545 662 510 653 l 475 635 l 477 634 b 503 627 488 632 495 631 b 545 556 532 612 545 584 b 491 480 545 524 526 491 b 465 474 481 476 473 474 b 379 563 417 474 379 516 b 389 602 379 576 382 588 b 541 691 409 641 479 681 b 582 694 555 692 568 694 b 865 462 714 694 834 598 b 873 392 871 440 873 416 b 865 317 873 367 871 341 b 639 84 839 194 748 101 b 612 83 630 83 620 83 b 511 116 577 83 543 94 b 504 120 509 119 506 120 b 504 120 504 120 504 120 b 469 59 504 120 488 93 l 432 -1 l 469 -61 b 504 -122 488 -94 504 -122 b 504 -122 504 -122 504 -122 b 511 -117 506 -122 509 -120 b 612 -84 543 -95 577 -84 b 665 -91 630 -84 647 -87 b 869 -338 771 -122 850 -216 b 873 -392 872 -356 873 -374 b 798 -595 873 -469 847 -539 b 581 -695 741 -662 660 -695 b 406 -626 517 -695 454 -671 b 381 -563 389 -607 381 -585 b 465 -477 381 -519 413 -477 b 545 -559 514 -477 545 -519 b 503 -628 545 -587 532 -613 b 477 -635 495 -632 488 -634 l 475 -637 l 477 -638 b 581 -663 510 -655 545 -663 b 671 -637 616 -663 649 -653 b 729 -391 711 -603 729 -534 b 728 -317 729 -367 728 -344 b 623 -117 722 -173 698 -124 b 611 -116 619 -116 615 -116 b 449 -308 528 -116 457 -198 b 432 -328 447 -323 443 -328 b 413 -303 421 -328 419 -326 b 314 -80 392 -215 357 -138 b 274 -37 302 -65 284 -45 l 268 -31 l 268 -367 l 268 -705 l 246 -705 l 225 -705 l 225 0 "
        },
        fClef: {
            x_min: -1.359375,
            x_max: 899.703125,
            ha: 918,
            o: "m 307 349 b 332 351 315 351 323 351 b 443 340 367 351 408 347 b 741 47 607 306 720 195 b 744 0 743 31 744 16 b 660 -303 744 -90 713 -206 b 28 -755 534 -531 304 -695 b 14 -756 23 -755 19 -756 b -1 -741 4 -756 -1 -750 b 21 -720 -1 -731 1 -728 b 567 -56 337 -601 548 -344 b 568 -11 568 -41 568 -24 b 442 285 568 129 525 233 b 325 319 406 308 367 319 b 93 177 232 319 137 266 b 84 154 91 170 84 155 b 84 154 84 154 84 154 b 88 156 84 154 85 155 b 159 177 110 170 134 177 b 257 134 194 177 231 162 b 294 41 281 108 294 73 b 171 -97 294 -24 246 -90 b 156 -98 166 -97 161 -98 b 6 74 73 -98 6 -22 b 6 80 6 76 6 79 b 307 349 10 223 141 340 m 839 215 b 845 216 841 216 842 216 b 862 213 852 216 860 215 b 899 163 887 206 899 184 b 872 117 899 145 890 127 b 847 111 865 112 856 111 b 808 130 833 111 818 117 b 796 162 800 140 796 151 b 839 215 796 187 812 212 m 839 -112 b 845 -112 841 -112 842 -112 b 862 -115 852 -112 860 -113 b 899 -165 887 -122 899 -144 b 872 -210 899 -183 890 -201 b 847 -217 865 -215 856 -217 b 808 -198 833 -217 818 -210 b 796 -165 800 -188 796 -177 b 839 -112 796 -140 812 -116 "
        },
        unpitchedPercussionClef1: {
            x_min: 0,
            x_max: 464.140625,
            ha: 474,
            o: "m 0 0 l 0 347 l 76 347 l 153 347 l 153 0 l 153 -348 l 76 -348 l 0 -348 l 0 0 m 308 -1 l 308 347 l 386 347 l 464 347 l 464 -1 l 464 -348 l 386 -348 l 308 -348 l 308 -1 "
        },
        "6stringTabClef": {
            x_min: -1.359375,
            x_max: 680.5625,
            ha: 694,
            o: "m 597 1042 b 604 1042 600 1042 602 1042 b 642 1002 627 1042 642 1022 b 619 966 642 988 635 974 b 439 927 574 942 503 927 l 426 927 l 426 921 b 430 838 428 893 430 866 b 345 480 430 696 398 560 b 179 391 307 423 249 391 b 156 392 171 391 164 392 b 138 394 149 394 142 394 b 103 434 115 396 103 416 b 129 471 103 451 111 466 b 141 474 133 473 137 474 b 172 459 153 474 164 469 b 181 455 175 456 176 455 b 187 456 182 455 185 455 b 253 520 212 460 234 483 b 315 836 294 605 315 714 b 311 928 315 867 314 898 b 302 945 310 943 311 942 b 245 953 283 950 262 953 b 130 891 193 953 149 931 b 84 860 119 870 102 860 b 36 905 61 860 39 877 b 36 910 36 907 36 909 b 80 970 36 931 50 949 b 249 1017 125 1000 187 1017 b 322 1009 273 1017 299 1014 l 341 1003 b 436 991 372 995 406 991 b 577 1031 495 991 545 1004 b 597 1042 583 1038 590 1041 m 416 360 b 424 360 419 360 421 360 b 481 309 454 360 479 338 b 503 145 484 280 495 199 b 585 -185 525 16 555 -106 b 630 -245 596 -213 613 -237 l 634 -247 l 638 -245 b 647 -244 641 -245 645 -244 b 680 -278 666 -244 680 -262 b 664 -308 680 -290 675 -301 b 638 -312 658 -310 650 -312 b 613 -309 631 -312 623 -310 b 477 -201 555 -303 502 -260 b 417 -2 460 -159 434 -72 b 416 5 417 1 416 5 b 416 5 416 5 416 5 b 411 -5 415 5 413 0 b 359 -97 397 -33 377 -70 b 353 -106 355 -102 353 -105 b 359 -112 353 -108 355 -109 b 409 -130 375 -123 390 -129 b 426 -134 420 -130 421 -131 b 431 -147 428 -137 431 -141 b 420 -162 431 -152 427 -159 b 382 -169 409 -166 396 -169 b 323 -155 363 -169 341 -165 l 317 -152 l 314 -155 b 62 -303 240 -240 148 -295 b 36 -305 55 -305 44 -305 b 23 -303 29 -305 24 -305 b -1 -273 6 -299 -1 -287 b 31 -240 -1 -256 10 -240 b 36 -240 32 -240 34 -240 b 42 -241 38 -241 39 -241 b 134 -204 63 -241 99 -226 b 367 288 265 -115 357 81 b 375 330 368 313 370 320 b 416 360 383 347 400 358 m 360 -359 b 379 -359 363 -359 371 -359 b 424 -360 396 -359 416 -359 b 646 -502 536 -373 624 -430 b 649 -527 649 -510 649 -519 b 530 -673 649 -578 604 -635 l 521 -677 l 529 -681 b 653 -811 592 -714 637 -762 b 660 -853 658 -827 660 -839 b 645 -911 660 -873 656 -892 b 426 -1021 608 -981 519 -1021 b 283 -989 377 -1021 328 -1011 b 235 -949 249 -972 239 -964 b 234 -936 234 -946 234 -941 b 234 -928 234 -934 234 -931 l 235 -925 l 234 -927 l 225 -934 b 87 -982 186 -966 138 -982 b 80 -982 85 -982 83 -982 b 55 -981 70 -981 58 -981 b 17 -943 32 -981 17 -964 b 54 -904 17 -921 35 -904 b 78 -914 62 -904 72 -909 l 83 -918 l 88 -918 b 190 -831 122 -918 166 -881 b 269 -506 242 -727 269 -612 b 268 -462 269 -492 269 -477 b 266 -449 266 -458 266 -452 b 265 -444 266 -445 266 -444 b 257 -446 264 -444 261 -445 b 132 -545 196 -470 152 -505 b 88 -573 122 -563 104 -573 b 39 -523 63 -573 39 -553 b 63 -476 39 -505 44 -494 b 360 -359 136 -408 235 -369 m 419 -424 b 393 -423 411 -423 406 -423 l 375 -423 l 377 -426 b 379 -439 377 -427 378 -434 b 383 -510 382 -463 383 -487 b 314 -811 383 -609 360 -710 b 266 -893 296 -850 285 -870 b 264 -898 265 -896 264 -898 l 264 -898 b 264 -898 264 -898 264 -898 b 268 -898 264 -898 266 -898 b 273 -898 270 -898 272 -898 b 300 -909 283 -898 291 -900 b 426 -957 340 -941 385 -957 b 476 -949 443 -957 460 -954 b 547 -853 522 -931 547 -893 b 485 -745 547 -816 526 -775 b 397 -707 460 -727 432 -714 b 366 -675 375 -703 366 -692 b 396 -642 366 -657 377 -645 b 530 -557 455 -637 511 -601 b 536 -527 534 -548 536 -537 b 419 -424 536 -480 490 -437 "
        },
        timeSig0: {
            x_min: 0,
            x_max: 514.5,
            ha: 525,
            o: "m 236 648 b 246 648 238 648 242 648 b 288 646 261 648 283 648 b 472 513 364 634 428 587 b 514 347 502 464 514 413 b 462 163 514 272 499 217 b 257 44 409 83 333 44 b 50 163 181 44 103 83 b 0 347 14 217 0 272 b 40 513 0 413 12 464 b 236 648 87 591 155 638 m 277 614 b 253 616 273 616 261 616 b 242 616 247 616 243 616 b 170 499 193 609 181 589 b 159 348 163 446 159 398 b 166 222 159 308 161 266 b 201 91 174 138 183 106 b 257 76 215 81 235 76 b 311 91 277 76 299 81 b 347 222 330 106 338 138 b 353 348 352 266 353 308 b 344 499 353 398 351 446 b 277 614 333 587 322 606 m 257 -1 l 258 -1 l 255 -1 l 257 -1 m 257 673 l 258 673 l 255 673 l 257 673 "
        },
        timeSig1: {
            x_min: -1.359375,
            x_max: 344.359375,
            ha: 351,
            o: "m 126 637 l 129 638 l 198 638 l 266 638 l 269 635 b 274 631 272 634 273 632 l 277 627 l 277 395 b 279 156 277 230 277 161 b 329 88 281 123 295 106 b 344 69 341 81 344 79 b 337 55 344 62 343 59 l 333 54 l 197 54 l 61 54 l 58 55 b 50 69 53 59 50 62 b 65 88 50 79 53 81 b 80 97 72 91 74 93 b 117 156 103 113 112 129 b 117 345 117 161 117 222 l 117 528 l 100 503 l 38 406 b 14 383 24 384 23 383 b -1 398 5 383 -1 390 b 4 415 -1 403 1 409 b 16 437 5 416 10 426 l 72 539 l 100 596 b 121 632 119 631 119 631 b 126 637 122 634 125 635 m 171 -1 l 172 -1 l 170 -1 l 171 -1 m 171 673 l 172 673 l 170 673 l 171 673 "
        },
        timeSig2: {
            x_min: -1.359375,
            x_max: 458.6875,
            ha: 468,
            o: "m 197 648 b 216 648 201 648 208 648 b 258 646 232 648 253 648 b 419 546 333 637 393 599 b 432 489 428 528 432 509 b 356 342 432 440 405 384 b 235 278 322 313 288 295 b 69 170 166 256 107 217 b 69 169 69 170 69 169 b 69 169 69 169 69 169 b 74 173 69 169 72 170 b 209 222 112 204 163 222 b 310 195 247 222 274 215 b 371 179 332 184 352 179 b 396 181 379 179 387 179 b 428 202 409 184 423 194 b 442 212 431 209 436 212 b 458 197 450 212 458 206 b 441 148 458 190 449 165 b 299 44 409 84 353 44 b 288 45 295 44 292 44 b 250 61 274 45 268 49 b 122 99 212 86 164 99 b 73 91 104 99 88 97 b 28 63 53 84 34 72 b 14 54 25 56 20 54 b 1 62 9 54 4 56 l -1 65 l -1 79 b 0 99 -1 91 0 95 b 2 113 1 102 2 108 b 164 309 20 197 81 272 b 285 470 232 341 277 398 b 287 487 287 476 287 481 b 171 595 287 551 239 595 b 155 595 166 595 160 595 b 142 592 145 594 142 594 b 145 589 142 592 142 591 b 179 527 168 576 179 551 b 132 455 179 496 163 467 b 104 451 122 452 112 451 b 27 530 62 451 27 487 b 29 555 27 538 27 546 b 197 648 44 601 115 639 m 228 -1 l 230 -1 l 227 -1 l 228 -1 m 228 673 l 230 673 l 227 673 l 228 673 "
        },
        timeSig3: {
            x_min: -1.359375,
            x_max: 409.6875,
            ha: 418,
            o: "m 174 648 b 191 648 176 648 183 648 b 225 648 204 648 220 648 b 402 523 317 638 389 588 b 404 503 404 517 404 510 b 402 484 404 495 404 488 b 264 373 389 437 334 394 b 257 370 259 371 257 371 b 257 370 257 370 257 370 b 264 369 258 370 261 369 b 409 202 359 334 409 267 b 318 72 409 152 381 104 b 200 43 281 52 240 43 b 23 113 134 43 69 68 b 0 169 6 129 0 149 b 77 249 0 210 29 249 l 77 249 b 152 174 125 249 152 212 b 103 102 152 145 137 116 b 103 102 103 102 103 102 b 147 94 103 101 132 95 b 153 94 149 94 151 94 b 265 206 219 94 265 141 b 264 226 265 213 265 219 b 147 355 253 299 204 353 b 126 371 133 356 126 362 b 147 388 126 383 132 388 b 254 474 196 391 238 424 b 259 502 258 484 259 494 b 182 592 259 544 228 582 b 156 595 175 595 166 595 b 115 592 142 595 129 594 l 111 591 l 115 588 b 152 524 141 574 152 549 b 92 449 152 491 130 458 b 76 448 87 448 81 448 b -1 530 32 448 -1 488 b 20 581 -1 548 5 566 b 174 648 55 619 108 641 m 204 -1 l 205 -1 l 202 -1 l 204 -1 m 204 673 l 205 673 l 202 673 l 204 673 "
        },
        timeSig4: {
            x_min: 0,
            x_max: 468.21875,
            ha: 478,
            o: "m 174 637 b 232 638 175 638 189 638 b 277 638 245 638 259 638 l 378 638 l 381 635 b 389 623 386 632 389 627 b 382 609 389 617 386 613 b 366 589 381 606 372 598 l 313 528 l 245 451 l 209 410 l 155 348 l 84 267 b 59 240 72 252 59 240 b 59 240 59 240 59 240 b 151 238 59 238 68 238 l 242 238 l 242 303 b 243 371 242 369 242 370 b 289 426 245 374 254 385 l 303 441 l 317 456 l 338 483 l 360 506 l 371 520 b 386 527 375 526 381 527 b 400 519 392 527 397 524 b 401 440 401 516 401 514 b 401 377 401 423 401 402 l 401 238 l 426 238 b 453 237 449 238 450 238 b 465 217 461 234 465 226 b 460 202 465 212 464 206 b 426 197 454 197 453 197 l 401 197 l 401 180 b 451 88 402 129 412 109 b 468 69 465 81 468 79 b 461 55 468 62 466 59 l 458 54 l 321 54 l 185 54 l 182 55 b 175 69 176 59 175 62 b 191 88 175 79 176 81 b 240 180 230 109 240 129 l 240 197 l 125 197 b 73 195 104 195 87 195 b 8 197 10 195 9 197 b 0 212 2 199 0 205 b 0 212 0 212 0 212 b 20 242 0 219 0 219 b 163 610 104 344 163 492 b 174 637 163 628 166 634 m 234 -1 l 235 -1 l 232 -1 l 234 -1 m 234 673 l 235 673 l 232 673 l 234 673 "
        },
        timeSig5: {
            x_min: 0,
            x_max: 409.6875,
            ha: 418,
            o: "m 47 637 b 53 638 49 638 50 638 b 69 634 55 638 61 637 b 210 610 114 619 161 610 b 363 634 259 610 311 619 b 382 638 372 637 378 638 b 392 634 386 638 389 637 b 397 623 396 630 397 627 b 393 610 397 620 396 616 b 298 505 368 552 338 520 b 212 494 277 498 246 494 b 65 517 163 494 106 502 b 61 517 62 517 61 517 b 61 517 61 517 61 517 b 51 408 61 517 51 412 b 51 408 51 408 51 408 b 51 408 51 408 51 408 b 61 412 53 408 55 409 b 125 434 80 421 103 430 b 185 441 145 440 166 441 b 409 244 310 441 409 353 b 401 191 409 227 406 209 b 197 43 375 105 287 43 b 159 47 183 43 171 44 b 23 123 112 56 61 86 b 0 180 6 140 0 159 b 76 260 0 220 31 260 b 92 259 81 260 87 259 b 152 183 132 251 152 216 b 100 112 152 152 134 122 b 95 111 98 112 95 111 b 95 111 95 111 95 111 b 129 98 95 109 119 101 b 148 97 136 97 141 97 b 264 235 206 97 261 158 b 265 248 265 240 265 244 b 210 398 265 312 243 373 b 179 408 201 406 194 408 b 174 408 178 408 176 408 b 53 369 130 408 88 394 b 34 359 39 359 38 359 b 17 374 24 359 17 365 b 39 628 17 384 38 625 b 47 637 40 631 43 635 m 204 -1 l 205 -1 l 202 -1 l 204 -1 m 204 673 l 205 673 l 202 673 l 204 673 "
        },
        timeSig6: {
            x_min: 0,
            x_max: 475.03125,
            ha: 485,
            o: "m 255 648 b 274 648 259 648 266 648 b 314 646 288 648 307 648 b 450 555 374 637 438 594 b 454 530 453 546 454 538 b 375 451 454 485 416 451 b 328 467 359 451 343 455 b 300 526 310 483 300 503 b 352 598 300 557 319 589 b 356 599 355 598 356 599 b 352 602 356 599 355 601 b 288 616 330 612 308 616 b 210 584 257 616 230 605 b 164 433 189 559 174 508 b 160 374 163 415 160 381 b 160 374 160 374 160 374 b 160 374 160 374 160 374 b 168 377 160 374 164 376 b 258 395 200 390 228 395 b 366 367 294 395 328 387 b 475 223 436 333 475 283 b 472 197 475 215 473 206 b 349 65 462 141 419 95 b 259 43 317 51 288 43 b 167 69 230 43 200 52 b 4 290 80 113 20 195 b 0 349 1 309 0 328 b 20 467 0 391 6 433 b 255 648 58 563 155 637 m 269 363 b 257 363 265 363 261 363 b 210 345 236 363 220 356 b 186 226 196 324 186 272 b 187 198 186 216 186 206 b 213 95 191 151 202 112 b 257 76 221 83 238 76 b 270 77 261 76 266 76 b 321 156 299 81 310 99 b 329 229 326 183 329 206 b 321 301 329 252 326 274 b 269 363 311 342 298 359 m 236 -1 l 238 -1 l 235 -1 l 236 -1 m 236 673 l 238 673 l 235 673 l 236 673 "
        },
        timeSig7: {
            x_min: 0,
            x_max: 442.359375,
            ha: 451,
            o: "m 147 648 b 166 649 153 649 160 649 b 313 598 217 649 273 630 b 340 587 323 588 328 587 l 341 587 b 412 628 367 587 390 601 b 427 638 416 635 421 638 b 439 632 431 638 435 637 b 442 623 441 630 442 628 b 430 569 442 616 439 603 b 352 369 408 492 377 410 b 300 259 325 324 313 298 b 273 84 283 205 273 140 b 265 55 273 65 272 59 l 261 54 l 181 54 l 99 54 l 96 55 b 91 61 95 56 92 59 l 89 63 l 89 77 b 147 263 89 133 111 202 b 261 401 176 313 212 355 b 378 541 315 449 349 489 l 382 548 l 375 544 b 240 495 333 512 285 495 b 129 535 198 495 160 509 b 84 560 108 552 95 560 b 76 559 81 560 78 560 b 31 487 59 555 43 530 b 14 470 27 473 24 470 b 1 477 8 470 4 471 l 0 480 l 0 553 l 0 627 l 1 630 b 16 638 4 635 9 638 b 23 635 17 638 20 637 b 49 626 36 626 39 626 b 96 638 59 626 80 630 b 104 639 99 638 102 639 b 117 644 107 641 112 642 b 147 648 125 645 137 648 m 220 -1 l 221 -1 l 219 -1 l 220 -1 m 220 673 l 221 673 l 219 673 l 220 673 "
        },
        timeSig8: {
            x_min: 0,
            x_max: 488.640625,
            ha: 499,
            o: "m 217 648 b 245 649 225 648 235 649 b 453 516 343 649 430 595 b 458 478 455 503 458 491 b 412 370 458 440 441 398 b 411 369 412 369 411 369 b 415 365 411 367 412 367 b 488 231 462 331 488 281 b 472 165 488 208 483 186 b 243 43 434 86 338 43 b 63 104 178 43 112 62 b 0 233 20 140 0 186 b 73 365 0 283 24 331 l 77 369 l 72 374 b 29 476 42 406 29 441 b 217 648 29 557 103 635 m 258 605 b 242 606 253 605 247 606 b 157 552 198 606 157 580 b 160 541 157 548 159 544 b 319 413 176 503 242 452 l 337 403 l 338 406 b 359 476 352 428 359 452 b 258 605 359 537 318 595 m 138 326 b 130 330 134 328 130 330 b 130 330 130 330 130 330 b 107 305 127 330 112 313 b 84 231 91 281 84 256 b 243 86 84 156 151 86 b 249 87 245 86 246 87 b 347 156 303 88 347 120 b 344 172 347 162 345 167 b 156 319 325 227 257 281 b 138 326 151 322 144 324 m 243 -1 l 245 -1 l 242 -1 l 243 -1 m 243 673 l 245 673 l 242 673 l 243 673 "
        },
        timeSig9: {
            x_min: 0,
            x_max: 475.03125,
            ha: 485,
            o: "m 191 646 b 212 649 198 648 205 649 b 255 644 227 649 243 646 b 458 448 348 616 428 539 b 475 342 469 415 475 378 b 460 244 475 308 469 274 b 193 44 421 124 303 44 b 91 69 157 44 122 51 b 19 161 43 97 19 126 b 21 181 19 167 20 174 b 98 241 32 220 65 241 b 170 186 129 241 160 223 b 172 166 171 179 172 173 b 121 94 172 134 152 102 b 117 93 118 94 117 93 b 121 90 117 93 118 91 b 185 76 142 80 164 76 b 270 119 220 76 251 91 b 308 259 287 145 300 194 b 313 317 310 277 313 310 b 313 317 313 317 313 317 b 313 317 313 317 313 317 b 304 315 313 317 308 316 b 216 295 273 302 245 295 b 145 308 193 295 170 299 b 19 398 88 327 42 360 b 0 469 5 420 0 444 b 24 551 0 496 8 526 b 191 646 54 596 125 637 m 227 614 b 215 616 224 616 220 616 b 202 614 210 616 206 616 b 152 535 174 610 163 592 b 144 463 147 509 144 485 b 152 391 144 440 147 417 b 216 328 163 344 179 328 b 280 391 253 328 269 344 b 288 463 285 417 288 440 b 280 535 288 485 285 509 b 227 614 269 594 258 610 m 236 -1 l 238 -1 l 235 -1 l 236 -1 m 236 673 l 238 673 l 235 673 l 236 673 "
        },
        timeSigCommon: {
            x_min: -1.359375,
            x_max: 556.6875,
            ha: 568,
            o: "m 294 322 b 318 323 299 322 308 323 b 360 320 334 323 352 322 b 526 217 430 310 490 273 b 543 166 537 202 543 184 b 447 70 543 117 503 70 b 445 70 447 70 446 70 b 359 159 394 72 359 113 b 368 201 359 173 362 187 b 442 245 382 229 412 245 b 455 244 446 245 451 245 b 460 244 458 244 460 244 b 460 244 460 244 460 244 b 454 248 460 244 458 245 b 325 291 417 276 372 291 b 285 287 313 291 299 290 b 144 -2 183 269 144 190 b 281 -290 144 -208 179 -280 b 304 -291 289 -291 298 -291 b 524 -105 412 -291 506 -212 b 541 -84 526 -88 530 -84 b 556 -101 551 -84 556 -90 b 549 -138 556 -111 553 -122 b 334 -322 521 -237 435 -310 b 302 -324 323 -323 313 -324 b 13 -101 172 -324 54 -234 b -1 -1 4 -68 -1 -34 b 294 322 -1 161 121 303 "
        },
        timeSigCutCommon: {
            x_min: 0,
            x_max: 556.6875,
            ha: 568,
            o: "m 289 545 b 298 546 292 545 295 546 b 318 533 306 546 315 541 b 319 428 319 530 319 528 l 319 327 l 334 327 b 526 223 412 326 485 285 b 543 172 537 206 543 190 b 447 76 543 122 503 76 b 445 76 446 76 446 76 b 359 165 394 77 359 119 b 368 205 359 179 362 192 b 441 251 382 233 412 251 b 455 249 446 251 451 251 b 460 248 458 249 460 248 b 460 248 460 248 460 248 b 454 254 460 249 458 251 b 334 295 419 280 378 294 l 319 295 l 319 4 l 319 -287 l 321 -285 b 328 -285 322 -285 325 -285 b 524 -99 424 -277 507 -198 b 541 -79 526 -84 530 -79 b 556 -97 551 -79 556 -84 b 548 -133 556 -105 553 -117 b 334 -317 521 -233 434 -306 b 322 -319 329 -317 323 -317 l 319 -319 l 319 -424 b 319 -471 319 -444 319 -459 b 313 -541 319 -544 318 -535 b 298 -548 308 -545 303 -548 b 279 -534 289 -548 281 -542 b 277 -424 277 -531 277 -530 l 277 -317 l 273 -317 b 13 -95 153 -305 51 -217 b 0 2 4 -62 0 -29 b 182 295 0 126 66 238 b 274 324 210 309 249 320 l 277 324 l 277 427 b 279 533 277 528 277 530 b 289 545 281 538 285 542 m 277 2 b 277 291 277 161 277 291 b 268 288 277 291 273 290 b 144 1 179 265 144 184 b 276 -284 144 -199 175 -267 l 277 -285 l 277 2 "
        },
        noteheadDoubleWhole: {
            x_min: 0,
            x_max: 902.421875,
            ha: 921,
            o: "m 17 240 b 24 241 19 241 21 241 b 32 240 28 241 31 241 b 46 229 38 238 43 234 b 50 88 50 223 50 237 b 50 -1 50 63 50 34 b 50 -90 50 -36 50 -65 b 46 -231 50 -238 50 -224 b 25 -242 42 -238 34 -242 b 0 -224 14 -242 4 -235 b 0 2 0 -222 0 -108 b 0 223 0 112 0 220 b 17 240 2 230 9 237 m 110 240 b 118 241 111 241 114 241 b 126 240 121 241 123 241 b 142 223 133 237 140 230 b 144 123 144 220 144 205 b 144 29 144 45 144 29 b 144 29 144 29 144 29 b 393 183 166 106 264 167 b 450 186 412 184 431 186 b 756 29 600 186 732 120 b 756 29 756 29 756 29 b 758 123 758 29 758 45 b 760 227 758 226 758 223 b 784 241 766 237 774 241 b 804 229 792 241 800 237 b 809 88 808 223 809 237 l 809 -1 l 809 -90 b 804 -231 809 -238 808 -224 b 784 -242 800 -238 792 -242 b 762 -231 775 -242 766 -238 b 758 -124 756 -224 758 -231 b 756 -30 758 -47 758 -30 b 756 -30 756 -30 756 -30 b 509 -184 736 -108 637 -169 b 450 -187 488 -187 469 -187 b 144 -30 300 -187 168 -122 b 144 -30 144 -30 144 -30 b 144 -124 144 -30 144 -47 b 140 -231 144 -231 144 -224 b 118 -242 134 -238 126 -242 b 92 -224 107 -242 96 -235 b 92 2 92 -222 92 -108 b 92 223 92 112 92 220 b 110 240 95 230 102 237 m 432 161 b 413 162 426 162 420 162 b 313 41 351 162 313 109 b 347 -73 313 5 323 -34 b 487 -163 385 -133 439 -163 b 578 -97 526 -163 562 -142 b 588 -43 585 -80 588 -62 b 432 161 588 47 518 147 m 868 240 b 876 241 869 241 872 241 b 884 240 879 241 882 241 b 898 229 890 238 894 234 b 902 88 902 223 902 237 l 902 -1 l 902 -90 b 898 -231 902 -238 902 -224 b 876 -242 892 -238 884 -242 b 852 -224 865 -242 854 -235 b 850 2 850 -222 850 -108 b 852 223 850 112 850 220 b 868 240 853 230 860 237 "
        },
        noteheadWhole: {
            x_min: 0,
            x_max: 619.3125,
            ha: 632,
            o: "m 274 184 b 307 186 285 186 296 186 b 616 22 465 186 597 116 b 619 -1 617 13 619 5 b 308 -187 619 -104 483 -187 b 0 -1 133 -187 0 -102 b 5 36 0 11 1 23 b 274 184 29 115 141 176 m 289 161 b 272 162 284 162 277 162 b 171 41 209 162 171 108 b 205 -73 171 5 182 -34 b 345 -163 243 -133 298 -163 b 436 -98 385 -163 420 -142 b 446 -43 443 -80 446 -62 b 289 161 446 47 377 147 "
        },
        noteheadHalf: {
            x_min: 0,
            x_max: 428.75,
            ha: 438,
            o: "m 262 186 b 273 186 266 186 272 186 b 274 186 273 186 274 186 b 285 186 274 186 280 186 b 428 48 375 181 428 122 b 386 -68 428 12 416 -29 b 155 -187 329 -145 236 -187 b 12 -111 92 -187 38 -162 b 0 -51 4 -91 0 -72 b 262 186 0 58 122 179 m 366 131 b 352 134 362 133 357 134 b 219 81 321 134 269 115 b 47 -111 126 23 50 -62 b 47 -112 47 -111 47 -112 b 77 -136 47 -129 58 -136 b 264 -45 118 -136 194 -101 b 382 109 336 12 382 76 b 366 131 382 120 377 129 "
        },
        noteheadBlack: {
            x_min: 0,
            x_max: 428.75,
            ha: 438,
            o: "m 262 186 b 273 186 266 186 272 186 b 274 186 273 186 274 186 b 285 186 274 186 280 186 b 428 48 375 181 428 122 b 386 -68 428 12 416 -29 b 155 -187 329 -145 236 -187 b 12 -111 92 -187 38 -162 b 0 -51 4 -91 0 -72 b 262 186 0 58 122 179 "
        },
        noteheadXWhole: {
            x_min: 0,
            x_max: 598.890625,
            ha: 611,
            o: "m 62 181 b 77 183 66 183 72 183 b 91 181 83 183 88 183 b 202 131 100 180 106 177 l 299 87 l 394 131 b 517 183 499 181 502 183 b 519 183 517 183 518 183 b 598 104 567 183 598 144 b 577 49 598 84 592 65 b 518 15 567 38 563 37 b 484 0 499 6 484 0 b 518 -16 484 -1 499 -8 b 577 -51 563 -38 567 -40 b 598 -105 592 -66 598 -86 b 519 -184 598 -145 567 -184 b 517 -184 518 -184 517 -184 b 394 -133 502 -184 499 -183 l 299 -88 l 202 -133 b 81 -184 99 -183 95 -184 b 77 -184 80 -184 78 -184 b 0 -105 29 -184 0 -145 b 20 -51 0 -86 5 -66 b 80 -16 29 -40 34 -38 b 114 -1 98 -8 114 -1 b 80 15 114 0 98 6 b 20 49 34 37 29 38 b 0 104 6 65 0 84 b 62 181 0 140 23 174 m 88 134 b 74 136 85 134 80 136 b 68 134 72 136 69 136 b 46 104 54 130 46 117 b 55 81 46 95 49 88 b 149 34 59 76 53 80 b 224 -1 190 15 224 0 b 144 -38 224 -1 187 -18 b 54 -84 59 -79 58 -79 b 46 -105 49 -90 46 -98 b 76 -137 46 -122 58 -137 b 78 -137 77 -137 77 -137 b 194 -86 87 -137 76 -141 b 298 -36 250 -58 298 -36 b 298 -36 298 -36 298 -36 b 402 -84 299 -36 345 -58 b 518 -137 522 -141 510 -137 b 521 -137 519 -137 519 -137 b 551 -105 539 -137 551 -122 b 541 -83 551 -98 548 -90 b 447 -36 537 -77 544 -81 b 374 -1 406 -16 374 -1 b 447 34 374 0 406 15 b 541 81 544 80 537 76 b 551 104 548 88 551 97 b 521 136 551 120 539 136 b 518 136 519 136 519 136 b 517 136 518 136 517 136 l 517 136 b 402 83 511 136 511 136 b 298 34 345 56 299 34 b 298 34 298 34 298 34 b 194 84 298 34 250 56 b 88 134 137 111 89 133 "
        },
        noteheadXHalf: {
            x_min: 0,
            x_max: 406.96875,
            ha: 415,
            o: "m 55 181 b 70 183 61 183 66 183 b 111 170 85 183 99 179 b 160 130 115 167 137 149 l 202 95 l 245 130 b 319 181 299 176 302 179 b 334 183 325 183 330 183 b 406 109 375 183 406 148 b 401 81 406 99 405 91 b 348 24 394 65 390 59 b 318 -1 332 11 318 0 b 348 -26 318 -1 332 -12 b 401 -83 390 -61 394 -66 b 406 -111 405 -93 406 -101 b 334 -184 406 -149 375 -184 b 319 -183 330 -184 325 -184 b 245 -131 302 -180 299 -177 l 202 -97 l 160 -131 b 85 -183 107 -177 103 -180 b 70 -184 80 -184 76 -184 b 0 -111 31 -184 0 -149 b 4 -83 0 -101 1 -93 b 58 -26 10 -66 16 -61 b 88 -1 74 -12 88 -1 b 58 24 88 0 74 11 b 10 69 23 54 17 59 b 0 109 2 81 0 95 b 55 181 0 142 21 173 m 83 133 b 72 136 78 136 76 136 b 57 131 66 136 61 134 b 46 109 49 126 46 117 b 50 93 46 104 47 98 b 107 45 51 91 77 70 b 160 0 137 20 160 0 b 107 -47 160 -1 137 -22 b 50 -94 77 -72 51 -93 b 46 -111 47 -99 46 -105 b 59 -134 46 -120 50 -130 b 72 -137 62 -136 68 -137 b 83 -136 76 -137 80 -136 b 144 -84 84 -134 107 -116 b 202 -36 176 -58 202 -36 b 261 -84 202 -36 230 -58 b 323 -136 299 -116 321 -134 b 334 -137 326 -136 330 -137 b 345 -134 338 -137 343 -136 b 360 -111 355 -130 360 -120 b 355 -94 360 -105 359 -99 b 299 -47 353 -93 329 -72 b 245 0 269 -22 245 -1 b 299 45 245 0 269 20 b 355 93 329 70 353 91 b 360 109 359 98 360 104 b 345 133 360 119 355 129 b 334 136 343 134 338 136 b 323 134 330 136 326 134 b 261 83 321 133 299 115 b 202 34 230 56 202 34 b 144 83 202 34 176 56 b 83 133 106 115 84 133 "
        },
        noteheadXBlack: {
            x_min: 0,
            x_max: 406.96875,
            ha: 415,
            o: "m 21 183 b 28 183 24 183 25 183 b 42 181 34 183 39 183 b 127 108 47 179 47 179 b 202 41 168 72 202 41 b 279 108 204 41 238 72 b 357 177 321 145 356 176 b 375 183 363 181 370 183 b 406 151 392 183 406 169 b 404 137 406 147 405 141 b 322 62 401 131 398 129 b 251 0 284 27 251 0 b 322 -63 251 -1 284 -29 b 404 -138 398 -130 401 -133 b 406 -152 405 -142 406 -148 b 375 -184 406 -170 392 -184 b 357 -179 370 -184 363 -183 b 279 -109 356 -177 321 -147 b 202 -43 238 -73 204 -43 b 127 -109 202 -43 168 -73 b 49 -179 85 -147 50 -177 b 31 -184 43 -183 36 -184 b 0 -152 13 -184 0 -170 b 2 -138 0 -148 0 -142 b 83 -63 5 -133 8 -130 b 155 0 122 -29 155 -1 b 83 62 155 0 122 27 b 8 129 43 97 10 127 b 0 151 2 136 0 144 b 21 183 0 165 8 177 "
        },
        noteheadCircleX: {
            x_min: 0,
            x_max: 484.5625,
            ha: 494,
            o: "m 228 245 b 239 247 234 247 239 247 b 243 247 240 247 242 247 b 303 238 257 247 287 242 b 484 -2 417 208 484 104 b 412 -177 484 -65 461 -127 b 243 -248 363 -226 303 -248 b 6 -63 138 -248 36 -180 b 0 -1 1 -41 0 -20 b 228 245 0 127 98 240 m 255 181 b 240 183 247 183 245 183 b 232 181 238 183 235 183 b 142 152 200 180 168 170 l 138 149 l 190 97 l 242 44 l 294 97 l 345 149 l 340 152 b 255 181 315 169 284 180 m 147 -54 l 197 -1 l 147 51 l 95 104 l 91 99 b 62 -1 72 70 62 34 b 66 -43 62 -15 63 -29 b 91 -101 72 -63 80 -84 l 95 -106 l 147 -54 m 393 99 b 389 104 390 102 389 104 b 337 51 389 104 366 80 l 285 -1 l 337 -54 l 389 -106 l 393 -101 b 421 -1 412 -72 421 -36 b 393 99 421 34 412 69 m 294 -98 b 242 -45 265 -69 242 -45 b 190 -98 242 -45 219 -69 l 138 -151 l 142 -154 b 242 -184 172 -174 206 -184 b 340 -154 276 -184 311 -174 l 345 -151 l 294 -98 "
        },
        noteheadTriangleUpWhole: {
            x_min: 0,
            x_max: 630.203125,
            ha: 643,
            o: "m 308 204 b 314 205 310 205 313 205 b 326 201 319 205 323 204 b 355 154 328 199 338 180 b 401 83 362 142 392 95 l 409 72 b 431 41 412 66 424 49 b 619 -174 498 -51 570 -134 b 630 -192 626 -180 630 -186 b 626 -202 630 -195 628 -199 b 616 -206 623 -205 620 -206 b 552 -188 608 -206 592 -202 b 310 -155 488 -169 392 -155 b 268 -156 295 -155 281 -155 b 77 -188 197 -161 126 -173 b 13 -206 35 -202 20 -206 b 9 -206 12 -206 10 -206 b 0 -191 2 -202 0 -197 b 8 -176 0 -186 2 -180 b 204 49 58 -136 138 -43 l 220 72 l 227 83 b 295 188 245 108 281 166 b 308 204 299 197 304 202 m 315 147 b 314 147 315 147 314 147 b 314 147 314 147 314 147 b 306 129 314 145 310 138 l 296 105 b 281 72 292 97 284 77 l 274 56 b 181 -123 247 -4 212 -72 l 174 -134 l 176 -133 b 314 -123 215 -127 272 -123 b 451 -133 356 -123 413 -127 l 454 -134 l 449 -123 b 353 56 417 -72 381 -4 l 347 72 b 332 105 344 77 336 97 l 322 129 b 315 147 318 138 315 145 "
        },
        noteheadTriangleUpHalf: {
            x_min: 0,
            x_max: 438.28125,
            ha: 447,
            o: "m 212 205 b 219 205 213 205 216 205 b 239 183 228 205 231 204 b 421 -163 298 40 363 -83 b 438 -191 434 -180 438 -186 b 436 -197 438 -192 438 -195 b 424 -206 434 -204 431 -206 b 406 -201 420 -206 415 -205 b 216 -156 347 -172 281 -156 b 23 -205 148 -156 80 -173 b 14 -206 20 -206 17 -206 b 0 -191 6 -206 0 -201 b 6 -176 0 -187 1 -183 b 202 192 63 -104 142 45 b 212 205 205 199 208 202 m 264 48 l 249 81 l 243 94 l 242 91 b 89 -126 208 36 137 -66 b 81 -138 85 -133 81 -138 b 81 -138 81 -138 81 -138 b 81 -138 81 -138 81 -138 b 95 -133 81 -138 87 -136 b 280 -94 156 -108 221 -94 b 334 -98 299 -94 317 -95 b 343 -99 338 -99 343 -99 b 343 -99 343 -99 343 -99 b 338 -94 343 -99 341 -97 b 264 48 318 -58 287 1 "
        },
        noteheadTriangleUpBlack: {
            x_min: -1.359375,
            x_max: 436.921875,
            ha: 446,
            o: "m 213 205 b 217 205 215 205 216 205 b 234 194 224 205 234 199 b 236 187 234 194 235 190 l 245 167 l 261 129 l 270 106 b 355 -61 294 54 329 -13 b 420 -163 381 -105 402 -138 b 436 -188 435 -184 436 -184 b 436 -191 436 -190 436 -190 b 421 -206 436 -201 431 -206 l 421 -206 l 416 -206 l 405 -201 b 217 -158 347 -172 283 -158 b 31 -201 153 -158 88 -172 l 20 -206 l 14 -206 l 14 -206 b 0 -191 5 -206 0 -201 b -1 -188 0 -190 -1 -190 b 14 -163 -1 -186 0 -184 b 95 -34 36 -136 72 -77 b 166 106 119 8 148 68 l 175 129 l 183 148 l 200 188 b 213 205 205 199 208 202 "
        },
        noteheadDiamondWhole: {
            x_min: 0,
            x_max: 627.46875,
            ha: 640,
            o: "m 306 190 b 314 191 308 191 311 191 b 326 184 318 191 322 190 l 336 173 b 510 52 377 127 442 80 b 515 49 513 51 515 49 b 611 16 537 40 579 24 b 627 0 624 13 627 9 b 607 -18 627 -11 624 -13 b 330 -181 490 -49 389 -109 b 314 -192 323 -190 319 -192 b 306 -191 311 -192 308 -192 b 294 -177 302 -188 302 -188 b 257 -140 287 -170 265 -148 b 19 -18 193 -84 114 -44 b 0 0 2 -13 0 -11 b 16 16 0 9 2 13 b 110 49 47 24 89 40 b 117 52 111 49 114 51 b 145 65 126 56 130 58 b 281 163 200 93 245 124 b 300 186 288 170 291 174 b 306 190 300 187 303 188 m 317 137 b 313 142 315 141 314 142 b 308 137 313 142 311 141 b 161 4 276 84 220 33 b 155 0 159 1 155 0 b 163 -4 155 0 159 -2 b 308 -138 220 -34 276 -84 b 313 -142 311 -141 313 -142 b 317 -138 314 -142 315 -141 b 464 -4 351 -84 406 -34 b 470 0 468 -2 470 0 b 464 4 470 0 468 1 b 317 137 406 33 351 84 "
        },
        noteheadDiamondHalf: {
            x_min: 0,
            x_max: 438.28125,
            ha: 447,
            o: "m 212 190 b 219 191 213 191 216 191 b 236 176 225 191 228 190 b 419 18 277 105 341 49 b 436 5 431 13 434 11 b 438 -1 438 4 438 1 b 424 -16 438 -8 432 -13 b 356 -49 409 -20 379 -36 b 234 -180 306 -83 258 -133 b 219 -192 230 -188 224 -192 b 200 -176 213 -192 206 -187 b 9 -15 157 -102 89 -45 b 0 0 2 -12 0 -6 b 16 18 0 9 2 12 b 200 176 93 48 159 104 b 212 190 205 186 208 188 m 239 113 b 236 117 238 116 238 117 b 230 108 235 117 234 115 b 92 -15 196 58 140 8 b 88 -18 91 -16 88 -18 b 92 -20 88 -18 91 -19 b 198 -116 130 -43 166 -74 b 200 -117 200 -117 200 -117 b 201 -117 200 -117 201 -117 b 264 -43 212 -98 242 -62 b 345 15 288 -19 321 4 b 348 18 347 16 348 16 b 344 20 348 18 347 19 b 239 113 307 41 266 79 "
        },
        noteheadDiamondBlack: {
            x_min: 0,
            x_max: 432.828125,
            ha: 442,
            o: "m 209 186 b 213 187 210 187 212 187 b 216 187 215 187 216 187 b 224 174 216 186 220 180 b 420 -1 269 105 338 43 b 432 -12 431 -8 432 -9 b 421 -23 432 -15 432 -16 b 228 -180 345 -70 264 -137 b 219 -188 221 -188 221 -188 l 219 -188 b 208 -177 215 -188 215 -188 b 10 1 163 -106 93 -44 b 0 11 0 6 0 8 b 10 22 0 13 0 15 b 202 179 87 69 167 136 b 209 186 206 183 209 186 "
        },
        augmentationDot: {
            x_min: 0,
            x_max: 133.390625,
            ha: 136,
            o: "m 54 66 b 65 68 58 68 61 68 b 122 37 88 68 110 56 b 133 -1 130 26 133 12 b 104 -58 133 -23 123 -44 b 66 -69 92 -65 78 -69 b 10 -38 44 -69 23 -58 b 0 -1 2 -27 0 -13 b 54 66 0 30 20 61 "
        },
        tremolo1: {
            x_min: -206.890625,
            x_max: 428.75,
            ha: 438,
            o: "m 389 -351 b 394 -351 390 -351 393 -351 b 428 -385 413 -351 428 -367 b 428 -394 428 -388 428 -391 b 394 -428 426 -406 421 -410 l 332 -473 l 269 -516 l 205 -560 l 141 -603 l 77 -648 l 13 -692 l -50 -737 l -114 -780 l -145 -802 b -171 -813 -157 -810 -163 -813 b -175 -813 -172 -813 -174 -813 b -206 -777 -194 -811 -206 -795 b -202 -760 -206 -771 -205 -766 b -87 -675 -197 -752 -206 -757 l -34 -639 l 83 -557 l 145 -514 l 209 -470 l 272 -427 b 389 -351 375 -356 381 -352 "
        },
        flag8thUp: {
            x_min: -24.5,
            x_max: 317.140625,
            ha: 324,
            o: "m -24 -161 l -24 -5 l -20 -5 b 0 -24 -9 -5 -2 -12 b 171 -315 21 -124 84 -233 b 317 -660 268 -406 317 -531 b 187 -1014 317 -782 274 -909 b 161 -1034 172 -1034 171 -1034 b 141 -1013 149 -1034 141 -1025 b 152 -991 141 -1004 142 -1002 b 266 -682 228 -899 266 -788 b 174 -430 266 -588 236 -498 b -23 -317 136 -388 66 -348 b -24 -161 -23 -316 -24 -285 "
        },
        flag8thDown: {
            x_min: -21.78125,
            x_max: 367.5,
            ha: 375,
            o: "m 230 1031 b 238 1032 232 1032 235 1032 b 259 1014 245 1032 251 1027 b 367 662 330 906 367 782 b 364 602 367 641 367 621 b 232 317 352 488 304 384 b 57 120 155 245 103 187 b -1 18 31 84 6 40 b -19 4 -4 11 -12 4 l -21 4 l -21 159 l -21 315 l -16 315 b 96 335 10 315 62 324 b 315 695 227 380 315 527 b 313 738 315 709 314 724 b 224 991 304 825 273 916 b 216 1013 219 999 216 1007 b 230 1031 216 1021 220 1028 "
        },
        flag16thUp: {
            x_min: -24.5,
            x_max: 317.140625,
            ha: 324,
            o: "m -24 -147 l -24 -5 l -20 -5 b -1 -19 -12 -5 -4 -11 b 58 -123 6 -43 31 -86 b 196 -278 93 -173 134 -219 b 317 -570 274 -356 317 -460 b 294 -713 317 -617 308 -666 l 289 -724 l 294 -735 b 317 -873 308 -780 317 -827 b 235 -1132 317 -963 288 -1054 b 209 -1165 228 -1140 224 -1146 b 189 -1177 204 -1172 196 -1177 b 171 -1164 182 -1177 175 -1172 b 168 -1154 170 -1161 168 -1159 b 181 -1132 168 -1149 172 -1142 b 269 -891 238 -1064 269 -975 b 269 -881 269 -886 269 -884 b 262 -814 269 -857 265 -827 b 258 -800 261 -811 259 -806 b 142 -628 240 -731 198 -667 b -8 -589 112 -606 47 -589 b -20 -589 -13 -589 -19 -589 l -24 -589 l -24 -449 l -24 -308 l -20 -308 b -1 -322 -12 -308 -4 -313 b 58 -424 6 -345 31 -388 b 194 -580 93 -476 136 -523 b 259 -660 221 -606 245 -635 b 261 -663 259 -662 261 -663 b 264 -656 262 -663 262 -660 b 269 -587 268 -632 269 -610 b 264 -521 269 -566 268 -544 b 262 -512 264 -517 262 -513 b 258 -498 261 -509 259 -503 b 142 -326 240 -428 198 -365 b -8 -287 112 -303 47 -288 b -20 -287 -13 -287 -19 -287 l -24 -287 l -24 -147 "
        },
        flag16thDown: {
            x_min: -21.78125,
            x_max: 362.0625,
            ha: 369,
            o: "m 302 1031 b 308 1032 304 1032 307 1032 b 330 1016 318 1032 325 1027 b 362 867 351 970 362 920 b 340 738 362 824 353 780 l 336 727 l 340 717 b 362 591 355 677 362 634 b 257 323 362 496 325 401 b 204 272 243 306 227 290 b 20 56 129 206 66 133 b -1 18 12 44 0 22 b -19 4 -4 9 -12 4 l -21 4 l -21 140 l -21 276 l -12 277 b 167 333 61 288 127 309 b 319 598 262 388 319 491 b 311 664 319 620 317 642 l 310 673 l 304 664 b 204 548 279 620 250 587 b 20 333 129 483 66 409 b -1 292 12 320 0 298 b -19 280 -4 285 -12 280 l -21 280 l -21 416 l -21 552 l -12 553 b 167 609 61 564 127 585 b 319 874 264 666 319 770 b 294 992 319 914 311 954 b 288 1011 288 1004 288 1007 b 302 1031 288 1021 294 1028 "
        },
        flag32ndUp: {
            x_min: -24.5,
            x_max: 315.78125,
            ha: 322,
            o: "m -24 -145 l -24 -5 l -20 -5 b 1 -26 -10 -5 -6 -9 b 175 -241 31 -86 96 -166 b 314 -548 259 -323 304 -420 b 315 -589 315 -555 315 -571 b 314 -630 315 -606 315 -623 b 298 -730 311 -664 306 -699 l 295 -742 l 296 -748 b 314 -850 304 -778 311 -813 b 315 -892 315 -857 315 -874 b 314 -932 315 -909 315 -925 b 298 -1032 311 -967 306 -1002 l 295 -1045 l 296 -1050 b 314 -1153 304 -1081 311 -1115 b 315 -1193 315 -1160 315 -1177 b 314 -1235 315 -1211 315 -1228 b 217 -1526 306 -1338 270 -1444 b 201 -1533 213 -1532 208 -1533 b 182 -1522 193 -1533 185 -1529 b 179 -1514 181 -1518 179 -1517 b 189 -1489 179 -1508 182 -1501 b 266 -1217 240 -1403 266 -1308 b 262 -1156 266 -1196 265 -1177 b 110 -907 247 -1043 190 -950 b 0 -889 87 -895 50 -889 l -1 -889 l -24 -889 l -24 -749 l -24 -610 l -20 -610 b 1 -631 -10 -610 -6 -614 b 175 -846 31 -691 96 -771 b 259 -956 213 -884 236 -914 b 265 -966 262 -961 264 -966 b 265 -966 265 -966 265 -966 b 265 -953 265 -964 265 -959 b 266 -920 266 -943 266 -932 b 262 -853 266 -898 265 -873 b 110 -605 247 -741 190 -648 b 0 -587 87 -592 50 -587 l -1 -587 l -24 -587 l -24 -448 l -24 -308 l -20 -308 b 1 -328 -10 -308 -6 -312 b 175 -544 31 -388 96 -469 b 259 -655 213 -581 236 -612 b 265 -663 262 -659 264 -663 b 265 -663 265 -663 265 -663 b 265 -650 265 -663 265 -657 b 266 -617 266 -641 266 -630 b 262 -551 266 -595 265 -570 b 110 -303 247 -438 190 -345 b 0 -284 87 -290 50 -284 l -1 -284 l -24 -284 l -24 -145 "
        },
        flag32ndDown: {
            x_min: -21.78125,
            x_max: 366.140625,
            ha: 374,
            o: "m 276 1378 b 284 1379 279 1379 281 1379 b 306 1360 292 1379 298 1374 b 352 1247 326 1326 343 1286 b 366 1139 362 1213 366 1175 b 347 1009 366 1093 359 1049 l 344 1002 l 347 992 b 352 971 348 986 351 977 b 366 863 362 936 366 899 b 347 732 366 818 359 773 l 344 725 l 347 716 b 352 695 348 710 351 700 b 366 588 362 659 366 623 b 223 262 366 464 314 345 b 189 233 212 252 212 252 b 35 76 126 183 73 129 b -1 16 20 56 2 27 b -19 4 -4 9 -12 4 l -21 4 l -21 137 l -21 270 l -17 270 b 186 344 59 281 134 308 b 319 606 270 399 319 499 b 317 650 319 620 319 635 l 315 659 l 314 655 b 223 537 288 607 258 570 b 189 509 212 528 212 528 b 35 352 126 459 73 405 b -1 292 20 333 2 303 b -19 280 -4 285 -12 280 l -21 280 l -21 413 l -21 546 l -17 546 b 186 620 59 557 134 584 b 319 882 270 675 319 775 b 317 925 319 896 319 911 l 315 935 l 314 931 b 223 813 288 884 258 846 b 189 785 212 805 212 805 b 35 628 126 735 73 681 b -1 569 20 609 2 580 b -19 556 -4 562 -12 556 l -21 556 l -21 689 l -21 823 l -17 823 b 202 907 68 835 152 867 b 319 1157 280 968 319 1061 b 270 1338 319 1218 303 1281 b 262 1358 264 1349 262 1353 b 262 1364 262 1360 262 1363 b 276 1378 265 1371 269 1376 "
        },
        flag64thUp: {
            x_min: -24.5,
            x_max: 314.421875,
            ha: 321,
            o: "m -24 -145 l -24 -5 l -20 -5 b 0 -23 -9 -5 -2 -12 b 27 -87 4 -38 14 -66 b 138 -220 53 -136 88 -177 b 235 -328 179 -255 208 -288 b 314 -592 287 -409 314 -501 b 292 -732 314 -639 307 -687 l 289 -742 l 294 -756 b 314 -896 307 -802 314 -849 b 292 -1035 314 -943 307 -991 l 289 -1045 l 294 -1057 b 314 -1197 307 -1104 314 -1152 b 292 -1338 314 -1246 307 -1292 l 289 -1347 l 294 -1360 b 314 -1500 307 -1407 314 -1454 b 273 -1689 314 -1565 300 -1628 b 250 -1712 265 -1710 261 -1712 b 228 -1691 236 -1712 228 -1704 l 228 -1685 l 234 -1675 b 270 -1507 258 -1621 270 -1564 b 98 -1193 270 -1381 209 -1261 b 40 -1174 76 -1179 58 -1174 b -10 -1189 24 -1174 8 -1178 b -20 -1192 -14 -1192 -16 -1192 l -24 -1192 l -24 -1052 l -24 -913 l -20 -913 b 0 -931 -9 -913 -2 -920 b 27 -995 4 -946 14 -974 b 138 -1128 53 -1043 88 -1085 b 257 -1275 190 -1172 228 -1220 b 262 -1283 259 -1279 262 -1283 l 262 -1283 b 269 -1249 264 -1282 268 -1260 b 270 -1206 270 -1233 270 -1220 b 98 -891 270 -1075 206 -957 b 40 -871 76 -877 58 -871 b -10 -886 24 -871 8 -875 b -20 -889 -14 -889 -16 -889 l -24 -889 l -24 -749 l -24 -610 l -20 -610 b 0 -628 -9 -610 -2 -617 b 27 -692 4 -644 14 -671 b 138 -825 53 -741 88 -782 b 257 -973 190 -870 228 -917 b 262 -981 259 -977 262 -981 l 262 -981 b 269 -946 264 -979 268 -957 b 270 -903 270 -931 270 -917 b 98 -588 270 -774 206 -655 b 40 -569 76 -574 58 -569 b -10 -584 24 -569 8 -574 b -20 -587 -14 -587 -16 -587 l -24 -587 l -24 -448 l -24 -308 l -20 -308 b 0 -326 -9 -308 -2 -315 b 27 -390 4 -341 14 -369 b 138 -523 53 -438 88 -480 b 257 -670 190 -567 228 -614 b 262 -678 259 -674 262 -678 b 262 -678 262 -678 262 -678 b 269 -644 264 -677 268 -656 b 270 -601 270 -628 270 -614 b 98 -285 270 -471 206 -352 b 40 -266 76 -273 58 -266 b -10 -281 24 -266 8 -272 b -20 -284 -14 -284 -16 -284 l -24 -284 l -24 -145 "
        },
        flag64thDown: {
            x_min: -21.78125,
            x_max: 367.5,
            ha: 375,
            o: "m 259 1553 b 265 1553 261 1553 264 1553 b 288 1540 272 1553 277 1550 b 367 1351 340 1493 367 1424 b 336 1221 367 1308 357 1263 l 332 1211 l 333 1208 b 367 1077 356 1170 367 1124 b 336 945 367 1032 357 986 l 332 935 l 333 932 b 367 800 356 893 367 848 b 336 669 367 756 357 710 l 332 659 l 333 656 b 367 523 356 617 367 571 b 345 412 367 485 360 446 b 231 273 322 356 284 310 b -1 19 121 195 27 93 b -17 4 -4 11 -10 5 l -21 4 l -21 134 l -21 265 l -17 265 b 133 291 20 265 96 278 b 318 537 245 328 318 433 b 307 603 318 559 315 582 b 303 614 304 612 304 614 b 298 609 302 614 300 613 b 231 549 281 589 258 567 b -1 295 121 471 27 369 b -17 280 -4 287 -10 281 l -21 280 l -21 410 l -21 541 l -17 541 b 133 567 20 541 96 555 b 318 813 245 605 318 709 b 307 880 318 835 315 859 b 303 891 304 888 304 891 b 298 885 302 891 300 888 b 231 825 281 866 258 843 b -1 571 121 748 27 645 b -17 556 -4 563 -10 557 l -21 556 l -21 687 l -21 817 l -17 817 b 133 843 20 817 96 830 b 318 1089 245 881 318 985 b 307 1156 318 1111 315 1134 b 303 1167 304 1164 304 1167 b 298 1161 302 1167 300 1164 b 231 1102 281 1140 258 1120 b -1 848 121 1024 27 921 b -17 832 -4 839 -10 834 l -21 832 l -21 963 l -21 1093 l -17 1093 b 114 1113 12 1093 78 1103 b 313 1314 215 1142 289 1218 b 318 1364 317 1331 318 1347 b 255 1511 318 1422 295 1478 b 243 1532 247 1519 243 1525 b 259 1553 243 1540 250 1550 "
        },
        flag128thUp: {
            x_min: -24.5,
            x_max: 313.0625,
            ha: 319,
            o: "m -24 -133 l -24 -5 l -20 -5 b -1 -19 -12 -5 -4 -11 b 142 -213 13 -61 74 -144 b 258 -376 196 -269 230 -315 b 313 -605 295 -449 313 -528 b 292 -742 313 -652 306 -699 b 288 -752 289 -748 288 -752 b 288 -752 288 -752 288 -752 b 292 -764 289 -753 291 -757 b 313 -907 306 -811 313 -860 b 292 -1045 313 -954 306 -1002 b 288 -1054 289 -1050 288 -1054 b 288 -1054 288 -1054 288 -1054 b 292 -1067 289 -1054 291 -1060 b 313 -1210 306 -1113 313 -1161 b 292 -1346 313 -1257 306 -1304 b 288 -1357 289 -1353 288 -1357 b 288 -1357 288 -1357 288 -1357 b 292 -1368 289 -1357 291 -1363 b 313 -1512 306 -1415 313 -1464 b 292 -1648 313 -1560 306 -1605 b 288 -1660 289 -1654 288 -1660 b 288 -1660 288 -1660 288 -1660 b 292 -1671 289 -1660 291 -1665 b 313 -1814 306 -1719 313 -1766 b 250 -2040 313 -1897 291 -1977 b 232 -2062 238 -2057 236 -2059 b 221 -2065 230 -2063 225 -2065 b 200 -2045 210 -2065 201 -2057 b 200 -2043 200 -2044 200 -2044 b 208 -2026 200 -2037 202 -2034 b 269 -1826 249 -1966 269 -1897 b 153 -1544 269 -1726 230 -1625 b -9 -1472 115 -1506 58 -1481 b -21 -1471 -14 -1471 -19 -1471 l -24 -1471 l -24 -1343 l -24 -1215 l -20 -1215 b -1 -1229 -12 -1215 -4 -1221 b 142 -1424 13 -1270 74 -1353 b 257 -1582 196 -1478 228 -1524 b 264 -1594 261 -1589 264 -1594 l 264 -1594 b 265 -1582 264 -1594 264 -1589 b 270 -1525 268 -1562 270 -1544 b 153 -1243 270 -1424 228 -1321 b -9 -1170 115 -1203 58 -1178 b -21 -1168 -14 -1170 -19 -1168 l -24 -1168 l -24 -1041 l -24 -913 l -20 -913 b -1 -927 -12 -913 -4 -918 b 142 -1121 13 -967 74 -1050 b 257 -1281 196 -1175 228 -1221 b 264 -1292 261 -1286 264 -1292 l 264 -1292 b 265 -1279 264 -1292 264 -1286 b 270 -1222 268 -1261 270 -1242 b 153 -941 270 -1121 228 -1018 b -9 -867 115 -900 58 -875 b -21 -866 -14 -867 -19 -866 l -24 -866 l -24 -738 l -24 -610 l -20 -610 b -1 -624 -12 -610 -4 -616 b 142 -818 13 -664 74 -749 b 257 -978 196 -873 228 -918 b 264 -989 261 -984 264 -989 l 264 -989 b 265 -977 264 -989 264 -984 b 270 -920 268 -959 270 -939 b 153 -638 270 -818 228 -716 b -9 -564 115 -598 58 -573 b -21 -563 -14 -564 -19 -563 l -24 -563 l -24 -435 l -24 -308 l -20 -308 b -1 -322 -12 -308 -4 -313 b 142 -516 13 -363 74 -446 b 257 -675 196 -571 228 -616 b 264 -687 261 -681 264 -687 l 264 -687 b 265 -674 264 -687 264 -681 b 270 -617 268 -656 270 -637 b 153 -335 270 -516 228 -413 b -9 -262 115 -295 58 -270 b -21 -260 -14 -262 -19 -260 l -24 -260 l -24 -133 "
        },
        flag128thDown: {
            x_min: -21.78125,
            x_max: 367.5,
            ha: 375,
            o: "m 276 1900 b 284 1901 279 1900 281 1901 b 306 1883 291 1901 298 1896 b 367 1686 347 1825 367 1757 b 343 1558 367 1643 359 1600 l 338 1549 l 343 1537 b 367 1411 359 1497 367 1454 b 343 1282 367 1367 359 1324 l 338 1272 l 343 1261 b 367 1135 359 1221 367 1178 b 343 1007 367 1090 359 1047 l 338 996 l 343 985 b 367 859 359 945 367 902 b 343 731 367 814 359 771 l 338 720 l 343 709 b 367 582 359 667 367 626 b 289 362 367 503 340 426 b 239 312 276 345 259 330 b 29 77 152 237 76 152 b -1 18 14 54 2 30 b -19 4 -4 11 -12 4 l -21 4 l -21 133 l -20 260 l -13 262 b 98 299 17 269 62 284 b 111 305 103 302 110 305 b 167 334 123 310 156 327 b 319 595 264 391 319 491 b 313 659 319 616 318 638 b 310 667 311 664 311 667 b 307 663 310 667 308 666 b 240 588 289 637 269 614 b 16 331 141 505 62 413 b -1 294 8 316 1 302 b -19 280 -4 287 -12 280 l -21 280 l -21 408 l -20 537 l -13 538 b 98 576 17 545 62 560 b 111 581 103 578 110 581 b 167 610 123 587 156 603 b 319 871 264 667 319 767 b 313 935 319 892 318 913 b 310 942 311 941 311 942 b 307 939 310 942 308 941 b 240 864 289 913 269 889 b 16 607 141 781 62 689 b -1 570 8 592 1 578 b -19 556 -4 563 -12 556 l -21 556 l -21 684 l -20 813 l -13 814 b 98 852 17 821 62 836 b 111 857 103 855 110 857 b 167 886 123 863 156 880 b 319 1147 264 943 319 1043 b 313 1211 319 1168 318 1189 b 310 1218 311 1217 311 1218 b 307 1215 310 1218 308 1217 b 240 1140 289 1188 269 1165 b 16 884 141 1057 62 966 b -1 846 8 868 1 855 b -19 832 -4 839 -12 832 l -21 832 l -21 960 l -20 1089 l -13 1090 b 98 1128 17 1097 62 1111 b 111 1134 103 1131 110 1134 b 167 1163 123 1139 156 1156 b 319 1424 264 1220 319 1320 b 313 1486 319 1444 318 1465 b 310 1494 311 1493 311 1494 b 307 1492 310 1494 308 1493 b 240 1417 289 1464 269 1442 b 16 1160 141 1333 62 1242 b -1 1121 8 1145 1 1131 b -19 1109 -4 1115 -12 1109 l -21 1109 l -21 1236 l -20 1365 l -13 1367 b 98 1404 17 1374 62 1388 b 111 1410 103 1407 110 1410 b 250 1508 172 1437 215 1467 b 319 1701 296 1564 319 1633 b 270 1859 319 1757 303 1814 b 262 1882 265 1868 262 1875 b 276 1900 262 1890 266 1896 "
        },
        accidentalFlat: {
            x_min: -21.78125,
            x_max: 251.8125,
            ha: 257,
            o: "m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 383 20 616 20 616 l 20 148 l 21 151 b 137 199 59 183 99 199 b 182 191 152 199 167 197 b 251 84 227 176 251 134 b 228 0 251 58 243 29 b 100 -142 206 -40 178 -72 l 23 -215 b 0 -229 9 -229 6 -229 b -20 -216 -9 -229 -17 -224 l -21 -212 l -21 201 l -21 616 l -20 620 b -8 631 -17 624 -13 630 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 "
        },
        accidentalNatural: {
            x_min: 0,
            x_max: 239.5625,
            ha: 244,
            o: "m 10 460 b 20 462 13 462 14 462 b 39 449 28 462 35 458 l 40 446 l 40 326 b 40 205 40 259 40 205 b 127 227 40 205 80 215 b 220 249 196 244 213 249 b 227 247 224 249 225 248 b 238 237 231 245 235 241 l 239 233 l 239 -106 l 239 -448 l 238 -451 b 219 -463 234 -459 225 -463 b 198 -451 210 -463 202 -459 l 197 -448 l 197 -324 b 197 -201 197 -248 197 -201 b 110 -223 196 -201 157 -210 b 17 -245 42 -240 24 -245 b 10 -242 13 -245 13 -244 b 0 -233 6 -241 2 -237 l 0 -230 l 0 108 l 0 446 l 0 449 b 10 460 2 453 6 458 m 197 22 b 197 70 197 41 197 58 b 196 116 197 113 197 116 l 196 116 b 118 97 196 116 160 106 l 40 77 l 40 -18 b 40 -112 40 -69 40 -112 l 119 -93 l 197 -73 l 197 22 "
        },
        accidentalSharp: {
            x_min: 0,
            x_max: 323.9375,
            ha: 331,
            o: "m 217 535 b 225 537 220 537 221 537 b 245 524 235 537 242 533 l 246 521 l 247 390 l 247 258 l 273 265 b 306 270 288 269 299 270 b 322 259 315 270 319 267 b 323 208 323 256 323 233 b 322 158 323 184 323 159 b 288 140 318 148 315 147 b 247 130 254 131 247 130 b 247 65 247 130 247 104 b 247 20 247 51 247 36 l 247 -88 l 273 -81 b 306 -76 289 -77 299 -76 b 318 -81 311 -76 315 -77 b 323 -123 323 -87 323 -86 l 323 -138 l 323 -154 b 318 -195 323 -191 323 -190 b 269 -210 314 -199 315 -199 b 249 -216 259 -213 250 -216 l 247 -216 l 247 -349 l 246 -483 l 245 -487 b 225 -499 242 -495 234 -499 b 206 -487 219 -499 210 -495 l 205 -483 l 205 -355 l 205 -227 l 204 -227 l 181 -233 l 138 -244 b 117 -249 127 -247 117 -249 b 115 -385 115 -249 115 -256 l 115 -523 l 114 -526 b 95 -538 110 -534 102 -538 b 74 -526 87 -538 78 -534 l 73 -523 l 73 -391 b 72 -260 73 -269 73 -260 b 72 -260 72 -260 72 -260 b 19 -273 61 -263 23 -273 b 0 -260 10 -273 4 -267 b 0 -209 0 -256 0 -256 l 0 -162 l 1 -158 b 61 -134 5 -148 5 -148 l 73 -131 l 73 -22 b 72 86 73 79 73 86 b 72 86 72 86 72 86 b 19 74 61 83 23 74 b 0 86 10 74 4 79 b 0 137 0 90 0 90 l 0 184 l 1 188 b 61 212 5 198 5 198 l 73 215 l 73 348 l 73 481 l 74 485 b 95 498 78 492 87 498 b 103 495 98 498 100 496 b 114 485 107 494 111 489 l 115 481 l 115 353 l 115 226 l 121 226 b 159 235 123 227 141 231 l 198 247 l 205 248 l 205 384 l 205 521 l 206 524 b 217 535 209 528 212 533 m 205 9 b 205 119 205 70 205 119 l 205 119 b 182 113 204 119 194 116 l 138 102 b 117 97 127 99 117 97 b 115 -12 115 97 115 91 l 115 -122 l 121 -120 b 159 -111 123 -119 141 -115 l 198 -101 l 205 -98 l 205 9 "
        },
        accidentalDoubleSharp: {
            x_min: 0,
            x_max: 367.5,
            ha: 375,
            o: "m 0 124 l 0 187 l 61 187 l 122 187 l 122 138 l 122 91 l 153 61 l 183 30 l 213 61 l 243 91 l 243 138 l 243 187 l 306 187 l 367 187 l 367 124 l 367 61 l 321 61 l 274 61 l 243 30 l 213 0 l 243 -31 l 274 -62 l 321 -62 l 367 -62 l 367 -124 l 367 -188 l 306 -188 l 243 -188 l 243 -140 l 243 -93 l 213 -62 l 183 -31 l 153 -62 l 122 -93 l 122 -140 l 122 -188 l 61 -188 l 0 -188 l 0 -124 l 0 -62 l 46 -62 l 92 -62 l 123 -31 l 153 0 l 123 30 l 92 61 l 46 61 l 0 61 l 0 124 "
        },
        accidentalDoubleFlat: {
            x_min: -21.78125,
            x_max: 483.1875,
            ha: 493,
            o: "m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 383 20 616 20 616 l 20 148 l 21 151 b 140 199 59 183 102 199 b 206 179 164 199 187 192 l 210 176 l 210 396 l 210 617 l 212 621 b 231 632 216 628 223 632 b 250 620 239 632 247 628 b 251 383 251 616 251 616 l 251 148 l 254 151 b 370 199 291 183 332 199 b 415 191 385 199 400 197 b 483 84 458 176 483 134 b 461 0 483 58 476 29 b 332 -142 439 -40 411 -72 l 255 -215 b 231 -229 240 -229 239 -229 b 216 -223 224 -229 220 -227 b 210 -158 210 -217 210 -223 b 210 -120 210 -148 210 -136 l 210 -29 l 205 -34 b 100 -142 182 -65 159 -88 l 23 -215 b -1 -229 9 -229 6 -229 b -20 -216 -9 -229 -17 -224 l -21 -212 l -21 201 l -21 616 l -20 620 b -8 631 -17 624 -13 630 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 m 341 131 b 328 133 337 133 332 133 b 322 133 326 133 323 133 b 257 87 296 129 273 113 l 251 80 l 251 -37 l 251 -156 l 255 -152 b 375 81 328 -72 375 20 l 375 83 b 341 131 375 113 367 126 "
        },
        accidentalParensLeft: {
            x_min: -166.0625,
            x_max: -25.859375,
            ha: 0,
            o: "m -49 369 b -42 370 -46 369 -44 370 b -27 360 -36 370 -29 366 b -25 355 -27 359 -25 358 b -32 335 -25 351 -28 347 b -92 52 -66 248 -87 159 b -93 -1 -93 43 -93 20 b -92 -54 -93 -23 -93 -45 b -32 -337 -85 -162 -66 -251 b -25 -355 -27 -349 -25 -352 b -42 -371 -25 -365 -32 -371 b -61 -353 -50 -371 -51 -369 b -163 -63 -119 -262 -153 -165 b -166 -1 -166 -37 -166 -31 b -163 62 -166 30 -166 36 b -61 352 -153 163 -119 260 b -49 369 -54 365 -51 366 "
        },
        accidentalParensRight: {
            x_min: 25.859375,
            x_max: 164.6875,
            ha: 168,
            o: "m 34 369 b 40 370 35 370 38 370 b 59 353 49 370 50 367 b 164 40 122 254 155 158 b 164 0 164 33 164 16 b 164 -40 164 -16 164 -34 b 59 -353 155 -158 122 -254 b 40 -371 53 -366 47 -371 b 34 -370 38 -371 36 -370 b 25 -358 28 -367 25 -363 b 31 -337 25 -352 27 -347 b 92 0 72 -234 92 -117 b 31 335 92 116 72 233 b 25 356 27 345 25 352 b 34 369 25 363 28 366 "
        },
        accidentalQuarterToneFlatStein: {
            x_min: 0,
            x_max: 272.21875,
            ha: 278,
            o: "m 243 631 b 250 632 246 632 249 632 b 270 620 259 632 268 628 l 272 616 l 272 201 l 272 -212 l 270 -216 b 251 -229 268 -224 259 -229 b 227 -215 243 -229 240 -229 l 151 -142 b 32 -16 81 -80 53 -49 b 0 84 9 18 0 52 b 111 199 0 149 42 199 b 137 197 119 199 127 198 b 228 151 168 191 197 177 l 231 148 l 231 383 b 232 620 231 616 231 616 b 243 631 234 624 238 630 m 168 131 b 152 133 163 133 157 133 b 107 102 130 133 111 120 b 106 86 107 97 106 91 b 111 41 106 73 108 56 b 227 -152 125 -13 171 -90 l 231 -156 l 231 -37 l 231 80 l 225 87 b 168 131 210 111 190 126 "
        },
        accidentalThreeQuarterTonesFlatZimmermann: {
            x_min: 0,
            x_max: 607.0625,
            ha: 619,
            o: "m 243 631 b 250 632 246 632 249 632 b 270 620 259 632 268 628 l 272 616 l 272 201 l 272 -212 l 270 -216 b 251 -229 268 -224 259 -229 b 227 -215 243 -229 240 -229 l 151 -142 b 32 -16 81 -80 53 -49 b 0 84 9 18 0 52 b 111 199 0 149 42 199 b 137 197 119 199 127 198 b 228 151 168 191 197 177 l 231 148 l 231 383 b 232 620 231 616 231 616 b 243 631 234 624 238 630 m 168 131 b 152 133 163 133 157 133 b 107 102 130 133 111 120 b 106 86 107 97 106 91 b 111 41 106 73 108 56 b 227 -152 125 -13 171 -90 l 231 -156 l 231 -37 l 231 80 l 225 87 b 168 131 210 111 190 126 m 347 631 b 353 632 348 632 351 632 b 374 620 363 632 371 628 b 375 383 375 616 375 616 l 375 148 l 377 151 b 492 199 415 183 454 199 b 537 191 507 199 522 197 b 607 84 582 176 607 134 b 583 0 607 58 598 29 b 455 -142 562 -40 533 -72 l 378 -215 b 355 -229 364 -229 362 -229 b 334 -216 345 -229 337 -224 l 333 -212 l 333 201 l 333 616 l 334 620 b 347 631 337 624 341 630 m 465 131 b 451 133 461 133 455 133 b 445 133 449 133 446 133 b 379 87 419 129 396 113 l 375 80 l 375 -37 l 375 -156 l 378 -152 b 499 81 451 -72 499 20 l 499 83 b 465 131 499 113 490 126 "
        },
        accidentalQuarterToneSharpStein: {
            x_min: 0,
            x_max: 193.28125,
            ha: 197,
            o: "m 85 514 b 95 517 88 517 89 517 b 114 505 103 517 110 513 l 115 502 l 115 376 b 115 249 115 306 115 249 b 141 258 117 249 127 252 l 167 266 l 172 266 b 190 254 181 265 187 262 l 193 251 l 193 202 l 193 188 b 187 147 193 149 191 152 b 147 130 183 142 182 141 l 115 119 l 115 9 b 115 -99 115 -51 115 -99 b 141 -91 115 -99 127 -95 b 171 -81 166 -81 167 -81 l 171 -81 b 191 -94 181 -81 189 -87 b 193 -142 191 -97 193 -120 b 191 -195 193 -167 191 -194 b 125 -227 187 -205 187 -204 l 115 -230 l 115 -366 l 115 -503 l 114 -506 b 95 -519 110 -514 102 -519 b 74 -506 87 -519 78 -514 l 73 -503 l 73 -374 b 73 -245 73 -260 73 -245 b 73 -245 73 -245 73 -245 b 55 -252 72 -245 63 -249 l 32 -260 b 19 -263 27 -262 23 -263 b 4 -256 13 -263 8 -260 b 0 -215 0 -251 0 -254 b 0 -199 0 -210 0 -206 l 0 -152 l 1 -149 b 8 -140 2 -145 5 -141 b 42 -127 9 -140 24 -133 l 73 -116 l 73 -5 b 73 23 73 4 73 15 b 73 105 73 70 73 105 b 49 97 73 105 61 101 b 17 88 32 91 23 88 b 4 95 10 88 8 91 b 0 137 0 101 0 98 b 0 151 0 141 0 145 l 0 199 l 1 202 b 43 224 5 212 5 212 l 73 234 l 73 367 l 73 502 l 74 505 b 85 514 77 509 81 513 "
        },
        accidentalThreeQuarterTonesSharpStein: {
            x_min: -1.359375,
            x_max: 455.96875,
            ha: 465,
            o: "m 352 541 b 357 542 353 542 355 542 b 377 530 364 542 372 537 l 378 526 l 378 394 l 379 262 l 404 266 b 436 270 420 269 430 270 b 450 265 443 270 446 269 b 455 220 455 259 455 260 l 455 208 l 455 161 l 454 156 b 411 140 449 147 447 147 b 378 133 393 137 379 134 b 378 68 378 133 378 106 b 378 22 378 54 378 38 l 379 -87 l 404 -83 b 436 -79 420 -80 430 -79 b 450 -84 443 -79 446 -80 b 455 -129 455 -90 455 -88 l 455 -141 l 455 -188 l 454 -192 b 413 -209 449 -202 447 -202 b 382 -215 398 -212 383 -215 l 378 -215 l 378 -345 l 378 -380 b 375 -485 378 -484 378 -480 b 357 -494 371 -491 364 -494 b 340 -485 351 -494 344 -491 b 336 -383 337 -480 336 -484 l 336 -349 l 336 -223 l 334 -223 b 291 -231 334 -223 314 -227 l 247 -240 l 247 -371 l 246 -503 l 245 -506 b 225 -519 242 -514 234 -519 b 206 -506 219 -519 210 -514 l 205 -503 l 205 -376 l 205 -248 l 160 -256 l 115 -265 l 115 -396 l 115 -527 l 114 -531 b 95 -544 110 -539 102 -544 b 76 -531 87 -544 78 -539 l 73 -527 l 73 -399 b 73 -273 73 -330 73 -273 b 49 -277 73 -273 61 -274 b 17 -281 32 -280 24 -281 b 4 -276 10 -281 8 -280 b -1 -234 0 -269 -1 -272 b 0 -219 -1 -229 0 -224 l 0 -170 l 1 -167 b 10 -158 2 -163 6 -159 b 49 -149 13 -156 16 -155 l 73 -145 l 73 -34 b 73 76 73 26 73 76 b 49 72 73 76 61 74 b 17 68 32 69 24 68 b 4 73 10 68 8 69 b -1 115 0 80 -1 77 b 0 130 -1 120 0 124 l 0 179 l 1 181 b 10 191 2 186 6 190 b 49 199 13 192 16 194 l 73 204 l 73 338 b 73 374 73 352 73 365 b 77 483 73 484 73 477 b 95 492 81 489 88 492 b 111 483 100 492 107 489 b 115 378 115 477 115 483 l 115 342 b 117 212 115 223 115 212 b 204 229 117 212 200 227 l 205 229 l 205 365 l 205 502 l 206 505 b 225 517 210 513 219 517 b 245 505 234 517 242 513 l 246 502 l 247 369 l 247 237 l 249 237 b 336 254 253 238 336 254 b 337 390 336 254 337 302 l 337 526 l 338 530 b 352 541 341 535 347 539 m 336 15 b 336 126 336 102 336 126 l 336 126 b 291 117 336 126 315 122 l 247 109 l 247 -1 l 247 -112 l 249 -112 b 336 -95 253 -111 336 -95 b 336 15 336 -95 336 -56 m 205 -120 b 205 -55 205 -120 205 -93 b 205 -9 205 -41 205 -24 l 205 101 l 160 93 l 115 84 l 115 -26 b 115 -83 115 -49 115 -69 b 117 -137 115 -133 115 -137 b 205 -120 118 -137 204 -120 "
        },
        accidentalBuyukMucennebFlat: {
            x_min: -171.5,
            x_max: 251.8125,
            ha: 257,
            o: "m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 553 20 616 20 614 b 20 491 20 503 20 491 l 20 491 b 153 535 47 501 149 535 b 174 514 167 535 174 524 b 164 496 174 508 171 501 b 92 470 164 495 132 484 l 20 445 l 20 390 b 20 363 20 378 20 370 b 20 333 20 340 20 333 l 20 333 b 153 377 47 344 149 377 b 174 356 167 377 174 367 b 164 338 174 349 171 342 b 92 312 164 338 132 326 l 20 288 l 20 219 l 20 148 l 21 151 b 137 199 59 183 99 199 b 182 191 152 199 167 197 b 251 84 227 176 251 134 b 228 0 251 58 243 29 b 100 -142 206 -40 178 -72 l 23 -215 b -1 -229 9 -229 6 -229 b -20 -216 -9 -229 -17 -224 b -21 30 -21 -212 -21 -212 b -21 273 -21 163 -21 273 b -84 252 -21 273 -50 263 b -152 230 -133 234 -145 230 b -157 231 -155 230 -156 231 b -171 252 -166 234 -171 244 b -160 270 -171 259 -167 266 b -27 316 -159 270 -93 294 l -21 319 l -21 374 b -21 431 -21 406 -21 431 b -84 409 -21 431 -50 421 b -152 388 -133 392 -145 388 b -157 390 -155 388 -156 388 b -171 409 -166 392 -171 401 b -160 428 -171 417 -167 424 b -27 474 -159 428 -93 451 l -21 476 l -21 546 b -20 620 -21 614 -21 616 b -8 631 -17 624 -13 630 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 "
        },
        accidentalBakiyeFlat: {
            x_min: -176.9375,
            x_max: 251.8125,
            ha: 257,
            o: "m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 503 20 616 20 614 b 20 391 20 442 20 391 b 84 424 20 391 49 406 l 147 456 l 152 456 b 153 456 153 456 153 456 b 175 435 166 456 175 446 b 172 427 175 433 174 430 b 92 380 170 420 172 421 l 20 342 l 20 245 l 20 148 l 21 151 b 137 199 59 183 99 199 b 182 191 152 199 167 197 b 251 84 227 176 251 134 b 228 0 251 58 243 29 b 100 -142 206 -40 178 -72 l 23 -215 b 0 -229 9 -229 6 -229 b -20 -216 -9 -229 -17 -224 b -21 54 -21 -212 -21 -212 b -21 322 -21 201 -21 322 b -85 290 -21 322 -50 308 l -148 256 l -153 256 b -155 256 -155 256 -155 256 b -176 277 -167 256 -176 266 b -174 285 -176 280 -175 283 b -93 333 -171 294 -174 292 l -21 370 l -21 494 b -20 620 -21 616 -21 616 b -8 631 -17 624 -13 630 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 "
        },
        accidentalKomaSharp: {
            x_min: -1.359375,
            x_max: 455.96875,
            ha: 465,
            o: "m 352 541 b 357 542 353 542 355 542 b 377 530 364 542 372 537 l 378 526 l 378 394 l 379 262 l 404 266 b 436 270 420 269 430 270 b 450 265 443 270 446 269 b 455 220 455 259 455 260 l 455 208 l 455 161 l 454 156 b 411 140 449 147 447 147 b 378 133 393 137 379 134 b 378 68 378 133 378 106 b 378 22 378 54 378 38 l 379 -87 l 404 -83 b 436 -79 420 -80 430 -79 b 450 -84 443 -79 446 -80 b 455 -129 455 -90 455 -88 l 455 -141 l 455 -188 l 454 -192 b 413 -209 449 -202 447 -202 b 382 -215 398 -212 383 -215 l 378 -215 l 378 -345 l 378 -380 b 375 -485 378 -484 378 -480 b 357 -494 371 -491 364 -494 b 340 -485 351 -494 344 -491 b 336 -383 337 -480 336 -484 l 336 -349 l 336 -223 l 334 -223 b 291 -231 334 -223 314 -227 l 247 -240 l 247 -371 l 246 -503 l 245 -506 b 225 -519 242 -514 234 -519 b 206 -506 219 -519 210 -514 l 205 -503 l 205 -376 l 205 -248 l 160 -256 l 115 -265 l 115 -396 l 115 -527 l 114 -531 b 95 -544 110 -539 102 -544 b 76 -531 87 -544 78 -539 l 73 -527 l 73 -399 b 73 -273 73 -330 73 -273 b 49 -277 73 -273 61 -274 b 17 -281 32 -280 24 -281 b 4 -276 10 -281 8 -280 b -1 -234 0 -269 -1 -272 b 0 -219 -1 -229 0 -224 l 0 -170 l 1 -167 b 10 -158 2 -163 6 -159 b 49 -149 13 -156 16 -155 l 73 -145 l 73 -34 b 73 76 73 26 73 76 b 49 72 73 76 61 74 b 17 68 32 69 24 68 b 4 73 10 68 8 69 b -1 115 0 80 -1 77 b 0 130 -1 120 0 124 l 0 179 l 1 181 b 10 191 2 186 6 190 b 49 199 13 192 16 194 l 73 204 l 73 338 b 73 374 73 352 73 365 b 77 483 73 484 73 477 b 95 492 81 489 88 492 b 111 483 100 492 107 489 b 115 378 115 477 115 483 l 115 342 b 117 212 115 223 115 212 b 204 229 117 212 200 227 l 205 229 l 205 365 l 205 502 l 206 505 b 225 517 210 513 219 517 b 245 505 234 517 242 513 l 246 502 l 247 369 l 247 237 l 249 237 b 336 254 253 238 336 254 b 337 390 336 254 337 302 l 337 526 l 338 530 b 352 541 341 535 347 539 m 336 15 b 336 126 336 102 336 126 l 336 126 b 291 117 336 126 315 122 l 247 109 l 247 -1 l 247 -112 l 249 -112 b 336 -95 253 -111 336 -95 b 336 15 336 -95 336 -56 m 205 -120 b 205 -55 205 -120 205 -93 b 205 -9 205 -41 205 -24 l 205 101 l 160 93 l 115 84 l 115 -26 b 115 -83 115 -49 115 -69 b 117 -137 115 -133 115 -137 b 205 -120 118 -137 204 -120 "
        },
        accidentalKucukMucennebSharp: {
            x_min: -1.359375,
            x_max: 255.890625,
            ha: 261,
            o: "m 118 514 b 127 517 121 517 122 517 b 147 505 136 517 142 513 l 148 502 l 148 403 b 148 306 148 351 148 306 b 174 315 149 306 160 310 l 200 324 l 205 323 b 223 312 213 323 220 319 l 225 308 l 225 260 b 225 245 225 255 225 249 b 220 204 225 208 224 209 b 179 188 216 199 215 199 l 148 177 l 148 124 l 148 70 l 189 84 b 236 98 219 94 230 98 b 247 94 240 98 243 97 b 255 52 254 88 255 87 b 255 33 255 47 255 40 l 254 -12 l 253 -15 b 249 -22 253 -18 250 -20 l 245 -24 l 196 -41 l 148 -58 l 148 -108 b 148 -158 148 -136 148 -158 b 174 -148 148 -158 160 -154 b 204 -140 198 -140 200 -140 l 204 -140 b 224 -152 213 -140 221 -145 b 225 -201 224 -155 225 -177 b 224 -254 225 -226 224 -251 b 157 -284 220 -262 220 -262 l 148 -288 l 148 -395 l 148 -503 l 147 -506 b 127 -519 142 -514 134 -519 b 107 -506 119 -519 111 -514 l 106 -503 l 106 -403 b 106 -303 106 -316 106 -303 b 104 -303 104 -303 104 -303 b 88 -310 104 -303 96 -306 l 63 -319 b 51 -322 59 -320 55 -322 b 36 -315 46 -322 40 -319 b 31 -273 32 -309 31 -312 b 31 -258 31 -269 31 -263 l 31 -210 l 34 -206 b 40 -198 35 -204 38 -199 b 74 -186 42 -197 57 -191 l 106 -173 l 106 -123 b 106 -97 106 -112 106 -104 b 106 -72 106 -76 106 -72 b 104 -72 106 -72 106 -72 b 20 -99 89 -79 23 -99 b 0 -84 10 -99 2 -93 b -1 -37 0 -81 -1 -59 b 0 11 -1 -15 0 9 b 58 40 4 22 2 22 l 106 56 l 106 109 b 106 123 106 115 106 119 b 106 162 106 147 106 162 b 81 155 106 162 93 159 b 50 147 65 149 55 147 b 36 152 43 147 40 148 b 31 194 32 158 31 156 b 31 209 31 198 31 204 l 31 256 l 34 260 b 76 281 38 269 38 269 l 106 292 l 106 396 l 106 502 l 107 505 b 118 514 110 509 114 513 "
        },
        articAccentAbove: {
            x_min: -348.4375,
            x_max: 24.5,
            ha: 25,
            o: "m -330 155 b -322 156 -329 156 -326 156 b -315 156 -319 156 -317 156 b -298 147 -311 155 -308 154 b -19 30 -224 98 -122 55 l 2 26 b 24 -1 17 22 24 13 b 2 -27 24 -15 17 -23 l -19 -31 b -298 -148 -122 -56 -224 -99 b -322 -158 -313 -158 -315 -158 b -348 -131 -338 -158 -348 -145 b -344 -117 -348 -127 -347 -122 b -328 -104 -341 -112 -338 -111 b -127 -8 -269 -65 -202 -33 b -106 0 -115 -4 -106 -1 b -127 6 -106 0 -115 2 b -328 102 -202 31 -269 63 b -344 116 -338 109 -341 111 b -348 130 -347 120 -348 124 b -330 155 -348 141 -341 152 "
        },
        articAccentBelow: {
            x_min: -348.4375,
            x_max: 24.5,
            ha: 25,
            o: "m -330 155 b -322 156 -329 156 -326 156 b -315 156 -319 156 -317 156 b -298 147 -311 155 -308 154 b -19 30 -224 98 -122 55 l 2 26 b 24 -1 17 22 24 13 b 2 -27 24 -15 17 -23 l -19 -31 b -298 -148 -122 -56 -224 -99 b -322 -158 -313 -158 -315 -158 b -348 -131 -338 -158 -348 -145 b -344 -117 -348 -127 -347 -122 b -328 -104 -341 -112 -338 -111 b -127 -8 -269 -65 -202 -33 b -106 0 -115 -4 -106 -1 b -127 6 -106 0 -115 2 b -328 102 -202 31 -269 63 b -344 116 -338 109 -341 111 b -348 130 -347 120 -348 124 b -330 155 -348 141 -341 152 "
        },
        articTenutoAbove: {
            x_min: 0,
            x_max: 318.5,
            ha: 325,
            o: "m 20 376 b 167 377 23 377 96 377 b 296 376 231 377 294 377 b 318 347 311 371 318 359 b 296 316 318 333 311 320 b 159 315 294 315 227 315 b 21 316 91 315 24 315 b 0 345 6 320 0 333 b 20 376 0 359 6 371 "
        },
        articTenutoBelow: {
            x_min: 0,
            x_max: 318.5,
            ha: 325,
            o: "m 20 376 b 167 377 23 377 96 377 b 296 376 231 377 294 377 b 318 347 311 371 318 359 b 296 316 318 333 311 320 b 159 315 294 315 227 315 b 21 316 91 315 24 315 b 0 345 6 320 0 333 b 20 376 0 359 6 371 "
        },
        articStaccatoAbove: {
            x_min: 0,
            x_max: 133.390625,
            ha: 136,
            o: "m 54 66 b 65 68 58 68 61 68 b 122 37 88 68 110 56 b 133 -1 130 26 133 12 b 104 -58 133 -23 123 -44 b 66 -69 92 -65 78 -69 b 10 -38 44 -69 23 -58 b 0 -1 2 -27 0 -13 b 54 66 0 30 20 61 "
        },
        articStaccatoBelow: {
            x_min: 0,
            x_max: 133.390625,
            ha: 136,
            o: "m 54 66 b 65 68 58 68 61 68 b 122 37 88 68 110 56 b 133 -1 130 26 133 12 b 104 -58 133 -23 123 -44 b 66 -69 92 -65 78 -69 b 10 -38 44 -69 23 -58 b 0 -1 2 -27 0 -13 b 54 66 0 30 20 61 "
        },
        articStaccatissimoAbove: {
            x_min: -73.5,
            x_max: 72.140625,
            ha: 74,
            o: "m -72 252 l -73 254 l 0 254 l 72 254 l 70 252 b 0 -1 70 248 0 -1 b -72 252 -1 -1 -72 248 "
        },
        articStaccatissimoBelow: {
            x_min: -73.5,
            x_max: 72.140625,
            ha: 74,
            o: "m -72 252 l -73 254 l 0 254 l 72 254 l 70 252 b 0 -1 70 248 0 -1 b -72 252 -1 -1 -72 248 "
        },
        articMarcatoAbove: {
            x_min: -149.71875,
            x_max: 148.359375,
            ha: 151,
            o: "m -8 -1 b -1 0 -5 -1 -4 0 b 16 -11 5 0 13 -4 b 83 -186 17 -12 47 -90 l 148 -358 l 148 -363 b 127 -385 148 -376 138 -385 b 112 -378 122 -385 118 -383 b 54 -226 110 -374 114 -385 b 0 -81 24 -147 0 -81 b -55 -226 -1 -81 -25 -147 b -114 -378 -115 -385 -111 -374 b -129 -385 -119 -383 -123 -385 b -149 -363 -140 -385 -149 -376 l -149 -358 l -84 -186 b -19 -11 -49 -90 -19 -12 b -8 -1 -17 -8 -12 -4 "
        },
        articMarcatoBelow: {
            x_min: -149.71875,
            x_max: 148.359375,
            ha: 151,
            o: "m -8 -1 b -1 0 -5 -1 -4 0 b 16 -11 5 0 13 -4 b 83 -186 17 -12 47 -90 l 148 -358 l 148 -363 b 127 -385 148 -376 138 -385 b 112 -378 122 -385 118 -383 b 54 -226 110 -374 114 -385 b 0 -81 24 -147 0 -81 b -55 -226 -1 -81 -25 -147 b -114 -378 -115 -385 -111 -374 b -129 -385 -119 -383 -123 -385 b -149 -363 -140 -385 -149 -376 l -149 -358 l -84 -186 b -19 -11 -49 -90 -19 -12 b -8 -1 -17 -8 -12 -4 "
        },
        fermataAbove: {
            x_min: -442.359375,
            x_max: 441,
            ha: 450,
            o: "m -31 487 b -1 488 -21 488 -10 488 b 434 104 216 488 397 330 b 441 27 438 79 441 47 b 439 12 441 20 439 15 b 419 0 435 4 427 0 b 404 5 413 0 408 1 b 398 30 400 11 398 13 b 0 351 390 213 213 351 b -59 348 -20 351 -39 349 b -400 30 -251 324 -393 191 b -405 5 -400 13 -401 11 b -420 0 -409 1 -415 0 b -441 12 -428 0 -436 4 b -442 27 -441 15 -442 20 b -435 104 -442 47 -439 79 b -31 487 -401 316 -235 474 m -13 131 b -1 133 -9 133 -5 133 b 51 105 19 133 39 123 b 61 70 58 95 61 83 b 51 34 61 58 58 45 b -1 6 39 16 19 6 b -46 27 -17 6 -34 13 b -62 69 -57 38 -62 54 b -13 131 -62 98 -44 124 "
        },
        fermataBelow: {
            x_min: -441,
            x_max: 439.640625,
            ha: 449,
            o: "m -428 -2 b -421 0 -427 -1 -424 0 b -406 -6 -416 0 -409 -2 b -400 -31 -401 -12 -400 -15 b -1 -352 -392 -215 -215 -352 b 58 -349 19 -352 38 -351 b 398 -31 250 -326 392 -192 b 404 -6 398 -15 400 -12 b 419 -1 408 -2 413 -1 b 439 -13 427 -1 435 -5 b 439 -29 439 -16 439 -22 b 434 -105 439 -48 438 -80 b 0 -489 397 -333 213 -489 b -68 -484 -23 -489 -44 -488 b -441 -36 -280 -452 -436 -263 b -441 -30 -441 -34 -441 -31 b -428 -2 -441 -11 -439 -5 m -13 -9 b -1 -8 -9 -8 -5 -8 b 50 -36 19 -8 39 -19 b 61 -72 57 -47 61 -59 b 50 -106 61 -84 57 -97 b -1 -134 39 -124 19 -134 b -46 -115 -17 -134 -34 -129 b -62 -72 -57 -102 -62 -87 b -13 -9 -62 -44 -44 -16 "
        },
        breathMarkComma: {
            x_min: -1.359375,
            x_max: 193.28125,
            ha: 197,
            o: "m 78 233 b 87 233 81 233 84 233 b 187 140 132 233 174 195 b 193 102 190 127 193 115 b 43 -113 193 22 136 -62 b 27 -119 36 -116 31 -119 b 19 -108 21 -119 19 -115 b 29 -97 19 -102 20 -101 b 102 13 73 -72 102 -27 b 92 51 102 26 98 40 l 91 54 l 84 54 b 8 104 53 54 21 74 b -1 142 1 116 -1 130 b 78 233 -1 187 31 227 "
        },
        breathMarkUpbow: {
            x_min: -170.140625,
            x_max: 168.78125,
            ha: 172,
            o: "m -160 567 b -122 567 -159 567 -149 567 l -87 567 l -84 566 b -74 553 -78 563 -77 560 b -20 366 -73 551 -49 466 b 31 186 8 267 31 186 b 85 371 31 186 55 269 b 140 559 114 473 138 557 b 153 567 141 564 148 567 b 168 559 159 567 166 564 b 168 555 168 557 168 557 b 92 281 168 548 159 513 b 14 13 50 134 14 13 b 0 0 14 6 6 0 b -17 15 -8 0 -17 8 b -93 283 -17 15 -51 136 b -170 552 -166 533 -170 548 b -170 553 -170 552 -170 552 b -160 567 -170 560 -167 564 "
        },
        caesura: {
            x_min: 0,
            x_max: 622.03125,
            ha: 635,
            o: "m 398 417 b 406 419 401 419 404 419 b 427 398 417 419 427 409 b 427 391 427 395 427 392 b 34 -274 424 385 38 -272 b 20 -280 29 -278 25 -280 b 0 -259 9 -280 0 -270 b 0 -252 0 -256 0 -254 b 393 413 2 -247 389 410 b 398 417 394 415 397 416 m 592 417 b 600 419 594 419 597 419 b 622 398 611 419 622 409 b 620 391 622 395 620 392 b 227 -274 617 385 231 -272 b 213 -280 223 -278 219 -280 b 193 -259 202 -280 193 -270 b 194 -252 193 -256 193 -254 b 586 413 196 -247 582 410 b 592 417 588 415 590 416 "
        },
        caesuraCurved: {
            x_min: 0,
            x_max: 503.609375,
            ha: 514,
            o: "m 274 430 b 277 430 276 430 277 430 b 310 394 296 430 310 415 b 308 383 310 391 308 387 b 306 367 307 381 307 374 b 236 120 298 305 272 210 b 40 -273 189 -5 125 -134 b 20 -287 35 -283 27 -287 b 5 -281 14 -287 9 -285 b 0 -267 1 -277 0 -273 b 9 -242 0 -262 2 -255 b 246 395 137 -12 232 242 b 274 430 249 416 257 427 m 468 430 b 472 430 469 430 470 430 b 503 394 490 430 503 415 b 502 383 503 391 503 387 b 499 367 502 381 500 374 b 431 120 491 305 465 210 b 234 -273 382 -5 318 -134 b 213 -287 228 -283 220 -287 b 198 -281 208 -287 202 -285 b 193 -267 194 -277 193 -273 b 202 -242 193 -262 196 -255 b 439 395 330 -12 426 242 b 468 430 442 416 451 427 "
        },
        restMaxima: {
            x_min: 0,
            x_max: 464.140625,
            ha: 474,
            o: "m 0 0 l 0 347 l 76 347 l 153 347 l 153 0 l 153 -348 l 76 -348 l 0 -348 l 0 0 m 308 -1 l 308 347 l 386 347 l 464 347 l 464 -1 l 464 -348 l 386 -348 l 308 -348 l 308 -1 "
        },
        restDoubleWhole: {
            x_min: 0,
            x_max: 386.5625,
            ha: 394,
            o: "m 0 173 l 0 347 l 193 347 l 386 347 l 386 173 l 386 0 l 193 0 l 0 0 l 0 173 "
        },
        restWhole: {
            x_min: 0,
            x_max: 447.8125,
            ha: 457,
            o: "m 0 -87 l 0 0 l 223 0 l 447 0 l 447 -87 l 447 -174 l 223 -174 l 0 -174 l 0 -87 "
        },
        restHalf: {
            x_min: 0,
            x_max: 447.8125,
            ha: 457,
            o: "m 0 86 l 0 173 l 223 173 l 447 173 l 447 86 l 447 0 l 223 0 l 0 0 l 0 86 "
        },
        restQuarter: {
            x_min: 0,
            x_max: 300.8125,
            ha: 307,
            o: "m 49 505 b 53 506 50 505 51 506 b 70 496 58 506 62 503 b 81 485 73 492 78 488 l 96 473 l 111 459 l 122 449 l 134 438 l 182 396 l 255 330 b 292 291 292 298 292 298 l 292 290 l 292 284 l 283 270 b 209 36 234 197 209 113 b 288 -170 209 -44 235 -119 b 299 -184 295 -179 299 -181 b 300 -191 300 -187 300 -188 b 285 -206 300 -199 294 -206 b 280 -206 283 -206 281 -206 b 247 -201 270 -202 259 -201 b 176 -222 223 -201 197 -208 b 114 -340 136 -249 114 -292 b 172 -471 114 -384 134 -433 b 185 -492 182 -481 185 -487 b 181 -502 185 -496 183 -499 b 171 -508 176 -505 174 -508 b 152 -498 166 -508 160 -503 b 0 -284 65 -428 12 -352 b 0 -260 0 -278 0 -270 b 1 -238 0 -252 0 -242 b 148 -140 16 -177 73 -140 b 209 -148 167 -140 189 -142 b 215 -149 212 -148 215 -149 b 215 -149 215 -149 215 -149 l 215 -149 b 201 -136 215 -148 209 -142 l 157 -97 l 96 -41 b 17 34 21 24 17 29 b 17 37 17 36 17 36 b 17 38 17 37 17 38 b 25 56 17 44 17 44 b 110 298 81 131 110 219 b 46 474 110 367 88 431 b 38 491 40 480 38 487 b 49 505 38 498 42 502 "
        },
        rest8th: {
            x_min: 0,
            x_max: 349.8125,
            ha: 357,
            o: "m 88 302 b 103 303 93 302 98 303 b 202 224 149 303 191 270 b 205 199 204 216 205 208 b 178 129 205 173 196 147 l 175 126 l 182 127 b 307 249 236 142 284 190 b 313 259 308 254 311 258 b 329 267 317 265 323 267 b 349 247 340 267 349 259 b 201 -263 349 242 204 -258 b 182 -273 197 -270 190 -273 b 163 -260 174 -273 166 -269 b 161 -256 161 -259 161 -258 b 217 -59 161 -248 170 -220 b 272 129 247 43 272 127 b 272 129 272 129 272 129 b 264 122 272 129 268 126 b 140 80 227 94 183 80 b 36 115 102 80 65 91 b 0 194 10 136 0 165 b 88 302 0 244 32 292 "
        },
        rest16th: {
            x_min: 0,
            x_max: 450.53125,
            ha: 460,
            o: "m 189 302 b 204 303 193 302 198 303 b 303 224 250 303 292 270 b 306 199 304 216 306 208 b 279 129 306 173 296 147 l 276 126 l 281 127 b 408 249 337 142 385 190 b 412 259 409 254 412 258 b 430 267 417 265 423 267 b 450 247 441 267 450 259 b 200 -605 450 242 204 -599 b 182 -616 197 -612 190 -616 b 163 -602 174 -616 166 -610 b 161 -598 161 -601 161 -601 b 217 -402 161 -589 170 -562 b 272 -213 247 -298 272 -213 b 272 -213 272 -213 272 -213 b 264 -219 272 -213 268 -216 b 140 -262 227 -247 182 -262 b 36 -226 102 -262 65 -249 b 0 -145 12 -206 0 -176 b 17 -84 0 -124 5 -104 b 103 -38 38 -54 70 -38 b 191 -91 137 -38 172 -56 b 205 -141 201 -106 205 -124 b 178 -212 205 -167 196 -194 l 175 -215 l 182 -213 b 307 -93 236 -198 284 -151 b 372 129 308 -88 372 127 b 372 129 372 129 372 129 b 364 122 372 129 368 126 b 240 80 328 94 283 80 b 137 115 202 80 166 91 b 99 194 111 136 99 165 b 189 302 99 244 133 292 "
        },
        rest32nd: {
            x_min: 0,
            x_max: 551.25,
            ha: 563,
            o: "m 289 644 b 304 645 294 645 299 645 b 404 566 349 645 392 613 b 406 541 405 557 406 549 b 379 471 406 514 397 489 l 377 467 l 382 470 b 509 591 438 485 485 531 b 513 601 510 595 513 599 b 530 609 518 607 524 609 b 551 588 540 609 551 602 b 200 -605 551 584 204 -599 b 182 -616 197 -612 190 -616 b 163 -602 174 -616 166 -610 b 161 -598 161 -601 161 -601 b 217 -402 161 -589 170 -562 b 272 -213 247 -298 272 -213 b 272 -213 272 -213 272 -213 b 264 -219 272 -213 268 -216 b 140 -262 227 -247 182 -262 b 36 -226 102 -262 65 -249 b 0 -145 12 -206 0 -176 b 17 -84 0 -124 5 -104 b 103 -38 38 -54 70 -38 b 191 -91 137 -38 172 -56 b 205 -141 201 -106 205 -124 b 178 -212 205 -167 196 -194 l 175 -215 l 182 -213 b 307 -93 236 -198 284 -151 b 372 129 308 -88 372 127 b 372 129 372 129 372 129 b 364 122 372 129 368 126 b 240 80 328 94 283 80 b 137 115 202 80 166 91 b 99 195 112 136 99 165 b 118 256 99 217 106 238 b 204 303 138 287 171 303 b 292 249 238 303 273 285 b 306 199 302 234 306 217 b 279 129 306 173 296 148 l 276 126 l 281 127 b 408 248 336 142 385 190 b 473 470 409 254 473 469 b 473 470 473 470 473 470 b 465 464 473 470 469 467 b 341 421 428 435 383 421 b 236 458 303 421 266 433 b 200 537 212 478 200 508 b 289 644 200 585 234 635 "
        },
        rest64th: {
            x_min: -1.359375,
            x_max: 651.96875,
            ha: 665,
            o: "m 389 644 b 405 645 394 645 400 645 b 504 566 450 645 492 613 b 507 541 506 557 507 549 b 480 471 507 514 498 489 l 477 467 l 483 470 b 609 591 539 485 586 531 b 613 601 611 595 613 599 b 631 609 619 607 624 609 b 651 588 641 609 651 602 b 200 -946 651 584 204 -941 b 182 -957 197 -953 190 -957 b 163 -945 174 -957 166 -953 b 161 -939 161 -942 161 -942 b 217 -743 161 -931 170 -904 b 272 -555 247 -639 272 -555 b 272 -555 272 -555 272 -555 b 264 -560 272 -555 268 -557 b 140 -603 227 -589 182 -603 b 36 -567 102 -603 65 -592 b -1 -487 12 -548 -1 -517 b 17 -427 -1 -466 5 -445 b 103 -380 38 -395 70 -380 b 191 -433 137 -380 172 -398 b 205 -484 201 -448 205 -466 b 178 -553 205 -509 196 -535 l 175 -557 l 182 -555 b 307 -435 236 -539 284 -494 b 372 -213 308 -430 372 -215 b 372 -213 372 -213 372 -213 b 364 -219 372 -213 368 -216 b 240 -262 328 -247 283 -262 b 137 -226 202 -262 166 -249 b 99 -145 112 -206 99 -176 b 118 -84 99 -124 106 -104 b 204 -38 138 -54 171 -38 b 292 -91 238 -38 273 -56 b 306 -141 302 -106 306 -124 b 279 -212 306 -167 296 -194 l 276 -215 l 281 -213 b 408 -93 336 -198 385 -151 b 473 129 409 -88 473 127 b 473 129 473 129 473 129 b 465 122 473 129 469 126 b 341 80 428 94 383 80 b 236 115 303 80 266 91 b 200 195 213 136 200 165 b 217 256 200 217 206 238 b 304 303 239 287 272 303 b 393 249 338 303 374 285 b 406 199 402 234 406 217 b 379 129 406 173 397 148 l 377 126 l 382 127 b 509 248 436 142 485 190 b 574 470 510 254 574 469 b 574 470 574 470 574 470 b 566 464 574 470 570 467 b 442 421 529 435 484 421 b 337 458 404 421 367 433 b 300 537 313 478 300 508 b 389 644 300 585 334 635 "
        },
        rest128th: {
            x_min: -1.359375,
            x_max: 752.703125,
            ha: 768,
            o: "m 490 985 b 504 986 495 986 500 986 b 604 907 551 986 593 954 b 607 884 607 900 607 892 b 581 813 607 857 597 831 l 578 810 l 583 811 b 710 932 638 827 687 873 b 714 943 711 936 713 942 b 730 952 720 949 725 952 b 752 931 741 952 752 943 b 200 -946 752 927 204 -941 b 182 -957 197 -953 190 -957 b 163 -945 174 -957 166 -953 b 161 -939 161 -942 161 -942 b 217 -743 161 -931 170 -904 b 272 -555 247 -639 272 -555 b 272 -555 272 -555 272 -555 b 264 -560 272 -555 268 -557 b 140 -603 227 -589 182 -603 b 36 -567 102 -603 65 -592 b -1 -487 12 -548 -1 -517 b 17 -427 -1 -466 5 -445 b 103 -380 38 -395 70 -380 b 191 -433 137 -380 172 -398 b 205 -484 201 -448 205 -466 b 178 -553 205 -509 196 -535 l 175 -557 l 182 -555 b 307 -435 236 -539 284 -494 b 372 -213 308 -430 372 -215 b 372 -213 372 -213 372 -213 b 364 -219 372 -213 368 -216 b 240 -262 328 -247 283 -262 b 137 -226 202 -262 166 -249 b 99 -145 112 -206 99 -176 b 118 -84 99 -124 106 -104 b 204 -38 138 -54 171 -38 b 292 -91 238 -38 273 -56 b 306 -141 302 -106 306 -124 b 279 -212 306 -167 296 -194 l 276 -215 l 281 -213 b 408 -93 336 -198 385 -151 b 473 129 409 -88 473 127 b 473 129 473 129 473 129 b 465 122 473 129 469 126 b 341 80 428 94 383 80 b 236 115 303 80 266 91 b 200 195 213 136 200 165 b 217 256 200 217 206 238 b 304 303 239 287 272 303 b 393 249 338 303 374 285 b 406 199 402 234 406 217 b 379 129 406 173 397 148 l 377 126 l 382 127 b 509 248 436 142 485 190 b 574 470 510 254 574 469 b 574 470 574 470 574 470 b 566 464 574 470 570 467 b 442 421 529 435 484 421 b 337 458 404 421 367 433 b 300 538 314 477 300 508 b 318 598 300 559 306 580 b 404 645 340 630 372 645 b 494 592 439 645 475 627 b 507 541 502 577 507 559 b 480 471 507 516 498 489 l 477 467 l 483 470 b 608 589 537 485 586 531 b 675 811 611 595 675 810 b 675 811 675 811 675 811 b 666 806 675 811 671 809 b 543 763 628 777 585 763 b 438 799 504 763 468 775 b 401 878 412 820 401 849 b 490 985 401 928 434 977 "
        },
        dynamicPiano: {
            x_min: -53.078125,
            x_max: 513.140625,
            ha: 485,
            o: "m 185 383 b 196 384 187 383 191 384 b 277 334 230 384 259 365 b 288 301 281 324 288 306 b 288 297 288 298 288 297 b 294 302 289 297 291 299 b 394 370 323 338 367 367 b 404 371 398 370 401 371 b 510 272 453 371 498 328 b 513 237 513 262 513 251 b 507 172 513 217 511 192 b 326 -34 487 59 412 -26 b 314 -36 322 -36 318 -36 b 274 -24 298 -36 283 -31 l 265 -16 b 224 44 246 -1 232 20 b 223 49 224 47 223 49 b 223 49 223 49 223 49 b 149 -197 221 48 149 -194 b 149 -198 149 -197 149 -198 b 170 -210 149 -202 155 -205 b 187 -215 174 -210 175 -212 b 204 -231 201 -219 204 -222 b 197 -245 204 -240 202 -242 l 194 -248 l 76 -248 l -42 -248 l -46 -245 b -53 -231 -51 -242 -53 -240 b -35 -215 -53 -222 -49 -217 b -13 -210 -21 -212 -20 -212 b -6 -208 -10 -209 -8 -208 b 0 -206 -6 -208 -2 -206 b 25 -188 13 -201 21 -195 b 163 280 28 -183 163 276 b 166 291 163 283 164 287 b 167 302 167 295 167 299 b 155 324 167 315 161 324 b 155 324 155 324 155 324 b 65 230 125 322 85 280 b 53 215 61 217 58 215 b 51 215 53 215 51 215 b 42 224 46 215 42 217 b 57 263 42 231 47 244 b 140 360 77 305 104 337 b 152 370 144 365 149 369 b 185 383 157 376 172 381 m 374 306 b 366 308 371 308 368 308 b 300 273 348 308 321 294 b 284 254 288 262 287 259 b 280 242 283 249 281 245 b 257 169 279 240 270 213 l 236 98 l 236 93 b 251 48 238 77 243 61 b 279 27 258 37 272 27 b 281 27 279 27 280 27 b 291 31 281 27 287 30 b 396 170 334 52 378 109 b 406 247 402 197 406 224 b 401 277 406 259 405 270 b 374 306 397 290 383 303 "
        },
        dynamicMezzo: {
            x_min: 46.28125,
            x_max: 669.671875,
            ha: 563,
            o: "m 183 376 b 189 376 185 376 187 376 b 212 374 197 376 208 376 b 265 337 234 369 253 355 b 274 317 268 331 273 320 b 274 316 274 317 274 316 b 280 323 276 316 276 319 b 311 358 288 337 299 348 b 319 366 315 360 318 365 b 356 376 326 373 340 376 b 382 371 364 376 374 374 b 428 337 400 366 417 352 b 436 317 431 331 436 320 b 438 316 436 317 436 316 b 442 323 438 316 439 319 b 475 358 451 337 462 348 b 483 366 477 360 481 365 b 518 376 488 373 503 376 b 544 373 528 376 536 376 b 604 285 579 360 604 326 b 597 249 604 273 601 258 b 543 63 596 247 544 70 b 541 54 543 61 541 55 b 540 44 540 51 540 47 b 552 23 540 33 545 23 b 552 23 552 23 552 23 b 647 126 586 29 627 72 b 658 138 651 136 653 138 b 660 138 660 138 660 138 b 669 129 666 137 669 136 b 654 88 669 122 665 109 b 562 -12 631 43 602 9 l 549 -19 b 521 -27 540 -24 530 -27 b 447 30 490 -27 458 -4 b 443 58 445 38 443 48 b 450 93 443 72 446 84 b 504 278 453 97 504 272 b 507 288 506 283 506 287 b 509 298 507 292 509 295 b 491 326 509 310 502 320 b 487 327 490 327 488 327 b 479 324 484 327 483 326 b 441 270 462 316 443 288 b 435 249 441 265 436 254 b 398 127 434 248 419 195 b 362 4 379 61 362 5 b 328 -1 359 -1 362 -1 b 314 -1 323 -1 319 -1 b 302 -1 310 -1 306 -1 b 266 4 266 -1 269 -1 b 265 6 265 5 265 5 b 303 144 265 13 272 34 b 343 278 325 216 343 276 b 344 288 343 281 344 285 b 345 298 345 291 345 295 b 330 326 345 310 340 320 b 323 327 328 327 325 327 b 317 324 322 327 321 326 b 279 270 300 316 281 288 b 273 249 279 265 274 254 b 236 127 272 248 255 195 b 200 4 216 61 200 5 b 164 -1 197 -1 198 -1 b 151 -1 161 -1 156 -1 b 140 -1 147 -1 142 -1 b 103 4 104 -1 106 -1 b 103 6 103 5 103 5 b 141 144 103 13 108 34 b 181 278 161 216 179 276 b 182 288 181 281 181 285 b 183 298 182 291 183 295 b 168 324 183 310 178 320 b 160 327 166 326 163 327 b 141 320 156 327 151 324 b 69 230 112 305 85 272 b 57 215 65 217 62 215 b 55 215 57 215 55 215 b 46 224 49 215 46 217 b 59 260 46 231 50 242 b 151 363 81 306 112 341 b 161 369 155 365 160 367 b 183 376 166 371 174 374 "
        },
        dynamicForte: {
            x_min: -118.421875,
            x_max: 597.53125,
            ha: 381,
            o: "m 460 574 b 464 574 461 574 462 574 b 488 574 470 574 481 574 b 500 573 491 574 498 574 b 594 503 543 570 588 538 b 597 488 596 498 597 494 b 528 417 597 449 564 417 b 502 423 519 417 510 419 b 465 481 477 434 465 458 b 488 528 465 499 472 516 b 490 530 490 530 490 530 b 490 530 490 530 490 530 b 468 517 488 530 475 523 b 349 340 419 485 377 420 b 347 330 348 334 347 330 b 383 328 347 328 363 328 b 428 326 423 328 424 328 b 442 302 438 320 442 312 b 430 281 442 294 438 285 b 385 276 424 277 426 276 l 377 276 l 332 276 l 330 269 b 178 -117 303 126 250 -9 b 1 -249 129 -194 69 -237 b -20 -251 -6 -251 -13 -251 b -114 -187 -65 -251 -100 -227 b -118 -156 -117 -177 -118 -166 b -51 -84 -118 -116 -91 -84 b -31 -87 -46 -84 -39 -86 b 16 -152 0 -95 16 -124 b -12 -205 16 -173 8 -194 b -16 -208 -14 -206 -16 -208 b -14 -208 -16 -208 -14 -208 b -9 -206 -14 -208 -12 -208 b 74 -124 23 -197 54 -166 b 172 224 98 -79 125 22 b 185 276 178 252 183 274 b 185 276 185 276 185 276 b 141 276 185 276 181 276 b 91 280 96 276 96 276 b 77 302 83 285 77 294 b 91 326 77 312 83 320 b 148 328 95 328 96 328 l 198 330 l 202 341 b 460 574 249 473 351 566 "
        },
        dynamicRinforzando: {
            x_min: 78.9375,
            x_max: 485.921875,
            ha: 417,
            o: "m 362 378 b 378 380 367 380 372 380 b 472 348 415 380 453 367 b 485 315 481 338 485 327 b 462 273 485 298 477 281 b 439 267 454 269 446 267 b 398 290 424 267 409 274 b 344 319 385 309 364 319 b 281 269 315 319 289 301 b 279 262 280 266 279 262 b 276 256 279 260 277 258 b 274 249 276 254 274 251 b 238 127 273 248 257 192 b 201 4 217 61 201 5 b 166 -1 198 -1 200 -1 b 153 -1 163 -1 157 -1 b 141 -1 148 -1 144 -1 b 104 4 106 -1 107 -1 b 104 6 104 5 104 5 b 142 144 104 13 110 34 b 182 278 164 219 181 276 b 183 288 182 281 182 285 b 185 302 185 292 185 298 b 164 330 185 317 176 328 b 159 330 163 330 161 330 b 102 302 140 330 119 320 b 91 294 95 295 93 294 b 88 294 91 294 89 294 b 78 303 83 294 78 298 b 81 312 78 306 78 309 b 200 373 106 347 160 373 b 215 371 205 373 209 371 b 266 335 235 367 254 353 b 269 331 268 333 269 331 b 269 331 269 331 269 331 b 273 335 269 331 270 334 b 362 378 298 359 330 376 "
        },
        dynamicSforzando: {
            x_min: 70.78125,
            x_max: 378.390625,
            ha: 315,
            o: "m 246 373 b 254 373 249 373 251 373 b 372 324 303 373 360 351 b 378 302 377 317 378 309 b 338 251 378 278 362 255 b 328 249 334 249 332 249 b 283 294 303 249 283 270 b 288 315 283 301 284 308 b 289 319 289 317 289 319 b 289 319 289 319 289 319 b 283 320 289 320 287 320 b 270 322 279 322 274 322 b 206 288 242 322 215 308 b 206 283 206 287 206 285 b 257 223 206 267 230 238 b 284 206 272 213 277 210 b 351 90 328 173 351 130 b 340 47 351 74 348 59 b 205 -30 314 -2 264 -30 b 182 -29 198 -30 190 -30 b 84 15 147 -24 103 -5 b 70 48 74 24 70 36 b 108 99 70 70 85 94 b 121 102 112 101 117 102 b 167 56 147 102 167 80 b 159 31 167 48 164 40 l 156 26 l 157 26 b 190 20 167 22 178 20 b 220 26 201 20 212 22 b 258 65 243 34 258 51 b 257 70 258 66 258 69 b 204 126 249 94 234 109 b 114 258 148 158 114 209 b 125 302 114 273 118 288 b 246 373 147 342 193 370 "
        },
        dynamicZ: {
            x_min: 29.9375,
            x_max: 420.578125,
            ha: 371,
            o: "m 115 345 b 221 347 117 345 166 347 b 411 345 306 347 409 345 b 420 330 416 342 420 335 b 415 319 420 326 419 321 b 178 118 397 303 179 118 b 178 117 178 118 178 117 b 181 117 178 117 178 117 b 189 117 182 117 185 117 b 193 117 190 117 191 117 b 247 98 215 117 232 111 b 296 75 266 83 280 76 b 302 75 299 75 300 75 b 322 91 311 75 315 79 b 322 91 322 91 322 91 b 322 91 322 91 322 91 b 319 91 322 91 321 91 b 313 90 318 90 315 90 b 283 107 300 90 288 97 b 277 126 279 114 277 121 b 319 167 277 149 295 167 b 319 167 319 167 319 167 b 362 118 347 167 362 147 b 355 82 362 108 359 96 b 311 33 349 65 340 55 b 224 1 284 12 253 1 b 194 5 213 1 204 2 b 168 18 183 8 178 11 b 110 36 151 30 130 36 b 57 15 88 36 68 29 b 47 11 54 12 51 11 b 31 20 40 11 34 13 b 29 26 31 22 29 25 b 68 66 29 36 39 45 b 285 250 73 71 281 248 b 285 250 285 250 285 250 b 231 252 285 252 261 252 b 137 250 190 252 141 250 b 93 227 122 248 110 241 b 78 220 88 222 83 220 b 66 227 74 220 70 222 b 63 234 65 229 63 231 b 85 291 63 241 69 252 b 115 345 108 342 108 344 "
        },
        ornamentTrill: {
            x_min: -340.28125,
            x_max: 338.921875,
            ha: 346,
            o: "m -32 520 b -29 521 -31 520 -31 521 b -23 519 -27 521 -24 520 b -20 513 -21 517 -20 516 b -21 506 -20 512 -20 509 b -31 474 -23 502 -27 488 l -53 402 l -66 352 l -68 349 l -57 349 b -32 351 -51 349 -40 351 b 123 370 19 352 74 359 b 137 371 127 370 133 371 b 170 356 152 371 164 366 b 171 355 170 355 170 355 b 216 366 174 355 183 358 b 280 378 268 377 266 377 b 287 378 283 378 284 378 b 332 349 307 378 322 369 b 338 319 336 341 338 330 b 332 301 338 310 336 302 b 242 280 329 299 246 280 b 242 280 242 280 242 280 b 235 288 236 280 235 283 b 235 292 235 290 235 291 b 236 302 236 297 236 299 b 220 337 236 316 230 330 l 216 340 l 210 335 b 159 276 189 322 172 301 b 118 149 152 265 156 274 b 81 34 84 36 85 36 b -8 13 78 33 -4 13 b -8 13 -8 13 -8 13 b -14 20 -12 15 -14 15 b -8 44 -14 24 -12 31 b -2 66 -5 55 -2 65 b -2 66 -2 66 -2 66 l -2 66 b -43 41 -2 66 -21 55 b -114 4 -98 8 -98 8 b -144 0 -123 0 -134 0 b -242 99 -197 0 -242 43 b -242 109 -242 102 -242 105 b -212 219 -240 122 -242 116 b -185 312 -197 270 -185 312 l -185 312 b -189 312 -185 312 -186 312 b -259 312 -200 312 -227 312 b -321 310 -291 312 -310 310 b -334 312 -330 310 -334 312 b -340 319 -338 313 -340 316 b -336 326 -340 322 -338 324 b -291 337 -334 326 -314 331 l -247 347 l -210 348 b -172 348 -190 348 -172 348 b -168 363 -172 348 -171 355 b -145 442 -151 424 -145 441 b -133 452 -144 444 -140 446 l -77 489 b -32 520 -53 506 -32 520 m 57 334 b 53 335 55 335 54 335 b 44 334 50 335 49 335 b -70 316 8 326 -28 320 b -78 309 -78 316 -78 316 b -108 202 -80 305 -88 274 b -141 81 -136 112 -141 93 b -140 74 -141 79 -141 77 b -117 49 -137 59 -127 49 b -107 52 -114 49 -110 51 b 16 127 -106 54 14 126 b 42 217 16 127 42 215 b 49 241 42 222 44 229 b 73 320 53 251 73 317 b 57 334 73 327 65 333 "
        },
        ornamentTurn: {
            x_min: -423.3125,
            x_max: 421.9375,
            ha: 431,
            o: "m -262 197 b -247 197 -257 197 -253 197 b -118 162 -210 197 -163 184 b 40 45 -61 134 -13 98 b 277 -95 119 -33 200 -81 b 289 -97 281 -97 285 -97 b 378 0 332 -97 371 -55 b 378 11 378 4 378 6 b 302 83 378 55 345 83 b 242 66 283 83 262 77 b 208 56 231 59 219 56 b 148 120 175 56 148 81 b 201 186 148 151 164 172 b 261 198 220 194 240 198 b 420 45 341 198 411 136 b 421 22 421 37 421 29 b 245 -199 421 -93 338 -199 b 238 -198 243 -199 240 -199 b -44 -47 148 -194 50 -141 b -250 86 -114 22 -183 66 b -295 94 -270 91 -283 94 b -315 91 -302 94 -307 94 b -381 4 -356 81 -381 43 b -355 -56 -381 -18 -372 -40 b -298 -81 -338 -73 -319 -81 b -246 -68 -283 -81 -265 -77 b -212 -58 -234 -61 -223 -58 b -178 -69 -200 -58 -189 -62 b -151 -122 -160 -81 -151 -101 b -171 -167 -151 -138 -157 -155 b -239 -195 -185 -181 -213 -192 b -257 -197 -245 -197 -250 -197 b -423 -5 -352 -197 -423 -109 b -412 65 -423 16 -419 40 b -262 197 -389 137 -329 188 "
        },
        ornamentTurnSlash: {
            x_min: -423.3125,
            x_max: 421.9375,
            ha: 431,
            o: "m -10 276 b -2 277 -8 277 -5 277 b 17 265 5 277 13 273 b 19 163 19 260 19 260 l 19 68 l 39 45 b 277 -95 122 -34 200 -81 b 289 -97 281 -97 285 -97 b 378 0 332 -97 371 -54 b 378 11 378 4 378 6 b 302 83 378 55 345 83 b 242 66 283 83 262 77 b 208 56 231 59 219 56 b 148 120 175 56 148 81 b 200 186 148 151 164 172 b 261 198 220 194 240 198 b 420 45 341 198 411 137 b 421 22 421 37 421 29 b 257 -198 421 -86 347 -188 b 242 -198 251 -198 247 -198 b 20 -105 181 -198 95 -163 l 19 -104 l 19 -183 b 19 -216 19 -195 19 -206 b 12 -273 19 -272 17 -267 b -2 -278 8 -277 2 -278 b -21 -266 -10 -278 -19 -274 b -23 -165 -23 -263 -23 -262 l -23 -69 l -44 -47 b -250 86 -117 23 -183 66 b -295 94 -270 93 -284 94 b -315 91 -302 94 -308 94 b -381 5 -356 81 -381 43 b -355 -56 -381 -16 -372 -40 b -299 -81 -338 -73 -319 -81 b -246 -68 -283 -81 -265 -77 b -212 -58 -234 -61 -223 -58 b -168 -77 -196 -58 -179 -65 b -151 -122 -156 -90 -151 -105 b -179 -174 -151 -141 -160 -162 b -239 -195 -194 -184 -217 -192 b -257 -197 -245 -195 -250 -197 b -423 -5 -349 -197 -423 -113 b -423 0 -423 -4 -423 -1 b -277 194 -420 97 -362 173 b -247 197 -268 197 -258 197 b -24 104 -185 197 -100 162 l -23 102 l -23 181 b -21 265 -23 260 -23 260 b -10 276 -20 269 -14 274 "
        },
        ornamentMordent: {
            x_min: -402.890625,
            x_max: 401.53125,
            ha: 410,
            o: "m -10 273 b -4 274 -9 273 -6 274 b 16 262 4 274 12 269 b 17 158 17 259 17 259 l 17 56 l 62 112 b 117 174 110 172 110 172 b 122 174 118 174 119 174 b 132 173 125 174 129 173 b 295 11 134 172 171 134 l 307 -1 l 336 34 b 374 76 366 72 368 74 b 381 77 375 77 378 77 b 401 56 392 77 401 68 b 400 48 401 54 401 51 b 223 -172 397 41 230 -166 b 210 -176 220 -174 215 -176 b 201 -174 206 -176 204 -176 b 112 -87 198 -173 178 -152 b 27 0 65 -38 27 0 b 21 -6 27 0 24 -2 l 17 -12 l 17 -147 b 17 -210 17 -173 17 -194 b 10 -292 17 -297 16 -287 b -2 -299 6 -297 2 -299 b -21 -287 -10 -299 -19 -295 b -24 -174 -23 -284 -23 -284 l -24 -63 l -66 -117 b -121 -176 -110 -170 -114 -176 b -125 -176 -122 -176 -123 -176 b -296 -12 -134 -174 -125 -184 l -308 0 l -337 -34 b -375 -77 -367 -73 -370 -76 b -382 -79 -377 -79 -379 -79 b -402 -58 -393 -79 -402 -69 b -401 -49 -402 -55 -402 -52 b -224 170 -398 -43 -231 165 b -212 174 -221 173 -216 174 b -202 173 -208 174 -205 174 b -39 11 -200 172 -151 122 l -28 -1 l -25 1 l -24 4 l -24 130 b -23 260 -24 256 -24 258 b -10 273 -20 266 -16 270 "
        },
        ornamentShortTrill: {
            x_min: -402.890625,
            x_max: 401.53125,
            ha: 410,
            o: "m -219 173 b -213 174 -217 174 -215 174 b -202 173 -209 174 -205 173 b -114 86 -200 172 -179 151 b -28 0 -66 37 -28 0 b 40 84 -28 0 2 37 b 117 174 111 173 110 172 b 122 174 118 174 119 174 b 132 173 125 174 129 173 b 295 11 134 172 171 134 l 307 -1 l 336 34 b 374 76 366 72 368 74 b 381 77 375 77 378 77 b 401 56 392 77 401 68 b 400 48 401 54 401 51 b 223 -172 397 41 230 -166 b 210 -176 220 -174 215 -176 b 201 -174 206 -176 204 -176 b 112 -87 198 -173 178 -152 b 27 0 65 -38 27 0 b -42 -86 27 0 -4 -38 b -118 -174 -112 -174 -111 -173 b -123 -176 -119 -176 -121 -176 b -133 -174 -126 -176 -130 -174 b -296 -12 -136 -173 -172 -137 l -308 0 l -337 -34 b -375 -77 -367 -73 -370 -76 b -382 -79 -377 -79 -379 -79 b -402 -58 -393 -79 -402 -69 b -401 -49 -402 -55 -402 -52 b -224 172 -398 -43 -228 167 b -219 173 -223 172 -220 173 "
        },
        ornamentTremblement: {
            x_min: -571.671875,
            x_max: 570.3125,
            ha: 582,
            o: "m -386 173 b -381 174 -385 174 -383 174 b -370 173 -377 174 -372 173 b -281 86 -367 172 -347 151 b -196 0 -235 37 -196 0 b -126 84 -196 0 -164 37 b -50 174 -55 173 -57 172 b -44 174 -49 174 -47 174 b -35 173 -42 174 -38 173 b 53 86 -32 172 -12 151 b 138 0 100 37 138 0 b 208 84 140 0 170 37 b 284 174 279 173 277 172 b 289 174 285 174 288 174 b 299 173 294 174 298 173 b 462 11 303 172 338 134 l 475 -1 l 503 34 b 541 76 534 72 536 74 b 548 77 544 77 545 77 b 570 56 560 77 570 68 b 567 48 570 54 568 51 b 392 -172 564 41 397 -166 b 378 -176 387 -174 382 -176 b 368 -174 374 -176 371 -176 b 280 -87 367 -173 345 -152 b 194 0 234 -38 194 0 b 125 -86 194 0 163 -38 b 49 -174 54 -174 55 -173 b 43 -176 47 -176 46 -176 b 34 -174 40 -176 36 -174 b -54 -87 31 -173 10 -152 b -140 0 -102 -38 -140 0 b -209 -86 -141 0 -171 -38 b -285 -174 -280 -174 -279 -173 b -291 -176 -287 -176 -289 -176 b -300 -174 -295 -176 -299 -174 b -464 -12 -304 -173 -340 -137 l -476 0 l -504 -34 b -543 -77 -534 -73 -537 -76 b -549 -79 -545 -79 -547 -79 b -571 -58 -562 -79 -571 -69 b -568 -49 -571 -55 -570 -52 b -392 172 -566 -43 -396 167 b -386 173 -390 172 -387 173 "
        },
        ornamentPrecompAppoggTrill: {
            x_min: -571.671875,
            x_max: 570.3125,
            ha: 582,
            o: "m -559 351 b -551 352 -556 352 -553 352 b -530 338 -543 352 -533 348 b -529 169 -530 337 -529 291 l -529 1 l -507 27 l -441 112 b -382 174 -394 169 -390 174 b -378 174 -381 174 -379 174 b -281 86 -370 174 -375 179 b -196 0 -234 37 -196 0 b -126 84 -196 0 -164 37 b -50 174 -55 173 -57 172 b -44 174 -49 174 -47 174 b -35 173 -42 174 -38 173 b 53 86 -32 172 -12 151 b 138 0 100 37 138 0 b 208 84 140 0 170 37 b 284 174 279 173 279 172 b 289 174 285 174 288 174 b 300 173 294 174 298 173 b 462 11 303 172 340 134 l 475 -1 l 503 34 b 541 76 534 72 536 74 b 548 77 544 77 545 77 b 570 56 560 77 570 68 b 567 48 570 54 568 51 b 392 -172 564 41 397 -166 b 378 -176 387 -174 382 -176 b 368 -174 375 -176 371 -176 b 280 -87 367 -173 347 -152 b 194 0 234 -38 194 0 b 126 -86 194 0 163 -38 b 49 -174 54 -174 55 -173 b 44 -176 47 -176 46 -176 b 34 -174 40 -176 36 -174 b -54 -87 31 -173 10 -152 b -140 0 -102 -38 -140 0 b -209 -86 -140 0 -171 -38 b -285 -174 -280 -174 -279 -173 b -291 -176 -287 -176 -288 -176 b -300 -174 -294 -176 -298 -174 b -464 -11 -303 -173 -374 -102 l -476 0 l -506 -37 b -539 -76 -528 -65 -537 -74 b -551 -80 -543 -79 -547 -80 b -570 -68 -558 -80 -566 -76 l -571 -65 l -571 136 b -570 340 -571 331 -571 337 b -559 351 -568 344 -564 348 "
        },
        ornamentPrecompSlideTrillDAnglebert: {
            x_min: -590.71875,
            x_max: 589.359375,
            ha: 601,
            o: "m -367 173 b -362 174 -366 174 -364 174 b -351 173 -357 174 -353 173 b -262 86 -348 172 -328 151 b -176 0 -216 37 -176 0 b -107 84 -176 0 -145 37 b -31 174 -36 173 -38 172 b -25 174 -29 174 -28 174 b -16 173 -23 174 -19 173 b 72 86 -13 172 6 151 b 157 0 119 37 157 0 b 227 84 159 0 189 37 b 303 174 298 173 296 172 b 308 174 304 174 307 174 b 318 173 313 174 317 173 b 481 11 322 172 357 134 l 494 -1 l 522 34 b 560 76 553 72 555 74 b 567 77 563 77 564 77 b 589 56 579 77 589 68 b 586 48 589 54 588 51 b 411 -172 583 41 416 -166 b 397 -176 406 -174 401 -176 b 387 -174 393 -176 390 -176 b 299 -87 386 -173 366 -152 b 213 0 253 -38 213 0 b 144 -86 213 0 182 -38 b 68 -174 73 -174 74 -173 b 62 -176 66 -176 65 -176 b 53 -174 59 -176 55 -174 b -35 -87 50 -173 29 -152 b -121 0 -83 -38 -121 0 b -190 -86 -122 0 -152 -38 b -266 -174 -261 -174 -259 -173 b -272 -176 -268 -176 -270 -176 b -281 -174 -276 -176 -280 -174 b -371 -86 -284 -173 -304 -152 b -457 0 -417 -38 -457 0 l -457 0 b -477 -26 -457 0 -470 -16 b -548 -227 -524 -88 -548 -161 b -536 -303 -548 -254 -544 -280 b -533 -317 -534 -309 -533 -313 b -553 -338 -533 -330 -541 -338 b -577 -315 -566 -338 -571 -333 b -590 -227 -586 -287 -590 -258 b -518 -9 -590 -154 -564 -77 b -465 56 -509 2 -504 8 l -402 134 b -367 173 -375 169 -372 172 "
        },
        ornamentPrecompSlideTrillBach: {
            x_min: -590.71875,
            x_max: 589.359375,
            ha: 601,
            o: "m 175 273 b 182 274 178 273 181 274 b 202 262 190 274 198 269 b 204 158 204 259 204 259 l 204 56 l 250 112 b 303 174 296 172 298 172 b 308 174 304 174 307 174 b 318 173 313 174 317 173 b 481 11 322 172 357 134 l 494 -1 l 522 34 b 560 76 553 72 555 74 b 567 77 563 77 564 77 b 589 56 579 77 589 68 b 586 48 589 54 588 51 b 411 -172 583 41 416 -166 b 397 -176 406 -174 401 -176 b 387 -174 393 -176 390 -176 b 299 -87 386 -173 366 -152 b 213 0 253 -38 213 0 b 208 -6 213 0 210 -2 l 204 -12 l 204 -147 b 204 -210 204 -173 204 -194 b 198 -292 204 -297 204 -287 b 183 -299 194 -297 189 -299 b 164 -287 175 -299 167 -295 b 163 -174 163 -284 163 -284 l 161 -63 l 119 -117 b 65 -176 76 -170 73 -176 b 61 -176 63 -176 62 -176 b -35 -87 51 -174 57 -180 b -121 0 -83 -38 -121 0 b -190 -86 -122 0 -152 -38 b -266 -174 -261 -174 -259 -173 b -272 -176 -268 -176 -270 -176 b -281 -174 -276 -176 -280 -174 b -371 -86 -284 -173 -304 -152 b -457 0 -417 -38 -457 0 l -457 0 b -477 -26 -457 0 -470 -16 b -548 -227 -524 -88 -548 -161 b -536 -303 -548 -254 -544 -280 b -533 -317 -534 -309 -533 -313 b -553 -338 -533 -330 -541 -338 b -577 -315 -566 -338 -571 -333 b -590 -227 -586 -287 -590 -258 b -518 -9 -590 -154 -564 -77 b -465 56 -509 2 -504 8 l -402 134 b -363 174 -374 170 -371 174 b -359 174 -362 174 -360 174 b -262 86 -351 174 -356 179 b -176 0 -216 37 -176 0 b -107 84 -176 0 -145 37 b -31 174 -36 173 -38 172 b -25 174 -29 174 -28 174 b -16 173 -23 174 -19 173 b 147 11 -13 172 35 123 l 157 -1 l 160 1 l 163 4 l 163 130 b 164 260 163 256 163 258 b 175 273 166 266 170 270 "
        },
        ornamentPrecompTrillSuffixDandrieu: {
            x_min: -590.71875,
            x_max: 589.359375,
            ha: 601,
            o: "m 544 335 b 553 337 548 337 551 337 b 575 313 563 337 570 330 b 589 226 583 285 589 256 b 517 8 589 152 563 76 b 464 -58 507 -4 503 -9 l 401 -136 b 362 -176 372 -172 370 -176 b 357 -176 360 -176 359 -176 b 261 -87 349 -174 355 -180 b 175 0 215 -38 175 0 b 106 -86 175 0 144 -38 b 29 -174 35 -174 36 -173 b 24 -176 28 -176 27 -176 b 14 -174 21 -176 17 -174 b -73 -87 12 -173 -8 -152 b -159 0 -121 -38 -159 0 b -228 -86 -160 0 -190 -38 b -304 -174 -299 -174 -298 -173 b -310 -176 -306 -176 -308 -176 b -319 -174 -314 -176 -318 -174 b -483 -12 -323 -173 -359 -137 l -495 0 l -524 -34 b -562 -77 -553 -73 -556 -76 b -568 -79 -564 -79 -566 -79 b -590 -58 -581 -79 -590 -69 b -588 -49 -590 -55 -589 -52 b -412 170 -585 -43 -417 165 b -398 174 -408 173 -402 174 b -389 173 -394 174 -392 174 b -300 86 -387 172 -366 151 b -215 -1 -254 37 -215 -1 b -145 84 -215 -1 -183 37 b -69 173 -74 173 -76 172 b -63 174 -68 174 -66 174 b -54 173 -61 174 -57 173 b 34 86 -51 172 -31 151 b 119 -1 81 37 119 -1 b 189 84 121 -1 151 37 b 265 173 259 173 258 172 b 270 174 266 174 269 174 b 280 173 274 174 279 173 b 370 84 283 172 303 151 b 455 -1 416 37 455 -1 l 455 -1 b 476 24 455 -1 469 15 b 547 226 522 87 547 159 b 534 302 547 252 543 278 b 532 317 533 308 532 313 b 544 335 532 326 536 333 "
        },
        ornamentPrecompDoubleCadenceUpperPrefix: {
            x_min: -597.53125,
            x_max: 596.171875,
            ha: 608,
            o: "m -533 324 b -525 327 -530 326 -528 327 b -504 305 -514 327 -504 317 b -504 305 -504 305 -504 305 b -513 284 -504 299 -504 299 b -556 112 -541 226 -556 167 b -545 33 -556 84 -552 58 b -524 -20 -541 15 -532 -9 l -522 -23 l -491 15 l -413 111 b -355 174 -367 169 -363 174 b -351 174 -353 174 -352 174 b -254 86 -343 174 -348 179 b -168 -1 -208 37 -168 -1 b -100 84 -168 -1 -137 37 b -23 173 -28 173 -29 172 b -19 174 -21 174 -20 174 b -8 173 -14 174 -10 173 b 80 86 -5 172 13 151 b 166 -1 127 37 166 -1 b 235 84 166 -1 197 37 b 311 173 306 173 304 172 b 317 174 313 174 314 174 b 326 173 319 174 323 173 b 490 11 329 172 366 134 l 502 -1 l 530 34 b 568 76 560 72 563 74 b 575 77 570 77 573 77 b 596 56 586 77 596 68 b 594 48 596 54 596 51 b 417 -172 592 41 424 -166 b 405 -176 415 -174 409 -176 b 396 -174 401 -176 398 -176 b 307 -87 393 -173 372 -152 b 221 -1 259 -38 221 -1 b 152 -86 221 -1 190 -38 b 76 -176 81 -174 83 -173 b 70 -176 74 -176 73 -176 b 61 -174 66 -176 62 -174 b -27 -87 58 -173 38 -152 b -114 -1 -74 -38 -112 -1 b -182 -86 -114 -1 -145 -38 b -258 -176 -253 -174 -253 -173 b -264 -176 -259 -176 -262 -176 b -274 -174 -268 -176 -272 -174 b -438 -11 -277 -173 -348 -102 l -449 0 l -479 -37 b -524 -80 -513 -80 -514 -80 l -524 -80 b -553 -52 -534 -80 -540 -74 b -597 109 -583 -8 -597 48 b -560 280 -597 165 -585 224 b -533 324 -548 310 -540 322 "
        },
        ornamentPrecompDoubleCadenceUpperPrefixTurn: {
            x_min: -597.53125,
            x_max: 596.171875,
            ha: 608,
            o: "m -533 324 b -525 327 -530 326 -528 327 b -504 305 -514 327 -504 317 b -504 305 -504 305 -504 305 b -513 284 -504 299 -504 299 b -556 112 -541 226 -556 167 b -545 33 -556 84 -552 58 b -524 -20 -541 15 -532 -9 l -522 -23 l -491 15 l -413 111 b -355 174 -367 169 -363 174 b -351 174 -353 174 -352 174 b -254 86 -343 174 -348 179 b -168 -1 -208 37 -168 -1 b -100 84 -168 -1 -137 37 b -23 173 -28 173 -29 172 b -19 174 -21 174 -20 174 b -8 173 -14 174 -10 173 b 155 11 -5 172 43 123 l 166 -1 l 168 1 l 170 4 l 170 130 b 171 260 170 256 170 258 b 191 274 175 269 183 274 b 205 267 196 274 201 272 b 212 158 212 262 210 273 l 212 56 l 257 112 b 311 173 304 172 304 172 b 317 174 313 174 314 174 b 326 173 319 174 323 173 b 490 11 329 172 366 134 l 502 -1 l 530 34 b 568 76 560 72 563 74 b 575 77 570 77 573 77 b 596 56 586 77 596 68 b 594 48 596 54 596 51 b 417 -172 592 41 424 -166 b 405 -176 415 -174 409 -176 b 396 -174 401 -176 398 -176 b 307 -87 393 -173 372 -152 b 221 -1 259 -38 221 -1 b 216 -6 221 -1 219 -2 l 212 -12 l 212 -147 b 212 -210 212 -173 212 -194 b 205 -292 212 -297 210 -287 b 191 -299 201 -297 196 -299 b 172 -287 183 -299 175 -295 b 170 -174 171 -284 171 -284 l 170 -63 l 127 -117 b 73 -176 84 -170 80 -176 b 68 -176 72 -176 70 -176 b -27 -87 59 -174 65 -180 b -114 0 -74 -38 -112 0 b -182 -86 -114 0 -145 -38 b -258 -174 -253 -174 -253 -173 b -264 -176 -259 -176 -262 -176 b -274 -174 -268 -176 -272 -174 b -438 -11 -277 -173 -348 -102 l -449 0 l -479 -37 b -524 -80 -513 -80 -514 -80 l -524 -80 b -553 -52 -534 -80 -540 -74 b -597 109 -583 -8 -597 48 b -560 280 -597 165 -585 224 b -533 324 -548 310 -540 322 "
        },
        ornamentPrecompTrillLowerSuffix: {
            x_min: -597.53125,
            x_max: 596.171875,
            ha: 608,
            o: "m -413 173 b -408 174 -412 174 -409 174 b -397 173 -404 174 -400 173 b -308 86 -394 172 -374 151 b -223 0 -261 37 -223 0 b -153 84 -223 0 -191 37 b -77 174 -83 173 -84 172 b -72 174 -76 174 -74 174 b -62 173 -68 174 -63 173 b 25 86 -59 172 -39 151 b 112 0 73 37 111 0 b 181 84 112 0 144 37 b 257 174 251 173 251 172 b 262 174 258 174 261 174 b 273 173 266 174 270 173 b 436 9 276 172 347 101 l 447 -1 l 477 36 b 522 79 511 79 513 79 l 522 79 b 552 51 533 79 539 73 b 596 -112 582 6 596 -51 b 567 -262 596 -161 586 -213 b 539 -322 558 -287 544 -316 b 524 -327 534 -326 529 -327 b 504 -315 515 -327 507 -323 b 503 -308 503 -312 503 -309 b 511 -285 503 -302 504 -297 b 555 -113 540 -227 555 -169 b 544 -34 555 -86 551 -59 b 522 19 540 -16 530 8 l 521 22 l 481 -26 l 405 -122 b 353 -176 366 -172 362 -176 b 349 -176 352 -176 351 -176 b 253 -87 341 -176 347 -180 b 167 0 206 -38 167 0 b 99 -86 167 0 136 -38 b 21 -174 27 -174 28 -173 b 17 -176 20 -176 19 -176 b 6 -174 13 -176 9 -174 b -81 -87 4 -173 -14 -152 b -167 0 -129 -38 -167 0 b -236 -86 -167 0 -198 -38 b -313 -174 -307 -174 -306 -173 b -318 -176 -314 -176 -315 -176 b -328 -174 -321 -176 -325 -174 b -491 -12 -330 -173 -367 -137 l -503 0 l -530 -34 b -570 -77 -562 -73 -564 -76 b -577 -79 -571 -79 -574 -79 b -597 -58 -588 -79 -597 -69 b -596 -49 -597 -55 -597 -52 b -417 172 -593 -43 -423 167 b -413 173 -417 172 -415 173 "
        },
        stringsDownBow: {
            x_min: -149.71875,
            x_max: 148.359375,
            ha: 151,
            o: "m -9 215 b 0 217 -6 217 -4 217 b 19 205 8 217 14 213 b 20 142 20 202 20 201 l 20 84 l 23 84 b 144 -27 81 74 129 30 b 148 -66 147 -40 148 -54 b 36 -213 148 -134 103 -197 b 0 -219 24 -217 12 -219 b -145 -104 -68 -219 -129 -173 b -149 -68 -148 -91 -149 -79 b -24 84 -149 6 -98 74 l -21 84 l -21 142 b -19 205 -20 201 -20 202 b -9 215 -17 209 -13 213 m -21 -15 b -23 41 -21 37 -21 41 b -23 41 -23 41 -23 41 b -76 11 -35 40 -62 26 b -108 -65 -98 -11 -108 -38 b -1 -176 -108 -122 -65 -176 b 107 -65 63 -176 107 -122 b 74 11 107 -38 96 -11 b 20 41 61 26 32 41 b 20 -15 20 41 20 15 b 19 -74 20 -72 20 -72 b 0 -87 14 -83 6 -87 b -19 -74 -8 -87 -16 -83 b -21 -15 -20 -72 -20 -72 "
        },
        stringsUpBow: {
            x_min: -149.71875,
            x_max: 148.359375,
            ha: 151,
            o: "m -137 381 b -130 383 -134 383 -133 383 b -111 371 -122 383 -114 378 b -55 224 -110 370 -85 305 b 0 80 -25 145 -1 80 b 54 224 0 80 24 145 b 112 377 114 384 110 373 b 127 384 118 381 122 384 b 148 362 138 384 148 374 l 148 356 l 83 183 b 16 9 47 88 17 11 b -1 0 12 2 5 0 b -14 5 -5 0 -10 1 b -84 183 -19 9 -13 -6 l -149 356 l -149 362 b -137 381 -149 371 -145 378 "
        },
        stringsHarmonic: {
            x_min: -122.5,
            x_max: 121.140625,
            ha: 124,
            o: "m -16 145 b 0 147 -10 147 -5 147 b 121 -1 66 147 121 77 b 114 -49 121 -16 118 -33 b -1 -148 95 -112 47 -148 b -85 -106 -31 -148 -61 -134 b -122 -1 -110 -76 -122 -38 b -16 145 -122 68 -81 134 m 12 111 b 0 113 8 113 4 113 b -68 22 -29 113 -61 73 b -70 0 -69 15 -70 6 b -13 -113 -70 -49 -47 -98 b -1 -115 -9 -115 -5 -115 b 63 -40 24 -115 53 -83 b 68 -1 66 -27 68 -15 b 12 111 68 48 46 97 "
        },
        pluckedSnapPizzicatoAbove: {
            x_min: -149.71875,
            x_max: 148.359375,
            ha: 151,
            o: "m -9 215 b 0 217 -6 217 -4 217 b 19 205 8 217 14 213 b 20 142 20 202 20 201 l 20 84 l 23 84 b 144 -27 81 74 129 30 b 148 -66 147 -40 148 -54 b 36 -213 148 -134 103 -197 b 0 -219 24 -217 12 -219 b -145 -104 -68 -219 -129 -173 b -149 -68 -148 -91 -149 -79 b -24 84 -149 6 -98 74 l -21 84 l -21 142 b -19 205 -20 201 -20 202 b -9 215 -17 209 -13 213 m -21 -15 b -23 41 -21 37 -21 41 b -23 41 -23 41 -23 41 b -76 11 -35 40 -62 26 b -108 -65 -98 -11 -108 -38 b -1 -176 -108 -122 -65 -176 b 107 -65 63 -176 107 -122 b 74 11 107 -38 96 -11 b 20 41 61 26 32 41 b 20 -15 20 41 20 15 b 19 -74 20 -72 20 -72 b 0 -87 14 -83 6 -87 b -19 -74 -8 -87 -16 -83 b -21 -15 -20 -72 -20 -72 "
        },
        pluckedSnapPizzicatoBelow: {
            x_min: -149.71875,
            x_max: 148.359375,
            ha: 151,
            o: "m -9 215 b 0 217 -6 217 -4 217 b 19 205 8 217 14 213 b 20 142 20 202 20 201 l 20 84 l 23 84 b 144 -27 81 74 129 30 b 148 -66 147 -40 148 -54 b 36 -213 148 -134 103 -197 b 0 -219 24 -217 12 -219 b -145 -104 -68 -219 -129 -173 b -149 -68 -148 -91 -149 -79 b -24 84 -149 6 -98 74 l -21 84 l -21 142 b -19 205 -20 201 -20 202 b -9 215 -17 209 -13 213 m -21 -15 b -23 41 -21 37 -21 41 b -23 41 -23 41 -23 41 b -76 11 -35 40 -62 26 b -108 -65 -98 -11 -108 -38 b -1 -176 -108 -122 -65 -176 b 107 -65 63 -176 107 -122 b 74 11 107 -38 96 -11 b 20 41 61 26 32 41 b 20 -15 20 41 20 15 b 19 -74 20 -72 20 -72 b 0 -87 14 -83 6 -87 b -19 -74 -8 -87 -16 -83 b -21 -15 -20 -72 -20 -72 "
        },
        pluckedLeftHandPizzicato: {
            x_min: 0,
            x_max: 319.859375,
            ha: 326,
            o: "m 149 508 b 159 509 152 509 155 509 b 186 494 170 509 181 503 b 190 440 190 487 190 488 l 190 430 l 190 377 l 242 377 l 251 377 b 303 373 298 377 296 377 b 319 345 314 367 319 356 b 304 319 319 335 314 324 b 250 315 296 315 299 315 l 242 315 l 190 315 l 190 262 l 190 252 b 186 198 190 204 190 205 b 159 183 179 188 170 183 b 132 198 148 183 138 188 b 127 252 127 205 127 204 l 127 262 l 127 315 l 76 315 l 68 315 b 14 319 20 315 21 315 b 0 347 4 324 0 335 b 14 373 0 356 4 367 b 68 377 21 377 20 377 l 76 377 l 127 377 l 127 430 l 127 440 b 132 494 127 488 127 487 b 149 508 136 501 142 505 "
        },
        keyboardPedalPed: {
            x_min: -1.359375,
            x_max: 1064.390625,
            ha: 1086,
            o: "m 296 692 b 314 694 302 694 307 694 b 386 685 337 694 366 689 b 548 498 480 660 548 580 b 548 481 548 492 548 487 b 455 395 541 426 499 395 b 370 462 420 395 383 417 b 362 496 364 477 362 488 b 377 514 362 509 367 514 b 393 501 386 514 390 510 b 432 474 397 484 413 474 b 470 487 445 474 458 478 b 491 530 484 496 491 510 b 490 544 491 534 491 539 b 333 660 479 606 411 657 l 323 662 l 315 646 b 269 524 285 591 269 556 b 321 431 269 492 287 466 b 349 395 338 413 343 408 b 363 342 359 378 363 362 b 359 312 363 333 362 322 b 285 158 348 266 318 206 b 281 152 283 155 281 152 b 281 152 281 152 281 152 b 287 154 283 152 284 152 b 318 155 298 154 308 155 b 461 98 371 155 419 136 l 464 97 l 483 112 b 503 129 494 120 503 127 b 504 130 503 129 504 129 b 503 138 504 131 503 134 b 500 180 500 152 500 166 b 553 326 500 238 518 288 b 604 366 560 331 592 358 b 649 381 617 376 632 381 b 696 362 665 381 681 374 b 724 302 714 347 724 324 b 695 238 724 278 714 255 b 660 210 691 234 662 212 b 579 148 658 209 582 151 b 579 148 579 148 579 148 b 596 106 579 144 589 119 b 622 77 604 88 609 83 b 657 69 632 72 645 69 b 748 112 688 69 721 84 b 755 123 754 117 755 120 b 755 127 755 124 755 126 b 751 165 752 137 751 151 b 758 219 751 183 754 202 b 894 387 774 290 820 347 b 896 390 896 388 896 388 b 891 398 896 391 895 392 b 622 560 827 477 730 535 b 600 580 605 564 600 569 b 617 596 600 591 607 596 b 628 595 622 596 624 596 b 1057 248 846 552 1020 412 b 1064 191 1061 229 1064 209 b 922 0 1064 94 1005 9 b 902 -1 916 -1 909 -1 b 774 76 847 -1 800 26 b 769 83 770 81 770 83 b 769 81 769 83 769 83 b 627 -1 733 29 677 -1 b 548 27 597 -1 570 8 b 515 88 537 37 525 61 l 513 95 l 510 93 l 453 45 b 390 0 396 0 396 0 b 390 0 390 0 390 0 b 374 15 381 0 377 4 b 268 105 359 69 314 105 b 250 104 262 105 257 105 l 243 102 l 234 90 b 155 1 201 49 159 2 b 147 -1 152 0 149 -1 b 130 15 138 -1 130 6 b 132 20 130 18 132 19 b 136 31 133 22 134 27 b 220 131 149 74 178 109 b 231 137 225 134 230 136 b 302 278 280 202 302 244 b 265 335 302 299 295 309 b 209 442 234 363 213 402 b 209 455 209 446 209 451 b 279 648 209 502 232 564 l 285 659 l 283 659 b 176 627 238 653 210 645 b 57 477 111 594 66 538 b 55 459 55 471 55 464 b 72 409 55 437 61 415 b 93 403 78 405 87 403 b 152 467 123 403 151 431 b 168 488 153 483 157 488 b 185 462 181 488 185 483 l 185 460 b 137 344 183 409 168 369 b 78 322 119 328 98 322 b 13 360 50 322 25 335 b -1 426 4 380 -1 402 b 89 610 -1 488 32 559 b 296 692 147 659 210 685 m 926 348 b 921 353 924 351 922 353 b 914 348 920 353 918 351 b 823 167 857 306 823 237 b 828 124 823 154 826 138 b 890 31 837 79 862 40 b 896 31 892 31 894 31 b 956 104 916 31 940 59 b 970 191 965 129 970 159 b 966 241 970 208 969 224 b 926 348 959 277 945 313 m 627 326 b 619 326 624 326 622 326 b 598 316 611 326 604 323 b 568 215 579 288 568 255 b 568 208 568 213 568 210 b 571 183 570 195 570 184 l 571 183 b 594 201 571 183 582 191 l 634 231 b 660 259 653 247 656 248 b 664 278 662 266 664 272 b 627 326 664 299 649 320 "
        },
        keyboardPedalUp: {
            x_min: -1.359375,
            x_max: 592.078125,
            ha: 604,
            o: "m 280 692 b 295 694 283 692 289 694 b 310 692 300 694 307 692 b 357 630 340 684 357 657 b 336 580 357 612 351 594 b 311 538 321 566 311 549 b 352 492 311 512 330 492 b 366 495 357 492 362 492 b 397 553 390 503 397 517 b 415 603 397 576 402 591 b 460 623 427 617 443 623 b 509 599 479 623 498 614 b 522 559 518 587 522 573 b 494 506 522 538 513 519 b 451 495 481 498 473 496 b 415 488 432 495 426 494 b 394 449 404 483 394 464 b 394 448 394 448 394 448 l 394 440 l 397 433 b 428 409 404 420 413 413 b 438 408 431 408 435 408 b 479 431 450 408 462 415 b 528 455 495 448 510 455 b 548 452 534 455 541 453 b 592 391 577 442 592 416 b 549 331 592 365 577 340 b 528 327 541 328 534 327 b 479 351 510 327 495 335 b 438 374 464 367 450 374 b 417 369 431 374 424 373 b 394 333 402 360 394 348 b 400 312 394 326 396 319 b 451 287 408 294 420 288 b 513 258 484 285 499 278 b 522 223 519 247 522 234 b 461 159 522 190 496 159 b 449 161 457 159 453 159 b 397 229 416 167 397 191 b 366 288 397 265 390 278 b 352 290 362 290 357 290 b 315 262 336 290 321 280 b 311 245 313 256 311 251 b 334 204 311 233 318 220 b 355 170 348 190 351 184 b 357 152 356 166 357 159 b 355 136 357 147 356 140 b 295 88 345 104 321 88 b 232 152 264 88 232 112 b 255 204 232 174 238 186 b 279 244 273 222 279 231 l 279 245 b 238 290 279 270 259 290 b 224 288 234 290 228 290 b 193 229 200 278 193 265 b 141 161 193 191 174 167 b 129 159 137 159 133 159 b 68 223 93 159 68 190 b 77 258 68 234 70 247 b 138 287 91 278 106 285 b 185 302 166 287 175 291 b 196 333 193 312 196 323 b 174 369 196 347 187 360 b 152 374 166 373 159 374 b 111 351 140 374 126 367 b 62 327 95 335 80 327 b 51 328 58 327 54 327 b -1 391 16 334 -1 363 b 53 455 -1 420 17 449 b 62 455 57 455 59 455 b 111 431 80 455 95 448 b 152 408 127 415 140 408 b 161 409 155 408 159 408 b 193 433 176 413 186 420 l 196 440 l 196 448 b 196 451 196 449 196 449 b 190 471 196 459 194 463 b 137 495 182 489 167 495 l 134 495 l 134 495 b 68 560 95 495 68 521 b 129 623 68 596 95 623 b 144 621 134 623 138 623 b 193 553 175 614 193 589 b 224 495 193 517 200 503 b 238 492 228 492 234 492 b 279 538 259 492 279 512 b 254 580 279 549 269 566 b 232 630 239 594 232 612 b 280 692 232 657 250 684 m 307 456 b 295 458 303 458 299 458 b 230 391 258 458 230 426 b 236 360 230 381 231 371 b 295 324 249 337 272 324 b 353 360 318 324 341 337 b 360 391 357 370 360 381 b 307 456 360 421 340 451 "
        },
        pictChokeCymbal: {
            x_min: 0,
            x_max: 227.3125,
            ha: 232,
            o: "m 91 213 b 100 215 93 215 96 215 b 227 58 167 215 224 144 b 227 52 227 56 227 54 b 61 -201 227 -43 164 -138 b 29 -216 44 -212 36 -216 b 23 -210 27 -216 24 -213 b 21 -205 21 -208 21 -206 b 34 -192 21 -201 25 -197 b 122 -55 89 -161 122 -106 b 104 6 122 -33 117 -12 l 103 9 l 96 9 b 4 79 57 9 17 38 b 0 112 1 90 0 101 b 91 213 0 163 36 209 "
        },
        wiggleArpeggiatoUp: {
            x_min: 58.53125,
            x_max: 228.671875,
            ha: 294,
            o: "m 138 371 b 142 373 140 371 141 373 b 178 342 149 373 156 366 b 228 251 217 297 228 278 b 228 244 228 248 228 247 b 176 147 227 212 212 184 b 123 73 152 122 132 93 b 121 62 122 70 121 66 b 145 13 121 48 129 31 b 153 -2 151 6 153 1 b 149 -9 153 -5 152 -6 b 144 -11 148 -11 145 -11 b 129 -1 140 -11 136 -8 b 61 87 89 37 68 68 b 58 113 59 95 58 105 b 110 215 58 144 74 177 b 163 287 134 240 155 269 b 166 299 166 291 166 295 b 141 348 166 313 157 330 b 133 360 134 356 133 358 b 133 363 133 362 133 362 b 138 371 133 367 136 370 "
        },
        arrowheadBlackUp: {
            x_min: -10.890625,
            x_max: 299.4375,
            ha: 294,
            o: "m 136 460 b 142 462 137 462 140 462 b 166 449 152 462 161 456 b 171 428 168 446 168 445 b 288 131 194 322 238 209 b 298 115 295 120 296 117 b 299 106 298 112 299 109 b 273 81 299 91 287 81 b 255 86 268 81 261 83 b 155 116 225 104 183 116 l 152 116 l 149 108 b 141 83 148 102 144 91 b 134 48 137 69 134 58 b 149 9 134 34 140 24 b 153 -1 152 5 153 1 b 149 -9 153 -5 152 -6 b 144 -11 148 -11 147 -11 b 122 2 138 -11 133 -6 b 95 61 104 20 95 38 b 107 108 95 74 99 90 b 108 113 107 111 108 112 b 107 113 108 113 108 113 b 102 113 106 113 104 113 b 31 86 76 108 53 98 b 14 80 24 81 20 80 b -10 106 0 80 -10 91 b 0 131 -10 115 -9 116 b 115 430 49 209 91 317 b 136 460 119 451 123 456 "
        },
        arrowheadBlackDown: {
            x_min: -10.890625,
            x_max: 298.078125,
            ha: 294,
            o: "m 138 473 b 142 474 140 473 141 474 b 164 459 148 474 153 470 b 191 402 183 442 191 423 b 181 353 191 388 187 371 b 178 349 179 352 178 349 b 179 348 178 348 179 348 b 185 349 181 348 182 348 b 255 376 210 355 234 363 b 272 381 264 381 266 381 b 298 355 287 381 298 370 b 288 330 298 348 298 345 b 171 34 238 254 194 141 b 166 13 168 16 168 16 b 144 1 161 5 152 1 b 121 15 134 1 125 5 b 115 33 119 18 117 24 b 0 330 91 145 49 252 b -10 355 -9 345 -10 348 b 13 381 -10 371 0 381 b 31 376 19 381 25 380 b 132 345 61 358 103 345 l 136 345 l 137 355 b 145 378 138 359 142 370 b 152 415 149 394 152 405 b 137 452 152 427 148 438 b 133 464 134 458 133 460 b 138 473 133 467 134 470 "
        },
        vexAccidentalMicrotonal1: {
            x_min: -171.5,
            x_max: 483.1875,
            ha: 493,
            o: "m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 495 20 616 20 616 b 20 373 20 427 20 373 b 115 410 20 373 63 390 l 210 448 l 210 531 b 212 620 210 614 210 616 b 231 632 215 628 223 632 b 246 627 236 632 242 631 b 251 541 251 620 251 628 l 251 463 l 315 489 b 387 514 368 509 381 514 b 393 513 390 514 392 514 b 406 494 402 510 406 502 b 397 476 406 487 404 480 b 323 446 396 474 363 462 l 251 417 l 251 283 l 251 148 l 254 151 b 370 199 291 183 332 199 b 415 191 385 199 400 197 b 483 84 458 176 483 134 b 461 0 483 58 476 29 b 332 -142 439 -40 411 -72 l 255 -215 b 231 -229 240 -229 239 -229 b 216 -223 224 -229 220 -227 b 210 -158 210 -217 210 -223 b 210 -120 210 -148 210 -136 l 210 -29 l 205 -34 b 100 -142 182 -65 159 -88 l 23 -215 b -1 -229 9 -229 6 -229 b -19 -217 -9 -229 -16 -224 l -20 -215 l -21 48 l -21 310 l -83 287 b -152 262 -133 266 -145 262 b -157 263 -153 262 -155 262 b -171 283 -166 266 -171 274 b -161 301 -171 290 -167 297 b -91 328 -160 302 -129 315 l -21 356 l -21 487 l -20 617 l -19 621 b -8 631 -17 626 -12 630 m 210 288 b 210 401 210 351 210 401 b 114 365 209 401 167 384 l 20 327 l 20 238 l 20 148 l 21 151 b 140 199 59 183 102 199 b 206 180 164 199 187 192 l 209 177 b 209 177 209 177 209 177 b 210 288 210 177 210 199 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 m 341 131 b 328 133 337 133 332 133 b 322 133 326 133 323 133 b 257 87 296 129 273 113 l 251 80 l 251 -37 l 251 -156 l 255 -152 b 375 81 328 -72 375 20 l 375 83 b 341 131 375 113 367 126 "
        },
        vexAccidentalMicrotonal2: {
            x_min: -1.359375,
            x_max: 386.5625,
            ha: 394,
            o: "m 249 535 b 257 537 251 537 253 537 b 276 524 266 537 273 533 l 277 521 l 279 419 l 279 316 l 304 323 b 337 328 319 326 330 328 b 353 316 347 328 349 324 b 355 266 355 315 355 290 b 353 215 355 241 355 217 b 319 198 349 206 347 205 b 279 187 284 190 279 188 b 279 156 279 187 279 174 b 279 136 279 151 279 144 l 279 84 l 289 87 l 330 98 b 367 105 352 102 362 105 b 378 101 372 105 375 104 b 386 61 385 95 386 94 b 386 40 386 55 386 48 l 386 -5 l 385 -8 b 374 -19 383 -12 378 -18 b 291 -40 372 -19 347 -26 b 279 -43 284 -41 279 -43 b 279 -83 279 -43 279 -59 b 279 -95 279 -87 279 -91 l 279 -145 l 304 -140 b 337 -133 321 -136 330 -133 b 349 -140 343 -133 347 -136 b 355 -181 355 -145 355 -142 l 355 -197 l 355 -210 b 349 -252 355 -249 355 -247 b 300 -269 345 -258 347 -258 b 280 -274 291 -272 281 -273 l 279 -274 l 277 -378 l 277 -483 l 276 -487 b 257 -499 273 -495 265 -499 b 238 -487 249 -499 242 -495 l 236 -483 l 236 -384 l 236 -285 l 235 -285 l 212 -291 l 170 -301 b 148 -308 159 -305 148 -306 b 147 -415 147 -308 147 -313 l 147 -523 l 145 -526 b 126 -538 141 -534 133 -538 b 106 -526 118 -538 110 -534 l 104 -523 l 104 -420 b 103 -317 104 -326 104 -317 b 103 -317 103 -317 103 -317 b 50 -330 92 -322 54 -330 b 31 -317 42 -330 35 -326 b 29 -267 29 -315 29 -315 l 29 -219 l 32 -216 b 92 -192 36 -206 36 -206 l 104 -190 l 104 -138 b 103 -87 104 -91 104 -87 b 103 -87 103 -87 103 -87 b 88 -91 103 -87 96 -88 l 49 -101 b 17 -106 32 -105 23 -106 b 6 -102 13 -106 10 -105 b -1 -62 0 -97 -1 -95 b 0 -41 -1 -56 0 -49 l 0 4 l 1 6 b 10 16 2 11 6 15 b 91 37 12 18 38 24 l 104 41 l 104 93 b 103 144 104 140 104 144 b 103 144 103 144 103 144 b 50 131 92 141 54 131 b 31 144 42 131 35 137 b 29 195 29 147 29 148 l 29 242 l 32 245 b 92 269 36 255 36 255 l 104 273 l 104 377 l 104 481 l 106 485 b 126 498 110 492 118 498 b 134 495 129 498 132 496 b 145 485 138 494 142 489 l 147 481 l 147 383 l 147 283 l 152 284 b 190 294 155 285 171 290 l 230 303 l 236 305 l 236 413 l 236 521 l 238 524 b 249 535 240 528 243 533 m 236 126 b 235 177 236 154 236 177 l 235 177 b 213 172 235 177 225 174 l 170 161 b 147 155 157 158 147 155 b 147 124 147 155 147 142 b 147 102 147 117 147 111 l 147 52 l 153 54 l 228 72 l 236 74 l 236 126 m 236 -105 b 235 -54 236 -65 236 -54 l 235 -54 b 231 -55 235 -54 234 -54 b 172 -69 227 -55 204 -62 l 149 -76 l 147 -76 l 147 -127 l 147 -179 l 152 -177 b 190 -167 155 -177 171 -173 l 230 -158 l 236 -156 l 236 -105 "
        },
        vexWiggleArpeggioUp: {
            x_min: 58.53125,
            x_max: 228.671875,
            ha: 294,
            o: "m 138 371 b 142 373 140 371 141 373 b 178 342 149 373 156 366 b 228 251 217 297 228 278 b 228 244 228 248 228 247 b 176 147 227 212 212 184 b 123 73 152 122 132 93 b 121 62 122 70 121 66 b 145 13 121 48 129 31 b 153 -2 151 6 153 1 b 149 -9 153 -5 152 -6 b 144 -11 148 -11 145 -11 b 129 -1 140 -11 136 -8 b 61 87 89 37 68 68 b 58 113 59 95 58 105 b 110 215 58 144 74 177 b 163 287 134 240 155 269 b 166 299 166 291 166 295 b 141 348 166 313 157 330 b 133 360 134 356 133 358 b 133 363 133 362 133 362 b 138 371 133 367 136 370 "
        },
        vexNoteHeadMutedBreve: {
            x_min: 0,
            x_max: 370.21875,
            ha: 378,
            o: "m 0 0 l 0 277 l 61 277 l 122 277 l 122 0 l 122 -278 l 61 -278 l 0 -278 l 0 0 m 246 -1 l 246 277 l 308 277 l 370 277 l 370 -1 l 370 -278 l 308 -278 l 246 -278 l 246 -1 "
        }
    },
    cssFontWeight: "normal",
    ascender: 1903,
    underlinePosition: -125,
    cssFontStyle: "normal",
    boundingBox: {
        yMin: -2065.375,
        xMin: -695.53125,
        yMax: 1901.578125,
        xMax: 1159.671875
    },
    resolution: 1e3,
    original_font_information: {
        postscript_name: "Gonville-18",
        version_string: "Version 0.1.8904 ",
        vendor_url: "",
        full_font_name: "Gonville-18",
        font_family_name: "Gonville-18",
        copyright: "No copyright is claimed on this font file.",
        description: "",
        trademark: "",
        designer: "",
        designer_url: "",
        unique_font_identifier: "FontForge 2.0 : Gonville-18 : 17-3-2010",
        license_url: "",
        license_description: "",
        manufacturer_name: "",
        font_sub_family_name: "18"
    },
    descender: -2066,
    familyName: "Gonville-18",
    lineHeight: 4093,
    underlineThickness: 50
}
  , Z3 = {
    name: "Gonville",
    smufl: !1,
    stave: {
        padding: 12
    },
    clef: {
        default: {
            point: 40,
            width: 26
        },
        small: {
            point: 32,
            width: 20
        },
        annotations: {
            "8va": {
                smuflCode: "timeSig8",
                default: {
                    point: 20,
                    treble: {
                        line: -1.2,
                        shiftX: 11
                    }
                },
                small: {
                    point: 18,
                    treble: {
                        line: -.4,
                        shiftX: 8
                    }
                }
            },
            "8vb": {
                smuflCode: "timeSig8",
                default: {
                    point: 20,
                    treble: {
                        line: 6.3,
                        shiftX: 10
                    },
                    bass: {
                        line: 4,
                        shiftX: 1
                    }
                },
                small: {
                    point: 18,
                    treble: {
                        line: 5.8,
                        shiftX: 6
                    },
                    bass: {
                        line: 3.5,
                        shiftX: .5
                    }
                }
            }
        },
        lineCount: {
            "8": {
                point: 55,
                shiftY: 14
            },
            "7": {
                point: 47,
                shiftY: 8
            },
            "6": {
                point: 40,
                shiftY: 1
            },
            "5": {
                point: 30,
                shiftY: -6
            },
            "4": {
                point: 23,
                shiftY: -12
            }
        }
    },
    pedalMarking: {
        up: {
            point: 40
        },
        down: {
            point: 40
        }
    },
    tremolo: {
        default: {
            point: 40,
            spacing: 4,
            offsetYStemUp: -9,
            offsetYStemDown: -21,
            offsetXStemUp: 6,
            offsetXStemDown: -2
        },
        grace: {
            point: 30,
            spacing: 4,
            offsetYStemUp: -9,
            offsetYStemDown: -21,
            offsetXStemUp: 6,
            offsetXStemDown: -2
        }
    },
    digits: {
        point: 40,
        tupletPoint: 28
    },
    stem: {
        noteHead: {
            noteheadTriangleUpHalf: {
                offsetYBaseStemUp: 5,
                offsetYBaseStemDown: 4
            },
            noteheadTriangleUpBlack: {
                offsetYBaseStemUp: 5,
                offsetYBaseStemDown: 4
            },
            noteheadTriangleUpWhole: {
                offsetYBaseStemUp: 5,
                offsetYBaseStemDown: 4
            },
            noteheadXHalf: {
                offsetYBaseStemUp: -4,
                offsetYBaseStemDown: 4
            },
            noteheadXBlack: {
                offsetYBaseStemUp: -4,
                offsetYBaseStemDown: 4
            },
            noteheadXWhole: {
                offsetYBaseStemUp: -4,
                offsetYBaseStemDown: 4
            },
            noteheadBlack: {
                offsetYBaseStemDown: 2
            },
            noteheadSquareWhite: {
                offsetYBaseStemDown: -5,
                offsetYBaseStemUp: 5
            }
        }
    },
    glyphs: {
        textNote: {
            point: 40,
            default: {},
            ornamentTrill: {
                shiftX: -5,
                shiftY: 4
            }
        },
        noteHead: {
            custom: {
                noteheadDiamondWholeStemUp: {
                    shiftX: -6
                },
                noteheadCircleXStemUp: {
                    shiftX: -1.5
                },
                noteheadXWholeStemUp: {
                    shiftX: -5
                },
                noteheadTriangleUpWholeStemUp: {
                    shiftX: -6
                }
            }
        }
    }
}
  , tt = {
    glyphs: {
        bracketTop: {
            x_min: 0,
            x_max: 508,
            y_min: 0,
            y_max: 370,
            ha: 370,
            o: "m 22 0 b 122 0 55 1 89 0 l 157 0 b 713 376 425 0 622 137 b 732 467 724 406 732 436 b 726 514 732 482 730 498 b 711 533 723 528 719 533 b 693 526 707 533 700 530 b 674 498 683 520 678 508 b 635 406 662 467 652 435 b 310 164 560 281 458 193 b 154 151 258 154 206 151 b 39 154 117 151 78 154 b 1 120 17 154 4 145 b 0 84 0 108 0 96 b 0 20 0 63 1 40 b 22 0 0 4 7 0 z"
        },
        bracketBottom: {
            x_min: 0,
            x_max: 496,
            y_min: -393,
            y_max: 0,
            ha: 393,
            o: "m 696 -566 b 711 -539 713 -566 708 -549 b 714 -521 713 -533 714 -527 b 713 -508 714 -517 713 -513 b 661 -327 706 -445 688 -384 b 392 -42 603 -203 513 -109 b 206 0 331 -7 266 0 b 160 -1 190 0 174 -1 b 26 -1 107 -1 66 -3 b 0 -19 12 -1 0 -4 l 0 -23 b 3 -50 1 -32 3 -42 b 1 -86 3 -62 1 -73 b 4 -118 1 -96 1 -108 b 45 -151 10 -145 23 -154 b 180 -143 89 -144 135 -145 b 621 -419 392 -135 523 -236 b 662 -539 641 -456 655 -497 b 696 -566 667 -557 680 -566 z"
        },
        barlineTick: {
            x_min: 0,
            x_max: 56.036101509664164,
            y_min: 876.905249806889,
            y_max: 1121.5430338167066,
            ha: 244.63778400981766,
            o: "m 42 1263 b 66 1287 62 1261 66 1272 b 81 1583 65 1387 72 1485 b 35 1614 82 1610 53 1610 b 14 1591 17 1619 16 1604 b 0 1408 7 1525 0 1459 l 0 1292 b 42 1263 1 1263 23 1266 z"
        },
        breathMarkTick: {
            x_min: 0,
            x_max: 568,
            y_min: 0,
            y_max: 621,
            ha: 621,
            o: "m 258 0 b 278 39 276 0 274 24 b 279 56 279 45 279 50 l 279 73 b 278 117 279 88 278 102 b 281 148 278 127 279 138 b 536 600 312 330 387 487 b 744 719 600 651 670 690 b 815 779 775 730 808 740 b 818 824 818 793 818 808 b 815 868 818 838 818 852 b 796 894 814 881 808 894 b 779 888 791 894 786 893 b 719 864 760 878 739 871 b 372 602 580 806 459 724 b 229 252 298 498 251 383 b 220 268 225 262 222 264 b 209 302 217 279 213 291 b 75 527 181 387 143 467 b 16 563 58 543 39 573 b 0 539 3 557 0 549 b 12 492 0 524 9 507 b 56 400 19 459 22 425 b 163 269 104 367 138 323 b 238 36 197 194 216 115 b 258 0 242 22 243 0 z"
        },
        segno: {
            x_min: 0,
            x_max: 798,
            y_min: -65,
            y_max: 806,
            ha: 871,
            o: "m 16 -94 b 66 -69 39 -92 53 -85 b 177 59 102 -26 138 17 b 543 456 298 192 420 324 b 726 300 615 420 680 373 b 753 217 744 271 753 243 b 655 112 753 170 719 131 b 599 104 636 107 618 104 b 461 173 544 104 495 128 b 432 190 454 183 444 190 b 409 179 425 190 418 187 b 359 118 390 160 373 141 b 341 72 347 101 341 86 b 373 24 341 56 351 40 b 409 6 384 17 396 10 b 550 -13 454 -12 501 -14 b 599 -6 566 -12 583 -10 b 864 213 720 27 806 104 b 886 300 878 242 886 271 b 857 395 886 331 877 363 b 799 467 840 420 821 445 b 648 572 755 513 704 546 b 1110 1083 802 743 955 914 b 1140 1129 1123 1097 1136 1110 b 1149 1148 1142 1135 1149 1142 b 1145 1153 1149 1149 1148 1152 b 1123 1161 1139 1158 1130 1161 b 1109 1156 1119 1161 1113 1159 b 1089 1138 1102 1151 1094 1145 b 946 988 1040 1089 989 1041 b 595 602 834 855 711 732 l 590 598 l 549 615 b 432 793 462 647 432 723 b 534 888 432 851 474 888 b 671 834 588 888 631 864 b 710 818 684 824 696 818 b 724 821 714 818 719 819 b 809 883 757 834 788 852 b 816 901 814 890 816 896 b 802 923 816 910 812 916 b 706 984 770 945 742 971 b 593 1011 668 998 631 1011 b 516 991 567 1011 541 1005 b 333 799 433 949 380 876 b 302 693 312 765 302 729 b 330 589 302 658 311 624 b 469 488 360 533 415 511 b 485 482 475 487 480 485 b 266 249 412 405 338 327 b 121 88 217 196 170 141 b 9 -65 78 40 37 -7 b 0 -85 4 -72 0 -79 b 16 -94 0 -91 4 -94 z m 251 350 b 363 436 285 348 353 403 b 354 456 366 448 360 452 b 271 518 327 477 298 497 b 243 528 261 526 252 528 b 210 513 232 528 222 523 b 157 454 190 494 176 472 b 141 428 147 444 141 436 b 158 406 141 420 147 413 b 216 361 180 393 197 376 b 245 350 225 356 235 350 b 251 350 246 350 249 350 z m 861 536 b 927 575 890 539 909 557 b 965 628 952 598 965 613 b 926 680 965 644 952 658 b 865 713 900 701 883 713 b 805 667 845 713 828 698 b 768 611 791 649 770 631 b 812 564 766 589 798 582 b 861 536 824 550 840 537 z"
        },
        coda: {
            x_min: 0,
            x_max: 1380,
            y_min: -196,
            y_max: 1037,
            ha: 1233,
            o: "m 1028 -282 b 1057 -245 1045 -282 1053 -261 b 1060 -203 1060 -232 1060 -217 b 1063 9 1060 -132 1061 -62 b 1390 194 1192 22 1303 81 b 1531 543 1467 298 1512 415 b 1532 556 1531 547 1532 552 b 1904 559 1656 557 1780 559 b 1950 582 1920 559 1941 569 b 1987 674 1970 609 1987 638 b 1984 698 1987 681 1986 690 b 1950 700 1973 698 1961 700 l 1941 700 l 1545 696 b 1535 776 1545 723 1541 749 b 1103 1113 1477 996 1326 1107 b 1080 1115 1096 1115 1087 1115 b 1081 1322 1080 1184 1080 1253 b 1079 1467 1083 1371 1081 1418 b 1061 1493 1079 1476 1080 1493 l 1060 1493 b 1028 1467 1044 1490 1031 1485 b 1020 1403 1025 1446 1020 1424 b 1017 1110 1020 1305 1018 1208 l 962 1106 b 569 914 808 1087 671 1035 b 451 683 510 844 472 766 l 161 678 b 118 680 148 678 132 680 b 79 670 101 680 86 678 b 0 544 48 636 29 592 l 37 544 l 429 549 b 428 518 428 539 428 528 b 488 285 428 435 458 360 b 681 81 526 192 593 124 b 946 9 763 40 854 19 b 1008 6 966 7 988 6 b 1005 -137 1008 -42 1005 -89 b 1012 -243 1005 -173 1005 -209 b 1028 -282 1015 -258 1011 -282 z m 1008 180 b 660 264 886 181 770 212 b 524 471 570 305 524 374 b 528 524 524 488 526 505 l 533 549 b 792 552 619 550 706 550 b 1009 553 865 553 937 552 b 1008 180 1009 428 1008 288 z m 577 684 b 766 874 618 763 678 828 b 989 932 837 912 913 923 b 1015 933 998 932 1007 933 b 1014 822 1015 896 1014 860 b 1011 688 1012 791 1012 743 z m 1067 184 b 1071 553 1070 307 1068 429 b 1439 556 1194 553 1316 554 b 1437 554 1439 554 1437 554 b 1341 337 1413 478 1387 402 b 1119 192 1286 261 1211 212 b 1067 184 1102 189 1084 186 z m 1074 690 b 1079 935 1077 772 1077 852 b 1326 855 1166 932 1250 909 b 1446 694 1385 814 1426 759 b 1269 693 1387 694 1328 693 b 1074 690 1204 693 1139 691 z"
        },
        gClef: {
            x_min: 0,
            x_max: 664,
            y_min: -559,
            y_max: 1009,
            ha: 1568,
            o: "m 343 -805 b 366 -801 350 -805 357 -804 b 409 -773 383 -795 397 -786 b 582 -328 528 -648 577 -497 b 583 -294 582 -315 583 -294 b 612 -279 583 -294 603 -282 b 747 -197 660 -256 706 -230 b 949 143 857 -109 920 10 b 956 206 955 164 956 186 b 791 384 956 297 906 363 b 704 393 762 390 733 393 b 498 336 632 393 563 374 b 481 325 490 331 481 325 l 444 465 b 442 485 442 472 442 485 b 609 880 442 485 589 746 b 619 996 616 919 619 958 b 613 1084 619 1027 618 1056 b 534 1387 599 1188 560 1286 b 482 1453 527 1417 517 1453 b 422 1407 456 1453 438 1428 b 305 1063 348 1305 312 1188 b 304 1002 304 1043 304 1022 b 338 654 304 886 323 769 b 343 629 338 645 341 636 b 144 356 278 537 206 451 b 23 144 101 288 53 220 b 0 20 7 107 0 63 b 82 -210 0 -69 30 -160 b 207 -288 112 -239 160 -271 b 410 -328 274 -312 340 -328 b 474 -324 431 -328 452 -327 l 491 -321 b 491 -341 491 -321 492 -334 b 402 -585 475 -428 454 -513 b 294 -668 374 -622 348 -664 b 271 -693 278 -670 271 -680 b 274 -708 271 -698 272 -703 b 302 -775 282 -730 292 -753 b 343 -805 311 -795 325 -805 z m 410 -160 b 311 -147 360 -160 311 -147 b 307 -98 311 -147 307 -127 b 314 -33 307 -79 308 -56 b 429 131 328 36 377 85 b 441 138 433 135 438 138 b 449 122 446 138 448 132 b 490 -131 462 37 484 -46 b 490 -153 491 -140 490 -153 b 410 -160 490 -153 452 -163 z m 252 -135 b 196 -121 232 -134 215 -127 b 117 -69 158 -108 127 -94 b 111 -32 112 -58 111 -45 b 117 19 111 -16 114 1 b 130 56 118 27 127 52 b 324 337 186 156 253 246 l 384 416 l 395 384 b 416 291 406 348 416 291 b 350 213 416 291 376 239 b 243 -42 278 143 243 55 b 251 -117 243 -66 246 -91 b 252 -135 252 -122 252 -127 z m 569 -131 l 563 -91 b 510 168 552 3 530 78 b 513 192 508 179 508 186 b 624 202 550 199 586 202 b 730 192 660 202 694 199 b 850 141 773 183 816 176 b 858 134 852 138 855 135 b 595 -121 801 19 716 -68 z m 400 717 b 382 922 389 786 382 854 b 481 1286 382 1047 408 1169 b 507 1125 498 1233 507 1179 b 500 1040 507 1097 504 1068 b 400 717 481 927 455 818 z"
        },
        cClef: {
            x_min: 0,
            x_max: 731,
            y_min: -543,
            y_max: 543,
            ha: 1086,
            o: "m 615 -770 b 881 -684 710 -770 801 -739 b 1020 -395 986 -612 1020 -510 b 1017 -334 1020 -374 1018 -354 b 769 -62 1007 -209 896 -75 b 746 -60 762 -60 755 -60 b 639 -73 710 -60 675 -69 b 524 -109 598 -79 560 -92 b 528 -36 526 -85 528 -60 b 527 -4 528 -26 528 -14 b 528 39 527 10 528 24 b 526 99 528 59 527 79 b 592 94 549 95 570 94 b 648 99 611 94 629 95 b 912 157 744 94 844 117 b 1053 377 1009 215 1053 284 b 1050 425 1053 393 1053 409 b 914 665 1037 521 986 602 b 717 753 855 717 791 753 b 626 734 688 753 658 747 l 462 665 b 347 500 374 628 347 580 b 350 449 347 484 348 468 b 392 419 353 428 367 416 b 492 438 425 425 459 428 b 541 498 524 448 541 468 b 540 514 541 503 541 508 b 537 546 537 524 537 536 b 573 639 537 580 550 611 b 606 657 582 649 593 657 l 609 657 b 716 622 647 652 684 647 b 834 372 801 556 834 469 b 831 323 834 356 832 338 b 743 187 825 266 795 217 b 710 176 732 180 720 176 b 694 179 704 176 700 177 b 527 223 638 193 582 206 b 495 229 516 228 505 229 b 454 220 481 229 468 225 b 395 189 432 213 415 200 b 363 180 384 186 374 181 b 348 168 356 179 348 176 b 340 161 343 167 340 164 b 347 150 340 157 343 154 b 356 147 348 148 353 147 b 364 92 361 130 363 111 b 369 -37 367 49 369 6 b 363 -154 369 -76 367 -115 b 357 -236 360 -183 357 -210 b 376 -264 357 -253 361 -259 b 456 -289 402 -284 429 -289 b 521 -282 478 -289 500 -285 b 549 -255 537 -279 546 -271 b 598 -177 556 -225 577 -202 b 622 -164 605 -168 613 -164 b 636 -167 626 -164 631 -166 b 749 -225 678 -177 714 -199 b 848 -405 814 -276 848 -337 b 824 -507 848 -436 840 -471 b 657 -657 792 -582 730 -625 b 608 -668 638 -664 622 -668 b 534 -602 572 -668 547 -645 b 513 -575 530 -589 523 -575 b 507 -576 510 -575 508 -575 b 478 -582 497 -580 488 -582 b 405 -570 454 -582 428 -570 b 389 -572 399 -570 395 -570 l 363 -572 b 321 -575 348 -572 333 -569 l 321 631 b 323 662 323 641 323 652 b 315 716 323 681 321 698 b 304 736 314 723 317 736 l 302 736 b 281 716 294 734 285 729 b 275 665 276 700 275 683 l 275 382 b 276 99 275 288 275 193 b 279 -170 278 10 276 -81 b 284 -399 282 -246 284 -323 b 282 -629 284 -475 282 -553 b 289 -721 282 -660 289 -690 b 300 -736 289 -727 291 -736 b 312 -724 307 -736 310 -730 b 321 -667 323 -706 321 -687 l 321 -632 l 328 -644 l 340 -657 b 510 -757 386 -707 445 -740 b 615 -770 546 -766 580 -770 z m 131 -782 b 141 -755 138 -782 140 -773 b 147 -490 143 -667 145 -577 b 160 207 150 -258 153 -24 b 168 618 164 344 158 481 b 81 768 173 690 132 732 b 45 782 66 778 55 782 b 3 740 26 782 13 768 b 0 724 1 736 0 730 l 1 710 b 4 596 4 672 4 634 l 4 382 b 9 102 4 288 4 196 b 17 -301 13 -32 10 -166 l 17 -672 b 50 -736 17 -701 27 -720 b 109 -772 69 -749 91 -759 b 131 -782 120 -778 127 -782 z"
        },
        fClef: {
            x_min: 0,
            x_max: 776,
            y_min: -496,
            y_max: 216,
            ha: 712,
            o: "m 402 -706 b 804 -405 592 -678 716 -566 b 876 -53 861 -298 874 -183 b 868 33 876 -32 873 1 b 560 311 845 217 723 311 b 524 310 549 311 536 311 b 131 134 373 297 239 242 b 17 -29 84 86 37 39 b 9 -89 12 -50 9 -71 b 112 -238 9 -154 43 -206 b 124 -243 117 -239 120 -242 b 186 -261 145 -255 166 -261 b 268 -228 215 -261 242 -249 b 351 -59 325 -181 351 -124 b 343 10 351 -36 348 -13 b 340 36 341 19 340 27 b 409 105 340 75 363 102 b 441 107 420 107 431 107 b 624 36 510 107 573 86 b 744 -200 688 -27 724 -109 b 747 -230 747 -210 747 -222 b 717 -323 747 -264 736 -292 b 608 -445 688 -370 654 -410 b 307 -541 518 -513 415 -541 b 213 -541 275 -541 245 -541 b 39 -521 154 -541 96 -539 b 0 -552 17 -514 0 -531 b 1 -564 0 -556 0 -560 b 17 -611 6 -580 10 -596 b 101 -694 35 -648 50 -684 b 288 -714 164 -707 225 -714 b 402 -706 325 -714 363 -711 z m 972 -281 b 1070 -148 1024 -279 1070 -210 b 1025 -105 1070 -105 1045 -112 b 989 -127 1004 -96 998 -114 b 949 -249 963 -164 963 -209 b 969 -281 943 -265 949 -281 b 972 -281 971 -281 971 -281 z m 1018 92 b 1080 118 1041 91 1068 96 b 1117 219 1099 150 1117 180 b 1113 252 1117 229 1116 240 b 1045 288 1102 297 1068 276 b 1017 262 1028 297 1024 274 b 984 124 989 220 996 170 b 1008 91 979 108 986 91 b 1018 92 1011 91 1015 92 z"
        },
        unpitchedPercussionClef1: {
            x_min: 0,
            x_max: 379.13761966945304,
            y_min: -250,
            y_max: 250,
            ha: 500,
            o: "m 144 -341 b 207 -320 167 -341 189 -331 b 217 -301 215 -315 217 -308 b 210 -262 217 -289 210 -275 b 228 187 212 -112 209 37 b 228 287 228 220 229 253 b 174 353 228 336 222 343 b 120 359 157 357 138 359 b 48 357 96 359 72 356 b 17 323 29 357 19 344 b 7 120 16 255 9 187 b 6 -109 6 43 6 -33 l 6 -204 b 0 -251 6 -220 0 -235 b 3 -269 0 -256 0 -262 b 127 -340 24 -330 79 -328 b 144 -341 132 -341 138 -341 z m 481 -360 b 507 -357 491 -360 500 -360 b 546 -295 541 -346 547 -325 b 536 79 543 -170 540 -46 b 523 311 533 157 534 235 b 475 359 518 340 508 359 b 425 360 459 359 442 360 b 400 359 416 360 409 360 b 337 294 348 353 340 347 l 337 -73 b 336 -264 337 -137 337 -200 b 343 -294 336 -274 338 -284 b 481 -360 359 -330 431 -360 z"
        },
        "6stringTabClef": {
            x_min: 0,
            x_max: 438,
            y_min: -768,
            y_max: 767,
            ha: 1535,
            o: "m 114 -320 b 127 -304 120 -320 124 -315 b 171 -174 141 -261 158 -219 b 222 -135 179 -147 196 -137 b 426 -122 289 -131 359 -128 b 498 -164 462 -120 482 -127 b 628 -301 521 -226 575 -264 b 631 -288 631 -295 631 -291 b 628 -269 631 -281 629 -276 b 569 -134 616 -220 589 -179 b 408 225 514 -14 462 107 b 314 357 384 274 351 318 b 278 380 298 372 288 379 b 251 351 268 380 261 372 b 4 -209 156 171 75 -17 b 0 -228 1 -215 0 -222 b 19 -258 0 -240 7 -249 b 102 -314 45 -279 75 -294 b 114 -320 107 -318 111 -320 z m 154 -953 b 130 -933 135 -953 130 -948 l 130 -865 l 128 -865 b 135 -788 130 -838 124 -808 b 203 -769 145 -769 180 -776 b 259 -762 223 -765 242 -762 b 441 -852 330 -762 386 -805 b 449 -867 446 -858 449 -863 b 436 -884 449 -874 444 -878 b 318 -942 402 -914 363 -935 b 154 -953 264 -950 209 -953 z m 245 -1106 b 281 -1104 256 -1106 269 -1106 b 511 -888 400 -1094 511 -1035 b 454 -688 511 -814 504 -744 b 448 -678 449 -685 448 -681 b 454 -667 448 -675 449 -671 b 504 -497 503 -619 507 -559 b 324 -288 500 -383 436 -308 b 295 -287 314 -287 304 -287 b 282 -287 291 -287 287 -287 b 115 -330 223 -287 168 -307 b 94 -366 102 -336 94 -348 l 94 -370 b 96 -435 96 -392 96 -413 b 73 -858 89 -576 71 -717 b 78 -919 73 -878 78 -899 b 72 -950 78 -930 76 -940 b 63 -992 66 -965 63 -978 b 66 -1015 63 -999 65 -1008 b 173 -1104 84 -1106 84 -1106 b 245 -1106 197 -1104 220 -1104 z m 161 -622 b 147 -618 156 -622 151 -621 b 140 -600 141 -612 140 -606 b 144 -564 140 -589 144 -575 b 143 -554 144 -560 144 -557 l 143 -546 b 220 -451 144 -467 143 -465 b 278 -445 239 -446 259 -444 b 418 -497 328 -445 376 -461 b 429 -516 426 -504 429 -510 b 415 -533 429 -521 423 -527 b 219 -608 357 -579 287 -590 b 215 -609 217 -608 216 -609 b 161 -622 197 -609 177 -622 z m 425 6 b 360 20 403 17 382 20 b 274 14 331 20 302 14 l 246 14 l 340 206 b 425 6 369 137 395 75 z m 369 438 b 374 439 370 438 372 438 b 384 462 383 444 384 452 l 384 474 b 390 697 386 547 390 622 b 373 1002 390 799 390 901 l 533 1002 b 560 1001 541 1004 552 1001 b 573 1007 567 1001 572 1002 b 546 1050 579 1025 559 1038 b 536 1056 543 1053 539 1053 b 324 1104 472 1102 397 1104 b 72 1090 238 1104 154 1099 b 55 1093 66 1090 60 1092 b 37 1073 46 1093 37 1089 b 60 1045 37 1061 48 1051 b 203 1001 105 1022 151 1001 b 233 1004 213 1001 223 1002 b 246 1005 238 1004 243 1005 b 272 975 264 1005 272 996 b 272 965 272 972 272 969 b 258 596 264 842 265 719 b 315 474 253 540 272 504 l 343 455 b 369 438 351 448 357 438 z"
        },
        timeSig0: {
            x_min: 20,
            x_max: 513,
            y_min: -358.159536277652,
            y_max: 359,
            ha: 717.159536277652,
            o: "m 341 -516 b 420 -510 367 -516 395 -514 b 675 -338 533 -494 622 -448 b 737 -92 716 -256 734 -171 b 739 -35 739 -73 739 -53 b 680 305 739 86 720 207 b 400 517 622 449 537 517 b 337 514 380 517 359 517 b 289 507 321 511 305 513 b 91 317 192 477 127 412 b 29 9 50 212 29 108 b 217 -458 29 -157 88 -312 b 341 -516 251 -494 291 -518 z m 412 -452 b 359 -425 393 -452 376 -444 b 187 14 242 -301 179 -158 b 268 334 193 127 212 235 b 387 448 295 383 330 428 b 406 452 395 451 400 452 b 428 444 413 452 420 449 b 517 324 471 413 497 372 b 586 -29 560 222 586 86 b 556 -271 586 -112 585 -193 b 468 -422 536 -327 508 -377 b 412 -452 449 -442 431 -452 z"
        },
        timeSig1: {
            x_min: 20,
            x_max: 283,
            y_min: -364,
            y_max: 366,
            ha: 730,
            o: "m 264 -524 b 357 -510 297 -524 325 -516 b 374 -490 369 -508 374 -501 b 380 -438 376 -472 380 -455 l 406 246 b 408 301 408 265 408 282 b 400 445 408 348 405 396 b 288 527 395 491 338 527 b 253 520 276 527 264 526 b 240 508 249 517 245 513 b 49 409 192 445 127 413 b 29 396 33 408 29 403 b 32 380 29 392 30 386 b 59 363 36 366 49 364 b 164 348 95 356 130 348 b 222 357 183 348 203 351 b 238 361 228 360 233 360 b 252 334 248 361 252 353 b 243 59 252 242 249 150 b 219 -490 229 -124 233 -307 b 264 -524 217 -516 232 -524 z"
        },
        timeSig2: {
            x_min: 20,
            x_max: 660.4636303241031,
            y_min: -378.7201231608281,
            y_max: 382,
            ha: 760.720123160828,
            o: "m 99 -543 b 130 -533 111 -550 121 -540 b 255 -448 168 -501 213 -475 b 338 -425 282 -431 310 -425 b 392 -431 356 -425 374 -426 b 485 -462 423 -438 454 -451 b 648 -497 540 -482 595 -497 b 834 -441 711 -497 773 -480 b 950 -242 906 -395 958 -334 b 942 -210 950 -230 950 -215 b 912 -220 932 -204 920 -213 b 861 -264 894 -235 877 -248 b 775 -317 835 -289 808 -305 b 675 -334 742 -328 708 -334 b 510 -295 619 -334 563 -318 b 372 -264 465 -278 420 -264 b 305 -272 350 -264 328 -266 b 331 -242 318 -256 324 -249 b 490 -73 386 -187 438 -131 b 675 340 595 43 664 180 b 677 369 677 350 677 360 b 556 536 677 461 638 508 b 468 550 526 546 497 550 b 297 508 409 550 353 533 b 111 354 220 475 168 412 b 29 197 65 308 29 261 b 32 164 29 187 29 176 b 29 140 33 157 29 147 b 43 125 29 132 32 125 b 73 147 55 125 65 138 b 86 163 79 153 82 158 b 238 320 134 219 183 272 b 425 389 292 367 360 389 b 575 341 480 389 531 373 b 606 298 590 330 606 317 b 600 278 606 292 603 285 b 501 107 576 217 544 158 b 304 -104 439 33 372 -35 b 111 -356 230 -180 167 -265 b 84 -446 92 -386 84 -415 b 86 -481 84 -458 85 -469 b 88 -514 88 -491 88 -503 b 99 -543 89 -526 91 -537 z"
        },
        timeSig3: {
            x_min: 19.824321427094187,
            x_max: 540,
            y_min: -392,
            y_max: 392,
            ha: 784,
            o: "m 216 -540 b 354 -564 264 -556 310 -564 b 605 -465 445 -564 530 -530 b 729 -161 697 -383 729 -275 b 724 -82 729 -135 727 -108 b 589 95 716 -1 670 62 b 523 114 567 102 546 108 b 750 418 606 213 677 315 b 778 503 769 444 778 472 b 773 540 778 514 776 527 b 750 564 769 557 762 564 b 736 562 746 564 742 563 b 641 552 704 553 672 552 b 402 554 562 552 481 554 l 346 554 b 84 546 258 554 170 554 b 36 501 55 543 40 531 b 29 412 30 472 32 442 b 52 384 27 393 32 384 l 56 384 b 210 392 107 389 158 392 l 602 392 b 354 108 523 285 445 192 b 246 -65 300 58 246 12 b 252 -108 246 -78 248 -92 l 252 -111 b 264 -141 251 -122 251 -135 b 291 -132 274 -145 284 -140 b 425 -72 328 -95 377 -84 b 475 -65 442 -68 459 -65 b 592 -108 517 -65 557 -79 b 645 -179 615 -125 645 -147 b 642 -194 645 -184 644 -189 b 485 -376 616 -278 569 -344 b 361 -399 444 -392 402 -399 b 151 -340 289 -399 219 -376 b 88 -275 122 -323 98 -310 b 71 -249 86 -268 85 -249 b 63 -251 68 -249 66 -249 b 36 -288 48 -255 36 -266 b 55 -423 33 -336 45 -377 b 101 -482 60 -448 78 -468 b 216 -540 138 -504 174 -526 z"
        },
        timeSig4: {
            x_min: 20,
            x_max: 633.0785282750762,
            y_min: -489.59088556716864,
            y_max: 491.18559127100053,
            ha: 980.7764768381692,
            o: "m 608 -704 b 641 -684 622 -708 634 -696 b 667 -602 660 -660 662 -631 b 685 -190 683 -465 680 -327 l 685 -176 b 831 -127 736 -166 783 -148 b 912 0 901 -94 913 -76 b 886 53 912 36 904 52 b 848 40 877 53 864 49 l 838 36 b 687 -13 789 14 739 -3 b 681 177 687 50 684 114 b 672 338 678 230 677 285 b 654 373 671 350 672 373 b 622 340 636 373 624 361 b 615 262 621 314 613 288 b 619 -22 616 167 619 72 b 569 -22 602 -23 585 -23 b 305 -3 481 -16 395 -1 b 210 -9 274 -3 242 -4 b 301 163 242 52 268 108 b 513 552 377 288 459 412 b 536 652 526 585 536 618 b 533 683 536 662 534 672 b 520 707 531 691 531 707 b 487 693 508 708 494 704 b 474 668 482 684 477 677 b 384 490 454 603 418 547 b 253 281 343 419 295 351 b 73 -13 194 181 145 78 b 29 -108 50 -42 29 -72 b 37 -147 29 -121 32 -134 b 50 -186 43 -160 50 -173 b 68 -216 52 -207 56 -215 b 92 -207 73 -216 82 -213 b 288 -166 156 -180 220 -166 b 556 -186 377 -166 467 -180 b 586 -189 566 -187 576 -187 b 616 -186 596 -189 606 -189 b 606 -432 613 -268 612 -350 b 596 -625 603 -495 596 -559 b 598 -670 596 -641 596 -655 b 608 -704 598 -683 596 -700 z"
        },
        timeSig5: {
            x_min: 19.663871085403297,
            x_max: 583,
            y_min: -389,
            y_max: 389,
            ha: 778,
            o: "m 132 -536 b 249 -560 168 -553 209 -559 b 507 -462 351 -560 454 -514 b 677 -183 588 -384 642 -289 b 694 -85 688 -150 694 -117 b 540 138 694 12 642 94 b 422 173 501 154 462 167 b 400 187 408 174 400 177 b 405 202 400 190 402 196 b 428 284 416 228 426 255 b 469 312 431 307 442 312 b 757 372 569 312 662 343 b 840 490 821 392 840 432 b 812 560 840 540 834 560 b 763 546 801 560 785 556 b 757 543 762 546 759 544 b 465 484 665 505 570 484 b 396 484 452 484 425 487 b 353 454 377 482 366 474 b 281 300 323 405 304 351 b 245 164 262 255 245 212 b 246 144 245 158 246 151 b 233 63 249 115 243 89 b 225 35 228 50 225 40 b 264 14 225 22 236 19 b 445 -26 325 7 387 0 b 569 -151 501 -52 547 -89 b 575 -180 573 -161 575 -170 b 527 -275 575 -217 547 -245 b 347 -367 484 -334 419 -367 b 261 -351 318 -367 289 -363 b 95 -300 206 -333 154 -307 b 55 -321 73 -297 65 -302 b 29 -468 29 -367 40 -419 b 56 -505 26 -482 36 -500 b 132 -536 82 -514 108 -524 z"
        },
        timeSig6: {
            x_min: 20,
            x_max: 565,
            y_min: -363,
            y_max: 363,
            ha: 726,
            o: "m 390 -518 b 621 -458 469 -507 549 -494 b 814 -134 753 -390 814 -281 b 652 59 814 -16 750 58 b 580 48 629 59 606 55 b 233 -334 392 -9 276 -138 b 115 -228 181 -314 143 -278 b 98 -160 104 -206 98 -183 b 107 -109 98 -144 101 -127 b 167 37 124 -59 145 -12 b 508 340 236 189 347 292 b 575 353 530 347 553 353 b 648 327 600 353 625 346 b 665 320 654 321 661 320 b 687 336 674 320 681 325 b 703 405 697 359 703 382 b 684 472 703 429 697 451 b 593 523 664 504 631 521 b 576 521 588 523 582 523 b 297 403 472 508 380 465 b 115 177 217 344 164 264 b 29 -121 60 82 29 -17 b 53 -278 29 -173 36 -225 b 226 -497 82 -374 131 -454 b 347 -523 265 -514 305 -523 b 390 -518 361 -523 376 -521 z m 351 -357 b 312 -351 337 -356 320 -363 b 325 -315 304 -340 320 -327 b 543 -120 373 -222 448 -158 b 622 -104 570 -108 596 -102 b 717 -132 655 -104 687 -112 b 740 -167 732 -143 740 -153 b 730 -196 740 -176 737 -184 b 563 -321 690 -258 634 -300 b 359 -357 497 -341 428 -354 z"
        },
        timeSig7: {
            x_min: 20.3617407597707,
            x_max: 592,
            y_min: -345,
            y_max: 345,
            ha: 690,
            o: "m 253 -497 b 318 -485 276 -497 297 -487 b 366 -441 348 -482 360 -468 b 487 -104 390 -323 433 -210 b 835 403 580 82 701 246 b 852 436 847 416 852 428 b 815 467 852 451 840 461 b 762 474 798 471 779 474 b 674 445 732 474 701 465 b 603 410 652 431 628 420 b 383 360 533 379 459 360 b 200 435 315 360 249 382 b 88 494 168 469 131 485 b 66 497 81 495 73 497 b 33 484 52 497 39 492 b 50 436 22 469 39 451 b 295 310 114 360 199 324 b 406 301 331 304 369 301 b 593 324 468 301 530 308 b 585 307 589 314 588 310 b 265 -249 451 137 338 -46 b 207 -442 242 -312 223 -377 b 204 -462 206 -449 204 -456 b 253 -497 204 -487 220 -497 z"
        },
        timeSig8: {
            x_min: 20,
            x_max: 504.15101530718516,
            y_min: -428,
            y_max: 428,
            ha: 856,
            o: "m 265 -616 b 289 -615 274 -616 281 -616 b 710 -271 492 -592 657 -485 b 726 -148 721 -229 727 -187 b 585 108 726 -48 687 42 b 572 127 576 114 573 120 b 576 144 572 132 575 138 b 598 301 590 196 598 249 b 586 413 598 338 593 376 b 356 616 559 531 467 616 b 233 582 317 616 275 606 b 29 233 101 505 29 384 b 104 9 29 153 46 72 b 189 -48 127 -16 160 -27 b 92 -158 141 -73 114 -114 b 37 -343 63 -217 50 -279 b 33 -390 35 -359 33 -374 b 265 -616 33 -524 148 -616 z m 328 -438 b 158 -276 233 -436 160 -359 b 166 -239 158 -264 161 -252 b 230 -157 176 -203 202 -179 b 367 -72 274 -125 320 -98 b 448 -49 396 -56 423 -49 b 562 -118 491 -49 528 -72 b 611 -251 590 -157 611 -199 b 569 -341 611 -288 595 -318 b 328 -438 500 -402 416 -432 z m 258 105 b 124 148 215 105 167 117 b 96 196 105 163 96 177 b 99 217 96 202 96 209 b 197 384 120 281 151 337 b 350 451 242 429 297 451 b 516 364 412 451 472 422 b 530 331 523 354 530 343 b 530 327 530 330 530 328 l 530 320 b 468 151 520 261 507 200 b 419 122 455 135 442 125 b 258 105 370 117 320 105 z"
        },
        timeSig9: {
            x_min: 20,
            x_max: 494,
            y_min: -421,
            y_max: 421,
            ha: 842,
            o: "m 235 -606 b 361 -564 275 -606 318 -593 b 619 -229 487 -482 566 -366 b 706 127 664 -114 694 4 b 711 233 708 163 711 197 b 700 346 711 271 708 308 b 389 606 658 517 530 606 b 351 605 376 606 364 606 b 56 272 171 586 56 441 b 96 98 56 216 69 156 b 334 -53 144 -3 238 -53 b 544 36 408 -53 484 -24 b 652 176 586 78 622 124 b 631 71 645 141 639 105 b 467 -302 599 -63 562 -196 b 271 -442 412 -364 354 -422 b 225 -448 255 -446 239 -448 b 95 -305 148 -448 98 -395 b 89 -255 95 -288 94 -271 b 73 -233 86 -246 85 -233 b 52 -248 65 -233 56 -239 b 29 -317 42 -271 30 -291 b 49 -448 29 -361 40 -405 b 235 -606 69 -541 144 -606 z m 340 104 b 144 209 264 108 194 141 b 127 258 132 225 127 240 b 137 297 127 271 130 284 b 366 449 184 396 269 449 b 517 408 415 449 467 436 b 595 348 546 392 572 372 b 616 305 608 336 616 321 b 609 281 616 298 613 289 b 340 104 557 184 477 104 z"
        },
        timeSigCommon: {
            x_min: 20,
            x_max: 585,
            y_min: -298,
            y_max: 294.49658092772603,
            ha: 592.496580927726,
            o: "m 444 -405 b 829 -45 626 -346 740 -207 b 842 26 842 -23 842 1 b 821 58 842 39 841 58 b 795 40 811 58 802 48 b 765 3 785 29 773 16 b 469 -223 690 -104 596 -183 b 354 -242 431 -235 392 -242 b 180 -177 292 -242 235 -223 b 135 -99 154 -157 140 -131 b 132 -59 134 -85 132 -72 b 141 7 132 -37 135 -16 b 449 274 189 160 297 243 b 477 278 459 276 468 276 b 546 203 517 278 539 253 b 517 157 550 177 533 166 b 485 143 507 153 497 143 l 482 143 b 467 148 478 143 472 144 b 374 183 438 170 406 181 b 264 118 333 183 292 161 b 238 48 246 92 238 69 b 261 -9 238 29 245 10 b 383 -73 287 -39 337 -73 b 412 -68 392 -73 402 -72 b 631 164 526 -27 586 59 b 649 252 644 193 649 222 b 636 328 649 278 645 304 b 504 423 615 400 579 429 b 242 318 408 415 317 387 b 29 -158 104 190 29 33 b 30 -176 29 -164 29 -170 b 115 -364 42 -246 52 -315 b 307 -429 177 -410 240 -429 b 444 -405 351 -429 397 -420 z"
        },
        timeSigCutCommon: {
            x_min: 20,
            x_max: 695,
            y_min: -687.0379164869064,
            y_max: 687,
            ha: 1374.0379164869064,
            o: "m 564 -989 b 595 -945 585 -991 589 -963 l 599 -922 b 605 -628 600 -824 603 -726 l 609 -399 b 878 -251 706 -363 798 -320 b 996 -85 932 -204 976 -153 b 1001 -63 998 -78 1001 -71 b 989 -46 1001 -56 998 -49 b 978 -43 985 -45 982 -43 b 950 -59 968 -43 959 -49 b 733 -216 894 -132 815 -177 b 611 -259 694 -235 652 -249 b 616 -20 612 -179 615 -99 b 680 29 642 -7 665 9 b 698 43 685 36 690 40 b 870 251 792 82 840 160 b 877 294 874 265 877 279 b 818 410 877 338 855 382 b 683 458 779 442 730 448 b 625 468 664 462 644 465 l 625 514 b 638 958 626 662 636 811 b 626 989 638 979 635 989 b 603 981 621 989 613 986 b 422 840 534 945 481 888 b 412 805 412 832 413 818 b 426 713 410 773 420 743 b 445 678 429 690 435 678 b 474 691 452 678 461 683 b 563 755 503 710 530 732 b 564 724 564 740 564 733 b 559 469 563 639 560 554 b 462 454 526 469 494 464 b 112 143 302 399 199 281 b 33 -94 66 71 45 -10 b 29 -148 30 -112 29 -131 b 105 -351 29 -223 52 -291 b 359 -455 171 -426 258 -451 b 517 -431 409 -451 464 -446 b 539 -422 524 -428 531 -425 l 539 -477 b 533 -739 536 -563 539 -651 b 530 -824 531 -768 530 -795 b 546 -948 530 -865 533 -907 b 564 -989 552 -962 543 -989 z m 410 -288 b 193 -197 328 -288 253 -264 b 141 -60 160 -161 141 -108 b 157 6 141 -35 147 -12 b 259 158 189 58 217 112 b 438 291 311 215 364 266 b 528 305 468 301 498 305 b 554 304 537 305 546 304 b 553 212 554 274 554 242 b 426 115 498 199 446 164 b 416 68 419 99 416 84 b 425 12 416 49 420 30 b 474 -39 432 -17 448 -32 b 513 -43 487 -42 498 -43 b 547 -40 524 -43 536 -42 l 543 -272 b 461 -285 516 -278 488 -281 b 410 -288 444 -287 426 -288 z m 694 197 b 668 203 685 197 677 199 b 621 216 654 210 638 215 b 622 294 622 242 622 268 b 706 268 651 287 678 278 b 746 235 721 261 734 249 b 752 222 749 230 752 226 b 743 213 752 219 749 215 b 694 197 727 206 711 197 z"
        },
        noteheadDoubleWhole: {
            x_min: -.4444444444444444,
            x_max: 614.1875,
            y_min: -223.03296670127517,
            y_max: 223,
            ha: 446.0329667012752,
            o: "m 488 -242 b 693 -79 595 -249 685 -166 l 693 -55 b 690 0 693 -36 691 -17 b 540 187 684 84 621 164 b 449 200 508 196 480 200 b 210 104 363 200 282 163 b 186 56 196 92 186 76 b 207 -82 186 9 192 -37 b 300 -204 225 -132 248 -181 b 488 -242 356 -229 415 -240 z m 35 -321 b 62 -266 58 -318 58 -288 l 62 -194 b 63 50 62 -114 63 -32 b 60 189 63 96 63 143 b 43 300 59 226 60 265 b 29 321 40 308 39 321 l 26 321 b 0 292 13 318 0 310 b 0 248 0 278 -1 262 b 6 147 4 215 6 181 b 4 48 6 114 4 81 b 6 0 4 32 6 16 b 7 -36 7 -12 7 -24 l 7 -52 b 6 -156 7 -86 6 -121 b 19 -275 6 -196 9 -236 b 35 -321 23 -291 16 -323 z m 128 -261 b 144 -251 135 -264 141 -256 b 158 -203 156 -236 157 -220 b 161 -137 161 -181 161 -158 b 157 30 161 -81 157 -26 b 158 76 157 45 157 60 l 158 101 b 156 225 158 141 158 183 b 137 253 156 235 154 253 l 134 253 b 109 222 120 251 109 242 b 104 91 108 179 104 134 b 108 -58 104 42 109 -9 b 107 -105 108 -73 108 -89 b 105 -127 107 -112 107 -120 b 118 -245 105 -167 114 -204 b 128 -261 118 -252 121 -259 z m 490 -88 b 449 -86 477 -88 464 -88 b 287 -56 399 -85 341 -78 b 258 -33 275 -52 258 -48 b 282 -7 258 -20 272 -13 b 458 43 340 23 399 43 b 580 14 497 43 537 35 b 618 -20 606 1 619 -9 b 592 -58 618 -30 609 -42 b 490 -88 562 -82 528 -88 z m 757 -291 b 793 -171 796 -255 792 -212 b 795 -49 795 -131 795 -91 b 786 207 795 36 791 121 b 779 240 786 217 783 229 b 766 258 776 246 776 258 b 762 256 765 258 763 256 b 739 236 752 253 740 252 b 733 177 737 216 732 197 b 737 20 737 125 739 73 l 737 -107 b 740 -202 737 -138 739 -170 b 757 -291 740 -230 743 -261 z m 847 -314 b 871 -288 860 -315 867 -300 b 884 -187 881 -255 886 -222 b 876 115 878 -86 876 14 b 877 255 876 161 876 209 b 868 291 877 268 873 279 b 855 304 867 301 863 304 b 844 301 852 304 848 304 b 822 265 825 292 822 278 b 824 251 822 259 822 255 b 822 170 822 225 822 197 l 822 -20 b 835 -284 827 -86 825 -186 b 847 -314 837 -295 835 -311 z"
        },
        noteheadWhole: {
            x_min: 0,
            x_max: 380.16649762501584,
            y_min: -186.17102907059297,
            y_max: 165,
            ha: 351.17102907059297,
            o: "m 547 40 b 223 -268 543 -151 367 -259 b 102 -233 180 -271 143 -248 l 62 -216 b 0 -127 22 -197 0 -166 b 6 -91 0 -115 1 -104 b 122 141 33 -9 69 71 b 327 238 170 204 249 238 b 514 158 397 238 467 212 b 547 40 544 125 549 84 z m 248 -107 b 384 -63 295 -102 341 -88 b 426 -23 402 -53 415 -40 b 435 3 432 -14 435 -6 b 413 32 435 14 428 24 b 301 73 376 49 343 73 b 272 69 291 73 282 72 b 121 -35 207 53 157 20 b 111 -58 117 -42 111 -50 b 125 -75 111 -65 115 -71 b 248 -107 164 -89 202 -107 z"
        },
        noteheadHalf: {
            x_min: 0,
            x_max: 334,
            y_min: -174,
            y_max: 175,
            ha: 349,
            o: "m 480 56 b 167 -251 478 -115 331 -251 b 94 -242 143 -251 118 -248 b 9 -141 43 -229 20 -192 b 0 -68 3 -115 0 -91 b 284 249 0 95 127 200 b 304 252 289 251 297 252 b 481 78 374 252 481 170 b 480 56 481 71 481 63 z m 213 -102 b 399 6 274 -81 341 -48 b 402 17 400 7 402 13 b 399 27 402 22 400 26 b 311 94 373 53 353 88 b 292 95 305 95 300 95 b 130 27 230 95 181 55 b 69 -62 98 9 62 -29 b 161 -98 76 -98 128 -91 b 213 -102 174 -101 186 -101 z"
        },
        noteheadBlack: {
            x_min: 0,
            x_max: 334.04644433966797,
            y_min: -164,
            y_max: 164,
            ha: 328,
            o: "m 112 -233 b 141 -236 122 -235 131 -236 b 481 104 279 -236 485 -48 b 403 222 477 141 478 192 b 334 236 382 232 359 236 b 1 -59 180 236 13 59 b 0 -85 1 -68 0 -76 b 112 -233 0 -157 32 -215 z"
        },
        noteheadXWhole: {
            x_min: 0,
            x_max: 506,
            y_min: -143.0823320899293,
            y_max: 144,
            ha: 287.0823320899293,
            o: "m 53 -206 b 219 -163 117 -207 170 -196 b 314 -102 249 -141 282 -122 b 377 -63 334 -89 356 -76 b 514 -161 422 -96 468 -128 b 576 -196 534 -174 552 -196 b 589 -193 580 -196 585 -196 b 688 -174 625 -194 657 -181 b 711 -158 698 -171 711 -173 b 696 -143 711 -151 701 -147 b 503 -9 632 -98 567 -52 b 485 4 497 -4 491 0 b 704 145 559 49 634 95 b 729 164 711 150 729 151 l 729 168 b 696 196 726 183 710 193 b 621 207 671 202 645 207 b 528 177 589 207 557 200 b 373 76 480 140 426 108 b 246 164 330 104 287 132 b 122 206 207 193 167 203 b 66 192 102 207 72 207 b 99 147 58 173 85 158 b 274 14 157 102 215 58 b 16 -164 184 -42 96 -98 b 0 -179 12 -168 0 -170 b 1 -183 0 -180 0 -183 b 26 -204 6 -193 12 -204 b 53 -206 37 -206 49 -206 z m 611 -177 b 376 -9 530 -118 452 -63 b 164 -143 305 -53 235 -98 b 104 -164 147 -154 130 -164 b 82 -161 96 -164 89 -164 b 230 -65 137 -125 183 -95 l 347 12 b 327 26 341 16 334 22 b 196 121 284 58 239 89 b 163 147 184 128 173 137 b 140 173 154 154 140 163 b 143 180 140 176 141 177 b 179 166 154 194 167 174 b 372 27 243 120 307 73 l 566 153 b 613 171 580 161 596 170 b 635 160 624 171 635 174 b 621 147 635 153 626 150 l 429 24 b 400 6 419 19 409 13 b 569 -117 456 -35 513 -75 b 611 -177 588 -130 608 -143 z"
        },
        noteheadXHalf: {
            x_min: 0,
            x_max: 421,
            y_min: -145.51844828189743,
            y_max: 151,
            ha: 296.51844828189746,
            o: "m 490 -209 b 539 -207 505 -207 521 -207 b 606 -209 560 -207 583 -209 b 598 -196 602 -203 600 -199 b 406 -19 533 -135 469 -78 l 540 130 b 547 144 546 135 547 140 b 536 156 547 148 543 153 b 488 192 518 166 503 176 b 416 217 471 209 444 217 b 323 180 380 217 344 204 l 264 115 b 239 138 256 122 248 131 b 33 197 180 196 108 200 b 3 186 23 197 6 193 b 19 154 -1 174 10 163 b 171 12 69 107 120 59 b 19 -157 120 -45 69 -101 b 0 -177 14 -163 0 -166 b 1 -181 0 -179 0 -180 b 39 -203 9 -197 22 -203 l 186 -203 b 197 -202 190 -202 193 -200 b 213 -202 203 -202 207 -202 b 262 -180 228 -202 246 -199 b 314 -122 279 -161 297 -141 b 490 -209 363 -170 412 -216 z m 435 -148 b 291 -30 379 -112 337 -69 l 213 -118 b 190 -137 207 -125 202 -137 b 145 -111 173 -130 154 -127 b 160 -79 137 -98 151 -88 b 238 16 184 -48 212 -16 b 141 99 204 43 173 72 b 124 117 135 105 130 111 b 115 132 121 121 115 127 b 118 137 115 134 117 137 b 141 132 127 147 135 138 l 253 36 b 347 150 285 75 315 112 b 370 164 354 160 363 163 b 403 145 382 164 393 156 b 416 127 412 140 416 132 b 405 102 416 118 412 111 l 307 -10 b 413 -105 343 -42 379 -73 b 435 -148 425 -115 436 -125 z"
        },
        noteheadXBlack: {
            x_min: 0,
            x_max: 289,
            y_min: -156,
            y_max: 157,
            ha: 313,
            o: "m 23 -225 b 69 -204 40 -223 56 -219 b 137 -131 92 -180 115 -157 l 209 -50 b 377 -197 264 -101 321 -148 b 403 -210 384 -203 393 -210 b 408 -210 405 -210 406 -210 b 416 -192 416 -207 416 -199 b 416 -186 416 -190 416 -187 b 403 -148 416 -171 413 -158 b 344 -81 384 -125 367 -101 b 252 -1 312 -55 282 -29 b 377 157 297 49 340 101 b 402 202 387 170 402 187 b 395 217 402 207 400 213 b 376 226 389 223 382 226 b 334 192 360 226 346 204 b 206 42 289 143 248 94 b 96 161 167 81 131 120 b 60 193 86 174 76 189 b 33 206 52 196 42 206 b 22 199 29 206 26 204 b 10 173 14 190 10 181 b 22 147 10 166 14 157 b 148 7 62 98 104 52 b 164 -7 154 1 158 -3 b 10 -189 111 -66 55 -122 b 0 -212 6 -197 0 -203 b 1 -217 0 -213 0 -216 b 23 -225 4 -226 14 -222 z"
        },
        noteheadCircleX: {
            x_min: 0,
            x_max: 344,
            y_min: -179,
            y_max: 175.12551922594866,
            ha: 354.12551922594866,
            o: "m 99 -210 b 236 -258 137 -242 186 -258 b 418 -183 305 -258 374 -230 b 495 33 475 -120 495 -48 b 494 66 495 45 494 55 b 302 252 487 183 405 256 b 181 243 262 249 222 248 b 46 171 128 236 79 219 b 0 19 14 127 0 73 b 99 -210 0 -68 35 -156 z m 89 -120 b 48 0 56 -82 48 -42 b 89 112 48 35 59 76 b 109 101 96 111 102 108 l 210 7 l 187 -17 b 89 -120 151 -53 125 -82 z m 176 -183 b 127 -163 158 -179 141 -171 l 252 -32 l 372 -144 b 233 -189 334 -173 285 -189 b 176 -183 215 -189 196 -187 z m 245 42 b 124 156 204 79 164 118 b 200 176 145 166 170 173 b 337 183 245 181 291 184 b 377 176 351 183 364 180 b 245 42 333 131 288 86 z m 405 -112 l 392 -99 l 285 3 l 400 121 b 418 154 409 131 418 140 b 465 50 448 130 465 94 b 405 -112 462 -17 439 -73 z"
        },
        noteheadTriangleUpWhole: {
            x_min: 0,
            x_max: 366,
            y_min: -145,
            y_max: 138,
            ha: 283,
            o: "m 55 -209 l 504 -209 b 527 -199 520 -209 527 -206 b 520 -180 527 -193 524 -187 b 459 -94 501 -151 480 -122 b 279 170 400 -6 341 82 b 242 199 266 190 253 199 b 206 167 230 199 219 189 b 10 -145 140 63 76 -42 b 0 -171 3 -156 0 -164 b 23 -200 0 -183 9 -192 b 55 -209 33 -206 45 -209 z m 202 -161 b 176 -137 183 -163 176 -156 b 187 -62 176 -111 179 -86 b 253 95 206 -10 228 42 b 337 -132 307 24 334 -49 b 311 -161 338 -153 334 -161 b 256 -160 294 -161 275 -160 b 202 -161 238 -160 220 -161 z"
        },
        noteheadTriangleUpHalf: {
            x_min: 0,
            x_max: 341.0833130378007,
            y_min: -159,
            y_max: 159,
            ha: 318,
            o: "m 458 -226 b 478 -229 462 -223 469 -229 b 490 -222 482 -229 487 -228 b 477 -184 495 -207 484 -196 b 281 176 410 -65 346 56 b 238 225 269 194 261 213 b 225 229 232 226 228 228 b 209 215 217 229 213 225 b 4 -153 141 92 73 -30 b 0 -170 1 -158 0 -164 b 12 -189 0 -177 4 -183 b 66 -215 27 -202 43 -213 b 458 -226 194 -217 323 -222 z m 278 -170 l 151 -167 b 298 75 204 -89 240 -1 b 301 82 300 76 301 79 b 357 -22 320 48 338 13 b 344 -43 353 -27 350 -37 b 285 -163 317 -79 312 -127 b 278 -170 282 -166 279 -167 z"
        },
        noteheadTriangleUpBlack: {
            x_min: 0,
            x_max: 346,
            y_min: -149,
            y_max: 149,
            ha: 298,
            o: "m 481 -215 b 498 -209 487 -215 492 -215 b 482 -173 498 -194 488 -184 l 284 173 b 259 202 278 184 269 194 b 229 215 248 210 238 215 b 196 189 216 215 206 206 l 13 -150 b 3 -168 9 -156 6 -163 b 0 -180 1 -173 0 -177 b 12 -197 0 -187 4 -193 b 63 -213 29 -206 45 -213 b 481 -215 203 -213 343 -215 z"
        },
        noteheadDiamondWhole: {
            x_min: 0,
            x_max: 271,
            y_min: -132,
            y_max: 132,
            ha: 264,
            o: "m 230 -177 b 256 -190 240 -186 249 -190 b 281 -173 265 -190 272 -184 b 382 -29 314 -124 347 -76 b 390 -10 387 -22 390 -14 b 376 12 390 -3 386 4 b 173 177 308 66 240 121 b 144 190 166 183 160 190 b 98 153 127 186 112 170 b 13 40 69 115 42 76 b 0 13 4 29 0 20 b 22 -19 0 3 7 -9 b 230 -177 92 -69 163 -122 z m 279 -128 b 261 -122 274 -134 266 -127 l 66 30 b 56 45 59 35 56 39 b 62 56 56 48 59 52 b 122 122 91 101 105 122 b 194 76 138 122 158 107 l 320 -26 b 336 -50 325 -32 336 -35 b 279 -128 318 -75 300 -102 z"
        },
        noteheadDiamondHalf: {
            x_min: 0,
            x_max: 295,
            y_min: -148,
            y_max: 148,
            ha: 296,
            o: "m 228 -207 b 245 -213 235 -210 240 -213 b 264 -203 252 -213 258 -210 b 415 -46 314 -150 364 -98 b 425 -27 420 -40 425 -35 b 416 -10 425 -22 422 -16 b 217 200 350 60 284 131 b 194 213 212 207 204 213 b 170 196 181 213 177 203 b 14 33 118 143 68 86 b 0 7 4 23 0 16 b 17 -20 0 -1 6 -10 b 118 -114 52 -50 82 -85 b 228 -207 156 -144 184 -184 z m 209 -157 b 134 -69 177 -138 141 -115 b 130 -26 131 -55 130 -40 b 215 148 130 42 160 99 b 225 156 217 151 220 156 b 230 153 226 156 228 156 b 323 -26 276 104 321 55 b 298 -75 324 -42 315 -59 b 265 -109 287 -86 276 -99 b 209 -157 245 -125 228 -167 z"
        },
        noteheadDiamondBlack: {
            x_min: 0,
            x_max: 310,
            y_min: -146,
            y_max: 146,
            ha: 292,
            o: "m 266 -210 b 289 -194 278 -209 284 -200 b 406 -76 330 -156 367 -115 b 446 -23 433 -49 446 -36 b 412 29 446 -10 435 3 b 405 36 409 30 408 33 b 252 196 354 89 304 143 b 225 210 243 204 235 210 b 204 202 219 210 212 209 b 10 24 141 141 75 82 b 0 9 4 19 0 14 b 9 -6 0 4 3 0 l 232 -192 b 266 -210 242 -200 256 -204 z"
        },
        noteheadSquareWhite: {
            x_min: 0,
            x_max: 350,
            y_min: -131,
            y_max: 131,
            ha: 262,
            o: "m 468 -189 b 485 -187 474 -189 480 -189 b 500 -176 495 -187 500 -183 b 498 -168 500 -174 498 -171 b 497 -166 498 -167 497 -167 l 498 -164 b 504 -154 503 -163 504 -158 b 503 -138 504 -150 503 -144 b 503 -135 503 -137 503 -137 l 503 -94 b 492 66 500 -45 494 10 b 488 135 492 89 488 112 b 484 150 488 141 485 145 b 482 154 482 151 482 153 b 429 189 472 177 456 189 b 53 184 304 186 179 186 l 39 184 b 33 181 36 183 35 183 b 12 160 20 181 12 177 b 0 -109 9 71 4 -19 b 19 -137 0 -125 7 -134 b 23 -151 19 -141 20 -145 b 85 -187 37 -173 55 -187 b 468 -189 212 -187 340 -187 z m 246 -127 l 246 -125 l 63 -125 b 66 -111 65 -122 66 -117 b 73 72 69 -50 71 10 l 73 130 b 88 128 78 128 82 128 b 148 130 108 130 128 130 b 271 128 190 130 230 128 l 271 130 l 420 130 b 428 20 425 92 425 56 l 436 -127 z"
        },
        noteheadSquareBlack: {
            x_min: 0,
            x_max: 342,
            y_min: -129.98961937716263,
            y_max: 132.44444444444446,
            ha: 262.4340638216071,
            o: "m 217 190 b 439 186 304 190 372 190 b 467 180 448 184 458 183 b 492 145 484 176 492 167 b 490 -124 490 56 490 -33 b 488 -141 490 -130 488 -135 b 456 -170 488 -163 478 -168 b 118 -183 344 -176 230 -181 b 29 -184 89 -183 60 -192 b 0 -148 4 -180 0 -168 b 1 29 1 -89 1 -30 b 1 156 1 71 1 114 b 36 190 3 187 4 190 b 217 190 102 192 168 190 z"
        },
        augmentationDot: {
            x_min: 0,
            x_max: 96,
            y_min: -57,
            y_max: 57,
            ha: 114,
            o: "m 13 -82 b 16 -81 14 -82 14 -82 b 105 -73 46 -76 75 -76 b 131 -48 121 -72 131 -60 b 138 26 134 -24 138 0 b 137 48 138 33 138 40 b 108 82 134 71 125 82 b 95 81 104 82 99 82 b 33 71 75 78 53 75 b 4 46 20 68 6 62 b 0 -66 1 9 0 -29 b 13 -82 0 -73 1 -82 z"
        },
        tremolo1: {
            x_min: -158,
            x_max: 156.19381479578487,
            y_min: -88,
            y_max: 88,
            ha: 176,
            o: "m -206 -127 b -194 -125 -203 -127 -199 -127 b 173 -36 -72 -94 50 -65 b 220 16 202 -29 215 -12 b 225 50 223 30 225 45 b 216 107 226 76 222 91 b 194 127 210 120 204 127 b 183 124 192 127 189 127 l -192 33 b -226 -9 -213 27 -222 14 b -228 -32 -226 -16 -228 -23 b -222 -108 -228 -58 -222 -82 b -206 -127 -222 -120 -217 -127 z"
        },
        flag8thUp: {
            x_min: 0,
            x_max: 261,
            y_min: -819,
            y_max: 0,
            ha: 819,
            o: "m 265 -1171 b 351 -1035 301 -1130 336 -1087 b 376 -867 369 -979 376 -923 b 367 -755 376 -829 373 -792 b 233 -422 350 -632 311 -520 b 131 -291 199 -379 166 -334 b 65 -125 91 -239 66 -192 b 62 -75 65 -112 62 -91 b 42 0 62 -49 52 -24 l 35 0 b 0 -63 6 -13 0 -36 l 0 -144 b 96 -445 0 -255 29 -356 b 177 -547 124 -478 150 -514 b 308 -831 246 -629 298 -721 b 317 -890 310 -851 317 -871 b 311 -919 317 -900 315 -910 b 256 -1005 297 -950 282 -984 b 228 -1068 233 -1024 228 -1045 b 230 -1106 228 -1080 229 -1093 b 240 -1162 232 -1125 239 -1143 b 251 -1179 242 -1174 246 -1179 b 265 -1171 255 -1179 259 -1176 z"
        },
        flag8thDown: {
            x_min: 0,
            x_max: 261,
            y_min: 0,
            y_max: 819,
            ha: 819,
            o: "m 265 1171 b 251 1179 259 1176 255 1179 b 240 1162 246 1179 242 1174 b 230 1106 239 1143 232 1125 b 228 1068 229 1093 228 1080 b 256 1005 228 1045 233 1024 b 311 919 282 984 297 950 b 317 890 315 910 317 900 b 308 831 317 871 310 851 b 177 547 298 721 246 629 b 96 445 150 514 124 478 b 0 144 29 356 0 255 l 0 63 b 35 0 0 36 6 13 l 42 0 b 62 75 52 24 62 49 b 59 117 62 91 59 104 b 131 291 60 183 91 239 b 233 422 166 334 199 379 b 367 755 311 520 350 632 b 376 867 373 792 376 829 b 351 1035 376 923 369 979 b 265 1171 336 1087 301 1130 z"
        },
        flag16thUp: {
            x_min: 0,
            x_max: 327.1591498636094,
            y_min: -819.3972596310256,
            y_max: 0,
            ha: 819.3972596310256,
            o: "m 415 -1179 b 435 -1168 423 -1182 429 -1174 b 451 -1138 442 -1159 446 -1149 b 465 -1020 464 -1102 467 -1064 b 461 -962 464 -1004 464 -984 b 471 -821 467 -916 472 -870 b 465 -721 472 -791 467 -756 b 415 -520 459 -651 441 -585 b 200 -245 370 -408 284 -327 b 96 -114 160 -206 118 -168 b 75 -24 84 -85 85 -53 b 59 0 72 -16 72 0 b 53 -1 58 0 56 -1 b 27 -32 40 -6 27 -10 b 29 -68 27 -43 29 -55 b 10 -79 20 -69 13 -72 b 1 -109 6 -89 1 -99 b 0 -170 0 -130 0 -148 b 35 -410 0 -252 12 -333 b 258 -793 76 -557 156 -681 b 409 -1158 350 -896 410 -1014 b 415 -1179 409 -1165 405 -1175 z m 413 -816 b 331 -681 392 -769 364 -723 b 145 -420 266 -596 189 -521 b 86 -281 125 -374 102 -330 b 156 -370 105 -312 128 -343 b 318 -539 210 -425 269 -478 b 413 -816 383 -621 420 -713 z"
        },
        flag16thDown: {
            x_min: 0,
            x_max: 327.1591498636094,
            y_min: 0,
            y_max: 819,
            ha: 819,
            o: "m 59 0 b 75 24 72 0 72 16 b 96 114 85 53 84 85 b 200 245 118 168 160 206 b 415 520 284 327 370 408 b 465 721 441 585 459 651 b 471 821 467 756 472 791 b 461 962 472 870 467 916 b 465 1020 464 984 464 1004 b 451 1138 467 1064 464 1102 b 435 1168 446 1149 442 1159 b 418 1179 431 1172 425 1179 b 415 1179 418 1179 416 1179 b 408 1169 409 1176 408 1174 b 409 1158 408 1165 409 1161 b 258 793 410 1014 350 896 b 35 410 156 681 76 557 b 0 170 12 333 0 252 b 0 88 0 148 0 108 b 29 7 0 71 6 23 b 59 0 33 4 58 0 z m 86 281 b 145 420 102 330 125 374 b 331 681 189 521 266 596 b 413 816 364 723 392 769 b 415 791 413 808 415 799 b 318 539 415 698 377 613 b 156 370 269 478 210 425 b 86 281 128 343 105 312 z"
        },
        flag32ndUp: {
            x_min: -.19862981551275186,
            x_max: 268.0942440943661,
            y_min: -849.4710740978672,
            y_max: 149.0769891455102,
            ha: 998.5480632433774,
            o: "m 323 -1223 b 351 -1198 337 -1227 344 -1210 b 359 -1184 354 -1194 356 -1188 b 386 -999 377 -1122 387 -1060 b 341 -783 386 -927 372 -855 b 330 -736 334 -769 330 -753 b 333 -708 330 -727 330 -717 b 344 -621 340 -678 344 -649 b 341 -579 344 -608 343 -593 b 328 -500 338 -553 328 -526 b 331 -475 328 -491 328 -484 b 347 -370 343 -438 348 -402 b 151 27 348 -212 288 -56 b 53 176 98 59 50 102 b 45 197 53 183 48 192 b 33 215 40 203 40 216 l 30 215 b 6 194 22 212 9 209 b 0 120 3 170 -1 145 b 0 -43 4 65 0 13 b 0 -98 0 -60 1 -79 b 4 -276 0 -157 6 -216 b 7 -456 4 -337 7 -397 b 66 -638 7 -523 22 -585 b 158 -724 94 -671 127 -697 b 318 -1011 246 -801 295 -899 b 321 -1044 321 -1021 321 -1032 b 312 -1152 321 -1080 312 -1116 b 317 -1192 312 -1165 314 -1179 b 323 -1223 320 -1202 311 -1220 z m 275 -657 b 111 -492 226 -589 163 -547 b 65 -376 78 -456 66 -418 b 71 -323 65 -360 68 -341 b 275 -657 164 -418 265 -504 z m 285 -376 b 121 -180 249 -289 173 -245 b 91 -105 104 -158 92 -135 b 288 -354 181 -144 288 -269 b 285 -376 288 -363 287 -370 z"
        },
        flag32ndDown: {
            x_min: -2.800802874905624,
            x_max: 268.09424409436605,
            y_min: -169.07698914551014,
            y_max: 829.4710740978672,
            ha: 998.5480632433773,
            o: "m 323 1194 b 317 1164 311 1191 320 1174 b 312 1123 314 1151 312 1136 b 321 1015 312 1087 321 1051 b 318 982 321 1004 321 992 b 158 696 295 870 246 772 b 66 609 127 668 94 642 b 7 428 22 556 7 494 b 4 248 7 369 4 308 b -1 78 6 187 -10 137 b 0 14 0 59 0 32 b 0 -148 0 -42 0 -94 b 6 -223 0 -174 3 -199 b 30 -243 9 -238 22 -240 l 33 -243 b 45 -226 40 -245 40 -232 b 53 -204 48 -220 53 -212 b 151 -56 50 -131 98 -88 b 347 341 288 27 348 183 b 331 446 348 373 343 409 b 328 471 328 455 328 462 b 341 550 328 497 338 524 b 344 592 343 564 344 579 b 333 680 344 621 340 649 b 330 707 330 688 330 698 b 341 755 330 724 334 740 b 386 971 372 827 386 899 b 359 1155 387 1031 377 1093 b 351 1169 356 1159 354 1165 b 323 1194 344 1181 337 1198 z m 275 628 b 71 294 265 475 164 389 b 65 347 68 312 65 331 b 111 464 66 389 78 428 b 275 628 163 518 226 560 z m 285 347 b 288 325 287 341 288 334 b 91 76 288 240 181 115 b 121 151 92 107 104 130 b 285 347 173 216 249 261 z"
        },
        flag64thUp: {
            x_min: -4,
            x_max: 282,
            y_min: -823.5430338167067,
            y_max: 347,
            ha: 1170.5430338167066,
            o: "m 350 -1185 b 380 -1162 364 -1189 374 -1175 b 406 -1022 399 -1119 406 -1071 b 359 -798 406 -945 384 -871 b 348 -756 353 -785 348 -772 b 350 -744 348 -753 350 -749 b 363 -621 356 -704 363 -664 b 360 -580 363 -608 363 -593 b 359 -560 359 -573 359 -567 b 373 -490 359 -536 366 -513 b 393 -346 386 -444 393 -395 b 387 -269 393 -320 390 -294 b 348 -127 382 -219 348 -173 b 351 -104 348 -120 348 -111 b 353 -65 351 -91 353 -78 b 341 37 353 -26 348 6 b 226 215 323 108 278 164 b 86 336 181 258 127 288 b 62 395 72 353 62 370 b 42 481 62 423 55 454 b 27 500 37 488 36 500 b 24 498 26 500 26 500 b -1 480 14 497 1 492 b -6 444 -4 467 -6 455 l -6 435 b -1 341 -1 403 -1 372 l -1 266 b 6 156 -1 230 0 193 b 13 35 12 117 13 75 l 13 -35 b 14 -85 13 -52 14 -68 b 29 -276 19 -150 33 -213 b 20 -448 24 -334 20 -392 b 24 -534 20 -477 22 -505 b 114 -708 30 -605 59 -664 b 197 -780 143 -732 171 -755 b 344 -1153 301 -884 341 -1011 b 343 -1172 344 -1159 343 -1166 b 350 -1185 343 -1176 344 -1182 z m 300 -691 b 117 -508 243 -616 168 -575 b 82 -408 94 -480 82 -448 b 84 -379 82 -397 82 -387 b 259 -553 135 -451 206 -492 b 301 -667 287 -583 301 -619 b 300 -691 301 -674 301 -683 z m 298 -410 b 118 -235 238 -351 176 -295 b 76 -88 82 -197 78 -147 b 268 -252 137 -153 203 -202 b 330 -360 304 -279 330 -315 b 323 -402 330 -373 327 -387 b 311 -418 318 -413 315 -418 b 298 -410 307 -418 302 -415 z m 287 -88 b 62 193 186 -17 79 48 b 229 52 121 144 174 98 b 289 -33 256 29 274 -3 b 295 -56 294 -42 295 -49 b 287 -88 295 -66 292 -76 z"
        },
        flag64thDown: {
            x_min: -5,
            x_max: 281,
            y_min: -375,
            y_max: 795.5430338167066,
            ha: 1170.5430338167066,
            o: "m 348 1145 b 341 1132 343 1142 341 1136 b 343 1113 341 1126 343 1119 b 196 740 340 971 300 844 b 112 668 170 714 141 691 b 23 494 58 624 29 564 b 19 408 20 465 19 436 b 27 236 19 351 23 294 b 13 45 32 173 17 109 b 12 -6 13 27 12 12 l 12 -75 b 4 -196 12 -115 10 -157 b -3 -307 -1 -233 -3 -271 l -3 -382 b -7 -475 -3 -412 -3 -444 l -7 -484 b -3 -520 -7 -495 -6 -507 b 23 -539 0 -533 13 -537 b 26 -540 24 -540 24 -540 b 40 -521 35 -540 36 -528 b 60 -435 53 -494 60 -464 b 85 -376 60 -410 71 -393 b 225 -255 125 -328 180 -298 b 340 -78 276 -204 321 -148 b 351 24 347 -46 351 -14 b 350 63 351 37 350 50 b 347 86 347 71 347 79 b 386 229 347 132 380 179 b 392 305 389 253 392 279 b 372 449 392 354 384 403 b 357 520 364 472 357 495 b 359 540 357 527 357 533 b 361 580 361 553 361 567 b 348 704 361 624 354 664 b 347 716 348 708 347 713 b 357 757 347 732 351 744 b 405 982 383 831 405 904 b 379 1122 405 1031 397 1079 b 348 1145 373 1135 363 1149 z m 298 651 b 300 626 300 642 300 634 b 258 513 300 579 285 543 b 82 338 204 452 134 410 b 81 367 81 347 81 357 b 115 468 81 408 92 439 b 298 651 167 534 242 576 z m 297 370 b 310 377 301 374 305 377 b 321 361 314 377 317 373 b 328 320 325 347 328 333 b 266 212 328 275 302 239 b 75 48 202 161 135 112 b 117 194 76 107 81 157 b 297 370 174 255 236 311 z m 285 48 b 294 16 291 36 294 26 b 288 -7 294 9 292 1 b 228 -92 272 -37 255 -69 b 60 -233 173 -138 120 -184 b 285 48 78 -88 184 -23 z"
        },
        flag128thUp: {
            x_min: 0,
            x_max: 252,
            y_min: -804,
            y_max: 530,
            ha: 1334,
            o: "m 298 -1158 b 328 -1126 312 -1158 320 -1139 b 330 -1116 330 -1123 330 -1119 b 347 -996 343 -1076 347 -1037 b 328 -837 347 -943 338 -890 b 320 -778 324 -816 320 -798 b 330 -733 320 -763 323 -749 b 340 -665 338 -714 337 -688 b 341 -645 340 -660 341 -652 b 333 -534 341 -609 333 -572 b 343 -471 333 -513 334 -492 b 361 -366 356 -436 361 -402 b 331 -202 361 -311 348 -256 b 328 -187 330 -197 328 -193 b 331 -179 328 -184 328 -181 b 363 -55 353 -137 363 -96 b 337 79 363 -12 351 33 b 327 114 333 92 327 104 b 344 144 327 124 331 132 b 359 174 353 150 357 163 b 361 228 360 193 361 210 b 243 517 361 337 325 435 b 147 596 213 546 179 569 b 75 708 111 626 75 655 b 62 744 75 723 68 733 b 50 763 58 752 58 763 b 46 762 49 763 48 762 b 17 742 36 757 22 757 b 0 697 14 726 0 711 b 1 595 0 662 3 631 b 0 469 0 552 0 511 b 1 429 0 456 0 442 b 22 289 6 382 22 337 b 24 128 22 238 24 184 b 22 66 24 108 23 86 b 19 -19 20 37 19 10 b 20 -132 19 -56 20 -95 b 13 -276 20 -180 19 -229 b 9 -359 10 -304 9 -330 b 12 -487 9 -402 12 -445 b 56 -582 12 -526 29 -554 b 197 -742 107 -632 160 -681 b 288 -1100 265 -851 276 -976 b 288 -1122 288 -1107 287 -1115 b 287 -1145 289 -1129 287 -1138 b 298 -1158 287 -1153 288 -1158 z m 249 -609 b 69 -357 197 -520 88 -471 b 249 -609 131 -441 229 -498 z m 279 -396 b 132 -223 233 -330 180 -279 b 81 -112 104 -192 81 -156 b 82 -91 81 -105 81 -98 b 279 -396 167 -125 269 -281 z m 271 -73 b 127 72 233 -14 179 26 b 81 167 96 98 81 127 b 84 194 81 176 82 184 b 271 -73 148 102 242 39 z m 304 150 b 75 475 229 256 112 334 b 304 150 233 357 305 287 z"
        },
        flag128thDown: {
            x_min: -.8888888888888888,
            x_max: 252,
            y_min: -580,
            y_max: 754,
            ha: 1334,
            o: "m 298 1086 b 287 1073 288 1086 287 1081 b 288 1050 287 1066 289 1057 b 288 1028 287 1043 288 1035 b 197 670 276 904 265 779 b 56 510 160 609 107 560 b 12 415 29 482 12 454 b 9 287 12 373 9 330 b 13 204 9 258 10 232 b 20 60 19 157 20 108 b 19 -53 20 23 19 -16 b 22 -138 19 -82 20 -109 b 24 -200 23 -158 24 -180 b 22 -361 24 -256 22 -310 b 1 -501 22 -409 6 -454 b 0 -541 0 -514 0 -528 b 0 -667 0 -583 -3 -624 b 0 -809 0 -675 -3 -791 b 46 -834 4 -825 36 -829 b 50 -835 48 -834 49 -835 b 62 -816 58 -835 58 -824 b 75 -780 68 -805 75 -795 b 147 -668 75 -727 111 -698 b 243 -589 179 -641 213 -618 b 361 -300 325 -507 361 -409 b 359 -246 361 -282 360 -265 b 344 -216 357 -235 353 -222 b 327 -186 331 -204 327 -196 b 337 -151 327 -176 333 -164 b 363 -17 351 -105 363 -60 b 331 107 363 24 353 65 b 328 115 328 109 328 112 b 331 130 328 121 330 125 b 361 294 348 184 361 239 b 343 399 361 330 356 364 b 333 462 334 420 333 441 b 341 573 333 500 341 537 b 340 593 341 580 340 588 b 330 661 337 616 338 642 b 320 706 323 677 320 691 b 328 765 320 726 324 744 b 347 924 338 818 347 871 b 330 1044 347 965 343 1004 b 328 1054 330 1047 330 1051 b 298 1086 320 1067 312 1086 z m 249 537 b 69 285 229 426 131 369 b 249 537 88 399 197 448 z m 279 324 b 82 19 269 209 167 53 b 81 40 81 26 81 33 b 132 151 81 84 104 120 b 279 324 180 207 233 258 z m 271 1 b 84 -266 242 -111 148 -174 b 81 -239 82 -256 81 -248 b 127 -144 81 -199 96 -170 b 271 1 179 -98 233 -58 z m 304 -222 b 75 -547 305 -359 233 -429 b 304 -222 112 -406 229 -328 z"
        },
        accidentalFlat: {
            x_min: 1,
            x_max: 209,
            y_min: -208,
            y_max: 472,
            ha: 680,
            o: "m 29 -300 b 46 -289 33 -300 39 -297 b 107 -243 65 -274 86 -258 b 301 127 233 -153 301 -30 b 298 186 301 147 301 166 b 190 297 291 256 251 297 b 147 289 177 297 163 294 b 86 265 127 284 107 274 l 85 264 l 85 301 b 91 465 85 356 88 410 b 94 559 91 497 94 527 b 84 651 94 589 91 621 b 66 680 81 661 81 680 l 65 680 b 37 645 49 678 37 665 b 33 523 36 605 32 563 l 33 478 b 26 223 33 393 29 308 b 1 -141 22 101 1 -19 b 17 -287 1 -189 4 -239 b 29 -300 20 -295 23 -300 z m 68 -105 b 76 12 71 -68 72 -29 b 81 107 79 43 81 75 l 86 109 b 171 135 114 121 141 135 b 204 128 181 135 193 132 b 238 92 228 120 239 108 b 230 63 238 84 236 75 b 68 -105 193 -10 132 -59 z"
        },
        accidentalNatural: {
            x_min: 0,
            x_max: 213.5,
            y_min: -456,
            y_max: 462,
            ha: 918,
            o: "m 255 -657 b 281 -624 271 -657 275 -636 b 285 -599 282 -615 285 -608 b 292 -300 288 -500 289 -400 b 289 -161 292 -253 289 -207 b 300 128 292 -65 297 32 b 304 168 300 128 302 150 l 304 173 l 305 190 l 305 199 l 307 225 b 304 259 307 229 310 246 b 272 298 297 274 302 305 b 63 266 204 279 134 272 b 72 514 68 348 72 432 b 71 595 72 541 72 567 b 56 665 71 619 66 642 b 17 579 9 651 17 608 b 3 144 19 433 7 289 b 0 -7 1 94 0 43 b 3 -134 0 -50 1 -92 b 7 -219 3 -163 7 -192 b 35 -251 7 -243 17 -251 b 49 -249 39 -251 43 -251 l 223 -223 l 230 -222 l 230 -359 b 223 -516 230 -410 223 -464 b 236 -619 223 -550 226 -585 b 255 -657 240 -634 236 -657 z m 58 -81 l 58 -63 b 55 81 56 -14 53 33 l 56 99 b 85 99 65 99 75 98 b 232 108 134 104 183 107 l 240 109 l 236 66 b 232 -48 235 29 232 -10 b 58 -81 174 -63 115 -73 z"
        },
        accidentalSharp: {
            x_min: -22,
            x_max: 390,
            y_min: -384,
            y_max: 383,
            ha: 767,
            o: "m 202 -553 b 219 -526 213 -552 216 -536 b 226 -471 225 -507 226 -488 b 225 -425 226 -455 225 -441 b 226 -392 225 -415 225 -402 b 233 -305 229 -363 232 -334 l 297 -292 b 331 -469 300 -353 311 -412 b 347 -485 333 -477 338 -485 b 363 -469 356 -487 359 -477 b 374 -418 373 -454 374 -435 b 376 -382 376 -405 376 -393 b 372 -276 376 -347 373 -311 l 455 -259 b 550 -156 534 -243 544 -232 b 550 -109 550 -137 552 -124 b 526 -78 549 -91 541 -78 b 523 -78 524 -78 524 -78 b 507 -79 517 -78 513 -78 b 403 -101 474 -88 438 -95 l 379 -105 b 382 -42 380 -85 380 -63 b 384 96 383 4 384 50 b 503 131 425 107 464 118 b 549 173 524 138 543 150 b 562 249 554 199 562 223 b 554 294 562 264 560 279 b 536 315 549 308 544 315 b 533 315 534 315 534 315 b 517 312 528 315 523 315 b 382 266 472 294 428 279 l 377 344 b 359 531 374 406 372 469 b 348 552 356 539 357 552 b 347 552 348 552 347 552 l 343 552 b 315 528 331 549 317 544 l 315 501 b 320 249 315 416 318 333 l 243 232 b 239 361 243 275 242 318 b 226 425 238 383 238 403 b 199 359 194 409 199 382 b 193 223 196 312 194 268 b 72 202 153 215 112 209 b 4 118 13 192 4 183 b 10 66 0 102 12 84 b 33 29 7 39 14 30 b 48 32 37 29 42 30 b 187 55 95 39 141 46 l 183 -75 b 176 -145 181 -99 179 -122 b 16 -179 122 -156 69 -166 b -32 -232 -14 -186 -32 -197 b -17 -331 -32 -266 -19 -298 b -1 -356 -17 -347 -13 -354 b 12 -353 1 -356 6 -354 b 167 -320 63 -341 115 -331 b 166 -377 166 -338 166 -357 b 189 -526 166 -428 171 -477 b 202 -553 192 -536 189 -553 z m 240 -132 b 243 -37 242 -101 242 -69 b 245 65 245 -3 245 30 b 315 79 269 69 292 73 b 301 -120 308 13 305 -53 z"
        },
        accidentalDoubleSharp: {
            x_min: 0,
            x_max: 287,
            y_min: -159,
            y_max: 159,
            ha: 318,
            o: "m 84 -229 b 107 -216 91 -229 98 -225 b 200 -125 138 -186 167 -154 b 232 -95 212 -115 222 -105 b 347 -189 271 -125 310 -157 b 370 -200 356 -196 363 -200 b 396 -179 380 -200 389 -192 b 412 -102 410 -154 406 -125 b 377 -27 410 -69 400 -46 l 325 14 b 402 91 350 42 374 68 b 413 127 410 96 413 107 b 382 200 409 148 397 176 b 350 229 370 220 360 229 b 314 210 340 229 328 223 b 274 174 300 199 285 187 b 212 104 252 151 232 128 b 92 187 173 132 132 161 b 78 193 86 192 82 193 b 68 190 75 193 72 193 b 48 179 62 186 53 187 b 40 137 43 168 40 154 b 81 16 40 92 56 32 b 107 -3 89 10 98 4 b 14 -94 76 -32 45 -62 b 0 -124 6 -102 0 -114 b 12 -154 0 -134 3 -144 b 62 -215 26 -176 48 -193 b 84 -229 69 -225 76 -229 z"
        },
        accidentalDoubleFlat: {
            x_min: 0,
            x_max: 359,
            y_min: -220,
            y_max: 446,
            ha: 666,
            o: "m 43 -317 b 72 -301 55 -317 63 -310 b 160 -186 108 -268 134 -226 b 236 -60 186 -145 212 -102 b 233 -131 235 -85 233 -108 b 239 -220 233 -161 235 -190 b 259 -246 240 -233 239 -240 b 301 -228 284 -252 291 -238 b 465 -7 369 -163 416 -85 b 517 173 500 48 517 108 b 451 307 517 229 505 284 b 409 315 436 312 422 315 b 331 287 382 315 356 305 b 311 274 324 282 320 274 l 310 274 l 310 566 b 305 621 310 585 312 603 b 294 642 301 628 305 642 l 292 642 b 264 622 282 641 266 636 b 253 575 259 606 256 590 b 246 418 248 523 246 471 b 248 243 246 360 248 302 l 248 187 b 164 238 220 225 193 238 b 85 213 140 238 112 226 b 84 229 85 220 84 225 b 86 315 85 258 86 287 b 81 528 86 386 82 458 b 71 582 81 547 78 566 b 56 603 66 590 68 603 l 53 603 b 23 580 40 600 26 598 b 19 537 20 566 19 552 b 20 514 19 530 19 521 b 26 390 24 472 26 432 b 14 66 26 282 16 174 b 0 -168 13 -12 0 -91 b 12 -279 0 -206 3 -242 b 30 -314 16 -294 14 -308 b 43 -317 35 -317 39 -317 z m 75 -147 b 73 30 75 -86 75 -29 b 118 82 73 62 92 76 b 132 84 124 84 128 84 b 190 52 156 84 174 69 b 193 40 192 49 193 45 b 192 33 193 37 193 35 b 75 -147 157 -30 125 -95 z m 301 -72 b 302 7 302 -45 302 -19 l 302 86 b 351 158 304 121 321 145 b 383 166 361 163 373 166 b 435 143 402 166 419 157 b 445 127 441 138 445 132 b 441 114 445 122 444 118 b 301 -72 397 49 354 -14 z"
        },
        accidentalParensLeft: {
            x_min: 0,
            x_max: 130.18934911242604,
            y_min: -270,
            y_max: 267.6082500723851,
            ha: 537.6082500723851,
            o: "m 107 -389 b 127 -374 114 -389 120 -384 b 141 -347 132 -367 137 -357 b 151 -294 148 -330 151 -311 b 122 -207 151 -265 141 -236 b 63 -65 94 -164 72 -117 b 59 -10 60 -46 59 -27 b 145 223 59 78 94 153 b 187 354 176 262 189 305 b 177 384 187 364 190 380 b 143 373 166 387 153 383 b 124 354 137 367 130 361 b 0 -35 33 240 0 108 l 0 -92 b 85 -372 4 -193 27 -287 b 107 -389 92 -383 99 -389 z"
        },
        accidentalParensRight: {
            x_min: -.4444444444444445,
            x_max: 139,
            y_min: -275,
            y_max: 277,
            ha: 552,
            o: "m 58 -396 b 96 -354 75 -396 85 -370 b 200 13 168 -238 200 -111 b 153 268 200 109 184 190 b 49 392 131 320 101 364 b 26 399 40 397 33 399 b 0 366 10 399 0 387 b 0 318 -1 350 0 334 l 0 291 b 27 238 -3 266 7 253 b 143 9 105 180 143 98 b 141 -20 143 -1 143 -10 b 63 -225 135 -92 108 -164 b 36 -307 45 -251 36 -278 b 40 -344 36 -320 37 -331 b 42 -356 42 -347 42 -351 b 58 -396 42 -374 37 -396 z"
        },
        accidentalQuarterToneFlatStein: {
            x_min: 0,
            x_max: 208,
            y_min: -240,
            y_max: 440,
            ha: 680,
            o: "m 272 -346 b 284 -333 278 -346 281 -341 b 300 -187 297 -285 300 -235 b 275 177 300 -65 279 55 b 268 432 272 262 268 347 l 268 477 b 264 599 269 517 265 559 b 236 634 264 619 252 632 l 235 634 b 217 605 220 634 220 615 b 207 513 210 575 207 543 b 210 419 207 481 210 451 b 216 255 213 364 216 310 l 216 217 l 215 219 b 154 243 194 228 174 238 b 111 251 138 248 124 251 b 3 140 50 251 10 210 b 0 81 0 120 0 101 b 194 -289 0 -76 68 -199 b 255 -336 215 -304 236 -320 b 272 -346 262 -343 268 -346 z m 233 -151 b 71 17 168 -105 108 -56 b 63 46 65 29 63 37 b 96 82 62 62 73 73 b 130 89 108 86 120 89 b 215 63 160 89 187 75 l 220 60 b 225 -35 220 29 222 -3 b 233 -151 229 -75 230 -114 z"
        },
        accidentalThreeQuarterTonesFlatZimmermann: {
            x_min: 0,
            x_max: 422,
            y_min: -240,
            y_max: 440,
            ha: 680,
            o: "m 336 -346 b 353 -336 340 -346 346 -343 b 413 -289 372 -320 393 -304 b 608 81 540 -199 608 -76 b 605 140 608 101 608 120 b 497 251 598 210 557 251 b 454 243 484 251 469 248 b 393 219 433 238 413 228 l 392 217 l 392 255 b 397 419 392 310 395 364 b 400 513 397 451 400 481 b 390 605 400 543 397 575 b 373 634 387 615 387 634 l 372 634 b 344 599 356 632 344 619 b 340 477 343 559 338 517 l 340 432 b 333 177 340 347 336 262 b 308 -187 328 55 308 -65 b 324 -333 308 -235 311 -285 b 336 -346 327 -341 330 -346 z m 233 -151 b 71 17 168 -105 108 -56 b 63 46 65 29 63 37 b 96 82 62 62 73 73 b 130 89 108 86 120 89 b 215 63 160 89 187 75 l 220 60 b 225 -35 220 29 222 -3 b 233 -151 229 -75 230 -114 z m 272 -346 b 284 -333 278 -346 281 -341 b 300 -187 297 -285 300 -235 b 275 177 300 -65 279 55 b 268 432 272 262 268 347 l 268 477 b 264 599 269 517 265 559 b 236 634 264 619 252 632 l 235 634 b 217 605 220 634 220 615 b 207 513 210 575 207 543 b 210 419 207 481 210 451 b 216 255 213 364 216 310 l 216 217 l 215 219 b 154 243 194 228 174 238 b 111 251 138 248 124 251 b 3 140 50 251 10 210 b 0 81 0 120 0 101 b 194 -289 0 -76 68 -199 b 255 -336 215 -304 236 -320 b 272 -346 262 -343 268 -346 z m 374 -151 b 383 -35 377 -114 379 -75 b 387 60 386 -3 387 29 l 393 63 b 478 89 420 75 448 89 b 511 82 488 89 500 86 b 544 46 534 73 546 62 b 537 17 544 37 543 29 b 374 -151 500 -56 439 -105 z"
        },
        accidentalQuarterToneSharpStein: {
            x_min: 0,
            x_max: 300,
            y_min: -338,
            y_max: 351,
            ha: 689,
            o: "m 194 -487 b 225 -432 215 -469 223 -452 b 238 -232 229 -366 236 -298 b 377 -199 285 -220 331 -209 b 418 -164 397 -193 410 -181 b 432 -88 428 -138 432 -114 b 412 -42 432 -55 428 -42 b 389 -46 406 -42 399 -43 l 235 -85 b 233 -20 235 -63 233 -42 b 233 105 232 22 233 63 b 312 121 259 111 285 117 b 406 226 390 134 400 145 b 373 284 409 268 402 284 b 344 281 364 284 356 282 b 232 258 307 276 269 266 b 230 308 232 275 232 291 b 210 505 229 374 232 441 b 183 471 189 501 184 490 b 180 406 181 449 180 428 b 184 246 180 353 184 300 b 48 222 140 236 94 228 b 0 168 6 216 0 209 b 7 86 1 141 4 114 b 27 66 9 73 13 66 b 35 66 29 66 32 66 b 184 94 85 66 135 84 b 187 -1 184 62 186 30 b 190 -96 189 -33 190 -65 l 112 -114 b 35 -213 27 -132 35 -132 b 33 -253 35 -226 35 -240 b 49 -276 33 -269 37 -276 b 62 -275 52 -276 56 -276 l 186 -245 l 186 -256 b 179 -387 180 -300 177 -343 b 194 -487 180 -419 179 -454 z"
        },
        accidentalThreeQuarterTonesSharpStein: {
            x_min: -23,
            x_max: 388,
            y_min: -373,
            y_max: 445,
            ha: 818,
            o: "m 114 -537 b 138 -475 137 -518 138 -495 b 147 -292 138 -413 144 -353 b 212 -278 168 -287 190 -282 b 243 -444 215 -333 225 -389 b 261 -467 248 -454 251 -465 b 281 -446 272 -469 276 -455 b 292 -347 292 -416 288 -384 b 288 -262 289 -320 288 -291 l 374 -245 b 376 -311 374 -266 374 -288 b 390 -456 379 -357 379 -405 b 416 -396 412 -436 415 -418 b 423 -287 420 -360 423 -323 b 422 -235 423 -269 423 -252 b 451 -229 432 -233 441 -232 b 547 -98 524 -215 547 -199 l 547 -89 b 521 -49 546 -59 540 -49 b 497 -52 516 -49 507 -49 b 418 -68 469 -56 444 -63 b 423 52 419 -29 422 12 b 426 140 425 81 425 109 b 495 160 449 145 472 153 b 552 219 526 170 546 189 b 559 279 557 240 553 262 b 530 341 559 324 552 341 b 490 331 520 341 507 338 b 432 311 471 324 452 318 b 449 552 436 392 442 471 b 452 588 451 563 452 575 b 446 622 452 599 451 611 b 436 641 444 629 448 641 b 418 628 428 641 420 636 b 409 602 413 621 410 611 b 386 297 396 501 390 399 b 297 274 356 288 327 281 b 291 403 295 317 294 360 b 274 550 288 452 284 501 b 259 569 271 564 265 569 b 240 559 253 569 248 563 b 230 537 232 554 230 546 l 230 488 b 233 369 230 448 232 409 b 236 261 236 333 238 297 b 156 245 210 255 183 251 b 154 396 154 295 154 346 b 150 416 154 403 153 410 b 140 438 145 423 150 438 l 138 438 b 118 413 128 436 118 428 b 112 354 118 393 114 374 b 109 238 109 315 109 276 b 49 226 89 233 69 230 b 3 163 16 222 3 202 b 7 91 3 138 9 114 b 29 62 7 69 13 62 b 39 63 32 62 35 63 b 104 73 60 66 82 71 b 101 -10 104 46 102 17 l 92 -132 l 10 -150 b -33 -204 -19 -157 -33 -170 b -19 -310 -32 -240 -19 -274 b -6 -324 -19 -321 -13 -324 b 6 -323 -1 -324 1 -324 b 82 -307 32 -317 58 -311 b 81 -376 82 -330 81 -353 b 114 -537 81 -431 94 -484 z m 154 -120 b 157 20 154 -73 156 -26 b 158 82 158 40 158 62 b 230 95 183 86 206 89 b 225 0 229 63 226 32 b 217 -107 223 -35 220 -71 z m 294 -92 b 297 -37 295 -73 295 -56 b 300 49 300 -9 300 20 b 300 108 300 69 300 88 b 379 127 325 114 353 120 b 374 -76 376 59 374 -9 b 294 -92 347 -82 320 -86 z"
        },
        accidentalBuyukMucennebFlat: {
            x_min: 1.8692317181955784,
            x_max: 287,
            y_min: -248,
            y_max: 432.4720949426819,
            ha: 680.4720949426819,
            o: "m 410 128 b 302 239 403 199 363 239 b 259 232 289 239 275 236 b 199 207 239 226 219 216 l 197 206 l 197 243 b 197 251 197 246 197 248 b 347 317 248 272 298 295 b 376 347 360 324 372 334 b 389 435 387 376 393 405 b 348 454 384 462 377 465 b 202 387 300 432 251 409 b 203 408 203 395 203 402 b 203 431 203 416 203 423 b 347 490 252 451 300 469 b 376 517 360 495 372 505 b 389 599 387 546 393 572 b 348 616 384 625 377 628 b 203 556 300 596 251 576 b 196 593 202 569 199 582 b 179 622 193 603 193 622 l 177 622 b 150 588 161 621 150 608 b 147 533 150 570 148 552 b 29 488 108 517 69 503 b 3 455 12 482 3 472 b 12 353 1 422 9 389 b 145 408 56 372 101 389 b 145 363 145 392 145 377 b 29 315 107 347 68 331 b 3 281 12 310 3 298 b 12 170 1 245 9 209 b 141 226 55 189 98 207 b 138 166 140 206 138 186 b 114 -199 134 43 115 -76 b 130 -344 114 -246 117 -297 b 141 -357 132 -353 135 -357 b 158 -347 145 -357 151 -354 b 219 -301 177 -331 199 -315 b 413 69 346 -210 413 -88 b 410 128 413 89 413 108 z m 350 35 b 343 6 350 26 348 17 b 180 -163 308 -69 245 -117 b 189 -46 183 -125 184 -86 b 193 49 192 -14 193 17 l 199 52 b 284 78 226 63 253 78 b 317 71 294 78 305 75 b 350 35 340 62 351 50 z"
        },
        accidentalBakiyeFlat: {
            x_min: 1.8692317181955784,
            x_max: 287,
            y_min: -236,
            y_max: 444,
            ha: 680,
            o: "m 141 -340 b 158 -330 145 -340 151 -337 b 219 -284 177 -314 199 -298 b 413 86 346 -193 413 -71 b 410 145 413 107 413 125 b 302 256 403 216 363 256 b 259 249 289 256 275 253 b 199 225 239 243 219 233 l 197 223 l 197 261 b 199 334 197 285 199 310 b 347 406 249 357 298 382 b 376 439 360 413 372 425 b 390 516 384 465 390 490 b 389 537 390 523 390 530 b 372 564 384 556 382 564 b 348 557 367 564 359 562 b 204 487 300 537 253 510 b 206 518 206 497 206 507 b 196 611 206 549 203 580 b 179 639 193 621 193 639 l 177 639 b 150 605 161 638 150 625 b 145 482 148 564 144 523 l 145 458 b 29 405 107 439 68 420 b 3 366 12 397 3 386 b 12 243 1 325 9 287 b 143 307 56 265 99 285 l 138 183 b 114 -181 134 60 114 -59 b 130 -327 114 -229 117 -279 b 141 -340 132 -336 135 -340 z m 180 -145 b 189 -29 183 -108 184 -69 b 193 66 192 3 193 35 l 199 69 b 284 95 226 81 253 95 b 317 88 294 95 305 92 b 350 52 340 79 351 68 b 343 23 350 43 348 35 b 180 -145 305 -50 245 -99 z"
        },
        accidentalKomaSharp: {
            x_min: 0,
            x_max: 300,
            y_min: -338,
            y_max: 351,
            ha: 689,
            o: "m 194 -487 b 225 -432 215 -469 223 -452 b 238 -232 229 -366 236 -298 b 377 -199 285 -220 331 -209 b 418 -164 397 -193 410 -181 b 432 -88 428 -138 432 -114 b 412 -42 432 -55 428 -42 b 389 -46 406 -42 399 -43 l 235 -85 b 233 -20 235 -63 233 -42 b 233 105 232 22 233 63 b 312 121 259 111 285 117 b 406 226 390 134 400 145 b 373 284 409 268 402 284 b 344 281 364 284 356 282 b 232 258 307 276 269 266 b 230 308 232 275 232 291 b 210 505 229 374 232 441 b 183 471 189 501 184 490 b 180 406 181 449 180 428 b 184 246 180 353 184 300 b 48 222 140 236 94 228 b 0 168 6 216 0 209 b 7 86 1 141 4 114 b 27 66 9 73 13 66 b 35 66 29 66 32 66 b 184 94 85 66 135 84 b 187 -1 184 62 186 30 b 190 -96 189 -33 190 -65 l 112 -114 b 35 -213 27 -132 35 -132 b 33 -253 35 -226 35 -240 b 49 -276 33 -269 37 -276 b 62 -275 52 -276 56 -276 l 186 -245 l 186 -256 b 179 -387 180 -300 177 -343 b 194 -487 180 -419 179 -454 z"
        },
        accidentalKucukMucennebSharp: {
            x_min: -.15206251809627475,
            x_max: 359,
            y_min: -420,
            y_max: 343,
            ha: 763,
            o: "m 236 -605 b 262 -543 256 -583 261 -564 b 269 -423 268 -503 269 -464 b 266 -340 269 -396 268 -367 l 361 -318 b 405 -276 384 -312 399 -298 b 413 -189 412 -248 416 -219 b 395 -164 412 -171 409 -164 b 382 -166 392 -164 387 -164 b 264 -193 343 -176 304 -184 b 269 -102 265 -163 268 -132 b 454 -62 331 -89 392 -78 b 501 -23 477 -58 494 -45 b 517 62 511 6 517 33 b 487 112 517 95 513 112 b 471 111 482 112 477 112 b 274 66 406 95 340 81 b 276 138 275 91 276 114 b 350 154 301 144 325 148 b 402 203 377 160 396 176 b 412 284 408 230 412 258 b 392 311 412 302 406 311 b 372 308 386 311 379 310 b 287 291 343 301 314 297 l 295 405 b 298 441 297 416 298 428 b 292 475 298 452 297 464 b 282 494 289 482 294 494 b 264 481 274 494 266 490 b 255 455 259 474 256 464 b 239 282 248 397 243 340 b 148 268 209 278 179 274 b 62 164 62 252 62 253 l 62 132 b 79 108 60 117 65 108 l 86 108 l 230 130 b 229 92 230 118 229 105 b 228 56 228 79 228 68 b 66 20 173 43 120 32 b 0 -59 6 7 3 1 l 0 -138 b 14 -160 -1 -156 4 -160 b 27 -158 19 -160 23 -160 b 222 -112 92 -141 157 -127 b 220 -203 220 -143 220 -173 b 147 -217 196 -207 171 -213 b 89 -288 92 -228 89 -229 b 95 -347 85 -305 96 -325 b 112 -374 92 -366 98 -374 b 125 -373 117 -374 121 -374 l 220 -351 b 222 -458 220 -386 220 -422 b 236 -605 223 -504 225 -552 z"
        },
        accidentalKoron: {
            x_min: 0,
            x_max: 303,
            y_min: -462.4598053473055,
            y_max: 180,
            ha: 642.4598053473055,
            o: "m 59 -665 b 72 -649 69 -662 72 -657 b 69 -626 72 -642 69 -634 b 69 -622 69 -625 69 -624 b 69 -600 69 -615 69 -608 b 55 -156 60 -456 68 -311 b 86 -170 66 -166 76 -170 b 112 -163 95 -170 104 -166 b 390 -35 204 -120 298 -78 b 436 -1 409 -27 436 -27 b 396 46 436 22 413 33 l 382 55 b 46 243 271 121 157 179 b 12 259 29 253 17 259 b 0 219 1 259 0 248 b 3 -372 0 22 3 -176 b 6 -616 3 -454 6 -536 b 59 -665 6 -638 40 -671 z m 55 -118 l 55 199 b 363 24 156 141 258 84 b 55 -118 259 -24 160 -69 z"
        },
        accidentalSori: {
            x_min: 0,
            x_max: 434,
            y_min: -295,
            y_max: 325,
            ha: 620,
            o: "m 194 -425 b 196 -409 194 -418 196 -413 b 194 -194 196 -337 196 -266 b 364 -127 251 -171 308 -150 b 361 -321 363 -192 364 -256 b 410 -387 360 -357 373 -377 b 413 -373 412 -382 413 -377 b 418 -114 418 -287 418 -200 l 418 -105 b 595 -35 477 -82 536 -59 b 625 0 612 -27 625 -22 b 593 48 624 23 618 39 l 419 117 b 423 370 419 202 423 285 b 426 403 423 382 426 393 b 418 436 426 415 425 426 b 384 468 409 449 399 468 b 369 448 370 468 369 459 b 369 436 369 444 369 441 b 369 428 369 433 369 431 l 369 423 b 367 138 369 328 367 233 l 353 143 l 192 207 l 192 367 b 173 406 192 383 184 396 b 151 422 167 413 160 422 b 144 420 148 422 147 422 b 137 403 138 416 137 410 b 137 392 137 399 137 396 l 137 229 b 33 271 102 243 68 256 b 13 276 26 274 19 276 b 0 262 6 276 0 272 b 35 199 1 239 0 212 l 138 160 b 140 -148 138 58 138 -45 b 56 -181 111 -158 84 -170 b 24 -215 35 -189 24 -199 b 29 -235 24 -220 26 -228 b 49 -253 35 -249 42 -253 b 78 -240 59 -253 69 -243 b 140 -216 98 -233 120 -225 l 140 -356 b 194 -425 140 -406 141 -406 z m 194 -125 b 193 138 194 -37 193 50 b 315 89 233 122 275 107 b 366 71 333 84 350 76 b 364 -58 366 27 366 -16 b 194 -125 308 -81 251 -104 z m 419 -36 l 419 49 l 526 7 l 485 -10 z"
        },
        articAccentAbove: {
            x_min: 0,
            x_max: 425,
            y_min: 0,
            y_max: 326,
            ha: 326,
            o: "m 27 1 b 78 12 46 0 62 6 b 347 112 168 45 253 91 b 521 184 409 128 459 167 b 608 259 557 194 589 220 b 612 274 611 265 612 271 b 598 292 612 281 608 287 b 477 347 559 312 518 331 b 176 465 374 384 275 425 b 156 469 168 468 161 469 b 125 456 145 469 137 465 b 53 370 96 432 78 399 b 45 353 48 363 45 357 b 68 333 45 344 52 337 b 360 225 166 298 262 261 b 192 154 302 203 249 171 b 13 36 120 132 53 105 b 0 13 9 29 0 22 b 0 9 0 12 0 10 b 16 0 3 1 10 0 l 26 0 b 27 1 27 0 27 0 z"
        },
        articAccentBelow: {
            x_min: 0,
            x_max: 425,
            y_min: -326,
            y_max: 0,
            ha: 326,
            o: "m 16 -469 l 26 -469 b 27 -469 27 -469 27 -469 b 78 -458 46 -469 62 -464 b 347 -357 168 -426 253 -380 b 521 -285 409 -341 459 -302 b 608 -210 557 -276 589 -249 b 612 -196 611 -204 612 -200 b 598 -179 612 -189 608 -183 b 477 -122 559 -157 518 -138 b 176 -4 374 -85 275 -45 b 156 0 168 -1 161 0 b 125 -13 145 0 137 -4 b 53 -99 96 -37 78 -71 b 45 -117 48 -107 45 -112 b 68 -137 45 -125 52 -132 b 360 -245 166 -171 262 -209 b 192 -315 302 -266 249 -300 b 13 -433 120 -337 53 -366 b 0 -456 9 -442 0 -448 b 0 -461 0 -458 0 -459 b 16 -469 3 -468 10 -469 z"
        },
        articTenutoAbove: {
            x_min: .35192668236256364,
            x_max: 471.1238660564107,
            y_min: 0,
            y_max: 56,
            ha: 56,
            o: "m 137 0 b 197 1 156 0 179 1 b 409 6 268 1 338 6 b 482 4 432 6 459 6 b 556 0 508 3 534 0 b 651 10 588 0 621 3 b 678 27 662 12 678 10 b 654 59 680 45 672 53 b 511 75 606 73 560 73 b 255 81 426 78 341 81 b 160 79 222 81 193 79 l 36 79 b 1 71 24 78 7 85 b 19 32 -3 56 9 43 b 45 16 26 24 36 20 b 137 0 76 3 108 0 z"
        },
        articTenutoBelow: {
            x_min: .35192668236256364,
            x_max: 471.1238660564107,
            y_min: -59,
            y_max: -3,
            ha: 56,
            o: "m 137 -85 b 197 -84 156 -85 179 -84 b 409 -79 268 -84 338 -79 b 482 -81 432 -79 459 -79 b 556 -85 508 -82 534 -85 b 651 -75 588 -85 621 -82 b 678 -58 662 -73 678 -75 b 654 -26 680 -40 672 -32 b 511 -10 606 -12 560 -12 b 255 -4 426 -7 341 -4 b 160 -6 222 -4 193 -6 l 36 -6 b 1 -14 24 -7 7 0 b 19 -53 -3 -29 9 -42 b 45 -69 26 -60 36 -65 b 137 -85 76 -82 108 -85 z"
        },
        articStaccatoAbove: {
            x_min: 1.4151102965496913,
            x_max: 112,
            y_min: 0,
            y_max: 156,
            ha: 156,
            o: "m 98 0 b 132 23 109 0 122 7 b 161 112 150 50 161 79 b 158 148 161 124 161 137 b 125 186 154 167 131 167 b 63 225 117 215 85 216 b 23 197 45 222 30 219 b 3 91 12 163 12 127 b 19 66 0 79 4 69 b 65 27 40 62 53 46 b 98 0 76 9 88 0 z"
        },
        articStaccatoBelow: {
            x_min: 1.4151102965496913,
            x_max: 112.08403222864916,
            y_min: -156,
            y_max: 0,
            ha: 156,
            o: "m 132 -202 b 161 -112 151 -174 163 -145 b 158 -76 161 -101 161 -88 b 125 -39 153 -58 131 -58 b 63 0 115 -10 85 -9 b 23 -27 45 -3 30 -6 b 3 -134 12 -62 10 -98 b 19 -158 0 -145 4 -156 b 65 -197 40 -164 53 -179 b 98 -225 75 -216 88 -225 b 132 -202 109 -225 122 -217 z"
        },
        articStaccatissimoAbove: {
            x_min: 0,
            x_max: 139,
            y_min: 0,
            y_max: 411,
            ha: 411,
            o: "m 96 0 l 104 0 b 144 115 143 29 138 75 b 197 423 158 217 180 320 b 200 454 199 433 200 444 b 181 540 200 482 193 513 b 112 592 167 573 141 592 b 55 567 92 592 72 585 b 0 490 32 546 3 527 l 0 484 b 27 279 14 416 14 347 b 84 20 43 193 52 104 b 96 0 86 13 92 6 z"
        },
        articStaccatissimoBelow: {
            x_min: 0,
            x_max: 139,
            y_min: -411,
            y_max: 0,
            ha: 411,
            o: "m 88 -592 b 145 -567 108 -592 128 -585 b 200 -490 168 -546 197 -527 l 200 -484 b 173 -279 186 -416 186 -347 b 117 -20 157 -193 148 -104 b 104 0 114 -13 108 -6 l 96 0 b 56 -115 58 -29 62 -75 b 3 -423 42 -217 20 -320 b 0 -454 1 -433 0 -444 b 19 -540 0 -482 7 -513 b 88 -592 33 -573 59 -592 z"
        },
        articMarcatoAbove: {
            x_min: .04121419527862119,
            x_max: 396,
            y_min: 0,
            y_max: 328.0000000000001,
            ha: 328.0000000000001,
            o: "m 477 0 b 510 13 488 0 500 6 b 570 124 546 40 563 81 b 547 183 570 147 560 166 b 356 422 487 265 405 330 b 346 442 354 429 350 436 l 346 444 b 318 465 340 456 330 464 l 312 469 b 274 449 294 480 284 461 b 242 413 262 438 253 425 b 56 196 177 343 112 274 b 1 56 26 154 13 105 b 27 20 -4 35 9 20 b 42 23 32 20 37 20 b 84 53 59 29 72 39 b 255 269 141 125 193 200 b 275 229 262 255 266 242 b 448 14 324 151 390 86 b 477 0 456 4 467 0 z"
        },
        articMarcatoBelow: {
            x_min: 0,
            x_max: 395.9587858047214,
            y_min: -328.0000000000001,
            y_max: 0,
            ha: 328.0000000000001,
            o: "m 258 -469 b 297 -449 276 -480 287 -461 b 328 -413 308 -438 317 -425 b 514 -196 393 -343 458 -274 b 569 -56 544 -154 557 -105 b 543 -20 575 -35 562 -20 b 528 -23 539 -20 533 -20 b 487 -53 511 -29 498 -39 b 315 -269 429 -125 377 -200 b 295 -229 308 -255 304 -242 b 122 -14 246 -151 180 -86 b 94 0 114 -4 104 0 b 60 -13 82 0 71 -6 b 0 -124 24 -40 7 -81 b 23 -183 0 -147 10 -166 b 215 -422 84 -265 166 -330 b 225 -442 216 -429 220 -436 l 225 -444 b 252 -465 230 -456 240 -464 z"
        },
        fermataAbove: {
            x_min: -.04550444040404433,
            x_max: 472,
            y_min: 2.015071727506986,
            y_max: 454,
            ha: 451.984928272493,
            o: "m 39 10 b 78 108 66 37 71 73 b 163 311 92 181 111 252 b 284 423 199 353 239 392 b 373 458 312 444 340 454 b 433 431 395 458 410 446 b 603 153 530 361 596 276 b 595 121 603 144 595 131 l 595 88 b 602 50 596 75 589 55 b 639 73 619 43 631 60 b 651 102 645 82 648 92 b 667 194 660 132 662 163 b 680 278 671 222 672 248 b 560 567 680 386 638 481 b 396 654 508 625 452 649 b 291 632 364 654 325 644 b 161 526 235 613 200 566 b 4 249 85 446 26 357 b 4 174 0 222 -3 196 b 10 19 4 124 4 69 b 29 4 12 6 16 0 b 39 10 35 4 33 4 z m 338 37 b 370 40 350 36 357 36 b 380 75 387 40 380 43 b 389 94 382 79 382 85 b 356 132 389 111 374 122 b 269 154 328 147 300 156 b 225 125 252 154 228 157 b 261 48 222 81 232 56 b 338 37 287 40 312 40 z"
        },
        fermataBelow: {
            x_min: -.310835055998654,
            x_max: 518.570567335755,
            y_min: -430,
            y_max: -.9161449836506543,
            ha: 429.08385501634933,
            o: "m 344 -615 b 500 -543 402 -602 452 -576 b 713 -253 605 -471 661 -364 b 746 -98 737 -204 750 -153 b 727 -59 744 -82 744 -59 b 688 -88 711 -59 694 -68 b 678 -109 687 -96 683 -102 b 562 -314 648 -183 611 -252 b 387 -439 516 -373 458 -416 b 328 -449 367 -446 347 -449 b 180 -386 274 -449 225 -423 b 69 -179 111 -330 69 -262 b 75 -121 69 -160 71 -141 b 84 -58 78 -101 84 -79 b 82 -39 84 -52 84 -45 b 68 -1 79 -26 82 -4 b 26 -32 49 0 33 -12 b 20 -52 24 -39 22 -45 b 0 -223 9 -107 -3 -161 b 141 -553 1 -348 27 -468 b 304 -619 192 -590 243 -619 b 344 -615 317 -619 330 -618 z m 415 -190 b 435 -157 429 -192 435 -184 b 308 -27 435 -86 379 -27 b 271 -46 287 -27 272 -35 b 269 -69 269 -55 269 -62 b 364 -183 269 -128 302 -170 z"
        },
        breathMarkComma: {
            x_min: 0,
            x_max: 148,
            y_min: 0,
            y_max: 275,
            ha: 275,
            o: "m 120 0 b 187 78 156 20 174 48 b 213 209 206 121 213 164 b 206 294 213 238 210 265 b 140 390 200 337 171 367 b 122 396 134 395 128 396 b 68 382 105 396 85 384 b 46 379 60 382 53 382 b 0 328 12 369 0 357 b 1 311 0 323 1 317 b 30 210 4 275 22 243 b 66 167 39 179 46 167 b 94 171 73 167 82 168 b 143 180 109 174 124 180 b 160 179 148 180 154 180 b 120 66 124 145 120 107 b 120 0 120 45 121 23 z"
        },
        breathMarkUpbow: {
            x_min: 0,
            x_max: 254,
            y_min: 0,
            y_max: 595,
            ha: 595,
            o: "m 233 0 b 256 48 251 14 253 30 b 272 183 264 92 265 138 b 311 455 289 274 295 364 b 350 716 327 541 341 628 b 366 815 354 749 366 782 b 359 857 366 829 363 842 b 327 815 334 852 330 832 b 302 674 315 769 310 721 b 248 357 288 567 269 462 b 225 226 240 314 242 268 b 210 251 212 232 213 243 b 69 721 163 408 117 564 b 32 835 58 760 53 801 b 20 851 29 841 27 851 b 14 850 19 851 16 851 b 0 828 6 847 0 838 l 0 825 b 12 765 1 804 7 785 b 194 125 73 552 132 338 b 233 0 206 84 213 42 z"
        },
        caesura: {
            x_min: 0,
            x_max: 565.5831864753837,
            y_min: -.09016994374947417,
            y_max: 562.4481112129314,
            ha: 562.5382811566809,
            o: "m 226 1 b 248 13 238 -4 243 7 l 353 137 b 759 638 490 302 632 464 b 814 805 795 688 819 740 b 779 786 796 805 788 796 b 628 609 724 732 678 668 b 310 242 523 485 416 363 b 217 69 265 190 217 140 b 222 30 217 58 219 45 b 222 23 222 29 220 26 b 220 12 222 20 220 16 b 226 1 220 7 222 3 z m 0 76 b 49 122 24 92 37 107 b 444 613 180 287 305 455 b 528 770 484 660 518 708 b 531 792 530 778 531 785 b 524 808 531 799 530 805 b 490 792 513 815 498 802 b 390 683 456 756 420 721 b 48 262 275 543 164 400 b 0 76 0 207 7 145 z"
        },
        caesuraCurved: {
            x_min: 0,
            x_max: 386,
            y_min: -10,
            y_max: 584,
            ha: 594,
            o: "m 180 -14 b 246 14 213 -13 230 0 b 347 144 288 52 315 99 b 526 471 420 246 488 350 b 556 671 546 537 556 603 b 543 798 556 713 553 756 b 504 837 537 822 521 828 b 490 841 500 840 494 841 b 472 832 482 841 477 838 b 406 678 436 785 406 737 b 410 638 406 665 408 652 b 425 511 419 595 425 553 b 315 186 425 395 387 287 b 180 -14 271 122 228 58 z m 14 24 b 49 39 29 24 40 32 b 120 114 76 60 99 85 b 216 276 156 166 184 223 b 317 626 281 384 317 501 b 315 664 317 639 317 651 b 301 773 314 701 311 737 b 262 808 295 795 278 808 b 245 799 256 808 249 805 b 170 641 209 750 170 706 b 171 621 170 634 170 628 b 177 511 176 585 177 549 b 114 229 177 415 160 320 b 0 26 79 161 42 95 b 14 24 6 24 10 24 z"
        },
        restMaxima: {
            x_min: 0,
            x_max: 366,
            y_min: -255,
            y_max: 255,
            ha: 510,
            o: "m 397 -367 b 504 -343 436 -367 468 -347 b 518 -318 516 -341 518 -330 b 527 -30 518 -217 527 -117 b 526 33 527 -7 527 13 l 526 301 b 501 350 526 323 520 341 b 428 367 477 361 452 367 b 374 359 410 367 393 364 b 357 333 361 354 357 347 b 356 91 357 252 356 171 l 356 30 b 340 -307 357 -82 346 -194 b 397 -367 337 -354 350 -367 z m 46 -357 b 58 -356 49 -357 53 -357 b 154 -333 91 -351 121 -338 b 173 -305 168 -330 173 -320 l 173 302 b 132 356 173 330 157 348 b 68 364 112 363 89 364 b 3 304 19 363 1 348 l 3 4 l 0 4 b 1 -302 0 -98 0 -200 b 46 -357 1 -331 16 -357 z"
        },
        restDoubleWhole: {
            x_min: 0,
            x_max: 122,
            y_min: 0,
            y_max: 249,
            ha: 249,
            o: "m 43 0 b 58 1 48 0 52 0 b 124 20 81 6 102 17 b 176 96 173 27 176 58 b 173 220 174 138 173 179 b 176 304 173 248 176 276 b 140 353 176 331 163 346 b 95 359 125 356 111 359 b 32 346 73 359 52 354 b 0 315 20 340 0 337 b 1 243 0 291 1 268 l 1 174 l 4 174 l 4 48 b 43 0 4 16 17 0 z"
        },
        restWhole: {
            x_min: .8908513171538642,
            x_max: 500,
            y_min: -120,
            y_max: 14,
            ha: 134,
            o: "m 76 -173 l 356 -173 l 356 -171 l 642 -171 b 719 -115 680 -171 717 -145 b 720 -82 719 -104 720 -92 b 711 -20 720 -60 719 -40 b 672 17 704 0 694 10 b 649 20 664 20 657 20 b 605 17 634 20 621 17 b 92 19 433 17 262 17 b 29 7 69 20 49 12 b 9 -17 12 4 9 -6 b 10 -43 9 -26 10 -35 b 1 -84 10 -58 3 -72 b 76 -173 0 -147 7 -173 z"
        },
        restHalf: {
            x_min: 0,
            x_max: 518.3998530468286,
            y_min: 0,
            y_max: 162,
            ha: 162,
            o: "m 98 0 l 446 0 l 556 0 b 665 1 592 0 629 0 b 746 82 720 3 743 29 b 736 174 749 114 740 144 b 670 232 729 215 708 232 b 570 229 636 232 603 229 b 356 233 498 229 426 233 l 73 233 b 0 179 19 233 0 220 b 1 154 0 171 0 164 b 6 95 4 135 6 115 b 98 0 3 27 29 0 z"
        },
        restQuarter: {
            x_min: -.3784452492533808,
            x_max: 263,
            y_min: -415,
            y_max: 415,
            ha: 830,
            o: "m 151 -596 b 164 -563 163 -589 161 -575 b 160 -546 164 -557 161 -552 b 124 -396 148 -495 135 -446 b 122 -380 122 -390 122 -384 b 199 -255 122 -331 158 -272 b 228 -256 209 -249 217 -253 b 324 -346 274 -271 298 -310 b 353 -369 331 -356 341 -369 b 360 -367 356 -369 357 -369 b 379 -336 373 -361 379 -348 l 377 -325 b 344 -232 372 -292 366 -258 b 249 -58 301 -180 278 -117 b 242 -36 245 -49 242 -42 b 258 -7 242 -26 248 -17 b 328 78 284 20 311 45 b 354 158 344 104 354 131 b 337 216 354 177 350 196 b 213 435 294 288 249 359 b 115 575 189 487 158 536 b 78 598 105 585 92 598 b 59 592 72 598 66 596 b 39 562 45 583 39 572 b 53 527 39 550 45 539 b 168 344 98 469 125 402 b 187 307 181 328 187 317 b 153 269 187 294 176 284 b 62 213 122 252 91 235 b 40 180 48 203 40 192 b 46 158 40 173 43 166 b 99 65 60 125 79 95 b 183 -79 131 20 160 -29 b 156 -86 173 -88 164 -85 b 0 -261 58 -99 -7 -173 b 96 -557 10 -366 49 -464 b 124 -585 102 -569 109 -580 b 145 -598 132 -588 138 -598 b 151 -596 147 -598 150 -598 z"
        },
        rest8th: {
            x_min: 0,
            x_max: 289,
            y_min: -260,
            y_max: 261,
            ha: 521,
            o: "m 164 -374 b 212 -340 190 -373 203 -357 b 276 -190 238 -292 258 -242 b 410 285 333 -36 359 128 b 416 314 413 294 416 304 l 416 321 b 393 354 415 341 410 354 b 382 353 389 354 386 354 b 292 311 347 347 315 333 b 174 225 256 276 216 251 b 157 219 168 222 163 219 b 140 228 151 219 145 222 b 131 246 134 233 131 240 b 135 262 131 252 132 256 b 147 298 141 272 147 285 b 127 367 147 323 154 354 b 94 376 114 373 102 376 b 48 336 75 376 63 363 b 3 181 20 288 12 235 b 0 150 1 170 0 160 b 109 24 0 84 35 24 b 171 36 127 24 148 27 b 289 101 213 52 248 75 b 164 -374 256 -62 193 -213 z"
        },
        rest16th: {
            x_min: 0,
            x_max: 333,
            y_min: -328.283950617284,
            y_max: 244,
            ha: 572.2839506172841,
            o: "m 209 -471 b 246 -458 222 -477 236 -468 b 307 -338 279 -425 300 -384 b 324 -226 312 -301 317 -262 b 428 161 350 -94 386 35 b 480 318 445 215 480 259 b 467 347 480 331 477 341 b 445 351 461 350 454 351 b 408 337 432 351 419 347 b 402 333 405 336 403 334 b 223 215 344 294 294 245 b 236 259 229 233 235 246 b 238 276 238 265 238 271 b 212 338 238 302 226 334 b 193 341 206 340 199 341 b 86 289 156 341 104 317 b 59 180 66 255 59 217 b 156 27 59 76 92 27 b 236 46 179 27 204 35 b 338 101 271 59 298 82 b 289 -49 312 49 302 0 b 196 -122 276 -99 235 -107 b 176 -114 187 -127 176 -127 l 176 -111 b 157 -53 177 -88 164 -72 b 69 -9 141 -7 101 -16 b 17 -48 43 -3 29 -27 b 0 -127 4 -73 0 -99 b 6 -186 0 -147 1 -167 b 82 -294 17 -262 37 -294 b 160 -276 102 -294 128 -289 b 219 -242 181 -268 203 -259 b 236 -230 223 -236 229 -230 b 243 -232 239 -230 240 -230 b 235 -275 248 -246 239 -261 b 202 -456 220 -334 202 -395 b 209 -471 202 -462 203 -468 z"
        },
        rest32nd: {
            x_min: 0,
            x_max: 347,
            y_min: -497.5023916875033,
            y_max: 483,
            ha: 980.5023916875033,
            o: "m 177 -716 b 217 -690 194 -720 209 -704 b 233 -655 225 -680 230 -668 b 292 -390 253 -567 275 -480 b 361 -48 312 -275 336 -161 b 452 400 393 102 422 252 b 497 629 467 477 482 553 b 500 647 498 635 500 641 b 480 691 500 665 492 684 b 464 696 475 694 469 696 b 418 674 448 696 431 685 l 361 626 b 333 611 353 618 343 612 b 308 629 325 611 317 616 b 239 667 292 651 265 661 b 204 670 228 668 216 670 b 86 559 141 670 95 628 b 85 537 86 552 85 544 b 107 416 85 495 95 455 b 161 372 114 389 134 372 b 174 373 166 372 170 372 b 226 383 192 374 209 377 b 387 478 285 402 330 444 b 364 386 379 444 364 415 b 276 271 364 323 320 298 b 265 266 272 268 268 266 b 252 276 261 266 256 269 b 143 333 229 311 186 333 b 107 327 130 333 118 330 b 43 243 62 314 46 291 b 58 145 43 210 52 179 b 150 63 68 92 99 63 b 315 132 213 63 259 98 b 266 -58 297 63 281 4 b 207 -101 259 -91 230 -96 b 186 -66 186 -107 199 -75 b 180 -50 181 -63 183 -55 b 101 -3 160 -23 135 -3 b 9 -66 59 -3 20 -32 b 0 -118 3 -84 0 -101 b 10 -196 0 -144 6 -170 b 104 -287 20 -256 52 -287 b 137 -282 114 -287 125 -287 b 184 -269 151 -281 171 -269 b 196 -275 190 -269 193 -271 b 199 -287 197 -278 199 -282 b 184 -343 199 -304 189 -325 b 181 -348 184 -346 183 -347 b 134 -595 158 -429 131 -508 b 156 -677 134 -624 150 -648 b 177 -716 158 -693 160 -713 z"
        },
        rest64th: {
            x_min: 0,
            x_max: 428,
            y_min: -720,
            y_max: 473.6797408388932,
            ha: 1193.6797408388932,
            o: "m 200 -1037 b 229 -1012 215 -1037 222 -1025 b 238 -984 233 -1004 236 -994 b 282 -780 248 -914 265 -848 b 386 -369 317 -644 354 -507 b 491 104 422 -212 451 -53 b 600 541 528 249 550 399 b 616 629 611 570 616 599 b 600 680 616 648 615 671 b 550 665 586 687 566 677 b 480 618 527 649 501 635 b 464 611 474 613 468 611 b 448 622 458 611 454 615 b 366 662 425 651 397 662 b 331 658 354 662 343 661 b 242 572 285 647 253 619 b 236 528 239 557 236 543 b 266 400 236 484 251 442 b 325 373 274 377 301 373 b 436 409 366 373 403 383 l 494 452 b 474 360 485 416 474 389 b 383 248 474 297 435 269 b 320 328 377 288 351 310 b 276 341 305 337 291 341 b 186 269 235 341 194 311 b 181 230 183 256 181 243 b 187 153 181 204 186 179 b 279 63 192 86 233 63 b 304 65 288 63 295 63 b 416 115 344 72 379 92 b 387 -14 406 69 397 27 b 320 -95 380 -52 369 -86 b 318 -79 320 -89 320 -84 b 223 0 305 -29 271 0 b 122 -81 171 0 135 -30 b 118 -127 120 -96 118 -112 b 118 -196 118 -150 118 -173 b 137 -242 118 -215 125 -229 b 209 -275 157 -266 181 -275 b 249 -269 222 -275 235 -274 b 318 -248 272 -264 294 -255 b 281 -390 315 -301 292 -344 b 276 -400 279 -393 279 -397 b 259 -420 272 -408 266 -416 b 246 -429 255 -425 251 -429 b 233 -415 242 -429 238 -426 b 176 -359 225 -389 200 -372 b 121 -346 158 -348 140 -346 b 14 -408 73 -346 27 -370 b 0 -498 4 -438 0 -468 b 6 -564 0 -520 3 -543 b 91 -635 12 -611 45 -635 b 131 -629 104 -635 117 -634 b 223 -590 163 -622 190 -603 b 166 -824 203 -671 189 -747 b 148 -912 157 -852 148 -881 b 156 -955 148 -926 150 -940 b 177 -1008 161 -972 170 -991 b 200 -1037 181 -1020 183 -1037 z"
        },
        rest128th: {
            x_min: .6717818579024267,
            x_max: 491,
            y_min: -711,
            y_max: 719,
            ha: 1430,
            o: "m 233 -1015 b 271 -956 256 -1002 266 -981 l 314 -723 b 393 -350 337 -598 366 -474 b 543 312 442 -128 492 91 b 687 841 583 490 635 665 b 707 958 698 880 707 919 b 706 986 707 968 707 976 b 688 1025 704 999 704 1024 b 670 1027 683 1025 677 1027 b 629 1007 655 1027 639 1022 b 559 945 613 981 586 968 b 541 1004 553 968 559 991 b 456 1035 516 1024 488 1035 b 419 1030 444 1035 431 1034 b 344 953 379 1018 353 995 b 340 900 341 936 340 917 b 341 847 340 881 341 864 b 380 779 340 815 354 793 b 464 763 406 765 435 762 b 592 814 510 763 549 786 b 546 660 575 757 556 710 b 480 585 537 619 517 598 b 478 599 480 590 478 595 b 386 678 472 641 428 678 b 294 612 343 678 304 651 b 279 477 282 567 278 521 b 363 395 281 428 317 395 b 380 396 369 395 374 395 b 488 436 416 403 449 419 b 384 233 469 357 468 275 b 359 291 373 252 377 276 b 282 318 337 310 310 318 b 181 264 243 318 203 298 b 154 107 153 216 154 161 b 242 6 154 42 187 6 b 278 10 253 6 265 7 b 408 88 330 22 366 55 b 387 -1 400 56 393 27 b 301 -112 379 -55 354 -94 b 289 -65 297 -95 302 -79 b 219 -32 269 -42 245 -32 b 183 -37 207 -32 196 -35 b 112 -109 144 -46 121 -71 b 105 -219 104 -145 108 -183 b 186 -315 101 -276 134 -315 b 230 -307 199 -315 215 -312 b 324 -256 264 -295 292 -275 b 180 -491 323 -383 266 -471 b 183 -459 180 -480 180 -469 b 184 -442 184 -454 184 -448 b 184 -436 184 -441 184 -438 b 135 -369 184 -403 170 -383 b 102 -363 125 -364 114 -363 b 29 -399 73 -363 45 -376 b 1 -556 -4 -448 6 -503 b 109 -670 -4 -625 43 -670 b 140 -667 118 -670 130 -668 b 253 -616 180 -658 213 -638 b 238 -688 248 -644 242 -665 b 192 -959 220 -779 192 -867 b 193 -992 192 -971 192 -981 b 210 -1024 194 -1014 199 -1024 b 233 -1015 216 -1024 223 -1021 z"
        },
        dynamicPiano: {
            x_min: -49,
            x_max: 326.5019318364244,
            y_min: -142,
            y_max: 515,
            ha: 657,
            o: "m -56 -204 b -42 -202 -52 -204 -46 -203 b -19 -194 -35 -202 -26 -197 b 147 -138 35 -170 91 -151 b 249 -58 194 -127 223 -95 b 262 -29 255 -50 262 -39 b 258 -17 262 -24 261 -20 b 232 -7 252 -10 242 -7 b 210 -12 225 -7 217 -9 b 125 -40 184 -23 157 -30 b 183 140 153 19 171 79 b 251 167 207 144 230 153 b 469 518 383 262 480 382 b 357 687 472 626 420 687 b 315 678 344 687 330 684 b 204 600 279 664 240 634 b 210 704 206 635 209 670 b 215 721 212 710 215 716 b 206 733 215 727 212 730 b 180 742 197 736 189 742 b 164 734 176 742 170 740 b 1 575 108 684 36 645 b -7 557 -1 569 -7 563 b -6 553 -7 556 -7 554 b 7 547 -3 547 3 547 l 17 547 b 82 575 43 547 59 567 l 82 452 b 56 46 82 317 81 180 b 17 -66 49 7 46 -36 b -62 -173 -13 -99 -37 -135 b -71 -192 -66 -179 -71 -184 b -68 -199 -71 -193 -69 -196 b -56 -204 -65 -203 -60 -204 z m 196 258 b 197 266 197 261 197 264 b 200 510 200 347 199 429 b 233 543 210 521 222 533 b 281 560 249 554 266 560 b 340 503 310 560 333 540 b 344 461 343 488 344 474 b 321 323 344 413 333 369 b 268 272 315 300 295 281 b 196 258 245 265 220 261 z"
        },
        dynamicMezzo: {
            x_min: -18,
            x_max: 559,
            y_min: -50,
            y_max: 365,
            ha: 415,
            o: "m 43 -71 b 160 19 86 -71 143 -26 b 230 264 189 99 200 184 b 282 363 243 297 259 327 b 287 320 285 347 287 333 b 284 279 287 305 285 292 l 249 -12 b 275 -43 248 -29 245 -43 b 395 45 321 -43 389 3 b 462 271 406 124 436 197 b 523 387 475 310 490 348 l 523 346 b 504 130 521 274 513 202 b 501 81 501 114 501 98 b 510 3 501 55 504 29 b 580 -72 521 -48 543 -72 b 625 -63 593 -72 608 -69 b 789 50 690 -43 744 -3 b 805 72 795 56 805 63 b 798 85 805 76 802 81 b 778 94 792 91 785 94 b 755 85 770 94 763 91 l 693 40 b 675 33 685 36 680 33 b 658 52 668 33 662 39 b 645 144 651 82 645 112 b 658 448 641 246 660 346 b 606 507 658 485 638 507 b 583 504 599 507 592 505 b 495 446 547 497 521 471 b 420 373 471 423 448 399 b 413 458 418 406 418 432 b 361 507 408 490 386 507 b 320 491 347 507 333 501 b 160 307 256 444 207 382 l 160 337 b 174 488 160 387 174 438 b 156 521 174 501 173 513 b 137 526 148 524 143 526 b 109 513 127 526 118 520 b -16 399 66 477 23 439 b -26 383 -20 395 -26 389 b -26 379 -26 382 -26 380 b -14 370 -24 372 -20 370 b -6 372 -12 370 -9 372 b 19 376 4 374 12 376 b 36 359 32 376 36 370 b 30 330 36 350 35 341 l 30 323 b 9 -35 23 203 17 85 b 43 -71 6 -65 19 -71 z"
        },
        dynamicForte: {
            x_min: -144,
            x_max: 311.30112136775,
            y_min: -115.3876295915697,
            y_max: 504,
            ha: 619.3876295915697,
            o: "m -101 -166 b 173 76 7 -153 150 -30 b 206 344 192 164 202 253 b 268 338 226 343 246 341 b 384 395 317 333 353 361 b 397 419 393 405 397 412 b 367 442 397 429 387 436 b 350 444 361 444 356 444 b 206 455 302 449 255 454 l 206 474 b 202 540 204 495 202 518 b 209 593 202 557 203 576 b 236 624 215 613 225 624 b 265 612 245 624 253 619 b 308 552 287 596 302 577 b 336 533 312 534 323 533 b 448 611 366 533 444 583 b 399 696 452 648 423 671 b 382 706 395 700 387 703 b 308 726 357 720 333 726 b 207 684 272 726 239 711 b 60 455 135 622 60 560 l 10 455 b -23 448 -1 455 -13 454 b -102 372 -55 426 -76 397 b -109 357 -108 367 -109 361 b -95 347 -109 353 -105 348 b -63 346 -84 346 -73 346 b 0 344 -43 344 -22 344 b 63 344 22 344 43 344 b 53 186 63 291 59 239 b 23 0 46 124 42 60 b -35 -60 10 -42 -6 -60 b -73 -52 -45 -60 -58 -58 b -91 -48 -79 -49 -85 -48 b -109 -53 -96 -48 -102 -49 b -199 -124 -143 -72 -168 -99 b -207 -137 -203 -128 -207 -132 b -194 -148 -207 -141 -203 -145 b -101 -166 -164 -160 -132 -168 z"
        },
        dynamicRinforzando: {
            x_min: -75,
            x_max: 322.0960720195126,
            y_min: -90,
            y_max: 325,
            ha: 415,
            o: "m 23 -130 b 40 -125 27 -130 33 -128 b 128 -9 81 -114 125 -53 b 145 200 132 62 141 130 b 148 238 147 212 148 225 b 308 321 184 291 245 321 b 363 314 325 321 344 318 b 377 310 369 312 373 310 b 384 311 380 310 382 310 b 464 415 410 317 464 389 b 446 433 465 429 455 429 b 390 445 428 441 409 445 b 305 429 361 445 334 438 b 167 346 252 413 202 393 b 153 325 163 338 158 333 b 148 438 154 363 151 399 b 121 468 147 456 134 468 b 101 458 115 468 108 465 b -63 310 46 409 -16 367 b -108 240 -78 289 -98 271 b 32 330 -50 256 -13 297 b 37 304 37 320 37 312 l 37 292 b 10 -101 27 161 20 30 b 23 -130 9 -120 12 -130 z"
        },
        dynamicSforzando: {
            x_min: 0,
            x_max: 296,
            y_min: 0,
            y_max: 379,
            ha: 379,
            o: "m 151 0 b 174 1 160 0 166 0 b 392 158 272 14 346 71 b 405 207 400 174 405 190 b 359 287 405 236 389 265 b 261 325 328 308 294 315 b 168 413 216 340 181 366 b 166 426 167 418 166 423 b 176 438 166 432 167 436 b 199 441 183 441 190 441 b 310 393 238 441 295 422 b 334 370 317 376 325 370 b 363 386 343 370 353 379 b 422 445 386 402 408 420 b 426 458 425 449 426 454 b 422 469 426 462 425 465 b 274 546 395 518 333 546 b 161 503 232 546 190 531 b 86 405 132 472 108 439 b 71 347 75 387 71 367 b 112 256 71 312 85 279 b 209 215 141 232 176 226 b 284 168 238 206 266 197 b 300 131 291 157 300 144 b 298 120 300 127 298 122 b 278 107 294 109 285 108 b 262 108 271 107 266 108 l 259 108 b 114 157 200 107 156 125 b 96 181 104 163 96 170 l 96 184 b 102 202 96 190 102 196 b 96 209 102 204 101 207 b 63 194 82 215 72 204 b 7 109 42 168 26 138 b 0 86 3 101 0 94 b 13 60 0 78 4 68 b 151 0 53 23 101 0 z"
        },
        dynamicZ: {
            x_min: -42.73880183193087,
            x_max: 331,
            y_min: 0,
            y_max: 328,
            ha: 328,
            o: "m -45 0 b -6 16 -32 0 -17 10 b 3 20 -3 16 0 19 b 144 60 49 48 96 60 b 284 22 190 60 238 46 b 348 4 305 10 327 4 b 461 75 393 4 435 30 b 468 91 464 81 467 86 b 456 104 468 95 465 99 b 287 173 402 131 348 167 b 239 176 271 174 255 176 b 168 174 217 176 194 174 b 367 340 236 236 298 294 b 459 423 402 363 432 392 b 477 454 467 431 475 442 b 474 462 477 456 475 459 b 454 472 469 469 462 472 b 432 468 446 472 439 469 b 356 448 406 461 380 455 b 210 422 307 433 258 422 b 109 442 177 422 144 428 b 94 445 104 444 99 445 b 69 433 85 445 76 442 b 27 390 56 419 39 406 b -9 343 16 373 -17 357 b 63 311 3 320 36 314 l 78 311 b 132 307 95 308 114 307 b 240 314 168 307 203 311 l 193 271 b -37 50 117 196 19 145 b -59 7 -46 36 -69 20 b -45 0 -55 3 -50 0 z"
        },
        ornamentTrill: {
            x_min: 1,
            x_max: 551,
            y_min: -18,
            y_max: 539,
            ha: 557,
            o: "m 269 -17 b 343 135 325 19 346 66 b 343 158 343 147 344 147 b 323 192 341 171 337 187 b 291 176 311 194 300 184 b 264 148 282 167 274 158 b 229 131 261 145 238 131 b 212 170 209 131 213 154 b 194 438 203 259 199 348 l 272 442 b 284 452 276 441 279 441 b 305 462 287 461 295 462 b 312 462 307 462 310 462 b 346 477 325 462 340 464 b 366 560 357 503 366 531 b 321 612 366 598 356 618 b 190 602 278 605 235 605 l 190 638 b 187 693 190 652 190 667 b 161 776 184 717 193 776 b 137 747 150 776 137 766 b 130 654 135 716 131 685 l 130 596 l 52 588 b 4 539 23 585 7 570 b 1 477 3 530 1 500 b 3 448 1 461 3 448 b 3 461 3 448 3 452 b 53 432 0 438 19 432 b 134 435 75 432 102 433 b 151 117 138 328 147 223 b 170 13 153 82 157 46 b 209 -26 179 -10 193 -26 b 222 -22 213 -26 217 -24 b 269 -17 233 -16 253 -27 z m 549 66 b 577 99 563 66 572 84 b 580 131 580 109 580 121 l 580 302 b 600 347 580 318 582 337 b 701 392 632 364 665 384 b 793 518 785 409 793 435 b 759 588 793 559 785 576 b 711 560 749 592 733 570 b 588 500 671 541 631 521 b 583 533 586 514 586 524 b 560 576 577 549 577 572 b 517 550 541 582 528 564 b 416 423 482 508 452 462 b 382 353 392 397 384 370 b 387 305 380 341 386 318 b 392 275 389 295 392 285 b 409 243 393 262 393 243 b 431 262 419 243 425 255 b 521 373 459 298 488 333 b 523 354 521 366 523 360 b 520 337 523 346 521 340 b 508 295 513 323 508 310 b 530 102 508 279 524 122 b 549 66 533 88 530 66 z"
        },
        ornamentTurn: {
            x_min: 0,
            x_max: 574,
            y_min: 0,
            y_max: 312,
            ha: 312,
            o: "m 651 0 b 816 132 727 0 796 46 b 827 223 822 163 827 193 b 808 340 827 262 821 301 b 665 449 785 408 729 449 b 636 446 655 449 647 448 b 589 384 600 441 586 422 l 602 300 b 611 285 603 291 605 285 b 621 288 613 285 616 287 b 655 295 632 294 644 295 b 711 284 674 295 693 289 b 773 209 740 275 773 232 b 697 156 773 184 734 160 b 664 154 685 154 675 154 b 579 168 635 154 608 158 b 455 242 533 186 495 213 b 261 400 387 291 331 354 b 160 432 225 422 190 432 b 20 328 98 432 49 392 b 0 229 6 295 0 262 b 30 71 0 176 14 122 b 144 3 43 29 96 3 b 168 6 153 3 160 4 b 248 122 233 20 248 39 b 246 147 248 124 248 135 b 226 177 243 164 239 177 b 206 170 220 177 215 174 b 144 154 186 158 166 154 b 79 170 122 154 101 160 b 53 202 62 179 53 189 b 60 228 53 209 55 217 b 161 281 81 261 120 281 b 183 279 168 281 176 281 b 325 190 243 269 284 229 b 572 16 402 124 475 53 b 651 0 598 6 625 0 z"
        },
        ornamentTurnSlash: {
            x_min: 0,
            x_max: 574,
            y_min: -106,
            y_max: 405,
            ha: 511,
            o: "m 441 -153 b 456 -60 455 -118 456 -89 b 455 81 455 -14 455 33 b 572 14 491 55 530 30 b 651 -1 598 4 625 -1 b 816 131 727 -1 796 45 b 827 222 822 161 827 192 b 808 338 827 261 821 300 b 665 448 785 406 729 448 b 636 445 655 448 647 446 b 589 383 600 439 586 420 l 602 298 b 611 284 603 289 605 284 b 621 287 613 284 616 285 b 655 294 632 292 644 294 b 711 282 674 294 693 288 b 773 207 740 274 773 230 b 697 154 773 183 734 158 b 664 153 685 153 675 153 b 579 167 635 153 608 157 b 455 240 533 183 495 212 b 454 242 455 240 455 242 l 454 337 b 452 488 454 386 452 439 b 433 570 452 517 451 546 b 425 583 431 575 431 583 l 422 583 b 403 566 415 582 408 573 b 402 546 400 560 402 553 l 397 287 b 261 399 353 325 310 366 b 160 431 225 420 190 431 b 20 327 98 431 48 390 b 0 228 6 294 0 261 b 30 69 0 174 14 121 b 144 1 43 27 96 1 b 168 4 153 1 160 3 b 248 121 233 19 248 37 b 246 145 248 122 248 134 b 226 176 243 163 239 176 b 206 168 220 176 215 173 b 144 153 186 157 166 153 b 79 168 122 153 101 158 b 53 200 62 177 53 187 b 60 226 53 207 55 216 b 161 279 79 259 120 279 b 183 278 168 279 176 279 b 325 189 243 266 282 226 b 395 130 348 168 372 148 b 393 71 393 109 393 89 b 441 -153 390 -6 402 -78 z"
        },
        ornamentMordent: {
            x_min: 0,
            x_max: 700,
            y_min: 0,
            y_max: 497,
            ha: 497,
            o: "m 513 0 b 528 39 526 14 527 27 b 531 72 531 50 531 60 b 528 138 531 94 528 117 l 528 347 b 552 359 537 354 544 359 b 579 338 560 359 569 353 b 674 217 609 297 639 255 b 719 190 690 200 704 190 b 759 215 732 190 744 197 b 940 395 815 279 877 337 b 1001 490 968 422 986 455 b 1008 513 1004 495 1008 505 b 1002 524 1008 517 1007 521 b 968 516 994 530 978 524 b 960 508 965 513 963 510 b 798 356 900 464 848 410 b 778 341 791 347 783 341 b 757 354 772 341 765 346 b 661 475 720 392 690 432 b 611 517 644 504 629 517 b 563 498 598 517 583 511 b 527 471 550 490 539 481 l 527 570 b 492 716 526 619 523 671 b 472 677 480 704 472 694 b 465 399 474 585 468 491 b 439 366 456 387 448 376 b 384 320 415 336 399 320 b 330 367 369 320 354 336 b 325 376 328 369 327 373 b 226 490 291 413 265 456 b 189 505 213 500 202 505 b 157 491 177 505 167 500 b 0 229 75 420 0 346 b 1 202 0 220 0 212 b 22 215 12 203 16 209 b 124 327 55 252 89 289 b 147 343 132 337 140 343 b 171 323 156 343 164 336 b 266 197 196 276 232 236 b 337 157 291 170 314 157 b 410 207 361 157 386 174 b 461 274 428 229 444 252 b 462 166 461 238 461 202 b 513 0 465 108 487 55 z"
        },
        ornamentShortTrill: {
            x_min: 0,
            x_max: 747,
            y_min: 0,
            y_max: 243,
            ha: 243,
            o: "m 379 0 b 428 14 395 0 410 4 b 474 56 445 26 461 39 b 552 157 500 89 526 122 b 566 168 556 163 560 168 b 575 157 569 168 572 166 b 664 36 592 107 628 72 b 733 1 685 13 710 1 b 802 35 757 1 780 13 b 1007 249 871 105 940 177 b 1067 324 1028 272 1054 295 b 1076 340 1068 330 1076 334 b 1073 346 1076 341 1076 343 b 1057 350 1068 348 1063 350 b 1047 347 1053 350 1050 350 b 1001 310 1031 336 1015 324 l 857 157 b 844 143 852 153 848 143 b 835 150 841 143 838 144 b 757 242 815 186 780 209 b 685 298 739 268 713 284 b 641 310 670 305 655 310 b 590 288 625 310 608 304 b 497 179 554 256 527 215 b 480 164 490 170 485 164 b 462 179 474 164 469 168 b 372 295 436 220 405 258 b 278 344 346 324 312 344 b 199 310 252 344 226 334 b 92 196 161 274 128 233 b 0 24 46 148 23 89 b 42 48 22 27 32 37 b 156 168 84 85 114 132 b 196 192 174 184 186 192 b 228 158 206 192 215 181 b 312 36 252 114 282 75 b 379 0 331 12 354 0 z"
        },
        ornamentTremblement: {
            x_min: 0,
            x_max: 982.17691453624,
            y_min: 0,
            y_max: 224,
            ha: 224,
            o: "m 0 0 b 63 36 30 12 48 23 b 157 124 94 66 125 94 b 177 135 164 131 170 135 b 196 122 183 135 189 131 b 268 40 217 94 245 68 b 323 6 288 16 304 6 b 369 20 336 6 350 10 b 412 53 384 29 399 40 b 501 145 442 84 472 114 b 523 158 508 154 516 158 b 543 145 528 158 536 154 b 641 45 576 112 608 78 b 698 17 658 27 677 17 b 729 23 708 17 719 20 b 804 65 756 32 780 46 b 904 154 837 95 871 124 b 920 163 910 160 916 163 b 936 153 924 163 930 160 b 1024 60 965 121 996 92 b 1112 13 1053 29 1080 13 b 1184 39 1135 13 1158 22 b 1359 194 1248 84 1305 138 b 1413 301 1388 223 1403 261 b 1404 323 1417 315 1413 323 b 1391 320 1400 323 1395 321 b 1344 294 1375 314 1358 307 b 1224 186 1305 258 1269 216 b 1194 173 1212 179 1202 173 b 1165 193 1184 173 1175 179 b 1096 271 1145 222 1122 248 b 1001 318 1061 302 1031 318 b 903 268 969 318 937 301 b 806 186 871 239 841 210 b 782 174 796 179 789 174 b 756 193 773 174 765 180 b 652 291 729 232 693 266 b 596 308 634 302 615 308 b 530 278 573 308 552 298 l 415 168 b 393 157 408 161 400 157 b 373 171 387 157 380 161 b 305 245 353 197 330 222 b 248 276 285 266 266 278 b 189 245 229 276 210 266 b 81 144 156 209 120 174 b 0 0 33 109 26 56 z"
        },
        ornamentPrecompAppoggTrill: {
            x_min: -.11067192132025548,
            x_max: 1066,
            y_min: -50,
            y_max: 533.1706452421108,
            ha: 583.1706452421108,
            o: "m 187 -46 b 213 -14 197 -37 204 -26 b 285 151 251 36 266 94 b 304 189 294 177 297 189 b 337 168 311 189 320 181 b 458 33 386 131 415 76 b 495 12 472 19 484 12 b 531 40 508 12 518 22 b 580 168 557 79 569 124 b 622 235 592 213 603 235 b 683 194 636 235 655 222 b 838 26 737 140 791 86 b 919 -33 860 -1 881 -39 b 984 53 960 -27 971 19 b 1022 156 998 86 1008 122 b 1054 190 1032 179 1041 190 b 1089 167 1063 190 1074 183 b 1208 32 1129 122 1171 78 b 1244 10 1221 17 1231 10 b 1273 22 1253 10 1263 14 b 1496 206 1352 78 1427 137 b 1535 310 1526 236 1535 272 b 1531 359 1535 325 1534 343 b 1496 343 1515 360 1506 351 l 1309 192 b 1269 167 1289 176 1279 167 b 1234 199 1260 167 1251 177 b 1122 324 1200 243 1168 289 b 1074 344 1106 337 1089 344 b 1014 301 1051 344 1030 328 b 952 144 985 252 971 197 b 933 121 946 128 940 121 b 910 137 927 121 920 125 b 850 210 888 161 870 186 b 687 369 799 266 750 325 b 631 390 665 383 647 390 b 567 327 602 390 580 369 b 527 199 554 284 543 242 b 508 168 520 179 514 168 b 482 192 503 168 495 177 b 353 328 444 240 405 292 b 312 343 338 338 324 343 b 266 297 292 343 276 327 b 204 125 248 239 232 180 b 143 79 193 102 173 79 b 92 122 117 79 105 102 b 81 154 86 131 84 143 b 48 423 59 242 50 333 b 45 544 46 464 45 504 b 53 730 45 606 48 668 b 40 768 55 744 52 766 b 13 730 19 770 14 747 b 0 514 7 658 -1 586 b 26 122 3 383 6 252 b 75 -36 35 66 40 10 b 134 -72 92 -59 112 -72 b 187 -46 151 -72 170 -63 z"
        },
        ornamentPrecompSlideTrillDAnglebert: {
            x_min: 0,
            x_max: 1088,
            y_min: -380,
            y_max: 252,
            ha: 632,
            o: "m 560 -539 b 439 -481 527 -497 484 -485 b 354 -461 409 -478 380 -477 b 131 -154 236 -389 161 -285 b 124 -98 127 -135 124 -117 b 196 55 124 -40 148 10 b 308 99 230 86 268 99 b 399 81 337 99 367 92 b 514 22 441 66 477 43 b 619 -30 567 -9 590 -30 b 719 17 642 -30 670 -16 b 861 131 769 52 818 88 b 899 150 874 144 887 150 b 936 117 913 150 926 138 b 965 43 948 94 956 68 b 1007 -1 973 24 978 -1 b 1048 30 1025 -1 1037 16 b 1070 65 1057 40 1064 52 b 1110 148 1084 92 1096 121 b 1145 190 1120 164 1120 190 b 1191 153 1169 192 1179 168 b 1256 29 1218 115 1231 68 b 1292 1 1267 10 1277 1 b 1320 10 1300 1 1309 4 b 1369 48 1339 19 1355 33 b 1515 196 1418 96 1464 148 b 1567 343 1558 238 1567 287 b 1555 363 1565 357 1562 363 b 1539 356 1551 363 1547 360 b 1433 268 1502 330 1466 301 b 1335 171 1401 236 1374 199 b 1310 163 1325 166 1318 163 b 1286 183 1302 163 1293 168 b 1218 311 1264 226 1247 272 b 1164 351 1200 337 1182 351 b 1110 308 1146 351 1128 337 b 1031 176 1084 265 1058 219 b 1015 161 1025 166 1021 161 b 999 179 1009 161 1005 167 b 955 279 985 213 973 248 b 913 307 943 300 930 307 b 887 302 904 307 896 305 b 852 281 874 298 863 291 b 693 167 804 236 747 204 b 612 140 667 150 639 140 b 549 157 592 140 570 145 b 403 220 503 181 452 202 b 271 248 360 236 315 248 b 179 229 239 248 209 242 b 0 -29 65 180 0 85 b 9 -104 0 -53 3 -78 b 397 -526 56 -317 183 -464 b 505 -547 432 -536 468 -547 b 560 -539 524 -547 541 -544 z"
        },
        ornamentPrecompSlideTrillBach: {
            x_min: 0,
            x_max: 1185,
            y_min: -380,
            y_max: 465,
            ha: 845,
            o: "m 624 -544 b 642 -528 638 -543 642 -537 b 639 -514 642 -524 642 -520 b 590 -444 629 -487 609 -467 b 523 -413 573 -422 553 -410 b 498 -415 514 -415 507 -415 b 399 -389 464 -415 431 -405 b 89 -157 281 -330 176 -255 b 72 -117 78 -144 72 -131 b 73 -101 72 -111 72 -107 b 187 186 91 3 147 91 b 246 230 200 216 222 230 b 300 209 262 230 281 223 b 456 48 359 163 403 101 b 540 -10 494 10 518 -10 b 625 59 566 -10 589 13 b 690 148 648 88 668 118 b 711 167 697 160 704 167 b 733 153 719 167 724 163 b 844 14 769 105 808 60 b 903 -42 873 -23 886 -42 b 973 -1 919 -42 937 -27 b 1008 33 986 7 996 20 b 1048 81 1021 48 1035 65 b 1050 37 1048 66 1050 52 b 1047 -24 1050 17 1048 -3 b 1038 -275 1038 -108 1040 -192 l 1037 -289 b 1045 -302 1037 -295 1038 -301 b 1068 -284 1056 -304 1064 -292 b 1084 -242 1076 -271 1081 -256 b 1099 -109 1096 -199 1099 -154 b 1106 158 1099 -19 1106 71 b 1128 187 1113 167 1120 177 b 1168 223 1143 212 1155 223 b 1210 193 1179 223 1191 213 b 1220 183 1214 190 1215 186 b 1329 36 1261 138 1292 84 b 1374 7 1345 16 1358 7 b 1411 20 1384 7 1395 12 b 1479 84 1437 37 1459 59 b 1610 235 1521 135 1564 186 b 1706 403 1655 282 1695 334 b 1614 346 1663 400 1637 373 b 1464 170 1564 287 1515 228 b 1440 150 1453 156 1447 150 b 1414 173 1433 150 1426 158 b 1283 336 1371 228 1333 288 b 1220 366 1261 356 1240 366 b 1148 318 1194 366 1169 350 b 1103 255 1133 297 1119 275 b 1097 301 1102 271 1100 285 b 1099 334 1099 312 1099 324 b 1092 428 1099 367 1094 397 b 1071 647 1087 501 1079 575 b 1058 670 1071 657 1071 670 b 1035 648 1047 670 1038 661 b 1018 516 1024 605 1015 560 b 1041 203 1025 412 1037 307 b 1043 180 1041 196 1043 187 b 992 127 1027 161 1009 143 b 965 111 981 117 972 111 b 936 132 955 111 946 120 b 829 268 900 179 867 225 b 760 317 801 301 780 317 b 691 258 739 317 719 297 b 605 147 664 219 641 177 b 589 138 599 141 593 138 b 572 148 583 138 579 141 b 415 317 520 206 467 261 b 327 372 390 343 366 366 b 300 373 317 373 308 373 b 154 295 239 373 190 348 b 55 138 120 243 85 192 b 0 -53 22 79 0 13 b 160 -317 0 -156 49 -252 b 209 -354 177 -327 192 -343 b 510 -531 305 -419 397 -495 b 593 -547 537 -540 564 -547 b 624 -544 603 -547 613 -546 z"
        },
        ornamentPrecompTrillSuffixDandrieu: {
            x_min: 0,
            x_max: 1003,
            y_min: -20,
            y_max: 521,
            ha: 541,
            o: "m 791 -16 b 844 33 812 -3 829 14 b 981 271 900 107 937 190 b 994 288 984 278 985 288 b 1009 269 1004 288 1007 278 b 1077 112 1034 217 1051 163 b 1158 43 1103 62 1129 43 b 1231 69 1179 43 1204 55 b 1348 189 1280 98 1315 143 b 1444 451 1407 271 1444 357 b 1431 547 1444 482 1440 514 b 1188 750 1401 665 1299 750 b 1158 747 1178 750 1168 749 b 1079 684 1119 742 1089 727 b 1063 632 1076 665 1071 648 b 1056 609 1058 622 1056 615 b 1071 599 1056 602 1060 599 b 1086 600 1076 599 1080 600 b 1130 605 1102 603 1116 605 b 1244 569 1171 605 1210 595 b 1349 346 1322 511 1349 433 b 1348 312 1349 334 1349 324 b 1289 197 1345 266 1325 228 b 1238 174 1270 181 1253 174 b 1188 215 1220 174 1202 187 b 1145 308 1172 245 1159 276 b 1096 413 1129 343 1120 382 b 1053 438 1084 431 1068 438 b 1011 413 1038 438 1022 431 b 955 324 989 384 971 354 b 850 127 920 258 886 192 b 838 112 847 121 842 112 b 824 128 828 109 825 121 b 802 193 815 150 809 171 b 730 400 779 264 766 337 b 688 431 719 420 703 431 b 647 403 674 431 660 422 b 606 338 632 383 619 361 b 513 167 575 282 546 223 b 480 122 503 150 498 122 b 452 171 459 122 459 153 b 420 255 442 199 432 228 b 337 408 399 308 380 364 b 276 436 317 428 297 436 b 215 397 253 436 230 423 b 23 72 148 289 81 184 b 0 29 17 59 0 40 b 7 17 0 23 1 20 b 59 58 26 7 46 39 b 190 276 111 127 143 206 b 216 301 202 292 207 301 b 245 279 223 301 232 294 b 311 166 278 248 292 206 b 367 16 331 117 346 65 b 402 -19 377 -7 387 -19 b 438 -4 412 -19 423 -13 b 518 88 474 17 495 55 b 628 284 562 150 592 216 b 657 223 648 266 651 243 b 717 13 677 154 696 84 b 755 -29 726 -16 737 -29 b 791 -16 765 -29 776 -24 z"
        },
        ornamentPrecompDoubleCadenceUpperPrefix: {
            x_min: 0,
            x_max: 1246,
            y_min: -30,
            y_max: 296.0302860502196,
            ha: 326.0302860502196,
            o: "m 360 -43 b 559 59 445 -43 503 7 b 698 236 615 111 652 179 b 714 248 704 243 710 248 b 727 235 719 248 721 243 l 848 42 b 883 12 860 22 870 12 b 917 32 891 12 903 19 b 946 62 927 42 939 50 b 1037 192 972 108 1009 147 b 1057 210 1044 204 1051 210 b 1076 190 1063 210 1068 203 l 1176 12 b 1215 -19 1188 -9 1201 -19 b 1250 -6 1225 -19 1237 -14 b 1284 27 1264 3 1274 16 b 1380 190 1323 78 1351 135 b 1395 210 1384 197 1385 210 b 1413 190 1405 210 1410 197 b 1508 40 1436 134 1467 85 b 1564 3 1529 14 1547 3 b 1617 32 1580 3 1597 12 b 1767 238 1678 92 1719 167 b 1794 310 1781 259 1791 282 b 1752 294 1776 317 1764 304 b 1656 164 1711 258 1689 206 b 1629 144 1646 151 1637 144 b 1603 161 1620 144 1613 150 b 1502 315 1562 207 1525 258 b 1452 357 1490 344 1470 357 b 1397 320 1431 357 1411 344 b 1316 170 1368 271 1345 219 b 1280 127 1306 154 1303 127 b 1244 171 1256 127 1254 154 b 1145 337 1210 226 1179 282 b 1110 363 1135 354 1122 363 b 1070 338 1097 363 1084 354 b 1050 311 1063 330 1057 320 b 959 181 1017 271 992 223 b 939 167 950 173 945 167 b 920 184 933 167 927 173 b 818 343 887 238 852 291 b 759 395 795 377 778 395 b 701 344 742 395 724 377 b 698 338 700 341 700 340 b 544 154 652 272 605 207 b 412 98 501 117 458 98 b 304 130 377 98 341 108 b 95 373 204 187 144 275 b 58 426 85 393 82 428 b 19 366 26 426 26 389 b 0 307 13 346 0 327 b 4 287 0 300 1 294 b 174 36 49 194 91 102 b 360 -43 230 -9 289 -43 z"
        },
        ornamentPrecompDoubleCadenceUpperPrefixTurn: {
            x_min: 0,
            x_max: 1226,
            y_min: -237,
            y_max: 436,
            ha: 673,
            o: "m 1279 -341 b 1293 -252 1293 -307 1295 -278 b 1277 36 1287 -156 1282 -59 l 1273 118 b 1318 176 1289 137 1303 157 b 1349 203 1332 193 1342 203 b 1378 168 1359 203 1367 192 b 1456 35 1401 122 1428 78 b 1511 -12 1476 3 1493 -12 b 1568 23 1526 -12 1544 0 b 1597 53 1578 32 1588 42 b 1705 186 1629 101 1669 143 b 1761 284 1728 216 1751 246 b 1765 300 1763 288 1765 295 b 1763 307 1765 302 1765 305 b 1737 302 1754 311 1744 308 b 1718 287 1729 298 1725 292 b 1598 145 1673 245 1637 194 b 1578 130 1590 135 1584 130 b 1557 147 1571 130 1565 135 b 1447 321 1516 202 1488 265 b 1403 351 1433 341 1417 351 b 1358 323 1388 351 1372 341 b 1269 209 1329 285 1299 248 b 1254 521 1264 314 1259 418 b 1228 616 1253 554 1247 588 b 1218 628 1224 621 1223 628 l 1215 628 b 1201 613 1210 626 1202 619 b 1200 600 1200 609 1200 605 l 1200 586 b 1211 348 1204 507 1207 428 b 1217 166 1214 288 1215 226 b 1202 181 1212 168 1208 174 b 1094 334 1168 233 1130 284 b 1048 366 1079 356 1064 366 b 1004 331 1034 366 1018 354 b 904 154 969 275 930 220 b 873 202 887 171 880 187 b 778 356 845 256 819 311 b 737 379 763 372 750 379 b 698 353 724 379 711 370 l 621 232 b 415 114 570 154 495 114 b 302 138 377 114 340 121 b 73 400 187 192 117 284 b 55 420 69 415 62 420 b 42 410 50 420 45 416 b 0 292 23 373 0 334 b 4 262 0 282 1 272 b 168 39 32 168 92 99 b 359 -26 225 -6 292 -26 b 585 76 446 -26 530 10 b 668 202 616 115 641 160 b 693 228 680 219 687 228 b 720 203 700 228 707 219 b 801 63 752 160 775 111 b 844 7 812 42 818 7 b 910 66 877 6 894 39 b 923 94 916 75 919 85 b 995 219 945 137 968 179 b 1025 184 1009 210 1017 197 b 1119 56 1054 141 1087 98 b 1166 20 1138 32 1152 20 b 1215 50 1181 20 1195 30 b 1221 56 1217 52 1218 55 b 1228 -163 1223 -17 1225 -89 b 1279 -341 1231 -223 1251 -278 z"
        },
        ornamentPrecompTrillLowerSuffix: {
            x_min: 0,
            x_max: 833,
            y_min: -309,
            y_max: 319,
            ha: 628,
            o: "m 778 -444 b 801 -445 785 -444 793 -445 b 1037 -338 894 -445 969 -397 b 1200 37 1149 -240 1200 -109 b 1084 406 1200 171 1172 300 b 1024 444 1064 431 1043 444 b 960 390 999 444 978 426 b 841 163 923 314 886 236 b 812 128 832 150 827 128 b 786 167 796 130 793 153 b 660 418 744 251 716 341 b 599 459 639 445 619 459 b 541 410 577 459 557 444 b 439 197 507 340 474 269 b 422 179 435 190 435 179 b 338 393 392 251 379 328 b 275 439 320 423 298 439 b 212 396 253 439 230 425 b 71 219 170 333 128 268 b 0 45 17 173 16 112 b 68 98 32 62 50 78 b 194 264 112 150 153 209 b 230 292 209 282 219 292 b 264 261 240 292 251 282 b 274 242 268 255 269 248 b 346 46 304 179 325 112 b 376 10 351 32 354 10 b 412 35 392 10 403 22 b 452 107 429 56 441 82 b 541 291 481 168 511 230 b 556 307 547 302 552 307 b 573 295 562 307 567 302 b 624 217 595 272 611 246 b 721 1 657 145 685 72 b 755 -27 732 -19 742 -27 b 786 -16 765 -27 775 -24 b 857 73 819 7 840 39 b 952 256 887 134 920 194 b 978 289 963 279 969 289 b 1009 262 985 289 994 281 b 1030 235 1017 253 1024 245 b 1110 -4 1071 161 1099 81 b 1116 -68 1113 -26 1116 -48 b 1009 -243 1116 -140 1090 -200 b 848 -291 956 -272 901 -291 b 730 -261 809 -291 770 -282 b 696 -248 714 -252 703 -248 b 671 -284 684 -248 678 -258 l 662 -312 b 657 -357 658 -330 657 -344 b 744 -439 657 -403 683 -425 z"
        },
        stringsDownBow: {
            x_min: 0,
            x_max: 306,
            y_min: -.09607201951262866,
            y_max: 366,
            ha: 366.09607201951263,
            o: "m 405 0 b 425 17 413 -1 420 9 b 439 66 435 32 439 48 b 441 268 439 137 441 202 b 436 412 441 314 439 361 l 435 413 b 423 469 435 436 431 456 b 344 508 406 501 373 501 b 204 527 298 520 251 527 b 60 498 156 527 108 518 b 7 438 32 485 10 468 l 7 426 b 4 337 7 396 7 367 b 0 140 0 272 0 206 b 1 42 0 107 0 73 b 13 3 1 27 -3 4 b 40 39 29 3 35 24 b 42 53 42 43 40 49 b 49 141 48 84 49 112 b 48 215 49 167 48 192 b 49 252 48 228 48 240 l 49 312 b 130 343 72 331 99 340 b 206 347 156 346 180 347 b 372 314 262 347 318 338 l 390 307 l 390 245 b 390 138 392 212 390 176 b 397 23 390 101 392 62 b 405 0 399 14 393 1 z"
        },
        stringsUpBow: {
            x_min: 0,
            x_max: 219.2842808242076,
            y_min: 0,
            y_max: 489,
            ha: 489,
            o: "m 150 0 l 151 0 b 184 42 170 12 180 26 b 297 554 223 212 261 382 b 315 690 305 598 318 645 b 304 704 315 697 311 704 b 276 670 288 704 282 697 b 157 131 236 490 196 311 l 157 144 b 73 526 134 276 104 396 b 30 677 60 576 52 638 b 13 694 26 684 22 694 b 0 674 9 694 0 691 l 0 671 b 10 603 3 649 6 626 b 105 174 42 461 72 317 b 150 0 117 117 128 58 z"
        },
        stringsHarmonic: {
            x_min: 0,
            x_max: 191,
            y_min: 0,
            y_max: 202,
            ha: 202,
            o: "m 143 0 b 275 122 217 0 275 53 b 127 291 275 206 202 291 b 0 154 63 291 0 222 b 143 0 0 76 71 0 z m 122 68 b 43 105 89 66 59 75 b 39 124 40 111 39 117 b 79 199 39 148 56 180 b 145 226 101 216 122 226 b 199 210 163 226 180 220 b 235 150 223 196 235 173 b 203 92 235 128 225 107 b 122 68 181 76 150 68 z"
        },
        pluckedSnapPizzicatoAbove: {
            x_min: 0,
            x_max: 201,
            y_min: 0,
            y_max: 325,
            ha: 325,
            o: "m 171 0 b 289 99 240 0 289 45 b 258 183 289 130 274 156 b 174 269 236 217 203 240 l 174 408 b 174 429 174 415 176 422 b 131 468 168 451 153 468 b 117 451 120 468 117 461 b 118 429 117 444 118 435 b 115 307 117 389 115 347 b 0 166 59 295 0 223 b 171 0 0 85 89 0 z m 134 55 b 52 131 84 55 52 85 b 115 233 52 179 81 209 b 114 192 114 220 114 206 b 174 120 114 137 114 137 l 174 228 b 233 148 200 207 223 183 b 236 130 235 143 236 135 b 197 72 236 105 223 85 b 134 55 177 60 157 55 z"
        },
        pluckedSnapPizzicatoBelow: {
            x_min: 0,
            x_max: 211,
            y_min: 0,
            y_max: 307,
            ha: 307,
            o: "m 145 7 b 163 0 153 3 158 0 b 173 23 170 0 173 7 l 173 140 l 170 140 l 170 163 l 171 163 b 206 170 179 164 193 166 b 304 287 264 186 304 233 b 281 354 304 308 297 333 b 118 442 240 412 186 439 b 0 324 69 442 0 370 b 115 176 0 266 55 202 l 115 56 b 145 7 114 33 125 19 z m 115 220 b 62 256 92 223 73 230 b 53 292 56 269 53 281 b 78 344 53 311 60 328 b 168 384 105 372 135 384 b 213 376 183 384 199 382 b 253 321 239 366 253 346 b 246 291 253 311 251 301 b 170 226 230 256 203 236 l 170 258 b 148 305 171 278 163 292 b 128 315 143 310 135 315 l 124 315 b 115 301 117 314 115 308 z"
        },
        pluckedLeftHandPizzicato: {
            x_min: 0,
            x_max: 271,
            y_min: 0,
            y_max: 284,
            ha: 284,
            o: "m 213 0 b 223 14 222 0 223 7 b 222 35 223 22 222 29 l 222 176 b 373 170 272 174 323 170 b 390 180 382 170 390 171 l 390 184 b 347 232 386 207 382 232 b 219 238 307 233 266 235 l 219 364 b 171 409 219 395 193 409 b 156 393 160 409 156 402 b 158 370 156 384 158 376 l 158 240 b 16 239 115 240 66 239 b 0 226 7 239 0 238 l 0 223 b 50 179 1 203 29 179 b 158 177 86 179 122 179 l 158 63 b 161 29 158 52 158 40 b 213 0 166 -1 194 1 z"
        },
        keyboardPedalPed: {
            x_min: 0,
            x_max: 944,
            y_min: -13,
            y_max: 550,
            ha: 563,
            o: "m 22 0 b 109 78 53 0 105 46 l 144 333 b 163 376 147 347 140 372 b 364 465 238 390 301 426 b 454 599 416 497 454 540 b 452 618 454 605 454 612 b 320 770 442 694 396 747 b 248 779 295 778 272 779 b 193 778 229 779 212 779 b 160 780 181 778 167 775 b 137 792 153 789 144 791 b 109 789 128 792 118 789 b 7 719 59 789 48 737 b 23 708 16 714 20 708 b 36 710 29 710 33 710 b 53 684 52 710 53 698 l 53 674 b 43 386 53 577 53 482 b 20 164 36 312 30 238 b 1 30 14 120 7 75 b 0 19 0 26 0 22 b 22 0 0 9 4 0 z m 393 -17 b 634 145 494 16 579 52 b 638 160 636 151 638 156 b 625 168 638 166 634 168 b 621 167 624 168 622 168 b 524 118 582 164 544 160 b 495 79 517 104 505 92 b 435 33 471 49 452 33 b 380 96 416 33 397 55 b 369 145 373 114 369 131 b 442 225 369 186 395 213 b 468 232 451 228 459 229 b 654 344 539 255 606 285 b 677 395 667 360 677 376 b 672 415 677 402 675 408 b 612 459 661 442 639 455 b 589 461 602 461 592 461 b 348 328 500 461 409 408 b 269 120 302 268 269 199 b 379 -19 269 45 318 -19 b 393 -17 383 -19 389 -19 z m 395 240 b 494 383 418 300 452 344 l 521 405 b 544 419 528 409 536 418 b 554 415 547 419 550 418 b 570 383 564 406 570 396 l 570 379 b 552 331 570 360 562 344 b 395 240 511 285 462 253 z m 171 425 b 156 442 160 425 156 429 b 157 475 157 452 157 464 b 164 602 161 517 164 560 b 161 698 164 635 163 667 b 184 729 161 720 167 729 l 193 729 b 348 563 278 719 348 641 b 346 539 348 554 347 547 b 171 425 328 459 229 422 z m 827 89 b 792 111 815 89 804 96 b 766 204 775 131 766 158 b 845 360 772 256 799 314 b 871 372 854 369 863 372 b 897 366 880 372 888 369 b 978 279 942 353 963 320 b 976 259 981 272 981 265 b 858 104 942 203 909 147 b 827 89 847 94 837 89 z m 979 6 b 1008 13 986 6 995 9 b 1081 101 1047 29 1079 46 b 1116 449 1087 217 1104 333 b 1143 654 1123 518 1133 586 b 1148 685 1145 664 1148 675 b 1140 704 1148 693 1146 700 b 1107 716 1130 713 1119 716 b 1056 706 1092 716 1073 710 b 1037 671 1035 703 1038 685 b 1004 439 1025 595 1014 517 b 986 419 1001 428 999 419 b 979 419 985 419 982 420 b 935 426 965 423 949 425 b 795 376 884 426 838 405 b 664 153 714 323 664 249 b 665 130 664 145 665 138 b 753 29 671 65 704 29 b 815 40 773 29 792 33 b 975 147 873 65 923 101 b 965 45 971 108 968 76 b 979 6 963 17 966 6 z m 1282 12 b 1336 35 1303 14 1320 23 b 1359 71 1351 45 1359 58 b 1338 102 1359 82 1352 95 b 1254 130 1312 118 1284 130 b 1187 88 1223 130 1202 109 b 1178 65 1182 81 1178 72 b 1195 37 1178 55 1182 45 b 1282 12 1223 23 1253 19 z"
        },
        keyboardPedalUp: {
            x_min: 0,
            x_max: 436.6015132318337,
            y_min: 0,
            y_max: 461,
            ha: 461,
            o: "m 330 0 b 334 1 331 0 333 0 b 340 12 338 4 340 7 l 338 26 b 340 264 338 105 338 184 b 526 95 400 206 461 148 b 559 71 536 88 547 71 b 564 72 560 71 563 71 b 580 121 580 79 580 102 l 580 127 b 543 203 585 158 573 184 b 472 259 518 219 495 238 l 445 285 b 590 292 494 288 541 291 b 622 318 609 294 618 302 b 628 359 625 331 626 346 b 586 402 632 393 621 405 b 464 395 546 399 504 396 l 559 491 b 567 524 567 500 567 510 b 564 543 567 527 567 536 b 539 596 559 563 560 590 b 494 564 521 600 508 577 b 340 413 442 514 390 464 l 340 560 b 287 664 340 600 321 632 b 271 518 274 612 272 566 b 268 445 269 494 269 469 b 117 569 219 488 168 530 b 96 579 109 575 102 579 b 85 560 89 579 85 573 b 124 446 85 518 82 477 b 209 380 153 426 181 403 b 45 374 154 377 99 376 b 0 324 9 374 0 359 b 63 266 0 265 1 265 b 144 272 89 269 117 272 l 196 272 b 108 193 167 246 138 219 b 60 135 76 164 60 151 b 99 73 60 121 73 105 b 104 68 101 72 102 71 b 114 58 107 60 111 58 b 130 66 120 58 124 62 b 259 186 173 107 217 145 b 256 117 259 163 256 140 b 311 13 256 72 271 37 b 330 0 317 10 323 0 z"
        },
        pictChokeCymbal: {
            x_min: 1,
            x_max: 147,
            y_min: 0,
            y_max: 242,
            ha: 242,
            o: "m 79 4 b 207 158 153 32 192 88 b 212 200 210 173 212 187 b 143 336 212 253 187 298 b 98 348 131 344 115 348 b 4 295 60 348 16 327 b 1 276 1 289 1 282 b 9 249 1 266 3 258 b 121 183 35 206 72 183 b 156 186 132 183 144 183 b 26 53 134 115 91 73 b 7 39 13 49 7 45 b 19 20 7 33 12 27 b 59 0 30 9 43 0 b 79 4 65 0 72 1 z"
        },
        wiggleArpeggiatoUp: {
            x_min: -22,
            x_max: 300,
            y_min: 0,
            y_max: 176,
            ha: 176,
            o: "m 173 4 b 196 0 180 1 189 0 b 246 26 215 0 230 9 b 301 117 271 53 285 85 b 312 131 305 125 307 131 b 327 124 315 131 321 128 b 373 86 341 112 353 101 b 412 69 389 75 402 69 b 432 94 425 69 432 79 b 373 181 432 117 413 154 b 235 252 323 216 285 245 b 220 253 229 253 225 253 b 168 215 196 253 181 240 b 111 112 151 180 140 141 b 94 102 105 105 99 102 b 78 111 89 102 84 105 b 0 181 55 135 35 160 b -32 153 -20 194 -32 168 b 0 86 -32 124 -32 109 b 94 36 22 71 73 46 b 173 4 134 16 131 17 z"
        },
        arrowheadBlackUp: {
            x_min: 186,
            x_max: 820,
            y_min: -1e3,
            y_max: 1e3,
            ha: 2e3,
            o: "m 1181 1440 l 268 1440 l 268 -1440 l 1181 -1440 z m 959 -524 l 959 -850 l 481 -850 l 481 -524 z m 864 -619 l 576 -619 l 576 -755 l 864 -755 z m 959 -26 l 959 -351 l 481 -351 l 481 -26 l 576 -26 l 576 -256 l 864 -256 l 864 -121 l 769 -121 l 769 -187 l 671 -187 l 671 -26 z m 959 325 l 959 37 l 481 37 l 481 135 l 864 135 l 864 325 z m 959 498 l 959 403 l 769 403 l 769 202 l 481 202 l 481 297 l 671 297 l 671 403 l 481 403 l 481 498 z m 671 778 l 576 778 l 576 674 l 671 674 z m 769 876 l 769 674 l 959 674 l 959 576 l 481 576 l 481 876 z m 959 1247 l 959 1152 l 769 1152 l 769 1045 l 959 1045 l 959 950 l 481 950 l 481 1045 l 671 1045 l 671 1152 l 484 1152 l 484 1247 z m 959 -916 l 959 -1011 l 867 -1011 l 665 -1146 l 959 -1146 l 959 -1241 l 481 -1241 l 481 -1146 l 683 -1011 l 481 -1011 l 481 -916 z"
        },
        arrowheadBlackDown: {
            x_min: 186,
            x_max: 820,
            y_min: -1e3,
            y_max: 1e3,
            ha: 2e3,
            o: "m 1181 1440 l 268 1440 l 268 -1440 l 1181 -1440 z m 959 -524 l 959 -850 l 481 -850 l 481 -524 z m 864 -619 l 576 -619 l 576 -755 l 864 -755 z m 959 -26 l 959 -351 l 481 -351 l 481 -26 l 576 -26 l 576 -256 l 864 -256 l 864 -121 l 769 -121 l 769 -187 l 671 -187 l 671 -26 z m 959 325 l 959 37 l 481 37 l 481 135 l 864 135 l 864 325 z m 959 498 l 959 403 l 769 403 l 769 202 l 481 202 l 481 297 l 671 297 l 671 403 l 481 403 l 481 498 z m 671 778 l 576 778 l 576 674 l 671 674 z m 769 876 l 769 674 l 959 674 l 959 576 l 481 576 l 481 876 z m 959 1247 l 959 1152 l 769 1152 l 769 1045 l 959 1045 l 959 950 l 481 950 l 481 1045 l 671 1045 l 671 1152 l 484 1152 l 484 1247 z m 959 -916 l 959 -1011 l 867 -1011 l 665 -1146 l 959 -1146 l 959 -1241 l 481 -1241 l 481 -1146 l 683 -1011 l 481 -1011 l 481 -916 z"
        },
        arpeggiatoUp: {
            x_min: 0,
            x_max: 262,
            y_min: 0,
            y_max: 1459,
            ha: 1459,
            o: "m 190 0 b 160 63 187 29 170 45 b 145 108 150 81 145 95 b 183 163 145 128 157 145 b 300 246 222 190 262 216 b 347 318 333 272 347 295 b 301 393 347 341 331 364 b 258 413 289 403 272 408 b 145 449 220 425 183 436 b 117 464 135 452 120 452 b 140 491 115 477 128 484 b 294 593 192 526 243 557 b 330 647 318 611 330 626 b 314 693 330 660 324 675 b 262 736 302 714 285 729 b 170 763 230 744 200 753 b 122 783 153 768 125 768 b 160 831 120 804 143 818 b 288 922 202 861 246 890 b 333 999 318 945 333 972 b 266 1083 333 1032 310 1064 b 189 1115 240 1094 215 1103 b 122 1178 145 1133 122 1153 b 168 1250 122 1200 138 1223 l 180 1257 b 269 1333 210 1283 240 1306 b 305 1405 294 1356 305 1381 b 284 1469 305 1426 298 1447 b 228 1525 269 1492 251 1511 b 183 1600 197 1545 183 1571 b 190 1640 183 1613 184 1626 b 197 1670 193 1650 194 1660 b 272 1735 213 1719 230 1735 b 295 1734 279 1735 287 1735 b 323 1732 305 1732 314 1732 b 350 1731 333 1732 341 1732 b 377 1742 369 1729 377 1732 b 370 1761 377 1747 374 1754 l 301 1898 b 217 2066 274 1954 248 2012 b 186 2101 204 2089 196 2101 b 154 2069 177 2101 167 2091 b 12 1824 105 1987 59 1907 b 0 1787 4 1810 0 1797 b 59 1744 0 1761 20 1745 b 160 1738 92 1744 125 1740 b 145 1692 156 1721 151 1706 b 135 1633 138 1672 135 1652 b 184 1518 135 1591 151 1552 b 229 1475 199 1503 213 1488 b 259 1431 249 1456 259 1444 b 229 1388 259 1420 249 1407 b 151 1325 203 1365 177 1345 b 105 1279 134 1310 118 1296 b 73 1202 84 1251 73 1227 b 108 1123 73 1176 85 1152 b 255 1031 148 1077 199 1051 b 282 1014 274 1025 282 1021 b 262 991 282 1008 275 1001 b 151 914 226 963 189 939 b 79 851 125 896 99 877 b 63 809 69 837 63 824 b 79 769 63 796 68 783 b 202 697 111 729 154 710 b 266 670 225 690 266 688 b 210 622 266 648 232 635 b 82 534 167 593 120 570 b 55 491 63 518 55 505 b 79 448 55 478 63 465 b 255 361 127 395 192 380 b 288 343 269 359 288 357 b 266 312 288 331 275 320 b 144 223 229 278 184 253 b 85 134 104 193 85 166 b 118 53 85 111 96 85 b 190 0 135 29 160 14 z"
        },
        arpeggiatoDown: {
            x_min: 0,
            x_max: 218,
            y_min: 0,
            y_max: 1440,
            ha: 1440,
            o: "m 161 16 b 310 261 210 98 259 180 b 314 275 312 266 314 271 b 302 295 314 282 310 289 b 252 311 287 308 269 311 b 217 310 240 311 229 310 b 190 333 202 310 194 315 b 151 412 186 363 171 389 b 102 501 120 452 102 477 b 150 588 102 524 118 547 b 161 603 154 592 158 598 b 181 661 176 622 181 641 b 173 704 181 675 179 690 b 86 795 156 746 121 770 b 53 829 63 811 53 819 b 78 868 53 840 62 851 b 102 888 85 876 94 883 b 180 956 128 912 156 933 b 216 1028 204 979 216 1002 b 203 1081 216 1044 212 1061 b 115 1171 186 1123 148 1145 b 75 1221 88 1191 75 1207 b 114 1272 75 1237 88 1251 b 173 1308 132 1284 154 1296 b 226 1339 190 1318 209 1328 b 265 1405 253 1359 265 1380 b 258 1447 265 1418 264 1431 b 154 1541 242 1499 199 1521 b 109 1581 124 1555 109 1567 b 141 1627 109 1594 121 1608 b 204 1680 163 1646 184 1662 b 233 1742 223 1699 233 1719 b 226 1777 233 1752 230 1764 b 135 1862 210 1822 173 1840 b 104 1895 114 1875 104 1884 b 118 1930 104 1904 109 1914 b 192 2006 135 1961 161 1986 b 206 2029 203 2013 206 2022 b 192 2064 206 2040 197 2052 b 180 2074 187 2071 184 2074 b 156 2061 171 2074 163 2065 b 84 1983 125 2040 102 2013 b 65 1921 71 1961 65 1941 b 88 1853 65 1899 72 1876 b 171 1784 108 1820 138 1801 b 190 1764 184 1777 190 1770 b 174 1741 190 1757 184 1750 b 107 1683 153 1722 128 1704 b 68 1610 81 1659 68 1636 b 88 1548 68 1591 75 1571 b 177 1470 109 1512 141 1489 b 223 1431 209 1453 223 1443 b 179 1390 223 1420 209 1408 b 128 1361 163 1380 145 1371 b 71 1322 108 1348 88 1338 b 32 1253 45 1300 32 1277 b 48 1198 32 1236 37 1218 b 147 1090 71 1152 108 1120 b 174 1057 166 1076 174 1067 b 153 1022 174 1047 167 1037 b 109 982 140 1008 124 995 b 37 919 85 962 59 942 b 9 860 17 899 9 880 b 26 806 9 844 14 827 b 120 717 50 769 84 740 b 138 691 132 708 138 700 b 130 668 138 684 135 677 b 92 618 118 651 105 635 b 59 531 71 589 59 560 b 84 455 59 507 68 481 b 132 386 98 431 115 408 b 148 341 144 372 148 357 b 144 317 148 333 147 324 b 121 305 140 307 131 305 l 98 305 b 82 304 94 304 88 304 l 32 304 b 0 292 10 304 0 302 b 12 266 0 287 4 279 b 60 164 32 233 46 199 b 127 20 84 117 105 68 b 144 0 132 9 137 0 b 161 16 150 0 154 4 z"
        },
        repeat1Bar: {
            x_min: 0,
            x_max: 599.1057280164835,
            y_min: -250,
            y_max: 175,
            ha: 425,
            o: "m 76 -334 b 181 -285 111 -315 148 -302 b 831 52 396 -168 613 -58 b 863 114 855 63 864 82 b 828 202 855 140 855 176 b 808 213 821 209 815 213 b 793 209 804 213 799 212 l 422 19 b 26 -179 291 -48 164 -124 b 0 -213 10 -186 0 -196 b 3 -232 0 -219 0 -225 b 52 -325 14 -265 37 -294 b 66 -337 55 -331 59 -337 b 76 -334 69 -337 72 -336 z m 216 98 b 255 75 236 84 246 75 b 291 104 265 75 274 85 b 323 147 304 117 327 125 b 289 215 323 168 314 184 b 238 252 269 239 253 252 b 187 222 222 252 207 242 b 173 206 183 216 177 212 b 157 170 163 194 157 183 b 174 138 157 160 161 150 b 216 98 189 127 200 109 z m 769 -360 b 829 -264 779 -360 829 -284 b 769 -176 822 -232 799 -200 b 742 -163 760 -167 750 -163 b 716 -184 733 -163 723 -168 b 683 -228 708 -202 693 -213 b 672 -253 675 -236 672 -245 b 683 -281 672 -262 675 -271 b 752 -353 703 -308 732 -327 b 769 -360 756 -357 763 -360 z"
        },
        repeat2Bars: {
            x_min: .008571918423331715,
            x_max: 775,
            y_min: -246.92374029115243,
            y_max: 362.82068246705313,
            ha: 609.7444227582056,
            o: "m 909 412 b 873 351 906 384 893 367 b 436 50 729 249 585 147 b 91 -179 321 -26 206 -102 b 62 -174 76 -189 68 -183 b 12 -96 48 -147 24 -125 b 36 -16 -7 -53 -6 -43 b 220 104 96 24 158 65 b 819 507 425 232 624 369 b 881 495 852 530 861 528 b 909 412 899 469 900 439 z m 1116 228 b 1067 158 1115 192 1092 174 b 910 59 1015 125 963 92 b 478 -240 762 -33 622 -140 b 311 -350 423 -279 366 -314 b 285 -344 298 -360 289 -356 b 239 -258 272 -314 251 -288 b 261 -196 228 -228 235 -210 b 517 -29 348 -144 436 -91 b 1030 321 681 98 861 202 b 1093 307 1060 343 1076 340 b 1116 228 1107 281 1109 252 z m 1070 -105 b 1020 -210 1057 -143 1038 -176 b 998 -210 1014 -219 1004 -215 b 924 -153 973 -192 949 -171 b 913 -88 899 -135 897 -112 b 949 -22 926 -66 939 -45 b 998 -7 960 6 976 9 b 1070 -105 1032 -32 1058 -63 z m 333 338 b 302 240 330 307 317 274 b 276 235 297 225 287 228 b 233 269 262 246 248 258 b 203 376 186 307 183 318 b 225 441 212 397 217 419 b 246 454 228 452 232 458 b 333 338 284 441 333 380 z"
        },
        repeat4Bars: {
            x_min: 0,
            x_max: 1374,
            y_min: -304,
            y_max: 304,
            ha: 608,
            o: "m 815 -367 b 829 -359 819 -367 824 -364 b 851 -343 835 -353 844 -347 b 1375 6 1027 -228 1205 -117 l 1610 170 b 1644 235 1632 184 1643 203 b 1626 300 1639 253 1634 276 b 1590 337 1614 325 1604 337 b 1551 320 1580 337 1567 330 b 873 -135 1329 161 1103 10 b 749 -222 829 -161 785 -184 b 737 -245 742 -230 737 -238 b 742 -261 737 -249 739 -255 b 802 -357 755 -297 782 -325 b 815 -367 805 -363 809 -367 z m 291 148 b 325 223 302 148 308 170 b 333 256 328 235 330 246 b 264 363 330 305 298 336 b 242 373 255 369 248 373 b 220 347 232 373 225 364 b 202 288 216 327 213 305 b 190 252 193 275 190 262 b 222 200 190 232 202 215 b 291 148 264 170 279 148 z m 78 -266 b 92 -258 82 -266 88 -264 b 114 -240 98 -251 107 -246 b 638 107 289 -125 467 -14 b 873 271 716 161 793 216 b 907 337 894 285 906 305 b 887 400 901 354 897 379 b 852 438 877 426 867 438 b 814 420 842 438 829 432 b 135 -33 592 262 366 111 b 12 -121 92 -60 48 -84 b 0 -144 4 -128 0 -135 b 4 -160 0 -148 1 -154 b 63 -255 17 -196 45 -223 b 78 -266 68 -262 72 -266 z m 396 -360 b 408 -356 400 -360 403 -359 b 609 -223 471 -307 543 -269 b 896 -19 706 -156 795 -81 b 1164 154 985 37 1074 96 b 1214 223 1189 170 1211 187 b 1176 321 1204 253 1205 292 b 1159 330 1169 327 1165 330 b 1145 324 1155 330 1151 328 b 1048 258 1113 302 1081 278 b 357 -202 809 117 598 -65 b 333 -238 341 -212 333 -223 b 338 -262 333 -245 334 -253 b 384 -350 350 -294 372 -318 b 396 -360 386 -354 390 -360 z m 1162 -438 b 1174 -433 1166 -438 1169 -436 b 1374 -300 1237 -384 1309 -346 b 1660 -96 1470 -233 1561 -158 b 1930 76 1751 -39 1840 19 b 1979 147 1954 92 1977 109 b 1943 243 1968 177 1971 216 b 1924 253 1935 251 1930 253 b 1911 248 1920 253 1915 252 b 1814 181 1878 225 1848 202 b 1123 -279 1575 40 1364 -141 b 1099 -315 1106 -289 1099 -300 b 1103 -338 1099 -321 1100 -330 b 1149 -426 1115 -370 1138 -396 b 1162 -438 1151 -432 1156 -438 z m 1875 -295 b 1882 -291 1878 -295 1879 -294 b 1934 -189 1904 -258 1921 -223 b 1872 -96 1925 -147 1901 -120 b 1840 -78 1858 -84 1848 -78 b 1812 -109 1830 -78 1823 -88 l 1777 -173 b 1770 -199 1773 -181 1770 -190 b 1786 -230 1770 -210 1774 -220 b 1862 -289 1809 -253 1837 -269 b 1875 -295 1865 -292 1871 -295 z"
        },
        repeatBarSlash: {
            x_min: 0,
            x_max: 630,
            y_min: -225.19160170741762,
            y_max: 265.12618221237005,
            ha: 490.31778391978764,
            o: "m 78 -324 b 92 -314 82 -325 88 -321 b 114 -298 96 -307 107 -302 b 638 49 289 -183 467 -72 b 873 215 716 104 792 161 b 907 279 894 229 906 248 b 887 344 901 298 897 321 b 852 382 877 369 867 380 b 814 363 842 383 829 376 b 135 -91 603 192 364 55 b 12 -177 92 -118 45 -137 b 0 -202 4 -186 0 -192 b 4 -217 0 -206 1 -212 b 63 -312 17 -253 42 -284 b 78 -324 68 -318 72 -323 z"
        }
    },
    fontFamily: "Petaluma",
    resolution: 1e3,
    generatedOn: "2020-04-13T11:57:51.948Z"
}
  , et = {
    name: "Petaluma",
    smufl: !0,
    stave: {
        padding: 15
    },
    clef: {
        default: {
            point: 32,
            width: 26
        },
        small: {
            point: 26,
            width: 20
        },
        annotations: {
            "8va": {
                smuflCode: "timeSig8",
                default: {
                    point: 18,
                    treble: {
                        line: -1.4,
                        shiftX: 12
                    }
                },
                small: {
                    point: 16,
                    treble: {
                        line: -.2,
                        shiftX: 8
                    }
                }
            },
            "8vb": {
                smuflCode: "timeSig8",
                default: {
                    point: 18,
                    treble: {
                        line: 6,
                        shiftX: 10
                    },
                    bass: {
                        line: 3.5,
                        shiftX: 1
                    }
                },
                small: {
                    point: 16,
                    treble: {
                        line: 5.3,
                        shiftX: 6
                    },
                    bass: {
                        line: 3.1,
                        shiftX: .5
                    }
                }
            }
        },
        lineCount: {
            "8": {
                point: 55,
                shiftY: 14
            },
            "7": {
                point: 47,
                shiftY: 8
            },
            "6": {
                point: 32,
                shiftY: 1
            },
            "5": {
                point: 30,
                shiftY: -6
            },
            "4": {
                point: 23,
                shiftY: -12
            }
        }
    },
    pedalMarking: {
        up: {
            point: 40
        },
        down: {
            point: 34
        }
    },
    digits: {
        shiftLine: -1,
        point: 22,
        tupletPoint: 16,
        shiftY: -2
    },
    articulation: {
        articStaccatissimoAbove: {
            padding: 2
        },
        articStaccatissimoBelow: {
            padding: 2
        }
    },
    tremolo: {
        default: {
            point: 25,
            spacing: 5,
            offsetYStemUp: -5,
            offsetYStemDown: 5,
            offsetXStemUp: 11,
            offsetXStemDown: 1
        },
        grace: {
            point: 18,
            spacing: 4,
            offsetYStemUp: -5,
            offsetYStemDown: 5,
            offsetXStemUp: 7,
            offsetXStemDown: 1
        }
    },
    noteHead: {
        displaced: {
            shiftX: -2
        }
    },
    stem: {
        noteHead: {
            noteheadTriangleUpHalf: {
                offsetYBaseStemUp: 5,
                offsetYBaseStemDown: 4
            },
            noteheadTriangleUpBlack: {
                offsetYBaseStemUp: 5,
                offsetYBaseStemDown: 4
            },
            noteheadTriangleUpWhole: {
                offsetYBaseStemUp: 5,
                offsetYBaseStemDown: 4
            },
            noteheadXHalf: {
                offsetYBaseStemUp: -4,
                offsetYBaseStemDown: 4
            },
            noteheadXBlack: {
                offsetYBaseStemUp: -4,
                offsetYBaseStemDown: 4
            },
            noteheadXWhole: {
                offsetYBaseStemUp: -4,
                offsetYBaseStemDown: 4
            },
            noteheadBlack: {
                offsetYBaseStemDown: 2,
                offsetYBaseStemUp: -2
            },
            noteheadSquareWhite: {
                offsetYBaseStemDown: -5,
                offsetYBaseStemUp: 5
            }
        }
    },
    glyphs: {
        coda: {
            point: 20,
            shiftX: -7,
            shiftY: 8
        },
        segno: {
            shiftX: -7
        },
        flag: {
            shiftX: -.75,
            tabStem: {
                shiftX: -1.75
            },
            staveTempo: {
                shiftX: -1
            }
        },
        clef: {
            gClef: {
                default: {
                    scale: 1.1,
                    shiftY: 1
                },
                small: {
                    shiftY: 1.5
                }
            },
            fClef: {
                default: {
                    shiftY: -.5
                }
            }
        },
        ornament: {
            ornamentTurn: {
                scale: 1.2
            },
            ornamentTurnSlash: {
                scale: 1.2
            }
        },
        stroke: {
            arrowheadBlackDown: {
                straight: {
                    shiftX: -4.5
                },
                wiggly: {
                    shiftX: -1,
                    shiftY: 1
                }
            },
            arrowheadBlackUp: {
                straight: {
                    shiftX: -.85
                },
                wiggly: {
                    shiftX: -1,
                    shiftY: 1
                }
            }
        },
        textNote: {
            point: 34,
            breathMarkTick: {
                point: 36,
                shiftY: 9
            },
            breathMarkComma: {
                point: 36
            },
            segno: {
                point: 30,
                shiftX: -7,
                shiftY: 8
            },
            coda: {
                point: 20,
                shiftX: -7,
                shiftY: 8
            },
            ornamentTrill: {
                shiftX: -10,
                shiftY: 8
            },
            ornamentMordent: {
                shiftX: -8
            },
            ornamentShortTrill: {
                shiftX: -8
            }
        },
        noteHead: {
            standard: {
                noteheadBlackStemUp: {
                    shiftX: 1.5,
                    point: 34
                },
                noteheadBlackStemDown: {
                    point: 34
                },
                noteheadHalfStemUp: {
                    shiftX: 1,
                    point: 34
                },
                noteheadHalfStemDown: {
                    point: 34
                },
                noteheadWholeStemUp: {
                    shiftX: 1,
                    point: 34
                },
                noteheadWholeStemDown: {
                    point: 34
                },
                restQuarterStemUp: {
                    point: 35
                },
                restQuarterStemDown: {
                    point: 35
                }
            },
            custom: {
                noteheadCircleXStemUp: {
                    shiftX: -1
                },
                noteheadCircleXStemDown: {
                    shiftX: .25
                },
                noteheadDiamondHalfStemUp: {
                    shiftX: 1.5
                },
                noteheadDiamondBlackStemUp: {
                    shiftX: 1.5
                },
                noteheadDiamondWholeStemUp: {
                    shiftX: 1
                },
                noteheadXBlackStemUp: {
                    shiftX: 1
                },
                noteheadXHalfStemUp: {
                    shiftX: -3
                },
                noteheadXHalfStemDown: {
                    shiftX: 1
                },
                noteheadXWholeStemUp: {
                    shiftX: -7
                },
                noteheadXWholeStemDown: {
                    shiftX: 1
                },
                noteheadSquareWhiteStemDown: {
                    shiftX: .25
                },
                noteheadSquareWhiteStemUp: {
                    shiftX: -.75
                },
                noteheadSquareBlackStemUp: {
                    shiftX: -.75
                },
                noteheadTriangleUpWholeStemUp: {
                    shiftX: -.75
                }
            }
        }
    }
}
  , it = {
    resolution: 1e3,
    familyName: "VexflowCustom",
    glyphs: {
        noteheadSquareWhite: {
            x_min: 0,
            x_max: 430.75,
            ha: 386,
            o: "m 0 200 l 0 -200 l 430 -200 l 430 200 l 0 200 l 50 150 l 380 150 l 380 -150 l 50 -150 l 50 150 "
        },
        noteheadSquareBlack: {
            x_min: 0,
            x_max: 430.75,
            ha: 386,
            o: "m 0 200 l 0 -200 l 430 -200 l 430 200 l 0 200 "
        },
        accidentalBuyukMucennebFlat: {
            x_min: -171.5,
            x_max: 251.8125,
            ha: 257,
            o: "m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 553 20 616 20 614 b 20 491 20 503 20 491 l 20 491 b 153 535 47 501 149 535 b 174 514 167 535 174 524 b 164 496 174 508 171 501 b 92 470 164 495 132 484 l 20 445 l 20 390 b 20 363 20 378 20 370 b 20 333 20 340 20 333 l 20 333 b 153 377 47 344 149 377 b 174 356 167 377 174 367 b 164 338 174 349 171 342 b 92 312 164 338 132 326 l 20 288 l 20 219 l 20 148 l 21 151 b 137 199 59 183 99 199 b 182 191 152 199 167 197 b 251 84 227 176 251 134 b 228 0 251 58 243 29 b 100 -142 206 -40 178 -72 l 23 -215 b -1 -229 9 -229 6 -229 b -20 -216 -9 -229 -17 -224 b -21 30 -21 -212 -21 -212 b -21 273 -21 163 -21 273 b -84 252 -21 273 -50 263 b -152 230 -133 234 -145 230 b -157 231 -155 230 -156 231 b -171 252 -166 234 -171 244 b -160 270 -171 259 -167 266 b -27 316 -159 270 -93 294 l -21 319 l -21 374 b -21 431 -21 406 -21 431 b -84 409 -21 431 -50 421 b -152 388 -133 392 -145 388 b -157 390 -155 388 -156 388 b -171 409 -166 392 -171 401 b -160 428 -171 417 -167 424 b -27 474 -159 428 -93 451 l -21 476 l -21 546 b -20 620 -21 614 -21 616 b -8 631 -17 624 -13 630 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 "
        },
        accidentalBakiyeFlat: {
            x_min: -176.9375,
            x_max: 251.8125,
            ha: 257,
            o: "m -8 631 b -1 632 -6 632 -4 632 b 19 620 8 632 16 628 b 20 503 20 616 20 614 b 20 391 20 442 20 391 b 84 424 20 391 49 406 l 147 456 l 152 456 b 153 456 153 456 153 456 b 175 435 166 456 175 446 b 172 427 175 433 174 430 b 92 380 170 420 172 421 l 20 342 l 20 245 l 20 148 l 21 151 b 137 199 59 183 99 199 b 182 191 152 199 167 197 b 251 84 227 176 251 134 b 228 0 251 58 243 29 b 100 -142 206 -40 178 -72 l 23 -215 b 0 -229 9 -229 6 -229 b -20 -216 -9 -229 -17 -224 b -21 54 -21 -212 -21 -212 b -21 322 -21 201 -21 322 b -85 290 -21 322 -50 308 l -148 256 l -153 256 b -155 256 -155 256 -155 256 b -176 277 -167 256 -176 266 b -174 285 -176 280 -175 283 b -93 333 -171 294 -174 292 l -21 370 l -21 494 b -20 620 -21 616 -21 616 b -8 631 -17 624 -13 630 m 110 131 b 96 133 106 133 100 133 b 89 133 93 133 91 133 b 24 87 63 129 40 113 l 20 80 l 20 -37 l 20 -156 l 23 -152 b 144 81 96 -72 144 20 l 144 83 b 110 131 144 113 134 126 "
        },
        accidentalKucukMucennebSharp: {
            x_min: -1.359375,
            x_max: 255.890625,
            ha: 261,
            o: "m 118 514 b 127 517 121 517 122 517 b 147 505 136 517 142 513 l 148 502 l 148 403 b 148 306 148 351 148 306 b 174 315 149 306 160 310 l 200 324 l 205 323 b 223 312 213 323 220 319 l 225 308 l 225 260 b 225 245 225 255 225 249 b 220 204 225 208 224 209 b 179 188 216 199 215 199 l 148 177 l 148 124 l 148 70 l 189 84 b 236 98 219 94 230 98 b 247 94 240 98 243 97 b 255 52 254 88 255 87 b 255 33 255 47 255 40 l 254 -12 l 253 -15 b 249 -22 253 -18 250 -20 l 245 -24 l 196 -41 l 148 -58 l 148 -108 b 148 -158 148 -136 148 -158 b 174 -148 148 -158 160 -154 b 204 -140 198 -140 200 -140 l 204 -140 b 224 -152 213 -140 221 -145 b 225 -201 224 -155 225 -177 b 224 -254 225 -226 224 -251 b 157 -284 220 -262 220 -262 l 148 -288 l 148 -395 l 148 -503 l 147 -506 b 127 -519 142 -514 134 -519 b 107 -506 119 -519 111 -514 l 106 -503 l 106 -403 b 106 -303 106 -316 106 -303 b 104 -303 104 -303 104 -303 b 88 -310 104 -303 96 -306 l 63 -319 b 51 -322 59 -320 55 -322 b 36 -315 46 -322 40 -319 b 31 -273 32 -309 31 -312 b 31 -258 31 -269 31 -263 l 31 -210 l 34 -206 b 40 -198 35 -204 38 -199 b 74 -186 42 -197 57 -191 l 106 -173 l 106 -123 b 106 -97 106 -112 106 -104 b 106 -72 106 -76 106 -72 b 104 -72 106 -72 106 -72 b 20 -99 89 -79 23 -99 b 0 -84 10 -99 2 -93 b -1 -37 0 -81 -1 -59 b 0 11 -1 -15 0 9 b 58 40 4 22 2 22 l 106 56 l 106 109 b 106 123 106 115 106 119 b 106 162 106 147 106 162 b 81 155 106 162 93 159 b 50 147 65 149 55 147 b 36 152 43 147 40 148 b 31 194 32 158 31 156 b 31 209 31 198 31 204 l 31 256 l 34 260 b 76 281 38 269 38 269 l 106 292 l 106 396 l 106 502 l 107 505 b 118 514 110 509 114 513 "
        },
        accidentalKoron: {
            x_min: -20,
            x_max: 320,
            ha: 257,
            o: "m -8 200 b -8 210 8 200 16 200 l 20 148 -199 l 23 -615 b 0 -629 9 -629 6 -629 l -21 -612 l -21 -201 l -21 216 l -20 200 m 16 200 l 310 0 l 240 0 l 16 140 l 16 -120 l 240 0 l 310 0 l 16 -200 "
        },
        accidentalSori: {
            x_min: -10.890625,
            x_max: 299.4375,
            ha: 294,
            o: "m 44 174 b 51 174 47 174 49 174 b 68 173 55 174 61 174 l 287 112 l 551 40 b 615 20 617 22 609 23 b 626 0 622 16 626 8 b 615 -22 626 -9 622 -18 b 613 -23 613 -23 613 -23 b 613 -23 613 -23 613 -23 b 287 -113 613 -24 597 -29 l 68 -174 b 53 -176 61 -176 57 -176 b 39 -172 47 -176 43 -174 b 27 -151 31 -167 27 -159 b 39 -129 27 -141 31 -133 b 230 -74 43 -124 20 -131 l 370 -36 l 468 -9 b 498 0 484 -4 498 -1 b 468 8 498 0 484 2 l 370 34 l 230 73 b 40 126 28 129 43 124 b 27 149 31 131 27 140 b 44 174 27 161 34 170 m 205 110 l 205 300 b 205 330 245 330 245 300 l 245 300 l 245 -300 b 245 -330 205 -330 205 -300 l 205 -300 l 205 110 l 345 90 m 345 90 l 345 330 b 345 360 385 360 385 330 l 385 330 l 385 -270 b 385 -300 345 -300 345 -270 l 345 -270 l 345 90 "
        },
        vexAccidentalMicrotonal2: {
            x_min: -1.359375,
            x_max: 386.5625,
            ha: 394,
            o: "m 249 535 b 257 537 251 537 253 537 b 276 524 266 537 273 533 l 277 521 l 279 419 l 279 316 l 304 323 b 337 328 319 326 330 328 b 353 316 347 328 349 324 b 355 266 355 315 355 290 b 353 215 355 241 355 217 b 319 198 349 206 347 205 b 279 187 284 190 279 188 b 279 156 279 187 279 174 b 279 136 279 151 279 144 l 279 84 l 289 87 l 330 98 b 367 105 352 102 362 105 b 378 101 372 105 375 104 b 386 61 385 95 386 94 b 386 40 386 55 386 48 l 386 -5 l 385 -8 b 374 -19 383 -12 378 -18 b 291 -40 372 -19 347 -26 b 279 -43 284 -41 279 -43 b 279 -83 279 -43 279 -59 b 279 -95 279 -87 279 -91 l 279 -145 l 304 -140 b 337 -133 321 -136 330 -133 b 349 -140 343 -133 347 -136 b 355 -181 355 -145 355 -142 l 355 -197 l 355 -210 b 349 -252 355 -249 355 -247 b 300 -269 345 -258 347 -258 b 280 -274 291 -272 281 -273 l 279 -274 l 277 -378 l 277 -483 l 276 -487 b 257 -499 273 -495 265 -499 b 238 -487 249 -499 242 -495 l 236 -483 l 236 -384 l 236 -285 l 235 -285 l 212 -291 l 170 -301 b 148 -308 159 -305 148 -306 b 147 -415 147 -308 147 -313 l 147 -523 l 145 -526 b 126 -538 141 -534 133 -538 b 106 -526 118 -538 110 -534 l 104 -523 l 104 -420 b 103 -317 104 -326 104 -317 b 103 -317 103 -317 103 -317 b 50 -330 92 -322 54 -330 b 31 -317 42 -330 35 -326 b 29 -267 29 -315 29 -315 l 29 -219 l 32 -216 b 92 -192 36 -206 36 -206 l 104 -190 l 104 -138 b 103 -87 104 -91 104 -87 b 103 -87 103 -87 103 -87 b 88 -91 103 -87 96 -88 l 49 -101 b 17 -106 32 -105 23 -106 b 6 -102 13 -106 10 -105 b -1 -62 0 -97 -1 -95 b 0 -41 -1 -56 0 -49 l 0 4 l 1 6 b 10 16 2 11 6 15 b 91 37 12 18 38 24 l 104 41 l 104 93 b 103 144 104 140 104 144 b 103 144 103 144 103 144 b 50 131 92 141 54 131 b 31 144 42 131 35 137 b 29 195 29 147 29 148 l 29 242 l 32 245 b 92 269 36 255 36 255 l 104 273 l 104 377 l 104 481 l 106 485 b 126 498 110 492 118 498 b 134 495 129 498 132 496 b 145 485 138 494 142 489 l 147 481 l 147 383 l 147 283 l 152 284 b 190 294 155 285 171 290 l 230 303 l 236 305 l 236 413 l 236 521 l 238 524 b 249 535 240 528 243 533 m 236 126 b 235 177 236 154 236 177 l 235 177 b 213 172 235 177 225 174 l 170 161 b 147 155 157 158 147 155 b 147 124 147 155 147 142 b 147 102 147 117 147 111 l 147 52 l 153 54 l 228 72 l 236 74 l 236 126 m 236 -105 b 235 -54 236 -65 236 -54 l 235 -54 b 231 -55 235 -54 234 -54 b 172 -69 227 -55 204 -62 l 149 -76 l 147 -76 l 147 -127 l 147 -179 l 152 -177 b 190 -167 155 -177 171 -173 l 230 -158 l 236 -156 l 236 -105 "
        },
        vexAccidentalMicrotonal3: {
            x_min: 0,
            x_max: 430.75,
            ha: 360,
            o: "m -146 537 b -138 538 -143 538 -141 538 b -118 525 -129 538 -121 533 b -117 390 -117 522 -117 521 b -115 259 -117 268 -117 259 b -115 259 -115 259 -115 259 b -59 272 -104 263 -62 272 b -39 259 -50 272 -42 267 b -37 209 -38 257 -37 233 b -39 159 -37 185 -38 162 b -85 138 -43 149 -44 149 l -117 131 l -117 21 b -115 -88 -117 -80 -117 -88 b -115 -88 -115 -88 -115 -88 b -59 -75 -104 -84 -62 -75 b -44 -81 -52 -75 -48 -77 b -38 -124 -38 -87 -38 -85 b -38 -138 -38 -124 -38 -138 b -38 -152 -38 -138 -38 -152 b -44 -195 -38 -191 -38 -190 b -85 -209 -48 -200 -48 -200 l -117 -217 l -117 -349 b -118 -486 -117 -481 -117 -482 b -138 -499 -121 -494 -129 -499 b -153 -493 -143 -499 -149 -497 b -159 -415 -158 -487 -159 -496 b -159 -355 -159 -398 -159 -379 b -159 -227 -159 -284 -159 -227 b -205 -238 -159 -227 -180 -232 b -250 -249 -230 -244 -250 -249 b -251 -386 -251 -249 -251 -311 b -252 -525 -251 -521 -251 -522 b -272 -538 -255 -534 -264 -538 b -287 -532 -277 -538 -283 -536 b -293 -452 -292 -527 -293 -536 b -293 -391 -293 -436 -293 -415 b -294 -260 -293 -269 -293 -260 b -294 -260 -294 -260 -294 -260 b -348 -272 -306 -264 -345 -272 b -368 -259 -357 -272 -365 -267 b -369 -209 -369 -257 -369 -233 b -368 -159 -369 -185 -369 -162 b -323 -139 -364 -149 -362 -148 l -293 -131 l -293 -22 b -294 87 -293 80 -293 87 b -294 87 -294 87 -294 87 b -348 75 -306 84 -345 75 b -368 88 -357 75 -365 80 b -369 138 -369 91 -369 114 b -368 188 -369 162 -369 186 b -323 209 -364 198 -362 199 l -293 216 l -293 349 b -292 486 -293 481 -293 482 b -272 499 -288 494 -280 499 b -257 493 -266 499 -261 497 b -251 414 -251 487 -251 496 b -251 354 -251 398 -251 378 b -251 226 -251 284 -251 226 b -205 238 -250 226 -230 231 b -159 249 -180 244 -159 249 b -159 385 -159 249 -159 310 b -157 525 -159 521 -159 522 b -146 537 -156 530 -151 535 z m -159 11 b -159 120 -159 98 -159 120 l -159 120 b -175 116 -160 120 -167 119 b -221 105 -184 114 -204 109 l -251 98 l -251 -12 b -251 -121 -251 -72 -251 -121 b -205 -110 -250 -121 -230 -116 b -159 -99 -180 -104 -159 -99 b -159 11 -159 -99 -159 -49 z m 89 517 b 97 519 92 518 94 519 b 117 505 106 519 114 513 b 119 376 119 502 119 501 l 119 249 l 145 258 b 176 267 169 266 172 267 b 177 267 176 267 177 267 b 196 255 186 267 192 263 l 197 252 l 197 205 b 197 181 197 195 197 187 b 193 149 197 153 197 153 b 152 131 190 144 187 143 l 119 120 l 119 10 b 119 -100 119 -62 119 -100 b 145 -91 120 -100 131 -96 b 173 -82 159 -86 171 -82 b 176 -81 174 -81 175 -81 b 196 -94 185 -81 193 -87 b 198 -151 197 -97 198 -125 b 197 -194 198 -172 197 -192 b 153 -218 193 -203 192 -204 l 119 -230 l 119 -367 l 118 -504 l 117 -507 b 97 -519 113 -514 105 -519 b 82 -512 92 -519 87 -517 b 76 -434 77 -507 76 -516 b 76 -374 76 -418 76 -398 b 76 -245 76 -303 76 -245 b 52 -254 76 -245 65 -249 b 19 -263 34 -260 25 -263 b 6 -257 13 -263 10 -261 b 0 -214 0 -251 0 -253 b 0 -200 0 -210 0 -205 b 0 -188 0 -196 0 -192 b 6 -143 0 -147 0 -149 b 46 -126 10 -139 10 -139 l 76 -115 l 76 -5 b 76 106 76 56 76 106 b 51 98 76 106 64 102 b 18 89 34 92 25 89 b 6 95 13 89 10 91 b 0 139 0 101 0 99 b 0 153 0 143 0 148 b 0 179 0 163 0 172 b 44 225 0 215 3 211 l 76 236 l 76 369 b 78 505 76 501 76 502 b 89 517 80 510 85 515 z "
        },
        vexAccidentalMicrotonal4: {
            x_min: 0,
            x_max: 430.75,
            ha: 360,
            o: "m 283 633 b 291 634 286 634 289 634 b 311 621 300 634 308 629 b 313 505 313 618 313 617 b 313 393 313 443 313 393 b 378 425 313 393 343 407 l 443 458 l 448 458 b 449 458 449 458 449 458 b 471 437 462 458 471 448 b 469 429 471 434 470 432 b 387 382 466 421 469 423 l 313 344 l 313 247 l 313 150 l 315 152 b 433 201 353 184 394 201 b 479 193 448 201 464 198 b 549 86 524 177 549 135 b 526 1 549 59 541 29 b 395 -143 504 -39 475 -71 b 316 -214 351 -182 341 -191 b 292 -229 302 -228 300 -229 b 272 -216 283 -229 275 -224 b 271 55 271 -212 271 -212 b 270 323 271 203 270 323 b 205 291 270 323 241 308 l 140 258 l 135 258 b 134 258 135 258 134 258 b 112 279 121 258 112 267 b 114 287 112 281 113 284 b 196 334 117 295 114 293 l 271 371 l 271 495 b 272 621 271 617 271 618 b 283 633 274 626 279 631 z m 404 133 b 391 134 400 134 395 134 b 384 134 388 134 386 134 b 318 88 358 130 335 114 l 313 81 l 313 -37 l 313 -156 l 316 -152 b 439 83 391 -71 439 22 l 439 84 b 404 133 439 115 430 128 z m -8 633 l -8 633 b 0 634 -6 634 -3 634 b 20 621 8 634 17 629 b 21 384 21 618 21 617 l 21 150 l 24 152 b 141 201 62 184 102 201 b 187 193 157 201 172 198 b 257 86 232 177 257 135 b 234 1 257 59 250 29 b 103 -143 212 -39 183 -71 b 24 -214 60 -182 49 -191 b 0 -229 10 -228 8 -229 b -20 -216 -9 -229 -17 -224 l -21 -212 l -21 203 l -21 618 l -20 621 b -8 633 -18 626 -13 631 z m 113 133 l 113 133 b 99 134 109 134 103 134 b 93 134 97 134 94 134 b 26 88 66 130 43 114 l 21 81 l 21 -37 l 21 -156 l 25 -152 b 148 83 99 -71 148 22 l 148 84 b 113 133 148 115 138 128 z "
        },
        vexNoteHeadRectBlack: {
            x_min: 0,
            x_max: 430.75,
            ha: 360,
            o: "m 0 150 l 0 -150 l 430 -150 l 430 150 l 0 150 "
        },
        vexNoteHeadRectWhite: {
            x_min: 0,
            x_max: 430.75,
            ha: 360,
            o: "m 0 150 l 0 -150 l 430 -150 l 430 150 l 0 150 l 50 100 l 380 100 l 380 -100 l 50 -100 l 50 100"
        }
    }
}
  , st = {
    name: "Vexflow-Custom",
    smufl: !1,
    glyphs: {}
};
class D1 {
    constructor(t, e, i) {
        this.name = t,
        this.metrics = e,
        this.fontData = i,
        this.codePoints = {}
    }
    getName() {
        return this.name
    }
    getResolution() {
        return this.fontData.resolution
    }
    getMetrics() {
        return this.metrics
    }
    lookupMetric(t, e=void 0) {
        const i = t.split(".");
        let s = this.metrics;
        for (let n = 0; n < i.length; n++) {
            if (s[i[n]] === void 0) {
                if (e !== void 0)
                    return e;
                throw new f.RERR("INVALID_KEY",`Invalid music font metric key: ${t}`)
            }
            s = s[i[n]]
        }
        return s
    }
    getFontData() {
        return this.fontData
    }
    getGlyphs() {
        return this.fontData.glyphs
    }
    getCodePoints() {
        return this.codePoints
    }
    setCodePoints(t) {
        return this.codePoints = t,
        this
    }
}
const t2 = {
    Bravura: new D1("Bravura",Q3,q3),
    Gonville: new D1("Gonville",Z3,J3),
    Petaluma: new D1("Petaluma",et,tt),
    Custom: new D1("Custom",st,it)
}
  , W2 = [t2.Bravura, t2.Gonville, t2.Custom]
  , y = {
    STEM_WIDTH: 1.5,
    STEM_HEIGHT: 35,
    STAVE_LINE_THICKNESS: 1,
    RESOLUTION: 16384,
    DEFAULT_FONT_STACK: W2,
    DEFAULT_NOTATION_FONT_SCALE: 39,
    DEFAULT_TABLATURE_FONT_SCALE: 39,
    SLASH_NOTEHEAD_WIDTH: 15,
    TEXT_HEIGHT_OFFSET_HACK: 1,
    IsKerned: !0
};
y.clefProperties = a=>{
    if (!a)
        throw new f.RERR("BadArgument","Invalid clef: " + a);
    const t = y.clefProperties.values[a];
    if (!t)
        throw new f.RERR("BadArgument","Invalid clef: " + a);
    return t
}
;
y.clefProperties.values = {
    treble: {
        line_shift: 0
    },
    bass: {
        line_shift: 6
    },
    tenor: {
        line_shift: 4
    },
    alto: {
        line_shift: 3
    },
    soprano: {
        line_shift: 1
    },
    percussion: {
        line_shift: 0
    },
    "mezzo-soprano": {
        line_shift: 2
    },
    "baritone-c": {
        line_shift: 5
    },
    "baritone-f": {
        line_shift: 5
    },
    subbass: {
        line_shift: 7
    },
    french: {
        line_shift: -1
    }
};
y.keyProperties = (a,t,e)=>{
    t === void 0 && (t = "treble");
    const i = {
        octave_shift: 0
    };
    typeof e == "object" && f.Merge(i, e);
    const s = a.split("/");
    if (s.length < 2)
        throw new f.RERR("BadArguments",`Key must have note + octave and an optional glyph: ${a}`);
    const n = s[0].toUpperCase()
      , o = y.keyProperties.note_values[n];
    if (!o)
        throw new f.RERR("BadArguments","Invalid key name: " + n);
    o.octave && (s[1] = o.octave);
    let l = parseInt(s[1], 10);
    l += -1 * i.octave_shift;
    let d = (l * 7 - 4 * 7 + o.index) / 2;
    d += y.clefProperties(t).line_shift;
    let u = 0;
    d <= 0 && d * 2 % 2 == 0 && (u = 1),
    d >= 6 && d * 2 % 2 == 0 && (u = -1);
    const b = typeof o.int_val != "undefined" ? l * 12 + o.int_val : null
      , r = o.code
      , h = o.shift_right;
    let m = {};
    if (s.length > 2 && s[2]) {
        const _ = s[2].toUpperCase();
        m = y.keyProperties.customNoteHeads[_] || {}
    }
    return R({
        key: n,
        octave: l,
        line: d,
        int_value: b,
        accidental: o.accidental,
        code: r,
        stroke: u,
        shift_right: h,
        displaced: !1
    }, m)
}
;
y.keyProperties.note_values = {
    C: {
        index: 0,
        int_val: 0,
        accidental: null
    },
    CN: {
        index: 0,
        int_val: 0,
        accidental: "n"
    },
    "C#": {
        index: 0,
        int_val: 1,
        accidental: "#"
    },
    "C##": {
        index: 0,
        int_val: 2,
        accidental: "##"
    },
    CB: {
        index: 0,
        int_val: -1,
        accidental: "b"
    },
    CBB: {
        index: 0,
        int_val: -2,
        accidental: "bb"
    },
    D: {
        index: 1,
        int_val: 2,
        accidental: null
    },
    DN: {
        index: 1,
        int_val: 2,
        accidental: "n"
    },
    "D#": {
        index: 1,
        int_val: 3,
        accidental: "#"
    },
    "D##": {
        index: 1,
        int_val: 4,
        accidental: "##"
    },
    DB: {
        index: 1,
        int_val: 1,
        accidental: "b"
    },
    DBB: {
        index: 1,
        int_val: 0,
        accidental: "bb"
    },
    E: {
        index: 2,
        int_val: 4,
        accidental: null
    },
    EN: {
        index: 2,
        int_val: 4,
        accidental: "n"
    },
    "E#": {
        index: 2,
        int_val: 5,
        accidental: "#"
    },
    "E##": {
        index: 2,
        int_val: 6,
        accidental: "##"
    },
    EB: {
        index: 2,
        int_val: 3,
        accidental: "b"
    },
    EBB: {
        index: 2,
        int_val: 2,
        accidental: "bb"
    },
    F: {
        index: 3,
        int_val: 5,
        accidental: null
    },
    FN: {
        index: 3,
        int_val: 5,
        accidental: "n"
    },
    "F#": {
        index: 3,
        int_val: 6,
        accidental: "#"
    },
    "F##": {
        index: 3,
        int_val: 7,
        accidental: "##"
    },
    FB: {
        index: 3,
        int_val: 4,
        accidental: "b"
    },
    FBB: {
        index: 3,
        int_val: 3,
        accidental: "bb"
    },
    G: {
        index: 4,
        int_val: 7,
        accidental: null
    },
    GN: {
        index: 4,
        int_val: 7,
        accidental: "n"
    },
    "G#": {
        index: 4,
        int_val: 8,
        accidental: "#"
    },
    "G##": {
        index: 4,
        int_val: 9,
        accidental: "##"
    },
    GB: {
        index: 4,
        int_val: 6,
        accidental: "b"
    },
    GBB: {
        index: 4,
        int_val: 5,
        accidental: "bb"
    },
    A: {
        index: 5,
        int_val: 9,
        accidental: null
    },
    AN: {
        index: 5,
        int_val: 9,
        accidental: "n"
    },
    "A#": {
        index: 5,
        int_val: 10,
        accidental: "#"
    },
    "A##": {
        index: 5,
        int_val: 11,
        accidental: "##"
    },
    AB: {
        index: 5,
        int_val: 8,
        accidental: "b"
    },
    ABB: {
        index: 5,
        int_val: 7,
        accidental: "bb"
    },
    B: {
        index: 6,
        int_val: 11,
        accidental: null
    },
    BN: {
        index: 6,
        int_val: 11,
        accidental: "n"
    },
    "B#": {
        index: 6,
        int_val: 12,
        accidental: "#"
    },
    "B##": {
        index: 6,
        int_val: 13,
        accidental: "##"
    },
    BB: {
        index: 6,
        int_val: 10,
        accidental: "b"
    },
    BBB: {
        index: 6,
        int_val: 9,
        accidental: "bb"
    },
    R: {
        index: 6,
        int_val: 9,
        rest: !0
    },
    X: {
        index: 6,
        accidental: "",
        octave: 4,
        code: "noteheadXBlack",
        shift_right: 5.5
    }
};
y.integerToNote = a=>{
    if (typeof a == "undefined")
        throw new f.RERR("BadArguments","Undefined integer for integerToNote");
    if (a < -2)
        throw new f.RERR("BadArguments",`integerToNote requires integer > -2: ${a}`);
    const t = y.integerToNote.table[a];
    if (!t)
        throw new f.RERR("BadArguments",`Unknown note value for integer: ${a}`);
    return t
}
;
y.integerToNote.table = {
    0: "C",
    1: "C#",
    2: "D",
    3: "D#",
    4: "E",
    5: "F",
    6: "F#",
    7: "G",
    8: "G#",
    9: "A",
    10: "A#",
    11: "B"
};
y.tabToGlyph = (a,t=1)=>{
    let e = null
      , i = 0
      , s = 0;
    if (a.toString().toUpperCase() === "X") {
        const n = new E("accidentalDoubleSharp",y.DEFAULT_TABLATURE_FONT_SCALE).getMetrics();
        e = "accidentalDoubleSharp",
        i = n.width,
        s = -n.height / 2
    } else
        i = y.textWidth(a.toString());
    return {
        text: a,
        code: e,
        getWidth: ()=>i * t,
        shift_y: s
    }
}
;
y.textWidth = a=>7 * a.toString().length;
y.articulationCodes = a=>y.articulationCodes.articulations[a];
y.articulationCodes.articulations = {
    "a.": {
        code: "augmentationDot",
        between_lines: !0
    },
    av: {
        aboveCode: "articStaccatissimoAbove",
        belowCode: "articStaccatissimoBelow",
        between_lines: !0
    },
    "a>": {
        aboveCode: "articAccentAbove",
        belowCode: "articAccentBelow",
        between_lines: !0
    },
    "a-": {
        aboveCode: "articTenutoAbove",
        belowCode: "articTenutoBelow",
        between_lines: !0
    },
    "a^": {
        aboveCode: "articMarcatoAbove",
        belowCode: "articMarcatoBelow",
        between_lines: !1
    },
    "a+": {
        code: "pluckedLeftHandPizzicato",
        between_lines: !1
    },
    ao: {
        aboveCode: "pluckedSnapPizzicatoAbove",
        belowCode: "pluckedSnapPizzicatoBelow",
        between_lines: !1
    },
    ah: {
        code: "stringsHarmonic",
        between_lines: !1
    },
    "a@": {
        aboveCode: "fermataAbove",
        belowCode: "fermataBelow",
        between_lines: !1
    },
    "a@a": {
        code: "fermataAbove",
        between_lines: !1
    },
    "a@u": {
        code: "fermataBelow",
        between_lines: !1
    },
    "a|": {
        code: "stringsUpBow",
        between_lines: !1
    },
    am: {
        code: "stringsDownBow",
        between_lines: !1
    },
    "a,": {
        code: "pictChokeCymbal",
        between_lines: !1
    }
};
y.accidentalCodes = a=>y.accidentalCodes.accidentals[a];
y.accidentalCodes.accidentals = {
    "#": {
        code: "accidentalSharp",
        parenRightPaddingAdjustment: -1
    },
    "##": {
        code: "accidentalDoubleSharp",
        parenRightPaddingAdjustment: -1
    },
    b: {
        code: "accidentalFlat",
        parenRightPaddingAdjustment: -2
    },
    bb: {
        code: "accidentalDoubleFlat",
        parenRightPaddingAdjustment: -2
    },
    n: {
        code: "accidentalNatural",
        parenRightPaddingAdjustment: -1
    },
    "{": {
        code: "accidentalParensLeft",
        parenRightPaddingAdjustment: -1
    },
    "}": {
        code: "accidentalParensRight",
        parenRightPaddingAdjustment: -1
    },
    db: {
        code: "accidentalThreeQuarterTonesFlatZimmermann",
        parenRightPaddingAdjustment: -1
    },
    d: {
        code: "accidentalQuarterToneFlatStein",
        parenRightPaddingAdjustment: 0
    },
    "++": {
        code: "accidentalThreeQuarterTonesSharpStein",
        parenRightPaddingAdjustment: -1
    },
    "+": {
        code: "accidentalQuarterToneSharpStein",
        parenRightPaddingAdjustment: -1
    },
    "+-": {
        code: "accidentalKucukMucennebSharp",
        parenRightPaddingAdjustment: -1
    },
    bs: {
        code: "accidentalBakiyeFlat",
        parenRightPaddingAdjustment: -1
    },
    bss: {
        code: "accidentalBuyukMucennebFlat",
        parenRightPaddingAdjustment: -1
    },
    o: {
        code: "accidentalSori",
        parenRightPaddingAdjustment: -1
    },
    k: {
        code: "accidentalKoron",
        parenRightPaddingAdjustment: -1
    },
    bbs: {
        code: "vexAccidentalMicrotonal1",
        parenRightPaddingAdjustment: -1
    },
    "++-": {
        code: "vexAccidentalMicrotonal2",
        parenRightPaddingAdjustment: -1
    },
    ashs: {
        code: "vexAccidentalMicrotonal3",
        parenRightPaddingAdjustment: -1
    },
    afhf: {
        code: "vexAccidentalMicrotonal4",
        parenRightPaddingAdjustment: -1
    }
};
y.accidentalColumnsTable = {
    1: {
        a: [1],
        b: [1]
    },
    2: {
        a: [1, 2]
    },
    3: {
        a: [1, 3, 2],
        b: [1, 2, 1],
        second_on_bottom: [1, 2, 3]
    },
    4: {
        a: [1, 3, 4, 2],
        b: [1, 2, 3, 1],
        spaced_out_tetrachord: [1, 2, 1, 2]
    },
    5: {
        a: [1, 3, 5, 4, 2],
        b: [1, 2, 4, 3, 1],
        spaced_out_pentachord: [1, 2, 3, 2, 1],
        very_spaced_out_pentachord: [1, 2, 1, 2, 1]
    },
    6: {
        a: [1, 3, 5, 6, 4, 2],
        b: [1, 2, 4, 5, 3, 1],
        spaced_out_hexachord: [1, 3, 2, 1, 3, 2],
        very_spaced_out_hexachord: [1, 2, 1, 2, 1, 2]
    }
};
y.ornamentCodes = a=>y.ornamentCodes.ornaments[a];
y.ornamentCodes.ornaments = {
    mordent: {
        code: "ornamentShortTrill"
    },
    mordent_inverted: {
        code: "ornamentMordent"
    },
    turn: {
        code: "ornamentTurn"
    },
    turn_inverted: {
        code: "ornamentTurnSlash"
    },
    tr: {
        code: "ornamentTrill"
    },
    upprall: {
        code: "ornamentPrecompSlideTrillDAnglebert"
    },
    downprall: {
        code: "ornamentPrecompDoubleCadenceUpperPrefix"
    },
    prallup: {
        code: "ornamentPrecompTrillSuffixDandrieu"
    },
    pralldown: {
        code: "ornamentPrecompTrillLowerSuffix"
    },
    upmordent: {
        code: "ornamentPrecompSlideTrillBach"
    },
    downmordent: {
        code: "ornamentPrecompDoubleCadenceUpperPrefixTurn"
    },
    lineprall: {
        code: "ornamentPrecompAppoggTrill"
    },
    prallprall: {
        code: "ornamentTremblement"
    }
};
y.keySignature = a=>{
    const t = y.keySignature.keySpecs[a];
    if (!t)
        throw new f.RERR("BadKeySignature",`Bad key signature spec: '${a}'`);
    if (!t.acc)
        return [];
    const e = y.keySignature.accidentalList(t.acc)
      , i = [];
    for (let s = 0; s < t.num; ++s) {
        const n = e[s];
        i.push({
            type: t.acc,
            line: n
        })
    }
    return i
}
;
y.keySignature.keySpecs = {
    C: {
        acc: null,
        num: 0
    },
    Am: {
        acc: null,
        num: 0
    },
    F: {
        acc: "b",
        num: 1
    },
    Dm: {
        acc: "b",
        num: 1
    },
    Bb: {
        acc: "b",
        num: 2
    },
    Gm: {
        acc: "b",
        num: 2
    },
    Eb: {
        acc: "b",
        num: 3
    },
    Cm: {
        acc: "b",
        num: 3
    },
    Ab: {
        acc: "b",
        num: 4
    },
    Fm: {
        acc: "b",
        num: 4
    },
    Db: {
        acc: "b",
        num: 5
    },
    Bbm: {
        acc: "b",
        num: 5
    },
    Gb: {
        acc: "b",
        num: 6
    },
    Ebm: {
        acc: "b",
        num: 6
    },
    Cb: {
        acc: "b",
        num: 7
    },
    Abm: {
        acc: "b",
        num: 7
    },
    G: {
        acc: "#",
        num: 1
    },
    Em: {
        acc: "#",
        num: 1
    },
    D: {
        acc: "#",
        num: 2
    },
    Bm: {
        acc: "#",
        num: 2
    },
    A: {
        acc: "#",
        num: 3
    },
    "F#m": {
        acc: "#",
        num: 3
    },
    E: {
        acc: "#",
        num: 4
    },
    "C#m": {
        acc: "#",
        num: 4
    },
    B: {
        acc: "#",
        num: 5
    },
    "G#m": {
        acc: "#",
        num: 5
    },
    "F#": {
        acc: "#",
        num: 6
    },
    "D#m": {
        acc: "#",
        num: 6
    },
    "C#": {
        acc: "#",
        num: 7
    },
    "A#m": {
        acc: "#",
        num: 7
    }
};
y.unicode = {
    sharp: String.fromCharCode(parseInt("266F", 16)),
    flat: String.fromCharCode(parseInt("266D", 16)),
    natural: String.fromCharCode(parseInt("266E", 16)),
    triangle: String.fromCharCode(parseInt("25B3", 16)),
    "o-with-slash": String.fromCharCode(parseInt("00F8", 16)),
    degrees: String.fromCharCode(parseInt("00B0", 16)),
    circle: String.fromCharCode(parseInt("25CB", 16))
};
y.keySignature.accidentalList = a=>({
    b: [2, .5, 2.5, 1, 3, 1.5, 3.5],
    "#": [0, 1.5, -.5, 1, 2.5, .5, 2]
})[a];
y.sanitizeDuration = a=>{
    const t = y.durationAliases[a];
    if (t !== void 0 && (a = t),
    y.durationToTicks.durations[a] === void 0)
        throw new f.RERR("BadArguments",`The provided duration is not valid: ${a}`);
    return a
}
;
y.durationToFraction = a=>new k().parse(y.sanitizeDuration(a));
y.durationToNumber = a=>y.durationToFraction(a).value();
y.durationToTicks = a=>{
    a = y.sanitizeDuration(a);
    const t = y.durationToTicks.durations[a];
    return t === void 0 ? null : t
}
;
y.durationToTicks.durations = {
    "1/2": y.RESOLUTION * 2,
    "1": y.RESOLUTION / 1,
    "2": y.RESOLUTION / 2,
    "4": y.RESOLUTION / 4,
    "8": y.RESOLUTION / 8,
    "16": y.RESOLUTION / 16,
    "32": y.RESOLUTION / 32,
    "64": y.RESOLUTION / 64,
    "128": y.RESOLUTION / 128,
    "256": y.RESOLUTION / 256
};
y.durationAliases = {
    w: "1",
    h: "2",
    q: "4",
    b: "256"
};
y.getGlyphProps = (a,t)=>{
    a = y.sanitizeDuration(a),
    t = t || "n";
    const e = y.getGlyphProps.duration_codes[a];
    if (e === void 0)
        return null;
    let i = e.type[t];
    if (i === void 0) {
        const s = y.keyProperties.customNoteHeads[t.toUpperCase()];
        if (s === void 0)
            return null;
        i = R({
            code_head: s.code
        }, s)
    }
    return R(R({}, e.common), i)
}
;
y.getGlyphProps.validTypes = {
    n: {
        name: "note"
    },
    r: {
        name: "rest"
    },
    h: {
        name: "harmonic"
    },
    m: {
        name: "muted"
    },
    s: {
        name: "slash"
    }
};
y.keyProperties.customNoteHeads = {
    D0: {
        code: "noteheadDiamondWhole"
    },
    D1: {
        code: "noteheadDiamondHalf"
    },
    D2: {
        code: "noteheadDiamondBlack"
    },
    D3: {
        code: "noteheadDiamondBlack"
    },
    T0: {
        code: "noteheadTriangleUpWhole"
    },
    T1: {
        code: "noteheadTriangleUpHalf"
    },
    T2: {
        code: "noteheadTriangleUpBlack"
    },
    T3: {
        code: "noteheadTriangleUpBlack"
    },
    X0: {
        code: "noteheadXWhole"
    },
    X1: {
        code: "noteheadXHalf"
    },
    X2: {
        code: "noteheadXBlack"
    },
    X3: {
        code: "noteheadCircleX"
    },
    S1: {
        code: "noteheadSquareWhite"
    },
    S2: {
        code: "noteheadSquareBlack"
    },
    R1: {
        code: "vexNoteHeadRectWhite"
    },
    R2: {
        code: "vexNoteHeadRectBlack"
    }
};
y.getGlyphProps.duration_codes = {
    "1/2": {
        common: {
            getWidth(a=y.DEFAULT_NOTATION_FONT_SCALE) {
                return new E(this.code_head || "v53",a).getMetrics().width
            },
            stem: !1,
            stem_offset: 0,
            flag: !1,
            stem_up_extension: -y.STEM_HEIGHT,
            stem_down_extension: -y.STEM_HEIGHT,
            tabnote_stem_up_extension: -y.STEM_HEIGHT,
            tabnote_stem_down_extension: -y.STEM_HEIGHT,
            dot_shiftY: 0,
            line_above: 0,
            line_below: 0
        },
        type: {
            n: {
                code_head: "noteheadDoubleWhole"
            },
            h: {
                code_head: "unpitchedPercussionClef1"
            },
            m: {
                code_head: "vexNoteHeadMutedBreve",
                stem_offset: 0
            },
            r: {
                code_head: "restDoubleWhole",
                rest: !0,
                position: "B/5",
                dot_shiftY: .5
            },
            s: {
                getWidth: ()=>y.SLASH_NOTEHEAD_WIDTH,
                position: "B/4"
            }
        }
    },
    "1": {
        common: {
            getWidth(a=y.DEFAULT_NOTATION_FONT_SCALE) {
                return new E(this.code_head || "v1d",a).getMetrics().width
            },
            stem: !1,
            stem_offset: 0,
            flag: !1,
            stem_up_extension: -y.STEM_HEIGHT,
            stem_down_extension: -y.STEM_HEIGHT,
            tabnote_stem_up_extension: -y.STEM_HEIGHT,
            tabnote_stem_down_extension: -y.STEM_HEIGHT,
            dot_shiftY: 0,
            line_above: 0,
            line_below: 0
        },
        type: {
            n: {
                code_head: "noteheadWhole"
            },
            h: {
                code_head: "noteheadDiamondWhole"
            },
            m: {
                code_head: "noteheadXWhole",
                stem_offset: -3
            },
            r: {
                code_head: "restWhole",
                rest: !0,
                position: "D/5",
                dot_shiftY: .5
            },
            s: {
                getWidth: ()=>y.SLASH_NOTEHEAD_WIDTH,
                position: "B/4"
            }
        }
    },
    "2": {
        common: {
            getWidth(a=y.DEFAULT_NOTATION_FONT_SCALE) {
                return new E(this.code_head || "noteheadHalf",a).getMetrics().width
            },
            stem: !0,
            stem_offset: 0,
            flag: !1,
            stem_up_extension: 0,
            stem_down_extension: 0,
            tabnote_stem_up_extension: 0,
            tabnote_stem_down_extension: 0,
            dot_shiftY: 0,
            line_above: 0,
            line_below: 0
        },
        type: {
            n: {
                code_head: "noteheadHalf"
            },
            h: {
                code_head: "noteheadDiamondHalf"
            },
            m: {
                code_head: "noteheadXHalf",
                stem_offset: -3
            },
            r: {
                code_head: "restHalf",
                stem: !1,
                rest: !0,
                position: "B/4",
                dot_shiftY: -.5
            },
            s: {
                getWidth: ()=>y.SLASH_NOTEHEAD_WIDTH,
                position: "B/4"
            }
        }
    },
    "4": {
        common: {
            getWidth(a=y.DEFAULT_NOTATION_FONT_SCALE) {
                return new E(this.code_head || "noteheadBlack",a).getMetrics().width
            },
            stem: !0,
            stem_offset: 0,
            flag: !1,
            stem_up_extension: 0,
            stem_down_extension: 0,
            tabnote_stem_up_extension: 0,
            tabnote_stem_down_extension: 0,
            dot_shiftY: 0,
            line_above: 0,
            line_below: 0
        },
        type: {
            n: {
                code_head: "noteheadBlack"
            },
            h: {
                code_head: "noteheadDiamondBlack"
            },
            m: {
                code_head: "noteheadXBlack"
            },
            r: {
                code_head: "restQuarter",
                stem: !1,
                rest: !0,
                position: "B/4",
                dot_shiftY: -.5,
                line_above: 1.5,
                line_below: 1.5
            },
            s: {
                getWidth: ()=>y.SLASH_NOTEHEAD_WIDTH,
                position: "B/4"
            }
        }
    },
    "8": {
        common: {
            getWidth(a=y.DEFAULT_NOTATION_FONT_SCALE) {
                return new E(this.code_head || "noteheadBlack",a).getMetrics().width
            },
            stem: !0,
            stem_offset: 0,
            flag: !0,
            beam_count: 1,
            code_flag_upstem: "flag8thUp",
            code_flag_downstem: "flag8thDown",
            stem_up_extension: 0,
            stem_down_extension: 0,
            tabnote_stem_up_extension: 0,
            tabnote_stem_down_extension: 0,
            dot_shiftY: 0,
            line_above: 0,
            line_below: 0
        },
        type: {
            n: {
                code_head: "noteheadBlack"
            },
            h: {
                code_head: "noteheadDiamondBlack"
            },
            m: {
                code_head: "noteheadXBlack"
            },
            r: {
                code_head: "rest8th",
                stem: !1,
                flag: !1,
                rest: !0,
                position: "B/4",
                dot_shiftY: -.5,
                line_above: 1,
                line_below: 1
            },
            s: {
                getWidth: ()=>y.SLASH_NOTEHEAD_WIDTH,
                position: "B/4"
            }
        }
    },
    "16": {
        common: {
            beam_count: 2,
            getWidth(a=y.DEFAULT_NOTATION_FONT_SCALE) {
                return new E(this.code_head || "noteheadBlack",a).getMetrics().width
            },
            stem: !0,
            stem_offset: 0,
            flag: !0,
            code_flag_upstem: "flag16thUp",
            code_flag_downstem: "flag16thDown",
            stem_up_extension: 0,
            stem_down_extension: 0,
            tabnote_stem_up_extension: 0,
            tabnote_stem_down_extension: 0,
            dot_shiftY: 0,
            line_above: 0,
            line_below: 0
        },
        type: {
            n: {
                code_head: "noteheadBlack"
            },
            h: {
                code_head: "noteheadDiamondBlack"
            },
            m: {
                code_head: "noteheadXBlack"
            },
            r: {
                code_head: "rest16th",
                stem: !1,
                flag: !1,
                rest: !0,
                position: "B/4",
                dot_shiftY: -.5,
                line_above: 1,
                line_below: 2
            },
            s: {
                getWidth: ()=>y.SLASH_NOTEHEAD_WIDTH,
                position: "B/4"
            }
        }
    },
    "32": {
        common: {
            beam_count: 3,
            getWidth(a=y.DEFAULT_NOTATION_FONT_SCALE) {
                return new E(this.code_head || "noteheadBlack",a).getMetrics().width
            },
            stem: !0,
            stem_offset: 0,
            flag: !0,
            code_flag_upstem: "flag32ndUp",
            code_flag_downstem: "flag32ndDown",
            stem_up_extension: 9,
            stem_down_extension: 9,
            tabnote_stem_up_extension: 8,
            tabnote_stem_down_extension: 5,
            dot_shiftY: 0,
            line_above: 0,
            line_below: 0
        },
        type: {
            n: {
                code_head: "noteheadBlack"
            },
            h: {
                code_head: "noteheadDiamondBlack"
            },
            m: {
                code_head: "noteheadXBlack"
            },
            r: {
                code_head: "rest32nd",
                stem: !1,
                flag: !1,
                rest: !0,
                position: "B/4",
                dot_shiftY: -1.5,
                line_above: 2,
                line_below: 2
            },
            s: {
                getWidth: ()=>y.SLASH_NOTEHEAD_WIDTH,
                position: "B/4"
            }
        }
    },
    "64": {
        common: {
            beam_count: 4,
            getWidth(a=y.DEFAULT_NOTATION_FONT_SCALE) {
                return new E(this.code_head || "noteheadBlack",a).getMetrics().width
            },
            stem: !0,
            stem_offset: 0,
            flag: !0,
            code_flag_upstem: "flag64thUp",
            code_flag_downstem: "flag64thDown",
            stem_up_extension: 13,
            stem_down_extension: 13,
            tabnote_stem_up_extension: 12,
            tabnote_stem_down_extension: 9,
            dot_shiftY: 0,
            line_above: 0,
            line_below: 0
        },
        type: {
            n: {
                code_head: "noteheadBlack"
            },
            h: {
                code_head: "noteheadDiamondBlack"
            },
            m: {
                code_head: "noteheadXBlack"
            },
            r: {
                code_head: "rest64th",
                stem: !1,
                flag: !1,
                rest: !0,
                position: "B/4",
                dot_shiftY: -1.5,
                line_above: 2,
                line_below: 3
            },
            s: {
                getWidth: ()=>y.SLASH_NOTEHEAD_WIDTH,
                position: "B/4"
            }
        }
    },
    "128": {
        common: {
            beam_count: 5,
            getWidth(a=y.DEFAULT_NOTATION_FONT_SCALE) {
                return new E(this.code_head || "noteheadBlack",a).getMetrics().width
            },
            stem: !0,
            stem_offset: 0,
            flag: !0,
            code_flag_upstem: "flag128thUp",
            code_flag_downstem: "flag128thDown",
            stem_up_extension: 22,
            stem_down_extension: 22,
            tabnote_stem_up_extension: 21,
            tabnote_stem_down_extension: 18,
            dot_shiftY: 0,
            line_above: 0,
            line_below: 0
        },
        type: {
            n: {
                code_head: "noteheadBlack"
            },
            h: {
                code_head: "noteheadDiamondBlack"
            },
            m: {
                code_head: "noteheadXBlack"
            },
            r: {
                code_head: "rest128th",
                stem: !1,
                flag: !1,
                rest: !0,
                position: "B/4",
                dot_shiftY: 1.5,
                line_above: 3,
                line_below: 3
            },
            s: {
                getWidth: ()=>y.SLASH_NOTEHEAD_WIDTH,
                position: "B/4"
            }
        }
    }
};
y.TIME4_4 = {
    num_beats: 4,
    beat_value: 4,
    resolution: y.RESOLUTION
};
class A1 {
    static get WIDTH() {
        return 600
    }
    static get HEIGHT() {
        return 400
    }
    static get CANVAS_BROWSER_SIZE_LIMIT() {
        return 32767
    }
    static SanitizeCanvasDims(t, e) {
        return Math.max(t, e) > this.CANVAS_BROWSER_SIZE_LIMIT && (f.W("Canvas dimensions exceed browser limit. Cropping to " + this.CANVAS_BROWSER_SIZE_LIMIT),
        t > this.CANVAS_BROWSER_SIZE_LIMIT && (t = this.CANVAS_BROWSER_SIZE_LIMIT),
        e > this.CANVAS_BROWSER_SIZE_LIMIT && (e = this.CANVAS_BROWSER_SIZE_LIMIT)),
        [t, e]
    }
    constructor(t) {
        this.vexFlowCanvasContext = t,
        t.canvas ? this.canvas = t.canvas : this.canvas = {
            width: A1.WIDTH,
            height: A1.HEIGHT
        }
    }
    clear() {
        this.vexFlowCanvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
    openGroup() {}
    closeGroup() {}
    add() {}
    setFont(t, e, i) {
        return this.vexFlowCanvasContext.font = (i || "") + " " + e + "pt " + t,
        this
    }
    setRawFont(t) {
        return this.vexFlowCanvasContext.font = t,
        this
    }
    setFillStyle(t) {
        return this.vexFlowCanvasContext.fillStyle = t,
        this
    }
    setBackgroundFillStyle(t) {
        return this.background_fillStyle = t,
        this
    }
    setStrokeStyle(t) {
        return this.vexFlowCanvasContext.strokeStyle = t,
        this
    }
    setShadowColor(t) {
        return this.vexFlowCanvasContext.shadowColor = t,
        this
    }
    setShadowBlur(t) {
        return this.vexFlowCanvasContext.shadowBlur = t,
        this
    }
    setLineWidth(t) {
        return this.vexFlowCanvasContext.lineWidth = t,
        this
    }
    setLineCap(t) {
        return this.vexFlowCanvasContext.lineCap = t,
        this
    }
    setLineDash(t) {
        return this.vexFlowCanvasContext.lineDash = t,
        this
    }
    scale(t, e) {
        return this.vexFlowCanvasContext.scale(parseFloat(t), parseFloat(e))
    }
    resize(t, e) {
        return [t,e] = this.SanitizeCanvasDims(parseInt(t, 10), parseInt(e, 10)),
        this.vexFlowCanvasContext.resize(t, e)
    }
    rect(t, e, i, s) {
        return this.vexFlowCanvasContext.rect(t, e, i, s)
    }
    fillRect(t, e, i, s) {
        return this.vexFlowCanvasContext.fillRect(t, e, i, s)
    }
    clearRect(t, e, i, s) {
        return this.vexFlowCanvasContext.clearRect(t, e, i, s)
    }
    beginPath() {
        return this.vexFlowCanvasContext.beginPath()
    }
    moveTo(t, e) {
        return this.vexFlowCanvasContext.moveTo(t, e)
    }
    lineTo(t, e) {
        return this.vexFlowCanvasContext.lineTo(t, e)
    }
    bezierCurveTo(t, e, i, s, n, o) {
        return this.vexFlowCanvasContext.bezierCurveTo(t, e, i, s, n, o)
    }
    quadraticCurveTo(t, e, i, s) {
        return this.vexFlowCanvasContext.quadraticCurveTo(t, e, i, s)
    }
    arc(t, e, i, s, n, o) {
        return this.vexFlowCanvasContext.arc(t, e, i, s, n, o)
    }
    glow() {
        return this.vexFlowCanvasContext.glow()
    }
    fill() {
        return this.vexFlowCanvasContext.fill()
    }
    stroke() {
        return this.vexFlowCanvasContext.stroke()
    }
    closePath() {
        return this.vexFlowCanvasContext.closePath()
    }
    measureText(t) {
        return this.vexFlowCanvasContext.measureText(t)
    }
    fillText(t, e, i) {
        return this.vexFlowCanvasContext.fillText(t, e, i)
    }
    save() {
        return this.vexFlowCanvasContext.save()
    }
    restore() {
        return this.vexFlowCanvasContext.restore()
    }
}
class nt {
    constructor(t) {
        this.element = t,
        this.paper = Raphael(t),
        this.path = "",
        this.pen = {
            x: 0,
            y: 0
        },
        this.lineWidth = 1,
        this.state = {
            scale: {
                x: 1,
                y: 1
            },
            font_family: "Arial",
            font_size: 8,
            font_weight: 800
        },
        this.attributes = {
            "stroke-width": .3,
            fill: "black",
            stroke: "black",
            font: "10pt Arial"
        },
        this.background_attributes = {
            "stroke-width": 0,
            fill: "white",
            stroke: "white",
            font: "10pt Arial"
        },
        this.shadow_attributes = {
            width: 0,
            color: "black"
        },
        this.state_stack = []
    }
    openGroup() {}
    closeGroup() {}
    add() {}
    setFont(t, e, i) {
        return this.state.font_family = t,
        this.state.font_size = e,
        this.state.font_weight = i,
        this.attributes.font = (this.state.font_weight || "") + " " + this.state.font_size * this.state.scale.x + "pt " + this.state.font_family,
        this
    }
    setRawFont(t) {
        return this.attributes.font = t,
        this
    }
    setFillStyle(t) {
        return this.attributes.fill = t,
        this
    }
    setBackgroundFillStyle(t) {
        return this.background_attributes.fill = t,
        this.background_attributes.stroke = t,
        this
    }
    setStrokeStyle(t) {
        return this.attributes.stroke = t,
        this
    }
    setShadowColor(t) {
        return this.shadow_attributes.color = t,
        this
    }
    setShadowBlur(t) {
        return this.shadow_attributes.width = t,
        this
    }
    setLineWidth(t) {
        this.attributes["stroke-width"] = t,
        this.lineWidth = t
    }
    setLineDash() {
        return this
    }
    setLineCap() {
        return this
    }
    scale(t, e) {
        return this.state.scale = {
            x: t,
            y: e
        },
        this.attributes.transform = "S" + t + "," + e + ",0,0",
        this.attributes.scale = t + "," + e + ",0,0",
        this.attributes.font = this.state.font_size * this.state.scale.x + "pt " + this.state.font_family,
        this.background_attributes.transform = "S" + t + "," + e + ",0,0",
        this.background_attributes.font = this.state.font_size * this.state.scale.x + "pt " + this.state.font_family,
        this
    }
    clear() {
        this.paper.clear()
    }
    resize(t, e) {
        return this.element.style.width = t,
        this.paper.setSize(t, e),
        this
    }
    setViewBox(t) {
        this.paper.canvas.setAttribute("viewBox", t)
    }
    rect(t, e, i, s) {
        return s < 0 && (e += s,
        s = -s),
        this.paper.rect(t, e, i - .5, s - .5).attr(this.attributes).attr("fill", "none").attr("stroke-width", this.lineWidth),
        this
    }
    fillRect(t, e, i, s) {
        return s < 0 && (e += s,
        s = -s),
        this.paper.rect(t, e, i - .5, s - .5).attr(this.attributes),
        this
    }
    clearRect(t, e, i, s) {
        return s < 0 && (e += s,
        s = -s),
        this.paper.rect(t, e, i - .5, s - .5).attr(this.background_attributes),
        this
    }
    beginPath() {
        return this.path = "",
        this.pen.x = 0,
        this.pen.y = 0,
        this
    }
    moveTo(t, e) {
        return this.path += "M" + t + "," + e,
        this.pen.x = t,
        this.pen.y = e,
        this
    }
    lineTo(t, e) {
        return this.path += "L" + t + "," + e,
        this.pen.x = t,
        this.pen.y = e,
        this
    }
    bezierCurveTo(t, e, i, s, n, o) {
        return this.path += "C" + t + "," + e + "," + i + "," + s + "," + n + "," + o,
        this.pen.x = n,
        this.pen.y = o,
        this
    }
    quadraticCurveTo(t, e, i, s) {
        return this.path += "Q" + t + "," + e + "," + i + "," + s,
        this.pen.x = i,
        this.pen.y = s,
        this
    }
    arc(t, e, i, s, n, o) {
        function l(d) {
            for (; d < 0; )
                d += Math.PI * 2;
            for (; d > Math.PI * 2; )
                d -= Math.PI * 2;
            return d
        }
        if (s = l(s),
        n = l(n),
        s > n) {
            const d = s;
            s = n,
            n = d,
            o = !o
        }
        const c = n - s;
        return c > Math.PI ? (this.arcHelper(t, e, i, s, s + c / 2, o),
        this.arcHelper(t, e, i, s + c / 2, n, o)) : this.arcHelper(t, e, i, s, n, o),
        this
    }
    arcHelper(t, e, i, s, n, o) {
        const l = t + i * Math.cos(s)
          , c = e + i * Math.sin(s)
          , d = t + i * Math.cos(n)
          , u = e + i * Math.sin(n);
        let b = 0
          , r = 0;
        o ? (r = 1,
        n - s < Math.PI && (b = 1)) : n - s > Math.PI && (b = 1),
        this.path += "M" + l + "," + c + ",A" + i + "," + i + ",0," + b + "," + r + "," + d + "," + u + "M" + this.pen.x + "," + this.pen.y
    }
    glow() {
        const t = this.paper.set();
        if (this.shadow_attributes.width > 0) {
            const e = this.shadow_attributes
              , i = e.width / 2;
            for (let s = 1; s <= i; s++)
                t.push(this.paper.path(this.path).attr({
                    stroke: e.color,
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round",
                    "stroke-width": +(e.width / i * s).toFixed(3),
                    opacity: +((e.opacity || .3) / i).toFixed(3),
                    transform: this.attributes.transform,
                    scale: this.attributes.scale
                }))
        }
        return t
    }
    fill() {
        const t = this.paper.path(this.path).attr(this.attributes).attr("stroke-width", 0);
        return this.glow(t),
        this
    }
    stroke() {
        const t = this.lineWidth * (this.state.scale.x + this.state.scale.y) / 2
          , e = this.paper.path(this.path).attr(this.attributes).attr("fill", "none").attr("stroke-width", t);
        return this.glow(e),
        this
    }
    closePath() {
        return this.path += "Z",
        this
    }
    measureText(t) {
        const e = this.paper.text(0, 0, t).attr(this.attributes).attr("fill", "none").attr("stroke", "none")
          , i = e.getBBox();
        return e.remove(),
        {
            width: i.width,
            height: i.height
        }
    }
    fillText(t, e, i) {
        return this.paper.text(e + this.measureText(t).width / 2, i - this.state.font_size / (2.25 * this.state.scale.y), t).attr(this.attributes),
        this
    }
    save() {
        return this.state_stack.push({
            state: {
                font_family: this.state.font_family
            },
            attributes: {
                font: this.attributes.font,
                fill: this.attributes.fill,
                stroke: this.attributes.stroke,
                "stroke-width": this.attributes["stroke-width"]
            },
            shadow_attributes: {
                width: this.shadow_attributes.width,
                color: this.shadow_attributes.color
            }
        }),
        this
    }
    restore() {
        const t = this.state_stack.pop();
        return this.state.font_family = t.state.font_family,
        this.attributes.font = t.attributes.font,
        this.attributes.fill = t.attributes.fill,
        this.attributes.stroke = t.attributes.stroke,
        this.attributes["stroke-width"] = t.attributes["stroke-width"],
        this.shadow_attributes.width = t.shadow_attributes.width,
        this.shadow_attributes.color = t.shadow_attributes.color,
        this
    }
}
const c2 = {
    path: {
        x: !0,
        y: !0,
        width: !0,
        height: !0
    },
    rect: {},
    text: {
        width: !0,
        height: !0
    }
};
{
    const a = {
        "font-family": !0,
        "font-weight": !0,
        "font-style": !0,
        "font-size": !0
    };
    f.Merge(c2.rect, a),
    f.Merge(c2.path, a)
}
class bt {
    constructor(t) {
        this.element = t,
        this.svgNS = "http://www.w3.org/2000/svg";
        const e = this.create("svg");
        this.element.appendChild(e),
        this.svg = e,
        this.groups = [this.svg],
        this.parent = this.svg,
        this.path = "",
        this.pen = {
            x: NaN,
            y: NaN
        },
        this.lineWidth = 1,
        this.state = {
            scale: {
                x: 1,
                y: 1
            },
            "font-family": "Arial",
            "font-size": "8pt",
            "font-weight": "normal"
        },
        this.attributes = {
            "stroke-width": .3,
            fill: "black",
            stroke: "black",
            "stroke-dasharray": "none",
            "font-family": "Arial",
            "font-size": "10pt",
            "font-weight": "normal",
            "font-style": "normal"
        },
        this.background_attributes = {
            "stroke-width": 0,
            fill: "white",
            stroke: "white",
            "stroke-dasharray": "none",
            "font-family": "Arial",
            "font-size": "10pt",
            "font-weight": "normal",
            "font-style": "normal"
        },
        this.shadow_attributes = {
            width: 0,
            color: "black"
        },
        this.state_stack = [],
        this.iePolyfill()
    }
    create(t) {
        return document.createElementNS(this.svgNS, t)
    }
    openGroup(t, e, i) {
        const s = this.create("g");
        return this.groups.push(s),
        this.parent.appendChild(s),
        this.parent = s,
        t && s.setAttribute("class", f.Prefix(t)),
        e && s.setAttribute("id", f.Prefix(e)),
        i && i.pointerBBox && s.setAttribute("pointer-events", "bounding-box"),
        s
    }
    closeGroup() {
        this.groups.pop(),
        this.parent = this.groups[this.groups.length - 1]
    }
    add(t) {
        this.parent.appendChild(t)
    }
    iePolyfill() {
        typeof navigator != "undefined" && (this.ie = /MSIE 9/i.test(navigator.userAgent) || /MSIE 10/i.test(navigator.userAgent) || /rv:11\.0/i.test(navigator.userAgent) || /Trident/i.test(navigator.userAgent))
    }
    setFont(t, e, i) {
        let s = !1
          , n = !1
          , o = "normal";
        typeof i == "string" && (i.indexOf("italic") !== -1 && (i = i.replace(/italic/g, ""),
        n = !0),
        i.indexOf("bold") !== -1 && (i = i.replace(/bold/g, ""),
        s = !0),
        i = i.replace(/ /g, "")),
        i = s ? "bold" : i,
        i = typeof i == "undefined" || i === "" ? "normal" : i,
        o = n ? "italic" : o;
        const l = {
            "font-family": t,
            "font-size": e + "pt",
            "font-weight": i,
            "font-style": o
        };
        return this.fontSize = Number(e),
        f.Merge(this.attributes, l),
        f.Merge(this.state, l),
        this
    }
    setRawFont(t) {
        t = t.trim();
        const e = t.split(" ");
        return this.attributes["font-family"] = e[1],
        this.state["font-family"] = e[1],
        this.attributes["font-size"] = e[0],
        this.state["font-size"] = e[0],
        this.fontSize = Number(e[0].match(/\d+/)),
        this
    }
    setFillStyle(t) {
        return this.attributes.fill = t,
        this
    }
    setBackgroundFillStyle(t) {
        return this.background_attributes.fill = t,
        this.background_attributes.stroke = t,
        this
    }
    setStrokeStyle(t) {
        return this.attributes.stroke = t,
        this
    }
    setShadowColor(t) {
        return this.shadow_attributes.color = t,
        this
    }
    setShadowBlur(t) {
        return this.shadow_attributes.width = t,
        this
    }
    setLineWidth(t) {
        this.attributes["stroke-width"] = t,
        this.lineWidth = t
    }
    setLineDash(t) {
        if (Object.prototype.toString.call(t) === "[object Array]")
            return t = t.join(", "),
            this.attributes["stroke-dasharray"] = t,
            this;
        throw new f.RERR("ArgumentError","lineDash must be an array of integers.")
    }
    setLineCap(t) {
        return this.attributes["stroke-linecap"] = t,
        this
    }
    resize(t, e) {
        this.width = t,
        this.height = e,
        this.element.style.width = t,
        this.svg.style.width = t,
        this.svg.style.height = e;
        const i = {
            width: t,
            height: e
        };
        return this.applyAttributes(this.svg, i),
        this.scale(this.state.scale.x, this.state.scale.y),
        this
    }
    scale(t, e) {
        this.state.scale = {
            x: t,
            y: e
        };
        const i = this.width / t
          , s = this.height / e;
        return this.setViewBox(0, 0, i, s),
        this
    }
    setViewBox(...t) {
        if (t.length === 1) {
            const [e] = t;
            this.svg.setAttribute("viewBox", e)
        } else {
            const [e,i,s,n] = t
              , o = e + " " + i + " " + s + " " + n;
            this.svg.setAttribute("viewBox", o)
        }
    }
    applyAttributes(t, e) {
        const i = c2[t.nodeName];
        return Object.keys(e).forEach(s=>{
            i && i[s] || t.setAttributeNS(null, s, e[s])
        }
        ),
        t
    }
    clear() {
        for (; this.svg.lastChild; )
            this.svg.removeChild(this.svg.lastChild);
        this.scale(this.state.scale.x, this.state.scale.y)
    }
    rect(t, e, i, s, n) {
        s < 0 && (e += s,
        s *= -1);
        const o = this.create("rect");
        return typeof n == "undefined" && (n = {
            fill: "none",
            "stroke-width": this.lineWidth,
            stroke: "black"
        }),
        f.Merge(n, {
            x: t,
            y: e,
            width: i,
            height: s
        }),
        this.applyAttributes(o, n),
        this.add(o),
        this
    }
    fillRect(t, e, i, s) {
        return s < 0 && (e += s,
        s *= -1),
        this.rect(t, e, i, s, this.attributes),
        this
    }
    clearRect(t, e, i, s) {
        return this.rect(t, e, i, s, this.background_attributes),
        this
    }
    beginPath() {
        return this.path = "",
        this.pen.x = NaN,
        this.pen.y = NaN,
        this
    }
    moveTo(t, e) {
        return this.path += "M" + t + " " + e,
        this.pen.x = t,
        this.pen.y = e,
        this
    }
    lineTo(t, e) {
        return this.path += "L" + t + " " + e,
        this.pen.x = t,
        this.pen.y = e,
        this
    }
    bezierCurveTo(t, e, i, s, n, o) {
        return this.path += "C" + t + " " + e + "," + i + " " + s + "," + n + " " + o,
        this.pen.x = n,
        this.pen.y = o,
        this
    }
    quadraticCurveTo(t, e, i, s) {
        return this.path += "Q" + t + " " + e + "," + i + " " + s,
        this.pen.x = i,
        this.pen.y = s,
        this
    }
    arc(t, e, i, s, n, o) {
        function l(d) {
            for (; d < 0; )
                d += Math.PI * 2;
            for (; d > Math.PI * 2; )
                d -= Math.PI * 2;
            return d
        }
        if (s = l(s),
        n = l(n),
        s > n) {
            const d = s;
            s = n,
            n = d,
            o = !o
        }
        const c = n - s;
        return c > Math.PI ? (this.arcHelper(t, e, i, s, s + c / 2, o),
        this.arcHelper(t, e, i, s + c / 2, n, o)) : this.arcHelper(t, e, i, s, n, o),
        this
    }
    arcHelper(t, e, i, s, n, o) {
        const l = t + i * Math.cos(s)
          , c = e + i * Math.sin(s)
          , d = t + i * Math.cos(n)
          , u = e + i * Math.sin(n);
        let b = 0
          , r = 0;
        o ? (r = 1,
        n - s < Math.PI && (b = 1)) : n - s > Math.PI && (b = 1),
        this.path += "M" + l + " " + c + " A" + i + " " + i + " 0 " + b + " " + r + " " + d + " " + u,
        !isNaN(this.pen.x) && !isNaN(this.pen.y) && (this.peth += "M" + this.pen.x + " " + this.pen.y)
    }
    closePath() {
        return this.path += "Z",
        this
    }
    glow() {
        if (this.shadow_attributes.width > 0) {
            const t = this.shadow_attributes
              , e = t.width / 2;
            for (let i = 1; i <= e; i++) {
                const s = {
                    stroke: t.color,
                    "stroke-linejoin": "round",
                    "stroke-linecap": "round",
                    "stroke-width": +(t.width * .4 / e * i).toFixed(3),
                    opacity: +((t.opacity || .3) / e).toFixed(3)
                }
                  , n = this.create("path");
                s.d = this.path,
                this.applyAttributes(n, s),
                this.add(n)
            }
        }
        return this
    }
    fill(t) {
        this.glow();
        const e = this.create("path");
        return typeof t == "undefined" && (t = {},
        f.Merge(t, this.attributes),
        t.stroke = "none"),
        t.d = this.path,
        this.applyAttributes(e, t),
        this.add(e),
        this
    }
    stroke() {
        this.glow();
        const t = this.create("path")
          , e = {};
        return f.Merge(e, this.attributes),
        e.fill = "none",
        e["stroke-width"] = this.lineWidth,
        e.d = this.path,
        this.applyAttributes(t, e),
        this.add(t),
        this
    }
    measureText(t) {
        const e = this.create("text");
        if (typeof e.getBBox != "function")
            return {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            };
        e.textContent = t,
        this.applyAttributes(e, this.attributes),
        this.svg.appendChild(e);
        let i = e.getBBox();
        return this.ie && t !== "" && this.attributes["font-style"] === "italic" && (i = this.ieMeasureTextFix(i, t)),
        this.svg.removeChild(e),
        i
    }
    ieMeasureTextFix(t) {
        const e = Number(this.fontSize)
          , i = 1.196
          , s = 1.9598
          , n = i * e + s
          , o = t.width - n
          , l = t.height - 1.5;
        return {
            x: t.x,
            y: t.y,
            width: o,
            height: l
        }
    }
    fillText(t, e, i) {
        if (!t || t.length <= 0)
            return;
        const s = {};
        f.Merge(s, this.attributes),
        s.stroke = "none",
        s.x = e,
        s.y = i;
        const n = this.create("text");
        n.textContent = t,
        this.applyAttributes(n, s),
        this.add(n)
    }
    save() {
        return this.state_stack.push({
            state: {
                "font-family": this.state["font-family"],
                "font-weight": this.state["font-weight"],
                "font-style": this.state["font-style"],
                "font-size": this.state["font-size"],
                scale: this.state.scale
            },
            attributes: {
                "font-family": this.attributes["font-family"],
                "font-weight": this.attributes["font-weight"],
                "font-style": this.attributes["font-style"],
                "font-size": this.attributes["font-size"],
                fill: this.attributes.fill,
                stroke: this.attributes.stroke,
                "stroke-width": this.attributes["stroke-width"],
                "stroke-dasharray": this.attributes["stroke-dasharray"]
            },
            shadow_attributes: {
                width: this.shadow_attributes.width,
                color: this.shadow_attributes.color
            },
            lineWidth: this.lineWidth
        }),
        this
    }
    restore() {
        const t = this.state_stack.pop();
        return this.state["font-family"] = t.state["font-family"],
        this.state["font-weight"] = t.state["font-weight"],
        this.state["font-style"] = t.state["font-style"],
        this.state["font-size"] = t.state["font-size"],
        this.state.scale = t.state.scale,
        this.attributes["font-family"] = t.attributes["font-family"],
        this.attributes["font-weight"] = t.attributes["font-weight"],
        this.attributes["font-style"] = t.attributes["font-style"],
        this.attributes["font-size"] = t.attributes["font-size"],
        this.attributes.fill = t.attributes.fill,
        this.attributes.stroke = t.attributes.stroke,
        this.attributes["stroke-width"] = t.attributes["stroke-width"],
        this.attributes["stroke-dasharray"] = t.attributes["stroke-dasharray"],
        this.shadow_attributes.width = t.shadow_attributes.width,
        this.shadow_attributes.color = t.shadow_attributes.color,
        this.lineWidth = t.lineWidth,
        this
    }
}
let U2 = null;
class O {
    static get Backends() {
        return {
            CANVAS: 1,
            RAPHAEL: 2,
            SVG: 3,
            VML: 4
        }
    }
    static get LineEndType() {
        return {
            NONE: 1,
            UP: 2,
            DOWN: 3
        }
    }
    static get USE_CANVAS_PROXY() {
        return !1
    }
    static get lastContext() {
        return U2
    }
    static set lastContext(t) {
        U2 = t
    }
    static buildContext(t, e, i, s, n) {
        const o = new O(t,e);
        i && s && o.resize(i, s),
        n || (n = "#FFF");
        const l = o.getContext();
        return l.setBackgroundFillStyle(n),
        O.lastContext = l,
        l
    }
    static getCanvasContext(t, e, i, s) {
        return O.buildContext(t, O.Backends.CANVAS, e, i, s)
    }
    static getRaphaelContext(t, e, i, s) {
        return O.buildContext(t, O.Backends.RAPHAEL, e, i, s)
    }
    static getSVGContext(t, e, i, s) {
        return O.buildContext(t, O.Backends.SVG, e, i, s)
    }
    static bolsterCanvasContext(t) {
        if (O.USE_CANVAS_PROXY)
            return new A1(t);
        const e = ["clear", "setFont", "setRawFont", "setFillStyle", "setBackgroundFillStyle", "setStrokeStyle", "setShadowColor", "setShadowBlur", "setLineWidth", "setLineCap", "setLineDash", "openGroup", "closeGroup", "getGroup"];
        return t.vexFlowCanvasContext = t,
        e.forEach(i=>{
            t[i] = t[i] || A1.prototype[i]
        }
        ),
        t
    }
    static drawDashedLine(t, e, i, s, n, o) {
        t.beginPath();
        const l = s - e
          , c = n - i
          , d = Math.atan2(c, l);
        let u = e
          , b = i;
        t.moveTo(e, i);
        let r = 0
          , h = !0;
        for (; !((l < 0 ? u <= s : u >= s) && (c < 0 ? b <= n : b >= n)); ) {
            const m = o[r++ % o.length]
              , _ = u + Math.cos(d) * m;
            u = l < 0 ? Math.max(s, _) : Math.min(s, _);
            const x = b + Math.sin(d) * m;
            b = c < 0 ? Math.max(n, x) : Math.min(n, x),
            h ? t.lineTo(u, b) : t.moveTo(u, b),
            h = !h
        }
        t.closePath(),
        t.stroke()
    }
    constructor(t, e) {
        if (this.elementId = t,
        !this.elementId)
            throw new f.RERR("BadArgument","Invalid id for renderer.");
        if (this.element = document.getElementById(t),
        this.element || (this.element = t),
        this.ctx = null,
        this.paper = null,
        this.backend = e,
        this.backend === O.Backends.CANVAS) {
            if (!this.element.getContext)
                throw new f.RERR("BadElement",`Can't get canvas context from element: ${t}`);
            this.ctx = O.bolsterCanvasContext(this.element.getContext("2d"))
        } else if (this.backend === O.Backends.RAPHAEL)
            this.ctx = new nt(this.element);
        else if (this.backend === O.Backends.SVG)
            this.ctx = new bt(this.element);
        else
            throw new f.RERR("InvalidBackend",`No support for backend: ${this.backend}`)
    }
    resize(t, e) {
        if (this.backend === O.Backends.CANVAS) {
            if (!this.element.getContext)
                throw new f.RERR("BadElement",`Can't get canvas context from element: ${this.elementId}`);
            [t,e] = A1.SanitizeCanvasDims(t, e);
            const i = window.devicePixelRatio || 1;
            this.element.width = t * i,
            this.element.height = e * i,
            this.element.style.width = t + "px",
            this.element.style.height = e + "px",
            this.ctx = O.bolsterCanvasContext(this.element.getContext("2d")),
            this.ctx.scale(i, i)
        } else
            this.ctx.resize(t, e);
        return this
    }
    getContext() {
        return this.ctx
    }
}
function ot(...a) {
    P.DEBUG && f.L("Vex.Flow.Stem", a)
}
class P extends X {
    static get CATEGORY() {
        return "stem"
    }
    static get UP() {
        return 1
    }
    static get DOWN() {
        return -1
    }
    static get WIDTH() {
        return y.STEM_WIDTH
    }
    static get HEIGHT() {
        return y.STEM_HEIGHT
    }
    constructor(t={}) {
        super();
        this.setAttribute("type", "Stem"),
        this.x_begin = t.x_begin || 0,
        this.x_end = t.x_end || 0,
        this.y_top = t.y_top || 0,
        this.y_bottom = t.y_bottom || 0,
        this.stem_extension = t.stem_extension || 0,
        this.stem_direction = t.stem_direction || 0,
        this.hide = t.hide || !1,
        this.isStemlet = t.isStemlet || !1,
        this.stemletHeight = t.stemletHeight || 0,
        this.renderHeightAdjustment = 0,
        this.setOptions(t)
    }
    setOptions(t) {
        this.stem_up_y_offset = t.stem_up_y_offset || 0,
        this.stem_down_y_offset = t.stem_down_y_offset || 0,
        this.stem_up_y_base_offset = t.stem_up_y_base_offset || 0,
        this.stem_down_y_base_offset = t.stem_down_y_base_offset || 0
    }
    setNoteHeadXBounds(t, e) {
        return this.x_begin = t,
        this.x_end = e,
        this
    }
    setDirection(t) {
        this.stem_direction = t
    }
    setExtension(t) {
        this.stem_extension = t
    }
    getExtension() {
        return this.stem_extension
    }
    setYBounds(t, e) {
        this.y_top = t,
        this.y_bottom = e
    }
    getCategory() {
        return P.CATEGORY
    }
    getHeight() {
        const t = this.stem_direction === P.UP ? this.stem_up_y_offset : this.stem_down_y_offset;
        return (this.y_bottom - this.y_top) * this.stem_direction + (P.HEIGHT - t + this.stem_extension) * this.stem_direction
    }
    getBoundingBox() {
        throw new f.RERR("NotImplemented","getBoundingBox() not implemented.")
    }
    getExtents() {
        const t = this.stem_direction === P.UP
          , e = [this.y_top, this.y_bottom]
          , i = P.HEIGHT + this.stem_extension
          , s = (t ? Math.min : Math.max)(...e)
          , n = (t ? Math.max : Math.min)(...e);
        return {
            topY: s + i * -this.stem_direction,
            baseY: n
        }
    }
    setVisibility(t) {
        return this.hide = !t,
        this
    }
    setStemlet(t, e) {
        return this.isStemlet = t,
        this.stemletHeight = e,
        this
    }
    draw() {
        if (this.setRendered(),
        this.hide)
            return;
        const t = this.checkContext();
        let e, i;
        const s = this.stem_direction;
        let n = 0;
        s === P.DOWN ? (e = this.x_begin,
        i = this.y_top + this.stem_down_y_offset,
        n = this.stem_down_y_base_offset) : (e = this.x_end,
        i = this.y_bottom - this.stem_up_y_offset,
        n = this.stem_up_y_base_offset);
        const o = this.getHeight();
        ot("Rendering stem - ", "Top Y: ", this.y_top, "Bottom Y: ", this.y_bottom);
        const l = this.isStemlet ? o - this.stemletHeight * this.stem_direction : 0;
        t.save(),
        this.applyStyle(t),
        t.beginPath(),
        t.setLineWidth(P.WIDTH),
        t.moveTo(e, i - l + n),
        t.lineTo(e, i - o - this.renderHeightAdjustment * s),
        t.stroke(),
        this.restoreStyle(t),
        t.restore()
    }
}
class e1 extends X {
    static get LOCATION_TOP() {
        return 1
    }
    static get LOCATION_BOTTOM() {
        return -1
    }
    static get NESTING_OFFSET() {
        return 15
    }
    constructor(t, e) {
        super();
        if (this.setAttribute("type", "Tuplet"),
        !t || !t.length)
            throw new f.RuntimeError("BadArguments","No notes provided for tuplet.");
        this.options = f.Merge({}, e),
        this.notes = t,
        this.num_notes = "num_notes"in this.options ? this.options.num_notes : t.length,
        this.options.beats_occupied && this.beatsOccupiedDeprecationWarning(),
        this.notes_occupied = this.options.notes_occupied || this.options.beats_occupied || 2,
        "bracketed"in this.options ? this.bracketed = this.options.bracketed : this.bracketed = t.some(i=>i.beam === null),
        this.ratioed = "ratioed"in this.options ? this.options.ratioed : Math.abs(this.notes_occupied - this.num_notes) > 1,
        this.point = this.musicFont.lookupMetric("digits.tupletPoint"),
        this.y_pos = 16,
        this.x_pos = 100,
        this.width = 200,
        this.location = this.options.location || e1.LOCATION_TOP,
        i1.AlignRestsToNotes(t, !0, !0),
        this.resolveGlyphs(),
        this.attach()
    }
    attach() {
        for (let t = 0; t < this.notes.length; t++)
            this.notes[t].setTuplet(this)
    }
    detach() {
        for (let t = 0; t < this.notes.length; t++)
            this.notes[t].resetTuplet(this)
    }
    setBracketed(t) {
        return this.bracketed = !!t,
        this
    }
    setRatioed(t) {
        return this.ratioed = !!t,
        this
    }
    setTupletLocation(t) {
        if (!t)
            t = e1.LOCATION_TOP;
        else if (t !== e1.LOCATION_TOP && t !== e1.LOCATION_BOTTOM)
            throw new f.RERR("BadArgument","Invalid tuplet location: " + t);
        return this.location = t,
        this
    }
    getNotes() {
        return this.notes
    }
    getNoteCount() {
        return this.num_notes
    }
    beatsOccupiedDeprecationWarning() {
        const t = ["beats_occupied has been deprecated as an ", "option for tuplets. Please use notes_occupied ", "instead. Calls to getBeatsOccupied and ", "setBeatsOccupied should now be routed to ", "getNotesOccupied and setNotesOccupied instead"].join("");
        console && console.warn ? console.warn(t) : console && console.log(t)
    }
    getBeatsOccupied() {
        return this.beatsOccupiedDeprecationWarning(),
        this.getNotesOccupied()
    }
    setBeatsOccupied(t) {
        return this.beatsOccupiedDeprecationWarning(),
        this.setNotesOccupied(t)
    }
    getNotesOccupied() {
        return this.notes_occupied
    }
    setNotesOccupied(t) {
        this.detach(),
        this.notes_occupied = t,
        this.resolveGlyphs(),
        this.attach()
    }
    resolveGlyphs() {
        this.numerator_glyphs = [];
        let t = this.num_notes;
        for (; t >= 1; )
            this.numerator_glyphs.unshift(new E("timeSig" + t % 10,this.point)),
            t = parseInt(t / 10, 10);
        for (this.denom_glyphs = [],
        t = this.notes_occupied; t >= 1; )
            this.denom_glyphs.unshift(new E("timeSig" + t % 10,this.point)),
            t = parseInt(t / 10, 10)
    }
    getNestedTupletCount() {
        const t = this.location
          , e = this.notes[0];
        let i = n(e, t)
          , s = n(e, t);
        function n(o, l) {
            return o.tupletStack.filter(c=>c.location === l).length
        }
        return this.notes.forEach(o=>{
            const l = n(o, t);
            i = l > i ? l : i,
            s = l < s ? l : s
        }
        ),
        i - s
    }
    getYPosition() {
        const t = this.getNestedTupletCount() * e1.NESTING_OFFSET * -this.location
          , e = this.options.y_offset || 0
          , i = this.notes[0];
        let s;
        if (this.location === e1.LOCATION_TOP) {
            s = i.getStave().getYForLine(0) - 15;
            for (let n = 0; n < this.notes.length; ++n) {
                const o = this.notes[n].getStemDirection() === P.UP ? this.notes[n].getStemExtents().topY - 10 : this.notes[n].getStemExtents().baseY - 20;
                o < s && (s = o)
            }
        } else {
            s = i.getStave().getYForLine(4) + 20;
            for (let n = 0; n < this.notes.length; ++n) {
                const o = this.notes[n].getStemDirection() === P.UP ? this.notes[n].getStemExtents().baseY + 20 : this.notes[n].getStemExtents().topY + 10;
                o > s && (s = o)
            }
        }
        return s + t + e
    }
    draw() {
        this.checkContext(),
        this.setRendered();
        const t = this.notes[0]
          , e = this.notes[this.notes.length - 1];
        this.bracketed ? (this.x_pos = t.getTieLeftX() - 5,
        this.width = e.getTieRightX() - this.x_pos + 5) : (this.x_pos = t.getStemX(),
        this.width = e.getStemX() - this.x_pos),
        this.y_pos = this.getYPosition();
        const i = (d,u)=>d + u.getMetrics().width;
        let s = this.numerator_glyphs.reduce(i, 0);
        this.ratioed && (s = this.denom_glyphs.reduce(i, s),
        s += this.point * .32);
        const o = this.x_pos + this.width / 2 - s / 2;
        if (this.bracketed) {
            const d = this.width / 2 - s / 2 - 5;
            d > 0 && (this.context.fillRect(this.x_pos, this.y_pos, d, 1),
            this.context.fillRect(this.x_pos + this.width / 2 + s / 2 + 5, this.y_pos, d, 1),
            this.context.fillRect(this.x_pos, this.y_pos + (this.location === e1.LOCATION_BOTTOM), 1, this.location * 10),
            this.context.fillRect(this.x_pos + this.width, this.y_pos + (this.location === e1.LOCATION_BOTTOM), 1, this.location * 10))
        }
        const l = this.musicFont.lookupMetric("digits.shiftY", 0);
        let c = 0;
        if (this.numerator_glyphs.forEach(d=>{
            d.render(this.context, o + c, this.y_pos + this.point / 3 - 2 + l),
            c += d.getMetrics().width
        }
        ),
        this.ratioed) {
            const d = o + c + this.point * .16
              , u = this.point * .06;
            this.context.beginPath(),
            this.context.arc(d, this.y_pos - this.point * .08, u, 0, Math.PI * 2, !0),
            this.context.closePath(),
            this.context.fill(),
            this.context.beginPath(),
            this.context.arc(d, this.y_pos + this.point * .12, u, 0, Math.PI * 2, !0),
            this.context.closePath(),
            this.context.fill(),
            c += this.point * .32,
            this.denom_glyphs.forEach(b=>{
                b.render(this.context, o + c, this.y_pos + this.point / 3 - 2 + l),
                c += b.getMetrics().width
            }
            )
        }
    }
}
function V2(a) {
    let t = 0;
    return a.forEach(e=>{
        e.keyProps && e.keyProps.forEach(i=>{
            t += i.line - 3
        }
        )
    }
    ),
    t >= 0 ? P.DOWN : P.UP
}
const rt = (a,t)=>{
    const e = a.getStemExtents().topY
      , i = a.getStemX()
      , s = t.getStemExtents().topY
      , n = t.getStemX();
    return (s - e) / (n - i)
}
  , d2 = "L"
  , at = "R"
  , $2 = "B";
class f1 extends X {
    static getDefaultBeamGroups(t) {
        (!t || t === "c") && (t = "4/4");
        const i = {
            "1/2": ["1/2"],
            "2/2": ["1/2"],
            "3/2": ["1/2"],
            "4/2": ["1/2"],
            "1/4": ["1/4"],
            "2/4": ["1/4"],
            "3/4": ["1/4"],
            "4/4": ["1/4"],
            "1/8": ["1/8"],
            "2/8": ["2/8"],
            "3/8": ["3/8"],
            "4/8": ["2/8"],
            "1/16": ["1/16"],
            "2/16": ["2/16"],
            "3/16": ["3/16"],
            "4/16": ["2/16"]
        }[t];
        if (i === void 0) {
            const s = parseInt(t.split("/")[0], 10)
              , n = parseInt(t.split("/")[1], 10);
            if (s % 3 == 0)
                return [new k(3,n)];
            if (n > 4)
                return [new k(2,n)];
            if (n <= 4)
                return [new k(1,n)]
        } else
            return i.map(s=>new k().parse(s));
        return [new k(1,4)]
    }
    static applyAndGetBeams(t, e, i) {
        return f1.generateBeams(t.getTickables(), {
            groups: i,
            stem_direction: e
        })
    }
    static generateBeams(t, e) {
        e || (e = {}),
        (!e.groups || !e.groups.length) && (e.groups = [new k(2,8)]);
        const i = e.groups.map(w=>{
            if (!w.multiply)
                throw new f.RuntimeError("InvalidBeamGroups","The beam groups must be an array of Vex.Flow.Fractions");
            return w.clone().multiply(y.RESOLUTION, 1)
        }
        )
          , s = t;
        let n = 0
          , o = []
          , l = [];
        function c(w) {
            return w.reduce((S,v)=>v.getTicks().clone().add(S), new k(0,1))
        }
        function d() {
            i.length - 1 > n ? n += 1 : n = 0
        }
        function u() {
            let w = [];
            s.forEach(S=>{
                if (w = [],
                S.shouldIgnoreTicks()) {
                    o.push(l),
                    l = w;
                    return
                }
                l.push(S);
                const v = i[n].clone()
                  , A = c(l)
                  , F = y.durationToNumber(S.duration) < 8;
                F && S.tuplet && (v.numerator *= 2),
                A.greaterThan(v) ? (F || w.push(l.pop()),
                o.push(l),
                l = w,
                d()) : A.equals(v) && (o.push(l),
                l = w,
                d())
            }
            ),
            l.length > 0 && o.push(l)
        }
        function b() {
            return o.filter(w=>{
                if (w.length > 1) {
                    let S = !0;
                    return w.forEach(v=>{
                        v.getIntrinsicTicks() >= y.durationToTicks("4") && (S = !1)
                    }
                    ),
                    S
                }
                return !1
            }
            )
        }
        function r() {
            const w = [];
            o.forEach(S=>{
                let v = [];
                S.forEach((A,F,C)=>{
                    const V = F === 0 || F === C.length - 1
                      , D = C[F - 1]
                      , W = !e.beam_rests && A.isRest()
                      , I = e.beam_rests && e.beam_middle_only && A.isRest() && V;
                    let G = !1;
                    if (e.maintain_stem_directions && D && !A.isRest() && !D.isRest()) {
                        const M1 = D.getStemDirection();
                        G = A.getStemDirection() !== M1
                    }
                    const t1 = parseInt(A.duration, 10) < 8;
                    W || I || G || t1 ? (v.length > 0 && w.push(v),
                    v = G ? [A] : []) : v.push(A)
                }
                ),
                v.length > 0 && w.push(v)
            }
            ),
            o = w
        }
        function h() {
            o.forEach(w=>{
                let S;
                if (e.maintain_stem_directions) {
                    const v = m(w);
                    S = v ? v.getStemDirection() : P.UP
                } else
                    e.stem_direction ? S = e.stem_direction : S = V2(w);
                _(w, S)
            }
            )
        }
        function m(w) {
            for (let S = 0; S < w.length; S++) {
                const v = w[S];
                if (!v.isRest())
                    return v
            }
            return !1
        }
        function _(w, S) {
            w.forEach(v=>{
                v.setStemDirection(S)
            }
            )
        }
        function x() {
            const w = [];
            return o.forEach(S=>{
                let v = null;
                S.forEach(A=>{
                    A.tuplet && v !== A.tuplet && (v = A.tuplet,
                    w.push(v))
                }
                )
            }
            ),
            w
        }
        u(),
        r(),
        h();
        const p = b()
          , g = x()
          , T = [];
        return p.forEach(w=>{
            const S = new f1(w);
            e.show_stemlets && (S.render_options.show_stemlets = !0),
            e.secondary_breaks && (S.render_options.secondary_break_ticks = y.durationToTicks(e.secondary_breaks)),
            e.flat_beams === !0 && (S.render_options.flat_beams = !0,
            S.render_options.flat_beam_offset = e.flat_beam_offset),
            T.push(S)
        }
        ),
        g.forEach(w=>{
            const S = w.notes[0].stem_direction === P.DOWN ? e1.LOCATION_BOTTOM : e1.LOCATION_TOP;
            w.setTupletLocation(S);
            let v = !1;
            for (let A = 0; A < w.notes.length; A++)
                if (w.notes[A].beam === null) {
                    v = !0;
                    break
                }
            w.setBracketed(v)
        }
        ),
        T
    }
    constructor(t, e) {
        super();

            throw new f.RuntimeError("BadArguments","No notes provided for beam.");
        if (t.length === 1)
            throw new f.RuntimeError("BadArguments","Too few notes for beam.");
        if (this.ticks = t[0].getIntrinsicTicks(),
        this.ticks >= y.durationToTicks("4"))
            throw new f.RuntimeError("BadArguments","Beams can only be applied to notes shorter than a quarter note.");
        let i, s;
        for (this.stem_direction = P.UP,
        i = 0; i < t.length; ++i)
            if (s = t[i],
            s.hasStem()) {
                this.stem_direction = s.getStemDirection();
                break
            }
        let n = this.stem_direction;
        for (e && t[0].getCategory() === "stavenotes" ? n = V2(t) : e && t[0].getCategory() === "tabnotes" && (n = t.reduce((l,c)=>l + c.stem_direction, 0) > -1 ? P.UP : P.DOWN),
        i = 0; i < t.length; ++i)
            s = t[i],
            e && (s.setStemDirection(n),
            this.stem_direction = n),
            s.setBeam(this);
        this.postFormatted = !1,
        this.notes = t,
        this.beam_count = this.getBeamCount(),
        this.break_on_indices = [],
        this.render_options = {
            beam_width: 5,
            max_slope: .25,
            min_slope: -.25,
            slope_iterations: 20,
            slope_cost: 100,
            show_stemlets: !1,
            stemlet_extension: 7,
            partial_beam_length: 10,
            flat_beams: !1,
            min_flat_beam_offset: 15
        }
    }
    getNotes() {
        return this.notes
    }
    getBeamCount() {
        return this.notes.map(i=>i.getGlyph().beam_count).reduce((i,s)=>s > i ? s : i)
    }
    breakSecondaryAt(t) {
        return this.break_on_indices = t,
        this
    }
    getSlopeY(t, e, i, s) {
        return i + (t - e) * s
    }
    calculateSlope() {
        const {notes: t, stem_direction: e, render_options: {max_slope: i, min_slope: s, slope_iterations: n, slope_cost: o}} = this
          , l = t[0]
          , c = rt(l, t[t.length - 1])
          , d = (i - s) / n;
        let u = Number.MAX_VALUE
          , b = 0
          , r = 0;
        for (let h = s; h <= i; h += d) {
            let m = 0
              , _ = 0;
            for (let T = 1; T < t.length; ++T) {
                const w = t[T]
                  , S = this.getSlopeY(w.getStemX(), l.getStemX(), l.getStemExtents().topY, h) + _
                  , v = w.getStemExtents().topY;
                if (v * e < S * e) {
                    const A = Math.abs(v - S);
                    _ += A * -e,
                    m += A * T
                } else
                    m += (v - S) * e
            }
            const x = c / 2
              , p = Math.abs(x - h)
              , g = o * p + Math.abs(m);
            g < u && (u = g,
            b = h,
            r = _)
        }
        this.slope = b,
        this.y_shift = r
    }
    calculateFlatSlope() {
        const {notes: t, stem_direction: e, render_options: {beam_width: i, min_flat_beam_offset: s, flat_beam_offset: n}} = this;
        let o = 0
          , l = 0
          , c = 0
          , d = 0;
        for (let m = 0; m < t.length; m++) {
            const _ = t[m]
              , x = _.getStemExtents().topY;
            o += x,
            e === P.DOWN && d < x ? (d = x,
            l = Math.max(..._.getYs()),
            c = _.getBeamCount()) : e === P.UP && (d === 0 || d > x) && (d = x,
            l = Math.min(..._.getYs()),
            c = _.getBeamCount())
        }
        let u = o / t.length;
        const b = i * 1.5
          , r = s + c * b
          , h = l + r * -e;
        e === P.DOWN && u < h ? u = l + r : e === P.UP && u > h && (u = l - r),
        n ? e === P.DOWN && u > n ? this.render_options.flat_beam_offset = u : e === P.UP && u < n && (this.render_options.flat_beam_offset = u) : this.render_options.flat_beam_offset = u,
        this.slope = 0,
        this.y_shift = 0
    }
    getBeamYToDraw() {
        let i = this.notes[0].getStemExtents().topY;
        return this.render_options.flat_beams && this.render_options.flat_beam_offset && (i = this.render_options.flat_beam_offset),
        i
    }
    applyStemExtensions() {
        const {notes: t, slope: e, y_shift: i, stem_direction: s, beam_count: n, render_options: {show_stemlets: o, stemlet_extension: l, beam_width: c}} = this
          , d = t[0]
          , u = this.getBeamYToDraw()
          , b = d.getStemX();
        for (let r = 0; r < t.length; ++r) {
            const h = t[r]
              , m = h.getStemX()
              , {topY: _} = h.getStemExtents()
              , x = this.getSlopeY(m, b, u, e) + i
              , p = h.getStem().getExtension()
              , g = s === P.UP ? _ - x : x - _;
            if (h.stem.setExtension(p + g),
            h.stem.renderHeightAdjustment = -P.WIDTH / 2,
            h.isRest() && o) {
                const T = c
                  , w = (n - 1) * T * 1.5 + T;
                h.stem.setVisibility(!0).setStemlet(!0, w + l)
            }
        }
    }
    lookupBeamDirection(t, e, i, s) {
        if (t === "4")
            return d2;
        const n = `${y.durationToNumber(t) / 2}`
          , o = e < y.durationToTicks(n)
          , l = s < y.durationToTicks(n)
          , c = i < y.durationToTicks(n);
        return o && l && c ? $2 : o && !l && c ? d2 : !o && l && c ? at : this.lookupBeamDirection(n, e, i, s)
    }
    getBeamLines(t) {
        const e = y.durationToTicks(t)
          , i = [];
        let s = !1
          , n = null;
        const o = this.render_options.partial_beam_length;
        let l = !1
          , c = 0;
        for (let u = 0; u < this.notes.length; ++u) {
            const b = this.notes[u];
            c += b.ticks.value();
            let h = !1;
            parseInt(t, 10) >= 8 && (h = this.break_on_indices.indexOf(u) !== -1,
            this.render_options.secondary_break_ticks && c >= this.render_options.secondary_break_ticks && (c = 0,
            h = !0));
            const m = b.getIntrinsicTicks() < e
              , _ = b.getStemX() - P.WIDTH / 2
              , x = this.notes[u - 1]
              , p = this.notes[u + 1]
              , g = p && p.getIntrinsicTicks() < e
              , T = x && x.getIntrinsicTicks() < e
              , w = x && p && m && !T && !g;
            if (m)
                if (s)
                    n = i[i.length - 1],
                    n.end = _,
                    h && (s = !1,
                    p && !g && n.end === null && (n.end = n.start - o));
                else {
                    if (n = {
                        start: _,
                        end: null
                    },
                    s = !0,
                    w) {
                        const S = x.getIntrinsicTicks()
                          , v = p.getIntrinsicTicks()
                          , A = b.getIntrinsicTicks()
                          , F = this.lookupBeamDirection(t, S, A, v);
                        [d2, $2].includes(F) ? n.end = n.start - o : n.end = n.start + o
                    } else
                        g ? h && (n.end = n.start - o,
                        s = !1) : (l || u === 0) && p ? n.end = n.start + o : n.end = n.start - o;
                    i.push(n)
                }
            else
                s = !1;
            l = h
        }
        const d = i[i.length - 1];
        return d && d.end === null && (d.end = d.start - o),
        i
    }
    drawStems() {
        this.notes.forEach(t=>{
            t.getStem() && t.getStem().setContext(this.context).draw()
        }
        , this)
    }
    drawBeamLines() {
        this.checkContext();
        const t = ["4", "8", "16", "32", "64"]
          , e = this.notes[0];
        let i = this.getBeamYToDraw();
        const s = e.getStemX()
          , n = this.render_options.beam_width * this.stem_direction;
        for (let o = 0; o < t.length; ++o) {
            const l = t[o]
              , c = this.getBeamLines(l);
            for (let d = 0; d < c.length; ++d) {
                const u = c[d]
                  , b = u.start
                  , r = this.getSlopeY(b, s, i, this.slope)
                  , h = u.end
                  , m = this.getSlopeY(h, s, i, this.slope);
                this.context.beginPath(),
                this.context.moveTo(b, r),
                this.context.lineTo(b, r + n),
                this.context.lineTo(h + 1, m + n),
                this.context.lineTo(h + 1, m),
                this.context.closePath(),
                this.context.fill()
            }
            i += n * 1.5
        }
    }
    preFormat() {
        return this
    }
    postFormat() {
        this.postFormatted || (this.notes[0].getCategory() === "tabnotes" || this.render_options.flat_beams ? this.calculateFlatSlope() : this.calculateSlope(),
        this.applyStemExtensions(),
        this.postFormatted = !0)
    }
    draw() {
        this.checkContext(),
        this.setRendered(),
        !this.unbeamable && (this.postFormatted || this.postFormat(),
        this.drawStems(),
        this.applyStyle(),
        this.drawBeamLines(),
        this.restoreStyle())
    }
}
class $ extends X {
    static get Mode() {
        return {
            STRICT: 1,
            SOFT: 2,
            FULL: 3
        }
    }
    constructor(t, e) {
        super();
        if (this.setAttribute("type", "Voice"),
        this.options = R({
            softmaxFactor: 100
        }, e),
        typeof t == "string") {
            const i = t.match(/(\d+)\/(\d+)/);
            i && (t = {
                num_beats: i[1],
                beat_value: i[2],
                resolution: y.RESOLUTION
            })
        }
        this.time = f.Merge({
            num_beats: 4,
            beat_value: 4,
            resolution: y.RESOLUTION
        }, t),
        this.totalTicks = new k(this.time.num_beats * (this.time.resolution / this.time.beat_value),1),
        this.resolutionMultiplier = 1,
        this.tickables = [],
        this.ticksUsed = new k(0,1),
        this.smallestTickCount = this.totalTicks.clone(),
        this.largestTickWidth = 0,
        this.stave = null,
        this.mode = $.Mode.STRICT,
        this.voiceGroup = null
    }
    getTotalTicks() {
        return this.totalTicks
    }
    getTicksUsed() {
        return this.ticksUsed
    }
    getLargestTickWidth() {
        return this.largestTickWidth
    }
    getSmallestTickCount() {
        return this.smallestTickCount
    }
    getTickables() {
        return this.tickables
    }
    getMode() {
        return this.mode
    }
    setMode(t) {
        return this.mode = t,
        this
    }
    getResolutionMultiplier() {
        return this.resolutionMultiplier
    }
    getActualResolution() {
        return this.resolutionMultiplier * this.time.resolution
    }
    setStave(t) {
        return this.stave = t,
        this.boundingBox = null,
        this
    }
    getBoundingBox() {
        let t, e, i, s;
        if (!this.boundingBox) {
            if (!this.stave)
                throw new f.RERR("NoStave","Can't get bounding box without stave.");
            for (t = this.stave,
            e = null,
            s = 0; s < this.tickables.length; ++s)
                this.tickables[s].setStave(t),
                i = this.tickables[s].getBoundingBox(),
                !!i && (e = e ? e.mergeWith(i) : i);
            this.boundingBox = e
        }
        return this.boundingBox
    }
    getVoiceGroup() {
        if (!this.voiceGroup)
            throw new f.RERR("NoVoiceGroup","No voice group for voice.");
        return this.voiceGroup
    }
    setVoiceGroup(t) {
        return this.voiceGroup = t,
        this
    }
    setStrict(t) {
        return this.mode = t ? $.Mode.STRICT : $.Mode.SOFT,
        this
    }
    isComplete() {
        return this.mode === $.Mode.STRICT || this.mode === $.Mode.FULL ? this.ticksUsed.equals(this.totalTicks) : !0
    }
    setSoftmaxFactor(t) {
        return this.options.softmaxFactor = t,
        this
    }
    reCalculateExpTicksUsed() {
        const t = this.ticksUsed.value()
          , e = i=>Math.pow(this.options.softmaxFactor, i.getTicks().value() / t);
        return this.expTicksUsed = this.tickables.map(e).reduce((i,s)=>i + s),
        this.expTicksUsed
    }
    softmax(t) {
        this.expTicksUsed || this.reCalculateExpTicksUsed();
        const e = this.ticksUsed.value();
        return (s=>Math.pow(this.options.softmaxFactor, s / e))(t) / this.expTicksUsed
    }
    addTickable(t) {
        if (!t.shouldIgnoreTicks()) {
            const e = t.getTicks();
            if (this.ticksUsed.add(e),
            (this.mode === $.Mode.STRICT || this.mode === $.Mode.FULL) && this.ticksUsed.greaterThan(this.totalTicks))
                throw this.ticksUsed.subtract(e),
                new f.RERR("BadArgument","Too many ticks.");
            e.lessThan(this.smallestTickCount) && (this.smallestTickCount = e.clone()),
            this.resolutionMultiplier = this.ticksUsed.denominator,
            this.totalTicks.add(0, this.ticksUsed.denominator)
        }
        return this.tickables.push(t),
        t.setVoice(this),
        this
    }
    addTickables(t) {
        for (let e = 0; e < t.length; ++e)
            this.addTickable(t[e]);
        return this
    }
    preFormat() {
        return this.preFormatted ? this : (this.tickables.forEach(t=>{
            t.getStave() || t.setStave(this.stave)
        }
        ),
        this.preFormatted = !0,
        this)
    }
    draw(t=this.context, e=this.stave) {
        this.setRendered();
        let i = null;
        for (let s = 0; s < this.tickables.length; ++s) {
            const n = this.tickables[s];
            if (e && n.setStave(e),
            !n.getStave())
                throw new f.RuntimeError("MissingStave","The voice cannot draw tickables without staves.");
            if (s === 0 && (i = n.getBoundingBox()),
            s > 0 && i) {
                const o = n.getBoundingBox();
                o && i.mergeWith(o)
            }
            n.setContext(t),
            n.drawWithStyle()
        }
        this.boundingBox = i
    }
}
function j2(a, t, e, i, s) {
    if (t !== N.type.BOLD_DOUBLE_LEFT && t !== N.type.BOLD_DOUBLE_RIGHT)
        throw new f.RERR("InvalidConnector","A REPEAT_BEGIN or REPEAT_END type must be provided.");
    let n = 3
      , o = 3.5;
    const l = 2;
    t === N.type.BOLD_DOUBLE_RIGHT && (n = -5,
    o = 3),
    a.fillRect(e + n, i, 1, s - i),
    a.fillRect(e - l, i, o, s - i)
}
class N extends X {
    static get type() {
        return {
            SINGLE_RIGHT: 0,
            SINGLE_LEFT: 1,
            SINGLE: 1,
            DOUBLE: 2,
            BRACE: 3,
            BRACKET: 4,
            BOLD_DOUBLE_LEFT: 5,
            BOLD_DOUBLE_RIGHT: 6,
            THIN_DOUBLE: 7,
            NONE: 8
        }
    }
    static get typeString() {
        return {
            singleRight: N.type.SINGLE_RIGHT,
            singleLeft: N.type.SINGLE_LEFT,
            single: N.type.SINGLE,
            double: N.type.DOUBLE,
            brace: N.type.BRACE,
            bracket: N.type.BRACKET,
            boldDoubleLeft: N.type.BOLD_DOUBLE_LEFT,
            boldDoubleRight: N.type.BOLD_DOUBLE_RIGHT,
            thinDouble: N.type.THIN_DOUBLE,
            none: N.type.NONE
        }
    }
    constructor(t, e) {
        super();
        this.setAttribute("type", "StaveConnector"),
        this.thickness = y.STAVE_LINE_THICKNESS,
        this.width = 3,
        this.top_stave = t,
        this.bottom_stave = e,
        this.type = N.type.DOUBLE,
        this.font = {
            family: "times",
            size: 16,
            weight: "normal"
        },
        this.x_shift = 0,
        this.texts = []
    }
    setType(t) {
        return t = typeof t == "string" ? N.typeString[t] : t,
        t >= N.type.SINGLE_RIGHT && t <= N.type.NONE && (this.type = t),
        this
    }
    setText(t, e) {
        return this.texts.push({
            content: t,
            options: f.Merge({
                shift_x: 0,
                shift_y: 0
            }, e)
        }),
        this
    }
    setFont(t) {
        f.Merge(this.font, t)
    }
    setXShift(t) {
        if (typeof t != "number")
            throw f.RERR("InvalidType", "x_shift must be a Number");
        return this.x_shift = t,
        this
    }
    draw() {
        const t = this.checkContext();
        this.setRendered();
        let e = this.top_stave.getYForLine(0)
          , i = this.bottom_stave.getYForLine(this.bottom_stave.getNumLines() - 1) + this.thickness
          , s = this.width
          , n = this.top_stave.getX();
        (this.type === N.type.SINGLE_RIGHT || this.type === N.type.BOLD_DOUBLE_RIGHT || this.type === N.type.THIN_DOUBLE) && (n = this.top_stave.getX() + this.top_stave.width);
        let l = i - e;
        switch (this.type) {
        case N.type.SINGLE:
            s = 1;
            break;
        case N.type.SINGLE_LEFT:
            s = 1;
            break;
        case N.type.SINGLE_RIGHT:
            s = 1;
            break;
        case N.type.DOUBLE:
            n -= this.width + 2,
            e -= this.thickness,
            l += .5;
            break;
        case N.type.BRACE:
            {
                s = 12;
                const c = this.top_stave.getX() - 2 + this.x_shift
                  , d = e
                  , u = c
                  , b = i
                  , r = c - s
                  , h = d + l / 2
                  , m = r - .9 * s
                  , _ = d + .2 * l
                  , x = c + 1.1 * s
                  , p = h - .135 * l
                  , g = x
                  , T = h + .135 * l
                  , w = m
                  , S = b - .2 * l
                  , v = r - s
                  , A = S
                  , F = c + .4 * s
                  , C = h + .135 * l
                  , V = F
                  , D = h - .135 * l
                  , W = v
                  , I = _;
                t.beginPath(),
                t.moveTo(c, d),
                t.bezierCurveTo(m, _, x, p, r, h),
                t.bezierCurveTo(g, T, w, S, u, b),
                t.bezierCurveTo(v, A, F, C, r, h),
                t.bezierCurveTo(V, D, W, I, c, d),
                t.fill(),
                t.stroke();
                break
            }
        case N.type.BRACKET:
            e -= 6,
            i += 6,
            l = i - e,
            E.renderGlyph(t, n - 5, e, 40, "bracketTop"),
            E.renderGlyph(t, n - 5, i, 40, "bracketBottom"),
            n -= this.width + 2;
            break;
        case N.type.BOLD_DOUBLE_LEFT:
            j2(t, this.type, n + this.x_shift, e, i - this.thickness);
            break;
        case N.type.BOLD_DOUBLE_RIGHT:
            j2(t, this.type, n, e, i - this.thickness);
            break;
        case N.type.THIN_DOUBLE:
            s = 1,
            l -= this.thickness;
            break;
        case N.type.NONE:
            break;
        default:
            throw new f.RERR("InvalidType",`The provided StaveConnector.type (${this.type}) is invalid`)
        }
        this.type !== N.type.BRACE && this.type !== N.type.BOLD_DOUBLE_LEFT && this.type !== N.type.BOLD_DOUBLE_RIGHT && this.type !== N.type.NONE && t.fillRect(n, e, s, l),
        this.type === N.type.THIN_DOUBLE && t.fillRect(n - 3, e, s, l),
        t.save(),
        t.lineWidth = 2,
        t.setFont(this.font.family, this.font.size, this.font.weight);
        for (let c = 0; c < this.texts.length; c++) {
            const d = this.texts[c]
              , u = t.measureText("" + d.content).width
              , b = this.top_stave.getX() - u - 24 + d.options.shift_x
              , r = (this.top_stave.getYForLine(0) + this.bottom_stave.getBottomLineY()) / 2 + d.options.shift_y;
            t.fillText("" + d.content, b, r + 4)
        }
        t.restore()
    }
}
class K2 extends X {
    constructor() {
        super();
        this.setAttribute("type", "Tickable"),
        this.ticks = new k(0,1),
        this.intrinsicTicks = 0,
        this.tickMultiplier = new k(1,1),
        this.width = 0,
        this.x_shift = 0,
        this.voice = null,
        this.tickContext = null,
        this.modifierContext = null,
        this.modifiers = [],
        this.preFormatted = !1,
        this.postFormatted = !1,
        this.tuplet = null,
        this.tupletStack = [],
        this.align_center = !1,
        this.center_x_shift = 0,
        this.ignore_ticks = !1,
        this.formatterMetrics = {
            freedom: {
                left: 0,
                right: 0
            },
            duration: "",
            iterations: 0,
            space: {
                used: 0,
                mean: 0,
                deviation: 0
            }
        }
    }
    reset() {
        return this
    }
    getTicks() {
        return this.ticks
    }
    shouldIgnoreTicks() {
        return this.ignore_ticks
    }
    setWidth(t) {
        this.width = t
    }
    getWidth() {
        if (!this.preFormatted)
            throw new f.RERR("UnformattedNote","Can't call GetWidth on an unformatted note.");
        return this.width + (this.modifierContext ? this.modifierContext.getWidth() : 0)
    }
    setXShift(t) {
        return this.x_shift = t,
        this
    }
    getXShift() {
        return this.x_shift
    }
    getX() {
        if (!this.tickContext)
            throw new f.RERR("NoTickContext","Note needs a TickContext assigned for an X-Value");
        return this.tickContext.getX() + this.x_shift
    }
    getFormatterMetrics() {
        return this.formatterMetrics
    }
    getCenterXShift() {
        return this.isCenterAligned() ? this.center_x_shift : 0
    }
    isCenterAligned() {
        return this.align_center
    }
    setCenterAlignment(t) {
        return this.align_center = t,
        this
    }
    getVoice() {
        if (!this.voice)
            throw new f.RERR("NoVoice","Tickable has no voice.");
        return this.voice
    }
    setVoice(t) {
        this.voice = t
    }
    getTuplet() {
        return this.tuplet
    }
    resetTuplet(t) {
        let e, i;
        if (t) {
            const s = this.tupletStack.indexOf(t);
            return s !== -1 && (this.tupletStack.splice(s, 1),
            e = t.getNoteCount(),
            i = t.getNotesOccupied(),
            this.applyTickMultiplier(e, i)),
            this
        }
        for (; this.tupletStack.length; )
            t = this.tupletStack.pop(),
            e = t.getNoteCount(),
            i = t.getNotesOccupied(),
            this.applyTickMultiplier(e, i);
        return this
    }
    setTuplet(t) {
        if (t) {
            this.tupletStack.push(t);
            const e = t.getNoteCount()
              , i = t.getNotesOccupied();
            this.applyTickMultiplier(i, e)
        }
        return this.tuplet = t,
        this
    }
    addToModifierContext(t) {
        this.modifierContext = t,
        this.preFormatted = !1
    }
    addModifier(t) {
        return this.modifiers.push(t),
        this.preFormatted = !1,
        this
    }
    getModifiers() {
        return this.modifiers
    }
    setTickContext(t) {
        this.tickContext = t,
        this.preFormatted = !1
    }
    preFormat() {
        this.preFormatted || (this.width = 0,
        this.modifierContext && (this.modifierContext.preFormat(),
        this.width += this.modifierContext.getWidth()))
    }
    postFormat() {
        return this.postFormatted ? this : (this.postFormatted = !0,
        this)
    }
    getIntrinsicTicks() {
        return this.intrinsicTicks
    }
    setIntrinsicTicks(t) {
        this.intrinsicTicks = t,
        this.ticks = this.tickMultiplier.clone().multiply(this.intrinsicTicks)
    }
    getTickMultiplier() {
        return this.tickMultiplier
    }
    applyTickMultiplier(t, e) {
        this.tickMultiplier.multiply(t, e),
        this.ticks = this.tickMultiplier.clone().multiply(this.intrinsicTicks)
    }
    setDuration(t) {
        const e = t.numerator * (y.RESOLUTION / t.denominator);
        this.ticks = this.tickMultiplier.clone().multiply(e),
        this.intrinsicTicks = this.ticks.value()
    }
}
class J extends K2 {
    static get CATEGORY() {
        return "note"
    }
    static plotMetrics(t, e, i) {
        const s = e.getMetrics()
          , n = e.getAbsoluteX() - s.modLeftPx - s.leftDisplacedHeadPx
          , o = e.getAbsoluteX() - s.leftDisplacedHeadPx
          , l = e.getAbsoluteX()
          , c = e.getAbsoluteX() + s.notePx
          , d = e.getAbsoluteX() + s.notePx + s.rightDisplacedHeadPx
          , u = e.getAbsoluteX() + s.notePx + s.rightDisplacedHeadPx + s.modRightPx
          , b = u + (e.getFormatterMetrics().freedom.right || 0)
          , r = u - n;
        t.save(),
        t.setFont("Arial", 8, ""),
        t.fillText(Math.round(r) + "px", n + e.getXShift(), i);
        const h = i + 7;
        function m(x, p, g, T=h) {
            t.beginPath(),
            t.setStrokeStyle(g),
            t.setFillStyle(g),
            t.setLineWidth(3),
            t.moveTo(x + e.getXShift(), T),
            t.lineTo(p + e.getXShift(), T),
            t.stroke()
        }
        m(n, o, "red"),
        m(o, l, "#999"),
        m(l, c, "green"),
        m(c, d, "#999"),
        m(d, u, "red"),
        m(u, b, "#DD0"),
        m(n - e.getXShift(), n, "#BBB"),
        f.drawDot(t, l + e.getXShift(), h, "blue");
        const _ = e.getFormatterMetrics();
        if (_.iterations > 0) {
            const x = _.space.deviation
              , p = x >= 0 ? "+" : "";
            t.setFillStyle("red"),
            t.fillText(p + Math.round(x), l + e.getXShift(), i - 10)
        }
        t.restore()
    }
    static parseDuration(t) {
        if (typeof t != "string")
            return null;
        const i = /(\d*\/?\d+|[a-z])(d*)([nrhms]|$)/.exec(t);
        if (!i)
            return null;
        const s = i[1]
          , n = i[2].length
          , o = i[3] || "n";
        return {
            duration: s,
            dots: n,
            type: o
        }
    }
    static parseNoteStruct(t) {
        const e = t.duration
          , i = []
          , s = J.parseDuration(e);
        if (!s)
            return null;
        let n = t.type;
        if (n && !y.getGlyphProps.validTypes[n])
            return null;
        n || (n = s.type || "n",
        t.keys !== void 0 && t.keys.forEach((d,u)=>{
            const b = d.split("/");
            i[u] = b && b.length === 3 ? b[2] : n
        }
        ));
        let o = y.durationToTicks(s.duration);
        if (o == null)
            return null;
        const l = t.dots ? t.dots : s.dots;
        if (typeof l != "number")
            return null;
        let c = o;
        for (let d = 0; d < l; d++) {
            if (c <= 1)
                return null;
            c = c / 2,
            o += c
        }
        return {
            duration: s.duration,
            type: n,
            customTypes: i,
            dots: l,
            ticks: o
        }
    }
    constructor(t) {
        super();
        if (this.setAttribute("type", "Note"),
        !t)
            throw new f.RuntimeError("BadArguments","Note must have valid initialization data to identify duration and type.");
        const e = J.parseNoteStruct(t);
        if (!e)
            throw new f.RuntimeError("BadArguments",`Invalid note initialization object: ${JSON.stringify(t)}`);
        if (this.duration = e.duration,
        this.dots = e.dots,
        this.noteType = e.type,
        this.customTypes = e.customTypes,
        t.duration_override ? this.setDuration(t.duration_override) : this.setIntrinsicTicks(e.ticks),
        this.modifiers = [],
        this.glyph = y.getGlyphProps(this.duration, this.noteType),
        this.customGlyphs = this.customTypes.map(i=>y.getGlyphProps(this.duration, i)),
        this.positions && (typeof this.positions != "object" || !this.positions.length))
            throw new f.RuntimeError("BadArguments","Note keys must be array type.");
        this.playNote = null,
        this.tickContext = null,
        this.modifierContext = null,
        this.ignore_ticks = !1,
        this.width = 0,
        this.leftDisplacedHeadPx = 0,
        this.rightDisplacedHeadPx = 0,
        this.x_shift = 0,
        this.voice = null,
        this.preFormatted = !1,
        this.ys = [],
        t.align_center && this.setCenterAlignment(t.align_center),
        this.stave = null,
        this.render_options = {
            annotation_spacing: 5
        }
    }
    getPlayNote() {
        return this.playNote
    }
    setPlayNote(t) {
        return this.playNote = t,
        this
    }
    isRest() {
        return !1
    }
    addStroke(t, e) {
        return e.setNote(this),
        e.setIndex(t),
        this.modifiers.push(e),
        this.setPreFormatted(!1),
        this
    }
    getStave() {
        return this.stave
    }
    setStave(t) {
        return this.stave = t,
        this.setYs([t.getYForLine(0)]),
        this.context = this.stave.context,
        this
    }
    getCategory() {
        return J.CATEGORY
    }
    setContext(t) {
        return this.context = t,
        this
    }
    getLeftDisplacedHeadPx() {
        return this.leftDisplacedHeadPx
    }
    getRightDisplacedHeadPx() {
        return this.rightDisplacedHeadPx
    }
    setLeftDisplacedHeadPx(t) {
        return this.leftDisplacedHeadPx = t,
        this
    }
    setRightDisplacedHeadPx(t) {
        return this.rightDisplacedHeadPx = t,
        this
    }
    shouldIgnoreTicks() {
        return this.ignore_ticks
    }
    getLineNumber() {
        return 0
    }
    getLineForRest() {
        return 0
    }
    getGlyph() {
        return this.glyph
    }
    getGlyphWidth() {
        if (this.glyph) {
            if (this.glyph.getMetrics)
                return this.glyph.getMetrics().width;
            if (this.glyph.getWidth)
                return this.glyph.getWidth(this.render_options.glyph_font_scale)
        }
        return 0
    }
    setYs(t) {
        return this.ys = t,
        this
    }
    getYs() {
        if (this.ys.length === 0)
            throw new f.RERR("NoYValues","No Y-values calculated for this note.");
        return this.ys
    }
    getYForTopText(t) {
        if (!this.stave)
            throw new f.RERR("NoStave","No stave attached to this note.");
        return this.stave.getYForTopText(t)
    }
    getBoundingBox() {
        return null
    }
    getVoice() {
        if (!this.voice)
            throw new f.RERR("NoVoice","Note has no voice.");
        return this.voice
    }
    setVoice(t) {
        return this.voice = t,
        this.preFormatted = !1,
        this
    }
    getTickContext() {
        return this.tickContext
    }
    setTickContext(t) {
        return this.tickContext = t,
        this.preFormatted = !1,
        this
    }
    getDuration() {
        return this.duration
    }
    isDotted() {
        return this.dots > 0
    }
    hasStem() {
        return !1
    }
    getDots() {
        return this.dots
    }
    getNoteType() {
        return this.noteType
    }
    setBeam() {
        return this
    }
    setModifierContext(t) {
        return this.modifierContext = t,
        this
    }
    addModifier(t, e=0) {
        return t.setNote(this),
        t.setIndex(e),
        this.modifiers.push(t),
        this.setPreFormatted(!1),
        this
    }
    getModifierStartXY() {
        if (!this.preFormatted)
            throw new f.RERR("UnformattedNote","Can't call GetModifierStartXY on an unformatted note");
        return {
            x: this.getAbsoluteX(),
            y: this.ys[0]
        }
    }
    getMetrics() {
        if (!this.preFormatted)
            throw new f.RERR("UnformattedNote","Can't call getMetrics on an unformatted note.");
        const t = this.modifierContext ? this.modifierContext.state.left_shift : 0
          , e = this.modifierContext ? this.modifierContext.state.right_shift : 0
          , i = this.getWidth()
          , s = this.getGlyphWidth()
          , n = i - t - e - this.leftDisplacedHeadPx - this.rightDisplacedHeadPx;
        return {
            width: i,
            glyphWidth: s,
            notePx: n,
            modLeftPx: t,
            modRightPx: e,
            leftDisplacedHeadPx: this.leftDisplacedHeadPx,
            rightDisplacedHeadPx: this.rightDisplacedHeadPx
        }
    }
    getAbsoluteX() {
        if (!this.tickContext)
            throw new f.RERR("NoTickContext","Note needs a TickContext assigned for an X-Value");
        let t = this.tickContext.getX();
        return this.stave && (t += this.stave.getNoteStartX() + this.musicFont.lookupMetric("stave.padding")),
        this.isCenterAligned() && (t += this.getCenterXShift()),
        t
    }
    setPreFormatted(t) {
        this.preFormatted = t
    }
}
function lt(...a) {
    k1.DEBUG && f.L("Vex.Flow.NoteHead", a)
}
function ht(a, t, e, i, s, n) {
    const o = y.SLASH_NOTEHEAD_WIDTH;
    a.save(),
    a.setLineWidth(y.STEM_WIDTH);
    let l = !1;
    if (y.durationToNumber(t) > 2 && (l = !0),
    l || (e -= y.STEM_WIDTH / 2 * s),
    a.beginPath(),
    a.moveTo(e, i + n),
    a.lineTo(e, i + 1),
    a.lineTo(e + o, i - n),
    a.lineTo(e + o, i),
    a.lineTo(e, i + n),
    a.closePath(),
    l ? a.fill() : a.stroke(),
    y.durationToFraction(t).equals(.5)) {
        const c = [-3, -1, o + 1, o + 3];
        for (let d = 0; d < c.length; d++)
            a.beginPath(),
            a.moveTo(e + c[d], i - 10),
            a.lineTo(e + c[d], i + 11),
            a.stroke()
    }
    a.restore()
}
class k1 extends J {
    static get CATEGORY() {
        return "notehead"
    }
    constructor(t) {
        super(t);
        if (this.setAttribute("type", "NoteHead"),
        this.index = t.index,
        this.x = t.x || 0,
        this.y = t.y || 0,
        this.note_type = t.note_type,
        this.duration = t.duration,
        this.displaced = t.displaced || !1,
        this.stem_direction = t.stem_direction || H.STEM_UP,
        this.line = t.line,
        this.glyph = y.getGlyphProps(this.duration, this.note_type),
        !this.glyph)
            throw new f.RuntimeError("BadArguments",`No glyph found for duration '${this.duration}' and type '${this.note_type}'`);
        this.glyph_code = this.glyph.code_head,
        this.x_shift = t.x_shift || 0,
        t.custom_glyph_code && (this.custom_glyph = !0,
        this.glyph_code = t.custom_glyph_code,
        this.stem_up_x_offset = t.stem_up_x_offset || 0,
        this.stem_down_x_offset = t.stem_down_x_offset || 0),
        this.style = t.style,
        this.slashed = t.slashed,
        f.Merge(this.render_options, {
            glyph_font_scale: t.glyph_font_scale || y.DEFAULT_NOTATION_FONT_SCALE,
            stroke_px: 3
        }),
        this.setWidth(this.glyph.getWidth(this.render_options.glyph_font_scale))
    }
    getCategory() {
        return k1.CATEGORY
    }
    getWidth() {
        return this.width
    }
    isDisplaced() {
        return this.displaced === !0
    }
    getGlyph() {
        return this.glyph
    }
    setX(t) {
        return this.x = t,
        this
    }
    getY() {
        return this.y
    }
    setY(t) {
        return this.y = t,
        this
    }
    getLine() {
        return this.line
    }
    setLine(t) {
        return this.line = t,
        this
    }
    getAbsoluteX() {
        const t = this.preFormatted ? super.getAbsoluteX() : this.x
          , e = P.WIDTH / 2
          , i = this.musicFont.lookupMetric("notehead.shiftX", 0) * this.stem_direction
          , s = this.musicFont.lookupMetric("noteHead.displaced.shiftX", 0) * this.stem_direction;
        return t + i + (this.displaced ? (this.width - e) * this.stem_direction + s : 0)
    }
    getBoundingBox() {
        if (!this.preFormatted)
            throw new f.RERR("UnformattedNote","Can't call getBoundingBox on an unformatted note.");
        const t = this.stave.getSpacingBetweenLines()
          , e = t / 2
          , i = this.y - e;
        return new y.BoundingBox(this.getAbsoluteX(),i,this.width,t)
    }
    setStave(t) {
        const e = this.getLine();
        return this.stave = t,
        this.setY(t.getYForNote(e)),
        this.context = this.stave.context,
        this
    }
    preFormat() {
        if (this.preFormatted)
            return this;
        const t = this.getWidth() + this.leftDisplacedHeadPx + this.rightDisplacedHeadPx;
        return this.setWidth(t),
        this.setPreFormatted(!0),
        this
    }
    draw() {
        this.checkContext(),
        this.setRendered();
        const t = this.context;
        let e = this.getAbsoluteX();
        this.custom_glyph && (e += this.stem_direction === P.UP ? this.stem_up_x_offset : this.stem_down_x_offset);
        const i = this.y;
        lt("Drawing note head '", this.note_type, this.duration, "' at", e, i);
        const s = this.stem_direction
          , n = this.render_options.glyph_font_scale;
        this.style && this.applyStyle(t);
        const o = `${this.glyph_code}Stem${s === P.UP ? "Up" : "Down"}`;
        if (this.note_type === "s") {
            const l = this.stave.getSpacingBetweenLines();
            ht(t, this.duration, e, i, s, l)
        } else
            E.renderGlyph(t, e, i, n, this.glyph_code, {
                font: this.musicFont,
                category: this.custom_glyph ? `noteHead.custom.${o}` : `noteHead.standard.${o}`
            });
        this.style && this.restoreStyle(t)
    }
}
class m2 extends J {
    constructor(t) {
        super(t);
        this.setAttribute("type", "StemmableNote"),
        this.stem = null,
        this.stemExtensionOverride = null,
        this.beam = null
    }
    getStem() {
        return this.stem
    }
    setStem(t) {
        return this.stem = t,
        this
    }
    buildStem() {
        const t = new P;
        return this.setStem(t),
        this
    }
    buildFlag(t="flag") {
        const {glyph: e, beam: i} = this
          , s = i === null;
        if (e && e.flag && s) {
            const n = this.getStemDirection() === P.DOWN ? e.code_flag_downstem : e.code_flag_upstem;
            this.flag = new E(n,this.render_options.glyph_font_scale,{
                category: t
            })
        }
    }
    getBaseCustomNoteHeadGlyph() {
        return this.getStemDirection() === P.DOWN ? this.customGlyphs[this.customGlyphs.length - 1] : this.customGlyphs[0]
    }
    getStemLength() {
        return P.HEIGHT + this.getStemExtension()
    }
    getBeamCount() {
        const t = this.getGlyph();
        return t ? t.beam_count : 0
    }
    getStemMinumumLength() {
        let e = y.durationToFraction(this.duration).value() <= 1 ? 0 : 20;
        switch (this.duration) {
        case "8":
            this.beam == null && (e = 35);
            break;
        case "16":
            e = this.beam == null ? 35 : 25;
            break;
        case "32":
            e = this.beam == null ? 45 : 35;
            break;
        case "64":
            e = this.beam == null ? 50 : 40;
            break;
        case "128":
            e = this.beam == null ? 55 : 45;
            break
        }
        return e
    }
    getStemDirection() {
        return this.stem_direction
    }
    setStemDirection(t) {
        if (t || (t = P.UP),
        t !== P.UP && t !== P.DOWN)
            throw new f.RERR("BadArgument",`Invalid stem direction: ${t}`);
        if (this.stem_direction = t,
        this.stem) {
            this.stem.setDirection(t),
            this.stem.setExtension(this.getStemExtension());
            const e = this.getBaseCustomNoteHeadGlyph() || this.getGlyph()
              , i = this.musicFont.lookupMetric(`stem.noteHead.${e.code_head}`, {
                offsetYBaseStemUp: 0,
                offsetYTopStemUp: 0,
                offsetYBaseStemDown: 0,
                offsetYTopStemDown: 0
            });
            this.stem.setOptions({
                stem_up_y_offset: i.offsetYTopStemUp,
                stem_down_y_offset: i.offsetYTopStemDown,
                stem_up_y_base_offset: i.offsetYBaseStemUp,
                stem_down_y_base_offset: i.offsetYBaseStemDown
            })
        }
        return this.reset(),
        this.flag && this.buildFlag(),
        this.beam = null,
        this.preFormatted && this.preFormat(),
        this
    }
    getStemX() {
        const t = this.getAbsoluteX() + this.x_shift
          , e = this.getAbsoluteX() + this.x_shift + this.getGlyphWidth();
        return this.stem_direction === P.DOWN ? t : e
    }
    getCenterGlyphX() {
        return this.getAbsoluteX() + this.x_shift + this.getGlyphWidth() / 2
    }
    getStemExtension() {
        const t = this.getGlyph();
        return this.stemExtensionOverride != null ? this.stemExtensionOverride : t ? this.getStemDirection() === 1 ? t.stem_up_extension : t.stem_down_extension : 0
    }
    setStemLength(t) {
        return this.stemExtensionOverride = t - P.HEIGHT,
        this
    }
    getStemExtents() {
        return this.stem.getExtents()
    }
    setBeam(t) {
        return this.beam = t,
        this
    }
    getYForTopText(t) {
        const e = this.getStemExtents();
        return this.hasStem() ? Math.min(this.stave.getYForTopText(t), e.topY - this.render_options.annotation_spacing * (t + 1)) : this.stave.getYForTopText(t)
    }
    getYForBottomText(t) {
        const e = this.getStemExtents();
        return this.hasStem() ? Math.max(this.stave.getYForTopText(t), e.baseY + this.render_options.annotation_spacing * t) : this.stave.getYForBottomText(t)
    }
    hasFlag() {
        return y.getGlyphProps(this.duration).flag && !this.beam
    }
    postFormat() {
        return this.beam && this.beam.postFormat(),
        this.postFormatted = !0,
        this
    }
    drawStem(t) {
        this.checkContext(),
        this.setRendered(),
        this.setStem(new P(t)),
        this.stem.setContext(this.context).draw()
    }
}
class M extends X {
    static get CATEGORY() {
        return "none"
    }
    static get Position() {
        return {
            LEFT: 1,
            RIGHT: 2,
            ABOVE: 3,
            BELOW: 4
        }
    }
    static get PositionString() {
        return {
            above: M.Position.ABOVE,
            below: M.Position.BELOW,
            left: M.Position.LEFT,
            right: M.Position.RIGHT
        }
    }
    constructor() {
        super();
        this.setAttribute("type", "Modifier"),
        this.width = 0,
        this.note = null,
        this.index = null,
        this.text_line = 0,
        this.position = M.Position.LEFT,
        this.modifier_context = null,
        this.x_shift = 0,
        this.y_shift = 0,
        this.spacingFromNextModifier = 0
    }
    reset() {}
    getCategory() {
        return M.CATEGORY
    }
    getWidth() {
        return this.width
    }
    setWidth(t) {
        return this.width = t,
        this
    }
    getNote() {
        return this.note
    }
    setNote(t) {
        return this.note = t,
        this
    }
    getIndex() {
        return this.index
    }
    setIndex(t) {
        return this.index = t,
        this
    }
    getModifierContext() {
        return this.modifier_context
    }
    setModifierContext(t) {
        return this.modifier_context = t,
        this
    }
    getPosition() {
        return this.position
    }
    setPosition(t) {
        return this.position = typeof t == "string" ? M.PositionString[t] : t,
        this.reset(),
        this
    }
    setTextLine(t) {
        return this.text_line = t,
        this
    }
    setYShift(t) {
        return this.y_shift = t,
        this
    }
    setSpacingFromNextModifier(t) {
        this.spacingFromNextModifier = t
    }
    getSpacingFromNextModifier() {
        return this.spacingFromNextModifier
    }
    setXShift(t) {
        this.x_shift = 0,
        this.position === M.Position.LEFT ? this.x_shift -= t : this.x_shift += t
    }
    getXShift() {
        return this.x_shift
    }
    draw() {
        throw this.checkContext(),
        new f.RERR("MethodNotImplemented","draw() not implemented for this modifier.")
    }
    alignSubNotesWithNote(t, e) {
        const i = e.getTickContext()
          , s = i.getMetrics()
          , n = i.getX() - s.modLeftPx - s.modRightPx + this.getSpacingFromNextModifier();
        t.forEach(o=>{
            const l = o.getTickContext();
            o.setStave(e.stave),
            l.setXOffset(n)
        }
        )
    }
}
class C1 extends M {
    static get CATEGORY() {
        return "dots"
    }
    static format(t, e) {
        const i = e.right_shift
          , s = 1;
        if (!t || t.length === 0)
            return !1;
        const n = []
          , o = {};
        for (let h = 0; h < t.length; ++h) {
            const m = t[h]
              , _ = m.getNote();
            let x, p;
            typeof _.getKeyProps == "function" ? (x = _.getKeyProps()[m.getIndex()],
            p = _.getRightDisplacedHeadPx()) : (x = {
                line: .5
            },
            p = 0);
            const g = _.getAttribute("id");
            n.push({
                line: x.line,
                note: _,
                note_id: g,
                dot: m
            }),
            o[g] = Math.max(o[g] || p, p)
        }
        n.sort((h,m)=>m.line - h.line);
        let l = i
          , c = 0
          , d = null
          , u = null
          , b = null
          , r = 0;
        for (let h = 0; h < n.length; ++h) {
            const {dot: m, note: _, note_id: x, line: p} = n[h];
            (p !== d || _ !== u) && (l = o[x]),
            !_.isRest() && p !== d && (Math.abs(p % 1) === .5 ? r = 0 : (r = .5,
            (u != null && !u.isRest() && d - p == .5 || p + r === b) && (r = -.5))),
            _.isRest() ? m.dot_shiftY += -r : m.dot_shiftY = -r,
            b = p + r,
            m.setXShift(l),
            l += m.getWidth() + s,
            c = l > c ? l : c,
            d = p,
            u = _
        }
        return e.right_shift += c,
        !0
    }
    constructor() {
        super();
        this.setAttribute("type", "Dot"),
        this.note = null,
        this.index = null,
        this.position = M.Position.RIGHT,
        this.radius = 2,
        this.setWidth(5),
        this.dot_shiftY = 0
    }
    getCategory() {
        return C1.CATEGORY
    }
    setNote(t) {
        this.note = t,
        this.note.getCategory() === "gracenotes" && (this.radius *= .5,
        this.setWidth(3))
    }
    setDotShiftY(t) {
        return this.dot_shiftY = t,
        this
    }
    draw() {
        if (this.checkContext(),
        this.setRendered(),
        !this.note || this.index === null)
            throw new f.RERR("NoAttachedNote","Can't draw dot without a note and index.");
        const t = this.note.stave.options.spacing_between_lines_px
          , e = this.note.getModifierStartXY(this.position, this.index, {
            forceFlagRight: !0
        });
        this.note.getCategory() === "tabnotes" && (e.y = this.note.getStemExtents().baseY);
        const i = e.x + this.x_shift + this.width - this.radius
          , s = e.y + this.y_shift + this.dot_shiftY * t
          , n = this.context;
        n.beginPath(),
        n.arc(i, s, this.radius, 0, Math.PI * 2, !1),
        n.fill()
    }
}
function ct(...a) {
    H.DEBUG && f.L("Vex.Flow.StaveNote", a)
}
const dt = a=>P.WIDTH / (2 * -a.getStemDirection())
  , mt = (a,t)=>t === (a.getStemDirection() === P.UP ? a.keyProps.length - 1 : 0);
function _1(a, t, e) {
    const i = (t.isrest ? 0 : 1) * e;
    a.line += i,
    a.maxLine += i,
    a.minLine += i,
    a.note.setKeyLine(0, a.note.getKeyLine(0) + i)
}
function ut(a, t, e) {
    const i = a.line - f.MidLine(t.minLine, e.maxLine);
    a.note.setKeyLine(0, a.note.getKeyLine(0) - i),
    a.line -= i,
    a.maxLine -= i,
    a.minLine -= i
}
class H extends m2 {
    static get CATEGORY() {
        return "stavenotes"
    }
    static get STEM_UP() {
        return P.UP
    }
    static get STEM_DOWN() {
        return P.DOWN
    }
    static get DEFAULT_LEDGER_LINE_OFFSET() {
        return 3
    }
    static format(t, e) {
        if (!t || t.length < 2)
            return !1;
        if (t[0].getStave())
            return H.formatByY(t, e);
        const i = [];
        for (let b = 0; b < t.length; b++) {
            const r = t[b].getKeyProps()
              , h = r[0].line;
            let m = r[r.length - 1].line;
            const _ = t[b].getStemDirection()
              , x = t[b].getStemLength() / 10
              , p = t[b].getStemMinumumLength() / 10;
            let g;
            t[b].isRest() ? (g = h + t[b].glyph.line_above,
            m = h - t[b].glyph.line_below) : (g = _ === 1 ? r[r.length - 1].line + x : r[r.length - 1].line,
            m = _ === 1 ? r[0].line : r[0].line - x),
            i.push({
                line: r[0].line,
                maxLine: g,
                minLine: m,
                isrest: t[b].isRest(),
                stemDirection: _,
                stemMax: x,
                stemMin: p,
                voice_shift: t[b].getVoiceShiftWidth(),
                is_displaced: t[b].isDisplaced(),
                note: t[b]
            })
        }
        const s = i.length;
        let n = i[0];
        const o = s > 2 ? i[1] : null;
        let l = s > 2 ? i[2] : i[1];
        s === 2 && n.stemDirection === -1 && l.stemDirection === 1 && (n = i[1],
        l = i[0]);
        const c = Math.max(n.voice_shift, l.voice_shift);
        let d = 0, u;
        if (s === 2) {
            const b = n.stemDirection === l.stemDirection ? 0 : .5;
            return n.stemDirection === l.stemDirection && n.minLine <= l.maxLine && (n.isrest || (u = Math.abs(n.line - (l.maxLine + .5)),
            u = Math.max(u, n.stemMin),
            n.minLine = n.line - u,
            n.note.setStemLength(u * 10))),
            n.minLine <= l.maxLine + b && (n.isrest ? _1(n, l, 1) : l.isrest ? _1(l, n, -1) : (d = c,
            n.stemDirection === l.stemDirection ? n.note.setXShift(d + 3) : l.note.setXShift(d))),
            !0
        }
        if (o !== null && o.minLine < l.maxLine + .5 && (o.isrest || (u = Math.abs(o.line - (l.maxLine + .5)),
        u = Math.max(u, o.stemMin),
        o.minLine = o.line - u,
        o.note.setStemLength(u * 10))),
        o.isrest && !n.isrest && !l.isrest && (n.minLine <= o.maxLine || o.minLine <= l.maxLine)) {
            const b = o.maxLine - o.minLine
              , r = n.minLine - l.maxLine;
            return b < r ? ut(o, n, l) : (d = c + 3,
            o.note.setXShift(d)),
            !0
        }
        return n.isrest && o.isrest && l.isrest ? (_1(n, o, 1),
        _1(l, o, -1),
        !0) : (o.isrest && n.isrest && o.minLine <= l.maxLine && _1(o, l, 1),
        o.isrest && l.isrest && n.minLine <= o.maxLine && _1(o, n, -1),
        n.isrest && n.minLine <= o.maxLine && _1(n, o, 1),
        l.isrest && o.minLine <= l.maxLine && _1(l, o, -1),
        (!n.isrest && !o.isrest && n.minLine <= o.maxLine + .5 || !o.isrest && !l.isrest && o.minLine <= l.maxLine) && (d = c + 3,
        o.note.setXShift(d)),
        !0)
    }
    static formatByY(t, e) {
        let i = !0;
        for (let n = 0; n < t.length; n++)
            i = i && t[n].getStave() != null;
        if (!i)
            throw new f.RERR("Stave Missing","All notes must have a stave - Vex.Flow.ModifierContext.formatMultiVoice!");
        let s = 0;
        for (let n = 0; n < t.length - 1; n++) {
            let o = t[n]
              , l = t[n + 1];
            o.getStemDirection() === P.DOWN && (o = t[n + 1],
            l = t[n]);
            const c = o.getKeyProps()
              , d = l.getKeyProps()
              , u = .5
              , b = o.getStave().getYForLine(5 - c[0].line + u);
            l.getStave().getYForLine(5 - d[d.length - 1].line - u) - b < 0 && (s = o.getVoiceShiftWidth() + 2,
            l.setXShift(s))
        }
        e.right_shift += s
    }
    static postFormat(t) {
        return t ? (t.forEach(e=>e.postFormat()),
        !0) : !1
    }
    constructor(t) {
        super(t);
        if (this.setAttribute("type", "StaveNote"),
        this.keys = t.keys,
        this.clef = t.clef,
        this.octave_shift = t.octave_shift,
        this.beam = null,
        this.glyph = y.getGlyphProps(this.duration, this.noteType),
        !this.glyph)
            throw new f.RuntimeError("BadArguments",`Invalid note initialization data (No glyph found): ${JSON.stringify(t)}`);
        this.displaced = !1,
        this.dot_shiftY = 0,
        this.keyProps = [],
        this.use_default_head_x = !1,
        this.note_heads = [],
        this.modifiers = [],
        f.Merge(this.render_options, {
            glyph_font_scale: t.glyph_font_scale || y.DEFAULT_NOTATION_FONT_SCALE,
            stroke_px: t.stroke_px || H.DEFAULT_LEDGER_LINE_OFFSET
        }),
        this.calculateKeyProps(),
        this.buildStem(),
        t.auto_stem ? this.autoStem() : this.setStemDirection(t.stem_direction),
        this.reset(),
        this.buildFlag()
    }
    reset() {
        super.reset();
        const t = this.note_heads.map(e=>e.getStyle());
        this.buildNoteHeads(),
        this.note_heads.forEach((e,i)=>e.setStyle(t[i])),
        this.stave && this.note_heads.forEach(e=>e.setStave(this.stave)),
        this.calcNoteDisplacements()
    }
    setBeam(t) {
        return this.beam = t,
        this.calcNoteDisplacements(),
        this
    }
    getCategory() {
        return H.CATEGORY
    }
    buildStem() {
        this.setStem(new P({
            hide: !!this.isRest()
        }))
    }
    buildNoteHeads() {
        this.note_heads = [];
        const t = this.getStemDirection()
          , e = this.getKeys();
        let i = null, s = null, n = !1, o, l, c;
        t === P.UP ? (o = 0,
        l = e.length,
        c = 1) : t === P.DOWN && (o = e.length - 1,
        l = -1,
        c = -1);
        for (let d = o; d !== l; d += c) {
            const u = this.keyProps[d]
              , b = u.line;
            i === null ? i = b : (s = Math.abs(i - b),
            s === 0 || s === .5 ? n = !n : (n = !1,
            this.use_default_head_x = !0)),
            i = b;
            const r = new k1({
                duration: this.duration,
                note_type: this.noteType,
                displaced: n,
                stem_direction: t,
                custom_glyph_code: u.code,
                glyph_font_scale: this.render_options.glyph_font_scale,
                x_shift: u.shift_right,
                stem_up_x_offset: u.stem_up_x_offset,
                stem_down_x_offset: u.stem_down_x_offset,
                line: u.line
            });
            this.note_heads[d] = r
        }
    }
    autoStem() {
        this.minLine = this.keyProps[0].line,
        this.maxLine = this.keyProps[this.keyProps.length - 1].line;
        const t = 3
          , i = (this.minLine + this.maxLine) / 2 < t ? P.UP : P.DOWN;
        this.setStemDirection(i)
    }
    calculateKeyProps() {
        let t = null;
        for (let e = 0; e < this.keys.length; ++e) {
            const i = this.keys[e];
            this.glyph.rest && (this.glyph.position = i);
            const s = {
                octave_shift: this.octave_shift || 0
            }
              , n = y.keyProperties(i, this.clef, s);
            if (!n)
                throw new f.RuntimeError("BadArguments",`Invalid key for note properties: ${i}`);
            n.key === "R" && (this.duration === "1" || this.duration === "w" ? n.line = 4 : n.line = 3);
            const o = n.line;
            t === null ? t = o : Math.abs(t - o) === .5 && (this.displaced = !0,
            n.displaced = !0,
            this.keyProps.length > 0 && (this.keyProps[e - 1].displaced = !0)),
            t = o,
            this.keyProps.push(n)
        }
        t = -1 / 0,
        this.keyProps.forEach(e=>{
            e.line < t && f.W("Unsorted keys in note will be sorted. See https://github.com/0xfe/vexflow/issues/104 for details."),
            t = e.line
        }
        ),
        this.keyProps.sort((e,i)=>e.line - i.line)
    }
    getBoundingBox() {
        if (!this.preFormatted)
            throw new f.RERR("UnformattedNote","Can't call getBoundingBox on an unformatted note.");
        const {width: t, modLeftPx: e, leftDisplacedHeadPx: i} = this.getMetrics()
          , s = this.getAbsoluteX() - e - i;
        let n = 0
          , o = 0;
        const l = this.getStave().getSpacingBetweenLines() / 2
          , c = l * 2;
        if (this.isRest()) {
            const d = this.ys[0]
              , u = y.durationToFraction(this.duration);
            u.equals(1) || u.equals(2) ? (n = d - l,
            o = d + l) : (n = d - this.glyph.line_above * c,
            o = d + this.glyph.line_below * c)
        } else if (this.glyph.stem) {
            const d = this.getStemExtents();
            d.baseY += l * this.stem_direction,
            n = Math.min(d.topY, d.baseY),
            o = Math.max(d.topY, d.baseY)
        } else {
            n = null,
            o = null;
            for (let d = 0; d < this.ys.length; ++d) {
                const u = this.ys[d];
                d === 0 ? (n = u,
                o = u) : (n = Math.min(u, n),
                o = Math.max(u, o))
            }
            n -= l,
            o += l
        }
        return new y1(s,n,t,o - n)
    }
    getLineNumber(t) {
        if (!this.keyProps.length)
            throw new f.RERR("NoKeyProps","Can't get bottom note line, because note is not initialized properly.");
        let e = this.keyProps[0].line;
        for (let i = 0; i < this.keyProps.length; i++) {
            const s = this.keyProps[i].line;
            t ? s > e && (e = s) : s < e && (e = s)
        }
        return e
    }
    isRest() {
        return this.glyph.rest
    }
    isChord() {
        return !this.isRest() && this.keys.length > 1
    }
    hasStem() {
        return this.glyph.stem
    }
    hasFlag() {
        return super.hasFlag() && !this.isRest()
    }
    getStemX() {
        return this.noteType === "r" ? this.getCenterGlyphX() : super.getStemX() + dt(this)
    }
    getYForTopText(t) {
        const e = this.getStemExtents();
        return Math.min(this.stave.getYForTopText(t), e.topY - this.render_options.annotation_spacing * (t + 1))
    }
    getYForBottomText(t) {
        const e = this.getStemExtents();
        return Math.max(this.stave.getYForTopText(t), e.baseY + this.render_options.annotation_spacing * t)
    }
    setStave(t) {
        super.setStave(t);
        const e = this.note_heads.map(i=>(i.setStave(t),
        i.getY()));
        if (this.setYs(e),
        this.stem) {
            const {y_top: i, y_bottom: s} = this.getNoteHeadBounds();
            this.stem.setYBounds(i, s)
        }
        return this
    }
    getKeys() {
        return this.keys
    }
    getKeyProps() {
        return this.keyProps
    }
    isDisplaced() {
        return this.displaced
    }
    setNoteDisplaced(t) {
        return this.displaced = t,
        this
    }
    getTieRightX() {
        let t = this.getAbsoluteX();
        return t += this.getGlyphWidth() + this.x_shift + this.rightDisplacedHeadPx,
        this.modifierContext && (t += this.modifierContext.getRightShift()),
        t
    }
    getTieLeftX() {
        let t = this.getAbsoluteX();
        return t += this.x_shift - this.leftDisplacedHeadPx,
        t
    }
    getLineForRest() {
        let t = this.keyProps[0].line;
        if (this.keyProps.length > 1) {
            const e = this.keyProps[this.keyProps.length - 1].line
              , i = Math.max(t, e)
              , s = Math.min(t, e);
            t = f.MidLine(i, s)
        }
        return t
    }
    getModifierStartXY(t, e, i) {
        if (i = i || {},
        !this.preFormatted)
            throw new f.RERR("UnformattedNote","Can't call GetModifierStartXY on an unformatted note");
        if (this.ys.length === 0)
            throw new f.RERR("NoYValues","No Y-Values calculated for this note.");
        const {ABOVE: s, BELOW: n, LEFT: o, RIGHT: l} = M.Position;
        let c = 0;
        return t === o ? c = -1 * 2 : t === l ? (c = this.getGlyphWidth() + this.x_shift + 2,
        this.stem_direction === P.UP && this.hasFlag() && (i.forceFlagRight || mt(this, e)) && (c += this.flag.getMetrics().width)) : (t === n || t === s) && (c = this.getGlyphWidth() / 2),
        {
            x: this.getAbsoluteX() + c,
            y: this.ys[e]
        }
    }
    setStyle(t) {
        super.setStyle(t),
        this.note_heads.forEach(e=>e.setStyle(t)),
        this.stem.setStyle(t)
    }
    setStemStyle(t) {
        this.getStem().setStyle(t)
    }
    getStemStyle() {
        return this.stem.getStyle()
    }
    setLedgerLineStyle(t) {
        this.ledgerLineStyle = t
    }
    getLedgerLineStyle() {
        return this.ledgerLineStyle
    }
    setFlagStyle(t) {
        this.flagStyle = t
    }
    getFlagStyle() {
        return this.flagStyle
    }
    setKeyStyle(t, e) {
        return this.note_heads[t].setStyle(e),
        this
    }
    setKeyLine(t, e) {
        return this.keyProps[t].line = e,
        this.reset(),
        this
    }
    getKeyLine(t) {
        return this.keyProps[t].line
    }
    addToModifierContext(t) {
        this.setModifierContext(t);
        for (let e = 0; e < this.modifiers.length; ++e)
            this.modifierContext.addModifier(this.modifiers[e]);
        return this.modifierContext.addModifier(this),
        this.setPreFormatted(!1),
        this
    }
    addModifier(t, e) {
        return e.setNote(this),
        e.setIndex(t),
        this.modifiers.push(e),
        this.setPreFormatted(!1),
        this
    }
    addAccidental(t, e) {
        return this.addModifier(t, e)
    }
    addArticulation(t, e) {
        return this.addModifier(t, e)
    }
    addAnnotation(t, e) {
        return this.addModifier(t, e)
    }
    addDot(t) {
        const e = new C1;
        return e.setDotShiftY(this.glyph.dot_shiftY),
        this.dots++,
        this.addModifier(t, e)
    }
    addDotToAll() {
        for (let t = 0; t < this.keys.length; ++t)
            this.addDot(t);
        return this
    }
    getAccidentals() {
        return this.modifierContext.getModifiers("accidentals")
    }
    getDots() {
        return this.modifierContext.getModifiers("dots")
    }
    getVoiceShiftWidth() {
        return this.getGlyphWidth() * (this.displaced ? 2 : 1)
    }
    calcNoteDisplacements() {
        this.setLeftDisplacedHeadPx(this.displaced && this.stem_direction === P.DOWN ? this.getGlyphWidth() : 0),
        this.setRightDisplacedHeadPx(!this.hasFlag() && this.displaced && this.stem_direction === P.UP ? this.getGlyphWidth() : 0)
    }
    preFormat() {
        if (this.preFormatted)
            return;
        this.modifierContext && this.modifierContext.preFormat();
        let t = this.getGlyphWidth() + this.leftDisplacedHeadPx + this.rightDisplacedHeadPx;
        this.glyph.flag && this.beam === null && this.stem_direction === P.UP && (t += this.getGlyphWidth()),
        this.setWidth(t),
        this.setPreFormatted(!0)
    }
    getNoteHeadBounds() {
        let t = null
          , e = null
          , i = null
          , s = null
          , n = this.stave.getNumLines()
          , o = 1
          , l = !1
          , c = !1
          , d = n
          , u = o;
        return this.note_heads.forEach(b=>{
            const r = b.getLine()
              , h = b.getY();
            (t === null || h < t) && (t = h),
            (e === null || h > e) && (e = h),
            s === null && b.isDisplaced() && (s = b.getAbsoluteX()),
            i === null && !b.isDisplaced() && (i = b.getAbsoluteX()),
            n = r > n ? r : n,
            o = r < o ? r : o,
            b.isDisplaced() ? (l = l === !1 ? r : Math.max(r, l),
            c = c === !1 ? r : Math.min(r, c)) : (d = Math.max(r, d),
            u = Math.min(r, u))
        }
        , this),
        {
            y_top: t,
            y_bottom: e,
            displaced_x: s,
            non_displaced_x: i,
            highest_line: n,
            lowest_line: o,
            highest_displaced_line: l,
            lowest_displaced_line: c,
            highest_non_displaced_line: d,
            lowest_non_displaced_line: u
        }
    }
    getNoteHeadBeginX() {
        return this.getAbsoluteX() + this.x_shift
    }
    getNoteHeadEndX() {
        return this.getNoteHeadBeginX() + this.getGlyphWidth()
    }
    drawLedgerLines() {
        const {stave: t, glyph: e, render_options: {stroke_px: i}, context: s} = this
          , n = e.getWidth() + i * 2
          , o = 2 * (e.getWidth() + i) - P.WIDTH / 2;
        if (this.isRest())
            return;
        if (!s)
            throw new f.RERR("NoCanvasContext","Can't draw without a canvas context.");
        const {highest_line: l, lowest_line: c, highest_displaced_line: d, highest_non_displaced_line: u, lowest_displaced_line: b, lowest_non_displaced_line: r, displaced_x: h, non_displaced_x: m} = this.getNoteHeadBounds()
          , _ = Math.min(h, m)
          , x = (g,T,w)=>{
            let S;
            w && T ? S = _ - i : T ? S = m - i : S = h - i;
            const v = T && w ? o : n;
            s.beginPath(),
            s.moveTo(S, g),
            s.lineTo(S + v, g),
            s.stroke()
        }
          , p = R(R({}, t.getStyle() || {}), this.getLedgerLineStyle() || {});
        this.applyStyle(s, p);
        for (let g = 6; g <= l; ++g) {
            const T = m !== null && g <= u
              , w = h !== null && g <= d;
            x(t.getYForNote(g), T, w)
        }
        for (let g = 0; g >= c; --g) {
            const T = m !== null && g >= r
              , w = h !== null && g >= b;
            x(t.getYForNote(g), T, w)
        }
        this.restoreStyle(s, p)
    }
    drawModifiers() {
        if (!this.context)
            throw new f.RERR("NoCanvasContext","Can't draw without a canvas context.");
        const t = this.context;
        t.openGroup("modifiers");
        for (let e = 0; e < this.modifiers.length; e++) {
            const i = this.modifiers[e]
              , s = this.note_heads[i.getIndex()]
              , n = s.getStyle();
            s.applyStyle(t, n),
            i.setContext(t),
            i.drawWithStyle(),
            s.restoreStyle(t, n)
        }
        t.closeGroup()
    }
    drawFlag() {
        const {stem: t, beam: e, context: i} = this;
        if (!i)
            throw new f.RERR("NoCanvasContext","Can't draw without a canvas context.");
        const s = e === null;
        if (this.getGlyph().flag && s) {
            const {y_top: o, y_bottom: l} = this.getNoteHeadBounds()
              , c = t.getHeight()
              , d = this.getStemX()
              , u = this.getStemDirection() === P.DOWN ? o - c + 2 : l - c - 2;
            i.openGroup("flag", null, {
                pointerBBox: !0
            }),
            this.applyStyle(i, this.getFlagStyle() || !1),
            this.flag.render(i, d, u),
            this.restoreStyle(i, this.getFlagStyle() || !1),
            i.closeGroup()
        }
    }
    drawNoteHeads() {
        this.note_heads.forEach(t=>{
            this.context.openGroup("notehead", null, {
                pointerBBox: !0
            }),
            t.setContext(this.context).draw(),
            this.context.closeGroup()
        }
        )
    }
    drawStem(t) {
        if (!this.context)
            throw new f.RERR("NoCanvasContext","Can't draw without a canvas context.");
        t && this.setStem(new P(t)),
        this.context.openGroup("stem", null, {
            pointerBBox: !0
        }),
        this.stem.setContext(this.context).draw(),
        this.context.closeGroup()
    }
    draw() {
        if (!this.context)
            throw new f.RERR("NoCanvasContext","Can't draw without a canvas context.");
        if (!this.stave)
            throw new f.RERR("NoStave","Can't draw without a stave.");
        if (this.ys.length === 0)
            throw new f.RERR("NoYValues","Can't draw note without Y values.");
        const t = this.getNoteHeadBeginX()
          , e = this.hasStem() && !this.beam;
        this.note_heads.forEach(s=>s.setX(t));
        const i = this.getStemX();
        this.stem.setNoteHeadXBounds(i, i),
        ct("Rendering ", this.isChord() ? "chord :" : "note :", this.keys),
        this.drawLedgerLines(),
        this.applyStyle(),
        this.setAttribute("el", this.context.openGroup("stavenote", this.getAttribute("id"))),
        this.context.openGroup("note", null, {
            pointerBBox: !0
        }),
        e && this.drawStem(),
        this.drawNoteHeads(),
        this.drawFlag(),
        this.context.closeGroup(),
        this.drawModifiers(),
        this.context.closeGroup(),
        this.restoreStyle(),
        this.setRendered()
    }
}
class O1 extends M {
    static get CATEGORY() {
        return "frethandfinger"
    }
    static format(t, e) {
        const {left_shift: i, right_shift: s} = e
          , n = 1;
        if (!t || t.length === 0)
            return !1;
        const o = [];
        let l = null
          , c = 0
          , d = 0;
        for (let x = 0; x < t.length; ++x) {
            const p = t[x]
              , g = p.getNote()
              , T = p.getPosition()
              , w = g.getKeyProps()[p.getIndex()];
            if (g !== l) {
                for (let S = 0; S < g.keys.length; ++S)
                    i === 0 && (c = Math.max(g.getLeftDisplacedHeadPx(), c)),
                    s === 0 && (d = Math.max(g.getRightDisplacedHeadPx(), d));
                l = g
            }
            o.push({
                note: g,
                num: p,
                pos: T,
                line: w.line,
                shiftL: c,
                shiftR: d
            })
        }
        o.sort((x,p)=>p.line - x.line);
        let u = 0
          , b = 0
          , r = 0
          , h = 0
          , m = null
          , _ = null;
        for (let x = 0; x < o.length; ++x) {
            let p = 0;
            const {note: g, pos: T, num: w, line: S, shiftL: v, shiftR: A} = o[x];
            (S !== m || g !== _) && (u = i + v,
            b = s + A);
            const F = w.getWidth() + n;
            T === M.Position.LEFT ? (w.setXShift(i + u),
            p = i + F,
            r = p > r ? p : r) : T === M.Position.RIGHT && (w.setXShift(b),
            p = d + F,
            h = p > h ? p : h),
            m = S,
            _ = g
        }
        return e.left_shift += r,
        e.right_shift += h,
        !0
    }
    constructor(t) {
        super();
        this.setAttribute("type", "FretHandFinger"),
        this.note = null,
        this.index = null,
        this.finger = t,
        this.width = 7,
        this.position = M.Position.LEFT,
        this.x_shift = 0,
        this.y_shift = 0,
        this.x_offset = 0,
        this.y_offset = 0,
        this.font = {
            family: "sans-serif",
            size: 9,
            weight: "bold"
        }
    }
    getCategory() {
        return O1.CATEGORY
    }
    setFretHandFinger(t) {
        return this.finger = t,
        this
    }
    setOffsetX(t) {
        return this.x_offset = t,
        this
    }
    setOffsetY(t) {
        return this.y_offset = t,
        this
    }
    draw() {
        if (this.checkContext(),
        !this.note || this.index == null)
            throw new f.RERR("NoAttachedNote","Can't draw string number without a note and index.");
        this.setRendered();
        const t = this.context
          , e = this.note.getModifierStartXY(this.position, this.index);
        let i = e.x + this.x_shift + this.x_offset
          , s = e.y + this.y_shift + this.y_offset + 5;
        switch (this.position) {
        case M.Position.ABOVE:
            i -= 4,
            s -= 12;
            break;
        case M.Position.BELOW:
            i -= 2,
            s += 10;
            break;
        case M.Position.LEFT:
            i -= this.width;
            break;
        case M.Position.RIGHT:
            i += 1;
            break;
        default:
            throw new f.RERR("InvalidPostion",`The position ${this.position} does not exist`)
        }
        t.save(),
        t.setFont(this.font.family, this.font.size, this.font.weight),
        t.fillText("" + this.finger, i, s),
        t.restore()
    }
}
class z {
    static get NUM_TONES() {
        return 12
    }
    static get roots() {
        return ["c", "d", "e", "f", "g", "a", "b"]
    }
    static get root_values() {
        return [0, 2, 4, 5, 7, 9, 11]
    }
    static get root_indices() {
        return {
            c: 0,
            d: 1,
            e: 2,
            f: 3,
            g: 4,
            a: 5,
            b: 6
        }
    }
    static get canonical_notes() {
        return ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"]
    }
    static get diatonic_intervals() {
        return ["unison", "m2", "M2", "m3", "M3", "p4", "dim5", "p5", "m6", "M6", "b7", "M7", "octave"]
    }
    static get diatonic_accidentals() {
        return {
            unison: {
                note: 0,
                accidental: 0
            },
            m2: {
                note: 1,
                accidental: -1
            },
            M2: {
                note: 1,
                accidental: 0
            },
            m3: {
                note: 2,
                accidental: -1
            },
            M3: {
                note: 2,
                accidental: 0
            },
            p4: {
                note: 3,
                accidental: 0
            },
            dim5: {
                note: 4,
                accidental: -1
            },
            p5: {
                note: 4,
                accidental: 0
            },
            m6: {
                note: 5,
                accidental: -1
            },
            M6: {
                note: 5,
                accidental: 0
            },
            b7: {
                note: 6,
                accidental: -1
            },
            M7: {
                note: 6,
                accidental: 0
            },
            octave: {
                note: 7,
                accidental: 0
            }
        }
    }
    static get intervals() {
        return {
            u: 0,
            unison: 0,
            m2: 1,
            b2: 1,
            min2: 1,
            S: 1,
            H: 1,
            "2": 2,
            M2: 2,
            maj2: 2,
            T: 2,
            W: 2,
            m3: 3,
            b3: 3,
            min3: 3,
            M3: 4,
            "3": 4,
            maj3: 4,
            "4": 5,
            p4: 5,
            "#4": 6,
            b5: 6,
            aug4: 6,
            dim5: 6,
            "5": 7,
            p5: 7,
            "#5": 8,
            b6: 8,
            aug5: 8,
            "6": 9,
            M6: 9,
            maj6: 9,
            b7: 10,
            m7: 10,
            min7: 10,
            dom7: 10,
            M7: 11,
            maj7: 11,
            "8": 12,
            octave: 12
        }
    }
    static get scales() {
        return {
            major: [2, 2, 1, 2, 2, 2, 1],
            dorian: [2, 1, 2, 2, 2, 1, 2],
            mixolydian: [2, 2, 1, 2, 2, 1, 2],
            minor: [2, 1, 2, 2, 1, 2, 2]
        }
    }
    static get scaleTypes() {
        return {
            M: z.scales.major,
            m: z.scales.minor
        }
    }
    static get accidentals() {
        return ["bb", "b", "n", "#", "##"]
    }
    static get noteValues() {
        return {
            c: {
                root_index: 0,
                int_val: 0
            },
            cn: {
                root_index: 0,
                int_val: 0
            },
            "c#": {
                root_index: 0,
                int_val: 1
            },
            "c##": {
                root_index: 0,
                int_val: 2
            },
            cb: {
                root_index: 0,
                int_val: 11
            },
            cbb: {
                root_index: 0,
                int_val: 10
            },
            d: {
                root_index: 1,
                int_val: 2
            },
            dn: {
                root_index: 1,
                int_val: 2
            },
            "d#": {
                root_index: 1,
                int_val: 3
            },
            "d##": {
                root_index: 1,
                int_val: 4
            },
            db: {
                root_index: 1,
                int_val: 1
            },
            dbb: {
                root_index: 1,
                int_val: 0
            },
            e: {
                root_index: 2,
                int_val: 4
            },
            en: {
                root_index: 2,
                int_val: 4
            },
            "e#": {
                root_index: 2,
                int_val: 5
            },
            "e##": {
                root_index: 2,
                int_val: 6
            },
            eb: {
                root_index: 2,
                int_val: 3
            },
            ebb: {
                root_index: 2,
                int_val: 2
            },
            f: {
                root_index: 3,
                int_val: 5
            },
            fn: {
                root_index: 3,
                int_val: 5
            },
            "f#": {
                root_index: 3,
                int_val: 6
            },
            "f##": {
                root_index: 3,
                int_val: 7
            },
            fb: {
                root_index: 3,
                int_val: 4
            },
            fbb: {
                root_index: 3,
                int_val: 3
            },
            g: {
                root_index: 4,
                int_val: 7
            },
            gn: {
                root_index: 4,
                int_val: 7
            },
            "g#": {
                root_index: 4,
                int_val: 8
            },
            "g##": {
                root_index: 4,
                int_val: 9
            },
            gb: {
                root_index: 4,
                int_val: 6
            },
            gbb: {
                root_index: 4,
                int_val: 5
            },
            a: {
                root_index: 5,
                int_val: 9
            },
            an: {
                root_index: 5,
                int_val: 9
            },
            "a#": {
                root_index: 5,
                int_val: 10
            },
            "a##": {
                root_index: 5,
                int_val: 11
            },
            ab: {
                root_index: 5,
                int_val: 8
            },
            abb: {
                root_index: 5,
                int_val: 7
            },
            b: {
                root_index: 6,
                int_val: 11
            },
            bn: {
                root_index: 6,
                int_val: 11
            },
            "b#": {
                root_index: 6,
                int_val: 0
            },
            "b##": {
                root_index: 6,
                int_val: 1
            },
            bb: {
                root_index: 6,
                int_val: 10
            },
            bbb: {
                root_index: 6,
                int_val: 9
            }
        }
    }
    isValidNoteValue(t) {
        return !(t == null || t < 0 || t >= z.NUM_TONES)
    }
    isValidIntervalValue(t) {
        return this.isValidNoteValue(t)
    }
    getNoteParts(t) {
        if (!t || t.length < 1)
            throw new f.RERR("BadArguments","Invalid note name: " + t);
        if (t.length > 3)
            throw new f.RERR("BadArguments","Invalid note name: " + t);
        const e = t.toLowerCase()
          , s = /^([cdefgab])(b|bb|n|#|##)?$/.exec(e);
        if (s != null) {
            const n = s[1]
              , o = s[2];
            return {
                root: n,
                accidental: o
            }
        } else
            throw new f.RERR("BadArguments","Invalid note name: " + t)
    }
    getKeyParts(t) {
        if (!t || t.length < 1)
            throw new f.RERR("BadArguments","Invalid key: " + t);
        const e = t.toLowerCase()
          , s = /^([cdefgab])(b|#)?(mel|harm|m|M)?$/.exec(e);
        if (s != null) {
            const n = s[1]
              , o = s[2];
            let l = s[3];
            return l || (l = "M"),
            {
                root: n,
                accidental: o,
                type: l
            }
        } else
            throw new f.RERR("BadArguments",`Invalid key: ${t}`)
    }
    getNoteValue(t) {
        const e = z.noteValues[t];
        if (e == null)
            throw new f.RERR("BadArguments",`Invalid note name: ${t}`);
        return e.int_val
    }
    getIntervalValue(t) {
        const e = z.intervals[t];
        if (e == null)
            throw new f.RERR("BadArguments",`Invalid interval name: ${t}`);
        return e
    }
    getCanonicalNoteName(t) {
        if (!this.isValidNoteValue(t))
            throw new f.RERR("BadArguments",`Invalid note value: ${t}`);
        return z.canonical_notes[t]
    }
    getCanonicalIntervalName(t) {
        if (!this.isValidIntervalValue(t))
            throw new f.RERR("BadArguments",`Invalid interval value: ${t}`);
        return z.diatonic_intervals[t]
    }
    getRelativeNoteValue(t, e, i) {
        if (i == null && (i = 1),
        i !== 1 && i !== -1)
            throw new f.RERR("BadArguments",`Invalid direction: ${i}`);
        let s = (t + i * e) % z.NUM_TONES;
        return s < 0 && (s += z.NUM_TONES),
        s
    }
    getRelativeNoteName(t, e) {
        const i = this.getNoteParts(t)
          , s = this.getNoteValue(i.root);
        let n = e - s;
        if (Math.abs(n) > z.NUM_TONES - 3) {
            let l = 1;
            n > 0 && (l = -1);
            const c = (e + 1 + (s + 1)) % z.NUM_TONES * l;
            if (Math.abs(c) > 2)
                throw new f.RERR("BadArguments",`Notes not related: ${t}, ${e})`);
            n = c
        }
        if (Math.abs(n) > 2)
            throw new f.RERR("BadArguments",`Notes not related: ${t}, ${e})`);
        let o = i.root;
        if (n > 0)
            for (let l = 1; l <= n; ++l)
                o += "#";
        else if (n < 0)
            for (let l = -1; l >= n; --l)
                o += "b";
        return o
    }
    getScaleTones(t, e) {
        const i = [t];
        let s = t;
        for (let n = 0; n < e.length; n += 1)
            s = this.getRelativeNoteValue(s, e[n]),
            s !== t && i.push(s);
        return i
    }
    getIntervalBetween(t, e, i) {
        if (i == null && (i = 1),
        i !== 1 && i !== -1)
            throw new f.RERR("BadArguments",`Invalid direction: ${i}`);
        if (!this.isValidNoteValue(t) || !this.isValidNoteValue(e))
            throw new f.RERR("BadArguments",`Invalid notes: ${t}, ${e}`);
        let s = i === 1 ? e - t : t - e;
        return s < 0 && (s += z.NUM_TONES),
        s
    }
    createScaleMap(t) {
        const e = this.getKeyParts(t)
          , i = z.scaleTypes[e.type];
        let s = e.root;
        if (e.accidental && (s += e.accidental),
        !i)
            throw new f.RERR("BadArguments","Unsupported key type: " + t);
        const n = this.getScaleTones(this.getNoteValue(s), i)
          , o = z.root_indices[e.root]
          , l = {};
        for (let c = 0; c < z.roots.length; ++c) {
            const d = (o + c) % z.roots.length
              , u = z.roots[d];
            let b = this.getRelativeNoteName(u, n[c]);
            b.length === 1 && (b += "n"),
            l[u] = b
        }
        return l
    }
}
function e2(...a) {
    w1.DEBUG && f.L("Vex.Flow.Accidental", a)
}
const z1 = a=>a.getMetrics().width;
class w1 extends M {
    static get CATEGORY() {
        return "accidentals"
    }
    static format(t, e) {
        const i = 1
          , s = e.left_shift + i
          , n = 3;
        if (!t || t.length === 0)
            return;
        const o = [];
        let l = null
          , c = 0;
        for (let p = 0; p < t.length; ++p) {
            const g = t[p]
              , T = g.getNote()
              , w = T.getStave()
              , S = T.getKeyProps()[g.getIndex()];
            if (T !== l) {
                for (let v = 0; v < T.keys.length; ++v)
                    c = Math.max(T.getLeftDisplacedHeadPx(), c);
                l = T
            }
            if (w !== null) {
                const v = w.options.spacing_between_lines_px
                  , A = w.getYForLine(S.line)
                  , F = Math.round(A / v * 2) / 2;
                o.push({
                    y: A,
                    line: F,
                    shift: c,
                    acc: g,
                    lineSpace: v
                })
            } else
                o.push({
                    line: S.line,
                    shift: c,
                    acc: g
                })
        }
        o.sort((p,g)=>g.line - p.line);
        const d = [];
        let u = 0
          , b = null;
        for (let p = 0; p < o.length; p++) {
            const g = o[p];
            (b === null || b !== g.line) && d.push({
                line: g.line,
                flatLine: !0,
                dblSharpLine: !0,
                numAcc: 0,
                width: 0
            }),
            g.acc.type !== "b" && g.acc.type !== "bb" && (d[d.length - 1].flatLine = !1),
            g.acc.type !== "##" && (d[d.length - 1].dblSharpLine = !1),
            d[d.length - 1].numAcc++,
            d[d.length - 1].width += g.acc.getWidth() + n,
            u = g.shift > u ? g.shift : u,
            b = g.line
        }
        let r = 0;
        for (let p = 0; p < d.length; p++) {
            let g = !1;
            const T = p;
            let w = p;
            for (; w + 1 < d.length && !g; )
                this.checkCollision(d[w], d[w + 1]) ? w++ : g = !0;
            const S = I=>d[T + I]
              , v = I=>I.map(S)
              , A = (I,G)=>{
                const [t1,u1] = v([I, G]).map(M1=>M1.line);
                return t1 - u1
            }
              , F = (...I)=>I.map(v).every(G=>!this.checkCollision(...G))
              , C = w - T + 1;
            let V = this.checkCollision(d[T], d[w]) ? "a" : "b";
            switch (C) {
            case 3:
                V === "a" && A(1, 2) === .5 && A(0, 1) !== .5 && (V = "second_on_bottom");
                break;
            case 4:
                F([0, 2], [1, 3]) && (V = "spaced_out_tetrachord");
                break;
            case 5:
                V === "b" && F([1, 3]) && (V = "spaced_out_pentachord",
                F([0, 2], [2, 4]) && (V = "very_spaced_out_pentachord"));
                break;
            case 6:
                F([0, 3], [1, 4], [2, 5]) && (V = "spaced_out_hexachord"),
                F([0, 2], [2, 4], [1, 3], [3, 5]) && (V = "very_spaced_out_hexachord");
                break
            }
            let D, W;
            if (C >= 7) {
                let I = 2
                  , G = !0;
                for (; G === !0; ) {
                    G = !1;
                    for (let t1 = 0; t1 + I < d.length; t1++)
                        if (this.checkCollision(d[t1], d[t1 + I])) {
                            G = !0,
                            I++;
                            break
                        }
                }
                for (D = p; D <= w; D++)
                    W = (D - p) % I + 1,
                    d[D].column = W,
                    r = r > W ? r : W
            } else
                for (D = p; D <= w; D++)
                    W = y.accidentalColumnsTable[C][V][D - p],
                    d[D].column = W,
                    r = r > W ? r : W;
            p = w
        }
        const h = []
          , m = [];
        for (let p = 0; p <= r; p++)
            h[p] = 0,
            m[p] = 0;
        h[0] = u + s,
        m[0] = u + s,
        d.forEach(p=>{
            p.width > h[p.column] && (h[p.column] = p.width)
        }
        );
        for (let p = 1; p < h.length; p++)
            m[p] = h[p] + m[p - 1];
        const _ = m[m.length - 1];
        let x = 0;
        d.forEach(p=>{
            let g = 0;
            const T = x + p.numAcc;
            for (x; x < T; x++) {
                const w = m[p.column - 1] + g;
                o[x].acc.setXShift(w),
                g += o[x].acc.getWidth() + n,
                e2("Line, accCount, shift: ", p.line, x, w)
            }
        }
        ),
        e.left_shift += _
    }
    static checkCollision(t, e) {
        let i = e.line - t.line
          , s = 3;
        i > 0 ? (s = e.flatLine || e.dblSharpLine ? 2.5 : 3,
        t.dblSharpLine && (i -= .5)) : (s = t.flatLine || t.dblSharpLine ? 2.5 : 3,
        e.dblSharpLine && (i -= .5));
        const n = Math.abs(i) < s;
        return e2("Line_1, Line_2, Collision: ", t.line, e.line, n),
        n
    }
    static applyAccidentals(t, e) {
        const i = []
          , s = {};
        t.forEach(l=>{
            const c = new k(0,1);
            l.getTickables().forEach(u=>{
                if (u.shouldIgnoreTicks())
                    return;
                const b = s[c.value()];
                b ? b.push(u) : (i.push(c.value()),
                s[c.value()] = [u]),
                c.add(u.getTicks())
            }
            )
        }
        );
        const n = new z;
        e || (e = "C");
        const o = n.createScaleMap(e);
        i.forEach(l=>{
            const c = s[l]
              , d = []
              , u = b=>{
                b.isRest() || b.shouldIgnoreTicks() || (b.keys.forEach((r,h)=>{
                    const m = n.getNoteParts(r.split("/")[0])
                      , _ = m.accidental || "n"
                      , x = m.root + _
                      , p = o[m.root] === x
                      , g = d.indexOf(x) > -1;
                    if (!p || p && g) {
                        o[m.root] = x;
                        const T = new w1(_);
                        b.addAccidental(h, T),
                        d.push(x)
                    }
                }
                ),
                b.getModifiers().forEach(r=>{
                    r.getCategory() === "gracenotegroups" && r.getGraceNotes().forEach(u)
                }
                ))
            }
            ;
            c.forEach(u)
        }
        )
    }
    constructor(t=null) {
        super();
        if (this.setAttribute("type", "Accidental"),
        e2("New accidental: ", t),
        this.note = null,
        this.index = null,
        this.type = t,
        this.position = M.Position.LEFT,
        this.render_options = {
            font_scale: 38,
            stroke_px: 3,
            parenLeftPadding: 2,
            parenRightPadding: 2
        },
        this.accidental = y.accidentalCodes(this.type),
        !this.accidental)
            throw new f.RERR("ArgumentError",`Unknown accidental type: ${t}`);
        this.cautionary = !1,
        this.parenLeft = null,
        this.parenRight = null,
        this.reset()
    }
    reset() {
        const t = this.render_options.font_scale;
        this.glyph = new E(this.accidental.code,t),
        this.glyph.setOriginX(1),
        this.cautionary && (this.parenLeft = new E(y.accidentalCodes("{").code,t),
        this.parenRight = new E(y.accidentalCodes("}").code,t),
        this.parenLeft.setOriginX(1),
        this.parenRight.setOriginX(1))
    }
    getCategory() {
        return w1.CATEGORY
    }
    getWidth() {
        const t = this.cautionary ? z1(this.parenLeft) + z1(this.parenRight) + this.render_options.parenLeftPadding + this.render_options.parenRightPadding : 0;
        return z1(this.glyph) + t
    }
    setNote(t) {
        if (!t)
            throw new f.RERR("ArgumentError",`Bad note value: ${t}`);
        this.note = t,
        this.note.getCategory() === "gracenotes" && (this.render_options.font_scale = 25,
        this.reset())
    }
    setAsCautionary() {
        return this.cautionary = !0,
        this.render_options.font_scale = 28,
        this.reset(),
        this
    }
    draw() {
        const {context: t, type: e, position: i, note: s, index: n, cautionary: o, x_shift: l, y_shift: c, glyph: d, parenLeft: u, parenRight: b, render_options: {parenLeftPadding: r, parenRightPadding: h}} = this;
        if (this.checkContext(),
        !(s && n != null))
            throw new f.RERR("NoAttachedNote","Can't draw accidental without a note and index.");
        const m = s.getModifierStartXY(i, n);
        let _ = m.x + l;
        const x = m.y + c;
        e2("Rendering: ", e, _, x),
        o ? (b.render(t, _, x),
        _ -= z1(b),
        _ -= h,
        _ -= this.accidental.parenRightPaddingAdjustment,
        d.render(t, _, x),
        _ -= z1(d),
        _ -= r,
        u.render(t, _, x)) : d.render(t, _, x),
        this.setRendered()
    }
}
class I1 extends M {
    static get CATEGORY() {
        return "notesubgroup"
    }
    static format(t, e) {
        if (!t || t.length === 0)
            return !1;
        let i = 0;
        for (let s = 0; s < t.length; ++s) {
            const n = t[s];
            n.preFormat(),
            i += n.getWidth()
        }
        return e.left_shift += i,
        !0
    }
    constructor(t) {
        super();
        return this.setAttribute("type", "NoteSubGroup"),
        this.note = null,
        this.index = null,
        this.position = M.Position.LEFT,
        this.subNotes = t,
        this.subNotes.forEach(e=>{
            e.ignore_ticks = !1
        }
        ),
        this.width = 0,
        this.preFormatted = !1,
        this.formatter = new i1,
        this.voice = new $({
            num_beats: 4,
            beat_value: 4,
            resolution: y.RESOLUTION
        }).setStrict(!1),
        this.voice.addTickables(this.subNotes),
        this
    }
    getCategory() {
        return I1.CATEGORY
    }
    preFormat() {
        this.preFormatted || (this.formatter.joinVoices([this.voice]).format([this.voice], 0),
        this.setWidth(this.formatter.getMinTotalWidth()),
        this.preFormatted = !0)
    }
    setNote(t) {
        this.note = t
    }
    setWidth(t) {
        this.width = t
    }
    getWidth() {
        return this.width
    }
    draw() {
        this.checkContext();
        const t = this.getNote();
        if (!(t && this.index !== null))
            throw new f.RuntimeError("NoAttachedNote","Can't draw notes without a parent note and parent note index.");
        this.setRendered(),
        this.alignSubNotesWithNote(this.subNotes, t),
        this.subNotes.forEach(e=>e.setContext(this.context).drawWithStyle())
    }
}
class i2 extends X {
    constructor(t, e) {
        super();
        this.setAttribute("type", "StaveTie"),
        this.notes = t,
        this.context = null,
        this.text = e,
        this.direction = null,
        this.render_options = {
            cp1: 8,
            cp2: 12,
            text_shift_x: 0,
            first_x_shift: 0,
            last_x_shift: 0,
            y_shift: 7,
            tie_spacing: 0,
            font: {
                family: "Arial",
                size: 10,
                style: ""
            }
        },
        this.font = this.render_options.font,
        this.setNotes(t)
    }
    setFont(t) {
        return this.font = t,
        this
    }
    setDirection(t) {
        return this.direction = t,
        this
    }
    setNotes(t) {
        if (!t.first_note && !t.last_note)
            throw new f.RuntimeError("BadArguments","Tie needs to have either first_note or last_note set.");
        if (t.first_indices || (t.first_indices = [0]),
        t.last_indices || (t.last_indices = [0]),
        t.first_indices.length !== t.last_indices.length)
            throw new f.RuntimeError("BadArguments","Tied notes must have similar index sizes");
        return this.first_note = t.first_note,
        this.first_indices = t.first_indices,
        this.last_note = t.last_note,
        this.last_indices = t.last_indices,
        this
    }
    isPartial() {
        return !this.first_note || !this.last_note
    }
    renderTie(t) {
        if (t.first_ys.length === 0 || t.last_ys.length === 0)
            throw new f.RERR("BadArguments","No Y-values to render");
        const e = this.context;
        let i = this.render_options.cp1
          , s = this.render_options.cp2;
        Math.abs(t.last_x_px - t.first_x_px) < 10 && (i = 2,
        s = 8);
        const n = this.render_options.first_x_shift
          , o = this.render_options.last_x_shift
          , l = this.render_options.y_shift * t.direction;
        for (let c = 0; c < this.first_indices.length; ++c) {
            const d = (t.last_x_px + o + (t.first_x_px + n)) / 2
              , u = t.first_ys[this.first_indices[c]] + l
              , b = t.last_ys[this.last_indices[c]] + l;
            if (isNaN(u) || isNaN(b))
                throw new f.RERR("BadArguments","Bad indices for tie rendering.");
            const r = (u + b) / 2 + i * t.direction
              , h = (u + b) / 2 + s * t.direction;
            e.beginPath(),
            e.moveTo(t.first_x_px + n, u),
            e.quadraticCurveTo(d, r, t.last_x_px + o, b),
            e.quadraticCurveTo(d, h, t.first_x_px + n, u),
            e.closePath(),
            e.fill()
        }
    }
    renderText(t, e) {
        if (!this.text)
            return;
        let i = (t + e) / 2;
        i -= this.context.measureText(this.text).width / 2,
        this.context.save(),
        this.context.setFont(this.font.family, this.font.size, this.font.style),
        this.context.fillText(this.text, i + this.render_options.text_shift_x, (this.first_note || this.last_note).getStave().getYForTopText() - 1),
        this.context.restore()
    }
    draw() {
        this.checkContext(),
        this.setRendered();
        const t = this.first_note
          , e = this.last_note;
        let i, s, n, o, l;
        return t ? (i = t.getTieRightX() + this.render_options.tie_spacing,
        l = t.getStemDirection(),
        n = t.getYs()) : (i = e.getStave().getTieStartX(),
        n = e.getYs(),
        this.first_indices = this.last_indices),
        e ? (s = e.getTieLeftX() + this.render_options.tie_spacing,
        l = e.getStemDirection(),
        o = e.getYs()) : (s = t.getStave().getTieEndX(),
        o = t.getYs(),
        this.last_indices = this.first_indices),
        this.direction && (l = this.direction),
        this.renderTie({
            first_x_px: i,
            last_x_px: s,
            first_ys: n,
            last_ys: o,
            direction: l
        }),
        this.renderText(i, s),
        !0
    }
}
class R1 extends i2 {
    static createHammeron(t) {
        return new R1(t,"H")
    }
    static createPulloff(t) {
        return new R1(t,"P")
    }
    constructor(t, e) {
        super(t, e);
        this.setAttribute("type", "TabTie"),
        this.render_options.cp1 = 9,
        this.render_options.cp2 = 11,
        this.render_options.y_shift = 3,
        this.setNotes(t)
    }
    draw() {
        this.checkContext(),
        this.setRendered();
        const t = this.first_note
          , e = this.last_note;
        let i, s, n, o;
        return t ? (i = t.getTieRightX() + this.render_options.tie_spacing,
        n = t.getYs()) : (i = e.getStave().getTieStartX(),
        n = e.getYs(),
        this.first_indices = this.last_indices),
        e ? (s = e.getTieLeftX() + this.render_options.tie_spacing,
        o = e.getYs()) : (s = t.getStave().getTieEndX(),
        o = t.getYs(),
        this.last_indices = this.first_indices),
        this.renderTie({
            first_x_px: i,
            last_x_px: s,
            first_ys: n,
            last_ys: o,
            direction: -1
        }),
        this.renderText(i, s),
        !0
    }
}
function ft(...a) {
    N1.DEBUG && f.L("Vex.Flow.GraceNoteGroup", a)
}
class N1 extends M {
    static get CATEGORY() {
        return "gracenotegroups"
    }
    static format(t, e) {
        const i = 4
          , s = 0;
        if (!t || t.length === 0)
            return !1;
        const n = [];
        let o = null
          , l = 0;
        for (let u = 0; u < t.length; ++u) {
            const b = t[u]
              , r = b.getNote()
              , h = r.getCategory() === H.CATEGORY
              , m = h ? i : s;
            if (h && r !== o) {
                for (let _ = 0; _ < r.keys.length; ++_)
                    l = Math.max(r.getLeftDisplacedHeadPx(), l);
                o = r
            }
            n.push({
                shift: l,
                gracenote_group: b,
                spacing: m
            })
        }
        let c = n[0].shift, d;
        for (let u = 0; u < n.length; ++u) {
            const b = n[u].gracenote_group;
            b.preFormat(),
            d = b.getWidth() + n[u].spacing,
            c = Math.max(d, c)
        }
        for (let u = 0; u < n.length; ++u) {
            const b = n[u].gracenote_group;
            d = b.getWidth() + n[u].spacing,
            b.setSpacingFromNextModifier(c - Math.min(d, c))
        }
        return e.left_shift += c,
        !0
    }
    constructor(t, e) {
        super();
        return this.setAttribute("type", "GraceNoteGroup"),
        this.note = null,
        this.index = null,
        this.position = M.Position.LEFT,
        this.grace_notes = t,
        this.width = 0,
        this.preFormatted = !1,
        this.show_slur = e,
        this.slur = null,
        this.formatter = new i1,
        this.voice = new $({
            num_beats: 4,
            beat_value: 4,
            resolution: y.RESOLUTION
        }).setStrict(!1),
        this.render_options = {
            slur_y_shift: 0
        },
        this.beams = [],
        this.voice.addTickables(this.grace_notes),
        this
    }
    getCategory() {
        return N1.CATEGORY
    }
    preFormat() {
        this.preFormatted || (this.formatter.joinVoices([this.voice]).format([this.voice], 0),
        this.setWidth(this.formatter.getMinTotalWidth()),
        this.preFormatted = !0)
    }
    beamNotes(t) {
        if (t = t || this.grace_notes,
        t.length > 1) {
            const e = new f1(t);
            e.render_options.beam_width = 3,
            e.render_options.partial_beam_length = 4,
            this.beams.push(e)
        }
        return this
    }
    setNote(t) {
        this.note = t
    }
    setWidth(t) {
        this.width = t
    }
    getWidth() {
        return this.width
    }
    getGraceNotes() {
        return this.grace_notes
    }
    draw() {
        this.checkContext();
        const t = this.getNote();
        if (ft("Drawing grace note group for:", t),
        !(t && this.index !== null))
            throw new f.RuntimeError("NoAttachedNote","Can't draw grace note without a parent note and parent note index.");
        if (this.setRendered(),
        this.alignSubNotesWithNote(this.getGraceNotes(), t),
        this.grace_notes.forEach(e=>{
            e.setContext(this.context).draw()
        }
        ),
        this.beams.forEach(e=>{
            e.setContext(this.context).draw()
        }
        ),
        this.show_slur) {
            const e = this.getNote().getCategory() === H.CATEGORY
              , i = e ? i2 : R1;
            this.slur = new i({
                last_note: this.grace_notes[0],
                first_note: t,
                first_indices: [0],
                last_indices: [0]
            }),
            this.slur.render_options.cp2 = 12,
            this.slur.render_options.y_shift = (e ? 7 : 5) + this.render_options.slur_y_shift,
            this.slur.setContext(this.context).draw()
        }
    }
}
class K extends M {
    static get CATEGORY() {
        return "strokes"
    }
    static get Type() {
        return {
            BRUSH_DOWN: 1,
            BRUSH_UP: 2,
            ROLL_DOWN: 3,
            ROLL_UP: 4,
            RASQUEDO_DOWN: 5,
            RASQUEDO_UP: 6,
            ARPEGGIO_DIRECTIONLESS: 7
        }
    }
    static format(t, e) {
        const i = e.left_shift
          , s = 0;
        if (!t || t.length === 0)
            return this;
        const n = t.map(c=>{
            const d = c.getNote();
            if (d instanceof H) {
                const {line: u} = d.getKeyProps()[c.getIndex()]
                  , b = d.getLeftDisplacedHeadPx();
                return {
                    line: u,
                    shift: b,
                    stroke: c
                }
            } else {
                const {str: u} = d.getPositions()[c.getIndex()];
                return {
                    line: u,
                    shift: 0,
                    stroke: c
                }
            }
        }
        )
          , o = i
          , l = n.reduce((c,{stroke: d, shift: u})=>(d.setXShift(o + u),
        Math.max(d.getWidth() + s, c)), 0);
        return e.left_shift += l,
        !0
    }
    constructor(t, e) {
        super();
        this.setAttribute("type", "Stroke"),
        this.note = null,
        this.options = f.Merge({}, e),
        this.all_voices = "all_voices"in this.options ? this.options.all_voices : !0,
        this.note_end = null,
        this.index = null,
        this.type = t,
        this.position = M.Position.LEFT,
        this.render_options = {
            font_scale: 38,
            stroke_px: 3,
            stroke_spacing: 10
        },
        this.font = {
            family: "serif",
            size: 10,
            weight: "bold italic"
        },
        this.setXShift(0),
        this.setWidth(10)
    }
    getCategory() {
        return K.CATEGORY
    }
    getPosition() {
        return this.position
    }
    addEndNote(t) {
        return this.note_end = t,
        this
    }
    draw() {
        if (this.checkContext(),
        this.setRendered(),
        !(this.note && this.index != null))
            throw new f.RERR("NoAttachedNote","Can't draw stroke without a note and index.");
        const t = this.note.getModifierStartXY(this.position, this.index);
        let e = this.note.getYs()
          , i = t.y
          , s = t.y;
        const n = t.x - 5
          , o = this.note.stave.options.spacing_between_lines_px
          , l = this.getModifierContext().getModifiers(this.note.getCategory());
        for (let m = 0; m < l.length; m++) {
            e = l[m].getYs();
            for (let _ = 0; _ < e.length; _++)
                (this.note === l[m] || this.all_voices) && (i = f.Min(i, e[_]),
                s = f.Max(s, e[_]))
        }
        let c, d, u, b, r;
        switch (this.type) {
        case K.Type.BRUSH_DOWN:
            c = "arrowheadBlackUp",
            d = -3,
            u = i - o / 2 + 10,
            s += o / 2;
            break;
        case K.Type.BRUSH_UP:
            c = "arrowheadBlackDown",
            d = .5,
            u = s + o / 2,
            i -= o / 2;
            break;
        case K.Type.ROLL_DOWN:
        case K.Type.RASQUEDO_DOWN:
            c = "arrowheadBlackUp",
            d = -3,
            b = this.x_shift + d - 2,
            this.note instanceof H ? (i += 1.5 * o,
            (s - i) % 2 != 0 ? s += .5 * o : s += o,
            u = i - o,
            r = s + o + 2) : (i += 1.5 * o,
            s += o,
            u = i - .75 * o,
            r = s + .25 * o);
            break;
        case K.Type.ROLL_UP:
        case K.Type.RASQUEDO_UP:
            c = "arrowheadBlackDown",
            d = -4,
            b = this.x_shift + d - 1,
            this.note instanceof H ? (u = o / 2,
            i += .5 * o,
            (s - i) % 2 == 0 && (s += o / 2),
            u = s + .5 * o,
            r = i - 1.25 * o) : (i += .25 * o,
            s += .5 * o,
            u = s + .25 * o,
            r = i - o);
            break;
        case K.Type.ARPEGGIO_DIRECTIONLESS:
            i += .5 * o,
            s += o;
            break;
        default:
            throw new f.RERR("InvalidType",`The stroke type ${this.type} does not exist`)
        }
        let h = "straight";
        if (this.type === K.Type.BRUSH_DOWN || this.type === K.Type.BRUSH_UP)
            this.context.fillRect(n + this.x_shift, i, 1, s - i);
        else if (h = "wiggly",
        this.note instanceof H)
            for (let m = i; m <= s; m += o)
                E.renderGlyph(this.context, n + this.x_shift - 4, m, this.render_options.font_scale, "vexWiggleArpeggioUp");
        else {
            let m;
            for (m = i; m <= s; m += 10)
                E.renderGlyph(this.context, n + this.x_shift - 4, m, this.render_options.font_scale, "vexWiggleArpeggioUp");
            this.type === K.Type.RASQUEDO_DOWN && (r = m + .25 * o)
        }
        this.type !== K.Type.ARPEGGIO_DIRECTIONLESS && (E.renderGlyph(this.context, n + this.x_shift + d, u, this.render_options.font_scale, c, {
            category: `stroke.${c}.${h}`
        }),
        (this.type === K.Type.RASQUEDO_DOWN || this.type === K.Type.RASQUEDO_UP) && (this.context.save(),
        this.context.setFont(this.font.family, this.font.size, this.font.weight),
        this.context.fillText("R", n + b, r),
        this.context.restore()))
    }
}
class Y1 extends M {
    static get CATEGORY() {
        return "stringnumber"
    }
    static format(t, e) {
        const i = e.left_shift
          , s = e.right_shift
          , n = 1;
        if (!t || t.length === 0)
            return this;
        const o = [];
        let l = null, c = 0, d = 0, u, b, r, h;
        for (u = 0; u < t.length; ++u)
            for (b = t[u],
            r = b.getNote(),
            u = 0; u < t.length; ++u) {
                b = t[u],
                r = b.getNote(),
                h = b.getPosition();
                const T = r.getKeyProps()[b.getIndex()];
                if (r !== l) {
                    for (let w = 0; w < r.keys.length; ++w)
                        i === 0 && (c = Math.max(r.getLeftDisplacedHeadPx(), c)),
                        s === 0 && (d = Math.max(r.getRightDisplacedHeadPx(), d));
                    l = r
                }
                o.push({
                    pos: h,
                    note: r,
                    num: b,
                    line: T.line,
                    shiftL: c,
                    shiftR: d
                })
            }
        o.sort((T,w)=>w.line - T.line);
        let m = 0
          , _ = 0
          , x = 0
          , p = null
          , g = null;
        for (u = 0; u < o.length; ++u) {
            let T = 0;
            r = o[u].note,
            h = o[u].pos,
            b = o[u].num;
            const w = o[u].line;
            o[u].shiftL;
            const S = o[u].shiftR;
            (w !== p || r !== g) && (m = s + S);
            const v = b.getWidth() + n;
            h === M.Position.LEFT ? (b.setXShift(i),
            T = c + v,
            _ = T > _ ? T : _) : h === M.Position.RIGHT && (b.setXShift(m),
            T += v,
            x = T > x ? T : x),
            p = w,
            g = r
        }
        return e.left_shift += _,
        e.right_shift += x,
        !0
    }
    constructor(t) {
        super();
        this.setAttribute("type", "StringNumber"),
        this.note = null,
        this.last_note = null,
        this.index = null,
        this.string_number = t,
        this.setWidth(20),
        this.position = M.Position.ABOVE,
        this.x_shift = 0,
        this.y_shift = 0,
        this.x_offset = 0,
        this.y_offset = 0,
        this.dashed = !0,
        this.leg = O.LineEndType.NONE,
        this.radius = 8,
        this.font = {
            family: "sans-serif",
            size: 10,
            weight: "bold"
        }
    }
    getCategory() {
        return Y1.CATEGORY
    }
    getNote() {
        return this.note
    }
    setNote(t) {
        return this.note = t,
        this
    }
    getIndex() {
        return this.index
    }
    setIndex(t) {
        return this.index = t,
        this
    }
    setLineEndType(t) {
        return t >= O.LineEndType.NONE && t <= O.LineEndType.DOWN && (this.leg = t),
        this
    }
    setStringNumber(t) {
        return this.string_number = t,
        this
    }
    setOffsetX(t) {
        return this.x_offset = t,
        this
    }
    setOffsetY(t) {
        return this.y_offset = t,
        this
    }
    setLastNote(t) {
        return this.last_note = t,
        this
    }
    setDashed(t) {
        return this.dashed = t,
        this
    }
    draw() {
        const t = this.checkContext();
        if (!(this.note && this.index != null))
            throw new f.RERR("NoAttachedNote","Can't draw string number without a note and index.");
        this.setRendered();
        const e = this.note.stave.options.spacing_between_lines_px
          , i = this.note.getModifierStartXY(this.position, this.index);
        let s = i.x + this.x_shift + this.x_offset
          , n = i.y + this.y_shift + this.y_offset;
        switch (this.position) {
        case M.Position.ABOVE:
        case M.Position.BELOW:
            {
                const l = this.note.getStemExtents();
                let c = l.topY
                  , d = l.baseY + 2;
                this.note.stem_direction === H.STEM_DOWN && (c = l.baseY,
                d = l.topY - 2),
                this.position === M.Position.ABOVE ? n = this.note.hasStem() ? c - e * 1.75 : i.y - e * 1.75 : n = this.note.hasStem() ? d + e * 1.5 : i.y + e * 1.75,
                n += this.y_shift + this.y_offset;
                break
            }
        case M.Position.LEFT:
            s -= this.radius / 2 + 5;
            break;
        case M.Position.RIGHT:
            s += this.radius / 2 + 6;
            break;
        default:
            throw new f.RERR("InvalidPosition",`The position ${this.position} is invalid`)
        }
        t.save(),
        t.beginPath(),
        t.arc(s, n, this.radius, 0, Math.PI * 2, !1),
        t.lineWidth = 1.5,
        t.stroke(),
        t.setFont(this.font.family, this.font.size, this.font.weight);
        const o = s - t.measureText(this.string_number).width / 2;
        if (t.fillText("" + this.string_number, o, n + 4.5),
        this.last_note != null) {
            const l = this.last_note.getStemX() - this.note.getX() + 5;
            t.strokeStyle = "#000000",
            t.lineCap = "round",
            t.lineWidth = .6,
            this.dashed ? O.drawDashedLine(t, s + 10, n, s + l, n, [3, 3]) : O.drawDashedLine(t, s + 10, n, s + l, n, [3, 0]);
            let c, d;
            switch (this.leg) {
            case O.LineEndType.UP:
                c = -10,
                d = this.dashed ? [3, 3] : [3, 0],
                O.drawDashedLine(t, s + l, n, s + l, n + c, d);
                break;
            case O.LineEndType.DOWN:
                c = 10,
                d = this.dashed ? [3, 3] : [3, 0],
                O.drawDashedLine(t, s + l, n, s + l, n + c, d);
                break
            }
        }
        t.restore()
    }
}
function _t(...a) {
    d1.DEBUG && f.L("Vex.Flow.Articulation", a)
}
const {ABOVE: p1, BELOW: G1} = M.Position
  , q2 = (a,t)=>a(t / .5) * .5
  , u2 = (a,t)=>t === p1 ? a <= 5 : a >= 1
  , Q2 = (a,t)=>u2(a, t) ? t === p1 ? Math.ceil : Math.floor : Math.round
  , pt = (a,t,e,i)=>{
    const s = q2(Q2(t, e), t)
      , n = a && u2(s, e)
      , o = s % 1 == 0;
    return n && o ? s + .5 * -i : s
}
  , f2 = a=>{
    const t = a.getCategory();
    return t === "stavenotes" || t === "gracenotes"
}
  , xt = (a,t)=>{
    const e = a.getStave()
      , i = a.getStemDirection()
      , {topY: s, baseY: n} = a.getStemExtents();
    if (f2(a))
        return a.hasStem() ? i === P.UP ? s : n : Math.min(...a.getYs());
    if (a.getCategory() === "tabnotes")
        return a.hasStem() && i === P.UP ? s : e.getYForTopText(t);
    throw new f.RERR("UnknownCategory","Only can get the top and bottom ys of stavenotes and tabnotes")
}
  , gt = (a,t)=>{
    const e = a.getStave()
      , i = a.getStemDirection()
      , {topY: s, baseY: n} = a.getStemExtents();
    if (f2(a))
        return a.hasStem() ? i === P.UP ? n : s : Math.max(...a.getYs());
    if (a.getCategory() === "tabnotes")
        return a.hasStem() ? i === P.UP ? e.getYForBottomText(t) : s : e.getYForBottomText(t);
    throw new f.RERR("UnknownCategory","Only can get the top and bottom ys of stavenotes and tabnotes")
}
  , yt = (a,t)=>{
    const e = t === p1 && a.getStemDirection() === P.UP || t === G1 && a.getStemDirection() === P.DOWN;
    return f2(a) ? a.hasStem() && e ? .5 : 1 : a.hasStem() && e ? 1 : 0
}
;
class d1 extends M {
    static get CATEGORY() {
        return "articulations"
    }
    static get INITIAL_OFFSET() {
        return -.5
    }
    static format(t, e) {
        if (!t || t.length === 0)
            return !1;
        const i = c=>c.getPosition() === p1
          , s = c=>c.getPosition() === G1
          , n = .5
          , o = (c,d,u)=>q2(Q2(d, u), c.glyph.getMetrics().height / 10 + n);
        t.filter(i).forEach(c=>{
            c.setTextLine(e.top_text_line),
            e.top_text_line += o(c, e.top_text_line, p1)
        }
        ),
        t.filter(s).forEach(c=>{
            c.setTextLine(e.text_line),
            e.text_line += o(c, e.text_line, G1)
        }
        );
        const l = t.map(c=>c.getWidth()).reduce((c,d)=>Math.max(d, c));
        return e.left_shift += l / 2,
        e.right_shift += l / 2,
        !0
    }
    static easyScoreHook({articulations: t}, e, i) {
        if (!t)
            return;
        const s = {
            staccato: "a.",
            tenuto: "a-"
        };
        t.split(",").map(n=>n.trim().split(".")).map(([n,o])=>{
            const l = {
                type: s[n]
            };
            return o && (l.position = M.PositionString[o]),
            i.getFactory().Articulation(l)
        }
        ).map(n=>e.addModifier(0, n))
    }
    constructor(t) {
        super();
        this.setAttribute("type", "Articulation"),
        this.note = null,
        this.index = null,
        this.type = t,
        this.position = G1,
        this.render_options = {
            font_scale: 38
        },
        this.reset()
    }
    reset() {
        if (this.articulation = y.articulationCodes(this.type),
        !this.articulation)
            throw new f.RERR("ArgumentError",`Articulation not found: ${this.type}`);
        const t = (this.position === p1 ? this.articulation.aboveCode : this.articulation.belowCode) || this.articulation.code;
        this.glyph = new E(t,this.render_options.font_scale),
        this.setWidth(this.glyph.getMetrics().width)
    }
    getCategory() {
        return d1.CATEGORY
    }
    draw() {
        const {note: t, index: e, position: i, glyph: s, articulation: {between_lines: n}, text_line: o, context: l} = this;
        if (this.checkContext(),
        !t || e == null)
            throw new f.RERR("NoAttachedNote","Can't draw Articulation without a note and index.");
        this.setRendered();
        const c = t.getStave()
          , d = c.getSpacingBetweenLines()
          , u = t.getCategory() === "tabnotes"
          , {x: b} = t.getModifierStartXY(i, e)
          , r = !n || u
          , h = yt(t, i)
          , m = this.musicFont.lookupMetric(`articulation.${s.getCode()}.padding`, 0);
        let _ = {
            [p1]: ()=>{
                s.setOrigin(.5, 1);
                const x = xt(t, o) - (o + h) * d;
                return r ? Math.min(c.getYForTopText(d1.INITIAL_OFFSET), x) : x
            }
            ,
            [G1]: ()=>{
                s.setOrigin(.5, 0);
                const x = gt(t, o) + (o + h) * d;
                return r ? Math.max(c.getYForBottomText(d1.INITIAL_OFFSET), x) : x
            }
        }[i]();
        if (!u) {
            const x = i === p1 ? -1 : 1
              , p = u ? t.positions[e].str : t.getKeyProps()[e].line
              , T = (t.getYs()[e] - _) / d + p
              , w = pt(n, T, i, x);
            u2(w, i) && s.setOrigin(.5, .5),
            _ += Math.abs(w - T) * d * x + m * x
        }
        _t(`Rendering articulation at (x: ${b}, y: ${_})`),
        s.render(l, b, _)
    }
}
class B1 extends K2 {
    static getNextContext(t) {
        const e = t.tContexts
          , i = e.indexOf(t);
        return e[i + 1]
    }
    constructor(t) {
        super();
        this.tickID = t && t.tickID,
        this.setAttribute("type", "TickContext"),
        this.currentTick = new k(0,1),
        this.maxTicks = new k(0,1),
        this.maxTickable = null,
        this.minTicks = null,
        this.minTickable = null,
        this.padding = 1,
        this.x = 0,
        this.xBase = 0,
        this.xOffset = 0,
        this.tickables = [],
        this.tickablesByVoice = {},
        this.notePx = 0,
        this.glyphPx = 0,
        this.leftDisplacedHeadPx = 0,
        this.rightDisplacedHeadPx = 0,
        this.modLeftPx = 0,
        this.modRightPx = 0,
        this.totalLeftPx = 0,
        this.totalRightPx = 0,
        this.tContexts = []
    }
    getTickID() {
        return this.tickID
    }
    getX() {
        return this.x
    }
    setX(t) {
        return this.x = t,
        this.xBase = t,
        this.xOffset = 0,
        this
    }
    getXBase() {
        return this.xBase
    }
    setXBase(t) {
        this.xBase = t,
        this.x = t + this.xOffset
    }
    getXOffset() {
        return this.xOffset
    }
    setXOffset(t) {
        this.xOffset = t,
        this.x = this.xBase + t
    }
    getWidth() {
        return this.width + this.padding * 2
    }
    setPadding(t) {
        return this.padding = t,
        this
    }
    getMaxTicks() {
        return this.maxTicks
    }
    getMinTicks() {
        return this.minTicks
    }
    getMaxTickable() {
        return this.maxTickable
    }
    getMinTickable() {
        return this.minTickable
    }
    getTickables() {
        return this.tickables
    }
    getTickablesForVoice(t) {
        return this.tickablesByVoice[t]
    }
    getTickablesByVoice() {
        return this.tickablesByVoice
    }
    getCenterAlignedTickables() {
        return this.tickables.filter(t=>t.isCenterAligned())
    }
    getMetrics() {
        const {width: t, glyphPx: e, notePx: i, leftDisplacedHeadPx: s, rightDisplacedHeadPx: n, modLeftPx: o, modRightPx: l, totalLeftPx: c, totalRightPx: d} = this;
        return {
            width: t,
            glyphPx: e,
            notePx: i,
            leftDisplacedHeadPx: s,
            rightDisplacedHeadPx: n,
            modLeftPx: o,
            modRightPx: l,
            totalLeftPx: c,
            totalRightPx: d
        }
    }
    getCurrentTick() {
        return this.currentTick
    }
    setCurrentTick(t) {
        this.currentTick = t,
        this.preFormatted = !1
    }
    addTickable(t, e) {
        if (!t)
            throw new f.RERR("BadArgument","Invalid tickable added.");
        if (!t.shouldIgnoreTicks()) {
            this.ignore_ticks = !1;
            const i = t.getTicks();
            i.greaterThan(this.maxTicks) && (this.maxTicks = i.clone(),
            this.maxTickable = t),
            this.minTicks == null ? (this.minTicks = i.clone(),
            this.minTickable = t) : i.lessThan(this.minTicks) && (this.minTicks = i.clone(),
            this.minTickable = t)
        }
        return t.setTickContext(this),
        this.tickables.push(t),
        this.tickablesByVoice[e] = t,
        this.preFormatted = !1,
        this
    }
    preFormat() {
        if (this.preFormatted)
            return this;
        for (let t = 0; t < this.tickables.length; ++t) {
            const e = this.tickables[t];
            e.preFormat();
            const i = e.getMetrics();
            this.leftDisplacedHeadPx = Math.max(this.leftDisplacedHeadPx, i.leftDisplacedHeadPx),
            this.rightDisplacedHeadPx = Math.max(this.rightDisplacedHeadPx, i.rightDisplacedHeadPx),
            this.notePx = Math.max(this.notePx, i.notePx),
            this.glyphPx = Math.max(this.glyphPx, i.glyphWidth),
            this.modLeftPx = Math.max(this.modLeftPx, i.modLeftPx),
            this.modRightPx = Math.max(this.modRightPx, i.modRightPx),
            this.totalLeftPx = Math.max(this.totalLeftPx, i.modLeftPx + i.leftDisplacedHeadPx),
            this.totalRightPx = Math.max(this.totalRightPx, i.modRightPx + i.rightDisplacedHeadPx),
            this.width = this.notePx + this.totalLeftPx + this.totalRightPx
        }
        return this
    }
    postFormat() {
        return this.postFormatted ? this : (this.postFormatted = !0,
        this)
    }
}
function wt(...a) {
    X1.DEBUG && f.L("Vex.Flow.Ornament", a)
}
class X1 extends M {
    static get CATEGORY() {
        return "ornaments"
    }
    static format(t, e) {
        if (!t || t.length === 0)
            return !1;
        let i = 0;
        for (let s = 0; s < t.length; ++s) {
            const n = t[s]
              , o = 2;
            i = Math.max(n.getWidth(), i),
            n.getPosition() === M.Position.ABOVE ? (n.setTextLine(e.top_text_line),
            e.top_text_line += o) : (n.setTextLine(e.text_line),
            e.text_line += o)
        }
        return e.left_shift += i / 2,
        e.right_shift += i / 2,
        !0
    }
    constructor(t) {
        super();
        if (this.setAttribute("type", "Ornament"),
        this.note = null,
        this.index = null,
        this.type = t,
        this.position = M.Position.ABOVE,
        this.delayed = !1,
        this.accidentalUpper = null,
        this.accidentalLower = null,
        this.render_options = {
            font_scale: 38,
            accidentalLowerPadding: 3,
            accidentalUpperPadding: 3
        },
        this.ornament = y.ornamentCodes(this.type),
        !this.ornament)
            throw new f.RERR("ArgumentError",`Ornament not found: '${this.type}'`);
        this.glyph = new E(this.ornament.code,this.render_options.font_scale,{
            category: `ornament.${this.ornament.code}`
        }),
        this.glyph.setOrigin(.5, 1)
    }
    getCategory() {
        return X1.CATEGORY
    }
    setDelayed(t) {
        return this.delayed = t,
        this
    }
    setUpperAccidental(t) {
        const e = this.render_options.font_scale / 1.3;
        return this.accidentalUpper = new E(y.accidentalCodes(t).code,e),
        this.accidentalUpper.setOrigin(.5, 1),
        this
    }
    setLowerAccidental(t) {
        const e = this.render_options.font_scale / 1.3;
        return this.accidentalLower = new E(y.accidentalCodes(t).code,e),
        this.accidentalLower.setOrigin(.5, 1),
        this
    }
    draw() {
        if (this.checkContext(),
        !this.note || this.index == null)
            throw new f.RERR("NoAttachedNote","Can't draw Ornament without a note and index.");
        this.setRendered();
        const t = this.context
          , e = this.note.getStemDirection()
          , i = this.note.getStave()
          , s = this.note.getStem().getExtents();
        let n = e === H.STEM_DOWN ? s.baseY : s.topY;
        this.note.getCategory() === "tabnotes" && (this.note.hasStem() ? e === H.STEM_DOWN && (n = i.getYForTopText(this.text_line)) : n = i.getYForTopText(this.text_line));
        const o = e === H.STEM_DOWN
          , l = i.getSpacingBetweenLines();
        let c = 1;
        !o && this.note.beam && (c += .5);
        const d = l * (this.text_line + c)
          , u = n - d;
        let r = this.note.getModifierStartXY(this.position, this.index).x
          , h = Math.min(i.getYForTopText(this.text_line), u);
        if (h += this.y_shift,
        this.delayed) {
            let m = 0;
            if (this.delayXShift !== void 0)
                m = this.delayXShift;
            else {
                m += this.glyph.getMetrics().width / 2;
                const _ = B1.getNextContext(this.note.getTickContext());
                _ ? m += (_.getX() - r) * .5 : m += (i.x + i.width - r) * .5,
                this.delayXShift = m
            }
            r += m
        }
        wt("Rendering ornament: ", this.ornament, r, h),
        this.accidentalLower && (this.accidentalLower.render(t, r, h),
        h -= this.accidentalLower.getMetrics().height,
        h -= this.render_options.accidentalLowerPadding),
        this.glyph.render(t, r, h),
        h -= this.glyph.getMetrics().height,
        this.accidentalUpper && (h -= this.render_options.accidentalUpperPadding,
        this.accidentalUpper.render(t, r, h))
    }
}
function Tt(...a) {
    Y.DEBUG && f.L("Vex.Flow.Annotation", a)
}
class Y extends M {
    static get CATEGORY() {
        return "annotations"
    }
    static get Justify() {
        return {
            LEFT: 1,
            CENTER: 2,
            RIGHT: 3,
            CENTER_STEM: 4
        }
    }
    static get JustifyString() {
        return {
            left: Y.Justify.LEFT,
            right: Y.Justify.RIGHT,
            center: Y.Justify.CENTER,
            centerStem: Y.Justify.CENTER_STEM
        }
    }
    static get VerticalJustify() {
        return {
            TOP: 1,
            CENTER: 2,
            BOTTOM: 3,
            CENTER_STEM: 4
        }
    }
    static get VerticalJustifyString() {
        return {
            above: Y.VerticalJustify.TOP,
            top: Y.VerticalJustify.TOP,
            below: Y.VerticalJustify.BOTTOM,
            bottom: Y.VerticalJustify.BOTTOM,
            center: Y.VerticalJustify.CENTER,
            centerStem: Y.VerticalJustify.CENTER_STEM
        }
    }
    static format(t, e) {
        if (!t || t.length === 0)
            return !1;
        let i = 0;
        for (let s = 0; s < t.length; ++s) {
            const n = t[s];
            i = Math.max(n.getWidth(), i),
            n.getPosition() === M.Position.ABOVE ? (n.setTextLine(e.top_text_line),
            e.top_text_line++) : (n.setTextLine(e.text_line),
            e.text_line++)
        }
        return e.left_shift += i / 2,
        e.right_shift += i / 2,
        !0
    }
    constructor(t) {
        super();
        this.setAttribute("type", "Annotation"),
        this.note = null,
        this.index = null,
        this.text = t,
        this.justification = Y.Justify.CENTER,
        this.vert_justification = Y.VerticalJustify.TOP,
        this.font = {
            family: "Arial",
            size: 10,
            weight: ""
        },
        this.setWidth(y.textWidth(t))
    }
    getCategory() {
        return Y.CATEGORY
    }
    setFont(t, e, i) {
        return this.font = {
            family: t,
            size: e,
            weight: i
        },
        this
    }
    setVerticalJustification(t) {
        return this.vert_justification = typeof t == "string" ? Y.VerticalJustifyString[t] : t,
        this
    }
    getJustification() {
        return this.justification
    }
    setJustification(t) {
        return this.justification = typeof t == "string" ? Y.JustifyString[t] : t,
        this
    }
    draw() {
        if (this.checkContext(),
        !this.note)
            throw new f.RERR("NoNoteForAnnotation","Can't draw text annotation without an attached note.");
        this.setRendered();
        const t = this.note.getModifierStartXY(M.Position.ABOVE, this.index);
        this.context.save(),
        this.context.setFont(this.font.family, this.font.size, this.font.weight);
        const e = this.context.measureText(this.text).width
          , i = this.context.measureText("m").width;
        let s, n;
        this.justification === Y.Justify.LEFT ? s = t.x : this.justification === Y.Justify.RIGHT ? s = t.x - e : this.justification === Y.Justify.CENTER ? s = t.x - e / 2 : s = this.note.getStemX() - e / 2;
        let o, l;
        const c = this.note.hasStem()
          , d = this.note.getStave();
        if (c && (o = this.note.getStem().getExtents(),
        l = d.getSpacingBetweenLines()),
        this.vert_justification === Y.VerticalJustify.BOTTOM) {
            if (n = d.getYForBottomText(this.text_line + y.TEXT_HEIGHT_OFFSET_HACK),
            c) {
                const u = this.note.getStemDirection() === 1 ? o.baseY : o.topY;
                n = Math.max(n, u + l * (this.text_line + 2))
            }
        } else if (this.vert_justification === Y.VerticalJustify.CENTER) {
            const u = this.note.getYForTopText(this.text_line) - 1
              , b = d.getYForBottomText(this.text_line);
            n = u + (b - u) / 2 + i / 2
        } else if (this.vert_justification === Y.VerticalJustify.TOP)
            n = Math.min(d.getYForTopText(this.text_line), this.note.getYs()[0] - 10),
            c && (n = Math.min(n, o.topY - 5 - l * this.text_line));
        else {
            const u = this.note.getStemExtents();
            n = u.topY + (u.baseY - u.topY) / 2 + i / 2
        }
        Tt("Rendering annotation: ", this.text, s, n),
        this.context.fillText(this.text, s, n),
        this.context.restore()
    }
}
class Z extends M {
    static get CATEGORY() {
        return "bends"
    }
    static get UP() {
        return 0
    }
    static get DOWN() {
        return 1
    }
    static format(t, e) {
        if (!t || t.length === 0)
            return !1;
        let i = 0;
        const s = e.top_text_line;
        for (let n = 0; n < t.length; ++n) {
            const o = t[n];
            o.setXShift(i),
            i = o.getWidth(),
            o.setTextLine(s)
        }
        return e.right_shift += i,
        e.top_text_line += 1,
        !0
    }
    constructor(t, e, i) {
        super();
        this.setAttribute("type", "Bend"),
        this.text = t,
        this.x_shift = 0,
        this.release = e || !1,
        this.font = "10pt Arial",
        this.render_options = {
            line_width: 1.5,
            line_style: "#777777",
            bend_width: 8,
            release_width: 8
        },
        i ? this.phrase = i : (this.phrase = [{
            type: Z.UP,
            text: this.text
        }],
        this.release && this.phrase.push({
            type: Z.DOWN,
            text: ""
        })),
        this.updateWidth()
    }
    getCategory() {
        return Z.CATEGORY
    }
    setXShift(t) {
        this.x_shift = t,
        this.updateWidth()
    }
    setFont(t) {
        return this.font = t,
        this
    }
    getText() {
        return this.text
    }
    updateWidth() {
        const t = this;
        function e(s) {
            let n;
            return t.context ? n = t.context.measureText(s).width : n = y.textWidth(s),
            n
        }
        let i = 0;
        for (let s = 0; s < this.phrase.length; ++s) {
            const n = this.phrase[s];
            if ("width"in n)
                i += n.width;
            else {
                const o = n.type === Z.UP ? this.render_options.bend_width : this.render_options.release_width;
                n.width = f.Max(o, e(n.text)) + 3,
                n.draw_width = n.width / 2,
                i += n.width
            }
        }
        return this.setWidth(i + this.x_shift),
        this
    }
    draw() {
        if (this.checkContext(),
        !(this.note && this.index != null))
            throw new f.RERR("NoNoteForBend","Can't draw bend without a note or index.");
        this.setRendered();
        const t = this.note.getModifierStartXY(M.Position.RIGHT, this.index);
        t.x += 3,
        t.y += .5;
        const e = this.x_shift
          , i = this.context
          , s = this.note.getStave().getYForTopText(this.text_line) + 3
          , n = this.note.getStave().getYForTopText(this.text_line) - 1
          , o = this;
        function l(h, m, _, x) {
            const p = h + _
              , g = m;
            i.save(),
            i.beginPath(),
            i.setLineWidth(o.render_options.line_width),
            i.setStrokeStyle(o.render_options.line_style),
            i.setFillStyle(o.render_options.line_style),
            i.moveTo(h, m),
            i.quadraticCurveTo(p, g, h + _, x),
            i.stroke(),
            i.restore()
        }
        function c(h, m, _, x) {
            i.save(),
            i.beginPath(),
            i.setLineWidth(o.render_options.line_width),
            i.setStrokeStyle(o.render_options.line_style),
            i.setFillStyle(o.render_options.line_style),
            i.moveTo(h, x),
            i.quadraticCurveTo(h + _, x, h + _, m),
            i.stroke(),
            i.restore()
        }
        function d(h, m, _) {
            const x = 4
              , p = _ || 1;
            i.beginPath(),
            i.moveTo(h, m),
            i.lineTo(h - x, m + x * p),
            i.lineTo(h + x, m + x * p),
            i.closePath(),
            i.fill()
        }
        function u(h, m) {
            i.save(),
            i.setRawFont(o.font);
            const _ = h - i.measureText(m).width / 2;
            i.fillText(m, _, n),
            i.restore()
        }
        let b = null
          , r = 0;
        for (let h = 0; h < this.phrase.length; ++h) {
            const m = this.phrase[h];
            h === 0 && (m.draw_width += e),
            r = m.draw_width + (b ? b.draw_width : 0) - (h === 1 ? e : 0),
            m.type === Z.UP && (b && b.type === Z.UP && d(t.x, s),
            l(t.x, t.y, r, s)),
            m.type === Z.DOWN && (b && b.type === Z.UP && c(t.x, t.y, r, s),
            b && b.type === Z.DOWN && (d(t.x, t.y, -1),
            c(t.x, t.y, r, s)),
            b === null && (r = m.draw_width,
            c(t.x, t.y, r, s))),
            u(t.x + r, m.text),
            b = m,
            b.x = t.x,
            t.x += r
        }
        b.type === Z.UP ? d(b.x + r, s) : b.type === Z.DOWN && d(b.x + r, t.y, -1)
    }
}
class F1 extends M {
    static get CATEGORY() {
        return "vibratos"
    }
    static format(t, e, i) {
        if (!t || t.length === 0)
            return !1;
        let s = e.top_text_line
          , n = 0
          , o = e.right_shift - 7;
        const l = i.getModifiers(Z.CATEGORY);
        l && l.length > 0 && s--;
        for (let c = 0; c < t.length; ++c) {
            const d = t[c];
            d.setXShift(o),
            d.setTextLine(s),
            n += d.getWidth(),
            o += n
        }
        return e.right_shift += n,
        e.top_text_line += 1,
        !0
    }
    constructor() {
        super();
        this.setAttribute("type", "Vibrato"),
        this.position = M.Position.RIGHT,
        this.render_options = {
            harsh: !1,
            vibrato_width: 20,
            wave_height: 6,
            wave_width: 4,
            wave_girth: 2
        },
        this.setVibratoWidth(this.render_options.vibrato_width)
    }
    getCategory() {
        return F1.CATEGORY
    }
    setHarsh(t) {
        return this.render_options.harsh = t,
        this
    }
    setVibratoWidth(t) {
        return this.render_options.vibrato_width = t,
        this.setWidth(t),
        this
    }
    draw() {
        const t = this.checkContext();
        if (!this.note)
            throw new f.RERR("NoNoteForVibrato","Can't draw vibrato without an attached note.");
        this.setRendered();
        const i = this.note.getModifierStartXY(M.Position.RIGHT, this.index).x + this.x_shift
          , s = this.note.getYForTopText(this.text_line) + 2;
        F1.renderVibrato(t, i, s, this.render_options)
    }
    static renderVibrato(t, e, i, s) {
        const {harsh: n, vibrato_width: o, wave_width: l, wave_girth: c, wave_height: d} = s
          , u = o / l;
        t.beginPath();
        let b;
        if (n) {
            for (t.moveTo(e, i + c + 1),
            b = 0; b < u / 2; ++b)
                t.lineTo(e + l, i - d / 2),
                e += l,
                t.lineTo(e + l, i + d / 2),
                e += l;
            for (b = 0; b < u / 2; ++b)
                t.lineTo(e - l, i - d / 2 + c + 1),
                e -= l,
                t.lineTo(e - l, i + d / 2 + c + 1),
                e -= l;
            t.fill()
        } else {
            for (t.moveTo(e, i + c),
            b = 0; b < u / 2; ++b)
                t.quadraticCurveTo(e + l / 2, i - d / 2, e + l, i),
                e += l,
                t.quadraticCurveTo(e + l / 2, i + d / 2, e + l, i),
                e += l;
            for (b = 0; b < u / 2; ++b)
                t.quadraticCurveTo(e - l / 2, i + d / 2 + c, e - l, i + c),
                e -= l,
                t.quadraticCurveTo(e - l / 2, i - d / 2 + c, e - l, i + c),
                e -= l;
            t.fill()
        }
    }
}
function J2(...a) {
    H1.DEBUG && f.L("Vex.Flow.ModifierContext", a)
}
class H1 {
    constructor() {
        this.modifiers = {},
        this.preFormatted = !1,
        this.postFormatted = !1,
        this.width = 0,
        this.spacing = 0,
        this.state = {
            left_shift: 0,
            right_shift: 0,
            text_line: 0,
            top_text_line: 0
        },
        this.PREFORMAT = [H, C1, O1, w1, K, N1, I1, Y1, d1, X1, Y, Z, F1],
        this.POSTFORMAT = [H]
    }
    addModifier(t) {
        const e = t.getCategory();
        return this.modifiers[e] || (this.modifiers[e] = []),
        this.modifiers[e].push(t),
        t.setModifierContext(this),
        this.preFormatted = !1,
        this
    }
    getModifiers(t) {
        return this.modifiers[t]
    }
    getWidth() {
        return this.width
    }
    getLeftShift() {
        return this.state.left_shift
    }
    getRightShift() {
        return this.state.right_shift
    }
    getState() {
        return this.state
    }
    getMetrics() {
        if (!this.formatted)
            throw new f.RERR("UnformattedModifier","Unformatted modifier has no metrics.");
        return {
            width: this.state.left_shift + this.state.right_shift + this.spacing,
            spacing: this.spacing
        }
    }
    preFormat() {
        this.preFormatted || (this.PREFORMAT.forEach(t=>{
            J2("Preformatting ModifierContext: ", t.CATEGORY),
            t.format(this.getModifiers(t.CATEGORY), this.state, this)
        }
        ),
        this.width = this.state.left_shift + this.state.right_shift,
        this.preFormatted = !0)
    }
    postFormat() {
        this.postFormatted || this.POSTFORMAT.forEach(t=>{
            J2("Postformatting ModifierContext: ", t.CATEGORY),
            t.postFormat(this.getModifiers(t.CATEGORY), this)
        }
        )
    }
}
function St(...a) {
    i1.DEBUG && f.L("Vex.Flow.Formatter", a)
}
function Z2(a, t, e, i) {
    let s = t;
    for (e += 1; e < a.length; e += 1) {
        const n = a[e];
        if (!n.isRest() && !n.shouldIgnoreTicks()) {
            s = n.getLineForRest();
            break
        }
    }
    if (i && t !== s) {
        const n = Math.max(t, s)
          , o = Math.min(t, s);
        s = f.MidLine(n, o)
    }
    return s
}
function t3(a, t, e) {
    if (!a || !a.length)
        throw new f.RERR("BadArgument","No voices to format");
    const i = a[0].getTotalTicks()
      , s = a.reduce((c,d)=>{
        if (!d.getTotalTicks().equals(i))
            throw new f.RERR("TickMismatch","Voices should have same total note duration in ticks.");
        if (d.getMode() === $.Mode.STRICT && !d.isComplete())
            throw new f.RERR("IncompleteVoice","Voice does not have enough notes.");
        return Math.max(c, k.LCM(c, d.getResolutionMultiplier()))
    }
    , 1)
      , n = {}
      , o = []
      , l = [];
    return a.forEach((c,d)=>{
        const u = new k(0,s);
        c.getTickables().forEach(b=>{
            const r = u.numerator;
            if (!n[r]) {
                const h = new t({
                    tickID: r
                });
                l.push(h),
                n[r] = h
            }
            e(b, n[r], d),
            o.push(r),
            u.add(b.getTicks())
        }
        )
    }
    ),
    {
        map: n,
        array: l,
        list: f.SortAndUnique(o, (c,d)=>c - d, (c,d)=>c === d),
        resolutionMultiplier: s
    }
}
class i1 {
    static SimpleFormat(t, e=0, {paddingBetween: i=10}={}) {
        t.reduce((s,n)=>{
            n.addToModifierContext(new H1);
            const o = new B1().addTickable(n).preFormat()
              , l = o.getMetrics();
            return o.setX(s + l.totalLeftPx),
            s + o.getWidth() + l.totalRightPx + i
        }
        , e)
    }
    static plotDebugging(t, e, i, s, n, o) {
        o = R({
            stavePadding: f.Flow.DEFAULT_FONT_STACK[0].lookupMetric("stave.padding")
        }, o);
        const l = i + o.stavePadding
          , c = e.contextGaps;
        function d(u, b, r) {
            t.beginPath(),
            t.setStrokeStyle(r),
            t.setFillStyle(r),
            t.setLineWidth(1),
            t.fillRect(u, s, Math.max(b - u, 0), n - s)
        }
        t.save(),
        t.setFont("Arial", 8, ""),
        c.gaps.forEach(u=>{
            d(l + u.x1, l + u.x2, "rgba(100,200,100,0.4)"),
            t.setFillStyle("green"),
            t.fillText(Math.round(u.x2 - u.x1), l + u.x1, n + 12)
        }
        ),
        t.setFillStyle("red"),
        t.fillText(`Loss: ${(e.totalCost || 0).toFixed(2)} Shift: ${(e.totalShift || 0).toFixed(2)} Gap: ${c.total.toFixed(2)}`, l - 20, n + 27),
        t.restore()
    }
    static FormatAndDraw(t, e, i, s) {
        const n = {
            auto_beam: !1,
            align_rests: !1
        };
        typeof s == "object" ? f.Merge(n, s) : typeof s == "boolean" && (n.auto_beam = s);
        const o = new $(y.TIME4_4).setMode($.Mode.SOFT).addTickables(i)
          , l = n.auto_beam ? f1.applyAndGetBeams(o) : [];
        return new i1().joinVoices([o], {
            align_rests: n.align_rests
        }).formatToStave([o], e, {
            align_rests: n.align_rests,
            stave: e
        }),
        o.setStave(e).draw(t, e),
        l.forEach(c=>c.setContext(t).draw()),
        o.getBoundingBox()
    }
    static FormatAndDrawTab(t, e, i, s, n, o, l) {
        const c = {
            auto_beam: o,
            align_rests: !1
        };
        typeof l == "object" ? f.Merge(c, l) : typeof l == "boolean" && (c.auto_beam = l);
        const d = new $(y.TIME4_4).setMode($.Mode.SOFT).addTickables(n)
          , u = new $(y.TIME4_4).setMode($.Mode.SOFT).addTickables(s)
          , b = c.auto_beam ? f1.applyAndGetBeams(d) : [];
        new i1().joinVoices([d], {
            align_rests: c.align_rests
        }).joinVoices([u]).formatToStave([d, u], i, {
            align_rests: c.align_rests
        }),
        d.draw(t, i),
        u.draw(t, e),
        b.forEach(r=>r.setContext(t).draw()),
        new N(i,e).setContext(t).draw()
    }
    static AlignRestsToNotes(t, e, i) {
        return t.forEach((s,n)=>{
            if (s instanceof H && s.isRest()) {
                if (s.tuplet && !i)
                    return;
                const o = s.getGlyph().position.toUpperCase();
                if (o !== "R/4" && o !== "B/4")
                    return;
                if (e || s.beam != null) {
                    const l = s.getKeyProps()[0];
                    if (n === 0)
                        l.line = Z2(t, l.line, n, !1),
                        s.setKeyLine(0, l.line);
                    else if (n > 0 && n < t.length) {
                        let c;
                        t[n - 1].isRest() ? (c = t[n - 1].getKeyProps()[0].line,
                        l.line = c) : (c = t[n - 1].getLineForRest(),
                        l.line = Z2(t, c, n, !0)),
                        s.setKeyLine(0, l.line)
                    }
                }
            }
        }
        ),
        this
    }
    constructor(t) {
        this.options = R({
            softmaxFactor: null,
            maxIterations: 2
        }, t),
        this.minTotalWidth = 0,
        this.hasMinTotalWidth = !1,
        this.totalTicks = new k(0,1),
        this.tickContexts = null,
        this.modiferContexts = null,
        this.contextGaps = {
            total: 0,
            gaps: []
        },
        this.voices = [],
        this.iterationsCompleted = 0,
        this.lossHistory = []
    }
    alignRests(t, e) {
        if (!t || !t.length)
            throw new f.RERR("BadArgument","No voices to format rests");
        t.forEach(i=>i1.AlignRestsToNotes(i.getTickables(), e))
    }
    preCalculateMinTotalWidth(t) {
        if (this.hasMinTotalWidth)
            return this.minTotalWidth;
        if (!this.tickContexts) {
            if (!t)
                throw new f.RERR("BadArgument","'voices' required to run preCalculateMinTotalWidth");
            this.createTickContexts(t)
        }
        const {list: e, map: i} = this.tickContexts;
        return this.minTotalWidth = e.map(s=>{
            const n = i[s];
            return n.preFormat(),
            n.getWidth()
        }
        ).reduce((s,n)=>s + n, 0),
        this.hasMinTotalWidth = !0,
        this.minTotalWidth
    }
    getMinTotalWidth() {
        if (!this.hasMinTotalWidth)
            throw new f.RERR("NoMinTotalWidth","Call 'preCalculateMinTotalWidth' or 'preFormat' before calling 'getMinTotalWidth'");
        return this.minTotalWidth
    }
    createModifierContexts(t) {
        const e = t3(t, H1, (i,s)=>i.addToModifierContext(s));
        return this.modiferContexts = e,
        e
    }
    createTickContexts(t) {
        const e = t3(t, B1, (i,s,n)=>s.addTickable(i, n));
        return e.array.forEach(i=>{
            i.tContexts = e.array
        }
        ),
        this.totalTicks = t[0].getTicksUsed().clone(),
        this.tickContexts = e,
        e
    }
    preFormat(t=0, e, i, s) {
        const n = this.tickContexts
          , {list: o, map: l} = n;
        this.lossHistory = [],
        i && s && i.forEach(g=>g.setStave(s).preFormat());
        let c = 0
          , d = 0;
        if (this.minTotalWidth = 0,
        o.forEach(g=>{
            const T = l[g];
            e && T.setContext(e),
            T.preFormat();
            const w = T.getWidth();
            this.minTotalWidth += w;
            const S = T.getMetrics();
            c = c + d + S.totalLeftPx,
            T.setX(c),
            d = w - S.totalLeftPx
        }
        ),
        this.minTotalWidth = c + d,
        this.hasMinTotalWidth = !0,
        t <= 0)
            return this.evaluate();
        const u = l[o[0]]
          , b = l[o[o.length - 1]];
        function r(g) {
            return o.map((T,w)=>{
                const S = l[T]
                  , v = S.getTickablesByVoice();
                let A = null;
                if (w > 0) {
                    const F = l[o[w - 1]];
                    for (let C = w - 1; C >= 0; C--) {
                        const D = l[o[C]].getTickablesByVoice()
                          , W = [];
                        if (Object.keys(v).forEach(I=>{
                            D[I] && W.push(I)
                        }
                        ),
                        W.length > 0) {
                            let I = 0
                              , G = 1 / 0
                              , t1 = 0;
                            return W.forEach(u1=>{
                                const M1 = D[u1].getTicks().value();
                                M1 > I && (A = D[u1],
                                I = M1);
                                const Z1 = v[u1]
                                  , Y3 = Z1.getX() - (Z1.getMetrics().modLeftPx + Z1.getMetrics().leftDisplacedHeadPx)
                                  , h2 = D[u1].getMetrics()
                                  , G3 = D[u1].getX() + h2.notePx + h2.modRightPx + h2.rightDisplacedHeadPx;
                                G = Math.min(G, Y3 - G3)
                            }
                            ),
                            G = Math.min(G, S.getX() - F.getX()),
                            t1 = A.getVoice().softmax(I) * g,
                            {
                                expectedDistance: t1,
                                maxNegativeShiftPx: G,
                                fromTickable: A
                            }
                        }
                    }
                }
                return {
                    errorPx: 0,
                    fromTickablePx: 0,
                    maxNegativeShiftPx: 0
                }
            }
            )
        }
        function h(g) {
            const T = m / 2;
            let w = 0
              , S = 0;
            return o.forEach((v,A)=>{
                const F = l[v];
                if (A > 0) {
                    const C = F.getX()
                      , V = g[A]
                      , D = V.fromTickable.getX() + V.expectedDistance - (C + w);
                    let W = 0;
                    D > 0 ? w += D : D < 0 && (W = Math.min(V.maxNegativeShiftPx + S, Math.abs(D))),
                    F.setX(C + w - W),
                    S += W
                }
                F.getCenterAlignedTickables().forEach(C=>{
                    C.center_x_shift = T - F.getX()
                }
                )
            }
            ),
            b.getX() - u.getX()
        }
        const m = t - b.getMetrics().notePx - b.getMetrics().totalRightPx - u.getMetrics().totalLeftPx;
        let _ = m
          , x = h(r(_))
          , p = this.options.maxIterations;
        for (; x > m + b.getMetrics().notePx && p > 0; )
            _ -= x - _,
            x = h(r(_)),
            p--;
        return o.length === 1 ? null : (this.justifyWidth = t,
        this.evaluate())
    }
    evaluate() {
        const t = this.justifyWidth;
        this.contextGaps = {
            total: 0,
            gaps: []
        },
        this.tickContexts.list.forEach((n,o)=>{
            if (o === 0)
                return;
            const l = this.tickContexts.list[o - 1]
              , c = this.tickContexts.map[l]
              , d = this.tickContexts.map[n]
              , u = c.getMetrics()
              , b = d.getMetrics()
              , r = c.getX() + u.notePx + u.totalRightPx
              , h = d.getX() - b.totalLeftPx
              , m = h - r;
            this.contextGaps.total += m,
            this.contextGaps.gaps.push({
                x1: r,
                x2: h
            }),
            d.getFormatterMetrics().freedom.left = m,
            c.getFormatterMetrics().freedom.right = m
        }
        );
        const e = this.durationStats = {};
        function i(n, o) {
            const l = e[n];
            l === void 0 ? e[n] = {
                mean: o,
                count: 1
            } : (l.count += 1,
            l.mean = (l.mean + o) / 2)
        }
        this.voices.forEach(n=>{
            n.getTickables().forEach((o,l,c)=>{
                const d = o.getTicks().clone().simplify().toString()
                  , u = o.getMetrics()
                  , b = o.getFormatterMetrics()
                  , r = o.getX() + u.notePx + u.totalRightPx;
                let h = 0;
                if (l < c.length - 1) {
                    const m = c[l + 1]
                      , _ = m.getMetrics();
                    h = m.getX() - _.totalLeftPx - r,
                    b.space.used = m.getX() - o.getX(),
                    m.getFormatterMetrics().freedom.left = h
                } else
                    h = t - r,
                    b.space.used = t - o.getX();
                b.freedom.right = h,
                i(d, b.space.used)
            }
            )
        }
        );
        let s = 0;
        return this.voices.forEach(n=>{
            n.getTickables().forEach(o=>{
                const l = o.getTicks().clone().simplify().toString()
                  , c = o.getFormatterMetrics();
                c.space.mean = e[l].mean,
                c.duration = l,
                c.iterations += 1,
                c.space.deviation = c.space.used - c.space.mean,
                s += Math.pow(c.space.deviation, 2)
            }
            )
        }
        ),
        this.totalCost = Math.sqrt(s),
        this.lossHistory.push(this.totalCost),
        this.totalCost
    }
    tune(t) {
        t = R({
            alpha: .5
        }, t);
        const e = n=>n.reduce((o,l)=>o + l);
        function i(n, o, l, c) {
            n.setX(n.getX() + c),
            n.getFormatterMetrics().freedom.left += c,
            n.getFormatterMetrics().freedom.right -= c,
            o && (o.getFormatterMetrics().freedom.right += c),
            l && (l.getFormatterMetrics().freedom.left -= c)
        }
        let s = 0;
        return this.totalShift = 0,
        this.tickContexts.list.forEach((n,o,l)=>{
            const c = this.tickContexts.map[n]
              , d = o > 0 ? this.tickContexts.map[l[o - 1]] : null
              , u = o < l.length - 1 ? this.tickContexts.map[l[o + 1]] : null;
            i(c, d, u, s);
            const b = -e(c.getTickables().map(r=>r.getFormatterMetrics().space.deviation));
            b > 0 ? s = -Math.min(c.getFormatterMetrics().freedom.right, Math.abs(b)) : b < 0 && (u ? s = Math.min(u.getFormatterMetrics().freedom.right, Math.abs(b)) : s = 0),
            s *= t.alpha,
            this.totalShift += s
        }
        ),
        this.iterationsCompleted++,
        this.evaluate()
    }
    postFormat() {
        const t = e=>e.list.forEach(i=>e.map[i].postFormat());
        return t(this.modiferContexts),
        t(this.tickContexts),
        this
    }
    joinVoices(t) {
        return this.createModifierContexts(t),
        this.hasMinTotalWidth = !1,
        this
    }
    format(t, e, i) {
        const s = R({
            align_rests: !1,
            context: null,
            stave: null
        }, i);
        return this.voices = t,
        this.options.softmaxFactor && this.voices.forEach(n=>n.setSoftmaxFactor(this.options.softmaxFactor)),
        this.alignRests(t, s.align_rests),
        this.createTickContexts(t),
        this.preFormat(e, s.context, t, s.stave),
        s.stave && this.postFormat(),
        this
    }
    formatToStave(t, e, i) {
        i = R({
            padding: 10
        }, i);
        const s = e.getNoteEndX() - e.getNoteStartX() - i.padding;
        return St("Formatting voices to width: ", s),
        this.format(t, s, R({
            context: e.getContext()
        }, i))
    }
}
class B extends X {
    static get Position() {
        return {
            LEFT: 1,
            RIGHT: 2,
            ABOVE: 3,
            BELOW: 4,
            BEGIN: 5,
            END: 6
        }
    }
    constructor() {
        super();
        this.setAttribute("type", "StaveModifier"),
        this.padding = 10,
        this.position = B.Position.ABOVE,
        this.layoutMetrics = null
    }
    getPosition() {
        return this.position
    }
    setPosition(t) {
        return this.position = t,
        this
    }
    getStave() {
        return this.stave
    }
    setStave(t) {
        return this.stave = t,
        this
    }
    getWidth() {
        return this.width
    }
    setWidth(t) {
        return this.width = t,
        this
    }
    getX() {
        return this.x
    }
    setX(t) {
        return this.x = t,
        this
    }
    getCategory() {
        return ""
    }
    makeSpacer(t) {
        return {
            getContext() {
                return !0
            },
            setStave() {},
            renderToStave() {},
            getMetrics() {
                return {
                    width: t
                }
            }
        }
    }
    placeGlyphOnLine(t, e, i, s=0) {
        t.setYShift(e.getYForLine(i) - e.getYForGlyphs() + s)
    }
    getPadding(t) {
        return t !== void 0 && t < 2 ? 0 : this.padding
    }
    setPadding(t) {
        return this.padding = t,
        this
    }
    setLayoutMetrics(t) {
        return this.layoutMetrics = t,
        this
    }
    getLayoutMetrics() {
        return this.layoutMetrics
    }
}
class L extends B {
    static get CATEGORY() {
        return "barlines"
    }
    static get type() {
        return {
            SINGLE: 1,
            DOUBLE: 2,
            END: 3,
            REPEAT_BEGIN: 4,
            REPEAT_END: 5,
            REPEAT_BOTH: 6,
            NONE: 7
        }
    }
    static get typeString() {
        return {
            single: L.type.SINGLE,
            double: L.type.DOUBLE,
            end: L.type.END,
            repeatBegin: L.type.REPEAT_BEGIN,
            repeatEnd: L.type.REPEAT_END,
            repeatBoth: L.type.REPEAT_BOTH,
            none: L.type.NONE
        }
    }
    constructor(t) {
        super();
        this.setAttribute("type", "Barline"),
        this.thickness = y.STAVE_LINE_THICKNESS;
        const e = L.type;
        this.widths = {},
        this.widths[e.SINGLE] = 5,
        this.widths[e.DOUBLE] = 5,
        this.widths[e.END] = 5,
        this.widths[e.REPEAT_BEGIN] = 5,
        this.widths[e.REPEAT_END] = 5,
        this.widths[e.REPEAT_BOTH] = 5,
        this.widths[e.NONE] = 5,
        this.paddings = {},
        this.paddings[e.SINGLE] = 0,
        this.paddings[e.DOUBLE] = 0,
        this.paddings[e.END] = 0,
        this.paddings[e.REPEAT_BEGIN] = 15,
        this.paddings[e.REPEAT_END] = 15,
        this.paddings[e.REPEAT_BOTH] = 15,
        this.paddings[e.NONE] = 0,
        this.layoutMetricsMap = {},
        this.layoutMetricsMap[e.SINGLE] = {
            xMin: 0,
            xMax: 1,
            paddingLeft: 5,
            paddingRight: 5
        },
        this.layoutMetricsMap[e.DOUBLE] = {
            xMin: -3,
            xMax: 1,
            paddingLeft: 5,
            paddingRight: 5
        },
        this.layoutMetricsMap[e.END] = {
            xMin: -5,
            xMax: 1,
            paddingLeft: 5,
            paddingRight: 5
        },
        this.layoutMetricsMap[e.REPEAT_END] = {
            xMin: -10,
            xMax: 1,
            paddingLeft: 5,
            paddingRight: 5
        },
        this.layoutMetricsMap[e.REPEAT_BEGIN] = {
            xMin: -2,
            xMax: 10,
            paddingLeft: 5,
            paddingRight: 5
        },
        this.layoutMetricsMap[e.REPEAT_BOTH] = {
            xMin: -10,
            xMax: 10,
            paddingLeft: 5,
            paddingRight: 5
        },
        this.layoutMetricsMap[e.NONE] = {
            xMin: 0,
            xMax: 0,
            paddingLeft: 5,
            paddingRight: 5
        },
        this.setPosition(B.Position.BEGIN),
        this.setType(t)
    }
    getCategory() {
        return L.CATEGORY
    }
    getType() {
        return this.type
    }
    setType(t) {
        return this.type = typeof t == "string" ? L.typeString[t] : t,
        this.setWidth(this.widths[this.type]),
        this.setPadding(this.paddings[this.type]),
        this.setLayoutMetrics(this.layoutMetricsMap[this.type]),
        this
    }
    draw(t) {
        switch (t.checkContext(),
        this.setRendered(),
        this.type) {
        case L.type.SINGLE:
            this.drawVerticalBar(t, this.x, !1);
            break;
        case L.type.DOUBLE:
            this.drawVerticalBar(t, this.x, !0);
            break;
        case L.type.END:
            this.drawVerticalEndBar(t, this.x);
            break;
        case L.type.REPEAT_BEGIN:
            this.drawRepeatBar(t, this.x, !0),
            t.getX() !== this.x && this.drawVerticalBar(t, t.getX());
            break;
        case L.type.REPEAT_END:
            this.drawRepeatBar(t, this.x, !1);
            break;
        case L.type.REPEAT_BOTH:
            this.drawRepeatBar(t, this.x, !1),
            this.drawRepeatBar(t, this.x, !0);
            break
        }
    }
    drawVerticalBar(t, e, i) {
        t.checkContext();
        const s = t.getTopLineTopY()
          , n = t.getBottomLineBottomY();
        i && t.context.fillRect(e - 3, s, 1, n - s),
        t.context.fillRect(e, s, 1, n - s)
    }
    drawVerticalEndBar(t, e) {
        t.checkContext();
        const i = t.getTopLineTopY()
          , s = t.getBottomLineBottomY();
        t.context.fillRect(e - 5, i, 1, s - i),
        t.context.fillRect(e - 2, i, 3, s - i)
    }
    drawRepeatBar(t, e, i) {
        t.checkContext();
        const s = t.getTopLineTopY()
          , n = t.getBottomLineBottomY();
        let o = 3;
        i || (o = -5),
        t.context.fillRect(e + o, s, 1, n - s),
        t.context.fillRect(e - 2, s, 3, n - s);
        const l = 2;
        i ? o += 4 : o -= 4;
        const c = e + o + l / 2;
        let d = (t.getNumLines() - 1) * t.getSpacingBetweenLines();
        d = d / 2 - t.getSpacingBetweenLines() / 2;
        let u = s + d + l / 2;
        t.context.beginPath(),
        t.context.arc(c, u, l, 0, Math.PI * 2, !1),
        t.context.fill(),
        u += t.getSpacingBetweenLines(),
        t.context.beginPath(),
        t.context.arc(c, u, l, 0, Math.PI * 2, !1),
        t.context.fill()
    }
}
class q extends B {
    static get CATEGORY() {
        return "repetitions"
    }
    static get type() {
        return {
            NONE: 1,
            CODA_LEFT: 2,
            CODA_RIGHT: 3,
            SEGNO_LEFT: 4,
            SEGNO_RIGHT: 5,
            DC: 6,
            DC_AL_CODA: 7,
            DC_AL_FINE: 8,
            DS: 9,
            DS_AL_CODA: 10,
            DS_AL_FINE: 11,
            FINE: 12
        }
    }
    constructor(t, e, i) {
        super();
        this.setAttribute("type", "Repetition"),
        this.symbol_type = t,
        this.x = e,
        this.x_shift = 0,
        this.y_shift = i,
        this.font = {
            family: "times",
            size: 12,
            weight: "bold italic"
        }
    }
    getCategory() {
        return q.CATEGORY
    }
    setShiftX(t) {
        return this.x_shift = t,
        this
    }
    setShiftY(t) {
        return this.y_shift = t,
        this
    }
    draw(t, e) {
        switch (this.setRendered(),
        this.symbol_type) {
        case q.type.CODA_RIGHT:
            this.drawCodaFixed(t, e + t.width);
            break;
        case q.type.CODA_LEFT:
            this.drawSymbolText(t, e, "Coda", !0);
            break;
        case q.type.SEGNO_LEFT:
            this.drawSignoFixed(t, e);
            break;
        case q.type.SEGNO_RIGHT:
            this.drawSignoFixed(t, e + t.width);
            break;
        case q.type.DC:
            this.drawSymbolText(t, e, "D.C.", !1);
            break;
        case q.type.DC_AL_CODA:
            this.drawSymbolText(t, e, "D.C. al", !0);
            break;
        case q.type.DC_AL_FINE:
            this.drawSymbolText(t, e, "D.C. al Fine", !1);
            break;
        case q.type.DS:
            this.drawSymbolText(t, e, "D.S.", !1);
            break;
        case q.type.DS_AL_CODA:
            this.drawSymbolText(t, e, "D.S. al", !0);
            break;
        case q.type.DS_AL_FINE:
            this.drawSymbolText(t, e, "D.S. al Fine", !1);
            break;
        case q.type.FINE:
            this.drawSymbolText(t, e, "Fine", !1);
            break
        }
        return this
    }
    drawCodaFixed(t, e) {
        const i = t.getYForTopText(t.options.num_lines) + this.y_shift;
        return E.renderGlyph(t.context, this.x + e + this.x_shift, i + 25, 40, "coda", {
            category: "coda"
        }),
        this
    }
    drawSignoFixed(t, e) {
        const i = t.getYForTopText(t.options.num_lines) + this.y_shift;
        return E.renderGlyph(t.context, this.x + e + this.x_shift, i + 25, 30, "segno", {
            category: "segno"
        }),
        this
    }
    drawSymbolText(t, e, i, s) {
        const n = t.checkContext();
        n.save(),
        n.setFont(this.font.family, this.font.size, this.font.weight);
        let o = 0 + this.x_shift
          , l = e + this.x_shift;
        this.symbol_type === q.type.CODA_LEFT ? (o = this.x + t.options.vertical_bar_width,
        l = o + n.measureText(i).width + 12) : (l = this.x + e + t.width - 5 + this.x_shift,
        o = l - +n.measureText(i).width - 12);
        const c = t.getYForTopText(t.options.num_lines) + this.y_shift;
        return s && E.renderGlyph(n, l, c, 40, "coda", {
            category: "coda"
        }),
        n.fillText(i, o, c + 5),
        n.restore(),
        this
    }
}
class _2 extends B {
    static get CATEGORY() {
        return "stavesection"
    }
    constructor(t, e, i) {
        super();
        this.setAttribute("type", "StaveSection"),
        this.setWidth(16),
        this.section = t,
        this.x = e,
        this.shift_x = 0,
        this.shift_y = i,
        this.font = {
            family: "sans-serif",
            size: 12,
            weight: "bold"
        }
    }
    getCategory() {
        return _2.CATEGORY
    }
    setStaveSection(t) {
        return this.section = t,
        this
    }
    setShiftX(t) {
        return this.shift_x = t,
        this
    }
    setShiftY(t) {
        return this.shift_y = t,
        this
    }
    draw(t, e) {
        const i = t.checkContext();
        this.setRendered(),
        i.save(),
        i.lineWidth = 2,
        i.setFont(this.font.family, this.font.size, this.font.weight);
        const s = i.measureText("" + this.section).width;
        let n = s + 6;
        n < 18 && (n = 18);
        const o = 20
          , l = t.getYForTopText(3) + this.shift_y;
        let c = this.x + e;
        return i.beginPath(),
        i.lineWidth = 2,
        i.rect(c, l, n, o),
        i.stroke(),
        c += (n - s) / 2,
        i.fillText("" + this.section, c, l + 16),
        i.restore(),
        this
    }
}
class s2 extends B {
    static get CATEGORY() {
        return "stavetempo"
    }
    constructor(t, e, i) {
        super();
        this.setAttribute("type", "StaveTempo"),
        this.tempo = t,
        this.position = M.Position.ABOVE,
        this.x = e,
        this.shift_x = 10,
        this.shift_y = i,
        this.font = {
            family: "times",
            size: 14,
            weight: "bold"
        },
        this.render_options = {
            glyph_font_scale: 30
        }
    }
    getCategory() {
        return s2.CATEGORY
    }
    setTempo(t) {
        return this.tempo = t,
        this
    }
    setShiftX(t) {
        return this.shift_x = t,
        this
    }
    setShiftY(t) {
        return this.shift_y = t,
        this
    }
    draw(t, e) {
        const i = t.checkContext();
        this.setRendered();
        const s = this.render_options
          , n = s.glyph_font_scale / 38
          , o = this.tempo.name
          , l = this.tempo.duration
          , c = this.tempo.dots
          , d = this.tempo.bpm
          , u = this.font;
        let b = this.x + this.shift_x + e;
        const r = t.getYForTopText(1) + this.shift_y;
        if (i.save(),
        o && (i.setFont(u.family, u.size, u.weight),
        i.fillText(o, b, r),
        b += i.measureText(o).width),
        l && d) {
            i.setFont(u.family, u.size, "normal"),
            o && (b += i.measureText(" ").width,
            i.fillText("(", b, r),
            b += i.measureText("(").width);
            const h = y.getGlyphProps(l);
            if (b += 3 * n,
            E.renderGlyph(i, b, r, s.glyph_font_scale, h.code_head),
            b += h.getWidth() * n,
            h.stem) {
                let m = 30;
                h.beam_count && (m += 3 * (h.beam_count - 1)),
                m *= n;
                const _ = r - m;
                i.fillRect(b - n, _, n, m),
                h.flag && (E.renderGlyph(i, b, _, s.glyph_font_scale, h.code_flag_upstem, {
                    category: "flag.staveTempo"
                }),
                c || (b += 6 * n))
            }
            for (let m = 0; m < c; m++)
                b += 6 * n,
                i.beginPath(),
                i.arc(b, r + 2 * n, 2 * n, 0, Math.PI * 2, !1),
                i.fill();
            i.fillText(" = " + d + (o ? ")" : ""), b + 3 * n, r)
        }
        return i.restore(),
        this
    }
}
class b1 extends J {
    static get Justification() {
        return {
            LEFT: 1,
            CENTER: 2,
            RIGHT: 3
        }
    }
    static get GLYPHS() {
        return {
            segno: {
                code: "segno"
            },
            tr: {
                code: "ornamentTrill"
            },
            mordent: {
                code: "ornamentMordent"
            },
            mordent_upper: {
                code: "ornamentShortTrill"
            },
            mordent_lower: {
                code: "ornamentMordent"
            },
            f: {
                code: "dynamicForte"
            },
            p: {
                code: "dynamicPiano"
            },
            m: {
                code: "dynamicMezzo"
            },
            s: {
                code: "dynamicSforzando"
            },
            z: {
                code: "dynamicZ"
            },
            coda: {
                code: "coda"
            },
            pedal_open: {
                code: "keyboardPedalPed"
            },
            pedal_close: {
                code: "keyboardPedalUp"
            },
            caesura_straight: {
                code: "caesura"
            },
            caesura_curved: {
                code: "caesuraCurved"
            },
            breath: {
                code: "breathMarkComma"
            },
            tick: {
                code: "breathMarkTick"
            },
            turn: {
                code: "ornamentTurn"
            },
            turn_inverted: {
                code: "ornamentTurnSlash"
            }
        }
    }
    constructor(t) {
        super(t);
        if (this.setAttribute("type", "TextNote"),
        this.text = t.text,
        this.superscript = t.superscript,
        this.subscript = t.subscript,
        this.glyph = null,
        this.font = R({
            family: "Arial",
            size: 12,
            weight: ""
        }, t.font),
        t.glyph) {
            const e = b1.GLYPHS[t.glyph];
            if (!e)
                throw new f.RERR("Invalid glyph type: " + t.glyph);
            this.glyph = new E(e.code,40,{
                category: "textNote"
            }),
            this.setWidth(this.glyph.getMetrics().width)
        }
        this.line = t.line || 0,
        this.smooth = t.smooth || !1,
        this.ignore_ticks = t.ignore_ticks || !1,
        this.justification = b1.Justification.LEFT
    }
    setJustification(t) {
        return this.justification = t,
        this
    }
    setLine(t) {
        return this.line = t,
        this
    }
    preFormat() {
        this.checkContext(),
        !this.preFormatted && (this.smooth ? this.setWidth(0) : this.glyph || (this.context.setFont(this.font.family, this.font.size, this.font.weight),
        this.setWidth(this.context.measureText(this.text).width)),
        this.justification === b1.Justification.CENTER ? this.leftDisplacedHeadPx = this.width / 2 : this.justification === b1.Justification.RIGHT && (this.leftDisplacedHeadPx = this.width),
        this.rightDisplacedHeadPx = this.tickContext.getMetrics().glyphPx / 2,
        this.setPreFormatted(!0))
    }
    draw() {
        if (this.checkContext(),
        !this.stave)
            throw new f.RERR("NoStave","Can't draw without a stave.");
        this.setRendered();
        const t = this.context;
        let e = this.getAbsoluteX() + this.tickContext.getMetrics().glyphPx / 2;
        const i = this.getWidth();
        this.justification === b1.Justification.CENTER ? e -= i / 2 : this.justification === b1.Justification.RIGHT && (e -= i);
        let s;
        if (this.glyph)
            s = this.stave.getYForLine(this.line + -3),
            this.glyph.render(this.context, e, s);
        else {
            s = this.stave.getYForLine(this.line + -3),
            this.applyStyle(t),
            t.setFont(this.font.family, this.font.size, this.font.weight),
            t.fillText(this.text, e, s);
            const n = t.measureText(this.text).height;
            this.superscript && (t.setFont(this.font.family, this.font.size / 1.3, this.font.weight),
            t.fillText(this.superscript, e + i + 2, s - n / 2.2)),
            this.subscript && (t.setFont(this.font.family, this.font.size / 1.3, this.font.weight),
            t.fillText(this.subscript, e + i + 2, s + n / 2.2 - 1)),
            this.restoreStyle(t)
        }
    }
}
class n2 extends B {
    static get CATEGORY() {
        return "stavetext"
    }
    constructor(t, e, i) {
        super();
        this.setAttribute("type", "StaveText"),
        this.setWidth(16),
        this.text = t,
        this.position = e,
        this.options = {
            shift_x: 0,
            shift_y: 0,
            justification: b1.Justification.CENTER
        },
        f.Merge(this.options, i),
        this.font = {
            family: "times",
            size: 16,
            weight: "normal"
        }
    }
    getCategory() {
        return n2.CATEGORY
    }
    setStaveText(t) {
        return this.text = t,
        this
    }
    setShiftX(t) {
        return this.shift_x = t,
        this
    }
    setShiftY(t) {
        return this.shift_y = t,
        this
    }
    setFont(t) {
        f.Merge(this.font, t)
    }
    setText(t) {
        this.text = t
    }
    draw(t) {
        const e = t.checkContext();
        this.setRendered(),
        e.save(),
        e.lineWidth = 2,
        e.setFont(this.font.family, this.font.size, this.font.weight);
        const i = e.measureText("" + this.text).width;
        let s, n;
        const o = B.Position
          , l = b1.Justification;
        switch (this.position) {
        case o.LEFT:
        case o.RIGHT:
            n = (t.getYForLine(0) + t.getBottomLineY()) / 2 + this.options.shift_y,
            this.position === o.LEFT ? s = t.getX() - i - 24 + this.options.shift_x : s = t.getX() + t.getWidth() + 24 + this.options.shift_x;
            break;
        case o.ABOVE:
        case o.BELOW:
            s = t.getX() + this.options.shift_x,
            this.options.justification === l.CENTER ? s += t.getWidth() / 2 - i / 2 : this.options.justification === l.RIGHT && (s += t.getWidth() - i),
            this.position === o.ABOVE ? n = t.getYForTopText(2) + this.options.shift_y : n = t.getYForBottomText(2) + this.options.shift_y;
            break;
        default:
            throw new f.RERR("InvalidPosition","Value Must be in Modifier.Position.")
        }
        return e.fillText("" + this.text, s, n + 4),
        e.restore(),
        this
    }
}
function vt(...a) {
    x1.DEBUG && f.L("Vex.Flow.Clef", a)
}
class x1 extends B {
    static get CATEGORY() {
        return "clefs"
    }
    static get types() {
        return {
            treble: {
                code: "gClef",
                line: 3
            },
            bass: {
                code: "fClef",
                line: 1
            },
            alto: {
                code: "cClef",
                line: 2
            },
            tenor: {
                code: "cClef",
                line: 1
            },
            percussion: {
                code: "restMaxima",
                line: 2
            },
            soprano: {
                code: "cClef",
                line: 4
            },
            "mezzo-soprano": {
                code: "cClef",
                line: 3
            },
            "baritone-c": {
                code: "cClef",
                line: 0
            },
            "baritone-f": {
                code: "fClef",
                line: 2
            },
            subbass: {
                code: "fClef",
                line: 0
            },
            french: {
                code: "gClef",
                line: 4
            },
            tab: {
                code: "6stringTabClef"
            }
        }
    }
    constructor(t, e, i) {
        super();
        this.setAttribute("type", "Clef"),
        this.setPosition(B.Position.BEGIN),
        this.setType(t, e, i),
        this.setWidth(this.musicFont.lookupMetric(`clef.${this.size}.width`)),
        vt("Creating clef:", t)
    }
    getCategory() {
        return x1.CATEGORY
    }
    setType(t, e, i) {
        if (this.type = t,
        this.clef = x1.types[t],
        e === void 0 ? this.size = "default" : this.size = e,
        this.clef.point = this.musicFont.lookupMetric(`clef.${this.size}.point`, 0),
        this.glyph = new E(this.clef.code,this.clef.point,{
            category: `clef.${this.clef.code}.${this.size}`
        }),
        i !== void 0) {
            const s = this.musicFont.lookupMetric(`clef.annotations.${i}.smuflCode`)
              , n = this.musicFont.lookupMetric(`clef.annotations.${i}.${this.size}.point`)
              , o = this.musicFont.lookupMetric(`clef.annotations.${i}.${this.size}.${this.type}.line`)
              , l = this.musicFont.lookupMetric(`clef.annotations.${i}.${this.size}.${this.type}.shiftX`);
            this.annotation = {
                code: s,
                point: n,
                line: o,
                x_shift: l
            },
            this.attachment = new E(this.annotation.code,this.annotation.point),
            this.attachment.metrics.x_max = 0,
            this.attachment.setXShift(this.annotation.x_shift)
        } else
            this.annotation = void 0;
        return this
    }
    getWidth() {
        if (this.type === "tab" && !this.stave)
            throw new f.RERR("ClefError","Can't get width without stave.");
        return this.width
    }
    setStave(t) {
        if (this.stave = t,
        this.type !== "tab")
            return this;
        const e = this.stave.getOptions().num_lines
          , i = this.musicFont.lookupMetric(`clef.lineCount.${e}.point`)
          , s = this.musicFont.lookupMetric(`clef.lineCount.${e}.shiftY`);
        return this.glyph.setPoint(i),
        this.glyph.setYShift(s),
        this
    }
    draw() {
        if (!this.x)
            throw new f.RERR("ClefError","Can't draw clef without x.");
        if (!this.stave)
            throw new f.RERR("ClefError","Can't draw clef without stave.");
        this.setRendered(),
        this.glyph.setStave(this.stave),
        this.glyph.setContext(this.stave.context),
        this.clef.line !== void 0 && this.placeGlyphOnLine(this.glyph, this.stave, this.clef.line),
        this.glyph.renderToStave(this.x),
        this.annotation !== void 0 && (this.placeGlyphOnLine(this.attachment, this.stave, this.annotation.line),
        this.attachment.setStave(this.stave),
        this.attachment.setContext(this.stave.context),
        this.attachment.renderToStave(this.x))
    }
}
class T1 extends B {
    static get CATEGORY() {
        return "keysignatures"
    }
    static get accidentalSpacing() {
        return {
            "#": {
                above: 6,
                below: 4
            },
            b: {
                above: 4,
                below: 7
            },
            n: {
                above: 4,
                below: 1
            },
            "##": {
                above: 6,
                below: 4
            },
            bb: {
                above: 4,
                below: 7
            },
            db: {
                above: 4,
                below: 7
            },
            d: {
                above: 4,
                below: 7
            },
            bbs: {
                above: 4,
                below: 7
            },
            "++": {
                above: 6,
                below: 4
            },
            "+": {
                above: 6,
                below: 4
            },
            "+-": {
                above: 6,
                below: 4
            },
            "++-": {
                above: 6,
                below: 4
            },
            bs: {
                above: 4,
                below: 10
            },
            bss: {
                above: 4,
                below: 10
            }
        }
    }
    constructor(t, e, i) {
        super();
        this.setAttribute("type", "KeySignature"),
        this.setKeySig(t, e, i),
        this.setPosition(B.Position.BEGIN),
        this.glyphFontScale = 38,
        this.glyphs = [],
        this.xPositions = [],
        this.paddingForced = !1
    }
    getCategory() {
        return T1.CATEGORY
    }
    convertToGlyph(t, e) {
        const i = y.accidentalCodes(t.type)
          , s = new E(i.code,this.glyphFontScale);
        let n = 1;
        if (t.type === "n" && e) {
            const c = T1.accidentalSpacing[e.type];
            c && (n = e.line >= t.line ? c.above : c.below)
        }
        this.placeGlyphOnLine(s, this.stave, t.line),
        this.glyphs.push(s);
        const o = this.xPositions[this.xPositions.length - 1]
          , l = s.getMetrics().width + n;
        this.xPositions.push(o + l),
        this.width += l
    }
    cancelKey(t) {
        return this.formatted = !1,
        this.cancelKeySpec = t,
        this
    }
    convertToCancelAccList(t) {
        const e = y.keySignature(t)
          , i = this.accList.length > 0 && e.length > 0 && e[0].type !== this.accList[0].type
          , s = i ? e.length : e.length - this.accList.length;
        if (s < 1)
            return;
        const n = [];
        for (let o = 0; o < s; o++) {
            let l = o;
            i || (l = e.length - s + o);
            const c = e[l];
            n.push({
                type: "n",
                line: c.line
            })
        }
        return this.accList = n.concat(this.accList),
        {
            accList: n,
            type: e[0].type
        }
    }
    addToStave(t) {
        return this.paddingForced = !0,
        t.addModifier(this),
        this
    }
    convertAccLines(t, e, i=this.accList) {
        let s = 0, n;
        switch (t) {
        case "soprano":
            e === "#" ? n = [2.5, .5, 2, 0, 1.5, -.5, 1] : s = -1;
            break;
        case "mezzo-soprano":
            e === "b" ? n = [0, 2, .5, 2.5, 1, 3, 1.5] : s = 1.5;
            break;
        case "alto":
            s = .5;
            break;
        case "tenor":
            e === "#" ? n = [3, 1, 2.5, .5, 2, 0, 1.5] : s = -.5;
            break;
        case "baritone-f":
        case "baritone-c":
            e === "b" ? n = [.5, 2.5, 1, 3, 1.5, 3.5, 2] : s = 2;
            break;
        case "bass":
        case "french":
            s = 1;
            break
        }
        let o;
        if (typeof n != "undefined")
            for (o = 0; o < i.length; ++o)
                i[o].line = n[o];
        else if (s !== 0)
            for (o = 0; o < i.length; ++o)
                i[o].line += s
    }
    getPadding(t) {
        return this.formatted || this.format(),
        this.glyphs.length === 0 || !this.paddingForced && t < 2 ? 0 : this.padding
    }
    getWidth() {
        return this.formatted || this.format(),
        this.width
    }
    setKeySig(t, e, i) {
        return this.formatted = !1,
        this.keySpec = t,
        this.cancelKeySpec = e,
        this.alterKeySpec = i,
        this
    }
    alterKey(t) {
        return this.formatted = !1,
        this.alterKeySpec = t,
        this
    }
    convertToAlterAccList(t) {
        const e = Math.min(t.length, this.accList.length);
        for (let i = 0; i < e; ++i)
            t[i] && (this.accList[i].type = t[i])
    }
    format() {
        if (!this.stave)
            throw new f.RERR("KeySignatureError","Can't draw key signature without stave.");
        this.width = 0,
        this.glyphs = [],
        this.xPositions = [0],
        this.accList = y.keySignature(this.keySpec);
        const t = this.accList
          , e = t.length > 0 ? t[0].type : null;
        let i;
        if (this.cancelKeySpec && (i = this.convertToCancelAccList(this.cancelKeySpec)),
        this.alterKeySpec && this.convertToAlterAccList(this.alterKeySpec),
        this.accList.length > 0) {
            const s = (this.position === B.Position.END ? this.stave.endClef : this.stave.clef) || this.stave.clef;
            i && this.convertAccLines(s, i.type, i.accList),
            this.convertAccLines(s, e, t);
            for (let n = 0; n < this.accList.length; ++n)
                this.convertToGlyph(this.accList[n], this.accList[n + 1])
        }
        this.formatted = !0
    }
    draw() {
        if (!this.x)
            throw new f.RERR("KeySignatureError","Can't draw key signature without x.");
        if (!this.stave)
            throw new f.RERR("KeySignatureError","Can't draw key signature without stave.");
        this.formatted || this.format(),
        this.setRendered();
        for (let t = 0; t < this.glyphs.length; t++) {
            const e = this.glyphs[t]
              , i = this.x + this.xPositions[t];
            e.setStave(this.stave),
            e.setContext(this.stave.context),
            e.renderToStave(i)
        }
    }
}
const Pt = a=>{
    const t = a.split("/").filter(e=>e !== "");
    if (t.length !== 2)
        throw new f.RERR("BadTimeSignature",`Invalid time spec: ${a}. Must be in the form "<numerator>/<denominator>"`);
    t.forEach(e=>{
        if (isNaN(Number(e)))
            throw new f.RERR("BadTimeSignature",`Invalid time spec: ${a}. Must contain two valid numbers.`)
    }
    )
}
;
class g1 extends B {
    static get CATEGORY() {
        return "timesignatures"
    }
    static get glyphs() {
        return {
            C: {
                code: "timeSigCommon",
                point: 40,
                line: 2
            },
            "C|": {
                code: "timeSigCutCommon",
                point: 40,
                line: 2
            }
        }
    }
    constructor(t=null, e=15, i=!0) {
        super();
        if (this.setAttribute("type", "TimeSignature"),
        this.validate_args = i,
        t === null)
            return;
        const s = e;
        this.point = this.musicFont.lookupMetric("digits.point");
        const n = this.musicFont.lookupMetric("digits.shiftLine", 0);
        this.topLine = 2 + n,
        this.bottomLine = 4 + n,
        this.setPosition(B.Position.BEGIN),
        this.setTimeSig(t),
        this.setWidth(this.timeSig.glyph.getMetrics().width),
        this.setPadding(s)
    }
    getCategory() {
        return g1.CATEGORY
    }
    parseTimeSpec(t) {
        if (t === "C" || t === "C|") {
            const {line: s, code: n, point: o} = g1.glyphs[t];
            return {
                line: s,
                num: !1,
                glyph: new E(n,o)
            }
        }
        this.validate_args && Pt(t);
        const [e,i] = t.split("/").map(s=>s.split(""));
        return {
            num: !0,
            glyph: this.makeTimeSignatureGlyph(e, i)
        }
    }
    makeTimeSignatureGlyph(t, e) {
        const i = new E("timeSig0",this.point);
        i.topGlyphs = [],
        i.botGlyphs = [];
        let s = 0;
        for (let b = 0; b < t.length; ++b) {
            const r = t[b]
              , h = new E("timeSig" + r,this.point);
            i.topGlyphs.push(h),
            s += h.getMetrics().width
        }
        let n = 0;
        for (let b = 0; b < e.length; ++b) {
            const r = e[b]
              , h = new E("timeSig" + r,this.point);
            i.botGlyphs.push(h),
            n += h.getMetrics().width
        }
        const o = s > n ? s : n
          , l = i.getMetrics().x_min;
        i.getMetrics = ()=>({
            x_min: l,
            x_max: l + o,
            width: o
        });
        const c = (o - s) / 2
          , d = (o - n) / 2
          , u = this;
        return i.renderToStave = function(r) {
            let h = r + c;
            for (let m = 0; m < this.topGlyphs.length; ++m) {
                const _ = this.topGlyphs[m];
                E.renderOutline(this.context, _.metrics.outline, _.scale, h + _.x_shift, this.stave.getYForLine(u.topLine)),
                h += _.getMetrics().width
            }
            h = r + d;
            for (let m = 0; m < this.botGlyphs.length; ++m) {
                const _ = this.botGlyphs[m];
                u.placeGlyphOnLine(_, this.stave, _.line),
                E.renderOutline(this.context, _.metrics.outline, _.scale, h + _.x_shift, this.stave.getYForLine(u.bottomLine)),
                h += _.getMetrics().width
            }
        }
        ,
        i
    }
    getTimeSig() {
        return this.timeSig
    }
    setTimeSig(t) {
        return this.timeSig = this.parseTimeSpec(t),
        this
    }
    draw() {
        if (!this.x)
            throw new f.RERR("TimeSignatureError","Can't draw time signature without x.");
        if (!this.stave)
            throw new f.RERR("TimeSignatureError","Can't draw time signature without stave.");
        this.setRendered(),
        this.timeSig.glyph.setStave(this.stave),
        this.timeSig.glyph.setContext(this.stave.context),
        this.placeGlyphOnLine(this.timeSig.glyph, this.stave, this.timeSig.line),
        this.timeSig.glyph.renderToStave(this.x)
    }
}
class m1 extends B {
    static get CATEGORY() {
        return "voltas"
    }
    static get type() {
        return {
            NONE: 1,
            BEGIN: 2,
            MID: 3,
            END: 4,
            BEGIN_END: 5
        }
    }
    constructor(t, e, i, s) {
        super();
        this.setAttribute("type", "Volta"),
        this.volta = t,
        this.x = i,
        this.y_shift = s,
        this.number = e,
        this.font = {
            family: "sans-serif",
            size: 9,
            weight: "bold"
        }
    }
    getCategory() {
        return m1.CATEGORY
    }
    setShiftY(t) {
        return this.y_shift = t,
        this
    }
    draw(t, e) {
        const i = t.checkContext();
        this.setRendered();
        let s = t.width;
        const n = t.getYForTopText(t.options.num_lines) + this.y_shift
          , o = 1.5 * t.options.spacing_between_lines_px;
        switch (this.volta) {
        case m1.type.BEGIN:
            i.fillRect(this.x + e, n, 1, o);
            break;
        case m1.type.END:
            s -= 5,
            i.fillRect(this.x + e + s, n, 1, o);
            break;
        case m1.type.BEGIN_END:
            s -= 3,
            i.fillRect(this.x + e, n, 1, o),
            i.fillRect(this.x + e + s, n, 1, o);
            break
        }
        return (this.volta === m1.type.BEGIN || this.volta === m1.type.BEGIN_END) && (i.save(),
        i.setFont(this.font.family, this.font.size, this.font.weight),
        i.fillText(this.number, this.x + e + 5, n + 15),
        i.restore()),
        i.fillRect(this.x + e, n, s, 1),
        this
    }
}
class p2 extends X {
    constructor(t, e, i, s) {
        super();
        this.setAttribute("type", "Stave"),
        this.x = t,
        this.y = e,
        this.width = i,
        this.formatted = !1,
        this.start_x = t + 5,
        this.end_x = t + i,
        this.modifiers = [],
        this.measure = 0,
        this.clef = "treble",
        this.endClef = void 0,
        this.font = {
            family: "sans-serif",
            size: 8,
            weight: ""
        },
        this.options = {
            vertical_bar_width: 10,
            glyph_spacing_px: 10,
            num_lines: 5,
            fill_style: "#999999",
            left_bar: !0,
            right_bar: !0,
            spacing_between_lines_px: 10,
            space_above_staff_ln: 4,
            space_below_staff_ln: 4,
            top_text_position: 1
        },
        this.bounds = {
            x: this.x,
            y: this.y,
            w: this.width,
            h: 0
        },
        f.Merge(this.options, s),
        this.resetLines();
        const n = L.type;
        this.addModifier(new L(this.options.left_bar ? n.SINGLE : n.NONE)),
        this.addEndModifier(new L(this.options.right_bar ? n.SINGLE : n.NONE))
    }
    space(t) {
        return this.options.spacing_between_lines_px * t
    }
    resetLines() {
        this.options.line_config = [];
        for (let t = 0; t < this.options.num_lines; t++)
            this.options.line_config.push({
                visible: !0
            });
        this.height = (this.options.num_lines + this.options.space_above_staff_ln) * this.options.spacing_between_lines_px,
        this.options.bottom_text_position = this.options.num_lines
    }
    getOptions() {
        return this.options
    }
    setNoteStartX(t) {
        this.formatted || this.format(),
        this.start_x = t;
        const e = this.modifiers[0];
        return e.setX(this.start_x - e.getWidth()),
        this
    }
    getNoteStartX() {
        return this.formatted || this.format(),
        this.start_x
    }
    getNoteEndX() {
        return this.formatted || this.format(),
        this.end_x
    }
    getTieStartX() {
        return this.start_x
    }
    getTieEndX() {
        return this.x + this.width
    }
    getX() {
        return this.x
    }
    getNumLines() {
        return this.options.num_lines
    }
    setNumLines(t) {
        return this.options.num_lines = parseInt(t, 10),
        this.resetLines(),
        this
    }
    setY(t) {
        return this.y = t,
        this
    }
    getTopLineTopY() {
        return this.getYForLine(0) - y.STAVE_LINE_THICKNESS / 2
    }
    getBottomLineBottomY() {
        return this.getYForLine(this.getNumLines() - 1) + y.STAVE_LINE_THICKNESS / 2
    }
    setX(t) {
        const e = t - this.x;
        this.formatted = !1,
        this.x = t,
        this.start_x += e,
        this.end_x += e;
        for (let i = 0; i < this.modifiers.length; i++) {
            const s = this.modifiers[i];
            s.x !== void 0 && (s.x += e)
        }
        return this
    }
    setWidth(t) {
        return this.formatted = !1,
        this.width = t,
        this.end_x = this.x + t,
        this
    }
    getWidth() {
        return this.width
    }
    getStyle() {
        return R({
            fillStyle: this.options.fill_style,
            strokeStyle: this.options.fill_style,
            lineWidth: y.STAVE_LINE_THICKNESS
        }, this.style || {})
    }
    setMeasure(t) {
        return this.measure = t,
        this
    }
    getModifierXShift(t=0) {
        if (typeof t != "number")
            throw new f.RERR("InvalidIndex","Must be of number type");
        if (this.formatted || this.format(),
        this.getModifiers(B.Position.BEGIN).length === 1)
            return 0;
        let e = this.start_x - this.x;
        const i = this.modifiers[0];
        return i.getType() === L.type.REPEAT_BEGIN && e > i.getWidth() && (e -= i.getWidth()),
        e
    }
    setRepetitionTypeLeft(t, e) {
        return this.modifiers.push(new q(t,this.x,e)),
        this
    }
    setRepetitionTypeRight(t, e) {
        return this.modifiers.push(new q(t,this.x,e)),
        this
    }
    setVoltaType(t, e, i) {
        return this.modifiers.push(new m1(t,e,this.x,i)),
        this
    }
    setSection(t, e) {
        return this.modifiers.push(new _2(t,this.x,e)),
        this
    }
    setTempo(t, e) {
        return this.modifiers.push(new s2(t,this.x,e)),
        this
    }
    setText(t, e, i) {
        return this.modifiers.push(new n2(t,e,i)),
        this
    }
    getHeight() {
        return this.height
    }
    getSpacingBetweenLines() {
        return this.options.spacing_between_lines_px
    }
    getBoundingBox() {
        return new y1(this.x,this.y,this.width,this.getBottomY() - this.y)
    }
    getBottomY() {
        const t = this.options
          , e = t.spacing_between_lines_px;
        return this.getYForLine(t.num_lines) + t.space_below_staff_ln * e
    }
    getBottomLineY() {
        return this.getYForLine(this.options.num_lines)
    }
    getYForLine(t) {
        const e = this.options
          , i = e.spacing_between_lines_px
          , s = e.space_above_staff_ln;
        return this.y + t * i + s * i
    }
    getLineForY(t) {
        const e = this.options
          , i = e.spacing_between_lines_px
          , s = e.space_above_staff_ln;
        return (t - this.y) / i - s
    }
    getYForTopText(t) {
        const e = t || 0;
        return this.getYForLine(-e - this.options.top_text_position)
    }
    getYForBottomText(t) {
        const e = t || 0;
        return this.getYForLine(this.options.bottom_text_position + e)
    }
    getYForNote(t) {
        const e = this.options
          , i = e.spacing_between_lines_px
          , s = e.space_above_staff_ln;
        return this.y + s * i + 5 * i - t * i
    }
    getYForGlyphs() {
        return this.getYForLine(3)
    }
    addModifier(t, e) {
        return e !== void 0 && t.setPosition(e),
        t.setStave(this),
        this.formatted = !1,
        this.modifiers.push(t),
        this
    }
    addEndModifier(t) {
        return this.addModifier(t, B.Position.END),
        this
    }
    setBegBarType(t) {
        const {SINGLE: e, REPEAT_BEGIN: i, NONE: s} = L.type;
        return (t === e || t === i || t === s) && (this.modifiers[0].setType(t),
        this.formatted = !1),
        this
    }
    setEndBarType(t) {
        return t !== L.type.REPEAT_BEGIN && (this.modifiers[1].setType(t),
        this.formatted = !1),
        this
    }
    setClef(t, e, i, s) {
        s === void 0 && (s = B.Position.BEGIN),
        s === B.Position.END ? this.endClef = t : this.clef = t;
        const n = this.getModifiers(s, x1.CATEGORY);
        return n.length === 0 ? this.addClef(t, e, i, s) : n[0].setType(t, e, i),
        this
    }
    setEndClef(t, e, i) {
        return this.setClef(t, e, i, B.Position.END),
        this
    }
    setKeySignature(t, e, i) {
        i === void 0 && (i = B.Position.BEGIN);
        const s = this.getModifiers(i, T1.CATEGORY);
        return s.length === 0 ? this.addKeySignature(t, e, i) : s[0].setKeySig(t, e),
        this
    }
    setEndKeySignature(t, e) {
        return this.setKeySignature(t, e, B.Position.END),
        this
    }
    setTimeSignature(t, e, i) {
        i === void 0 && (i = B.Position.BEGIN);
        const s = this.getModifiers(i, g1.CATEGORY);
        return s.length === 0 ? this.addTimeSignature(t, e, i) : s[0].setTimeSig(t),
        this
    }
    setEndTimeSignature(t, e) {
        return this.setTimeSignature(t, e, B.Position.END),
        this
    }
    addKeySignature(t, e, i) {
        return i === void 0 && (i = B.Position.BEGIN),
        this.addModifier(new T1(t,e).setPosition(i), i),
        this
    }
    addClef(t, e, i, s) {
        return s === void 0 || s === B.Position.BEGIN ? this.clef = t : s === B.Position.END && (this.endClef = t),
        this.addModifier(new x1(t,e,i), s),
        this
    }
    addEndClef(t, e, i) {
        return this.addClef(t, e, i, B.Position.END),
        this
    }
    addTimeSignature(t, e, i) {
        return this.addModifier(new g1(t,e), i),
        this
    }
    addEndTimeSignature(t, e) {
        return this.addTimeSignature(t, e, B.Position.END),
        this
    }
    addTrebleGlyph() {
        return this.addClef("treble"),
        this
    }
    getModifiers(t, e) {
        return t === void 0 && e === void 0 ? this.modifiers : this.modifiers.filter(i=>(t === void 0 || t === i.getPosition()) && (e === void 0 || e === i.getCategory()))
    }
    sortByCategory(t, e) {
        for (let i = t.length - 1; i >= 0; i--)
            for (let s = 0; s < i; s++)
                if (e[t[s].getCategory()] > e[t[s + 1].getCategory()]) {
                    const n = t[s];
                    t[s] = t[s + 1],
                    t[s + 1] = n
                }
    }
    format() {
        const t = this.modifiers[0]
          , e = this.modifiers[1]
          , i = this.getModifiers(B.Position.BEGIN)
          , s = this.getModifiers(B.Position.END);
        this.sortByCategory(i, {
            barlines: 0,
            clefs: 1,
            keysignatures: 2,
            timesignatures: 3
        }),
        this.sortByCategory(s, {
            timesignatures: 0,
            keysignatures: 1,
            barlines: 2,
            clefs: 3
        }),
        i.length > 1 && t.getType() === L.type.REPEAT_BEGIN && (i.push(i.splice(0, 1)[0]),
        i.splice(0, 0, new L(L.type.SINGLE))),
        s.indexOf(e) > 0 && s.splice(0, 0, new L(L.type.NONE));
        let n, o, l, c = 0, d = this.x;
        for (let r = 0; r < i.length; r++)
            l = i[r],
            o = l.getPadding(r + c),
            n = l.getWidth(),
            d += o,
            l.setX(d),
            d += n,
            o + n === 0 && c--;
        this.start_x = d,
        d = this.x + this.width;
        const u = {
            left: 0,
            right: 0,
            paddingRight: 0,
            paddingLeft: 0
        };
        let b = 0;
        for (let r = 0; r < s.length; r++) {
            l = s[r],
            b = l.getCategory() === "barlines" ? r : b,
            u.right = 0,
            u.left = 0,
            u.paddingRight = 0,
            u.paddingLeft = 0;
            const h = l.getLayoutMetrics();
            h ? (r !== 0 && (u.right = h.xMax || 0,
            u.paddingRight = h.paddingRight || 0),
            u.left = -h.xMin || 0,
            u.paddingLeft = h.paddingLeft || 0,
            r === s.length - 1 && (u.paddingLeft = 0)) : (u.paddingRight = l.getPadding(r - b),
            r !== 0 && (u.right = l.getWidth()),
            r === 0 && (u.left = l.getWidth())),
            d -= u.paddingRight,
            d -= u.right,
            l.setX(d),
            d -= u.left,
            d -= u.paddingLeft
        }
        this.end_x = s.length === 1 ? this.x + this.width : d,
        this.formatted = !0
    }
    draw() {
        this.checkContext(),
        this.setRendered(),
        this.formatted || this.format();
        const t = this.options.num_lines
          , e = this.width
          , i = this.x;
        let s;
        for (let n = 0; n < t; n++)
            s = this.getYForLine(n),
            this.applyStyle(),
            this.options.line_config[n].visible && (this.context.beginPath(),
            this.context.moveTo(i, s),
            this.context.lineTo(i + e, s),
            this.context.stroke()),
            this.restoreStyle();
        for (let n = 0; n < this.modifiers.length; n++)
            typeof this.modifiers[n].draw == "function" && (this.modifiers[n].applyStyle(this.context),
            this.modifiers[n].draw(this, this.getModifierXShift(n)),
            this.modifiers[n].restoreStyle(this.context));
        if (this.measure > 0) {
            this.context.save(),
            this.context.setFont(this.font.family, this.font.size, this.font.weight);
            const n = this.context.measureText("" + this.measure).width;
            s = this.getYForTopText(0) + 3,
            this.context.fillText("" + this.measure, this.x - n / 2, s),
            this.context.restore()
        }
        return this
    }
    drawVertical(t, e) {
        this.drawVerticalFixed(this.x + t, e)
    }
    drawVerticalFixed(t, e) {
        this.checkContext();
        const i = this.getYForLine(0)
          , s = this.getYForLine(this.options.num_lines - 1);
        e && this.context.fillRect(t - 3, i, 1, s - i + 1),
        this.context.fillRect(t, i, 1, s - i + 1)
    }
    drawVerticalBar(t) {
        this.drawVerticalBarFixed(this.x + t, !1)
    }
    drawVerticalBarFixed(t) {
        this.checkContext();
        const e = this.getYForLine(0)
          , i = this.getYForLine(this.options.num_lines - 1);
        this.context.fillRect(t, e, 1, i - e + 1)
    }
    getConfigForLines() {
        return this.options.line_config
    }
    setConfigForLine(t, e) {
        if (t >= this.options.num_lines || t < 0)
            throw new f.RERR("StaveConfigError","The line number must be within the range of the number of lines in the Stave.");
        if (e.visible === void 0)
            throw new f.RERR("StaveConfigError","The line configuration object is missing the 'visible' property.");
        if (typeof e.visible != "boolean")
            throw new f.RERR("StaveConfigError","The line configuration objects 'visible' property must be true or false.");
        return this.options.line_config[t] = e,
        this
    }
    setConfigForLines(t) {
        if (t.length !== this.options.num_lines)
            throw new f.RERR("StaveConfigError","The length of the lines configuration array must match the number of lines in the Stave");
        for (const e in t)
            t[e] || (t[e] = this.options.line_config[e]),
            f.Merge(this.options.line_config[e], t[e]);
        return this.options.line_config = t,
        this
    }
}
class e3 extends p2 {
    constructor(t, e, i, s) {
        const n = {
            spacing_between_lines_px: 13,
            num_lines: 6,
            top_text_position: 1
        };
        f.Merge(n, s);
        super(t, e, i, n);
        this.setAttribute("type", "TabStave")
    }
    getYForGlyphs() {
        return this.getYForLine(2.5)
    }
    addTabGlyph() {
        return this.addClef("tab"),
        this
    }
}
function Et(a, t) {
    const e = [];
    let i = [];
    for (let s = 1; s <= a; s++)
        t.indexOf(s) > -1 ? (e.push(i),
        i = []) : i.push(s);
    return i.length > 0 && e.push(i),
    e
}
function Mt(a, t, e, i) {
    const s = i !== 1
      , n = i !== -1
      , o = e.getSpacingBetweenLines()
      , l = e.getNumLines()
      , c = [];
    return t.forEach(d=>{
        const u = d.indexOf(l) > -1
          , b = d.indexOf(1) > -1;
        if (s && b || n && u)
            return;
        d.length === 1 && d.push(d[0]);
        const r = [];
        d.forEach((h,m,_)=>{
            const x = h === 1
              , p = h === l;
            let g = e.getYForLine(h - 1);
            m === 0 && !x ? g -= o / 2 - 1 : m === _.length - 1 && !p && (g += o / 2 - 1),
            r.push(g),
            i === 1 && x ? r.push(a - 2) : i === -1 && p && r.push(a + 2)
        }
        ),
        c.push(r.sort((h,m)=>h - m))
    }
    ),
    c
}
class W1 extends m2 {
    static get CATEGORY() {
        return "tabnotes"
    }
    constructor(t, e) {
        super(t);
        if (this.setAttribute("type", "TabNote"),
        this.ghost = !1,
        this.positions = t.positions,
        f.Merge(this.render_options, {
            glyph_font_scale: y.DEFAULT_TABLATURE_FONT_SCALE,
            draw_stem: e,
            draw_dots: e,
            draw_stem_through_stave: !1,
            y_shift: 0,
            scale: 1,
            font: "10pt Arial"
        }),
        this.glyph = y.getGlyphProps(this.duration, this.noteType),
        !this.glyph)
            throw new f.RuntimeError("BadArguments",`Invalid note initialization data (No glyph found): ${JSON.stringify(t)}`);
        this.buildStem(),
        t.stem_direction ? this.setStemDirection(t.stem_direction) : this.setStemDirection(P.UP),
        this.ghost = !1,
        this.updateWidth()
    }
    reset() {
        this.stave && this.setStave(this.stave)
    }
    getCategory() {
        return W1.CATEGORY
    }
    setGhost(t) {
        return this.ghost = t,
        this.updateWidth(),
        this
    }
    hasStem() {
        return this.render_options.draw_stem
    }
    getStemExtension() {
        const t = this.getGlyph();
        return this.stem_extension_override != null ? this.stem_extension_override : t ? this.getStemDirection() === 1 ? t.tabnote_stem_up_extension : t.tabnote_stem_down_extension : 0
    }
    addDot() {
        const t = new C1;
        return this.dots += 1,
        this.addModifier(t, 0)
    }
    updateWidth() {
        this.glyphs = [],
        this.width = 0;
        for (let t = 0; t < this.positions.length; ++t) {
            let e = this.positions[t].fret;
            this.ghost && (e = "(" + e + ")");
            const i = y.tabToGlyph(e, this.render_options.scale);
            this.glyphs.push(i),
            this.width = Math.max(i.getWidth(), this.width)
        }
        this.glyph.getWidth = ()=>this.width
    }
    setStave(t) {
        super.setStave(t),
        this.context = t.context;
        let e;
        if (this.context) {
            const s = this.context;
            for (this.width = 0,
            e = 0; e < this.glyphs.length; ++e) {
                const n = this.glyphs[e]
                  , o = "" + n.text;
                o.toUpperCase() !== "X" && (s.save(),
                s.setRawFont(this.render_options.font),
                n.width = s.measureText(o).width,
                s.restore(),
                n.getWidth = ()=>n.width),
                this.width = Math.max(n.getWidth(), this.width)
            }
            this.glyph.getWidth = ()=>this.width
        }
        const i = this.positions.map(({str: s})=>t.getYForLine(s - 1));
        return this.setYs(i),
        this.stem && this.stem.setYBounds(this.getStemY(), this.getStemY()),
        this
    }
    getPositions() {
        return this.positions
    }
    addToModifierContext(t) {
        this.setModifierContext(t);
        for (let e = 0; e < this.modifiers.length; ++e)
            this.modifierContext.addModifier(this.modifiers[e]);
        return this.modifierContext.addModifier(this),
        this.preFormatted = !1,
        this
    }
    getTieRightX() {
        let t = this.getAbsoluteX();
        return t += this.glyph.getWidth() / 2,
        t += -this.width / 2 + this.width + 2,
        t
    }
    getTieLeftX() {
        let t = this.getAbsoluteX();
        return t += this.glyph.getWidth() / 2,
        t -= this.width / 2 + 2,
        t
    }
    getModifierStartXY(t, e) {
        if (!this.preFormatted)
            throw new f.RERR("UnformattedNote","Can't call GetModifierStartXY on an unformatted note");
        if (this.ys.length === 0)
            throw new f.RERR("NoYValues","No Y-Values calculated for this note.");
        let i = 0;
        return t === M.Position.LEFT ? i = -1 * 2 : t === M.Position.RIGHT ? i = this.width + 2 : (t === M.Position.BELOW || t === M.Position.ABOVE) && (i = this.glyph.getWidth() / 2),
        {
            x: this.getAbsoluteX() + i,
            y: this.ys[e]
        }
    }
    getLineForRest() {
        return this.positions[0].str
    }
    preFormat() {
        this.preFormatted || (this.modifierContext && this.modifierContext.preFormat(),
        this.setPreFormatted(!0))
    }
    getStemX() {
        return this.getCenterGlyphX()
    }
    getStemY() {
        const t = this.stave.getNumLines()
          , e = -.5
          , i = t - .5
          , s = P.UP === this.stem_direction ? e : i;
        return this.stave.getYForLine(s)
    }
    getStemExtents() {
        return this.stem.getExtents()
    }
    drawFlag() {
        const {beam: t, glyph: e, context: i, stem: s, stem_direction: n, render_options: {draw_stem: o, glyph_font_scale: l}} = this
          , c = t == null && o;
        if (e.flag && c) {
            const d = this.getStemX() + 1
              , u = this.getStemY() - s.getHeight()
              , b = n === P.DOWN ? e.code_flag_downstem : e.code_flag_upstem;
            E.renderGlyph(i, d, u, l, b, {
                category: "flag.tabStem"
            })
        }
    }
    drawModifiers() {
        this.modifiers.forEach(t=>{
            t.getCategory() === "dots" && !this.render_options.draw_dots || (t.setContext(this.context),
            t.drawWithStyle())
        }
        )
    }
    drawStemThrough() {
        const t = this.getStemX()
          , e = this.getStemY()
          , i = this.context
          , s = this.render_options.draw_stem_through_stave;
        if (this.render_options.draw_stem && s) {
            const o = this.stave.getNumLines()
              , l = this.positions.map(u=>u.str)
              , c = Et(o, l)
              , d = Mt(e, c, this.getStave(), this.getStemDirection());
            i.save(),
            i.setLineWidth(P.WIDTH),
            d.forEach(u=>{
                u.length !== 0 && (i.beginPath(),
                i.moveTo(t, u[0]),
                i.lineTo(t, u[u.length - 1]),
                i.stroke(),
                i.closePath())
            }
            ),
            i.restore()
        }
    }
    drawPositions() {
        const t = this.context
          , e = this.getAbsoluteX()
          , i = this.ys;
        for (let s = 0; s < this.positions.length; ++s) {
            const n = i[s] + this.render_options.y_shift
              , o = this.glyphs[s]
              , l = this.glyph.getWidth()
              , c = e + l / 2 - o.getWidth() / 2;
            if (t.clearRect(c - 2, n - 3, o.getWidth() + 4, 6),
            o.code)
                E.renderGlyph(t, c, n, this.render_options.glyph_font_scale * this.render_options.scale, o.code);
            else {
                t.save(),
                t.setRawFont(this.render_options.font);
                const d = o.text.toString();
                t.fillText(d, c, n + 5 * this.render_options.scale),
                t.restore()
            }
        }
    }
    draw() {
        if (this.checkContext(),
        !this.stave)
            throw new f.RERR("NoStave","Can't draw without a stave.");
        if (this.ys.length === 0)
            throw new f.RERR("NoYValues","Can't draw note without Y values.");
        this.setRendered();
        const t = this.beam == null && this.render_options.draw_stem;
        this.drawPositions(),
        this.drawStemThrough();
        const e = this.getStemX();
        this.stem.setNoteHeadXBounds(e, e),
        t && (this.context.openGroup("stem", null, {
            pointerBBox: !0
        }),
        this.stem.setContext(this.context).draw(),
        this.context.closeGroup()),
        this.drawFlag(),
        this.drawModifiers()
    }
}
function At(...a) {
    x2.DEBUG && f.L("Vex.Flow.VibratoBracket", a)
}
class x2 extends X {
    constructor(t) {
        super();
        this.setAttribute("type", "VibratoBracket"),
        this.start = t.start,
        this.stop = t.stop,
        this.line = 1,
        this.render_options = {
            harsh: !1,
            wave_height: 6,
            wave_width: 4,
            wave_girth: 2
        }
    }
    setLine(t) {
        return this.line = t,
        this
    }
    setHarsh(t) {
        return this.render_options.harsh = t,
        this
    }
    draw() {
        const t = this.context;
        this.setRendered();
        const e = this.start ? this.start.getStave().getYForTopText(this.line) : this.stop.getStave().getYForTopText(this.line)
          , i = this.start ? this.start.getAbsoluteX() : this.stop.getStave().getTieStartX()
          , s = this.stop ? this.stop.getAbsoluteX() - this.stop.getWidth() - 5 : this.start.getStave().getTieEndX() - 10;
        this.render_options.vibrato_width = s - i,
        At("Rendering VibratoBracket: start_x:", i, "stop_x:", s, "y:", e),
        F1.renderVibrato(t, i, e, this.render_options)
    }
}
let g2;
function kt() {
    if (!g2) {
        const a = new k1({
            duration: "w",
            note_type: "r"
        });
        g2 = {
            glyph_font_scale: a.render_options.glyph_font_scale,
            glyph_code: a.glyph_code,
            width: a.getWidth()
        }
    }
    return g2
}
class i3 extends X {
    constructor(t, e) {
        super();
        this.setAttribute("type", "MultiMeasureRest");
        const i = this.musicFont.lookupMetric("digits.point")
          , s = this.musicFont.lookupMetric("digits.shiftLine", 0);
        this.render_options = {
            show_number: !0,
            number_line: -.5,
            number_glyph_point: i,
            padding_left: void 0,
            padding_right: void 0,
            line: 2,
            spacing_between_lines_px: 10,
            line_thickness: void 0,
            serif_thickness: 2,
            use_symbols: !1,
            symbol_spacing: void 0,
            semibrave_rest_glyph_scale: y.DEFAULT_NOTATION_FONT_SCALE
        },
        f.Merge(this.render_options, e),
        this.render_options.number_line += s,
        this.number_of_measures = t,
        this.xs = {
            left: NaN,
            right: NaN
        }
    }
    getXs() {
        return this.xs
    }
    setStave(t) {
        return this.stave = t,
        this
    }
    getStave() {
        return this.stave
    }
    drawLine(t, e, i, s) {
        const n = this.stave.getYForLine(this.render_options.line)
          , o = (i - e) * .1;
        e += o,
        i -= o;
        const l = {
            thickness: this.render_options.serif_thickness,
            height: s
        };
        let c = s * .25;
        isNaN(this.render_options.line_thickness) || (c = this.render_options.line_thickness * .5),
        t.save(),
        t.beginPath(),
        t.moveTo(e, n - s),
        t.lineTo(e + l.thickness, n - s),
        t.lineTo(e + l.thickness, n - c),
        t.lineTo(i - l.thickness, n - c),
        t.lineTo(i - l.thickness, n - s),
        t.lineTo(i, n - s),
        t.lineTo(i, n + s),
        t.lineTo(i - l.thickness, n + s),
        t.lineTo(i - l.thickness, n + c),
        t.lineTo(e + l.thickness, n + c),
        t.lineTo(e + l.thickness, n + s),
        t.lineTo(e, n + s),
        t.closePath(),
        t.fill()
    }
    drawSymbols(t, e, i, s) {
        const n = Math.floor(this.number_of_measures / 4)
          , o = this.number_of_measures % 4
          , l = Math.floor(o / 2)
          , c = o % 2
          , d = kt()
          , u = d.width * (this.render_options.semibrave_rest_glyph_scale / d.glyph_font_scale)
          , b = {
            2: {
                width: u * .5,
                height: s
            },
            1: {
                width: u
            }
        };
        let r = u * 1.35;
        isNaN(this.render_options.symbol_spacing) || (r = this.render_options.symbol_spacing);
        const h = n * b[2].width + l * b[2].width + c * b[1].width + (n + l + c - 1) * r;
        let m = e + (i - e) * .5 - h * .5;
        const _ = this.stave.getYForLine(this.render_options.line - 1)
          , x = this.stave.getYForLine(this.render_options.line)
          , p = this.stave.getYForLine(this.render_options.line + 1);
        t.save(),
        t.setStrokeStyle("none"),
        t.setLineWidth(0);
        for (let g = 0; g < n; ++g)
            t.fillRect(m, x - b[2].height, b[2].width, b[2].height),
            t.fillRect(m, p - b[2].height, b[2].width, b[2].height),
            m += b[2].width + r;
        for (let g = 0; g < l; ++g)
            t.fillRect(m, x - b[2].height, b[2].width, b[2].height),
            m += b[2].width + r;
        for (let g = 0; g < c; ++g)
            E.renderGlyph(t, m, _, this.render_options.semibrave_rest_glyph_scale, d.glyph_code),
            m += b[1].width + r;
        t.restore()
    }
    draw() {
        this.checkContext(),
        this.setRendered();
        const t = this.context
          , e = this.stave
          , i = this.render_options.spacing_between_lines_px;
        let s = e.getNoteStartX()
          , n = e.getNoteEndX();
        const o = e.getModifiers(B.Position.BEGIN);
        if (o.length === 1 && o[0].getCategory() === "barlines" && (s -= o[0].getWidth()),
        isNaN(this.render_options.padding_left) || (s = e.getX() + this.render_options.padding_left),
        isNaN(this.render_options.padding_right) || (n = e.getX() + e.getWidth() - this.render_options.padding_right),
        this.xs.left = s,
        this.xs.right = n,
        this.render_options.use_symbols ? this.drawSymbols(t, s, n, i) : this.drawLine(t, s, n, i),
        this.render_options.show_number) {
            const l = "/" + this.number_of_measures
              , c = new g1(null,void 0,!1);
            c.point = this.render_options.number_glyph_point,
            c.setTimeSig(l),
            c.setStave(e),
            c.x = s + (n - s) * .5 - c.timeSig.glyph.getMetrics().width * .5,
            c.bottomLine = this.render_options.number_line,
            c.setContext(t).draw()
        }
    }
}
class b2 extends J {
    static get CATEGORY() {
        return "clefnote"
    }
    constructor(t, e, i) {
        super({
            duration: "b"
        });
        this.setAttribute("type", "ClefNote"),
        this.setType(t, e, i),
        this.ignore_ticks = !0
    }
    setType(t, e, i) {
        return this.type = t,
        this.clef_obj = new x1(t,e,i),
        this.clef = this.clef_obj.clef,
        this.glyph = new E(this.clef.code,this.clef.point),
        this.setWidth(this.glyph.getMetrics().width),
        this
    }
    getClef() {
        return this.clef
    }
    setContext(t) {
        return this.context = t,
        this.glyph.setContext(this.context),
        this
    }
    getBoundingBox() {
        return super.getBoundingBox()
    }
    addToModifierContext() {
        return this
    }
    getCategory() {
        return b2.CATEGORY
    }
    preFormat() {
        return this.setPreFormatted(!0),
        this
    }
    draw() {
        if (!this.stave)
            throw new f.RERR("NoStave","Can't draw without a stave.");
        this.glyph.getContext() || this.glyph.setContext(this.context),
        this.setRendered();
        const t = this.getAbsoluteX();
        if (this.glyph.setStave(this.stave),
        this.glyph.setYShift(this.stave.getYForLine(this.clef.line) - this.stave.getYForGlyphs()),
        this.glyph.renderToStave(t),
        this.clef_obj.annotation !== void 0) {
            const e = new E(this.clef_obj.annotation.code,this.clef_obj.annotation.point);
            e.getContext() || e.setContext(this.context),
            e.setStave(this.stave),
            e.setYShift(this.stave.getYForLine(this.clef_obj.annotation.line) - this.stave.getYForGlyphs()),
            e.setXShift(this.clef_obj.annotation.x_shift),
            e.renderToStave(t)
        }
    }
}
class s3 extends J {
    constructor(t, e, i) {
        super({
            duration: "b"
        });
        this.setAttribute("type", "KeySigNote"),
        this.keySignature = new T1(t,e,i),
        this.ignore_ticks = !0
    }
    getBoundingBox() {
        return super.getBoundingBox()
    }
    addToModifierContext() {
        return this
    }
    preFormat() {
        return this.setPreFormatted(!0),
        this.keySignature.setStave(this.stave),
        this.keySignature.format(),
        this.setWidth(this.keySignature.width),
        this
    }
    draw() {
        this.stave.checkContext(),
        this.setRendered(),
        this.keySignature.x = this.getAbsoluteX(),
        this.keySignature.setContext(this.context),
        this.keySignature.draw()
    }
}
class n3 extends J {
    constructor(t, e) {
        super({
            duration: "b"
        });
        this.setAttribute("type", "TimeSigNote");
        const i = new g1(t,e);
        this.timeSig = i.getTimeSig(),
        this.setWidth(this.timeSig.glyph.getMetrics().width),
        this.ignore_ticks = !0
    }
    getBoundingBox() {
        return super.getBoundingBox()
    }
    addToModifierContext() {
        return this
    }
    preFormat() {
        return this.setPreFormatted(!0),
        this
    }
    draw() {
        this.stave.checkContext(),
        this.setRendered(),
        this.timeSig.glyph.getContext() || this.timeSig.glyph.setContext(this.context),
        this.timeSig.glyph.setStave(this.stave),
        this.timeSig.glyph.setYShift(this.stave.getYForLine(this.timeSig.line) - this.stave.getYForGlyphs()),
        this.timeSig.glyph.renderToStave(this.getAbsoluteX())
    }
}
class a1 extends R1 {
    static get SLIDE_UP() {
        return 1
    }
    static get SLIDE_DOWN() {
        return -1
    }
    static createSlideUp(t) {
        return new a1(t,a1.SLIDE_UP)
    }
    static createSlideDown(t) {
        return new a1(t,a1.SLIDE_DOWN)
    }
    constructor(t, e) {
        super(t, "sl.");
        if (this.setAttribute("type", "TabSlide"),
        !e) {
            const i = t.first_note.getPositions()[0].fret
              , s = t.last_note.getPositions()[0].fret;
            e = parseInt(i, 10) > parseInt(s, 10) ? a1.SLIDE_DOWN : a1.SLIDE_UP
        }
        this.slide_direction = e,
        this.render_options.cp1 = 11,
        this.render_options.cp2 = 14,
        this.render_options.y_shift = .5,
        this.setFont({
            font: "Times",
            size: 10,
            style: "bold italic"
        }),
        this.setNotes(t)
    }
    renderTie(t) {
        if (t.first_ys.length === 0 || t.last_ys.length === 0)
            throw new f.RERR("BadArguments","No Y-values to render");
        const e = this.context
          , i = t.first_x_px
          , s = t.first_ys
          , n = t.last_x_px
          , o = this.slide_direction;
        if (o !== a1.SLIDE_UP && o !== a1.SLIDE_DOWN)
            throw new f.RERR("BadSlide","Invalid slide direction");
        for (let l = 0; l < this.first_indices.length; ++l) {
            const c = s[this.first_indices[l]] + this.render_options.y_shift;
            if (isNaN(c))
                throw new f.RERR("BadArguments","Bad indices for slide rendering.");
            e.beginPath(),
            e.moveTo(i, c + 3 * o),
            e.lineTo(n, c - 3 * o),
            e.closePath(),
            e.stroke()
        }
        this.setRendered()
    }
}
class S1 extends H {
    static get CATEGORY() {
        return "gracenotes"
    }
    static get LEDGER_LINE_OFFSET() {
        return 2
    }
    static get SCALE() {
        return .66
    }
    constructor(t) {
        super(Object.assign(t, {
            glyph_font_scale: y.DEFAULT_NOTATION_FONT_SCALE * S1.SCALE,
            stroke_px: S1.LEDGER_LINE_OFFSET
        }));
        this.setAttribute("type", "GraceNote"),
        this.slash = t.slash,
        this.slur = !0,
        this.buildNoteHeads(),
        this.width = 3
    }
    getStemExtension() {
        if (this.stem_extension_override != null)
            return this.stem_extension_override;
        const t = this.getGlyph();
        if (t) {
            let e = super.getStemExtension();
            if (t.stem) {
                const i = this.getStaveNoteScale();
                e = (P.HEIGHT + e) * i - P.HEIGHT
            }
            return e
        }
        return 0
    }
    getCategory() {
        return S1.CATEGORY
    }
    getStaveNoteScale() {
        return this.render_options.glyph_font_scale / y.DEFAULT_NOTATION_FONT_SCALE
    }
    draw() {
        super.draw(),
        this.setRendered();
        const t = this.stem;
        if (this.slash && t) {
            const e = this.getStaveNoteScale()
              , i = e / .66;
            let s;
            const n = this.beam;
            if (n)
                n.postFormatted || n.postFormat(),
                s = this.calcBeamedNotesSlashBBox(8 * i, 8 * i, {
                    stem: 6 * i,
                    beam: 5 * i
                });
            else {
                const l = this.getStemDirection()
                  , c = this.getNoteHeadBounds()
                  , d = t.getHeight();
                let u = this.getAbsoluteX()
                  , b = l === y.Stem.DOWN ? c.y_top - d : c.y_bottom - d;
                const r = l === y.Stem.DOWN ? this.glyph.stem_down_extension : this.glyph.stem_up_extension;
                let h = y.STEM_HEIGHT;
                h -= h / 2.8,
                h += r,
                b += h * e * l;
                const m = l === y.Stem.UP ? {
                    x1: 1,
                    y1: 0,
                    x2: 13,
                    y2: -9
                } : {
                    x1: -4,
                    y1: 1,
                    x2: 13,
                    y2: 9
                };
                u += m.x1 * i,
                b += m.y1 * i,
                s = {
                    x1: u,
                    y1: b,
                    x2: u + m.x2 * i,
                    y2: b + m.y2 * i
                }
            }
            const o = this.context;
            o.save(),
            o.setLineWidth(1 * i),
            o.beginPath(),
            o.moveTo(s.x1, s.y1),
            o.lineTo(s.x2, s.y2),
            o.closePath(),
            o.stroke(),
            o.restore()
        }
    }
    calcBeamedNotesSlashBBox(t, e, i) {
        const s = this.beam
          , n = s.slope
          , l = s.notes[s.notes.length - 1] === this ? -1 : 1
          , c = Math.atan(n * l)
          , d = {
            dx: Math.cos(c) * e,
            dy: Math.sin(c) * e
        };
        t *= this.getStemDirection();
        const u = Math.atan((d.dy - t) / d.dx)
          , b = Math.cos(u) * i.stem * l
          , r = Math.sin(u) * i.stem
          , h = Math.cos(u) * i.beam * l
          , m = Math.sin(u) * i.beam
          , _ = this.getStemX()
          , x = s.notes[0].getStemX()
          , p = this.beam.getBeamYToDraw() + (_ - x) * n;
        return {
            x1: _ - b,
            y1: p + t - r,
            x2: _ + d.dx * l + h,
            y2: p + d.dy + m
        }
    }
}
class y2 extends W1 {
    static get CATEGORY() {
        return "gracetabnotes"
    }
    constructor(t) {
        super(t, !1);
        this.setAttribute("type", "GraceTabNote"),
        f.Merge(this.render_options, {
            y_shift: .3,
            scale: .6,
            font: "7.5pt Arial"
        }),
        this.updateWidth()
    }
    getCategory() {
        return y2.CATEGORY
    }
    draw() {
        super.draw(),
        this.setRendered()
    }
}
class o2 {
    static get names() {
        return {
            standard: "E/5,B/4,G/4,D/4,A/3,E/3",
            dagdad: "D/5,A/4,G/4,D/4,A/3,D/3",
            dropd: "E/5,B/4,G/4,D/4,A/3,D/3",
            eb: "Eb/5,Bb/4,Gb/4,Db/4,Ab/3,Db/3",
            standardBanjo: "D/5,B/4,G/4,D/4,G/5"
        }
    }
    constructor(t="E/5,B/4,G/4,D/4,A/3,E/3,B/2,E/2") {
        this.setTuning(t)
    }
    noteToInteger(t) {
        return y.keyProperties(t).int_value
    }
    setTuning(t) {
        o2.names[t] && (t = o2.names[t]),
        this.tuningString = t,
        this.tuningValues = [],
        this.numStrings = 0;
        const e = t.split(/\s*,\s*/);
        if (e.length === 0)
            throw new f.RERR("BadArguments","Invalid tuning string: " + t);
        this.numStrings = e.length;
        for (let i = 0; i < this.numStrings; ++i)
            this.tuningValues[i] = this.noteToInteger(e[i])
    }
    getValueForString(t) {
        const e = parseInt(t, 10);
        if (e < 1 || e > this.numStrings)
            throw new f.RERR("BadArguments",`String number must be between 1 and ${this.numStrings}:${t}`);
        return this.tuningValues[e - 1]
    }
    getValueForFret(t, e) {
        const i = this.getValueForString(e)
          , s = parseInt(t, 10);
        if (s < 0)
            throw new f.RERR("BadArguments","Fret number must be 0 or higher: " + t);
        return i + s
    }
    getNoteForFret(t, e) {
        const i = this.getValueForFret(t, e)
          , s = Math.floor(i / 12)
          , n = i % 12;
        return y.integerToNote(n) + "/" + s
    }
}
class Ct {
    constructor(t) {
        this.music = new z,
        this.setKey(t)
    }
    setKey(t) {
        return this.key = t,
        this.reset(),
        this
    }
    getKey() {
        return this.key
    }
    reset() {
        if (this.keyParts = this.music.getKeyParts(this.key),
        this.keyString = this.keyParts.root,
        this.keyParts.accidental && (this.keyString += this.keyParts.accidental),
        !z.scaleTypes[this.keyParts.type])
            throw new f.RERR("BadArguments",`Unsupported key type: ${this.key}`);
        this.scale = this.music.getScaleTones(this.music.getNoteValue(this.keyString), z.scaleTypes[this.keyParts.type]),
        this.scaleMap = {},
        this.scaleMapByValue = {},
        this.originalScaleMapByValue = {};
        const e = z.root_indices[this.keyParts.root];
        for (let i = 0; i < z.roots.length; ++i) {
            const s = (e + i) % z.roots.length
              , n = z.roots[s]
              , o = this.music.getRelativeNoteName(n, this.scale[i]);
            this.scaleMap[n] = o,
            this.scaleMapByValue[this.scale[i]] = o,
            this.originalScaleMapByValue[this.scale[i]] = o
        }
        return this
    }
    getAccidental(t) {
        const e = this.music.getKeyParts(t).root
          , i = this.music.getNoteParts(this.scaleMap[e]);
        return {
            note: this.scaleMap[e],
            accidental: i.accidental
        }
    }
    selectNote(t) {
        t = t.toLowerCase();
        const e = this.music.getNoteParts(t)
          , i = this.scaleMap[e.root]
          , s = this.music.getNoteParts(i);
        if (i === t)
            return {
                note: i,
                accidental: e.accidental,
                change: !1
            };
        const n = this.scaleMapByValue[this.music.getNoteValue(t)];
        if (n != null)
            return {
                note: n,
                accidental: this.music.getNoteParts(n).accidental,
                change: !1
            };
        const o = this.originalScaleMapByValue[this.music.getNoteValue(t)];
        return o != null ? (this.scaleMap[s.root] = o,
        delete this.scaleMapByValue[this.music.getNoteValue(i)],
        this.scaleMapByValue[this.music.getNoteValue(t)] = o,
        {
            note: o,
            accidental: this.music.getNoteParts(o).accidental,
            change: !0
        }) : s.root === t ? (delete this.scaleMapByValue[this.music.getNoteValue(this.scaleMap[e.root])],
        this.scaleMapByValue[this.music.getNoteValue(s.root)] = s.root,
        this.scaleMap[s.root] = s.root,
        {
            note: s.root,
            accidental: null,
            change: !0
        }) : (delete this.scaleMapByValue[this.music.getNoteValue(this.scaleMap[e.root])],
        this.scaleMapByValue[this.music.getNoteValue(t)] = t,
        delete this.scaleMap[s.root],
        this.scaleMap[s.root] = t,
        {
            note: t,
            accidental: e.accidental,
            change: !0
        })
    }
}
class U1 extends X {
    static get type() {
        return {
            CRESC: 1,
            DECRESC: 2
        }
    }
    static FormatByTicksAndDraw(t, e, i, s, n, o) {
        const l = e.pixelsPerTick;
        if (l == null)
            throw new f.RuntimeError("BadArguments","A valid Formatter must be provide to draw offsets by ticks.");
        const c = l * o.left_shift_ticks
          , d = l * o.right_shift_ticks
          , u = {
            height: o.height,
            y_shift: o.y_shift,
            left_shift_px: c,
            right_shift_px: d
        };
        new U1({
            first_note: i.first_note,
            last_note: i.last_note
        },s).setContext(t).setRenderOptions(u).setPosition(n).draw()
    }
    constructor(t, e) {
        super();
        this.setAttribute("type", "StaveHairpin"),
        this.notes = t,
        this.hairpin = e,
        this.position = M.Position.BELOW,
        this.render_options = {
            height: 10,
            y_shift: 0,
            left_shift_px: 0,
            right_shift_px: 0
        },
        this.setNotes(t)
    }
    setPosition(t) {
        return (t === M.Position.ABOVE || t === M.Position.BELOW) && (this.position = t),
        this
    }
    setRenderOptions(t) {
        return t.height != null && t.y_shift != null && t.left_shift_px != null && t.right_shift_px != null && (this.render_options = t),
        this
    }
    setNotes(t) {
        if (!t.first_note && !t.last_note)
            throw new f.RuntimeError("BadArguments","Hairpin needs to have either first_note or last_note set.");
        return this.first_note = t.first_note,
        this.last_note = t.last_note,
        this
    }
    renderHairpin(t) {
        const e = this.checkContext();
        let i = this.render_options.y_shift + 20
          , s = t.first_y;
        this.position === M.Position.ABOVE && (i = -i + 30,
        s = t.first_y - t.staff_height);
        const n = this.render_options.left_shift_px
          , o = this.render_options.right_shift_px;
        switch (e.beginPath(),
        this.hairpin) {
        case U1.type.CRESC:
            e.moveTo(t.last_x + o, s + i),
            e.lineTo(t.first_x + n, s + this.render_options.height / 2 + i),
            e.lineTo(t.last_x + o, s + this.render_options.height + i);
            break;
        case U1.type.DECRESC:
            e.moveTo(t.first_x + n, s + i),
            e.lineTo(t.last_x + o, s + this.render_options.height / 2 + i),
            e.lineTo(t.first_x + n, s + this.render_options.height + i);
            break
        }
        e.stroke(),
        e.closePath()
    }
    draw() {
        this.checkContext(),
        this.setRendered();
        const t = this.first_note
          , e = this.last_note
          , i = t.getModifierStartXY(this.position, 0)
          , s = e.getModifierStartXY(this.position, 0);
        return this.renderHairpin({
            first_x: i.x,
            last_x: s.x,
            first_y: t.getStave().y + t.getStave().height,
            last_y: e.getStave().y + e.getStave().height,
            staff_height: t.getStave().height
        }),
        !0
    }
}
class o1 extends X {
    static get Position() {
        return {
            NEAR_HEAD: 1,
            NEAR_TOP: 2
        }
    }
    static get PositionString() {
        return {
            nearHead: o1.Position.NEAR_HEAD,
            nearTop: o1.Position.NEAR_TOP
        }
    }
    constructor(t, e, i) {
        super();
        this.setAttribute("type", "Curve"),
        this.render_options = {
            spacing: 2,
            thickness: 2,
            x_shift: 0,
            y_shift: 10,
            position: o1.Position.NEAR_HEAD,
            position_end: o1.Position.NEAR_HEAD,
            invert: !1,
            cps: [{
                x: 0,
                y: 10
            }, {
                x: 0,
                y: 10
            }]
        },
        f.Merge(this.render_options, i),
        this.setNotes(t, e)
    }
    setNotes(t, e) {
        if (!t && !e)
            throw new f.RuntimeError("BadArguments","Curve needs to have either first_note or last_note set.");
        return this.from = t,
        this.to = e,
        this
    }
    isPartial() {
        return !this.from || !this.to
    }
    renderCurve(t) {
        const e = this.context
          , i = this.render_options.cps
          , s = this.render_options.x_shift
          , n = this.render_options.y_shift * t.direction
          , o = t.first_x + s
          , l = t.first_y + n
          , c = t.last_x - s
          , d = t.last_y + n
          , u = this.render_options.thickness
          , b = (c - o) / (i.length + 2);
        e.beginPath(),
        e.moveTo(o, l),
        e.bezierCurveTo(o + b + i[0].x, l + i[0].y * t.direction, c - b + i[1].x, d + i[1].y * t.direction, c, d),
        e.bezierCurveTo(c - b + i[1].x, d + (i[1].y + u) * t.direction, o + b + i[0].x, l + (i[0].y + u) * t.direction, o, l),
        e.stroke(),
        e.closePath(),
        e.fill()
    }
    draw() {
        this.checkContext(),
        this.setRendered();
        const t = this.from
          , e = this.to;
        let i, s, n, o, l, c = "baseY", d = "baseY";
        function u(h) {
            return typeof h == "string" ? o1.PositionString[h] : h
        }
        const b = u(this.render_options.position)
          , r = u(this.render_options.position_end);
        return b === o1.Position.NEAR_TOP && (c = "topY",
        d = "topY"),
        r === o1.Position.NEAR_HEAD ? d = "baseY" : r === o1.Position.NEAR_TOP && (d = "topY"),
        t ? (i = t.getTieRightX(),
        l = t.getStemDirection(),
        n = t.getStemExtents()[c]) : (i = e.getStave().getTieStartX(),
        n = e.getStemExtents()[c]),
        e ? (s = e.getTieLeftX(),
        l = e.getStemDirection(),
        o = e.getStemExtents()[d]) : (s = t.getStave().getTieEndX(),
        o = t.getStemExtents()[d]),
        this.renderCurve({
            first_x: i,
            last_x: s,
            first_y: n,
            last_y: o,
            direction: l * (this.render_options.invert === !0 ? -1 : 1)
        }),
        !0
    }
}
function b3(...a) {
    L1.DEBUG && f.L("Vex.Flow.TextDynamics", a)
}
class L1 extends J {
    static get GLYPHS() {
        return {
            f: {
                code: "dynamicForte",
                width: 12
            },
            p: {
                code: "dynamicPiano",
                width: 14
            },
            m: {
                code: "dynamicMezzo",
                width: 17
            },
            s: {
                code: "dynamicSforzando",
                width: 10
            },
            z: {
                code: "dynamicZ",
                width: 12
            },
            r: {
                code: "dynamicRinforzando",
                width: 12
            }
        }
    }
    constructor(t) {
        super(t);
        this.setAttribute("type", "TextDynamics"),
        this.sequence = t.text.toLowerCase(),
        this.line = t.line || 0,
        this.glyphs = [],
        f.Merge(this.render_options, {
            glyph_font_size: 40
        }),
        b3("New Dynamics Text: ", this.sequence)
    }
    setLine(t) {
        return this.line = t,
        this
    }
    preFormat() {
        let t = 0;
        return this.sequence.split("").forEach(e=>{
            const i = L1.GLYPHS[e];
            if (!i)
                throw new f.RERR("Invalid dynamics character: " + e);
            const s = this.render_options.glyph_font_size
              , n = new E(i.code,s,{
                category: "textNote"
            });
            this.glyphs.push(n),
            t += i.width
        }
        ),
        this.setWidth(t),
        this.preFormatted = !0,
        this
    }
    draw() {
        this.setRendered();
        const t = this.getAbsoluteX()
          , e = this.stave.getYForLine(this.line + -3);
        b3("Rendering Dynamics: ", this.sequence);
        let i = t;
        this.glyphs.forEach((s,n)=>{
            const o = this.sequence[n];
            s.render(this.context, i, e),
            i += L1.GLYPHS[o].width
        }
        )
    }
}
function o3(a, t, e, i, s, n, o) {
    a.beginPath(),
    a.moveTo(t, e),
    a.lineTo(i, s),
    a.lineTo(n, o),
    a.lineTo(t, e),
    a.closePath(),
    a.fill()
}
function Rt(a, t, e, i) {
    const s = i.draw_start_arrow && i.draw_end_arrow
      , n = t.x
      , o = t.y
      , l = e.x
      , c = e.y
      , d = Math.sqrt((l - n) * (l - n) + (c - o) * (c - o))
      , u = (d - i.arrowhead_length / 3) / d;
    let b, r, h, m;
    i.draw_end_arrow || s ? (b = Math.round(n + (l - n) * u),
    r = Math.round(o + (c - o) * u)) : (b = l,
    r = c),
    i.draw_start_arrow || s ? (h = n + (l - n) * (1 - u),
    m = o + (c - o) * (1 - u)) : (h = n,
    m = o),
    i.color && (a.setStrokeStyle(i.color),
    a.setFillStyle(i.color)),
    a.beginPath(),
    a.moveTo(h, m),
    a.lineTo(b, r),
    a.stroke(),
    a.closePath();
    const _ = Math.atan2(c - o, l - n)
      , x = Math.abs(i.arrowhead_length / Math.cos(i.arrowhead_angle));
    let p, g, T, w, S, v;
    (i.draw_end_arrow || s) && (p = _ + Math.PI + i.arrowhead_angle,
    T = l + Math.cos(p) * x,
    w = c + Math.sin(p) * x,
    g = _ + Math.PI - i.arrowhead_angle,
    S = l + Math.cos(g) * x,
    v = c + Math.sin(g) * x,
    o3(a, T, w, l, c, S, v)),
    (i.draw_start_arrow || s) && (p = _ + i.arrowhead_angle,
    T = n + Math.cos(p) * x,
    w = o + Math.sin(p) * x,
    g = _ - i.arrowhead_angle,
    S = n + Math.cos(g) * x,
    v = o + Math.sin(g) * x,
    o3(a, T, w, n, o, S, v))
}
class l1 extends X {
    static get TextVerticalPosition() {
        return {
            TOP: 1,
            BOTTOM: 2
        }
    }
    static get TextJustification() {
        return {
            LEFT: 1,
            CENTER: 2,
            RIGHT: 3
        }
    }
    constructor(t) {
        super();
        this.setAttribute("type", "StaveLine"),
        this.notes = t,
        this.text = "",
        this.font = {
            family: "Arial",
            size: 10,
            weight: ""
        },
        this.render_options = {
            padding_left: 4,
            padding_right: 3,
            line_width: 1,
            line_dash: null,
            rounded_end: !0,
            color: null,
            draw_start_arrow: !1,
            draw_end_arrow: !1,
            arrowhead_length: 10,
            arrowhead_angle: Math.PI / 8,
            text_position_vertical: l1.TextVerticalPosition.TOP,
            text_justification: l1.TextJustification.CENTER
        },
        this.setNotes(t)
    }
    setFont(t) {
        return this.font = t,
        this
    }
    setText(t) {
        return this.text = t,
        this
    }
    setNotes(t) {
        if (!t.first_note && !t.last_note)
            throw new f.RuntimeError("BadArguments","Notes needs to have either first_note or last_note set.");
        if (t.first_indices || (t.first_indices = [0]),
        t.last_indices || (t.last_indices = [0]),
        t.first_indices.length !== t.last_indices.length)
            throw new f.RuntimeError("BadArguments","Connected notes must have similar index sizes");
        return this.first_note = t.first_note,
        this.first_indices = t.first_indices,
        this.last_note = t.last_note,
        this.last_indices = t.last_indices,
        this
    }
    applyLineStyle() {
        const t = this.checkContext()
          , e = this.render_options;
        e.line_dash && t.setLineDash(e.line_dash),
        e.line_width && t.setLineWidth(e.line_width),
        e.rounded_end ? t.setLineCap("round") : t.setLineCap("square")
    }
    applyFontStyle() {
        const t = this.checkContext();
        this.font && t.setFont(this.font.family, this.font.size, this.font.weight),
        this.render_options.color && (t.setStrokeStyle(this.render_options.color),
        t.setFillStyle(this.render_options.color))
    }
    draw() {
        const t = this.checkContext();
        this.setRendered();
        const e = this.first_note
          , i = this.last_note
          , s = this.render_options;
        t.save(),
        this.applyLineStyle();
        let n, o;
        this.first_indices.forEach((r,h)=>{
            const m = this.last_indices[h];
            n = e.getModifierStartXY(2, r),
            o = i.getModifierStartXY(1, m);
            const _ = n.y > o.y;
            n.x += e.getMetrics().modRightPx + s.padding_left,
            o.x -= i.getMetrics().modLeftPx + s.padding_right;
            const x = e.getGlyph().getWidth();
            e.getKeyProps()[r].displaced && e.getStemDirection() === 1 && (n.x += x + s.padding_left),
            i.getKeyProps()[m].displaced && i.getStemDirection() === -1 && (o.x -= x + s.padding_right),
            n.y += _ ? -3 : 1,
            o.y += _ ? 2 : 0,
            Rt(t, n, o, this.render_options)
        }
        ),
        t.restore();
        const l = t.measureText(this.text).width
          , c = s.text_justification;
        let d = 0;
        c === l1.TextJustification.LEFT ? d = n.x : c === l1.TextJustification.CENTER ? d = (o.x - n.x) / 2 + n.x - l / 2 : c === l1.TextJustification.RIGHT && (d = o.x - l);
        let u;
        const b = s.text_position_vertical;
        return b === l1.TextVerticalPosition.TOP ? u = e.getStave().getYForTopText() : b === l1.TextVerticalPosition.BOTTOM && (u = e.getStave().getYForBottomText(y.TEXT_HEIGHT_OFFSET_HACK)),
        t.save(),
        this.applyFontStyle(),
        t.fillText(this.text, d, u),
        t.restore(),
        this
    }
}
function Nt(...a) {
    j.DEBUG && f.L("Vex.Flow.PedalMarking", a)
}
function w2(a, t, e, i, s) {
    const n = j.GLYPHS[a];
    new E(n.code,s,{
        category: "pedalMarking"
    }).render(t, e + n.x_shift, i + n.y_shift)
}
class j extends X {
    static get GLYPHS() {
        return {
            pedal_depress: {
                code: "keyboardPedalPed",
                x_shift: -10,
                y_shift: 0
            },
            pedal_release: {
                code: "keyboardPedalUp",
                x_shift: -2,
                y_shift: 3
            }
        }
    }
    static get Styles() {
        return {
            TEXT: 1,
            BRACKET: 2,
            MIXED: 3
        }
    }
    static get StylesString() {
        return {
            text: j.Styles.TEXT,
            bracket: j.Styles.BRACKET,
            mixed: j.Styles.MIXED
        }
    }
    static createSustain(t) {
        return new j(t)
    }
    static createSostenuto(t) {
        const e = new j(t);
        return e.setStyle(j.Styles.MIXED),
        e.setCustomText("Sost. Ped."),
        e
    }
    static createUnaCorda(t) {
        const e = new j(t);
        return e.setStyle(j.Styles.TEXT),
        e.setCustomText("una corda", "tre corda"),
        e
    }
    constructor(t) {
        super();
        this.setAttribute("type", "PedalMarking"),
        this.notes = t,
        this.style = j.TEXT,
        this.line = 0,
        this.custom_depress_text = "",
        this.custom_release_text = "",
        this.font = {
            family: "Times New Roman",
            size: 12,
            weight: "italic bold"
        },
        this.render_options = {
            bracket_height: 10,
            text_margin_right: 6,
            bracket_line_width: 1,
            color: "black"
        }
    }
    setCustomText(t, e) {
        return this.custom_depress_text = t || "",
        this.custom_release_text = e || "",
        this
    }
    setStyle(t) {
        if (t < 1 && t > 3)
            throw new f.RERR("InvalidParameter","The style must be one found in PedalMarking.Styles");
        return this.style = t,
        this
    }
    setLine(t) {
        return this.line = t,
        this
    }
    drawBracketed() {
        const t = this.context;
        let e = !1, i, s;
        const n = this;
        this.notes.forEach((o,l,c)=>{
            e = !e;
            const d = o.getAbsoluteX()
              , u = o.getStave().getYForBottomText(n.line + 3);
            if (d < i)
                throw new f.RERR("InvalidConfiguration","The notes provided must be in order of ascending x positions");
            const b = c[l + 1] === o
              , r = c[l - 1] === o;
            let h = 0;
            const m = this.musicFont.lookupMetric(`pedalMarking.${e ? "down" : "up"}.point`);
            if (e)
                if (h = r ? 5 : 0,
                n.style === j.Styles.MIXED && !r)
                    if (n.custom_depress_text) {
                        const _ = t.measureText(n.custom_depress_text).width;
                        t.fillText(n.custom_depress_text, d - _ / 2, u),
                        h = _ / 2 + n.render_options.text_margin_right
                    } else
                        w2("pedal_depress", t, d, u, m),
                        h = 20 + n.render_options.text_margin_right;
                else
                    t.beginPath(),
                    t.moveTo(d, u - n.render_options.bracket_height),
                    t.lineTo(d + h, u),
                    t.stroke(),
                    t.closePath();
            else
                h = b ? -5 : 0,
                t.beginPath(),
                t.moveTo(i, s),
                t.lineTo(d + h, u),
                t.lineTo(d, u - n.render_options.bracket_height),
                t.stroke(),
                t.closePath();
            i = d + h,
            s = u
        }
        )
    }
    drawText() {
        const t = this.context;
        let e = !1;
        const i = this;
        this.notes.forEach(s=>{
            e = !e;
            const n = s.getStave()
              , o = s.getAbsoluteX()
              , l = n.getYForBottomText(i.line + 3)
              , c = this.musicFont.lookupMetric(`pedalMarking.${e ? "down" : "up"}.point`);
            let d = 0;
            e ? i.custom_depress_text ? (d = t.measureText(i.custom_depress_text).width,
            t.fillText(i.custom_depress_text, o - d / 2, l)) : w2("pedal_depress", t, o, l, c) : i.custom_release_text ? (d = t.measureText(i.custom_release_text).width,
            t.fillText(i.custom_release_text, o - d / 2, l)) : w2("pedal_release", t, o, l, c)
        }
        )
    }
    draw() {
        const t = this.checkContext();
        this.setRendered(),
        t.save(),
        t.setStrokeStyle(this.render_options.color),
        t.setFillStyle(this.render_options.color),
        t.setFont(this.font.family, this.font.size, this.font.weight),
        Nt("Rendering Pedal Marking"),
        this.style === j.Styles.BRACKET || this.style === j.Styles.MIXED ? (t.setLineWidth(this.render_options.bracket_line_width),
        this.drawBracketed()) : this.style === j.Styles.TEXT && this.drawText(),
        t.restore()
    }
}
function Bt(...a) {
    s1.DEBUG && f.L("Vex.Flow.TextBracket", a)
}
class s1 extends X {
    static get Positions() {
        return {
            TOP: 1,
            BOTTOM: -1
        }
    }
    static get PositionString() {
        return {
            top: s1.Positions.TOP,
            bottom: s1.Positions.BOTTOM
        }
    }
    constructor({start: t, stop: e, text: i="", superscript: s="", position: n=s1.Positions.TOP}) {
        super();
        this.setAttribute("type", "TextBracket"),
        this.start = t,
        this.stop = e,
        this.text = i,
        this.superscript = s,
        this.position = typeof n == "string" ? s1.PositionString[n] : n,
        this.line = 1,
        this.font = {
            family: "Serif",
            size: 15,
            weight: "italic"
        },
        this.render_options = {
            dashed: !0,
            dash: [5],
            color: "black",
            line_width: 1,
            show_bracket: !0,
            bracket_height: 8,
            underline_superscript: !0
        }
    }
    applyStyle(t) {
        return t.setFont(this.font.family, this.font.size, this.font.weight),
        t.setStrokeStyle(this.render_options.color),
        t.setFillStyle(this.render_options.color),
        t.setLineWidth(this.render_options.line_width),
        this
    }
    setDashed(t, e) {
        return this.render_options.dashed = t,
        e && (this.render_options.dash = e),
        this
    }
    setFont(t) {
        return this.font = R(R({}, this.font), t),
        this
    }
    setLine(t) {
        return this.line = t,
        this
    }
    draw() {
        const t = this.context;
        this.setRendered();
        let e = 0;
        switch (this.position) {
        case s1.Positions.TOP:
            e = this.start.getStave().getYForTopText(this.line);
            break;
        case s1.Positions.BOTTOM:
            e = this.start.getStave().getYForBottomText(this.line + y.TEXT_HEIGHT_OFFSET_HACK);
            break;
        default:
            throw new f.RERR("InvalidPosition",`The position ${this.position} is invalid`)
        }
        const i = {
            x: this.start.getAbsoluteX(),
            y: e
        }
          , s = {
            x: this.stop.getAbsoluteX(),
            y: e
        };
        Bt("Rendering TextBracket: start:", i, "stop:", s, "y:", e);
        const n = this.render_options.bracket_height * this.position;
        t.save(),
        this.applyStyle(t),
        t.fillText(this.text, i.x, i.y);
        const o = t.measureText(this.text).width
          , l = t.measureText("M").width
          , c = i.y - l / 2.5;
        t.setFont(this.font.family, this.font.size / 1.4, this.font.weight),
        t.fillText(this.superscript, i.x + o + 1, c);
        const d = t.measureText(this.superscript).width
          , u = t.measureText("M").width;
        let b = i.x
          , r = c;
        const h = s.x + this.stop.getGlyph().getWidth();
        this.position === s1.Positions.TOP ? (b += o + d + 5,
        r -= u / 2.7) : this.position === s1.Positions.BOTTOM && (r += u / 2.7,
        b += o + 2,
        this.render_options.underline_superscript || (b += d)),
        this.render_options.dashed ? (O.drawDashedLine(t, b, r, h, r, this.render_options.dash),
        this.render_options.show_bracket && O.drawDashedLine(t, h, r + 1 * this.position, h, r + n, this.render_options.dash)) : (t.beginPath(),
        t.moveTo(b, r),
        t.lineTo(h, r),
        this.render_options.show_bracket && t.lineTo(h, r + n),
        t.stroke(),
        t.closePath()),
        t.restore()
    }
}
function Ft(...a) {
    T2.DEBUG && f.L("Vex.Flow.BarNote", a)
}
class T2 extends J {
    constructor(t=L.type.SINGLE) {
        super({
            duration: "b"
        });
        this.setAttribute("type", "BarNote"),
        this.metrics = {
            widths: {}
        };
        const e = L.type;
        this.metrics.widths = {
            [e.SINGLE]: 8,
            [e.DOUBLE]: 12,
            [e.END]: 15,
            [e.REPEAT_BEGIN]: 14,
            [e.REPEAT_END]: 14,
            [e.REPEAT_BOTH]: 18,
            [e.NONE]: 0
        },
        this.ignore_ticks = !0,
        this.setType(t)
    }
    getType() {
        return this.type
    }
    setType(t) {
        return this.type = typeof t == "string" ? L.typeString[t] : t,
        this.setWidth(this.metrics.widths[this.type]),
        this
    }
    getBoundingBox() {
        return super.getBoundingBox()
    }
    addToModifierContext() {
        return this
    }
    preFormat() {
        return this.setPreFormatted(!0),
        this
    }
    draw() {
        if (this.checkContext(),
        !this.stave)
            throw new f.RERR("NoStave","Can't draw without a stave.");
        Ft("Rendering bar line at: ", this.getAbsoluteX());
        const t = new L(this.type);
        t.setX(this.getAbsoluteX()),
        t.draw(this.stave),
        this.setRendered()
    }
}
class r3 extends m2 {
    constructor(t) {
        if (!t)
            throw new f.RuntimeError("BadArguments","Ghost note must have valid initialization data to identify duration.");
        let e;
        if (typeof t == "string")
            e = {
                duration: t
            };
        else if (typeof t == "object")
            e = t;
        else
            throw new f.RuntimeError("BadArguments","Ghost note must have valid initialization data to identify duration.");
        super(e);
        this.setAttribute("type", "GhostNote"),
        this.setWidth(0)
    }
    isRest() {
        return !0
    }
    setStave(t) {
        super.setStave(t)
    }
    addToModifierContext() {
        return this
    }
    preFormat() {
        return this.setPreFormatted(!0),
        this
    }
    draw() {
        if (!this.stave)
            throw new f.RERR("NoStave","Can't draw without a stave.");
        this.setRendered();
        for (let t = 0; t < this.modifiers.length; ++t) {
            const e = this.modifiers[t];
            e.setContext(this.context),
            e.drawWithStyle()
        }
    }
}
class S2 extends M {
    static get CATEGORY() {
        return "tremolo"
    }
    constructor(t) {
        super();
        this.setAttribute("type", "Tremolo"),
        this.num = t,
        this.note = null,
        this.index = null,
        this.position = M.Position.CENTER,
        this.code = "tremolo1"
    }
    getCategory() {
        return S2.CATEGORY
    }
    draw() {
        if (this.checkContext(),
        !(this.note && this.index != null))
            throw new f.RERR("NoAttachedNote","Can't draw Tremolo without a note and index.");
        this.setRendered();
        const t = this.note.getStemDirection();
        let i = this.note.getModifierStartXY(this.position, this.index).x;
        const s = this.note.getCategory() === "gracenotes"
          , n = s ? S1.SCALE : 1
          , o = `tremolo.${s ? "grace" : "default"}`;
        this.y_spacing = this.musicFont.lookupMetric(`${o}.spacing`) * t;
        const l = this.num * this.y_spacing;
        let c = this.note.stem.getExtents().baseY - l;
        t < 0 ? c += this.musicFont.lookupMetric(`${o}.offsetYStemDown`) * n : c += this.musicFont.lookupMetric(`${o}.offsetYStemUp`) * n,
        this.font = {
            family: "Arial",
            size: 16 * n,
            weight: ""
        },
        this.render_options = {
            font_scale: this.musicFont.lookupMetric(`${o}.point`),
            stroke_px: 3,
            stroke_spacing: 10 * n
        },
        i += this.musicFont.lookupMetric(`${o}.offsetXStem${t === P.UP ? "Up" : "Down"}`);
        for (let d = 0; d < this.num; ++d)
            E.renderGlyph(this.context, i, c, this.render_options.font_scale, this.code, {
                category: o
            }),
            c += this.y_spacing
    }
}
function Lt(...a) {
    a3.DEBUG && f.L("Vex.Flow.Crescendo", a)
}
function Dt(a, t) {
    const e = t.begin_x
      , i = t.end_x
      , s = t.y
      , n = t.height / 2;
    a.beginPath(),
    t.reverse ? (a.moveTo(e, s - n),
    a.lineTo(i, s),
    a.lineTo(e, s + n)) : (a.moveTo(i, s - n),
    a.lineTo(e, s),
    a.lineTo(i, s + n)),
    a.stroke(),
    a.closePath()
}
class a3 extends J {
    constructor(t) {
        super(t);
        this.setAttribute("type", "Crescendo"),
        this.decrescendo = !1,
        this.line = t.line || 0,
        this.height = 15,
        f.Merge(this.render_options, {
            extend_left: 0,
            extend_right: 0,
            y_shift: 0
        })
    }
    setLine(t) {
        return this.line = t,
        this
    }
    setHeight(t) {
        return this.height = t,
        this
    }
    setDecrescendo(t) {
        return this.decrescendo = t,
        this
    }
    preFormat() {
        return this.preFormatted = !0,
        this
    }
    draw() {
        this.checkContext(),
        this.setRendered();
        const t = this.getTickContext()
          , e = B1.getNextContext(t)
          , i = this.getAbsoluteX()
          , s = e ? e.getX() : this.stave.x + this.stave.width
          , n = this.stave.getYForLine(this.line + -3) + 1;
        Lt("Drawing ", this.decrescendo ? "decrescendo " : "crescendo ", this.height, "x", i - s),
        Dt(this.context, {
            begin_x: i - this.render_options.extend_left,
            end_x: s + this.render_options.extend_right,
            y: n + this.render_options.y_shift,
            height: this.height,
            reverse: this.decrescendo
        })
    }
}
class v2 extends J {
    constructor(t, e, i) {
        super(e);
        this.options = R({
            ignoreTicks: !1,
            line: 2
        }, i),
        this.setAttribute("type", "GlyphNote"),
        this.ignore_ticks = this.options.ignoreTicks,
        t && this.setGlyph(t)
    }
    setGlyph(t) {
        return this.glyph = t,
        this.setWidth(this.glyph.getMetrics().width),
        this
    }
    getBoundingBox() {
        return this.glyph.getBoundingBox()
    }
    preFormat() {
        return this.setPreFormatted(!0),
        this
    }
    draw() {
        this.stave.checkContext(),
        this.setRendered(),
        this.glyph.getContext() || this.glyph.setContext(this.context),
        this.glyph.setStave(this.stave),
        this.glyph.setYShift(this.stave.getYForLine(this.options.line) - this.stave.getYForGlyphs());
        const t = this.isCenterAligned() ? this.getAbsoluteX() - this.getWidth() / 2 : this.getAbsoluteX();
        this.glyph.renderToStave(t)
    }
}
class l3 extends v2 {
    constructor(t, e, i) {
        const s = {
            "1": "repeat1Bar",
            "2": "repeat2Bars",
            "4": "repeat4Bars",
            slash: "repeatBarSlash"
        };
        e = R({
            duration: "q",
            align_center: t !== "slash"
        }, e);
        super(null, R({
            duration: "q",
            align_center: t !== "slash"
        }, e), i);
        this.setAttribute("type", "RepeatNote");
        const n = s[t] || "repeat1Bar"
          , o = new E(n,this.musicFont.lookupMetric("repeatNote.point", 40),{
            category: "repeatNote"
        });
        this.setGlyph(o)
    }
}
function Ot(...a) {
    P2.DEBUG && f.L("Vex.Flow.Parser", a)
}
const h3 = f.MakeException("ParserError");
function r2(a) {
    return a.matchedString !== void 0 ? a.matchedString : a.results ? r2(a.results) : a.length === 1 ? r2(a[0]) : a.length === 0 ? null : a.map(r2)
}
class P2 {
    constructor(t) {
        this.grammar = t
    }
    parse(t) {
        this.line = t,
        this.pos = 0,
        this.errorPos = -1;
        const e = this.expect(this.grammar.begin());
        return e.errorPos = this.errorPos,
        e
    }
    matchFail(t) {
        this.errorPos === -1 && (this.errorPos = this.pos),
        this.pos = t
    }
    matchSuccess() {
        this.errorPos = -1
    }
    matchToken(t, e=!1) {
        const i = e ? new RegExp("^((" + t + "))") : new RegExp("^((" + t + ")\\s*)")
          , n = this.line.slice(this.pos).match(i);
        return n !== null ? {
            success: !0,
            matchedString: n[2],
            incrementPos: n[1].length,
            pos: this.pos
        } : {
            success: !1,
            pos: this.pos
        }
    }
    expectOne(t, e=!1) {
        const i = []
          , s = this.pos;
        let n = !0
          , o = !1;
        e = e === !0 || t.maybe === !0;
        for (let d = 0; d < t.expect.length; d++) {
            const u = t.expect[d]
              , b = this.pos
              , r = this.expect(u);
            if (r.success) {
                if (i.push(r),
                o = !0,
                t.or)
                    break
            } else if (n = !1,
            !t.or) {
                this.pos = b;
                break
            }
        }
        const l = t.or && o || n
          , c = l || e === !0;
        return e && !l && (this.pos = s),
        c ? this.matchSuccess() : this.matchFail(s),
        {
            success: c,
            results: i,
            numMatches: l ? 1 : 0
        }
    }
    expectOneOrMore(t, e=!1) {
        const i = []
          , s = this.pos;
        let n = 0
          , o = !0;
        do {
            const c = this.expectOne(t);
            c.success ? (n++,
            i.push(c.results)) : o = !1
        } while (o);
        const l = n > 0 || e === !0;
        return e && !(n > 0) && (this.pos = s),
        l ? this.matchSuccess() : this.matchFail(s),
        {
            success: l,
            results: i,
            numMatches: n
        }
    }
    expectZeroOrMore(t) {
        return this.expectOneOrMore(t, !0)
    }
    expect(t) {
        Ot("Evaluating rules:", t);
        let e;
        if (!t)
            throw new h3("Invalid Rule: " + t,t);
        const i = t.bind(this.grammar)();
        if (i.token)
            e = this.matchToken(i.token, i.noSpace === !0),
            e.success && (this.pos += e.incrementPos);
        else if (i.expect)
            i.oneOrMore ? e = this.expectOneOrMore(i) : i.zeroOrMore ? e = this.expectZeroOrMore(i) : e = this.expectOne(i);
        else
            throw new h3("Bad grammar! No `token` or `expect` property",i);
        return e.matches = [],
        e.results && e.results.forEach(s=>e.matches.push(r2(s))),
        i.run && e.success && i.run(e),
        e
    }
}
function h1(...a) {
    E2.DEBUG && f.L("Vex.Flow.EasyScore", a)
}
const zt = f.MakeException("EasyScoreError");
class It {
    constructor(t) {
        this.builder = t
    }
    begin() {
        return this.LINE
    }
    LINE() {
        return {
            expect: [this.PIECE, this.PIECES, this.EOL]
        }
    }
    PIECE() {
        return {
            expect: [this.CHORDORNOTE, this.PARAMS],
            run: ()=>this.builder.commitPiece()
        }
    }
    PIECES() {
        return {
            expect: [this.COMMA, this.PIECE],
            zeroOrMore: !0
        }
    }
    PARAMS() {
        return {
            expect: [this.DURATION, this.TYPE, this.DOTS, this.OPTS]
        }
    }
    CHORDORNOTE() {
        return {
            expect: [this.CHORD, this.SINGLENOTE],
            or: !0
        }
    }
    CHORD() {
        return {
            expect: [this.LPAREN, this.NOTES, this.RPAREN],
            run: t=>this.builder.addChord(t.matches[1])
        }
    }
    NOTES() {
        return {
            expect: [this.NOTE],
            oneOrMore: !0
        }
    }
    NOTE() {
        return {
            expect: [this.NOTENAME, this.ACCIDENTAL, this.OCTAVE]
        }
    }
    SINGLENOTE() {
        return {
            expect: [this.NOTENAME, this.ACCIDENTAL, this.OCTAVE],
            run: t=>this.builder.addSingleNote(t.matches[0], t.matches[1], t.matches[2])
        }
    }
    ACCIDENTAL() {
        return {
            expect: [this.ACCIDENTALS],
            maybe: !0
        }
    }
    DOTS() {
        return {
            expect: [this.DOT],
            zeroOrMore: !0,
            run: t=>this.builder.setNoteDots(t.matches[0])
        }
    }
    TYPE() {
        return {
            expect: [this.SLASH, this.MAYBESLASH, this.TYPES],
            maybe: !0,
            run: t=>this.builder.setNoteType(t.matches[2])
        }
    }
    DURATION() {
        return {
            expect: [this.SLASH, this.DURATIONS],
            maybe: !0,
            run: t=>this.builder.setNoteDuration(t.matches[1])
        }
    }
    OPTS() {
        return {
            expect: [this.LBRACKET, this.KEYVAL, this.KEYVALS, this.RBRACKET],
            maybe: !0
        }
    }
    KEYVALS() {
        return {
            expect: [this.COMMA, this.KEYVAL],
            zeroOrMore: !0
        }
    }
    KEYVAL() {
        const t = e=>e.slice(1, -1);
        return {
            expect: [this.KEY, this.EQUALS, this.VAL],
            run: e=>this.builder.addNoteOption(e.matches[0], t(e.matches[2]))
        }
    }
    VAL() {
        return {
            expect: [this.SVAL, this.DVAL],
            or: !0
        }
    }
    KEY() {
        return {
            token: "[a-zA-Z][a-zA-Z0-9]*"
        }
    }
    DVAL() {
        return {
            token: '["][^"]*["]'
        }
    }
    SVAL() {
        return {
            token: "['][^']*[']"
        }
    }
    NOTENAME() {
        return {
            token: "[a-gA-G]"
        }
    }
    OCTAVE() {
        return {
            token: "[0-9]+"
        }
    }
    ACCIDENTALS() {
        return {
            token: "bbs|bb|bss|bs|b|db|d|##|#|n|\\+\\+-|\\+-|\\+\\+|\\+|k|o"
        }
    }
    DURATIONS() {
        return {
            token: "[0-9whq]+"
        }
    }
    TYPES() {
        return {
            token: "[rRsSxX]"
        }
    }
    LPAREN() {
        return {
            token: "[(]"
        }
    }
    RPAREN() {
        return {
            token: "[)]"
        }
    }
    COMMA() {
        return {
            token: "[,]"
        }
    }
    DOT() {
        return {
            token: "[.]"
        }
    }
    SLASH() {
        return {
            token: "[/]"
        }
    }
    MAYBESLASH() {
        return {
            token: "[/]?"
        }
    }
    EQUALS() {
        return {
            token: "[=]"
        }
    }
    LBRACKET() {
        return {
            token: "\\["
        }
    }
    RBRACKET() {
        return {
            token: "\\]"
        }
    }
    EOL() {
        return {
            token: "$"
        }
    }
}
class Yt {
    constructor(t) {
        this.factory = t,
        this.commitHooks = [],
        this.reset()
    }
    reset(t={}) {
        this.options = {
            stem: "auto",
            clef: "treble"
        },
        this.elements = {
            notes: [],
            accidentals: []
        },
        this.rollingDuration = "8",
        this.resetPiece(),
        Object.assign(this.options, t)
    }
    getFactory() {
        return this.factory
    }
    getElements() {
        return this.elements
    }
    addCommitHook(t) {
        this.commitHooks.push(t)
    }
    resetPiece() {
        h1("resetPiece"),
        this.piece = {
            chord: [],
            duration: this.rollingDuration,
            dots: 0,
            type: void 0,
            options: {}
        }
    }
    setNoteDots(t) {
        h1("setNoteDots:", t),
        t && (this.piece.dots = t.length)
    }
    setNoteDuration(t) {
        h1("setNoteDuration:", t),
        this.rollingDuration = this.piece.duration = t || this.rollingDuration
    }
    setNoteType(t) {
        h1("setNoteType:", t),
        t && (this.piece.type = t)
    }
    addNoteOption(t, e) {
        h1("addNoteOption: key:", t, "value:", e),
        this.piece.options[t] = e
    }
    addNote(t, e, i) {
        h1("addNote:", t, e, i),
        this.piece.chord.push({
            key: t,
            accid: e,
            octave: i
        })
    }
    addSingleNote(t, e, i) {
        h1("addSingleNote:", t, e, i),
        this.addNote(t, e, i)
    }
    addChord(t) {
        h1("startChord"),
        typeof t[0] != "object" ? this.addSingleNote(t[0]) : t.forEach(e=>{
            e && this.addNote(...e)
        }
        ),
        h1("endChord")
    }
    commitPiece() {
        h1("commitPiece");
        const {factory: t} = this;
        if (!t)
            return;
        const e = R(R({}, this.options), this.piece.options)
          , {stem: i, clef: s} = e
          , n = i.toLowerCase() === "auto"
          , o = !n && i.toLowerCase() === "up" ? H.STEM_UP : H.STEM_DOWN
          , {chord: l, duration: c, dots: d, type: u} = this.piece
          , b = l.map(m=>m.key + "/" + m.octave)
          , r = t.StaveNote({
            keys: b,
            duration: c,
            dots: d,
            type: u,
            clef: s,
            auto_stem: n
        });
        n || r.setStemDirection(o);
        const h = l.map(m=>m.accid || null);
        h.forEach((m,_)=>{
            m && r.addAccidental(_, t.Accidental({
                type: m
            }))
        }
        );
        for (let m = 0; m < d; m++)
            r.addDotToAll();
        this.commitHooks.forEach(m=>m(e, r, this)),
        this.elements.notes.push(r),
        this.elements.accidentals.concat(h),
        this.resetPiece()
    }
}
function Gt({id: a}, t) {
    a !== void 0 && t.setAttribute("id", a)
}
function Xt(a, t) {
    if (!a.class)
        return;
    const e = /\s*,\s*/;
    a.class.split(e).forEach(i=>t.addClass(i))
}
class E2 {
    constructor(t={}) {
        this.setOptions(t),
        this.defaults = {
            clef: "treble",
            time: "4/4",
            stem: "auto"
        }
    }
    set(t) {
        return Object.assign(this.defaults, t),
        this
    }
    setOptions(t) {
        return this.options = R({
            factory: null,
            builder: null,
            commitHooks: [Gt, Xt, d1.easyScoreHook],
            throwOnError: !1
        }, t),
        this.factory = this.options.factory,
        this.builder = this.options.builder || new Yt(this.factory),
        this.grammar = new It(this.builder),
        this.parser = new P2(this.grammar),
        this.options.commitHooks.forEach(e=>this.addCommitHook(e)),
        this
    }
    setContext(t) {
        return this.factory && this.factory.setContext(t),
        this
    }
    parse(t, e={}) {
        this.builder.reset(e);
        const i = this.parser.parse(t);
        if (!i.success && this.options.throwOnError)
            throw new zt("Error parsing line: " + t,i);
        return i
    }
    beam(t, e={}) {
        return this.factory.Beam({
            notes: t,
            options: e
        }),
        t
    }
    tuplet(t, e={}) {
        return this.factory.Tuplet({
            notes: t,
            options: e
        }),
        t
    }
    notes(t, e={}) {
        return e = R({
            clef: this.defaults.clef,
            stem: this.defaults.stem
        }, e),
        this.parse(t, e),
        this.builder.getElements().notes
    }
    voice(t, e) {
        return e = R({
            time: this.defaults.time
        }, e),
        this.factory.Voice(e).addTickables(t)
    }
    addCommitHook(t) {
        return this.builder.addCommitHook(t)
    }
}
function Ht(...a) {
    V1.DEBUG && f.L("Vex.Flow.Factory", a)
}
const Wt = f.MakeException("FactoryError");
function U(a={}, t) {
    const e = t.options;
    return a = Object.assign(t, a),
    a.options = Object.assign(e, a.options),
    a
}
class V1 {
    constructor(t) {
        Ht("New factory: ", t);
        const e = {
            stave: {
                space: 10
            },
            renderer: {
                context: null,
                elementId: "",
                backend: O.Backends.SVG,
                width: 500,
                height: 200,
                background: "#FFF"
            },
            font: {
                face: "Arial",
                point: 10,
                style: ""
            }
        };
        this.options = e,
        this.setOptions(t)
    }
    static newFromElementId(t, e=500, i=200) {
        return new V1({
            renderer: {
                elementId: t,
                width: e,
                height: i
            }
        })
    }
    reset() {
        this.renderQ = [],
        this.systems = [],
        this.staves = [],
        this.voices = [],
        this.stave = null
    }
    getOptions() {
        return this.options
    }
    setOptions(t) {
        for (const e of ["stave", "renderer", "font"])
            Object.assign(this.options[e], t[e]);
        (this.options.renderer.elementId !== null || this.options.renderer.context) && this.initRenderer(),
        this.reset()
    }
    initRenderer() {
        const {elementId: t, backend: e, width: i, height: s, background: n} = this.options.renderer;
        if (t === "")
            throw new Wt("HTML DOM element not set in Factory");
        this.context = O.buildContext(t, e, i, s, n)
    }
    getContext() {
        return this.context
    }
    setContext(t) {
        return this.context = t,
        this
    }
    getStave() {
        return this.stave
    }
    getVoices() {
        return this.voices
    }
    space(t) {
        return this.options.stave.space * t
    }
    Stave(t) {
        t = U(t, {
            x: 0,
            y: 0,
            width: this.options.renderer.width - this.space(1),
            options: {
                spacing_between_lines_px: this.options.stave.space
            }
        });
        const e = new p2(t.x,t.y,t.width,t.options);
        return this.staves.push(e),
        e.setContext(this.context),
        this.stave = e,
        e
    }
    TabStave(t) {
        t = U(t, {
            x: 0,
            y: 0,
            width: this.options.renderer.width - this.space(1),
            options: {
                spacing_between_lines_px: this.options.stave.space * 1.3
            }
        });
        const e = new e3(t.x,t.y,t.width,t.options);
        return this.staves.push(e),
        e.setContext(this.context),
        this.stave = e,
        e
    }
    StaveNote(t) {
        const e = new H(t);
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    GlyphNote(t, e, i) {
        const s = new v2(t,e,i);
        return this.stave && s.setStave(this.stave),
        s.setContext(this.context),
        this.renderQ.push(s),
        s
    }
    RepeatNote(t, e, i) {
        const s = new l3(t,e,i);
        return this.stave && s.setStave(this.stave),
        s.setContext(this.context),
        this.renderQ.push(s),
        s
    }
    GhostNote(t) {
        const e = new r3(t);
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    TextNote(t) {
        const e = new b1(t);
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    BarNote(t) {
        t = U(t, {
            type: "single",
            options: {}
        });
        const e = new T2(t.type);
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    ClefNote(t) {
        t = U(t, {
            type: "treble",
            options: {
                size: "default"
            }
        });
        const e = new b2(t.type,t.options.size,t.options.annotation);
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    TimeSigNote(t) {
        t = U(t, {
            time: "4/4",
            options: {}
        });
        const e = new n3(t.time);
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    KeySigNote(t) {
        const e = new s3(t.key,t.cancelKey,t.alterKey);
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    TabNote(t) {
        const e = new W1(t);
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    GraceNote(t) {
        const e = new S1(t);
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        e
    }
    GraceNoteGroup(t) {
        const e = new N1(t.notes,t.slur);
        return e.setContext(this.context),
        e
    }
    Accidental(t) {
        t = U(t, {
            type: null,
            options: {}
        });
        const e = new w1(t.type);
        return e.setContext(this.context),
        e
    }
    Annotation(t) {
        t = U(t, {
            text: "p",
            vJustify: "below",
            hJustify: "center",
            fontFamily: "Times",
            fontSize: 14,
            fontWeight: "bold italic",
            options: {}
        });
        const e = new Y(t.text);
        return e.setJustification(t.hJustify),
        e.setVerticalJustification(t.vJustify),
        e.setFont(t.fontFamily, t.fontSize, t.fontWeight),
        e.setContext(this.context),
        e
    }
    Articulation(t) {
        t = U(t, {
            type: "a.",
            position: "above",
            options: {}
        });
        const e = new d1(t.type);
        return e.setPosition(t.position),
        e.setContext(this.context),
        e
    }
    TextDynamics(t) {
        t = U(t, {
            text: "p",
            duration: "q",
            dots: 0,
            line: 0,
            options: {}
        });
        const e = new L1({
            text: t.text,
            line: t.line,
            duration: t.duration,
            dots: t.dots
        });
        return this.stave && e.setStave(this.stave),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    Fingering(t) {
        t = U(t, {
            number: "0",
            position: "left",
            options: {}
        });
        const e = new O1(t.number);
        return e.setPosition(t.position),
        e.setContext(this.context),
        e
    }
    StringNumber(t) {
        t = U(t, {
            number: "0",
            position: "left",
            options: {}
        });
        const e = new Y1(t.number);
        return e.setPosition(t.position),
        e.setContext(this.context),
        e
    }
    TickContext() {
        return new B1().setContext(this.context)
    }
    ModifierContext() {
        return new H1
    }
    MultiMeasureRest(t) {
        const e = new i3(t.number_of_measures,t);
        return e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    Voice(t) {
        t = U(t, {
            time: "4/4",
            options: {}
        });
        const e = new $(t.time,t.options);
        return this.voices.push(e),
        e
    }
    StaveConnector(t) {
        t = U(t, {
            top_stave: null,
            bottom_stave: null,
            type: "double",
            options: {}
        });
        const e = new N(t.top_stave,t.bottom_stave);
        return e.setType(t.type).setContext(this.context),
        this.renderQ.push(e),
        e
    }
    Formatter() {
        return new i1
    }
    Tuplet(t) {
        t = U(t, {
            notes: [],
            options: {}
        });
        const e = new e1(t.notes,t.options).setContext(this.context);
        return this.renderQ.push(e),
        e
    }
    Beam(t) {
        t = U(t, {
            notes: [],
            options: {
                autoStem: !1,
                secondaryBeamBreaks: []
            }
        });
        const e = new f1(t.notes,t.options.autoStem).setContext(this.context);
        return e.breakSecondaryAt(t.options.secondaryBeamBreaks),
        this.renderQ.push(e),
        e
    }
    Curve(t) {
        t = U(t, {
            from: null,
            to: null,
            options: {}
        });
        const e = new o1(t.from,t.to,t.options).setContext(this.context);
        return this.renderQ.push(e),
        e
    }
    StaveTie(t) {
        t = U(t, {
            from: null,
            to: null,
            first_indices: [0],
            last_indices: [0],
            text: null,
            options: {
                direction: void 0
            }
        });
        const e = new i2({
            first_note: t.from,
            last_note: t.to,
            first_indices: t.first_indices,
            last_indices: t.last_indices
        },t.text);
        return t.options.direction && e.setDirection(t.options.direction),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    StaveLine(t) {
        t = U(t, {
            from: null,
            to: null,
            first_indices: [0],
            last_indices: [0],
            options: {}
        });
        const e = new l1({
            first_note: t.from,
            last_note: t.to,
            first_indices: t.first_indices,
            last_indices: t.last_indices
        });
        return t.options.text && e.setText(t.options.text),
        t.options.font && e.setFont(t.options.font),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    VibratoBracket(t) {
        t = U(t, {
            from: null,
            to: null,
            options: {
                harsh: !1
            }
        });
        const e = new x2({
            start: t.from,
            stop: t.to
        });
        return t.options.line && e.setLine(t.options.line),
        t.options.harsh && e.setHarsh(t.options.harsh),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    TextBracket(t) {
        t = U(t, {
            from: null,
            to: null,
            text: "",
            options: {
                superscript: "",
                position: 1
            }
        });
        const e = new s1({
            start: t.from,
            stop: t.to,
            text: t.text,
            superscript: t.options.superscript,
            position: t.options.position
        });
        return t.options.line && e.setLine(t.options.line),
        t.options.font && e.setFont(t.options.font),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    System(t={}) {
        t.factory = this;
        const e = new c3(t).setContext(this.context);
        return this.systems.push(e),
        e
    }
    EasyScore(t={}) {
        return t.factory = this,
        new E2(t)
    }
    PedalMarking(t={}) {
        t = U(t, {
            notes: [],
            options: {
                style: "mixed"
            }
        });
        const e = new j(t.notes);
        return e.setStyle(j.StylesString[t.options.style]),
        e.setContext(this.context),
        this.renderQ.push(e),
        e
    }
    NoteSubGroup(t={}) {
        t = U(t, {
            notes: [],
            options: {}
        });
        const e = new I1(t.notes);
        return e.setContext(this.context),
        e
    }
    draw() {
        this.systems.forEach(t=>t.setContext(this.context).format()),
        this.staves.forEach(t=>t.setContext(this.context).draw()),
        this.voices.forEach(t=>t.setContext(this.context).draw()),
        this.renderQ.forEach(t=>{
            t.isRendered() || t.setContext(this.context).draw()
        }
        ),
        this.systems.forEach(t=>t.setContext(this.context).draw()),
        this.reset()
    }
}
class c3 extends X {
    constructor(t={}) {
        super();
        this.setAttribute("type", "System"),
        this.setOptions(t),
        this.parts = []
    }
    setOptions(t={}) {
        this.options = c1(R({
            x: 10,
            y: 10,
            width: 500,
            connector: null,
            spaceBetweenStaves: 12,
            factory: null,
            noJustification: !1,
            debugFormatter: !1,
            formatIterations: 0,
            noPadding: !1
        }, t), {
            details: R({
                alpha: .5
            }, t.details)
        }),
        this.factory = this.options.factory || new V1({
            renderer: {
                el: null
            }
        })
    }
    setContext(t) {
        return super.setContext(t),
        this.factory.setContext(t),
        this
    }
    addConnector(t="double") {
        return this.connector = this.factory.StaveConnector({
            top_stave: this.parts[0].stave,
            bottom_stave: this.parts[this.parts.length - 1].stave,
            type: t
        }),
        this.connector
    }
    addStave(t) {
        return t = c1(R({
            stave: null,
            voices: [],
            spaceAbove: 0,
            spaceBelow: 0,
            debugNoteMetrics: !1
        }, t), {
            options: R({
                left_bar: !1
            }, t.options)
        }),
        t.stave || (t.stave = this.factory.Stave({
            x: this.options.x,
            y: this.options.y,
            width: this.options.width,
            options: t.options
        })),
        t.voices.forEach(e=>e.setContext(this.context).setStave(t.stave).getTickables().forEach(i=>i.setStave(t.stave))),
        this.parts.push(t),
        t.stave
    }
    format() {
        const t = new i1(R({}, this.options.details));
        this.formatter = t;
        let e = this.options.y
          , i = 0
          , s = [];
        const n = [];
        this.parts.forEach(l=>{
            e = e + l.stave.space(l.spaceAbove),
            l.stave.setY(e),
            t.joinVoices(l.voices),
            e = e + l.stave.space(l.spaceBelow),
            e = e + l.stave.space(this.options.spaceBetweenStaves),
            l.debugNoteMetrics && (n.push({
                y: e,
                voice: l.voices[0]
            }),
            e += 15),
            s = s.concat(l.voices),
            i = Math.max(i, l.stave.getNoteStartX())
        }
        ),
        this.parts.forEach(l=>l.stave.setNoteStartX(i));
        const o = this.options.noPadding ? this.options.width - this.options.x : this.options.width - (i - this.options.x) - this.musicFont.lookupMetric("stave.padding");
        t.format(s, this.options.noJustification ? 0 : o);
        for (let l = 0; l < this.options.formatIterations; l++)
            t.tune({
                alpha: this.options.details.alpha
            });
        this.startX = i,
        this.debugNoteMetricsYs = n,
        this.lastY = e
    }
    draw() {
        const t = this.checkContext();
        this.setRendered(),
        this.options.debugFormatter && i1.plotDebugging(t, this.formatter, this.startX, this.options.y, this.lastY),
        this.debugNoteMetricsYs.forEach(e=>{
            e.voice.getTickables().forEach(i=>J.plotMetrics(t, i, e.y))
        }
        )
    }
}
f.Flow = y;
f.Flow.Element = X;
f.Flow.Fraction = k;
f.Flow.Renderer = O;
f.Flow.Formatter = i1;
f.Flow.Music = z;
f.Flow.Glyph = E;
f.Flow.Stave = p2;
f.Flow.StaveNote = H;
f.Flow.StaveModifier = B;
f.Flow.StaveTempo = s2;
f.Flow.Voice = $;
f.Flow.Accidental = w1;
f.Flow.Beam = f1;
f.Flow.StaveTie = i2;
f.Flow.TabStave = e3;
f.Flow.TabNote = W1;
f.Flow.Bend = Z;
f.Flow.Vibrato = F1;
f.Flow.VibratoBracket = x2;
f.Flow.Note = J;
f.Flow.ModifierContext = H1;
f.Flow.MultiMeasureRest = i3;
f.Flow.TickContext = B1;
f.Flow.Articulation = d1;
f.Flow.Annotation = Y;
f.Flow.Barline = L;
f.Flow.NoteHead = k1;
f.Flow.StaveConnector = N;
f.Flow.ClefNote = b2;
f.Flow.KeySignature = T1;
f.Flow.KeySigNote = s3;
f.Flow.TimeSignature = g1;
f.Flow.TimeSigNote = n3;
f.Flow.Stem = P;
f.Flow.TabTie = R1;
f.Flow.Clef = x1;
f.Flow.Dot = C1;
f.Flow.Modifier = M;
f.Flow.TabSlide = a1;
f.Flow.Tuplet = e1;
f.Flow.GraceNote = S1;
f.Flow.GraceTabNote = y2;
f.Flow.Tuning = o2;
f.Flow.KeyManager = Ct;
f.Flow.StaveHairpin = U1;
f.Flow.BoundingBox = y1;
f.Flow.Stroke = K;
f.Flow.TextNote = b1;
f.Flow.Curve = o1;
f.Flow.TextDynamics = L1;
f.Flow.StaveLine = l1;
f.Flow.Ornament = X1;
f.Flow.PedalMarking = j;
f.Flow.TextBracket = s1;
f.Flow.FretHandFinger = O1;
f.Flow.Repetition = q;
f.Flow.BarNote = T2;
f.Flow.GhostNote = r3;
f.Flow.NoteSubGroup = I1;
f.Flow.GraceNoteGroup = N1;
f.Flow.Tremolo = S2;
f.Flow.StringNumber = Y1;
f.Flow.Crescendo = a3;
f.Flow.Volta = m1;
f.Flow.System = c3;
f.Flow.Factory = V1;
f.Flow.Parser = P2;
f.Flow.EasyScore = E2;
f.Flow.Registry = r1;
f.Flow.StaveText = n2;
f.Flow.GlyphNote = v2;
f.Flow.RepeatNote = l3;
f.Flow.Font = D1;
f.Flow.Fonts = t2;
f.Flow.DefaultFontStack = W2;
var $1 = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {}
  , Ut = {};
/*!
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
(function(a) {
    (function() {
        var t = function() {
            this.init()
        };
        t.prototype = {
            init: function() {
                var b = this || e;
                return b._counter = 1e3,
                b._html5AudioPool = [],
                b.html5PoolSize = 10,
                b._codecs = {},
                b._howls = [],
                b._muted = !1,
                b._volume = 1,
                b._canPlayEvent = "canplaythrough",
                b._navigator = typeof window != "undefined" && window.navigator ? window.navigator : null,
                b.masterGain = null,
                b.noAudio = !1,
                b.usingWebAudio = !0,
                b.autoSuspend = !0,
                b.ctx = null,
                b.autoUnlock = !0,
                b._setup(),
                b
            },
            volume: function(b) {
                var r = this || e;
                if (b = parseFloat(b),
                r.ctx || u(),
                typeof b != "undefined" && b >= 0 && b <= 1) {
                    if (r._volume = b,
                    r._muted)
                        return r;
                    r.usingWebAudio && r.masterGain.gain.setValueAtTime(b, e.ctx.currentTime);
                    for (var h = 0; h < r._howls.length; h++)
                        if (!r._howls[h]._webAudio)
                            for (var m = r._howls[h]._getSoundIds(), _ = 0; _ < m.length; _++) {
                                var x = r._howls[h]._soundById(m[_]);
                                x && x._node && (x._node.volume = x._volume * b)
                            }
                    return r
                }
                return r._volume
            },
            mute: function(b) {
                var r = this || e;
                r.ctx || u(),
                r._muted = b,
                r.usingWebAudio && r.masterGain.gain.setValueAtTime(b ? 0 : r._volume, e.ctx.currentTime);
                for (var h = 0; h < r._howls.length; h++)
                    if (!r._howls[h]._webAudio)
                        for (var m = r._howls[h]._getSoundIds(), _ = 0; _ < m.length; _++) {
                            var x = r._howls[h]._soundById(m[_]);
                            x && x._node && (x._node.muted = b ? !0 : x._muted)
                        }
                return r
            },
            stop: function() {
                for (var b = this || e, r = 0; r < b._howls.length; r++)
                    b._howls[r].stop();
                return b
            },
            unload: function() {
                for (var b = this || e, r = b._howls.length - 1; r >= 0; r--)
                    b._howls[r].unload();
                return b.usingWebAudio && b.ctx && typeof b.ctx.close != "undefined" && (b.ctx.close(),
                b.ctx = null,
                u()),
                b
            },
            codecs: function(b) {
                return (this || e)._codecs[b.replace(/^x-/, "")]
            },
            _setup: function() {
                var b = this || e;
                if (b.state = b.ctx && b.ctx.state || "suspended",
                b._autoSuspend(),
                !b.usingWebAudio)
                    if (typeof Audio != "undefined")
                        try {
                            var r = new Audio;
                            typeof r.oncanplaythrough == "undefined" && (b._canPlayEvent = "canplay")
                        } catch {
                            b.noAudio = !0
                        }
                    else
                        b.noAudio = !0;
                try {
                    var r = new Audio;
                    r.muted && (b.noAudio = !0)
                } catch {}
                return b.noAudio || b._setupCodecs(),
                b
            },
            _setupCodecs: function() {
                var b = this || e
                  , r = null;
                try {
                    r = typeof Audio != "undefined" ? new Audio : null
                } catch {
                    return b
                }
                if (!r || typeof r.canPlayType != "function")
                    return b;
                var h = r.canPlayType("audio/mpeg;").replace(/^no$/, "")
                  , m = b._navigator ? b._navigator.userAgent : ""
                  , _ = m.match(/OPR\/([0-6].)/g)
                  , x = _ && parseInt(_[0].split("/")[1], 10) < 33
                  , p = m.indexOf("Safari") !== -1 && m.indexOf("Chrome") === -1
                  , g = m.match(/Version\/(.*?) /)
                  , T = p && g && parseInt(g[1], 10) < 15;
                return b._codecs = {
                    mp3: !!(!x && (h || r.canPlayType("audio/mp3;").replace(/^no$/, ""))),
                    mpeg: !!h,
                    opus: !!r.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                    ogg: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    oga: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    wav: !!(r.canPlayType('audio/wav; codecs="1"') || r.canPlayType("audio/wav")).replace(/^no$/, ""),
                    aac: !!r.canPlayType("audio/aac;").replace(/^no$/, ""),
                    caf: !!r.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                    m4a: !!(r.canPlayType("audio/x-m4a;") || r.canPlayType("audio/m4a;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    m4b: !!(r.canPlayType("audio/x-m4b;") || r.canPlayType("audio/m4b;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    mp4: !!(r.canPlayType("audio/x-mp4;") || r.canPlayType("audio/mp4;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    weba: !!(!T && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    webm: !!(!T && r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
                    dolby: !!r.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                    flac: !!(r.canPlayType("audio/x-flac;") || r.canPlayType("audio/flac;")).replace(/^no$/, "")
                },
                b
            },
            _unlockAudio: function() {
                var b = this || e;
                if (!(b._audioUnlocked || !b.ctx)) {
                    b._audioUnlocked = !1,
                    b.autoUnlock = !1,
                    !b._mobileUnloaded && b.ctx.sampleRate !== 44100 && (b._mobileUnloaded = !0,
                    b.unload()),
                    b._scratchBuffer = b.ctx.createBuffer(1, 1, 22050);
                    var r = function(h) {
                        for (; b._html5AudioPool.length < b.html5PoolSize; )
                            try {
                                var m = new Audio;
                                m._unlocked = !0,
                                b._releaseHtml5Audio(m)
                            } catch {
                                b.noAudio = !0;
                                break
                            }
                        for (var _ = 0; _ < b._howls.length; _++)
                            if (!b._howls[_]._webAudio)
                                for (var x = b._howls[_]._getSoundIds(), p = 0; p < x.length; p++) {
                                    var g = b._howls[_]._soundById(x[p]);
                                    g && g._node && !g._node._unlocked && (g._node._unlocked = !0,
                                    g._node.load())
                                }
                        b._autoResume();
                        var T = b.ctx.createBufferSource();
                        T.buffer = b._scratchBuffer,
                        T.connect(b.ctx.destination),
                        typeof T.start == "undefined" ? T.noteOn(0) : T.start(0),
                        typeof b.ctx.resume == "function" && b.ctx.resume(),
                        T.onended = function() {
                            T.disconnect(0),
                            b._audioUnlocked = !0,
                            document.removeEventListener("touchstart", r, !0),
                            document.removeEventListener("touchend", r, !0),
                            document.removeEventListener("click", r, !0),
                            document.removeEventListener("keydown", r, !0);
                            for (var w = 0; w < b._howls.length; w++)
                                b._howls[w]._emit("unlock")
                        }
                    };
                    return document.addEventListener("touchstart", r, !0),
                    document.addEventListener("touchend", r, !0),
                    document.addEventListener("click", r, !0),
                    document.addEventListener("keydown", r, !0),
                    b
                }
            },
            _obtainHtml5Audio: function() {
                var b = this || e;
                if (b._html5AudioPool.length)
                    return b._html5AudioPool.pop();
                var r = new Audio().play();
                return r && typeof Promise != "undefined" && (r instanceof Promise || typeof r.then == "function") && r.catch(function() {
                    console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
                }),
                new Audio
            },
            _releaseHtml5Audio: function(b) {
                var r = this || e;
                return b._unlocked && r._html5AudioPool.push(b),
                r
            },
            _autoSuspend: function() {
                var b = this;
                if (!(!b.autoSuspend || !b.ctx || typeof b.ctx.suspend == "undefined" || !e.usingWebAudio)) {
                    for (var r = 0; r < b._howls.length; r++)
                        if (b._howls[r]._webAudio) {
                            for (var h = 0; h < b._howls[r]._sounds.length; h++)
                                if (!b._howls[r]._sounds[h]._paused)
                                    return b
                        }
                    return b._suspendTimer && clearTimeout(b._suspendTimer),
                    b._suspendTimer = setTimeout(function() {
                        if (!!b.autoSuspend) {
                            b._suspendTimer = null,
                            b.state = "suspending";
                            var m = function() {
                                b.state = "suspended",
                                b._resumeAfterSuspend && (delete b._resumeAfterSuspend,
                                b._autoResume())
                            };
                            b.ctx.suspend().then(m, m)
                        }
                    }, 3e4),
                    b
                }
            },
            _autoResume: function() {
                var b = this;
                if (!(!b.ctx || typeof b.ctx.resume == "undefined" || !e.usingWebAudio))
                    return b.state === "running" && b.ctx.state !== "interrupted" && b._suspendTimer ? (clearTimeout(b._suspendTimer),
                    b._suspendTimer = null) : b.state === "suspended" || b.state === "running" && b.ctx.state === "interrupted" ? (b.ctx.resume().then(function() {
                        b.state = "running";
                        for (var r = 0; r < b._howls.length; r++)
                            b._howls[r]._emit("resume")
                    }),
                    b._suspendTimer && (clearTimeout(b._suspendTimer),
                    b._suspendTimer = null)) : b.state === "suspending" && (b._resumeAfterSuspend = !0),
                    b
            }
        };
        var e = new t
          , i = function(b) {
            var r = this;
            if (!b.src || b.src.length === 0) {
                console.error("An array of source files must be passed with any new Howl.");
                return
            }
            r.init(b)
        };
        i.prototype = {
            init: function(b) {
                var r = this;
                return e.ctx || u(),
                r._autoplay = b.autoplay || !1,
                r._format = typeof b.format != "string" ? b.format : [b.format],
                r._html5 = b.html5 || !1,
                r._muted = b.mute || !1,
                r._loop = b.loop || !1,
                r._pool = b.pool || 5,
                r._preload = typeof b.preload == "boolean" || b.preload === "metadata" ? b.preload : !0,
                r._rate = b.rate || 1,
                r._sprite = b.sprite || {},
                r._src = typeof b.src != "string" ? b.src : [b.src],
                r._volume = b.volume !== void 0 ? b.volume : 1,
                r._xhr = {
                    method: b.xhr && b.xhr.method ? b.xhr.method : "GET",
                    headers: b.xhr && b.xhr.headers ? b.xhr.headers : null,
                    withCredentials: b.xhr && b.xhr.withCredentials ? b.xhr.withCredentials : !1
                },
                r._duration = 0,
                r._state = "unloaded",
                r._sounds = [],
                r._endTimers = {},
                r._queue = [],
                r._playLock = !1,
                r._onend = b.onend ? [{
                    fn: b.onend
                }] : [],
                r._onfade = b.onfade ? [{
                    fn: b.onfade
                }] : [],
                r._onload = b.onload ? [{
                    fn: b.onload
                }] : [],
                r._onloaderror = b.onloaderror ? [{
                    fn: b.onloaderror
                }] : [],
                r._onplayerror = b.onplayerror ? [{
                    fn: b.onplayerror
                }] : [],
                r._onpause = b.onpause ? [{
                    fn: b.onpause
                }] : [],
                r._onplay = b.onplay ? [{
                    fn: b.onplay
                }] : [],
                r._onstop = b.onstop ? [{
                    fn: b.onstop
                }] : [],
                r._onmute = b.onmute ? [{
                    fn: b.onmute
                }] : [],
                r._onvolume = b.onvolume ? [{
                    fn: b.onvolume
                }] : [],
                r._onrate = b.onrate ? [{
                    fn: b.onrate
                }] : [],
                r._onseek = b.onseek ? [{
                    fn: b.onseek
                }] : [],
                r._onunlock = b.onunlock ? [{
                    fn: b.onunlock
                }] : [],
                r._onresume = [],
                r._webAudio = e.usingWebAudio && !r._html5,
                typeof e.ctx != "undefined" && e.ctx && e.autoUnlock && e._unlockAudio(),
                e._howls.push(r),
                r._autoplay && r._queue.push({
                    event: "play",
                    action: function() {
                        r.play()
                    }
                }),
                r._preload && r._preload !== "none" && r.load(),
                r
            },
            load: function() {
                var b = this
                  , r = null;
                if (e.noAudio) {
                    b._emit("loaderror", null, "No audio support.");
                    return
                }
                typeof b._src == "string" && (b._src = [b._src]);
                for (var h = 0; h < b._src.length; h++) {
                    var m, _;
                    if (b._format && b._format[h])
                        m = b._format[h];
                    else {
                        if (_ = b._src[h],
                        typeof _ != "string") {
                            b._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }
                        m = /^data:audio\/([^;,]+);/i.exec(_),
                        m || (m = /\.([^.]+)$/.exec(_.split("?", 1)[0])),
                        m && (m = m[1].toLowerCase())
                    }
                    if (m || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),
                    m && e.codecs(m)) {
                        r = b._src[h];
                        break
                    }
                }
                if (!r) {
                    b._emit("loaderror", null, "No codec support for selected audio sources.");
                    return
                }
                return b._src = r,
                b._state = "loading",
                window.location.protocol === "https:" && r.slice(0, 5) === "http:" && (b._html5 = !0,
                b._webAudio = !1),
                new s(b),
                b._webAudio && o(b),
                b
            },
            play: function(b, r) {
                var h = this
                  , m = null;
                if (typeof b == "number")
                    m = b,
                    b = null;
                else {
                    if (typeof b == "string" && h._state === "loaded" && !h._sprite[b])
                        return null;
                    if (typeof b == "undefined" && (b = "__default",
                    !h._playLock)) {
                        for (var _ = 0, x = 0; x < h._sounds.length; x++)
                            h._sounds[x]._paused && !h._sounds[x]._ended && (_++,
                            m = h._sounds[x]._id);
                        _ === 1 ? b = null : m = null
                    }
                }
                var p = m ? h._soundById(m) : h._inactiveSound();
                if (!p)
                    return null;
                if (m && !b && (b = p._sprite || "__default"),
                h._state !== "loaded") {
                    p._sprite = b,
                    p._ended = !1;
                    var g = p._id;
                    return h._queue.push({
                        event: "play",
                        action: function() {
                            h.play(g)
                        }
                    }),
                    g
                }
                if (m && !p._paused)
                    return r || h._loadQueue("play"),
                    p._id;
                h._webAudio && e._autoResume();
                var T = Math.max(0, p._seek > 0 ? p._seek : h._sprite[b][0] / 1e3)
                  , w = Math.max(0, (h._sprite[b][0] + h._sprite[b][1]) / 1e3 - T)
                  , S = w * 1e3 / Math.abs(p._rate)
                  , v = h._sprite[b][0] / 1e3
                  , A = (h._sprite[b][0] + h._sprite[b][1]) / 1e3;
                p._sprite = b,
                p._ended = !1;
                var F = function() {
                    p._paused = !1,
                    p._seek = T,
                    p._start = v,
                    p._stop = A,
                    p._loop = !!(p._loop || h._sprite[b][2])
                };
                if (T >= A) {
                    h._ended(p);
                    return
                }
                var C = p._node;
                if (h._webAudio) {
                    var V = function() {
                        h._playLock = !1,
                        F(),
                        h._refreshBuffer(p);
                        var G = p._muted || h._muted ? 0 : p._volume;
                        C.gain.setValueAtTime(G, e.ctx.currentTime),
                        p._playStart = e.ctx.currentTime,
                        typeof C.bufferSource.start == "undefined" ? p._loop ? C.bufferSource.noteGrainOn(0, T, 86400) : C.bufferSource.noteGrainOn(0, T, w) : p._loop ? C.bufferSource.start(0, T, 86400) : C.bufferSource.start(0, T, w),
                        S !== 1 / 0 && (h._endTimers[p._id] = setTimeout(h._ended.bind(h, p), S)),
                        r || setTimeout(function() {
                            h._emit("play", p._id),
                            h._loadQueue()
                        }, 0)
                    };
                    e.state === "running" && e.ctx.state !== "interrupted" ? V() : (h._playLock = !0,
                    h.once("resume", V),
                    h._clearTimer(p._id))
                } else {
                    var D = function() {
                        C.currentTime = T,
                        C.muted = p._muted || h._muted || e._muted || C.muted,
                        C.volume = p._volume * e.volume(),
                        C.playbackRate = p._rate;
                        try {
                            var G = C.play();
                            if (G && typeof Promise != "undefined" && (G instanceof Promise || typeof G.then == "function") ? (h._playLock = !0,
                            F(),
                            G.then(function() {
                                h._playLock = !1,
                                C._unlocked = !0,
                                r ? h._loadQueue() : h._emit("play", p._id)
                            }).catch(function() {
                                h._playLock = !1,
                                h._emit("playerror", p._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),
                                p._ended = !0,
                                p._paused = !0
                            })) : r || (h._playLock = !1,
                            F(),
                            h._emit("play", p._id)),
                            C.playbackRate = p._rate,
                            C.paused) {
                                h._emit("playerror", p._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                return
                            }
                            b !== "__default" || p._loop ? h._endTimers[p._id] = setTimeout(h._ended.bind(h, p), S) : (h._endTimers[p._id] = function() {
                                h._ended(p),
                                C.removeEventListener("ended", h._endTimers[p._id], !1)
                            }
                            ,
                            C.addEventListener("ended", h._endTimers[p._id], !1))
                        } catch (t1) {
                            h._emit("playerror", p._id, t1)
                        }
                    };
                    C.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" && (C.src = h._src,
                    C.load());
                    var W = window && window.ejecta || !C.readyState && e._navigator.isCocoonJS;
                    if (C.readyState >= 3 || W)
                        D();
                    else {
                        h._playLock = !0,
                        h._state = "loading";
                        var I = function() {
                            h._state = "loaded",
                            D(),
                            C.removeEventListener(e._canPlayEvent, I, !1)
                        };
                        C.addEventListener(e._canPlayEvent, I, !1),
                        h._clearTimer(p._id)
                    }
                }
                return p._id
            },
            pause: function(b) {
                var r = this;
                if (r._state !== "loaded" || r._playLock)
                    return r._queue.push({
                        event: "pause",
                        action: function() {
                            r.pause(b)
                        }
                    }),
                    r;
                for (var h = r._getSoundIds(b), m = 0; m < h.length; m++) {
                    r._clearTimer(h[m]);
                    var _ = r._soundById(h[m]);
                    if (_ && !_._paused && (_._seek = r.seek(h[m]),
                    _._rateSeek = 0,
                    _._paused = !0,
                    r._stopFade(h[m]),
                    _._node))
                        if (r._webAudio) {
                            if (!_._node.bufferSource)
                                continue;
                            typeof _._node.bufferSource.stop == "undefined" ? _._node.bufferSource.noteOff(0) : _._node.bufferSource.stop(0),
                            r._cleanBuffer(_._node)
                        } else
                            (!isNaN(_._node.duration) || _._node.duration === 1 / 0) && _._node.pause();
                    arguments[1] || r._emit("pause", _ ? _._id : null)
                }
                return r
            },
            stop: function(b, r) {
                var h = this;
                if (h._state !== "loaded" || h._playLock)
                    return h._queue.push({
                        event: "stop",
                        action: function() {
                            h.stop(b)
                        }
                    }),
                    h;
                for (var m = h._getSoundIds(b), _ = 0; _ < m.length; _++) {
                    h._clearTimer(m[_]);
                    var x = h._soundById(m[_]);
                    x && (x._seek = x._start || 0,
                    x._rateSeek = 0,
                    x._paused = !0,
                    x._ended = !0,
                    h._stopFade(m[_]),
                    x._node && (h._webAudio ? x._node.bufferSource && (typeof x._node.bufferSource.stop == "undefined" ? x._node.bufferSource.noteOff(0) : x._node.bufferSource.stop(0),
                    h._cleanBuffer(x._node)) : (!isNaN(x._node.duration) || x._node.duration === 1 / 0) && (x._node.currentTime = x._start || 0,
                    x._node.pause(),
                    x._node.duration === 1 / 0 && h._clearSound(x._node))),
                    r || h._emit("stop", x._id))
                }
                return h
            },
            mute: function(b, r) {
                var h = this;
                if (h._state !== "loaded" || h._playLock)
                    return h._queue.push({
                        event: "mute",
                        action: function() {
                            h.mute(b, r)
                        }
                    }),
                    h;
                if (typeof r == "undefined")
                    if (typeof b == "boolean")
                        h._muted = b;
                    else
                        return h._muted;
                for (var m = h._getSoundIds(r), _ = 0; _ < m.length; _++) {
                    var x = h._soundById(m[_]);
                    x && (x._muted = b,
                    x._interval && h._stopFade(x._id),
                    h._webAudio && x._node ? x._node.gain.setValueAtTime(b ? 0 : x._volume, e.ctx.currentTime) : x._node && (x._node.muted = e._muted ? !0 : b),
                    h._emit("mute", x._id))
                }
                return h
            },
            volume: function() {
                var b = this, r = arguments, h, m;
                if (r.length === 0)
                    return b._volume;
                if (r.length === 1 || r.length === 2 && typeof r[1] == "undefined") {
                    var _ = b._getSoundIds()
                      , x = _.indexOf(r[0]);
                    x >= 0 ? m = parseInt(r[0], 10) : h = parseFloat(r[0])
                } else
                    r.length >= 2 && (h = parseFloat(r[0]),
                    m = parseInt(r[1], 10));
                var p;
                if (typeof h != "undefined" && h >= 0 && h <= 1) {
                    if (b._state !== "loaded" || b._playLock)
                        return b._queue.push({
                            event: "volume",
                            action: function() {
                                b.volume.apply(b, r)
                            }
                        }),
                        b;
                    typeof m == "undefined" && (b._volume = h),
                    m = b._getSoundIds(m);
                    for (var g = 0; g < m.length; g++)
                        p = b._soundById(m[g]),
                        p && (p._volume = h,
                        r[2] || b._stopFade(m[g]),
                        b._webAudio && p._node && !p._muted ? p._node.gain.setValueAtTime(h, e.ctx.currentTime) : p._node && !p._muted && (p._node.volume = h * e.volume()),
                        b._emit("volume", p._id))
                } else
                    return p = m ? b._soundById(m) : b._sounds[0],
                    p ? p._volume : 0;
                return b
            },
            fade: function(b, r, h, m) {
                var _ = this;
                if (_._state !== "loaded" || _._playLock)
                    return _._queue.push({
                        event: "fade",
                        action: function() {
                            _.fade(b, r, h, m)
                        }
                    }),
                    _;
                b = Math.min(Math.max(0, parseFloat(b)), 1),
                r = Math.min(Math.max(0, parseFloat(r)), 1),
                h = parseFloat(h),
                _.volume(b, m);
                for (var x = _._getSoundIds(m), p = 0; p < x.length; p++) {
                    var g = _._soundById(x[p]);
                    if (g) {
                        if (m || _._stopFade(x[p]),
                        _._webAudio && !g._muted) {
                            var T = e.ctx.currentTime
                              , w = T + h / 1e3;
                            g._volume = b,
                            g._node.gain.setValueAtTime(b, T),
                            g._node.gain.linearRampToValueAtTime(r, w)
                        }
                        _._startFadeInterval(g, b, r, h, x[p], typeof m == "undefined")
                    }
                }
                return _
            },
            _startFadeInterval: function(b, r, h, m, _, x) {
                var p = this
                  , g = r
                  , T = h - r
                  , w = Math.abs(T / .01)
                  , S = Math.max(4, w > 0 ? m / w : m)
                  , v = Date.now();
                b._fadeTo = h,
                b._interval = setInterval(function() {
                    var A = (Date.now() - v) / m;
                    v = Date.now(),
                    g += T * A,
                    g = Math.round(g * 100) / 100,
                    T < 0 ? g = Math.max(h, g) : g = Math.min(h, g),
                    p._webAudio ? b._volume = g : p.volume(g, b._id, !0),
                    x && (p._volume = g),
                    (h < r && g <= h || h > r && g >= h) && (clearInterval(b._interval),
                    b._interval = null,
                    b._fadeTo = null,
                    p.volume(h, b._id),
                    p._emit("fade", b._id))
                }, S)
            },
            _stopFade: function(b) {
                var r = this
                  , h = r._soundById(b);
                return h && h._interval && (r._webAudio && h._node.gain.cancelScheduledValues(e.ctx.currentTime),
                clearInterval(h._interval),
                h._interval = null,
                r.volume(h._fadeTo, b),
                h._fadeTo = null,
                r._emit("fade", b)),
                r
            },
            loop: function() {
                var b = this, r = arguments, h, m, _;
                if (r.length === 0)
                    return b._loop;
                if (r.length === 1)
                    if (typeof r[0] == "boolean")
                        h = r[0],
                        b._loop = h;
                    else
                        return _ = b._soundById(parseInt(r[0], 10)),
                        _ ? _._loop : !1;
                else
                    r.length === 2 && (h = r[0],
                    m = parseInt(r[1], 10));
                for (var x = b._getSoundIds(m), p = 0; p < x.length; p++)
                    _ = b._soundById(x[p]),
                    _ && (_._loop = h,
                    b._webAudio && _._node && _._node.bufferSource && (_._node.bufferSource.loop = h,
                    h && (_._node.bufferSource.loopStart = _._start || 0,
                    _._node.bufferSource.loopEnd = _._stop,
                    b.playing(x[p]) && (b.pause(x[p], !0),
                    b.play(x[p], !0)))));
                return b
            },
            rate: function() {
                var b = this, r = arguments, h, m;
                if (r.length === 0)
                    m = b._sounds[0]._id;
                else if (r.length === 1) {
                    var _ = b._getSoundIds()
                      , x = _.indexOf(r[0]);
                    x >= 0 ? m = parseInt(r[0], 10) : h = parseFloat(r[0])
                } else
                    r.length === 2 && (h = parseFloat(r[0]),
                    m = parseInt(r[1], 10));
                var p;
                if (typeof h == "number") {
                    if (b._state !== "loaded" || b._playLock)
                        return b._queue.push({
                            event: "rate",
                            action: function() {
                                b.rate.apply(b, r)
                            }
                        }),
                        b;
                    typeof m == "undefined" && (b._rate = h),
                    m = b._getSoundIds(m);
                    for (var g = 0; g < m.length; g++)
                        if (p = b._soundById(m[g]),
                        p) {
                            b.playing(m[g]) && (p._rateSeek = b.seek(m[g]),
                            p._playStart = b._webAudio ? e.ctx.currentTime : p._playStart),
                            p._rate = h,
                            b._webAudio && p._node && p._node.bufferSource ? p._node.bufferSource.playbackRate.setValueAtTime(h, e.ctx.currentTime) : p._node && (p._node.playbackRate = h);
                            var T = b.seek(m[g])
                              , w = (b._sprite[p._sprite][0] + b._sprite[p._sprite][1]) / 1e3 - T
                              , S = w * 1e3 / Math.abs(p._rate);
                            (b._endTimers[m[g]] || !p._paused) && (b._clearTimer(m[g]),
                            b._endTimers[m[g]] = setTimeout(b._ended.bind(b, p), S)),
                            b._emit("rate", p._id)
                        }
                } else
                    return p = b._soundById(m),
                    p ? p._rate : b._rate;
                return b
            },
            seek: function() {
                var b = this, r = arguments, h, m;
                if (r.length === 0)
                    b._sounds.length && (m = b._sounds[0]._id);
                else if (r.length === 1) {
                    var _ = b._getSoundIds()
                      , x = _.indexOf(r[0]);
                    x >= 0 ? m = parseInt(r[0], 10) : b._sounds.length && (m = b._sounds[0]._id,
                    h = parseFloat(r[0]))
                } else
                    r.length === 2 && (h = parseFloat(r[0]),
                    m = parseInt(r[1], 10));
                if (typeof m == "undefined")
                    return 0;
                if (typeof h == "number" && (b._state !== "loaded" || b._playLock))
                    return b._queue.push({
                        event: "seek",
                        action: function() {
                            b.seek.apply(b, r)
                        }
                    }),
                    b;
                var p = b._soundById(m);
                if (p)
                    if (typeof h == "number" && h >= 0) {
                        var g = b.playing(m);
                        g && b.pause(m, !0),
                        p._seek = h,
                        p._ended = !1,
                        b._clearTimer(m),
                        !b._webAudio && p._node && !isNaN(p._node.duration) && (p._node.currentTime = h);
                        var T = function() {
                            g && b.play(m, !0),
                            b._emit("seek", m)
                        };
                        if (g && !b._webAudio) {
                            var w = function() {
                                b._playLock ? setTimeout(w, 0) : T()
                            };
                            setTimeout(w, 0)
                        } else
                            T()
                    } else if (b._webAudio) {
                        var S = b.playing(m) ? e.ctx.currentTime - p._playStart : 0
                          , v = p._rateSeek ? p._rateSeek - p._seek : 0;
                        return p._seek + (v + S * Math.abs(p._rate))
                    } else
                        return p._node.currentTime;
                return b
            },
            playing: function(b) {
                var r = this;
                if (typeof b == "number") {
                    var h = r._soundById(b);
                    return h ? !h._paused : !1
                }
                for (var m = 0; m < r._sounds.length; m++)
                    if (!r._sounds[m]._paused)
                        return !0;
                return !1
            },
            duration: function(b) {
                var r = this
                  , h = r._duration
                  , m = r._soundById(b);
                return m && (h = r._sprite[m._sprite][1] / 1e3),
                h
            },
            state: function() {
                return this._state
            },
            unload: function() {
                for (var b = this, r = b._sounds, h = 0; h < r.length; h++)
                    r[h]._paused || b.stop(r[h]._id),
                    b._webAudio || (b._clearSound(r[h]._node),
                    r[h]._node.removeEventListener("error", r[h]._errorFn, !1),
                    r[h]._node.removeEventListener(e._canPlayEvent, r[h]._loadFn, !1),
                    r[h]._node.removeEventListener("ended", r[h]._endFn, !1),
                    e._releaseHtml5Audio(r[h]._node)),
                    delete r[h]._node,
                    b._clearTimer(r[h]._id);
                var m = e._howls.indexOf(b);
                m >= 0 && e._howls.splice(m, 1);
                var _ = !0;
                for (h = 0; h < e._howls.length; h++)
                    if (e._howls[h]._src === b._src || b._src.indexOf(e._howls[h]._src) >= 0) {
                        _ = !1;
                        break
                    }
                return n && _ && delete n[b._src],
                e.noAudio = !1,
                b._state = "unloaded",
                b._sounds = [],
                b = null,
                null
            },
            on: function(b, r, h, m) {
                var _ = this
                  , x = _["_on" + b];
                return typeof r == "function" && x.push(m ? {
                    id: h,
                    fn: r,
                    once: m
                } : {
                    id: h,
                    fn: r
                }),
                _
            },
            off: function(b, r, h) {
                var m = this
                  , _ = m["_on" + b]
                  , x = 0;
                if (typeof r == "number" && (h = r,
                r = null),
                r || h)
                    for (x = 0; x < _.length; x++) {
                        var p = h === _[x].id;
                        if (r === _[x].fn && p || !r && p) {
                            _.splice(x, 1);
                            break
                        }
                    }
                else if (b)
                    m["_on" + b] = [];
                else {
                    var g = Object.keys(m);
                    for (x = 0; x < g.length; x++)
                        g[x].indexOf("_on") === 0 && Array.isArray(m[g[x]]) && (m[g[x]] = [])
                }
                return m
            },
            once: function(b, r, h) {
                var m = this;
                return m.on(b, r, h, 1),
                m
            },
            _emit: function(b, r, h) {
                for (var m = this, _ = m["_on" + b], x = _.length - 1; x >= 0; x--)
                    (!_[x].id || _[x].id === r || b === "load") && (setTimeout(function(p) {
                        p.call(this, r, h)
                    }
                    .bind(m, _[x].fn), 0),
                    _[x].once && m.off(b, _[x].fn, _[x].id));
                return m._loadQueue(b),
                m
            },
            _loadQueue: function(b) {
                var r = this;
                if (r._queue.length > 0) {
                    var h = r._queue[0];
                    h.event === b && (r._queue.shift(),
                    r._loadQueue()),
                    b || h.action()
                }
                return r
            },
            _ended: function(b) {
                var r = this
                  , h = b._sprite;
                if (!r._webAudio && b._node && !b._node.paused && !b._node.ended && b._node.currentTime < b._stop)
                    return setTimeout(r._ended.bind(r, b), 100),
                    r;
                var m = !!(b._loop || r._sprite[h][2]);
                if (r._emit("end", b._id),
                !r._webAudio && m && r.stop(b._id, !0).play(b._id),
                r._webAudio && m) {
                    r._emit("play", b._id),
                    b._seek = b._start || 0,
                    b._rateSeek = 0,
                    b._playStart = e.ctx.currentTime;
                    var _ = (b._stop - b._start) * 1e3 / Math.abs(b._rate);
                    r._endTimers[b._id] = setTimeout(r._ended.bind(r, b), _)
                }
                return r._webAudio && !m && (b._paused = !0,
                b._ended = !0,
                b._seek = b._start || 0,
                b._rateSeek = 0,
                r._clearTimer(b._id),
                r._cleanBuffer(b._node),
                e._autoSuspend()),
                !r._webAudio && !m && r.stop(b._id, !0),
                r
            },
            _clearTimer: function(b) {
                var r = this;
                if (r._endTimers[b]) {
                    if (typeof r._endTimers[b] != "function")
                        clearTimeout(r._endTimers[b]);
                    else {
                        var h = r._soundById(b);
                        h && h._node && h._node.removeEventListener("ended", r._endTimers[b], !1)
                    }
                    delete r._endTimers[b]
                }
                return r
            },
            _soundById: function(b) {
                for (var r = this, h = 0; h < r._sounds.length; h++)
                    if (b === r._sounds[h]._id)
                        return r._sounds[h];
                return null
            },
            _inactiveSound: function() {
                var b = this;
                b._drain();
                for (var r = 0; r < b._sounds.length; r++)
                    if (b._sounds[r]._ended)
                        return b._sounds[r].reset();
                return new s(b)
            },
            _drain: function() {
                var b = this
                  , r = b._pool
                  , h = 0
                  , m = 0;
                if (!(b._sounds.length < r)) {
                    for (m = 0; m < b._sounds.length; m++)
                        b._sounds[m]._ended && h++;
                    for (m = b._sounds.length - 1; m >= 0; m--) {
                        if (h <= r)
                            return;
                        b._sounds[m]._ended && (b._webAudio && b._sounds[m]._node && b._sounds[m]._node.disconnect(0),
                        b._sounds.splice(m, 1),
                        h--)
                    }
                }
            },
            _getSoundIds: function(b) {
                var r = this;
                if (typeof b == "undefined") {
                    for (var h = [], m = 0; m < r._sounds.length; m++)
                        h.push(r._sounds[m]._id);
                    return h
                } else
                    return [b]
            },
            _refreshBuffer: function(b) {
                var r = this;
                return b._node.bufferSource = e.ctx.createBufferSource(),
                b._node.bufferSource.buffer = n[r._src],
                b._panner ? b._node.bufferSource.connect(b._panner) : b._node.bufferSource.connect(b._node),
                b._node.bufferSource.loop = b._loop,
                b._loop && (b._node.bufferSource.loopStart = b._start || 0,
                b._node.bufferSource.loopEnd = b._stop || 0),
                b._node.bufferSource.playbackRate.setValueAtTime(b._rate, e.ctx.currentTime),
                r
            },
            _cleanBuffer: function(b) {
                var r = this
                  , h = e._navigator && e._navigator.vendor.indexOf("Apple") >= 0;
                if (e._scratchBuffer && b.bufferSource && (b.bufferSource.onended = null,
                b.bufferSource.disconnect(0),
                h))
                    try {
                        b.bufferSource.buffer = e._scratchBuffer
                    } catch {}
                return b.bufferSource = null,
                r
            },
            _clearSound: function(b) {
                var r = /MSIE |Trident\//.test(e._navigator && e._navigator.userAgent);
                r || (b.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
            }
        };
        var s = function(b) {
            this._parent = b,
            this.init()
        };
        s.prototype = {
            init: function() {
                var b = this
                  , r = b._parent;
                return b._muted = r._muted,
                b._loop = r._loop,
                b._volume = r._volume,
                b._rate = r._rate,
                b._seek = 0,
                b._paused = !0,
                b._ended = !0,
                b._sprite = "__default",
                b._id = ++e._counter,
                r._sounds.push(b),
                b.create(),
                b
            },
            create: function() {
                var b = this
                  , r = b._parent
                  , h = e._muted || b._muted || b._parent._muted ? 0 : b._volume;
                return r._webAudio ? (b._node = typeof e.ctx.createGain == "undefined" ? e.ctx.createGainNode() : e.ctx.createGain(),
                b._node.gain.setValueAtTime(h, e.ctx.currentTime),
                b._node.paused = !0,
                b._node.connect(e.masterGain)) : e.noAudio || (b._node = e._obtainHtml5Audio(),
                b._errorFn = b._errorListener.bind(b),
                b._node.addEventListener("error", b._errorFn, !1),
                b._loadFn = b._loadListener.bind(b),
                b._node.addEventListener(e._canPlayEvent, b._loadFn, !1),
                b._endFn = b._endListener.bind(b),
                b._node.addEventListener("ended", b._endFn, !1),
                b._node.src = r._src,
                b._node.preload = r._preload === !0 ? "auto" : r._preload,
                b._node.volume = h * e.volume(),
                b._node.load()),
                b
            },
            reset: function() {
                var b = this
                  , r = b._parent;
                return b._muted = r._muted,
                b._loop = r._loop,
                b._volume = r._volume,
                b._rate = r._rate,
                b._seek = 0,
                b._rateSeek = 0,
                b._paused = !0,
                b._ended = !0,
                b._sprite = "__default",
                b._id = ++e._counter,
                b
            },
            _errorListener: function() {
                var b = this;
                b._parent._emit("loaderror", b._id, b._node.error ? b._node.error.code : 0),
                b._node.removeEventListener("error", b._errorFn, !1)
            },
            _loadListener: function() {
                var b = this
                  , r = b._parent;
                r._duration = Math.ceil(b._node.duration * 10) / 10,
                Object.keys(r._sprite).length === 0 && (r._sprite = {
                    __default: [0, r._duration * 1e3]
                }),
                r._state !== "loaded" && (r._state = "loaded",
                r._emit("load"),
                r._loadQueue()),
                b._node.removeEventListener(e._canPlayEvent, b._loadFn, !1)
            },
            _endListener: function() {
                var b = this
                  , r = b._parent;
                r._duration === 1 / 0 && (r._duration = Math.ceil(b._node.duration * 10) / 10,
                r._sprite.__default[1] === 1 / 0 && (r._sprite.__default[1] = r._duration * 1e3),
                r._ended(b)),
                b._node.removeEventListener("ended", b._endFn, !1)
            }
        };
        var n = {}
          , o = function(b) {
            var r = b._src;
            if (n[r]) {
                b._duration = n[r].duration,
                d(b);
                return
            }
            if (/^data:[^;]+;base64,/.test(r)) {
                for (var h = atob(r.split(",")[1]), m = new Uint8Array(h.length), _ = 0; _ < h.length; ++_)
                    m[_] = h.charCodeAt(_);
                c(m.buffer, b)
            } else {
                var x = new XMLHttpRequest;
                x.open(b._xhr.method, r, !0),
                x.withCredentials = b._xhr.withCredentials,
                x.responseType = "arraybuffer",
                b._xhr.headers && Object.keys(b._xhr.headers).forEach(function(p) {
                    x.setRequestHeader(p, b._xhr.headers[p])
                }),
                x.onload = function() {
                    var p = (x.status + "")[0];
                    if (p !== "0" && p !== "2" && p !== "3") {
                        b._emit("loaderror", null, "Failed loading audio file with status: " + x.status + ".");
                        return
                    }
                    c(x.response, b)
                }
                ,
                x.onerror = function() {
                    b._webAudio && (b._html5 = !0,
                    b._webAudio = !1,
                    b._sounds = [],
                    delete n[r],
                    b.load())
                }
                ,
                l(x)
            }
        }
          , l = function(b) {
            try {
                b.send()
            } catch {
                b.onerror()
            }
        }
          , c = function(b, r) {
            var h = function() {
                r._emit("loaderror", null, "Decoding audio data failed.")
            }
              , m = function(_) {
                _ && r._sounds.length > 0 ? (n[r._src] = _,
                d(r, _)) : h()
            };
            typeof Promise != "undefined" && e.ctx.decodeAudioData.length === 1 ? e.ctx.decodeAudioData(b).then(m).catch(h) : e.ctx.decodeAudioData(b, m, h)
        }
          , d = function(b, r) {
            r && !b._duration && (b._duration = r.duration),
            Object.keys(b._sprite).length === 0 && (b._sprite = {
                __default: [0, b._duration * 1e3]
            }),
            b._state !== "loaded" && (b._state = "loaded",
            b._emit("load"),
            b._loadQueue())
        }
          , u = function() {
            if (!!e.usingWebAudio) {
                try {
                    typeof AudioContext != "undefined" ? e.ctx = new AudioContext : typeof webkitAudioContext != "undefined" ? e.ctx = new webkitAudioContext : e.usingWebAudio = !1
                } catch {
                    e.usingWebAudio = !1
                }
                e.ctx || (e.usingWebAudio = !1);
                var b = /iP(hone|od|ad)/.test(e._navigator && e._navigator.platform)
                  , r = e._navigator && e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
                  , h = r ? parseInt(r[1], 10) : null;
                if (b && h && h < 9) {
                    var m = /safari/.test(e._navigator && e._navigator.userAgent.toLowerCase());
                    e._navigator && !m && (e.usingWebAudio = !1)
                }
                e.usingWebAudio && (e.masterGain = typeof e.ctx.createGain == "undefined" ? e.ctx.createGainNode() : e.ctx.createGain(),
                e.masterGain.gain.setValueAtTime(e._muted ? 0 : e._volume, e.ctx.currentTime),
                e.masterGain.connect(e.ctx.destination)),
                e._setup()
            }
        };
        a.Howler = e,
        a.Howl = i,
        typeof $1 != "undefined" ? ($1.HowlerGlobal = t,
        $1.Howler = e,
        $1.Howl = i,
        $1.Sound = s) : typeof window != "undefined" && (window.HowlerGlobal = t,
        window.Howler = e,
        window.Howl = i,
        window.Sound = s)
    }
    )();
    /*!
 *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
 *  
 *  howler.js v2.2.3
 *  howlerjs.com
 *
 *  (c) 2013-2020, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
    (function() {
        HowlerGlobal.prototype._pos = [0, 0, 0],
        HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0],
        HowlerGlobal.prototype.stereo = function(e) {
            var i = this;
            if (!i.ctx || !i.ctx.listener)
                return i;
            for (var s = i._howls.length - 1; s >= 0; s--)
                i._howls[s].stereo(e);
            return i
        }
        ,
        HowlerGlobal.prototype.pos = function(e, i, s) {
            var n = this;
            if (!n.ctx || !n.ctx.listener)
                return n;
            if (i = typeof i != "number" ? n._pos[1] : i,
            s = typeof s != "number" ? n._pos[2] : s,
            typeof e == "number")
                n._pos = [e, i, s],
                typeof n.ctx.listener.positionX != "undefined" ? (n.ctx.listener.positionX.setTargetAtTime(n._pos[0], Howler.ctx.currentTime, .1),
                n.ctx.listener.positionY.setTargetAtTime(n._pos[1], Howler.ctx.currentTime, .1),
                n.ctx.listener.positionZ.setTargetAtTime(n._pos[2], Howler.ctx.currentTime, .1)) : n.ctx.listener.setPosition(n._pos[0], n._pos[1], n._pos[2]);
            else
                return n._pos;
            return n
        }
        ,
        HowlerGlobal.prototype.orientation = function(e, i, s, n, o, l) {
            var c = this;
            if (!c.ctx || !c.ctx.listener)
                return c;
            var d = c._orientation;
            if (i = typeof i != "number" ? d[1] : i,
            s = typeof s != "number" ? d[2] : s,
            n = typeof n != "number" ? d[3] : n,
            o = typeof o != "number" ? d[4] : o,
            l = typeof l != "number" ? d[5] : l,
            typeof e == "number")
                c._orientation = [e, i, s, n, o, l],
                typeof c.ctx.listener.forwardX != "undefined" ? (c.ctx.listener.forwardX.setTargetAtTime(e, Howler.ctx.currentTime, .1),
                c.ctx.listener.forwardY.setTargetAtTime(i, Howler.ctx.currentTime, .1),
                c.ctx.listener.forwardZ.setTargetAtTime(s, Howler.ctx.currentTime, .1),
                c.ctx.listener.upX.setTargetAtTime(n, Howler.ctx.currentTime, .1),
                c.ctx.listener.upY.setTargetAtTime(o, Howler.ctx.currentTime, .1),
                c.ctx.listener.upZ.setTargetAtTime(l, Howler.ctx.currentTime, .1)) : c.ctx.listener.setOrientation(e, i, s, n, o, l);
            else
                return d;
            return c
        }
        ,
        Howl.prototype.init = function(e) {
            return function(i) {
                var s = this;
                return s._orientation = i.orientation || [1, 0, 0],
                s._stereo = i.stereo || null,
                s._pos = i.pos || null,
                s._pannerAttr = {
                    coneInnerAngle: typeof i.coneInnerAngle != "undefined" ? i.coneInnerAngle : 360,
                    coneOuterAngle: typeof i.coneOuterAngle != "undefined" ? i.coneOuterAngle : 360,
                    coneOuterGain: typeof i.coneOuterGain != "undefined" ? i.coneOuterGain : 0,
                    distanceModel: typeof i.distanceModel != "undefined" ? i.distanceModel : "inverse",
                    maxDistance: typeof i.maxDistance != "undefined" ? i.maxDistance : 1e4,
                    panningModel: typeof i.panningModel != "undefined" ? i.panningModel : "HRTF",
                    refDistance: typeof i.refDistance != "undefined" ? i.refDistance : 1,
                    rolloffFactor: typeof i.rolloffFactor != "undefined" ? i.rolloffFactor : 1
                },
                s._onstereo = i.onstereo ? [{
                    fn: i.onstereo
                }] : [],
                s._onpos = i.onpos ? [{
                    fn: i.onpos
                }] : [],
                s._onorientation = i.onorientation ? [{
                    fn: i.onorientation
                }] : [],
                e.call(this, i)
            }
        }(Howl.prototype.init),
        Howl.prototype.stereo = function(e, i) {
            var s = this;
            if (!s._webAudio)
                return s;
            if (s._state !== "loaded")
                return s._queue.push({
                    event: "stereo",
                    action: function() {
                        s.stereo(e, i)
                    }
                }),
                s;
            var n = typeof Howler.ctx.createStereoPanner == "undefined" ? "spatial" : "stereo";
            if (typeof i == "undefined")
                if (typeof e == "number")
                    s._stereo = e,
                    s._pos = [e, 0, 0];
                else
                    return s._stereo;
            for (var o = s._getSoundIds(i), l = 0; l < o.length; l++) {
                var c = s._soundById(o[l]);
                if (c)
                    if (typeof e == "number")
                        c._stereo = e,
                        c._pos = [e, 0, 0],
                        c._node && (c._pannerAttr.panningModel = "equalpower",
                        (!c._panner || !c._panner.pan) && t(c, n),
                        n === "spatial" ? typeof c._panner.positionX != "undefined" ? (c._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime),
                        c._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime),
                        c._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : c._panner.setPosition(e, 0, 0) : c._panner.pan.setValueAtTime(e, Howler.ctx.currentTime)),
                        s._emit("stereo", c._id);
                    else
                        return c._stereo
            }
            return s
        }
        ,
        Howl.prototype.pos = function(e, i, s, n) {
            var o = this;
            if (!o._webAudio)
                return o;
            if (o._state !== "loaded")
                return o._queue.push({
                    event: "pos",
                    action: function() {
                        o.pos(e, i, s, n)
                    }
                }),
                o;
            if (i = typeof i != "number" ? 0 : i,
            s = typeof s != "number" ? -.5 : s,
            typeof n == "undefined")
                if (typeof e == "number")
                    o._pos = [e, i, s];
                else
                    return o._pos;
            for (var l = o._getSoundIds(n), c = 0; c < l.length; c++) {
                var d = o._soundById(l[c]);
                if (d)
                    if (typeof e == "number")
                        d._pos = [e, i, s],
                        d._node && ((!d._panner || d._panner.pan) && t(d, "spatial"),
                        typeof d._panner.positionX != "undefined" ? (d._panner.positionX.setValueAtTime(e, Howler.ctx.currentTime),
                        d._panner.positionY.setValueAtTime(i, Howler.ctx.currentTime),
                        d._panner.positionZ.setValueAtTime(s, Howler.ctx.currentTime)) : d._panner.setPosition(e, i, s)),
                        o._emit("pos", d._id);
                    else
                        return d._pos
            }
            return o
        }
        ,
        Howl.prototype.orientation = function(e, i, s, n) {
            var o = this;
            if (!o._webAudio)
                return o;
            if (o._state !== "loaded")
                return o._queue.push({
                    event: "orientation",
                    action: function() {
                        o.orientation(e, i, s, n)
                    }
                }),
                o;
            if (i = typeof i != "number" ? o._orientation[1] : i,
            s = typeof s != "number" ? o._orientation[2] : s,
            typeof n == "undefined")
                if (typeof e == "number")
                    o._orientation = [e, i, s];
                else
                    return o._orientation;
            for (var l = o._getSoundIds(n), c = 0; c < l.length; c++) {
                var d = o._soundById(l[c]);
                if (d)
                    if (typeof e == "number")
                        d._orientation = [e, i, s],
                        d._node && (d._panner || (d._pos || (d._pos = o._pos || [0, 0, -.5]),
                        t(d, "spatial")),
                        typeof d._panner.orientationX != "undefined" ? (d._panner.orientationX.setValueAtTime(e, Howler.ctx.currentTime),
                        d._panner.orientationY.setValueAtTime(i, Howler.ctx.currentTime),
                        d._panner.orientationZ.setValueAtTime(s, Howler.ctx.currentTime)) : d._panner.setOrientation(e, i, s)),
                        o._emit("orientation", d._id);
                    else
                        return d._orientation
            }
            return o
        }
        ,
        Howl.prototype.pannerAttr = function() {
            var e = this, i = arguments, s, n, o;
            if (!e._webAudio)
                return e;
            if (i.length === 0)
                return e._pannerAttr;
            if (i.length === 1)
                if (typeof i[0] == "object")
                    s = i[0],
                    typeof n == "undefined" && (s.pannerAttr || (s.pannerAttr = {
                        coneInnerAngle: s.coneInnerAngle,
                        coneOuterAngle: s.coneOuterAngle,
                        coneOuterGain: s.coneOuterGain,
                        distanceModel: s.distanceModel,
                        maxDistance: s.maxDistance,
                        refDistance: s.refDistance,
                        rolloffFactor: s.rolloffFactor,
                        panningModel: s.panningModel
                    }),
                    e._pannerAttr = {
                        coneInnerAngle: typeof s.pannerAttr.coneInnerAngle != "undefined" ? s.pannerAttr.coneInnerAngle : e._coneInnerAngle,
                        coneOuterAngle: typeof s.pannerAttr.coneOuterAngle != "undefined" ? s.pannerAttr.coneOuterAngle : e._coneOuterAngle,
                        coneOuterGain: typeof s.pannerAttr.coneOuterGain != "undefined" ? s.pannerAttr.coneOuterGain : e._coneOuterGain,
                        distanceModel: typeof s.pannerAttr.distanceModel != "undefined" ? s.pannerAttr.distanceModel : e._distanceModel,
                        maxDistance: typeof s.pannerAttr.maxDistance != "undefined" ? s.pannerAttr.maxDistance : e._maxDistance,
                        refDistance: typeof s.pannerAttr.refDistance != "undefined" ? s.pannerAttr.refDistance : e._refDistance,
                        rolloffFactor: typeof s.pannerAttr.rolloffFactor != "undefined" ? s.pannerAttr.rolloffFactor : e._rolloffFactor,
                        panningModel: typeof s.pannerAttr.panningModel != "undefined" ? s.pannerAttr.panningModel : e._panningModel
                    });
                else
                    return o = e._soundById(parseInt(i[0], 10)),
                    o ? o._pannerAttr : e._pannerAttr;
            else
                i.length === 2 && (s = i[0],
                n = parseInt(i[1], 10));
            for (var l = e._getSoundIds(n), c = 0; c < l.length; c++)
                if (o = e._soundById(l[c]),
                o) {
                    var d = o._pannerAttr;
                    d = {
                        coneInnerAngle: typeof s.coneInnerAngle != "undefined" ? s.coneInnerAngle : d.coneInnerAngle,
                        coneOuterAngle: typeof s.coneOuterAngle != "undefined" ? s.coneOuterAngle : d.coneOuterAngle,
                        coneOuterGain: typeof s.coneOuterGain != "undefined" ? s.coneOuterGain : d.coneOuterGain,
                        distanceModel: typeof s.distanceModel != "undefined" ? s.distanceModel : d.distanceModel,
                        maxDistance: typeof s.maxDistance != "undefined" ? s.maxDistance : d.maxDistance,
                        refDistance: typeof s.refDistance != "undefined" ? s.refDistance : d.refDistance,
                        rolloffFactor: typeof s.rolloffFactor != "undefined" ? s.rolloffFactor : d.rolloffFactor,
                        panningModel: typeof s.panningModel != "undefined" ? s.panningModel : d.panningModel
                    };
                    var u = o._panner;
                    u ? (u.coneInnerAngle = d.coneInnerAngle,
                    u.coneOuterAngle = d.coneOuterAngle,
                    u.coneOuterGain = d.coneOuterGain,
                    u.distanceModel = d.distanceModel,
                    u.maxDistance = d.maxDistance,
                    u.refDistance = d.refDistance,
                    u.rolloffFactor = d.rolloffFactor,
                    u.panningModel = d.panningModel) : (o._pos || (o._pos = e._pos || [0, 0, -.5]),
                    t(o, "spatial"))
                }
            return e
        }
        ,
        Sound.prototype.init = function(e) {
            return function() {
                var i = this
                  , s = i._parent;
                i._orientation = s._orientation,
                i._stereo = s._stereo,
                i._pos = s._pos,
                i._pannerAttr = s._pannerAttr,
                e.call(this),
                i._stereo ? s.stereo(i._stereo) : i._pos && s.pos(i._pos[0], i._pos[1], i._pos[2], i._id)
            }
        }(Sound.prototype.init),
        Sound.prototype.reset = function(e) {
            return function() {
                var i = this
                  , s = i._parent;
                return i._orientation = s._orientation,
                i._stereo = s._stereo,
                i._pos = s._pos,
                i._pannerAttr = s._pannerAttr,
                i._stereo ? s.stereo(i._stereo) : i._pos ? s.pos(i._pos[0], i._pos[1], i._pos[2], i._id) : i._panner && (i._panner.disconnect(0),
                i._panner = void 0,
                s._refreshBuffer(i)),
                e.call(this)
            }
        }(Sound.prototype.reset);
        var t = function(e, i) {
            i = i || "spatial",
            i === "spatial" ? (e._panner = Howler.ctx.createPanner(),
            e._panner.coneInnerAngle = e._pannerAttr.coneInnerAngle,
            e._panner.coneOuterAngle = e._pannerAttr.coneOuterAngle,
            e._panner.coneOuterGain = e._pannerAttr.coneOuterGain,
            e._panner.distanceModel = e._pannerAttr.distanceModel,
            e._panner.maxDistance = e._pannerAttr.maxDistance,
            e._panner.refDistance = e._pannerAttr.refDistance,
            e._panner.rolloffFactor = e._pannerAttr.rolloffFactor,
            e._panner.panningModel = e._pannerAttr.panningModel,
            typeof e._panner.positionX != "undefined" ? (e._panner.positionX.setValueAtTime(e._pos[0], Howler.ctx.currentTime),
            e._panner.positionY.setValueAtTime(e._pos[1], Howler.ctx.currentTime),
            e._panner.positionZ.setValueAtTime(e._pos[2], Howler.ctx.currentTime)) : e._panner.setPosition(e._pos[0], e._pos[1], e._pos[2]),
            typeof e._panner.orientationX != "undefined" ? (e._panner.orientationX.setValueAtTime(e._orientation[0], Howler.ctx.currentTime),
            e._panner.orientationY.setValueAtTime(e._orientation[1], Howler.ctx.currentTime),
            e._panner.orientationZ.setValueAtTime(e._orientation[2], Howler.ctx.currentTime)) : e._panner.setOrientation(e._orientation[0], e._orientation[1], e._orientation[2])) : (e._panner = Howler.ctx.createStereoPanner(),
            e._panner.pan.setValueAtTime(e._stereo, Howler.ctx.currentTime)),
            e._panner.connect(e._node),
            e._paused || e._parent.pause(e._id, !0).play(e._id, !0)
        }
    }
    )()
}
)(Ut);
const a2 = (a,t)=>Array(Math.abs(t) + 1).join(a);
function Vt(a, t, e) {
    return function(...i) {
        return console.warn(`${a} is deprecated. Use ${t}.`),
        e.apply(this, i)
    }
}
function d3(a) {
    return a !== null && typeof a == "object" && typeof a.name == "string"
}
function m3(a) {
    return a !== null && typeof a == "object" && typeof a.step == "number" && typeof a.alt == "number"
}
const u3 = [0, 2, 4, -1, 1, 3, 5]
  , f3 = u3.map(a=>Math.floor(a * 7 / 12));
function _3(a) {
    const {step: t, alt: e, oct: i, dir: s=1} = a
      , n = u3[t] + 7 * e;
    if (i === void 0)
        return [s * n];
    const o = i - f3[t] - 4 * e;
    return [s * n, s * o]
}
const $t = [3, 0, 4, 1, 5, 2, 6];
function p3(a) {
    const [t,e,i] = a
      , s = $t[jt(t)]
      , n = Math.floor((t + 1) / 7);
    if (e === void 0)
        return {
            step: s,
            alt: n,
            dir: i
        };
    const o = e + 4 * n + f3[s];
    return {
        step: s,
        alt: n,
        oct: o,
        dir: i
    }
}
function jt(a) {
    const t = (a + 1) % 7;
    return t < 0 ? 7 + t : t
}
const x3 = {
    empty: !0,
    name: "",
    pc: "",
    acc: ""
}
  , g3 = new Map
  , Kt = a=>"CDEFGAB".charAt(a)
  , qt = a=>a < 0 ? a2("b", -a) : a2("#", a)
  , Qt = a=>a[0] === "b" ? -a.length : a.length;
function Q(a) {
    const t = g3.get(a);
    if (t)
        return t;
    const e = typeof a == "string" ? te(a) : m3(a) ? Q(ee(a)) : d3(a) ? Q(a.name) : x3;
    return g3.set(a, e),
    e
}
const Jt = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
function y3(a) {
    const t = Jt.exec(a);
    return [t[1].toUpperCase(), t[2].replace(/x/g, "##"), t[3], t[4]]
}
function M2(a) {
    return Q(p3(a))
}
const Zt = (a,t)=>(a % t + t) % t
  , A2 = [0, 2, 4, 5, 7, 9, 11];
function te(a) {
    const t = y3(a);
    if (t[0] === "" || t[3] !== "")
        return x3;
    const e = t[0]
      , i = t[1]
      , s = t[2]
      , n = (e.charCodeAt(0) + 3) % 7
      , o = Qt(i)
      , l = s.length ? +s : void 0
      , c = _3({
        step: n,
        alt: o,
        oct: l
    })
      , d = e + i + s
      , u = e + i
      , b = (A2[n] + o + 120) % 12
      , r = l === void 0 ? Zt(A2[n] + o, 12) - 12 * 99 : A2[n] + o + 12 * (l + 1)
      , h = r >= 0 && r <= 127 ? r : null
      , m = l === void 0 ? null : Math.pow(2, (r - 69) / 12) * 440;
    return {
        empty: !1,
        acc: i,
        alt: o,
        chroma: b,
        coord: c,
        freq: m,
        height: r,
        letter: e,
        midi: h,
        name: d,
        oct: l,
        pc: u,
        step: n
    }
}
function ee(a) {
    const {step: t, alt: e, oct: i} = a
      , s = Kt(t);
    if (!s)
        return "";
    const n = s + qt(e);
    return i || i === 0 ? n + i : n
}
const k2 = {
    empty: !0,
    name: "",
    acc: ""
}
  , ie = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})"
  , se = "(AA|A|P|M|m|d|dd)([-+]?\\d+)"
  , ne = new RegExp("^" + ie + "|" + se + "$");
function be(a) {
    const t = ne.exec(`${a}`);
    return t === null ? ["", ""] : t[1] ? [t[1], t[2]] : [t[4], t[3]]
}
const w3 = {};
function j1(a) {
    return typeof a == "string" ? w3[a] || (w3[a] = oe(a)) : m3(a) ? j1(le(a)) : d3(a) ? j1(a.name) : k2
}
const T3 = [0, 2, 4, 5, 7, 9, 11]
  , S3 = "PMMPPMM";
function oe(a) {
    const t = be(a);
    if (t[0] === "")
        return k2;
    const e = +t[0]
      , i = t[1]
      , s = (Math.abs(e) - 1) % 7
      , n = S3[s];
    if (n === "M" && i === "P")
        return k2;
    const o = n === "M" ? "majorable" : "perfectable"
      , l = "" + e + i
      , c = e < 0 ? -1 : 1
      , d = e === 8 || e === -8 ? e : c * (s + 1)
      , u = ae(o, i)
      , b = Math.floor((Math.abs(e) - 1) / 7)
      , r = c * (T3[s] + u + 12 * b)
      , h = (c * (T3[s] + u) % 12 + 12) % 12
      , m = _3({
        step: s,
        alt: u,
        oct: b,
        dir: c
    });
    return {
        empty: !1,
        name: l,
        num: e,
        q: i,
        step: s,
        alt: u,
        dir: c,
        type: o,
        simple: d,
        semitones: r,
        chroma: h,
        coord: m,
        oct: b
    }
}
function re(a, t) {
    const [e,i=0] = a
      , s = e * 7 + i * 12 < 0
      , n = t || s ? [-e, -i, -1] : [e, i, 1];
    return j1(p3(n))
}
function ae(a, t) {
    return t === "M" && a === "majorable" || t === "P" && a === "perfectable" ? 0 : t === "m" && a === "majorable" ? -1 : /^A+$/.test(t) ? t.length : /^d+$/.test(t) ? -1 * (a === "perfectable" ? t.length : t.length + 1) : 0
}
function le(a) {
    const {step: t, alt: e, oct: i=0, dir: s} = a;
    if (!s)
        return "";
    const n = t + 1 + 7 * i
      , o = n === 0 ? t + 1 : n
      , l = s < 0 ? "-" : ""
      , c = S3[t] === "M" ? "majorable" : "perfectable";
    return l + o + he(c, e)
}
function he(a, t) {
    return t === 0 ? a === "majorable" ? "M" : "P" : t === -1 && a === "majorable" ? "m" : t > 0 ? a2("A", t) : a2("d", a === "perfectable" ? t : t + 1)
}
function K1(a, t) {
    const e = Q(a)
      , i = j1(t);
    if (e.empty || i.empty)
        return "";
    const s = e.coord
      , n = i.coord
      , o = s.length === 1 ? [s[0] + n[0]] : [s[0] + n[0], s[1] + n[1]];
    return M2(o).name
}
function ce(a, t) {
    const e = Q(a)
      , i = Q(t);
    if (e.empty || i.empty)
        return "";
    const s = e.coord
      , n = i.coord
      , o = n[0] - s[0]
      , l = s.length === 2 && n.length === 2 ? n[1] - s[1] : -Math.floor(o * 7 / 12)
      , c = i.height === e.height && i.midi !== null && e.midi !== null && e.step > i.step;
    return re([o, l], c).name
}
function C2(a, t) {
    const e = t.length
      , i = (a % e + e) % e;
    return t.slice(i, e).concat(t.slice(0, i))
}
function de(a) {
    return a.filter(t=>t === 0 || t)
}
const v1 = {
    empty: !0,
    name: "",
    setNum: 0,
    chroma: "000000000000",
    normalized: "000000000000",
    intervals: []
}
  , v3 = a=>Number(a).toString(2)
  , P3 = a=>parseInt(a, 2)
  , me = /^[01]{12}$/;
function E3(a) {
    return me.test(a)
}
const ue = a=>typeof a == "number" && a >= 0 && a <= 4095
  , fe = a=>a && E3(a.chroma)
  , M3 = {
    [v1.chroma]: v1
};
function P1(a) {
    const t = E3(a) ? a : ue(a) ? v3(a) : Array.isArray(a) ? Te(a) : fe(a) ? a.chroma : v1.chroma;
    return M3[t] = M3[t] || we(t)
}
const _e = ["1P", "2m", "2M", "3m", "3M", "4P", "5d", "5P", "6m", "6M", "7m", "7M"];
function pe(a) {
    const t = [];
    for (let e = 0; e < 12; e++)
        a.charAt(e) === "1" && t.push(_e[e]);
    return t
}
function xe(a, t=!0) {
    const i = P1(a).chroma.split("");
    return de(i.map((s,n)=>{
        const o = C2(n, i);
        return t && o[0] === "0" ? null : o.join("")
    }
    ))
}
function ge(a) {
    const t = P1(a).setNum;
    return e=>{
        const i = P1(e).setNum;
        return t && t !== i && (i & t) === i
    }
}
function A3(a) {
    const t = P1(a).setNum;
    return e=>{
        const i = P1(e).setNum;
        return t && t !== i && (i | t) === i
    }
}
function ye(a) {
    const t = a.split("");
    return t.map((e,i)=>C2(i, t).join(""))
}
function we(a) {
    const t = P3(a)
      , e = ye(a).map(P3).filter(n=>n >= 2048).sort()[0]
      , i = v3(e)
      , s = pe(a);
    return {
        empty: !1,
        name: "",
        setNum: t,
        chroma: a,
        normalized: i,
        intervals: s
    }
}
function Te(a) {
    if (a.length === 0)
        return v1.chroma;
    let t;
    const e = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < a.length; i++)
        t = Q(a[i]),
        t.empty && (t = j1(a[i])),
        t.empty || (e[t.chroma] = 1);
    return e.join("")
}
const Se = [["1P 3M 5P", "major", "M ^ "], ["1P 3M 5P 7M", "major seventh", "maj7 \u0394 ma7 M7 Maj7 ^7"], ["1P 3M 5P 7M 9M", "major ninth", "maj9 \u03949 ^9"], ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"], ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"], ["1P 3M 5P 6M 9M", "sixth/ninth", "6/9 69 M69"], ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"], ["1P 3M 5P 7M 11A", "major seventh sharp eleventh", "maj#4 \u0394#4 \u0394#11 M7#11 ^7#11 maj7#11"], ["1P 3m 5P", "minor", "m min -"], ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"], ["1P 3m 5P 7M", "minor/major seventh", "m/ma7 m/maj7 mM7 mMaj7 m/M7 -\u03947 m\u0394 -^7"], ["1P 3m 5P 6M", "minor sixth", "m6 -6"], ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"], ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"], ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"], ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"], ["1P 3m 5d", "diminished", "dim \xB0 o"], ["1P 3m 5d 7d", "diminished seventh", "dim7 \xB07 o7"], ["1P 3m 5d 7m", "half-diminished", "m7b5 \xF8 -7b5 h7 h"], ["1P 3M 5P 7m", "dominant seventh", "7 dom"], ["1P 3M 5P 7m 9M", "dominant ninth", "9"], ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"], ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"], ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"], ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"], ["1P 3M 7m 9m", "altered", "alt7"], ["1P 4P 5P", "suspended fourth", "sus4 sus"], ["1P 2M 5P", "suspended second", "sus2"], ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"], ["1P 5P 7m 9M 11P", "eleventh", "11"], ["1P 4P 5P 7m 9m", "suspended fourth flat ninth", "b9sus phryg 7b9sus 7b9sus4"], ["1P 5P", "fifth", "5"], ["1P 3M 5A", "augmented", "aug + +5 ^#5"], ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"], ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"], ["1P 3M 5P 7M 9M 11A", "major sharp eleventh (lydian)", "maj9#11 \u03949#11 ^9#11"], ["1P 2M 4P 5P", "", "sus24 sus4add9"], ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"], ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"], ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"], ["1P 3M 5A 7m 9M", "", "9#5 9+"], ["1P 3M 5A 7m 9M 11A", "", "9#5#11"], ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"], ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"], ["1P 3M 5A 9A", "", "+add#9"], ["1P 3M 5A 9M", "", "M#5add9 +add9"], ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"], ["1P 3M 5P 6M 7M 9M", "", "M7add13"], ["1P 3M 5P 6M 9M 11A", "", "69#11"], ["1P 3m 5P 6M 9M", "", "m69 -69"], ["1P 3M 5P 6m 7m", "", "7b6"], ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"], ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"], ["1P 3M 5P 7M 9m", "", "M7b9"], ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"], ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"], ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"], ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"], ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"], ["1P 3M 5P 7m 9A 13M", "", "13#9"], ["1P 3M 5P 7m 9A 13m", "", "7#9b13"], ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"], ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"], ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"], ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"], ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"], ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"], ["1P 3M 5P 7m 9m 13M", "", "13b9"], ["1P 3M 5P 7m 9m 13m", "", "7b9b13"], ["1P 3M 5P 7m 9m 9A", "", "7b9#9"], ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"], ["1P 3M 5P 9m", "", "Maddb9"], ["1P 3M 5d", "", "Mb5"], ["1P 3M 5d 6M 7m 9M", "", "13b5"], ["1P 3M 5d 7M", "", "M7b5"], ["1P 3M 5d 7M 9M", "", "M9b5"], ["1P 3M 5d 7m", "", "7b5"], ["1P 3M 5d 7m 9M", "", "9b5"], ["1P 3M 7m", "", "7no5"], ["1P 3M 7m 13m", "", "7b13"], ["1P 3M 7m 9M", "", "9no5"], ["1P 3M 7m 9M 13M", "", "13no5"], ["1P 3M 7m 9M 13m", "", "9b13"], ["1P 3m 4P 5P", "", "madd4"], ["1P 3m 5P 6m 7M", "", "mMaj7b6"], ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"], ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"], ["1P 3m 5P 9M", "", "madd9"], ["1P 3m 5d 6M 7M", "", "o7M7"], ["1P 3m 5d 7M", "", "oM7"], ["1P 3m 6m 7M", "", "mb6M7"], ["1P 3m 6m 7m", "", "m7#5"], ["1P 3m 6m 7m 9M", "", "m9#5"], ["1P 3m 5A 7m 9M 11P", "", "m11A"], ["1P 3m 6m 9m", "", "mb6b9"], ["1P 2M 3m 5d 7m", "", "m9b5"], ["1P 4P 5A 7M", "", "M7#5sus4"], ["1P 4P 5A 7M 9M", "", "M9#5sus4"], ["1P 4P 5A 7m", "", "7#5sus4"], ["1P 4P 5P 7M", "", "M7sus4"], ["1P 4P 5P 7M 9M", "", "M9sus4"], ["1P 4P 5P 7m 9M", "", "9sus4 9sus"], ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"], ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"], ["1P 4P 7m 10m", "", "4 quartal"], ["1P 5P 7m 9m 11P", "", "11b9"]]
  , ve = c1(R({}, v1), {
    name: "",
    quality: "Unknown",
    intervals: [],
    aliases: []
});
let R2 = []
  , q1 = {};
function Pe(a) {
    return q1[a] || ve
}
function N2() {
    return R2.slice()
}
function Ee(a, t, e) {
    const i = Ae(a)
      , s = c1(R({}, P1(a)), {
        name: e || "",
        quality: i,
        intervals: a,
        aliases: t
    });
    R2.push(s),
    s.name && (q1[s.name] = s),
    q1[s.setNum] = s,
    q1[s.chroma] = s,
    s.aliases.forEach(n=>Me(s, n))
}
function Me(a, t) {
    q1[t] = a
}
function Ae(a) {
    const t = e=>a.indexOf(e) !== -1;
    return t("5A") ? "Augmented" : t("3M") ? "Major" : t("5d") ? "Diminished" : t("3m") ? "Minor" : "Unknown"
}
Se.forEach(([a,t,e])=>Ee(a.split(" "), e.split(" "), t));
R2.sort((a,t)=>a.setNum - t.setNum);
const ke = a=>{
    const t = a.reduce((e,i)=>{
        const s = Q(i).chroma;
        return s !== void 0 && (e[s] = e[s] || Q(i).name),
        e
    }
    , {});
    return e=>t[e]
}
;
function Ce(a) {
    const t = a.map(i=>Q(i).pc).filter(i=>i);
    return Q.length === 0 ? [] : Re(t, 1).filter(i=>i.weight).sort((i,s)=>s.weight - i.weight).map(i=>i.name)
}
function Re(a, t) {
    const e = a[0]
      , i = Q(e).chroma
      , s = ke(a)
      , n = xe(a, !1)
      , o = [];
    return n.forEach((l,c)=>{
        N2().filter(u=>u.chroma === l).forEach(u=>{
            const b = u.aliases[0]
              , r = s(c);
            c !== i ? o.push({
                weight: .5 * t,
                name: `${r}${b}/${e}`
            }) : o.push({
                weight: 1 * t,
                name: `${r}${b}`
            })
        }
        )
    }
    ),
    o
}
const Ne = [["1P 2M 3M 5P 6M", "major pentatonic", "pentatonic"], ["1P 3M 4P 5P 7M", "ionian pentatonic"], ["1P 3M 4P 5P 7m", "mixolydian pentatonic", "indian"], ["1P 2M 4P 5P 6M", "ritusen"], ["1P 2M 4P 5P 7m", "egyptian"], ["1P 3M 4P 5d 7m", "neopolitan major pentatonic"], ["1P 3m 4P 5P 6m", "vietnamese 1"], ["1P 2m 3m 5P 6m", "pelog"], ["1P 2m 4P 5P 6m", "kumoijoshi"], ["1P 2M 3m 5P 6m", "hirajoshi"], ["1P 2m 4P 5d 7m", "iwato"], ["1P 2m 4P 5P 7m", "in-sen"], ["1P 3M 4A 5P 7M", "lydian pentatonic", "chinese"], ["1P 3m 4P 6m 7m", "malkos raga"], ["1P 3m 4P 5d 7m", "locrian pentatonic", "minor seven flat five pentatonic"], ["1P 3m 4P 5P 7m", "minor pentatonic", "vietnamese 2"], ["1P 3m 4P 5P 6M", "minor six pentatonic"], ["1P 2M 3m 5P 6M", "flat three pentatonic", "kumoi"], ["1P 2M 3M 5P 6m", "flat six pentatonic"], ["1P 2m 3M 5P 6M", "scriabin"], ["1P 3M 5d 6m 7m", "whole tone pentatonic"], ["1P 3M 4A 5A 7M", "lydian #5P pentatonic"], ["1P 3M 4A 5P 7m", "lydian dominant pentatonic"], ["1P 3m 4P 5P 7M", "minor #7M pentatonic"], ["1P 3m 4d 5d 7m", "super locrian pentatonic"], ["1P 2M 3m 4P 5P 7M", "minor hexatonic"], ["1P 2A 3M 5P 5A 7M", "augmented"], ["1P 2M 3m 3M 5P 6M", "major blues"], ["1P 2M 4P 5P 6M 7m", "piongio"], ["1P 2m 3M 4A 6M 7m", "prometheus neopolitan"], ["1P 2M 3M 4A 6M 7m", "prometheus"], ["1P 2m 3M 5d 6m 7m", "mystery #1"], ["1P 2m 3M 4P 5A 6M", "six tone symmetric"], ["1P 2M 3M 4A 5A 7m", "whole tone", "messiaen's mode #1"], ["1P 2m 4P 4A 5P 7M", "messiaen's mode #5"], ["1P 3m 4P 5d 5P 7m", "minor blues", "blues"], ["1P 2M 3M 4P 5d 6m 7m", "locrian major", "arabian"], ["1P 2m 3M 4A 5P 6m 7M", "double harmonic lydian"], ["1P 2M 3m 4P 5P 6m 7M", "harmonic minor"], ["1P 2m 2A 3M 4A 6m 7m", "altered", "super locrian", "diminished whole tone", "pomeroy"], ["1P 2M 3m 4P 5d 6m 7m", "locrian #2", "half-diminished", "aeolian b5"], ["1P 2M 3M 4P 5P 6m 7m", "mixolydian b6", "melodic minor fifth mode", "hindu"], ["1P 2M 3M 4A 5P 6M 7m", "lydian dominant", "lydian b7", "overtone"], ["1P 2M 3M 4A 5P 6M 7M", "lydian"], ["1P 2M 3M 4A 5A 6M 7M", "lydian augmented"], ["1P 2m 3m 4P 5P 6M 7m", "dorian b2", "phrygian #6", "melodic minor second mode"], ["1P 2M 3m 4P 5P 6M 7M", "melodic minor"], ["1P 2m 3m 4P 5d 6m 7m", "locrian"], ["1P 2m 3m 4d 5d 6m 7d", "ultralocrian", "superlocrian bb7", "superlocrian diminished"], ["1P 2m 3m 4P 5d 6M 7m", "locrian 6", "locrian natural 6", "locrian sharp 6"], ["1P 2A 3M 4P 5P 5A 7M", "augmented heptatonic"], ["1P 2M 3m 4A 5P 6M 7m", "dorian #4", "ukrainian dorian", "romanian minor", "altered dorian"], ["1P 2M 3m 4A 5P 6M 7M", "lydian diminished"], ["1P 2m 3m 4P 5P 6m 7m", "phrygian"], ["1P 2M 3M 4A 5A 7m 7M", "leading whole tone"], ["1P 2M 3M 4A 5P 6m 7m", "lydian minor"], ["1P 2m 3M 4P 5P 6m 7m", "phrygian dominant", "spanish", "phrygian major"], ["1P 2m 3m 4P 5P 6m 7M", "balinese"], ["1P 2m 3m 4P 5P 6M 7M", "neopolitan major"], ["1P 2M 3m 4P 5P 6m 7m", "aeolian", "minor"], ["1P 2M 3M 4P 5P 6m 7M", "harmonic major"], ["1P 2m 3M 4P 5P 6m 7M", "double harmonic major", "gypsy"], ["1P 2M 3m 4P 5P 6M 7m", "dorian"], ["1P 2M 3m 4A 5P 6m 7M", "hungarian minor"], ["1P 2A 3M 4A 5P 6M 7m", "hungarian major"], ["1P 2m 3M 4P 5d 6M 7m", "oriental"], ["1P 2m 3m 3M 4A 5P 7m", "flamenco"], ["1P 2m 3m 4A 5P 6m 7M", "todi raga"], ["1P 2M 3M 4P 5P 6M 7m", "mixolydian", "dominant"], ["1P 2m 3M 4P 5d 6m 7M", "persian"], ["1P 2M 3M 4P 5P 6M 7M", "major", "ionian"], ["1P 2m 3M 5d 6m 7m 7M", "enigmatic"], ["1P 2M 3M 4P 5A 6M 7M", "major augmented", "major #5", "ionian augmented", "ionian #5"], ["1P 2A 3M 4A 5P 6M 7M", "lydian #9"], ["1P 2m 2M 4P 4A 5P 6m 7M", "messiaen's mode #4"], ["1P 2m 3M 4P 4A 5P 6m 7M", "purvi raga"], ["1P 2m 3m 3M 4P 5P 6m 7m", "spanish heptatonic"], ["1P 2M 3M 4P 5P 6M 7m 7M", "bebop"], ["1P 2M 3m 3M 4P 5P 6M 7m", "bebop minor"], ["1P 2M 3M 4P 5P 5A 6M 7M", "bebop major"], ["1P 2m 3m 4P 5d 5P 6m 7m", "bebop locrian"], ["1P 2M 3m 4P 5P 6m 7m 7M", "minor bebop"], ["1P 2M 3m 4P 5d 6m 6M 7M", "diminished", "whole-half diminished"], ["1P 2M 3M 4P 5d 5P 6M 7M", "ichikosucho"], ["1P 2M 3m 4P 5P 6m 6M 7M", "minor six diminished"], ["1P 2m 3m 3M 4A 5P 6M 7m", "half-whole diminished", "dominant diminished", "messiaen's mode #2"], ["1P 3m 3M 4P 5P 6M 7m 7M", "kafi raga"], ["1P 2M 3M 4P 4A 5A 6A 7M", "messiaen's mode #6"], ["1P 2M 3m 3M 4P 5d 5P 6M 7m", "composite blues"], ["1P 2M 3m 3M 4A 5P 6m 7m 7M", "messiaen's mode #3"], ["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M", "messiaen's mode #7"], ["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M", "chromatic"]]
  , Be = c1(R({}, v1), {
    intervals: [],
    aliases: []
});
let k3 = []
  , Q1 = {};
function Fe(a) {
    return Q1[a] || Be
}
function Le() {
    return k3.slice()
}
function De(a, t, e=[]) {
    const i = c1(R({}, P1(a)), {
        name: t,
        intervals: a,
        aliases: e
    });
    return k3.push(i),
    Q1[i.name] = i,
    Q1[i.setNum] = i,
    Q1[i.chroma] = i,
    i.aliases.forEach(s=>Oe(i, s)),
    i
}
function Oe(a, t) {
    Q1[t] = a
}
Ne.forEach(([a,t,...e])=>De(a.split(" "), t, e));
const B2 = {
    empty: !0,
    name: "",
    symbol: "",
    root: "",
    rootDegree: 0,
    type: "",
    tonic: null,
    setNum: NaN,
    quality: "Unknown",
    chroma: "",
    normalized: "",
    aliases: [],
    notes: [],
    intervals: []
}
  , ze = /^(6|64|7|9|11|13)$/;
function F2(a) {
    const [t,e,i,s] = y3(a);
    return t === "" ? ["", a] : t === "A" && s === "ug" ? ["", "aug"] : !s && (i === "4" || i === "5") ? [t + e, i] : ze.test(i) ? [t + e, i + s] : [t + e + i, s]
}
function J1(a) {
    if (a === "")
        return B2;
    if (Array.isArray(a) && a.length === 2)
        return l2(a[1], a[0]);
    {
        const [t,e] = F2(a)
          , i = l2(e, t);
        return i.empty ? l2(a) : i
    }
}
function l2(a, t, e) {
    const i = Pe(a)
      , s = Q(t || "")
      , n = Q(e || "");
    if (i.empty || t && s.empty || e && n.empty)
        return B2;
    const o = ce(s.pc, n.pc)
      , l = i.intervals.indexOf(o) + 1;
    if (!n.empty && !l)
        return B2;
    const c = Array.from(i.intervals);
    for (let r = 1; r < l; r++) {
        const h = c[0][0]
          , m = c[0][1]
          , _ = parseInt(h, 10) + 7;
        c.push(`${_}${m}`),
        c.shift()
    }
    const d = s.empty ? [] : c.map(r=>K1(s, r));
    a = i.aliases.indexOf(a) !== -1 ? a : i.aliases[0];
    const u = `${s.empty ? "" : s.pc}${a}${n.empty || l <= 1 ? "" : "/" + n.pc}`
      , b = `${t ? s.pc + " " : ""}${i.name}${l > 1 && e ? " over " + n.pc : ""}`;
    return c1(R({}, i), {
        name: b,
        symbol: u,
        type: i.name,
        root: n.name,
        intervals: c,
        rootDegree: l,
        tonic: s.name,
        notes: d
    })
}
const Ie = Vt("Chord.chord", "Chord.get", J1);
function Ye(a, t) {
    const [e,i] = F2(a);
    return e ? K1(e, t) + i : a
}
function Ge(a) {
    const t = J1(a)
      , e = A3(t.chroma);
    return Le().filter(i=>e(i.chroma)).map(i=>i.name)
}
function Xe(a) {
    const t = J1(a)
      , e = A3(t.chroma);
    return N2().filter(i=>e(i.chroma)).map(i=>t.tonic + i.aliases[0])
}
function He(a) {
    const t = J1(a)
      , e = ge(t.chroma);
    return N2().filter(i=>e(i.chroma)).map(i=>t.tonic + i.aliases[0])
}
var y4 = {
    getChord: l2,
    get: J1,
    detect: Ce,
    chordScales: Ge,
    extended: Xe,
    reduced: He,
    tokenize: F2,
    transpose: Ye,
    chord: Ie
};
function C3(a) {
    return +a >= 0 && +a <= 127
}
function We(a) {
    if (C3(a))
        return +a;
    const t = Q(a);
    return t.empty ? null : t.midi
}
function Ue(a, t=440) {
    return Math.pow(2, (a - 69) / 12) * t
}
const Ve = Math.log(2)
  , $e = Math.log(440);
function L2(a) {
    const t = 12 * (Math.log(a) - $e) / Ve + 69;
    return Math.round(t * 100) / 100
}
const je = "C C# D D# E F F# G G# A A# B".split(" ")
  , Ke = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
function E1(a, t={}) {
    if (isNaN(a) || a === -1 / 0 || a === 1 / 0)
        return "";
    a = Math.round(a);
    const i = (t.sharps === !0 ? je : Ke)[a % 12];
    if (t.pitchClass)
        return i;
    const s = Math.floor(a / 12) - 1;
    return i + s
}
var w4 = {
    isMidi: C3,
    toMidi: We,
    midiToFreq: Ue,
    midiToNoteName: E1,
    freqToMidi: L2
};
const qe = ["C", "D", "E", "F", "G", "A", "B"]
  , R3 = a=>a.name
  , N3 = a=>a.map(Q).filter(t=>!t.empty);
function Qe(a) {
    return a === void 0 ? qe.slice() : Array.isArray(a) ? N3(a).map(R3) : []
}
const n1 = Q
  , Je = a=>n1(a).name
  , Ze = a=>n1(a).pc
  , t4 = a=>n1(a).acc
  , e4 = a=>n1(a).oct
  , i4 = a=>n1(a).midi
  , s4 = a=>n1(a).freq
  , n4 = a=>n1(a).chroma;
function b4(a) {
    return E1(a)
}
function o4(a) {
    return E1(L2(a))
}
function r4(a) {
    return E1(L2(a), {
        sharps: !0
    })
}
function a4(a) {
    return E1(a, {
        sharps: !0
    })
}
const D2 = K1
  , l4 = K1
  , B3 = a=>t=>D2(t, a)
  , h4 = B3
  , F3 = a=>t=>D2(a, t)
  , c4 = F3;
function L3(a, t) {
    const e = n1(a);
    if (e.empty)
        return "";
    const [i,s] = e.coord;
    return M2(s === void 0 ? [i + t] : [i + t, s]).name
}
const d4 = L3
  , O2 = (a,t)=>a.height - t.height
  , m4 = (a,t)=>t.height - a.height;
function D3(a, t) {
    return t = t || O2,
    N3(a).sort(t).map(R3)
}
function u4(a) {
    return D3(a, O2).filter((t,e,i)=>e === 0 || t !== i[e - 1])
}
const f4 = a=>{
    const t = n1(a);
    return t.empty ? "" : E1(t.midi || t.chroma, {
        sharps: t.alt > 0,
        pitchClass: t.midi === null
    })
}
;
function _4(a, t) {
    const e = n1(a);
    if (e.empty)
        return "";
    const i = n1(t || E1(e.midi || e.chroma, {
        sharps: e.alt < 0,
        pitchClass: !0
    }));
    if (i.empty || i.chroma !== e.chroma)
        return "";
    if (e.oct === void 0)
        return i.pc;
    const s = e.chroma - e.alt
      , n = i.chroma - i.alt
      , o = s > 11 || n < 0 ? -1 : s < 0 || n > 11 ? 1 : 0
      , l = e.oct + o;
    return i.pc + l
}
var T4 = {
    names: Qe,
    get: n1,
    name: Je,
    pitchClass: Ze,
    accidentals: t4,
    octave: e4,
    midi: i4,
    ascending: O2,
    descending: m4,
    sortedNames: D3,
    sortedUniqNames: u4,
    fromMidi: b4,
    fromMidiSharps: a4,
    freq: s4,
    fromFreq: o4,
    fromFreqSharps: r4,
    chroma: n4,
    transpose: D2,
    tr: l4,
    transposeBy: B3,
    trBy: h4,
    transposeFrom: F3,
    trFrom: c4,
    transposeFifths: L3,
    trFifths: d4,
    simplify: f4,
    enharmonic: _4
};
Object.freeze([]);
const z2 = [[0, 2773, 0, "ionian", "", "Maj7", "major"], [1, 2902, 2, "dorian", "m", "m7"], [2, 3418, 4, "phrygian", "m", "m7"], [3, 2741, -1, "lydian", "", "Maj7"], [4, 2774, 1, "mixolydian", "", "7"], [5, 2906, 3, "aeolian", "m", "m7", "minor"], [6, 3434, 5, "locrian", "dim", "m7b5"]]
  , O3 = c1(R({}, v1), {
    name: "",
    alt: 0,
    modeNum: NaN,
    triad: "",
    seventh: "",
    aliases: []
})
  , p4 = z2.map(x4)
  , I2 = {};
p4.forEach(a=>{
    I2[a.name] = a,
    a.aliases.forEach(t=>{
        I2[t] = a
    }
    )
}
);
function z3(a) {
    return typeof a == "string" ? I2[a.toLowerCase()] || O3 : a && a.name ? z3(a.name) : O3
}
function x4(a) {
    const [t,e,i,s,n,o,l] = a
      , c = l ? [l] : []
      , d = Number(e).toString(2)
      , u = Fe(s).intervals;
    return {
        empty: !1,
        intervals: u,
        modeNum: t,
        chroma: d,
        normalized: d,
        name: s,
        setNum: e,
        alt: i,
        triad: n,
        seventh: o,
        aliases: c
    }
}
function I3(a) {
    return (t,e)=>{
        const i = z3(t);
        if (i.empty)
            return [];
        const s = C2(i.modeNum, a)
          , n = i.intervals.map(o=>K1(e, o));
        return s.map((o,l)=>n[l] + o)
    }
}
I3(z2.map(a=>a[4]));
I3(z2.map(a=>a[5]));
export {f as V, y4 as a, w4 as b, Ut as h, T4 as i};
