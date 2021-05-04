const _ = require('lodash')
const totalLikes = (blogs) => {
    if (blogs == null || blogs.length == null) {
        return 0
    }

    return blogs.reduce((sum, item) => {
        return sum + item.likes
    }, 0)
}

const mostBlogs = (blogs) => {
    if (blogs == null || blogs.length == null) {
        return 0
    }
    const counts = _.countBy(blogs, 'author')
    const keys = Object.keys(counts)
    const maxKey = _.maxBy(keys,(item)=>counts[item])
    return {
        author:maxKey,
        blogs:counts[maxKey]
    }
}

module.exports = {
    totalLikes, mostBlogs
}