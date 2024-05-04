import {V as A, i as T, a as V, b as U, h as D} from "./preload.js";
const Y = function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload"))
        return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]'))
        s(o);
    new MutationObserver(o=>{
        for (const a of o)
            if (a.type === "childList")
                for (const d of a.addedNodes)
                    d.tagName === "LINK" && d.rel === "modulepreload" && s(d)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function n(o) {
        const a = {};
        return o.integrity && (a.integrity = o.integrity),
        o.referrerpolicy && (a.referrerPolicy = o.referrerpolicy),
        o.crossorigin === "use-credentials" ? a.credentials = "include" : o.crossorigin === "anonymous" ? a.credentials = "omit" : a.credentials = "same-origin",
        a
    }
    function s(o) {
        if (o.ep)
            return;
        o.ep = !0;
        const a = n(o);
        fetch(o.href, a)
    }
};

document.getElementById('load-chords-xml-btn').addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.xml';
    input.onchange = () => {
      const file = input.files[0];
      // Handle the selected XML file here
      console.log(file);
    };
    input.click();
  });
  
Y();
const I = {
    src: ["./mf.mp3"],
    onloaderror(e) {
        console.log(e)
    },
    onplayerror(e) {
        console.log(e)
    },
    sprite: {
        "21": [3.8794e5, 31010],
        "22": [8.1865e5, 33780],
        "23": [1.2561e6, 35530],
        "24": [1.03724e6, 45740],
        "25": [1.68626e6, 43180],
        "26": [1.47911e6, 43680],
        "27": [1.90639e6, 46470],
        "28": [2.3063e6, 62510],
        "29": [2.10283e6, 56530],
        "30": [191660, 54470],
        "31": [0, 54990],
        "32": [619050, 55610],
        "33": [418950, 52870],
        "34": [852430, 50810],
        "35": [1.29162e6, 72880],
        "36": [1.08298e6, 55590],
        "37": [1.72944e6, 54960],
        "38": [1.52278e6, 51620],
        "39": [1.95286e6, 51250],
        "40": [2.36881e6, 42870],
        "41": [2.15936e6, 40050],
        "42": [246130, 42870],
        "43": [54990, 38870],
        "44": [674660, 42790],
        "45": [471820, 46160],
        "46": [903240, 40830],
        "47": [1.36451e6, 40100],
        "48": [1.13857e6, 43470],
        "49": [1.7844e6, 43180],
        "50": [1.5744e6, 33590],
        "51": [2.00411e6, 32630],
        "52": [2.41168e6, 37720],
        "53": [2.19941e6, 33930],
        "54": [288990, 38240],
        "55": [93860, 31820],
        "56": [717450, 35400],
        "57": [517980, 35130],
        "58": [944070, 30620],
        "59": [1.4046e6, 29050],
        "60": [1.18204e6, 29100],
        "61": [1.82758e6, 29340],
        "62": [1.60799e6, 28890],
        "63": [2.03674e6, 27430],
        "64": [2.4494e6, 24290],
        "65": [2.23334e6, 31060],
        "66": [327240, 25630],
        "67": [125680, 29780],
        "68": [752850, 25520],
        "69": [553120, 33720],
        "70": [974680, 24290],
        "71": [1.43365e6, 21260],
        "72": [1.21114e6, 21860],
        "73": [1.85691e6, 26750],
        "74": [1.63688e6, 25730],
        "75": [2.06417e6, 17760],
        "76": [2.47369e6, 18440],
        "77": [2.2644e6, 19170],
        "78": [352860, 14680],
        "79": [155450, 15440],
        "80": [778370, 18210],
        "81": [586840, 12250],
        "82": [998970, 16850],
        "83": [1.45492e6, 14630],
        "84": [1.23301e6, 14840],
        "85": [1.88366e6, 14730],
        "86": [1.66262e6, 13820],
        "87": [2.08193e6, 12430],
        "88": [2.49213e6, 13790],
        "89": [2.28357e6, 13950],
        "90": [367540, 11890],
        "91": [170890, 13040],
        "92": [796580, 14730],
        "93": [599090, 12150],
        "94": [1015820, 10450],
        "95": [1.46954e6, 9560],
        "96": [1.24784e6, 8250],
        "97": [1.8984e6, 7990],
        "98": [1.67643e6, 9820],
        "99": [2.09437e6, 8460],
        "100": [2.29752e6, 8780],
        "101": [379430, 8520],
        "102": [183930, 7730],
        "103": [811310, 7340],
        "104": [611240, 7810],
        "105": [1026270, 10970]
    }
}
  , $ = {
    src: ["./mf.mp3"],
    sprite: {
        "21": [27e3, 14860.770975056688],
        "22": [43e3, 14860.770975056688],
        "23": [59e3, 14860.770975056696],
        "24": [75e3, 14860.770975056696],
        "25": [91e3, 14860.770975056696],
        "26": [107e3, 14860.770975056696],
        "27": [123e3, 14860.770975056681],
        "28": [139e3, 14860.770975056681],
        "29": [155e3, 14860.770975056681],
        "30": [171e3, 14860.770975056681],
        "31": [187e3, 14860.770975056681],
        "32": [203e3, 14860.770975056681],
        "33": [219e3, 14860.770975056681],
        "34": [235e3, 14860.770975056681],
        "35": [251e3, 14860.77097505671],
        "36": [267e3, 14860.77097505671],
        "37": [283e3, 14117.73242630386],
        "38": [299e3, 14860.77097505671],
        "39": [315e3, 14860.77097505671],
        "40": [331e3, 14860.77097505671],
        "41": [347e3, 14860.77097505671],
        "42": [363e3, 14117.73242630386],
        "43": [379e3, 14117.73242630386],
        "44": [395e3, 14117.73242630386],
        "45": [411e3, 14117.73242630386],
        "46": [427e3, 14117.73242630386],
        "47": [443e3, 14117.73242630386],
        "48": [459e3, 14117.73242630386],
        "49": [475e3, 14117.73242630386],
        "50": [491e3, 14117.73242630386],
        "51": [507e3, 14117.73242630386],
        "52": [523e3, 14117.73242630386],
        "53": [539e3, 12631.65532879816],
        "54": [553e3, 14117.73242630386],
        "55": [569e3, 14117.73242630386],
        "56": [585e3, 14117.73242630386],
        "57": [601e3, 14117.73242630386],
        "58": [617e3, 14117.73242630386],
        "59": [633e3, 12631.65532879816],
        "60": [647e3, 11145.57823129246],
        "61": [66e4, 11145.57823129246],
        "62": [673e3, 11145.57823129246],
        "63": [686e3, 8916.462585033969],
        "64": [696e3, 8173.424036281176],
        "65": [706e3, 9659.501133786875],
        "66": [717e3, 10402.539682539667],
        "67": [729e3, 11145.57823129246],
        "68": [742e3, 10402.539682539667],
        "69": [754e3, 10402.539682539667],
        "70": [766e3, 11145.57823129246],
        "71": [779e3, 10402.539682539667],
        "72": [791e3, 9659.501133786875],
        "73": [802e3, 8916.462585033969],
        "74": [812e3, 8916.462585033969],
        "75": [822e3, 8173.424036281176],
        "76": [832e3, 8173.424036281176],
        "77": [842e3, 8173.424036281176],
        "78": [852e3, 7430.385487528383],
        "79": [861e3, 6687.346938775477],
        "80": [869e3, 6687.346938775477],
        "81": [877e3, 6687.346938775477],
        "82": [885e3, 6687.346938775477],
        "83": [893e3, 5944.308390022684],
        "84": [9e5, 5944.308390022684],
        "85": [907e3, 5201.269841269891],
        "86": [914e3, 5201.269841269891],
        "87": [921e3, 4458.2312925169845],
        "88": [927e3, 4458.2312925169845],
        "89": [933e3, 3715.1927437641916],
        "90": [938e3, 3715.1927437641916],
        "91": [943e3, 2972.154195011285],
        "92": [947e3, 2972.154195011285],
        "93": [951e3, 2972.154195011285],
        "94": [955e3, 2972.154195011285],
        "95": [959e3, 2229.1156462584922],
        "96": [963e3, 2229.1156462584922],
        "97": [967e3, 2229.1156462584922],
        "98": [971e3, 2229.1156462584922],
        "99": [975e3, 2229.1156462584922],
        "100": [0, 1486.077097505669],
        "101": [3e3, 1486.0770975056691],
        "102": [6e3, 1486.0770975056691],
        "103": [9e3, 1486.0770975056691],
        "104": [12e3, 1486.0770975056691],
        "105": [15e3, 1486.0770975056673],
        "106": [18e3, 1486.0770975056673],
        "107": [21e3, 1486.0770975056673],
        "108": [24e3, 1486.0770975056673]
    }
}
  , b = 80
  , C = b / 2
  , F = 400
  , N = ["C", "D", "E", "F", "G", "A", "B"]
  , Z = ["C", "D", "F", "G", "A"]
  , e0 = ["D", "E", "G", "A", "B"]
  , E = {
    setupPiano(e) {
        const t = document.querySelector("#piano");
        t.textContent = "";
        const n = this.getAllNaturalNotes(e)
          , s = n.length * b
          , o = this.createMainSVG(s, F);
        let a = 0;
        n.forEach(f=>{
            const l = i.createSVGElement("g")
              , r = this.createKey({
                className: "white-key",
                width: b,
                height: F
            })
              , c = i.createSVGElement("text");
            i.addTextContent(c, f),
            i.setAttributes(l, {
                width: b
            }),
            i.setAttributes(c, {
                x: a + C,
                y: 380,
                "text-anchor": "middle"
            }),
            i.setAttributes(r, {
                x: a,
                "data-note-name": f,
                rx: "15",
                ry: "15"
            }),
            c.classList.add("white-key-text"),
            l.appendChild(r),
            l.appendChild(c),
            o.appendChild(l),
            a += b
        }
        );
        let d = 60;
        n.forEach((f,l,r)=>{
            if (l === r.length - 1)
                return;
            const c = i.createSVGElement("g")
              , h = this.createKey({
                className: "black-key",
                width: C,
                height: F / 1.6
            })
              , u = i.createSVGElement("text")
              , v = i.createSVGElement("text");
            i.setAttributes(c, {
                width: C
            }),
            Z.forEach((g,Q)=>{
                let P = e0[Q];
                g === f[0] && (i.setAttributes(h, {
                    x: d,
                    "data-sharp-name": `${g}#${f[1]}`,
                    "data-flat-name": `${P}b${f[1]}`,
                    rx: "8",
                    ry: "8"
                }),
                i.setAttributes(v, {
                    "text-anchor": "middle",
                    y: 215,
                    x: d + C / 2
                }),
                i.setAttributes(u, {
                    "text-anchor": "middle",
                    y: 235,
                    x: d + C / 2
                }),
                i.addTextContent(v, `${g}\u266F`),
                i.addTextContent(u, `${P}\u266D`),
                u.classList.add("black-key-text"),
                v.classList.add("black-key-text"),
                g === "D" || g === "A" ? d += b * 2 : d += b,
                c.appendChild(h),
                c.appendChild(u),
                c.appendChild(v))
            }
            ),
            o.appendChild(c)
        }
        ),
        t.appendChild(o)
    },
    getAllNaturalNotes([e,t]) {
        const n = e[0]
          , s = parseInt(e[1])
          , o = t[0]
          , a = parseInt(t[1])
          , d = N.indexOf(n)
          , f = N.indexOf(o);
        let l = [];
        for (let r = s; r <= a; r++)
            r === s ? N.slice(d).forEach(c=>{
                l.push(c + r)
            }
            ) : r === a ? N.slice(0, f + 1).forEach(c=>{
                l.push(c + r)
            }
            ) : N.forEach(c=>{
                l.push(c + r)
            }
            );
        return l
    },
    createMainSVG(e, t) {
        const n = i.createSVGElement("svg");
        return i.setAttributes(n, {
            width: "100%",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            viewBox: `0 0 ${e} ${t}`
        }),
        n
    },
    createKey({className: e, width: t, height: n}) {
        const s = i.createSVGElement("rect");
        return s.classList.add(e, "note"),
        i.setAttributes(s, {
            width: t,
            height: n
        }),
        s
    },
    displayNotes(e) {
        const t = document.querySelectorAll(".note");
        i.removeClassFromNodeCollection(t, "show"),
        e.forEach(n=>{
            t.forEach(s=>{
                const o = s.dataset.noteName
                  , a = s.dataset.sharpName
                  , d = s.dataset.flatName;
                (o === n || a === n || d === n) && s.classList.add("show")
            }
            )
        }
        )
    }
}
  , i = {
    createSVGElement(e) {
        return document.createElementNS("http://www.w3.org/2000/svg", e)
    },
    setAttributes(e, t) {
        for (let n in t)
            e.setAttribute(n, t[n])
    },
    addTextContent(e, t) {
        e.textContent = t
    },
    removeClassFromNodeCollection(e, t) {
        e.forEach(n=>{
            n.classList.contains(t) && n.classList.remove(t)
        }
        )
    },
    cleanNoteName(e) {}
}
  , w = {
    accidentals: "auto",
    cleffSystem: "grand",
    selectedSound: "piano"
}
  , M = document.querySelector(".staff")
  , p = A.Flow;
let G, m, y, S;
function q() {
    if (M.textContent = "",
    G = new p.Renderer(M,p.Renderer.Backends.SVG),
    G.resize(200, 500),
    m = G.getContext(),
    m.scale(1.2, 1.2),
    w.cleffSystem === "grand") {
        y = new p.Stave(20,90,120),
        y.addClef("treble"),
        y.setContext(m).draw(),
        S = new p.Stave(20,200,120),
        S.addClef("bass"),
        S.setContext(m).draw();
        const e = new A.Flow.StaveConnector(y,S).setType(3)
          , t = new A.Flow.StaveConnector(y,S).setType(1)
          , n = new A.Flow.StaveConnector(y,S).setType(6);
        e.setContext(m).draw(),
        t.setContext(m).draw(),
        n.setContext(m).draw()
    } else
        y = new p.Stave(10,160,120),
        y.addClef(w.cleffSystem),
        y.setContext(m).draw()
}
function t0(e) {
    if (q(),
    !e.length) {
        E.displayNotes([]);
        return
    }
    E.displayNotes(e);
    const t = e.map(f=>`${f[0]}/${f[f.length - 1]}`);
    let n, s, o, a, d;
    if (w.cleffSystem === "grand") {
        const f = t.filter(h=>{
            if (parseInt(h.substr(h.length - 1)) >= 4)
                return h
        }
        )
          , l = t.filter(h=>{
            if (parseInt(h.substr(h.length - 1)) < 4)
                return h
        }
        )
          , r = new p.Voice({
            num_beats: 4,
            beat_value: 4
        })
          , c = new p.Voice({
            num_beats: 4,
            beat_value: 4
        });
        f.length && (s = new p.StaveNote({
            clef: "treble",
            keys: f,
            duration: "w"
        }),
        e.filter(u=>{
            if (parseInt(u.substr(u.length - 1)) >= 4)
                return u
        }
        ).forEach((u,v)=>{
            if (u.length > 2) {
                let g = u[1];
                s = s.addAccidental(v, new p.Accidental(g))
            }
        }
        ),
        a = [s],
        r.addTickables(a),
        new p.Formatter().joinVoices([r]).format([r], 120)),
        l.length && (o = new p.StaveNote({
            clef: "bass",
            keys: l,
            duration: "w"
        }),
        e.filter(u=>{
            if (parseInt(u.substr(u.length - 1)) < 4)
                return u
        }
        ).forEach((u,v)=>{
            if (u.length > 2) {
                let g = u[1];
                o = o.addAccidental(v, new p.Accidental(g))
            }
        }
        ),
        d = [o],
        c.addTickables(d),
        new p.Formatter().joinVoices([c]).format([c], 120)),
        r.draw(m, y),
        c.draw(m, S)
    } else {
        n = new p.StaveNote({
            clef: w.cleffSystem,
            keys: t,
            duration: "w"
        }),
        e.forEach((r,c)=>{
            if (r.length > 2) {
                let h = r[1];
                n = n.addAccidental(c, new p.Accidental(h))
            }
        }
        );
        const f = [n]
          , l = new p.Voice({
            num_beats: 4,
            beat_value: 4
        });
        l.addTickables(f),
        new p.Formatter().joinVoices([l]).format([l], 120),
        l.draw(m, y)
    }
    E.displayNotes(e)
}
const n0 = document.querySelector(".note-names")
  , j = document.querySelector(".main-chord")
  , _ = document.querySelector(".other-chords");
function B() {
    x.sort();
    let e;
    if (w.accidentals === "auto") {
        console.log("Auto accidentals");
        const n = x.map(T.fromMidi)
          , s = V.detect(n)[0]
          , o = V.get(s).notes;
        e = n.map(a=>{
            const d = T.pitchClass(a);
            return o.includes(d) ? a : T.enharmonic(a)
        }
        )
    } else
        e = x.map(n=>U.midiToNoteName(n, {
            pitchClass: !1,
            sharps: w.accidentals === "#"
        }));
    const t = V.detect(e);
    n0.innerText = e.join(" - "),
    t.length ? (j.innerText = t[0],
    _.innerText = t.slice(1).join(" - ")) : (j.innerText = "",
    _.innerText = ""),
    console.log(e),
    t0(e)
}
const H = document.querySelector(".spinner-div");
function R() {
    H.style.display = "none"
}
function W() {
    H.style.display = "flex"
}
W();
I.onload = ()=>{
    R()
}
;
$.onload = ()=>{
    R()
}
;
let K = new D.Howl(I);
function z(e) {
    W(),
    K = new D.Howl(e)
}
const s0 = document.querySelector(".message")
  , x = []
  , k = {};
function X(e, t) {
    s0.style.display = "none",
    t = t || 127;
    const n = o0(t)
      , s = K.play(e.toString());
    K.volume(n, s),
    k[e.toString()] = {
        id: s,
        volume: n
    },
    x.push(e),
    w.selectedSound === "sound-off" && K.mute(!0),
    B()
}
function O(e) {
    const t = k[e].id
      , n = k[e].volume;
    K.fade(n, 0, 100, t),
    delete k[e.toString()];
    const s = x.indexOf(e);
    s > -1 && x.splice(s, 1),
    B()
}
function o0(e) {
    return e / 127
}
function a0(e) {
    e.addEventListener("statechange", i0);
    const t = e.inputs;
    console.log(t),
    t.forEach(n=>{
        n.addEventListener("midimessage", r0)
    }
    )
}
function c0() {
    console.log("Could not connect MIDI")
}
function r0(e) {
    const t = e.data[0]
      , n = e.data[1]
      , s = e.data[2];
    switch (t) {
    case 144:
        s > 0 ? X(n, s) : O(n);
        break;
    case 128:
        O(n);
        break
    }
}
function i0(e) {
    console.log(e)
}
const L = e=>({
    KeyA: 60,
    KeyW: 61,
    KeyS: 62,
    KeyE: 63,
    KeyD: 64,
    KeyF: 65,
    KeyT: 66,
    KeyG: 67,
    KeyY: 68,
    KeyH: 69,
    KeyU: 70,
    KeyJ: 71,
    KeyK: 72,
    KeyO: 73,
    KeyL: 74,
    KeyP: 75,
    Semicolon: 76,
    Quote: 77,
    BracketRight: 78
})[e]
  , J = {
    "88": ["A0", "C8"],
    "76": ["E0", "G6"],
    "61": ["C1", "C6"],
    "49": ["C1", "C5"]
}
  , l0 = document.querySelector("#piano-size")
  , d0 = document.querySelector("#cleff")
  , u0 = document.querySelector("#accidentals")
  , f0 = document.querySelector("#sound")
  , p0 = document.querySelector(".popup")
  , h0 = document.querySelector(".close-popup");
h0.addEventListener("click", ()=>{
    p0.style.display = "none"
}
);
navigator.requestMIDIAccess && navigator.requestMIDIAccess().then(a0, c0);
f0.addEventListener("change", e=>{
    switch (w.selectedSound = e.target.value) {
    case "e-piano":
        z($);
        break;
    case "piano":
        z(I);
        break
    }
}
);
l0.addEventListener("change", e=>{
    E.setupPiano(J[e.target.value])
}
);
d0.addEventListener("change", e=>{
    w.cleffSystem = e.target.value,
    q()
}
);
u0.addEventListener("change", e=>{
    w.accidentals = e.target.value
}
);
document.addEventListener("keydown", e=>{
    L(e.code) && !e.repeat && X(L(e.code))
}
);
document.addEventListener("keyup", e=>{
    L(e.code) && O(L(e.code))
}
);
q();
E.setupPiano(J["88"]);
