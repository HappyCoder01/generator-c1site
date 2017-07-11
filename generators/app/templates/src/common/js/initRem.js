/**
 * 创建人：李智勇
 * 创建时间： 2017/5/9.
 * 描述：初始化html的font-size大小，主要用于解决移动端布局自适应
 */
(function (doc, win) {
    let docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            let clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = (100 * clientWidth) / 375 + 'px';
        };
    if (!doc.addEventListener||!docEl) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);