<h1>提醒：</h1>
<p>如果所在區域，ISP，或是不可抗力的因素而無法正常連接cdn.jsdelivr.net的依賴庫時</p>
<p>請自行修改腳本將所有cdn.jsdelivr.net替換成cdn.bootcdn.net</p>
<pre>
cdn.jsdelivr.net
https://cdn.jsdelivr.net/npm/jszip@3.9.1/dist/jszip.min.js
https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0.24/dist/fancybox/fancybox.umd.js
https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0.24/dist/fancybox/fancybox.css
https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js
https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.css
</pre>
<pre>
cdn.bootcdn.net
https://cdn.bootcdn.net/ajax/libs/jszip/3.9.1/jszip.min.js
https://cdn.bootcdn.net/ajax/libs/jquery/3.7.1/jquery.min.js
https://cdn.bootcdn.net/ajax/libs/fancyapps-ui/5.0.22/fancybox/fancybox.umd.js
https://cdn.bootcdn.net/ajax/libs/fancyapps-ui/5.0.22/fancybox/fancybox.css
https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js
https://cdn.bootcdn.net/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css
</pre>
<br>
<p>2023/11/06</p>
<p>腳本1.6.0+版本使用Fancybox5.0.24後，暴力猴Violentmonkey會報錯。</p>
<p>在以下測試環境是正常的</p>
<pre>
FireFox 119.0 + Tampermonkey 4.19.0
Cent Browser 5.0.1002.354 + Tampermonkey 4.19.0
Chrome 119.0.6045.106 + Tampermonkey 4.19.0
Edge 119.0.2151.44 + Tampermonkey 4.19.0
Kiwi Browser 116.0.5845.240 + Tampermonkey 4.19.0
</pre>
<p>如果用戶堅持使用暴力猴Violentmonkey，腳本1.6.3+的版本只需用戶自己修改</p>
<pre>
// @require            https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0.24/dist/fancybox/fancybox.umd.js
</pre>
改成
<pre>
// @require            https://cdn.jsdelivr.net/npm/@fancyapps/fancybox@3.5.7/dist/jquery.fancybox.min.js
</pre>
<p>應該就能正常使用了，相當於用戶自己降低Fancybox的版本，Fancybox的css會自動注入3.5.7版。</p>
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
https://www.wnacg.com/photos-slide-aid-*.html
https://www.wnacg.com/photos-slist-aid-*.html
</pre>
<p>Fancybox功能在少部份網站上無效或與網站自身的LIGHTBOX插件衝突或顯示有問題，有列了是不使用Fancybox的網站，如下。</p>
<pre>
XLUST.ORG、ACGN小鎮、最新韩漫网M、拷貝漫畫M、野蛮漫画、次元漫画、漫神
</pre>
<h1>簡介：</h1>
<p>寫這個腳本的緣由是，想讓下載、複製鏈結不用做展開圖庫挑選圖片的動作，能自己決定要儲存的壓縮檔和資料夾名稱，網站沒有限制連接數的話能做到高速聚集所有圖片，還能添加一些我想要的輔助功能。</p>
<p>聚圖！反對將一話一集一章一篇一部拆成好幾頁，一頁一張圖真XXX的有病，整頁用Lazy loading的話還能接受，透過選擇器圈選圖片或者自己寫函式，能聚集分頁的所有圖片到當前頁面裡，也能進行下載壓縮打包，如有NEXT元素能做到自動化下載，支援自定義規則方便重複使用，後續擴充規則更容易。</p>
<p>用戶寫的規則請自行另外備份，規則只會寫死在腳本裡不會線上規則化，腳本更新就會覆蓋規則。</p>
<p>如有需要支持的站點可反饋，有空的話會嘗試幫寫規則加進腳本內置的規則庫裡，能力有限不保証一定寫的出來。</p>
<h1>關於自動下載：</h1>
當修改了腳本UI選項設定或快捷鍵[ Ctrl + . ]或腳本內的站點規則啟用了自動下載時，站點規則insertImg的自動插入圖片將無效，瀏覽器的下載設定需關閉下載前詢問儲存位置和設定好預設的下載路徑，全自動需要有NEXT做搭配，每個站點第一次啟用時需等待連續下載2~3次後，觸發瀏覽器詢問是否同意允許下載多個檔案，需同意後後續才能成功下載，並且讓分頁保持在前景運行不然壓縮進度會停住，可以開一個獨立視窗一個分頁用作下載用，最好的方式是拉兩個視窗一個佔1/3畫面掛下載一個佔3/2畫面瀏覽。

<h1>圖片全載規則示例：</h1>
<details>
    <summary><kbd><strong>「 點擊展開查看 」</strong></kbd></summary>
<br>
    <pre>
[{
    name: "規則名稱",
    enable: 0, //填0禁用此規則
    icon: 0, //填0不顯示左下圖示
    key: 0, //填0不綁定快捷鍵
    reg: /www\.xxxxx\.com/, //正則表達式匹配網址
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
    include: "元素", //網頁必須包含的元素
    exclude: "元素", //網頁要排除的元素
    init: "code", //載入頁面後要執行的代碼
    init: () => {
        code
    },
    imgs: "#TheImg", //CSS選擇器
    imgs: "//img[@id="TheImg"]", //XPath選擇器
    //IMG、DIV、A，SPAN，4種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A取href屬性。
    imgs: "js;code", //也可透過JS代碼自己創建Array，有時大圖是在A元素上需要透過xhr獲取或放在script或變量或透過api取得的json。
    imgs: () => {
        let arr = [];
        …code;
        return arr;
    },
    scrollEle: ["元素", time],//[自動捲動元素, 捲動的間隔], 綁定快捷鍵數字鍵6
    scrollEle: async () => {
        …code;
    },
    button: [4, "24%", 1],//[無作用, "寬度%", 在按鈕之前添加多少空行]插入圖片也添加功能按鈕
    insertImg: ["元素", 1, time], //[清空此元素內容插入圖片, 0(手動)1(自動)2(自動Lazy loading模式)3(手動Lazy loading模式), 自動延遲時間(預設0)]。
    insertImg: [
        ["元素", (插入在此元素) 0(裡面)1(之前) 2(之後), "要移除的元素"], 0(手動) 1(自動) 2(自動Lazy loading模式) 3(手動Lazy loading模式), 自動延遲時間(預設0)
    ],
    insertImgAF: () => {//插入圖片後要執行的代碼
        code
    },
    go: 1, //insertImg配套選項，圖片插入在頁面偏下位置時，捲動至第一張大圖的位置。
    customTitle: "return code", //自定義JS代碼生成壓縮檔和資料夾名稱，預設是使用當前網頁標題。
    customTitle: () => {
        return code
    },
    observerTitle: true, //觀察元素變化重新取得標題字串
    autoDownload: [1, time], //1載入頁面後立即開始下載，與next搭配可以實現全自動下載，time延遲幾秒後點擊下一頁(預設5)。
    next: "//a[text()="下一章"]", //設定下一頁元素綁定右方向鍵點擊下一頁。
    next: () => {
        …code;
        return link
    },
    prev: "//a[text()="上一章"]", //設定上一頁元素綁定左方向鍵點擊上一頁，填1則使用history.back();。
    css: "css", //插入自訂樣式，基本上就是用來隱藏廣告用的。
    autoClick: "元素", //載入頁面後點擊一次此元素，能簡單做到自動簽到、展開目錄、Show All
    autoClick: ["元素", 1000], //元素,延遲毫秒時間(預設1000)
    observerClick: "元素", //使用Intersection Observer API，元素進入可視範圍內才點擊
    loadMore: "元素", //監聽scroll事件，滾至頁面底部時點擊元素，能簡單做到自動載入更多
    openInNewTab: ".manga-cover>a:not([target=_blank])", //指定的A元素在新分頁開啟
    topButton: true, //添加返回頂部按鈕
    threading: 1, //有些網站限制連接數，下載連接數太大容易出錯，適當降低連接數。
    fetch: 1, //使用Fetch API下載圖片，需要網站有支援CORS，如小黃書，4KHD
    referer: "src", //下載圖片時傳遞的參照頁，預設是使用當前網址，"src"參照頁為圖片網址，也能自訂如"https://www.4khd.com/"或空""
    category: "comic" //類別(非必須)
}, {
    name: "規則2",
    enable: 0,
    icon: 0,
    key: 0,
    reg: /www\.xxxxx\.com/,
    reg: () => {
        if (code) {
            return true;
        }
        return false;
    },
    delay: 300,
    include: "",
    exclude: "",
    init: "code",
    init: () => {
        code
    },
    imgs: "",
    imgs: () => {
        code
    },
    scrollEle: ["", 500],
    scrollEle: async () => {
        …code;
    },
    button: [4, "24%", 1],
    insertImg: ["", 0, time],
    insertImg: [
        ["", 1, ""], 2, time
    ],
    insertImgAF: () => {
        code
    },
    go: 1,
    customTitle: "code",
    customTitle: () => {
        code
    },
    observerTitle: true,
    autoDownload: [1, time],
    next: "",
    next: () => {
        code
    },
    prev: "",
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
</details>
<h1>自動翻頁規則示例：</h1>
<details>
    <summary><kbd><strong>「 點擊展開查看 」</strong></kbd></summary>
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
[...fun.gae(selector, doc)]
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
        re: ".pages",
        history: 1
    },
    category: "autoPager"
}, {
    name: "規則範例",
    enable: 1,
    reg: /^https:\/\/.+/,
    autoPager: {
        mode: 0, //0(預設可省略)靜態翻頁使用Fetch API加載下一頁，1動態翻頁使用iframe框架加載下一頁。
        waitEle: "selector", //mode為1時等待直到指定的元素出現，不需要則省略，預設使用主體元素選擇器。
        loadTime: 200, //mode為1時給iframe框架讀取的時間，預設200可省略。
        ele: "selector", //下一頁主體元素選擇器
        ele: (doc) => { 
            //2種寫法
            //1.創建元素和插入元素皆由此函式完成
            //2.創建元素陣列返回元素陣列，搭配pos決定元素插入位置
            code
        },
        pos: ["selector", 0], //[插入下一頁主體元素的基準元素, 0裡面1之前2之後]，預設為主體元素最後一個之後，可省略。
        next: "selector", //下一頁A元素選擇器
        next: (doc) => { 
            code
            return url
        },
        http: "https", //下一頁鏈結的傳輸協定 http/https
        re: "selector", //替換元素，下一頁的元素替換到當前頁面的相同的元素，如標題、頁碼條，不需要則省略。
        observer: "selector", //用來觸發翻下一頁的元素，有多個元素時取最後一個元素，觸發時機為當元素進入可視範圍時，不使用則省略。
        stop: (doc) => {
            //根據判斷結果返回布林值boolean停止翻頁。
            code
            if (code) {
                return true
            }
            return false
        },
        showTitle: 0, //0不顯示下一頁的標題分隔條，顯示則省略。
        title: (doc) => {
            //自定義標題分隔條要顯示的文字，不使用則省略。
            code
            return titleText
            //先經過代碼判斷返回obj。
            return {
                ok: (true添加標題,false不添加),
                text: titleText
            }
        },
        bottom: 1000, //不使用observer時，滾動到距離頁面底部剩餘多少高度px時觸發翻下一頁，預設為當前視窗可視範圍的高度screen.height可省略。
        sleep: 1000, //翻頁事件注入的間隔時間ms，預設1000可省略。
        history: 1, //1翻頁後添加瀏覽器歷史紀錄，不需要則省略。
        loading: "msg", //自動翻頁載入中顯示gif或訊息，gif(預設可省略)，msg顯示在畫面中間的文字訊息
        lazySrc: "selector", //有元素圖片網址放在dataset屬性，IMG元素的src直接使用dataset，DIV、A元素創建style.backgroundImage顯示dataset圖片
        script: "selector", //下一頁腳本選擇器，將下一頁的腳本代碼插入到當前頁改變變量，不需要則省略。
        bF: (doc) => {
            //插入下一頁元素之前要執行的代碼，不需要則省略
        },
        aF: () => { 
             //插入下一頁元素之後要執行的代碼，不需要則省略
        }
    },
    category: "autoPager"
}
</pre>
</details>
<h1>內置函式：</h1>
<details>
    <summary><kbd><strong>「 點擊展開查看 」</strong></kbd></summary>
<br>
<pre>
//返回一個指定元素，支持CSS/Xpath選擇器
fun.ge("selector");
fun.ge("selector", doc);
fun.ge("selector", node);
</pre>
<pre>
//返回所有指定元素，支持CSS/Xpath選擇器
fun.gae("selector");
fun.gae("selector", doc);
fun.gae("selector", node);
</pre>
<pre>
//取得元素的字串
//mode
//1返回指定元素的字串(預設)
//2返回指定元素的上一個元素的字串
//3返回指定元素的上上一個元素的字串
fun.geT("selector", mode = 1, doc = document);
</pre>
<pre>
//取得元素屬性的值
fun.attr("selector","屬性", doc = document)
</pre>
<pre>
//返回元素的圖片網址陣列
fun.getImgSrcArr("selector", doc = document);
fun.getImgSrcArr("圖片元素選擇器");
fun.getImgSrcArr([圖片元素陣列]);
</pre>
<pre>
//對document.title的字串修改
//mode
//0返回【刪除指定字串的標題(預設)】
//1返回【字串切割取[0]去前後空白】
//2返回【字串切割[0] + "字串" + 字串切割[1]】
//3返回【字串切割[1] + "字串" + 字串切割[0]】
fun.title("字串", mode, doc = document)
</pre>
<pre>
//將字串解析成document物件
//搭配fetch(url).then(res => res.text())返回的原始碼使用
fun.doc("字串")
fetch(url).then(res => res.text()).then(res => {
    let doc = fun.doc(res);
    let ele = fun.ge(ele, doc);
    return ele
})
</pre>
<pre>
//將字串解析成xml物件
fun.xml("字串")
</pre>
<pre>
//顯示簡短訊息
fun.showMsg("字串",1000(顯示的時間,0持續顯示));
//隱藏簡短訊息
fun.hideMsg();
</pre>
<pre>
//延遲運行async/await
await fun.delay(time);
</pre>
<pre>
//等待元素async/await
await fun.waitEle(ele, max = 200, doc = document)
//間隔100毫秒判斷一次，有元素返回true超過循環次數返回false。
//所以可以這樣用
if (await fun.waitEle(ele)) {
    code
} else {
    code
}
</pre>
<pre>
//等待變量async/await
await fun.waitVar("declares", max = 200)
</pre>
<pre>
//函式搭配，多元素點擊，如簽到任務
init: async () => {
    if (fun.ge(ele)) {
        let eleArr = ["ele1","ele2","ele3"];
        for (let i in eleArr) {
            await fun.waitEle(eleArr[i]);
            fun.ge(eleArr[i]).click();
            await fun.delay(200);
        }
    }
}
</pre>
<pre>
//功能基本等同eval()
fun.run("代碼")
</pre>
<pre>
//創建空陣列，取代[] for push()的寫法
//num陣列的長度
fun.arr(num)
fun.arr(num).map((_, i) => {
    return
})
</pre>
<pre>
//移除元素
fun.remove("ele", time = 0)
</pre>
<pre>
//清除所有setTimeout&setInterval定時器
//用匿名函式對付匿名函式，可以解決一部份不讓人打開F12開發人員工具的問題
//mode0，預設運行全部
//mode1，Function.prototype.constructor = () => {};
//mode2，只清setTimeout;
//mode3，只清setInterval;
fun.clearAllTimer(mode);
</pre>
<pre>
//插入樣式，需要先用JS判斷的情況用這個
fun.css("css")
</pre>
<pre>
//插入A元素
fun.addUrlHtml(url, ele, pos, text)
//url 網址
//ele 元素選擇器
//pos
//0在元素之前
//1在元素之後
//2在元素裡面，最後一個子元素之後
//3在元素裡面，第一個子元素之前。
//text 字串
</pre>
<pre>
//依序滾動元素
//selector 元素選擇器
//ms 滾動的間隔時間
fun.scrollEles(selector, ms = 100)

//依序滾動元素EX
//selector 元素選擇器
//callback判斷
//time判斷逾時的時間
let callback = (ele) => fun.ge("img[src]", ele); //ele參數為捲動的元素自身，此例為判斷元素的子元素有沒有出現img[src]
let callback = (img) => /^blob/.test(img.src);//此例為判斷元素的src屬性是否已經轉為BlobURL
fun.aotoScrollEles(selector, callback, time = 5000)
</pre>
<pre>
//確認圖片狀態屬性 返回一個obj
await fun.checkImgStatus(src);
返回
{
ok:true/false,成功讀取true失敗false
width:width,//成功返回圖片寬屬性
height:height//成功返回圖片高屬性
}
</pre>
<pre>
//網頁圖片src屬性開頭是blob:的，只能通過再繪製轉換來取得，無法繪製跨域的圖片，會出現跨域汙染的錯誤。
//ele，canvas、img元素選擇器
//type轉換的圖片類型"image/jpeg"、"image/webp"、"image/png"
//quality 壓縮比率 0 ~ 1
//返回BlobURL
fun.imgToBlobURL(ele, type = "image/jpeg", quality = 1);
//範例 [...fun.gae(".mh_comicpic img[src^=blob]")].map(e => fun.imgToBlobURL(e));
</pre>
<pre>
//包裝fun.imgToBlobURL函式。
//ele，canvas、img元素選擇器
//type轉換的圖片類型"image/jpeg"、"image/webp"、"image/png"
//quality 壓縮比率 0 ~ 1
//返回BlobURL陣列
fun.imgBlobArr(ele, type = "image/jpeg", quality = 1);
//範例1：fun.imgBlobArr(".mh_comicpic img[src^=blob]");
//範例2：fun.imgBlobArr(".image>img");
</pre>
<pre>
//使用Promise包裝GM_xmlhttpRequest
//只取得回應標頭，不接收完整資料，快速確認鏈結的存活狀態。
fun.xhrHEAD(url);
let res = await fun.xhrHEAD(url);
let status = res.status;
if (status == 200) {
    code
} else if (status == 404) {
    code
}
</pre>
<pre>
//使用Promise包裝GM_xmlhttpRequest
//針對imx.to圖床，返回有顯示圖片的document。
fun.imxXHR(url);
fun.imxXHR(url).then(doc => {
    console.log("測試doc", doc);
})
</pre>
<pre>
//使用Promise包裝GM_xmlhttpRequest
//針對www.imagebam.com圖床，返回有顯示圖片的document。
fun.imageBamXHR(url);
fun.imageBamXHR(url).then(doc => {
    console.log("測試doc", doc);
})
</pre>
<pre>
//使用Promise包裝GM_xmlhttpRequest
//需要跨域CORS、更改參照頁，更改瀏覽器UA時可用。
fun.xhr(url, type = "text", referer = location.href, ua)
fun.xhr(url, "document").then(doc => {
    console.log("測試doc", doc);
})
fun.xhr(url, "json").then(json => {
    console.log("測試json", json);
})
</pre>
<pre>
//使用Promise包裝GM_xmlhttpRequest，返回經過文字編碼的document，避免字元亂碼。
fun.xhrDoc(url, referer, ua)
fun.xhrDoc(url).then(doc => {
    console.log("測試doc", doc);
})
</pre>
<pre>
//使用Fetch API，返回經過文字編碼的document，避免字元亂碼。
fun.fetchDoc(url)
fun.fetchDoc(url).then(doc => {
    console.log("測試doc", doc);
})
</pre>
<pre>
//使用iframe框架，返回iframe框架的document。
//ele元素選擇器指定等待到元素出現(必須)
//time框架載入逾時的時間
let callback = (doc, fun) => { //參數doc為iframe的document,fun為可調用的函式庫物件
自由發揮
}
await fun.iframeDoc(url, ele, time = 5000, callback);
</pre>
<pre>
//使用Fetch API搭配iframe框架，返回iframe框架的document。
//fetch()取得html原始碼傳入iframe框架，需要用iframe框架加載網頁，網站卻又容易卡住逾時時使用，fetch()逾時524或發生400以上錯誤碼，自動重試。
//ele元素選擇器指定等待到元素出現(必須)
//time框架載入逾時的時間
let callback = (doc, fun) => { //參數doc為iframe的document,fun為可調用的函式庫物件
自由發揮
}
await fun.iframeSrcDoc(url, ele);
</pre>
<pre>
//xhr抓取元素，不局限於圖片(靜態，可跨域)
//links網址陣列
//eles要抓的元素
//"targetEle"清空此元素放入allEle
//["targetEle", pos] 此元素位置pos，0裡面1之前2之後
//time請求發送的間隔毫秒
await fun.getEle(links, eles, targetEle, removeEle = null, time = 100)
</pre>
<pre>
//xhr抓取圖片元素，返回圖片網址 (只支持靜態網頁，無法跨域請求)
//max填入用fun.geT()取得最大頁數的數字，或想辦法算出最大頁數的數字。
fun.getImg("圖片元素選擇器",max ,mode ,["圖片網址用來替換的字串","圖片網址要被替換的字串"], 請求發送的間隔毫秒)
fun.getImg(ele, max, mode = 1, rText = [null, null], time = 100)
//網址頁碼數字遞增模式
//第一頁 ==> 第二頁
mode1(預設)
.html ==> .html?page=2
 ==> ?page=2
mode2
.html ==> /2.html
mode3
.html ==> _1.html
mode4
/ ==> /2/
mode"4"
 ==> /2
mode5
.html ==> -2.html
mode"5"
-1.html ==> -2.html
mode6
?p=1 ==> ?p=2
mode7
/1 ==> /2
.html ==> .html/2
mode8
==> &page=1
mode"8"
==> &page=2
mode9
.html ==> _2.html
mode10
.html ==> .html/2
mode11
/ ==> /2.html
/1.html ==> /2.html
mode12
/ ==> /2.htm
/1.htm ==> /2.htm
mode13
-1-* ==> -2-*
mode14
/1/ ==> /2/
mode15
/ ==> /index_2.html
/index.html ==> /index_2.html
mode16
 ==> /2#list
mode17
.htm ==> _2.htm
mode18
/ ==> /page/2/
mode19
-1 ==> -2
mode20
 ==> -p-2

//獨立出來的可調用函式，返回修改後的鏈結
fun.getModeUrl(url, mode, num)
</pre>
<pre>
//fun.getImgO基本同fun.getImg，但使用單線程獲取網頁,能設置獲取網頁的間隔時間。
fun.getImgO("圖片元素選擇器", max, mode, ["圖片網址用來替換的字串", "圖片網址要被替換的字串"], time(延遲請求下一頁的時間預設200毫秒), "替換頁碼條元素", 0(不顯示獲取訊息))
fun.getImgO(img, maxPage = 1, mode = 1, rText = [null, null], time = 200, paginationEle = null, msg = 1)
</pre>
<pre>
//fun.getImgIframe基本同fun.getImg，使用iframe框架單線程獲取網頁,能讓網頁運行必要的javaacript。
fun.getImgIframe("圖片元素選擇器", max, mode, ["圖片網址用來替換的字串", "圖片網址要被替換的字串"], "替換頁碼條元素", time(給予框架讀取的時間), 0 不顯示獲取訊息)
fun.getImgIframe(img, max, mode, [null, null], paginationEle, time, showMsg)
</pre>
<pre>
//mode
//0多線程(預設)
//1單線程
//數字大於等於100，請求間隔模式單位毫秒。
//A元素選擇器的href屬性不能是#和javascript或onclick監聽點擊事件，必須是一般的http鏈接。
//A元素參數可以傳入自己創建的網址陣列
fun.getImgA("圖片元素選擇器", "A元素選擇器", mode, ["圖片網址要替換的字串", "圖片網址要被替換的字串"], 0 不顯示獲取訊息)
fun.getImgA(img, A, mode = 0, rText = [null, null], showMsg = 1)
fun.getImgA("圖片元素選擇器", "A元素選擇器")
fun.getImgA("圖片元素選擇器", [網址陣列])
</pre>
<pre>
//可跨域抓圖片
fun.getImgCorsA("圖片元素選擇器", "A元素選擇器", time = 100)
fun.getImgCorsA("圖片元素選擇器", [網址陣列], time = 100)
</pre>
<pre>
//翻頁模式聚集圖片或是含A元素的預覽縮圖然後fun.getImgA()
fun.getNP("元素選擇器", "下一頁元素元素選擇器或函式", "判斷為最後一頁的元素選擇器或函式", "替換元素選擇器", time(延遲請求下一頁的時間預設0毫秒), dataset = null, 顯示訊息 = 1)
//判斷為最後一頁的函式舉例
//doc是下一頁的document
const last = doc => {
    let ele = fun.ge("#showmore", doc);
    return ele.dataset.page >= ele.dataset.max ? true : false;
}
const last = doc => {
    let currentPage = fun.ge("#pagenum", doc).innerText.match(/\d+/)[0]; //下一頁的當前頁數
    let totalPage = fun.ge("#pagenum", doc).innerText.match(/\/(\d+)/)[1]; //下一頁的最大頁數
    return currentPage >= totalPage ? true : false; //當前頁數大於等於最大頁數是最後一頁
}
//用在規則init
fun.getNP(ele, nextLinkEle, lastEle, paginationEle, time, dataset, msg);
fun.getNP(ele, nextLinkEle);
//用在規則imgs，需要用async/await
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
<p>數字鍵 2 捲動至第一張大圖</p>
<p>數字鍵 3 一鍵下載</p>
<p>數字鍵 4 捲動至最後一張大圖</p>
<p>數字鍵 5 切換圖片顯示模式，原始模式和並排模式，</p>
<p>數字鍵 7 匯出網址MediaURLs.txt文件</p>
<p>數字鍵 - 減鍵圖片以10%為單位比例縮小，會記憶縮放比例</p>
<p>數字鍵 + 加鍵圖片以10%為單位比例放大，會記憶縮放比例</p>
<p>數字鍵 . 點鍵取消縮放恢復為自動</p>
<p>數字鍵 * 乘鍵顯示選項設定。</p>
<p>數字鍵 / 除鍵初始化當前網站的設定。</p>
<p>組合鍵 Ctrl + . 開始或取消自動下載，網站需有必要的相關規則。</p>
<br>
<p>按0、Enter，2步驟開始下載。</p>
<p>按1，複製圖片網址，如果設置了insertImg為手動，按1、Enter是插入圖片，第二次按是複製圖片網址。</p>
<p>按2，捲動至腳本插入的第一張大圖</p>
<p>按3，一鍵下載，跳過自定義標題的步驟。</p>
<br>
<p>PS：需重複獲取原始圖片元素的規則，按1無法複製圖片網址，需點擊頁面功能按鈕或選單按鈕的複製圖址。</p>
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
<p>右和下方向鍵下一張圖(不會觸發前往下一頁)，左和上方向鍵上一張圖(不會觸發前往上一頁)，漫畫類和H漫設定欄位為2使用並排模式後請勿使用，因為閱讀順序是錯誤的，需先切換回原始模式。</p>
<br>
<p>4.分頁檢視模式</p>
<p>W鍵、A鍵、上左方向鍵跳轉到目前的上一張圖、S鍵、D鍵、下右方向鍵跳轉到目前的下一張圖</p>
<p>數字鍵 0 切換為預設模式自動排列</p>
<p>數字鍵 1 切換為單圖置中模式</p>
<p>數字鍵 2 切換為多圖並排模式</p>
<p>PS：網站如果有Content Security Policy (CSP)限制，將沒有切換模式、圖片跳轉、Fancybox功能，或者莫名其妙不能使用window.open()，將無法使用分頁檢視功能。</p>
<br>
<h1>腳本共存</h1>
<p>為了與東方永頁機共存不會造成衝突，也不需要兩邊開開關關的，整理了東方永頁機黑名單。</p>
<p>2024/02/18 01:42</p>
https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/Blacklist.txt
<h1>腳本截圖</h1>
<p>陽春簡易的圖片清單瀏覽模式，和閱讀順序由右至左的漫畫閱讀模式。實現鍵盤瀏覽漫畫，功能只求簡單實用。</p>
<br>
<img src="https://i.imgur.com/XZSEU41.jpg">
<img src="https://i.imgur.com/b9iN0X2.jpg">
<img src="https://i.imgur.com/0QQIHcI.jpg">
<img src="https://i.imgur.com/XkfwWok.jpg">
<img src="https://i.imgur.com/ToftahD.jpg">
<img src="https://i.imgur.com/xQJePAo.jpg">
<img src="https://i.imgur.com/GMsIaj9.jpg">
<img src="https://i.imgur.com/OibRD2N.jpg">
<p>※備註SPA網頁，腳本如果沒有生效請重新載入，或是先以新分頁的方式開啟鏈結。</p>
<h2>老司機類內置規則支持列表</h2>
<details>
    <summary><kbd><strong>「 點擊展開查看 」</strong></kbd></summary>
<br>
    <table>
        <thead>
            <tr>
                <th><strong>網站</strong></th>
                <th><strong>備註</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><a href="https://web.telegram.org/k//">Telegram Web</a></td>
                <td>從Telegram網頁版上的telegra.ph下載圖片，會被CentBrowser(5.0.1002.354)瀏覽器判斷為不安全封鎖下載，請自行決定是否保留檔案，從<a href="https://tgstat.com/">TGStat</a>搜索cosplay、nsfw、Cosplay鉴赏
，可以挖到不少你懂得。</td>
            </tr>
            <tr>
                <td><a href="https://xchina.biz/">小黃書</a></td>
                <td><a href="https://xchina.co/">xchina.co</a>，<a href="https://xchina.fun/">xchina.fun</a>，<a href="https://xchina.life/">xchina.life</a></td>
            </tr>
            <tr>
                <td><a href="https://8se.me/">8色人體攝影</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://w3.javsx.com/photos.html">JavSX.com</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.nlegs.com/">NLegs</a></td>
                <td><a href="https://www.honeyleg.com/">HoneyLeg</a>，<a href="https://www.ladylap.com/">Lady Lap</a>，<a href="https://www.nuyet.com/">Nuyet</a>，<a href="https://www.legbabe.com/">LegBabe</a>，請使用專用腳本載入大圖，<a href="https://greasyfork.org/scripts/463123">greasyfork.org/scripts/463123</a>，規則有手動插入模式，請在載入所有大圖後對左下圖示按右鍵或數字鍵1或8來使用</td>
            </tr>
            <tr>
                <td><a href="https://www.yalayi.com/">雅拉伊</a></td>
                <td>免VIP僅支援PC版和圖片命名是簡單數字遞增的。</td>
            </tr>
            <tr>
                <td><a href="https://yskhd.com/">优丝库HD</a></td>
                <td><a href="https://yskhd.me/">yskhd.me</a>，<a href="https://ysk567.com/">ysk567.com</a>，免VIP</td>
            </tr>
            <tr>
                <td><a href="https://luohuaxiu.com/">洛花秀</a></td>
                <td>免VIP</td>
            </tr>
            <tr>
                <td><a href="https://www.hentaiclub.net/">紳士会所</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.24fa.com/c49.aspx">24FA</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.hitxhot.org/">Hit-x-Hot</a></td>
                <td><a href="https://hitxhot.com/">Hitxhot Album Archive II</a>，同格式，<a href="https://www.kaizty.com/">www.kaizty.com</a>，<a href="https://www.depvailon.com/">www.depvailon.com</a>，<a href="https://pic.yailay.com/">pic.yailay.com</a>，<a href="https://nungvl.net/">nungvl.net</a>，<a href="https://lootiu.com/">Lootiu.Com</a>，<a href="https://depday.info/">Depday-Info</a>，<a href="https://thismore.fun/">ThisMore.Fun</a>，<a href="https://cosxuxi.club/">CosXuxi Club</a></td>
            </tr>
            <tr>
                <td><a href="https://www.xgmn06.cc/">极品性感美女</a></td>
                <td><a href="https://06.ooov.bf/">06.ooov.bf</a>，<a href="http://104.233.163.65/">104.233.163.65</a>，<a href="https://plmn5.com/">网址发布页</a></td>
            </tr>
            <tr>
                <td><a href="https://www.xrmn05.com/">秀人美女網</a></td>
                <td><a href="https://xrmn1.zzzy.bf/">xrmn1.zzzy.bf</a></td>
            </tr>
            <tr>
                <td><a href="https://www.xr07.vip/">秀人集</a></td>
                <td><a href="https://xr.uunn.bf/">xr.uunn.bf</a>，<a href="http://137.175.84.179/">137.175.84.179</a></td>
            </tr>
            <tr>
                <td><a href="https://www.ikmn05.cc/">爱看美女网</a></td>
                <td>不支持預覽版頁面</td>
            </tr>
            <tr>
                <td><a href="https://www.imn5.xyz/">爱美女网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://meirentu.cc/">美人图</a></td>
                <td><a href="https://meirentu.top/">meirentu.top</a></td>
            </tr>c
            <tr>
                <td><a href="https://www.22mm.net/">美女秀</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.2mn.cc/">秀爱美女网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.taotu8.cc/">秀套图吧</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.502x.com/xiurenwang.html">秀人图吧</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.rosi985.com/">ROSI美女写真</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.rosi211.cc/">ROSI小莉写真</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.kaka234.cc/">卡卡美女网</a></td>
                <td><a href="https://m.kaka234.cc/">m.kaka234.cc</a>，China IP限定</td>
            </tr>
            <tr>
                <td><a href="https://www.24tupian.org/">爱死美女图片站</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.24cos.org/">爱死cos美女图片站</a></td>
                <td><a href="https://www.lovecos.net/">www.lovecos.net</a>，不支持VIP資源。</td>
            </tr>
            <tr>
                <td><a href="https://ja.huamaobizhi.com/mixs/?lang=zh-CN">花猫壁纸</a></td>
                <td><a href="https://en.huamaobizhi.com/">en.huamaobizhi.com</a>，手動插入圖片，原圖沒有URL，需要POST直接取得原圖的Blob，非常吃記憶體，抓取過程需要等比較久，原圖是4K~8K的高質量圖片線上觀看會很卡，分類添加了自動翻頁。</td>
            </tr>
            <tr>
                <td><a href="https://fulitu.me/">福利图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://weme2.com/">微密猫</a></td>
                <td><a href="https://weme.su/">weme.su</a>，<a href="https://wememiao.com/">wememiao.com</a></td>
            </tr>
            <tr>
                <td><a href="https://umei.net/">优美图录</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xiutaku.com/">Xiutaku</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://kiutaku.com/">Kiutaku</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xgirl.one/">XGirl</a></td>
                <td>SPA網頁，分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://xerocos.com/">Xerocos</a></td>
                <td>SPA網頁，分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://www.v2ph.com/">微圖坊</a></td>
                <td><a href="https://www.v2ph.net/">www.v2ph.net</a>，<a href="https://www.v2ph.ru/">www.v2ph.ru</a>，<a href="https://www.v2ph.ovh/">www.v2ph.ovh</a>，需註冊，大尺度非VIP只能抓到8~10張</td>
            </tr>
            <tr>
                <td><a href="https://www.meitule.net/">美图乐</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://siwake.cc/">丝袜客</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="http://www.mfsft.com/">免费私房图</a></td>
                <td><a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/mfsft.txt">同系列網站166個</a>
                    ，發布頁，<a href="http://js.jctuk.com/dz.html">http://js.jctuk.com/dz.html</a>，
                    相似仿站，<a href="https://www.rosi8.net/">www.rosi8.net</a>，<a href="https://www.sfjpg.com/">www.sfjpg.com</a>，<a href="https://www.sfjpg.net/">www.sfjpg.net</a>，<a href="https://www.kanmeitu.net/">www.kanmeitu.net</a>，<a href="https://kanmeitu1.cc/">kanmeitu1.cc</a>
                </td>
            </tr>
            <tr>
                <td><a href="https://www.06se.com/">六色美图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://girlsteam.club/">女神部落</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.mfpho.com/">柔丝映画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.haotuwu.com/">好圖屋</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://dongti.blog.2nt.com/">胴体的诱惑</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.446m.com/">萌图社</a></td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td><a href="https://www.inini.win/">爱若传媒映画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.jk.rs/">日式JK</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://baoruba.com/">私图网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://tukuku.cc/">图库库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://coscoser.com/">coscoser</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.umeitu.com/">尤美图库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.zhaotaotu.cc/">找套图</a></td>
                <td><a href="https://www.zhaotaotu.one/">zhaotaotu.one</a>，<a href="https://kantaotu.cc/">Xiuno BBS</a></td>
            </tr>
            <tr>
                <td><a href="https://www.douhua520.com/">豆花520</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.meituku.org/">美图库</a></td>
                <td>China IP限定</td>
            </tr>
            <tr>
                <td><a href="https://www.tuzac.com/">图宅网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.kkc3.com/">咔咔西三</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.youfreex.com/">YouFreeX</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.qixianzi.com/">七仙子图片</a></td>
                <td><a href="https://www.qixianzi.com/e/wap/">www.qixianzi.com/e/wap/</a></td>
            </tr>
            <tr>
                <td><a href="https://heysexgirl.com/">嘿～色女孩</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://www.cos6.net/">绅士猫</a></td>
                <td>需註冊登錄</td>
            </tr>
            <tr>
                <td><a href="https://paopoi.com/">泡泡</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://sesew.top/">涩涩乐园</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.costhisfox.com/">扮之狐狸</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.xwbar.com/web/meinv/">新闻吧</a></td>
                <td><a href="https://www.dv67.com/web/meinv/">新娱乐在线</a>，<a href="https://www.fjrx.org/web/meinv/">福建热线</a>，<a href="https://www.sdrx.org/web/meinv/">山东热线</a>，<a href="https://www.gxrx.org/web/meinv/">广西热线</a>，<a href="https://www.whrx.org/web/meinv/">武汉热线</a>，<a href="http://www.tjrx.org/web/meinv/">天津热线</a>，<a href="https://www.ynrx.org/web/meinv/">云南热线</a>，<a href="https://www.gsrx.org/web/meinv/">甘肃热线</a>，封鎖部分地區，需要VPN才看的到圖片</td>
            </tr>
            <tr>
                <td><a href="https://www.shzx.org/b/12-0.html">四海资讯</a></td>
                <td><a href="https://www.yuleba.org/b/10-0.html">娱乐吧</a>，封鎖部分地區，需要VPN</td>
            </tr>
            <tr>
                <td><a href="https://www.nvhai8.com/">女人吧</a></td>
                <td><a href="https://m.nvhai8.com/">m.nvhai8.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.jkforum.net/">JKF</a></td>
                <td>貼圖區</td>
            </tr>
            <tr>
                <td><a href="https://www.t66y.com/">草榴</a></td>
                <td>貼圖區</td>
            </tr>
            <tr>
                <td><a href="https://www.cool18.com/">留园酷</a></td>
                <td>貼圖區</td>
            </tr>
            <tr>
                <td><a href="https://xbbs.me/forum/id-61fe70f2b9631.html">X成人论坛</a></td>
                <td>貼圖區</td>
            </tr>
            <tr>
                <td><a href="http://51sex.vip/">51sex</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://www.2meinv.com/">爱美女</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.xinmeitulu.com/">新美图录</a></td>
                <td><a href="https://www.twlegs.com/">臺灣美腿女郎</a></td>
            </tr>
            <tr>
                <td><a href="https://meitulu.me/">美图录</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.tujigu.top/">爱图集谷</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.xiuwo.net/">秀窝</a></td>
                <td><a href="https://rmm8.com/">RMM吧</a>，<a href="https://www.zanmm.com/">赞MM</a>，<a href="https://www.entuji.com/">恩图集</a>，<a href="https://www.mhgirl.com/">美Girl图集</a>，<a href="https://www.hutu6.com/">狐图网</a>，<a href="https://www.930tu.com/">930圖片網</a></td>
            </tr>
            <tr>
                <td><a href="https://www.xsnvshen.co/">秀色女神</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.kongquehai.net/">孔雀海</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.lolili.net/">洛丽网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://legskr.com/">iLegs时光印象网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xiurenwang.me/">秀人网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://8ezy.com/?s=">8E资源站</a></td>
                <td>有反擋廣告套件機制會清空網頁內容，需加入擋廣告白名單。</td>
            </tr>
            <tr>
                <td><a href="https://www.aixiurentu.com/">秀人图</a></td>
                <td>只支援免費</td>
            </tr>
            <tr>
                <td><a href="https://tu928.com/">tu928美女写真网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xiaojiejie.me/">小姐姐么</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://coserlab.io/">Coser Lab</a></td>
                <td>4K~8K高解析</td>
            </tr>
            <tr>
                <td><a href="https://www.loxiu.com/">洛秀网</a></td>
                <td><a href="https://www.counv.com/">维秘秀</a></td>
            </tr>
            <tr>
                <td><a href="https://bisipic.xyz/">比思在線圖庫</a></td>
                <td><a href="https://bisipic.online/">bisipic.online</a></td>
            </tr>
            <tr>
                <td><a href="https://m888.top/">女神网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.uyn8.cn/">牛牛美图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.meimeimei.org/">美妹妹</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://aitu.men/">爱图门</a></td>
                <td><a href="https://jaoren.com/">佼人馆</a></td>
            </tr>
            <tr>
                <td><a href="https://nsphb.com/">女神排行榜</a></td>
            </tr>
            <tr>
                <td><a href="https://nanrenhome.cc/category/nanrenzhijia/fulimeitu">男人之家</a></td>
                <td><a href="https://nrzj.link/">nrzj.link</a></td>
            </tr>
            <tr>
                <td><a href="https://www.2wh.net/meinvxiezhenjigou">网红跟我俩</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://niuniuhome.club/">妞妞之家</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://www.beautyleg6.com/index.html">BeautyLeg</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://kenshin.hk/category/jnews/photoalbum/">劍心回憶</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.ikanins.com/">爱看 INS</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.dmmtu.com/">Dmmtu 美女图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://zipaipic.com/">自拍图库</a></td>
                <td>自拍图库.com</td>
            </tr>
            <tr>
                <td><a href="https://7aipai.com/">美拍 - 我自拍</a></td>
                <td><a href="https://35zipai.com/">35zipai.com</a></td>
            </tr>
            <tr>
                <td><a href="https://taotu.org/">套圖TAOTU.ORG</a></td>
                <td><a href="https://taotu.org/m/">taotu.org/m/</a></td>
            </tr>
            <tr>
                <td><a href="https://www.95mm.vip/">MM 范</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.meitu131.com/meinv/">MEITU131</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.niutu114.com/meinv/">牛图114图库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.tuiimg.com/">推图网</a></td>
                <td>網站更新沒有美女圖了</td>
            </tr>
            <tr>
                <td><a href="https://tupianwu.com/">图片屋</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://www.qq7k.com/mntp/">晴空头像图库</a></td>
                <td><a href="https://m.qq7k.com/mntp/">m.qq7k.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.hexieshe.cn/">和邪社</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.mmonly.cc/mmtp/">唯一图库</a></td>
                <td><a href="https://m.mmonly.cc/mmtp/">m.mmonly.cc</a></td>
            </tr>
            <tr>
                <td><a href="https://pic.yesky.com/">天极图片</a></td>
                <td><a href="https://wap.yesky.com/pic/">wap.yesky.com</a></td>
            </tr>
            <tr>
                <td><a href="http://www.xxiav.com/">XXIAV寫真館</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://18av.mm-cg.com/zh/cg_random/all/index.html">18AV</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://taotuhome.com/">套图之家</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.shunvi.com/">淑女爱</a></td>
                <td>www.shunvai.com</td>
            </tr>
            <tr>
                <td><a href="https://www.meijuntu.com/">俊美图</a></td>
                <td>www.jeya.de</td>
            </tr>
            <tr>
                <td><a href="https://mt316.com/">妹子图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.888meinv.com/">888美女网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://diskgirl.com/imageslist">硬盘少女</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.wai77.com/">心动美图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.meinvku.org.cn/">美女库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.mm5mm5.com/">MM5MM5美女图片</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.eemm.cc/">依依图片网</a></td>
                <td>www.jxmm.net</td>
            </tr>
            <tr>
                <td><a href="https://www.nitutu.com/meinvtupian/">妮兔美图</a></td>
                <td><a href="https://m.nitutu.com/meinvtupian/">m.nitutu.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.xintp.com/meinv/">犀牛图片网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.neihantu.net/zhainannvshen/">内涵吧</a></td>
                <td><a href="https://wap.neihantu.net/zhainannvshen/">wap.neihantu.net</a></td>
            </tr>
            <tr>
                <td><a href="https://jrants.com/">青年美圖</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://trendszine.com/">風流雜誌</a></td>
                <td><a href="https://www.tiplogo.com/">泰撲美圖</a>，<a href="https://cosblay.com/">CosBlay</a></td>
            </tr>
            <tr>
                <td><a href="https://xx.knit.bid/">爱妹子</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://inewgirl.com/">女神社</a></td>
                <td><a href="https://nshens.com/">nshens.com</a>，<a href="https://lovens.cc/">lovens.cc</a>，VIP限定的沒有VIP帳號只會重複抓到第一頁的圖片</td>
            </tr>
            <tr>
                <td><a href="https://chottie.com/blog/">Chottie</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://ijjiao.com/people">街角图片社</a></td>
                <td>需透過微信公眾號取得密碼登錄</td>
            </tr>
            <tr>
                <td><a href="https://www.evacg.org/">E次元</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://ciyuandao.com/photo">次元岛</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://dimtown.com/cosplay">次元小镇</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.mtutuu.com/">萌次元</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://pic.3loumao.org/">3楼猫图库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.emonl.com/">柠檬皮</a></td>
                <td><a href="https://www.cybesx.com/">www.cybesx.com</a></td>
            </tr>
            <tr>
                <td><a href="https://pipidm.top/">皮皮动漫社</a></td>
                <td>www.pipidm.top</td>
            </tr>
            <tr>
                <td><a href="https://www.bbsacgn.com/">ACGN小鎮</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.acgers.com/list/list">ACG宅吧</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://x6o.com/topics/14#articles">x6o</a></td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td><a href="https://www.dongojyousan.com/">dongojyousan.com</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://sexygirl.cc/">SexyGirl</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cangcuc.com/">Căng Cực</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://kenh69.co/">Kenh69</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://phym18.one/tag/%E1%BA%A3nh-sex">Phym18</a></td>
                <td>圖片分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://bongda21h.me/anh-hot/">Bongda21h</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://fliporn.biz/sexual-picture">Fliporn</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.mmav.me/photo/">萌妹社区</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.madoucun.com/arttype/57.html">麻豆村</a></td>
                <td><a href="https://www.mamamcn.com/arttype/57.html">麻麻传媒</a>，<a href="https://www.tangxvlog.com/arttype/57.html">糖心vlog</a>，<a href="https://www.guodongmcn.com/arttype/57.html">果冻传媒</a>，<a href="https://www.mrrabbit.org/arttype/57.html">兔子先生</a>，<a href="https://www.xvideo.bar/arttype/57.html">中国X站</a>，<a href="https://www.proncn.com/arttype/57.html">中国P站</a>，<a href="https://www.proncn.com/arttype/57.html">麻豆101</a></td>
            </tr>
            <tr>
                <td><a href="https://www.91tulu.com/">91图录</a></td>
                <td><a href="https://cn.w55.tv/">cn.w55.tv</a></td>
            </tr>
            <tr>
                <td><a href="https://books.xxgirls.vip/">淫淫小说写真馆</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://jingunav.info/index.php/arttype/109.html">人妻租借所</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xxk222.com/arttype/meinv.html">男人社区</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://torontolove.cc/">多伦多情色</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://534798.xyz/">性趣套图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.28tyu.com/">苍井优图片</a></td>
                <td><a href="https://www.28wer.com/">www.28wer.com</a>，<a href="https://sldlxz.com/">sldlxz.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.photos18.com/">色情圖片網</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://17sex.vip/list/4858">趣事館</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://yazhouseba.com/meinv/">亚洲色吧</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.1000yishu.com/">1000艺术摄影</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.169tp.com/">169图片大全</a></td>
                <td><a href="https://www.169tp.com/xingganmeinv/">性感</a>，<a href="https://www.169tp.com/wangyouzipai/">自拍</a>，<a href="https://www.169tp.com/gaogensiwa/">丝袜</a>，<a href="https://www.169tp.com/rentiyishu/">人体</a>，<a href="https://www.169tp.com/xiyangmeinv//">西洋</a>，<a href="https://www.169tp.com/guoneimeinv/">国内</a></td>
            </tr>
            <tr>
                <td><a href="https://k55.net/arttype/2.html">K55</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cav103.com/albums/">GavPorn相冊</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://avjb.com/albums/">AVJB</a></td>
                <td><a href="https://avjb.github.io/">網址發佈頁1</a>，<a href="https://bitbucket.org/free890722/avjb/src/master/README.md">網址發佈頁2</a></td>
            </tr>
            <tr>
                <td><a href="https://theavporn.com/albums/">The AV Porn</a></td>
                <td><a href="https://theavporn.github.io/theavporn/">網址發佈頁</a></td>
            </tr>
            <tr>
                <td><a href="https://dev.avjb.com/albums/">爱微社区</a></td>
                <td>成人相册添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://www.qinimg.com/">Qinimg</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.yeitu.com/meinv/">亿图全景图库</a></td>
                <td><a href="https://www.yeitu.com/dongman/cosplay/">COSPLAY</a>，<a href="https://m.yeitu.com/">m.yeitu.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.umei.cc/meinvtupian/">优美图库</a></td>
                <td><a href="https://wap.umei.cc/">wap.umei.cc</a>，China IP限定</td>
            </tr>
            <tr>
                <td><a href="https://www.win3000.com/tags/xingganmeinv/">三千图片网</a></td>
                <td><a href="https://m.win3000.com/tags/xingganmeinv/">m.win3000.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.3gbizhi.com/meinv">3G壁纸</a></td>
                <td><a href="https://m.3gbizhi.com/">m.3gbizhi.com</a>，China IP限定</td>
            </tr>
            <tr>
                <td><a href="https://www.mn52.com/xingganmeinv/">mn52图库</a></td>
                <td><a href="https://wap.mn52.com/meihuoxiezhen/">wap.mn52.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.enterdesk.com/">回车桌面</a></td>
                <td><a href="https://m.enterdesk.com/">m.enterdesk.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.keaitupian.com/">可爱小图</a></td>
                <td><a href="https://m.keaitupian.com/">m.keaitupian.com</a></td>
            </tr>
            <tr>
                <td><a href="https://xiuren.biz/">Xiuren</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://misskon.com/">MissKON.com</a></td>
                <td><a href="https://mrcong.com/">MrCong</a>，完整無修正的圖片需要下載，聚集的只是預覽圖</td>
            </tr>
            <tr>
                <td><a href="https://hotgirl.asia/">HotAsiaGirl</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.hotgirl2024.com/">HotGirl World</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://www.4khd.com/">4KHD</a></td>
                <td><a href="https://fxcc.cc/">二級域名導航</a></td>
            </tr>
            <tr>
                <td><a href="https://asianpink.net/">AsianPink</a></td>
                <td>高解析原圖需要下載，聚集的只是預覽圖</td>
            </tr>
            <tr>
                <td><a href="https://4kup.net/">4KUP</a></td>
                <td>高解析原圖需要下載，聚集的只是預覽圖</td>
            </tr>
            <tr>
                <td><a href="https://imgasd.com/">Imgasd</a></td>
                <td>預覽圖只給10張，完整需要下載。</td>
            </tr>
            <tr>
                <td><a href="https://blog.baobua.net/mlem">BAOBUA.COM</a></td>
                <td><a href="https://baobua.com/">baobua.com</a>，<a href="https://fb.baobua.net/">fb.baobua.net</a>，<a href="https://vn.baobua.net/">vn.baobua.net</a>，<a href="https://www.baobua.net/">www.baobua.net</a></td>
            </tr>
            <tr>
                <td><a href="https://www.pixibb.com/?list=albums&sort=views_desc&page=1">PixiBB</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.coszip.com/">COSPLAY ZIP</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cosporn.online/">萝莉少女</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://redbust.com/">RedBust</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://sxchinesegirlz01.xyz/">Chinese Beauties</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cherryfans.cc/">Cherryfans</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://asiantolick.com/page/news">Asian To Lick</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.modelsvibe.com/">Models Vibe</a></td>
                <td>分類添加了自動翻頁功能</td>
            </tr>
            <tr>
                <td><a href="https://www.asianude4u.net/">Asianude4u</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://jablehk.com/">Jablehk</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://fapello.com/">Fapello</a></td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td><a href="https://fapachi.com/">Fapachi</a></td>
                <td>手動插入圖片</td>
            </tr>
            <tr>
                <td><a href="https://fanleaks.club/">Fan Leaks</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://tangmoc.com/">TangMoc</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://tuyetnhan.com/">☆ Ảnh đẹp ☆</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.hotgirlpix.com/">Hot Girl Pix</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.sexyasiangirl.xyz/">SexyAsianGirl</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://youwu.pics/">尤物丧志</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://hotasianx.com/">HotAsianX</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://setu.pics/">色图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://meitu.neocities.org/">美图</a></td>
                <td>很多posts都404...</td>
            </tr>
            <tr>
                <td><a href="https://fuligirl.top/">福利姬美图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.fastingsex.com/">Fasting Sex</a></td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td><a href="https://sharecosplay.com/">Share Cosplay</a></td>
                <td>高解析原圖需要下載，聚集的只是預覽圖，分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://nudebird.biz/">Nude Bird</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://nudecosplay.biz/">Nude Cosplay</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://nudecosplaygirls.com/category/nude-cosplay-albums/">NUDECOSPLAY</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cosplaytele.com/">Cosplaytele</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.simply-porn.com/galleries">Simply Porn</a></td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td><a href="https://www.simply-cosplay.com/galleries/new">Simply Cosplay</a></td>
                <td>SPA網頁，只支持galleries類別。</td>
            </tr>
            <tr>
                <td><a href="https://cosplayporn.online/category/cosplay/">Cosplay Porn</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://asiaon.top/">AsiaOnTop</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://mitaku.net/">Mitaku</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://nudeslegion.com/">Nudeslegion</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cosplayworld.net/">Cosplay World</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://buondua.com/">Buon Dua</a></td>
                <td><a href="https://buondua.us/">buondua.us</a></td>
            </tr>
            <tr>
                <td><a href="https://hotgirl.biz/">Hotgirl.biz</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://asupanpenyegar.com/">AsupanPenyegar</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xlust.org/">XLUST.ORG</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://byoru.net/">Byoru</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cgcosplay.org/">CG Cosplay</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xcosplay.top/">X Cosplay</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://hotgirlchina.com/">HOTGIRLchina</a></td>
                <td><a href="https://nudeasiangirl.com/">Nude Asian Girl</a>，<a href="https://cutexinh.com/">CuteXinh</a>，<a href="https://girlxinhxinh.com/">Girl Xinh Xinh</a>，<a href="https://asiaceleb.com/">Asia Celebrity</a>，<a href="https://chinagirly.com/">China Girly</a>，<a href="https://babeasia.com/">Babe Asia</a>，<a href="https://nudeasiangirl.com/">Hot Nude Asian Girls</a>，<a href="https://hinhsexvietnam.com/">Hình Sex Việt Nam</a></td>
            </tr>
            <tr>
                <td><a href="https://foamgirl.net/">FoamGirl</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://photo.camcam.cc/">photo.camcam.cc</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://everia.club/">Everia.club</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.everiaclub.com/">Everia club</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.ilovexs.com/">NongMo.Zone</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://idol.gravureprincess.date/">idol.gravureprincess.date</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.micmicidol.club/">MIC MIC IDOL</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://gravurezasshi9.doorblog.jp/">グラビア週刊誌 9</a></td>
                <td><a href="https://magazinejapanese5.blog.jp/">グラビア週刊誌 5</a>，<a href="https://magazinejapanese6.blog.jp/">グラビア週刊誌 6</a>，分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://gravureidols.top/">Gravure Idols</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://gravia.site/box/gate.php">Gravia</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://eroyakuba.com/">エロ役場</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://geinou-nude.com/">エロ画像まとめ</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://janidolig.com/">JANidolig</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://reprint-kh.com/">復刻書林</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://amazon-love.com/">Love Asian Babes</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://mabui-onna.com/">マブい女画像集</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://ivphoto.tistory.com/">IVPhoto_Gravure</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://goddess247.com/">goddess247</a></td>
                <td><a href="https://bestprettygirl.com/">bestprettygirl</a></td>
            </tr>
            <tr>
                <td><a href="https://bestgirlsexy.com/">BestGirlSexy</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.eyval.net/">eyval.net</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://kkoreaactor.blogspot.com/">움짤저장소 KPOP GIRLGROUPS ACTOR</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://m.phimvuspot.com/">PhimVu</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://chinesenudeart.blogspot.com/">Chinese Nude Art Photos</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cutegirlsaddict.blogspot.com/">CUTE GIRLS ADDICT</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://kemono.su/fantia/user/17148">Kemono</a></td>
                <td><a href="https://coomer.su/">coomer.su</a></td>
            </tr>
            <tr>
                <td><a href="https://hentai-img.com/">Hentai Image</a></td>
                <td><a href="https://hentai-cosplays.com/">hentai-cosplays.com</a>，<a href="https://porn-images-xxx.com/">porn-images-xxx.com</a>，<a href="https://porn-gravure-idol.com/">porn-gravure-idol.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.hentaicos.com/">Hentai Cosplay</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.eporner.com/pics/">EPORNER</a></td>
                <td><a href="https://www.eporner.com/profile/namaiki/uploaded-pics/">namaiki</a>，<a href="https://www.eporner.com/profile/trevor221/uploaded-pics//">trevor221</a></td>
            </tr>
            <tr>
                <td><a href="https://www.xasiat.com/albums/">Xasiat</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://asianporn.li/photos/">Asian Porn</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://erotic.pics/">Erotic Pics</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://xhamster.com/photos">xHamster</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.luscious.net/porn/cosplay-22/">Luscious</a></td>
                <td>SPA網頁，手動插入圖片。</td>
            </tr>
            <tr>
                <td><a href="https://www.imagefap.com/">ImageFap</a></td>
                <td>只支援PC版</td>
            </tr>
            <tr>
                <td><a href="https://zzup.com/user-album/3338/petmer/index.html">ZzUp.Com</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://girlsreleased.com/">GirlsReleased</a></td>
                <td>圖床imgadult無法外連，但可以下載。</td>
            </tr>
            <tr>
                <td><a href="https://urlgalleries.net/">URLGalleries</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://nsfwalbum.com/">NSFWalbum</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://eropics.to/">Eropics</a></td>
                <td>手動插入圖片，有少數日、韓系套圖，vipr.im,Imagetwist.com圖床大多無法外連，但應該可以透過腳本下載，imagebam圖床需要先點開一個鏈結點擊Continue to your image後XHR才能抓到圖片。</td>
            </tr>
            <tr>
                <td><a href="https://imx.to/">imx.to</a></td>
                <td>輔助點擊，能在gallery頁進行下載。</td>
            </tr>
            <tr>
                <td><a href="https://thotsbay.tv/">Thotsbay</a></td>
                <td><a href="https://hotleak.vip/">Hotleak</a>，手動插入圖片</td>
            </tr>
            <tr>
                <td><a href="https://www.wikifeet.com/">wikiFeet</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://goodsexporn.org/">Good Sex Porn</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://r18hub.com/photos">R18hub</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://bitchesgirls.com/">BITCHES GIRLS</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cn.pornhub.com/albums">PornHub</a></td>
                <td>很容易被短暫封IP...</td>
            </tr>
            <tr>
                <td><a href="https://bunkr-albums.io/">Bunkr</a></td>
                <td>列表添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://www.erome.com/">EroMe</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://mrdeepfakes.com/photos">MrDeepFakes</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.tokyomotion.net/albums">TOKYO Motion</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.javbangers.com/albums/">JavBangers</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.elitebabes.com/">Elite Babes</a></td>
                <td>同格式，<a href="https://pmatehunter.com/">pmatehunter.com</a>，<a href="https://www.jperotica.com/">www.jperotica.com</a>，<a href="https://www.metarthunter.com/">www.metarthunter.com</a>，<a href="https://www.femjoyhunter.com/">www.femjoyhunter.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.freexcafe.com/">FreeXcafe</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://dirtychicks.net/photo-gallery/">DirtyChicks</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://amateurlikes.com/">Amateur Likes</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.pornpics.com/jp/">Porn Pics</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://hdpornpictures.net/">HD Porn Pictures</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.hotzxgirl.com/">Hot Sex Picture</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.freebigtitpornpics.com/japanese-big-tits/">Freebigtit</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.pichunter.com/">PicHunter</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.pictoa.com">Pictoa</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://pimpandhost.com/site/trending">PimpAndHost</a></td>
                <td>相簿</td>
            </tr>
            <tr>
                <td><a href="https://www.pornpaw.com/">Pornpaw</a></td>
                <td>圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="https://fuskator.com/">Fuskator</a></td>
                <td>圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="https://www.fapator.com/">Fapator</a></td>
                <td>圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="https://sexygirlspics.com/">SexyGirlsPics</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.smutpond.com/">SMUTPOND</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://showgirlx.net/">ShowGirlx</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://app.degoo.com/">Degoo Cloud</a></td>
                <td>輔助ShowGirlx使用的圖床，先手動點開第一張預覽縮圖，展開第一張大圖後，按0輸入標題輸入圖片數量，等待抓取完畢。</td>
            </tr>
            <tr>
                <td><a href="https://www.pornpic.com/">PornPic</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.nudedxxx.com/">Nuded Photo</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://2lsp.xyz/">2LSP</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.guixiu.org/">闺秀网</a></td>
                <td><a href="https://guixiu.org/">guixiu.org</a></td>
            </tr>
            <tr>
                <td><a href="https://nicegirl4u.cyou/">NICEGIRL4U</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://ycyweb.cloudapp.net/">三界异次元</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.lianjiajr.net/">好视角</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://meitu.knit.bid/">美图网</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://portrait.knit.bid/">美女写真</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.yyzhenshun.com/">YY美女图片</a></td>
                <td><a href="https://www.mmdabaobei.com/">美眉大宝贝</a>，很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="http://www.ikmt.net/">爱看美图网</a></td>
                <td><a href="http://m.ikmt.net/">m.ikmt.net</a>，很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.taotucc.com/">Taotuxp.com</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://xgirlscollection.com/">Xgirls</a></td>
                <td><a href="https://www.img3xgirls.com/">www.img3xgirls.com</a>，很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.nvshen5.com/">好女神网</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.6evu.com/">遛无写真</a></td>
                <td><a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/6evu.txt">同格式18個</a></td>
            </tr>
            <tr>
                <td><a href="https://www.ywsq.cc/">出物社区写真网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.tu11.com/">亿秀美女</a></td>
                <td><a href="https://m.itu11.com/">m.itu11.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.tzala.com/">桃子啦</a></td>
                <td><a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/tu01.txt">同格式126個</a></td>
            </tr>
            <tr>
                <td><a href="https://www.wind5.com/">万德美图屋</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://mm.tvv.tw/">妹妹图</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="http://www.xiuren.org/">Xiuren 秀人网</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="http://www.mm1311.net/">MM1311</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="http://www.win4000.com/meitu.html">美桌</a></td>
                <td>感覺沒在更新圖了</td>
            </tr>
            <tr>
                <td><a href="https://old.buzzav.com/albums">Buzzav</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://multi.xnxx.com/">multi.xnxx.com</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://kawaiix.com/">KawaiiX</a></td>
                <td><a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/Sexyxbody.txt">另同系列網站96個</a></td>
            </tr>
            <tr>
                <td><a href="https://gogortrt.com/">gogo人体艺术</a></td>
                <td><a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/gogort.txt">另同系列網站57個</a></td>
            </tr>
            <tr>
                <td><a href="https://dbro.news/category/p0-%e5%a5%97%e5%9c%96%e7%b3%bb%e5%88%97">D哥新聞</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://jo106.com/beauty-photo/">流量密碼</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://nick20.com/pic/index.html">尼克成人網</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://diedk1123-ake33i.xofulitu2za222.sbs/xoxo">XO福利圖</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://www.momotk.com/">MOMO图库</a></td>
                <td><a href="https://www.rb1.es/momotk/">跳轉頁</a></td>
            </tr>
            <tr>
                <td><a href="https://www.wc1.es/">魅影画廊</a></td>
                <td><a href="https://wc2.es/myhl">跳轉頁</a></td>
            </tr>
            <tr>
                <td><a href="https://151.lat/">色色葫芦</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.sstuku13.xyz/aa61/?shouye">色色图库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.112ze.com/">美女写真图集</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://18cute.monster/">18少女团</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://18jjj.cyou/">聚姬集</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://adultspic.com/">adultspic色情成人圖片</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.fulitu.cc/">福利兔</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.cnjiepai.xyz/all.html">中国街拍</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://ai19.art/">Ai19 Art</a></td>
                <td><a href="https://ainudesporn.art/">Ai art nude</a>，<a href="https://hentaimama.xyz/">Hentaimama</a></td>
            </tr>
            <tr>
                <td><a href="https://kungfutv.net/">Kungfutv</a></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</details>
<h2>H漫類內置規則支持列表</h2>
<details>
    <summary><kbd><strong>「 點擊展開查看 」</strong></kbd></summary>
<br>
    <table>
        <thead>
            <tr>
                <th><strong>網站</strong></th>
                <th><strong>備註</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><a href="https://e-hentai.org/">E-Hentai</a></td>
                <td>作用在圖片清單頁，手動插入大圖減少消耗配額，可透過腳本管理器選單選擇是否載入原圖鏈結，<a href="https://exhentai.org/">exhentai.org</a>，<a href="https://e-hentai.org/lofi/">https://e-hentai.org/lofi/</a>，圖片下載錯誤率極高，不建議使用本腳本下載。</td>
            </tr>
            <tr>
                <td><a href="https://nhentai.net/">nhentai</a></td>
                <td>作用在圖片清單頁，<a href="https://nyahentai.red/">nyahentai.red</a>，<a href="https://www.hentai.name/">www.hentai.name</a>，<a href="https://nhentai.xxx/">nhentai.xxx</a>，<a href="https://nhentai.to/">nhentai.to</a>，<a href="https://simplyhentai.org/">simplyhentai.org</a>，<a href="https://simplyhentai.red/">simplyhentai.red</a>
                </td>
            </tr>
            <tr>
                <td><a href="https://akuma.moe/">akuma.moe</a></td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="https://anchira.to/">Anchira</a></td>
                <td>SPA網頁，作用在圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="https://cathentai.net/">Cathentai</a></td>
                <td>作用在List Read頁，<a href="https://hentaibeeg.com/">hentaibeeg.com</a>，<a href="https://hentaicolor.net/">hentaicolor.net</a>，<a href="https://nyahentai.info/">nyahentai.info</a></td>
            </tr>
            <tr>
                <td><a href="https://hanime1.me/comics">Hanime1</a></td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="https://ch.hentai-one.com/">Hentai-One</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://hentaifox.com/">HentaiFox</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://3hentai.net/">3hentai</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://www.simply-hentai.com/">Simply Hentai</a></td>
                <td>同上，SPA網頁</td>
            </tr>
            <tr>
                <td><a href="https://doujins.com/">Doujins</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://hentaipaw.com/">HentaiPaw</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://hentaihand.com/en/latest">HentaiHand</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://www.tsumino.com/">TSUMINO</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="http://imhentai.xxx/">IMHentai</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://myhentaigallery.com/">My Hentai Gallery</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://xyzcomics.com/">XYZ PORN COMICS</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://nhentai.com/xxx">nhentai.com</a></td>
                <td><a href="https://hentaihand.com/xxx">hentaihand.com</a>，作用在閱讀頁，SPA網頁</td>
            </tr>
            <tr>
                <td><a href="https://hentai2read.com/">Hentai2Read</a></td>
                <td>作用在閱讀頁</td>
            </tr>
            <tr>
                <td><a href="https://pururin.to/">Pururin</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://9hentai.to/">9hentai</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://asmhentai.com/">AsmHentai</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://multporn.net/">MultPorn</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://hentaihere.com/">HentaiHere</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://kingcomix.com/">KingComiX</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://lhentai.com/">lHentai</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://tmohentai.com/">TMOHentai</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://hitomi.la/">Hitomi.la</a></td>
                <td>同上</td>
            </tr>
            <tr>
                <td><a href="https://hdporncomics.com/">HDpornComics</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xlecx.one/">XlecX</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://hentaipal.com/">HentaiPal.com</a></td>
                <td>分類添加了自動翻頁</td>
            </tr>
            <tr>
                <td><a href="https://hentaiporns.net/">HentaiPorns</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://comics.8muses.com/">8muses</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://allporncomic.com/">AllPornComic</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://rokuhentai.com/">Roku Hentai</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://hachirumi.com/">Hachirumi.com</a></td>
                <td>SPA網頁，在閱讀頁不分章節取得所有圖片</td>
            </tr>
            <tr>
                <td><a href="https://hentai.bang14.com/">Hentai.bang14.com</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://18kami.com/">18Kami.com</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://18p.fun/">開車漫畫</a></td>
                <td>只是閱讀請使用東方永頁機，下載操作，需書幣購買的先購買好，第一章閱讀頁按1先跳轉為18p.fun，再按1開始聚圖從頭一路翻到尾，按0下載，標題需手動輸入</td>
            </tr>
            <tr>
                <td><a href="https://18comic.vip/">禁漫天堂</a></td>
                <td>手動插入圖片，由於需要重新繪製還原被分割的圖片，過程中CPU會全速運轉。<a href="https://jmcmomic.github.io/">禁漫天堂發布頁</a></td>
            </tr>
            <tr>
                <td><a href="https://www.nicohentai.com/">逆次元逆ACG</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.wnacg.com/">紳士漫畫</a></td>
                <td>作用在圖片清單、下拉閱讀頁，<a href="http://www.hentaicomic.ru/">www.hentaicomic.ru</a>，<a href="https://wnacg01.org/">紳士漫畫地址發布頁</a></td>
            </tr>
            <tr>
                <td><a href="https://ahri8.top/">松鼠症倉庫</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://caitlin.top/">Caitlin.top</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.apexmh.com/">頂點漫畫</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.vnacg.com/">VN漫画网</a></td>
                <td><a href="https://m.vnacg.com/">m.vnacg.com</a>，作用在下拉閱讀頁</td>
            </tr>
            <tr>
                <td><a href="https://7mmtv.sx/zh/hcomic_random/all/index.html">7mmtv</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://18h.mm-cg.com/">18H</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://h-ciyuan.com/category/%e6%bc%ab%e7%94%bb/">H次元</a></td>
                <td>大圖在清單後面</td>
            </tr>
            <tr>
                <td><a href="https://www.yinmh.com/">淫漫画</a></td>
                <td><a href="https://www.yinmh.top/">www.yinmh.top</a>，<a href="https://www.yinmh.xyz/">www.yinmh.xyz</a></td>
            </tr>
            <tr>
                <td><a href="https://www.comicun.com/">漫畫聯合國</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.manhuache.com/">漫畫車</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://litu100.xyz/">丽图·污漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://91manwu.com/vodtype/4.html">91漫屋</a></td>
                <td><a href="https://yumanse.com/">欲漫涩</a>，<a href="https://fumanwu.org/">腐漫屋</a></td>
            </tr>
            <tr>
                <td><a href="https://www.jjmhw.cc/">久久漫画网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.ikanmh.xyz/">韩国污漫画</a></td>
                <td>網址發布頁：<a href="http://www.hmfby.com/">www.hmfby.com</a>，<a href="http://web.hmfby.com/">web.hmfby.com</a></td>
            </tr>
            <tr>
                <td><a href="https://avbebe.com/archives/category/%e6%88%90%e4%ba%bah%e6%bc%ab%e7%95%ab">Avbebe</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.acgomh.com/">ACG漫画网</a></td>
                <td><a href="https://www.porn-comic.com/">www.porn-comic.com</a>，<a href="https://www.cool-manga.com/">www.cool-manga.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.acgnbus.com/">ACG漫画网</a></td>
                <td>Mobile限定</td>
            </tr>
            <tr>
                <td><a href="https://twhentai.com/">TWHentai</a></td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="https://mttang.club/">台灣成人H漫</a></td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="http://hentai.desi/">十八禁成人H漫</a></td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="http://www.177pica.com/">177漫画</a></td>
                <td><a href="http://www.177picyy.com/">www.177picyy.com</a></td>
            </tr>
            <tr>
                <td><a href="https://yousemanhua.com/">有色漫画网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.91jinman.com/">91禁漫</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xn--wgv69rba1382b.com/">漫香阁</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://boylove.cc/">香香腐宅</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://yidan.in/">一耽女孩</a></td>
                <td>SPA網頁，限定Mobile</td>
            </tr>
            <tr>
                <td><a href="https://www.sesemanhua.com/">色色漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://mobile.jymhapp.com/">九妖漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://rimanzhijia.com/">日漫之家</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://se8.us/">韩漫库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://nnhanman.net/">鸟鸟韩漫</a></td>
                <td>寫真請點開第一章，直接翻到底。</td>
            </tr>
            <tr>
                <td><a href="https://www.roumanhua.com/">肉漫画网</a></td>
                <td><a href="https://m.roumanhua.net/">m.roumanhua.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.xinhanman.com/">最新韩漫网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://hanman100.com/">韩漫100</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.hanmanmianfei.com/">免费韩漫看</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.hanmantuijian.com/">韩漫推荐</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://18jin.top/">韓漫天堂</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://aicomic.org/">爱漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.diyihm.com/">日韩漫画</a></td>
                <td><a href="https://www.lltoon.com/">www.lltoon.com</a>，<a href="https://www.rrtoon.com/">www.rrtoon.com</a></td>
            </tr>
            <tr>
                <td><a href="https://wwtoon.com/">歪歪漫画</a></td>
                <td><a href="https://www.zztoon.com/">www.zztoon.com</a>，<a href="https://www.vvtoon.com/">www.vvtoon.com</a></td>
            </tr>
            <tr>
                <td><a href="https://51comic.org/">51漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://1zse.com/">一之涩漫画</a></td>
                <td><a href="http://hatazi.com/">哈塔兹漫画</a>，<a href="https://522160.xyz/">物二漫画</a></td>
            </tr>
            <tr>
                <td><a href="http://naluhd.com/">那露漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://hdcomic.com/booklist/?tag=%E7%9C%9F%E4%BA%BA">狮城漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://sixcomic.com/">琴瑟漫畫</a></td>
                <td><a href="https://6acg.top/">琴瑟書庫</a></td>
            </tr>
            <tr>
                <td><a href="https://www.44te.com/">特漫网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://jcomic.net/">JComic</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://18h.animezilla.com/">18H 宅宅愛動漫</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.ho5ho.com/">HO5HO</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.18mh.cc/">18禁漫</a></td>
                <td><a href="http://m.18mh.cc/">m.18mh.cc</a></td>
            </tr>
            <tr>
                <td><a href="https://bad.news/mh">成人漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://mhdnf.xyz/">H漫画</a></td>
                <td><a href="https://qscxx4.com/">發佈頁</a></td>
            </tr>
            <tr>
                <td><a href="https://123548.xyz/">H漫画 123548.xyz</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://h-webtoon.com/">韓漫射</a></td>
                <td>同格式，<a href="https://h-doujinshi.xyz/">h-doujinshi.xyz</a>，<a href="https://18hmanga.click/">18hmanga.click</a>，<a href="https://cosporn.online/">cosporn.online</a></td>
            </tr>
            <tr>
                <td><a href="https://www.okcomic.net/">ok漫画網</a></td>
                <td><a href="https://m.okcomic.net/">m.okcomic.net</a></td>
            </tr>
            <tr>
                <td><a href="https://toptoon.shop/">顶通漫画</a></td>
                <td><a href="https://toptoon123.xyz">地址发布页</a></td>
            </tr>
            <tr>
                <td><a href="https://www.rhmanhua12.xyz/">H肉番动漫</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://semanji.xyz/">色漫集</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://155comic.com/">155漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://manhua.sexbook.top/">18H汉化漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://hanime1.biz/home">hanime1.biz</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://javabc.club/">JavABC</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://txcomic.com/">桃心漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.topcomic.online/">嘿嘿漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.viptoon.bond/">顶漫漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://javcomics.site/">日本禁漫屋</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.55comic.com/">污污漫畫</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://400manhua.com/">400漫画网</a></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</details>
<h2>漫畫類內置規則支持列表</h2>
<p>漫畫類為了兼容我提交給東方永頁機的翻頁規則和自己寫的專用腳本，規則幾乎都是預設為關閉狀態。</p>
<p>如有需要請透過UI選項設定開啟或幹脆修改腳本規則，也需要關閉東方永頁機或自己加黑名單，不然會衝突。</p>
<p>透過UI開啟當前漫畫站規則的步驟 ＞ 前往漫畫網站的閱讀頁面 ＞ 瀏覽器右上角腳本管理器 ＞ 圖片全載 ＞ 設定 ＞ UI ＞ 勾選啟用當前漫畫站點規則 ＞ 保存設定</p>
<p>2023/11/25 絕大多數漫畫站增加了預讀下一話圖片的功能，有效的減少等待圖片載入的時間。</p>
<details>
    <summary><kbd><strong>「 點擊展開查看 」</strong></kbd></summary>
<br>
    <table>
        <thead>
            <tr>
                <th><strong>網站</strong></th>
                <th><strong>備註</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><a href="https://www.comicabc.com/">8Comic無限動漫</a></td>
                <td><a href="https://m.comicbus.com/">m.comicbus.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.copymanga.site/">拷貝漫畫</a></td>
                <td><a href="https://copymanga.site/">copymanga.site</a>，<a href="https://www.copymanga.tv/">www.copymanga.tv</a>，<a href="https://copymanga.tv/">copymanga.tv</a>，<a href="https://www.mangacopy.com/">www.mangacopy.com</a>，<a href="https://mangacopy.com/">mangacopy.com</a>，PC版向下滾動隱藏工具列，手機版需在閱讀頁重新載入一次才會生效</td>
            </tr>
            <tr>
                <td><a href="https://komiic.com/">Komiic</a></td>
                <td>SPA網頁，只有下載功能</td>
            </tr>
            <tr>
                <td><a href="http://www.manmanju.com/">漫漫聚</a></td>
                <td><a href="http://m.manmanju.com/">m.manmanju.com</a>，閱讀頁添加了下一話鏈接</td>
            </tr>
            <tr>
                <td><a href="http://manhua.kukudm.com/">KuKu动漫</a></td>
                <td><a href="http://m.ikuku.cc/">m.ikuku.cc</a>，閱讀頁添加了下一話鏈接</td>
            </tr>
            <tr>
                <td><a href="https://www.laimanhua8.com/">来漫画</a></td>
                <td><a href="https://m.laimanhua8.com/">m.laimanhua8.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.fffdm.com/manhua/">风之动漫</a></td>
                <td>SPA網頁，閱讀頁添加了下一話鏈接，並排模式無法顯示</td>
            </tr>
            <tr>
                <td><a href="https://www.kanguoman.com/">爱国漫</a></td>
                <td><a href="https://m.kanguoman.com/">m.kanguoman.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.mh160.cc/">漫画160</a></td>
                <td><a href="http://m.mh160.cc/">m.mh160.cc</a></td>
            </tr>
            <tr>
                <td><a href="https://www.iimanhuapi.com/">漫画皮</a></td>
                <td><a href="https://m.iimanhuapi.com/">m.iimanhuapi.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.qyy158.com/">风车漫画</a></td>
                <td><a href="https://m.qyy158.com/">m.qyy158.com</a></td>
            </tr>
            <tr>
                <td><a href="https://dogemanga.com/">漫畫狗</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.hahacomic.com/">哈哈漫画</a></td>
                <td>漫畫列表添加自動翻頁功能</td>
            </tr>
            <tr>
                <td><a href="https://www.ponpomu.com/">白绒Yuri</a></td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td><a href="https://terra-historicus.hypergryph.com/">明日方舟泰拉记事社</a></td>
                <td>SPA網頁</td>
            </tr>
            <tr>
                <td><a href="https://www.colamanga.com/">COLAMANGA</a></td>
                <td>方向鍵上下章，按6自動捲動等待全部圖片載入，下載需先手動觸發全部載入圖片，圖址如為blob函式會使用到canvas需要繪製過程會有點卡。</td>
            </tr>
            <tr>
                <td><a href="https://manwa.me/">漫蛙</a></td>
                <td>uBlock加信任名單<pre>https://manwa.me/chapter/*</pre>
按6自動捲動等待全部圖片載入，閱讀頁去廣告無提示、方向鍵上下章、向下滾動隱藏工具列、更新頁自動載入更多、目錄展開全部章節，下載需先手動觸發全部載入圖片，函式使用到canvas需要繪製過程會有點卡。</td>
            </tr>
            <tr>
                <td><a href="https://www.yinghuamh.net/">樱花漫画</a></td>
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
                <td><a href="https://www.lightnovel.us/">轻之国度</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://m.happymh.com/">嗨皮漫畫</a></td>
                <td>圖片手動插入、閱讀、展開目錄、自動點擊載入、漫畫鏈接新分頁打開，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.manhuagui.com/">Manhuagui看漫画</a></td>
                <td><a href="https://tw.manhuagui.com/">tw.manhuagui.com</a>，<a href="https://m.manhuagui.com/">m.manhuagui.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://cocomanga.xyz/">COCOMANGA</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.baozimh.com/">包子漫画</a></td>
                <td>閱讀、展開目錄、漫畫鏈接新分頁打開，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.mangabz.com/">Mangabz</a></td>
                <td>PC版向下滾動隱藏工具列，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://xmanhua.com/">Xmanhua</a></td>
                <td>PC版向下滾動隱藏工具列，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.dm5.com/">DM5</a></td>
                <td><a href="https://m.dm5.com/">m.dm5.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://hk.1kkk.com/">極速</a></td>
                <td><a href="https://m.1kkk.com/">m.1kkk.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.yymanhua.com/">yymanhua</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://mh234.top/">mh234</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://m.dmzj.com/">动漫之家M</a></td>
                <td><a href="https://m.idmzj.com/">m.idmzj.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.cartoonmad.com/">動漫狂</a></td>
                <td><a href="https://www.cartoonmad.com/m/">動漫狂M</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.kumwu1.com/">酷漫屋</a></td>
                <td><a href="http://m.kumwu1.com/">m.kumwu1.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://qumanku.com/">速漫库</a></td>
                <td><a href="http://www.sumanku.com/">www.sumanku.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.manhuadb.com/">漫画DB</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://kanbook.net/">快岸漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.acgwd.com/">亲亲漫画</a></td>
                <td><a href="http://m.acgwd.com/">m.acgwd.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.gufengmh.com/">古风漫画网</a></td>
                <td><a href="https://m.gufengmh.com/">m.gufengmh.com</a>，<a href="https://www.gf618.com/">www.gf618.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.77mh.xyz/">新新漫画</a></td>
                <td><a href="https://m.77mh.xyz/">m.77mh.xyz</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://m.gaonaojin.com/">仙漫网</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.dashumanhua.com/">大树漫画</a></td>
                <td>預設關閉，部分漫畫雖然被下架但代碼資料還在，依然能插入圖片</td>
            </tr>
            <tr>
                <td><a href="https://godamanga.com/">GODA漫畫</a></td>
                <td><a href="https://cn.godamanga.site/">cn.godamanga.site</a>，<a href="https://cocomanga.org/">cocomanga.org</a>，<a href="https://nav.telltome.net/">发布页
</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://baozimh.org/">包子漫畫</a></td>
                <td><a href="https://cn.baozimh.org/">cn.baozimh.org</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.2animx.com/">二次元動漫</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.k886.net/">看漫畫</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.2nunu.com/">奴奴漫畫</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.omyschool.com/">木马漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.webtoons.com/zh-hant/">LINE WEBTOON</a></td>
                <td>目錄聚集所有章節、閱讀，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.dongmanmanhua.cn/">咚漫</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.dongman.la/">動漫啦</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.acg456.com/">ACG456</a></td>
                <td><a href="http://m.acg456.com/">m.acg456.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.vomicmh.com/">vomic漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.qmanwu1.com/">奇漫屋</a></td>
                <td><a href="http://m.qmanwu1.com/">m.qmanwu1.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.mhxqiu4.com/">漫画星球</a></td>
                <td><a href="http://m.mhxqiu4.com/">m.mhxqiu4.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.6mh67.com/">6漫画</a></td>
                <td><a href="http://m.6mh67.com/">m.6mh67.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.manben.com/">漫本</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://comic.acgn.cc/">動漫戲說</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.98comic.com/">98漫畫網</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.yyjj66.com/">爱看漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.guoman8.cc/">国漫吧</a></td>
                <td><a href="http://m.wuqimh.net/">m.guoman8.cc</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.92mh.com/">92漫画</a></td>
                <td><a href="http://m.92mh.com/">m.92mh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.manhua456.com/">漫画456</a></td>
                <td><a href="https://m.manhua456.com/">m.manhua456.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.90mh.org/">90漫画</a></td>
                <td><a href="http://m.90mh.org/">m.90mh.org</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.gmh1234.com/">漫画1234</a></td>
                <td><a href="https://m.gmh1234.com/">m.gmh1234.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.ykmh.com/">优酷漫画</a></td>
                <td><a href="http://h5.ykmh.com/">h5.ykmh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.mhxin.com/">漫画芯</a></td>
                <td><a href="https://m.mhxin.com/">m.mhxin.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.zuimh.com/">最漫画</a></td>
                <td><a href="https://m.zuimh.com/">m.zuimh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.100mhl.com/">漫画连</a></td>
                <td><a href="https://m.100mhl.com/">m.100mhl.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.pinmh.com/">拼拼漫画</a></td>
                <td><a href="https://m.pinmh.com/">m.pinmh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.0dmh.com/">零点漫画</a></td>
                <td><a href="https://m.0dmh.com/">m.0dmh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.xuermh.com/">雪儿漫画</a></td>
                <td><a href="https://m.xuermh.com/">m.xuermh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.gougoumh.com/">狗狗漫画</a></td>
                <td><a href="https://m.gougoumh.com/">m.gougoumh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.mhkan.com/">漫画看</a></td>
                <td><a href="https://m.mhkan.com/">m.mhkan.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://comics.veryim.com/">非常爱漫网</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://m.icekr.com/">冰氪漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.mkzhan.com/">漫客栈</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.mhw1.com/">漫画屋</a></td>
                <td><a href="http://www.cmh5.com/">www.cmh5.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.biqug.org/">笔趣阁漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://mh.9xxsm.com/">Go追漫</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.cuiman.com/">催漫画</a></td>
                <td><a href="https://m.cuiman.com/">m.cuiman.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.360mh.cc/">360漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://797mh.com/">漫画网</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.manshiduo.net/">漫士多</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://mh5.tw/">漫畫屋</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.setnmh.com/">山立漫畫</a></td>
                <td>預設關閉</td>
            </tr>            <tr>
                <td><a href="https://www.tvbsmh.com/">TVBS漫畫</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.qiximh4.com/">七夕漫画</a></td>
                <td><a href="http://m.qiximh4.com/">m.qiximh4.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.mhko.net/">漫画库</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.szcdmj.com/">砂之船动漫家</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.xuerenmanhua.com/">雪人漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.52hah.com/">聚合漫画屋</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.kukanmanhua.com/">酷看漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://manhua666.com/">漫画牛</a></td>
                <td><a href="https://www.manhua666.com/">www.manhua666.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://25mh.cc/">爱我漫画</a></td>
                <td><a href="https://www.25mh.cc/">www.25mh.cc</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://manhuab.com/">漫画吧</a></td>
                <td><a href="https://www.manhuab.com/">www.manhuab.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://manhuatai.org/">漫画台</a></td>
                <td><a href="http://www.manhuatai.org/">www.manhuatai.org</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.manhuag.cc/">漫画哥</a></td>
                <td><a href="https://m.manhuag.cc/">m.manhuag.cc</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://manga.bilibili.com/">哔哩哔哩漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.kanman.com/">看漫画</a></td>
                <td>預設關閉</td>
            </tr>
        </tbody>
    </table>
</details>
<h2>AI繪圖類內置規則支持列表</h2>
<details>
    <summary><kbd><strong>「 點擊展開查看 」</strong></kbd></summary>
<br>
<p>請透過腳本管理器選單開啟Lazy Load加載大圖功能，批量下載請使用其他圖片下載腳本。</p>
<p>可點擊右下的眼睛圖示新分頁觀看圖片，並且會顯示抓取到的圖片數量。</p>
    <table>
        <thead>
            <tr>
                <th><strong>網站</strong></th>
                <th><strong>備註</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><a href="https://civitai.com/">Civitai</a></td>
                <td>SPA網頁，Lazy Load加載大圖，支持自動顯示NSFW被模糊的圖片。</td>
            </tr>
            <tr>
                <td><a href="https://www.liblib.art/">LiblibAI</a></td>
                <td>SPA網頁，Lazy Load加載大圖。</td>
            </tr>
            <tr>
                <td><a href="https://tensor.art/">Tensor.Art</a></td>
                <td>SPA網頁，Lazy Load加載大圖。</td>
            </tr>
            <tr>
                <td><a href="https://pixai.art/">PixAI</a></td>
                <td>SPA網頁，Lazy Load加載大圖，自動顯示NSFW被模糊的圖片。</td>
            </tr>
            <tr>
                <td><a href="https://yodayo.com/explore/">Yodayo</a></td>
                <td>SPA網頁，加載大圖。</td>
            </tr>
            <tr>
                <td><a href="https://creator.nightcafe.studio/explore">NightCafe Creator</a></td>
                <td>SPA網頁，Lazy Load加載大圖，不穩定需要上下滾動重複觸發，右下的眼睛數字沒有增加，代表沒有抓到新圖。</td>
            </tr>
            <tr>
                <td><a href="https://legacy.midjourney.com/showcase/recent/">Midjourney</a></td>
                <td>沒有更高解析度的圖片，只是能聚集到新分頁觀看。</td>
            </tr>
            <tr>
                <td><a href="https://neural.love/search">neural.love</a></td>
                <td>SPA網頁，加載大圖。</td>
            </tr>
            <tr>
                <td><a href="https://playgroundai.com/feed">Playground</a></td>
                <td>SPA網頁，加載大圖，無法並行請求所以抓取很慢。</td>
            </tr>
            <tr>
                <td><a href="https://pornderful.ai/search">Pornderful.ai</a></td>
                <td>SPA網頁，Lazy Load加載大圖，首頁會有閃爍的問題。</td>
            </tr>
        </tbody>
    </table>
</details>
<h2>輔助類內置規則支持列表</h2>
<details>
    <summary><kbd><strong>「 點擊展開查看 」</strong></kbd></summary>
<br>
    <table>
        <thead>
            <tr>
                <th><strong>網站</strong></th>
                <th><strong>備註</strong></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>漫畫類</td>
                <td>自動展開目錄</td>
            </tr>
            <tr>
                <td>m.4khd.com</td>
                <td>自動跳轉</td>
            </tr>
            <tr>
                <td>4kup.net</td>
                <td>自動跳轉</td>
            </tr>
            <tr>
                <td>Imgasd</td>
                <td>下載鏈結自動跳轉</td>
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
