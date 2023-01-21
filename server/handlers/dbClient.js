const { Sender } = require("@questdb/nodejs-client");

exports.save  = async(data)=> {
  const sender = new Sender({ bufferSize: 4096 });
  await sender.connect({ port: 9009, host: process.env.DB_HOST });

  const {person, pos_x, pos_y, vel_x, vel_y, o_id, time} = data;
  sender
  .table("Human")
  .symbol("Person", person)
  .floatColumn("pos_x", pos_x)
  .floatColumn("pos_y", pos_y)
  .floatColumn("vel_x", vel_x)
  .floatColumn("vel_y", vel_y)
  .stringColumn("o_id", o_id)
  .at(time)

  await sender.flush();
  await sender.close();
}
