const {gql, ApolloServer, UserInputError} = require("apollo-server");
const {v4} = require('uuid')
const persons= [
    {
        name: "Midu",
        phone: "91124654",
        street: "Calle Freont",
        city: "Barcelona",
        id:"56dsa56sd56das65"
    },
    {
        name: "Midu 2",
        phone: "91124654 2",
        street: "Calle Freont 2",
        city: "Barcelona 2",
        id:"56dsa56sd56das65 2"
    },
    {
        name: "Midu 3",
        street: "Calle Freont 3",
        city: "Barcelona 3",
        id:"56dsa56sd56das65 3"
    },
]

const typeDefs =gql`
    type Address{
        street: String!
        city: String!
    }
    type Person{
        name: String!
        phone: String
        street: String!
        city: String!
        id: ID!
        aea: String!
        address: Address!
    }
    
    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name : String!): Person
    }
    
    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person
    }
`

const resolvers = {
    Query: {
        personCount: ()=>persons.length,
        allPersons: ()=>persons,
        findPerson: (root, args)=>{
            const {name} = args
            return persons.find(p=>p.name===name)
        }
    },
    Person: {
        name: (root)=> root.name + 'Holi',
        aea: (root)=>'dsadsad',
        address: (root)=>{
            return {
                street: 'streeeeeet'
            }
        }
    },
    Mutation:{
        addPerson: (root, args)=>{
            if(persons.find(p=>p.name==args.name)) throw new UserInputError('Name must be unique',{
                invalidArgs: args.name
            })
            const person = {...args, id: v4()}
            persons.push(person)
            return person
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url})=>{
    console.log('server in', url)
})
