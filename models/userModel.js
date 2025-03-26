const prisma = require('../prisma/client');

async function createUser(name, email, password, imageUrl = null) {
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: password,
      imageUrl: imageUrl,
    },
  });
  return user;
}

async function createUsers(users) {
  const createdUsers = await prisma.user.createMany({
    data: users,
  });
  return createdUsers;
}

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  });
  return user;
}

async function getUserByEmail(email) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

async function getAllUsers() {
  const user = await prisma.user.findMany({
    orderBy: {
      name: 'desc',
    },
  });
  return user;
}

async function getUsersOnSearchQuery(search, page) {
  const pageSize = 10;
  const users = await prisma.user.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: { createdAt: 'desc' },
  });
  return users;
}
async function getRandomUsers() {
  const count = await prisma.user.count();
  const randomSkip = Math.max(0, Math.floor(Math.random() * (count - 3)));

  const users = await prisma.user.findMany({
    take: 3,
    skip: randomSkip, // Skip a random number of rows
  });

  return users;
}

async function updateUser(id, name, email) {
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      email: email,
    },
  });
  return user;
}

async function deleteUser(id) {
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return user;
}

async function deleteAllUsers() {
  const user = await prisma.user.deleteMany();
  return user;
}

module.exports = {
  createUser,
  createUsers,
  getUserById,
  getUserByEmail,
  getAllUsers,
  getRandomUsers,
  getUsersOnSearchQuery,
  updateUser,
  deleteUser,
  deleteAllUsers,
};
