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
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayNews(data.data);
};

const displayNews = (news) => {
  const newsContainer = document.getElementById("news-list");
  newsContainer.textContent = " ";
  news.forEach((news) => {
    // console.log(news);
    const { title, thumbnail_url, details, author } = news;
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
                      <p class="card-text">${details}</p>


                    <div class= "flex align-items-center row">
                      <div class="col-md-1 p-2" style="max-height: 10rem">
                         <img src="${img}" class="img-fluid rounded-circle" style="max-height: 3.8rem" alt="">
                      </div>
                      <div class="col-md-4">
                          <div class="card-body>
                              <h5 class="card-title">${name}</h5>
                              <p class="card-text">${published_date}</p>
                          </div>
                       </div>
                       
                    </div>



                   </div>
                </div>
        </div>
        `;
    newsContainer.appendChild(newsDiv);
  });
};


