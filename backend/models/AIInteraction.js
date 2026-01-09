const mongoose = require("mongoose");

const AIInteractionSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

AIInteractionSchema.set("toJSON", {
    transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    },
});

module.exports = mongoose.model("AIInteraction", AIInteractionSchema);
