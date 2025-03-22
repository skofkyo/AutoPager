// ==UserScript==
// @name               嗨皮漫畫閱讀助手
// @name:en            Happymh Reading Helper
// @name:zh-CN         嗨皮漫画阅读助手
// @name:zh-TW         嗨皮漫畫閱讀助手
// @version            2.7.12
// @description        無限滾動模式(自動翻頁、瀑布流)，背景預讀圖片，自動重新載入出錯的圖片，左右方向鍵切換章節，目錄頁自動展開全部章節，新分頁打開漫畫鏈接。
// @description:en     infinite scroll reading mode,Arrow keys to switch chapters,Background preload image,Auto reload image with error.
// @description:zh-CN  无限滚动模式(自动翻页、瀑布流)，背景预读图片，自动重新加载出错的图片，左右方向键切换章节，目录页自动展开全部章节，新标籤页打开漫画链接。
// @description:zh-TW  無限滾動模式(自動翻頁、瀑布流)，背景預讀圖片，自動重新載入出錯的圖片，左右方向鍵切換章節，目錄頁自動展開全部章節，新分頁打開漫畫鏈接。
// @author             德克斯DEX
// @match              *://m.happymh.com/*
// @match              *://hihimanga.com/*
// @icon               data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gCOMP4AjkD+AI5A/gCOQP4AjkD+AI4w/gCOIP4AjkD+AI5A/gCOQP4AjkD+AI5A/gCOEAAAAAAAAAAAAAAAAP4AjlD+AI6v/gCO//4Ajv/+AI7P/gCOUP4AjjD+AI6P/gCO//4Ajv/+AI7v/gCOgP4AjhAAAAAAAAAAAAAAAAAAAAAA/gCOQP4Ajv/+AI7//gCOgAAAAAAAAAAAAAAAAP4Ajv/+AI7//gCOvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AjkD+AI7//gCO//4AjoAAAAAAAAAAAAAAAAD+AI7//gCO//4Ajr8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AI5A/gCO//4Ajv/+AI6AAAAAAAAAAAAAAAAA/gCO//4Ajv/+AI6/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gCOQP4Ajv/+AI7//gCOgAAAAAAAAAAAAAAAAP4Ajv/+AI7//gCOvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AjkD+AI7//gCO//4Ajt/+AI6//gCOv/4Ajr/+AI7//gCO//4Ajr8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AI5A/gCO//4Ajv/+AI6AAAAAAAAAAAAAAAAA/gCO//4Ajv/+AI6/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/gCOQP4Ajv/+AI7//gCOgAAAAAAAAAAAAAAAAP4Ajv/+AI7//gCOvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP4AjkD+AI7//gCO//4AjoAAAAAAAAAAAAAAAAD+AI7//gCO//4Ajr8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+AI5Q/gCO//4Ajv/+AI6PAAAAAAAAAAD+AI4Q/gCO//4Ajv/+AI7PAAAAAAAAAAAAAAAAAAAAAAAAAAD+AI6A/gCOv/4Ajr/+AI6//gCOv/4AjoD+AI5Q/gCOv/4Ajr/+AI6//gCOv/4Ajr/+AI4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AADAAQAAwAEAAOHHAADhxwAA4ccAAOHHAADgBwAA4ccAAOHHAADhxwAA4YcAAMABAAD//wAA//8AAA==
// @grant              unsafeWindow
// @grant              GM_registerMenuCommand
// @grant              GM_getValue
// @grant              GM_setValue
// @grant              GM_deleteValue
// @grant              GM_openInTab
// @run-at             document-end
// @license            MIT
// @namespace          https://greasyfork.org/users/20361
// ==/UserScript==

(async () => {
    "use strict";

    if (document.querySelector(".captcha-area")) {
        console.warn("嗨皮Cloudflare正在人機驗證中");
        return;
    }

    const defaultConfigs = { //1開、0關
        arrowKey: 1, //鍵盤左右方向鍵切換章節。
        doubleClick: 0, //雙擊前往下一話，方便手機使用。
        preload: 1, //閱讀頁預讀全部圖片，並且嘗試預讀下一話圖片。
        autoReload: 1, //重新載入出錯的圖片。
        autoNext: 0, //下一話按鈕完全進入視口可視範圍內後自動下一話。
        autoNextSec: 1, //下一話按鈕完全進入視口可視範圍內後自動下一話的延遲秒數。
        autoShowAll: 0, //目錄頁自動展開全部章節。
        openInNewTab: 1, //新分頁打開漫畫鏈接。
        infiniteScroll: 0, //無限滾動閱讀模式。
        highQuality: 0, //去掉圖片鏈結的?q參數。
        history: 1, //無限滾動API請求成功後添加瀏覽器歷史。
        removeAd: 1 //移除無用元素
    };

    const GM_configs = GM_getValue("configs", defaultConfigs);
    const configs = Object.assign(defaultConfigs, GM_configs);
    //console.log("腳本設定物件", configs);

    const _unsafeWindow = unsafeWindow ?? window;
    const language = _unsafeWindow.navigator.language;

    let scriptLanguage;
    switch (language) {
        case "zh-TW":
        case "zh-HK":
        case "zh-MO":
        case "zh-Hant-TW":
        case "zh-Hant-HK":
        case "zh-Hant-MO":
            scriptLanguage = "TW";
            break;
        case "zh":
        case "zh-CN":
        case "zh-SG":
        case "zh-MY":
        case "zh-Hans-CN":
        case "zh-Hans-SG":
        case "zh-Hans-MY":
            scriptLanguage = "CH";
            break;
        default:
            scriptLanguage = "EN";
    }

    let i18n;
    switch (scriptLanguage) {
        case "TW":
            i18n = {
                config: {
                    title: "嗨皮漫畫閱讀輔助設定",
                    arrowKey: "左右方向鍵切換章節",
                    doubleClick: "雙擊前往下一話",
                    preload: "背景預讀圖片",
                    autoReload: "自動重新載入出錯的圖片",
                    autoNext: "自動下一話",
                    autoNextSec: "自動下一話延遲(秒)",
                    autoShowAll: "目錄頁自動展開全部章節",
                    openInNewTab: "新分頁打開漫畫鏈結",
                    infiniteScroll: "啟用無限滾動閱讀模式",
                    history: "無限滾動添加瀏覽器歷史紀錄",
                    highQuality: "無限滾動載入最高品質圖片",
                    removeAd: "移除無用元素",
                    exclude: "無限滾動標題文字正規表達式排除",
                    cancel: "取消",
                    reset: "重置設定",
                    save: "保存設定"
                },
                tips: {
                    noNext: "沒有下一話了！",
                    noPrev: "沒有上一話了！",
                    apiError: "API請求返回錯誤，伺服器拒絕連線，也可能是需要再次Cloudflare人機驗證。"
                },
                commandMenu: {
                    settings: "設定"
                },
                button: {
                    prevChapter: "上一話",
                    nextChapter: "下一話",
                    openComments: "開啟評論",
                    closeComments: "關閉評論"
                }
            };
            break;
        case "CN":
            i18n = {
                config: {
                    title: "嗨皮漫画阅读辅助设置",
                    arrowKey: "左右方向键切换章节",
                    doubleClick: "双击前往下一话",
                    preload: "背景预读图片",
                    autoReload: "自动重新加载出错的图片",
                    autoNext: "自动下一话",
                    autoNextSec: "自动下一话延迟(秒)",
                    autoShowAll: "目录页自动展开全部章节",
                    openInNewTab: "新标籤页打开漫画链结",
                    infiniteScroll: "启用无限滚动阅读模式",
                    highQuality: "无限滚动加载最高品质图片",
                    history: "无限滚动添加浏览器历史纪录",
                    removeAd: "移除无用元素",
                    exclude: "无限滚动标题文字正则表达式排除",
                    cancel: "取消",
                    reset: "重置设置",
                    save: "保存设置"
                },
                tips: {
                    noNext: "没有下一话了！",
                    noPrev: "没有上一话了！",
                    apiError: "API请求返回错误，服务器拒绝连接，也可能是需要再次Cloudflare人机验证。"
                },
                commandMenu: {
                    settings: "设置"
                },
                button: {
                    prevChapter: "上一话",
                    nextChapter: "下一话",
                    openComments: "打开评论",
                    closeComments: "关闭评论"
                }
            };
            break;
        default:
            i18n = {
                config: {
                    title: "settings",
                    arrowKey: "Arrow keys to switch chapters",
                    doubleClick: "Double click to go to the next chapter",
                    preload: "Background preload image",
                    autoReload: "Auto reload image with error",
                    autoNext: "Auto next chapter",
                    autoNextSec: "Auto next chapter delay sec",
                    autoShowAll: "Contents page auto expands all chapters",
                    openInNewTab: "Open the comic link in a new tab",
                    infiniteScroll: "Turn on infinite scroll reading mode",
                    highQuality: "Infinite scroll loading of high quality image",
                    history: "Infinite scroll add browser history",
                    removeAd: "Remove useless elements",
                    exclude: "Title Exclude RegExp",
                    cancel: "Cancel",
                    reset: "Reset",
                    save: "Save",
                },
                tips: {
                    noNext: "no next chapter",
                    noPrev: "no prev chapter",
                    apiError: "The API request returned an error and the server refused to connect. It may also be that Cloudflare human-computer verification is required again."
                },
                commandMenu: {
                    settings: "settings"
                },
                button: {
                    prevChapter: "Prev Chapter",
                    nextChapter: "Next Chapter",
                    openComments: "Open Comments",
                    closeComments: "Close Comments"
                }
            };
    }

    const lp = _unsafeWindow.location.pathname;
    const isReadPage = /^\/mangaread\//.test(lp);
    const isUpdatePage = /^\/latest$/.test(lp);
    const isListPage = /^\/manga\/\w+$/.test(lp);
    const isBookcasePage = /^\/bookcase$/.test(lp);
    const isSearchPage = /^\/sssearch/.test(lp);
    const isRankPage = /^\/rank/.test(lp);
    const isUserPage = /^\/user/.test(lp);
    const isLogged = _unsafeWindow.location.search.includes("token=") || document.cookie.includes("sf_token");
    let nextChapterUrl = null;
    let prevChapterUrl = null;

    const openInNewTab = () => gae(".home-banner a:not([target=_blank]),.manga-rank a:not([target=_blank]),.manga-cover a:not([target=_blank])").forEach(a => a.setAttribute("target", "_blank"));
    const delay = time => new Promise(resolve => setTimeout(resolve, time));
    const isString = str => Object.prototype.toString.call(str) === "[object String]";
    const isObject = obj => Object.prototype.toString.call(obj) === "[object Object]";
    const isArray = arr => Object.prototype.toString.call(arr) === "[object Array]";
    const isEle = e => /^\[object\sHTML[a-zA-Z]*Element\]$/.test(Object.prototype.toString.call(e));

    const ge = (selector, contextNode = null, dom = document) => {
        if (/^\//.test(selector)) {
            return dom.evaluate(selector, (contextNode ?? document), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        } else {
            return (contextNode ?? document).querySelector(selector);
        }
    };

    const gae = (selector, contextNode = null, dom = document) => {
        if (/^\//.test(selector)) {
            const nodes = [];
            const results = dom.evaluate(selector, (contextNode ?? document), null, XPathResult.ANY_TYPE, null);
            let node = null;
            while (node = results.iterateNext()) {
                nodes.push(node);
            }
            return nodes;
        } else {
            return [...(contextNode ?? document).querySelectorAll(selector)];
        }
    };

    const addGlobalStyle = css => {
        const style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = css;
        document.head.append(style);
    };

    const waitEle = selector => {
        return new Promise(resolve => {
            const loop = setInterval(() => {
                if (!!ge(selector)) {
                    clearInterval(loop);
                    resolve();
                }
            }, 100);
        });
    };

    const remove = obj => {
        if (isString(obj)) {
            let selector = obj;
            gae(selector).forEach(e => e.remove());
        } else if (isArray(obj)) {
            let selectors = obj;
            selectors.forEach(selector => gae(selector).forEach(e => e.remove()));
        }
    };

    const getHeaders = () => {
        return {
            "headers": {
                "accept": "application/json, text/plain, */*",
                "x-requested-id": new Date().getTime(),
                "x-requested-with": "XMLHttpRequest"
            }
        };
    };

    const preload = (pn, text) => {
        let preloadDiv = ge("#happymhPreload");
        if (preloadDiv) {
            preloadDiv.innerHTML = "";
        } else {
            preloadDiv = document.createElement("div");
            preloadDiv.id = "happymhPreload";
            preloadDiv.style.display = "none";
            document.body.append(preloadDiv);
        }
        const chapterCode = pn.split("/").at(-1);
        const params = new URLSearchParams({
            code: chapterCode,
            v: "v3.1818134"
        }).toString();
        fetch("/v2.0/apis/manga/reading?" + params, getHeaders()).then(res => res.json()).then(async jsonData => {
            try {
                if (jsonData.status == 0) {
                    console.log(text + "漫畫名稱：" + jsonData.data.manga_name + "\n章節名稱：" + jsonData.data.chapter_name + "\n章節圖片：\n", jsonData.data.scans, "\nJSON：\n", jsonData);
                    const scans = jsonData.data.scans;
                    for (const scan of scans) {
                        const img = new Image();
                        img.setAttribute("referrerpolicy", "origin");
                        img.alt = jsonData.data.chapter_name;
                        img.src = scan.url;
                        preloadDiv.append(img);
                        await delay(200);
                    }
                } else if (jsonData.status == 403) {
                    console.log(text + "獲取數據失敗\n", jsonData);
                }
            } catch (error) {
                console.error(error);
            }
        }).catch(error => console.error(error));
    };

    const textExcludeRegExp = GM_getValue("exclude", "");

    const createConfigElement = () => {

        const mainElement = document.createElement("div");
        mainElement.id = "mainHappymhConfigShadowElement";

        const shadow = mainElement.attachShadow({
            mode: "closed"
        });

        shadow.innerHTML = `
<style type="text/css">
    #happymhConfigElement {
        text-align: center;
        width: 300px;
        height: auto;
        position: fixed;
        top: calc((100% - 520px) / 2);
        left: calc((100% - 302px) / 2);
        border: 1px solid #a0a0a0;
        border-radius: 3px;
        box-shadow: -2px 2px 5px rgb(0 0 0 / 30%);
        background-color: #FAFAFB;
        z-index: 10000;
    }

    #happymhConfigElement div,
    #happymhConfigElement label,
    #happymhConfigElement button {
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: black;
        float: none;
        line-height: 18px;
    }

    #happymhConfigElement .title {
        width: 100%;
    }

    #happymhConfigElement div.item {
        width: 348px;
        display: flex;
    }

    #happymhConfigElement label.select {
        margin: 0 5px;
    }

    #happymhConfigElement div {
        margin-bottom: 4px;
        padding: 1px 4px;
    }

    #happymhConfigElement input[type=checkbox] {
        width: 14px;
        margin: 0 6px;
    }

    #happymhConfigElement button {
        width: auto;
        min-width: 80px;
        max-width: 100px;
        min-height: unset;
        max-height: 24px;
        margin-left: 2px;
        margin-right: 2px;
        margin-bottom: 4px;
        display: inline-block;
        color: #000000;
        border: 1px solid #a0a0a0;
        background-color: transparent;
        border-radius: unset;
    }

    #happymhConfigElement #exclude {
        width: calc(100% - 12px);
        height: 100px;
    }
</style>
<div id="happymhConfigElement">
    <div class="title" style="width: calc(100% - 8px);">
        ${i18n.config.title}
    </div>
    <div class="item">
        <input id="arrowKeyInput" type="checkbox">
        <label>${i18n.config.arrowKey}</label>
    </div>
    <div class="item">
        <input id="doubleClickInput" type="checkbox">
        <label>${i18n.config.doubleClick}</label>
    </div>
    <div class="item">
        <input id="autoNextInput" type="checkbox">
        <label>${i18n.config.autoNext}</label>
    </div>
    <div class="item">
        <label class="select">${i18n.config.autoNextSec}</label>
        <select id="autoNextSec">
            ${new Array(10).fill().map((_, i) => `<option value="${i + 1}">${i + 1}</option>`).join("")}
        </select>
    </div>
    <div class="item">
        <input id="autoShowAllInput" type="checkbox">
        <label>${i18n.config.autoShowAll}</label>
    </div>
    <div class="item">
        <input id="openInNewTabInput" type="checkbox">
        <label>${i18n.config.openInNewTab}</label>
    </div>
    <div class="item">
        <input id="autoReloadInput" type="checkbox">
        <label>${i18n.config.autoReload}</label>
    </div>
    <div class="item">
        <input id="preloadInput" type="checkbox">
        <label>${i18n.config.preload}</label>
    </div>
    <div class="item">
        <input id="removeAdInput" type="checkbox">
        <label>${i18n.config.removeAd}</label>
    </div>
    <div class="item">
        <input id="infiniteScrollInput" type="checkbox">
        <label>${i18n.config.infiniteScroll}</label>
    </div>
    <div class="item">
        <input id="highQualityInput" type="checkbox">
        <label>${i18n.config.highQuality}</label>
    </div>
    <div class="item">
        <input id="historyInput" type="checkbox">
        <label>${i18n.config.history}</label>
    </div>
    <label>${i18n.config.exclude}<textarea id="exclude" placeholder="第.*话\n第.*章"></textarea></label>
    <button id="cancelBtn">${i18n.config.cancel}</button>
    <button id="resetBtn">${i18n.config.reset}</button>
    <button id="saveBtn">${i18n.config.save}</button>
</div>
        `;

        const main = ge("#happymhConfigElement", shadow);
        ge("#arrowKeyInput", main).checked = configs.arrowKey == 1 ? true : false;
        ge("#doubleClickInput", main).checked = configs.doubleClick == 1 ? true : false;
        ge("#preloadInput", main).checked = configs.preload == 1 ? true : false;
        ge("#autoReloadInput", main).checked = configs.autoReload == 1 ? true : false;
        ge("#autoNextInput", main).checked = configs.autoNext == 1 ? true : false;
        ge("#autoNextSec", main).value = configs.autoNextSec;
        ge("#autoShowAllInput", main).checked = configs.autoShowAll == 1 ? true : false;
        ge("#openInNewTabInput", main).checked = configs.openInNewTab == 1 ? true : false;
        ge("#removeAdInput", main).checked = configs.removeAd == 1 ? true : false;
        ge("#infiniteScrollInput", main).checked = configs.infiniteScroll == 1 ? true : false;
        ge("#highQualityInput", main).checked = configs.highQuality == 1 ? true : false;
        ge("#historyInput", main).checked = configs.history == 1 ? true : false;
        ge("#exclude", main).value = textExcludeRegExp;
        ge("#cancelBtn", main).addEventListener("click", event => {
            event.preventDefault();
            mainElement.remove();
        });
        ge("#resetBtn", main).addEventListener("click", event => {
            event.preventDefault();
            mainElement.remove();
            GM_deleteValue("configs");
            GM_deleteValue("exclude");
            _unsafeWindow.location.reload();
        });
        ge("#saveBtn", main).addEventListener("click", event => {
            event.preventDefault();
            configs.arrowKey = ge("#arrowKeyInput", main).checked == true ? 1 : 0;
            configs.doubleClick = ge("#doubleClickInput", main).checked == true ? 1 : 0;
            configs.preload = ge("#preloadInput", main).checked == true ? 1 : 0;
            configs.autoReload = ge("#autoReloadInput", main).checked == true ? 1 : 0;
            configs.autoNext = ge("#autoNextInput", main).checked == true ? 1 : 0;
            configs.autoNextSec = ge("#autoNextSec", main).value;
            configs.autoShowAll = ge("#autoShowAllInput", main).checked == true ? 1 : 0;
            configs.openInNewTab = ge("#openInNewTabInput", main).checked == true ? 1 : 0;
            configs.removeAd = ge("#removeAdInput", main).checked == true ? 1 : 0;
            configs.infiniteScroll = ge("#infiniteScrollInput", main).checked == true ? 1 : 0;
            configs.highQuality = ge("#highQualityInput", main).checked == true ? 1 : 0;
            configs.history = ge("#historyInput", main).checked == true ? 1 : 0;
            mainElement.remove();
            GM_setValue("configs", configs);
            GM_setValue("exclude", ge("#exclude", main).value);
            _unsafeWindow.location.reload();
        });
        document.body.append(mainElement);
    };

    GM_registerMenuCommand(i18n.commandMenu.settings, createConfigElement);

    if (configs.removeAd == 1 && isReadPage) {
        addGlobalStyle(`
div:has(>#page-area) {
    min-height: auto !important;
    max-height: max-content !important;
    overflow: auto !important;
}
        `);
        const removeElement = () => {
            const removeSelectors = [
                "noscript",
                "iframe",
                ".adsbygoogle",
                "#google_pedestal_container",
                "#root>div>div:has(>a)",
                "//div[text()='Done']",
                "#notice-react",
                "#alert-confirm-react"
            ];
            remove(removeSelectors);
            document.body.style.filter = "";
        };
        removeElement();
        new MutationObserver(removeElement).observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (configs.openInNewTab == 1 && !isReadPage && !isListPage && !isUserPage) {
        openInNewTab();
        console.log("嗨皮漫畫在新分頁打開漫畫鏈接");
        new MutationObserver(() => {
            openInNewTab();
        }).observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (configs.autoShowAll == 1 && isListPage) {
        window.addEventListener("load", async () => {
            await delay(1000);
            let button = ge("//div[contains(text(),'给本王显示全部章节')]");
            if (button) {
                button.click();
                console.log("嗨皮漫畫自動展開目錄");
            }
        });
    }

    if (configs.arrowKey == 1 && isReadPage) {
        document.addEventListener("keydown", event => {
            if (ge("#mainHappymhConfigShadowElement")) return;
            if (event.code === "ArrowRight" || event.key === "ArrowRight") {
                const nextE = ge("//a[text()='下一话' or text()='下一話'][starts-with(@href,'/mangaread/')]");
                if (isString(nextChapterUrl)) {
                    _unsafeWindow.location.href = nextChapterUrl;
                } else if (nextE) {
                    _unsafeWindow.location.href = nextE.href;
                } else {
                    alert(i18n.tips.noNext);
                }
            }
            if (event.code === "ArrowLeft" || event.key === "ArrowLeft") {
                const prevE = ge("//a[text()='上一话' or text()='上一話'][starts-with(@href,'/mangaread/')]");
                if (isString(prevChapterUrl)) {
                    _unsafeWindow.location.href = prevChapterUrl;
                } else if (prevE) {
                    _unsafeWindow.location.href = prevE.href;
                } else {
                    alert(i18n.tips.noPrev);
                }
            }
        });
    }

    if (configs.doubleClick == 1 && isReadPage) {
        document.addEventListener("dblclick", () => {
            if (ge("#mainHappymhConfigShadowElement")) return;
            const nextE = ge("//a[text()='下一话' or text()='下一話'][starts-with(@href,'/mangaread/')]");
            if (nextE) {
                _unsafeWindow.location.href = nextE.href;
            }
        });
    }

    if (configs.preload == 1 && isReadPage && configs.infiniteScroll != 1) {
        await waitEle("[id^=imageLoader]");
        console.log("嗨皮漫畫預讀全部圖片");
        preload(lp, "嗨皮漫畫本話數據\n");
        setTimeout(() => {
            const nextE = ge("//a[text()='下一话' or text()='下一話'][starts-with(@href,'/mangaread/')]");
            if (nextE) {
                preload(nextE.pathname, "嗨皮漫畫下一話數據\n");
            }
        }, 3000);
    }

    if (isReadPage) {
        const selector = "#root footer";
        await waitEle(selector);
        new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                const nextA = ge("//a[text()='下一话' or text()='下一話']");
                const prevA = ge("//a[text()='上一话' or text()='上一話']");
                if (prevA?.href?.includes("/mangaread/")) {
                    prevA.style.color = "rgb(255, 255, 255)";
                    prevA.style.backgroundColor = "rgb(103, 58, 183)";
                }
                if (nextA?.href?.includes("/readMore/")) {
                    nextA.style.color = "rgb(33, 33, 33)";
                    nextA.style.backgroundColor = "rgb(245, 245, 245)";
                    nextA.innerText = "（╯﹏╰）已经没有下一话了哦~";
                }
            }
        }).observe(ge(selector));
    }

    if (configs.autoNext == 1 && isReadPage) {
        await waitEle("#root footer button");
        let observeE;
        const divs = gae("#root footer>article>div");
        if (divs.length == 1) {
            observeE = ge("#root footer article");
        } else if (divs.length == 2) {
            const a = ge("a", divs[1]);
            if (a) {
                observeE = a;
            }
        } else {
            observeE = ge("#root footer article");
        }
        if (observeE) {
            let timeId;
            new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    timeId = setTimeout(() => {
                        let nextE = ge("//a[text()='下一话' or text()='下一話'][starts-with(@href,'/mangaread/')]");
                        if (nextE) {
                            _unsafeWindow.location.href = nextE.href;
                        }
                    }, configs.autoNextSec * 1000);
                } else {
                    clearTimeout(timeId);
                }
            }, {
                threshold: 0.6,
            }).observe(observeE);
        }
    }

    if (configs.autoReload == 1 && isReadPage && configs.infiniteScroll != 1) {
        new MutationObserver(mutationsList => {
            //console.log(mutationsList);
            mutationsList.forEach(e => {
                //console.log([...e.target?.children]);
                if (e.target?.children[1]?.innerText === "请疯狂点击图片以重新加载") {
                    e.target.click();
                }
            });
        }).observe(ge("#root article"), {
            childList: true,
            subtree: true
        });
    }

    if (isReadPage && configs.infiniteScroll == 1) {
        await waitEle("div[id^=imageLoader] img[id^=scan]");
        if (!("_ht" in localStorage)) return;
        //已淘汰的所有章節資料API
        //https://m.happymh.com/apis/m/mcsmmss?code=漫畫代碼
        //章節評論API
        //https://m.happymh.com/v2.0/apis/comment?code=漫畫代碼&ch_id=章節ID&pn=頁數&order=time&from=read
        const infiniteScrollCss = `
footer {
    margin: 0px !important;
    padding: 0px !important;
}
.chapterTitle {
    width: auto;
    height: 30px;
    font-size: 18px;
    color: black;
    font-family: Arial, sans-serif;
    line-height: 29px;
    text-align: center;
    overflow: hidden;
    display: block;
    margin: 10px 5px;
    border: 1px solid #e0e0e0;
    background-color: #f0f0f0;
    background: -webkit-gradient(linear, 0 0, 0 100%, from(#f9f9f9), to(#f0f0f0));
    background: -moz-linear-gradient(top, #f9f9f9, #f0f0f0);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
    border-radius: 5px;
}
#mainContent .images {
    width: 100%;
    height: auto;
    display: block;
    padding: 0;
    margin: 0 auto;
}
.apiLoading {
    width: auto !important;
    height: auto !important;
    max-width: 60px !important;
    max-height: 60px !important;
    display: block !important;
    border: none !important;
    border-radius: unset !important;
    padding: 0 !important;
    margin: 20px auto !important;
}
        `;
        addGlobalStyle(infiniteScrollCss);

        let currentData = {};
        const img_loading_bak = "data:image/webp;base64,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";
        const img_error_bak = "data:image/webp;base64,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";
        const api_loading_gif = "data:image/webp;base64,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";

        const [localStorageHistory] = JSON.parse(localStorage.getItem("_ht"));
        const mangaCode = localStorageHistory.serie_code;
        let chapterCode = localStorageHistory.read_chapter_codes;
        let currentChapterId = localStorageHistory.read_chapter_id;
        let chaptersData = [];
        let isObtainedAllChapters = false;

        let currentViewChapterId = currentChapterId;
        let infiniteScrollSwitch = true;
        let isOpenComments = false;
        const hiddenElementArray = [];

        const titleObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    currentViewChapterId = entry.target.dataset.chapterId;
                    //console.log("當前檢視章節ID:", currentViewChapterId);
                }
            });
        });

        const imagesObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    //observer.unobserve(entry.target);
                    if (!entry.target.classList.contains("loaded")) {
                        entry.target.classList.add("loaded");
                        const realSrc = entry.target.dataset.src;
                        const nextElement = entry.target.nextElementSibling;
                        entry.target.src = realSrc;
                        if (nextElement?.tagName == 'IMG' && nextElement?.dataset?.src) {
                            nextElement.src = nextElement.dataset.src;
                        }
                    }
                    currentViewChapterId = entry.target.dataset.chapterId;
                    //console.log("當前檢視章節ID:", currentViewChapterId);
                }
            });
        });

        const nextObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target);
                    infiniteScroll();
                }
            });
        });

        const createLoadingElement = () => {
            const img = new Image();
            img.className = "apiLoading";
            img.src = api_loading_gif;
            let targetElement = ge("#mainContent");
            if (targetElement) {
                targetElement.append(img);
            } else {
                targetElement = ge("article");
                targetElement.after(img);
            }
            return img;
        };

        const getChaptersData = () => {
            let page = 1;
            const get = () => {
                const params = new URLSearchParams({
                    code: mangaCode,
                    cid: currentChapterId,
                    page,
                    order: "desc"
                }).toString();
                return fetch("/v2.0/apis/manga/chapterByPage?" + params, getHeaders()).then(res => res.json()).then(json => {
                    //console.log("json", json);
                    if (json?.msg === "success") {
                        chaptersData = chaptersData.concat(json.data.items);
                        const find_current_chapter_data = json.data.items.some(e => e.codes === chapterCode);
                        if (json?.data?.isEnd == 1 || chaptersData.length >= json?.data?.total || find_current_chapter_data) {
                            isObtainedAllChapters = true;
                            console.log("無限滾動需要用到的章節資料", chaptersData);
                        } else {
                            page++;
                            return get();
                        }
                    }
                }).catch(error => console.error("獲取章節列表資料錯誤", error));
            };
            return get();
        };

        const getReadData = async (cc, isNext = 0) => {
            let loading;
            if (isNext == 1) {
                loading = createLoadingElement();
            }
            try {
                const params = new URLSearchParams({
                    code: cc,
                    v: "v3.1818134"
                }).toString();
                const res = await fetch("/v2.0/apis/manga/reading?" + params, getHeaders());
                const readJson = await res.json();
                if (readJson?.msg !== "success") {
                    loading?.remove();
                    console.error("取得章節資料錯誤", readJson);
                    return "ERROR";
                }
                if (isNext == 1) {
                    if (isLogged) {
                        const params = new URLSearchParams({
                            code: readJson.data.manga_code,
                            cid: readJson.data.id
                        }).toString();
                        fetch("/v2.0/apis/uu/readLog", {
                            ...getHeaders(),
                            "body": params,
                            "method": "POST"
                        });
                    }

                    const localStorageHistoryArray = JSON.parse(localStorage.getItem("_ht"));
                    const object = Object.assign(localStorageHistoryArray[0], {
                        read_chapter_id: readJson.data.id,
                        read_chapter_name: readJson.data.chapter_name,
                        read_chapter_codes: cc,
                        add_time: new Date().getTime(),
                        update_time: new Date().getTime()
                    });
                    localStorageHistoryArray[0] = object;
                    localStorage.setItem("_ht", JSON.stringify(localStorageHistoryArray));

                    loading?.remove();
                }
                return {
                    current_cid: cc,
                    ...readJson.data
                };
            } catch (error) {
                loading?.remove();
                console.error("取得章節資料錯誤", error);
                return "ERROR";
            }
        };

        const singleThreadLoadImgs = async imgArr => {
            for (let i = 0; i < imgArr.length; i++) {
                if (!imgArr[i]?.dataset?.src) continue;
                await new Promise(resolve => {
                    const loadSrc = imgArr[i].dataset.src;
                    const temp = new Image();
                    temp.setAttribute("referrerpolicy", "origin");
                    temp.onload = () => {
                        imgArr[i].src = loadSrc;
                        resolve();
                    }
                    temp.onerror = resolve();
                    temp.src = loadSrc;
                });
            }
        };

        const singleThreadLoadSrcs = async srcArr => {
            for (const src of srcArr) {
                await new Promise(resolve => {
                    const temp = new Image();
                    temp.setAttribute("referrerpolicy", "origin");
                    temp.onload = resolve();
                    temp.onerror = resolve();
                    temp.src = src;
                });
            }
        };

        const addBrowsingHistory = (data, id) => {
            const title = data.manga_name + " - " + data.chapter_name + (_unsafeWindow.location.host.startsWith("hihimanga") ? " - 嗨嗨漫画" : " - 嗨皮漫画");
            const url = _unsafeWindow.location.origin + "/mangaread/" + id;
            history.pushState(null, title, url);
            document.title = title;
        };

        const createComments = async () => {
            isOpenComments = true;
            document.documentElement.style.overflow = "hidden";
            document.body.style.overflow = "hidden";

            const div = document.createElement("div");
            div.id = "current-comments";
            Object.assign(div.style, {
                left: "0",
                right: "0",
                top: "0",
                bottom: "0",
                width: ge(".MuiContainer-root").offsetWidth + "px",
                height: "100vh",
                margin: "0 auto",
                padding: "0px",
                position: "fixed",
                zIndex: "10000",
                backgroundColor: "#fff",
                fontSize: "14px",
                overflow: "hidden"
            });
            document.body.append(div);

            let rowHtml = `
<div style="background-color:#fff;padding:6px;">
  <button id="close-comments" style="font-size: 1rem; border: 1px solid rgb(0, 0, 0); border-radius: 4px;">${i18n.button.closeComments}</button>
</div>
            `;
            div.insertAdjacentHTML("beforeend", rowHtml);

            ge("#close-comments", div).addEventListener("click", () => {
                div.remove();
                isOpenComments = false;
                document.documentElement.style.overflow = "";
                document.body.style.overflow = "";
            });

            const messageHtml = `
<div id="message" class="MuiCardContent-root" style="margin: 2px; border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px; padding: 3rem 16px; display: flex; flex-direction: column; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center; text-align: center; min-height: 260px;width: calc(100% - 4px); background-color: rgb(255, 255, 255);">
  <svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="user-select: none; width: 1em;height: 1em; display: inline-block; fill: currentcolor;flex-shrink: 0; font-size: 1.5rem; color: rgba(0, 0, 0, 0.54); transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1);">
    <path d="M21.99 2H2v16h16l4 4-.01-20zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
  </svg>
  <h6 class="MuiTypography-root MuiTypography-h6" style="color: #000; margin: 0px; font-family: Roboto, Helvetica, Arial, sans-serif; font-weight: 500; font-size: 1.25rem; line-height: 1.6; letter-spacing: 0.0075em;">数据请求中...</h6>
</div>`;
            div.insertAdjacentHTML("beforeend", messageHtml);
            div.insertAdjacentHTML("beforeend", '<div style="display:none; overflow-x: hidden; overflow-y: scroll;  height: calc(100% - 42px); margin: 2px; border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;"><ul class="MuiList-root MuiList-padding" style="display: block; padding-left: 10px; padding-bottom: 110px;"></ul></div>');

            const ul = ge("ul", div);

            let loop = true;
            let pn = 1;

            const getComments = () => {
                const params = new URLSearchParams({
                    code: mangaCode,
                    ch_id: currentViewChapterId,
                    pn,
                    order: "time",
                    from: "read"
                }).toString();
                return fetch("/v2.0/apis/comment?" + params, getHeaders()).then(res => res.json()).then(json => {
                    if (!isOpenComments) {
                        loop = false;
                        return;
                    }

                    if (json?.msg !== "success") {
                        loop = false;
                        const h6 = ge("h6", div);
                        if (h6) {
                            h6.innerText = "数据请求错误。";
                        }
                        return;
                    }

                    const {
                        isEnd,
                        items
                    } = json.data;

                    if (isEnd === true) {
                        loop = false;
                    }

                    if (!isArray(items) || items.length === 0) {
                        loop = false;
                        const h6 = ge("h6", div);
                        if (h6) {
                            h6.innerText = "还没有吐槽";
                        }
                        return;
                    } else {
                        ge("#message", div)?.remove();
                    }

                    let liHtmls = "";

                    items.forEach(item => {
                        let subHtml = "";

                        if ("sub_comments" in item && isArray(item?.sub_comments) && item?.sub_comments?.length > 0) {

                            const subHtmls = item.sub_comments.map(sub => {
                                return `
                    <div class="MuiTypography-root MuiTypography-body2 MuiTypography-colorTextSecondary" style="font-weight: normal; word-break: break-all;">
                        <span style="color: #673ab7;">${sub.user.username}</span>: ${sub.content}
                    </div>`;
                            }).join("");

                            subHtml = `
            <div style="margin-top: 0.5rem; padding-top: 0.1rem; padding-left: 0.2rem; background-color: #f5f5f5;">
                ${subHtmls}
            </div>`;
                        }

                        liHtmls += `
<li class="MuiListItem-root MuiListItem-alignItemsFlexStart" style="display: block; padding: 0 10px 0 0;">
    <div class="MuiListItemText-root MuiListItemText-multiline" style="flex: 1 1 auto; min-width: 0px; margin-top: 6px; margin-bottom: 6px; font-weight: bolder; color: rgba(0, 0, 0, 0.87);">
        <span class="MuiTypography-root MuiTypography-body1 MuiTypography-displayBlock" style="margin: 0px; font-family: Roboto, Helvetica, Arial, sans-serif; font-size: 1rem; line-height: 1.5; letter-spacing: 0.00938em; display: block; font-weight: bolder; color: rgba(0, 0, 0, 0.87);">${item.user.username}</span>
        <div class="MuiTypography-root MuiListItemText-secondary MuiTypography-body2 MuiTypography-colorTextSecondary MuiTypography-displayBlock">
            <div class="MuiBox-root">
                <div class="MuiBox-root">
                    <span class="MuiTypography-root MuiTypography-caption MuiTypography-colorTextSecondary MuiTypography-noWrap" style="margin: 0px; font-family: Roboto, Helvetica, Arial, sans-serif; font-weight: 400; font-size: 0.75rem; line-height: 1.66; letter-spacing: 0.03333em; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(0, 0, 0, 0.6);">章节: ${item.ch_name}</span>
                    <br>
                    <span class="MuiTypography-root MuiTypography-caption MuiTypography-colorTextSecondary" style="margin: 0px; font-family: Roboto, Helvetica, Arial, sans-serif; font-weight: 400; font-size: 0.75rem; line-height: 1.66; letter-spacing: 0.03333em; color: rgba(0, 0, 0, 0.6);">${item.create_time}</span>
                </div>
                <div class="MuiBox-root">
                    <p class="MuiTypography-root MuiTypography-body1" style="margin: 0px; font-family: Roboto, Helvetica, Arial, sans-serif; font-weight: 400; font-size: 1rem; line-height: 1.5; letter-spacing: 0.00938em; color: rgba(0, 0, 0, 0.87); word-break: break-all;">${item.content}</p>
                </div>
            </div>
            ${subHtml}
        </div>
    </div>
</li>`;
                    });

                    ul.insertAdjacentHTML("beforeend", liHtmls);
                    ul.parentElement.style.display = "";
                }).catch(error => {
                    loop = false;
                    const h6 = ge("h6", div);
                    if (h6) {
                        h6.innerText = "数据请求错误，需要再次人机验证。";
                    }
                    console.error("請求錯誤", error);
                });
            };

            while (loop) {
                await getComments();
                pn++;
            }

            if (!isOpenComments) {
                return;
            }
        };

        const createPageElement = (data, isFirst = 0) => {
            const fragment = new DocumentFragment();
            let mainContent = ge("#mainContent");
            if (!mainContent) {
                const targetElement = ge("article"); //ge("article:has(>div[id^='imageLoader'])");
                mainContent = document.createElement("div");
                mainContent.id = "mainContent";
                targetElement.after(mainContent);
            }
            if (isFirst === 0) {
                const title = document.createElement("div");
                title.className = "chapterTitle";
                title.innerText = data.chapter_name;
                title.dataset.chapterId = data.id;
                let filteredTitle = title.innerText;
                const keywordsToExcludes = textExcludeRegExp.split("\n").filter(item => item);
                if (keywordsToExcludes.length) {
                    console.log("標題關鍵字排除列表:", keywordsToExcludes);
                    const keywordRegExps = keywordsToExcludes.map(key => new RegExp(key, "g"));
                    console.log("標題關鍵字正規表達式排除列表:", keywordRegExps);
                    let modify = false;
                    keywordRegExps.forEach(reg_exp => {
                        const matches = filteredTitle.match(reg_exp);
                        if (matches) {
                            modify = true;
                            console.log(`移除關鍵字 "${reg_exp}" 前的標題:`, filteredTitle);
                            filteredTitle = filteredTitle.replace(reg_exp, "");
                        }
                    });
                    if (modify) {
                        filteredTitle = filteredTitle.replace(/\s+/g, " ").trim();
                        console.log("最終過濾後的標題:", filteredTitle);
                        title.innerText = filteredTitle;
                    }
                }
                titleObserver.observe(title);
                fragment.append(title);
            }
            let srcs = data.scans.map(obj => {
                let src;
                if (configs.highQuality == 1) {
                    src = obj.url.replace(/\?q=\d+$/, "");
                } else {
                    src = obj.url;
                }
                return src;
            });
            if (srcs.length == 2 && ("next_cid" in data)) {
                srcs = srcs.slice(0, -1);
            }
            if (srcs.length > 2 && ("next_cid" in data)) {
                srcs = srcs.slice(0, -2);
            }
            const imgs = srcs.map((src, i) => {
                const img = new Image();
                img.className = "images";
                img.setAttribute("referrerpolicy", "origin");
                if (configs.autoReload == 1) {
                    img.dataset.errorNum = 0;
                    img.onerror = error => {
                        const num = Number(img.dataset.errorNum);
                        if (num < 10) {
                            error.target.src = img_loading_bak;
                            error.target.dataset.errorNum = num + 1;
                            setTimeout(() => {
                                error.target.src = error.target.dataset.src;
                            }, 1000);
                        } else {
                            error.target.classList.add("error");
                            error.target.src = img_error_bak;
                        }
                    };
                }
                img.src = img_loading_bak;
                img.dataset.src = src;
                img.dataset.chapterId = data.id;
                imagesObserver.observe(img);
                return img;
            });
            //mainContent.append(...imgs);
            fragment.append(...imgs);
            mainContent.append(fragment);
            nextObserver.observe(imgs.at(-1));
            if (configs.preload == 1) {
                singleThreadLoadImgs(imgs);
            }
        };

        const preloadNext = async (cc) => {
            const data = await getReadData(cc);
            if (data != "ERROR" && isObject(data)) {
                if (isArray(data.scans)) {
                    const srcs = data.scans.map(obj => {
                        let src;
                        if (configs.highQuality == 1) {
                            src = obj.url.replace(/\?q=\d+$/, "");
                        } else {
                            src = obj.url;
                        }
                        return src;
                    });
                    singleThreadLoadSrcs(srcs);
                }
            }
        };

        const infiniteScroll = async () => {
            if ("next_cid" in currentData) {
                let cid = currentData.next_cid;
                if (isObtainedAllChapters) {
                    const chapters_next_cid = chaptersData?.find((_, index, array) => array[index + 1]?.codes === currentData?.current_cid)?.codes;
                    if (isString(chapters_next_cid) && cid !== chapters_next_cid) {
                        //有少數閱讀資料和章節資料的next_cid不相同，以章節資料為準。
                        cid = chapters_next_cid;
                    }
                }
                const nextDataJSon = await getReadData(cid, 1);
                if (nextDataJSon == "ERROR") {
                    alert(i18n.tips.apiError);
                    return;
                } else if (isObject(nextDataJSon)) {
                    console.log("下一章節的閱讀資料", nextDataJSon);
                    currentData = nextDataJSon;
                    createPageElement(currentData);
                    if (configs.history == 1) {
                        addBrowsingHistory(currentData, cid);
                    }
                    const h6 = ge("#root h6");
                    if (isEle(h6)) {
                        h6.innerText = currentData.chapter_name;
                    }
                    const menuNextA = ge("//span[text()='下一话' or text()='下一話']/following-sibling::a[1][starts-with(@href,'/mangaread/')]");
                    const menuPrevA = ge("//span[text()='上一话' or text()='上一話']/following-sibling::a[1][starts-with(@href,'/mangaread/')]");
                    const nextA = ge("//a[text()='下一话' or text()='下一話'][starts-with(@href,'/mangaread/')]");
                    const prevA = ge("//a[text()='上一话' or text()='上一話'][starts-with(@href,'/mangaread/')]");
                    if ("next_cid" in currentData) {
                        let nid = currentData.next_cid;
                        if (isObtainedAllChapters) {
                            const chapters_next_cid = chaptersData?.find((_, index, array) => array[index + 1]?.codes === currentData?.current_cid)?.codes;
                            if (isString(chapters_next_cid) && nid !== chapters_next_cid) {
                                nid = chapters_next_cid;
                            }
                        }
                        const nextUrl = "/mangaread/" + nid;
                        nextChapterUrl = nextUrl;
                        if (isEle(menuNextA)) {
                            menuNextA.href = nextUrl;
                        }
                        if (isEle(nextA)) {
                            nextA.href = nextUrl;
                        }
                        if (configs.preload == 1) {
                            preloadNext(currentData.next_cid);
                        }
                    } else {
                        const nextUrl = "/manga/readMore/" + mangaCode;
                        nextChapterUrl = null;
                        if (isEle(menuNextA)) {
                            menuNextA.href = nextUrl;
                        }
                        if (isEle(nextA)) {
                            nextA.href = nextUrl;
                        }
                    }
                    if ("pre_cid" in currentData) {
                        let pid = currentData.pre_cid;
                        if (isObtainedAllChapters) {
                            const chapters_pre_cid = chaptersData?.find((_, index, array) => array[index - 1]?.codes === currentData?.current_cid)?.codes;
                            if (isString(chapters_pre_cid) && pid !== chapters_pre_cid) {
                                pid = chapters_pre_cid;
                            }
                        }
                        const prevUrl = "/mangaread/" + pid;
                        prevChapterUrl = prevUrl;
                        if (isEle(menuPrevA)) {
                            menuPrevA.href = prevUrl;
                        }
                        if (isEle(prevA)) {
                            prevA.href = prevUrl;
                        }
                    }
                    const pagerTitles = gae(".chapterTitle");
                    const images = gae(".images");
                    if (pagerTitles.length > 3 && images.length > 30) {
                        const titleE = pagerTitles[0];
                        const parentE = titleE.parentNode;
                        titleE.remove();
                        while (parentE.firstElementChild.classList.contains("images")) {
                            parentE.firstElementChild.remove();
                        }
                    }
                }
            } else {
                hiddenElementArray.forEach(e => (e.style.display = ""));
            }
        };

        try {
            await getChaptersData();
        } catch {}

        const readData = await getReadData(chapterCode);
        if (readData == "ERROR") {
            alert(i18n.tips.apiError);
            return;
        } else if (isObject(readData)) {
            console.log("當前章節閱讀資料", readData);
            gae("article").slice(0, -1).forEach((e, i) => {
                e.style.display = "none";
                if (i === 1) {
                    hiddenElementArray.push(e);
                }
            });
            gae("#root>div>div:not(.MuiBox-root)").forEach(e => {
                e.style.display = "none";
                hiddenElementArray.push(e);
            });
            const firstE = ge("article")?.firstElementChild;
            if (isEle(firstE) && !firstE?.id?.startsWith("imageLoader")) {
                const targetElement = ge("article");
                targetElement.before(firstE.cloneNode(true));
            }
            currentData = readData;
            createPageElement(currentData, 1);

            if ("next_cid" in currentData) {
                let nid = currentData.next_cid;
                if (isObtainedAllChapters) {
                    const chapters_next_cid = chaptersData?.find((_, index, array) => array[index + 1]?.codes === currentData?.current_cid)?.codes;
                    if (isString(chapters_next_cid) && nid !== chapters_next_cid) {
                        nid = chapters_next_cid;
                    }
                }
                preloadNext(nid);
                const nextUrl = "/mangaread/" + nid;
                nextChapterUrl = nextUrl;
            }
            if ("pre_cid" in currentData) {
                let pid = currentData.pre_cid;
                if (isObtainedAllChapters) {
                    const chapters_pre_cid = chaptersData?.find((_, index, array) => array[index - 1]?.codes === currentData?.current_cid)?.codes;
                    if (isString(chapters_pre_cid) && pid !== chapters_pre_cid) {
                        pid = chapters_pre_cid;
                    }
                }
                const prevUrl = "/mangaread/" + pid;
                prevChapterUrl = prevUrl;
            }

            const buttons = [{
                id: "open-comments",
                text: i18n.button.openComments,
                cb: createComments
            }, {
                id: "prev-chapter-button",
                text: i18n.button.prevChapter,
                cb: () => {
                    if (isString(prevChapterUrl)) {
                        _unsafeWindow.location.href = prevChapterUrl;
                    } else {
                        alert(i18n.tips.noPrev);
                    }
                }
            }, {
                id: "next-chapter-button",
                text: i18n.button.nextChapter,
                cb: () => {
                    if (isString(nextChapterUrl)) {
                        _unsafeWindow.location.href = nextChapterUrl;
                    } else {
                        alert(i18n.tips.noNext);
                    }
                }
            }, {
                id: "settings-button",
                text: i18n.commandMenu.settings,
                cb: createConfigElement
            }].map((obj, i) => {
                const button = document.createElement("button");
                button.id = obj.id;
                button.innerText = obj.text;
                Object.assign(button.style, {
                    fontSize: "1rem",
                    fontFamily: "Microsoft YaHei, Arial, sans-serif",
                    padding: "2px 6px 4px 6px",
                    color: "#fff",
                    borderStyle: "solid",
                    borderColor: "#673ab7",
                    backgroundColor: "#673ab7",
                    borderRadius: ".5rem",
                    minWidth: "80px",
                    left: "24px",
                    right: "auto",
                    top: "auto",
                    bottom: (180 - (i * 40)) + "px",
                    position: "fixed",
                    zIndex: "9999",
                    display: "none"
                });
                button.addEventListener("click", obj.cb);
                return button;
            });
            document.body.append(...buttons);

            let lastScrollTop = 0;
            document.addEventListener("scroll", event => {
                if (isOpenComments) return;
                const st = event.srcElement.scrollingElement.scrollTop;
                if (st > lastScrollTop) {
                    buttons.forEach(e => (e.style.display = "none"));
                    lastScrollTop = st;
                } else if (st < lastScrollTop - 20) {
                    const leftNum = (ge(".MuiContainer-root").offsetLeft + 24);
                    buttons.forEach(e => {
                        e.style.left = leftNum + "px";
                        e.style.display = "";
                    });
                    lastScrollTop = st;
                }
            });

        }
    }

})();
