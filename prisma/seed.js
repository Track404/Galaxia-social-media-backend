const prisma = require('./client');
const { faker } = require('@faker-js/faker');

async function main() {
  // Step 1: Create 20 users
  const users = [];
  for (let i = 0; i < 20; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        imageUrl: faker.image.avatar(),
      },
    });
    users.push(user); // Store user in the array
  }

  console.log('Users created:', users.length);

  // Step 2: Create 5 posts for each user
  const posts = [];
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          authorId: user.id, // Linking post to the user
        },
      });
      posts.push(post); // Store post in the array
    }
  }

  console.log('Posts created:', posts.length);

  // Step 3: Create 3 comments for each post
  const comments = [];
  for (const post of posts) {
    for (let i = 0; i < 3; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)]; // Pick a random user for each comment
      const comment = await prisma.comment.create({
        data: {
          content: faker.lorem.sentence(),
          authorId: randomUser.id, // Comment by random user
          postId: post.id, // Linking comment to the post
        },
      });
      comments.push(comment); // Store comment in the array
    }
  }

  console.log('Comments created:', comments.length);

  // Step 4: Create likes for posts (random users liking random posts)
  for (let i = 0; i < 40; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPost = posts[Math.floor(Math.random() * posts.length)];

    await prisma.like.create({
      data: {
        authorId: randomUser.id, // User who liked the post
        postId: randomPost.id, // Post that was liked
      },
    });
  }

  console.log('Likes for posts created.');

  // Step 5: Create likes for comments (random users liking random comments)
  for (let i = 0; i < 40; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    await prisma.like.create({
      data: {
        authorId: randomUser.id, // User who liked the comment
        commentId: randomComment.id, // Comment that was liked
      },
    });
  }

  console.log('Likes for comments created.');

  // Step 6: Create follows (random users following random users)
  for (let i = 0; i < 30; i++) {
    const follower = users[Math.floor(Math.random() * users.length)];
    let following = users[Math.floor(Math.random() * users.length)];

    while (follower.id === following.id) {
      following = users[Math.floor(Math.random() * users.length)]; // Prevent self-following
    }

    await prisma.follow.create({
      data: {
        followerId: follower.id, // Follower
        followingId: following.id, // Followed user
      },
    });
  }

  console.log('Follows created.');

  // Step 7: Disconnect Prisma Client after seeding is done
  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
