
w3.getHttpObject("asset/test_data.json", init);

function init(clips) {
    display_category(clips);
    display_clip(clips)
}

function display_category(clips) {
    
    var categories = []
    for (var clip of clips) {
        console.log(clip);
        categories.push({"category": Object.keys(clip)[0]});
    }
    console.log(categories);
    categories = { "categorys": categories };

    w3.displayObject("web-category-list", categories)
}


document.getElementById("search-form")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      search();
    }
  });

function display_clip(clips) {
  clips = { "clips": clips[0]["japanese"] };
  w3.displayObject("web-clip-list", clips)
}

function search() {

  w3.getHttpObject("asset/test_data.json", display_filter_clip);
}

function display_filter_clip(clips) {
  word = document.getElementById("search-form").value;
  word = word.trim();
  if (word !== '') {
    clips = clips.filter(clip => clip.title.includes(word));
  }
  if (clips.length > 0)
    display_clip(clips);
}

function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
}

function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}
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
if(!mouseDown) { return; }
const x = e.pageX - slider.offsetLeft;
const scroll = x - startX;
slider.scrollLeft = scrollLeft - scroll;
});


// Add the event listeners
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);

slider.addEventListener('touchmove', (e) => {
e.preventDefault();
if(!mouseDown) { return; }
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
