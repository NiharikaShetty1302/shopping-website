# Use lightweight nginx image
FROM nginx:alpine
LABEL maintainer="Niharika"

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy all website files to nginx folder
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
