FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    oniguruma-dev \
    libzip-dev \
    icu-dev \
    nginx

# Install PHP extensions
RUN docker-php-ext-install pcntl gd bcmath zip intl pdo_mysql mbstring exif

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy existing application directory contents
COPY . /var/www

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev

# Set permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Copy nginx config
COPY ./docker/nginx/conf.d/app.conf /etc/nginx/http.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx and php-fpm
CMD php-fpm -D && nginx -g "daemon off;"
