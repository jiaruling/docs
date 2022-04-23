import{c as n}from"./app.9a368eb2.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h2 id="\u4E00\u3001\u524D\u7AEF\u90E8\u7F72-\u3010\u76F4\u63A5\u90E8\u7F72\u3011" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001\u524D\u7AEF\u90E8\u7F72-\u3010\u76F4\u63A5\u90E8\u7F72\u3011" aria-hidden="true">#</a> \u4E00\u3001\u524D\u7AEF\u90E8\u7F72 \u3010\u76F4\u63A5\u90E8\u7F72\u3011</h2><h3 id="_1-\u5B89\u88C5\u5DE5\u5177" tabindex="-1"><a class="header-anchor" href="#_1-\u5B89\u88C5\u5DE5\u5177" aria-hidden="true">#</a> 1. \u5B89\u88C5\u5DE5\u5177</h3><ul><li>windows terminal</li><li>WinSCP</li></ul><h3 id="_2-\u767B\u5F55\u5230\u670D\u52A1\u5668" tabindex="-1"><a class="header-anchor" href="#_2-\u767B\u5F55\u5230\u670D\u52A1\u5668" aria-hidden="true">#</a> 2. \u767B\u5F55\u5230\u670D\u52A1\u5668</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u683C\u5F0F: ssh \u7528\u6237\u540D@\u5730\u5740</span>
$ <span class="token function">ssh</span> root@192.168.18.100  <span class="token comment"># 22\u7AEF\u53E3\u53EF\u4EE5\u7701\u7565\uFF0C\u5176\u4ED6\u7AEF\u53E3\u4E0D\u53EF\u7701\u7565 ssh -p 2222 root@192.168.18.100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_3-\u4E0A\u4F20\u524D\u7AEF\u6587\u4EF6\u5230\u6307\u5B9A\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#_3-\u4E0A\u4F20\u524D\u7AEF\u6587\u4EF6\u5230\u6307\u5B9A\u76EE\u5F55" aria-hidden="true">#</a> 3. \u4E0A\u4F20\u524D\u7AEF\u6587\u4EF6\u5230\u6307\u5B9A\u76EE\u5F55</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u6587\u4EF6\u4E0A\u4F20\u81F3\u76EE\u5F55: /test/dist</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_4-\u914D\u7F6Enginx\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#_4-\u914D\u7F6Enginx\u6587\u4EF6" aria-hidden="true">#</a> 4. \u914D\u7F6Enginx\u6587\u4EF6</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 1. \u627E\u5230nginx\u914D\u7F6E\u6587\u4EF6\u76EE\u5F55</span>
<span class="token comment"># cat /etc/nginx/nginx.conf</span>

<span class="token comment"># 2. \u4FEE\u6539\u914D\u7F6E\u6587\u4EF6</span>
    <span class="token comment">#user  nobody;</span>
    worker_processes  <span class="token number">1</span><span class="token punctuation">;</span>

    events <span class="token punctuation">{</span>
        worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    http <span class="token punctuation">{</span>
        include       mime.types<span class="token punctuation">;</span>
        default_type  application/octet-stream<span class="token punctuation">;</span>

        sendfile        on<span class="token punctuation">;</span>
        <span class="token comment">#tcp_nopush     on;</span>

        <span class="token comment">#keepalive_timeout  0;</span>
        keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>

        <span class="token comment">## \u91CD\u70B9\uFF01\u91CD\u70B9\uFF01\u91CD\u70B9\uFF01</span>
        server <span class="token punctuation">{</span>
            listen       <span class="token number">8083</span><span class="token punctuation">;</span>
            server_name  localhost<span class="token punctuation">;</span>

            location / <span class="token punctuation">{</span>
                root   /test/dist<span class="token punctuation">;</span>  <span class="token comment"># \u6307\u5B9A\u524D\u7AEF\u6253\u5305\u7684\u6587\u8DEF\u5F84</span>
                index  index.html index.htm<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
<span class="token comment"># 3.\u68C0\u67E5\u914D\u7F6E\u6587\u4EF6\u662F\u5426\u6B63\u786E</span>
$ nginx -t <span class="token comment"># \u53EF\u4EE5\u901A\u8FC7\u8FD9\u4E2A\u547D\u4EE4\u627E\u5230nginx\u7684\u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84</span>

<span class="token comment"># 4.nginx\u91CD\u65B0\u52A0\u8F7D\u914D\u7F6E\u6587\u4EF6</span>
$ nginx -s reload <span class="token comment"># \u4E00\u822C\u5728\u4EFB\u610F\u8DEF\u5F84\u5747\u53EF\u6267\u884C</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h2 id="\u4E8C\u3001\u524D\u7AEF\u90E8\u7F72-docker-\u7248-\u3010\u5F00\u53D1\u6D4B\u8BD5\u7248\u3011" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001\u524D\u7AEF\u90E8\u7F72-docker-\u7248-\u3010\u5F00\u53D1\u6D4B\u8BD5\u7248\u3011" aria-hidden="true">#</a> \u4E8C\u3001\u524D\u7AEF\u90E8\u7F72 Docker \u7248 \u3010\u5F00\u53D1\u6D4B\u8BD5\u7248\u3011</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u62C9\u53D6\u955C\u50CF</span>
$ <span class="token function">docker</span> pull nginx

<span class="token comment"># \u542F\u52A8 nginx</span>
$ <span class="token function">docker</span> run -d <span class="token punctuation">\\</span>
--name nginx <span class="token punctuation">\\</span>
-p <span class="token number">8080</span>:8080 <span class="token punctuation">\\</span>
-v /var/nginx/conf:/etc/nginx/conf.d <span class="token punctuation">\\</span>
-v /var/nginx/project:/var/nginx/project <span class="token punctuation">\\</span>
nginx:latest

<span class="token comment"># \u8BBE\u7F6E\u5F00\u673A\u81EA\u542F\u52A8</span>
$ <span class="token function">docker</span> container update --restart<span class="token operator">=</span>always nginx

<span class="token comment"># \u67E5\u770B\u8FD0\u884C\u72B6\u51B5</span>
$ <span class="token function">docker</span> logs nginx
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><ul><li><strong>nginx</strong> \u914D\u7F6E\u6587\u4EF6 <strong>default.conf</strong> \u7684\u5185\u5BB9\u5982\u4E0B</li></ul><div class="language-tex ext-tex line-numbers-mode"><pre class="language-tex"><code>server <span class="token punctuation">{</span>
    listen       8080;
    server_name  localhost;

    location / <span class="token punctuation">{</span>
        root   /var/nginx/project/dist;
        index  index.html index.htm;
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ul><li>\u914D\u7F6E\u6587\u4EF6\u8BBE\u7F6E\u597D\u4E4B\u540E\u5C06\u5176\u653E\u7F6E\u5728\u5BBF\u4E3B\u673A\u7684 <strong>/var/nginx/conf</strong> \u76EE\u5F55\u4E0B</li><li>\u524D\u7AEF\u7F16\u8BD1\u597D\u7684\u76EE\u6807\u6587\u4EF6\u5C06\u5176\u653E\u7F6E\u5728\u5BBF\u4E3B\u673A\u7684 <strong>/var/nginx/project</strong> \u76EE\u5F55\u4E0B</li></ul><h2 id="\u4E09\u3001\u524D\u7AEF\u90E8\u7F72-docker-\u7248-\u3010\u751F\u4EA7\u73AF\u5883\u3011" tabindex="-1"><a class="header-anchor" href="#\u4E09\u3001\u524D\u7AEF\u90E8\u7F72-docker-\u7248-\u3010\u751F\u4EA7\u73AF\u5883\u3011" aria-hidden="true">#</a> \u4E09\u3001\u524D\u7AEF\u90E8\u7F72 Docker \u7248 \u3010\u751F\u4EA7\u73AF\u5883\u3011</h2><blockquote><p><strong>\u5355\u8282\u70B9\u7B80\u6613\u7248\u672C</strong></p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># 1.\u51C6\u5907 Dockerfile \u6587\u4EF6</span>
$ <span class="token function">ls</span>
dist
<span class="token comment"># \u7F16\u5199 Dockerfile</span>
$ <span class="token function">vim</span> Dockerfile
<span class="token comment">#--------------------------\u6587\u4EF6\u5185\u5BB9\u5982\u4E0B--------------------------</span>
FROM nginx:latest
MAINTAINER xxx@163.com
COPY dist/ /usr/share/nginx/html/
<span class="token comment">#--------------------------------------------------------------</span>
$ <span class="token function">ls</span>
dist  Dockerfile

<span class="token comment"># 2.\u6784\u5EFA\u955C\u50CF</span>
$ <span class="token function">docker</span> build -t nginx:vue <span class="token builtin class-name">.</span>
<span class="token comment"># 3.\u67E5\u770B\u81EA\u5DF1\u6784\u5EFA\u7684\u955C\u50CF</span>
$ <span class="token function">docker</span> images
<span class="token comment"># 4. \u542F\u52A8\u5BB9\u5668</span>
$ <span class="token function">docker</span> run -d --name nginx-vue -p <span class="token number">8848</span>:80 nginx:vue
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="i-\u9644\u5F55\u4E00-\u3010linux\u4E3B\u673A\u3011" tabindex="-1"><a class="header-anchor" href="#i-\u9644\u5F55\u4E00-\u3010linux\u4E3B\u673A\u3011" aria-hidden="true">#</a> \u2160. \u9644\u5F55\u4E00 \u3010linux\u4E3B\u673A\u3011</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># liunx\u4E3B\u673A</span>
<span class="token comment">## \u67E5\u770Bnginx\u542F\u52A8\u72B6\u6001</span>
$ <span class="token function">ps</span> -ef <span class="token operator">|</span> <span class="token function">grep</span> nginx
<span class="token comment">## \u542F\u52A8nginx</span>
$ <span class="token builtin class-name">cd</span> usr/local/nginx/sbin <span class="token comment">#\u6CE8\u610F\uFF1Ausr/local/nginx \u662F\u5B89\u88C5\u76EE\u5F55</span>
$ ./nginx <span class="token comment"># ./ \u8868\u793A\u6267\u884C\u5F53\u524D\u6587\u4EF6\u5939\u4E0B\u7684nginx\u6587\u4EF6</span>

<span class="token comment">## \u505C\u6B62nginx</span>
$ nginx -s stop <span class="token comment"># \u4E00\u822C\u5728\u4EFB\u610F\u8DEF\u5F84\u5747\u53EF\u6267\u884C</span>

<span class="token comment">## 3. nginx\u91CD\u65B0\u52A0\u8F7D\u914D\u7F6E\u6587\u4EF6</span>
$ nginx -s reload <span class="token comment"># \u4E00\u822C\u5728\u4EFB\u610F\u8DEF\u5F84\u5747\u53EF\u6267\u884C</span>

<span class="token comment">## 4. \u68C0\u67E5\u914D\u7F6E\u6587\u4EF6\u662F\u5426\u6B63\u786E</span>
$ nginx -t
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h2 id="ii-\u9644\u5F55\u4E8C-\u3010docker\u3011" tabindex="-1"><a class="header-anchor" href="#ii-\u9644\u5F55\u4E8C-\u3010docker\u3011" aria-hidden="true">#</a> \u2161. \u9644\u5F55\u4E8C \u3010docker\u3011</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># docker</span>
<span class="token comment">## \u67E5\u770B\u5BB9\u5668\u7684\u547D\u4EE4</span>
$ <span class="token function">docker</span> container
<span class="token comment">## \u67E5\u770B\u6B63\u5728\u8FD0\u884C\u4E2D\u7684\u5BB9\u5668</span>
$ <span class="token function">docker</span> <span class="token function">ps</span>
<span class="token comment">## \u67E5\u770B\u6240\u6709\u5BB9\u5668</span>
$ <span class="token function">docker</span> <span class="token function">ps</span> -a
<span class="token comment">## \u505C\u6B62\u5BB9\u5668</span>
$ <span class="token function">docker</span> stop nginx
<span class="token comment">## \u542F\u52A8\u505C\u6B62\u7684\u5BB9\u5668</span>
$ <span class="token function">docker</span> start nginx
<span class="token comment">## \u91CD\u542F\u5BB9\u5668</span>
$ <span class="token function">docker</span> restart nginx
<span class="token comment">## \u5220\u9664\u5BB9\u5668</span>
$ <span class="token function">docker</span> <span class="token function">rm</span> nginx
<span class="token comment">## \u5220\u9664\u6240\u6709\u505C\u6B62\u7684\u5BB9\u5668</span>
$ <span class="token function">docker</span> <span class="token function">rm</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> -a -q<span class="token variable">)</span></span> <span class="token comment"># \u6216\u8005 docker rm $(docker ps -qf status=exited)</span>
<span class="token comment">## \u91CD\u65B0\u52A0\u8F7D\u914D\u7F6E\u6587\u4EF6</span>
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> nginx nginx -s reload
<span class="token comment">## docker\u955C\u50CF\u5BFC\u51FA\u4E3A\u538B\u7F29\u6587\u4EF6 \u3010-o \u548C &gt; \u8868\u793A\u8F93\u51FA\u5230\u6587\u4EF6\u3011</span>
$ <span class="token function">docker</span> save -o nginx.tar nginx:vue <span class="token comment"># \u7B49\u4EF7\u4E8E docker save &gt; nginx.tar nginx:vue</span>
<span class="token comment">## \u538B\u7F29\u6587\u4EF6\u5BFC\u5165\u4E3Adocker\u955C\u50CF \u3010-i \u548C &lt; \u8868\u793A\u4ECE\u6587\u4EF6\u8F93\u5165\u3011</span>
$ <span class="token function">docker</span> load -i nginx.tar <span class="token comment"># \u7B49\u4EF7\u4E8E docker load &lt; nginx.tar</span>

<span class="token comment">## \u67E5\u770B\u7AEF\u53E3\u662F\u5426\u5F00\u542F</span>
$ <span class="token function">netstat</span> -anp <span class="token operator">|</span> <span class="token function">grep</span> docker-proxy
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div>`,21);function p(l,c){return e}var t=s(a,[["render",p]]);export{t as default};
