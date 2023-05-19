console.log('cao');


setTimeout(function() {


    // RELOAD IF HAS PARAM "RELOAD=sec"
    let searchParams = new URLSearchParams(window.location.search)
    if( searchParams.has('reload') && searchParams.get('reload') && searchParams.get('reload') > 1 )
    {
        chrome.runtime.sendMessage({method: "insertCSS"});

        console.log('PLUGIN INIT Magic Eden Activity Full Screen');

        $('#sidebar').hide();

        var divs = $('.carousel-container').children();
        $(divs[0]).hide()
        $(divs[1]).hide()
        $(divs[2]).hide()
        $(divs[3]).hide()
        $(divs[4]).hide()
        $(divs[5]).hide()

        const highestActivityCollections = $(divs[7]);
        const latestSales = $(divs[6]);

        highestActivityCollections.insertBefore(latestSales);

        highestActivityCollections.addClass('highestActivityCollections');
        latestSales.addClass('latestSales');

        // remove "sold for"
        const strings = latestSales.find('.react-horizontal-scrolling-menu--item a > div > div > span:nth-of-type(2) > span:nth-of-type(2)');
        for (let i = 0; i < strings.length; i++) {
            let text = $(strings[i]).text();
            text = text.replace("SOLD FOR ", "");
            $(strings[i]).text(text);
        }

        setTimeout(function() {
            location.reload();
        }, (searchParams.get('reload') * 1000) );
    }

}, 700); // you can set 50 on fast pc

