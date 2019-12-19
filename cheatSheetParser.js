function cheatSheetParser(HtmlString) {
    // return HtmlString;

    HPrntDivClass = {
        1: "section",
        2: "columns",
        3: "column",
        4: "box",
    }
    // for (idx = 1; idx < 4; idx++) {
    //     HtmlStringArr = HtmlString.split("<h" + idx + ">")
    //     HtmlString = HtmlStringArr[0] + "<div class=" + HPrntDivClass[idx] + "><h" + idx + " class='is-full'>" + HtmlStringArr[1]

    //     for (i = 2; i < HtmlStringArr.length; i++) {
    //         HtmlString += "</div><div class=" + HPrntDivClass[idx] + "><h" + idx + " class='is-full'>" + HtmlStringArr[i]
    //     }
    //     HtmlString += "</div>"
    // }

    // HtmlString.replace("<table", "<table class='table'")
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