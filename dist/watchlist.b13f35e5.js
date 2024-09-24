function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,r={},i={},o=t.parcelRequirec260;null==o&&((o=function(e){if(e in r)return r[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return r[e]=o,t.call(o.exports,o,o.exports),o.exports}var a=Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,t){i[e]=t},t.parcelRequirec260=o);var a=o.register;a("27Lyk",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>r,set:e=>r=e,enumerable:!0,configurable:!0});var r,i=new Map;r=function(e,t){for(var r=0;r<t.length-1;r+=2)i.set(t[r],{baseUrl:e,path:t[r+1]})}}),a("hb4bE",function(e,t){e.exports=new URL("Icon-star.a3f2bf92.svg",import.meta.url).toString()}),a("JGhco",function(e,t){e.exports=new URL("icon-2.f0864db5.svg",import.meta.url).toString()}),o("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["kc853","watchlist.b13f35e5.js","aKksN","Icon-star.a3f2bf92.svg","eRurN","icon-2.f0864db5.svg","jgrKg","index.a2a2b4a2.js"]'));var n=o("fhN3L"),c=o("gdelx"),s=o("ldYvH"),l=o("hb4bE"),d=o("JGhco");const v=(0,n.initializeApp)(s.firebaseConfig),m=(0,c.getDatabase)(v);function _(e,t){return e.length>=t?e.substring(0,t)+"...":e}console.log("Firebase initialized:",v),document.addEventListener("DOMContentLoaded",()=>{let t=document.getElementById("clear-watchlist"),r=document.querySelector(".watchlist");t&&t.addEventListener("click",()=>{let e=(0,c.ref)(m,"watchlist");(0,c.remove)(e).then(()=>{location.reload()})}),function(){if(!r){console.error("Watchlist container not found");return}let t=(0,c.ref)(m,"watchlist");(0,c.get)(t).then(t=>{if(t.exists()){let i=t.val();r.innerHTML="",Object.values(i).forEach(t=>{let i=document.createElement("li");i.classList.add("movie-card");let o=_(t.Plot||"N/A",350),a=(t.Plot||"N/A").length>=350;if(i.innerHTML=`
          <div class="movie-card__main-container">
            <div class="movie-card__poster-container">
              <img src="${t.Poster}" alt="${t.Title} poster" class="movie-card__poster">
            </div>
            <div class="movie-card__container">
              <div class="movie-card__header">
                <p class="movie-card__title">${t.Title}</p>
                <div class="movie-card__rating">
                  <img src="${/*@__PURE__*/e(l)}" alt="movie ratings" class="movie-card__rating-icon">
                  <span class="movie-card__imdb-rating">${t.imdbRating||"N/A"}</span>
                </div>
              </div>
              <div class="movie-card__info-container">
                <div class="movie-card__info">
                  <p class="movie-card__runtime">${t.Runtime||"N/A"}</p>
                  <p class="movie-card__genre">${t.Genre||"N/A"}</p>
                  <div class="movie-card__watchlist">
                    <img src="${/*@__PURE__*/e(d)}" alt="A button to remove the movie from the watchlist" class="movie-card__watchlist-icon" id="buttonRemoveFromWatchList-${t.imdbID}">
                    <span class="buttonRemoveFromWatchList" id="buttonRemoveFromWatchList-${t.imdbID}">Remove</span>
                  </div>
                </div>
                <div class="movie-card__description">
                  <p class="movie-card__description-text">${o}
                  ${a?'<button class="movie-card__read-more">Read More</button>':""}
                  </p>
                </div>
              </div>
            </div>
          </div>
          `,i.querySelector(`#buttonRemoveFromWatchList-${t.imdbID}`).addEventListener("click",()=>{(function(e){let t=(0,c.ref)(m,"watchlist/"+e.imdbID);(0,c.remove)(t).then(()=>{console.log("Movie successfully removed from watchlist")}).catch(e=>{console.error("Error removing movie from watchlist:",e)})})(t),i.remove()}),a){let e=i.querySelector(".movie-card__read-more");e.addEventListener("click",()=>{(function(e,t){let r=e.closest(".movie-card__description").querySelector(".movie-card__description-text");"Read More"===e.textContent?(r.textContent=t,e.textContent="Show Less"):(r.textContent=_(t,350),e.textContent="Read More")})(e,t.Plot||"N/A")})}r.appendChild(i)})}else r.innerHTML="<p>Your watchlist is empty.</p>"}).catch(e=>{console.error("Error loading watchlist:",e),r.innerHTML="<p>Error loading watchlist. Please try again later.</p>"})}()});
//# sourceMappingURL=watchlist.b13f35e5.js.map
