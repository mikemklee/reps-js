require('colors');

module.exports = (request, response, next) => {
  request.API_DATA = {
    open: true, // use a flag to detect and handle early request closes
  };
  console.log(
    'api:request'.blue.bold,
    `${request.method} ${request.originalUrl}`
  );
  response.on('finish', () => {
    if (!request.API_DATA.open) return;
    request.API_DATA.open = false;
    console.log(
      'api:request'.blue.bold,
      `${request.method} ${request.originalUrl} finish`
    );
  });
  response.on('close', () => {
    if (!request.API_DATA.open) return;
    request.API_DATA.open = false;
    console.log(
      'api:request'.blue.bold,
      `${request.method} ${request.originalUrl} close`
    );
  });
  next();
};
