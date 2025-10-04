import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Subscription name is required'],
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    price:{
        type: Number,
        required: [true,'Subscription price is required'],
        min: [0, 'Price is greater than 0'],
    },
    currency: {
        type: String,
        enum: ['EUR', 'USD'],
        default: 'USD',
        required: [true,'Subscription currency is required'],
    },
    frequency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
        required: [true,'Subscription frequency is required'],
        min: [0, 'Frequency is greater than 0'],
    },
    category: {
        type: String,
        enum: ['sports', 'finance','technology', 'lifestyle'],
        required: [true,'Subscription category is required'],
    },
    paymentMethod:{
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['active', 'cancel','expired'],
        default: 'active',
    },
    startDate:{
        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start Date must be in the past',
        }
    },
    renewalDate:{
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value>this.startDate;
            },
            message: 'Renewal Date must be after the start date',
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }

},{timestamps: true});

//auto calculate the renewal date if missing
subscriptionSchema.pre('save', function (next) {
    if(!this.renewalDate){
        const renewalPeriods = {
            Daily: 1,
            Weekly: 7,
            Monthly: 30,
            Yearly: 365,
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //auto update the status if renewal date has passed
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }

    next();
})


export default subscriptionSchema;
