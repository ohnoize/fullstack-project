export const timeParser = (seconds) => {
  if (seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }
  return new Date(0).toISOString().substr(11, 8);
};

// Following gives an array of the names of all the subjects practiced in sessions
const subjectsPracticed = (sessions) => {
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
const subjectTimeParser = (sessions, subjectName) => {
  const subjectTimes = sessions.map((s) => s.individualSubjects);
  const times = subjectTimes.map((s) => s.filter((n) => n.name === subjectName));
  return times
    .filter((t) => t.length > 0)
    .map((t) => t
      .map((s) => s.length)
      .reduce((a, b) => a + b))
    .reduce((a, b) => a + b);
};

export default { timeParser, subjectsPracticed, subjectTimeParser };
