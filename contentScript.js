setTimeout(function() {

    // chrome.runtime.sendMessage({ action: "injectCSS" });

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

    if( searchParams.has('discount') || searchParams.has('prices')  )
    {
        console.log('Has Discount');

        var tableHTML = '<table class="discount-table" id="table-main">';

        if (searchParams.has('discount') && searchParams.get('discount')) {
            tableHTML+= '<tr>' +
                '<td class="my-a">Discount:</td>' +
                '<td class="lime">-'+searchParams.get('discount')+'%</td>' +
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
                '<td class="lime">'+priceBtc+' BTC <br/> $'+priceUsd+'</td>' +
            '</tr>'+
            '</table>';

            var tableFlip = '<table class="discount-table" id="table-flip">' +
                '<tr>' +
                    '<td rowspan="2">Flip</td>' +
                    '<td>'+pricesBtc[1]+'</td>' +
                    '<td> - '+pricesBtc[0]+'</td>' +
                    '<td class="lime"> = <b>'+profitBtc+'</b> BTC</td>' +
                    // '<td>'+pricesBtc[1] + ' - ' + pricesBtc[0] + ' = ' + profitBtc +'</td>' +
                '</tr>'+
                '<tr>' +
                    '<td>'+pricesUsd[1]+'</td>' +
                    '<td> - '+pricesUsd[0]+'</td>' +
                    '<td class="lime"> = <b>$'+profitUsd+'</b></td>' +
                    // '<td>'+pricesUsd[1] + ' - ' + pricesUsd[0] + ' = $' + profitUsd +'</td>' +
                '</tr>';
            '</table>';

            var tableFloor = '<table class="discount-table">' +
            '<tr>' +
                '<td>&nbsp;</td>' +
                '<td style="text-align:center;"><small>1.</small></td>' +
                '<td style="text-align:center;"><small>2.</small></td>' +
                '<td style="text-align:center;"><small>3.</small></td>' +
                '<td style="text-align:center;"><small>4.</small></td>' +
                '<td style="text-align:center;"><small>5.</small></td>' +
                '<td style="text-align:center;"><small>6.</small></td>' +
            '</tr>'+
            '<tr>' +
                '<td>BTC</td>' +
                '<td>'+pricesBtc[0]+'</td>' +
                '<td>'+pricesBtc[1]+'</td>' +
                '<td>'+pricesBtc[2]+'</td>' +
                '<td>'+pricesBtc[3]+'</td>' +
                '<td>'+pricesBtc[4]+'</td>' +
                '<td>'+pricesBtc[5]+'</td>' +
            '</tr>'+
            '<tr>' +
                '<td>USDT</td>' +
                '<td>'+pricesUsd[0]+'</td>' +
                '<td>'+pricesUsd[1]+'</td>' +
                '<td>'+pricesUsd[2]+'</td>' +
                '<td>'+pricesUsd[3]+'</td>' +
                '<td>'+pricesUsd[4]+'</td>' +
                '<td>'+pricesUsd[5]+'</td>' +
            '</tr>';
            tableFloor+= '</table>';

            $("h1:eq(1)").after(tableHTML);
            $('#table-main').after(tableFlip);
            $('#table-flip').after(tableFloor);
        }

    }

    // For Single Page to show

}, 700); // you can set 50 on fast pc

