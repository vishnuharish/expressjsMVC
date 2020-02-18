const dbCredentials = {
    dbUser: 'harish',
    password: 'Cadmium%1993%'
}

module.exports = {
    dbUrl: `mongodb://ds034348.mlab.com:34348/blog_posts`,
    auth: {
        user: dbCredentials.dbUser,
        password: dbCredentials.password
    }
}