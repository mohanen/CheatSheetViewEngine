function cheatSheetParser(HtmlString) {
    // return HtmlString;

    HPrntDivClass = {
        1: "before section",
        2: "before",
        3: "before",
        4: "before",
    }
    HPrntDivClassInner = {
        1: "after columns",
        2: "after column",
        3: "after box",
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
            headersStack.push(parseInt(HtmlString[i]))
            element_div = "<div class='" + HPrntDivClass[parseInt(HtmlString[i])] + "'>"
            header_class = " class='column-head' "
            HtmlString = HtmlString.slice(0, i - 2) + element_div + HtmlString.slice(i - 2, i + 1) + header_class + HtmlString.slice(i + 1)
            i += element_div.length + header_class.length;

        } else if (HtmlString[i] == '/' && HtmlString[i + 1] == 'h') {
            i += 2;
            header_weight = parseInt(HtmlString[i]);
            headersStack.push(header_weight)
            while (HtmlString[i++] != '>');
            i++;
            element_div = "<div class='" + HPrntDivClassInner[header_weight] + "'>"
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