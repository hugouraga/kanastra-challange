# imagem base oficla do php
FROM php:8.3.1-fpm

# instalar os pacotes e depedências necessárias
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# instalar composer para gerenciar dependências
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN mkdir -p /app

# Copiar arquivos do projeto para a imagem (máquina <-> container)
ADD ./backend /app

# definir diretório de trabalho
WORKDIR /app

# instalar o compose - otimizar o autoloader - não instalar depedências de desenvolvimento
RUN composer install --optimize-autoloader --no-dev
RUN chmod -R a+w storage/ bootstrap/cache
ADD ./backend/infra/php-fpm/configs-custom-php.ini /usr/local/etc/php/conf.d/configs-custom-php.ini

EXPOSE 8000

# ENTRYPOINT ["infra/php-fpm/docker-entrypoint.sh"]
#CMD ["php", "artisan", "migrate"]
# CMD ["sh", "-c", "php artisan migrate && php artisan config:cache && php artisan serve --host=0.0.0.0 --port=8000"]


