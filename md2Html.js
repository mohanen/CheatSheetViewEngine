var classes = {
    h: ["", "", ""],
    t: "    ",
}

function md2Html(md) {
    var markupStack = [];
    htmlString = "<div class='content'>";
    for (i = 0; i < md.length; i++) {
        switch (md[i]) {
            case '#':
                headObj = parseHeader(md, i + 1, 1);
                i += headObj.size - 1;
                if (headObj.isTrue) {
                    markupStack.push({ type: "head", size: headObj.size });
                }
                htmlString += "<h" + headObj.size + " class=" + classes.h[headObj.size] + ">";
                break;

            case '*':
                asterixObj = parseAsterix(md, i + 1, 1);
                i += asterixObj.size - 1;
                if (markupStack.length >= 1)
                    console.log(markupStack[markupStack.length - 1].size, " -  ", asterixObj.size)
                if (markupStack.length >= 1 && markupStack[markupStack.length - 1].size == asterixObj.size && (markupStack[markupStack.length - 1].type == "strong" || markupStack[markupStack.length - 1].type == "em")) {
                    lastVal = markupStack.pop();
                    element = asterixObj.size == 2 ? "strong" : "em";
                    htmlString += "</" + element + ">";
                } else if (asterixObj.isTrue) {
                    markupStack.push({ type: asterixObj.size == 2 ? "strong" : "em", size: asterixObj.size });
                    element = asterixObj.size == 2 ? "strong" : "em";
                    htmlString += "<" + element + ">";
                    // console.log(htmlString);
                }
                break;

            case '\n':
                if (markupStack.length >= 1 && markupStack[markupStack.length - 1].type == "head") {
                    lastVal = markupStack.pop();
                    htmlString += "</h" + headObj.size + ">";
                }
                break;

            default:
                htmlString += md[i];
                break;
        }
    }
    htmlString += "</div>"
    return htmlString

}


function parseAsterix(string, idx, size) {
    if (size == 2) {
        return { isTrue: true, size: size };
    }
    switch (string[idx]) {
        case '\\':
            return parseAsterix(string, ++idx, --size);

        case '*':
            return parseAsterix(string, ++idx, ++size);

        default:
            return { isTrue: true, size: size };
    }
}




function parseHeader(string, idx, size) {
    switch (string[idx]) {
        case ' ':
            return { isTrue: true, size: size };

        case '#':
            return parseHeader(string, ++idx, ++size);

        default:
            return { isTrue: false, size: size };
    }
}

