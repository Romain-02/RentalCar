# RentalCarLensClient

---

## Steps to launch the project (front client):

```bash
npm install
npx ng serve
```

## Docker

If you use docker in your process, follow the next steps in the bottom to create your image, container and launch it 

```bash
docker build -t app-angular .
docker run -p 4200:4200 --name angular-container app-angular
```

```bash
docker start angular-container
```
