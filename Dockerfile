FROM node:9-slim
WORKDIR /app
COPY run.sh index.js package.json /app/
ENV CHROME_BIN=google-chrome-unstable PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN apt-get update && apt-get install -y wget --no-install-recommends \
        && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
        && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
        && apt-get update \
        && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
          --no-install-recommends \
        && rm -rf /var/lib/apt/lists/* \
        && apt-get purge --auto-remove -y curl \
        && rm -rf /src/*.deb
RUN npm config set registry http://registry.npm.taobao.org/ && npm install && chmod +x /app/run.sh
EXPOSE 3000
ENTRYPOINT /app/run.sh

