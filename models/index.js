const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack', {
    logging: false
});

const Page = db.define('page', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM('open', 'closed')
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
    // ,
    // hooks: {
    //     beforeValidate: (instance, object) => {
    //         instance.slug = generateSlug(instance.title)
    //     }
    // }
})

function generateSlug (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

Page.hook('beforeValidate', (instance, object) => {
    instance.slug = generateSlug(instance.title)
})

const User = db.define('user', {
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
})

// Page.beforeCreate( (instance, object) => {
//     instance.slug = generateSlug(instance.title)
// })

module.exports = {
  db, Page, User
}