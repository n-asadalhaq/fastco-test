import express from 'express';

export const logger: express.RequestHandler = (req, res, next) => {
  const ipAddr =
    req.ip ||
    req.ips ||
    req.socket.remoteAddress;

  // Timestamp request is received by the server
  const now = new Date();

  console.log('ipAddr', ipAddr);
  console.log('ipAddr', req.ip);
  console.log('ipAddr', req.ips);
  console.log('now', now.toISOString());

  next();
};
