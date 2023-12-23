function main() {

  var lastWorkout = getLastWorkout();

  const datesNextWeek = getDaysToSearch(DAYS_WEEK);

  const _getWorkoutByDateAndName = (date, name) => getEventsForDay(date, name)[0]?.getTitle();
  const _whenNotSetWorkout = date => isToday(date) && date.getHours() > HOUR_START_WORK;

  datesNextWeek
    .filter(date => {

      let isCancelled = _getWorkoutByDateAndName(date, WORKOUT_CANCELLED_NAME_EVENT);
      if (isCancelled) {
        updateCancelledEventAndRemoveWorkoutDay(date);
      }

      return !isCancelled && !_whenNotSetWorkout(date);
    })
    .forEach(date => {

      let nextWorkout = getNextWorkout(lastWorkout);
      
      console.log(`Dia ${date.getDate()}`, 'próximo treino é ', nextWorkout)
      createNextWorkout(nextWorkout, date);

      lastWorkout = nextWorkout;
    });
}