import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{S as p,a as d,i as s}from"./assets/vendor-DDf7TsfO.js";const u="52176910-9d30b506fbb06ea9df25b7e20",m="https://pixabay.com/api/",y=40,e={form:document.getElementById("search-form"),input:document.getElementById("search-input"),gallery:document.getElementById("gallery"),loader:document.getElementById("loader")};let g=new p(".gallery a",{captionsData:"alt",captionDelay:250});e.form.addEventListener("submit",b);function h(){e.loader.setAttribute("aria-hidden","false"),e.loader.style.display="flex"}function f(){e.loader.setAttribute("aria-hidden","true"),e.loader.style.display="none"}async function b(a){a.preventDefault();const t=e.input.value.trim();if(!t)return;E(),h();const i=new URLSearchParams({key:u,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:String(y)});try{const r=`${m}?${i.toString()}`,{data:n}=await d.get(r);if(!n.hits||n.hits.length===0){s.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const o=L(n.hits);e.gallery.innerHTML=o,g.refresh()}catch(r){console.error(r),s.error({title:"Error",message:"Bir hata oluştu. Lütfen tekrar deneyin.",position:"topRight"})}finally{f()}}function E(){e.gallery.innerHTML=""}function L(a){return a.map(({webformatURL:t,largeImageURL:i,tags:r,likes:n,views:o,comments:l,downloads:c})=>`
<li class="gallery-item">
  <a href="${i}" class="card-link">
    <img src="${t}" alt="${$(r)}" loading="lazy" />
    <div class="card-stats">
      <span><b>Likes</b> ${n}</span>
      <span><b>Views</b> ${o}</span>
      <span><b>Comments</b> ${l}</span>
      <span><b>Downloads</b> ${c}</span>
    </div>
  </a>
</li>`).join("")}function $(a){return a.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}
//# sourceMappingURL=page-2.js.map
