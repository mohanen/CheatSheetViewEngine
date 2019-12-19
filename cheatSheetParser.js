function cheatSheetParser(HtmlString) {
    // return HtmlString;

    HPrntDivClass = {
        1: "before section",
        2: "before column card",
        3: "before box",
        4: "before",
    }
    HPrntDivClassInner = {
        1: "after columns",
        2: "after card-content",
        3: "after ",
        4: "after",
    }

    headerClass = {
        1: "after",
        2: "is-primary is-light card-header card-header-title",
        3: "after",
        4: "after",
    }

    headersStack = []
    for (i = 0; i < HtmlString.length; i++) {
        if (HtmlString[i] != '<') continue;
        i++;

        if (HtmlString[i] == 'h') {
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
            element_div = "<div class='" + HPrntDivClass[headerWeight] + "'>"
            headerClassTag = " class='" + headerClass[headerWeight] + "' "
            HtmlString = HtmlString.slice(0, i - 2) + element_div + HtmlString.slice(i - 2, i + 1) + headerClassTag + HtmlString.slice(i + 1)
            i += element_div.length + headerClassTag.length;

        } else if (HtmlString[i] == '/' && HtmlString[i + 1] == 'h') {
            i += 2;
            headerWeight = parseInt(HtmlString[i]);
            headersStack.push(headerWeight)
            while (HtmlString[i++] != '>');
            i++;
            element_div = "<div class='" + HPrntDivClassInner[headerWeight] + "'>"
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
    console.log(HtmlString)
    return HtmlString;

}

/*
H1
    H2
    H2
        H3
        2 close
    H2
H1
    H2
        H3
*/