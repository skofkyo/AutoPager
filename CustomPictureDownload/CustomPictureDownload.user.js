// ==UserScript==
// @name               怠惰輔助&聚圖&下載
// @name:en            CustomPictureDownload
// @name:zh-CN         怠惰輔助&聚图&下载
// @name:zh-TW         怠惰輔助&聚圖&下載
// @version            1.1.11
// @description        專注於寫真、H漫、漫畫的網站，目前規則數400+，透過選擇器圈選圖片，能聚集分頁的所有圖片到當前頁面裡，也能進行下載壓縮打包，如有下一頁元素能做到自動化下載。
// @description:en     Custom Picture Download
// @description:zh-CN  专注于写真、H漫、漫画的网站，目前规则数400+，透过选择器圈选图片，能聚集分页的所有图片到当前页面里，也能进行下载压缩打包，如有下一页元素能做到自动化下载。
// @description:zh-TW  專注於寫真、H漫、漫畫的網站，目前規則數400+，透過選擇器圈選圖片，能聚集分頁的所有圖片到當前頁面裡，也能進行下載壓縮打包，如有下一頁元素能做到自動化下載。
// @author             tony0809
// @match              *://*/*
// @exclude            *hcaptcha*
// @exclude            *iframe*
// @exclude            *addthis*
// @exclude            *www.youtube.com*
// @exclude            *video.ngamgaixinh.us*
// @exclude            *www.facebook.com/*/plugins/*
// @exclude            *18p.fun/ForInject/SetHistory/*
// @icon               data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAtFBMVEVEREAAAABEREBEREAuuaIzqpkvr58yiHgzhnY6kYM7mYI4kog4s6A2tpo0r544ooo2nY40sJw0sp00rZg1sJw0sZ0zsp01sZw0sZw0rZk1sJw1sZw1rZk0sp00rpk1sp01sZs1rpk1rpk0sp01spw1sJ00rZo1rZk1rpo0r5k0sJw0sZ01r5o0sZw0rpk0sp01sZ01sJw1spw1r5k1sp01sZw0sZ01sZw1rpk1sp01sZw1r5pUzpTcAAAAOXRSTlMAAAUGCw8QERIUFxgbHB0hIieqq6yvtLa3vb/AwMHCxMXFxsfIyc3Oz+zt7vDx8fL4+Pn5+vr7/v7AEFI4AAABR0lEQVR42qWT11bDMAxApbhsmm5KKVD2KiUQwpD1///FkZcSmh4e8FOsex3LsgymPy6ISkRyA4FlWMRXomIyQOg/SbyKAmSOE2Ip02UOYxf/DILNjOOEWLnAEAqio0MMAzJjTAZh1p0SrYCIuu0cMZc9JbENXLa1NWGdI1nWeQuXGPzBTdzC8ws52UI5MwchrA/VTOuTEP9fFyTG7E+R9q8JLsbW1UHzU8HHrCuU1fyToDlB43xRqMUgfc+/KA77fZrWSH/47zPlzOcpJxG8u32r/OEg5SRCqO/WTeT3+5oTuP4LxrXnd5F7waZ+wM5c+NVeujMRrDYMYueE+VK5E5r3uzOb7TbvHH7f/1pP/L8nU9u38Nwyy8OZdjfwY+ZnmPinp28y3mglNeERDJYy/9A3GYVS+GMPMB+uyL67/qO68Mb8MurBD7foVTtvIbtnAAAAAElFTkSuQmCC
// @license            MIT
// @namespace          https://greasyfork.org/users/20361
// @grant              GM_xmlhttpRequest
// @grant              GM.xmlHttpRequest
// @grant              unsafeWindow
// @require            https://cdn.jsdelivr.net/npm/jszip@3.9.1/dist/jszip.min.js
// @require            https://cdn.jsdelivr.net/npm/jquery@3.7.0/dist/jquery.min.js
// ==/UserScript==

(async () => {
    "use strict";
    const options = {
        enable: 0, //0為白名單模式根據自訂義規則啟用，1為全局啟用
        icon: 1, //是否顯示左下圖示0關1開
        one: 0, //單線程下載0關1開
        default: "img[src]", //預設CSS/Xpath選擇器/javascript代碼
        //default: "js;return [...document.images];",
        zip: true, //true圖片下載後壓縮打包，false批量下載圖片，無法全自動下載
        autoDownload: 0, //站點全局自動下載開關0關1開，需要customData也有autoDownload
        autoDownloadCountdown: 5, //有NEXT時自動下載的延遲秒數
        comic: 0, //1，忽視漫畫站點開關選項，啟用所有漫畫類規則
        doubleTouchNext: true //true開啟false關閉，觸控裝置雙擊前往下一頁
    };
    const siteUrl = location.href;
    let siteData = {};
    let siteJson = null;
    let globalImgArray = [];
    let customTitle = null;
    let downloading = false;
    let errorNum = 0;
    //const loading_bak = "data:image/png;base64,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";
    //const loading_bak = "https://i.imgur.com/TBOypzv.gif"; //透明灰圈 800*800
    //const loading_bak = "https://i.imgur.com/YCdwBG7.gif"; //白底藍圈 500*500
    //const loading_bak = "https://i.imgur.com/D6ltcWH.gif"; //灰底灰圈 800*600
    //灰底灰圈 800*600
    const loading_bak = "data:image/gif;base64,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83uGje9+g7TK7znAs/1N/3BQTmbMt6lvwRde10/Xu89+ZrjEJ07xilv84hjPuMY3zvGOe/zjIA+5yEdO8pKb/OQoT7nKV87ylrv85TCPucxnTvOa2/zmOM+5znfO8577/OdAD7rQh070ohv96EhPutKXzvSmO/3pUI+61KdO9apb/epYz7rWt871rnv962APu9jHTvaym/3saE+72tfO9ra7/e1wj7vc5073utv97njPu973zve++/3vgA+84AdP+MIb/vCIT7ziF8/4xjv+8ZCPvOQnT/nKW/7ymM+85jfP+c57/vOgD73oR0/60pv+9KhPvepXz/rWu/71sI+97GdP+9rb/va4z73ud8/73pH7/vfAD77wh0/84hv/+MhPvvKXz/zmO//50I++9KdP/epb//rYz772t8/97nv/++APv/jHT/7ym//86E+/+tfP/va7//3wj7/850//+tv//vjPv/73z//++///ABiAAjiABFiABniACJiACriADNiADviAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCFxEIACH5BAUKAGgALCwBjAACATABAAf/gGiCg4SFhoeIiYqLjI2JAQYGHhgaEC8FHBQfOhaOnp+goaKjpKWmp6iKAausra0GNDEUJ52ptre4ubq7vGiuv8CrGCksG2e9yMnKy8yOwc/ABjgsHc3W19jZo9DcwCsiJ9ri4+TW3ee/IyI65e3u76Xo8q4YLtXw+Pn6gvP9rS8Dju0bSBCbv4PCKCwoyLAhL4QQDXCQ4LCixXgQIT6YeLGjx0UZQz7wUeujyY8hUxpQwOCkS4spY6748LJmwZg4SdyzyfMdTpwPXLTsSXTcz58oMhRdavAozgY+hjKdiszpURoIqGrdlaJECRIQNHhoYBXhAyBb0yKTkOGDghgQ/wyURRdDqtq7vDp8EEGD7NxgNC7gHYxsgQwRK/7+8mCDsONeHShAUMyqAYjHmHd1UJCYso/MoHOdKPBAcQm7oVOXsrDDw18SC1XLLsUABIa5EErO3g2q9m2rKCjyHv6JAQXXTjUIJ86ckQQYfpHqbk790IbJRyHErs690BkKpX/mQN29+wUSR1OUXz/ojILoKTmwn5+hc0wW89lbwPG0cf71O8AHkQc7/cfdAOGFhMJ2BlaXwQgxFdBgeR3YlxFaE+pTQgExiLADCwNkwKA1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";
    //const loading_bak = "https://i.imgur.com/HsUzXGD.gif"; //灰底灰點 200*200
    //const loading_bak = "https://i.imgur.com/sw3IVzK.gif"; //透明灰塊 240*240
    //const loading_bak = "https://i.imgur.com/0acxdnF.gif"; //透明灰點 240*240
    //自定義站點規則
    const customData = [{
        name: "小黃書/8色人體攝影 xchina.co/8se.me", //按數字鍵1、Enter插入圖片(手動模式)，按0、Enter、Enter壓縮打包下載
        enable: 0, //0此規則禁用 1啟用
        reg: /(xchina|8se)\.(co|me)\/photo\/id-\w+\.html/, //網址正則匹配
        include: ".photos>a",
        imgs: () => {
            let numP = fun.geT("div[target][title]").match(/\d+/)[0];
            let max = Math.ceil(numP / 18);
            return fun.getImg("img.cr_only", max, 2, ["_600x0", ""]); //xhr併發請求抓取所有頁面的圖片元素
        },
        insertImg: ["//div[div[@class='photos']]", 1], //清空元素內容把所有圖片插入到此元素 0手動插入模式 1自動插入模式 2自動插入Lazyloading模式
        customTitle: () => { //js代碼自訂壓縮檔和資料夾名稱
            let s = document.title.split("-");
            let title = "";
            if (/未分/.test(s[1])) {
                title += s[0].trim()
            } else {
                title += s[1].trim() + " - ";
                title += s[0].trim()
            }
            return title;
        },
        css: "body{overflow:unset!important}.photos>div.item,.jquery-modal.blocker.current,.slider-ad,.article.ad,.pager>.tips,body>footer~*:not([id^='pv-']):not([class^='pv-']):not(.pagetual_tipsWords):not(.customPicDownloadMsg):not(#customPicDownload),.photoMask,.banner_ad{display: none!important;}",
        category: "nsfw2"
    }, {
        name: "小黃書/8色人體攝影 xchina.co/8se.me", //xhr翻頁模式，翻完所有預覽圖後，立刻在預覽縮圖下面插入全部大圖
        enable: 0,
        reg: /(xchina|8se)\.(co|me)\/photo\/id-\w+\.html/,
        include: ".photos>a",
        imgs: async () => {
            await fun.getNP(".photos>a", ".pager a[current=true]+a:not(.next)", null, ".pager"); //xhr翻頁模式聚集所有預覽圖
            return [...fun.gae(".cr_only")].map(e => e.src.replace("_600x0", ""));
        },
        //insertImg: ["//div[div[@class='photos']]", 1],
        insertImg: [
            ["//div[div[@class='photos']]/*[last()]", 2], 2
        ],
        go: 1,
        customTitle: "let s=document.title.split('-');let title='';if(/未分/.test(s[1])){title+=s[0].trim()}else{title+=s[1].trim()+' - ';title+=s[0].trim()}return title;",
        css: "body{overflow:unset!important}.photos>div.item,.jquery-modal.blocker.current,.slider-ad,.article.ad,.pager>.tips,body>footer~*:not([id^='pv-']):not([class^='pv-']):not(.pagetual_tipsWords):not(.customPicDownloadMsg):not(#customPicDownload),.photoMask,.banner_ad{display: none!important;}",
        category: "nsfw2"
    }, {
        name: "小黃書/8色人體攝影 xchina.co/8se.me", //xhr翻頁模式，聚集所有預覽圖，手動插入全部大圖，圖片量是幾百張的比較不會卡，不插大圖也能下載
        enable: 0,
        reg: /(xchina|8se)\.(co|me)\/photo\/id-\w+\.html/,
        include: ".photos>a",
        init: "fun.getNP('.photos>a','.pager a[current=true]+a:not(.next)',null,'.pager');",
        imgs: async () => {
            return [...fun.gae("img.cr_only")].map(e => e.src.replace("_600x0", ""));
        },
        insertImg: ["//div[div[@class='photos']]", 0],
        customTitle: "let s=document.title.split('-');let title='';if(/未分/.test(s[1])){title+=s[0].trim()}else{title+=s[1].trim()+' - ';title+=s[0].trim()}return title;",
        css: "body{overflow:unset!important}.photos>div.item,.jquery-modal.blocker.current,.slider-ad,.article.ad,.pager>.tips,body>footer~*:not([id^='pv-']):not([class^='pv-']):not(.pagetual_tipsWords):not(.customPicDownloadMsg):not(#customPicDownload),.photoMask,.banner_ad{display: none!important;}",
        category: "nsfw2"
    }, {
        name: "小黃書/8色人體攝影 xchina.co/8se.me",
        enable: 1,
        reg: /(xchina|8se)\.(co|me)\/photo\/id-\w+\.html/,
        include: ".photos>a",
        imgs: async () => {
            let numP = fun.geT("div[target][title]").match(/\d+/)[0];
            let max = Math.ceil(numP / 18);
            if (max > 1 && [...fun.gae(".photos>a")].length < 19) {
                let links = [];
                let url = location.href.replace(".html", "");
                for (let i = 2; i <= max; i++) {
                    links.push(url + "/" + i + ".html");
                }
                await fun.getEle(links, ".photos>a", [".photos", 0], ".pager,.photos>.item,.photos>.photoMask");
            }
            return [...fun.gae("img.cr_only")].map(e => e.src.replace("_600x0", ""));
        },
        insertImg: [
            ["//div[div[@class='photos']]/*[last()]", 2], 2
        ],
        go: 1,
        customTitle: "let s=document.title.split('-');let title='';if(/未分/.test(s[1])){title+=s[0].trim()}else{title+=s[1].trim()+' - ';title+=s[0].trim()}return title;",
        css: "body{overflow:unset!important}.photos>div.item,.jquery-modal.blocker.current,.slider-ad,.article.ad,.pager>.tips,body>footer~*:not([id^='pv-']):not([class^='pv-']):not(.pagetual_tipsWords):not(.customPicDownloadMsg):not(#customPicDownload):not(a),.photoMask,.banner_ad{display: none!important;}",
        topButton: true,
        category: "nsfw2"
    }, {
        name: "JavSX.com https://w3.javsx.com/photos.html",
        reg: /w3\.javsx\.com\/photos\/[\w-]+\.html$/,
        imgs: async () => {
            try {
                let max = fun.ge("//a[text()='Last']").href.match(/\d+$/)[0];
                let links = [];
                for (let i = 2; i <= max; i++) {
                    links.push(location.href + "?page=" + i);
                }
                await fun.getEle(links, ".col-photos>a", [".col-photos", 0], ".pagination");
                fun.gae("img[data-src]").forEach(e => {
                    e.src = e.dataset.src;
                });
            } catch (e) {}
            //await fun.getNP(".col-photos>a", ".PageNav>a[style]+a", null, ".PageNav");
            return [...fun.gae("img[data-src]")].map(e => e.dataset.src.replace(/resize=[^&]+&/, ""));
        },
        insertImg: [
            [".col-photos", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('h1.title');",
        css: ".col-photos{margin-bottom:60px}.pagination{margin-top:0px!important}",
        category: "nsfw2"
    }, {
        name: "Nlegs/HoneyLeg www.nlegs.com www.honeyleg.com", //無法完全應對此站的人機驗證，請使用專用腳本 https://greasyfork.org/scripts/463123
        enable: 0,
        reg: /(www\.nlegs\.com|www.honeyleg.com)\/(girls|article)\//,
        init: () => {
            let loopFind = setInterval(() => {
                fun.ge(".pagination>li:last-child>a") && (clearInterval(loopFind), fun.getNP("//div[a/div[contains(@style,'thumb') and span]]", "li.active+li>a", null, ".pagination"))
            }, 100);
        },
        imgs: "js;return fun.getImgA('.img-res','a[href*=image]',1);",
        insertImg: ["//div[div[@class='col-md-2 col-sm-4 col-xs-12']]", 0],
        customTitle: "return fun.geT('strong');",
        one: 1,
        fetch: 1,
        //css: ".col-md-2.col-sm-4.col-xs-12{width:1000px!important;height:auto!important;display:block!important;margin:0 auto !important;float: none!important;}",
        category: "nsfw2"
    }, {
        name: "24tupian www.24tupian.org", //無法應對此站的人機驗證，請使用專用腳本 https://greasyfork.org/scripts/464745
        enable: 0,
        reg: /www\.24tupian\.org\/hd2\/\w+\.html/i,
        init: "fun.getNP('.gtps.fl li', '.page.ps>a.on+a[href$=html]', null, '.page.ps')",
        imgs: "js;return fun.getImgA('#imgshow img[alt]', '.gtps.fl a', 1);",
        //imgs: "js;const get=async()=>{await fun.getNP('.gtps.fl li','.page.ps>a.on+a[href$=html]',null,'.page.ps');return fun.getImgA('#imgshow img[alt]','.gtps.fl a',1)};return get();",
        insertImg: [".gtps.fl", 0],
        customTitle: "return fun.geT('.gtitle1 h1');",
        css: ".gtps .CustomPictureDownloadImage{width:auto!important}",
        category: "nsfw1"
    }, {
        name: "JKF www.jkforum.net",
        reg: /www\.jkforum\.net\/thread/,
        imgs: "img[id^=aimg]",
        customTitle: "return fun.title('-',1);",
        category: "nsfw2"
    }, {
        name: "草榴 www.t66y.com cl.6962x.xyz",
        reg: /\/htm_data\/\d+\/\d+\/\d+\.html/,
        include: "img[ess-data]",
        imgs: "img[ess-data]",
        customTitle: () => {
            return fun.geT("h4.f16").replace(/\[\d+P\]$/i, "");
        },
        category: "nsfw2"
    }, {
        name: "X成人论坛 xbbs.me",
        reg: /xbbs\.me\/thread\/id-\w+\.html$/,
        imgs: () => {
            return [...fun.gae(".xbbs-thread-image img[data]")].map(e => e.getAttribute("data"));
        },
        customTitle: () => {
            return fun.geT(".article>h1").trim();
        },
        category: "nsfw2"
    }, {
        name: "驲哔么 ribi.me",
        reg: /ribi\.me\/text\/\d+\/1$/,
        imgs: ".img-fluid",
        customTitle: () => {
            return fun.attr(".img-fluid", "alt").replace(/\[福利COS\]\s?/, "");
        },
        category: "nsfw1"
    }, {
        name: "CoserBOX - 免積分(需要有正確的第一張圖) acg.coserbox.net acg.coser.love coserbox.org  onlyfans.cx picacg.org loli.pub",
        reg: /((coserbox|picacg)\.org|acg\.coser\.love|onlyfans\.cx|loli\.pub|(acg\.)?coserbox\.net)\/image\/\w+(\.html)?/i,
        exclude: "#lightgallery img[data-src][width='540'][height='382']",
        imgs: () => {
            let ps = fun.geT(".list>li:nth-child(2)").match(/\d+/)[0];
            let img = fun.ge("img.lazyload");
            let m = img.dataset.src.match(/^(.+\/)(\d+)(\.[a-z]{3,4})$/i);
            let path = m[1];
            let start = m[2];
            let ex = m[3];
            let arr = [];
            if (start == 0) {
                for (let i = start; i < ps; i++) {
                    arr.push(path + i + ex)
                }
            } else if (start == 1) {
                for (let i = start; i <= ps; i++) {
                    arr.push(path + i + ex)
                }
            } else if (start > 1) {
                for (let i = start; i < (parseInt(start) + parseInt(ps)); i++) {
                    arr.push(path + i + ex)
                }
            }
            return arr;
        },
        insertImg: ["#lightgallery", 2],
        customTitle: "return fun.geT('h1');",
        css: ".plan.plan--best,.ad_card{display:none!important}.article__content img{margin-bottom:2px!important;border-radius:0!important}",
        category: "nsfw2"
    }, {
        name: "优丝库HD - 免VIP yskhd.com",
        reg: /yskhd\.com\/archives\/\d+/i,
        exclude: "#menu-item-57917[class*=current]",
        imgs: () => {
            return [...fun.gae(".article-content img[loading]")].map(e => e.src.replace("-285x285", ""));
        },
        insertImg: [
            [".article-act", 1], 2
        ],
        go: 1,
        autoDownload: [0],
        next: ".article-nav-prev>a",
        prev: ".article-nav-next>a",
        customTitle: () => {
            return fun.geT(".article-title").replace(/\s?\[\d+P\]/i, "");
        },
        category: "nsfw1"
    }, {
        name: "优丝库HD - 日韓免VIP yskhd.com",
        reg: /yskhd\.com\/archives\/\d+/i,
        include: "#menu-item-57917[class*=current]",
        imgs: () => {
            return [...fun.gae(".article-content img[loading]")].map(e => e.src.replace("-285x285", "-scaled"));
        },
        insertImg: [
            [".article-act", 1], 2
        ],
        go: 1,
        autoDownload: [0],
        next: ".article-nav-prev>a",
        prev: ".article-nav-next>a",
        customTitle: () => {
            return fun.geT(".article-title").replace(/\s?\[\d+P\]/i, "");
        },
        category: "nsfw1"
    }, {
        name: "洛花秀 免VIP luohuaxiu.com",
        reg: /luohuaxiu\.com\/archives\/\d+/,
        exclude: ".single-video",
        imgs: () => {
            let arr = [];
            let max = fun.gae(".gallery-item").length;
            let url = fun.ge(".gallery-item a").href;
            let m = url.match(/^(.+\/)([\w-]+)(\.[a-z]{3,4})$/i);
            let path = m[1];
            let fileName = m[2];
            let ex = m[3];
            let blur = fun.ge(".gallery-blur-item");
            if (blur && fileName.length <= 4) {
                let n = url.match(/(\d+)\.[a-z]{3,4}$/)[1];
                for (let i = parseInt(n); i < (parseInt(n) + parseInt(max)); i++) {
                    arr.push(decodeURI(path + String(i).padStart(fileName.length, "0") + ex))
                }
            } else if (blur && fun.ge(".size-thumbnail[src*='-285x180']")) {
                arr = [...fun.gae(".size-thumbnail[src*='-285x180']")].map(e => e.src.replace("-285x180", ""))
            } else if (blur && fun.ge("img[src*='?width=285']")) {
                arr = [...fun.gae("img[src*='?width=285']")].map(e => decodeURI(e.src.replace(/\?width=285.+/, "")))
            } else if (blur) {
                setTimeout(() => {
                    fun.show("此頁不支援免VIP", 5000)
                }, 1100)
                return arr
            } else {
                arr = [...fun.gae(".gallery-item a")].map(e => e.href)
            }
            return arr
        },
        insertImg: [
            [".article-shares", 2], 2
        ],
        go: 1,
        autoDownload: [0],
        next: ".article-nav-prev a",
        prev: ".article-nav-next a",
        customTitle: "return fun.geT('.article-title');",
        category: "nsfw1"
    }, {
        name: "24FA https://www.24fa.com/c49.aspx",
        reg: /(www\.)?\d{2,3}(m|w|faw|fa|aa)?\.[a-z]{2,4}\/m?n\w+\.aspx/,
        init: "document.onkeydown=null",
        imgs: () => {
            return fun.getImgA("#content img", ".pager a:not([title])");
        },
        insertImg: ["#content", 1],
        next: ".prevNews>a",
        prev: ".nextNews>a",
        customTitle: "return fun.geT('h1');",
        css: "#footer~div[id][class]{display:none!important}",
        category: "nsfw2"
    }, {
        name: "Hit-x-Hot www.hitxhot.org www.depvailon.com pic.yailay.com nungvl.net",
        reg: /(www\.hitxhot\.org|pic\.yailay\.com)\/(gallerys|articles)\/(?!\?page=|\?m=|hot|top|tag)\w+\.html$|www\.depvailon\.com\/(?!\?page=|\?m=).+\.html$|nungvl\.net\/gallerys\/\d+\.cg$/,
        imgs: () => {
            let max;
            try {
                max = fun.geT("h1,h2").match(/\d+$/)[0]
            } catch (e) {
                max = 1
            }
            return fun.getImg(".contentme img,.contentme2 img", max);
        },
        insertImg: [".contentme,.contentme2", 1],
        customTitle: "return document.title.split('|')[0].slice(10).trim()",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "nsfw2"
    }, {
        name: "Hit-x-HotM www.hitxhot.org www.depvailon.com pic.yailay.com nungvl.net",
        reg: /(www\.hitxhot\.org|pic\.yailay\.com)\/(gallerys|articles)\/(?!\?page=|\?m=|hot|top|tag)\w+\.html\?m=1$|www\.depvailon\.com\/(?!\?page=|\?m=).+\.html\?m=1$|nungvl\.net\/gallerys\/\d+\.cg\?m=1$/,
        imgs: () => {
            let max;
            try {
                max = fun.geT("h1,h2").match(/\d+$/)[0]
            } catch (e) {
                max = 1
            }
            return fun.getImg(".contentme img,.contentme2 img", max, "8");
        },
        insertImg: [".contentme,.contentme2", 1],
        customTitle: "return document.title.split('|')[0].slice(10).trim()",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "nsfw2"
    }, {
        name: "新闻吧 https://www.xinwenba.net/web/meinv/ m.xwbar.com",
        reg: /(www\.xinwenba\.net|m\.xwbar\.com)\/plus\/view-\d+-\d+\.html/,
        imgs: () => {
            let max;
            try {
                max = fun.geT(".paging>li>a").match(/\d+/)[0]
            } catch (e) {
                max = 1
            }
            return fun.getImg(".main img", max, "5")
        },
        insertImg: [".view_img", 1],
        autoDownload: [0],
        next: ".pre_next li:first-child a",
        prev: ".pre_next li:last-child a",
        customTitle: "return fun.geT('.title>h1');",
        category: "nsfw1"
    }, {
        name: "留园酷 https://www.cool18.com/",
        reg: /(www\.cool18\.com\/bbs\d*\/index\.php\?app=forum&act=threadview&tid=\d+|wap\.cool18\.com\/index\.php\?app=index&act=view&cid=\d+)/,
        imgs: "img[mydatasrc],#shownewsc img,.show_content img",
        customTitle: () => {
            return fun.geT(".show_content b,h1.article-tit").replace(/(\s?\.?)?\s?\(\d+P\)\s?/i, "");
        },
        css: ".img_ad_list{display:none!important}",
        category: "nsfw2"
    }, {
        name: "ACG 资源网 cydmyz.com",
        reg: /cydmyz\.com\/\d+\.html/i,
        imgs: "img[data-lazy-src]",
        autoDownload: [0],
        next: "a.entry-page-prev",
        prev: "a.entry-page-next",
        customTitle: "return fun.geT('.entry-title');",
        category: "nsfw2"
    }, {
        name: "秀人集 www.xiuren5.com www.xiuren5.vip www.xiuren5.cc",
        reg: /www\.xiuren\d+\.\w+\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".page a:last-child", 2);
            return fun.getImg('.content>p img[alt]', max, 3);
            //return fun.getImgO(".content>p img[alt]", max, 3, [null, null], 0, ".page", 0);
        },
        insertImg: ["//div[p[img[@alt and @title]]]", 2],
        autoDownload: [0],
        next: "//span[contains(text(),'下一篇')]/a[contains(@href,'html')]",
        prev: "//span[contains(text(),'上一篇')]/a[contains(@href,'html')]",
        customTitle: "return fun.geT('.item_title>h1');",
        //one: 1,
        css: ".content br{display:none!important}",
        category: "nsfw1"
    }, {
        name: "秀人美女網 www.xrmnw.xyz www.xrmn01.vip",
        reg: /(www\.xrmnw\.\w+|www.xrmn\d+.\w+)\/\w+\/\d+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".page a:last-child", 2);
            return fun.getImg('.content p img[alt]', max, 3);
            //return fun.getImgO(".content p img[alt]", max, 3, [null, null], 0, ".page", 0);
        },
        insertImg: ["//div[p[img[@alt]]]", 2],
        autoDownload: [0],
        next: "//span[contains(text(),'下一篇')]/a[contains(@href,'html')]",
        prev: "//span[contains(text(),'上一篇')]/a[contains(@href,'html')]",
        customTitle: () => {
            return fun.geT(".item_title>h1").replace(/\d+P$/i, "");
        },
        //one: 1,
        css: ".item_title>a,.content br{display:none!important}",
        category: "nsfw1"
    }, {
        name: "精品美女吧 www.jpmn8.cc",
        reg: /www\.jpmn8\.\w+\/\w+\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".pagination1 a:last-child", 2);
            return fun.getImg('.content p img[alt]', max, 3);
            //return fun.getImgO(".content p img[alt]", max, 3, [null, null], 0, ".pagination1", 0);
        },
        insertImg: ["//div[p[img[@alt and @title]]]", 2],
        autoDownload: [0],
        next: ".article-nav-next>a[href$=html]",
        prev: ".article-nav-prev>a[href$=html]",
        customTitle: () => {
            return fun.geT(".article-title").replace(/\d+P$/i, "");
        },
        //one: 1,
        category: "nsfw1",
        css: ".content br{display:none!important}"
    }, {
        name: "爱美女网 www.imn5.net www.imn5.cc",
        reg: /www\.imn5\.\w+\/\w+\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".page a:last-child", 2);
            return fun.getImg('.imgwebp p img[alt]', max, 3);
            //return fun.getImgO(".imgwebp p img[alt]", max, 3, [null, null], 0, ".page", 0);
        },
        insertImg: ["//div[p[img[@alt]]]", 2],
        autoDownload: [0],
        next: "//span/b[contains(text(),'下一篇')]/a[contains(@href,'html')]",
        prev: "//span/b[contains(text(),'上一篇')]/a[contains(@href,'html')]",
        customTitle: () => {
            return fun.geT(".focusbox h1+div").replace(/\d+P$/i, "");
        },
        //one: 1,
        css: ".imgwebp br,img[src*='zz2.gif']{display:none!important}",
        category: "nsfw1"
    }, {
        name: "美人图 meirentu.cc",
        reg: /meirentu\.\w+\/pic\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".page a:last-child", 2);
            return fun.getImg('.content_left img[alt]', max, 5);
            //return fun.getImgO(".content_left img[alt]", max, 5, [null, null], 0, ".page", 0)
        },
        insertImg: [".content_left", 2],
        autoDownload: [0],
        next: "//span[contains(text(),'下一篇')]/a[contains(@href,'html')]",
        prev: "//span[contains(text(),'上一篇')]/a[contains(@href,'html')]",
        customTitle: () => {
            return fun.geT(".item_title>h1").replace(/\d+P$/i, "");
        },
        //one: 1,
        css: "img[alt]~br{display:none!important}",
        category: "nsfw1"
    }, {
        name: "极品性感美女 www.xgmn08.com",
        reg: /www\.xgmn\d+\.\w+\/\w+\/\w+\.html/i,
        imgs: () => {
            let max = fun.geT("a.current~*:last-child", 2);
            return fun.getImg('.article-content img[alt]', max, 3);
            //return fun.getImgO(".article-content img[alt]", max, 3, [null, null], 0, ".pagination", 0);
        },
        insertImg: ["//p[img[@alt]]", 2],
        autoDownload: [0],
        next: ".article-nav-next>a[href$=html]",
        prev: ".article-nav-prev>a[href$=html]",
        customTitle: () => {
            return fun.geT(".article-title").replace(/\d+p$/i, "");
        },
        //one: 1,
        css: ".article-header>a,.article-content br,img[src*='zz1.gif']{display:none!important}",
        category: "nsfw1"
    }, {
        name: "爱看美女网 www.ikmn.vip",
        reg: /www\.ikmn\d?\.\w+\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".pagebar>*:last-child", 2);
            return fun.getImg('.info-imtg-box img[alt]', max, 3);
            //return fun.getImgO(".info-imtg-box img[alt]", max, 3, [null, null], 0, ".pagebar", 0);
        },
        include: ".info-pagebar>a",
        insertImg: ["//p[img[@alt]]", 2],
        autoDownload: [0],
        next: ".info-next li:last-child a",
        prev: ".info-next li:first-child a",
        customTitle: () => {
            return fun.geT("h1").replace(/\d+p$/i, "");
        },
        //one: 1,
        category: "nsfw1"
    }, {
        name: "秀人图集 xiuren0.com",
        reg: /xiuren\d\.com\/\d+\.html/i,
        include: ".article-paging>*:last-child",
        init: () => {
            fun.remove("//p[img[@decoding and not(contains(@src,'/pic/'))]]")
        },
        imgs: () => {
            let max = fun.geT(".article-paging>*:last-child");
            return fun.getImg(".article-content img:not([src*='/pic/'])", max, "4");
        },
        insertImg: [
            [".article-paging", 1], 1
        ],
        next: ".article-nav-prev>a",
        prev: 1,
        customTitle: "return fun.geT('.article-title');",
        css: ".modown-ad{display:none!important}",
        category: "nsfw1"
    }, {
        name: "秀人图集 xiuren0.com",
        reg: /xiuren\d\.com\/\d+\.html/i,
        imgs: ".article-content img:not([src*='p.xiurenb.top'])",
        next: ".article-nav-prev>a",
        prev: 1,
        customTitle: "return fun.geT('.article-title');",
        category: "nsfw1"
    }, {
        name: "Xiutaku xiutaku.com Kostaku kostaku.art",
        reg: /(xiutaku\.com|kostaku\.art)\/\d+$/,
        init: () => {
            fun.remove(".search-form~*,.blog~*:not([class]),.pagination~*:not([class]):not(hr),.article.content~*:not([class]):not(hr),.bottom-articles~*")
        },
        imgs: () => {
            let max = fun.geT(".pagination-list>span:last-child");
            return fun.getImg(".article-fulltext img", max);
        },
        insertImg: [".article-fulltext", 1],
        customTitle: "return fun.geT('.article-header>h1');",
        category: "nsfw1"
    }, {
        name: "私图网 baoruba.com",
        reg: /baoruba\.com\/bb\d+\.html/i,
        imgs: "img[decoding]",
        customTitle: "return fun.title(' - 私图网');",
        category: "nsfw1"
    }, {
        name: "找套图 www.zhaotaotu.cc",
        reg: /www\.zhaotaotu\.cc\/thread-\d+\.htm/i,
        imgs: ".message>img:not(:first-of-type)",
        customTitle: () => {
            return fun.geT(".media-body>h4").replace(/\(\d+P\)/i, "");
        },
        category: "nsfw1"
    }, {
        name: "尤美图库 www.umeitu.com",
        reg: /www\.umeitu\.com\/img\/\d+\.html/,
        imgs: () => {
            let max = fun.geT(".stitle>h1>span").match(/\d+/)[0];
            return fun.getImg(".vipimglist img", max, 9)
        },
        insertImg: [".vipimglist", 2],
        customTitle: () => {
            return fun.title(" - 尤美图库", 1).replace(/\[\d+P\]/i, "");
        },
        css: ".sb.list2>li:nth-child(n+2):nth-child(-n+3){display:none!important}",
        category: "nsfw1"
    }, {
        name: "秀爱美女网 www.2mn.cc",
        reg: /www\.2mn\.cc\/mm\/\d+\.html/i,
        imgs: () => {
            let max;
            try {
                max = fun.ge(".page_navi a:last-child").href.split("_")[1].match(/\d+/)[0]
            } catch (e) {
                max = 1
            }
            return fun.getImg(".sg_img img", max, 9);
        },
        insertImg: [".sg_img", 2],
        customTitle: "return fun.geT('h1');",
        css: "#divpsg,.tujia{display:none!important}",
        category: "nsfw1"
    }, {
        name: "麻豆村 Cosplay https://madoucun.com/arttype/56.html",
        reg: /madoucun\.com\/artdetail-\d+.html/i,
        imgs: ".hl-article-box img",
        customTitle: "return fun.geT('.hl-article-title');",
        category: "nsfw2"
    }, {
        name: "Xiuren 秀人网 www.xiuren.org",
        reg: /www\.xiuren\.org\/.+\.html/i,
        imgs: "a[rel='gallery']:not([href*='html']",
        insertImg: [
            [".post p>a:not([title])", 2, ".post p>a[title],.post p>span"], 1
        ],
        customTitle: () => {
            return fun.geT("#title>h1").replace(/\d+p$/i, "").trim();
        },
        category: "nsfw2"
    }, {
        name: "微圖坊 www.v2ph.com www.v2ph.net www.v2ph.ru", //大尺度非VIP只能抓20~30張
        reg: /v2ph\.\w+\/album\/.+/i,
        include: ".photos-list",
        imgs: () => {
            let numP = fun.geT("dd:last-child").match(/\d+/)[0];
            let max = Math.ceil(numP / 10);
            return fun.getImgO(".album-photo img[alt]", max, 1, [null, null], 200, ".pagination", 0);
        },
        insertImg: [".photos-list", 2],
        customTitle: "return fun.geT('h1');",
        css: ".albums-list img,.photos-list img{opacity:1!important}",
        one: 1,
        category: "nsfw2"
    }, {
        name: "柠檬皮 www.cybesx.com",
        reg: /www\.cybesx\.com\/\d+\.html$/i,
        include: ".page-links",
        exclude: ".read-point-box",
        imgs: () => {
            let max;
            try {
                max = fun.geT(".page-links>a:last-child", 2)
            } catch (e) {
                max = 1
            }
            return fun.getImg(".single-content img", max, 7);
        },
        insertImg: [".single-content", 1],
        customTitle: "return fun.geT('h1.entry-title');",
        category: "nsfw1"
    }, {
        name: "柠檬皮 www.cybesx.com",
        reg: /www\.cybesx\.com\/\d+\.html$/i,
        include: ".single-content img",
        imgs: ".single-content img",
        customTitle: "return fun.geT('h1.entry-title');",
        category: "nsfw1"
    }, {
        name: "Cherryfans cherryfans.cc",
        reg: /cherryfans\.cc\/[^/]+\/$/i,
        imgs: ".entry-content img[data-src]",
        insertImg: [".entry-content", 2],
        autoDownload: [0],
        next: "a[rel=prev]",
        prev: "a[rel=next]",
        customTitle: "return fun.geT('h1.entry-title');",
        css: ".entry-featured-media-main{display:none!important}",
        category: "nsfw2"
    }, {
        name: "美图乐 www.meitule.cc",
        reg: /www\.meitule\.\w+\/photo\/\d+\.html/i,
        imgs: () => {
            let max;
            try {
                max = fun.ge(".page>li:last-child>a").href.split("_")[1].match(/\d+/)[0]
            } catch (e) {
                max = 1
            }
            return fun.getImg(".content img", max, 9);
        },
        insertImg: [".content", 2],
        customTitle: "return fun.geT('h1.h5');",
        css: "#dtag>center,#divpsg,.tujia,.list-album>li:nth-child(n+1):nth-child(-n+2){display:none!important}",
        category: "nsfw1"
    }, {
        name: "美桌 http://www.win4000.com/meitu.html",
        reg: /www\.win4000\.com\/meinv\d+\.html/,
        imgs: () => {
            return fun.getImgA(".pic-large", "#scroll>li:not(.current)>a", 3);
        },
        insertImg: ["#pic-meinv", 2],
        autoDownload: [0],
        next: ".group-next>a",
        prev: ".group-prev>a",
        customTitle: "return fun.geT('.ptitle>h1');",
        one: 1,
        category: "nsfw1"
    }, {
        name: "MM1311 www.mm1311.net",
        reg: /www\.mm1311\.net\/\w+\/\d+\.html/,
        imgs: () => {
            let max = fun.geT(".page-ch").match(/\d+/)[0];
            return fun.getImg(".content-pic img", max, 9);
        },
        insertImg: [".content-pic", 1],
        autoDownload: [0],
        next: ".updown_r",
        prev: ".updown_l",
        customTitle: "return fun.geT('.content>h5');",
        category: "nsfw1"
    }, {
        name: "依依图片网 www.eemm.cc 精选美女网 www.jxmm.net",
        reg: /(www\.eemm\.cc|www\.jxmm\.net)\/pic\/\d+\.html/,
        imgs: async () => {
            await fun.getNP("#content img", "a.on+a:not(.next)", null, ".page", 0, null, 0);
            return [...fun.gae('#content img')]
        },
        insertImg: ["#content", 1],
        customTitle: "return fun.geT('.article>h1');",
        category: "nsfw1"
    }, {
        name: "MM5MM5美女图片 www.mm5mm5.com",
        reg: /www\.mm5mm5\.com\/mm\/\d+/,
        imgs: async () => {
            return picinfo[0].split(',')
        },
        insertImg: ["#content", 1],
        customTitle: "return fun.geT('.article>h2');",
        category: "nsfw1"
    }, {
        name: "MM5MM5美女图片M m.mm5mm5.com",
        reg: /m\.mm5mm5\.com\/mm\/\d+/,
        imgs: () => {
            let max = fun.geT(".contentpage>span>i").match(/\/(\d+)/)[1];
            let links = [];
            links.push(location.href);
            for (let i = 1; i < max; i++) {
                links.push(location.href + "/" + i);
            }
            return fun.getImgA("div>a>img", links);
        },
        insertImg: ["//div[a[img]]", 2],
        customTitle: "return fun.geT('.content>h1');",
        css: "union[id],.pag-ts,.contentpage{display:none!important}",
        category: "nsfw1"
    }, {
        name: "3G 壁纸 https://www.3gbizhi.com/meinv",
        reg: /www\.3gbizhi\.com\/meinv\/(\w+\/)?\w+\.html/,
        imgs: () => {
            return fun.getImgA('#contpic', '.swiper-slide:not(:first-child) a');
        },
        insertImg: ["#showimg", 1],
        autoDownload: [0],
        next: "a.next[href$=html]",
        prev: "a.pver[href$=html]",
        customTitle: "return fun.geT('h2.title');",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}.showcontw #showimg{height:auto!important}",
        category: "nsfw1"
    }, {
        name: "亿图全景图库 https://www.yeitu.com/meinv/",
        reg: /(www|m)\.yeitu\.com\/meinv\/\w+\/\w+\.html/,
        imgs: () => {
            let max = fun.geT(".imageset-sum").match(/\/\s?(\d+)/)[1];
            return fun.getImg(".img_box img[alt],.gallery-item img[alt]", max, 3);
        },
        insertImg: [".img_box,.gallery-item", 1],
        customTitle: "return fun.geT('#title>h1,h1.article-title');",
        css: ".appbox,.uk-page~section,.yt-pages+.mssp{display:none!important}",
        category: "nsfw1"
    }, {
        name: "优美图库 https://www.umei.cc/meinvtupian/",
        reg: /www\.umei\.cc\/meinvtupian\/\w+\/\d+\.htm/i,
        imgs: () => {
            let a = fun.ge(".pages li:last-child>a");
            let max = a.href.match(/_(\d+).htm/)[1];
            return fun.getImg(".big-pic img", max, 17);
        },
        insertImg: [".big-pic", 1],
        autoDownload: [0],
        next: ".preandnext:not(.connext)>a",
        prev: ".preandnext.connext>a[href$=htm]",
        customTitle: "return fun.geT('#photos>h1');",
        category: "nsfw1"
    }, {
        name: "优美图库M wap.umei.cc",
        reg: /wap\.umei\.cc\/meinvtupian\/\w+\/\d+\.htm/i,
        imgs: () => {
            let max = fun.geT("a.noclick").match(/\/(\d+)/)[1];
            return fun.getImg("#maincont img", max, 17);
        },
        insertImg: ["#maincont", 1],
        autoDownload: [0],
        next: () => {
            let next = fun.ge("a.f-r.l3");
            if (next) {
                return next.href
            } else {
                return null
            }
        },
        prev: 1,
        customTitle: "return fun.geT('.title>h1');",
        css: "#maincont>div,dl:nth-child(n+1):nth-child(-n+2){display:none!important}",
        category: "nsfw1"
    }, {
        name: "MEITU131 www.meitu131.net/nvshen/ www.meitu131.net/meinv/ www.meitu131.net/jigou/ m.meitu131.net",
        reg: /(www|m)\.meitu131\.(com|net)\/meinv\/\d+\//,
        imgs: () => {
            let max = fun.geT("a[title],.uk-page>span").match(/\/(\d+)/)[1];
            return fun.getImg(".work-content img[alt],.uk-article-bd img", max, 15);
        },
        insertImg: [".work-content>p,.uk-article-bd", 1],
        customTitle: "return fun.geT('.contitle-box>h1,h1.uk-article-title');",
        css: ".appbox,.uk-page~section{display:none!important}",
        category: "nsfw1"
    }, {
        name: "晴空头像图库 www.qq7k.com",
        reg: /www\.qq7k\.com\/\w+\/\w+\/\d+.html/i,
        init: () => {
            let a = fun.ge(".content a");
            a.outerHTML = a.innerHTML;
        },
        imgs: () => {
            let max = parseInt(qingtiancms_Details.Total);
            if (max > 1) {
                return fun.getImg(".content img", max, 9);
            } else {
                return [...fun.gae(".content img")];
            }
        },
        insertImg: [".content", 1],
        autoDownload: [0],
        next: "//a[text()='上一篇']",
        prev: 1,
        customTitle: "return fun.geT('.contitle-box>h1');",
        css: ".content img{cursor:unset!important;margin:0px auto!important;border:none!important}",
        category: "nsfw1"
    }, {
        name: "晴空头像图库M m.qq7k.com",
        reg: /m\.qq7k\.com\/\w+\/\w+\/\d+.html/i,
        init: () => {
            let a = fun.ge(".show-simg a");
            a.outerHTML = a.innerHTML;
        },
        imgs: async () => {
            await fun.getNP(".show-simg img", "#playnext[href*=_]", null, ".show-pages", 0, null, 0);
            return [...fun.gae(".show-simg img")];
        },
        insertImg: [".show-simg", 1],
        autoDownload: [0],
        next: "#playpre",
        prev: 1,
        customTitle: "return fun.geT('.m-article>h1');",
        css: "#bigImg{margin:0px!important}",
        category: "nsfw1"
    }, {
        name: "爱美女 www.2meinv.com",
        reg: /www\.2meinv\.com\/article.+\.html/,
        imgs: () => {
            let max = fun.geT(".des>h1").match(/\/\s?(\d+)/)[1];
            return fun.getImg(".pp.hh img[alt]", max, 5);
        },
        insertImg: [".pp.hh", 1],
        autoDownload: [0],
        next: "//a[@class='active' and contains(text(),'下一篇')]",
        prev: "//a[@class='active' and contains(text(),'上一篇')]",
        css: ".picTip.r5,.page-show>a:not(.active){display:none!important}",
        customTitle: "return fun.title('_',1);",
        category: "nsfw1"
    }, {
        name: "爱美女M wap.2meinv.com",
        reg: /wap\.2meinv\.com\/article-\d+\.html/,
        imgs: () => {
            let max = fun.geT(".article-page>*:last-child", 2);
            return fun.getImg(".arcmain img", max, 5);
        },
        insertImg: [".clearfix.arcmain", 1],
        autoDownload: [0],
        next: "a.f-r[href$=html]",
        prev: "a.f-l.l2[href$=html]",
        css: "body>a{display:none!important}",
        customTitle: "return fun.title('_爱美女',1);",
        category: "nsfw1"
    }, {
        name: "cos在线 www.coszaixian.vip",
        reg: /www\.coszaixian\.vip\/\d+\.html/,
        imgs: ".entry-content img[data-src]",
        autoDownload: [0],
        next: ".post-pre h2>a",
        prev: ".post-next h2>a",
        customTitle: "return fun.geT('.entry-header>h1');",
        category: "nsfw1"
    }, {
        name: "绅士猫 www.cos6.net",
        reg: /www\.cos6\.net\/\d+\.html/,
        imgs: ".wp-posts-content img[data-src]",
        autoDownload: [0],
        next: ".article-nav>div:first-child>a[href$=html]",
        prev: ".article-nav>div:last-child>a[href$=html]",
        customTitle: "return fun.geT('h1.article-title');",
        category: "nsfw1"
    }, {
        name: "COSPLAY ZIP www.coszip.com",
        reg: /www\.coszip\.com\/\d+\.html$/,
        imgs: () => {
            let max = fun.geT(".pagination-post>*:last-child");
            return fun.getImg(".post-content img", max, 7);
        },
        insertImg: [
            [".post-content", 0], 1
        ],
        autoDownload: [0],
        next: ".post-prev>a",
        prev: ".post-next>a",
        customTitle: "return fun.geT('h1.entry-title');",
        css: "pre[style]+p,figure.wp-block-image,.jeg_pagelinks,.pagination-post{display:none!important}",
        category: "nsfw2"
    }, {
        name: "COSPLAY ZIP www.coszip.com",
        reg: /www\.coszip\.com\/\d+\.html\?amp=1$/,
        imgs: () => {
            let links = [];
            links.push(location.href);
            let url = location.href.replace(/\?amp=1$/, "");
            let max = fun.geT(".page_nav.next", 2);
            for (let i = 2; i <= max; i++) {
                links.push(url + "/" + i + "?amp=1")
            }
            return fun.getImgA("p>amp-img", links);
        },
        insertImg: ["//p[amp-img]", 1],
        autoDownload: [0],
        next: ".prev-post",
        prev: ".next-post",
        customTitle: "return fun.geT('h1.jeg_post_title');",
        css: "pre[style]+p,figure.wp-block-image,.jeg_pagelinks{display:none!important}",
        category: "nsfw2"
    }, {
        name: "女神社 nshens.com inewgirl.com",
        reg: /(nshens\.com|inewgirl\.com)\/\d+\/\d+\/\d+\/[^/]+$/,
        exclude: ".justify-center>button>.v-btn__content",
        delay: 300,
        imgs: () => {
            fun.show("獲取資料中...", 0);
            let links = [];
            let resArr = [];
            let xhrNum = 0;
            let max = fun.geT(".v-pagination li:last-child", 2);
            links.push(location.href);
            for (let i = 2; i <= max; i++) {
                links.push(location.href + "/" + i)
            }
            for (let i in links) {
                let res = fun.xhr(links[i], "document").then(doc => {
                    fun.show(`獲取資料中${xhrNum+=1}/${links.length}`, 0);
                    let code = [...doc.scripts].find(s => s.innerHTML.search(/photoList/) > -1).innerHTML;
                    return fun.run(code.match(/photoList:([^\]]+\])/)[1]);
                });
                resArr.push(res)
            }
            return Promise.all(resArr).then(data => data.flat().map(e => e.photourl))
        },
        insertImg: ["//div[a[div[@class='v-image v-responsive theme--light']]]", 2],
        customTitle: "return fun.geT('h3');",
        category: "nsfw2"
    }, {
        name: "女神社 nshens.com inewgirl.com lovens.cc",
        reg: /(nshens\.com|inewgirl\.com)\/latestpost$/,
        delay: 300,
        icon: 0,
        key: 0,
        observerClick: "//button[span[text()='加載更多'] or span[text()='加载更多'] or span[text()='Load More'] or span[text()='Tải thêm']]",
        category: "nsfw2"
    }, {
        name: "Chottie chottie.com", //很多都需要VIP，不然只會重複抓到第一頁的圖片
        reg: /chottie\.com\/blog\/(\w{2}\/)?archives\/\d+$/,
        exclude: ".justify-center>button>.v-btn__content",
        delay: 300,
        imgs: () => {
            fun.show("獲取資料中...", 0);
            let links = [];
            let resArr = [];
            let xhrNum = 0;
            let max = fun.geT(".v-pagination li:last-child", 2);
            links.push(location.href);
            for (let i = 2; i <= max; i++) {
                links.push(location.href + "/" + i)
            }
            for (let i in links) {
                let res = fun.xhr(links[i], "document").then(doc => {
                    fun.show(`獲取資料中${xhrNum+=1}/${links.length}`, 0);
                    let code, imgs;
                    try {
                        code = [...doc.scripts].find(s => s.innerHTML.search(/imgList/) > -1).innerHTML;
                        imgs = fun.run(code.match(/imgList:([^\]]+\])/)[1])
                    } catch (e) {
                        code = [...doc.scripts].find(s => s.innerHTML.search(/snapshotList/) > -1).innerHTML;
                        imgs = fun.run(code.match(/snapshotList:([^\]]+\])/)[1])
                    }
                    return imgs
                });
                resArr.push(res)
            }
            return Promise.all(resArr).then(data => data.flat())
        },
        insertImg: ["//div[a[div[@class='v-image v-responsive theme--light']]]", 2],
        //css: ".text-center{display:none!important}",
        customTitle: "return fun.geT('h3');",
        category: "nsfw2"
    }, {
        name: "美妹妹 www.meimeimei.org",
        reg: /www\.meimeimei\.org\/\d+\/\d+\/$/,
        imgs: () => {
            let url = fun.ge(".pageCurr").href.replace("1.html", "");
            let max = fun.geT(".chapterpage>a:last-child", 2);
            let links = [];
            for (let i = 1; i <= max; i++) {
                links.push(url + i + ".html");
            }
            return fun.getImgA(".img>img", links)
        },
        insertImg: [".txt_tcontent", 1],
        autoDownload: [0],
        next: "//div[contains(text(),'上一篇')]/a[not(@href='#')]",
        prev: "//div[contains(text(),'下一篇')]/a[not(@href='#')]",
        customTitle: "return fun.geT('.bread>li:last-child>a');",
        category: "nsfw1"
    }, {
        name: "新美图录 www.xinmeitulu.com",
        reg: /www\.xinmeitulu\.com\/photo\/.+/,
        imgs: "img[data-original]",
        customTitle: "return fun.geT('h1.h3');",
        category: "nsfw1"
    }, {
        name: "美图录 meitulu.me",
        reg: /meitulu\.me\/item\/\d+\.html/,
        imgs: () => {
            let max = fun.geT(".pagination>li:last-child", 2);
            return fun.getImg(".mb-4>img[alt]", max, 9);
        },
        insertImg: [".mb-4", 1],
        customTitle: "return fun.geT('.top-title');",
        category: "nsfw1"
    }, {
        name: "秀窝 www.xiuwo.net",
        reg: /www\.xiuwo\.net\/tu\/\d+\.html/,
        imgs: () => {
            let max;
            try {
                max = fun.geT('.c_l>p:nth-child(3)').match(/\d+/)[0]
            } catch (e) {
                max = 1
            }
            return fun.getImg('#showimg img', max, 9);
        },
        insertImg: ["#showimg", 1],
        customTitle: "return fun.geT('.weizhi h1');",
        category: "nsfw1"
    }, {
        name: "妹妹图 mm.tvv.tw",
        reg: /mm\.tvv\.tw\/archives\/\d+\.html/,
        imgs: ".img-responsive",
        customTitle: "return fun.geT('.blog-details-headline');",
        category: "nsfw1"
    }, {
        name: "小姐姐 www.nvsheng.cc",
        reg: /nvsheng\.cc\/\w+\/\d+\.html/,
        imgs: () => {
            let max = fun.geT(".pagebar>*:last-child", 3);
            return fun.getImg(".info-imtg-box>img[alt]", max);
        },
        insertImg: [".info-imtg-box", 1],
        autoDownload: [0],
        next: "//a[p[text()='上一篇']]",
        prev: "//a[p[text()='下一篇']]",
        customTitle: "return fun.title('-',1);",
        //one: 1,
        category: "nsfw1"
    }, {
        name: "洛秀网 loxiu.com",
        reg: /loxiu\.com\/post\/\d+\.html/,
        imgs: () => {
            let max = fun.geT(".pagebar>*:last-child", 3);
            return fun.getImg(".info-imtg-box>img[alt]", max);
        },
        insertImg: [".info-imtg-box", 1],
        autoDownload: [0],
        next: "//a[p[text()='上一篇']]",
        prev: "//a[p[text()='下一篇']]",
        customTitle: "return fun.geT('.info-title>h1');",
        category: "nsfw1"
    }, {
        name: "遛无写真 www.6evu.com",
        reg: /www\.6evu\.com\/\d+\.html/,
        imgs: () => {
            let max = fun.geT(".post-page-numbers:last-child");
            return fun.getImg("#post_content img", max, 10);
        },
        insertImg: ["#post_content", 1],
        autoDownload: [0],
        next: "a[rel=prev]",
        prev: "a[rel=next]",
        customTitle: "return fun.geT('h1');",
        category: "nsfw1"
    }, {
        name: "原创妹子图/尤物私房图/极品美女图/免费私房图/私房网红图/尤物妹妹图 www.ycmzt.com/www.ywsft.com/www.jpmnt.com/www.mfsft.com/www.sfwht.com/www.ywmmt.com",
        reg: /www\.(ywmmt|mnwht|ycmeinv|yhsft|yhmnt|mfsft|jpsft|akxzt|flwht|threnti|ywnmt|ztmeinv|mstaotu|tstaotu|ywmtw|mgtaotu|prmzt|xrtaotu|jjtaotu|prmeinv|axtaotu|mgmeinv|xsmeinv|ugtaotu|msmeinv|flxzw|axmeinv|swtaotu|hjtaotu|nsxzw|ugmeinv|hytaotu|xrmeinv|zfmeinv|jpmnt|zttaotu|mfmzt|ykmeinv|qjtaotu|pmtaotu|ddtaotu|plxzw|mfxzt|mtgqt|fltuku|yhtuku|ycmeitu|mttuku|xhtuku|qjtuku|jpflt|ycwht|yctuk|akywt|ywtuk|jctuk|xstuk|xgtuk|mztuk|xztuk|sytuk|gcxzt|tsxzt|gqxzt|mfnmt|spxzt|yhxzt|mtxzt|nsxzt|jdxzt|spmeitu|jpmzw|yhmeitu|mzmeitu|qpmzt|flsft|ywsft|wkmzt|snmzt|thmzt|brtaotu|aimzt|qtmzt|mtmnt|jrmzt|yztaotu|jrmeinv|xsmzt|zbtaotu|yhmnw|zbmzt|xjjtaotu|jpnst|ywmeitu|jrmnt|ftmeinv|xjjmzt|smtaotu|mtywt|sfsnt|jdtaotu|xgyouwu|ywmzt|xgywt|mtflt|nmtaotu|mtmnw|flmeitu|gqtaot|plmeitu|zpmzt|mtmzt|mtwht|sfwht|gqsft|yhmeinv|jdmnt|yctaotu|wkrenti|yzrenti|mtsyt|sptaotu|mttaotu|wsgtu|ywtaotu|sfmzt|sftaotu|gcmeinv|nstaotu|xhtaotu|jdwht|mtmeinv|gqwht|jpywt|jcwht|tptaotu|spyouwu|xgmeitu|nsmeitu|jstaotu|yhtaotu|sytaotu|nsxiez|swmzt|jpmzt|yhflt|sfywt|ywxzt|plmzt|sfmtw|jpyouwu|sfxzt|zftaotu|ycmzt|whtaotu|jpxzt|sftuku|plwht|symzt|sfmnt|sfnmt|jcmeinv|tsmnt|jjmeinv|wsgmzt|gqnmt)\.com\/[a-z]+\/[a-z]+\/\d+\/\d+\.html$/,
        init: () => {
            fun.gae(".b a").forEach(a => {
                a.removeAttribute("target")
            });
            fun.gae("#picg a").forEach(a => {
                a.outerHTML = a.innerHTML;
            });
            fun.remove("iframe", 2000);
        },
        imgs: () => {
            let max = fun.geT(".pagelist font~*:last-child", 2);
            return fun.getImgO("#picg img[alt]", max, 9, [null, null], 200, ".page .pagelist", 0);
        },
        insertImg: ["#picg", 1],
        autoDownload: [0],
        next: "//div[@class='b' and contains(text(),'上一')]/a",
        prev: "//div[@class='b' and contains(text(),'下一')]/a",
        customTitle: () => {
            return fun.geT("h1").replace(/\/(\d+P)?/i, "");
        },
        css: "#imgc img{margin:0px auto!important}#picg{max-width: 1110px!important;margin: 0 auto;}#picg img:hover{transform:none !important}#picg img{filter:blur(0px)!important}body>br,.interestline+center,center+#pic,#xzpap1,#divpsgx,#bdivpx,#divfts,#divftsp,#app+div,#xzappsq,div.bg-text,#divpsg,#divStayTopright2,#bdssy,#qrcode2>.erweima-text,#qrcode2>center,#d5tig,#pcapicb,#google_translate_element,#d5a>*:not([id]):not([class]){display:none !important}",
        category: "nsfw2"
    }, {
        name: "魅狸图片网 www.rosi8.com 美女私房照 www.sfjpg.com 看妹图 www.kanmeitu.net www.kanmeitu1.cc kanmeitu.net kanmeitu1.cc",
        reg: /(www\.rosi8\.\w+|www\.sfjpg\.com|kanmeitu\.net|kanmeitu1\.cc)\/\w+\/\d+\.html$/,
        init: () => {
            fun.gae('.b a').forEach(a => {
                a.removeAttribute('target')
            });
            fun.gae("#picg a").forEach(a => {
                a.outerHTML = a.innerHTML;
            });
        },
        imgs: () => {
            let max = fun.geT('.pagelist span,.pagelist a[title=Page]').match(/\/(\d+)/)[1];
            return fun.getImgO('#picg img', max, 9, [null, null], 200, '.page .pagelist', 0);
        },
        insertImg: ["#picg", 1],
        autoDownload: [0],
        next: "//div[@class='b' and contains(text(),'上一')]/a",
        prev: "//div[@class='b' and contains(text(),'下一')]/a",
        customTitle: () => {
            return fun.geT("h1").replace(/\/(\d+P)?/i, "");
        },
        css: "#imgc img{margin:0px auto!important}#picg{max-width: 1110px!important;margin: 0 auto;}#picg img:hover{transform:none !important}#picg img{filter:blur(0px)!important}body>br,.interestline+center,center+#pic,#xzpap1,#divpsgx,#bdivpx,#divfts,#divftsp,#app+div,#xzappsq,div.bg-text,#divpsg,#divStayTopright2,#bdssy,#qrcode2>center,#d5tig,#pcapicb,#pcapic,#google_translate_element,#d5a>*:not([id]):not([class]),union[id]{display:none !important}",
        category: "nsfw2"
    }, {
        name: "萌图社 www.446m.com",
        reg: /www\.\d+m\.com\/index\.php\/\w+\/\d+\.html/,
        imgs: ".post-item .img",
        customTitle: "return document.title.slice(0,-6)",
        category: "nsfw1"
    }, {
        name: "妹妹美 mmm.red",
        reg: /(www\.)?mmm\.red\/art\/\d+$/,
        imgs: "div[data-fancybox][data-src]",
        autoDownload: [0],
        next: "//div[text()='上一篇']/following-sibling::a",
        prev: "//div[text()='下一篇']/following-sibling::a",
        customTitle: "return fun.geT('.post-info-text');",
        category: "nsfw1"
    }, {
        name: "秀色女神 www.xsnvshen.co",
        reg: /www\.xsnvshen\.(co|com)\/album\/\d+/,
        imgs: () => {
            return [...fun.gae("img[id^='imglist'][data-original]")].map(e => e.dataset.original.replace("thumb_600x900/", ""));
        },
        insertImg: ["//li[img[@id='bigImg']]", 1],
        customTitle: "return fun.geT('h1')",
        category: "nsfw1"
    }, {
        name: "秀色女神M https://m.xsnvshen.co/album/39844",
        reg: /m\.xsnvshen\.(co|com)\/album\/\d+/,
        imgs: () => {
            let max = fun.geT(".pg_current").match(/\d+$/)[0];
            return fun.getImg("#arcbox img.lazy", max, 6, ["thumb_600x900/", ""]);
        },
        insertImg: ["#arcbox", 1],
        customTitle: "return fun.geT('h1')",
        category: "nsfw1"
    }, {
        name: "HotAsiaGirl hotgirl.asia 分頁模式",
        reg: /hotgirl\.asia\/.+\//,
        include: ".galeria_img",
        imgs: () => {
            return fun.getImgA(".galeria_img>img", ".pagination a[href]");
        },
        insertImg: [".mx-auto", 1],
        customTitle: "return fun.geT('h3');",
        css: ".galeria_img{display:none!important}",
        category: "nsfw2"
    }, {
        name: "HotAsiaGirl hotgirl.asia 幻燈片模式",
        reg: /hotgirl\.asia\/.+\//,
        include: "#carouselImageIndicators",
        imgs: "#carouselImageIndicators img",
        insertImg: [".mx-auto", 1],
        customTitle: "return fun.geT('h3');",
        css: ".galeria_img{display:none!important}",
        category: "nsfw2"
    }, {
        name: "BeautyLeg www.beautyleg6.com",
        reg: /www\.beautyleg6\.com\/\w+\/\d+\/\d+\.html/i,
        imgs: () => {
            let max;
            try {
                max = fun.geT(".page a").match(/\d+/)[0]
            } catch (e) {
                max = 1
            }
            return fun.getImg(".contents img[alt]", max, 9);
        },
        insertImg: [".contents", 1],
        autoDownload: [0],
        next: ".pre>a",
        prev: ".next>a",
        customTitle: () => {
            return fun.geT(".content>h1").replace(/\[\d+P\/\d+M\]/i, "");
        },
        category: "nsfw1"
    }, {
        name: "BeautyLegM m.beautyleg6.com",
        reg: /m\.beautyleg6\.com\/view\.php\?aid=\d+/,
        imgs: async () => {
            let links = [];
            links.push(location.href);
            for (let i = 2; i <= totalpage; i++) {
                links.push(location.href + "&pageno=" + i);
            }
            await fun.getEle(links, "#bigImg", ".show-simg", ".show-pages");
            return [...fun.gae("#bigImg")];
        },
        insertImg: [".show-simg", 1],
        autoDownload: [0],
        next: () => {
            let next = fun.ge("a.f-r.l3");
            if (next) {
                return next.href
            } else {
                return null
            }
        },
        prev: 1,
        customTitle: () => {
            return fun.geT(".showcontbt>h1").replace(/\s?\(\d+\/\d+\)/, "");
        },
        category: "nsfw1"
    }, {
        name: "Asianude4u www.asianude4u.net",
        reg: /www\.asianude4u\.net\/.+\/.+\/$/,
        imgs: () => {
            if (fun.ge(".wp-block-image a[href*=attachment_id]")) {
                return [...fun.gae(".wp-block-image img[data-id]")];
            } else {
                let arr = [...fun.gae(".wp-block-image>a,.mgl-img-container>a")].map(e => e.href);
                try {
                    arr = arr.sort((a, b) => {
                        return a.split("/").pop().match(/\d+/)[0] - b.split("/").pop().match(/\d+/)[0]
                    })
                } catch (e) {
                    arr = arr
                }
                return arr;
            }
        },
        //insertImg: ["//li[img[@id='bigImg']]", 1],
        insertImg: [
            ["div.entry>*:last-child", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('h1.entry-title')",
        css: ".single-box{display:none!important}",
        category: "nsfw1"
    }, {
        name: "Chinese Beauties sxchinesegirlz.one",
        reg: /sxchinesegirlz\.one\/\d+\/\d+\/\d+\/.+\/$/,
        imgs: () => {
            let max = fun.geT(".pagination>*:last-child", 2);
            return fun.getImg(".wp-block-image img", max, 4);
        },
        insertImg: [".thecontent", 1],
        customTitle: "return fun.geT('h1.entry-title')",
        category: "nsfw2"
    }, {
        name: "爱看 INS www.ikanins.com",
        reg: /www\.ikanins\.com\/[\w-]+\//,
        imgs: "img[srcset]",
        autoDownload: [0],
        next: "a[rel=prev]",
        prev: "a[rel=next]",
        customTitle: () => {
            return fun.geT(".entry-title").replace(/\s?\d+P\s?$/i, "").trim();
        },
        category: "nsfw1"
    }, {
        name: "Dmmtu 美女图 www.dmmtu.com",
        reg: /www\.dmmtu\.com\/\w+\/\d+\.html/,
        imgs: () => {
            let max = fun.geT("a[title=Page]>b").match(/共(\d+)/)[1];
            return fun.getImg(".main-body img", max, 9);
        },
        insertImg: [".main-body", 1],
        autoDownload: [0],
        next: "//a[text()='上一组']",
        prev: 1,
        customTitle: "return fun.geT('.main-title');",
        category: "nsfw2"
    }, {
        name: "好女神网 www.haonvshen.com",
        reg: /www\.haonvshen\.com\/gallery\/\d+\.html/,
        imgs: () => {
            let max;
            try {
                max = fun.geT("#pages>*:last-child", 3)
            } catch (e) {
                max = 1
            }
            return fun.getImg("#hgallery>img", max, 9);
        },
        insertImg: ["#hgallery", 1],
        customTitle: "return fun.geT('#htilte').split(' - ')[0];",
        category: "nsfw1"
    }, {
        name: "Jablehk jablehk.com",
        reg: /jablehk\.com\/\w+/,
        imgs: ".gallery-strips-lightbox-link>img[data-src]",
        autoDownload: [0],
        next: ".item-pagination-link--next",
        prev: ".item-pagination-link--prev",
        customTitle: "return fun.geT('h1>strong');",
        category: "nsfw1"
    }, {
        name: "套图网 taotu.uk",
        reg: /taotu\.uk\/\w+\.html/i,
        imgs: ".post_container img",
        customTitle: "return fun.geT('.post_container_title>h1');",
        next: ".prev_next_box.nav_previous>a",
        prev: ".prev_next_box.nav_next>a",
        category: "nsfw1"
    }, {
        name: "Taotuxp.com www.taotucc.com",
        reg: /www\.taotucc\.com\/\d+\.html/,
        imgs: () => {
            let max = fun.geT(".pagelist>*:last-child");
            return fun.getImg("#post_content img[alt]", max, 7);
        },
        insertImg: ["#post_content", 1],
        autoDownload: [0],
        next: "a[rel=prev]",
        prev: "a[rel=next]",
        customTitle: "return fun.geT('h1');",
        category: "nsfw1"
    }, {
        name: "MM 范 www.95mm.tv",
        reg: /www\.95mm\.\w+\/\d+\.html/,
        init: "$(document).unbind('keydown');$(document).unbind('keyup');",
        imgs: () => {
            let max = fun.geT(".post-title").match(/\/(\d+)/)[1];
            return fun.getImg(".post img[alt]", max, 2);
        },
        insertImg: [".post", 1],
        autoDownload: [0],
        next: "//div[div[text()='上一组']]/preceding-sibling::div/a",
        prev: "//div[div[text()='下一组']]/preceding-sibling::a",
        customTitle: () => {
            return fun.geT(".post-title").replace(/（\d+\/\d+）$/, "");
        },
        category: "nsfw1"
    }, {
        name: "套圖吧 www.taotu8.xyz",
        reg: /www\.taotu8\.xyz\/(\w+\/\w+\/\w+\.html|\w+\/\d+\.html)/,
        init: "$(document).unbind('keydown');",
        imgs: () => {
            let max = fun.geT("#allnum");
            return fun.getImg(".picsbox img[alt]", max, 9);
        },
        insertImg: [".picsbox center", 1],
        customTitle: () => {
            return fun.geT(".picmainer>h1").replace(/（\d+\/\d+）$/, "");
        },
        category: "nsfw1"
    }, {
        name: "推图网 https://www.tuiimg.com/meinv/",
        reg: /(www|m)\.tuiimg\.com\/meinv\/\d+\//,
        init: "goshowall();",
        imgs: () => {
            let max = fun.geT("#allbtn").match(/\/(\d+)/)[1];
            let path = fun.ge("#content>img").src.match(/.+\//)[0];
            let arr = [];
            for (let i = 1; i <= max; i++) {
                arr.push(path + i + ".jpg")
            }
            return arr;
        },
        insertImg: ["#content", 1],
        autoDownload: [0],
        next: "#nextbtn>a",
        prev: "#prebtn>a",
        customTitle: "return fun.geT('#main>h1,.main>h1');",
        category: "nsfw1"
    }, {
        name: "18AV https://18av.mm-cg.com/zh/cg_random/all/index.html",
        reg: /18av\.mm-cg\.com\/(\w{2}\/)?\w+\/\d+\/content\.html/,
        include: ".sel_enlarge_page",
        imgs: () => {
            return Large_cgurl;
        },
        insertImg: ["#show_cg_html", 2],
        customTitle: () => {
            return fun.geT('.archive-title>h1').replace(/\s?\[\d+p\]|\s?\(\d+p\)/i, "");
        },
        category: "nsfw1"
    }, {
        name: "Xgirls xgirlscollection.com",
        reg: /xgirlscollection\.com\/collection\/\d+/,
        imgs: () => {
            let max;
            try {
                max = fun.geT(".pagination>*:last-child", 2)
            } catch (e) {
                max = 1
            }
            return fun.getImg("img[id].collection-image", max)
        },
        insertImg: ["//div[img[@data-pin-url]]", 1],
        customTitle: "return fun.geT('.container>h1');",
        category: "nsfw1"
    }, {
        name: "SexyAsianGirl www.sexyasiangirl.xyz",
        reg: /www\.sexyasiangirl\.xyz\/album\/\d+\.html/,
        imgs: () => {
            let max;
            try {
                max = fun.geT("span.inline-block").match(/\d+$/)[0]
            } catch (e) {
                max = 1
            }
            return fun.getImg("img.block", max);
        },
        insertImg: ["//div[img[@title]]", 1],
        customTitle: () => {
            return fun.geT("header>h2").replace(/\s?\(\d+\s?photos\s?\)/, "").trim();
        },
        category: "nsfw2"
    }, {
        name: "Nude Bird nudebird.biz",
        reg: /nudebird\.biz\/.+\//,
        imgs: ".thecontent a",
        customTitle: "return fun.geT('h1');",
        category: "nsfw1"
    }, {
        name: "NUDECOSPLAY nudecosplaygirls.com",
        reg: /nudecosplaygirls\.com\/.+\/$/,
        imgs: ".single-thumb>.wp-post-image,img[class*='wp-image'],.icon-overlay>img[decoding],.msacwl-img,.entry-content>img",
        autoDownload: [0],
        next: ".g1-nav-single-next>a",
        prev: ".g1-nav-single-prev>a",
        customTitle: "return fun.geT('h1.entry-title');",
        category: "nsfw2"
    }, {
        name: "Cosplaytele cosplaytele.com",
        reg: /cosplaytele\.com\/[^/]+\//,
        include: "figure.gallery-item",
        imgs: "figure.gallery-item a",
        customTitle: () => {
            return fun.geT("h1.entry-title").replace(/\s?“[^”]+”/, "").trim();
        },
        category: "nsfw2"
    }, {
        name: "Mitaku mitaku.net",
        reg: /mitaku\.net\/.+\/.+\/$/,
        imgs: () => {
            return [...fun.gae(".msacwl-img")].slice(1, -1)
        },
        insertImg: [
            [".article-content", 2], 2
        ],
        autoDownload: [0],
        next: ".previous>a",
        prev: ".next>a",
        customTitle: "return fun.geT('h1.entry-title');",
        category: "nsfw2"
    }, {
        name: "MrCong.com",
        reg: /mrcong\.com\/.+\//,
        imgs: () => {
            let max = fun.geT(".page-link>*:last-child");
            return fun.getImg(".entry img[decoding]", max, 4);
        },
        insertImg: ["//p[img[@decoding]]", 1],
        customTitle: "return fun.geT('h1');",
        category: "nsfw1"
    }, {
        name: "4KHD www.4khd.com www.4kep.com",
        reg: /www\.4k(hd|ep)\.com\/\d+\/\d+\/\d+\/.+\.html/,
        imgs: async () => {
            await fun.getNP("#basicExample>a,.wp-block-image", ".current+li>a", null, ".page-link-box");
            return fun.getImgA("#gallery a", "#basicExample>a,.wp-block-image", 0)
        },
        insertImg: [
            [".page-link-box,.wp-block-post-content>*:last-child,#khd", 1, "#basicExample,.wp-block-image"], 2
        ],
        autoDownload: [0],
        next: "a[rel=prev]",
        prev: "a[rel=next]",
        customTitle: () => {
            return fun.geT("h3.wp-block-post-title").replace(/\[(\d+)?mb-\d+photos\]/i, "");
        },
        fetch: 1,
        //one: 1,
        css: ".popup{display:none!important}.CustomPictureDownloadImage{max-width:100%!important}",
        category: "nsfw2"
    }, {
        name: "Forum Girl www.superbeautygirlx.com",
        reg: /www\.superbeautygirlx\.com\/\d+\/\d+\/[^.]+\.html/,
        imgs: ".separator>a",
        next: ".blog-pager-older-link",
        prev: ".blog-pager-newer-link",
        category: "nsfw2"
    }, {
        name: "Buon Dua buondua.com",
        reg: /buondua\.com\/(?!hot|collection)[^\?]+$/,
        imgs: () => {
            let max = fun.geT(".pagination-list>span:last-child>a").match(/\d+/)[0];
            return fun.getImg(".article-fulltext img[alt]", max);
        },
        insertImg: [".article-fulltext", 1],
        customTitle: () => {
            return fun.geT(".article-header>h1").replace(/\(\d+\s?photos\s?\)/i, "").trim();
        },
        category: "nsfw2"
    }, {
        name: "BAOBUA.COM",
        reg: /www\.baobua\.net\/post\/.+/,
        imgs: () => {
            let max;
            try {
                max = fun.geT(".nav-links>*:last-child")
            } catch (e) {
                max = 1
            }
            return fun.getImg(".wp-block-image img[alt]", max, 6);
        },
        insertImg: [".entry-content.read-details", 2],
        customTitle: "return fun.title('|',1);",
        category: "nsfw2"
    }, {
        name: "blog.baobua.net",
        reg: /(blog|fb|vn)\.baobua\.net\/\w+\/.+/,
        imgs: "a.fancybox",
        //insertImg: [".article-body", 2],
        insertImg: [
            [".article-body", 2], 2
        ],
        go: 1,
        customTitle: "return fun.title('@BaoBua',1);",
        css: "#fix_scale img:hover{transform:none!important}",
        category: "nsfw2"
    }, {
        name: "HOTGIRLchina hotgirlchina.com theasiagirl.com anhsec.com sex4viet.com cutexinh.com vuxinh.com girlxinhxinh.com",
        reg: /(hotgirlchina\.com|theasiagirl\.com|anhsec\.com|sex4viet\.com|cutexinh\.com|vuxinh\.com|girlxinhxinh\.com)\/.+(photos?|videos?|anh)\//,
        imgs: () => {
            let max;
            try {
                max = fun.geT("span.pages").match(/\d+$/)[0]
            } catch (e) {
                max = 1
            }
            return fun.getImg(".entry-inner img[alt]", max, 4);
        },
        insertImg: [
            [".pagination", 1, ".entry-inner>p:not(#customPicDownloadEnd)"], 2
        ],
        customTitle: () => {
            return fun.geT(".post-title").replace(/\(\d+\s?photos\s?\)|(\s?\(\d+\s?photos?\s?\+\s?\d+\s?videos?\))/, "");
        },
        css: ".boxzilla-container{display:none!important}",
        category: "nsfw1"
    }, {
        name: "FoamGirl foamgirl.net",
        reg: /foamgirl\.net\/\d+\.html/,
        imgs: () => {
            let max;
            try {
                max = fun.geT(".mbx-nav-right").match(/\d+\/(\d+)/)[1]
            } catch (e) {
                max = 1
            }
            return fun.getImg("a.imageclick-imgbox", max, 9);
        },
        insertImg: [
            ["#image_div>*:last-child", 1, "#image_div br,a.imageclick-imgbox"], 1
        ],
        customTitle: () => {
            return fun.geT(".item_title>h1").replace(/\(\d+P\)|\n/gi, "")
        },
        css: ".affs{display:none!important}",
        category: "nsfw2"
    }, {
        name: "photo.camcam.cc",
        reg: /photo\.camcam\.cc\/[^/]+\/$/,
        imgs: "a.rgg-img",
        insertImg: [
            [".rgg-imagegrid", 2], 2
        ],
        go: 1,
        next: "a[rel=prev]",
        prev: "a[rel=next]",
        customTitle: "return  fun.geT('.page-title')",
        category: "nsfw2"
    }, {
        name: "Everia.club",
        reg: /everia\.club\/\d+\/\d+\/\d+\/[^/]+\//,
        imgs: ".wp-block-image img",
        customTitle: "return  fun.geT('h1')",
        category: "nsfw2"
    }, {
        name: "SexyGirl sexygirl.cc",
        reg: /sexygirl\.cc\/a\/\d+\.html/,
        imgs: "div>img.img-fluid",
        next: "//a[text()='Previous']",
        prev: "//a[text()='Next']",
        category: "nsfw2"
    }, {
        name: "dongojyousan.com",
        reg: /www\.dongojyousan\.com\/articles\/\w+\.html$/i,
        imgs: () => {
            let max;
            try {
                max = fun.geT(".entry-title>a").match(/Page\s1\/(\d+)/)[1];
            } catch (e) {
                max = 1
            }
            return fun.getImg(".entry-content img", max)
        },
        insertImg: [".entry-content", 2],
        customTitle: () => {
            return fun.geT(".entry-title>a").split("|")[0].trim()
        },
        category: "nsfw1"
    }, {
        name: "Anh VL xem.anhvl.net",
        reg: /xem\.anhvl\.net\/[^/]+\/$/,
        imgs: () => {
            try {
                let url = location.href;
                let max = fun.geT(".page-links a[onclick]", 2);
                let links = [];
                links.push(url);
                for (let i = 2; i <= max; i++) {
                    links.push(url + "p-" + i);
                }
                return fun.getImgA(".wp-content-ex img[data-src]", links)
            } catch (e) {
                return [...fun.gae(".wp-content-ex img[data-src]")]
            }
        },
        insertImg: [".wp-content-ex", 2],
        css: "#rtb,.float-ck-center-lt{display:none!important}",
        category: "nsfw2"
    }, {
        name: "Anh VL xem.anhvl.net",
        reg: /xem\.anhvl\.net/,
        icon: 0,
        key: 0,
        css: "#popupContact,.float-ck-center-lt{display:none!important}",
        category: "nsfw2"
    }, {
        name: "Phym18 phym18.tube https://phym18.tube/tag/%E1%BA%A3nh-sex",
        reg: /phym18\.tube\/anh\/[^/]+$/,
        imgs: () => {
            try {
                let url = location.href;
                let max = fun.geT("select>option:last-child").match(/\d+/)[0];
                let links = [];
                links.push(url);
                for (let i = 2; i <= max; i++) {
                    links.push(url + "/phan-" + i);
                }
                return fun.getImgA(".ndtruyen>img", links)
            } catch (e) {
                return [...fun.gae(".ndtruyen>img")]
            }
        },
        insertImg: [".ndtruyen", 2],
        css: "#wap_bottombanner{display:none!important}",
        category: "nsfw2"
    }, {
        name: "Porn Pics www.pornpics.com",
        reg: /www\.pornpics\.com\/.*galleries\//,
        imgs: "#tiles a.rel-link",
        insertImg: ["#main", 0],
        customTitle: "return fun.geT('.title-section h1')",
        category: "nsfw2"
    }, {
        name: "Freebigtit www.freebigtitpornpics.com",
        reg: /www\.freebigtitpornpics\.com\/content\/\d+\//,
        imgs: "//ul[@id='dylan']//a[img[@data-src]]",
        insertImg: [
            ["#dylan", 2], 1
        ],
        category: "nsfw2"
    }, {
        name: "Freejappic www.freejapanpornpics.com",
        reg: /www\.freebigtitpornpics\.com\/content\/\d+\//,
        imgs: "//ul[@id='dylan']//a[img[@data-src]]",
        insertImg: [
            ["#dylan", 2], 1
        ],
        category: "nsfw2"
    }, {
        name: "NongMo.Zone www.ilovexs.com",
        reg: /www\.ilovexs\.com\/post_id\/\d+\//,
        imgs: ".separator img",
        customTitle: "return fun.geT('.entry-title')",
        category: "nsfw2"
    }, {
        name: "idol.gravureprincess.date",
        reg: /idol\.gravureprincess\.date\/\d+\/\d+\/.+\.html/,
        imgs: ".separator img",
        autoDownload: [0],
        next: "a.blog-pager-older-link",
        prev: "a.blog-pager-newer-link",
        customTitle: "return fun.geT('.post-title')",
        category: "nsfw2"
    }, {
        name: "劍心回憶 https://kenshin.hk/category/jnews/photoalbum/",
        reg: /kenshin\.hk\/\d+\/\d+\/\d+\/[^/]+\/$/,
        include: "//div[@class='entry-utility']/a[1][text()='寫真組圖'] | //div[@class='cat-tags']/a[1][text()='寫真組圖']",
        init: () => {
            let p = fun.ge("//p[contains(text(),'寫真')]");
            if (p) {
                let tE = fun.ge(".entry-content,.post-page-content");
                tE.parentNode.insertBefore(p, tE);
            }
            let links = [...fun.gae("//a[button[contains(text(),'寫真')]]")].map(e => e.href);
            fun.getEle(links, ".entry-content>p>img,.post-page-content>p>img,.videoWrapper", ".entry-content,.post-page-content");
        },
        imgs: ".entry-content>img,.post-page-content>img",
        customTitle: () => {
            return fun.geT("h1.entry-title,h2.post-title").replace(/【寫真】|\s?\(\d+P,片\)/gi, "")
        },
        category: "nsfw1"
    }, {
        name: "Gravia gravia.site",
        reg: /gravia\.site\/box\/show\.php\?id=\d+$/,
        imgs: ".slideshow .item>img",
        customTitle: () => {
            return fun.geT(".container>h1").replace(/\s?【\d+枚】/, "")
        },
        category: "nsfw1"
    }, {
        name: "グラビア週刊誌 9 gravurezasshi9.doorblog.jp",
        reg: /gravurezasshi9\.doorblog\.jp\/archives\/\d+\.html(\?ref=)?/,
        imgs: ".article-body-inner>a,#article-contents>a",
        insertImg: [".article-body-inner,#article-contents", 2],
        autoDownload: [0],
        next: ".original-pager a,li.prev>a,li.prev>span>a",
        prev: ".original-pager li:last-child>a,li.next>a,li.next>span>a",
        customTitle: "return fun.geT('h1.article-title>a,.article-header>h1').trim()",
        category: "nsfw2"
    }, {
        name: "エロ役場 eroyakuba.com",
        reg: /eroyakuba\.com\/[^/]+\/$/,
        imgs: () => {
            return [...fun.gae(".flexitem_content img[srcset]")].map(img => {
                if (img.dataset.srcset !== "") {
                    let splitArr = img.dataset.srcset.split(",");
                    splitArr = splitArr.sort((a, b) => {
                        return a.match(/\s(\d+)w/)[1] - b.match(/\s(\d+)w/)[1]
                    });
                    return splitArr.pop().trim().split(" ")[0]
                } else if (img.dataset.src) {
                    return img.dataset.src
                } else {
                    return null
                }
            });
        },
        customTitle: "return fun.geT('h1.entry-title')",
        category: "nsfw2"
    }, {
        name: "エロ画像まとめ geinou-nude.com",
        reg: /geinou-nude\.com\/[^/]+\/$/,
        imgs: ".post_content>p>a[href*=uploads]",
        autoDownload: [0],
        next: "a.nav_link_l",
        prev: "a.f_row_r",
        customTitle: "return fun.geT('h1.post_title')",
        category: "nsfw2"
    }, {
        name: "JANidolig janidolig.com",
        reg: /janidolig\.com\/\?p=\d+/,
        imgs: ".entry-content img",
        customTitle: "return fun.geT('h1.entry-title')",
        category: "nsfw2"
    }, {
        name: "Gravure Idols gravureidols.top",
        reg: /gravureidols\.top\/\d+\/\d+\/\d+\/[^/]+\//,
        imgs: ".content-inner p>a",
        //insertImg: [".content-inner p", 2],
        autoDownload: [0],
        next: "a.prev-post",
        prev: "a.next-post",
        customTitle: "return fun.geT('.jeg_post_title')",
        category: "nsfw2"
    }, {
        name: "復刻書林 reprint-kh.com",
        reg: /reprint-kh\.com\/archives\/\d+/,
        imgs: ".tiled-gallery a",
        insertImg: [
            [".single-post-main>.share", 2], 2
        ],
        go: 1,
        autoDownload: [0],
        next: ".previous_post>a",
        prev: ".next_post>a",
        customTitle: () => {
            return fun.geT(".single-post-title").replace(/\d+photos/, "").trim()
        },
        category: "nsfw2"
    }, {
        name: "MIC MIC IDOL www.micmicidol.club",
        reg: /www\.micmicidol\.club\/\d+\/\d+\/.+\.html/,
        imgs: ".entry-content a[href]",
        customTitle: "return fun.geT('.entry-title').trim()",
        category: "nsfw2"
    }, {
        name: "Kemono https://kemono.party/fantia/user/17148/post/1633768 coomer.party",
        reg: /(kemono\.party|kemono\.su|coomer\.party)\/.+post/,
        imgs: "a.fileThumb.image-link",
        insertImg: [".post__files", 2],
        autoDownload: [0],
        next: "a.next",
        prev: "a.prev",
        customTitle: "return fun.geT('.post__title')",
        one: 1,
        category: "nsfw2"
    }, {
        name: "半次元 bcy.net",
        reg: /bcy\.net\/item\/detail\/\d+\?_source_page=\w+/,
        imgs: ".inner-container img",
        customTitle: "return fun.title(' - ',1)",
        category: "none"
    }, {
        name: "凸凹吧/撸女吧/女优吧/撸哥吧/欲女吧 www.tuao.one，www.63mm.cc，www.97mm.cc，www.luge8.co，luge8.co",
        reg: /(www\.)?(tuao8?|tumm|\d+mm|luge8?)\.[a-z]{2,3}\/(post|web)\//,
        imgs: () => {
            let max = fun.geT(".next-page", 2);
            return fun.getImg(".entry img[title],.article-content img[title]", max);
        },
        insertImg: ["//p[a/img[@title]]", 1],
        autoDownload: [0],
        next: "#postnavi>*:first-child>a",
        prev: "#postnavi>*:last-child>a",
        customTitle: "return fun.geT('h1.title,h1.article-title');",
        css: "body>div[style*=fixed]{display: none!important;}",
        category: "nsfw2"
    }, {
        name: "套图之家 taotuhome.com",
        reg: /taotuhome\.com\/\d+\.html/i,
        imgs: () => {
            let max;
            try {
                max = fun.geT(".page-links>*:last-child", 2)
            } catch (e) {
                max = 1
            };
            return fun.getImg(".single-content img[alt]", max, 7);
        },
        insertImg: [".single-content", 1],
        autoDownload: [0],
        next: "a[rel=prev]:not([href^=j])",
        prev: "a[rel=next]:not([href^=j])",
        customTitle: "return fun.geT('.entry-title').replace('-套图之家','');",
        category: "nsfw1"
    }, {
        name: "俊美图 www.meijuntu.com www.jeya.de",
        reg: /(www\.meijuntu\.com|www\.jeya\.de)\/\w+\/\w+\.html/i,
        imgs: () => {
            let max;
            try {
                max = fun.geT("#pages>*:last-child", 2)
            } catch (e) {
                max = 1
            };
            return fun.getImg(".pictures img[alt]", max, 5);
        },
        insertImg: [".pictures", 1],
        autoDownload: [0],
        next: "//span[contains(text(),'下一')]/following-sibling::a",
        prev: "//span[contains(text(),'上一')]/following-sibling::a",
        customTitle: "return fun.geT('h1.title');",
        category: "nsfw1"
    }, {
        name: "美女图片网 www.mevtu.com",
        reg: /www\.mevtu\.com\/\w+\/\d+\.html/i,
        include: ".next-cat",
        imgs: () => {
            let max;
            try {
                max = fun.geT('.nav-links>*:last-child', 2)
            } catch (e) {
                max = 1
            };
            return fun.getImg('#image_div img[alt]', max, 9);
        },
        insertImg: [".content", 1],
        autoDownload: [0],
        next: ".post_hyh>a",
        prev: 1,
        customTitle: () => {
            return fun.geT(".item_title>h1").replace(/\(\d+P\)/i, "");
        },
        category: "nsfw1"
    }, {
        name: "美女图片网 美图分享 www.mevtu.com",
        reg: /www\.mevtu\.com\/picture\/\d+\.html/i,
        imgs: "img.alignnone",
        customTitle: "return fun.geT('.item_title>h1');",
        category: "nsfw1"
    }, {
        name: "x6o https://www.x6o.com/topics/14#articles",
        reg: /www\.x6o\.com\/articles\/\d+/,
        delay: 300,
        imgs: ".content img",
        customTitle: () => {
            return fun.geT("h1.title").replace(/\[\d+P-\d+MB\]|\[\d+P\]|\s?\d+P$/gi, "").trim();
        },
        category: "nsfw2"
    }, {
        name: "妹子图 mt316.com",
        reg: /mt316\.com\/\w+\/\d+\.html/,
        imgs: ".m-list-content img",
        insertImg: [".m-list-content", 1],
        autoDownload: [0],
        next: ".sxpage_l>a",
        prev: 1,
        customTitle: () => {
            return fun.geT(".m-list-tools>h2").replace(/\/?\(\d+P\)/i, "");
        },
        category: "nsfw1"
    }, {
        name: "硬盘少女 diskgirl.com",
        reg: /diskgirl\.com\/image\/\w+/,
        imgs: "a[data-fancybox]",
        customTitle: () => {
            return fun.geT(".image-title").replace(/\[\d+(\+\d+)?PB?\]|\(\d+(\+\d+)?PB?\)/i, "");
        },
        category: "nsfw1"
    }, {
        name: "图宅网 www.tuzac.com",
        reg: /www\.tuzac\.com\/file\/.+/,
        imgs: async () => {
            let a = fun.ge("#the-photo-link");
            a.outerHTML = a.innerHTML;
            await fun.getNP("#fdp-photo img", ".page-curr+a", null, "#pager", 0, null, 0);
            return [...fun.gae("#fdp-photo img")]
        },
        insertImg: ["#fdp-photo", 2],
        customTitle: () => {
            return fun.geT(".fc-text-content>h1").replace(/(\[\d+P\]|\n|\(\d+P\))/gi, "").trim();
        },
        css: ".content-container .content{margin-right:0px!important}.fdp-click-area,.ad-side-right,.footer{display:none!important}",
        category: "nsfw2"
    }, {
        name: "嘿～色女孩 heysexgirl.com",
        reg: /heysexgirl\.com\/archives\/\d+$/,
        imgs: async () => {
            let max = fun.geT(".page-links>*:last-child");
            return fun.getImg(".entry-content p>a,.entry-content p>img", max, "4");
        },
        insertImg: [".entry-container", 2],
        autoDownload: [0],
        next: ".nav-previous>a",
        prev: ".nav-next>a",
        customTitle: () => {
            return fun.geT("h1.page-title");
        },
        category: "nsfw2"
    }, {
        name: "2LSP 2lsp.xyz",
        reg: /2lsp\.xyz\/[^/]+\/$/,
        include: ".entry-content img[data-srcset]",
        exclude: ".content-hide-tips",
        observerClick: ".swal2-close",
        imgs: () => {
            return [...fun.gae(".entry-content img[data-srcset]")].map(e => e.dataset.srcset);
        },
        customTitle: () => {
            return fun.geT("h1.entry-title");
        },
        category: "nsfw1"
    }, {
        name: "2LSP 2lsp.xyz",
        reg: /2lsp\.xyz\//,
        icon: 0,
        key: 0,
        observerClick: ".swal2-close",
        category: "nsfw1"
    }, {
        name: "性趣套图 myjkwd.com 534798.xyz",
        reg: /(myjkwd\.com|534798\.xyz)\/e\/action\/ShowInfo\.php/i,
        include: ".entry img",
        imgs: () => {
            let max = fun.geT("a[title=总数]");
            return fun.getImg(".entry img", max, 8);
        },
        insertImg: ["//div[@class='entry']//img/parent::*", 1],
        autoDownload: [0],
        next: "//p[contains(text(),'上一')]/a",
        prev: "//p[contains(text(),'下一')]/a",
        customTitle: "return fun.geT('.contitle');",
        css: "aside.side{display:none!important;}.main-content{margin-left:0px!important;}body{background:#EDEDED!important;}",
        category: "nsfw2"
    }, {
        name: "苍井优图片 www.28tyu.com",
        reg: /www\.\d+tyu\.com\/e\/action\/ShowInfo\.php/i,
        imgs: "img[id^='aimg']",
        autoDownload: [0],
        next: "//p[contains(text(),'上一')]/a",
        prev: "//p[contains(text(),'下一')]/a",
        customTitle: () => {
            return fun.geT(".contitle").replace(/【\d+P】/i, "");
        },
        category: "nsfw2"
    }, {
        name: "写真圣地 www.xzsd1.com",
        reg: /www.xzsd\d\.com\/.+\/.+\/$/i,
        imgs: "img[decoding]",
        autoDownload: [0],
        next: ".navigation-left>a",
        prev: ".navigation-right>a",
        customTitle: "return fun.geT('#breadcrumbs>h1');",
        category: "nsfw2"
    }, {
        name: "羞涩姬 xiuseaa.com xiusea.com",
        reg: /(xiuseaa?\.com)\/index\.php\/art\/detail\/id\/\d+\.html$/i,
        imgs: ".embed-responsive>img",
        customTitle: () => {
            return fun.geT("h1.h3").replace(/\[\d+P\]/i, "");
        },
        category: "nsfw2"
    }, {
        name: "小姐姐图库 xjjtk.link",
        reg: /xjjtk\.link\/posts\/\w+\/$/i,
        imgs: "img.block",
        customTitle: "return fun.geT('h1');",
        category: "nsfw2"
    }, {
        name: "AVJB https://avjb.com/albums/",
        reg: /avjb\.com\/albums\/\d+\/[\w-]+\/$/i,
        imgs: ".images>a",
        insertImg: [
            [".sponsor", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('.headline>h1');",
        category: "nsfw2"
    }, {
        name: "Asian To Lick asiantolick.com",
        reg: /asiantolick\.com\/post/,
        imgs: "div[data-src]",
        insertImg: [
            ["#categoria_tags_post", 1], 2
        ],
        go: 1,
        customTitle: "return fun.geT('h1');",
        css: "#touch_to_see{display:none!important}",
        category: "nsfw2"
    }, {
        name: "Models Vibe www.modelsvibe.com",
        reg: /www\.modelsvibe\.com\/[^/]+\/$/,
        init: () => {
            let ele = fun.ge("//p[br and not(contains(text(),'[ad_1]'))]")
            if (ele) {
                ele = ele.cloneNode(true);
                ele.querySelectorAll("img").forEach(img => {
                    img.remove();
                });
                let tE = fun.ge(".td-post-content");
                tE.parentNode.insertBefore(ele, tE);
            }
        },
        imgs: () => {
            if (fun.ge(".page-nav")) {
                let max = fun.geT(".page-nav>*:last-child", 2);
                return fun.getImg(".td-post-content img", max, 4)
            } else if (fun.ge(".td-post-content img[srcset]")) {
                return [...fun.gae(".td-post-content img[srcset]")].map(img => {
                    let splitArr = img.getAttribute("srcset").split(",");
                    splitArr = splitArr.sort((a, b) => {
                        return a.match(/\s(\d+)w/)[1] - b.match(/\s(\d+)w/)[1]
                    });
                    return splitArr.pop().trim().split(" ")[0]
                });
            } else {
                return [...fun.gae(".td-post-content img")]
            }
        },
        insertImg: [".td-post-content", 2],
        customTitle: "return fun.geT('h1.tdb-title-text');",
        category: "nsfw1"
    }, {
        name: "goddess247.com",
        reg: /goddess247\.com\/.+\//,
        imgs: ".elementor-widget-container p img[alt]",
        customTitle: async () => {
            let ele = "#content h1.elementor-heading-title";
            await fun.waitEle(ele)
            return fun.geT(ele);
        },
        category: "nsfw1"
    }, {
        name: "BestGirlSexy bestgirlsexy.com",
        reg: /bestgirlsexy\.com\/.+\//,
        imgs: ".elementor-widget-theme-post-content img",
        customTitle: async () => {
            let ele = "#content h1.elementor-heading-title";
            await fun.waitEle(ele)
            return fun.geT(ele);
        },
        category: "nsfw1"
    }, {
        name: "PhimVu m.phimvuspot.com",
        reg: /m\.phimvuspot\.com\/\d+\/\d+\/[\w-]+\.html/,
        imgs: ".separator>a",
        customTitle: () => {
            return fun.geT("h1.post-title").replace(/\s?\(\d+\s?photos(\s?\+\s?\d+\s?videos?)?\)/i, "");
        },
        category: "nsfw1"
    }, {
        name: "www.4kup.net",
        reg: /www\.4kup\.net\/\d+\/\d+\/[\w-]+\.html$/,
        imgs: "a.thumb-photo",
        //insertImg: ["#gallery", 1],
        insertImg: [
            ["#single-content", 2], 2
        ],
        go: 1,
        autoDownload: [0],
        next: ".next-page",
        prev: 1,
        customTitle: "return fun.geT('h1');",
        category: "nsfw2"
    }, {
        name: "牛C网导航|就爱你导航 美圖 niuc3.com",
        reg: /niuc\d\.com\/\d+\.html/,
        include: ".page-nav",
        imgs: () => {
            let max = fun.geT(".page-nav>*:last-child", 3);
            return fun.getImg("[class*='wp-image']", max, 5);
        },
        insertImg: ["//p[a[img[@decoding]]]", 1],
        next: "a.near-permalink",
        prev: 1,
        customTitle: "return fun.title('|',1)",
        css: "#io-popup-tips,.post-apd{display: none!important;}",
        category: "nsfw2"
    }, {
        name: "牛C网导航|就爱你导航 美圖 niuc3.com",
        reg: /niuc\d\.com\/\d+\.html/,
        imgs: ".panel-body a.js",
        next: "a.near-permalink",
        prev: 1,
        customTitle: "return fun.title('|',1)",
        css: "#io-popup-tips,.post-apd{display: none!important;}",
        category: "nsfw2"
    }, {
        name: "Fliporn fliporn.biz",
        reg: /fliporn\.biz\/videos\//,
        imgs: ".entry-content img[data-src]",
        customTitle: () => {
            return document.title.replace(/\s?\[\d+P\]/i, "")
        },
        category: "nsfw2"
    }, {
        name: "人妻租借所 jingunav.info",
        reg: /jingunav\.info\/index\.php\/artdetail-\d+\.html/,
        imgs: ".embed-responsive img",
        customTitle: () => {
            return fun.title(/ - 貼圖| - 歐美美女/, 1).replace(/【\d+P】\s?\n?/i, "").replace(/\s?完整版無水印寫真/, "")
        },
        css: "body>.wrap{display:none!important}",
        category: "nsfw2"
    }, {
        name: "ACGN小鎮 www.bbsacgn.com",
        reg: /www\.bbsacgn\.com\/archives\/\d+/,
        imgs: ".entry-content img",
        autoDownload: [0],
        next: ".entry-page-prev",
        prev: ".entry-page-next",
        customTitle: "return fun.geT('h1.entry-title')",
        category: "nsfw1"
    }, {
        name: "皮皮动漫社 pipidm.top www.pipidm.top",
        reg: /pipidm\.top\/\d+\.html/,
        imgs: ".content_left img",
        autoDownload: [0],
        next: ".entry-page-prev",
        prev: ".entry-page-next",
        customTitle: "return fun.geT('h1.entry-title')",
        category: "nsfw1"
    }, {
        name: "成人图片 Qinimg www.qinimg.com",
        reg: /www\.qinimg\.com\/image\/\d+\.html/,
        imgs: "#image a",
        insertImg: [
            ["#image", 2], 2
        ],
        go: 1,
        customTitle: () => {
            return fun.geT(".box>h1").replace(/\[\d+P\]/i, "").trim()
        },
        category: "nsfw2"
    }, {
        name: "零零COS 00cos.com",
        reg: /00cos\.com\/\d+\.html/,
        exclude: ".tinymce-hide,.fa-info-circle[aria-hidden=true]",
        imgs: ".article-content img",
        customTitle: () => {
            return fun.geT(".article-title>a").replace(/\s?\[\d+P-\d+MB\]|\s\[\d+P\s?\d+V\s?\d+M\]\s?/gi, "").trim()
        },
        category: "nsfw1"
    }, {
        name: "Elite Babes www.elitebabes.com PmateHunter pmatehunter.com www.jperotica.com www.metarthunter.com www.femjoyhunter.com",
        reg: /(www\.)?(elitebabes|pmatehunter|jperotica|metarthunter|femjoyhunter)\.com\/.+\//,
        exclude: "#content video",
        imgs: ".list-gallery a",
        insertImg: [
            [".list-gallery", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('#content>p')",
        category: "nsfw2"
    }, {
        name: "FreeXcafe www.freexcafe.com",
        reg: /www\.freexcafe\.com\/erotica\/[\w-]+\/[\w-]+\/index\.php/,
        imgs: () => {
            return fun.getImgA('#imagelink>img', '.thumbs>a')
        },
        insertImg: [
            ["#content>*:last-child", 2], 2
        ],
        category: "nsfw2"
    }, {
        name: "FreeXcafe www.freexcafe.com",
        reg: /www\.freexcafe\.com\/erotica\/[\w-]+\/[\w-]+\/index\.php/,
        imgs: () => {
            return fun.getImgA("#imagelink>img", ".thumbs>a")
        },
        insertImg: [
            ["#content>*:last-child", 2], 2
        ],
        category: "nsfw2"
    }, {
        name: "EPORNER Photo www.eporner.com/profile/namaiki/ www.eporner.com/profile/janekhansen/",
        reg: /\w{2,3}\.eporner\.com\/gallery\/.+\//,
        imgs: () => {
            return [...fun.gae("#container img")].map(e => e.src.replace("_296x1000", ""));
        },
        //insertImg: ["#container #container", 2],
        insertImg: [
            [".photosgrid", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('#galleryheader>h1')",
        //css: "#container.photosgrid{display:block!important}",
        category: "nsfw2"
    }, {
        name: "Xasiat www.xasiat.com/albums/ https://www.xasiat.com/albums/3346/sidam-yeeun-vol-001-event/",
        reg: /www\.xasiat\.com\/([\w]{2}\/)?albums\/\d+\/[\w-]+\//i,
        init: () => {
            fun.gae("img.thumb[data-original]").forEach(img => {
                img.src = img.dataset.original;
            });
            fun.remove(".sponsor,.footer-margin")
        },
        imgs: ".images>a",
        insertImg: [
            [".album-holder", 2], 2
        ],
        go: 1,
        customTitle: () => {
            return fun.geT('.headline>h1');
        },
        css: ".block-album{display:block!important}.block-album>.table,.footer~*:not(.customPicDownloadMsg):not(#customPicDownload){display:none!important}",
        category: "nsfw2"
    }, {
        name: "Xasiat loadMore www.xasiat.com/albums/",
        reg: /www\.xasiat\.com\/albums\//,
        include: "#list_albums_common_albums_list_pagination",
        init: () => {
            setInterval(() => {
                fun.remove("//div[iframe] | //iframe")
            }, 300);
        },
        observerClick: ".load-more>a",
        category: "nsfw2"
    }, {
        name: "Xasiat https://www.xasiat.com/albums/",
        reg: /(www\.xasiat\.com\/albums\/$|www\.xasiat\.com\/albums\/categories\/)/,
        icon: 0,
        key: 0,
        init: () => {
            fun.gae("img.thumb[data-original]").forEach(img => {
                img.src = img.dataset.original;
            });
            fun.remove(".footer~*", 2000);
        },
        css: ".footer~*{display:none!important}",
        category: "nsfw2"
    }, {
        name: "xHamster gallery xhamster.com/users/eros721_official/photos",
        reg: /xhamster\.com\/photos\/gallery\/[^/]+$/,
        include: ".gallery-section",
        imgs: async () => {
            await fun.getNP(".photo-thumb", "//div[@class='gallery-section']//li[a[contains(@class,'active')]]/following-sibling::li[1]/a", null, ".gallery-section .pager-section");
            fun.gae(".photo-thumb").forEach(ele => {
                let width, height;
                if (parseInt(ele.dataset.w) > parseInt(ele.dataset.h)) {
                    width = 374;
                    height = 251
                } else {
                    width = 168;
                    height = 251
                }
                ele.style = `margin-right:10px;width:${width}px;height:${height}px;display:block;`;
                fun.ge(".dots-loader", ele).remove();
                let thumb = fun.ge(".image-thumb", ele);
                thumb.style.backgroundImage = `url('${thumb.dataset.lazy}')`;
            });
            let links = [...fun.gae("a.photo-thumb")].map(a => a.href);
            let resArr = [];
            let fetchNum = 0;
            for (let i = 0; i < links.length; i += 16) {
                let res = fetch(links[i]).then(res => res.text()).then(res => {
                    fun.show(`獲取資料中${fetchNum+=1}/${Math.ceil(links.length/16)}`, 0);
                    let doc = fun.doc(res);
                    return JSON.parse(fun.ge("#initials-script", doc).innerHTML.replace(/window.initials=|;/g, "")).photosGalleryModel.photos.items
                });
                resArr.push(res)
            }
            return Promise.all(resArr).then(data => data.flat().map(e => e.imageURL))
        },
        init: "fun.remove('.mixed-list>.flex-element')",
        insertImg: [
            ["main>article", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('.page-title h1')",
        category: "nsfw2"
    }, {
        name: "xHamsterM gallery xhamster.com/users/eros721_official/photos",
        reg: /xhamster\.com\/photos\/gallery\/[^/]+$/,
        imgs: async () => {
            await fun.getNP(".items[data-role='gallery-photos']>.item-container", "//ol[@class='page-list']/li[@class='page-button' and a[@class='page-button-link page-button-link--active']]/following-sibling::li[1]/a", null, "//ol[@class='page-list']");
            return fun.getImgA("#photoCurr", "a.item.slided", 1, [null, null], 0)
        },
        insertImg: [".items[data-role=gallery-photos]", 1],
        customTitle: "return fun.geT('h1.page-title')",
        css: ".items[data-role=gallery-photos]>.item-container{width:100%!important}aside[data-role=yld-mdtop],.yld-md--bottom{display:none!important}",
        category: "nsfw2"
    }, {
        name: "PornHub photo pornhub.com/albums", //很容易會被短暫封IP
        enable: 1,
        reg: /pornhub\.com\/album\/\d+/,
        //imgs: "js;return fun.getImgA('#photoImageSection img', '.js_lazy_bkg a',[2,1000]);",
        imgs: "js;return fun.getImgA('#photoImageSection img', '.js_lazy_bkg a');",
        insertImg: [
            [".photoBlockBox .clear", 1], 1
        ],
        go: 1,
        customTitle: "return fun.geT('.photoAlbumTitleV2').trim()",
        category: "nsfw2"
    }, {
        name: "PicHunter www.pichunter.com",
        reg: /www\.pichunter\.com\/gallery\/\d+\/.+/,
        imgs: ".flex-images figure>a",
        insertImg: [
            [".flex-images", 2], 1
        ],
        customTitle: "return fun.geT('h1')",
        category: "nsfw2"
    }, {
        name: "Pictoa www.pictoa.com",
        reg: /www\.pictoa\.com\/(thumbs|albums)\/.+\.html/i,
        imgs: () => {
            return [...fun.gae(".thumb-nav img[data-src]")].map(e => e.dataset.src.replace("thumbs/", ""));
        },
        insertImg: ["#player", 1],
        customTitle: "return fun.geT('.title>h1')",
        css: "#gallery #player{cursor:unset!important}",
        category: "nsfw2"
    }, {
        name: "PimpAndHost https://pimpandhost.com/site/trending",
        reg: /pimpandhost\.com\/(image|album)\/\d+/,
        init: () => {
            if (/image/.test(location.href)) location.href = fun.ge('a[title=Album]').href;
            fun.remove(".flex-block-1,.flex-block-2,#comments,.ano_po")
        },
        imgs: async () => {
            await fun.getNP("#album-images>.image-block", "li.active+li:not(.next)>a", null, ".pagination");
            return [...fun.gae("#album-images .image-block a[data-src]")]
        },
        insertImg: [
            [".summary", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('.author-header__album-name')",
        category: "nsfw2"
    }, {
        name: "PimpAndHost 隱藏廣告",
        reg: /pimpandhost\.com\//,
        icon: 0,
        key: 0,
        init: "fun.remove('.flex-block-1,.flex-block-2,#comments,.ano_po')",
        css: ".list-view:not(#main-list-view) .item:not(.image-block){display:none!important}",
        category: "nsfw2"
    }, {
        name: "BabeSource babesource.com",
        reg: /babesource\.com\/galleries\/.+\.html/i,
        imgs: ".box-massage__card-link",
        insertImg: [
            [".albaums-box", 1], 2
        ],
        go: 1,
        customTitle: "return fun.title('|',1)",
        category: "nsfw2"
    }, {
        name: "Pornpaw 圖片清單頁 www.pornpaw.com",
        reg: /www\.pornpaw\.com\/gallery\/[\w-]+\.html/i,
        imgs: () => {
            return [...fun.gae("img[data-src]")].map(e => e.dataset.src.replace("x160.", "."));
        },
        insertImg: [
            [".container>.row", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('h1')",
        category: "nsfw2"
    }, {
        name: "ImageFap 圖片清單頁 www.imagefap.com https://www.imagefap.com/pictures/11084503/SIDAM%20Son%20Ye-Eun%20Vol.001%20Event",
        reg: /www\.imagefap\.com\/(gallery|pictures)\/\d+/i,
        icon: 0,
        key: 0,
        init: "fun.getNP('//tr[td[@id]]','b+a.link3',null,'#gallery>font>span')",
        category: "nsfw2"
    }, {
        name: "ImageFap www.imagefap.com",
        reg: /www\.imagefap\.com\/photo\/\d+\//i,
        imgs: async () => {
            let max = parseInt(fun.ge("a.prev[title=Previous]").href.split("#")[1]) + 1;
            await fun.waitEle(".image-wrapper img");
            let arr = [];
            arr.push(fun.ge(".image-wrapper img").cloneNode(true));
            fun.show(`獲取圖片中1/${max}`, 0);
            let n = 1;
            for (let i = 1; i < max; i++) {
                fun.ge("a.next[title=Next]").click();
                await fun.delay(200, 0);
                if (await fun.waitEle(".image-wrapper img")) {
                    arr.push(fun.ge(".image-wrapper img").cloneNode(true));
                    fun.show(`獲取圖片中${n+=1}/${max}`, 0);
                }
            }
            return arr
        },
        insertImg: [".mainouter", 1],
        category: "nsfw2"
    }, {
        name: "fuskator.com 圖片清單頁",
        reg: /fuskator\.com\/thumbs\/[\w-~]+\/[\w-~]+\.html/i,
        imgs: async () => {
            fun.show("等待關鍵元素中...", 0);
            await fun.waitEle(".pic_pad");
            fun.hide();
            return [...fun.gae("#thumbimages a")];
        },
        insertImg: [
            ["//a[text()='View full images']", 2], 2
        ],
        go: 1,
        //customTitle: "return fun.geT('#info+h1')",
        category: "nsfw2"
    }, {
        name: "fuskator.com 大圖頁",
        reg: /fuskator\.com\/[\w-]+\/[\w-~]+\/index\.html/i,
        imgs: "img.full",
        category: "nsfw2"
    }, {
        name: "javbangers.com",
        reg: /www\.javbangers\.com\/albums\/.+/,
        imgs: ".images a",
        insertImg: [
            [".album-info", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('.headline>h1').trim()",
        category: "nsfw2"
    }, {
        name: "multi.xnxx.com",
        reg: /multi\.xnxx\.com\/gallery\/.+/,
        imgs: ".galleryPage .boxImg",
        insertImg: [
            [".originalLink", 2], 1
        ],
        go: 1,
        category: "nsfw2"
    }, {
        name: "色情圖片網 www.photos18.com",
        reg: /www\.photos18\.com\/\w+\/\w+/i,
        imgs: ".imgHolder a[data-fancybox]",
        insertImg: ["#content", 1],
        customTitle: () => {
            return fun.geT("h1.title").replace(/\d+P|\s?\(\d+P\)/i, "")
        },
        category: "nsfw2"
    }, {
        name: "GavPorn 相冊 https://cav103.com/albums/",
        reg: /cav\d+\.com\/albums\/\d+\/\w+\//,
        imgs: "a[data-fancybox-type]",
        insertImg: [".sponsor", 2],
        customTitle: "return fun.geT('.headline>h1')",
        css: ".top{display:none!important}",
        category: "nsfw2"
    }, {
        name: "BuzzAV www.buzzav.com",
        reg: /www\.buzzav\.com\/album\/\d+\//,
        imgs: async () => {
            await fun.getNP("//div[a[div[img[contains(@id,'album_photo')]]]]", ".pagination li.active+li>a", null, ".d-sm-block>.pagination");
            return [...fun.gae("[id^=album_photo]")].map(e => e.src.replace("tmb/", ""))
        },
        insertImg: [
            [".well-info+.content-row", 2], 1
        ],
        go: 1,
        //customTitle: "return fun.geT('.box>h1').replace(/\\[\\d+P\\]/i,'').trim()",
        //css: ".well-info+.content-row{display: block!important;}#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "nsfw2"
    }, {
        name: "Hentai Image hentai-img.com hentai-cosplays.com porn-images-xxx.com",
        reg: /(hentai-img|hentai-cosplays|porn-images-xxx)\.com\/image\/[^/]+\/$/,
        include: "//a[text()='DETAIL PAGE' or text()='詳細へ' or text()='详细信息页面']",
        imgs: () => {
            let max;
            try {
                max = fun.geT("//span[a[text()='next' or text()='次へ' or text()='下一个']]/preceding-sibling::span[1]");
            } catch (e) {
                try {
                    max = fun.geT("#page h3").match(/\d+$/)[0];
                } catch (e) {
                    max = 1;
                }
            }
            let links = [];
            let mode = location.href.split("/").slice(0, -1).pop();
            let url = location.href.replace(/[\w-]+\/$/i, "");
            for (let i = 1; i <= max; i++) {
                if (/image/.test(mode)) {
                    links.push(url + "image-" + String(i).padStart(3, "0") + "/")
                } else {
                    links.push(url + i + "/")
                }
            }
            return fun.getImgA("#display_image_detail img,#detail_list img", links, 0, [/\/p=(700|305)/, ""]);
            //return fun.getImg("#display_image_detail img,#detail_list img", max, 14, [/\/p=(700|305)/, ""]);
        },
        insertImg: ["#display_image_detail,#detail_list", 2],
        customTitle: () => {
            return fun.geT("#title>h2,#page h3").replace(/\s?Photo\s?\d+P/i, "").replace(/\s?-\s?\d+\/\d+\s?/, "").trim();
        },
        category: "nsfw2"
    }, {
        name: "Hentai Image hentai-img.com hentai-cosplays.com porn-images-xxx.com",
        reg: /(hentai-img|hentai-cosplays|porn-images-xxx)\.com\/image\/[^/]+\/(page\/\d+\/)?$/,
        init: () => {
            let ele = fun.ge("//div[span[a]]");
            if (ele) {
                let tE = fun.ge("#display_image_detail,#detail_list");
                tE.parentNode.insertBefore(ele, tE);
            }
        },
        imgs: () => {
            let max;
            try {
                max = fun.geT("#paginator>*:last-child", 3);
            } catch (e) {
                try {
                    max = fun.geT(".paginator_page[rel=next]", 2);
                } catch (e) {
                    max = 1;
                }
            }
            return fun.getImg(".icon-overlay img", max, 18, [/\/p=(700|305)/, ""]);
        },
        insertImg: ["#display_image_detail,#detail_list", 2],
        autoDownload: [0],
        next: () => {
            let next = fun.ge("//a[text()='Prev Article' or text()='前の記事' or text()='前一篇']");
            if (next) {
                return next.href
            } else {
                return null
            }
        },
        prev: "//a[text()='Next Article' or text()='次の記事' or text()='下一篇文章']",
        customTitle: () => {
            return fun.geT("#title>h2,#page h3").replace(/\s?Photo\s?\d+P/i, "").trim();
        },
        category: "nsfw2"
    }, {
        name: "Fapator 圖片清單頁",
        reg: /www\.fapator\.com\/\?content_id=/i,
        imgs: "a[data-lightbox]",
        init: () => {
            fun.remove("//div[@class='img' and a[@target and img]]")
        },
        insertImg: [".fcon+.fapad", 1],
        next: "//a[contains(text(),'next photos')]",
        prev: 1,
        category: "nsfw2"
    }, {
        name: "SMUTPOND www.smutpond.com",
        reg: /www\.smutpond\.com\/gallery-pics\/\?uid=/i,
        imgs: "img[alt=Pic]",
        insertImg: [".viewerBox", 2],
        customTitle: async () => {
            await fun.delay(2000, 0);
            return fun.geT("h2.sectionTitleLeft")
        },
        category: "nsfw2"
    }, {
        name: "SexyGirlsPics sexygirlspics.com",
        reg: /sexygirlspics\.com\/pics\/[\w-]+\//i,
        imgs: "a.ss-image",
        insertImg: [
            [".sponsor-button", 2], 1
        ],
        go: 1,
        category: "nsfw2"
    }, {
        name: "PornPic www.pornpic.com",
        reg: /www\.pornpic\.com\/gallery\/[\w-]+/i,
        imgs: ".gallery-grid a.item-link",
        insertImg: [
            [".gallery-info", 2], 1
        ],
        go: 1,
        category: "nsfw2"
    }, {
        name: "Eropics",
        reg: /eropics\.to\/\d+\/\d+\/\d+\/[\w-]+$/i,
        include: "a[href*='pixhost.to'],a[href*='www.turboimagehost.com'],a[href*='vipr.im'],a[href*='imgbox.com'],a[href*='www.imagevenue.com']",
        imgs: () => {
            if (fun.gae("a[href*='imx.to']").length > 3) {
                let yes = confirm("是否複製鏈接至剪貼簿");
                if (yes) {
                    let arr = [...fun.gae(".entry-content a")].map(a => a.href);
                    let str = arr.join("\n");
                    console.log(str);
                    copyToClipboard(str);
                    fun.show("已複製鏈接至剪貼簿");
                }
                return [];
            }
            let links = [...fun.gae(".entry-content a:not([href*='imx.to'])")].map(a => a.href);
            let resArr = [];
            let xhrNum = 0;
            for (let i in links) {
                let res = fun.xhr(links[i], "document").then(doc => {
                    fun.show(`獲取圖片中${xhrNum+=1}/${links.length}`, 0);
                    return fun.ge("#image,.pic.img.img-responsive,#imageid,#img.image-content,.card-body img", doc);
                });
                resArr.push(res);
            }
            return Promise.all(resArr);
        },
        insertImg: [
            [".entry-footer", 2], 2
        ],
        go: 1,
        referrerpolicy: 0,
        customTitle: "return fun.geT('h1.entry-title');",
        category: "nsfw2"
    }, {
        name: "Eropics",
        reg: /eropics\.to\/\d+\/\d+\/\d+\/[\w-]+$/i,
        include: "a[href*='imx.to']",
        init: () => {
            fun.show("只有複製鏈接功能", 5000);
        },
        imgs: () => {
            return [...fun.gae(".entry-content p>a")].map(a => a.href);
        },
        category: "nsfw2"
    }, {
        name: "imx.to gallery",
        reg: /https?:\/\/imx\.to\/g\/\w+$/i,
        imgs: () => {
            return [...fun.gae("img.imgtooltip")].map(e => e.src.replace("/u/t/", "/u/i/"));
        },
        insertImg: [
            ["#content", 2], 2
        ],
        go: 1,
        category: "nsfw2"
    }, {
        name: "imx.to",
        reg: /https?:\/\/imx\.to\/i\/\w+$/i,
        icon: 0,
        key: 0,
        autoClick: ".button.blue.large,#continuebutton,a[title='Show gallery']",
        category: "nsfw2"
    }, {
        name: "Bunkr bunkr-albums.io",
        reg: /bunkr\.la\/a\/\w+/,
        imgs: ".grid-images_box a:not([href*=mp4]):not([href*=rar]):not([href*=zip])",
        insertImg: [
            [".grid-images", 2], 2
        ],
        go: 1,
        category: "nsfw2"
    }, {
        name: "Ngắm Gái Xinh ngamgaixinh.us",
        reg: /ngamgaixinh\.us\/[^/]+\/$/,
        imgs: () => {
            return [...fun.gae(".wp-block-gallery img[srcset]")].map(img => {
                let splitArr = img.getAttribute("srcset").split(",");
                splitArr = splitArr.sort((a, b) => {
                    return a.match(/\s(\d+)w/)[1] - b.match(/\s(\d+)w/)[1]
                });
                return splitArr.pop().trim().split(" ")[0]
            });
        },
        insertImg: [
            [".penci-single-link-pages", 2], 2
        ],
        go: 1,
        category: "nsfw2"
    }, {
        name: "Degoo Cloud app.degoo.com",
        reg: /^https?:\/\/app\.degoo\.com\/share\//,
        imgs: async () => {
            let max = prompt("請輸入圖片抓取最大次數", "100");
            let img = ".preview-media .hidden";
            await fun.waitEle(img);
            let arr = [];
            arr.push(fun.ge(img).cloneNode(true));
            fun.show(`獲取圖片中1/${max}`, 0);
            let n = 1;
            for (let i = 1; i < max; i++) {
                fun.ge("#nextFileButton").click();
                await fun.delay(200, 0);
                if (await fun.waitEle(img)) {
                    arr.push(fun.ge(img).cloneNode(true));
                    fun.show(`獲取圖片中${n+=1}/${max}`, 0);
                }
            }
            arr = arr.map(e => e.src);
            return [...new Set(arr)]
        },
        category: "nsfw2"
    }, {
        name: "xher.net",
        reg: /xher\.net\/index\.php\?\/category\/\d+$/i,
        imgs: async () => {
            await fun.getNP("#thumbnails>li", ".pageNumberSelected+a", null, ".navigationBar");
            return [...fun.gae("#thumbnails img")].map(e => e.src.replace("_data/i/", "").replace(/-(2s|xs|sm||me|la|xl)\./, "."));
        },
        insertImg: [
            [".navigationBar", 2], 2
        ],
        go: 1,
        category: "nsfw2"
    }, {
        name: "cn.angirlz.com",
        reg: /https?:\/\/\w{2}\.angirlz\.com\/album\/\w+/,
        imgs: "img[data-lg-item-id],.lazy-img",
        customTitle: "return fun.geT('h1');",
        category: "nsfw2"
    }, {
        name: "bunnyxgirl.com letsgirlz.com",
        reg: /https?:\/\/(bunnyxgirl|letsgirlz)\.com\/[^/]+\/.+/,
        include: ".separator>a",
        imgs: ".separator>a",
        customTitle: "return fun.geT('.breadcrumbs>span:last-child');",
        category: "nsfw2"
    }, {
        name: "cn.bunnyxgirl.com cn.letsgirlz.com cn.bestxleg.com",
        reg: /https?:\/\/\w{2}\.(bunnyxgirl|letsgirlz|bestxleg)\.com\/[^/]+\/\w+/,
        include: ".separator>a",
        imgs: () => {
            let max;
            try {
                max = fun.geT(".nav-links>*:last-child", 2)
            } catch (e) {
                max = 1
            }
            return fun.getImg(".separator>a", max, 16);
        },
        insertImg: [
            [".album-post-body .clear,.album-post-share-wrap", 1, "div[itemprop='description articleBody'],.album-post-body>*:not(.album-post-inner):not(.album-post-share-wrap):not(.CustomPictureDownloadImage):not(#customPicDownloadEnd)"], 1
        ],
        customTitle: "return fun.geT('.breadcrumbs>span:last-child');",
        category: "nsfw2"
    }, {
        name: "kawaiix.com kawaiixpic.com www.peachgirlz.com peachgirlz.com pantyxart.com beautyxpic.com cutexpic.com assgirlz.com beautifulmetas.com pantyxgirl.com greatxpic.com xartpic.com perfectxpic.com bestxboobs.com artthong.com hotbeautypic.com",
        reg: /https?:\/\/(r18\.|www\.)?(kawaiix|kawaiixpic|peachgirlz|pantyxart|beautyxpic|cutexpic|assgirlz|beautifulmetas|pantyxgirl|greatxpic|xartpic|perfectxpic|bestxboobs|artthong|hotbeautypic)\.com\/[^/]+\/.+/,
        include: "//a[@data-title and picture/source]",
        imgs: "//a[@data-title and picture/source]",
        customTitle: () => {
            return fun.title(/( - Kawa| - Peach| - Panty| - Beauty| - Cute| - Ass| - Beaut| - Great| - Xart| - Perfect| - Art)/i, 1).replace(/\s?\(\d+\s?photos\)/, "").trim();
        },
        category: "nsfw2"
    }, {
        name: "cn.kawaiix.com cn.kawaiixpic.com cn.peachgirlz.com cn.pantyxart.com cn.beautyxpic.com cn.cutexpic.com cn.perfectxbody.com cn.sexyqgirl.com cn.bestxhips.com cn.bestxass.com cn.assgirlz.com cn.bestxbum.com cn.eroticxpic.com cn.xxxthong.com cn.thongxgirl.com cn.bestxlingerie.com cn.sexyxart.com cn.hotxhips.com cn.hotbeautypic",
        reg: /https?:\/\/\w{2}\.(kawaiix|kawaiixpic|peachgirlz|pantyxart|beautyxpic|cutexpic|perfectxbody|sexyqgirl|bestxhips|bestxass|assgirlz|bestxbum|adultmetas|eroticxpic|xxxthong|thongxgirl|bestxlingerie|sexyxart|hotxhips|hotbeautypic)\.com\/[^/]+\/\w+/,
        include: "//a[@data-title and picture/source]",
        imgs: () => {
            let max;
            try {
                max = fun.geT(".nav-links>*:last-child", 2)
            } catch (e) {
                max = 1
            }
            return fun.getImg("//a[@data-title and picture/source]", max, 16);
        },
        insertImg: [".hero+.hero,.entry-content,.d-flex>.col-24,.album-post", 1],
        customTitle: "return fun.geT('.entry-title,.album-title,.album-post-title,.col-12>h1').split(' No.')[0].trim();",
        css: ".flex-grid:not(.masonry){display:block!important;}",
        category: "nsfw2"
    }, {
        name: "gogo人体艺术M",
        reg: /\/(wap|mip|m)\.(gogortrt|gogo38|956n|48mp|133rt|xixirt|488xm|rtys96|renti92|rt211|gogo44|xixi78|816mm|999zv|28rtys|454t|454t|784z|34tp|28xv|22bb|444rp|03hb|39um|45xm|444wp|005mm|188rt|7m11|61ak|34bu|344F|23bp|rty6|22gs|44aq|291103|508332|693350|660183|702038|873750|981070)\.(com|org)\/\w+\/\d+\/$/i,
        init: () => {
            fun.remove("//div[div[@class='ad-16 clearfix']]")
        },
        imgs: () => {
            let max = fun.gae(".p_select option").length;
            return fun.getImg(".tal a>img[alt]", max, 11);
        },
        insertImg: [".tal", 1],
        category: "nsfw2"
    }, {
        name: "gogo人体艺术M2",
        reg: /\/(m)\.(98ah|02aj|139tu)\.com\/\w+\/(\d+\/)?\d+\.html$/i,
        imgs: () => {
            let max = fun.gae(".p_select option").length;
            return fun.getImg(".tal a>img[alt]", max, 9);
        },
        insertImg: [".tal", 1],
        css: "div[style='margin:3px 0 0 0;']{display:none!important}",
        category: "nsfw2"
    }, {
        name: "666人体艺术M",
        reg: /\/(m)\.(6666rt)\.com\/\w+\/\d+\/1\.html$/i,
        imgs: () => {
            let max = fun.geT(".article_page a").match(/\/(\d+)/)[1];
            return fun.getImg(".tal a>img[alt]", max, 11);
        },
        insertImg: [".tal", 1],
        customTitle: "return fun.title('-第1张',1)",
        css: "div[style='margin:2px 0 0 0;']{display:none!important}",
        category: "nsfw2"
    }, {
        name: "gogo人体艺术 gogortrt.com 956n.com",
        reg: /\/(gogortrt|956n)\.[a-z]{2,3}\/[a-z]+\/\d+\//i,
        imgs: () => {
            let max = fun.geT("//span[@class='current']/preceding-sibling::a|//a[@class='thisclass']/preceding-sibling::a").match(/\d+/)[0];
            return fun.getImg(".main>div>a>img[alt],.warp .content>a>img[alt]", max, 11);
        },
        insertImg: ["//div[contains(@class,'main')]/div/a/parent::* | //div[contains(@class,'content') and a/img[@alt]]", 1],
        autoDownload: [0],
        next: ".crc_l_pic.left>a:not([href^=j])",
        prev: ".crc_r_pic.right>a:not([href^=j])",
        customTitle: "try{return fun.geT('.content_title')}catch(e){return fun.title(',',1)}",
        category: "nsfw2"
    }, {
        name: "GOGO人体艺术 48mp.com 133rt.com 816mm.com",
        reg: /(48mp\.com|133rt\.com|816mm\.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".main span", 2).match(/\d+/)[0];
            return fun.getImg(".main>div>a>img[alt]", max, 11);
        },
        insertImg: ["//div[contains(@class,'main')]/div[a/img[@alt]]", 1],
        autoDownload: [0],
        next: ".crc_l_pic.left>a:not([href^=j])",
        prev: ".crc_r_pic.right>a:not([href^=j])",
        customTitle: "return fun.geT('.content_title');",
        category: "nsfw2"
    }, {
        name: "6666rt.com 只翻預覽圖",
        reg: /6666rt\.com\/\w+\/\d+\/(index\.html)?/i,
        enable: 0,
        include: "//div[@class='boxx']//li[a[@target]/img]",
        init: "fun.getNP(\"//div[@class='boxx']//li[a[@target]/img]\",'a.curent+a[href]',null,'.pagelist')",
        category: "nsfw2"
    }, {
        name: "6666rt.com 大圖頁聚圖",
        reg: /6666rt\.com\/\w+\/\d+\//i,
        enable: 0,
        init: "document.onkeydown=null;",
        imgs: () => {
            let max = fun.geT(".page>span#hover", 3).match(/\d+$/)[0];
            return fun.getImg(".imgbox>a>img[alt]", max, 11);
        },
        insertImg: ["//div[@class='imgbox' and a/img[@alt]]", 1],
        customTitle: "return fun.geT('.contitle h1>a');",
        css: "#customPicDownloadEnd{color:rgb(0, 0, 0)}",
        category: "nsfw2"
    }, {
        name: "6666rt.com 翻完預覽圖立即插入大圖 getNP搭配getImgA",
        reg: /6666rt\.com\/\w+\/\d+\/(index\.html)?/i,
        enable: 1,
        include: "//div[@class='boxx']//li[a[@target]/img]",
        imgs: async () => {
            await fun.getNP("//div[@class='boxx']//li[a[@target]/img]", "a.curent+a[href]", null, ".pagelist");
            return fun.getImgA(".imgbox>a>img[alt]", "//div[@class='boxx']//li/a[@target and img]")
        },
        //insertImg: [".boxx ul", 1],
        insertImg: [
            [".footdh", 1], 1
        ],
        go: 1,
        autoDownload: [0],
        next: "//li[contains(text(),'上一')]/a",
        prev: "//li[contains(text(),'下一')]/a",
        customTitle: "return fun.title('_',1);",
        css: ".fzltp img{height:auto!important;width:100%!important}",
        category: "nsfw2"
    }, {
        name: "508人体艺术 508332.com",
        reg: /508332\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".pagelist>a").match(/\d+/)[0];
            return fun.getImg(".imgbox>a>img[alt]", max, 11);
        },
        insertImg: ["//div[contains(@class,'imgbox') and a/img[@alt]]", 1],
        autoDownload: [0],
        next: "//li[contains(text(),'下一')]/a",
        prev: 1,
        customTitle: "return fun.title(' - 508',1);",
        category: "nsfw2"
    }, {
        name: "444人体艺术 444rp.com",
        reg: /444rp\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".pagelist>a").match(/\d+/)[0];
            return fun.getImg(".imgbox>a>img[alt]", max, 11);
        },
        insertImg: ["//div[contains(@class,'imgbox') and a/img[@alt]]", 1],
        autoDownload: [0],
        next: ".zuopre>a",
        prev: ".younext>a",
        customTitle: "return fun.geT('font>a:nth-child(3)');",
        category: "nsfw2"
    }, {
        name: "64人体艺术 www.64ay.com",
        reg: /www\.64ay\.com\/\w+\/\d+/i,
        imgs: () => {
            let max = fun.geT(".page-show>span.current", 2).match(/\d+/)[0];
            return fun.getImg(".tu>a>img[alt]", max, 9);
        },
        insertImg: ["//div[@class='tu' and a/img[@alt]]", 1],
        autoDownload: [0],
        next: "//div[contains(text(),'下一')]/a[1]",
        prev: "//div[contains(text(),'上一')]/a[2]",
        customTitle: "return fun.title(',',1);",
        category: "nsfw2"
    }, {
        name: "45人体艺术 45xm.com 873人体艺术 873750.com",
        reg: /(45xm\.com|873750\.com)\/\w+\/\d+/i,
        imgs: () => {
            let max = fun.geT(".page-show>span.current", 2).match(/\d+/)[0];
            return fun.getImg(".tu>a>img[alt]", max, 11);
        },
        insertImg: ["//div[contains(@class,'tu') and a/img[@alt]]", 1],
        autoDownload: [0],
        next: "//div[contains(text(),'下一')]/a[1]",
        prev: "//div[contains(text(),'上一')]/a[2]",
        customTitle: "try{return fun.geT('.wzbody>h1').split(/,|_/)[0]}catch(e){return fun.geT('.wzbody>h1')}",
        category: "nsfw2"
    }, {
        name: "98人体艺术 www.98ah.com",
        reg: /www\.98ah\.com\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".current", 2).match(/\d+/)[0];
            return fun.getImg(".content-pic img[alt]", max, 9);
        },
        insertImg: [".content-pic", 1],
        autoDownload: [0],
        next: "//div[contains(text(),'下一')]/a[1]",
        prev: "//div[contains(text(),'下一')]/a[2]",
        customTitle: "return fun.geT('h5').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "54人体艺术 www.54aj.com",
        reg: /www\.54aj\.com\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT("#hover", 2).match(/\d+/)[0];
            return fun.getImg(".content img[alt]", max, 9);
        },
        insertImg: [".content", 1],
        autoDownload: [0],
        next: "//span[contains(text(),'下一')]/a",
        prev: "//span[contains(text(),'上一')]/a",
        customTitle: "return fun.geT('.content>h1').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "03人体艺术网 03hb.com",
        reg: /03hb\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT("#hover", 2).match(/\d+/)[0];
            return fun.getImg(".content img[alt]", max, 11);
        },
        insertImg: [".content", 1],
        autoDownload: [0],
        next: "//span[contains(text(),'下一')]/a",
        prev: "//span[contains(text(),'上一')]/a",
        customTitle: "return fun.geT('.currentpath span:nth-child(2)>a:nth-child(2)').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "48人体艺术 www.48gd.com",
        reg: /www\.48gd\.com\/\w+\/\d+\.html/i,
        init: "document.onkeydown=null",
        imgs: () => {
            let max = fun.geT('.pagelist>strong', 2).match(/\d+/)[0];
            return fun.getImg('#content img[alt]', max, 9);
        },
        insertImg: ["#content", 1],
        autoDownload: [0],
        next: "//span[contains(text(),'下一')]/a",
        prev: "//span[contains(text(),'上一')]/a",
        customTitle: "return fun.geT('.photo-tit>h3').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "693人体艺术 693350.com",
        reg: /693350\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".pagelist>a").match(/\d+/)[0];
            return fun.getImg("#content img[alt]", max, 11);
        },
        insertImg: ["#content", 1],
        autoDownload: [0],
        next: "//span[contains(text(),'下一')]/a",
        prev: "//span[contains(text(),'上一')]/a",
        customTitle: "return fun.geT('.photo-tit>h3').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "42人体艺术 www.42jd.com",
        reg: /www\.42jd\.com\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".pagelist>.curent", 2).match(/\d+/)[0];
            return fun.getImg(".imgbox img[alt]", max, 9);
        },
        insertImg: [".imgbox", 1],
        autoDownload: [0],
        next: "//li[contains(text(),'下一')]/a",
        prev: "//li[contains(text(),'上一')]/a",
        customTitle: "return fun.geT('.imgbox h1').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "36人体艺术 www.36ut.com",
        reg: /www\.36ut\.com\/\w+\/\d+\.html/i,
        init: "document.onkeydown=null",
        imgs: () => {
            let max = fun.geT(".page-show>.current", 2).match(/\d+/)[0];
            return fun.getImg(".pp.hh img[alt]", max, 9);
        },
        insertImg: [".pp.hh", 1],
        customTitle: "return fun.geT('.des>h1').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "西西人体艺术 xixirt.org 291103.com",
        reg: /(xixirt\.org|291103\.com)\/\w+\/\d+\//i,
        init: "document.onkeydown=null",
        imgs: () => {
            let max = fun.geT(".page-show>.current", 2).match(/\d+/)[0];
            return fun.getImg(".pp.hh img[alt]", max, 11);
        },
        insertImg: [".pp.hh", 1],
        customTitle: "return fun.geT('.des>h1').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "366人体艺术 366807.com 660人体艺术 18人体艺术",
        reg: /(366807\.com|660183\.com|18renti\.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".page-show>a,.page>a").match(/\d+/)[0];
            return fun.getImg(".content img[alt]", max, 11);
        },
        insertImg: [".content", 1],
        autoDownload: [0],
        next: "//span[contains(text(),'下一')]/a",
        prev: "//span[contains(text(),'上一')]/a",
        customTitle: "return fun.title(/_西西| - 660| - 18/,1);",
        category: "nsfw2"
    }, {
        name: "702人体艺术 211人体艺术",
        reg: /(702038\.com|rt211.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".page-show>a").match(/\d+/)[0];
            return fun.getImg(".content-pic img[alt],#bomei img[alt]", max, 11);
        },
        insertImg: [".content-pic,#bomei", 1],
        autoDownload: [0],
        next: ".updown>a,#prenext a",
        prev: 1,
        customTitle: "return fun.title(/- 702| - 211/,1);",
        category: "nsfw2"
    }, {
        name: "188人体艺术 188rt.com",
        reg: /188rt\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".page-show>a").match(/\d+/)[0];
            return fun.getImg("#bomei img[alt]", max, 11);
        },
        insertImg: ["#bomei", 1],
        autoDownload: [0],
        next: "#prenext a",
        prev: "#prenext li:last-child>a",
        customTitle: "return fun.geT('#bobox>h1').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "39人体艺术 39um.com",
        reg: /39um\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".page-show>a").match(/\d+/)[0];
            return fun.getImg(".content-pic img[alt],#bomei img[alt]", max, 11);
        },
        insertImg: [".content-pic", 1],
        autoDownload: [0],
        next: ".updown>a",
        prev: 1,
        customTitle: "return fun.geT('.content>h5');",
        category: "nsfw2"
    }, {
        name: "23人体艺术 www.23fe.com",
        reg: /www\.23fe\.com\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".thispg", 2).match(/\d+/)[0];
            return fun.getImg("#content-p img[alt]", max, 9);
        },
        insertImg: ["#content-p", 1],
        autoDownload: [0],
        next: "//span[contains(text(),'下一')]/a",
        prev: "//span[contains(text(),'上一')]/a",
        customTitle: "return fun.geT('#ctt>h1').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "AJ人体艺术 www.02aj.com",
        reg: /www\.02aj\.com\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".thisclass", 2).match(/\d+/)[0];
            return fun.getImg(".content img[alt]", max, 9);
        },
        insertImg: [".content", 1],
        autoDownload: [0],
        next: "//div[contains(text(),'下一')]/a",
        prev: "//div[contains(text(),'上一')]/a",
        customTitle: "return fun.geT('.title>h1');",
        category: "nsfw2"
    }, {
        name: "gogo人体艺术 gogo44.com",
        reg: /gogo44\.com\/\w+\/\d+\//i,
        init: "fun.ge('.content a').removeAttribute('href')",
        imgs: () => {
            let max = fun.geT(".thisclass", 2).match(/\d+/)[0];
            return fun.getImg(".content img[alt]", max, 11);
        },
        insertImg: [".content a", 1],
        autoDownload: [0],
        next: ".updown a",
        prev: ".updown span:last-child>a",
        customTitle: "return fun.title(/ - gogo/,1);",
        category: "nsfw2"
    }, {
        name: "28人体艺术 28rtys.com 4F人体艺术 344f.com",
        reg: /(28rtys\.com|344f\.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".thisclass", 2).match(/\d+/)[0];
            return fun.getImg(".picbox img[alt]", max, 11);
        },
        insertImg: [".picbox", 1],
        autoDownload: [0],
        next: ".page+.content-msg a",
        prev: 1,
        customTitle: "return fun.title(/ - 28| - 4F/,1);",
        category: "nsfw2"
    }, {
        name: "西西人体艺术 44aq.com",
        reg: /44aq\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".page a").match(/\d+/)[0];
            return fun.getImg(".picbox img[alt]", max, 11);
        },
        insertImg: [".picbox", 1],
        autoDownload: [0],
        next: ".updown_r>a",
        prev: ".updown_l>a",
        customTitle: "return fun.title(/,/,1);",
        category: "nsfw2"
    }, {
        name: "139人体艺术 www.139tu.com",
        reg: /www\.139tu\.com\/\w+\/\d+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT("#hover", 2).match(/\d+/)[0];
            return fun.getImg(".img_content img[alt]", max, 9);
        },
        insertImg: [".img_content", 1],
        customTitle: "return fun.geT('#title>h1');",
        category: "nsfw2"
    }, {
        name: "GOGO人体艺术网 gogo38.com",
        reg: /(gogo38\.com|981070\.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".current", 2).match(/\d+/)[0];
            return fun.getImg(".content_pic img[alt]", max, 11);
        },
        insertImg: [".content_pic", 1],
        customTitle: "return fun.geT('.content>h1>a');",
        category: "nsfw2"
    }, {
        name: "488人体艺术 488xm.com",
        reg: /488xm\.com\/\w+\/\d+\//i,
        imgs: "js;let max=fun.geT('.pagelist>strong',2).match(/\\d+/)[0];return fun.getImg('#content img[alt]',max,11);",
        insertImg: ["#content", 1],
        autoDownload: [0],
        next: "//span[contains(text(),'下一')]/a",
        prev: "//span[contains(text(),'上一')]/a",
        customTitle: "return fun.geT('h3>a').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "92人体艺术 renti92.com",
        reg: /renti92\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".pagination>a").match(/\d+/)[0];
            return fun.getImg("#gallery img[alt]", max, 11);
        },
        insertImg: ["#gallery", 1],
        autoDownload: [0],
        next: ".other-prev a",
        prev: ".other-next a",
        customTitle: "return fun.title(/ - 92/,1);",
        category: "nsfw2"
    }, {
        name: "005人体艺术 005mm.com",
        reg: /005mm\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".pagination>a").match(/\d+/)[0];
            return fun.getImg("#gallery img[alt]", max, 11);
        },
        insertImg: ["#gallery", 1],
        autoDownload: [0],
        next: ".other-prev a",
        prev: ".other-next a",
        customTitle: "return fun.geT('.post-nav>a:nth-child(3)');",
        category: "nsfw2"
    }, {
        name: "西西人体艺术 xixi78.com 711人体艺术 7m11.com",
        reg: /(xixi78\.com|7m11\.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".content-page>a").match(/\d+/)[0];
            return fun.getImg("#content img[alt]", max, 11);
        },
        insertImg: ["#content", 1],
        customTitle: "return fun.title(/ - 西西| - 711/,1);",
        category: "nsfw2"
    }, {
        name: "96人体艺术 rtys96.com 61人体艺术 61ak.com",
        reg: /(rtys96\.com|61ak.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".bigpages>a").match(/\d+/)[0];
            return fun.getImg("#showimages img[alt]", max, 11);
        },
        insertImg: ["#showimages", 1],
        autoDownload: [0],
        next: "#pageNum a",
        prev: 1,
        customTitle: "return fun.title(/ - 96| - 61/,1);",
        category: "nsfw2"
    }, {
        name: "999人体艺术 999zv.com 西西人体艺术 34bu.com",
        reg: /(999zv\.com|34bu.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".pages a").match(/\d+/)[0];
            return fun.getImg(".section.fix.tc img[alt]", max, 11);
        },
        insertImg: [".section.fix.tc", 1],
        autoDownload: [0],
        next: ".arcLocal.r a",
        prev: 1,
        customTitle: "return fun.title(',',1);",
        category: "nsfw2"
    }, {
        name: "454人体艺术 454t.com 爱上人体艺术 23bp.com",
        reg: /(454t\.com|23bp\.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".page a").match(/\d+/)[0];
            return fun.getImg("#content-p img[alt]", max, 11);
        },
        insertImg: ["#content-p", 1],
        customTitle: "return fun.title(',',1);",
        category: "nsfw2"
    }, {
        name: "748人体艺术 784z.com 66人体艺术 rty6.com",
        reg: /(784z\.com|rty6.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".pages a").match(/\d+/)[0];
            return fun.getImg(".image-view img[alt]", max, 11);
        },
        insertImg: [".image-view", 1],
        autoDownload: [0],
        next: ".i-digg>.article-adbottom a",
        prev: 1,
        customTitle: "return fun.title(/,|_/,1);",
        category: "nsfw2"
    }, {
        name: "34人体艺术 34tp.com 高清人体艺术 22gs.com",
        reg: /(34tp\.com|22gs.com)\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".gengduo a").match(/\d+/)[0];
            return fun.getImg("#content-p img[alt]", max, 11);
        },
        insertImg: ["#content-p p", 1],
        autoDownload: [0],
        next: ".gg a",
        prev: 1,
        customTitle: "return fun.title(/ - 34|,/,1);",
        category: "nsfw2"
    }, {
        name: "22bb人体艺术 22bb.org",
        reg: /22bb\.org\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".page-show>a").match(/\d+/)[0];
            return fun.getImg(".content img[alt]", max, 11);
        },
        insertImg: [".content", 1],
        autoDownload: [0],
        next: "//span[contains(text(),'下一')]/a",
        prev: "//span[contains(text(),'上一')]/a",
        customTitle: "return fun.title(',',1);",
        category: "nsfw2"
    }, {
        name: "444人体艺术 444wp.com",
        reg: /444wp\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".page a").match(/\d+/)[0];
            return fun.getImg(".content img[alt]", max, 11);
        },
        insertImg: [".content", 1],
        autoDownload: [0],
        next: ".page+.page a",
        prev: ".page+.page a+a",
        customTitle: "return fun.geT('h2');",
        category: "nsfw2"
    }, {
        name: "爱人体艺术 28xv.com",
        reg: /28xv\.com\/\w+\/\d+\//i,
        imgs: () => {
            let max = fun.geT(".page a").match(/\d+/)[0];
            return fun.getImg(".imgTip+a>img[alt]", max, 11);
        },
        insertImg: [".imgTip+a", 1],
        autoDownload: [0],
        next: ".updown_r>a",
        prev: ".updown_l>a",
        customTitle: "return fun.geT('h1').split(',')[0];",
        category: "nsfw2"
    }, {
        name: "E-Hentai圖片清單頁 e-hentai.org exhentai.org",
        reg: /(e-hentai|exhentai).org\/g\/\d+\/\w+\/$/,
        imgs: async () => {
            await fun.getNP(".gdtm,.gdtl", ".ptds+td>a", null, "//tr[td[@class='ptds']]");
            [...fun.gae(".gdtm>div,.gdtl>div")].forEach(e => {
                e.removeAttribute("style")
            });
            return fun.getImgA("#img", ".gdtm a,.gdtl a", 1, [null, null], 0)
        },
        insertImg: ["#gdt", 1],
        customTitle: "return fun.geT('#gn');",
        css: "div.gdtm,div.gdtl{text-align:center!important;float:unset!important;margin:2px 0px!important;width:100%!important;height:auto!important}",
        one: 1,
        category: "hcomic"
    }, {
        name: "nhentai圖片清單頁 nhentai.net nyahentai.red www.hentai.name nhentai.xxx nhentai.to nhentai.website",
        reg: /(nhentai\.net|nyahentai\.red|www\.hentai\.name|nhentai\.xxx|nhentai\.to|nhentai\.website)\/g\/\d+\/?$/,
        imgs: () => {
            return fun.getImgA("#image-container img", "a.gallerythumb", 1, [null, null], 0);
        },
        insertImg: [".thumbs,#thumbnail-container", 1],
        autoClick: ["#show-all-images-button"],
        customTitle: "try{return fun.geT('h2.title,h2')}catch(e){return fun.geT('h1.title,h1')}",
        one: 1,
        css: ".thumb-container{width:100%!important;margin:0px!important}.thumbs img{padding:0px!important;border-radius:0!important;width:auto!important;height:auto!important;max-width:100%!important;display:block!important;margin:0 auto !important}",
        category: "hcomic"
    }, {
        name: "Cathentai/Hentaibeeg/Hentaicolor/圖片清單頁showAll cathentai.net hentaibeeg.com hentaicolor.net",
        reg: /(cathentai\.net|hentaibeeg\.com|hentaicolor\.net)\/[^/]+\/(#collapse)?$/i,
        icon: 0,
        key: 0,
        autoClick: ["#showAll"],
        category: "hcomic"
    }, {
        name: "Cathentai/Hentaibeeg/Hentaicolor/List Read頁 cathentai.net hentaibeeg.com hentaicolor.net",
        reg: /(cathentai\.net|hentaibeeg\.com|hentaicolor\.net)\/read\/\d+\.html$/i,
        imgs: () => {
            return fun.run(fun.geT("#listImgH"));
        },
        customTitle: "return fun.title(/ - Cathentai| - Hentaicolor| - Hentaibeeg/,1);",
        category: "hcomic"
    }, {
        name: "3hentai圖片清單頁 www.3hentai1.buzz",
        reg: /www\.3hentai1\.buzz\/\?d\/\d+$/,
        imgs: () => {
            return fun.getImgA(".js-main-img", ".single-thumb>a", 1, [null, null], 0);
        },
        insertImg: ["#thumbnail-gallery", 1],
        customTitle: "try{return fun.geT('#main-info>h2')}catch(e){return fun.geT('#main-info>h1')}",
        one: 1,
        css: "#header-ban-agsy,#middle-ban-agsy,#footer-ban-agsy{display:none!important}.single-thumb-col{padding:0px!important;width:100%!important}",
        category: "hcomic"
    }, {
        name: "HentaiFox圖片清單頁 hentaifox.com",
        reg: /hentaifox\.com\/gallery\/\d+\/$/,
        include: ".view_group",
        imgs: async () => {
            fun.show("等待關鍵元素中...", 0);
            await fun.waitEle(".view_group[style]");
            fun.hide();
            return fun.getImgA("#gimg", ".g_thumb>a", 1, [null, null], 0);
        },
        insertImg: ["#append_thumbs", 1],
        autoClick: ["#load_all"],
        customTitle: "return fun.geT('.info>h1')",
        one: 1,
        css: ".gallery_thumb{margin:0!important;width:100%!important}",
        category: "hcomic"
    }, {
        name: "HentaiFox圖片清單頁 hentaifox.com",
        reg: /hentaifox\.com\/gallery\/\d+\/$/,
        imgs: () => {
            return fun.getImgA("#gimg", ".g_thumb>a", 1, [null, null], 0);
        },
        insertImg: ["#append_thumbs", 1],
        customTitle: "return fun.geT('.info>h1')",
        one: 1,
        css: ".gallery_thumb{margin:0!important;width:100%!important}",
        category: "hcomic"
    }, {
        name: "Pururin圖片清單頁 pururin.to",
        reg: /pururin\.to\/gallery\/\d+\/.+/,
        enable: 1,
        icon: 0,
        key: 0,
        autoClick: ["//button[contains(text(),'View all')]"],
        //imgs: "js;let arr=[];document.querySelectorAll('#app>.box a[href*=read]>img').forEach(e=>{arr.push(e.src.replace('t.',''))});return arr;",
        //insertImg: [[".box-gallery+#app",2], 2, 3000],
        //autoClick: "a[href$='all-pages']",
        //customTitle: "return fun.geT('.info>h1')",
        //one: 1,
        //css: ".gallery_thumb{margin:0!important;width:100%!important}",
        category: "hcomic"
    }, {
        name: "nhentai閱讀頁 nhentai.com",
        reg: /nhentai\.com\/\w+\/comic\/[^/]+\/reader\//i,
        imgs: ".vertical-image img[data-src]",
        customTitle: async () => {
            await fun.delay(1000, 0);
            return fun.geT(".router-link-active")
        },
        category: "hcomic"
    }, {
        name: "Pururin閱讀頁 pururin.to",
        reg: /pururin\.to\/read\/\d+\/\d+\/.+/,
        imgs: () => {
            let arr = [];
            let path = fun.ge(".img-fluid").src.match(/.+\//)[0];
            let max = fun.geT("select+label").match(/\d+/)[0];
            for (let i = 1; i <= max; i++) {
                arr.push(path + i + ".jpg")
            }
            return arr;
        },
        insertImg: [".container #app", 2],
        customTitle: () => {
            return fun.geT("#app>ol>li:nth-child(4)").replace(/\/|\|/g, "-");
        },
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "hcomic"
    }, {
        name: "9hentai閱讀頁 9hentai.to",
        reg: /9hentai\.to\/g\/\d+\/\d+\/$/,
        delay: 300,
        imgs: () => {
            let arr = [];
            let path = fun.ge(".image-viewer .img-fluid").src.match(/.+\//)[0];
            let max = fun.attr(".number-input__input", "max");
            for (let i = 1; i <= max; i++) {
                arr.push(path + i + ".jpg")
            }
            return arr;
        },
        insertImg: [".image-viewer", 2],
        customTitle: "return fun.title(' - Page',1);",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "hcomic"
    }, {
        name: "AsmHentai閱讀頁 asmhentai.com",
        reg: /asmhentai\.com\/gallery\/\d+\/\d+\/$/,
        imgs: () => {
            let arr = [];
            let path = fun.ge("#fimg").src.match(/.+\//)[0];
            let max = $("#pages").val();
            for (let i = 1; i <= max; i++) {
                arr.push(path + i + ".jpg")
            }
            return arr;
        },
        insertImg: [".rd_fimg", 2],
        customTitle: "return fun.title(' Page',1);",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "hcomic"
    }, {
        name: "AsmHentai View All asmhentai.com",
        reg: /asmhentai\.com\/g\/\d+\/$/,
        icon: 0,
        key: 0,
        autoClick: ["#load_all"],
        category: "hcomic"
    }, {
        name: "MultPorn閱讀頁 multporn.net",
        reg: /multporn\.net\//,
        include: "//script[contains(text(),'configUrl')]",
        imgs: () => {
            let str = [...document.scripts].find(s => s.innerHTML.search(/configUrl/) > -1).innerHTML.match(/configUrl":"[^,]+/g)[0].slice(12, -1).replaceAll("\\", "");
            let url = location.origin + str;
            return fetch(url).then(res => res.text()).then(res => {
                let xml = fun.xml(res);
                let imgs = [...fun.gae("image", xml)];
                return imgs.map(e => e.getAttribute("linkURL"))
            })
        },
        insertImg: [
            [".juicebox-parent", 2], 2
        ],
        autoDownload: [0],
        next: "//a[text()='Next Part']",
        prev: "//a[text()='Previous Part']",
        customTitle: "return fun.geT('#page-title');",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "hcomic"
    }, {
        name: "HentaiHere閱讀頁 hentaihere.com",
        reg: /hentaihere\.com\/m\/\w+\/\d+\/\d+\/$/i,
        include: "//script[contains(text(),'rff_imageList')]",
        imgs: () => {
            return rff_imageList.map(e => "https://hentaicdn.com/hentai" + e);
        },
        insertImg: ["#reader-content", 2],
        autoDownload: [0],
        next: "//li[a[@class='bg-info']]/following-sibling::li[1]/a",
        prev: 1,
        customTitle: "return fun.geT('#detail span')+' - '+fun.geT('#chapter span');",
        css: ".afs_ads,[data-type]{display:none!important}",
        category: "hcomic"
    }, {
        name: "HentaiPaw圖片清單頁 hentaipaw.com",
        reg: /hentaipaw\.com\/articles\/view\/\d+$/i,
        imgs: "img[data-src]",
        insertImg: [
            [".container>*:last-child", 2], 2
        ],
        go: 1,
        customTitle: () => {
            return fun.geT("h1.detail-ttl").replace(/\/|\|/g, " ");
        },
        category: "hcomic"
    }, {
        name: "HDpornComics圖片清單頁 hdporncomics.com",
        reg: /hdporncomics\.com\/[^/]+\/([^/]+\/)?$/i,
        include: ".my-gallery.scrollmenu",
        imgs: ".my-gallery a[data-size]",
        insertImg: [
            [".postContent>.items-center,#likeDislikeVue", 2], 2
        ],
        go: 1,
        customTitle: () => {
            return fun.geT("#infoBox>h1").replace(" – Gay Manga", "").replace(" Comic Porn", "");
        },
        category: "hcomic"
    }, {
        name: "HDpornComics閱讀頁 hdporncomics.com",
        reg: /hdporncomics\.com\/manhwa\/[^/]+\/chapter/i,
        imgs: "#imageContainer>img",
        autoDownload: [0],
        next: "//a[contains(text(),'Next')]",
        prev: "//a[contains(text(),'Prev')]",
        customTitle: () => {
            return fun.geT(".list-reset li:nth-child(5)>a") + " - " + fun.geT("option[selected]");
        },
        category: "hcomic"
    }, {
        name: "Doujins圖片清單頁 doujins.com",
        reg: /doujins\.com\/.+\/.+/i,
        include: "#thumbnails",
        imgs: ".swiper-wrapper>div:not(:first-of-type):not(:last-of-type) .swiper-lazy",
        insertImg: [
            ["#thumbnails", 2], 2
        ],
        go: 1,
        customTitle: "return fun.geT('.folder-title>a:last-child');",
        category: "hcomic"
    }, {
        name: "Simply Hentai圖片清單頁 www.simply-hentai.com",
        reg: /www\.simply-hentai\.com\/2-original-work\/.+/i,
        exclude: "nav.pagination,#reader-image",
        imgs: () => {
            return [...fun.gae("img[data-src]")].map(e => e.dataset.src.replace("small_thumb_", ""));
        },
        insertImg: [
            ["//main[@class='container']/*[last()]", 2], 2, 2000
        ],
        go: 1,
        autoClick: "a[href$='all-pages']",
        customTitle: () => {
            try {
                return fun.geT("h1.content-headline>a").replace(/\/|\|/g, "-")
            } catch (e) {
                return fun.geT("h1").replace(/\/|\|/g, "-")
            }
        },
        css: ".text-center{display:none!important}",
        category: "hcomic"
    }, {
        name: "Hanime1圖片清單頁 https://hanime1.me/comics",
        reg: /hanime1\.me\/comic\/\d+$/,
        imgs: () => {
            return [...fun.gae(".comics-thumbnail-wrapper img[data-srcset]")].map(e => e.dataset.srcset.replace("t.n", "i.n").replace("t.jpg", ".jpg"));
        },
        insertImg: [".comics-thumbnail-wrapper", 2, 1000],
        autoClick: "#show-all-comics-btn",
        customTitle: "try{return fun.geT('h4.title')}catch(e){return fun.geT('h3.title')}",
        one: 1,
        referer: "src",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "hcomic"
    }, {
        name: "IMHentai imhentai.xxx load_all",
        reg: /imhentai\.xxx\/gallery\/\d+\//,
        icon: 0,
        key: 0,
        observerClick: "#load_all",
        category: "hcomic"
    }, {
        name: "IMHentai imhentai.xxx",
        reg: /imhentai\.xxx\/view\/\d+\/\d+\//,
        init: "setTimeout(()=>{fun.ge('.pre_img').removeAttribute('style');$('a.next_img').unbind('click');},1000)",
        imgs: () => {
            let max = fun.geT(".total_pages");
            return fun.getImgO("#gimg", max, 14, [null, null], 0, ".nav_pagination", 0);
        },
        insertImg: [".pre_img", 1, 2000],
        customTitle: "return fun.title('-',1);",
        one: 1,
        category: "hcomic"
    }, {
        name: "Hentai2Read hentai2read.com",
        reg: /hentai2read\.com\/\w+\/\d+\/(\d+\/)?$/,
        imgs: () => {
            return gData.images.map(e => "https://static.hentai.direct/hentai" + e);
        },
        insertImg: ["#js-reader", 2],
        autoDownload: [0],
        next: "//li[a[contains(@class,'bg-info')]]/preceding-sibling::li[1]/a",
        prev: 1,
        customTitle: () => {
            return fun.geT(".reader-left-text.text-ellipsis").replace(/\//g, "-");
        },
        //one: 1,
        category: "hcomic"
    }, {
        name: "XlecX xlecx.one",
        reg: /xlecx\.one\/[\w-]+\.html$/,
        imgs: ".ug-thumb-image",
        insertImg: [
            [".page__col-left", 0], 2
        ],
        customTitle: () => {
            return fun.geT(".page__col-left>h1");
        },
        category: "hcomic"
    }, {
        name: "HentaiPorns hentaiporns.net",
        reg: /hentaiporns\.net\/[\w-]+\/$/,
        include: ".gallery",
        imgs: ".gallery-item a",
        insertImg: [
            [".gallery", 0], 2
        ],
        go: 1,
        customTitle: () => {
            try {
                return fun.geT("#gn+h1");
            } catch (e) {
                return fun.geT("#gn,.entry-title");
            }
        },
        category: "hcomic"
    }, {
        name: "H漫畫貼圖 - 7mmtv.sx",
        reg: /7mmtv\.sx\/.*hcomic/,
        imgs: () => {
            return Large_cgurl.map(e => {
                if (/imgur/.test(e)) return e;
                return null
            });
        },
        insertImg: ["#show_cg_html", 1],
        customTitle: () => {
            return fun.title(" - 7mmtv.sx", 1).replace(/\s?\(\d+P\)/i, "");
        },
        category: "hcomic"
    }, {
        name: "18H 18h.mm-cg.com",
        reg: /18h\.mm-cg\.com\/(zh\/?)18H_content\/\d+\/content\.html/,
        imgs: () => {
            return Large_cgurl;
        },
        insertImg: ["#show_cg_html", 1],
        customTitle: "return fun.title('-',1);",
        category: "hcomic"
    }, {
        name: "H 次元 h-ciyuan.com",
        reg: /h-ciyuan\.com\/\d+\/\d+\/.+\//,
        include: "a[data-fancybox]",
        imgs: "a[data-fancybox]",
        //insertImg: [".entry-content", 2],
        insertImg: [
            [".entry-content", 2], 2
        ],
        go: 1,
        next: ".nav-previous>a",
        prev: ".nav-next>a",
        customTitle: "return fun.geT('.post-title');",
        category: "hcomic"
    }, {
        name: "淫漫画 www.yinmh.com www.yinmh.top www.yinmh.xyz",
        reg: /www\.yinmh\.(com|top|xyz)\/\d+\.html/,
        imgs: () => {
            let arr = [];
            [...fun.gae(".left>.image img.lazy")].forEach(e => {
                if (!/loading/.test(e.src)) {
                    arr.push(e.src)
                } else {
                    arr.push(e.getAttribute("img"))
                }
            });
            return arr;
        },
        insertImg: [".left", 2],
        customTitle: "return fun.geT('.box>h1');",
        category: "hcomic"
    }, {
        name: "漫畫聯合國 www.comicun.com",
        enable: 0,
        reg: /www\.comicun\.com\/index-look(-cid)?-name-.+/,
        init: "$(document).unbind('click');",
        imgs: () => {
            let max = $("#total").val();
            return fun.getImg("#ComicPic", max, 20);
        },
        insertImg: [".e", 1],
        category: "comic"
    }, {
        name: "丽图·污漫画 litu100.xyz",
        reg: /litu\d+\.xyz\/comic\/id-\w+\/\d+\.html/,
        imgs: ".article.comic img",
        insertImg: [".article.comic", 2],
        autoDownload: [0],
        next: "a.next",
        prev: "a.prev",
        customTitle: "return fun.geT('.breadcrumb span:nth-child(2)').replace('首页','');",
        category: "hcomic"
    }, {
        name: "韩国污漫画 www.ikanmh.xyz",
        reg: /www\.ikanmh\.xyz\/chapter\/\d+/,
        imgs: "img[data-original]",
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.geT('h1.title');",
        category: "hcomic"
    }, {
        name: "Avbebe.com https://avbebe.com/archives/category/%e6%88%90%e4%ba%bah%e6%bc%ab%e7%95%ab",
        reg: /avbebe\.com\/archives\/\d+/,
        include: "//a[@rel='category tag' and text()='成人漫畫']",
        imgs: "img[decoding]",
        //insertImg: [".content-inner", 2],
        customTitle: () => {
            return fun.geT(".jeg_post_title").replace(/\[\d+P\]/i, "");
        },
        category: "hcomic"
    }, {
        name: "ACG漫画网 www.acgxmh.com www.cool-manga.com www.porn-comic.com",
        reg: /(www\.acgxmh\.com|www\.cool-manga\.com|www\.porn-comic\.com)\/(h|hentai)\/\d+\.html/,
        imgs: () => {
            let max = fun.geT("#pages>*:last-child", 2);
            return fun.getImg(".manga-page img", max, 5);
        },
        insertImg: [".manga-page", 1],
        autoDownload: [0],
        next: ".next_pics>.fr>a[href$=html]",
        prev: ".next_pics>.fl>a[href$=html]",
        customTitle: () => {
            return fun.geT("h2.title").replace(/_\d+P$/i, "");
        },
        category: "hcomic"
    }, {
        name: "紳士漫畫 圖片清單頁 www.wnacg.com www.wnacg.org m.wnacg.org m.wnacg.com www.wnacglink.top wn01.ru wn02.ru www.htmanga3.top www.htmanga4.top www.htmanga5.top",
        reg: /(www\.wnacg\.com|www\.wnacg\.org|m\.wnacg\.com|m\.wnacg\.org|www\.htmanga\d\.top)\/photos-index(-page-\d+)?-aid-\d+\.html/,
        icon: 0,
        key: 0,
        init: "fun.getNP('.gallary_item','.thispage+a',null,'.paginator',0,null,0)",
        category: "nsfw2"
    }, {
        name: "紳士漫畫 下拉閱讀頁 www.wnacg.com www.wnacg.org m.wnacg.org m.wnacg.com",
        reg: /(www\.wnacg\.com|www\.wnacg\.org|m\.wnacg\.com|m\.wnacg\.org|www\.htmanga\d\.top)\/photos-(slide|slidelow)-aid-\d+\.html/,
        imgs: () => {
            return imglist.map(e => e.url);
        },
        insertImg: ["#img_list", 2],
        customTitle: "return fun.title(' - 列表',1);",
        //css: "#img_list{max-width: 60% !important;margin: 0 auto !important;}",
        category: "nsfw2"
    }, {
        name: "VN漫画网 下拉阅读 www.vnacg.com",
        reg: /www\.vnacg\.com\/show\/\d+\.html/,
        imgs: async () => {
            let api = `/e/extend/api/show.php?id=${info.id}&page=`;
            let max = await fetch(`${api}1`).then(res => res.json()).then(res => {
                return res.pages
            });
            let resArr = [];
            let fetchNum = 0;
            for (let i = 1; i <= max; i++) {
                let res = fetch(`${api+i}`).then(res => res.json()).then(res => {
                    fun.show(`獲取資料中${fetchNum+=1}/${max}`, 0);
                    return res.data
                });
                resArr.push(res)
            }
            return Promise.all(resArr).then(data => data.flat().map(e => e.src))
        },
        insertImg: [".show", 2],
        customTitle: "return fun.title('_免费阅读',1);",
        category: "hcomic"
    }, {
        name: "VN漫画网 清單頁 www.vnacg.com",
        reg: /www\.vnacg\.com\/detail\/\d+\.html/,
        icon: 0,
        key: 0,
        observerClick: ".layui-flow-more>a",
        category: "hcomic"
    }, {
        name: "TWHentai 圖片清單頁 twhentai.com",
        reg: /twhentai\.com\/hentai_manga\/\d+\/$/,
        imgs: async () => {
            await fun.getNP(".recommended-grids:not(.english-grid)", ".pagination li.active+li:not(.disabled)>a", null, ".pagination");
            return [...fun.gae(".recommended img")].map(e => e.src.replace("-thumb265x385", ""))
        },
        insertImg: [
            [".footer", 1], 2
        ],
        go: 1,
        customTitle: "return fun.geT('.recommended-info h3');",
        category: "hcomic"
    }, {
        name: "松鼠症倉庫 ahri8.top",
        reg: /ahri8\.top\/readOnline\d\.php\?ID=\d+&host_id=\d+/,
        imgs: () => {
            return Original_Image_List.map(e => HTTP_IMAGE + e.new_filename + "_w1500." + e.extension);
        },
        insertImg: ["#Big_Image", 2],
        customTitle: "return fun.geT('.page-header').replace('線上閱讀','');",
        css: "#content>.col-lg-12,[id^=read_online_ads_area],#Big_Image~*{display:none!important}",
        category: "hcomic"
    }, {
        name: "Caitlin.top",
        reg: /caitlin\.top\/index\.php\?route=comic\/readOnline&comic_id=\d+/,
        imgs: () => {
            return Image_List.map(e => location.protocol + HTTP_IMAGE + e.sort + "." + e.extension);
        },
        insertImg: ["#Big_Image", 2],
        customTitle: "return fun.geT('.page-header');",
        css: "#content>.col-lg-12,[id^=read_online_ads_area],#Big_Image~*{display:none!important}",
        category: "hcomic"
    }, {
        name: "禁漫屋 jmwu.vip m.jmwu.vip",
        reg: /jmwu\.\w+\/chapter\/[\w-]+\.html/,
        imgs: "img[data-original]",
        autoDownload: [0],
        next: "a[data-value=next]",
        prev: "a[data-value=prev]",
        customTitle: () => {
            return fun.title(/ – White|-禁漫屋|-\[| “/, 1);
        },
        category: "hcomic"
    }, {
        name: "Roku Hentai rokuhentai.com",
        reg: /rokuhentai\.com\/\w+\/\d+$/,
        imgs: ".site-reader__image",
        insertImg: [".site-reader", 2],
        css: ".site-reader--right-to-left,.site-reader--left-to-right{overflow-x:auto!important;overflow-y:auto!important}.site-reader{padding-bottom:0px!important}.site-reader{display:block!important;}",
        category: "hcomic"
    }, {
        name: "177 漫画/XXIAV寫真館 www.177pica.com www.177picyy.com www.xxiav.com",
        reg: /www\.(177pica|177picyy|xxiav)\.com\/html\/\d+\/\d+\/\d+\.html/,
        imgs: () => {
            let max;
            try {
                max = fun.geT(".page-links>*:last-child", 2)
            } catch (e) {
                max = 1
            }
            return fun.getImg(".single-content img[data-lazy-src]", max, 10);
        },
        insertImg: [".single-content", 2],
        autoDownload: [0],
        next: "a[rel=prev]",
        prev: 1,
        customTitle: () => {
            return fun.geT(".entry-title").replace(/\[\d+P\]$/i, "");
        },
        category: "hcomic"
    }, {
        name: "18H 宅宅愛動漫 18h.animezilla.com",
        reg: /18h\.animezilla\.com\/manga\/\d+/,
        imgs: () => {
            let max;
            try {
                max = fun.ge(".last").href.split("/").pop()
            } catch (e) {
                max = 1
            }
            return fun.getImgO("#comic", max, "4", [null, null], 0, ".wp-pagenavi", 0);
        },
        insertImg: ["#page-current", 1],
        customTitle: () => {
            return fun.geT("h1.entry-title").replace(/\s?\[\d+P\](\s?-\s?\d+\/\d+\s?)?/i, "");
        },
        category: "hcomic"
    }, {
        name: "18 禁漫 www.18mh.cc",
        reg: /www\.18mh\.cc\/index-look-name-/,
        imgs: () => {
            let url = fun.attr("img[data-url]", "data-url");
            let m = url.match(/(^.+\/)(\d+)(\.\w{2,4})$/);
            let path = m[1];
            let start = m[2];
            let ex = m[3];
            let ps = fun.gae("select[onchange]>option").length;
            let end = parseInt(start) + ps;
            let arr = [];
            for (let i = start; i < end; i++) {
                arr.push(path + i + ex)
            }
            return arr;
        },
        insertImg: [".e", 2],
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "let s = fun.geT('.b').split(' - ');return s[2]+' - '+s[3]",
        css: ".p.fanye,select[onchange],.c_p.k_pag{display:none!important}",
        category: "hcomic"
    }, {
        name: "色漫网 www.cartoon18.com",
        reg: /www\.cartoon18\.com\/story\/\d+\/full/,
        imgs: "img[data-src]",
        category: "hcomic"
    }, {
        name: "韓漫射 h-webtoon.com 绅士同人H漫 h-doujinshi.xyz",
        reg: /(h-webtoon\.com|h-doujinshi\.xyz)\/.+\//,
        init: "setTimeout(()=>{fun.gae('.g1-nav-single a').forEach(e=>{e.removeAttribute('target')})},2000)",
        include: ".g1-content-narrow",
        imgs: ".g1-content-narrow p img",
        autoDownload: [0],
        next: "#content .g1-teaser-next",
        prev: "#content .g1-teaser-prev",
        customTitle: "return fun.geT('h1.entry-title');",
        css: "#simple-banner,.touchy-wrapper,.touchy-wrapper~*:not(#customPicDownload):not(.customPicDownloadMsg),.code-block,#secondary{display:none!important}",
        category: "hcomic"
    }, {
        name: "18H漫画 18hmanga.click 萝莉少女 cosporn.online",
        reg: /(18hmanga\.click|cosporn\.online)\/.+\//,
        init: "setTimeout(()=>{fun.gae('.g1-nav-single a').forEach(e=>{e.removeAttribute('target')})},2000)",
        include: ".g1-content-narrow",
        imgs: ".g1-content-narrow p img",
        autoDownload: [0],
        next: "#content .g1-teaser-prev",
        prev: "#content .g1-teaser-next",
        customTitle: "return fun.geT('h1.entry-title');",
        css: "#simple-banner,.touchy-wrapper,.touchy-wrapper~*:not(#customPicDownload):not(.customPicDownloadMsg),.code-block,#secondary{display:none!important}",
        category: "hcomic"
    }, {
        name: "hitomi hitomi.la",
        reg: /hitomi\.la\/reader\/\d+\.html/,
        init: "setTimeout(()=>{$(document).unbind('keydown');$(document).unbind('click')},1000)",
        imgs: () => {
            let arr = [];
            let imgs = galleryinfo.files.length;
            for (let i = 0; i < imgs; i++) {
                let html = make_image_element(galleryinfo["id"], our_galleryinfo[i], no_webp);
                arr.push(html.querySelector("img"))
            }
            return arr;
        },
        insertImg: ["#comicImages", 2],
        customTitle: "return fun.title('|',1);",
        css: "body{overflow:unset!important}",
        one: 1,
        category: "hcomic"
    }, {
        name: "Orzqwq List模式 orzqwq.com",
        reg: /orzqwq\.com\/manga\/.+style=list/,
        include: "//option[@selected and text()='List style']",
        imgs: async () => {
            fun.show("等待關鍵元素中...", 0);
            await fun.waitEle(".img-responsive", 600);
            fun.hide();
            return [...fun.gae("img[data-src]")]
        },
        insertImg: [".reading-content", 2],
        customTitle: "return fun.geT('.breadcrumb>li:nth-child(2)').trim();",
        category: "hcomic"
    }, {
        name: "Orzqwq 分頁模式 orzqwq.com",
        reg: /orzqwq\.com\/manga\/.+\/p\//,
        include: "//option[@selected and text()='Paged style']",
        imgs: async () => {
            fun.show("等待關鍵元素中...", 0);
            await fun.waitEle("#chapter_preloaded_images", 600);
            fun.hide();
            return chapter_preloaded_images
        },
        insertImg: [".reading-content", 2],
        customTitle: "return fun.geT('.breadcrumb>li:nth-child(2)').trim();",
        category: "hcomic"
    }, {
        name: "Orzqwq 圖片清單頁聚集所有預覽縮圖 orzqwq.com",
        reg: /orzqwq\.com\/manga\/[^/]+\/$/,
        icon: 0,
        key: 0,
        init: "fun.getNP('.chapter-images-list>.image-item', 'li.active+li>a',null,'.pagination',0,'data-src',0)",
        category: "hcomic"
    }, {
        name: "HO5HO www.ho5ho.com",
        reg: /www\.ho5ho\.com\/.+\/.+\/server.+\//,
        include: "//script[contains(text(),'chapter_preloaded_images')]",
        imgs: () => {
            return chapter_preloaded_images
        },
        insertImg: [".reading-content", 2],
        customTitle: "return fun.geT('.breadcrumb>li:nth-child(2)').trim();",
        category: "hcomic"
    }, {
        name: "亚洲漫画走廊 asiacomics.com",
        reg: /asiacomics\.com\/chapter\/\d+/,
        imgs: "#enc_img img[data-original]",
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.geT('h1.title');",
        category: "hcomic"
    }, {
        name: "成人漫画 bad.news/mh",
        reg: /bad\.news\/mh\/view\/id-\d+/,
        imgs: ".img-responsive",
        one: 1,
        category: "hcomic"
    }, {
        name: "嗨皮漫畫閱讀 https://m.happymh.com/manga/daiwangraoming",
        enable: 0,
        icon: 0,
        reg: /m\.happymh\.com\/reads/,
        include: "#root",
        xhr: async () => {
            let lps = location.pathname.split("/");
            let mangaCode = lps[2];
            let id = lps[3];
            let api = `https://m.happymh.com/v2.0/apis/manga/read?code=${mangaCode}&cid=${id}`;
            let json = await fetch(api).then(res => res.json());
            debug("\n此頁JSON資料\n", json);
            siteJson = json
        },
        init: async () => {
            await siteData.xhr();
            let imgs = siteJson.data.scans.map(e => e.url);
            imgs.forEach(url => {
                new Image().src = url;
            });
            if (await fun.waitEle("#page-area")) {
                new IntersectionObserver((entries, observer) => {
                    if (entries[0].isIntersecting) {
                        observer.unobserve(entries[0].target);
                        let f = ge('footer>article');
                        let c1 = f.firstChild.cloneNode(true);
                        c1.firstChild.href = '/latest';
                        c1.firstChild.firstChild.innerText = '更新';
                        f.appendChild(c1);
                        let c2 = f.firstChild.cloneNode(true);
                        c2.firstChild.href = '/bookcase';
                        c2.firstChild.firstChild.innerText = '收藏';
                        f.appendChild(c2);
                        let p = gx("//a[span[text()='上一话' or text()='上一話'] and contains(@href,'reads')]");
                        if (p) {
                            p.classList.add('MuiButton-containedPrimary');
                        }
                        let n = gx("//a[span[text()='下一话' or text()='下一話'] and contains(@href,'readMore')]");
                        if (n) {
                            n.classList.remove('MuiButton-containedPrimary');
                            n.firstChild.innerText = '^_^感谢您的阅读~已经没有下一话了哦~';
                        }
                    }
                }).observe(ge('#page-area'));
            }
        },
        imgs: () => {
            return siteJson.data.scans.map(e => e.url)
        },
        //insertImg: ["//article[div[contains(@id,'imageLoader')]]", 1],
        autoDownload: [0],
        next: "//a[span[text()='下一話' or text()='下一话']]",
        prev: "//a[span[text()='上一話' or text()='上一话']]",
        customTitle: () => {
            return siteJson.data.manga_name + " - " + siteJson.data.chapter_name
        },
        category: "comic"
    }, {
        name: "嗨皮漫畫更新頁，自動點擊載入更多，鏈接新分頁打開",
        enable: 0,
        icon: 0,
        key: 0,
        reg: /m\.happymh\.com\/latest/,
        observerClick: ".more-div-btn",
        openInNewTab: ".manga-cover>a:not([target=_blank])",
        category: "comic"
    }, {
        name: "嗨皮漫畫展開目錄",
        reg: /m\.happymh\.com\/manga\//,
        enable: 0,
        icon: 0,
        key: 0,
        autoClick: "#expandButton",
        category: "comic"
    }, {
        name: "嗨皮漫畫，鏈接新分頁打開",
        reg: /m\.happymh\.com\//,
        enable: 0,
        icon: 0,
        key: 0,
        openInNewTab: ".home-banner a:not([target=_blank]),.manga-rank a:not([target=_blank]),.manga-cover a:not([target=_blank])",
        category: "comic"
    }, {
        name: "COLAMANHUA www.colamanhua.com", //方向鍵上一章下一章、反反偵錯，新版blob格式下載不了...Picviewer CE+可以
        enable: 1,
        icon: 0,
        key: 0,
        reg: /www\.colamanhua\.com\/manga-.+\.html$/,
        init: "Function.prototype.constructor=()=>{}",
        imgs: ".mh_comicpic>img[src]:not([src^=blob])",
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        css: ".mh_wrap{width:100%!important;min-width:100%!important}",
        category: "comic"
    }, {
        name: "8Comic無限動漫 https://a.twobili.com/ReadComic/103/471/471_3_Q_atq24.html",
        enable: 1,
        reg: /(a|www)\.(comicabc|twobili)\.com\/(ReadComic|online)/,
        imgs: () => {
            let code = [...document.scripts].find(s => s.innerHTML.search(/ge\(e\)/) > -1).innerHTML;
            let cM = code.match(/ge\([^.]+\.src\s?=\s?([^;]+)/);
            let keyCode = cM[1];
            let arr = [];
            for (let i = 1; i <= ps; i++) {
                let r = "(" + i + ")";
                let src = location.protocol + fun.run(keyCode.replace(/\(pp?\)/g, r));
                arr.push(src)
            }
            return arr;
        },
        insertImg: ["//td[img[@id='TheImg']]", 2],
        autoDownload: [0],
        next: "#nextvol:not([style])",
        prev: "#prevvol",
        customTitle: "let t=document.title.split(' ')[0];return`${t}-第${ch}集`;",
        category: "comic"
    }, {
        name: "8Comic無限動漫 手機版 https://8.twobili.com/comic/insurance_103.html?ch=471",
        enable: 1,
        icon: 0,
        reg: /8\.twobili\.com\/comic\/insurance/,
        init: () => {
            fun.ge("#pageindex").parentNode.appendChild(fun.ge("#prevvol").cloneNode(true));
            fun.ge('#pageindex').parentNode.appendChild(fun.ge("#nextvol").cloneNode(true));
            let ul = fun.ge("#TheTable>ul");
            let v1 = fun.ge(".view_tmenu").cloneNode(true);
            let v2 = fun.gae(".view_menut")[1];
            ul.appendChild(v2);
            ul.appendChild(v1);
            let b1 = fun.ge(".book_inc_title");
            let b2 = fun.ge(".book_link_item");
            ul.appendChild(b1);
            ul.appendChild(b2);
        },
        imgs: () => {
            let arr = [];
            for (let i = 1; i <= ps; i++) {
                let imgSrc = "https://img" + ss(c, 4, 2) + ".8comic.com/" + ss(c, 6, 1) + "/" + ti + "/" + ss(c, 0, 4) + "/" + nn([i]) + "_" + ss(c, mm([i]) + 10, 3, f) + ".jpg";
                arr.push(imgSrc)
            }
            return arr;
        },
        insertImg: ["//li[img[@id='TheImg']]", 2],
        autoDownload: [0],
        next: "#nextvol:not([style])",
        prev: "#prevvol",
        customTitle: "let t=document.title.split(' ')[0];let n=fun.geT('#chapter');return t+' - '+n;",
        css: ".pinch-zoom-container{height:auto !important;display:contents !important}.view_tmenu+div[style],#pagenum,[onclick^='j'],#pageindex,ico+a+.material-icons.right-logo{display:none !important}.view_menut a{width:33.3% !important;max-width:33.3% !important}",
        category: "comic"
    }, {
        name: "Mangabz https://www.mangabz.com/m38701/",
        enable: 0,
        reg: /(www\.)?mangabz\.com\/m\d+/,
        include: ".container",
        init: () => {
            const hidetoolbar = () => {
                var e = e || window.event;
                if (e.wheelDelta < 0 || e.detail > 0) {
                    $(".top-bar").attr("style", "top: -74px;")
                } else {
                    $(".top-bar").removeAttr("style")
                }
            };
            document.addEventListener("wheel", hidetoolbar);
            document.addEventListener("DOMMouseScroll", hidetoolbar);
            const keyhidetoolbar = (e) => {
                let key = window.event ? e.keyCode : e.which;
                if (key == "34" || key == "32" || key == "40") {
                    $(".top-bar").attr("style", "top: -74px;")
                } else {
                    $(".top-bar").removeAttr("style")
                }
            };
            document.addEventListener("keydown", keyhidetoolbar);
        },
        imgs: () => {
            if (!mkey) var mkey = "";
            let resArr = [];
            let fetchNum = 0;
            for (let i = 1; i <= MANGABZ_IMAGE_COUNT; i++) {
                let apiUrl = location.origin + MANGABZ_CURL + "chapterimage.ashx" + `?cid=${MANGABZ_CID}&page=${i}&key=${mkey}&_cid=${MANGABZ_CID}&_mid=${MANGABZ_MID}&_dt=${MANGABZ_VIEWSIGN_DT}&_sign=${MANGABZ_VIEWSIGN}`;
                let res = fetch(apiUrl).then(res => res.text()).then(res => {
                    fun.show(`獲取資料中(${fetchNum+=1}/${MANGABZ_IMAGE_COUNT})`, 0);
                    return fun.run(res)[0]
                });
                resArr.push(res)
            }
            return Promise.all(resArr)
        },
        insertImg: ["#cp_img", 2],
        autoDownload: [0],
        next: "//a[img[contains(@src,'xiayizhang')]][starts-with(@href,'/m')]",
        prev: "//a[img[contains(@src,'shangyizhang')]][starts-with(@href,'/m')]",
        customTitle: "return fun.title('_', 2).replace('漫畫','');",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}a[href^='j']{display:none !important}body{overflow:unset!important}",
        category: "comic"
    }, {
        name: "Xmanhua https://xmanhua.com/m10344/",
        enable: 0,
        reg: /(www\.)?xmanhua\.com\/m\d+/,
        include: ".reader-bottom-page-list",
        init: () => {
            const showtoolbar = () => {
                let t = fun.ge(".header.toolbar");
                if (t) {
                    $(".header").removeClass("toolbar");
                    $(".header").removeAttr("style")
                } else {
                    $(".header").addClass("toolbar");
                    $(".header").attr("style", "top: -64px;")
                }
                let b = fun.ge(".reader-bottom.toolbar");
                if (b) {
                    $(".reader-bottom").removeClass("toolbar");
                    $(".reader-bottom").removeAttr("style")
                } else {
                    $(".reader-bottom").addClass("toolbar");
                    $(".reader-bottom").attr("style", "bottom: -50px;")
                }
            };
            document.addEventListener("click", showtoolbar);
            const hidetoolbar = () => {
                var e = e || window.event;
                if (e.wheelDelta < 0 || e.detail > 0) {
                    $(".header").addClass("toolbar");
                    $(".header").attr("style", "top: -64px;");
                    $(".reader-bottom").addClass("toolbar");
                    $(".reader-bottom").attr("style", "bottom: -50px;")
                } else {
                    $(".header").removeClass("toolbar");
                    $(".header").removeAttr("style");
                    $(".reader-bottom").removeClass("toolbar");
                    $(".reader-bottom").removeAttr("style")
                }
            };
            document.addEventListener("wheel", hidetoolbar);
            document.addEventListener("DOMMouseScroll", hidetoolbar);
            const keyhidetoolbar = (e) => {
                let key = window.event ? e.keyCode : e.which;
                if (key == "34" || key == "32" || key == "40") {
                    $(".header").addClass("toolbar");
                    $(".header").attr("style", "top: -64px;");
                    $(".reader-bottom").addClass("toolbar");
                    $(".reader-bottom").attr("style", "bottom: -50px;")
                } else {
                    $(".header").removeClass("toolbar");
                    $(".header").removeAttr("style");
                    $(".reader-bottom").removeClass("toolbar");
                    $(".reader-bottom").removeAttr("style")
                }
            };
            document.addEventListener("keydown", keyhidetoolbar);
        },
        imgs: () => {
            if (!mkey) var mkey = "";
            let resArr = [];
            let fetchnUm = 0;
            for (let i = 1; i <= XMANHUA_IMAGE_COUNT; i++) {
                let apiUrl = location.origin + XMANHUA_CURL + "chapterimage.ashx" + `?cid=${XMANHUA_CID}&page=${i}&key=${mkey}&_cid=${XMANHUA_CID}&_mid=${XMANHUA_MID}&_dt=${XMANHUA_VIEWSIGN_DT}&_sign=${XMANHUA_VIEWSIGN}`;
                let res = fetch(apiUrl).then(res => res.text()).then(res => {
                    fun.show(`獲取資料中(${fetchnUm+=1}/${XMANHUA_IMAGE_COUNT})`, 0);
                    return fun.run(res)[0]
                });
                resArr.push(res)
            }
            return Promise.all(resArr)
        },
        insertImg: ["#cp_img", 2],
        autoDownload: [0],
        next: "//a[img[contains(@src,'reader-bottom-right-2')]][starts-with(@href,'/m')]",
        prev: "//a[img[contains(@src,'reader-bottom-right-1')]][starts-with(@href,'/m')]",
        customTitle: "return fun.title('_', 2).replace('漫畫','');",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}.relative>a{display:none!important}.reader-img-con{padding:64px 0 50px !important;}",
        category: "comic"
    }, {
        name: "DM5/極速 分頁模式 https://www.dm5.com/m755073/ https://hk.1kkk.com/ch1-1266817/",
        enable: 0,
        reg: /(www|tel|en|cnc|hk|m)?\.?(dm5|1kkk)\.(com|cn)\/(m|ch|vol|other)[-_0-9]+\//,
        include: "#chapterpager",
        imgs: () => {
            if (!mkey) var mkey = "";
            let resArr = [];
            let fetchNum = 0;
            for (let i = 1; i <= DM5_IMAGE_COUNT; i++) {
                let apiUrl = location.origin + DM5_CURL + "chapterfun.ashx" + `?cid=${DM5_CID}&page=${i}&key=${mkey}&language=1>k=6&_cid=${DM5_CID}&_mid=${DM5_MID}&_dt=${DM5_VIEWSIGN_DT}&_sign=${DM5_VIEWSIGN}`;
                let res = fetch(apiUrl).then(res => res.text()).then(res => {
                    fun.show(`獲取資料中(${fetchNum+=1}/${DM5_IMAGE_COUNT})`, 0);
                    return fun.run(res)[0]
                });
                resArr.push(res)
            }
            return Promise.all(resArr)
        },
        insertImg: ["#cp_img", 2],
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.title('_', 2);",
        topButton: true,
        css: "body{overflow:unset!important}",
        category: "comic"
    }, {
        name: "DM5/極速 條漫模式 https://www.dm5.com/m1343377/ https://hk.1kkk.com/ch1-1343377/",
        enable: 0,
        reg: /(www|tel|en|cnc|hk|m)?\.?(dm5|1kkk)\.(com|cn)\/(m|ch|vol|other)[-_0-9]+\//,
        include: ["#barChapter"],
        imgs: "#barChapter>img",
        insertImg: ["#barChapter", 2],
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.title('_', 2);",
        css: "body{overflow:unset!important}",
        category: "comic"
    }, {
        name: "yymanhua https://www.yymanhua.com/",
        enable: 0,
        reg: /(www\.)?yymanhua\.com\/m\d+/,
        include: ".reader-bottom-page-list",
        init: () => {
            const showtoolbar = () => {
                let t = fun.ge(".header.toolbar");
                if (t) {
                    $(".header").removeClass("toolbar");
                    $(".header").removeAttr("style")
                } else {
                    $(".header").addClass("toolbar");
                    $(".header").attr("style", "top: -64px;")
                }
                let b = fun.ge(".reader-bottom.toolbar");
                if (b) {
                    $(".reader-bottom").removeClass("toolbar");
                    $(".reader-bottom").removeAttr("style")
                } else {
                    $(".reader-bottom").addClass("toolbar");
                    $(".reader-bottom").attr("style", "bottom: -50px;")
                }
            };
            document.addEventListener("click", showtoolbar);
            const hidetoolbar = () => {
                var e = e || window.event;
                if (e.wheelDelta < 0 || e.detail > 0) {
                    $(".header").addClass("toolbar");
                    $(".header").attr("style", "top: -64px;");
                    $(".reader-bottom").addClass("toolbar");
                    $(".reader-bottom").attr("style", "bottom: -50px;")
                } else {
                    $(".header").removeClass("toolbar");
                    $(".header").removeAttr("style");
                    $(".reader-bottom").removeClass("toolbar");
                    $(".reader-bottom").removeAttr("style")
                }
            };
            document.addEventListener("wheel", hidetoolbar);
            document.addEventListener("DOMMouseScroll", hidetoolbar);
            const keyhidetoolbar = (e) => {
                let key = window.event ? e.keyCode : e.which;
                if (key == "34" || key == "32" || key == "40") {
                    $(".header").addClass("toolbar");
                    $(".header").attr("style", "top: -64px;");
                    $(".reader-bottom").addClass("toolbar");
                    $(".reader-bottom").attr("style", "bottom: -50px;")
                } else {
                    $(".header").removeClass("toolbar");
                    $(".header").removeAttr("style");
                    $(".reader-bottom").removeClass("toolbar");
                    $(".reader-bottom").removeAttr("style")
                }
            };
            document.addEventListener("keydown", keyhidetoolbar);
        },
        imgs: () => {
            if (!mkey) var mkey = "";
            let resArr = [];
            let fetchnUm = 0;
            for (let i = 1; i <= YYMANHUA_IMAGE_COUNT; i++) {
                let apiUrl = location.origin + YYMANHUA_CURL + "chapterimage.ashx" + `?cid=${YYMANHUA_CID}&page=${i}&key=${mkey}&_cid=${YYMANHUA_CID}&_mid=${YYMANHUA_MID}&_dt=${YYMANHUA_VIEWSIGN_DT}&_sign=${YYMANHUA_VIEWSIGN}`;
                let res = fetch(apiUrl).then(res => res.text()).then(res => {
                    fun.show(`獲取資料中(${fetchnUm+=1}/${YYMANHUA_IMAGE_COUNT})`, 0);
                    return fun.run(res)[0]
                });
                resArr.push(res)
            }
            return Promise.all(resArr)
        },
        insertImg: ["#cp_img", 2],
        autoDownload: [0],
        next: "//a[img[contains(@src,'reader-bottom-right-2')]][starts-with(@href,'/m')]",
        prev: "//a[img[contains(@src,'reader-bottom-right-1')]][starts-with(@href,'/m')]",
        customTitle: "return fun.title('_', 2).replace('漫畫','');",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}.relative>a{display:none!important}.reader-img-con{padding:64px 0 50px !important;}",
        category: "comic"
    }, {
        name: "DM5/極速/Mangabz/Xmanhua/yymanhua/漫画人/奇漫屋/漫画星球(PC)/6 漫画/漫本 手機版 https://m.dm5.com/m755073/",
        enable: 0,
        reg: /(www|tel|en|cnc|hk|m)?\.?(dm5|1kkk|mangabz|xmanhua|yymanhua|manhuaren|qiman\d{1,2}|mhxqiu\d|6mh6\d|manben)\.(com|cn)\/(m|ch|vol|other)?[-_0-9]+\//,
        delay: 300,
        include: "//script[contains(text(),'newImgs')]",
        init: () => {
            if (fun.gae(".view-bottom-bar>li").length == 4) {
                fun.css(".view-bottom-bar>li:nth-child(n+2):nth-child(-n+3){display:none!important}.view-bottom-bar li{width:50%!important}")
            }
        },
        imgs: () => {
            return newImgs
        },
        insertImg: ["#cp_img,.main_img,#comicContain,.comic-list", 2],
        autoDownload: [0],
        next: "//a[text()='下一章'] | //a[img[@alt='下一章']]",
        prev: "//a[text()='上一章'] | //a[img[@alt='上一章']]",
        customTitle: () => {
            let host = location.hostname;
            if (/dm5|manhuaren|1kkk|mangabz|xmanhua|yymanhua/.test(host)) {
                return fun.title("_", 2)
            } else if (/qiman|mhxqiu|6mh/.test(host)) {
                return fun.title("_", 3)
            } else if (/manben/.test(host)) {
                if (fun.ge("#comicTitle")) {
                    return fun.geT("#chapter") + " " + fun.geT(".title-comicHeading")
                } else {
                    return fun.title(" ", 2)
                }
            }
        },
        category: "comic"
    }, {
        name: "漫画星球M m.mhxqiu2.com",
        enable: 0,
        reg: /m\.mhxqiu\d\.com\/\d+\/\d+\.html/,
        imgs: ".main_img img",
        autoDownload: [0],
        next: "//a[p[text()='下一篇']][contains(@href,'html')]",
        prev: "//a[p[text()='上一篇']][contains(@href,'html')]",
        customTitle: () => {
            let s = document.title.split("_");
            return (s[1] + " - " + s[0]).replace(" - 漫画星球", "")
        },
        category: "comic"
    }, {
        name: "动漫之家M m.idmzj.com",
        enable: 0,
        reg: /m\.i?dmzj\.com\/view\/\d+\/\d+\.html/,
        init: "$('body').unbind('keydown');",
        imgs: () => {
            let code = [...document.scripts].find(s => s.innerHTML.search(/initData/) > -1).innerHTML;
            let arr = fun.run(code.match(/page_url.+(\[.+\])/)[1]);
            return arr;
        },
        insertImg: ["#commicBox", 2],
        autoDownload: [0],
        next: ".afterChapter",
        prev: ".beforeChapter",
        customTitle: "return fun.title('-',1);",
        css: "#khdDown,.appTil{display:none!important}",
        category: "comic"
    }, {
        name: "动漫之家 manhua.dmzj.com",
        enable: 0,
        reg: /manhua\.i?dmzj\.com\/\w+\/\d+\.shtml/,
        init: "$('body').unbind('keydown');",
        imgs: () => {
            return arr_pages.map(e => img_prefix + decodeURI(e));
        },
        insertImg: ["#center_box", 2],
        autoDownload: [0],
        next: "#next_chapter",
        prev: "#prev_chapter",
        customTitle: "return fun.title('-',1);",
        category: "comic"
    }, {
        name: "动漫之家2 www.dmzj.com",
        enable: 0,
        reg: /www\.i?dmzj\.com\/view\/\w+\/\d+\.html/,
        init: "$('body').unbind('keydown');",
        imgs: () => {
            return picArry.map(e => 'https://images.idmzj.com/' + decodeURI(e).replace(/amp;/g, ''));
        },
        insertImg: [".comic_wraCon", 2],
        autoDownload: [0],
        next: ".next>a",
        prev: ".pre>a",
        customTitle: "return fun.geT('.head_title');",
        category: "comic"
    }, {
        name: "Manhuagui看漫画M https://m.manhuagui.com/comic/17023/176171.html",
        enable: 0,
        icon: 0,
        reg: /m\.manhuagui\.com\/comic\/\d+\/\d+.html/,
        imgs: () => {
            let code = [...document.scripts].find(s => s.innerHTML.search(/x6c/) > -1).innerHTML.trim().slice(26);
            let json = JSON.parse(fun.run(code).slice(11, -12));
            let domain = "https://i.hamreus.com";
            return json.images.map(e => `${domain+e}?e=${json.sl.e}&m=${json.sl.m}`);
        },
        insertImg: ["#manga", 2],
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.geT('#mangaTitle');",
        one: 1,
        css: ".action-list li{width:50% !important}#action>ul>li:nth-child(n+2):nth-child(-n+3),.manga-page,.clickforceads{display:none !important}",
        category: "comic"
    }, {
        name: "Manhuagui看漫画M 点击查看下20条记录",
        enable: 0,
        reg: /m\.manhuagui\.com\/(update|list|rank|user)\//,
        icon: 0,
        key: 0,
        observerClick: "#more:not([style*=none])>.more-go",
        category: "comic"
    }, {
        name: "Manhuagui看漫画 https://www.manhuagui.com/comic/11230/114301.html",
        enable: 0,
        reg: /www\.manhuagui\.com\/comic\/\d+\/\d+.html/,
        init: "$(document).unbind('keydown');",
        imgs: () => {
            let code = [...document.scripts].find(s => s.innerHTML.search(/x6c/) > -1).innerHTML.slice(26, -1);
            let json = fun.run(fun.run(code).slice(11, -11));
            let domain = "https://i.hamreus.com";
            return json.files.map(e => `${domain+json.path+e}?e=${json.sl.e}&m=${json.sl.m}`);
        },
        insertImg: ["#tbBox", 2],
        autoDownload: [0],
        one: 1,
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.geT('h1>a') + ' - ' + fun.geT('h2');",
        category: "comic"
    }, {
        name: "包子漫画 閱讀 https://www.kukuc.co/comic/chapter/yushenyitongshengji-ohyeonbain/0_2.html",
        enable: 0,
        icon: 0,
        reg: /\/comic\/chapter\/[^/]+\/\w+\.html/i,
        include: "//title[contains(text(),'包子')]",
        init: async () => {
            document["onkeydown"] = null;
            const hidetoolbar = () => {
                var e = e || window.event;
                if (e.wheelDelta < 0 || e.detail > 0) {
                    $("div.header").attr("style", "top: -44px;");
                    $("div.bottom-bar").attr("style", "bottom: -50px;")
                } else {
                    $("div.header").attr("style", "transform: translateY(0%);");
                    $("div.bottom-bar").attr("style", "transform: translateY(0%);")
                }
            };
            $("body").on("wheel", hidetoolbar);
            $("body").on("DOMMouseScroll", hidetoolbar);
            const keyhidetoolbar = (e) => {
                let key = window.event ? e.keyCode : e.which;
                if (key == "34" || key == "32" || key == "40") {
                    $("div.header").attr("style", "top: -44px;");
                    $("div.bottom-bar").attr("style", "bottom: -50px;")
                } else {
                    $("div.header").attr("style", "transform: translateY(0%);");
                    $("div.bottom-bar").attr("style", "transform: translateY(0%);")
                }
            };
            $("body").on("keydown", keyhidetoolbar);
            if (("ontouchstart" in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
                let startY, moveY, Y;
                $("body").on("touchstart", (e) => {
                    startY = e.originalEvent.changedTouches[0].pageY;
                });
                $("body").on("touchmove", (e) => {
                    moveY = e.originalEvent.changedTouches[0].pageY;
                    Y = moveY - startY;
                    if (Y < 0) {
                        $("div.header").attr("style", "top: -44px;");
                        $("div.bottom-bar").attr("style", "bottom: -50px;")
                    } else if (Y > 0) {
                        $("div.header").attr("style", "transform: translateY(0%);");
                        $("div.bottom-bar").attr("style", "transform: translateY(0%);")
                    }
                });
            }
            await fun.getNP(".comic-contain>div:not(.mobadsq)", "//a[contains(text(),'下一頁') or contains(text(),'下一页')]", null, ".comic-chapter>.next_chapter");
        },
        imgs: () => {
            let arr = [...fun.gae(".comic-contain amp-img")].map(e => e.getAttribute("src"));
            return [...new Set(arr)]
        },
        insertImg: [".comic-contain", 2],
        autoDownload: [0],
        next: "//div[@class='next_chapter']/a[contains(text(),'下一話') or contains(text(),'下一话')]",
        prev: 1,
        customTitle: "return fun.title(' - ',3);",
        css: ".chapter-main.scroll-mode~*:not(.next_chapter):not(.bottom-bar){display:none!important}",
        category: "comic"
    }, {
        name: "包子漫画 展開目錄",
        enable: 0,
        icon: 0,
        key: 0,
        reg: /\/comic\/[-\w]+$/i,
        include: "//title[contains(text(),'包子')]",
        autoClick: "#button_show_all_chatper",
        category: "comic"
    }, {
        name: "包子漫画，鏈接新分頁打開",
        enable: 0,
        icon: 0,
        key: 0,
        reg: /(cn|tw|www)\.(baozimh|webmota|kukuc)\.(co|com)/,
        openInNewTab: ".comics-card a:not([target=_blank]),.bookshelf-items a:not(.remove-img):not([target=_blank])",
        category: "comic"
    }, {
        name: "Komiic komiic.com", //有限制連線數,在目錄頁每話開一個新分頁進行下載，測試同時載5話沒問題。
        enable: 1,
        reg: /komiic\.com\/comic\/\d+\/chapter\//,
        imgs: () => {
            let chapterId = siteUrl.match(/chapter\/(\d+)\/images/)[1];
            let body = {
                operationName: "imagesByChapterId",
                variables: {
                    chapterId: `${chapterId}`
                },
                query: "query imagesByChapterId($chapterId: ID!) {\n  imagesByChapterId(chapterId: $chapterId) {\n    id\n    kid\n    height\n    width\n    __typename\n  }\n}\n"
            };
            return fetch("/api/query", {
                "headers": {
                    "content-type": "application/json"
                },
                "body": JSON.stringify(body),
                "method": "POST"
            }).then(res => res.json()).then(json => json.data.imagesByChapterId.map(e => "https://komiic.com/api/image/" + e.kid));
        },
        customTitle: async () => {
            await fun.delay(1500, 0);
            return fun.geT("li.breadcrumbs__item:nth-child(3)>a").trim() + " - " + fun.geT("li.breadcrumbs__item:nth-child(5)>div").trim()
        },
        one: 1,
        category: "comic"
    }, {
        name: "LINE WEBTOON / 咚漫 www.webtoons.com www.dongmanmanhua.cn https://www.webtoons.com/zh-hant/time-slip/estatedeveloper/%E7%AC%AC1%E8%A9%B1/viewer?title_no=4354&episode_no=1",
        enable: 0,
        reg: /www\.(webtoons|dongmanmanhua)\.(com|cn)\/[^&]+&episode/,
        imgs: "._images[data-url]",
        insertImg: ["#_imageList", 2],
        autoDownload: [0],
        next: "//div[@class='episode_cont']//li[a[starts-with(@class,'on')]]/following-sibling::li[1]/a",
        prev: "//div[@class='episode_cont']//li[a[starts-with(@class,'on')]]/preceding-sibling::li[1]/a",
        customTitle: () => {
            return fun.title("|", 3).replace(/ - \d+/, "").replace("|", " - ");
        },
        category: "comic"
    }, {
        name: "LINE WEBTOON 目錄聚集所有章節",
        enable: 0,
        icon: 0,
        key: 0,
        reg: /www\.webtoons\.com\/.+\/list\?title_no=\d+/,
        init: "fun.getNP('._episodeItem',\"//div[@class='paginate']/a[span[@class='on']]/following-sibling::a[1]\",null,'.paginate',0,null,0)",
        category: "comic"
    }, {
        name: "動漫狂M",
        enable: 0,
        reg: /www\.cartoonmad\.(cc|com)\/m\/comic\/\d+\.html/,
        init: async () => {
            let url = await siteData.next();
            if (url) {
                fun.addNextHtml(url, "//tr[td[a[@class='onpage']]]", 1);
            }
        },
        imgs: () => {
            let src = fun.ge("img[oncontextmenu]").src.match(/.+\//)[0];
            let max = fun.ge(".onpage").parentNode.lastElementChild.previousElementSibling.innerText;
            let arr = [];
            for (let i = 1; i <= max; i++) {
                let imgSrc = src + String(i).padStart(3, "0");
                arr.push(imgSrc)
            };
            return arr;
        },
        autoDownload: [0],
        next: async () => {
            let lastPage = fun.ge(".onpage").parentNode.lastElementChild.previousElementSibling;
            return await fun.xhr(lastPage.href, "document").then(async doc => {
                let ele = fun.ge("body>table>tbody>tr:nth-child(3)>td>a", doc);
                return await fun.xhr(ele.href, "document").then(doc => {
                    let next = fun.ge(".pages", doc);
                    if (next) {
                        return next.href
                    } else {
                        return null
                    }
                });
            });
        },
        prev: 1,
        insertImg: ["//td[a[img[@oncontextmenu]]]", 2],
        customTitle: "return fun.title(' - ',2);",
        category: "comic"
    }, {
        name: "動漫狂 https://www.cartoonmad.com/comic/438700012046001.html",
        enable: 0,
        reg: /www\.cartoonmad\.com\/comic\/\d+\.html/,
        init: "document.onkeydown=null;",
        imgs: () => {
            let src = fun.ge("img[onload]").src.match(/.+\//)[0];
            let max = fun.gae("option[value]").length;
            let arr = [];
            for (let i = 1; i <= max; i++) {
                let imgSrc = src + String(i).padStart(3, "0");
                arr.push(imgSrc)
            };
            return arr
        },
        insertImg: ["//td[a[img[@oncontextmenu]]]", 2],
        autoDownload: [0],
        next: "//td[@width='150' and a[img[@src='/image/rad.gif']]]/a",
        prev: "//td[@width='150' and a[img[@src='/image/rad1.gif']]]/a",
        customTitle: "return fun.title(' - ',2);",
        category: "comic"
    }, {
        name: "動漫戲說 https://comic.acgn.cc/view-202.htm",
        enable: 0,
        reg: /comic\.acgn\.cc\/view/,
        imgs: () => {
            return [...fun.gae(".pic[_src][id]")].map(e => e.getAttribute("_src"));
        },
        insertImg: ["#pic_list", 2],
        autoDownload: [0],
        next: ".display_right>a",
        prev: ".display_left>a",
        customTitle: "return fun.geT('.hotrmtexth1>a');",
        css: ".btn_wrap{display:none!important}",
        category: "comic"
    }, {
        name: "98漫畫網 www.98comic.com",
        enable: 0,
        reg: /www\.98comic\.com\/comic\/\d+\/\w+\.html$/,
        imgs: () => {
            return cInfo.fs.map(e => "https://www.98comic.com/g.php?" + cInfo.cid + "/" + e);
        },
        insertImg: ["//td[img[@id='manga']]", 2],
        autoDownload: [0],
        next: ".nextC",
        prev: ".prevC",
        customTitle: () => {
            return cInfo.btitle + " - " + cInfo.ctitle
        },
        css: ".bd_960_90{display:none!important}",
        category: "comic"
    }, {
        name: "57漫画网 www.wuqimh.net m.wuqimh.net 国漫吧 www.guoman8.cc",
        enable: 0,
        reg: /((www|m)\.wuqimh\.net)|www\.guoman8\.cc\/\d+\/\d+\.html$/,
        imgs: () => {
            return cInfo.fs;
        },
        insertImg: ["//td[img[@id='manga']]", 2],
        autoDownload: [0],
        next: ".nextC",
        prev: ".prevC",
        customTitle: () => {
            return cInfo.btitle + " - " + cInfo.ctitle
        },
        css: ".bd_960_90,body>section{display:none!important}",
        category: "comic"
    }, {
        name: "亲亲漫画/古风漫画网 www.acgud.com m.acgqd.com www.gufengmh.com m.gufengmh.com",
        enable: 0,
        reg: /(www|m|w111)\.(acg(u|q)d|gufengmh|mhd100)\.com\/manhua\/\w+\/\d+\.html/,
        init: () => {
            if (/acg|mhd100/.test(location.host)) {
                $("#images").unbind("click");
                _0x5097 = null;
                for (let i = 0; i <= 2; i++) {
                    clearInterval(i)
                }
            } else if (/gufengmh/.test(location.host)) {
                $(document).unbind("keydown");
                $(document).unbind("keyup")
            }
        },
        imgs: () => {
            return chapterImages.map(e => SinConf.resHost[0].domain + "/" + chapterPath + e);
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: "//a[contains(text(),'下一章')]",
        prev: "//a[contains(text(),'上一章')]",
        customTitle: () => {
            if (/(acg|mhd100)/.test(location.host)) {
                return fun.title("_", 1)
            } else if (/gufengmh/.test(location.host)) {
                return fun.title("在线观看", 1)
            } else return fun.title(" - ", 3)
        },
        css: ".img_land_prev,.img_land_next,#action li:nth-child(2),#action li:nth-child(3),.control_bottom~*,.chapter-view~*:not(.customPicDownloadMsg):not(#customPicDownload){display:none!important}#action li{width:50%!important}",
        category: "comic"
    }, {
        name: "漫画456 www.manhua456.com",
        enable: 0,
        reg: /www\.manhua456\.com\/manhua\/\w+\/\d+\.html/,
        init: "setTimeout(()=>{$(document).unbind('keyup');$(document).unbind('keydown')},4000)",
        imgs: () => {
            return chapterImages;
        },
        insertImg: ["#images", 2, 4000],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.title(' - ',3);",
        css: ".img_land_prev,.img_land_next{display:none!important}",
        category: "comic"
    }, {
        name: "漫画456M m.manhua456.com",
        enable: 0,
        reg: /m\.manhua456\.com\/manhua\/\w+\/\d+\.html/,
        delay: 300,
        init: "$('#images').unbind('click');",
        imgs: () => {
            return chapterImages.map(e => SinConf.resHost[0].domain + "/" + chapterPath + e);
        },
        insertImg: ["#images", 2],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: () => {
            let s = pageTitle.split(" - ");
            return s[1] + " - " + s[0]
        },
        css: ".img_land_prev,.img_land_next{display:none!important}",
        category: "comic"
    }, {
        name: "漫画1234 www.ymh1234.com",
        enable: 0,
        reg: /(www|m)\.ymh1234\.com\/comic\/\d+\/\d+\.html/i,
        init: "$(document).unbind('keydown');$(document).unbind('keyup');$('#images').unbind('click');",
        imgs: async () => {
            let url = await siteData.next();
            if (location.hostname == "www.ymh1234.com") {
                if (url) {
                    fun.addNextHtml(url, "#images", 1)
                }
            }
            return chapterImages.map(e => SinConf.resHost[0].domain + "/" + chapterPath + e);
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: () => {
            if (nextChapterData.id > 0) {
                return nextChapterData.url
            } else {
                return null
            }
        },
        prev: 1,
        customTitle: () => {
            let s = pageTitle.split(" - ");
            if (location.hostname == "m.ymh1234.com") {
                return s[1] + " - " + s[0]
            } else {
                return s[0]
            }
        },
        category: "comic"
    }, {
        name: "90漫画 www.90mh.com",
        enable: 0,
        reg: /www\.90mh\.com\/manhua\/\w+\/\d+\.html/i,
        imgs: () => {
            return chapterImages.map(e => SinConf.resHost[0].domain + "/" + chapterPath + e);
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: ".nextC",
        prev: ".prevC",
        customTitle: "return fun.title(' - ',3);",
        category: "comic"
    }, {
        name: "90漫画 wap.90mh.com",
        enable: 0,
        reg: /wap\.90mh\.com\/manhua\/\w+\/\d+\.html/i,
        init: () => {
            let url = siteData.next();
            if (url) {
                fun.addNextHtml(url, "#chapter-image", 1)
            }
        },
        imgs: () => {
            let max = fun.geT("#k_total");
            return fun.getImg("#chapter-image img", max, 5);
        },
        insertImg: ["#chapter-image", 2],
        autoDownload: [0],
        next: () => {
            let next = fun.ge("//a[text()='下一章'][contains(@href,'html')]");
            if (next) {
                return next.href
            } else {
                return null
            }
        },
        prev: 1,
        customTitle: "return fun.title('在线',1);",
        category: "comic"
    }, {
        name: "优酷漫画 www.ykmh.com",
        enable: 0,
        reg: /www\.ykmh\.com\/manhua\/\w+\/\d+\.html/i,
        init: "$(document).unbind('keydown');$(document).unbind('keyup');",
        imgs: () => {
            return chapterImages.map(e => SinConf.resHost[0].domain + e);
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: ".next>a",
        prev: ".pre>a",
        customTitle: "return fun.title(' - ',3);",
        css: ".img_land_prev,.img_land_next{display:none!important}",
        category: "comic"
    }, {
        name: "优酷漫画M h5.ykmh.com",
        enable: 0,
        reg: /h5\.ykmh\.com\/manhua\/\w+\/\d+\.html/i,
        init: "$('#images').unbind('click');",
        imgs: () => {
            return chapterImages.map(e => SinConf.resHost[0].domain + e);
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: "//a[text()='下一章'][contains(@href,'html')]",
        prev: "//a[text()='上一章'][contains(@href,'html')]",
        customTitle: () => {
            let s = pageTitle.split(" - ");
            return s[1] + " - " + s[0]
        },
        css: ".letchepter>div,.letchepter>section,#customPicDownload~*{display:none!important}",
        category: "comic"
    }, {
        name: "漫画芯M coco.mhxin.com",
        enable: 0,
        reg: /coco\.mhxin\.com\/manhua\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".image-content p").match(/\/(\d+)/)[1];
            return fun.getImg("#manga-image", max, 5)
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: () => {
            let code = [...document.scripts].find(s => s.innerHTML.search(/下一章/) > -1).innerHTML;
            let url = code.match(/<li><a href="(.+)">下一章/)[1];
            if (/html$/.test(url)) {
                return url
            } else {
                return null
            }
        },
        prev: 1,
        customTitle: "return fun.title('在线',1);",
        category: "comic"
    }, {
        name: "最漫画M / 拼拼漫画M m.zuimh.com m.pinmh.com",
        enable: 0,
        reg: /(m\.zuimh\.com|m.pinmh.com)\/manhua\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = fun.geT(".image-content p").match(/\/(\d+)/)[1];
            return fun.getImg("#image", max, 5)
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: "//a[text()='下一章'][contains(@href,'html')]",
        prev: "//a[text()='上一章'][contains(@href,'html')]",
        customTitle: "return fun.title('在线',1);",
        category: "comic"
    }, {
        name: "零点漫画M m.0dmh.com",
        enable: 0,
        reg: /(m\.0dmh\.com)\/manhua\/\w+\/\d+\.html/i,
        imgs: () => {
            let max = Math.ceil(fun.geT("#images p").match(/\/(\d+)/)[1] / 3);
            return fun.getImg("#images img", max, 5)
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: "//a[text()='下一章'][contains(@href,'html')]",
        prev: "//a[text()='上一章'][contains(@href,'html')]",
        customTitle: "return fun.title('-零点漫画').trim();",
        category: "comic"
    }, {
        name: "漫画吧M / 漫画连M m.dmhua8.com m.100mhl.com",
        enable: 0,
        reg: /(m\.dmhua8\.com|m\.100mhl\.com)\/manhua\/\w+\/\d+\.html/i,
        imgs: () => {
            let num = fun.geT("#images p").match(/\/(\d+)/)[1];
            let max = Math.ceil(num / 5);
            return fun.getImg("#images img", max, 5)
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: () => {
            try {
                let code = [...document.scripts].find(s => s.innerHTML.search(/下一章/) > -1).innerHTML;
                let url = code.match(/<li><a href="(.+)">下一章/)[1];
                if (/html$/.test(url)) {
                    return url
                } else {
                    return null
                }
            } catch (e) {
                let next = fun.ge("//a[text()='下一章'][contains(@href,'html')]");
                if (next) {
                    return next.href
                } else {
                    return null
                }
            }
        },
        prev: 1,
        customTitle: () => {
            if (location.hostname == "m.dmhua8.com") {
                let s = document.title.split("_");
                return (s[1] + " - " + s[0]).replace("漫画", "");
            } else if (location.hostname == "m.100mhl.com") {
                return document.title.replace("-漫画连", "")
            }
        },
        css: "#addMoney,#images~div[style*=blur]{display:none!important}",
        category: "comic"
    }, {
        name: "蔷薇漫画M/爱米推漫画M/下拉式漫画M/奇妙漫画M/冰氪漫画M/狗狗漫画M/奇奇漫画M/悠闲漫画M/不卡漫画M/多熙漫画M m.qwmanhua.com m.imitui.com m.xlsmh.com m.qmiaomh.com ikr.ejujiu.com m.gougoumh.com m.qimhua.com m.yxtun.com m.bukamh.com m.duoximh.com",
        enable: 0,
        reg: /(m\.qwmanhua\.com|m\.imitui\.com|m\.xlsmh\.com|m\.qmiaomh\.com|ikr\.ejujiu\.com|m\.gougoumh\.com|m\.qimhua\.com|m\.yxtun\.com|m\.bukamh\.com|m\.duoximh\.com)\/manhua\/\w+\/\d+\.html/i,
        imgs: () => {
            let imgs = [...fun.gae("#images img:not([src*=loading]),#scroll-image img")];
            fun.remove("#scroll-image");
            return imgs
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: () => {
            try {
                if (nextChapterData.id > 0) {
                    return nextChapterData.url
                } else {
                    return null
                }
            } catch (e) {
                let next = fun.ge("//a[text()='下一章 > '][contains(@href,'html')]");
                if (next) {
                    return next.href
                } else {
                    return null
                }
            }
        },
        prev: 1,
        customTitle: () => {
            let host = location.hostname;
            if (/xlsmh|qmiaomh|gougoumh|qimhua|yxtun|bukamh|duoximh/.test(host)) {
                return fun.geT("#panel-title span,.title3 span").replace(">", " - ")
            } else {
                return fun.title('在线', 1);
            }
        },
        category: "comic"
    }, {
        name: "前未漫画/漫画芯/蔷薇漫画/最漫画/爱米推漫画/下拉式漫画/漫画吧/漫画连/拼拼漫画/零点漫画/雪儿漫画/狗狗漫画/奇奇漫画/悠闲漫画/不卡漫画/多熙漫画 www.qianmh.com www.mhxin.com www.qwmanhua.com www.zuimh.com www.imitui.com www.xlsmh.com www.dmhua8.com www.100mhl.com www.pinmh.com www.0dmh.com www.xuermh.com www.gougoumh.com www.qimhua.com www.yxtun.com www.bukamh.com www.duoximh.com",
        enable: 0,
        reg: /www\.(mhxin|qianmh|qwmanhua|zuimh|imitui|xlsmh|dmhua8|100mhl|pinmh|0dmh|xuermh|gougoumh|qimhua|yxtun|bukamh|duoximh)\.com\/manhua\/\w+\/\d+\.html/i,
        init: "try{$(document).unbind('keydown');$(document).unbind('keyup')}catch(e){}",
        imgs: () => {
            return chapterImages;
        },
        insertImg: ["#images,#imagesOld", 2],
        autoDownload: [0],
        next: ".next>a,a.next,a.nextC",
        prev: ".pre>a,a.prev,a.prevC",
        autoClick: "#chapter-pagination:not(.active),#mode_pagination",
        customTitle: () => {
            let host = location.hostname;
            if (/mhxin|qwmanhua|pinmh/.test(host)) {
                return fun.geT(".head_title").replace("-", " -")
            } else if (/qianmh|xlsmh|100mhl|0dmh|xuermh|gougoumh|qimhua|bukamh|duoximh/.test(host)) {
                return fun.geT("h1").trim()
            } else if (/zuimh|imitui|dmhua|yxtun/.test(host)) {
                return fun.geT(".title h1") + " - " + fun.geT(".title h2")
            }
        },
        css: "#qTcms_picID{display:none!important}",
        category: "comic"
    }, {
        name: "雪儿漫画M m.xuermh.com",
        enable: 0,
        icon: 0,
        reg: /m\.xuermh\.com\/manhua\/\w+\/\d+\.html/i,
        init: async () => {
            let a = fun.ge(".erPag a");
            let img = fun.ge(".erPag a img:last-child");
            a.outerHTML = img.outerHTML;
            await fun.getNP(".erPag mip-link img:not([style*=position])", "//mip-link[text()='下一页'][contains(@href,'-')] | //a[text()='下一页'][contains(@href,'-')]", null, "#action", 0, null, 0);
        },
        imgs: () => {
            return [...fun.gae(".erPag mip-link img:not([style*=position])")]
        },
        insertImg: [".erPag", 0],
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.geT('h1').replace('>',' - ').trim()",
        css: "#action li:nth-child(2),#action li:nth-child(3),span.right{display:none!important}#action li{width:50%!important}",
        category: "comic"
    }, {
        name: "来漫画 www.laimanhua8.com",
        enable: 0,
        reg: /www\.laimanhua\d?\.(net|com)\/kanmanhua\/\w+\/\d+\.html/i,
        imgs: () => {
            let imgData = base64_decode(picTree).split("$qingtiandy$");
            let host = getpicdamin();
            return imgData.map(e => host + e);
        },
        insertImg: ["#pic-list", 2],
        autoDownload: [0],
        next: ".btn-next[href^=j]",
        prev: ".btn-prev",
        customTitle: "return fun.title(',',1).replace('漫画','');",
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "comic"
    }, {
        name: "来漫画M m.laimanhua8.com",
        enable: 0,
        reg: /m\.laimanhua8\.com\/kanmanhua\/\w+\/\d+\.html/i,
        imgs: () => {
            return mhInfo.images.map(e => realurl + mhInfo.path + e)
        },
        insertImg: ["#manga", 2],
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.geT('#mangaTitle')",
        css: "#jusha1{display:none!important}",
        category: "comic"
    }, {
        name: "奇妙漫画 www.qmiaomh.com",
        enable: 0,
        reg: /www\.qmiaomh\.com\/manhua\/\w+\/\d+\.html/i,
        imgs: () => {
            let arr = [];
            chapterImages.forEach(e => {
                let imgSrc;
                if (e.indexOf("http") != -1) {
                    imgSrc = e
                } else {
                    imgSrc = SinConf.resHost[0].domain + e
                }
                arr.push(imgSrc)
            });
            return arr;
        },
        insertImg: ["#images", 2],
        autoDownload: [0],
        next: "a.next",
        prev: "a.prev",
        customTitle: "return fun.title(' - ',1);",
        category: "comic"
    }, {
        name: "漫客栈 www.mkzhan.com",
        enable: 0,
        reg: /www\.mkzhan\.com\/\d+\/\d+\.html/i,
        imgs: () => {
            let lps = location.pathname.split("/");
            let comic_id = lps[1];
            let chapter_id = lps[2].match(/\d+/)[0];
            let apiUrl = `https://comic.mkzcdn.com/chapter/content/v1/?chapter_id=${chapter_id}&comic_id=${comic_id}&format=1&quality=1&type=1`;
            return fetch(apiUrl).then(res => res.json()).then(json => json.data.page.map(e => e.image));
        },
        insertImg: ["#pages-tpl", 1],
        autoDownload: [0],
        next: ".rd-aside a.j-rd-next",
        prev: ".rd-aside a.j-rd-prev",
        autoClick: "//div[@class='rd-aside__item j-rd-mod'][span[text()='卷轴']]",
        customTitle: "return fun.title(' - ',1)",
        category: "comic"
    }, {
        name: "漫画屋 www.mhua5.com www.manhw.com www.360mh.cc www.mhzj54.com www.bingmh.com",
        enable: 0,
        reg: /www\.(mhua5|manhw|360mh)\.(com|cc)\/(chapter.+\.html|index\.php\/chapter\/\d+)|www\.mhzj54\.com\/chapter\/\d+$|www\.bingmh\.com\/chapter\/\d+\.html$/i,
        include: ".rd-article-wr",
        init: () => {
            fun.gae("img[data-original]").forEach(e => {
                new Image().src = e.dataset.original
            })
        },
        imgs: "img[data-original]:not([data-original*='/template/pc/default/'])",
        insertImg: [".rd-article-wr", 0],
        autoDownload: [0],
        next: ".rd-aside a.j-rd-next",
        prev: ".rd-aside a.j-rd-prev",
        autoClick: "//div[@class='rd-aside__item j-rd-mod'][span[text()='卷轴']]",
        customTitle: () => {
            if (/www\.mhua5\.com/.test(location.host)) {
                return fun.title(" - 漫画屋").replace("-", " - ")
            } else if (/www\.manhw\.com/.test(location.host)) {
                return fun.attr("meta[name=description]", "content").split(" - 漫画屋")[0].replace("当前阅读的是", "").replace("的", " - ");
            } else if (/www\.360mh\.cc/.test(location.host)) {
                return fun.geT(".j-comic-title") + " - " + fun.geT(".last-crumb")
            } else {
                return fun.title(/下拉|在线/, 1).replace("-", " - ")
            }
        },
        category: "comic"
    }, {
        name: "漫画屋M www.mhua5.com www.manhw.com www.360mh.cc www.mhzj54.com www.bingmh.com",
        enable: 0,
        reg: /www\.(mhua5|manhw)\.com\/(chapter.+\.html|index\.php\/chapter\/\d+)|www\.360mh\.cc\/chapter-\d+.html|www\.mhzj54\.com\/chapter\/\d+$|www\.bingmh\.com\/chapter\/\d+\.html$/i,
        imgs: ".comic-page img,#cp_img img[data-original]",
        insertImg: [".comic-list,#cp_img", 0],
        autoDownload: [0],
        next: () => {
            if (/www\.mhua5\.com|www\.360mh\.cc|www\.bingmh\.com/.test(location.host)) {
                let next = fun.attr(".next-chapter", "_href");
                if (next !== "") {
                    return location.origin + next;
                } else {
                    return null
                }
            } else if (/www\.mhzj54\.com/.test(location.host)) {
                let next = fun.attr(".next-chapter", "_href");
                if (next !== "") {
                    return next;
                } else {
                    return null
                }
            } else {
                let next = fun.ge("//a[text()='下一章']");
                if (next) {
                    return next.href;
                } else {
                    return null
                }
            }
        },
        prev: 1,
        customTitle: () => {
            if (/www\.mhua5\.com|www\.manhw\.com/.test(location.host)) {
                return fun.title(" - 漫画屋").replace("-", " - ")
            } else if (/www\.360mh\.cc/.test(location.host)) {
                return shareArr[0].match(/《([^》]+)/)[1] + " - " + fun.geT(".comic-name")
            } else if (/www\.bingmh\.com/.test(location.host)) {
                return fun.geT("title+title").split("在线")[0].replace("-", " - ").trim()
            } else {
                return fun.title("下拉", 1).trim().replace("-", " - ")
            }
        },
        css: "body>ins,#mainView>.read,.chapter-end .read{display:none!important}",
        category: "comic"
    }, {
        name: "爱国漫 www.aiguoman.com",
        enable: 0,
        reg: /www\.aiguoman\.com\/chapter\/.+\.html/i,
        imgs: ".main-item>img",
        autoDownload: [0],
        next: ".J_next_eposide_btn",
        prev: ".J_prev_eposide_btn",
        customTitle: "return fun.geT('.cartoon-title>a:first-child')+' - '+fun.geT('.cartoon-title>a:last-child')",
        category: "comic"
    }, {
        name: "爱国漫M m.aiguoman.com",
        enable: 0,
        reg: /m\.aiguoman\.com\/chapter\/.+\.html/i,
        imgs: ".lazy-image[data-original]",
        autoDownload: [0],
        next: "//a[text()='下一章'][contains(@href,'html')]",
        prev: "//a[text()='上一章'][contains(@href,'html')]",
        customTitle: () => {
            return document.title.split("免费")[0].replace("漫画", "");
        },
        category: "comic"
    }, {
        name: "新新漫画 www.77mh.xyz",
        enable: 0,
        reg: /(www|m)\.77mh\.[a-z]{2,3}\/\d+\/\d+\.html/i,
        init: "try{$(document).unbind('keydown');$(document).unbind('keyup')}catch(e){}",
        imgs: () => {
            let imgData = msg.split("|");
            let arr = [];
            imgData.forEach(e => {
                let imgSrc;
                if (location.hostname.indexOf("m.77mh") != -1) {
                    imgSrc = ImgSvrList + e
                } else {
                    imgSrc = img_qianz + e
                }
                arr.push(imgSrc)
            });
            return arr
        },
        insertImg: ["#comicImg,.mg-co", 2],
        autoDownload: [0],
        next: "//a[contains(text(),'下一章')]",
        prev: "//a[contains(text(),'上一章')]",
        customTitle: "return fun.title(' - ',3)",
        category: "comic"
    }, {
        name: "漫漫聚/KuKu动漫 www.manmanju.com manhua.kukudm.com",
        enable: 1,
        reg: /(a|b|www|manhua)\.(manmanju|i?kukudm)\.com\/comiclist\/\d+\/\d+\/1\.htm/i,
        include: "td img",
        init: async () => {
            let url = await siteData.next();
            if (url) {
                fun.addNextHtml(url, "body", 2)
            } else {
                if (/manmanju/.test(location.origin)) {
                    fun.addNextHtml("http://www.manmanju.com/", "body", 2, "首頁")
                } else {
                    fun.addNextHtml("https://manhua.kukudm.com/", "body", 2, "首頁")
                }
            }
        },
        imgs: () => {
            fun.show("獲取資料中...", 0);
            let max = fun.geT("//td[input]").match(/共(\d+)/)[1];
            let links = [];
            let url = location.href.replace(/1\.htm$/, "");
            for (let i = 1; i <= max; i++) {
                links.push(url + i + ".htm");
            }
            let resArr = [];
            let path = fun.ge("td img").src.match(/.+\//)[0];
            let xhrNum = 0;
            for (let i in links) {
                let res = fun.xhr(links[i], "document").then(doc => {
                    fun.show(`獲取資料中${xhrNum+=1}/${links.length}`, 0);
                    let script = fun.ge("//script[contains(text(),'document.write')]", doc);
                    let fileName = script.innerText.match(/[\w\.-]+\.jpe?g|[\w\.-]+\.png/i)[0];
                    return decodeURI(path + fileName);
                });
                resArr.push(res);
            }
            return Promise.all(resArr);
        },
        autoDownload: [0],
        next: () => {
            let comicId = location.href.split("/")[4];
            let comicListUrl;
            if (/(www|a|b)\.manmanju\.com/.test(location.origin)) {
                comicListUrl = `http://www.manmanju.com/comiclist/${comicId}/index.htm`;
            } else {
                comicListUrl = `http://manhua.kukudm.com/comiclist/${comicId}/index.htm`;
            }
            let chapterId = location.href.split("/")[5];
            let host;
            if (/www\.manmanju\.com|manhua\.kukudm\.com/.test(location.origin)) {
                host = 1
            } else if (/a\.manmanju\.com|a\.ikukudm\.com/.test(location.origin)) {
                host = 2
            } else if (/b\.manmanju\.com|b\.ikukudm\.com/.test(location.origin)) {
                host = 3
            }
            let nextXPath = `//dd[a[contains(@href,'${chapterId}')]]/following-sibling::dd[1]/a[${host}]`;
            return fun.xhr(comicListUrl, "document").then(doc => {
                let next = fun.ge(nextXPath, doc);
                if (next) {
                    return next.href;
                } else {
                    return null;
                }
            })
        },
        prev: 1,
        insertImg: ["//td[input]", 2],
        css: "body>table:nth-child(1),body>table:nth-child(3){display:none!important}body>table:nth-child(2),body>table:nth-child(2)>tbody>tr>td{width:100%!important;}",
        category: "comic"
    }, {
        name: "漫漫聚M/KuKu动漫M m.manmanju.com s1.m.ikkdm.com s2.m.ikkdm.com 1pc570gfrd9z.ihhmh.com s2.wap.ikukudm.com s3.wap.ikukudm.com",
        enable: 1,
        reg: /(m\.manmanju\.com|\w+\.ihhmh\.com|s\d\.m\.ikkdm\.com|s\d.wap.ikukudm.com)\/comiclist\/\d+\/\d+\/1\.htm/i,
        include: ".classBox img,.imgBox",
        init: async () => {
            let url = await siteData.next();
            if (url) {
                fun.addNextHtml(url, ".bottom .subNav", 1)
            }
            let nav = fun.ge("ul.subNav").cloneNode(true);
            let tE = fun.ge("div.bottom");
            tE.parentNode.insertBefore(nav, tE);
        },
        imgs: () => {
            fun.show("獲取資料中...", 0);
            let max = fun.geT(".bottom .subNav").match(/\/(\d+)/)[1];
            let links = [];
            let url = location.href.replace(/1\.htm$/, "");
            for (let i = 1; i <= max; i++) {
                links.push(url + i + ".htm");
            }
            let resArr = [];
            let path = fun.ge(".classBox img").src.match(/.+\//)[0];
            let xhrNum = 0;
            for (let i in links) {
                let res = fun.xhr(links[i], "document").then(doc => {
                    fun.show(`獲取資料中${xhrNum+=1}/${links.length}`, 0);
                    let script = fun.ge("//script[contains(text(),'document.write')]", doc);
                    let fileName = script.innerText.match(/[\w\.-]+\.jpe?g|[\w\.-]+\.png/i)[0];
                    return decodeURI(path + fileName);
                });
                resArr.push(res);
            }
            fun.remove("//a[img] | //ul[center[li]]");
            fun.remove(".bottom .subNav~div[style*=height],.bottom .pageLine,.bottom .subNav");
            return Promise.all(resArr);
        },
        next: () => {
            let comicListUrl = fun.ge(".subNav a").href;
            let chapterId = location.href.split("/")[5];
            let nextXPath = `//li[a[contains(@href,'${chapterId}')]]/preceding-sibling::li[1]/a`;
            return fun.xhr(comicListUrl, "document").then(doc => {
                let next = fun.ge(nextXPath, doc);
                if (next) {
                    return next.href;
                } else {
                    return null;
                }
            })
        },
        prev: 1,
        insertImg: [".imgBox", 2],
        customTitle: () => {
            return fun.title("在线", 1)
        },
        css: ".imgBox{margin-bottom:0px!important}.subNav{border-top:1px solid #dcdcde}",
        category: "comic"
    }, {
        name: "仙漫网 www.xianmanwang.com",
        enable: 0,
        reg: /www\.xianmanwang\.com\/\w+\/\d+\.html/i,
        imgs: () => {
            return picdata.map(e => imgDomain + e);
        },
        insertImg: [".comicpage", 2],
        autoDownload: [0],
        next: "//li[a[@class='active']]/preceding-sibling::li[1]/a",
        prev: "//li[a[@class='active']]/following-sibling::li[1]/a",
        customTitle: () => {
            return fun.geT("h1.title").replace(/\(\d+\/\d+\)/, "").trim()
        },
        category: "comic"
    }, {
        name: "仙漫网M m.xianmanwang.com",
        enable: 0,
        reg: /m\.xianmanwang\.com\/\w+\/\d+\.html/i,
        imgs: () => {
            let code = [...document.scripts].find(s => s.innerHTML.search(/eval/) > -1).innerHTML.match(/eval.+\)\)/)[0].slice(4);
            let imgData = fun.run(fun.run(code).match(/picdata[^;]+/)[0]);
            return imgData.map(e => "https://res.xiaoqinre.com/" + e)
        },
        insertImg: ["#cp_img", 2],
        autoDownload: [0],
        next: ".btn.next",
        prev: ".btn.prev",
        customTitle: () => {
            return fun.title("免费", 1)
        },
        category: "comic"
    }, {
        name: "漫画牛 www.manhua666.com",
        enable: 0,
        reg: /www\.manhua666\.com\/\w+\/\d+\.html/i,
        imgs: () => {
            let img = "";
            imgs.forEach(e => {
                img += e
            });
            let doc = fun.doc(img);
            return [...doc.images];
        },
        insertImg: ["#content", 2],
        autoDownload: [0],
        next: "a[rel=next][href$=html]",
        prev: "a[rel=prev][href$=html]",
        customTitle: "return fun.title('-',3)",
        category: "comic"
    }, {
        name: "大树漫画 www.dashumanhua.com",
        enable: 0,
        reg: /www\.dashumanhua\.com\/comic\/\w+\/.+\.html/i,
        imgs: () => {
            let code = [...document.scripts].find(s => s.innerHTML.search(/picTree/) > -1).innerHTML;
            let m = code.replace(/eval.+\)\)/, "").match(/eval.+\)\)/)[0].slice(4);
            return fun.run(fun.run(m).slice(12, -1));
        },
        insertImg: ["#pic-list", 2],
        autoDownload: [0],
        next: "//a[text()='下一话' and not(contains(@href,'--1'))]",
        prev: "//a[text()='上一话' and not(contains(@href,'--1'))]",
        customTitle: "return fun.title('\（',1)",
        category: "comic"
    }, {
        name: "GODA漫画 godamanga.com",
        enable: 0,
        reg: /godamanga\.com\/manga\/[\w-]+\/\w+\//i,
        delay: 300,
        imgs: "//img[@decoding and @layout] | //img[@decoding and contains(@class,'img_content_jpg')]",
        insertImg: ["//div[div[div[div[div[img[@decoding and @layout]]]]]] | //div[div[div[div[div[img[@decoding and contains(@class,'img_content_jpg')]]]]]]", 2],
        autoDownload: [0],
        next: "//a[span[text()='下一话']]",
        prev: "//a[span[text()='上一话']]",
        customTitle: "return fun.geT('h1')",
        category: "comic"
    }, {
        name: "包子漫畫 baozimh.org",
        enable: 0,
        reg: /baozimh\.org\/manga\/.+\/\w+\//i,
        imgs: "//img[@decoding and @alt]",
        insertImg: ["//div[div[img[@decoding and @alt]]]", 2],
        autoDownload: [0],
        next: "//a[span[text()='下一话']]",
        prev: "//a[span[text()='上一话']]",
        customTitle: "return fun.geT('h1')",
        category: "comic"
    }, {
        name: "漫畫屋 mh5.tw",
        enable: 0,
        reg: /mh5\.tw\/(series|seriesvip)-\w+-\d+-\d+/i,
        imgs: () => {
            let max;
            if (/seriesvip/.test(location.href)) {
                max = fun.geT("a.cur~a:last-child") - 2
            } else {
                max = fun.geT("a.cur~a:last-child") - 1
            }
            return fun.getImgIframe(".ptview>img[alt]:not([style])", max, 13, [null, null], ".setnmh-pagedos", 0, 0);
        },
        insertImg: [".ptview", 1, 0],
        autoDownload: [0],
        next: "//a[text()='下一話']",
        prev: "//a[text()='上一話']",
        customTitle: () => {
            try {
                return fun.geT("h1") + " - " + fun.geT("h2")
            } catch (e) {
                return fun.geT(".setnmh-bookname>a:nth-child(5)") + " - " + fun.geT(".setnmh-bookname>a:nth-child(7)")
            }
        },
        css: ".ptview>img{width:100%!important;height:auto!important;max-width:1000px!important;border:none!important;box-shadow:none!important;padding:0!important;margin:0 auto!important}",
        category: "comic"
    }, {
        name: "七夕漫画 www.qiximh2.com",
        enable: 0,
        reg: /www\.qiximh\d+\.com\/\d+\/\d+\.html/i,
        imgs: ".main_img img",
        insertImg: [".main_img", 2],
        autoDownload: [0],
        next: "//a[img[@alt='下一章'] and contains(@href,'html')]",
        prev: "//a[img[@alt='上一章'] and contains(@href,'html')]",
        customTitle: "return fun.title('_',3)",
        category: "comic"
    }, {
        name: "七夕漫画M m.qiximh2.com",
        enable: 0,
        reg: /m\.qiximh\d+\.com\/\d+\/\d+\.html/i,
        imgs: ".main_img img",
        insertImg: [".main_img", 2],
        autoDownload: [0],
        next: "//a[p[text()='下一篇'] and contains(@href,'html')]",
        prev: "//a[p[text()='上一篇'] and contains(@href,'html')]",
        customTitle: () => {
            let s = document.title.replace(" - 七夕漫画", "").split("_");
            return s[1] + " - " + s[0]
        },
        css: ".ad_js{display:none!important}",
        category: "comic"
    }, {
        name: "爱漫之家 www.17fuman.com www2.17fuman.com www.fumanhua-1.com www.fumanhua-2.com www.fumanhua-3.com www2.fumanhua-1.com m.fumanhua-1.com m.fumanhua44.com m.fumanhua66.com m.fumanhua77.com  m1.fumanhua-1.com m1.fumanhua44.com m1.fumanhua66.com m1.fumanhua77.com",
        enable: 0,
        reg: /(www|m)\d?\.(17fuman|fumanhua-?\d+)\.com\/\w+\/\d+\/\d+\.html/i,
        init: "document.onkeydown=null",
        imgs: () => {
            return base64_decode(qTcms_S_m_murl_e).split("$qingtiandy$").map(e => qTcms_m_weburl + e);
        },
        insertImg: ["//td[img[@id='qTcms_pic']]", 2],
        autoDownload: [0],
        next: "#k_Pic_nextArr",
        prev: "#k_Pic_backArr",
        customTitle: "return fun.title(' - ',3).replace('漫画','')",
        css: ".bd_980_90{display:none!important}",
        category: "comic"
    }, {
        name: "73漫画 www.73mh.net",
        enable: 0,
        reg: /www\.73mh\.net\/mh\/\w+\//i,
        imgs: ".v_con_box img",
        insertImg: [".v_con_box", 2],
        autoDownload: [0],
        next: "//a[text()='下一话']",
        prev: "//a[text()='上一话']",
        customTitle: "return fun.geT('.p_select>h2')+' - '+fun.geT('.v-page>span')",
        category: "comic"
    }, {
        name: "733 动漫/漫画160 www.733.so www.mh160.cc",
        enable: 0,
        reg: /(www\.733\.so|www\.mh160\.cc)\/(mh|kanmanhua)\/\w+\/\d+\.html/i,
        init: "document.onkeydown=null",
        imgs: () => {
            return base64_decode(qTcms_S_m_murl_e).split("$qingtiandy$").map(e => f_qTcms_Pic_curUrl_realpic(e));
        },
        insertImg: ["//td[//img[@onclick]]", 2],
        autoDownload: [0],
        next: "#k_Pic_nextArr",
        prev: "#k_Pic_backArr",
        customTitle: () => {
            return qTcms_S_m_name + " - " + qTcms_S_m_playm
        },
        category: "comic"
    }, {
        name: "733 动漫M m.733.so",
        enable: 0,
        reg: /m\.733\.so\/mh\/\d+\/\d+\/\d+\.html/i,
        imgs: () => {
            let doc = fun.doc(temp_pic_all);
            return [...doc.images];
        },
        insertImg: [".select_con", 2],
        autoDownload: [0],
        next: "//a[text()='下一话' and contains(@href,'html')]",
        prev: "//a[text()='上一话' and contains(@href,'html')]",
        customTitle: () => {
            let s = document.title.split("-");
            return s[1] + " - " + s[0]
        },
        category: "comic"
    }, {
        name: "漫画160M m.mh160.cc",
        enable: 0,
        reg: /m\.mh160\.cc\/kanmanhua\/\w+\/\d+\.html/i,
        imgs: () => {
            let imgData = base64_decode(qTcms_S_m_murl_e).split("$qingtiandy$");
            return imgData.map(e => f_qTcms_Pic_curUrl_realpic(e));
        },
        insertImg: [".UnderPage", 2],
        autoDownload: [0],
        next: "#k_Pic_nextArr",
        prev: "#k_Pic_backArr",
        customTitle: () => {
            return qTcms_S_m_name + " - " + qTcms_S_m_playm
        },
        category: "comic"
    }, {
        name: "漫画库 www.mhko.net",
        enable: 0,
        reg: /www\.mhko\.net\/comic\/\d+\/\d+\.html/i,
        init: () => {
            document.onkeydown = null;
            let url = siteData.next();
            if (url) {
                fun.addNextHtml(url, ".tbCenter", 1)
            }
        },
        imgs: () => {
            return base64_decode(qTcms_S_m_murl_e).split("$qingtiandy$");
        },
        insertImg: ["//td[img[@id='qTcms_pic']]", 2],
        autoDownload: [0],
        next: () => {
            if (qTcms_Pic_nextArr !== "") {
                return location.origin + qTcms_Pic_nextArr
            } else {
                return null
            }
        },
        prev: 1,
        customTitle: () => {
            return qTcms_S_m_name + " - " + qTcms_S_m_playm
        },
        css: ".iFloat,#mypic_k0{display:none!important}",
        category: "comic"
    }, {
        name: "笨狗漫画 www.bengou.co m.bengou.co",
        enable: 0,
        reg: /(www|m)\.bengou\.co\/\w+\/\w+\/\d+\.html/i,
        init: () => {
            document.onkeydown = null;
        },
        imgs: () => {
            return base64_decode(qTcms_S_m_murl_e).split("$qingtiandy$").map(e => f_qTcms_Pic_curUrl_realpic(e));
        },
        insertImg: ["//td[img[@id='qTcms_pic']]", 2],
        autoDownload: [0],
        next: () => {
            if (qTcms_Pic_nextArr !== "") {
                return location.origin + qTcms_Pic_nextArr
            } else {
                return null
            }
        },
        prev: 1,
        customTitle: () => {
            return qTcms_S_m_name + " - " + qTcms_S_m_playm
        },
        css: "#mypic_k0{display:none!important}",
        category: "comic"
    }, {
        name: "星辰漫画网 www.xcmh.com m.xcmh.com",
        enable: 1,
        reg: /(www|m)\.xcmh\.com\/\w+\/\w+\/\d+\.html/i,
        init: () => {
            document.onkeydown = null;
        },
        imgs: () => {
            return base64_decode(qTcms_S_m_murl_e).split("$qingtiandy$").map(e => location.origin + f_qTcms_Pic_curUrl_realpic(e));
        },
        insertImg: ["//td[img[@id='qTcms_pic']]", 2],
        autoDownload: [0],
        next: () => {
            if (qTcms_Pic_nextArr !== "") {
                return location.origin + qTcms_Pic_nextArr
            } else {
                return null
            }
        },
        prev: 1,
        customTitle: () => {
            return qTcms_S_m_name + " - " + qTcms_S_m_playm
        },
        css: "#mypic_k0{display:none!important}",
        category: "comic"
    }, {
        name: "酷酷屋 www.kukuwumh.com m.kukuwumh.com",
        enable: 0,
        reg: /(www|m)\.kukuwumh\.com\/manhua\/\w+\/\d+\.html/,
        init: "document.onkeydown=null",
        imgs: () => {
            return base64_decode(qTcms_S_m_murl_e).split("$qingtiandy$");
        },
        insertImg: ["//td[//img[@onclick]]", 2],
        autoDownload: [0],
        next: "#k_Pic_nextArr",
        prev: "#k_Pic_backArr",
        customTitle: () => {
            try {
                return fun.geT("#skin~h1") + " - " + fun.geT("#skin~h2")
            } catch (e) {
                let s = document.title.split(" - ");
                return (s[1] + " - " + s[0]).replace("漫画", "");
            }
        },
        category: "comic"
    }, {
        name: "木马漫画 www.omyschool.com",
        enable: 0,
        reg: /www\.omyschool\.com\/article_detail\/\d+\/\d+\/.+\/.+\//i,
        imgs: "#imgs amp-img",
        insertImg: ["#imgs", 2],
        autoDownload: [0],
        next: ".nav_button.next",
        prev: ".nav_button.prev",
        customTitle: "return fun.geT('//a/span[@property and not(i)]')+' - '+fun.geT('//li/span[@property and not(i)]')",
        category: "comic"
    }, {
        name: "砂之船动漫家 www.szcdmj.com",
        enable: 0,
        reg: /www\.szcdmj\.com\/szcchapter\/\d+/i,
        include: ".comiclist",
        imgs: async () => {
            await fun.getNP(".comicpage>div", "//a[@href and text()='下一页']", null, ".fanye");
            return [...fun.gae("img.lazy")]
        },
        insertImg: [".comiclist", 2],
        autoDownload: [0],
        next: "//a[text()='下一话']",
        prev: "//a[text()='上一话']",
        customTitle: "return fun.geT('h1.title');",
        category: "comic"
    }, {
        name: "砂之船动漫家M www.szcdmj.com",
        enable: 0,
        reg: /www\.szcdmj\.com\/szcchapter\/\d+/i,
        include: "#cp_img",
        imgs: async () => {
            await fun.getNP("#cp_img>img[data-original]", "//a[@href and text()='下一页']", null, ".view-bottom-bar");
            return [...fun.gae("#cp_img>img[data-original]")]
        },
        insertImg: ["#cp_img", 2],
        autoDownload: [0],
        next: "//a[text()='下一话']",
        prev: "//a[text()='上一话']",
        customTitle: () => {
            return bookInfo.book_name + " - " + bookInfo.chapter_name;
        },
        category: "comic"
    }, {
        name: "雪人漫画 www.xuerenmanhua.com",
        enable: 0,
        reg: /www\.xuerenmanhua\.com\/chapter\/\d+/i,
        include: ".comiclist",
        imgs: ".comiclist img",
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: "return fun.geT('h1.title');",
        category: "comic"
    }, {
        name: "雪人漫画M www.xuerenmanhua.com",
        enable: 0,
        reg: /www\.xuerenmanhua\.com\/chapter\/\d+/i,
        imgs: "#cp_img>img[data-original]",
        autoDownload: [0],
        next: "//a[text()='下一章']",
        prev: "//a[text()='上一章']",
        customTitle: () => {
            return bookInfo.book_name + " - " + bookInfo.chapter_name;
        },
        category: "comic"
    }, {
        name: "好漫6 www.haoman6.com",
        enable: 0,
        reg: /www\.haoman6\.com\/chapter\/\d+/,
        imgs: "img[data-ecp]",
        insertImg: [".rd-article-wr", 2],
        autoDownload: [0],
        next: ".j-rd-next",
        prev: ".j-rd-prev",
        customTitle: "return fun.geT('.j-comic-title').replace('(最新在线)','')+' - '+fun.geT('.last-crumb');",
        category: "comic"
    }, {
        name: "好漫8 haoman8.com",
        enable: 0,
        reg: /haoman8\.com\/comic\/\d+\/\d+/,
        imgs: "img[data-echo]",
        insertImg: ["#reader-scroll", 2],
        autoDownload: [0],
        next: "#js_pageNextBtn",
        prev: "#js_pagePrevBtn",
        customTitle: "return fun.geT('#crumbComicLink')+' - '+fun.geT('#js_headChapterName');",
        category: "comic"
    }, {
        name: "拷貝漫畫 www.copymanga.site copymanga.site",
        enable: 1,
        reg: /(www\.)?copymanga\.site\/comic\/\w+\/chapter\/.+/,
        delay: 300,
        init: async () => {
            document[_0x1f93("0x1b")][_0x1f93("0x27")] = null;
            $(document).unbind("click");
            $(document).unbind("keydown");
            $(document).unbind("keyup");
            const hidetoolbar = () => {
                var e = e || window.event;
                if (e.wheelDelta < 0 || e.detail > 0) {
                    $("h4.header").attr("style", "top: -30px;");
                    $("div.footer").attr("style", "bottom: -41px;")
                } else {
                    $("h4.header").removeAttr("style");
                    $("div.footer").removeAttr("style")
                }
            };
            document.addEventListener("wheel", hidetoolbar);
            document.addEventListener("DOMMouseScroll", hidetoolbar);
            const keyhidetoolbar = (e) => {
                let key = window.event ? e.keyCode : e.which;
                if (key == "34" || key == "32" || key == "40") {
                    $("h4.header").attr("style", "top: -30px;");
                    $("div.footer").attr("style", "bottom: -41px;")
                } else {
                    $("h4.header").removeAttr("style");
                    $("div.footer").removeAttr("style")
                }
            };
            document.addEventListener("keydown", keyhidetoolbar);
            let api = location.href.replace(/.*?(?=\/comic\/)/, "https://api.copymanga.site/api/v3");
            let json = await fetch(api).then(res => res.json());
            siteJson = json;
            debug("\n此頁JSON資料\n", json);
        },
        imgs: () => {
            return siteJson.results.chapter.contents.map(e => e.url);
        },
        insertImg: [".comicContent-list", 2],
        autoDownload: [0],
        next: "//a[text()='下一話'][starts-with(@href,'/comic/')]",
        prev: "//a[text()='上一話'][starts-with(@href,'/comic/')]",
        customTitle: () => {
            return siteJson.results.comic.name + " - " + siteJson.results.chapter.name;
        },
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}.header+div[style],.comicContainerAds{display:none!important}",
        category: "comic"
    }, {
        name: "拷貝漫畫M www.copymanga.site copymanga.site",
        enable: 1,
        icon: 0,
        reg: /(www\.)?copymanga\.site\/h5\/comicContent\/\w+\/.+/,
        xhr: () => {
            let s = location.href.split("/").slice(-2);
            return new Promise(resolve => {
                _GM_xmlhttpRequest({
                    method: "GET",
                    url: `https://api.copymanga.site/api/v3/comic/${s[0]}/chapter/${s[1]}`,
                    responseType: "json",
                    headers: {
                        "Referer": `https://${location.hostname}/comic/${s[0]}/chapter/${s[1]}`,
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.50"
                    },
                    onload: data => {
                        resolve(data.response);
                    }
                });
            });
        },
        init: async () => {
            siteJson = await siteData.xhr();
            debug("\n此頁JSON資料\n", siteJson);
            const addHtml = (url, text) => {
                let str = `<div style="padding: 10px 0; text-align: center;"><a href="${url}"style="width: 100%;font-size: 26px;line-height: 50px;height: 50px;text-align: center;">${text}</a></div>`;
                fun.ge(".comicContentPopupImageList").insertAdjacentHTML("afterend", str);
            };
            let s = location.href.split("/").slice(-2);
            let url = `https://${location.hostname}/h5/details/comic/${s[0]}`;
            addHtml(`https://${location.hostname}/h5/index`, "首頁");
            addHtml(url, "目錄");
            let nUrl = siteData.next();
            if (nUrl) {
                addHtml(nUrl, "點選進入下一話");
            }
        },
        imgs: () => {
            return siteJson.results.chapter.contents.map(e => e.url)
        },
        insertImg: [".comicContentPopupImageList", 2],
        next: () => {
            let next = siteJson.results.chapter.next;
            if (next) {
                return location.href.replace(/[\w-]+$/, "") + next;
            } else {
                return null;
            }
        },
        customTitle: () => {
            return siteJson.results.comic.name + " - " + siteJson.results.chapter.name;
        },
        css: ".comicFixed{display:none!important}",
        category: "comic"
    }, {
        name: "二次元動漫 www.2animx.com",
        enable: 0,
        reg: /www\.2animx\.com\/index-look-name-.+/,
        init: "$(document).unbind('click');",
        imgs: () => {
            let max = $("#total").val();
            return fun.getImgO("#ComicPic", max, 20, [null, null], 0, ".e>p", 0);
        },
        insertImg: ["#img_ad_img", 1],
        autoDownload: [0],
        next: ".n.zhangjie",
        prev: ".p.zhangjie",
        customTitle: () => {
            return fun.geT(".e>p").replace(/（\d+P） - 第 \d+ \/ \d+ 頁/, "");
        },
        css: ".c>*:not(.n.zhangjie):not(.p.zhangjie){display:none!important;}#ComicPic{display:block!important;margin: 0 auto !important;}",
        category: "comic"
    }, {
        name: "酷漫屋 www.kumw7.com m.kumw7.com",
        enable: 0,
        reg: /(www|m)\.kumw\d\.com\/\d+\/\d+\.html/,
        imgs: ".main_img img",
        insertImg: [".main_img", 2],
        autoDownload: [0],
        next: "//a[img[@alt='下一章']] | //a[i[@class='i-rd-next'] and contains(@href,'html')]",
        prev: "//a[img[@alt='上一章']] | //a[i[@class='i-rd-prev'] and contains(@href,'html')]",
        customTitle: () => {
            try {
                return fun.geT(".chaptitle").replace(">", "-");
            } catch (e) {
                let s = document.title.replace(" - 酷漫屋", "").split("_");
                return s[1] + " - " + s[0]
            }
        },
        category: "comic"
    }, {
        name: "快岸漫画 kanbook.net",
        enable: 0,
        reg: /kanbook\.net\/comic\/\d+\/\d+/,
        init: "$(document).unbind('keydown');$(document).unbind('keyup');",
        imgs: () => {
            let arr = [];
            if (is_refresh == 0) {
                for (let i = 0; i < pageNum; i++) {
                    arr.push(Gm.getImgUrl(comic_id + "/" + version_id + "/" + part_id + "/" + my_sha2(x_tokens[i])))
                }
            } else {
                for (let i = 0; i < data.url.length; i++) {
                    arr.push(Gm.getImgUrl(data.url[i]))
                }
            }
            return arr
        },
        insertImg: ["#all", 2],
        autoDownload: [0],
        next: "//a[text()='下一章' and not(starts-with(@href,'javascript'))]",
        prev: "//a[text()='上一章' and not(starts-with(@href,'javascript'))]",
        customTitle: "return fun.geT('h2.h2>a')+' - '+fun.geT('span.h4:nth-child(5)');",
        //one: 1,
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "comic"
    }, {
        name: "快看漫画 www.kuaikanmanhua.com",
        enable: 0,
        reg: /www\.kuaikanmanhua\.com\/web\/comic\/\d+\//,
        imgs: ".imgList img[data-src]",
        insertImg: [".imgList", 2],
        autoDownload: [0],
        next: "//a[text()='下一话']",
        prev: "//a[text()='上一话']",
        customTitle: "return fun.geT('h3.title');",
        category: "comic"
    }, {
        name: "腾讯漫画 ac.qq.com",
        enable: 0,
        reg: /ac\.qq\.com\/ComicView\/index\/id\/\d+\/cid\/\d+/,
        imgs: () => {
            let nonce = [...document.scripts].find(s => s.innerHTML.search(/^\s+window\[/) > -1).innerHTML.match(/\s*window.*?=(.*?)?;/)[1];
            nonce = fun.run(nonce);
            const data = DATA.split("");
            nonce = nonce.match(/\d+[a-z]+/gi);
            let n = nonce.length;
            let locate = null;
            let str = "";
            while (n--) {
                locate = parseInt(nonce[n]) & 255;
                str = nonce[n].replace(/\d+/g, "");
                data.splice(locate, str.length);
            }
            const base64 = data.join("");
            const json = JSON.parse(window.atob(base64));
            return json.picture.map(e => e.url)
        },
        autoDownload: [0],
        next: "#nextChapter",
        prev: "#prevChapter",
        customTitle: "return fun.geT('#chapter')+' - '+fun.geT('.title-comicHeading');",
        //css: "#comicContain>img{width:765px!important;}.comic-contain img{transition:unset!important;transform:unset!important}",
        category: "comic"
    }, {
        name: "哔哩哔哩漫画 manga.bilibili.com",
        enable: 1,
        reg: /manga\.bilibili\.com\/mc\d+\/\d+\?from=manga_detail/,
        init: () => {
            setTimeout(() => {
                fun.ge(".load-next-btn").addEventListener("click", () => {
                    setTimeout(() => {
                        location.reload()
                    }, 500)
                })
            }, 1000)
        },
        imgs: async () => {
            let ep_id = siteUrl.split("/").pop().match(/\d+/)[0];
            let headers = {
                "content-type": "application/json;charset=UTF-8"
            };
            let imgsRes = await fetch("/twirp/comic.v1.Comic/GetImageIndex?device=pc&platform=web", {
                "headers": headers,
                "body": JSON.stringify({
                    ep_id: `${ep_id}`
                }),
                "method": "POST"
            }).then(res => res.json()).then(json => json.data.images.map(e => e.path));
            return fetch("/twirp/comic.v1.Comic/ImageToken?device=pc&platform=web", {
                "headers": headers,
                "body": JSON.stringify({
                    urls: JSON.stringify(imgsRes)
                }),
                "method": "POST"
            }).then(res => res.json()).then(json => json.data.map(e => `${e.url}?token=${e.token}`));
        },
        insertImg: [".image-list", 2],
        next: ".load-next-btn",
        prev: 1,
        customTitle: async () => {
            await fun.delay(1500, 0);
            return fun.geT(".manga-title") + " - " + fun.geT(".episode");
        },
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "comic"
    }, {
        name: "看漫画 www.kanman.com",
        enable: 0,
        reg: /www\.kanman\.com\/\d+\/[\w-]+\.html/,
        imgs: () => {
            let s = location.pathname.split("/");
            let comic_id = s[1];
            let chapter_newid = s[2].replace(".html", "");
            let api = `/api/getchapterinfov2?product_id=1&productname=kmh&platformname=pc&comic_id=${comic_id}&chapter_newid=${chapter_newid}&isWebp=1&quality=middle`;
            return fetch(api).then(res => res.json()).then(json => json.data.current_chapter.chapter_img_list);
        },
        customTitle: async () => {
            await fun.delay(1500, 0);
            return fun.geT('#crumbComicLink') + " - " + fun.geT('.chapter-title').trim()
        },
        category: "comic"
    }, {
        name: "漫蛙 manwa.me", //方向鍵上一章下一章、清除擋廣告警告、向下滾動隱藏工具列、反反偵錯，下載不了
        enable: 1,
        icon: 0,
        key: 0,
        reg: /manwa\.me\/chapter\/\d+(\?img_host=\d)?$/,
        init: () => {
            Function.prototype.constructor = () => {};
            fun.css(".ad-area{opacity:0!important;}#cp_img>.two-ad-area:nth-child(1)>.ad-area,#cp_img>.two-ad-area:nth-child(2){display:none!important}");
            fun.remove(".ad-area,body>div[id]", 5000);
            const hidetoolbar = () => {
                var e = e || window.event;
                if (e.wheelDelta < 0 || e.detail > 0) {
                    $(".view-fix-top-bar").attr("style", "top: -60px;");
                    $(".view-fix-bottom-bar").attr("style", "bottom: -60px;");
                    $(".detail-comment-fix-bottom").hide("fast")
                } else {
                    $(".view-fix-top-bar").attr("style", "top: 0px;");
                    $(".view-fix-bottom-bar").attr("style", "bottom: 0px;");
                    $(".detail-comment-fix-bottom").show("fast")
                }
            };
            document.addEventListener("wheel", hidetoolbar);
            document.addEventListener("DOMMouseScroll", hidetoolbar);
            const keyhidetoolbar = (e) => {
                let key = window.event ? e.keyCode : e.which;
                if (key == "34" || key == "32" || key == "40") {
                    $(".view-fix-top-bar").attr("style", "top: -60px;");
                    $(".view-fix-bottom-bar").attr("style", "bottom: -60px;");
                    $(".detail-comment-fix-bottom").hide("fast")
                } else {
                    $(".view-fix-top-bar").attr("style", "top: 0px;");
                    $(".view-fix-bottom-bar").attr("style", "bottom: 0px;");
                    $(".detail-comment-fix-bottom").show("fast")
                }
            };
            document.addEventListener("keydown", keyhidetoolbar);
            if (("ontouchstart" in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
                let startY, moveY, Y;
                $("body").on("touchstart", (e) => {
                    startY = e.originalEvent.changedTouches[0].pageY;
                });
                $("body").on("touchmove", (e) => {
                    moveY = e.originalEvent.changedTouches[0].pageY;
                    Y = moveY - startY;
                    if (Y < 0) {
                        $(".view-fix-top-bar").attr("style", "top: -60px;");
                        $(".view-fix-bottom-bar").attr("style", "bottom: -60px;");
                        $(".detail-comment-fix-bottom").hide("fast")
                    } else if (Y > 0) {
                        $(".view-fix-top-bar").attr("style", "top: 0px;");
                        $(".view-fix-bottom-bar").attr("style", "bottom: 0px;");
                        $(".detail-comment-fix-bottom").show("fast")
                    }
                });
            }
        },
        //imgs: "js;return [...fun.gae('.content-img[src^=blob]')].map(e=>e.src)",
        //imgs: "js;const get=async()=>{let imgs=[...fun.gae('.content-img[data-r-src]')];for(let i=0;i<imgs.length;i++){imgs[i].scrollIntoView();await fun.delay(50)}imgs[0].scrollIntoView();return[...fun.gae('.content-img[src^=blob]')].map(e=>e.src)};return get();",
        //imgs: "js;return[...fun.gae('.content-img[data-r-src]')].map(e=>e.dataset.rSrc)",
        next: ".view-fix-bottom-bar-item-menu-next",
        prev: ".view-fix-bottom-bar-item-menu-prev",
        customTitle: "return fun.title('在线阅读',1)",
        css: "body{padding-bottom:0px!important}",
        category: "comic"
    }, {
        name: "漫蛙選目錄展開全部章節 manwa.me",
        enable: 1,
        icon: 0,
        key: 0,
        reg: /manwa\.me\/book\/\d+$/,
        init: "Function.prototype.constructor=()=>{};titleSelect(this,'#chapter_indexes');charpterMore(this);",
        category: "comic"
    }, {
        name: "漫蛙自動載入更多 manwa.me",
        enable: 1,
        icon: 0,
        key: 0,
        reg: /manwa\.me\/update$/,
        init: "Function.prototype.constructor=()=>{};",
        observerClick: "#loadMore",
        category: "comic"
    }, {
        name: "開車漫画 18p.fun",
        enable: 1,
        reg: /^https?:\/\/(www\.)?(18p|gohaveababy|imynest|healthway|beforeout)\.[a-z]{2,5}\/(ForInject\/|Article\/|content\/)/,
        imgs: async () => {
            await fun.waitEle("//script[contains(text(),'_curChap')]");
            if (location.hostname != "18p.fun") {
                location.replace("https://18p.fun/ForInject/Chapter/?id=" + $_curChap.id);
                await fun.delay(3000, 0);
            }
            await fun.getNP("img[data-src].lazy:not(.demo-lazy)", "//a[@data-url and contains(text(),'下一頁')] | //a[@data-url and contains(text(),'下一章')]", null, "div[class^=picnext]");
            return [...fun.gae("img[data-src].lazy:not(.demo-lazy)")]
        },
        insertImg: ["div[class^=pictures]", 3],
        fetch: 1,
        css: "#customPicDownloadEnd{color:rgb(255, 255, 255)}",
        category: "comic"
    }, {
        name: "開車漫画 18p.fun",
        enable: 0,
        icon: 0,
        key: 0,
        reg: /^https:\/\/18p\.fun\//,
        include: ".loadmore>button",
        init: () => {
            const setImgSrc = () => gae("img.lazy[src$=svg]").forEach(img => {
                img.src = img.dataset.src
            });
            setImgSrc();
            new MutationObserver(() => {
                setImgSrc()
            }).observe(document.body, {
                childList: true,
                subtree: true
            });
        },
        observerClick: ".loadmore>button",
        openInNewTab: "#itemlist li>a:not([target=_blank])",
        css: ".page{display:none!important}.loadmore{display:block!important}",
        category: "comic"
    }, {
        name: "风之动漫 www.fffdm.com",
        enable: 1,
        reg: /(www\.fffdm\.com|manhua\.fffdm\.com)\/(manhua\/)?\d+\/[^/]+\/$/i,
        init: async () => {
            let s = location.pathname.split("/").slice(-3);
            let mhId = s[0];
            let mhcId = s[1];
            let api = `https://${location.hostname}/api/manhua/${mhId}/${mhcId}`;
            let json = await fetch(api).then(res => res.json());
            debug("\n此頁JSON資料\n", json);
            siteJson = json;
            let url = await siteData.next();
            if (url) {
                let text = `<div style="padding: 36px 0; text-align: center;"><a href="${url}"style="font-size: 26px;line-height: 50px;height: 50px;text-align: center;">點選進入下一話</a></div>`;
                fun.ge("#mh").insertAdjacentHTML("afterend", text);
                fun.ge("#mh+div").addEventListener("click", () => {
                    setTimeout(() => {
                        location.reload()
                    }, 200)
                })
            }
        },
        imgs: async () => {
            if (await fun.waitEle("#mhpic", 30)) {
                let host = fun.ge("#mhpic").src.match(/^https?:\/\/[^/]+\//i);
                return siteJson.cont.map(e => host + e);
            } else {
                return []
            }
        },
        insertImg: ["#mh", 2],
        next: () => {
            let comicListUrl = location.href.replace(/[\w-]+\/$/i, "");
            let chapter = location.href.match(/[\w-]+\/$/)[0];
            let nextXPath = `//div[@id='content']/li[a[@href='${chapter}']]/preceding-sibling::li[1]/a`;
            return fun.xhr(comicListUrl, "document").then(doc => {
                let next = fun.ge(nextXPath, doc);
                if (next) {
                    return comicListUrl + next.getAttribute("href");
                } else {
                    return null;
                }
            })
        },
        prev: 1,
        customTitle: () => {
            return fun.title("第1页", 1)
        },
        category: "comic"
    }, {
        name: "大古漫画 www.dagumanhua.net",
        enable: 1,
        reg: /www\.dagumanhua\.net\/manhua\/\d+\/\d+\.html$/i,
        init: async () => {
            document.onkeydown = null;
            document.onkeyup = null;
            let url = await siteData.next();
            if (url) {
                fun.addNextHtml(url, ".mh_list", 1)
            }
        },
        imgs: () => {
            let max = fun.ge("//script[contains(text(),'totalpage')]").innerHTML.match(/totalpage\s?=\s?(\d+)/)[1];
            return fun.getImg(".mh_list img", max, 9)
        },
        insertImg: [".mh_list", 2],
        next: () => {
            let comicListUrl = location.href.replace(/\d+\.html$/, "");
            let chapter = location.pathname;
            let nextXPath = `//li[a[@href='${chapter}']]/preceding-sibling::li[1]/a`;
            return fun.xhr(comicListUrl, "document").then(doc => {
                let next = fun.ge(nextXPath, doc);
                if (next) {
                    return location.origin + next.getAttribute("href");
                } else {
                    return null;
                }
            })
        },
        prev: 1,
        customTitle: () => {
            return fun.geT(".mh_cont>h1")
        },
        category: "comic"
    }, {
        name: "大古漫画M m.dagumanhua.net",
        enable: 1,
        icon: 0,
        reg: /m\.dagumanhua\.net\/manhua\/\d+\/\d+\.html$/i,
        init: async () => {
            let url = await siteData.next();
            if (url) {
                fun.addNextHtml(url, "#content,.content", 1)
            }
        },
        imgs: async () => {
            await fun.getNP("#content img,.content img", "//a[@href and text()='下一页']", null, ".pager,.cpages", 0, null, 0);
            return [...fun.gae("#content img,.content img")]
        },
        insertImg: ["#content,.content", 1],
        next: () => {
            let comicListUrl = location.href.replace(/\d+\.html$/, "");
            let chapter = location.pathname;
            let nextXPath = `//li[a[@href='${chapter}']]/preceding-sibling::li[1]/a`;
            return fun.xhr(comicListUrl, "document").then(doc => {
                let next = fun.ge(nextXPath, doc);
                if (next) {
                    return location.origin + next.getAttribute("href");
                } else {
                    return null;
                }
            })
        },
        prev: "//a[@href and text()='上一章']",
        customTitle: () => {
            try {
                return fun.geT(".cont_tit strong")
            } catch (e) {
                return fun.geT("#bookname") + " - " + fun.geT(".headline")
            }
        },
        css: "#content~a,.content~a,.apjg{display:none!important}",
        category: "comic"
    }, {
        name: "漫畫類 自動展開目錄",
        enable: 1,
        icon: 0,
        key: 0,
        reg: /((mangabz|xmanhua|dm5|1kkk|qiman\d+|mhxqiu\d|6mh\d+|manben|mkzhan|xianmanwang|qiximh\d|kumw\d)\.com\/[\w-]+\/$)|(m\.dmzj\.com|m\.ymh1234\.com)\/(info|comic)\/\d+\.html$|(acgud|manhua456|mhxin|qwmanhua|zuimh|imitui|xlsmh|dmhua8|pinmh|qmiaomh|dashumanhua|kukuwumh|mh160|szcdmj|haoman6)\.(com|cc)\/(comic|manhua|manga|kanmanhua|szcbook)\/[\w-]+\/?$|www\.mhua5\.com\/[\w-]+\.html|m\.aiguoman\.com\/comic\/\w+|(www|m)\.77mh\.\w+\/colist_\d+\.html|www\.manhw\.com\/index\.php\/comic\/\w+$/,
        init: async () => {
            if (location.hostname == "m.acgud.com") {
                fun.css(".Introduct_Sub{background:url(https://m.idmzj.com/images/int_bg.png)!important;background-size:100% 100%!important}")
            }
            if (location.hostname == "m.mhxqiu2.com") {
                await fun.delay(600, 0)
            }
        },
        autoClick: "a.detail-list-form-more,a.detail-list-more,.deatil-list-more>a,.detail-more,.moreChapter,.show-more,a#zhankai,.gengduo_dt1>button,.morechapter>button,.gengduo_dt1>a,.chapterList+.more,li.add,a.extend,a.action-collapse:not(.on),.chapter__more .down,.listmore,.more.chapLiList-cont>a,.m-load-more-sm>a,.more>a,.allmulu,.show-more>a,.morechp,.nnmore>a",
        css: ".comic-info-box+a,.cartoon-introduction.cmg,.cartoon-introduction+a,.msloga,.comic_intro>a,.Introduct+a,[class^='ad']{display:none!important}",
        category: "comic"
    }, {
        name: "94i.in 自動簽到",
        icon: 0,
        key: 0,
        reg: /^https?:\/\/94i\.in\//,
        autoClick: "#pper_a:not([style='display: none;'])",
        category: "none"
    }, {
        name: "Supjav 立即顯示影片縮圖",
        icon: 0,
        key: 0,
        delay: 300,
        reg: /^https?:\/\/supjav\.com\/(zh\/|ja\/)?\d+\.html/,
        init: async () => {
            let t = fun.ge("title");
            t.innerText = t.innerText.replace(/-\sSupjav.com.+/, "").trim();
            let ele = "#vserver.play-button";
            if (await fun.waitEle(ele)) fun.ge(ele).click();
        },
        category: "none"
    }, {
        name: "ouo.io 自動跳轉",
        icon: 0,
        key: 0,
        reg: /^https?:\/\/ouo\./,
        init: async () => {
            let ele = "#btn-main:not(.disabled)";
            if (await fun.waitEle(ele)) fun.ge(ele).click();
        },
        category: "none"
    }, {
        name: "cuty.io 自動跳轉",
        icon: 0,
        key: 0,
        reg: /^https:\/\/cutt?y\.(io|app)\/\w+/i,
        init: async () => {
            let ele = "//button[@id='submit-button' and text()= 'Continue' or text()= 'I am not a robot' or text()= 'Go ->']";
            if (await fun.waitEle(ele)) fun.ge(ele).click();
        },
        category: "none"
    }, {
        name: "m.4khd.com 自動跳轉",
        icon: 0,
        key: 0,
        reg: /^https?:\/\/m\.4khd\.com\//,
        init: () => {
            location.href = fun.ge("//a[text()='GET LINK']").href;
        },
        category: "none"
    }, {
        name: "MediaFire 自動下載",
        icon: 0,
        key: 0,
        reg: /^https?:\/\/www\.mediafire\.com\//,
        autoClick: ".download_link:not(.started) #downloadButton",
        category: "none"
    }, {
        name: "anonfiles 自動下載",
        icon: 0,
        key: 0,
        reg: /^https?:\/\/anonfiles\.com\//,
        autoClick: ["#download-url"],
        category: "none"
    }, {
        name: "letsupload 自動下載",
        icon: 0,
        key: 0,
        reg: /^https?:\/\/letsupload\.cc\//,
        autoClick: ["#download-url"],
        category: "none"
    }, {
        name: "stfly.me 半自動跳轉",
        icon: 0,
        key: 0,
        reg: /^http/,
        include: "img[src^='https://stfly.me/']",
        init: async () => {
            if (await fun.waitEle(".btn-captcha:not(.disable)")) {
                setInterval(() => {
                    fun.ge(".btn-captcha:not(.disable)").click();
                }, 3000);
            }
        },
        category: "none"
    }, {
        name: "link1s 自動跳轉",
        icon: 0,
        key: 0,
        reg: /^http/,
        include: "a.site-logo[href='https://link1s.com/'],a.logo-image[href='https://link1s.com/']",
        init: async () => {
            if (await fun.waitEle("//button[@onclick='link1sgo()'] | //button[@id='link' and contains(@style,'none')] | //a[text()='Get Link']")) {
                fun.ge("//button[@onclick='link1sgo()'] | //a[@id='link1s'] | //a[text()='Get Link']").click();
            }
        },
        category: "none"
    }];

    let _GM_xmlhttpRequest;
    if (typeof GM_xmlhttpRequest != "undefined") {
        _GM_xmlhttpRequest = GM_xmlhttpRequest;
    } else if (typeof GM != "undefined" && typeof GM.xmlHttpRequest != "undefined") {
        _GM_xmlhttpRequest = GM.xmlHttpRequest;
    }

    const fun = {
        getImg: async (img, maxPage = 1, mode = 1, rText = [null, null]) => {
            if (fun.ge('.CustomPictureDownloadImage')) return [...fun.gae('.CustomPictureDownloadImage')];
            fun.show("獲取圖片元素中...", 0);
            let imgsArray = [];
            let fetchNum = 0;
            const html = url => fetch(url).then(res => res.arrayBuffer()).then(buffer => {
                const decoder = new TextDecoder(document.characterSet || document.charset || document.inputEncoding);
                const htmlText = decoder.decode(buffer);
                let doc = fun.doc(htmlText);
                let imgs = [...doc.images];
                for (let i in imgs) {
                    let check = fun.checkImgSrc(imgs[i], rText);
                    if (check.ok) {
                        new Image().src = check.src;
                    }
                }
                fun.show(`獲取圖片中${fetchNum+=1}/${maxPage}`, 0);
                return htmlText;
            }).catch(error => {
                debug(`\nfun.getImg() > fetch()出錯:\n${decodeURI(url)}`, error);
            });
            const resArr = [];
            resArr.push(html(siteUrl));
            if (maxPage > 1) {
                for (let i = 2; i <= maxPage; i++) {
                    if (mode === 1) {
                        //【.html ==> .html?page=2】第一頁 ==> 第二頁
                        //【 ==> ?page=2】第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\?page=\d+$/, "") + "?page=" + i));
                    } else if (mode === 2) {
                        //【.html ==> /2.html】 第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.slice(0, -5) + "/" + i + ".html"));
                    } else if (mode === 3) {
                        //【.html ==> _1.html】  第一頁 ==> 第二頁
                        //resArr.push(html(siteUrl.replace(/(_\d+)?\.html$/, "") + "_" + (i - 1) + ".html"));
                        resArr.push(html(siteUrl.replace(/\.html$/, "") + "_" + (i - 1) + ".html"));
                    } else if (mode === 4) {
                        //【/ ==> /2/】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.slice(0, -1) + "/" + i + "/"));
                    } else if (mode === "4") {
                        //【 ==> /2】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl + "/" + i));
                    } else if (mode === 5) {
                        //【.html ==> -2.html】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\.html$/, "") + "-" + i + ".html"));
                    } else if (mode === "5") {
                        //【-1.html ==> -2.html】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/(-\d+)?\.html$/, "") + "-" + i + ".html"));
                    } else if (mode === 6) {
                        //【?p=1 ==> ?p=2】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\?p=\d+$/, "") + "?p=" + i));
                    } else if (mode === 7) {
                        //【/1 ==> /2】  第一頁 ==> 第二頁
                        //【.html ==> .html/2】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\/\d+$/, "") + "/" + i));
                    } else if (mode === 8) {
                        //【 ==> &page=1】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/&page=\d+$/, "") + "&page=" + (i - 1)));
                    } else if (mode === "8") {
                        //【 ==> &page=2】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/&page=\d+$/, "") + "&page=" + i));
                    } else if (mode === 9) {
                        //【.html ==> _2.html】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/(_\d+)?\.html$/, "") + "_" + i + ".html"));
                    } else if (mode === 10) {
                        //【.html ==> .html/2】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\.html(\/\d+)?$/, "") + ".html/" + i));
                    } else if (mode === 11) {
                        //【/ ==> /2.html】  第一頁 ==> 第二頁
                        //【/1.html ==> /2.html】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\/(\d+\.html)?$/, "") + "/" + i + ".html"));
                    } else if (mode === 12) {
                        //【/ ==> /2.htm】  第一頁 ==> 第二頁
                        //【/1.htm ==> /2.htm】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\/(\d+\.htm)?$/, "") + "/" + i + ".htm"));
                    } else if (mode === 13) {
                        //【-1-* ==> -2-*】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/-\d+-[^-]+$/, "") + "-" + i));
                    } else if (mode === 14) {
                        //【/1/ ==> /2/】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\/\d+\/$/, "") + "/" + i + "/"));
                    } else if (mode === 15) {
                        //【/index.html ==> /index_2.html】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\/(index(_\d+)?\.html)?$/, "") + "/index_" + i + ".html"));
                    } else if (mode === 16) {
                        //【 ==> /2#list】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\/(index(_\d+)?\.html)?$/, "") + "/" + i + "#list"));
                    } else if (mode === 17) {
                        //【.htm ==> _2.htm】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/(_\d+)?\.htm$/, "") + "_" + i + ".htm"));
                    } else if (mode === 18) {
                        //【/ ==> /page/2/】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/\/(page\/\d+\/)?$/, "") + "/page/" + i + "/"));
                    } else if (mode === 19) {
                        //【-1 ==> -2】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/-\d+$/, "") + "-" + i));
                    } else if (mode === 20) {
                        //【 ==> -p-2】  第一頁 ==> 第二頁
                        resArr.push(html(siteUrl.replace(/-p-\d+$/, "") + "-p-" + i));
                    }
                }
            }
            await Promise.all(resArr).then(htmls => {
                fun.hide();
                for (let i = 0; i < htmls.length; i++) {
                    let doc = fun.doc(htmls[i]);
                    let imgs = [...fun.gae(img, doc)];
                    debug(`\nfun.getImg() DOM${i}`, doc);
                    for (let p = 0; p < imgs.length; p++) {
                        let check = fun.checkImgSrc(imgs[p], rText);
                        if (check.ok) {
                            imgsArray.push(decodeURI(check.src));
                            continue;
                        } else {
                            debug(`\nfun.getImg() imgs[${p}]錯誤`, imgs[p]);
                            continue;
                        }
                    }
                }
            });
            debug("\nfun.getImg() 聚集的所有IMG", imgsArray);
            return imgsArray;
        },
        getImgO: async (img, maxPage = 1, mode = 1, rText = [null, null], time = 200, paginationEle = null, msg = 1) => {
            if (fun.ge('.CustomPictureDownloadImage')) return [...fun.gae('.CustomPictureDownloadImage')];
            if (msg == 1) fun.show("獲取圖片元素中...", 0);
            let imgsArray = [];
            let fetchNum = 0;
            const html = async (url, id = 1) => {
                await fun.delay(time, 0);
                return fetch(url).then(async res => {
                    if (res.status === 403) {
                        fun.show("403，未登錄網站?", 3000);
                    }
                    return res.arrayBuffer();
                }).then(buffer => {
                    const decoder = new TextDecoder(document.characterSet || document.charset || document.inputEncoding);
                    const htmlText = decoder.decode(buffer);
                    let doc = fun.doc(htmlText);
                    [...fun.gae(img, doc)].forEach(ele => {
                        let check = fun.checkImgSrc(ele);
                        if (ele.tagName == "IMG" && check.ok) {
                            ele.src = check.src;
                        }
                        if (id == 1) {
                            let targetEle = [...fun.gae(img)].pop();
                            targetEle.parentNode.insertBefore(ele.cloneNode(true), targetEle.nextSibling);
                        }
                    });
                    if (typeof paginationEle == "string") {
                        fun.gae(".invisible", doc).forEach(ele => {
                            ele.classList.remove("invisible");
                        });
                        fun.gae(paginationEle).forEach(ele => {
                            //debug("paginationEle", ele);
                            ele.innerHTML = fun.ge(paginationEle, doc).innerHTML;
                        });
                    }
                    if (msg == 1) fun.show(`獲取圖片中${fetchNum+=1}/${maxPage}`, 0);
                    return htmlText;
                }).catch(error => {
                    debug(`\nfun.getImgO() > fetch()出錯:\n${decodeURI(url)}`, error);
                });
            };
            const resArr = [];
            resArr.push(html(siteUrl, 0));
            if (maxPage > 1) {
                for (let i = 2; i <= maxPage; i++) {
                    if (mode === 1) {
                        //【.html ==> .html?page=2】第一頁 ==> 第二頁
                        //【 ==> ?page=2】第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\?page=\d+$/, "") + "?page=" + i));
                    } else if (mode === 2) {
                        //【.html ==> /2.html】 第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.slice(0, -5) + "/" + i + ".html"));
                    } else if (mode === 3) {
                        //【.html ==> _1.html】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/(_\d+)?\.html$/, "") + "_" + (i - 1) + ".html"));
                    } else if (mode === 4) {
                        //【/ ==> /2/】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.slice(0, -1) + "/" + i + "/"));
                    } else if (mode === "4") {
                        //【 ==> /2】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl + "/" + i));
                    } else if (mode === 5) {
                        //【.html ==> -2.html】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\.html$/, "") + "-" + i + ".html"));
                    } else if (mode === "5") {
                        //【-1.html ==> -2.html】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/(-\d+)?\.html$/, "") + "-" + i + ".html"));
                    } else if (mode === 6) {
                        //【?p=1 ==> ?p=2】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\?p=\d+$/, "") + "?p=" + i));
                    } else if (mode === 7) {
                        //【/1 ==> /2】  第一頁 ==> 第二頁
                        //【.html ==> .html/2】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\/\d+$/, "") + "/" + i));
                    } else if (mode === 8) {
                        //【 ==> &page=1】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/&page=\d+$/, "") + "&page=" + (i - 1)));
                    } else if (mode === "8") {
                        //【 ==> &page=2】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/&page=\d+$/, "") + "&page=" + i));
                    } else if (mode === 9) {
                        //【.html ==> _2.html】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/(_\d+)?\.html$/, "") + "_" + i + ".html"));
                    } else if (mode === 10) {
                        //【.html ==> .html/2】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\.html(\/\d+)?$/, "") + ".html/" + i));
                    } else if (mode === 11) {
                        //【/ ==> /2.html】  第一頁 ==> 第二頁
                        //【/1.html ==> /2.html】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\/(\d+\.html)?$/, "") + "/" + i + ".html"));
                    } else if (mode === 12) {
                        //【/ ==> /2.htm】  第一頁 ==> 第二頁
                        //【/1.htm ==> /2.htm】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\/(\d+\.htm)?$/, "") + "/" + i + ".htm"));
                    } else if (mode === 13) {
                        //【-1-* ==> -2-*】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/-\d+-[^-]+$/, "") + "-" + i));
                    } else if (mode === 14) {
                        //【/1/ ==> /2/】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\/\d+\/$/, "") + "/" + i + "/"));
                    } else if (mode === 15) {
                        //【/index.html ==> /index_2.html】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\/(index(_\d+)?\.html)?$/, "") + "/index_" + i + ".html"));
                    } else if (mode === 16) {
                        //【 ==> /2#list】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\/(index(_\d+)?\.html)?$/, "") + "/" + i + "#list"));
                    } else if (mode === 17) {
                        //【.htm ==> _2.htm】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/(_\d+)?\.htm$/, "") + "_" + i + ".htm"));
                    } else if (mode === 18) {
                        //【/ ==> /page/2/】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/\/(page\/\d+\/)?$/, "") + "/page/" + i + "/"));
                    } else if (mode === 19) {
                        //【-1 ==> -2】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/-\d+$/, "") + "-" + i));
                    } else if (mode === 20) {
                        //【 ==> -p-2】  第一頁 ==> 第二頁
                        resArr.push(await html(siteUrl.replace(/-p-\d+$/, "") + "-p-" + i));
                    }
                }
            }
            await Promise.all(resArr).then(htmls => {
                fun.hide();
                for (let i = 0; i < htmls.length; i++) {
                    let doc = fun.doc(htmls[i]);
                    let imgs = [...fun.gae(img, doc)];
                    debug(`\nfun.getImgO() DOM${i}`, doc);
                    for (let p = 0; p < imgs.length; p++) {
                        let check = fun.checkImgSrc(imgs[p], rText);
                        if (check.ok) {
                            imgsArray.push(decodeURI(check.src));
                            continue;
                        } else {
                            debug(`\nfun.getImgO() imgs[${p}]錯誤`, imgs[p]);
                            continue;
                        }
                    }
                }
            });
            debug("\nfun.getImgO() 聚集的所有IMG", imgsArray);
            return imgsArray;
        },
        getImgIframe: async (img, maxPage = 1, mode = 1, rText = [null, null], paginationEle = null, time = 500, showMsg = 1) => {
            if (fun.ge('.CustomPictureDownloadImage')) return [...fun.gae('.CustomPictureDownloadImage')];
            if (showMsg == 1) fun.show("獲取圖片元素中...", 0);
            let imgsArray = [];
            let fetchNum = 0;
            const html = (url, id = 0) => fetch(url).then(res => res.arrayBuffer()).then(buffer => {
                const decoder = new TextDecoder(document.characterSet || document.charset || document.inputEncoding);
                const htmlText = decoder.decode(buffer);
                return htmlText;
            }).then(async res => {
                await new Promise(async resolve => {
                    const iframe = document.createElement('iframe');
                    iframe.id = "CustomPictureDownload" + id;
                    iframe.style.display = "none";
                    iframe.srcdoc = res;
                    document.body.appendChild(iframe);
                    iframe.onload = async () => {
                        let doc = iframe.contentDocument || iframe.contentWindow.document;
                        if (!doc) {
                            debug("fun.getImgIframe() 不支援此網站")
                            return [];
                        }
                        let targetEle = [...fun.gae(img)].pop();
                        let load = document.createElement("p");
                        load.className = 'customPicDownloadLoading';
                        load.innerText = "Loading...";
                        targetEle.parentNode.insertBefore(load, targetEle.nextSibling);
                        await fun.delay(time, 0);
                        if (await fun.waitEle(img, 400, doc)) {
                            debug("iframeDoc" + id, doc);
                            [...fun.gae(img, doc)].forEach(ele => {
                                imgsArray.push(ele);
                                if (paginationEle) {
                                    fun.gae(paginationEle).forEach(pag => {
                                        pag.innerHTML = fun.ge(paginationEle, doc).innerHTML;
                                    });
                                }
                                targetEle.parentNode.insertBefore(ele.cloneNode(true), targetEle.nextSibling);
                                load.remove();
                            });
                        } else {
                            load.remove();
                            fun.show("獲取圖片逾時", 0);
                            return [];
                        }
                        resolve();
                        load.remove();
                        iframe.remove();
                    };
                });
                if (showMsg == 1) fun.show(`獲取圖片中${fetchNum+=1}/${maxPage}`, 0);
            }).catch(error => {
                debug(`\nfun.getImg() > fetch()出錯:\n${decodeURI(url)}`, error);
            });
            await fun.waitEle(img);
            [...fun.gae(img)].forEach(ele => {
                imgsArray.push(ele);
            });
            if (maxPage > 1) {
                for (let i = 2; i <= maxPage; i++) {
                    if (mode === 1) {
                        //【.html ==> .html?page=2】第一頁 ==> 第二頁
                        //【 ==> ?page=2】第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\?page=\d+$/, "") + "?page=" + i, i);
                    } else if (mode === 2) {
                        //【.html ==> /2.html】 第一頁 ==> 第二頁
                        await html(siteUrl.slice(0, -5) + "/" + i + ".html", i);
                    } else if (mode === 3) {
                        //【.html ==> _1.html】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/(_\d+)?\.html$/, "") + "_" + (i - 1) + ".html", i);
                    } else if (mode === 4) {
                        //【/ ==> /2/】  第一頁 ==> 第二頁
                        await html(siteUrl.slice(0, -1) + "/" + i + "/", i);
                    } else if (mode === "4") {
                        //【 ==> /2】  第一頁 ==> 第二頁
                        await html(siteUrl + "/" + i);
                    } else if (mode === 5) {
                        //【.html ==> -2.html】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\.html$/, "") + "-" + i + ".html");
                    } else if (mode === "5") {
                        //【-1.html ==> -2.html】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/(-\d+)?\.html$/, "") + "-" + i + ".html");
                    } else if (mode === 6) {
                        //【?p=1 ==> ?p=2】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\?p=\d+$/, "") + "?p=" + i, i);
                    } else if (mode === 7) {
                        //【/1 ==> /2】  第一頁 ==> 第二頁
                        //【.html ==> .html/2】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\/\d+$/, "") + "/" + i, i);
                    } else if (mode === 8) {
                        //【 ==> &page=1】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/&page=\d+$/, "") + "&page=" + (i - 1), i);
                    } else if (mode === "8") {
                        //【 ==> &page=2】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/&page=\d+$/, "") + "&page=" + i, i);
                    } else if (mode === 9) {
                        //【.html ==> _2.html】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/(_\d+)?\.html$/, "") + "_" + i + ".html", i);
                    } else if (mode === 10) {
                        //【.html ==> .html/2】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\.html(\/\d+)?$/, "") + ".html/" + i, i);
                    } else if (mode === 11) {
                        //【/ ==> /2.html】  第一頁 ==> 第二頁
                        //【/1.html ==> /2.html】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\/(\d+\.html)?$/, "") + "/" + i + ".html", i);
                    } else if (mode === 12) {
                        //【/ ==> /2.htm】  第一頁 ==> 第二頁
                        //【/1.htm ==> /2.htm】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\/(\d+\.htm)?$/, "") + "/" + i + ".htm", i);
                    } else if (mode === 13) {
                        //【-1-* ==> -2-*】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/-\d+-[^-]+$/, "") + "-" + i, i);
                    } else if (mode === 14) {
                        //【/1/ ==> /2/】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\/\d+\/$/, "") + "/" + i + "/");
                    } else if (mode === 15) {
                        //【/index.html ==> /index_2.html】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\/(index(_\d+)?\.html)?$/, "") + "/index_" + i + ".html");
                    } else if (mode === 16) {
                        //【 ==> /2#list】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\/(index(_\d+)?\.html)?$/, "") + "/" + i + "#list");
                    } else if (mode === 17) {
                        //【.htm ==> _2.htm】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/(_\d+)?\.htm$/, "") + "_" + i + ".htm");
                    } else if (mode === 18) {
                        //【/ ==> /page/2/】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/\/(page\/\d+\/)?$/, "") + "/page/" + i + "/");
                    } else if (mode === 19) {
                        //【-1 ==> -2】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/-\d+$/, "") + "-" + i);
                    } else if (mode === 20) {
                        //【 ==> -p-2】  第一頁 ==> 第二頁
                        await html(siteUrl.replace(/-p-\d+$/, "") + "-p-" + i);
                    }
                }
            }
            debug("\nfun.getImgiframe() 聚集的所有IMG", imgsArray);
            return imgsArray;
        },
        getImgA: async (img, link, one = 0, rText = [null, null], showMsg = 1) => { //從指定的所有鏈接抓圖片
            if (showMsg == 1) fun.show("獲取圖片元素中...", 0);
            let links, linksNum;
            if (typeof link == "function") {
                links = await link();
                linksNum = links.length;
            } else if (typeof link == "object") {
                links = link;
                linksNum = links.length;
            } else if (typeof link == "string") {
                links = [...fun.gae(link)];
                linksNum = parseInt(links.length) + 1;
            } else {
                debug("\nfun.getImgA() link參數錯誤");
                return;
            }
            debug("\nfun.getImgA() links", links);
            let imgsArray = [];
            let fetchNum = 0;
            const html = url => fetch(url).then(res => res.arrayBuffer()).then(buffer => {
                if (showMsg == 1) fun.show(`獲取圖片中${fetchNum+=1}/${linksNum}`, 0);
                const decoder = new TextDecoder(document.characterSet || document.charset || document.inputEncoding);
                const htmlText = decoder.decode(buffer);
                return htmlText;
            }).catch(error => {
                debug(`\nfun.getImg fetch()出錯:\n${decodeURI(url)}`, error);
            });
            const resArr = [];
            if (typeof link != "object") resArr.push(html(siteUrl));
            for (let i = 0; i < links.length; i++) {
                if (one == 0) {
                    if (links[i].tagName == "A") {
                        resArr.push(html(links[i].href))
                    } else if (/^http/.test(links[i])) {
                        resArr.push(html(links[i]))
                    }
                } else if (one == 1 || one == 3) {
                    let res;
                    if (links[i].tagName == "A") {
                        res = await html(links[i].href);
                    } else if (/^http/.test(links[i])) {
                        res = await html(links[i]);
                    }
                    resArr.push(res);
                    if (one == 1) {
                        let doc = fun.doc(res);
                        debug(`\nfun.getImgA()單線程模式 DOM\n${links[i].href}`, doc);
                        if (!fun.ge(img, doc) && location.host == "www.nlegs.com") {
                            fun.show("人機驗證?按F5", 0);
                            //fun.ge(link).click();
                            return;
                        }
                        let imgs = [...fun.gae(img, doc)];
                        let _img = "";
                        for (let p = 0; p < imgs.length; p++) {
                            let imgSrc;
                            let check = fun.checkImgSrc(imgs[p], rText);
                            if (check.ok) {
                                imgSrc = check.src;
                                /*
                                let blob = await GMGetData(imgSrc);
                                let objectURL = await URL.createObjectURL(blob.blob);
                                imgSrc = objectURL;
                                */
                                debug("\nfun.getImgA() 單線程模式imgSrc", imgSrc);
                            } else {
                                debug("\nfun.getImgA() 單線程模式出錯", imgs[p]);
                                continue;
                            }
                            _img += `<img class="CustomPictureDownloadImage" src="${imgSrc}">`;
                        }
                        links[i].outerHTML = _img;
                    }
                }
            }
            await Promise.all(resArr).then(htmls => {
                fun.hide();
                for (let i = 0; i < htmls.length; i++) {
                    let doc = fun.doc(htmls[i]);
                    if (one != 1) debug(`\nfun.getImgA() DOM${i}`, doc);
                    let imgs = [...fun.gae(img, doc)];
                    for (let p = 0; p < imgs.length; p++) {
                        let check = fun.checkImgSrc(imgs[p], rText);
                        if (check.ok) {
                            imgsArray.push(check.src);
                        } else {
                            debug("\nfun.getImgA() PromiseAll出錯", imgs[p]);
                            continue;
                        }
                    }
                }
            });
            if (fun.ge('.CustomPictureDownloadImage')) return [...fun.gae('.CustomPictureDownloadImage')];
            debug("\nfun.getImgA 聚集的所有IMG", imgsArray);
            return imgsArray;
        },
        checkImgSrc: (ele, rText = [null, null]) => {
            let imgSrc;
            let check = fun.checkDataset(ele);
            if (ele.tagName == "IMG" && check.ok || ele.tagName == "DIV" && check.ok || ele.tagName == "A" && check.ok) {
                imgSrc = check.src;
                if (/^\/\//.test(imgSrc)) imgSrc = location.protocol + imgSrc;
                if (/^\/\w+/.test(imgSrc)) imgSrc = location.origin + imgSrc;
                if (!/^(http|blob)/.test(imgSrc) && /^\w+/.test(imgSrc)) imgSrc = location.origin + "/" + imgSrc;
                if (rText[0]) imgSrc = imgSrc.replace(rText[0], rText[1]);
                return {
                    ok: true,
                    src: imgSrc
                };
            } else if (ele.tagName == "IMG" || ele.tagName == "AMP-IMG") {
                if (ele.tagName == "IMG") imgSrc = ele.src;
                if (ele.tagName == "AMP-IMG") imgSrc = ele.getAttribute('src');
                if (/^\/\//.test(imgSrc)) imgSrc = location.protocol + imgSrc;
                if (rText[0]) imgSrc = imgSrc.replace(rText[0], rText[1]);
                return {
                    ok: true,
                    src: imgSrc
                };
            } else if (ele.tagName == "A") {
                imgSrc = ele.href;
                if (rText[0]) imgSrc = imgSrc.replace(rText[0], rText[1]);
                return {
                    ok: true,
                    src: imgSrc
                };
            } else if (/^(http|blob|\/\/)/.test(ele)) {
                imgSrc = ele;
                if (/^\/\//.test(ele)) imgSrc = location.protocol + imgSrc;
                if (rText[0]) imgSrc = imgSrc.replace(rText[0], rText[1]);
                return {
                    ok: true,
                    src: imgSrc
                };
            }
            return {
                ok: false
            };
        },
        checkDataset: ele => {
            if (ele.tagName == "IMG" || ele.tagName == "DIV" || ele.tagName == "A") {
                const setArr = ["data-src", "data-original", "data-url", "data-thumb", "data-echo", "data-ecp", "data-lazyload-src", "data-lazy-src", "data-lazy", "lazysrc", "data-lazyload", "file", "zoomfile", "data-lbwps-srcsmall", "original", "mydatasrc", "ess-data"];
                for (let i = 0; i < setArr.length; i++) {
                    let imgSrc = ele.getAttribute(setArr[i]);
                    if (imgSrc) {
                        return {
                            ok: true,
                            src: imgSrc.trim()
                        };
                    }
                }
            }
            return {
                ok: false
            };
        },
        getNP: async (picsEle, nextLinkEle, lastEle = null, paginationEle = null, time = 0, dataset = null, mag = 1) => {
            //翻頁模式聚集所有圖片或是預覽縮圖然後fun.getImgA()
            //用在規則init，fun.getNP(picsEle, nextLinkEle, lastEle, paginationEle, time);
            if (fun.ge('.CustomPictureDownloadImage')) return;
            if (mag == 1) fun.show("獲取下一頁中...", 0);
            const getNextPagePics = async url => {
                await fetch(url).then(res => res.arrayBuffer()).then(buffer => {
                    const decoder = new TextDecoder(document.characterSet || document.charset || document.inputEncoding);
                    const htmlText = decoder.decode(buffer);
                    return htmlText;
                }).then(async htmlText => {
                    let doc = fun.doc(htmlText);
                    if (dataset) {
                        fun.gae(`img[${dataset}],a[${dataset}],div[${dataset}]`, doc).forEach(e => {
                            if (e.tagName == "IMG") {
                                e.src = e.getAttribute(dataset);
                            } else if (e.tagName == "A" || e.tagName == "DIV") {
                                let url = e.getAttribute(dataset);
                                e.style.backgroundImage = `url(${url})`;
                            }
                        });
                    }
                    debug(`\nfun.getNP() > getNextPagePics() DOM\n${decodeURI(url)}`, doc);
                    let eles = fun.gae(picsEle, doc);
                    let nextPage = fun.ge(nextLinkEle, doc);
                    let lastPage = null;
                    if (lastEle) lastPage = fun.ge(lastEle, doc);
                    let fragment = new DocumentFragment();
                    eles.forEach(ele => {
                        fragment.appendChild(ele.cloneNode(true));
                    });
                    let targetEle = [...fun.gae(picsEle)].pop();
                    targetEle.parentNode.insertBefore(fragment, targetEle.nextSibling);
                    if (paginationEle) {
                        fun.gae(paginationEle).forEach(ele => {
                            //debug("paginationEle", ele);
                            ele.innerHTML = fun.ge(paginationEle, doc).innerHTML;
                        });
                    }
                    if (lastPage) {
                        if (mag == 1) fun.show("獲取下一頁結束");
                        return;
                    }
                    if (nextPage) {
                        await fun.delay(time, 0);
                        let nextlink;
                        if (nextPage.dataset.url) {
                            if (!/^http/.test(nextPage.dataset.url)) return;
                            nextlink = nextPage.dataset.url;
                        } else {
                            try {
                                nextlink = nextPage.href;
                                let nh = nextPage.host;
                                let lh = location.host;
                                if (nh != lh) {
                                    nextlink = nextlink.replace(nh, lh);
                                }
                            } catch (e) {
                                nextlink = nextPage.getAttribute("href");
                            }
                        }
                        await getNextPagePics(nextlink);
                    } else {
                        if (mag == 1) fun.show("獲取下一頁結束");
                        return;
                    }
                });
            };
            let next = fun.ge(nextLinkEle);
            if (next) {
                await fun.delay(time, 0);
                let nextlink;
                if (next.dataset.url) {
                    if (!/^http/.test(next.dataset.url)) return;
                    nextlink = next.dataset.url;
                } else {
                    nextlink = next.href;
                    let nh = next.host;
                    let lh = location.host;
                    if (nh != lh) {
                        nextlink = nextlink.replace(nh, lh);
                    }
                }
                await getNextPagePics(nextlink);
            } else {
                if (mag == 1) fun.show("獲取下一頁結束");
                return;
            }
        },
        getEle: async (links, elements, targetEle, removeEles = null) => {
            if (fun.ge('.CustomPictureDownloadImage')) return;
            let resArr = [];
            let xhrNum = 0;
            fun.show("獲取元素中...", 0);
            for (let i in links) {
                let res = fun.xhr(links[i], "document").then(doc => {
                    fun.show(`獲取元素中${xhrNum+=1}/${links.length}`, 0);
                    debug(`fun.getEle()\n${decodeURI(links[i])}\n`, doc);
                    return [...fun.gae(elements, doc)];
                });
                resArr.push(res)
            }
            await Promise.all(resArr).then(arr => arr.flat()).then(eles => {
                fun.hide();
                let ele;
                let fragment = new DocumentFragment();
                eles.forEach(e => {
                    fragment.appendChild(e.cloneNode(true));
                });
                if (typeof targetEle == "object") {
                    ele = fun.ge(targetEle[0]);
                    if (targetEle[1] == 0) ele.appendChild(fragment);
                    else if (targetEle[1] == 1) ele.parentNode.insertBefore(fragment, ele);
                    else if (targetEle[1] == 2) ele.parentNode.insertBefore(fragment, ele.nextSibling);
                } else if (typeof targetEle == "string") {
                    ele = fun.ge(targetEle);
                    ele.innerHTML = "";
                    ele.appendChild(fragment);
                }
                if (removeEles) {
                    fun.remove(removeEles);
                }
            })
        },
        insertImg: (imgsArray, ele, mode = 1) => {
            let srcArr = [];
            for (let i = 0; i < imgsArray.length; i++) {
                let check = fun.checkImgSrc(imgsArray[i]);
                if (check.ok) {
                    srcArr.push(check.src);
                } else {
                    debug("\nfun.insertImg(imgsArray) 格式錯誤！", imgsArray[i]);
                    continue;
                }
            }
            let fragment = new DocumentFragment();
            for (let i = 0; i < srcArr.length; i++) {
                let img = new Image();
                img.className = "CustomPictureDownloadImage";
                if (mode == 2 || mode == 3) {
                    img.src = loading_bak;
                    img.dataset.src = srcArr[i];
                    if (siteData.referrerpolicy == 0) img.setAttribute("referrerpolicy", "no-referrer");
                    fun.imagesObserver.observe(img);
                } else {
                    img.src = srcArr[i];
                    if (siteData.referrerpolicy == 0) img.setAttribute("referrerpolicy", "no-referrer");
                    img.onerror = error => {
                        if (errorNum > 10) return;
                        errorNum += 1;
                        setTimeout(() => {
                            debug(`\nfun.insertImg()重新載入出錯的圖片：\n${error.target.src}`);
                            error.target.src = error.target.src;
                        }, 1000);
                    };
                }
                fragment.appendChild(img);
                if (i == srcArr.length - 1) {
                    let end = document.createElement('p');
                    end.id = "customPicDownloadEnd";
                    end.innerText = `聚圖數量：${srcArr.length}P`;
                    fragment.appendChild(end);
                }
            }
            const picPreload = async _srcArr => {
                const loadImg = async (src, index) => {
                    await new Promise(resolve => {
                        let temp = new Image();
                        temp.src = src;
                        temp.onload = () => {
                            resolve();
                            temp = null;
                        };
                        temp.onerror = error => {
                            if (errorNum > 10) return;
                            errorNum += 1;
                            resolve();
                            setTimeout(() => {
                                debug(`\n怠惰Lazyloading預讀重新載入出錯的圖片：\n${src}\n`, loadImg(src.replace("-scaled", ""), index));
                            }, 1000);
                            temp = null;
                        };
                    });
                };
                debug("\n怠惰圖片Lazyloading開始預讀");
                for (let src = 0; src < _srcArr.length; src++) {
                    await loadImg(_srcArr[src], src);
                    if (src == _srcArr.length - 1) debug("\n怠惰圖片Lazyloading預讀結束");
                }
            };
            if (srcArr.length > 0) {
                if (siteData.insertImg[1] == 2 || siteData.insertImg[1] == 3) {
                    picPreload(srcArr);
                }
                let thisEle;
                if (typeof ele == "object") {
                    thisEle = fun.ge(ele[0]);
                    if (ele[1] == 0) thisEle.appendChild(fragment);
                    else if (ele[1] == 1) thisEle.parentNode.insertBefore(fragment, thisEle);
                    else if (ele[1] == 2) thisEle.parentNode.insertBefore(fragment, thisEle.nextSibling);
                    if (typeof ele[2] != "undefined") {
                        fun.remove(ele[2]);
                    }
                    fun.show("已聚集所有圖片");
                    if (siteData.go == 1) goToNo1Img();
                } else if (typeof ele == "string") {
                    thisEle = fun.ge(ele);
                    thisEle.innerHTML = "";
                    thisEle.appendChild(fragment);
                    fun.show("已聚集所有圖片");
                } else {
                    fun.show("用來定位插入的元素不存在", 3000);
                    debug("\nfun.insertImg() ele參數錯誤，或用來定位插入的元素不存在。");
                    return;
                }
            } else {
                fun.show("沒有能插入的圖片", 3000);
            }
        },
        immediateInsertImg: async () => {
            let selector = siteData.imgs;
            //debug("\nfun.immediateInsertImg() selector\n", selector);
            await fun.delay(siteData.insertImg[2] || 200);
            let imgs;
            let imgSrcArray = [];
            if (fun.ge('.CustomPictureDownloadImage')) {
                imgs = [...fun.gae('.CustomPictureDownloadImage')];
            }
            if (typeof selector == "function") {
                imgs = await selector();
            } else if (/^js;/.test(selector)) {
                imgs = await new Function("siteData", "fun", '"use strict";' + selector.slice(3))(siteData, fun);
                debug("\nfun.immediateInsertImg() JSimgs：", imgs);
            } else {
                imgs = [...fun.gae(selector)];
                debug("\nfun.immediateInsertImg() selectorImgs：", imgs);
            }
            imgs = imgs.filter(item => item);
            if (imgs.length > 0) {
                for (let i = 0; i < imgs.length; i++) {
                    let check = fun.checkImgSrc(imgs[i]);
                    if (check.ok) {
                        imgSrcArray.push(check.src);
                    } else {
                        debug("\nfun.immediateInsertImg() imgsArray 格式錯誤！", imgs[i]);
                        continue;
                    }
                }
            } else {
                fun.show("沒有能插入的圖片", 3000);
                debug("\nfun.immediateInsertImg() 沒有圖片元素");
                return;
            }
            globalImgArray = imgSrcArray;
            fun.insertImg(globalImgArray, siteData.insertImg[0], siteData.insertImg[1]);
            imgSrcArray = null;
        },
        ge: (e, d) => {
            if (/^\//.test(e)) {
                return (d || document).evaluate(e, (d || document), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            } else {
                return (d || document).querySelector(e);
            }
        },
        gae: (e, d) => {
            if (/^\//.test(e)) {
                let nodes = [];
                let results = (d || document).evaluate(e, (d || document), null, XPathResult.ANY_TYPE, null);
                let node;
                while (node = results.iterateNext()) {
                    nodes.push(node);
                }
                return nodes;
            } else {
                return (d || document).querySelectorAll(e);
            }
        },
        geT: (ele, mode = 1) => {
            if (mode == 1) {
                return fun.ge(ele).innerText;
            } else if (mode == 2) {
                return fun.ge(ele).previousElementSibling.innerText;
            } else if (mode == 3) {
                return fun.ge(ele).previousElementSibling.previousElementSibling.innerText;
            }
        },
        attr: (ele, attr) => fun.ge(ele).getAttribute(attr),
        run: code => new Function("return " + code)(),
        doc: str => new DOMParser().parseFromString(str, 'text/html'),
        xml: str => new DOMParser().parseFromString(str, 'text/xml'),
        title: (str, mode = 0) => {
            let split = document.title.replace(/漫画|\s-\s(漫本|奇漫屋|漫画星球|6漫画)|\[\d+p(\d+v)?\]/gi, "").split(str);
            if (mode == 0) {
                try {
                    return document.title.replace(str, "").trim();
                } catch (error) {
                    debug("\nfun.title() ERROR", error);
                    return document.title;
                }
            } else if (mode == 1) {
                try {
                    return split[0].replace(/,$/g, "").replace(/,/g, " ").trim();
                } catch (error) {
                    debug("\nfun.title() ERROR", error);
                    return document.title;
                }
            } else if (mode == 2) {
                try {
                    return (split[0] + str + split[1]).replace(/,$/g, "").replace(/,/g, " ").trim();
                } catch (error) {
                    debug("\nfun.title() ERROR", error);
                    return document.title;
                }
            } else if (mode == 3) {
                try {
                    return (split[1] + str + split[0]).replace(/,$/g, "").replace(/,/g, " ").trim();
                } catch (error) {
                    debug("\nfun.title ERROR", error);
                    return document.title;
                }
            }
        },
        show: (text, time = 1000) => {
            let msg = fun.ge(".customPicDownloadMsg");
            if (fun.ge(".customPicDownloadMsg[style]")) {
                msg.removeAttribute('style');
            }
            msg.innerText = text;
            if (time > 0) {
                setTimeout(() => {
                    fun.hide();
                }, time);
            }
        },
        hide: () => {
            if (!fun.ge(".customPicDownloadMsg[style]")) {
                let msg = fun.ge(".customPicDownloadMsg");
                msg.innerText = "none";
                msg.style = "display:none";
            }
        },
        imagesObserver: new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    let realSrc = entry.target.dataset.src,
                        nE = entry.target.nextElementSibling;
                    if (realSrc) {
                        entry.target.src = realSrc;
                        entry.target.onerror = (error) => {
                            if (errorNum > 10) return;
                            errorNum += 1;
                            error.target.dataset.src = error.target.dataset.src.replace("-scaled", "");
                            error.target.src = loading_bak;
                            setTimeout(() => {
                                debug(`\nimagesObserver重新載入出錯圖片：\n${realSrc}`);
                                error.target.src = realSrc.replace("-scaled", "");
                            }, 1000);
                        };
                    }
                    if (nE && nE.tagName == 'IMG' && nE.dataset.src) {
                        nE.src = nE.dataset.src;
                    }
                }
            });
        }),
        addCustomPicDownloadMsg: () => {
            let div = document.createElement("div");
            div.className = "customPicDownloadMsg";
            div.style = "display:none";
            div.innerText = "none";
            document.body.appendChild(div);
        },
        css: css => {
            let style = document.createElement("style");
            style.type = "text/css";
            style.className = "CustomPictureDownloadStyle";
            style.innerHTML = css;
            document.head.appendChild(style);
        },
        script: (code, src = 0) => {
            let script = document.createElement("script");
            if (src == 0) {
                script.id = "CustomPictureDownloadScript";
                script.type = "text/javascript";
                script.innerHTML = code;
            } else if (src == 1) {
                //script.src = "https://code.jquery.com/jquery-3.6.4.js";
                script.src = "https://code.jquery.com/jquery-3.6.4.min.js";
            } else if (src == 2) {
                script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
            }
            document.body.appendChild(script);
        },
        delay: async (time, msg = 1) => {
            if (time > 200 && msg == 1) fun.show(`延遲${time}毫秒...`, time);
            await new Promise(resolve => {
                setTimeout(resolve, time);
            });
        },
        waitEle: async (ele, max = 200, doc = document) => {
            let loopNum = 0;
            return await new Promise(resolve => {
                let loop = setInterval(() => {
                    loopNum += 1;
                    if (!!fun.ge(ele, doc) === true) {
                        clearInterval(loop);
                        resolve(true);
                    }
                    if (loopNum >= max) {
                        clearInterval(loop);
                        debug(`fun.waitEle()達循環上限，沒有出現"${ele}"元素。`);
                        resolve(false);
                    }
                }, 100);
            });
        },
        xhr: (url, type = "text", referer = location.href) => {
            return new Promise((resolve, reject) => {
                _GM_xmlhttpRequest({
                    method: "GET",
                    url: url,
                    responseType: type,
                    headers: {
                        "Referer": referer,
                        "User-Agent": navigator.userAgent
                    },
                    onload: data => {
                        resolve(data.response);
                    },
                    onerror: error => {
                        reject(error);
                    }
                });
            });
        },
        remove: (ele, time = 0) => {
            setTimeout(() => {
                fun.gae(ele).forEach(e => {
                    e.remove()
                });
            }, time)
        },
        addNextHtml: (url, ele, pos, text = "點選進入下一話") => {
            let _pos;
            switch (pos) {
                case 0:
                    _pos = "beforebegin"; //在元素之前。
                    break;
                case 1:
                    _pos = "afterend"; //在元素之後。
                    break;
                case 2:
                    _pos = "beforeend"; //在 元素裡面，最後一個子元素之後。
                    break;
                case 3:
                    _pos = "afterbegin"; //在元素裡面，第一個子元素之前。
                    break;
            }
            let html = `<div style="padding: 36px 0; text-align: center;"><a href="${url}"style="font-size: 26px;line-height: 50px;height: 50px;text-align: center;">${text}</a></div>`;
            fun.ge(ele).insertAdjacentHTML(_pos, html);
        }
    };

    const debug = (str, obj = "", title = "debug") => {
        console.log(
            `%c[Custom Picture Download] ${title}:`,
            "background-color: #C9FFC9;",
            str, obj
        );
    };

    let promiseBlobArray = [];
    let downloadNum = 0;

    const ge = css => document.querySelector(css);
    const gae = css => document.querySelectorAll(css);
    const gx = xpath => document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    const gax = xpath => {
        let nodes = [];
        let results = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
        let node;
        while (node = results.iterateNext()) {
            nodes.push(node);
        }
        return nodes;
    };

    const getNum = i => {
        let n = parseInt(i) + 1;
        let picNum = String(n).padStart(4, "0");
        return picNum;
    };

    const showMsg = (text, time = 1000) => {
        ge(".customPicDownloadMsg").removeAttribute("style");
        ge(".customPicDownloadMsg").innerText = text;
        setTimeout(() => {
            ge(".customPicDownloadMsg").innerText = "none";
            ge(".customPicDownloadMsg").style = "display:none";
        }, time);
    };

    const getDataMsg = (text, picNum, imgsNum) => {
        if (picNum != "none") {
            fun.show(`第${downloadNum += 1}/${imgsNum}張下載${text}`, 0);
        }
    };

    const getReferer = srcUrl => {
        let referer;
        if (siteData.referer == "src") {
            referer = srcUrl;
        } else if (typeof siteData.referer == "string" || siteData.referer === "") {
            referer = siteData.referer;
        } else {
            referer = location.href;
        }
        return referer
    };

    const fetchData = (srcUrl, picNum = "none", imgsNum = "none") => {
        return fetch(srcUrl, {
            referrer: getReferer(srcUrl)
        }).then(res => res.blob()).then(blob => {
            getDataMsg("完成", picNum, imgsNum);
            return {
                blob: blob,
                picNum: picNum
            };
        });
    };

    const GMGetData = (srcUrl, picNum = "none", imgsNum = "none") => {
        return new Promise(resolve => {
            _GM_xmlhttpRequest({
                method: "GET",
                url: srcUrl,
                responseType: "blob",
                headers: {
                    origin: location.origin,
                    referer: getReferer(srcUrl),
                    accept: "*/*"
                },
                onload: data => {
                    let blob = data.response;
                    if (blob.type == "application/octet-stream" || blob.type == "binary/octet-stream") {
                        resolve({
                            blob: blob,
                            picNum: picNum
                        });
                        getDataMsg("完成", picNum, imgsNum);
                    } else if (/^image/.test(blob.type)) {
                        resolve({
                            blob: blob,
                            picNum: picNum
                        });
                        getDataMsg("完成", picNum, imgsNum);
                    } else {
                        resolve({
                            error: "下載錯誤",
                            picNum: picNum,
                            src: srcUrl
                        });
                        getDataMsg("錯誤", picNum, imgsNum);
                    }
                },
                onerror: error => {
                    resolve({
                        error: "下載錯誤",
                        picNum: picNum,
                        src: srcUrl
                    });
                    getDataMsg("錯誤", picNum, imgsNum);
                }
            });
        });
    };

    const saveData = (blob, fileName) => {
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => {
            URL.revokeObjectURL(blob);
        }, 1000);
    };

    const getImgs = async selector => {
        let imgs;
        if (ge(".CustomPictureDownloadImage")) {
            imgs = [...gae(".CustomPictureDownloadImage")];
        } else if (typeof selector == "function") {
            imgs = await selector();
        } else if (!selector || selector === "") {
            showMsg("已取消");
            return;
        } else if (selector.length < 3) {
            showMsg("字數小於3已取消");
            return;
        } else if (/^js;/.test(selector)) {
            imgs = await new Function("siteData", "fun", '"use strict";' + selector.slice(3))(siteData, fun);
            debug("\ngetImgs(selector) JSimgs：", imgs);
        } else if (/^\//.test(selector)) {
            imgs = [...gax(selector)];
        } else {
            imgs = [...gae(selector)];
        }
        imgs = imgs.filter(item => item); //去除空、無用
        return imgs;
    };

    const imgZipDownload = async () => {
        if (downloading) {
            alert("下載&壓縮中請稍後再操作！");
            return;
        }
        let selector, titleText;
        if (!siteData.autoDownload || siteData.autoDownload && siteData.autoDownload[0] != 1 && options.autoDownload != 1) {
            if (typeof siteData.imgs == "function") {
                selector = siteData.imgs;
            } else {
                selector = await prompt("請輸入自訂CSS/Xpath選擇器：\n範例：img#TheImg OR //img[@id='TheImg']\n也能使用JS代碼自己生成的IMG元素陣列\n範例：js;return [...document.images];", options.default);
            }
            titleText = await prompt("請輸入自訂壓縮檔資料夾名稱", (customTitle || document.title.replace(/\[\d+p(\d+v)?\]|【\d+P】/i, "").trim()));
        } else if (siteData.autoDownload) {
            if (siteData.autoDownload[0] == 1 || options.autoDownload == 1) {
                selector = siteData.imgs;
                titleText = (customTitle || document.title.replace(/\[\d+p(\d+v)?\]|【\d+P】/i, "").trim());
            } else {
                debug("未開啟自動下載");
                return;
            }
        }
        let imgs = await getImgs(selector);
        globalImgArray = imgs;
        downloading = true;

        if (imgs.length > 0 && titleText != null && titleText != "") {
            debug("\nimgZipDownload()：", imgs);
            const imgsNum = imgs.length;
            let title = titleText;
            const zip = new JSZip();
            const zipFolder = zip.folder(`${title} [${imgsNum}P]`);
            fun.show("0101010101...", 0);

            for (let i = 0; i < imgs.length; i++) {
                let n = parseInt(i) + 1;
                let picNum = getNum(i);
                let promiseBlob;
                let imgSrc;
                let check = fun.checkImgSrc(imgs[i]);
                if (check.ok) {
                    imgSrc = check.src;
                } else {
                    debug("\nimgZipDownload() imgs 格式錯誤！", imgs[i]);
                    continue;
                }
                if (options.one == 1 || siteData.one == 1) {
                    if (siteData.fetch == 1) {
                        promiseBlob = await fetchData(imgSrc, picNum, imgsNum);
                    } else {
                        promiseBlob = await GMGetData(imgSrc, picNum, imgsNum);
                    }
                } else {
                    if (siteData.fetch == 1) {
                        promiseBlob = fetchData(imgSrc, picNum, imgsNum);
                    } else {
                        promiseBlob = GMGetData(imgSrc, picNum, imgsNum);
                    }
                }
                promiseBlobArray.push(promiseBlob);
            }

            debug("\nPromiseBlobArray：", promiseBlobArray);

            Promise.all(promiseBlobArray).then(async data => {
                debug("\nPromiseAllData：", data);
                let blobDataArray = data.filter(item => item.blob); //成功下載
                let errorDataArray = data.filter(item => item.error); //下載錯誤
                debug("\nNewDataArray：", blobDataArray);
                debug("\nErrorDataArray：", errorDataArray);
                if (errorDataArray.length > 0) {
                    downloadNum = 0;
                    downloading = false;
                    fun.show(`下載失敗了${errorDataArray.length}張不壓縮`, 3000);
                    setTimeout(() => {
                        fun.show("建議F5後重新下載", 0);
                    }, 3100);
                    return;
                }
                if (blobDataArray.length > 0) {
                    for (let i = 0; i < blobDataArray.length; i++) {
                        let n = parseInt(i) + 1;
                        let ex;
                        let type = blobDataArray[i].blob.type;
                        try {
                            if (type == "application/octet-stream") {
                                ex = "webp";
                            } else if (type == "binary/octet-stream") {
                                ex = "jpg";
                            } else {
                                ex = type.split("/")[1].match(/\w+/)[0];
                            }
                        } catch (e) {
                            if (/^image/.test(type)) {
                                ex = "jpg";
                            } else {
                                debug("\nimgZipDownload() PromiseAll blob資料格式錯誤", blobDataArray);
                                fun.show("圖片extension錯誤", 0);
                                return;
                            }
                        }
                        let fileName = `${blobDataArray[i].picNum}P.${ex}`;
                        if (options.zip) {
                            //console.log(`第${n}/${blobDataArray.length}張，檔案名：${fileName}，大小：${parseInt(blobDataArray[i].blob.size / 1024)} Kb`);
                            zipFolder.file(fileName, blobDataArray[i].blob, {
                                binary: true
                            });
                        } else {
                            saveData(blobDataArray[i].blob, title + "_" + fileName);
                            await fun.delay(100, 0);
                            if (i === blobDataArray.length - 1) {
                                promiseBlobArray = [];
                                downloadNum = 0;
                                downloading = false;
                                fun.hide();
                            }
                        }
                    }
                    if (options.zip) {
                        zip.generateAsync({
                            type: "blob"
                        }, (metadata) => {
                            fun.show("壓縮進度: " + metadata.percent.toFixed(2) + " %", 0);
                        }).then(async data => {
                            debug("\nZIP壓縮檔數據：", data);
                            saveData(data, `${title} [${imgsNum}P].zip`);
                            promiseBlobArray = [];
                            downloadNum = 0;
                            downloading = false;
                            fun.hide();
                            let autoDownload = siteData.autoDownload;
                            let next = siteData.next;
                            if (next && autoDownload) {
                                let ele;
                                if (typeof next === "function") {
                                    ele = await next();
                                } else {
                                    ele = fun.ge(next);
                                }
                                if (ele && siteData.autoDownload[0] == 1 || ele && options.autoDownload == 1) {
                                    let max = siteData.autoDownload[1] || options.autoDownloadCountdown;
                                    let countdownNum = max;
                                    fun.show(`自動下載倒數${max}秒`, 0);
                                    for (let i = 1; i < max; i++) {
                                        setTimeout(() => {
                                            fun.show(`自動下載倒數${countdownNum-=1}秒`, 0);
                                        }, i * 1000);
                                    }
                                    setTimeout(() => {
                                        if (typeof next === "function") {
                                            fun.show("nextJS前往下一頁");
                                            location.href = ele;
                                        } else {
                                            ele.click();
                                            fun.show("已點擊下一頁");
                                        }
                                    }, max * 1000);
                                } else if (!ele && siteData.autoDownload[0] == 1 || !ele && options.autoDownload == 1) {
                                    fun.show("自動下載完畢", 0);
                                }
                            }
                        });
                    }
                } else {
                    promiseBlobArray = [];
                    downloadNum = 0;
                    downloading = false;
                    showMsg("下載失敗數據為空...");
                }
            });
        } else {
            showMsg("已取消");
        }
    };

    const copyImgSrcText = async () => {
        if (downloading) {
            alert("下載&壓縮中請稍後再操作！");
            return;
        }
        let selector;
        if (typeof siteData.imgs == "function") {
            selector = siteData.imgs;
        } else {
            selector = await prompt("請輸入自訂CSS/Xpath選擇器：\n範例：img#TheImg OR //img[@id='TheImg']\n也能使用JS代碼自己生成的IMG元素陣列\n範例：js;return [...document.images];", options.default);
        }
        let imgs = await getImgs(selector);
        let imgSrcArray = [];
        if (siteData.insertImg) {
            debug("\n右鍵 insertImg()：", imgs);
        } else {
            debug("\nCopyImgSrcText()：", imgs);
        }
        if (imgs.length > 0) {
            for (let i = 0; i < imgs.length; i++) {
                let imgSrc;
                let check = fun.checkImgSrc(imgs[i]);
                if (check.ok) {
                    imgSrc = check.src;
                } else {
                    debug(`\ncopyImgSrcText() imgs[${i}] 格式錯誤！`, imgs[i]);
                    continue;
                }
                imgSrcArray.push(imgSrc);
            }
        } else {
            showMsg("沒有任何圖片元素...");
            return;
        }
        globalImgArray = imgSrcArray;
        if (!fun.ge(".CustomPictureDownloadImage") && siteData.insertImg) {
            fun.insertImg(globalImgArray, siteData.insertImg[0], siteData.insertImg[1]);
            showMsg("已聚集全部圖片");
            return;
        }
        imgSrcArray.push(customTitle || document.title);
        debug("\ncopyImgSrcText() imgSrcArray：", imgSrcArray);
        let str = imgSrcArray.join("\n");
        console.log(str);
        copyToClipboard(str);
        showMsg(`圖片網址已複製(${imgs.length})`);
        imgSrcArray = null;
    };

    const copyToClipboard = text => {
        if (navigator.clipboard && window.isSecureContext) {
            return navigator.clipboard.writeText(text);
        } else {
            let textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position = "absolute";
            textArea.style.opacity = 0;
            textArea.style.left = "-999999px";
            textArea.style.top = "-999999px";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                document.execCommand("copy") ? res() : rej();
                textArea.remove();
            });
        }
    };

    const oneSwitch = () => {
        if (options.one == 1) {
            options.one = 0;
            showMsg("啟用多線程");
        } else {
            options.one = 1;
            showMsg("啟用單線程");
        }
    };

    const goToNo1Img = (time = 1000) => {
        let img = ge(".CustomPictureDownloadImage");
        if (img) {
            if (time != 0) showMsg("即將進行捲動...");
            setTimeout(() => {
                img.scrollIntoView({
                    behavior: "smooth"
                });
            }, time);
        }
    };

    const addCustomPicDownloadButton = () => {
        let img = new Image();
        img.id = "customPicDownload";
        img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAACFlBMVEVEREAAAABEREBEREBUXnFTXXBTXG5VXXJUXHFUW28grV0grV0hrl4hrV0hq10iql0oomAhrV2BiZiAiJd/h5V+h5Uiq16OlaKNlKGMk5+Mkp+KkZ89p28nq2Hp9+/n9u3t8PHs7/Dg9Ojp7O3d8+bo7O3o6+zn6+3m6uzl6evX8OLV8OHi5ujh5efO7dze4uTe4ePb3+LY3eDX29/W2t7T19u35Mu25Mr01lqw4sbz1Vmv4sXA1NWs4cPw0lnv0lmp4MCk3r3ozVuh3buu0M6vz83kylugysefycadx8OexsOdxsOF0qZ6zp5pyJK1p2S0pmOsoGRWv4SLlKEmuZpBsnc5t3AmuJmQi2ont5kmtpcptJiOiWg0tWwytGorr5Yqr5YsrpUws2kqrJRNmpMusmcsqpIuqJMssWkqsWQqsGUnsGUzoI8lsGGAf2wkr2Ekr2BzfI0irl8hrl5ye4x9fGogrWAhrV03mIwgrF9xeoshq10gql8dp2ccp2cdpmkcnIUanIYcm4QRoIUTnoURn4QdmYM/h4QcmIMSnYMXmoMWmoIbloIclYJDgYIYl4EaloAek4IfkYFqbm0jjoBqbW0ni4ApiX9Hd35kanBjaXBhaG9MbnpOanhOaXhPaHdDbXZHanZGanRLZnZJZ3RSYnVMZXRPY3ROY3VSYXRQYnRTYHRVX3NUX3RSYHNUXnNTXXJTXXFME6frAAAAHnRSTlMAAAUGZ2dqeHh7lrzNzc7O3O/09PT19fn5+fn5/f4hZOrvAAAB1UlEQVR42oWTzYoTQRSFv6q6RqOoqBicTTCKK1cOURBGBV9AXCgu9Vl8FF/ApcshI4qKgrtBByZK0HSGmMxkMrF/qq6LTjptErGX5zu3uu65dY3TYCh9ag2UNPsfjnmpZW4MgBbaIy/6PCnxvL7gEQhJ7AruAqifcZ96EHDX67ngKgCJn/k3B6AC1O9Cj9ri/2mBsZIf9iLi0rMFDhhjbO6NsL9er+CQG3pYMT+XuGVmuH9SzPF7S/UONDfUHl44/6A24wfdpMgsSO6tP52ffxjF6cUT056MBdxf/cVRzP6PiQG8KhZMJedhewik0QT43RsBQUEwLufZx53Td85p7wCwEu+Fs6qAGBsA1aO3XUZbG/EAsAJJlM/MGgOoDltdYNTam3JIOlVmOaj2N/sAjHf9lGdBqwACmmi0FU/TOWxfEY483o/9tcuvJBXU+90PaZHf5NtVFzTL+N7bqD4GS9DRmzl3btJWk2WFIKradqX8LfudU3VKBuKd0vwc+HCjNDJhkJXfB6jq+wZJBSAT5MmKN1/la7sJ+jmsiyQrdkZo9N819FNnXcSZFTt1rGnXhl/G6a26IP/YOXczi5prQmFY3snbkzNSXGyBV+28p+nNF+vn2h97PvHD5SOHkgAAAABJRU5ErkJggg==";
        img.setAttribute("title", "左鍵：進行下載打包壓縮\n中鍵：捲動至第一張大圖\n右鍵：複製圖片網址和標題或聚集所有圖片");
        img.oncontextmenu = () => false;
        img.addEventListener("click", () => {
            imgZipDownload();
        });
        img.addEventListener("mousedown", (event) => {
            if (event.button == 1) {
                event.preventDefault();
                //oneSwitch();
                goToNo1Img(0);
            }
            if (event.button == 2) {
                copyImgSrcText();
            }
        });
        document.body.appendChild(img);
    };


    const hasTouchEvents = () => {
        if (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
            return true;
        }
        return false;
    };

    const elementClick = ele => {
        let dispatchTouchEvent = (_ele, type) => {
            let touchEvent = document.createEvent("UIEvent");
            touchEvent.initUIEvent(type, true, true);
            touchEvent.touches = [{
                clientX: 1,
                clientY: 1
            }];
            _ele.dispatchEvent(touchEvent);
        };
        if (hasTouchEvents()) {
            dispatchTouchEvent(ele, "touchstart");
            dispatchTouchEvent(ele, "touchend");
        }
        ele.click();
    };

    const addReturnTopButton = () => {
        let a = document.createElement('a');
        a.href = 'javascript:void(0);';
        a.setAttribute('onclick', "window.scrollTo({top:0,behavior:'smooth'});");
        let img = new Image();
        img.src = 'data:image/png;base64,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';
        img.className = 'CustomPictureDownloadImageReturnTop';
        a.appendChild(img);
        document.body.appendChild(a);
    };

    const nsfw1Data = customData.filter(item => item.category == "nsfw1"); //列出寫真站
    const nsfw2Data = customData.filter(item => item.category == "nsfw2"); //列出老司機站
    const comicData = customData.filter(item => item.category == "comic"); //列出普漫站
    const hcomicData = customData.filter(item => item.category == "hcomic"); //列出H漫站
    const noneData = customData.filter(item => item.category == "none"); //列出未分類

    const style = `
.CustomPictureDownloadImageReturnTop {
    position: fixed;
    right: 10px;
    bottom: 80px;
    width: 53px;
    z-index: 99;
    opacity: 0.5;
}
#customPicDownload {
    width: 32px!important;
    height: 32px!important;
    position: fixed!important;
    bottom: 20px!important;
    left: 20px!important;
    z-index:2147483647!important;
    opacity: 0.8!important;
    display: block!important;
}
.customPicDownloadMsg {
    font-family: Arial,sans-serif!important;
    font-size: 26px;
    font-weight: bold;
    text-align: center;
    line-height: 50px;
    color: #ffffff;
    width: 280px;
    height: 50px;
    top: 30%;
    left: 50%;
    margin-left: -140px;
    padding: 0px!important;
    background-color: #000;
    border: 1px solid #303030;
    border-radius: 10px;
    position: fixed;
    z-index:2147483647;
    opacity: 0.7;
}
.CustomPictureDownloadImage {
    width: auto;
    height: auto;
    max-width: 100%;
    display: block!important;
    opacity: 1 !important;
    border:none!important;
    border-radius: unset!important;
    padding:0!important;
    margin: 0 auto!important;
}
.CustomPictureDownloadImage[src*="i.imgur.com"] {
    min-height: 400px!important;
}
#customPicDownloadEnd {
    font-size: 20px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 5px auto!important;
}
#customPicDownloadEnd~*:not(.link-d):not(#myrating):not(.gallery-a):not(.pagination):not(div[class^=picnext]) {
    display: none!important;
}
.customPicDownloadLoading {
    font-size: 20px;
	text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 5px auto!important;
    border: none!important;
}
#customPicDownload~*:not([id^='pv-']):not([class^='pv-']):not(.pagetual_tipsWords) {
    display:none!important;
}
    `;

    for (let i = 0; i < customData.length; i++) {
        if (customData[i].reg.test(siteUrl)) {
            let delay = customData[i].delay;
            if (delay) {
                await fun.delay(delay, 0);
            }
            options.enable = 1;
            if (customData[i].enable == 0) {
                if (options.comic == 1 && customData[i].category === "comic") {
                    debug("漫畫類全局開啟")
                } else {
                    options.enable = 0;
                    debug("\n此規則禁用", customData[i]);
                    continue;
                }
            }
            let include = customData[i].include;
            if (include) {
                if (!fun.ge(include)) {
                    options.enable = 0;
                    debug("\n頁面沒有包含必須元素", customData[i]);
                    continue;
                }
            }
            let exclude = customData[i].exclude;
            if (exclude) {
                if (fun.ge(exclude)) {
                    options.enable = 0;
                    debug("\n頁面包含排除元素", customData[i]);
                    continue;
                }
            }
            siteData = customData[i];
            if (!ge(".customPicDownloadMsg")) fun.addCustomPicDownloadMsg();
            if (!ge(".CustomPictureDownloadStyle")) fun.css(style);
            if (customData[i].imgs) {
                options.default = customData[i].imgs;
                debug(`\nCSS/Xpath/JS選擇器：${options.default}`);
            }
            if (customData[i].one) {
                options.one = customData[i].one;
                debug("\n單線程下載");
            }
            let css = customData[i].css;
            if (css) {
                fun.css(css);
            }
            let initCode = customData[i].init;
            if (initCode) {
                if (typeof initCode == "string") {
                    await new Function("siteData", "fun", '"use strict";' + initCode)(siteData, fun);
                } else if (typeof initCode == "function") {
                    await initCode();
                }
            }
            let titleCode = customData[i].customTitle;
            if (titleCode) {
                if (typeof titleCode == "string") {
                    customTitle = await new Function("siteData", "fun", '"use strict";' + titleCode)(siteData, fun);
                } else if (typeof titleCode == "function") {
                    customTitle = await titleCode();
                }
                debug(`\n自定義標題：${customTitle}`);
            }
            let next = customData[i].next;
            if (next) {
                let link;
                if (typeof next === "function") {
                    link = await next();
                } else if (typeof next === "string") {
                    link = fun.ge(next);
                }
                debug("\n怠惰NEXT\n", link);
                const callback = () => {
                    if (typeof next === "function") {
                        fun.show("nextJS前往下一頁", 0);
                        if (/^http/.test(link)) {
                            location.href = link;
                        } else {
                            fun.show("沒有下一頁元素");
                        }
                    } else if (typeof next === "string") {
                        if (link) {
                            link.click();
                            fun.show("已點擊下一頁");
                        } else {
                            fun.show("沒有下一頁元素");
                        }
                    }
                };
                if (hasTouchEvents() && options.doubleTouchNext) {
                    document.addEventListener("dblclick", () => {
                        callback();
                    });
                }
                document.addEventListener("keydown", (event) => {
                    let key = window.event ? event.keyCode : event.which;
                    if (key == 39) {
                        callback();
                    }
                });
            }
            let prev = customData[i].prev;
            if (typeof prev == "string" && prev != 1) {
                document.addEventListener("keydown", (event) => {
                    let key = window.event ? event.keyCode : event.which;
                    if (key == 37) {
                        event.preventDefault();
                        let ele = fun.ge(prev);
                        if (ele) {
                            ele.click();
                            fun.show("已點擊上一頁");
                        } else {
                            fun.show("沒有上一頁元素");
                        }
                    }
                });
            } else if (prev == 1) {
                document.addEventListener("keydown", (event) => {
                    let key = window.event ? event.keyCode : event.which;
                    if (key == 37) {
                        event.preventDefault();
                        fun.show("返回上一頁");
                        history.back();
                    }
                });
            }
            let autoClick = customData[i].autoClick;
            if (autoClick) {
                if (typeof autoClick == "object") {
                    setTimeout(() => {
                        let ele = fun.ge(autoClick[0]);
                        if (ele) elementClick(ele);
                    }, autoClick[1] || 1000);
                } else if (typeof autoClick == "string") {
                    let ele = fun.ge(autoClick);
                    if (ele) elementClick(ele);
                }
            }
            let observerClick = customData[i].observerClick;
            if (observerClick) {
                let ele = fun.ge(observerClick);
                if (ele) {
                    const observer = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                observer.unobserve(entry.target);
                                elementClick(entry.target);
                                debug(`怠惰聚圖observerClick("${observerClick}")`);
                                setTimeout(async () => {
                                    if (await fun.waitEle(observerClick, 30)) {
                                        observer.observe(fun.ge(observerClick));
                                    }
                                }, 1000);
                            }
                        });
                    });
                    setTimeout(() => {
                        observer.observe(ele);
                    }, 1000)
                }
            }
            let loadMore = customData[i].loadMore;
            if (loadMore) {
                const callback = () => {
                    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 200) {
                        document.removeEventListener("scroll", callback);
                        let ele = fun.ge(loadMore);
                        if (ele) {
                            elementClick(ele);
                            debug(`怠惰聚圖loadMore("${loadMore}")`);
                        }
                        setTimeout(async () => {
                            if (await fun.waitEle(loadMore, 30)) {
                                document.addEventListener("scroll", callback);
                            }
                        }, 1000);
                    };
                };
                document.addEventListener("scroll", callback);
            }
            let openInNewTab = customData[i].openInNewTab;
            if (openInNewTab) {
                const _openInNewTab = () => fun.gae(openInNewTab).forEach(a => {
                    a.setAttribute("target", "_blank");
                });
                _openInNewTab();
                new MutationObserver(() => {
                    _openInNewTab();
                }).observe(document.body, {
                    childList: true,
                    subtree: true
                });
            }
            let autoDownload = siteData.autoDownload;
            if (autoDownload) {
                if (autoDownload[0] == 1 || options.autoDownload == 1) imgZipDownload();
            }
            let insertImg = customData[i].insertImg;
            if (insertImg) {
                if (autoDownload) {
                    if (autoDownload[0] == 1 || options.autoDownload == 1) break;
                }
                if (insertImg[1] == 1 || insertImg[1] == 2) {
                    fun.immediateInsertImg();
                }
            }
            let button = customData[i].topButton;
            if (button) addReturnTopButton();
            break;
        }
    }

    if (siteData.reg) {
        debug("\n列出此站資料", siteData);
        debug(`\n列出規則總數(${customData.length})`);
        debug("\n列出NSFW規則", nsfw1Data);
        debug("\n列出NSFW+規則", nsfw2Data);
        debug("\n列出COMIC規則", comicData);
        debug("\n列出HCOMIC規則", hcomicData);
        debug("\n列出未分類規則", noneData);
    }

    if (options.enable == 1) {
        if (!ge(".customPicDownloadMsg")) fun.addCustomPicDownloadMsg();
        if (!ge(".CustomPictureDownloadStyle")) fun.css(style);
        if (siteData.key != 0) {
            document.addEventListener('keydown', (event) => {
                switch (event.keyCode) {
                    case 96: //數字鍵0
                        imgZipDownload();
                        break;
                    case 97: //數字鍵1
                        copyImgSrcText();
                        break;
                    case 98: //數字鍵2
                        goToNo1Img(0);
                        break;
                }
            });
        }
        if (siteData.icon == 0) {
            return;
        } else if (options.icon == 1 || siteData.icon == 1) addCustomPicDownloadButton();
    }

})();
