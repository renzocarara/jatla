// I've managed to get Modernizr working with NUXT this way:

// 1. I went to the download section of their web - https://modernizr.com/download
// 2. I selected all the items I wanted Modernizr to test and then proceeded to download the Command Line Config file (modernizr-config.json)
// 3. >npm i -g modernizr
// 4. >modernizr -c modernizr-config.json
// 5. I took all the code from the newly generated modernizr.js file
// 6. I created modernizr-plugin.js file in my plugins folder and pasted the code there.
// 7. nuxt.config.js - I imported the modernizr-plugin.js here like every other plugin in NUXT. Docs for this: https://nuxtjs.org/api/configuration-plugins
// My modernizr-plugin.js file looks like this:
// /* eslint-disable */
// if (process.browser) {
//   // pasted code here...
// }

/* eslint-disable */
if (process.browser) {
  /*! modernizr 3.11.3 (Custom Build) | MIT *
   * https://modernizr.com/download/?-localstorage !*/
  !(function(n, e, o, t) {
    function s(n, e) {
      return typeof n === e;
    }
    var a = [],
      i = {
        _version: "3.11.3",
        _config: {
          classPrefix: "",
          enableClasses: !0,
          enableJSClass: !0,
          usePrefixes: !0
        },
        _q: [],
        on: function(n, e) {
          var o = this;
          setTimeout(function() {
            e(o[n]);
          }, 0);
        },
        addTest: function(n, e, o) {
          a.push({ name: n, fn: e, options: o });
        },
        addAsyncTest: function(n) {
          a.push({ name: null, fn: n });
        }
      },
      Modernizr = function() {};
    (Modernizr.prototype = i), (Modernizr = new Modernizr());
    var r = [];
    Modernizr.addTest("localstorage", function() {
      var n = "modernizr";
      try {
        return localStorage.setItem(n, n), localStorage.removeItem(n), !0;
      } catch (n) {
        return !1;
      }
    }),
      (function() {
        var n, e, o, t, i, f, l;
        for (var u in a)
          if (a.hasOwnProperty(u)) {
            if (
              ((n = []),
              (e = a[u]),
              e.name &&
                (n.push(e.name.toLowerCase()),
                e.options && e.options.aliases && e.options.aliases.length))
            )
              for (o = 0; o < e.options.aliases.length; o++)
                n.push(e.options.aliases[o].toLowerCase());
            for (
              t = s(e.fn, "function") ? e.fn() : e.fn, i = 0;
              i < n.length;
              i++
            )
              (f = n[i]),
                (l = f.split(".")),
                1 === l.length
                  ? (Modernizr[l[0]] = t)
                  : ((Modernizr[l[0]] &&
                      (!Modernizr[l[0]] ||
                        Modernizr[l[0]] instanceof Boolean)) ||
                      (Modernizr[l[0]] = new Boolean(Modernizr[l[0]])),
                    (Modernizr[l[0]][l[1]] = t)),
                r.push((t ? "" : "no-") + l.join("-"));
          }
      })(),
      delete i.addTest,
      delete i.addAsyncTest;
    for (var f = 0; f < Modernizr._q.length; f++) Modernizr._q[f]();
    n.Modernizr = Modernizr;
  })(window, window, document);
}
