// GRATITUDE SECTION
const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
popupTitle = popupBox.querySelector(".gratitudeheader p"),
closeIcon = popupBox.querySelector(".gratitudeheader i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector(".gratitudeButton");

const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const gratitudes = JSON.parse(localStorage.getItem("gratitudes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
    popupTitle.innerText = "Today's Gratitude";
    addBtn.innerText = "Add Gratitude";
    popupBox.classList.add("show");
    document.querySelector("body").style.overflow = "hidden";
    if(window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
    isUpdate = false;
    titleTag.value = descTag.value = "";
    popupBox.classList.remove("show");
    document.querySelector("body").style.overflow = "auto";
});

function showgratitudes() {
    if(!gratitudes) return;
    document.querySelectorAll(".gratitude").forEach(li => li.remove());
    gratitudes.forEach((gratitude, id) => {
        let filterDesc = gratitude.description.replaceAll("\n", '<br/>');
        let liTag = `<li class="gratitude">
                        <div class="details">
                            <p>${gratitude.title}</p>
                            <span>${filterDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${gratitude.date}</span>
                            <div class="settings">
                                <i onclick="showgratitudeMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="gratitudemenu">
                                    <li onclick="updategratitude(${id}, '${gratitude.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deletegratitude(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
        addBox.insertAdjacentHTML("afterend", liTag);
    });
}
showgratitudes();

function showgratitudeMenu(elem) {
    elem.parentElement.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show");
        }
    });
}

function deletegratitude(gratitudeId) {
    let confirmDel = confirm("Are you sure you want to delete this gratitude?");
    if(!confirmDel) return;
    gratitudes.splice(gratitudeId, 1);
    localStorage.setItem("gratitudes", JSON.stringify(gratitudes));
    showgratitudes();
}

function updategratitude(gratitudeId, title, filterDesc) {
    let description = filterDesc.replaceAll('<br/>', '\r\n');
    updateId = gratitudeId;
    isUpdate = true;
    addBox.click();
    titleTag.value = title;
    descTag.value = description;
    popupTitle.innerText = "Update a Gratitude";
    addBtn.innerText = "Update Gratitude";
}

addBtn.addEventListener("click", e => {
    e.preventDefault();
    let title = titleTag.value.trim(),
    description = descTag.value.trim();

    if(title || description) {
        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let gratitudeInfo = {title, description, date: `${month} ${day}, ${year}`}
        if(!isUpdate) {
            gratitudes.push(gratitudeInfo);
        } else {
            isUpdate = false;
            gratitudes[updateId] = gratitudeInfo;
        }
        localStorage.setItem("gratitudes", JSON.stringify(gratitudes));
        showgratitudes();
        closeIcon.click();
    }
});

// PLAYLIST SECTION
function playSong(source) {
  var audioPlayer = document.getElementById('audioPlayer');
  var audioSource = document.getElementById('audioSource');

  audioSource.src = source;
  audioPlayer.load();
  audioPlayer.play();
}

// QUOTES SECTION
const quotes = [{
  quote: `"Mental health problems do not define who you are. You walk in the rain and feel the rain but important YOU ARE NOT THE RAIN. I am not the rain."`,
  writer: `– Matt Haig`
}, {
  quote: `"There is a crack in everything, that's how the light gets in"`,
  writer: `– Leonard Cohen`
}, {
  quote: `"There is hope even when your brain tells you there isn't"`,
  writer: `– John Green`
}, {
  quote: `"Your now is not your forever"`,
  writer: `– John Green`
}, {
  quote: `"Healing takes time, and asking for help is a courage step"`,
  writer: `– Mariska Hargitay`
}, {
  quote: `"Your mental health is everything - prioritize it. Make the time like your life dependes on it, because it does"`,
  writer: `– Mel Robbins`
}, {
  quote: `"Do something that makes someone happy. Create something that inspires someone. Be someone's light when they are hopeless"`,
  writer: `–  Dave Grohl`
}, {
  quote: `"You are not alone. You are seen. I am with you. You are not alone"`,
  writer: `– Shonda Rhimes`
}, {
  quote: `"Rest and self-care are so important. When you take time to replenish your spirit, it allows you to serve from the overflow. You cannot serve from an empty vessel"`,
  writer: `- Eleanor Brown`
}, {
  quote: `"It is during our darkest moments that we must focus to see the light"`,
  writer: `- Aristole`
}, ]


let btn = document.querySelector("#Qbtn");

let quote = document.querySelector(".quote");

let writer = document.querySelector(".writer");

btn.addEventListener("click", function() {
  let random = Math.floor(Math.random() * quotes.length);
  
  quote.innerHTML = quotes[random].quote;

  writer.innerHTML = quotes[random].writer;
})


// HEADER SECTION
'use strict';


/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}


// variables for navbar toggle
const menuOpenBtn = document.querySelector('.menu-open-btn');
const menuCloseBtn = document.querySelector('.menu-close-btn');
const menu = document.querySelector('.nav');
const menuLinkBtn = document.querySelectorAll('.nav-link');

// navbar toggle function
const menuToggle = () => menu.classList.toggle('active');

// addEventListener on close and open button
menuOpenBtn.addEventListener('click', menuToggle);
menuCloseBtn.addEventListener('click', menuToggle);

// addEventListener on all navlink
for (let i = 0; i < menuLinkBtn.length; i++) {
  menuLinkBtn[i].addEventListener('click', menuToggle);
}



// variables for tab navigation
const tabButtons = document.querySelectorAll('.tab-button');
const tabContent = document.querySelectorAll('.tab-content');

// tab navigation funtionality
for (let i = 0; i < tabButtons.length; i++) {

  tabButtons[i].addEventListener('click', function () {

    for (let i = 0; i < tabContent.length; i++) {

      if (tabButtons[i].classList.contains('active')) tabButtons[i].classList.remove('active');

      if (tabContent[i].classList.contains('active')) tabContent[i].classList.remove('active');

      if (tabContent[i].classList.contains(this.classList[0])) tabContent[i].classList.add('active');

    }

    this.classList.add('active');

  });

}

const text = document.querySelector(".sec-text");

        const textLoad = () => {
            setTimeout(() => {
                text.textContent = "Wealth";
            }, 0);
            setTimeout(() => {
                text.textContent = "Crucial";
            }, 4000);
            setTimeout(() => {
                text.textContent = "Real";
            }, 8000); //1s = 1000 milliseconds
            setTimeout(() => {
                text.textContent = "a right";
            }, 12000); 
        }

        textLoad();
        setInterval(textLoad, 16000);

// FEELING SECTION
function checkMood() {
  var userInput = document.getElementById("userInput").value.toLowerCase();
  var animationContainer = document.getElementById("animationContainer");
  var animationContainer2 = document.getElementById("animationContainer2");
  var inputContainer = document.getElementById("inputContainer");
  var errorText = document.getElementById("errorText");

  if (userInput === "happy") {
    var happyAnimation = document.getElementById("happyAnimation");
    happyAnimation.classList.add("showAnimation");
    animationContainer.style.display = "block";
  }
  else if (userInput === "sad") {
      var sadAnimation = document.getElementById("sadAnimation");
      sadAnimation.classList.add("showAnimation");
      animationContainer2.style.display = "block";
    }
  else {
    animationContainer.style.display = "none";
    warning.classList.add("showText");
    errorText.style.display = "block";
  }

  inputContainer.style.display = "none";
}

