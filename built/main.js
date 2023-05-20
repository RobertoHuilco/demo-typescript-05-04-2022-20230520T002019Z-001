"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let students = [];
let teachers = [];
let activities = [];
let gradebookSetups = [];
let assignments = [];
var Course;
(function (Course) {
    Course["GraphicDesign"] = "Graphic Design";
    Course["Database"] = "Database";
    Course["CommunityManager"] = "Community Manager";
})(Course || (Course = {}));
function addStudent() {
    let currentStudent = {
        dni: readFromHtml("student_dni"),
        fullName: readFromHtml("student_fullname"),
        level: parseInt(readFromHtml("student_level"))
    };
    students.push(currentStudent);
    console.table(students);
}
function addTeacher() {
    let currentTeacher = {
        dni: readFromHtml("teacher_dni"),
        fullName: readFromHtml("teacher_fullname"),
        knowledge_are: readFromHtml("teacher_area")
    };
    teachers.push(currentTeacher);
    console.table(teachers);
}
function addActivity() {
    let currentActivity = {
        name: readFromHtml("activity_name"),
    };
    activities.push(currentActivity);
    console.table(activities);
    initSelect();
}
function addGradebookSetup() {
    let currentGradebookSetup = {
        value: readFromHtml("gradebook_value"),
        course: readFromHtml("gradebook_course"),
        activity: readFromHtml("gradebook_activity"),
        maximun_grade: parseInt(readFromHtml("gradebook_maximun_grade"))
    };
    gradebookSetups.push(currentGradebookSetup);
    console.table(gradebookSetups);
    initSelect();
}
function readFromHtml(id) {
    return document.getElementById(id).value;
}
function addAssignment() {
    let currentAssignment = {
        student: readFromHtml("assignment_student"),
        gradebooksetup: readFromHtml("assignment_gradebooksetup"),
        grade: parseInt(readFromHtml("assignment_grade"))
    };
    assignments.push(currentAssignment);
    console.table(assignments);
    initSelect();
}
function initSelect() {
    let gradebookCourse = document.getElementById("gradebook_course");
    document.querySelectorAll("#gradebook_course option").forEach(option => option.remove());
    let courses = Object.values(Course);
    courses.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.text = value;
        gradebookCourse.add(option);
    });
    let gradebookActivity = document.getElementById("gradebook_activity");
    document.querySelectorAll("#gradebook_activity option").forEach(option => option.remove());
    activities.forEach((activity) => {
        let option = document.createElement("option");
        option.value = activity.name;
        option.text = activity.name;
        gradebookActivity.add(option);
    });
    // aqui se llama al estudiante
    let assignmentsStudent = document.getElementById("assignment_student");
    document.querySelectorAll("#assignment_student option").forEach(option => option.remove());
    students.forEach((student) => {
        let option = document.createElement("option");
        option.value = student.dni;
        option.text = student.fullName;
        assignmentsStudent.add(option);
    });
    // asignar la nota maxima
    let assignmentSetup = document.getElementById("assignment_gradebooksetup");
    document.querySelectorAll("#assignment_gradebooksetup option").forEach(option => option.remove());
    gradebookSetups.forEach((data) => {
        let option = document.createElement("option");
        option.value = data.value;
        option.text = data.value;
        assignmentSetup.add(option);
    });
}
initSelect();
// asignacion
class Gradebook {
    constructor(students, activities, gradebookSetups, assignments, teachers) {
        this.students = students;
        this.activities = activities;
        this.gradebookSetups = gradebookSetups;
        this.assignments = assignments;
        this.teachers = teachers;
    }
    ;
    buildGradebookDTOFromAssignment() {
        let gradebookDTOs = [];
        this.assignments.forEach((assignment) => {
            let currentGradebooksetup = gradebookSetups.filter((item) => item.value === assignment.gradebooksetup)[0];
            let currentStudent = students.filter((student) => student.dni === assignment.student)[0];
            let rowGradebook = {
                //Course
                course: currentGradebooksetup.course,
                //Student
                studentName: currentStudent.fullName,
                lastName: "",
                level: currentStudent.level,
                dni: assignment.student,
                fullName: currentStudent.fullName,
                //GradebookSetup
                value: "",
                activity: "",
                maximun_grade: 0,
                //Activity
                name: "",
                //Assignment
                student: assignment.student,
                gradebooksetup: assignment.gradebooksetup,
                grade: assignment.grade
            };
            gradebookDTOs.push(rowGradebook);
        });
        return gradebookDTOs;
    }
}
