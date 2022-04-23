import{r as e,o as p,a as t,b as n,d as c,F as o,e as s,c as l}from"./app.9a368eb2.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const r={},u=n("div",{class:"custom-container tip"},[n("p",{class:"custom-container-title"},"\u5021\u5BFC"),n("p",null,[n("strong",null,"\u62E5\u62B1\u547D\u4EE4\u884C\uFF0C\u8FDC\u79BB\u56FE\u5F62\u5316\u5DE5\u5177")])],-1),m=n("h2",{id:"_1-git-commit-message\u89C4\u8303",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_1-git-commit-message\u89C4\u8303","aria-hidden":"true"},"#"),s(" 1. git commit message\u89C4\u8303")],-1),b={class:"custom-container tip"},k=n("p",{class:"custom-container-title"},"\u53C2\u8003",-1),d={href:"https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html",target:"_blank",rel:"noopener noreferrer"},g=s("Commit message \u548C Change log \u7F16\u5199\u6307\u5357"),f=l(`<h3 id="\u5B9E\u6218" tabindex="-1"><a class="header-anchor" href="#\u5B9E\u6218" aria-hidden="true">#</a> \u5B9E\u6218</h3><h4 id="_1-ubuntu-\u5B89\u88C5-nodejs-npm" tabindex="-1"><a class="header-anchor" href="#_1-ubuntu-\u5B89\u88C5-nodejs-npm" aria-hidden="true">#</a> 1. ubuntu \u5B89\u88C5 nodejs &amp;&amp; npm</h4><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u66F4\u65B0\u5305\u7BA1\u7406\u5668</span>
$ <span class="token function">sudo</span> <span class="token function">apt</span> update

<span class="token comment"># \u5B89\u88C5\u6307\u5B9A\u7248\u672C\u7684nodejs(nodejs 12.x \u7248\u672C)</span>
$ <span class="token builtin class-name">cd</span> ~
$ <span class="token function">curl</span> -sL https://deb.nodesource.com/setup_12.x <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">bash</span> -
$ <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> nodejs

<span class="token comment"># \u5B89\u88C5\u65B0\u7248\u672C\u7684nodejs</span>
$ <span class="token builtin class-name">cd</span> ~
$ <span class="token function">curl</span> -sL https://deb.nodesource.com/setup <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">bash</span> -
$ <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> nodejs

<span class="token comment"># \u5B89\u88C5 yarn \u5305\u7BA1\u7406\u5668</span>
$ <span class="token function">curl</span> -sS https://dl.yarnpkg.com/debian/pubkey.gpg <span class="token operator">|</span> <span class="token function">sudo</span> apt-key <span class="token function">add</span> -
$ <span class="token builtin class-name">echo</span> <span class="token string">&quot;deb https://dl.yarnpkg.com/debian/ stable main&quot;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/yarn.lis
$ <span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">yarn</span>

<span class="token comment"># \u67E5\u770B\u662F\u5426\u5B89\u88C5\u6210\u529F</span>
$ <span class="token function">node</span> --version
$ <span class="token function">npm</span> --version
$ <span class="token function">yarn</span> --version

<span class="token comment"># \u5378\u8F7Dnodejs</span>
$ <span class="token function">sudo</span> <span class="token function">apt</span> remove --purge nodejs <span class="token comment"># \u5378\u8F7Dnodejs\u5E76\u6E05\u9664\u914D\u7F6E\u6587\u4EF6</span>
$ <span class="token function">sudo</span> <span class="token function">apt</span> autoremove <span class="token comment"># \u79FB\u9664\u548C nodejs \u4E00\u8D77\u5B89\u88C5\u4F46\u662F\u73B0\u5728\u6CA1\u6709\u88AB\u4F7F\u7528\u7684\u5305</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h4 id="_2-\u5B89\u88C5-commitizen-\u5E76\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#_2-\u5B89\u88C5-commitizen-\u5E76\u4F7F\u7528" aria-hidden="true">#</a> 2. \u5B89\u88C5 Commitizen \u5E76\u4F7F\u7528</h4><div class="custom-container warning"><p class="custom-container-title">\u5728\u9879\u76EE\u4E2D\u4F7F\u7528\uFF08\u4E0D\u63A8\u8350)</p><p>\u5728\u9879\u76EE\u4E2D\u4F1A\u4EA7\u751F\u4E0E\u9879\u76EE\u65E0\u5173\u7684\u6587\u4EF6\u3010<strong>node_modules</strong> <strong>package-lock.json</strong> <strong>package.json</strong>\u3011</p></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 1.\u901A\u8FC7 npm \u5B89\u88C5 cz \u5DE5\u5177</span>
$ <span class="token function">sudo</span> <span class="token function">npm</span> <span class="token function">install</span> -g commitizen

<span class="token comment"># 2.\u521B\u5EFA\u4EE3\u7801\u4ED3\u5E93</span>
$ <span class="token function">mkdir</span> git-demo
$ <span class="token builtin class-name">cd</span> git-demo
$ <span class="token function">ls</span>

<span class="token comment"># 3.\u5B89\u88C5\u9002\u914D\u5668</span>
$ commitizen init cz-conventional-changelog --save --save-exact
$ <span class="token function">ls</span>
node_modules  package-lock.json  package.json
$ <span class="token function">cat</span> package.json
<span class="token punctuation">{</span>
  <span class="token string">&quot;devDependencies&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;cz-conventional-changelog&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;^3.3.0&quot;</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;commitizen&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;./node_modules/cz-conventional-changelog&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 4.\u521D\u59CB\u5316\u4ED3\u5E93\u5E76\u6DFB\u52A0\u6587\u4EF6</span>
$ <span class="token function">git</span> init
$ <span class="token function">vim</span> test.py  <span class="token comment"># \u6587\u4EF6\u4E2D\u5199\u5165 print(&quot;hello world&quot;)</span>
$ <span class="token function">git</span> <span class="token function">add</span> test.py
$ <span class="token function">git</span> status
On branch master

No commits yet

Changes to be committed:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git rm --cached &lt;file&gt;...&quot;</span> to unstage<span class="token punctuation">)</span>
        new file:   test3.py

Untracked files:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git add &lt;file&gt;...&quot;</span> to include <span class="token keyword">in</span> what will be committed<span class="token punctuation">)</span>
        node_modules/
        package-lock.json
        package.json
$ <span class="token function">git</span> cz  <span class="token comment"># \u5728\u9879\u76EE\u4E2D \u4F7F\u7528 git cz \u6765 \u4EE3\u66FF git commit</span>
cz-cli@4.2.4, cz-conventional-changelog@3.3.0

? Select the <span class="token builtin class-name">type</span> of change that you&#39;re committing: <span class="token punctuation">(</span>Use arrow keys<span class="token punctuation">)</span>
\u276F feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that <span class="token keyword">do</span> not affect the meaning of the code <span class="token punctuation">(</span>white-space, formatting, missing semi-colons, etc<span class="token punctuation">)</span>
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
  test:     Adding missing tests or correcting existing tests
<span class="token punctuation">(</span>Move up and down to reveal <span class="token function">more</span> choices<span class="token punctuation">)</span>
$ <span class="token function">git</span> log
commit a4d1d9f3611e943f2f4042a00e1539144786804c <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span>
Author: Your Name <span class="token operator">&lt;</span>you@example.com<span class="token operator">&gt;</span>
Date:   Tue Apr <span class="token number">12</span> <span class="token number">15</span>:01:30 <span class="token number">2022</span> +0800

    feat<span class="token punctuation">(</span>add line<span class="token punctuation">)</span>: <span class="token function">add</span> a line code

    \u6DFB\u52A0\u4E86\u4E00\u884C\u4EE3\u7801

commit 115f7003a831af0bce19f24726a70ae5e3553523
Author: Your Name <span class="token operator">&lt;</span>you@example.com<span class="token operator">&gt;</span>
Date:   Tue Apr <span class="token number">12</span> <span class="token number">14</span>:49:03 <span class="token number">2022</span> +0800

    feat<span class="token punctuation">(</span>add test3.py<span class="token punctuation">)</span>: <span class="token function">add</span> a new python <span class="token function">file</span>

    <span class="token function">add</span> a new python <span class="token function">file</span>
    <span class="token function">import</span> package
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">\u5168\u5C40\u4F7F\u7528\uFF08\u63A8\u8350\uFF09</p><p>\u4E0D\u4F1A\u4EA7\u751F\u548C\u9879\u76EE\u65E0\u5173\u7684\u6587\u4EF6</p></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 1.\u901A\u8FC7 npm \u5B89\u88C5 cz \u5DE5\u5177</span>
$ <span class="token function">sudo</span> <span class="token function">npm</span> <span class="token function">install</span> -g commitizen

<span class="token comment"># 2.\u5207\u6362\u5230~\u76EE\u5F55</span>
$ <span class="token builtin class-name">cd</span> ~ 
<span class="token comment"># 3.\u5728~\u76EE\u5F55\u5B89\u88C5\u9002\u914D\u5668</span>
$ commitizen init cz-conventional-changelog --save --save-exact
$ <span class="token function">ls</span>
git-demo  node_modules  package-lock.json  package.json
<span class="token comment"># 4.\u7F16\u8F91package.json\u6587\u4EF6</span>
$ <span class="token function">vim</span> package.json <span class="token comment"># \u6253\u5F00 package.json, \u53BB\u9664 ./node_modules/</span>
$ <span class="token function">cat</span> package.json
<span class="token punctuation">{</span>
  <span class="token string">&quot;devDependencies&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;cz-conventional-changelog&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;^3.3.0&quot;</span>
  <span class="token punctuation">}</span>,
  <span class="token string">&quot;config&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;commitizen&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;path&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;cz-conventional-changelog&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment"># 5.\u521B\u5EFA\u4EE3\u7801\u4ED3\u5E93\u5E76\u5B8C\u6210\u521D\u59CB\u5316</span>
$ <span class="token function">mkdir</span> git-demo2
$ <span class="token builtin class-name">cd</span> git-demo2/
$ <span class="token function">git</span> init
$ <span class="token function">vim</span> test2.py <span class="token comment"># \u6587\u4EF6\u4E2D\u5199\u5165 print(&quot;hello demo2&quot;)</span>
$ <span class="token function">git</span> <span class="token function">add</span> test2.py
$ <span class="token function">git</span> status
On branch master

No commits yet

Changes to be committed:
  <span class="token punctuation">(</span>use <span class="token string">&quot;git rm --cached &lt;file&gt;...&quot;</span> to unstage<span class="token punctuation">)</span>
        new file:   test2.py
$ <span class="token function">git</span> cz  <span class="token comment"># \u4F7F\u7528 git cz \u6765 \u4EE3\u66FF git commit</span>
cz-cli@4.2.4, cz-conventional-changelog@3.2.0

? Select the <span class="token builtin class-name">type</span> of change that you&#39;re committing: <span class="token punctuation">(</span>Use arrow keys<span class="token punctuation">)</span>
\u276F feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that <span class="token keyword">do</span> not affect the meaning of the code <span class="token punctuation">(</span>white-space, formatting, missing semi-colons
, etc<span class="token punctuation">)</span>
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
<span class="token punctuation">(</span>Move up and down to reveal <span class="token function">more</span> choices<span class="token punctuation">)</span>
$ <span class="token function">git</span> log
commit 455510bd0d723ed8a9046cbcbb23c4060e79c717 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span>
Author: Your Name <span class="token operator">&lt;</span>you@example.com<span class="token operator">&gt;</span>
Date:   Tue Apr <span class="token number">12</span> <span class="token number">15</span>:26:16 <span class="token number">2022</span> +0800

    feat<span class="token punctuation">(</span>add test2.py<span class="token punctuation">)</span>: <span class="token function">add</span> a new python <span class="token function">file</span>

    - <span class="token function">add</span> a new python <span class="token function">file</span>
    - print<span class="token punctuation">(</span><span class="token string">&quot;hello demo2&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>\u5728 ~ \u76EE\u5F55\u4E0B\u5B89\u88C5\u4E86\u9002\u914D\u5668 <code>commitizen init cz-conventional-changelog --save --save-exact</code>\uFF0C\u518D\u5728\u9879\u76EE\u76EE\u5F55\u4E2D\u5B89\u88C5\u9002\u914D\u5668\u5C31\u4F1A\u62A5\u9519\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ commitizen init cz-conventional-changelog --save --save-exact
Attempting to initialize using the <span class="token function">npm</span> package cz-conventional-changelog
Error: Error: A previous adapter is already configured. Use --force to override
    adapterConfig.path: cz-conventional-changelog
    repoPath: /home/jiaruling/git-demo3
    CLI_PATH: /usr/local/lib/node_modules/commitizen/
    installAdapterCommand: <span class="token function">npm</span> <span class="token function">install</span> cz-conventional-changelog --save-dev
    adapterNpmName: cz-conventional-changelog
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></div><h2 id="_2-gitignore\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_2-gitignore\u6587\u4EF6" aria-hidden="true">#</a> 2. gitignore\u6587\u4EF6</h2><div class="custom-container tip"><p class="custom-container-title">gitignore\u5927\u5168</p><p><strong>https://github.com/github/gitignore</strong></p></div>`,11);function h(v,_){const a=e("ExternalLinkIcon");return p(),t(o,null,[u,m,n("div",b,[k,n("p",null,[n("strong",null,[n("a",d,[g,c(a)])])])]),f],64)}var y=i(r,[["render",h]]);export{y as default};
