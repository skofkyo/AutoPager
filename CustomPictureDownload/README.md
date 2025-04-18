<h1>安裝腳本</h1>
<a href="https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/FullPictureLoad_Github.user.js">Github版</a>
<br>
<a href="https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/FullPictureLoad.user.js">GreasyFork版</a>
<h1>測試通過環境：</h1>
<pre>
2025/04/18
PC
Chrome 135.0.7049.96 + Tampermonkey 5.1.1 or Tampermonkey 5.3.3 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
Edge 135.0.3179.85 + Tampermonkey 5.3.3 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
FireFox 137.0.2 + Tampermonkey 5.3.3 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
Android
☆Edge Canary 137.0.3265.0 + Tampermonkey 5.3.3 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
☆Lemur Browser 2.7.3.002 + Tampermonkey 5.3.3 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
☆Firefox for Android 137.0.2 + Tampermonkey 5.3.3 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
<a href="https://github.com/kiwibrowser/src.next/releases/tag/12867802748">Kiwi Browser 132.0.6961.0</a> + Tampermonkey 5.1.1 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
Waterfox 1.0.13 + Tampermonkey 5.3.3 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
Edge 135.0.3179.72 + Tampermonkey 5.3.3 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
Mises Browser 425041604 + Tampermonkey 5.3.3 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
Yandex Browser 25.3.0.33 + Tampermonkey 5.1.1 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
Mask Browser 1.7.3.8 + Tampermonkey 5.1.1 or Violentmonkey 2.31.0 or ScriptCat 0.16.6
<a href="https://club.yujianpay.com/index.php/archives/13/">雨见浏览器 7.8.15</a> + Tampermonkey 5.3.1 or Violentmonkey 2.30.0 or ScriptCat 0.16.6
<a href="https://www.xbext.com/index.html">XBrowser 5.1.2</a>
<a href="https://viayoo.com/zh-cn/">ViaBrowser 6.3.1</a>
</pre>
<p>PS：一些手機瀏覽器內建安裝腳本功能的，如果需要使用到腳本管理器選單和GM_xmlhttpRequest可能無法正常使用。</p>
<h1>Extensions：</h1>
<ul>
    <li> Chrome <ul>
            <li>
                <a href="https://chromewebstore.google.com/detail/lcmhijbkigalmkeommnijlpobloojgfn">Tampermonkey 5.1.1</a>
            </li>
            <li>
                <a href="https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo">Tampermonkey 5.3.3</a>
            </li>
            <li>
                <a href="https://chromewebstore.google.com/detail/jinjaccalgkegednnccohejagnlnfdag">Violentmonkey</a>
            </li>
            <li>
                <a href="https://chromewebstore.google.com/detail/ndcooeababalnlpkfedmmbbbgkljhpjf">ScriptCat</a>
            </li>
        </ul>
    </li>
    <li> Edge <ul>
            <li>
                <a href="https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd">Tampermonkey</a>
            </li>
            <li>
                <a href="https://microsoftedge.microsoft.com/addons/detail/eeagobfjdenkkddmbclomhiblgggliao">Violentmonkey</a>
            </li>
            <li>
                <a href="https://microsoftedge.microsoft.com/addons/detail/liilgpjgabokdklappibcjfablkpcekh">ScriptCat</a>
            </li>
        </ul>
    </li>
    <li> Firefox <ul>
            <li>
                <a href="https://addons.mozilla.org/firefox/addon/tampermonkey/">Tampermonkey</a>
            </li>
            <li>
                <a href="https://addons.mozilla.org/firefox/addon/violentmonkey/">Violentmonkey</a>
            </li>
            <li>
                <a href="https://addons.mozilla.org/firefox/addon/scriptcat/">ScriptCat</a>
            </li>
        </ul>
    </li>
    <li>
        <a href="https://www.windowslatest.com/2024/04/02/you-can-now-install-any-extension-in-microsoft-edge-canary-for-android/">Edge Canary Extension install by id</a>
        <pre>Tampermonkey
iikmkjmpaadaobahmlepeloendndfphd
Violentmonkey
eeagobfjdenkkddmbclomhiblgggliao
ScriptCat
liilgpjgabokdklappibcjfablkpcekh
uBlock Origin
odfafepnkmbhccpbejgmiehpchacaeak
User-Agent Switcher and Manager
cnjkedgepfdpdbnepgmajmmjdjkjnifa</pre>
    </li>
</ul>
<h1>提醒：</h1>
<ul>
    <li>
        <p>
            <a href="https://github.com/Tampermonkey/tampermonkey/issues/2215">Tampermonkey 5.3.2+的GM_xmlhttpRequest串行化</a>，導致腳本裡有用到GM_xmlhttpRequest的地方會無法多線程(並行化)請求或下載，解決方法需要用戶自行添加補丁。
        </p>
        <pre>
// @require          https://raw.githubusercontent.com/Tampermonkey/utils/refs/heads/main/requires/gh_2215_make_GM_xhr_more_parallel_again.js
        </pre>
        <p>或者Tampermonkey回退至 5.1.1，或改用Violentmonkey、ScriptCat。</p>
    </li>
    <li>
        <p>如果所在區域，ISP，或是不可抗力的因素而無法正常連接cdn.jsdelivr.net的依賴庫時，請自行修改腳本將所有cdn.jsdelivr.net替換成unpkg.com、github.com，或自行尋找可替代的依賴庫CDN。</p>
        <details>
            <summary>
                <kbd>
                    <strong>「 點擊展開查看依賴庫 」</strong>
                </kbd>
            </summary>
            <br>
            <pre>
cdn.jsdelivr.net
// @require            https://cdn.jsdelivr.net/gh/skofkyo/Script@d81bf60c4883c2efc2c1b72f697af808b4a77a09/lib/JSZip.js
// @resource           ajaxHookerJS https://cdn.jsdelivr.net/gh/skofkyo/Script@d81bf60c4883c2efc2c1b72f697af808b4a77a09/lib/ajaxHooker.js
// @resource           JqueryJS https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @resource           FancyboxV5JS https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0.36/dist/fancybox/fancybox.umd.js
// @resource           FancyboxV5Css https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0.36/dist/fancybox/fancybox.css
// @resource           FancyboxV3JS https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js
// @resource           FancyboxV3Css https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css
// @resource           ViewerJs https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.js
// @resource           ViewerJsCss https://cdn.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.css
            </pre>
            <pre>
fastly.jsdelivr.net
// @require            https://fastly.jsdelivr.net/gh/skofkyo/Script@d81bf60c4883c2efc2c1b72f697af808b4a77a09/lib/JSZip.js
// @resource           ajaxHookerJS https://fastly.jsdelivr.net/gh/skofkyo/Script@d81bf60c4883c2efc2c1b72f697af808b4a77a09/lib/ajaxHooker.js
// @resource           JqueryJS https://fastly.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @resource           FancyboxV5JS https://fastly.jsdelivr.net/npm/@fancyapps/ui@5.0.36/dist/fancybox/fancybox.umd.js
// @resource           FancyboxV5Css https://fastly.jsdelivr.net/npm/@fancyapps/ui@5.0.36/dist/fancybox/fancybox.css
// @resource           FancyboxV3JS https://fastly.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js
// @resource           FancyboxV3Css https://fastly.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css
// @resource           ViewerJs https://fastly.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.js
// @resource           ViewerJsCss https://fastly.jsdelivr.net/npm/viewerjs@1.11.6/dist/viewer.min.css
            </pre>
            <pre>
unpkg.com
// @require            https://greasyfork.org/scripts/473358/code/JSZip.js?version=1237031
// @resource           ajaxHookerJS https://scriptcat.org/lib/637/1.4.5/ajaxHooker.js#sha256=EGhGTDeet8zLCPnx8+72H15QYRfpTX4MbhyJ4lJZmyg=
// @resource           JqueryJS https://unpkg.com/jquery@3.7.1/dist/jquery.min.js
// @resource           FancyboxV5JS https://unpkg.com/@fancyapps/ui@5.0.36/dist/fancybox/fancybox.umd.js
// @resource           FancyboxV5Css https://unpkg.com/@fancyapps/ui@5.0.36/dist/fancybox/fancybox.css
// @resource           FancyboxV3JS https://unpkg.com/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js
// @resource           FancyboxV3Css https://unpkg.com/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css
// @resource           ViewerJs https://unpkg.com/viewerjs@1.11.6/dist/viewer.min.js
// @resource           ViewerJsCss https://unpkg.com/viewerjs@1.11.6/dist/viewer.min.css
            </pre>
            <pre>
github.com
// @require            https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/js/JSZip.js
// @resource           ajaxHookerJS https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/js/ajaxHooker.js
// @resource           JqueryJS https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/js/jquery.min.js
// @resource           FancyboxV5JS https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/js/fancybox.umd.js
// @resource           FancyboxV5Css https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/css/fancybox.css
// @resource           FancyboxV3JS https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/js/jquery.fancybox.min.js
// @resource           FancyboxV3Css https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/css/jquery.fancybox.min.css
// @resource           ViewerJs https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/js/viewer.min.js
// @resource           ViewerJsCss https://raw.githubusercontent.com/skofkyo/AutoPager/main/CustomPictureDownload/css/viewer.min.css
            </pre>
        </details>
    </li>
    <li>
        <p>紳士漫畫wnacg，由於Fancybox功能的緣故，元素結構導致可能會被擋廣告擴充套件的規則隱藏掉圖片，圖片列表頁、下拉閱讀頁需要加白名單網址(信任名單)，腳本已隱藏廣告元素，或者在該網站關閉Fancybox功能即可不被隱藏圖片，或者直接使用影子畫廊、分頁畫廊來觀看圖片。</p>
        <pre>
https://*wnacg.com/photos-index-aid-*.html
https://*wnacg.com/photos-slide-aid-*.html
https://*wnacg.com/photos-slist-aid-*.html
</pre>
    </li>
</ul>
<h1>簡介：</h1>
<p>寫這個腳本的緣由是，想讓下載、複製連結不用做展開圖庫挑選圖片的動作，能自己決定要儲存的壓縮檔和資料夾名稱，網站沒有限制連接數的話能做到高速聚集所有圖片，還能添加一些我想要的輔助功能。</p>
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
    //填0禁用此規則。
    enable: 0,
    //填0不顯示左下圖示。
    icon: 0,
    //填0不綁定快捷鍵。
    key: 0,
    //將URL拆分判斷，格式類型詳見內置函式的fn.checkUrl(object)。
    url: {
        t: "",
        h: "",
        p: "",
        s: "",
        e: "",
        ee: "",
        st: "",
        d: ""
    },
    //函式寫法返回布林值Boolean。
    url: () => Boolean,
    //url和reg擇其一用作規則匹配的方式。
    //正規表達式匹配網址。
    reg: /www\.xxxxx\.com/,
    //匹配正規表達式陣列。
    reg: [
        /RegExp/,
        /RegExp/
    ],
    //函式寫法返回布林值Boolean。
    reg: () => {
        if (/^https?:\/\/www\.everiaclub\.com\/.+/.test(siteUrl)) {
            if(!siteUrl.includes(".html")) {
                return true;
            }
        }
        return false;
    },
    //當為SPA網頁時URL只匹配域名，page主要用於判斷要匹配的路徑和非動態載入的元素。
    page: () => currentURL.includes("/albums/"),
    //SPA函式判斷返回Boolean或Promise，切換腳本UI事件添加移除。
    SPA: () => {
        if (_this.page()) {
            //等待多個元素
            return fn.waitEle(["img.image", "h1.title"]);
            //當observeURL設置為"body"，等待元素和等待api請求需同時寫在init和SPA，但init只會執行一次，腳本先天設計不良的歷史遺留問題，observeURL設置為"nav"、"gm"、"head"、"loop"，init當SPA返回有效物件皆會再次執行。
            return fetch(api).then(res => res.json()).then(json => {
                siteJson = json;
                return true;
            });
        } else {
            return false;
        }
    },
    SPA: () => _this.page(),
    //SPA網頁不切換UI。
    SPA: true,
    //與SPA屬性搭配使用，觀察URL變化，用於SPA網頁並且URL是會變換的，更替腳本變數諸如globalImgArray、siteJson、nextLink、customTitle、apiCustomTitle。
    //"head"、"body"使用MutationObserver API，"nav"使用Navigation API監聽navigate事件，當不支持時則使用"loop"，"gm"使用window.onurlchange，"loop"使用setInterval。
    observeURL: "head",
    //延遲載入規則。
    delay: 300,
    //網頁必須包含的元素。
    include: "selector",
    //網頁必須包含陣列裡的所有元素。
    include: ["A_selector", "B_selector", "C_selector", "D_selector"],
    //網頁要排除的元素
    exclude: "元素",
    //網頁要排除陣列裡其中的元素。
    exclude: ["A_selector", "B_selector", "C_selector", "D_selector"],
    //載入頁面後要優先執行的代碼。
    init: "code",
    init: () => {
        code;
    },
    //等待直至元素出現。
    init: async () => await fn.waitEle("selector"),
    //等待直至window的環境變數出現。
    init: async () => await fn.waitVar("variable"),
    //動態刪除元素。
    init: () => fn.addMutationObserver(() => fn.remove("div[class][style*='z-index']")),
    //調用fn.createImgBox()，創建一個圖片容器#FullPictureLoadMainImgBox。
    box: ["selector", pos, width number],
    //IMG、DIV、A、LINK、P、SPAN、LI、FIGURE、ARTICLE，9種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A、LINK取href屬性。
    //CSS選擇器
    imgs: "#TheImg",
    //XPath選擇器
    imgs: "//img[@id="TheImg"]",
    //也可自己創建Array，有時大圖是在A元素上需要透過xhr獲取或放在script或變數或透過api取得的json。
    imgs: () => {
        code;
        return Array;
    },
    //提取IMG的srcset屬性，與imgs擇其一使用。
    srcset: "img[srcset]",
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/referrerPolicy
    referrerpolicy: "no-referrer",
    //重複取得圖片元素，特殊情況會用到例如ViperGirls網站。
    repeat: 1,
    //Fancybox要用的縮略圖網址選擇器。
    thums: ".thums",
    //提取影片網址只支持有src屬性的html tag。
    videos: "video>source",
    //頁面不適合直接修改插入腳本用的圖片，在頁面右下創建一個浮動可拖動的捕獲之眼，這樣行動裝置才能使用到分頁畫廊。
    capture:  "selector",
    capture: () => _this.imgs(),
    //手動調用自訂函式, 綁定快捷鍵數字鍵6，浮動選單增加自訂函式選單項。
    fn: () => {
        …code;
    },
    //[自動滾動元素, 滾動的間隔], 綁定快捷鍵數字鍵6。
    //scrollEle當規則有fn屬性時無法調用。
    scrollEle: ["selector", time],
    scrollEle: async () => {
        …code;
    },
   //插入圖片之前要執行的代碼。
    insertImgBF: () => {
        code;
    },
    //插入圖片之前先創建圖片容器。
    insertImgBF: () => fn.createImgBox(".album-gallery", 2),
    //[無作用, "寬度%", 增加上邊界]，有此屬性才會添加頁面功能按鈕。
    button: [4, "24%", 1],
    //[清空此元素內容插入圖片, 0(手動)1(自動)2(自動Lazy loading模式)3(手動Lazy loading模式), 自動延遲時間(預設0)]。
    insertImg: ["selector", 1, time],
    insertImg: [
        ["selector", (插入在此元素) 0(裡面)1(之前) 2(之後), "remove selector"], 0(手動) 1(自動) 2(自動、Lazy模式) 3(手動、Lazy模式), 自動延遲時間(預設0)
    ],
    //更改頁面容器底部統計圖片數量的文字顏色。
    endColor: "white",
    //插入圖片之後要執行的代碼。
    //參數parent是插入的圖片的父元素，參數buttonBar是頁面功能按鈕的容器元素。
    insertImgAF: (parent, buttonBar) => {   
        code;
    },
    //元素選擇器取得元素的字串。
    customTitle: ".title",
    customTitle: () => {
        code;
        return text;
    },
    //參數mode，0快捷鍵觸發，1載入頁面後立即開始下載，與next搭配可以實現全自動下載，time延遲幾秒後點擊下一頁(預設5)。
    autoDownload: [mode, time],
    //設定下一頁元素綁定右方向鍵點擊下一頁。
    next: "//a[text()='下一章']",
    next: () => {
        code;
        return link;
    },
    //設定上一頁元素綁定左方向鍵點擊上一頁，填1則使用history.back();。
    prev: "//a[text()='上一章']",
    //自訂樣式。
    css: "css",
    //自訂樣式只作用在觸控裝置。
    mcss: "css",
    //用CSS隱藏元素。
    hide: "A_selector,B_selector",
    //載入頁面後點擊一次此元素，能簡單做到自動簽到、展開目錄、Show All。
    autoClick: "selector",
    //元素,time延遲多少毫秒後才點擊(預設1000)
    autoClick: ["selector", time],
    //使用Intersection Observer API，元素進入可視範圍內才點擊。
    observerClick: "selector",
    observerClick: ["A_selector", "B_selector"],
    //監聽scroll事件，滾至頁面底部時點擊元素，能簡單做到自動載入更多。
    loadMore: "selector",
    //指定的A元素在新分頁開啟。
    openInNewTab: ".manga-cover>a:not([target=_blank])",
    //添加返回頂部按鈕。
    topButton: true,
    //有些網站限制連接數，下載連接數太大容易出錯，適當降低連接數。
    threading: 1,
    //使用Fetch API下載圖片，需要圖片下載請求的伺服器有開放CORS。
    fetch: 1,
    //下載圖片時傳遞的參照頁，預設是使用當前域名，"url"參照頁為當前文檔網址，"src"參照頁為圖片網址，也能自訂如"https://www.example.com/"或空""。
    referer: "src",
    //下載變數videoSrcArray裡的影片直連網址。
    downloadVideo: true,
    //漫畫分類標記有無限滾動模式。
    infiniteScroll: true,
    //禁止圖片背景預讀。
    preload: 0,
    //1影子畫廊強制改調用Iframe畫廊，0即使設置了fancybox屬性，依然調用影子畫廊。
    gallery: 1,
    //離開影子畫廊後要滾動到此元素的位置，寫成"last:selector"則取多個元素的最後一個。
    focus: "selector",
    //不是簡單的首尾元素就寫成用函式判斷返回DOM元素。
    focus: () => HTMLElement,
    //離開影子畫廊後要運行的函式。
    closeAF: () =>,
    //0不能自動進入影子畫廊。
    aeg: 0,
    //類別photo、nsfw1、nsfw2、hcomic、comic、ad、none
    category: "comic"
}, {
    name: "規則2",
    enable: 0,
    icon: 0,
    key: 0,
    url: {
        t: "",
        h: "",
        p: "",
        s: "",
        e: "",
        d: ""
    },
    url: () =>,
    reg: /www\.xxxxx\.com/,
    reg: [
        //,
        //
    ],
    reg: () =>,
    page: () =>,
    SPA: () =>,
    SPA: true,
    observeURL: "head",
    delay: 300,
    include: "",
    include: [""],
    exclude: "",
    exclude: [""],
    init: "code",
    init: () => {
        code
    },
    box: ["selector", 1], 
    imgs: "",
    imgs: () => {
        code
    },
    srcset: "",
    referrerpolicy: "no-referrer",
    repeat: 1,
    thums: "",
    videos: "",
    capture:  "",
    capture: () => _this.imgs(),
    fn: () =>,
    scrollEle: ["", 500],
    scrollEle: async () => {
        …code;
    },
    button: [4],
    insertImg: ["", 2, time],
    insertImg: [
        ["", 1, ""], 2, time
    ],
    endColor: "white",
    insertImgBF: () => {
        code;
    },
    insertImgAF: (parent, buttonBar) => {
        code;
    },
    customTitle: "",
    customTitle: () => {
        code
    },
    customTitle: () => fn.dt({
        s: "",
        d: ""
    }),
    autoDownload: [1, time],
    next: "",
    next: () => {
        code
    },
    prev: "",
    css: "",
    mcss: "",
    hide: "",
    autoClick: "",
    autoClick: ["", time],
    observerClick: "",
    observerClick: [""],
    loadMore: "",
    openInNewTab: "",
    topButton: true,
    threading: 1,
    fetch: 1,
    referer: "src",
    downloadVideo: true,
    infiniteScroll: true,
    preload: 0,
    gallery: 1,
    focus: "",
    focus: () =>,
    closeAF: () =>,
    aeg: 0,
    category: ""
}, {
    name: "規則3",
    …
}]
</pre>
<pre>
// 網站自帶Fancybox燈箱功能，不注入FancyboxCSS樣式。
fancybox: {
    v: 3,
    css: false
},
// 頁面容器使用Fancybox3.5.7。
fancybox: {
    v: 3,
    insertLibrarys: 1
},
// 不使用燈箱功能。
fancybox: {
    blacklist: 1
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
    <p>需要更高級的自動翻頁功能請使用東方永頁機(Pagetual)。</p>
    <pre>
變數doc初始為當前頁的document，當獲取下一頁後為下一頁的document物件
舉例選取元素
doc.querySelector(selector)
[...doc.querySelectorAll(selector)]
fn.ge(selector, doc)
fn.gae(selector, doc)
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
        //0(預設可省略)靜態翻頁使用Fetch API加載下一頁，1動態翻頁使用iframe框架加載下一頁，"json"請求的資料格式是JSON，ele、title的第一個參數也是傳入json。
        mode: 0,
        //mode為1時等待直到指定的元素出現，不需要則省略，預設使用主體元素選擇器。
        waitEle: "selector",
        //mode為1時給iframe框架讀取的時間，預設200可省略。
        loadTime: 200,
        frameCode: `
            //mode為1時要注入到iframe裡運行的代碼，由於是字串特殊字元需要轉譯，例如\要表達為\\
            //會改變腳本的frameWindow變數從當前window變為iframe的window
            //可參照8Comic無限動漫自動翻頁規則的用法
        `,
        //mode為"json"時，需要自訂的請求選項。
        fetchOptions: () => {
            let body = {
                "index": "3",
                "post_paged": currentPageNum
            };
            return {
                "headers": {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6",
                    "cache-control": "no-cache",
                    "content-type": "application/x-www-form-urlencoded",
                    "pragma": "no-cache"
                },
                "body": new URLSearchParams(body).toString(),
                "method": "POST"
            }
        },
        //mode為"json"時，請求後要優先執行的函式。
        fetchCB: (json) => (siteJson.max = json.pages),
        //下一頁主體元素選擇器
        ele: "selector",
        ele: (dom) => { 
            //2種寫法
            //1.創建元素和插入元素皆由此函式完成
            //2.創建元素陣列返回元素陣列，搭配pos決定元素插入的位置
            code;
            return [...elements];
        },
        //[插入下一頁主體元素的基準元素, 0裡面1之前2之後]，預設為主體元素最後一個之後，可省略。
        pos: ["selector", 0],
        //下一頁A元素選擇器
        next: "selector",
        next: (dom) => { 
            code;
            return url;
        },
        wait: async () => { 
            //請求完下一頁後要優先執行的代碼
            //用於改變腳本變數globalImgArray、tempNextLink、customTitle，方便後續調用
            //可參照拷貝漫畫M自動翻頁規則的用法
            code;
            return Promise;
        },
        //替換元素，下一頁的元素替換到當前頁面的相同的元素，如標題、頁碼條，不需要則省略。
        re: "selector",
        //用來觸發翻下一頁的元素，有多個元素時取最後一個元素，觸發時機為當元素進入可視範圍時，不使用則省略。
        observer: "selector",
        stop: (dom) => {
            //根據判斷結果返回布林值boolean停止翻頁。
            code;
            if (code) {
                return true
            }
            return false
        },
        //0不顯示下一頁的標題分隔條，顯示則省略。
        showTitle: 0,
        //頁數文字選擇器，標題文字簡略為Page n
        pageNum: "span.current",
        pageNum: (dom) => {
            return num;
        },
        //完整定義標題文字
        title: (dom) => {
            //自定義標題分隔條要顯示的文字，不使用則省略。
            code;
            return titleText;
            //先經過代碼判斷返回obj。
            return {
                ok: (true添加標題,false不添加),
                text: titleText;
            }
        },
        //暫時隱藏元素，當暫停翻頁或最後一頁時取消隱藏。
        hide: "selector",
        //不使用observer時，滾動到距離頁面底部剩餘多少高度px時觸發翻下一頁，預設為當前視窗可視範圍的高度screen.height可省略。
        bottom: 1000,
        //翻頁事件注入的間隔時間ms，預設1000可省略。
        sleep: 1000,
        //1翻頁後添加瀏覽器歷史紀錄，0不添加，預設1可省略。
        history: 1,
        //自動翻頁載入中顯示gif或訊息，gif(預設可省略)，msg顯示在畫面中間的文字訊息。
        loading: "msg",
        //有元素圖片網址放在dataset屬性，IMG元素的src直接使用dataset，DIV、A元素創建style.backgroundImage顯示dataset圖片。
        lazySrc: "selector",
        //下一頁腳本選擇器，將下一頁的腳本代碼插入到當前頁改變變數，不需要則省略。
        script: "//script[contains(text(),'eval')]",
        bF: (dom) => {
            //插入下一頁元素之前要執行的代碼，不需要則省略。
        },
        aF: (dom) => { 
             //插入下一頁元素之後要執行的代碼，不需要則省略。
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
//取得任意物件的類型
console.log(getType([])); //'Array'
console.log(getType({})); //'Object'
getType(obj);
</pre>
<pre>
//判斷當前是否為觸控裝置
hasTouchEvent
//判斷是否為字串返回布林值
isString(obj);
//判斷是否為數字返回布林值
isNumber(obj);
//判斷是否為布林值返回布林值
isBoolean(obj);
//判斷是否為正規表達式返回布林值
isRegExp(obj);
//判斷是否為物件返回布林值
isObject(obj);
//判斷是否為陣列返回布林值
isArray(obj);
//判斷是否為集合new Set()返回布林值
isSet(obj);
//判斷是否為Promise返回布林值
isPromise(obj);
//判斷是否為函式返回布林值
isFn(obj);
//判斷是否為DOM元素返回布林值
isEle(obj);
//判斷字串是否為完整的網址返回布林值
isURL(obj);
</pre>
<pre>
//匹配網址和頁面元素，用於規則屬性url和reg是函式的寫法
//t = document.title 匹配標題部分字串，類型可為字串、正規表達式、字串或正規表達式的陣列
//h = hosts 匹配網站的域名，類型可為字串、正規表達式、字串或正規表達式的陣列
//p = pathname 匹配網址的路徑，類型可為字串、正規表達式、字串或正規表達式的陣列
//s = search 匹配網址的查詢參數，類型可為字串或正規表達式
//e = elements 匹配網頁的元素選擇器，類型可為字串或字串的陣列，如為陣列則網頁必須匹配到陣列裡的所有選擇器
//ee = exclude elements 排除網頁的元素選擇器，類型可為字串或字串的陣列
//st = script text content 匹配非外部引入的script的關鍵字串，類型可為字串、正規表達式、字串或正規表達式的陣列，如為陣列則必須匹配到陣列裡的所有關鍵字串
//d = device "m"此規則只適用觸控裝置，"pc"此規則只適用電腦
//規則屬性imgs和customTitle如果是選擇器字串，會自動判斷頁面是否有符合的元素
const object = {
    //String or RegExp or Array [String or RegExp]
    t: [
        "4KHD",
        "包子"
    ],
    //String or RegExp or Array [String or RegExp]
    h: [
        "example.com",
        /^example\.com$/
    ],
    //String or RegExp or Array [String or RegExp]
    p: "",
    //String or RegExp
    s: "",
    //String or Array [String]
    e: [
        "selector"
    ],
    d: "m"
}
fn.checkUrl(object);
</pre>
<pre>
//返回選擇器的首個元素，支持CSS/Xpath選擇器
fn.ge("selector");
fn.ge("selector", doc = document);
fn.ge("selector", node);
fn.ge(String, HTMLDocument or HTMLElement);
</pre>
<pre>
//返回選擇器的所有元素的陣列，支持CSS/Xpath選擇器
fn.gae("selector");
fn.gae("selector", doc = document);
fn.gae("selector", node);
fn.gae(String, HTMLDocument or HTMLElement);
</pre>
<pre>
//返回A選擇器的首個A元素的href
fn.gu("selector");
fn.gu("selector", doc = document);
fn.gu(String, HTMLDocument or HTMLElement);
</pre>
<pre>
//返回A選擇器的所有A元素的href的陣列並且去除重複
fn.gau("selector");
fn.gau("selector", doc = document);
fn.gau(String, HTMLDocument or HTMLElement);
</pre>
<pre>
//取得元素的字串
//mode
//1返回指定元素的字串(預設)
//2返回指定元素的上一個元素的字串
//3返回指定元素的上上一個元素的字串
fn.gt("selector");
fn.gt("selector", mode = 1, doc = document);
fn.gt(String, Number, HTMLDocument or HTMLElement);
</pre>
<pre>
//取得元素的字串
//選擇器為陣列時，依序判斷元素是否存在與字串數是否大於0。
//例如要拿h1,h2的字串，h1元素在前是英文，h2元素在後是中文，想要先拿中文就寫成["h2", "h1"]。
fn.getText("selector");
fn.getText("selector", doc = document);
fn.getText(String or Array, HTMLDocument or HTMLElement);
</pre>
<pre>
//刪除指定字串返回字串
//s = selector 元素選擇器
//t = text 文字字串
//d = delete 要刪除的字串，類型可以是字串、正規表達式 、字串或正規表達式的陣列
const objetc = {
    s: String,
    t: String,
    d: String or RegExp or Array [String or RegExp]
}
fn.dt(objetc);
//舉例
//用於刪除元素的字串
{
    s: "h1",
    d: /\(\d+P\)/
}
//用於刪除字串
{
    t: "aaabbb",
    d: "bbb"
}
//用於刪除網頁標題的字串
{
    d: "example.com"
}
</pre>
<pre>
//取得非外部引入的script的字串
//searchValue，關鍵字串或正規表達式
fn.gst(searchValue);
fn.gst(searchValue, doc = document);
fn.gst(String or RegExp, HTMLDocument or HTMLElement);
</pre>
<pre>
//取得元素屬性的值
fn.attr("selector","屬性");
fn.attr("selector","屬性", doc = document);
fn.attr(String, String, HTMLDocument or HTMLElement);
</pre>
<pre>
//創建一個DIV用來放圖片，返回DIV
//元素ID，#FullPictureLoadMainImgBox
//pos 0，添加進指定的元素裡面
//pos 1，插入在指定的元素之前
//pos 2，插入在指定的元素之後
//width，指定最大寬度px
fn.createImgBox("selector");
fn.createImgBox("selector", pos = 0, width = null);
fn.createImgBox(String or HTMLElement, Number, Number);
</pre>
<pre>
//指定元素選擇器或元素陣列，返回提取出的圖片網址陣列。
//IMG、DIV、A、LINK、P、SPAN、LI、FIGURE、ARTICLE，支持dataset和backgroundImage
//不判斷srcset是因為不是所有網站都遵循srcset屬性的格式
fn.getImgSrcArr("selector");
fn.getImgSrcArr("selector", doc = document);
fn.getImgSrcArr(String, HTMLDocument or HTMLElement);
fn.getImgSrcArr(Array [HTMLElement]);
</pre>
<pre>
//比fn.getImgSrcArr()多了判斷srcset、data-srcset、data-lazy-srcset屬性
//主要用於提取IMG的srcset屬性
fn.getImgSrcset("img selector");
fn.getImgSrcset("img selector", doc = document);
fn.getImgSrcset(String, HTMLDocument);
fn.getImgSrcset(Array [HTMLImageElement]);
</pre>
<pre>
//對document.title的字串修改
//mode
//0返回【刪除指定字串的標題(預設)】
//1返回【字串切割取[0]去前後空白】
//2返回【字串切割[0] + "字串" + 字串切割[1]】
//3返回【字串切割[1] + "字串" + 字串切割[0]】
fn.title("字串");
fn.title("字串", mode, doc = document);
fn.title(String or RegExp, Number, HTMLDocument);
</pre>
<pre>
//觀察元素變化執行callback
fn.addMutationObserver(callback, config = MutationObserverConfig, node = document.body);
fn.addMutationObserver(Function or AsyncFunction, Object, HTMLElement);
</pre>
<pre>
//將字串解析成document物件
//搭配fetch(url).then(res => res.text())返回的原始碼使用
fn.doc("字串");
fn.doc(String);
fetch(url).then(res => res.text()).then(text => {
    let doc = fn.doc(text);
    let ele = fn.ge("selector", doc);
    return ele;
})
</pre>
<pre>
//將字串解析成DOM Element，返回DocumentFragment
fn.html("字串");
fn.html(String);
</pre>
<pre>
//將字串解析成xml物件
fn.xml("字串");
fn.xml(String);
</pre>
<pre>
//顯示簡短訊息
//time ms，0持續顯示
fn.showMsg("字串", time = 1000);
fn.showMsg(String, Number);
</pre>
<pre>
//隱藏簡短訊息
fn.hideMsg();
</pre>
<pre>
//延遲運行async/await
//time ms
//msg，0不顯示訊息
await fn.delay(time, msg = 1);
fn.delay(Number, Number);
也能用
delay(Number);
</pre>
<pre>
//等待元素async/await
//間隔100毫秒判斷一次
//有元素返回元素，選擇器參數為陣列時返回元素陣列，超過循環次數返回null。
//max，循環的次數
await fn.waitEle("selector");
await fn.waitEle("selector", max = 200, doc = document);
fn.waitEle(String or Array, Number, HTMLDocument or HTMLElement);
</pre>
<pre>
//等待window環境變數，需要等待多個變數時參數為陣列
//max，循環的次數
await fn.waitVar("variable");
await fn.waitVar("variable", max = 200);
fn.waitVar(String or Array [String], Number);
</pre>
<pre>
//等待函式寫法，預設最大循環300次100ms，30秒。
//callback返回真假值或物件，undefined、null、NaN識別為false。
//callback參數(document, window)
let callback = (dom, win) => {
    return dom.querySelector("img") && ("jQuery" in win);
};
await fn.wait(callback, num = 300);
fn.wait(Function or AsyncFunction, Number);
</pre>
<pre>
//功能基本等同eval()
fn.run("code");
fn.run(String);
</pre>
<pre>
//創建空陣列，取代[] for push()的寫法
//num陣列的長度
fn.arr(num);
fn.arr(num, (_, i) => (i + 1));
fn.arr(Number, Function);
</pre>
<pre>
//移除元素
//time ms，延遲的時間
//Promise可以用await
fn.remove("selector");
fn.remove("selector", time = 0);

//如果需要多個選擇器並且CSS/Xpath混寫可寫成陣列
let selectors = ["cssSelector" , "XpathSelector"]
fn.remove(selectors, time = 0);
fn.remove(String or Array [String], Number);
</pre>
<pre>
//隱藏元素
fn.hideEle("selector");
//如果需要多個選擇器並且CSS/Xpath混寫可寫成陣列
let selectors = ["cssSelector" , "XpathSelector"]
fn.hideEle(selectors);
fn.hideEle(String or Array [String]);
</pre>
<pre>
//清除所有setTimeout和setInterval定時器
//用匿名函式對付匿名函式，可以解決一部份不讓人打開F12開發人員工具的問題
//mode0，預設運行全部
//mode1，Function.prototype.constructor = () => {};
//mode2，只清setTimeout;
//mode3，只清setInterval;
fn.clearAllTimer(mode = 0);
fn.clearAllTimer(Number);
</pre>
<pre>
//插入樣式，需要先用JS判斷的情況用這個
fn.css("css");
fn.css(String);
</pre>
<pre>
//插入A元素;
//url 網址
//selector 元素選擇器或DOM元素
//pos
//0在元素之前
//1在元素之後
//2在元素裡面，最後一個子元素之後
//3在元素裡面，第一個子元素之前。
//text 字串
fn.addUrlHtml("url", "selector", pos = 0, "text");
fn.addUrlHtml(String, String or HTMLElement, Number, String);
</pre>
<pre>
//創建script元素
fn.script(string, number= 0, number = 0, doc = document);
//返回script
fn.script("code");
//插入到document.body
fn.script("code", 0, 1);
//src插入到document.body
fn.script("srcUrl", 1, 1);
</pre>
<pre>
//依序自動滾動元素
//selector 元素選擇器
//ms 滾動的間隔時間
//top 1滾動完後返回頂部0部返回
fn.scrollEles("selector", ms = 100, top = 1);
fn.scrollEles(String, Number);

//依序自動滾動元素EX
//selector 元素選擇器
//callback判斷
//time判斷逾時的時間
//top滾動完後返回頂部，0不返回、1不返回，也能指定元素卷軸置頂。
//end頁面底部元素。
//end_time頁面底部元素完全進入視口可視範圍內後，經過多少時間就結束判斷迴圈。
let options = {
    ele: "selector",
    cb: callback,
    time: 5000,
    top: 1 or "selector",
    end: "selector",
    end_time: 2000
};
fn.aotoScrollEles(options);

//callback例子

//ele參數為滾動的元素自身，此例為判斷元素的子元素有沒有出現img[src]
let callback = (ele) => fn.ge("img[src]", ele);

//此例為判斷元素的src屬性是否已經轉為BlobURL
let callback = (img) => /^blob/.test(img.src);

//也可以用於動態捕獲，有些網站會動態創建元素，進入可視範圍才創建新元素，並且可能也會刪除之前創建的元素。
let arr = [];
let options = {
    ele: "img.gallery-item",
    cb: (ele) => {
        if (/\/media\//.test(ele.src)) {
            arr.push(ele.src);
            return true;
        } else {
            return false;
        }
    },
    time: 1000,
};
await fn.aotoScrollEles(options);
return [...new Set(arr)];
</pre>
<pre>
//確認元素和圖片網址，嘗試取得網址和補全網址，返回一個object。
{
    ok: Boolean, //成功true失敗false
    src: src //成功返回圖片網址
}
fn.checkImgSrc(HTMLElement);
//可以使用封裝好的fn.getImgSrcArr();
</pre>
<pre>
//確認元素有沒有把圖片原始網址放在src以外的屬性，返回一個object。
{
    ok: Boolean, //成功true失敗false
    src: src //成功返回圖片網址
}
fn.checkDataset(HTMLElement);
//可以使用封裝好的fn.getImgSrcArr();
</pre>
<pre>
//確認圖片狀態屬性 返回一個object
{
    ok: Boolean, //成功讀取true失敗false
    width: width, //成功返回圖片寬屬性
    height: height //成功返回圖片高屬性
}
await fn.checkImgStatus(src);
fn.checkImgStatus(String);
</pre>
<pre>
//確認加了CDN[wsrv.nl || wp.com]的圖片網址是否有效，無效則刪除CDN返回原始來源的圖片網址
await fn.checkImageCDN([圖片網址陣列]);
fn.checkImageCDN(Array);			
</pre>
<pre>
//網頁圖片src屬性開頭是blob:的，只能通過再繪製轉換來取得，無法繪製跨域的圖片，會出現跨域汙染的錯誤。
//selector，canvas、img元素選擇器
//type轉換的圖片類型"image/jpeg"、"image/webp"、"image/png"
//quality 壓縮比率 0 ~ 1
//返回BlobURL
fn.imgToBlobURL("selector", type = "image/jpeg", quality = 1);
fn.imgToBlobURL(String, String, Number);
//例子
[...fn.gae(".mh_comicpic img[src^=blob]")].map(e => fn.imgToBlobURL(e));
</pre>
<pre>
//封裝fn.imgToBlobURL函式。
//selector，canvas、img元素選擇器
//type轉換的圖片類型"image/jpeg"、"image/webp"、"image/png"
//quality 壓縮比率 0 ~ 1
//返回BlobURL陣列
fn.imgBlobUrlArr("selector", type = "image/jpeg", quality = 1);
fn.imgBlobUrlArr(String, String, Number);
//例子1
fn.imgBlobUrlArr(".mh_comicpic img[src^=blob]");
//例子2
fn.imgBlobUrlArr(".image>img");
</pre>
<pre>
//取得代碼並創建script注入到當前頁面，返回代碼字串。
let obj = {
    cors: true, //跨域
    mode: "dom", //模式，要遍歷script搜索關鍵字用"dom"
    key: "str" //搜索的關鍵字串或正規表達式
};
fn.getCode("url", obj);
//例子1，同網域的連結找含有"Image_List"的script
fn.getCode("url", {
    mode: "dom",
    key: "Image_List"
});
//例子2，注入jQuery依賴庫
fn.getCode("https://code.jquery.com/jquery-3.7.1.min.js", {
    cors: true
});
</pre>
<pre>
//使用Promise封裝GM_xmlhttpRequest
//只取得回應標頭，不接收完整資料，快速確認連結的存活狀態。
fn.xhrHEAD("url");
let status = await fn.xhrHEAD("url").then(res => res.status);
let res = await fn.xhrHEAD("url");
let status = res.status;
if (status == 200) {
    code
} else if (status == 404) {
    code
}
fn.xhrHEAD(String);
</pre>
<pre>
//使用Promise封裝GM_xmlhttpRequest
//傳入連結陣列抓取免空圖床的圖片，返回圖片網址的陣列
//imx.to、imagebam、postimg...等等
fn.getImageHost([links]);
fn.getImageHost(Array);
</pre>
<pre>
//使用Promise封裝GM_xmlhttpRequest
//需要跨域CORS、更改參照頁，更改瀏覽器UA時可用。
fn.xhr("url", details = {});
fn.xhr("url", {
    responseType: "json"
}).then(json => {
    console.log("測試json", json);
})
fn.xhr("url", {
    responseType: "blob"
}).then(blob => {
    console.log("測試blob", blob);
})
fn.xhr(String, Object);
</pre>
<pre>
//使用Promise封裝GM_xmlhttpRequest，返回經過文字編碼的document，避免字元亂碼，需要跨域時使用。
fn.xhrDoc("url", details = {})
fn.xhrDoc("url", {
    headers: {
        "Referer": location.href,
        "User-Agent": navigator.userAgent
    }
})
fn.xhrDoc("url").then(doc => {
    console.log("測試doc", doc);
})
fn.xhrDoc(String, Object);
</pre>
<pre>
//使用Fetch API，返回經過文字編碼的document，避免字元亂碼。
//無法修改User-Agent
fn.fetchDoc("url", details = {});
fn.fetchDoc("url").then(doc => {
    console.log("測試doc", doc);
})
fn.fetchDoc(String, Object);
</pre>
<pre>
//必須同源不能跨域
//使用Promise封裝iframe框架，返回iframe框架的document。
//selector元素選擇器指定等待到元素出現(必須)
//time框架載入逾時的時間
//參數dom為iframe的document，參數frame為iframe的contentWindow
let callback = (dom, frame) => {
    自由發揮
};
await fn.iframeDoc("url", "selector", time = 5000, callback);
fn.iframeDoc(String, String, Number, Function or AsyncFunction);
</pre>
<pre>
//必須同源不能跨域
//使用Promise封裝Fetch API搭配iframe框架，返回iframe框架的document。
//fetch()取得html原始碼傳入iframe框架，需要用iframe框架加載網頁，網站卻又容易卡住逾時時使用，fetch()逾時524或發生400以上錯誤碼，自動重試。
//selector元素選擇器指定等待到元素出現(必須)
//time框架載入逾時的時間
//參數dom為iframe的document，參數frame為iframe的contentWindow
let callback = (dom, frame) => {
    自由發揮
}
await fn.iframeSrcDoc("url", "selector", time = 5000, callback);
fn.iframeSrcDoc(String, String, Number, Function or AsyncFunction);
</pre>
<pre>
//必須同源不能跨域
//使用Promise封裝iframe框架，等待至指定的環境變數出現，返回iframe框架的contentWindow。
let iframe = await fn.iframeVar("url", "declares", time = 1000);
fn.iframeVar(String, String, Number);
</pre>
<pre>
//必須同源不能跨域
//使用Promise封裝iframe框架，讓調用iframe框架能像fetch的寫法
const details = {
    loadTime: 1000, //框架的讀取時間
    waitEle: "img", //指定等待框架直至出現該元素的選擇器
    waitVar: "newImgs", //指定等待框架直至出現該環境變數
    cb: async (dom, frame) => {
        console.log(dom); //iframe的document
        console.log(frame); //iframe的contentWindow
        //同源可以先行對iframe創建script注入代碼，修改contentWindow屬性環境變數，修改document文檔
    }
}
const iframe = await fn.iframe("url", details);
const {
    dom, //iframe的document
    frame //iframe的contentWindow
} = iframe;
const srcs = frame.newImgs;
console.log(srcs);

fn.iframe("url", details).then(object => {
    const {
        dom,
        frame
    } = object;
    console.log(dom);
    console.log(frame);
});

fn.iframe(String, Object);
</pre>
<pre>
//xhr獲取元素，不局限於圖片
//links，A元素選擇器或網址陣列
//selector要獲取的元素選擇器
//targetEle = null，返回元素陣列
//"targetEle"目標元素選擇器清空此元素放入allEle
//["targetEle", pos] targetEle目標元素選擇器，pos放在此元素的位置，0裡面1之前2之後
//removeEle完成所有請求後要移除頁面元素的選擇器
//time請求發送的間隔毫秒，設置為0則單線程請求
await fn.getEle([links], "selector", targetEle = null, removeEle = null, time = 100);
fn.getEle(String or Array, String, null or String or Array [String, Number], null or String, Number);
//跨域
await fn.getCorsEle([links], "selector", targetEle = null, removeEle = null, time = 100);
fn.getCorsEle(String or Array, String, null or String or Array [String, Number], null or String, Number);
</pre>
<pre>
//使用iframe單一線程獲取元素，不局限於圖片，返回元素陣列
//links，A元素選擇器或網址陣列
//selector要獲取的元素選擇器
//["targetEle", pos] targetEle目標元素選擇器，pos放在此元素的位置，0裡面1之前2之後，類翻頁模式。
//time請求發送的間隔毫秒
await fn.getEleF([links], "selector", targetEle = null);
fn.getEleF(String or Array, String, null or Array [String, Number]);
</pre>
<pre>
//xhr抓取圖片元素，返回圖片網址 (只支持靜態網頁，無法跨域請求)
//max填入用fn.gt()取得最大頁數的數字，或想辦法算出最大頁數的數字。
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
//IMG、DIV、A、LINK、P、SPAN、LI、FIGURE、ARTICLE，9種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A、LINK取href屬性。
fn.getImg("元素選擇器",max ,mode ,["圖片網址用來替換的字串","圖片網址要被替換的字串"], 請求發送的間隔毫秒)
fn.getImg("selector", max, mode = 1, rText = [null, null], time = 100);
fn.getImg(String, Number, Number, Array [String or RegExp, String] or null, Number);

//獨立出來的可調用函式，返回修改後的連結
fn.getModeUrl("url", mode, num);
</pre>
<pre>
//xhr抓取圖片元素，返回圖片網址的陣列
//fn.getImgO基本同fn.getImg，但使用單線程獲取網頁,能設置獲取網頁的間隔時間，類翻頁模式。
//IMG、DIV、A、LINK、P、SPAN、LI、FIGURE、ARTICLE，9種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A、LINK取href屬性。
fn.getImgO("元素選擇器", max, mode, ["圖片網址用來替換的字串", "圖片網址要被替換的字串"], time(延遲請求下一頁的時間預設200毫秒), "替換頁碼條元素", 0(不顯示獲取訊息))
fn.getImgO("selector", maxPage = 1, mode = 1, rText = [null, null], time = 200, paginationEle = null, msg = 1)
fn.getImgO(String, Number, Number, Array [String or RegExp, String] or null, Number, String or null, Number);
</pre>
<pre>
//fn.getImgIframe基本同fn.getImg，使用iframe框架單線程獲取網頁,能讓網頁運行必要的javaacript。
fn.getImgIframe("圖片元素選擇器", max, mode, "替換頁碼條元素", time(給予框架讀取的時間), 0 不顯示獲取訊息)
fn.getImgIframe("img selector", max, mode, paginationEle = null, time = 1000, showMsg = 1)
fn.getImgIframe(String, Number, Number, String or  null, Number, Number)
</pre>
<pre>
//xhr抓取圖片元素，返回圖片網址的陣列
//mode
//0多線程(預設)
//1單線程，選擇器是字串會把當前頁面的A元素替換成IMG
//2單線程，類翻頁模式
//數字大於等於100，請求間隔模式單位毫秒。
//A元素選擇器的href屬性不能是#和javascript或onclick監聽點擊事件，必須是一般的http連結。
//A元素參數可以傳入自己創建的網址陣列
//IMG、DIV、A、LINK、P、SPAN、LI、FIGURE、ARTICLE，9種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A、LINK取href屬性。
fn.getImgA("元素選擇器", "A元素選擇器", mode, ["圖片網址要替換的字串", "圖片網址要被替換的字串"], 0 不顯示獲取訊息)
fn.getImgA("selector", "a selector", mode = 0, rText = [null, null], showMsg = 1);
fn.getImgA("元素選擇器", "A元素選擇器");
fn.getImgA("元素選擇器", [網址陣列]);
fn.getImgA(String, String or Array, Number, , Array [String or RegExp, String] or null, Number);
</pre>
<pre>
//xhr抓取圖片元素，可跨域抓圖片，返回圖片網址的陣列
//IMG、DIV、A、LINK、P、SPAN、LI、FIGURE、ARTICLE，9種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A、LINK取href屬性。
fn.getImgCorsA("元素選擇器", "A元素選擇器", time = 100);
fn.getImgCorsA("元素選擇器", [網址陣列], time = 100);
fn.getImgCorsA(String, String or Array, Number);
</pre>
<pre>
//翻頁模式聚集圖片或是含A元素的預覽縮圖然後fn.getImgA()
fn.getNP("元素選擇器", "下一頁元素元素選擇器或函式", "判斷為最後一頁的元素選擇器或函式", "替換元素選擇器", time(延遲請求下一頁的時間預設0毫秒), dataset = null, 顯示訊息 = 1)
//判斷為最後一頁的函式舉例
//參數doc是下一頁的document
const last = doc => {
    let ele = fn.ge("#showmore", doc);
    return ele.dataset.page >= ele.dataset.max;
}
const last = doc => {
    let currentPage = fn.ge("#pagenum", doc).innerText.match(/\d+/)[0]; //下一頁的當前頁數
    let totalPage = fn.ge("#pagenum", doc).innerText.match(/\/(\d+)/)[1]; //下一頁的最大頁數
    return currentPage >= totalPage ? true : false; //當前頁數大於等於最大頁數是最後一頁
}
await fn.getNP("selector", "nextLinkEle", lastEle, "paginationEle", time, dataset, msg);
await fn.getNP("selector", "nextLinkEle");
fn.getNP(String, String, String or Function or AsyncFunction, String or null, Number, String, Number);
//用在規則imgs
//應用在包子漫畫的用法
imgs: async () => {
    await fn.getNP(".comic-contain>div:not(.mobadsq)", "//a[contains(text(),'下一頁') or contains(text(),'下一页')]", null, ".comic-chapter>.next_chapter");
    let arr = [...fn.gae(".comic-contain amp-img")].map(e => e.getAttribute("src"));
    return [...new Set(arr)]
}
//應用在小黃書的用法
imgs: async () => {
    await fn.getNP(".photos>a", ".pager a[current=true]+a:not(.next)", null, ".pager");
    return [...fn.gae(".cr_only")].map(e => e.src.replace("_600x0", ""));
}
</pre>
</details>
<h1>圖介：</h1>
<p>在頁面左下添加了一個圖片下載按鈕</p>
<img src="https://i.imgur.com/TxnEvTk.png">
<p>點擊後會彈出篩選UI</p>
<img src="https://i.imgur.com/xZtDrmN.jpeg">
<p>點下載按鈕後就會開始下載壓縮打包圖片</p>
<img src="https://i.imgur.com/m6ewqQd.png">
<p>右鍵點擊圖示複製圖片網址，如果規則insertImg為手動模式，按右鍵是先插入全部圖片，第二次按才是複製圖片網址。</p>
<p>中鍵點擊圖示匯出網址MediaURLs.txt文件</p>
<p>手機用的移動畫廊簡易圖片瀏覽模式。</p>
<img src="https://i.imgur.com/JpEAbG5.jpeg">
<h1>手動模式說明：</h1>
<p>部分規則因種種原因寫成了手動規則</p>
<h3>手動操作頁面聚圖：</h3>
<strong>PC：</strong>
<p>特徵是頁面有左下圖示和浮動選單</p>
<p>1.對頁面左下圖示按滑鼠右鍵</p>
<p>2.鍵盤快捷鍵按1</p>
<p>3.浮動選單按鈕的插入圖片，插入圖片後該選單項會移除。</p>
<strong>Mobile：</strong>
<p>特徵是頁面只有左下圖示</p>
<p>按住頁面的其中一張圖片超過500毫秒</p>
<h3>捕獲模式：</h3>
<img src="https://i.imgur.com/UwFakon.jpeg">
<p>當頁面不適合插入圖片時為此模式，只能透過各個功能入口進入看圖模式</p>
<strong>PC：</strong>
<p>特徵是頁面有左下圖示、浮動選單、右下捕獲之眼圖示</p>
<p>開啟篩選UI：點擊左下圖示或浮動選單篩選下載或快捷鍵F</p>
<p>開啟影子畫廊：浮動選單影子畫廊或快捷鍵G</p>
<p>開啟分頁畫廊：點擊右下眼睛圖示或浮動選單分頁畫廊或快捷鍵8</p>
<strong>Mobile：</strong>
<p>特徵是頁面有左下圖示、右下捕獲之眼圖示</p>
<p>開啟篩選UI：點擊左下圖示</p>
<p>開啟分頁畫廊：點擊右下眼睛圖示或先開啟篩選UI點擊上面的分頁畫廊按紐。</p>
<h1>腳本有綁定按鍵</h1>
<p>數字鍵 0 僅彈出標題輸入框，輸入或修改後開始下載</p>
<p>數字鍵 1 複製圖片網址或手動模式的插入圖片</p>
<p>數字鍵 2 滾動至第一張大圖</p>
<p>數字鍵 3 一鍵下載</p>
<p>數字鍵 4 滾動至最後一張大圖</p>
<p>數字鍵 5 切換圖片顯示模式，原始模式和並排模式</p>
<p>數字鍵 6 有自訂函式或自動滾動元素規則時調用</p>
<p>數字鍵 7 匯出網址MediaURLs.txt文件</p>
<p>數字鍵 8 開啟新空白頁載入圖集圖片</p>
<p>數字鍵 9 開啟自訂網站收藏集</p>
<p>數字鍵 - 減鍵圖片以10%為單位比例縮小，會記憶縮放比例</p>
<p>數字鍵 + 加鍵圖片以10%為單位比例放大，會記憶縮放比例</p>
<p>數字鍵 . 點鍵取消縮放恢復為自動</p>
<p>數字鍵 * 乘鍵顯示選項設定。</p>
<p>數字鍵 / 除鍵初始化當前網站的設定。</p>
<p>F鍵 開啟篩選下載UI。</p>
<p>G鍵 開啟Shadow DOM畫廊，Fancybox5與網站燈箱插件衝突時調用Iframe畫廊。</p>
<p>I鍵 開啟Iframe畫廊。</p>
<p>Esc鍵 可中途取消當前的圖片下載和終止6的自動滾動元素。</p>
<p>Delete鍵 並排模式下當為漫畫分類和並排數為2的H漫分類，用於切換隱藏顯示第一張圖片，當沒有剛好並成雙頁跨頁大圖時使用。</p>
<p>組合鍵 Ctrl + . 開始或取消自動下載，網站需有必要的相關規則。</p>
<p>組合鍵 Ctrl + Alt + T 頁面選取文字後，按此快捷鍵可以快速設定為腳本用的圖集標題，沒有選取文字也會彈出輸入框能手動輸入自訂標題。</p>
<br>
<p>按1，複製圖片網址，如果設置了insertImg為手動，按1、Enter是插入圖片，第二次按是複製圖片網址。</p>
<p>按2，滾動至腳本插入的第一張大圖</p>
<p>按3，一鍵下載，跳過自定義標題的步驟。</p>
<br>
<p>PS：需重複獲取圖片的規則，按1無法複製圖片網址，需點擊頁面功能按鈕或浮動選單按鈕的複製圖址。</p>
<h1>圖片檢視模式</h1>
<h3>1.圖片置中模式</h3>
<p>上方向鍵滾動到目前的上一張圖、下方向鍵滾動到目前的下一張圖</p>
<h3>2.圖片並排模式</h3>
<p>上方向鍵滾動到目前的上一排圖、下方向鍵滾動到目前的下一排圖</p>
<p>漫畫分類當滾動至最後一排後，繼續按下方向鍵會嘗試前往下一集。</p>
<p>所謂的目前是變數記憶的位置，並非當前瀏覽範圍的位置，滑鼠滾動變換位置不會改變變數。</p>
<p>按了上方向鍵和下方向鍵以外的鍵後會再從頭開始滾動。</p>
<br>
<p>如果漫畫站的圖片並排後，圖片高度小於大於瀏覽範圍的高度，需要手動調整瀏覽器的縮放來適配達到最佳的觀看效果。</p>
<p>Chrome內建的縮放跨度太大，建議安裝縮放 for Google Chrome，可以以10%、5%來縮放</p>
<h3>3.Fancybox模式</h3>
<p>點擊腳本插入的圖片開啟Fancybox圖片燈箱展示功能</p>
<p>右和下方向鍵下一張圖(不會觸發前往下一頁)，左和上方向鍵上一張圖(不會觸發前往上一頁)。</p>
<h3>4.分頁畫廊模式</h3>
<p>左下有浮動選單區塊，鼠標懸停彈出顯示。</p>
<p>數字鍵 0 切換為圖片高度符合視口高度的預設模式</p>
<p>數字鍵 1 切換為單圖置中模式</p>
<p>數字鍵 2 切換為小尺寸圖片並排模式</p>
<p>數字鍵 3 切換為圖片高度符合視口高度且順序右至左的模式</p>
<p>數字鍵 4 切換為條漫模式</p>
<p>數字鍵 5 切換為水平橫向模式，當分類為comic、hcomic時方向預設為右至左。</p>
<p>W鍵、A鍵、上左方向鍵滾動到目前的上一張圖、S鍵、D鍵、下右方向鍵滾動到目前的下一張圖，當為comic分類且已是最後一張圖繼續按則關閉分頁</p>
<p>HOME鍵 滾動定位至第一張圖</p>
<p>END鍵 滾動定位至最後一張圖</p>
<p>R鍵 模式為0、2、3、5時用於臨時切換排列方向右至左、左至右。</p>
<p>B鍵 模式為0、2、3、5時用於切換圖片的左右邊框。</p>
<p>Delete鍵 從第一張開始隱藏圖片，看漫畫時手動調整讓後面的圖片能正常並成雙頁跨頁大圖。</p>
<p>Enter鍵 用於取消所有用Delete鍵隱藏的圖片。</p>
<p>畫廊為條漫模式時，上下方向鍵為預設行為，不會切換圖片。</p>
<p>畫廊為條漫模式時+、-鍵和修飾鍵Ctrl、Alt、ShiftKey + 滾輪 可增加減少圖片的寬度。</p>
<p>畫廊為水平模式時，左右方向鍵為預設行為，不會切換圖片。</p>
<p>畫廊為水平模式的滾輪切換圖片時ShiftKey + 滾輪則滾動水平滾動條。</p>
<p>PS：當瀏覽器封鎖彈出型視窗或uBlock Origin為了阻擋點擊連結觸發廣告把window.open修改成Proxy時，將無法使用分頁畫廊功能。</p>
<h3>5.影子畫廊模式</h3>
<p>快捷鍵基本同分頁畫廊模式</p>
<p>Esc鍵 離開畫廊</p>
<p>J、K鍵 畫廊滾動自定義滾動距離</p>
<p>N鍵 前往下一話或下一篇，如果有的話。</p>
<p>畫廊 (0、1、3) 滾輪操作設定為切換圖片並且有NEXT按鈕時，當滾動到最後一張圖繼續往下滾會標記NEXT按鈕，再繼續往下滾NEXT按鈕變灰前往NEXT。</p>
<p>畫廊滾輪操作非切換圖片並且有NEXT按鈕，當滾動到NEXT按鈕元素9成範圍進入視口時，再繼續往下滾2次以上NEXT按鈕變灰前往NEXT，往上滾則下滾次數歸零。</p>
<p>PS：Fancybox5功能由於與部分網站的依賴庫或代碼衝突，這部分將調用使用iframe構建的畫廊。</p>
<p>PS：如果要使用滾動視口的功能，螢幕顯示解析度1920 x 1080建議瀏覽器縮放比例100%，螢幕顯示解析度3840 x 2160建議系統縮放比例200%瀏覽器縮放比例100%，這樣在0、1、3才能剛好滾動一列圖片。</p>
<h1>腳本共存</h1>
<p>要與東方永頁機(Pagetual)共存，可添加以下的東方永頁機(Pagetual)自定義排除規則，並把圖片全載執行的順位移至東方永頁機之前。</p>
<pre>
   {
        "name": "排除圖片全載",
        "enable": 0,
        "url": "^http",
        "include": "#FullPictureLoadMainStyle"
   }
</pre>
<img src="https://i.imgur.com/fP8mUSu.jpeg">
<h1>腳本截圖</h1>
<p>陽春簡易的圖片篩選下載功能。</p>
<img src="https://i.imgur.com/aWpmS4L.jpeg">
<p>陽春簡易的圖片清單瀏覽模式，和閱讀順序由右至左的漫畫閱讀模式。實現鍵盤瀏覽漫畫，功能只求簡單實用。</p>
<br>
<img src="https://i.imgur.com/rTND2Xr.jpeg">
<img src="https://i.imgur.com/9Ml8a8v.jpeg">
<img src="https://i.imgur.com/ruHGKQl.jpeg">
<img src="https://i.imgur.com/QhWC6UI.jpeg">
<img src="https://i.imgur.com/u07PJLq.jpeg">
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
    <p>主要的背景顏色</p>
    <pre>main-background-color,#fafafa</pre>
    <p>每個收藏的文字顏色</p>
    <pre>text-color,#000</pre>
    <p>每個收藏的背景顏色</p>
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
美女图册,https://www.mntuce.com/
background-color,#BDE87C
AVJB,https://avjb.com/albums/
Xasiat,https://www.xasiat.com/albums/
HotAsiaGirl,https://hotgirl.asia/
エロ画像まとめ,https://geinou-nude.com/
background-color,#7C87E8
六色美图,https://www.06se.com/
XO福利圖,https://kb1.a7xofulitu.com/儿歌三百首/
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
<h2>規則支持列表備註</h2>
<p>如果有備註為SPA網頁，腳本如果沒有生效的話請重新載入頁面，或是先以新分頁的方式開啟連結。</p>
<h2>V2PH取得Cloudflare Clearance Cookie說明</h2>
<details>
    <summary>
        <kbd>
            <strong>「 點擊展開查看 」</strong>
        </kbd>
    </summary>
    <br>
    <p>取得Cookie步驟</p>
    <p>1.任意一張圖片在新分頁開啟圖片</p>
    <p>2.F12開啟開發者工具</p>
    <p>3.選擇開發者工具的網路分頁</p>
    <p>4.重新載入網頁</p>
    <p>5.選擇圖片</p>
    <p>6.查找右側標頭的請求標頭的Cookie</p>
    <img src="https://i.imgur.com/dLw9miV.jpeg">
    <p>7.選取並複製Cookie</p>
    <p>8.使用腳本管理器選單的Set V2PH Cookie彈出輸入框</p>
    <p>9.在輸入框貼上剛剛複製好的Cookie後確定</p>
    <img src="https://i.imgur.com/q1xTZLn.jpeg">
</details>
<h2>一般圖片分類內置規則支持列表</h2>
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
                    <a href="https://www.pexels.com/">免費圖庫相片</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://wallhaven.cc/latest">wallhaven</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.behance.net/">Behance</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>豆瓣相册</td>
                <td>作用在相簿頁，例如： <a href="https://www.douban.com/photos/album/1925659550/">大白桃子 写真集『桃白 vol.1』 </a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cureco.jp/">cureco beta</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://kai-you.net/type/report">KAI-YOU（カイユウ）</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://kpopping.com/kpics">kpopping</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.irancartoon.com/site/gallery">Irancartoon</a>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
</details>
<h2>老司機分類內置規則支持列表</h2>
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
                <td>telegra.ph</td>
                <td>從 <a href="https://tgstat.com/">TGStat</a>搜索cosplay、nsfw、Cosplay鉴赏 ，可以挖到不少你懂得。 </td>
            </tr>
            <tr>
                <td>
                    <a href="https://xchina.biz/">小黃書</a>
                </td>
                <td>
                    <a href="https://xchina.co/">xchina.co</a>， <a href="https://xchina.store/">xchina.store</a>， <a href="https://xchina.bond/">xchina.bond</a>， <a href="https://xchina.blog/">xchina.blog</a>， <a href="https://xiaohuangshu.me/">网址发布页</a>
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
                <td>免VIP僅適用PC版和圖片檔案命名是簡單數字遞增的。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mmxxdd.com/">梦想岛</a>
                </td>
                <td><a href="https://www.mmxxdd.com/website.html">永久网址发布</a>，免VIP僅適用圖片檔案命名是簡單數字遞增的，當無固定匹配時提供4種模式選擇使用，簡易生成圖片網址，默認格式.jpg，圖集若為多圖片格式，可利用篩選下載，會嘗試載入.jpg、.jpeg、.png三種格式，載入線程太大一直試錯可能會被圖片伺服器封IP一段時間。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://xzm2048.com/">写真门</a>
                </td>
                <td>免VIP僅適用圖片檔案命名是簡單數字遞增的。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xiuren.mobi/">秀人网</a>
                </td>
                <td>免VIP，圖集無法正確取得99張後的圖片網址，從100開始的檔案命名邏輯摸不清。 <a href="http://www.xiuren.online/">www.xiuren.online</a>， <a href="http://www.xiuren.cloud/">www.xiuren.cloud</a>， <a href="http://www.xiuren888.com/">www.xiuren888.com</a>， <a href="http://www.newxiuren.cc/">www.newxiuren.cc</a>
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
                    <a href="https://www.depvailon.com/">Depvailon.Com</a>
                </td>
                <td>
                    <a href="https://baobua.com/">BaoBua</a>， <a href="https://www.kaizty.com/">Kaizty Photos</a>， <a href="https://nungvl.net/">nungvl.net</a>， <a href="https://lootiu.com/">Lootiu.Com</a>， <a href="https://thismore.fun/">ThisMore.Fun</a>， <a href="https://cosxuxi.club/">CosXuxi Club</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hitxhot.org/">Hit-x-Hot</a>
                </td>
                <td>
                    <a href="https://www.dongojyousan.com/">dongojyousan.com</a>， <a href="https://redseats.org/">RedSeats.Org</a>， <a href="https://cn.looives.com/">Chinese in beauty</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xinggan5.top/">极品性感美女</a>
                </td>
                <td>
                    <a href="http://www.plmn5.com/">网址发布页1</a>， <a href="http://xgyw.org/">网址发布页2</a>，永久域名：尤物网.Com
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
                    <a href="http://25.xy09.my/">秀人集</a>
                </td>
                <td>永久域名Xiurenba.Com及(秀人集.com)， <a href="http://a.2xiu.vip/">导航页</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://m2.imn2.vip/">爱美女网</a>
                </td>
                <td>导航网址：a.20mm.vip 可从a到z 或 imn5.cc</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ik009.top/">爱看美女网</a>
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
                    <a href="https://meirentu.cc/">美人图</a>
                </td>
                <td>
                    <a href="https://meirentu.org/">meirentu.org</a>， <a href="https://meirentu.top/">meirentu.top</a>， <a href="https://meirentu.me/">meirentu.me</a>， <a href="https://meirentu.icu/">meirentu.icu</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.taotu8.cc/">秀套图吧</a>
                </td>
                <td>
                    <a href="https://www.913wen.com/">91性感美女</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.502x.com/xiurenwang.html">秀人图吧</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meimeicun.top/">美眉村</a>
                </td>
                <td>
                    <a href="https://193.123.238.234/">193.123.238.234</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://rosipic.com/rosi.html">ROSI写真</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.rosixz.cc/">ROSI美女写真</a>
                </td>
                <td>部分地區需要VPN才能連上， <a href="https://www.2meinv.cc/">www.2meinv.cc</a>， <a href="https://www.silk-necktie.com/">www.silk-necktie.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.rosimm.top/">ROSI小莉写真官网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.kaka234.cc/">卡卡美女网</a>
                </td>
                <td>
                    <a href="https://www.pic881.cc/">高清图片吧</a>， <a href="https://www.ku138.cc/">美女写真网</a>， <a href="https://www.tu99663.cc/">美女图片网</a>， <a href="https://www.jutu1232.cc/">聚图美女网</a>，China IP限定
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.24tupian.org/">爱死美女图片站</a>
                </td>
                <td><a href="https://m.24tupian.org/">m.24tupian.org</a>，需註冊登入才能看大圖和下載， <a href="https://www.aisimm.com/">鏡像站？</a>，與主站帳號通用，圖片伺服器不同。 </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.24cos.org/">爱死cos美女图片站</a>
                </td>
                <td>
                    <a href="http://www.lovecos.net/">www.lovecos.net</a>，不支持VIP資源。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://ja.huamaobizhi.com/mixs/?lang=zh-CN">花猫壁纸</a>
                </td>
                <td>
                    <a href="https://en.huamaobizhi.com/">en.huamaobizhi.com</a>，手動插入圖片，原圖沒有URL，需要POST直接取得原圖的Blob，非常吃記憶體，抓取過程需要等比較久，原圖是4K~8K的高質量圖片線上觀看會很卡，分類頁添加了自動翻頁。
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
                    <a href="https://kiutaku.com/">Kiutaku</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.v2ph.com/">微圖坊</a>
                </td>
                <td>
                    <a href="https://www.v2ph.net/">www.v2ph.net</a>， <a href="https://www.v2ph.ru/">www.v2ph.ru</a>， <a href="https://www.v2ph.ovh/">www.v2ph.ovh</a>，需註冊，大尺度非VIP只能抓到8~10張，下載需要填入Cookie，可參照V2PH取得Cookie說明，已填入Cookie卻下載錯誤代表Cookie過期，需要重新取得並再次填入新的Cookie。
                </td>
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
                <td>分類頁添加了自動翻頁</td>
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
                    <a href="https://www.okxx.de/">秀图湾</a>
                </td>
                <td>
                    <a href="https://xiusz.com/">xiusz.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://girlsteam.club/">女神部落</a>
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
                    <a href="https://liemeishe.com/">猎美社</a>
                </td>
                <td></td>
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
                    <a href="https://hanfu.in/">汉服网</a>
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
                    <a href="https://www.fulitu.cc/">福利兔</a>
                </td>
                <td></td>
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
                <td>4K~8K高解析</td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosermm.blog.2nt.com/">COSERMM</a>
                </td>
                <td>分類頁添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://tukuku.cc/">图库库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://taotu.uk/zh_cn/">私图网taotu.uk</a>
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
                    <a href="https://kantaotu.cc/">Xiuno BBS</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tuzac.com/">图宅网</a>
                </td>
                <td>
                    <a href="https://www.kkc3.com/">咔咔西三</a>， <a href="https://www.youfreex.com/">YouFreeX</a>
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
                    <a href="https://oorpg.com/">秀色女神OORPG</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mntuce.com/">美女图册</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.elysium.pro/albums/photobook">Elysium</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://heysexgirl.com/">嘿～色女孩</a>
                </td>
                <td>分類頁添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.costhisfox.com/cosfulimeitu">扮之狐狸</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://meinv.xwbar.com/">新闻吧</a>
                </td>
                <td>
                    <a href="https://meinv.xwwu.net/">新闻屋</a>， <a href="https://meinv.dv67.com/">新娱乐在线</a>， <a href="https://meinv.fjrx.org/">福建热线</a>， <a href="https://meinv.sdrx.org/">山东热线</a>， <a href="https://meinv.gxrx.org/">广西热线</a>， <a href="https://meinv.whrx.org/">武汉热线</a>， <a href="https://meinv.tjrx.org/">天津热线</a>， <a href="https://meinv.ynrx.org/">云南热线</a>， <a href="https://meinv.gsrx.org/">甘肃热线</a>，封鎖部分地區，需要VPN才看的到圖片
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://meinv.shzx.org/">四海资讯</a>
                </td>
                <td>
                    <a href="https://meinv.entbao.com/">娱乐宝</a>， <a href="https://meinv.yuleba.org/">娱乐吧</a>， <a href="https://meinv.entwu.com/">娱乐屋</a>， <a href="https://meinv.xwbzx.com/">新闻宝</a>，封鎖部分地區，需要VPN
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
                    <a href="https://2048.cc/2048/">我为人人</a>
                </td>
                <td>貼圖區， <a href="https://2048.info/">地址发布页</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.cool18.com/bbs2/index.php">留园酷</a>
                </td>
                <td>貼圖區，<a href="https://wap.cool18.com/index.php?app=index&act=bbs&bbsid=58">wap.cool18.com</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ixiu.one/">爱秀网</a>
                </td>
                <td></td>
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
                    <a href="https://www.xiuwo.net/">秀窝</a>
                </td>
                <td>
                    <a href="https://www.rmm8.com/">RMM吧</a>， <a href="https://www.zanmm.com/">赞MM</a>， <a href="https://www.entuji.com/">恩图集</a>， <a href="https://www.mhgirl.com/">美Girl图集</a>， <a href="https://www.hutu6.com/">狐图网</a>， <a href="https://www.930tu.com/">930圖片網</a>， <a href="https://www.smkwan.com/">四魔写真</a>， <a href="https://www.jnmmw.com/">JN美眉网</a>， <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/tu01.txt">其他同格式網站85個</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.kongquehai.top/">孔雀海</a>
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
                    <a href="https://rulel.com/">乳乐资源网</a>
                </td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://8ezy.com/uncategorized/">8E资源站</a>
                </td>
                <td>
                    <a href="https://8ezy.com/tag/%e7%be%8e%e5%9b%be/">美图</a>， <a href="https://8ezy.com/tag/%E8%8A%B1%E7%B5%AE/">花絮</a>，歸檔頁添加了自動翻頁
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://yeshezy.com/index.php/vod/type/id/3.html">夜社资源</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xiurenst.com/xiuren">秀人图</a>
                </td>
                <td>只支持免費， <a href="https://www.xiurenst.com/xiuren">地址发布页</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.2mn.cc/">爱死美女网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tu928.com/">tu928美女写真网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://girl18.net/">Girl 18+</a>
                </td>
                <td>
                    <a href="https://jvid.girl18.net/">JVID</a>， <a href="https://xiuren.girl18.net/">XIUREN</a>， <a href="https://bobosocks.girl18.net/">BOBOSOCKS</a>， <a href="https://imiss.girl18.net/">IMISS</a>， <a href="https://cosplay.girl18.net/">COSPLAY</a>， <a href="http://bikiniz.net/">Bikini Girl</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://foamgirl.net/">FoamGirl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mei101.com/xingganmeimei/">Mei101</a>
                </td>
                <td>
                    <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/mei101.txt">同格式網站22個</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://meitu9.com/">九天美图</a>
                </td>
                <td>
                    <a href="https://jiutianmeitu.com/">jiutianmeitu.com</a>， <a href="https://2kl.net/">爱看美图</a>
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
                    <a href="https://www.luoli.xin/">14MM图片网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meituba.cc/">美图吧</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.eemm.cc/">依依美女图片网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://coserlab.io/">Coser Lab</a>
                </td>
                <td>4K~8K高解析</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ecy8.com/">Mega Gallery</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.aituitu.com/">爱推图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.m2ph.xyz/">美图坊</a>
                </td>
                <td>Mobile限定，需註冊登錄，並至少點開過一部寫真後，刷新頁面才能正常使用。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.loxiu.com/">洛秀网</a>
                </td>
                <td>
                    <a href="https://www.xiunvw.com/">维秘秀</a>
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
                    <a href="https://www.yunvkong.com/meinv/">御女控</a>
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
                    <a href="https://eyecoser.com/">看美女</a>
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
                    <a href="https://www.jtttututu.top/">酱图图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://film-loud-wind.xofulitu-100.com/xoxo">XO福利圖</a>
                </td>
                <td>
                    <a href="https://kb1.a7xofulitu.com/%E5%84%BF%E6%AD%8C%E4%B8%89%E7%99%BE%E9%A6%96/">網站跳轉</a>，分類頁添加了自動翻頁
                </td>
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
                    <a href="https://www.meituhai.com/">美图海</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meinvtui.com/">美推网</a>
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
                    <a href="https://www.aitaotu.cc/">爱套图</a>
                </td>
                <td>
                    <a href="https://www.2taotu.cc/">www.2taotu.cc</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hexieshe.com/">和邪社</a>
                </td>
                <td></td>
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
                    <a href="http://taotuhome.com/">套图之家</a>
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
                    <a href="https://www.meinvku.org.cn/">美女库</a>
                </td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.656g.com/">656G精品套图</a>
                </td>
                <td>
                    <a href="http://www.mmww.cc/">秀人妹子图</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mm5mm5.com/">MM5MM5美女图片</a>
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
                    <a href="https://cosblay.com/">CosBlay</a>， <a href="https://www.hongimg.com/">虹圖</a>，網站網頁語言不同，圖集列表也不同。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://xx.knit.bid/sort/new/">爱妹子</a>
                </td>
                <td>
                    <a href="https://mm.187187.xyz/sort/new/">mm.187187.xyz</a>， <a href="https://999888.best/sort/new/">999888.best</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://928r.com/">美图社</a>
                </td>
                <td>
                    <a href="https://060k.com/">花瓣美女</a>， <a href="https://www.dmjie.com/show/">大美姐</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.meitu8.cc/">美女写真馆</a>
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
                    <a href="https://dimtown.com/p/cosplay">次元小镇</a>
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
                    <a href="https://a2cy.com/">推次元</a>
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
                    <a href="https://fliporn.biz/sexual-picture">Fliporn</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.91hdbp.cc/category/%E6%88%90%E4%BA%BA%E8%89%B2%E5%9B%BE/">91HD视频</a>
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
                    <a href="https://tt.xqtt.de/">性趣套图</a>
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
                    <a href="https://www.99re.com/albums/">久久热</a>
                </td>
                <td>
                    <a href="https://cav103.com/albums/">GavPorn</a>
                </td>
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
                    <a href="https://www.twoimg.com/people">TWOIMG</a>
                </td>
                <td></td>
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
                <td>分類頁添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://misskon.com/">MissKON.com</a>
                </td>
                <td>完整無修正的圖片需要下載，聚集的只是預覽圖</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hotgirl.asia/photos/">HotAsiaGirl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hotgirl2024.com/">HotGirl World</a>
                </td>
                <td>分類頁添加了自動翻頁</td>
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
                    <a href="https://xiunice.com/">Xiunice.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://photos.xtapo.org/">Photos XTAPO</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yanxiangrong.github.io/chunmomo/">蠢沫沫 Github</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://chunmomo.net/">蠢沫沫 chunmomo.net</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tokar.fantasyfactory.xyz/">Tokar浵卡 Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.fantasyfactory.xyz/">小丁 (Fantasy Factory) Patreon Cosplay Leaks</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplay-nextjs.vercel.app/">二刺猿地帶</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.1ymt.com/discover?t=fresh">咿呀美图</a>
                </td>
                <td>SPA網頁</td>
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
                    <a href="https://www.sexyasiangirl.xyz/">SexyAsianGirl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ahottie.net/">AHottie</a>
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
                    <a href="https://meizi.pics/">高清妹子图</a>
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
                    <a href="https://setushe.pics/">涩图社</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://meiru.neocities.org/">美乳小姐姐写真</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yase.im/">亚色图库</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fuligirl.top/">福利姬美图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://xiuren.win/">秀人图</a>
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
                    <a href="https://www.jtttututu.top/">酱图图</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sanshang.neocities.org/">三上悠亚写真图片</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://dongti.netlify.app/">胴体的秘密</a>
                </td>
                <td>
                    <a href="https://asiansexybody.netlify.app/">AsianSexyBody</a>， <a href="https://bestgirlsexy2.neocities.org/">BestGirlSexy2</a>， <a href="https://bestgirlsexy3.neocities.org/">BestGirlSexy3</a>， <a href="https://bestgirlsexy4.neocities.org/">BestGirlSexy4</a>， <a href="https://fulituku.neocities.org/">福利图库</a>， <a href="https://coser1.neocities.org/">COSER美女图</a>
                </td>
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
                    <a href="https://www.nncos.com/">奈奈COS</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.cosfan.cc/">COSFAN</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://galleryepic.one/zh">Gallery Epic</a>
                </td>
                <td>高解析原圖需要下載，聚集的只是預覽圖，分類頁添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplayersgonewild.net/">Cosplayers GoneWild</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://shiki17chen.imgbb.com/albums">ImgBB</a>
                </td>
                <td><a href="https://afc123.imgbb.com/albums">afc123</a>，<a href="https://2920215920.imgbb.com/albums">2920215920</a>，<a href="https://ozpin.imgbb.com/albums">Ozpin</a>，作用在上傳者的相簿，手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://jpg5.su/tatsuya_shiba/albums">JPG5</a>
                </td>
                <td>
                    <a href="https://jpg5.su/hru_moon/albums">hru_moon</a>，作用在上傳者的相簿，手動插入圖片
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://img.kiwi/36_chambers/albums">IMG.Kiwi</a>
                </td>
                <td>作用在上傳者的相簿，手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.putmega.com/explore/recent/?list=albums&sort=date_desc&page=1">PutMega</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://sexy.pixibb.com/">PixiBB</a>
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
                    <a href="https://sxchinesegirlz02.online/">Chinese Beauties</a>
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
                    <a href="https://asiantolick.com/page/news">Asian To Lick</a>
                </td>
                <td>自動修正404</td>
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
                    <a href="https://picazor.com/en">Picazor</a>
                </td>
                <td>SPA網頁，手動</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapeza.com/">Fapeza</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapello.com/">Fapello</a>
                </td>
                <td>
                    <a href="https://fapello.com/sally-dorasnow/">Sally Dorasnow</a>，手動插入圖片，<a href="https://fapello.pics/">fapello.pics</a>，<a href="https://xapello.com/">xapello.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapello.su/">Fapello.su</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapullo.com/">Fapullo</a>
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
                    <a href="https://fapellas.com/">Fapellas</a>
                </td>
                <td>手動插入圖片， <a href="https://faponic.com/">Faponic</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapodrop.com/">Fapodrop</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapsan.com/">Fapsan</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://leaks4fap.com/">Leaks4fap</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapello.ru/">fapello.ru</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://onlytreon.com/">Onlytreon</a>
                </td>
                <td>手動插入圖片，<a href="https://fapmenu.com/">FapMenu</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://wildskirts.su/">WildSkirts</a>
                </td>
                <td>手動</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapello.cc/albums/hot">fapello.cc</a>
                </td>
                <td>手動</td>
            </tr>
            <tr>
                <td>
                    <a href="https://thefappeningblog.com/">TheFappening</a>
                </td>
                <td>
                    <a href="https://thefappening.plus/">The Fappening Plus</a>， <a href="https://fap.thefappening.one/">#TheFappening</a>， <a href="https://fap.thefappeningnew.com/">The Fappening</a>， <a href="https://thefappening2015.com/">The Fappening 2015</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://30galleries.com/">30Galleries</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://desipornphoto.com/main/">Desi Porn Photo</a>
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
                    <a href="https://shemaleleaks.com/">Shemale Leaks</a>
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
                    <a href="https://fappeningbook.com/">Fappening Book</a>
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
                    <a href="https://luv.vn/">LUV.VN</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://imgcup.com/">imgcup.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hotgirlpix.com/">Hot Girl Pix</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://akaihentai.com/tag/cosplay/">Akai Hentai</a>
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
                    <a href="https://nudostar.com/">NudoStar</a>
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
                    <a href="https://cyberdrop.me/">CyberDrop</a>
                </td>
                <td>手動插入圖片，需要知道檔案連結，例如： <a href="https://cyberdrop.me/a/QdGaziWb">https://cyberdrop.me/a/QdGaziWb</a>，<a href="https://cyberdrop.me/a/BSIZxyQk">https://cyberdrop.me/a/BSIZxyQk</a>，搜索引擎： <a href="https://www.flaru.com/en/cyberdrop.me/">https://www.flaru.com/en/cyberdrop.me/</a>，下載會出錯時請調低線程數 </td>
            </tr>
            <tr>
                <td>
                    <a href="https://vk.com/">VK</a>
                </td>
                <td>作用在相簿頁，例如： <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/vk_album.txt">VK Album</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapdungeon.com/">Fapdungeon</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://thotsbook.com/photos">Thotsbook</a>
                </td>
                <td><a href="https://ibradome.com/onlyfans-photos">Ibradome</a>，<a href="https://www.fappenist.com/photos">Fappenist</a>，<a href="https://lmlib.com/photos">Lmlib</a>，<a href="https://teenswall.com/photos">Teenswall</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapopedia.net/updates/">Fapopedia</a>
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
                    <a href="https://thothd.com/albums/">ThotHD Albums</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://thothub.vip/albums/">Thothub Albums</a>
                </td>
                <td>
                    <a href="https://thothub.to/albums/">thothub.to</a>， <a href="https://thothub.ch/albums/">thothub.ch</a>， <a href="https://thothub.su/albums/">thothub.su</a>， <a href="https://thothub.lol/albums/">thothub.lol</a>， <a href="https://thothub.mx/albums/">thothub.mx</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://redthot.com/photos/">Thothub.wtf</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://epawg.com/albums/">Epawg</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.porntrex.com/albums/">PornTrex</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bitchesfost.com/">BitchesFost</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.whoreshub.com/albums/">WhoresHub</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://pornotaran.com/">Pornotaran.com photo</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.babepedia.com/">Babepedia</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hotcelebshome.com/">Hot Celebs Home</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nudebird.biz/">Nude Bird</a>
                </td>
                <td>
                    <a href="https://nudecosplay.biz/">Nude Cosplay</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplaytele.com/">Cosplaytele</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplay18.pics/">Cosplay18</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://rule34cosplay.com/">Rule34Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://oo4k.com/album/category/photo/">4K Beautyful Cosplay Girl</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hotpic.cc/nsfw/">HOTPIC</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://vipinay.com/">ViPinay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://russiasexygirls.com/">RussiaSexyGirls</a>
                </td>
                <td>
                    <a href="https://eurosexygirls.com/">EuroSexyGirls</a>， <a href="https://usasexygirls.com/">UsaSexyGirls</a>， <a href="https://asiansexiestgirls.com/">AsianSexyGirls</a>， <a href="https://latinsexygirls.com/">LatinSexyGirls</a>， <a href="https://ebonysexygirls.com/">EbonySexyGirls</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.jimmysonline.com/">JimmysOnline.com</a>
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
                    <a href="https://gamehappylife.top/">Game-happy-life</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jjcos.com/">JJCOS</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xikxak.com/">XikXak</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplayporn.online/category/cosplay/">Cosplay Porn</a>
                </td>
                <td></td>
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
                    <a href="https://hinhsexviet.com/">Hình Sex Việt</a>，<a href="https://hinhkhieudam.com/">Hình Khiêu Dâm</a>，<a href="https://gaidepvietnam.com/">Gái Đẹp Việt Nam</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://ososedki.com/">OSOSEDKI</a>
                </td>
                <td>
                    <a href="https://cosplayasian.com/">COSPLAYASIAN</a>， <a href="https://cosplaythots.com/">COSPLAYTHOTS</a>， <a href="https://cosplayrule34.com/">COSPLAYRULE34</a>， <a href="https://waifubitches.com/">WAIFUBITCHES</a>， <a href="https://cosplayboobs.com/">COSPLAY BOOBS</a>， <a href="https://cosplayleaks.com/">COSPLAYLEAKS</a>， <a href="https://vipthots.com/">VIPTHOTS</a>， <a href="https://hentaibitches.com/">HENTAI BITCHES</a>， <a href="https://leaksfan.com/">LEAKSFANS</a>， <a href="https://charmingass.com/">CHARMINGASS</a>， <a href="https://leakspie.com/">LEAKS PIE</a>， <a href="https://cherryleaks.com/">CHERRY LEAKS</a>， <a href="https://sweetleaks.com/">SWEETLEAKS</a>， <a href="https://ocosplay.com/">OCOSPLAY</a>， <a href="https://webcharming.com/">WEB CHARMING</a>， <a href="https://cosplaykittys.com/">COSPLAY KITTYS</a>， <a href="https://titspie.com/">TITSPIE</a>， <a href="https://cosplaysosedki.com/">COSPLAY SOSEDKI</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplayd.com/">COSPLAYD</a>
                </td>
                <td><a href="https://cosplayg.com/">COSPLAYG</a>，<a href="https://cosplayj.com/">COSPLAYJ</a>，<a href="https://cosplayk.com/">COSPLAYK</a>，<a href="https://cosplayp.com/">COSPLAYP</a></td>
            </tr>
            <tr>
                <td><a href="https://www.pixnoy.com/">Pixnoy</a></td>
                <td><a href="https://www.pixnoy.com/profile/shimotsuki18/">SHIMO霜月</a>，<a href="https://www.pixnoy.com/profile/iamdorasnow/">Sally Teh S.L 多啦雪</a>，<a href="https://www.pixnoy.com/profile/puypuychan/">PuyPuy Cosplayer</a>，<a href="https://www.pixnoy.com/profile/zerhoe_two/">missy ♡</a>，無法線上看大圖，只能匯出網址用Motrix下載或直接打包下載。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://imginn.com/iamdorasnow/">Imginn</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>tumbex</td>
                <td>
                    <a href="https://www.tumbex.com/kyokosdog.tumblr/posts">@kyokosdog</a>， <a href="https://www.tumbex.com/holydasewhale.tumblr/posts">@holydasewhale</a>
                </td>
            </tr>
            <tr>
                <td>TW Pornstars</td>
                <td>
                    <a href="https://www.twpornstars.com/iamdorasnow">Sally多啦雪</a>， <a href="https://www.twpornstars.com/axunkaOri">阿薰kaOri</a>， <a href="https://www.twpornstars.com/Hokunaimeko">Hokunaimeko</a>
                </td>
            </tr>
            <tr>
                <td>痞客邦相簿</td>
                <td><a href="https://nagoat.pixnet.net/album/list">NAGoat</a></td>
            </tr>
            <tr>
                <td>痞客邦部落格</td>
                <td><a href="https://nagoat.pixnet.net/blog">NAGoat</a>，<a href="https://felix0621.pixnet.net/blog">喵魔的亂想魔境</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://3600000.xyz/">3600000 Beauty</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://2bcosplay.blogspot.com/">NYO Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://navicosplay.blogspot.com/">Navi Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://aitoda.blogspot.com/">Nao Kanzaki and a few friends</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://photobeach.blogspot.com/">Photo Beach</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jangjooart.blogspot.com/">JANGJOO</a>
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
                    <a href="https://amazon-love.com/">Love Asian Babes</a>
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
                    <a href="https://gravurezasshi9.doorblog.jp/">グラビア週刊誌 9</a>
                </td>
                <td>
                    <a href="https://magazinejapanese5.blog.jp/">グラビア週刊誌 5</a>， <a href="https://magazinejapanese6.blog.jp/">グラビア週刊誌 6</a>，分類頁添加了自動翻頁
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://nisokudemosandal.blog.jp/">エロマニア　猿！</a>
                </td>
                <td><a href="https://ippondemoninjin.livedoor.blog/">グラドルマニア　猿！</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gravureidols.top/">Gravure Idols</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sekushipic.blogspot.com/">sekushipic</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://janidol.blogspot.com/">Idolru Channel</a>
                </td>
                <td></td>
            </tr>
           <tr>
                <td>
                    <a href="https://cosplay-club3.blogspot.com/">Cosplay Club</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://idolarea.blogspot.com/">IDOL AREA</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://oppaimag.blogspot.com/">OppaiMag</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://maiasihd.blogspot.com/">adnvadnvvda</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://25jingliwangsheng.blogspot.com/">25精力旺盛</a>
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
                    <a href="https://ero-gazou.jp/">抜けるっ！二次元エロ画像＆イラストまとめ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mizugigurabia.com/">水着グラビア</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ero-sakaba.com/">エロ酒場</a>
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
                    <a href="https://uraaka-ranking.com/">裏垢女子ランキングナビ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bakufu.jp/">お宝エログ幕府</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://lovekoala.com/">エロ画像-ラブコアラ-</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://puni-puni.com/">お宝エロ画像ぷにぷに</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://horeta.net/">惚れた.net</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://megamich.com/">エロ画像女神ちゃんねる</a>
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
                    <a href="http://gazounabi.com/">画像ナビ!</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://pashalism.com/">エロ画像ぱしゃりずむ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosppi.net/">コスッピ！</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bi-girl.net/">肉感美ガール</a>
                </td>
                <td>
                    <a href="https://bi-girl.net/iamdorasnow">Sally多啦雪</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://geinoujin-gazou.mixh.jp/">芸能人のエロ画像</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://intervalues.com/idol.html">アイドルセクシー画像集＆裏</a>
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
                    <a href="http://idol-gazoum.net/">アイドル村</a>
                </td>
                <td>
                    <a href="http://zilli-on.ru/">zilli-on.ru</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://blog.livedoor.jp/idol_gravure_sexy/">アイドル画像魂</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gravuregalaxy.hatenablog.com/">グラビア大銀河</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mizugazo.com/">水着画像まとめ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jk-street-snap.com/">JK 街撮り</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://hnalady.com/">エロ画像まとめ えっちなお姉さん</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://kimootoko.net/">キモ男陵辱同人道</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://moeimg.net/">二次萌エロ画像ブログ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://eromitai.com/">エロ画像が見たいんだ！</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.eroero-gazou.net/">女体エロエロ画像集～</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bikyonyu-bijo-zukan.com/">美巨乳美女図鑑＠素人画像サイト</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://1000giribest.com/">性癖エロ画像</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nikkanerog.com/">日刊エログ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yaruo.info/">素人エロ画像やったる夫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.pandagazo.net/">パンダ28号の有名人DAI好キング！</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mabui-onna.com/">マブい女画像集</a>
                </td>
                <td>
                    <a href="https://cyoinatu-onna.com/">ちょい懐女画像集</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://blog.livedoor.jp/pururungazou/">ぷるるんお宝画像庫</a>
                </td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://reprint-kh.com/">復刻書林</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>Ameba (アメーバ)</td>
                <td><a href="https://ameblo.jp/shashinsouko/">写真倉庫</a>，<a href="https://ameblo.jp/himemiyaian/">いあんの女神たち</a></td>
            </tr>
            <tr>
                <td>
                    <a href="http://rikitake.com/">Rikitake.com</a>
                </td>
                <td></td>
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
                    <a href="https://danryoku.com/">Danryoku</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://minisuka.top/">MINISUKA</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://breakbrunch.com/t/cosplay-by-mon/">BreakBrunch</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://quenbox.top/?cat=1">quenbox.top</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.girl-atlas.com/">Girl Atlas</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://niwatori.my.id/category/uncategorized/">niwatori.my.id</a>
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
                    <a href="https://anhsex.asia/">Ảnh Sex</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://girlxinh18.com/">Hot Girl Xinh 18+</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tinhayvip.com/">Tin Hay VIP</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gaixinh.photo/">Hình ảnh gái xinh</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://anhgaixinh.tv/anh-sexy/">ẢNH GÁI XINH</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://quatvnclub.com/">Quatvn Club</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://genzrelax.com/category/hinh-anh/">GenZ Relax</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tuyetnhan.com/">✫ Ảnh đẹp ✫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://diendandatdai.com/hinh-anh/">Du lịch Mường Lò</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://maulon.net/">Maulon</a>
                </td>
                <td>
                    <a href="https://1sex.maulon.vip/">1sex.maulon.vip</a>
                </td>
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
                    <a href="https://cangcuc.com/">Căng Cực</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosplayvn.club/">Cosplay VN</a>
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
                <td>
                    <a href="https://safebooru.blogspot.com/">Safebooru</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://curvyasian.blogspot.com/">Curvy Asian</a>
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
                <td>
                    <a href="https://www.assesphoto.com/">Asses Photo</a>， <a href="https://www.nudedxxx.com/">Nuded Photo</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://chinesenudeart.blogspot.com/">Chinese Nude Art Photos</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://dicadeanimesbr.blogspot.com/search/label/Cosplay">Dicas de Animes</a>
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
                    <a href="https://cosplayjp.wordpress.com/">COSPLAYJP</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://kemono.su/">Kemono</a>
                </td>
                <td>SPA網頁，停留在Post頁面只取得單一Post資料，停留在作者文章列表可爬取50個Post，使用浮動選單自訂函式(6)可爬取所有Post，短時間請求過多可能會導致503錯誤，需等待一段時間才會恢復正常，在頁面聚圖會導致原網頁無法正常使用所以沒有在頁面插入圖片的功能，需使用F、G、I、8看圖。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://coomer.su/">Coomer</a>
                </td>
                <td>SPA網頁，同上</td>
            </tr>
            </tr>
            <tr>
                <td>
                    <a href="https://nekohouse.su/">Nekohouse</a>
                </td>
                <td>同上</td>
            </tr>
            <tr>
                <td>
                    <a href="https://porn-image.com/">Asian Porn Image</a>
                </td>
                <td>
                    <a href="https://hentai-cosplay-xxx.com/">Hentai Cosplay</a>， <a href="https://hentai-img-xxx.com/">Hentai Image</a>
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
                    <a href="https://www.es606.com/pics/">EPORNER鏡像(es606)</a>
                </td>
                <td><a href="https://www.epavx.com/pics/">www.epavx.com</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://kissjav.com/albums/">KISSJAV</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.x1hub.com/albums/">X1HUB</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xasiat.com/albums/">Xasiat</a>
                </td>
                <td>圖集分類頁添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://erotic.pics/">Erotic Pics</a>
                </td>
                <td>分類頁添加了自動翻頁</td>
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
                <td>
                    <a href="https://www.imagefap.com/profile/SOMSIRISUK">SOMSIRISUK</a>， <a href="https://beta.imagefap.com/">beta.imagefap.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://zzup.com/user-album/3338/petmer/index.html">ZzUp.Com</a>
                </td>
                <td>
                    <a href="https://zzup.com/user-album/2269/youmii/index.html">youmii</a>，分類頁添加了自動翻頁
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
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://en.girlstop.info/">GirlsTop</a>
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
                <td><a href="https://fapsly.live/">fapsly.live</a>，<a href="https://fapsly.net/">fapsly.net</a>，只支持PC版，影片可匯出網址後用Motrix下載</td>
            </tr>
            <tr>
                <td>
                    <a href="https://x-video.tube/albums/">X-video albums</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://erothots.co/albums">EroThots</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fapello-leaks.com/fr/albums/hot">Fapello Leaks</a>
                </td>
                <td><a href="https://thothub-leaked.com/albums/hot">Thothub Leaked</a>，<a href="https://getofleaks.co/albums/hot">Onlyfans Leaks</a>，<a href="https://only2leaked.co/albums/hot">Only2leaked</a>，<a href="https://simpcity.tv/albums/hot">SimpCity TV</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://adultphotosets.best/">Adult photo sets</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ciberhentai.com/cosplay">Ciberhentai</a>
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
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://sxypix.com/">SXYPIX</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://boombo.biz/">Boombo!</a>
                </td>
                <td><a href="https://hot.boombo.biz/">hot.boombo.biz</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.gayporntube.com/photos/">GayBoysTube</a>
                </td>
                <td></td>
            </tr>
           <tr>
                <td>
                    <a href="https://www.boyfriendtv.com/pics/">BoyFriendTv.com</a>
                </td>
                <td>PC限定</td>
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
                    <a href="https://clannadhouse.com/">CLANNAD</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://szexkepek.net/">Szexképek</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bugilonly.com/">BugilOnly</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://terekspos.com/">Terekspos</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.socaseiras.com.br/">SoCaseiras</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ligadasnovinhas.com/category/fotos/">LigaDasNovinhas</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.minhamulher.com/">MinhaMulher</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.fotosporno.blog/">Fotos Porno</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://geekfan.site/category/cosplay/">geekfan.site</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gameye.ru/category/cosplay/">GamEYE</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cq.ru/cosplay">CQ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://vgtimes.ru/cosplay/">VGTimes</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gamemag.ru/news/153359/nier-automata-2b-cosplayby-lada-lyumos">GameMAG</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://gamefans.ru/cosplay/">GameFans</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nd27.ru/">Фото идеи и картинки</a>
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
                    <a href="https://nevsepic.com.ua/">Nevsepic</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ero-top.name/">Ero-Top</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://dtf.ru/u/660597-salvatore-ganacci">DTF</a>
                </td>
                <td>
                    <a href="https://dtf.ru/u/36100-tursall">Tursall</a>，<a href="https://dtf.ru/u/589631-the-idol-girls">The IDOL Girls</a>，SPA網頁，點開作者的PO文，作用在PO文首樓的圖集，手動插入圖片。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://girls.ucrazy.org/">uCrazy</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bdsmlr.com/">bdsmlr</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://dzen.ru/w_t_s_c">Дзен</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://nude-art-erotic.livejournal.com/">NUDE_ART_EROTIC</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tettie.net/">Развлекательно-эротический блог</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://vipergirls.to/forums/302-Softcore-Photo-Sets">ViperGirls</a>
                </td>
                <td>只適用PC版，論壇樓層皆可能是一個使用免空圖床的圖集，操作方式，1.選取文字後按或直接按Ctrl + Alt + T設定圖集名稱，2.滑鼠點擊每樓左側作者下方空白的部份捕獲圖床連結，接下來就能使用0、1、3、7、8的功能，一些圖床比較難搞下載容易出錯，可匯出圖片地址再用Aria2或Motrix來下載，如有漏掉的圖床請反饋</td>
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
                <td>輔助點擊，能在gallery頁進行下載。<a href="https://www.sexychan.org/c/">https://www.sexychan.org/c/</a>這邊有一些Cosplay Full Gallery，點Reply可以展開更多</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hotleaks.tv/">Hotleaks</a>
                </td>
                <td>
                    <a href="https://thotsbay.tv/">Thotsbay</a>， <a href="https://hotleak.vip/">Hotleak</a>， <a href="https://leakedzone.com/">Leakedzone</a>， <a href="https://bestthots.com/">BestThots</a>， <a href="https://thotporn.tv/">Thotporn</a>，手動插入圖片
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://wikifeetx.com/photos">wikiFeetX</a>
                </td>
                <td>
                    <a href="https://wikifeet.com/photos">wikiFeet</a>
                </td>
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
                    <a href="https://jimpicotphotography.com/">jimpicotphotography.com</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.erome.com/explore">EroMe</a>
                </td>
                <td>
                    <a href="https://erome.fan/explore/">EroMe erome.pics</a>
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
                    <a href="https://javcup.com/">JavCup</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jjgirls.com/">JJGirls</a>
                </td>
                <td>PC限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.elitebabes.com/">Elite Babes</a>
                </td>
                <td>同格式， <a href="https://pmatehunter.com/">Playmate Hunter</a>， <a href="https://www.jperotica.com/">JP Erotica</a>， <a href="https://www.metarthunter.com/">Metart Hunter</a>， <a href="https://www.femjoyhunter.com/">Femjoy Hunter</a>， <a href="https://nakedporn.pics/">nakedporn.pics</a>
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
                    <a href="https://pornpicxxx.com/">pornpicxxx.com</a>
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
                    <a href="https://www.pornpics.com/jp/">Porn Pics</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hotnakedwomen.com/">NakedPics</a>
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
                    <a href="https://hdpornpictures.net/">HD Porn Pictures</a>
                </td>
                <td>
                    <a href="https://photos.befuck.net/">BeFuck.Net</a>，<a href="https://photos.beeg.porn/">Beeg.Porn</a>，<a href="https://photos.niceporn.tv/">NicePorn</a>，<a href="https://photos.mofosex.net/">MofoSex</a>，<a href="https://photos.redwap.tv/">Redwap</a>，<a href="https://bravotube.tv/pornpics/">BravoTube</a>
                </td>
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
                    <a href="https://hoastie.com/">Hoastie</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://getababy.net/">getababy.net</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://pibys.com/">Pibys</a>
                </td>
                <td>
                    <a href="https://pibys.win/">pibys.win</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.1y.is/">1Y Beauties</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://thegg.net/category/cosplay/">TGG</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>AList</td>
                <td>
                    <a href="https://cylsp.org/">次元LSP</a>， <a href="https://pan.catcat.blog/">猫猫网盘</a>， <a href="https://qinzhi.top/">云边网盘</a>， <a href="https://alist.xiaoyiblog.fun/">小易の云盘</a>， <a href="https://yun.pqdh.com/">ooo.pqdh.com</a>， <a href="https://alist.qiuyeshudian.com/">J M G T</a>，圖片列表跑出來後記得按一下名稱排序，原圖一張幾十MB的建議複製圖址後用Motrix下載，沒有圖片但有影片或壓縮檔建議匯出網址後用Motrix下載。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.qiuyeshudian.com/">J M G T</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.uecoy.com/">聚美星空</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ozv.me/">美女私房菜</a>
                </td>
                <td></td>
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
                    <a href="https://www.sushixz.net/">素拾网</a>
                </td>
                <td>
                    <a href="https://sushixz.net/">sushixz.net</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://52xiuren.cc/">52XiuRen</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.xiurenpic.com/last.html">秀人网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hualin.san.tc/">HuaLin</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://missbby.com/">MissBby.com</a>
                </td>
                <td>SPA網頁，分類頁添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://xerocos.com/">Xerocos</a>
                </td>
                <td>SPA網頁，分類頁添加了自動翻頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.uyn8.cn/">牛牛美图</a>
                </td>
                <td>很久沒新圖了</td>
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
                    <a href="https://www.taotucd.com/">Taotuxp.com</a>
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
                    <a href="http://www.yyzhenshun.com/">YY美女图片</a>
                </td>
                <td>
                    <a href="http://www.handands.com/">美眉大宝贝</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.6evu.com/">遛无写真</a>
                </td>
                <td>
                    <a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/6evu.txt">同格式34個</a>
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
                    <a href="https://www.tu11.com/">亿秀美女</a>
                </td>
                <td>
                    <a href="https://m.itu11.com/">m.itu11.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.qixianzi.com/">七仙子图片</a>
                </td>
                <td>
                    <a href="https://www.qixianzi.com/e/wap/">www.qixianzi.com/e/wap/</a>，很久沒新圖了
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wai77.com/">心动美图</a>
                </td>
                <td>很久沒新圖了</td>
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
                <td>很久沒新圖了，<a href="http://xiuren.download/">xiuren.download</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ons.ooo/">ONS漂亮MM图库</a>
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
                    <a href="https://xlust.org/">XLUST.ORG</a>
                </td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="https://langnv.neocities.org/">浪女吧</a>
                </td>
                <td><a href="https://ang4u.neocities.org/">Ang4u</a>，很久沒新圖了</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.juemei.com/mm/l.html">绝美网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.win4000.com/meitu.html">美桌</a>
                </td>
                <td>感覺沒在更新圖了</td>
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
                <td>分類頁添加了自動翻頁</td>
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
                    <a href="https://hao312.top/">好312图库</a>， <a href="https://dsqs8.com/">導航1</a>， <a href="https://renti100.com/">導航2</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://yinaw.com/">壹纳网</a>
                </td>
                <td>設定 > 其他 > 壹纳网使用原始新浪图床链结，需使用Header Editor擴展修改標頭， <a href="https://sspai.com/post/77650">奔跑中的奶酪的修改說明</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.sexphotos.cc/">18成人貼圖</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://prettysix.com/">正妹六区</a>
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
                    <a href="https://www.porn5f.com/">五樓自拍</a>
                </td>
                <td></td>
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
                    <a href="https://www.xiu07.com/images">超级资源分享</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ios.pipigou833.top/">哔咔庇护所v2</a>
                </td>
                <td>
                    <a href="https://soapi.study2026.com/">导航1</a>， <a href="https://pipigou833.top/">导航2</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.papatutu.com/">啪啪凸凸</a>
                </td>
                <td>
                    <a href="http://pdcbot.com/">导航页</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://lingleis.info/bdsvy/10.html">美鲍儿</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ilk01.com/index.php/art/type/id/5.html">奶PARTTY</a>
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
                    <a href="https://xxav.one/tuwen/">XXAV</a>
                </td>
                <td>
                    <a href="https://www.xxav2235.com/">最新地址</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://xx3355.com/image">大香蕉</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fulitu.khm001.xyz/">福利图</a>
                </td>
                <td><a href="https://meitu.khm005.xyz/">美人图</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://sex5.khm002.xyz/Index/tupianlist.html?cateid=522">性屋娱乐</a>
                </td>
                <td><a href="https://maomi.av6363.com/Index/tupianlist.html?cateid=2069">猫咪成人网</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://fulitu.khm001.xyz/">福利图</a>
                </td>
                <td><a href="https://meitu.khm005.xyz/">美人图</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://4hu.khm005.xyz/Index/meinv.html?channelid=7">四虎影院</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.4hu.tv/pic/toupai/">四虎TV</a>
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
                    <a href="https://jiepai.sifang.app/all.html">中国街拍</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://wemao.xyz/">微密猫</a>
                </td>
                <td>SPA網頁，<a href="https://maobao.xyz/">maobao.xyz</a>，<a href="https://mvxzsp.com/">mvxzsp.com</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ai19.art/">Ai19 Art</a>
                </td>
                <td>
                    <a href="https://hentaimama.xyz/">Hentaimama</a>
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
            <tr>
                <td>
                    <a href="https://dailycosplay.com/2022/May/30b.html">Daily Cosplay</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.animexx.de/cosplay/">Animexx</a>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
</details>
<h2>H漫分類內置規則支持列表</h2>
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
                <td>作用在圖片清單頁，手動插入大圖減少消耗GP配額，設定 > 其他 > 可選擇是否載入原圖連結， <a href="https://exhentai.org/">exhentai.org</a>， <a href="https://e-hentai.org/lofi/">https://e-hentai.org/lofi/</a>，圖片下載錯誤率極高，不建議使用本腳本下載。 </td>
            </tr>
            <tr>
                <td>
                    <a href="https://nhentai.net/">nhentai</a>
                </td>
                <td>作用在圖片清單/閱讀頁， <a href="https://nyahentai.red/">nyahentai.red</a>， <a href="https://www.hentai.name/">www.hentai.name</a>， <a href="https://nhentai.xxx/">nhentai.xxx</a>， <a href="https://nhentai.to/">nhentai.to</a>， <a href="https://nhentai.website/">nhentai.website</a>， <a href="https://nhentai.moe/">nhentai.moe</a>， <a href="https://simplyhentai.org/">simplyhentai.org</a>， <a href="https://simplyhentai.red/">simplyhentai.red</a>
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
                <td>作用在圖片清單/閱讀頁， <a href="https://hentaivox.com/">HentaiVox</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaivsmanga.com/">HENTAIVSMANGA</a>
                </td>
                <td>作用在圖片清單/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://ape.su/">APE XXX</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hentai321.top/">山寨3hentai</a>
                </td>
                <td>作用在圖片清單頁</td>
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
                <td>作用在圖片清單頁，SPA網頁</td>
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
                    <a href="https://nhentai.com/en/latest">nHentai</a>
                </td>
                <td>作用在圖片清單頁/閱讀頁，SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaihand.com/en/latest">HentaiHand</a>
                </td>
                <td>作用在圖片清單頁/閱讀頁，SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaiera.com/">HentaiEra</a>
                </td>
                <td>
                    <a href="https://comicporn.xxx/">Comic Porn XXX</a>，作用在圖片清單頁/閱讀頁
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.tsumino.com/">TSUMINO</a>
                </td>
                <td>作用在圖片清單頁/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="http://imhentai.xxx/">IMHentai</a>
                </td>
                <td>作用在圖片清單頁/閱讀頁</td>
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
                    <a href="https://bestporncomix.com/">BestPornComix</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fsicomics.com/">FSIComics</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://pururin.me/">Pururin</a>
                </td>
                <td>作用在圖片清單頁/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://asmhentai.com/">AsmHentai</a>
                </td>
                <td>作用在圖片清單頁/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://thehentai.net/">The Hentai</a>
                </td>
                <td>
                    <a href="https://en.thehentai.net/">en.thehentai.net</a>，作用在圖片清單頁
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://manga-hen.com/">MangaHen</a>
                </td>
                <td>作用在圖片清單頁</td>
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
                    <a href="https://hentairead.com/">HentaiRead</a>
                </td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://lhentai.com/">lHentai</a>
                </td>
                <td>作用在圖片清單頁/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://fhentai.net/">Fhentai</a>
                </td>
                <td>作用在圖片清單頁/閱讀頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://tmohentai.com/">TMOHentai</a>
                </td>
                <td>作用在圖片清單頁/閱讀頁</td>
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
                <td>作用在閱讀頁， <a href="https://chochox.com/">Chochox</a>， <a href="https://comics18.org/">Comics18</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://myreadingmanga.info/">MyReadingManga</a>
                </td>
                <td>作用在閱讀頁，下載需要填入Cookie，可參照V2PH取得Cookie說明，已填入Cookie卻下載錯誤代表Cookie過期，需要重新取得並再次填入新的Cookie。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hitomi.la/">Hitomi.la</a>
                </td>
                <td>SPA網頁，作用在圖片清單頁，設定 > 其他 > 可選擇圖片格式WEBP、AVIF</td>
            </tr>
            <tr>
                <td>
                    <a href="https://rokuhentai.com/">Roku Hentai</a>
                </td>
                <td></td>
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
                    <a href="https://hentaitop.org/">HENTAITOP.ORG</a>
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
                    <a href="https://www.gntai.net/">GNTAI.net</a>
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
                    <a href="https://nukibooks.com/">エロ漫画 ヌキブックス</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.b-hentai.com/">H研-成年コミック研究会</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://erozine.jp/">エロジン</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://momon-ga.com/">モモンガッ!!</a>
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
                <td>分類頁添加了自動翻頁</td>
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
                    <a href="https://freeadultcomix.com/">FreeAdultComix</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hentaifr.net/">Hentai FR</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://prismblush.com/">Prismblush</a>
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
                    <a href="https://www.readmanga18.com/">ReadManga18</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangadistrict.com/">MANGA DISTRICT</a>
                </td>
                <td>
                    <a href="https://apcomics.org/">apcomics</a>，<a href="https://manga18free.com/">manga18free</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://hachirumi.com/">Hachirumi.com</a>
                </td>
                <td>SPA網頁</td>
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
                    <a href="https://doujin18.net/">Doujin18.net</a>，作用在閱讀頁，兩個網站的爬取內容不一樣。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.comic18h.com/">Comic18H</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://doujindesu.icu/">Doujindesu</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://doujindesu.tv/">Doujindesu.XXX</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.nakal.me/">NAKAL</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://chochoxhd.com/">ChoChoX</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://narutodoujins.com/">Naruto hentai Doujins</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://syntheticgirls.com/">Ai Generated Hentai MILFS</a>
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
                    <a href="https://www.favcomic.com/picture">喜漫漫画</a>
                </td>
                <td>完整H漫需付費會員</td>
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
                    <a href="https://www.susmeat.com/">www.susmeat.com</a>， <a href="https://www.freeacg.org/">www.freeacg.org</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wnacg.com/">紳士漫畫wnacg</a>
                </td>
                <td>作用在圖片清單、下拉閱讀頁， <a href="https://www.hentaicomic.ru/">www.hentaicomic.ru</a>， <a href="https://wnacg.date/">紳士漫畫地址發布頁</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhuabika.com/">嗶咔漫畫</a>
                </td>
                <td>
                    <a href="https://manhuapica.com/">manhuapica.com</a>，需註冊，PC限定，手動模式
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://syacomic.com/comic">紳夜漫畫</a>
                </td>
                <td>SPA網頁， <a href="https://syacomic01.website/">地址發布頁</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ssmh.lol/">紳士漫畫ssmh</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://aihgirl.com/manga/">AIHGAME</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://naxter.net/">Naxter</a>
                </td>
                <td>SPA網頁，作用在圖片清單頁/閱讀頁，手動模式。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hmanga.world/">HManga</a>
                </td>
                <td>SPA網頁，作用在閱讀頁，手動模式。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://h-comic.com/">H-Comic</a>
                </td>
                <td>SPA網頁，作用在閱讀頁，手動模式。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://web.nicecat.cc/">NiceCat</a>
                </td>
                <td>SPA網頁，作用在閱讀頁，手動模式。</td>
            </tr>
            </tr>
            <tr>
                <td>
                    <a href="https://pixiv.app/">Comics</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.itsacg.com/plugin.php?id=jameson_manhua">紳士泛漫畫</a>
                </td>
                <td><a href="https://itsacg.top/">福利漫畫地址發布頁</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ahri8.top/">松鼠症倉庫</a>
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
                    <a href="https://ahri-gallery-xfjd-2024-04-25.top/">Ahri Gallery分機</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hmanche.com/">H漫車</a>
                </td>
                <td>目錄頁，寫真自動插入圖片其他手動插入所有章節圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://nnhanman8.com/">鸟鸟韩漫</a>
                </td>
                <td>目錄頁手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://laosiji52.com/">老司機禁漫</a>
                </td>
                <td>
                    <a href="https://laosiji6.com/">Laosiji6.com</a>，目錄頁手動插入所有章節圖片
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://iimhw.com/">爱漫画网</a>
                </td>
                <td><a href="https://mhmao.com/">漫画猫</a>，目錄頁手動插入所有章節圖片 </td>
            </tr>
            <tr>
                <td>
                    <a href="https://atm333.com/">凹凸漫</a>
                </td>
                <td>
                    <a href="https://xman5.com/">X漫</a>， <a href="https://rmtt6.com/">肉漫天堂</a>，目錄頁手動插入所有章節圖片
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://kxmanhua.com/">开心看漫画</a>
                </td>
                <td>目錄頁手動插入所有章節圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.songshuhanman.com/">松鼠韓漫</a>
                </td>
                <td>目錄頁手動插入所有章節圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.yemaohanman.com/">野貓韓漫</a>
                </td>
                <td>目錄頁手動插入所有章節圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://aman3.com/">A漫</a>
                </td>
                <td>目錄頁手動插入所有章節圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hmjidi.com/">韩漫基地</a>
                </td>
                <td>目錄頁手動插入所有章節圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://18mh.org/">18漫畫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://rehanman.com/">热漫画</a>
                </td>
                <td>目錄頁閱讀頁直接取得所有章節圖片</td>
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
                    <a href="https://www.apexmh.com/">頂點漫畫</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://wumtt.com/">污漫天堂</a>
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
                    <a href="https://litu100.xyz/">丽图·污漫画</a>
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
                    <a href="https://www.acgmhb.com/">ACG漫画网</a>
                </td>
                <td>
                    <a href="https://www.porn-comic.com/">www.porn-comic.com</a>， <a href="https://www.cool-manga.com/">www.cool-manga.com</a>， <a href="https://www.acgn2025.xyz/">最新网址</a>
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
                    <a href="http://www.177pica.com/">177漫画</a>
                </td>
                <td>
                    <a href="http://www.177picyy.com/">www.177picyy.com</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://18manga.top/">18H汉化漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://yousemanhua.com/">有色漫画网</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://eromangabigdata.com/">漫画御殿</a>
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
                    <a href="https://www.comic18.cc/">COMIC18</a>
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
                    <a href="https://www.sesemanhua.com/">色色漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hanguoaman.com/">韩国a漫</a>
                </td>
                <td>目錄頁手動插入所有章節圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.manhuatianxia.com/">韩漫天下</a>
                </td>
                <td>
                    <a href="https://github.com/dongmanhezi/dizhi">地址发布页</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hanmanol.com/">韩漫在线</a>
                </td>
                <td>
                    <a href="https://github.com/dongmanhezi/dizhi">地址发布页</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://jyapp.info/">九妖漫画</a>
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
                    <a href="https://xs8.me/">地址发布页</a>，Mobile限定
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
                    <a href="https://www.55comics.xyz/">污污漫书</a>
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
                    <a href="https://www.hmkll.com/">韩漫连连看</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.70te.com/">特漫网</a>
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
                    <a href="https://toptoon04.com/">顶通漫画</a>
                </td>
                <td>
                    <a href="https://toptoon123.xyz">地址发布页</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://semanji.com/">色漫集</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hanime1.biz/home/1">hanime1.biz</a>
                </td>
                <td>
                    <a href="https://anime01.xyz/">科學域名</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://porn-comic.biz/">免費H漫畫同人志</a>
                </td>
                <td>
                    <a href="https://slutporn-comic.lol/">slutporn-comic.lol</a>， <a href="https://wetporn-comic.lol/">wetporn-comic.lol</a>
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
                    <a href="https://www.55comic.com/">污污漫畫</a>
                </td>
                <td>需要自動滾動元素，動態捕獲canvas轉為BlobURL。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://lxmanga.info/">LXMANGA</a>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
</details>
<h2>漫畫分類內置規則支持列表</h2>
<p>漫畫分類為了兼容我提交給東方永頁機(Pagetual)的翻頁規則和自己寫的專用腳本，規則幾乎都是預設為關閉狀態。</p>
<p>如有需要請透過UI選項設定開啟或幹脆修改腳本規則，也需要關閉東方永頁機(Pagetual)或自己加黑名單，不然會衝突。</p>
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
                    <a href="https://www.8comic.com/">8Comic無限動漫</a>
                </td>
                <td>有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.copymanga.tv/">拷貝漫畫</a>
                </td>
                <td>
                    <a href="https://copymanga.tv/">copymanga.tv</a>， <a href="https://www.mangacopy.com/">www.mangacopy.com</a>， <a href="https://mangacopy.com/">mangacopy.com</a>，PC版向下滾動隱藏工具列，無限滾動模式手機版需在閱讀頁重新載入才會生效。
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.relamanhua.org/comics?type=1">熱辣漫畫</a>
                </td>
                <td>
                    <a href="https://www.2024manga.com/comics?type=1">www.2024manga.com</a>，<a href="https://www.manga2024.com/comics?type=1">www.manga2024.com</a>，<a href="https://m.relamanhua.org/v2h5/discoverFreeComic">m.relamanhua.org</a>，<a href="https://m.2024manga.com/v2h5/discoverFreeComic">m.2024manga.com</a>，<a href="https://m.manga2024.com/v2h5/discoverFreeComic">m.manga2024.com</a>，付費漫畫依然需要有付費帳號登入後才能看全部，手機版無限滾動模式需在閱讀頁重新載入才會生效。
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
                    <a href="https://nav.telltome.net/">发布页</a> ，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://m.baozimh.one/">包子漫畫</a>
                </td>
                <td>有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.dm5.com/">DM5</a>
                </td>
                <td>
                    <a href="https://m.dm5.com/">m.dm5.com</a>，有無限滾動模式
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://hk.1kkk.com/">極速</a>
                </td>
                <td>
                    <a href="https://m.1kkk.com/">m.1kkk.com</a>，有無限滾動模式
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.manhuaren.com/">漫画人</a>
                </td>
                <td>Mobile限定，有無限滾動模式</td>
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
                    <a href="https://mycomic.com/">我的漫畫</a>
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
                    <a href="http://m.manmanju.cc/">m.manmanju.cc</a>，閱讀頁添加了下一話連接，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://manhua.dididm.cc/">KuKu动漫</a>
                </td>
                <td>
                    <a href="http://m.dididm.cc/">m.dididm.cc</a>，閱讀頁添加了下一話連接，有無限滾動模式加預讀
                </td>
            <tr>
                <td>
                    <a href="https://www.gufengmh.com/">古风漫画网</a>
                </td>
                <td>
                    <a href="https://m.gufengmh.com/">m.gufengmh.com</a>， <a href="https://www.gf618.com/">www.gf618.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.laimanhua88.com/">来漫画</a>
                </td>
                <td>
                    <a href="https://m.laimanhua88.com/">m.laimanhua88.com</a>， <a href="https://www.comemh8.com/">www.comemh8.com</a>， <a href="https://m.comemh8.com/">m.comemh8.com</a>，有無限滾動模式加預讀
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
                    <a href="https://www.mh160mh.com/">漫画160</a>
                </td>
                <td>
                    <a href="http://m.mh160mh.com/">m.mh160mh.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.zerobywrar.com/">zero搬运网</a>
                </td>
                <td>手動插入圖片， <a href="https://zerobyw.github.io/">域名</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.antbyw.com/plugin.php?id=jameson_manhua">蚂蚁搬运网</a>
                </td>
                <td></td>
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
                    <a href="https://www.haoguoman8.com/">好国漫</a>
                </td>
                <td>
                    <a href="https://m.haoguoman8.com/">m.haoguoman8.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.rumanhua.com/">如漫画</a>
                </td>
                <td>
                    <a href="https://www.dumanwu.com/">读漫屋</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhuami.cc/">漫画网</a>
                </td>
                <td>
                    <a href="https://www.manhua3.com/">www.manhua3.com</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.fengchemh.com/">风车漫画</a>
                </td>
                <td>有無限滾動模式加預讀</td>
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
                    <a href="https://www.ruyanmh.com/">如烟漫画</a>
                </td>
                <td>有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hmttmh.com/">韩漫天堂</a>
                </td>
                <td>
                    <a href="https://cn.zhuzhumh.com/">猪猪漫画</a>，有無限滾動模式加預讀
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.dmanhua.com/">D漫画</a>
                </td>
                <td>有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mqzjw.com/">奇漫屋</a>
                </td>
                <td>Mobile限定，如果無法取得整個章節的圖片需要偽裝成IOS User Agent， <a href="https://whatmyuseragent.com/platforms/ios/ios/18">IOS User Agent</a>，有無限滾動模式加預讀 </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.aitaocomic.com/">爱淘漫画</a>
                </td>
                <td>SPA網頁，手動插入圖片</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ortzn.com/">天天漫画</a>
                </td>
                <td>
                    <a href="https://www.smkj88.com/">新新漫画</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.rcirr.com/">爱漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.manhuazhan.com/">漫画站</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.miaoqumh.org/">喵趣漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.manhua55.com/">漫画屋</a>
                </td>
                <td><a href="https://www.jiongcy.com/">囧次元</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.wujinmh.com/">无尽漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.36mh.org/">36漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.manhuapi.cc/">漫画皮</a>
                </td>
                <td>
                    <a href="https://m.manhuapi.cc/">m.manhuapi.cc</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ikmmh.com/">爱看漫</a>
                </td>
                <td>Mobile限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.greyhoundsoul.com/">灰狗漫画</a>
                </td>
                <td>Mobile限定</td>
            </tr>
            <tr>
                <td>
                    <a href="https://zcymh.com/">最次元</a>
                </td>
                <td>Mobile限定， <a href="https://www.beston-test.com/">优乐漫画</a>， <a href="https://yemancomic.com/">野蛮</a>， <a href="https://www.yydskxs.com/">次元</a>， <a href="https://www.myselfcar.com/">脉赛漫画</a>， <a href="https://www.briangary.net/">格雷漫</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.52hah.com/">聚合漫画屋</a>
                </td>
                <td>
                    <a href="https://www.kukanmanhua.org/">酷看漫画</a>， <a href="http://www.ququmh.com/">去去漫画</a>， <a href="http://www.pipiman.com/">皮皮漫画</a>， <a href="https://www.cicoo.cc/">六漫画</a>， <a href="https://www.liumanhua.cc/">六漫画</a>， <a href="https://www.ypdsm.com/">有品漫画</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.bcloudmerge.com/">云端漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://dogemanga.com/">漫畫狗</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.hahacomic.com/">哈哈漫画</a>
                </td>
                <td>漫畫列表添加自動翻頁功能</td>
            </tr>
            <tr>
                <td>
                    <a href="https://medibang.com/comics/">微漫画</a>
                </td>
                <td>只支持PC版，目錄頁手動插入圖片，閱讀頁手動分頁檢視。</td>
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
                <td><a href="https://manwajs.vip/">走失页1</a>，<a href="https://trello.com/b/NacDoP5n/manwa">走失页2</a>，<a href="https://fuwt.cc/mw666">跳转页2</a>，uBlock加信任名單
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
                <td>
                    <a href="https://www.bilimanga.net/">嗶哩漫畫</a>
                </td>
                <td>Mobile限定，圖片伺服器有請求限制容易錯誤，<a href="https://www.bilicomic.net/">www.bilicomic.net</a></td>
            </tr>
            <tr>
                <td>微信公众号</td>
                <td>樱花漫画、快岸漫画的漫畫目錄連結，有的是導向漢化組的公眾號發布的漫畫連結。</td>
            </tr>
            <tr>
                <td>虎扑社区</td>
                <td>樱花漫画、快岸漫画的漫畫目錄連結，有的是導向漢化組在虎扑社区發布的帖子連結。</td>
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
                <td>圖片手動插入、閱讀、展開目錄、漫畫連結新分頁開啟，預設關閉，需要無限滾動閱讀的話移步專用腳本 <a href="https://greasyfork.org/scripts/459843">https://greasyfork.org/scripts/459843</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhua.zaimanhua.com/">再漫画</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://komiic.com/">Komiic</a>
                </td>
                <td>SPA網頁，預設關閉，網站每天有圖片瀏覽張數限制。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ikanbook.net/">快岸漫画</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.77mh.nl/">新新漫画</a>
                </td>
                <td>
                    <a href="https://m.77mh.nl/">m.77mh.nl</a>，預設關閉
                </td>
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
                <td>
                    <a href="https://m.k886.net/">m.k886.net</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.dongman.la/">動漫啦</a>
                </td>
                <td>
                    <a href="https://m.dongman.la/">m.dongman.la</a>，預設關閉
                </td>
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
                    <a href="https://www.31mh.cc/">31漫画</a>
                </td>
                <td>
                    <a href="https://m.31mh.cc/">m.31mh.cc</a>，預設關閉
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
                    <a href="https://www.amh1234.com/">漫画1234</a>
                </td>
                <td>
                    <a href="https://m.amh1234.com/">m.amh1234.com</a>，預設關閉
                </td>
            </tr>
            <tr>
                <td>
                    <a href="http://www.ykmh.net/">优酷漫画</a>
                </td>
                <td>
                    <a href="http://m.ykmh.net/">m.ykmh.net</a>，預設關閉
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
                    <a href="http://www.mh5.xyz/">www.mh5.xyz</a>，預設關閉
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
                    <a href="http://comics.veryim.com/">非常爱漫舊站</a>
                </td>
                <td>
                    <a href="http://wap.veryim.com/">wap.veryim.com</a>，預設關閉
                </td>
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
                    <a href="https://www.bikamanhua.com/">哔咔漫画</a>
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
                    <a href="https://www.kanman.com/">看漫画</a>
                </td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td>
                    <a href="https://comic-top.com/">Comic Top</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://zerosumonline.com/">ゼロサムオンライン</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ganma.jp/web">GANMA!(ガンマ)</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.alphapolis.co.jp/">アルファポリス</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mangajikan.com/">漫画時間</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tokiraw.com/">漫画RAW</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mangasuika.com/">漫画スイカ</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.lmanga.com/">L漫画</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://klmanga.ax/">Manga Raw</a>
                </td>
                <td><a href="https://klmanga.my/">klmanga.my</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.firemanga.com/">Fire Manga</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.rawbig.com/">Big raw</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://rawkuma.net/">Rawkuma</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://klz9.com/">KL</a>
                </td>
                <td>
                    <a href="https://jestful.net/">JF</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://rawkuro.net/home">RawKuro</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://jmanga.sh/">JManga</a>
                </td>
                <td>
                    <a href="https://momon-ga.org/">Momon-Ga</a>， <a href="https://rawotaku.org/">RawOtaku</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://niraw.com/">Niraw</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhuascans.org/">GodaComic 英文</a>
                </td>
                <td>有無限滾動模式加預讀</td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhuascan.us/">Manhuascan 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mangago.me/">Mangago 英文</a>
                </td>
                <td>
                    <a href="https://www.mangago.zone/">mangago.zone</a>， <a href="https://www.youhim.me/">youhim.me</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangadex.org/">MangaDex 英文</a>
                </td>
                <td>SPA網頁，只支持PC版。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://namicomi.com/en">NamiComi 英文</a>
                </td>
                <td>SPA網頁，只支持PC版。</td>
            </tr>
            <tr>
                <td>
                    <a href="https://comick.io/home2">Comick 英文</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://weebcentral.com/">Weeb Central 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://bato.to/">BATOTO 英文</a>
                </td>
                <td>
                    <a href="https://rentry.co/batoto">Mirror Domains</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://dynasty-scans.com/">Dynasty Reader 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://hiperdex.com/">Hiperdex 英文</a>
                </td>
                <td>
                    <a href="https://www.mangaread.org/">MangaRead</a>， <a href="https://lhtranslation.net/">LHTranslation</a>， <a href="https://manhuaus.com/">MANHUAUS.COM</a>， <a href="https://novelmic.com/">Novelmic.com</a>， <a href="https://setsuscans.com/">Setsu Scans</a>， <a href="https://www.toongod.org/">ToonGod</a>， <a href="https://www.toongod.org/">ToonGod</a>， <a href="https://harimanga.me/">HARIMANGA</a>， <a href="https://mangaonlineteam.com/">Manga Online Team</a>， <a href="https://manhwacrush.me/">Manhwa Crush</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangapark.net/">MangaPark 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ww8.mangakakalot.tv/">Mangakakalot 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mangahere.cc/">MangaHere 英文</a>
                </td>
                <td>
                    <a href="https://fanfox.net/">Manga Fox</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://komikcast.cz/">Komikcast 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://raw.senmanga.com/">Sen Manga RAW</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.senmanga.com/">Sen Manga 多語系</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://readcomiconline.li/">ReadComicOnline 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tcbscans.me/">TCB Scans 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.niadd.com/">NiAdd 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangahasu.me/">MangaHasu 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangafire.to/home">MangaFire 英文</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhuatop.org/">Top Manhua 英文</a>
                </td>
                <td>
                    <a href="https://topmanhua.fan/">topmanhua.fan</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://toonily.com/">Toonily 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhwaz.com/">ManhwaZ 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhwaz.com/">Mangaclash 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://toonclash.com/">Mangapill 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangagg.com/">MANGAGG 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mangatown.com/">MangaTown 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mangahome.com/">MangaHome 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://asuracomic.net/">Asura Scans 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://disasterscans.com/">Disaster Scans 英文</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhuaplus.org/home">Manhuaplus 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://demonicscans.org/">MangaDemon 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://realmoasis.com/">Realm Oasis 英文</a>
                </td>
                <td>
                    <a href="https://hivetoon.com/">Void Scans</a>， <a href="https://nightsup.net/">Night Scans</a>， <a href="https://tecnoxcomics.xyz/">Terco Scans</a>， <a href="https://luascans.com/">Lua Scans</a>， <a href="https://drakecomic.org/">Drake Scans</a>， <a href="https://rizzfables.com/">Rizz Fables</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangatoon.mobi/">MangaToons 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.mgeko.cc/">MangaGeko 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.ninemanga.com/">NineManga 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://readcomicsonline.ru/">ReadComicsOnline 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://flamecomics.xyz/">Flame Comics 英文</a>
                </td>
                <td>SPA網頁，手動</td>
            </tr>
            <tr>
                <td>
                    <a href="https://hivecomic.com/">Voids Scans 英文</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.reaperscans.com/">ReaperScans 英文</a>
                </td>
                <td>SPA網頁， <a href="https://www.omegascans.org/">Omega Scans</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.vortexscans.org/">Vortex Scans 英文</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://zscans.com/">ZeroScans 英文</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangakatana.com/">MangaKatana 英文</a>
                </td>
                <td>手動</td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhuaplus.com/">ManhuaPlus 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://kaliscan.io/home">KaliScan 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangagojo.com/">Mangagojo 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://cosmic345.co/">Cosmic Scans Indonesia 英文</a>
                </td>
                <td><a href="https://cosmictoon.ae/">cosmictoon.ae</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://manga-bay.org/home">Manga-Bay 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangakakalot.fun/">MangaKakalot 英文</a>
                </td>
                <td>SPA網頁，<a href="https://mangahub.io/">MangaHub 英文</a>，<a href="https://mangafox.fun/">MangaFox</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://vymanga.com/">VyManga 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.manganato.gg/">MangaNato 英文</a>
                </td>
                <td><a href="https://www.natomanga.com/">MangaNato</a>，<a href="https://www.mangakakalot.gg/">MangaKakalot</a>，<a href="https://www.nelomanga.com/">MangaNelo</a></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangakakalot.to/">MangaKakalot 英文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangabuff.ru/">Слив манги для вас 俄文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangamen.ru/">MangaMen 俄文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangahub.ru/">Mangahub 俄文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://remanga.org/">ReManga 俄文</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangalib.org/">MangaLib 俄文</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangapoisk.live/">МангаПоиск 俄文</a>
                </td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td>
                    <a href="https://mangamammy.ru/">mangamammy 俄文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://manga-shi.com/">Manga-shi 俄文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.kingsmanga.net/">Kingsmanga 泰文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.novatoscans.top/">NOVATO SCANS 葡萄牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://inmanga.com/">InManga 西班牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://manga-oni.com/">MangaOni 西班牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://manhwaweb.com/">ManhwaWeb 西班牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://zonatmo.com/">ZonaTMO 西班牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://tresdaos.com/">TresDaos 西班牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://zonamiau.com/">Lectormiau 西班牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://m440.in/">M440.in 西班牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://ntrgod.com/">NTRGod 西班牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.leercapitulo.co/">LeerCapitulo 西班牙文</a>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>Ikigai Mangas</td>
                <td>
                    <a href="https://visorikigai.eltanews.com/">EltaNews</a>、 <a href="https://visorikigai.ajaco.net/">Ajaco</a>
                </td>
            </tr>
            <tr>
                <td>
                    <a href="https://www.kumanga.com/">KuManga</a>
                </td>
                <td></td>
            </tr>
        </tbody>
    </table>
</details>
<h2>輔助分類內置規則支持列表</h2>
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
                <td>漫畫分類</td>
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
