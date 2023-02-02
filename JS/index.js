const categoryLoad = async () => {
  const url = "https://openapi.programming-hero.com/api/news/categories";
  const res = await fetch(url);
  const data = await res.json();
  displayCategory(data.data.news_category);
};
categoryLoad();
const displayCategory = (categories) => {
  const categoryContainer = document.getElementById("category-list");
  categories.forEach((category) => {
    const { category_name, category_id } = category;
    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("col");
    categoryDiv.innerHTML = `
    <div onclick ="categoryNews('${category_id}')" class="btn btn-light mt-3 py-1">${category_name}</div>`;
    categoryContainer.appendChild(categoryDiv);
  });
};
const categoryNews = async (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
};

const displayNews = (news) => {
  console.log(news.length);
  document.getElementById("count-value").innerHTML = `
  
  <div class="card mb-3 border-0">
        <div class="shadow-sm row g-0 p-3 fs-3">
          ${news.length} news showing
        </div>
      </div>
  
  `;
  const newsContainer = document.getElementById("news-list");
  newsContainer.textContent = " ";
  news.forEach((news) => {
    // console.log(news);
    const { title, thumbnail_url, details, author , _id} = news;
    const { name, img, published_date } = author;
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("card", "mb-3", "border-0");
    newsDiv.innerHTML = `
        <div class="shadow-sm row g-0">
                <div class="col-md-2 p-2">
                  <img src="${thumbnail_url}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-10">
                   <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <p class="card-text">${details?.slice(0, 500)} ${details?.length > 499 ? "..." : ""}</p>


                    <div class= "flex align-items-center row">
                    <div class="col-md-1 p-2" style="max-height: 10rem">
                         <img src="${img}" class="img-fluid rounded-circle" style="max-height: 3.8rem" alt="">
                      </div>
                      <div class="col-md-9">
                          <div class="card-body>
                              <h5 class="card-title">${name}</h5>
                              <p class="card-text">${published_date}</p>
                          </div>
                       </div>
                       <div class="col-md-2">
                       <div onclick="loadNewsDetails('${_id}')" class="btn color" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-arrow-right fa-2x"></i></div>
                       </div>
                       
                    </div>



                   </div>
                </div>
        </div>
        `;
    newsContainer.appendChild(newsDiv);
  });
};

const loadNewsDetails = async (id) =>{
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNewsDetails(data.data);
}

const displayNewsDetails = (news) => {
  console.log(news);
  const {_id, title, image_url, details} = news[0];
  console.log(details);
  const newsDetails = document.getElementById("news-details");
  newsDetails.innerHTML = `
  <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
  
  `;
}

