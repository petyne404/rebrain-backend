import mongoose, { Document, Schema } from 'mongoose';

export interface ITimeCounter extends Document {
  name: string;
  partnerName?: string;
  emojis: {
    mine: string;
    partner: string;
  };
  targetDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const TimeCounterSchema: Schema<ITimeCounter> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter the counter name'],
    },
    partnerName: {
      type: String,
    },
    emojis: {
      mine: {
        type: String,
        default: '😊',
      },
      partner: {
        type: String,
        default: '💖',
      },
    },
    targetDate: {
      type: Date,
      required: [true, 'Please provide a target date'],
    },
  },
  {
    timestamps: true,
  }
);

const TimeCounter = mongoose.model<ITimeCounter>('TimeCounter', TimeCounterSchema);

export default TimeCounter;
