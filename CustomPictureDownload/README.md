
如有需要支持的站點可反饋，有空的話會嘗試幫寫規則加進腳本內置的規則庫裡，能力有限不保証一定寫的出來。
寫這個腳本的緣由是，想讓下載、複製鏈接不用做展開圖庫挑選圖片的動作，能自己決定要儲存的壓縮檔和資料夾名稱，網站沒有限制連接數的話能做到高速聚集所有圖片，還能添加一些我想要的輔助功能。

<h1>簡介：</h1>
聚圖！反對將一話一集一章一篇一部拆成好幾頁，一頁一張圖真XXX的有病，整頁用Lazy loading的話還能接受，透過選擇器圈選圖片或者自己寫函式，能聚集分頁的所有圖片到當前頁面裡，也能進行下載壓縮打包，如有NEXT能做到自動化下載，支援自定義規則方便重複使用，後續擴充規則更容易。

用戶寫的規則請自行另外備份，規則只會寫死在腳本裡不會線上規則化，腳本更新就會覆蓋規則。

<h1>關於自動下載：</h1>
當修改了腳本選項或站點規則啟用了自動下載時，站點規則insertImg的自動插入圖片將無效，瀏覽器的下載設定需關閉下載前詢問儲存位置和設定好預設的下載路徑，全自動需要有NEXT做搭配，每個站點第一次啟用時需等待連續下載2~3次後，觸發瀏覽器詢問是否同意允許下載多個檔案，需同意後後續才能成功下載，並且讓分頁保持在前景運行不然壓縮進度會停住，可以開一個獨立視窗一個分頁用作下載用，最好的方式是拉兩個視窗一個佔1/3畫面掛下載一個佔3/2畫面瀏覽。
<p>2023/05/13，腳本增加了全局開關選項，可以不用搜索規則對各別站點進行修改，不需要時記得關閉。</p>

<h1>可用規則示例：</h1>
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
    delay: 300, //延遲載入規則
    include: "元素", //網頁必須包含的元素
    exclude: "元素", //網頁要排除的元素
    init: "code", //載入頁面後要執行的代碼
    init: () => {
        code
    },
    imgs: "#TheImg", //CSS選擇器
    imgs: "//img[@id="TheImg"]", //XPath選擇器
    //IMG、DIV、A，3種元素會先判斷有沒有圖片網址放在dataset屬性，如果沒有IMG取src屬性，A取href屬性。
    imgs: "js;code", //也可透過JS代碼自己創建Array，有時大圖是在A元素上需要透過xhr獲取或放在script或變量或透過api取得的json。
    imgs: () => {
        let arr = [];
        …code;
        return arr;
    },
    insertImg: ["元素", 1, time], //[清空此元素內容插入圖片, 0(手動)1(自動)2(自動Lazy loading模式)3(手動Lazy loading模式), 自動延遲時間(預設0)]。
    insertImg: [
        ["元素", (插入在此元素) 0(裡面)1(之前) 2(之後), "要移除的元素"], 0(手動) 1(自動) 2(自動Lazy loading模式) 3(手動Lazy loading模式), 自動延遲時間(預設0)
    ],
    go: 1, //insertImg配套選項，圖片插入在頁面偏下位置時，捲動至第一張大圖的位置。
    customTitle: "return code", //自定義JS代碼生成壓縮檔和資料夾名稱，預設是使用當前網頁標題。
    customTitle: () => {
        return code
    },
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
    one: 1, //0多線程，1使用單線程下載，有些網站限制連接數，併發請求容易出錯。
    fetch: 1, //使用Fetch API下載圖片，需要網站有支援CORS，如小黃書，4KHD
    referer: "src", //下載圖片時傳遞的參照頁，預設是使用當前網址，"src"參照頁為圖片網址，也能自訂如"https://www.4khd.com/"或空""
    category: "comic" //類別(非必須)
}, {
    name: "規則2",
    enable: 0,
    icon: 0,
    key: 0,
    reg: /www\.xxxxx\.com/,
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
    insertImg: ["", 0, time],
    insertImg: [
        ["", 1, ""], 2, time
    ],
    go: 1,
    customTitle: "code",
    customTitle: () => {
        code
    },
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
    one: 1,
    fetch: 1,
    referer: "src",
    category: ""
}, {
    name: "規則3",
    …
}]
</pre>
</details>
<h1>內置函式：</h1>
<details>
    <summary><kbd><strong>「 點擊展開查看 」</strong></kbd></summary>
<br>
可使用在規則init、imgs、customTitle
<pre>
//返回一個指定元素，支持CSS/Xpath選擇器
fun.ge("ele");
fun.ge("ele", doc);
fun.ge("ele", node);
</pre>
<pre>
//返回所有指定元素，支持CSS/Xpath選擇器
fun.gae("ele");
fun.gae("ele", doc);
fun.gae("ele", node);
</pre>
<pre>
//取得元素的字串
//mode
//1返回指定元素的字串(預設)
//2返回指定元素的上一個元素的字串
//3返回指定元素的上上一個元素的字串
fun.geT("ele");
fun.geT("ele", 1);
fun.geT("ele", 2);
fun.geT("ele", 3);
</pre>
<pre>
//取得元素屬性的值
fun.attr("元素","屬性")
</pre>
<pre>
//對document.title的字串修改
//mode
//0返回【刪除指定字串的標題(預設)】
//1返回【字串切割取[0]去前後空白】
//2返回【字串切割[0] + "字串" + 字串切割[1]】
//3返回【字串切割[1] + "字串" + 字串切割[0]】
fun.title("字串",mode)
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
//使用Promise包裝GM_xmlhttpRequest
fun.xhr(url, type = "text", referer = location.href)
//用fetch(url)遇到需要CORS時改用這個
fun.xhr(url)
fun.xhr(url, "document").then(doc => {
    console.log("測試doc", doc);
})
fun.xhr(url, "json").then(json => {
    console.log("測試json", json);
})
</pre>
<pre>
//顯示簡短訊息
fun.show("字串",1000(顯示的時間,0持續顯示));
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
//等同eval()
fun.run("代碼")
</pre>
<pre>
//移除元素
fun.remove("ele", time = 0)
</pre>
<pre>
//插入樣式，需要先用JS判斷的情況用這個
fun.css("css")
</pre>
<pre>
//xhr抓取元素，不局限於圖片(靜態，可跨域)
//links網址陣列
//eles要抓的元素
//"targetEle"清空此元素放入allEle
//["targetEle", pos] 此元素位置pos，0裡面1之前2之後
fun.getEle(links, eles, targetEle, removeEle = null)
</pre>
<pre>
//xhr抓取圖片元素，返回圖片網址 (只支持靜態網頁，無法跨域請求)
//max填入用fun.geT()取得最大頁數的數字，或想辦法算出最大頁數的數字。
fun.getImg("圖片元素選擇器",max ,mode ,["圖片網址用來替換的字串","圖片網址要被替換的字串"])
fun.getImg(ele, max, mode = 1, rText = [null, null])
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
//fun.getImgA
//mode
//0多線程(預設)
//1單線程
//3單線程不將A元素替換成圖片元素
//A元素選擇器的href屬性不能是#和javascript或onclick監聽點擊事件，必須是一般的http鏈接。
//A元素參數可以傳入自己創建的網址陣列
fun.getImgA("圖片元素選擇器", "A元素選擇器", mode, ["圖片網址要替換的字串", "圖片網址要被替換的字串"], 0 不顯示獲取訊息)
fun.getImgA(img, A, one = 0, rText = [null, null], showMsg = 1)
</pre>
<pre>
//翻頁模式聚集圖片或是含A元素的預覽縮圖然後fun.getImgA()
fun.getNP("元素選擇器", "下一頁元素", "判斷為最後一頁的元素", "頁碼條元素", time(延遲請求下一頁的時間預設0毫秒), dataset = null, msg = 1)
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
<p>點擊圖示、確定、確定，3步開始下載</p>
<p>右鍵點擊圖示、確定，2步驟複製圖片網址，如果設置了insertImg，按右鍵是插入圖片，第二次按是複製圖片網址。</p>
<p>中鍵點擊圖示捲動至第一張大圖</p>

<h1>腳本有綁定按鍵</h1>
<p>數字鍵0下載壓縮、數字鍵1複製圖片網址、數字鍵2捲動至第一張大圖、數字鍵3一鍵下載</p>
<p>按0、Enter、Enter，3步驟開始下載。</p>
<p>按1、Enter，2步驟複製圖片網址。</p>
<p>如果設置了insertImg為手動，按1、Enter是插入圖片，第二次按是複製圖片網址。</p>
<p>按2前往插入的第一張大圖</p>
<p>按3，一鍵下載，跳過圖片選擇器和自定義標題。</p>

<p>2023/05/13，修改中鍵功能為捲動至第一張大圖，綁定快捷鍵數字鍵2</p>
<p>2023/05/15，如果規則imgs是函式省略輸入選擇器這一步。</p>

<h1>圖介：</h1>
<p>在頁面左下添加了一個圖片下載按鈕</p>
<img src="https://i.imgur.com/TxnEvTk.png">
<p>點擊後會彈出確認窗輸入CSS和Xpath選擇圖片元素。</p>
<img src="https://i.imgur.com/c0EU0Ax.png">
<p>確認後需要再輸入資料夾名稱</p>
<img src="https://i.imgur.com/M0IMf5G.png">
<p>確認後就會開始下載壓縮打包圖片</p>
<img src="https://i.imgur.com/m6ewqQd.png">

<p>為了與東方永頁機共存不會造成衝突，也不需要兩邊開開關關的，整理了東方永頁機黑名單。</p>
<p>2023/08/30 22:11</p>
https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/Blacklist.txt

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
                <td><a href="https://xchina.biz/">小黃書</a></td>
                <td><a href="https://xchina.co/">xchina.co</a></td>
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
                <td><a href="https://www.honeyleg.com/">HoneyLeg</a>，<a href="https://www.ladylap.com/">Lady Lap</a>，<a href="https://www.nuyet.com/">Nuyet</a>，請使用專用腳本，<a href="https://greasyfork.org/scripts/463123">greasyfork.org/scripts/463123</a></td>
            </tr>
            <tr>
                <td><a href="https://yskhd.com/">优丝库HD</a></td>
                <td>免VIP</td>
            </tr>
            <tr>
                <td><a href="https://luohuaxiu.com/">洛花秀</a></td>
                <td>免VIP</td>
            </tr>
            <tr>
                <td><a href="https://www.24fa.com/c49.aspx">24FA</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.hitxhot.org/">Hit-x-Hot</a></td>
                <td>同格式，<a href="https://www.depvailon.com/">www.depvailon.com</a>，<a href="https://pic.yailay.com/">pic.yailay.com</a>，<a href="https://nungvl.net/">nungvl.net</a></td>
            </tr>
            <tr>
                <td><a href="https://www.xiuren08.xyz/">秀人集</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xiuren0.com/">秀人图集</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.xrmn02.cc/">秀人美女網</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.jpmn8.cc/">精品美女吧</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.imn5.cc/">爱美女网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://meirentu.cc/">美人图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.xg02.xyz/">极品性感美女</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.ikmn5.cc/">爱看美女网</a></td>
                <td>不支持預覽版頁面</td>
            </tr>
            <tr>
                <td><a href="https://www.22mm.net/">美女秀</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.2mn.cc/">秀爱美女网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xiutaku.com/">Xiutaku</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://kostaku.art/">Kostaku</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.v2ph.com/">微圖坊</a></td>
                <td><a href="https://www.v2ph.net/">www.v2ph.net</a>，<a href="https://www.v2ph.ru/">www.v2ph.ru</a>，需註冊，大尺度非VIP只能抓到20~30張</td>
            </tr>
            <tr>
                <td><a href="https://www.meitule.net/">美图乐</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.mfsft.com/">免费私房图</a></td>
                <td><a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/mfsft.txt">同系列網站166個</a>
                    ，發布頁，<a href="http://js.jctuk.com/dz.html">http://js.jctuk.com/dz.html</a>，
                    相似仿站，<a href="https://www.rosi8.net/">www.rosi8.net</a>，<a href="https://www.sfjpg.com/">www.sfjpg.com</a>，<a href="https://www.sfjpg.net/">www.sfjpg.net</a>，<a href="https://www.kanmeitu.net/">www.kanmeitu.net</a>，<a href="https://kanmeitu1.cc/">kanmeitu1.cc</a>
                </td>
            </tr>
            <tr>
                <td><a href="https://mmm.red/">妹妹美</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.sdxt.org/">深度学堂</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.haotuwu.com/">好圖屋</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.tujigu.top/">爱图集谷</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://dongti.blog.2nt.com/">胴体的诱惑</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://556123.xyz/">开始涩涩</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.446m.com/">萌图社</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://baoruba.com/">私图网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.umeitu.com/">尤美图库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://www.zhaotaotu.cc/">找套图</a></td>
                <td></td>
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
                <td><a href="https://www.qixianzi.com/">七仙子图片</a></td>
                <td><a href="https://www.qixianzi.com/e/wap/">www.qixianzi.com/e/wap/</a></td>
            </tr>
            <tr>
                <td><a href="https://heysexgirl.com/">嘿～色女孩</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.cos6.net/">绅士猫</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://madoucun.com/arttype/56.html">麻豆村Cosplay</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.xinwenba.net/web/meinv/">新闻吧</a></td>
                <td>封鎖部分地區，需要VPN才看的到圖片</td>
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
                <td><a href="https://ribi.me/">驲哔么</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://51sex.vip/">51sex</a></td>
                <td>分類沒做好，寫真從網址後面的數字3開始遞增，79XX部。</td>
            </tr>
            <tr>
                <td><a href="https://www.2meinv.com/">爱美女</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.xinmeitulu.com/">新美图录</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://meitulu.me/">美图录</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.zanmm.com/">赞MM</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.xiuwo.net/">秀窝</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.xsnvshen.co/">秀色女神</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://loxiu.com/">洛秀网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.meimeimei.org/">美妹妹</a></td>
                <td></td>
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
                <td><a href="https://www.hanjuzu.com/hantype/23.html">韩剧组</a></td>
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
                <td><a href="https://taotu.uk/">套图网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://taotu.org/">套圖TAOTU.ORG</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.95mm.me/">MM 范</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.meitu131.com/meinv/">MEITU131</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.tuiimg.com/meinv/">推图网</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.qq7k.com/mntp/">晴空头像图库</a></td>
                <td></td>
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
                <td><a href="https://www.meijuntu.com/">俊美图</a></td>
                <td>www.jeya.de</td>
            </tr>
            <tr>
                <td><a href="https://mt316.com/">妹子图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://diskgirl.com/imageslist">硬盘少女</a></td>
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
                <td><a href="https://www.neihantu.net/zhainannvshen/">内涵吧</a></td>
                <td><a href="https://wap.neihantu.net/zhainannvshen/">wap.neihantu.net</a></td>
            </tr>
            <tr>
                <td><a href="https://jrants.com/">青年美圖</a></td>
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
                <td><a href="https://www.cybesx.com/">柠檬皮</a></td>
                <td></td>
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
                <td><a href="https://www.x6o.com/topics/14#articles">x6o</a></td>
                <td></td>
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
                <td><a href="https://xem.anhvl.net/">Anh VL</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://fliporn.biz/sexual-picture">Fliporn</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://jingunav.info/index.php/arttype/109.html">人妻租借所</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://534798.xyz/">性趣套图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.28tyu.com/">苍井优图片</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.photos18.com/">色情圖片網</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cav103.com/albums/">GavPorn相冊</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://niuc3.com/sex">牛C网导航</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xiuseaa.com/">羞涩姬</a></td>
                <td><a href="https://xiusea.com/">xiusea.com</a></td>
            </tr>
            <tr>
                <td><a href="https://avjb.com/albums/">AVJB</a></td>
                <td><a href="https://bav24.xyz/albums/">bav24.xyz</a></td>
            </tr>
            <tr>
                <td><a href="https://www.qinimg.com/">Qinimg</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.yeitu.com/meinv/">亿图全景图库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.umei.cc/meinvtupian/">优美图库</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.3gbizhi.com/meinv">3G壁纸</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://mrcong.com/">MrCong</a></td>
                <td>完整無修正的圖片需要下載，聚集的只是預覽圖</td>
            </tr>
            <tr>
                <td><a href="https://hotgirl.asia/">HotAsiaGirl</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.4khd.com/">4KHD</a></td>
                <td><a href="https://www.4kep.com/">www.4kep.com</a>，<a href="https://xjav.cc/">xjav.cc</a></td>
            </tr>
            <tr>
                <td><a href="https://www.4kup.net/">4KUP</a></td>
                <td>高解析原圖需要下載，聚集的只是預覽圖</td>
            </tr>
            <tr>
                <td><a href="https://blog.baobua.net/mlem">BAOBUA.COM</a></td>
                <td><a href="https://baobua.com/">baobua.com</a>，<a href="https://fb.baobua.net/">fb.baobua.net</a>，<a href="https://vn.baobua.net/">vn.baobua.net</a>，<a href="https://www.baobua.net/">www.baobua.net</a></td>
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
                <td><a href="https://sxchinesegirlz01.xyz/">Chinese Beauties</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cherryfans.cc/">Cherryfans</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://asiantolick.com/">Asian To Lick</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.modelsvibe.com/">Models Vibe</a></td>
                <td>ajax沒做好，翻頁規則已提交東方永頁機</td>
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
                <td><a href="https://www.sexyasiangirl.xyz/">SexyAsianGirl</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://fuligirl.net/">福利姬美图</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://r18cosplay.com/">R18 Cosplay</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://nudebird.biz/">Nude Bird</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://nudecosplaygirls.com/">NUDECOSPLAY</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cosplaytele.com/">Cosplaytele</a></td>
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
                <td><a href="https://buondua.com/">Buon Dua</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xcosplay.top/">X Cosplay</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://hotgirlchina.com/">HOTGIRLchina</a></td>
                <td><a href="https://theasiagirl.com/">theasiagirl.com</a>，<a href="https://sex4viet.com/">sex4viet.com</a>，<a href="https://cutexinh.com/">cutexinh.com</a>，<a href="https://vuxinh.com/">vuxinh.com</a>，<a href="https://girlxinhxinh.com/">girlxinhxinh.com</a></td>
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
                <td><a href="http://gravia.site/box/gate.php">Gravia</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://gravurezasshi9.doorblog.jp/">グラビア週刊誌 9</a></td>
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
                <td><a href="https://www.micmicidol.club/">MIC MIC IDOL</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://goddess247.com/">goddess247</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://bestgirlsexy.com/">BestGirlSexy</a></td>
                <td></td>
            </tr>
            </tr>
            <tr>
                <td><a href="https://m.phimvuspot.com/">PhimVu</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://kemono.party/fantia/user/17148/post/1633768">Kemono</a></td>
                <td><a href="https://kemono.su/">kemono.su</a>，<a href="https://coomer.party/">coomer.party</a></td>
            </tr>
            <tr>
                <td><a href="https://hentai-img.com/">Hentai Image</a></td>
                <td><a href="https://hentai-cosplays.com/">hentai-cosplays.com</a>，<a href="https://porn-images-xxx.com/">porn-images-xxx.com</a></td>
            </tr>
            <tr>
                <td><a href="https://www.eporner.com/pics/">EPORNER</a></td>
                <td>www.eporner.com/profile/namaiki/uploaded-pics/
                </td>
            </tr>
            <tr>
                <td><a href="https://www.xasiat.com/albums/">Xasiat</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xhamster.com/photos">xHamster</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cn.pornhub.com/albums">PornHub</a></td>
                <td>很容易被短暫封IP...</td>
            </tr>
            <tr>
                <td><a href="https://mrdeepfakes.com/photos">MrDeepFakes</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://xher.net/">xher.net</a></td>
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
                <td><a href="https://www.pornpics.com/jp/">Porn Pics</a></td>
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
                <td><a href="http://babesource.com/">BabeSource</a></td>
                <td>圖片清單頁</td>
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
                <td><a href="https://girlsreleased.com/">GirlsReleased</a></td>
                <td>圖床imgadult無法外連，但可以下載。</td>
            </tr>
            <tr>
                <td><a href="https://eropics.to/">Eropics</a></td>
                <td>有韓系套圖，只支持全部使用pixhost、turboimagehost、vipr、imgbox圖床的頁面，imx可以用JDownloader下載</td>
            </tr>
            <tr>
                <td><a href="https://imx.to/">imx.to</a></td>
                <td>輔助點擊，能在gallery頁進行下載，沒有gallery只有單張圖，可以在eropics批量複製鏈接給JDownloader下載</td>
            </tr>
            <tr>
                <td><a href="https://ngamgaixinh.us/">Ngắm Gái Xinh</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://app.degoo.com/">Degoo Cloud</a></td>
                <td>輔助Ngắm Gái Xinh使用的圖床，先手動點開第一張預覽縮圖，展開第一張大圖後，按0輸入標題輸入圖片數量，等待抓取完畢。</td>
            </tr>
            <tr>
                <td><a href="https://www.pornpic.com/">PornPic</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.imagefap.com/">ImageFap</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://2lsp.xyz/">2LSP</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.superbeautygirlx.com/">Forum Girl</a></td>
                <td>大圖預覽不全，需要煩人的跳轉取得免空下載鏈接。</td>
            </tr>
            <tr>
                <td><a href="https://www.taotu8.xyz/">套圖吧</a></td>
                <td>完整圖片都需要付費</td>
            </tr>
            <tr>
                <td><a href="https://cydmyz.com/">ACG 资源网</a></td>
                <td>幾乎都需要VIP</td>
            </tr>
            <tr>
                <td><a href="https://www.tuao.one/">凸凹吧</a></td>
                <td>同網頁格式，<a href="https://www.63mm.cc/">www.63mm.cc</a>，<a href="https://www.97mm.cc/">www.97mm.cc</a>，<a href="https://www.luge8.co/">www.luge8.co</a>，<a href="https://luge8.co/">luge8.co</a></td>
            </tr>
            <tr>
                <td><a href="https://xjjtk.link/">小姐姐图库</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.mevtu.com/">美女图片网</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.xzsd1.com/">写真圣地</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.taotucc.com/">Taotuxp.com</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://xgirlscollection.com/">Xgirls</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.haonvshen.com/">好女神网</a></td>
                <td>很久沒新圖了</td>
            </tr>
            <tr>
                <td><a href="https://www.c0h.net/">美女云图网</a></td>
                <td>很久沒新圖了</td>
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
                <td><a href="https://www.buzzav.com/albums">Buzzav</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://multi.xnxx.com/">multi.xnxx.com</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://cn.angirlz.com/">Sexyxbody</a></td>
                <td><a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/Sexyxbody.txt">另同系列網站52個</a></td>
            </tr>
            <tr>
                <td><a href="https://gogortrt.com/">gogo人体艺术</a></td>
                <td><a href="https://github.com/skofkyo/AutoPager/blob/main/CustomPictureDownload/gogort.txt">另同系列網站44個</a></td>
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
                <td>作用在圖片清單頁，<a href="https://exhentai.org/">exhentai.org</a></td>
            </tr>
            <tr>
                <td><a href="https://nhentai.net/">nhentai</a></td>
                <td>作用在圖片清單頁，<a href="https://nyahentai.red/">nyahentai.red</a>，<a href="https://www.hentai.name/">www.hentai.name</a>，<a href="https://nhentai.website/">nhentai.website</a>，<a href="https://nhentai.xxx/">nhentai.xxx</a>，<a href="https://nhentai.to/">nhentai.to</a>
                </td>
            </tr>
            <tr>
                <td><a href="https://cathentai.net/">Cathentai</a></td>
                <td>作用在List Read頁，<a href="https://hentaibeeg.com/">hentaibeeg.com</a>，<a href="https://hentaicolor.net/">hentaicolor.net</a></td>
            </tr>
            <tr>
                <td><a href="https://hanime1.me/comics">Hanime1</a></td>
                <td>作用在圖片清單頁</td>
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
                <td>同上</td>
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
                <td><a href="http://nhentai.com/">nhentai.com</a></td>
                <td>作用在閱讀頁，直接從預覽縮圖進入需要重新載入，建議新分頁開啟閱讀頁</td>
            </tr>
            <tr>
                <td><a href="http://imhentai.xxx/">IMHentai</a></td>
                <td>作用在閱讀頁</td>
            </tr>
            <tr>
                <td><a href="https://hentai2read.com/">Hentai2Read</a></td>
                <td>同上</td>
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
                <td><a href="https://hitomi.la/">Hitomi.la</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://orzqwq.com/">Orzqwq</a></td>
                <td></td>
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
                <td><a href="https://hentaiporns.net/">HentaiPorns</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://comics.8muses.com/">8muses</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://rokuhentai.com/">Roku Hentai</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="http://18p.fun/">開車漫畫</a></td>
                <td>只是閱讀請使用東方永頁機，下載操作，需書幣購買的先購買好，第一章閱讀頁按1先跳轉為18p.fun，再按1開始聚圖從頭一路翻到尾，按0下載，標題需手動輸入</td>
            </tr>
            <tr>
                <td><a href="http://www.wnacg.com/">紳士漫畫</a></td>
                <td>作用在圖片清單、下拉閱讀頁，<a href="http://m.wnacg.com/">m.wnacg.com</a>，<a href="http://www.hentaicomic.ru/">www.hentaicomic.ru</a>，<a href="http://wn01.ru/">wn01.ru</a>，<a href="http://wn02.ru/">wn02.ru</a></td>
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
                <td><a href="http://www.vnacg.com/">VN漫画网</a></td>
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
                <td><a href="https://litu100.xyz/">丽图·污漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.ikanmh.xyz/">韩国污漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://jmwu.vip/">禁漫屋</a></td>
                <td><a href="https://m.jmwu.vip/">m.jmwu.vip</a></td>
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
                <td><a href="https://twhentai.com/">TWHentai</a></td>
                <td>作用在圖片清單頁</td>
            </tr>
            <tr>
                <td><a href="http://www.177pica.com/">177漫画</a></td>
                <td>www.177picyy.com</td>
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
                <td></td>
            </tr>
            <tr>
                <td><a href="https://asiacomics.com/">亚洲漫画走廊</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://bad.news/mh">成人漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://mhdnf.xyz/">H漫画</a></td>
                <td><a href="https://www.mhdnf.xyz/">www.mhdnf.xyz</a>，<a href="https://mhqwe.xyz/">mhqwe.xyz</a>，<a href="https://www.mhqwe.xyz/">www.mhqwe.xyz</a></td>
            </tr>
            <tr>
                <td><a href="https://123548.xyz/">H漫画 123548.xyz</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://madoucun.com/arttype/47.html">麻豆村浅看色漫</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://h-webtoon.com/">韓漫射</a></td>
                <td>同格式，<a href="https://h-doujinshi.xyz/">h-doujinshi.xyz</a>，<a href="https://18hmanga.click/">18hmanga.click</a>，<a href="https://cosporn.online/">cosporn.online</a></td>
            </tr>
        </tbody>
    </table>
</details>
<h2>漫畫類內置規則支持列表</h2>
<p>漫畫類為了兼容我提交給東方永頁機的翻頁規則和自己寫的專用腳本，規則幾乎都是預設為關閉狀態。</p>
<p>2023/05/07，Mangabz/Xmanhua/DM5/極速/PC版，改成併發請求圖片鏈接，大幅減少了獲取資料的時間。</p>
<p>2023/05/17，增加了腳本選項，可以直接開啟所有的漫畫類規則，方便自己重新測試規則，和有需要的用戶不用一個一個開那麼麻煩。</p>
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
                <td><a href="https://copymanga.site/">copymanga.site</a>，PC版向下滾動隱藏工具列，手機版需在閱讀頁重新載入一次才會生效</td>
            </tr>
            <tr>
                <td><a href="https://komiic.com/">Komiic</a></td>
                <td>有限制連線數，最多只能同時載5話</td>
            </tr>
            <tr>
                <td><a href="http://www.manmanju.com/">漫漫聚</a></td>
                <td><a href="http://m.manmanju.com/">m.manmanju.com</a>，閱讀頁添加了下一話鏈接</td>
            </tr>
            <tr>
                <td><a href="http://manhua.kukudm.com/">KuKu动漫</a></td>
                <td><a href="http://m.ikukudm.com/">m.ikukudm.com</a>，閱讀頁添加了下一話鏈接</td>
            </tr>
            <tr>
                <td><a href="https://www.fffdm.com/manhua/">风之动漫</a></td>
                <td>直接點進閱讀頁需要重要重新載入，建議新分頁開啟，閱讀頁添加了下一話鏈接</td>
            </tr>
            <tr>
                <td><a href="https://www.dagumanhua.net/">大古漫画</a></td>
                <td><a href="https://m.dagumanhua.net/">m.dagumanhua.net</a>，閱讀頁添加了下一話鏈接</td>
            </tr>
            <tr>
                <td><a href="https://dogemanga.com/">漫畫狗</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://manga.bilibili.com/">哔哩哔哩漫画</a></td>
                <td></td>
            </tr>
            <tr>
                <td><a href="https://www.colamanhua.com/">COLAMANHUA</a></td>
                <td>方向鍵上下章，需手動觸發載入全部圖片，下載只支援較舊的頁面，blob加密?下載需使用Picviewer CE+</td>
            </tr>
            <tr>
                <td><a href="https://manwa.me/">漫蛙</a></td>
                <td>uBlock加信任名單<pre>https://manwa.me/chapter/*</pre>
閱讀頁去廣告無提示、方向鍵上下章、向下滾動隱藏工具列、更新頁自動載入更多、目錄展開全部章節，blob加密?下載需使用Picviewer CE+</td>
            </tr>
            <tr>
                <td><a href="https://m.happymh.com/">嗨皮漫畫</a></td>
                <td>閱讀、展開目錄、自動點擊載入、漫畫鏈接新分頁打開，預設關閉</td>
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
                <td><a href="https://m.dmzj.com/">动漫之家M</a></td>
                <td><a href="https://m.idmzj.com/">m.idmzj.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.qiman59.com/">奇漫屋</a></td>
                <td><a href="http://m.qiman59.com/">m.qiman59.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.mhxqiu2.com/">漫画星球</a></td>
                <td><a href="http://m.mhxqiu2.com/">m.mhxqiu2.com</a>，預設關閉</td>
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
                <td><a href="http://www.manhuadb.com/">漫画DB</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.manhuagui.com/">Manhuagui看漫画</a></td>
                <td><a href="https://m.manhuagui.com/">m.manhuagui.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.baozimh.com/">包子漫画</a></td>
                <td>閱讀、展開目錄、漫畫鏈接新分頁打開，預設關閉</td>
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
                <td><a href="https://www.cartoonmad.com/">動漫狂</a></td>
                <td><a href="https://www.cartoonmad.com/m/">動漫狂M</a>，預設關閉</td>
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
                <td><a href="http://www.guoman8.cc/">国漫吧</a></td>
                <td><a href="http://m.wuqimh.net/">m.guoman8.cc</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.wuqimh.net/">57漫画网</a></td>
                <td><a href="http://m.wuqimh.net/">m.wuqimh.net</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.acgud.com/">亲亲漫画</a></td>
                <td><a href="http://m.acgud.com/">m.acgud.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.gufengmh.com/">古风漫画网</a></td>
                <td><a href="https://m.gufengmh.com/">m.gufengmh.com</a>，預設關閉</td>
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
                <td><a href="https://www.ymh1234.com/">漫画1234</a></td>
                <td><a href="https://m.ymh1234.com/">m.ymh1234.com</a>，預設關閉</td>
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
                <td><a href="https://www.qwmanhua.com/">蔷薇漫画</a></td>
                <td><a href="https://m.qwmanhua.com/">m.qwmanhua.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.zuimh.com/">最漫画</a></td>
                <td><a href="https://m.zuimh.com/">m.zuimh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.imitui.com/">爱米推漫画</a></td>
                <td><a href="https://m.imitui.com/">m.imitui.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.xlsmh.com/">下拉式漫画</a></td>
                <td><a href="https://m.xlsmh.com/">m.xlsmh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.dmhua8.com/">漫画吧</a></td>
                <td><a href="https://m.dmhua8.com/">m.dmhua8.com</a>，預設關閉</td>
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
                <td><a href="https://www.qimhua.com/">奇奇漫画</a></td>
                <td><a href="https://m.qimhua.com/">m.qimhua.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.yxtun.com/">悠闲漫画</a></td>
                <td><a href="https://m.yxtun.com/">m.yxtun.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.bukamh.com/">不卡漫画</a></td>
                <td><a href="https://m.bukamh.com/">m.bukamh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.duoximh.com/main/recent/">多熙漫画</a></td>
                <td><a href="https://m.duoximh.com/update/">m.duoximh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.laimanhua8.com/">来漫画</a></td>
                <td><a href="https://m.laimanhua8.com/">m.laimanhua8.com</a>，預設關閉，2023/05/07 blocked?</td>
            </tr>
            <tr>
                <td><a href="https://www.qmiaomh.com/">奇妙漫画</a></td>
                <td><a href="https://m.100mhl.com/">m.100mhl.com</a>，預設關閉</td>
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
                <td><a href="https://www.mhua5.com/">漫画屋</a></td>
                <td><a href="https://www.manhw.com/">www.manhw.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.360mh.cc/">360漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.mhzj54.com/">漫画之家</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.bingmh.com/">布丁漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.manshiduo.net/">漫士多</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.aiguoman.com/">爱国漫</a></td>
                <td><a href="https://m.aiguoman.com/">m.aiguoman.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.77mh.xyz/">新新漫画</a></td>
                <td><a href="https://m.77mh.xyz/">m.77mh.xyz</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.gaonaojin.com/">仙漫网</a></td>
                <td><a href="https://m.gaonaojin.com/">m.xianmanwang.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.dashumanhua.com/">大树漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://godamanga.com/">GODA漫画</a></td>
                <td><a href="https://cn.godamanga.art/">cn.godamanga.art</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://baozimh.org/">包子漫畫</a></td>
                <td><a href="https://hi.godamanga.com/">hi.godamanga.com</a>，<a href="https://godamanga.art/">godamanga.art</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://mh5.tw/">漫畫屋</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.qiximh2.com/">七夕漫画</a></td>
                <td><a href="http://m.qiximh2.com/">m.qiximh2.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.17fuman.com/">爱漫之家</a></td>
                <td><pre>www2.17fuman.com，www.fumanhua-1.com，www.fumanhua-2.com，www.fumanhua-3.com，www2.fumanhua-1.com，m.fumanhua-1.com，m.fumanhua44.com，m.fumanhua66.com，m.fumanhua77.com，m1.fumanhua-1.com，m1.fumanhua44.com，m1.fumanhua66.com，m1.fumanhua77.com</pre>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.73mh.net/">73漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.733.so/">733动漫</a></td>
                <td><a href="https://m.733.so/">m.733.so</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.mhko.net/">漫画库</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.bengou.co/">笨狗漫画</a></td>
                <td><a href="https://m.bengou.co/">m.bengou.co</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.kukuwumh.com/">酷酷屋</a></td>
                <td><a href="http://m.kukuwumh.com/">m.kukuwumh.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.mh160.cc/">漫画160</a></td>
                <td><a href="http://m.mh160.cc/">m.mh160.cc</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.omyschool.com/">木马漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.szcdmj.com/">砂之船动漫家</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.xuerenmanhua.com/">雪人漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://manhua666.com/">漫画牛</a></td>
                <td><a href="https://www.manhua666.com/">www.manhua666.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://manhuatai.org/">漫画台</a></td>
                <td><a href="https://www.manhuatai.org/">www.manhuatai.org</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.haoman6.com/">好漫6</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://haoman8.com/">好漫8</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.2animx.com/">二次元動漫</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="http://www.kumw9.com/">酷漫屋</a></td>
                <td><a href="http://m.kumw9.com/">m.kumw9.com</a>，預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://kanbook.net/">快岸漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.kuaikanmanhua.com/">快看漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://www.kanman.com/">看漫画</a></td>
                <td>預設關閉</td>
            </tr>
            <tr>
                <td><a href="https://ac.qq.com/">腾讯漫画</a></td>
                <td>預設關閉</td>
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
                <td>m.4khd.com</td>
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
