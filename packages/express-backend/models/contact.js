import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
            trim: true,
        },
        last_name: {
            type: String,
            trim: true,
        },
        phone_number: {
            type: String,
            trim: true,
            // validate(phone) {
            //     var validRegex =
            //         /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            //     if (!phone.match(validRegex))
            //         throw new Error('Invalid Phone Number. Try Again.')
            // },
        },
        email: {
            type: String,
            trim: true,
            // validate(email) {
            //     var validRegex =
            //         /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            //     if (!email.match(validRegex))
            //         throw new Error('Invalid Email Address. Try Again.')
            // },
        },
        address: {
            type: String,
        },
        birthday: {
            type: String,
            trim: true,
        },
        notes: {
            type: String,
        },
        tags: {
            type: [String],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            default: 'FaUser',
        userID: {
            type: String,
            required: true,
        },
    },
    { collection: 'contact_list' },
)

const Contact = mongoose.model('Contact', ContactSchema)

export default Contact
