"use strict"
import { Projects } from "./projects.js";

// selectors///////////
const checkbox = document.querySelector(".nav__check-box");
const navList = document.querySelector(".nav__list")
const navLink = document.querySelectorAll(".nav__link")
const findOutBtn = document.querySelector("#findOut");
const headerSection = document.querySelector("#header")
const nav = document.querySelector(".nav")
const overlay = document.querySelector(".overlay");

//tabbed component
const tabs = document.querySelectorAll(".button__tab")
const jobTabs= document.querySelector(".job-tabs")
const jobDescriptionContent = document.querySelectorAll(".job__description-content");

const showMoreBtn = document.querySelector(".showMore")
const projectContainer = document.querySelector(".project__sub__container");
const message = document.querySelector(".message");
const messageOverlay = document.querySelector(".message-overlay");
/////////////
const allSection = document.querySelectorAll(".section")


/////FUNCTIONALITY
/////scroll bar functionality ///////
const disableScroll = function () {
    document.body.style.overflowY = "hidden";
}
const enableScroll = function () {
    document.body.style.overflowY = "auto";
}
//sticky navigation 1
const navheight =Math.round( nav.getBoundingClientRect().height)

const observerFunc = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else {
    nav.classList.remove("sticky");
  }
};
const observerOps = {
    root: null,
    threshold: 0,
    rootMargin: `-${navheight}px`
}
const observer = new IntersectionObserver(observerFunc, observerOps)
observer.observe(headerSection)

//sticky navigation 2

//smooth scroll into the sections//////
const addHideOverlay = function(){
    overlay.classList.add("hideoverlay");
    checkbox.checked = false;
    // document.body.style.overflowY = "auto";
    enableScroll();
}

navList.addEventListener("click", function (e) {
    e.preventDefault()
    if (e.target.classList.contains("nav__link")) {
        let id = e.target.getAttribute("href");
        
        document.querySelector(id).scrollIntoView(
            {behavior:"smooth"}
            )
        } 
        
        //collapses the nav
        setTimeout(addHideOverlay, 300);
        
    })
    
// resets the default of the resume button
navList.querySelector(".resume").addEventListener("click", function (e) {
    // e.cancelBubble = true;
    // alert(`resume downloaded`)
    e.stopImmediatePropagation()
  addHideOverlay(); 
});
const NavOverlay = function () {
  if (this.checked == true) {
    // document.body.style.overflowY = "hidden";
    disableScroll();
    overlay.classList.remove("hideoverlay");
  } else {
    overlay.classList.add("hideoverlay");
    // document.body.style.overflowY = "hidden";
    // document.body.style.overflowY = "auto";
    enableScroll();
  }
};
checkbox.addEventListener("click", NavOverlay);
overlay.addEventListener("click", addHideOverlay)
/// find out more scroll
findOutBtn.addEventListener("click", function () {
  document.querySelector(".about").scrollIntoView({
    behavior: "smooth",
  });
});
////////////////////////


//navbar and overlay bar function on phone2
//add event handler to each of the buttons in the tab by using event delegation, i.e targeting the parent element
//tabbed component
jobTabs.addEventListener("click", function (e) {
    const clicked = e.target.closest(".button__tab")
    if (!clicked) return
    
    //activate content area
    //remove all active class on the element
    jobDescriptionContent.forEach(cont => {
        cont.classList.remove("describe--active");
    })
    //link
    document.querySelector(`.job__description--${clicked.dataset.tab}`).classList.add("describe--active");
})

//reveal sections  on scroll/////////////
const revealFunct = function (entries, observer) {
    const [entry] = entries
    if (!entry.isIntersecting) {
        return
    }
    entry.target.classList.remove("section-hidden")
    observer.unobserve(entry.target)
    
}
const sectionObj = {
    root: null,
    threshold:0.20
}
let sectionObserver = new IntersectionObserver(revealFunct, sectionObj)
allSection.forEach(sections => {
    // sections.classList.add("section-hidden")
    sectionObserver.observe(sections)
})
//////////////////////

console.log(document.body);
// document.body.style.overflowY = "hidden";

// show more functionality /////////
const projectMapped = Projects.map(function (project) {
    return `<div class="project1 project">
    <div class="icon-container">
        <svg class="file-icon">
            <use xlink:href="./images/sprite.svg#icon-folder-open-o" ></use>
        </svg>
        <a href=${project.projectLink}>
            <svg class="link-icon">
                <use xlink:href="./images/sprite.svg#icon-external-link"></use>
            </svg>
        </a>                            
    </div>
    <div class="project__details">
        <h2 class="heading">${project.projectTitle}</h2>
        <p>
            ${project.projectDescription}
        </p>
        </div>
    <div class="project__tools">
        <span>${project.projectTools[0]}</span>
         <span>${project.projectTools[1]}</span>
    </div>
</div>`;
});

let currCounter = 0;
showMoreBtn.addEventListener("click", function () {
    const showResult = 3;
    for (let ind = 0; ind < showResult; ind++) {
        if (currCounter > projectMapped.length) {
            message.querySelector(
              ".message__content"
            ).textContent = `Oops!, That's all the project I have for now.
            More projects coming soon!😉`;
            message.classList.remove("hidemessage")
            messageOverlay.classList.remove("hideoverlay")
            disableScroll()
            return;
        }
        projectContainer.insertAdjacentHTML("beforeend", projectMapped[ind + currCounter]);
    }
    currCounter += showResult
    let closebtn = message.querySelector(".btn");
    closebtn.addEventListener('click', function () {
        message.classList.add("hidemessage");
        messageOverlay.classList.add("hideoverlay");
        enableScroll()
    });
})
//////////////////////
