function ge(e) {
    return document.querySelector(e)
}

function geAll(e) {
    return document.querySelectorAll(e)
}

function hidetoolbar() {
    var e = e || window.event;
    if (e.wheelDelta < 0 || e.detail > 0) {
        $('.top-bar').attr('style', 'top: -74px;')
    } else {
        $('.top-bar').removeAttr('style')
    }
};
document.addEventListener('wheel', hidetoolbar);
document.addEventListener('DOMMouseScroll', hidetoolbar);

function keyhidetoolbar(e) {
    let key = window.event ? e.keyCode : e.which;
    if (key == '34' || key == '32' || key == '40') {
        $('.top-bar').attr('style', 'top: -74px;')
    } else {
        $('.top-bar').removeAttr('style')
    }
};
document.addEventListener('keydown', keyhidetoolbar);

setTimeout(() => {
    document.body.style.overflow = 'scroll';
    ge('#showimage').removeAttribute('class');
    ge('#showimage').setAttribute('style', 'text-align:center;font-size:2em;color:#FFFFFF;');
    geAll('.container').forEach(e => {
        e.setAttribute('style', 'width: auto!important;')
    });
    ge("a[href*='ShowPre']").remove();
    ge("span[class^='bottom-page']").remove();
    ge("a[href*='ShowNext']").remove();
    setTimeout(() => {
        ge('#cp_img').innerHTML = '';
    }, 500);
    for (let i = 1; i <= MANGABZ_IMAGE_COUNT; i++) {
        setTimeout(() => {
            $.ajax({
                url: 'chapterimage.ashx',
                data: {
                    cid: MANGABZ_CID,
                    page: i,
                    key: '',
                    _cid: MANGABZ_CID,
                    _mid: MANGABZ_MID,
                    _dt: MANGABZ_VIEWSIGN_DT,
                    _sign: MANGABZ_VIEWSIGN
                },
                type: 'GET',
                success: function(msg) {
                    let imgSrc = '<img src="' + eval(msg)[0] + '">';
                    $('#cp_img').append(imgSrc)
                }
            });
			MANGABZ_PAGE=i
        }, 1000 * i);
    }
}, 0)
