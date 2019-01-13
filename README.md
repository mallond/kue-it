# kue-it
A Distributed Queue Batch Job - POC

>> 100 Thousand CSV reads and Translation into JSON -- 0.596 Seconds!!!!

![image](https://user-images.githubusercontent.com/993459/51082354-fc15c200-16ca-11e9-9f27-b35b45cf811a.png)


## Dashboard Created By:  npx create-react-app my-app

```

+ react-dom@16.7.0
+ react@16.7.0
+ react-scripts@2.1.3
added 1991 packages in 145.23s

Success! Created dashboard at /Users/david.mallon/git/kue-it/dashboard
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd dashboard
  npm start

Happy hacking!
david.mallon in 

```

## Wanky Ways
1. cd dashboard
2. pm2 start pm2-3-instances.json
3. Go to your browser
4. http://localhost:3001/initialize?jobName=OneHundredThousand&transactions=100000&consumers=1000
5. http://localhost:3002/initialize?jobName=OneHundredThousand&transactions=100000&consumers=1000
6. http://localhost:3003/initialize?jobName=OneHundredThousand&transactions=100000&consumers=1000
7. npm start


This browser links will create 3 server instances with 200 workers each - Yea, a little overkill







