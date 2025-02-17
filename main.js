const PhotographerList = document.getElementById("PhotographerList");
const scrollToTopBtn = document.getElementById("scrollToTopBtn");
const rootElement = document.documentElement;

let activeTagsArray = [];

function scrollToTop() {
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);

function handleScroll() {
  let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.05) {
    scrollToTopBtn.classList.add("showBtn");
  } else {
    scrollToTopBtn.classList.remove("showBtn");
  }
}

document.addEventListener("scroll", handleScroll);

class Photograph {
  constructor(name, id, city, country, tags, tagline, price, portrait) {
    this.name = name;
    this.id = id;
    this.city = city;
    this.country = country;
    this.tags = tags;
    this.tagline = tagline;
    this.price = price;
    this.portrait = `./Sample_Photos/Portraits/${portrait}`;
  }

  computePhotographerVariables() {
    return {
      name: this.name,
      id: this.id,
      city: this.city,
      country: this.country,
      tags: this.tags,
      tagline: this.tagline,
      price: this.price,
      portrait: this.portrait,
    };
  }

  renderHomepage() {
    const photographer = this.computePhotographerVariables();
    const { name, id, city, country, tags, tagline, price, portrait } =
      photographer;

    const photographList = document.createElement("section");
    photographList.classList.add("Artistes");

    const photographProfil = document.createElement("div");
    photographProfil.classList.add("ArtistProfil");

    // const onclickPhotographProfil = photographList.appendChild(
    //   document.createElement("a")
    // );

    const onclickPhotographProfil = document.createElement("a");
    photographList.append(onclickPhotographProfil);
    onclickPhotographProfil.classList.add("photographer__link-container");
    onclickPhotographProfil.setAttribute(
      "href",
      `page-photographe.html?id=${id}`
    );
    onclickPhotographProfil.setAttribute("id", `${id}`);
    onclickPhotographProfil.setAttribute("aria-label", `${name}`);
    onclickPhotographProfil.append(photographProfil);

    const profilePhotos = document.createElement("img");
    profilePhotos.setAttribute("src", portrait);
    profilePhotos.setAttribute("alt", `Portrait de ${name}`);
    profilePhotos.classList.add("Artistes", "ArtistPhot");

    const artistName = document.createElement("div");
    artistName.innerHTML = name;
    artistName.classList.add("ArtistName");

    const artistCity = document.createElement("div");
    artistCity.innerHTML = city + " " + country;
    artistCity.classList.add("ArtistCity");

    const artistDescription = document.createElement("div");
    artistDescription.innerHTML = tagline;
    artistDescription.classList.add("ArtistDescription");

    const artistPrice = document.createElement("div");
    artistPrice.innerHTML = price + "€/jour";
    artistPrice.classList.add("ArtistPrix");

    photographProfil.appendChild(profilePhotos);
    photographProfil.appendChild(artistName);
    photographProfil.appendChild(artistCity);
    photographProfil.appendChild(artistDescription);
    photographProfil.appendChild(artistPrice);
    const photographerTagList = photographProfil.appendChild(
      document.createElement("ul")
    );
    photographerTagList.classList.add("ArtistHashtags");

    onclickPhotographProfil.appendChild(photographProfil);
    photographList.appendChild(onclickPhotographProfil);
    PhotographerList.appendChild(photographList);

    photographList.dataset.tags = tags.join(",");
    const navTaglist = document.querySelector(".hashTagsList");
    tags.forEach((tag) => {
      if (!document.querySelector(`.tag[data-tag-name="${tag}"]`)) {
        const navTag = navTaglist.appendChild(document.createElement("li"));

        const navTagLink = navTag.appendChild(document.createElement("a"));
        navTagLink.setAttribute("href", "#");
        navTagLink.innerText = `#${tag}`;
        navTagLink.classList.add("tag");
        navTagLink.dataset.tagName = tag;
      }
      const photographerTag = photographerTagList.appendChild(
        document.createElement("li")
      );
      const photographerTagLink = photographerTag.appendChild(
        document.createElement("a")
      );
      photographerTagLink.dataset.tagName = tag;
      photographerTagLink.classList.add("tag");
      photographerTagLink.setAttribute("href", "#");
      photographerTagLink.innerText = `#${tag}`;
    });
  }
}

function filterPhotographers(element) {
  element.addEventListener("click", () => {
    const allSimilarTags = document.querySelectorAll(
      `.tag[data-tag-name="${element.dataset.tagName}"]`
    );
    element.blur();

    if (element.classList.contains("activeTtag")) {
      allSimilarTags.forEach((similarTag) => {
        similarTag.classList.remove("activeTtag");
      });
      activeTagsArray = activeTagsArray.filter(
        (tag) => !(tag === element.dataset.tagName)
      );
    } else {
      allSimilarTags.forEach((similarTag) => {
        similarTag.classList.add("activeTtag");
      });
      activeTagsArray.push(element.dataset.tagName);
    }

    if (activeTagsArray.length <= 0) {
      const elementsToDisplay = document.querySelectorAll("section");
      elementsToDisplay.forEach((elementToDisplay) => {
        elementToDisplay.classList.remove("hidden");
      });
      return;
    }

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      section.classList.add("hidden");
    });

    activeTagsArray.forEach((tag) => {
      const elementsToDisplay = document.querySelectorAll(
        `.Artistes[data-tags*="${tag}"]`
      );
      elementsToDisplay.forEach((elementToDisplay) => {
        elementToDisplay.classList.remove("hidden");
      });
    });
  });
}

function tagId() {
  let full_url = document.URL;
  let url_array = full_url.split("#");
  let tagId = url_array[url_array.length - 1];

  const allSimilarTags = document.querySelectorAll(
    `.tag[data-tag-name="${tagId}"]`
  );
  const sections = document.querySelectorAll("section");

  allSimilarTags.forEach((tags) => {
    tags.classList.add("activeTtag");
  });

  sections.forEach((section) => {
    section.classList.add("hidden");
  });

  const elementsToDisplay = document.querySelectorAll(
    `.Artistes[data-tags*="${tagId}"]`
  );
  elementsToDisplay.forEach((elementToDisplay) => {
    elementToDisplay.classList.remove("hidden");
  });

  if (tagId === null) {
    sections.forEach((section) => {
      section.classList.remove("hidden");
    });
  }
}

document.body.addEventListener("mousedown", function () {
  document.body.classList.add("using-mouse");
});

document.body.addEventListener("keydown", function (event) {
  if (event.keyCode === 9) {
    document.body.classList.remove("using-mouse");
  }
});

function fetchData(url) {
  return fetch(url)
    .then((res) => res.json())
    .then(function (response) {
      const { photographers } = response;
      let newPhotographers = [];

      photographers.forEach((photographer) => {
        const { name, id, city, country, tags, tagline, price, portrait } =
          photographer;
        const newPhotographer = new Photograph(
          name,
          id,
          city,
          country,
          tags,
          tagline,
          price,
          portrait
        );
        newPhotographers.push(newPhotographer);
      });

      newPhotographers.forEach((photographer) => {
        photographer.renderHomepage();
      });

      const tags = document.querySelectorAll(".tag");
      tags.forEach((tag) => {
        filterPhotographers(tag);
        tagId(tag);
      });

      const baseUrl = document.URL.split("/");
      const baseEnding = baseUrl[baseUrl.length - 1];
      console.log(baseEnding);
      if (baseEnding === "index.html") {
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
          section.classList.remove("hidden");
        });
      } else {
        tagId();
      }

      return response;
    });
}
fetchData("FishEyeData.json");
