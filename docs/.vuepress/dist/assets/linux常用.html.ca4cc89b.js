import{o as n,a as s,c as a}from"./app.3a515557.js";import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";const p={},t={class:"language-bash ext-sh line-numbers-mode"},l=a(`<pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u65E5\u5FD7\u6587\u4EF6\u7684\u6700\u540E\u51E0\u884C</span>
$ <span class="token function">tail</span> -n <span class="token number">5</span> log.log

<span class="token comment"># \u67E5\u770B\u5F53\u524D\u6240\u6709tcp\u7AEF\u53E3</span>
$ <span class="token function">netstat</span> -ntlp 
<span class="token comment"># $ netstat -ntlp | grep 8080   # \u67E5\u770B\u6240\u67098080\u7AEF\u53E3\u4F7F\u7528\u60C5\u51B5</span>
<span class="token comment"># $ netstat -ntlp | grep 3306   # \u67E5\u770B\u6240\u67093306\u7AEF\u53E3\u4F7F\u7528\u60C5\u51B5</span>

<span class="token comment"># \u6740\u6389\u8FDB\u7A0B</span>
$ <span class="token function">kill</span> <span class="token number">26993</span> <span class="token comment"># $ kill PID</span>
<span class="token comment"># $ kill -9 PID</span>

<span class="token comment"># \u5E94\u7528\u5728\u540E\u53F0\u6267\u884C</span>
$ <span class="token function">nohup</span> ./GMMangementV1 <span class="token operator">&gt;</span> log.log <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div>`,2),c=[l];function o(r,m){return n(),s("div",t,c)}var u=e(p,[["render",o]]);export{u as default};
