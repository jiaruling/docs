import{o as n,a as s,c as a}from"./app.3a515557.js";import{_ as e}from"./plugin-vue_export-helper.21dcd24c.js";const c={},t={class:"language-bash ext-sh line-numbers-mode"},p=a(`<pre class="language-bash"><code><span class="token comment"># git \u53D6\u6D88\u8DDF\u8E2A\u6587\u4EF6  https://www.cnblogs.com/zhuchenglin/p/7128383.html</span>
<span class="token comment">## \u5BF9\u6240\u6709\u6587\u4EF6\u90FD\u53D6\u6D88\u8DDF\u8E2A</span>
$ <span class="token function">git</span> <span class="token function">rm</span> -r --cached <span class="token builtin class-name">.</span> \u3000\u3000// \u4E0D\u5220\u9664\u672C\u5730\u6587\u4EF6
$ <span class="token function">git</span> <span class="token function">rm</span> -r --f <span class="token builtin class-name">.</span> \u3000\u3000    // \u5220\u9664\u672C\u5730\u6587\u4EF6
<span class="token comment">## \u5BF9\u67D0\u4E2A\u6587\u4EF6\u53D6\u6D88\u8DDF\u8E2A</span>
$ <span class="token function">git</span> <span class="token function">rm</span> --cached readme1.txt    // \u5220\u9664readme1.txt\u7684\u8DDF\u8E2A\uFF0C\u5E76\u4FDD\u7559\u5728\u672C\u5730
$ <span class="token function">git</span> <span class="token function">rm</span> --f readme1.txt        // \u5220\u9664readme1.txt\u7684\u8DDF\u8E2A\uFF0C\u5E76\u5220\u9664\u672C\u5730\u6587\u4EF6
<span class="token comment">## \u5BF9\u67D0\u4E2A\u6587\u4EF6\u5939\u53D6\u6D88\u8DDF\u8E2A</span>
$ <span class="token function">git</span> <span class="token function">rm</span> --cached log/*    // \u5220\u9664log\u6587\u4EF6\u5939\u4E0B\u6240\u6709\u6587\u4EF6\u7684\u8DDF\u8E2A\uFF0C\u5E76\u4FDD\u7559\u6587\u4EF6\u548C\u6587\u4EF6\u5939
$ <span class="token function">git</span> <span class="token function">rm</span> --f log/*         // \u5220\u9664log\u6587\u4EF6\u5939\u4E0B\u6240\u6709\u6587\u4EF6\u7684\u8DDF\u8E2A\uFF0C\u5E76\u5220\u9664\u6587\u4EF6\u548C\u6587\u4EF6\u5939

<span class="token comment"># \u5220\u9664\u8FDC\u7A0B\u5206\u652F</span>
$ <span class="token function">git</span> push origin --delete <span class="token punctuation">[</span>branchName<span class="token punctuation">]</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div>`,2),l=[p];function o(r,i){return n(),s("div",t,l)}var b=e(c,[["render",o]]);export{b as default};
