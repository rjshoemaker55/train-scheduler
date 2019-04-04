var config = {
  apiKey: "AIzaSyDwzah4SNohoCghWl1tC59hGKHRF5ljWBo",
  authDomain: "train-scheduler-29c99.firebaseapp.com",
  databaseURL: "https://train-scheduler-29c99.firebaseio.com",
  projectId: "train-scheduler-29c99",
  storageBucket: "",
  messagingSenderId: "514035898658"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit-button").on("click", function () {

  var name = $("#name-input").val().trim()
  var destination = $("#destination-input").val().trim()
  var firstTrainTime = $("#first-train-input").val().trim()
  var frequency = $("#frequency-input").val().trim()

  if ("name" != "" && destination != "" && firstTrainTime != "" && frequency != "") {

    database.ref().push({
      name: name,
      destination: destination,
      firstTrainTime: firstTrainTime,
      frequency: frequency
    })

  } else {

    alert("All fields must be filled out!")

  }

})

database.ref().on("child_added", function (childSnapshot) {

  var name = childSnapshot.val().name
  var destination = childSnapshot.val().destination
  var firstTrainTime = childSnapshot.val().firstTrainTime
  var frequency = childSnapshot.val().frequency

  console.log("current time: " + moment().format('hh:mm'))

  console.log("first train time: " + firstTrainTime)

  var convertedFirstTrainTime = (moment(firstTrainTime).format('hh:mm'))
  var nextTrain = (moment().format('hh:mm').subtract(firstTrainTime))

  console.log("converted first train time: " + convertedFirstTrainTime)

  console.log("next train: " + nextTrain)
  console.log(moment(convertedFirstTrainTime).toNow())


  var newRow = $("<tr>")
  var newName = $("<td>").text(name)
  var newDestination = $("<td>").text(destination)
  var newFrequency = $("<td>").text(frequency)
  var newNextTrain = $("<td>").text(nextTrain)

  newRow.append(newName)
  newRow.append(newDestination)
  newRow.append(newFrequency)
  newRow.append(newNextTrain)


  $("tbody").append(newRow)

})
