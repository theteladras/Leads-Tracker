const { GraphQLDateTime } = require('graphql-iso-date');

module.exports =  {
    Date: GraphQLDateTime,
    Query: {
            async allUsers(parent, args, { UserSchema }) {
            const users = await UserSchema.find({ mentioned_by_company: args.company });
            return users.map(x => {
                x._id = x._id.toString();
                return x;
            })
        },
        async singleUser(parent, args, { UserSchema }) {
            const user = await UserSchema.findOne({ _id: args._id });
            return user;
        },
        async mentionedFrom(parent, args, { UserSchema, CompanySchema }) {
            const companys_c = await CompanySchema.find({ email: args.email });
            const companys_u = await UserSchema.find({ email: args.email });
            companys_u.map(x => {
                x._id = x._id.toString();
                return x;
            }); 
            companys_c.map(x => {
                x._id = x._id.toString();
                return x;
            });
            return [...companys_c, ...companys_u];
        },
        async allCompanys(parent, args, { CompanySchema }) {
            const company = await CompanySchema.find({ mentioned_by_company: args.company });
            return company.map(x => {
                x._id = x._id.toString();
                return x;
            });
        },
        async singleCompany(parent, args, { CompanySchema }) {
            const copmany = await CompanySchema.findOne({ _id: args._id });
            return copmany;
        },
        async personalInfo(parent, args, { ProfileSchema }) {
            const profile = await ProfileSchema.findOne({ email: args.email  });
            return profile;
        },
        async getManagers(parent, args, { ProfileSchema }) {
            const managers = await ProfileSchema.findOne({ company: args.company  });
            return managers;
        },
        async allLeads(parent, args, { UserSchema, CompanySchema }) {
            const leads_u = await UserSchema.find({ mentioned_by_company: args.company });
            const leads_c = await CompanySchema.find({ mentioned_by_company: args.company });
            return [...leads_u, ...leads_c];
        }
    },
    Mutation: {
        async createUser(parent, args, { UserSchema }) {
            const user = await new UserSchema(args).save();
            user._id = user._id.toString();
            return user;
        },
        async editUser(parent, args, { UserSchema }) {
            let edited_user = await UserSchema.findOneAndUpdate({  _id: args._id }, {$set: args}, {new: true});
            return edited_user;
        },
        async createCompanyLead(parent, args, { UserSchema }) {
            const user = await new UserSchema(args).save();
            user._id = user._id.toString();
            return user;
        },
        async editCompanyLead(parent, args, { CompanySchema }) {
            let edited_company = await CompanySchema.findOneAndUpdate({  _id: args._id }, {$set: args}, {new: true});
            return edited_company;
        },
        async createCompanyLead(parent, args, { CompanySchema }) {
            const company = await new CompanySchema(args).save();
            company._id = company._id.toString();
            return company;
        },
        async signup(parent, args, { ProfileSchema  }) {
            if (args.email && args.username && args.company) {
                const profile = await new ProfileSchema(args).save();
                if (profile) {
                    profile._id = profile._id.toString();
                    return profile;
                }
            }
            return;
        },
        async login(parent, args, { UserSchema, CompanySchema,  ProfileSchema  }) {
            const profile = await ProfileSchema.findOne({ email: args.email  });
            if (profile) {
                const leads_u = await UserSchema.find({ mentioned_by_company: profile.company });
                const leads_c = await CompanySchema.find({ mentioned_by_company: profile.company });
                return [...leads_u, ...leads_c];
            }
            return;
        },
        async addManager(parent, args, { ProfileSchema  }) {
            const profile = await ProfileSchema.findOneAndUpdate({ email: args.email  }, { "$addToSet": { "managers": args.email_to_add}}, {new: true});
            return profile;
        },
        async removeManager(parent, args, { ProfileSchema  }) {
            const profile = await ProfileSchema.findOneAndUpdate({ email: args.email  }, { "$pull": { "managers": args.email_to_remove}}, {new: true});
            return profile;
        },
        async deleteUserLead(parent, args, { UserSchema  }) {
            const document = await UserSchema.findOneAndRemove({ _id: args._id  });
            return document;
        },
        async deleteCompanyLead(parent, args, { CompanySchema  }) {
            const document = await CompanySchema.findOneAndRemove({ _id: args._id  });
            return document;
        },
    }
}