const amqp = require('amqplib');
let amqpConn = null;
let pubChannel = null;
module.exports = {
  InitConnection: (fnFinish) => {
    console.log('Attempting RabbitMQ Connection...');
    // Start connection with Rabbitmq
    amqp.connect({hostname: 'rabbitmq'}).then((conn) => {
      conn.on("error", function (err) {
        console.log("ERROR", err);
        if (err.message !== "Connection closing") {
          console.error("[AMQP] conn error", err.message);
        }
      });

      conn.on("close", function () {
        // Reconnect when connection was closed
        console.error("[AMQP] reconnecting");
        return setTimeout(() => { module.exports.InitConnection(fnFinish) }, 1000);
      });
      // Connection OK
      console.log("[AMQP] connected");
      amqpConn = conn;
      // Execute finish function
      fnFinish();
    })
  },
  StartPublisher: () => {
    // Init publisher
    return amqpConn.createConfirmChannel().then((ch) => {
      ch.on("error", function (err) {
        console.error("[AMQP] channel error", err.message);
      });

      ch.on("close", function () {
        console.log("[AMQP] channel closed");
      });

      // Set publisher channel in a var
      pubChannel = ch;
      console.log("[AMQP] Publisher started");
    })
  },
  PublishMessage: (exchange, queue, topic, content, options = {}) => {
    // Verify if pubchannel is started
    if (!pubChannel) {
      console.error("[AMQP] Can't publish message. Publisher is not initialized. You need to initialize them with StartPublisher function");
      return;
    }

    //Create exchange and queue in case they don't exist
    channel.assertExchange(exchange, 'topic', { passive: false, durable: true, auto_delete:false });
    channel.assertQueue(queue, { durable: true, auto_delete:false });
    channel.bindQueue(queue, exchange, topic);
    // convert string message in buffer
    const message = Buffer.from(content, "utf-8");
    try {
      // Publish message to exchange
      // options is not required
      pubChannel.publish(exchange, topic, message, options,
        (err) => {
          if (err) {
            console.error("[AMQP] publish", err);
            pubChannel.connection.close();
            return;
          }
          console.log("[AMQP] message delivered");
        });
    } catch (e) {
      console.error("[AMQP] publish", e.message);
    }
  }
};

function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}