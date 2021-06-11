module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        complaint: {
            type: String,
            required: true
        },
        queue: Number,
        status: Boolean,
        date: {
            type: String,
            required: true
        },
    }, {
        timestamps: true
    });

    schema.method("toJSON", function () {
        const {
            __v,
            _id,
            ...object
        } = this.toObject();
        object.id = _id;
        return object;
    });

    const Customer = mongoose.model("customer", schema);
    return Customer;
};