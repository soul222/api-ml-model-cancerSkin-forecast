# Gunakan Node.js base image
FROM node:16

# Buat direktori kerja
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin semua file ke direktori kerja
COPY . .

# Expose port
EXPOSE 8080

# Jalankan aplikasi
CMD ["npm", "start"]
