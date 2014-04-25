/*global OrigamiRegistry*/

function loadDemo(showtype) {
  "use strict";
  var palette = {},
      useCases = {},
      roles = [],
      el = document.querySelector('.'+showtype+'-results'),
      paletteExclusions = ['transparent', 'inherit'];

  getData('palette');

  function getData(type) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "../src/scss/_"+type+".scss", true);
    oReq.onload = function() {
      var src = this.responseText;
      var m = src.match(/\$[\w\-]+\:\s*\n([^;]+);/);
      m[1].split(',').forEach(function(rule) {
        rule = rule.replace(/\/*[\s\S]*?\*\//g, '').replace(/\/\/.*/, '');
        rule = rule.replace(/^\s+/, '').replace(/\s+$/, '');
        var m = rule.split(/\s+/);

        if (m && m[3] !== 'DEPRECATED') {
          if (type === 'palette') {
            palette[m[0]] = m[1];
            if (showtype === 'palette' && paletteExclusions.indexOf(m[1]) === -1) {
              el.innerHTML += '<div data-o-grid-colspan="4 XL3 L3 M6 S12" class="sample"><div class="swatch background" style="background-color:'+m[1]+'"></div><div class="name">'+m[0]+'</div><div class="descrip">'+m[1]+'</div></div>';
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
        op = '<table><thead><tr><th>Use case</th>';
        roles.forEach(function(role) {
          op += '<th>'+role+' colour</th>';
        });
        op += '</tr></thead><tbody>';

        for (var i in useCases) {
          if (useCases.hasOwnProperty(i)) {
              op += '<tr><td>'+i+'</td>';
              roles.forEach(function(role) {
                var uc = useCases[i][role] || useCases[i].all,
                    descrip = (uc !== palette[uc]) ? uc + '<br/>' + palette[uc] : uc;
                if (uc) {
                  op += '<td><div class="swatch o-colors-'+i+'-'+role+' o-colors-'+i+'-all '+role+'"></div><div class="descrip">' + descrip + '</div></td>';
                } else {
                  op += '<td></td>';
                }
              });
              op += '</tr>';
          }
        }
        op += '</table>';
        el.innerHTML = op;
      }
      if (typeof OrigamiRegistry !== 'undefined') {
        window.addEventListener('resize', OrigamiRegistry.resize, false);
        OrigamiRegistry.resize();
      }
    };
    oReq.send();
  }
}
