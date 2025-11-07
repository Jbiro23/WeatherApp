function canScroll(el) {
    return el.scrollWidth > el.clientWidth + 1;
}

export function initScroller(scrollerSelector, prevSelector, nextSelector) {
    const scroller = document.querySelector(scrollerSelector);
    const btnPrev = document.querySelector(prevSelector);
    const btnNext = document.querySelector(nextSelector);
    if (!scroller || !btnPrev || !btnNext) return;

    const STEP = 240;

    const refresh = () => {
        const ok = canScroll(scroller);
        btnPrev.style.display = ok && scroller.scrollLeft > 0 ? "flex" : "none";
        btnNext.style.display =
            ok && scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 1 ? "flex" : "none";
    };

    btnPrev.addEventListener("click", () => scroller.scrollBy({ left: -STEP, behavior: "smooth" }));
    btnNext.addEventListener("click", () => scroller.scrollBy({ left: STEP, behavior: "smooth" }));
    scroller.addEventListener("scroll", refresh);
    window.addEventListener("resize", refresh);
    setTimeout(refresh, 0);
}
