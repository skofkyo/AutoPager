// ==UserScript==
// @name               嗨皮漫畫閱讀輔助
// @name:en            Happymh reading aid
// @name:zh-CN         嗨皮漫画阅读辅助
// @name:zh-TW         嗨皮漫畫閱讀輔助
// @version            2.7.3
// @description        無限滾動模式(自動翻頁、瀑布流)，背景預讀圖片，自動重新載入出錯的圖片，左右方向鍵切換章節，目錄頁自動展開全部章節，新分頁打開漫畫鏈接。
// @description:en     infinite scroll reading mode,Arrow keys to switch chapters,Background preload image,Auto reload image with error.
// @description:zh-CN  无限滚动模式(自动翻页、瀑布流)，背景预读图片，自动重新加载出错的图片，左右方向键切换章节，目录页自动展开全部章节，新标籤页打开漫画链接。
// @description:zh-TW  無限滾動模式(自動翻頁、瀑布流)，背景預讀圖片，自動重新載入出錯的圖片，左右方向鍵切換章節，目錄頁自動展開全部章節，新分頁打開漫畫鏈接。
// @author             tony0809
// @match              *://m.happymh.com/*
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
        autoReload: 1, //重新載入出錯的圖片
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
        case "zh-Hant-TW":
        case "zh-Hant-HK":
            scriptLanguage = "TW";
            break;
        case "zh":
        case "zh-CN":
        case "zh-Hans-CN":
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
    const isRankPage = /^\/rank/.test(lp);
    const isUserPage = /^\/user/.test(lp);
    const isLogged = document.cookie.includes("sf_token");
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
        const mangaCode = pn.split("/").at(-1);
        const apiUrl = `/v2.0/apis/manga/reading?code=${mangaCode}&v=v3.1818134`;
        fetch(apiUrl, getHeaders()).then(res => res.json()).then(async jsonData => {
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
        top: calc((100% - 460px) / 2);
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

    GM_registerMenuCommand(i18n.commandMenu.settings, () => createConfigElement());

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
                    nextA.innerText = "^_^感谢您的阅读~已经没有下一话了哦~";
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
        //所有章節資料API
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
        const img_loading_bak = "data:image/gif;base64,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83uGje9+g7TK7znAs/1N/3BQTmbMt6lvwRde10/Xu89+ZrjEJ07xilv84hjPuMY3zvGOe/zjIA+5yEdO8pKb/OQoT7nKV87ylrv85TCPucxnTvOa2/zmOM+5znfO8577/OdAD7rQh070ohv96EhPutKXzvSmO/3pUI+61KdO9apb/epYz7rWt871rnv962APu9jHTvaym/3saE+72tfO9ra7/e1wj7vc5073utv97njPu973zve++/3vgA+84AdP+MIb/vCIT7ziF8/4xjv+8ZCPvOQnT/nKW/7ymM+85jfP+c57/vOgD73oR0/60pv+9KhPvepXz/rWu/71sI+97GdP+9rb/va4z73ud8/73pH7/vfAD77wh0/84hv/+MhPvvKXz/zmO//50I++9KdP/epb//rYz772t8/97nv/++APv/jHT/7ym//86E+/+tfP/va7//3wj7/850//+tv//vjPv/73z//++///ABiAAjiABFiABniACJiACriADNiADviAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCFxEIACH5BAUKAGgALCwBjAACATABAAf/gGiCg4SFhoeIiYqLjI2JAQYGHhgaEC8FHBQfOhaOnp+goaKjpKWmp6iKAausra0GNDEUJ52ptre4ubq7vGiuv8CrGCksG2e9yMnKy8yOwc/ABjgsHc3W19jZo9DcwCsiJ9ri4+TW3ee/IyI65e3u76Xo8q4YLtXw+Pn6gvP9rS8Dju0bSBCbv4PCKCwoyLAhL4QQDXCQ4LCixXgQIT6YeLGjx0UZQz7wUeujyY8hUxpQwOCkS4spY6748LJmwZg4SdyzyfMdTpwPXLTsSXTcz58oMhRdavAozgY+hjKdiszpURoIqGrdlaJECRIQNHhoYBXhAyBb0yKTkOGDghgQ/wyURRdDqtq7vDp8EEGD7NxgNC7gHYxsgQwRK/7+8mCDsONeHShAUMyqAYjHmHd1UJCYso/MoHOdKPBAcQm7oVOXsrDDw18SC1XLLsUABIa5EErO3g2q9m2rKCjyHv6JAQXXTjUIJ86ckQQYfpHqbk790IbJRyHErs690BkKpX/mQN29+wUSR1OUXz/ojILoKTmwn5+hc0wW89lbwPG0cf71O8AHkQc7/cfdAOGFhMJ2BlaXwQgxFdBgeR3YlxFaE+pTQgExiLADCwNkwKA1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";
        const img_error_bak = "data:image/webp;base64,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";
        const api_loading_gif = "data:image/gif;base64,R0lGODlh8ADwAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgUFBQgICAoKChAQEBUVFRwcHCEhISQkJCcnJywsLC8vLzIyMjQ0NDU1NTc3Nzk5OTo6Ojw8PD09PT8/P0FBQUJCQkNDQ0VFRUZGRkhISEpKSk1NTVBQUFdXV1xcXGFhYWVlZWxsbHJycnl5eYCAgJ6enrGxsbGxsbGysbGysbGysbKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrOysrOzs7Ozs7Ozs7S0tLS0tLS0tLS0tLS0tLW1tbW1tbW1tba2tra2tre3t7e3t7i3uLi4uLi4uLm5ubu7u728vL6+vsDAwMLBwsPDw8PDw8PDw8TEw8TExMTExMTExMTExMXFxcXFxcbGxsfHxsfHx8fHx8fHx8fHx8jIyMjIyMjIyMjIyMnJycrKysrLysvMy8zMzM7Ozs/Pz9HR0dLS0tLS0tPT09TU1NXV1dfX19nZ2dra2tvb29vc3N3d3d7e3uDg4OHh4eLi4uTk5Obm5ubm5ujo6Onp6erq6urq6urq6uvr6+vr6+zs7Ozs7Ozt7e3t7e3t7e3u7e7u7u/v7/Dw8PHx8fHy8fLz8vP08/T09PT09PX19fX19fb29vb39vf39/f39/j4+Pn5+fv7+/z8/P7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBwDsACwAAAAA8ADwAAAI/gDZCRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjyuTo7NerVKM2PQLUZ86TWQpnpZnTB5CjTaNSvfrlbKbTpyyb2ULVKRGfJ1izZkXzBJbCV1jTPOGq9QmfQ51Q2WoGta3bjLhMZfIjlmzZu09cKWyFt+9YP5lM4XpLuDBCW6QUrfHLGCsrhazENi5Lds0iUrYMa36KTNUln2IlT76LJpXCVKPxkkUzFJMqZJtjqxxmatCTNKztpiZ9SiEq0bvLSk6TZpApYbKTg2SW6tDW4JNLKSylG/pd3FgPpWKmvPvFV5m4/la33hfNKIWjyE/GjgbTK+/wHTIr5WcscPV+0YhSKAr/aLJ+lMJdfAQS5EsnWKExnn+qfaLQJwwGl0YnvhQYHy2WRAhdGpwoxImGqZFlCVAWyhbLI7ctCGJfmii0yYohEvdILCUaVosjxKkII16YKHTJfTuWh9UjmdUIFTCasBbkbmlQohAlS+7GlSbAGCmTM6BEaZ2TCVWio5Z4gdKUlS2lgsdYYO7GJUJQpplaGnioQqZKuShin5uprXkQJUDi2Vcai+gyp0miYOfnf3oa1OahjZG136AhzQIImoyOVolClfRZqXBP/EEipBz1d9umoyVaEJ+kNirWo6Bi1Esg/qOm2liTmGoqa1mB9NKqRahQemtjphKU6a+qorLrRC9+SSxWwQ5EibLLPrHJsQ/18kes0frVrEDPZtsYILpSq9Aq3pb6ZLmTrSIuQumhy1galybUrbuqPXHeugRpQm9j8bK5L2Mt4mvMIAr+ixet8kKLbnHHiNtLH7b+izBClRjMWB/htqrLGxYzti07FXdM2hNv5HIsaiLj1e+eERtsGrWk+JryEx8vOjNWpODb7s1o1HzzqPfi+4mhKa+s6M9POIjvQJsQ3fHHXqaMW8BLD2SJwtFOzPLMllRdkDOLtOytzykvMuagJjfUzCFYE0u2wWIdwlZDgirXyxsvM6QM/tsWo2F0QSFLjEYiyjiUyhsZb3ZMHwrm3BAyzllcs9i3cnVIMg7F/EQfDcc2SGhpBL0QMc61Terb7ip4CDEOpafkILFpQpxWSjM0TOT71mw6o3EP49DQZVFN2CgFB++QMGzv7mZdkycoc+VPJIJcQ0kCKXpb5B78hCVnK/RL8qSyNvtYl6iSDGwLOcMMMauEoq+CSqZKXCK/NOTM1UCKpa5bvTitFVeKmNtCfIE7P9UleqTAnEaYAYxQyCoNh6gQQ5oRtsYkzimTYozlCseQXBQQTKEBBfpC4owG2kd55DlE3RaijESMzy+AaMuLJqO6ESoEF6VbUmjQUCWVsA9P/okYDEMg97yRTcspqIjfrJ6wuobMIocgmh0aLqFAlxDDgdha0SE+pZBiQJGGxpJJL4o3mrhNbyFPfCF+xIMJG8oEF/Uho38gyMWE3E55F2yJICh3l0OcMSgftI5kMlHFtpBuLCjUyiFo0RDkqUcQMRGVdSxXP4Y8sYi7wcSADHNF/6Bhiw35nnpYwyqWCMWTEXQi34LDlUt0hxkztM4iG0LAOf7EJX9IpFYSsUKF0OIQfBxLG+ODC0T+h4l1RIguAjnJP7SkUCBKRNrQuMpZVbJAuaAcHRuCwxWV8iS60CVlkKnKd6EhE2QCZmMSwUhLMtM/vTTJIoIESncyxo01/iqmX+pJzSAtIiWqiBI/AYkXdLaKmQNNyCWXJCeTOONMAk3mQRaalYbuSp9ZSShCKBokPHRPJFkCk0Ynijt8ggqjIzUIR5cEipIAA08pLcgTD+E1P8SUICuNUg9Foi+YStQgO62aBPuJJ+F9xBaMuqnXJJJTMBUJJChK6k+XGpGmgukRIYkFqZRKVaJWikYfieqmuNpVkqYKqx6Zxa3IWtaBWNVPU61IhtYa17a69Z2H6hpHfLGsQ/jOrglZ5rKGmhEEEYumgE2IMupDrE5shBnRSuxCMPqrTV6kFMuSLEM09yvpZISxt/KKZhcyz1/5ISOwIFbtRpuQY4BWVqK1/kgmiMXahhyDWAatCGR/VdvMEcuyEkGZrPLWW4Uco7TDtQhe/VRch1B2qxUZxq/+2lyGfOhW1I2IKXhbXdv+yhQUsY2suvsQVtwKdhJBxq2IS17S3sqkCwnoeNvr3FtZ9CGXgC19H4LcTbkyIj5J1X7LK6s5RASpqVrtgI3b30o9tSGc3dSCCZwqxzmkwYyasEOOm6p/PmQxpAKuhhMSYUat4SHPzfCIvZsqITJku6TK7ooVgmE/gbchsyXVjB1iXlLldiGvVfGOF3JbUp12gqmS8ZARUmM8CTAhCJbwkhmSYj89GCG90vGUiZyqMCrEsJVS8pYN0uQ0OXYhy9XS/pg3C92FXEXKa05Ild3Eh/QJOM6tTdVHC/KLGOOZxqS65kFSuykR/3kgJfZTbA8iXCEf2iBzThN7C7IzRz+aIEWu1PUKEktLX1ogmWbUEREi1kMp+NMCCTKe0IqQDDJKzJ8us5ZimJA+bArWl060m/qgkAB7GtXs6DGjDJwQLQObIML+tVth4QpWqOIUpRiFKD7BiU1cghLYzra2t83tbmP72AUBhrfHTe5sX2ITnPiEKEZRClSoghWugEVdwU3vetv73vjOt773ze9++/vfAA+4wNsyC2Y7G9rSpra1y83wbuO7BBCPuMQnTvGKQ/wEKVhBC1zwAhjAIAYxkMEM/vrw5IIYu94FSLnKV87ylrv85S7f80B8fSh8w/zmOM+5AxRi60rduxk5D7rQVR4Bhbj6UPEENtCHzvSbW0AhpfaThcEdg6Zb3eUjcNFY7X31rq9cBeg5+bG9TvYXnEbswCa712OgEEL7HOVqv7oMvEeqpF86FnG/+qgP4gxSTR3Veb+6oA/y5rePPfBMhwBD0hwleiOe6R5gCJgZZfc/w+LxQ2cBQ7Jcqb8/GvNDZ/tComz4T4Ne6EdWSDNSVfk1L/30OJ83O1SNJ8/jGfY5l4BDcgznz+P+5ilwCIw31fopv+L3N4dBfdt8aOTfPBAfvnPzne/yBcicyRU+dNWp/t/yD0BE18z9M/ddrvyHkL7zeN7++FeeeofQvPRbXj/Ldx6R/KbqMWPuhPxXjgKJyFf6U7Z/Kyd6EKFesmJ7I6Z/Aphy+xMR4gWAO7aAKccBFDF8frdkEphy5ScR0nUrhjZgw5CBBYCADcF4aRKBGdgBFtFoFzhix5eBBDgRu3UrKyaCBbBoE8F7qfJj+2WD/XcRbneAC9YCNjh3GEF7lVJ8rPWCGah7GYFZtEVfNlgAG3gRM3grJDhaU3iDGzF5QlhdW6h5G8FXh9U5vTULHTCFPIgR9icrbFVWfZCGGXgCaUVX7RWHGchrHhF1h/KGgIWHAph1H6FVYyV7owWI/vJnByHBh2nih5qFiNxXAiJxfo1oiL0Fic7Xfh/RU25CVvBFLbhGEJiIe8E3Ei/VibL3RF6GL+TEEKN4emc2EiGlJWS1UKtILRkle6/4eC7gUBC1JLX4QX8EKqHWiguxi3n3AHkUEv+3I8GIF7c4J31BVsiodjFYErKmHs/YF2toJIxBjXL4eN6XErrgjKnIeNFYIJGWiw1RjVeHWCkhSRFyCC5GUKnhjalBVoAQjnHXiyxxdPihQuUUHOmYHLIke4fAj15XAS6hVgySSvZEHgVpGNlzkA1hCQp5dXvwEvIoS4O3USbIGBOJPQ8pe5uQkUznjy8BKyk0jCAJIiMp/hMVWZIN8QkoGXQYIEYpFIp3tSMx2RL0JHujcJM49zEpwXn5yDoRGSSZAFYwUYwwQlanQJQvd40w0WmNcQifSBDdlCY/KRIwVY8JoQpUyXJgBxUAOY0ctBCCdSio4JQjAZWNqIQC4QplmXIVoJRP0QuTsQglhxC11GUuiRFy2YeEpVAfkHOM8BYzeRfcE0ohiSeZgAqDSWSN+SuH8JEH4QsncHNW+RSVphV7pxCOlDvnsi9+1BDDoAIvZ3aGwYlZcWoIcTsGgzru4lcNwQxEyHKlqBkPaC8OcUi1eZr/0kQN8QIrpwF/+RaLgzMOQUSSQ5zFuZUEAQMpFwFf6RR3/jNpCLE3ImObqLmWCxEDDOBhyUGXArE2KQOeqLmcBwF9kAI2M8Oe+2I2ZTVX6ymdHaNXS4WVT6OfHTOa6wIhP0OfBiObuxKa+SkvSAOc6wJ+/8mgDZqFVsKCN2OgHcOdZLIxDcosADozb4CeBfIwHYqhBoMx4nIMvzmfH9oxg2CG4gKbC+ovP2NU66Kg0SmhM7Np+HKZw6mjItOAVNULaWmaQGow4JJY/kkvJpotAtpWSGmkNGow2Vk1r/KjU0ovudJcHVkuTXor39RbsVCky/KlpAIIcNldXVqmLforYUpeupCNm2KmhxIoK6YKv+g2bbopcTJkWBItdJomYrJl5Eiip0dKKlSCZ7bAiIfyXwjRhqRCJHfHqG7ypExzVmn6aLOAn4fSIQlxXYwyIvZ2IIyCoAJBoH5CIfo2H0i4I286EGsaJAHygfcGCzq4JDw6EDgKI5mAg//GHJEJHZ6FEFBIT9sxcAZBGysaIb2REFEaIcbBk8jaGZ+hIfdlEM2IH3NQPtSJrAeBGIsAYuSBfwiRbNBhGZjhrXAhF63aF3qREK4AHYAhGOoKElJBFYdQeH3hqwQRhHhxFmmxFvWaEjUBCzihEzzhE3GlVkQBCI+AFKkAC0wxsBRbsRZ7sRibsRUbEAAh+QQJBwDoACwAAAAA8ADwAIcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQICAgNDQ0eHh4tLS02NjY+Pj5TU1NnZ2dubm57e3uZmZmoqKixsbGxsbGxsbGxsbGxsbGxsbGxsbGysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKzsrKzsrKzs7O0s7O0tLS1tLS1tbW2tra4uLi5ubm6urq7uru8u7u9vL2+vr7BwMHCwsLDwsLDw8PDw8PDw8PDw8PDw8PEw8PExMTExMTExMTFxcXFxcXGxsbGxsbHx8fHx8fHx8fHx8fHyMfIyMjIyMjIyMjIyMjIyMjIyMjKysrMzczPz8/Q0NDR0dHS0tLS0tLT09PU1NTV1dXW1tbX19fX2NjZ2dnb29vb29vc3Nzd3d3d3d3e3t7f39/g4ODi4uLk5OTm5ubn5+fo6Ojp6enq6urq6urr6+vs7Ozs7Ozs7Ozs7Ozs7Ozs7e3t7e3t7e3t7e3t7u3u7u7v7+/w8PDw8fDx8vHy8/Lz8/Pz9PP09PT19fT19vX29vb29/b39/f3+Pf4+Pj4+Pj5+vn6+vr7+/v7+/v8/Pz8/Pz9/f3+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8I/gDRCRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqXLlzBjyuRYrNaoTpQYBXrDxsyPUwpPgTHD5s0fRpQ6jbJVbKbTpyyFoeLkSE+aH1izZv3yY5TCUVjB/OCq9UeaPI44oSIGta3bjKswKWojlmzZuz9EKQyFt+/YNooyrXpLuDBCVJb2iPHLGCsohaDENi5LVgwfS6gMa37q65Min2IlT777xZNCT6Pxkv0yVNEnX5tjq8yVqc4PMKztpiatSeEm0bvLSgYDpk6mXLKTgxzWKc/W4JMxKcSkG/pd3FjzdBKm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urq6uru7u7u7u729vb+/v8DAwMHBwcLCwsLCwsPDw8PDw8PDw8PDw8PDw8TExMTExMTExMTExMXFxcXFxcbGxsbGxsfHx8fHx8fIx8jIyMjIyMjIyMjIyMnJycrLys3Nzc/Pz9DQ0NHR0dLS0tPT09PU1NTU1NbW1tfX19jZ2dra2tvb29zc3N3d3d7e3t7f3+Dg4OHh4ePj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6urq6urq6uvr6+vr6+zs7Ozs7e3t7e3t7e3u7e7u7u7u7u/v7+/w7/Dw8PDx8PHx8fLy8vPz8/T09PT19PX19fX19fb29vb29vf39/f39/f49/j4+Pj4+Pn5+fr6+vv7+/7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wj+ANMJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPK5FiM1qhNlBoRkvMGDZNTCk8xQfNGzqBGlDaNqlVsptOnLImp0vTIDxsmWLNmNcNklMJRWrlqZbKmzyNNqohBXcs24ypMi+BgFTu2LpNQCkPZ3cvEDJxFmFi1HUwYoSpLf87wXYz1k8JPjO2KPQPIkqrCmJ/66rTIZ2TGZjgp3PRZ8tyhizr5ysxaJS5MeE7TLV3XTCaFmmiXxoMJV+vfIIdx6rNVd+RLCi/NNm6aSZ9NwoBLvzhqEdflzPeaqaSwUvbP1xf+eZ1OvqGwS3Kxf9dOSSGl9eCxwrk0rLz9grIczVUPvzYkhZD0Z5wjstxXHiqKCMhcIwo1omBpYikClIGtlULIaQ+WxohCjGQIIVaElEJhYakMgqGHny2i0CIofsgEIZeNCJUtjPDXIl+HKHTIjbRxxYgtMspUTCQ8MpdjQonYWKRdkTQVZEucqNHXkrQdidCOVNKmhmhPpuTKH1NmWZqVB2EpZmmAuNKlSZOEeWZkZpBpkJlvLiZWe2uGdEocbtbJWCIKJeInbXFM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kJ3SeaH9t4AQBgcgoJ06mBDJ9yYwYmVp8AHKKQIc0ighcmlvAJe0OQINMigS4mqLMAKrSQIAUicEImujYALRmZg+mhB/eCPzoXuvBgM0Kpcl0B1UIh66JhCkkAIHSowmkBzJBB1VahCWcAIcsJWlKBAg9yC8AYpf6gkqEAIOGpEqoBAnCB9okBrA+KUFAQcl4AEUsI8r8BjrQRmWgaddGFEMc3ACIVCksugCeWEcf4EJykioG3EKcIACI9ABqkmHMdBvi8EGZoEWYSmpIkELjQADKVACIvABGoABDtoGQTEURUEISKEUtFCCogoTxRCqt7qrvNqrvvqrHRUQACH5BAkHAOoALAAAAADwAPAAhwAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQQEBAoKChYWFiUlJTQ0NJKSkqqqqrGxsbGysbGysbGysbGysbGysbGysbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbGxsbKysrGxsrGxsrGxsrGxsrGxsrGxsrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrOysrOysrOysrOysrSzs7Szs7S0tLS0tLW1tbW1tba2tre3t7i3uLm4ubm5ubq6uru7u7y8vL6+vsDAwMLCwsLCwsPCwsPDw8PDw8PDw8PDw8PDw8TExMTExMTExMTExMTExMXFxcbFxcbGxsfHx8fHx8fHx8fIx8fIx8fIx8jIyMjIyMjIyMjIyMnJycrKysvMzM3Nzc/Pz9DQ0NLS0tLS0tPT09PT09XV1djY2Nra2tvb29zd3N3d3d7e3uDg4OLi4uPk5OXl5efn5+jo6Onp6enp6erq6urq6uvr6+vr7Ozs7Ozs7O3t7e3t7e3u7e7u7u7v7u/v7/Dw8PHx8fHy8fLy8vPz8/P08/T09PX19fX29fb29vf39/f39/f49/j4+Pn5+fn5+fz8/P39/f7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wj+ANUJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPK5Khs1ypToDQ12oMnzhJYCmGhiYNnDyNNoEyt2qVsptOnLJPFKsUJkZ0lWLNmPbNklcJVWNEs4ap1iR1DnErFagq1rVuMtEZhyiOWbNm7S1QpVIW379g8mEbReku4MMJYoRK18csYKyqFqMQ2Lku2TaJQsQxrfkrs1CWfYiVPvnvGlEJTo/GSPTP00ilim2Or/DUq0BI0rO2mJk1KYSnRu8tKRoMm0KhfspODRGbK0Nbgk0UpFKUb+l3cWA2ZQqa8+8VVmLj+Vrfe90wohaHIT8Z+5pJX7/AbIhOVZyxw9X7PgFIICv9osnmIwl18BBKkyyZYnTGef6p1olAnDAaHxia6FBgfLJZECB0amiikiYapkWUJUBbK5kojty0IYl+ZKJTJiiES14grJRoWCyPEqQgjXpcodMl9O5aHVSOZ1QgVL5mwFuRuaEiikCRL7sZVJrwYKZMyn0RpnZMJVaKjlnh9wpaVLJkyx1hg7sYlQlCmmRoac5xCpkq2JGKfm6mteZAkQOLZFxqJ2DKnSaBg5+d/ehrU5qGNkbXfoCHBsgeajI5WiUKV9FmpcEvoQSKkHPV326ajJVoQn6Q2KtajoGKESx/+o6baWJOYaiprWX3g0qpFpVB6a2OmEpTpr6qWsutEL35JLFbBDiSJsssu0eKxDuGiR6zR+tWsQM9m29geulILmbelPknuZHKKe5Co5/qFxqUJdduuakuwqq5AL87LGLxs6ssYJveqI0wgCvqLF63xQntuccKIiwsetvqLMEKVGMwYHuG2WssbFjO2rToVd0zaEm8IuitqIuPF754RG2wataL4mvISHy86M1bSqcvuzGfUfPOo9orbiaEpr6zoz0s4GDC+RHf8sZcp4zbt0gJZonC0E7M8syVUE6RMIi1763PKiYw5p8kMKWPI1cSObbBYhpitENqy5fLG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5Fqu5nqu6Jqu6joQAQEAIfkECQcA7AAsAAAAAPAA8ACHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBBQUFCQkJEBAQFxcXISEhIyMjJSUlKCgoKysrLy8vODg4QEBARkZGTk5OVlZWW1tbYGBgZGRkZ2dna2trbm5ucXFxdHR0d3d3e3t7fX19hISEi4uLkpKSl5eXnJycn5+foaKho6OjpKSkpKSkpaWlpaWlpaalpqampqemp6enp6inqKioqaqpqquqrK2sra6trq+ur7CvsLGwsbGxsbKxsrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKys7OztLS0tLS0tbW1tbW1tba1tra2uLi4urq6vLy8v7+/wMDAwcLBw8PDw8PDw8PDw8PDw8PDw8PDxMTDw8TDxMTExMTExMTExcXFxcXFxsbGx8fHx8fHx8fHyMfIyMfIyMfIyMfIyMjIyMjIyMjIyMjIyMnJycnJysrKy8vLzM3Nzs/P0NDQ0dHR0tLS09PT1NTU1dXV19fX2dnZ29vb3Nzc3d3d3t7e39/f4ODg4+Pj5eXl5+fn6Ojo6enp6unq6urq6urq6+vr6+vr7Ozs7Ozs7e3t7e3t7e7t7u7u7+/v8PDw8PDw8fHx8fLx8vPy8/Pz9PT09PX09fX19vb29vf29/f39/f3+Pj4+fn5+fn5/Pz8/f39/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CP4A2QkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8rk2OzXK1WlPEHys+fOF1oKaX25s8cPJE+lVL361Wym06csm9lKBQqR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srKysrKysrKysrKysrKysrKysrKysrOysrOysrOys7Ozs7SztLS0tbW1tra2t7e3uLi4ubq5uru6u7u7vLy8vL28vb29vr6+v7+/v7+/wcDBwsLCwsLCw8PDw8PDw8PDw8PDw8PDw8PDw8PDxMTExMTExMTExMTExMTExMTExMXExcXFxcXFxsbGxsbGxsfGx8fHx8fHx8fHx8fHx8fHx8jHyMjIyMjIyMjIyMjIysrKzMzMzs7O0NDQ0dHR0tLS09PT09PT1NTU1dXV1tbW2NfX2tra29vb3Nzc3Nzc3d3d3t7e39/f4eHh4uLj5OPk5eXl5ubm6Ojo6enp6enp6urq6urq6+vr6+vr7Ozs7Ozs7ezs7e3t7e3t7e3t7u7u7u7u7+/v8PDw8fHx8fHx8vLy8/Pz8/Pz9PT09PT09fX19vb29vb29/f39/f39/f3+Pj4+fn5+vr6+vr6+vr6+/v7+/v7+/v7/Pz8/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////CP4A2wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKlSWfMXMqcSdNkr0sZLlioQGFCBAcG2iiMRQaNmzqNLn0yxaqXs5pQo8qMBUcnBQgLFhgwoFUrVwMcFLIiE6SsWbJl2QjKVGpWTKlw42p0VudCBQlfs27dy3cvBoWrzAoWjJYsmTeVRNmSy7jxwjgWKDDY67WvZcp/E6YazLlzWTJlDIGa5bh0XFR2gV5ezfqCwlOeYxMmQxZNJVTHTOtmGeoCBb2sg1te4DphKdnIPeMRFWy3c5GtfFcWTr1vcYShkmvvLMjUsufgM/5mqDC9uvm9FhSC2s5+MJlKrcLLh8jqgoTy5/OnT+ipvX/BcITy3XwEGmRJBfkleNl+CGny339oBYEJLwUW6AaC+CmYXwUKXfLgh2ZVEkuF4KVBgYYo9sVhQh6CCCIZjbxComlxnJjijVutiFAlLr5YViOkzRgXJuThaCQFCknS45JBWPKLkFDtYoGRVBqAZEJKMtkj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9vb39/f39/f4+Pj4+Pj5+fn5+fn6+vr7+/v8/Pz+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8I/gDVCRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhTqlzJsqVLgsmWvZxJs6bFZbtaqSr16ZKhP3SsxFLY54EIEidSqGDxYsanXTajSmWpTFaqUJL2WHHjxorXr15bKZzB4UGHB2jLPihLAsWKF4GGTp1LFyOtU54Cbd3LFyxYVgplqEVLuHDasyVUvDgks67jxwZlmZoEp6/fy34BJ4RhuHNnDmU5fEDRQhDk01KJreo0p6tlzLC3rlLI2bNtw6DLilABYzbq3yl9nWLE9XXs41ZQKXxxu7ntDhxQvDAFvDpIZKokeXWNvDvYUwpd/jgf/1y6K+voL7by5L097FIKWwwmT39tWRUz0ut3iOxUIO7uBegVfAmxcFZ9CBZWggti7ecgQbqAIuCEfomi0AoJZmgWYSt48uB+sXBiHIXufXKhhigSpsIfH1b3yiUjkliiQiocmGKGoKVgR4uQyQIjgDJS2AmNNxb5QAqm8TgVL+wVF6SMbmiiUApG3giaCqAoWdMyo8T4pIBSJkRllSmC9sAKuWjpkip4fOmmV5tMSaaRHIwAg5oq3TKJl28GGCZCKcw3Z4ooRIKnSaU42eeXfx4U6KB0dsDCoSLFUsiiizZq0JiQFtlBByboQalHpACJ6ZOaFsRpp1VOOmpG/rkkcuqibsQpJquDnmDrqxSlouisbqZK0Kq40vkCrxN9Auypwg5EbLFGqgAMsg7lcumymDYr0LPQFmkCJdQutAq2s2qrDrfdWnlnuAeVQm65cqYLqavsDtTku9lOKai8RXKggjL1BsMIvvDeyi+kJ6QSbi5/EFwwoPseXGYHJEyCbC1yOHxqlFPaKDGZIByCrCoaMxvvx2RycCy1ppTcJ8cGo9wvBy7U667LwZ4s8430sisKzk/CDOjOVq5QL0GfmAp0e0I7SnSKKiBzNEEiLj1h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ACH5BAkHAOwALAAAAADwAPAAhwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgsLCxcXFyYmJi4uLjMzMzc3Nzg3ODk5OTk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkREREVFRUZGRkdHR0dHR0dHR0hISEhISElJSUpKSktLS01NTVBQUFNTU1ZWVlpaWl5eXmZlZW1tbXR0dHl5eXx8fIGBgYSEhIeHh4mJiY2NjZKSkpaWlpuamqCfn6SkpKuqqrCvr7KxsbKxsbKxsbKxsbKxsbKxsbKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKzsrKzsrOzs7S0tLS1tLW1tba2tre3t7i4uLm6uru7u72+vr/Av8HBwcPDw8PDw8PDw8PDw8PEw8TExMTExMTFxMXFxcbGxsfHx8fHx8fHx8jHyMjHyMjIyMjIyMrKysvMzM3Nzc/Pz9HR0dHR0dLS0tPT09TU1NXV1djY2Nra2tvb29zc3N7e3t/f3+Hh4eTk5OXl5ebm5ufn5+np6enp6erp6erq6uvr6+vr6+zs7Ozs7O3t7O3t7e3t7e7u7u7v7u/v7/Dw8PHx8fHx8fLy8vPz8/T09PX19fX19fb29vf49/r6+vv7+/z8/Pz8/P39/f7+/v7+/v7+/v7+/v7+/v7+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wj+ANkJHEiwoMGDCBMqXMiwocOHECNKnEixosWLGDNq3Mixo8ePIEOKHEmypMmTKFOqXMmypcuXMGPK5OiMWK1XqkhxesTokJxcCnPJOcToESdSql7VIuZsptOnLJ3temWqkiI5WLEOyrq1lsJaWcNyVVTJlKtdTaGqXYuxV6tQjMQO2io27CyFs+qGpStnrpxGolr1Yku4MMJdqzAR0stYbiyFsfg2ZjwI0ypdhjM/ZRYrlE+6kifXhaUQVmjRe7cOOhQqFjPNsFUiayWpL+rbWF0pfIW7t6RWyGILB9ns1SXbvXGzUsgqee9BlV41G079Yi1RyJ3jXqVwlfbboEP+ea1OvmEzVnGzf0etSqGq0+v1qmbEanr5+wSHldIKPz7jUwqd4h9ufJUyDH7l5RKKegPeRopCpPTXYGOgAIVgbLZoMuF3oyg0yobJbcXJLRcatgsnIH4XikILpugcJ5iVCFUxo0joIoUKgXKjdqIUI6NMzqCi1Y7JgZIjkdqhktaPLMGSCJLaGZmQjlAmlwhpTKb0CyZVOjeIlAhR2SWBmPySpUmqMDimaGAeJOaaovnV3pkh5eIInCG2adCbeKLmiIV0cvRen0UeSSh4cswZKEbCQKLmoYzpWRCfkE4GiTCLWuRKpYVOyWlvr2Q60Yc2fqqVpASBUqqpWHUoqkP+wdy5KquoDkQpq4w5EsyrC8XS16y0GorrZHQ9xutBgw6L2pc5AjusoscKhJ2yuNUq0K3UyiWHKNGys0xt2d5mLTvYhisWJMvwGkxczg7L7JTt4joXI7tm+ksh5lYrbL6TFWJmprzxy+a+Atc1SKivNldwpAQvnBV3x6bpsFjjlpvvXNDyekq8pr4b5sRhAditQB+CLEfFJsvh6sgCteiwx25OvNW4rzrD5cQoT4zJkln+y5AzleDcrMOV2MfQI9QFUwjCDDUT9MI5F1y0Q1WcgIlwy6QHMUPMPC1w1Pxe8lpDUUwwQQpMZwYuVhknlIzX5sK8p9TJONSECSZMYEL+CzwTNu2QIjOEDNzhgh3uJcE1vYTZjJuARGYSy7XyQsccF3fFqv3qbiXHNIRMEoyHPkEThUVGWSh9I0QM4ZwOEgoszIyt0DPNJBNLKn8PeehWlRDT0DBF6C0641ewFYxflGFitELDVMLxhpWwIjtGzRiTCn/PxzfIJQcylIsNww+fyVp3EitHJdMn9AvrO/KFSvoeOWM9aF1C50tDs8ggfPiMr1D3UyW7Dfoa0gv2gYguxliJ7cZ0icEwJBb641/o8paEp2wqOZX430JyYcAJiQJ+KknG9W60lUsASiGuiKAEJzgBKswkGN+pROI26LwDhgKEL+lFI7Inn0qcMCH+q1DhCodHs5M4SjvQ6Zz3gsbDrNyQMG9rYlZ82JBTCHGIE2RBTCIXQ98tsYmiWB4Ur8dDEzZkFPrLGxbDRzqX5KKJ0OkeDb8zCG4NpxkBdA4VGRKKK65RdCZQhEvK5x/o+CwoHWTME8nTC+3scSGX8OMfJ7iClnBxQA1sSC4sdxsv4qeRj+LK+X6IEEdIcpKia2NKfCFFsTwyKJw8HZMSiRUzMoQRp0Rl4yZwCZXcLEWvTAgHJ4PDT04mmAjBpS7XWIOUwIJIyDzIMOtix0CxL5oGUeYy12iFkzjjSdAkpTQJh6VMgXKK4sxmLrcpuhTUiyRCghI2CzJNORQzS+f+nCdBtMnONTKhJMYYkz4HwsFKsIwRAxUIP/u5xlKQJHfyTGdBEsgydshRIQtlKBYfJ5Jd4CmhFX1IRjWKxUaIBEUflWhIRbpOkobPByG5xaFAutJkttSl4UMESFBKKJrWdJ83xenwdvARoVTKpz8dqVDXyAiPuAxSSA2pUpeKxSJ0ZBiskuFPFyKJoFI1fNXMyH5MZdCtKoQWKvjqNpewkWbgyqwMcYRatzkejCjsU3BtCBTmqssoaCQ9nKprXhVyA75OUgUZAcunAjfY0qTVsGvcAkYgeqjGOgQWkF3jES7iVrxa1iF7zewQbWGRgFUqbZ8tTWFFK8EqWISWXUr+7UPkylr+yaAiyPjUDGXLECXUln/LmUgrPMvbhmD2t8ObAkXWVtniPgQLyBVdDCbCDE6h1rkLWW10zWYsiPiqUtiFCG23O4FuRuSpfRJseBmi3egaQSI+gdR6IQJd8qIgIh6FFGPnuxBYtBe5Jn2Id+TL3+eSdwJPgMgvCVXgh/iXvDaAyGIOJcYGKyS00T1B6hByTgZb+LIHRlpDhnuo3X44u+RVbkMou6YTG3i7m20IYPvkYhBvF7E/g5SJa5yQ/9ZWpQLJr4d5HFfyNnUhpqUxkRly3Oi6cCGmKPGSG+Jj0bJ1IbDd0ZT1ul0aMGQRzd2yQsb72xQsxBkEFnP+QpqMXE8ehBhSVjNht/ughCi2TxWWM0Ew/FvJJiTJcNLzmLfr2oRcssWCRgiba6vKg5AizIkuyKJZqwSF8BRO+430QB77W6ImhJBw2rGm2VFlyFYyITNek6g1zWfWmjkh8cXTqA9S39/eNyGQnrVAav3bDQskF7WYRSxg4QpWrEIVpyDFKEIBimY7+9nQjra0m63rgpgiCNjOtra3ze1uY7sISVACE5rwhChQwQpY0MIXFuHrarv73fCOt7znTe962/ve+M63vvfNb7YAW9jENjaylc3saRv84NSON8IXLu1QjIIUp1DFKljxCljEYha1UGmuq71xgsQ60PEm1CH+MDrkdxPqyKUk1CE53idHWJpQW6t2XvrECQj1FN6HqjNCDj0mnBOqbQQBNKLdfajrEuTOsjY5odRbEDir3N1oJpSbDRL1PsV81JBqt0DAXHKsE2oRDMnyjYh+cygfauWJrjqeTMEQoY/p6omGlNELImQle51Qu8jx2WeddRkfCu5yhhTKF8LinmsaUmFVCImfnujOEqoVDunwRyNdKQc2ZMJdVzOkCKFgSAF+yTMn1NUEDF49V+rzhzm9nEOP94h83O5brtTIz1up7i45oJBaUUS+m+Ylc8r2Dqmu6m/PqXsmhLmZPzGnJEGRxf+dyJ+C/ERyy6k8F1i3FRE7kmr+/KmyUsTteEI9dh0vd4uQv/fX/5T1H1J4OCV+vaZ6v0SQ7vkCC+hTTJ9Iqve+3vMfavAWcVecMl+sElzUwyriN1i4sn4SMVafkoBmhSsOtRFYRVbpIltAwyoXlRHo1VNAZlb1lHseYVRQ9YFwFYKEYoIScWkpNV8oCCc19xEy5YEF9oJjQiI71SdRlVc2CCUxCBJ11yU7OFg9SCR5JxLt5yIgZXyLsmr0pH0DIn8dgXtVAlIcNHeZMkqaBIXxQVEjEU9IYoVPg4V0gk5bWCWoYBLfFIYmiIJKlCnL4EptyIVWonUd8Uw7IoZ6QYYXwhh6uCPlZBILBj1z2BhS2If+jfGHKTJ6KPELSliIosGH1CF5eqGIG4J2JcFz61EJlodIvSEjvQFSBQQiQGcSoBYflYCJBlGEjCGJhuFIJrg+E+JyLUGCqLiBCMGKk+GKasF7emSCzdMgOGhJ/tE7Z+gfvCgTvhhDJrg6/lGKKXFEjvSGnjghydgSy4iKJngMdIgVkCATMORITkgQuqgd14gSNwJSg/Md7wQT4JeIGlSNNyIKw/gScRhODfE2znGOJJFHojFADDGKVcKPHCFQnZgQXdMbkzMTp+iHDDgQsggnr1CPInGPcJKK5pFltAgV4TgZO/M73bghr0CNGmGRM4WLB2EzqNGOT5GNYYE6DeH+jLgiCiMpEcvgkkc1dQjhDB0YFsAHFZq4kAnBjfxiONTCOQ7hj1kBjU5BWZmGEOtYlA1zlONIEPcXFocIFczFlAShj18zlUcZj+4RFswHG1mDFQa4EAlZMEYZLgDJEArDCBcIG0rDi07jMG3plg85EK9QCCypGapIdSF5KHnplnYIkYGikkLjKTpzmJnSk1LJmBOjexWllGwJlvwilBqTMieDmfzylJmiiZcpmSbDlUwigCZTmAWTlovyjlDjmQVDkMNxL5yZFapZMP4iKutSm51JmiZDL7zyLbV5m/kiCXPJK0mYL8QZLlm5KKKpnLAZLqa5KDgJnb5ZMD85MrH+spgf4zC6AleWWTjRiSuaWVOuOSzLaSqyqZvSaC7pWSmQ8JeD9Zym8p6HMp1bdQsNiSv2iSeOQJHFRZ+Q0p9rgp+NtSXUQqBVUiYn5iToOZ5rciU8FiT8CaFdoiRTZgzJOSYK6iKi4IVbdiKcQpkHAZlrwglHKGi3wIJwUp4kAykjomsKQig652iEEgoqKGb6gSegKRBXOSYGQm/nsX87wpQCOiH0sZfVdh1VIn4DhiSikH/3VhyDKRqsWRCoCSLRoaT2NhvI1yC68Wcu8htV2W/swBmeMSGBaBB4OCCs4RpmKhGIoRjxkZ0DUZ2oQQiWkaJxahFuIQpEOhl3kRBFrHcbjBAYB9mnGyEVVFEJXNcYUioQ9FcXi1AWr4AWipoSNXETOcEJjtATPxEUQ8EIjnAUSbEUjpmpqrqqrNqqrvqq9xYQADsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

        let [localStorageHistory] = JSON.parse(localStorage.getItem("_ht"));
        const mangaCode = localStorageHistory.serie_code;
        let chapterCode = localStorageHistory.read_chapter_codes;
        let currentChapterId = localStorageHistory.read_chapter_id;

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
                targetElement.insertAdjacentElement("afterend", img);
            }
            return img;
        };

        const getReadData = async (cc, isNext = 0) => {
            let loading;
            if (isNext == 1) {
                loading = createLoadingElement();
            }
            try {
                const res = await fetch(`/v2.0/apis/manga/reading?code=${cc}&v=v3.1818134`, getHeaders());
                const readJson = await res.json();
                if (readJson?.msg !== "success") {
                    loading?.remove();
                    console.error("取得章節資料錯誤", readJson);
                    return "ERROR";
                }
                if (isNext == 1) {
                    if (isLogged) {
                        fetch("/v2.0/apis/uu/readLog", {
                            "headers": {
                                "accept": "application/json, text/plain, */*",
                                "x-requested-id": new Date().getTime(),
                                "x-requested-with": "XMLHttpRequest"
                            },
                            "body": `code=${readJson.data.manga_code}&cid=${readJson.data.id}`,
                            "method": "POST"
                        });
                    }
                    loading?.remove();
                }
                return readJson.data;
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
            const title = data.manga_name + " - " + data.chapter_name + " - 嗨皮漫画";
            const url = "https://m.happymh.com/mangaread/" + id;
            history.pushState(null, title, url);
            document.title = title;
        };

        const createComments = async () => {
            isOpenComments = true;

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
                overflowY: "auto",
                overflowX: "hidden"
            });
            document.body.append(div);

            const button1 = document.createElement("button");
            button1.className = "close-comments";
            button1.innerText = i18n.button.closeComments;
            button1.style.marginTop = "10px";
            button1.style.marginLeft = "10px";
            button1.addEventListener("click", () => {
                div.remove();
                isOpenComments = false;
            });

            div.insertAdjacentElement("beforeend", button1);
            const messageHtml = `
<div id="message" class="MuiCardContent-root" style="padding: 3rem 16px; display: flex; flex-direction: column; -webkit-box-pack: center; justify-content: center; -webkit-box-align: center; align-items: center; text-align: center; min-height: 260px;width: 100%; background-color: rgb(255, 255, 255);">
  <svg class="MuiSvgIcon-root MuiSvgIcon-colorAction MuiSvgIcon-fontSizeMedium" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="user-select: none; width: 1em;height: 1em; display: inline-block; fill: currentcolor;flex-shrink: 0; font-size: 1.5rem; color: rgba(0, 0, 0, 0.54); transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1);">
    <path d="M21.99 2H2v16h16l4 4-.01-20zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"></path>
  </svg>
  <h6 class="MuiTypography-root MuiTypography-h6" style="margin: 0px; font-family: Roboto, Helvetica, Arial, sans-serif; font-weight: 500; font-size: 1.25rem; line-height: 1.6; letter-spacing: 0.0075em;">数据请求中...</h6>
</div>`;
            div.insertAdjacentHTML("beforeend", messageHtml);
            div.insertAdjacentHTML("beforeend", '<ul class="MuiList-root MuiList-padding" style="display: block; padding-left: 10px;"></ul>');

            const ul = ge("ul", div);

            let loop = true;
            let pn = 1;

            const getComments = () => {
                return fetch(`/v2.0/apis/comment?code=${mangaCode}&ch_id=${currentViewChapterId}&pn=${pn}&order=time&from=read`, getHeaders()).then(res => res.json()).then(json => {
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

            const button2 = document.createElement("button");
            button2.className = "close-comments";
            button2.innerText = i18n.button.closeComments;
            button2.style.marginBottom = "100px";
            button2.style.marginLeft = "10px";
            button2.addEventListener("click", () => {
                div.remove();
                isOpenComments = false;
            });
            div.insertAdjacentElement("beforeend", button2);
        };

        const createPageElement = (data, isFirst = 0) => {
            const fragment = new DocumentFragment();
            let mainContent = ge("#mainContent");
            if (!mainContent) {
                const targetElement = ge("article"); //ge("article:has(>div[id^='imageLoader'])");
                mainContent = document.createElement("div");
                mainContent.id = "mainContent";
                targetElement.insertAdjacentElement("afterend", mainContent);
            }
            if (isFirst === 0) {
                const title = document.createElement("div");
                title.className = "chapterTitle";
                title.innerText = data.chapter_name;
                title.dataset.chapterId = data.id;

                let filteredTitle = title.innerText;

                //自定義標題關鍵字排除列表
                const keywordsToExcludes = textExcludeRegExp.split("\n").filter(item => item);

                if (keywordsToExcludes.length) {

                    //打印關鍵字排除列表
                    console.log("標題關鍵字排除列表:", keywordsToExcludes);

                    const keywordRegExps = keywordsToExcludes.map(key => new RegExp(key, "g"));
                    //打印標題關鍵字正規表達式排除列表
                    console.log("標題關鍵字正規表達式排除列表:", keywordRegExps);

                    let modify = false;

                    //循環檢查並移除關鍵字
                    keywordRegExps.forEach(reg_exp => {
                        //檢查並打印匹配結果
                        const matches = filteredTitle.match(reg_exp);
                        if (matches) {
                            modify = true;
                            //打印移除前的標題
                            console.log(`移除關鍵字 "${reg_exp}" 前的標題:`, filteredTitle);
                            //只移除匹配的部分
                            filteredTitle = filteredTitle.replace(reg_exp, "");
                        }
                    });

                    if (modify) {
                        //去除多餘的空格
                        filteredTitle = filteredTitle.replace(/\s+/g, " ").trim();

                        //打印最終顯示的標題
                        console.log("最終過濾後的標題:", filteredTitle);

                        title.innerText = filteredTitle;
                    }

                }

                titleObserver.observe(title);
                fragment.append(title); // 將標題添加到文檔片段中
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
                const cid = currentData.next_cid;
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
                    const nextA = ge("//a[text()='下一话' or text()='下一話'][starts-with(@href,'/mangaread/')]");
                    const prevA = ge("//a[text()='上一话' or text()='上一話'][starts-with(@href,'/mangaread/')]");
                    if (!("next_cid" in currentData)) {
                        const nextUrl = "/manga/readMore/" + mangaCode;
                        nextChapterUrl = null;
                        if (isEle(nextA)) {
                            nextA.href = nextUrl;
                        }
                    } else {
                        const nextUrl = "/mangaread/" + currentData.next_cid;
                        nextChapterUrl = nextUrl;
                        if (isEle(nextA)) {
                            nextA.href = nextUrl;
                        }
                        if (configs.preload == 1 && ("next_cid" in currentData)) {
                            preloadNext(currentData.next_cid);
                        }
                    }
                    if ("pre_cid" in currentData) {
                        const prevUrl = "/mangaread/" + currentData.pre_cid;
                        prevChapterUrl = prevUrl;
                        if (isEle(prevA)) {
                            prevA.href = prevUrl;
                        }
                    }
                    const pagerTitles = gae(".chapterTitle");
                    if (pagerTitles.length > 3) {
                        const parentE = pagerTitles[0].parentNode;
                        pagerTitles[0].remove();
                        const nodes = [...parentE.childNodes];
                        for (let i = 0; i < nodes.length; i++) {
                            if (nodes[i].className === "chapterTitle") {
                                break;
                            }
                            nodes[i].remove();
                        }
                    }
                }
            } else {
                hiddenElementArray.forEach(e => (e.style.display = ""));
            }
        };

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
            gae("#root>div>div").forEach(e => {
                e.style.display = "none";
                hiddenElementArray.push(e);
            });
            const firstE = ge("article")?.firstElementChild;
            if (isEle(firstE) && !firstE?.id?.startsWith("imageLoader")) {
                const targetElement = ge("article");
                targetElement.insertAdjacentElement("beforebegin", firstE.cloneNode(true));
            }
            createPageElement(readData, 1);
            currentData = readData;
            if ("next_cid" in currentData) {
                preloadNext(currentData.next_cid);
            }

            const button = document.createElement("button");
            button.id = "open-comments";
            button.innerText = i18n.button.openComments;
            Object.assign(button.style, {
                fontSize: "1rem",
                color: "#fff",
                borderStyle: "solid",
                borderColor: "#673ab7",
                backgroundColor: "#673ab7",
                borderRadius: ".5rem",
                left: "24px",
                right: "auto",
                top: "auto",
                bottom: "36px",
                position: "fixed",
                zIndex: "9999",
                display: "none"
            });
            document.body.append(button);
            button.addEventListener("click", () => createComments());

            let lastScrollTop = 0;
            document.addEventListener("scroll", event => {
                let st = event.srcElement.scrollingElement.scrollTop;
                if (st > lastScrollTop) {
                    button.style.display = "none";
                    lastScrollTop = st;
                } else if (st < lastScrollTop - 40) {
                    button.style.left = (ge(".MuiContainer-root").offsetLeft + 24) + "px";
                    button.style.display = "";
                    lastScrollTop = st;
                }
            });

        }
    }

})();
