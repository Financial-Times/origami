function loadDemo(showtype) {
  var palette = {};
  var usecases = {}, roles = [];
  var el = document.querySelector('.'+showtype+'-results');
  getdata('palette');

  function getdata(type) {
    var oReq = new XMLHttpRequest();
    oReq.open("GET", "../src/scss/_"+type+".scss", true);
    oReq.onload = function() {
      var src = this.responseText;
      var m = src.match(/\$[\w\-]+\:\s*\n([^;]+);/);
      m[1].split(',').forEach(function(rule) {
        rule = rule.replace(/\/*[\s\S]*?\*\//g, '').replace(/\/\/.*/, '');
        rule = rule.replace(/^\s+/, '').replace(/\s+$/, '');
        var m = rule.split(/\s+/);
        if (m) {
          if (type=='palette') {
            palette[m[0]] = m[1];
            if (showtype == 'palette') el.innerHTML += '<div data-o-grid-colspan="4 L3 M6 S12" class="sample"><div class="swatch background o-colors-palette-'+m[0]+'"></div><div class="name">'+m[0]+'</div><div class="descrip">'+m[1]+'</div></div>';
          } else {
            if (roles.indexOf(m[2]) === -1 && m[2] !== 'all') roles.push(m[2]);
            usecases[m[0]] = usecases[m[0]] || {};
            usecases[m[0]][m[2]] = m[1];
          }
        }
      });
      if (type == 'palette' && showtype == 'use-cases') {
        getdata(showtype);
      }
      if (showtype == 'use-cases') {
        var op = '';
        op = '<table class="o-techdocs-table__table"><thead><tr><th>Use case</th>'
        roles.forEach(function(role) {
          op += '<th>'+role+' colour</th>';
        });
        op += '</tr></thead><tbody>';
        console.log(usecases);
        for (var i in usecases) {
          op += '<tr><td>'+i+'</td>';
          roles.forEach(function(role) {
            var uc = usecases[i][role] || usecases[i]['all'];
            if (uc) {
              op += '<td><div class="swatch o-colors-'+i+'-'+role+' o-colors-'+i+'-all '+role+'"></div><div class="descrip">'+uc+'<br/>'+palette[uc]+'</div></td>';
            } else {
              op += '<td></td>';
            }
          });
          op += '</tr>';
        }
        op += '</table>';
        el.innerHTML = op;
      }
    };
    oReq.send();
  };
}
