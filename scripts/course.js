// scripts/course.js

const courses = [

    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 3,
        completed: true
    },

    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 3,
        completed: true
    },

    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 3,
        completed: false
    },

    {
        subject: "CSE",
        number: 110,
        title: "Programming Building Blocks",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        completed: true
    },

    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        completed: false
    }
];

const courseContainer =
    document.querySelector("#courses");

const creditDisplay =
    document.querySelector("#credits");

function displayCourses(courseList) {

    courseContainer.innerHTML = "";

    courseList.forEach(course => {

        const card =
            document.createElement("div");

        card.classList.add("course-card");

        if (course.completed) {

            card.classList.add("completed");
        }

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <p>${course.credits} Credits</p>
        `;

        courseContainer.appendChild(card);
    });

    const totalCredits =
        courseList.reduce(
            (total, course) =>
                total + course.credits,
            0
        );

    creditDisplay.textContent =
        totalCredits;
}

displayCourses(courses);

document.querySelector("#all")
    .addEventListener("click", () => {

        displayCourses(courses);
    });

document.querySelector("#wdd")
    .addEventListener("click", () => {

        const wddCourses =
            courses.filter(course =>
                course.subject === "WDD"
            );

        displayCourses(wddCourses);
    });

document.querySelector("#cse")
    .addEventListener("click", () => {

        const cseCourses =
            courses.filter(course =>
                course.subject === "CSE"
            );

        displayCourses(cseCourses);
    });