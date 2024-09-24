function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,i={},r={},o=t.parcelRequirec260;null==o&&((o=function(e){if(e in i)return i[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return i[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){r[e]=t},t.parcelRequirec260=o);var a=o.register;a("27Lyk",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>i,set:e=>i=e,enumerable:!0,configurable:!0});var i,r=new Map;i=function(e,t){for(var i=0;i<t.length-1;i+=2)r.set(t[i],{baseUrl:e,path:t[i+1]})}}),a("hb4bE",function(e,t){e.exports=new URL("Icon-star.a3f2bf92.svg",import.meta.url).toString()}),a("JGhco",function(e,t){e.exports=new URL("icon-2.f0864db5.svg",import.meta.url).toString()}),o("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["2BF4I","index.709c2144.js","aKksN","Icon-star.a3f2bf92.svg","eIkw6","icon-1.aab9efc5.svg","eRurN","icon-2.f0864db5.svg","gxBhk","icon-3.1aef766b.svg","jgrKg","index.a2a2b4a2.js"]'));var n=o("fhN3L"),c=o("gdelx"),s=o("ldYvH"),d=o("hb4bE"),l={};l=new URL("icon-1.aab9efc5.svg",import.meta.url).toString(),o("JGhco"),new URL("icon-3.1aef766b.svg",import.meta.url).toString();const v=document.querySelector(".results"),_=document.querySelector("#searchInput"),m=(0,n.initializeApp)(s.firebaseConfig),u=(0,c.getDatabase)(m);async function p(){let t=_.value,i=await fetch(`http://www.omdbapi.com/?apikey=99542785&t=${t}&plot=full`);!function(t){if(v.innerHTML="","False"===t.Response){v.innerHTML=`<p>${t.Error}</p>`;return}let i=document.createElement("li");i.classList.add("movie-card");let r=g(t.Plot||"N/A",350),o=(t.Plot||"N/A").length>=350;if(i.innerHTML=`
  <div class="movie-card__main-container">
    <div class="movie-card__poster-container">
      <img src="${t.Poster}" alt="${t.Title} poster" class="movie-card__poster">
    </div>
    <div class="movie-card__container">
      <div class="movie-card__header">
        <p class="movie-card__title">${t.Title}</p>
        <div class="movie-card__rating">
          <img src="${/*@__PURE__*/e(d)}" alt="movie ratings" class="movie-card__rating-icon">
          <span class="movie-card__imdb-rating">${t.imdbRating||"N/A"}</span>
        </div>
      </div>
      <div class="movie-card__info-container">
        <div class="movie-card__info">
          <p class="movie-card__runtime">${t.Runtime||"N/A"}</p>
          <p class="movie-card__genre">${t.Genre||"N/A"}</p>
          <div class="movie-card__watchlist">
            <img src="${/*@__PURE__*/e(l)}" alt="A button to add the movie to the watchlist" class="movie-card__watchlist-icon" id="buttonAddToWatchList-${t.imdbID}">
            <span class="buttonAddToWatchList" id="buttonAddToWatchList-${t.imdbID}">Watchlist</span>
          </div>
        </div>
        <div class="movie-card__description">
          <p class="movie-card__description-text">${r}
          ${o?'<button class="movie-card__read-more">Read More</button>':""}
          </p>
        </div>
      </div>
    </div>
  </div>
  `,i.querySelector(`#buttonAddToWatchList-${t.imdbID}`).addEventListener("click",()=>{(function(e){let t=(0,c.ref)(u,"watchlist/"+e.imdbID);(0,c.set)(t,e).then(()=>{console.log("Movie added to watchlist successfully")}).catch(e=>{console.error("Error adding movie to watchlist:",e)})})(t)}),v.appendChild(i),o){let e=i.querySelector(".movie-card__read-more");e.addEventListener("click",()=>{!function(e,t){let i=e.closest(".movie-card__description").querySelector(".movie-card__description-text");"Read More"===e.textContent?(i.textContent=t,e.textContent="Show Less"):(i.textContent=g(t,350),e.textContent="Read More")}(e,t.Plot||"N/A")})}}(await i.json())}function g(e,t){return e.length>=t?e.substring(0,t)+"...":e}console.log("Firebase initialized:",m),document.querySelector(".search-form").addEventListener("submit",function(e){e.preventDefault(),p()});
//# sourceMappingURL=index.709c2144.js.map
