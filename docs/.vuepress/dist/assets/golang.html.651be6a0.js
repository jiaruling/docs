import{c as s}from"./app.3a515557.js";import{_ as a}from"./plugin-vue_export-helper.21dcd24c.js";const n={},e=s(`<h2 id="_1-\u4EA4\u53C9\u7F16\u8BD1" tabindex="-1"><a class="header-anchor" href="#_1-\u4EA4\u53C9\u7F16\u8BD1" aria-hidden="true">#</a> 1. \u4EA4\u53C9\u7F16\u8BD1</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># golang \u6253\u5305 \u3010Windows \u4E0B\u7F16\u8BD1 Mac \u548C Linux 64\u4F4D\u53EF\u6267\u884C\u7A0B\u5E8F\u3011</span>
$ SET <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span>
$ SET <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>darwin
$ SET <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64
$ go build -o <span class="token builtin class-name">alias</span> main.go  <span class="token comment"># go build [-o \u8F93\u51FA\u540D] [\u5305\u540D]</span>

$ SET <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span><span class="token number">0</span>
$ SET <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>linux
$ SET <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>amd64
$ go build -o <span class="token builtin class-name">alias</span> main.go  <span class="token comment"># go build [-o \u8F93\u51FA\u540D] [\u5305\u540D]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div>`,2);function l(p,r){return e}var i=a(n,[["render",l]]);export{i as default};
