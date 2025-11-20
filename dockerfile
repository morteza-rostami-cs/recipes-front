FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Expose the port for vite preview
EXPOSE 4173

# Run the demo in preview mode
CMD ["npm", "run", "preview", "--", "--port", "4173", "--host"]
