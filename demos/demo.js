function loadDemo(showtype) {
  var palette = {};
  ['palette', 'use-cases'].forEach(function(type) {
    var oReq = new XMLHttpRequest();
    var el = document.querySelector('.'+type+'-results');
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
            if (el) el.innerHTML += '<div class="o-grid-col|4|l3|m6|s12| sample"><div class="swatch o-colors-palette-'+m[0]+'">A</div><div class="name">'+m[0]+'</div><div class="descrip">'+m[1]+'</div></div>';
          } else {
            if (el) el.innerHTML += '<div class="o-grid-col|4|l3|m6|s12| sample"><div class="swatch o-colors-'+m[0]+'-'+m[2]+'">A</div><div class="name">'+m[0]+' <em>'+m[2]+'</em></div><div class="descrip">'+m[1]+' ('+palette[m[1]]+')</div></div>';
          }
        }
      });
    };
    oReq.send();
  });
}
