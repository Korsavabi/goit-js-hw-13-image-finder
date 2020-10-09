export default {
    _query: 'cat',
    numberPages: 1,
    perPages: 12,
    async fetchImages(){
    
        this.API_key = '18578645-0ccef0fd529c1496f71dd195d';
        this.baseUrl = 'https://pixabay.com/api/';
        this.url = `${this.baseUrl}?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.numberPages}&per_page=${this.perPages}&key=${this.API_key}`;
        
        try {
            this.res = await fetch(this.url);
            this.getResponse = await this.res.json();  
        } catch (error) {
            throw displayError(error);
        }
        return this.getResponse.hits;
},
    setPage() {
        return this.numberPages++;
    },
    get query() {
        return this._query;
    },
    set query(newQuery) {
        this._query = newQuery;
    },
};
function displayError(error) {
    const errorH2 = document.createElement('h2');
    errorH2.textContent = error;
    refs.body.prepend(errorH2);
}