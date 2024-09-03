class Entry {
    dateTime
    name
    journalEntry
    sleepHours
    moods
}

const submitButton = document.getElementById("submit-button");
const entryArray = [];
const AverageSleepValue = document.getElementById("average-sleep-value");
const possibleMoods = ['energetic', 'anxious', 'motivated', 'happy', 'stressed', 'tired'];

let averageSleep = 0;
let numEntries = 0;

getDateTime();
submitButton.addEventListener("click", onSubmit);

/**
 * Updates the content of the element with id "date-time" to display the current date and time.
 */
function getDateTime() {
    document.getElementById("date-time").innerHTML = new Date();
}

/**
 * Function that handles the form submission event.
 * Creates a new Entry object with user input data and adds it to the entryArray.
 * Updates the number of entries and computes the average sleep hours and moods.
 */
function onSubmit() {

    let currentEntry = new Entry();

    currentEntry.name = document.getElementById("user-name").value;
    currentEntry.dateTime = Date(document.getElementById("date-time").innerHTML);
    currentEntry.journalEntry = document.getElementById("journal-entry").value;
    currentEntry.sleepHours = Number(document.getElementById("sleep-hours").value);

    const moodsArray = document.querySelectorAll(".mood-section input[type='checkbox']");
    currentEntry.moods = Array.from(moodsArray).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);

    console.log(currentEntry);
    entryArray.push(currentEntry);
    console.log(entryArray);
    numEntries = entryArray.length;

    computeAverageSleep();
    computeMoods();
}

/**
 * Calculates the average sleep hours based on the entries in the entryArray.
 * Iterates through each entry in the entryArray, sums up the sleep hours, and then divides by the total number of entries to get the average sleep value.
 * Updates the AverageSleepValue element in the DOM with the calculated average sleep value rounded to 2 decimal places.
 */
function computeAverageSleep() {

    let totalSleep = 0;

    entryArray.forEach(entry => {
        totalSleep += entry.sleepHours;
    })

    averageSleep = totalSleep / numEntries;

    AverageSleepValue.textContent = averageSleep.toPrecision(2);
}

/**
 * Computes the count of each mood in the entryArray and displays the results in the DOM.
 */
function computeMoods() {
    let moodCounts = {};
    
    possibleMoods.forEach(mood => {
        moodCounts[mood] = 0;
    });
    
    entryArray.forEach(entry => {
        entry.moods.forEach(mood => {
            if (moodCounts[mood] !== undefined) {
                moodCounts[mood]++;
            }
        });
    });

    const moodCountsDiv = document.getElementById("mood-counts");
    moodCountsDiv.innerHTML = "";
    for (const [mood, count] of Object.entries(moodCounts)) {
        const p = document.createElement("p");
        p.textContent = `${mood}: ${count} day(s)`;
        moodCountsDiv.appendChild(p);
    }
}