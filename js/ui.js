import { ContentTree } from "./content_tree.js";

// ##################
// # DISPLAY
// ##################

var tree = new ContentTree([]);
// entry
w3.getHttpObject("asset/test_data.json", init);


function init(data) {
  tree = new ContentTree(data);
  display_category(tree.list_category());
  display_clips(tree.get_all_clips())
}

// ui
function display_category(categories) {
  w3.displayObject("web-category-list", categories)
}

// ui
function display_clips(clips) {
  w3.displayObject("web-clip-list", clips)
}

function search() {
  var word = document.getElementById("search-form").value;
  word = word.trim();
  display_clips(tree.find_clips_by_keyword(word));
}
window.search = search; // global this

function search_category(category) {
  var clips = tree.get_category_clips(category);
  display_clips(clips);
}
window.search_category = search_category;

function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}



// #############################
// # EVENT
// #############################


// dragging category slide bar events
const slider = document.querySelector('.slide-tag');
let mouseDown = false;
let startX, scrollLeft;

let startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};
let stopDragging = function (event) {
  mouseDown = false;
};

slider.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if (!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
});

slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);

slider.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if (!mouseDown) { return; }
  const x = e.changedTouches[0].pageX - slider.offsetLeft;
  const scroll = x - startX;
  slider.scrollLeft = scrollLeft - scroll;
});
let startTouching = function (e) {
  mouseDown = true;
  startX = e.changedTouches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
};
slider.addEventListener('touchstart', startTouching, false);
slider.addEventListener('touchend', stopDragging, false);


// add event enter key to search
document.getElementById("search-form")
    .addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            search();
        }
    });
