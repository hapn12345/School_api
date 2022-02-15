const faker = require('faker')
const _ = require('lodash')
const bcrypt = require('bcrypt')

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'schoolkids'
    }
});
faker.locale = 'vi';
const password = async () => {
    let password = await Promise.resolve(bcrypt.hash('123456', 10));
    return password
}

const seedingUsers = async () => {
    const users = []
    for (let i = 0; i < 20; i++) {
        users.push({
            id: i,
            userName: faker.internet.email(),
            password: await password(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            phoneNumber: faker.phone.phoneNumber(),
            email: faker.internet.email()
        })
    }
    return users
}
const seedingStudents = () => {
    const student = []
    for (let i = 0; i < 20; i++) {
        student.push({
            id: i,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            classId: 1,

        })
    }
    return student
}
const seedingSchools = () => {
    const schools = []
    for (let i = 0; i < 20; i++) {
        schools.push({
            id: i,
            name: faker.name.firstName(),
            info: faker.commerce.productDescription(),

        })
    }
    return schools
}
const seedingMenu = async () => {
    const menu = []
    let classes = (await knex("class")).map(x => x.id)
    const content = {
        monday: {
            breakfast: {
                startAt: "6h30",
                endAt: "7h30",
                dish: ["Phở bò", "bánh xu kem"]
            }
            , morning_supplement: {
                startAt: "9h00",
                endAt: "9h30",
                dish: ["sữa"]
            }
            , lunch: {
                startAt: "11h00",
                endAt: "11h30",
                dish: ["cơm", "canh cải", "cá hồi"]
            }
            , tea: {
                startAt: "14h00",
                endAt: "14h30",
                dish: ["sữa", "chè đậu xanh"]
            }

        },
        tuesday: {
            breakfast: {
                startAt: "6h30",
                endAt: "7h30",
                dish: ["Phở bò", "bánh xu kem"]
            }
            , morning_supplement: {
                startAt: "9h00",
                endAt: "9h30",
                dish: ["sữa"]
            }
            , lunch: {
                startAt: "11h00",
                endAt: "11h30",
                dish: ["cơm", "canh cải", "cá hồi"]
            }
            , tea: {
                startAt: "14h00",
                endAt: "14h30",
                dish: ["sữa", "chè đậu xanh"]
            }

        },
        wednesday: {
            breakfast: {
                startAt: "6h30",
                endAt: "7h30",
                dish: ["Phở bò", "bánh xu kem"]
            }
            , morning_supplement: {
                startAt: "9h00",
                endAt: "9h30",
                dish: ["sữa"]
            }
            , lunch: {
                startAt: "11h00",
                endAt: "11h30",
                dish: ["cơm", "canh cải", "cá hồi"]
            }
            , tea: {
                startAt: "14h00",
                endAt: "14h30",
                dish: ["sữa", "chè đậu xanh"]
            }

        },
        thursday: {
            breakfast: {
                startAt: "6h30",
                endAt: "7h30",
                dish: ["Phở bò", "bánh xu kem"]
            }
            , morning_supplement: {
                startAt: "9h00",
                endAt: "9h30",
                dish: ["sữa"]
            }
            , lunch: {
                startAt: "11h00",
                endAt: "11h30",
                dish: ["cơm", "canh cải", "cá hồi"]
            }
            , tea: {
                startAt: "14h00",
                endAt: "14h30",
                dish: ["sữa", "chè đậu xanh"]
            }

        },
        friday: {
            breakfast: {
                startAt: "6h30",
                endAt: "7h30",
                dish: ["Phở bò", "bánh xu kem"]
            }
            , morning_supplement: {
                startAt: "9h00",
                endAt: "9h30",
                dish: ["sữa"]
            }
            , lunch: {
                startAt: "11h00",
                endAt: "11h30",
                dish: ["cơm", "canh cải", "cá hồi"]
            }
            , tea: {
                startAt: "14h00",
                endAt: "14h30",
                dish: ["sữa", "chè đậu xanh"]
            }

        },
    }
    for (let i = 0; i < classes.length; i++) {
        menu.push({
            id: i,
            content: JSON.stringify(content),
            classId: classes[i],
        })
    }
    return menu
}

const seedingUserAccess = async () => {
    const users = await knex('user')
    const schoolIds = (await knex("school")).map(x => x.id)

    const userAccess = []
    for (let i = 0; i < 5; i++) {
        userAccess.push({
            id: i,
            userId: users[i].id,
            status: "active",
            roleName: "ADMIN"
        })

    }
    const studentId = (await knex("student")).map(x => x.id)
    for (let i = 5; i < 10; i++) {
        userAccess.push({
            id: i,
            userId: users[i].id,
            classId: 1,
            studentId: _.sample(studentId),
            schoolId: _.sample(schoolIds),
            status: "active",
            roleName: "PARENT"
        })

    }
    for (let i = 10; i < 15; i++) {
        userAccess.push({
            id: i,
            userId: users[i].id,
            classId: 1,
            schoolId: _.sample(schoolIds),
            status: "active",
            roleName: "TEACHER"
        })

    }
    return userAccess
}

const seedingNews = async () => {
    const news = []
    for (let i = 0; i < 10; i++) {
        news.push({
            id: i,
            content: faker.lorem.lines(2),
            description: faker.lorem.paragraph(3),
            thumbnail: faker.image.image(),
            releaseDate: faker.datatype.datetime(),
        })
    }
    return news
}

const seedingClasses = () => {
    var schedule = [
        { "startAt": "7h30", "endAt": "8h15", "content": "Đón trẻ - Ăn sáng." },
        { "startAt": "8h15", "endAt": "8h40", "content": "Thể dục sáng - Điểm danh." },
        { "startAt": "8h40", "endAt": "9h15", "content": "Hoạt động học tập." },
        { "startAt": "9h15", "endAt": "9h55", "content": "Hoạt động ngoài trời." },
        { "startAt": "9h55", "endAt": "10h30", "content": "Hoạt động góc." },
        { "startAt": "10h30", "endAt": "11h40", "content": "Vệ sinh - Ăn trưa." }, { "startAt": "11h40", "endAt": "14h15", "content": "Ngủ trưa." }, { "startAt": "14h15", "endAt": "15h00", "content": "Vệ sinh - Ăn quà chiều." }, { "startAt": "15h00", "endAt": "16h15", "content": "Hoạt động chiều." }, { "startAt": "15h00", "endAt": "16h15", "content": "Trả trẻ." }]
    const classes = []
    for (let i = 0; i < 3; i++) {
        classes.push({
            id: i + 1,
            name: faker.lorem.lines(1),
            fee: _.random(1000000, 9000000),
            schedule: JSON.stringify(schedule),
        })
    }
    return classes
}

const seedingActivity = async () => {
    const activity = []
    for (let i = 0; i < 10; i++) {
        activity.push({
            id: i,
            name: faker.lorem.lines(2),
            address: faker.lorem.lines(1)
        })
    }
    return activity
}
const seedingHealth = async () => {
    const studentId = (await knex("student")).map(x => x.id)
    const health = []
    for (let i = 0; i < 10; i++) {
        health.push({
            id: i,
            weight: _.random(20,40),
            height: _.random(100,150),
            note: faker.lorem.lines(1),
            studentID: _.sample(studentId),
            checkedAt: faker.datatype.datetime(10),
        })
    }
    return health
}
const seedingParticipants = async () => {
    const studentId = (await knex("student")).map(x => x.id)
    const classId = (await knex("class")).map(x => x.id)
    const activityId = (await knex("activity")).map(x => x.id)
    const participant = []
    for (let i = 0; i < 10; i++) {
        participant.push({
            id: i,
            activityID: _.sample(activityId),
            studentID: _.sample(studentId),
            classID: _.sample(classId)
        })
    }
    return participant
}
const seeding = async () => {
    try {
        await knex("user").del()
        await knex("participant").del()
        await knex("activity").del()
        await knex("news").del()
        await knex("user_access").del()
        await knex("leave_day").del()
        await knex("fee").del()
        await knex("student_health").del()
        await knex("album").del()
        await knex("student").del()
        await knex("menu").del()
        await knex("class").del()
        await knex("meeting").del()
        await knex("message").del()
        await knex("school").del()

        //class
        const classes = seedingClasses()
        await knex("class").insert(classes)
        //users
        const users = await Promise.resolve(seedingUsers())
        await knex("user").insert(users)
        //student
        const student = seedingStudents()
        await knex("student").insert(student)
        //student
        const schools = seedingSchools()
        await knex("school").insert(schools)
        // user access
        const userAccess = await Promise.resolve(seedingUserAccess())
        await knex("user_access").insert(userAccess)
        //news
        const news = await Promise.resolve(seedingNews())
        await knex("news").insert(news)
        //activity
        const activities = await Promise.resolve(seedingActivity())
        await knex("activity").insert(activities)
        //menu
        const menu = await Promise.resolve(seedingMenu())
        await knex("menu").insert(menu)
        //student_health
        const health = await Promise.resolve(seedingHealth())
        await knex("student_health").insert(health)
        //participants
        const participant = await Promise.resolve(seedingParticipants())
        await knex("participant").insert(participant)

        knex.destroy()
    } catch (error) {
        console.log(error);
        knex.destroy()

    }

}

seeding()
