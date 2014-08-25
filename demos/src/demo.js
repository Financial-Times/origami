/*global OrigamiRegistry*/

function loadDemo(showtype) {
  "use strict";
  var palette = {},
      useCases = {},
      roles = [],
      el = document.getElementById('results'),
      paletteExclusions = ['transparent', 'inherit'];

  getData('palette');

  function getData(type) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "../../src/scss/_"+type+".scss", true);
    oReq.onload = function() {
      var src = this.responseText;
      var m = src.match(/\$[\w\-]+\:\s*\n([^;]+);/);
      m[1].split(',').forEach(function(rule) {
        rule = rule.replace(/\/*[\s\S]*?\*\//g, '').replace(/\/\/.*/, '');
        rule = rule.replace(/^\s+/, '').replace(/\s+$/, '');
        var m = rule.split(/\s+/);
        if (m && m[3] != 'DEPRECATED' && m[3] != 'DISABLED') {
          if (type=='palette') {
            palette[m[0]] = m[1];
            if (showtype === 'palette' && paletteExclusions.indexOf(m[1]) === -1) {
              el.innerHTML += '<div data-o-grid-colspan="4 XL3 L3 M6 S12" class="sample"><div class="swatch o-colors-palette-'+m[0]+' background"></div><span class="name">'+m[0]+'</span><span class="descrip">'+m[1]+'</span></div>';
            }
          } else {
            if (roles.indexOf(m[2]) === -1 && m[2] !== 'all') {
                roles.push(m[2]);
            }
            useCases[m[0]] = useCases[m[0]] || {};
            useCases[m[0]][m[2]] = m[1];
          }
        }
      });
      if (type === 'palette' && showtype === 'use-cases') {
        return getData(showtype);
      }
      if (showtype === 'use-cases') {
        var op = '';
        for (var i in useCases) {
          if (useCases.hasOwnProperty(i)) {
            op += '<div data-o-grid-colspan="4 XL3 L4 M6 S12" class="sample"><div class="swatch ';
            var tips = [];
            roles.forEach(function(role) {
              var uc = useCases[i][role] || useCases[i].all;
              if (uc) {
                op += 'o-colors-'+i+'-'+role+' o-colors-'+i+'-all '+role+' ';
                tips.push(role+': '+uc);
              }
            });
            op += '" title="'+tips.join(', ')+'"></div><span class="name">'+i+'</span></div>';
          }
        }
        el.innerHTML += op;
      }
      if (typeof OrigamiRegistry !== 'undefined') {
        window.addEventListener('resize', OrigamiRegistry.resize, false);
        OrigamiRegistry.resize();
      }
    };
    oReq.send();
  }
}

window.addEventListener('DOMContentLoaded', function() {
  loadDemo(document.getElementById('results').getAttribute('data-demo'));
}, false);
