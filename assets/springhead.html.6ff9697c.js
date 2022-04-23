import{r as e,o as t,a as p,b as n,d as c,F as l,c as o,e as s}from"./app.9a368eb2.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const r={},u=o(`<h2 id="\u5185\u7F6E\u57FA\u672C\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#\u5185\u7F6E\u57FA\u672C\u7C7B\u578B" aria-hidden="true">#</a> \u5185\u7F6E\u57FA\u672C\u7C7B\u578B</h2><div class="custom-container tip"><p class="custom-container-title">string\u5B9E\u73B0\u539F\u7406</p><p>\u6E90\u7801\u5305<code>src/runtime/string.go:stringStruct</code>\u5B9A\u4E49\u4E86string\u7684\u6570\u636E\u7ED3\u6784</p></div><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">type</span> stringStruct <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	str unsafe<span class="token punctuation">.</span>Pointer
	<span class="token builtin">len</span> <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">slice\u5B9E\u73B0\u539F\u7406</p><p>\u6E90\u7801\u5305<code>src/runtime/slice.go:slice</code>\u5B9A\u4E49\u4E86slice\u7684\u6570\u636E\u7ED3\u6784</p></div><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">type</span> slice <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	array unsafe<span class="token punctuation">.</span>Pointer
	<span class="token builtin">len</span>   <span class="token builtin">int</span>
	<span class="token builtin">cap</span>   <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">map\u5B9E\u73B0\u539F\u7406</p><p>\u6E90\u7801\u5305<code>src/runtime/map.go:hmap</code>\u5B9A\u4E49\u4E86map\u7684\u6570\u636E\u7ED3\u6784</p></div><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">type</span> hmap <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// Note: the format of the hmap is also encoded in cmd/compile/internal/gc/reflect.go.</span>
	<span class="token comment">// Make sure this stays in sync with the compiler&#39;s definition.</span>
	count     <span class="token builtin">int</span> <span class="token comment">// # live cells == size of map.  Must be first (used by len() builtin)</span>
	flags     <span class="token builtin">uint8</span>
	B         <span class="token builtin">uint8</span>  <span class="token comment">// log_2 of # of buckets (can hold up to loadFactor * 2^B items)</span>
	noverflow <span class="token builtin">uint16</span> <span class="token comment">// approximate number of overflow buckets; see incrnoverflow for details</span>
	hash0     <span class="token builtin">uint32</span> <span class="token comment">// hash seed</span>

	buckets    unsafe<span class="token punctuation">.</span>Pointer <span class="token comment">// array of 2^B Buckets. may be nil if count==0.</span>
	oldbuckets unsafe<span class="token punctuation">.</span>Pointer <span class="token comment">// previous bucket array of half the size, non-nil only when growing</span>
	nevacuate  <span class="token builtin">uintptr</span>        <span class="token comment">// progress counter for evacuation (buckets less than this have been evacuated)</span>

	extra <span class="token operator">*</span>mapextra <span class="token comment">// optional fields</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><div class="custom-container tip"><p class="custom-container-title">channel\u5B9E\u73B0\u539F\u7406</p><p>\u6E90\u7801\u5305<code>src/runtime/chan.go:hchan</code>\u5B9A\u4E49\u4E86channel\u7684\u6570\u636E\u7ED3\u6784</p></div><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">type</span> hchan <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	qcount   <span class="token builtin">uint</span>           <span class="token comment">// total data in the queue</span>
	dataqsiz <span class="token builtin">uint</span>           <span class="token comment">// size of the circular queue</span>
	buf      unsafe<span class="token punctuation">.</span>Pointer <span class="token comment">// points to an array of dataqsiz elements</span>
	elemsize <span class="token builtin">uint16</span>
	closed   <span class="token builtin">uint32</span>
	elemtype <span class="token operator">*</span>_type <span class="token comment">// element type</span>
	sendx    <span class="token builtin">uint</span>   <span class="token comment">// send index</span>
	recvx    <span class="token builtin">uint</span>   <span class="token comment">// receive index</span>
	recvq    waitq  <span class="token comment">// list of recv waiters</span>
	sendq    waitq  <span class="token comment">// list of send waiters</span>

	<span class="token comment">// lock protects all fields in hchan, as well as several</span>
	<span class="token comment">// fields in sudogs blocked on this channel.</span>
	<span class="token comment">//</span>
	<span class="token comment">// Do not change another G&#39;s status while holding this lock</span>
	<span class="token comment">// (in particular, do not ready a G), as this can deadlock</span>
	<span class="token comment">// with stack shrinking.</span>
	lock mutex
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="\u5185\u5B58\u5BF9\u9F50" tabindex="-1"><a class="header-anchor" href="#\u5185\u5B58\u5BF9\u9F50" aria-hidden="true">#</a> \u5185\u5B58\u5BF9\u9F50</h2>`,10),m={href:"https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzkyNzI1NzM5NQ==&action=getalbum&album_id=1932365789899096067&scene=173&from_msgid=2247486198&from_itemidx=1&count=3&nolastread=1#wechat_redirect",target:"_blank",rel:"noopener noreferrer"},b=s("\u53C2\u8003"),d=n("h2",{id:"\u6808\u5185\u5B58\u3001\u5806\u5185\u5B58\u3001\u9003\u9038\u5206\u6790",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u6808\u5185\u5B58\u3001\u5806\u5185\u5B58\u3001\u9003\u9038\u5206\u6790","aria-hidden":"true"},"#"),s(" \u6808\u5185\u5B58\u3001\u5806\u5185\u5B58\u3001\u9003\u9038\u5206\u6790")],-1),k=n("h2",{id:"\u5783\u573E\u56DE\u6536\u673A\u5236",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5783\u573E\u56DE\u6536\u673A\u5236","aria-hidden":"true"},"#"),s(" \u5783\u573E\u56DE\u6536\u673A\u5236")],-1);function h(g,f){const a=e("ExternalLinkIcon");return t(),p(l,null,[u,n("p",null,[n("a",m,[b,c(a)])]),d,k],64)}var y=i(r,[["render",h]]);export{y as default};
