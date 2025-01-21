import { convertDate } from "../utils/convert-date"
import {prisma} from "../lib/prisma"
import { initialData } from "./seed"
import { Priority, Status } from "../interfaces"

async function main() {
    const { projects, tags, todos } = initialData

    // Clean database
    await prisma.tag.deleteMany()
    await prisma.project.deleteMany()
    await prisma.todo.deleteMany()

    // create tags
    await prisma.tag.createMany({data: tags.map( item => ({name: item}))})
    await prisma.project.createMany({data: projects.map( item => ({name: item}))})

    // return and convert db to objets
    const tagsDB = await prisma.tag.findMany() 
    const projectDB = await prisma.project.findMany()

    const tagsObj = tagsDB.reduce( ( obj, tag) => ({...obj, [tag.name]: tag.id}),{} as Record<string, string>)
    const projectObj = projectDB.reduce((obj, pro) => ({...obj, [pro.name]: pro.id}), {} as Record<string, string>)

    // create ToDos

    await prisma.todo.createMany({data: todos.map( item => {
        const { title, description, dueDate, status, priority, project, tags} = item

        const projectId = projectObj[project]

        // extact id tags
        const todoTags = tags.map( item => (tagsObj[item]))

        const priorityTodo = priority as Priority
        const statusTodo = status as Status


        return {
            title,
            description,
            priority: priorityTodo,
            status: statusTodo,
            dueDate: new Date(convertDate(dueDate)),
            projectId,
            tags: todoTags
        }
    })})

    const todosDB = await prisma.todo.findMany()

    console.log(todosDB[0])
    

    console.log('Seed Executed')
}


(() => {
    main()
})()