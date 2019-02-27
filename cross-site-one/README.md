
## Shared Local storage Hub application
##### This application provides shared local storage to other application. It acts like server for Local storage

```
CrossStorageHub.init([
   {origin: /domain2.netlify.com/, allow: ['get', 'set']},
   {origin: /domain3.netlify.com/, allow: ['get']},
]);
```

Note : Replace above origin with the client application from which you will access the local storage.

####Steps to run the application
``` 
   - npm install
   - npm run build
```
##### Deploy this application into your server and note down the domain on which it's running.
