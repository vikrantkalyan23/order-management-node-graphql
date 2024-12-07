const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
const Order = require('../models/Order');

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        email: { type: GraphQLString },
        items: { type: new GraphQLList(GraphQLString) },
        createdAt: { type: GraphQLString }
    }
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                return Order.find();
            }
        }
    }
});

// Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addOrder: {
            type: OrderType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                items: { type: new GraphQLList(GraphQLString) }
            },
            resolve(parent, args) {
                const order = new Order({
                    name: args.name,
                    address: args.address,
                    email: args.email,
                    items: args.items
                });
                return order.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
