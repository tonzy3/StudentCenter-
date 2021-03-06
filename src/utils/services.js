import data from "./mockData";

export function getMockData() {
  return data;
}

export function getDay(num) {
  switch (num) {
    case 0:
      return "SUNDAY";
    case 1:
      return "MONDAY";

    case 2:
      return "TUESDAY";

    case 3:
      return "WEDNESDAY";

    case 4:
      return "THURSDAY";

    case 5:
      return "FRIDAY";

    case 6:
      return "SATURDAY";

    default:
  }
}

export function getDayNum(day) {
  switch (day) {
    case "Sunday":
      return "0";
    case "Monday":
      return "1";

    case "Tuesday":
      return "2";

    case "Wednesday":
      return "3";

    case "Thursday":
      return "4";

    case "Friday":
      return "5";

    case "Saturday":
      return "6";

    default:
  }
}

export function formatCount(num) {
  var format = num
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  return format;
}

export function getCampus(num) {
  switch (num) {
    case 1234:
      return "Hunter College";
    case 2345:
      return "Baruch College";

    case 3456:
      return "City College";

    case 4567:
      return "York College";

    default:
      return "Unknown College";
  }
}

export function getMonth(num) {
  switch (num) {
    case 0:
      return "JANUARY";

    case 1:
      return "FEBRUARY";

    case 2:
      return "MARCH";

    case 3:
      return "APRIL";

    case 4:
      return "MAY";

    case 5:
      return "JUNE";

    case 6:
      return "JULY";

    case 7:
      return "AUGUST";

    case 8:
      return "SEPTEMBER";

    case 9:
      return "OCTOBER";

    case 10:
      return "NOVEMBER";

    case 11:
      return "DECEMBER";

    default:
  }
}

export function filterClassesQuery(subject, courseNum, arr) {
  var filtered = [];
  subject = subject.toUpperCase();
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].prefix === subject && arr[i].courseNumber === courseNum) {
      filtered.push(arr[i]);
    }
  }

  return filtered;
}

export function getGradeValue(letter) {
  switch (letter) {
    case "A+":
      return 4.0;

    case "A":
      return 3.8;

    case "A-":
      return 3.67;

    case "B+":
      return 3.33;

    case "B":
      return 3.0;

    case "B-":
      return 2.67;

    case "C+":
      return 2.33;

    case "C":
      return 2.0;

    case "D":
      return 1.0;

    default:
      return 0.0;
  }
}

export function getGradedClasses(arr) {
  var filtered = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].grade && arr[i].grade !== "Ongoing") {
      filtered.push(arr[i]);
    }
  }

  return filtered;
}

export function getCumulativeGPA(arr) {
  const filtered = getSemesterGPA(getGradedClasses(arr));
  return filtered;
}

export function getSemesterCredits(arr) {
  var totalCredits = 0;
  var totalGradePoint = 0;
  for (let i = 0; i < arr.length; i++) {
    totalCredits += arr[i].credits;
    totalGradePoint += getGradeValue(arr[i].grade) * arr[i].credits;
  }
  return [totalCredits, totalGradePoint];
}

export function getSemesterGPA(arr) {
  const semesterGPA = getSemesterCredits(arr);
  return semesterGPA[1] / semesterGPA[0];
}

export function getClassBySemesterYear(semester, year, arr) {
  var filtered = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].semester === semester && arr[i].year === year) {
      filtered.push(arr[i]);
    }
  }

  return filtered;
}

export function getSemestersAttended(arr) {
  var semesters = [];
  for (let i = 0; i < arr.length; i++) {
    var obj = { semester: arr[i].semester, year: arr[i].year };
    semesters.push(obj);
  }

  const filtered = [];
  const map = new Map();
  for (const item of semesters) {
    if (!map.has(`${item.semester}${item.year}`)) {
      map.set(`${item.semester}${item.year}`);
      filtered.push({
        semester: item.semester,
        year: item.year,
      });
    }
  }

  return filtered;
}

export function getSchedule(arr) {
  var filter = [];
  for (let i = 0; i < arr.length; i++) {
    var day = [[getDayNum(arr[i].days[0].day)]];
    var obj = {
      title: `${arr[i].prefix} ${arr[i].courseNumber} ${arr[i].room} ${arr[i].professor}`,
      daysOfWeek: day,
      startTime: arr[i].days[0].startTime,
      endTime: arr[i].days[0].endTime,
      start: arr[i].duration.start,
      end: arr[i].duration.end,
    };
    filter.push(obj);
  }

  return filter;
}

export function checkCartDuplicate(course, arr) {
  if (course.length <= 0) return false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]._id === course._id) {
      return true;
    }
  }
}

export function convertMilitaryTime(time) {
  time = time.split(":"); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);

  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
  timeValue += hours >= 12 ? " PM" : " AM"; // get AM/PM

  return timeValue;
}

//return department eg. CSCI, MATH
export function returnDepartment(department) {
  switch (department) {
    case "Comp Sci":
      return "CSCI";
    case "Romance Language":
      return "LANG";
    case "Math":
      return "MATH";
    case "Business":
      return "ECON";
  }
}

//return 5 digit number randomly
export function generateRandom() {
  return Math.floor(Math.random() * (99999 - 10000) + 10000);
}

//return first character of name
export function getNameInital(name) {
  var splitName = name.split(" ");
  return (
    splitName[0].charAt(0).toUpperCase() + splitName[1].charAt(0).toUpperCase()
  );
}

//create contacts object
export function contactObject(contact) {
  var split = contact.split(",");
  var contactObj = {
    email: split[0],
    phone: split[1],
  };
  return contactObj;
}

//create facultyObject from inputs
export function createFaculty(
  name,
  department,
  employeeType,
  room,
  hours,
  days,
  campusId,
  contact
) {
  var facultyObject = {
    name,
    department,
    employeeType,
    room,
    hours,
    days: [days],
    facultyId:
      getNameInital(name) + returnDepartment(department) + generateRandom(),
    campusId,
    contact: contactObject(contact),
  };

  return facultyObject;
}

//create duration object
export function durationObject(duration) {
  var split = duration.split(",");
  var durationObj = {
    start: split[0],
    end: split[1],
  };
  return durationObj;
}

//create days object
export function daysObject(days) {
  var split = days.split(",");
  var durationObj = {
    day: split[0],
    startTime: split[1],
    endTime: split[2],
  };
  return durationObj;
}

//get department from prefix
export function getDepartment(prefix) {
  switch (prefix) {
    case "CSCI":
      return "Comp Sci";
    case "LANG":
      return "Romance Language";
    case "ECON":
      return "Business";
    default:
      return "Math";
  }
}

//create course obj
export function createCourse(
  prefix,
  courseNumber,
  professor,
  room,
  days,
  credits,
  semester,
  year,
  duration,
  studentsLimit,
  campus,
  campusId,
  section
) {
  const courseObject = {
    prefix,
    department: getDepartment(prefix),
    courseNumber,
    professor,
    room,
    days: [daysObject(days)],
    credits,
    semester,
    year,
    duration: durationObject(duration),
    studentsLimit,
    campusId,
    campus,
    section,
  };

  return courseObject;
}

//studentId info sufficent
export function checkInfo(first, last, campusid) {
  if (first && last && campusid) return true;
}

//generate student email
export function generateStudentEmail(first, last, campusid) {
  var beforeAt = first + "." + last;
  var fourNum = Math.floor(Math.random() * (99999 - 10000) + 10000);
  var email = beforeAt + fourNum;
  return email;
}

//generate student id
export function generateStudentId(first, last, campusid, gender) {
  var fs = first.charAt(0).toUpperCase();
  var ls = last.charAt(0).toUpperCase();
  var fe = first.charAt(first.length - 1).toUpperCase();
  var le = last.charAt(last.length - 1).toUpperCase();
  var fiveNum = Math.floor(Math.random() * (999999 - 100000) + 100000);
  if (gender) {
    var gs = gender.charAt(0);
    var ge = gender.charAt(gender.length - 1).toUpperCase();
    return fs + ls + gs + fiveNum + ge + fe + le;
  } else {
    return fs + ls + fiveNum + fe + le;
  }
}

//generate registration code 8 letters
export function generateRegistrationCode(first, last, major) {
  var initial = (
    first.charAt(0) + first.charAt(first.length - 1)
  ).toLowerCase();
  var fourNum = Math.floor(Math.random() * (9999 - 1000) + 1000);
  if (major) {
    var nextInitial = (
      major.charAt(0) + major.charAt(major.length - 1)
    ).toLowerCase();
    return initial + fourNum + nextInitial;
  } else {
    return initial + fourNum;
  }
}

//create advisor object for student
export function advisorObject(advisor) {
  var split = advisor.split(",");
  var obj = {
    name: split[0],
    room: split[1],
    hours: split[2],
    contact: split[3],
  };

  return obj;
}

//create student object for database
export function createStudent(
  advisor,
  attending,
  email,
  registrationCode,
  studentId,
  campusId,
  credits,
  firstName,
  lastName,
  gender,
  gpa,
  major,
  year
) {
  const studentObject = {
    adviser: advisorObject(advisor),
    attending,
    email: email + "@cuny.edu",
    registrationCode,
    studentId,
    campusId,
    credits,
    firstName,
    lastName,
    gender,
    gpa,
    major,
    year,
  };

  return studentObject;
}

//filter upcoming schedule by day
export function upcomingSchedule(arr) {
  var filter = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].days[0].day.toUpperCase() === getDay(new Date().getDay())) {
      filter.push(arr[i]);
    }
  }

  return filter;
}
