// Our data object
var data = { githubFolders: [] };
const repoDetails = {
    github_api_url: "https://api.github.com/repos",
    username: "mohanen",
    repo_name: "cheatsheet_test",
}
const repo_url = repoDetails.github_api_url + "/" + repoDetails.username + "/" + repoDetails.repo_name;
const repo_content_url = repo_url + "/contents";


var vm = new Vue({
    el: '#folders',
    data: data
    // options
})

axios
    .get(repo_content_url)
    .then(response => {
        data.githubFolders = response.data;
        data.githubFolders.forEach((folder, index) => {
            axios
                .get(folder.url)
                .then(response => {
                    data.githubFolders[index].files = response.data;
                    vm.$forceUpdate();
                })
        });
    })

// helper functions
const hf = {
    toSentenceCase : function (text) {
        var result = text.replace( /([A-Z])/g, " $1" );
        return result.charAt(0).toUpperCase() + result.slice(1);
    },
    toHeaderCase: text => (hf.toSentenceCase(text).toUpperCase()),
    toMdFileCase: text => (hf.toSentenceCase(text).slice(0, -".md".length)),

}