# Step 1: Use a base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /index

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Expose the port the app runs on
EXPOSE 8000

# Step 7: Start the application
CMD ["npm", "start"]
