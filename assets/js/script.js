// Object array to store hours and reminders
var dayReminders = [
    {
        id: 0,
        txtHr: "9AM",
        hour: 09,
        reminder: ""
    },
    {
        id: 1,
        txtHr: "10AM",
        hour: 10,
        reminder: ""
    },
    {
        id: 2,
        txtHr: "11AM",
        hour: 11,
        reminder: ""
    },
    {
        id: 3,
        txtHr: "12PM",
        hour: 12,
        reminder: ""
    },
    {
        id: 4,
        txtHr: "1PM",
        hour: 13,
        reminder: ""
    },
    {
        id: 5,
        txtHr: "2PM",
        hour: 14,
        reminder: ""
    },
    {
        id: 6,
        txtHr: "3PM",
        hour: 15,
        reminder: ""
    },
    {
        id: 7,
        txtHr: "4PM",
        hour: 16,
        reminder: ""
    },
    {
        id: 8,
        txtHr: "5PM",
        hour: 17,
        reminder: ""
    },
]

// function to save reminders to localstorage
function saveReminders() {
    localStorage.setItem("dayReminders", JSON.stringify(dayReminders));
}

// function to display reminders from localstorage
function displayReminders() {
    dayReminders.forEach(function(currentHour) {
        $("#" + currentHour.id).val(currentHour.reminder);
    })
}

// Get current date
var now = moment().format('MMMM Do YYYY');

// Set current date to currentDay
$("#currentDay").text(now);

dayReminders.forEach(function(dayHour) {
    // parent row div
    var hourRow = $("<div>").attr({"class": "row no-gutters time-block"});
    // column one, showing time
    var hourCol = $("<div>").text(dayHour.txtHr).attr({"class": "col-2 hour"});
    // column 2, textarea where reminders will be posted
    var reminderCol = $("<div>").attr({"class": "col-8 hour"});
    // column 3, save button column
    var saveCol = $("<div>").attr({"class": "col-2 hour"}).append($("<button>").attr({"class": "saveBtn h-100 w-100"}).append($("<i>").attr({"class": "oi oi-bookmark"})));

    // check to see if the hour stored in the array is less than the current hour - set the class to past and set the ID of the textarea to match corresponding object array ID
    if (dayHour.hour < moment().format("HH")) {
        reminderCol.append($("<textarea>").attr({"class": "past h-100 w-100", "id": dayHour.id}));
    }
    // check to see if the hour stored in the array is equal to the current hour - set the class to present and set the ID of the textarea to match corresponding object array ID
    else if (dayHour.hour == moment().format("HH")) {
        reminderCol.append($("<textarea>").attr({"class": "present h-100 w-100", "id": dayHour.id}));
    }
    // check to see if the hour stored in the array is greater than the current hour - set the class to future and set the ID of the textarea to match corresponding object array ID
    else if (dayHour.hour > moment().format("HH")) {
        reminderCol.append($("<textarea>").attr({"class": "future h-100 w-100", "id": dayHour.id}));
    }

    // append hourRow column to the parent container
    $(".container").append(hourRow);
    // append hourCol, reminderCol, and saveCol to the corresponding hourRow
    hourRow.append(hourCol, reminderCol, saveCol);
})

// Load localstorage into variable
var today = JSON.parse(localStorage.getItem("dayReminders"));

// Check to see if localstorage already exists, if it does, assign the variables
if (today) {
    dayReminders = today;
}

// Initial save and render of reminders
saveReminders();
displayReminders();

// On save button click event
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    // Variable to find the index of the textarea corresponding with the save button
    var index = $(this).parents(".row").find("textarea").attr("id");
    // Set the reminder to whatever value is inside the textbox
    dayReminders[index].reminder = $(this).parents(".row").find("textarea").val();
    // Save reminders
    saveReminders();
})
