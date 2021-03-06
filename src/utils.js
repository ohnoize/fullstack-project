export const timeParser = (seconds) => {
  if (seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }
  return new Date(0).toISOString().substr(11, 8);
};

// Following gives an array of the names of all the subjects practiced in sessions
export const subjectsPracticed = (sessions) => {
  const allSubjects = sessions
    .map((s) => s.individualSubjects.map((i) => i.name))
    .reduce((a, b) => a.concat(b));

  const subjectArr = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < allSubjects.length; i++) {
    if (!subjectArr.includes(allSubjects[i])) {
      subjectArr.push(allSubjects[i]);
    }
  }
  return subjectArr;
};

// Following function finds all the sessions with entered subject and returns it's combined time
export const subjectTimeParser = (sessions, subjectName) => {
  const subjectTimes = sessions.map((s) => s.individualSubjects);
  const times = subjectTimes.map((s) => s.filter((n) => n.name === subjectName));
  return times
    .filter((t) => t.length > 0)
    .map((t) => t
      .map((s) => s.length)
      .reduce((a, b) => a + b))
    .reduce((a, b) => a + b);
};

// Following function receives on object with practiced
// subjects and returns their total length combined

export const totalTime = (practiceObj) => {
  if (Object.keys(practiceObj).length !== 0) {
    const time = Object.values(practiceObj).reduce((a, b) => a + b);
    return time;
  } return null;
};

export default {
  totalTime,
  timeParser,
  subjectsPracticed,
  subjectTimeParser,
};
