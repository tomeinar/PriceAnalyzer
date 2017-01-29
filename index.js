import {PriceSearch} from './app/search';

const tidssonenBaseUrl='http://www.tidssonen.no/forum/forums/klokker.9/';

let search = new PriceSearch(tidssonenBaseUrl);

search.find();