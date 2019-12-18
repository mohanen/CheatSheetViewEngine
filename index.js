const repoDetails = {
    github_api_url: "https://api.github.com/repos",
    username: "mohanen",
    repo_name: "cheatsheet_test",
}
const repo_url = repoDetails.github_api_url + "/" + repoDetails.username + "/" + repoDetails.repo_name;
const repo_content_url = repo_url + "/contents";

var defaultOptions = showdown.getDefaultOptions();
defaultOptions.simplifiedAutoLink = true;
defaultOptions.tables = true;
defaultOptions.smartIndentationFix = true;
defaultOptions.requireSpaceBeforeHeadingText = true;
defaultOptions.openLinksInNewWindow = true;
defaultOptions.emoji = true;
var converter = new showdown.Converter(defaultOptions);
converter.setFlavor('github');

var vueFolder = new Vue({
    el: '#folders',
    data: { githubFolders: [], enabled: true }
})

var vueFile = new Vue({
    el: '#file',
    data: { md: "", enabled: false }
})

function updateHome() {
    axios
        .get(repo_content_url)
        .then(response => {
            vueFolder.githubFolders = response.data;
            vueFolder.githubFolders.forEach((folder, index) => {
                axios
                    .get(folder.url)
                    .then(response => {
                        vueFolder.githubFolders[index].files = response.data;
                        vueFolder.$forceUpdate();
                    })
            });
        })
}

function openMd(mdFileUrl) {
    vueFolder.enabled = false;
    vueFile.enabled = true;

    axios
        .get(mdFileUrl)
        .then(response => {
            vueFile.md = response.data;
            console.log(response.data);
            vueFile.$forceUpdate();
        })
}

function home() {
    vueFolder.enabled = true;
    vueFile.enabled = false;
    updateHome();
}


// helper functions
const hf = {
    toSentenceCase: function (text) {
        var result = text.replace(/([A-Z])/g, " $1");
        return result.charAt(0).toUpperCase() + result.slice(1);
    },
    toHeaderCase: text => (hf.toSentenceCase(text).toUpperCase()),
    toMdFileCase: text => (hf.toSentenceCase(text).slice(0, -".md".length)),
    md2Html: function (mdString) {
        return converter.makeHtml(mdString);
    }
}

home();