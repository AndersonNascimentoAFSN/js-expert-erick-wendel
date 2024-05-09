const UserFactory = require("./factory/userFactory");

; (async () => {
  const useFactory = await UserFactory.createInstance()
  const users = await useFactory.find({ name: 'Anderson Nascimento' })
  console.log(users)
})()