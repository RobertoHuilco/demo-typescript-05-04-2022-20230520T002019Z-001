import { Activity } from "./entity/Activity";
import { Assignment } from "./entity/Assignment";
import { GradebookDTO } from "./entity/GradebookDTO";
import { GradebookSetup } from "./entity/GradebookSetup";
import { Student } from "./entity/Student";
import { Teacher } from "./entity/Teacher";


let students: Student[] = [];
let teachers: Teacher[] = [];
let activities: Activity[] = [];
let gradebookSetups: GradebookSetup[] = [];
let assignments: Assignment[] = [];

enum Course {
    GraphicDesign = "Graphic Design",
    Database = "Database",
    CommunityManager = "Community Manager"
}

function addStudent(): void {
    let currentStudent: Student =
    {
        dni: readFromHtml("student_dni"),
        fullName: readFromHtml("student_fullname"),
        level: parseInt(readFromHtml("student_level"))
    }
    students.push(currentStudent);
    console.table(students);
}

function addTeacher(): void {
    let currentTeacher: Teacher =
    {
        dni: readFromHtml("teacher_dni"),
        fullName: readFromHtml("teacher_fullname"),
        knowledge_are: readFromHtml("teacher_area") as "Software" | "Marketing" | "Art"
    }
    teachers.push(currentTeacher);
    console.table(teachers);
}

function addActivity(): void {
    let currentActivity: Activity =
    {
        name: readFromHtml("activity_name"),
    }
    activities.push(currentActivity);
    console.table(activities);
    initSelect();
}

function addGradebookSetup(): void {
    let currentGradebookSetup: GradebookSetup =
    {
        value: readFromHtml("gradebook_value"),
        course: readFromHtml("gradebook_course"),
        activity: readFromHtml("gradebook_activity"),
        maximun_grade: parseInt(readFromHtml("gradebook_maximun_grade"))
    }
    gradebookSetups.push(currentGradebookSetup);
    console.table(gradebookSetups);
    initSelect();
}

function readFromHtml(id: string): string {
    return (<HTMLInputElement>document.getElementById(id)).value;
}
function addAssignment(): void {
    let currentAssignment: Assignment =
    {
        student: readFromHtml("assignment_student"),
        gradebooksetup: readFromHtml("assignment_gradebooksetup"),
        grade: parseInt(readFromHtml("assignment_grade"))
    }
    assignments.push(currentAssignment);
    console.table(assignments);
    initSelect();
}

function initSelect(): void {

    let gradebookCourse = document.getElementById("gradebook_course") as HTMLSelectElement;

    document.querySelectorAll("#gradebook_course option").forEach(option => option.remove());

    let courses = Object.values(Course);
    courses.forEach(
        (value) => {
            let option = document.createElement("option");
            option.value = value;
            option.text = value;
            gradebookCourse.add(option);
        }
    );
    let gradebookActivity = document.getElementById("gradebook_activity") as HTMLSelectElement;

    document.querySelectorAll("#gradebook_activity option").forEach(option => option.remove());

    activities.forEach(
        (activity) => {
            let option = document.createElement("option");
            option.value = activity.name;
            option.text = activity.name;
            gradebookActivity.add(option);
        }
    );
    // aqui se llama al estudiante
    let assignmentsStudent = document.getElementById("assignment_student") as HTMLSelectElement;

    document.querySelectorAll("#assignment_student option").forEach(option => option.remove());
    //con el forEach recorremos los datos en el archeglo
    students.forEach(
        // agregamos datos al archeglo studen
        (student) => {
            let option = document.createElement("option");
            option.value = student.dni;
            option.text = student.fullName;
            assignmentsStudent.add(option);
        }
    );
    // asignar la nota maxima
    let assignmentSetup = document.getElementById("assignment_gradebooksetup") as HTMLSelectElement;

    document.querySelectorAll("#assignment_gradebooksetup option").forEach(option => option.remove());

    // creamos un array para enviar los datos al html
    gradebookSetups.forEach(
        (data) => {
            let option = document.createElement("option");
            option.value = data.value;
            option.text = data.value;
            assignmentSetup.add(option);
        }
    );

}
initSelect()

// asignacion

//de aqui se va a llevar datos a la tabla
class Gradebook {
    // public students: Student[];
    // public activities: Activity[];
    // public gradebookSetups: GradebookSetup[];
    // public assignments: Assignment[];
    // public teachers?: Teacher[];

    constructor(
        public students: Student[],
        public activities: Activity[],
        public gradebookSetups: GradebookSetup[],
        public assignments: Assignment[],
        public teachers?: Teacher[],
    ) {
        //students: Student[], activities: Activity[], gradebookSetups: GradebookSetup[], assignments: Assignment[], teachers: Teacher[]
        //     this.students = students;
        //     this.activities = activities;
        //     this.gradebookSetups = gradebookSetups;
        //     this.assignments = assignments;
        //     this.teachers = teachers;
        // tambien se puede inisializar haciento esto en el constructor
        // aqui se puede inisializar
    };

    public buildGradebookDTOFromAssignment(): GradebookDTO[] {
        
        let gradebookDTOs: GradebookDTO[] = [];

        this.assignments.forEach(
            (assignment) => {

                //3 iguales debe tener el mismo tipo de dato

                let currentGradebooksetup = gradebookSetups.filter((item) => item.value === assignment.gradebooksetup)[0];
                let currentStudent = students.filter((student) => student.dni === assignment.student)[0];
                //con push se inserta datos,se elimina datos con pop
                //shut ingresamos datos y con shit se elimina datos
                let rowGradebook: GradebookDTO = {
                    //Course
                    // acedemos al atributo
                    course: currentGradebooksetup.course,
                    //Student
                    studentName: currentStudent.fullName,
                    lastName: "",
                    level: currentStudent.level,
                    dni: assignment.student,
                    fullName: currentStudent.fullName,
                    //GradebookSetup
                    value: currentGradebooksetup.value,
                    activity: currentGradebooksetup.activity,
                    maximun_grade: currentGradebooksetup.maximun_grade,
                    //Activity
                    name: "",
                    //Assignment
                    student: assignment.student,
                    gradebooksetup: assignment.gradebooksetup,
                    grade: assignment.grade
                    

                } //agregamos al archeglo gradebookDTOs el objeto rowGradebook
                gradebookDTOs.push(rowGradebook);
                if (assignment.grade>70) {
                    console.log('El estudiante a pasado');
                }
                else{
                    console.log('El estudiante a reprobado');
                }
            }
        );
// un arcgeglo puede tener datos ,objetos, varios archeglos
        return gradebookDTOs;
    }

}
function generateReport():void{
    let reportGrade: Gradebook= new Gradebook(students,
        activities,
        gradebookSetups,
        assignments,
        teachers
        );
    let rowReport:GradebookDTO[] = reportGrade.buildGradebookDTOFromAssignment();
    let reportTable: HTMLTableElement = document.getElementById("report") as HTMLTableElement; 
    rowReport.forEach(
        (itemDTO)=>{
            let tr:HTMLTableRowElement;
            let td:HTMLTableCellElement;
            tr = reportTable.insertRow(0);
            td = tr.insertCell(0);
            // aqui se mapea el Html
            td.innerHTML = itemDTO.course;
            td = tr.insertCell(1);
            td.innerHTML = itemDTO.studentName;
            td = tr.insertCell(2);
            td.innerHTML = String(itemDTO.level);
            td = tr.insertCell(3);
            td.innerHTML = itemDTO.activity;
            td = tr.insertCell(4);
            td.innerHTML = itemDTO.value;
            td = tr.insertCell(5);
            td.innerHTML =String(itemDTO.grade);
            td = tr.insertCell(6);
            td.innerHTML =String(itemDTO.dni);
            td = tr.insertCell(7);
            td.innerHTML =String(itemDTO.maximun_grade);
            td = tr.insertCell(8);
            
        }
    )
}
