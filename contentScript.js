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

    console.log('ushao unutra');

    if( searchParams.has('discount') || searchParams.has('prices')  )
    {
        console.log('Has Discount');
        var newDiv = $("<div>");
        newDiv.text('hello world');


        var tableHTML = '<table class="discount-table">';

        if (searchParams.has('discount') && searchParams.get('discount')) {
            tableHTML+= '<tr>' +
                '<td class="my-a">Discount:</td>' +
                '<td>-'+searchParams.get('discount')+'%</td>' +
            '</tr>';
        }


        if (searchParams.has('prices') && searchParams.get('prices')) {
            const btc = 27000;
            var prices = searchParams.get('prices').split(',');
            var pricesBtc = prices.map(function(price) {
                return price / 100000000;
            });
            var pricesUsd = pricesBtc.map(function(price) {
                return '$'+(price * btc).toFixed(0);
            });

            const profitBtc = ((prices[1] - prices[0])/100000000);
            const profitUsd = (profitBtc * btc).toFixed(0);

            var price = prices[0];
            var priceBtc = price/100000000;
            var priceUsd = (priceBtc * btc).toFixed(0);
            tableHTML+= '<tr>' +
                '<td>Price:</td>' +
                '<td>'+priceBtc+' BTC | $'+priceUsd+'</td>' +
            '</tr>';

            tableHTML+='<tr>' +
                '<td>Profit:</td>' +
                '<td>0.002 BTC | $'+profitUsd+'</td>' +
            '</tr>'+
            '<tr>' +
                '<td>&nbsp;</td>' +
                '<td>&nbsp;</td>' +
            '</tr>'+
            '<tr>' +
                '<td>Flip btc</td>' +
                '<td>'+pricesBtc[1] + ' - ' + pricesBtc[0] + ' = ' + profitBtc +'</td>' +
            '</tr>'+
            '<tr>' +
                '<td>Flip USDT</td>' +
                '<td>'+pricesUsd[1] + ' - ' + pricesUsd[0] + ' = $' + profitUsd +'</td>' +
            '</tr>'+
            '<tr>' +
                '<td>Floor:</td>' +
                '<td>'+pricesBtc.slice(0, 5).join(', ')+'</td>' +
            '</tr>'+
            '<tr>' +
                '<td>Floor:</td>' +
                '<td>'+pricesUsd.slice(0, 5).join(', ')+'</td>' +
            '</tr>';
        }


        tableHTML+= '</table>';

        // Append the table HTML to a container element in the HTML
        $("#tableContainer").append(tableHTML);

        // $(tableHTML).insertAfter("h1");
        $("h1:eq(1)").after(tableHTML);

        // $('#content > div').append(newDiv);
    }

    console.log('hello')
    // For Single Page to show

}, 700); // you can set 50 on fast pc

