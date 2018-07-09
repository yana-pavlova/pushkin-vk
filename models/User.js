const keystone = require('keystone');
const Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User',{
    label: 'Пользователи',
    map: { name: 'name' },
});

User.add({
    name: { type: Types.Name, required: true, index: true },
    email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
    password: { type: Types.Password, initial: true, required: true },

    authors: { type: Types.Relationship, many: true, ref: 'Author', index: true, label: 'Авторы' },

}, 'Permissions', {
    isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
    return this.isAdmin;
});

User.schema.methods.wasActive = function () {
    this.lastActiveOn = new Date();
    return this;
};

User.schema.set('toJSON', {
    // virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._;
        // delete ret._id;
        delete ret.email;
        delete ret.isAdmin;
        // delete ret.name;
        delete ret.password;
        return ret;
    }
    
})

/**
 * Relationships
 */
User.relationship({ ref: 'Author', path: 'authors', refPath: 'user' });

/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin';
User.register();
