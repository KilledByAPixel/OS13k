/* copy & paste from here; we need to tell terser to mangle global variables
var lastnow, level, life, playerx, playerxdirinv, slowuntil, multiuntil, graceuntil;
var keydown, objs, newobjs, harpoons;
var reset, drawtext, drawobj, tick, style;
var elapsed, objelapsed, harpoonshot;
var i, j, k; // short-lived temporary variables
//*/

t || (
    // we can put anything to the first few elements
    keydown = [
        onkeydown = onkeyup = e => keydown[e.which] = e.type[6] && lastnow,

        lastnow =
        level =
        life =
        playerxdirinv =
        slowuntil =
        multiuntil =
        graceuntil = 0,

        // all coordinates (including object sizes) are scaled by 10 to get simpler numbers,
        // except for `sz` argument of drawtext which should be scaled by the caller
        playerx = 32,

        objs = [],
        harpoons = []
    ]
);

// fillorxdir is either fillStyle (texts, harpoons) or -1/+1 x direction (objects, player)
// textfilter is optional
drawtext = (left, top, fillorxdir, sz, text, textfilter) =>
    x.setTransform(
        fillorxdir > 0 ? -10 : 10, 0, 0, 10, fillorxdir > 0 ? left * 20 : 0, 0,
        // stray arguments for parentheses-free exprs
        x.font = sz + "px a",
        x.filter = textfilter || "none",
        x.fillStyle = fillorxdir) |
    x.fillText(text, left, top);

// our collision check is primitive, so we need to ensure the minimum frame rate
elapsed = t - lastnow < .1 ? t - lastnow : .1;
harpoonshot = keydown[32] == lastnow;
lastnow = t;

playerxdirinv = !keydown[39] - !keydown[37]; // -1 (right), 0 or 1 (left)

if (level || playerxdirinv || harpoonshot) {
    for (
        // if all remaining objects are bonuses (or none), increase and rebuild the level
        k = objs.every(obj => obj[5]) &&
            // k%5 encodes kind, k%11 encodes count+1.
            // this encoding is always possible due to Chinese (Sun-tzu) remainder theorem.
            // if there are more kind-count pairs k is shifted right by 6 bits.
            // (note that this does change mod 4/11, encoder accounts for this)
            /*
            [[0,2], [1,2], [0,3,2,2], [2,4], [1,5,3,2], [3,3], [0,10]].map(([a,b,c,d], level) => {
                // level is read twice, once unmodified, later increased. account for the latter.
                if (level < 6) ++a, ++c;
                for (let i = 1; i < 5*11*64; ++i) {
                    if (i%5==a && i%11==b && (d ? (i>>6)%5==c && (i>>6)%11==d : (i>>6)==0 || (i>>6)%11==0)) return i;
                    // if there are two entries, also try the other order
                    if (d && i%5==c && i%11==d && (i>>6)%5==a && (i>>6)%11==b) return i;
                }
            })
            */
            [46,2,861,48,1567,14,10][level++ % 7];
        k;
        k >>= 6
    )
        for (i = k % 11 - 1; i; objs.push([
            64 * i-- / (k % 11),
            j = k % 5 + level / 7 | 0,
            10,
            j,
            0
        ]));

    playerx = Math.min(Math.max(playerx - playerxdirinv * 30 * elapsed, 2), 62);

    // shot harpoon if no other harpoon exists or multi is enabled
    harpoonshot && (!harpoons[0] || t < multiuntil) &&
        // playerxdirinv > 0 (left): playerx + 1
        // playerxdirinv <= 0 (right or idle): playerx - 1
        // drawobj only inverts when playerxdivinv > 0, so this is consistent to render
        harpoons.push([playerx - (-playerxdirinv | 1), 41]);

    objelapsed = t < slowuntil ? elapsed * .3 : elapsed;
    newobjs = [];
    objs.map(([x, y, vx, sz, vy, kind]) => (
        vy += 60 * objelapsed,

        // 1. for ordinary objs, collision check against harpoons
        !kind &&
        harpoons.some(harpoon =>
            // harpoon == [hx, htop] & {u: used}
            !harpoon.u &&
            y > harpoon[1] &&
            x - sz + (vx < 0) * vx * objelapsed < harpoon[0] &&
            x + sz + (vx > 0) * vx * objelapsed > harpoon[0] && (
                // now this object is gone, can modify any local var as wanted
                // possible postprocessing: rename vx to match the outer scope
                --sz && [vx, -vx].map(vx => newobjs.push([x, y, vx, sz, -35])),
                i = Math.random() * 30,
                // always set to non-zero because Array.push returns this.length
                // there is a extremely small chance of i == 3, we ignore that
                // this is also a return value for harpoons.some
                harpoon.u = i > 3 || newobjs.push([x, y, vx, 1, vy, -~i])))

    ) ||

    // 1 1/2. all objects hit the ceiling disappear
    y < sz ||

    (

        // 2. collision check against player, if harpoons did not hit the obj
        // (marked as "<return>" is a return value for deletecur)
        Math.hypot(x - playerx, y - 39) < sz + 2 && (
            // a bonus object
            kind ?
                // possible postprocessing: eval(" ABC"[x%5]+"=t+10")
                (
                    kind %= 5,
                    // <return>
                    --kind ? // kind != 1
                        --kind ? // kind != 1 or 2
                            slowuntil = t + 10 : // kind == 3
                            multiuntil = t + 10 : // kind == 2
                        life = 1 // kind == 1
                    // </return>
                )
            :
            // an ordinary object, either life is reset (to falsy) or game is over
            life = life ?
                !(graceuntil = t + 1) : // graceuntil is always positive
                t > graceuntil && (
                    c.style.filter = "invert\(1",
                    // tick function is now changed, so the screen should stuck
                    u = _ => 0,
                    // results in "ReferenceError: Game is not defined" error :-)
                    Game
                )
        )

    ) || (

        // 3. move surviving objects
        x += vx * objelapsed,
        vx =
            x < sz ? (x = sz, -vx) :
            x > 64 - sz ? (x = 64 - sz, -vx) :
            vx,

        y += vy * objelapsed,
        // check against ground; this is `kind += false` or `kind += 10`
        // if kind is undefined or NaN, kind becomes NaN, which is falsy thus okay
        kind +=
            y > 41 - sz && (
                y = 41 - sz,
                vy = -Math.min(sz * 10 + 15, 50),
                10),

        // also works when kind is undefined or NaN
        kind > 50 || newobjs.push([x, y, vx, sz, vy, kind])

    ));
    objs = newobjs;

    harpoons = harpoons.filter(
        harpoon => !harpoon.u && (harpoon[1] -= 40 * elapsed) > -.4);
}

c.width = 640;
c.height = 480;

x.textAlign = "center";
x.textBaseline = "middle";
drawtext(32, 24, "#fff", "900 10", level || 1, "blur\(3px");

c.style.background = `linear-gradient(0,#ada996 ${Math.abs(S(t))*5}%,#f7e6d6 13.8%,#bbd2d8 13.8%,#66deff 15%,#57f3ff ${30+C(t)*5}%,#01a4c9 ${80+C(t)*10}%`;
objs.map(([x, y, vx, sz, , kind]) =>
    drawtext(x, y, vx, sz * 2,
        // sz + ~kind == sz - (kind || 0) - 1
        [..."⏰⭐💝🦐🐡🐠🐟🐙🦑🐬🐳🐋🦈"][(sz + ~kind) % 10 + 3]));
harpoons.map(([left, top]) =>
    drawtext(left, top, "#c09e3f", .8, "🔱") |
    // drawtext always fixes filter (unset) and transform (flipped at x) at this point
    x.fillRect(.1 + left, top, .2, 41.4 - top));
drawtext(
    playerx, 40, playerxdirinv, 4, "🧜🏽‍♂️",
    (life ? "drop-shadow(0 0 10px #fff) drop-shadow(2px 2px 2px #fff)" : "") +
        (lastnow < multiuntil ? " drop-shadow\(2px 4px 6px orange" : ""));