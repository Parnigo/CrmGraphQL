On Visual Studio code

To install:
npm install

To Run:
node server

Run in dev mode
npm run dev

FOR CHATGPT
Request ES6+ style code

also... 
Perfect — once research is available again, I’ll show you how to configure Yoga’s built-in GraphiQL UI to automatically inject the JWT from localStorage into all GraphQL requests.
In the meantime, your entire backend setup is ready to go. Let me know if you want help with token refresh, role-based access, or expanding your schema next!


---other stuff.. chatGPT metioned some stuff
Let me know what’s next:

Want to seed test data?

Add new queries/mutations?

Dockerize it?

Or maybe add a health check route or admin panel?

----

DOCKER 

0) I feel like this should not be needed but in the directory with the source files do:

        npm install


1) From the SSH console create the docker using:   THIS STEP CAN BE SKIPPED AS #2 BELOW WILL ALSO DO THE BUILD DUE TO .build in .docker-compose.yml file

        sudo DOCKER_BUILDKIT=0 docker build -t parnigo-crm .
                                                                    <<the . at the end is needed. you MUST be in the directory with the node.js files


Note: If you don't need BuildKit's features, you can disable it by setting the environment variable to 0.

BUT: BuildKit is Docker's modern build engine designed to improve and streamline the process of building Docker images. BuildKit provides a faster, more efficient, and more secure way to build Docker images compared to the legacy builder. If these benefits align with your workflow, setting up BuildKit (and ensuring Buildx is installed) can be a worthwhile upgrade.


2) To deploy the docker:

           cd /volume1/docker/CRM
           sudo docker-compose -f docker-compose.yml up -d

   To update: (shuts it down)
           sudo docker-compose -f docker-compose.yml down
           sudo docker-compose -f docker-compose.yml up -d

   Or do stop, rebuild and start:
           sudo docker-compose -f docker-compose.yml down
           sudo docker-compose -f docker-compose.yml build --no-cache
           sudo docker-compose -f docker-compose.yml up -d --remove-orphans

    Note: you can put output into a file via: sudo docker-compose -f docker-compose.yml build --no-cache > build.log 2>&1

3) To see the directory (once the containing is started) you can see the files using:

           sudo docker exec -it parnigo-crm sh
           ls -l /usr/src/app/node_modules/dotenv

