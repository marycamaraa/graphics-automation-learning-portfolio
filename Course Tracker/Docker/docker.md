# Docker
---
## Course: Docker 101 Tutorial
### Learning Progress

- [x] Introduction to Docker
- [x] What are Containers?
- [x] Docker Images
- [x] Running Containers
- [x] Dockerfile Basics
- [ ] Docker Volumes
- [ ] Docker Networking
- [ ] Docker Compose
- [ ] Best Practices
---
## What is Docker?
Docker is an open-source platform that allows developers to build, package, and run applications inside lightweight, portable environments called **containers**.

### Key Benefits
- Consistent environments across development and production
- Fast application deployment
- Lightweight compared to virtual machines
- Easy scalability and portability
 
### Notes
 
> Add your learning notes here.
> 
 
---
 
## What are Docker Containers?

A **container** is a lightweight, isolated runtime environment that packages an application along with all its dependencies, libraries, and configuration files.

### Characteristics
- Portable across different systems
- Isolated from other applications
- Fast startup time
- Uses fewer resources than virtual machines
 
### Notes
 
> - You create an image using a Dockerfile - a text file that defines the steps for building an image - and a sample application
> -
 
---
 
## How Do I Run a Container?
 
Docker containers are created and run from **Docker images**.
 
### Basic Command
 
```bash
docker run hello-world
```

This command:
1. Downloads the `hello-world` image (if not already available).
2. Creates a container from the image.
3. Starts the container.
4. Displays a success message.
 
### Run an Interactive Ubuntu Container
 
```bash
docker run -it ubuntu bash
```
 
### Run a Container in Detached Mode

```bash
docker run -d nginx
```
### Notes
> Images are used to create and run containers.

---

## Useful Docker Commands
---

## Docker Command Tracker

| Status | Command | Purpose | Notes |
|----------|----------|---------|-------|
| ⬜ | `docker --version` | Check Docker version | |
| ⬜ | `docker info` | Display Docker system information | |
| ⬜ | `docker images` | List local images | |
| ⬜ | `docker ps` | List running containers | |
| ⬜ | `docker ps -a` | List all containers | |
| ⬜ | `docker pull nginx` | Download an image | |
| ⬜ | `docker run hello-world` | Run a test container | |
| ⬜ | `docker run -it ubuntu bash` | Start interactive container | |
| ⬜ | `docker run -d nginx` | Run container in background | |
| ⬜ | `docker stop <container-id>` | Stop a running container | |
| ⬜ | `docker start <container-id>` | Start a stopped container | |
| ⬜ | `docker restart <container-id>` | Restart a container | |
| ⬜ | `docker rm <container-id>` | Remove a container | |
| ⬜ | `docker rmi <image-name>` | Remove an image | |
| ⬜ | `docker logs <container-id>` | View container logs | |
| ⬜ | `docker exec -it <container-id> bash` | Access container shell | |
| ⬜ | `docker inspect <container-id>` | View detailed container info | |
| ⬜ | `docker build -t my-app .` | Build image from Dockerfile | |
| ⬜ | `docker tag my-app my-app:v1` | Tag an image | |
| ⬜ | `docker push <image-name>` | Push image to registry | |
| ⬜ | `docker network ls` | List networks | |
| ⬜ | `docker volume ls` | List volumes | |
| ⬜ | `docker-compose up -d` | Start services with Docker Compose | |
| ⬜ | `docker-compose down` | Stop and remove Compose services | |
| ⬜ | `docker build -t welcome-to-docker .` | The -t flag tags your image with a name. (welcome-to-docker in this case). And the . lets Docker know where it can find the Dockerfile.||

### Legend

- ⬜ Not Learned
- 🟨 Learning
- ✅ Practiced
- ⭐ Confident

---

## Summary
 
- Docker packages applications into containers.
- Containers are created from images.
- Containers are lightweight and portable.
- `docker run` is used to start a container.
- Docker helps ensure consistency across environments.
---

## Questions & Follow-up

- [ ] What is the difference between an Image and a Container?
- [ ] How does Docker networking work?
- [ ] When should I use volumes?
- [ ] What is Docker Compose?