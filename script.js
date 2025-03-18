let moodBtns = document.querySelectorAll(".mood-btn")
let moodDisplay = document.querySelector('#mood-display')
let previousMonth = document.querySelector("#previousMonth")
let nextMonth = document.querySelector("#nextMonth")
let monthYear = document.querySelector("#monthYear")
let calendarDays = document.querySelector("#calendarDays")
let calendarGrid = document.querySelector("#calendarGrid")
let saveMoodBtn = document.querySelector("#save-mood-btn")
let popDiv = document.querySelector('#popup-div')
let dayMood = document.getElementById("dayMood")
let todaysMood = document.getElementById('todaysMood')
let weeklyMood = document.getElementById('weeklyMood')
let monthlyMood = document.getElementById('monthlyMood')
let calendar = document.getElementById("Calendar")
let weekMood = document.getElementById('weekMood')
let moodList = document.querySelector(".moodList")
let closeBtn = document.querySelector('.closeBtn')

// ye colors hai 
const moodColors = [
    "#FDE68A", // 😊 Happy (Soft Yellow - Warm & Cheerful)
    "#60A5FA", // 😢 Sad (Calm Blue - Reflective & Somber)
    "#9CA3AF", // 😐 Neutral (Muted Gray - Balanced & Neutral)
    "#FCA5A5", // 😁 Excited (Vibrant Red - Energetic & Passionate)
    "#EF4444", // 😡 Angry (Bold Red - Intense & Aggressive)
    "#A78BFA", // 😴 Tired (Lavender - Calm & Sleepy)
    "#34D399", // 😨 Anxious (Teal Green - Nervous & On Edge)
    "#D946EF"  // 🤒 Sick (Magenta - Dull & Unwell)
];


moodBtns.forEach((element, index) => {
    element.addEventListener('click', function(){
        moodBtns.forEach(e => {
            // e.classList.remove('selected')
            e.style.backgroundColor = ""
        })
        // element.classList.add('selected')
        element.style.backgroundColor = moodColors[index]
        moodDisplay.textContent =  element.textContent
    })
});



const now = new Date()
let currentMonth = now.getMonth()
let currentYear = now.getFullYear()
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let dayFormat = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
//'2025-3-18'

monthYear.innerHTML = `${monthNames[currentMonth]} ${currentYear}`


previousMonth.addEventListener('click', function(){
    currentMonth--
    if(currentMonth <0){
        currentMonth = 11
        currentYear--    
    }
    monthYear.innerHTML = `${monthNames[currentMonth]} ${currentYear}`
    MakeCalender()

})

nextMonth.addEventListener('click', function(){
    currentMonth++
    if(currentMonth>11){
        currentMonth = 0
        currentYear++
    }
    monthYear.innerHTML = `${monthNames[currentMonth]} ${currentYear}`
    MakeCalender()

})



days.map((item) => {
    let day = document.createElement('div')
    day.textContent = item
    day.classList.add("days")
    calendarDays.appendChild(day)
}) 




function MakeCalender(){
    calendarGrid.innerHTML = ""
    const totalDays = new Date(currentYear,currentMonth + 1,0).getDate()  //previous month ki last date ko represent karega like 31 hai to current month me 31 days honge currentmonth +1 esliye kiyya taki ye next month ban jaye and 0 hai wo previous month ka last day hai
    console.log(totalDays)

    const firstDateStarts = new Date(currentYear, currentMonth, 1).getDay(); // ye new date banayega and uska day nikalega ki konse din pr currentmonth ki 1 tarikh aati hai and iski value 0-6 tk hogi sunday-saturday
    console.log(firstDateStarts)
    // ab days pta hai stating day pta hai to loop laga ke karlo  
    //loop lagega to shuru se values add kar dega and hme to cell empty rakhne hai na to empty cell ke liye bhi loop

    for(let i = 0; i<firstDateStarts;i++){
        let cell = document.createElement('div')
        cell.classList.add("days")
        cell.style.visibility = "hidden"
        calendarGrid.appendChild(cell)
    }
    for(j = 1;j<=totalDays;j++){
        let day = document.createElement('div')
        day.classList.add("days")
        day.textContent = j

        const calendarDateFormat = `${currentYear}-${currentMonth + 1}-${j}`
        2025-3-18
        if(mood[calendarDateFormat]){ 2025-3-18
            day.textContent = `${j} - ${mood[calendarDateFormat]}`; 

        }
        calendarGrid.appendChild(day)
    }
}
let mood = {}  // esme saare mood date wise rahenge

saveMoodBtn.addEventListener('click', function(){
    if(moodDisplay.textContent === "select mood to show your mood here"){
        alert("please select your mood")
    }else{
        // const dateFormat = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`
        // console.log(dateFormat)
        mood[dayFormat] = moodDisplay.textContent
        // mood.dayFormat = moodDisplay.textContent
        console.log(mood);

        localStorage.setItem('mood', JSON.stringify(mood));  //object ko save kar liya 
        MakeCalender()
        moodDisplay.textContent = "select mood to show your mood here"
        
    }
})



function hideallmoods(){
    dayMood.style.display = "none"
    weekMood.style.display = "none"
    calendar.style.display = "none"
}

todaysMood.addEventListener('click', function(){
    hideallmoods() //ye pahle sabko display none karega
    dayMood.style.display = "flex"
    let button = document.createElement('button')
    button.textContent = "remove"
    
    dayMood.textContent = mood[dayFormat]
    dayMood.appendChild(button)

    button.addEventListener('click', function(){  //remove pr click karne se display none ho jayega 
        dayMood.style.display = "none"
    })

})


weeklyMood.addEventListener('click', function() {
    hideallmoods()
    moodList.innerHTML = ''; // Clear previous content
    weekMood.style.display = "block";

    for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);

        const weekDateFormat = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const moodText = mood[weekDateFormat] || "No mood recorded";
        2025-3-18
        // Create each mood item
        const moodItem = document.createElement("div");
        moodItem.className = "moodItem";
        // moodItem.appendChild(weekDateFormat)  PAHLE TRY KIYA  pr string append nhi ho thi fir eske liye do div banao fir usme ye daal and fir un div ko append kar etna kon karega to innterhtml me hi mene span tag me ye laga diye
        // moodItem.appendChild(moodText)
        moodItem.innerHTML = `<span>${weekDateFormat}</span> <span>${moodText}</span>`
        
        moodList.appendChild(moodItem);
    }



    closeBtn.addEventListener('click', function() {
        weekMood.style.display = "none";
    });

});



monthlyMood.addEventListener('click', function(){
    hideallmoods()
    console.log(calendar.style.display)
    if (calendar.style.display === "none" || calendar.style.display === "") {
        calendar.style.display = "block";
    } else {
        calendar.style.display = "none";
    }
})

mood = JSON.parse(localStorage.getItem('mood')) || {};
MakeCalender()
