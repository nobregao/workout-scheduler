const WORKOUT_TIME = 'treinar';

const WORKOUT_CANCELLED_NAME_EVENT = 'workout cancelled';

const TIME = {
  START: { HOUR: 6, MINUTE: 0 },
  SUNDAY: { HOUR: 8, MINUTE: 0 }
}

const WORKOUTS = [
  formatWorkout("aeróbico", `${WORKOUT_TIME} aeróbico — pegar fones`),
  formatWorkout("superior", `${WORKOUT_TIME} superiores — pegar luvas`),
  formatWorkout("inferior", `${WORKOUT_TIME} inferiores — pegar luvas`)
];

const DAYS_WEEK = 7;
const HOUR_START_WORK = 8;


/**
 * date / datetime
 */

const isSunday = date => date.getDay() == 0;

const isToday = date => formatDate(date) == formatDate(new Date());

function formatDate(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getDaysToSearch(days, signal = "+") {
  return Object.keys(new Array(days).fill(null))
    .map(days => addDays(new Date(), Number(signal == "+" ? days : -days)))
}


/** 
 * calendar
 */

const getCalendarHobbies = _ => CalendarApp.getCalendarById(ID_CALENDAR_HOBBIES)

const getEventForDates = (startDate, endDate, search) => getCalendarHobbies().getEvents(startDate, endDate, { search })

const getEventsForDay = (date, search) => getCalendarHobbies().getEventsForDay(date, { search })

function getDescriptionTemplate(type) {
  return `treino de <b>${type}</b>\n
<a href="${LINK_WORKOUTS}"><span>workout</span></a>`;
}

function createEvent(title, startDate, description) {

  startDate.setHours(TIME.START.HOUR);
  startDate.setMinutes(TIME.START.MINUTE);

  let endDate = new Date(startDate);
  endDate.setHours(TIME.START.HOUR + 2);
  endDate.setMinutes(TIME.START.MINUTE);

  if (isSunday(startDate)) {
    startDate.setHours(TIME.SUNDAY.HOUR);
    startDate.setMinutes(TIME.SUNDAY.MINUTE);

    endDate.setHours(TIME.SUNDAY.HOUR + 2);
    endDate.setMinutes(TIME.SUNDAY.MINUTE);
  }

  getCalendarHobbies().createEvent(title, startDate, endDate, { description });
};

function updateCancelledEventAndRemoveCalendar(date) {
  let eventWorkoutCancelled = getEventsForDay(date, WORKOUT_CANCELLED_NAME_EVENT)[0];

  eventWorkoutCancelled.setColor(CalendarApp.EventColor.GRAY);
  eventWorkoutCancelled.setDescription("");
  eventWorkoutCancelled.removeAllReminders();
  eventWorkoutCancelled.setAllDayDate(date);

  deleteWorkoutDay(date)
}

function deleteWorkoutDay(date) {
  let event = getEventsForDay(date, WORKOUT_TIME)[0];
  event && event.deleteEvent();
}


/** 
 * workout
 */

function formatWorkout(type, name) {
  return { type, name }
}

function getLastWorkout() {
  const lastWeek = getDaysToSearch(DAYS_WEEK, "-");

  const firstDayLastWeek = lastWeek[lastWeek.length - 1];

  const workoutsDefinedList = getEventForDates(firstDayLastWeek, new Date(), WORKOUT_TIME);

  let lastWorkoutName = ""

  if (workoutsDefinedList.length > 0) {
    lastWorkoutName = workoutsDefinedList.pop().getTitle()
  } else {
    lastWorkoutName = WORKOUTS[WORKOUTS.length - 1].name;
  }

  return WORKOUTS.filter(item => item.name == lastWorkoutName)[0];
}

function getNextWorkout(lastWorkout) {

  let indexLastWorkout = WORKOUTS.findIndex(workout => workout.name === lastWorkout.name)

  if (indexLastWorkout == WORKOUTS.length - 1) {
    indexLastWorkout = -1;
  }

  return WORKOUTS[indexLastWorkout + 1];
}

function createNextWorkout(nextWorkout, date) {
  deleteWorkoutDay(date);
  createEvent(nextWorkout.name, date, getDescriptionTemplate(nextWorkout.type));
}