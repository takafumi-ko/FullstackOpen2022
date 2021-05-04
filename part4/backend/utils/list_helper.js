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
    const maxKey = _.maxBy(keys, (item) => counts[item])
    return {
        author: maxKey,
        blogs: counts[maxKey]
    }
}
const mostLikes = (blogs) => {
    if (blogs == null || blogs.length == null) {
        return 0
    }
    const groupByAuthor = _.groupBy(blogs, 'author')
    const sums = _.map(groupByAuthor,(value,key)=>{
        return {
            author:key,
            likes:_.sumBy(value,'likes')
        }
    })
    return _.maxBy(sums, 'likes')
}

module.exports = {
    totalLikes, mostBlogs, mostLikes
}