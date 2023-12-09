const WORKOUT_TIME = 'treinar';

const WORKOUT_CANCELLED_NAME_EVENT = 'workout cancelled';

const TIME = {
  START: { HOUR: 6, MINUTE: 0 },
  SUNDAY: { HOUR: 8, MINUTE: 0 }
}

const WORKOUTS = [
  formatWorkout("superior", `${WORKOUT_TIME} superiores — pegar luvas`),
  formatWorkout("inferior", `${WORKOUT_TIME} inferiores — pegar luvas`),
  formatWorkout("aeróbico", `${WORKOUT_TIME} aeróbico — pegar fones`)
];

const DAYS_WEEK = 7;


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

function getDaysToSearch(daysForGenerate) {
  return Object.keys(new Array(daysForGenerate).fill(null)).map(Number)
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

function updateCancelledEvent(date, eventName) {
  let event = getEventsForDay(date, eventName)[0];

  event.setColor(CalendarApp.EventColor.GRAY);
  event.setDescription("");
  event.removeAllReminders();
  event.setAllDayDate(date);
}


/** 
 * workout
 */

function formatWorkout(type, name) {
  return { type, name }
}

function getLastWorkout() {
  const lastWeek = getDaysToSearch(DAYS_WEEK).map(numberDays => addDays(new Date(), -numberDays));
  const nextWeek = getDaysToSearch(DAYS_WEEK).map(numberDays => addDays(new Date(), numberDays));

  const firstDayLastWeek = lastWeek[lastWeek.length - 1];
  const lastDayNextWeek = nextWeek[nextWeek.length - 1];

  const workoutsDefinedList = getEventForDates(firstDayLastWeek, lastDayNextWeek, WORKOUT_TIME);

  let lastWorkoutName = ""

  if (workoutsDefinedList.length > 0) {
    lastWorkoutName = workoutsDefinedList.pop().getTitle()
  } else {
    lastWorkoutName = WORKOUTS.pop().name;
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