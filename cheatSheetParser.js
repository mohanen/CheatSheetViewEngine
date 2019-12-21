function cheatSheetParser(HtmlString) {
    // return HtmlString;

    HeaderWrapperAttr = {
        1: 'class=""',
        2: 'class="col-3 mw-300"',
        3: 'class="cheat-card-content ovrflw-auto"',
        4: 'class=""',
    }
    HeaderChildWrapperAttr = {
        1: 'class="row"',
        2: 'class="cheat-card ovrflw-auto"',
        3: 'class="chld-seperators"',
        4: 'class=""',
    }

    headerAttr = {
        1: 'class="header-text"',
        2: 'class="cheat-card-title line"',
        3: 'class="cheat-card-content-title"',
        4: 'class=""',
    }

    nest_header_max = 3;

    headersStack = []
    for (i = 0; i < HtmlString.length; i++) {
        if (HtmlString[i] != '<') continue;
        i++;

        if (HtmlString[i] == 'h' && parseInt(HtmlString[i+1]) <= nest_header_max) {
            i++;
            if (headersStack.length > 0) {
                while (parseInt(HtmlString[i]) <= headersStack[headersStack.length - 1]) {
                    headersStack.pop()
                    element_div = "</div>"
                    HtmlString = HtmlString.slice(0, i - 2) + element_div + HtmlString.slice(i - 2)
                    i += element_div.length;
                }
            }
            headerWeight = parseInt(HtmlString[i]);
            headersStack.push(headerWeight)
            element_div = "<div " + HeaderWrapperAttr[headerWeight] + ">"
            headerClassTag = " " + headerAttr[headerWeight] + " "
            HtmlString = HtmlString.slice(0, i - 2) + element_div + HtmlString.slice(i - 2, i + 1) + headerClassTag + HtmlString.slice(i + 1)
            i += element_div.length + headerClassTag.length;

        } else if (HtmlString[i] == '/' && HtmlString[i + 1] == 'h') {
            i += 2;
            headerWeight = parseInt(HtmlString[i]);
            headersStack.push(headerWeight)
            while (HtmlString[i++] != '>');
            i++;
            element_div = "<div " + HeaderChildWrapperAttr[headerWeight] + ">"
            HtmlString = HtmlString.slice(0, i) + element_div + HtmlString.slice(i)
            i += element_div.length;

        } else if (i == HtmlString.length - 1) {
            if (headersStack.length > 0) {
                while (parseInt(HtmlString[i]) <= headersStack[headersStack.length - 1]) {
                    headersStack.pop()
                    element_div = "</div>"
                    HtmlString = HtmlString.slice(0, i - 2) + element_div + HtmlString.slice(i - 2)
                    i += element_div.length;
                }
            }
        }
        i--;
    }

    HtmlString = HtmlString.replace(/<table>/g, "<table class='uk-table uk-table-striped uk-table-small uk-table-middle uk-overflow-auto'>")
    HtmlString = HtmlString.replace(/<blockquote>/g, "<blockquote class='uk-card-footer'>")

    return HtmlString;

}

