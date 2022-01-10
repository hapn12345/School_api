const faker = require('faker')
const _ = require('lodash')
const bcrypt = require('bcrypt')

const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'password',
      database : 'schoolkids'
    }
  });
faker.locale = 'vi';
const password = async () => {
    let password = await Promise.resolve(bcrypt.hash('123456', 10));
    return password
}


const seedingUsers = async() => {
    const users = []
    for(let i = 0; i<20; i++) {
        users.push({
            id: faker.datatype.uuid(),
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

const seedingUserAccess = async ()=>{
    const users =await knex('user')
    const userAccess = []
    for (let i = 0; i < 5; i++) {
        userAccess.push({
            id: faker.datatype.uuid(),
            userId: users[i].id,
            status: "active",
            roleName: "ADMIN"
        })
        
    }
    for (let i = 5; i < 10; i++) {
        userAccess.push({
            id: faker.datatype.uuid(),
            userId: users[i].id,
            status: "active",
            roleName: "PARENT"
        })
        
    }
    return userAccess
}

const seedingNews = async()=>{
    const news = []
    for(let i = 0; i < 10; i++) {
        news.push({
            id: i,
            content: faker.lorem.lines(1),
            description: faker.lorem.paragraph(2),
            thumbnail: faker.image.image(),
            releaseDate: faker.datatype.datetime(),
        })
    }
    return news
}

const seeding = async () => {
   try {
    //users
    await knex("user").del()
    const users = await Promise.resolve(seedingUsers()) 
    await knex("user").insert(users)
    // user access
    await knex("user_access").del()
    const userAccess = await Promise.resolve(seedingUserAccess()) 
    console.log(userAccess);
    await knex("user_access").insert(userAccess)
    //news
    await knex("news").del()
    const news = await Promise.resolve(seedingNews()) 
    console.log(news);
    await knex("news").insert(news)

    knex.destroy()
   } catch (error) {
       console.log(error);
    knex.destroy()

   }

}

seeding()
