Shopify Node App V0.2
=

10/07/2017
--
- Moved from ./bin/www to ./start.js for start system.
- Models now need to be referenced in start.js to be initialised.
- Can call models using mongoose.model('ModelName') instead of requiring them in each file. individually.
- General bug fixes