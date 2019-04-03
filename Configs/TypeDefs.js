const { gql } = require('apollo-server-express');

module.exports = gql`
    scalar Date
    type user_lead {
        _id: String
        name: String!
        surname: String!
        address: String!
        phone: String!
        email: String!
        gender: String!
        category: String!
        mentioned_by_company: String!
        date: Date!
    }
    type comp_lead {
        _id: String
        name: String!
        contact: String!
        address: String!
        phone: String!
        email: String!
        web: String!
        category: String!
        mentioned_by_company: String!
        date: Date!
    }
    type profile {
        username: String!
        email: String!
        company: String!
        managers: [String]
        date: Date!
    }
    type partner_companies {
        _id: String
        mentioned_by_company: String
    }
    type leads {
        _id: String!
        name: String!
        email: String!
        address: String!
        phone: String!
        surname: String
        gender: String
        contact: String
        web: String
        category: String
        date: Date
    }
    type Query {
        allUsers(company: String!): [user_lead!]!
        singleUser(_id: String!): user_lead!
        allCompanys(company: String!): [comp_lead!]!
        singleCompany(_id: String!): comp_lead!
        mentionedFrom(email: String!): [partner_companies]
        personalInfo(email: String!): profile!
        getManagers(company: String!): profile!
        allLeads(company: String!): [leads]!
    }
    type Mutation {
        createUser(
            name: String!, 
            surname: String!,
            gender: String!,
            phone: String!, 
            email: String!, 
            address: String!,
            category: String
            mentioned_by_company: String!
        ): user_lead!
        editUser(
            _id: String!, 
            name: String, 
            surname: String, 
            gender: String, 
            phone: String, 
            email: String,
            category: String,
            address: String,
        ): user_lead!
        
        createCompanyLead(
            name: String!, 
            contact: String!, 
            address: String!, 
            phone: String!, 
            email: String!, 
            web: String!,
            category: String!
            mentioned_by_company: String!
        ): comp_lead!
        editCompanyLead(
            _id: String!, 
            name: String,
            contact: String,
            address: String,
            phone: String,
            email: String,
            category: String,
            web: String,
        ): comp_lead!

        signup(
            company: String!
            username: String!
            email: String!
            manager: String
        ): profile!

        login(
            email: String!
        ): [leads]

        deleteUserLead(_id: String!): user_lead
        deleteCompanyLead(_id: String!): comp_lead

        addManager(email: String!, email_to_add: String!): profile!
        removeManager(email: String!, email_to_remove: String!): profile!
    }
`;