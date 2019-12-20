function cheatSheetParser(HtmlString) {
    // return HtmlString;

    HPrntDivClass = {
        1: "before section uk-margin-large uk-animation-slide-bottom",
        2: "before uk-card md-card uk-background-default uk-box-shadow-small",
        3: "before box uk-margin-large-bottom",
        4: "before",
    }
    HPrntDivAttrInner = {
        1: 'class="after uk-accordion-content" uk-grid="masonry: true"',
        2: 'class="after uk-card-body"',
        3: 'class="after uk-overflow-auto"',
        4: 'class="after"',
    }

    headerClass = {
        1: "after uk-accordion-title uk-heading-medium uk-heading-divider uk-text-light",
        2: "uk-card-header uk-card-title uk-heading-small uk-text-light",
        3: "after uk-heading-bullet",
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
            element_div = "<div " + HPrntDivAttrInner[headerWeight] + ">"
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

