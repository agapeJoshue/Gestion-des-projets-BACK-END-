const db = require("../../models");
const CYCLE = db.cycles;


exports.getCycleByStatus = async (status) => {
    try {
        return await CYCLE.findAll({ where: { status_cycle: status } });
    } catch (err) {
        throw new Error(err.message);
    }
}