let dayjs = require('dayjs')
let nahualInfo = require('./info')
let create_and_send_tweet = require('./tweet')
var schedule = require('node-schedule');


//Base data 
let baseDay = dayjs('2020-01-01') // Día: 10  /   Nahual: Kej
let tzolkinBaseDay = 10
let nahualBase = 17


function convertMilisecondsToDays(miliseconds) {
    
    let days, total_hours, total_minutes, total_seconds;
    
    total_seconds = parseInt(Math.floor(miliseconds / 1000));
    total_minutes = parseInt(Math.floor(total_seconds / 60));
    total_hours = parseInt(Math.floor(total_minutes / 60));
    days = parseInt(Math.floor(total_hours / 24));
    
    return days;
  };


//Dia
function calculateTzolkinDay(diaBase, between) {

    let betweenDays = between
   
    for (i = diaBase; betweenDays != 0; i++) {

        if (i === 13) {
            diaBase = 1
            i = 0
        } else {
            diaBase++
        }
        betweenDays--
    }

    return diaBase
}

/// Nahual
function calculateTodayNahual(nahual, between) {
   
    let betweenDays = between 

    for (i = nahual; betweenDays != 0; i++) {

        if (i === 20) {
            nahual = 1
            i = 0
        } else {
            nahual++
        }
        betweenDays--
    }

    return nahual
}

function getTodayInfo () {

    //Today
    let today = dayjs(new Date()) //  format ('YYYY/MM/DD')
    let milisecondsBetweenTodayAndBaseDay = today.diff(baseDay, 'D')
    let daysBetween = convertMilisecondsToDays(milisecondsBetweenTodayAndBaseDay)

    let todayTzolkinDayis = calculateTzolkinDay(tzolkinBaseDay, daysBetween)
    let todayNahualNumber = calculateTodayNahual(nahualBase, daysBetween)
    let todayNahualinfo = nahualInfo.find( nahual => nahual.number === todayNahualNumber );

    create_and_send_tweet(todayTzolkinDayis, todayNahualinfo)

}

var j = schedule.scheduleJob({hour: 12, minute: 30}, function(){
    getTodayInfo()
  });




