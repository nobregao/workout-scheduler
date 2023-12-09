function main() {

    var lastWorkout = getLastWorkout();
  
    const datesNextWeek = getDaysToSearch(7).map(numberDays => addDays(new Date(), numberDays));
  
    const getWorkoutByDateAndName = (date, name) => getEventsForDay(date, name)[0]?.getTitle();
  
    datesNextWeek.forEach(date => {
  
      let workoutDay = getWorkoutByDateAndName(date, WORKOUT_TIME);
  
      if (workoutDay != undefined) {
        lastWorkout = formatWorkout("", workoutDay);
        return;
      }
  
      if (isToday(date) && date.getHours() > 8) {
        return;
      }
  
      let workoutCancelled = getWorkoutByDateAndName(date, WORKOUT_CANCELLED_NAME_EVENT);
      if (workoutCancelled) {
        updateCancelledEvent(date, WORKOUT_CANCELLED_NAME_EVENT);
        return;
      }
  
      let nextWorkout = getNextWorkout(lastWorkout);
      createEvent(nextWorkout.name, date, getDescriptionTemplate(nextWorkout.type));
  
      lastWorkout = nextWorkout;
    });
  }