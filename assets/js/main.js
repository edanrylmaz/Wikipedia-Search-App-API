//#region Define elements
const submitForm = document.querySelector('.submit-form');
const inputField = document.getElementById('input');
const searchResults = document.querySelector('.results');
const clearBtn = document.querySelector('form > a');
//#endregion

//#region Add event listener
submitForm.addEventListener('submit', async (e)  => {
    e.preventDefault();
    const results = await Search(inputField.value.trim());
    try {
        if(results.query.searchinfo.totalhits === 0){
            alert("No results found.");
            return;
        }
        DisplayResults(results);
    }
    catch(err){
        console.log(err);
        alert('failed');
    }
});
clearBtn.addEventListener('click',e => {
    inputField.value="";
})
//#endregion

//#region Functions
async function Search(searchQuery){
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`;
    const response = await fetch(endpoint);
    if(!response.ok){
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}
function DisplayResults(results){
    searchResults.innerHTML="";
    results.query.search.forEach(result => {
        const url = `https://en.wikipedia.org/?curid=${result.pageid}`;
    
        searchResults.insertAdjacentHTML(
          'beforeend',
          `<div class="result-item p-1 d-flex flex-column justify-content-center gap-0-25">
            <h3 class="result-title">
              <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
            </h3>
            <a href="${url}" class="result-link link-blue" target="_blank" rel="noopener">${url}</a>
            <span class="result-snippet text-color">${result.snippet}</span>
          </div>`
        );
      });
}
//#endregion