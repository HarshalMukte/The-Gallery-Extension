let loading = document.querySelector(".grid .loading"),
  input = document.getElementById("input"),
  columns = [...document.querySelectorAll(".grid .column")],
  NoDataMessage = document.querySelector("#NoDataMessage"),
  grid = document.querySelector(".grid"),
  father = "hE4D_DUQclCbpHM5XYw5PYuPmc7nxLN-x_Hv-_-pt0E";
  upBtn = document.getElementById("upBtn"),
  downloadBtn = document.querySelector(".displayImg .download"),
  error_message = document.getElementById("error_message"),
  searchIcon = document.getElementById("search"),
  crossIcon = document.getElementById("cross"),
  data_desc = "",
  data_link = "",
  totalPages = 1,
  page = 1,
  mom = father,
  removeImg = () => {
    columns.map((e) => (e.innerHTML = "")), (page = 1);
  },
  loadImg = async () => {
    let e;
    (e = input.value
      ? `https://api.unsplash.com/search/photos/?query=${input.value}&page=${page}&per_page=30&client_id=${mom}`
      : `https://api.unsplash.com/search/photos/?query=random&page=${page}&per_page=30&client_id=${mom}`),
      "" === input.value
        ? (search.classList.add("active"), crossIcon.classList.remove("active"))
        : (search.classList.remove("active"),
          crossIcon.classList.add("active")),
      (NoDataMessage.style.display = "none"),
      grid.classList.remove("error"),
      error_message.classList.remove("active"),
      (loading.style.display = "flex");
    try {
      const t = await fetch(e),
        a = await t.json();
      (loading.style.display = "none"),
        console.log(a),
        (totalPages = a.total_pages),
        0 === a.total || 0 === a.total_pages
          ? (NoDataMessage.style.display = "flex")
          : ((NoDataMessage.style.display = "none"),
            a.results.map((e, t) => {
              let a = `<div class="image-box" data-link="${e.links.download}" data-desc="${e.description}" data-userName="${e.user.name}" data-userLink="${e.user.links.html}">\n          <img src="${e.urls.small}" alt="image"/>\n          <span class="viewBtn" ><i class="fas fa-eye"></i></span>\n          </div>`;
              t % 2 == 0
                ? columns[0].insertAdjacentHTML("beforeend", a)
                : columns[1].insertAdjacentHTML("beforeend", a),
                viewImg();
            }));
    } catch {
      (loading.style.display = "none"),
        grid.classList.add("error"),
        error_message.classList.add("active");
    }
  };
downloadBtn.addEventListener("click", () => {
  let e = document.querySelector(".displayImg img"),
    t = "",
    a = "";
  (t = data_link),
    (a =
      "" === data_desc || "null" == data_desc || void 0 === data_desc
        ? "image.jpg"
        : `${data_desc.slice(0, 3)}...jpg`),
    e.classList.add("imageActive"),
    chrome.downloads.download({ url: t, filename: a }, () => {}),
    console.log(t, a),
    setTimeout(() => {
      e.classList.remove("imageActive");
    }, 3500);
});
let viewImg = () => {
  let e = document.querySelectorAll(".viewBtn"),
    t = document.querySelector(".displayImg"),
    a = document.querySelector(".displayImg img"),
    s = document.querySelector(".userProfile .photographerDetails");
  e.forEach((e) => {
    e.addEventListener("click", () => {
      e.offsetParent.getAttribute("data-link") != a.src &&
        ((a.src = ""),
        (t.style.display = "none"),
        (t.style.display = "block"),
        (a.src = e.offsetParent.children[0].src),
        (s.innerText = e.offsetParent.getAttribute("data-userName")),
        (s.href =
          e.offsetParent.getAttribute("data-userLink") +
          "?utm_source=TheGallery&utm_medium=referral"),
        (data_link = e.offsetParent.getAttribute("data-link")),
        (data_desc = e.offsetParent.getAttribute("data-desc")));
    });
  });
};
window.addEventListener("load", () => {
  (loading.style.display = "flex"),
    chrome.storage.sync.get("ChromeInputVal", (e) => {
      null != e.ChromeInputVal
        ? (input.value = e.ChromeInputVal)
        : (input.value = "random");
    }),
    setTimeout(() => {
      (loading.style.display = "none"), loadImg();
    }, 1500),
    setTimeout(() => {
      viewImg();
    }, 2e3);
});
const runFunction = () => {
  setTimeout(() => {
    removeImg();
    let e = input.value;
    loadImg(), chrome.storage.sync.set({ ChromeInputVal: e });
  }, 1e3),
    setTimeout(() => {
      viewImg();
    }, 1500);
};
input.addEventListener("keyup", (e) => {
  "" === e.target.value
    ? (search.classList.add("active"), crossIcon.classList.remove("active"))
    : (search.classList.remove("active"), crossIcon.classList.add("active")),
    "Enter" === e.key && runFunction();
}),
  crossIcon.addEventListener("click", () => {
    (input.value = ""), input.focus(), runFunction();
  }),
  grid.addEventListener("scroll", (e) => {
    let t = grid.scrollHeight - 450 + 10;
    ((t < grid.scrollTop && page < totalPages) ||
      (t === grid.scrollTop && page < totalPages)) &&
      ((page += 1),
      loadImg(),
      setTimeout(() => {
        viewImg();
      }, 1500)),
      grid.scrollTop > 200
        ? (upBtn.style.display = "flex")
        : (upBtn.style.display = "none"),
      upBtn.addEventListener("click", () => {
        grid.scrollTop = 0;
      });
  }),
  document.addEventListener(
    "contextmenu",
    (e) => {
      e.preventDefault();
    },
    !1
  ),
  document.addEventListener("keydown", (e) => {
    (e.ctrlKey || 123 == e.keyCode) &&
      (e.preventDefault(), e.stopPropagation());
  }),
  document.addEventListener("keydown", (e) => {
    e.ctrlKey &&
      e.shiftKey &&
      e.keyCode == "I".charCodeAt(0) &&
      (e.preventDefault(), e.stopPropagation());
  }),
  document.addEventListener("keydown", (e) => {
    e.ctrlKey &&
      e.shiftKey &&
      e.keyCode == "J".charCodeAt(0) &&
      (e.preventDefault(), e.stopPropagation());
  }),
  document.addEventListener("keydown", (e) => {
    e.ctrlKey &&
      e.keyCode == "U".charCodeAt(0) &&
      (e.preventDefault(), e.stopPropagation());
  });
