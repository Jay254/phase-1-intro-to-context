// Your code here
function createEmployeeRecord(arr){
     let employeeRecord = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
     }
     return employeeRecord;
}

function createEmployeeRecords(arrs){
    let employeeRecords = [];
    for(const arr of arrs){
        employeeRecords.push(createEmployeeRecord(arr));
    }
    return employeeRecords;
    
}

function createTimeInEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date: date
    });
    return employeeRecord;
    // let timeInObject = {
    //     type: "TimeIn",
    //     hour: parseInt(date.slice(11, 15)),
    //     date: date.slice(0,10)
    // }
    // employeeRecord['timeInEvents'] = [timeInObject];
    // return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(" ");
    employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
    });
    return employeeRecord;
    // let timeOutObject = {
    //     type: "TimeOut",
    //     hour: parseInt(date.slice(11, 15)),
    //     date: date.slice(0,10)
    // }
    // employeeRecord['timeOutEvents'] = [timeOutObject];
    // return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, dateStamp){
    let timeIn = employeeRecord.timeInEvents.find(event => event.date === dateStamp);
    let timeOut = employeeRecord.timeOutEvents.find(event => event.date === dateStamp);

    return (timeOut.hour - timeIn.hour)/100; 
}

function wagesEarnedOnDate(employeeRecord, dateStamp){
    let wage = hoursWorkedOnDate(employeeRecord, dateStamp) * employeeRecord.payPerHour;

    return wage;
}

function allWagesFor(employeeRecord){
    let datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    let allWages = datesWorked.reduce((total, dateStamp) => total + wagesEarnedOnDate(employeeRecord, dateStamp), 0);
    return allWages;
}

function calculatePayroll(employeeRecords){
    let totalWages = employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
    return totalWages;
}