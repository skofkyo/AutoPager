let n = document.querySelector("img[src*='xiayizhang']").parentNode;
if (/javascript/.test(n.href)) {
    alert('沒有下一話了！')
} else if (MANGABZ_PAGE == MANGABZ_IMAGE_COUNT) {
    fetch(n.href)
        .then(res => res.text())
        .then((res) => {
            let doc = new DOMParser().parseFromString(res, 'text/html');
            let code = Array.from(doc.scripts).find(s => s.innerHTML.search(/MANGABZ_IMAGE_COUNT/) > -1).textContent;
            document.querySelector('#showimage+.container').outerHTML = doc.querySelector('#showimage+.container').outerHTML;
            document.querySelector('#cp_img').appendChild(document.createElement('script')).textContent = code;
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
                    MANGABZ_PAGE = i
                }, 1000 * i);
            }
        })
}
