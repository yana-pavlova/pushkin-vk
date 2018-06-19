jQuery(document).ready(function () {
    "use strict";
    var window = $(window),
        doc = $(document),
        loader = $("#loading"),
        posts = $("#posts").is(".active");

    window.on("scroll", function () {
        if (doc.height() - window.height() - 80 < window.scrollTop() && posts) {
            loader.show();
            var n = $("body").attr("id"),
                s = "js/sample-" + n + ".js";
            $.getScript(s, function () {
                setTimeout(function () {
                    $("#posts-container").append(html), 
                    twemoji.parse(document.body), 
                    loader.hide()
                }, 1e3)
            })
        }
    })
});