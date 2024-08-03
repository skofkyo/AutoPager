<h1>測試通過環境：</h1>
<pre>
2024/06/04
PC
Chrome 125.0.6422.142 + Tampermonkey 5.1.1 or ScriptCat 0.16.3
Edge 125.0.2535.85 + Tampermonkey 5.1.1 or ScriptCat 0.16.3
Cent Browser  5.1.1130.82 + Tampermonkey 5.1.1 or ScriptCat 0.16.3
FireFox 126.0.1 + Tampermonkey 5.1.1 or ScriptCat 0.16.3
Android
Kiwi Browser 124.0.6327.4 + Tampermonkey 5.1.1 or ScriptCat 0.16.3
Firefox for Android 126.0.1 + Tampermonkey 5.1.1
Waterfox for Android 1.0.7 + Tampermonkey 5.1.1
XBrowser 4.6.2
ViaBrowser 5.6.1
</pre>
<p>PS：一些手機瀏覽器內建安裝腳本功能的，如果需要使用到腳本管理器選單和GM_xmlhttpRequest可能無法正常使用。</p>
<p>PS：暴力猴Violentmonkey不兼容Fancybox5會報錯，連Android上的Via瀏覽器、X瀏覽器都能正常引入使用Fancybox5了。</p>
<h1>提醒：</h1>
<p>如果所在區域，ISP，或是不可抗力的因素而無法正常連接cdn.jsdelivr.net的依賴庫時</p>
<p>請自行修改腳本將所有cdn.jsdelivr.net替換成unpkg.com或cdn.bootcdn.net</p>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看依賴庫 」</strong>
        </kbd>
    </summary>
<pre>
cdn.jsdelivr.net
// @require            https://update.greasyfork.org/scripts/473358/1237031/JSZip.js
// @require            https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @require            https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0.31/dist/fancybox/fancybox.umd.js
// @resource JqueryJS https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min
// @resource FancyboxV5JS https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0.31/dist/fancybox/fancybox.umd.js
// @resource FancyboxV5Css https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0.31/dist/fancybox/fancybox.css
// @resource FancyboxV3JS https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js
// @resource FancyboxV3Css https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css
// @resource ViewerJs https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.js
// @resource ViewerJsCss https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.css
</pre>
<pre>
unpkg.com
// @require            https://update.greasyfork.org/scripts/473358/1237031/JSZip.js
// @require            https://unpkg.com/jquery@3.7.1/dist/jquery.min.js
// @require            https://unpkg.com/@fancyapps/ui@5.0.31/dist/fancybox/fancybox.umd.js
// @resource JqueryJS https://unpkg.com/jquery@3.7.1/dist/jquery.min.js
// @resource FancyboxV5JS https://unpkg.com/@fancyapps/ui@5.0.31/dist/fancybox/fancybox.umd.js
// @resource FancyboxV5Css https://unpkg.com/@fancyapps/ui@5.0.31/dist/fancybox/fancybox.css
// @resource FancyboxV3JS https://unpkg.com/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js
// @resource FancyboxV3Css https://unpkg.com/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css
// @resource ViewerJs https://unpkg.com/viewerjs@1.11.6/dist/viewer.min.js
// @resource ViewerJsCss https://unpkg.com/viewerjs@1.11.6/dist/viewer.min.css
</pre>
<pre>
cdn.bootcdn.net
// @require            https://update.greasyfork.org/scripts/473358/1237031/JSZip.js
// @require            https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js
// @require            https://cdn.bootcdn.net/ajax/libs/fancyapps-ui/5.0.22/fancybox/fancybox.umd.js
// @resource JqueryJS https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js
// @resource FancyboxV5JS https://cdn.bootcdn.net/ajax/libs/fancyapps-ui/5.0.22/fancybox/fancybox.umd.js
// @resource FancyboxV5Css https://cdn.bootcdn.net/ajax/libs/fancyapps-ui/5.0.22/fancybox/fancybox.css
// @resource FancyboxV3JS https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js
// @resource FancyboxV3Css https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css
// @resource ViewerJs https://cdn.bootcdn.net/ajax/libs/viewerjs/1.11.5/viewer.min.js
// @resource ViewerJsCss https://cdn.bootcdn.net/ajax/libs/viewerjs/1.11.5/viewer.min.css
</pre>
</details>
<br>
<p>2023/11/03</p>
<p>1.6.0開始Fancybox從3.5.7升級至5.0.24，部分網站依然調用3.5.7，網站如果有自帶LIGHTBOX之類的插件，則不調用腳本的Fancybox避免各種衝突，如有遇到FancyboxV5版圖片沒有置中錯位偏右請反饋。</p>
<p>2023/10/24</p>
<p>1.5.0開始改動太多，使用低於1.5.0的版本升級後，如遇到任何問題請先手動重置設定，如左下圖示不見了，快捷鍵沒有反應，切換顯示按鈕沒反應等等...</p>
<p>如果嚴重到連選項設定都叫不出來，按F12 > 主控台(Console) > 下方輸入框 > 輸入下面這行代碼，然後Enter，重新載入頁面。</p>
<pre>
localStorage.removeItem("FullPictureLoadOptions");
</pre>
<p>紳士漫畫wnacg，由於新增的Fancybox功能的緣故，新的元素結構導致可能會被擋廣告擴充套件的規則隱藏掉圖片，下拉閱讀頁需要加白名單網址(信任名單)，腳本已隱藏廣告元素，或在該網站關閉Fancybox功能。</p>
<pre>
https://*wnacg.com/photos-index-aid-*.html
https://*wnacg.com/photos-slide-aid-*.html
https://*wnacg.com/photos-slist-aid-*.html
</pre>
<p>Fancybox功能在少部份網站上無效或與網站自身的LIGHTBOX插件衝突或顯示有問題，有列了是不使用Fancybox的網站，如下。</p>
<pre>
XLUST.ORG、ACGN小鎮、最新韩漫网M、拷貝漫畫M、野蛮漫画、次元漫画、漫神
</pre>
<h1>簡介：</h1>
<p>寫這個腳本的緣由是，想讓下載、複製鏈結不用做展開圖庫挑選圖片的動作，能自己決定要儲存的壓縮檔和資料夾名稱，網站沒有限制連接數的話能做到高速聚集所有圖片，還能添加一些我想要的輔助功能。</p>
<p>聚圖！反對將一話一集一章一篇一部拆成好幾頁，一頁一張圖真XXX的有病，整頁用Lazy loading的話還能接受，透過選擇器圈選圖片或者自己寫函式，能聚集分頁的所有圖片到當前頁面裡，也能進行下載壓縮打包，如有NEXT元素能做到自動化下載，支持自定義規則方便重複使用，後續擴充規則更容易。</p>
<p>用戶寫的規則請自行另外備份，規則只會寫死在腳本裡不會線上規則化，腳本更新就會覆蓋規則。</p>
<p>如有需要支持的站點可反饋，有空的話會嘗試幫寫規則加進腳本內置的規則庫裡，能力有限不保証一定寫的出來。</p>
<h1>關於自動下載：</h1> 當修改了腳本UI選項設定或快捷鍵[ Ctrl + . ]或腳本內的站點規則啟用了自動下載時，站點規則insertImg的自動插入圖片將無效，瀏覽器的下載設定需關閉下載前詢問儲存位置和設定好預設的下載路徑，全自動需要有NEXT做搭配，每個站點第一次啟用時需等待連續下載2~3次後，觸發瀏覽器詢問是否同意允許下載多個檔案，需同意後後續才能成功下載，並且讓分頁保持在前景運行不然壓縮進度會停住，可以開一個獨立視窗一個分頁用作下載用，最好的方式是拉兩個視窗一個佔1/3畫面掛下載一個佔3/2畫面瀏覽。 <h1>圖片全載規則示例：</h1>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
<pre>
[{
    name: "規則名稱",
    enable: 0, //填0禁用此規則
    icon: 0, //填0不顯示左下圖示
    key: 0, //填0不綁定快捷鍵
    reg: /www\.xxxxx\.com/, //正則表達式匹配網址
    reg: [ //匹配正則表達式數組
        /RegExp/,
        /RegExp/
    ],
    reg: () => {
         //函式寫法返回布林值boolean
        if (/^https?:\/\/www\.everiaclub\.com\/.+/.test(siteUrl)) {
            if(!siteUrl.includes(".html")) {
                return true;
            }
        }
        return false;
    },
    delay: 300, //延遲載入規則
    include: "元素選擇器", //網頁必須包含的元素
    include: ["A元素選擇器", "B元素選擇器", "C元素選擇器", "D元素選擇器"], //網頁必須包含數組裡的所有元素
    exclude: "元素", //網頁要排除的元素
    exclude: ["A元素選擇器", "B元素選擇器", "C元素選擇器", "D元素選擇器"], //網頁要排除數組裡其中的元素
    init: "code", //載入頁面後要優先執行的代碼
    init: () => {
        code;
    },
    init: async () => await fun.waitEle("元素選擇器"), //等待直至元素出現
    init: async () => await fun.waitVar("屬性名"), //等待直至window物件的屬性出現
    init: () => fun.addMutationObserver(() => fun.remove("div[class][style*='z-index']")), //動態刪除元素
    imgs: "#TheImg", //CSS選擇器
    imgs: "//img[@id="TheImg"]", //XPath選擇器
    //IMG、DIV、A、SPAN、LI、FIGURE，6種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A取href屬性。
    imgs: () => { //也可自己創建Array，有時大圖是在A元素上需要透過xhr獲取或放在script或變量或透過api取得的json。
        code;
        return Array;
    },
    repeat: 1, //重複取得圖片元素，用於SPA網頁
    thums: ".thums", //Fancybox要用的縮略圖網址選擇器
    scrollEle: ["元素", time],//[自動滾動元素, 滾動的間隔], 綁定快捷鍵數字鍵6
    scrollEle: async () => {
        …code;
    },
    button: [4, "24%", 1],//[無作用, "寬度%", 在按鈕之前添加多少空行]，有此屬性才會添加功能按鈕
    insertImg: ["元素", 1, time], //[清空此元素內容插入圖片, 0(手動)1(自動)2(自動Lazy loading模式)3(手動Lazy loading模式), 自動延遲時間(預設0)]。
    insertImg: [
        ["元素", (插入在此元素) 0(裡面)1(之前) 2(之後), "要移除的元素"], 0(手動) 1(自動) 2(自動Lazy loading模式) 3(手動Lazy loading模式), 自動延遲時間(預設0)
    ],
    insertImgAF: () => {
        //插入圖片後要執行的代碼
        code;
    },
    go: 1, //insertImg配套選項，圖片插入在頁面偏下位置時，滾動至第一張大圖的位置。
    customTitle: ".title", //元素選擇器取得元素的字串。
    customTitle: () => {
        code;
        return text;
    },
    observerTitle: true, //觀察元素變化重新取得標題字串，用於SPA網頁
    autoDownload: [1, time], //1載入頁面後立即開始下載，與next搭配可以實現全自動下載，time延遲幾秒後點擊下一頁(預設5)。
    next: "//a[text()='下一章']", //設定下一頁元素綁定右方向鍵點擊下一頁。
    next: () => {
        code;
        return link;
    },
    observerURL: true, //觀察URL變化重新取得標題字串和nextLink，用於SPA網頁
    observerNext: true, //觀察元素變化重新取得nextLink
    observerNext: ".read_nav", //指定觀察元素的子元素變化重新取得nextLink
    prev: "//a[text()='上一章']", //設定上一頁元素綁定左方向鍵點擊上一頁，填1則使用history.back();。
    css: "css", //插入自訂樣式，基本上就是用來隱藏廣告用的。
    autoClick: "元素", //載入頁面後點擊一次此元素，能簡單做到自動簽到、展開目錄、Show All
    autoClick: ["元素", 1000], //元素,延遲毫秒時間(預設1000)
    observerClick: "元素", //使用Intersection Observer API，元素進入可視範圍內才點擊
    loadMore: "元素", //監聽scroll事件，滾至頁面底部時點擊元素，能簡單做到自動載入更多
    openInNewTab: ".manga-cover>a:not([target=_blank])", //指定的A元素在新分頁開啟
    topButton: true, //添加返回頂部按鈕
    threading: 1, //有些網站限制連接數，下載連接數太大容易出錯，適當降低連接數。
    fetch: 1, //使用Fetch API下載圖片，需要圖片下載請求的伺服器有開放CORS。
    referer: "src", //下載圖片時傳遞的參照頁，預設是使用當前網址，"src"參照頁為圖片網址，也能自訂如"https://www.example.com/"或空""
    infiniteScroll: true, //漫畫類標記有無限滾動模式
    category: "comic" //類別nsfw1、nsfw2、hcomic、comic、lazyload、ad、none
}, {
    name: "規則2",
    enable: 0,
    icon: 0,
    key: 0,
    reg: /www\.xxxxx\.com/,
    reg: [
        //,
        //
    ],
    reg: () => {
        if (code) {
            return true;
        }
        return false;
    },
    reg: () => fun.checkUrl({
        h: "",
        p: "",
        s: "",
        e: "",
    }),
    delay: 300,
    include: "",
    include: [""],
    exclude: "",
    exclude: [""],
    init: "code",
    init: () => {
        code
    },
    imgs: "",
    imgs: () => {
        code
    },
    repeat: 1,
    thums: ".thums",
    scrollEle: ["", 500],
    scrollEle: async () => {
        …code;
    },
    button: [4],
    insertImg: ["", 0, time],
    insertImg: [
        ["", 1, ""], 2, time
    ],
    insertImgAF: () => {
        code
    },
    go: 1,
    customTitle: "",
    customTitle: () => {
        code
    },
    customTitle: () => fun.dt({
        s: "",
        d: ""
    }),
    observerTitle: true,
    autoDownload: [1, time],
    next: "",
    next: () => {
        code
    },
    prev: "",
    observerURL: true,
    observerNext: true,
    css: "",
    autoClick: "",
    autoClick: ["", time],
    observerClick: "",
    loadMore: "",
    openInNewTab: "",
    topButton: true,
    threading: 1,
    fetch: 1,
    referer: "src",
    category: ""
}, {
    name: "規則3",
    …
}]
</pre>
<pre>
// 網站自帶燈箱功能，不注入FancyboxCSS樣式
fancybox: {
    v: 3,
    css: false
},
// 不使用燈箱功能
fancybox: {
    blacklist: 1
},
// 頁面注入代碼，使用Fancybox3.5.7
fancybox: {
    v: 3,
    insertLibrarys: 1
},
// 頁面注入代碼，使用Fancybox5
fancybox: {
    v: 5,
    insertLibrarys: 1
},
</pre>
</details>
<h1>自動翻頁規則示例：</h1>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
    <p>簡易實現自動翻頁功能，圖片全載的實驗性輔助功能，需要動態加載的大多都翻不了。</p>
    <p>點擊標題分隔條和雙擊頁面空白處，暫停或啟用自動翻頁。</p>
    <p>需要更高級的自動翻頁功能請使用東方永頁機。</p>
<pre>
變量doc初始為當前頁的document，當獲取下一頁後為下一頁的document物件
舉例選取元素
doc.querySelector(selector)
[...doc.querySelectorAll(selector)]
fun.ge(selector, doc)
fun.gae(selector, doc)
</pre>
<pre>
{
    name: "哈哈漫画 www.hahacomic.com 分類自動翻頁",
    enable: 1,
    reg: /^https:\/\/www\.hahacomic\.com\/manhua\/list\.html/,
    autoPager: {
        ele: ".mdui-col-lg-2",
        observer: ".mdui-col-lg-2",
        next: (doc) => {
            let next = doc.querySelector("span.current+a");
            if (next) {
                let num = next.getAttribute("href").match(/\d+/)[0];
                return location.href.replace(/\?page=\d+/, "") + "?page=" + num;
            } else {
                return null;
            }
        },
        re: ".pages"
    },
    category: "autoPager"
}, {
    name: "規則範例",
    enable: 1,
    reg: /^https:\/\/.+/,
    autoPager: {
        mode: 0, //0(預設可省略)靜態翻頁使用Fetch API加載下一頁，1動態翻頁使用iframe框架加載下一頁，"json"請求的資料格式是JSON會存為變量siteJson。
        waitEle: "selector", //mode為1時等待直到指定的元素出現，不需要則省略，預設使用主體元素選擇器。
        loadTime: 200, //mode為1時給iframe框架讀取的時間，預設200可省略。
        frameCode: `
            //mode為1時要注入到iframe裡運行的代碼，由於是字串特殊字元需要轉譯，例如\要表達為\\
            //會改變腳本的frameWindow變量從當前window變為iframe的window
            //可參照8Comic無限動漫自動翻頁規則的用法
        `,
        ele: "selector", //下一頁主體元素選擇器
        ele: (dom) => { 
            //2種寫法
            //1.創建元素和插入元素皆由此函式完成
            //2.創建元素陣列返回元素陣列，搭配pos決定元素插入位置
            code;
            return [...elements];
        },
        pos: ["selector", 0], //[插入下一頁主體元素的基準元素, 0裡面1之前2之後]，預設為主體元素最後一個之後，可省略。
        next: "selector", //下一頁A元素選擇器
        next: (dom) => { 
            code;
            return url;
        },
        wait: async () => { 
            //請求完下一頁後要優先執行的代碼
            //用於改變腳本變量globalImgArray、tempNextLink、customTitle，方便後續調用
            //可參照拷貝漫畫M自動翻頁規則的用法
            code;
            return Promise;
        },
        re: "selector", //替換元素，下一頁的元素替換到當前頁面的相同的元素，如標題、頁碼條，不需要則省略。
        observer: "selector", //用來觸發翻下一頁的元素，有多個元素時取最後一個元素，觸發時機為當元素進入可視範圍時，不使用則省略。
        stop: (dom) => {
            //根據判斷結果返回布林值boolean停止翻頁。
            code;
            if (code) {
                return true
            }
            return false
        },
        showTitle: 0, //0不顯示下一頁的標題分隔條，顯示則省略。
        pageNum: "span.current", //頁數文字選擇器，標題文字簡略為Page 2
        pageNum: (dom) => {
            return num;
        },
        title: (dom) => { //完整定義標題文字
            //自定義標題分隔條要顯示的文字，不使用則省略。
            code;
            return titleText;
            //先經過代碼判斷返回obj。
            return {
                ok: (true添加標題,false不添加),
                text: titleText;
            }
        },
        hide: "selector", //暫時隱藏元素，當暫停翻頁或最後一頁時取消隱藏。
        bottom: 1000, //不使用observer時，滾動到距離頁面底部剩餘多少高度px時觸發翻下一頁，預設為當前視窗可視範圍的高度screen.height可省略。
        sleep: 1000, //翻頁事件注入的間隔時間ms，預設1000可省略。
        history: 1, //1翻頁後添加瀏覽器歷史紀錄，0不添加，預設1可省略。
        loading: "msg", //自動翻頁載入中顯示gif或訊息，gif(預設可省略)，msg顯示在畫面中間的文字訊息
        lazySrc: "selector", //有元素圖片網址放在dataset屬性，IMG元素的src直接使用dataset，DIV、A元素創建style.backgroundImage顯示dataset圖片
        script: "//script[contains(text(),'eval')]", //下一頁腳本選擇器，將下一頁的腳本代碼插入到當前頁改變變量，不需要則省略。
        bF: (dom) => {
            //插入下一頁元素之前要執行的代碼，不需要則省略
        },
        aF: (dom) => { 
             //插入下一頁元素之後要執行的代碼，不需要則省略
        }
    },
    category: "autoPager"
}
</pre>
</details>
<h1>內置函式：</h1>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
<pre>
//匹配網址和頁面元素，用於規則reg是函式的寫法
//h = hosts 匹配網站的域名，格式可為字串、正則、字串或正則的陣列
//p = pathname 匹配網址的路徑，格式可為字串或正則
//s = search 匹配網址的搜尋，格式可為字串或正則
//e = elements 匹配網頁的元素選擇器，格式可為字串或陣列，如為陣列則網頁必須匹配到陣列裡的所有選擇器
//規則屬性imgs和customTitle如為字串，會自動判斷頁面元素
const object = {
    //String or RegExp or Array [String or RegExp]
    h: [
        "example.com",
        /^example\.com$/
    ],
    //String or RegExp
    p: "",
    //String or RegExp
    s: "",
    //String or Array [String]
    e: [
        "selector"
    ]
}
fun.checkUrl(object);
</pre>
<pre>
//返回一個指定元素，支持CSS/Xpath選擇器
fun.ge("selector");
fun.ge("selector", doc = document);
fun.ge("selector", node);
fun.ge(String, HTMLDocument or HTMLElement);
</pre>
<pre>
//返回指定的所有元素的陣列，支持CSS/Xpath選擇器
fun.gae("selector");
fun.gae("selector", doc = document);
fun.gae("selector", node);
fun.gae(String, HTMLDocument or HTMLElement);
</pre>
<pre>
//取得指定的A元素的href
fun.gu("selector");
fun.gu("selector", doc = document);
fun.gu(String, HTMLDocument or HTMLElement);
</pre>
<pre>
//取得指定的所有A元素的hre的陣列
fun.gau("selector");
fun.gau("selector", doc = document);
fun.gau(String, HTMLDocument or HTMLElement);
</pre>
<pre>
//取得元素的字串
//mode
//1返回指定元素的字串(預設)
//2返回指定元素的上一個元素的字串
//3返回指定元素的上上一個元素的字串
fun.gt("selector");
fun.gt("selector", mode = 1, doc = document);
fun.gt(String, Number, HTMLDocument or HTMLElement);
</pre>
<pre>
//刪除指定字串返回字串
s = selector 元素選擇器
t = text 文字字串
d = delete 要刪除的字串，格式可以是字串、正則 、字串或正則的陣列
const objetc = {
    s: String,
    t: String,
    d: String or RegExp or Array
}
fun.dt(objetc);
舉例
用於刪除元素的字串
{
    s: "h1",
    d: /\(\d+P\)/
}
用於刪除字串
{
    t: "aaabbb",
    d: "bbb"
}
用於刪除網頁標題的字串
{
    d: "example.com"
}
</pre>
<pre>
//取得非外部引入的script的字串
//searchValue，關鍵字串或正則表達式
fun.gst(searchValue);
fun.gst(searchValue, doc = document);
fun.gst(String or RegExp, HTMLDocument or HTMLElement);
</pre>
<pre>
//取得元素屬性的值
fun.attr("selector","屬性");
fun.attr("selector","屬性", doc = document);
fun.attr(String, String, HTMLDocument or HTMLElement);
</pre>
<pre>
//創建一個DIV用來放圖片，#FullPictureLoadMainImgBox
//pos 0，添加進指定的元素裡面
//pos 1，插入在指定的元素之前
//pos 2，插入在指定的元素之後
fun.createImgBox("selector");
fun.createImgBox("selector", pos = 0);
fun.createImgBox(String, Number);
</pre>
<pre>
//指定元素選擇器或元素陣列，返回過濾出圖片網址的陣列。
//IMG、DIV、A、SPAN、LI、FIGURE，支持dataset和backgroundImage
//不判斷srcset是因為不是所有網站都遵循srcset屬性的格式
fun.getImgSrcArr("selector");
fun.getImgSrcArr("selector", doc = document);
fun.getImgSrcArr(String, HTMLDocument or HTMLElement);
fun.getImgSrcArr(Array [HTMLElement]);
</pre>
<pre>
//指定圖片選擇器或圖片元素陣列，返回過濾出圖片網址的陣列。
//主要用於提取IMG的srcset屬性，也支持dataset和backgroundImage
fun.getImgSrcset("img selector");
fun.getImgSrcset("img selector", doc = document);
fun.getImgSrcset(String, HTMLDocument);
fun.getImgSrcset(Array [HTMLImageElement]);
</pre>
<pre>
//對document.title的字串修改
//mode
//0返回【刪除指定字串的標題(預設)】
//1返回【字串切割取[0]去前後空白】
//2返回【字串切割[0] + "字串" + 字串切割[1]】
//3返回【字串切割[1] + "字串" + 字串切割[0]】
fun.title("字串");
fun.title("字串", mode, doc = document);
fun.title(String or RegExp, Number, HTMLDocument);
</pre>
<pre>
//觀察元素變化執行callback
fun.addMutationObserver(callback, config = MutationObserverConfig, node = document.body);
fun.addMutationObserver(Function or AsyncFunction, Object, HTMLElement);
</pre>
<pre>
//將字串解析成document物件
//搭配fetch(url).then(res => res.text())返回的原始碼使用
fun.doc("字串");
fun.doc(String);
fetch(url).then(res => res.text()).then(text => {
    let doc = fun.doc(text);
    let ele = fun.ge("selector", doc);
    return ele;
})
</pre>
<pre>
//將字串解析成xml物件
fun.xml("字串");
fun.xml(String);
</pre>
<pre>
//顯示簡短訊息
//time ms，0持續顯示
fun.showMsg("字串", time = 1000);
fun.showMsg(String, Number);
</pre>
<pre>
//隱藏簡短訊息
fun.hideMsg();
</pre>
<pre>
//延遲運行async/await
//time ms
//msg，0不顯示訊息
await fun.delay(time, msg = 1);
fun.delay(Number, Number);
</pre>
<pre>
//等待元素async/await
//間隔100毫秒判斷一次，有元素返回元素超過循環次數返回null。
//max，循環的次數
await fun.waitEle("selector");
await fun.waitEle("selector", max = 200, doc = document);
fun.waitEle(String, Number, HTMLDocument or HTMLElement);
</pre>
<pre>
//等待window物件屬性環境變量
//max，循環的次數
await fun.waitVar("declares");
await fun.waitVar("declares", max = 200);
fun.waitVar(String, Number);
</pre>
<pre>
//等待函式寫法，最大循環300次100ms，30秒。
//callback返回真假值或物件，undefined、null、NaN識別為false。
let callback = (dom, win) => {
    return dom.querySelector("img") && ("jQuery" in win);
};
await fun.wait(callback, dom = document, win = window);
fun.wait(Function or AsyncFunction, HTMLDocument, Window);
</pre>
<pre>
//功能基本等同eval()
fun.run("code");
fun.run(String);
</pre>
<pre>
//創建空陣列，取代[] for push()的寫法
//num陣列的長度
fun.arr(num);
fun.arr(num).map((_, i) => {
    return (i + 1);
});
fun.arr(Number);
</pre>
<pre>
//移除元素
//time ms，延遲的時間
//Promise可以用await
fun.remove("selector");
fun.remove("selector", time = 0);

//如果需要多個選擇器並且CSS/Xpath混寫可寫成數組
let selectors = ["cssSelector" , "XpathSelector"]
fun.remove(selectors, time = 0);
fun.remove(String or Array, Number);
</pre>
<pre>
//清除所有setTimeout和setInterval定時器
//用匿名函式對付匿名函式，可以解決一部份不讓人打開F12開發人員工具的問題
//mode0，預設運行全部
//mode1，Function.prototype.constructor = () => {};
//mode2，只清setTimeout;
//mode3，只清setInterval;
fun.clearAllTimer(mode = 0);
fun.clearAllTimer(Number);
</pre>
<pre>
//插入樣式，需要先用JS判斷的情況用這個
fun.css("css");
fun.css(String);
</pre>
<pre>
//插入A元素;
//url 網址
//selector 元素選擇器
//pos
//0在元素之前
//1在元素之後
//2在元素裡面，最後一個子元素之後
//3在元素裡面，第一個子元素之前。
//text 字串
fun.addUrlHtml("url", "selector", pos = 0, "text");
fun.addUrlHtml(String, String, Number, String);
</pre>
<pre>
//創建script元素
fun.script(string, number= 0, number = 0, doc = document);
//返回script
fun.script("code");
//插入到document.body
fun.script("code", 0, 1);
//src插入到document.body
fun.script("srcUrl", 1, 1);
</pre>
<pre>
//依序自動滾動元素
//selector 元素選擇器
//ms 滾動的間隔時間
//top 1滾動完後返回頂部0部返回
fun.scrollEles("selector", ms = 100, top = 1);
fun.scrollEles(String, Number);

//依序自動滾動元素EX
//selector 元素選擇器
//callback判斷
//time判斷逾時的時間
//top 1滾動完後返回頂部0部返回
fun.aotoScrollEles("selector", callback, time = 5000, top = 1);
fun.aotoScrollEles(String, Function or AsyncFunction, Number);
//callback例子
//ele參數為滾動的元素自身，此例為判斷元素的子元素有沒有出現img[src]
let callback = (ele) => fun.ge("img[src]", ele);
//此例為判斷元素的src屬性是否已經轉為BlobURL
let callback = (img) => /^blob/.test(img.src);

//也可以用於動態捕獲，有些網站會動態創建元素，進入可視範圍才創建新元素，並且可能也會刪除之前創建的元素。
let arr = [];
await fun.aotoScrollEles("img.gallery-item", (ele) => {
    if (/\/media\//.test(ele.src)) {
        arr.push(ele.src);
        return true;
    } else {
        return false;
    }
}, 1000);
return [...new Set(arr)];
</pre>
<pre>
//確認元素和圖片網址，嘗試取得網址和補全網址 返回一個obj。
{
    ok: Boolean, //成功true失敗false
    src: src //成功返回圖片網址
}
fun.checkImgSrc(HTMLElement);
//可以使用封裝好的fun.getImgSrcArr();
</pre>
<pre>
//確認元素有沒有把圖片原始網址放在src以外的屬性
{
    ok: Boolean, //成功true失敗false
    src: src //成功返回圖片網址
}
fun.checkDataset(HTMLElement);
//可以使用封裝好的fun.getImgSrcArr();
</pre>
<pre>
//確認圖片狀態屬性 返回一個obj
{
    ok: Boolean, //成功讀取true失敗false
    width: width, //成功返回圖片寬屬性
    height: height //成功返回圖片高屬性
}
await fun.checkImgStatus(src);
fun.checkImgStatus(String);
</pre>
<pre>
//確認加了CDN的圖片網址是否有效，無效則刪除CDN返回原始來源的圖片網址				
<p>//wsrv.nl，i0.wp.com</p>
await fun.checkImageCDN([圖片網址陣列]);
fun.checkImageCDN(Array);			
</pre>
<pre>
//網頁圖片src屬性開頭是blob:的，只能通過再繪製轉換來取得，無法繪製跨域的圖片，會出現跨域汙染的錯誤。
//selector，canvas、img元素選擇器
//type轉換的圖片類型"image/jpeg"、"image/webp"、"image/png"
//quality 壓縮比率 0 ~ 1
//返回BlobURL
fun.imgToBlobURL("selector", type = "image/jpeg", quality = 1);
fun.imgToBlobURL(String, String, Number);
//例子
[...fun.gae(".mh_comicpic img[src^=blob]")].map(e => fun.imgToBlobURL(e));
</pre>
<pre>
//封裝fun.imgToBlobURL函式。
//selector，canvas、img元素選擇器
//type轉換的圖片類型"image/jpeg"、"image/webp"、"image/png"
//quality 壓縮比率 0 ~ 1
//返回BlobURL陣列
fun.imgBlobUrlArr("selector", type = "image/jpeg", quality = 1);
fun.imgBlobUrlArr(String, String, Number);
//例子1
fun.imgBlobUrlArr(".mh_comicpic img[src^=blob]");
//例子2
fun.imgBlobUrlArr(".image>img");
</pre>
<pre>
//使用Promise封裝GM_xmlhttpRequest
//只取得回應標頭，不接收完整資料，快速確認鏈結的存活狀態。
fun.xhrHEAD("url");
let status = await fun.xhrHEAD("url").then(res => res.status);
let res = await fun.xhrHEAD("url");
let status = res.status;
if (status == 200) {
    code
} else if (status == 404) {
    code
}
fun.xhrHEAD(String);
</pre>
<pre>
//使用Promise封裝GM_xmlhttpRequest
//傳入鏈結陣列抓取免空圖床的圖片，返回圖片網址的陣列
//imx.to、imagebam、postimg...等等
fun.getImageHost([links]);
fun.getImageHost(Array);
</pre>
<pre>
//使用Promise封裝GM_xmlhttpRequest
//需要跨域CORS、更改參照頁，更改瀏覽器UA時可用。
fun.xhr("url", details = {});
fun.xhr("url", {
    responseType: "json"
}).then(json => {
    console.log("測試json", json);
})
fun.xhr("url", {
    responseType: "blob"
}).then(blob => {
    console.log("測試blob", blob);
})
fun.xhr(String, Object);
</pre>
<pre>
//使用Promise封裝GM_xmlhttpRequest，返回經過文字編碼的document，避免字元亂碼，需要跨域時使用。
fun.xhrDoc("url", details = {})
fun.xhrDoc("url", {
    headers: {
        "Referer": location.href,
         "User-Agent": navigator.userAgent
    }
})
fun.xhrDoc("url").then(doc => {
    console.log("測試doc", doc);
})
fun.xhrDoc(String, Object);
</pre>
<pre>
//使用Fetch API，返回經過文字編碼的document，避免字元亂碼。
//無法修改User-Agent
fun.fetchDoc("url", details = {});
fun.fetchDoc("url").then(doc => {
    console.log("測試doc", doc);
})
fun.fetchDoc(String, Object);
</pre>
<pre>
//必須同源不能跨域
//使用Promise封裝iframe框架，返回iframe框架的document。
//selector元素選擇器指定等待到元素出現(必須)
//time框架載入逾時的時間
let callback = (dom, frame) => { //參數dom為iframe的document，參數frame為iframe的contentWindow
    自由發揮
}
await fun.iframeDoc("url", "selector", time = 5000, callback);
fun.iframeDoc(String, String, Number, Function or AsyncFunction);
</pre>
<pre>
//必須同源不能跨域
//使用Promise封裝Fetch API搭配iframe框架，返回iframe框架的document。
//fetch()取得html原始碼傳入iframe框架，需要用iframe框架加載網頁，網站卻又容易卡住逾時時使用，fetch()逾時524或發生400以上錯誤碼，自動重試。
//selector元素選擇器指定等待到元素出現(必須)
//time框架載入逾時的時間
let callback = (dom, frame) => { //參數dom為iframe的document，參數frame為iframe的contentWindow
    自由發揮
}
await fun.iframeSrcDoc("url", "selector", time = 5000, callback);
fun.iframeSrcDoc(String, String, Number, Function or AsyncFunction);
</pre>
<pre>
//必須同源不能跨域
//使用Promise封裝iframe框架，等待至指定的環境變量出現，返回iframe框架的contentWindow。
let iframe = await fun.iframeVar("url", "declares", time = 1000);
fun.iframeVar(String, String, Number);
</pre>
<pre>
//必須同源不能跨域
//使用Promise封裝iframe框架，讓調用iframe框架能像fetch的寫法
const details = {
    loadTime: 1000, //框架的讀取時間
    waitEle: "img", //指定等待框架直至出現該元素的選擇器
    waitVar: "newImgs", //指定等待框架直至出現該環境變量
    cb: async (dom, frame) => {
        console.log(dom); //iframe的document
        console.log(frame); //iframe的contentWindow
        //同源可以先行對iframe創建script注入代碼，修改contentWindow屬性環境變量，修改document文檔
    }
}
const iframe = await fun.iframe("url", details);
const {
    dom, //iframe的document
    frame //iframe的contentWindow
} = iframe;
const srcs = frame.newImgs;
console.log(srcs);

fun.iframe("url", details).then(object => {
    const {
        dom,
        frame
    } = object;
    console.log(dom);
    console.log(frame);
});

fun.iframe(String, Object);
</pre>
<pre>
//xhr抓取元素，不局限於圖片
//links網址陣列
//selector要抓的元素
//"targetEle"清空此元素放入allEle
//["targetEle", pos] targetEle目標選擇器，pos放在此元素的位置，0裡面1之前2之後
//time請求發送的間隔毫秒
await fun.getEle([links], "selector", targetEle, removeEle = null, time = 100);
fun.getEle(Array, String, String or Array [String, Number], String or null, Number);
//跨域
await fun.getCorsEle([links], "selector", targetEle, removeEle = null, time = 100);
fun.getCorsEle(Array, String, String or Array [String, Number], String or null, Number);
</pre>
<pre>
//xhr抓取圖片元素，返回圖片網址 (只支持靜態網頁，無法跨域請求)
//max填入用fun.gt()取得最大頁數的數字，或想辦法算出最大頁數的數字。
//mode網址頁碼數字遞增模式
//第一頁 ==> 第二頁
//mode1(預設)
.html ==> .html?page=2
 ==> ?page=2
//mode2
.html ==> /2.html
//mode3
.html ==> _1.html
//mode4
/ ==> /2/
//mode"4"
 ==> /2
//mode5
.html ==> -2.html
//mode"5"
-1.html ==> -2.html
//mode6
?p=1 ==> ?p=2
//mode7
/1 ==> /2
.html ==> .html/2
//mode8
==> &page=1
//mode"8"
==> &page=2
//mode9
.html ==> _2.html
//mode10
.html ==> .html/2
//mode11
/ ==> /2.html
/1.html ==> /2.html
//mode12
/ ==> /2.htm
/1.htm ==> /2.htm
//mode13
-1-* ==> -2-*
//mode14
/1/ ==> /2/
//mode15
/ ==> /index_2.html
/index.html ==> /index_2.html
//mode16
 ==> /2#list
//mode17
.htm ==> _2.htm
//mode18
/ ==> /page/2/
//mode19
-1 ==> -2
//mode20
 ==> -p-2
//IMG、DIV、A、SPAN、LI、FIGURE，6種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A取href屬性。
fun.getImg("元素選擇器",max ,mode ,["圖片網址用來替換的字串","圖片網址要被替換的字串"], 請求發送的間隔毫秒)
fun.getImg("selector", max, mode = 1, rText = [null, null], time = 100);
fun.getImg(String, Number, Number, Array [String or RegExp, String] or null, Number);

//獨立出來的可調用函式，返回修改後的鏈結
fun.getModeUrl("url", mode, num);
</pre>
<pre>
//xhr抓取圖片元素，返回圖片網址的陣列
//fun.getImgO基本同fun.getImg，但使用單線程獲取網頁,能設置獲取網頁的間隔時間，類翻頁模式。
//IMG、DIV、A、SPAN、LI、FIGURE，6種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A取href屬性。
fun.getImgO("元素選擇器", max, mode, ["圖片網址用來替換的字串", "圖片網址要被替換的字串"], time(延遲請求下一頁的時間預設200毫秒), "替換頁碼條元素", 0(不顯示獲取訊息))
fun.getImgO("selector", maxPage = 1, mode = 1, rText = [null, null], time = 200, paginationEle = null, msg = 1)
fun.getImgO(String, Number, Number, Array [String or RegExp, String] or null, Number, String or null, Number);
</pre>
<pre>
//fun.getImgIframe基本同fun.getImg，使用iframe框架單線程獲取網頁,能讓網頁運行必要的javaacript。
fun.getImgIframe("圖片元素選擇器", max, mode, "替換頁碼條元素", time(給予框架讀取的時間), 0 不顯示獲取訊息)
fun.getImgIframe("img selector", max, mode, paginationEle = null, time = 1000, showMsg = 1)
fun.getImgIframe(String, Number, Number, String or  null, Number, Number)
</pre>
<pre>
//xhr抓取圖片元素，返回圖片網址的陣列
//mode
//0多線程(預設)
//1單線程
//2單線程，類翻頁模式
//數字大於等於100，請求間隔模式單位毫秒。
//A元素選擇器的href屬性不能是#和javascript或onclick監聽點擊事件，必須是一般的http鏈接。
//A元素參數可以傳入自己創建的網址陣列
//IMG、DIV、A、SPAN、LI、FIGURE，6種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A取href屬性。
fun.getImgA("元素選擇器", "A元素選擇器", mode, ["圖片網址要替換的字串", "圖片網址要被替換的字串"], 0 不顯示獲取訊息)
fun.getImgA("selector", "a selector", mode = 0, rText = [null, null], showMsg = 1);
fun.getImgA("元素選擇器", "A元素選擇器");
fun.getImgA("元素選擇器", [網址陣列]);
fun.getImgA(String, String or Array, Number, , Array [String or RegExp, String] or null, Number);
</pre>
<pre>
//xhr抓取圖片元素，可跨域抓圖片，返回圖片網址的陣列
//IMG、DIV、A、SPAN、LI、FIGURE，6種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A取href屬性。
fun.getImgCorsA("元素選擇器", "A元素選擇器", time = 100);
fun.getImgCorsA("元素選擇器", [網址陣列], time = 100);
fun.getImgCorsA(String, String or Array, Number);
</pre>
<pre>
//翻頁模式聚集圖片或是含A元素的預覽縮圖然後fun.getImgA()
fun.getNP("元素選擇器", "下一頁元素元素選擇器或函式", "判斷為最後一頁的元素選擇器或函式", "替換元素選擇器", time(延遲請求下一頁的時間預設0毫秒), dataset = null, 顯示訊息 = 1)
//判斷為最後一頁的函式舉例
//參數doc是下一頁的document
const last = doc => {
    let ele = fun.ge("#showmore", doc);
    return ele.dataset.page >= ele.dataset.max;
}
const last = doc => {
    let currentPage = fun.ge("#pagenum", doc).innerText.match(/\d+/)[0]; //下一頁的當前頁數
    let totalPage = fun.ge("#pagenum", doc).innerText.match(/\/(\d+)/)[1]; //下一頁的最大頁數
    return currentPage >= totalPage ? true : false; //當前頁數大於等於最大頁數是最後一頁
}
await fun.getNP("selector", "nextLinkEle", lastEle, "paginationEle", time, dataset, msg);
await fun.getNP("selector", "nextLinkEle");
fun.getNP(String, String, String or Function or AsyncFunction, String or null, Number, String, Number);
//用在規則imgs
//應用在包子漫畫的用法
imgs: async () => {
    await fun.getNP(".comic-contain>div:not(.mobadsq)", "//a[contains(text(),'下一頁') or contains(text(),'下一页')]", null, ".comic-chapter>.next_chapter");
    let arr = [...fun.gae(".comic-contain amp-img")].map(e => e.getAttribute("src"));
    return [...new Set(arr)]
}
//應用在小黃書的用法
imgs: async () => {
    await fun.getNP(".photos>a", ".pager a[current=true]+a:not(.next)", null, ".pager");
    return [...fun.gae(".cr_only")].map(e => e.src.replace("_600x0", ""));
}
</pre>
</details>
<h1>腳本的操作步驟方式：</h1>
<p>點擊左下圖示、確定，2步開始下載</p>
<p>右鍵點擊圖示複製圖片網址，如果規則設置了insertImg，按右鍵是先插入全部圖片，第二次按才是複製圖片網址。</p>
<p>PS：需重複獲取原始圖片元素的規則，無法複製圖片網址，例如Civitai。</p>
<p>中鍵點擊圖示匯出網址MediaURLs.txt文件</p>
<p>觸控裝置，長按頁面圖片元素500毫秒，規則insertImg設置為手動則插入圖片或複製圖片網址。</p>
<h1>圖介：</h1>
<p>在頁面左下添加了一個圖片下載按鈕</p>
<img src="https://i.imgur.com/TxnEvTk.png">
<p>點擊後會彈出輸入資料夾名稱確認窗</p>
<img src="https://i.imgur.com/M0IMf5G.png">
<p>確認後就會開始下載壓縮打包圖片</p>
<img src="https://i.imgur.com/m6ewqQd.png">
<h1>腳本有綁定按鍵</h1>
<p>數字鍵 0 下載壓縮</p>
<p>數字鍵 1 複製圖片網址或手動模式的插入圖片</p>
<p>數字鍵 2 滾動至第一張大圖</p>
<p>數字鍵 3 一鍵下載</p>
<p>數字鍵 4 滾動至最後一張大圖</p>
<p>數字鍵 5 切換圖片顯示模式，原始模式和並排模式</p>
<p>數字鍵 6 有自動滾動元素規則時調用</p>
<p>數字鍵 7 匯出網址MediaURLs.txt文件</p>
<p>數字鍵 8 開啟新空白頁載入圖集圖片</p>
<p>數字鍵 9 打開/關閉自訂網站收藏集</p>
<p>數字鍵 - 減鍵圖片以10%為單位比例縮小，會記憶縮放比例</p>
<p>數字鍵 + 加鍵圖片以10%為單位比例放大，會記憶縮放比例</p>
<p>數字鍵 . 點鍵取消縮放恢復為自動</p>
<p>數字鍵 * 乘鍵顯示選項設定。</p>
<p>數字鍵 / 除鍵初始化當前網站的設定。</p>
<p>Delete鍵 並排模式下當為漫畫類和並排數為2的H漫類，用於切換隱藏顯示第一張圖片，當沒有剛好並成雙頁跨頁大圖時使用。</p>
<p>組合鍵 Ctrl + . 開始或取消自動下載，網站需有必要的相關規則。</p>
<p>組合鍵 Ctrl + Alt + T 頁面選取文字後，按此快捷鍵可以快速設定為腳本用的圖集標題，沒有選取文字也會彈出輸入框能手動輸入自訂標題。</p>
<br>
<p>按0、Enter，2步驟開始下載。</p>
<p>按1，複製圖片網址，如果設置了insertImg為手動，按1、Enter是插入圖片，第二次按是複製圖片網址。</p>
<p>按2，滾動至腳本插入的第一張大圖</p>
<p>按3，一鍵下載，跳過自定義標題的步驟。</p>
<br>
<p>PS：需重複獲取原始圖片元素的規則，按1無法複製圖片網址，需點擊頁面功能按鈕或浮動選單按鈕的複製圖址。</p>
<h1>圖片檢視模式</h1>
<p>1.圖片置中模式</p>
<p>上方向鍵跳轉到目前的上一張圖、下方向鍵跳轉到目前的下一張圖</p>
<br>
<p>2.圖片並排模式</p>
<p>上方向鍵跳轉到目前的上一排圖、下方向鍵跳轉到目前的下一排圖</p>
<p>漫畫類當跳轉至最後一排後，繼續按下方向鍵會嘗試前往下一集。</p>
<p>所謂的目前是變量記憶的位置，並非當前瀏覽範圍的位置，滑鼠滾動變換位置不會改變變量。</p>
<p>按了上方向鍵和下方向鍵以外的鍵後會再從頭開始跳轉。</p>
<br>
<p>如果漫畫站的圖片並排後，圖片高度小於大於瀏覽範圍的高度，需要手動調整瀏覽器的縮放來適配達到最佳的觀看效果。</p>
<p>Chrome內建的縮放跨度太大，建議安裝縮放 for Google Chrome，可以以10%、5%來縮放</p>
<br>
<p>3.Fancybox模式</p>
<p>點擊腳本插入的圖片開啟Fancybox圖片燈箱展示功能</p>
<p>右和下方向鍵下一張圖(不會觸發前往下一頁)，左和上方向鍵上一張圖(不會觸發前往上一頁)。</p>
<br>
<p>4.分頁檢視模式</p>
<p>左下有浮動選單區塊，鼠標懸停彈出顯示。</p>
<p>W鍵、A鍵、上左方向鍵跳轉到目前的上一張圖、S鍵、D鍵、下右方向鍵跳轉到目前的下一張圖</p>
<p>數字鍵 0 切換為圖片高度符合視口高度的預設模式</p>
<p>數字鍵 1 切換為單圖置中模式</p>
<p>數字鍵 2 切換為小尺寸圖片並排模式</p>
<p>數字鍵 3 切換為圖片高度符合視口高度且順序右至左的模式</p>
<p>Delete鍵 模式為3時用於切換隱藏顯示第一張圖片，當用來看漫畫但遇到雙頁的跨頁大圖，偏偏錯開差一張圖沒形成跨頁大圖，此時隱藏首張圖片就可並成跨頁大圖。</p>
<p>PS：網站如果有Content Security Policy (CSP)限制，將沒有切換模式、圖片跳轉、Fancybox功能，或者莫名其妙不能使用window.open()，將無法使用分頁檢視功能。</p>
<br>
<h1>腳本共存</h1>
<p>為了與東方永頁機共存不會造成衝突，也不需要兩邊開開關關的，整理了東方永頁機黑名單。</p>
<p>2024/08/01 06:40</p>
<p>https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/Pagetual_Blacklist.txt</p>
<p>除了東方永頁機禁用規則外的完整東方永頁機黑名單，複製貼上即完事。
<p>
<p>https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/Pagetual_Full_Blacklist.txt</p>
<h1>腳本截圖</h1>
<p>陽春簡易的圖片清單瀏覽模式，和閱讀順序由右至左的漫畫閱讀模式。實現鍵盤瀏覽漫畫，功能只求簡單實用。</p>
<br>
<img src="https://i.imgur.com/xZN2uj7.jpg">
<img src="https://i.imgur.com/J0Sz9ri.jpg">
<img src="https://i.imgur.com/z0p8wbT.jpg">
<img src="https://i.imgur.com/OibRD2N.jpg">
<h2>自定義編輯網站收藏說明</h2>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
    <p>基本格式</p>
    <p>name,value</p>
    <p>文字顏色</p>
    <pre>text-color,#000</pre>
    <p>背景顏色</p>
    <pre>background-color,#15d3bf</pre>
    <p>網站名稱,網址</p>
    <pre>小黃書,https://xchina.biz/</pre>
    <p>入門，不搞的那麼多花裡胡哨，直接網站名稱,網址。</p>
    <pre>
4KHD,https://www.4khd.com/
小黃書,https://xchina.biz/
8色人體攝影,https://8se.me/
紳士会所,https://www.hentaiclub.net/
</pre>
    <p>進階，統一修改文字顏色和背景顏色。</p>
<pre>
text-color,#111
background-color,#16d4cf
4KHD,https://www.4khd.com/
小黃書,https://xchina.biz/
8色人體攝影,https://8se.me/
紳士会所,https://www.hentaiclub.net/
</pre>
    <p>高階，花裡胡哨，每4個收藏就換一種背景顏色，當然也能穿插改文字顏色。</p>
<pre>
4KHD,https://www.4khd.com/
小黃書,https://xchina.biz/
8色人體攝影,https://8se.me/
紳士会所,https://www.hentaiclub.net/
background-color,#DD7CE8
丝袜客,https://siwake.cc/
萌图社,http://www.446m.com/
图宅网,https://www.tuzac.com/
Models Vibe,https://www.modelsvibe.com/
background-color,#BDE87C
AVJB,https://avjb.com/albums/
HotAsiaGirl,https://hotgirl.asia/
HotGirl World,https://www.hotgirl2024.com/
MIC MIC IDOL,https://www.micmicidol.club/
background-color,#7C87E8
Xasiat,https://www.xasiat.com/albums/
XO福利圖,https://www.xofulitu521.xyz/xoxo
色图,https://setu.lol/
紳士漫畫,https://www.wnacg.com/albums-index-cate-3.html
</pre>
    <p>更多應用方式</p>
    <p>應用一，用醒目的顏色來區分大尺度、清涼、H漫、漫畫。</p>
    <p>應用二，用醒目的顏色來區分喜好度。</p>
    <br>
    <p>線上顏色選擇器</p>
    <a href="https://www.w3schools.com/colors/colors_picker.asp">https://www.w3schools.com/colors/colors_picker.asp</a>
</details>
<h2>※備註</h2>
<p>SPA網頁，腳本如果沒有生效請重新載入，或是先以新分頁的方式開啟鏈結。</p>
<h2>老司機類內置規則支持列表</h2>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
    <table>
        <thead>
            <tr>
                <th>
                    <strong>網站</strong>
                </th>
                <th>
                    <strong>備註</strong>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <a href="https://web.telegram.org/k/">Telegram Web</a>
                </td>
                <td>從Telegram網頁版上的telegra.ph下載圖片，會被CentBrowser(5.0.1002.354)瀏覽器判斷為不安全封鎖下載，請自行決定是否保留檔案，從 <a href="https://tgstat.com/">TGStat</a>搜索cosplay、nsfw、Cosplay鉴赏 ，可以挖到不少你懂得。 </td>
            </tr>
            <tr>
                <td>
                    <a href="https://xchina.biz/">小黃書</a>
                </td>
                <td>
                    <a href="https://xchina.co/">xchina.co</a>， <a href="https://xchina.fun/">xchina.fun</a>， <a href="https://xchina.life/">xchina.life</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://8se.me/">8色人體攝影</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.nlegs.com/">NLegs</a>
                </td>
                <td>
                    <a href="https://www.honeyleg.com/">HoneyLeg</a>， <a href="https://www.ladylap.com/">Lady Lap</a>， <a href="https://www.nuyet.com/">Nuyet</a>， <a href="https://www.legbabe.com/">LegBabe</a>，請使用專用腳本載入大圖， <a href="https://greasyfork.org/scripts/463123">greasyfork.org/scripts/463123</a>，規則有手動插入模式，請在載入所有大圖後對左下圖示按右鍵或數字鍵1或8來使用
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.yalayi.com/">雅拉伊</a>
                </td>
                <td>免VIP僅適用PC版和圖片命名是簡單數字遞增的。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://yskhd.com/">优丝库HD</a>
                </td>
                <td>
                    <a href="https://yskhd.me/">yskhd.me</a>， <a href="https://ysk567.com/">ysk567.com</a>，免VIP
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hentaiclub.net/">紳士会所</a>
                </td>
                <td>
                    <a href="https://www.sshs.pw/">导航页</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.24fa.com/c49.aspx">24FA</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hitxhot.org/">Hit-x-Hot</a>
                </td>
                <td>同格式， <a href="https://hitxhot.com/">Hitxhot Album Archive II</a>， <a href="https://www.dongojyousan.com/">dongojyousan.com</a>， <a href="https://cn.looives.com/">Chinese in beauty</a>， <a href="https://baobua.com/">BaoBua</a>， <a href="https://www.kaizty.com/">www.kaizty.com</a>， <a href="https://www.depvailon.com/">www.depvailon.com</a>， <a href="https://pic.yailay.com/">pic.yailay.com</a>， <a href="https://nungvl.net/">nungvl.net</a>， <a href="https://lootiu.com/">Lootiu.Com</a>， <a href="https://depday.info/">Depday-Info</a>， <a href="https://thismore.fun/">ThisMore.Fun</a>， <a href="https://cosxuxi.club/">CosXuxi Club</a>， <a href="https://redseats.org/">RedSeats.Org</a>， <a href="https://allianceforrabiescontrol.org/">CosXuxi Club</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xinggan5.top/">极品性感美女</a>
                </td>
                <td>
                    <a href="https://www.plmn5.com/">网址发布页</a>，永久域名：尤物网.Com
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xiu01.top/">秀人美女網</a>
                </td>
                <td> 永久域名：Xrmnw.Com 秀人美女.Top </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.1231238.xyz/">秀人集</a>
                </td>
                <td>永久域名Xiurenba.Com及(秀人集.com)</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ikmn05.xyz/">爱看美女网</a>
                </td>
                <td>不支持預覽版頁面，永久域名：ikmn.cc</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.plmn5.cc/">漂亮美女网</a>
                </td>
                <td>不支持預覽版頁面，永久域名：plmn.cc</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.imn5.vip/">爱美女网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://meirentu.cc/">美人图</a>
                </td>
                <td>
                    <a href="https://meirentu.top/">meirentu.top</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.taotu8.cc/">秀套图吧</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.502x.com/xiurenwang.html">秀人图吧</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://rosipic.com/rosi.html">ROSI写真</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.rosi985.com/">ROSI美女写真</a>
                </td>
                <td>部分地區需要VPN才能連上， <a href="https://www.2meinv.cc/">www.2meinv.cc</a>， <a href="https://www.silk-necktie.com/">www.silk-necktie.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.rosi211.cc/">ROSI小莉写真官网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xiaolis.cc/">ROSI小莉写真网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.kaka234.cc/">卡卡美女网</a>
                </td>
                <td>
                    <a href="https://m.kaka234.cc/">m.kaka234.cc</a>，China IP限定
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.24tupian.org/">爱死美女图片站</a>
                </td>
                <td>需註冊登入才能看大圖和下載</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.24cos.org/">爱死cos美女图片站</a>
                </td>
                <td>
                    <a href="https://www.lovecos.net/">www.lovecos.net</a>，不支持VIP資源。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://ja.huamaobizhi.com/mixs/?lang=zh-CN">花猫壁纸</a>
                </td>
                <td>
                    <a href="https://en.huamaobizhi.com/">en.huamaobizhi.com</a>，手動插入圖片，原圖沒有URL，需要POST直接取得原圖的Blob，非常吃記憶體，抓取過程需要等比較久，原圖是4K~8K的高質量圖片線上觀看會很卡，分類添加了自動翻頁。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://fulitu.me/">福利图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wemimao.vip/">微密猫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://umei.net/">优美图录</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://buondua.com/">Buon Dua</a>
                </td>
                <td>
                    <a href="https://buondua.us/">buondua.us</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://xiutaku.com/">Xiutaku</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xtaku.com/">Xtaku</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://kiutaku.com/">Kiutaku</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.v2ph.com/">微圖坊</a>
                </td>
                <td>
                    <a href="https://www.v2ph.net/">www.v2ph.net</a>， <a href="https://www.v2ph.ru/">www.v2ph.ru</a>， <a href="https://www.v2ph.ovh/">www.v2ph.ovh</a>，需註冊，大尺度非VIP只能抓到8~10張
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://sizupro.com/">偽微圖坊</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meitule.net/">美图乐</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://siwake.cc/">丝袜客</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.mfsft.com/">免费私房图</a>
                </td>
                <td>
                    <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/mfsft.txt">同系列網站166個</a> ，發布頁， <a href="http://js.jctuk.com/dz.html">http://js.jctuk.com/dz.html</a>， 相似仿站， <a href="http://www.rosi8.com/">魅狸图片网</a>， <a href="https://www.sfjpg.com/">美女私房照</a>， <a href="https://www.kanmeitu.net/">看妹图</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.06se.com/">六色美图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://girlsteam.club/">女神部落</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.haotuwu.com/">好圖屋</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://dongti.blog.2nt.com/">胴体的诱惑</a>
                </td>
                <td>
                    <a href="https://meituba.blog.2nt.com/">美图吧</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.446m.com/">萌图社</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.042l.com/">萌萝社</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.jk.rs/">日式JK</a>
                </td>
                <td>
                    <a href="https://v2.jk.rs/">日式JK旧版</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.girldir.com/">美女目录网</a>
                </td>
                <td>作用在列表模式頁面</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.cup2d.com/">Cup2D</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosermm.blog.2nt.com/">COSERMM</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://baoruba.com/">私图网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tukuku.cc/">图库库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.umeitu.com/">尤美图库</a>
                </td>
                <td>
                    <a href="https://www.m5mm.com/">M5MM</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.zhaotaotu.cc/">找套图</a>
                </td>
                <td>
                    <a href="https://www.zhaotaotu.one/">zhaotaotu.one</a>， <a href="https://kantaotu.cc/">Xiuno BBS</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tuzac.com/">图宅网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.kkc3.com/">咔咔西三</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.youfreex.com/">YouFreeX</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.elysium.pro/">Elysium</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.qixianzi.com/">七仙子图片</a>
                </td>
                <td>
                    <a href="https://www.qixianzi.com/e/wap/">www.qixianzi.com/e/wap/</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://heysexgirl.com/">嘿～色女孩</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mntuce.com/">美女图册</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.cos6.net/">绅士猫</a>
                </td>
                <td>需註冊登錄</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ciycos.top/">Y次元</a>
                </td>
                <td>
                    <a href="https://www.gifmzt.com/">www.gifmzt.com</a>，需註冊登錄。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://luer.ee/">泡泡</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.costhisfox.com/cosfulimeitu">扮之狐狸</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xwbar.com/web/meinv/">新闻吧</a>
                </td>
                <td>
                    <a href="https://www.xwwu.net/web/meinv/">新闻屋</a>， <a href="https://www.dv67.com/web/meinv/">新娱乐在线</a>， <a href="https://www.fjrx.org/web/meinv/">福建热线</a>， <a href="https://www.sdrx.org/web/meinv/">山东热线</a>， <a href="https://www.gxrx.org/web/meinv/">广西热线</a>， <a href="https://www.whrx.org/web/meinv/">武汉热线</a>， <a href="http://www.tjrx.org/web/meinv/">天津热线</a>， <a href="https://www.ynrx.org/web/meinv/">云南热线</a>， <a href="https://www.gsrx.org/web/meinv/">甘肃热线</a>，封鎖部分地區，需要VPN才看的到圖片
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.shzx.org/b/12-0.html">四海资讯</a>
                </td>
                <td>
                    <a href="https://www.entbao.com/b/23-0.html">娱乐宝</a>， <a href="https://www.yuleba.org/b/10-0.html">娱乐吧</a>， <a href="https://www.entwu.com/b/10-0.html">娱乐屋</a>， <a href="https://www.xwbzx.com/b/10-0.html">美女图片库</a>，封鎖部分地區，需要VPN
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.jkforum.net/">JKF</a>
                </td>
                <td>貼圖區</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.t66y.com/">草榴</a>
                </td>
                <td>貼圖區</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.cool18.com/">留园酷</a>
                </td>
                <td>貼圖區</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.92meinv.com/">爱美女</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xinmeitulu.com/">新美图录</a>
                </td>
                <td>
                    <a href="https://www.twlegs.com/">臺灣美腿女郎</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://meitulu.me/">美图录</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tujigu.top/">爱图集谷</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xiuwo.net/">秀窝</a>
                </td>
                <td>
                    <a href="https://www.rmm8.com/">RMM吧</a>， <a href="https://www.zanmm.com/">赞MM</a>， <a href="https://www.entuji.com/">恩图集</a>， <a href="https://www.mhgirl.com/">美Girl图集</a>， <a href="https://www.hutu6.com/">狐图网</a>， <a href="https://wap.kunv.cc/">爱秀美女</a>， <a href="https://www.930tu.com/">930圖片網</a>， <a href="https://www.smkwan.com/">四魔写真</a>， <a href="https://www.jnmmw.com/">JN美眉网</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xsnvshen.co/">秀色女神</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.kongquehai.net/">孔雀海</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.lolili.net/">洛丽网</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ladymao.net/">ladymao图库</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.lazymanpic.net/">懒人看图</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.youwushow.net/">尤物秀</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://legskr.com/">iLegs时光印象网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xiurenwang.me/">秀人网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.zyktu.top/">资源库图站</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://8ezy.com/">8E资源站</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.siwashi.xyz/">丝袜室</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ccy.moe/">超次元</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ixiuren.com/xiuren">秀人图</a>
                </td>
                <td>只支持免費</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.yuzu8.com/">足控资源网</a>
                </td>
                <td>只支持免費</td>
            </tr>
            <tr>
                <td>
                    <a href="https://tu928.com/">tu928美女写真网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://foamgirl.net/">FoamGirl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://girl18.net/">Girl 18+</a>
                </td>
                <td>
                    <a href="http://bikiniz.net/">Bikini Girl</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mmtuji.com/">妹妹图集</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xiaojiejie.me/">小姐姐么</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.14mm.cn/">14MM图片网</a>
                </td>
                <td>
                    <a href="https://www.tp8.org/">图片吧</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.zhxszone.com/">最好秀色</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://coserlab.io/">Coser Lab</a>
                </td>
                <td>4K~8K高解析</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.loxiu.com/">洛秀网</a>
                </td>
                <td>
                    <a href="https://www.counv.com/">维秘秀</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://mt1.meitu1.sbs/">第一美女套图网</a>
                </td>
                <td>
                    <a href="https://meitu.sbs/">最新域名</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://bisipic.xyz/">比思在線圖庫</a>
                </td>
                <td>
                    <a href="https://bisipic.online/">bisipic.online</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.uyn8.cn/">牛牛美图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meimeimei.org/">美妹妹</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://aitu.men/">爱图门</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nanrenhome.cc/category/nanrenzhijia/fulimeitu">男人之家</a>
                </td>
                <td>
                    <a href="https://nrzj.link/">nrzj.link</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.2wh.net/meinvxiezhenjigou">网红跟我俩</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.beautyleg6.com/index.html">BeautyLeg</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://kenshin.hk/category/jnews/photoalbum/">劍心回憶</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://chibakuma.pixnet.net/blog">千葉熊的出沒地</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cyberkuma.pixnet.net/blog">CyberKuma的部落格</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cypherlockhart.pixnet.net/blog">快樂氰化物</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ikanins.com/">爱看 INS</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://shijiao.meinvnews.com/">好视角</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://zipaipic.com/">自拍图库</a>
                </td>
                <td>自拍图库.com</td>
            </tr>
            <tr>
                <td>
                    <a href="https://7aipai.com/">美拍 - 我自拍</a>
                </td>
                <td>
                    <a href="https://5zipai.com/">5zipai.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://shaonvtu.xyz/">52自拍</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cgdd.net/">吃瓜大队</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://taotu.org/">套圖TAOTU.ORG</a>
                </td>
                <td>
                    <a href="https://taotu.org/m/">taotu.org/m/</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://fulituku.neocities.org/">福利图库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.fulily.com/">福利乐园</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.95mm.vip/">MM 范</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://m.tuiimg.com/meinv/">推图网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meitu131.com/meinv/">MEITU131</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tupianwu.com/">图片屋</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hexieshe.cn/">和邪社</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mmonly.com/mmtp/">唯一图库</a>
                </td>
                <td>
                    <a href="https://m.mmonly.com/mmtp/">m.mmonly.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://pic.yesky.com/">天极图片</a>
                </td>
                <td>
                    <a href="https://wap.yesky.com/pic/">wap.yesky.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.xxiav.com/">XXIAV寫真館</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://18av.mm-cg.com/zh/cg_random/all/index.html">18AV</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://taotuhome.com/">套图之家 taotuhome.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.taotuzj.com/">套图之家 www.taotuzj.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.shunvi.com/">淑女爱</a>
                </td>
                <td>www.shunvai.com</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meijuntu.com/">俊美图</a>
                </td>
                <td>www.jeya.de</td>
            </tr>
            <tr>
                <td>
                    <a href="https://mt316.com/">妹子图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.888meinv.com/">888美女网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wai77.com/">心动美图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meinvku.org.cn/">美女库</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.656g.com/">656G精品套图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mm5mm5.com/">MM5MM5美女图片</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.eemm.cc/">依依图片网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xintp.com/meinv/">犀牛图片网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jrants.com/">青年美圖</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://trendszine.com/">風流雜誌</a>
                </td>
                <td>
                    <a href="https://cosblay.com/">CosBlay</a>，CosBlay網頁語系不同，圖集列表也不同。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://xx.knit.bid/">爱妹子</a>
                </td>
                <td>
                    <a href="https://mm.187187.xyz/">mm.187187.xyz</a>， <a href="https://999888.best/">999888.best</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://928r.com/">美图社</a>
                </td>
                <td>
                    <a href="https://060k.com/">花瓣美女</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://taotu123.com/">套图网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meitu8.cc/">美图网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nshens.com/web/">女神社</a>
                </td>
                <td>
                    <a href="https://inewgirl.com/web/">inewgirl.com</a>， <a href="https://lovens.shop/">lovens.shop</a>，VIP限定的沒有VIP帳號只會重複抓到第一頁的圖片
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://chottie.com/blog/">Chottie</a>
                </td>
                <td>
                    <a href="https://chinesehottie.com/blog/">chinesehottie.com</a>， 同上
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.evacg.org/">E次元</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://ciyuandao.com/photo">次元岛</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://dimtown.com/cosplay">次元小镇</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mtutuu.com/">萌次元</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.a2cy.com/">推次元</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mikagogo.com/">米卡插画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://pic.3loumao.org/">3楼猫图库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.emonl.com/">柠檬皮</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sexygirl.cc/">SexyGirl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cangcuc.com/">Căng Cực</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fliporn.biz/sexual-picture">Fliporn</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.avideom.com/">阿维迪姆</a>
                </td>
                <td>需註冊，移動端免登入</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.91hdzq.cc/category/%E6%88%90%E4%BA%BA%E8%89%B2%E5%9B%BE/">91HD视频</a>
                </td>
                <td>
                    <a href="https://www.91hd.com/">發布頁</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.91tulu.com/">91图录</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://books.xxgirls.vip/arttype/30.html">淫淫小说写真馆</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://a.534798.xyz/">性趣套图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://a.28tyu.com/">苍井优图片</a>
                </td>
                <td>
                    <a href="https://a.28wer.com/">a.28wer.com</a>， <a href="https://a.sldlxz.com/">a.sldlxz.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://123548.xyz/">网友自拍</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.photos18.com/">色情圖片網</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://17sex.vip/list/4858">趣事館</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yazhouseba.com/meinv/">亚洲色吧</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.1000yishu.com/">1000艺术摄影</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.169tp.com/">169图片大全</a>
                </td>
                <td>
                    <a href="https://www.169tp.com/xingganmeinv/">性感</a>， <a href="https://www.169tp.com/wangyouzipai/">自拍</a>， <a href="https://www.169tp.com/gaogensiwa/">丝袜</a>， <a href="https://www.169tp.com/rentiyishu/">人体</a>， <a href="https://www.169tp.com/xiyangmeinv//">西洋</a>， <a href="https://www.169tp.com/guoneimeinv/">国内</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://k55.net/arttype/2.html">K55</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cav103.com/albums/">GavPorn相冊</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://avjb.com/albums/">AVJB 爱微社区</a>
                </td>
                <td>
                    <a href="https://avjb.github.io/">網址發佈頁1</a>， <a href="https://bitbucket.org/free890722/avjb/src/master/README.md">網址發佈頁2</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://theavporn.com/albums/">The AV Porn</a>
                </td>
                <td>
                    <a href="https://theavporn.github.io/theavporn/">網址發佈頁</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.qinimg.com/">Qinimg</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.yeitu.com/meinv/">亿图全景图库</a>
                </td>
                <td>
                    <a href="https://www.yeitu.com/dongman/cosplay/">COSPLAY</a>， <a href="https://m.yeitu.com/">m.yeitu.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.umei.cc/meinvtupian/">优美图库</a>
                </td>
                <td>
                    <a href="https://wap.umei.cc/">wap.umei.cc</a>，China IP限定
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.win3000.com/tags/xingganmeinv/">三千图片网</a>
                </td>
                <td>
                    <a href="https://m.win3000.com/tags/xingganmeinv/">m.win3000.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.3gbizhi.com/meinv">3G壁纸</a>
                </td>
                <td>
                    <a href="https://m.3gbizhi.com/">m.3gbizhi.com</a>，China IP限定
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mn52.com/xingganmeinv/">mn52图库</a>
                </td>
                <td>
                    <a href="https://wap.mn52.com/meihuoxiezhen/">wap.mn52.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.enterdesk.com/">回车桌面</a>
                </td>
                <td>
                    <a href="https://m.enterdesk.com/">m.enterdesk.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.keaitupian.com/">可爱小图</a>
                </td>
                <td>
                    <a href="https://m.keaitupian.com/">m.keaitupian.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://xiuren.biz/">Xiuren</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://asigirl.com/">Asigirl.com</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://misskon.com/">MissKON.com</a>
                </td>
                <td>完整無修正的圖片需要下載，聚集的只是預覽圖</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hotgirl.asia/">HotAsiaGirl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hotgirl2024.com/">HotGirl World</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.4khd.com/">4KHD</a>
                </td>
                <td>
                    <a href="https://fxcc.cc/">二級域名導航</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://4kup.net/">4KUP</a>
                </td>
                <td>圖片服務器屏蔽部分地區需要VPN才能顯示，高解析原圖需要下載，聚集的只是預覽圖</td>
            </tr>
            <tr>
                <td>
                    <a href="https://spacemiss.com/">Space of Miss Beautiful</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.1y.is/">1Y Beauties</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yanxiangrong.github.io/chunmomo/">蠢沫沫</a>
                </td>
                <td>非原圖</td>
            </tr>
            <tr>
                <td>
                    <a href="https://tokar.fantasyfactory.xyz/">Tokar浵卡 Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.cosersets.com/1">Cosersets</a>
                </td>
                <td>SPA網頁，請在圖片頁做操作，可用0、1、3、7、8，Ctrl + Alt + T可修改圖集標題。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.fantasyfactory.xyz/">小丁 (Fantasy Factory) Patreon Cosplay Leaks</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://asianpink.net/">AsianPink</a>
                </td>
                <td>高解析原圖需要下載，聚集的只是預覽圖</td>
            </tr>
            <tr>
                <td>
                    <a href="https://blog.baobua.net/mlem">BAOBUA.COM</a>
                </td>
                <td>
                    <a href="https://www.baobua.net/">www.baobua.net</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.putmega.com/explore/recent/?list=albums&sort=date_desc&page=1">PutMega</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://new.pixibb.com/">NEW PixiBB</a>
                </td>
                <td>
                    <a href="https://www.pixibb.com/explore">PixiBB</a>，舊站作用在相簿
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://vtecy.top/">二次元图库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://redbust.com/">RedBust</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sxchinesegirlz01.xyz/">Chinese Beauties</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tupic.top/">TUPIC.TOP</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://taotu200.com/">套图200网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://asiantolick.com/page/news">Asian To Lick</a>
                </td>
                <td>自動修正404</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.modelsvibe.com/">Models Vibe</a>
                </td>
                <td>分類添加了自動翻頁功能</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.beatifulleg.com/">Beautiful Leg</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://larose.vip/">Digital AI Gallery</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.asianude4u.net/">Asianude4u</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jablehk.com/">Jablehk</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapello.com/">Fapello</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapello.su/">Fapello.su</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapachi.com/">Fapachi</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://faponic.com/">Faponic</a>
                </td>
                <td>手動插入圖片， <a href="https://fapellas.com/">Fapellas</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://thefappening.plus/">The Fappening Plus</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://thefappeningblog.com/">TheFappening</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapomania.com/">Fapomania</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nudostar.tv/">NudoStar.TV</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nudogram.com/">Nudogram</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaidude.tv/category/cosplay/">HentaiDude TV</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.sankakucomplex.com/">Sankaku Complex</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://influencersgonewild.com/">Influencers GoneWild</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tuyetnhan.com/">Ảnh đẹp</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hinhanhgai.com/">Hình ảnh gái</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.gai.vn/">Gai.vn</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://imgcup.com/">imgcup.com</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mzpic.com/">Nude Babes</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://truepic.net/">True Pic</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tangmoc.com/blog/topic/164AF033943823F/hotgirl-model">TangMoc</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gaitrung.lovestoblog.com/">Girls Collection 18+!</a>
                </td>
                <td>
                    <a href="https://aigirl.lovestoblog.com/">aigirl.lovestoblog.com</a>， <a href="https://gainhat.lovestoblog.com/">gainhat.lovestoblog.com</a>， <a href="https://hotpic.lovestoblog.com/">hotpic.lovestoblog.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hotgirlpix.com/">Hot Girl Pix</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplay18plus.com/">Cosplay 18 Plus</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.sexyasiangirl.xyz/">SexyAsianGirl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://youwu.lol/">尤物丧志</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hotasianx.com/">HotAsianX</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://setu.lol/">色图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yase.pics/">亚色图库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sstk.neocities.org/">涩涩图库</a>
                </td>
                <td>
                    <a href="https://asiansexybody.netlify.app/">AsianSexyBody</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://fuligirl.top/">福利姬美图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xiurentu.pics/">秀人图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ugirls.pics/">UGIRLS</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mm131.click/">mm131美女图片</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.jiangtutu7.icu/">酱图图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.lspimg.com/">美图鉴赏</a>
                </td>
                <td>
                    <a href="https://acg.lspimg.com/">美图鉴赏ACG</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.vvcon.cn/cosplay">VVCON美瞳网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.fastingsex.com/">Fasting Sex</a>
                </td>
                <td>SPA網頁，手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://galleryepic.com/zh">Gallery Epic</a>
                </td>
                <td>高解析原圖需要下載，聚集的只是預覽圖，分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplayersgonewild.net/">Cosplayers GoneWild</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://thehentaiworld.com/hentai-cosplay-images/">The Hentai World</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://packsparapobres.com/">Packs para pobres</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://packdechicas.net/">Pack de chicas</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nudostar.com/">NudoStar</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://findhername.net/">Find Her Name</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://faps.club/main10/">OnlyFaps</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://thotbook.co/">ThotBook</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.famousinternetgirls.com/">Famous Internet Girls</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tnapics.com/">TNApics</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://erothots.co/albums">EroThots</a>
                </td>
                <td>無法匯出、下載，需要透過快捷鍵複製URL給Motrix下載，來源爬取BITCHES GIRLS。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://cyberdrop.me/">CyberDrop</a>
                </td>
                <td>手動插入圖片，需要知道檔案鏈結，例如：https://cyberdrop.me/a/gkQIiBxA，搜索引擎：https://www.flaru.com/en/cyberdrop.me/，下載會出錯時請調低線程數</td>
            </tr>
            <tr>
                <td>
                    <a href="https://bunkr-albums.io/">Bunkr</a>
                </td>
                <td>手動插入圖片，影片可匯出網址後用Motrix下載，
                    <pre>Referer：https://bunkr.fi/</pre>，如果無法下載就需透過瀏覽器來下載，分類添加了自動翻頁
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://vk.com/">VK</a>
                </td>
                <td>作用在相簿頁，只支持PC版，例如：https://vk.com/album-213073007_283330987</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapdungeon.com/">Fapdungeon</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ibradome.com/onlyfans-photos">Ibradome</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapopedia.net/updates/">Fapopedia</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapfappy.com/">fapfappy</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gotanynudes.com/">gotanynudes.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://thotslife.com/">Thotslife.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nudecosplaygirls.com/category/nude-cosplay-albums/">Nude Cosplay Albums</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://voyeurflash.com/">VoyeurFlash.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://leakedmodels.com/">Leaked Models</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://thothd.com/zh/albums/">ThotHD Albums</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://thothub.to/albums/">Thothub Albums</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nudebird.biz/">Nude Bird</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nudecosplay.biz/">Nude Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplaytele.com/">Cosplaytele</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.jimmysonline.com/">JimmysOnline.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://quatvn.men/">Quatvn</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gaidam18.com/">gaidam18</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.4ksilo.com/">4ksilo</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplay69.net/category/album/">Cosplay69</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://lustlens.com/">LustLens</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.erocosplay.org/">Ero Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.simply-porn.com/galleries">Simply Porn</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.simply-cosplay.com/galleries/new">Simply Cosplay</a>
                </td>
                <td>SPA網頁，只支持galleries類別。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplayporn.online/category/cosplay/">Cosplay Porn</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://asupan.art/">Asupan</a>
                </td>
                <td>很多缺圖不完整</td>
            </tr>
            <tr>
                <td>
                    <a href="https://asiaontop.com/">AsiaOnTop</a>
                </td>
                <td>
                    <a href="https://asiaon.top/">asiaon.top</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://mitaku.net/">Mitaku</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://eroasian.net/">EroAsian</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplayworld.net/">Cosplay World</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hotgirl.biz/">Hotgirl.biz</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xlust.org/">XLUST.ORG</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://byoru.net/">Byoru</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cgcosplay.org/">CG Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xcosplay.top/">X Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hotgirlchina.com/">HOTGIRLchina</a>
                </td>
                <td>
                    <a href="https://anhnguoimau.com/">Ảnh Người Mẫu</a>， <a href="https://anhnguoidep.com/">Ảnh Người Đẹp</a>， <a href="https://anhdoitruy.com/">Ảnh Đồi Trụy</a>， <a href="https://anhnguoilon.com/">Ảnh Người Lớn</a>， <a href="https://xinh.pro/">Xinh Pro</a>， <a href="https://anhkhieudam.com/">Ảnh Khiêu Dâm</a>， <a href="https://hinhsexviet.com/">Hình Sex Việt</a>， <a href="https://anhmienphi.com/">Ảnh Miễn Phí</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://ososedki.com/">OSOSEDKI</a>
                </td>
                <td>
                    <a href="https://cosplayasian.com/">COSPLAYASIAN</a>， <a href="https://cosplaythots.com/">COSPLAYTHOTS</a>， <a href="https://cosplayrule34.com/">COSPLAYRULE34</a>， <a href="https://waifubitches.com/">WAIFUBITCHES</a>， <a href="https://cosplayboobs.com/">COSPLAY BOOBS</a>， <a href="https://cosplayleaks.com/">COSPLAYLEAKS</a>， <a href="https://vipthots.com/">VIPTHOTS</a>， <a href="https://hentaibitches.com/">HENTAI BITCHES</a>， <a href="https://leaksfan.com/">LEAKSFANS</a>， <a href="https://charmingass.com/">CHARMINGASS</a>， <a href="https://leakspie.com/">LEAKS PIE</a>， <a href="https://cherryleaks.com/">CHERRY LEAKS</a>， <a href="https://sweetleaks.com/">SWEETLEAKS</a>， <a href="https://ocosplay.com/">OCOSPLAY</a>， <a href="https://webcharming.com/">WEB CHARMING</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://photo.camcam.cc/">photo.camcam.cc</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://3600000.xyz/">3600000 Beauty</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://erogirl.net/">Erogirl</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://photobeach.blogspot.com/">Photo Beach</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://everia.club/">Everia.club</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.everiaclub.com/">Everia club</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.ilovexs.com/">NongMo.Zone</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://idol.gravureprincess.date/">idol.gravureprincess.date</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.micmicidol.club/">MIC MIC IDOL</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://gravurezasshi9.doorblog.jp/">グラビア週刊誌 9</a>
                </td>
                <td>
                    <a href="https://magazinejapanese5.blog.jp/">グラビア週刊誌 5</a>， <a href="https://magazinejapanese6.blog.jp/">グラビア週刊誌 6</a>，分類添加了自動翻頁
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://nisokudemosandal.blog.jp/">エロマニア　猿！</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gravureidols.top/">Gravure Idols</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://news.idolsenka.net/">NEWSグラビアアイドル.net</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://gravia.site/box/gate.php">Gravia</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ai2d.fun/note/list.php?smt=logined&type_type=auto">AI2D</a>
                </td>
                <td>
                    <a href="https://aiimg.fun/note/list.php">AI.img</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mizugigurabia.com/">水着グラビア</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://eroyakuba.com/">エロ役場</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://geinou-nude.com/">エロ画像まとめ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.urapic.com/">裏ピク</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://reprint-kh.com/">復刻書林</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://lolita.lady.jp/">力武靖写真集</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://amazon-love.com/">Love Asian Babes</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bizyonotudoi.com/">美女の集い</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mabui-onna.com/">マブい女画像集</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://blog.livedoor.jp/pururungazou/">ぷるるんお宝画像庫</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.saladpuncher.com/">Permanent Bachelor</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://ivphoto.tistory.com/">IVPhoto_Gravure</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://goddess247.com/">goddess247</a>
                </td>
                <td>
                    <a href="https://bestprettygirl.com/">bestprettygirl</a>， <a href="https://girlsweetie.com/">Girl Sweetie</a>， <a href="https://girldreamy.com/">Girl Dreamy</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://bestgirlsexy.com/">BestGirlSexy</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://photobook.club/">Photobook.club</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://niwatori.my.id/2023/">niwatori.my.id</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xasia.pics/">xasia</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sexygirl.one/">SexyGirl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://beautypics.org/">Sexy Girl Pictures</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.eyval.net/">eyval.net</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://m.phimvuspot.com/">PhimVu</a>
                </td>
                <td>
                    <a href="https://m.kutekorean.com/">Kutekorean.Com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hayvn.net/girl-xinh">HayVn.Net</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yeugai.org/">YeuGai.Net</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.poringa.net/">Poringa!</a>
                </td>
                <td>
                    <a href="https://m.poringa.net/">m.poringa.net</a>，手動插入圖片
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://tabakus.blogspot.com/">Tabakus Gallery</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://20sanctuary-grahpis.blogspot.com/">Graphis</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://truepichk.blogspot.com/">True Pic</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://min-bin.blogspot.com/">min: archive</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://500brothersfun.blogspot.com/">500 Brothers</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://blognudemodels.blogspot.com/">Nude Models</a>
                </td>
                <td>點開PO文後，可以3、8。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://asiaidols.wordpress.com/">Asia Idols</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.asiapornphoto.com/">Asia Porn Photo</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bingmm.com/">BingMM</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://chinesenudeart.blogspot.com/">Chinese Nude Art Photos</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cutegirlsaddict.blogspot.com/">CUTE GIRLS ADDICT</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://kemono.su/fantia/user/17148">Kemono</a>
                </td>
                <td>
                    <a href="https://coomer.su/">Coomer</a>， <a href="https://nekohouse.su/">Nekohouse</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentai-img.com/">Hentai Image</a>
                </td>
                <td>
                    <a href="https://hentai-cosplays.com/">hentai-cosplays.com</a>， <a href="https://porn-images-xxx.com/">porn-images-xxx.com</a>， <a href="https://porn-gravure-idol.com/">porn-gravure-idol.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.eporner.com/pics/">EPORNER</a>
                </td>
                <td>
                    <a href="https://www.eporner.com/profile/namaiki/uploaded-pics/">namaiki</a>， <a href="https://www.eporner.com/profile/Khosmo/uploaded-pics/">Khosmo</a>， <a href="https://www.eporner.com/profile/trevor221/uploaded-pics/">trevor221</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xasiat.com/albums/">Xasiat</a>
                </td>
                <td>圖集分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://asianporn.li/photos/">Asian Porn</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://erotic.pics/">Erotic Pics</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://xhamster.com/photos">xHamster</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.luscious.net/porn/cosplay-22/">Luscious</a>
                </td>
                <td>SPA網頁，手動插入圖片。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.imagefap.com/">ImageFap</a>
                </td>
                <td>只適用PC版，大圖需在photo頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://zzup.com/user-album/3338/petmer/index.html">ZzUp.Com</a>
                </td>
                <td>
                    <a href="https://zzup.com/user-album/2269/youmii/index.html">youmii</a>，分類添加了自動翻頁
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://girlsreleased.com/">GirlsReleased</a>
                </td>
                <td>圖床imgadult無法外連，但可以下載。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://urlgalleries.net/">URLGalleries</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nsfwalbum.com/">NSFWalbum</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bitchesgirls.com/">BITCHES GIRLS</a>
                </td>
                <td>影片可匯出網址後用Motrix下載</td>
            </tr>
            <tr>
                <td>
                    <a href="https://x-video.tube/albums/">X-video albums</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://adultphotosets.best/">Adult photo sets</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://pics-x.com/">Pics-X</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.redpics.top/">Redpics</a>
                </td>
                <td>SPA網頁，手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://sxypix.com/">SXYPIX</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yaustal.com/stil_moda/">ЯУстал</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jb5.ru/shoubiz/onlyfans-sliv/">МЕДИА ТРЕНД</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://altgoddess.com/">alt Goddess</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://clannadhouse.com/">TIỆM TẠP HÓA KỲ DIỆU</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://anicos.net/">AniCos</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://geekfan.site/">geekfan.site</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fotoslava.ru/">Фото идеи и картинки</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cojo.ru/">Картинки и фото</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://dtf.ru/u/660597-salvatore-ganacci">DTF</a>
                </td>
                <td>
                    <a href="https://dtf.ru/u/36100-tursall">Tursall</a>，SPA網頁，點開作者的PO文，作用在PO文首樓的圖集，手動插入圖片。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://eropics.to/">Eropics</a>
                </td>
                <td>手動插入圖片，有少數日、韓系套圖，vipr.im,Imagetwist.com圖床大多無法外連，但應該可以透過腳本下載，imagebam圖床需要先點開一個鏈結點擊Continue to your image後XHR才能抓到圖片。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://vipergirls.to/">ViperGirls</a>
                </td>
                <td>只適用PC版，論壇樓層皆可能是一個使用免空圖床的圖集，操作方式，1.選取文字後按或直接按Ctrl + Alt + T設定圖集名稱，2.滑鼠點擊每樓左側作者下方空白的部份捕獲圖床鏈結，接下來就能使用0、1、3、7、8的功能，一些圖床比較難搞下載容易出錯，可匯出圖片地址再用Aria2或Motrix來下載，如有漏掉的圖床請反饋</td>
            </tr>
            <tr>
                <td>
                    <a href="https://porncoven.com/">PornCoven</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://eroticity.net/">ErotiCity</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://kitty-kats.net/">Kitty Kats</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://teenphotos.forumes.ru/">Teen Photos</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://imx.to/">imx.to</a>
                </td>
                <td>輔助點擊，能在gallery頁進行下載。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hotleaks.tv/">Hotleaks</a>
                </td>
                <td>
                    <a href="https://thotsbay.tv/">Thotsbay</a>， <a href="https://hotleak.vip/">Hotleak</a>， <a href="https://leakedzone.com/">Leakedzone</a>，手動插入圖片
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wikifeet.com/">wikiFeet</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://goodsexporn.org/">Good Sex Porn</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fitnakedgirls.com/photos/">FitNakedGirls</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://r18hub.com/photos">R18hub</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cn.pornhub.com/albums">PornHub</a>
                </td>
                <td>很容易被短暫封IP...</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.erome.com/explore">EroMe</a>
                </td>
                <td>
                    <a href="https://erome.pics/explore/">EroMe erome.pics</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://mrdeepfakes.com/photos">MrDeepFakes</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tokyomotion.net/albums">TOKYO Motion</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.javbangers.com/albums/">JavBangers</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jjgirls.com/">JJGirls</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.elitebabes.com/">Elite Babes</a>
                </td>
                <td>同格式， <a href="https://pmatehunter.com/">pmatehunter.com</a>， <a href="https://www.jperotica.com/">www.jperotica.com</a>， <a href="https://www.metarthunter.com/">www.metarthunter.com</a>， <a href="https://www.femjoyhunter.com/">www.femjoyhunter.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://nakedwomenpics.com/">Naked Women Pics</a>
                </td>
                <td>
                    <a href="https://viewgals.com/">VIEW GALS</a>， <a href="https://hotpussypics.com/">Hot Pussy Pics</a>， <a href="https://bustypassion.com/">Busty Women Pics</a>， <a href="https://teenpussypics.com/">TeenPussyPics.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.assesphoto.com/">Asses Photo</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.freexcafe.com/">FreeXcafe</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://amateurlikes.com/">Amateur Likes</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.pornpics.com/jp/">Porn Pics</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hdpornpictures.net/">HD Porn Pictures</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hotzxgirl.com/">Hot Sex Picture</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.freebigtitpornpics.com/japanese-big-tits/">Freebigtit</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.pichunter.com/">PicHunter</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.pictoa.com">Pictoa</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://pimpandhost.com/site/trending">PimpAndHost</a>
                </td>
                <td>相簿</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.pornpaw.com/">Pornpaw</a>
                </td>
                <td>圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fuskator.com/">Fuskator</a>
                </td>
                <td>圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.fapator.com/">Fapator</a>
                </td>
                <td>圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://dirtyship.com/phototype/cosplayer/">DirtyShip.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tiktaks.de/">ᑕ❶ᑐ Onlyfans +18</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sexythots.com/photoss/">SexyThots.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sexygirlspics.com/">SexyGirlsPics</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.smutpond.com/">SMUTPOND</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.superbeautygirlx.top/">Forum Girl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nudetagram.com/">Nude Tagram</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.pornpic.com/">PornPic</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.nudedxxx.com/">Nuded Photo</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://2lsp.xyz/">2LSP</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.pic88.cc/">高清图片吧</a>
                </td>
                <td>
                    <a href="https://m.pic88.cc/">m.pic88.cc</a>，Pic8.cc
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ku138.cc/">美女写真网</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://qqdk2019.net/">悄悄的看2019</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.guixiu.org/">闺秀网</a>
                </td>
                <td>
                    <a href="https://guixiu.org/">guixiu.org</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://m.xtushe.com/">新老友图社</a>
                </td>
                <td>有瀏覽限制，超過需要註冊會員和充值。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://missbby.com/">MissBby.com</a>
                </td>
                <td>SPA網頁，分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://xerocos.com/">Xerocos</a>
                </td>
                <td>SPA網頁，分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://meitu.neocities.org/">美图</a>
                </td>
                <td>很多posts都404...</td>
            </tr>
            <tr>
                <td>
                    <a href="https://aiavr.uk/">图集网</a>
                </td>
                <td>
                    <a href="https://user.aiavr.uk/">user.aiavr.uk</a>，爬取的圖片資料混雜，不屬於該圖集的圖片卻放在一起，評價不及格的爬蟲。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://nicegirl4u.cyou/">NICEGIRL4U</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://meitu.knit.bid/">美图网</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="https://portrait.knit.bid/">美女写真</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.ikmt.net/">爱看美图网</a>
                </td>
                <td>
                    <a href="http://m.ikmt.net/">m.ikmt.net</a>，很久沒新圖了
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.taotucc.com/">Taotuxp.com</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="https://xgirlscollection.com/">Xgirls</a>
                </td>
                <td>
                    <a href="https://www.img3xgirls.com/">www.img3xgirls.com</a>，很久沒新圖了
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.yyzhenshun.com/">YY美女图片</a>
                </td>
                <td>
                    <a href="http://bb.meinvnews.com/">美眉大宝贝</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.6evu.com/">遛无写真</a>
                </td>
                <td>
                    <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/6evu.txt">同格式33個</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ywsq.cc/">出物社区写真网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tu11.com/">亿秀美女</a>
                </td>
                <td>
                    <a href="https://m.itu11.com/">m.itu11.com</a>
                </td>
            </tr>
            <tr>
                <td>仿紳士漫畫UI寫真圖庫</td>
                <td>
                    <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/hentaigallery.txt">同格式90個</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tzala.com/">桃子啦</a>
                </td>
                <td>
                    <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/tu01.txt">同格式136個</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wind5.com/">万德美图屋</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mayihz.com/">蚂蚁图库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mtianle.com/">每天乐图片网</a>
                </td>
                <td>
                    <a href="https://m.mtianle.com/">m.mtianle.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.aitaotu.cc/">爱套图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mm.tvv.tw/">妹妹图</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.xiuren.org/">Xiuren 秀人网</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="https://ons.ooo/">ONS漂亮MM图库</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.288mn.com/a/vm/">288美女图库</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.mm1311.net/">MM1311</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="https://langnv.neocities.org/">浪女吧</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.win4000.com/meitu.html">美桌</a>
                </td>
                <td>感覺沒在更新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="https://old.buzzav.com/albums">Buzzav</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://multi.xnxx.com/">multi.xnxx.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://51sex.vip/">51sex</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://kawaiix.com/">KawaiiX</a>
                </td>
                <td>
                    <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/Sexyxbody.txt">同系列網站96個</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.crtys.net/">人体艺术</a>
                </td>
                <td>
                    <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/gogort.txt">同系列網站10個</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://yinaw.com/">壹纳网</a>
                </td>
                <td>腳本管理器選項可以勾選壹纳网使用原始新浪图床链结，需使用Header Editor擴展修改標頭， <a href="https://sspai.com/post/77650">奔跑中的奶酪的修改說明</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://dbro.news/category/p0-%e5%a5%97%e5%9c%96%e7%b3%bb%e5%88%97">D哥新聞</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jo106.com/beauty-photo/">流量密碼</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://r18.jo106.com/">R18成人站-流量密碼</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nick20.com/pic/index.html">尼克成人網</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xsmpic.com/">小濕妹圖庫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.sexdiary1769.com/category/photogallery">我們的性愛日誌</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://happy.5ge.net/category/%E5%9B%BE%E5%86%8C/">五歌的开心网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://shinv.pics/">湿女吧</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.top888.com/">粉色家园</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://ios.zzgo810.top/">哔咔庇护所v2</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://g-avstar.com/meitushe/">G-AVSTAR</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xofulitu521.xyz/xoxo">XO福利圖</a>
                </td>
                <td>
                    <a href="https://kb1.a7xofulitu.com/%E5%84%BF%E6%AD%8C%E4%B8%89%E7%99%BE%E9%A6%96/">網站跳轉</a>，分類添加了自動翻頁
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xxav.one/tuwen/">XXAV</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sexfull.av9238.com/img/index.html">性福里 图片</a>
                </td>
                <td>
                    <a href="https://sexfull.av9238.com/manhua/index.html">性福里 漫画</a>
                </td>
            </tr>
            <tr>
                <td>坏哥哥</td>
                <td>
                    <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/yjdm.txt">239個域名</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.momotk.com/">MOMO图库</a>
                </td>
                <td>
                    <a href="https://www.rb1.es/momotk/">跳轉頁</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wc1.es/">魅影画廊</a>
                </td>
                <td>
                    <a href="https://wc2.es/myhl">跳轉頁</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.sstuku13.xyz/aa61/?shouye">色色图库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.112ze.com/">美女写真图集</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://18jjj.cyou/">聚姬集</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://adultspic.com/">adultspic色情成人圖片</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xxxxn.click/">漫画精品</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sifang.app/">美图收藏夹</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.cnjiepai.xyz/all.html">中国街拍</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ai19.art/">Ai19 Art</a>
                </td>
                <td>
                    <a href="https://ainudesporn.art/">Ai art nude</a>， <a href="https://hentaimama.xyz/">Hentaimama</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://kungfutv.net/label/anime-girl/">Kungfutv</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://seriesdonghua.net/cosplay">Series Donghua</a>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
</details>
<h2>H漫類內置規則支持列表</h2>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
    <table>
        <thead>
            <tr>
                <th>
                    <strong>網站</strong>
                </th>
                <th>
                    <strong>備註</strong>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <a href="https://e-hentai.org/">E-Hentai</a>
                </td>
                <td>作用在圖片清單頁，手動插入大圖減少消耗GP配額，可透過腳本管理器選單選擇是否載入原圖鏈結， <a href="https://exhentai.org/">exhentai.org</a>， <a href="https://e-hentai.org/lofi/">https://e-hentai.org/lofi/</a>，圖片下載錯誤率極高，不建議使用本腳本下載。 </td>
            </tr>
            <tr>
                <td>
                    <a href="https://nhentai.net/">nhentai</a>
                </td>
                <td>作用在圖片清單/閱讀頁， <a href="https://nyahentai.red/">nyahentai.red</a>， <a href="https://www.hentai.name/">www.hentai.name</a>， <a href="https://nhentai.xxx/">nhentai.xxx</a>， <a href="https://nhentai.to/">nhentai.to</a>， <a href="https://simplyhentai.org/">simplyhentai.org</a>， <a href="https://simplyhentai.red/">simplyhentai.red</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://akuma.moe/">akuma.moe</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://yabai.si/g">Yabai!</a>
                </td>
                <td>作用在圖片清單頁，SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://sukidesu.moe/latest">Sukidesu.moe</a>
                </td>
                <td>作用在圖片清單頁，SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://cathentai.net/">Cathentai</a>
                </td>
                <td>作用在圖片清單/List Read頁， <a href="https://hentaibeeg.com/">hentaibeeg.com</a>， <a href="https://hentaicolor.net/">hentaicolor.net</a>， <a href="https://nyahentai.info/">nyahentai.info</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://hanime1.me/comics">Hanime1</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://ch.hentai-one.com/">Hentai-One</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaifox.com/">HentaiFox</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaizap.com/">HentaiZap</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentairox.com/">HentaiRox</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaienvy.com/">HentaiEnvy</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://m-hentai.net/">M-Hentai</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentainexus.com/">HentaiNexus</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentailoop.com/">HentaiLoop</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://3hentai.net/">3hentai</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaivsmanga.com/">HENTAIVSMANGA</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hentai321.top/">山寨3hentai</a>
                </td>
                <td>作用在圖片清單</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.simply-hentai.com/">Simply Hentai</a>
                </td>
                <td>作用在閱讀頁，SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://eahentai.com/">EAHentai</a>
                </td>
                <td>作用在圖片清單，SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://xmanga.org/">Manga Mischief</a>
                </td>
                <td>作用在圖片清單頁，SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://doujins.com/">Doujins</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaipaw.com/">HentaiPaw</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://cin.cx/">Download Doujin</a>
                </td>
                <td>作用在圖片清單頁，手動插入圖片。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://nhentai.com/xxx">nhentai.com</a>
                </td>
                <td>作用在圖片清單/閱讀頁，SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaiera.com/">HentaiEra</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tsumino.com/">TSUMINO</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="http://imhentai.xxx/">IMHentai</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://myhentaigallery.com/">My Hentai Gallery</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://xyzcomics.com/">XYZ PORN COMICS</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://pururin.to/">Pururin</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://9hentai.com/">9hentai</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://asmhentai.com/">AsmHentai</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://multporn.net/">MultPorn</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hentaicredo.com/">HENTAICREDO.COM</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://lhentai.com/">lHentai</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://tmohentai.com/">TMOHentai</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentairead.com/">HentaiRead</a>
                </td>
                <td>作用在閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentai2read.com/">Hentai2Read</a>
                </td>
                <td>作用在閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaihere.com/">HentaiHere</a>
                </td>
                <td>作用在閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://kingcomix.com/">KingComiX</a>
                </td>
                <td>作用在閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hitomi.la/">Hitomi.la</a>
                </td>
                <td>作用在閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hentaiset.com/">HENTAISET.COM</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaivid.net/">HENTAIVID.NET</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hentaiceleb.com/">HENTAICELEB.COM</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://neko-hentai.net/">Neko Hentai</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://superhentai.blog/">Super Hentai</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ero-comic-hunter.net/luck">同人エロ漫画・エロ同人誌ならエロコミックハンター</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://eromanga-kong.com/web/">エロ漫画コング｜無料エロマンガ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hdporncomics.com/">HDpornComics</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xlecx.one/">XlecX</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaipal.com/">HentaiPal.com</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaiporns.net/">HentaiPorns</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://comics.8muses.com/">8muses</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://allporncomic.com/porncomic/">AllPornComic</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangadistrict.com/">MANGA DISTRICT</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://rokuhentai.com/">Roku Hentai</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hachirumi.com/">Hachirumi.com</a>
                </td>
                <td>SPA網頁，在閱讀頁不分章節取得所有圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentai.bang14.com/">Hentai.bang14.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hanman18.com/">Hanman18.com</a>
                </td>
                <td>
                    <a href="https://manga18.club/">Manga18.club</a>， <a href="https://18porncomic.com/">18PornComic</a>，作用在閱讀頁。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://cndoujin.net/">CNdoujin.net</a>
                </td>
                <td>
                    <a href="doujin18.net/">Doujin18.net</a>，作用在閱讀頁，兩個網站的爬取內容不一樣。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://18kami.com/">18Kami.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.comic18h.com/">Comic18H</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://18p.fun/">開車漫畫</a>
                </td>
                <td>只是閱讀請使用東方永頁機，下載操作，需書幣購買的先購買好，第一章閱讀頁按1先跳轉為18p.fun，再按1開始聚圖從頭一路翻到尾，按0下載，標題需手動輸入</td>
            </tr>
            <tr>
                <td>
                    <a href="https://18comic.vip/">禁漫天堂</a>
                </td>
                <td>手動插入圖片，由於需要重新繪製還原被分割的圖片，過程中CPU會全速運轉。 <a href="https://jmcmomic.github.io/">禁漫天堂發布頁</a>， <a href="https://jmcomic-fb.vip/">禁漫天堂發布頁2</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.nicohentai.com/">逆次元逆ACG</a>
                </td>
                <td>
                    <a href="https://www.freeacg.org/">www.freeacg.org</a>， <a href="https://nico.yt/">nico.yt</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.55comics.com/">污污漫书</a>
                </td>
                <td>
                    <a href="https://www.55manshu.com/">55漫書</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wnacg.com/">紳士漫畫</a>
                </td>
                <td>作用在圖片清單、下拉閱讀頁， <a href="https://www.hentaicomic.ru/">www.hentaicomic.ru</a>， <a href="https://wnacg.date/">紳士漫畫地址發布頁</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://syacomic.com/">紳夜漫畫</a>
                </td>
                <td>SPA網頁， <a href="https://syacomic01.website/">地址發布頁</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://web.nicecat.cc/">NiceCat</a>
                </td>
                <td>SPA網頁，請在info頁做操作。</td>
            </tr>
            </tr>
            <tr>
                <td>
                    <a href="https://koharu.to/">Koharu</a>
                </td>
                <td>SPA網頁，請在info頁或read頁做操作，網站機制特殊需要用new XMLHttpReque將http圖片鏈結轉為BlobURL，取得全部圖片需要等待一段時間。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://pixiv.app/">Comics</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ahri8.top/">松鼠症倉庫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hacg.antbyw.com/plugin.php?id=jameson_manhua">蚂蚁搬运网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ahri-gallery-xfjd-2024-04-25.top/">Ahri Gallery分機</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://caitlin.top/">Caitlin.top</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://laosiji52.com/">老司機禁漫</a>
                </td>
                <td>
                    <a href="https://laosiji6.com/">Laosiji6.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://18mh.org/">18漫畫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.acgotang.com/">ACG糖</a>
                </td>
                <td>
                    <a href="https://www.kmh123.xyz/">永久发布页</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://tianhei-acg.com/">天黑漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.apexmh.com/">頂點漫畫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ikanmh.xyz/">漫小肆</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.vnacg.com/">VN漫画网</a>
                </td>
                <td>
                    <a href="https://m.vnacg.com/">m.vnacg.com</a>，作用在下拉閱讀頁
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://7mmtv.sx/zh/hcomic_random/all/index.html">7mmtv</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://18h.mm-cg.com/">18H</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://h-ciyuan.com/category/%e6%bc%ab%e7%94%bb/">H次元</a>
                </td>
                <td>大圖在清單後面</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.yinmh.com/">淫漫画</a>
                </td>
                <td>
                    <a href="https://www.yinmh.top/">www.yinmh.top</a>， <a href="https://www.yinmh.xyz/">www.yinmh.xyz</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.comicun.com/">漫畫聯合國</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.manhuache.com/">漫畫車</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://litu100.xyz/">丽图·污漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yumanse.com/">欲漫涩</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://avbebe.com/archives/category/%e6%88%90%e4%ba%bah%e6%bc%ab%e7%95%ab">Avbebe</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.acgmhs.com/">ACG漫画网</a>
                </td>
                <td>
                    <a href="https://www.porn-comic.com/">www.porn-comic.com</a>， <a href="https://www.cool-manga.com/">www.cool-manga.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.acgnbus.com/">ACG漫画网</a>
                </td>
                <td>Mobile限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://twhentai.com/">TWHentai</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="http://hentai.desi/">十八禁成人H漫</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.177pica.com/">177漫画</a>
                </td>
                <td>
                    <a href="http://www.177picyy.com/">www.177picyy.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://yousemanhua.com/">有色漫画网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.91jinman.com/">91禁漫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xn--wgv69rba1382b.com/">漫香阁</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yidan.in/">一耽女孩</a>
                </td>
                <td>SPA網頁，Mobile限定</td>
            </tr>
            <tr>
                <td>
                    <a href="http://kkcomic.vip/">快看禁漫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.sesemanhua.com/">色色漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mobile.jymhapp.com/">九妖漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://rimanzhijia.com/">日漫之家</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://se8.us/">韩漫库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tptoon.com/">头牌漫画网</a>
                </td>
                <td>
                    <a href="https://xs8.me/">地址发布页，Mobile限定</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://nnhanman6.com/">鸟鸟韩漫</a>
                </td>
                <td>寫真請點開第一章，直接翻到底。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://atm333.com/">凹凸漫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.roumanhua.com/">肉漫画网</a>
                </td>
                <td>
                    <a href="https://m.roumanhua.net/">m.roumanhua.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.zuixindehanman.com/">最新韩漫网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hanman100.com/">韩漫100</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hanmanmianfei.com/">免费韩漫看</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hanmantop.com/">韩漫推荐</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://aicomic.org/">爱漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.diyihm.com/">日韩漫画</a>
                </td>
                <td>Mobile限定， <a href="https://www.lltoon.com/">www.lltoon.com</a>， <a href="https://www.rrtoon.com/">www.rrtoon.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://wwtoon.com/">歪歪漫画</a>
                </td>
                <td>Mobile限定， <a href="https://www.zztoon.com/">www.zztoon.com</a>， <a href="https://www.vvtoon.com/">www.vvtoon.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://51comic.org/">51漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://1zse.com/">一之涩漫画</a>
                </td>
                <td>
                    <a href="https://hatazi.com/">哈塔兹漫画</a>， <a href="https://www.bulota.com/">布罗塔漫画</a>， <a href="https://522160.xyz/">物二漫画</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://naluhd.com/">那露漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hdcomic.com/booklist/?tag=%E7%9C%9F%E4%BA%BA">狮城漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hmllk.com/">韩漫连连看</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.44te.com/">特漫网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jcomic.net/">JComic</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://18h.animezilla.com/">18H 宅宅愛動漫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ho5ho.com/">HO5HO</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bad.news/mh">成人漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://a.123548.xyz/">H漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://h-webtoon.com/">韓漫射</a>
                </td>
                <td>同格式， <a href="https://h-doujinshi.xyz/">h-doujinshi.xyz</a>， <a href="https://18hmanga.com/">18hmanga.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.okcomic.net/">ok漫画網</a>
                </td>
                <td>
                    <a href="https://m.okcomic.net/">m.okcomic.net</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://toptoon.shop/">顶通漫画</a>
                </td>
                <td>
                    <a href="https://toptoon123.xyz">地址发布页</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.rhmanhua12.xyz/">H肉番动漫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://semanji.com/">色漫集</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://155comic.com/">155漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://18manga.top/">18H汉化漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hanime1.biz/home">hanime1.biz</a>
                </td>
                <td>
                    <a href="https://anime01.xyz/">科學域名</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://javabc.club/">JavABC</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://txcomic.com/">桃心漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://javcomics.site/">日本禁漫屋</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.55comic.com/">污污漫畫</a>
                </td>
                <td>需要自動滾動元素，動態捕獲canvas轉為BlobURL。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://tranh18.com/">Tranh 18</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://lxmanga.life/">LXMANGA</a>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
</details>
<h2>漫畫類內置規則支持列表</h2>
<p>漫畫類為了兼容我提交給東方永頁機的翻頁規則和自己寫的專用腳本，規則幾乎都是預設為關閉狀態。</p>
<p>如有需要請透過UI選項設定開啟或幹脆修改腳本規則，也需要關閉東方永頁機或自己加黑名單，不然會衝突。</p>
<p>透過UI開啟當前漫畫站規則的步驟 > 前往漫畫網站的閱讀頁面 > 瀏覽器右上角腳本管理器 > 圖片全載 > 設定 > UI > 勾選啟用當前漫畫站點規則 > 保存設定</p>
<p>2023/11/25 常規模式，絕大多數漫畫站增加了預讀下一話圖片的功能，有效的減少等待圖片載入的時間。</p>
<p>2024/04/27 為一些常用連線品質較好的網站，添加無限滾動模式(自動翻頁)閱讀功能，透過腳本管理器選單開啟。</p>
<p>2024/05/10 無限滾動模式增加了預讀下一話和圖片的功能，讓翻頁更流暢。</p>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
    <table>
        <thead>
            <tr>
                <th>
                    <strong>網站</strong>
                </th>
                <th>
                    <strong>備註</strong>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <a href="https://www.comicabc.com/">8Comic無限動漫</a>
                </td>
                <td>
                    <a href="https://m.comicbus.com/">m.comicbus.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.copymanga.site/">拷貝漫畫</a>
                </td>
                <td>
                    <a href="https://copymanga.site/">copymanga.site</a>， <a href="https://www.copymanga.tv/">www.copymanga.tv</a>， <a href="https://copymanga.tv/">copymanga.tv</a>， <a href="https://www.mangacopy.com/">www.mangacopy.com</a>， <a href="https://mangacopy.com/">mangacopy.com</a>，PC版向下滾動隱藏工具列，手機版需在閱讀頁重新載入一次才會生效，有無限滾動模式
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.manhuagui.com/">Manhuagui看漫画</a>
                </td>
                <td>
                    <a href="https://tw.manhuagui.com/">tw.manhuagui.com</a>， <a href="https://m.manhuagui.com/">m.manhuagui.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.baozimh.com/">🌈️包子漫畫</a>
                </td>
                <td>有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://godamh.com/">GODA漫畫</a>
                </td>
                <td>
                    <a href="https://nav.telltome.net/">发布页</a> ，閱讀頁域名為n.cocolamanhua.com，有無限滾動模式加預讀，擋廣告套件規則AdGuard Chinese、EasyList China可能會封鎖API請求，導致無法取得圖片資料，如有此情況需uBlock加信任名單。
                    <pre>https://n.cocolamanhua.com/*/</pre>腳本自帶去廣告，還你乾淨的閱讀感受。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://m.baozimh.one/">包子漫畫</a>
                </td>
                <td>閱讀頁域名為baozimh.one，有無限滾動模式加預讀。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhuascans.org/">GodaComic 英文漫画</a>
                </td>
                <td>有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhuascan.us/">Manhuascan 英文漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.dm5.com/">DM5</a>
                </td>
                <td>
                    <a href="https://m.dm5.com/">m.dm5.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://hk.1kkk.com/">極速</a>
                </td>
                <td>
                    <a href="https://m.1kkk.com/">m.1kkk.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.manhuaren.com/">漫画人</a>
                </td>
                <td>Mobile限定，有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mangabz.com/">Mangabz</a>
                </td>
                <td>PC版向下滾動隱藏工具列，有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://xmanhua.com/">Xmanhua</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.yymanhua.com/">yymanhua</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.cartoonmad.com/">動漫狂</a>
                </td>
                <td>
                    <a href="https://www.cartoonmad.com/m/">動漫狂M</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.manhuadb.com/">漫画DB</a>
                </td>
                <td>有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.manmanju.cc/">漫漫聚</a>
                </td>
                <td>
                    <a href="http://m.manmanju.cc/">m.manmanju.cc</a>，閱讀頁添加了下一話鏈接，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://manhua.dididm.cc/">KuKu动漫</a>
                </td>
                <td>
                    <a href="http://m.dididm.cc/">m.dididm.cc</a>，閱讀頁添加了下一話鏈接，有無限滾動模式加預讀
                </td>
            <tr>
                <td>
                    <a href="https://www.gufengmh9.com/">古风漫画网</a>
                </td>
                <td>
                    <a href="https://m.gufengmh9.com/">m.gufengmh9.com</a>， <a href="https://www.gf618.com/">www.gf618.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.laimanhua8.com/">来漫画</a>
                </td>
                <td>
                    <a href="https://m.laimanhua8.com/">m.laimanhua8.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.veryim.com/">非常爱漫</a>
                </td>
                <td>Mobile限定，有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mh160.cc/">漫画160</a>
                </td>
                <td>
                    <a href="http://m.mh160.cc/">m.mh160.cc</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.guoman8.cc/">国漫吧</a>
                </td>
                <td>
                    <a href="http://m.guoman8.cc/">m.guoman8.cc</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.guoman.net/">爱国漫</a>
                </td>
                <td>
                    <a href="https://m.guoman.net/">m.guoman.net</a>，章節混亂重複都不整理，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.dashumanhua.com/">大树漫画</a>
                </td>
                <td>部分漫畫雖然被下架但代碼資料還在，依然能插入圖片，章節混亂重複都不整理，有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.shilunart.com/">世伦漫画</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://m.gaonaojin.com/">仙漫网M</a>
                </td>
                <td>有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://dogemanga.com/">漫畫狗</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.fffdm.com/manhua/">风之动漫</a>
                </td>
                <td>SPA網頁，閱讀頁添加了下一話鏈接，並排模式無法顯示</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.dagemanhua.com/">大哥漫画</a>
                </td>
                <td>
                    <a href="https://m.dagemanhua.com/">m.dagemanhua.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.iimanhuapi.com/">漫画皮</a>
                </td>
                <td>
                    <a href="https://m.iimanhuapi.com/">m.iimanhuapi.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hahacomic.com/">哈哈漫画</a>
                </td>
                <td>漫畫列表添加自動翻頁功能</td>
            </tr>
            <tr>
                <td>
                    <a href="https://terra-historicus.hypergryph.com/">明日方舟泰拉记事社</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.colamanga.com/">COLAMANGA</a>
                </td>
                <td>方向鍵上下章，手動按6自動滾動等待全部圖片載入，或勾選腳本管理器選單的自動滾動所有惰性載入的圖片元素，載入頁面後立即開始自動滾動，下載需先觸發載入全部圖片，圖址如為blob函式會使用到canvas需要繪製過程會有點卡。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://manwa.me/">漫蛙</a>
                </td>
                <td>uBlock加信任名單
                    <pre>https://manwa.me/chapter/*</pre> ，手動按6自動滾動等待全部圖片載入，或勾選腳本管理器選單的自動滾動所有惰性載入的圖片元素，載入頁面後立即開始自動滾動，閱讀頁去廣告無提示、方向鍵上下章、向下滾動隱藏工具列、更新頁自動載入更多、目錄展開全部章節，下載需先觸發載入全部圖片，函式使用到canvas需要繪製過程會有點卡。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.yinghuamh.net/">樱花漫画</a>
                </td>
                <td>圖片伺服器很不穩定，下載很容易404。</td>
            </tr>
            <tr>
                <td>微信公众号</td>
                <td>樱花漫画、快岸漫画的漫畫目錄鏈結，有的是導向漢化組的公眾號發布的漫畫鏈結。</td>
            </tr>
            <tr>
                <td>虎扑社区</td>
                <td>樱花漫画、快岸漫画的漫畫目錄鏈結，有的是導向漢化組在虎扑社区發布的帖子鏈結。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.lightnovel.us/">轻之国度</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://m.happymh.com/">嗨皮漫畫</a>
                </td>
                <td>圖片手動插入、閱讀、展開目錄、自動點擊載入、漫畫鏈接新分頁打開，預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://m.dmzj.com/">动漫之家M</a>
                </td>
                <td>
                    <a href="https://m.idmzj.com/">m.idmzj.com</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://komiic.com/">Komiic</a>
                </td>
                <td>SPA網頁，預設關閉，網站每天有瀏覽限制。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ikanbook.net/">快岸漫画</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.acgwd.com/">亲亲漫画</a>
                </td>
                <td>
                    <a href="http://m.acgwd.com/">m.acgwd.com</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.77mh.xyz/">新新漫画</a>
                </td>
                <td>
                    <a href="https://m.77mh.xyz/">m.77mh.xyz</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.zerobyw8.com/">zero搬运网</a>
                </td>
                <td>預設關閉， <a href="https://zerobyw.github.io/">域名</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.gaonaojin.com/">仙漫网</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.2animx.com/">二次元動漫</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.k886.net/">看漫畫</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.2nunu.com/">奴奴漫畫</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.dongman.la/">動漫啦</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.manben.com/">漫本</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://comic.acgn.cc/">動漫戲說</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.92mh.com/">92漫画</a>
                </td>
                <td>
                    <a href="http://m.92mh.com/">m.92mh.com</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.manhua456.com/">漫画456</a>
                </td>
                <td>
                    <a href="https://m.manhua456.com/">m.manhua456.com</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.gmh1234.com/">漫画1234</a>
                </td>
                <td>
                    <a href="https://m.gmh1234.com/">m.gmh1234.com</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.ykmh.com/">优酷漫画</a>
                </td>
                <td>
                    <a href="http://h5.ykmh.com/">h5.ykmh.com</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.mkzhan.com/">漫客栈</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mhw1.com/">漫画屋</a>
                </td>
                <td>
                    <a href="http://www.cmh5.com/">www.cmh5.com</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.obq8.com/">笔趣阁漫画</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.umh5.com/">有漫画屋</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="http://797mh.com/">漫画网</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="http://comics.veryim.com/">非常爱漫舊站</a>
                </td>
                <td>
                    <a href="http://wap.veryim.com/">wap.veryim.com</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wujinmh.com/">无尽漫画</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://mh5.tw/">漫畫屋</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.setnmh.com/">山立漫畫</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tvbsmh.com/">TVBS漫畫</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.szcdmj.com/">砂之船动漫家</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.bikamanhua.com/">哔咔漫画</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.52hah.com/">聚合漫画屋</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.kukanmanhua.com/">酷看漫画</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.pipiman.com/">皮皮漫画</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.webtoons.com/zh-hant/">LINE WEBTOON</a>
                </td>
                <td>目錄聚集所有章節、閱讀，預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.dongmanmanhua.cn/">咚漫</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://manga.bilibili.com/">哔哩哔哩漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.kanman.com/">看漫画</a>
                </td>
                <td>預設關閉</td>
            </tr>
        </tbody>
    </table>
</details>
<h2>AI繪圖類內置規則支持列表</h2>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
    <p>請透過腳本管理器選單開啟Lazy Load加載大圖功能，批量下載請使用其他圖片下載腳本。</p>
    <p>可點擊右下的眼睛圖示新分頁觀看圖片，並且會顯示抓取到的圖片數量。</p>
    <table>
        <thead>
            <tr>
                <th>
                    <strong>網站</strong>
                </th>
                <th>
                    <strong>備註</strong>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <a href="https://civitai.com/">Civitai</a>
                </td>
                <td>SPA網頁，Lazy Load加載大圖，支持自動顯示NSFW被模糊的圖片。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.liblib.art/">LiblibAI</a>
                </td>
                <td>SPA網頁，Lazy Load加載大圖。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://tensor.art/">Tensor.Art</a>
                </td>
                <td>SPA網頁，Lazy Load加載大圖。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://pixai.art/">PixAI</a>
                </td>
                <td>SPA網頁，Lazy Load加載大圖。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://yodayo.com/explore/">Yodayo</a>
                </td>
                <td>SPA網頁，加載大圖。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://creator.nightcafe.studio/explore">NightCafe Creator</a>
                </td>
                <td>SPA網頁，Lazy Load加載大圖，不穩定需要上下滾動重複觸發，右下的眼睛數字沒有增加，代表沒有抓到新圖。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://legacy.midjourney.com/showcase/recent/">Midjourney</a>
                </td>
                <td>沒有更高解析度的圖片，只是能聚集到新分頁觀看。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://neural.love/search">neural.love</a>
                </td>
                <td>SPA網頁，加載大圖。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://playground.com/feed">Playground</a>
                </td>
                <td>SPA網頁，Lazy Load加載大圖。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://pornderful.ai/search">Pornderful.ai</a>
                </td>
                <td>SPA網頁，Lazy Load加載大圖，首頁會有閃爍的問題。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.seaart.ai/">SeaArt Al</a>
                </td>
                <td>SPA網頁，Lazy Load加載大圖。</td>
            </tr>
        </tbody>
    </table>
</details>
<h2>輔助類內置規則支持列表</h2>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
    <table>
        <thead>
            <tr>
                <th>
                    <strong>網站</strong>
                </th>
                <th>
                    <strong>備註</strong>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>漫畫類</td>
                <td>自動展開目錄</td>
            </tr>
            <tr>
                <td>m.4khd.com</td>
                <td>自動跳轉，擋廣告需加入白名單。</td>
            </tr>
            <tr>
                <td>4kup.net</td>
                <td>自動跳轉</td>
            </tr>
            <tr>
                <td>ouo.io</td>
                <td>自動跳轉</td>
            </tr>
            <tr>
                <td>cuty.io</td>
                <td>自動跳轉</td>
            </tr>
            <tr>
                <td>link1s.com</td>
                <td>自動跳轉</td>
            </tr>
            <tr>
                <td>Binto.click</td>
                <td>自動跳轉</td>
            </tr>
            <tr>
                <td>stfly.me</td>
                <td>半自動跳轉</td>
            </tr>
            <tr>
                <td>www.mediafire.com</td>
                <td>自動下載</td>
            </tr>
            <tr>
                <td>anonfiles.com</td>
                <td>自動下載</td>
            </tr>
            <tr>
                <td>letsupload.cc</td>
                <td>自動下載</td>
            </tr>
            <tr>
                <td>94i.in</td>
                <td>自動簽到</td>
            </tr>
            <tr>
                <td>supjav.com</td>
                <td>立即顯示影片縮圖</td>
            </tr>
        </tbody>
    </table>
</details>
