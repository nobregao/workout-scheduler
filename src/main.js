function main() {

  var lastWorkout = getLastWorkout();

  const datesNextWeek = getDaysToSearch(DAYS_WEEK);

  const _getWorkoutCancelledForDay = date => getEventsForDay(date, WORKOUT_CANCELLED_NAME_EVENT)[0]?.getTitle();
  const _whenNotSetWorkout = date => isToday(date) && date.getHours() > HOUR_START_WORK;

  datesNextWeek
    .filter(date => {

      let isWorkoutDayCancelled = _getWorkoutCancelledForDay(date);
      if (isWorkoutDayCancelled) {
        updateCancelledEventAndRemoveCalendar(date);
      }

      return !isWorkoutDayCancelled && !_whenNotSetWorkout(date);
    })
    .forEach(date => {

      let nextWorkout = getNextWorkout(lastWorkout);
      
      console.log(`Dia ${date.getDate()} treino é ${nextWorkout.type}`)
      // createNextWorkout(nextWorkout, date);

      lastWorkout = nextWorkout;
    });
}